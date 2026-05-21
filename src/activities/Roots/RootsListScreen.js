import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Card, Button, ActivityHeader } from '../../components/ui';
import { ArabicText } from '../../components/ArabicText';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { getRoots } from '../../../backend/localBackend';

// Browse roots grouped by phase. Phases ≤ user.phase are "unlocked" and
// tappable; phases above are visible but greyed out so the learner can see
// what's ahead without prematurely diving in.
export default function RootsListScreen({ navigation }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { progress } = useUserProgress();
  const userPhase = progress.phase;

  const [roots, setRoots] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getRoots({ dialect })
      .then((res) => {
        if (cancelled) return;
        const list = Array.isArray(res) ? res : Object.values(res || {});
        setRoots(list);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
    return () => { cancelled = true; };
  }, [dialect]);

  const grouped = useMemo(() => {
    const byPhase = new Map();
    for (let p = 1; p <= 10; p++) byPhase.set(p, []);
    for (const r of roots) {
      const p = r.introducedAt ?? 1;
      if (!byPhase.has(p)) byPhase.set(p, []);
      byPhase.get(p).push(r);
    }
    for (const [, arr] of byPhase) {
      arr.sort((a, b) => (a.freqRank ?? 9999) - (b.freqRank ?? 9999));
    }
    return [...byPhase.entries()].sort((a, b) => a[0] - b[0]);
  }, [roots]);

  if (!loaded) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <ActivityHeader title={t('roots.title')} subtitle={t('roots.subtitle')} />
        <Text
          variant="body"
          accessibilityLiveRegion="polite"
          style={{ color: theme.colors.textMuted }}
        >
          {t('common.loading')}
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer onClose={() => navigation.goBack()} scroll={false}>
      <ActivityHeader title={t('roots.title')} subtitle={t('roots.subtitle')} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: theme.spacing.xl }}>
        {grouped.map(([phase, list]) => {
          if (list.length === 0) return null;
          const locked = phase > userPhase + 1;
          return (
            <View key={phase} style={{ marginTop: theme.spacing.lg }}>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Text variant="title" weight="bold" accessibilityRole="header">
                  {t('roots.phaseLabel', { n: phase })}
                </Text>
                <Text
                  variant="caption"
                  accessibilityLabel={`${list.length} ${list.length === 1 ? t('roots.root') : t('roots.roots')}`}
                  style={{ color: theme.colors.textMuted }}
                >
                  {list.length} {list.length === 1 ? t('roots.root') : t('roots.roots')}
                </Text>
              </View>
              <View
                accessibilityRole="list"
                accessibilityLabel={t('roots.phaseLabel', { n: phase })}
                style={{ marginTop: theme.spacing.sm }}
              >
                {list.map((root) => (
                  <RootCard
                    key={root.id}
                    root={root}
                    locked={locked}
                    onPress={() => navigation.navigate('RootFamily', { rootId: root.id })}
                  />
                ))}
              </View>
            </View>
          );
        })}
        <View style={{ marginTop: theme.spacing.xl }}>
          <Button
            title={t('common.back')}
            variant="ghost"
            onPress={() => navigation.goBack()}
            accessibilityHint="Returns to the previous screen"
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function RootCard({ root, locked, onPress }) {
  const opacity = locked ? 0.4 : 1;
  const lettersLabel = (root.letters || []).join(' ');
  return (
    <TouchableOpacity
      onPress={locked ? undefined : onPress}
      activeOpacity={0.7}
      disabled={locked}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Root ${root.transliteration}. Meaning: ${root.core}.${root.saudi ? ' Saudi' : ''}`}
      accessibilityHint={locked ? 'Locked. Reach this phase to unlock.' : 'Opens the family of words derived from this root'}
      accessibilityState={{ disabled: locked }}
      style={{ marginBottom: theme.spacing.sm }}
    >
      <Card style={{ flexDirection: 'row', alignItems: 'center', opacity }}>
        <View
          accessibilityLabel={`Letters: ${lettersLabel}`}
          style={{ flexDirection: 'row', minWidth: 96, justifyContent: 'flex-end' }}
        >
          {(root.letters || []).map((letter, i) => (
            <View
              key={`${root.id}-${i}`}
              importantForAccessibility="no"
              style={{
                width: 28,
                height: 28,
                marginLeft: 4,
                borderRadius: 6,
                backgroundColor: theme.colors.surfaceMuted,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArabicText size="sm">{letter}</ArabicText>
            </View>
          ))}
        </View>
        <View style={{ flex: 1, marginLeft: theme.spacing.md }}>
          <Text weight="bold">{root.transliteration}</Text>
          <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
            {root.core}
          </Text>
          {root.saudi ? (
            <Text variant="caption" style={{ color: theme.colors.accent, marginTop: 4 }}>
              Saudi
            </Text>
          ) : null}
        </View>
      </Card>
    </TouchableOpacity>
  );
}
