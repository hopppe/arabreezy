# conversations · phase 2 · dialect saudi

- count: **20**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `c_order_coffee`

```json
{
  "dialect": "saudi",
  "conversation_id": "c_order_coffee",
  "phase": 2,
  "title": "Order coffee",
  "description": "Ordering at a Saudi cafe.",
  "focal_word_ids": [
    "w_coffee",
    "w_dates",
    "w_thanks",
    "w_please_m"
  ],
  "steps": [
    {
      "prompt": {
        "script": "أهلاً، وش تبغى؟",
        "english": "Welcome, what would you like?"
      },
      "choices": [
        {
          "next": 1,
          "script": "قهوة عربية لو سمحت.",
          "english": "Arabic coffee, please.",
          "feedback": "Classic."
        },
        {
          "next": 1,
          "script": "قهوة وسط.",
          "english": "A medium coffee.",
          "feedback": "Fine too."
        }
      ]
    },
    {
      "prompt": {
        "script": "تبغى تمر معاها؟",
        "english": "Would you like dates with it?"
      },
      "choices": [
        {
          "next": -1,
          "script": "إيوة، شكراً.",
          "english": "Yes, thanks.",
          "feedback": "Always say yes to dates with Arabic coffee."
        },
        {
          "next": -1,
          "script": "لا، يكفي.",
          "english": "No, that's enough.",
          "feedback": "Fair, but dates are part of the ritual."
        }
      ]
    }
  ],
  "completion_message": "Nice — you just ordered coffee like a Saudi."
}
```

