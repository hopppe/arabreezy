import React, { useState } from 'react';
import { View, Alert, TouchableOpacity, Switch, Platform, Linking } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScreenContainer, Text, Card, Button } from '../components/ui';
import { theme } from '../theme';
import { useTranslation } from '../context/LanguageContext';
import { useUserProgress } from '../context/UserProgressContext';
import { useDialect } from '../context/DialectContext';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../context/SubscriptionContext';
import { useNavigation } from '@react-navigation/native';
import { PHASES } from '../data/phases';
import { ensurePermission, scheduleDailyReminder, cancelDailyReminder, parseTime, cancelStreakSaver } from '../services/notifications';

const SUPPORT_EMAIL = 'support@arabreezy.app';
const PRIVACY_URL = 'https://arabreezy.app/privacy';
const TERMS_URL = 'https://arabreezy.app/terms';

const DIALECT_LABELS = {
  saudi: 'Saudi',
  levantine: 'Levantine',
  fusha: 'Fusha (MSA)',
};

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { progress, resetAll, setDialect: saveDialect, setReminder, setStreakSaver, setPhase, resetPlacement } = useUserProgress();
  const { dialect, setDialect, availableDialects } = useDialect();
  const { user, signOut, isConfigured } = useAuth();
  const sub = useSubscription();
  const navigation = useNavigation();
  const [pickerOpen, setPickerOpen] = useState(false);

  const openExternal = async (url) => {
    try {
      const ok = await Linking.canOpenURL(url);
      if (!ok) {
        Alert.alert('Cannot open link', url);
        return;
      }
      await Linking.openURL(url);
    } catch (err) {
      Alert.alert('Cannot open link', err?.message ?? url);
    }
  };

  const onManageSubscription = () => {
    // iOS & Android both expose deep links to the store-managed subscription
    // page. RevenueCat recommends sending users there rather than re-presenting
    // the paywall, so cancellations flow through the store (Apple/Google
    // refund and refund-tracking rules require it).
    const url =
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/account/subscriptions'
        : 'https://play.google.com/store/account/subscriptions';
    openExternal(url);
  };

  const onUpgrade = () => navigation.navigate('Paywall');

  const onRestore = async () => {
    const res = await sub.restore();
    if (res.success && res.restored) {
      Alert.alert(t('paywall.restoredTitle'), t('paywall.restoredBody'));
    } else if (res.success) {
      Alert.alert(t('paywall.noRestoreTitle'), t('paywall.noRestoreBody'));
    } else if (res.error) {
      Alert.alert(t('paywall.purchaseFailedTitle'), res.error?.message || 'Try again.');
    }
  };

  const onRetakePlacement = () => {
    Alert.alert(
      'Re-take placement test?',
      'Your current phase will be replaced by the new placement result. Lesson history and SRS state are kept.',
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: 'Re-take', style: 'destructive', onPress: () => resetPlacement() },
      ]
    );
  };

  const onSendFeedback = () =>
    openExternal(`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Arabreezy feedback')}`);

  const onDeleteAccount = () => {
    Alert.alert(
      'Delete account?',
      "This permanently removes your account and all progress. We'll email you back within a day to confirm. There's no undo.",
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: 'Request deletion',
          style: 'destructive',
          onPress: () => {
            const subject = encodeURIComponent('Delete my Arabreezy account');
            const body = encodeURIComponent(
              `Please delete my account.\n\nEmail: ${user?.email ?? '(not signed in)'}\nUser ID: ${user?.id ?? '(none)'}\n`
            );
            openExternal(`mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`);
          },
        },
      ]
    );
  };

  const pickPhase = async (n) => {
    if (n === progress.phase) return;
    await setPhase(n);
  };

  const confirmSignOut = () => {
    Alert.alert('Sign out?', 'You can sign back in any time.', [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: async () => {
          try { await signOut(); }
          catch (err) { Alert.alert('Sign out failed', err?.message ?? 'Please try again.'); }
        },
      },
    ]);
  };

  const confirmReset = () => {
    Alert.alert(t('settings.resetProgress'), t('settings.resetConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.reset'), style: 'destructive', onPress: resetAll },
    ]);
  };

  const pickDialect = async (d) => {
    await setDialect(d);
    await saveDialect(d);
  };

  const toggleReminders = async (next) => {
    if (next) {
      const ok = await ensurePermission();
      if (!ok) {
        Alert.alert(t('settings.reminders'), t('settings.notifPermissionDenied'));
        return;
      }
      const { hour, minute } = parseTime(progress.reminderTime || '19:00');
      await scheduleDailyReminder({ hour, minute });
      await setReminder({ enabled: true });
    } else {
      await cancelDailyReminder();
      await setReminder({ enabled: false });
    }
  };

  const toggleStreakSaver = async (next) => {
    if (next) {
      const ok = await ensurePermission();
      if (!ok) {
        Alert.alert(t('settings.streakSaver'), t('settings.notifPermissionDenied'));
        return;
      }
      await setStreakSaver({ enabled: true });
    } else {
      await cancelStreakSaver();
      await setStreakSaver({ enabled: false });
    }
  };

  const onTimeChange = async (_event, date) => {
    if (Platform.OS !== 'ios') setPickerOpen(false);
    if (!date) return;
    const hour = date.getHours();
    const minute = date.getMinutes();
    const hh = String(hour).padStart(2, '0');
    const mm = String(minute).padStart(2, '0');
    await setReminder({ time: `${hh}:${mm}` });
    if (progress.remindersEnabled) {
      await scheduleDailyReminder({ hour, minute });
    }
  };

  const reminderDate = () => {
    const { hour, minute } = parseTime(progress.reminderTime || '19:00');
    const d = new Date();
    d.setHours(hour, minute, 0, 0);
    return d;
  };

  return (
    <ScreenContainer>
      <Text variant="display" weight="bold" accessibilityRole="header">
        {t('nav.settings')}
      </Text>

      <Card style={{ marginTop: theme.spacing.lg }}>
        <Text weight="bold" accessibilityRole="header">{t('settings.streak')}</Text>
        <View
          accessible
          accessibilityLabel={t('settings.streakDays', { n: progress.currentStreak || 0 })}
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}
        >
          <Text style={{ fontSize: 22, marginRight: 8 }} accessible={false}>🔥</Text>
          <Text variant="title" weight="bold" accessible={false}>
            {t('settings.streakDays', { n: progress.currentStreak || 0 })}
          </Text>
        </View>
        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
          {t('settings.longestStreak', { n: progress.longestStreak || 0 })}
        </Text>
      </Card>

      <Card style={{ marginTop: theme.spacing.lg }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text weight="bold" accessibilityRole="header">{t('settings.reminders')}</Text>
            <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
              {t('settings.remindersDesc')}
            </Text>
          </View>
          <Switch
            value={!!progress.remindersEnabled}
            onValueChange={toggleReminders}
            trackColor={{ false: theme.colors.gray300, true: theme.colors.accent }}
            accessibilityRole="switch"
            accessibilityLabel={t('settings.reminders')}
            accessibilityHint="Toggles a daily reminder notification"
            accessibilityState={{ checked: !!progress.remindersEnabled }}
          />
        </View>
        {progress.remindersEnabled && (
          <View style={{ marginTop: theme.spacing.md }}>
            <Text variant="caption" style={{ color: theme.colors.textMuted }}>
              {t('settings.reminderTime')}
            </Text>
            {Platform.OS === 'ios' ? (
              <DateTimePicker
                mode="time"
                value={reminderDate()}
                onChange={onTimeChange}
                display="compact"
                accessibilityLabel={t('settings.reminderTime')}
              />
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => setPickerOpen(true)}
                  style={{ marginTop: 6 }}
                  accessible
                  accessibilityRole="button"
                  accessibilityLabel={`${t('settings.reminderTime')}, ${progress.reminderTime || '19:00'}`}
                  accessibilityHint="Opens a time picker to change the reminder time"
                >
                  <Text variant="title" weight="bold">{progress.reminderTime || '19:00'}</Text>
                </TouchableOpacity>
                {pickerOpen && (
                  <DateTimePicker
                    mode="time"
                    value={reminderDate()}
                    onChange={onTimeChange}
                    accessibilityLabel={t('settings.reminderTime')}
                  />
                )}
              </>
            )}
          </View>
        )}
      </Card>

      <Card style={{ marginTop: theme.spacing.lg }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text weight="bold" accessibilityRole="header">{t('settings.streakSaver')}</Text>
            <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
              {t('settings.streakSaverDesc')}
            </Text>
          </View>
          <Switch
            value={!!progress.streakSaverEnabled}
            onValueChange={toggleStreakSaver}
            trackColor={{ false: theme.colors.gray300, true: theme.colors.accent }}
            accessibilityRole="switch"
            accessibilityLabel={t('settings.streakSaver')}
            accessibilityHint="Sends a late-day reminder if you haven't practiced"
            accessibilityState={{ checked: !!progress.streakSaverEnabled }}
          />
        </View>
      </Card>

      <Card style={{ marginTop: theme.spacing.lg }}>
        <Text weight="bold" accessibilityRole="header">{t('settings.phase')}</Text>
        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
          {t('settings.phaseDesc')}
        </Text>
        <View
          accessibilityRole="radiogroup"
          accessibilityLabel={t('settings.phase')}
          style={{
            marginTop: theme.spacing.md,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -4,
          }}
        >
          {PHASES.map((p) => {
            const active = p.phase === progress.phase;
            return (
              <TouchableOpacity
                key={p.phase}
                activeOpacity={0.85}
                onPress={() => pickPhase(p.phase)}
                accessible
                accessibilityRole="radio"
                accessibilityLabel={`Phase ${p.phase}, ${p.title}`}
                accessibilityState={{ selected: active, checked: active }}
                style={{
                  width: '20%',
                  paddingHorizontal: 4,
                  marginBottom: 8,
                }}
              >
                <View
                  importantForAccessibility="no"
                  style={{
                    paddingVertical: 10,
                    borderRadius: theme.radius.md,
                    backgroundColor: active ? theme.colors.black : theme.colors.surfaceMuted,
                    alignItems: 'center',
                  }}
                >
                  <Text
                    weight="bold"
                    style={{ color: active ? theme.colors.white : theme.colors.text }}
                  >
                    {p.phase}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text variant="caption" style={{ color: theme.colors.textFaint, marginTop: 6 }}>
          Phase {progress.phase}: {PHASES.find((p) => p.phase === progress.phase)?.title}
        </Text>
      </Card>

      <Card style={{ marginTop: theme.spacing.lg }}>
        <Text weight="bold" accessibilityRole="header">{t('settings.dialect')}</Text>
        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
          Saudi is the only fully-populated dialect for now. Levantine and Fusha are stubbed.
        </Text>
        <View
          accessibilityRole="radiogroup"
          accessibilityLabel={t('settings.dialect')}
          style={{ marginTop: theme.spacing.md }}
        >
          {availableDialects.map((d) => {
            const active = dialect === d;
            return (
              <TouchableOpacity
                key={d}
                activeOpacity={0.85}
                onPress={() => pickDialect(d)}
                accessible
                accessibilityRole="radio"
                accessibilityLabel={DIALECT_LABELS[d] || d}
                accessibilityState={{ selected: active, checked: active }}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  borderRadius: theme.radius.md,
                  backgroundColor: active ? theme.colors.black : theme.colors.surfaceMuted,
                  marginBottom: 8,
                }}
              >
                <Text weight={active ? 'bold' : 'regular'} style={{ color: active ? theme.colors.white : theme.colors.text }}>
                  {DIALECT_LABELS[d] || d}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      <Card style={{ marginTop: theme.spacing.lg }}>
        <Text weight="bold" accessibilityRole="header">Learning</Text>
        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
          Reset where you sit on the difficulty curve without losing progress.
        </Text>
        <View style={{ marginTop: theme.spacing.md }}>
          <Button
            title="Re-take placement test"
            variant="ghost"
            onPress={onRetakePlacement}
            accessibilityHint="Confirms before replacing your current phase with a new placement result"
          />
        </View>
      </Card>

      <Card style={{ marginTop: theme.spacing.lg }}>
        <Text weight="bold" accessibilityRole="header">{t('settings.subscription')}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: sub.isPro ? theme.colors.success : theme.colors.gray400,
              marginRight: 8,
            }}
          />
          <Text variant="small" style={{ color: theme.colors.textMuted }}>
            {sub.isPro ? t('settings.proActive') : t('settings.proInactive')}
          </Text>
        </View>
        <View style={{ marginTop: theme.spacing.md }}>
          {sub.isPro ? (
            <Button title={t('settings.manageSubscription')} variant="ghost" onPress={onManageSubscription} />
          ) : (
            <Button title={t('settings.upgrade')} variant="accent" onPress={onUpgrade} />
          )}
          <View style={{ height: theme.spacing.sm }} />
          <Button
            title={t('settings.restorePurchases')}
            variant="ghost"
            onPress={onRestore}
            loading={sub.loading}
          />
        </View>
      </Card>

      {isConfigured && user ? (
        <Card style={{ marginTop: theme.spacing.lg }}>
          <Text weight="bold" accessibilityRole="header">Account</Text>
          <Text
            variant="small"
            accessibilityLabel={`Signed in as ${user.email}`}
            style={{ color: theme.colors.textMuted, marginTop: 4 }}
          >
            {user.email}
          </Text>
          <View style={{ height: theme.spacing.md }} />
          <Button
            title="Sign out"
            variant="ghost"
            onPress={confirmSignOut}
            accessibilityHint="Confirms before signing you out"
          />
          <View style={{ height: theme.spacing.sm }} />
          <Button
            title="Delete account"
            variant="ghost"
            onPress={onDeleteAccount}
            accessibilityHint="Opens an email to request permanent account deletion"
          />
        </Card>
      ) : null}

      <Card style={{ marginTop: theme.spacing.lg }}>
        <Text weight="bold" accessibilityRole="header">Support</Text>
        <View style={{ marginTop: theme.spacing.md }}>
          <Button
            title="Send feedback"
            variant="ghost"
            onPress={onSendFeedback}
            accessibilityHint="Opens an email to the Arabreezy support team"
          />
          <View style={{ height: theme.spacing.sm }} />
          <Button
            title="Privacy policy"
            variant="ghost"
            onPress={() => openExternal(PRIVACY_URL)}
            accessibilityHint="Opens the privacy policy in your browser"
          />
          <View style={{ height: theme.spacing.sm }} />
          <Button
            title="Terms of service"
            variant="ghost"
            onPress={() => openExternal(TERMS_URL)}
            accessibilityHint="Opens the terms of service in your browser"
          />
        </View>
      </Card>

      <Card style={{ marginTop: theme.spacing.lg }}>
        <Text weight="bold" accessibilityRole="header">{t('settings.about')}</Text>
        <Text
          variant="small"
          accessibilityLabel={`Phase ${progress.phase}, ${progress.lessonsCompleted.length} lessons completed`}
          style={{ color: theme.colors.textMuted, marginTop: 4 }}
        >
          Phase: {progress.phase} · Lessons completed: {progress.lessonsCompleted.length}
        </Text>
      </Card>

      <View style={{ marginTop: theme.spacing.xl }}>
        <Button
          title={t('settings.resetProgress')}
          variant="ghost"
          onPress={confirmReset}
          accessibilityHint="Confirms before erasing all your progress"
        />
      </View>
    </ScreenContainer>
  );
}
