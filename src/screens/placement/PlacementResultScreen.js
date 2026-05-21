import React, { useState } from 'react';
import { View } from 'react-native';
import { ScreenContainer, Text, Button } from '../../components/ui';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { getPhase } from '../../data/phases';

export default function PlacementResultScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { completePlacement, progress } = useUserProgress();
  const { placedPhase = 1, score = 0 } = route.params || {};
  const phaseInfo = getPhase(placedPhase);
  const [working, setWorking] = useState(false);

  // If user placed at Phase 3+, the normal curriculum assumed they'd see the
  // P3 root-family introduction. They haven't. Offer the primer up front.
  const primerAlreadyDone = progress.lessonsCompleted.includes('primer:root-system');
  const shouldOfferPrimer = placedPhase >= 3 && !primerAlreadyDone;

  const finishAndGoHome = async () => {
    setWorking(true);
    try {
      await completePlacement({ score, placedPhase });
      // RootNavigator flips to the tab stack once placement.completed is true,
      // so no explicit navigation call is needed for the default path.
    } finally {
      setWorking(false);
    }
  };

  const finishAndOpenPrimer = async () => {
    setWorking(true);
    try {
      await completePlacement({ score, placedPhase });
      // After completing placement the app transitions to the tab stack; the
      // primer route lives inside the Activities stack.
      setTimeout(() => {
        navigation.getParent()?.navigate?.('ActivitiesTab', { screen: 'Primer' });
      }, 0);
    } finally {
      setWorking(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text
          variant="display"
          weight="bold"
          accessibilityRole="header"
        >
          {t('placement.resultTitle', { phase: placedPhase })}
        </Text>
        <Text variant="subtitle" style={{ marginTop: theme.spacing.sm, color: theme.colors.textMuted }}>
          {phaseInfo.title} · {phaseInfo.cefr}
        </Text>
        <Text variant="body" style={{ marginTop: theme.spacing.md, color: theme.colors.textMuted }}>
          {phaseInfo.tagline}
        </Text>
        <Text variant="body" style={{ marginTop: theme.spacing.md, color: theme.colors.textMuted }}>
          {t('placement.resultBody')}
        </Text>

        {shouldOfferPrimer && (
          <View
            accessible
            accessibilityLabel="Quick head start. You placed past the phase where we introduce Arabic's root system. A 3-minute primer makes the rest of the app click faster."
            style={{ marginTop: theme.spacing.lg, padding: theme.spacing.md, borderRadius: theme.radius.md, backgroundColor: theme.colors.accentSoft }}
          >
            <Text weight="bold" accessibilityRole="header">Quick head start?</Text>
            <Text variant="small" style={{ marginTop: 4, color: theme.colors.textMuted }}>
              You placed past the phase where we introduce Arabic's root system.
              A 3-minute primer makes the rest of the app click faster.
            </Text>
          </View>
        )}

        <View style={{ marginTop: theme.spacing.xl }}>
          {shouldOfferPrimer && (
            <>
              <Button
                title="Take the 3-minute primer"
                variant="accent"
                loading={working}
                onPress={finishAndOpenPrimer}
                accessibilityHint="Opens the 3-minute primer on Arabic root families"
              />
              <View style={{ height: theme.spacing.sm }} />
              <Button
                title={t('placement.startLearning')}
                variant="ghost"
                onPress={finishAndGoHome}
                accessibilityHint="Skips the primer and starts learning at your placed phase"
              />
            </>
          )}
          {!shouldOfferPrimer && (
            <Button
              title={t('placement.startLearning')}
              variant="accent"
              loading={working}
              onPress={finishAndGoHome}
              accessibilityHint="Starts your daily review at the placed phase"
            />
          )}
        </View>
      </View>
    </ScreenContainer>
  );
}
