import React, { createContext, useContext, useMemo } from 'react';
import { useUserProgress } from './UserProgressContext';
import { useLessons } from './LessonContext';
import { useDialect } from './DialectContext';

// Today's review is derived state. We re-compute it from the current lesson
// + word progress. No midnight reset — the deck naturally updates as the
// user works through lessons and words.
const DailyReviewContext = createContext(null);

export function DailyReviewProvider({ children }) {
  const { progress } = useUserProgress();
  const { currentLesson, nextSuggestedLesson } = useLessons();
  const { bundle } = useDialect();

  const activeLesson = currentLesson || nextSuggestedLesson;

  const activities = useMemo(() => {
    const focalWordIds = activeLesson?.focalWordIds || [];
    const anyDue = focalWordIds.some((id) => {
      const p = progress.wordProgress[id];
      if (!p || p.status === 'new' || p.status === 'learning') return true;
      if (!p.nextReviewAt) return true;
      return new Date(p.nextReviewAt).getTime() <= Date.now();
    });

    const phaseConvo = bundle.conversations.find((c) => c.phase === (activeLesson?.phase || progress.phase));
    const convoKey = phaseConvo ? `convo:${phaseConvo.id}` : null;
    const convoDone = convoKey ? progress.lessonsCompleted.includes(convoKey) : true;

    const phaseShadowing = (bundle.shadowing || []).filter((s) => s.phase === (activeLesson?.phase || progress.phase));
    const shadowingKey = phaseShadowing.length ? `shadow:${activeLesson?.phase || progress.phase}` : null;
    const shadowingDone = shadowingKey ? progress.lessonsCompleted.includes(shadowingKey) : true;

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
        subtitle: phaseConvo ? phaseConvo.title : 'No conversation at this phase yet',
        completed: !phaseConvo ? true : convoDone,
        conversationId: phaseConvo?.id || null,
      },
      {
        key: 'shadowing',
        type: 'shadowing',
        title: 'Shadowing',
        subtitle: phaseShadowing.length ? `${phaseShadowing.length} phrases to repeat` : 'No phrases at this phase yet',
        completed: !phaseShadowing.length ? true : shadowingDone,
        phase: activeLesson?.phase || progress.phase,
      },
    ];
  }, [activeLesson, progress.wordProgress, progress.lessonsCompleted, progress.phase, bundle.conversations, bundle.shadowing]);

  const progressPct = useMemo(() => {
    const done = activities.filter((a) => a.completed).length;
    return Math.round((done / activities.length) * 100);
  }, [activities]);

  const value = useMemo(() => ({ activeLesson, activities, progressPct }), [activeLesson, activities, progressPct]);
  return <DailyReviewContext.Provider value={value}>{children}</DailyReviewContext.Provider>;
}

export function useDailyReview() {
  const ctx = useContext(DailyReviewContext);
  if (!ctx) throw new Error('useDailyReview must be used inside DailyReviewProvider');
  return ctx;
}
