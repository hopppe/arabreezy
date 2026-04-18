import React from 'react';
import { Text as RNText } from 'react-native';
import { theme } from '../../theme';

export function Text({ variant = 'body', weight = 'regular', style, ...rest }) {
  const size =
    {
      caption: theme.typography.sizes.xs,
      small: theme.typography.sizes.sm,
      body: theme.typography.sizes.md,
      subtitle: theme.typography.sizes.lg,
      title: theme.typography.sizes.xl,
      display: theme.typography.sizes.display,
    }[variant] || theme.typography.sizes.md;
  return (
    <RNText
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
