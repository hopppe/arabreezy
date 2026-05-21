export default {
  expo: {
    name: 'Arabreezy',
    slug: 'arabreezy',
    scheme: 'arabreezy',
    version: '0.1.0',
    orientation: 'portrait',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    icon: './assets/images/icon.png',
    assetBundlePatterns: ['**/*'],
    plugins: [
      'expo-font',
      'expo-dev-client',
      'expo-apple-authentication',
      '@react-native-community/datetimepicker',
      [
        'expo-notifications',
        {
          color: '#FF5A1F',
          defaultChannel: 'arabreezy-reminders',
        },
      ],
      [
        'expo-audio',
        {
          microphonePermission: 'Arabreezy needs microphone access so you can practice pronunciation.',
        },
      ],
      [
        '@config-plugins/react-native-webrtc',
        {
          cameraPermission:
            'Arabreezy uses camera permission only when you join a voice call (not used).',
          microphonePermission:
            'Arabreezy uses your microphone to talk to the Arabic tutor in voice chat.',
        },
      ],
      [
        '@react-native-google-signin/google-signin',
        {
          // Reverse-client-id from the iOS OAuth client in Google Cloud Console.
          // e.g. com.googleusercontent.apps.1234567890-abcdefghi
          // The plugin 500s the manifest if this is missing, so we keep a
          // placeholder for builds without Google Sign-In wired up yet.
          iosUrlScheme:
            process.env.EXPO_PUBLIC_GOOGLE_IOS_URL_SCHEME ||
            'com.googleusercontent.apps.placeholder',
        },
      ],
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.arabreezy.app',
      usesAppleSignIn: true,
      infoPlist: {
        NSMicrophoneUsageDescription:
          'Arabreezy needs microphone access so you can record yourself and practice pronunciation.',
      },
    },
    android: {
      package: 'com.arabreezy.app',
      adaptiveIcon: {
        foregroundImage: './assets/images/icon-foreground.png',
        backgroundColor: '#FF5A1F',
      },
      permissions: [
        'android.permission.RECORD_AUDIO',
        'android.permission.MODIFY_AUDIO_SETTINGS',
        'android.permission.INTERNET',
      ],
    },
    web: { bundler: 'metro' },
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      useSupabaseContent: process.env.EXPO_PUBLIC_USE_SUPABASE_CONTENT,
      aiBackendUrl: process.env.EXPO_PUBLIC_AI_BACKEND_URL,
      googleIosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
      googleWebClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      // RevenueCat — separate keys per platform per RC's own guidance.
      // Both keys are PUBLIC (safe to inline). The server-side webhook
      // secret stays in ai-backend's env, never here.
      revenueCatIosKey: process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY,
      revenueCatAndroidKey: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY,
      revenueCatEntitlement: process.env.EXPO_PUBLIC_REVENUECAT_ENTITLEMENT || 'pro',
    },
  },
};
