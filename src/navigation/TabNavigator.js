import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import LessonsScreen from '../screens/LessonsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LessonScreen from '../activities/Lessons/LessonScreen';
import FlashcardScreen from '../activities/Flashcards/FlashcardScreen';
import GuidedConversationScreen from '../activities/GuidedConversations/GuidedConversationScreen';

import { useTranslation } from '../context/LanguageContext';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Lesson" component={LessonScreen} />
      <Stack.Screen name="Flashcards" component={FlashcardScreen} />
      <Stack.Screen name="GuidedConversation" component={GuidedConversationScreen} />
    </Stack.Navigator>
  );
}

function LessonsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LessonsMain" component={LessonsScreen} />
      <Stack.Screen name="Lesson" component={LessonScreen} />
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
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.black,
        tabBarInactiveTintColor: theme.colors.gray400,
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopColor: theme.colors.border,
        },
        tabBarIcon: ({ color, size }) => {
          const map = {
            HomeTab: 'home-outline',
            LessonsTab: 'book-outline',
            SettingsTab: 'settings-outline',
          };
          return <Ionicons name={map[route.name] || 'ellipse-outline'} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: t('nav.home') }} />
      <Tab.Screen name="LessonsTab" component={LessonsStack} options={{ title: t('nav.lessons') }} />
      <Tab.Screen name="SettingsTab" component={SettingsStack} options={{ title: t('nav.settings') }} />
    </Tab.Navigator>
  );
}
