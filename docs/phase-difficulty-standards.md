# Phase Difficulty Standards

Authoritative reference for content difficulty across Arabreezy's **10 phases**. Every activity — lessons, flashcards, guided conversations, shadowing — MUST follow these standards.

**The goal:** keep learners **interested but not discouraged**. Content should feel slightly challenging but achievable. A user who constantly feels lost disengages. A user who finds content too easy gets bored. The sweet spot is *"I understood most of that, and I learned something new."*

---

## HARD RULE — minimum 20 items per phase per activity

**Every activity must carry AT LEAST 20 items at every phase, P1 through P10.** Activities subject to this floor: `lessons`, `shadowing_phrases`, `conversations`, `stories`, `listening_exercises`, `idioms`, `pronunciation_targets`, `grammar_drills`.

When a per-activity table dips below 20 in any phase, the only valid response is to **author more items**, never to delete others to "match a smaller spec band". The quality bands below (length, register, focal-count, tashkeel) describe HOW to write each item; the count floor of 20 describes HOW MANY there must be. The two are independent.

The old per-phase counts in the cross-phase comparison table further down (e.g. "P1 lessons: 3-5") are obsolete and superseded by the 20-floor.

## HARD RULE — word ordering is frequency / utility based

Words are assigned to phases by **how soon a real Saudi learner needs them**. P1 holds the highest-frequency, highest-utility Saudi vocabulary (greetings, pronouns, yes/no, food/drink basics, family core, prepositions, today/now). Each subsequent phase adds the next tier of utility. **By the end of Phase 10 a learner should recognize essentially every word they need in daily Saudi conversation.**

When seeding new words or rephrasing existing ones, ask the frequency question first: *how soon does a daily-life learner meet this?* — and assign phase accordingly. Religious-jurisprudential vocabulary, literary register, regional slang and archaisms belong at P9-P10. Common transactional Saudi belongs at P1-P4.

Modeled on the English app's `CEFR_DIFFICULTY_STANDARDS.md` but scaled to 10 phases and adapted for Arabic. Phase 1 = beginner (pre-A1). Phase 10 = near-native fluency (~1,500 productive roots, ~6,000 words, full code-switching).

---

## The curriculum spine: roots + patterns, not flat word lists

Arabic words are built from a 3-letter **root** plugged into a morphological **pattern**. One root × one pattern = one word. Our curriculum teaches ~1,500 productive roots + ~15 core patterns over 10 phases, which is what empirically gets learners to fluency.

**Three lesson types:**
| Type | Used from | Structure |
|---|---|---|
| **Vocab lesson** | P1–2 (mostly) | 4–6 unrelated words. No root/pattern emphasis. |
| **Root lesson** | P3+ | One root + phase-appropriate derivations (see Progressive Unlock below). "Meet the k-t-b family." |
| **Pattern lesson** | P5+ | One pattern + 5 roots it combines with. "The *faaʿil* / doer pattern across five roots." |

**The root-system primer** (`src/data/dialects/saudi/primer.js`) is a 3-lesson crash course that teaches the concept itself. It's shown automatically after placement when `placedPhase >= 3`, and is always available from the Activities tab. A user can't understand root lessons until they've taken the primer.

---

## Progressive Unlock — the most important pedagogical rule

**A root's family SPANS PHASES.** Introducing a root at Phase 3 does NOT mean dumping every derivation on the learner at Phase 3. Each word has its own `phase`; root lessons filter to `word.phase <= currentPhase`.

Example — the k-t-b family:

| Word | Arabic | Phase | Why that phase |
|---|---|---|---|
| *kitaab* (book) | كِتَاب | 3 | concrete noun, high frequency |
| *maktab* (office) | مَكْتَب | 4 | *mafʿal* "place of" pattern |
| *maktaba* (library) | مَكْتَبَة | 4 | same pattern, easy once *maktab* is learned |
| *kaatib* (writer) | كَاتِب | 5 | *faaʿil* "doer" pattern intro |
| *kataba* (he wrote) | كَتَبَ | 5 | past-tense verb, needs that grammar |
| *maktuub* (written / letter) | مَكْتُوب | 6 | passive participle, grammatical lift |
| *mukaatib* (correspondent) | مُكَاتِب | 7 | Form III |
| *istaktaba* (to dictate) | اِسْتَكْتَبَ | 9 | Form X |

**Rules:**
- Root lessons at Phase N include only words with `word.phase <= N`.
- When a learner advances to a phase that unlocks a new family member, a short revisit lesson says "new member of the k-t-b family: *kataba* — now that you know past tense." This gives the SRS system another free retention pass.
- Root **introducedAt** (in `roots.js`) is the phase where the family concept is FIRST revealed, not where every member is taught.

**Checking content against this rule:** a root lesson that lists 8+ derivations at Phase 3 is wrong. Beginners can't absorb that many items at once, and many of those derivations require grammar they haven't learned. Keep root-lesson size at 3–5 members per phase.

---

## Semantic Drift — set honest expectations

Patterns are RULES. Roots are ORGANIZATIONAL SCAFFOLDING. Learners should trust patterns to predict meaning; they should NOT trust roots to predict meaning.

