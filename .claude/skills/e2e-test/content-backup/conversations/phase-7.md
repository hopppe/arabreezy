# conversations · phase 7 · dialect saudi

- count: **20**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `c_meeting_at_work`

```json
{
  "dialect": "saudi",
  "conversation_id": "c_meeting_at_work",
  "phase": 7,
  "title": "Quick standup at work",
  "description": "Update your manager on a project.",
  "focal_word_ids": [
    "w_meeting",
    "w_busy",
    "w_work_n",
    "w_proud",
    "w_decided"
  ],
  "steps": [
    {
      "prompt": {
        "script": "وش جديدك في المشروع؟",
        "english": "What's new on the project?"
      },
      "choices": [
        {
          "next": 1,
          "script": "خلصت الجزء الأول وفخور بالنتيجة.",
          "english": "I finished the first part and I'm proud of the result.",
          "feedback": "Confident."
        },
        {
          "next": 1,
          "script": "شغال عليه، يحتاج وقت أكثر.",
          "english": "Working on it, it needs more time.",
          "feedback": "Honest."
        }
      ]
    },
    {
      "prompt": {
        "script": "ممتاز، كم نحتاج للنهاية؟",
        "english": "Great, how much for completion?"
      },
      "choices": [
        {
          "next": -1,
          "script": "أسبوعين تقريباً.",
          "english": "About two weeks.",
          "feedback": "Clear timeline."
        },
        {
          "next": -1,
          "script": "يعتمد على الفريق.",
          "english": "It depends on the team.",
          "feedback": "Realistic."
        }
      ]
    }
  ],
  "completion_message": "You just gave a clean work update in Arabic."
}
```

