import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getJSON, setJSON, removeKey } from '../utils/storage';
import { todayISO } from '../utils/date';
import { useAuth } from './AuthContext';
import {
  fetchUserProgress,
  pushUserProgress,
  logActivityRemote,
} from '../../backend/userProgress';
import {
  scheduleStreakSaver,
  cancelStreakSaver,
  nextStreakSaverDate,
} from '../services/notifications';

const STORAGE_KEY = '@arabreezy/userProgress';

export const DEFAULT_PROGRESS = {
  userId: 'local-user',
  dialect: 'saudi',
  phase: 1,                        // current phase 1..10
  currentLessonId: null,           // legacy — kept for backwards compat with older lesson flow
  lessonsCompleted: [],            // legacy — kept for backwards compat
  // --- Unit-based progression (new primary track) ---
  // The "unit" replaces the old lesson as the primary unit of progress.
  // A unit = 8 words the user is currently learning, flowed through
  //   selecting → memrise → story → rotation → chat → complete
  // See `UnitContext.js` for the state machine and transitions.
  unitCursor: {},                  // { '<phase>': <int> } — how many phase-N words the user has cleared
  currentUnit: null,               // { words: [wordId,...8], step, startedAt, generatedStory, rotationActivity }
  unitsCompletedCount: 0,          // total units ever finished (used for round-robin rotation pick)
  rotationCounter: 0,              // deprecated alias kept for older clients
  // --- SRS / vocab ---
  wordProgress: {},                // wordId -> { status, easeFactor, interval, nextReviewAt, lapses, reviewsCount }
  customWords: [],                 // user-added words from Translate & Save: { id, dialect, phase, script, transliteration, english, notes?, addedAt }
  // Streak/activity tracking
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,            // YYYY-MM-DD of the most recent activity completion
  activityLog: [],                 // [{ type, contentId, dialect, phase, date, durationSeconds }] — capped
  reminderTime: '19:00',           // HH:MM 24h, local
  remindersEnabled: false,
  streakSaverEnabled: false,       // late-evening nudge before streak rolls over
  placement: {
    completed: false,
    score: 0,
    placedAt: null,
    placedPhase: null,
  },
  // Onboarding funnel (welcome → goal → motivation → commitment → social proof
  // → notifications → trial timeline → paywall). Completed flag flips when the
  // user either subscribes or dismisses the paywall; either way they continue
  // to placement. Captured answers shape lifecycle messaging later.
  onboarding: {
    completed: false,
    completedAt: null,
    goal: null,             // 'family' | 'work' | 'travel' | 'faith' | 'culture' | 'other'
    dailyMinutes: null,     // 5 | 10 | 20 | 30
    notificationsAsked: false,
  },
  createdAt: null,
  updatedAt: null,
};

const ACTIVITY_LOG_CAP = 200;
const REMOTE_DEBOUNCE_MS = 800;

const UserProgressContext = createContext(null);

