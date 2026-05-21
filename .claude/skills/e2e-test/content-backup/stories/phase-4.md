# stories · phase 4 · dialect saudi

- count: **20**
- dumped: 2026-05-20T15:59:15.311Z

Each row is one JSON block. Diff this file in git to see content drift.

## `s_doctor_visit`

```json
{
  "dialect": "saudi",
  "story_id": "s_doctor_visit",
  "phase": 4,
  "title": "عند الدكتور",
  "title_english": "At the Doctor",
  "topic": "health",
  "paragraphs": [
    "أروح الْمُسْتَشْفى اليوم. أنا تعبان وعندي صداع.",
    "الدكتور يشوفني ويسألني: وين يؤلمك؟ أقول له: في رأسي وشوي في حلقي.",
    "يعطيني دواء ويقول: استرح اليوم. بكرة تكون أحسن إن شاء الله."
  ],
  "english_translation": [
    "I am going to the hospital today. I am tired and I have a headache.",
    "The doctor looks at me and asks: where does it hurt? I tell him: in my head and a little in my throat.",
    "He gives me medicine and says: rest today. Tomorrow you will be better, inshallah."
  ],
  "word_mappings": {
    "حلقي": "my throat",
    "دواء": "medicine",
    "صداع": "headache",
    "استرح": "rest (command)",
    "تعبان": "tired / unwell",
    "يؤلمك": "hurts you",
    "الْمُسْتَشْفى": "the hospital"
  },
  "comprehension_questions": [
    {
      "options": [
        "السوق",
        "المدرسة",
        "المستشفى",
        "المطار"
      ],
      "question": "وين يروح الراوي اليوم؟",
      "explanation": "يروح المستشفى لأنه تعبان.",
      "correctAnswer": 2
    },
    {
      "options": [
        "إجازة",
        "دواء",
        "أكل",
        "ماء"
      ],
      "question": "إيش أعطاه الدكتور؟",
      "explanation": "الدكتور أعطاه دواء وطلب منه يستريح.",
      "correctAnswer": 1
    }
  ],
  "audio_url": null,
  "icon": "🩺",
  "estimated_duration": 5,
  "reading_level": 4
}
```

## `s_ride_share`

```json
{
  "dialect": "saudi",
  "story_id": "s_ride_share",
  "phase": 4,
  "title": "تاكسي",
  "title_english": "The Taxi Ride",
  "topic": "daily life",
  "paragraphs": [
    "أروح الْمَطار الحين. أطلب تاكسي من التطبيق. السائق يجي بسرعة.",
    "في السيارة، يسألني: وين تبي تروح؟ أقول: الْمَطار، لو سمحت.",
    "نمشي على طول، ثم نطلع على اليمين. أوصل الْمَطار وأدفع وأقول شكراً."
  ],
  "english_translation": [
    "I am going to the airport now. I request a taxi from the app. The driver comes quickly.",
    "In the car, he asks me: where do you want to go? I say: the airport, please.",
    "We go straight, then turn right. I arrive at the airport, pay, and say thank you."
  ],
  "word_mappings": {
    "أدفع": "I pay",
    "السائق": "the driver",
    "على طول": "straight ahead (Saudi direction word)",
    "التطبيق": "the app",
    "الْمَطار": "the airport",
    "على اليمين": "to the right"
  },
  "comprehension_questions": [
    {
      "options": [
        "المستشفى",
        "السوق",
        "المطار",
        "المدرسة"
      ],
      "question": "وين يريد الراوي يروح؟",
      "explanation": "يريد يروح المطار.",
      "correctAnswer": 2
    },
    {
      "options": [
        "على اليسار ثم على طول",
        "على طول ثم على اليمين",
        "على اليمين ثم على اليسار",
        "رجع للوراء ثم على طول"
      ],
      "question": "إيش الطريق اللي أخذه التاكسي؟",
      "explanation": "على طول ثم على اليمين.",
      "correctAnswer": 1
    }
  ],
  "audio_url": null,
  "icon": "🚕",
  "estimated_duration": 5,
  "reading_level": 4
}
```

