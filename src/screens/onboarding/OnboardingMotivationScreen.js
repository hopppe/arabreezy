import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from '../../components/ui';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { OnboardingProgressBar } from './OnboardingProgressBar';

// Personalised payoff screen — the user's stated goal is reflected back
// immediately, before they're asked for anything else. This is the
// "made for you" beat that SOSA's Hannah Parvaz cites as the single
// biggest Day-0 conversion lever.
export default function OnboardingMotivationScreen({ navigation }) {
  const { t } = useTranslation();
  const { progress } = useUserProgress();
  const goal = progress?.onboarding?.goal || 'other';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <OnboardingProgressBar step={2} total={7} />
      <View style={{ flex: 1, padding: theme.spacing.lg, justifyContent: 'space-between' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: theme.colors.accentSoft,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.spacing.lg,
            }}
          >
            <Text style={{ fontSize: 36 }}>✨</Text>
          </View>

          <Text variant="display" weight="bold" accessibilityRole="header" style={{ lineHeight: 44 }}>
            {t('onboarding.motivationTitle')}
          </Text>
          <Text
            variant="subtitle"
            style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md, lineHeight: 28 }}
          >
            {t(`onboarding.motivation.${goal}`)}
          </Text>
        </View>

        <Button
          title={t('onboarding.continue')}
          onPress={() => navigation.navigate('OnboardingCommitment')}
          variant="accent"
          accessibilityHint="Continues to commitment selection"
        />
      </View>
    </SafeAreaView>
  );
}