function advanceStreak(prev, today) {
  if (!prev.lastActiveDate) {
    return { currentStreak: 1, longestStreak: Math.max(prev.longestStreak || 0, 1) };
  }
  if (prev.lastActiveDate === today) {
    return { currentStreak: prev.currentStreak, longestStreak: prev.longestStreak };
  }
  const last = new Date(prev.lastActiveDate);
  const td = new Date(today);
  const diffDays = Math.round((td.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  const next = diffDays === 1 ? prev.currentStreak + 1 : 1;
  return { currentStreak: next, longestStreak: Math.max(prev.longestStreak || 0, next) };
}

export function UserProgressProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState(false);

  const remoteTimerRef = useRef(null);
  const lastSyncedUserRef = useRef(null);

  // Initial load from AsyncStorage (fast path). Runs once on mount.
  useEffect(() => {
    let cancelled = false;
    getJSON(STORAGE_KEY).then((stored) => {
      if (cancelled) return;
      if (stored) {
        setProgress({ ...DEFAULT_PROGRESS, ...stored });
      } else {
        const fresh = { ...DEFAULT_PROGRESS, createdAt: todayISO(), updatedAt: todayISO() };
        setProgress(fresh);
        setJSON(STORAGE_KEY, fresh);
      }
      setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // When the auth session resolves to a user, reconcile with Supabase.
  // Remote-wins if remote row exists and is non-default; otherwise push local up.
  useEffect(() => {
    if (!loaded || !userId) return undefined;
    if (lastSyncedUserRef.current === userId) return undefined;
    let cancelled = false;

    (async () => {
      try {
        const remote = await fetchUserProgress(userId);
        if (cancelled) return;
        if (remote && (remote.placement?.completed || (remote.lessonsCompleted ?? []).length > 0)) {
          const merged = { ...DEFAULT_PROGRESS, ...remote, userId };
          setProgress(merged);
          setJSON(STORAGE_KEY, merged);
        } else {
          setProgress((prev) => {
            const next = { ...prev, userId };
            setJSON(STORAGE_KEY, next);
            pushUserProgress(userId, next).catch((err) =>
              console.warn('[progress] initial push failed:', err?.message)
            );
            return next;
          });
        }
        lastSyncedUserRef.current = userId;
      } catch (err) {
        console.warn('[progress] reconcile failed:', err?.message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [loaded, userId]);

  const scheduleRemotePush = useCallback(
    (snapshot) => {
      if (!userId) return;
      if (remoteTimerRef.current) clearTimeout(remoteTimerRef.current);
      remoteTimerRef.current = setTimeout(() => {
        pushUserProgress(userId, snapshot).catch((err) =>
          console.warn('[progress] remote push failed:', err?.message)
        );
      }, REMOTE_DEBOUNCE_MS);
    },
    [userId]
  );

  const persist = useCallback(
    async (updater) => {
      setProgress((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
        const withStamp = { ...next, updatedAt: todayISO() };
        setJSON(STORAGE_KEY, withStamp);
        scheduleRemotePush(withStamp);
        return withStamp;
      });
    },
    [scheduleRemotePush]
  );

  const completePlacement = useCallback(
    ({ score, placedPhase }) =>
      persist((prev) => ({
        ...prev,
        phase: placedPhase,
        placement: {
          completed: true,
          score,
          placedAt: todayISO(),
          placedPhase,
        },
      })),
    [persist]
  );

  const resetPlacement = useCallback(
    () =>
      persist((prev) => ({
        ...prev,
        placement: { completed: false, score: null, placedAt: null, placedPhase: null },
      })),
    [persist]
  );

  const setCurrentLesson = useCallback(
    (lessonId) => persist({ currentLessonId: lessonId }),
    [persist]
  );

  const completeLesson = useCallback(
    (lessonId, { advancePhase = false } = {}) =>
      persist((prev) => {
        const already = prev.lessonsCompleted.includes(lessonId);
        const lessonsCompleted = already ? prev.lessonsCompleted : [...prev.lessonsCompleted, lessonId];
        return {
          ...prev,
          lessonsCompleted,
          currentLessonId: null,
          phase: advancePhase ? Math.min(prev.phase + 1, 10) : prev.phase,
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

  // --- Unit flow ---

  const setCurrentUnit = useCallback(
    (unitOrUpdater) =>
      persist((prev) => ({
        ...prev,
        currentUnit:
          typeof unitOrUpdater === 'function'
            ? unitOrUpdater(prev.currentUnit)
            : unitOrUpdater,
      })),
    [persist]
  );

  const advanceUnitCursor = useCallback(
    (phase, by) =>
      persist((prev) => {
        const key = String(phase);
        const cur = prev.unitCursor?.[key] || 0;
        return {
          ...prev,
          unitCursor: { ...(prev.unitCursor || {}), [key]: cur + (by || 0) },
        };
      }),
    [persist]
  );

  const completeUnit = useCallback(
    ({ wordIds, phase }) =>
      persist((prev) => {
        const key = String(phase);
        const cur = prev.unitCursor?.[key] || 0;
        return {
          ...prev,
          currentUnit: null,
          unitsCompletedCount: (prev.unitsCompletedCount || 0) + 1,
          unitCursor: {
            ...(prev.unitCursor || {}),
            [key]: cur + (Array.isArray(wordIds) ? wordIds.length : 0),
          },
        };
      }),
    [persist]
  );

  // Add a user-typed word from Translate & Save. Dedupes by script within the
  // same dialect so saving the same translation twice is a no-op rather than
  // creating a duplicate card. Caller passes `dialect` so the saved entry
  // matches the active DialectContext bundle (which stores dialect separately
  // from progress.dialect). Returns { added, wordId, alreadyExists }.
  const addCustomWord = useCallback(
    ({ script, transliteration, english, notes, dialect }) => {
      if (!script || !english) {
        return Promise.resolve({ added: false, alreadyExists: false, wordId: null });
      }
      let outcome = { added: false, alreadyExists: false, wordId: null };
      return persist((prev) => {
        const wordDialect = dialect || prev.dialect || 'saudi';
        const normalizedScript = String(script).trim();
        const existing = (prev.customWords || []).find(
          (w) => w.dialect === wordDialect && w.script === normalizedScript
        );
        if (existing) {
          outcome = { added: false, alreadyExists: true, wordId: existing.id };
          return prev;
        }
        const wordId = `cw_${Date.now().toString(36)}_${Math.random()
          .toString(36)
          .slice(2, 8)}`;
        const entry = {
          id: wordId,
          dialect: wordDialect,
          phase: prev.phase || 1,
          script: normalizedScript,
          transliteration: transliteration ? String(transliteration).trim() : '',
          english: String(english).trim(),
          notes: notes ? String(notes).trim() : null,
          addedAt: todayISO(),
        };
        outcome = { added: true, alreadyExists: false, wordId };
        return { ...prev, customWords: [...(prev.customWords || []), entry] };
      }).then(() => outcome);
    },
    [persist]
  );

  // Log a completion of any activity. Updates streak and appends to activityLog.
  // Also fire-and-forget writes the entry to Supabase activity_log when authed.
  const logActivity = useCallback(
    ({ type, contentId = null, dialect = 'saudi', phase = null, durationSeconds = null } = {}) => {
      const today = todayISO();
      const entry = { type, contentId, dialect, phase, date: today, durationSeconds };
      if (userId) {
        logActivityRemote(userId, entry).catch((err) =>
          console.warn('[progress] activity_log insert failed:', err?.message)
        );
      }
      return persist((prev) => {
        const log = [entry, ...(prev.activityLog || [])].slice(0, ACTIVITY_LOG_CAP);
        const streak = advanceStreak(prev, today);
        return {
          ...prev,
          activityLog: log,
          lastActiveDate: today,
          currentStreak: streak.currentStreak,
          longestStreak: streak.longestStreak,
        };
      });
    },
    [persist, userId]
  );

  const setReminder = useCallback(
    ({ time, enabled }) =>
      persist((prev) => ({
        ...prev,
        reminderTime: time ?? prev.reminderTime,
        remindersEnabled: typeof enabled === 'boolean' ? enabled : prev.remindersEnabled,
      })),
    [persist]
  );

  const setStreakSaver = useCallback(
    ({ enabled }) =>
      persist((prev) => ({
        ...prev,
        streakSaverEnabled: typeof enabled === 'boolean' ? enabled : prev.streakSaverEnabled,
      })),
    [persist]
  );

  // Re-arm the streak-saver one-shot whenever the toggle, streak, or last
  // active date changes. The notifications service handles the
  // cancel-then-schedule so this effect is idempotent.
  useEffect(() => {
    if (!loaded) return;
    const { streakSaverEnabled, currentStreak, lastActiveDate } = progress;
    if (!streakSaverEnabled || (currentStreak || 0) < 1) {
      cancelStreakSaver().catch(() => {});
      return;
    }
    const when = nextStreakSaverDate({
      lastActiveDate,
      today: todayISO(),
    });
    scheduleStreakSaver({ when, streak: currentStreak }).catch((err) =>
      console.warn('[progress] streak-saver schedule failed:', err?.message)
    );
  }, [loaded, progress.streakSaverEnabled, progress.currentStreak, progress.lastActiveDate]);

  const setDialect = useCallback((dialect) => persist({ dialect }), [persist]);

  const updateOnboarding = useCallback(
    (patch) =>
      persist((prev) => ({
        ...prev,
        onboarding: { ...(prev.onboarding || {}), ...patch },
      })),
    [persist]
  );

  const completeOnboarding = useCallback(
    (patch = {}) =>
      persist((prev) => ({
        ...prev,
        onboarding: {
          ...(prev.onboarding || {}),
          ...patch,
          completed: true,
          completedAt: todayISO(),
        },
      })),
    [persist]
  );

  const setPhase = useCallback(
    (phase) => {
      const clamped = Math.max(1, Math.min(10, Number(phase) || 1));
      return persist((prev) => ({
        ...prev,
        phase: clamped,
        // Leaving the in-progress lesson alone causes confusion when jumping
        // phases — clear it so Lessons reloads from the new phase's list.
        currentLessonId: prev.phase === clamped ? prev.currentLessonId : null,
      }));
    },
    [persist]
  );

  const resetAll = useCallback(async () => {
    await removeKey(STORAGE_KEY);
    const fresh = { ...DEFAULT_PROGRESS, createdAt: todayISO(), updatedAt: todayISO() };
    setProgress(fresh);
    await setJSON(STORAGE_KEY, fresh);
    if (userId) {
      pushUserProgress(userId, fresh).catch((err) =>
        console.warn('[progress] remote reset failed:', err?.message)
      );
    }
  }, [userId]);

  const value = useMemo(
    () => ({
      progress,
      loaded,
      completePlacement,
      resetPlacement,
      setCurrentLesson,
      completeLesson,
      updateWordProgress,
      addCustomWord,
      logActivity,
      setReminder,
      setStreakSaver,
      setDialect,
      setPhase,
      resetAll,
      // onboarding
      updateOnboarding,
      completeOnboarding,
      // unit flow
      setCurrentUnit,
      advanceUnitCursor,
      completeUnit,
    }),
    [progress, loaded, completePlacement, resetPlacement, setCurrentLesson, completeLesson, updateWordProgress, addCustomWord, logActivity, setReminder, setStreakSaver, setDialect, setPhase, resetAll, updateOnboarding, completeOnboarding, setCurrentUnit, advanceUnitCursor, completeUnit]
  );

  return <UserProgressContext.Provider value={value}>{children}</UserProgressContext.Provider>;
}

export function useUserProgress() {
  const ctx = useContext(UserProgressContext);
  if (!ctx) throw new Error('useUserProgress must be used inside UserProgressProvider');
  return ctx;
}