**Why roots drift:**
- *kataba* "write" is clean. *kitaab* "book", *maktab* "office", *maktaba* "library", *kaatib* "writer", *maktuub* "written/letter" — all track the root.
- *jahada* "strive" gives *jihaad* "struggle" and *mujtahid* which today usually means a specific kind of Islamic jurist or "striver". Learner can't guess "jurist" from "strive" alone.
- *kafara* "to cover" gives *kaafir* "unbeliever" (one who covers the truth) and *ghafara* "forgive" (to cover over sin). Learner would NEVER guess "unbeliever" from "cover".

**Each word in `words.js` carries a `semanticDrift` tag:**
- `'none'` — word's meaning sits squarely inside the root's core sense. Safe to predict.
- `'some'` — meaning drifted but still recognizable. Show a driftNote.
- `'large'` — meaning has drifted far. Explicitly warn: "don't over-trust the family on this one." Teach the specific meaning like a new word.

**UI consequences:**
- Root-family views sort `none` → `some` → `large` (canonical meanings first).
- Words with `'some'` or `'large'` drift get a visible badge and a `driftNote` sentence on the card.
- Primer Lesson 3 explicitly addresses drift so learners aren't surprised when they hit *kaafir*.

**Core pedagogical message to the learner:** *Patterns you can predict; roots are your organizing memory scaffold. The root helps you read the word faster and remember it better — not guess its meaning.*

---

## Cross-cutting principles

### Script & diacritics (tashkeel)
- **Phases 1–3:** Full tashkeel on every word in lessons and shadowing. Diacritics on flashcards. Beginners need the vowels.
- **Phases 4–6:** Tashkeel only on focal/new words. Review words shown bare.
- **Phases 7–10:** Bare script by default, tashkeel only for disambiguation (homographs, rare vocabulary).

### Transliteration
- **Phases 1–4:** Always shown alongside Arabic script on word cards and dialogue.
- **Phases 5–7:** Shown on focal/new words only. Can be toggled off on review cards.
- **Phases 8–10:** Transliteration hidden by default; reveal on tap.

### Dialect (Saudi primary)
- **Phases 1–4:** Use Saudi forms when they're the natural everyday word (*zain*, *bukra*, *fluus*, *abgha*, *wain*, *shnoo*). Flag the MSA equivalent in notes. Avoid fused-script vs. colloquial confusion.
- **Phases 5–7:** Introduce MSA variants for reading/news register. Teach the Saudi–MSA pairs explicitly.
- **Phases 8–10:** Full register flexibility. User is expected to code-switch between Saudi and MSA; guided conversations at this level should mix both.

### Gender, dual number, root system
- **Phase 1:** Introduce masculine forms only. Note "feminine exists" without drilling.
- **Phase 2:** Introduce feminine pronouns + basic feminine agreement ("*ana mabsuut*" vs. "*ana mabsuuta*" — M/F).
- **Phase 3:** Explicit feminine endings on adjectives and basic verbs.
- **Phase 4+:** Dual forms (*-aan* / *-atayn*) introduced.
- **Phase 5+:** Broken plurals introduced naturally through vocab.
- **Phase 6+:** Root-pattern awareness — pairs like *kataba* / *kitaab* / *maktab* clustered in lessons so learners see the pattern.

### RTL UI
Every screen runs `createRTLStyle` against Saudi content. This is structural, not per-phase.

---

## Phase 1 — Beginner
**Rough CEFR: Pre-A1 · Target vocab: ~30 words · The "survival" phase**

### Who is this user?
Someone who knows almost no Arabic. Maybe recognizes a handful of words (*shukran*, *inshallah*, *marhaba*). Cannot construct sentences. Arabic script is still mostly visual noise. Everything feels foreign.

### Core principle
**English is the bridge.** UI is English. Arabic is introduced one word at a time. Every new word gets script + transliteration + English + optional audio. We are building a foundation of isolated words and *three* simple patterns: greeting, pronoun + "I am…", yes/no.

### Vocabulary scope
- **Greetings:** *marhaba*, *hala*, *ahlan*, *maʿa s-salāma*
- **Politeness:** *shukran*, *min fadlak*, *naʿam*, *laa*
- **Pronouns:** *ana*, *enta / enti*, *huwa*, *hiya*, *nahnu*, *hum*
- **Essentials:** *ism*, *ismi*, *kayf haalak*, *zain* (Saudi "good")
- **Numbers:** none yet (Phase 2)

### Grammar ceiling
- Juxtaposition for "to be": *ana Ahmad* (I [am] Ahmad). No copula verb taught.
- No conjugation. No past tense. No agreement beyond memorized forms.

### Content standards

**Lessons**
- 4–6 focal words per lesson.
- Structure: intro → words one-by-one → tiny dialogue (2–3 turns) → check (1–2 multiple-choice).
- Every dialogue turn references a word the user just saw.

**Flashcards**
- Script front / English + transliteration back.
- Only words from completed lessons and current lesson.
- "Again" threshold is generous — a miss re-queues immediately.

**Guided conversations**
- One 3–4 step scripted exchange per phase, using only phase-1 vocab.
- 2–3 reply options per user turn. One correct, others near-miss with short feedback.
- No branching beyond depth 1.

**Shadowing**
- Max 4 words per phrase.
- Tashkeel on every word. Slow delivery when audio exists.
- Example: *hala, kayf haalak?* / *ismi Ahmad* / *zain, shukran*.

