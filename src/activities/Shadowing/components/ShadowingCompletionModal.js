import React from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Text } from '../../../components/ui';
import { theme } from '../../../theme';

// Simple "great job" modal shown after the last sentence is shadowed.
// Mirrors the English app's ShadowingCompletionModal in structure.
export default function ShadowingCompletionModal({
  visible,
  totalSentences,
  averageScore,
  onContinue,
  onClose,
}) {
  const scorePct = typeof averageScore === 'number'
    ? Math.round(averageScore * 100)
    : null;

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
            padding: 24,
            width: '100%',
            maxWidth: 380,
            alignItems: 'center',
          }}
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
            style={{ marginTop: 12, textAlign: 'center' }}
          >
            Great job!
          </Text>
          <Text
            variant="small"
            style={{ color: theme.colors.textMuted, marginTop: 6, textAlign: 'center' }}
          >
            {totalSentences
              ? `You shadowed ${totalSentences} sentence${totalSentences === 1 ? '' : 's'}.`
              : 'Lesson complete.'}
          </Text>
          {scorePct != null ? (
            <Text
              weight="bold"
              accessibilityLabel={`Average score: ${scorePct} percent`}
              style={{ color: theme.colors.accent, marginTop: 12, fontSize: 24 }}
            >
              {scorePct}%
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={onContinue}
            activeOpacity={0.85}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Continue"
            accessibilityHint="Closes this dialog and returns to the lesson"
            style={{
              marginTop: 20,
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
        </View>
      </View>
    </Modal>
  );
}
