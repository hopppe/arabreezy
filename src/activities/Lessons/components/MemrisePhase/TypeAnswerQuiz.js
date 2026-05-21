// Level 3 quiz — show English meaning, user types the Arabic script.
// Levenshtein-tolerant matching (see arabicMatch.js) so beginners aren't
// punished for orthographic variants their phone keyboard makes awkward
// (hamza forms, ta-marbuta vs. ha, alef-maqsura vs. ya, missing tashkeel).

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Text, Button, Card } from '../../../../components/ui';
import { ArabicText } from '../../../../components/ArabicText';
import { theme } from '../../../../theme';
import FeedbackBanner from './FeedbackBanner';
import { matchArabic } from './arabicMatch';

const WRONG_FEEDBACK_DELAY = 1100;
const CORRECT_ADVANCE_DELAY = 700;

export default function TypeAnswerQuiz({ word, onCorrect, onWrong }) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isAlmost, setIsAlmost] = useState(false);
  const inputRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setAnswer('');
    setSubmitted(false);
    setIsCorrect(null);
    setIsAlmost(false);
    const timer = setTimeout(() => inputRef.current?.focus(), 220);
    return () => clearTimeout(timer);
  }, [word.id]);

  const handleSubmit = () => {
    if (submitted || !answer.trim()) return;
    setSubmitted(true);

    const { match, almost } = matchArabic(answer, word.script);
    if (match) {
      setIsCorrect(true);
      setIsAlmost(almost);
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

  const handleSkip = () => {
    if (submitted) return;
    setSubmitted(true);
    setIsCorrect(false);
    setTimeout(() => {
      if (mountedRef.current) onWrong(word.id);
    }, WRONG_FEEDBACK_DELAY);
  };

  const feedbackMessage = !submitted
    ? null
    : isCorrect
    ? isAlmost
      ? `Almost! It's ${word.script} (${word.transliteration})`
      : 'Correct!'
    : `Answer: ${word.script} (${word.transliteration})`;

  return (
    <View style={styles.outer}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={120}
      >
        <View style={styles.container}>
          <Text variant="caption" style={styles.questionLabel}>
            TYPE IN ARABIC
          </Text>

          <Card style={styles.promptCard}>
            <Text variant="title" weight="bold" accessibilityRole="header" style={styles.englishPrompt}>
              {word.english}
            </Text>
            <Text variant="small" style={styles.translitHint}>
              {word.transliteration}
            </Text>
            {submitted && isCorrect ? (
              <ArabicText size="lg" accessibilityLabel={word.transliteration} style={styles.scriptHint}>
                {word.script}
              </ArabicText>
            ) : null}
          </Card>

          <View
            style={[
              styles.inputWrap,
              submitted && isCorrect ? styles.inputCorrect : null,
              submitted && !isCorrect ? styles.inputWrong : null,
            ]}
          >
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={answer}
              onChangeText={setAnswer}
              placeholder="مثال: مرحبا"
              placeholderTextColor={theme.colors.textFaint}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!submitted}
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
              accessible
              accessibilityLabel="Your Arabic answer"
              accessibilityHint={`Type the Arabic for ${word.english}`}
            />
          </View>

          {!submitted ? (
            <View style={styles.actions}>
              <Button
                title="Check"
                onPress={handleSubmit}
                variant={answer.trim() ? 'primary' : 'ghost'}
                disabled={!answer.trim()}
                accessibilityHint="Checks your answer"
              />
              <TouchableOpacity
                onPress={handleSkip}
                style={styles.skipBtn}
                accessible
                accessibilityRole="button"
                accessibilityLabel="I don't know"
                accessibilityHint="Skips this word and reveals the answer"
              >
                <Text variant="small" style={styles.skipText}>
                  I don't know
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </KeyboardAvoidingView>

      {submitted ? (
        <FeedbackBanner isCorrect={isCorrect} message={feedbackMessage} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1 },
  kav: { flex: 1 },
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
    marginBottom: 20,
  },
  englishPrompt: {
    textAlign: 'center',
  },
  translitHint: {
    marginTop: 6,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  scriptHint: {
    marginTop: 12,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  inputWrap: {
    width: '100%',
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    marginBottom: 16,
  },
  inputCorrect: {
    borderColor: theme.colors.success,
  },
  inputWrong: {
    borderColor: theme.colors.error,
  },
  input: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    writingDirection: 'rtl',
    paddingVertical: 14,
    paddingHorizontal: 18,
    color: theme.colors.text,
  },
  actions: {
    gap: 10,
  },
  skipBtn: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  skipText: {
    color: theme.colors.textMuted,
  },
});
