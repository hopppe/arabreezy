import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getWords } from '../../backend/localBackend';
import { useDialect } from './DialectContext';
import { useUserProgress } from './UserProgressContext';
import { applyRating, isDue, INITIAL_PROGRESS } from '../activities/Flashcards/scheduler';

const FlashcardContext = createContext(null);

/**
 * Produces today's review deck by combining:
 *   1. Focal words from the current lesson
 *   2. Focal words from previously completed lessons at the same level (if due)
 * And walks the SRS scheduler when the user rates a card.
 */
export function FlashcardProvider({ children }) {
  const { dialect, bundle } = useDialect();
  const { progress, updateWordProgress } = useUserProgress();
  const [deck, setDeck] = useState([]);     // resolved word objects, in review order
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      // Gather candidate word ids: current lesson's focal words + all focal
      // words from completed lessons at current level (review reinforcement).
      const currentLessonIds = new Set();
      const currentLesson = bundle.lessons.find((l) => l.id === progress.currentLessonId);
      if (currentLesson) currentLesson.focalWordIds.forEach((id) => currentLessonIds.add(id));

      const completedAtLevelIds = new Set();
      bundle.lessons
        .filter((l) => l.level === progress.level && progress.lessonsCompleted.includes(l.id))
        .forEach((l) => l.focalWordIds.forEach((id) => completedAtLevelIds.add(id)));

      const allIds = Array.from(new Set([...currentLessonIds, ...completedAtLevelIds]));
      const words = await getWords({ dialect, wordIds: allIds });

      // Keep only words that are due (new, learning, or interval elapsed)
      const due = words.filter((w) => isDue(progress.wordProgress[w.id]));

      // New/learning first (keeps sessions fresh), then review
      due.sort((a, b) => {
        const sa = progress.wordProgress[a.id]?.status || 'new';
        const sb = progress.wordProgress[b.id]?.status || 'new';
        const rank = { new: 0, learning: 1, review: 2, known: 3 };
        return rank[sa] - rank[sb];
      });

      if (!cancelled) {
        setDeck(due);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dialect, bundle, progress.currentLessonId, progress.level, progress.lessonsCompleted, progress.wordProgress]);

  const rateCard = useCallback(
    async (wordId, rating) => {
      const prev = progress.wordProgress[wordId] || INITIAL_PROGRESS;
      const next = applyRating(prev, rating);
      await updateWordProgress(wordId, next);
    },
    [progress.wordProgress, updateWordProgress]
  );

  const value = useMemo(
    () => ({
      deck,
      loading,
      rateCard,
    }),
    [deck, loading, rateCard]
  );

  return <FlashcardContext.Provider value={value}>{children}</FlashcardContext.Provider>;
}

export function useFlashcards() {
  const ctx = useContext(FlashcardContext);
  if (!ctx) throw new Error('useFlashcards must be used inside FlashcardProvider');
  return ctx;
}
