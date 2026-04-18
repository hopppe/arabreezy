import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';
import { useUserProgress } from '../context/UserProgressContext';
import { useDialect } from '../context/DialectContext';
import PlacementNavigator from './PlacementNavigator';
import TabNavigator from './TabNavigator';
import { theme } from '../theme';

export default function RootNavigator() {
  const { progress, loaded } = useUserProgress();
  const { loaded: dialectLoaded } = useDialect();

  if (!loaded || !dialectLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator color={theme.colors.black} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {progress.placement.completed ? <TabNavigator /> : <PlacementNavigator />}
    </NavigationContainer>
  );
}
