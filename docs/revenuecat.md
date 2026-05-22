# RevenueCat configuration

Single source of truth for the RC project, apps, products, packages, entitlements, and key-swap path.

## Project

| | |
|---|---|
| Project ID | `proj5d61f41b` |
| Project name | `arabreezy` |
| Dashboard | https://app.revenuecat.com/projects/proj5d61f41b |

## Apps

| Type | App ID | Bundle / Package | iOS public key | When the app's key is active |
|---|---|---|---|---|
| Test Store | `appa6c57c1942` | — | `test_NJHCJfvtaPIodneBIiOLzqTYdUY` | **Current** — dev, simulator, TestFlight (no App Store Connect required) |
| App Store | `app0b08678af2` | `com.arabreezy.app` | `appl_pVSDEUgVLrYbMyTSJJwzdyXExjt` | Swap to this once App Store Connect has `arabreezy_pro_monthly` |
| Play Store | _not yet created_ | `com.arabreezy.app` | _not yet generated_ | Swap once Play Console has the matching subscription |

The secret REST API key (`sk_NehMkvCmLDznINMGNOrnmVcJYzlWK`) is what the RC MCP server authenticates with — it stays in `.env` and is never bundled into the app.

## Products

| ID | App | store_identifier | Price | Status |
|---|---|---|---|---|
| `proddd22a42108` | Test Store | `monthly_30` | $30.00 / mo | Active — attached to package `$rc_monthly` |
| `prod780e3eac94` | Test Store | `monthly` | $9.99 / mo | **Detached** (orphaned, ignore) |
| `proda224e5154b` | App Store | `arabreezy_pro_monthly` | (set in App Store Connect) | Active — attached to package `$rc_monthly` |

The package has both Test Store + App Store products. RC's SDK picks the right one based on which key the app is configured with — `test_` → Test Store product, `appl_` → App Store product.

## Packages & Offerings

| Offering | Package | Position | Products |
|---|---|---|---|
| `default` (`ofrng38c146b835`, current) | `$rc_monthly` (`pkgef9317bb9e7`) | 0 | `proddd22a42108` (Test) + `proda224e5154b` (iOS) |

## Entitlements

| ID | lookup_key | Display | Products attached |
|---|---|---|---|
| `entl68c27b8d7c` | `pro` | Pro | both monthly products |
| `entla3850fdd40` | `arabreezy Pro` | arabreezy Pro | _unused — leftover, ignore_ |

The app's `revenueCat.js` defaults `ENTITLEMENT_ID = 'pro'` (override via `EXPO_PUBLIC_REVENUECAT_ENTITLEMENT`). Anything purchased via the package grants the `pro` entitlement, and `hasProEntitlement()` checks for it.

## Pricing

Set to **$30.00/mo USD** on the Test Store product. App Store product price comes from App Store Connect once the matching subscription is configured there with `arabreezy_pro_monthly` as the product ID — RC will mirror whatever you set in App Store Connect.

## Swapping to App Store keys

When App Store Connect has the `arabreezy_pro_monthly` subscription set up:

1. Edit `.env`:
   ```
   EXPO_PUBLIC_REVENUECAT_IOS_KEY=appl_pVSDEUgVLrYbMyTSJJwzdyXExjt
   ```
2. Re-prebuild: `npx expo prebuild --platform ios --clean`
3. Rebuild + reinstall via EAS / Xcode

Don't swap before App Store Connect has the product — the SDK will return zero packages (no StoreKit SKProduct match), and the app will fall back to `FALLBACK_PACKAGES` in `SubscriptionContext.js` ($30 monthly hardcode) instead of the live RC offering.

## Webhook / server-to-server

Not yet wired. When you need server-side receipt validation (e.g. unlock Pro after a Stripe-style web purchase, sync entitlement to Supabase), use the RC MCP `create-webhook-integration` against a route on `arabreezy-backend.vercel.app`.
