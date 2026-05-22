// WordSelectionScreen — the entry point for a new unit.
//
// Shows the next 8 words at the user's phase. The learner taps any they
// already know. Tapping marks the word as known (SRS rating 4, "easy") and
// the slot is refilled from the next word in the phase's master list.
// When the learner is happy with the 8 words shown, they tap "Start lesson"
// which locks the unit and routes into the Memrise teach loop.

import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import Animated, {
  FadeIn,
  SlideOutRight,
  LinearTransition,
} from 'react-native-reanimated';
import { ScreenContainer, Text, Card, Button } from '../../components/ui';
import { ArabicText } from '../../components/ArabicText';
import { theme } from '../../theme';
import { useUnit } from '../../context/UnitContext';

export default function WordSelectionScreen({ navigation }) {
  const { pickNextWords, markKnown, lockUnit, loadingWords, UNIT_SIZE } = useUnit();

  // The 8 word objects currently shown. Re-derived from pickNextWords each
  // time the SRS state changes (because the parent context's
  // `progress.wordProgress` changes when we mark known).
  const [shown, setShown] = useState([]);
  const [locking, setLocking] = useState(false);

  const refresh = () => setShown(pickNextWords(UNIT_SIZE));

  useEffect(() => {
    if (!loadingWords) refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingWords, pickNextWords]);

  const onTapKnown = async (wordId) => {
    await markKnown(wordId);
    // Pull a fresh batch so the empty slot fills with the next available word
    setTimeout(refresh, 50);
  };

  const onStart = async () => {
    if (shown.length === 0) return;
    setLocking(true);
    try {
      await lockUnit(shown.map((w) => w.id));
      navigation.replace('UnitMemrise');
    } finally {
      setLocking(false);
    }
  };

  if (loadingWords) {
    return (
      <ScreenContainer>
        <Text accessibilityLiveRegion="polite">Loading vocabulary…</Text>
      </ScreenContainer>
    );
  }

  if (shown.length === 0) {
    return (
      <ScreenContainer>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text variant="display" weight="bold" accessibilityRole="header">
            Phase complete!
          </Text>
          <Text
            variant="body"
            style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md, textAlign: 'center' }}
          >
            You've covered every word at this phase. Advance phase from Settings to keep going.
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Text variant="display" weight="bold" accessibilityRole="header">
        Today's words
      </Text>
      <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
        Tap any word you already know — we'll swap it for a new one.
      </Text>

      <ScrollView
        accessibilityRole="list"
        accessibilityLabel="Words for this unit"
        style={{ flex: 1, marginTop: theme.spacing.lg }}
      >
        {shown.map((w) => (
          <Animated.View
            key={w.id}
            entering={FadeIn.duration(280)}
            exiting={SlideOutRight.duration(220)}
            layout={LinearTransition.springify().damping(18).stiffness(160)}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onTapKnown(w.id)}
              accessible
              accessibilityRole="button"
              accessibilityLabel={`${w.english}${w.transliteration ? `, pronounced ${w.transliteration}` : ''}`}
              accessibilityHint="Tap if you already know this word — we'll swap it for a new one"
            >
              <Card style={{ marginBottom: theme.spacing.md, flexDirection: 'row', alignItems: 'center' }}>
                {w.imageUrl ? (
                  <Image
                    source={{ uri: w.imageUrl }}
                    style={{ width: 56, height: 56, borderRadius: theme.radius.sm, marginRight: theme.spacing.md, backgroundColor: theme.colors.gray100 }}
                    resizeMode="contain"
                    accessibilityElementsHidden
                    importantForAccessibility="no"
                  />
                ) : null}
                <View style={{ flex: 1 }}>
                  <ArabicText size="lg">{w.script}</ArabicText>
                  {w.transliteration ? (
                    <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
                      {w.transliteration}
                    </Text>
                  ) : null}
                  <Text variant="body" style={{ marginTop: 2 }}>
                    {w.english}
                  </Text>
                </View>
                <Text
                  accessibilityElementsHidden
                  importantForAccessibility="no"
                  style={{ color: theme.colors.accent, fontSize: 20, marginLeft: theme.spacing.sm }}
                >
                  ✓
                </Text>
              </Card>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      <View style={{ paddingTop: theme.spacing.md }}>
        <Button
          title={locking ? 'Starting…' : `Start lesson (${shown.length})`}
          variant="accent"
          onPress={onStart}
          loading={locking}
          accessibilityHint="Locks these 8 words and starts teaching them"
        />
      </View>
    </ScreenContainer>
  );
}
