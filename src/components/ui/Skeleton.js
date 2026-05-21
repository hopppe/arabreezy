import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { theme } from '../../theme';

// Pulsing skeleton block. Pass width/height props.
export function Skeleton({ width = '100%', height = 60, style }) {
  const opacity = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.5, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading content"
      accessibilityState={{ busy: true }}
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          width,
          height,
          backgroundColor: theme.colors.gray200,
          borderRadius: theme.radius.md,
          opacity,
        },
        style,
      ]}
    />
  );
}

export function SkeletonList({ count = 3, height = 80, gap = 12 }) {
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading content"
      accessibilityState={{ busy: true }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <View
          key={i}
          importantForAccessibility="no-hide-descendants"
          style={{ marginBottom: gap }}
        >
          <Skeleton height={height} />
        </View>
      ))}
    </View>
  );
}
