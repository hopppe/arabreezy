import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, Button, ProgressBar } from '../components/ui';
import { LevelBadge } from '../components/LevelBadge';
import { theme } from '../theme';
import { useTranslation } from '../context/LanguageContext';
import { useUserProgress } from '../context/UserProgressContext';
import { useLessons } from '../context/LessonContext';
import { useDailyReview } from '../context/DailyReviewContext';

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const { progress } = useUserProgress();
  const { currentLesson, nextSuggestedLesson, startLesson } = useLessons();
  const { activities, progressPct, activeLesson } = useDailyReview();

  const handleStartLesson = async () => {
    if (currentLesson) {
      navigation.navigate('Lesson', { lessonId: currentLesson.id });
      return;
    }
    if (nextSuggestedLesson) {
      await startLesson(nextSuggestedLesson.id);
      navigation.navigate('Lesson', { lessonId: nextSuggestedLesson.id });
    }
  };

  const handleActivity = (activity) => {
    if (activity.type === 'flashcards') navigation.navigate('Flashcards');
    if (activity.type === 'guidedConversation' && activity.conversationId) {
      navigation.navigate('GuidedConversation', { conversationId: activity.conversationId });
    }
  };

  return (
    <ScreenContainer>
      <LevelBadge level={progress.level} />
      <Text variant="display" weight="bold" style={{ marginTop: theme.spacing.sm }}>
        {t('home.greeting')}
      </Text>
      <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
        {t('home.todaysReview')}
      </Text>

      {/* Current lesson card */}
      <Card style={{ marginTop: theme.spacing.lg }}>
        <Text variant="caption" style={{ color: theme.colors.textMuted }}>
          {t('home.currentLesson')}
        </Text>
        <Text variant="title" weight="bold" style={{ marginTop: 4 }}>
          {activeLesson ? activeLesson.title : '—'}
        </Text>
        {activeLesson && (
          <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
            {activeLesson.intro}
          </Text>
        )}
        <View style={{ marginTop: theme.spacing.md }}>
          <Button
            title={currentLesson ? t('home.continueLesson') : t('home.startReview')}
            onPress={handleStartLesson}
            variant="accent"
            disabled={!activeLesson}
          />
        </View>
      </Card>

      {/* Progress strip */}
      <View style={{ marginTop: theme.spacing.lg }}>
        <Text variant="small" style={{ color: theme.colors.textMuted, marginBottom: 6 }}>
          {progressPct}% of today's activities
        </Text>
        <ProgressBar value={progressPct} />
      </View>

      {/* Daily activities */}
      <View style={{ marginTop: theme.spacing.lg }}>
        {activities.map((a) => (
          <TouchableOpacity
            key={a.key}
            activeOpacity={0.85}
            onPress={() => handleActivity(a)}
            disabled={a.type === 'guidedConversation' && !a.conversationId}
          >
            <Card
              style={{
                marginBottom: theme.spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderColor: a.completed ? theme.colors.success : theme.colors.border,
              }}
            >
              <View style={{ flex: 1, paddingRight: theme.spacing.md }}>
                <Text weight="bold">{a.title}</Text>
                <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
                  {a.subtitle}
                </Text>
              </View>
              <Text
                weight="bold"
                style={{ color: a.completed ? theme.colors.success : theme.colors.accent }}
              >
                {a.completed ? '✓' : '→'}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenContainer>
  );
}
