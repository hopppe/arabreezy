export default {
  expo: {
    name: 'Arabreezy',
    slug: 'arabreezy',
    scheme: 'arabreezy',
    version: '0.1.0',
    orientation: 'portrait',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    assetBundlePatterns: ['**/*'],
    plugins: ['expo-font'],
    ios: { supportsTablet: true, bundleIdentifier: 'com.arabreezy.app' },
    android: { package: 'com.arabreezy.app' },
    web: { bundler: 'metro' },
  },
};
