import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { useUserProgress } from './UserProgressContext';
import { useLessons } from './LessonContext';
import { useDialect } from './DialectContext';

// Today's review is derived state, not stored state. We re-compute it from
// the current lesson + word progress. That way there's nothing to "refresh"
// at midnight — the deck just naturally updates as the user works through
// lessons and words.

const DailyReviewContext = createContext(null);

export function DailyReviewProvider({ children }) {
  const { progress } = useUserProgress();
  const { currentLesson, nextSuggestedLesson } = useLessons();
  const { bundle } = useDialect();

  const activeLesson = currentLesson || nextSuggestedLesson;

  // Derive today's activities. Both are always shown; each has its own
  // completion state computed from underlying signal:
  //   - flashcards: completed if no due cards remain
  //   - guided conversation: completed if there's a convo for this level
  //     AND user has worked through at least one (we keep that as a lightweight
  //     flag inside lessonsCompleted array using a 'convo:<id>' prefix)
  const activities = useMemo(() => {
    const focalWordIds = activeLesson?.focalWordIds || [];
    const anyDue = focalWordIds.some((id) => {
      const p = progress.wordProgress[id];
      if (!p || p.status === 'new' || p.status === 'learning') return true;
      if (!p.nextReviewAt) return true;
      return new Date(p.nextReviewAt).getTime() <= Date.now();
    });

    // Match a conversation at this level
    const levelConvo = bundle.conversations.find((c) => c.level === (activeLesson?.level || progress.level));
    const convoKey = levelConvo ? `convo:${levelConvo.id}` : null;
    const convoDone = convoKey ? progress.lessonsCompleted.includes(convoKey) : true;

    return [
      {
        key: 'flashcards',
        type: 'flashcards',
        title: 'Flashcards',
        subtitle: anyDue ? 'Words from your current lesson' : 'All reviewed — great job',
        completed: !anyDue,
      },
      {
        key: 'guidedConversation',
        type: 'guidedConversation',
        title: 'Guided conversation',
        subtitle: levelConvo ? levelConvo.title : 'No conversation for this level yet',
        completed: !levelConvo ? true : convoDone,
        conversationId: levelConvo?.id || null,
      },
    ];
  }, [activeLesson, progress.wordProgress, progress.lessonsCompleted, progress.level, bundle.conversations]);

  const progressPct = useMemo(() => {
    const done = activities.filter((a) => a.completed).length;
    return Math.round((done / activities.length) * 100);
  }, [activities]);

  const value = useMemo(
    () => ({
      activeLesson,
      activities,
      progressPct,
    }),
    [activeLesson, activities, progressPct]
  );

  return <DailyReviewContext.Provider value={value}>{children}</DailyReviewContext.Provider>;
}

export function useDailyReview() {
  const ctx = useContext(DailyReviewContext);
  if (!ctx) throw new Error('useDailyReview must be used inside DailyReviewProvider');
  return ctx;
}
