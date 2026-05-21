# grammar_drills · phase 8 · dialect saudi

- count: **20**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `g_active_participle`

```json
{
  "dialect": "saudi",
  "drill_id": "g_active_participle",
  "phase": 8,
  "concept": "Active participle: فاعل",
  "description": "Active participle (فاعل) describes someone doing the action. كاتب = writer / writing. ساكن = resident / living. The form often functions like an adjective in spoken Arabic.",
  "prompts": [
    {
      "stem": "He is writing now.",
      "choices": [
        "هو كتب",
        "هو يكتب",
        "هو كاتب الحين",
        "هو كتاب"
      ],
      "correct": 2,
      "explanation": "كاتب = (currently) writing — present continuous in spoken Arabic."
    },
    {
      "stem": "She lives in Riyadh.",
      "choices": [
        "هي سكنت",
        "هي ساكنة الرياض",
        "هي بيت",
        "هي تسكن سكن"
      ],
      "correct": 1,
      "explanation": "ساكنة = (currently) living."
    }
  ],
  "icon": "✍️"
}
```

## `g_emphatic_struct`

```json
{
  "dialect": "saudi",
  "drill_id": "g_emphatic_struct",
  "phase": 8,
  "concept": "Emphasis with إن / إنّ",
  "description": "Start a sentence with إنّ + noun for emphasis. إنّ النجاح يحتاج صبر. = Indeed, success needs patience.",
  "prompts": [
    {
      "stem": "Indeed, the road is long.",
      "choices": [
        "الطريق طويل",
        "إن الطريق طويل",
        "الطريق إن طويل",
        "طويل الطريق"
      ],
      "correct": 1,
      "explanation": "إن + noun pattern."
    },
    {
      "stem": "Truly, life is a journey.",
      "choices": [
        "إن الحياة رحلة",
        "الحياة رحلة فقط",
        "رحلة الحياة",
        "حياة في رحلة"
      ],
      "correct": 0,
      "explanation": "إن adds rhetorical weight."
    }
  ],
  "icon": "❗"
}
```

## `gr_a47`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a47",
  "phase": 8,
  "concept": "Subjunctive after أن",
  "description": "Drop final ن in plural.",
  "prompts": [
    {
      "stem": "I want them to go",
      "choices": [
        "أبغاهم يروحون",
        "أبغاهم أن يروحوا",
        "أبغاهم راحوا",
        "أبغى يروح"
      ],
      "correct": 1,
      "explanation": "أن + plural drops ن."
    }
  ],
  "icon": "🚶"
}
```

## `gr_a48`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a48",
  "phase": 8,
  "concept": "Cause: لأن",
  "description": "لأن = because.",
  "prompts": [
    {
      "stem": "because he's tired",
      "choices": [
        "إنه تعبان",
        "لأنه تعبان",
        "لو تعبان",
        "تعبان"
      ],
      "correct": 1,
      "explanation": "لأن + clause = because."
    }
  ],
  "icon": "🤔"
}
```

## `gr_a49`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a49",
  "phase": 8,
  "concept": "Result: عشان",
  "description": "عشان = so that / because.",
  "prompts": [
    {
      "stem": "so that we win",
      "choices": [
        "عشان نفوز",
        "لو نفوز",
        "إذا فزنا",
        "نفوز"
      ],
      "correct": 0,
      "explanation": "عشان introduces purpose."
    }
  ],
  "icon": "🎯"
}
```

## `gr_a50`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a50",
  "phase": 8,
  "concept": "Concession: رغم",
  "description": "رغم أن = although.",
  "prompts": [
    {
      "stem": "although it's hot",
      "choices": [
        "لو الجو حار",
        "رغم أن الجو حار",
        "إذا الجو حار",
        "الجو حار"
      ],
      "correct": 1,
      "explanation": "رغم أن introduces concession."
    }
  ],
  "icon": "🔁"
}
```

## `gr_b01`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b01",
  "phase": 8,
  "concept": "Comparison: like",
  "description": "مثل + noun.",
  "prompts": [
    {
      "stem": "like the sun",
      "choices": [
        "مثل شمس",
        "مثل الشمس",
        "الشمس مثل",
        "شمس"
      ],
      "correct": 1,
      "explanation": "مثل + definite."
    }
  ],
  "icon": "☀️"
}
```

## `gr_b02`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b02",
  "phase": 8,
  "concept": "Comparison: as if",
  "description": "كأن + noun.",
  "prompts": [
    {
      "stem": "as if he is tired",
      "choices": [
        "مثل تعبان",
        "كأنه تعبان",
        "تعبان",
        "لو تعبان"
      ],
      "correct": 1,
      "explanation": "كأن + pronoun."
    }
  ],
  "icon": "💭"
}
```

