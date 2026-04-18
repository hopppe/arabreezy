# Design Decisions

Short log of notable design choices and why, so we don't re-litigate them every session.

## 10 levels (not phases)
The source app used 6 "phases" tied to CEFR. We switched to **10 levels centered on vocabulary difficulty** because the user wants granular progression and vocab growth as the spine. Each level has a focal word list and a handful of lessons.

## Lessons don't refresh daily
Source app had "daily plans" that reset at midnight. We replaced this with a **lesson-as-unit** model: the current lesson persists until finished. Daily review activities are anchored on the current lesson's words + new-word sets.

## Dialect-first content structure
Saudi is primary, but words/lessons/conversations live in `src/data/dialects/<dialect>/` so Levantine and Fusha can plug in later without touching screens. A `DialectContext` serves the right bundle.

## Local backend folder now, real backend later
We don't need a real server yet. All data lives in AsyncStorage + bundled JSON, behind a `backend/localBackend.js` façade. When we flip to a real API, only the internals of `localBackend.js` change; screens stay put.

## Single black/white theme
Source app had light/dark modes with full palettes. We're shipping **one monochrome theme** with accent pops on buttons/images. Simpler to iterate, matches the user's aesthetic direction.

## No auth, no streaks, no payments — yet
All three were major complexity drivers in the source app. They can come back later if we want them, but for a personal-learning tool they're overhead. User is a single local identity for now.

## No AI / WebRTC / voice
The user explicitly dropped AI conversation. Guided conversations are scripted with branching choices and static feedback. Much smaller dependency footprint.

## English UI first, Arabic UI RTL-ready
UI language default is English (learner-facing) even though we support `ar` and RTL in the i18n layer. The **content** is Arabic (the thing being learned); the **UI chrome** is English for now. Easy to flip when we want a fully-Arabic chrome.
