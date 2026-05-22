// Supabase-backed content reads. Mirrors the signatures in localBackend.js so
// the facade can switch between them based on config. Only content is sourced
// here — user progress sync lives in its own module.

import { supabase } from '../src/config/supabase';
import { PHASES } from '../src/data/phases';
import { PLACEMENT_QUESTIONS } from '../src/data/placement';

function requireClient() {
  if (!supabase) throw new Error('Supabase client not configured');
  return supabase;
}

function lessonFromRow(row) {
  return {
    id: row.lesson_id,
    phase: row.phase,
    title: row.title,
    intro: row.intro,
    focalWordIds: row.focal_word_ids ?? [],
    dialogue: row.dialogue ?? [],
    check: row.check_questions ?? [],
  };
}

function wordFromRow(row) {
  return {
    id: row.word_id,
    script: row.script,
    transliteration: row.transliteration,
    english: row.english,
    phase: row.phase,
    notes: row.notes ?? undefined,
    audio: row.audio ?? undefined,
    audioUrl: row.audio ?? undefined,
    imageUrl: row.image_url ?? undefined,
    dialect: row.dialect,
    rootRef: row.root_ref ?? undefined,
    pattern: row.pattern ?? undefined,
    semanticDrift: row.semantic_drift ?? undefined,
    driftNote: row.drift_note ?? undefined,
  };
}

function conversationFromRow(row) {
  return {
    id: row.conversation_id,
    phase: row.phase,
    title: row.title,
    description: row.description,
    focalWordIds: row.focal_word_ids ?? [],
    steps: row.steps ?? [],
    completionMessage: row.completion_message,
  };
}

function shadowingFromRow(row) {
  return {
    id: row.phrase_id,
    phase: row.phase,
    wordRef: row.word_ref ?? undefined,
    script: row.script,
    transliteration: row.transliteration,
    english: row.english,
    audio: row.audio ?? undefined,
  };
}

function storyFromRow(row) {
  return {
    id: row.story_id,
    phase: row.phase,
    title: row.title,
    titleEnglish: row.title_english,
    topic: row.topic,
    icon: row.icon,
    estimatedDuration: row.estimated_duration,
    readingLevel: row.reading_level,
    paragraphs: row.paragraphs ?? [],
    englishTranslation: row.english_translation ?? [],
    wordMappings: row.word_mappings ?? {},
    comprehensionQuestions: row.comprehension_questions ?? [],
    audioUrl: row.audio_url ?? undefined,
  };
}

function listeningFromRow(row) {
  return {
    id: row.listening_id,
    phase: row.phase,
    title: row.title,
    titleEnglish: row.title_english,
    icon: row.icon,
    estimatedDuration: row.estimated_duration,
    paragraphs: row.paragraphs ?? [],
    englishTranslation: row.english_translation ?? [],
    segments: row.segments ?? [],
    sectionBreaks: row.section_breaks ?? [],
    mainIdeaQuestions: row.main_idea_questions ?? [],
    sectionQuestions: row.section_questions ?? [],
    comprehensionQuestions: row.comprehension_questions ?? [],
    wordMappings: row.word_mappings ?? {},
    audioUrl: row.audio_url ?? undefined,
  };
}

function idiomFromRow(row) {
  return {
    id: row.idiom_id,
    phase: row.phase,
    expression: row.expression,
    transliteration: row.transliteration ?? undefined,
    literalTranslation: row.literal_translation ?? undefined,
    meaning: row.meaning,
    meaningArabic: row.meaning_english ?? undefined,
    examples: row.examples ?? [],
    choices: row.choices ?? [],
    sentenceChoices: row.sentence_choices ?? [],
    correctSentence: row.correct_sentence ?? undefined,
    icon: row.icon ?? undefined,
    estimatedDuration: row.estimated_duration,
  };
}

function pronunciationFromRow(row) {
  return {
    id: row.target_id,
    phase: row.phase,
    script: row.script,
    transliteration: row.transliteration,
    english: row.english,
    focusPhonemes: row.focus_phonemes ?? [],
    notes: row.notes ?? undefined,
    audioUrl: row.audio_url ?? undefined,
  };
}

function grammarFromRow(row) {
  return {
    id: row.drill_id,
    phase: row.phase,
    concept: row.concept,
    description: row.description ?? undefined,
    prompts: row.prompts ?? [],
    icon: row.icon ?? undefined,
  };
}

