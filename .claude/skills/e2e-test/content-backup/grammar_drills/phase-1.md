# grammar_drills · phase 1 · dialect saudi

- count: **20**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `g_greeting_response`

```json
{
  "dialect": "saudi",
  "drill_id": "g_greeting_response",
  "phase": 1,
  "concept": "Greeting responses",
  "description": "In Saudi Arabic, greetings have fixed responses. هلا responds to هلا وغلا. زين responds to كيف حالك.",
  "prompts": [
    {
      "stem": "Someone says كيف حالك — what do you reply?",
      "choices": [
        "زين، شكراً",
        "أنا ذهبت",
        "بكرة أروح",
        "اسمي علي"
      ],
      "correct": 0,
      "explanation": "زين، شكراً is the standard positive reply to كيف حالك in Saudi."
    },
    {
      "stem": "Someone says هلا — what is the natural reply?",
      "choices": [
        "لا، شكراً",
        "هلا وغلا",
        "أنا مشغول",
        "وين السوق؟"
      ],
      "correct": 1,
      "explanation": "هلا وغلا is the classic Saudi response to هلا — it echoes and amplifies the greeting."
    },
    {
      "stem": "Which phrase means goodbye in Saudi?",
      "choices": [
        "هلا",
        "مع السلامة",
        "شكراً",
        "إن شاء الله"
      ],
      "correct": 1,
      "explanation": "مع السلامة = go in safety — the everyday Saudi farewell."
    }
  ],
  "icon": "👋"
}
```

## `g_numbers_1_10`

```json
{
  "dialect": "saudi",
  "drill_id": "g_numbers_1_10",
  "phase": 1,
  "concept": "Numbers 1-10",
  "description": "واحد، اثنين، ثلاثة، أربعة، خمسة، ستة، سبعة، ثمانية، تسعة، عشرة.",
  "prompts": [
    {
      "stem": "three",
      "choices": [
        "اثنين",
        "ثلاثة",
        "أربعة",
        "خمسة"
      ],
      "correct": 1,
      "explanation": "ثلاثة = 3."
    },
    {
      "stem": "seven",
      "choices": [
        "خمسة",
        "ستة",
        "سبعة",
        "ثمانية"
      ],
      "correct": 2,
      "explanation": "سبعة = 7."
    }
  ],
  "icon": "🔢"
}
```

## `g_pronouns_basic`

```json
{
  "dialect": "saudi",
  "drill_id": "g_pronouns_basic",
  "phase": 1,
  "concept": "Pronouns: I, you, he, she",
  "description": "Saudi Arabic uses أنا (ana), أنت (inta — to a man), أنتي (inti — to a woman), هو (huwa), هي (hiya).",
  "prompts": [
    {
      "stem": "I am Saudi.",
      "choices": [
        "أنا سعودي",
        "هو سعودي",
        "هي سعودية",
        "أنت سعودي"
      ],
      "correct": 0,
      "explanation": "\"I am\" = أنا."
    },
    {
      "stem": "She is a teacher.",
      "choices": [
        "هو معلم",
        "هي معلمة",
        "أنا معلم",
        "أنت معلمة"
      ],
      "correct": 1,
      "explanation": "\"She\" = هي. Feminine form of teacher = معلمة."
    }
  ],
  "icon": "👤"
}
```

## `g_questions_basic`

```json
{
  "dialect": "saudi",
  "drill_id": "g_questions_basic",
  "phase": 1,
  "concept": "Asking yes/no questions",
  "description": "In Saudi Arabic, you usually just raise the intonation, no extra word needed. تعرف العربي؟ = Do you know Arabic?",
  "prompts": [
    {
      "stem": "Do you have a car?",
      "choices": [
        "سيارة عندك؟",
        "عندك سيارة؟",
        "سيارة",
        "عندي سيارة"
      ],
      "correct": 1,
      "explanation": "عندك سيارة? with rising intonation."
    },
    {
      "stem": "Are you ready?",
      "choices": [
        "جاهز؟",
        "أنا جاهز",
        "ليس جاهز",
        "جاهز نعم"
      ],
      "correct": 0,
      "explanation": "Single word + rising intonation = question."
    }
  ],
  "icon": "❓"
}
```

## `g_to_be_omission`

```json
{
  "dialect": "saudi",
  "drill_id": "g_to_be_omission",
  "phase": 1,
  "concept": "No \"to be\" in the present",
  "description": "Arabic skips the verb \"to be\" in present-tense statements. \"I am tired\" = \"أنا تعبان\" — literally \"I tired\".",
  "prompts": [
    {
      "stem": "I am happy.",
      "choices": [
        "أنا أكون سعيد",
        "أنا سعيد",
        "أنا كنت سعيد",
        "أنا يكون سعيد"
      ],
      "correct": 1,
      "explanation": "Drop the verb — just say أنا سعيد."
    },
    {
      "stem": "He is tall.",
      "choices": [
        "هو يكون طويل",
        "هو طويل",
        "هو كان طويل",
        "هو سيكون طويل"
      ],
      "correct": 1,
      "explanation": "Present-tense is bare: هو طويل."
    }
  ],
  "icon": "🚫"
}
```

## `gr_a01`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a01",
  "phase": 1,
  "concept": "Saying \"this is\"",
  "description": "هذا for masculine, هذي for feminine.",
  "prompts": [
    {
      "stem": "This is a book",
      "choices": [
        "هذا كتاب",
        "هذي كتاب",
        "هذا بنت",
        "ذاك"
      ],
      "correct": 0,
      "explanation": "كتاب is masculine."
    }
  ],
  "icon": "👉"
}
```

## `gr_a02`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a02",
  "phase": 1,
  "concept": "Possessive my",
  "description": "-ي suffix means my.",
  "prompts": [
    {
      "stem": "my pen",
      "choices": [
        "قلمك",
        "قلمي",
        "قلمه",
        "قلمها"
      ],
      "correct": 1,
      "explanation": "-ي is my."
    }
  ],
  "icon": "✒️"
}
```