## `gr_b03`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b03",
  "phase": 8,
  "concept": "Adverb of degree",
  "description": "جداً = very.",
  "prompts": [
    {
      "stem": "very fast",
      "choices": [
        "سريع",
        "سريع جداً",
        "الأسرع",
        "بسرعة"
      ],
      "correct": 1,
      "explanation": "adj + جداً."
    }
  ],
  "icon": "⚡"
}
```

## `gr_b04`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b04",
  "phase": 8,
  "concept": "Compound tenses: was + verb",
  "description": "كان + present = was -ing.",
  "prompts": [
    {
      "stem": "I was eating",
      "choices": [
        "أكل",
        "كنت آكل",
        "أكلت",
        "سآكل"
      ],
      "correct": 1,
      "explanation": "كان + present = past continuous."
    }
  ],
  "icon": "🍴"
}
```

## `gr_b05`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b05",
  "phase": 8,
  "concept": "Will have + verb",
  "description": "بكون قد + past = will have.",
  "prompts": [
    {
      "stem": "I will have eaten",
      "choices": [
        "أكلت",
        "بكون أكلت",
        "سآكل",
        "آكل"
      ],
      "correct": 1,
      "explanation": "Future perfect."
    }
  ],
  "icon": "⏱️"
}
```

## `gr_b06`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b06",
  "phase": 8,
  "concept": "Possessive of nouns: إضافة",
  "description": "Two nouns side by side.",
  "prompts": [
    {
      "stem": "car key",
      "choices": [
        "مفتاح سيارة",
        "مفتاح السيارة",
        "سيارة مفتاح",
        "المفتاح السيارة"
      ],
      "correct": 1,
      "explanation": "Idafa: bare + definite."
    }
  ],
  "icon": "🔑"
}
```

## `gr_b07`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b07",
  "phase": 8,
  "concept": "Double object verbs",
  "description": "Some verbs take two objects.",
  "prompts": [
    {
      "stem": "He gave me a book",
      "choices": [
        "أعطاني كتاب",
        "أعطى كتاب",
        "أعطاني الكتاب",
        "الكتاب أعطاني"
      ],
      "correct": 2,
      "explanation": "verb + me + object."
    }
  ],
  "icon": "📘"
}
```

## `gr_b08`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b08",
  "phase": 8,
  "concept": "Passive of giving",
  "description": "أُعطي = was given.",
  "prompts": [
    {
      "stem": "I was given a gift",
      "choices": [
        "أُعطيت هدية",
        "أعطيت هدية",
        "هدية أعطيت",
        "أعطى هدية"
      ],
      "correct": 0,
      "explanation": "Passive form."
    }
  ],
  "icon": "🎁"
}
```

## `gr_b09`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b09",
  "phase": 8,
  "concept": "Existential past",
  "description": "كان فيه = there was.",
  "prompts": [
    {
      "stem": "There was time",
      "choices": [
        "فيه وقت",
        "كان فيه وقت",
        "ما فيه",
        "وقت كان"
      ],
      "correct": 1,
      "explanation": "كان فيه = there was."
    }
  ],
  "icon": "⏳"
}
```

## `gr_b10`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b10",
  "phase": 8,
  "concept": "Existential future",
  "description": "بيكون فيه = there will be.",
  "prompts": [
    {
      "stem": "There will be food",
      "choices": [
        "فيه أكل",
        "بيكون فيه أكل",
        "ما فيه أكل",
        "أكل"
      ],
      "correct": 1,
      "explanation": "بيكون فيه = there will be."
    }
  ],
  "icon": "🍽️"
}
```

## `gr_c44`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c44",
  "phase": 8,
  "concept": "Conjunction: although",
  "description": "رغم أن.",
  "prompts": [
    {
      "stem": "Although it's hard",
      "choices": [
        "لو صعب",
        "رغم أنه صعب",
        "إذا صعب",
        "صعب"
      ],
      "correct": 1,
      "explanation": "رغم أن + clause."
    }
  ],
  "icon": "🪢"
}
```

## `gr_c45`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c45",
  "phase": 8,
  "concept": "Despite + noun",
  "description": "رغم + noun.",
  "prompts": [
    {
      "stem": "despite the difficulty",
      "choices": [
        "مع الصعوبة",
        "رغم الصعوبة",
        "لو الصعوبة",
        "الصعوبة"
      ],
      "correct": 1,
      "explanation": "رغم + noun."
    }
  ],
  "icon": "⚙️"
}
```

## `gr_c46`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c46",
  "phase": 8,
  "concept": "Linking: meanwhile",
  "description": "في هذه الأثناء.",
  "prompts": [
    {
      "stem": "meanwhile",
      "choices": [
        "لاحقاً",
        "في هذه الأثناء",
        "قبل",
        "بعد"
      ],
      "correct": 1,
      "explanation": "في هذه الأثناء = meanwhile."
    }
  ],
  "icon": "⏳"
}
```

## `gr_c47`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c47",
  "phase": 8,
  "concept": "Linking: therefore",
  "description": "لذلك.",
  "prompts": [
    {
      "stem": "therefore",
      "choices": [
        "لكن",
        "لذلك",
        "لو",
        "ولا"
      ],
      "correct": 1,
      "explanation": "لذلك = therefore."
    }
  ],
  "icon": "➡️"
}
```
