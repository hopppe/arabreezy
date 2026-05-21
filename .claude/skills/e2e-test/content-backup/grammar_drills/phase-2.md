# grammar_drills · phase 2 · dialect saudi

- count: **20**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `g_colors_agreement`

```json
{
  "dialect": "saudi",
  "drill_id": "g_colors_agreement",
  "phase": 2,
  "concept": "Colors: masculine and feminine",
  "description": "In Arabic, adjectives agree with nouns in gender. Most colors have a masculine form (أَحْمَر) and a feminine form (حَمْرَاء).",
  "prompts": [
    {
      "stem": "The bag is red. (حقيبة = feminine)",
      "choices": [
        "الحقيبة أحمر",
        "الحقيبة حمراء",
        "الحقيبة أحمرة",
        "الحقيبة أحمرون"
      ],
      "correct": 1,
      "explanation": "حمراء is the feminine form of red."
    },
    {
      "stem": "The car is blue. (سيارة = feminine)",
      "choices": [
        "السيارة أزرق",
        "السيارة زرقاء",
        "السيارة زرق",
        "السيارة أزرقة"
      ],
      "correct": 1,
      "explanation": "زرقاء is the feminine form of blue."
    },
    {
      "stem": "The pen is black. (قلم = masculine)",
      "choices": [
        "القلم أسود",
        "القلم سوداء",
        "القلم أسودة",
        "القلم سوود"
      ],
      "correct": 0,
      "explanation": "أسود is the masculine form of black."
    }
  ],
  "icon": "🎨"
}
```

## `g_days_of_week`

```json
{
  "dialect": "saudi",
  "drill_id": "g_days_of_week",
  "phase": 2,
  "concept": "Days of the week",
  "description": "Saudi Arabic uses the same day names as MSA but with colloquial shortcuts. الجمعة (Friday) and الخميس (Thursday) are the weekend.",
  "prompts": [
    {
      "stem": "Which day comes after الأحد (Sunday)?",
      "choices": [
        "السبت",
        "الاثنين",
        "الجمعة",
        "الثلاثاء"
      ],
      "correct": 1,
      "explanation": "الاثنين (Monday) follows الأحد (Sunday)."
    },
    {
      "stem": "How do you say Friday in Arabic?",
      "choices": [
        "الخميس",
        "الأربعاء",
        "الجمعة",
        "السبت"
      ],
      "correct": 2,
      "explanation": "الجمعة is Friday — the holy day and the start of the Saudi weekend."
    },
    {
      "stem": "How do you say today in Saudi Arabic?",
      "choices": [
        "بكرة",
        "اليوم",
        "أمس",
        "الحين"
      ],
      "correct": 1,
      "explanation": "اليوم means today. بكرة = tomorrow, أمس = yesterday, الحين = right now."
    }
  ],
  "icon": "📅"
}
```

## `g_definite_article`

```json
{
  "dialect": "saudi",
  "drill_id": "g_definite_article",
  "phase": 2,
  "concept": "The definite article الـ",
  "description": "Arabic has no \"a/an\" — just \"the\" (الـ), which attaches to the noun. كتاب = a book; الكتاب = the book.",
  "prompts": [
    {
      "stem": "the door",
      "choices": [
        "باب",
        "الباب",
        "ذاك باب",
        "هذا"
      ],
      "correct": 1,
      "explanation": "الباب = the door."
    },
    {
      "stem": "a child",
      "choices": [
        "الولد",
        "ولد",
        "الأولاد",
        "ولدي"
      ],
      "correct": 1,
      "explanation": "Bare noun = indefinite: ولد = a child."
    }
  ],
  "icon": "🔡"
}
```

## `g_demonstratives`

