# conversations · phase 6 · dialect saudi

- count: **20**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `c_at_airport`

```json
{
  "dialect": "saudi",
  "conversation_id": "c_at_airport",
  "phase": 6,
  "title": "At Passport Control",
  "description": "Going through passport control on arrival.",
  "focal_word_ids": [
    "w_passport",
    "w_arrive",
    "w_ticket",
    "w_hotel"
  ],
  "steps": [
    {
      "prompt": {
        "script": "السلام عليكم، الجواز لو سمحت.",
        "english": "Peace upon you, your passport please."
      },
      "choices": [
        {
          "next": 1,
          "script": "تفضل.",
          "english": "Here you go.",
          "feedback": "Standard."
        },
        {
          "next": 1,
          "script": "وعليكم السلام، تفضل.",
          "english": "And peace upon you, here.",
          "feedback": "Polite."
        }
      ]
    },
    {
      "prompt": {
        "script": "وش غرض الزيارة؟",
        "english": "What's the purpose of the visit?"
      },
      "choices": [
        {
          "next": 2,
          "script": "سياحة.",
          "english": "Tourism.",
          "feedback": "OK."
        },
        {
          "next": 2,
          "script": "عمل، اجتماع مع شركة.",
          "english": "Work, a meeting with a company.",
          "feedback": "Clear."
        }
      ]
    },
    {
      "prompt": {
        "script": "وين بتنزل؟",
        "english": "Where will you stay?"
      },
      "choices": [
        {
          "next": -1,
          "script": "في فندق هلتون.",
          "english": "At the Hilton hotel.",
          "feedback": "Done."
        }
      ]
    }
  ],
  "completion_message": "You cleared passport control."
}
```

