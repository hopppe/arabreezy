# conversations · phase 4 · dialect saudi

- count: **20**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `c_ask_directions`

```json
{
  "dialect": "saudi",
  "conversation_id": "c_ask_directions",
  "phase": 4,
  "title": "Ask for directions",
  "description": "Find the nearest mosque from where you're standing.",
  "focal_word_ids": [
    "w_where",
    "w_right",
    "w_left",
    "w_straight",
    "w_near"
  ],
  "steps": [
    {
      "prompt": {
        "script": "تقدر تساعدني؟",
        "english": "Could you help me?"
      },
      "choices": [
        {
          "next": 1,
          "script": "وين تبغى تروح؟",
          "english": "Where do you want to go?",
          "feedback": "Direct."
        },
        {
          "next": 1,
          "script": "إيوة، تفضل.",
          "english": "Yes, go ahead.",
          "feedback": "Polite."
        }
      ]
    },
    {
      "prompt": {
        "script": "أبغى أوصل المسجد.",
        "english": "I want to get to the mosque."
      },
      "choices": [
        {
          "next": 2,
          "script": "دغري وبعد الإشارة يمين.",
          "english": "Straight, then right after the signal.",
          "feedback": "Clear directions."
        },
        {
          "next": 2,
          "script": "قريب، لف يسار.",
          "english": "Close, turn left.",
          "feedback": "Also fine."
        }
      ]
    },
    {
      "prompt": {
        "script": "شكراً جزيلاً.",
        "english": "Thanks a lot."
      },
      "choices": [
        {
          "next": -1,
          "script": "العفو.",
          "english": "You're welcome.",
          "feedback": "Standard reply."
        }
      ]
    }
  ],
  "completion_message": "Directions handled — that's the core travel skill."
}
```

## `c_at_restaurant`

```json
{
  "dialect": "saudi",
  "conversation_id": "c_at_restaurant",
  "phase": 4,
  "title": "Ordering at a Restaurant",
  "description": "Order a main, a drink, ask for the bill.",
  "focal_word_ids": [
    "w_food",
    "w_water",
    "w_thanks",
    "w_how_much"
  ],
  "steps": [
    {
      "prompt": {
        "script": "أهلاً، تفضلوا، وش تطلبون؟",
        "english": "Welcome, please, what would you like to order?"
      },
      "choices": [
        {
          "next": 1,
          "script": "كبسة لحم وماء، لو سمحت.",
          "english": "Lamb kabsa and water, please.",
          "feedback": "Classic order."
        },
        {
          "next": 1,
          "script": "شاورما دجاج وعصير.",
          "english": "Chicken shawarma and juice.",
          "feedback": "Solid pick."
        }
      ]
    },
    {
      "prompt": {
        "script": "تأمر شي ثاني؟",
        "english": "Anything else?"
      },
      "choices": [
        {
          "next": 2,
          "script": "لا، شكراً، كافي.",
          "english": "No, thanks, that's enough.",
          "feedback": "Polite close."
        }
      ]
    },
    {
      "prompt": {
        "script": "تفضل، الحساب.",
        "english": "Here you go, the check."
      },
      "choices": [
        {
          "next": -1,
          "script": "شكراً، كم المجموع؟",
          "english": "Thanks, what's the total?",
          "feedback": "Standard close."
        }
      ]
    }
  ],
  "completion_message": "Restaurant order complete."
}
```

