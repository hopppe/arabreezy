import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { theme } from '../../theme';
import { Text } from '../../components/ui';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import {
  ConversationHeader,
  MessageList,
  MicrophoneButton,
} from '../../components/conversation';
import { useShadowingAudio, useShadowingPipeline } from './hooks';
import { ShadowingCompletionModal } from './components';
import useAudioRecording from '../GuidedConversations/hooks/useAudioRecording';

// Orchestrator for shadowing practice. Shares the press-and-hold recorder
// hook with GuidedConversations and reuses the conversation message list so
// the UX is consistent (target on the left, user transcription on the right,
// auto-scrolling, STT loading bubble).
export default function ShadowingPracticeInterface({ lessonData, onComplete, onBack }) {
  const { dialect } = useDialect();
  const { progress } = useUserProgress();
  const phase = progress.phase;

  const audioRecording = useAudioRecording();
  const {
    isRecording,
    isProcessing,
    showSTTLoading,
    setShowSTTLoading,
    handlePressIn,
    handlePressOut,
    cleanupExistingRecording,
  } = audioRecording;

  const [messages, setMessages] = useState([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);

  const pipeline = useShadowingPipeline({
    lessonData,
    phase,
    messages,
    setMessages,
    currentSentenceIndex,
    setCurrentSentenceIndex,
    setShowSTTLoading,
    dialect,
    onComplete: () => {
      audio.setShowCompletionModal(true);
    },
  });

  const audio = useShadowingAudio({
    lessonData,
    cleanupExistingRecording,
    dialect,
    setIsPlaying: pipeline.setIsPlaying,
    setPlayingMessageId: pipeline.setPlayingMessageId,
    onBack,
  });

  const startedRef = useRef(false);

  useEffect(() => {
    if (!lessonData || !lessonData.sentences?.length) return;
    const currentId = lessonData.lessonName || lessonData.id;
    if (pipeline.lastLessonIdRef.current === currentId) return;
    pipeline.lastLessonIdRef.current = currentId;

    let cancelled = false;
    setMessages([]);
    setCurrentSentenceIndex(0);
    audio.setTranslations({});
    pipeline.setPracticeStarted(false);
    pipeline.setAiFirstMessageReceived(false);
    startedRef.current = false;

    const timer = setTimeout(() => {
      if (!cancelled && !startedRef.current) {
        startedRef.current = true;
        pipeline.startShadowingPractice();
      }
    }, 120);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonData?.lessonName, lessonData?.id]);

  useEffect(() => {
    return () => {
      if (pipeline.completionTimeoutRef.current) {
        clearTimeout(pipeline.completionTimeoutRef.current);
        pipeline.completionTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onStopRecording = async (audioFile) => {
    if (!audioFile?.uri) {
      setShowSTTLoading(false);
      return;
    }
    await pipeline.processShadowingAudioStream(audioFile.uri);
  };

  const isMicDisabled =
    !pipeline.aiFirstMessageReceived || pipeline.isPlaying || isProcessing || showSTTLoading;

  const totalSentences = lessonData?.sentences?.length || 0;
  const displayIndex = Math.min(currentSentenceIndex + 1, totalSentences);

  const passedScores = messages
    .filter((m) => typeof m.score === 'number')
    .map((m) => m.score);
  const averageScore = passedScores.length
    ? passedScores.reduce((a, b) => a + b, 0) / passedScores.length
    : null;

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ConversationHeader
        title="Shadowing"
        subtitle={lessonData?.lessonName || `Phase ${phase}`}
        onBack={audio.handleBack}
        rightContent={
          totalSentences > 0 ? (
            <Text
              variant="small"
              weight="bold"
              accessibilityLabel={`Sentence ${displayIndex} of ${totalSentences}`}
              style={{ color: theme.colors.textMuted, paddingHorizontal: 8 }}
            >
              {displayIndex} / {totalSentences}
            </Text>
          ) : null
        }
      />

      <MessageList
        messages={messages}
        onPlayAudio={audio.handleMessageAudio}
        isPlaying={pipeline.isPlaying}
        playingMessageId={pipeline.playingMessageId}
        onTranslate={(messageId, content) => {
          const msg = messages.find((m) => m.id === messageId);
          audio.handleTranslate(messageId, content, msg);
        }}
        translations={audio.translations}
        translatingMessageId={audio.translatingMessageId}
        showSTTLoading={showSTTLoading}
      />

      <MicrophoneButton
        isRecording={isRecording}
        isDisabled={isMicDisabled}
        onPressIn={() => handlePressIn(undefined, onStopRecording)}
        onPressOut={() => handlePressOut(onStopRecording)}
        size={88}
      />

      <ShadowingCompletionModal
        visible={audio.showCompletionModal}
        totalSentences={totalSentences}
        averageScore={averageScore}
        onContinue={() => {
          audio.handleCompletionContinue();
          onComplete?.({ averageScore });
        }}
        onClose={audio.handleCompletionContinue}
      />
    </View>
  );
}
