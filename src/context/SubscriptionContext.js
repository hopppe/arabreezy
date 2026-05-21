// SubscriptionContext — single source of truth for "is this user Pro?".
//
// Wraps RevenueCat. Reads ENTITLEMENT_ID ('pro') from app.config.js extras.
// Degrades gracefully when the native SDK is unavailable (Expo Go, pre-EAS-
// rebuild, or when no API key is set) — every call resolves to a non-Pro
// answer instead of throwing, so the rest of the app still runs.
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useAuth } from './AuthContext';
import {
  ENTITLEMENT_ID,
  OFFERING_ID,
  addCustomerInfoListener,
  configurePurchases,
  getCustomerInfo,
  getOfferings,
  hasProEntitlement,
  isPurchasesAvailable,
  loginPurchases,
  logoutPurchases,
  purchasePackage,
  restorePurchases,
} from '../config/revenueCat';

const SubscriptionContext = createContext(null);

// Pricing fallbacks used in dev when no RevenueCat offering is loaded
// (e.g. no API key, or testing the paywall UI before App Store products
// exist). Numbers are illustrative — the actual prices the user is
// charged always come from the store, never from these constants.
export const FALLBACK_PACKAGES = [
  {
    identifier: 'fallback_annual',
    productId: 'arabreezy_pro_annual',
    period: 'year',
    priceString: '$59.99',
    pricePerMonthString: '$5.00',
    priceNumber: 59.99,
    trialDays: 7,
    label: 'Annual',
    tagline: 'Best value · save 50%',
    sublabel: '7-day free trial, then $59.99/year',
  },
  {
    identifier: 'fallback_monthly',
    productId: 'arabreezy_pro_monthly',
    period: 'month',
    priceString: '$9.99',
    pricePerMonthString: '$9.99',
    priceNumber: 9.99,
    trialDays: 0,
    label: 'Monthly',
    tagline: null,
    sublabel: 'Billed monthly, cancel anytime',
  },
  {
    identifier: 'fallback_lifetime',
    productId: 'arabreezy_pro_lifetime',
    period: 'lifetime',
    priceString: '$99.99',
    pricePerMonthString: null,
    priceNumber: 99.99,
    trialDays: 0,
    label: 'Lifetime',
    tagline: 'Pay once · keep forever',
    sublabel: 'One-time purchase, no renewals',
  },
];

function normalizePackage(rcPackage) {
  if (!rcPackage) return null;
  const product = rcPackage.product || {};
  const intro = product.introPrice;
  const periodMap = {
    NORMAL: 'unknown',
    ANNUAL: 'year',
    MONTHLY: 'month',
    WEEKLY: 'week',
    LIFETIME: 'lifetime',
    SIX_MONTH: '6month',
    THREE_MONTH: '3month',
    TWO_MONTH: '2month',
  };
  const period = periodMap[rcPackage.packageType] || 'unknown';
  const priceNumber = typeof product.price === 'number' ? product.price : null;
  const priceString = product.priceString || (priceNumber != null ? `$${priceNumber.toFixed(2)}` : '');
  let pricePerMonthString = null;
  if (period === 'year' && priceNumber) {
    pricePerMonthString = `$${(priceNumber / 12).toFixed(2)}`;
  } else if (period === 'month') {
    pricePerMonthString = priceString;
  }
  return {
    identifier: rcPackage.identifier,
    productId: product.identifier,
    period,
    priceString,
    pricePerMonthString,
    priceNumber,
    trialDays: intro?.periodNumberOfUnits && intro?.periodUnit === 'DAY' ? intro.periodNumberOfUnits : 0,
    rcPackage,
  };
}

function deriveLabel(pkg) {
  if (pkg.period === 'year') return { label: 'Annual', tagline: 'Best value · save 50%', sublabel: pkg.trialDays ? `${pkg.trialDays}-day free trial, then ${pkg.priceString}/year` : `${pkg.priceString} billed yearly` };
  if (pkg.period === 'month') return { label: 'Monthly', tagline: null, sublabel: 'Billed monthly, cancel anytime' };
  if (pkg.period === 'lifetime') return { label: 'Lifetime', tagline: 'Pay once · keep forever', sublabel: 'One-time purchase, no renewals' };
  if (pkg.period === 'week') return { label: 'Weekly', tagline: null, sublabel: 'Billed weekly, cancel anytime' };
  return { label: pkg.period, tagline: null, sublabel: pkg.priceString };
}

