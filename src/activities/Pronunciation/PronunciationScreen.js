import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer, Text, Card, Button, ActivityHeader } from '../../components/ui';
import { ArabicText } from '../../components/ArabicText';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { useAudio } from '../../hooks/useAudio';
import { useMicRecorder, ensureMicPermission, transcribe } from '../../services/recording';
import { play as playUri } from '../../services/audio';
import { getPronunciationTargets } from '../../../backend/localBackend';

// Pronunciation drill: hear target → record yourself → playback + (optional)
// Whisper-based transcription feedback.
export default function PronunciationScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { progress, logActivity } = useUserProgress();
  const phase = route?.params?.phase ?? progress.phase;
  const { playText, playing } = useAudio();
  const recorder = useMicRecorder();

  const [targets, setTargets] = useState([]);
  const [idx, setIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recording, setRecording] = useState(false);
  const [recordedUri, setRecordedUri] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [scoring, setScoring] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getPronunciationTargets({ dialect, phase })
      .then((res) => {
        if (!cancelled) {
          setTargets(res);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.warn('[pronunciation] fetch failed', e);
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [dialect, phase]);

  const target = targets[idx];

  // Auto-play model on each new target.
  useEffect(() => {
    if (target?.script) playText(target.script, { dialect });
    setRecordedUri(null);
    setTranscript(null);
  }, [target?.script, dialect, playText]);

  if (loading) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text accessibilityLiveRegion="polite">{t('common.loading')}</Text>
      </ScreenContainer>
    );
  }

  if (!targets.length) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <Text variant="display" weight="bold" accessibilityRole="header">{t('pronunciation.title')}</Text>
        <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}>
          {t('pronunciation.empty')}
        </Text>
        <View style={{ marginTop: theme.spacing.xl }}>
          <Button
            title={t('common.back')}
            variant="ghost"
            onPress={() => navigation.goBack()}
            accessibilityHint="Returns to the previous screen"
          />
        </View>
      </ScreenContainer>
    );
  }

  if (!target) {
    return (
      <ScreenContainer onClose={() => navigation.goBack()}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text variant="display" weight="bold" accessibilityRole="header">{t('pronunciation.complete')}</Text>
          <Text variant="body" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.md }}>
            {t('pronunciation.completeBody', { n: targets.length })}
          </Text>
          <View style={{ marginTop: theme.spacing.xl }}>
            <Button
              title={t('common.done')}
              variant="accent"
              onPress={() => navigation.goBack()}
              accessibilityHint="Closes the pronunciation drill"
            />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  const onListen = () => playText(target.script, { dialect });

  const onRecord = async () => {
    Haptics.selectionAsync().catch(() => {});
    if (recording) {
      try {
        await recorder.stop();
        const uri = recorder.uri;
        setRecordedUri(uri || null);
        setRecording(false);
        // Try to transcribe & score in the background.
        if (uri) {
          setScoring(true);
          try {
            const text = await transcribe(uri, { language: 'ar' });
            setTranscript(text);
          } catch (_) {
            setTranscript(null);
          } finally {
            setScoring(false);
          }
        }
      } catch (e) {
        setRecording(false);
      }
      return;
    }
    const ok = await ensureMicPermission();
    if (!ok) {
      Alert.alert(t('pronunciation.micDenied'), t('pronunciation.micDeniedBody'));
      return;
    }
    try {
      await recorder.prepareToRecordAsync();
      recorder.record();
      setRecording(true);
    } catch (e) {
      setRecording(false);
    }
  };

  const onPlayback = async () => {
    if (recordedUri) await playUri(recordedUri);
  };

  const onNext = () => {
    if (idx + 1 >= targets.length) {
      logActivity({ type: 'pronunciation', contentId: target.id, dialect, phase: target.phase });
    }
    setIdx(idx + 1);
    setRecording(false);
    setRecordedUri(null);
    setTranscript(null);
  };

  // Cheap similarity: strip diacritics + whitespace, compare to target.
  const normalize = (s) => (s || '')
    .replace(/[ًٌٍَُِّْـ]/g, '')
    .replace(/\s+/g, '')
    .trim();
  const isMatch = transcript && normalize(transcript).includes(normalize(target.script));

  return (
    <ScreenContainer scroll={false} onClose={() => navigation.goBack()}>
      <ActivityHeader
        title={t('pronunciation.title')}
        current={idx + 1}
        total={targets.length}
        progress={(idx / targets.length) * 100}
      />

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card style={{ padding: theme.spacing.lg, backgroundColor: theme.colors.accentSoft }}>
          <ArabicText
            size="display"
            accessibilityLabel={`Target word, pronounced ${target.transliteration}`}
          >
            {target.script}
          </ArabicText>
          <Text variant="subtitle" style={{ marginTop: theme.spacing.md, color: theme.colors.textMuted }}>
            {target.transliteration}
          </Text>
          <Text variant="body" style={{ marginTop: theme.spacing.sm }}>{target.english}</Text>
          {target.focusPhonemes?.length > 0 && (
            <View
              accessibilityLabel={`Focus sounds: ${target.focusPhonemes.join(', ')}`}
              style={{ flexDirection: 'row', marginTop: theme.spacing.md, flexWrap: 'wrap' }}
            >
              {target.focusPhonemes.map((p, i) => (
                <View
                  key={i}
                  importantForAccessibility="no"
                  style={{
                    backgroundColor: theme.colors.white,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: theme.radius.pill,
                    marginRight: 6,
                    marginBottom: 6,
                  }}
                >
                  <Text variant="caption" weight="bold">{p}</Text>
                </View>
              ))}
            </View>
          )}
          {target.notes && (
            <Text variant="small" style={{ marginTop: theme.spacing.md, color: theme.colors.textMuted }}>
              {target.notes}
            </Text>
          )}
          {playing === target.script && (
            <Text
              variant="caption"
              accessibilityLiveRegion="polite"
              style={{ marginTop: 6, color: theme.colors.accent }}
            >
              ▶ playing…
            </Text>
          )}
        </Card>

        {transcript != null && (
          <Card
            accessible
            accessibilityRole={isMatch ? undefined : 'alert'}
            accessibilityLiveRegion="polite"
            accessibilityLabel={`${isMatch ? t('pronunciation.matchYes') : t('pronunciation.matchNo')}. Heard: ${transcript || 'nothing'}`}
            style={{
              marginTop: theme.spacing.md,
              borderColor: isMatch ? theme.colors.success : theme.colors.warning,
              borderWidth: 1.5,
            }}
          >
            <Text variant="caption" weight="bold" style={{ color: theme.colors.textMuted }}>
              {isMatch ? t('pronunciation.matchYes') : t('pronunciation.matchNo')}
            </Text>
            <ArabicText style={{ marginTop: 6 }}>{transcript || '—'}</ArabicText>
          </Card>
        )}
        {scoring && (
          <Text
            variant="small"
            accessibilityLiveRegion="polite"
            style={{ marginTop: theme.spacing.sm, color: theme.colors.textMuted }}
          >
            {t('pronunciation.scoring')}
          </Text>
        )}
      </View>

      <View style={{ flexDirection: 'row', marginTop: theme.spacing.md }}>
        <TouchableOpacity
          onPress={onListen}
          activeOpacity={0.85}
          accessible
          accessibilityRole="button"
          accessibilityLabel={t('pronunciation.listen')}
          accessibilityHint="Plays the target pronunciation"
          style={{
            flex: 1,
            marginRight: 8,
            paddingVertical: 14,
            borderRadius: theme.radius.pill,
            borderWidth: 1.5,
            borderColor: theme.colors.black,
            alignItems: 'center',
            minHeight: 48,
            justifyContent: 'center',
          }}
        >
          <Text weight="bold">{t('pronunciation.listen')}</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Button
            title={recording ? t('pronunciation.stop') : t('pronunciation.record')}
            variant="accent"
            onPress={onRecord}
            accessibilityHint={recording ? 'Stops recording and transcribes your audio' : 'Records your pronunciation for feedback'}
            accessibilityLabel={recording ? t('pronunciation.stop') : t('pronunciation.record')}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginTop: theme.spacing.sm }}>
        {recordedUri && (
          <View style={{ flex: 1, marginRight: 8 }}>
            <Button
              title={t('pronunciation.playback')}
              variant="ghost"
              onPress={onPlayback}
              accessibilityHint="Plays back what you just recorded"
            />
          </View>
        )}
        <View style={{ flex: 1, marginLeft: recordedUri ? 8 : 0 }}>
          <Button
            title={t('common.next')}
            variant="ghost"
            onPress={onNext}
            accessibilityHint="Skips to the next pronunciation target"
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