## `co_a31`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a31",
  "phase": 7,
  "title": "Job interview opener",
  "description": "First impression.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تكلم عن خبرتك",
        "english": "Tell me your experience"
      },
      "choices": [
        {
          "next": 1,
          "script": "عملت خمس سنوات",
          "english": "Worked five years",
          "feedback": "Direct."
        },
        {
          "next": 1,
          "script": "بدأت من شركة صغيرة",
          "english": "Started at a small company",
          "feedback": "Story."
        }
      ]
    },
    {
      "prompt": {
        "script": "شكراً، ممتاز",
        "english": "Thanks, great"
      },
      "choices": [
        {
          "next": -1,
          "script": "شكراً لك",
          "english": "Thank you",
          "feedback": "Polite."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a32`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a32",
  "phase": 7,
  "title": "Asking salary",
  "description": "Compensation talk.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "كم تتوقع الراتب؟",
        "english": "Expected salary?"
      },
      "choices": [
        {
          "next": -1,
          "script": "خمسة عشر ألف",
          "english": "15k",
          "feedback": "Direct."
        },
        {
          "next": -1,
          "script": "حسب الشركة",
          "english": "Depends on the company",
          "feedback": "Diplomatic."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a33`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a33",
  "phase": 7,
  "title": "Setting deadline",
  "description": "Project timeline.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "متى نخلص المشروع؟",
        "english": "When do we finish?"
      },
      "choices": [
        {
          "next": -1,
          "script": "خلال أسبوعين",
          "english": "Two weeks",
          "feedback": "OK."
        },
        {
          "next": -1,
          "script": "يعتمد على الفريق",
          "english": "Depends on the team",
          "feedback": "Honest."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a34`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a34",
  "phase": 7,
  "title": "Asking a favor",
  "description": "Polite ask.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "ممكن تساعدني؟",
        "english": "Could you help?"
      },
      "choices": [
        {
          "next": -1,
          "script": "أكيد، تفضل",
          "english": "Sure, go ahead",
          "feedback": "Warm."
        },
        {
          "next": -1,
          "script": "الحين مشغول",
          "english": "Busy now",
          "feedback": "Honest."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_a35`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_a35",
  "phase": 7,
  "title": "Excusing yourself",
  "description": "Step away politely.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "عن إذنك",
        "english": "Excuse me"
      },
      "choices": [
        {
          "next": -1,
          "script": "تفضل",
          "english": "Go ahead",
          "feedback": "OK."
        },
        {
          "next": -1,
          "script": "على راحتك",
          "english": "Take your time",
          "feedback": "Warm."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b31`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b31",
  "phase": 7,
  "title": "Calling in sick",
  "description": "To boss.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "مريض اليوم",
        "english": "Sick today"
      },
      "choices": [
        {
          "next": -1,
          "script": "سلامتك، ارتاح",
          "english": "Get well, rest",
          "feedback": "Warm."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b32`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b32",
  "phase": 7,
  "title": "Asking about salary raise",
  "description": "To manager.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "ممكن نناقش الراتب؟",
        "english": "Discuss salary?"
      },
      "choices": [
        {
          "next": -1,
          "script": "نشوف الميزانية",
          "english": "Let's check budget",
          "feedback": "Diplomatic."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b33`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b33",
  "phase": 7,
  "title": "Asking for vacation",
  "description": "Leave request.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أبغى إجازة أسبوع",
        "english": "Want a week off"
      },
      "choices": [
        {
          "next": -1,
          "script": "وافقت",
          "english": "Approved",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b34`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b34",
  "phase": 7,
  "title": "Excuse for being late",
  "description": "To meeting.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "الزحمة وقفتني",
        "english": "Traffic held me up"
      },
      "choices": [
        {
          "next": -1,
          "script": "الحمد لله وصلت",
          "english": "Glad you're here",
          "feedback": "Polite."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b35`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b35",
  "phase": 7,
  "title": "Recommending a book",
  "description": "To friend.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أنصحك بكتاب",
        "english": "I recommend a book"
      },
      "choices": [
        {
          "next": -1,
          "script": "أي كتاب؟",
          "english": "Which one?",
          "feedback": "Curious."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b57`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b57",
  "phase": 7,
  "title": "Praising work",
  "description": "Boss to employee.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "شغل ممتاز",
        "english": "Great work"
      },
      "choices": [
        {
          "next": -1,
          "script": "الحمد لله",
          "english": "Praise God",
          "feedback": "Modest."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_b66`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_b66",
  "phase": 7,
  "title": "Updating boss",
  "description": "Status check.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "عندي تحديث",
        "english": "I have an update"
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

## `co_c31`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c31",
  "phase": 7,
  "title": "Asking project status",
  "description": "Work.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "المشروع وين وصل؟",
        "english": "Project status?"
      },
      "choices": [
        {
          "next": -1,
          "script": "خمسين بالمية",
          "english": "50%",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c32`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c32",
  "phase": 7,
  "title": "Asking about deadline",
  "description": "Pressure.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "الموعد متى؟",
        "english": "When's the deadline?"
      },
      "choices": [
        {
          "next": -1,
          "script": "الخميس",
          "english": "Thursday",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c33`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c33",
  "phase": 7,
  "title": "Sharing achievement",
  "description": "Casual brag.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "خلصت المهمة بنجاح",
        "english": "Finished task successfully"
      },
      "choices": [
        {
          "next": -1,
          "script": "ممتاز",
          "english": "Great",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c34`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c34",
  "phase": 7,
  "title": "Setting reminder",
  "description": "Self-talk style.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "ذكرني الساعة ثلاثة",
        "english": "Remind me at 3"
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

## `co_c35`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c35",
  "phase": 7,
  "title": "Asking for feedback",
  "description": "Self-improvement.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "أبغى ملاحظاتك",
        "english": "Want your feedback"
      },
      "choices": [
        {
          "next": -1,
          "script": "بكتبها لك",
          "english": "I'll write it",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```

## `co_c57`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c57",
  "phase": 7,
  "title": "Asking about promotion",
  "description": "Work.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "حصلت على ترقية؟",
        "english": "Got a promotion?"
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

## `co_c67`

```json
{
  "dialect": "saudi",
  "conversation_id": "co_c67",
  "phase": 7,
  "title": "Reporting progress",
  "description": "Work update.",
  "focal_word_ids": [],
  "steps": [
    {
      "prompt": {
        "script": "تقدمنا أمس",
        "english": "Progressed yesterday"
      },
      "choices": [
        {
          "next": -1,
          "script": "تمام",
          "english": "Good",
          "feedback": "OK."
        }
      ]
    }
  ],
  "completion_message": "Done."
}
```