```json
{
  "dialect": "saudi",
  "drill_id": "g_demonstratives",
  "phase": 2,
  "concept": "this / that — هذا / ذاك",
  "description": "هذا (this, masculine), هذي (this, feminine), ذاك (that, masculine), تلك (that, feminine).",
  "prompts": [
    {
      "stem": "this book (m)",
      "choices": [
        "هذا الكتاب",
        "هذي الكتاب",
        "تلك الكتاب",
        "ذاك الكتاب"
      ],
      "correct": 0,
      "explanation": "كتاب is masculine → هذا الكتاب."
    },
    {
      "stem": "that house (f? — بيت is m)",
      "choices": [
        "هذي البيت",
        "ذاك البيت",
        "تلك البيت",
        "هذا البيت"
      ],
      "correct": 1,
      "explanation": "بيت is masculine and \"that\" → ذاك البيت."
    }
  ],
  "icon": "👉"
}
```

## `g_possessive_basic`

```json
{
  "dialect": "saudi",
  "drill_id": "g_possessive_basic",
  "phase": 2,
  "concept": "Possessive suffixes: -i, -ak, -ik, -uh, -ha",
  "description": "Possession in Arabic is a suffix on the noun. كتاب (book) → كتابي (my book), كتابك (your book).",
  "prompts": [
    {
      "stem": "my book",
      "choices": [
        "كتابك",
        "كتابي",
        "كتابه",
        "كتابها"
      ],
      "correct": 1,
      "explanation": "-ي is the \"my\" suffix."
    },
    {
      "stem": "her car",
      "choices": [
        "سيارتي",
        "سيارتك",
        "سيارته",
        "سيارتها"
      ],
      "correct": 3,
      "explanation": "-ها is the \"her\" suffix."
    }
  ],
  "icon": "📚"
}
```

## `gr_a07`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a07",
  "phase": 2,
  "concept": "Plurals: words ending in ة",
  "description": "Plurals often end in ات.",
  "prompts": [
    {
      "stem": "teachers (f)",
      "choices": [
        "معلمات",
        "معلمين",
        "معلمة",
        "معلم"
      ],
      "correct": 0,
      "explanation": "-ات for feminine plural."
    }
  ],
  "icon": "👩‍🏫"
}
```

## `gr_a08`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a08",
  "phase": 2,
  "concept": "Negation: مو",
  "description": "مو negates noun phrases.",
  "prompts": [
    {
      "stem": "He is not a doctor.",
      "choices": [
        "هو دكتور",
        "هو مو دكتور",
        "لا دكتور",
        "ما دكتور"
      ],
      "correct": 1,
      "explanation": "مو + noun negates."
    }
  ],
  "icon": "🚫"
}
```

## `gr_a09`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a09",
  "phase": 2,
  "concept": "Negation: ما",
  "description": "ما negates verbs (past).",
  "prompts": [
    {
      "stem": "I didn't go",
      "choices": [
        "لا رحت",
        "ما رحت",
        "مو رحت",
        "رحت"
      ],
      "correct": 1,
      "explanation": "ما + past verb."
    }
  ],
  "icon": "🚷"
}
```

## `gr_a10`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a10",
  "phase": 2,
  "concept": "Have: عند",
  "description": "عند + suffix = to have.",
  "prompts": [
    {
      "stem": "She has time",
      "choices": [
        "عندها وقت",
        "عنده وقت",
        "عندي وقت",
        "عندك وقت"
      ],
      "correct": 0,
      "explanation": "عند+ها = she has."
    }
  ],
  "icon": "⏳"
}
```

## `gr_a11`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a11",
  "phase": 2,
  "concept": "Future: ح",
  "description": "حـ prefix marks future.",
  "prompts": [
    {
      "stem": "I'll go",
      "choices": [
        "رحت",
        "حأروح",
        "ما أروح",
        "أروح"
      ],
      "correct": 1,
      "explanation": "حـ + present = future."
    }
  ],
  "icon": "⏩"
}
```

## `gr_a12`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a12",
  "phase": 2,
  "concept": "Future: راح",
  "description": "راح + present also marks future.",
  "prompts": [
    {
      "stem": "He will eat",
      "choices": [
        "أكل",
        "راح ياكل",
        "ما ياكل",
        "ياكل"
      ],
      "correct": 1,
      "explanation": "راح + verb = future."
    }
  ],
  "icon": "⏩"
}
```

