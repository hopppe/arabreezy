# Arabreezy stories work — resume doc

Written 2026-05-19. Picks up mid-task after the project directory `/Users/ethanhoppe/Documents/Cursor_Code/arabreezy/` started returning `EPERM: operation not permitted`. Once that's restored, follow the steps below to finish.

---

## Goal

20 full-fledged Saudi-Arabic stories in `src/data/dialects/saudi/stories.js`, structured in the **anafluent-style nested schema** (the user explicitly asked us to "copy that format exactly" from `../Englishlearning`).

Distribution: **P3:2, P4:2, P5:2, P6:2, P7:3, P8:3, P9:3, P10:3 = 20**.

## Status

### ✅ Done

1. **`src/activities/Stories/StoryReader.js`** — updated to read the new schema with backwards-compat fallbacks:
   - `story.title.arabic ?? story.title`
   - `story.title.english ?? story.titleEnglish`
   - `story.content.arabic ?? story.paragraphs`
   - `story.content.english ?? story.englishTranslation`
   - `story.comprehension_questions ?? story.comprehensionQuestions`
   - `currentQ.correct_answer ?? currentQ.correctAnswer`

2. **`src/activities/Stories/StoryListScreen.js`** — same nested-schema fallbacks for title and `estimated_reading_time ?? estimatedDuration`.

3. **`src/data/dialects/saudi/stories.js`** — rewritten with 6 of 20 stories in the new schema:
   - P3: `st_my_family`, `st_fahd_morning`
   - P4: `st_market_morning`, `st_first_day_school`
   - P5: `st_kind_vendor`, `st_new_cafe`

   File currently ends with this exact pattern (this is the **Edit anchor** for the integration step below):
   ```
           explanation: 'The closing line says this café will become his favorite spot.',
         },
       ],
     },

   ];
   ```

### ⏳ Remaining: integrate 14 stories from sonnet agent outputs

Three sonnet agents ran successfully. Their full outputs live in these JSONL transcripts:

| Stories | Agent ID | Transcript file |
|---|---|---|
| P6:2 + P7:3 (5 stories) | `a3e708faafacc963b` | `/private/tmp/claude-501/-Users-ethanhoppe-Documents-Cursor-Code-arabreezy/1191fa5a-5b94-4d64-97f5-55030b392019/tasks/a3e708faafacc963b.output` |
| P8:3 + P9:3 (6 stories) | `aef7422bee73c20d7` | `/private/tmp/claude-501/-Users-ethanhoppe-Documents-Cursor-Code-arabreezy/1191fa5a-5b94-4d64-97f5-55030b392019/tasks/aef7422bee73c20d7.output` |
| P10:3 (3 stories) | `aca2ad4f4fc81da37` | `/private/tmp/claude-501/-Users-ethanhoppe-Documents-Cursor-Code-arabreezy/1191fa5a-5b94-4d64-97f5-55030b392019/tasks/aca2ad4f4fc81da37.output` |

**Story IDs delivered by each agent:**
- Agent 1 (P6+P7): `st_first_solo_trip`, `st_room_by_sea`, `st_office_tired_day`, `st_maryam_layla`, `st_long_meeting`
- Agent 2 (P8+P9): `st_old_new_friend`, `st_riyadh_dubai`, `st_advice_for_nasser`, `st_new_labor_law`, `st_education_debate`, `st_economy_transformation`
- Agent 3 (P10): `st_saturday_in_riyadh`, `st_cafe_conversation`, `st_roots_globalization`

Each transcript is the full sub-agent JSONL — the final assistant message in each contains a code block with the JS object literals comma-separated, ready to paste into the array. Open the file and grep for the last `"role":"assistant"` content block, then unwrap the markdown fence.

⚠️ **Two known fixups** needed when pasting Agent 3 (P10) output:
1. Topic strings have `&amp;` HTML entities (e.g. `'daily life &amp; reflection'`) — replace with literal `&`.
2. `word_mappings` contains the typo `'أول اد حارتنا'` in `st_saturday_in_riyadh` — should be `'أولاد حارتنا'`.

