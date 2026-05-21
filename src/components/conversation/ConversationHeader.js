import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../ui';
import { theme } from '../../theme';

// Generic header used by conversation-style activities (Shadowing, Chat).
// Renders back button + title/subtitle, an optional rightContent slot, and an
// optional children slot below the header (e.g., scenario context banner).
export default function ConversationHeader({
  title,
  subtitle,
  onBack,
  rightContent,
  children,
}) {
  const insets = useSafeAreaInsets();

  return (
    <>
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
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={{ padding: 8, marginRight: 8 }}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Back"
          accessibilityHint="Returns to the previous screen"
        >
          <Feather name="arrow-left" size={26} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text
            variant="display"
            weight="bold"
            accessibilityRole="header"
            style={{ fontSize: 24 }}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {rightContent}
      </View>
      {children}
    </>
  );
}
