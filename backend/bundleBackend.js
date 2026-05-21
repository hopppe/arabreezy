// Content sourced from the bundled JS dialect files. This is the dev default
// and the fallback when Supabase is unconfigured. Signatures match
// supabaseBackend.js so the router in localBackend.js can pick either.

import saudi from '../src/data/dialects/saudi';
import levantine from '../src/data/dialects/levantine';
import fusha from '../src/data/dialects/fusha';
import { PHASES } from '../src/data/phases';
import { PLACEMENT_QUESTIONS } from '../src/data/placement';

const BUNDLES = { saudi, levantine, fusha };

function bundleFor(dialect) {
  return BUNDLES[dialect] || BUNDLES.saudi;
}

// --- Lessons -------------------------------------------------------------

export async function getLessons({ dialect = 'saudi', phase } = {}) {
  const all = bundleFor(dialect).lessons;
  return phase == null ? all : all.filter((l) => l.phase === phase);
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

export async function getConversations({ dialect = 'saudi', phase } = {}) {
  const all = bundleFor(dialect).conversations;
  return phase == null ? all : all.filter((c) => c.phase === phase);
}

export async function getConversation({ dialect = 'saudi', conversationId }) {
  return bundleFor(dialect).conversations.find((c) => c.id === conversationId) || null;
}

// --- Shadowing -----------------------------------------------------------

export async function getShadowingPhrases({ dialect = 'saudi', phase } = {}) {
  const all = bundleFor(dialect).shadowing || [];
  return phase == null ? all : all.filter((s) => s.phase === phase);
}

// --- Root primer (3-lesson crash course) --------------------------------

export async function getPrimer({ dialect = 'saudi' } = {}) {
  return bundleFor(dialect).primer || [];
}

// --- Roots (root family metadata) ---------------------------------------

export async function getRoots({ dialect = 'saudi' } = {}) {
  return bundleFor(dialect).roots || {};
}

export async function getRoot({ dialect = 'saudi', rootId }) {
  const roots = bundleFor(dialect).roots || {};
  return roots[rootId] || null;
}

export async function getRootFamily({ dialect = 'saudi', rootId }) {
  const bundle = bundleFor(dialect);
  const root = (bundle.roots || {})[rootId];
  const words = bundle.words || {};
  const ids = new Set();
  for (const id of root?.derivations ?? []) ids.add(id);
  for (const w of Object.values(words)) if (w.rootRef === rootId) ids.add(w.id);
  return [...ids]
    .map((id) => words[id])
    .filter(Boolean)
    .sort((a, b) => (a.phase - b.phase) || a.english.localeCompare(b.english));
}

// --- Phase & placement metadata -----------------------------------------

export async function getPhases() {
  return PHASES;
}

export async function getPlacementQuestions() {
  return PLACEMENT_QUESTIONS;
}

// --- Stories -------------------------------------------------------------

export async function getStories({ dialect = 'saudi', phase } = {}) {
  const all = bundleFor(dialect).stories || [];
  return phase == null ? all : all.filter((s) => s.phase === phase);
}

export async function getStory({ dialect = 'saudi', storyId }) {
  return (bundleFor(dialect).stories || []).find((s) => s.id === storyId) || null;
}

// --- Listening -----------------------------------------------------------

export async function getListeningExercises({ dialect = 'saudi', phase } = {}) {
  const all = bundleFor(dialect).listening || [];
  return phase == null ? all : all.filter((l) => l.phase === phase);
}

export async function getListeningExercise({ dialect = 'saudi', listeningId }) {
  return (bundleFor(dialect).listening || []).find((l) => l.id === listeningId) || null;
}

// --- Idioms --------------------------------------------------------------

export async function getIdioms({ dialect = 'saudi', phase } = {}) {
  const all = bundleFor(dialect).idioms || [];
  return phase == null ? all : all.filter((i) => i.phase === phase);
}

// --- Pronunciation -------------------------------------------------------

export async function getPronunciationTargets({ dialect = 'saudi', phase } = {}) {
  const all = bundleFor(dialect).pronunciation || [];
  return phase == null ? all : all.filter((p) => p.phase === phase);
}

// --- Grammar -------------------------------------------------------------

export async function getGrammarDrills({ dialect = 'saudi', phase } = {}) {
  const all = bundleFor(dialect).grammar || [];
  return phase == null ? all : all.filter((g) => g.phase === phase);
}

// --- Discovery helpers ---------------------------------------------------

export async function getAvailableDialects() {
  return Object.keys(BUNDLES);
}
