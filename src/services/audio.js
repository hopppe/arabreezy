// Unified audio service. Two responsibilities:
//   1. speak(text, opts) — return a playable local URI for the Arabic text.
//      Calls the AI backend proxy at /api/tts to fetch MP3 bytes, caches
//      them to the local file system so subsequent plays are offline-instant.
//   2. play(uri) — play a file (local or remote) through expo-audio.
//
// The cache key is hash(text + voice + dialect) so different dialects /
// voices can coexist. Cache lives at FileSystem.cacheDirectory/audio/.
//
// Falls back gracefully when the AI backend isn't configured: speak()
// returns null and callers should hide/disable play UI.

import * as FileSystem from 'expo-file-system/legacy';
import * as Crypto from 'expo-crypto';
import { createAudioPlayer } from 'expo-audio';
import {
  isAiBackendConfigured,
  postBinary,
} from '../config/aiBackend';

const CACHE_DIR = `${FileSystem.cacheDirectory}audio/`;

async function ensureCacheDir() {
  try {
    const info = await FileSystem.getInfoAsync(CACHE_DIR);
    if (!info.exists) await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });
  } catch (_) {
    // ignore — non-fatal
  }
}

async function keyFor(text, voice, dialect) {
  const raw = `${dialect}::${voice}::${text}`;
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, raw);
}

export async function speak(text, { voice = 'nova', dialect = 'saudi' } = {}) {
  if (!text) return null;
  if (!isAiBackendConfigured) return null;
  await ensureCacheDir();
  const hash = await keyFor(text, voice, dialect);
  const path = `${CACHE_DIR}${hash}.mp3`;
  const info = await FileSystem.getInfoAsync(path);
  if (info.exists) return path;

  const arrayBuf = await postBinary('/api/tts', { text, voice, format: 'mp3' });
  const base64 = arrayBufferToBase64(arrayBuf);
  await FileSystem.writeAsStringAsync(path, base64, { encoding: FileSystem.EncodingType.Base64 });
  return path;
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return global.btoa(binary);
}

// Singleton player so we can interrupt previous audio when a new one starts.
let activePlayer = null;

export async function play(uriOrUrl) {
  if (!uriOrUrl) return;
  try {
    if (activePlayer) {
      activePlayer.remove();
      activePlayer = null;
    }
    activePlayer = createAudioPlayer({ uri: uriOrUrl });
    await activePlayer.play();
  } catch (e) {
    activePlayer = null;
  }
}

export async function stop() {
  if (activePlayer) {
    try { await activePlayer.pause(); } catch (_) {}
    try { activePlayer.remove(); } catch (_) {}
    activePlayer = null;
  }
}

export async function speakAndPlay(text, opts) {
  const uri = await speak(text, opts);
  if (uri) await play(uri);
  return uri;
}

// Play audio for a word object. Prefers the pre-generated Supabase URL
// (word.audioUrl / word.audio) so lessons get zero-latency, offline-ready
// playback once the asset is on the device's HTTP cache. Falls back to the
// live /api/tts proxy + on-device cache when no URL is present.
export async function playWordAudio(word, opts = {}) {
  if (!word) return null;
  const url = word.audioUrl || word.audio || null;
  if (url && /^https?:\/\//.test(url)) {
    await play(url);
    return url;
  }
  return speakAndPlay(word.script, { dialect: word.dialect, ...opts });
}

export function isAudioConfigured() {
  return isAiBackendConfigured;
}
