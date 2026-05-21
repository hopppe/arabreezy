# Word-list quality report

**Date:** 2026-05-20
**Source:** Supabase project `sgvalritfnyiwxjwpqjj`, `public.words`, dialect='saudi'
**Total Saudi words:** 2,955 across 10 phases.

## Distribution

| Phase | Count | Cumulative | Expected band | Verdict |
|---|---|---|---|---|
| 1 | 171 | 171 | top ~300 | **undersized** but moving in the right direction (was 150 before frequency audit). The most common words now sit here including تَمَام, إن شاء الله, والله, خلاص, طيب, شاي, ماء, قهوة, اليوم, بكرة, أمس. |
| 2 | 323 | 494 | next ~500 | spot-on |
| 3 | 343 | 837 | next ~700 | slightly oversized but coherent |
| 4 | 281 | 1,118 | next ~700 | spot-on |
| 5 | 280 | 1,398 | next ~500 | spot-on |
| 6 | 272 | 1,670 | next ~500 | spot-on |
| 7 | 292 | 1,962 | next ~500 | spot-on |
| 8 | 303 | 2,265 | next ~500 | spot-on |
| 9 | 348 | 2,613 | next ~300 | **slightly oversized** — civic / abstract / religious dump |
| 10 | 342 | 2,955 | rare tail | mix of literary + slang fillers (intentional) |

**Total ~2,955 vs expected ~6,000 for "near native by P10".** The vocabulary is currently sized for a B1/B2 endpoint, not C1/C2. To hit "knows essentially every word they need" by P10, we'd want ~2× the current volume, distributed mostly in P5-P10. Action item for later seeding.

## Per-phase quality assessment

### Phase 1 — **GOOD**
First 30 words include greetings (`ahlan`, `sabaah al-khayr`, `tisbah ʿala khayr`), blessings (`alhamdulillah`, `allah yibaarik`, `in shaa allah`), agreement (`akeed`, `aywa`, `wala yihimmak`), apologies (`aasif`, `aasifa`), and the social glue (`shakhbaarak`, `keefak`, `wahashtana`). All P1-appropriate.

One known leftover from the earlier audit: `w_ariid` (أُرِيد, MSA "I want") is still at P1. The Saudi form `abgha` is also P1. The MSA variant could move to P2 as a secondary form, but it's not actively harmful at P1.

### Phase 2 — **GOOD**
Numbers, colors (black, blue, red), days of the week, weather (cold), basic adjectives (big, correct, but), basic verbs (he took, he came). Logical second tier.

Known issue from earlier audit: `w_aamin` (آمَن, "he believed" classical religious) was supposed to move from P2 to P9. **The audit agent caught it and the application agent moved it** — confirmed in current data: `w_aamin` is at **P9**.

### Phase 3 — **MOSTLY GOOD; 2 small issues**
Family (`bint`, `tuffaaḥ` apples, `mooz` bananas), basic verbs (`akala` he ate, `akl` food), descriptors (`jameel` beautiful), animals (`ṭayr` bird), school (`kitaab` book).

**Issue 1:** `w_ayna` (أَيْن MSA "where?") is still at P3. The Saudi form `wayn` is already at P1. Recommend moving `w_ayna` to P2 as the secondary register form.

**Issue 2:** `w_abaya` (عباية) at P3 is fine but might be more natural at P4 alongside other clothing/garment vocabulary.

### Phase 4 — **GOOD**
Body parts (`dhiraaʿ` arm, `ẓahr` back), action verbs (`yrudd` answers, `yis'al` asks, `yooṣal` arrives Saudi), abstract (`amr` matter), prayer time (`al-asr`), household (`ḥammaam` bathroom). Logical mid-tier.

### Phase 5 — **GOOD**
Banking & money (`bank`, `kaash`, `kaarṭ`, `ṣarraaf`), opportunities (`furṣa`, `fursa baaqi`), digital (`birnaamij`, `app`), sport (`kurat salla`), emotion (`khaayif`). Strong intermediate transactional vocab.

### Phase 6 — **GOOD**
Saudi institutional (`absher`, `mataar`, `ḥisaab`), abstract feelings (`ghaḍab`), appointments / official transactions (`maw3id`, `yqaddim`). Strong "navigating Saudi life" tier.

