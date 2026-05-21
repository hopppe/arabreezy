// MemrisePhase — orchestrates introduce-pair → quiz-pair → review-quiz → done.
// Hands off mastered word ids on completion so the parent screen can update SRS.

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../../../../components/ui';
import { theme } from '../../../../theme';
import { useMemriseState, PHASE, QUIZ_TYPE } from './useMemriseState';
import WordIntroCard from './WordIntroCard';
import MultipleChoiceQuiz from './MultipleChoiceQuiz';
import ReverseChoiceQuiz from './ReverseChoiceQuiz';
import TypeAnswerQuiz from './TypeAnswerQuiz';

export default function MemrisePhase({ words, onProgress, onComplete }) {
  const {
    state,
    currentIntroWord,
    currentQuizWord,
    currentQuizType,
    progress,
    masteredWordIds,
    isComplete,
    needsAdvance,
    advanceIntro,
    answerAndAdvance,
    advancePair,
  } = useMemriseState(words);

  const completedRef = useRef(false);
  useEffect(() => {
    if (isComplete && !completedRef.current) {
      completedRef.current = true;
      onComplete(masteredWordIds);
    }
  }, [isComplete, masteredWordIds, onComplete]);

  useEffect(() => {
    if (needsAdvance) advancePair();
  }, [needsAdvance, advancePair]);

  useEffect(() => {
    if (onProgress) onProgress(progress);
  }, [progress, onProgress]);

  const handleCorrect = (wordId) => answerAndAdvance(wordId, true);
  const handleWrong = (wordId) => answerAndAdvance(wordId, false);

  const pairProgress = (() => {
    const introduced =
      state.introducedWords.length +
      (state.phase === PHASE.PAIR_INTRO ? 1 : 0);
    return `Word ${Math.min(introduced, words.length)} of ${words.length}`;
  })();

  const phaseLabel =
    state.phase === PHASE.PAIR_INTRO
      ? 'Learn'
      : state.phase === PHASE.REVIEW_QUIZ
      ? 'Final review'
      : state.phase === PHASE.PAIR_QUIZ
      ? 'Quiz'
      : '';

  const phaseIcon =
    state.phase === PHASE.PAIR_INTRO ? 'book-outline' : 'pencil-outline';

  const renderContent = () => {
    if (state.phase === PHASE.PAIR_INTRO && currentIntroWord) {
      return (
        <WordIntroCard
          key={`intro-${currentIntroWord.id}`}
          word={currentIntroWord}
          pairProgress={pairProgress}
          onContinue={advanceIntro}
        />
      );
    }

    if (
      (state.phase === PHASE.PAIR_QUIZ || state.phase === PHASE.REVIEW_QUIZ) &&
      currentQuizWord
    ) {
      const key = `quiz-${currentQuizWord.id}-${currentQuizType}-${state.quizRound}-${state.currentQuizIndex}`;
      switch (currentQuizType) {
        case QUIZ_TYPE.MULTIPLE_CHOICE:
          return (
            <MultipleChoiceQuiz
              key={key}
              word={currentQuizWord}
              allWords={words}
              onCorrect={handleCorrect}
              onWrong={handleWrong}
            />
          );
        case QUIZ_TYPE.REVERSE_CHOICE:
          return (
            <ReverseChoiceQuiz
              key={key}
              word={currentQuizWord}
              allWords={words}
              onCorrect={handleCorrect}
              onWrong={handleWrong}
            />
          );
        case QUIZ_TYPE.TYPE_ANSWER:
          return (
            <TypeAnswerQuiz
              key={key}
              word={currentQuizWord}
              onCorrect={handleCorrect}
              onWrong={handleWrong}
            />
          );
        default:
          return null;
      }
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {phaseLabel ? (
        <View style={styles.badgeRow}>
          <View
            accessible
            accessibilityLabel={`${phaseLabel}. ${pairProgress}`}
            style={styles.badge}
          >
            <Ionicons
              name={phaseIcon}
              size={14}
              color={theme.colors.accent}
              accessibilityElementsHidden
              importantForAccessibility="no"
            />
            <Text variant="small" weight="bold" accessible={false} style={styles.badgeText}>
              {phaseLabel}
            </Text>
          </View>
        </View>
      ) : null}
      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  badgeRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: theme.colors.accentSoft,
  },
  badgeText: {
    color: theme.colors.accent,
    letterSpacing: 0.3,
  },
  content: {
    flex: 1,
  },
});
