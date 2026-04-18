import React, { useEffect, useState, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, Button, ProgressBar } from '../../components/ui';
import { ArabicText } from '../../components/ArabicText';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useLessons } from '../../context/LessonContext';
import { useDialect } from '../../context/DialectContext';
import { getLesson } from '../../../backend/localBackend';

const PHASES = ['intro', 'words', 'dialogue', 'check', 'done'];

export default function LessonScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { dialect, bundle } = useDialect();
  const { finishCurrentLesson } = useLessons();
  const lessonId = route.params?.lessonId;

  const [lesson, setLesson] = useState(null);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [checkIdx, setCheckIdx] = useState(0);
  const [checkSel, setCheckSel] = useState(null);
  const [checkResults, setCheckResults] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getLesson({ dialect, lessonId }).then((res) => {
      if (!cancelled) setLesson(res);
    });
    return () => {
      cancelled = true;
    };
  }, [dialect, lessonId]);

  const words = useMemo(
    () => (lesson ? lesson.focalWordIds.map((id) => bundle.words[id]).filter(Boolean) : []),
    [lesson, bundle]
  );

  if (!lesson) {
    return (
      <ScreenContainer>
        <Text>{t('common.loading')}</Text>
      </ScreenContainer>
    );
  }

  const phase = PHASES[phaseIdx];
  const pct = ((phaseIdx + 1) / PHASES.length) * 100;

  const renderIntro = () => (
    <View style={{ flex: 1 }}>
      <Text variant="caption" style={{ color: theme.colors.textMuted }}>{t('lesson.intro')}</Text>
      <Text variant="title" weight="bold" style={{ marginTop: 4 }}>{lesson.title}</Text>
      <Text variant="body" style={{ marginTop: theme.spacing.md, color: theme.colors.textMuted }}>
        {lesson.intro}
      </Text>
      <Text variant="small" style={{ marginTop: theme.spacing.lg, color: theme.colors.textFaint }}>
        {lesson.focalWordIds.length} words · Level {lesson.level}
      </Text>
    </View>
  );

  const renderWords = () => {
    const w = words[wordIdx];
    if (!w) return null;
    return (
      <View style={{ flex: 1 }}>
        <Text variant="caption" style={{ color: theme.colors.textMuted }}>
          {t('lesson.words')} — {wordIdx + 1}/{words.length}
        </Text>
        <Card style={{ marginTop: theme.spacing.md }}>
          <ArabicText size="display">{w.script}</ArabicText>
          <Text variant="subtitle" style={{ marginTop: theme.spacing.sm, color: theme.colors.textMuted }}>
            {w.transliteration}
          </Text>
          <Text variant="body" style={{ marginTop: 4 }}>{w.english}</Text>
          {w.notes && (
            <Text variant="small" style={{ marginTop: theme.spacing.sm, color: theme.colors.textFaint }}>
              {w.notes}
            </Text>
          )}
        </Card>
      </View>
    );
  };

  const renderDialogue = () => {
    const turn = lesson.dialogue[dialogueIdx];
    if (!turn) return null;
    const w = bundle.words[turn.wordRef];
    const isA = turn.speaker === 'a';
    return (
      <View style={{ flex: 1 }}>
        <Text variant="caption" style={{ color: theme.colors.textMuted }}>
          {t('lesson.dialogue')} — {dialogueIdx + 1}/{lesson.dialogue.length}
        </Text>
        <Card
          style={{
            marginTop: theme.spacing.md,
            alignSelf: isA ? 'flex-start' : 'flex-end',
            maxWidth: '85%',
            backgroundColor: isA ? theme.colors.surface : theme.colors.accentSoft,
          }}
        >
          {w && (
            <>
              <ArabicText size="lg">{w.script}</ArabicText>
              <Text variant="small" style={{ marginTop: 4, color: theme.colors.textMuted }}>
                {w.transliteration}
              </Text>
              <Text variant="small" style={{ marginTop: 4 }}>{w.english}</Text>
            </>
          )}
          {turn.note && (
            <Text variant="caption" style={{ marginTop: theme.spacing.sm, color: theme.colors.textFaint }}>
              {turn.note}
            </Text>
          )}
        </Card>
      </View>
    );
  };

  const renderCheck = () => {
    const q = lesson.check[checkIdx];
    if (!q) return null;
    // Build 4 choices: correct + 3 distractors from other focal words
    const distractors = words.filter((w) => w.id !== q.wordId).slice(0, 3);
    const correct = bundle.words[q.wordId];
    const choices = correct
      ? [correct, ...distractors].sort(() => Math.random() - 0.5)
      : distractors;
    const resolved = checkResults[checkIdx];
    return (
      <View style={{ flex: 1 }}>
        <Text variant="caption" style={{ color: theme.colors.textMuted }}>
          {t('lesson.check')} — {checkIdx + 1}/{lesson.check.length}
        </Text>
        <Text variant="title" weight="bold" style={{ marginTop: theme.spacing.sm }}>
          {q.prompt}
        </Text>
        <View style={{ marginTop: theme.spacing.lg }}>
          {choices.map((c) => {
            const isSelected = checkSel === c.id;
            const isCorrect = c.id === q.wordId;
            let borderColor = theme.colors.border;
            if (resolved) {
              if (isCorrect) borderColor = theme.colors.success;
              else if (isSelected) borderColor = theme.colors.error;
            } else if (isSelected) {
              borderColor = theme.colors.accent;
            }
            return (
              <TouchableOpacity
                key={c.id}
                disabled={!!resolved}
                onPress={() => setCheckSel(c.id)}
                activeOpacity={0.85}
              >
                <Card style={{ marginBottom: theme.spacing.sm, borderColor, borderWidth: 2 }}>
                  <ArabicText size="md">{c.script}</ArabicText>
                  <Text variant="small" style={{ marginTop: 4, color: theme.colors.textMuted }}>
                    {c.transliteration}
                  </Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderDone = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text variant="display" weight="bold">{t('lesson.complete')}</Text>
      <Text variant="body" style={{ marginTop: theme.spacing.md, color: theme.colors.textMuted }}>
        You learned {words.length} new words. They're now in your flashcard review queue.
      </Text>
    </View>
  );

  const onNext = async () => {
    if (phase === 'intro') {
      setPhaseIdx(1);
      return;
    }
    if (phase === 'words') {
      if (wordIdx + 1 < words.length) setWordIdx(wordIdx + 1);
      else setPhaseIdx(2);
      return;
    }
    if (phase === 'dialogue') {
      if (dialogueIdx + 1 < lesson.dialogue.length) setDialogueIdx(dialogueIdx + 1);
      else setPhaseIdx(3);
      return;
    }
    if (phase === 'check') {
      const q = lesson.check[checkIdx];
      // Two-tap: first reveal, then advance
      if (checkResults[checkIdx] == null) {
        const correct = checkSel === q.wordId;
        const nextResults = [...checkResults];
        nextResults[checkIdx] = correct;
        setCheckResults(nextResults);
        return;
      }
      if (checkIdx + 1 < lesson.check.length) {
        setCheckIdx(checkIdx + 1);
        setCheckSel(null);
        return;
      }
      setPhaseIdx(4);
      return;
    }
    if (phase === 'done') {
      await finishCurrentLesson();
      navigation.popToTop();
      navigation.navigate('HomeTab');
    }
  };

  const nextDisabled =
    phase === 'check' && checkSel == null && checkResults[checkIdx] == null;

  return (
    <ScreenContainer scroll={false}>
      <View style={{ marginBottom: theme.spacing.md }}>
        <ProgressBar value={pct} />
      </View>

      <View style={{ flex: 1 }}>
        {phase === 'intro' && renderIntro()}
        {phase === 'words' && renderWords()}
        {phase === 'dialogue' && renderDialogue()}
        {phase === 'check' && renderCheck()}
        {phase === 'done' && renderDone()}
      </View>

      <Button
        title={phase === 'done' ? t('lesson.finishBtn') : t('lesson.continueBtn')}
        onPress={onNext}
        variant={phase === 'done' ? 'accent' : 'primary'}
        disabled={nextDisabled}
      />
    </ScreenContainer>
  );
}
