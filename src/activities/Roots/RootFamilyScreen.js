import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, Button, ActivityHeader } from '../../components/ui';
import { ArabicText } from '../../components/ArabicText';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { useAudio } from '../../hooks/useAudio';
import { getRoot, getRootFamily } from '../../../backend/localBackend';

const DRIFT_COLORS = {
  none: theme.colors.textMuted,
  some: theme.colors.accent,
  large: '#c54',
};

export default function RootFamilyScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { logActivity } = useUserProgress();
  const { playText, configured: audioConfigured } = useAudio();
  const rootId = route?.params?.rootId;

  const [root, setRoot] = useState(null);
  const [family, setFamily] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!rootId) return undefined;
    let cancelled = false;
    Promise.all([
      getRoot({ dialect, rootId }),
      getRootFamily({ dialect, rootId }),
    ]).then(([r, fam]) => {
      if (cancelled) return;
      setRoot(r);
      setFamily(fam || []);
      setLoaded(true);
    }).catch(() => setLoaded(true));
    return () => { cancelled = true; };
  }, [dialect, rootId]);

  useEffect(() => {
    if (loaded && root) {
      logActivity({ type: 'roots', contentId: root.id, dialect, phase: root.introducedAt });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, root?.id]);

  if (!loaded) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text
          variant="body"
          accessibilityLiveRegion="polite"
          style={{ color: theme.colors.textMuted }}
        >
          {t('common.loading')}
        </Text>
      </ScreenContainer>
    );
  }

  if (!root) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text variant="display" weight="bold" accessibilityRole="header">{t('roots.notFound')}</Text>
        <View style={{ marginTop: theme.spacing.xl }}>
          <Button
            title={t('common.back')}
            variant="ghost"
            onPress={() => navigation.goBack()}
            accessibilityHint="Returns to the roots list"
          />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer onClose={() => navigation.goBack()} scroll={false}>
      <ActivityHeader title={t('roots.family')} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: theme.spacing.xl }}>
        <Card
          accessible
          accessibilityLabel={`Root ${root.transliteration}. Letters: ${(root.letters || []).join(' ')}. Meaning: ${root.core}.`}
          style={{ alignItems: 'center', paddingVertical: theme.spacing.xl }}
        >
          <View
            importantForAccessibility="no"
            style={{ flexDirection: 'row', justifyContent: 'center' }}
          >
            {(root.letters || []).map((letter, i) => (
              <View
                key={i}
                style={{
                  width: 56,
                  height: 56,
                  marginHorizontal: 6,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: theme.colors.text,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArabicText size="lg">{letter}</ArabicText>
              </View>
            ))}
          </View>
          <Text variant="title" weight="bold" accessibilityRole="header" style={{ marginTop: theme.spacing.md }}>
            {root.transliteration}
          </Text>
          <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: 4, textAlign: 'center' }}>
            {root.core}
          </Text>
          <Text variant="caption" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.sm }}>
            {t('roots.introducedAt', { n: root.introducedAt })}
          </Text>
        </Card>

        <View style={{ marginTop: theme.spacing.lg }}>
          <Text variant="title" weight="bold" accessibilityRole="header">{t('roots.derivedWords')}</Text>
          <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
            {t('roots.derivedWordsSubtitle', { count: family.length })}
          </Text>
        </View>

        {family.length === 0 ? (
          <Card style={{ marginTop: theme.spacing.md }}>
            <Text variant="body" style={{ color: theme.colors.textMuted }}>
              {t('roots.emptyFamily')}
            </Text>
          </Card>
        ) : (
          family.map((word) => (
            <WordRow
              key={word.id}
              word={word}
              audioConfigured={audioConfigured}
              onPlay={() => playText && playText(word.script, { dialect })}
            />
          ))
        )}

        <View style={{ marginTop: theme.spacing.xl }}>
          <Button
            title={t('common.back')}
            variant="ghost"
            onPress={() => navigation.goBack()}
            accessibilityHint="Returns to the roots list"
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const DIALECT_LABELS = { saudi: 'Saudi', levantine: 'Levantine', fusha: 'MSA' };

function WordRow({ word, audioConfigured, onPlay }) {
  const driftColor = word.semanticDrift ? DRIFT_COLORS[word.semanticDrift] : null;
  const isMsaReference = word.dialect === 'fusha';
  return (
    <Card
      accessible
      accessibilityLabel={`${word.english}, pronounced ${word.transliteration}. Phase ${word.phase}. ${DIALECT_LABELS[word.dialect] || word.dialect || ''}`}
      style={{ marginTop: theme.spacing.sm, opacity: isMsaReference ? 0.85 : 1 }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, paddingRight: theme.spacing.sm }}>
          <ArabicText size="md" accessibilityLabel={word.transliteration} readAs="label">
            {word.script}
          </ArabicText>
          <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
            {word.transliteration}
          </Text>
          <Text variant="body" style={{ marginTop: 4 }}>{word.english}</Text>
          {word.driftNote ? (
            <Text
              variant="caption"
              style={{ color: driftColor || theme.colors.textMuted, marginTop: 6, fontStyle: 'italic' }}
            >
              {word.driftNote}
            </Text>
          ) : null}
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          {word.dialect ? (
            <View
              importantForAccessibility="no"
              style={{
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: theme.radius.pill,
                backgroundColor: isMsaReference ? theme.colors.surfaceMuted : theme.colors.accentSoft,
              }}
            >
              <Text variant="caption" weight="bold" style={{ color: theme.colors.text }}>
                {DIALECT_LABELS[word.dialect] || word.dialect}
              </Text>
            </View>
          ) : null}
          <Text variant="caption" accessible={false} style={{ color: theme.colors.textMuted, marginTop: 4 }}>
            P{word.phase}
          </Text>
          {audioConfigured ? (
            <TouchableOpacity
              onPress={onPlay}
              accessible
              accessibilityRole="button"
              accessibilityLabel={`Play audio for ${word.english}`}
              accessibilityHint="Plays the Arabic pronunciation"
              hitSlop={8}
              style={{
                marginTop: theme.spacing.sm,
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 6,
                backgroundColor: theme.colors.surfaceMuted,
                minWidth: 44,
                minHeight: 32,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text variant="caption">▶</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Card>
  );
}
