import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, Button, EmptyState, SkeletonList, ActivityHeader } from '../../components/ui';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { getStories } from '../../../backend/localBackend';

export default function StoryListScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { progress } = useUserProgress();
  const phase = route?.params?.phase ?? progress.phase;
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getStories({ dialect, phase }).then((res) => {
      if (!cancelled) {
        setStories(res);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [dialect, phase]);

  if (loading) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <ActivityHeader title={t('stories.title')} />
        <SkeletonList count={4} height={80} />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer onClose={() => navigation.goBack()}>
      <ActivityHeader title={t('stories.title')} subtitle={t('stories.subtitle')} />

      {stories.length === 0 ? (
        <EmptyState
          icon="📖"
          title={t('stories.title')}
          body={t('stories.empty')}
          actionLabel={t('common.back')}
          onAction={() => navigation.goBack()}
        />
      ) : (
        <View accessibilityRole="list" accessibilityLabel={t('stories.title')}>
          {stories.map((s) => {
            const titleAr = s.title?.arabic ?? s.title;
            const titleEn = s.title?.english ?? s.titleEnglish;
            const duration = s.estimated_reading_time ?? s.estimatedDuration;
            const a11yLabel = [
              titleEn || titleAr,
              duration ? `${duration} minutes` : null,
              s.topic ? `Topic: ${s.topic}` : null,
            ]
              .filter(Boolean)
              .join('. ');
            return (
              <TouchableOpacity
                key={s.id}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('StoryReader', { storyId: s.id })}
                accessible
                accessibilityRole="button"
                accessibilityLabel={a11yLabel}
                accessibilityHint="Opens this story"
              >
                <Card style={{ marginBottom: theme.spacing.md }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text
                      style={{ fontSize: 28, marginRight: 12 }}
                      accessibilityElementsHidden
                      importantForAccessibility="no"
                    >
                      {s.icon || '📖'}
                    </Text>
                    <View style={{ flex: 1 }}>
                      <Text weight="bold" variant="subtitle">{titleAr}</Text>
                      {titleEn && (
                        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
                          {titleEn}
                        </Text>
                      )}
                      <Text variant="caption" style={{ color: theme.colors.textMuted, marginTop: 4 }}>
                        {duration ? `${duration} min` : ''}
                        {s.topic ? ` · ${s.topic}` : ''}
                      </Text>
                    </View>
                    <Text
                      weight="bold"
                      accessibilityElementsHidden
                      importantForAccessibility="no"
                      style={{ color: theme.colors.accent, fontSize: 20 }}
                    >
                      →
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </ScreenContainer>
  );
}
