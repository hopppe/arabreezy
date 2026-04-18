import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlacementIntroScreen from '../screens/placement/PlacementIntroScreen';
import PlacementQuestionScreen from '../screens/placement/PlacementQuestionScreen';
import PlacementResultScreen from '../screens/placement/PlacementResultScreen';

const Stack = createNativeStackNavigator();

export default function PlacementNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlacementIntro" component={PlacementIntroScreen} />
      <Stack.Screen name="PlacementQuestion" component={PlacementQuestionScreen} />
      <Stack.Screen name="PlacementResult" component={PlacementResultScreen} />
    </Stack.Navigator>
  );
}
