# grammar_drills · phase 5 · dialect saudi

- count: **22**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `g_idafa_basic`

```json
{
  "dialect": "saudi",
  "drill_id": "g_idafa_basic",
  "phase": 5,
  "concept": "The إضافة construct (X of Y)",
  "description": "Two nouns side-by-side mean \"X of Y\". The first stays bare; only the second can take الـ. باب البيت = the door of the house.",
  "prompts": [
    {
      "stem": "the car key",
      "choices": [
        "مفتاح السيارة",
        "المفتاح سيارة",
        "مفتاح سيارة",
        "المفتاح السيارة"
      ],
      "correct": 0,
      "explanation": "First noun bare, second takes الـ."
    },
    {
      "stem": "a glass of water",
      "choices": [
        "كأس الماء",
        "كأس ماء",
        "الكأس الماء",
        "الماء كأس"
      ],
      "correct": 1,
      "explanation": "Both indefinite → كأس ماء."
    }
  ],
  "icon": "🔗"
}
```

## `g_negation_past`

```json
{
  "dialect": "saudi",
  "drill_id": "g_negation_past",
  "phase": 5,
  "concept": "Past-tense negation: ما + past",
  "description": "Negate past tense with ما before the verb. ما رحت = I didn't go. ما درست = I didn't study.",
  "prompts": [
    {
      "stem": "I didn't eat.",
      "choices": [
        "لا أكلت",
        "ما أكلت",
        "ما آكل",
        "لم آكل"
      ],
      "correct": 1,
      "explanation": "ما + past verb in Saudi."
    },
    {
      "stem": "He didn't come.",
      "choices": [
        "ما جاء",
        "ما يجي",
        "لا جاء",
        "لم"
      ],
      "correct": 0,
      "explanation": "ما + past = didn't."
    }
  ],
  "icon": "🚷"
}
```

## `g_superlatives`

```json
{
  "dialect": "saudi",
  "drill_id": "g_superlatives",
  "phase": 5,
  "concept": "Superlatives: الأ-",
  "description": "Superlative form takes الـ: الأكبر (the biggest), الأفضل (the best), الأسوأ (the worst).",
  "prompts": [
    {
      "stem": "the best",
      "choices": [
        "الأحسن",
        "أحسن",
        "أحسن من",
        "حسن"
      ],
      "correct": 0,
      "explanation": "Pattern الأ + adjective = the most ___."
    },
    {
      "stem": "the biggest",
      "choices": [
        "كبير",
        "أكبر",
        "الأكبر",
        "الكبير"
      ],
      "correct": 2,
      "explanation": "الأكبر."
    }
  ],
  "icon": "🏆"
}
```

## `g_when_clauses`

```json
{
  "dialect": "saudi",
  "drill_id": "g_when_clauses",
  "phase": 5,
  "concept": "When clauses with لما",
  "description": "لما = when. Connects events. لما أرجع البيت، أرتاح. = When I get home, I rest.",
  "prompts": [
    {
      "stem": "When I get home, I'll call.",
      "choices": [
        "لما أرجع البيت، بكلمك",
        "رجعت البيت بكلمك",
        "البيت لما رجعت",
        "كلمتك لما"
      ],
      "correct": 0,
      "explanation": "لما + clause sets the time."
    },
    {
      "stem": "When she came, I left.",
      "choices": [
        "جاءت لما طلعت",
        "لما جاءت، طلعت",
        "طلعت لما",
        "لما طلعت جاءت"
      ],
      "correct": 1,
      "explanation": "لما + past = when (past)."
    }
  ],
  "icon": "⏰"
}
```

## `gr_a29`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a29",
  "phase": 5,
  "concept": "Relative clause: اللي",
  "description": "اللي = who/which.",
  "prompts": [
    {
      "stem": "the man who came",
      "choices": [
        "الرجل جاء",
        "الرجل اللي جاء",
        "رجل اللي",
        "اللي رجل"
      ],
      "correct": 1,
      "explanation": "اللي connects."
    }
  ],
  "icon": "🔗"
}
```

## `gr_a30`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a30",
  "phase": 5,
  "concept": "Conditional: لو",
  "description": "لو + past = if (unreal).",
  "prompts": [
    {
      "stem": "If I had known",
      "choices": [
        "إن عرفت",
        "لو عرفت",
        "إذا عرفت",
        "عرفت لو"
      ],
      "correct": 1,
      "explanation": "لو + past."
    }
  ],
  "icon": "🔀"
}
```

## `gr_a31`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a31",
  "phase": 5,
  "concept": "Real conditional: إذا",
  "description": "إذا + present.",
  "prompts": [
    {
      "stem": "If you study, you'll pass",
      "choices": [
        "لو تدرس تنجح",
        "إذا تدرس تنجح",
        "ما تدرس",
        "تدرس فقط"
      ],
      "correct": 1,
      "explanation": "إذا for real."
    }
  ],
  "icon": "✅"
}
```

## `gr_a32`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a32",
  "phase": 5,
  "concept": "Adjective agreement",
  "description": "Adjective agrees in gender.",
  "prompts": [
    {
      "stem": "a small car (f noun)",
      "choices": [
        "سيارة صغير",
        "سيارة صغيرة",
        "صغير سيارة",
        "سيارات"
      ],
      "correct": 1,
      "explanation": "-ة for feminine."
    }
  ],
  "icon": "🚗"
}
```

