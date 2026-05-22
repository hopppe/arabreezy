# App Store metadata (locked)

Single source of truth for the App Store Connect listing. When submitting a
build to TestFlight / App Store, paste these into App Store Connect verbatim.
If a field changes here, update both the listing and any in-app copy that
contradicts it.

Decision context: Arabic-learning niche is dominated by MSA-first generalists
(Duolingo, Pimsleur, Babbel, Rosetta). Saudi-dialect specifically is wide
open — only Arabius (100 ratings) actively targets it. We lead with "Speak
Arabic" (the verb signals dialect/conversation vs textbook MSA) and pack
high-intent low-competition dialect keywords into the subtitle.

## US App Store — primary listing

| Field | Value | Chars |
|---|---|---|
| **App Name** | `Arabreezy: Speak Arabic` | 23 / 30 |
| **Subtitle** | `Saudi Khaleeji & Gulf Dialect` | 29 / 30 |
| **Keywords** | `learn,spoken arabic,saudi dialect,hijazi,najdi,fusha,levantine,heritage,riyadh,jeddah,phrases,easy` | 99 / 100 |
| **Primary category** | Education | — |
| **Secondary category** | Reference (optional) | — |
| **Promotional text** | `Speak real Saudi Arabic — the way people actually talk. Khaleeji & Gulf dialect lessons, conversation practice, and a voice tutor that talks back. Free to start.` | 170 max |

### Why this combination

- **"Speak Arabic"** in the name: medium volume, high intent for our niche
  (anyone typing "speak" wants conversation, not textbook). Yallah Speak is
  the only purpose-built competitor (39 ratings).
- **Subtitle stacks three dialect terms** ("Saudi", "Khaleeji", "Gulf") +
  "Dialect" — all low-competition, high-intent. Apple combines name + subtitle
  as one search index so "Speak Saudi Arabic" matches via cross-field combo.
- **Keywords field** carries the long-tail (Hijazi/Najdi sub-dialects, city
  names Riyadh/Jeddah for incoming-expat searches, Fusha/Levantine as
  pre-stakes for future content). Excludes anything already in name/subtitle
  (Apple ignores duplicates).
- **"Learn Arabic"** is intentionally absent from name/subtitle (would lose
  to Duolingo et al). Lives in keyword field only.
- **AI / voice tutor mention is omitted** from external metadata — limited
  search volume on those terms, and the dialect-niche moat is more durable.
  Keep AI references in-app (paywall feature list, onboarding social proof)
  for conversion; just don't spend the 30-char name/subtitle real estate on it.

## What to fill in App Store Connect when submitting

- **Bundle ID**: `com.arabreezy.app` (already configured in `app.config.js`)
- **SKU**: anything stable, e.g. `arabreezy-ios-001`
- **Primary language**: English (U.S.)
- **App name / subtitle / keywords / promo text**: see above
- **Description**: TBD — write at submit-time. Should expand on what the
  promo text teases (Saudi dialect, 10 phases, conversation practice). Keep
  the first 3 lines tight — that's all most users read before tapping "more".
- **Support URL**: TBD (need a hosted page; can be a simple Notion or
  GitHub README until we have a real site)
- **Privacy policy URL**: TBD (required for any external testing or production)
- **Screenshots**: TBD (6.7" iPhone screens required; 6.5" + 5.5" optional
  but recommended)

## Don't drift

If you find yourself wanting to add a keyword to the App Name or Subtitle:
- Check that it isn't already in the keyword field (Apple ignores duplicates)
- Check it has higher search-volume × lower competition than what it'd replace
- Remember: ASO research that produced this list lives in the git history of
  this file; don't redo it from scratch each time

## Future updates

Subtitle and keywords are editable in App Store Connect at any time, no
resubmission required. App Name changes require a new build submission.
If you A/B test variations later, change subtitle/keywords first.
