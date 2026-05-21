import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, ProgressBar, Button } from '../../components/ui';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useDialect } from '../../context/DialectContext';
import { nextPlacementQuestion, scorePlacement } from '../../data/placement';
import { ArabicText } from '../../components/ArabicText';
import { shuffle } from '../../utils/shuffle';

// Soft cap so the progress bar feels meaningful — most adaptive runs finish in
// 5–11 questions (one per phase climbed, plus the wrong answer that stops it).
const TARGET_LENGTH = 11;

export default function PlacementQuestionScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { bundle } = useDialect();
  const { answers = [] } = route.params || {};
  const next = useMemo(() => nextPlacementQuestion(answers), [answers]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [next?.question?.id]);

  // If the adaptive runner has nothing left, the test is done.
  useEffect(() => {
    if (!next) {
      const { placedPhase, score } = scorePlacement(answers);
      navigation.replace('PlacementResult', { placedPhase, score });
    }
  }, [next, answers, navigation]);

  if (!next) return null;
  const { question, phase } = next;

  const choiceWords = useMemo(
    () => shuffle(question.choices.map((wid) => bundle.words[wid]).filter(Boolean)),
    [question.id, bundle],
  );

  const submit = () => {
    const correct = selected === question.answerWordId;
    const nextAnswers = [...answers, { questionId: question.id, correct }];
    navigation.push('PlacementQuestion', { answers: nextAnswers });
  };

  const askedCount = answers.length + 1;
  const progressPct = Math.min((askedCount / TARGET_LENGTH) * 100, 100);

  return (
    <ScreenContainer>
      <Text
        variant="caption"
        accessibilityLabel={`Question ${askedCount}, Phase ${phase}`}
        style={{ color: theme.colors.textMuted }}
      >
        Question {askedCount} · Phase {phase}
      </Text>
      <View style={{ marginTop: theme.spacing.sm }}>
        <ProgressBar value={progressPct} label="Placement progress" />
      </View>

      <Text
        variant="title"
        weight="bold"
        accessibilityRole="header"
        style={{ marginTop: theme.spacing.xl }}
      >
        {question.prompt}
      </Text>

      <View
        accessibilityRole="radiogroup"
        accessibilityLabel="Answer choices"
        style={{ marginTop: theme.spacing.lg }}
      >
        {choiceWords.map((w) => {
          const isSelected = selected === w.id;
          return (
            <TouchableOpacity
              key={w.id}
              activeOpacity={0.85}
              onPress={() => setSelected(w.id)}
              accessible
              accessibilityRole="radio"
              accessibilityLabel={`${w.transliteration}, Arabic ${w.script}`}
              accessibilityState={{ selected: isSelected, checked: isSelected }}
              accessibilityHint="Selects this answer"
            >
              <Card
                style={{
                  marginBottom: theme.spacing.md,
                  borderColor: isSelected ? theme.colors.accent : theme.colors.border,
                  borderWidth: isSelected ? 2 : 1,
                }}
              >
                <ArabicText size="lg" accessibilityLabel={w.transliteration} readAs="label">
                  {w.script}
                </ArabicText>
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
          accessibilityHint={selected ? 'Submits your answer and continues' : 'Select an answer to continue'}
        />
      </View>
    </ScreenContainer>
  );
}
