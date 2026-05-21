# Saudi content audit vs phase-difficulty spec

**Date:** 2026-05-20
**Spec:** `/Users/ethanhoppe/Documents/Cursor_Code/arabreezy/docs/phase-difficulty-standards.md`
**Source:** Supabase project `sgvalritfnyiwxjwpqjj`, schema `public`, dialect `saudi`
**Method:** SQL audit via Supabase MCP (read-only).

## Per-phase inventory vs spec

| Phase | Words spec/actual | Lessons spec/actual | Stories spec/actual | Listening spec/actual | Idioms spec/actual | Shadowing spec/actual |
|---|---|---|---|---|---|---|
| 1 | 30 / **268** | 3-5 / **20** | 0 / **20 (forbidden)** | 1 / **23** | 0 / **3 (forbidden)** | 3 / 22 |
| 2 | 50 / **288** | 3-4 / **20** | 0 / **23 (forbidden)** | 1 / **22** | 0 / **10 (forbidden)** | 3 / 21 |
| 3 | 80 / **261** | 4 / **20** | 1 / **23** | 1-2 / **22** | 0 / **19 (forbidden)** | 3 / 21 |
| 4 | 120 / **278** | 5 / **20** | 2 / **20** | 2 / **21** | 0 / **22 (forbidden)** | 3 / 20 |
| 5 | 160 / **273** | 3 / **22** | 2 / **21** | 2 / **21** | 0 / **23 (forbidden)** | 2 / 20 |
| 6 | 200 / **273** | 4 / **20** | 2-3 / **20** | 2-3 / **20** | 0 / **24 (forbidden)** | 2 / 21 |
| 7 | 240 / **292** | 4 / **20** | 3 / **20** | 3 / **19** | 0 / **27 (forbidden)** | 2 / 21 |
| 8 | 280 / **307** | 4 / **20** | 3 / **19** | 3 / **19** | 2-3 / **24** | 2 / 21 |
| 9 | 320 / **346** | 4 / **20** | 3 / **20** | 3 / **20** | 4-5 / **26** | 2 / 20 |
| 10 | 400+ / **356** | 4 / **20** | 3 / **20** | 3 / **20** | 6-10 / **27** | 2 / 20 |

`pronunciation_targets` ~21-23/phase, `grammar_drills` ~18-22/phase — spec is silent on counts here.

## Structural integrity (PASSING)

- `focal_word_ids.length >= 6` (CLAUDE.md hard rule): zero violations — every lesson has exactly 8.
- No `focal_word_id` references a word above its lesson's phase: zero violations.
- No dangling focal_word_ids: zero missing references.
- Every lesson's max focal-word phase equals the lesson's own phase (avg_gap = 0.00 across all 10 phases). Word-id allocation is internally consistent.

## Violations

### V1 — Idioms exist at Phases 1-7 (HARD-RULE violation, 178 forbidden rows)
Spec: "idioms are Phase 8+. There are NO idiom exercises at Phases 1-7."
Counts: P1=3, P2=10, P3=19, P4=22, P5=23, P6=24, P7=27.
Many are MSA/classical proverbs, not Saudi:
- P1 `id_b40` *الوقت من ذهب لكن ما يشترى* (advanced MSA vocab, opaque)
- P1 `id_d40` *الفعل يسبق القول* (formal MSA)
- P2 `i_il_layl_w_sayil` *الصبر مفتاح الفرج* (classical)
- P3 `id_c02` *إذا بليتم فاستتروا* (Quranic register)

Fix: bulk-reclassify (move) most to Phase 8-10 (preferring opaque/cultural ones to P10), delete or rewrite the literal-meaning ones as Phase-4 shadowing phrases.

### V2 — Stories at Phase 1 and Phase 2 (HARD-RULE violation, 43 rows)
Spec: "Phase 1 — Stories: 0", "Phase 2 — Stories: 0 (no stories — vocab pool too small)."

Fix: convert into shadowing phrases or longer flashcard sentences, or delete. Several P1 stories run 10-16 Arabic words anyway (`s_school_day`, `s_market_morning`) — promote to P3 stories with vocab swaps.

### V3 — Stories systematically under-length at every phase 3-10 (HARD-RULE)
Spec band vs actual max word counts:
- P3 spec 20-30 → 20/23 stories under 20; only 1 in band.
- P4 spec 30-50 → 20/20 stories under 30 (max=8 words!).
- P5 spec 50-80 → 21/21 under (max=21).
- P6 spec 80-120 → 20/20 under (max=25).
- P7 spec 120-200 → 20/20 under (max=21).
- P8 spec 200-300 → 19/19 under (max=22).
- P9 spec 300-500 → 20/20 under (max=15).
- P10 spec 500-800 → 20/20 under (max=32).

Stories are roughly **5-10% of spec length at upper phases**. The Stories activity is effectively flashcards-with-titles right now.

Fix: highest content-write priority. P7-10 stories need 10-30× more text.

### V4 — Listening exercises massively under-length (HARD-RULE)
Spec word counts vs actual max:
- P4 25-40 → max 19
- P5 40-60 → max 21
- P6 60-90 → max 25
- P7 90-150 → max 21
- P8 150-250 → max 22
- P9 200-350 → max 15
- P10 300-500 → max 32

