# 08 — Stories

**Source:** `src/activities/Stories/StoryListScreen.js`, `StoryReader.js`
**ai-backend:** optional `/api/tts` for read-aloud
**Supabase:** none

## Pre-state
- Activities tab → Stories card (300, 490).

## Happy path

1. StoryList renders: vertical list with icon + title + duration + tag (e.g. "السوق في الصباح / The Market in the Morning — 3 min · daily life").
2. Tap a story → StoryReader. Renders Arabic sentences in stacked card-style rows. Each row has a `›` glyph (translate toggle) and optionally a Play icon.
3. Tap `›` on a sentence → reveals the English translation inline.
4. Scroll through the whole story to end. There's usually a "Story complete" cap card.

## Saudi stories in bundle (Phase 1+)
- السوق في الصباح / The Market in the Morning (3 min · daily life)
- أول يوم في المدرسة / First Day at School (3 min · daily life)
- الدراجة المكسورة / The Broken Bicycle (5 min · mechanics)
- تجربتي الأولى في الطبخ / My First Cooking Experience (5 min)
- يوم في الحديقة / A Day at the Park
- مسرحية المدرسة / The School Play
- ...

## Assertions
- UI: List shows all bundled stories. Reader renders RTL Arabic sentences; tap-to-translate works per sentence.
- Optional: If `/api/tts` Read-aloud is enabled and tapped, ai-backend should serve a 200.

## Failure paths
- Empty list → bundle drift in `src/data/dialects/<dialect>/stories.js` or Supabase `stories` table.

## Recovery
- N/A — read-only.
