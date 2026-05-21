import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ScreenContainer, Text, Card, ProgressBar } from '../components/ui';
import { PhaseBadge } from '../components/PhaseBadge';
import { theme } from '../theme';
import { useTranslation } from '../context/LanguageContext';
import { useUserProgress } from '../context/UserProgressContext';
import { useDialect } from '../context/DialectContext';
import { PHASES, getPhase } from '../data/phases';

function summarizeWords(wordProgress) {
  const totals = { new: 0, learning: 0, review: 0, known: 0 };
  for (const id of Object.keys(wordProgress || {})) {
    const s = wordProgress[id]?.status || 'new';
    if (totals[s] != null) totals[s] += 1;
  }
  return totals;
}

export default function ProgressScreen() {
  const { t } = useTranslation();
  const { progress } = useUserProgress();
  const { bundle } = useDialect();

  const phaseInfo = getPhase(progress.phase);
  const wordTotals = useMemo(() => summarizeWords(progress.wordProgress), [progress.wordProgress]);
  const wordsTouched = wordTotals.learning + wordTotals.review + wordTotals.known;
  const knownPct = wordsTouched === 0
    ? 0
    : Math.round((wordTotals.known / wordsTouched) * 100);

  const phaseLessons = useMemo(
    () => (bundle.lessons || []).filter((l) => l.phase === progress.phase),
    [bundle.lessons, progress.phase]
  );
  const phaseLessonsDone = phaseLessons.filter((l) =>
    progress.lessonsCompleted.includes(l.id)
  ).length;
  const phasePct = phaseLessons.length === 0
    ? 0
    : Math.round((phaseLessonsDone / phaseLessons.length) * 100);

  return (
    <ScreenContainer>
      <Text variant="display" weight="bold" accessibilityRole="header">{t('progress.title')}</Text>

      <Card style={{ marginTop: theme.spacing.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Text variant="caption" style={{ color: theme.colors.textMuted }}>
              {t('progress.currentPhase')}
            </Text>
            <Text variant="title" weight="bold" accessibilityRole="header" style={{ marginTop: 4 }}>
              {phaseInfo.title}
            </Text>
            <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
              {phaseInfo.tagline}
            </Text>
          </View>
          <PhaseBadge phase={progress.phase} />
        </View>
        <View style={{ marginTop: theme.spacing.md }}>
          <Text
            variant="small"
            accessibilityLabel={`${phaseLessonsDone} of ${phaseLessons.length} lessons complete, ${phasePct} percent`}
            style={{ color: theme.colors.textMuted, marginBottom: 6 }}
          >
            {phaseLessonsDone}/{phaseLessons.length} lessons · {phasePct}%
          </Text>
          <ProgressBar value={phasePct} label="Phase progress" />
        </View>
      </Card>

      <View style={{ marginTop: theme.spacing.lg, flexDirection: 'row' }}>
        <Card style={{ flex: 1, marginRight: theme.spacing.sm }}>
          <Text variant="caption" style={{ color: theme.colors.textMuted }}>
            {t('progress.streakHeader')}
          </Text>
          <View
            accessible
            accessibilityLabel={`${progress.currentStreak || 0} day streak`}
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}
          >
            <Text style={{ fontSize: 22, marginRight: 6 }} accessible={false}>🔥</Text>
            <Text variant="title" weight="bold" accessible={false}>{progress.currentStreak || 0}</Text>
          </View>
          <Text variant="small" style={{ color: theme.colors.textFaint, marginTop: 4 }}>
            Longest: {progress.longestStreak || 0}
          </Text>
        </Card>
        <Card style={{ flex: 1, marginLeft: theme.spacing.sm }}>
          <Text variant="caption" style={{ color: theme.colors.textMuted }}>
            Lessons
          </Text>
          <Text
            variant="title"
            weight="bold"
            accessibilityLabel={`${progress.lessonsCompleted.length} lessons completed`}
            style={{ marginTop: 6 }}
          >
            {progress.lessonsCompleted.length}
          </Text>
          <Text variant="small" accessible={false} style={{ color: theme.colors.textFaint, marginTop: 4 }}>
            completed
          </Text>
        </Card>
      </View>

      <Card style={{ marginTop: theme.spacing.lg }}>
        <Text weight="bold" accessibilityRole="header">Words</Text>
        <View
          style={{
            marginTop: theme.spacing.md,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {[
            { label: 'New', value: wordTotals.new },
            { label: 'Learning', value: wordTotals.learning },
            { label: 'Review', value: wordTotals.review },
            { label: 'Known', value: wordTotals.known },
          ].map((c) => (
            <View
              key={c.label}
              accessible
              accessibilityLabel={`${c.value} ${c.label} words`}
              style={{ alignItems: 'center', flex: 1 }}
            >
              <Text variant="title" weight="bold" accessible={false}>{c.value}</Text>
              <Text variant="caption" accessible={false} style={{ color: theme.colors.textMuted, marginTop: 2 }}>
                {c.label}
              </Text>
            </View>
          ))}
        </View>
        {wordsTouched > 0 && (
          <View style={{ marginTop: theme.spacing.md }}>
            <Text
              variant="small"
              accessibilityLabel={`${knownPct} percent of touched words are known`}
              style={{ color: theme.colors.textMuted, marginBottom: 6 }}
            >
              {knownPct}% of touched words are known
            </Text>
            <ProgressBar value={knownPct} label="Known words" />
          </View>
        )}
      </Card>

      <Text
        variant="subtitle"
        weight="bold"
        accessibilityRole="header"
        style={{ marginTop: theme.spacing.xl }}
      >
        {t('progress.phasesTitle')}
      </Text>
      <View accessibilityRole="list" style={{ marginTop: theme.spacing.md }}>
        {PHASES.map((p) => {
          const isCurrent = p.phase === progress.phase;
          const unlocked = p.phase <= progress.phase;
          const status = isCurrent
            ? t('progress.phaseCurrent')
            : unlocked
              ? t('progress.phaseUnlocked')
              : t('progress.phaseLocked');
          return (
            <View
              key={p.phase}
              accessible
              accessibilityLabel={`Phase ${p.phase}, ${p.title}. ${status}.`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                borderBottomColor: theme.colors.border,
                borderBottomWidth: p.phase === PHASES.length ? 0 : 1,
              }}
            >
              <View
                importantForAccessibility="no"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isCurrent
                    ? theme.colors.accent
                    : unlocked
                    ? theme.colors.black
                    : theme.colors.gray200,
                  marginRight: theme.spacing.md,
                }}
              >
                <Text
                  weight="bold"
                  style={{ color: unlocked || isCurrent ? theme.colors.white : theme.colors.textFaint }}
                >
                  {p.phase}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text weight="bold">{p.title}</Text>
                <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
                  {p.tagline}
                </Text>
              </View>
              <Text
                variant="caption"
                weight="bold"
                style={{
                  color: isCurrent
                    ? theme.colors.accent
                    : unlocked
                    ? theme.colors.success
                    : theme.colors.textFaint,
                }}
              >
                {status}
              </Text>
            </View>
          );
        })}
      </View>
    </ScreenContainer>
  );
}
