import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card } from '../../components/ui';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { OnboardingProgressBar } from './OnboardingProgressBar';

function Stat({ value, label }) {
  return (
    <View
      accessible
      accessibilityLabel={`${value}, ${label}`}
      style={{ flex: 1, alignItems: 'center', paddingHorizontal: 4 }}
    >
      <Text variant="title" weight="bold" accessible={false} style={{ color: theme.colors.accent }}>
        {value}
      </Text>
      <Text
        variant="caption"
        accessible={false}
        style={{ color: theme.colors.textMuted, marginTop: 4, textAlign: 'center' }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function OnboardingSocialProofScreen({ navigation }) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <OnboardingProgressBar step={4} total={7} />
      <View style={{ flex: 1, padding: theme.spacing.lg, justifyContent: 'space-between' }}>
        <View>
          <Text variant="title" weight="bold" accessibilityRole="header" style={{ marginTop: theme.spacing.lg }}>
            {t('onboarding.socialTitle')}
          </Text>
          <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.sm }}>
            {t('onboarding.socialBody')}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: theme.spacing.xl,
              backgroundColor: theme.colors.surfaceMuted,
              borderRadius: theme.radius.lg,
              paddingVertical: theme.spacing.lg,
            }}
          >
            <Stat value={t('onboarding.socialStat1')} label={t('onboarding.socialStat1Label')} />
            <View style={{ width: 1, backgroundColor: theme.colors.border }} />
            <Stat value={t('onboarding.socialStat2')} label={t('onboarding.socialStat2Label')} />
            <View style={{ width: 1, backgroundColor: theme.colors.border }} />
            <Stat value={t('onboarding.socialStat3')} label={t('onboarding.socialStat3Label')} />
          </View>

          <Card style={{ marginTop: theme.spacing.lg }}>
            <Text style={{ fontSize: 18, lineHeight: 26, fontStyle: 'italic' }}>
              {t('onboarding.socialQuote')}
            </Text>
            <Text
              variant="small"
              weight="bold"
              style={{ color: theme.colors.textMuted, marginTop: theme.spacing.sm }}
            >
              {t('onboarding.socialAuthor')}
            </Text>
          </Card>
        </View>

        <Button
          title={t('onboarding.continue')}
          onPress={() => navigation.navigate('OnboardingNotifications')}
          variant="accent"
          accessibilityHint="Continues to notifications setup"
        />
      </View>
    </SafeAreaView>
  );
}
