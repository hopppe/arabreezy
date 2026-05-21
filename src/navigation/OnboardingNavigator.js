import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingWelcomeScreen from '../screens/onboarding/OnboardingWelcomeScreen';
import OnboardingGoalScreen from '../screens/onboarding/OnboardingGoalScreen';
import OnboardingMotivationScreen from '../screens/onboarding/OnboardingMotivationScreen';
import OnboardingCommitmentScreen from '../screens/onboarding/OnboardingCommitmentScreen';
import OnboardingSocialProofScreen from '../screens/onboarding/OnboardingSocialProofScreen';
import OnboardingNotificationsScreen from '../screens/onboarding/OnboardingNotificationsScreen';
import OnboardingTimelineScreen from '../screens/onboarding/OnboardingTimelineScreen';
import PaywallScreen from '../screens/paywall/PaywallScreen';

const Stack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      initialRouteName="OnboardingWelcome"
    >
      <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcomeScreen} />
      <Stack.Screen name="OnboardingGoal" component={OnboardingGoalScreen} />
      <Stack.Screen name="OnboardingMotivation" component={OnboardingMotivationScreen} />
      <Stack.Screen name="OnboardingCommitment" component={OnboardingCommitmentScreen} />
      <Stack.Screen name="OnboardingSocial" component={OnboardingSocialProofScreen} />
      <Stack.Screen name="OnboardingNotifications" component={OnboardingNotificationsScreen} />
      <Stack.Screen name="OnboardingTimeline" component={OnboardingTimelineScreen} />
      <Stack.Screen
        name="OnboardingPaywall"
        component={PaywallScreen}
        initialParams={{ fromOnboarding: true }}
      />
    </Stack.Navigator>
  );
}
