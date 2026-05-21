import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text } from './Text';
import { ArabicText } from '../ArabicText';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { searchWord } from '../../services/wordSearchService';

const ARABIC_REGEX = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

// Three quick-tap example queries — Saudi-flavoured to set the tone.
const EXAMPLE_QUERIES = ['من عيوني', 'وش أخبارك', "I'm running late"];

/**
 * Translate & Save modal — type Arabic OR English, get an idiomatic
 * translation in the user's chosen dialect, and add the result to flashcards.
 *
 * Props:
 *   visible: boolean
 *   onClose: () => void
 *   onViewFlashcards?: () => void   // optional: shows "View flashcards" after save
 */
export function AddFlashcardModal({ visible, onClose, onViewFlashcards }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { addCustomWord } = useUserProgress();

  const [query, setQuery] = useState('');
  const [context, setContext] = useState('');
  const [showContextField, setShowContextField] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedState, setSavedState] = useState(null); // 'saved' | 'alreadySaved' | null

  const inputRef = useRef(null);

  const resetForm = useCallback(() => {
    setQuery('');
    setContext('');
    setShowContextField(false);
    setIsSearching(false);
    setResult(null);
    setSearchError(null);
    setIsSaving(false);
    setSavedState(null);
  }, []);

  useEffect(() => {
    if (!visible) resetForm();
  }, [visible, resetForm]);

  const handleClose = useCallback(() => {
    resetForm();
    onClose?.();
  }, [resetForm, onClose]);

  const handleQueryChange = useCallback(
    (text) => {
      setQuery(text);
      if (result) setResult(null);
      if (searchError) setSearchError(null);
      if (savedState) setSavedState(null);
    },
    [result, searchError, savedState]
  );

  const handleTranslate = useCallback(
    async (overrideQuery) => {
      const trimmed = (overrideQuery ?? query).trim();
      if (!trimmed) return;
      Keyboard.dismiss();

      setIsSearching(true);
      setResult(null);
      setSearchError(null);
      setSavedState(null);

      try {
        const response = await searchWord({
          query: trimmed,
          context: showContextField && context.trim().length > 0 ? context.trim() : null,
          dialect,
        });
        if (response.success && response.data) {
          setResult(response.data);
        } else {
          setSearchError(response.error || t('wordSearch.error'));
        }
      } catch (err) {
        setSearchError(t('wordSearch.error'));
      } finally {
        setIsSearching(false);
      }
    },
    [query, context, showContextField, dialect, t]
  );

  const handleExamplePress = useCallback(
    (example) => {
      setQuery(example);
      handleTranslate(example);
    },
    [handleTranslate]
  );

  const handleSave = useCallback(async () => {
    if (!result) return;
    setIsSaving(true);
    try {
      const outcome = await addCustomWord({
        script: result.arabic,
        transliteration: result.transliteration,
        english: result.english,
        notes: result.explanation || null,
        dialect,
      });
      if (outcome.added) setSavedState('saved');
      else if (outcome.alreadyExists) setSavedState('alreadySaved');
      else Alert.alert(t('wordSearch.saveFailed'));
    } catch (err) {
      Alert.alert(t('wordSearch.saveFailed'));
    } finally {
      setIsSaving(false);
    }
  }, [result, addCustomWord, dialect, t]);

  const handleTranslateAnother = useCallback(() => {
    setQuery('');
    setContext('');
    setShowContextField(false);
    setResult(null);
    setSearchError(null);
    setSavedState(null);
    setTimeout(() => inputRef.current?.focus?.(), 50);
  }, []);

  const handleViewFlashcards = useCallback(() => {
    handleClose();
    onViewFlashcards?.();
  }, [handleClose, onViewFlashcards]);

  const isQueryArabic = useMemo(() => ARABIC_REGEX.test(query), [query]);
  const hasResult = Boolean(result);
  const showExamples = !hasResult && !isSearching && query.trim().length === 0 && !searchError;
  const canShowContextLink = !hasResult && query.trim().length > 0 && query.trim().length < 60;
  const saveDisabled = !result?.saveable || isSaving || Boolean(savedState);

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Feather name="search" size={20} color={theme.colors.text} style={{ marginRight: 8 }} />
              <Text variant="title" weight="bold">{t('wordSearch.title')}</Text>
            </View>
            <TouchableOpacity
              onPress={handleClose}
              hitSlop={10}
              style={styles.closeBtn}
              accessible
              accessibilityRole="button"
              accessibilityLabel={t('common.close') || 'Close'}
              accessibilityHint="Closes the translate dialog"
            >
              <Feather name="x" size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={{ maxHeight: 560 }}
            contentContainerStyle={{ paddingBottom: 8 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.searchBar}>
              <Feather
                name="search"
                size={18}
                color={theme.colors.textMuted}
                style={{ marginRight: 8 }}
              />
              <TextInput
                ref={inputRef}
                style={[
                  styles.queryInput,
                  isQueryArabic && { textAlign: 'right', writingDirection: 'rtl' },
                ]}
                value={query}
                onChangeText={handleQueryChange}
                placeholder={t('wordSearch.placeholder')}
                placeholderTextColor={theme.colors.textFaint}
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                multiline
                maxLength={500}
                onSubmitEditing={() => handleTranslate()}
                returnKeyType="search"
                blurOnSubmit
                accessible
                accessibilityLabel={t('wordSearch.title') || 'Translate'}
                accessibilityHint="Type a word or phrase in Arabic or English to translate"
              />
              {query.length > 0 && !isSearching && (
                <TouchableOpacity
                  onPress={() => handleQueryChange('')}
                  hitSlop={8}
                  style={{ padding: 4 }}
                  accessible
                  accessibilityRole="button"
                  accessibilityLabel="Clear input"
                >
                  <Feather name="x-circle" size={16} color={theme.colors.textMuted} />
                </TouchableOpacity>
              )}
            </View>

            {showExamples && (
              <View style={styles.examplesRow}>
                <Text variant="small" style={{ color: theme.colors.textMuted, marginRight: 4 }}>
                  {t('wordSearch.tryExamples')}
                </Text>
                {EXAMPLE_QUERIES.map((example) => (
                  <TouchableOpacity
                    key={example}
                    onPress={() => handleExamplePress(example)}
                    activeOpacity={0.7}
                    style={styles.exampleChip}
                    accessible
                    accessibilityRole="button"
                    accessibilityLabel={`Try example: ${example}`}
                    accessibilityHint="Fills the search field and translates this example"
                  >
                    <Text variant="small">{example}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {canShowContextLink && (
              <View style={{ marginTop: theme.spacing.sm }}>
                {!showContextField ? (
                  <TouchableOpacity
                    onPress={() => setShowContextField(true)}
                    activeOpacity={0.7}
                    hitSlop={6}
                    accessible
                    accessibilityRole="button"
                    accessibilityLabel={t('wordSearch.addContext')}
                    accessibilityHint="Reveals an optional context field for better translation"
                  >
                    <Text variant="small" weight="bold" style={{ color: theme.colors.accent }}>
                      + {t('wordSearch.addContext')}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View>
                    <TextInput
                      style={styles.contextInput}
                      value={context}
                      onChangeText={setContext}
                      placeholder={t('wordSearch.contextPlaceholder')}
                      placeholderTextColor={theme.colors.textFaint}
                      autoCapitalize="none"
                      autoCorrect={false}
                      multiline
                      maxLength={500}
                      accessible
                      accessibilityLabel="Context"
                      accessibilityHint="Optional context to improve the translation"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setShowContextField(false);
                        setContext('');
                      }}
                      hitSlop={6}
                      style={{ marginTop: 4 }}
                      accessible
                      accessibilityRole="button"
                      accessibilityLabel={t('wordSearch.hideContext')}
                    >
                      <Text variant="small" style={{ color: theme.colors.textMuted }}>
                        − {t('wordSearch.hideContext')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            {!hasResult && (
              <TouchableOpacity
                style={[
                  styles.translateBtn,
                  (isSearching || !query.trim()) && { opacity: 0.4 },
                ]}
                onPress={() => handleTranslate()}
                disabled={isSearching || !query.trim()}
                activeOpacity={0.85}
                accessible
                accessibilityRole="button"
                accessibilityLabel={isSearching ? t('wordSearch.translating') : t('wordSearch.translate')}
                accessibilityState={{ disabled: isSearching || !query.trim(), busy: isSearching }}
              >
                {isSearching ? (
                  <View style={styles.loadingRow}>
                    <ActivityIndicator color={theme.colors.white} />
                    <Text weight="bold" style={{ color: theme.colors.white, marginLeft: 8 }}>
                      {t('wordSearch.translating')}
                    </Text>
                  </View>
                ) : (
                  <Text weight="bold" style={{ color: theme.colors.white }}>
                    {t('wordSearch.translate')}
                  </Text>
                )}
              </TouchableOpacity>
            )}

            {searchError && (
              <View
                accessible
                accessibilityRole="alert"
                accessibilityLiveRegion="polite"
                accessibilityLabel={searchError}
                style={styles.errorBox}
              >
                <Feather name="alert-circle" size={16} color={theme.colors.error} />
                <Text variant="small" style={{ color: theme.colors.error, marginLeft: 8, flex: 1 }}>
                  {searchError}
                </Text>
              </View>
            )}

            {hasResult && (
              <View style={styles.resultCard}>
                <Text variant="title" weight="bold" selectable>
                  {result.english}
                </Text>

                <ArabicText size="lg" style={{ marginTop: theme.spacing.sm }}>
                  {result.arabic}
                </ArabicText>

                {!!result.transliteration && (
                  <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
                    {result.transliteration}
                  </Text>
                )}

                {!!result.literal && (
                  <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.sm }}>
                    {t('wordSearch.literally')}: <Text variant="small" style={{ fontStyle: 'italic' }}>"{result.literal}"</Text>
                  </Text>
                )}

                {!!result.explanation && (
                  <Text variant="small" style={{ marginTop: theme.spacing.sm }}>
                    {result.explanation}
                  </Text>
                )}

                {!!result.exampleEnglish && (
                  <View style={styles.exampleBlock}>
                    <Text variant="small">{result.exampleEnglish}</Text>
                    {!!result.exampleArabic && (
                      <ArabicText size="sm" style={{ marginTop: 4, color: theme.colors.textMuted }}>
                        {result.exampleArabic}
                      </ArabicText>
                    )}
                  </View>
                )}

                {result.saveable ? (
                  <TouchableOpacity
                    style={[
                      styles.saveBtn,
                      savedState && { backgroundColor: theme.colors.success },
                      saveDisabled && !savedState && { opacity: 0.6 },
                    ]}
                    onPress={handleSave}
                    disabled={saveDisabled}
                    activeOpacity={0.85}
                    accessible
                    accessibilityRole="button"
                    accessibilityLabel={
                      isSaving
                        ? t('wordSearch.saving')
                        : savedState === 'alreadySaved'
                          ? t('wordSearch.alreadySaved')
                          : savedState === 'saved'
                            ? t('wordSearch.saved')
                            : t('wordSearch.save')
                    }
                    accessibilityHint="Saves this translation to your flashcards"
                    accessibilityState={{ disabled: saveDisabled, busy: isSaving }}
                  >
                    {isSaving ? (
                      <View style={styles.loadingRow}>
                        <ActivityIndicator color={theme.colors.white} />
                        <Text weight="bold" style={{ color: theme.colors.white, marginLeft: 8 }}>
                          {t('wordSearch.saving')}
                        </Text>
                      </View>
                    ) : savedState ? (
                      <View style={styles.loadingRow}>
                        <Feather name="check" size={16} color={theme.colors.white} />
                        <Text weight="bold" style={{ color: theme.colors.white, marginLeft: 8 }}>
                          {savedState === 'alreadySaved'
                            ? t('wordSearch.alreadySaved')
                            : t('wordSearch.saved')}
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.loadingRow}>
                        <Feather name="bookmark" size={16} color={theme.colors.white} />
                        <Text weight="bold" style={{ color: theme.colors.white, marginLeft: 8 }}>
                          {t('wordSearch.save')}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ) : (
                  <Text
                    variant="small"
                    style={{
                      marginTop: theme.spacing.md,
                      color: theme.colors.textMuted,
                      fontStyle: 'italic',
                      textAlign: 'center',
                    }}
                  >
                    {t('wordSearch.notSaveable')}
                  </Text>
                )}

                <View style={styles.footerLinks}>
                  <TouchableOpacity
                    onPress={handleTranslateAnother}
                    hitSlop={8}
                    accessible
                    accessibilityRole="button"
                    accessibilityLabel={t('wordSearch.translateAnother')}
                  >
                    <Text variant="small" weight="bold" style={{ color: theme.colors.accent }}>
                      {t('wordSearch.translateAnother')}
                    </Text>
                  </TouchableOpacity>
                  {savedState && onViewFlashcards && (
                    <TouchableOpacity
                      onPress={handleViewFlashcards}
                      hitSlop={8}
                      accessible
                      accessibilityRole="link"
                      accessibilityLabel={t('wordSearch.viewFlashcards')}
                      accessibilityHint="Opens the flashcards screen"
                    >
                      <Text variant="small" weight="bold" style={{ color: theme.colors.success }}>
                        {t('wordSearch.viewFlashcards')} →
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = {
  overlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    margin: theme.spacing.lg,
    width: '92%',
    maxWidth: 440,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  closeBtn: {
    padding: 6,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.gray100,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.surface,
    minHeight: 50,
  },
  queryInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.text,
    minHeight: 24,
    maxHeight: 100,
  },
  examplesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
    marginTop: theme.spacing.md,
  },
  exampleChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.gray100,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  contextInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    minHeight: 44,
    maxHeight: 88,
    textAlignVertical: 'top',
  },
  translateBtn: {
    backgroundColor: theme.colors.black,
    borderRadius: theme.radius.pill,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
    minHeight: 50,
  },
  loadingRow: { flexDirection: 'row', alignItems: 'center' },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.accentSoft,
    borderColor: theme.colors.error,
    borderWidth: 1,
    borderRadius: theme.radius.sm,
    padding: 10,
    marginTop: theme.spacing.md,
  },
  resultCard: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  exampleBlock: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  saveBtn: {
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.pill,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
    marginTop: theme.spacing.md,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
};

export default AddFlashcardModal;
