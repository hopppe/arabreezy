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

export default function SignInScreen({ navigation }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Missing info', 'Enter your email and password.');
      return;
    }
    setSubmitting(true);
    try {
      await signIn({ email: email.trim(), password });
    } catch (err) {
      Alert.alert('Sign in failed', err?.message ?? 'Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text variant="display" weight="bold" accessibilityRole="header">Welcome back</Text>
        <Text variant="small" style={{ color: theme.colors.textMuted, marginTop: theme.spacing.xs }}>
          Sign in to keep your phase and word progress in sync.
        </Text>

        <Card style={{ marginTop: theme.spacing.lg }}>
          <Text weight="bold" nativeID="signin-email-label">Email</Text>
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
            accessibilityHint="Enter the email you used to sign up"
            accessibilityLabelledBy="signin-email-label"
            returnKeyType="next"
          />

          <View style={{ height: theme.spacing.md }} />
          <Text weight="bold" nativeID="signin-password-label">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
            textContentType="password"
            placeholder="••••••••"
            placeholderTextColor={theme.colors.textMuted}
            style={inputStyle}
            accessible
            accessibilityLabel="Password"
            accessibilityHint="Enter your account password"
            accessibilityLabelledBy="signin-password-label"
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />

          <View style={{ height: theme.spacing.lg }} />
          <Button
            title="Sign in"
            onPress={onSubmit}
            loading={submitting}
            accessibilityLabel="Sign in"
            accessibilityHint="Signs you in with the email and password above"
          />

          <SocialAuthButtons />
        </Card>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={{ marginTop: theme.spacing.lg, alignSelf: 'center' }}
          accessible
          accessibilityRole="link"
          accessibilityLabel="Create an account"
          accessibilityHint="Opens the sign-up screen"
        >
          <Text variant="small" style={{ color: theme.colors.textMuted }}>
            No account yet? <Text weight="bold" style={{ color: theme.colors.text }}>Create one</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