## `st_4_ams`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_ams",
  "phase": 4,
  "title": "أَمس",
  "title_english": "Yesterday",
  "topic": "daily routine",
  "paragraphs": [
    "أَمس رُحت مَعَ صَديقي عِند جَدِّي. كُنَّا نِلعَب في الحَديقة.",
    "الجَوّ كان زَيْن. جَدَّتي أعطَتنا التَّمر. رَجَعنا البَيت المَساء وأنا مَبسوط."
  ],
  "english_translation": [
    "Yesterday I went with my friend to my grandfather's. We were playing in the garden.",
    "The weather was nice. Grandma gave us dates. We went back home in the evening and I was happy."
  ],
  "word_mappings": [
    {
      "arabic": "أَمس",
      "english": "yesterday",
      "transliteration": "ams"
    },
    {
      "arabic": "رُحت",
      "english": "I went",
      "transliteration": "ruht"
    },
    {
      "arabic": "كُنَّا نِلعَب",
      "english": "we were playing",
      "transliteration": "kunna nilʿab"
    },
    {
      "arabic": "الحَديقة",
      "english": "the garden",
      "transliteration": "al-hadiiqa"
    },
    {
      "arabic": "أعطَتنا",
      "english": "she gave us",
      "transliteration": "aʿṭatna"
    },
    {
      "arabic": "مَبسوط",
      "english": "happy/pleased",
      "transliteration": "mabsuut"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "Grandfather's house",
        "School",
        "The market",
        "The hospital"
      ],
      "question": "Where did the speaker go yesterday?",
      "correctAnswer": "Grandfather's house"
    },
    {
      "options": [
        "Dates",
        "Apples",
        "Tea",
        "Bread"
      ],
      "question": "What did grandma give them?",
      "correctAnswer": "Dates"
    },
    {
      "options": [
        "Happy",
        "Sad",
        "Tired",
        "Angry"
      ],
      "question": "How did the speaker feel in the evening?",
      "correctAnswer": "Happy"
    }
  ],
  "audio_url": null,
  "icon": "📅",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_bayt_jadid`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_bayt_jadid",
  "phase": 4,
  "title": "البَيت الجَديد",
  "title_english": "The New House",
  "topic": "home",
  "paragraphs": [
    "انتقَلنا لِبَيت جَديد الأُسبوع الماضي. البَيت فيه ثَلاث غُرَف ومَطبَخ وصالة.",
    "أنا أُحِبُّ غُرفتي الجَديدة. الشُّبَّاك يِطِلّ على الحَديقة. كُلَّ صُبح أشوف الطُّيور."
  ],
  "english_translation": [
    "We moved to a new house last week. The house has three rooms and a kitchen and a living room.",
    "I love my new room. The window looks out onto the garden. Every morning I see the birds."
  ],
  "word_mappings": [
    {
      "arabic": "انتقَلنا",
      "english": "we moved",
      "transliteration": "intaqalna"
    },
    {
      "arabic": "الأُسبوع الماضي",
      "english": "last week",
      "transliteration": "al-usbuuʿ al-maadi"
    },
    {
      "arabic": "مَطبَخ",
      "english": "kitchen",
      "transliteration": "maṭbakh"
    },
    {
      "arabic": "صالة",
      "english": "living room",
      "transliteration": "saala"
    },
    {
      "arabic": "الشُّبَّاك",
      "english": "the window",
      "transliteration": "ash-shubbak"
    },
    {
      "arabic": "الطُّيور",
      "english": "the birds",
      "transliteration": "aṭ-ṭuyuur"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "Last week",
        "Yesterday",
        "Last month",
        "Today"
      ],
      "question": "When did they move to the new house?",
      "correctAnswer": "Last week"
    },
    {
      "options": [
        "Three",
        "Two",
        "Four",
        "Five"
      ],
      "question": "How many rooms does the house have?",
      "correctAnswer": "Three"
    },
    {
      "options": [
        "Birds",
        "The sea",
        "Mountains",
        "A market"
      ],
      "question": "What does the speaker see from the window every morning?",
      "correctAnswer": "Birds"
    }
  ],
  "audio_url": null,
  "icon": "🏡",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_biqaala`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_biqaala",
  "phase": 4,
  "title": "فِي البَقالة",
  "title_english": "At the Grocery",
  "topic": "shopping",
  "paragraphs": [
    "ماما تِبعَثني البَقالة. تَقول: اشتري حَليب وبَيض وخُبز. عِندِي خَمسَة وعِشرين ريال.",
    "فِي البَقالة أَلقى الحَليب والبَيض بَس ما فِيه خُبز! أرجَع لِماما وأقول لها."
  ],
  "english_translation": [
    "Mom sends me to the grocery. She says: Buy milk and eggs and bread. I have twenty-five riyals.",
    "At the grocery I find milk and eggs but there is no bread! I go back to mom and tell her."
  ],
  "word_mappings": [
    {
      "arabic": "تِبعَثني",
      "english": "she sends me",
      "transliteration": "tibʿathni"
    },
    {
      "arabic": "البَقالة",
      "english": "the grocery/supermarket",
      "transliteration": "al-biqaala"
    },
    {
      "arabic": "أَلقى",
      "english": "I find",
      "transliteration": "alqa"
    },
    {
      "arabic": "الحَليب",
      "english": "milk",
      "transliteration": "al-haliib"
    },
    {
      "arabic": "البَيض",
      "english": "eggs",
      "transliteration": "al-bayḍ"
    },
    {
      "arabic": "أرجَع",
      "english": "I return",
      "transliteration": "arjaʿ"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "Milk, eggs, and bread",
        "Chicken, rice, and tea",
        "Apples, dates, and coffee",
        "Cheese, butter, and juice"
      ],
      "question": "What does mom send the speaker to buy?",
      "correctAnswer": "Milk, eggs, and bread"
    },
    {
      "options": [
        "Bread",
        "Milk",
        "Eggs",
        "Cheese"
      ],
      "question": "What item is missing at the grocery?",
      "correctAnswer": "Bread"
    },
    {
      "options": [
        "Twenty-five riyals",
        "Ten riyals",
        "Fifty riyals",
        "Five riyals"
      ],
      "question": "How much money does the speaker have?",
      "correctAnswer": "Twenty-five riyals"
    }
  ],
  "audio_url": null,
  "icon": "🏪",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_hajiz`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_hajiz",
  "phase": 4,
  "title": "المَطعَم",
  "title_english": "The Restaurant",
  "topic": "food",
  "paragraphs": [
    "اليَوم نِروح المَطعَم. المَطعَم فِي وَسَط المَدينة. بابا يِحجِز طاولة.",
    "النَّادِل يِجي ويِقول: شُنو تَبغون؟ بابا يِطلُب الدَّجاج. ماما تِطلُب الأُرز. أنا أبغى الاثنَيْن!"
  ],
  "english_translation": [
    "Today we go to the restaurant. The restaurant is in the city center. Dad reserves a table.",
    "The waiter comes and says: What do you want? Dad orders chicken. Mom orders rice. I want both!"
  ],
  "word_mappings": [
    {
      "arabic": "المَطعَم",
      "english": "the restaurant",
      "transliteration": "al-maṭʿam"
    },
    {
      "arabic": "وَسَط المَدينة",
      "english": "city center",
      "transliteration": "wasaṭ al-madiina"
    },
    {
      "arabic": "يِحجِز",
      "english": "he reserves",
      "transliteration": "yihjiz"
    },
    {
      "arabic": "النَّادِل",
      "english": "the waiter",
      "transliteration": "an-naadil"
    },
    {
      "arabic": "يِطلُب",
      "english": "he orders",
      "transliteration": "yiṭlub"
    },
    {
      "arabic": "الاثنَيْن",
      "english": "both",
      "transliteration": "al-ithnayn"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "City center",
        "Near the house",
        "Near school",
        "Near the mosque"
      ],
      "question": "Where is the restaurant?",
      "correctAnswer": "City center"
    },
    {
      "options": [
        "Chicken",
        "Rice",
        "Fish",
        "Bread"
      ],
      "question": "What does dad order?",
      "correctAnswer": "Chicken"
    },
    {
      "options": [
        "Both chicken and rice",
        "Only rice",
        "Only chicken",
        "Tea"
      ],
      "question": "What does the speaker want?",
      "correctAnswer": "Both chicken and rice"
    }
  ],
  "audio_url": null,
  "icon": "🍽️",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_itijaah`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_itijaah",
  "phase": 4,
  "title": "الطَّريق لِلمَستَشفى",
  "title_english": "The Way to the Hospital",
  "topic": "directions",
  "paragraphs": [
    "رَجل يَسأل عن المُستَشفى. أنا أعرف الطَّريق. أقول له: على طُول ثُمَّ يَمين.",
    "هُوَّ يَقول: بَعيد؟ أقول: لا، قَريب بَعد المَسجِد. يَقول: شُكرًا. أقول: وَلا يِهِمَّك!"
  ],
  "english_translation": [
    "A man asks about the hospital. I know the way. I tell him: Straight ahead then right.",
    "He says: Is it far? I say: No, it's close after the mosque. He says: Thank you. I say: No problem!"
  ],
  "word_mappings": [
    {
      "arabic": "يَسأل",
      "english": "he asks",
      "transliteration": "yisʾal"
    },
    {
      "arabic": "المُستَشفى",
      "english": "the hospital",
      "transliteration": "al-mustashfa"
    },
    {
      "arabic": "على طُول",
      "english": "straight ahead",
      "transliteration": "ʿala ṭuul"
    },
    {
      "arabic": "ثُمَّ",
      "english": "then",
      "transliteration": "thumma"
    },
    {
      "arabic": "يَمين",
      "english": "right",
      "transliteration": "yamiin"
    },
    {
      "arabic": "بَعيد",
      "english": "far",
      "transliteration": "baʿiid"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "The hospital",
        "The mosque",
        "The market",
        "The school"
      ],
      "question": "What does the man ask about?",
      "correctAnswer": "The hospital"
    },
    {
      "options": [
        "Straight",
        "Right",
        "Left",
        "Back"
      ],
      "question": "Which direction does the speaker give first?",
      "correctAnswer": "Straight"
    },
    {
      "options": [
        "No, it's close",
        "Yes, it's far",
        "It's very far",
        "Not mentioned"
      ],
      "question": "Is the hospital far?",
      "correctAnswer": "No, it's close"
    }
  ],
  "audio_url": null,
  "icon": "🏥",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_madina`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_madina",
  "phase": 4,
  "title": "الحَيّ الجَديد",
  "title_english": "The New Neighborhood",
  "topic": "daily life",
  "paragraphs": [
    "عيلتي انتقلت إلى حَيّ جَديد. البَيت كَبير وفيه حَديقة. أنا أُحِبُّ الحَيّ الجَديد.",
    "الجيران زَيْنِين. في السُّوق قَريب وفيه مَدرسة. أنا أروح المَدرسة ماشيًا."
  ],
  "english_translation": [
    "My family moved to a new neighborhood. The house is big and has a garden. I love the new neighborhood.",
    "The neighbors are good. There is a market nearby and a school. I walk to school."
  ],
  "word_mappings": [
    {
      "arabic": "انتقلت",
      "english": "moved",
      "transliteration": "intaqalat"
    },
    {
      "arabic": "حَيّ",
      "english": "neighborhood (Saudi)",
      "transliteration": "hayy"
    },
    {
      "arabic": "الجيران",
      "english": "the neighbors",
      "transliteration": "al-jiiraan"
    },
    {
      "arabic": "ماشيًا",
      "english": "walking",
      "transliteration": "maashiyan"
    },
    {
      "arabic": "حَديقة",
      "english": "garden",
      "transliteration": "hadiiqa"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "Big house with garden",
        "Far from school",
        "No neighbors",
        "Very quiet"
      ],
      "question": "Why does the speaker love the new neighborhood?",
      "correctAnswer": "Big house with garden"
    },
    {
      "options": [
        "Walking",
        "By car",
        "By taxi",
        "By bus"
      ],
      "question": "How does the speaker go to school?",
      "correctAnswer": "Walking"
    },
    {
      "options": [
        "A market",
        "A hospital",
        "A mosque",
        "A park"
      ],
      "question": "What is near the house?",
      "correctAnswer": "A market"
    }
  ],
  "audio_url": null,
  "icon": "🏘️",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_masjid`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_masjid",
  "phase": 4,
  "title": "يَوم المَسجِد",
  "title_english": "The Mosque Day",
  "topic": "daily life",
  "paragraphs": [
    "كُلَّ جُمعة أروح المَسجِد مَعَ بابا. المَسجِد قَريب من البَيت. نِمشي على الأقدام.",
    "فِي المَسجِد ناس كثير. بَعد الصَّلاة نَروح البَيت. ماما تِجيب الغَدا."
  ],
  "english_translation": [
    "Every Friday I go to the mosque with dad. The mosque is close to the house. We walk on foot.",
    "In the mosque there are many people. After the prayer we go home. Mom brings lunch."
  ],
  "word_mappings": [
    {
      "arabic": "أروح",
      "english": "I go",
      "transliteration": "aruuh"
    },
    {
      "arabic": "المَسجِد",
      "english": "the mosque",
      "transliteration": "al-masjid"
    },
    {
      "arabic": "قَريب",
      "english": "close/near",
      "transliteration": "qariib"
    },
    {
      "arabic": "نِمشي",
      "english": "we walk",
      "transliteration": "nimshi"
    },
    {
      "arabic": "الصَّلاة",
      "english": "the prayer",
      "transliteration": "as-salaa"
    },
    {
      "arabic": "الغَدا",
      "english": "lunch",
      "transliteration": "al-ghada"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "On foot",
        "By car",
        "By taxi",
        "By bus"
      ],
      "question": "How do they get to the mosque?",
      "correctAnswer": "On foot"
    },
    {
      "options": [
        "They go home",
        "They go to the market",
        "They stay in the mosque",
        "They go to school"
      ],
      "question": "What happens after the prayer?",
      "correctAnswer": "They go home"
    },
    {
      "options": [
        "Mom",
        "Dad",
        "Grandma",
        "The speaker"
      ],
      "question": "Who brings lunch?",
      "correctAnswer": "Mom"
    }
  ],
  "audio_url": null,
  "icon": "🕌",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_mudir`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_mudir",
  "phase": 4,
  "title": "يَوم بابا فِي الشُّغل",
  "title_english": "Dad's Day at Work",
  "topic": "work",
  "paragraphs": [
    "بابا يِشتَغِل فِي مَكتَب. يِروح كُلَّ يَوم الصُّبح ويِرجَع المَساء.",
    "أنا أَنتَظِر بابا كُلَّ يَوم. لَمَّا يِجي يِقول: كيف الأُسرة؟ ونِجلِس ونِتكَلَّم."
  ],
  "english_translation": [
    "Dad works in an office. He goes every morning and returns in the evening.",
    "I wait for dad every day. When he comes he says: How is the family? And we sit and talk."
  ],
  "word_mappings": [
    {
      "arabic": "يِشتَغِل",
      "english": "he works",
      "transliteration": "yishtghil"
    },
    {
      "arabic": "مَكتَب",
      "english": "office",
      "transliteration": "maktab"
    },
    {
      "arabic": "المَساء",
      "english": "the evening",
      "transliteration": "al-masaa"
    },
    {
      "arabic": "أَنتَظِر",
      "english": "I wait",
      "transliteration": "antaẓir"
    },
    {
      "arabic": "الأُسرة",
      "english": "the family",
      "transliteration": "al-usra"
    },
    {
      "arabic": "نِتكَلَّم",
      "english": "we talk",
      "transliteration": "nitkallam"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "In an office",
        "At a market",
        "At a hospital",
        "At a school"
      ],
      "question": "Where does dad work?",
      "correctAnswer": "In an office"
    },
    {
      "options": [
        "How is the family?",
        "How are you?",
        "Let's eat",
        "Good evening"
      ],
      "question": "What does dad say when he arrives home?",
      "correctAnswer": "How is the family?"
    },
    {
      "options": [
        "Every morning",
        "Every evening",
        "On Fridays only",
        "On weekends"
      ],
      "question": "When does dad go to work?",
      "correctAnswer": "Every morning"
    }
  ],
  "audio_url": null,
  "icon": "💼",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_nahnu_aila`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_nahnu_aila",
  "phase": 4,
  "title": "نَحن عائِلة",
  "title_english": "We Are a Family",
  "topic": "family",
  "paragraphs": [
    "عائِلَتي كبيرة. فيها بابا وماما وأنا وأخوين وأُختَيْن. نِسكُن في بَيت واحِد.",
    "كُلَّ مَساء نِجلِس سَوا ونِتكَلَّم ونِضحَك. بابا يِقول: العائِلة هِي الأَهم."
  ],
  "english_translation": [
    "My family is large. In it there is dad and mom and me and two brothers and two sisters. We live in one house.",
    "Every evening we sit together and talk and laugh. Dad says: The family is the most important thing."
  ],
  "word_mappings": [
    {
      "arabic": "عائِلَتي",
      "english": "my family",
      "transliteration": "ʿaaʾilati"
    },
    {
      "arabic": "أخوين",
      "english": "two brothers",
      "transliteration": "akhwayn"
    },
    {
      "arabic": "أُختَيْن",
      "english": "two sisters",
      "transliteration": "ukhtayn"
    },
    {
      "arabic": "نِسكُن",
      "english": "we live",
      "transliteration": "niskun"
    },
    {
      "arabic": "نِضحَك",
      "english": "we laugh",
      "transliteration": "niḍḥak"
    },
    {
      "arabic": "الأَهم",
      "english": "the most important",
      "transliteration": "al-ahamm"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "Two",
        "One",
        "Three",
        "None"
      ],
      "question": "How many brothers does the speaker have?",
      "correctAnswer": "Two"
    },
    {
      "options": [
        "Sit together and talk",
        "Go to the market",
        "Watch TV",
        "Sleep early"
      ],
      "question": "What does the family do every evening?",
      "correctAnswer": "Sit together and talk"
    },
    {
      "options": [
        "The family",
        "Work",
        "School",
        "Money"
      ],
      "question": "What does dad say is most important?",
      "correctAnswer": "The family"
    }
  ],
  "audio_url": null,
  "icon": "👨‍👩‍👧‍👦",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_riyada`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_riyada",
  "phase": 4,
  "title": "الرِّياضَة",
  "title_english": "Exercise",
  "topic": "sports",
  "paragraphs": [
    "أنا وصَديقي نِلعَب كُرة كُلَّ خَميس في الحَديقة. نِلعَب مَن الساعة أربعة لِغايَة سِتَّة.",
    "الرِّياضة مُهِمَّة. بَعد اللَّعب نِشرَب ماء ونِرجَع البَيت. ماما تِقول: ساغِسِلوا أيديكُم أوَّل."
  ],
  "english_translation": [
    "My friend and I play football every Thursday in the park. We play from four o'clock until six.",
    "Exercise is important. After playing we drink water and go home. Mom says: Wash your hands first."
  ],
  "word_mappings": [
    {
      "arabic": "نِلعَب",
      "english": "we play",
      "transliteration": "nilʿab"
    },
    {
      "arabic": "الخَميس",
      "english": "Thursday",
      "transliteration": "al-khamiis"
    },
    {
      "arabic": "الحَديقة",
      "english": "the park",
      "transliteration": "al-hadiiqa"
    },
    {
      "arabic": "الرِّياضة",
      "english": "exercise/sport",
      "transliteration": "ar-riyaaḍa"
    },
    {
      "arabic": "مُهِمَّة",
      "english": "important (f)",
      "transliteration": "muhimma"
    },
    {
      "arabic": "نِشرَب",
      "english": "we drink",
      "transliteration": "nishrab"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "Every Thursday",
        "Every Friday",
        "Every Saturday",
        "Every day"
      ],
      "question": "When do they play football?",
      "correctAnswer": "Every Thursday"
    },
    {
      "options": [
        "Water",
        "Tea",
        "Juice",
        "Coffee"
      ],
      "question": "What do they drink after playing?",
      "correctAnswer": "Water"
    },
    {
      "options": [
        "Wash hands",
        "Eat food",
        "Sleep",
        "Study"
      ],
      "question": "What does mom tell them to do first?",
      "correctAnswer": "Wash hands"
    }
  ],
  "audio_url": null,
  "icon": "⚽",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_riyadh_mecca`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_riyadh_mecca",
  "phase": 4,
  "title": "من الرياض إلى مَكَّة",
  "title_english": "From Riyadh to Mecca",
  "topic": "travel",
  "paragraphs": [
    "العيلة تِسافر من الرِّياض إلى مَكَّة. بابا يِسوق السَّيارة. الطَّريق طويل.",
    "أنا أَنام فِي السَّيارة. بَعدِين أَصحى وأشوف الجِبال. ماما تِقول: وَصَلنا قَريبًا!"
  ],
  "english_translation": [
    "The family travels from Riyadh to Mecca. Dad drives the car. The road is long.",
    "I sleep in the car. Then I wake up and see the mountains. Mom says: We're arriving soon!"
  ],
  "word_mappings": [
    {
      "arabic": "تِسافر",
      "english": "(it) travels",
      "transliteration": "tisaafar"
    },
    {
      "arabic": "يِسوق",
      "english": "he drives",
      "transliteration": "yisuuq"
    },
    {
      "arabic": "السَّيارة",
      "english": "the car",
      "transliteration": "as-sayyaara"
    },
    {
      "arabic": "الطَّريق",
      "english": "the road",
      "transliteration": "aṭ-ṭariiq"
    },
    {
      "arabic": "الجِبال",
      "english": "the mountains",
      "transliteration": "al-jibaal"
    },
    {
      "arabic": "وَصَلنا",
      "english": "we have arrived",
      "transliteration": "waṣalna"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "Mecca",
        "Jeddah",
        "Dammam",
        "Medina"
      ],
      "question": "Where is the family traveling to?",
      "correctAnswer": "Mecca"
    },
    {
      "options": [
        "Sleeps",
        "Eats",
        "Reads",
        "Sings"
      ],
      "question": "What does the speaker do in the car?",
      "correctAnswer": "Sleeps"
    },
    {
      "options": [
        "Mountains",
        "The sea",
        "The desert",
        "The city"
      ],
      "question": "What does the speaker see after waking up?",
      "correctAnswer": "Mountains"
    }
  ],
  "audio_url": null,
  "icon": "🚗",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_saydalia`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_saydalia",
  "phase": 4,
  "title": "الصَّيدَليَّة",
  "title_english": "The Pharmacy",
  "topic": "health",
  "paragraphs": [
    "أخي مَريض. ماما تِبعَثني الصَّيدَليَّة. الصَّيدَليَّة على يَمين السُّوق.",
    "الصَّيدَلاني يِسألني: شُنو تِحتاج؟ أقول: دَواء للزُّكام. هُوَّ يِعطيني الدَّواء."
  ],
  "english_translation": [
    "My brother is sick. Mom sends me to the pharmacy. The pharmacy is to the right of the market.",
    "The pharmacist asks me: What do you need? I say: Medicine for a cold. He gives me the medicine."
  ],
  "word_mappings": [
    {
      "arabic": "الصَّيدَليَّة",
      "english": "the pharmacy",
      "transliteration": "as-saydaliyya"
    },
    {
      "arabic": "يِسألني",
      "english": "he asks me",
      "transliteration": "yisʾalni"
    },
    {
      "arabic": "تِحتاج",
      "english": "you need",
      "transliteration": "tihtaaj"
    },
    {
      "arabic": "الزُّكام",
      "english": "a cold",
      "transliteration": "az-zukaam"
    },
    {
      "arabic": "الصَّيدَلاني",
      "english": "the pharmacist",
      "transliteration": "as-saydallaani"
    },
    {
      "arabic": "على يَمين",
      "english": "to the right of",
      "transliteration": "ʿala yamiin"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "Brother is sick",
        "Speaker is sick",
        "To buy food",
        "To pay a bill"
      ],
      "question": "Why does mom send the speaker to the pharmacy?",
      "correctAnswer": "Brother is sick"
    },
    {
      "options": [
        "To the right of the market",
        "To the left of the mosque",
        "Near the school",
        "In the city center"
      ],
      "question": "Where is the pharmacy?",
      "correctAnswer": "To the right of the market"
    },
    {
      "options": [
        "Medicine for a cold",
        "Medicine for a headache",
        "Medicine for the stomach",
        "A vitamin"
      ],
      "question": "What medicine does the speaker ask for?",
      "correctAnswer": "Medicine for a cold"
    }
  ],
  "audio_url": null,
  "icon": "💊",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_shaaric`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_shaaric",
  "phase": 4,
  "title": "عَلى الشَّارِع",
  "title_english": "On the Street",
  "topic": "directions",
  "paragraphs": [
    "أنا ضايع فِي شارع جديد. ما أعرف وَيْن البَيت. أسأل امرأة قاعدة في المَحَل.",
    "هِي تِقول: امشِ على طُول، شوف الإشارة، بَعدِين يَسار. البَيت الأَزرق هو الصَّح."
  ],
  "english_translation": [
    "I am lost in a new street. I don't know where home is. I ask a woman sitting in the shop.",
    "She says: Walk straight, look for the signal, then left. The blue house is the right one."
  ],
  "word_mappings": [
    {
      "arabic": "ضايع",
      "english": "lost",
      "transliteration": "ḍaayiʿ"
    },
    {
      "arabic": "أسأل",
      "english": "I ask",
      "transliteration": "asʾal"
    },
    {
      "arabic": "امشِ",
      "english": "walk (imperative)",
      "transliteration": "imshi"
    },
    {
      "arabic": "الإشارة",
      "english": "the traffic light/signal",
      "transliteration": "al-ishaara"
    },
    {
      "arabic": "يَسار",
      "english": "left",
      "transliteration": "yasaar"
    },
    {
      "arabic": "الصَّح",
      "english": "the right one/correct",
      "transliteration": "aṣ-ṣaḥḥ"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "Lost in a new street",
        "Late for school",
        "Looking for the market",
        "Forgot something"
      ],
      "question": "What is the speaker's problem?",
      "correctAnswer": "Lost in a new street"
    },
    {
      "options": [
        "Left",
        "Right",
        "Straight",
        "Back"
      ],
      "question": "After the traffic light, which way should the speaker go?",
      "correctAnswer": "Left"
    },
    {
      "options": [
        "Blue",
        "Red",
        "White",
        "Green"
      ],
      "question": "What color is the correct house?",
      "correctAnswer": "Blue"
    }
  ],
  "audio_url": null,
  "icon": "🗺️",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_shita`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_shita",
  "phase": 4,
  "title": "اليَوم بارِد",
  "title_english": "Cold Day",
  "topic": "weather",
  "paragraphs": [
    "الشِّتا جاء. الجَو بارِد جِدًّا. ماما تَقول: لَبِّس جاكيت قَبل ما تِطلَع.",
    "أنا أَلبَس الجاكيت وأروح. البَرد زَيْن بَعد الصَّيف الطَّويل. أنا أُحِبُّ الشِّتا."
  ],
  "english_translation": [
    "Winter has come. The weather is very cold. Mom says: Wear a jacket before you go out.",
    "I wear the jacket and go. The cold is nice after the long summer. I love winter."
  ],
  "word_mappings": [
    {
      "arabic": "الشِّتا",
      "english": "winter",
      "transliteration": "ash-shita"
    },
    {
      "arabic": "الجَو",
      "english": "the weather",
      "transliteration": "al-jaw"
    },
    {
      "arabic": "بارِد",
      "english": "cold",
      "transliteration": "baarid"
    },
    {
      "arabic": "لَبِّس",
      "english": "wear (imperative)",
      "transliteration": "labbis"
    },
    {
      "arabic": "جاكيت",
      "english": "jacket",
      "transliteration": "jaakiit"
    },
    {
      "arabic": "الصَّيف",
      "english": "summer",
      "transliteration": "as-sayf"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "Wear a jacket",
        "Stay home",
        "Drink tea",
        "Close the window"
      ],
      "question": "What does mom tell the speaker to do?",
      "correctAnswer": "Wear a jacket"
    },
    {
      "options": [
        "Loves it",
        "Hates it",
        "Doesn't care",
        "It's boring"
      ],
      "question": "How does the speaker feel about winter?",
      "correctAnswer": "Loves it"
    },
    {
      "options": [
        "Summer",
        "Spring",
        "Autumn",
        "Not mentioned"
      ],
      "question": "What was the season before winter?",
      "correctAnswer": "Summer"
    }
  ],
  "audio_url": null,
  "icon": "🧥",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_suuq_bukra`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_suuq_bukra",
  "phase": 4,
  "title": "السُّوق بُكرة",
  "title_english": "The Market Tomorrow",
  "topic": "daily routine",
  "paragraphs": [
    "بُكرة بابا يروح السُّوق. أنا أبغى أجي معاه. ماما تقول: اشتروا خبز وحليب.",
    "بابا يقول: يلا نروح الصُّبح الباكر. السُّوق يِفتح الساعة ثمانية."
  ],
  "english_translation": [
    "Tomorrow dad goes to the market. I want to come with him. Mom says: Buy bread and milk.",
    "Dad says: Let's go early in the morning. The market opens at eight o'clock."
  ],
  "word_mappings": [
    {
      "arabic": "بُكرة",
      "english": "tomorrow (Saudi)",
      "transliteration": "bukra"
    },
    {
      "arabic": "الصُّبح الباكر",
      "english": "early morning",
      "transliteration": "as-subh al-baakir"
    },
    {
      "arabic": "يِفتح",
      "english": "it opens",
      "transliteration": "yiftah"
    },
    {
      "arabic": "الساعة ثمانية",
      "english": "at eight o'clock",
      "transliteration": "as-saaʿa thamaanya"
    },
    {
      "arabic": "حليب",
      "english": "milk",
      "transliteration": "haliib"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "Tomorrow",
        "Today",
        "Every Friday",
        "In the evening"
      ],
      "question": "When does dad go to the market?",
      "correctAnswer": "Tomorrow"
    },
    {
      "options": [
        "Bread and milk",
        "Chicken and rice",
        "Apples and dates",
        "Tea and coffee"
      ],
      "question": "What does mom want them to buy?",
      "correctAnswer": "Bread and milk"
    },
    {
      "options": [
        "At eight",
        "At nine",
        "At seven",
        "At ten"
      ],
      "question": "When does the market open?",
      "correctAnswer": "At eight"
    }
  ],
  "audio_url": null,
  "icon": "🛍️",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_wasit`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_wasit",
  "phase": 4,
  "title": "وَسائِل النَّقل",
  "title_english": "Transport",
  "topic": "transport",
  "paragraphs": [
    "فِي المَدينة وَسائِل نَقل كثيرة. فِيه تاكسي وباص وسَيارة خاصَّة.",
    "بابا عِنده سَيارة. أنا أروح المَدرسة مَعاه. لكن أَحيانًا آخُذ الباص."
  ],
  "english_translation": [
    "In the city there are many types of transport. There is taxi and bus and private car.",
    "Dad has a car. I go to school with him. But sometimes I take the bus."
  ],
  "word_mappings": [
    {
      "arabic": "وَسائِل النَّقل",
      "english": "means of transport",
      "transliteration": "wasaaʾil an-naql"
    },
    {
      "arabic": "تاكسي",
      "english": "taxi",
      "transliteration": "taaksi"
    },
    {
      "arabic": "باص",
      "english": "bus",
      "transliteration": "baas"
    },
    {
      "arabic": "سَيارة خاصَّة",
      "english": "private car",
      "transliteration": "sayyaara khaassa"
    },
    {
      "arabic": "أَحيانًا",
      "english": "sometimes",
      "transliteration": "ahyaanan"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "With dad",
        "By bus",
        "By taxi",
        "Walking"
      ],
      "question": "How does the speaker usually go to school?",
      "correctAnswer": "With dad"
    },
    {
      "options": [
        "The bus",
        "A taxi",
        "A train",
        "Walking"
      ],
      "question": "What transport does the speaker sometimes take?",
      "correctAnswer": "The bus"
    },
    {
      "options": [
        "A car",
        "A bus",
        "A taxi",
        "A motorcycle"
      ],
      "question": "What transport does dad have?",
      "correctAnswer": "A car"
    }
  ],
  "audio_url": null,
  "icon": "🚕",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_4_yoom_tabeeb`