### Placement-test feel
Script → English recognition of greetings and pronouns. "Which word means 'hello'?" with 4 script choices.

**Example phrase:** *هلا! كيف حالك؟* — "Hey! How are you?"

---

## Phase 2 — Elementary
**Rough CEFR: A1 · Target vocab: ~50 words · The "numbers, colors, days" phase**

### Who is this user?
Someone who has greetings down and can identify pronouns. Starts noticing the Arabic alphabet instead of just seeing squiggles. Can memorize a word given script + transliteration + English. Cannot yet read unfamiliar words.

### Core principle
**From isolated words to tiny patterns.** "I want X", "I have X", numeric counting, naming colors and days. We introduce *one* piece of feminine agreement (pronouns) and move on.

### Vocabulary scope (adds)
- Numbers 1–5 and 10
- Colors: red, blue, black, white, green, yellow
- Days: Sunday, Monday, Friday (enough to orient)
- Verbs: *abgha* (I want), *ʿindi* (I have)
- Drinks: *shay*, *qahwa*

### Grammar ceiling
- Possessive suffix *-i* on one word: *ismi* (my name). No other suffixes yet.
- Basic number + noun agreement is **skipped**; we use numerals as labels only.
- Feminine pronouns introduced but not feminine verb agreement.

### Content standards

**Lessons**
- 4–6 focal words per lesson.
- Include one lesson dedicated to numbers 1–5 as flashcards-with-context.
- Check questions still multiple-choice.

**Flashcards**
- Add color and number cards. Image cue (color swatch or numeral) optional alongside script.

**Guided conversations**
- 3–4 step exchanges. Start introducing variant user replies that both succeed ("*naʿam, min fadlak*" and "*laa, shukran*" both valid).

**Shadowing**
- 4–6 words. Still heavy tashkeel.
- Example: *abgha qahwa min fadlak* / *ʿindi thalaatha ikhwa*.

### Placement-test feel
"Which word means 'three'?" "Which word means 'red'?" — four Arabic choices.

**Example phrase:** *أبغى قهوة من فضلك* — "I want coffee, please."

---

## Phase 3 — Pre-Intermediate
**Rough CEFR: A1/A2 · Target vocab: ~80 words · The "people, food, questions" phase**

### Who is this user?
Can greet, count, and identify colors and days. Starts wanting to ask questions. Recognizes ~50 written words but still reads slowly. Feminine agreement feels like noise.

### Core principle
**Who, what, where.** Introduce question words, family, food basics. First real Saudi-specific vocabulary (*shnoo*, *wain*) explicitly contrasted with MSA (*maa*, *ayna*) in notes.

### Vocabulary scope (adds)
- Family: mother, father, sister, brother, son, daughter, friend
- Food: bread, water, rice, meat, chicken, tea, coffee
- Questions: *shnoo* (what?), *wain* (where?)

### Grammar ceiling
- Explicit feminine endings on nouns (*ukht*, *bint*).
- Question-word-first sentence order: *shnoo hadha?* / *wain al-bayt?*
- Still no conjugated verbs beyond memorized *abgha* / *ʿindi*.

### Content standards

**Lessons**
- 4–6 focal words.
- One lesson pair: "Family — immediate" + "Family — extended." Another: "At the table" + "Simple questions."

**Flashcards**
- Add a "word family" tag — lessons' focal-word set stays clustered in the deck.

