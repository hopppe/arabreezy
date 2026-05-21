import React from 'react';
import { View } from 'react-native';
import { Text } from './Text';
import { ProgressBar } from './ProgressBar';
import { theme } from '../../theme';

// Unified top strip for every activity & picker.
//   - title / subtitle: shown for pickers and for step-based screens that
//     want a heading.
//   - current / total: renders an "i / N" counter and (unless `progress` is
//     given) drives the progress bar.
//   - progress: 0–100 percent; overrides counter-derived progress.
//
// Right padding leaves room for the ScreenContainer close (X) button so long
// titles can't collide with it.
export function ActivityHeader({ title, subtitle, current, total, progress }) {
  const hasCounter = current != null && total != null;
  const hasProgress = progress != null || hasCounter;
  const pct = progress != null
    ? progress
    : hasCounter && total > 0
      ? (current / total) * 100
      : 0;

  const counterLabel = hasCounter ? `Step ${current} of ${total}` : null;
  const progressLabel = title
    ? `${title} progress`
    : counterLabel || 'Progress';

  return (
    <View style={{ marginBottom: theme.spacing.md, paddingRight: 44 }}>
      {title ? (
        <Text variant="title" weight="bold" accessibilityRole="header">
          {title}
        </Text>
      ) : null}
      {subtitle ? (
        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
          {subtitle}
        </Text>
      ) : null}
      {hasCounter ? (
        <Text
          variant="caption"
          accessibilityLabel={counterLabel}
          style={{
            color: theme.colors.textMuted,
            marginTop: title || subtitle ? theme.spacing.sm : 0,
          }}
        >
          {current} / {total}
        </Text>
      ) : null}
      {hasProgress ? (
        <View style={{ marginTop: hasCounter || title || subtitle ? 6 : 0 }}>
          <ProgressBar value={pct} label={progressLabel} />
        </View>
      ) : null}
    </View>
  );
}

export default ActivityHeader;
