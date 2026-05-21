import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from '../../components/ui';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';

export default function OnboardingWelcomeScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, padding: theme.spacing.lg, justifyContent: 'space-between' }}>
        {/* Hero: oversized Arabic typographic mark + eyebrow.
            Day-0 onboarding research (SOSA 2026) says win trust + show identity
            in the first 5 seconds; we don't waste that real estate on app-chrome. */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: theme.colors.accentSoft,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: theme.radius.pill,
              marginBottom: theme.spacing.md,
            }}
          >
            <Text variant="caption" weight="bold" style={{ color: theme.colors.accent }}>
              {t('onboarding.welcomeEyebrow').toUpperCase()}
            </Text>
          </View>

          <View
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              backgroundColor: theme.colors.black,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.spacing.lg,
            }}
          >
            <Text style={{ fontSize: 56, color: theme.colors.white, lineHeight: 64 }}>
              س
            </Text>
          </View>

          <Text variant="display" weight="bold" accessibilityRole="header" style={{ lineHeight: 44 }}>
            {t('onboarding.welcomeTitle')}
          </Text>
          <Text
            variant="subtitle"
            style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md, lineHeight: 28 }}
          >
            {t('onboarding.welcomeBody')}
          </Text>
        </View>

        <View>
          <Button
            title={t('onboarding.welcomeCta')}
            onPress={() => navigation.navigate('OnboardingGoal')}
            variant="accent"
            accessibilityHint="Starts onboarding"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