## `gr_a33`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a33",
  "phase": 5,
  "concept": "Adjective plural for non-human",
  "description": "Plural non-human uses feminine singular.",
  "prompts": [
    {
      "stem": "big books",
      "choices": [
        "كتب كبيرين",
        "كتب كبيرة",
        "كتب كبير",
        "كبير كتب"
      ],
      "correct": 1,
      "explanation": "Non-human plural takes -ة."
    }
  ],
  "icon": "📚"
}
```

## `gr_a34`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a34",
  "phase": 5,
  "concept": "Continuous: قاعد + verb",
  "description": "قاعد + present = right now.",
  "prompts": [
    {
      "stem": "I'm eating",
      "choices": [
        "قاعد آكل",
        "آكل",
        "سأكل",
        "أكلت"
      ],
      "correct": 0,
      "explanation": "قاعد + present."
    }
  ],
  "icon": "🍴"
}
```

## `gr_a35`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a35",
  "phase": 5,
  "concept": "Passive: simple",
  "description": "Verb form changes.",
  "prompts": [
    {
      "stem": "It was written",
      "choices": [
        "كَتب",
        "كُتب",
        "يكتب",
        "كاتب"
      ],
      "correct": 1,
      "explanation": "كُتب = was written."
    }
  ],
  "icon": "↩️"
}
```

## `gr_b49`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b49",
  "phase": 5,
  "concept": "Ordinal numbers",
  "description": "أول / ثاني / ثالث.",
  "prompts": [
    {
      "stem": "second floor",
      "choices": [
        "الدور اثنين",
        "الدور الثاني",
        "ثاني دور",
        "الثاني دور"
      ],
      "correct": 1,
      "explanation": "الدور + ordinal."
    }
  ],
  "icon": "🏢"
}
```

## `gr_b50`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b50",
  "phase": 5,
  "concept": "Fractions",
  "description": "نصف / ثلث / ربع.",
  "prompts": [
    {
      "stem": "a quarter of the cake",
      "choices": [
        "ربع كيكة",
        "ربع الكيكة",
        "الكيكة ربع",
        "نصف الكيكة"
      ],
      "correct": 1,
      "explanation": "ربع + definite."
    }
  ],
  "icon": "🍰"
}
```

## `gr_b51`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b51",
  "phase": 5,
  "concept": "Telling time: o'clock",
  "description": "الساعة + number.",
  "prompts": [
    {
      "stem": "It is five",
      "choices": [
        "الساعة خمسة",
        "خمسة الساعة",
        "ساعة",
        "خمسة"
      ],
      "correct": 0,
      "explanation": "الساعة + number."
    }
  ],
  "icon": "🕔"
}
```

## `gr_b52`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b52",
  "phase": 5,
  "concept": "Telling time: half",
  "description": "نص.",
  "prompts": [
    {
      "stem": "half past three",
      "choices": [
        "الساعة ثلاثة",
        "الساعة ثلاثة ونص",
        "الساعة ثلاث",
        "ثلاثة نص"
      ],
      "correct": 1,
      "explanation": "الساعة + ع + ونص."
    }
  ],
  "icon": "🕞"
}
```

## `gr_b53`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b53",
  "phase": 5,
  "concept": "Date format",
  "description": "يوم/شهر/سنة.",
  "prompts": [
    {
      "stem": "the third of June",
      "choices": [
        "3 يونيو",
        "يوم 3 يونيو",
        "يونيو 3",
        "شهر يونيو"
      ],
      "correct": 1,
      "explanation": "يوم + number + month."
    }
  ],
  "icon": "📅"
}
```

## `gr_c27`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c27",
  "phase": 5,
  "concept": "Equating: same as",
  "description": "مثل / نفس.",
  "prompts": [
    {
      "stem": "the same color",
      "choices": [
        "نفس اللون",
        "لون",
        "الألوان",
        "لون نفس"
      ],
      "correct": 0,
      "explanation": "نفس + definite noun."
    }
  ],
  "icon": "🎨"
}
```

## `gr_c28`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c28",
  "phase": 5,
  "concept": "Equating: different",
  "description": "مختلف.",
  "prompts": [
    {
      "stem": "a different idea",
      "choices": [
        "نفس فكرة",
        "فكرة مختلفة",
        "فكرة",
        "الفكرة"
      ],
      "correct": 1,
      "explanation": "Adj agrees w/ noun."
    }
  ],
  "icon": "💡"
}
```

## `gr_c29`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c29",
  "phase": 5,
  "concept": "Politeness: would you",
  "description": "ممكن + verb.",
  "prompts": [
    {
      "stem": "Would you help me?",
      "choices": [
        "ساعد",
        "ممكن تساعدني؟",
        "ساعدتني",
        "ما ساعدتني"
      ],
      "correct": 1,
      "explanation": "ممكن + present."
    }
  ],
  "icon": "🤝"
}
```

## `gr_c30`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c30",
  "phase": 5,
  "concept": "Politeness: please come",
  "description": "تفضل.",
  "prompts": [
    {
      "stem": "Please come in",
      "choices": [
        "دخل",
        "تفضل",
        "ما دخل",
        "يدخل"
      ],
      "correct": 1,
      "explanation": "تفضل = please."
    }
  ],
  "icon": "🚪"
}
```

## `gr_c31`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c31",
  "phase": 5,
  "concept": "Possession: belongs to",
  "description": "حق / مال.",
  "prompts": [
    {
      "stem": "this is mine",
      "choices": [
        "هذا",
        "هذا حقي",
        "حق",
        "لي"
      ],
      "correct": 1,
      "explanation": "حق + suffix."
    }
  ],
  "icon": "🔑"
}
```

## `gr_c32`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c32",
  "phase": 5,
  "concept": "Frequency: sometimes",
  "description": "أحياناً.",
  "prompts": [
    {
      "stem": "sometimes I travel",
      "choices": [
        "أسافر",
        "أحياناً أسافر",
        "لا أسافر",
        "سفرت"
      ],
      "correct": 1,
      "explanation": "أحياناً + verb."
    }
  ],
  "icon": "✈️"
}
```
