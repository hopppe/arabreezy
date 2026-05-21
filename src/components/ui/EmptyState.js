import React from 'react';
import { View } from 'react-native';
import { Text } from './Text';
import { Button } from './Button';
import { theme } from '../../theme';

// Single-source empty state for "no content here yet". Use across all
// activity lists so the look stays consistent.
export function EmptyState({ icon = '✨', title, body, actionLabel, onAction, actionHint }) {
  return (
    <View
      accessible={false}
      style={{ alignItems: 'center', paddingVertical: theme.spacing.xl }}
    >
      <View
        importantForAccessibility="no"
        accessibilityElementsHidden
        style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          backgroundColor: theme.colors.accentSoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 44 }} accessible={false}>{icon}</Text>
      </View>
      {title && (
        <Text
          variant="title"
          weight="bold"
          accessibilityRole="header"
          style={{ marginTop: theme.spacing.lg, textAlign: 'center' }}
        >
          {title}
        </Text>
      )}
      {body && (
        <Text
          variant="body"
          style={{
            marginTop: theme.spacing.sm,
            color: theme.colors.textMuted,
            textAlign: 'center',
            paddingHorizontal: theme.spacing.lg,
          }}
        >
          {body}
        </Text>
      )}
      {actionLabel && onAction && (
        <View style={{ marginTop: theme.spacing.lg, alignSelf: 'stretch' }}>
          <Button
            title={actionLabel}
            variant="ghost"
            onPress={onAction}
            accessibilityHint={actionHint}
          />
        </View>
      )}
    </View>
  );
}
