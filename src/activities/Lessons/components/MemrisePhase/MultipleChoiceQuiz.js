// Level 1 quiz — English prompt → pick the correct Arabic script (4 options).

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Card } from '../../../../components/ui';
import { ArabicText } from '../../../../components/ArabicText';
import { theme } from '../../../../theme';
import FeedbackBanner from './FeedbackBanner';

const OPTION_COUNT = 4;
const WRONG_FEEDBACK_DELAY = 900;
const CORRECT_ADVANCE_DELAY = 500;

export default function MultipleChoiceQuiz({ word, allWords, onCorrect, onWrong }) {
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
      .filter((w) => w.id !== word.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, OPTION_COUNT - 1);
    return [word, ...distractors]
      .sort(() => Math.random() - 0.5)
      .map((w) => ({
        id: w.id,
        script: w.script,
        transliteration: w.transliteration,
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
      : `It's "${word.script}"`;

  return (
    <View style={styles.container}>
      <Text variant="caption" style={styles.questionLabel}>
        TAP THE ARABIC FOR
      </Text>
      <Card style={styles.promptCard}>
        <Text variant="title" weight="bold" accessibilityRole="header" style={styles.englishPrompt}>
          {word.english}
        </Text>
      </Card>

      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={`Pick the Arabic for ${word.english}`}
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
              accessibilityLabel={`${option.transliteration}${stateLabel}`}
              accessibilityState={{ disabled, selected: option.id === selectedId, checked: option.id === selectedId }}
              style={[styles.option, getOptionStyle(option)]}
            >
              <ArabicText
                size="lg"
                accessibilityLabel={option.transliteration}
                readAs="label"
                style={{
                  color: getTextColor(option),
                  textAlign: 'center',
                  writingDirection: 'rtl',
                }}
              >
                {option.script}
              </ArabicText>
              <Text
                variant="small"
                style={{ color: getTextColor(option), marginTop: 4, opacity: 0.8 }}
              >
                {option.transliteration}
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
  englishPrompt: {
    textAlign: 'center',
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
