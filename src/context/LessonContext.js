import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getLessons, getLesson } from '../../backend/localBackend';
import { useDialect } from './DialectContext';
import { useUserProgress } from './UserProgressContext';

const LessonContext = createContext(null);

export function LessonProvider({ children }) {
  const { dialect } = useDialect();
  const { progress, setCurrentLesson, completeLesson } = useUserProgress();

  const [currentLesson, setCurrentLessonState] = useState(null);
  const [levelLessons, setLevelLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load lessons for the user's current level + resolve current-lesson object
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const forLevel = await getLessons({ dialect, level: progress.level });
      if (cancelled) return;
      setLevelLessons(forLevel);

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
  }, [dialect, progress.level, progress.currentLessonId]);

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
    // Advance level if this is the last lesson of the level
    const remaining = levelLessons.filter(
      (l) => l.id !== currentLesson.id && !progress.lessonsCompleted.includes(l.id)
    );
    const advanceLevel = remaining.length === 0;
    await completeLesson(currentLesson.id, { advanceLevel });
    setCurrentLessonState(null);
  }, [currentLesson, levelLessons, progress.lessonsCompleted, completeLesson]);

  // Next uncompleted lesson at this level (used by home to suggest what to start)
  const nextSuggestedLesson = useMemo(() => {
    return levelLessons.find((l) => !progress.lessonsCompleted.includes(l.id)) || null;
  }, [levelLessons, progress.lessonsCompleted]);

  const value = useMemo(
    () => ({
      currentLesson,
      levelLessons,
      loading,
      nextSuggestedLesson,
      startLesson,
      finishCurrentLesson,
    }),
    [currentLesson, levelLessons, loading, nextSuggestedLesson, startLesson, finishCurrentLesson]
  );

  return <LessonContext.Provider value={value}>{children}</LessonContext.Provider>;
}

export function useLessons() {
  const ctx = useContext(LessonContext);
  if (!ctx) throw new Error('useLessons must be used inside LessonProvider');
  return ctx;
}
