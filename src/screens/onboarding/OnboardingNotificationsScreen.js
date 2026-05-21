import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from '../../components/ui';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { ensurePermission, scheduleDailyReminder, parseTime } from '../../services/notifications';
import { OnboardingProgressBar } from './OnboardingProgressBar';

export default function OnboardingNotificationsScreen({ navigation }) {
  const { t } = useTranslation();
  const { progress, updateOnboarding, setReminder } = useUserProgress();
  const [busy, setBusy] = useState(false);

  const advance = () => navigation.navigate('OnboardingTimeline');

  const turnOn = async () => {
    setBusy(true);
    try {
      const ok = await ensurePermission();
      await updateOnboarding({ notificationsAsked: true });
      if (ok) {
        const { hour, minute } = parseTime(progress.reminderTime || '19:00');
        await scheduleDailyReminder({ hour, minute });
        await setReminder({ enabled: true });
      }
    } catch (err) {
      console.warn('[onboarding] notif setup failed:', err?.message);
    } finally {
      setBusy(false);
      advance();
    }
  };

  const skip = async () => {
    await updateOnboarding({ notificationsAsked: true });
    advance();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <OnboardingProgressBar step={5} total={7} />
      <View style={{ flex: 1, padding: theme.spacing.lg, justifyContent: 'space-between' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={{
              alignSelf: 'center',
              width: 96,
              height: 96,
              borderRadius: 48,
              backgroundColor: theme.colors.black,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.spacing.lg,
            }}
          >
            <Text style={{ fontSize: 44 }}>🔔</Text>
          </View>

          <Text variant="display" weight="bold" accessibilityRole="header" style={{ textAlign: 'center', lineHeight: 44 }}>
            {t('onboarding.notifTitle')}
          </Text>
          <Text
            variant="subtitle"
            style={{
              color: theme.colors.textMuted,
              marginTop: theme.spacing.md,
              lineHeight: 28,
              textAlign: 'center',
            }}
          >
            {t('onboarding.notifBody')}
          </Text>
        </View>

        <View>
          <Button
            title={t('onboarding.notifTurnOn')}
            onPress={turnOn}
            variant="accent"
            loading={busy}
            accessibilityHint="Requests notification permission so we can send daily reminders"
          />
          <View style={{ height: theme.spacing.sm }} />
          <Button
            title={t('onboarding.notifMaybeLater')}
            onPress={skip}
            variant="ghost"
            accessibilityHint="Skips reminders for now — you can enable them in settings later"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
