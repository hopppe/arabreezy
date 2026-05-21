// Memrise-style learning state machine — adapted from the English source app.
// Flow: introduce pair of 2 words → quiz them (escalating types) → next pair →
// repeat → final review quiz on anything still unmastered → complete.
//
// Each word has three "levels" it must clear before it's mastered:
//   Level 1 — multiple choice (English prompt → pick Arabic script)
//   Level 2 — reverse choice  (Arabic prompt → pick English)
//   Level 3 — type answer     (English prompt → type the transliteration)
//
// A wrong answer doesn't advance the word's level and re-queues it in the
// current quiz round.

import { useReducer, useCallback } from 'react';

export const WORD_LEVEL = {
  NOT_SEEN: 0,
  INTRODUCED: 1,
  LEVEL_1_PASSED: 2,
  LEVEL_2_PASSED: 3,
  MASTERED: 4,
};

export const PHASE = {
  PAIR_INTRO: 'pair_intro',
  PAIR_QUIZ: 'pair_quiz',
  ADVANCE_PAIR: 'advance_pair',
  REVIEW_QUIZ: 'review_quiz',
  COMPLETE: 'complete',
};

export const QUIZ_TYPE = {
  MULTIPLE_CHOICE: 'multiple_choice',
  REVERSE_CHOICE: 'reverse_choice',
  TYPE_ANSWER: 'type_answer',
};

const PAIR_SIZE = 2;

const ACTIONS = {
  NEXT_INTRO_WORD: 'NEXT_INTRO_WORD',
  ANSWER_AND_ADVANCE: 'ANSWER_AND_ADVANCE',
  ADVANCE_PAIR: 'ADVANCE_PAIR',
};

const createInitialState = (words) => {
  const wordLevels = {};
  words.forEach((w) => {
    wordLevels[w.id] = WORD_LEVEL.NOT_SEEN;
  });

  const pairs = [];
  for (let i = 0; i < words.length; i += PAIR_SIZE) {
    pairs.push(words.slice(i, i + PAIR_SIZE));
  }

  return {
    words,
    wordLevels,
    pairs,
    currentPairIndex: 0,
    currentWordInPair: 0,
    phase: PHASE.PAIR_INTRO,
    quizQueue: [],
    currentQuizIndex: 0,
    quizResults: {},
    introducedWords: [],
    correctCount: 0,
    wrongCount: 0,
    quizRound: 0,
  };
};

const getQuizTypeForLevel = (level) => {
  switch (level) {
    case WORD_LEVEL.NOT_SEEN:
    case WORD_LEVEL.INTRODUCED:
      return QUIZ_TYPE.MULTIPLE_CHOICE;
    case WORD_LEVEL.LEVEL_1_PASSED:
      return QUIZ_TYPE.REVERSE_CHOICE;
    case WORD_LEVEL.LEVEL_2_PASSED:
      return QUIZ_TYPE.TYPE_ANSWER;
    default:
      return QUIZ_TYPE.MULTIPLE_CHOICE;
  }
};