// --- Lessons -------------------------------------------------------------

export async function getLessons({ dialect = 'saudi', phase } = {}) {
  let query = requireClient().from('lessons').select('*').eq('dialect', dialect);
  if (phase != null) query = query.eq('phase', phase);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(lessonFromRow);
}

export async function getLesson({ dialect = 'saudi', lessonId }) {
  const { data, error } = await requireClient()
    .from('lessons')
    .select('*')
    .eq('dialect', dialect)
    .eq('lesson_id', lessonId)
    .maybeSingle();
  if (error) throw error;
  return data ? lessonFromRow(data) : null;
}

// --- Words ---------------------------------------------------------------

export async function getWords({ dialect = 'saudi', wordIds }) {
  if (!Array.isArray(wordIds) || wordIds.length === 0) return [];
  const { data, error } = await requireClient()
    .from('words')
    .select('*')
    .eq('dialect', dialect)
    .in('word_id', wordIds);
  if (error) throw error;
  const byId = new Map((data ?? []).map((row) => [row.word_id, wordFromRow(row)]));
  return wordIds.map((id) => byId.get(id)).filter(Boolean);
}

export async function getAllWords({ dialect = 'saudi' } = {}) {
  const { data, error } = await requireClient()
    .from('words')
    .select('*')
    .eq('dialect', dialect);
  if (error) throw error;
  return (data ?? []).map(wordFromRow);
}

export async function getWord({ dialect = 'saudi', wordId }) {
  const { data, error } = await requireClient()
    .from('words')
    .select('*')
    .eq('dialect', dialect)
    .eq('word_id', wordId)
    .maybeSingle();
  if (error) throw error;
  return data ? wordFromRow(data) : null;
}

// --- Conversations -------------------------------------------------------

export async function getConversations({ dialect = 'saudi', phase } = {}) {
  let query = requireClient().from('conversations').select('*').eq('dialect', dialect);
  if (phase != null) query = query.eq('phase', phase);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(conversationFromRow);
}

export async function getConversation({ dialect = 'saudi', conversationId }) {
  const { data, error } = await requireClient()
    .from('conversations')
    .select('*')
    .eq('dialect', dialect)
    .eq('conversation_id', conversationId)
    .maybeSingle();
  if (error) throw error;
  return data ? conversationFromRow(data) : null;
}

// --- Shadowing -----------------------------------------------------------

export async function getShadowingPhrases({ dialect = 'saudi', phase } = {}) {
  let query = requireClient().from('shadowing_phrases').select('*').eq('dialect', dialect);
  if (phase != null) query = query.eq('phase', phase);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(shadowingFromRow);
}

// --- Root primer ---------------------------------------------------------
// Primer content lives in the bundled dialect files (static curriculum — no
// migration table yet). Roots/patterns are backed by Supabase below.
import saudiBundle from '../src/data/dialects/saudi';
import levantineBundle from '../src/data/dialects/levantine';
import fushaBundle from '../src/data/dialects/fusha';
const BUNDLES = { saudi: saudiBundle, levantine: levantineBundle, fusha: fushaBundle };

export async function getPrimer({ dialect = 'saudi' } = {}) {
  return (BUNDLES[dialect] || BUNDLES.saudi).primer || [];
}

// --- Roots ---------------------------------------------------------------

function rootFromRow(row) {
  return {
    id: row.root_id,
    letters: row.letters ?? [],
    transliteration: row.transliteration,
    core: row.core,
    introducedAt: row.introduced_at,
    freqRank: row.freq_rank ?? null,
    sources: row.sources ?? [],
    saudi: !!row.saudi,
    derivations: row.derivations ?? [],
  };
}

// Returns the roots keyed by id, matching the bundle shape — so existing
// callers that did `Object.values(getRoots(...))` keep working.
export async function getRoots({ dialect = 'saudi' } = {}) {
  const { data, error } = await requireClient()
    .from('roots')
    .select('*')
    .eq('dialect', dialect)
    .order('introduced_at', { ascending: true });
  if (error) throw error;
  const out = {};
  for (const row of data ?? []) out[row.root_id] = rootFromRow(row);
  return out;
}

export async function getRoot({ dialect = 'saudi', rootId }) {
  const { data, error } = await requireClient()
    .from('roots')
    .select('*')
    .eq('dialect', dialect)
    .eq('root_id', rootId)
    .maybeSingle();
  if (error) throw error;
  return data ? rootFromRow(data) : null;
}

