// RevenueCat wrapper. Lazily loads the native SDK so the bundle still compiles
// in Expo Go / before an EAS rebuild; in that case every call resolves to a
// safe "no entitlement" answer instead of crashing.
//
// All keys live in app.config.js → Constants.expoConfig.extra. Both client
// keys are PUBLIC by RevenueCat's design — never put the secret webhook key
// here.
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const extra = Constants?.expoConfig?.extra ?? {};

export const ENTITLEMENT_ID = extra.revenueCatEntitlement || 'pro';
export const OFFERING_ID = 'default';

let Purchases = null;
let loadError = null;

function loadSdk() {
  if (Purchases || loadError) return Purchases;
  try {
    // eslint-disable-next-line global-require
    Purchases = require('react-native-purchases').default;
  } catch (err) {
    loadError = err;
    Purchases = null;
  }
  return Purchases;
}

export function isPurchasesAvailable() {
  return !!loadSdk();
}

function getApiKey() {
  return Platform.OS === 'ios' ? extra.revenueCatIosKey : extra.revenueCatAndroidKey;
}

let configured = false;

export async function configurePurchases({ appUserId } = {}) {
  const sdk = loadSdk();
  if (!sdk) return { configured: false, reason: 'sdk-missing' };
  const apiKey = getApiKey();
  if (!apiKey) return { configured: false, reason: 'no-api-key' };
  if (configured) {
    if (appUserId) {
      try {
        await sdk.logIn(appUserId);
      } catch (err) {
        console.warn('[rc] logIn after configure failed:', err?.message);
      }
    }
    return { configured: true };
  }
  try {
    sdk.configure({ apiKey, appUserID: appUserId || null });
    configured = true;
    return { configured: true };
  } catch (err) {
    console.warn('[rc] configure failed:', err?.message);
    return { configured: false, reason: 'configure-failed', error: err };
  }
}

export async function loginPurchases(appUserId) {
  const sdk = loadSdk();
  if (!sdk || !configured || !appUserId) return null;
  try {
    const res = await sdk.logIn(appUserId);
    return res?.customerInfo ?? null;
  } catch (err) {
    console.warn('[rc] logIn failed:', err?.message);
    return null;
  }
}

export async function logoutPurchases() {
  const sdk = loadSdk();
  if (!sdk || !configured) return null;
  try {
    const res = await sdk.logOut();
    return res?.customerInfo ?? null;
  } catch (err) {
    console.warn('[rc] logOut failed:', err?.message);
    return null;
  }
}

export async function getOfferings() {
  const sdk = loadSdk();
  if (!sdk || !configured) return null;
  try {
    return await sdk.getOfferings();
  } catch (err) {
    console.warn('[rc] getOfferings failed:', err?.message);
    return null;
  }
}

export async function getCustomerInfo() {
  const sdk = loadSdk();
  if (!sdk || !configured) return null;
  try {
    return await sdk.getCustomerInfo();
  } catch (err) {
    console.warn('[rc] getCustomerInfo failed:', err?.message);
    return null;
  }
}

export async function purchasePackage(pkg) {
  const sdk = loadSdk();
  if (!sdk || !configured) throw new Error('Purchases not configured');
  return sdk.purchasePackage(pkg);
}

export async function restorePurchases() {
  const sdk = loadSdk();
  if (!sdk || !configured) throw new Error('Purchases not configured');
  return sdk.restorePurchases();
}

export function addCustomerInfoListener(handler) {
  const sdk = loadSdk();
  if (!sdk || !configured) return () => {};
  try {
    sdk.addCustomerInfoUpdateListener(handler);
    return () => {
      try { sdk.removeCustomerInfoUpdateListener(handler); } catch {}
    };
  } catch (err) {
    console.warn('[rc] addCustomerInfoUpdateListener failed:', err?.message);
    return () => {};
  }
}

export function hasProEntitlement(customerInfo) {
  if (!customerInfo) return false;
  const ent = customerInfo.entitlements?.active?.[ENTITLEMENT_ID];
  return !!ent;
}
