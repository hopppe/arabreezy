import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScreenContainer, Text, Button } from '../../components/ui';
import { theme } from '../../theme';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { getConversation } from '../../../backend/localBackend';
import GuidedConversationInterface from './GuidedConversationInterface';

// Loads the scenario for the route's conversationId, then hands it off to the
// interface. The interface does everything else (audio, AI, completion).
export default function GuidedConversationScreen({ route, navigation }) {
  const { dialect } = useDialect();
  const { completeLesson } = useUserProgress();
  const conversationId = route.params?.conversationId;

  const [scenarioData, setScenarioData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setScenarioData(null);
    setNotFound(false);

    getConversation({ dialect, conversationId })
      .then((c) => {
        if (cancelled) return;
        if (!c) {
          setNotFound(true);
          return;
        }
        setScenarioData(c);
      })
      .catch(() => {
        if (!cancelled) setNotFound(true);
      });

    return () => {
      cancelled = true;
    };
  }, [dialect, conversationId]);

  const handleComplete = async () => {
    if (scenarioData) {
      await completeLesson(`convo:${scenarioData.id}`, { advancePhase: false });
    }
    navigation.goBack();
  };

  if (notFound) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text variant="display" weight="bold" accessibilityRole="header">Conversation unavailable</Text>
        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
          We couldn't load this scenario. Try another one.
        </Text>
        <View style={{ marginTop: theme.spacing.lg }}>
          <Button
            title="Back"
            variant="accent"
            onPress={() => navigation.goBack()}
            accessibilityHint="Returns to the conversation picker"
          />
        </View>
      </ScreenContainer>
    );
  }

  if (!scenarioData) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text accessibilityLiveRegion="polite">Loading…</Text>
      </ScreenContainer>
    );
  }

  return (
    <GuidedConversationInterface
      scenarioData={scenarioData}
      onComplete={handleComplete}
      onBack={() => navigation.goBack()}
    />
  );
}
