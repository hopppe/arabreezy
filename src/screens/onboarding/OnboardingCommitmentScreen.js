import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from '../../components/ui';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { OnboardingProgressBar } from './OnboardingProgressBar';

const OPTIONS = [5, 10, 20, 30];

export default function OnboardingCommitmentScreen({ navigation }) {
  const { t } = useTranslation();
  const { updateOnboarding } = useUserProgress();
  const [selected, setSelected] = useState(10);

  const onContinue = async () => {
    await updateOnboarding({ dailyMinutes: selected });
    navigation.navigate('OnboardingSocial');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <OnboardingProgressBar step={3} total={7} />
      <View style={{ flex: 1, padding: theme.spacing.lg }}>
        <Text variant="title" weight="bold" accessibilityRole="header" style={{ marginTop: theme.spacing.lg }}>
          {t('onboarding.commitmentTitle')}
        </Text>
        <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.sm }}>
          {t('onboarding.commitmentBody')}
        </Text>

        <View
          accessibilityRole="radiogroup"
          accessibilityLabel={t('onboarding.commitmentTitle')}
          style={{ marginTop: theme.spacing.xl, flex: 1 }}
        >
          {OPTIONS.map((opt) => {
            const isActive = selected === opt;
            return (
              <TouchableOpacity
                key={opt}
                activeOpacity={0.85}
                onPress={() => setSelected(opt)}
                accessible
                accessibilityRole="radio"
                accessibilityLabel={`${opt} minutes. ${t(`onboarding.commitmentOptions.${opt}`)}`}
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
                <View
                  importantForAccessibility="no"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: isActive ? theme.colors.black : theme.colors.gray100,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: theme.spacing.md,
                  }}
                >
                  <Text weight="bold" style={{ color: isActive ? theme.colors.white : theme.colors.text }}>
                    {opt}
                  </Text>
                </View>
                <Text weight={isActive ? 'bold' : 'regular'}>
                  {t(`onboarding.commitmentOptions.${opt}`)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Button
          title={t('onboarding.continue')}
          onPress={onContinue}
          variant="accent"
          accessibilityHint="Saves your daily commitment and continues"
        />
      </View>
    </SafeAreaView>
  );
}
