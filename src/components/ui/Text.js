import React from 'react';
import { Text as RNText } from 'react-native';
import { theme } from '../../theme';

// `as` selects the semantic role for screen readers:
//   - 'header' for titles/section headings
//   - 'text' (default) for body text
// Pass `accessibilityLabel` to override what the screen reader reads
// (useful for symbols, decorative characters, or formatted numbers).
export function Text({
  variant = 'body',
  weight = 'regular',
  as,
  style,
  ...rest
}) {
  const size =
    {
      caption: theme.typography.sizes.xs,
      small: theme.typography.sizes.sm,
      body: theme.typography.sizes.md,
      subtitle: theme.typography.sizes.lg,
      title: theme.typography.sizes.xl,
      display: theme.typography.sizes.display,
    }[variant] || theme.typography.sizes.md;

  const inferredRole =
    as === 'header'
      ? 'header'
      : variant === 'title' || variant === 'display'
        ? undefined // let parents opt-in to header role explicitly
        : undefined;

  return (
    <RNText
      accessibilityRole={inferredRole}
      style={[
        {
          fontSize: size,
          color: theme.colors.text,
          fontWeight: theme.typography.weights[weight] || '400',
        },
        style,
      ]}
      {...rest}
    />
  );
}

export default Text;
