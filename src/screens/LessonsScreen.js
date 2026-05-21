import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, ActivityHeader } from '../components/ui';
import { PhaseBadge } from '../components/PhaseBadge';
import { theme } from '../theme';
import { useUserProgress } from '../context/UserProgressContext';
import { useLessons } from '../context/LessonContext';
import { getPhase, PHASES } from '../data/phases';

export default function LessonsScreen({ navigation }) {
  const { progress } = useUserProgress();
  const { phaseLessons, startLesson } = useLessons();
  const phaseInfo = getPhase(progress.phase);

  const onPick = async (lesson) => {
    await startLesson(lesson.id);
    navigation.navigate('Lesson', { lessonId: lesson.id });
  };

  return (
    <ScreenContainer onClose={() => navigation.goBack()}>
      <View style={{ marginBottom: theme.spacing.sm }}>
        <PhaseBadge phase={progress.phase} />
      </View>
      <ActivityHeader
        title={phaseInfo.title}
        subtitle={`${phaseInfo.tagline} · ${phaseInfo.cefr} · ${phaseInfo.wordsGoal} words target`}
      />

      <View accessibilityRole="list" accessibilityLabel={`${phaseInfo.title} lessons`}>
        {phaseLessons.map((lesson) => {
          const done = progress.lessonsCompleted.includes(lesson.id);
          const isCurrent = progress.currentLessonId === lesson.id;
          const statusLabel = done
            ? 'Completed'
            : isCurrent
              ? 'In progress'
              : `${lesson.focalWordIds.length} words`;
          return (
            <TouchableOpacity
              key={lesson.id}
              activeOpacity={0.85}
              onPress={() => onPick(lesson)}
              accessible
              accessibilityRole="button"
              accessibilityLabel={`${lesson.title}. ${statusLabel}`}
              accessibilityHint={lesson.intro}
              accessibilityState={{ selected: isCurrent }}
            >
              <Card
                style={{
                  marginBottom: theme.spacing.md,
                  borderColor: isCurrent
                    ? theme.colors.accent
                    : done
                    ? theme.colors.success
                    : theme.colors.border,
                  borderWidth: isCurrent ? 2 : 1,
                }}
              >
                <Text weight="bold">{lesson.title}</Text>
                <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
                  {lesson.intro}
                </Text>
                <Text
                  variant="caption"
                  style={{ marginTop: 8, color: done ? theme.colors.success : theme.colors.textFaint }}
                >
                  {done ? '✓ Completed' : isCurrent ? 'In progress' : `${lesson.focalWordIds.length} words`}
                </Text>
              </Card>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text variant="subtitle" weight="bold" accessibilityRole="header" style={{ marginTop: theme.spacing.xl }}>
        Phases
      </Text>
      <View
        accessibilityRole="list"
        accessibilityLabel="All phases"
        style={{ marginTop: theme.spacing.md, flexDirection: 'row', flexWrap: 'wrap' }}
      >
        {PHASES.map((p) => {
          const unlocked = p.phase <= progress.phase;
          return (
            <View
              key={p.phase}
              accessible
              accessibilityLabel={`Phase ${p.phase}, ${unlocked ? 'unlocked' : 'locked'}`}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: theme.radius.pill,
                backgroundColor: unlocked ? theme.colors.black : theme.colors.gray200,
                marginRight: 8,
                marginBottom: 8,
              }}
            >
              <Text
                variant="small"
                weight="bold"
                accessible={false}
                style={{ color: unlocked ? theme.colors.white : theme.colors.textFaint }}
              >
                {p.phase}
              </Text>
            </View>
          );
        })}
      </View>
    </ScreenContainer>
  );
}
