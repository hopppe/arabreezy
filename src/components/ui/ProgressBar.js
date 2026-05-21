import React from 'react';
import { View } from 'react-native';
import { theme } from '../../theme';

export function ProgressBar({ value = 0, height = 8, label }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label || 'Progress'}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}
      style={{
        height,
        backgroundColor: theme.colors.gray200,
        borderRadius: theme.radius.pill,
        overflow: 'hidden',
      }}
    >
      <View
        importantForAccessibility="no"
        style={{
          width: `${pct}%`,
          height: '100%',
          backgroundColor: theme.colors.accent,
        }}
      />
    </View>
  );
}

export default ProgressBar;
