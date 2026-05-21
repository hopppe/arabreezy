// Level 2 quiz — Arabic prompt → pick the correct English meaning (4 options).
// Inverts MultipleChoiceQuiz so the learner trains both recognition directions.

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Card } from '../../../../components/ui';
import { ArabicText } from '../../../../components/ArabicText';
import { theme } from '../../../../theme';
import FeedbackBanner from './FeedbackBanner';

const OPTION_COUNT = 4;
const WRONG_FEEDBACK_DELAY = 900;
const CORRECT_ADVANCE_DELAY = 500;

export default function ReverseChoiceQuiz({ word, allWords, onCorrect, onWrong }) {
  const [selectedId, setSelectedId] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setSelectedId(null);
    setIsCorrect(null);
    setDisabled(false);
  }, [word.id]);

  const options = useMemo(() => {
    const distractors = allWords
      .filter((w) => w.id !== word.id && w.english !== word.english)
      .sort(() => Math.random() - 0.5)
      .slice(0, OPTION_COUNT - 1);
    return [word, ...distractors]
      .sort(() => Math.random() - 0.5)
      .map((w) => ({
        id: w.id,
        english: w.english,
        isCorrect: w.id === word.id,
      }));
  }, [word.id, allWords]);

  const handlePress = (option) => {
    if (disabled) return;
    setDisabled(true);
    setSelectedId(option.id);

    if (option.isCorrect) {
      setIsCorrect(true);
      setTimeout(() => {
        if (mountedRef.current) onCorrect(word.id);
      }, CORRECT_ADVANCE_DELAY);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        if (mountedRef.current) onWrong(word.id);
      }, WRONG_FEEDBACK_DELAY);
    }
  };

  const getOptionStyle = (option) => {
    if (selectedId == null) return styles.optionIdle;
    if (option.id === selectedId && isCorrect) return styles.optionCorrect;
    if (option.id === selectedId && !isCorrect) return styles.optionWrong;
    if (option.isCorrect && !isCorrect) return styles.optionCorrect;
    return styles.optionDim;
  };

  const getTextColor = (option) => {
    if (selectedId == null) return theme.colors.text;
    if (
      (option.id === selectedId && isCorrect) ||
      (option.isCorrect && !isCorrect) ||
      (option.id === selectedId && !isCorrect)
    ) {
      return '#FFFFFF';
    }
    return theme.colors.textMuted;
  };

  const feedbackMessage =
    isCorrect == null
      ? null
      : isCorrect
      ? 'Correct!'
      : `It means "${word.english}"`;

  return (
    <View style={styles.container}>
      <Text variant="caption" style={styles.questionLabel}>
        WHAT DOES THIS MEAN?
      </Text>
      <Card style={styles.promptCard}>
        <ArabicText
          size="xl"
          accessibilityLabel={`Arabic word, pronounced ${word.transliteration}`}
          style={styles.scriptPrompt}
        >
          {word.script}
        </ArabicText>
        <Text variant="small" style={styles.translit}>
          {word.transliteration}
        </Text>
      </Card>

      <View
        accessibilityRole="radiogroup"
        accessibilityLabel="Choose the English meaning"
        style={styles.optionsGrid}
      >
        {options.map((option) => {
          const showResult = selectedId != null;
          const stateLabel = showResult
            ? option.isCorrect && !isCorrect
              ? ', correct answer'
              : option.id === selectedId && isCorrect
                ? ', correct'
                : option.id === selectedId && !isCorrect
                  ? ', incorrect'
                  : ''
            : '';
          return (
            <TouchableOpacity
              key={option.id}
              onPress={() => handlePress(option)}
              disabled={disabled}
              activeOpacity={0.85}
              accessible
              accessibilityRole="radio"
              accessibilityLabel={`${option.english}${stateLabel}`}
              accessibilityState={{ disabled, selected: option.id === selectedId, checked: option.id === selectedId }}
              style={[styles.option, getOptionStyle(option)]}
            >
              <Text weight="bold" style={{ color: getTextColor(option), fontSize: 17 }}>
                {option.english}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FeedbackBanner isCorrect={isCorrect} message={feedbackMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 4,
  },
  questionLabel: {
    color: theme.colors.textFaint,
    letterSpacing: 1.2,
    marginBottom: 10,
    textAlign: 'center',
  },
  promptCard: {
    alignItems: 'center',
    paddingVertical: 28,
    marginBottom: 24,
  },
  scriptPrompt: {
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  translit: {
    marginTop: 8,
    color: theme.colors.textMuted,
  },
  optionsGrid: {
    width: '100%',
    gap: 10,
  },
  option: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
  },
  optionIdle: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
  },
  optionDim: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    opacity: 0.45,
  },
  optionCorrect: {
    backgroundColor: theme.colors.success,
    borderColor: theme.colors.success,
  },
  optionWrong: {
    backgroundColor: theme.colors.error,
    borderColor: theme.colors.error,
  },
});
