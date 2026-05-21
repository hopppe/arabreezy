import React from 'react';
import { View } from 'react-native';
import { theme } from '../../theme';

// Slim segmented progress bar shown across the top of every onboarding screen.
// Visual reinforcement that the user is making progress through a short flow —
// this is the single highest-leverage trick in any high-converting onboarding,
// per Cleo / Headway-style funnels.
export function OnboardingProgressBar({ step, total }) {
  const segments = Array.from({ length: total }, (_, i) => i < step);
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={`Onboarding step ${step} of ${total}`}
      accessibilityValue={{ min: 0, max: total, now: step }}
      style={{ flexDirection: 'row', gap: 6, paddingHorizontal: theme.spacing.lg, marginTop: theme.spacing.sm }}
    >
      {segments.map((filled, i) => (
        <View
          key={i}
          importantForAccessibility="no"
          style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            backgroundColor: filled ? theme.colors.black : theme.colors.gray200,
          }}
        />
      ))}
    </View>
  );
}

export default OnboardingProgressBar;
