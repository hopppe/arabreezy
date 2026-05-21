import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AppState, View } from 'react-native';
import { ScreenContainer, Text, Button, Card } from '../../components/ui';
import { theme } from '../../theme';
import { supabase } from '../../config/supabase';

const POLL_INTERVAL_MS = 3000;

export default function EmailVerificationScreen({ route, navigation }) {
  const email = route.params?.email ?? '';
  const password = route.params?.password ?? '';

  const [checking, setChecking] = useState(false);
  const [error, setError] = useState(null);
  const [resending, setResending] = useState(false);
  const [resentAt, setResentAt] = useState(null);

  const pollTimerRef = useRef(null);

  const tryConfirm = useCallback(async () => {
    if (!supabase || !email || !password) return false;
    setChecking(true);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        // "Email not confirmed" is the expected state while we wait. Anything
        // else is worth surfacing.
        const msg = signInError.message || '';
        const stillWaiting = /confirm|verify|not confirmed/i.test(msg);
        if (!stillWaiting) setError(msg);
        return false;
      }
      // Session arrived → RootNavigator will pick it up and route us past auth.
      return !!data?.session;
    } catch (err) {
      setError(err?.message ?? 'Something went wrong.');
      return false;
    } finally {
      setChecking(false);
    }
  }, [email, password]);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      if (cancelled) return;
      const done = await tryConfirm();
      if (!done && !cancelled) {
        pollTimerRef.current = setTimeout(tick, POLL_INTERVAL_MS);
      }
    };
    tick();
    return () => {
      cancelled = true;
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current);
    };
  }, [tryConfirm]);

  // When the user backgrounds the app to click their email link and returns,
  // check immediately rather than waiting for the next poll tick.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') tryConfirm();
    });
    return () => sub.remove();
  }, [tryConfirm]);

  const onResend = useCallback(async () => {
    if (!supabase || !email) return;
    setResending(true);
    setError(null);
    try {
      const { error: resendErr } = await supabase.auth.resend({ type: 'signup', email });
      if (resendErr) setError(resendErr.message);
      else setResentAt(Date.now());
    } finally {
      setResending(false);
    }
  }, [email]);

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text variant="display" weight="bold" accessibilityRole="header">Check your inbox</Text>
        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.xs }}>
          We sent a confirmation link to{' '}
          <Text weight="bold" style={{ color: theme.colors.text }}>
            {email}
          </Text>
          . Tap it and we'll bring you in automatically.
        </Text>

        <Card style={{ marginTop: theme.spacing.lg, alignItems: 'center' }}>
          <ActivityIndicator color={theme.colors.accent} accessibilityLabel="Checking" />
          <Text
            variant="small"
            accessibilityLiveRegion="polite"
            style={{ marginTop: theme.spacing.sm, color: theme.colors.textMuted }}
          >
            {checking ? 'Checking…' : 'Waiting for confirmation'}
          </Text>
        </Card>

        {error && (
          <Text
            variant="small"
            accessibilityRole="alert"
            accessibilityLiveRegion="assertive"
            style={{ color: theme.colors.error, marginTop: theme.spacing.md }}
          >
            {error}
          </Text>
        )}

        <View style={{ marginTop: theme.spacing.lg }}>
          <Button
            title={resending ? 'Sending…' : 'Resend email'}
            onPress={onResend}
            variant="ghost"
            disabled={resending}
            loading={resending}
            accessibilityLabel="Resend confirmation email"
            accessibilityHint="Sends the confirmation email again"
          />
          {resentAt && (
            <Text
              variant="small"
              accessibilityLiveRegion="polite"
              style={{ marginTop: theme.spacing.xs, color: theme.colors.textMuted, textAlign: 'center' }}
            >
              Sent. Check your inbox.
            </Text>
          )}
        </View>

        <View style={{ marginTop: theme.spacing.md }}>
          <Button
            title="Use a different email"
            variant="ghost"
            onPress={() => navigation.navigate('SignUp')}
            accessibilityLabel="Use a different email"
            accessibilityHint="Returns to the sign-up screen so you can register with a different address"
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
