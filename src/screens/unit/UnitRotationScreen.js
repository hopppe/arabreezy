// UnitRotationScreen — Step 3 of a unit (after Story).
//
// Picks one of {listening, shadowing, guided} via round-robin selection set
// on the unit at lockUnit time, and runs it on the 8 focal words. Each
// underlying screen is wrapped lightly so we can pass the focals and an
// onComplete that advances to the chat step.
//
// For now this is a simple chooser screen — the user taps the activity card,
// the actual underlying activity (already implemented in src/activities/)
// opens with the focal words. When that activity is finished we manually
// come back here and the user taps "Continue to chat".

import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, Button } from '../../components/ui';
import { theme } from '../../theme';
import { useUnit } from '../../context/UnitContext';
import { useDialect } from '../../context/DialectContext';

const META = {
  listening: { title: 'Listening', subtitle: 'Hear a passage that uses your 8 words. Answer comprehension.', icon: '🎧' },
  shadowing: { title: 'Shadowing', subtitle: 'Repeat one phrase per focal word. Speech is scored.', icon: '🗣️' },
  guided:    { title: 'Guided conversation', subtitle: 'Walk a scripted dialogue built around your 8 words.', icon: '💬' },
};

export default function UnitRotationScreen({ navigation }) {
  const { currentUnit, advanceStep } = useUnit();
  const { bundle } = useDialect();

  // Resolve the unit's word objects so the underlying activity can show a
  // "use these words" hint and (when supported) filter its content.
  const focalWords = useMemo(() => {
    if (!currentUnit?.words || !bundle?.words) return [];
    return currentUnit.words
      .map((id) => {
        const w = bundle.words[id];
        return w ? { id: w.id, script: w.script, english: w.english, transliteration: w.transliteration } : null;
      })
      .filter(Boolean);
  }, [currentUnit, bundle]);

  if (!currentUnit) {
    return (
      <ScreenContainer>
        <Text accessibilityRole="alert">No active unit.</Text>
      </ScreenContainer>
    );
  }

  const activity = currentUnit.rotationActivity || 'listening';
  const meta = META[activity];

  // Pass focalWords down via route params. The underlying screens currently
  // ignore them (their content tables aren't word-id keyed), but the param
  // is in place for a future per-screen "hint" / filter implementation.
  const openActivity = () => {
    const params = { focalWords };
    if (activity === 'listening') navigation.navigate('Listening', params);
    else if (activity === 'shadowing') navigation.navigate('Shadowing', { phase: undefined, ...params });
    else if (activity === 'guided') navigation.navigate('GuidedConversationPicker', params);
  };

  const onContinue = () => {
    advanceStep();
    navigation.replace('UnitChat');
  };

  return (
    <ScreenContainer>
      <Text variant="display" weight="bold" accessibilityRole="header">Practice</Text>
      <Text variant="caption" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
        One activity to lock in your 8 words.
      </Text>

      <View style={{ marginTop: theme.spacing.lg }}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={openActivity}
          accessible
          accessibilityRole="button"
          accessibilityLabel={meta.title}
          accessibilityHint={meta.subtitle}
        >
          <Card style={{ padding: theme.spacing.lg }}>
            <Text
              style={{ fontSize: 36 }}
              accessibilityElementsHidden
              importantForAccessibility="no"
            >
              {meta.icon}
            </Text>
            <Text variant="title" weight="bold" accessibilityRole="header" style={{ marginTop: 8 }}>
              {meta.title}
            </Text>
            <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: 6 }}>
              {meta.subtitle}
            </Text>
            <View style={{ marginTop: theme.spacing.md }}>
              <Button
                title={`Start ${meta.title}`}
                variant="accent"
                onPress={openActivity}
                accessibilityHint={`Opens the ${meta.title} activity`}
              />
            </View>
          </Card>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }} />

      <View style={{ paddingTop: theme.spacing.md }}>
        <Button
          title="Done — continue to chat"
          variant="ghost"
          onPress={onContinue}
          accessibilityHint="Continues to the final chat step"
        />
      </View>
    </ScreenContainer>
  );
}
