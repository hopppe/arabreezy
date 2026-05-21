# conversations · phase 5 · dialect saudi

- count: **20**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `c_at_pharmacy`

```json
{
  "dialect": "saudi",
  "conversation_id": "c_at_pharmacy",
  "phase": 5,
  "title": "At the Pharmacy",
  "description": "Buy medicine for a headache.",
  "focal_word_ids": [
    "w_how_much",
    "w_riyal",
    "w_please_m",
    "w_thanks"
  ],
  "steps": [
    {
      "prompt": {
        "script": "كيف أقدر أساعدك؟",
        "english": "How can I help you?"
      },
      "choices": [
        {
          "next": 1,
          "script": "عندي صداع، أبغى حبوب.",
          "english": "I have a headache, I want pills.",
          "feedback": "Direct and clear."
        },
        {
          "next": 1,
          "script": "أبغى دواء للصداع.",
          "english": "I want medicine for a headache.",
          "feedback": "Also fine."
        }
      ]
    },
    {
      "prompt": {
        "script": "هذه أفضل حبوب، بخمسة عشر ريال.",
        "english": "These are the best pills, fifteen riyals."
      },
      "choices": [
        {
          "next": -1,
          "script": "تمام، آخذها.",
          "english": "Okay, I'll take them.",
          "feedback": "Done."
        },
        {
          "next": -1,
          "script": "عندك أرخص؟",
          "english": "Do you have cheaper?",
          "feedback": "Smart — there's usually a generic option."
        }
      ]
    }
  ],
  "completion_message": "Pharmacy visit complete."
}
```

## `co_a21`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a21",
  "phase": 5,
  "title": "Asking discount",
  "description": "Bargaining basics.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "عطني خصم لو سمحت",
        "english": "Give a discount please"
      },
      "choices": [
        {
          "next": -1,
          "script": "خمسة بالمية",
          "english": "Five percent",
          "feedback": "Modest."
        },
        {
          "next": -1,
          "script": "ما يمكن، السعر ثابت",
          "english": "Not possible",
          "feedback": "Firm."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a22`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a22",
  "phase": 5,
  "title": "At the cashier",
  "description": "Pay for items.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كم الحساب؟",
        "english": "How much total?"
      },
      "choices": [
        {
          "next": -1,
          "script": "خمسين ريال",
          "english": "50 riyals",
          "feedback": "OK."
        },
        {
          "next": -1,
          "script": "ثلاثة وأربعين",
          "english": "43",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a23`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a23",
  "phase": 5,
  "title": "Cash or card",
  "description": "Payment method.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كاش أو بطاقة؟",
        "english": "Cash or card?"
      },
      "choices": [
        {
          "next": -1,
          "script": "بطاقة",
          "english": "Card",
          "feedback": "Modern."
        },
        {
          "next": -1,
          "script": "كاش",
          "english": "Cash",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a24`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a24",
  "phase": 5,
  "title": "Asking for the receipt",
  "description": "Get the bill.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "الفاتورة لو سمحت",
        "english": "Receipt please"
      },
      "choices": [
        {
          "next": -1,
          "script": "تفضل",
          "english": "Here",
          "feedback": "OK."
        },
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

## `co_a25`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a25",
  "phase": 5,
  "title": "Sending a gift",
  "description": "At a gift shop.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أبغى أرسل هدية",
        "english": "I want to send a gift"
      },
      "choices": [
        {
          "next": 1,
          "script": "داخل المملكة أو خارجها؟",
          "english": "Inside or outside Saudi?",
          "feedback": "Clarify."
        },
        {
          "next": 1,
          "script": "بكم ميزانيتك؟",
          "english": "What's your budget?",
          "feedback": "Practical."
        }
      ]
    },
    {
      "prompt": {
        "script": "داخل المملكة",
        "english": "Inside Saudi"
      },
      "choices": [
        {
          "next": -1,
          "script": "اختر من هذي",
          "english": "Choose from these",
          "feedback": "Done."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b21`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b21",
  "phase": 5,
  "title": "Booking a barber appt",
  "description": "Appointment.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أبغى موعد بكرة",
        "english": "Want appt tomorrow"
      },
      "choices": [
        {
          "next": -1,
          "script": "الساعة كم؟",
          "english": "What time?",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b22`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b22",
  "phase": 5,
  "title": "Asking for refund",
  "description": "Customer service.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أبغى استرداد",
        "english": "I want a refund"
      },
      "choices": [
        {
          "next": -1,
          "script": "معك الفاتورة؟",
          "english": "Have receipt?",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b23`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b23",
  "phase": 5,
  "title": "Compliment on car",
  "description": "Friend's ride.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "سيارتك جديدة؟",
        "english": "New car?"
      },
      "choices": [
        {
          "next": -1,
          "script": "إيوة، اشتريتها أمس",
          "english": "Yes, bought yesterday",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b24`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b24",
  "phase": 5,
  "title": "Discussing prices",
  "description": "Casual price compare.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "الأسعار غالية",
        "english": "Prices are expensive"
      },
      "choices": [
        {
          "next": -1,
          "script": "صح، التضخم",
          "english": "True, inflation",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b25`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b25",
  "phase": 5,
  "title": "Asking what payment apps",
  "description": "Apple Pay etc.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تقبلوا أبل باي؟",
        "english": "Accept Apple Pay?"
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

## `co_b55`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b55",
  "phase": 5,
  "title": "Ordering delivery",
  "description": "By phone.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "عندي طلب",
        "english": "I have an order"
      },
      "choices": [
        {
          "next": -1,
          "script": "وش العنوان؟",
          "english": "Address?",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b64`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b64",
  "phase": 5,
  "title": "Compliment on cooking",
  "description": "At dinner.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "طبخك ولا أحلى",
        "english": "Your cooking, the best"
      },
      "choices": [
        {
          "next": -1,
          "script": "تسلم",
          "english": "Bless you",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c21`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c21",
  "phase": 5,
  "title": "Asking for ID",
  "description": "At pickup.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "معك الهوية؟",
        "english": "Have your ID?"
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

## `co_c22`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c22",
  "phase": 5,
  "title": "Asking warranty",
  "description": "Buying.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كم سنة الضمان؟",
        "english": "How long warranty?"
      },
      "choices": [
        {
          "next": -1,
          "script": "سنتين",
          "english": "Two years",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c23`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c23",
  "phase": 5,
  "title": "Asking if hot/cold drink",
  "description": "Cafe.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "حار أو بارد؟",
        "english": "Hot or cold?"
      },
      "choices": [
        {
          "next": -1,
          "script": "حار",
          "english": "Hot",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c24`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c24",
  "phase": 5,
  "title": "Asking flavor",
  "description": "Ice cream.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أي نكهة؟",
        "english": "Which flavor?"
      },
      "choices": [
        {
          "next": -1,
          "script": "فانيلا",
          "english": "Vanilla",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c25`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c25",
  "phase": 5,
  "title": "Asking for napkins",
  "description": "Restaurant.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "محارم لو سمحت",
        "english": "Napkins please"
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

## `co_c55`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c55",
  "phase": 5,
  "title": "Discussing test result",
  "description": "Exam result.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كم درجتك؟",
        "english": "What's your score?"
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

## `co_c65`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c65",
  "phase": 5,
  "title": "Inquiring about price drop",
  "description": "Discount alert.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "السعر نزل؟",
        "english": "Price dropped?"
      },
      "choices": [
        {
          "next": -1,
          "script": "إيوة عشرة بالمية",
          "english": "Yes 10%",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```
