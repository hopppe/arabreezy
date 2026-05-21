import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../../../components/ui';
import { MicrophoneButton } from '../../../components/conversation';
import { theme } from '../../../theme';

// Bottom controls: a single mic button with an optional Finish button to the
// right that fades in once the estimated time has elapsed.
export default function ConversationControls({
  isRecording,
  isProcessing,
  isPlaying,
  showFinishButton,
  onPressIn,
  onPressOut,
  onFinishConversation,
  showSTTLoading,
  aiFirstMessageReceived = false,
}) {
  const micDisabled =
    !aiFirstMessageReceived || isPlaying || isProcessing || showSTTLoading;

  return (
    <View
      style={{
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {showFinishButton ? (
        <TouchableOpacity
          onPress={onFinishConversation}
          activeOpacity={0.85}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Finish conversation"
          accessibilityHint="Ends the conversation and shows your feedback summary"
          style={{
            position: 'absolute',
            right: 24,
            top: '50%',
            transform: [{ translateY: -22 }],
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 18,
            borderRadius: 24,
            backgroundColor: theme.colors.black,
            minHeight: 44,
          }}
        >
          <Ionicons name="checkmark-circle" size={22} color={theme.colors.white} />
          <Text weight="bold" style={{ color: theme.colors.white, marginLeft: 6 }}>
            Finish
          </Text>
        </TouchableOpacity>
      ) : null}

      <MicrophoneButton
        isRecording={isRecording}
        isDisabled={micDisabled}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        size={88}
      />
    </View>
  );
}
