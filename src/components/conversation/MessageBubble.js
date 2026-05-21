import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text } from '../ui';
import { ArabicText } from '../ArabicText';
import { theme } from '../../theme';
import { MESSAGE_TYPES } from './constants';

// Single message bubble used by both Guided Conversations and Chat.
//   AI: left-aligned, surface bubble, Arabic + (optional) English gloss,
//       play + translate actions.
//   User: right-aligned, accent bubble, Arabic only.
export default function MessageBubble({
  message,
  onPlayAudio,
  isPlaying = false,
  playingMessageId = null,
  isAudioDisabled = false,
  onTranslate,
  translations = {},
  translatingMessageId = null,
  translateButtonRef = null,
}) {
  const isAI = message.type === MESSAGE_TYPES.AI;
  const isCurrentlyPlaying = isPlaying && playingMessageId === message.id;
  const isTranslating = translatingMessageId === message.id;
  const translation = translations[message.id] || (isAI ? message.english : null);
  const showActions = isAI && (onPlayAudio || onTranslate);

  const speaker = isAI ? 'Tutor' : 'You';
  const bubbleA11yLabel = translation
    ? `${speaker} said: ${message.content}. ${translation}`
    : `${speaker} said: ${message.content}`;
  const audioDisabled = isAudioDisabled || (isPlaying && !isCurrentlyPlaying);

  return (
    <View
      style={{
        marginBottom: 12,
        paddingHorizontal: 8,
        width: '100%',
        alignItems: isAI ? 'flex-start' : 'flex-end',
      }}
    >
      <View
        accessible
        accessibilityLabel={bubbleA11yLabel}
        style={{
          maxWidth: '85%',
          padding: 12,
          borderRadius: 16,
          backgroundColor: isAI ? theme.colors.surfaceMuted : theme.colors.accent,
          borderBottomLeftRadius: isAI ? 4 : 16,
          borderBottomRightRadius: isAI ? 16 : 4,
        }}
      >
        <ArabicText
          size="md"
          accessibilityLabel={message.content}
          style={{ color: isAI ? theme.colors.text : theme.colors.white }}
        >
          {message.content}
        </ArabicText>

        {translation ? (
          <Text
            variant="small"
            style={{
              color: isAI ? theme.colors.textMuted : 'rgba(255,255,255,0.85)',
              marginTop: 6,
              fontStyle: 'italic',
            }}
          >
            {translation}
          </Text>
        ) : null}

        {showActions ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
              gap: 16,
            }}
          >
            {onPlayAudio ? (
              <TouchableOpacity
                onPress={() => onPlayAudio(message.id, message.content)}
                disabled={audioDisabled}
                style={{ flexDirection: 'row', alignItems: 'center' }}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessible
                accessibilityRole="button"
                accessibilityLabel={isCurrentlyPlaying ? 'Stop audio' : 'Play audio'}
                accessibilityHint="Plays the Arabic audio for this message"
                accessibilityState={{ disabled: audioDisabled, busy: isCurrentlyPlaying }}
              >
                <Feather
                  name={isCurrentlyPlaying ? 'square' : 'play'}
                  size={16}
                  color={theme.colors.textMuted}
                />
              </TouchableOpacity>
            ) : null}

            {onTranslate ? (
              <TouchableOpacity
                ref={translateButtonRef}
                onPress={() => onTranslate(message.id, message.content)}
                disabled={isTranslating}
                style={{ flexDirection: 'row', alignItems: 'center' }}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessible
                accessibilityRole="button"
                accessibilityLabel={isTranslating ? 'Translating' : 'Translate to English'}
                accessibilityHint="Shows the English meaning under this message"
                accessibilityState={{ disabled: isTranslating, busy: isTranslating }}
              >
                {isTranslating ? (
                  <ActivityIndicator size={16} color={theme.colors.textMuted} />
                ) : (
                  <Feather name="globe" size={16} color={theme.colors.textMuted} />
                )}
                <Text
                  variant="caption"
                  style={{ color: theme.colors.textMuted, marginLeft: 4 }}
                >
                  Translate
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
}
