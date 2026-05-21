// User progress + activity log sync. Mirrors the local progress shape in
// AsyncStorage to the Supabase `user_progress` table when authenticated.
// All exports no-op gracefully when Supabase isn't configured or there's no
// session, so the app keeps working offline / unauthed against AsyncStorage.

import { supabase, isSupabaseConfigured } from '../src/config/supabase';

function canSync(userId) {
  return Boolean(isSupabaseConfigured && supabase && userId);
}

function rowToLocal(row) {
  return {
    dialect: row.dialect,
    phase: row.phase,
    currentLessonId: row.current_lesson_id ?? null,
    lessonsCompleted: Array.isArray(row.lessons_completed) ? row.lessons_completed : [],
    wordProgress: row.word_progress && typeof row.word_progress === 'object' ? row.word_progress : {},
    placement:
      row.placement && typeof row.placement === 'object'
        ? row.placement
        : { completed: false, score: 0, placedAt: null, placedPhase: null },
    currentStreak: row.current_streak ?? 0,
    longestStreak: row.longest_streak ?? 0,
    lastActiveDate: row.last_active_date ?? null,
    reminderTime: row.daily_reminder_time ?? '19:00',
    remindersEnabled: Boolean(row.reminders_enabled),
    createdAt: row.created_at ?? null,
    updatedAt: row.updated_at ?? null,
  };
}

function localToRow(userId, progress) {
  return {
    user_id: userId,
    dialect: progress.dialect ?? 'saudi',
    phase: progress.phase ?? 1,
    current_lesson_id: progress.currentLessonId ?? null,
    lessons_completed: progress.lessonsCompleted ?? [],
    word_progress: progress.wordProgress ?? {},
    placement:
      progress.placement ?? { completed: false, score: 0, placedAt: null, placedPhase: null },
    current_streak: progress.currentStreak ?? 0,
    longest_streak: progress.longestStreak ?? 0,
    last_active_date: progress.lastActiveDate ?? null,
    daily_reminder_time: progress.reminderTime ?? '19:00',
    reminders_enabled: Boolean(progress.remindersEnabled),
  };
}

export async function fetchUserProgress(userId) {
  if (!canSync(userId)) return null;
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToLocal(data) : null;
}

export async function pushUserProgress(userId, progress) {
  if (!canSync(userId)) return;
  const row = localToRow(userId, progress);
  const { error } = await supabase
    .from('user_progress')
    .upsert(row, { onConflict: 'user_id' });
  if (error) throw error;
}

export async function logActivityRemote(userId, entry) {
  if (!canSync(userId)) return;
  const { error } = await supabase.from('activity_log').insert({
    user_id: userId,
    activity_type: entry.type,
    dialect: entry.dialect ?? 'saudi',
    content_id: entry.contentId ?? null,
    phase: entry.phase ?? null,
    completed_date: entry.date ?? null,
    duration_seconds: entry.durationSeconds ?? null,
    meta: entry.meta ?? {},
  });
  if (error) throw error;
}
