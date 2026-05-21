# grammar_drills · phase 9 · dialect saudi

- count: **22**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `g_broken_plural`

```json
{
  "dialect": "saudi",
  "drill_id": "g_broken_plural",
  "phase": 9,
  "concept": "Broken plurals",
  "description": "Many Arabic plurals are \"broken\" — internal vowel changes. كتاب (book) → كتب (books). ولد (boy) → أولاد. بيت → بيوت.",
  "prompts": [
    {
      "stem": "plural of كتاب",
      "choices": [
        "كتابات",
        "كتب",
        "كتابين",
        "الكتب"
      ],
      "correct": 1,
      "explanation": "كتب = books (broken plural)."
    },
    {
      "stem": "plural of بيت",
      "choices": [
        "بيتين",
        "بيتات",
        "بيوت",
        "البيت"
      ],
      "correct": 2,
      "explanation": "بيوت = houses (broken plural)."
    }
  ],
  "icon": "🔢"
}
```

## `g_concessive`

```json
{
  "dialect": "saudi",
  "drill_id": "g_concessive",
  "phase": 9,
  "concept": "Concessive: رغم / مع",
  "description": "رغم أن (despite that) introduces concessive clauses. رغم أنه تعب، أكمل. = Although he got tired, he continued.",
  "prompts": [
    {
      "stem": "Although it's hot, we'll go.",
      "choices": [
        "الجو حار ونروح",
        "رغم أن الجو حار، نروح",
        "لو الجو حار",
        "الجو رغم حار"
      ],
      "correct": 1,
      "explanation": "رغم أن + clause."
    },
    {
      "stem": "Despite his fatigue, he kept working.",
      "choices": [
        "تعب وعمل",
        "رغم تعبه، استمر في العمل",
        "عمل رغم تعب",
        "استمر تعب"
      ],
      "correct": 1,
      "explanation": "رغم + noun + clause."
    }
  ],
  "icon": "🔁"
}
```

## `gr_b11`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b11",
  "phase": 9,
  "concept": "Possessive of verbal nouns",
  "description": "الـ + noun + suffix.",
  "prompts": [
    {
      "stem": "his arrival",
      "choices": [
        "وصل",
        "وصوله",
        "الوصول",
        "واصل"
      ],
      "correct": 1,
      "explanation": "وصول + ه = his arrival."
    }
  ],
  "icon": "🛬"
}
```

## `gr_b12`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b12",
  "phase": 9,
  "concept": "Time clause: while",
  "description": "بينما + clause.",
  "prompts": [
    {
      "stem": "while we wait",
      "choices": [
        "لما ننتظر",
        "بينما ننتظر",
        "إذا ننتظر",
        "لو ننتظر"
      ],
      "correct": 1,
      "explanation": "بينما = while."
    }
  ],
  "icon": "⏳"
}
```

## `gr_b13`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b13",
  "phase": 9,
  "concept": "After + clause",
  "description": "بعدما + past.",
  "prompts": [
    {
      "stem": "after he left",
      "choices": [
        "قبل ما طلع",
        "بعدما طلع",
        "لما طلع",
        "لو طلع"
      ],
      "correct": 1,
      "explanation": "بعدما + past."
    }
  ],
  "icon": "⏩"
}
```

## `gr_b14`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b14",
  "phase": 9,
  "concept": "Before + clause",
  "description": "قبل ما + present.",
  "prompts": [
    {
      "stem": "before you go",
      "choices": [
        "قبل ما تروح",
        "بعد ما تروح",
        "لما تروح",
        "تروح"
      ],
      "correct": 0,
      "explanation": "قبل ما + present."
    }
  ],
  "icon": "⏪"
}
```

## `gr_b15`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b15",
  "phase": 9,
  "concept": "Until + clause",
  "description": "حتى + clause.",
  "prompts": [
    {
      "stem": "until I succeed",
      "choices": [
        "لما أنجح",
        "حتى أنجح",
        "قبل أن أنجح",
        "أنجح"
      ],
      "correct": 1,
      "explanation": "حتى = until."
    }
  ],
  "icon": "🏁"
}
```

## `gr_b16`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b16",
  "phase": 9,
  "concept": "Negation of nominal",
  "description": "ليس / مو.",
  "prompts": [
    {
      "stem": "He is not at home",
      "choices": [
        "هو في البيت",
        "هو مو في البيت",
        "هو ما في البيت",
        "ما هو البيت"
      ],
      "correct": 1,
      "explanation": "مو + prepositional phrase."
    }
  ],
  "icon": "🏠"
}
```

## `gr_b17`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b17",
  "phase": 9,
  "concept": "Future negation",
  "description": "مو + future.",
  "prompts": [
    {
      "stem": "I won't come",
      "choices": [
        "جئت",
        "مو راح أجي",
        "ما جئت",
        "أجي"
      ],
      "correct": 1,
      "explanation": "مو راح + present."
    }
  ],
  "icon": "🚷"
}
```

## `gr_b18`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b18",
  "phase": 9,
  "concept": "Particle قد",
  "description": "قد + past intensifies past.",
  "prompts": [
    {
      "stem": "He has arrived",
      "choices": [
        "وصل",
        "قد وصل",
        "يصل",
        "سيصل"
      ],
      "correct": 1,
      "explanation": "قد + past = has done."
    }
  ],
  "icon": "✅"
}
```

