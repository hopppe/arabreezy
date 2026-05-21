import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { theme } from '../../theme';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';

import {
  ConversationHeader,
  MessageList,
  SuggestionBubbles,
  ConversationControls,
  CompletionModal,
} from './components';

import {
  useConversationState,
  useAudioRecording,
  useConversationMessages,
  useConversationSetup,
} from './hooks';

// Top-level orchestrator. Composes the four hooks + UI pieces and exposes a
// single { scenarioData, onComplete, onBack } API so the screen layer stays
// thin. Mirrors the English app's GuidedConversationInterface.
export default function GuidedConversationInterface({ scenarioData, onComplete, onBack }) {
  const { dialect } = useDialect();
  const { progress } = useUserProgress();
  const phase = progress.phase;

  const conversationState = useConversationState();
  const audioRecording = useAudioRecording();

  const isFocusedRef = useRef(true);
  const suggestionsRef = useRef(null);
  const translateButtonRef = useRef(null);

  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const {
    messages,
    translations,
    translatingMessageId,
    suggestions,
    showFinishButton,
    completionData,
    isPlaying,
    playingMessageId,
    setCompletionData,
  } = conversationState;

  const {
    isRecording,
    isProcessing,
    showSTTLoading,
    handlePressIn,
    handlePressOut,
  } = audioRecording;

  // Plain function (not useCallback) so it always captures the latest
  // messageHooks closure, even though messageHooks is declared after this.
  const handleConversationCompletion = async () => {
    const reply = await messageHooks.generateImprovementFeedback().catch(() => null);
    setCompletionData((prev) => ({
      ...(prev || { reason: 'manual_finish' }),
      improvementFeedback: reply || null,
    }));
    setShowCompletionModal(true);
  };

  const messageHooks = useConversationMessages({
    conversationState,
    audioRecording,
    scenarioData,
    phase,
    dialect,
    isFocusedRef,
    handleConversationCompletion,
  });

  const setup = useConversationSetup({
    conversationState,
    audioRecording,
    scenarioData,
    phase,
    dialect,
    isFocusedRef,
    onBack,
    playAiTurn: messageHooks.playAiTurn,
  });

  // Track screen focus for the audio-cleanup branches in the hooks.
  useEffect(() => {
    isFocusedRef.current = true;
    return () => {
      isFocusedRef.current = false;
    };
  }, []);

  const handleSuggestionPress = (text) => messageHooks.sendMessage(text);

  const handleFinishConversation = async () => {
    setCompletionData((prev) => prev || {
      reason: 'manual_finish',
      goalsProgress: { completed: 1, total: 1, percentage: 100 },
      endingDetected: false,
    });
    await handleConversationCompletion();
  };

  const handleContinueAfterCompletion = () => {
    setShowCompletionModal(false);
    onComplete?.(completionData?.improvementFeedback || null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ConversationHeader scenarioData={scenarioData} onBack={setup.handleBack} />

      <MessageList
        messages={messages}
        onPlayAudio={messageHooks.handleMessageAudio}
        isPlaying={isPlaying}
        playingMessageId={playingMessageId}
        onTranslate={messageHooks.handleTranslate}
        translations={translations}
        translatingMessageId={translatingMessageId}
        showSTTLoading={showSTTLoading}
        firstTranslateButtonRef={translateButtonRef}
      />

      <SuggestionBubbles
        ref={suggestionsRef}
        suggestions={suggestions}
        onSuggestionPress={handleSuggestionPress}
        phase={phase}
      />

      <ConversationControls
        isRecording={isRecording}
        isProcessing={isProcessing}
        isPlaying={isPlaying}
        showFinishButton={showFinishButton}
        showSTTLoading={showSTTLoading}
        aiFirstMessageReceived={setup.aiFirstMessageReceived}
        onPressIn={() => handlePressIn(undefined, messageHooks.onStopRecording)}
        onPressOut={() => handlePressOut(messageHooks.onStopRecording)}
        onFinishConversation={handleFinishConversation}
      />

      <CompletionModal
        visible={showCompletionModal}
        completionData={completionData}
        onContinue={handleContinueAfterCompletion}
        onClose={() => setShowCompletionModal(false)}
      />
    </View>
  );
}
