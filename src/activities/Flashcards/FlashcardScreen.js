import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { ScreenContainer, Text, Card, Button, ActivityHeader } from '../../components/ui';
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
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text accessibilityLiveRegion="polite">{t('common.loading')}</Text>
      </ScreenContainer>
    );
  }

  if (!deck.length) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text variant="display" weight="bold" accessibilityRole="header">{t('flashcards.emptyTitle')}</Text>
          <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}>
            {t('flashcards.emptyBody')}
          </Text>
          <View style={{ marginTop: theme.spacing.xl }}>
            <Button
              title={t('common.back')}
              variant="ghost"
              onPress={() => navigation.goBack()}
              accessibilityHint="Returns to the previous screen"
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  const card = deck[idx];
  if (!card) {
    // finished
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text variant="display" weight="bold" accessibilityRole="header">All done</Text>
          <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}>
            Session complete. Come back after more lessons for fresh cards.
          </Text>
          <View style={{ marginTop: theme.spacing.xl }}>
            <Button
              title={t('common.done')}
              variant="accent"
              onPress={() => navigation.goBack()}
              accessibilityHint="Closes the flashcard session"
            />
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
    <ScreenContainer scroll={false} onClose={() => navigation.goBack()}>
      <ActivityHeader
        title={t('flashcards.title')}
        current={idx + 1}
        total={deck.length}
        progress={pct}
      />

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setFlipped((f) => !f)}
        style={{ flex: 1, justifyContent: 'center' }}
        accessible
        accessibilityRole="button"
        accessibilityLabel={
          flipped
            ? `${card.english}. Transliteration ${card.transliteration}`
            : `Arabic word. ${t('flashcards.tapToFlip')}`
        }
        accessibilityHint={flipped ? 'Tap to flip back to Arabic' : 'Tap to flip the card and reveal the translation'}
        accessibilityState={{ expanded: flipped }}
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
              {card.imageUrl && (
                <Image
                  source={{ uri: card.imageUrl }}
                  style={{ width: 160, height: 160, marginBottom: theme.spacing.md, borderRadius: theme.radius.md }}
                  resizeMode="contain"
                  accessibilityLabel={card.english ? `Illustration: ${card.english}` : 'Illustration'}
                />
              )}
              <ArabicText size="display" accessibilityLabel={card.transliteration} readAs="label">
                {card.script}
              </ArabicText>
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

      <View
        accessibilityRole="radiogroup"
        accessibilityLabel="Rate how well you knew this card"
        style={{ flexDirection: 'row', marginTop: theme.spacing.md }}
      >
        {RATINGS.map((r) => (
          <TouchableOpacity
            key={r.key}
            disabled={!flipped}
            onPress={() => onRate(r.key)}
            activeOpacity={0.85}
            accessible
            accessibilityRole="button"
            accessibilityLabel={t(r.labelKey)}
            accessibilityHint={flipped ? `Records this card as "${t(r.labelKey)}"` : 'Flip the card before rating'}
            accessibilityState={{ disabled: !flipped }}
            style={{
              flex: 1,
              marginHorizontal: 4,
              paddingVertical: 14,
              backgroundColor: flipped ? r.color : theme.colors.gray200,
              borderRadius: theme.radius.md,
              alignItems: 'center',
              opacity: flipped ? 1 : 0.5,
              minHeight: 48,
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
