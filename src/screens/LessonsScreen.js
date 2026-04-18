import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card } from '../components/ui';
import { LevelBadge } from '../components/LevelBadge';
import { theme } from '../theme';
import { useUserProgress } from '../context/UserProgressContext';
import { useLessons } from '../context/LessonContext';
import { getLevel, LEVELS } from '../data/levels';

export default function LessonsScreen({ navigation }) {
  const { progress } = useUserProgress();
  const { levelLessons, startLesson } = useLessons();
  const level = getLevel(progress.level);

  const onPick = async (lesson) => {
    await startLesson(lesson.id);
    navigation.navigate('Lesson', { lessonId: lesson.id });
  };

  return (
    <ScreenContainer>
      <LevelBadge level={progress.level} />
      <Text variant="display" weight="bold" style={{ marginTop: theme.spacing.sm }}>
        {level.title}
      </Text>
      <Text variant="body" style={{ color: theme.colors.textMuted }}>
        {level.cefr} · {level.wordsGoal} words target
      </Text>

      <View style={{ marginTop: theme.spacing.lg }}>
        {levelLessons.map((lesson) => {
          const done = progress.lessonsCompleted.includes(lesson.id);
          const isCurrent = progress.currentLessonId === lesson.id;
          return (
            <TouchableOpacity
              key={lesson.id}
              activeOpacity={0.85}
              onPress={() => onPick(lesson)}
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
                <Text variant="caption" style={{ marginTop: 8, color: done ? theme.colors.success : theme.colors.textFaint }}>
                  {done ? '✓ Completed' : isCurrent ? 'In progress' : `${lesson.focalWordIds.length} words`}
                </Text>
              </Card>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* All levels preview */}
      <Text variant="subtitle" weight="bold" style={{ marginTop: theme.spacing.xl }}>
        Levels
      </Text>
      <View style={{ marginTop: theme.spacing.md, flexDirection: 'row', flexWrap: 'wrap' }}>
        {LEVELS.map((l) => {
          const unlocked = l.level <= progress.level;
          return (
            <View
              key={l.level}
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
                style={{ color: unlocked ? theme.colors.white : theme.colors.textFaint }}
              >
                {l.level}
              </Text>
            </View>
          );
        })}
      </View>
    </ScreenContainer>
  );
}
