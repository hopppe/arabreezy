// Local backend façade. Screens & contexts import from here instead of
// touching bundled JSON or AsyncStorage directly. When we move to a real API,
// we only rewrite the internals of these functions.

import saudi from '../src/data/dialects/saudi';
import levantine from '../src/data/dialects/levantine';
import fusha from '../src/data/dialects/fusha';
import { LEVELS } from '../src/data/levels';
import { PLACEMENT_QUESTIONS } from '../src/data/placement';

const BUNDLES = { saudi, levantine, fusha };

function bundleFor(dialect) {
  return BUNDLES[dialect] || BUNDLES.saudi;
}

// --- Lessons -------------------------------------------------------------

export async function getLessons({ dialect = 'saudi', level } = {}) {
  const all = bundleFor(dialect).lessons;
  return level == null ? all : all.filter((l) => l.level === level);
}

export async function getLesson({ dialect = 'saudi', lessonId }) {
  return bundleFor(dialect).lessons.find((l) => l.id === lessonId) || null;
}

// --- Words ---------------------------------------------------------------

export async function getWords({ dialect = 'saudi', wordIds }) {
  const dict = bundleFor(dialect).words;
  if (!Array.isArray(wordIds)) return [];
  return wordIds.map((id) => dict[id]).filter(Boolean);
}

export async function getAllWords({ dialect = 'saudi' } = {}) {
  return Object.values(bundleFor(dialect).words);
}

export async function getWord({ dialect = 'saudi', wordId }) {
  return bundleFor(dialect).words[wordId] || null;
}

// --- Conversations -------------------------------------------------------

export async function getConversations({ dialect = 'saudi', level } = {}) {
  const all = bundleFor(dialect).conversations;
  return level == null ? all : all.filter((c) => c.level === level);
}

export async function getConversation({ dialect = 'saudi', conversationId }) {
  return bundleFor(dialect).conversations.find((c) => c.id === conversationId) || null;
}

// --- Level & placement metadata -----------------------------------------

export async function getLevels() {
  return LEVELS;
}

export async function getPlacementQuestions() {
  return PLACEMENT_QUESTIONS;
}

// --- Discovery helpers ---------------------------------------------------

export async function getAvailableDialects() {
  return Object.keys(BUNDLES);
}
