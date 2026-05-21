import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../../../../components/ui';
import { theme } from '../../../../theme';

export default function FeedbackBanner({ isCorrect, message }) {
  if (isCorrect == null) return null;

  const bg = isCorrect ? theme.colors.success : theme.colors.error;
  const icon = isCorrect ? 'checkmark-circle' : 'close-circle';

  return (
    <View style={styles.overlay} pointerEvents="none">
      <View
        accessible
        accessibilityRole={isCorrect ? undefined : 'alert'}
        accessibilityLiveRegion="assertive"
        accessibilityLabel={message}
        style={[styles.banner, { backgroundColor: bg }]}
      >
        <Ionicons
          name={icon}
          size={28}
          color="#FFFFFF"
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
        <Text weight="bold" accessible={false} style={styles.text}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
