# grammar_drills · phase 3 · dialect saudi

- count: **20**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `g_past_verb`

```json
{
  "dialect": "saudi",
  "drill_id": "g_past_verb",
  "phase": 3,
  "concept": "Past-tense verbs",
  "description": "Past tense adds suffixes. كتب (he wrote), كتبت (I wrote / you wrote), كتبنا (we wrote).",
  "prompts": [
    {
      "stem": "I wrote",
      "choices": [
        "أكتب",
        "كتبت",
        "يكتب",
        "كتبوا"
      ],
      "correct": 1,
      "explanation": "كتبت with -t suffix = I wrote."
    },
    {
      "stem": "we ate",
      "choices": [
        "نأكل",
        "أكلت",
        "أكلنا",
        "أكلوا"
      ],
      "correct": 2,
      "explanation": "Suffix -نا = we."
    }
  ],
  "icon": "⏪"
}
```

## `g_present_verb`

```json
{
  "dialect": "saudi",
  "drill_id": "g_present_verb",
  "phase": 3,
  "concept": "Present-tense verbs: أنا / هو / هي",
  "description": "Roots conjugate by prefix/suffix. كتب (he wrote) → أكتب (I write), يكتب (he writes), تكتب (she writes).",
  "prompts": [
    {
      "stem": "I write",
      "choices": [
        "كتبت",
        "أكتب",
        "يكتب",
        "تكتب"
      ],
      "correct": 1,
      "explanation": "Prefix أ- = I."
    },
    {
      "stem": "she eats",
      "choices": [
        "آكل",
        "يأكل",
        "تأكل",
        "أكلت"
      ],
      "correct": 2,
      "explanation": "Prefix تـ- + feminine = she eats."
    }
  ],
  "icon": "✏️"
}
```

## `gr_a15`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a15",
  "phase": 3,
  "concept": "There isn't: ما فيه",
  "description": "Negate فيه with ما.",
  "prompts": [
    {
      "stem": "There's no time",
      "choices": [
        "ما فيه وقت",
        "فيه وقت",
        "لا وقت",
        "الوقت"
      ],
      "correct": 0,
      "explanation": "ما فيه = there isn't."
    }
  ],
  "icon": "⛔"
}
```

## `gr_a16`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a16",
  "phase": 3,
  "concept": "Direct object: object pronouns",
  "description": "Attach suffix to verb.",
  "prompts": [
    {
      "stem": "I love you (m)",
      "choices": [
        "أحبه",
        "أحبك",
        "أحبها",
        "أحبني"
      ],
      "correct": 1,
      "explanation": "-ك = you."
    }
  ],
  "icon": "💗"
}
```

## `gr_a17`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a17",
  "phase": 3,
  "concept": "Plural verb",
  "description": "Verb agrees with plural subject.",
  "prompts": [
    {
      "stem": "The boys play",
      "choices": [
        "الأولاد يلعب",
        "الأولاد يلعبون",
        "الأولاد لعب",
        "الأولاد يلعبوا"
      ],
      "correct": 1,
      "explanation": "-ون plural masc."
    }
  ],
  "icon": "⚽"
}
```

## `gr_a18`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a18",
  "phase": 3,
  "concept": "Feminine plural verb",
  "description": "-ن suffix.",
  "prompts": [
    {
      "stem": "The girls study",
      "choices": [
        "البنات تدرس",
        "البنات يدرسون",
        "البنات يدرسن",
        "البنات درست"
      ],
      "correct": 2,
      "explanation": "-ن for feminine plural."
    }
  ],
  "icon": "📚"
}
```

## `gr_a19`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a19",
  "phase": 3,
  "concept": "Past + I",
  "description": "-ت suffix = I (past).",
  "prompts": [
    {
      "stem": "I went",
      "choices": [
        "راح",
        "رحت",
        "يروح",
        "أروح"
      ],
      "correct": 1,
      "explanation": "-ت + past = I did."
    }
  ],
  "icon": "⏪"
}
```

## `gr_a20`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a20",
  "phase": 3,
  "concept": "Past + we",
  "description": "-نا suffix = we (past).",
  "prompts": [
    {
      "stem": "We ate",
      "choices": [
        "أكلنا",
        "أكلت",
        "أكلوا",
        "يأكلون"
      ],
      "correct": 0,
      "explanation": "-نا = we did."
    }
  ],
  "icon": "🍴"
}
```

## `gr_a21`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a21",
  "phase": 3,
  "concept": "Imperative singular",
  "description": "Drop ت- from present.",
  "prompts": [
    {
      "stem": "Read! (m)",
      "choices": [
        "تقرأ",
        "اقرأ",
        "قارئ",
        "قراءة"
      ],
      "correct": 1,
      "explanation": "اقرأ = read!"
    }
  ],
  "icon": "📖"
}
```

## `gr_a22`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_a22",
  "phase": 3,
  "concept": "Imperative feminine",
  "description": "Add -ي suffix to imperative.",
  "prompts": [
    {
      "stem": "Listen! (f)",
      "choices": [
        "اسمع",
        "اسمعي",
        "سامعة",
        "سمعت"
      ],
      "correct": 1,
      "explanation": "-ي for feminine imperative."
    }
  ],
  "icon": "👂"
}
```

