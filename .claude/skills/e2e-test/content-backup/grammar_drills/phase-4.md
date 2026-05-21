# grammar_drills · phase 4 · dialect saudi

- count: **22**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `g_comparatives`

```json
{
  "dialect": "saudi",
  "drill_id": "g_comparatives",
  "phase": 4,
  "concept": "Comparatives: أفعل than",
  "description": "Comparative form is أفعل + من. كبير → أكبر من (bigger than). صغير → أصغر من.",
  "prompts": [
    {
      "stem": "bigger than",
      "choices": [
        "كبير من",
        "أكبر من",
        "الأكبر",
        "صغير من"
      ],
      "correct": 1,
      "explanation": "أكبر = bigger."
    },
    {
      "stem": "older than (he)",
      "choices": [
        "أكبر منه",
        "أصغر منه",
        "كبير منه",
        "أكبره"
      ],
      "correct": 0,
      "explanation": "أكبر منه = older than him."
    }
  ],
  "icon": "⚖️"
}
```

## `g_future_rah`

```json
{
  "dialect": "saudi",
  "drill_id": "g_future_rah",
  "phase": 4,
  "concept": "Future tense with راح / ح",
  "description": "Saudi marks the future with راح or just the prefix حـ. حأروح = I'll go. راح أروح = same.",
  "prompts": [
    {
      "stem": "I'll go tomorrow.",
      "choices": [
        "رحت بكرة",
        "حأروح بكرة",
        "ما رحت بكرة",
        "أروح أمس"
      ],
      "correct": 1,
      "explanation": "حـ + present = future."
    },
    {
      "stem": "He will eat.",
      "choices": [
        "أكل",
        "حياكل",
        "ما يأكل",
        "كان ياكل"
      ],
      "correct": 1,
      "explanation": "حياكل = he will eat."
    }
  ],
  "icon": "⏩"
}
```

## `g_negation_present`

```json
{
  "dialect": "saudi",
  "drill_id": "g_negation_present",
  "phase": 4,
  "concept": "Negation in the present: ما / لا",
  "description": "In Saudi Arabic, prefix ما before the verb to negate the present. ما أعرف = I don't know.",
  "prompts": [
    {
      "stem": "I don't want",
      "choices": [
        "لا أبغى",
        "ما أبغى",
        "ما بغيت",
        "ليس أبغى"
      ],
      "correct": 1,
      "explanation": "ما + present verb."
    },
    {
      "stem": "He doesn't speak Arabic.",
      "choices": [
        "هو لم يتكلم",
        "ما يتكلم العربي",
        "ما تكلم",
        "ليس يتكلم"
      ],
      "correct": 1,
      "explanation": "ما يتكلم العربي."
    }
  ],
  "icon": "🚷"
}
```

## `gr_a23`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a23",
  "phase": 4,
  "concept": "Definite article assimilation",
  "description": "الـ assimilates with sun letters.",
  "prompts": [
    {
      "stem": "the sun",
      "choices": [
        "ال شمس",
        "الشمس",
        "الشمس (sh sound doubled)",
        "شمس"
      ],
      "correct": 2,
      "explanation": "ل assimilates to sh."
    }
  ],
  "icon": "☀️"
}
```

## `gr_a24`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a24",
  "phase": 4,
  "concept": "Particle لـ for \"for\"",
  "description": "لـ + noun = for.",
  "prompts": [
    {
      "stem": "a gift for the boy",
      "choices": [
        "هدية الولد",
        "هدية للولد",
        "هدية ولد",
        "ولد هدية"
      ],
      "correct": 1,
      "explanation": "للولد = to/for the boy."
    }
  ],
  "icon": "🎁"
}
```

## `gr_a25`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a25",
  "phase": 4,
  "concept": "Question words: how much",
  "description": "كم + noun.",
  "prompts": [
    {
      "stem": "how many books",
      "choices": [
        "كم كتاب",
        "كم كتب",
        "كتاب كم",
        "الكتاب"
      ],
      "correct": 0,
      "explanation": "كم + singular."
    }
  ],
  "icon": "❓"
}
```

## `gr_a26`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a26",
  "phase": 4,
  "concept": "Comparative: أ-",
  "description": "Pattern أفعل from adjective.",
  "prompts": [
    {
      "stem": "smaller than",
      "choices": [
        "صغير من",
        "أصغر من",
        "الصغير",
        "صغير"
      ],
      "correct": 1,
      "explanation": "أفعل + من."
    }
  ],
  "icon": "⏬"
}
```

## `gr_a27`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a27",
  "phase": 4,
  "concept": "Quantity: كثير / قليل",
  "description": "Adjective placement after noun.",
  "prompts": [
    {
      "stem": "a lot of money",
      "choices": [
        "كثير فلوس",
        "فلوس كثير",
        "فلوس كثيرة",
        "قليل فلوس"
      ],
      "correct": 2,
      "explanation": "Adjective agrees with noun."
    }
  ],
  "icon": "💰"
}
```

## `gr_a28`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a28",
  "phase": 4,
  "concept": "Some / any: شي",
  "description": "شي = thing/any.",
  "prompts": [
    {
      "stem": "something else?",
      "choices": [
        "شي ثاني",
        "ثاني شي",
        "شي ثاني؟",
        "الشي"
      ],
      "correct": 2,
      "explanation": "شي ثاني؟ as a question."
    }
  ],
  "icon": "❓"
}
```

