import React from 'react';
import { Text as RNText } from 'react-native';
import { theme } from '../theme';

// Renders Arabic script with slightly larger default size and RTL text direction.
export function ArabicText({ children, size = 'md', style }) {
  const fontSize = theme.typography.arabic.sizes[size] || theme.typography.arabic.sizes.md;
  return (
    <RNText
      style={[
        {
          fontSize,
          color: theme.colors.text,
          writingDirection: 'rtl',
          textAlign: 'right',
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

export default ArabicText;
