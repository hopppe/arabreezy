import { useCallback, useEffect, useRef, useState } from 'react';
import { speak, play, stop, isAudioConfigured } from '../services/audio';

// Lightweight hook wrapping the audio service. Components call playText() and
// get { playing, configured } back. Cleans up on unmount.
export function useAudio() {
  const [playing, setPlaying] = useState(null); // text currently playing, or null
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      stop();
    };
  }, []);

  const playText = useCallback(async (text, opts) => {
    if (!text) return;
    setPlaying(text);
    try {
      const uri = await speak(text, opts);
      if (!mountedRef.current) return;
      if (uri) await play(uri);
    } catch (_) {
      // swallow — non-fatal
    } finally {
      if (mountedRef.current) setPlaying(null);
    }
  }, []);

  const playUri = useCallback(async (uri) => {
    if (!uri) return;
    await play(uri);
  }, []);

  const stopAll = useCallback(async () => {
    await stop();
    if (mountedRef.current) setPlaying(null);
  }, []);

  return { playText, playUri, stop: stopAll, playing, configured: isAudioConfigured() };
}
