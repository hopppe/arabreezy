// LessonStoryScreen — Step 2 of a unit (after Memrise teach).
//
// Calls POST /api/lesson/generate-story with the 8 focal words + phase. The
// response (paragraphs, englishTranslation, wordMappings, comprehensionQuestions)
// is cached on currentUnit.generatedStory so re-entry doesn't regenerate.
//
// Two sub-steps inside the screen: read → quiz. After the quiz the user
// taps Continue → advances unit step to "rotation".

import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, Button } from '../../components/ui';
import { ArabicText } from '../../components/ArabicText';
import { theme } from '../../theme';
import { useUnit } from '../../context/UnitContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { useDialect } from '../../context/DialectContext';
import { postJson } from '../../config/aiBackend';

export default function LessonStoryScreen({ navigation }) {
  const { currentUnit, advanceStep, cacheGeneratedStory } = useUnit();
  const { progress } = useUserProgress();
  const { dialect, bundle } = useDialect();

  const [story, setStory] = useState(currentUnit?.generatedStory || null);
  const [loading, setLoading] = useState(!currentUnit?.generatedStory);
  const [error, setError] = useState(null);
  const [step, setStep] = useState('read'); // 'read' | 'quiz' | 'done'
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [showEnglish, setShowEnglish] = useState(false);

  // Resolve the word objects from the currentUnit's ids so we can pass
  // {script, english, transliteration} to the API.
  const focalWords = useMemo(() => {
    if (!currentUnit?.words || !bundle?.words) return [];
    return currentUnit.words.map((id) => bundle.words[id]).filter(Boolean);
  }, [currentUnit, bundle]);

  // Fetch story once
  useEffect(() => {
    if (story || !focalWords.length) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    postJson('/api/lesson/generate-story', {
      words: focalWords.map((w) => ({
        id: w.id,
        script: w.script,
        english: w.english,
        transliteration: w.transliteration,
      })),
      phase: progress.phase,
      dialect,
    })
      .then((res) => {
        if (cancelled) return;
        setStory(res);
        cacheGeneratedStory(res);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn('[unit-story] generation failed', err?.message);
        setError(err?.message || 'Story generation failed');
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [focalWords, story, progress.phase, dialect, cacheGeneratedStory]);

  if (!currentUnit) {
    return (
      <ScreenContainer>
        <Text accessibilityRole="alert">No active unit.</Text>
      </ScreenContainer>
    );
  }

  if (loading) {
    return (
      <ScreenContainer>
        <View
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel="Writing your story"
          accessibilityState={{ busy: true }}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text variant="title" accessible={false}>Writing your story…</Text>
          <Text variant="small" accessible={false} style={{ color: theme.colors.textMuted, marginTop: 8 }}>
            Using your 8 focal words.
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  if (error || !story) {
    return (
      <ScreenContainer>
        <Text variant="title" weight="bold" accessibilityRole="header">
          Couldn't generate the story
        </Text>
        <Text
          variant="body"
          accessibilityRole="alert"
          style={{ marginTop: theme.spacing.md, color: theme.colors.textMuted }}
        >
          {error || 'No story returned. Skip to the next step.'}
        </Text>
        <View style={{ marginTop: theme.spacing.lg }}>
          <Button
            title="Skip"
            variant="ghost"
            onPress={() => { advanceStep(); navigation.replace('UnitRotation'); }}
            accessibilityHint="Skips the story step and continues to practice"
          />
        </View>
      </ScreenContainer>
    );
  }

  const onContinueFromRead = () => {
    if ((story.comprehensionQuestions || []).length > 0) setStep('quiz');
    else { advanceStep(); navigation.replace('UnitRotation'); }
  };

  const onPickAnswer = (i) => {
    if (picked != null) return;
    setPicked(i);
    const correct = (story.comprehensionQuestions?.[qIdx]?.correctAnswer ?? 0) === i;
    if (correct) setScore((s) => s + 1);
  };

  const onNextQuestion = () => {
    const total = story.comprehensionQuestions?.length || 0;
    if (qIdx + 1 >= total) {
      setStep('done');
    } else {
      setQIdx((i) => i + 1);
      setPicked(null);
    }
  };

  const onFinish = () => {
    advanceStep();
    navigation.replace('UnitRotation');
  };

  // RENDER
  if (step === 'read') {
    return (
      <ScreenContainer>
        <Text variant="display" weight="bold" accessibilityRole="header">Story</Text>
        <ScrollView
          accessibilityRole="list"
          accessibilityLabel="Story paragraphs"
          style={{ flex: 1, marginTop: theme.spacing.md }}
        >
          {story.paragraphs.map((p, i) => (
            <Card
              key={i}
              accessible
              accessibilityLabel={
                showEnglish && story.englishTranslation
                  ? `Paragraph ${i + 1}: ${story.englishTranslation}`
                  : `Paragraph ${i + 1} in Arabic`
              }
              style={{ marginBottom: theme.spacing.md }}
            >
              <ArabicText size="lg">{p}</ArabicText>
              {showEnglish && story.englishTranslation ? (
                <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 8 }}>
                  {story.englishTranslation}
                </Text>
              ) : null}
            </Card>
          ))}
        </ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Button
              title={showEnglish ? 'Hide English' : 'Show English'}
              variant="ghost"
              onPress={() => setShowEnglish((v) => !v)}
              accessibilityHint={showEnglish ? 'Hides the English translation' : 'Shows the English translation'}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Button
              title="Continue"
              variant="accent"
              onPress={onContinueFromRead}
              accessibilityHint="Continues to the comprehension quiz"
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  if (step === 'quiz') {
    const q = story.comprehensionQuestions[qIdx];
    const correctIdx = q?.correctAnswer ?? 0;
    return (
      <ScreenContainer>
        <Text
          variant="caption"
          accessibilityLabel={`Question ${qIdx + 1} of ${story.comprehensionQuestions.length}`}
          style={{ color: theme.colors.textMuted }}
        >
          Question {qIdx + 1} of {story.comprehensionQuestions.length}
        </Text>
        <Text variant="title" weight="bold" accessibilityRole="header" style={{ marginTop: 8 }}>
          {q?.question}
        </Text>
        <View
          accessibilityRole="radiogroup"
          accessibilityLabel="Answer choices"
          style={{ marginTop: theme.spacing.lg }}
        >
          {(q?.options || []).map((opt, i) => {
            const showResult = picked != null;
            const isCorrect = i === correctIdx;
            const isPicked = i === picked;
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
                onPress={() => onPickAnswer(i)}
                disabled={picked != null}
                activeOpacity={0.85}
                accessible
                accessibilityRole="radio"
                accessibilityLabel={`${opt}${stateLabel}`}
                accessibilityState={{ selected: isPicked, checked: isPicked, disabled: picked != null }}
              >
                <Card style={{ marginBottom: 10, borderColor, borderWidth: 1.5 }}>
                  <Text>{opt}</Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
        {picked != null && (
          <View style={{ marginTop: theme.spacing.lg }}>
            <Button
              title="Next"
              variant="accent"
              onPress={onNextQuestion}
              accessibilityHint={qIdx + 1 >= (story.comprehensionQuestions?.length || 0) ? 'Finishes the quiz' : 'Goes to the next question'}
            />
          </View>
        )}
      </ScreenContainer>
    );
  }

  // step === 'done'
  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text variant="display" weight="bold" accessibilityRole="header">Story complete</Text>
        <Text
          variant="body"
          accessibilityLabel={`You scored ${score} out of ${story.comprehensionQuestions.length}`}
          style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}
        >
          You scored {score} of {story.comprehensionQuestions.length}.
        </Text>
        <View style={{ marginTop: theme.spacing.xl }}>
          <Button
            title="Continue"
            variant="accent"
            onPress={onFinish}
            accessibilityHint="Continues to the practice step"
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
