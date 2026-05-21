// Daily-reminder scheduler. Wraps expo-notifications so the rest of the
// app deals with `{ enabled, hour, minute }` and we handle permission +
// scheduling here.

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

const REMINDER_ID = 'arabreezy-daily-reminder';
const STREAK_SAVER_ID = 'arabreezy-streak-saver';
const CHANNEL_ID = 'arabreezy-reminders';

// Hour of day (local, 24h) at which the streak-saver fires. Late enough that
// the user actually risks losing the streak, early enough that they still
// have time to open the app and do a quick activity before midnight.
export const STREAK_SAVER_HOUR = 21;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function ensurePermission() {
  if (!Device.isDevice) return false;
  const existing = await Notifications.getPermissionsAsync();
  if (existing.granted) return true;
  const next = await Notifications.requestPermissionsAsync();
  return !!next.granted;
}

async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
    name: 'Daily reminders',
    importance: Notifications.AndroidImportance.DEFAULT,
    sound: null,
  });
}

export async function scheduleDailyReminder({ hour, minute = 0, title, body }) {
  await ensureAndroidChannel();
  await cancelDailyReminder();
  return Notifications.scheduleNotificationAsync({
    identifier: REMINDER_ID,
    content: {
      title: title || 'Time for Arabic',
      body: body || 'Five minutes a day keeps the rust off.',
      sound: null,
    },
    trigger: {
      hour,
      minute,
      repeats: true,
      channelId: CHANNEL_ID,
    },
  });
}

export async function cancelDailyReminder() {
  try {
    await Notifications.cancelScheduledNotificationAsync(REMINDER_ID);
  } catch (_) {
    // not scheduled — ignore
  }
}

export function parseTime(hhmm) {
  const [h, m] = String(hhmm || '19:00').split(':').map((n) => parseInt(n, 10) || 0);
  return { hour: Math.max(0, Math.min(23, h)), minute: Math.max(0, Math.min(59, m)) };
}

// Streak-saver: a one-shot late-evening nudge fired only when the user has a
// live streak that's about to roll over. Re-armed on every activity-log
// change via the effect in UserProgressContext.
//
// `when` is a JS Date for the next fire time. `streak` is purely for the
// notification copy.
export async function scheduleStreakSaver({ when, streak }) {
  if (!when || !(when instanceof Date)) return null;
  await ensureAndroidChannel();
  await cancelStreakSaver();
  return Notifications.scheduleNotificationAsync({
    identifier: STREAK_SAVER_ID,
    content: {
      title: streak > 1
        ? `Don't break your ${streak}-day streak`
        : "Keep your streak going",
      body: 'A few minutes today and the streak holds.',
      sound: null,
    },
    trigger: {
      date: when,
      channelId: CHANNEL_ID,
    },
  });
}

export async function cancelStreakSaver() {
  try {
    await Notifications.cancelScheduledNotificationAsync(STREAK_SAVER_ID);
  } catch (_) {
    // not scheduled — ignore
  }
}

// Decide when the next streak-saver should fire.
// - If user already practiced today, push to tomorrow at STREAK_SAVER_HOUR.
// - If user hasn't practiced today and STREAK_SAVER_HOUR is still in the
//   future, fire today.
// - Otherwise (hour already passed and still no activity today) push to
//   tomorrow — the streak will roll over at midnight either way, and we
//   don't want a notification to fire immediately on app open.
export function nextStreakSaverDate({ lastActiveDate, today, hour = STREAK_SAVER_HOUR, minute = 0 }) {
  const todayAt = new Date();
  todayAt.setHours(hour, minute, 0, 0);
  const tomorrowAt = new Date(todayAt.getTime() + 24 * 60 * 60 * 1000);
  if (lastActiveDate === today) return tomorrowAt;
  const now = new Date();
  return now < todayAt ? todayAt : tomorrowAt;
}
