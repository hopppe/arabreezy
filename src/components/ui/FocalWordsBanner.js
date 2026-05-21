import React from 'react';
import { View } from 'react-native';
import { Card } from './Card';
import { Text } from './Text';
import { ArabicText } from '../ArabicText';
import { theme } from '../../theme';

// Strip shown above an activity to remind the learner which 8 words this
// session is supposed to lock in. Rendered only when the screen receives a
// non-empty `focalWords` route param from the Unit flow; standalone opens of
// the same activity (from the Activities tab) skip it entirely.
export function FocalWordsBanner({ words }) {
  if (!Array.isArray(words) || words.length === 0) return null;
  return (
    <Card
      padded={false}
      accessible
      accessibilityLabel={`Today's words: ${words.map((w) => w.english || w.transliteration || w.script).join(', ')}`}
      style={{
        backgroundColor: theme.colors.accentSoft,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        marginBottom: theme.spacing.md,
        borderColor: theme.colors.accent,
      }}
    >
      <Text
        variant="caption"
        weight="bold"
        accessible={false}
        style={{ color: theme.colors.textMuted }}
      >
        Today's words
      </Text>
      <View
        importantForAccessibility="no-hide-descendants"
        style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}
      >
        {words.map((w, i) => (
          <View
            key={w.id || i}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 4,
              marginRight: 6,
              marginBottom: 6,
              backgroundColor: theme.colors.surface,
              borderRadius: theme.radius.pill,
              borderWidth: 1,
              borderColor: theme.colors.border,
            }}
          >
            <ArabicText size="sm" accessibilityLabel={w.english || w.transliteration}>
              {w.script}
            </ArabicText>
            {w.english ? (
              <Text variant="caption" style={{ color: theme.colors.textMuted, marginLeft: 8 }}>
                {w.english}
              </Text>
            ) : null}
          </View>
        ))}
      </View>
    </Card>
  );
}

export default FocalWordsBanner;
