# conversations · phase 3 · dialect saudi

- count: **21**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `c_introduce_family`

```json
{
  "dialect": "saudi",
  "conversation_id": "c_introduce_family",
  "phase": 3,
  "title": "Introduce your family",
  "description": "Tell a friend about your parents and siblings.",
  "focal_word_ids": [
    "w_father",
    "w_mother",
    "w_brother",
    "w_sister"
  ],
  "steps": [
    {
      "prompt": {
        "script": "حدثني عن عائلتك.",
        "english": "Tell me about your family."
      },
      "choices": [
        {
          "next": 1,
          "script": "أبوي مهندس وأمي معلمة.",
          "english": "My dad's an engineer and my mom's a teacher.",
          "feedback": "Clear intro."
        },
        {
          "next": 1,
          "script": "عائلتي صغيرة، أربعة أشخاص.",
          "english": "My family is small, four people.",
          "feedback": "Fine."
        }
      ]
    },
    {
      "prompt": {
        "script": "عندك إخوة؟",
        "english": "Do you have siblings?"
      },
      "choices": [
        {
          "next": 2,
          "script": "أخ واحد وأخت.",
          "english": "One brother and a sister.",
          "feedback": "Specific."
        },
        {
          "next": 2,
          "script": "إيوة، اثنين.",
          "english": "Yes, two.",
          "feedback": "OK."
        }
      ]
    },
    {
      "prompt": {
        "script": "الله يحفظهم لك.",
        "english": "May God protect them for you."
      },
      "choices": [
        {
          "next": -1,
          "script": "وأهلك بعد، يعطيك العافية.",
          "english": "And yours too, may God give you wellness.",
          "feedback": "Warm close."
        }
      ]
    }
  ],
  "completion_message": "You introduced your family in Saudi Arabic."
}
```

## `c_phone_call`

```json
{
  "dialect": "saudi",
  "conversation_id": "c_phone_call",
  "phase": 3,
  "title": "A Quick Phone Call",
  "description": "Call a friend and arrange a meet-up.",
  "focal_word_ids": [
    "w_phone",
    "w_meeting",
    "w_today",
    "w_tomorrow"
  ],
  "steps": [
    {
      "prompt": {
        "script": "ألو، شخبارك؟",
        "english": "Hi, what's up?"
      },
      "choices": [
        {
          "next": 1,
          "script": "بخير، الحمد لله، وأنت؟",
          "english": "Good, praise God, you?",
          "feedback": "Polite."
        },
        {
          "next": 1,
          "script": "تمام، وش الخبر؟",
          "english": "Fine, what's up?",
          "feedback": "Casual."
        }
      ]
    },
    {
      "prompt": {
        "script": "تبغى نلتقي اليوم أو بكرة؟",
        "english": "Want to meet today or tomorrow?"
      },
      "choices": [
        {
          "next": 2,
          "script": "بكرة أحسن.",
          "english": "Tomorrow's better.",
          "feedback": "Clear."
        },
        {
          "next": 2,
          "script": "اليوم لو تقدر.",
          "english": "Today if you can.",
          "feedback": "Direct."
        }
      ]
    },
    {
      "prompt": {
        "script": "تمام، الساعة سبعة عند المقهى.",
        "english": "Okay, seven at the cafe."
      },
      "choices": [
        {
          "next": -1,
          "script": "اتفقنا.",
          "english": "Deal.",
          "feedback": "Done."
        }
      ]
    }
  ],
  "completion_message": "You scheduled a meeting in Arabic."
}
```

