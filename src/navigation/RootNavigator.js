import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import { useUserProgress } from '../context/UserProgressContext';
import { useDialect } from '../context/DialectContext';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import PlacementNavigator from './PlacementNavigator';
import TabNavigator from './TabNavigator';
import PaywallScreen from '../screens/paywall/PaywallScreen';
import { theme } from '../theme';

function Splash() {
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Loading Arabreezy"
      accessibilityState={{ busy: true }}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}
    >
      <ActivityIndicator color={theme.colors.black} accessibilityLabel="Loading" />
    </View>
  );
}

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const { progress, loaded } = useUserProgress();
  const { loaded: dialectLoaded } = useDialect();
  const { session, loaded: authLoaded, isConfigured } = useAuth();

  if (!loaded || !dialectLoaded || !authLoaded) return <Splash />;

  // If Supabase is configured we require a session; otherwise we fall through
  // to the local-only flow (so the app still runs in dev without env vars).
  // E2E override: EXPO_PUBLIC_E2E_BYPASS_AUTH=true skips the auth gate while
  // keeping Supabase content (public-read) enabled. Dev-only.
  const bypassAuth = __DEV__ && process.env.EXPO_PUBLIC_E2E_BYPASS_AUTH === 'true';
  const needsAuth = isConfigured && !session && !bypassAuth;
  // Existing users who already finished placement before onboarding shipped
  // shouldn't be retroactively forced through the funnel — treat completed
  // placement as implied onboarding-complete.
  const onboardingDone = progress.onboarding?.completed || progress.placement.completed;
  const needsOnboarding = !needsAuth && !onboardingDone;
  const needsPlacement = !needsAuth && !needsOnboarding && !progress.placement.completed;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {needsAuth ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : needsOnboarding ? (
          <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : needsPlacement ? (
          <RootStack.Screen name="Placement" component={PlacementNavigator} />
        ) : (
          <RootStack.Screen name="Tabs" component={TabNavigator} />
        )}
        {/* Modal — always available so any screen can present the paywall
            (e.g. soft-gating Voice Tutor or Chat behind Pro). */}
        <RootStack.Screen
          name="Paywall"
          component={PaywallScreen}
          options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
