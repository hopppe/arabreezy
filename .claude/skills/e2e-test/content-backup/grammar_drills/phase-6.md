# grammar_drills · phase 6 · dialect saudi

- count: **21**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `g_dual`

```json
{
  "dialect": "saudi",
  "drill_id": "g_dual",
  "phase": 6,
  "concept": "The dual: -ين / -اين",
  "description": "Arabic has a dedicated dual (for exactly two). كتاب → كتابين (two books). يد → يدين (two hands).",
  "prompts": [
    {
      "stem": "two books",
      "choices": [
        "كتب",
        "كتابين",
        "كتاب",
        "الكتابان"
      ],
      "correct": 1,
      "explanation": "Suffix -ين marks the dual."
    },
    {
      "stem": "two friends",
      "choices": [
        "أصدقاء",
        "صديقين",
        "صديق",
        "أصدقائي"
      ],
      "correct": 1,
      "explanation": "صديقين = two friends."
    }
  ],
  "icon": "👯"
}
```

## `g_imperative`

```json
{
  "dialect": "saudi",
  "drill_id": "g_imperative",
  "phase": 6,
  "concept": "Commands (imperative)",
  "description": "Drop the present-tense prefix and adjust. تكتب → اكتب (write!). تجلس → اجلس (sit!).",
  "prompts": [
    {
      "stem": "Write your name.",
      "choices": [
        "تكتب اسمك",
        "اكتب اسمك",
        "يكتب اسمك",
        "كتب اسمك"
      ],
      "correct": 1,
      "explanation": "Drop ت- and add a vowel: اكتب."
    },
    {
      "stem": "Come here.",
      "choices": [
        "تعال",
        "يجي",
        "يأتي",
        "جاء"
      ],
      "correct": 0,
      "explanation": "تعال is the common imperative for come."
    }
  ],
  "icon": "👉"
}
```

## `g_relative_pronoun`

```json
{
  "dialect": "saudi",
  "drill_id": "g_relative_pronoun",
  "phase": 6,
  "concept": "الذي / التي (who, which)",
  "description": "الذي joins masculine relatives. التي joins feminine. الذين joins masculine plural.",
  "prompts": [
    {
      "stem": "the man who came",
      "choices": [
        "الرجل الذي جاء",
        "الرجل التي جاء",
        "الرجل الذين جاء",
        "الرجل جاء"
      ],
      "correct": 0,
      "explanation": "Masculine singular → الذي."
    },
    {
      "stem": "the woman who spoke",
      "choices": [
        "المرأة الذي تكلمت",
        "المرأة التي تكلمت",
        "المرأة تكلمت",
        "المرأة الذين"
      ],
      "correct": 1,
      "explanation": "Feminine singular → التي."
    }
  ],
  "icon": "🔗"
}
```

## `gr_a36`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a36",
  "phase": 6,
  "concept": "Quantifiers: بعض / كل",
  "description": "بعض = some, كل = all.",
  "prompts": [
    {
      "stem": "all the students",
      "choices": [
        "بعض الطلاب",
        "كل الطلاب",
        "الطلاب كل",
        "طلاب"
      ],
      "correct": 1,
      "explanation": "كل + definite."
    }
  ],
  "icon": "🎒"
}
```

## `gr_a37`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a37",
  "phase": 6,
  "concept": "Mass nouns",
  "description": "Mass noun stays singular.",
  "prompts": [
    {
      "stem": "a lot of water",
      "choices": [
        "ماء كثيرة",
        "ماء كثير",
        "مياه كثير",
        "الماء"
      ],
      "correct": 1,
      "explanation": "Mass noun = singular adj."
    }
  ],
  "icon": "💧"
}
```

## `gr_a38`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a38",
  "phase": 6,
  "concept": "Embed clauses: أن",
  "description": "أن + verb = that-clause.",
  "prompts": [
    {
      "stem": "I want to go",
      "choices": [
        "أريد أروح",
        "أريد أن أروح",
        "ما أروح",
        "أروح فقط"
      ],
      "correct": 1,
      "explanation": "أن + present."
    }
  ],
  "icon": "🔀"
}
```

## `gr_a39`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a39",
  "phase": 6,
  "concept": "Embed clauses: إن (that)",
  "description": "إن introduces noun clauses.",
  "prompts": [
    {
      "stem": "I think that he's late",
      "choices": [
        "أعتقد متأخر",
        "أعتقد إنه متأخر",
        "متأخر اعتقاد",
        "لا أعتقد"
      ],
      "correct": 1,
      "explanation": "إن (that) + noun clause."
    }
  ],
  "icon": "💭"
}
```

## `gr_a40`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a40",
  "phase": 6,
  "concept": "Reflexive: نفس",
  "description": "نفس + suffix = self.",
  "prompts": [
    {
      "stem": "by myself",
      "choices": [
        "نفسي",
        "نفسك",
        "نفسه",
        "نفس"
      ],
      "correct": 0,
      "explanation": "نفس + -ي = myself."
    }
  ],
  "icon": "🔁"
}
```

## `gr_b43`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b43",
  "phase": 6,
  "concept": "Always/never",
  "description": "دائماً / أبداً.",
  "prompts": [
    {
      "stem": "I never lie",
      "choices": [
        "أكذب",
        "لا أكذب أبداً",
        "أكذب أحياناً",
        "أكذب دائماً"
      ],
      "correct": 1,
      "explanation": "لا...أبداً = never."
    }
  ],
  "icon": "🚫"
}
```

