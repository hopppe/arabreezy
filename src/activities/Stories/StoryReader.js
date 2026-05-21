import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer, Text, Card, Button, ActivityHeader } from '../../components/ui';
import { ArabicText } from '../../components/ArabicText';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { useAudio } from '../../hooks/useAudio';
import { getStory } from '../../../backend/localBackend';
import { shuffle } from '../../utils/shuffle';

// Three-step flow: read → comprehension quiz → done.
export default function StoryReader({ route, navigation }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { logActivity } = useUserProgress();
  const { playText, playing } = useAudio();
  const { storyId } = route.params || {};
  const [story, setStory] = useState(null);
  const [step, setStep] = useState('read'); // 'read' | 'quiz' | 'done'
  const [questionIdx, setQuestionIdx] = useState(0);
  const [pickedIdx, setPickedIdx] = useState(null);
  const [score, setScore] = useState(0);
  const [showGloss, setShowGloss] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getStory({ dialect, storyId }).then((res) => {
      if (!cancelled) setStory(res);
    });
    return () => { cancelled = true; };
  }, [dialect, storyId]);

  // anafluent-style nested schema: title:{arabic,english}, content:{arabic,english}, comprehension_questions[]
  const titleAr = story?.title?.arabic ?? story?.title;
  const titleEn = story?.title?.english ?? story?.titleEnglish;
  const paragraphsAr = story?.content?.arabic ?? story?.paragraphs ?? [];
  const paragraphsEn = story?.content?.english ?? story?.englishTranslation ?? [];
  const questions = story?.comprehension_questions ?? story?.comprehensionQuestions ?? [];
  const currentQ = questions[questionIdx];
  const correctIndex = currentQ?.correct_answer ?? currentQ?.correctAnswer;
  const shuffledOptions = useMemo(
    () => (currentQ?.options
      ? shuffle(currentQ.options.map((text, i) => ({ text, originalIndex: i })))
      : []),
    [currentQ],
  );

  if (!story) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text accessibilityLiveRegion="polite">{t('common.loading')}</Text>
      </ScreenContainer>
    );
  }

  if (step === 'read') {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <ActivityHeader title={titleAr} subtitle={titleEn || t('stories.story')} />
        <View accessibilityRole="list" accessibilityLabel="Story paragraphs">
          {paragraphsAr.map((p, i) => {
            const isPlaying = playing === p;
            const paragraphLabel = paragraphsEn[i]
              ? `Paragraph ${i + 1}. ${paragraphsEn[i]}`
              : `Paragraph ${i + 1}`;
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.85}
                onPress={() => playText(p, { dialect })}
                accessible
                accessibilityRole="button"
                accessibilityLabel={paragraphLabel}
                accessibilityHint={isPlaying ? 'Tap to stop the audio' : 'Tap to listen to this paragraph'}
                accessibilityState={{ busy: isPlaying }}
              >
                <Card style={{ marginBottom: theme.spacing.md, padding: theme.spacing.lg }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                      <ArabicText size="lg" accessibilityLabel={paragraphsEn[i] || undefined}>{p}</ArabicText>
                    </View>
                    <Text
                      accessibilityElementsHidden
                      importantForAccessibility="no"
                      style={{ marginLeft: 8, fontSize: 22, color: theme.colors.accent }}
                    >
                      {isPlaying ? '◼︎' : '▶'}
                    </Text>
                  </View>
                  {showGloss && paragraphsEn[i] && (
                    <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 8 }}>
                      {paragraphsEn[i]}
                    </Text>
                  )}
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ flexDirection: 'row', marginTop: theme.spacing.md }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Button
              title={showGloss ? t('stories.hideGloss') : t('stories.showGloss')}
              variant="ghost"
              onPress={() => setShowGloss((v) => !v)}
              accessibilityHint={showGloss ? 'Hides the English translation under each paragraph' : 'Shows the English translation under each paragraph'}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Button
              title={questions.length ? t('stories.checkComprehension') : t('common.done')}
              variant="accent"
              onPress={() => {
                if (questions.length) setStep('quiz');
                else {
                  logActivity({ type: 'story', contentId: story.id, dialect, phase: story.phase });
                  setStep('done');
                }
              }}
              accessibilityHint={questions.length ? 'Starts the comprehension quiz' : 'Marks this story complete'}
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  if (step === 'quiz' && currentQ) {
    const onPick = (i) => {
      if (pickedIdx != null) return;
      setPickedIdx(i);
      if (shuffledOptions[i]?.originalIndex === correctIndex) {
        setScore((s) => s + 1);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      }
    };
    const onNext = () => {
      if (questionIdx + 1 >= questions.length) {
        logActivity({ type: 'story', contentId: story.id, dialect, phase: story.phase });
        setStep('done');
      } else {
        setQuestionIdx((q) => q + 1);
        setPickedIdx(null);
      }
    };
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <ActivityHeader
          title={titleAr}
          current={questionIdx + 1}
          total={questions.length}
          progress={(questionIdx / questions.length) * 100}
        />
        <Text variant="title" weight="bold" accessibilityRole="header">{currentQ.question}</Text>
        <View
          accessibilityRole="radiogroup"
          accessibilityLabel="Answer choices"
          style={{ marginTop: theme.spacing.lg }}
        >
          {shuffledOptions.map((opt, i) => {
            const isCorrect = opt.originalIndex === correctIndex;
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
        {pickedIdx != null && currentQ.explanation && (
          <Text
            variant="small"
            accessibilityLiveRegion="polite"
            style={{ color: theme.colors.textMuted, marginTop: 8 }}
          >
            {currentQ.explanation}
          </Text>
        )}
        {pickedIdx != null && (
          <View style={{ marginTop: theme.spacing.lg }}>
            <Button
              title={t('common.next')}
              variant="accent"
              onPress={onNext}
              accessibilityHint={questionIdx + 1 >= questions.length ? 'Finishes the quiz' : 'Goes to the next question'}
            />
          </View>
        )}
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer onClose={() => navigation.goBack()}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text variant="display" weight="bold" accessibilityRole="header">{t('stories.complete')}</Text>
        {questions.length > 0 && (
          <Text
            variant="body"
            accessibilityLabel={`You scored ${score} out of ${questions.length}`}
            style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}
          >
            {t('stories.score', { score, total: questions.length })}
          </Text>
        )}
        <View style={{ marginTop: theme.spacing.xl }}>
          <Button
            title={t('common.done')}
            variant="accent"
            onPress={() => navigation.goBack()}
            accessibilityHint="Closes the story"
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
