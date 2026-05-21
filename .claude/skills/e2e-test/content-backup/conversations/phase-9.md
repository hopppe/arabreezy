# conversations · phase 9 · dialect saudi

- count: **21**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `c_news_chat`

```json
{
  "dialect": "saudi",
  "conversation_id": "c_news_chat",
  "phase": 9,
  "title": "Discuss the news",
  "description": "Talk with a friend about a recent announcement.",
  "focal_word_ids": [
    "w_news",
    "w_government",
    "w_economy",
    "w_opinion"
  ],
  "steps": [
    {
      "prompt": {
        "script": "شفت الإعلان عن المشروع الجديد؟",
        "english": "Did you see the announcement about the new project?"
      },
      "choices": [
        {
          "next": 1,
          "script": "إيوة، تطوير قوي.",
          "english": "Yes, strong development.",
          "feedback": "Positive."
        },
        {
          "next": 1,
          "script": "شفته، لكن عندي تحفظات.",
          "english": "I saw it, but I have reservations.",
          "feedback": "Nuanced."
        }
      ]
    },
    {
      "prompt": {
        "script": "تتوقع تأثيره على الاقتصاد؟",
        "english": "How do you expect it to affect the economy?"
      },
      "choices": [
        {
          "next": -1,
          "script": "إيجابي على المدى البعيد.",
          "english": "Positive in the long run.",
          "feedback": "Standard analysis."
        },
        {
          "next": -1,
          "script": "يعتمد على التنفيذ.",
          "english": "Depends on the execution.",
          "feedback": "Sharp."
        }
      ]
    }
  ],
  "completion_message": "Solid current-affairs conversation."
}
```

