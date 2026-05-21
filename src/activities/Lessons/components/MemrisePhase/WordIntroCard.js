import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, Button, Card } from '../../../../components/ui';
import { ArabicText } from '../../../../components/ArabicText';
import { theme } from '../../../../theme';

export default function WordIntroCard({ word, pairProgress, onContinue }) {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {pairProgress ? (
          <Text variant="caption" style={styles.progressText}>
            {pairProgress}
          </Text>
        ) : null}

        <Card
          accessible
          accessibilityLabel={`New word: ${word.english}, pronounced ${word.transliteration}. ${word.notes || ''}`}
          style={styles.card}
        >
          {word.imageUrl ? (
            <Image
              source={{ uri: word.imageUrl }}
              style={styles.image}
              resizeMode="contain"
              accessibilityLabel={`Illustration of ${word.english}`}
            />
          ) : null}
          <ArabicText size="display" accessibilityLabel={word.transliteration} readAs="label" style={styles.script}>
            {word.script}
          </ArabicText>
          <Text variant="title" weight="bold" style={styles.translit}>
            {word.transliteration}
          </Text>
          <View style={styles.divider} importantForAccessibility="no" />
          <Text variant="small" style={styles.englishLabel}>
            MEANING
          </Text>
          <Text variant="subtitle" weight="bold" style={styles.english}>
            {word.english}
          </Text>
          {word.notes ? (
            <View style={styles.noteRow}>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color={theme.colors.textMuted}
                accessibilityElementsHidden
                importantForAccessibility="no"
              />
              <Text variant="small" style={styles.noteText}>
                {word.notes}
              </Text>
            </View>
          ) : null}
        </Card>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button
          title="Continue"
          onPress={onContinue}
          variant="primary"
          accessibilityHint="Continues to the next word or quiz"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 120,
  },
  progressText: {
    textAlign: 'center',
    color: theme.colors.textMuted,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  card: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: theme.radius.md,
    marginBottom: 20,
    backgroundColor: theme.colors.gray100,
  },
  script: {
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  translit: {
    marginTop: 12,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  divider: {
    width: 48,
    height: 2,
    backgroundColor: theme.colors.border,
    marginVertical: 20,
  },
  englishLabel: {
    color: theme.colors.textFaint,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  english: {
    textAlign: 'center',
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 20,
    paddingHorizontal: 8,
  },
  noteText: {
    flex: 1,
    color: theme.colors.textMuted,
    lineHeight: 18,
  },
  bottomBar: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 24,
  },
});
