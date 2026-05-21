import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, Button, ActivityHeader } from '../components/ui';
import { ArabicText } from '../components/ArabicText';
import { theme } from '../theme';
import { useTranslation } from '../context/LanguageContext';
import { useDialect } from '../context/DialectContext';
import { useUserProgress } from '../context/UserProgressContext';
import { getPrimer } from '../../backend/localBackend';
import { getPattern } from '../data/patterns';

// Renders the 3-lesson root-system primer in a single session.
// Completion is tracked as lessonId 'primer:root-system'.
//
// Each lesson follows: intro → words → check → done. The primer's structure
// is slightly richer than a normal lesson (it has a `highlight` block with
// root letters or pattern template), so we render it inline here instead of
// reusing LessonScreen.
const STEPS = ['intro', 'words', 'check', 'done'];

export default function PrimerScreen({ navigation }) {
  const { t } = useTranslation();
  const { dialect, bundle } = useDialect();
  const { completeLesson } = useUserProgress();

  const [primer, setPrimer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lessonIdx, setLessonIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [checkSel, setCheckSel] = useState(null);
  const [checkResolved, setCheckResolved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getPrimer({ dialect }).then((res) => {
      if (!cancelled) {
        setPrimer(res);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [dialect]);

  const lesson = primer[lessonIdx];
  const step = STEPS[stepIdx];
  const totalLessons = primer.length;

  const focalWords = useMemo(() => {
    if (!lesson) return [];
    return lesson.focalWordIds.map((id) => bundle.words[id]).filter(Boolean);
  }, [lesson, bundle]);

  if (loading) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text accessibilityLiveRegion="polite">{t('common.loading')}</Text>
      </ScreenContainer>
    );
  }

  if (!primer.length) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text variant="body" style={{ color: theme.colors.textMuted }}>
          No primer content for this dialect yet.
        </Text>
      </ScreenContainer>
    );
  }

  if (!lesson) {
    // Primer fully complete
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text variant="display" weight="bold" accessibilityRole="header">{t('primer.complete')}</Text>
          <Text variant="body" style={{ marginTop: theme.spacing.md, color: theme.colors.textMuted }}>
            {t('primer.completeBody')}
          </Text>
          <View style={{ marginTop: theme.spacing.xl }}>
            <Button
              title={t('common.done')}
              variant="accent"
              onPress={() => navigation.goBack()}
              accessibilityHint="Closes the primer"
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  const overallPct = ((lessonIdx * STEPS.length + stepIdx) / (totalLessons * STEPS.length)) * 100;

  // ---------- Render helpers ----------

  const renderHighlight = () => {
    if (!lesson.highlight) return null;
    if (lesson.highlight.letters) {
      return (
        <Card style={{ backgroundColor: theme.colors.accentSoft, marginTop: theme.spacing.md }}>
          <Text variant="caption" accessibilityRole="header" style={{ color: theme.colors.textMuted }}>The root</Text>
          <View
            accessible
            accessibilityLabel={`Root letters: ${lesson.highlight.letters.join(', ')}`}
            style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'center' }}
          >
            {lesson.highlight.letters.map((letter, i) => (
              <View
                key={i}
                importantForAccessibility="no"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: theme.radius.md,
                  backgroundColor: theme.colors.white,
                  marginHorizontal: 6,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1.5,
                  borderColor: theme.colors.accent,
                }}
              >
                <ArabicText size="lg">{letter}</ArabicText>
              </View>
            ))}
          </View>
        </Card>
      );
    }
    if (lesson.highlight.patternRef) {
      const p = getPattern(lesson.highlight.patternRef);
      if (!p) return null;
      return (
        <Card style={{ backgroundColor: theme.colors.accentSoft, marginTop: theme.spacing.md }}>
          <Text variant="caption" accessibilityRole="header" style={{ color: theme.colors.textMuted }}>The pattern</Text>
          <ArabicText size="lg" accessibilityLabel={p.gloss} style={{ marginTop: 6 }}>{p.template}</ArabicText>
          <Text variant="small" style={{ marginTop: 6, color: theme.colors.textMuted }}>
            {p.gloss}
          </Text>
        </Card>
      );
    }
    return null;
  };

  const renderIntro = () => (
    <View style={{ flex: 1 }}>
      <Text variant="caption" style={{ color: theme.colors.textMuted }}>
        {t('primer.lessonOf', { n: lessonIdx + 1, total: totalLessons })}
      </Text>
      <Text variant="title" weight="bold" accessibilityRole="header" style={{ marginTop: 4 }}>{lesson.title}</Text>
      <Text variant="body" style={{ marginTop: theme.spacing.md, color: theme.colors.textMuted }}>
        {lesson.intro}
      </Text>
      {renderHighlight()}
    </View>
  );

  const renderWords = () => {
    const w = focalWords[wordIdx];
    if (!w) return null;
    const turn = lesson.dialogue?.[wordIdx];
    return (
      <View style={{ flex: 1 }}>
        <Text
          variant="caption"
          accessibilityLabel={`Word ${wordIdx + 1} of ${focalWords.length}`}
          style={{ color: theme.colors.textMuted }}
        >
          Word {wordIdx + 1} of {focalWords.length}
        </Text>
        <Card style={{ marginTop: theme.spacing.md }}>
          <ArabicText size="display" accessibilityLabel={`${w.english}, pronounced ${w.transliteration}`}>
            {w.script}
          </ArabicText>
          <Text variant="subtitle" style={{ marginTop: theme.spacing.sm, color: theme.colors.textMuted }}>
            {w.transliteration}
          </Text>
          <Text variant="body" style={{ marginTop: 4 }}>{w.english}</Text>
          {w.semanticDrift === 'some' || w.semanticDrift === 'large' ? (
            <View style={{ marginTop: theme.spacing.sm, padding: 8, borderRadius: theme.radius.sm, backgroundColor: theme.colors.surfaceMuted }}>
              <Text variant="caption" weight="bold" style={{ color: theme.colors.warning }}>
                {t('primer.driftBadge')}
              </Text>
              {w.driftNote && (
                <Text variant="small" style={{ marginTop: 2, color: theme.colors.textMuted }}>
                  {w.driftNote}
                </Text>
              )}
            </View>
          ) : null}
          {turn?.note && (
            <Text variant="small" style={{ marginTop: theme.spacing.sm, color: theme.colors.textFaint }}>
              {turn.note}
            </Text>
          )}
        </Card>
      </View>
    );
  };

  const renderCheck = () => {
    const q = lesson.check?.[0];
    if (!q) return null;

    // Root-letters variant: user picks 3 letters from a grid containing the
    // expected root letters plus a few distractors.
    if (q.answerType === 'root-letters') {
      const distractors = ['م', 'ر', 'ل', 'ف'];
      const pool = Array.from(new Set([...(q.expected || []), ...distractors])).slice(0, 6);
      const allCorrect =
        Array.isArray(checkSel) &&
        q.expected.every((l) => checkSel.includes(l)) &&
        checkSel.length === q.expected.length;
      return (
        <View style={{ flex: 1 }}>
          <Text variant="title" weight="bold" accessibilityRole="header">{q.prompt}</Text>
          <View
            accessibilityRole="radiogroup"
            accessibilityLabel="Choose the root letters"
            style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: theme.spacing.md, justifyContent: 'center' }}
          >
            {pool.map((letter) => {
              const selected = Array.isArray(checkSel) && checkSel.includes(letter);
              return (
                <TouchableOpacity
                  key={letter}
                  disabled={checkResolved}
                  activeOpacity={0.85}
                  onPress={() => {
                    const current = Array.isArray(checkSel) ? checkSel : [];
                    const next = selected
                      ? current.filter((l) => l !== letter)
                      : [...current, letter].slice(0, q.expected.length);
                    setCheckSel(next);
                  }}
                  accessible
                  accessibilityRole="checkbox"
                  accessibilityLabel={`Letter ${letter}`}
                  accessibilityState={{ checked: selected, disabled: checkResolved }}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: theme.radius.md,
                    margin: 6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: selected ? theme.colors.accent : theme.colors.white,
                    borderWidth: 1.5,
                    borderColor: selected ? theme.colors.accent : theme.colors.border,
                  }}
                >
                  <ArabicText size="lg" style={{ color: selected ? theme.colors.white : theme.colors.text }}>
                    {letter}
                  </ArabicText>
                </TouchableOpacity>
              );
            })}
          </View>
          {checkResolved && (
            <Text
              variant="small"
              accessibilityLiveRegion="polite"
              accessibilityRole={allCorrect ? undefined : 'alert'}
              style={{
                marginTop: theme.spacing.md,
                color: allCorrect ? theme.colors.success : theme.colors.error,
                textAlign: 'center',
              }}
            >
              {allCorrect ? '✓ Right.' : t('primer.rootWrong')}
            </Text>
          )}
        </View>
      );
    }

    // Multiple-choice variant: show correct word + 3 sibling distractors
    const correct = bundle.words[q.wordId];
    const siblingIds = lesson.focalWordIds.filter((id) => id !== q.wordId);
    const distractorWords = siblingIds.map((id) => bundle.words[id]).filter(Boolean).slice(0, 3);
    const choices = correct
      ? [correct, ...distractorWords].sort((a, b) => a.id.localeCompare(b.id))
      : distractorWords;
    const isCorrect = checkSel === q.wordId;
    return (
      <View style={{ flex: 1 }}>
        <Text variant="title" weight="bold" accessibilityRole="header">{q.prompt}</Text>
        {q.hint && (
          <Text variant="small" style={{ marginTop: 4, color: theme.colors.textMuted }}>
            {q.hint}
          </Text>
        )}
        <View
          accessibilityRole="radiogroup"
          accessibilityLabel="Answer choices"
          style={{ marginTop: theme.spacing.lg }}
        >
          {choices.map((c) => {
            const selected = checkSel === c.id;
            let borderColor = theme.colors.border;
            if (checkResolved) {
              if (c.id === q.wordId) borderColor = theme.colors.success;
              else if (selected) borderColor = theme.colors.error;
            } else if (selected) {
              borderColor = theme.colors.accent;
            }
            return (
              <TouchableOpacity
                key={c.id}
                disabled={checkResolved}
                activeOpacity={0.85}
                onPress={() => setCheckSel(c.id)}
                accessible
                accessibilityRole="radio"
                accessibilityLabel={`${c.english}, pronounced ${c.transliteration}`}
                accessibilityState={{ selected, checked: selected, disabled: checkResolved }}
              >
                <Card style={{ marginBottom: theme.spacing.sm, borderColor, borderWidth: 2 }}>
                  <ArabicText size="md" accessibilityLabel={c.transliteration} readAs="label">
                    {c.script}
                  </ArabicText>
                  <Text variant="small" style={{ marginTop: 4, color: theme.colors.textMuted }}>
                    {c.transliteration} · {c.english}
                  </Text>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
        {checkResolved && !isCorrect && (
          <Text
            variant="small"
            accessibilityRole="alert"
            accessibilityLiveRegion="assertive"
            style={{ color: theme.colors.error, marginTop: 8 }}
          >
            Not quite. Correct answer highlighted above.
          </Text>
        )}
      </View>
    );
  };

  const renderDone = () => (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text variant="display" weight="bold" accessibilityRole="header">{lesson.title}</Text>
      <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}>
        {lesson.completionMessage}
      </Text>
    </View>
  );

  // ---------- Advance handler ----------

  const handleNext = async () => {
    // Intro → Words
    if (step === 'intro') {
      if (focalWords.length > 0) {
        setStepIdx(1);
      } else {
        setStepIdx(2);
      }
      setWordIdx(0);
      return;
    }

    // Words → next word or → Check
    if (step === 'words') {
      if (wordIdx + 1 < focalWords.length) {
        setWordIdx(wordIdx + 1);
      } else {
        setStepIdx(2);
        setCheckSel(null);
        setCheckResolved(false);
      }
      return;
    }

    // Check → reveal or → Done
    if (step === 'check') {
      if (!checkResolved) {
        setCheckResolved(true);
      } else {
        setStepIdx(3);
      }
      return;
    }

    // Done → next lesson or → finish primer
    if (step === 'done') {
      if (lessonIdx + 1 < totalLessons) {
        setLessonIdx(lessonIdx + 1);
        setStepIdx(0);
        setWordIdx(0);
        setCheckSel(null);
        setCheckResolved(false);
      } else {
        await completeLesson('primer:root-system', { advancePhase: false });
        // Rendering will flip to the finalize-complete branch on next tick
        setLessonIdx(totalLessons);
      }
    }
  };

  const nextDisabled = step === 'check' && !checkResolved && (checkSel == null || (Array.isArray(checkSel) && checkSel.length === 0));

  return (
    <ScreenContainer scroll={false} onClose={() => navigation.goBack()}>
      <ActivityHeader
        title={t('primer.title')}
        current={lessonIdx + 1}
        total={totalLessons}
        progress={overallPct}
      />

      <View style={{ flex: 1 }}>
        {step === 'intro' && renderIntro()}
        {step === 'words' && renderWords()}
        {step === 'check' && renderCheck()}
        {step === 'done' && renderDone()}
      </View>

      <Button
        title={
          step === 'done' && lessonIdx + 1 >= totalLessons
            ? t('common.done')
            : step === 'check' && !checkResolved
            ? t('common.next')
            : t('primer.continueBtn')
        }
        onPress={handleNext}
        variant={step === 'done' && lessonIdx + 1 >= totalLessons ? 'accent' : 'primary'}
        disabled={nextDisabled}
        accessibilityHint={
          step === 'check' && !checkResolved
            ? 'Check your answer'
            : step === 'done' && lessonIdx + 1 >= totalLessons
              ? 'Finishes the primer'
              : 'Continues to the next step'
        }
      />
    </ScreenContainer>
  );
}