## `gr_b44`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b44",
  "phase": 6,
  "concept": "Habit: each / every",
  "description": "كل + noun.",
  "prompts": [
    {
      "stem": "every Friday",
      "choices": [
        "جمعة",
        "كل جمعة",
        "الجمعة",
        "جمعتي"
      ],
      "correct": 1,
      "explanation": "كل + noun (bare)."
    }
  ],
  "icon": "📆"
}
```

## `gr_b45`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b45",
  "phase": 6,
  "concept": "Time of day expressions",
  "description": "صباحاً / مساءً.",
  "prompts": [
    {
      "stem": "in the morning",
      "choices": [
        "مساءً",
        "صباحاً",
        "ليلاً",
        "يوماً"
      ],
      "correct": 1,
      "explanation": "-اً adverbial ending."
    }
  ],
  "icon": "🌅"
}
```

## `gr_b46`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b46",
  "phase": 6,
  "concept": "Linking word: so that",
  "description": "حتى / عشان.",
  "prompts": [
    {
      "stem": "so that he understands",
      "choices": [
        "لو يفهم",
        "حتى يفهم",
        "إذا يفهم",
        "يفهم"
      ],
      "correct": 1,
      "explanation": "حتى + subjunctive."
    }
  ],
  "icon": "🎯"
}
```

## `gr_b47`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b47",
  "phase": 6,
  "concept": "Place: where",
  "description": "مكان / موضع.",
  "prompts": [
    {
      "stem": "a place where we sit",
      "choices": [
        "نقعد",
        "مكان نقعد فيه",
        "نقعد فيه",
        "مكان"
      ],
      "correct": 1,
      "explanation": "Relative use of مكان."
    }
  ],
  "icon": "📍"
}
```

## `gr_b48`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b48",
  "phase": 6,
  "concept": "Manner: how",
  "description": "كيف.",
  "prompts": [
    {
      "stem": "how to do it",
      "choices": [
        "كيف نسويها",
        "نسويها",
        "كيف",
        "سويناها"
      ],
      "correct": 0,
      "explanation": "كيف + clause."
    }
  ],
  "icon": "❓"
}
```

## `gr_c33`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c33",
  "phase": 6,
  "concept": "Linking: in addition",
  "description": "بالإضافة إلى.",
  "prompts": [
    {
      "stem": "in addition to that",
      "choices": [
        "هذا",
        "بالإضافة إلى ذلك",
        "لكن",
        "ولا"
      ],
      "correct": 1,
      "explanation": "بالإضافة إلى."
    }
  ],
  "icon": "➕"
}
```

## `gr_c34`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c34",
  "phase": 6,
  "concept": "Contrast: on the other hand",
  "description": "من جهة أخرى.",
  "prompts": [
    {
      "stem": "on the other hand",
      "choices": [
        "لكن",
        "من جهة أخرى",
        "ولكن",
        "لذلك"
      ],
      "correct": 1,
      "explanation": "من جهة أخرى."
    }
  ],
  "icon": "🔄"
}
```

## `gr_c35`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c35",
  "phase": 6,
  "concept": "Sequence: first",
  "description": "أولاً.",
  "prompts": [
    {
      "stem": "first",
      "choices": [
        "أخيراً",
        "أولاً",
        "ثانياً",
        "لاحقاً"
      ],
      "correct": 1,
      "explanation": "أولاً = first."
    }
  ],
  "icon": "1️⃣"
}
```

## `gr_c36`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c36",
  "phase": 6,
  "concept": "Sequence: then",
  "description": "بعدين / ثم.",
  "prompts": [
    {
      "stem": "then",
      "choices": [
        "أولاً",
        "ثم",
        "لكن",
        "لذا"
      ],
      "correct": 1,
      "explanation": "ثم = then."
    }
  ],
  "icon": "➡️"
}
```

## `gr_c37`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c37",
  "phase": 6,
  "concept": "Sequence: finally",
  "description": "أخيراً.",
  "prompts": [
    {
      "stem": "finally",
      "choices": [
        "أولاً",
        "أخيراً",
        "ثانياً",
        "ثم"
      ],
      "correct": 1,
      "explanation": "أخيراً = finally."
    }
  ],
  "icon": "🏁"
}
```

## `gr_c38`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c38",
  "phase": 6,
  "concept": "Reason: due to",
  "description": "بسبب + noun.",
  "prompts": [
    {
      "stem": "due to the rain",
      "choices": [
        "مع المطر",
        "بسبب المطر",
        "لو المطر",
        "المطر"
      ],
      "correct": 1,
      "explanation": "بسبب + noun."
    }
  ],
  "icon": "🌧️"
}
```

## `gr_c39`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c39",
  "phase": 6,
  "concept": "Purpose: to/in order to",
  "description": "عشان / لـ + verb.",
  "prompts": [
    {
      "stem": "to learn",
      "choices": [
        "تعلمت",
        "عشان أتعلم",
        "ما أتعلم",
        "التعلم"
      ],
      "correct": 1,
      "explanation": "عشان + present."
    }
  ],
  "icon": "🎯"
}
```
