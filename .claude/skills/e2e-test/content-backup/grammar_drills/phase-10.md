# grammar_drills · phase 10 · dialect saudi

- count: **20**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `g_hedging_fillers`

```json
{
  "dialect": "saudi",
  "drill_id": "g_hedging_fillers",
  "phase": 10,
  "concept": "Hedging and fillers in native speech",
  "description": "Native speakers use يعني، والله، خلاص to soften, hedge, and close topics. Mastering their placement and tone is what separates advanced from native-level speech.",
  "prompts": [
    {
      "stem": "A colleague asks how the meeting was. The most natural native-sounding reply is:",
      "choices": [
        "كانت جيدة جداً",
        "والله، ما أدري، يعني كانت تمام",
        "نعم، انتهت",
        "لم أحضر"
      ],
      "correct": 1,
      "explanation": "والله + ما أدري + يعني + تمام layers hedging, filler, and a soft positive evaluation."
    },
    {
      "stem": "Someone finishes a long explanation. You want to end the topic politely. Best filler?",
      "choices": [
        "خلاص",
        "استمر",
        "لا تتكلم",
        "ابدأ"
      ],
      "correct": 0,
      "explanation": "خلاص signals closure — OK, enough, we are done — without being rude."
    },
    {
      "stem": "Which phrase means so-so / just getting by?",
      "choices": [
        "ممتاز",
        "ماشي الحال",
        "رائع جداً",
        "سيء جداً"
      ],
      "correct": 1,
      "explanation": "ماشي الحال literally means the situation is walking along — the Saudi equivalent of so-so."
    },
    {
      "stem": "يعني in the middle of a sentence most often signals:",
      "choices": [
        "A firm conclusion",
        "A hedged explanation or paraphrase",
        "An insult",
        "An exact measurement"
      ],
      "correct": 1,
      "explanation": "يعني literally means it means but functions as I mean / so / like — a conversational bridge."
    }
  ],
  "icon": "💬"
}
```

## `g_passive_present`

```json
{
  "dialect": "saudi",
  "drill_id": "g_passive_present",
  "phase": 10,
  "concept": "Present passive: يُفعل",
  "description": "Present passive marks vowel changes on the imperfect. يَكتب → يُكتب (it is written). يقرأ → يُقرأ.",
  "prompts": [
    {
      "stem": "the book is read",
      "choices": [
        "يقرأ الكتاب",
        "يُقرأ الكتاب",
        "الكتاب قرأ",
        "قرأ الكتاب"
      ],
      "correct": 1,
      "explanation": "يُقرأ = is read (present passive)."
    },
    {
      "stem": "the door is opened",
      "choices": [
        "الباب فتح",
        "فتح الباب",
        "يُفتح الباب",
        "يفتح الباب"
      ],
      "correct": 2,
      "explanation": "يُفتح = is opened."
    }
  ],
  "icon": "↩️"
}
```

## `g_subjunctive`

```json
{
  "dialect": "saudi",
  "drill_id": "g_subjunctive",
  "phase": 10,
  "concept": "Subjunctive after أن",
  "description": "After أن (that), the imperfect verb takes a subjunctive form (final ن drops in plural; vowel changes in singular). أريد أن أذهب = I want to go.",
  "prompts": [
    {
      "stem": "I want to go.",
      "choices": [
        "أريد أذهب",
        "أريد أن أذهب",
        "أريد ذهبت",
        "أردت أذهب"
      ],
      "correct": 1,
      "explanation": "أن + subjunctive."
    },
    {
      "stem": "He hopes to succeed.",
      "choices": [
        "يأمل ينجح",
        "يأمل أن ينجح",
        "ينجح أن يأمل",
        "أمل ينجح"
      ],
      "correct": 1,
      "explanation": "يأمل أن ينجح."
    }
  ],
  "icon": "🎯"
}
```

## `gr_b29`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b29",
  "phase": 10,
  "concept": "Modal: should",
  "description": "المفروض + present.",
  "prompts": [
    {
      "stem": "I should study",
      "choices": [
        "أدرس",
        "المفروض أدرس",
        "ما أدرس",
        "درست"
      ],
      "correct": 1,
      "explanation": "المفروض + present."
    }
  ],
  "icon": "📖"
}
```

## `gr_b30`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b30",
  "phase": 10,
  "concept": "Modal: used to",
  "description": "كان + present.",
  "prompts": [
    {
      "stem": "I used to read",
      "choices": [
        "أقرأ",
        "كنت أقرأ",
        "سأقرأ",
        "قرأت"
      ],
      "correct": 1,
      "explanation": "كان + present habitual past."
    }
  ],
  "icon": "📚"
}
```

## `gr_b32`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b32",
  "phase": 10,
  "concept": "Modal: already",
  "description": "صار + past.",
  "prompts": [
    {
      "stem": "He already left",
      "choices": [
        "طلع",
        "صار طلع",
        "سيطلع",
        "ما طلع"
      ],
      "correct": 1,
      "explanation": "صار + past = already happened."
    }
  ],
  "icon": "✅"
}
```

## `gr_b33`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b33",
  "phase": 10,
  "concept": "Modal: about to",
  "description": "على وشك + verb.",
  "prompts": [
    {
      "stem": "I'm about to finish",
      "choices": [
        "خلصت",
        "على وشك أخلص",
        "سأخلص",
        "خلصت بسرعة"
      ],
      "correct": 1,
      "explanation": "على وشك + present."
    }
  ],
  "icon": "⏰"
}
```