## `gr_b28`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b28",
  "phase": 2,
  "concept": "Modal: want",
  "description": "يبغى / أريد + present.",
  "prompts": [
    {
      "stem": "I want to learn",
      "choices": [
        "أتعلم",
        "أبغى أتعلم",
        "تعلمت",
        "ما أتعلم"
      ],
      "correct": 1,
      "explanation": "أبغى + present."
    }
  ],
  "icon": "🎯"
}
```

## `gr_b59`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b59",
  "phase": 2,
  "concept": "Particle ل for \"to/for\"",
  "description": "لـ + noun.",
  "prompts": [
    {
      "stem": "to me",
      "choices": [
        "مني",
        "لي",
        "فيني",
        "علي"
      ],
      "correct": 1,
      "explanation": "لي = to me."
    }
  ],
  "icon": "➡️"
}
```

## `gr_b60`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b60",
  "phase": 2,
  "concept": "Particle من for \"from\"",
  "description": "من + noun.",
  "prompts": [
    {
      "stem": "from school",
      "choices": [
        "إلى المدرسة",
        "من المدرسة",
        "في المدرسة",
        "على المدرسة"
      ],
      "correct": 1,
      "explanation": "من = from."
    }
  ],
  "icon": "🏫"
}
```

## `gr_c08`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c08",
  "phase": 2,
  "concept": "Color agreement",
  "description": "Colors match gender.",
  "prompts": [
    {
      "stem": "a red car (f)",
      "choices": [
        "سيارة أحمر",
        "سيارة حمراء",
        "حمراء سيارة",
        "سيارة"
      ],
      "correct": 1,
      "explanation": "حمراء = feminine red."
    }
  ],
  "icon": "🚗"
}
```

## `gr_c09`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c09",
  "phase": 2,
  "concept": "Days as articles",
  "description": "Use الـ for day names.",
  "prompts": [
    {
      "stem": "on Friday",
      "choices": [
        "جمعة",
        "يوم الجمعة",
        "الجمعة",
        "في جمعة"
      ],
      "correct": 1,
      "explanation": "يوم + الـ + day."
    }
  ],
  "icon": "📅"
}
```

## `gr_c10`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c10",
  "phase": 2,
  "concept": "Quantifiers: many",
  "description": "كثير + noun.",
  "prompts": [
    {
      "stem": "many books",
      "choices": [
        "كثير كتاب",
        "كتب كثيرة",
        "كتاب كثير",
        "الكتب"
      ],
      "correct": 1,
      "explanation": "Adj agrees with noun."
    }
  ],
  "icon": "📚"
}
```

## `gr_c11`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c11",
  "phase": 2,
  "concept": "Question: what time",
  "description": "أي ساعة.",
  "prompts": [
    {
      "stem": "what time",
      "choices": [
        "متى",
        "أي ساعة",
        "كم ساعة",
        "أين"
      ],
      "correct": 1,
      "explanation": "أي ساعة = what hour."
    }
  ],
  "icon": "⏰"
}
```

## `gr_c12`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c12",
  "phase": 2,
  "concept": "Question: from where",
  "description": "من وين.",
  "prompts": [
    {
      "stem": "from where",
      "choices": [
        "وين",
        "من وين",
        "إلى وين",
        "الوين"
      ],
      "correct": 1,
      "explanation": "من + وين."
    }
  ],
  "icon": "📍"
}
```

## `gr_c13`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c13",
  "phase": 2,
  "concept": "Question: with whom",
  "description": "مع مين.",
  "prompts": [
    {
      "stem": "with whom",
      "choices": [
        "مين",
        "مع مين",
        "مين مع",
        "لمين"
      ],
      "correct": 1,
      "explanation": "مع + مين."
    }
  ],
  "icon": "🤝"
}
```
