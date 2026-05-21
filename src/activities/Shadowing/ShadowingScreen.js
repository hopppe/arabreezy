import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { ScreenContainer, Text, Button, FocalWordsBanner } from '../../components/ui';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { getShadowingPhrases } from '../../../backend/localBackend';
import ShadowingPracticeInterface from './ShadowingPracticeInterface';

// Loads the shadowing set for the current phase, wraps it in the shape the
// interface expects ({ lessonName, sentences }), and hands it off. The actual
// listen → shadow → score loop lives in ShadowingPracticeInterface.
export default function ShadowingScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { progress, completeLesson, logActivity } = useUserProgress();
  const phase = route.params?.phase ?? progress.phase;
  const focalWords = route.params?.focalWords;

  const [phrases, setPhrases] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getShadowingPhrases({ dialect, phase })
      .then((res) => {
        if (!cancelled) setPhrases(res || []);
      })
      .catch(() => {
        if (!cancelled) setPhrases([]);
      });
    return () => {
      cancelled = true;
    };
  }, [dialect, phase]);

  // When called from the unit flow, narrow the phrase set to those that
  // actually drill one of the 8 focal words (rows carry `wordRef`). If no
  // phrase tags any of the focals, fall back to the full phase set rather
  // than showing an empty screen.
  const focalPhrases = useMemo(() => {
    if (!phrases || !Array.isArray(focalWords) || focalWords.length === 0) return phrases;
    const focalIds = new Set(focalWords.map((w) => w.id).filter(Boolean));
    if (focalIds.size === 0) return phrases;
    const matched = phrases.filter((p) => p.wordRef && focalIds.has(p.wordRef));
    return matched.length > 0 ? matched : phrases;
  }, [phrases, focalWords]);

  const handleComplete = async () => {
    await completeLesson(`shadow:${phase}`, { advancePhase: false });
    await logActivity({ type: 'shadowing', dialect, phase });
    navigation.goBack();
  };

  if (phrases === null) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <FocalWordsBanner words={focalWords} />
        <Text accessibilityLiveRegion="polite">{t('common.loading')}</Text>
      </ScreenContainer>
    );
  }

  if (!focalPhrases.length) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <FocalWordsBanner words={focalWords} />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text variant="display" weight="bold" accessibilityRole="header">{t('shadowing.emptyTitle')}</Text>
          <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}>
            {t('shadowing.emptyBody')}
          </Text>
          <View style={{ marginTop: theme.spacing.xl }}>
            <Button
              title={t('common.back')}
              variant="ghost"
              onPress={() => navigation.goBack()}
              accessibilityHint="Returns to the previous screen"
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  const isFocalRun = Array.isArray(focalWords) && focalWords.length > 0;
  const lessonData = {
    id: isFocalRun ? `shadow_unit_${phase}_${focalWords.map((w) => w.id).join('_')}` : `shadow_phase_${phase}`,
    lessonName: isFocalRun ? `Unit · Phase ${phase}` : `Phase ${phase}`,
    phase,
    sentences: focalPhrases.map((p) => ({
      script: p.script,
      english: p.english,
      transliteration: p.transliteration,
    })),
  };

  return (
    <ShadowingPracticeInterface
      lessonData={lessonData}
      onComplete={handleComplete}
      onBack={() => navigation.goBack()}
    />
  );
}
