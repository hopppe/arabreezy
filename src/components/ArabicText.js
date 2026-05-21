import React from 'react';
import { Text as RNText, Platform } from 'react-native';
import { theme } from '../theme';

// Renders Arabic script with slightly larger default size and RTL text direction.
//
// Screen-reader notes:
//   - We force `accessibilityLanguage="ar"` on iOS so VoiceOver pronounces the
//     glyphs as Arabic, not as garbled English.
//   - Pass `accessibilityLabel` (e.g., the transliteration or English gloss)
//     when the screen reader should read something more meaningful than the
//     raw Arabic — set `readAs="label"` to suppress the Arabic entirely.
export function ArabicText({
  children,
  size = 'md',
  style,
  accessibilityLabel,
  readAs, // 'both' (default) | 'label' (only the label, hide the Arabic)
  ...rest
}) {
  const fontSize = theme.typography.arabic.sizes[size] || theme.typography.arabic.sizes.md;
  const hasOverride = Boolean(accessibilityLabel);
  const hideContent = hasOverride && readAs === 'label';

  return (
    <RNText
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityLanguage={hideContent ? undefined : 'ar'}
      importantForAccessibility={hideContent ? 'no-hide-descendants' : 'auto'}
      style={[
        {
          fontSize,
          color: theme.colors.text,
          writingDirection: 'rtl',
          textAlign: 'right',
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}

export default ArabicText;
