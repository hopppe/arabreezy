import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { useFloatingTabBarSpace } from '../../navigation/FloatingTabBar';

export function ScreenContainer({ children, scroll = true, padded = true, style, onClose }) {
  const insets = useSafeAreaInsets();
  const tabBarSpace = useFloatingTabBarSpace();
  const inner = (
    <View style={{ padding: padded ? theme.spacing.lg : 0, flexGrow: 1 }}>{children}</View>
  );
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[{ flex: 1, backgroundColor: theme.colors.background }, style]}
    >
      {scroll ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: tabBarSpace }}>
          {inner}
        </ScrollView>
      ) : (
        inner
      )}
      {onClose && (
        <TouchableOpacity
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Close"
          accessibilityHint="Closes this screen and returns to the previous screen"
          style={{
            position: 'absolute',
            top: insets.top + theme.spacing.sm,
            right: theme.spacing.md,
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: theme.colors.surfaceMuted,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="close" size={22} color={theme.colors.text} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

export default ScreenContainer;
