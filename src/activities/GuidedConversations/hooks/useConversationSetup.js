import { useEffect, useRef, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { postJson } from '../../../config/aiBackend';
import { stop as stopAudio } from '../../../services/audio';
import { END_CONVERSATION_TOKEN } from '../constants';

// Drives the lifecycle: open opener, fall back to AI opener when the scenario
// doesn't ship a starter line, set the fallback finish timer, and clean up on
// focus loss. Mirrors the English app's useConversationSetup but without the
// consent / spending / tutorial modals (Arabreezy doesn't have those).
export default function useConversationSetup({
  conversationState,
  audioRecording,
  scenarioData,
  phase,
  dialect,
  isFocusedRef,
  onBack,
  playAiTurn,
}) {
  const {
    conversationStarted,
    aiCompletionTriggered,
    setConversationStarted,
    setConversationStartTime,
    setShowFinishButton,
    setSuggestions,
    addMessage,
    resetConversation,
    MESSAGE_TYPES,
  } = conversationState;

  const { cleanupExistingRecording } = audioRecording;

  const [aiFirstMessageReceived, setAiFirstMessageReceived] = useState(false);
  const startingRef = useRef(false);

  const startConversation = useCallback(async () => {
    if (startingRef.current || !scenarioData) return null;
    startingRef.current = true;

    try {
      // Prefer the bundled opener (first partner step). Falls back to asking
      // the AI for an opener when the scenario doesn't ship one.
      const firstStep = (scenarioData.steps || []).find(
        (s) => s.speaker === 'partner' || s.prompt
      );
      const bundledOpener =
        firstStep?.text || firstStep?.prompt?.script || firstStep?.script || null;
      const bundledGloss =
        firstStep?.translation || firstStep?.prompt?.english || firstStep?.english || null;

      let openerArabic = bundledOpener;
      let openerEnglish = bundledGloss;
      let suggestions = [];

      if (!openerArabic) {
        const reply = await postJson('/api/chat', {
          history: [
            {
              role: 'user',
              arabic:
                `Open this Arabic conversation. Scenario title: ${scenarioData.title || ''}. ` +
                `Description: ${scenarioData.description || ''}. Greet the learner in one short line.`,
            },
          ],
          dialect,
          phase,
          scenarioKey: scenarioData.id,
          scenarioTitle: scenarioData.title,
          scenarioDescription: scenarioData.description,
          includeSuggestions: true,
        });
        openerArabic = (reply?.arabic || '').replace(END_CONVERSATION_TOKEN, '').trim();
        openerEnglish = reply?.english || null;
        if (Array.isArray(reply?.suggestions)) suggestions = reply.suggestions;
      }

      setConversationStarted(true);
      setConversationStartTime(Date.now());

      if (openerArabic) {
        addMessage(openerArabic, MESSAGE_TYPES.AI, { english: openerEnglish });
        setAiFirstMessageReceived(true);
        playAiTurn?.(openerArabic, { messageId: 'opener' });
      } else {
        setAiFirstMessageReceived(true);
      }

      if (suggestions.length) setSuggestions(suggestions);

      // Estimated time → fallback finish button.
      const estimatedMinutes = scenarioData.estimatedTime || 5;
      const fallbackTimer = setTimeout(() => {
        if (!aiCompletionTriggered) setShowFinishButton(true);
      }, estimatedMinutes * 60 * 1000);

      return fallbackTimer;
    } catch (err) {
      console.warn('[guided-convo] startConversation failed:', err?.message);
      Alert.alert(
        'Could not start',
        err?.message || 'Please check the AI backend connection and try again.'
      );
      return null;
    } finally {
      startingRef.current = false;
    }
  }, [
    scenarioData,
    dialect,
    phase,
    aiCompletionTriggered,
    addMessage,
    MESSAGE_TYPES,
    playAiTurn,
    setConversationStarted,
    setConversationStartTime,
    setShowFinishButton,
    setSuggestions,
  ]);

  // Kick off the conversation once on mount (or when scenarioData arrives).
  useEffect(() => {
    let cancelled = false;
    let timerId = null;
    if (!conversationStarted && scenarioData) {
      startConversation().then((id) => {
        if (cancelled && id) clearTimeout(id);
        timerId = id;
      });
    }
    return () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [scenarioData, conversationStarted, startConversation]);

  // Cleanup on focus loss — kill audio and recording so they don't leak.
  useFocusEffect(
    React.useCallback(() => {
      isFocusedRef.current = true;
      return () => {
        isFocusedRef.current = false;
        cleanupExistingRecording?.();
        stopAudio().catch(() => {});
      };
    }, [cleanupExistingRecording, isFocusedRef])
  );

  const handleBack = useCallback(() => {
    resetConversation();
    cleanupExistingRecording?.();
    stopAudio().catch(() => {});
    onBack?.();
  }, [cleanupExistingRecording, onBack, resetConversation]);

  return {
    aiFirstMessageReceived,
    handleBack,
  };
}