## `co_a26`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a26",
  "phase": 6,
  "title": "Booking flights",
  "description": "Travel agent chat.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أبغى تذكرة للقاهرة",
        "english": "Ticket to Cairo"
      },
      "choices": [
        {
          "next": 1,
          "script": "ذهاب وعودة؟",
          "english": "Round trip?",
          "feedback": "Spec."
        },
        {
          "next": 1,
          "script": "درجة سياحية؟",
          "english": "Economy?",
          "feedback": "Spec."
        }
      ]
    },
    {
      "prompt": {
        "script": "ذهاب فقط",
        "english": "One way"
      },
      "choices": [
        {
          "next": -1,
          "script": "خمسمئة ريال",
          "english": "500 riyals",
          "feedback": "Price."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a27`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a27",
  "phase": 6,
  "title": "Booking hotel",
  "description": "At a hotel reception.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "عندي حجز باسم خالد",
        "english": "Reservation under Khaled"
      },
      "choices": [
        {
          "next": 1,
          "script": "الجواز لو سمحت",
          "english": "Passport please",
          "feedback": "Standard."
        },
        {
          "next": 1,
          "script": "الغرفة جاهزة",
          "english": "Room is ready",
          "feedback": "OK."
        }
      ]
    },
    {
      "prompt": {
        "script": "تفضل",
        "english": "Here"
      },
      "choices": [
        {
          "next": -1,
          "script": "شكراً، الغرفة 305",
          "english": "Thanks, room 305",
          "feedback": "Done."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a28`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a28",
  "phase": 6,
  "title": "At passport control",
  "description": "Border officer.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "غرض الزيارة؟",
        "english": "Purpose of visit?"
      },
      "choices": [
        {
          "next": -1,
          "script": "سياحة",
          "english": "Tourism",
          "feedback": "OK."
        },
        {
          "next": -1,
          "script": "عمل",
          "english": "Work",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a29`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a29",
  "phase": 6,
  "title": "Taxi to airport",
  "description": "Getting a ride.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "المطار لو سمحت",
        "english": "Airport please"
      },
      "choices": [
        {
          "next": 1,
          "script": "كم الأجرة؟",
          "english": "How much fare?",
          "feedback": "Always ask."
        },
        {
          "next": 1,
          "script": "إيش الترمنال؟",
          "english": "Which terminal?",
          "feedback": "Spec."
        }
      ]
    },
    {
      "prompt": {
        "script": "خمسين",
        "english": "Fifty"
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

## `co_a30`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a30",
  "phase": 6,
  "title": "Checking weather",
  "description": "Quick forecast.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كيف الجو بكرة؟",
        "english": "How's tomorrow's weather?"
      },
      "choices": [
        {
          "next": -1,
          "script": "مشمس",
          "english": "Sunny",
          "feedback": "OK."
        },
        {
          "next": -1,
          "script": "غيوم",
          "english": "Cloudy",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b26`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b26",
  "phase": 6,
  "title": "Asking gate at airport",
  "description": "Gate info.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "رحلتي على أي بوابة؟",
        "english": "Which gate?"
      },
      "choices": [
        {
          "next": -1,
          "script": "بوابة 12",
          "english": "Gate 12",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b27`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b27",
  "phase": 6,
  "title": "Lost luggage",
  "description": "Report at the airport.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "شنطتي ما وصلت",
        "english": "My bag didn't arrive"
      },
      "choices": [
        {
          "next": -1,
          "script": "عبئ هذي الاستمارة",
          "english": "Fill this form",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b28`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b28",
  "phase": 6,
  "title": "Asking about wifi",
  "description": "Hotel wifi.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "الواي فاي وش الباسوورد؟",
        "english": "Wifi password?"
      },
      "choices": [
        {
          "next": -1,
          "script": "رقم الغرفة",
          "english": "Your room number",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b29`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b29",
  "phase": 6,
  "title": "Asking for early checkout",
  "description": "Early leave.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "ممكن أطلع بدري؟",
        "english": "Can I check out early?"
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

## `co_b30`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b30",
  "phase": 6,
  "title": "Asking about local food",
  "description": "Tourist question.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "وش الأكل المشهور هنا؟",
        "english": "Famous local food?"
      },
      "choices": [
        {
          "next": -1,
          "script": "الكبسة والجريش",
          "english": "Kabsa and jareesh",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b56`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b56",
  "phase": 6,
  "title": "Asking about hotel breakfast",
  "description": "Times.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "الفطور لين الساعة كم؟",
        "english": "Breakfast till when?"
      },
      "choices": [
        {
          "next": -1,
          "script": "عشر",
          "english": "Ten",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b65`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b65",
  "phase": 6,
  "title": "Asking about traffic",
  "description": "News.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "الزحمة شغالة؟",
        "english": "Is traffic heavy?"
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

## `co_c26`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c26",
  "phase": 6,
  "title": "Asking when flight leaves",
  "description": "Travel.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "الطيارة الساعة كم؟",
        "english": "Plane at what time?"
      },
      "choices": [
        {
          "next": -1,
          "script": "الساعة عشر",
          "english": "Ten",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c27`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c27",
  "phase": 6,
  "title": "Confirming reservation",
  "description": "Phone.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أبغى أأكد الحجز",
        "english": "Confirm reservation"
      },
      "choices": [
        {
          "next": -1,
          "script": "تم",
          "english": "Done",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c28`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c28",
  "phase": 6,
  "title": "Asking about train schedule",
  "description": "Schedule.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "متى يطلع القطار؟",
        "english": "When does train leave?"
      },
      "choices": [
        {
          "next": -1,
          "script": "كل ساعة",
          "english": "Every hour",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c29`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c29",
  "phase": 6,
  "title": "Asking about tour",
  "description": "Travel guide.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "فيه جولة سياحية؟",
        "english": "Is there a tour?"
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

## `co_c30`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c30",
  "phase": 6,
  "title": "Asking about hotel pool",
  "description": "Hotel.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "فيه مسبح؟",
        "english": "Is there a pool?"
      },
      "choices": [
        {
          "next": -1,
          "script": "إيوة في الطابق الأخير",
          "english": "Yes, top floor",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c56`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c56",
  "phase": 6,
  "title": "Discussing trip plan",
  "description": "Where's next.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "وين رحلتك القادمة؟",
        "english": "Where's your next trip?"
      },
      "choices": [
        {
          "next": -1,
          "script": "دبي",
          "english": "Dubai",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c66`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c66",
  "phase": 6,
  "title": "Reserving table",
  "description": "Restaurant.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أبغى أحجز طاولة",
        "english": "Want to book a table"
      },
      "choices": [
        {
          "next": -1,
          "script": "لكم شخص؟",
          "english": "For how many?",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```
