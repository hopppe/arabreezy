import React from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import { Text } from './Text';

// variant: 'primary' (black), 'accent' (pop-of-color), 'ghost' (outlined)
export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
}) {
  const palette = {
    primary: { bg: theme.colors.black, fg: theme.colors.white, border: 'transparent' },
    accent:  { bg: theme.colors.accent, fg: theme.colors.white, border: 'transparent' },
    ghost:   { bg: 'transparent',       fg: theme.colors.black, border: theme.colors.black },
  }[variant] || { bg: theme.colors.black, fg: theme.colors.white, border: 'transparent' };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      style={[
        {
          backgroundColor: palette.bg,
          borderColor: palette.border,
          borderWidth: variant === 'ghost' ? 1.5 : 0,
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderRadius: theme.radius.pill,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.4 : 1,
          width: fullWidth ? '100%' : undefined,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.fg} />
      ) : (
        <Text weight="bold" style={{ color: palette.fg }}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default Button;
