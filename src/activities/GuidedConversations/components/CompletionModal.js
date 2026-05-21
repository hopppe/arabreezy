import React from 'react';
import { Modal, View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text } from '../../../components/ui';
import { ArabicText } from '../../../components/ArabicText';
import { theme } from '../../../theme';

const REASONS = {
  natural_ending: 'Conversation ended naturally',
  manual_finish: 'You chose to finish',
  goals_achieved: 'All goals achieved!',
};

// End-of-conversation summary. Shows AI-generated feedback when available,
// otherwise a short stat panel.
export default function CompletionModal({ visible, completionData, onContinue, onClose }) {
  const feedback = completionData?.improvementFeedback;
  return (
    <Modal
      visible={!!visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <View
          accessibilityViewIsModal
          accessibilityLiveRegion="polite"
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: 16,
            width: '100%',
            maxWidth: 420,
            maxHeight: '80%',
          }}
        >
          <ScrollView
            contentContainerStyle={{ padding: 24, alignItems: 'center' }}
            showsVerticalScrollIndicator={false}
          >
            <Feather
              name="check-circle"
              size={48}
              color={theme.colors.success}
              accessibilityElementsHidden
              importantForAccessibility="no"
            />
            <Text
              variant="display"
              weight="bold"
              accessibilityRole="header"
              style={{ marginTop: 12, marginBottom: 6, textAlign: 'center' }}
            >
              {feedback ? 'Conversation complete' : 'Great job!'}
            </Text>
            <Text
              variant="small"
              style={{ color: theme.colors.textMuted, textAlign: 'center' }}
            >
              {feedback ? 'Here is what stood out:' : 'You held a real Arabic conversation.'}
            </Text>

            {feedback ? (
              <View style={{ width: '100%', marginTop: 16 }}>
                <ArabicText
                  size="md"
                  accessibilityLabel={feedback.english || feedback.overallAssessment}
                  style={{ textAlign: 'center' }}
                >
                  {feedback.overallAssessment}
                </ArabicText>
                {feedback.english ? (
                  <Text
                    variant="small"
                    style={{
                      color: theme.colors.textMuted,
                      marginTop: 8,
                      textAlign: 'center',
                      fontStyle: 'italic',
                    }}
                  >
                    {feedback.english}
                  </Text>
                ) : null}
              </View>
            ) : completionData ? (
              <View style={{ width: '100%', marginTop: 16 }}>
                <Text
                  variant="small"
                  style={{ color: theme.colors.textMuted, textAlign: 'center' }}
                >
                  {REASONS[completionData.reason] || 'Conversation completed'}
                </Text>
              </View>
            ) : null}

            <TouchableOpacity
              onPress={onContinue}
              activeOpacity={0.85}
              accessible
              accessibilityRole="button"
              accessibilityLabel="Continue"
              accessibilityHint="Closes this dialog and continues"
              style={{
                marginTop: 24,
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: theme.radius.pill,
                backgroundColor: theme.colors.accent,
                minWidth: 140,
                minHeight: 48,
                justifyContent: 'center',
              }}
            >
              <Text weight="bold" style={{ color: theme.colors.white, textAlign: 'center' }}>
                Continue
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
