import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Alert, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ScreenContainer, Text, Card, Button } from '../../components/ui';
import { ArabicText } from '../../components/ArabicText';
import { theme } from '../../theme';
import { useTranslation } from '../../context/LanguageContext';
import { useDialect } from '../../context/DialectContext';
import { useUserProgress } from '../../context/UserProgressContext';
import { connectRealtime, isRealtimeConfigured } from '../../services/realtime';

// Voice-to-voice tutor using OpenAI Realtime over WebRTC. Server-side VAD
// handles turn-taking — the user just talks; OpenAI listens, replies via
// speaker, and emits transcripts on the data channel which we render live.
export default function VoiceChatScreen({ navigation, route }) {
  const { t } = useTranslation();
  const { dialect } = useDialect();
  const { progress, logActivity } = useUserProgress();
  const phase = route?.params?.phase ?? progress.phase;

  const sessionRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | connecting | live | error | closed
  const [errorMsg, setErrorMsg] = useState(null);
  const [muted, setMuted] = useState(false);
  const [transcript, setTranscript] = useState([]); // [{ role, text, partial }]
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    return () => { sessionRef.current?.close(); };
  }, []);

  useEffect(() => {
    if (status !== 'live') return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.3, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [status, pulse]);

  const instructions = (
    'You are a warm Arabic conversation partner speaking Saudi-dialect Arabic. ' +
    `The learner is at phase ${phase}/10 (1=beginner, 10=native). Match their level. ` +
    'Keep turns short (1–2 sentences). Use Arabic; only fall back to a quick English ' +
    "clarification if they're lost. Encourage them to keep talking."
  );

  const onEvent = (msg) => {
    switch (msg.type) {
      case 'dc_open':
        setStatus('live');
        return;
      case 'dc_close':
        setStatus((s) => (s === 'live' ? 'closed' : s));
        return;
      case 'conversation.item.input_audio_transcription.completed':
        appendTranscript({ role: 'user', text: msg.transcript, partial: false });
        return;
      case 'response.audio_transcript.delta':
        appendPartial({ role: 'assistant', text: msg.delta });
        return;
      case 'response.audio_transcript.done':
        finalizePartial({ role: 'assistant', text: msg.transcript });
        return;
      default:
        return;
    }
  };

  const appendTranscript = (entry) => {
    setTranscript((prev) => [...prev, entry]);
  };

  const appendPartial = ({ role, text }) => {
    setTranscript((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.role === role && last.partial) {
        return [...prev.slice(0, -1), { role, text: (last.text || '') + text, partial: true }];
      }
      return [...prev, { role, text, partial: true }];
    });
  };

  const finalizePartial = ({ role, text }) => {
    setTranscript((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.role === role && last.partial) {
        return [...prev.slice(0, -1), { role, text: text || last.text, partial: false }];
      }
      return [...prev, { role, text, partial: false }];
    });
  };

  const start = async () => {
    if (!isRealtimeConfigured()) {
      Alert.alert(t('voiceChat.noKeyTitle'), t('voiceChat.noKeyBody'));
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setErrorMsg(null);
    setTranscript([]);
    setStatus('connecting');
    try {
      const session = await connectRealtime({ instructions, voice: 'alloy', onEvent });
      sessionRef.current = session;
    } catch (e) {
      setStatus('error');
      setErrorMsg(e?.message || 'Connection failed');
    }
  };

  const stop = async () => {
    Haptics.selectionAsync().catch(() => {});
    await sessionRef.current?.close();
    sessionRef.current = null;
    setStatus('closed');
    logActivity({ type: 'voiceChat', dialect, phase });
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    sessionRef.current?.mute(next);
    Haptics.selectionAsync().catch(() => {});
  };

  const statusColor = {
    idle: theme.colors.textMuted,
    connecting: theme.colors.warning,
    live: theme.colors.success,
    closed: theme.colors.textMuted,
    error: theme.colors.error,
  }[status];

  return (
    <ScreenContainer scroll={false}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text variant="subtitle" weight="bold" accessibilityRole="header">{t('voiceChat.title')}</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessible
          accessibilityRole="button"
          accessibilityLabel={t('common.done')}
          accessibilityHint="Closes the voice tutor"
          hitSlop={10}
        >
          <Text style={{ color: theme.colors.accent, fontWeight: '700' }}>{t('common.done')}</Text>
        </TouchableOpacity>
      </View>
      <Text variant="caption" style={{ color: theme.colors.textMuted, marginTop: 2 }}>
        {t('voiceChat.subtitle')}
      </Text>

      <View
        accessible
        accessibilityLabel={`Voice tutor. Microphone ${muted ? 'muted' : 'live'}.`}
        accessibilityLiveRegion="polite"
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Animated.View
          importantForAccessibility="no"
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            backgroundColor: theme.colors.accentSoft,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ scale: pulse }],
          }}
        >
          <Text style={{ fontSize: 56 }} accessible={false}>{muted ? '🔇' : '🎙️'}</Text>
        </Animated.View>
        <Text
          variant="caption"
          weight="bold"
          accessibilityLiveRegion="polite"
          style={{ marginTop: theme.spacing.lg, color: statusColor }}
        >
          {t(`voiceChat.status.${status}`)}
        </Text>
        {errorMsg && (
          <Text
            variant="small"
            accessibilityRole="alert"
            accessibilityLiveRegion="assertive"
            style={{ color: theme.colors.error, marginTop: 4, textAlign: 'center' }}
          >
            {errorMsg}
          </Text>
        )}
      </View>

      {transcript.length > 0 && (
        <View
          accessibilityRole="list"
          accessibilityLabel="Recent transcript"
          style={{ maxHeight: 220, marginBottom: theme.spacing.md }}
        >
          {transcript.slice(-4).map((m, i) => (
            <Card
              key={i}
              accessible
              accessibilityLabel={`${m.role === 'user' ? t('voiceChat.you') : t('voiceChat.tutor')} said: ${m.text}`}
              style={{
                marginBottom: 6,
                padding: 10,
                backgroundColor: m.role === 'user' ? theme.colors.surfaceMuted : theme.colors.accentSoft,
              }}
            >
              <Text variant="caption" weight="bold" accessible={false} style={{ color: theme.colors.textMuted, marginBottom: 2 }}>
                {m.role === 'user' ? t('voiceChat.you') : t('voiceChat.tutor')}
              </Text>
              <ArabicText accessible={false}>{m.text}</ArabicText>
            </Card>
          ))}
        </View>
      )}

      <View style={{ flexDirection: 'row' }}>
        {status === 'live' ? (
          <>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Button
                title={muted ? t('voiceChat.unmute') : t('voiceChat.mute')}
                variant="ghost"
                onPress={toggleMute}
                accessibilityHint={muted ? 'Unmutes your microphone' : 'Mutes your microphone'}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Button
                title={t('voiceChat.end')}
                variant="accent"
                onPress={stop}
                accessibilityHint="Ends the voice session"
              />
            </View>
          </>
        ) : status === 'connecting' ? (
          <Button title={t('voiceChat.connecting')} variant="ghost" disabled loading />
        ) : (
          <Button
            title={t('voiceChat.start')}
            variant="accent"
            onPress={start}
            accessibilityHint="Starts a live voice conversation with the tutor"
          />
        )}
      </View>
    </ScreenContainer>
  );
}
