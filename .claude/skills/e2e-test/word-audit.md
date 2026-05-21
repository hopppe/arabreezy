# Saudi word frequency / utility ordering audit

**Date:** 2026-05-20
**Source:** Supabase project `sgvalritfnyiwxjwpqjj`, table `public.words`, dialect='saudi'
**Method:** SQL sampling 30-50 words/phase + cross-checking each against expected Saudi-conversation frequency

## Per-phase totals (2,942 Saudi words across 10 phases)

| Phase | Count | Note |
|---|---|---|
| 1 | 150 | **Undersized** — should be ~300 (top frequency tier). Several core words live elsewhere. |
| 2 | 320 | reasonable |
| 3 | 341 | reasonable |
| 4-9 | 273-346 | reasonable bands |
| 10 | 358 | overpopulated with foundational fillers that belong at P1-P2 |

## Critical reclassifications (blocking natural learning)

These are P10 words that a learner hears in the first 60 seconds of any Saudi conversation. **Withholding them until P10 means a learner cannot speak natural Saudi for 9 phases.**

| Word | Current → Proposed | Why |
|---|---|---|
| تمام (tamaam) | P10 → **P1** | "Perfect/fine" — heard constantly |
| إن شاء الله (inshallah) | P10 → **P1** | Universal filler, day-1 |
| والله (wallah) | P10 → **P1** | Emphasis particle, every conversation |
| خلاص (khalas) | P10 → **P1** | "Done/finished" — ubiquitous |
| طيب (tayyib) | P10 → **P1** | More common than أوكي |
| ما شاء الله (mashallah) | P10 → **P1** | Universal exclamation |
| يا هلا (ya hala) | P10 → **P1** | This is how Saudis greet you walking in |
| أكيد (akeed) | P8 → **P2** | One of the most-used Saudi affirmatives |
| لأن (because) | P8 → **P4** | Learner cannot give a reason for 7 phases |
| سيارة (car) | P6 → **P3** | Core everyday noun in highest-car-per-capita country |

## High-impact reclassifications (significant phase drift)

| Word | Current → Proposed | Why |
|---|---|---|
| شاي (tea) | P2/P3 → **P1** | Saudi social staple |
| ماء (water) | P2/P3 → **P1** | Survival-level word |
| قهوة (coffee) | P2 → **P1** | Saudi cultural cornerstone |
| اليوم/بكرة/أمس (today/tomorrow/yesterday) | P2/P4 → **P1** | Core time triad |
| أب/أم (father/mother) | P3 → **P1** | بابا/ماما are P1 but أب/أم at P3 is inconsistent |
| أخ/أخت (brother/sister) | P3 → **P2** | Immediate family |
| جوال (phone) | P6/P7 → **P3** | Essential daily vocab |
| كتاب (book) | P7 → **P3** | School-vocabulary block |
| مبسوط/حزين/تعبان (happy/sad/tired Saudi forms) | P7 → **P2-P3** | First-week emotion sentences |
| حبيبي/حبيبتي | P10 → **P2** | Address terms used constantly |
| بكم (how much) | P5 → **P3** | Every market transaction |
| أحسن (better) | P8 → **P4** | Comparative |

## Out-of-band low (too advanced — promote)

| Word | Current → Proposed |
|---|---|
| آمَن (he believed, MSA religious) | P2 → P9 |
| ديموغرافي (demographic) | P9 → P10 |

## Duplicates to deduplicate

- `w_house` (P4) vs `w_bayt` (P3) vs `w_g2_p1_217` (P1) — three entries for "house". Consolidate at P1.
- `w_g2_p10_003` (يعني P10) vs `w_g2_p1_139` (يعني P1) — keep P1, delete P10.
- `w_today/tomorrow/yesterday` legacy ids at P4 overlapping `w_g2_p2_077-079` at P2 — consolidate at P1.

## Phase-10 coverage gap (words MISSING entirely)

A learner who finishes Phase 10 should "know essentially every word they need." These ~40 high-utility Saudi words are absent from the DB:

**Time** — ساعة (hour), دقيقة (minute), ثانية (second)

**Religion / Saudi culture (load-bearing for a Saudi-Arabic course)** — صلاة (prayer), الفجر/الظهر/العصر/المغرب/العشاء (5 prayer times), حلال, حرام, زكاة, صيام, عيد الفطر, عيد الأضحى, ليلة القدر, مسجد/جامع, الكعبة, الحرم, حج/عمرة, رمضان, سحور, إفطار, محرم

**Saudi modern life** — دوام (working hours), إجازة (vacation), نقطة تفتيش (checkpoint), أبشر (Saudi gov app), توكلنا (Saudi health app), رؤية ٢٠٣٠ (Vision 2030), ترفيه (entertainment authority context)

**Civic / contemporary** — تطوع (volunteering), جنسية (nationality), هوية (ID), بلد المنشأ (country of origin), خادمة/عمالة (domestic worker/labor), تحرش (harassment, contemporary), نسوية (feminism, contemporary), قيادة (driving/leadership)

**Household** — طاولة (table), نافذة (window), مكيف (air conditioner — culturally essential)

**Cities** — الرياض, جدة, مكة, المدينة (canonical city names — should exist)

## Severity summary

- **CRITICAL** (5 items): تمام, إن شاء الله, والله, خلاص, طيب stuck at P10.
- **HIGH** (~20 items): tea/water/coffee, today/tomorrow/yesterday, parent terms, phone, book, basic emotions, address terms.
- **MEDIUM** (~15 items): culture/freedom/economy at P9, MSA forms misplaced, duplicates.
- **LOW** (~10 items): minor polish.

**Total reclassification proposals: 50.** **Phase-10 coverage gap: ~40 missing words.**

This is an analysis pass — no UPDATEs were run. The dev should review then apply in batches, paying attention to the **focal_word_ids cascade**: when a word's phase is moved upward (e.g. آمَن P2→P9), any lesson with `lesson.phase < new_phase` that references it as focal becomes invalid. When moved downward (e.g. تمام P10→P1), no constraint breaks.