## `co_a41`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a41",
  "phase": 9,
  "title": "News reaction",
  "description": "Reply to a headline.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "شفت الخبر؟",
        "english": "Saw the news?"
      },
      "choices": [
        {
          "next": -1,
          "script": "إيوة، مدهش",
          "english": "Yes, surprising",
          "feedback": "Strong."
        },
        {
          "next": -1,
          "script": "لا، احكي لي",
          "english": "No, tell me",
          "feedback": "Invite."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a42`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a42",
  "phase": 9,
  "title": "Discussing economy",
  "description": "Quick econ chat.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كيف الاقتصاد؟",
        "english": "How's the economy?"
      },
      "choices": [
        {
          "next": -1,
          "script": "يتعافى",
          "english": "Recovering",
          "feedback": "Optimistic."
        },
        {
          "next": -1,
          "script": "معقد شوي",
          "english": "A bit complex",
          "feedback": "Hedged."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a43`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a43",
  "phase": 9,
  "title": "Cultural discussion",
  "description": "About heritage.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "شو رأيك بالثقافة السعودية؟",
        "english": "Saudi culture?"
      },
      "choices": [
        {
          "next": -1,
          "script": "غنية ومتنوعة",
          "english": "Rich and varied",
          "feedback": "Good."
        },
        {
          "next": -1,
          "script": "تتطور بسرعة",
          "english": "Developing fast",
          "feedback": "Good."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a44`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a44",
  "phase": 9,
  "title": "Political discussion",
  "description": "Be careful.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "ما رأيك بالسياسة؟",
        "english": "View on politics?"
      },
      "choices": [
        {
          "next": -1,
          "script": "أفضل أتجنب",
          "english": "I'd rather avoid",
          "feedback": "Diplomatic."
        },
        {
          "next": -1,
          "script": "حلال للنقاش",
          "english": "OK to discuss",
          "feedback": "Open."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a45`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a45",
  "phase": 9,
  "title": "Environment talk",
  "description": "Sustainability.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كيف نحافظ على البيئة؟",
        "english": "How preserve env?"
      },
      "choices": [
        {
          "next": -1,
          "script": "تقليل البلاستيك",
          "english": "Less plastic",
          "feedback": "Practical."
        },
        {
          "next": -1,
          "script": "الطاقة المتجددة",
          "english": "Renewables",
          "feedback": "Forward."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b41`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b41",
  "phase": 9,
  "title": "Sharing news from media",
  "description": "Heard on radio.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "سمعت الخبر في الراديو",
        "english": "Heard it on the radio"
      },
      "choices": [
        {
          "next": -1,
          "script": "وش يقولون؟",
          "english": "What do they say?",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b42`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b42",
  "phase": 9,
  "title": "Reading the paper",
  "description": "Newspaper.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "شفت مقال جديد",
        "english": "Saw a new article"
      },
      "choices": [
        {
          "next": -1,
          "script": "مهم؟",
          "english": "Important?",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b43`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b43",
  "phase": 9,
  "title": "Watching the news",
  "description": "TV.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "شفت النشرة؟",
        "english": "Watched the bulletin?"
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

## `co_b44`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b44",
  "phase": 9,
  "title": "Voting talk",
  "description": "Civic.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تشارك في التصويت؟",
        "english": "Will you vote?"
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

## `co_b45`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b45",
  "phase": 9,
  "title": "Community service",
  "description": "Volunteer.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "عندي فكرة لخدمة المجتمع",
        "english": "Idea for community service"
      },
      "choices": [
        {
          "next": -1,
          "script": "أحب أسمع",
          "english": "I'd love to hear",
          "feedback": "Open."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b48`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b48",
  "phase": 9,
  "title": "Acknowledging effort",
  "description": "Thank a team.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "نشكر الفريق على جهودهم",
        "english": "Thank team for their efforts"
      },
      "choices": [
        {
          "next": -1,
          "script": "الجميع شارك",
          "english": "All contributed",
          "feedback": "Modest."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b59`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b59",
  "phase": 9,
  "title": "Discussing climate",
  "description": "Environment.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "الجو تغير كثير",
        "english": "Climate has changed a lot"
      },
      "choices": [
        {
          "next": -1,
          "script": "صح",
          "english": "True",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b68`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b68",
  "phase": 9,
  "title": "Discussing future",
  "description": "Vision.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "وش رؤيتك للمستقبل؟",
        "english": "Your view of the future?"
      },
      "choices": [
        {
          "next": -1,
          "script": "متفائل",
          "english": "Optimistic",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c41`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c41",
  "phase": 9,
  "title": "Discussing global news",
  "description": "World.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "شفت أخبار العالم؟",
        "english": "World news?"
      },
      "choices": [
        {
          "next": -1,
          "script": "معقدة",
          "english": "Complex",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c42`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c42",
  "phase": 9,
  "title": "Sharing scientific finding",
  "description": "Conversation.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "اكتشاف جديد",
        "english": "New discovery"
      },
      "choices": [
        {
          "next": -1,
          "script": "وش؟",
          "english": "What?",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c43`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c43",
  "phase": 9,
  "title": "Talking about technology",
  "description": "Tech.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "التقنية تتطور بسرعة",
        "english": "Tech evolves fast"
      },
      "choices": [
        {
          "next": -1,
          "script": "موافق",
          "english": "Agreed",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c44`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c44",
  "phase": 9,
  "title": "Discussing education",
  "description": "Society.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "التعليم أساس",
        "english": "Education is foundational"
      },
      "choices": [
        {
          "next": -1,
          "script": "صح",
          "english": "True",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c45`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c45",
  "phase": 9,
  "title": "Talking about health",
  "description": "Society.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "الصحة أهم",
        "english": "Health is most important"
      },
      "choices": [
        {
          "next": -1,
          "script": "بلا شك",
          "english": "No doubt",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c59`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c59",
  "phase": 9,
  "title": "Asking about social issue",
  "description": "Big topic.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "وش رأيك بالقضية؟",
        "english": "View on the issue?"
      },
      "choices": [
        {
          "next": -1,
          "script": "معقدة",
          "english": "Complex",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c69`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c69",
  "phase": 9,
  "title": "Curiosity question",
  "description": "Open-ended.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تبغى تتعلم وش جديد؟",
        "english": "Want to learn what's new?"
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
