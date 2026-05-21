import React, { forwardRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '../../../components/ui';
import { ArabicText } from '../../../components/ArabicText';
import { theme } from '../../../theme';

// Quick-reply chips offered after each AI turn. A suggestion is either a
// plain string (Arabic) or { arabic, english }. Tap-to-send is enabled for
// early phases — at higher phases the chips act as inspiration only.
const SuggestionBubbles = forwardRef(function SuggestionBubbles(
  { suggestions, onSuggestionPress, phase = 1 },
  ref
) {
  if (!suggestions || suggestions.length === 0) return null;

  const tapEnabled = phase <= 4;

  return (
    <View
      ref={ref}
      accessibilityRole="list"
      accessibilityLabel="Reply suggestions"
      style={{
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 4,
        alignItems: 'flex-end',
      }}
    >
      <Text
        variant="small"
        weight="bold"
        style={{ color: theme.colors.textMuted, marginBottom: 6 }}
      >
        Try saying…
      </Text>
      {suggestions.slice(0, 2).map((suggestion, index) => {
        const arabic =
          typeof suggestion === 'string' ? suggestion : suggestion?.arabic;
        const english =
          typeof suggestion === 'string' ? null : suggestion?.english;
        if (!arabic) return null;
        const a11yLabel = english ? `Suggestion: ${english}` : `Suggestion in Arabic`;
        return (
          <TouchableOpacity
            key={`${index}-${arabic.slice(0, 12)}`}
            onPress={() => tapEnabled && onSuggestionPress(arabic)}
            activeOpacity={tapEnabled ? 0.7 : 1}
            disabled={!tapEnabled}
            accessible
            accessibilityRole="button"
            accessibilityLabel={a11yLabel}
            accessibilityHint={tapEnabled ? 'Sends this suggestion as your reply' : 'For inspiration only — record your own reply'}
            accessibilityState={{ disabled: !tapEnabled }}
            style={{
              backgroundColor: theme.colors.accent,
              borderRadius: 20,
              paddingHorizontal: 14,
              paddingVertical: 8,
              marginBottom: 6,
              maxWidth: '85%',
              opacity: tapEnabled ? 0.95 : 0.7,
              minHeight: 36,
            }}
          >
            <ArabicText
              size="sm"
              accessibilityLabel={english || arabic}
              style={{ color: theme.colors.white }}
            >
              {arabic}
            </ArabicText>
            {english ? (
              <Text
                variant="caption"
                style={{ color: 'rgba(255,255,255,0.85)', marginTop: 2 }}
              >
                {english}
              </Text>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

export default SuggestionBubbles;
