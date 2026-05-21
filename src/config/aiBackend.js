// Client wrapper for the arabreezy-ai-backend proxy.
//
// Resolution order for the backend URL:
//   1. EXPO_PUBLIC_AI_BACKEND_URL when set (prod / explicit override)
//   2. In __DEV__: derive http://<metro-host>:<port> from Constants.expoConfig.hostUri
//      so a phone on the same Wi-Fi reaches the laptop without hand-editing .env
//   3. http://localhost:<port> as a last resort (works on simulators)
//
// Default backend port is 8787; override with EXPO_PUBLIC_AI_BACKEND_PORT if
// you've moved it. All AI services (chat, tts, stt, realtime, word-search) go
// through here so the OpenAI key never ships in the app bundle.

import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { supabase } from './supabase';

const extra = Constants?.expoConfig?.extra || {};

const DEFAULT_PORT = '8787';
const PORT =
  extra.aiBackendPort ||
  process.env.EXPO_PUBLIC_AI_BACKEND_PORT ||
  DEFAULT_PORT;

// Metro tells us its own host (LAN IP + port) via hostUri — e.g.
// "192.168.1.42:8082". We strip the port and reuse the IP for the backend.
function metroHost() {
  const hostUri =
    Constants?.expoConfig?.hostUri ||
    Constants?.expoGoConfig?.debuggerHost ||
    Constants?.manifest2?.extra?.expoGo?.debuggerHost ||
    '';
  if (!hostUri) return null;
  const host = String(hostUri).split(':')[0];
  // Bare "localhost" / "127.0.0.1" from a tunnel/web build isn't reachable
  // from a real phone — skip it so we can fall back cleanly.
  if (!host || host === 'localhost' || host === '127.0.0.1') return null;
  return host;
}

function resolveBaseUrl() {
  const explicit = (extra.aiBackendUrl || process.env.EXPO_PUBLIC_AI_BACKEND_URL || '').trim();
  if (explicit) return explicit.replace(/\/$/, '');

  if (__DEV__) {
    const host = metroHost();
    if (host) return `http://${host}:${PORT}`;
  }

  // Simulators can reach the host's localhost; Android emulator needs 10.0.2.2.
  const fallbackHost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
  return `http://${fallbackHost}:${PORT}`;
}

const BASE_URL = resolveBaseUrl();

export const aiBackendUrl = BASE_URL;
export const isAiBackendConfigured = !!BASE_URL;

async function authHeader() {
  if (!supabase) return {};
  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function requireBase() {
  if (!BASE_URL) {
    throw new Error('AI backend not configured (EXPO_PUBLIC_AI_BACKEND_URL is empty)');
  }
  return BASE_URL;
}

export async function postJson(path, body) {
  const auth = await authHeader();
  const res = await fetch(`${requireBase()}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...auth },
    body: JSON.stringify(body ?? {}),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`AI backend ${path} ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export async function postBinary(path, body) {
  const auth = await authHeader();
  const res = await fetch(`${requireBase()}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...auth },
    body: JSON.stringify(body ?? {}),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`AI backend ${path} ${res.status}: ${text || res.statusText}`);
  }
  return res.arrayBuffer();
}

export async function postMultipart(path, formData) {
  const auth = await authHeader();
  const res = await fetch(`${requireBase()}${path}`, {
    method: 'POST',
    headers: { ...auth },
    body: formData,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`AI backend ${path} ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}