## `gr_a03`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a03",
  "phase": 1,
  "concept": "Possessive your",
  "description": "-ك for masculine, -كي for feminine.",
  "prompts": [
    {
      "stem": "your house (m)",
      "choices": [
        "بيتي",
        "بيتك",
        "بيتها",
        "بيته"
      ],
      "correct": 1,
      "explanation": "-ك for masculine."
    }
  ],
  "icon": "🏠"
}
```

## `gr_a04`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a04",
  "phase": 1,
  "concept": "Possessive his",
  "description": "-ه means his.",
  "prompts": [
    {
      "stem": "his book",
      "choices": [
        "كتابها",
        "كتابك",
        "كتابه",
        "كتابي"
      ],
      "correct": 2,
      "explanation": "-ه = his."
    }
  ],
  "icon": "📘"
}
```

## `gr_a05`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a05",
  "phase": 1,
  "concept": "Possessive her",
  "description": "-ها means her.",
  "prompts": [
    {
      "stem": "her car",
      "choices": [
        "سيارته",
        "سيارتها",
        "سيارتك",
        "سيارتي"
      ],
      "correct": 1,
      "explanation": "-ها = her."
    }
  ],
  "icon": "🚗"
}
```

## `gr_a06`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a06",
  "phase": 1,
  "concept": "Yes/no questions",
  "description": "Just raise intonation.",
  "prompts": [
    {
      "stem": "Do you have a car?",
      "choices": [
        "عندي سيارة",
        "عندك سيارة؟",
        "سيارة",
        "لا سيارة"
      ],
      "correct": 1,
      "explanation": "Add question tone."
    }
  ],
  "icon": "❓"
}
```

## `gr_a13`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a13",
  "phase": 1,
  "concept": "Subject pronouns drop",
  "description": "Verbs often imply subject.",
  "prompts": [
    {
      "stem": "I write",
      "choices": [
        "أنا أكتب",
        "أكتب",
        "يكتب",
        "تكتب"
      ],
      "correct": 1,
      "explanation": "Pronoun optional."
    }
  ],
  "icon": "✍️"
}
```

## `gr_a14`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a14",
  "phase": 1,
  "concept": "There is: فيه",
  "description": "فيه = there is.",
  "prompts": [
    {
      "stem": "There is food",
      "choices": [
        "فيه أكل",
        "ما أكل",
        "أكل",
        "لا فيه"
      ],
      "correct": 0,
      "explanation": "فيه = there is."
    }
  ],
  "icon": "🍽️"
}
```

## `gr_c01`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c01",
  "phase": 1,
  "concept": "Greetings",
  "description": "مرحبا is universal.",
  "prompts": [
    {
      "stem": "hello",
      "choices": [
        "وداعاً",
        "مرحبا",
        "شكراً",
        "لا"
      ],
      "correct": 1,
      "explanation": "مرحبا = hello."
    }
  ],
  "icon": "👋"
}
```

## `gr_c02`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c02",
  "phase": 1,
  "concept": "Yes/No basics",
  "description": "نعم / لا.",
  "prompts": [
    {
      "stem": "yes",
      "choices": [
        "لا",
        "نعم",
        "ما",
        "فقط"
      ],
      "correct": 1,
      "explanation": "نعم = yes."
    }
  ],
  "icon": "✅"
}
```

## `gr_c03`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c03",
  "phase": 1,
  "concept": "I am ___",
  "description": "أنا + noun.",
  "prompts": [
    {
      "stem": "I am Mark",
      "choices": [
        "أنا مارك",
        "مارك أنا",
        "هو مارك",
        "مارك هو"
      ],
      "correct": 0,
      "explanation": "أنا + name."
    }
  ],
  "icon": "👤"
}
```

## `gr_c04`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c04",
  "phase": 1,
  "concept": "He is ___",
  "description": "هو + noun.",
  "prompts": [
    {
      "stem": "He is happy",
      "choices": [
        "هي سعيدة",
        "هو سعيد",
        "أنا سعيد",
        "نحن سعداء"
      ],
      "correct": 1,
      "explanation": "هو + adjective."
    }
  ],
  "icon": "😄"
}
```

## `gr_c05`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c05",
  "phase": 1,
  "concept": "She is ___",
  "description": "هي + feminine adj.",
  "prompts": [
    {
      "stem": "She is happy",
      "choices": [
        "هي سعيدة",
        "هي سعيد",
        "هو سعيدة",
        "سعيد"
      ],
      "correct": 0,
      "explanation": "Feminine adj agrees."
    }
  ],
  "icon": "😊"
}
```

## `gr_c06`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c06",
  "phase": 1,
  "concept": "We are ___",
  "description": "نحن + plural.",
  "prompts": [
    {
      "stem": "We are students",
      "choices": [
        "نحن طلاب",
        "نحن طالب",
        "هم طلاب",
        "أنا طالب"
      ],
      "correct": 0,
      "explanation": "نحن + plural."
    }
  ],
  "icon": "🎓"
}
```

## `gr_c07`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c07",
  "phase": 1,
  "concept": "Numbers as adjective",
  "description": "Numbers after noun for 1-2.",
  "prompts": [
    {
      "stem": "one car",
      "choices": [
        "سيارة واحدة",
        "واحد سيارة",
        "سيارة",
        "سيارات"
      ],
      "correct": 0,
      "explanation": "Noun + واحد."
    }
  ],
  "icon": "🚗"
}
```
