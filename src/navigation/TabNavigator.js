import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';
import GuidedConversationPickerScreen from '../screens/GuidedConversationPickerScreen';
import LessonsScreen from '../screens/LessonsScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PrimerScreen from '../screens/PrimerScreen';
import LessonScreen from '../activities/Lessons/LessonScreen';
import FlashcardScreen from '../activities/Flashcards/FlashcardScreen';
import GuidedConversationScreen from '../activities/GuidedConversations/GuidedConversationScreen';
import ShadowingScreen from '../activities/Shadowing/ShadowingScreen';
import StoryListScreen from '../activities/Stories/StoryListScreen';
import StoryReader from '../activities/Stories/StoryReader';
import ListeningScreen from '../activities/Listening/ListeningScreen';
import IdiomsScreen from '../activities/Idioms/IdiomsScreen';
import GrammarPracticeScreen from '../activities/GrammarPractice/GrammarPracticeScreen';
import PronunciationScreen from '../activities/Pronunciation/PronunciationScreen';
import ChatScreen from '../activities/Chat/ChatScreen';
import VoiceChatScreen from '../activities/Chat/VoiceChatScreen';
import RootsListScreen from '../activities/Roots/RootsListScreen';
import RootFamilyScreen from '../activities/Roots/RootFamilyScreen';
import WordSelectionScreen from '../screens/unit/WordSelectionScreen';
import LessonStoryScreen from '../screens/unit/LessonStoryScreen';
import UnitMemriseScreen from '../screens/unit/UnitMemriseScreen';
import UnitRotationScreen from '../screens/unit/UnitRotationScreen';
import UnitChatScreen from '../screens/unit/UnitChatScreen';
import ReviewSessionScreen from '../screens/unit/ReviewSessionScreen';

import { useTranslation } from '../context/LanguageContext';
import { theme } from '../theme';
import FloatingTabBar from './FloatingTabBar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const activityScreens = (
  <>
    <Stack.Screen name="Lesson" component={LessonScreen} />
    <Stack.Screen name="LessonsList" component={LessonsScreen} />
    <Stack.Screen name="Flashcards" component={FlashcardScreen} />
    <Stack.Screen name="GuidedConversationPicker" component={GuidedConversationPickerScreen} />
    <Stack.Screen name="GuidedConversation" component={GuidedConversationScreen} />
    <Stack.Screen name="Shadowing" component={ShadowingScreen} />
    <Stack.Screen name="Stories" component={StoryListScreen} />
    <Stack.Screen name="StoryReader" component={StoryReader} />
    <Stack.Screen name="Listening" component={ListeningScreen} />
    <Stack.Screen name="Idioms" component={IdiomsScreen} />
    <Stack.Screen name="Grammar" component={GrammarPracticeScreen} />
    <Stack.Screen name="Pronunciation" component={PronunciationScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="VoiceChat" component={VoiceChatScreen} />
    <Stack.Screen name="Roots" component={RootsListScreen} />
    <Stack.Screen name="RootFamily" component={RootFamilyScreen} />
    <Stack.Screen name="Primer" component={PrimerScreen} />
    <Stack.Screen name="UnitSelectWords" component={WordSelectionScreen} />
    <Stack.Screen name="UnitMemrise" component={UnitMemriseScreen} />
    <Stack.Screen name="UnitStory" component={LessonStoryScreen} />
    <Stack.Screen name="UnitRotation" component={UnitRotationScreen} />
    <Stack.Screen name="UnitChat" component={UnitChatScreen} />
    <Stack.Screen name="Review" component={ReviewSessionScreen} />
  </>
);

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      {activityScreens}
    </Stack.Navigator>
  );
}

function ActivitiesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ActivitiesMain" component={ActivitiesScreen} />
      {activityScreens}
    </Stack.Navigator>
  );
}

function ProgressStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProgressMain" component={ProgressScreen} />
      {activityScreens}
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function TabNavigator() {
  const { t } = useTranslation();
  const hints = {
    HomeTab: 'Shows your daily review and progress at a glance',
    ActivitiesTab: 'Browse all learning activities',
    ProgressTab: 'See your stats, streak, and phase progress',
    SettingsTab: 'Manage account, dialect, and notifications',
  };
  return (
    <Tab.Navigator
      tabBar={(tabBarProps) => <FloatingTabBar {...tabBarProps} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.black,
        tabBarInactiveTintColor: theme.colors.gray400,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          height: 64,
          paddingTop: 6,
          paddingBottom: 6,
        },
        tabBarAccessibilityLabel: ({
          HomeTab: t('nav.home'),
          ActivitiesTab: t('nav.activities'),
          ProgressTab: t('nav.progress'),
          SettingsTab: t('nav.settings'),
        })[route.name],
        tabBarButtonTestID: `tab-${route.name}`,
        tabBarIcon: ({ color, size }) => {
          const map = {
            HomeTab: 'home-outline',
            ActivitiesTab: 'apps-outline',
            ProgressTab: 'stats-chart-outline',
            SettingsTab: 'settings-outline',
          };
          return (
            <Ionicons
              name={map[route.name] || 'ellipse-outline'}
              size={size}
              color={color}
              accessibilityElementsHidden
              importantForAccessibility="no"
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{ title: t('nav.home'), tabBarAccessibilityLabel: t('nav.home'), tabBarAccessibilityHint: hints.HomeTab }}
      />
      <Tab.Screen
        name="ActivitiesTab"
        component={ActivitiesStack}
        options={{ title: t('nav.activities'), tabBarAccessibilityLabel: t('nav.activities'), tabBarAccessibilityHint: hints.ActivitiesTab }}
      />
      <Tab.Screen
        name="ProgressTab"
        component={ProgressStack}
        options={{ title: t('nav.progress'), tabBarAccessibilityLabel: t('nav.progress'), tabBarAccessibilityHint: hints.ProgressTab }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{ title: t('nav.settings'), tabBarAccessibilityLabel: t('nav.settings'), tabBarAccessibilityHint: hints.SettingsTab }}
      />
    </Tab.Navigator>
  );
}