```json
{
  "dialect": "saudi",
  "story_id": "st_4_yoom_tabeeb",
  "phase": 4,
  "title": "يَوم عِنْد الطَّبيب",
  "title_english": "A Day at the Doctor",
  "topic": "health",
  "paragraphs": [
    "أنا مَريض اليَوم. بابا يِاخُذني عِند الدُّكتور. العِيادة قَريبة من البَيت.",
    "الدُّكتور يِقول: افتح فمَّك. يَنظُر ويَقول: ما فيه إلا كِذا، خُذ الدَّواء ثَلاث أيام."
  ],
  "english_translation": [
    "I am sick today. Dad takes me to the doctor. The clinic is near the house.",
    "The doctor says: Open your mouth. He looks and says: It's nothing much, take the medicine for three days."
  ],
  "word_mappings": [
    {
      "arabic": "مَريض",
      "english": "sick",
      "transliteration": "mariiḍ"
    },
    {
      "arabic": "العِيادة",
      "english": "the clinic",
      "transliteration": "al-ʿiyaada"
    },
    {
      "arabic": "الدُّكتور",
      "english": "the doctor",
      "transliteration": "ad-duktuur"
    },
    {
      "arabic": "فمَّك",
      "english": "your mouth",
      "transliteration": "fammak"
    },
    {
      "arabic": "الدَّواء",
      "english": "the medicine",
      "transliteration": "ad-dawaa"
    },
    {
      "arabic": "ثَلاث أيام",
      "english": "three days",
      "transliteration": "thalaath ayyaam"
    }
  ],
  "comprehension_questions": [
    {
      "options": [
        "To the doctor",
        "To school",
        "To the market",
        "To grandma's"
      ],
      "question": "Where does dad take the speaker?",
      "correctAnswer": "To the doctor"
    },
    {
      "options": [
        "Three",
        "One",
        "Five",
        "Seven"
      ],
      "question": "For how many days should the speaker take medicine?",
      "correctAnswer": "Three"
    },
    {
      "options": [
        "Near the house",
        "Far from the house",
        "In Riyadh",
        "At school"
      ],
      "question": "Where is the clinic?",
      "correctAnswer": "Near the house"
    }
  ],
  "audio_url": null,
  "icon": "👨‍⚕️",
  "estimated_duration": 3,
  "reading_level": 4
}
```