**Guided conversations**
- First multi-turn conversation that forks: e.g. ordering food, where one reply leads to "and water?" and the other skips to "alright, one minute."
- Introduce short translations as subtle hint (shown under script on the user's reply options).

**Shadowing**
- 3 phrases. 5–7 words. Introduce a question phrase.
- Example: *wain al-bayt?* / *shnoo tabgha taakul?*

### Placement-test feel
"Which word means 'mother'?" "Which word means 'bread'?" — four Arabic choices.

**Example phrase:** *شنو تبغى تاكل؟* — "What do you want to eat?"

---

## Phase 4 — Intermediate I
**Rough CEFR: A2 · Target vocab: ~120 words · The "daily life" phase**

### Who is this user?
Can handle greetings, names, basic requests, and name common people/foods. Ready for places and movement. Starts recognizing word shapes instead of sounding out every letter.

### Core principle
**Places + motion.** Introduce directional and locative vocabulary. First conjugated verbs: *aruuh* (I go), *aji* (I come). Start tapering tashkeel on review words.

### Vocabulary scope (adds)
- Places: market, house, school, hospital, mosque, restaurant
- Time markers: *al-yawm*, *bukra*, *ams*, *al-hiin* (Saudi forms)
- Motion: *aruuh*, *aji*
- Directions: *yamiin*, *yasaar*, *ʿala tuul*

### Grammar ceiling
- Present-tense conjugation, 1st person singular only: *aruuh*, *aji*, *abgha*.
- Dual form *-aan* introduced passively (no drilling).
- Locative *fii* (in/at).

### Content standards

**Lessons**
- 4–6 focal words.
- "Places around town," "More places," "Time words," "Going places," "Directions."
- Dialogue turns stretch to 4–5 exchanges.

**Flashcards**
- Start showing example sentence on the back of the card alongside English gloss.

**Guided conversations**
- 4–6 step exchanges. First branch that loops (correct reply → next step, incorrect → retry same step with a hint).

**Shadowing**
- 3 phrases. 6–8 words. Tashkeel only on unfamiliar words.
- Example: *aruuh as-suuq bukra* / *ʿala tuul thumma yamiin*.

### Placement-test feel
"Which word means 'market'?" "Which Saudi word means 'tomorrow'?" — four Arabic choices.

**Example phrase:** *أروح السوق بكرة* — "I'll go to the market tomorrow."

---

## Phase 5 — Intermediate II
**Rough CEFR: A2/B1 · Target vocab: ~160 words · The "transactions" phase**

### Who is this user?
Can describe their day at a surface level. Wants to do something with the language — shop, order, bargain. Vocabulary gaps are the bottleneck, not grammar.

### Core principle
**Do something useful.** Everything in this phase earns its keep in a real-world transaction. Introduce the *bikam* / *ghaali* / *rakhiis* / *khasm* shopping cluster and the Saudi currency (*riyaal*, *fluus*).

### Vocabulary scope (adds)
- Shopping: *bikam*, *ghaali*, *rakhiis*, *fluus*, *khasm*, *faatuura*, *riyaal*
- Verbs: *adfaʿ* (I pay), *ashtari* (I buy), *abiiʿ* (I sell)

### Grammar ceiling
- Numbers 1–10 used functionally (stating prices).
- Adjective agreement (masculine/feminine) with concrete nouns.
- Comparative *aghla min* (more expensive than) introduced informally.

### Content standards

**Lessons**
- "Asking prices," "Money & riyals," "Bargaining."
- Each lesson's check has at least one question that requires choosing between Saudi and MSA form.

**Flashcards**
- Add "sentence context" card type for verbs: user sees the verb and picks the right object from 3 options.

**Guided conversations**
- Our flagship bargaining scenario. 5+ turns, 2+ forks, feedback on each user choice.
- Completion message rewards strategy, not just correctness.

**Shadowing**
- 2 phrases. Longer (6–10 words). Natural conversational intonation.
- Example: *bikam hadha min fadlak?* / *fii khasm?*

### Placement-test feel
"Which word means 'how much?'?" "Which word means 'cheap'?"

**Example phrase:** *غالي شوي، في خصم؟* — "A bit expensive — is there a discount?"

---

## Phase 6 — Upper-Intermediate
**Rough CEFR: B1 · Target vocab: ~200 words · The "travel" phase**

### Who is this user?
Can handle a transaction. Can survive a short trip if pointed in the right direction. Reads signs and menus. Listens to a clear speaker and catches most of it.

### Core principle
**Get from here to there.** Transport, travel paperwork, time units bigger than a day. Introduce the broken plural patterns that show up in travel vocab (*ayyaam*, *shuhuur*).

### Vocabulary scope (adds)
- Transport: airport, station, taxi, bus, car, ticket, hotel
- Time units: hour, minute, week, month, year

### Grammar ceiling
- Plural forms (regular + broken) introduced through the vocab.
- Prepositions *min*, *ila*, *fii* used in real sentences.
- Future marker *raH* or *bi-* introduced passively.

### Content standards

**Lessons**
- "Getting around," "Ticket & hotel," "Time units," "Weeks, months, years."

**Flashcards**
- Show singular + plural together on the card back for nouns that have broken plurals.

**Guided conversations**
- Scenarios where destination matters — taking a taxi, booking a hotel.
- 5+ step exchanges with room for polite phrasing.

**Shadowing**
- 2 phrases. 7–10 words.
- Example: *al-mataar baʿiid min huna* / *taksi lil-mataar law samaht*.

### Placement-test feel
"Which word means 'airport'?" "Which word means 'hour'?"

**Example phrase:** *تاكسي للمطار لو سمحت* — "Taxi to the airport, please."

---

## Phase 7 — Advanced I
**Rough CEFR: B1/B2 · Target vocab: ~240 words · The "feelings & work" phase**

### Who is this user?
Can do transactions and travel. Ready to express themselves — moods, preferences, work life. Hears Saudi speakers and catches most tone, if not every word.

### Core principle
**Express yourself, not just your needs.** Feelings, work/study contexts, opinions-lite. Saudi-specific emotional vocabulary (*mabsuut*, *zaʿlaan*, *taʿbaan*) is the focus.

### Vocabulary scope (adds)
- Feelings: happy, sad, tired, angry, bored, excited
- Work/study: university, office, job, class, meeting, colleague

### Grammar ceiling
- Feminine verb agreement expected in produced speech (*ana mabsuuta*).
- Adverbs of degree: *shwayya*, *jiddan*, *kthiir*.
- Simple past tense introduced.

### Content standards

**Lessons**
- "How are you, really," "More feelings," "Work & study," "At the office."

**Flashcards**
- Start showing example sentences in both present and past tense for verbs.

**Guided conversations**
- Workplace small talk. Multiple valid reply options that reveal character (polite, honest, upbeat).
- Feedback starts referencing *why* a reply is good, not just whether it's right.

**Shadowing**
- 2 phrases. 7–10 words, natural prosody.
- Example: *ana mabsuut bil-shughl* / *taʿbaan min al-ijtimaaʿ*.

### Placement-test feel
"Which Saudi word means 'happy'?" "Which word means 'university'?"

**Example phrase:** *إن شاء الله بكرة أحسن* — "Inshallah, tomorrow will be better."

---

## Phase 8 — Advanced II
**Rough CEFR: B2 · Target vocab: ~280 words · The "opinions & comparisons" phase**

### Who is this user?
Can have a real conversation, with vocabulary gaps filled by context. Wants to argue, agree, and qualify statements. Ready for the first genuinely abstract vocabulary.

### Core principle
**Nuance over novelty.** Few new concrete nouns. Instead: mental-state verbs (*adhunn*, *aʿrif*, *atadhakkar*), comparisons, and connectors that let them structure an argument.

### Vocabulary scope (adds)
- Mental verbs: I think, I know, I remember, I forget, I believe, I doubt
- Comparisons: better, worse, same, different
- Connectors: *liʾanna* (because), *maʿa anna* (although)

### Grammar ceiling
- Subordinate clauses with *anna* / *liʾanna*.
- Full past and present conjugation for the 1st-person speaker.
- Comparative and superlative structures.

### Content standards

**Lessons**
- "Stating opinions," "Memory & doubt," "Comparisons," "Connecting ideas."

**Flashcards**
- Cards for connectors show two short example sentences joined by the connector, not just an isolated word.

**Guided conversations**
- Conversations where the user has to give a *reason*, not just a reply. Feedback rewards including *liʾanna*-style clauses.

**Shadowing**
- 2 phrases. 8–12 words. Complex enough to require rehearsal.
- Example: *adhunn hadha ahsan* / *liʾanni aʿrifuh zain*.

### Placement-test feel
"Which phrase means 'I think'?" "Which word means 'better'?"

**Example phrase:** *أظن هذا أحسن لأني أعرفه زين* — "I think this is better because I know it well."

---

## Phase 9 — Fluent
**Rough CEFR: B2/C1 · Target vocab: ~320 words · The "news & ideas" phase**

### Who is this user?
Can hold a substantive conversation on familiar topics and bluff through unfamiliar ones. Can read a news headline and understand it at first pass. Wants to discuss more than daily life.

### Core principle
**From everyday to civic.** News, society, rights, and law. MSA register starts pulling rank on Saudi — at this level you're expected to switch up for formal topics.

### Vocabulary scope (adds)
- Civic/abstract: government, economy, society, culture, news, history
- Rights & law: freedom, justice, rights, law
- Debate: opinion, debate

### Grammar ceiling
- Passive voice (*yustaʿmal*, *tutarjam*).
- Relative clauses with *alladhi / allati*.
- Register awareness — formal nominalizations, MSA conjugations appear in listening/reading material.

### Content standards

**Lessons**
- "News vocabulary," "Media & history," "Rights & law," "Debate."
- First lessons where dialogue turns contain MSA phrasing explicitly.

**Flashcards**
- Card back shows example sentence from a news headline-style context.

**Guided conversations**
- Scenarios at the edge of comfort — a short interview, a disagreement on a civic topic.
- Options force register awareness: "You're writing an email, pick the right phrasing."

**Shadowing**
- 2 phrases. 8–12 words. News-register intonation — flatter, more formal.
- Example: *raʾyi fii hadha mukhtalif* / *al-hurriyya haqq asaasi*.

### Placement-test feel
"Which word means 'government'?" "Which word means 'freedom'?"

**Example phrase:** *رأيي في هذا القانون مختلف تمامًا* — "My opinion on this law is completely different."

---

## Phase 10 — Native Speaker
**Rough CEFR: C1/C2 · Target vocab: ~400 words · The "flavor & register" phase**

### Who is this user?
Can participate in almost any conversation. Main gaps: rare idiomatic phrasing, the glue-words that mark you as sounding "native" (*yaʿni*, *wallah*, *khalaas*, *tayyib*), slang, and smooth code-switching between Saudi and MSA.

### Core principle
**Polish.** This phase is not about adding nouns — it's about adding *texture*. Fillers, register, idiom, slang address. The user already has the content; this phase is the varnish.

### Vocabulary scope (adds)
- Fillers: *inshallah*, *mashallah*, *yaʿni*, *wallah*
- Conversational glue: *khalaas*, *tayyib*, *kaafi*
- Nuance: *maashi l-haal*, *mumtaaz*, *sayyi jiddan*, *tamaam*
- Slang address: *ʿabduh* (Saudi "dude")

### Grammar ceiling
- Full code-switching expected in produced speech.
- Understated/hedged phrasing (*yaʿni …*, *wallah …*) used for softening.
- All persons of verb conjugation.

### Content standards

**Lessons**
- "Everyday fillers," "Conversational glue," "Nuance & register," "Slang & address."
- Each lesson's check asks a *usage* question, not a definition: "Someone asks how the meeting went. Which reply sounds most natural?"

**Flashcards**
- Cards for fillers show the phrase in 3 different short dialogues on the back. There is no single "English gloss" — fillers are taught by situation.

**Guided conversations**
- Scenarios with no single correct answer — tone is the grade. Feedback critiques register fit, not accuracy.
- Conversations freely mix Saudi and MSA depending on topic.

**Shadowing**
- 2 phrases. 6–10 words but with native prosody expected. No tashkeel.
- Example: *khalaas, yaʿni tamaam* / *inshallah bukra*.

### Placement-test feel
Usage-based questions. "What does 'inshallah' imply?" "Which idiom means 'so-so'?"

**Example phrase:** *خلاص، يعني تمام* — "Done — I mean, all good."

---

## Stories — per-phase standards

The story activity teaches reading at the learner's level. Each story has paragraphs + `wordMappings` (tap-to-translate lookup) + `comprehensionQuestions`. A story should feel like a small window into life at the user's current level — the language should be *just* simple enough to push through with effort, never so dense the user bails.

**Hard rule:** if the learner doesn't have the grammar to *produce* a sentence, don't use that grammar in a story for that phase. Stories are reading practice, not grammar previews. (A Phase-1 story written in 3rd-person MSA conjugation breaks this rule even if the vocabulary "looks" simple.)

**Hard rule:** stay in Saudi register through Phase 6. MSA register (*yadhhab* vs. Saudi *yruuH*; *as-salaamu ʿalaykum* paragraphs vs. *hala*) gets introduced as a flagged contrast at Phase 5+ and as the default only for formal/news material from Phase 9.

| Phase | Stories | Sentences | Total Arabic words | Tense / register | Comprehension q's |
|-------|---------|-----------|---------------------|------------------|-------------------|
| 1     | 0       | —         | —                   | (no stories — vocab pool too small) | — |
| 2     | 0       | —         | —                   | (no stories — vocab pool too small) | — |
| 3     | 1       | 2–3       | 20–30               | Present, memorized verbs only (*abgha*, *ʿindi*). No 3rd-person conjugation. Saudi only. | 1–2, options in English |
| 4     | 2       | 3–4       | 30–50               | 1st-person present (*aruuh*, *aji*, *abgha*). Locative *fii*. Tashkeel on focal words. | 2, options in Arabic + English gloss |
| 5     | 2       | 5–7       | 50–80               | 1st-person + memorized 3rd-person. Transactional vocab. First MSA contrast lines allowed (flagged). | 3, including one inferential |
| 6     | 2–3     | 8–12      | 80–120              | Add simple past (3rd-person). Broken plurals. Travel vocab. | 3–4, mix recall + inference |
| 7     | 3       | 10–15     | 120–200             | Feelings + work vocab. Full past + present. Two-character dialogue. | 4, including emotional-tone question |
| 8     | 3       | 15–20     | 200–300             | Opinion-bearing prose, *liʾanna*-style clauses, comparisons. | 4–5, including a reasoning q ("what does the speaker think and why?") |
| 9     | 3       | 20–30     | 300–500             | News-register passages, passive voice, relative clauses. MSA pulls rank. | 5, including a register question |
| 10    | 3       | 25–40     | 500–800             | Literary or modern conversational. Free code-switching. Idiomatic language. | 5, tone + register + cultural-inference questions |

### Examples

**Phase 3 (target — ~25 Arabic words, memorized verbs only, Saudi register):**
> أنا فهد. عندي أخت وأخ. أحبهم كثير.
> الأم تجيب الشاي. أبغى أكل.

**Phase 5 (target — ~60 Arabic words, transactions, 1st + 3rd person Saudi):**
> أمس رحت السوق. شفت قميص حلو. سألت البائع: بكم؟
> قال: مية ريال. قلت: غالي شوي، في خصم؟ ضحك وقال: خمسة وتسعين، خلاص.
> دفعت ورحت البيت مبسوط.

**Phase 9 (target — ~350 Arabic words, news register, passive voice — extract):**
> أُعلن أمس عن قانونٍ جديد يتعلّق بحقوق العمّال في المنطقة الشرقية. ويرى المحلّلون أنّ هذا القانون، الذي صدر بعد نقاشٍ طويل، يمثّل خطوةً مهمّةً نحو …

---

## Listening — per-phase standards

Listening exercises are scripted audio passages (or text-only fallback when audio hasn't been recorded yet) with `segments` for scrubbing, `sectionBreaks`, `mainIdeaQuestions`, and `sectionQuestions` keyed to segment indices.

**Hard rule:** every question must be answerable from a specific segment (or set of segments) — never make the learner guess at content that isn't actually in the audio. The `answerSegments` field exists for this.

**Hard rule:** match the audio register to the phase. A Phase-1 listening clip should be a Saudi greeting (*hala, kayf haalak?*), not formal MSA (*as-salaamu ʿalaykum, tasharraftu bi-maʿrifatik*). Mixing formal MSA into Phase 1–6 listening teaches the learner to expect formal register at a level where they shouldn't.

| Phase | Exercises | Audio length | Word count | Voices | Register | Questions |
|-------|-----------|--------------|------------|--------|----------|-----------|
| 1     | 1         | 6–10 s       | 3–6        | 1 (slow) | Greetings only, Saudi | 1 main-idea |
| 2     | 1         | 10–15 s      | 8–15       | 1 (slow) | Numbers, colors, days, Saudi | 1 main-idea + 1 detail |
| 3     | 1–2       | 15–25 s      | 15–25      | 1–2     | Family / food Q&A, Saudi | 1 main-idea + 1 detail |
| 4     | 2         | 30–45 s      | 25–40      | 1–2     | Asking directions, daily routine. First section break. | 1 main + 1 section |
| 5     | 2         | 45–60 s      | 40–60      | 2       | Transactions, bargaining. | 1 main + 2 section |
| 6     | 2–3       | 1–1.5 min    | 60–90      | 2       | Travel / hotel / taxi. 2–3 sections. | 1 main + 2 section |
| 7     | 3         | 1.5–2 min    | 90–150     | 2–3     | Workplace small talk. Natural prosody, full reductions. | 1 main + 3 section incl. one inference |
| 8     | 3         | 2–3 min      | 150–250    | 2–3     | Opinion clip — someone reasons through a topic. | 1 main + 3 section incl. "what does the speaker think?" |
| 9     | 3         | 3–4 min      | 200–350    | 2–3     | News bulletin / interview. MSA register. | 1 main + 4 section incl. register q |
| 10    | 3         | 4–5 min      | 300–500    | 2–4     | Free conversation, code-switching, fillers, slang. | 1 main + 4 section incl. tone-grading q |

### Examples

**Phase 1 (target — 4 Arabic words, one slow voice, Saudi):**
> هلا، كيف حالك؟
> *Main-idea q:* "What is happening?" → A greeting.

**Phase 4 (target — ~35 Arabic words, two voices, one section break, Saudi directions):**
> أ: السلام عليكم، وين السوق؟
> ب: على طول ثم يمين، بعد المسجد.
> أ: شكراً، أروح الحين.
> ب: مع السلامة.
> *Main-idea q:* "Where does speaker A want to go?" → The market.
> *Section-1 q (segments 1–2):* "Which way is the market?" → Straight, then right.

**Phase 9 (target — ~250 Arabic words, news register — extract):**
> أُعلنت اليوم نتائج التقرير السنويّ للاقتصاد. ويقول المحلّلون إنّ النموّ قد تجاوز التوقّعات هذا العام بنسبةٍ ملحوظة …
> *Register q:* "Is the speaker addressing a friend or reading a bulletin?" → Reading a bulletin (formal MSA).

---

## Idioms — per-phase standards

Saudi idioms are some of the highest-bar content in the app: they require linguistic readiness *and* enough cultural exposure that the meaning isn't alien. Introducing them too early teaches the wrong lesson ("Arabic is full of things that don't make sense") at the exact moment the learner is trying to build confidence.

**Hard rule:** idioms are Phase 8+. There are NO idiom exercises at Phases 1–7. If you're tempted to use one earlier "because the words look simple," remember: the *idiomatic meaning* is the lesson, not the literal one. A learner who hasn't reached Phase 8 doesn't yet have the inference scaffolding (mental-state verbs, *liʾanna*-clauses, comparisons) to process "X means Y because culture."

| Phase | Idioms | Opacity | Quiz format |
|-------|--------|---------|-------------|
| 1–7   | 0      | —       | — |
| 8     | 2–3    | **Transparent.** Literal meaning makes the idiomatic meaning guessable (e.g. *bukra ahsan, inshallah*). All component words from Phase 6–8 vocab. | Pick the meaning from 4 options. Three distractors are plausible literal interpretations. |
| 9     | 4–5    | **Semi-opaque.** Meaning requires a small inferential jump (e.g. *al-yad al-waaḥida maa tṣaffig* → cooperation). Saudi-specific proverbs preferred. | Meaning quiz + sentence-completion quiz (`sentenceChoices` / `correctSentence`): pick the sentence where the idiom fits. |
| 10    | 6–10   | **Opaque.** Meaning is cultural/historical; the learner can't deduce it from the words alone. Includes slang address (*ʿabduh*), classical proverbs, and modern slang. | Usage / register quiz: "Someone just told you a long boring story — which idiom fits as a reply?" Tone-graded, not just accuracy. |

### What makes an idiom "right" for its phase

**Phase 8 idiom** uses vocab the learner has and is *mostly* literal:
> *bukra ahsan, inshallah.* — "Tomorrow will be better, God willing."
> Every component word is Phase 1–7 vocab. The idiomatic load is just the cultural pairing.

**Phase 9 idiom** adds a small inferential leap:
> *al-yad al-waaḥida maa tṣaffig.* — "One hand doesn't clap."
> Component words are Phase 4–6, but the *meaning* (cooperation) isn't in the words.

**Phase 10 idiom** is the kind of phrase a learner could hear ten times and still not parse without help:
> *ʿabduh, khalaas yaʿni — wallah maashi l-ḥaal.* — "Bro, that's done — I mean, eh, so-so."
> Three fillers, a slang address, and a hedged judgment, all in seven words.

### Why the strict gating

The English app's CEFR doc places idioms at B2+ for the same reason: a learner who hasn't internalized literal meaning yet can't recognize when a phrase is *not* literal. Idioms before Phase 8 train the wrong heuristic — "guess what this means" — at exactly the phases where the correct heuristic is "build literal meaning first."

---

## Cross-phase comparison

> **Per-activity COUNT bands removed.** The hard rule at the top of this doc supersedes them — every activity must have ≥20 items per phase. The remaining rows describe quality (length, register, focal-count per lesson, tashkeel) per phase; they do not constrain quantity.

| Dimension              | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
|------------------------|----|----|----|----|----|----|----|----|----|-----|
| **Target vocab**       | 30 | 50 | 80 |120 |160 |200 |240 |280 |320 |400+ |
| **Words per lesson**   | 4–6| 4–6| 4–6| 4–6| 3–5| 3–5| 3–5| 3–4| 3–4| 3–4 |
| **Phrase word count**  | 2–4| 4–6| 5–7| 6–8| 6–10|7–10|7–10|8–12|8–12|6–10 |
| **Story word count**   |5–10|10–20|20–30|30–50|50–80|80–120|120–200|200–300|300–500|500–800|
| **Listening length**   |6–10s|10–15s|15–25s|30–45s|45–60s|1–1.5m|1.5–2m|2–3m|3–4m|4–5m|
| **Tashkeel**           |all |all |all |focal|focal|focal|none|none|none|none |
| **Transliteration**    |yes |yes |yes |yes |focal|focal|focal|tap |tap |tap  |
| **Grammar ceiling**    |juxtapose |possessive |question-first |1st-person present |adjective agreement |plurals, future |past tense, agreement |subordination, comparison |passive, relative |code-switch |
| **Saudi vs MSA**       |Saudi only |Saudi only |Saudi + note |Saudi primary |Saudi + MSA pairs |Saudi + MSA pairs |mixed |mixed |MSA for formal |full flex |
| **Guided convo depth** |3–4 steps |3–4 steps |4 steps, first fork |4–6 steps |5+ steps |5+ steps |branching |reason-required |register-aware |tone-graded |
| **Placement question** |script→English greet |script→English color/number |script→English family/food |script→English places/time |Saudi vs MSA choice |travel vocab |feeling vocab |opinion phrase |civic vocab |usage/idiom |

---

## Shadowing / audio guidelines

When audio files land in `assets/audio/`, target these deliveries per phase:

| Phase | Pace       | Pausing                               | Articulation                          |
|-------|------------|---------------------------------------|---------------------------------------|
| 1–2   | Very slow  | Long pause between words              | Hyper-clear, tashkeel read aloud      |
| 3–4   | Slow       | Brief pause between clauses           | Clear, standard reductions avoided    |
| 5–6   | Natural-slow | Pause between sentences only        | Natural Saudi pronunciation           |
| 7–8   | Natural    | No artificial pausing                 | Full colloquial reduction             |
| 9–10  | Full speed | Native prosody                        | Code-switching on formal material     |

---

## Content creation checklist

Before merging any new content, verify:

- [ ] Vocabulary stays at or below the phase's ceiling — no "just one word from a later phase" sneaking in
- [ ] Sentence/phrase length within phase band
- [ ] Grammar structures don't exceed ceiling
- [ ] Tashkeel/transliteration policy for the phase is honored
- [ ] Saudi vs MSA register is appropriate for the phase
- [ ] Gender forms are consistent (if the protagonist is female in one line, keep her feminine throughout)
- [ ] Check questions match phase cognitive level (recognition → usage → register)
- [ ] No culturally sensitive content (alcohol, pork, gambling, profanity, blasphemy)
- [ ] Word ids reused across dialects (never a dialect-specific id)
- [ ] The "80/20 test": at this phase, a learner understands 80–90% and has 10–20% left to learn

---

## Common mistakes to avoid

1. **Compressing phases 1–3.** It's tempting because vocab overlaps. Resist. The three phases exist so that a learner who gives up at Phase 2 has already internalized greetings and pronouns — giving up at a combined "P1–3" means giving up on everything.

2. **Mixing registers without flagging.** If you use a Saudi-specific word in Phases 1–4, *always* note the MSA equivalent. Learners ask "why didn't I see this in the textbook" and disengage if the answer isn't right there.

3. **Phase 5 bargaining without phase 5 numbers.** The bargaining scenario needs numbers. If the user reaches the market convo and doesn't know "*miyya*," it's our fault, not theirs.

4. **Over-tashkeeled Phase 7–10.** Adding tashkeel on every word signals "you can't read this yet." At these phases we want the opposite signal.

5. **Phase 10 that's just more Phase 9.** Phase 10 is texture, not volume. If a phase-10 lesson teaches five new nouns, it's the wrong lesson. Rewrite it as a usage/register exercise.

6. **Ignoring gender agreement from Phase 3+.** Easy to miss because the single-user app defaults to masculine forms. Content must reference both masculine and feminine speakers from Phase 3 onward, and the user should eventually be able to set their own gender (future feature).

7. **Skipping the completion message.** Every activity at every phase must end with a sentence that tells the user what they just accomplished. "You can now bargain in a souq" beats "Lesson complete."

8. **Stories that use grammar the learner can't produce yet.** A Phase-1 story written in 3rd-person MSA conjugation (*yadhhab, yashtarii*) is a Phase-5 story wearing a Phase-1 label. The "if you wouldn't teach it as production grammar at this phase, don't put it in a reading passage at this phase" rule is non-negotiable.

9. **MSA register in Phase 1–6 listening.** *as-salaamu ʿalaykum* is fine as a fixed greeting; an entire listening clip in formal MSA register (*tasharraftu bi-maʿrifatik*, *al-jaara al-jadiida*) is wrong below Phase 7. Use Saudi forms — *hala, kayf haalak, taʿarrafna ʿalayk*.

10. **Idioms before Phase 8.** Every time you place an idiom at Phase 4 "because the proverb is famous," you're teaching inference at a phase where the user hasn't built literal scaffolding. Move it to Phase 9. If the proverb feels too good to lose, write a *literal* Phase-4 sentence using the same words and save the idiom for later.
