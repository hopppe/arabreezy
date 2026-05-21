// UnitContext — the new primary progression unit.
//
// A "unit" = 8 words the learner is currently learning, flowed through:
//   selecting → memrise → story → rotation → chat → complete
//
// The unit replaces the old "lesson" as the unit of progression. Source of
// truth is `progress.currentUnit` on UserProgressContext (persisted to
// AsyncStorage + Supabase). This context wraps the state machine and the
// "next 8 words" picker.
//
// The word ordering is currently `word_id` ascending within the user's phase,
// skipping anything the user has already marked known (SRS status 'known')
// or that has already been a focal in a completed unit (via wordProgress
// `reviewsCount > 0` proxy — see pickNextWords).
//
// When a phase is exhausted, advance to the next phase automatically.

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getAllWords } from '../../backend/localBackend';
import { useDialect } from './DialectContext';
import { useUserProgress } from './UserProgressContext';
import { applyRating, INITIAL_PROGRESS } from '../activities/Flashcards/scheduler';

const UNIT_SIZE = 8;
const ROTATION = ['listening', 'shadowing', 'guided'];

const UnitContext = createContext(null);

function isCompletedAlready(wordProgress, wordId) {
  const wp = wordProgress?.[wordId];
  if (!wp) return false;
  if (wp.status === 'known') return true;
  // "Was a unit focal already" proxy — any review count means we've seen it.
  // Tap-to-know also flips status to 'learning' via applyRating(prev,4).
  if (wp.reviewsCount && wp.status !== 'new') return true;
  return false;
}

export function UnitProvider({ children }) {
  const { dialect } = useDialect();
  const {
    progress,
    setCurrentUnit,
    updateWordProgress,
    completeUnit: persistCompleteUnit,
    setPhase,
    logActivity,
  } = useUserProgress();

  const [phaseWords, setPhaseWords] = useState([]);
  const [loadingWords, setLoadingWords] = useState(true);

  // Load all words for the current phase, sorted by word_id.
  useEffect(() => {
    let cancelled = false;
    setLoadingWords(true);
    getAllWords({ dialect })
      .then((all) => {
        if (cancelled) return;
        const forPhase = (all || [])
          .filter((w) => w?.phase === progress.phase)
          .sort((a, b) => String(a.id).localeCompare(String(b.id)));
        setPhaseWords(forPhase);
        setLoadingWords(false);
      })
      .catch((err) => {
        console.warn('[unit] failed to load words', err?.message);
        if (!cancelled) {
          setPhaseWords([]);
          setLoadingWords(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [dialect, progress.phase]);

  /**
   * Pick the next `count` words at the user's current phase that haven't
   * been completed or marked known yet. Returns word objects (not just ids).
   */
  const pickNextWords = useCallback(
    (count = UNIT_SIZE) => {
      const skip = new Set();
      // Skip words already in the in-progress unit
      if (progress.currentUnit?.words) {
        for (const wid of progress.currentUnit.words) skip.add(wid);
      }
      const out = [];
      for (const w of phaseWords) {
        if (skip.has(w.id)) continue;
        if (isCompletedAlready(progress.wordProgress, w.id)) continue;
        out.push(w);
        if (out.length >= count) break;
      }
      return out;
    },
    [phaseWords, progress.wordProgress, progress.currentUnit]
  );

  /**
   * Mark a word as already-known. Bumps its SRS to 'easy' (rating 4) and
   * the next word in the phase auto-fills via pickNextWords on re-render.
   * Used by WordSelectionScreen's tap-to-know UI.
   */
  const markKnown = useCallback(
    (wordId) => {
      const prev = progress.wordProgress?.[wordId];
      const next = applyRating({ ...INITIAL_PROGRESS, ...(prev || {}) }, 4);
      return updateWordProgress(wordId, next);
    },
    [progress.wordProgress, updateWordProgress]
  );

  /**
   * Lock in the 8 words the user wants to learn this unit. Initializes the
   * unit state and advances to the Memrise step.
   */
  const lockUnit = useCallback(
    (wordIds) => {
      if (!Array.isArray(wordIds) || wordIds.length === 0) return;
      const rotationIdx = (progress.unitsCompletedCount || 0) % ROTATION.length;
      const rotationActivity = ROTATION[rotationIdx];
      return setCurrentUnit({
        words: wordIds,
        step: 'memrise',
        startedAt: new Date().toISOString(),
        generatedStory: null,
        rotationActivity,
      });
    },
    [progress.unitsCompletedCount, setCurrentUnit]
  );

  /**
   * Move to the next step in the unit flow. Order:
   *   memrise → story → rotation → chat → complete
   */
  const advanceStep = useCallback(() => {
    return setCurrentUnit((prev) => {
      if (!prev) return prev;
      const order = ['selecting', 'memrise', 'story', 'rotation', 'chat', 'complete'];
      const idx = order.indexOf(prev.step);
      const next = order[Math.min(idx + 1, order.length - 1)];
      return { ...prev, step: next };
    });
  }, [setCurrentUnit]);

  /**
   * Cache the AI-generated story payload onto the current unit so re-entry
   * to the story screen doesn't re-call /api/lesson/generate-story.
   */
  const cacheGeneratedStory = useCallback(
    (story) =>
      setCurrentUnit((prev) => (prev ? { ...prev, generatedStory: story } : prev)),
    [setCurrentUnit]
  );

  /**
   * Finish the current unit. Promotes all 8 focal words via SRS rating 3
   * ("good") so they enter the review pool, advances the phase cursor, and
   * advances `phase` if every word at the current phase has been covered.
   */
  const finishCurrentUnit = useCallback(async () => {
    const unit = progress.currentUnit;
    if (!unit) return;

    // Promote each focal word in the SRS so it lands in the review pool.
    for (const wid of unit.words) {
      const prev = progress.wordProgress?.[wid];
      const next = applyRating({ ...INITIAL_PROGRESS, ...(prev || {}) }, 3);
      // fire & forget — persist context coalesces writes
      updateWordProgress(wid, next);
    }

    await persistCompleteUnit({ wordIds: unit.words, phase: progress.phase });

    logActivity({
      type: 'unit',
      contentId: `unit_${progress.phase}_${(progress.unitsCompletedCount || 0) + 1}`,
      dialect,
      phase: progress.phase,
    });

    // Phase-advance check: if every word at this phase is now completed,
    // bump phase by 1 (clamped to 10).
    const remaining = phaseWords.filter(
      (w) => !isCompletedAlready(progress.wordProgress, w.id) && !unit.words.includes(w.id)
    );
    if (remaining.length === 0 && progress.phase < 10) {
      setPhase(progress.phase + 1);
    }
  }, [
    progress.currentUnit,
    progress.wordProgress,
    progress.phase,
    progress.unitsCompletedCount,
    phaseWords,
    updateWordProgress,
    persistCompleteUnit,
    dialect,
    logActivity,
    setPhase,
  ]);

  const value = useMemo(
    () => ({
      currentUnit: progress.currentUnit,
      phaseWords,
      loadingWords,
      pickNextWords,
      markKnown,
      lockUnit,
      advanceStep,
      cacheGeneratedStory,
      finishCurrentUnit,
      UNIT_SIZE,
    }),
    [
      progress.currentUnit,
      phaseWords,
      loadingWords,
      pickNextWords,
      markKnown,
      lockUnit,
      advanceStep,
      cacheGeneratedStory,
      finishCurrentUnit,
    ]
  );

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}

export function useUnit() {
  const ctx = useContext(UnitContext);
  if (!ctx) throw new Error('useUnit must be used inside UnitProvider');
  return ctx;
}
