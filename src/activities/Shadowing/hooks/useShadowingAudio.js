import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { speak, play, stop as stopAudio } from '../../../services/audio';

// Owns the audio-side concerns of Shadowing: focus tracking, replay-on-tap of
// any historical target line, and translation state. Pipeline state lives in
// useShadowingPipeline.
export default function useShadowingAudio({
  lessonData,
  cleanupExistingRecording,
  dialect,
  setIsPlaying,
  setPlayingMessageId,
  onBack,
  onScreenBlur,
}) {
  const [translations, setTranslations] = useState({});
  const [translatingMessageId, setTranslatingMessageId] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const isFocusedRef = useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      isFocusedRef.current = true;
      return () => {
        isFocusedRef.current = false;
        cleanupExistingRecording?.();
        stopAudio().catch(() => {});
        onScreenBlur?.();
      };
    }, [cleanupExistingRecording, onScreenBlur])
  );

  useEffect(() => {
    // Reset translations whenever the lesson changes.
    setTranslations({});
  }, [lessonData?.lessonName]);

  const playIfFocused = useCallback(async (fn) => {
    if (!isFocusedRef.current) return false;
    await fn();
    return true;
  }, []);

  const isScreenFocused = useCallback(() => isFocusedRef.current, []);

  const handleMessageAudio = useCallback(
    async (messageId, content) => {
      try {
        await stopAudio().catch(() => {});
        setIsPlaying?.(true);
        setPlayingMessageId?.(messageId);
        const uri = await speak(content, { dialect });
        if (uri) await play(uri);
      } catch (err) {
        console.warn('[shadowing] replay failed:', err?.message);
      } finally {
        setIsPlaying?.(false);
        setPlayingMessageId?.(null);
      }
    },
    [dialect, setIsPlaying, setPlayingMessageId]
  );

  // Toggle the English gloss for a target. Targets already ship with an
  // english field, so this is a local toggle — no network call.
  const handleTranslate = useCallback((messageId, _content, message) => {
    if (translations[messageId]) {
      setTranslations((prev) => {
        const next = { ...prev };
        delete next[messageId];
        return next;
      });
      return;
    }
    const english = message?.english;
    if (english) {
      setTranslations((prev) => ({ ...prev, [messageId]: english }));
    }
  }, [translations]);

  const handleBack = useCallback(() => {
    cleanupExistingRecording?.();
    stopAudio().catch(() => {});
    onBack?.();
  }, [cleanupExistingRecording, onBack]);

  const handleCompletionContinue = useCallback(() => {
    setShowCompletionModal(false);
  }, []);

  return {
    translations,
    setTranslations,
    translatingMessageId,
    setTranslatingMessageId,
    showCompletionModal,
    setShowCompletionModal,
    isScreenFocused,
    playIfFocused,
    handleMessageAudio,
    handleTranslate,
    handleBack,
    handleCompletionContinue,
  };
}
