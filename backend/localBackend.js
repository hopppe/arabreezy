// Backend facade. Screens & contexts import from here and don't care where the
// data comes from. Routes to the Supabase-backed implementation when
// EXPO_PUBLIC_USE_SUPABASE_CONTENT=true and the client is configured,
// otherwise falls through to the bundled JS dialect data.

import { useSupabaseContent } from '../src/config/supabase';
import * as bundle from './bundleBackend';
import * as remote from './supabaseBackend';

const source = useSupabaseContent ? remote : bundle;

export const getLessons = source.getLessons;
export const getLesson = source.getLesson;
export const getWords = source.getWords;
export const getAllWords = source.getAllWords;
export const getWord = source.getWord;
export const getConversations = source.getConversations;
export const getConversation = source.getConversation;
export const getShadowingPhrases = source.getShadowingPhrases;
export const getStories = source.getStories;
export const getStory = source.getStory;
export const getListeningExercises = source.getListeningExercises;
export const getListeningExercise = source.getListeningExercise;
export const getIdioms = source.getIdioms;
export const getPronunciationTargets = source.getPronunciationTargets;
export const getGrammarDrills = source.getGrammarDrills;
export const getPrimer = source.getPrimer;
export const getRoots = source.getRoots;
export const getRoot = source.getRoot;
export const getRootFamily = source.getRootFamily;
export const getPhases = source.getPhases;
export const getPlacementQuestions = source.getPlacementQuestions;
export const getAvailableDialects = source.getAvailableDialects;
