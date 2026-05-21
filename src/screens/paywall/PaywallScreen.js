// Paywall — designed against SOSA 2026 Education-category benchmarks:
//  - hard paywall after value-build (5x freemium D35 conversion lift)
//  - 7-day free trial (longer than the 3-day default that bleeds 55% on Day 0)
//  - 3 plan options with annual highlighted (Edu median is 2-plan @ 54.8%; we
//    add lifetime as a 3rd anchor since it raises perceived value of annual)
//  - highlighted pricing block, free-trial messaging, cancel-anytime,
//    feature list, restore + terms — the table-stakes UI elements that
//    appear on 60-75% of paywalls in the category
//  - "Continue / Start free trial" CTA wording (dominant in the corpus)
//  - scrollable layout (Education = 72% scrollable)
import React, { useMemo, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Alert, Linking, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text, Button } from '../../components/ui';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useSubscription } from '../../context/SubscriptionContext';
import { useUserProgress } from '../../context/UserProgressContext';

const TERMS_URL = 'https://arabreezy.app/terms';
const PRIVACY_URL = 'https://arabreezy.app/privacy';

function FeatureRow({ children }) {
  return (
    <View
      accessible
      accessibilityLabel={typeof children === 'string' ? children : undefined}
      style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: theme.spacing.sm }}
    >
      <View
        importantForAccessibility="no"
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          backgroundColor: theme.colors.accentSoft,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: theme.spacing.sm,
          marginTop: 2,
        }}
      >
        <Ionicons name="checkmark" size={14} color={theme.colors.accent} />
      </View>
      <Text variant="body" style={{ flex: 1, lineHeight: 22 }}>
        {children}
      </Text>
    </View>
  );
}

