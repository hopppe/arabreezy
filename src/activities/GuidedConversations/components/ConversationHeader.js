import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../../components/ui';
import { PhaseBadge } from '../../../components/PhaseBadge';
import { theme } from '../../../theme';

// Header bar + scenario context banner for a guided conversation. Matches
// the English app's layout: back button + title/subtitle, then a banner with
// scenario details and learner goals.
export default function ConversationHeader({ scenarioData, onBack }) {
  const insets = useSafeAreaInsets();

  if (!scenarioData) return null;

  const goals = Array.isArray(scenarioData.focalWordIds)
    ? scenarioData.focalWordIds.slice(0, 4)
    : [];

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: insets.top + 8,
          paddingHorizontal: 16,
          paddingBottom: 12,
          backgroundColor: theme.colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        }}
      >
        <TouchableOpacity
          onPress={onBack}
          style={{ padding: 8, marginRight: 8 }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Back"
          accessibilityHint="Returns to the conversation picker"
        >
          <Feather name="chevron-left" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text variant="display" weight="bold" accessibilityRole="header" style={{ fontSize: 22 }}>
            Guided Conversation
          </Text>
          <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
            {scenarioData.title || 'Practice session'}
          </Text>
        </View>
        {typeof scenarioData.phase === 'number' ? (
          <PhaseBadge phase={scenarioData.phase} />
        ) : null}
      </View>

      <View
        style={{
          backgroundColor: theme.colors.surface,
          paddingHorizontal: 16,
          paddingVertical: 12,
          marginHorizontal: 16,
          marginTop: 8,
          marginBottom: 4,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.colors.border,
        }}
      >
        {scenarioData.title ? (
          <Text weight="bold" style={{ color: theme.colors.accent, marginBottom: 6 }}>
            {scenarioData.title}
          </Text>
        ) : null}
        {scenarioData.description ? (
          <Text variant="small" style={{ color: theme.colors.text, lineHeight: 20 }}>
            {scenarioData.description}
          </Text>
        ) : null}
        {goals.length ? (
          <Text
            variant="caption"
            style={{
              color: theme.colors.textMuted,
              fontStyle: 'italic',
              marginTop: 8,
            }}
          >
            Focus words: {goals.join(', ')}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