export function SubscriptionProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [ready, setReady] = useState(false);
  const [available, setAvailable] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [packages, setPackages] = useState(FALLBACK_PACKAGES);
  const [usingFallback, setUsingFallback] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const configuredRef = useRef(false);

  // Configure SDK once, then react to auth-user changes.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const sdkAvailable = isPurchasesAvailable();
      if (!sdkAvailable) {
        if (!cancelled) {
          setAvailable(false);
          setReady(true);
        }
        return;
      }
      const res = await configurePurchases({ appUserId: userId });
      if (cancelled) return;
      setAvailable(res.configured);
      if (!res.configured) {
        setReady(true);
        return;
      }
      configuredRef.current = true;
      try {
        const offerings = await getOfferings();
        if (cancelled) return;
        const current = offerings?.current || offerings?.all?.[OFFERING_ID];
        const pkgs = current?.availablePackages || [];
        if (pkgs.length > 0) {
          const normalized = pkgs.map(normalizePackage).filter(Boolean).map((p) => ({ ...p, ...deriveLabel(p) }));
          setPackages(normalized);
          setUsingFallback(false);
        }
      } catch (err) {
        console.warn('[sub] load offerings failed:', err?.message);
      }
      const info = await getCustomerInfo();
      if (cancelled) return;
      setCustomerInfo(info);
      setIsPro(hasProEntitlement(info));
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // Sync auth user → RevenueCat appUserID. logIn/logOut also refresh entitlement.
  useEffect(() => {
    if (!configuredRef.current) return;
    let cancelled = false;
    (async () => {
      const info = userId ? await loginPurchases(userId) : await logoutPurchases();
      if (cancelled || !info) return;
      setCustomerInfo(info);
      setIsPro(hasProEntitlement(info));
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Live updates after purchases / restores happen in another flow.
  useEffect(() => {
    if (!configuredRef.current) return undefined;
    return addCustomerInfoListener((info) => {
      setCustomerInfo(info);
      setIsPro(hasProEntitlement(info));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const purchase = useCallback(
    async (pkgOrIdentifier) => {
      setError(null);
      setLoading(true);
      try {
        if (usingFallback || !pkgOrIdentifier?.rcPackage) {
          // Dev/preview fallback — pretend the purchase succeeded so the
          // onboarding flow stays testable before storefront products exist.
          // This NEVER unlocks Pro in a real build (the entitlement check
          // below always runs against real customerInfo).
          throw new Error(
            'In-app purchases are not configured yet. Add a RevenueCat key and storefront products to enable.'
          );
        }
        const res = await purchasePackage(pkgOrIdentifier.rcPackage);
        const info = res?.customerInfo || (await getCustomerInfo());
        setCustomerInfo(info);
        setIsPro(hasProEntitlement(info));
        return { success: true, info };
      } catch (err) {
        if (err?.userCancelled) {
          return { success: false, cancelled: true };
        }
        setError(err?.message || 'Purchase failed');
        return { success: false, error: err };
      } finally {
        setLoading(false);
      }
    },
    [usingFallback]
  );

  const restore = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      if (!available) throw new Error('In-app purchases are not configured');
      const info = await restorePurchases();
      setCustomerInfo(info);
      setIsPro(hasProEntitlement(info));
      return { success: true, info, restored: hasProEntitlement(info) };
    } catch (err) {
      setError(err?.message || 'Restore failed');
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  }, [available]);

  const refresh = useCallback(async () => {
    if (!available) return null;
    const info = await getCustomerInfo();
    setCustomerInfo(info);
    setIsPro(hasProEntitlement(info));
    return info;
  }, [available]);

  const value = useMemo(
    () => ({
      ready,
      available,
      isPro,
      customerInfo,
      packages,
      usingFallback,
      loading,
      error,
      entitlementId: ENTITLEMENT_ID,
      purchase,
      restore,
      refresh,
    }),
    [ready, available, isPro, customerInfo, packages, usingFallback, loading, error, purchase, restore, refresh]
  );

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscription must be used inside SubscriptionProvider');
  return ctx;
}