// Returns the words derived from a root. Pulls from the user's dialect AND
// from fusha (MSA) so a Saudi learner sees both their colloquial forms and
// the classical/MSA derivations that share the same root.
//
// Each word row carries its `dialect` so the UI can tag whether the form is
// the user's spoken dialect or a Classical/MSA reference.
export async function getRootFamily({ dialect = 'saudi', rootId }) {
  const client = requireClient();
  const dialects = dialect === 'fusha' ? ['fusha'] : [dialect, 'fusha'];

  const root = await getRoot({ dialect, rootId });
  const derivationIds = root?.derivations ?? [];

  const [byRef, byIds] = await Promise.all([
    client.from('words').select('*').in('dialect', dialects).eq('root_ref', rootId),
    derivationIds.length
      ? client.from('words').select('*').in('dialect', dialects).in('word_id', derivationIds)
      : Promise.resolve({ data: [], error: null }),
  ]);
  if (byRef.error) throw byRef.error;
  if (byIds.error) throw byIds.error;

  // Dedup by (dialect, word_id) so the same word can appear once per dialect.
  const seen = new Map();
  for (const row of [...(byRef.data ?? []), ...(byIds.data ?? [])]) {
    const key = `${row.dialect}::${row.word_id}`;
    if (!seen.has(key)) seen.set(key, wordFromRow(row));
  }
  // Sort: current dialect first, then fusha; within each, by phase then english.
  const rank = (d) => (d === dialect ? 0 : 1);
  return [...seen.values()].sort((a, b) =>
    rank(a.dialect) - rank(b.dialect)
    || (a.phase - b.phase)
    || (a.english || '').localeCompare(b.english || '')
  );
}

// --- Phase & placement metadata -----------------------------------------
// These are app-UX concerns, not content — stay client-local.

export async function getPhases() {
  return PHASES;
}

export async function getPlacementQuestions() {
  return PLACEMENT_QUESTIONS;
}

// --- Stories -------------------------------------------------------------

export async function getStories({ dialect = 'saudi', phase } = {}) {
  let query = requireClient().from('stories').select('*').eq('dialect', dialect);
  if (phase != null) query = query.eq('phase', phase);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(storyFromRow);
}

export async function getStory({ dialect = 'saudi', storyId }) {
  const { data, error } = await requireClient()
    .from('stories')
    .select('*')
    .eq('dialect', dialect)
    .eq('story_id', storyId)
    .maybeSingle();
  if (error) throw error;
  return data ? storyFromRow(data) : null;
}

// --- Listening -----------------------------------------------------------

export async function getListeningExercises({ dialect = 'saudi', phase } = {}) {
  let query = requireClient().from('listening_exercises').select('*').eq('dialect', dialect);
  if (phase != null) query = query.eq('phase', phase);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(listeningFromRow);
}

export async function getListeningExercise({ dialect = 'saudi', listeningId }) {
  const { data, error } = await requireClient()
    .from('listening_exercises')
    .select('*')
    .eq('dialect', dialect)
    .eq('listening_id', listeningId)
    .maybeSingle();
  if (error) throw error;
  return data ? listeningFromRow(data) : null;
}

// --- Idioms --------------------------------------------------------------

export async function getIdioms({ dialect = 'saudi', phase } = {}) {
  let query = requireClient().from('idioms').select('*').eq('dialect', dialect);
  if (phase != null) query = query.eq('phase', phase);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(idiomFromRow);
}

// --- Pronunciation -------------------------------------------------------

export async function getPronunciationTargets({ dialect = 'saudi', phase } = {}) {
  let query = requireClient().from('pronunciation_targets').select('*').eq('dialect', dialect);
  if (phase != null) query = query.eq('phase', phase);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(pronunciationFromRow);
}

// --- Grammar -------------------------------------------------------------

export async function getGrammarDrills({ dialect = 'saudi', phase } = {}) {
  let query = requireClient().from('grammar_drills').select('*').eq('dialect', dialect);
  if (phase != null) query = query.eq('phase', phase);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(grammarFromRow);
}

// --- Discovery helpers ---------------------------------------------------

export async function getAvailableDialects() {
  const { data, error } = await requireClient().from('dialects').select('id');
  if (error) throw error;
  return (data ?? []).map((row) => row.id);
}
