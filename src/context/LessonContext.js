import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getLessons, getLesson } from '../../backend/localBackend';
import { useDialect } from './DialectContext';
import { useUserProgress } from './UserProgressContext';

const LessonContext = createContext(null);

export function LessonProvider({ children }) {
  const { dialect } = useDialect();
  const { progress, setCurrentLesson, completeLesson } = useUserProgress();

  const [currentLesson, setCurrentLessonState] = useState(null);
  const [phaseLessons, setPhaseLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load lessons for user's current phase + resolve current-lesson object
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const forPhase = await getLessons({ dialect, phase: progress.phase });
      if (cancelled) return;
      setPhaseLessons(forPhase);

      const targetId = progress.currentLessonId;
      if (targetId) {
        const resolved = await getLesson({ dialect, lessonId: targetId });
        if (!cancelled) setCurrentLessonState(resolved);
      } else {
        setCurrentLessonState(null);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [dialect, progress.phase, progress.currentLessonId]);

  const startLesson = useCallback(
    async (lessonId) => {
      const lesson = await getLesson({ dialect, lessonId });
      if (!lesson) return;
      setCurrentLessonState(lesson);
      await setCurrentLesson(lessonId);
    },
    [dialect, setCurrentLesson]
  );

  const finishCurrentLesson = useCallback(async () => {
    if (!currentLesson) return;
    // Advance phase if this is the last lesson of the phase
    const remaining = phaseLessons.filter(
      (l) => l.id !== currentLesson.id && !progress.lessonsCompleted.includes(l.id)
    );
    const advancePhase = remaining.length === 0;
    await completeLesson(currentLesson.id, { advancePhase });
    setCurrentLessonState(null);
  }, [currentLesson, phaseLessons, progress.lessonsCompleted, completeLesson]);

  // Next uncompleted lesson at this phase (home uses it to suggest what to start)
  const nextSuggestedLesson = useMemo(() => {
    return phaseLessons.find((l) => !progress.lessonsCompleted.includes(l.id)) || null;
  }, [phaseLessons, progress.lessonsCompleted]);

  const value = useMemo(
    () => ({
      currentLesson,
      phaseLessons,
      loading,
      nextSuggestedLesson,
      startLesson,
      finishCurrentLesson,
    }),
    [currentLesson, phaseLessons, loading, nextSuggestedLesson, startLesson, finishCurrentLesson]
  );

  return <LessonContext.Provider value={value}>{children}</LessonContext.Provider>;
}

export function useLessons() {
  const ctx = useContext(LessonContext);
  if (!ctx) throw new Error('useLessons must be used inside LessonProvider');
  return ctx;
}