## `co_a11`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a11",
  "phase": 3,
  "title": "Inviting for tea",
  "description": "Hospitality opener.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تشرب شاي؟",
        "english": "Want tea?"
      },
      "choices": [
        {
          "next": -1,
          "script": "إيوة، شكراً",
          "english": "Yes, thanks",
          "feedback": "Accept."
        },
        {
          "next": -1,
          "script": "لا، شكراً، شربت",
          "english": "No thanks, I had some",
          "feedback": "Decline politely."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a12`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a12",
  "phase": 3,
  "title": "Where's the bathroom",
  "description": "Polite request.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "وين الحمام لو سمحت؟",
        "english": "Bathroom please?"
      },
      "choices": [
        {
          "next": -1,
          "script": "يمين",
          "english": "Right",
          "feedback": "Brief."
        },
        {
          "next": -1,
          "script": "يسار بعد الصالة",
          "english": "Left after the hall",
          "feedback": "Detailed."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a14`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a14",
  "phase": 3,
  "title": "Offering more",
  "description": "Hosts offer; learn to accept/decline.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تأخذ زيادة؟",
        "english": "Want more?"
      },
      "choices": [
        {
          "next": -1,
          "script": "إيوة، لو سمحت",
          "english": "Yes please",
          "feedback": "Accept."
        },
        {
          "next": -1,
          "script": "لا، شكراً، كافي",
          "english": "No thanks, enough",
          "feedback": "Decline."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a15`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a15",
  "phase": 3,
  "title": "Asking the name of food",
  "description": "Curious about a dish.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "وش اسم هذا الطبق؟",
        "english": "What's this dish?"
      },
      "choices": [
        {
          "next": -1,
          "script": "كبسة",
          "english": "Kabsa",
          "feedback": "Classic."
        },
        {
          "next": -1,
          "script": "معصوب",
          "english": "Ma'sob",
          "feedback": "Sweet dish."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a16`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a16",
  "phase": 3,
  "title": "Sorry, I'm late",
  "description": "Apologize for being late.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "آسف على التأخير",
        "english": "Sorry I'm late"
      },
      "choices": [
        {
          "next": -1,
          "script": "ولا يهمك",
          "english": "No worries",
          "feedback": "Casual."
        },
        {
          "next": -1,
          "script": "الحمد لله وصلت",
          "english": "Glad you arrived",
          "feedback": "Warm."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b11`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b11",
  "phase": 3,
  "title": "Quick chat at school",
  "description": "Hello classmate.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كيف الامتحان؟",
        "english": "How's the exam?"
      },
      "choices": [
        {
          "next": -1,
          "script": "صعب شوي",
          "english": "A bit hard",
          "feedback": "Honest."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b12`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b12",
  "phase": 3,
  "title": "Family check-in",
  "description": "Asking about family.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كيف الأهل؟",
        "english": "How is family?"
      },
      "choices": [
        {
          "next": -1,
          "script": "بصحة، الحمد لله",
          "english": "Healthy, praise God",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b13`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b13",
  "phase": 3,
  "title": "Picking food",
  "description": "Choose a dish.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تبغى كبسة أو شاورما؟",
        "english": "Kabsa or shawarma?"
      },
      "choices": [
        {
          "next": -1,
          "script": "كبسة",
          "english": "Kabsa",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b14`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b14",
  "phase": 3,
  "title": "Asking for water",
  "description": "Quick request.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "ماء لو سمحت",
        "english": "Water please"
      },
      "choices": [
        {
          "next": -1,
          "script": "حاضر",
          "english": "Right away",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b15`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b15",
  "phase": 3,
  "title": "Asking what time school starts",
  "description": "Routine.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "المدرسة الساعة كم؟",
        "english": "School at what time?"
      },
      "choices": [
        {
          "next": -1,
          "script": "الساعة سبعة",
          "english": "Seven",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b53`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b53",
  "phase": 3,
  "title": "Borrowing a book",
  "description": "From a friend.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تعيرني كتابك؟",
        "english": "Lend me the book?"
      },
      "choices": [
        {
          "next": -1,
          "script": "خذ",
          "english": "Take",
          "feedback": "Warm."
        },
        {
          "next": -1,
          "script": "الحين أقرأه",
          "english": "Reading it now",
          "feedback": "Honest."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b62`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b62",
  "phase": 3,
  "title": "Asking for help carrying",
  "description": "Help me.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تقدر تساعدني أحمل؟",
        "english": "Help me carry?"
      },
      "choices": [
        {
          "next": -1,
          "script": "أكيد",
          "english": "Sure",
          "feedback": "Helpful."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c11`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c11",
  "phase": 3,
  "title": "Inviting friend",
  "description": "Coffee invite.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "نشرب قهوة؟",
        "english": "Get coffee?"
      },
      "choices": [
        {
          "next": -1,
          "script": "يلا",
          "english": "Let's go",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c12`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c12",
  "phase": 3,
  "title": "Asking if they want to come",
  "description": "Group plan.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تجي معنا؟",
        "english": "Coming with us?"
      },
      "choices": [
        {
          "next": -1,
          "script": "إيوة",
          "english": "Yes",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c13`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c13",
  "phase": 3,
  "title": "Asking about siblings",
  "description": "Family talk.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كم أخ وأخت عندك؟",
        "english": "How many siblings?"
      },
      "choices": [
        {
          "next": -1,
          "script": "أخوين وأخت",
          "english": "Two brothers, one sister",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c14`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c14",
  "phase": 3,
  "title": "What's your favorite food",
  "description": "Casual.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "وش أكلك المفضل؟",
        "english": "Favorite food?"
      },
      "choices": [
        {
          "next": -1,
          "script": "كبسة",
          "english": "Kabsa",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c15`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c15",
  "phase": 3,
  "title": "Plans for the weekend",
  "description": "Casual.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "خططك للويكاند؟",
        "english": "Weekend plans?"
      },
      "choices": [
        {
          "next": -1,
          "script": "أرتاح",
          "english": "Rest",
          "feedback": "OK."
        },
        {
          "next": -1,
          "script": "رحلة",
          "english": "Trip",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c53`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c53",
  "phase": 3,
  "title": "Asking which subjects",
  "description": "School.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "وش مادتك المفضلة؟",
        "english": "Favorite subject?"
      },
      "choices": [
        {
          "next": -1,
          "script": "الرياضيات",
          "english": "Math",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c63`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c63",
  "phase": 3,
  "title": "Saying you're sorry",
  "description": "Apology.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "آسف",
        "english": "Sorry"
      },
      "choices": [
        {
          "next": -1,
          "script": "ولا يهمك",
          "english": "No worries",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```
