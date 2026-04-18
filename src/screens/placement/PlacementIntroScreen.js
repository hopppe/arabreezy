import React from 'react';
import { View } from 'react-native';
import { ScreenContainer, Text, Button } from '../../components/ui';
import { useTranslation } from '../../context/LanguageContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { theme } from '../../theme';

export default function PlacementIntroScreen({ navigation }) {
  const { t } = useTranslation();
  const { completePlacement } = useUserProgress();

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text variant="display" weight="bold">{t('placement.welcomeTitle')}</Text>
        <Text variant="body" style={{ marginTop: theme.spacing.md, color: theme.colors.textMuted }}>
          {t('placement.welcomeBody')}
        </Text>
        <View style={{ marginTop: theme.spacing.xl }}>
          <Button
            title={t('placement.begin')}
            onPress={() => navigation.navigate('PlacementQuestion', { index: 0, answers: [] })}
            variant="accent"
          />
          <View style={{ height: theme.spacing.md }} />
          <Button
            title={t('placement.skip')}
            variant="ghost"
            onPress={() => completePlacement({ score: 0, placedLevel: 1 })}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
