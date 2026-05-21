import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer, Text, Card, Button, ActivityHeader, FocalWordsBanner } from '../../components/ui';
import { ArabicText } from '../../components/ArabicText';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { useAudio } from '../../hooks/useAudio';
import { getListeningExercises, getListeningExercise } from '../../../backend/localBackend';
import { shuffle } from '../../utils/shuffle';

// Two-mode screen:
//   - When no listeningId is passed via route, show a list of exercises for
//     the user's phase.
//   - When listeningId is passed, show the player + comprehension quiz.
export default function ListeningScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { progress, logActivity } = useUserProgress();
  const phase = route?.params?.phase ?? progress.phase;
  const listeningId = route?.params?.listeningId;
  const focalWords = route?.params?.focalWords;

  if (listeningId) {
    return <ListeningPlayer
      navigation={navigation}
      dialect={dialect}
      listeningId={listeningId}
      onComplete={(exercise) => logActivity({ type: 'listening', contentId: exercise.id, dialect, phase: exercise.phase })}
    />;
  }
  return <ListeningList navigation={navigation} dialect={dialect} phase={phase} focalWords={focalWords} />;
}

function ListeningList({ navigation, dialect, phase, focalWords }) {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getListeningExercises({ dialect, phase }).then((res) => {
      if (!cancelled) {
        setItems(res);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [dialect, phase]);

  if (loading) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text accessibilityLiveRegion="polite">{t('common.loading')}</Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer onClose={() => navigation.goBack()}>
      <ActivityHeader title={t('listening.title')} subtitle={t('listening.subtitle')} />
      <FocalWordsBanner words={focalWords} />
      <View accessibilityRole="list" accessibilityLabel={t('listening.title')}>
        {items.length === 0 ? (
          <Text variant="body" style={{ color: theme.colors.textMuted }}>{t('listening.empty')}</Text>
        ) : items.map((it) => (
          <TouchableOpacity
            key={it.id}
            activeOpacity={0.85}
            onPress={() => navigation.push('Listening', { listeningId: it.id })}
            accessible
            accessibilityRole="button"
            accessibilityLabel={it.titleEnglish ? `${it.titleEnglish}. ${it.title}` : it.title}
            accessibilityHint="Opens this listening exercise"
          >
            <Card style={{ marginBottom: theme.spacing.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={{ fontSize: 28, marginRight: 12 }}
                  accessibilityElementsHidden
                  importantForAccessibility="no"
                >
                  {it.icon || '🎧'}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text weight="bold" variant="subtitle">{it.title}</Text>
                  {it.titleEnglish && (
                    <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
                      {it.titleEnglish}
                    </Text>
                  )}
                </View>
                <Text
                  weight="bold"
                  accessibilityElementsHidden
                  importantForAccessibility="no"
                  style={{ color: theme.colors.accent, fontSize: 20 }}
                >
                  →
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenContainer>
  );
}

function ListeningPlayer({ navigation, dialect, listeningId, onComplete }) {
  const { t } = useTranslation();
  const { playText, playing } = useAudio();
  const [item, setItem] = useState(null);
  const [step, setStep] = useState('listen'); // 'listen' | 'quiz' | 'done'
  const [qIdx, setQIdx] = useState(0);
  const [pickedIdx, setPickedIdx] = useState(null);
  const [score, setScore] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getListeningExercise({ dialect, listeningId }).then((res) => {
      if (!cancelled) setItem(res);
    });
    return () => { cancelled = true; };
  }, [dialect, listeningId]);

  // Auto-play full exercise text when it loads.
  useEffect(() => {
    if (item?.paragraphs?.length) {
      const full = item.paragraphs.join(' ');
      playText(full, { dialect });
    }
  }, [item, dialect, playText]);

  const playFull = () => {
    if (!item) return;
    const full = item.paragraphs.join(' ');
    playText(full, { dialect });
  };

  const questions = item ? (item.mainIdeaQuestions?.length ? item.mainIdeaQuestions : item.comprehensionQuestions) : null;
  const currentQ = questions?.[qIdx];
  const shuffledOptions = useMemo(
    () => (currentQ?.options
      ? shuffle(currentQ.options.map((text, i) => ({ text, originalIndex: i })))
      : []),
    [currentQ],
  );

  if (!item) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text accessibilityLiveRegion="polite">{t('common.loading')}</Text>
      </ScreenContainer>
    );
  }

  if (step === 'listen') {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <ActivityHeader title={item.title} subtitle={t('listening.title')} />
        <Card style={{ padding: theme.spacing.lg, backgroundColor: theme.colors.accentSoft }}>
          <Text
            variant="small"
            accessibilityLiveRegion="polite"
            style={{ color: theme.colors.textMuted }}
          >
            {playing ? '▶ playing…' : t('listening.tapToPlay')}
          </Text>
          <View style={{ marginTop: theme.spacing.md }}>
            <Button
              title={t('common.replay')}
              variant="ghost"
              onPress={playFull}
              accessibilityLabel="Replay audio"
              accessibilityHint="Plays the full listening exercise from the start"
            />
          </View>
        </Card>

        {showText && (
          <View
            accessibilityRole="list"
            accessibilityLabel="Transcript"
            style={{ marginTop: theme.spacing.lg }}
          >
            {item.paragraphs.map((p, i) => (
              <TouchableOpacity
                key={i}
                activeOpacity={0.85}
                onPress={() => playText(p, { dialect })}
                accessible
                accessibilityRole="button"
                accessibilityLabel={`Paragraph ${i + 1}`}
                accessibilityHint="Plays just this paragraph"
              >
                <Card style={{ marginBottom: 8 }}>
                  <ArabicText>{p}</ArabicText>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ flexDirection: 'row', marginTop: theme.spacing.md }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Button
              title={showText ? t('listening.hideText') : t('listening.showText')}
              variant="ghost"
              onPress={() => setShowText((v) => !v)}
              accessibilityHint={showText ? 'Hides the transcript' : 'Shows the transcript'}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Button
              title={questions?.length ? t('listening.checkComprehension') : t('common.done')}
              variant="accent"
              onPress={() => {
                if (questions?.length) setStep('quiz');
                else {
                  onComplete?.(item);
                  setStep('done');
                }
              }}
              accessibilityHint={questions?.length ? 'Starts the comprehension quiz' : 'Marks this exercise complete'}
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
      if (shuffledOptions[i]?.originalIndex === currentQ.correctAnswer) {
        setScore((s) => s + 1);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
      }
    };
    const onNext = () => {
      if (qIdx + 1 >= questions.length) {
        onComplete?.(item);
        setStep('done');
      } else {
        setQIdx((q) => q + 1);
        setPickedIdx(null);
      }
    };
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <ActivityHeader
          title={item.title}
          current={qIdx + 1}
          total={questions.length}
          progress={(qIdx / questions.length) * 100}
        />
        <Text variant="title" weight="bold" accessibilityRole="header">{currentQ.question}</Text>
        <View
          accessibilityRole="radiogroup"
          accessibilityLabel="Answer choices"
          style={{ marginTop: theme.spacing.lg }}
        >
          {shuffledOptions.map((opt, i) => {
            const isCorrect = opt.originalIndex === currentQ.correctAnswer;
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
              accessibilityHint={qIdx + 1 >= questions.length ? 'Finishes the quiz' : 'Goes to the next question'}
            />
          </View>
        )}
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer onClose={() => navigation.goBack()}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text variant="display" weight="bold" accessibilityRole="header">{t('listening.complete')}</Text>
        {questions?.length > 0 && (
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
            accessibilityHint="Closes the listening exercise"
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
