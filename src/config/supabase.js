// Supabase client. Reads config from app.config.js `extra` (populated from .env).
// Returns `null` when config is missing — callers should handle that gracefully
// so the app still runs on the local backend during development.

import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const extra = Constants?.expoConfig?.extra || {};
const SUPABASE_URL = extra.supabaseUrl;
const SUPABASE_ANON_KEY = extra.supabaseAnonKey;

export const isSupabaseConfigured = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

// Opt-in flag for sourcing content (words/lessons/etc) from Supabase. Keep false
// in dev until migrations + seed have been applied. Must still be configured.
const USE_SUPABASE_CONTENT_RAW =
  extra.useSupabaseContent ??
  process.env.EXPO_PUBLIC_USE_SUPABASE_CONTENT;
export const useSupabaseContent =
  isSupabaseConfigured && String(USE_SUPABASE_CONTENT_RAW).toLowerCase() === 'true';

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;

if (!isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    '[supabase] Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY — remote calls will no-op. ' +
      'Copy .env.example to .env and fill them in.'
  );
}
