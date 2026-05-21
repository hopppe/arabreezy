import React, { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';

// Routes (at any nesting depth) that hide the floating tab bar — the user
// is "in an activity". Picker / list screens (GuidedConversationPicker,
// LessonsList, Stories) intentionally keep the bar visible.
const HIDDEN_ROUTES = new Set([
  'Lesson',
  'Flashcards',
  'GuidedConversation',
  'Shadowing',
  'StoryReader',
  'Listening',
  'Idioms',
  'Grammar',
  'Pronunciation',
  'Chat',
  'VoiceChat',
  'Primer',
]);

function getDeepestRoute(state) {
  if (!state || typeof state.index !== 'number') return null;
  const route = state.routes[state.index];
  if (route?.state) return getDeepestRoute(route.state);
  return route ?? null;
}

const SLIDE_DISTANCE = 140;
const SLIDE_DURATION = 260;
const TAB_BAR_HEIGHT = 64;
const TAB_BAR_BREATHING_ROOM = 12;

// Use this in scroll surfaces (contentContainerStyle.paddingBottom) so
// content can scroll past the floating tab bar without being hidden.
export function useFloatingTabBarSpace() {
  const insets = useSafeAreaInsets();
  return Math.max(insets.bottom, 12) + TAB_BAR_HEIGHT + TAB_BAR_BREATHING_ROOM;
}

export default function FloatingTabBar(props) {
  const insets = useSafeAreaInsets();

  const deepestRoute = getDeepestRoute(props.state);
  const hide = HIDDEN_ROUTES.has(deepestRoute?.name)
    || deepestRoute?.params?.hideTabBar === true;

  const translateY = useRef(new Animated.Value(hide ? SLIDE_DISTANCE : 0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: hide ? SLIDE_DISTANCE : 0,
      duration: SLIDE_DURATION,
      useNativeDriver: true,
    }).start();
  }, [hide, translateY]);

  return (
    <Animated.View
      pointerEvents={hide ? 'none' : 'auto'}
      accessibilityElementsHidden={hide}
      importantForAccessibility={hide ? 'no-hide-descendants' : 'auto'}
      accessibilityRole="tablist"
      accessibilityLabel="Main navigation"
      style={[
        styles.wrapper,
        {
          bottom: Math.max(insets.bottom, 12),
          backgroundColor: theme.colors.surface,
          transform: [{ translateY }],
        },
      ]}
    >
      <BottomTabBar {...props} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
});
