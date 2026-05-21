// UnitMemriseScreen — first step of a unit (after WordSelection).
//
// Resolves the 8 focal word objects from currentUnit.words and hands them to
// the existing MemrisePhase component. On completion, applies SRS rating
// ("good"/3) to each mastered word and advances the unit step to "story".

import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { ScreenContainer, Text, Button } from '../../components/ui';
import { theme } from '../../theme';
import MemrisePhase from '../../activities/Lessons/components/MemrisePhase';
import { useUnit } from '../../context/UnitContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { getWords } from '../../../backend/localBackend';
import { useDialect } from '../../context/DialectContext';
import { applyRating, INITIAL_PROGRESS } from '../../activities/Flashcards/scheduler';

export default function UnitMemriseScreen({ navigation }) {
  const { currentUnit, advanceStep } = useUnit();
  const { dialect } = useDialect();
  const { progress, updateWordProgress } = useUserProgress();

  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter to un-tapped words only: any focal word the user already marked
  // 'easy' (rating 4 via tap-to-know on WordSelectionScreen) skips Memrise.
  useEffect(() => {
    let cancelled = false;
    if (!currentUnit?.words?.length) {
      setWords([]);
      setLoading(false);
      return undefined;
    }
    getWords({ dialect, wordIds: currentUnit.words })
      .then((arr) => {
        if (cancelled) return;
        const all = arr || [];
        const filtered = all.filter((w) => {
          const wp = progress.wordProgress?.[w.id];
          // Skip words already promoted by tap-to-know (status learning+ already).
          return !(wp && wp.reviewsCount > 0 && wp.status !== 'new');
        });
        setWords(filtered.length > 0 ? filtered : all);
        setLoading(false);
      })
      .catch((e) => {
        console.warn('[unit-memrise] failed to load', e?.message);
        if (!cancelled) {
          setWords([]);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [currentUnit, dialect, progress.wordProgress]);

  const onComplete = (masteredIds) => {
    const now = new Date().toISOString();
    for (const wid of masteredIds) {
      const prev = progress.wordProgress?.[wid];
      const next = applyRating({ ...INITIAL_PROGRESS, ...(prev || {}) }, 3);
      updateWordProgress(wid, next);
    }
    advanceStep();
    navigation.replace('UnitStory');
  };

  if (!currentUnit) {
    return (
      <ScreenContainer>
        <Text accessibilityRole="alert">No active unit.</Text>
      </ScreenContainer>
    );
  }

  if (loading) {
    return (
      <ScreenContainer>
        <Text accessibilityLiveRegion="polite">Loading words…</Text>
      </ScreenContainer>
    );
  }

  if (words.length === 0) {
    // All words already known via tap-to-know — skip directly to story
    return (
      <ScreenContainer>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text variant="title" weight="bold" accessibilityRole="header">All 8 already known</Text>
          <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}>
            Jumping straight to the story.
          </Text>
          <View style={{ marginTop: theme.spacing.lg }}>
            <Button
              title="Continue"
              variant="accent"
              onPress={() => { advanceStep(); navigation.replace('UnitStory'); }}
              accessibilityHint="Continues to the story step"
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <Text variant="display" weight="bold" accessibilityRole="header">Learn</Text>
      <Text
        variant="caption"
        accessibilityLabel={`${words.length} new words this unit`}
        style={{ color: theme.colors.textMuted, marginTop: 4 }}
      >
        {words.length} new words this unit
      </Text>
      <View style={{ flex: 1, marginTop: theme.spacing.md }}>
        <MemrisePhase words={words} onComplete={onComplete} />
      </View>
    </ScreenContainer>
  );
}
