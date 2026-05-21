import { useCallback, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { MESSAGE_TYPES } from '../../../components/conversation/constants';
import { transcribe } from '../../../services/recording';
import { speak, play, stop as stopAudio } from '../../../services/audio';

// Strip Arabic diacritics, tatweel, and non-Arabic characters so the
// comparison shrugs off the small Whisper artifacts (commas, periods,
// stray Latin words). Returns lowercase whitespace-collapsed text.
function normalizeArabic(s) {
  return (s || '')
    .replace(/[ً-ْٰـ]/g, '')
    .replace(/[^؀-ۿ\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Approximate word-overlap score. 1.0 = every target word landed in the
// transcription, 0 = none did.
function scoreMatch(target, transcript) {
  const t = normalizeArabic(target);
  const u = normalizeArabic(transcript);
  if (!t || !u) return 0;
  const targetWords = t.split(' ').filter(Boolean);
  const userWords = new Set(u.split(' ').filter(Boolean));
  if (targetWords.length === 0) return 0;
  let hits = 0;
  for (const w of targetWords) {
    if (userWords.has(w)) hits += 1;
  }
  return hits / targetWords.length;
}

const PASS_THRESHOLD = 0.6;

// Shadowing's STT-→-score-→-advance pipeline. Lives next to useShadowingAudio
// which handles the listen-to-target side. State is split this way to mirror
// the English app's hook layout.
export default function useShadowingPipeline({
  lessonData,
  phase,
  messages,
  setMessages,
  currentSentenceIndex,
  setCurrentSentenceIndex,
  setShowSTTLoading,
  dialect,
  onComplete,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState(null);
  const [practiceStarted, setPracticeStarted] = useState(false);
  const [aiFirstMessageReceived, setAiFirstMessageReceived] = useState(false);

  const lastLessonIdRef = useRef(null);
  const completionTimeoutRef = useRef(null);
  const startingRef = useRef(false);

  const sentences = lessonData?.sentences || [];
  const totalSentences = sentences.length;

  const playSentence = useCallback(
    async (sentence, messageId) => {
      if (!sentence?.script) return;
      setIsPlaying(true);
      setPlayingMessageId(messageId);
      try {
        const uri = await speak(sentence.script, { dialect });
        if (uri) await play(uri);
      } catch (err) {
        console.warn('[shadowing] tts failed:', err?.message);
      } finally {
        setIsPlaying(false);
        setPlayingMessageId(null);
      }
    },
    [dialect]
  );

  const startShadowingPractice = useCallback(async () => {
    if (startingRef.current || !totalSentences) return;
    startingRef.current = true;
    try {
      const first = sentences[0];
      const firstMsg = {
        id: `target-0-${Date.now()}`,
        type: MESSAGE_TYPES.AI,
        content: first.script,
        english: first.english || first.translation || null,
        timestamp: new Date().toISOString(),
        sentenceIndex: 0,
        isTarget: true,
      };
      setMessages([firstMsg]);
      setPracticeStarted(true);
      setAiFirstMessageReceived(true);
      await playSentence(first, firstMsg.id);
    } finally {
      startingRef.current = false;
    }
  }, [sentences, totalSentences, playSentence, setMessages]);

  // Whisper the user's recording, score against the active target, append
  // both the user turn and the next target, then auto-play the next target.
  const processShadowingAudioStream = useCallback(
    async (audioUri) => {
      try {
        const transcription = await transcribe(audioUri, { language: 'ar' });
        setShowSTTLoading(false);

        if (!transcription) {
          Alert.alert(
            'Did not catch that',
            "We couldn't hear your shadowing — try again a bit louder."
          );
          return;
        }

        const target = sentences[currentSentenceIndex];
        const score = scoreMatch(target?.script || '', transcription);
        const passed = score >= PASS_THRESHOLD;

        const userMsg = {
          id: `user-${currentSentenceIndex}-${Date.now()}`,
          type: MESSAGE_TYPES.USER,
          content: transcription,
          timestamp: new Date().toISOString(),
          sentenceIndex: currentSentenceIndex,
          score,
          passed,
        };
        setMessages((prev) => [...prev, userMsg]);

        const isLast = currentSentenceIndex + 1 >= totalSentences;
        if (isLast) {
          completionTimeoutRef.current = setTimeout(() => {
            onComplete?.({ score, passed });
          }, 800);
          return;
        }

        const nextIdx = currentSentenceIndex + 1;
        const next = sentences[nextIdx];
        const nextMsg = {
          id: `target-${nextIdx}-${Date.now()}`,
          type: MESSAGE_TYPES.AI,
          content: next.script,
          english: next.english || next.translation || null,
          timestamp: new Date().toISOString(),
          sentenceIndex: nextIdx,
          isTarget: true,
        };
        setMessages((prev) => [...prev, nextMsg]);
        setCurrentSentenceIndex(nextIdx);
        await playSentence(next, nextMsg.id);
      } catch (err) {
        console.warn('[shadowing] pipeline failed:', err?.message);
        setShowSTTLoading(false);
        Alert.alert('Could not process audio', err?.message || 'Try again in a moment.');
      }
    },
    [
      currentSentenceIndex,
      sentences,
      totalSentences,
      playSentence,
      setMessages,
      setCurrentSentenceIndex,
      setShowSTTLoading,
      onComplete,
    ]
  );

  const replayCurrentTarget = useCallback(async () => {
    const target = sentences[currentSentenceIndex];
    if (!target) return;
    const id = `replay-${currentSentenceIndex}-${Date.now()}`;
    await stopAudio().catch(() => {});
    await playSentence(target, id);
  }, [currentSentenceIndex, sentences, playSentence]);

  return {
    isPlaying,
    playingMessageId,
    setIsPlaying,
    setPlayingMessageId,
    practiceStarted,
    setPracticeStarted,
    aiFirstMessageReceived,
    setAiFirstMessageReceived,
    lastLessonIdRef,
    completionTimeoutRef,
    startShadowingPractice,
    processShadowingAudioStream,
    replayCurrentTarget,
    PASS_THRESHOLD,
  };
}
