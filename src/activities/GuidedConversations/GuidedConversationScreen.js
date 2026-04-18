import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenContainer, Text, Card, Button } from '../../components/ui';
import { ArabicText } from '../../components/ArabicText';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { getConversation } from '../../../backend/localBackend';

export default function GuidedConversationScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { completeLesson } = useUserProgress();  // we stash convo completion as 'convo:<id>'
  const conversationId = route.params?.conversationId;

  const [convo, setConvo] = useState(null);
  const [stepId, setStepId] = useState(null);
  const [log, setLog] = useState([]);          // { speaker, text, translation }
  const [lastFeedback, setLastFeedback] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getConversation({ dialect, conversationId }).then((c) => {
      if (cancelled || !c) return;
      setConvo(c);
      const first = c.steps[0];
      setStepId(first?.id || null);
      if (first?.speaker === 'partner') {
        setLog([{ speaker: 'partner', text: first.text, translation: first.translation }]);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [dialect, conversationId]);

  if (!convo) {
    return (
      <ScreenContainer>
        <Text>{t('common.loading')}</Text>
      </ScreenContainer>
    );
  }

  const currentStep = convo.steps.find((s) => s.id === stepId);

  const advancePartner = () => {
    if (!currentStep || currentStep.end) {
      finishConversation();
      return;
    }
    if (!currentStep.next) {
      finishConversation();
      return;
    }
    const next = convo.steps.find((s) => s.id === currentStep.next);
    if (!next) return finishConversation();
    setStepId(next.id);
    if (next.speaker === 'partner') {
      setLog((l) => [...l, { speaker: 'partner', text: next.text, translation: next.translation }]);
      if (next.end) {
        // show final partner line then finish on next continue
      }
    }
  };

  const pickOption = (option) => {
    setLog((l) => [
      ...l,
      { speaker: 'user', text: option.text, translation: option.translation },
    ]);
    setLastFeedback(option.feedback || null);
    const next = convo.steps.find((s) => s.id === option.nextStepId);
    if (!next) return finishConversation();
    setStepId(next.id);
    if (next.speaker === 'partner') {
      setLog((l) => [...l, { speaker: 'partner', text: next.text, translation: next.translation }]);
    }
  };

  const finishConversation = async () => {
    setDone(true);
    await completeLesson(`convo:${convo.id}`, { advanceLevel: false });
  };

  return (
    <ScreenContainer>
      <Text variant="caption" style={{ color: theme.colors.textMuted }}>
        {t('conversation.title')} · Level {convo.level}
      </Text>
      <Text variant="title" weight="bold" style={{ marginTop: 4 }}>
        {convo.title}
      </Text>
      <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
        {convo.description}
      </Text>

      <ScrollView style={{ marginTop: theme.spacing.lg }}>
        {log.map((m, i) => (
          <Card
            key={i}
            style={{
              marginBottom: theme.spacing.sm,
              alignSelf: m.speaker === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              backgroundColor: m.speaker === 'user' ? theme.colors.accentSoft : theme.colors.surface,
            }}
          >
            <ArabicText size="md">{m.text}</ArabicText>
            {m.translation && (
              <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
                {m.translation}
              </Text>
            )}
          </Card>
        ))}
      </ScrollView>

      {lastFeedback && !done && (
        <Card style={{ marginTop: theme.spacing.sm, backgroundColor: theme.colors.surfaceMuted }}>
          <Text variant="small" style={{ color: theme.colors.textMuted }}>
            {lastFeedback}
          </Text>
        </Card>
      )}

      {!done && currentStep?.speaker === 'user' && (
        <View style={{ marginTop: theme.spacing.md }}>
          <Text variant="small" style={{ color: theme.colors.textMuted, marginBottom: 6 }}>
            {currentStep.prompt || t('conversation.pickReply')}
          </Text>
          {currentStep.options.map((o, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.85}
              onPress={() => pickOption(o)}
            >
              <Card style={{ marginBottom: 8 }}>
                <ArabicText size="md">{o.text}</ArabicText>
                <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
                  {o.translation}
                </Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {!done && currentStep?.speaker === 'partner' && (
        <View style={{ marginTop: theme.spacing.md }}>
          <Button
            title={currentStep.end ? t('common.done') : t('common.continue')}
            onPress={advancePartner}
            variant="accent"
          />
        </View>
      )}

      {done && (
        <View style={{ marginTop: theme.spacing.md }}>
          <Card>
            <Text weight="bold">{t('conversation.complete')}</Text>
            <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
              {convo.completionMessage}
            </Text>
          </Card>
          <View style={{ marginTop: theme.spacing.md }}>
            <Button
              title={t('common.back')}
              variant="accent"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      )}
    </ScreenContainer>
  );
}
