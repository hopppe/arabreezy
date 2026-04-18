import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, ProgressBar, Button } from '../../components/ui';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useDialect } from '../../context/DialectContext';
import { PLACEMENT_QUESTIONS, scorePlacement } from '../../data/placement';
import { ArabicText } from '../../components/ArabicText';

export default function PlacementQuestionScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { bundle } = useDialect();
  const { index = 0, answers = [] } = route.params || {};
  const question = PLACEMENT_QUESTIONS[index];
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [index]);

  if (!question) {
    // Shouldn't happen — safety net
    return null;
  }

  const choiceWords = question.choices.map((wid) => bundle.words[wid]).filter(Boolean);

  const submit = () => {
    const correct = selected === question.answerWordId;
    const nextAnswers = [...answers, { questionId: question.id, correct }];
    const nextIndex = index + 1;
    if (nextIndex >= PLACEMENT_QUESTIONS.length) {
      const { placedLevel, score } = scorePlacement(nextAnswers);
      navigation.replace('PlacementResult', { placedLevel, score });
    } else {
      navigation.push('PlacementQuestion', { index: nextIndex, answers: nextAnswers });
    }
  };

  return (
    <ScreenContainer>
      <Text variant="caption" style={{ color: theme.colors.textMuted }}>
        {t('placement.questionCounter', { n: index + 1, total: PLACEMENT_QUESTIONS.length })}
      </Text>
      <View style={{ marginTop: theme.spacing.sm }}>
        <ProgressBar value={((index + 1) / PLACEMENT_QUESTIONS.length) * 100} />
      </View>

      <Text variant="title" weight="bold" style={{ marginTop: theme.spacing.xl }}>
        {question.prompt}
      </Text>

      <View style={{ marginTop: theme.spacing.lg }}>
        {choiceWords.map((w) => {
          const isSelected = selected === w.id;
          return (
            <TouchableOpacity
              key={w.id}
              activeOpacity={0.85}
              onPress={() => setSelected(w.id)}
            >
              <Card
                style={{
                  marginBottom: theme.spacing.md,
                  borderColor: isSelected ? theme.colors.accent : theme.colors.border,
                  borderWidth: isSelected ? 2 : 1,
                }}
              >
                <ArabicText size="lg">{w.script}</ArabicText>
                <Text variant="small" style={{ marginTop: 4, color: theme.colors.textMuted }}>
                  {w.transliteration}
                </Text>
              </Card>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{ marginTop: theme.spacing.lg }}>
        <Button
          title={t('common.next')}
          disabled={!selected}
          onPress={submit}
          variant="accent"
        />
      </View>
    </ScreenContainer>
  );
}
