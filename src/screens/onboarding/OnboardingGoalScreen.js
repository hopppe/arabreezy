import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from '../../components/ui';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { OnboardingProgressBar } from './OnboardingProgressBar';

const GOALS = [
  { id: 'family', emoji: '👨‍👩‍👧' },
  { id: 'work', emoji: '💼' },
  { id: 'travel', emoji: '✈️' },
  { id: 'faith', emoji: '📖' },
  { id: 'culture', emoji: '🎬' },
  { id: 'other', emoji: '🤷' },
];

export default function OnboardingGoalScreen({ navigation }) {
  const { t } = useTranslation();
  const { updateOnboarding } = useUserProgress();
  const [selected, setSelected] = useState(null);

  const onContinue = async () => {
    if (!selected) return;
    await updateOnboarding({ goal: selected });
    navigation.navigate('OnboardingMotivation');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <OnboardingProgressBar step={1} total={7} />
      <View style={{ flex: 1, padding: theme.spacing.lg }}>
        <Text variant="title" weight="bold" accessibilityRole="header" style={{ marginTop: theme.spacing.lg }}>
          {t('onboarding.goalTitle')}
        </Text>
        <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.sm }}>
          {t('onboarding.goalBody')}
        </Text>

        <ScrollView
          accessibilityRole="radiogroup"
          accessibilityLabel={t('onboarding.goalTitle')}
          style={{ marginTop: theme.spacing.lg }}
          contentContainerStyle={{ paddingBottom: theme.spacing.md }}
          showsVerticalScrollIndicator={false}
        >
          {GOALS.map((g) => {
            const isActive = selected === g.id;
            const goalLabel = t(`onboarding.goal.${g.id}`);
            const goalSub = t(`onboarding.goal.${g.id}Sub`);
            return (
              <TouchableOpacity
                key={g.id}
                activeOpacity={0.85}
                onPress={() => setSelected(g.id)}
                accessible
                accessibilityRole="radio"
                accessibilityLabel={goalLabel}
                accessibilityHint={goalSub}
                accessibilityState={{ selected: isActive, checked: isActive }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: theme.spacing.md,
                  borderRadius: theme.radius.lg,
                  borderWidth: 2,
                  borderColor: isActive ? theme.colors.black : theme.colors.border,
                  backgroundColor: isActive ? theme.colors.surfaceMuted : theme.colors.surface,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{ fontSize: 28, marginRight: theme.spacing.md }}
                  accessibilityElementsHidden
                  importantForAccessibility="no"
                >
                  {g.emoji}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text weight="bold">{goalLabel}</Text>
                  <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
                    {goalSub}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Button
          title={t('onboarding.continue')}
          onPress={onContinue}
          variant="accent"
          disabled={!selected}
          accessibilityHint={selected ? 'Saves your goal and continues' : 'Select a goal to continue'}
        />
      </View>
    </SafeAreaView>
  );
}
