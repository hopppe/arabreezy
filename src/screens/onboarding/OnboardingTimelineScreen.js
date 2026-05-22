import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from '../../components/ui';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { OnboardingProgressBar } from './OnboardingProgressBar';

// TestFlight-only: skip the paywall step entirely. Restore by setting this
// to false (and re-pointing the CTA to navigation.navigate('OnboardingPaywall')).
const BYPASS_ONBOARDING_PAYWALL = false;

// Duolingo-style trust beat: spell out the trial timeline so users feel they
// won't be surprised by a charge. SOSA: 55% of 3-day trial cancellations
// happen on Day 0 — transparency demonstrably softens that drop.
function TimelineRow({ markerLabel, title, body, active, accent }) {
  return (
    <View
      accessible
      accessibilityLabel={`${markerLabel}. ${title}. ${body}`}
      style={{ flexDirection: 'row', alignItems: 'flex-start' }}
    >
      <View
        importantForAccessibility="no"
        style={{ alignItems: 'center', width: 56 }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: accent ? theme.colors.accent : active ? theme.colors.black : theme.colors.gray200,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            weight="bold"
            style={{ color: accent || active ? theme.colors.white : theme.colors.text, fontSize: 13 }}
          >
            {markerLabel}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, paddingBottom: theme.spacing.lg, paddingLeft: theme.spacing.sm }}>
        <Text weight="bold">{title}</Text>
        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4, lineHeight: 20 }}>
          {body}
        </Text>
      </View>
    </View>
  );
}

export default function OnboardingTimelineScreen({ navigation }) {
  const { t } = useTranslation();
  const { completeOnboarding } = useUserProgress();

  const onContinue = async () => {
    if (BYPASS_ONBOARDING_PAYWALL) {
      await completeOnboarding();
      return;
    }
    navigation.navigate('OnboardingPaywall');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <OnboardingProgressBar step={6} total={7} />
      <View style={{ flex: 1, padding: theme.spacing.lg, justifyContent: 'space-between' }}>
        <View>
          <Text variant="title" weight="bold" accessibilityRole="header" style={{ marginTop: theme.spacing.lg }}>
            {t('onboarding.timelineTitle')}
          </Text>
          <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.sm }}>
            {t('onboarding.timelineBody')}
          </Text>

          <View style={{ marginTop: theme.spacing.xl }}>
            <TimelineRow
              markerLabel="D0"
              accent
              title={t('onboarding.timeline.d0Title')}
              body={t('onboarding.timeline.d0Body')}
            />
            <TimelineRow
              markerLabel="D5"
              active
              title={t('onboarding.timeline.d5Title')}
              body={t('onboarding.timeline.d5Body')}
            />
            <TimelineRow
              markerLabel="D7"
              title={t('onboarding.timeline.d7Title')}
              body={t('onboarding.timeline.d7Body')}
            />
          </View>
        </View>

        <Button
          title={t('onboarding.timelineCta')}
          onPress={onContinue}
          variant="accent"
          accessibilityHint={BYPASS_ONBOARDING_PAYWALL ? 'Finishes onboarding' : 'Continues to subscription options'}
        />
      </View>
    </SafeAreaView>
  );
}
