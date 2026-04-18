import React from 'react';
import { View } from 'react-native';
import { theme } from '../../theme';

export function Card({ style, children, padded = true }) {
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: padded ? theme.spacing.lg : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export default Card;