## `gr_b25`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b25",
  "phase": 3,
  "concept": "Pseudo-verbs",
  "description": "يجب / لازم / يمكن.",
  "prompts": [
    {
      "stem": "You must go",
      "choices": [
        "تروح",
        "لازم تروح",
        "ممكن تروح",
        "ما تروح"
      ],
      "correct": 1,
      "explanation": "لازم + present."
    }
  ],
  "icon": "❗"
}
```

## `gr_b27`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b27",
  "phase": 3,
  "concept": "Modal: able",
  "description": "يقدر + present.",
  "prompts": [
    {
      "stem": "I can swim",
      "choices": [
        "أسبح",
        "أقدر أسبح",
        "ما أسبح",
        "سبحت"
      ],
      "correct": 1,
      "explanation": "يقدر + present."
    }
  ],
  "icon": "🏊"
}
```

## `gr_b34`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_b34",
  "phase": 3,
  "concept": "Sentence structure: SVO",
  "description": "Sometimes SVO instead of VSO.",
  "prompts": [
    {
      "stem": "He drinks coffee",
      "choices": [
        "يشرب هو قهوة",
        "هو يشرب قهوة",
        "قهوة هو",
        "يشرب القهوة"
      ],
      "correct": 1,
      "explanation": "SVO is common in spoken."
    }
  ],
  "icon": "☕"
}
```

## `gr_c14`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c14",
  "phase": 3,
  "concept": "Imperative: don't",
  "description": "لا + present.",
  "prompts": [
    {
      "stem": "Don't go!",
      "choices": [
        "تروح",
        "لا تروح",
        "ما تروح",
        "رحت"
      ],
      "correct": 1,
      "explanation": "لا + present = don't."
    }
  ],
  "icon": "🚫"
}
```

## `gr_c15`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c15",
  "phase": 3,
  "concept": "Imperative: please",
  "description": "بـ + please form.",
  "prompts": [
    {
      "stem": "Please come",
      "choices": [
        "تعال",
        "تعال لو سمحت",
        "ما تعال",
        "جاء"
      ],
      "correct": 1,
      "explanation": "+ لو سمحت."
    }
  ],
  "icon": "🙏"
}
```

## `gr_c16`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c16",
  "phase": 3,
  "concept": "Asking permission: can I",
  "description": "ممكن + verb.",
  "prompts": [
    {
      "stem": "Can I enter?",
      "choices": [
        "دخلت",
        "ممكن أدخل؟",
        "لا أدخل",
        "أدخل"
      ],
      "correct": 1,
      "explanation": "ممكن + present."
    }
  ],
  "icon": "🚪"
}
```

## `gr_c17`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c17",
  "phase": 3,
  "concept": "Asking permission: may I",
  "description": "أقدر + verb.",
  "prompts": [
    {
      "stem": "May I sit?",
      "choices": [
        "قعدت",
        "أقدر أقعد؟",
        "قعد",
        "ما أقعد"
      ],
      "correct": 1,
      "explanation": "أقدر + present."
    }
  ],
  "icon": "💺"
}
```

## `gr_c18`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c18",
  "phase": 3,
  "concept": "Reported speech: said",
  "description": "قال + إن + clause.",
  "prompts": [
    {
      "stem": "He said he's tired",
      "choices": [
        "قال تعبان",
        "قال إنه تعبان",
        "يقول تعبان",
        "تعبان قال"
      ],
      "correct": 1,
      "explanation": "قال + إن + clause."
    }
  ],
  "icon": "🗣️"
}
```

## `gr_c19`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c19",
  "phase": 3,
  "concept": "Number gender swap",
  "description": "3-10 reverse gender.",
  "prompts": [
    {
      "stem": "three girls",
      "choices": [
        "ثلاثة بنات",
        "ثلاث بنات",
        "ثلاث بنت",
        "ثلاثة بنت"
      ],
      "correct": 1,
      "explanation": "3-10 + reversed gender."
    }
  ],
  "icon": "👧"
}
```

## `gr_c20`

```json
{
  "dialect": "saudi",
  "drill_id": "gr_c20",
  "phase": 3,
  "concept": "Counting masculine",
  "description": "3-10 take ة for masc noun.",
  "prompts": [
    {
      "stem": "three boys",
      "choices": [
        "ثلاث أولاد",
        "ثلاثة أولاد",
        "ثلاث ولد",
        "ثلاثة ولد"
      ],
      "correct": 1,
      "explanation": "ثلاثة + plural masc."
    }
  ],
  "icon": "👦"
}
```
