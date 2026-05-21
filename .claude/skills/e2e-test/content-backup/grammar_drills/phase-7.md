# grammar_drills · phase 7 · dialect saudi

- count: **20**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `g_conditional`

```json
{
  "dialect": "saudi",
  "drill_id": "g_conditional",
  "phase": 7,
  "concept": "Conditionals with إذا / لو",
  "description": "إذا + present = real condition. لو + past = unreal/hypothetical. إذا درست نجحت = if you study you'll succeed. لو درست نجحت = if you had studied you would have succeeded.",
  "prompts": [
    {
      "stem": "If you study, you'll succeed.",
      "choices": [
        "لو درست نجحت",
        "إذا درست نجحت",
        "إذا تنجح تدرس",
        "نجحت لو درست"
      ],
      "correct": 1,
      "explanation": "إذا + present for real."
    },
    {
      "stem": "If I had known, I would have come.",
      "choices": [
        "لو عرفت جئت",
        "إذا عرفت أجي",
        "لو أعرف جئت",
        "عرفت لو جئت"
      ],
      "correct": 0,
      "explanation": "لو + past for unreal."
    }
  ],
  "icon": "🔀"
}
```

## `g_object_pronouns`

```json
{
  "dialect": "saudi",
  "drill_id": "g_object_pronouns",
  "phase": 7,
  "concept": "Object pronoun suffixes",
  "description": "Direct objects attach as suffixes. شفت + ها = شفتها (I saw her). يحب + ك = يحبك (he loves you).",
  "prompts": [
    {
      "stem": "I saw him.",
      "choices": [
        "شفت",
        "شفتك",
        "شفته",
        "شافه"
      ],
      "correct": 2,
      "explanation": "شفت + ه = شفته."
    },
    {
      "stem": "She loves you (m).",
      "choices": [
        "تحبه",
        "تحبك",
        "تحبني",
        "يحبك"
      ],
      "correct": 1,
      "explanation": "تحب + ك = تحبك."
    }
  ],
  "icon": "↩️"
}
```

## `g_passive`

```json
{
  "dialect": "saudi",
  "drill_id": "g_passive",
  "phase": 7,
  "concept": "The passive voice",
  "description": "Most verbs form a passive by vowel change. كتب (he wrote) → كُتِب (it was written). فهم → فُهم (it was understood).",
  "prompts": [
    {
      "stem": "the door was opened",
      "choices": [
        "فتح الباب",
        "فُتح الباب",
        "الباب يفتح",
        "يُفتح الباب"
      ],
      "correct": 1,
      "explanation": "فُتح with damma/kasra = passive past."
    },
    {
      "stem": "the book was read",
      "choices": [
        "قرأ الكتاب",
        "قُرئ الكتاب",
        "الكتاب يقرأ",
        "قرئت الكتاب"
      ],
      "correct": 1,
      "explanation": "قُرئ = was read."
    }
  ],
  "icon": "↩️"
}
```

## `gr_a41`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a41",
  "phase": 7,
  "concept": "Verbal noun (masdar)",
  "description": "Some verbs → masdar.",
  "prompts": [
    {
      "stem": "reading (the act)",
      "choices": [
        "يقرأ",
        "قراءة",
        "قارئ",
        "مقروء"
      ],
      "correct": 1,
      "explanation": "قراءة = the act of reading."
    }
  ],
  "icon": "📖"
}
```

## `gr_a42`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a42",
  "phase": 7,
  "concept": "Participle: active",
  "description": "فاعل pattern.",
  "prompts": [
    {
      "stem": "writer",
      "choices": [
        "كاتب",
        "مكتوب",
        "كتب",
        "يكتب"
      ],
      "correct": 0,
      "explanation": "كاتب = active participle."
    }
  ],
  "icon": "✍️"
}
```

## `gr_a43`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a43",
  "phase": 7,
  "concept": "Participle: passive",
  "description": "مفعول pattern.",
  "prompts": [
    {
      "stem": "written",
      "choices": [
        "كاتب",
        "مكتوب",
        "كتب",
        "يكتب"
      ],
      "correct": 1,
      "explanation": "مكتوب = passive participle."
    }
  ],
  "icon": "📝"
}
```

## `gr_a44`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a44",
  "phase": 7,
  "concept": "Adverbs: time",
  "description": "اليوم, الحين, بعدين.",
  "prompts": [
    {
      "stem": "later",
      "choices": [
        "الحين",
        "اليوم",
        "بعدين",
        "الآن"
      ],
      "correct": 2,
      "explanation": "بعدين = later."
    }
  ],
  "icon": "⏰"
}
```

## `gr_a45`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a45",
  "phase": 7,
  "concept": "Adverbs: manner",
  "description": "-اً ending or بـ + masdar.",
  "prompts": [
    {
      "stem": "quickly",
      "choices": [
        "سريع",
        "بسرعة",
        "سرعة",
        "الأسرع"
      ],
      "correct": 1,
      "explanation": "بسرعة = quickly."
    }
  ],
  "icon": "💨"
}
```

## `gr_a46`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a46",
  "phase": 7,
  "concept": "Conjunctions: when",
  "description": "لما = when.",
  "prompts": [
    {
      "stem": "when he arrives",
      "choices": [
        "إذا يصل",
        "لما يصل",
        "لو يصل",
        "يصل"
      ],
      "correct": 1,
      "explanation": "لما + present = when."
    }
  ],
  "icon": "⏰"
}
```

