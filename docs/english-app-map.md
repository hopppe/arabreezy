# English App — Architecture Notes (Reference)

Source: `../Englishlearning`. These notes exist so we can port more pieces later (e.g., lesson vocabulary service, guided conversation components) without re-reading the whole codebase.

## What we kept from it
- Flashcards SRS algorithm (Anki-style) — `src/activities/Flashcards/utils/ankiScheduler.js`
- Lesson data shape — `src/activities/Lessons/data/` + `src/data/lessonPlans.js`
- Guided Conversation scripted UI (message list + suggestion bubbles) — `src/activities/GuidedConversations/`
- Home screen scaffolding (progress card + activity checklist) — `src/screens/home/`
- RTL + i18n plumbing — `src/context/LanguageContext.js`, `src/utils/rtlUtils.js`
- Theme provider shape — `src/context/ThemeContext.js`, `src/theme/`

## What we stripped
- All Supabase / auth / subscription / paywall / RevenueCat / AppsFlyer / analytics
- All realtime AI / WebRTC / OpenAI SDK / audio recording
- Idioms, Reading, Listening, Stories, Shadowing, Pronunciation, Grammar activities
- Onboarding paywall flow, referral, streak system, notifications
- Light/dark theme, multi-theme toggle

## Key landmines (for future porting)
- `FlashcardContext` in the source app is deeply coupled to Supabase. Our version persists only to AsyncStorage via `UserProgressContext`.
- `DailyPlanContext` in the source app resets plans at midnight. We replaced this with `DailyReviewContext` that refreshes only when the current lesson is completed.
- Placement test writes phase to `user_profiles` table. Our version writes `placement` into local `UserProgressContext` state.
- Guided Conversation in the source calls OpenAI for feedback. Our version uses static pre-written feedback inside each script.

If we ever want to port another activity (e.g., Listening), the process is: copy the folder, strip all Supabase / AI service imports, rewire data source to `backend/localBackend.js`, wrap strings in the dialect bundle.