Equivalent audio length ~5s at every phase, vs spec 6 s → 5 min. ALL P1-3 listenings carry `section_breaks` populated, but spec says "first section break at P4."

Fix: rewrite `listening_exercises.paragraphs` to hit band. Add `section_breaks` only from P4.

### V5 — Tashkeel coverage at P1-3 ~0% (HARD-RULE)
Spec: "Phases 1-3: Full tashkeel on every word in lessons and shadowing. Diacritics on flashcards."
- Words: P1=2.6%, P2=0%, P3=0%
- Shadowing: P1=4.5%, P2=0%, P3=4.8%

Spot-check P1 dialogue: *كم عمرك؟* / *عمري عشرين سنة* — should be *كَمْ عُمْرُكْ؟* / *عُمْرِي عِشْرِين سَنَة*.

Fix: regenerate `script` for `words` and `shadowing_phrases` at P1-3 with full vocalization, plus `lessons.dialogue[].script` at P1-3.

### V6 — Lesson uniformity vs phase-tailored shape
- Every lesson has exactly **8 focals** (spec: 4-6 at P1-7, 3-5 at P5-7, 3-4 at P8-10). 8 violates every phase.
- Every lesson has exactly **2 dialogue turns** (spec: 2-3 at P1, scaling to 4-5 at P4, 5+ at P5-6).
- Every phase has ~20 lessons (spec: 3-5 at P1, scaling to 4 at P5-10). 4-5× the spec'd lesson density.
- No distinction between vocab / root / pattern lesson types (spec mandates root-lessons P3+, pattern-lessons P5+).

Fix: prune to spec count by selecting the strongest 4-5 per phase; thin focals to 4-6; expand dialogues at mid-phases; tag lesson type and build dedicated root/pattern lessons at P3+/P5+.

### V7 — P1 vocabulary scope leakage
P1 includes *جدي* (grandfather), *جدتي* (grandmother) — spec puts family at P3. Also *غالباً* (often, MSA adverb) and *شخص* (abstract). P1 lesson `l_1_age` teaches *عشرين سنة* (twenty) — spec says no numbers in P1 (defer to P2 for 1-5, P5 for functional use).

Fix: demote to target phases. Audit all P1-3 words for register/scope drift.

### V8 — P1 lesson `l_1_friendly_address` teaches *حبيبي* (habibi)
Spec puts slang-address at P10. Reclassify to P10 or remove from P1.

### V9 — Shadowing phrases far below band length
Cross-phase: every phase's shadowing phrases average 2.4-3.9 words; spec calls for up to 12 words at P8-9. Out-of-band counts: P2=20/21, P3=21/21, P4-9=20-21/21. Only P1 (band 2-4) and partially P10 (band 6-10) sit in spec.

Fix: rewrite shadowing scripts P2-9 to band length, with natural register progression.

### V10 — Lesson check_questions are minimal
Every spot-checked lesson has 1 `check_question`. Spec at P1 allows 1-2; at P10 demands *usage* questions. Single question at advanced phases is insufficient.

## Recommendations (prioritized by user impact)

1. **Move all idioms at P1-7 out (V1).** Highest user-impact violation — the spec's idiom-gating rationale is that early-phase idioms train the wrong heuristic. Bulk SQL update phase → 8/9/10 for opaque ones; delete or repurpose the literal ones.
2. **Add tashkeel to P1-3 lessons, shadowing, and word scripts (V5).** Beginners explicitly need vowels; bare script at P1 actively trains the wrong reading pattern. Regenerate `script` for ~817 P1-3 word rows + 64 P1-3 shadowing rows + P1-3 lesson dialogue arrays.
3. **Reduce lesson count to spec band and split into vocab/root/pattern types (V6).** 4× spec'd lesson density bloats phase progression; root and pattern lessons are entirely missing despite primer being mandatory at P3+.
4. **Rewrite stories P3-10 to band length (V3).** Stories at P7-10 carrying 8-22 words instead of 120-800 means the activity provides zero reading practice.
5. **Rewrite listening exercise paragraphs to band length (V4).** Same issue as stories; audio rollout depends on having scripts at correct length first.
6. **Delete or reclassify Phase 1-2 stories (V2).** Easiest cleanup; convert promising candidates to shadowing or to P3 stories.
7. **Audit P1-3 vocabulary scope (V7, V8).** Demote family/numbers/abstract/slang words to their proper phase. Particularly *حبيبي* at P1.
8. **Thin `focal_word_ids` to 4-6 per lesson and add more dialogue turns at P4+ (V6).**
9. **Add a second check_question per lesson; convert P10 checks to usage-format (V10).**
10. **Trim P1-3 listening `section_breaks` to empty (V4 sub-point).**

## TL;DR

**Structural integrity (focal-id references, phase constraints, schema) is clean.** Content depth and per-phase rules are largely violated:
- Idioms shouldn't exist below P8 — **178 do**.
- Stories shouldn't exist at P1-2 — **43 do**.
- Every story / listening above P3 is **5-10% of spec length**.
- Tashkeel is missing where it's mandatory at P1-3.
- Lessons are uniform-batch (**8 focals × 2 dialogue turns × ~20 per phase**) regardless of phase.

The biggest learner-facing problems are **V1 (idioms misplaced)** and **V3-V4 (under-length reading/listening at intermediate+)**.