## Schema we're using (anafluent format, language-flipped for Arabic learning)

```js
{
  id: 'st_xxx',
  phase: N,                              // 3-10, our app's phase
  title: { arabic: '...', english: '...' },
  topic: 'string',
  icon: 'emoji',
  estimated_reading_time: N,             // minutes
  content: {
    arabic: ['paragraph 1', ...],        // primary text
    english: ['gloss 1', ...],           // matching length
  },
  word_mappings: { 'arabic_word': 'english translation' },
  comprehension_questions: [
    { question, options: ['A','B','C','D'], correct_answer: N, explanation },
  ],
}
```

## How to resume

Once filesystem access is restored (try `chmod -R u+rwX /Users/ethanhoppe/Documents/Cursor_Code/arabreezy` or check macOS Privacy & Security → Files & Folders for the Claude Code process):

1. **Verify**: `cat /Users/ethanhoppe/Documents/Cursor_Code/arabreezy/src/data/dialects/saudi/stories.js | tail -20` — should show the 6th story (`st_new_cafe`) ending with the anchor text quoted above.

2. **Integrate Agent 1** (P6+P7): extract the 5 JS object literals from the agent transcript, then Edit `stories.js` replacing the closing pattern:
   ```
           explanation: 'The closing line says this café will become his favorite spot.',
         },
       ],
     },

   ];
   ```
   with the same prefix + 5 stories + `\n];`.

3. **Integrate Agent 2** (P8+P9): after step 2, the new file end is `st_long_meeting`'s closing — explanation line `'He describes himself as "تعبان بس مو زعلان" — tired but not upset.'`. Use that as the new anchor.

4. **Integrate Agent 3** (P10): anchor on `st_economy_transformation`'s closing — explanation line that ends `'"الاقتصاد القوي لا يُبنى فوق الموارد وحدها..."'`. Remember the two fixups (HTML entity + typo).

5. **Validate**:
   ```bash
   cd /Users/ethanhoppe/Documents/Cursor_Code/arabreezy
   node -e "
   const s = require('./src/data/dialects/saudi/stories.js').default;
   console.log('total:', s.length);
   const byPhase = {};
   for (const x of s) {
     byPhase[x.phase] = (byPhase[x.phase]||0)+1;
     if (x.content.arabic.length !== x.content.english.length) {
       console.log('MISMATCH', x.id, x.content.arabic.length, '!=', x.content.english.length);
     }
   }
   console.log(byPhase);
   "
   ```
   Should print: `total: 20` and `{ '3': 2, '4': 2, '5': 2, '6': 2, '7': 3, '8': 3, '9': 3, '10': 3 }`.

6. **Smoke-test the UI**: start Metro (`npx expo start --dev-client --port 8082`), open the Stories activity, scroll through phases 3-10, verify title/duration/topic render, tap into one story per phase, toggle "show gloss", run the comprehension quiz. The reader has fallbacks for the old flat schema, but with 20 fresh nested entries the fallbacks shouldn't fire.

## Other files in their final state

- `src/data/dialects/saudi/listening.js` — 22 exercises across all 10 phases (done last round, untouched).
- `src/data/dialects/saudi/idioms.js` — 17 idioms (P8:3, P9:4, P10:10) (done last round, untouched).
- `docs/phase-difficulty-standards.md` — updated with Stories/Listening/Idioms per-phase specs (done earlier).

## Things to NOT forget

- The user has been frustrated by partial deliveries. The bar is **all 20 stories integrated and validated**, not 15.
- The user's most recent message ("we ran out of usage go ahead and start up the agents again") implies they think the agents need to re-run. They **don't** — outputs are in the transcript files listed above. Re-running burns tokens for the same content.
- Don't lose the auto-memory entries (Saudi vocab pool, project rules) — those persist independently.
