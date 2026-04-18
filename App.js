import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { DialectProvider } from './src/context/DialectContext';
import { UserProgressProvider } from './src/context/UserProgressContext';
import { LessonProvider } from './src/context/LessonContext';
import { FlashcardProvider } from './src/context/FlashcardContext';
import { DailyReviewProvider } from './src/context/DailyReviewContext';

import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <LanguageProvider>
            <DialectProvider>
              <UserProgressProvider>
                <LessonProvider>
                  <FlashcardProvider>
                    <DailyReviewProvider>
                      <StatusBar style="dark" />
                      <RootNavigator />
                    </DailyReviewProvider>
                  </FlashcardProvider>
                </LessonProvider>
              </UserProgressProvider>
            </DialectProvider>
          </LanguageProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
