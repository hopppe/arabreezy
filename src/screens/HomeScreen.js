import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScreenContainer, Text, Card, Button, ProgressBar, AddFlashcardModal } from '../components/ui';
import { PhaseBadge } from '../components/PhaseBadge';
import { theme } from '../theme';
import { useTranslation } from '../context/LanguageContext';
import { useUserProgress } from '../context/UserProgressContext';
import { useLessons } from '../context/LessonContext';
import { useDailyReview } from '../context/DailyReviewContext';
import { useFlashcards } from '../context/FlashcardContext';

function unitRouteFor(step) {
  switch (step) {
    case 'selecting': return 'UnitSelectWords';
    case 'memrise':   return 'UnitMemrise';
    case 'story':     return 'UnitStory';
    case 'rotation':  return 'UnitRotation';
    case 'chat':      return 'UnitChat';
    default:          return 'UnitSelectWords';
  }
}

function currentUnitSummary(unit) {
  if (!unit) return 'Tap to begin';
  const labels = {
    selecting: 'Pick your 8 words',
    memrise:   'Learn the new words',
    story:     'Read the story',
    rotation:  'Practice activity',
    chat:      'Chat with the tutor',
  };
  return labels[unit.step] || 'Continue lesson';
}

function HomeReviewCard({ navigation }) {
  const { deck, loading } = useFlashcards();
  const due = loading ? 0 : Math.min((deck || []).length, 20);
  const disabled = loading || due === 0;
  const headline = due > 0 ? `${due} word${due === 1 ? '' : 's'} due` : 'Nothing due right now';
  return (
    <Card style={{ marginTop: theme.spacing.lg }}>
      <Text variant="caption" style={{ color: theme.colors.textMuted }}>Review</Text>
      <Text variant="title" weight="bold" accessibilityRole="header" style={{ marginTop: 4 }}>
        {headline}
      </Text>
      <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
        Flashcards then a short chat to lock them in.
      </Text>
      <View style={{ marginTop: theme.spacing.md }}>
        <Button
          title={due > 0 ? `Start review (${due})` : 'No reviews due'}
          variant={disabled ? 'ghost' : 'accent'}
          onPress={() => navigation.navigate('Review')}
          disabled={disabled}
          accessibilityHint={due > 0 ? 'Opens today\'s flashcard review session' : undefined}
        />
      </View>
    </Card>
  );
}

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const { progress } = useUserProgress();
  const { currentLesson, nextSuggestedLesson, startLesson } = useLessons();
  const { activities, progressPct, activeLesson } = useDailyReview();
  const activeUnit = progress.currentUnit;
  const [searchOpen, setSearchOpen] = useState(false);

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
    else if (activity.type === 'guidedConversation' && activity.conversationId) {
      navigation.navigate('GuidedConversation', { conversationId: activity.conversationId });
    } else if (activity.type === 'shadowing') {
      navigation.navigate('Shadowing', { phase: activity.phase });
    }
  };

  return (
    <ScreenContainer>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <PhaseBadge phase={progress.phase} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {progress.currentStreak > 0 && (
            <View
              accessible
              accessibilityLabel={t('home.streakDays', { n: progress.currentStreak })}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: theme.colors.accentSoft,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: theme.radius.pill,
                marginRight: theme.spacing.sm,
              }}
            >
              <Text style={{ marginRight: 4 }} accessible={false}>🔥</Text>
              <Text variant="caption" weight="bold" accessible={false}>
                {t('home.streakDays', { n: progress.currentStreak })}
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => setSearchOpen(true)}
            accessible
            accessibilityRole="button"
            accessibilityLabel={t('wordSearch.openCta')}
            accessibilityHint="Opens the translate-and-save dialog"
            hitSlop={10}
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: theme.colors.gray100,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <Feather name="search" size={18} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <Text variant="display" weight="bold" accessibilityRole="header" style={{ marginTop: theme.spacing.sm }}>
        {t('home.greeting')}
      </Text>
      <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
        {t('home.todaysReview')}
      </Text>

      {/* Review CTA */}
      <HomeReviewCard navigation={navigation} />

      {/* Next lesson CTA */}
      <Card style={{ marginTop: theme.spacing.md }}>
        <Text variant="caption" style={{ color: theme.colors.textMuted }}>Next lesson</Text>
        <Text variant="title" weight="bold" accessibilityRole="header" style={{ marginTop: 4 }}>
          {currentUnitSummary(activeUnit)}
        </Text>
        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
          {activeUnit
            ? 'Resume where you left off.'
            : 'Pick 8 new words, get a story, then chat with the tutor.'}
        </Text>
        <View style={{ marginTop: theme.spacing.md }}>
          <Button
            title={activeUnit ? 'Continue lesson' : 'Start next lesson'}
            variant="accent"
            onPress={() => navigation.navigate(activeUnit ? unitRouteFor(activeUnit.step) : 'UnitSelectWords')}
            accessibilityHint={activeUnit ? 'Resumes your in-progress lesson' : 'Starts a new lesson by picking 8 words'}
          />
        </View>
      </Card>

      <View style={{ marginTop: theme.spacing.lg }}>
        <Text
          variant="small"
          accessibilityLabel={`${progressPct} percent of today's activities complete`}
          style={{ color: theme.colors.textMuted, marginBottom: 6 }}
        >
          {progressPct}% of today's activities
        </Text>
        <ProgressBar value={progressPct} label="Daily progress" />
      </View>

      <AddFlashcardModal
        visible={searchOpen}
        onClose={() => setSearchOpen(false)}
        onViewFlashcards={() => navigation.navigate('Flashcards')}
      />

    </ScreenContainer>
  );
}
