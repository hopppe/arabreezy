import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, ActivityHeader, FocalWordsBanner } from '../components/ui';
import { theme } from '../theme';
import { useTranslation } from '../context/LanguageContext';
import { useDialect } from '../context/DialectContext';
import { useUserProgress } from '../context/UserProgressContext';
import { getConversations } from '../../backend/localBackend';

// Picker shown when the user opens Guided Conversation from the Activities
// tab. Pulls the full list from the backend façade so the ids/shape stay
// consistent with what the conversation renderer will then fetch.
export default function GuidedConversationPickerScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { progress } = useUserProgress();
  const focalWords = route?.params?.focalWords;

  const [available, setAvailable] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getConversations({ dialect, phase: progress.phase })
      .then((rows) => {
        if (cancelled) return;
        setAvailable(rows || []);
      })
      .catch(() => {
        if (!cancelled) setAvailable([]);
      });
    return () => {
      cancelled = true;
    };
  }, [dialect, progress.phase]);

  // When opened from a unit, surface conversations that drill at least one of
  // the 8 focals first; rest still appear below so the user has options.
  const orderedConversations = useMemo(() => {
    if (!available) return null;
    if (!Array.isArray(focalWords) || focalWords.length === 0) return available;
    const focalIds = new Set(focalWords.map((w) => w.id).filter(Boolean));
    if (focalIds.size === 0) return available;
    const score = (c) => (c.focalWordIds || []).reduce((n, id) => n + (focalIds.has(id) ? 1 : 0), 0);
    return [...available].sort((a, b) => score(b) - score(a));
  }, [available, focalWords]);

  return (
    <ScreenContainer onClose={() => navigation.goBack()}>
      <ActivityHeader
        title={t('conversation.title')}
        subtitle={`Phase ${progress.phase} conversations.`}
      />
      <FocalWordsBanner words={focalWords} />

      <View>
        {orderedConversations === null && (
          <Text variant="body" style={{ color: theme.colors.textMuted }}>
            {t('common.loading')}
          </Text>
        )}
        {orderedConversations && orderedConversations.length === 0 && (
          <Text variant="body" style={{ color: theme.colors.textMuted }}>
            No conversations available yet at your phase.
          </Text>
        )}
        {orderedConversations && orderedConversations.map((c) => {
          const done = progress.lessonsCompleted.includes(`convo:${c.id}`);
          return (
            <TouchableOpacity
              key={c.id}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('GuidedConversation', { conversationId: c.id })}
              accessible
              accessibilityRole="button"
              accessibilityLabel={`${c.title}. Phase ${c.phase}${done ? '. Completed' : ''}`}
              accessibilityHint={c.description || 'Opens this guided conversation'}
            >
              <Card
                style={{
                  marginBottom: theme.spacing.md,
                  borderColor: done ? theme.colors.success : theme.colors.border,
                }}
              >
                <Text variant="caption" style={{ color: theme.colors.textFaint }}>
                  Phase {c.phase}
                </Text>
                <Text weight="bold" style={{ marginTop: 2 }}>{c.title}</Text>
                {c.description && (
                  <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
                    {c.description}
                  </Text>
                )}
                {done && (
                  <Text variant="caption" style={{ color: theme.colors.success, marginTop: 6 }}>
                    ✓ Completed
                  </Text>
                )}
              </Card>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScreenContainer>
  );
}