## `gr_b26`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b26",
  "phase": 4,
  "concept": "Modal: maybe",
  "description": "يمكن + present.",
  "prompts": [
    {
      "stem": "Maybe he'll come",
      "choices": [
        "جا",
        "يمكن يجي",
        "ما جا",
        "لا يجي"
      ],
      "correct": 1,
      "explanation": "يمكن + present."
    }
  ],
  "icon": "🤔"
}
```

## `gr_b31`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b31",
  "phase": 4,
  "concept": "Modal: still",
  "description": "لسا + verb.",
  "prompts": [
    {
      "stem": "I'm still waiting",
      "choices": [
        "انتظرت",
        "لسا أنتظر",
        "ما انتظرت",
        "سأنتظر"
      ],
      "correct": 1,
      "explanation": "لسا = still."
    }
  ],
  "icon": "⏳"
}
```

## `gr_b54`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b54",
  "phase": 4,
  "concept": "Linking with \"and\"",
  "description": "و before each item.",
  "prompts": [
    {
      "stem": "pen and paper",
      "choices": [
        "قلم ورقة",
        "قلم و ورقة",
        "قلم وورقة",
        "ورقة قلم"
      ],
      "correct": 2,
      "explanation": "و + noun."
    }
  ],
  "icon": "✏️"
}
```

## `gr_b55`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b55",
  "phase": 4,
  "concept": "Place prepositions: in front",
  "description": "أمام.",
  "prompts": [
    {
      "stem": "in front of the door",
      "choices": [
        "وراء الباب",
        "أمام الباب",
        "تحت الباب",
        "فوق الباب"
      ],
      "correct": 1,
      "explanation": "أمام = in front."
    }
  ],
  "icon": "🚪"
}
```

## `gr_b56`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b56",
  "phase": 4,
  "concept": "Place prepositions: behind",
  "description": "وراء / خلف.",
  "prompts": [
    {
      "stem": "behind the car",
      "choices": [
        "أمام السيارة",
        "وراء السيارة",
        "داخل السيارة",
        "فوق السيارة"
      ],
      "correct": 1,
      "explanation": "وراء = behind."
    }
  ],
  "icon": "🚗"
}
```

## `gr_b57`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b57",
  "phase": 4,
  "concept": "Place prepositions: between",
  "description": "بين.",
  "prompts": [
    {
      "stem": "between me and you",
      "choices": [
        "بيننا",
        "بيني وبينك",
        "فينا",
        "بيني"
      ],
      "correct": 1,
      "explanation": "بين + first + و + second."
    }
  ],
  "icon": "🤝"
}
```

## `gr_b58`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b58",
  "phase": 4,
  "concept": "Place prepositions: next to",
  "description": "جنب.",
  "prompts": [
    {
      "stem": "next to the house",
      "choices": [
        "داخل البيت",
        "جنب البيت",
        "فوق البيت",
        "بدون"
      ],
      "correct": 1,
      "explanation": "جنب = beside."
    }
  ],
  "icon": "🏘️"
}
```

## `gr_c21`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c21",
  "phase": 4,
  "concept": "Compound prepositions",
  "description": "من + إلى = from...to.",
  "prompts": [
    {
      "stem": "from morning to evening",
      "choices": [
        "صباح مساء",
        "من الصباح إلى المساء",
        "صباحاً مساءً",
        "الصباح المساء"
      ],
      "correct": 1,
      "explanation": "من...إلى."
    }
  ],
  "icon": "🌅"
}
```

## `gr_c22`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c22",
  "phase": 4,
  "concept": "Time: at + hour",
  "description": "الساعة + number.",
  "prompts": [
    {
      "stem": "at five",
      "choices": [
        "خمسة",
        "الساعة خمسة",
        "في خمسة",
        "على خمسة"
      ],
      "correct": 1,
      "explanation": "الساعة + hour."
    }
  ],
  "icon": "🕔"
}
```

## `gr_c23`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c23",
  "phase": 4,
  "concept": "Time: ago",
  "description": "قبل + duration.",
  "prompts": [
    {
      "stem": "an hour ago",
      "choices": [
        "ساعة",
        "قبل ساعة",
        "بعد ساعة",
        "الساعة"
      ],
      "correct": 1,
      "explanation": "قبل + duration."
    }
  ],
  "icon": "⏰"
}
```

## `gr_c24`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c24",
  "phase": 4,
  "concept": "Time: in (future)",
  "description": "بعد + duration.",
  "prompts": [
    {
      "stem": "in an hour",
      "choices": [
        "قبل ساعة",
        "بعد ساعة",
        "الساعة",
        "ساعة"
      ],
      "correct": 1,
      "explanation": "بعد + duration."
    }
  ],
  "icon": "⏩"
}
```

## `gr_c25`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c25",
  "phase": 4,
  "concept": "Body health: hurts",
  "description": "يوجع.",
  "prompts": [
    {
      "stem": "my head hurts",
      "choices": [
        "راسي",
        "راسي يوجعني",
        "يوجع",
        "رأسي"
      ],
      "correct": 1,
      "explanation": "-ني = me."
    }
  ],
  "icon": "🤕"
}
```

## `gr_c26`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c26",
  "phase": 4,
  "concept": "Health: feel",
  "description": "أحس / أشعر.",
  "prompts": [
    {
      "stem": "I feel cold",
      "choices": [
        "بارد",
        "أحس بالبرد",
        "البرد",
        "بارد جداً"
      ],
      "correct": 1,
      "explanation": "أحس + بـ."
    }
  ],
  "icon": "🥶"
}
```