## `co_a17`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a17",
  "phase": 4,
  "title": "Asking directions",
  "description": "Quick wayfinding.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "وين أقرب صيدلية؟",
        "english": "Nearest pharmacy?"
      },
      "choices": [
        {
          "next": -1,
          "script": "دغري وبعدين يمين",
          "english": "Straight then right",
          "feedback": "Clear."
        },
        {
          "next": -1,
          "script": "عند الإشارة يسار",
          "english": "Left at the light",
          "feedback": "Clear."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a18`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a18",
  "phase": 4,
  "title": "Renting a car",
  "description": "At the rental desk.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أبغى سيارة لمدة يومين",
        "english": "Car for two days"
      },
      "choices": [
        {
          "next": 1,
          "script": "اقتصادية أو فاخرة؟",
          "english": "Economy or luxury?",
          "feedback": "Ask spec."
        },
        {
          "next": 1,
          "script": "عندنا توفر",
          "english": "We have availability",
          "feedback": "OK."
        }
      ]
    },
    {
      "prompt": {
        "script": "اقتصادية",
        "english": "Economy"
      },
      "choices": [
        {
          "next": -1,
          "script": "تمام",
          "english": "OK",
          "feedback": "Done."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a19`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a19",
  "phase": 4,
  "title": "Booking a barber",
  "description": "Quick appointment.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أبغى أحلق",
        "english": "I want a haircut"
      },
      "choices": [
        {
          "next": -1,
          "script": "تفضل",
          "english": "Welcome",
          "feedback": "OK."
        },
        {
          "next": -1,
          "script": "خل خمس دقائق",
          "english": "Five minutes",
          "feedback": "Brief wait."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a20`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a20",
  "phase": 4,
  "title": "At the gas station",
  "description": "Fill up.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "عبيلي بمئة ريال",
        "english": "Fill 100 riyals"
      },
      "choices": [
        {
          "next": -1,
          "script": "حاضر",
          "english": "Sure",
          "feedback": "OK."
        },
        {
          "next": -1,
          "script": "بنزين 91 أم 95؟",
          "english": "91 or 95?",
          "feedback": "Spec."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b16`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b16",
  "phase": 4,
  "title": "Booking taxi via app",
  "description": "App ride.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "حجزت تاكسي",
        "english": "Booked a taxi"
      },
      "choices": [
        {
          "next": -1,
          "script": "كم بيوصل؟",
          "english": "How long?",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b17`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b17",
  "phase": 4,
  "title": "Asking taxi to slow down",
  "description": "Polite request.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "ممكن تخفف؟",
        "english": "Slow down please?"
      },
      "choices": [
        {
          "next": -1,
          "script": "تمام",
          "english": "OK",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b18`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b18",
  "phase": 4,
  "title": "Reporting an issue",
  "description": "Customer service.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "عندي مشكلة",
        "english": "I have an issue"
      },
      "choices": [
        {
          "next": -1,
          "script": "خبرني",
          "english": "Tell me",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b19`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b19",
  "phase": 4,
  "title": "Asking about menu",
  "description": "At a restaurant.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "وش يميز هذا الطبق؟",
        "english": "What's special about this?"
      },
      "choices": [
        {
          "next": -1,
          "script": "المكونات الطازجة",
          "english": "Fresh ingredients",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b20`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b20",
  "phase": 4,
  "title": "Asking if open",
  "description": "Hours check.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "مفتوح الحين؟",
        "english": "Open now?"
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

## `co_b54`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b54",
  "phase": 4,
  "title": "Returning borrowed item",
  "description": "Give back.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "رجعت لك القلم",
        "english": "Returned your pen"
      },
      "choices": [
        {
          "next": -1,
          "script": "شكراً",
          "english": "Thanks",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b63`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b63",
  "phase": 4,
  "title": "Booking a doctor",
  "description": "Phone.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أبغى موعد",
        "english": "Want appt"
      },
      "choices": [
        {
          "next": -1,
          "script": "بكرة الساعة عشر",
          "english": "Tomorrow 10",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c16`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c16",
  "phase": 4,
  "title": "Returning a call",
  "description": "Phone.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أرجع لك مكالمتك",
        "english": "Returning your call"
      },
      "choices": [
        {
          "next": -1,
          "script": "شكراً",
          "english": "Thanks",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c17`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c17",
  "phase": 4,
  "title": "Asking for the address",
  "description": "Navigation.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "وش العنوان؟",
        "english": "What's the address?"
      },
      "choices": [
        {
          "next": -1,
          "script": "شارع الملك فهد",
          "english": "King Fahd street",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c18`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c18",
  "phase": 4,
  "title": "Asking for delivery time",
  "description": "Order.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "بكم يوصل الطلب؟",
        "english": "How long delivery?"
      },
      "choices": [
        {
          "next": -1,
          "script": "نصف ساعة",
          "english": "Half an hour",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c19`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c19",
  "phase": 4,
  "title": "Asking what time we meet",
  "description": "Plan.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "الساعة كم نلتقي؟",
        "english": "What time we meet?"
      },
      "choices": [
        {
          "next": -1,
          "script": "سبعة",
          "english": "Seven",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c20`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c20",
  "phase": 4,
  "title": "Asking which exit",
  "description": "Highway.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أي مخرج؟",
        "english": "Which exit?"
      },
      "choices": [
        {
          "next": -1,
          "script": "مخرج خمسة",
          "english": "Exit 5",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c54`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c54",
  "phase": 4,
  "title": "Asking about a teacher",
  "description": "School.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "معلمك زين؟",
        "english": "Is your teacher good?"
      },
      "choices": [
        {
          "next": -1,
          "script": "ممتاز",
          "english": "Excellent",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c64`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c64",
  "phase": 4,
  "title": "Welcoming home",
  "description": "Arrival.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "حياك الله في بيتنا",
        "english": "Welcome to our home"
      },
      "choices": [
        {
          "next": -1,
          "script": "الله يحييك",
          "english": "God greet you",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```