## `co_a06`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a06",
  "phase": 2,
  "title": "Yes or no",
  "description": "Asking a quick yes-no.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تروح معنا؟",
        "english": "Will you come with us?"
      },
      "choices": [
        {
          "next": -1,
          "script": "إيوة، أكيد",
          "english": "Yes, sure",
          "feedback": "Enthusiastic."
        },
        {
          "next": -1,
          "script": "لا، شكراً",
          "english": "No, thanks",
          "feedback": "Polite no."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a07`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a07",
  "phase": 2,
  "title": "Where are you from",
  "description": "Origin question.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "من وين؟",
        "english": "Where from?"
      },
      "choices": [
        {
          "next": -1,
          "script": "من أمريكا",
          "english": "From America",
          "feedback": "Good."
        },
        {
          "next": -1,
          "script": "من بريطانيا",
          "english": "From Britain",
          "feedback": "Good."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a08`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a08",
  "phase": 2,
  "title": "Ask the time",
  "description": "Quick clock check.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كم الساعة؟",
        "english": "What time?"
      },
      "choices": [
        {
          "next": -1,
          "script": "الساعة سبعة",
          "english": "Seven",
          "feedback": "Direct."
        },
        {
          "next": -1,
          "script": "تقريباً سبعة",
          "english": "About seven",
          "feedback": "Approximate."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a09`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a09",
  "phase": 2,
  "title": "Asking age",
  "description": "Polite if appropriate.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كم عمرك؟",
        "english": "How old?"
      },
      "choices": [
        {
          "next": -1,
          "script": "عمري ثلاثين سنة",
          "english": "30 years",
          "feedback": "Direct."
        },
        {
          "next": -1,
          "script": "شو دخلك؟",
          "english": "None of your business",
          "feedback": "Cheeky."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a10`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a10",
  "phase": 2,
  "title": "Days off",
  "description": "Discuss the weekend.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "يوم العطلة عندك؟",
        "english": "Your day off?"
      },
      "choices": [
        {
          "next": -1,
          "script": "الجمعة والسبت",
          "english": "Fri and Sat",
          "feedback": "Saudi standard."
        },
        {
          "next": -1,
          "script": "السبت بس",
          "english": "Saturday only",
          "feedback": "Single."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b06`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b06",
  "phase": 2,
  "title": "Compliment outfit",
  "description": "Saying it looks good.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "ثوبك حلو",
        "english": "Your thobe is nice"
      },
      "choices": [
        {
          "next": -1,
          "script": "تسلم",
          "english": "Thanks",
          "feedback": "Casual."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b07`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b07",
  "phase": 2,
  "title": "Asking favor",
  "description": "Borrow a pen.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "معك قلم؟",
        "english": "Have a pen?"
      },
      "choices": [
        {
          "next": -1,
          "script": "تفضل",
          "english": "Here",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b08`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b08",
  "phase": 2,
  "title": "Asking for charger",
  "description": "Battery low.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "عندك شاحن؟",
        "english": "Got a charger?"
      },
      "choices": [
        {
          "next": -1,
          "script": "إيوة، تفضل",
          "english": "Yes, here",
          "feedback": "Helpful."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b09`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b09",
  "phase": 2,
  "title": "Quick question",
  "description": "Politely interrupt.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "ممكن سؤال؟",
        "english": "Quick question?"
      },
      "choices": [
        {
          "next": -1,
          "script": "تفضل",
          "english": "Sure",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b10`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b10",
  "phase": 2,
  "title": "Asking name (formal)",
  "description": "First meeting formal.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "ممكن أعرف اسمك؟",
        "english": "May I know your name?"
      },
      "choices": [
        {
          "next": -1,
          "script": "اسمي خالد",
          "english": "Khaled",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b52`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b52",
  "phase": 2,
  "title": "Picking from menu",
  "description": "At the cafe.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "وش تختار؟",
        "english": "What do you pick?"
      },
      "choices": [
        {
          "next": -1,
          "script": "كرواسون",
          "english": "Croissant",
          "feedback": "OK."
        },
        {
          "next": -1,
          "script": "كيك",
          "english": "Cake",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b61`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b61",
  "phase": 2,
  "title": "Ordering at fast food",
  "description": "Quick order.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "وجبة برغر",
        "english": "Burger meal"
      },
      "choices": [
        {
          "next": -1,
          "script": "حجم وسط",
          "english": "Medium",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c06`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c06",
  "phase": 2,
  "title": "Asking which color",
  "description": "Choice.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أي لون تختار؟",
        "english": "Which color?"
      },
      "choices": [
        {
          "next": -1,
          "script": "أزرق",
          "english": "Blue",
          "feedback": "OK."
        },
        {
          "next": -1,
          "script": "أحمر",
          "english": "Red",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c07`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c07",
  "phase": 2,
  "title": "Asking for time off school",
  "description": "Need to leave.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "ممكن أطلع بدري؟",
        "english": "Can I leave early?"
      },
      "choices": [
        {
          "next": -1,
          "script": "تفضل",
          "english": "Sure",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c08`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c08",
  "phase": 2,
  "title": "Asking what page",
  "description": "In class.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "في أي صفحة؟",
        "english": "Which page?"
      },
      "choices": [
        {
          "next": -1,
          "script": "صفحة عشرة",
          "english": "Page ten",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c09`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c09",
  "phase": 2,
  "title": "Asking to repeat",
  "description": "Didn't hear.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "عذراً ممكن تعيد؟",
        "english": "Sorry, repeat?"
      },
      "choices": [
        {
          "next": -1,
          "script": "أكيد",
          "english": "Sure",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c10`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c10",
  "phase": 2,
  "title": "Sharing food",
  "description": "Offer.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تبغى؟",
        "english": "Want some?"
      },
      "choices": [
        {
          "next": -1,
          "script": "إيوة",
          "english": "Yes",
          "feedback": "OK."
        },
        {
          "next": -1,
          "script": "لا",
          "english": "No",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c52`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c52",
  "phase": 2,
  "title": "Asking what year of school",
  "description": "School year.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "في أي صف؟",
        "english": "Which grade?"
      },
      "choices": [
        {
          "next": -1,
          "script": "السادس",
          "english": "Sixth",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c62`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c62",
  "phase": 2,
  "title": "Polite please",
  "description": "Asking nicely.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "رجاءً",
        "english": "Please"
      },
      "choices": [
        {
          "next": -1,
          "script": "تفضل",
          "english": "Here",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```