## `gr_b35`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b35",
  "phase": 10,
  "concept": "Sentence structure: VSO",
  "description": "Classical pattern.",
  "prompts": [
    {
      "stem": "The boy ate the apple",
      "choices": [
        "الولد أكل",
        "أكل الولد التفاحة",
        "التفاحة أكل",
        "أكل التفاحة"
      ],
      "correct": 1,
      "explanation": "VSO order."
    }
  ],
  "icon": "🍎"
}
```

## `gr_c54`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c54",
  "phase": 10,
  "concept": "Style: simile",
  "description": "تشبيه pattern.",
  "prompts": [
    {
      "stem": "strong as a lion",
      "choices": [
        "قوي",
        "قوي كالأسد",
        "الأسد",
        "قوية"
      ],
      "correct": 1,
      "explanation": "adj + ك + noun."
    }
  ],
  "icon": "🦁"
}
```

## `gr_c55`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c55",
  "phase": 10,
  "concept": "Style: metaphor",
  "description": "استعارة.",
  "prompts": [
    {
      "stem": "He is a sea of knowledge",
      "choices": [
        "كثير العلم",
        "هو بحر من العلم",
        "لديه علم",
        "علم"
      ],
      "correct": 1,
      "explanation": "Metaphor structure."
    }
  ],
  "icon": "🌊"
}
```

## `gr_c56`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c56",
  "phase": 10,
  "concept": "Rhetorical question",
  "description": "Asking for effect.",
  "prompts": [
    {
      "stem": "Who would refuse?",
      "choices": [
        "لن يرفض",
        "من يرفض؟",
        "رفض",
        "يرفض"
      ],
      "correct": 1,
      "explanation": "Rhetorical."
    }
  ],
  "icon": "❓"
}
```

## `gr_c57`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c57",
  "phase": 10,
  "concept": "Parallel structure",
  "description": "Repeat structure.",
  "prompts": [
    {
      "stem": "He saw and learned",
      "choices": [
        "شاف",
        "شاف وتعلم",
        "تعلم",
        "شاف الذي تعلم"
      ],
      "correct": 1,
      "explanation": "Verb + و + verb."
    }
  ],
  "icon": "🔗"
}
```

## `gr_c58`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c58",
  "phase": 10,
  "concept": "Apposition",
  "description": "Two nouns equal.",
  "prompts": [
    {
      "stem": "my friend, the doctor",
      "choices": [
        "صديقي دكتور",
        "صديقي الدكتور",
        "صديق الدكتور",
        "الصديق"
      ],
      "correct": 1,
      "explanation": "Noun + Article + noun."
    }
  ],
  "icon": "👨‍⚕️"
}
```

## `gr_c59`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c59",
  "phase": 10,
  "concept": "Hyperbole",
  "description": "مبالغة pattern فعّال.",
  "prompts": [
    {
      "stem": "He talks a lot",
      "choices": [
        "يتكلم",
        "ثرثار",
        "صموت",
        "قال"
      ],
      "correct": 1,
      "explanation": "ثرثار = talkative (exaggerated)."
    }
  ],
  "icon": "🔊"
}
```

## `gr_c60`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c60",
  "phase": 10,
  "concept": "Implication: hint",
  "description": "يلمح.",
  "prompts": [
    {
      "stem": "He hinted at it",
      "choices": [
        "قاله",
        "لمح إليه",
        "سكت",
        "صرخ"
      ],
      "correct": 1,
      "explanation": "لمح = hint."
    }
  ],
  "icon": "💭"
}
```

## `gr_c61`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c61",
  "phase": 10,
  "concept": "Restatement: in other words",
  "description": "بعبارة أخرى.",
  "prompts": [
    {
      "stem": "in other words",
      "choices": [
        "ولا",
        "بعبارة أخرى",
        "لكن",
        "لذلك"
      ],
      "correct": 1,
      "explanation": "بعبارة أخرى."
    }
  ],
  "icon": "🔄"
}
```

## `gr_c62`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c62",
  "phase": 10,
  "concept": "Conclusion: in short",
  "description": "باختصار.",
  "prompts": [
    {
      "stem": "in short",
      "choices": [
        "باختصار",
        "طويلاً",
        "ربما",
        "لاحقاً"
      ],
      "correct": 0,
      "explanation": "باختصار = in short."
    }
  ],
  "icon": "📝"
}
```

## `gr_c63`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c63",
  "phase": 10,
  "concept": "Connector: as a result",
  "description": "نتيجة لذلك.",
  "prompts": [
    {
      "stem": "as a result",
      "choices": [
        "لكن",
        "نتيجة لذلك",
        "لو",
        "ولو"
      ],
      "correct": 1,
      "explanation": "نتيجة لذلك."
    }
  ],
  "icon": "🎯"
}
```

## `gr_c64`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c64",
  "phase": 10,
  "concept": "Connector: moreover",
  "description": "علاوة على ذلك.",
  "prompts": [
    {
      "stem": "moreover",
      "choices": [
        "لكن",
        "علاوة على ذلك",
        "لذا",
        "ولا"
      ],
      "correct": 1,
      "explanation": "علاوة على ذلك."
    }
  ],
  "icon": "➕"
}
```

## `gr_c65`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c65",
  "phase": 10,
  "concept": "Connector: in conclusion",
  "description": "وفي الختام.",
  "prompts": [
    {
      "stem": "in conclusion",
      "choices": [
        "في البداية",
        "وفي الختام",
        "ثم",
        "لاحقاً"
      ],
      "correct": 1,
      "explanation": "وفي الختام."
    }
  ],
  "icon": "🏁"
}
```
