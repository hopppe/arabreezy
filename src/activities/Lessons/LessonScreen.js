// LessonScreen — top-level lesson runner.
//
// Flow: intro → MemrisePhase (introduce + 3-level quizzes) → dialogue → done.
// The Memrise loop subsumes the old "words" + "check" stages: each focal word
// is taught through three escalating quiz types (recognize Arabic → recall
// English → produce transliteration) before the lesson is considered absorbed.
//
// On completion we apply an SRS rating of 3 ("good") to every mastered word so
// they land in the flashcard queue with a realistic interval instead of being
// due immediately.

import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { ScreenContainer, Text, Card, Button, ActivityHeader } from '../../components/ui';
import { ArabicText } from '../../components/ArabicText';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useLessons } from '../../context/LessonContext';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { getLesson, getWords } from '../../../backend/localBackend';
import { applyRating, INITIAL_PROGRESS } from '../Flashcards/scheduler';
import { preloadLessonAssets } from '../../services/preload';
import MemrisePhase from './components/MemrisePhase';

const STAGES = ['intro', 'memrise', 'dialogue', 'done'];

export default function LessonScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { finishCurrentLesson } = useLessons();
  const { progress, updateWordProgress, logActivity } = useUserProgress();
  const lessonId = route.params?.lessonId;

  const [lesson, setLesson] = useState(null);
  const [words, setWords] = useState([]);
  const [stageIdx, setStageIdx] = useState(0);
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [memriseProgress, setMemriseProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getLesson({ dialect, lessonId }).then((res) => {
      if (!cancelled) setLesson(res);
    });
    return () => {
      cancelled = true;
    };
  }, [dialect, lessonId]);

  useEffect(() => {
    let cancelled = false;
    if (!lesson?.focalWordIds?.length) {
      setWords([]);
      return () => {
        cancelled = true;
      };
    }
    getWords({ dialect, wordIds: lesson.focalWordIds }).then((res) => {
      if (cancelled) return;
      const arr = res ?? [];
      setWords(arr);
      // Warm image + audio caches so the Memrise loop renders instantly.
      preloadLessonAssets(arr, { dialect });
    });
    return () => {
      cancelled = true;
    };
  }, [dialect, lesson]);

  const handleMemriseComplete = useCallback(
    (masteredWordIds) => {
      const now = new Date().toISOString();
      masteredWordIds.forEach((wordId) => {
        const prev = progress.wordProgress[wordId];
        // Seed freshly-introduced words as 'learning' due now so they show up
        // in today's flashcard deck. Pre-existing review words are promoted by
        // a 'good' rating instead, preserving their SRS interval.
        const next = prev?.status === 'review' || prev?.status === 'known'
          ? applyRating(prev, 3)
          : { ...INITIAL_PROGRESS, ...(prev || {}), status: 'learning', interval: 0, nextReviewAt: now, reviewsCount: (prev?.reviewsCount ?? 0) + 1 };
        updateWordProgress(wordId, next);
      });
      setStageIdx((idx) => (lesson?.dialogue?.length ? idx + 1 : idx + 2));
    },
    [progress.wordProgress, updateWordProgress, lesson]
  );

  if (!lesson) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text accessibilityLiveRegion="polite">{t('common.loading')}</Text>
      </ScreenContainer>
    );
  }

  const stage = STAGES[stageIdx];
  const pct = ((stageIdx + 1) / STAGES.length) * 100;

  const renderIntro = () => (
    <View style={{ flex: 1 }}>
      <Text variant="caption" style={{ color: theme.colors.textMuted }}>
        {t('lesson.intro')}
      </Text>
      <Text variant="title" weight="bold" accessibilityRole="header" style={{ marginTop: 4 }}>
        {lesson.title}
      </Text>
      <Text
        variant="body"
        style={{ marginTop: theme.spacing.md, color: theme.colors.textMuted }}
      >
        {lesson.intro}
      </Text>
      <Text
        variant="small"
        accessibilityLabel={`${words.length} words at Phase ${lesson.phase}`}
        style={{ marginTop: theme.spacing.lg, color: theme.colors.textFaint }}
      >
        {words.length} words · Phase {lesson.phase}
      </Text>
    </View>
  );

  const renderDialogue = () => {
    const total = lesson.dialogue?.length ?? 0;
    const turn = lesson.dialogue?.[dialogueIdx];
    // Two shapes:
    //   inline    — { script, english, transliteration?, speaker } (Supabase)
    //   reference — { wordRef, speaker } (legacy bundled lessons)
    const refWord = turn?.wordRef ? words.find((wd) => wd.id === turn.wordRef) : null;
    const w = refWord
      ? refWord
      : turn?.script
        ? { script: turn.script, english: turn.english, transliteration: turn.transliteration }
        : null;
    const isA = String(turn?.speaker ?? '').toLowerCase() !== 'b';
    return (
      <View style={{ flex: 1 }}>
        <Text
          variant="caption"
          accessibilityLabel={`Dialogue line ${dialogueIdx + 1} of ${Math.max(total, 1)}`}
          style={{ color: theme.colors.textMuted }}
        >
          {t('lesson.dialogue')} — {dialogueIdx + 1}/{Math.max(total, 1)}
        </Text>
        <Card
          accessible
          accessibilityLabel={
            w
              ? `Speaker ${isA ? 'A' : 'B'} says ${w.english}, pronounced ${w.transliteration || ''}`
              : `Speaker ${isA ? 'A' : 'B'}`
          }
          style={{
            marginTop: theme.spacing.md,
            alignSelf: isA ? 'flex-start' : 'flex-end',
            maxWidth: '85%',
            backgroundColor: isA ? theme.colors.surface : theme.colors.accentSoft,
          }}
        >
          {w ? (
            <>
              <ArabicText size="lg" accessibilityLabel={w.transliteration} readAs="label">
                {w.script}
              </ArabicText>
              <Text
                variant="small"
                style={{ marginTop: 4, color: theme.colors.textMuted }}
              >
                {w.transliteration}
              </Text>
              <Text variant="small" style={{ marginTop: 4 }}>
                {w.english}
              </Text>
            </>
          ) : (
            <Text variant="body" style={{ color: theme.colors.textMuted }}>
              {turn?.wordRef ?? '—'}
            </Text>
          )}
          {turn?.note ? (
            <Text
              variant="caption"
              style={{
                marginTop: theme.spacing.sm,
                color: theme.colors.textFaint,
              }}
            >
              {turn.note}
            </Text>
          ) : null}
        </Card>
      </View>
    );
  };

  const renderDone = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text variant="display" weight="bold" accessibilityRole="header">
        {t('lesson.complete')}
      </Text>
      <Text
        variant="body"
        style={{ marginTop: theme.spacing.md, color: theme.colors.textMuted }}
      >
        You absorbed {words.length} new words through introduction, recognition,
        recall, and production. They're now in your flashcard review queue.
      </Text>
    </View>
  );

  const onNext = async () => {
    if (stage === 'intro') {
      setStageIdx(1);
      return;
    }
    if (stage === 'dialogue') {
      const total = lesson.dialogue?.length ?? 0;
      if (dialogueIdx + 1 < total) {
        setDialogueIdx(dialogueIdx + 1);
      } else {
        setStageIdx(stageIdx + 1);
      }
      return;
    }
    if (stage === 'done') {
      logActivity({
        type: 'lesson',
        contentId: lesson.id,
        dialect,
        phase: lesson.phase,
      });
      await finishCurrentLesson();
      navigation.popToTop();
      navigation.navigate('HomeTab');
    }
  };

  if (stage === 'memrise') {
    return (
      <ScreenContainer scroll={false} onClose={() => navigation.goBack()}>
        <ActivityHeader title={lesson.title} progress={memriseProgress * 100} />
        <View style={{ flex: 1 }}>
          <MemrisePhase
            words={words}
            onProgress={setMemriseProgress}
            onComplete={handleMemriseComplete}
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll={false} onClose={() => navigation.goBack()}>
      <ActivityHeader title={lesson.title} progress={pct} />

      <View style={{ flex: 1 }}>
        {stage === 'intro' && renderIntro()}
        {stage === 'dialogue' && renderDialogue()}
        {stage === 'done' && renderDone()}
      </View>

      <Button
        title={stage === 'done' ? t('lesson.finishBtn') : t('lesson.continueBtn')}
        onPress={onNext}
        variant={stage === 'done' ? 'accent' : 'primary'}
        accessibilityHint={stage === 'done' ? 'Finishes the lesson and returns home' : 'Continues to the next part of the lesson'}
      />
    </ScreenContainer>
  );
}
