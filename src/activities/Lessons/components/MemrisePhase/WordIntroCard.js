import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, Button, Card } from '../../../../components/ui';
import { ArabicText } from '../../../../components/ArabicText';
import { theme } from '../../../../theme';
import { playWordAudio } from '../../../../services/audio';

export default function WordIntroCard({ word, pairProgress, onContinue }) {
  const [playing, setPlaying] = useState(false);
  const lastSpokenIdRef = useRef(null);

  const speakWord = async () => {
    if (!word) return;
    setPlaying(true);
    try {
      await playWordAudio(word);
    } catch (_) {
      // non-fatal — audio is best-effort
    } finally {
      setPlaying(false);
    }
  };

  // Auto-play once per word when the card mounts / when the focal word changes.
  useEffect(() => {
    if (!word?.id || lastSpokenIdRef.current === word.id) return;
    lastSpokenIdRef.current = word.id;
    speakWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word?.id]);

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
          <Pressable
            onPress={speakWord}
            disabled={playing}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={`Play pronunciation of ${word.transliteration}`}
            accessibilityHint="Plays the Saudi-Arabic pronunciation of this word"
            style={({ pressed }) => [
              styles.speakerBtn,
              { opacity: playing ? 0.5 : pressed ? 0.7 : 1 },
            ]}
          >
            <Ionicons
              name={playing ? 'volume-high' : 'volume-medium-outline'}
              size={22}
              color={theme.colors.accent}
            />
          </Pressable>
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
  speakerBtn: {
    marginTop: 14,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray100,
  },
  translit: {
    marginTop: 14,
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
