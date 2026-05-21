import React, { useRef } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import MessageBubble from './MessageBubble';
import { MESSAGE_TYPES } from './constants';

// Scrollable list of bubbles. Auto-scrolls to the latest message after layout
// settles. Shows a pulsing user-side bubble while STT is processing.
export default function MessageList({
  messages = [],
  onPlayAudio,
  isPlaying = false,
  playingMessageId = null,
  onTranslate,
  translations = {},
  translatingMessageId = null,
  showSTTLoading = false,
  style,
  contentContainerStyle,
  firstTranslateButtonRef = null,
}) {
  const scrollViewRef = useRef(null);
  const debounceRef = useRef(null);
  const contentH = useRef(0);
  const viewH = useRef(0);

  const onContentSizeChange = (_w, h) => {
    contentH.current = h;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const maxOffset = Math.max(0, contentH.current - viewH.current);
      if (maxOffset > 0) {
        scrollViewRef.current?.scrollTo({ y: maxOffset, animated: true });
      }
    }, 80);
  };

  const onLayout = (e) => {
    viewH.current = e.nativeEvent.layout.height;
  };

  const sorted = [...messages].sort(
    (a, b) => new Date(a.timestamp || 0) - new Date(b.timestamp || 0)
  );

  return (
    <ScrollView
      ref={scrollViewRef}
      style={[{ flex: 1, backgroundColor: theme.colors.background }, style]}
      contentContainerStyle={[
        { paddingVertical: 16, flexGrow: 1 },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={onContentSizeChange}
      onLayout={onLayout}
    >
      {sorted.map((message, index) => {
        const isFirstAI =
          firstTranslateButtonRef &&
          message.type === MESSAGE_TYPES.AI &&
          sorted.findIndex((m) => m.type === MESSAGE_TYPES.AI) === index;
        return (
          <MessageBubble
            key={message.id}
            message={message}
            onPlayAudio={onPlayAudio}
            isPlaying={isPlaying}
            playingMessageId={playingMessageId}
            onTranslate={onTranslate}
            translations={translations}
            translatingMessageId={translatingMessageId}
            translateButtonRef={isFirstAI ? firstTranslateButtonRef : null}
          />
        );
      })}

      {showSTTLoading ? (
        <View
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel="Transcribing your speech"
          accessibilityLiveRegion="polite"
          accessibilityState={{ busy: true }}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: 12,
            paddingHorizontal: 16,
          }}
        >
          <View
            importantForAccessibility="no"
            style={{
              backgroundColor: theme.colors.accent,
              borderRadius: 20,
              paddingVertical: 12,
              paddingHorizontal: 18,
              opacity: 0.8,
            }}
          >
            <ActivityIndicator size="small" color={theme.colors.white} />
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}
