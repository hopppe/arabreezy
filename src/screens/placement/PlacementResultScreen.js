import React from 'react';
import { View } from 'react-native';
import { ScreenContainer, Text, Button } from '../../components/ui';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { getLevel } from '../../data/levels';

export default function PlacementResultScreen({ route }) {
  const { t } = useTranslation();
  const { completePlacement } = useUserProgress();
  const { placedLevel = 1, score = 0 } = route.params || {};
  const level = getLevel(placedLevel);

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text variant="display" weight="bold">
          {t('placement.resultTitle', { level: placedLevel })}
        </Text>
        <Text variant="subtitle" style={{ marginTop: theme.spacing.sm, color: theme.colors.textMuted }}>
          {level.title} · {level.cefr}
        </Text>
        <Text variant="body" style={{ marginTop: theme.spacing.md, color: theme.colors.textMuted }}>
          {t('placement.resultBody')}
        </Text>
        <View style={{ marginTop: theme.spacing.xl }}>
          <Button
            title={t('placement.startLearning')}
            variant="accent"
            onPress={() => completePlacement({ score, placedLevel })}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
