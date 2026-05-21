import React, { useState } from 'react';
import { View, Platform, Alert, TouchableOpacity } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Text } from '../ui';
import { theme } from '../../theme';
import { useAuth, GoogleSignInStatusCodes } from '../../context/AuthContext';

function isUserCancelled(err) {
  if (!err) return false;
  if (err.code === 'ERR_REQUEST_CANCELED') return true; // Apple
  if (err.code === GoogleSignInStatusCodes?.SIGN_IN_CANCELLED) return true;
  if (err.code === GoogleSignInStatusCodes?.IN_PROGRESS) return true;
  if (typeof err.message === 'string' && /cancel/i.test(err.message)) return true;
  return false;
}

export function SocialAuthButtons() {
  const { signInWithApple, signInWithGoogle, appleAvailable, isGoogleConfigured } = useAuth();
  const [appleBusy, setAppleBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);

  const showApple = Platform.OS === 'ios' && appleAvailable;
  const showGoogle = isGoogleConfigured;

  if (!showApple && !showGoogle) return null;

  const onApple = async () => {
    setAppleBusy(true);
    try {
      await signInWithApple();
    } catch (err) {
      if (!isUserCancelled(err)) {
        Alert.alert('Apple sign in failed', err?.message ?? 'Please try again.');
      }
    } finally {
      setAppleBusy(false);
    }
  };

  const onGoogle = async () => {
    setGoogleBusy(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      if (!isUserCancelled(err)) {
        Alert.alert('Google sign in failed', err?.message ?? 'Please try again.');
      }
    } finally {
      setGoogleBusy(false);
    }
  };

  return (
    <View style={{ marginTop: theme.spacing.lg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
        <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
        <Text variant="small" style={{ marginHorizontal: theme.spacing.md, color: theme.colors.textMuted }}>
          or continue with
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.border }} />
      </View>

      {showApple ? (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={theme.radius.pill}
          style={{ width: '100%', height: 48, opacity: appleBusy ? 0.5 : 1 }}
          onPress={onApple}
          accessibilityLabel="Continue with Apple"
          accessibilityHint="Signs you in using your Apple ID"
        />
      ) : null}

      {showApple && showGoogle ? <View style={{ height: theme.spacing.sm }} /> : null}

      {showGoogle ? (
        <TouchableOpacity
          onPress={onGoogle}
          disabled={googleBusy}
          activeOpacity={0.85}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
          accessibilityHint="Signs you in using your Google account"
          accessibilityState={{ disabled: googleBusy, busy: googleBusy }}
          style={{
            height: 48,
            borderRadius: theme.radius.pill,
            borderWidth: 1.5,
            borderColor: theme.colors.black,
            backgroundColor: theme.colors.white,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            opacity: googleBusy ? 0.5 : 1,
          }}
        >
          <Text weight="bold" style={{ color: theme.colors.black }}>
            {googleBusy ? 'Signing in…' : 'Continue with Google'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export default SocialAuthButtons;