## `gr_b19`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b19",
  "phase": 9,
  "concept": "Emphasis with لقد",
  "description": "لقد + past = certainly did.",
  "prompts": [
    {
      "stem": "I certainly tried",
      "choices": [
        "حاولت",
        "لقد حاولت",
        "ما حاولت",
        "أحاول"
      ],
      "correct": 1,
      "explanation": "لقد + past = surely did."
    }
  ],
  "icon": "💪"
}
```

## `gr_b20`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b20",
  "phase": 9,
  "concept": "Vocative: يا",
  "description": "يا + noun for direct address.",
  "prompts": [
    {
      "stem": "O Sami!",
      "choices": [
        "سامي",
        "يا سامي",
        "لـ سامي",
        "إلى سامي"
      ],
      "correct": 1,
      "explanation": "يا + name."
    }
  ],
  "icon": "🗣️"
}
```

## `gr_b21`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b21",
  "phase": 9,
  "concept": "Vocative formal: أيها",
  "description": "أيها + masc, أيتها + fem.",
  "prompts": [
    {
      "stem": "O honored guest (m)",
      "choices": [
        "يا ضيف",
        "أيها الضيف",
        "الضيف",
        "ضيف"
      ],
      "correct": 1,
      "explanation": "أيها for formal."
    }
  ],
  "icon": "🎤"
}
```

## `gr_b22`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b22",
  "phase": 9,
  "concept": "Diminutive",
  "description": "Adds -ي / -ون for affection.",
  "prompts": [
    {
      "stem": "little boy (diminutive)",
      "choices": [
        "ولد",
        "ولدون",
        "وليد",
        "الولد"
      ],
      "correct": 2,
      "explanation": "وليد is a diminutive."
    }
  ],
  "icon": "👶"
}
```

## `gr_b23`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b23",
  "phase": 9,
  "concept": "Number + counted noun",
  "description": "3-10 take plural genitive.",
  "prompts": [
    {
      "stem": "three books",
      "choices": [
        "ثلاث كتاب",
        "ثلاثة كتب",
        "ثلاثة كتاب",
        "كتب ثلاثة"
      ],
      "correct": 1,
      "explanation": "3-10 + plural."
    }
  ],
  "icon": "🔢"
}
```

## `gr_b24`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b24",
  "phase": 9,
  "concept": "Number 11+ singular",
  "description": "11+ take singular accusative.",
  "prompts": [
    {
      "stem": "twenty books",
      "choices": [
        "عشرين كتب",
        "عشرين كتاب",
        "عشرين كتاباً",
        "الكتب عشرين"
      ],
      "correct": 2,
      "explanation": "11+ + singular accusative."
    }
  ],
  "icon": "🔢"
}
```

## `gr_c48`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c48",
  "phase": 9,
  "concept": "Linking: nevertheless",
  "description": "مع ذلك.",
  "prompts": [
    {
      "stem": "nevertheless",
      "choices": [
        "لذلك",
        "مع ذلك",
        "لكن",
        "ولكن"
      ],
      "correct": 1,
      "explanation": "مع ذلك."
    }
  ],
  "icon": "🔁"
}
```

## `gr_c49`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c49",
  "phase": 9,
  "concept": "Hypothetical: as if",
  "description": "كأن.",
  "prompts": [
    {
      "stem": "as if he flew",
      "choices": [
        "مثل طار",
        "كأنه طار",
        "لو طار",
        "طار"
      ],
      "correct": 1,
      "explanation": "كأن + clause."
    }
  ],
  "icon": "🦅"
}
```

## `gr_c50`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c50",
  "phase": 9,
  "concept": "Emphatic: indeed",
  "description": "إن + noun.",
  "prompts": [
    {
      "stem": "Indeed the truth is clear",
      "choices": [
        "الحقيقة واضحة",
        "إن الحقيقة واضحة",
        "واضحة الحقيقة",
        "حقيقة"
      ],
      "correct": 1,
      "explanation": "إن emphasizes."
    }
  ],
  "icon": "❗"
}
```

## `gr_c51`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c51",
  "phase": 9,
  "concept": "Particle ليت (wish)",
  "description": "ليت + clause.",
  "prompts": [
    {
      "stem": "I wish we knew",
      "choices": [
        "نعرف",
        "ليتنا نعرف",
        "لو نعرف",
        "عرفنا"
      ],
      "correct": 1,
      "explanation": "ليت = wish."
    }
  ],
  "icon": "🌟"
}
```

## `gr_c52`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c52",
  "phase": 9,
  "concept": "Particle لعل (hope)",
  "description": "لعل + clause.",
  "prompts": [
    {
      "stem": "perhaps it'll improve",
      "choices": [
        "يتحسن",
        "لعله يتحسن",
        "ما يتحسن",
        "سيتحسن"
      ],
      "correct": 1,
      "explanation": "لعل = hope."
    }
  ],
  "icon": "🌈"
}
```

## `gr_c53`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c53",
  "phase": 9,
  "concept": "Particle كأن again",
  "description": "For appearance.",
  "prompts": [
    {
      "stem": "as if it'll rain",
      "choices": [
        "تمطر",
        "كأنها بتمطر",
        "لا تمطر",
        "سوف تمطر"
      ],
      "correct": 1,
      "explanation": "كأن + clause."
    }
  ],
  "icon": "🌧️"
}
```
