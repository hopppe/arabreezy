import React from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, Button } from '../components/ui';
import { theme } from '../theme';
import { useTranslation } from '../context/LanguageContext';
import { useUserProgress } from '../context/UserProgressContext';
import { useDialect } from '../context/DialectContext';

const DIALECT_LABELS = {
  saudi: 'Saudi',
  levantine: 'Levantine',
  fusha: 'Fusha (MSA)',
};

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { progress, resetAll, setDialect: saveDialect } = useUserProgress();
  const { dialect, setDialect, availableDialects } = useDialect();

  const confirmReset = () => {
    Alert.alert(t('settings.resetProgress'), t('settings.resetConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('common.reset'), style: 'destructive', onPress: resetAll },
    ]);
  };

  const pickDialect = async (d) => {
    await setDialect(d);
    await saveDialect(d);
  };

  return (
    <ScreenContainer>
      <Text variant="display" weight="bold">{t('nav.settings')}</Text>

      <Card style={{ marginTop: theme.spacing.lg }}>
        <Text weight="bold">{t('settings.dialect')}</Text>
        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
          Saudi is the only fully-populated dialect for now. Levantine and Fusha are stubbed.
        </Text>
        <View style={{ marginTop: theme.spacing.md }}>
          {availableDialects.map((d) => {
            const active = dialect === d;
            return (
              <TouchableOpacity
                key={d}
                activeOpacity={0.85}
                onPress={() => pickDialect(d)}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  borderRadius: theme.radius.md,
                  backgroundColor: active ? theme.colors.black : theme.colors.surfaceMuted,
                  marginBottom: 8,
                }}
              >
                <Text weight={active ? 'bold' : 'regular'} style={{ color: active ? theme.colors.white : theme.colors.text }}>
                  {DIALECT_LABELS[d] || d}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Card>

      <Card style={{ marginTop: theme.spacing.lg }}>
        <Text weight="bold">{t('settings.about')}</Text>
        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
          Level: {progress.level} · Lessons completed: {progress.lessonsCompleted.length}
        </Text>
      </Card>

      <View style={{ marginTop: theme.spacing.xl }}>
        <Button title={t('settings.resetProgress')} variant="ghost" onPress={confirmReset} />
      </View>
    </ScreenContainer>
  );
}
