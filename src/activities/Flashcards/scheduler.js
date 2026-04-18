// Tiny Anki-ish spaced repetition scheduler.
// Lives at activities/Flashcards/scheduler.js so the algorithm sits next to
// the activity that uses it. Pure functions; all state handed in.
//
// Rating scale: 1 = again, 2 = hard, 3 = good, 4 = easy.
// Fields on a word's progress record:
//   status:         'new' | 'learning' | 'review' | 'known'
//   easeFactor:     defaults 2.5
//   interval:       days until next review
//   nextReviewAt:   ISO string
//   lapses:         number of times user said 'again' from review
//   reviewsCount:   total ratings submitted

export const INITIAL_PROGRESS = {
  status: 'new',
  easeFactor: 2.5,
  interval: 0,
  nextReviewAt: null,
  lapses: 0,
  reviewsCount: 0,
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function addDays(daysFromNow) {
  return new Date(Date.now() + daysFromNow * MS_PER_DAY).toISOString();
}

export function isDue(wordProgress, now = Date.now()) {
  if (!wordProgress) return true; // never reviewed = due
  if (wordProgress.status === 'new') return true;
  if (!wordProgress.nextReviewAt) return true;
  return new Date(wordProgress.nextReviewAt).getTime() <= now;
}

export function applyRating(prev, rating) {
  const state = { ...INITIAL_PROGRESS, ...(prev || {}) };
  state.reviewsCount += 1;

  if (rating === 1) {
    // again — reset to learning
    state.status = 'learning';
    state.lapses += 1;
    state.easeFactor = Math.max(1.3, state.easeFactor - 0.2);
    state.interval = 0;
    state.nextReviewAt = addDays(0); // due again soon
    return state;
  }

  // Intermediate promotion out of 'new'/'learning' after a 'good' or better
  if (state.status === 'new' || state.status === 'learning') {
    if (rating === 2) state.interval = 1;
    else if (rating === 3) state.interval = 2;
    else state.interval = 4;
    state.status = state.interval >= 4 ? 'review' : 'learning';
  } else {
    // review
    const multipliers = { 2: 1.2, 3: state.easeFactor, 4: state.easeFactor * 1.3 };
    state.interval = Math.max(1, Math.round((state.interval || 1) * (multipliers[rating] || 1)));
    if (rating === 2) state.easeFactor = Math.max(1.3, state.easeFactor - 0.15);
    if (rating === 4) state.easeFactor = state.easeFactor + 0.15;
  }

  // Known if interval >= 30 days
  if (state.interval >= 30) state.status = 'known';
  state.nextReviewAt = addDays(state.interval);
  return state;
}
