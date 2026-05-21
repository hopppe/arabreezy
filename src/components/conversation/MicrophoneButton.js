import React, { forwardRef, useCallback, useRef } from 'react';
import { View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../theme';

// Press-and-hold mic button.
//   isRecording true       → red, square icon (release to send)
//   isDisabled              → muted grey
//   default                 → accent, mic icon
// Always forwards onPressOut even when isRecording is still false — the
// recorder hook resolves quick-tap / deferred-stop on its own.
const MicrophoneButton = forwardRef(function MicrophoneButton(
  {
    isRecording = false,
    isDisabled = false,
    onPressIn,
    onPressOut,
    size = 88,
    containerStyle,
    buttonStyle,
  },
  ref
) {
  const insets = useSafeAreaInsets();
  const isPressingRef = useRef(false);
  const iconSize = Math.round(size * 0.4);

  if (isDisabled) {
    isPressingRef.current = false;
  }

  const handlePressIn = useCallback(() => {
    if (isDisabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    if (isPressingRef.current) return;
    isPressingRef.current = true;
    onPressIn?.();
  }, [isDisabled, onPressIn]);

  const handlePressOut = useCallback(() => {
    if (!isPressingRef.current) return;
    isPressingRef.current = false;
    if (isRecording) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }
    onPressOut?.();
  }, [isRecording, onPressOut]);

  const background = isRecording
    ? theme.colors.error
    : isDisabled
    ? theme.colors.gray400
    : theme.colors.accent;

  return (
    <View
      style={[
        {
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBottom: Math.max(insets.bottom, 12) + 12,
          backgroundColor: theme.colors.background,
          alignItems: 'center',
          justifyContent: 'center',
        },
        containerStyle,
      ]}
    >
      <Pressable
        ref={ref}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        accessible
        accessibilityRole="button"
        accessibilityLabel={isRecording ? 'Stop recording' : 'Record speech'}
        accessibilityHint={
          isRecording
            ? 'Release to send what you said'
            : 'Press and hold to record. Release to send.'
        }
        accessibilityState={{ disabled: isDisabled, busy: isRecording }}
      >
        <View
          style={[
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: background,
              opacity: isDisabled && !isRecording ? 0.6 : 1,
            },
            buttonStyle,
          ]}
        >
          <Feather
            name={isRecording ? 'square' : 'mic'}
            size={iconSize}
            color={theme.colors.white}
          />
        </View>
      </Pressable>
    </View>
  );
});

export default MicrophoneButton;
