import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, Button, ProgressBar } from '../../components/ui';
import { ArabicText } from '../../components/ArabicText';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useFlashcards } from '../../context/FlashcardContext';

const RATINGS = [
  { key: 1, labelKey: 'flashcards.again', color: '#E74C3C' },
  { key: 2, labelKey: 'flashcards.hard',  color: '#F1C40F' },
  { key: 3, labelKey: 'flashcards.good',  color: '#2ECC71' },
  { key: 4, labelKey: 'flashcards.easy',  color: '#3498DB' },
];

export default function FlashcardScreen({ navigation }) {
  const { t } = useTranslation();
  const { deck, rateCard, loading } = useFlashcards();
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (loading) {
    return (
      <ScreenContainer>
        <Text>{t('common.loading')}</Text>
      </ScreenContainer>
    );
  }

  if (!deck.length) {
    return (
      <ScreenContainer>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text variant="display" weight="bold">{t('flashcards.emptyTitle')}</Text>
          <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}>
            {t('flashcards.emptyBody')}
          </Text>
          <View style={{ marginTop: theme.spacing.xl }}>
            <Button title={t('common.back')} variant="ghost" onPress={() => navigation.goBack()} />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  const card = deck[idx];
  if (!card) {
    // finished
    return (
      <ScreenContainer>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text variant="display" weight="bold">All done</Text>
          <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}>
            Session complete. Come back after more lessons for fresh cards.
          </Text>
          <View style={{ marginTop: theme.spacing.xl }}>
            <Button title={t('common.done')} variant="accent" onPress={() => navigation.goBack()} />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  const pct = (idx / deck.length) * 100;

  const onRate = async (rating) => {
    await rateCard(card.id, rating);
    setFlipped(false);
    setIdx(idx + 1);
  };

  return (
    <ScreenContainer scroll={false}>
      <View style={{ marginBottom: theme.spacing.md }}>
        <Text variant="caption" style={{ color: theme.colors.textMuted, marginBottom: 4 }}>
          {idx + 1} / {deck.length}
        </Text>
        <ProgressBar value={pct} />
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setFlipped((f) => !f)}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <Card
          style={{
            minHeight: 240,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: flipped ? theme.colors.accentSoft : theme.colors.surface,
          }}
        >
          {!flipped ? (
            <>
              <ArabicText size="display">{card.script}</ArabicText>
              <Text variant="small" style={{ color: theme.colors.textFaint, marginTop: theme.spacing.md }}>
                {t('flashcards.tapToFlip')}
              </Text>
            </>
          ) : (
            <>
              <Text variant="title" weight="bold">{card.english}</Text>
              <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.sm }}>
                {card.transliteration}
              </Text>
              {card.notes && (
                <Text variant="small" style={{ color: theme.colors.textFaint, marginTop: theme.spacing.sm }}>
                  {card.notes}
                </Text>
              )}
            </>
          )}
        </Card>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: theme.spacing.md }}>
        {RATINGS.map((r) => (
          <TouchableOpacity
            key={r.key}
            disabled={!flipped}
            onPress={() => onRate(r.key)}
            activeOpacity={0.85}
            style={{
              flex: 1,
              marginHorizontal: 4,
              paddingVertical: 14,
              backgroundColor: flipped ? r.color : theme.colors.gray200,
              borderRadius: theme.radius.md,
              alignItems: 'center',
              opacity: flipped ? 1 : 0.5,
            }}
          >
            <Text weight="bold" style={{ color: theme.colors.white }}>
              {t(r.labelKey)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenContainer>
  );
}
