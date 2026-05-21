import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card } from '../components/ui';
import { PhaseBadge } from '../components/PhaseBadge';
import { theme } from '../theme';
import { useTranslation } from '../context/LanguageContext';
import { useUserProgress } from '../context/UserProgressContext';

// All activities reachable from one place.
export default function ActivitiesScreen({ navigation }) {
  const { t } = useTranslation();
  const { progress } = useUserProgress();

  const primerDone = progress.lessonsCompleted.includes('primer:root-system');

  const items = [
    {
      key: 'primer',
      featured: !primerDone,
      title: t('activities.primer'),
      desc: t('activities.primerDesc'),
      badge: primerDone ? t('activities.primerDone') : t('activities.primerNew'),
      onPress: () => navigation.navigate('Primer'),
    },
    // 'lessons' (legacy hand-authored set) is intentionally hidden from this
    // grid — the unit flow on Home is the primary lesson path now. The
    // LessonsList / Lesson routes stay registered in TabNavigator as an
    // offline fallback so deep links and ProgressScreen stats keep working.
    {
      key: 'flashcards',
      title: t('activities.flashcards'),
      desc: t('activities.flashcardsDesc'),
      onPress: () => navigation.navigate('Flashcards'),
    },
    {
      key: 'stories',
      title: t('activities.stories'),
      desc: t('activities.storiesDesc'),
      onPress: () => navigation.navigate('Stories', { phase: progress.phase }),
    },
    {
      key: 'listening',
      title: t('activities.listening'),
      desc: t('activities.listeningDesc'),
      onPress: () => navigation.navigate('Listening', { phase: progress.phase }),
    },
    {
      key: 'guidedConversation',
      title: t('activities.guidedConversation'),
      desc: t('activities.guidedConversationDesc'),
      onPress: () => navigation.navigate('GuidedConversationPicker'),
    },
    {
      key: 'shadowing',
      title: t('activities.shadowing'),
      desc: t('activities.shadowingDesc'),
      onPress: () => navigation.navigate('Shadowing', { phase: progress.phase }),
    },
    {
      key: 'pronunciation',
      title: t('activities.pronunciation'),
      desc: t('activities.pronunciationDesc'),
      onPress: () => navigation.navigate('Pronunciation', { phase: progress.phase }),
    },
    {
      key: 'grammar',
      title: t('activities.grammar'),
      desc: t('activities.grammarDesc'),
      onPress: () => navigation.navigate('Grammar', { phase: progress.phase }),
    },
    {
      key: 'idioms',
      title: t('activities.idioms'),
      desc: t('activities.idiomsDesc'),
      onPress: () => navigation.navigate('Idioms', { phase: progress.phase }),
    },
    {
      key: 'roots',
      title: t('activities.roots'),
      desc: t('activities.rootsDesc'),
      onPress: () => navigation.navigate('Roots'),
    },
    {
      key: 'chat',
      title: t('activities.chat'),
      desc: t('activities.chatDesc'),
      onPress: () => navigation.navigate('Chat', { phase: progress.phase }),
    },
    {
      key: 'voiceChat',
      title: t('activities.voiceChat'),
      desc: t('activities.voiceChatDesc'),
      onPress: () => navigation.navigate('VoiceChat', { phase: progress.phase }),
    },
  ];

  return (
    <ScreenContainer>
      <PhaseBadge phase={progress.phase} />
      <Text variant="display" weight="bold" accessibilityRole="header" style={{ marginTop: theme.spacing.sm }}>
        {t('activities.title')}
      </Text>
      <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
        {t('activities.subtitle')}
      </Text>

      <View
        accessibilityRole="menu"
        accessibilityLabel={t('activities.title')}
        style={{
          marginTop: theme.spacing.lg,
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: -theme.spacing.xs,
        }}
      >
        {items.map((item) => (
          <View
            key={item.key}
            style={{
              width: '50%',
              paddingHorizontal: theme.spacing.xs,
              marginBottom: theme.spacing.md,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={item.onPress}
              style={{ flex: 1 }}
              accessible
              accessibilityRole="button"
              accessibilityLabel={item.badge ? `${item.title}, ${item.badge}` : item.title}
              accessibilityHint={item.desc}
              testID={`activity-${item.key}`}
            >
              <Card
                style={{
                  flex: 1,
                  marginBottom: 0,
                  borderColor: item.featured ? theme.colors.accent : theme.colors.border,
                  borderWidth: item.featured ? 2 : 1,
                  minHeight: 130,
                }}
              >
                {item.badge && (
                  <View
                    importantForAccessibility="no"
                    style={{
                      alignSelf: 'flex-start',
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: theme.radius.pill,
                      backgroundColor:
                        item.key === 'primer' && !primerDone
                          ? theme.colors.accent
                          : theme.colors.success,
                      marginBottom: 6,
                    }}
                  >
                    <Text variant="caption" weight="bold" style={{ color: theme.colors.white }}>
                      {item.badge}
                    </Text>
                  </View>
                )}
                <Text weight="bold" variant="subtitle" numberOfLines={2}>
                  {item.title}
                </Text>
                <Text
                  variant="small"
                  style={{ color: theme.colors.textMuted, marginTop: 4 }}
                  numberOfLines={3}
                >
                  {item.desc}
                </Text>
              </Card>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}
