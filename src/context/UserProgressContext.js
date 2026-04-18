import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getJSON, setJSON, removeKey } from '../utils/storage';
import { todayISO } from '../utils/date';

const STORAGE_KEY = '@arabreezy/userProgress';

export const DEFAULT_PROGRESS = {
  userId: 'local-user',
  dialect: 'saudi',
  level: 1,
  currentLessonId: null,
  lessonsCompleted: [],   // array of lessonId
  wordProgress: {},       // wordId -> { status, easeFactor, interval, nextReviewAt, lapses, reviewsCount }
  placement: {
    completed: false,
    score: 0,
    placedAt: null,
    placedLevel: null,
  },
  createdAt: null,
  updatedAt: null,
};

const UserProgressContext = createContext(null);

export function UserProgressProvider({ children }) {
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getJSON(STORAGE_KEY).then((stored) => {
      if (!cancelled) {
        if (stored) {
          setProgress({ ...DEFAULT_PROGRESS, ...stored });
        } else {
          const fresh = { ...DEFAULT_PROGRESS, createdAt: todayISO(), updatedAt: todayISO() };
          setProgress(fresh);
          setJSON(STORAGE_KEY, fresh);
        }
        setLoaded(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback(async (updater) => {
    setProgress((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      const withStamp = { ...next, updatedAt: todayISO() };
      setJSON(STORAGE_KEY, withStamp);
      return withStamp;
    });
  }, []);

  const completePlacement = useCallback(
    ({ score, placedLevel }) =>
      persist((prev) => ({
        ...prev,
        level: placedLevel,
        placement: {
          completed: true,
          score,
          placedAt: todayISO(),
          placedLevel,
        },
      })),
    [persist]
  );

  const setCurrentLesson = useCallback(
    (lessonId) => persist({ currentLessonId: lessonId }),
    [persist]
  );

  const completeLesson = useCallback(
    (lessonId, { advanceLevel = false } = {}) =>
      persist((prev) => {
        const already = prev.lessonsCompleted.includes(lessonId);
        const lessonsCompleted = already ? prev.lessonsCompleted : [...prev.lessonsCompleted, lessonId];
        return {
          ...prev,
          lessonsCompleted,
          currentLessonId: null,
          level: advanceLevel ? Math.min(prev.level + 1, 10) : prev.level,
        };
      }),
    [persist]
  );

  const updateWordProgress = useCallback(
    (wordId, patch) =>
      persist((prev) => ({
        ...prev,
        wordProgress: {
          ...prev.wordProgress,
          [wordId]: { ...(prev.wordProgress[wordId] || {}), ...patch },
        },
      })),
    [persist]
  );

  const setDialect = useCallback(
    (dialect) => persist({ dialect }),
    [persist]
  );

  const resetAll = useCallback(async () => {
    await removeKey(STORAGE_KEY);
    const fresh = { ...DEFAULT_PROGRESS, createdAt: todayISO(), updatedAt: todayISO() };
    setProgress(fresh);
    await setJSON(STORAGE_KEY, fresh);
  }, []);

  const value = useMemo(
    () => ({
      progress,
      loaded,
      completePlacement,
      setCurrentLesson,
      completeLesson,
      updateWordProgress,
      setDialect,
      resetAll,
    }),
    [progress, loaded, completePlacement, setCurrentLesson, completeLesson, updateWordProgress, setDialect, resetAll]
  );

  return <UserProgressContext.Provider value={value}>{children}</UserProgressContext.Provider>;
}

export function useUserProgress() {
  const ctx = useContext(UserProgressContext);
  if (!ctx) throw new Error('useUserProgress must be used inside UserProgressProvider');
  return ctx;
}
