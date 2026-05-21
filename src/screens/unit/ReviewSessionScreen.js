// ReviewSessionScreen — the new Review entry point.
//
// Two phases:
//   1. Flashcards — at most 20 SRS-due words at the user's phase or earlier.
//   2. AI chat — the same words are passed as requiredWords so the model
//      steers the user to use each one in conversation.
//
// We reuse the existing FlashcardScreen and ChatScreen with prop injection.

import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { ScreenContainer, Text, Button } from '../../components/ui';
import { theme } from '../../theme';
import { useFlashcards } from '../../context/FlashcardContext';
import { useDialect } from '../../context/DialectContext';
import FlashcardScreen from '../../activities/Flashcards/FlashcardScreen';
import ChatScreen from '../../activities/Chat/ChatScreen';

const CAP = 20;

export default function ReviewSessionScreen({ navigation }) {
  const { deck, loading } = useFlashcards();
  const { bundle } = useDialect();
  const [step, setStep] = useState('flashcards'); // 'flashcards' | 'chat' | 'done'

  // The N words that go into the chat as required vocab. We take the FIRST
  // ≤CAP cards from the SRS deck (the deck is already sorted by status).
  const sessionWords = useMemo(() => {
    if (!deck || !bundle?.words) return [];
    return deck.slice(0, CAP).map((card) => {
      const w = bundle.words[card.id] || card;
      return { id: w.id, script: w.script, english: w.english, transliteration: w.transliteration };
    });
  }, [deck, bundle]);

  if (loading) {
    return (
      <ScreenContainer>
        <Text accessibilityLiveRegion="polite">Loading deck…</Text>
      </ScreenContainer>
    );
  }

  if (sessionWords.length === 0) {
    return (
      <ScreenContainer>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text variant="display" weight="bold" accessibilityRole="header">No reviews due</Text>
          <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md, textAlign: 'center' }}>
            Great work — come back tomorrow.
          </Text>
          <View style={{ marginTop: theme.spacing.xl }}>
            <Button
              title="Done"
              variant="accent"
              onPress={() => navigation.goBack()}
              accessibilityHint="Closes the review screen"
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  if (step === 'flashcards') {
    // The existing FlashcardScreen owns its own SRS deck rendering. When the
    // user finishes the deck, it calls navigation.goBack — we intercept by
    // overriding the navigation shim it sees so we transition into chat
    // instead of popping all the way back to the previous screen.
    const fakeNav = {
      ...navigation,
      goBack: () => setStep('chat'),
    };
    return <FlashcardScreen navigation={fakeNav} route={{ params: {} }} />;
  }

  if (step === 'chat') {
    const fakeNav = {
      ...navigation,
      goBack: () => setStep('done'),
    };
    return (
      <ChatScreen
        navigation={fakeNav}
        route={{ params: { requiredWords: sessionWords, scenarioKey: 'review' } }}
      />
    );
  }

  // step === 'done'
  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant="display" weight="bold" accessibilityRole="header">Review done</Text>
        <Text
          variant="body"
          accessibilityLabel={`${sessionWords.length} words refreshed`}
          style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}
        >
          {sessionWords.length} words refreshed.
        </Text>
        <View style={{ marginTop: theme.spacing.xl }}>
          <Button
            title="Back to home"
            variant="accent"
            onPress={() => navigation.popToTop?.()}
            accessibilityHint="Returns to the home screen"
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
