import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';

export function ScreenContainer({ children, scroll = true, padded = true, style }) {
  const inner = (
    <View style={{ padding: padded ? theme.spacing.lg : 0, flexGrow: 1 }}>{children}</View>
  );
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={[{ flex: 1, backgroundColor: theme.colors.background }, style]}
    >
      {scroll ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>{inner}</ScrollView>
      ) : (
        inner
      )}
    </SafeAreaView>
  );
}

export default ScreenContainer;
