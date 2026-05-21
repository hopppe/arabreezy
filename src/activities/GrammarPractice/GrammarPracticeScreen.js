import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer, Text, Card, Button, ActivityHeader } from '../../components/ui';
import { ArabicText } from '../../components/ArabicText';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { useAudio } from '../../hooks/useAudio';
import { getGrammarDrills } from '../../../backend/localBackend';
import { shuffle } from '../../utils/shuffle';

// Drill list + per-drill quiz. A "drill" is one grammatical concept with
// 2-6 prompts. Promote to next drill on completion.
export default function GrammarPracticeScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { progress, logActivity } = useUserProgress();
  const phase = route?.params?.phase ?? progress.phase;
  const drillId = route?.params?.drillId;

  const [drills, setDrills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getGrammarDrills({ dialect, phase })
      .then((res) => {
        if (!cancelled) {
          setDrills(res);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.warn('[grammar] fetch failed', e);
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [dialect, phase]);

  if (loading) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text accessibilityLiveRegion="polite">{t('common.loading')}</Text>
      </ScreenContainer>
    );
  }

  if (drillId) {
    const drill = drills.find((d) => d.id === drillId);
    if (!drill) {
      return (
        <ScreenContainer onClose={() => navigation.goBack()}>
          <Text accessibilityRole="alert">{t('grammar.notFound')}</Text>
          <View style={{ marginTop: theme.spacing.lg }}>
            <Button
              title={t('common.back')}
              variant="ghost"
              onPress={() => navigation.goBack()}
              accessibilityHint="Returns to the grammar drill list"
            />
          </View>
        </ScreenContainer>
      );
    }
    return <GrammarDrill drill={drill} navigation={navigation} onComplete={() => {
      logActivity({ type: 'grammar', contentId: drill.id, dialect, phase: drill.phase });
    }} />;
  }

  return (
    <ScreenContainer onClose={() => navigation.goBack()}>
      <ActivityHeader title={t('grammar.title')} subtitle={t('grammar.subtitle')} />
      <View accessibilityRole="list" accessibilityLabel={t('grammar.title')}>
        {drills.length === 0 ? (
          <Text variant="body" style={{ color: theme.colors.textMuted }}>{t('grammar.empty')}</Text>
        ) : drills.map((d) => (
          <TouchableOpacity
            key={d.id}
            activeOpacity={0.85}
            onPress={() => navigation.push('Grammar', { drillId: d.id })}
            accessible
            accessibilityRole="button"
            accessibilityLabel={d.concept}
            accessibilityHint={d.description || 'Opens this grammar drill'}
          >
            <Card style={{ marginBottom: theme.spacing.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{ fontSize: 28, marginRight: 12 }}
                  accessibilityElementsHidden
                  importantForAccessibility="no"
                >
                  {d.icon || '✍️'}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text weight="bold" variant="subtitle">{d.concept}</Text>
                  {d.description && (
                    <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
                      {d.description}
                    </Text>
                  )}
                </View>
                <Text
                  weight="bold"
                  accessibilityElementsHidden
                  importantForAccessibility="no"
                  style={{ color: theme.colors.accent, fontSize: 20 }}
                >
                  →
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenContainer>
  );
}

function GrammarDrill({ drill, navigation, onComplete }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { playText } = useAudio();
  const [idx, setIdx] = useState(0);
  const [pickedIdx, setPickedIdx] = useState(null);
  const [score, setScore] = useState(0);
  const prompts = drill.prompts || [];
  const current = prompts[idx];
  const shuffledChoices = useMemo(
    () => (current?.choices
      ? shuffle(current.choices.map((text, i) => ({ text, originalIndex: i })))
      : []),
    [current],
  );

  if (!current) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text variant="display" weight="bold" accessibilityRole="header">{t('grammar.complete')}</Text>
          <Text
            variant="body"
            accessibilityLabel={`You scored ${score} out of ${prompts.length}`}
            style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}
          >
            {t('stories.score', { score, total: prompts.length })}
          </Text>
          <View style={{ marginTop: theme.spacing.xl }}>
            <Button
              title={t('common.done')}
              variant="accent"
              onPress={() => { onComplete?.(); navigation.goBack(); }}
              accessibilityHint="Closes this drill"
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  const onPick = (i) => {
    if (pickedIdx != null) return;
    setPickedIdx(i);
    if (shuffledChoices[i]?.originalIndex === current.correct) {
      setScore((s) => s + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      // Play the correct Arabic answer for reinforcement.
      playText(current.choices[current.correct], { dialect });
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    }
  };

  const onNext = () => {
    setIdx(idx + 1);
    setPickedIdx(null);
  };

  return (
    <ScreenContainer onClose={() => navigation.goBack()}>
      <ActivityHeader
        title={drill.concept}
        current={idx + 1}
        total={prompts.length}
        progress={(idx / prompts.length) * 100}
      />

      <Card style={{ padding: theme.spacing.lg }}>
        <Text variant="caption" style={{ color: theme.colors.textMuted }}>{t('grammar.translate')}</Text>
        <Text variant="title" weight="bold" accessibilityRole="header" style={{ marginTop: 6 }}>{current.stem}</Text>
      </Card>

      {drill.description && idx === 0 && (
        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 8 }}>
          {drill.description}
        </Text>
      )}

      <View
        accessibilityRole="radiogroup"
        accessibilityLabel="Answer choices"
        style={{ marginTop: theme.spacing.lg }}
      >
        {shuffledChoices.map((opt, i) => {
          const isCorrect = opt.originalIndex === current.correct;
          const isPicked = pickedIdx === i;
          const showResult = pickedIdx != null;
          const borderColor = !showResult
            ? theme.colors.border
            : isCorrect
              ? theme.colors.success
              : isPicked
                ? theme.colors.error
                : theme.colors.border;
          const stateLabel = showResult
            ? isCorrect
              ? ', correct answer'
              : isPicked
                ? ', your answer, incorrect'
                : ''
            : '';
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.85}
              onPress={() => onPick(i)}
              disabled={pickedIdx != null}
              accessible
              accessibilityRole="radio"
              accessibilityLabel={`${opt.text}${stateLabel}`}
              accessibilityState={{ selected: isPicked, checked: isPicked, disabled: pickedIdx != null }}
            >
              <Card style={{ marginBottom: 10, borderColor, borderWidth: 1.5 }}>
                <Text>{opt.text}</Text>
              </Card>
            </TouchableOpacity>
          );
        })}
      </View>

      {pickedIdx != null && current.explanation && (
        <Text
          variant="small"
          accessibilityLiveRegion="polite"
          style={{ color: theme.colors.textMuted, marginTop: 8 }}
        >
          {current.explanation}
        </Text>
      )}
      {pickedIdx != null && (
        <View style={{ marginTop: theme.spacing.lg }}>
          <Button
            title={t('common.next')}
            variant="accent"
            onPress={onNext}
            accessibilityHint={idx + 1 >= prompts.length ? 'Finishes the drill' : 'Goes to the next prompt'}
          />
        </View>
      )}
    </ScreenContainer>
  );
}