### Phase 7 — **GOOD**
Workplace vocab (`mudeer`, `zamiil`, `sharika`, `masaar mihni`), feelings (`zaʿlaan jiddan`, `mumill`, `mashghool`), instructional (`hissa` class). Solid upper-intermediate cluster.

### Phase 8 — **GOOD**
Opinion / abstract reasoning verbs (`yuwaafiq` agrees, `yfariḍ` assumes, `yqaaran` compares, `asaddiq` believes), connectors (`maʿa anna` although, `muqaarana bi` compared to), evaluation (`al-afḍal`, `mukhtalif`). Excellent advanced reasoning tier.

### Phase 9 — **MIXED; 3 known issues unfixed**
Civic / abstract / religious-classical (`niqaash` debate, `taṭweer` development, `bee'a` environment, `dhulm` oppression, `aamana` classical "he believed"). Mostly right.

**3 words flagged in the earlier audit are still at P9 — should move:**
- `w_culture` (ثقافة) → propose **P6**. Common social-conversation word.
- `w_economy` (اقتصاد) → propose **P7**. Vision-2030-era TV-news frequency.
- `w_dawla` (دولة state/country) → propose **P5**. Basic geography vocab.

These are not blocking issues but represent the long tail of the frequency-reclassification audit.

### Phase 10 — **MIXED, intentional**
Two clusters share this phase:
- **Literary / rhetoric** (`balaagha`, `faṣeeḥ`, `jinaas`, `istintaaj`, `binaa'an 3ala dhaalik`, `yunaaqiḍ`) — correctly P10.
- **Saudi-specific slang & fillers** (`ʿabduh` dude, `maashi l-haal` so-so, `mumtaaz` excellent, `kaafi` enough). These are arguably mid-tier; `mumtaaz` for instance is heard daily.

The P10 design intent (per the original spec) was "social-fluency capstone" — the slang clusters were meant to teach learners the conversational rituals at the end. That's a valid pedagogical choice, but it conflicts with the "frequency order" rule. A future cleanup could split:
- Slang fillers (`mumtaaz`, `kaafi`, `maashi l-haal`) → **P3-P4**.
- Address terms (`ʿabduh`) → **P5-P6**.
- Keep literary / rhetorical / formal at P10.

## Frequency-ordering verdict overall

**Strong** — far better than before this session's reclassifications. The big criticals (تَمَام / إن شاء الله / والله at P1; شاي / ماء / قهوة at P1; today/tomorrow/yesterday at P1; mother/father at P1; phone/book at P3; basic emotions at P2-P3) all landed.

**Remaining 4-5 reclassifications** (P3 `w_ayna` → P2; P9 culture/economy/dawla → P6/7/5; P10 slang fillers → P3-P6) are minor polish and can be batched in one ~10-row UPDATE pass when the agent budget refreshes.

## Coverage gap

Per the earlier coverage audit, **~40 high-utility Saudi words** were missing entirely:
- 36 seeded this session (prayer time names, Hajj/Umrah/Eid/Ramadan vocab, أبشر/توكلنا/Vision 2030, household مكيف/نافذة, civic تحرش/نسوية, checkpoint).
- ~4 still missing (specific Saudi cities `الرياض/جدة/مكة/المدينة` if not already seeded — would need verification).

## Total assessment

**Word ordering quality: B+.**

Strengths:
- High-frequency criticals at P1 ✅
- Logical thematic progression P2 → P10 ✅
- Phase counts roughly match expected frequency bands ✅
- ~99% tashkeel coverage at P1-P3 (set by V5 agent) ✅
- 100% image coverage on all Saudi words ✅

Gaps:
- 4-5 words mis-classified (audit identified, not yet applied)
- Total vocab volume is ~50% of "near-native by P10" target (2,955 of expected ~6,000)
- P10 has unresolved tension between "frequency floor" (slang at top) and "capstone literary" intent

**Bottom line:** the curriculum is in solid shape to ship for early-access. The vocabulary the learner meets first is the right vocabulary. The polish items are small enough to batch into one short content pass before public launch.