## `st_b20`

```json
{
  "dialect": "saudi",
  "story_id": "st_b20",
  "phase": 4,
  "title": "عمّي زيد",
  "title_english": "Uncle Zaid",
  "topic": "family",
  "paragraphs": [
    "عمّي زيد يشتغل فِي الْمَسجد. يروح كل يوم الصبح بدري.",
    "أروح عنده أحياناً وأجلس معه. أحب أسمع كلامه.",
    "يقول لي: الشغل في بيت الله نعمة. أنا أفهم وأقول: الله يحفظك يا عمّي."
  ],
  "english_translation": [
    "My uncle Zaid works at the mosque. He goes every day in the early morning.",
    "I go to see him sometimes and sit with him. I love to listen to him speak.",
    "He says to me: working in the house of God is a blessing. I understand and say: may God protect you, uncle."
  ],
  "word_mappings": {
    "بدري": "early (Saudi word for early)",
    "عمّي": "my uncle (father's brother)",
    "نعمة": "a blessing",
    "أحياناً": "sometimes",
    "الْمَسجد": "the mosque",
    "الله يحفظك": "may God protect you"
  },
  "comprehension_questions": [
    {
      "options": [
        "المستشفى",
        "المسجد",
        "المدرسة",
        "السوق"
      ],
      "question": "وين يشتغل عمّي زيد؟",
      "explanation": "يشتغل في المسجد.",
      "correctAnswer": 1
    },
    {
      "options": [
        "صعب كثير",
        "الشغل في بيت الله نعمة",
        "الراتب قليل",
        "يريد يغيّر شغله"
      ],
      "question": "إيش يقول عمّي زيد عن شغله؟",
      "explanation": "يقول إن الشغل في بيت الله نعمة.",
      "correctAnswer": 1
    }
  ],
  "audio_url": null,
  "icon": "👨",
  "estimated_duration": 5,
  "reading_level": 4
}
```
