# conversations · phase 1 · dialect saudi

- count: **20**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `c_intro_yourself`

```json
{
  "dialect": "saudi",
  "conversation_id": "c_intro_yourself",
  "phase": 1,
  "title": "Introduce yourself",
  "description": "Walk into a room and meet someone new.",
  "focal_word_ids": [
    "w_hello",
    "w_name",
    "w_thanks"
  ],
  "steps": [
    {
      "prompt": {
        "script": "السلام عليكم، أنا سعد.",
        "english": "Peace upon you, I'm Saad."
      },
      "choices": [
        {
          "next": 1,
          "script": "وعليكم السلام، أنا فهد.",
          "english": "And peace upon you, I'm Fahd.",
          "feedback": "Good — formal mirror reply."
        },
        {
          "next": 1,
          "script": "مرحبا",
          "english": "Hi",
          "feedback": "Casual works too, but the mirror reply is warmer."
        }
      ]
    },
    {
      "prompt": {
        "script": "تشرفت فيك.",
        "english": "Pleased to meet you."
      },
      "choices": [
        {
          "next": -1,
          "script": "وأنا كذلك.",
          "english": "Me too.",
          "feedback": "Perfect."
        },
        {
          "next": -1,
          "script": "شكراً.",
          "english": "Thanks.",
          "feedback": "OK, but the mirrored response sounds warmer."
        }
      ]
    }
  ],
  "completion_message": "Done — that's a complete first encounter in Saudi Arabic."
}
```