const buildQuizQueue = (introducedWords, wordLevels) => {
  const quizzable = introducedWords.filter(
    (w) => wordLevels[w.id] < WORD_LEVEL.MASTERED
  );
  return [...quizzable].sort(() => Math.random() - 0.5);
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.NEXT_INTRO_WORD: {
      const currentPair = state.pairs[state.currentPairIndex];
      if (!currentPair) return { ...state, phase: PHASE.COMPLETE };

      const currentWord = currentPair[state.currentWordInPair];
      const nextWordInPair = state.currentWordInPair + 1;

      const updatedLevels = {
        ...state.wordLevels,
        [currentWord.id]: WORD_LEVEL.INTRODUCED,
      };

      const updatedIntroduced = state.introducedWords.includes(currentWord)
        ? state.introducedWords
        : [...state.introducedWords, currentWord];

      if (nextWordInPair < currentPair.length) {
        return {
          ...state,
          wordLevels: updatedLevels,
          currentWordInPair: nextWordInPair,
          introducedWords: updatedIntroduced,
        };
      }

      const quizQueue = buildQuizQueue(updatedIntroduced, updatedLevels);
      return {
        ...state,
        wordLevels: updatedLevels,
        introducedWords: updatedIntroduced,
        phase: PHASE.PAIR_QUIZ,
        quizQueue,
        currentQuizIndex: 0,
        quizResults: {},
        quizRound: state.quizRound + 1,
      };
    }

    case ACTIONS.ANSWER_AND_ADVANCE: {
      const { wordId, correct } = action.payload;
      const curLevel = state.wordLevels[wordId];
      const newLevel = correct
        ? Math.min(curLevel + 1, WORD_LEVEL.MASTERED)
        : curLevel;

      const updatedLevels = { ...state.wordLevels, [wordId]: newLevel };
      const updatedResults = {
        ...state.quizResults,
        [wordId]: correct ? 'correct' : 'wrong',
      };
      const correctCount = state.correctCount + (correct ? 1 : 0);
      const wrongCount = state.wrongCount + (correct ? 0 : 1);
      const nextIndex = state.currentQuizIndex + 1;

      if (nextIndex < state.quizQueue.length) {
        return {
          ...state,
          wordLevels: updatedLevels,
          quizResults: updatedResults,
          correctCount,
          wrongCount,
          currentQuizIndex: nextIndex,
        };
      }

      // Round complete — re-queue any wrong answers
      const wrongs = state.quizQueue.filter(
        (w) => updatedResults[w.id] === 'wrong'
      );
      if (wrongs.length > 0) {
        return {
          ...state,
          wordLevels: updatedLevels,
          quizResults: {},
          correctCount,
          wrongCount,
          quizQueue: [...wrongs].sort(() => Math.random() - 0.5),
          currentQuizIndex: 0,
          quizRound: state.quizRound + 1,
        };
      }

      return {
        ...state,
        wordLevels: updatedLevels,
        quizResults: updatedResults,
        correctCount,
        wrongCount,
        phase: PHASE.ADVANCE_PAIR,
      };
    }

    case ACTIONS.ADVANCE_PAIR: {
      const nextPairIndex = state.currentPairIndex + 1;
      if (nextPairIndex < state.pairs.length) {
        return {
          ...state,
          currentPairIndex: nextPairIndex,
          currentWordInPair: 0,
          phase: PHASE.PAIR_INTRO,
        };
      }

      const unmastered = state.introducedWords.filter(
        (w) => state.wordLevels[w.id] < WORD_LEVEL.MASTERED
      );
      if (unmastered.length > 0) {
        return {
          ...state,
          phase: PHASE.REVIEW_QUIZ,
          quizQueue: [...unmastered].sort(() => Math.random() - 0.5),
          currentQuizIndex: 0,
          quizResults: {},
          quizRound: state.quizRound + 1,
        };
      }
      return { ...state, phase: PHASE.COMPLETE };
    }

    default:
      return state;
  }
};

export const useMemriseState = (words) => {
  const [state, dispatch] = useReducer(reducer, words, createInitialState);

  const advanceIntro = useCallback(() => {
    dispatch({ type: ACTIONS.NEXT_INTRO_WORD });
  }, []);

  const answerAndAdvance = useCallback((wordId, correct) => {
    dispatch({ type: ACTIONS.ANSWER_AND_ADVANCE, payload: { wordId, correct } });
  }, []);

  const advancePair = useCallback(() => {
    dispatch({ type: ACTIONS.ADVANCE_PAIR });
  }, []);

  const currentIntroWord =
    state.phase === PHASE.PAIR_INTRO
      ? state.pairs[state.currentPairIndex]?.[state.currentWordInPair]
      : null;

  const currentQuizWord =
    state.phase === PHASE.PAIR_QUIZ || state.phase === PHASE.REVIEW_QUIZ
      ? state.quizQueue[state.currentQuizIndex]
      : null;

  const currentQuizType = currentQuizWord
    ? getQuizTypeForLevel(state.wordLevels[currentQuizWord.id])
    : null;

  // Progress: total mastery points / max possible
  const wordCount = state.words.length;
  const earned = Object.values(state.wordLevels).reduce((s, l) => s + l, 0);
  const total = wordCount * WORD_LEVEL.MASTERED;
  const progress = total > 0 ? earned / total : 0;

  const masteredWordIds = state.introducedWords
    .filter((w) => state.wordLevels[w.id] === WORD_LEVEL.MASTERED)
    .map((w) => w.id);

  return {
    state,
    currentIntroWord,
    currentQuizWord,
    currentQuizType,
    progress,
    masteredWordIds,
    isComplete: state.phase === PHASE.COMPLETE,
    needsAdvance: state.phase === PHASE.ADVANCE_PAIR,
    advanceIntro,
    answerAndAdvance,
    advancePair,
  };
};