## `gr_b36`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b36",
  "phase": 7,
  "concept": "Conjunctive: also",
  "description": "وأيضاً / كذلك.",
  "prompts": [
    {
      "stem": "I also want",
      "choices": [
        "أنا أبغى",
        "وأنا أبغى أيضاً",
        "أبغى",
        "لا أبغى"
      ],
      "correct": 1,
      "explanation": "وأيضاً = also."
    }
  ],
  "icon": "➕"
}
```

## `gr_b37`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b37",
  "phase": 7,
  "concept": "Conjunctive: but",
  "description": "لكن.",
  "prompts": [
    {
      "stem": "I like it but expensive",
      "choices": [
        "يعجبني وغالي",
        "يعجبني لكن غالي",
        "يعجبني",
        "غالي"
      ],
      "correct": 1,
      "explanation": "لكن = but."
    }
  ],
  "icon": "⚖️"
}
```

## `gr_b38`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b38",
  "phase": 7,
  "concept": "Conjunctive: or",
  "description": "أو.",
  "prompts": [
    {
      "stem": "tea or coffee",
      "choices": [
        "شاي قهوة",
        "شاي أو قهوة",
        "شاي و قهوة",
        "لا شاي"
      ],
      "correct": 1,
      "explanation": "أو = or."
    }
  ],
  "icon": "☕"
}
```

## `gr_b39`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b39",
  "phase": 7,
  "concept": "Conjunctive: so",
  "description": "فـ.",
  "prompts": [
    {
      "stem": "He was tired so he slept",
      "choices": [
        "تعب نام",
        "تعب فنام",
        "تعب لكن نام",
        "نام تعب"
      ],
      "correct": 1,
      "explanation": "فـ = then/so."
    }
  ],
  "icon": "😴"
}
```

## `gr_b40`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b40",
  "phase": 7,
  "concept": "Linking أن: that-clause",
  "description": "Used as direct object.",
  "prompts": [
    {
      "stem": "He said that he came",
      "choices": [
        "قال جاء",
        "قال إنه جاء",
        "يقول إنه",
        "سيقول"
      ],
      "correct": 1,
      "explanation": "إن introduces speech."
    }
  ],
  "icon": "🗣️"
}
```

## `gr_b41`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b41",
  "phase": 7,
  "concept": "Frequency: usually",
  "description": "عادةً.",
  "prompts": [
    {
      "stem": "I usually wake up early",
      "choices": [
        "أصحى بدري",
        "عادةً أصحى بدري",
        "صحيت بدري",
        "أصحى متأخراً"
      ],
      "correct": 1,
      "explanation": "عادةً = usually."
    }
  ],
  "icon": "⏰"
}
```

## `gr_b42`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b42",
  "phase": 7,
  "concept": "Frequency: rarely",
  "description": "نادراً.",
  "prompts": [
    {
      "stem": "I rarely complain",
      "choices": [
        "أشتكي",
        "نادراً ما أشتكي",
        "لا أشتكي",
        "أشتكي دائماً"
      ],
      "correct": 1,
      "explanation": "نادراً ما = rarely."
    }
  ],
  "icon": "🤐"
}
```

## `gr_c40`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c40",
  "phase": 7,
  "concept": "Conditional سوف",
  "description": "سوف + future.",
  "prompts": [
    {
      "stem": "I will read",
      "choices": [
        "قرأت",
        "سوف أقرأ",
        "ما أقرأ",
        "أقرأ"
      ],
      "correct": 1,
      "explanation": "سوف + present = will."
    }
  ],
  "icon": "📖"
}
```

## `gr_c41`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c41",
  "phase": 7,
  "concept": "Polite request: would you mind",
  "description": "هل تمانع.",
  "prompts": [
    {
      "stem": "Would you mind helping?",
      "choices": [
        "ساعد",
        "هل تمانع المساعدة؟",
        "لا تساعد",
        "ساعدني"
      ],
      "correct": 1,
      "explanation": "Polite request."
    }
  ],
  "icon": "🤝"
}
```

## `gr_c42`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c42",
  "phase": 7,
  "concept": "Polite refusal: I'd rather",
  "description": "أفضل + verb.",
  "prompts": [
    {
      "stem": "I'd rather wait",
      "choices": [
        "انتظرت",
        "أفضل أنتظر",
        "ما أنتظر",
        "سأنتظر"
      ],
      "correct": 1,
      "explanation": "أفضل + present."
    }
  ],
  "icon": "⏳"
}
```

## `gr_c43`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c43",
  "phase": 7,
  "concept": "Frequency: every now and then",
  "description": "من حين لآخر.",
  "prompts": [
    {
      "stem": "every now and then",
      "choices": [
        "دائماً",
        "من حين لآخر",
        "أبداً",
        "لا"
      ],
      "correct": 1,
      "explanation": "من حين لآخر = occasionally."
    }
  ],
  "icon": "🔁"
}
```
