// Lesson preloader — warms image and audio caches before the user advances.
//
// Ported from anaFluent's `imagePreloader.js` + `AudioPreloadService.js` pattern
// (rolling-queue lookahead + tiered local→cloud→TTS), adapted to Arabreezy:
//
//   • Images live in Supabase storage `vocabulary-images/<word_id>.png`. The URL
//     is on `word.imageUrl`. We call `Image.prefetch(uri)` to warm RN's image
//     cache so the next render is instant.
//   • Audio is computed on demand by `services/audio.js` `speak(text, ...)`,
//     which already caches the MP3 to `FileSystem.cacheDirectory/audio/`. We
//     just invoke speak() ahead of time so by the time the user hits "play"
//     the file is on disk.
//
// Use `preloadLessonAssets(words, { dialect })` once when the lesson opens. It
// fires-and-forgets — errors per-word are logged but never thrown.

import { Image } from 'react-native';
import { speak } from './audio';

const imageCache = new Set();

function preloadImage(uri) {
  if (!uri || imageCache.has(uri)) return Promise.resolve();
  return Image.prefetch(uri)
    .then(() => imageCache.add(uri))
    .catch((e) => console.warn('[preload] image failed', uri, e?.message));
}

// Pre-generated audio: just warm the HTTP cache with a HEAD-ish GET so the
// first <createAudioPlayer> on the URL plays from the OS network cache.
const audioUrlCache = new Set();
function preloadAudioUrl(url) {
  if (!url || audioUrlCache.has(url)) return Promise.resolve();
  audioUrlCache.add(url);
  return fetch(url, { method: 'GET' })
    .then((res) => {
      // Drain the body so the response is cached, but discard the data.
      if (res.body && typeof res.body.cancel === 'function') {
        try { res.body.cancel(); } catch (_) {}
      }
    })
    .catch((e) => console.warn('[preload] audio url failed', url, e?.message));
}

function preloadAudio(word, dialect) {
  if (!word) return Promise.resolve();
  // Prefer the pre-generated Supabase URL when present — avoids OpenAI cost.
  const url = word.audioUrl || word.audio || null;
  if (url && /^https?:\/\//.test(url)) return preloadAudioUrl(url);
  if (!word.script) return Promise.resolve();
  // Fallback: TTS via /api/tts, cached to disk by services/audio.js.
  return speak(word.script, { dialect }).catch((e) =>
    console.warn('[preload] audio failed', word.script, e?.message),
  );
}

/**
 * Preload focal-word images and audio for a lesson.
 *
 * Fires-and-forgets, but returns a Promise so callers can `await` if they
 * want to gate UI on the first batch landing.
 *
 * @param {Array} words   — array of word objects with `script` and `imageUrl`
 * @param {Object} opts
 * @param {string} opts.dialect  — Saudi/Levantine/Fusha for TTS voice selection
 * @param {number} [opts.lookahead=8]  — max concurrent fetches (avoid choking)
 */
export async function preloadLessonAssets(words, { dialect = 'saudi', lookahead = 8 } = {}) {
  if (!Array.isArray(words) || words.length === 0) return;

  // Initial batch: first `lookahead` words. Anything more, do in a second batch.
  const initial = words.slice(0, lookahead);
  const tail = words.slice(lookahead);

  await Promise.allSettled([
    ...initial.map((w) => preloadImage(w?.imageUrl)),
    ...initial.map((w) => preloadAudio(w, dialect)),
  ]);

  // Best-effort: continue preloading the tail in the background. No await.
  if (tail.length) {
    void Promise.allSettled([
      ...tail.map((w) => preloadImage(w?.imageUrl)),
      ...tail.map((w) => preloadAudio(w, dialect)),
    ]);
  }
}

/** Test helper — wipes the in-memory image/audio-preload sets. Has no effect
 *  on the RN native image cache, the FileSystem TTS cache, or the OS HTTP
 *  cache. */
export function _resetPreloadCacheForTests() {
  imageCache.clear();
  audioUrlCache.clear();
}
