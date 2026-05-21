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
import { getIdioms } from '../../../backend/localBackend';
import { shuffle } from '../../utils/shuffle';

export default function IdiomsScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { progress, logActivity } = useUserProgress();
  const phase = route?.params?.phase ?? progress.phase;
  const { playText } = useAudio();

  const [items, setItems] = useState([]);
  const [idx, setIdx] = useState(0);
  const [pickedIdx, setPickedIdx] = useState(null);
  const [score, setScore] = useState(0);
  const [showExamples, setShowExamples] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getIdioms({ dialect, phase })
      .then((res) => {
        if (!cancelled) setItems(res);
      })
      .catch((e) => {
        console.warn('[idioms] fetch failed', e);
      });
    return () => { cancelled = true; };
  }, [dialect, phase]);

  const item = items[idx];
  const shuffledChoices = useMemo(
    () => (item?.choices ? shuffle(item.choices) : []),
    [item],
  );

  if (!items.length) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text variant="display" weight="bold" accessibilityRole="header">{t('idioms.title')}</Text>
        <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}>
          {t('idioms.empty')}
        </Text>
        <View style={{ marginTop: theme.spacing.xl }}>
          <Button
            title={t('common.back')}
            variant="ghost"
            onPress={() => navigation.goBack()}
            accessibilityHint="Returns to the activities screen"
          />
        </View>
      </ScreenContainer>
    );
  }

  if (!item) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text variant="display" weight="bold" accessibilityRole="header">{t('idioms.complete')}</Text>
          <Text
            variant="body"
            accessibilityLabel={`You scored ${score} out of ${items.length}`}
            style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}
          >
            {t('stories.score', { score, total: items.length })}
          </Text>
          <View style={{ marginTop: theme.spacing.xl }}>
            <Button
              title={t('common.done')}
              variant="accent"
              onPress={() => navigation.goBack()}
              accessibilityHint="Closes the idioms session"
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  const onPick = (i) => {
    if (pickedIdx != null) return;
    const correctIdx = shuffledChoices.indexOf(item.meaning);
    setPickedIdx(i);
    if (i === correctIdx) {
      setScore((s) => s + 1);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    }
  };

  const onNext = () => {
    if (idx + 1 >= items.length) {
      logActivity({ type: 'idiom', contentId: item.id, dialect, phase: item.phase });
    }
    setIdx(idx + 1);
    setPickedIdx(null);
    setShowExamples(false);
  };

  const correctIdx = shuffledChoices.indexOf(item.meaning);

  return (
    <ScreenContainer onClose={() => navigation.goBack()}>
      <ActivityHeader
        title={t('idioms.title')}
        current={idx + 1}
        total={items.length}
      />
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => playText(item.expression, { dialect })}
        accessible
        accessibilityRole="button"
        accessibilityLabel={
          item.transliteration
            ? `Listen to idiom, pronounced ${item.transliteration}`
            : 'Listen to idiom'
        }
        accessibilityHint="Plays audio of the Arabic idiom"
      >
        <Card style={{ marginTop: theme.spacing.md, padding: theme.spacing.lg, backgroundColor: theme.colors.accentSoft }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text
              style={{ fontSize: 32 }}
              accessibilityElementsHidden
              importantForAccessibility="no"
            >
              {item.icon || '💬'}
            </Text>
            <Text
              accessibilityElementsHidden
              importantForAccessibility="no"
              style={{ fontSize: 22, color: theme.colors.accent }}
            >
              ▶
            </Text>
          </View>
          <ArabicText size="display" accessibilityLabel={item.transliteration} readAs="label" style={{ marginTop: 8 }}>
            {item.expression}
          </ArabicText>
          {item.transliteration && (
            <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 6 }}>
              {item.transliteration}
            </Text>
          )}
          {item.literalTranslation && (
            <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
              {t('idioms.literal')}: {item.literalTranslation}
            </Text>
          )}
        </Card>
      </TouchableOpacity>

      <Text variant="body" weight="bold" accessibilityRole="header" style={{ marginTop: theme.spacing.lg }}>
        {t('idioms.whatDoesItMean')}
      </Text>
      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={t('idioms.whatDoesItMean')}
        style={{ marginTop: theme.spacing.md }}
      >
        {shuffledChoices.map((opt, i) => {
          const isCorrect = i === correctIdx;
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
              accessibilityLabel={`${opt}${stateLabel}`}
              accessibilityState={{ selected: isPicked, checked: isPicked, disabled: pickedIdx != null }}
            >
              <Card style={{ marginBottom: 10, borderColor, borderWidth: 1.5 }}>
                <Text>{opt}</Text>
              </Card>
            </TouchableOpacity>
          );
        })}
      </View>

      {pickedIdx != null && (
        <View style={{ marginTop: theme.spacing.md }}>
          {!showExamples ? (
            <Button
              title={t('idioms.showExamples')}
              variant="ghost"
              onPress={() => setShowExamples(true)}
              accessibilityHint="Shows example sentences using this idiom"
            />
          ) : (
            <View accessibilityRole="list" accessibilityLabel="Example sentences">
              {item.examples?.map((ex, i) => (
                <Card key={i} style={{ marginBottom: 8 }}>
                  <ArabicText>{ex}</ArabicText>
                </Card>
              ))}
            </View>
          )}
          <View style={{ marginTop: theme.spacing.md }}>
            <Button
              title={t('common.next')}
              variant="accent"
              onPress={onNext}
              accessibilityHint={idx + 1 >= items.length ? 'Finishes the session' : 'Goes to the next idiom'}
            />
          </View>
        </View>
      )}
    </ScreenContainer>
  );
}
