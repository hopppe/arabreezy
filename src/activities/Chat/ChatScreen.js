import React, { useMemo, useState } from 'react';
import { View, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer, Text, Card, Button } from '../../components/ui';
import { ArabicText } from '../../components/ArabicText';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { useAudio } from '../../hooks/useAudio';
import { sendChatMessage } from '../../services/aiChat';

// Conversational tutor surface. Uses src/services/aiChat — routes through the
// ai-backend proxy when EXPO_PUBLIC_AI_BACKEND_URL is set, otherwise falls
// back to a friendly local responder. Assistant turns can be tapped to hear
// them via the unified audio service.
export default function ChatScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { progress, logActivity } = useUserProgress();
  const { playText } = useAudio();
  const phase = route?.params?.phase ?? progress.phase;
  const scenarioKey = route?.params?.scenarioKey ?? 'open';
  // requiredWords: [{ id?, script, english, transliteration? }]. When set, the
  // server steers the conversation to elicit them and the user sees a side
  // checklist that ticks each off as their typed message contains it.
  const requiredWords = route?.params?.requiredWords ?? null;

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      arabic: 'أهلًا! خبرني عن يومك بالعربي.',
      english: 'Hi! Tell me about your day in Arabic.',
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  // Tick each required word as soon as the user types it. We compare against
  // the joined Arabic of every user message so far. Diacritics are stripped
  // on both sides so a learner typing without tashkeel still matches.
  const stripDiacritics = (s) =>
    String(s || '').replace(/[ً-ْٰـ]/g, '').trim();

  const usedWords = useMemo(() => {
    if (!Array.isArray(requiredWords) || requiredWords.length === 0) return {};
    const userText = stripDiacritics(
      messages.filter((m) => m.role === 'user').map((m) => m.arabic).join(' ')
    );
    const out = {};
    for (const w of requiredWords) {
      const key = w?.id || w?.script;
      if (!key) continue;
      const target = stripDiacritics(w.script);
      out[key] = target.length > 0 && userText.includes(target);
    }
    return out;
  }, [messages, requiredWords]);

  const requiredRemaining = useMemo(() => {
    if (!requiredWords) return null;
    return requiredWords.filter((w) => !usedWords[w?.id || w?.script]).length;
  }, [requiredWords, usedWords]);

  const onSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || sending) return;
    Haptics.selectionAsync().catch(() => {});
    const userMsg = { role: 'user', arabic: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setSending(true);
    try {
      const reply = await sendChatMessage({
        history: nextMessages,
        dialect,
        phase,
        scenarioKey,
        requiredWords,
      });
      setMessages((prev) => [...prev, reply]);
      // Auto-play the assistant reply.
      if (reply?.arabic) playText(reply.arabic, { dialect });
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', arabic: 'حدث خطأ في الاتصال.', english: 'There was a connection error.' },
      ]);
    } finally {
      setSending(false);
    }
  };

  const onFinish = () => {
    logActivity({ type: 'chat', dialect, phase });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenContainer scroll={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="subtitle" weight="bold" accessibilityRole="header">{t('chat.title')}</Text>
          <TouchableOpacity
            onPress={onFinish}
            accessible
            accessibilityRole="button"
            accessibilityLabel={t('chat.finish')}
            accessibilityHint="Ends the chat and returns to the previous screen"
            hitSlop={10}
          >
            <Text style={{ color: theme.colors.accent, fontWeight: '700' }}>{t('chat.finish')}</Text>
          </TouchableOpacity>
        </View>
        <Text variant="caption" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
          {t('chat.subtitle')}
        </Text>

        {Array.isArray(requiredWords) && requiredWords.length > 0 ? (
          <Card style={{ marginTop: theme.spacing.sm, padding: theme.spacing.sm }}>
            <Text variant="caption" weight="bold" style={{ color: theme.colors.textMuted }}>
              Use these words ({requiredRemaining} left)
            </Text>
            <View
              accessibilityRole="list"
              accessibilityLabel={`Required words. ${requiredRemaining} remaining.`}
              style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}
            >
              {requiredWords.map((w) => {
                const key = w?.id || w?.script;
                const used = usedWords[key];
                return (
                  <View
                    key={key}
                    accessible
                    accessibilityLabel={`${w.english || w.script}${used ? ', used' : ', not yet used'}`}
                    style={{
                      backgroundColor: used ? theme.colors.success : theme.colors.surfaceMuted,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: theme.radius.pill,
                      marginRight: 6,
                      marginBottom: 6,
                    }}
                  >
                    <Text variant="caption" accessible={false} style={{ color: used ? theme.colors.white : theme.colors.text }}>
                      {used ? '✓ ' : ''}{w.script}
                    </Text>
                  </View>
                );
              })}
            </View>
          </Card>
        ) : null}

        <ScrollView
          accessibilityLabel="Chat history"
          style={{ flex: 1, marginTop: theme.spacing.md }}
          contentContainerStyle={{ paddingBottom: theme.spacing.lg }}
        >
          {messages.map((m, i) => {
            const speaker = m.role === 'user' ? 'You' : 'Tutor';
            const a11y = m.english
              ? `${speaker} said: ${m.arabic}. ${m.english}`
              : `${speaker} said: ${m.arabic}`;
            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.85}
                onPress={() => playText(m.arabic, { dialect })}
                disabled={m.role === 'user'}
                accessible
                accessibilityRole="button"
                accessibilityLabel={a11y}
                accessibilityHint={m.role === 'user' ? undefined : 'Tap to hear this message'}
                accessibilityState={{ disabled: m.role === 'user' }}
                style={{
                  marginBottom: 10,
                  alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Card
                  style={{
                    maxWidth: '88%',
                    backgroundColor: m.role === 'user' ? theme.colors.accent : theme.colors.surfaceMuted,
                  }}
                >
                  <ArabicText style={{ color: m.role === 'user' ? theme.colors.white : theme.colors.text }}>
                    {m.arabic}
                  </ArabicText>
                  {m.english && (
                    <Text
                      variant="small"
                      style={{ marginTop: 4, color: m.role === 'user' ? theme.colors.white : theme.colors.textMuted }}
                    >
                      {m.english}
                    </Text>
                  )}
                </Card>
              </TouchableOpacity>
            );
          })}
          {sending && (
            <Text
              variant="small"
              accessibilityLiveRegion="polite"
              accessibilityLabel={t('chat.thinking')}
              style={{ color: theme.colors.textMuted, marginTop: 4 }}
            >
              {t('chat.thinking')}
            </Text>
          )}
        </ScrollView>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: theme.spacing.sm }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder={t('chat.inputPlaceholder')}
              placeholderTextColor={theme.colors.textMuted}
              accessible
              accessibilityLabel="Message"
              accessibilityHint="Type your reply in Arabic"
              style={{
                borderWidth: 1,
                borderColor: theme.colors.border,
                borderRadius: theme.radius.md,
                paddingHorizontal: 12,
                paddingVertical: 10,
                color: theme.colors.text,
                textAlign: 'right',
                writingDirection: 'rtl',
                minHeight: 44,
              }}
              onSubmitEditing={onSend}
              returnKeyType="send"
            />
          </View>
          <View style={{ width: 96 }}>
            <Button
              title={t('chat.send')}
              variant="accent"
              onPress={onSend}
              disabled={sending}
              loading={sending}
              accessibilityHint="Sends your message"
            />
          </View>
        </View>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}
