import React, { useState } from 'react';
import { View, TextInput, Alert, TouchableOpacity } from 'react-native';
import { ScreenContainer, Text, Button, Card } from '../../components/ui';
import { SocialAuthButtons } from '../../components/auth/SocialAuthButtons';
import { theme } from '../../theme';
import { useAuth } from '../../context/AuthContext';

const inputStyle = {
  borderWidth: 1,
  borderColor: theme.colors.border,
  borderRadius: theme.radius.md,
  paddingVertical: 12,
  paddingHorizontal: 14,
  fontSize: theme.typography.sizes.md,
  color: theme.colors.text,
  backgroundColor: theme.colors.surface,
  marginTop: theme.spacing.sm,
};

export default function SignUpScreen({ navigation }) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!email.trim() || password.length < 6) {
      Alert.alert('Check your details', 'Enter an email and a password of 6+ characters.');
      return;
    }
    setSubmitting(true);
    const trimmed = email.trim();
    try {
      const { session } = await signUp({ email: trimmed, password });
      if (!session) {
        navigation.navigate('EmailVerification', { email: trimmed, password });
      }
    } catch (err) {
      Alert.alert('Sign up failed', err?.message ?? 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text variant="display" weight="bold" accessibilityRole="header">Create an account</Text>
        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.xs }}>
          Your placement, lessons, and word progress stay on your account across devices.
        </Text>

        <Card style={{ marginTop: theme.spacing.lg }}>
          <Text weight="bold" nativeID="signup-email-label">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            placeholder="you@example.com"
            placeholderTextColor={theme.colors.textMuted}
            style={inputStyle}
            accessible
            accessibilityLabel="Email"
            accessibilityHint="Enter an email to register the new account"
            accessibilityLabelledBy="signup-email-label"
            returnKeyType="next"
          />

          <View style={{ height: theme.spacing.md }} />
          <Text weight="bold" nativeID="signup-password-label">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password-new"
            textContentType="newPassword"
            placeholder="at least 6 characters"
            placeholderTextColor={theme.colors.textMuted}
            style={inputStyle}
            accessible
            accessibilityLabel="Password"
            accessibilityHint="Choose a password of at least 6 characters"
            accessibilityLabelledBy="signup-password-label"
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />

          <View style={{ height: theme.spacing.lg }} />
          <Button
            title="Create account"
            onPress={onSubmit}
            loading={submitting}
            accessibilityLabel="Create account"
            accessibilityHint="Registers a new account with the email and password above"
          />

          <SocialAuthButtons />
        </Card>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={{ marginTop: theme.spacing.lg, alignSelf: 'center' }}
          accessible
          accessibilityRole="link"
          accessibilityLabel="Sign in to an existing account"
          accessibilityHint="Opens the sign-in screen"
        >
          <Text variant="small" style={{ color: theme.colors.textMuted }}>
            Already have an account? <Text weight="bold" style={{ color: theme.colors.text }}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
