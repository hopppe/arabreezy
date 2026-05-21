import { useRef, useCallback } from 'react';
import { Alert } from 'react-native';
import { transcribe } from '../../../services/recording';
import { speak, play, stop as stopAudio } from '../../../services/audio';
import { postJson } from '../../../config/aiBackend';
import { END_CONVERSATION_TOKEN } from '../constants';

const CHAT_PATH = '/api/chat';

// Reduce the conversation to the shape the chat backend expects.
// AI turns are stored as { content: arabic, english }.
function toHistory(messages, MESSAGE_TYPES) {
  return messages.map((m) => ({
    role: m.type === MESSAGE_TYPES.USER ? 'user' : 'assistant',
    arabic: m.content,
    english: m.english,
  }));
}

// Strip the [END_CONVERSATION] token and tell the caller whether the AI signalled the end.
function detectEnding(arabic) {
  if (!arabic) return { text: '', ended: false };
  const ended = arabic.includes(END_CONVERSATION_TOKEN);
  return { text: arabic.replace(END_CONVERSATION_TOKEN, '').trim(), ended };
}

export default function useConversationMessages({
  conversationState,
  audioRecording,
  scenarioData,
  phase,
  dialect,
  isFocusedRef,
  handleConversationCompletion,
}) {
  const {
    messages,
    translations,
    isPlaying,
    playingMessageId,
    addMessage,
    setTranslations,
    setTranslatingMessageId,
    setSuggestions,
    setIsPlaying,
    setPlayingMessageId,
    setCompletionData,
    setAiCompletionTriggered,
    MESSAGE_TYPES,
  } = conversationState;

  const { setShowSTTLoading } = audioRecording;

  const audioFinishedResolverRef = useRef(null);

  // Auto-play TTS for an AI reply. Resolves the audioFinishedResolver if set
  // (used by the completion flow to wait for final-line audio before
  // showing the modal).
  const playAiTurn = useCallback(
    async (text, { messageId = 'auto-tts', isEnding = false } = {}) => {
      if (!text) {
        if (isEnding) handleConversationCompletion?.();
        return;
      }
      setIsPlaying(true);
      setPlayingMessageId(messageId);
      try {
        if (!isFocusedRef.current) return;
        const uri = await speak(text, { dialect });
        if (!isFocusedRef.current) {
          stopAudio().catch(() => {});
          return;
        }
        if (uri) await play(uri);
      } catch (err) {
        console.warn('[guided-convo] tts failed:', err?.message);
      } finally {
        setIsPlaying(false);
        setPlayingMessageId(null);
        if (isEnding) {
          setTimeout(() => handleConversationCompletion?.(), 400);
        }
        if (audioFinishedResolverRef.current) {
          audioFinishedResolverRef.current();
          audioFinishedResolverRef.current = null;
        }
      }
    },
    [dialect, isFocusedRef, setIsPlaying, setPlayingMessageId, handleConversationCompletion]
  );

  // Single round-trip to the chat backend with the running history.
  const requestAiReply = useCallback(
    async (history) => {
      const body = {
        history,
        dialect,
        phase,
        scenarioKey: scenarioData?.id,
        scenarioTitle: scenarioData?.title,
        scenarioDescription: scenarioData?.description,
        includeSuggestions: true,
      };
      return postJson(CHAT_PATH, body);
    },
    [dialect, phase, scenarioData]
  );

  // Send a typed/tapped suggestion as if the user said it.
  const sendMessage = useCallback(
    async (messageText) => {
      const trimmed = (messageText || '').trim();
      if (!trimmed) return;
      try {
        setShowSTTLoading(false);
        addMessage(trimmed, MESSAGE_TYPES.USER);

        const nextHistory = [
          ...toHistory(messages, MESSAGE_TYPES),
          { role: 'user', arabic: trimmed },
        ];

        const reply = await requestAiReply(nextHistory);
        const { text: arabic, ended } = detectEnding(reply?.arabic);
        const english = reply?.english || null;

        if (arabic) addMessage(arabic, MESSAGE_TYPES.AI, { english });

        if (ended) {
          setAiCompletionTriggered(true);
          setCompletionData({
            reason: 'natural_ending',
            goalsProgress: { completed: 1, total: 1, percentage: 100 },
            endingDetected: true,
          });
        }

        if (Array.isArray(reply?.suggestions)) {
          setSuggestions(reply.suggestions);
        }

        await playAiTurn(arabic, { isEnding: ended });
      } catch (err) {
        console.warn('[guided-convo] sendMessage failed:', err?.message);
        Alert.alert(
          'Connection issue',
          'Could not reach the Arabic tutor. Check the AI backend and try again.'
        );
      }
    },
    [
      addMessage,
      messages,
      MESSAGE_TYPES,
      playAiTurn,
      requestAiReply,
      setAiCompletionTriggered,
      setCompletionData,
      setShowSTTLoading,
      setSuggestions,
    ]
  );

  // Replay audio for any AI message in the list.
  const handleMessageAudio = useCallback(
    async (messageId, content) => {
      try {
        if (isPlaying) {
          await stopAudio();
          setIsPlaying(false);
          setPlayingMessageId(null);
          if (playingMessageId === messageId) return;
        }
        setIsPlaying(true);
        setPlayingMessageId(messageId);
        const uri = await speak(content, { dialect });
        if (uri) await play(uri);
      } catch (err) {
        console.warn('[guided-convo] replay failed:', err?.message);
      } finally {
        setIsPlaying(false);
        setPlayingMessageId(null);
      }
    },
    [dialect, isPlaying, playingMessageId, setIsPlaying, setPlayingMessageId]
  );

  // Toggle the English gloss for an AI message. For AI messages we already
  // received the gloss inline (no extra call). For user messages we ask the
  // chat endpoint to translate as a one-shot.
  const handleTranslate = useCallback(
    async (messageId, content) => {
      if (translations[messageId]) {
        setTranslations((prev) => {
          const next = { ...prev };
          delete next[messageId];
          return next;
        });
        return;
      }

      const inlineMatch = messages.find((m) => m.id === messageId);
      if (inlineMatch?.english) {
        setTranslations((prev) => ({ ...prev, [messageId]: inlineMatch.english }));
        return;
      }

      setTranslatingMessageId(messageId);
      try {
        const reply = await postJson(CHAT_PATH, {
          history: [
            {
              role: 'user',
              arabic: `Translate this Arabic line to a single short English sentence: ${content}`,
            },
          ],
          dialect,
          phase,
          scenarioKey: 'translate',
        });
        const englishText = reply?.english || reply?.arabic || '';
        if (englishText) {
          setTranslations((prev) => ({ ...prev, [messageId]: englishText }));
        }
      } catch (err) {
        Alert.alert('Translation failed', err?.message || 'Please try again.');
      } finally {
        setTranslatingMessageId(null);
      }
    },
    [
      dialect,
      phase,
      messages,
      translations,
      setTranslations,
      setTranslatingMessageId,
    ]
  );

  // STT → chat → TTS pipeline triggered by useAudioRecording on release.
  const onStopRecording = useCallback(
    async (audioFile) => {
      try {
        const transcription = await transcribe(audioFile.uri, { language: 'ar' });
        setShowSTTLoading(false);

        if (!transcription) {
          Alert.alert(
            'Did not catch that',
            "We couldn't understand your recording. Try speaking a little louder or closer to the mic."
          );
          return;
        }

        addMessage(transcription, MESSAGE_TYPES.USER);

        const nextHistory = [
          ...toHistory(messages, MESSAGE_TYPES),
          { role: 'user', arabic: transcription },
        ];

        const reply = await requestAiReply(nextHistory);
        const { text: arabic, ended } = detectEnding(reply?.arabic);
        const english = reply?.english || null;

        if (arabic) addMessage(arabic, MESSAGE_TYPES.AI, { english });

        if (ended) {
          setAiCompletionTriggered(true);
          setCompletionData({
            reason: 'natural_ending',
            goalsProgress: { completed: 1, total: 1, percentage: 100 },
            endingDetected: true,
          });
        }

        if (Array.isArray(reply?.suggestions)) {
          setSuggestions(reply.suggestions);
        }

        await playAiTurn(arabic, { isEnding: ended });
      } catch (err) {
        console.warn('[guided-convo] pipeline failed:', err?.message);
        setShowSTTLoading(false);
        Alert.alert(
          'Could not process audio',
          err?.message || 'Try again in a moment.'
        );
      }
    },
    [
      addMessage,
      MESSAGE_TYPES,
      messages,
      playAiTurn,
      requestAiReply,
      setAiCompletionTriggered,
      setCompletionData,
      setShowSTTLoading,
      setSuggestions,
    ]
  );

  // Short, in-Arabic feedback summary shown in the completion modal.
  const generateImprovementFeedback = useCallback(async () => {
    if (!messages.length) return null;
    try {
      const userTurns = messages
        .filter((m) => m.type === MESSAGE_TYPES.USER)
        .map((m) => m.content);
      if (!userTurns.length) return null;

      const reply = await postJson(CHAT_PATH, {
        history: [
          {
            role: 'user',
            arabic:
              'Give 2 short encouraging sentences of feedback in Arabic about the learner’s replies in this conversation. ' +
              'Be specific and warm. The learner is at phase ' +
              (phase ?? 1) +
              '. Their replies were: ' +
              userTurns.join(' | '),
          },
        ],
        dialect,
        phase,
        scenarioKey: 'feedback',
      });
      return reply?.arabic
        ? { overallAssessment: reply.arabic, english: reply.english }
        : null;
    } catch (err) {
      console.warn('[guided-convo] feedback failed:', err?.message);
      return null;
    }
  }, [dialect, phase, messages, MESSAGE_TYPES]);

  return {
    sendMessage,
    handleMessageAudio,
    handleTranslate,
    generateImprovementFeedback,
    onStopRecording,
    playAiTurn,
    audioFinishedResolverRef,
  };
}
