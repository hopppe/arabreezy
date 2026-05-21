import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { supabase, isSupabaseConfigured } from '../config/supabase';

// The Apple/Google modules ship native bridges. If the running dev build was
// compiled before those packages were autolinked, requiring them at import
// time crashes the whole bundle with a TurboModuleRegistry error. Wrap each
// require in its own try/catch so the app still boots and email/password
// auth keeps working when the native side is missing.
let AppleAuthentication = null;
try { AppleAuthentication = require('expo-apple-authentication'); } catch (_) {}
let Crypto = null;
try { Crypto = require('expo-crypto'); } catch (_) {}
let GoogleSignin = null;
let statusCodes = {};
try {
  const g = require('@react-native-google-signin/google-signin');
  GoogleSignin = g.GoogleSignin || null;
  statusCodes = g.statusCodes || {};
} catch (_) {}

const AuthContext = createContext(null);

const extra = Constants?.expoConfig?.extra || {};
const GOOGLE_WEB_CLIENT_ID = extra.googleWebClientId;
const GOOGLE_IOS_CLIENT_ID = extra.googleIosClientId;
const isGoogleConfigured = !!GOOGLE_WEB_CLIENT_ID && !!GoogleSignin;

let googleConfigured = false;
function ensureGoogleConfigured() {
  if (googleConfigured) return;
  if (!GoogleSignin) {
    throw new Error('Google Sign-In native module is not available in this build.');
  }
  if (!isGoogleConfigured) {
    throw new Error(
      'Google Sign-In is not configured. Set EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID (and EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID on iOS) in .env.'
    );
  }
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID || undefined,
  });
  googleConfigured = true;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loaded, setLoaded] = useState(!isSupabaseConfigured);
  const [appleAvailable, setAppleAvailable] = useState(false);

  useEffect(() => {
    if (!supabase) return undefined;
    let cancelled = false;

    supabase.auth.getSession().then(({ data, error }) => {
      if (cancelled) return;
      if (error) console.warn('[auth] getSession failed:', error.message);
      setSession(data?.session ?? null);
      setLoaded(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next ?? null);
    });

    return () => {
      cancelled = true;
      sub?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'ios') return undefined;
    if (!AppleAuthentication) return undefined;
    let cancelled = false;
    AppleAuthentication.isAvailableAsync()
      .then((ok) => {
        if (!cancelled) setAppleAvailable(!!ok);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    if (!supabase) throw new Error('Supabase is not configured');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }, []);

  const signUp = useCallback(async ({ email, password }) => {
    if (!supabase) throw new Error('Supabase is not configured');
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }, []);

  const signInWithApple = useCallback(async () => {
    if (!supabase) throw new Error('Supabase is not configured');
    if (Platform.OS !== 'ios') {
      throw new Error('Apple Sign-In is only available on iOS.');
    }
    if (!AppleAuthentication || !Crypto) {
      throw new Error('Apple Sign-In native module is not available in this build.');
    }
    // Apple receives the SHA-256 hash; Supabase verifies the raw nonce in the
    // returned id_token claim. Without this, Supabase rejects the token.
    const rawNonce = Crypto.randomUUID();
    const hashedNonce = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      rawNonce
    );
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
      nonce: hashedNonce,
    });
    if (!credential.identityToken) {
      throw new Error('Apple did not return an identity token.');
    }
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'apple',
      token: credential.identityToken,
      nonce: rawNonce,
    });
    if (error) throw error;
    return data;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) throw new Error('Supabase is not configured');
    ensureGoogleConfigured();
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const result = await GoogleSignin.signIn();
    // google-signin v13+ wraps the payload in { type, data }; older versions return it flat.
    const payload = result?.data ?? result;
    const idToken = payload?.idToken;
    if (!idToken) {
      throw new Error('Google did not return an ID token.');
    }
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
    });
    if (error) throw error;
    return data;
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    try {
      if (googleConfigured && GoogleSignin && (await GoogleSignin.getCurrentUser())) {
        await GoogleSignin.signOut();
      }
    } catch (err) {
      console.warn('[auth] google signOut failed:', err?.message);
    }
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      loaded,
      isConfigured: isSupabaseConfigured,
      isGoogleConfigured,
      appleAvailable,
      signIn,
      signUp,
      signInWithApple,
      signInWithGoogle,
      signOut,
    }),
    [session, loaded, appleAvailable, signIn, signUp, signInWithApple, signInWithGoogle, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export { statusCodes as GoogleSignInStatusCodes };