## `co_a01`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a01",
  "phase": 1,
  "title": "Greet a stranger",
  "description": "Hi and respond.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "مرحبا",
        "english": "Hello"
      },
      "choices": [
        {
          "next": -1,
          "script": "مرحبا",
          "english": "Hi",
          "feedback": "Casual fine."
        },
        {
          "next": -1,
          "script": "السلام عليكم",
          "english": "Peace upon you",
          "feedback": "More formal."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a02`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a02",
  "phase": 1,
  "title": "Say your name",
  "description": "Quick name exchange.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "وش اسمك؟",
        "english": "What's your name?"
      },
      "choices": [
        {
          "next": -1,
          "script": "اسمي مارك",
          "english": "My name is Mark",
          "feedback": "Good."
        },
        {
          "next": -1,
          "script": "مارك",
          "english": "Mark",
          "feedback": "Shorter."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a03`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a03",
  "phase": 1,
  "title": "Ask how someone is",
  "description": "Greeting + wellbeing.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كيف حالك؟",
        "english": "How are you?"
      },
      "choices": [
        {
          "next": -1,
          "script": "الحمد لله بخير",
          "english": "Praise God, fine",
          "feedback": "Standard."
        },
        {
          "next": -1,
          "script": "تمام",
          "english": "Fine",
          "feedback": "Casual."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a04`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a04",
  "phase": 1,
  "title": "Say goodbye",
  "description": "End a chat politely.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "مع السلامة",
        "english": "Goodbye"
      },
      "choices": [
        {
          "next": -1,
          "script": "في أمان الله",
          "english": "In God's safety",
          "feedback": "Warm reply."
        },
        {
          "next": -1,
          "script": "مع السلامة",
          "english": "Bye",
          "feedback": "Simple."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a05`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a05",
  "phase": 1,
  "title": "Thank and reply",
  "description": "Quick thanks exchange.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "شكراً",
        "english": "Thanks"
      },
      "choices": [
        {
          "next": -1,
          "script": "العفو",
          "english": "You're welcome",
          "feedback": "Standard."
        },
        {
          "next": -1,
          "script": "ولا يهمك",
          "english": "No problem",
          "feedback": "Saudi casual."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a13`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a13",
  "phase": 1,
  "title": "Compliment the food",
  "description": "Polite manners.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "الأكل لذيذ!",
        "english": "Food is delicious!"
      },
      "choices": [
        {
          "next": -1,
          "script": "يسلمو",
          "english": "Bless you",
          "feedback": "Casual."
        },
        {
          "next": -1,
          "script": "تعيشي",
          "english": "May you live",
          "feedback": "Warm."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b01`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b01",
  "phase": 1,
  "title": "Wave hello",
  "description": "Just a wave.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "هلا",
        "english": "Hi"
      },
      "choices": [
        {
          "next": -1,
          "script": "هلا والله",
          "english": "Hi back",
          "feedback": "Saudi."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b02`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b02",
  "phase": 1,
  "title": "Morning greet",
  "description": "Good morning routine.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "صباح الخير",
        "english": "Good morning"
      },
      "choices": [
        {
          "next": -1,
          "script": "صباح النور",
          "english": "Morning of light",
          "feedback": "Standard reply."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b03`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b03",
  "phase": 1,
  "title": "Evening greet",
  "description": "Good evening.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "مساء الخير",
        "english": "Good evening"
      },
      "choices": [
        {
          "next": -1,
          "script": "مساء النور",
          "english": "Evening of light",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b04`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b04",
  "phase": 1,
  "title": "Sneeze response",
  "description": "Bless someone.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "الحمد لله (after sneeze)",
        "english": "Thanks God"
      },
      "choices": [
        {
          "next": -1,
          "script": "يرحمك الله",
          "english": "God's mercy on you",
          "feedback": "Standard."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b05`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b05",
  "phase": 1,
  "title": "Wishing health",
  "description": "Get-well wishes.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "الله يشفيك",
        "english": "May God heal you"
      },
      "choices": [
        {
          "next": -1,
          "script": "الله يعافيك",
          "english": "God grant you wellness",
          "feedback": "Standard."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b51`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b51",
  "phase": 1,
  "title": "How was your day",
  "description": "Light catch-up.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كيف يومك؟",
        "english": "How was your day?"
      },
      "choices": [
        {
          "next": -1,
          "script": "تمام",
          "english": "Fine",
          "feedback": "OK."
        },
        {
          "next": -1,
          "script": "طويل",
          "english": "Long",
          "feedback": "Honest."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c01`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c01",
  "phase": 1,
  "title": "Wave bye",
  "description": "Casual end.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "باي",
        "english": "Bye"
      },
      "choices": [
        {
          "next": -1,
          "script": "باي",
          "english": "Bye",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c02`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c02",
  "phase": 1,
  "title": "Saying nice to meet you",
  "description": "Polite intro.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تشرفت",
        "english": "Pleased"
      },
      "choices": [
        {
          "next": -1,
          "script": "وأنا كذلك",
          "english": "Likewise",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c03`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c03",
  "phase": 1,
  "title": "Asking if you're free",
  "description": "Plan check.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "فاضي بكرة؟",
        "english": "Free tomorrow?"
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
          "script": "عندي شغل",
          "english": "Have work",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c04`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c04",
  "phase": 1,
  "title": "Quick check",
  "description": "How's today.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كل شي تمام؟",
        "english": "All good?"
      },
      "choices": [
        {
          "next": -1,
          "script": "تمام",
          "english": "All good",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c05`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c05",
  "phase": 1,
  "title": "You doing okay",
  "description": "Casual.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تمام؟",
        "english": "OK?"
      },
      "choices": [
        {
          "next": -1,
          "script": "الحمد لله",
          "english": "Praise God",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c51`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c51",
  "phase": 1,
  "title": "Asking name in class",
  "description": "First day.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "اسمك؟",
        "english": "Your name?"
      },
      "choices": [
        {
          "next": -1,
          "script": "اسمي ليلى",
          "english": "My name is Layla",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c61`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c61",
  "phase": 1,
  "title": "Saying excuse me",
  "description": "Polite stop.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "عفواً",
        "english": "Excuse me"
      },
      "choices": [
        {
          "next": -1,
          "script": "تفضل",
          "english": "Go ahead",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```