function PlanCard({ pkg, selected, onSelect, t }) {
  const isAnnual = pkg.period === 'year';
  const isLifetime = pkg.period === 'lifetime';

  const label =
    pkg.label || (isAnnual ? t('paywall.annual') : isLifetime ? t('paywall.lifetime') : t('paywall.monthly'));
  const tagline =
    pkg.tagline ||
    (isAnnual
      ? t('paywall.bestValue')
      : isLifetime
      ? t('paywall.payOnceTag')
      : null);
  const sublabel =
    pkg.sublabel ||
    (isAnnual
      ? pkg.trialDays
        ? t('paywall.annualSubtitle', { price: pkg.priceString })
        : `${pkg.priceString}${t('paywall.perYear')}`
      : isLifetime
      ? t('paywall.lifetimeSubtitle')
      : t('paywall.monthlySubtitle'));

  const priceUnit = isAnnual
    ? t('paywall.perYear')
    : isLifetime
    ? ` ${t('paywall.once')}`
    : t('paywall.perMonth');

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onSelect}
      accessible
      accessibilityRole="radio"
      accessibilityLabel={`${label}. ${pkg.priceString} ${priceUnit}. ${sublabel}${tagline ? `. ${tagline}` : ''}`}
      accessibilityState={{ selected, checked: selected }}
      style={{
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        borderWidth: 2,
        borderColor: selected ? theme.colors.black : theme.colors.border,
        backgroundColor: selected ? theme.colors.surfaceMuted : theme.colors.surface,
        marginBottom: 10,
        minHeight: 64,
      }}
    >
      {tagline ? (
        <View
          importantForAccessibility="no"
          style={{
            position: 'absolute',
            top: -10,
            right: 16,
            backgroundColor: isAnnual ? theme.colors.accent : theme.colors.black,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: theme.radius.pill,
          }}
        >
          <Text variant="caption" weight="bold" style={{ color: theme.colors.white }}>
            {tagline}
          </Text>
        </View>
      ) : null}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: selected ? theme.colors.black : theme.colors.gray300,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: theme.spacing.md,
          }}
        >
          {selected ? (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: theme.colors.black,
              }}
            />
          ) : null}
        </View>
        <View style={{ flex: 1 }}>
          <Text weight="bold">{label}</Text>
          <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
            {sublabel}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text weight="bold" variant="subtitle">
            {pkg.priceString}
          </Text>
          <Text variant="caption" style={{ color: theme.colors.textMuted }}>
            {priceUnit}
          </Text>
        </View>
      </View>
      {isAnnual && pkg.pricePerMonthString ? (
        <Text
          variant="caption"
          style={{
            color: theme.colors.textMuted,
            marginTop: 8,
            marginLeft: 36,
          }}
        >
          {t('paywall.annualPerMonthHint', { price: pkg.pricePerMonthString })}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

export default function PaywallScreen({ navigation, route }) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const sub = useSubscription();
  const { completeOnboarding } = useUserProgress();

  // Default to the annual package — converts highest in Education category.
  const defaultId = useMemo(() => {
    const annual = sub.packages.find((p) => p.period === 'year');
    return (annual || sub.packages[0])?.identifier;
  }, [sub.packages]);
  const [selectedId, setSelectedId] = useState(defaultId);

  const selectedPkg = sub.packages.find((p) => p.identifier === selectedId) || sub.packages[0];

  const fromOnboarding = route?.params?.fromOnboarding === true;

  const ctaTitle = !selectedPkg
    ? t('paywall.ctaSubscribe')
    : selectedPkg.period === 'lifetime'
    ? t('paywall.ctaLifetime')
    : selectedPkg.trialDays > 0 || selectedPkg.period === 'year'
    ? t('paywall.ctaTrial')
    : t('paywall.ctaSubscribe');

  const exitToApp = async () => {
    if (fromOnboarding) {
      await completeOnboarding();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const onPurchase = async () => {
    if (!selectedPkg) return;
    const res = await sub.purchase(selectedPkg);
    if (res.success) {
      await exitToApp();
    } else if (res.cancelled) {
      // user dismissed sheet — say nothing
    } else if (res.error) {
      Alert.alert(t('paywall.purchaseFailedTitle'), res.error?.message || 'Try again.');
    }
  };

  const onRestore = async () => {
    const res = await sub.restore();
    if (res.success && res.restored) {
      Alert.alert(t('paywall.restoredTitle'), t('paywall.restoredBody'));
      await exitToApp();
    } else if (res.success) {
      Alert.alert(t('paywall.noRestoreTitle'), t('paywall.noRestoreBody'));
    } else if (res.error) {
      Alert.alert(t('paywall.purchaseFailedTitle'), res.error?.message || 'Try again.');
    }
  };

  // Already Pro? Show a tiny confirmation panel instead of the sales pitch.
  if (sub.isPro) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={{ flex: 1, padding: theme.spacing.lg, justifyContent: 'center', alignItems: 'center' }}>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.accent,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: theme.spacing.lg,
            }}
          >
            <Ionicons name="checkmark" size={40} color={theme.colors.white} />
          </View>
          <Text variant="title" weight="bold" accessibilityRole="header">
            {t('paywall.proTitle')}
          </Text>
          <Text
            variant="body"
            style={{
              color: theme.colors.textMuted,
              marginTop: theme.spacing.sm,
              textAlign: 'center',
            }}
          >
            {t('paywall.proBody')}
          </Text>
          <View style={{ marginTop: theme.spacing.xl, width: '100%' }}>
            <Button
              title={t('paywall.manage')}
              variant="primary"
              accessibilityHint="Opens your subscription management in the App Store"
              onPress={() => {
                const url = 'https://apps.apple.com/account/subscriptions';
                Linking.openURL(url).catch(() => {});
              }}
            />
            <View style={{ height: theme.spacing.sm }} />
            <Button
              title={t('common.done')}
              variant="ghost"
              onPress={exitToApp}
              accessibilityHint="Closes this screen"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Floating close — kept light so the eye lands on the offer, not the X */}
      <TouchableOpacity
        onPress={exitToApp}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Close"
        accessibilityHint="Dismisses the paywall"
        style={{
          position: 'absolute',
          top: insets.top + 8,
          right: theme.spacing.md,
          zIndex: 10,
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: theme.colors.surfaceMuted,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name="close" size={20} color={theme.colors.text} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{ padding: theme.spacing.lg, paddingTop: theme.spacing.xl + 16, paddingBottom: theme.spacing.xl }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: theme.colors.black,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: theme.radius.pill,
            marginBottom: theme.spacing.md,
          }}
        >
          <Text variant="caption" weight="bold" style={{ color: theme.colors.white, letterSpacing: 1 }}>
            {t('paywall.eyebrow').toUpperCase()}
          </Text>
        </View>

        <Text variant="display" weight="bold" accessibilityRole="header" style={{ lineHeight: 44 }}>
          {t('paywall.title')}
        </Text>
        <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.sm }}>
          {t('paywall.subtitle')}
        </Text>

        <View
          accessibilityRole="list"
          accessibilityLabel="Included features"
          style={{ marginTop: theme.spacing.lg, marginBottom: theme.spacing.lg }}
        >
          <FeatureRow>{t('paywall.feature1')}</FeatureRow>
          <FeatureRow>{t('paywall.feature2')}</FeatureRow>
          <FeatureRow>{t('paywall.feature3')}</FeatureRow>
          <FeatureRow>{t('paywall.feature4')}</FeatureRow>
          <FeatureRow>{t('paywall.feature5')}</FeatureRow>
        </View>

        {!sub.ready ? (
          <View
            accessible
            accessibilityRole="progressbar"
            accessibilityLabel="Loading subscription options"
            accessibilityState={{ busy: true }}
            style={{ paddingVertical: theme.spacing.xl, alignItems: 'center' }}
          >
            <ActivityIndicator color={theme.colors.text} />
          </View>
        ) : (
          <View
            accessibilityRole="radiogroup"
            accessibilityLabel="Subscription plans"
            style={{ marginTop: theme.spacing.sm }}
          >
            {sub.packages.map((pkg) => (
              <PlanCard
                key={pkg.identifier}
                pkg={pkg}
                selected={selectedId === pkg.identifier}
                onSelect={() => setSelectedId(pkg.identifier)}
                t={t}
              />
            ))}
          </View>
        )}

        <View style={{ marginTop: theme.spacing.md }}>
          <Button
            title={ctaTitle}
            onPress={onPurchase}
            variant="accent"
            loading={sub.loading}
            disabled={!selectedPkg || !sub.ready}
            accessibilityHint="Starts your purchase or trial"
          />
          <Text
            variant="caption"
            style={{
              color: theme.colors.textMuted,
              textAlign: 'center',
              marginTop: theme.spacing.sm,
              lineHeight: 18,
            }}
          >
            {selectedPkg?.period === 'year' && selectedPkg?.trialDays > 0
              ? t('paywall.noChargeToday')
              : t('paywall.cancelAnytime')}
          </Text>
        </View>

        {sub.usingFallback ? (
          <View
            style={{
              marginTop: theme.spacing.md,
              padding: theme.spacing.sm,
              borderRadius: theme.radius.md,
              backgroundColor: theme.colors.gray100,
            }}
          >
            <Text variant="caption" style={{ color: theme.colors.textMuted, textAlign: 'center' }}>
              {t('paywall.notReadyBody')}
            </Text>
          </View>
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: theme.spacing.lg,
          }}
        >
          <TouchableOpacity
            onPress={onRestore}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessible
            accessibilityRole="button"
            accessibilityLabel={t('paywall.restore')}
            accessibilityHint="Restores a previous purchase"
          >
            <Text variant="small" style={{ color: theme.colors.textMuted }}>
              {t('paywall.restore')}
            </Text>
          </TouchableOpacity>
          <Text
            variant="small"
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={{ color: theme.colors.textFaint, marginHorizontal: 8 }}
          >
            ·
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(TERMS_URL).catch(() => {})}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessible
            accessibilityRole="link"
            accessibilityLabel={t('paywall.terms')}
            accessibilityHint="Opens the terms of service in your browser"
          >
            <Text variant="small" style={{ color: theme.colors.textMuted }}>
              {t('paywall.terms')}
            </Text>
          </TouchableOpacity>
          <Text
            variant="small"
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={{ color: theme.colors.textFaint, marginHorizontal: 8 }}
          >
            ·
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(PRIVACY_URL).catch(() => {})}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            accessible
            accessibilityRole="link"
            accessibilityLabel={t('paywall.privacy')}
            accessibilityHint="Opens the privacy policy in your browser"
          >
            <Text variant="small" style={{ color: theme.colors.textMuted }}>
              {t('paywall.privacy')}
            </Text>
          </TouchableOpacity>
        </View>

        {fromOnboarding ? (
          <View style={{ marginTop: theme.spacing.lg, alignItems: 'center' }}>
            <TouchableOpacity
              onPress={exitToApp}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessible
              accessibilityRole="button"
              accessibilityLabel={t('paywall.maybeLater')}
              accessibilityHint="Skips the offer and starts the app on the free plan"
            >
              <Text variant="small" weight="bold" style={{ color: theme.colors.textMuted }}>
                {t('paywall.maybeLater')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
