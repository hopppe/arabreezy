// Scripted branching conversations. No AI, no audio.
// Each "step" is either:
//   - an assistant turn (speaker: 'partner') — shown as a bubble, user taps "Continue"
//   - a user turn (speaker: 'user') with `options: [{ text, nextStepId, feedback }]`
// The conversation ends when a step has `end: true`.
export default [
  {
    id: 'saudi_convo_greeting',
    phase: 1,
    title: 'Meeting a new friend',
    description: 'Practice introducing yourself using simple Saudi greetings.',
    focalWordIds: ['w_hi_saudi', 'w_howru', 'w_good', 'w_thanks', 'w_goodbye'],
    steps: [
      { id: 's1', speaker: 'partner', text: 'هلا! كيف حالك؟', translation: 'Hey! How are you?', next: 's2' },
      {
        id: 's2',
        speaker: 'user',
        prompt: 'Pick a reply:',
        options: [
          { text: 'زين، شكرا', translation: 'Good, thanks', nextStepId: 's3', correct: true,  feedback: 'Classic Saudi reply — "zain" is "good".' },
          { text: 'لا',          translation: 'No',          nextStepId: 's3', correct: false, feedback: '"No" alone is abrupt. "Zain, shukran" fits better.' },
        ],
      },
      { id: 's3', speaker: 'partner', text: 'مع السلامة!', translation: 'Goodbye!', end: true },
    ],
    completionMessage: 'You held a micro-conversation in Saudi dialect. Try it out loud next time.',
  },

  {
    id: 'saudi_convo_ordering',
    phase: 3,
    title: 'Ordering food',
    description: 'Order a simple meal at a restaurant.',
    focalWordIds: ['w_want', 'w_bread', 'w_water', 'w_rice', 'w_meat', 'w_thanks'],
    steps: [
      { id: 's1', speaker: 'partner', text: 'أهلا! شنو تبغى؟', translation: 'Welcome! What would you like?', next: 's2' },
      {
        id: 's2',
        speaker: 'user',
        prompt: 'Order something:',
        options: [
          { text: 'أبغى رز ولحم', translation: 'I want rice and meat', nextStepId: 's3', correct: true,  feedback: 'Great — "abgha" + the food name is the simplest pattern.' },
          { text: 'شكرا',          translation: 'Thanks',                nextStepId: 's3', correct: false, feedback: 'You skipped the order! Use "abgha..." to ask for something.' },
        ],
      },
      { id: 's3', speaker: 'partner', text: 'وماء؟', translation: 'And water?', next: 's4' },
      {
        id: 's4',
        speaker: 'user',
        prompt: 'Reply:',
        options: [
          { text: 'نعم، من فضلك', translation: 'Yes, please', nextStepId: 's5', correct: true,  feedback: 'Polite and clear.' },
          { text: 'لا',             translation: 'No',          nextStepId: 's5', correct: true,  feedback: 'Also fine — short and direct.' },
        ],
      },
      { id: 's5', speaker: 'partner', text: 'تمام، دقيقة.', translation: 'Alright, one minute.', end: true },
    ],
    completionMessage: 'You navigated ordering in a restaurant. The "abgha..." pattern works for almost any request.',
  },

  {
    id: 'saudi_convo_market',
    phase: 5,
    title: 'At the market',
    description: 'Ask prices and react to them.',
    focalWordIds: ['w_howmuch', 'w_expensive', 'w_cheap', 'w_discount'],
    steps: [
      { id: 's1', speaker: 'partner', text: 'أهلاً! تحب شي؟', translation: 'Welcome! Want anything?', next: 's2' },
      {
        id: 's2',
        speaker: 'user',
        prompt: 'Ask the price:',
        options: [
          { text: 'بكم هذا؟', translation: 'How much is this?', nextStepId: 's3', correct: true,  feedback: 'Good — "bikam hadha" is the standard phrasing.' },
          { text: 'شكرا',      translation: 'Thanks',            nextStepId: 's3', correct: false, feedback: '"Thanks" is polite but doesn\'t get you the price.' },
        ],
      },
      { id: 's3', speaker: 'partner', text: 'مية ريال.', translation: 'One hundred riyals.', next: 's4' },
      {
        id: 's4',
        speaker: 'user',
        prompt: 'React:',
        options: [
          { text: 'غالي شوي', translation: 'A bit expensive', nextStepId: 's5', correct: true,  feedback: 'Nice — soft pushback invites a discount.' },
          { text: 'رخيص',      translation: 'Cheap',            nextStepId: 's5', correct: false, feedback: 'Calling it cheap closes the door on a discount.' },
        ],
      },
      { id: 's5', speaker: 'partner', text: 'أعطيك خصم.', translation: "I'll give you a discount.", end: true },
    ],
    completionMessage: 'Bargaining unlocked. Try these phrases on your next walk through the souq.',
  },

  {
    id: 'saudi_convo_taxi',
    phase: 6,
    title: 'Taking a taxi',
    description: 'Tell a taxi driver where you\'re headed.',
    focalWordIds: ['w_taxi', 'w_airport', 'w_howmuch', 'w_hour'],
    steps: [
      { id: 's1', speaker: 'partner', text: 'وين توديك؟', translation: 'Where to?', next: 's2' },
      {
        id: 's2',
        speaker: 'user',
        prompt: 'Tell the driver:',
        options: [
          { text: 'المطار', translation: 'The airport', nextStepId: 's3', correct: true,  feedback: 'Direct and clear.' },
          { text: 'شكرا',    translation: 'Thanks',       nextStepId: 's3', correct: false, feedback: 'You didn\'t give a destination!' },
        ],
      },
      { id: 's3', speaker: 'partner', text: 'بساعة تقريبا.', translation: 'About an hour.', end: true },
    ],
    completionMessage: 'Clean handoff. Now you can get across the city.',
  },

  {
    id: 'saudi_convo_work',
    phase: 7,
    title: 'Small talk at work',
    description: 'Chat with a colleague.',
    focalWordIds: ['w_colleague', 'w_meeting', 'w_tired', 'w_happy'],
    steps: [
      { id: 's1', speaker: 'partner', text: 'كيف الاجتماع؟', translation: 'How was the meeting?', next: 's2' },
      {
        id: 's2',
        speaker: 'user',
        prompt: 'Reply:',
        options: [
          { text: 'تعبان شوي', translation: 'A bit tired', nextStepId: 's3', correct: true,  feedback: 'Honest and casual — very Saudi.' },
          { text: 'مبسوط',      translation: 'Happy',        nextStepId: 's3', correct: true,  feedback: 'Upbeat answer.' },
        ],
      },
      { id: 's3', speaker: 'partner', text: 'ان شاء الله بكرة أحسن.', translation: 'God willing, tomorrow will be better.', end: true },
    ],
    completionMessage: 'Classic Saudi workplace exchange. "Inshallah" smooths almost any awkward handoff.',
  },
  {
    "id": "saudi_convo_p1_hello_neighbor",
    "phase": 1,
    "title": "Hello, Neighbor",
    "description": "Greet your neighbor when you run into them outside.",
    "focalWordIds": [
      "w_hi_saudi",
      "w_howru",
      "w_good",
      "w_thanks",
      "w_goodbye"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! كيف الحال؟",
        "translation": "Hey! How are you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "هلا! الحمد لله، زين",
            "translation": "Hey! Praise God, I'm good.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "زين is the Saudi word for \"good\" — perfect register."
          },
          {
            "text": "هلا! أنا جيد، شكراً",
            "translation": "Hey! I am fine, thanks.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "جيد is MSA. In Saudi dialect say زين instead."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الله يسلمك، يا هلا!",
        "translation": "God keep you safe, welcome!",
        "end": true
      }
    ],
    "completionMessage": "Great job greeting your neighbor in Saudi style!"
  },
  {
    "id": "saudi_convo_p1_morning_greet",
    "phase": 1,
    "title": "Morning Greeting",
    "description": "Exchange morning greetings with someone you pass on the street.",
    "focalWordIds": [
      "w_good_morning",
      "w_good",
      "w_howru",
      "w_thanks",
      "w_hi_saudi"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "صباح الخير!",
        "translation": "Good morning!",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "صباح النور!",
            "translation": "Morning of light!",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "صباح النور is the classic Saudi response to صباح الخير."
          },
          {
            "text": "مرحبا!",
            "translation": "Hello!",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "مرحبا doesn't match the morning greeting pattern — use صباح النور."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الله يصبحك بالخير!",
        "translation": "May God give you a good morning!",
        "end": true
      }
    ],
    "completionMessage": "You nailed the Saudi morning greeting exchange!"
  },
  {
    "id": "saudi_convo_p1_name_intro",
    "phase": 1,
    "title": "What's Your Name?",
    "description": "Tell someone your name when they ask.",
    "focalWordIds": [
      "w_hi_saudi",
      "w_name",
      "w_my_name",
      "w_whats_your_name",
      "w_nice_to_meet"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! وش اسمك؟",
        "translation": "Hey! What's your name?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "اسمي سارة. وأنت؟",
            "translation": "My name is Sara. And you?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "اسمي is natural in Saudi speech and turning the question back is polite."
          },
          {
            "text": "أنا اسمي سارة، شكراً",
            "translation": "I am my name is Sara, thanks.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أنا اسمي is redundant. Just say اسمي سارة."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "اسمي فهد. تشرفنا!",
        "translation": "My name is Fahad. Nice to meet you!",
        "end": true
      }
    ],
    "completionMessage": "Well done introducing yourself in Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p1_age_ask",
    "phase": 1,
    "title": "How Old Are You?",
    "description": "Answer when someone asks your age in a friendly way.",
    "focalWordIds": [
      "w_hi_saudi",
      "w_age",
      "w_years",
      "w_how_old",
      "w_good"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "عمرك كم سنة؟",
        "translation": "How old are you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "عمري عشرين سنة",
            "translation": "I am twenty years old.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "عمري + number + سنة is the natural Saudi way to state your age."
          },
          {
            "text": "أنا عندي عشرين",
            "translation": "I have twenty.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "عندي works for possessions. For age, use عمري."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "زين، الله يحفظك!",
        "translation": "Good, may God protect you!",
        "end": true
      }
    ],
    "completionMessage": "You answered the age question perfectly!"
  },
  {
    "id": "saudi_convo_p1_simple_thanks",
    "phase": 1,
    "title": "Saying Thank You",
    "description": "Respond properly when someone does something kind for you.",
    "focalWordIds": [
      "w_thanks",
      "w_welcome",
      "w_good",
      "w_hi_saudi",
      "w_please"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تفضل، هذا لك.",
        "translation": "Here you go, this is for you.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "مشكور! الله يعطيك العافية",
            "translation": "Thank you! May God give you health.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "مشكور + الله يعطيك العافية is a warm and natural Saudi thank-you."
          },
          {
            "text": "شكراً جزيلاً لك جداً",
            "translation": "Thank you very very much to you.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "This is too wordy. مشكور or شكراً alone is natural in Saudi speech."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "هلا وغلا! بكل سرور.",
        "translation": "Welcome! My pleasure.",
        "end": true
      }
    ],
    "completionMessage": "That's the warm Saudi way to say thank you!"
  },
  {
    "id": "saudi_convo_p1_saying_goodbye",
    "phase": 1,
    "title": "Saying Goodbye",
    "description": "Say farewell to a friend who is leaving.",
    "focalWordIds": [
      "w_goodbye",
      "w_hi_saudi",
      "w_good",
      "w_see_you",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "يلا، باي باي! مع السلامة.",
        "translation": "Alright, bye bye! Go in peace.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "الله يسلمك! نشوفك بكره.",
            "translation": "God keep you safe! See you tomorrow.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "الله يسلمك is the standard Saudi farewell response to مع السلامة."
          },
          {
            "text": "وداعاً، إلى اللقاء.",
            "translation": "Farewell, until we meet.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "وداعاً is formal MSA. Use الله يسلمك in Saudi conversation."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "إن شاء الله! يلا، باي.",
        "translation": "God willing! Alright, bye.",
        "end": true
      }
    ],
    "completionMessage": "You said goodbye the Saudi way — great job!"
  },
  {
    "id": "saudi_convo_p1_meet_kid",
    "phase": 1,
    "title": "Meeting a Child",
    "description": "Greet a young child you meet for the first time.",
    "focalWordIds": [
      "w_hi_saudi",
      "w_name",
      "w_howru",
      "w_good",
      "w_nice_to_meet"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا صغير! وش اسمك؟",
        "translation": "Hey little one! What's your name?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "اسمي علي. هلا!",
            "translation": "My name is Ali. Hey!",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Short and natural — perfect for a child's reply in Saudi Arabic."
          },
          {
            "text": "يشرفني التعارف، اسمي علي.",
            "translation": "It is an honor to meet you, my name is Ali.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too formal for a child. Keep it simple: اسمي علي."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "هلا هلا يا علي! زين.",
        "translation": "Welcome, welcome Ali! Good.",
        "end": true
      }
    ],
    "completionMessage": "You introduced the child naturally in Saudi dialect!"
  },
  {
    "id": "saudi_convo_p1_meet_uncle",
    "phase": 1,
    "title": "Greeting an Uncle",
    "description": "Greet an older male relative respectfully in the Saudi way.",
    "focalWordIds": [
      "w_hi_saudi",
      "w_howru",
      "w_good",
      "w_thanks",
      "w_uncle"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا يا ولد! كيف حالك؟",
        "translation": "Hey boy! How are you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "الحمد لله زين يا عمي. وأنت؟",
            "translation": "Praise God, I'm well uncle. And you?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "يا عمي shows respect to an older male. Adding وأنت؟ is polite."
          },
          {
            "text": "زين شكراً.",
            "translation": "Good, thanks.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Correct words, but not asking back is a bit abrupt with an elder."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الله يسلمك! هلا وغلا.",
        "translation": "God keep you safe! Welcome.",
        "end": true
      }
    ],
    "completionMessage": "You greeted your uncle respectfully in Saudi style!"
  },
  {
    "id": "saudi_convo_p1_phone_hello",
    "phase": 1,
    "title": "Answering the Phone",
    "description": "Greet a friend when they call you on the phone.",
    "focalWordIds": [
      "w_hi_saudi",
      "w_howru",
      "w_good",
      "w_yes",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! مين معي؟",
        "translation": "Hey! Who am I speaking with?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "هلا! معك نورة. كيف الحال؟",
            "translation": "Hey! It's Noura. How are you?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "معك + name is the natural Saudi way to identify yourself on a call."
          },
          {
            "text": "نعم، أنا هنا.",
            "translation": "Yes, I am here.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "This doesn't answer who you are. Say معك + your name."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أوه نورة! هلا والله. زين؟",
        "translation": "Oh Noura! Hey, really. Good?",
        "end": true
      }
    ],
    "completionMessage": "You answered the phone the Saudi way!"
  },
  {
    "id": "saudi_convo_p1_doorbell",
    "phase": 1,
    "title": "Someone at the Door",
    "description": "Respond when a neighbor knocks at your door.",
    "focalWordIds": [
      "w_hi_saudi",
      "w_yes",
      "w_welcome",
      "w_come_in",
      "w_good"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "السلام عليكم! في أحد؟",
        "translation": "Peace be upon you! Is anyone home?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "وعليكم السلام! هلا، تفضل.",
            "translation": "And upon you peace! Hey, come in.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Responding to السلام عليكم with وعليكم السلام is required, then welcome them in."
          },
          {
            "text": "هلا! مين هناك؟",
            "translation": "Hey! Who's there?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "You must respond to السلام عليكم before anything else."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "مشكور، هلا وغلا!",
        "translation": "Thank you, welcome!",
        "end": true
      }
    ],
    "completionMessage": "You welcomed your neighbor at the door perfectly!"
  },
  {
    "id": "saudi_convo_p1_introduce_friend",
    "phase": 1,
    "title": "Introducing a Friend",
    "description": "Introduce your friend to someone you both just met.",
    "focalWordIds": [
      "w_hi_saudi",
      "w_name",
      "w_my_friend",
      "w_nice_to_meet",
      "w_good"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! وش اسم صاحبك؟",
        "translation": "Hey! What's your friend's name?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "هذا صاحبي خالد. تشرفنا!",
            "translation": "This is my friend Khalid. Nice to meet you!",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "هذا صاحبي + name is the natural Saudi way to introduce a friend."
          },
          {
            "text": "صديقي اسمه خالد.",
            "translation": "My friend is named Khalid.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "صديقي is MSA. In Saudi dialect say صاحبي for \"my friend\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "هلا يا خالد! تشرفنا.",
        "translation": "Hey Khalid! Nice to meet you.",
        "end": true
      }
    ],
    "completionMessage": "You introduced your friend in perfect Saudi style!"
  },
  {
    "id": "saudi_convo_p1_yes_no",
    "phase": 1,
    "title": "Yes or No?",
    "description": "Practice giving a simple yes or no answer to a question.",
    "focalWordIds": [
      "w_yes",
      "w_no",
      "w_good",
      "w_thanks",
      "w_hi_saudi"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "عندك ماء؟",
        "translation": "Do you have water?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "إي، عندي. تفضل!",
            "translation": "Yes, I have some. Here you go!",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "إي is the casual Saudi \"yes\" and عندي matches the verb from the question."
          },
          {
            "text": "نعم، أنا أملك ماءً.",
            "translation": "Yes, I possess water.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too formal and MSA. Use إي عندي in Saudi speech."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "مشكور! الله يعطيك العافية.",
        "translation": "Thank you! May God give you health.",
        "end": true
      }
    ],
    "completionMessage": "You used yes and no naturally in Saudi dialect!"
  },
  {
    "id": "saudi_convo_p1_pronoun_practice",
    "phase": 1,
    "title": "Who Is This?",
    "description": "Practice using pronouns to point out who someone is.",
    "focalWordIds": [
      "w_this",
      "w_he",
      "w_she",
      "w_name",
      "w_hi_saudi"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "مين هذي؟",
        "translation": "Who is this (girl)?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "هذي أختي لمى.",
            "translation": "This is my sister Lama.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "هذي is the Saudi feminine \"this\" — correct use of the pronoun."
          },
          {
            "text": "هذا أختي لمى.",
            "translation": "This (masc.) is my sister Lama.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "هذا is masculine. For a female person use هذي in Saudi dialect."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "هلا يا لمى! تشرفنا.",
        "translation": "Hey Lama! Nice to meet you.",
        "end": true
      }
    ],
    "completionMessage": "You used the right Saudi pronoun — هذي for females!"
  },
  {
    "id": "saudi_convo_p1_at_school",
    "phase": 1,
    "title": "At School",
    "description": "Greet a classmate at the start of the school day.",
    "focalWordIds": [
      "w_hi_saudi",
      "w_howru",
      "w_good",
      "w_thanks",
      "w_name"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! زين؟",
        "translation": "Hey! Good?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "إي والله، زين. وأنت؟",
            "translation": "Yes by God, I'm good. And you?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "إي والله is a natural filler in Saudi speech, and asking وأنت؟ is friendly."
          },
          {
            "text": "بخير الحمد لله.",
            "translation": "I'm fine, praise God.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "بخير is understood but less common in casual Saudi schoolyard talk. زين fits better."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الحمد لله! يلا نروح الفصل.",
        "translation": "Praise God! Come on let's go to class.",
        "end": true
      }
    ],
    "completionMessage": "You greeted your classmate the Saudi way — well done!"
  },
  {
    "id": "saudi_convo_p1_shop_hello",
    "phase": 1,
    "title": "Entering a Shop",
    "description": "Exchange greetings with a shopkeeper when you walk in.",
    "focalWordIds": [
      "w_hi_saudi",
      "w_welcome",
      "w_good",
      "w_please",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا وغلا! أهلاً وسهلاً.",
        "translation": "Welcome! Hello and welcome.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "هلا! الله يسلمك.",
            "translation": "Hey! God keep you safe.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "هلا! الله يسلمك is a warm and natural Saudi response to a shopkeeper's welcome."
          },
          {
            "text": "شكراً جزيلاً على الترحيب.",
            "translation": "Thank you very much for the welcome.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too formal. Keep it simple and warm: هلا! الله يسلمك."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تفضل، كيف أقدر أساعدك؟",
        "translation": "Please, how can I help you?",
        "end": true
      }
    ],
    "completionMessage": "You greeted the shopkeeper naturally in Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p1_neighbor_smile",
    "phase": 1,
    "title": "Passing a Neighbor",
    "description": "Exchange a quick friendly greeting when passing a neighbor.",
    "focalWordIds": [
      "w_hi_saudi",
      "w_howru",
      "w_good",
      "w_goodbye",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! كيفك؟",
        "translation": "Hey! How are you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "هلا! تمام، الحمد لله.",
            "translation": "Hey! Perfect, praise God.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "تمام is a natural Saudi answer meaning \"perfect/all good\"."
          },
          {
            "text": "أنا بصحة جيدة، شكراً.",
            "translation": "I am in good health, thank you.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "بصحة جيدة is stiff MSA. Say تمام or زين instead."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الله يسلمك! يلا باي.",
        "translation": "God keep you safe! Alright bye.",
        "end": true
      }
    ],
    "completionMessage": "Quick and natural — that's the Saudi way to pass a neighbor!"
  },
  {
    "id": "saudi_convo_p1_morning_kids",
    "phase": 1,
    "title": "Good Morning to Kids",
    "description": "Exchange morning greetings with children in the family.",
    "focalWordIds": [
      "w_good_morning",
      "w_hi_saudi",
      "w_good",
      "w_thanks",
      "w_howru"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "يلا يا ولاد! صباح الخير.",
        "translation": "Come on kids! Good morning.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "صباح النور يا بابا!",
            "translation": "Morning of light, Dad!",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "صباح النور is the correct Saudi reply to صباح الخير, with يا بابا being warm and natural."
          },
          {
            "text": "مساء الخير يا بابا!",
            "translation": "Good evening, Dad!",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "مساء الخير is for evenings. It's morning, so say صباح النور."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "زين! يلا فطروا، الأكل جاهز.",
        "translation": "Good! Come on eat breakfast, the food is ready.",
        "end": true
      }
    ],
    "completionMessage": "You responded to the morning greeting correctly!"
  },
  {
    "id": "saudi_convo_p1_late_night",
    "phase": 1,
    "title": "Good Night",
    "description": "Say goodnight before heading to bed.",
    "focalWordIds": [
      "w_good_night",
      "w_goodbye",
      "w_good",
      "w_thanks",
      "w_hi_saudi"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تصبح على خير! أنا رايح أنام.",
        "translation": "Good night! I'm going to sleep.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "وأنت من أهل الخير! تصبح على خير.",
            "translation": "And you are among the good people! Good night.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "وأنت من أهل الخير is the classic Saudi response to تصبح على خير."
          },
          {
            "text": "مساء النور! نوماً هنيئاً.",
            "translation": "Evening of light! Sleep well.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "مساء النور is for early evening. The reply to تصبح على خير is وأنت من أهل الخير."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الله يسلمك! إلى بكره.",
        "translation": "God keep you safe! Until tomorrow.",
        "end": true
      }
    ],
    "completionMessage": "You said goodnight perfectly in Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p1_quick_thanks",
    "phase": 1,
    "title": "Quick Thank You",
    "description": "Thank someone quickly when they help you with a small favor.",
    "focalWordIds": [
      "w_thanks",
      "w_welcome",
      "w_good",
      "w_hi_saudi",
      "w_please"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هذي كتابك، تفضل.",
        "translation": "This is your book, here you go.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "مشكور! الله يعطيك العافية.",
            "translation": "Thank you! May God give you health.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "مشكور is the go-to quick Saudi thank-you, and الله يعطيك العافية adds warmth."
          },
          {
            "text": "جزاك الله خيراً كثيراً.",
            "translation": "May God reward you with much good.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "جزاك الله خيراً is more formal and religious. مشكور is more natural for everyday thanks."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "هلا! بكل سرور.",
        "translation": "Welcome! With pleasure.",
        "end": true
      }
    ],
    "completionMessage": "Quick, warm, and natural — that's Saudi thanks done right!"
  },
  {
    "id": "saudi_convo_p1_friend_intro",
    "phase": 1,
    "title": "Meeting a New Friend",
    "description": "Introduce yourself to someone new at a gathering.",
    "focalWordIds": [
      "w_hi_saudi",
      "w_name",
      "w_my_name",
      "w_nice_to_meet",
      "w_howru"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! أنا محمد. وأنت؟",
        "translation": "Hey! I'm Mohammed. And you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Pick a reply:",
        "options": [
          {
            "text": "هلا يا محمد! أنا ريم. تشرفنا.",
            "translation": "Hey Mohammed! I'm Reem. Nice to meet you.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Greeting by name, introducing yourself, and saying تشرفنا is the full friendly Saudi intro."
          },
          {
            "text": "يسعدني بمقابلتك، اسمي ريم.",
            "translation": "I am pleased to meet you, my name is Reem.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "يسعدني بمقابلتك is stiff MSA. Use تشرفنا for \"nice to meet you\" in Saudi Arabic."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تشرفنا يا ريم! هلا وغلا.",
        "translation": "Nice to meet you Reem! Welcome.",
        "end": true
      }
    ],
    "completionMessage": "You introduced yourself to a new friend in perfect Saudi style!"
  },
  {
    "id": "saudi_convo_p2_my_family",
    "phase": 2,
    "title": "My Family",
    "description": "Talk about your family with a new acquaintance.",
    "focalWordIds": [
      "w_family",
      "w_big",
      "w_small",
      "w_and"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "عندك عيلة كبيرة؟",
        "translation": "Do you have a big family?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them about your family size.",
        "options": [
          {
            "text": "إي، عيلتي كبيرة",
            "translation": "Yes, my family is big.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! Great use of the possessive suffix ـي."
          },
          {
            "text": "لا، عيلتي صغيرة",
            "translation": "No, my family is small.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "صح! That works too — صغيرة means small."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ماشاء الله، عيلتي كبيرة كذلك!",
        "translation": "MashaAllah, my family is big too!",
        "end": true
      }
    ],
    "completionMessage": "Well done! You talked about your family in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_my_brother",
    "phase": 2,
    "title": "My Brother",
    "description": "Tell someone about your brother.",
    "focalWordIds": [
      "w_brother",
      "w_one",
      "w_two",
      "w_how_many"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "كم أخ عندك؟",
        "translation": "How many brothers do you have?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them how many brothers you have.",
        "options": [
          {
            "text": "عندي أخ وحد",
            "translation": "I have one brother.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! وحد is the Saudi way to say \"one\" in this context."
          },
          {
            "text": "عندي أخوين",
            "translation": "I have two brothers.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "صح! أخوين is the dual form — two brothers."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أنا ما عندي أخ، بس عندي أخوات",
        "translation": "I don't have a brother, but I have sisters.",
        "end": true
      }
    ],
    "completionMessage": "Great job! You discussed siblings in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_my_sister",
    "phase": 2,
    "title": "My Sister",
    "description": "Chat about your sister with a friend.",
    "focalWordIds": [
      "w_sister",
      "w_big",
      "w_small",
      "w_older",
      "w_younger"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أختك كبيرة ولا صغيرة؟",
        "translation": "Is your sister older or younger?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Say whether your sister is older or younger.",
        "options": [
          {
            "text": "أختي كبيرة عليّ",
            "translation": "My sister is older than me.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "زين! كبيرة عليّ is a natural Saudi way to say older."
          },
          {
            "text": "أختي صغيرة عليّ",
            "translation": "My sister is younger than me.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "صح! صغيرة عليّ means younger than me."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "زين، أختي صغيرة عليّ بسنتين",
        "translation": "Nice, my sister is younger than me by two years.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You described your sister's age in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_my_mom",
    "phase": 2,
    "title": "My Mom",
    "description": "Talk about your mother with someone.",
    "focalWordIds": [
      "w_mom",
      "w_good",
      "w_how"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "كيف أمك؟",
        "translation": "How is your mom?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them how your mom is doing.",
        "options": [
          {
            "text": "أمي بخير، شكراً",
            "translation": "My mom is fine, thank you.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! بخير is the standard reply for \"fine\"."
          },
          {
            "text": "أمي تعبانة شوي",
            "translation": "My mom is a little tired.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "صح! تعبانة شوي means a little tired — honest answer."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الله يسلمها، أمي بخير كذلك",
        "translation": "May God keep her safe, my mom is fine too.",
        "end": true
      }
    ],
    "completionMessage": "Great work! You talked about your mom in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_my_dad",
    "phase": 2,
    "title": "My Dad",
    "description": "Discuss your father with a colleague.",
    "focalWordIds": [
      "w_dad",
      "w_work",
      "w_where"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "وين يشتغل أبوك؟",
        "translation": "Where does your dad work?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them where your dad works.",
        "options": [
          {
            "text": "أبوي يشتغل في المستشفى",
            "translation": "My dad works at the hospital.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! أبوي is the Saudi possessive form for \"my dad\"."
          },
          {
            "text": "أبوي ما يشتغل، متقاعد",
            "translation": "My dad doesn't work, he's retired.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "زين! متقاعد means retired — great vocab."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ماشاء الله، أبوي يشتغل في الحكومة",
        "translation": "MashaAllah, my dad works for the government.",
        "end": true
      }
    ],
    "completionMessage": "Well done! You discussed your father's work in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_my_house",
    "phase": 2,
    "title": "My House",
    "description": "Describe your home to a new neighbor.",
    "focalWordIds": [
      "w_house",
      "w_big",
      "w_small",
      "w_nice"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "بيتك كبير؟",
        "translation": "Is your house big?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Describe the size of your house.",
        "options": [
          {
            "text": "إي، بيتي كبير وحلو",
            "translation": "Yes, my house is big and nice.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! حلو is a great Saudi word for nice/pretty."
          },
          {
            "text": "لا، بيتي صغير بس كافي",
            "translation": "No, my house is small but enough.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "زين! كافي means sufficient — practical answer."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الله يبارك، بيتي صغير شوي",
        "translation": "May God bless it, my house is a little small.",
        "end": true
      }
    ],
    "completionMessage": "Great job! You described your house in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_my_room",
    "phase": 2,
    "title": "My Room",
    "description": "Chat about your bedroom with a friend.",
    "focalWordIds": [
      "w_room",
      "w_color",
      "w_white",
      "w_blue"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "غرفتك أي لون؟",
        "translation": "What color is your room?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them the color of your room.",
        "options": [
          {
            "text": "غرفتي بيضا",
            "translation": "My room is white.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! بيضا is the Saudi/Gulf form of white."
          },
          {
            "text": "غرفتي زرقا",
            "translation": "My room is blue.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "صح! زرقا is the Saudi form for blue."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "حلو! غرفتي صفرا، أحب اللون الأصفر",
        "translation": "Nice! My room is yellow, I love the color yellow.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You talked about colors in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_my_phone",
    "phase": 2,
    "title": "My Phone",
    "description": "Talk about your phone with a friend.",
    "focalWordIds": [
      "w_phone",
      "w_new",
      "w_old",
      "w_good"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "جوالك جديد؟",
        "translation": "Is your phone new?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them about your phone.",
        "options": [
          {
            "text": "إي، جوالي جديد وزين",
            "translation": "Yes, my phone is new and good.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! جوال is the Saudi word for mobile phone."
          },
          {
            "text": "لا، جوالي قديم",
            "translation": "No, my phone is old.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "صح! قديم means old — good use of the adjective."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "جوالي كذلك قديم، أبغى جوال جديد",
        "translation": "My phone is old too, I want a new phone.",
        "end": true
      }
    ],
    "completionMessage": "Great work! You discussed your phone in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_drink_tea",
    "phase": 2,
    "title": "Drinking Tea",
    "description": "Accept or decline tea from a host.",
    "focalWordIds": [
      "w_tea",
      "w_want",
      "w_yes",
      "w_no",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تبغى شاي؟",
        "translation": "Do you want tea?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond to the offer of tea.",
        "options": [
          {
            "text": "إي، أبغى شاي، شكراً",
            "translation": "Yes, I want tea, thank you.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! أبغى is the Saudi way to say \"I want\"."
          },
          {
            "text": "لا، شكراً، ما أبغى",
            "translation": "No, thank you, I don't want any.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "زين! Politely declining is also correct."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تفضل، الشاي جاهز",
        "translation": "Here you go, the tea is ready.",
        "end": true
      }
    ],
    "completionMessage": "Well done! You accepted or declined tea in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_drink_water",
    "phase": 2,
    "title": "Drinking Water",
    "description": "Ask for or offer water.",
    "focalWordIds": [
      "w_water",
      "w_cold",
      "w_want",
      "w_please"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تبغى ماء بارد؟",
        "translation": "Do you want cold water?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond to the offer of water.",
        "options": [
          {
            "text": "إي، أبغى ماء، لو سمحت",
            "translation": "Yes, I want water, please.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! لو سمحت is the Saudi way to say please."
          },
          {
            "text": "لا، ما أبغى شكراً",
            "translation": "No, I don't want any, thank you.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "صح! Polite refusal is always appropriate."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تفضل، الماء بارد وحلو",
        "translation": "Here you go, the water is cold and good.",
        "end": true
      }
    ],
    "completionMessage": "Great job! You handled a water offer in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_eat_bread",
    "phase": 2,
    "title": "Eating Bread",
    "description": "Talk about eating bread at a meal.",
    "focalWordIds": [
      "w_bread",
      "w_eat",
      "w_want",
      "w_fresh"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تبغى خبز؟ الخبز طازج",
        "translation": "Do you want bread? The bread is fresh.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond to the offer of fresh bread.",
        "options": [
          {
            "text": "إي، أبغى خبز، يعطيك العافية",
            "translation": "Yes, I want bread, may God bless your effort.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! يعطيك العافية is a warm Saudi expression of thanks."
          },
          {
            "text": "لا، شكراً، أنا شبعان",
            "translation": "No, thank you, I am full.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "صح! شبعان means full — a natural response."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تفضل، كل ما تبغى",
        "translation": "Here, eat as much as you want.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You navigated a food offer in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_my_friend",
    "phase": 2,
    "title": "My Friend",
    "description": "Introduce or mention your friend.",
    "focalWordIds": [
      "w_friend",
      "w_good",
      "w_name",
      "w_where"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "عندك أصحاب هنا؟",
        "translation": "Do you have friends here?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them about your friends.",
        "options": [
          {
            "text": "إي، صاحبي هنا وزين",
            "translation": "Yes, my friend is here and is nice.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! صاحبي is the Saudi word for my friend (male)."
          },
          {
            "text": "لا، ما عندي أصحاب هنا",
            "translation": "No, I don't have friends here.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "زين! Honest answer — أصحاب is the plural of صاحب."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أنا كذلك أبغى أعرف أصحاب جدد",
        "translation": "I also want to meet new friends.",
        "end": true
      }
    ],
    "completionMessage": "Great work! You talked about friends in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_my_car",
    "phase": 2,
    "title": "My Car",
    "description": "Discuss your car's color with a neighbor.",
    "focalWordIds": [
      "w_car",
      "w_color",
      "w_white",
      "w_black",
      "w_red"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أي لون سيارتك؟",
        "translation": "What color is your car?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them the color of your car.",
        "options": [
          {
            "text": "سيارتي بيضا",
            "translation": "My car is white.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! بيضا is the Saudi colloquial feminine form of white."
          },
          {
            "text": "سيارتي حمرا",
            "translation": "My car is red.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "صح! حمرا is the colloquial form of red — well done."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "حلو! سيارتي سودا، أحب الأسود",
        "translation": "Nice! My car is black, I love black.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You described your car's color in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_my_school",
    "phase": 2,
    "title": "My School",
    "description": "Talk about your school with a classmate.",
    "focalWordIds": [
      "w_school",
      "w_big",
      "w_near",
      "w_far"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "مدرستك قريبة؟",
        "translation": "Is your school nearby?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them if your school is near or far.",
        "options": [
          {
            "text": "إي، مدرستي قريبة من بيتي",
            "translation": "Yes, my school is close to my house.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! You used two possessive suffixes — مدرستي and بيتي."
          },
          {
            "text": "لا، مدرستي بعيدة شوي",
            "translation": "No, my school is a little far.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "زين! بعيدة شوي means a little far — natural Saudi phrase."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "مدرستي بعيدة، أركب السيارة كل يوم",
        "translation": "My school is far, I ride the car every day.",
        "end": true
      }
    ],
    "completionMessage": "Well done! You talked about your school in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_my_work",
    "phase": 2,
    "title": "My Work",
    "description": "Mention your workplace in conversation.",
    "focalWordIds": [
      "w_work",
      "w_near",
      "w_far",
      "w_good"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "شغلك قريب من بيتك؟",
        "translation": "Is your work close to your house?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them about your commute to work.",
        "options": [
          {
            "text": "إي، شغلي قريب، الحمد لله",
            "translation": "Yes, my work is close, thank God.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! الحمد لله is a natural Saudi expression of gratitude."
          },
          {
            "text": "لا، شغلي بعيد علي",
            "translation": "No, my work is far from me.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "صح! بعيد علي is a natural Saudi way to say it's far."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "شغلي بعيد شوي، بس أحبه",
        "translation": "My work is a little far, but I love it.",
        "end": true
      }
    ],
    "completionMessage": "Great job! You discussed your work in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_have_kids",
    "phase": 2,
    "title": "Do You Have Kids?",
    "description": "Answer questions about whether you have children.",
    "focalWordIds": [
      "w_kids",
      "w_one",
      "w_two",
      "w_three",
      "w_yes",
      "w_no"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "عندك أولاد؟",
        "translation": "Do you have kids?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond about whether you have children.",
        "options": [
          {
            "text": "إي، عندي ولدين",
            "translation": "Yes, I have two kids.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! ولدين is the dual — two children."
          },
          {
            "text": "لا، ما عندي أولاد بعد",
            "translation": "No, I don't have kids yet.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "زين! بعد here means \"yet\" — a perfectly natural answer."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ماشاء الله، عندي ثلاثة أولاد",
        "translation": "MashaAllah, I have three kids.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You handled a question about children in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_no_thanks",
    "phase": 2,
    "title": "No, Thanks",
    "description": "Practice politely declining an offer.",
    "focalWordIds": [
      "w_coffee",
      "w_no",
      "w_thanks",
      "w_want"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تبغى قهوة؟",
        "translation": "Do you want coffee?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Politely decline the coffee offer.",
        "options": [
          {
            "text": "لا، شكراً، ما أبغى",
            "translation": "No, thank you, I don't want any.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! This is the most natural polite refusal in Saudi Arabic."
          },
          {
            "text": "إي، أبغى قهوة",
            "translation": "Yes, I want coffee.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "صح، بس — this scenario was about declining! Still a valid answer though."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ماشي، تقدر تطلب أي وقت",
        "translation": "Okay, you can ask anytime.",
        "end": true
      }
    ],
    "completionMessage": "Great work! You practiced politely declining in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_yes_please",
    "phase": 2,
    "title": "Yes, Please",
    "description": "Practice accepting an offer graciously.",
    "focalWordIds": [
      "w_juice",
      "w_yes",
      "w_please",
      "w_want",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تبغى عصير؟",
        "translation": "Do you want juice?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Accept the juice offer politely.",
        "options": [
          {
            "text": "إي، لو سمحت، أبغى عصير",
            "translation": "Yes, please, I want juice.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! لو سمحت is the Saudi way to say please when making a request."
          },
          {
            "text": "لا، شكراً، ما أبغى",
            "translation": "No, thank you, I don't want any.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "زين — declining is fine too, but the scenario was about accepting."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تفضل، العصير طازج اليوم",
        "translation": "Here you go, the juice is fresh today.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You accepted an offer graciously in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_count_family",
    "phase": 2,
    "title": "Counting Family Members",
    "description": "Count family members using numbers 1–5.",
    "focalWordIds": [
      "w_one",
      "w_two",
      "w_three",
      "w_four",
      "w_five",
      "w_family",
      "w_how_many"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "كم واحد في عيلتك؟",
        "translation": "How many people are in your family?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them how many people are in your family.",
        "options": [
          {
            "text": "في عيلتي أربعة أشخاص",
            "translation": "There are four people in my family.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! أربعة is four — great number usage."
          },
          {
            "text": "في عيلتي خمسة أشخاص",
            "translation": "There are five people in my family.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "زين! خمسة is five — well done using numbers."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عيلتي ثلاثة أشخاص بس، عيلة صغيرة",
        "translation": "My family is only three people, a small family.",
        "end": true
      }
    ],
    "completionMessage": "Great job! You used numbers 1–5 to describe your family in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p2_color_my_car",
    "phase": 2,
    "title": "The Color of My Car",
    "description": "Discuss car colors using Saudi color vocabulary.",
    "focalWordIds": [
      "w_car",
      "w_color",
      "w_black",
      "w_white",
      "w_red",
      "w_blue",
      "w_like"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تحب أي لون للسيارة؟",
        "translation": "What color do you like for a car?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them your favorite car color.",
        "options": [
          {
            "text": "أنا أحب الأبيض، سيارتي بيضا",
            "translation": "I like white, my car is white.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! Great use of both the adjective and the possessive سيارتي."
          },
          {
            "text": "أنا أحب الأسود، سيارتي سودا",
            "translation": "I like black, my car is black.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أحسنت! سودا is the Saudi colloquial form of black."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أنا أحب الأزرق، بس سيارتي حمرا الحين",
        "translation": "I like blue, but my car is red right now.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You discussed car colors using Saudi Arabic vocabulary."
  },
  {
    "id": "saudi_convo_p3_order_coffee",
    "phase": 3,
    "title": "Order a Coffee",
    "description": "Order a cup of Saudi coffee at a cafe.",
    "focalWordIds": [
      "w_coffee",
      "w_want",
      "w_please",
      "w_thanks",
      "w_yes"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا، تبغى شنو؟",
        "translation": "Hey, what do you want?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Order your coffee.",
        "options": [
          {
            "text": "أبغى قهوة، لو سمحت",
            "translation": "I want a coffee, please.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أبغى is the natural Saudi way to say \"I want.\" Perfect register."
          },
          {
            "text": "أريد قهوة من فضلك",
            "translation": "I want a coffee, please.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد and من فضلك are MSA. In Saudi, say أبغى and لو سمحت."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "كيف تبغاها؟ بهيل ولا بدونه؟",
        "translation": "How do you want it? With cardamom or without?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Answer how you want your coffee.",
        "options": [
          {
            "text": "بهيل، شكراً",
            "translation": "With cardamom, thanks.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "هيل is cardamom — very Saudi! Great choice."
          },
          {
            "text": "بدون هيل، شكراً",
            "translation": "Without cardamom, thanks.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "بدون هيل works too — that is a valid Saudi answer."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "حاضر، بجي عليك!",
        "translation": "Sure, coming right up!",
        "end": true
      }
    ],
    "completionMessage": "You ordered coffee like a local — شاطر!"
  },
  {
    "id": "saudi_convo_p3_order_tea",
    "phase": 3,
    "title": "Order a Tea",
    "description": "Ask for a glass of tea at a small shop.",
    "focalWordIds": [
      "w_tea",
      "w_want",
      "w_please",
      "w_yes",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً، تبغى شنو؟",
        "translation": "Welcome, what do you want?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Order a tea.",
        "options": [
          {
            "text": "أبغى شاي، لو سمحت",
            "translation": "I want a tea, please.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Spot on! أبغى + drink + لو سمحت is perfect Saudi ordering style."
          },
          {
            "text": "عندي شاي؟",
            "translation": "Do you have tea?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "عندي means \"I have\" — use تبغى or أبغى when ordering."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "حلو ولا سادة؟",
        "translation": "Sweet or plain?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Choose how you want your tea.",
        "options": [
          {
            "text": "حلو، شكراً",
            "translation": "Sweet, thanks.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "حلو means sweet — a natural, concise Saudi answer."
          },
          {
            "text": "سادة بدون سكر",
            "translation": "Plain without sugar.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "سادة already means plain/unsweetened, so بدون سكر is redundant but understandable."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تفضل!",
        "translation": "Here you go!",
        "end": true
      }
    ],
    "completionMessage": "Great job ordering tea in Saudi style!"
  },
  {
    "id": "saudi_convo_p3_order_bread",
    "phase": 3,
    "title": "Order Bread",
    "description": "Buy a loaf of bread from a bakery.",
    "focalWordIds": [
      "w_bread",
      "w_want",
      "w_please",
      "w_how_much",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا، تبغى شنو؟",
        "translation": "Hey, what do you need?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask for bread.",
        "options": [
          {
            "text": "أبغى خبز، لو سمحت",
            "translation": "I want bread, please.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "خبز is bread — great use of أبغى for ordering."
          },
          {
            "text": "أنا جوعان",
            "translation": "I am hungry.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "جوعان says you are hungry but does not order anything. Use أبغى خبز."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "كم رغيف تبغى؟",
        "translation": "How many loaves do you want?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Tell him how many loaves.",
        "options": [
          {
            "text": "أبغى اثنين، شكراً",
            "translation": "I want two, thanks.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "اثنين is the Saudi way to say two — perfect."
          },
          {
            "text": "كثير",
            "translation": "A lot.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "كثير is vague. It is better to give a number like واحد or اثنين."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تفضل، الله يبارك",
        "translation": "Here you go, God bless.",
        "end": true
      }
    ],
    "completionMessage": "You bought bread like a natural — ممتاز!"
  },
  {
    "id": "saudi_convo_p3_water_please",
    "phase": 3,
    "title": "Water, Please",
    "description": "Ask for water at a restaurant.",
    "focalWordIds": [
      "w_water",
      "w_want",
      "w_please",
      "w_cold",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تبغى تشرب شنو؟",
        "translation": "What do you want to drink?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask for water.",
        "options": [
          {
            "text": "أبغى ماء، لو سمحت",
            "translation": "I want water, please.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ماء is water and لو سمحت is the Saudi way to say please — perfect."
          },
          {
            "text": "ماء بارد",
            "translation": "Cold water.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "ماء بارد works but adding لو سمحت is more polite in Saudi interactions."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "بارد ولا عادي؟",
        "translation": "Cold or room temperature?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Choose your preference.",
        "options": [
          {
            "text": "بارد، شكراً",
            "translation": "Cold, thanks.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "بارد is cold — a natural, polite one-word Saudi answer."
          },
          {
            "text": "ما أبغى ماء",
            "translation": "I do not want water.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "ما أبغى means you do not want it — that contradicts your earlier request."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "أهلاً وسهلاً، بجي عليك",
        "translation": "Of course, coming right up.",
        "end": true
      }
    ],
    "completionMessage": "You handled ordering water smoothly — زين!"
  },
  {
    "id": "saudi_convo_p3_order_rice",
    "phase": 3,
    "title": "Order Rice",
    "description": "Order a plate of rice (kabsa) at a Saudi restaurant.",
    "focalWordIds": [
      "w_rice",
      "w_want",
      "w_please",
      "w_eat",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "وش تبغى تاكل؟",
        "translation": "What do you want to eat?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Order rice.",
        "options": [
          {
            "text": "أبغى كبسة، لو سمحت",
            "translation": "I want kabsa, please.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "كبسة is the iconic Saudi rice dish — excellent choice and register."
          },
          {
            "text": "أريد أرز من فضلك",
            "translation": "I want rice, please.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد and من فضلك are MSA. Use أبغى and لو سمحت in Saudi."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "بدجاج ولا بلحم؟",
        "translation": "With chicken or with meat?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Choose your protein.",
        "options": [
          {
            "text": "بدجاج، شكراً",
            "translation": "With chicken, thanks.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "دجاج is chicken — natural, clean answer."
          },
          {
            "text": "بلحم",
            "translation": "With meat.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "بلحم works, though adding شكراً makes it more polite."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "ماشاء الله، بجي عليك قريب",
        "translation": "MashaAllah, coming to you soon.",
        "end": true
      }
    ],
    "completionMessage": "You ordered a full kabsa meal in Saudi Arabic — شاطر!"
  },
  {
    "id": "saudi_convo_p3_order_fruit",
    "phase": 3,
    "title": "Buy Fruit",
    "description": "Buy fruit at the market.",
    "focalWordIds": [
      "w_fruit",
      "w_want",
      "w_how_much",
      "w_please",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا، تبغى شنو؟",
        "translation": "Hey, what do you want?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask for fruit.",
        "options": [
          {
            "text": "أبغى فاكهة، لو سمحت",
            "translation": "I want fruit, please.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "فاكهة is fruit — great use of أبغى for market shopping."
          },
          {
            "text": "فاكهة بكم؟",
            "translation": "How much is the fruit?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Asking the price first without greeting or ordering can seem abrupt. Start with أبغى."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تبغى بطيخ ولا عنب؟",
        "translation": "Do you want watermelon or grapes?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Choose your fruit.",
        "options": [
          {
            "text": "أبغى بطيخ، شكراً",
            "translation": "I want watermelon, thanks.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "بطيخ is watermelon — a classic Saudi summer fruit pick."
          },
          {
            "text": "أبغى عنب",
            "translation": "I want grapes.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "عنب is grapes — correct vocabulary, just add شكراً to be polite."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تفضل، ريال ونص",
        "translation": "Here you go, one and a half riyals.",
        "end": true
      }
    ],
    "completionMessage": "Great shopping trip to the fruit market — أحسنت!"
  },
  {
    "id": "saudi_convo_p3_pay_cashier",
    "phase": 3,
    "title": "Pay at the Cashier",
    "description": "Pay for your items at a shop checkout.",
    "focalWordIds": [
      "w_how_much",
      "w_pay",
      "w_thanks",
      "w_yes",
      "w_no"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "الحساب خمسة وعشرين ريال",
        "translation": "The bill is twenty-five riyals.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond to the cashier.",
        "options": [
          {
            "text": "تفضل، شكراً",
            "translation": "Here you go, thanks.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "تفضل when handing money and شكراً is the natural Saudi cashier exchange."
          },
          {
            "text": "كم الحساب؟",
            "translation": "How much is the bill?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "The cashier already told you the amount — no need to ask again."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تبغى فاتورة؟",
        "translation": "Do you want a receipt?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Respond about the receipt.",
        "options": [
          {
            "text": "إي، لو سمحت",
            "translation": "Yes, please.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "إي is the casual Saudi yes — very natural here."
          },
          {
            "text": "لا، شكراً",
            "translation": "No, thanks.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "لا شكراً works fine — both answers are polite and natural."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تفضل، الله يسلمك!",
        "translation": "Here you go, God keep you safe!",
        "end": true
      }
    ],
    "completionMessage": "You paid and handled the checkout in Saudi Arabic — ممتاز!"
  },
  {
    "id": "saudi_convo_p3_phone_credit",
    "phase": 3,
    "title": "Buy Phone Credit",
    "description": "Top up your phone at a mobile shop.",
    "focalWordIds": [
      "w_phone",
      "w_want",
      "w_how_much",
      "w_please",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا، تبغى شنو؟",
        "translation": "Hey, what do you want?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask for phone credit.",
        "options": [
          {
            "text": "أبغى رصيد للجوال، لو سمحت",
            "translation": "I want phone credit, please.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "رصيد للجوال is exactly how Saudis ask for phone credit — perfect."
          },
          {
            "text": "أريد شحن هاتف",
            "translation": "I want to charge a phone.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد is MSA and شحن هاتف usually means charging not credit. Use رصيد للجوال."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "كم تبغى؟ عشرة ولا عشرين؟",
        "translation": "How much do you want? Ten or twenty?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Pick an amount.",
        "options": [
          {
            "text": "عشرة ريال، شكراً",
            "translation": "Ten riyals, thanks.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "عشرة ريال is clear and concise — great Saudi response."
          },
          {
            "text": "عشرين من فضلك",
            "translation": "Twenty please.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "عشرين works, but use لو سمحت instead of من فضلك in Saudi dialect."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تفضل، الرصيد جاك",
        "translation": "Here you go, the credit is loaded.",
        "end": true
      }
    ],
    "completionMessage": "You topped up your phone credit in Saudi style — شاطر!"
  },
  {
    "id": "saudi_convo_p3_meet_cousin",
    "phase": 3,
    "title": "Meet Your Cousin",
    "description": "Greet a cousin you have not seen in a while.",
    "focalWordIds": [
      "w_hi_saudi",
      "w_how",
      "w_good",
      "w_family",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا والله! كيفك؟ زمان ما شفتك!",
        "translation": "Hey! How are you? Long time no see!",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Greet your cousin back.",
        "options": [
          {
            "text": "هلا! الحمد لله، زين. وأنت؟",
            "translation": "Hey! Thank God, fine. And you?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Returning the greeting with وأنت is warm and natural in Saudi culture."
          },
          {
            "text": "أهلاً، أنا بخير",
            "translation": "Hello, I am fine.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "بخير is more MSA. Use زين for the Saudi register, and turn the question back."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الحمد لله. عيلتك كيف؟",
        "translation": "Thank God. How is your family?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Tell your cousin about your family.",
        "options": [
          {
            "text": "الحمد لله، كلهم زينين",
            "translation": "Thank God, they are all doing well.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "كلهم زينين is beautifully Saudi — warm and natural family talk."
          },
          {
            "text": "عائلتي جيدة، شكراً",
            "translation": "My family is good, thanks.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "جيدة is MSA. Use زينين for the Saudi dialect feel."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الله يحفظهم، نلتقي قريب إن شاء الله!",
        "translation": "God keep them, we will meet soon God willing!",
        "end": true
      }
    ],
    "completionMessage": "You caught up with your cousin in pure Saudi style — أحسنت!"
  },
  {
    "id": "saudi_convo_p3_at_pharmacy_basic",
    "phase": 3,
    "title": "At the Pharmacy",
    "description": "Ask for basic medicine at a pharmacy.",
    "focalWordIds": [
      "w_want",
      "w_sick",
      "w_please",
      "w_thanks",
      "w_yes"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا، تبغى شنو؟",
        "translation": "Hey, what do you need?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell the pharmacist you are sick and need medicine.",
        "options": [
          {
            "text": "أنا مريض وأبغى دواء، لو سمحت",
            "translation": "I am sick and I want medicine, please.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "مريض for sick and دواء for medicine — both perfect vocabulary here."
          },
          {
            "text": "عندي دواء؟",
            "translation": "Do I have medicine?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "عندي means \"I have\" not \"do you have.\" Say عندك دواء? if asking if they have medicine."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "شنو عندك؟ صداع ولا زكام؟",
        "translation": "What do you have? Headache or cold?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Tell him what you have.",
        "options": [
          {
            "text": "عندي صداع",
            "translation": "I have a headache.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "عندي صداع is natural Saudi — عندي is used for ailments and possessions alike."
          },
          {
            "text": "أنا تعبان شوي",
            "translation": "I am a bit tired/unwell.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "تعبان شوي works but is vague. It is better to name the symptom like صداع."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تفضل، هذا الدواء يساعدك",
        "translation": "Here, this medicine will help you.",
        "end": true
      }
    ],
    "completionMessage": "You visited the pharmacy in Saudi Arabic — well done!"
  },
  {
    "id": "saudi_convo_p3_ask_directions_simple",
    "phase": 3,
    "title": "Ask for Simple Directions",
    "description": "Ask where the nearest shop is.",
    "focalWordIds": [
      "w_where",
      "w_near",
      "w_right",
      "w_left",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا، في شنو؟",
        "translation": "Hey, can I help you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask where the nearest shop is.",
        "options": [
          {
            "text": "وين أقرب دكان؟",
            "translation": "Where is the nearest shop?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "وين is the Saudi word for \"where\" — much better than أين which is MSA."
          },
          {
            "text": "أين أقرب محل؟",
            "translation": "Where is the nearest shop?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أين is MSA. Use وين for the Saudi dialect register."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الدكان يمين، بعد الإشارة",
        "translation": "The shop is to the right, after the traffic light.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Confirm you understood.",
        "options": [
          {
            "text": "يمين بعد الإشارة، شكراً",
            "translation": "Right after the traffic light, thanks.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Repeating directions back and saying شكراً is a polite and natural Saudi exchange."
          },
          {
            "text": "ما أعرف",
            "translation": "I do not know.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "ما أعرف means you do not know — not appropriate here when you just got directions."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "عفواً، الله يوفقك!",
        "translation": "You are welcome, God grant you success!",
        "end": true
      }
    ],
    "completionMessage": "You asked for directions in Saudi Arabic — شاطر!"
  },
  {
    "id": "saudi_convo_p3_dinner_at_home",
    "phase": 3,
    "title": "Dinner at Home",
    "description": "Sit down for dinner with your household.",
    "focalWordIds": [
      "w_eat",
      "w_hungry",
      "w_good",
      "w_ready",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "العشاء حاضر! تعال",
        "translation": "Dinner is ready! Come.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond eagerly.",
        "options": [
          {
            "text": "جوعان! جاي",
            "translation": "I am hungry! Coming.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "جوعان is the Saudi word for hungry — very natural response."
          },
          {
            "text": "أنا آتي الآن",
            "translation": "I am coming now.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "آتي الآن is MSA. A more natural Saudi response is جاي حالاً or just جاي."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تبغى أرز ولا خبز؟",
        "translation": "Do you want rice or bread?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Choose what you want.",
        "options": [
          {
            "text": "أبغى أرز، شكراً",
            "translation": "I want rice, thanks.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أبغى is the right Saudi word for wanting — clean and polite."
          },
          {
            "text": "أبغى الاثنين!",
            "translation": "I want both!",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "الاثنين for both is understandable, though الاثنين زين is even more natural."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تفضل، بالعافية!",
        "translation": "Here you go, bon appetit!",
        "end": true
      }
    ],
    "completionMessage": "You sat down for a Saudi dinner perfectly — أحسنت!"
  },
  {
    "id": "saudi_convo_p3_visit_friend",
    "phase": 3,
    "title": "Visit a Friend",
    "description": "Arrive at a friend's place for a casual visit.",
    "focalWordIds": [
      "w_hi_saudi",
      "w_how",
      "w_good",
      "w_come_in",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا والله! اهلين، تفضل داخل",
        "translation": "Hey! Welcome, come on in.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Greet your friend at the door.",
        "options": [
          {
            "text": "هلا! الله يسلمك، شكراً",
            "translation": "Hey! God keep you safe, thanks.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "الله يسلمك is a warm Saudi response to a welcome — great register."
          },
          {
            "text": "مرحباً، شكراً جزيلاً",
            "translation": "Hello, thank you very much.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "شكراً جزيلاً is a bit formal here. هلا والله or الله يسلمك is more natural with a friend."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تبغى قهوة ولا شاي؟",
        "translation": "Do you want coffee or tea?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Tell your friend what you want.",
        "options": [
          {
            "text": "أبغى قهوة، شكراً",
            "translation": "I want coffee, thanks.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Saying أبغى and accepting hospitality is the warm Saudi social norm."
          },
          {
            "text": "لا شكراً، ما أبغى شيء",
            "translation": "No thanks, I do not want anything.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Declining tea or coffee with a Saudi host can seem a bit rude. Accepting is warmer."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تفضل، اجلس، بسيطة عليك!",
        "translation": "Here, sit down, make yourself at home!",
        "end": true
      }
    ],
    "completionMessage": "You visited your friend with perfect Saudi social graces — ممتاز!"
  },
  {
    "id": "saudi_convo_p3_lunch_with_coworker",
    "phase": 3,
    "title": "Lunch with a Coworker",
    "description": "Decide what to eat for lunch with a coworker.",
    "focalWordIds": [
      "w_eat",
      "w_want",
      "w_hungry",
      "w_where",
      "w_good"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "الغداء؟ تبغى تاكل وين؟",
        "translation": "Lunch? Where do you want to eat?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Suggest a place to eat.",
        "options": [
          {
            "text": "أبغى أكل كبسة، وين فيه؟",
            "translation": "I want to eat kabsa, where is there some?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Suggesting كبسة and asking وين فيه is very natural Saudi lunch talk."
          },
          {
            "text": "أنا لا أعرف",
            "translation": "I do not know.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "ما أعرف is more natural than لا أعرف in Saudi. Try suggesting something instead."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "في مطعم زين قريب، تبغى نروح؟",
        "translation": "There is a good restaurant nearby, do you want to go?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Agree to go.",
        "options": [
          {
            "text": "إي، يلا نروح!",
            "translation": "Yes, let us go!",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "يلا نروح is the perfect Saudi call to action — very energetic and natural."
          },
          {
            "text": "نعم، سأذهب معك",
            "translation": "Yes, I will go with you.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "سأذهب is MSA future tense. Use يلا نروح or أروح معك for a Saudi feel."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "يلا، بالعافية مسبقاً!",
        "translation": "Let us go, bon appetit in advance!",
        "end": true
      }
    ],
    "completionMessage": "Lunch plans sorted in Saudi Arabic — شاطر!"
  },
  {
    "id": "saudi_convo_p3_order_dates",
    "phase": 3,
    "title": "Order Dates",
    "description": "Buy dates at a market stall.",
    "focalWordIds": [
      "w_want",
      "w_how_much",
      "w_please",
      "w_thanks",
      "w_good"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا، تبغى تمر؟",
        "translation": "Hey, would you like dates?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Say yes and ask for some dates.",
        "options": [
          {
            "text": "إي، أبغى تمر، لو سمحت",
            "translation": "Yes, I want dates, please.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "إي is the casual Saudi yes and تمر is dates — excellent."
          },
          {
            "text": "نعم، أريد تمراً",
            "translation": "Yes, I want dates.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "نعم and أريد are MSA. Use إي and أبغى for Saudi dialect."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "كيلو بكم تبغى؟",
        "translation": "How many kilos do you want?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask for one kilo.",
        "options": [
          {
            "text": "كيلو وحد، شكراً",
            "translation": "One kilo, thanks.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "وحد for one in this context is natural Saudi market speech."
          },
          {
            "text": "كيلو واحد فقط",
            "translation": "Just one kilo.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "واحد فقط is understood but وحد is the more natural Saudi choice."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تفضل، عجوة مميزة!",
        "translation": "Here you go, premium Ajwa dates!",
        "end": true
      }
    ],
    "completionMessage": "You bought dates at the market like a local — أحسنت!"
  },
  {
    "id": "saudi_convo_p3_invite_to_tea",
    "phase": 3,
    "title": "Invite Someone for Tea",
    "description": "Invite a neighbor to come in for tea.",
    "focalWordIds": [
      "w_tea",
      "w_come",
      "w_want",
      "w_please",
      "w_yes"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! وين رايح؟",
        "translation": "Hey! Where are you going?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Invite your neighbor for tea.",
        "options": [
          {
            "text": "هلا! تبغى شاي عندي؟",
            "translation": "Hey! Do you want tea at my place?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "تبغى شاي عندي is a warm, natural Saudi invitation — well done."
          },
          {
            "text": "هل تريد أن تشرب شاياً؟",
            "translation": "Would you like to drink tea?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too MSA. A more natural Saudi invite is تبغى شاي عندي or تعال اشرب شاي."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "والله، بس عندي شغل شوي. كم دقيقة؟",
        "translation": "By God, I have a bit of work. How many minutes?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Reassure them it will be quick.",
        "options": [
          {
            "text": "بس كوب واحد، عشر دقايق!",
            "translation": "Just one cup, ten minutes!",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "دقايق is the Saudi plural of دقيقة — great colloquial form."
          },
          {
            "text": "لا تقلق، سريع",
            "translation": "Do not worry, quick.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "سريع works but بس كوب واحد gives a more specific and friendly reassurance."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "زين، تعال!",
        "translation": "OK, come on!",
        "end": true
      }
    ],
    "completionMessage": "You extended a warm Saudi tea invitation — ممتاز!"
  },
  {
    "id": "saudi_convo_p3_borrow_pen",
    "phase": 3,
    "title": "Borrow a Pen",
    "description": "Ask a classmate if you can borrow a pen.",
    "focalWordIds": [
      "w_want",
      "w_please",
      "w_yes",
      "w_no",
      "w_thanks"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا، في شنو؟",
        "translation": "Hey, what is up?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask to borrow a pen.",
        "options": [
          {
            "text": "عندك قلم؟ أبغى أستعير، لو سمحت",
            "translation": "Do you have a pen? I want to borrow one, please.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "عندك for \"do you have\" and أبغى أستعير for borrowing — excellent natural Saudi ask."
          },
          {
            "text": "هل يمكنني استعارة قلم؟",
            "translation": "May I borrow a pen?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "هل يمكنني is very formal MSA. Use عندك قلم? أبغى أستعير لو سمحت instead."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "إي، عندي، تفضل",
        "translation": "Yes, I have one, here you go.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Thank your classmate.",
        "options": [
          {
            "text": "شكراً، يعطيك العافية!",
            "translation": "Thanks, may God reward you!",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "يعطيك العافية is a warm Saudi expression of gratitude — very natural here."
          },
          {
            "text": "شكراً جداً",
            "translation": "Thank you very much.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "شكراً جداً is understood but يعطيك العافية sounds more naturally Saudi."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الله يعافيك!",
        "translation": "God grant you health!",
        "end": true
      }
    ],
    "completionMessage": "You borrowed a pen with perfect Saudi courtesy — شاطر!"
  },
  {
    "id": "saudi_convo_p3_what_time",
    "phase": 3,
    "title": "What Time Is It?",
    "description": "Ask someone for the time on the street.",
    "focalWordIds": [
      "w_time",
      "w_how_much",
      "w_thanks",
      "w_yes",
      "w_please"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا، في شنو؟",
        "translation": "Hey, what is up?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask for the time.",
        "options": [
          {
            "text": "لو سمحت، كم الساعة؟",
            "translation": "Excuse me, what time is it?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "كم الساعة is the natural Saudi way to ask for the time — clean and polite."
          },
          {
            "text": "ما الوقت الآن؟",
            "translation": "What is the time now?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "ما الوقت الآن is MSA. Use كم الساعة in Saudi dialect."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الساعة ثلاثة وربع",
        "translation": "It is a quarter past three.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Thank the person.",
        "options": [
          {
            "text": "شكراً، الله يسلمك!",
            "translation": "Thanks, God keep you safe!",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "الله يسلمك is a classic Saudi sign-off — warm and natural after receiving help."
          },
          {
            "text": "شكراً فقط",
            "translation": "Just thanks.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "شكراً alone is fine but adding الله يسلمك sounds much more natural in Saudi."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الله يسلمك، مع السلامة!",
        "translation": "God keep you safe, goodbye!",
        "end": true
      }
    ],
    "completionMessage": "You asked for the time like a Saudi local — أحسنت!"
  },
  {
    "id": "saudi_convo_p3_quick_introduce",
    "phase": 3,
    "title": "Quick Introduction",
    "description": "Introduce yourself briefly to a new colleague.",
    "focalWordIds": [
      "w_name",
      "w_my_name",
      "w_from_where",
      "w_work",
      "w_nice_to_meet"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا، أنا فيصل. وأنت؟",
        "translation": "Hey, I am Faisal. And you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Introduce yourself.",
        "options": [
          {
            "text": "أنا سارة، تشرفنا!",
            "translation": "I am Sara, nice to meet you!",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "تشرفنا is the warm Saudi way to say nice to meet you — perfect."
          },
          {
            "text": "اسمي سارة وأنا من المملكة",
            "translation": "My name is Sara and I am from the Kingdom.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Correct but a bit long. A quick اسمي سارة، تشرفنا is more natural for a first hello."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "من وين أنتِ يا سارة؟",
        "translation": "Where are you from, Sara?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Say where you are from.",
        "options": [
          {
            "text": "أنا من الرياض. وأنت؟",
            "translation": "I am from Riyadh. And you?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Saying your city and turning the question back is natural and friendly."
          },
          {
            "text": "من السعودية",
            "translation": "From Saudi Arabia.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Correct but vague. Naming a city like الرياض or جدة is more natural."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "أنا من جدة، يسعدنا!",
        "translation": "I am from Jeddah, our pleasure!",
        "end": true
      }
    ],
    "completionMessage": "Quick and natural introduction done right — ممتاز!"
  },
  {
    "id": "saudi_convo_p3_simple_compliment",
    "phase": 3,
    "title": "Give a Simple Compliment",
    "description": "Compliment a friend on something they are wearing or did.",
    "focalWordIds": [
      "w_good",
      "w_nice",
      "w_like",
      "w_thanks",
      "w_hi_saudi"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! كيفك اليوم؟",
        "translation": "Hey! How are you today?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Greet them and give a compliment.",
        "options": [
          {
            "text": "هلا! الحمد لله، زين. ثوبك حلو!",
            "translation": "Hey! Thank God, good. Your thobe is nice!",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "حلو for nice and ثوب for the traditional Saudi garment — very natural compliment."
          },
          {
            "text": "أنا بخير. ملابسك جميلة",
            "translation": "I am fine. Your clothes are beautiful.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "بخير is MSA. Use زين, and حلو is a warmer Saudi compliment than جميلة in casual speech."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الله يسلمك! يعجبك اللون؟",
        "translation": "God keep you safe! Do you like the color?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Say you like the color.",
        "options": [
          {
            "text": "إي والله، اللون حلو جداً!",
            "translation": "Yes by God, the color is very nice!",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "إي والله is an enthusiastic Saudi affirmation — very natural and warm."
          },
          {
            "text": "نعم، اللون جميل",
            "translation": "Yes, the color is beautiful.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "نعم is MSA. Use إي or إي والله for a more natural Saudi tone."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الله يبارك فيك، يسعدني!",
        "translation": "God bless you, it makes me happy!",
        "end": true
      }
    ],
    "completionMessage": "You gave a warm Saudi compliment — أحسنت!"
  },
  {
    "id": "saudi_convo_p4_ask_directions_mosque",
    "phase": 4,
    "title": "How Do I Get to the Mosque?",
    "description": "Ask a passerby for directions to the nearest mosque.",
    "focalWordIds": [
      "w_mosque",
      "w_right",
      "w_left",
      "w_straight",
      "w_go"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أيوه، أقدر أساعدك؟",
        "translation": "Yes, can I help you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask where the mosque is:",
        "options": [
          {
            "text": "وين المسجد من هنا؟",
            "translation": "Where is the mosque from here?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "وين is the Saudi word for \"where\" — perfect register."
          },
          {
            "text": "أين المسجد من هنا؟",
            "translation": "Where is the mosque from here?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أين is MSA. In Saudi dialect say وين instead."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "امشي على طول، وبعدين لف يمين عند الإشارة.",
        "translation": "Go straight, then turn right at the traffic light.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Confirm you understood:",
        "options": [
          {
            "text": "زين، على طول وبعدين يمين — شكراً!",
            "translation": "Good, straight then right — thanks!",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Repeating the directions back is natural and polite in Saudi conversation."
          },
          {
            "text": "لا أفهم، قل لي مرة ثانية.",
            "translation": "I don't understand, tell me again.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "If you understood, confirm it — asking again when you heard clearly can seem rude."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الله يوفقك، المسجد قريب!",
        "translation": "May God grant you success, the mosque is close!",
        "end": true
      }
    ],
    "completionMessage": "Great job asking for directions to the mosque in Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p4_ask_directions_bakery",
    "phase": 4,
    "title": "Where is the Bakery?",
    "description": "Find a bakery by asking someone on the street.",
    "focalWordIds": [
      "w_bread",
      "w_right",
      "w_left",
      "w_straight",
      "w_where"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا، تبي شي؟",
        "translation": "Hey, do you want something?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask where the bakery is:",
        "options": [
          {
            "text": "وين المخبز القريب من هنا؟",
            "translation": "Where is the nearest bakery from here?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "وين + location is the standard Saudi way to ask directions."
          },
          {
            "text": "هل يوجد مخبز قريب؟",
            "translation": "Is there a nearby bakery?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "هل يوجد is formal MSA. In Saudi dialect say في مخبز قريب? or وين المخبز؟"
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "في مخبز شارع البلد، روح يسار بعد البنك.",
        "translation": "There is a bakery on Al-Balad street, go left after the bank.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Thank them properly:",
        "options": [
          {
            "text": "يسلموا، الله يعطيك العافية!",
            "translation": "Thank you, may God give you health!",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "الله يعطيك العافية is the classic Saudi thank-you phrase for help."
          },
          {
            "text": "أوكي، شكراً جزيلاً جداً.",
            "translation": "OK, very many thanks.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "شكراً جزيلاً is fine, but الله يعطيك العافية sounds much more natural in Saudi context."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "وإياك، تفضل!",
        "translation": "And you too, go ahead!",
        "end": true
      }
    ],
    "completionMessage": "You found the bakery with great Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p4_what_time_is_it",
    "phase": 4,
    "title": "What Time Is It?",
    "description": "Ask someone for the time and respond when they ask back.",
    "focalWordIds": [
      "w_now",
      "w_today",
      "w_yawm",
      "w_subh",
      "w_layl"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "لو سمحت، كم الساعة الحين؟",
        "translation": "Excuse me, what time is it now?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them the time:",
        "options": [
          {
            "text": "الساعة ثلاثة وربع.",
            "translation": "It is quarter past three.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "الساعة + time is the natural Saudi way to state the time."
          },
          {
            "text": "الوقت هو الثالثة وخمسة عشر دقيقة.",
            "translation": "The time is three fifteen minutes.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too formal. Simply say الساعة ثلاثة وربع — ربع means quarter in everyday speech."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "شكراً! وين تروح الحين؟",
        "translation": "Thanks! Where are you going now?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Say where you are going:",
        "options": [
          {
            "text": "أروح السوق، عندي شغل هناك.",
            "translation": "I'm going to the market, I have work there.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أروح is the correct Saudi 1st-person present for \"I go/am going\"."
          },
          {
            "text": "سأذهب إلى السوق للعمل.",
            "translation": "I will go to the market to work.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "سأذهب is MSA future. In Saudi dialect say أروح for \"I am going\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الله يوفقك في شغلك!",
        "translation": "May God grant you success in your work!",
        "end": true
      }
    ],
    "completionMessage": "You handled the time question like a Saudi local!"
  },
  {
    "id": "saudi_convo_p4_where_going",
    "phase": 4,
    "title": "Where Are You Off To?",
    "description": "Chat with a neighbour who asks where you are headed.",
    "focalWordIds": [
      "w_go",
      "w_market",
      "w_now",
      "w_mosque",
      "w_where"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! وين رايح؟",
        "translation": "Hey! Where are you headed?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them where you are going:",
        "options": [
          {
            "text": "أروح المسجد، الصلاة بعد شوي.",
            "translation": "I'm heading to the mosque, prayer is in a bit.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أروح is the Saudi present-tense verb for going — great use of dialect."
          },
          {
            "text": "ذاهب إلى المسجد للصلاة.",
            "translation": "Going to the mosque to pray.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "ذاهب is MSA. The Saudi equivalent is رايح or أروح."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "والله! أنا كمان أروح. نروح سوا؟",
        "translation": "Really! I am going too. Shall we go together?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Agree to go together:",
        "options": [
          {
            "text": "تمام، نروح سوا — يالله!",
            "translation": "Great, let's go together — let's go!",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "يالله is the classic Saudi \"let's go\" — energetic and natural."
          },
          {
            "text": "نعم، يمكننا الذهاب معاً.",
            "translation": "Yes, we can go together.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Correct meaning but too MSA. Say تمام، نروح سوا! for natural Saudi flow."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "زين، يالله نمشي!",
        "translation": "Good, let's walk!",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You navigated a casual Saudi outing chat!"
  },
  {
    "id": "saudi_convo_p4_visit_aunt",
    "phase": 4,
    "title": "Visiting Auntie",
    "description": "Tell a friend you are going to visit your aunt today.",
    "focalWordIds": [
      "w_today",
      "w_yawm",
      "w_go",
      "w_come",
      "w_mother"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "وش برنامجك اليوم؟",
        "translation": "What are your plans today?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them your plan:",
        "options": [
          {
            "text": "أزور عمتي اليوم، ما شفتها من زمان.",
            "translation": "I am visiting my aunt today, I haven't seen her in a while.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أزور is a natural Saudi 1st-person present — well done."
          },
          {
            "text": "سوف أزور عمتي في هذا اليوم.",
            "translation": "I will visit my aunt on this day.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "سوف أزور is MSA future. In casual Saudi speech say أزور or رايح أزور."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ما شاء الله، وين تسكن عمتك؟",
        "translation": "MashaAllah, where does your aunt live?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Say where your aunt lives:",
        "options": [
          {
            "text": "تسكن في حي النسيم، قريبة من هنا.",
            "translation": "She lives in Al-Naseem neighbourhood, near here.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "في + location is the correct Saudi locative construction."
          },
          {
            "text": "هي مقيمة بمنطقة حي النسيم.",
            "translation": "She resides in the area of Al-Naseem district.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "مقيمة is too formal. تسكن في is the natural Saudi expression for \"she lives in\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "ربك يسلمها، بلغها السلام!",
        "translation": "May God keep her safe, send her my greetings!",
        "end": true
      }
    ],
    "completionMessage": "Nicely done! You shared your family visit plan in smooth Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p4_go_to_market",
    "phase": 4,
    "title": "Heading to the Market",
    "description": "A shopkeeper greets you as you arrive at the market.",
    "focalWordIds": [
      "w_market",
      "w_bread",
      "w_meat",
      "w_go",
      "w_want"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً وسهلاً! تبي شي اليوم؟",
        "translation": "Welcome! Do you want something today?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Say what you want to buy:",
        "options": [
          {
            "text": "أبي خبز وشوية خضار.",
            "translation": "I want bread and some vegetables.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أبي is the Saudi form of \"I want\" — authentic and natural."
          },
          {
            "text": "أريد شراء الخبز والخضروات.",
            "translation": "I want to buy bread and vegetables.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد is MSA. In Saudi dialect use أبي for \"I want\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عندنا خبز طازج وخضار كثير. كمان تبي شي ثاني؟",
        "translation": "We have fresh bread and lots of vegetables. Do you want anything else?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask if they have chicken:",
        "options": [
          {
            "text": "عندكم دجاج كمان؟",
            "translation": "Do you have chicken too?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "عندكم? is the simple Saudi way to ask if something is available."
          },
          {
            "text": "هل لديكم دجاج أيضاً؟",
            "translation": "Do you have chicken as well?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "هل لديكم is MSA. Say عندكم? for a natural Saudi question."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "أيوه، دجاج طازج! تفضل معي.",
        "translation": "Yes, fresh chicken! Come with me.",
        "end": true
      }
    ],
    "completionMessage": "You shopped at the Saudi market like a pro!"
  },
  {
    "id": "saudi_convo_p4_taxi_to_mall",
    "phase": 4,
    "title": "Taxi to the Mall",
    "description": "Hail a taxi and tell the driver where you want to go.",
    "focalWordIds": [
      "w_go",
      "w_now",
      "w_right",
      "w_straight",
      "w_market"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! وين تبي تروح؟",
        "translation": "Hey! Where do you want to go?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell the driver your destination:",
        "options": [
          {
            "text": "أروح المول، من فضلك.",
            "translation": "I am going to the mall, please.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أروح + destination is the natural Saudi way to give the driver your destination."
          },
          {
            "text": "أريد الذهاب إلى المركز التجاري.",
            "translation": "I want to go to the shopping centre.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too formal. Just say أروح المول — short and natural in Saudi dialect."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تمام، بس في زحمة الحين. يمكن ناخذ طريق ثاني؟",
        "translation": "OK, but there is traffic now. Can we take another route?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Agree to the alternate route:",
        "options": [
          {
            "text": "لا بأس، روح اللي تشوف فيه.",
            "translation": "No problem, go whichever way you see fit.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "لا بأس is the perfect relaxed Saudi agreement — trusting and natural."
          },
          {
            "text": "نعم، يمكنك أخذ طريق مختلف.",
            "translation": "Yes, you may take a different route.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Grammatically fine but too formal. لا بأس، روح اللي تشوف flows much better in Saudi conversation."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "زين، إن شاء الله نوصل بسرعة!",
        "translation": "Good, God willing we will arrive quickly!",
        "end": true
      }
    ],
    "completionMessage": "You handled the taxi ride in fluent Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p4_call_friend",
    "phase": 4,
    "title": "Calling a Friend",
    "description": "Phone a friend to check if they are free to meet up.",
    "focalWordIds": [
      "w_friend",
      "w_now",
      "w_go",
      "w_come",
      "w_today"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "آلو؟ هلا وغلا!",
        "translation": "Hello? Hey, welcome!",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask if your friend is free now:",
        "options": [
          {
            "text": "هلا! فاضي الحين؟ أبي أجي أشوفك.",
            "translation": "Hey! Are you free now? I want to come see you.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "فاضي is the Saudi word for \"free/available\" and أجي is the correct 1st-person present for \"come\"."
          },
          {
            "text": "هل أنت متاح الآن؟ أريد أن أزورك.",
            "translation": "Are you available now? I want to visit you.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "متاح and أريد أن are MSA. Say فاضي and أبي أجي for Saudi register."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "والله أنا في البيت، تعال! أجيب غداء؟",
        "translation": "Honestly I am at home, come! Shall I bring lunch?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Accept the invitation warmly:",
        "options": [
          {
            "text": "يسلموا! ما يحتاج تكلف، أجي بس أشوفك.",
            "translation": "Thank you! No need to fuss, I am just coming to see you.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ما يحتاج تكلف is the gracious Saudi way to say \"don't go to any trouble\"."
          },
          {
            "text": "لا شكراً، لست بحاجة لطعام.",
            "translation": "No thank you, I do not need food.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Too blunt and formal. ما يحتاج تكلف is warmer and more natural in Saudi culture."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "خير إن شاء الله، بنتظرك!",
        "translation": "Fine God willing, I will wait for you!",
        "end": true
      }
    ],
    "completionMessage": "You made plans with your friend in perfect Saudi style!"
  },
  {
    "id": "saudi_convo_p4_morning_routine",
    "phase": 4,
    "title": "Morning Routine Chat",
    "description": "Talk about what you do every morning with a colleague.",
    "focalWordIds": [
      "w_subh",
      "w_coffee",
      "w_tea",
      "w_today",
      "w_now"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "صباح الخير! شربت قهوتك الصبح؟",
        "translation": "Good morning! Did you drink your morning coffee?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Say you always drink tea in the morning:",
        "options": [
          {
            "text": "أشرب شاي كل صبح، ما أقدر أبدأ بدونه!",
            "translation": "I drink tea every morning, I can't start without it!",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أشرب is the correct Saudi 1st-person present for \"I drink\" — great use of the verb."
          },
          {
            "text": "أنا أفضل شرب الشاي في الصباح.",
            "translation": "I prefer drinking tea in the morning.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أفضل شرب is MSA style. أشرب شاي كل صبح is more natural and direct in Saudi dialect."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "شاي! مثل أهلنا الكبار. وش تاكل الصبح؟",
        "translation": "Tea! Just like our elders. What do you eat in the morning?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Tell them what you eat for breakfast:",
        "options": [
          {
            "text": "آكل خبز مع بيض، بسيط بس كافي.",
            "translation": "I eat bread with eggs, simple but enough.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "آكل is the natural Saudi 1st-person present for \"I eat\" — well done."
          },
          {
            "text": "في الصباح أتناول الخبز مع البيض.",
            "translation": "In the morning I have bread with eggs.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "أتناول is formal MSA. آكل is the natural Saudi word for \"I eat\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "زين! الفطور الصحي يعطيك طاقة طول اليوم.",
        "translation": "Good! A healthy breakfast gives you energy all day.",
        "end": true
      }
    ],
    "completionMessage": "You chatted about your morning routine in authentic Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p4_what_eating",
    "phase": 4,
    "title": "What Are You Eating?",
    "description": "A friend spots you eating and asks what you have.",
    "focalWordIds": [
      "w_meat",
      "w_chicken",
      "w_rice",
      "w_bread",
      "w_good"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "وش تاكل؟ يبدو حلو!",
        "translation": "What are you eating? It looks good!",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them what you are eating:",
        "options": [
          {
            "text": "آكل رز مع دجاج، جربه معي!",
            "translation": "I am eating rice with chicken, try it with me!",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "آكل is the correct Saudi present-tense form for \"I eat/am eating\" — natural and warm."
          },
          {
            "text": "أنا آكل طبق من الأرز والدجاج.",
            "translation": "I am eating a plate of rice and chicken.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Grammatically fine but awkwardly formal. Drop أنا and say آكل رز مع دجاج directly."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ما شاء الله، من وين؟",
        "translation": "MashaAllah, from where?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Tell them where the food is from:",
        "options": [
          {
            "text": "من المطعم اللي في الزاوية، أكله زين جداً.",
            "translation": "From the restaurant on the corner, their food is really good.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "في + location is the correct Saudi locative pattern — well used."
          },
          {
            "text": "اشتريته من مطعم قريب من الزاوية.",
            "translation": "I bought it from a nearby restaurant on the corner.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Correct but a bit wordy. من المطعم اللي في الزاوية is crisper and more natural."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "صحتين! بكرة أجرب معك إن شاء الله.",
        "translation": "Bon appétit! Tomorrow I will try with you God willing.",
        "end": true
      }
    ],
    "completionMessage": "You described your meal perfectly in Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p4_where_working",
    "phase": 4,
    "title": "Where Do You Work?",
    "description": "Someone you just met asks about your job.",
    "focalWordIds": [
      "w_maktab",
      "w_madrasa",
      "w_now",
      "w_today",
      "w_go"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "وين تشتغل؟",
        "translation": "Where do you work?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them where you work:",
        "options": [
          {
            "text": "أشتغل في مكتب في وسط المدينة.",
            "translation": "I work in an office in the city centre.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أشتغل is the correct Saudi 1st-person present for \"I work\" — excellent."
          },
          {
            "text": "أعمل في مكتب بوسط المدينة.",
            "translation": "I work in an office in the city centre.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أعمل is MSA. In Saudi dialect say أشتغل for \"I work\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "زين! بعيد عن بيتك؟",
        "translation": "Good! Is it far from your house?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Say it is close and you walk:",
        "options": [
          {
            "text": "لا، قريب. أمشي كل يوم، ما أحتاج سيارة.",
            "translation": "No, it is close. I walk every day, I don't need a car.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أمشي is the natural Saudi 1st-person present for walking — great dialect use."
          },
          {
            "text": "كلا، إنه قريب وأذهب سيراً على الأقدام.",
            "translation": "No, it is close and I go on foot.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "أذهب سيراً على الأقدام is MSA. أمشي is how Saudi speakers say \"I walk\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "والله صحتك! المشي مفيد جداً.",
        "translation": "Wow good for you! Walking is very beneficial.",
        "end": true
      }
    ],
    "completionMessage": "You talked about your job and commute in natural Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p4_at_park",
    "phase": 4,
    "title": "At the Park",
    "description": "Strike up a conversation with someone sitting near you at the park.",
    "focalWordIds": [
      "w_good",
      "w_today",
      "w_layl",
      "w_subh",
      "w_now"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! الجو زين اليوم، مو كذا؟",
        "translation": "Hey! The weather is nice today, isn't it?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Agree and say you come here often:",
        "options": [
          {
            "text": "أيوه، زين جداً! أجي هنا كل يوم أتمشى.",
            "translation": "Yes, very nice! I come here every day to walk.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أجي is the Saudi 1st-person present for \"I come\" — perfectly used."
          },
          {
            "text": "نعم، الجو لطيف. أزور هذا المكان بانتظام.",
            "translation": "Yes, the weather is pleasant. I visit this place regularly.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أزور هذا المكان بانتظام is too formal. أجي هنا كل يوم is natural Saudi speech."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ما شاء الله، وين تسكن؟ قريب من هنا؟",
        "translation": "MashaAllah, where do you live? Near here?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Say you live nearby:",
        "options": [
          {
            "text": "أيوه، أسكن في الحي اللي وراء، خمس دقايق مشي.",
            "translation": "Yes, I live in the neighbourhood behind, five minutes walk.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أسكن في is the natural Saudi way to say where you live."
          },
          {
            "text": "أسكن في منطقة مجاورة لهذا الحديقة.",
            "translation": "I live in an area adjacent to this park.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Too formal and unnatural. أسكن في الحي اللي وراء is how Saudi speakers describe their neighbourhood."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "قريب! لازم نتقابل هنا مرة ثانية.",
        "translation": "Close by! We must meet here again.",
        "end": true
      }
    ],
    "completionMessage": "You made a new friend at the park with great Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p4_borrow_money_small",
    "phase": 4,
    "title": "Can You Lend Me a Little?",
    "description": "Ask a friend to lend you a small amount of money.",
    "focalWordIds": [
      "w_want",
      "w_good",
      "w_thanks",
      "w_now",
      "w_friend"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! كيفك اليوم؟",
        "translation": "Hey! How are you today?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Greet back and make your request:",
        "options": [
          {
            "text": "زين الحمد لله! أبي أطلب منك شي، تقدر تسلفني عشرة ريال؟",
            "translation": "Good praise God! I want to ask you something, can you lend me ten riyals?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أبي أطلب is the natural Saudi way to introduce a request — polite and direct."
          },
          {
            "text": "أنا بحاجة إلى قرض بسيط منك.",
            "translation": "I need a small loan from you.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "بحاجة إلى قرض is formal MSA. أبي تسلفني is the natural Saudi phrasing for borrowing money."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أكيد! عشرة ريال ولا يهمك. متى ترد؟",
        "translation": "Of course! Ten riyals no problem. When will you pay back?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Promise to pay back tomorrow:",
        "options": [
          {
            "text": "أرد عليك بكرة، وعد!",
            "translation": "I will pay you back tomorrow, promise!",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "بكرة is the Saudi word for \"tomorrow\" and وعد seals the deal naturally."
          },
          {
            "text": "سأعيد المبلغ غداً إن شاء الله.",
            "translation": "I will return the amount tomorrow God willing.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "سأعيد المبلغ is MSA. Say أرد عليك بكرة — that's how Saudis promise repayment."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "لا يهمك، بيننا وبين الله!",
        "translation": "Don't worry about it, it's between us and God!",
        "end": true
      }
    ],
    "completionMessage": "You handled a friendly money request gracefully in Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p4_pick_up_kids",
    "phase": 4,
    "title": "Picking Up the Kids",
    "description": "Call the school to let them know you are on your way to pick up your children.",
    "focalWordIds": [
      "w_madrasa",
      "w_come",
      "w_now",
      "w_go",
      "w_today"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "آلو، مدرسة الأمل، كيف أساعدك؟",
        "translation": "Hello, Al-Amal School, how can I help you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Say you are coming to pick up your children:",
        "options": [
          {
            "text": "هلا، أجي أاخذ أولادي الحين، وصلت بعد شوي.",
            "translation": "Hi, I am coming to pick up my children now, I will arrive in a bit.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أجي is the correct Saudi 1st-person present for \"I am coming\" — perfect."
          },
          {
            "text": "مرحباً، سأحضر لأخذ أطفالي الآن.",
            "translation": "Hello, I will come to take my children now.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "سأحضر is MSA. Say أجي for \"I am coming\" in Saudi dialect."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تمام، وش اسم الطالب؟",
        "translation": "OK, what is the student's name?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give the name and confirm you are near:",
        "options": [
          {
            "text": "محمد العمري، أنا الحين في الطريق، قريب منكم.",
            "translation": "Mohammed Al-Omari, I am now on the way, close to you.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "الحين is the Saudi word for \"now\" — great authentic dialect use."
          },
          {
            "text": "اسمه محمد العمري وأنا في طريقي إليكم حالياً.",
            "translation": "His name is Mohammed Al-Omari and I am on my way to you now.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "حالياً is MSA. الحين is the natural Saudi equivalent for \"now\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "زين، بنجهز الأطفال عند الباب.",
        "translation": "Good, we will have the children ready at the door.",
        "end": true
      }
    ],
    "completionMessage": "You handled the school call like a Saudi parent pro!"
  },
  {
    "id": "saudi_convo_p4_after_work",
    "phase": 4,
    "title": "After Work",
    "description": "Chat with a colleague about your plans right after work.",
    "focalWordIds": [
      "w_go",
      "w_now",
      "w_market",
      "w_house",
      "w_today"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "خلصنا! وين تروح بعد الشغل؟",
        "translation": "We're done! Where are you going after work?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Say you are going home first then to the market:",
        "options": [
          {
            "text": "أروح البيت أول، وبعدين أروح السوق.",
            "translation": "I am going home first, then to the market.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أروح repeated naturally chains destinations — excellent Saudi sentence structure."
          },
          {
            "text": "سأذهب إلى المنزل أولاً ثم إلى السوق.",
            "translation": "I will go home first then to the market.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "سأذهب is MSA future. أروح is the Saudi present used for future plans too."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ما شاء الله! تبي نروح السوق سوا؟",
        "translation": "MashaAllah! Do you want us to go to the market together?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Agree and suggest a time to meet:",
        "options": [
          {
            "text": "تمام! أنتهي في البيت بعد ساعة، نتقابل عند السوق؟",
            "translation": "OK! I will be done at home in an hour, shall we meet at the market?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "نتقابل is the natural Saudi way to suggest meeting up."
          },
          {
            "text": "حسناً، سنلتقي عند السوق بعد ساعة واحدة.",
            "translation": "OK, we will meet at the market after one hour.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "سنلتقي is MSA. نتقابل is the Saudi way to say \"let's meet\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "زين، نتقابل عند الباب الرئيسي بعد ساعة!",
        "translation": "Good, we will meet at the main entrance in an hour!",
        "end": true
      }
    ],
    "completionMessage": "You made after-work plans smoothly in Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p4_weekend_plans",
    "phase": 4,
    "title": "Weekend Plans",
    "description": "Talk about what you will do over the weekend.",
    "focalWordIds": [
      "w_tomorrow",
      "w_today",
      "w_go",
      "w_market",
      "w_mosque"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "وش برنامجك نهاية الأسبوع؟",
        "translation": "What are your plans for the weekend?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Share your weekend plans:",
        "options": [
          {
            "text": "بكرة أروح المسجد الصبح، وبعدين أزور أهلي.",
            "translation": "Tomorrow I'm going to the mosque in the morning, then visiting my family.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "بكرة for \"tomorrow\" and أروح for present-going — authentic Saudi register."
          },
          {
            "text": "في عطلة نهاية الأسبوع سأذهب إلى المسجد وأزور الأسرة.",
            "translation": "During the weekend I will go to the mosque and visit the family.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "سأذهب is MSA. أروح is how Saudis express future plans in everyday speech."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ما شاء الله! وبعد الزيارة؟",
        "translation": "MashaAllah! And after the visit?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Say you will rest at home:",
        "options": [
          {
            "text": "أرجع البيت وأستريح، الله يسلمك.",
            "translation": "I will go back home and rest, God keep you safe.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أرجع and أستريح chain naturally — well-formed Saudi sentence."
          },
          {
            "text": "سأعود إلى المنزل وأرتاح بعد ذلك.",
            "translation": "I will return home and rest after that.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "سأعود is MSA. أرجع البيت is the Saudi way to say \"I'm going back home\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "والله عندك برنامج حلو، ربك يوفقك!",
        "translation": "Wow you have a nice plan, may God grant you success!",
        "end": true
      }
    ],
    "completionMessage": "You described your weekend plans beautifully in Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p4_doctor_appointment",
    "phase": 4,
    "title": "Doctor Appointment",
    "description": "Call the hospital clinic to schedule an appointment.",
    "focalWordIds": [
      "w_hospital",
      "w_tomorrow",
      "w_today",
      "w_now",
      "w_want"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "آلو، مستشفى الملك فهد، مع خدمة المواعيد.",
        "translation": "Hello, King Fahd Hospital, appointment services.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask to schedule a doctor appointment:",
        "options": [
          {
            "text": "هلا، أبي أحجز موعد عند الدكتور.",
            "translation": "Hi, I want to book a doctor appointment.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أبي is the Saudi 1st-person \"I want\" — short, direct, and natural."
          },
          {
            "text": "مرحباً، أريد تحديد موعد مع الطبيب.",
            "translation": "Hello, I want to set an appointment with the doctor.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد is MSA. Use أبي for \"I want\" in Saudi Arabic."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تمام. تبي اليوم ولا بكرة؟",
        "translation": "OK. Do you want today or tomorrow?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Say you prefer tomorrow morning:",
        "options": [
          {
            "text": "بكرة أحسن لو في موعد الصبح.",
            "translation": "Tomorrow is better if there is a morning appointment.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "بكرة is the Saudi word for \"tomorrow\" — perfect use with lو for preference."
          },
          {
            "text": "أفضل غداً صباحاً إذا أمكن.",
            "translation": "I prefer tomorrow morning if possible.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "غداً is MSA. بكرة is the Saudi word for tomorrow — use it for natural dialect."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تمام، حجزنا لك بكرة الساعة تسعة الصبح.",
        "translation": "OK, we have booked you for tomorrow at nine in the morning.",
        "end": true
      }
    ],
    "completionMessage": "You booked a doctor appointment perfectly in Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p4_late_apologize",
    "phase": 4,
    "title": "Sorry I'm Late!",
    "description": "Apologise to a friend for arriving late to a meeting.",
    "focalWordIds": [
      "w_now",
      "w_go",
      "w_good",
      "w_thanks",
      "w_come"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "وين كنت؟! انتظرتك ساعة كاملة!",
        "translation": "Where were you?! I waited a whole hour for you!",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Apologise and explain you were stuck in traffic:",
        "options": [
          {
            "text": "آسف والله! كانت فيه زحمة كبيرة في الطريق، ما قصرت.",
            "translation": "I'm so sorry! There was a big traffic jam on the way, I couldn't help it.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "آسف والله is a sincere Saudi apology — the والله reinforces genuine remorse."
          },
          {
            "text": "أعتذر، كانت هناك ازدحام مروري كبير.",
            "translation": "I apologise, there was a major traffic congestion.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أعتذر and ازدحام مروري are MSA. آسف and زحمة are the natural Saudi equivalents."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "خلاص، المهم وصلت. وش تبي تشرب؟",
        "translation": "OK, the important thing is you arrived. What do you want to drink?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Order a drink and thank your friend for waiting:",
        "options": [
          {
            "text": "قهوة من فضلك، وشكراً إنك انتظرتني!",
            "translation": "Coffee please, and thank you for waiting for me!",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "إنك is the natural Saudi subordinating connector — good colloquial grammar."
          },
          {
            "text": "أريد قهوة من فضلك، وأشكرك على انتظارك.",
            "translation": "I want coffee please and I thank you for your waiting.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "أريد and أشكرك على انتظارك are MSA. قهوة من فضلك and شكراً إنك انتظرتني flow better in Saudi dialect."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "لا بأس، الحمد لله على السلامة!",
        "translation": "No problem, praise God for your safety!",
        "end": true
      }
    ],
    "completionMessage": "You apologised and recovered the situation like a Saudi pro!"
  },
  {
    "id": "saudi_convo_p4_what_drinking",
    "phase": 4,
    "title": "What Are You Drinking?",
    "description": "A friend sees you with a cup and asks what you are drinking.",
    "focalWordIds": [
      "w_tea",
      "w_coffee",
      "w_water",
      "w_good",
      "w_now"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "وش تشرب؟ تبي شي؟",
        "translation": "What are you drinking? Do you want something?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them what you are drinking and offer them some:",
        "options": [
          {
            "text": "أشرب شاي أخضر، تبي كوب معي؟",
            "translation": "I am drinking green tea, do you want a cup with me?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أشرب is the correct Saudi 1st-person present for \"I drink/am drinking\" — natural and inviting."
          },
          {
            "text": "أنا أتناول الشاي الأخضر، هل تريد شيئاً؟",
            "translation": "I am having green tea, do you want something?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أتناول and تريد are MSA. أشرب and تبي are the Saudi equivalents."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الله يجزاك خير! أنا أبي قهوة أكثر.",
        "translation": "May God reward you! I prefer coffee more.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Say there is coffee in the kitchen:",
        "options": [
          {
            "text": "في قهوة في المطبخ، روح خذ كوب!",
            "translation": "There is coffee in the kitchen, go grab a cup!",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "في + noun is the Saudi locative pattern for \"there is\" — well used."
          },
          {
            "text": "يوجد قهوة في المطبخ، يمكنك أخذها.",
            "translation": "There is coffee in the kitchen, you can take it.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "يوجد is MSA. في is the natural Saudi way to say \"there is\" in casual speech."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "جزاك الله خير، الله يسلمك!",
        "translation": "May God reward you, God keep you safe!",
        "end": true
      }
    ],
    "completionMessage": "You shared drinks and chatted in genuine Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p4_where_house",
    "phase": 4,
    "title": "Where Is Your House?",
    "description": "A new acquaintance asks where you live so they can visit.",
    "focalWordIds": [
      "w_house",
      "w_right",
      "w_left",
      "w_straight",
      "w_mosque"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أبي أزورك، وين بيتك؟",
        "translation": "I want to visit you, where is your house?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Give your neighbourhood and a landmark:",
        "options": [
          {
            "text": "أسكن في حي الملقا، قريب من المسجد الكبير.",
            "translation": "I live in Al-Malqa neighbourhood, near the big mosque.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أسكن في + location is the natural Saudi locative for where you live."
          },
          {
            "text": "أنا أقطن في منطقة حي الملقا بجوار الجامع الكبير.",
            "translation": "I reside in the Al-Malqa neighbourhood area next to the grand mosque.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أقطن is formal MSA. أسكن في is how Saudis naturally say where they live."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "زين، وكيف أجي؟ ما أعرف الحي هذا.",
        "translation": "Good, and how do I come? I don't know this neighbourhood.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give simple directions from the mosque:",
        "options": [
          {
            "text": "من المسجد، روح يمين وبعدين على طول، البيت على اليسار.",
            "translation": "From the mosque, go right then straight, the house is on the left.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "يمين، على طول، يسار — the three direction words used naturally in sequence."
          },
          {
            "text": "اتجه نحو اليمين من المسجد، ثم استمر مباشرة وستجد المنزل على اليسار.",
            "translation": "Head right from the mosque, then continue straight and you will find the house on the left.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "اتجه نحو and استمر مباشرة are MSA. روح يمين and على طول are the Saudi equivalents."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "واضح! إن شاء الله أجي بكرة.",
        "translation": "Clear! God willing I will come tomorrow.",
        "end": true
      }
    ],
    "completionMessage": "You gave directions to your house in perfect Saudi Arabic!"
  },
  {
    "id": "saudi_convo_p6_airport_arrival",
    "phase": 6,
    "title": "Airport Arrival",
    "description": "You just landed at King Abdulaziz International Airport and a ground assistant approaches you.",
    "focalWordIds": [
      "w_airport",
      "w_wasala",
      "w_safar",
      "w_musaafir",
      "w_ticket"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً، وصلت بالسلامة! أول مرة في جدة؟",
        "translation": "Welcome, you arrived safely! Is this your first time in Jeddah?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell the assistant whether this is your first visit.",
        "options": [
          {
            "text": "إي والله، أول مرة أجي",
            "translation": "Yes by God, it's my first time coming.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! أول مرة is natural Saudi for \"first time\"."
          },
          {
            "text": "لا، جيت قبل كذا مرة",
            "translation": "No, I came several times before.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "زين! كذا مرة is a great Saudi way to say \"several times\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ماشاء الله! السفر كان زين؟ احتجت شي؟",
        "translation": "MashaAllah! Was the travel good? Do you need anything?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "والله عارف المكان! احتجت مساعدة؟",
        "translation": "You already know the place! Do you need help?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask where baggage claim is.",
        "options": [
          {
            "text": "وين أحصل شنطتي؟",
            "translation": "Where do I get my bag?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! وين is the Saudi word for \"where\"."
          },
          {
            "text": "أين استلام الأمتعة؟",
            "translation": "Where is the baggage claim? (MSA)",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "صح! هذا عربي فصيح — works but sounds formal. Saudis say وين أحصل شنطتي."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "على طول من هنا، الدور الأول. راح تشوف اللافتة.",
        "translation": "Straight from here, first floor. You will see the sign.",
        "end": true
      }
    ],
    "completionMessage": "Well done! You navigated arrival at a Saudi airport using past tense and travel vocab."
  },
  {
    "id": "saudi_convo_p6_taxi_to_hotel",
    "phase": 6,
    "title": "Taxi to the Hotel",
    "description": "You're outside the airport and negotiating a taxi ride to your hotel.",
    "focalWordIds": [
      "w_taxi",
      "w_hotel",
      "w_tariiq",
      "w_howmuch",
      "w_wasala"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "مرحبا! تاكسي؟ وين تروح؟",
        "translation": "Hello! Taxi? Where are you going?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell the driver you want to go to the hotel downtown.",
        "options": [
          {
            "text": "أبغى أروح الفندق في وسط المدينة",
            "translation": "I want to go to the hotel in the city center.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! أبغى is the classic Saudi \"I want\"."
          },
          {
            "text": "أريد الذهاب إلى الفندق",
            "translation": "I want to go to the hotel. (MSA)",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "صح، بس هذا فصيح. السعودي يقول أبغى أروح."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "زين، بكم؟ الطريق زحمة الحين.",
        "translation": "Okay, how much? The road is congested right now.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Respond to the price and ask how long it takes.",
        "options": [
          {
            "text": "بكم الرحلة؟ وكم ساعة في الطريق؟",
            "translation": "How much is the trip? And how long on the road?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! بكم and كم ساعة both land naturally here."
          },
          {
            "text": "كثير، أبغى أرخص",
            "translation": "That's too much, I want cheaper.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "جريء بس صح! أرخص means cheaper — good negotiating."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "ثلاثين ريال، وراح نوصل في ربع ساعة إن شاء الله.",
        "translation": "Thirty riyals, and we'll arrive in fifteen minutes, God willing.",
        "end": true
      }
    ],
    "completionMessage": "Great work! You negotiated a taxi ride using travel and direction vocabulary."
  },
  {
    "id": "saudi_convo_p6_hotel_checkin_full",
    "phase": 6,
    "title": "Hotel Check-in",
    "description": "You arrive at the hotel front desk to check in for your stay.",
    "focalWordIds": [
      "w_hotel",
      "w_ticket",
      "w_waqt",
      "w_wasala",
      "w_nazala"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً وسهلاً! عندك حجز؟",
        "translation": "Welcome! Do you have a reservation?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Confirm you have a reservation.",
        "options": [
          {
            "text": "إي، حجزت غرفة بكرة",
            "translation": "Yes, I booked a room for yesterday.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "قريب! بكرة means tomorrow — maybe you meant أمس (yesterday) or قبل شوي (earlier)."
          },
          {
            "text": "إي، عندي حجز باسمي",
            "translation": "Yes, I have a reservation in my name.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! عندي حجز باسمي is exactly right."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "زين، اسمك من فضلك؟ وكم ليلة؟",
        "translation": "Good, your name please? And how many nights?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "لا بأس، اسمك من فضلك؟ نشوف في النظام.",
        "translation": "No problem, your name please? We'll check in the system.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Say your name and how many nights you're staying.",
        "options": [
          {
            "text": "اسمي [اسمك]، رح أنزل ثلاث ليالي",
            "translation": "My name is [your name], I will stay three nights.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "زين! رح أنزل is great Saudi for \"I will stay/descend\"."
          },
          {
            "text": "اسمي [اسمك]، ليلة وحدة بس",
            "translation": "My name is [your name], just one night.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "صح! وحدة بس is very natural — \"just one\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تفضل، غرفتك رقم مئة وخمسة. الغرفة جاهزة الحين.",
        "translation": "Here you go, your room is number 105. The room is ready now.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You completed a full hotel check-in in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p6_hotel_complaint",
    "phase": 6,
    "title": "Hotel Complaint",
    "description": "Something is wrong with your hotel room and you call the front desk.",
    "focalWordIds": [
      "w_hotel",
      "w_sayyiʾ",
      "w_waqt",
      "w_nazala",
      "w_manzar"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "الاستقبال، كيف أقدر أساعدك؟",
        "translation": "Reception, how can I help you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them there is a problem with your room.",
        "options": [
          {
            "text": "في مشكلة في غرفتي، التكييف ما يشتغل",
            "translation": "There is a problem in my room, the AC doesn't work.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! في مشكلة is a natural way to report a problem."
          },
          {
            "text": "الغرفة سيئة، أبغى غرفة ثانية",
            "translation": "The room is bad, I want another room.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "مباشر! سيئة works — but specifying the problem is more useful."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "آسف على الإزعاج! راح نرسل شخص الحين.",
        "translation": "Sorry for the inconvenience! We'll send someone right now.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "عندنا غرفة ثانية، بس أبغى أعرف المشكلة أول.",
        "translation": "We have another room, but I want to know the problem first.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask how long it will take.",
        "options": [
          {
            "text": "كم دقيقة راح تاخذ؟",
            "translation": "How many minutes will it take?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! كم دقيقة is a clean, natural question."
          },
          {
            "text": "بسرعة، أنا تعبان",
            "translation": "Quickly, I'm tired.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "صح! تعبان means tired — reasonable complaint."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "خمس دقائق بإذن الله. شكراً لصبرك!",
        "translation": "Five minutes, God willing. Thank you for your patience!",
        "end": true
      }
    ],
    "completionMessage": "Well done! You handled a hotel complaint conversation in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p6_train_ticket",
    "phase": 6,
    "title": "Buying a Train Ticket",
    "description": "You're at the Haramain high-speed rail ticket counter.",
    "focalWordIds": [
      "w_ticket",
      "w_station",
      "w_wasala",
      "w_waqt",
      "w_howmuch"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً! وين تبغى تروح؟",
        "translation": "Hello! Where do you want to go?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask for one ticket to Makkah.",
        "options": [
          {
            "text": "أبغى تذكرة وحدة لمكة",
            "translation": "I want one ticket to Makkah.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! أبغى تذكرة وحدة — clean and direct."
          },
          {
            "text": "تذكرتين لمكة من فضلك",
            "translation": "Two tickets to Makkah please.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "زين! تذكرتين is the dual form — two tickets."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "درجة أولى ولا اقتصادية؟ القطار يطلع بعد ساعة.",
        "translation": "First class or economy? The train leaves in an hour.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Choose a class and ask about arrival time.",
        "options": [
          {
            "text": "اقتصادية، وكم الوقت حتى نوصل؟",
            "translation": "Economy, and how long until we arrive?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! نوصل is the Saudi \"we arrive\" — natural first-person plural."
          },
          {
            "text": "درجة أولى، بكم؟",
            "translation": "First class, how much?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "صح! بكم is the quick Saudi way to ask the price."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الرحلة ساعة وربع. هذي تذكرتك، بالسلامة!",
        "translation": "The trip is an hour and fifteen minutes. Here is your ticket, safe travels!",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You bought a train ticket using time and travel vocabulary."
  },
  {
    "id": "saudi_convo_p6_bus_to_jeddah",
    "phase": 6,
    "title": "Bus to Jeddah",
    "description": "You need to take a bus from Riyadh to Jeddah and ask at the station.",
    "focalWordIds": [
      "w_bus",
      "w_station",
      "w_tariiq",
      "w_madiina",
      "w_rakiba"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "الباص لجدة يطلع الساعة عشرة. ركبت من قبل؟",
        "translation": "The bus to Jeddah departs at ten. Have you ridden before?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Say this is your first time taking the bus here.",
        "options": [
          {
            "text": "لا، أول مرة أركب الباص هنا",
            "translation": "No, first time I ride the bus here.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! أركب is clean Saudi present tense."
          },
          {
            "text": "إي، ركبت قبل للدمام",
            "translation": "Yes, I rode before to Dammam.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "زين! ركبت is correct simple past — you used it perfectly."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "زين! الطريق طويل، ثماني ساعات تقريباً.",
        "translation": "Good! The road is long, about eight hours.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "ماشاء الله! إذن تعرف الطريق طويل شوي.",
        "translation": "MashaAllah! Then you know the road is a bit long.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask where to board and if there's a food stop.",
        "options": [
          {
            "text": "من وين أركب؟ وفيه وقفة أكل في الطريق؟",
            "translation": "Where do I board? And is there a food stop on the way?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! وقفة أكل is a natural phrase for a rest stop."
          },
          {
            "text": "الباص زحمة؟",
            "translation": "Is the bus crowded?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "صح! زحمة means crowded — practical question."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الباب الثالث، وفيه وقفتين. رحلة ممتعة!",
        "translation": "Gate three, and there are two stops. Enjoy the trip!",
        "end": true
      }
    ],
    "completionMessage": "Great job! You navigated the bus station in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p6_lost_luggage",
    "phase": 6,
    "title": "Lost Luggage",
    "description": "Your bag didn't arrive at the airport and you report it to the airline desk.",
    "focalWordIds": [
      "w_airport",
      "w_wasala",
      "w_safar",
      "w_sayyiʾ",
      "w_ittisaal"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تفضل، كيف أساعدك؟",
        "translation": "Please, how can I help you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Report that your bag did not arrive.",
        "options": [
          {
            "text": "شنطتي ما وصلت، دورت عليها وما لقيتها",
            "translation": "My bag didn't arrive, I looked for it and didn't find it.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! ما وصلت is perfect simple past negative."
          },
          {
            "text": "أمتعتي ضاعت",
            "translation": "My luggage was lost. (MSA)",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "صح! ضاعت works, but Saudis would more often say ما وصلت or ضاعت عليّ."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "آسف جداً! من وين جيت؟ وما هو رقم رحلتك؟",
        "translation": "Very sorry! Where did you come from? And what is your flight number?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give your flight details and ask how long it will take.",
        "options": [
          {
            "text": "جيت من دبي، رحلة رقم ثلاثمائة. متى تجي الشنطة؟",
            "translation": "I came from Dubai, flight number 300. When will the bag come?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! جيت is perfect simple past \"I came\"."
          },
          {
            "text": "ما أعرف رقم الرحلة، بس عندي البطاقة",
            "translation": "I don't know the flight number, but I have the boarding pass.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "زين! البطاقة for boarding pass is understood — practical answer."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "راح نتصل بك في الفندق. الشنطة توصل خلال أربعة وعشرين ساعة إن شاء الله.",
        "translation": "We will call you at the hotel. The bag will arrive within 24 hours, God willing.",
        "end": true
      }
    ],
    "completionMessage": "Well done! You reported lost luggage using past tense and travel vocabulary."
  },
  {
    "id": "saudi_convo_p6_rent_a_car",
    "phase": 6,
    "title": "Renting a Car",
    "description": "You're at a car rental counter at the airport.",
    "focalWordIds": [
      "w_car",
      "w_howmuch",
      "w_waqt",
      "w_tariiq",
      "w_madiina"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً! تبغى تأجر سيارة؟ كم يوم؟",
        "translation": "Hello! You want to rent a car? How many days?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Say you want a car for three days.",
        "options": [
          {
            "text": "إي، أبغى سيارة لثلاثة أيام",
            "translation": "Yes, I want a car for three days.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! ثلاثة أيام is the correct plural form."
          },
          {
            "text": "أسبوع كامل من فضلك",
            "translation": "A full week please.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "زين! أسبوع كامل — good use of week vocabulary."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عندنا سيارة صغيرة أو SUV. اللي يناسبك؟",
        "translation": "We have a small car or an SUV. Which suits you?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Choose the small car and ask about the price.",
        "options": [
          {
            "text": "الصغيرة كافية، بكم في اليوم؟",
            "translation": "The small one is enough, how much per day?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! كافية means sufficient — very natural Saudi response."
          },
          {
            "text": "أبغى الـ SUV، أحسن في الطريق",
            "translation": "I want the SUV, better on the road.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "زين! أحسن في الطريق — good justification."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "مئة وخمسين في اليوم شامل التأمين. وقّع هنا من فضلك.",
        "translation": "150 per day including insurance. Sign here please.",
        "end": true
      }
    ],
    "completionMessage": "Great work! You rented a car in Saudi Arabic using numbers and transport vocab."
  },
  {
    "id": "saudi_convo_p6_hotel_breakfast",
    "phase": 6,
    "title": "Hotel Breakfast",
    "description": "You're at the hotel breakfast area and talking to the waiter about what's available.",
    "focalWordIds": [
      "w_hotel",
      "w_waqt",
      "w_nazala",
      "w_samiʿa",
      "w_qaddama"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "صباح الخير! الفطور شامل في حجزك، تفضل!",
        "translation": "Good morning! Breakfast is included in your booking, please come in!",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask what is available for breakfast.",
        "options": [
          {
            "text": "شو عندكم في الفطور؟",
            "translation": "What do you have for breakfast?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "زين! شو is common in Saudi/Levantine mix — accepted."
          },
          {
            "text": "وين البوفيه؟",
            "translation": "Where is the buffet?",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "عملي! Direct and natural — Saudis ask وين البوفيه all the time."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عندنا بيض، خبز، جبن، عسل، وعصير. تبغى شي ثاني؟",
        "translation": "We have eggs, bread, cheese, honey, and juice. Do you want anything else?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "البوفيه هناك على اليمين. تفضل، كل شي موجود!",
        "translation": "The buffet is over there on the right. Please, everything is available!",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask for coffee and say the food looks good.",
        "options": [
          {
            "text": "أبغى قهوة من فضلك، والأكل يبين حلو!",
            "translation": "I want coffee please, and the food looks good!",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! يبين حلو is a great Saudi compliment."
          },
          {
            "text": "شكراً، كل شي زين",
            "translation": "Thank you, everything is good.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "أحسنت! زين as a compliment is very Saudi."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الله يسلمك! القهوة جاية الحين. صحة وعافية!",
        "translation": "God keep you safe! Coffee is coming now. Bon appetit!",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You handled hotel breakfast conversation in natural Saudi Arabic."
  },
  {
    "id": "saudi_convo_p6_tourist_souq",
    "phase": 6,
    "title": "Tourist Souq",
    "description": "You're browsing a traditional market and chatting with a vendor.",
    "focalWordIds": [
      "w_market",
      "w_howmuch",
      "w_expensive",
      "w_cheap",
      "w_buy"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً بالزبون! شفت بضاعتنا؟ كلها من السعودية!",
        "translation": "Welcome customer! Did you see our goods? All from Saudi Arabia!",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Express interest and ask about this item.",
        "options": [
          {
            "text": "شفت، حلو كثير! بكم هذا؟",
            "translation": "I saw it, very nice! How much is this?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! شفت is a great simple past — \"I saw\". بكم is natural."
          },
          {
            "text": "ما شفت كل شي، وين التحف؟",
            "translation": "I haven't seen everything, where are the souvenirs?",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "زين! التحف for souvenirs is correct vocab."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "هذا بمئة ريال. صنعة يدوية أصيلة!",
        "translation": "This one is 100 riyals. Authentic handcraft!",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "التحف هنا على اليسار. كلها بأسعار كويسة!",
        "translation": "The souvenirs are here on the left. All at good prices!",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Try to negotiate the price.",
        "options": [
          {
            "text": "غالي شوي، تقدر تنزل عليّ؟",
            "translation": "A little expensive, can you lower it for me?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! تنزل عليّ is very natural Saudi bargaining language."
          },
          {
            "text": "زين، راح آخذه",
            "translation": "Okay, I will take it.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "صح! راح آخذه — good use of راح for future intent."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تسعين آخر سعر! والله ما أقدر أقل. تفضل!",
        "translation": "Ninety is the final price! By God I can't go lower. Here you go!",
        "end": true
      }
    ],
    "completionMessage": "Well done! You bargained in a Saudi souq using past tense and price vocabulary."
  },
  {
    "id": "saudi_convo_p6_camping_gear",
    "phase": 6,
    "title": "Camping Gear Shop",
    "description": "You're looking for camping equipment at an outdoor shop in Riyadh.",
    "focalWordIds": [
      "w_buy",
      "w_howmuch",
      "w_waqt",
      "w_safar",
      "w_tariiq"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! تبغى تخيّم؟ وين رايح؟",
        "translation": "Hey! You want to camp? Where are you going?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Say you're going to the mountains next week.",
        "options": [
          {
            "text": "إي، رايح الجبال الأسبوع الجاي",
            "translation": "Yes, going to the mountains next week.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! الأسبوع الجاي is natural Saudi for \"next week\"."
          },
          {
            "text": "في الصحراء، قريب من الرياض",
            "translation": "In the desert, close to Riyadh.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "زين! قريب من الرياض — good use of location vocab."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "رحت قبل؟ عندنا كل شي تحتاجه للتخييم.",
        "translation": "Have you gone before? We have everything you need for camping.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask about tents and their prices.",
        "options": [
          {
            "text": "ما رحت قبل. بكم الخيمة عندكم؟",
            "translation": "I haven't gone before. How much are the tents here?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! ما رحت قبل — correct negative past tense."
          },
          {
            "text": "رحت مرة في الشتاء، كان ممتع",
            "translation": "I went once in winter, it was fun.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "زين! رحت مرة — great simple past usage."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الخيم تبدأ من مئتين ريال. هذي الأكثر مبيعاً، قوية في الريح.",
        "translation": "Tents start from 200 riyals. This is the best-seller, strong in the wind.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You shopped for camping gear using past tense and practical travel vocabulary."
  },
  {
    "id": "saudi_convo_p6_visit_palace",
    "phase": 6,
    "title": "Visiting a Palace",
    "description": "You're at the ticket booth of a historical palace open for tourists.",
    "focalWordIds": [
      "w_ticket",
      "w_manzar",
      "w_nadhara",
      "w_waqt",
      "w_wasala"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً بالزوار! تبغى تذكرة دخول؟",
        "translation": "Welcome visitors! Do you want an entry ticket?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask for two tickets and how much they cost.",
        "options": [
          {
            "text": "إي، تذكرتين. بكم؟",
            "translation": "Yes, two tickets. How much?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! تذكرتين is the correct dual form."
          },
          {
            "text": "تذكرة وحدة، وهل الدخول مجاني؟",
            "translation": "One ticket, and is entry free?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "زين! مجاني means free — worth asking!"
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "خمسة وعشرين ريال للشخص. القصر فيه منظر رائع!",
        "translation": "25 riyals per person. The palace has a wonderful view!",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask about the history and how long to tour it.",
        "options": [
          {
            "text": "من بناه؟ وكم وقت يأخذ الجولة؟",
            "translation": "Who built it? And how long does the tour take?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! من بناه is a great history question."
          },
          {
            "text": "شفت صور المكان وهو جميل جداً",
            "translation": "I saw pictures of the place and it's very beautiful.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "زين! شفت صور — great use of simple past \"I saw\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "بناه الملك عبدالعزيز. الجولة ساعة تقريباً. استمتع!",
        "translation": "King Abdulaziz built it. The tour is about an hour. Enjoy!",
        "end": true
      }
    ],
    "completionMessage": "Great work! You visited a Saudi palace attraction using tickets and history vocabulary."
  },
  {
    "id": "saudi_convo_p6_uber_driver_chat",
    "phase": 6,
    "title": "Chatting with Your Uber Driver",
    "description": "You're in an Uber and the driver starts a friendly conversation.",
    "focalWordIds": [
      "w_car",
      "w_tariiq",
      "w_madiina",
      "w_saafara",
      "w_wasala"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! من وين أنت؟ سافرت كثير؟",
        "translation": "Hey! Where are you from? Have you traveled a lot?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell the driver where you're from and that you traveled to Saudi for the first time.",
        "options": [
          {
            "text": "أنا من أمريكا، وسافرت للسعودية أول مرة",
            "translation": "I'm from America, and I traveled to Saudi for the first time.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! سافرت is perfect simple past."
          },
          {
            "text": "من كندا، وجيت هنا للعمل",
            "translation": "From Canada, and I came here for work.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "زين! جيت is correct simple past \"I came\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "والله رائع! شفت وسط البلد؟ في أماكن كثيرة حلوة.",
        "translation": "By God, wonderful! Did you see the city center? There are many nice places.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Say you saw the corniche and ask for a recommendation.",
        "options": [
          {
            "text": "شفت الكورنيش، كان جميل جداً! وين تنصحني أروح؟",
            "translation": "I saw the corniche, it was very beautiful! Where do you recommend I go?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! شفت and كان — two great simple past uses."
          },
          {
            "text": "ما شفت كثير بعد، الحين وصلت",
            "translation": "I haven't seen much yet, I just arrived.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "زين! وصلت is perfect — \"I arrived\" in simple past."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "روح البلد القديم! قال لي الكل إنه جميل مرة. ما تندم!",
        "translation": "Go to the old town! Everyone told me it's very beautiful. You won't regret it!",
        "end": true
      }
    ],
    "completionMessage": "Well done! You had a natural Uber conversation using simple past and travel vocab."
  },
  {
    "id": "saudi_convo_p6_dive_shop_inquiry",
    "phase": 6,
    "title": "Dive Shop Inquiry",
    "description": "You're in Jeddah and asking about diving tours at a dive shop.",
    "focalWordIds": [
      "w_safar",
      "w_waqt",
      "w_howmuch",
      "w_manzar",
      "w_rakiba"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً! تبغى تغطس في البحر الأحمر؟",
        "translation": "Hello! You want to dive in the Red Sea?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Say yes and ask about available tours.",
        "options": [
          {
            "text": "إي والله! وش عندكم من جولات؟",
            "translation": "Yes by God! What tours do you have?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! وش is a Saudi way to say \"what\" — very authentic."
          },
          {
            "text": "غطست قبل في تايلاند، أبغى أشوف الفرق",
            "translation": "I dived before in Thailand, I want to see the difference.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "زين! غطست is a great past tense answer — and أشوف الفرق shows interest."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عندنا جولة صباح وجولة مساء. كل جولة ثلاث ساعات.",
        "translation": "We have a morning tour and an evening tour. Each tour is three hours.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "والله البحر الأحمر مختلف! الألوان مرة حلوة. عندنا جولتين.",
        "translation": "By God the Red Sea is different! The colors are really beautiful. We have two tours.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask about the price and if equipment is included.",
        "options": [
          {
            "text": "بكم الجولة؟ والمعدات شاملة؟",
            "translation": "How much is the tour? And is equipment included?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! شاملة is the right word for \"included\"."
          },
          {
            "text": "ركبت قارب من قبل، بس ما غطست هنا",
            "translation": "I rode a boat before, but I haven't dived here.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "زين! ركبت and غطست — both clean simple past forms."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "مئتان وخمسون ريال شامل كل شي. الجولة الصبح أحسن للمبتدئين.",
        "translation": "250 riyals including everything. The morning tour is better for beginners.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You inquired about diving tours in Saudi Arabic with past tense and price vocab."
  },
  {
    "id": "saudi_convo_p6_pharmacy_travel_meds",
    "phase": 6,
    "title": "Pharmacy for Travel Meds",
    "description": "You're not feeling well after travel and visit a pharmacy.",
    "focalWordIds": [
      "w_sayyiʾ",
      "w_waqt",
      "w_wasala",
      "w_pay",
      "w_howmuch"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً! كيف أقدر أساعدك؟",
        "translation": "Hello! How can I help you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Explain that you have a headache since arriving.",
        "options": [
          {
            "text": "عندي صداع من لما وصلت، أبغى دواء",
            "translation": "I have a headache since I arrived, I want medicine.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! من لما وصلت — \"since I arrived\" is very natural Saudi phrasing."
          },
          {
            "text": "تعبت في الطريق، أبغى شي للمعدة",
            "translation": "I got tired on the way, I want something for the stomach.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "زين! تعبت is simple past \"I got tired\" — great use."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "من وين جيت؟ ممكن من الجو أو الأكل الجديد.",
        "translation": "Where did you come from? It could be from the weather or new food.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "طبيعي بعد السفر. لاسمك أي دواء يناسبك؟",
        "translation": "Normal after travel. Let's see which medicine suits you.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask if they have something suitable and how much it costs.",
        "options": [
          {
            "text": "إي، جيت من بعيد. عندك شي مناسب؟ وبكم؟",
            "translation": "Yes, I came from far away. Do you have something suitable? And how much?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! جيت من بعيد — clean past tense."
          },
          {
            "text": "ما أعرف اسم الدواء بالعربي",
            "translation": "I don't know the medicine name in Arabic.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "صادق! هذا جواب طبيعي — honest and practical."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "هذا مسكن ألم قوي، خمسة عشر ريال. خذ اثنين مع الماء وارتح.",
        "translation": "This is a strong painkiller, 15 riyals. Take two with water and rest.",
        "end": true
      }
    ],
    "completionMessage": "Well done! You handled a pharmacy visit using simple past and health vocabulary."
  },
  {
    "id": "saudi_convo_p6_lost_phone",
    "phase": 6,
    "title": "Lost Phone",
    "description": "You lost your phone at the hotel and report it to reception.",
    "focalWordIds": [
      "w_sayyiʾ",
      "w_ittisaal",
      "w_waqt",
      "w_nazala",
      "w_wasala"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "الاستقبال، كيف أساعدك؟",
        "translation": "Reception, how can I help you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell them you lost your phone in the hotel.",
        "options": [
          {
            "text": "والله ضاع جوالي في الفندق، ما أعرف وين",
            "translation": "By God my phone is lost in the hotel, I don't know where.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! ضاع جوالي — \"my phone got lost\" is perfect Saudi phrasing."
          },
          {
            "text": "نسيت جوالي في المطعم، ممكن تتصلون فيه؟",
            "translation": "I forgot my phone in the restaurant, can you call it?",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "زين! نسيت is great — \"I forgot\" in simple past."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "إن شاء الله نلقاه. وين آخر مرة شفته؟",
        "translation": "God willing we'll find it. Where was the last time you saw it?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "راح نتصل عليه الحين. أعطني رقمك.",
        "translation": "We'll call it right now. Give me your number.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Say where you last had it and ask if they can check cameras.",
        "options": [
          {
            "text": "شفته آخر مرة في المصعد. تقدرون تشوفون الكاميرات؟",
            "translation": "I saw it last time in the elevator. Can you check the cameras?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! شفته is great — \"I saw it\" in simple past."
          },
          {
            "text": "ما شفته من الصبح، قلق كثير",
            "translation": "I haven't seen it since morning, very worried.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "زين! ما شفته من الصبح — natural negative past."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "راح نشوف التسجيلات الحين ونتصل بك في غرفتك.",
        "translation": "We'll check the recordings now and call you in your room.",
        "end": true
      }
    ],
    "completionMessage": "Great work! You reported a lost phone using simple past and hotel vocabulary."
  },
  {
    "id": "saudi_convo_p6_change_money",
    "phase": 6,
    "title": "Changing Money",
    "description": "You need to exchange foreign currency at a money exchange office.",
    "focalWordIds": [
      "w_money",
      "w_howmuch",
      "w_pay",
      "w_waqt",
      "w_madiina"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً! تبغى تصرّف عملة؟",
        "translation": "Hello! You want to exchange currency?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Say you want to exchange dollars to riyals.",
        "options": [
          {
            "text": "إي، أبغى أصرّف دولارات لريال سعودي",
            "translation": "Yes, I want to exchange dollars to Saudi riyals.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! أصرّف is the correct verb for currency exchange."
          },
          {
            "text": "عندي يورو، بكم الصرف اليوم؟",
            "translation": "I have euros, what's the exchange rate today?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "زين! بكم الصرف — direct and natural question."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الدولار بثلاثة وسبعين هللة. كم تبغى تصرّف؟",
        "translation": "The dollar is 3.73. How much do you want to exchange?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Say you want to exchange 500 dollars and ask if there's a fee.",
        "options": [
          {
            "text": "خمسمائة دولار. في عمولة على الصرف؟",
            "translation": "Five hundred dollars. Is there a commission on the exchange?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! عمولة is the right word for commission/fee."
          },
          {
            "text": "مائة دولار بس، الفلوس ما معي كثير",
            "translation": "Just one hundred dollars, I don't have much money with me.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "زين! الفلوس ما معي — great Saudi idiom for \"I don't have much money on me\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "ما في عمولة. تقدر تاخذ الريالات الحين. تفضل!",
        "translation": "No commission. You can take the riyals right now. Here you go!",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You exchanged money in Saudi Arabic using numbers and financial vocabulary."
  },
  {
    "id": "saudi_convo_p6_eid_family_visit",
    "phase": 6,
    "title": "Eid Family Visit",
    "description": "You visit a Saudi family during Eid and they welcome you warmly.",
    "focalWordIds": [
      "w_saafara",
      "w_wasala",
      "w_waqt",
      "w_nadhara",
      "w_qaddama"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "عيد مبارك! وصلت من وين؟ سافرت كثير؟",
        "translation": "Happy Eid! Where did you arrive from? Did you travel a lot?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Greet them and say you traveled from far away for this visit.",
        "options": [
          {
            "text": "عيد مبارك وكل عام وأنتم بخير! سافرت من بعيد لأزورهم",
            "translation": "Happy Eid and may you be well every year! I traveled from far to visit them.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! سافرت — clean simple past. The full greeting is very Saudi."
          },
          {
            "text": "عيد سعيد! وصلت أمس من الرياض",
            "translation": "Happy Eid! I arrived yesterday from Riyadh.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "زين! وصلت أمس — \"I arrived yesterday\" is perfect simple past."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ماشاء الله على عزيمتك! تعال نشرب قهوة ونسولف.",
        "translation": "MashaAllah on your determination! Come let's drink coffee and chat.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "أهلاً بك! قلنا لك تعال بكرة بس وصلت اليوم، ماشاء الله!",
        "translation": "Welcome! We said come tomorrow but you arrived today, MashaAllah!",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Accept the invitation and compliment the house.",
        "options": [
          {
            "text": "بكل سرور! والله بيتكم جميل، شفت الزينة من البراه",
            "translation": "With great pleasure! By God your house is beautiful, I saw the decorations from outside.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! شفت من البراه — \"I saw from outside\" — great simple past."
          },
          {
            "text": "شكراً، الله يبارك فيكم",
            "translation": "Thank you, may God bless you all.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "زين! الله يبارك فيكم — a beautiful Saudi blessing."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الله يسلمك! قدّمنا لك أحسن شي. تفضل على الأكل!",
        "translation": "God keep you safe! We prepared the best for you. Please, come eat!",
        "end": true
      }
    ],
    "completionMessage": "Well done! You participated in an Eid family visit using Saudi greetings and past tense."
  },
  {
    "id": "saudi_convo_p6_camel_ride_tourist",
    "phase": 6,
    "title": "Camel Ride for Tourists",
    "description": "You're at a desert camp and negotiating a camel ride experience.",
    "focalWordIds": [
      "w_rakiba",
      "w_raakib",
      "w_howmuch",
      "w_waqt",
      "w_safar"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! تبغى تركب الجمل؟ تجربة ما تنسى!",
        "translation": "Hey! You want to ride the camel? An unforgettable experience!",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Express interest and ask if you have to know how to ride.",
        "options": [
          {
            "text": "أبغى! بس ما ركبت قبل، هل هي صعبة؟",
            "translation": "I want to! But I haven't ridden before, is it difficult?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! ما ركبت قبل — perfect negative simple past."
          },
          {
            "text": "ركبت خيل قبل، هل الجمل مثله؟",
            "translation": "I rode a horse before, is the camel similar?",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "زين! ركبت — great simple past usage."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "مو صعبة! الجمل هادي والراكب ما يحتاج خبرة.",
        "translation": "Not difficult! The camel is calm and the rider doesn't need experience.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "الجمل أبطأ من الخيل بس الجلسة مرة مريحة!",
        "translation": "The camel is slower than a horse but the seat is very comfortable!",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask the price and how long the ride lasts.",
        "options": [
          {
            "text": "بكم الركوب؟ وكم دقيقة الجولة؟",
            "translation": "How much is the ride? And how many minutes is the tour?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! بكم is natural for price, كم دقيقة for duration."
          },
          {
            "text": "زين، جاهز! مين يساعدني أركب؟",
            "translation": "Okay, ready! Who helps me get on?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "جريء ومباشر! جاهز means ready — very natural."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "خمسون ريال لنص ساعة. أنا راح أصورك وأنت فوق الجمل!",
        "translation": "50 riyals for half an hour. I'll take your picture while you're on the camel!",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You negotiated a camel ride experience using past tense and tourism vocabulary."
  },
  {
    "id": "saudi_convo_p6_borrow_car_friend",
    "phase": 6,
    "title": "Borrowing a Friend's Car",
    "description": "You need to borrow your Saudi friend's car to run some errands.",
    "focalWordIds": [
      "w_car",
      "w_tariiq",
      "w_waqt",
      "w_madiina",
      "w_wasala"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا يا صاحب! وين رايح؟ تبغى شي؟",
        "translation": "Hey buddy! Where are you going? Do you need something?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask to borrow his car to go to the city center.",
        "options": [
          {
            "text": "أبغى أستعير سيارتك شوي، أروح وسط البلد وأرجع",
            "translation": "I want to borrow your car a little, go to the city center and come back.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسنت! أستعير is the correct verb for \"borrow\"."
          },
          {
            "text": "قلت لي وين المحطة، أروح بالتاكسي",
            "translation": "Tell me where the station is, I'll go by taxi.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "زين! هذا أيضاً طبيعي — choosing an alternative."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "بكل سرور! بس ارجع قبل العصر، عندي شغلة.",
        "translation": "With great pleasure! But come back before Asr prayer, I have something to do.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "لا لا، خذ سيارتي أحسن! التاكسي في الزحمة يأخذ وقت.",
        "translation": "No no, take my car, it's better! The taxi in traffic takes time.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Thank him and ask if there are any roads to avoid.",
        "options": [
          {
            "text": "شكراً جزيلاً! في طرق أتجنبها؟ سمعت في حوادث اليوم",
            "translation": "Thank you very much! Are there roads to avoid? I heard there were accidents today.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! سمعت is perfect simple past \"I heard\"."
          },
          {
            "text": "راح أرجع قبل العصر إن شاء الله، ما أتأخر",
            "translation": "I'll return before Asr God willing, I won't be late.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "زين! ما أتأخر is a natural promise — very Saudi."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "روح على الطريق الدائري، أسرع. وإياك طريق الملك فهد، زحمة مرة.",
        "translation": "Go on the ring road, it's faster. Avoid King Fahd road, very congested.",
        "end": true
      }
    ],
    "completionMessage": "Great work! You borrowed a car from a Saudi friend using past tense and direction vocabulary."
  },
  {
    "id": "saudi_convo_p7_coworker_bad_day",
    "phase": 7,
    "title": "Coworker Having a Bad Day",
    "description": "Check on a coworker who seems down at the office.",
    "focalWordIds": [
      "w_tired",
      "w_sad",
      "w_colleague",
      "w_shuʿuur",
      "w_happy",
      "w_nafs"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أنا تعبان اليوم، ما قدرت أنام الليل",
        "translation": "I'm exhausted today, I couldn't sleep last night.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Show concern and ask what's wrong.",
        "options": [
          {
            "text": "والله؟ شو اللي صاير؟ قولي",
            "translation": "Really? What's going on? Tell me.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Perfect — والله + open question shows genuine care."
          },
          {
            "text": "خذ قهوة، بتحس بزيادة",
            "translation": "Have a coffee, you'll feel better.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Practical but a bit cold — he needed to vent first."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "بصراحة، أحس إن المدير ما يقدّر شغلي أبد",
        "translation": "Honestly, I feel like the manager never appreciates my work at all.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "القهوة ما تحل المشكلة! المدير ما يقدّر شغلي",
        "translation": "Coffee won't fix it! The manager doesn't appreciate my work.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Validate his feelings and suggest what to do.",
        "options": [
          {
            "text": "أفهمك، هذا الشعور صعب. كلّمه بصراحة؟",
            "translation": "I understand you, that feeling is hard. Did you speak to him directly?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت — you validated his شعور and suggested action."
          },
          {
            "text": "ما تزعل، أنت تشتغل زين",
            "translation": "Don't be sad, you work well.",
            "nextStepId": "s5b",
            "correct": false,
            "feedback": "Kind words, but dismissing his feeling with ما تزعل can sting."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "إن شاء الله أكلمه بكرة. شكرا إنك سألت عني، والله يعافيك",
        "translation": "God willing I'll talk to him tomorrow. Thank you for asking about me, may God give you health.",
        "end": true
      },
      {
        "id": "s5b",
        "speaker": "partner",
        "text": "أعرف، بس أحس بالزعل. يلا، نكمل الشغل",
        "translation": "I know, but I still feel sad. OK, let's keep working.",
        "end": true
      }
    ],
    "completionMessage": "You supported your coworker with empathy. تعبان and شعور are now part of your emotional toolkit!"
  },
  {
    "id": "saudi_convo_p7_boss_check_in",
    "phase": 7,
    "title": "Boss Check-In",
    "description": "Your manager checks in on how you're feeling about work.",
    "focalWordIds": [
      "w_meeting",
      "w_fakkara",
      "w_fikra",
      "w_happy",
      "w_tired",
      "w_know"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "كيف حالك هذه الأيام؟ تحس إنك مبسوط في الشغل؟",
        "translation": "How are you these days? Do you feel happy at work?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Give an honest answer about your work satisfaction.",
        "options": [
          {
            "text": "بصراحة، أحس بالتعب شوي. الاجتماعات كثيرة",
            "translation": "Honestly, I feel a bit tired. There are too many meetings.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Brave and honest — بصراحة opens real dialogue with a boss."
          },
          {
            "text": "إي، أنا مبسوط والحمد لله",
            "translation": "Yes, I'm happy, thank God.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Safe answer, but you missed a chance to share real feedback."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "هذا زين إنك قلت لي. فكرت في حل؟",
        "translation": "It's good that you told me. Have you thought of a solution?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "الحمد لله. هل عندك أي أفكار لتحسين الشغل؟",
        "translation": "Praise God. Do you have any ideas to improve work?",
        "next": "s4b"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Suggest reducing meetings.",
        "options": [
          {
            "text": "فكرت نخلي الاجتماعات أقل وأنشاور بالإيميل",
            "translation": "I thought we could have fewer meetings and coordinate by email.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "فكرت is past tense — well applied here for presenting a considered idea."
          },
          {
            "text": "ما أعرف بعد، بحتاج وقت للتفكير",
            "translation": "I don't know yet, I need time to think.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Honest, but a concrete idea lands better with leadership."
          }
        ]
      },
      {
        "id": "s4b",
        "speaker": "user",
        "prompt": "Share an idea for improving the team.",
        "options": [
          {
            "text": "عندي فكرة: نجتمع مرة بالأسبوع بس",
            "translation": "I have an idea: we meet only once a week.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "عندي فكرة is a natural lead-in — great initiative."
          },
          {
            "text": "الشغل زين كما هو",
            "translation": "Work is fine as it is.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Nothing wrong, but missed a growth opportunity."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "فكرة ممتازة، إن شاء الله نطبقها من الأسبوع الجاي",
        "translation": "Excellent idea, God willing we'll apply it from next week.",
        "end": true
      }
    ],
    "completionMessage": "Well done navigating a real manager conversation! مبسوط, فكرة and بصراحة all used naturally."
  },
  {
    "id": "saudi_convo_p7_meeting_too_long",
    "phase": 7,
    "title": "Meeting Gone Too Long",
    "description": "Commiserate with a colleague after an exhaustingly long meeting.",
    "focalWordIds": [
      "w_meeting",
      "w_tired",
      "w_bored",
      "w_colleague",
      "w_shuʿuur",
      "w_fikra"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "والله الاجتماع كان طويل جدا، تعبت منه",
        "translation": "By God, the meeting was so long, I got tired of it.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Agree and say how it made you feel.",
        "options": [
          {
            "text": "أنا كذلك! أحسيت بالملل من أول ساعة",
            "translation": "Me too! I felt bored from the first hour.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أحسيت — past tense of feeling — used correctly. Natural commiserating!"
          },
          {
            "text": "ما كان طويل، كان مفيد",
            "translation": "It wasn't long, it was useful.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "A bit defensive — your colleague wanted to vent, not debate."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "بصراحة، كان ممكن نخلصها في إيميل وحد",
        "translation": "Honestly, we could've wrapped it up in one email.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "يمكن، بس أنا تعبت. على الأقل خلص",
        "translation": "Maybe, but I'm tired. At least it's over.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Suggest a better approach for next time.",
        "options": [
          {
            "text": "صح كلامك. لازم نحدد وقت للاجتماع وما نتجاوزه",
            "translation": "You're right. We need to set a meeting time and not exceed it.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Constructive and practical — great use of لازم for obligation."
          },
          {
            "text": "يلا، المرة الجاية بتكون أحسن إن شاء الله",
            "translation": "Come on, next time will be better God willing.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "إن شاء الله fits naturally — but no concrete fix offered."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "فكرة زينة، والله نكلم المدير عن هذا",
        "translation": "Good idea, by God let's talk to the manager about this.",
        "end": true
      }
    ],
    "completionMessage": "Great job venting and problem-solving in Saudi Arabic! تعبت, الملل, and اجتماع felt natural."
  },
  {
    "id": "saudi_convo_p7_friend_breakup",
    "phase": 7,
    "title": "Friend Going Through a Breakup",
    "description": "Support a friend who just ended a relationship.",
    "focalWordIds": [
      "w_sad",
      "w_qalb",
      "w_shuʿuur",
      "w_nafs",
      "w_khaafa",
      "w_hayaa"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "انتهت العلاقة. أنا تعبان وما أعرف شو أحس",
        "translation": "The relationship ended. I'm worn out and don't know what to feel.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Show empathy and ask how he's holding up.",
        "options": [
          {
            "text": "والله يا أخي، هذا وجع. كيف قلبك الحين؟",
            "translation": "By God, brother, that's painful. How's your heart right now?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "كيف قلبك — \"how's your heart\" — deeply natural Saudi emotional check-in."
          },
          {
            "text": "لا تهتم، في بنات ثانيات",
            "translation": "Don't worry, there are other girls.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Too soon for that — he needs to be heard first."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "قلبي تعبان. أحس بالخوف من المستقبل بصراحة",
        "translation": "My heart is tired. I honestly feel afraid of the future.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "يمكن، بس أنا ما أقدر أفكر بهذا الحين. أحس بخوف",
        "translation": "Maybe, but I can't think about that now. I feel afraid.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Acknowledge his fear and offer support.",
        "options": [
          {
            "text": "طبيعي تحس بالخوف. أنا معاك مهما صار",
            "translation": "It's natural to feel fear. I'm with you no matter what.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "مهما صار — \"no matter what\" — powerful support phrase. أحسنت."
          },
          {
            "text": "الخوف ضعف، قوى نفسك",
            "translation": "Fear is weakness, strengthen yourself.",
            "nextStepId": "s5b",
            "correct": false,
            "feedback": "This dismisses his خوف — not what a hurting friend needs."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "شكرا يا أخي. والله أنت زميل ما يطلع بالدنيا",
        "translation": "Thank you, brother. By God, you're a friend that can't be found in this world.",
        "end": true
      },
      {
        "id": "s5b",
        "speaker": "partner",
        "text": "أنا أحاول. بس الحياة صعبة أحيانا. شكرا على الوقوف معاي",
        "translation": "I'm trying. But life is hard sometimes. Thanks for standing by me.",
        "end": true
      }
    ],
    "completionMessage": "You were a real support! قلب, خوف, and شعور at Phase 7 emotional depth — شاطر!"
  },
  {
    "id": "saudi_convo_p7_friend_promotion",
    "phase": 7,
    "title": "Friend Gets a Promotion",
    "description": "Celebrate your friend's exciting promotion at work.",
    "focalWordIds": [
      "w_excited",
      "w_happy",
      "w_shuʿuur",
      "w_fakkara",
      "w_colleague",
      "w_know"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "يا أخي، ترقيت في الشغل اليوم! ما صدقت نفسي",
        "translation": "Bro, I got promoted at work today! I couldn't believe myself.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Congratulate him enthusiastically.",
        "options": [
          {
            "text": "مبروووك! والله تستاهل أكثر من كذا!",
            "translation": "Congratulations! By God, you deserve more than that!",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Energetic مبروك + تستاهل — perfect warmth for this moment."
          },
          {
            "text": "زين، إن شاء الله يكون زين لك",
            "translation": "Good, hopefully it works out for you.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "A bit muted for a promotion — he's متحمس and needs matching energy."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أنا متحمس جدا! أحس إن تعبي ما ضاع",
        "translation": "I'm so excited! I feel like my hard work wasn't wasted.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "هههه يلا إن شاء الله. بس أنا متحمس فعلا",
        "translation": "Haha, God willing. But I really am excited.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask how he found out and what it means.",
        "options": [
          {
            "text": "كيف عرفت؟ المدير كلمك مباشرة؟",
            "translation": "How did you find out? Did the manager talk to you directly?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "عرفت (past of عرف) — natural curiosity question, perfectly phrased."
          },
          {
            "text": "شو راتبك الجديد؟",
            "translation": "What's your new salary?",
            "nextStepId": "s5b",
            "correct": false,
            "feedback": "Too direct for Saudi culture — asking about salary feels intrusive here."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "إي والله، طلبني لمكتبه وقال لي الخبر. ما صدقت!",
        "translation": "Yes by God, he called me to his office and told me the news. I couldn't believe it!",
        "end": true
      },
      {
        "id": "s5b",
        "speaker": "partner",
        "text": "هههه، هذا سؤال ثاني! المهم المدير قال إني استاهل الترقية",
        "translation": "Haha, that's another question! The important thing is the manager said I deserve the promotion.",
        "end": true
      }
    ],
    "completionMessage": "Beautiful celebration in Saudi Arabic! متحمس, مبسوط, and شعور all landed naturally."
  },
  {
    "id": "saudi_convo_p7_dinner_invite",
    "phase": 7,
    "title": "Dinner Invitation",
    "description": "A friend invites you over for dinner at his place.",
    "focalWordIds": [
      "w_happy",
      "w_shuʿuur",
      "w_fikra",
      "w_remember",
      "w_nafs",
      "w_jalasa"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أبغاك تيجي تتعشى عندنا الليلة، أمي طبخت كبسة",
        "translation": "I want you to come have dinner at our place tonight, my mom made kabsa.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond to the invitation.",
        "options": [
          {
            "text": "والله ما أقدر أرفض كبسة أم خالد! إن شاء الله آجي",
            "translation": "By God I can't refuse Umm Khalid's kabsa! I'll come God willing.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Warm, personal, and enthusiastic — exactly the Saudi dinner invite energy."
          },
          {
            "text": "ما أقدر الليلة، أنا تعبان",
            "translation": "I can't tonight, I'm tired.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Valid excuse, but declining without softer phrasing can feel abrupt."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ممتاز! تقدر تجي الساعة سبعة؟",
        "translation": "Excellent! Can you come at seven?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "لا يهمك، خلنا نحدد يوم ثاني. تتذكر إننا ما اجتمعنا من زمان؟",
        "translation": "No worries, let's set another day. Remember we haven't gathered in a long time?",
        "next": "s4b"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Confirm the time and ask if you should bring anything.",
        "options": [
          {
            "text": "الساعة سبعة زين. أجيب شي معاي؟",
            "translation": "Seven is fine. Shall I bring something with me?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أجيب — \"shall I bring\" — polite guest question, very natural."
          },
          {
            "text": "تمام، إلى الساعة سبعة",
            "translation": "Done, see you at seven.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Fine, but offering to bring something is a warmth signal worth learning."
          }
        ]
      },
      {
        "id": "s4b",
        "speaker": "user",
        "prompt": "Agree to set another day and reminisce a little.",
        "options": [
          {
            "text": "والله صح، أتذكر آخر مرة التقينا كان العيد",
            "translation": "By God that's true, I remember the last time we met was Eid.",
            "nextStepId": "s5b",
            "correct": true,
            "feedback": "أتذكر (present of remember) used beautifully to reminisce."
          },
          {
            "text": "يلا، أي يوم يناسبك",
            "translation": "OK, any day that suits you.",
            "nextStepId": "s5b",
            "correct": false,
            "feedback": "Flexible but missed the warm nostalgia moment."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "لا ما تجيب شي، أنت كفاية. بنجلس ونحكي ونستمتع",
        "translation": "No, don't bring anything, you're enough. We'll sit and talk and enjoy ourselves.",
        "end": true
      },
      {
        "id": "s5b",
        "speaker": "partner",
        "text": "أيوه والله! يلا نتفق على الجمعة إن شاء الله",
        "translation": "Yes by God! Let's agree on Friday God willing.",
        "end": true
      }
    ],
    "completionMessage": "You navigated a warm Saudi dinner invite! أتذكر, والله, and إن شاء الله used naturally."
  },
  {
    "id": "saudi_convo_p7_help_with_project",
    "phase": 7,
    "title": "Asking for Help on a Project",
    "description": "Ask a knowledgeable colleague for help on a tricky work project.",
    "focalWordIds": [
      "w_know",
      "w_fikra",
      "w_fakkara",
      "w_tafkiir",
      "w_colleague",
      "w_maʿrifa"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "شو عندك؟ تبدو مشغول الذهن اليوم",
        "translation": "What's up? You look preoccupied today.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Explain you're stuck on a project and ask for help.",
        "options": [
          {
            "text": "بصراحة، عندي مشكلة في المشروع وما أعرف كيف أحلها. تقدر تساعدني؟",
            "translation": "Honestly, I have a problem on the project and I don't know how to solve it. Can you help me?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Direct, honest, and polite — بصراحة opens the door perfectly."
          },
          {
            "text": "لا شي، كله تمام",
            "translation": "Nothing, everything's fine.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Missed a chance to get real help — pride vs. progress."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أكيد! أنا معاك. شو المشكلة بالضبط؟",
        "translation": "Of course! I'm with you. What's the problem exactly?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "إذا احتجت شي قولي. أنا أعرف هذا النوع من المشاريع زين",
        "translation": "If you need anything, tell me. I know this type of project well.",
        "next": "s4b"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Describe the problem and ask his opinion.",
        "options": [
          {
            "text": "ما أعرف كيف أرتب البيانات. شو تفكيرك؟",
            "translation": "I don't know how to organize the data. What's your thinking?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "تفكيرك — \"your thinking\" — natural peer-to-peer Saudi request for input."
          },
          {
            "text": "المشروع صعب وما عندي وقت",
            "translation": "The project is hard and I have no time.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Venting without asking a clear question is less productive."
          }
        ]
      },
      {
        "id": "s4b",
        "speaker": "user",
        "prompt": "Take him up on his offer and explain the issue.",
        "options": [
          {
            "text": "والله زين إنك قلت، عندي إشكالية في ترتيب البيانات",
            "translation": "By God it's good you said that, I have a problem with organizing the data.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "والله زين إنك قلت — warm lead-in to asking for expertise."
          },
          {
            "text": "شكرا، بعدين أسألك",
            "translation": "Thanks, I'll ask you later.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Delaying wastes his offer — seize the moment."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "فهمت المشكلة. عندي فكرة ممتازة، خلنا نجلس بعد الغداء وأشرح لك",
        "translation": "I understood the problem. I have an excellent idea, let's sit after lunch and I'll explain to you.",
        "end": true
      }
    ],
    "completionMessage": "Great professional conversation! أعرف, تفكير, and فكرة all used in authentic context."
  },
  {
    "id": "saudi_convo_p7_late_apology_work",
    "phase": 7,
    "title": "Apologizing for Being Late to Work",
    "description": "Apologize to your boss for arriving late and explain what happened.",
    "focalWordIds": [
      "w_tired",
      "w_nafs",
      "w_forget",
      "w_shuʿuur",
      "w_know",
      "w_fakkara"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تأخرت اليوم، شو اللي صاير؟",
        "translation": "You were late today, what's going on?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Apologize and explain why you were late.",
        "options": [
          {
            "text": "آسف جدا، ما نمت زين الليلة وما سمعت المنبه",
            "translation": "I'm very sorry, I didn't sleep well last night and didn't hear the alarm.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Honest and direct — ما نمت زين (didn't sleep well) is a natural Phase 7 phrase."
          },
          {
            "text": "الزحمة كانت شديدة اليوم",
            "translation": "Traffic was really bad today.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Acceptable excuse, but blame-shifting without apology first is weak."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أفهمك، بس الشغل يبدأ الساعة ثمانية. تعرف هذا؟",
        "translation": "I understand you, but work starts at eight. You know that, right?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "الزحمة مشكلة الجميع. لازم تخرج أبكر. تعرف هذا؟",
        "translation": "Traffic is everyone's problem. You need to leave earlier. You know this, right?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Acknowledge and commit to doing better.",
        "options": [
          {
            "text": "أعرف وأنا آسف. هذا ما يصير ثاني، وعد",
            "translation": "I know and I'm sorry. This won't happen again, I promise.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أعرف + وعد (promise) — accountable and mature response."
          },
          {
            "text": "إن شاء الله أحاول",
            "translation": "God willing I'll try.",
            "nextStepId": "s5b",
            "correct": false,
            "feedback": "إن شاء الله alone sounds noncommittal to a manager expecting accountability."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "زين، أنا أثق فيك. خل هذي المرة الأخيرة",
        "translation": "Good, I trust you. Let this be the last time.",
        "end": true
      },
      {
        "id": "s5b",
        "speaker": "partner",
        "text": "أحتاج أكثر من إن شاء الله. أريد التزام واضح منك",
        "translation": "I need more than God willing. I want a clear commitment from you.",
        "end": true
      }
    ],
    "completionMessage": "You handled a tough workplace moment with honesty. أعرف, آسف, and ما نمت زين — all Phase 7 gold."
  },
  {
    "id": "saudi_convo_p7_lunch_invite",
    "phase": 7,
    "title": "Lunch Invitation at Work",
    "description": "A colleague invites you to join the team for lunch.",
    "focalWordIds": [
      "w_happy",
      "w_colleague",
      "w_meeting",
      "w_jalasa",
      "w_shuʿuur",
      "w_nafs"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "يا أخي، الفريق كله رايحين للغداء. تيجي معنا؟",
        "translation": "Bro, the whole team is going to lunch. Are you coming with us?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond to the lunch invite.",
        "options": [
          {
            "text": "إي والله! مبسوط إنكم طلبتموني. وين رايحين؟",
            "translation": "Yes by God! I'm happy you invited me. Where are you going?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "مبسوط إنكم طلبتموني — expressing happiness at being included is perfect."
          },
          {
            "text": "ما أقدر، عندي اجتماع بعد شوي",
            "translation": "I can't, I have a meeting in a bit.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Valid, but check if the meeting is worth missing team bonding."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "رايحين للمطعم اللي قدام المبنى. يقولون أكله حلو",
        "translation": "Going to the restaurant in front of the building. They say the food is good.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "لا يهمك، المرة الجاية. أتذكر كمان ما حضرت الغداء الأسبوع الماضي",
        "translation": "No worries, next time. I also remember you didn't come to lunch last week.",
        "next": "s4b"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Express excitement about the food.",
        "options": [
          {
            "text": "والله أحس إني محتاج أجلس مع الفريق، تعبت من الأكل بالمكتب",
            "translation": "By God I feel I need to sit with the team, I got tired of eating at the office.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحس + تعبت من — feelings vocab used naturally in a light context."
          },
          {
            "text": "زين، يلا نمشي",
            "translation": "Fine, let's go.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Works, but sharing the feeling makes you more personable."
          }
        ]
      },
      {
        "id": "s4b",
        "speaker": "user",
        "prompt": "Acknowledge and commit to being more social.",
        "options": [
          {
            "text": "صح، أنا آسف. حاول أكون معاكم أكثر إن شاء الله",
            "translation": "True, I'm sorry. I'll try to be with you guys more God willing.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Honest self-reflection and commitment — mature and warm."
          },
          {
            "text": "كنت مشغول، ما قدرت",
            "translation": "I was busy, I couldn't.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Defensive without acknowledging his point."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "هههه والله نفس الشعور! يلا نمشي قبل ما يمتلئ المطعم",
        "translation": "Haha by God, same feeling! Let's go before the restaurant fills up.",
        "end": true
      }
    ],
    "completionMessage": "Nice lunch banter in Saudi Arabic! مبسوط, أحس, and تعبت used in everyday light contexts."
  },
  {
    "id": "saudi_convo_p7_friend_stressed",
    "phase": 7,
    "title": "Friend is Stressed Out",
    "description": "Help a stressed friend talk through what's bothering them.",
    "focalWordIds": [
      "w_tired",
      "w_khaafa",
      "w_shuʿuur",
      "w_qalb",
      "w_nafs",
      "w_hayaa"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "ما أقدر أنام، كل يوم أفكر بأشياء كثيرة وأحس بضغط",
        "translation": "I can't sleep, every day I think about many things and feel pressure.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Validate his stress and dig deeper.",
        "options": [
          {
            "text": "والله يا صديقي، هذا تعب. إيش اللي يضغط عليك أكثر؟",
            "translation": "By God my friend, that's exhausting. What pressures you the most?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Open, caring question after validating — the gold standard for support."
          },
          {
            "text": "لازم تروح تنام بكير",
            "translation": "You need to go sleep early.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Practical advice before listening feels dismissive of his feelings."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أخاف من المستقبل، من الشغل، من كل شي. قلبي ما يهدأ",
        "translation": "I'm afraid of the future, of work, of everything. My heart won't calm down.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "النوم ما يحل المشكلة. أنا خايف من المستقبل",
        "translation": "Sleep won't fix the problem. I'm afraid of the future.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Offer perspective and encouragement.",
        "options": [
          {
            "text": "أعرف هذا الشعور. الخوف طبيعي، بس الحياة تكمل. أنا معاك",
            "translation": "I know this feeling. Fear is natural, but life goes on. I'm with you.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Deeply empathetic — الحياة تكمل + أنا معاك is genuine solidarity."
          },
          {
            "text": "الحياة صعبة للجميع، اصبر",
            "translation": "Life is hard for everyone, be patient.",
            "nextStepId": "s5b",
            "correct": false,
            "feedback": "True but impersonal — he needs more than \"everyone suffers.\""
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "شكرا يا أخي. بس كونك موجود يخفف عني كثير",
        "translation": "Thank you brother. Just you being here relieves me a lot.",
        "end": true
      },
      {
        "id": "s5b",
        "speaker": "partner",
        "text": "يمكن. بس أتمنى يكون عندي شخص يفهمني أكثر",
        "translation": "Maybe. But I wish I had someone who understood me more.",
        "end": true
      }
    ],
    "completionMessage": "Emotional depth achieved! خوف, قلب, and شعور all used authentically in a caring conversation."
  },
  {
    "id": "saudi_convo_p7_disagreement_polite",
    "phase": 7,
    "title": "Polite Disagreement at Work",
    "description": "Respectfully disagree with a colleague's idea during a work discussion.",
    "focalWordIds": [
      "w_fikra",
      "w_fakkara",
      "w_tafkiir",
      "w_know",
      "w_maʿrifa",
      "w_colleague"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أنا أقترح نغير الخطة كلها من الأساس، شو رأيك؟",
        "translation": "I suggest we change the whole plan from the ground up, what do you think?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respectfully disagree and offer a counter-idea.",
        "options": [
          {
            "text": "بصراحة، أحس إن الفكرة هذي بتكلفنا وقت كثير. في فكرة ثانية؟",
            "translation": "Honestly, I feel this idea will cost us a lot of time. Is there another idea?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "بصراحة + أحس softens the disagreement brilliantly. Very Saudi."
          },
          {
            "text": "لا، هذي فكرة غلط",
            "translation": "No, this is a wrong idea.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Too blunt — in Saudi culture, softer disagreement preserves relationships."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أفهم وجهة نظرك. شو تقترح أنت؟",
        "translation": "I understand your perspective. What do you suggest?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "ليش غلط؟ قولي تفكيرك",
        "translation": "Why wrong? Tell me your thinking.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Present your alternative approach.",
        "options": [
          {
            "text": "أقترح نعدل الخطة بدل ما نغيرها كلها. أعرف طريقة أسرع",
            "translation": "I suggest we modify the plan instead of changing it entirely. I know a faster method.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أعرف طريقة — \"I know a method\" — confident and constructive."
          },
          {
            "text": "ما أعرف بالضبط، بس شي أبسط من هذا",
            "translation": "I don't know exactly, but something simpler than this.",
            "nextStepId": "s5b",
            "correct": false,
            "feedback": "Honest but vague — concrete ideas win disagreements in meetings."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "هذا تفكير زين. خلنا نجلس مع الفريق ونناقش الفكرتين",
        "translation": "That's good thinking. Let's sit with the team and discuss both ideas.",
        "end": true
      },
      {
        "id": "s5b",
        "speaker": "partner",
        "text": "يمكن، بس لازم عندنا خطة واضحة. اشتغل على فكرة محددة وارجع لي",
        "translation": "Maybe, but we need a clear plan. Work on a specific idea and come back to me.",
        "end": true
      }
    ],
    "completionMessage": "You disagreed like a pro! بصراحة, تفكير, and فكرة made for mature workplace dialogue."
  },
  {
    "id": "saudi_convo_p7_sister_advice",
    "phase": 7,
    "title": "Asking Your Sister for Advice",
    "description": "Ask your sister for advice about a difficult work decision.",
    "focalWordIds": [
      "w_fakkara",
      "w_fikra",
      "w_know",
      "w_shuʿuur",
      "w_khaafa",
      "w_nafs"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "شو فيك؟ أحسك مشغول البال من الصبح",
        "translation": "What's wrong? I've sensed you've been preoccupied since morning.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Open up to your sister about the dilemma.",
        "options": [
          {
            "text": "بصراحة، عندي قرار صعب في الشغل وما أعرف شو أسوي",
            "translation": "Honestly, I have a hard decision at work and I don't know what to do.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Opening up with بصراحة to family is natural and builds trust."
          },
          {
            "text": "لا شي، كله تمام",
            "translation": "Nothing, everything is fine.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "She already sensed something — shutting down misses real support."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "قولي، أنا دايمًا معاك. شو القرار؟",
        "translation": "Tell me, I'm always with you. What's the decision?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "أنا أعرفك أحسن من نفسك، في شي يضايقك. قولي",
        "translation": "I know you better than yourself, something is bothering you. Tell me.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Explain the decision and your fear.",
        "options": [
          {
            "text": "عرضوا عليّ وظيفة جديدة بس أخاف أترك الشغل الحالي",
            "translation": "They offered me a new job but I'm afraid to leave the current one.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أخاف (present fear) combined with real context — excellent Phase 7 use."
          },
          {
            "text": "ما أبغى أتكلم عن الشغل بالبيت",
            "translation": "I don't want to talk about work at home.",
            "nextStepId": "s5b",
            "correct": false,
            "feedback": "Pulling back after she asked nicely feels like a brush-off."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "فكر في اللي يريحك. ما الشغل يساوي راحة بالك. أنا أدعي لك",
        "translation": "Think about what gives you peace. Work isn't worth your peace of mind. I'll pray for you.",
        "end": true
      },
      {
        "id": "s5b",
        "speaker": "partner",
        "text": "تمام، بس أنا هنا لما تبغى تتكلم. الباب مفتوح دايمًا",
        "translation": "OK, but I'm here whenever you want to talk. The door is always open.",
        "end": true
      }
    ],
    "completionMessage": "Emotional family dialogue mastered! أخاف, أعرف, and بصراحة in authentic sibling context."
  },
  {
    "id": "saudi_convo_p7_friend_visit_sick",
    "phase": 7,
    "title": "Visiting a Sick Friend",
    "description": "Visit and comfort a friend who is unwell.",
    "focalWordIds": [
      "w_tired",
      "w_sad",
      "w_shuʿuur",
      "w_khaafa",
      "w_nafs",
      "w_qalb"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "شكرا إنك جيت تزورني. والله تعبت من المرض",
        "translation": "Thank you for coming to visit me. By God I'm tired of being sick.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Express concern and ask how he's feeling.",
        "options": [
          {
            "text": "الله يشفيك يا أخي. كيف تحس الحين؟",
            "translation": "May God heal you, brother. How do you feel now?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "الله يشفيك is the essential Saudi sick visit phrase — perfectly placed."
          },
          {
            "text": "شو عندك بالضبط؟ هل ذهبت للدكتور؟",
            "translation": "What exactly do you have? Did you go to the doctor?",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Information-first before warmth feels clinical for a friend visit."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أحسن شوي الحمد لله، بس لسا أحس بتعب في نفسي",
        "translation": "A bit better praise God, but I still feel tiredness in myself.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "رحت للدكتور، قال عندي تعب عام. بس والله قلبي مو زين",
        "translation": "I went to the doctor, he said general fatigue. But by God my heart isn't good.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Offer to stay and keep him company.",
        "options": [
          {
            "text": "أنا معاك اليوم، ما تحتاج تكون لحالك. شو تبغى؟",
            "translation": "I'm with you today, you don't need to be alone. What do you want?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ما تحتاج تكون لحالك — \"you don't need to be alone\" — beautiful companionship."
          },
          {
            "text": "إن شاء الله تتحسن بسرعة، أنا لازم أروح",
            "translation": "God willing you'll improve quickly, I have to go.",
            "nextStepId": "s5b",
            "correct": false,
            "feedback": "Visiting and then rushing out sends mixed signals."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "والله يكفيك وجودك. بس اجلس شوي واحكيني عن أخبارك",
        "translation": "By God your presence is enough. Just sit a while and tell me your news.",
        "end": true
      },
      {
        "id": "s5b",
        "speaker": "partner",
        "text": "لا يهمك، شكرا إنك مريت. هذا يكفي",
        "translation": "No worries, thanks for stopping by. That's enough.",
        "end": true
      }
    ],
    "completionMessage": "You gave a beautiful Saudi sick visit! الله يشفيك, تعبان, and أحس all felt completely natural."
  },
  {
    "id": "saudi_convo_p7_father_proud",
    "phase": 7,
    "title": "Father Expresses Pride",
    "description": "Respond to your father telling you he's proud of your work.",
    "focalWordIds": [
      "w_happy",
      "w_excited",
      "w_shuʿuur",
      "w_fakkara",
      "w_hayaa",
      "w_nafs"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "يا بني، أنا فخور فيك. شغلك ونجاحك يسعدني",
        "translation": "My son, I'm proud of you. Your work and success make me happy.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond with humility and gratitude.",
        "options": [
          {
            "text": "والله يا أبوي، كلامك هذا يملأ قلبي. أنت اللي علمتني كل شي",
            "translation": "By God, father, your words fill my heart. You're the one who taught me everything.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "يملأ قلبي — beautiful emotional expression. Respectful Saudi tone to father."
          },
          {
            "text": "أنا بس أشتغل زين، ما في شي كبير",
            "translation": "I just work well, it's nothing big.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Humble is fine but deflecting fully doesn't honor his moment of sharing."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "لا، النجاح من تعبك ومن ربك. أنا فقط دعيت لك",
        "translation": "No, success is from your hard work and from God. I only prayed for you.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "لا تقلل من نفسك يا بني، أنا أعرف كم تعبت",
        "translation": "Don't undervalue yourself, son. I know how hard you worked.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Share how his support made you feel.",
        "options": [
          {
            "text": "دعاؤك وراء كل نجاح. أحس بالسعادة لما أعرف إنك مبسوط مني",
            "translation": "Your prayers are behind every success. I feel happy knowing you're pleased with me.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحس + مبسوط in the context of family pride — authentic emotional expression."
          },
          {
            "text": "إن شاء الله أكمل التعب في المستقبل",
            "translation": "God willing I'll keep working hard in the future.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Forward-looking is good but skips the emotional moment with him."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "حياتك يا بني. الله يحفظك ويوفقك دايمًا",
        "translation": "You're my life, son. May God protect you and guide you always.",
        "end": true
      }
    ],
    "completionMessage": "A touching family exchange! قلبي, مبسوط, and أحس conveyed real emotional warmth."
  },
  {
    "id": "saudi_convo_p7_friend_quit_job",
    "phase": 7,
    "title": "Friend Quits His Job",
    "description": "React to a friend's surprise news that he quit his job.",
    "focalWordIds": [
      "w_khaafa",
      "w_shuʿuur",
      "w_fakkara",
      "w_know",
      "w_excited",
      "w_hayaa"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "قلت لك شي؟ استقلت من الشغل امبارح",
        "translation": "Did I tell you something? I quit work yesterday.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "React with surprise and ask what happened.",
        "options": [
          {
            "text": "والله؟! شو صاير؟ كيف قررت فجأة؟",
            "translation": "Really?! What's going on? How did you decide so suddenly?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Genuine surprise + open question — natural and engaged."
          },
          {
            "text": "زين إن شاء الله",
            "translation": "Good, God willing.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Too calm for shocking news — he expected more reaction."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "فكرت فيها كثير. ما كنت مبسوطا هناك، وأبغى أشتغل لحسابي",
        "translation": "I thought about it a lot. I wasn't happy there, and I want to work for myself.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "إن شاء الله. بس ما صدقت إنك ما تسألني أكثر!",
        "translation": "God willing. But I can't believe you didn't ask me more!",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Support the decision but check he's thought it through.",
        "options": [
          {
            "text": "أنا وراك! بس أخاف عليك، هل عندك خطة؟",
            "translation": "I'm behind you! But I'm worried about you, do you have a plan?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أخاف عليك — \"I'm worried about you\" — caring without being discouraging."
          },
          {
            "text": "هذا قرار غلط، الشغل ضروري",
            "translation": "This is a wrong decision, work is necessary.",
            "nextStepId": "s5b",
            "correct": false,
            "feedback": "Unsupportive and lecturing — he needs encouragement not a lecture."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "إي، عندي فكرة مشروع من زمان. الحين هو الوقت. أنا متحمس والله",
        "translation": "Yes, I've had a project idea for a long time. Now is the time. I'm excited by God.",
        "end": true
      },
      {
        "id": "s5b",
        "speaker": "partner",
        "text": "أعرف إن في خطر، بس الحياة ما تكمل بدون مغامرة. شكرا على الرأي",
        "translation": "I know there's risk, but life doesn't move forward without adventure. Thanks for the opinion.",
        "end": true
      }
    ],
    "completionMessage": "Real friend support in Saudi Arabic! أخاف عليك, متحمس, and فكرت all landed beautifully."
  },
  {
    "id": "saudi_convo_p7_invite_party",
    "phase": 7,
    "title": "Inviting a Friend to a Party",
    "description": "Invite a hesitant friend to join a gathering.",
    "focalWordIds": [
      "w_happy",
      "w_excited",
      "w_shuʿuur",
      "w_jalasa",
      "w_nafs",
      "w_colleague"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "يا أخي، عندنا سهرة الجمعة عند بيت سالم. تيجي؟",
        "translation": "Bro, we have a gathering Friday night at Salem's place. Are you coming?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond to the party invitation.",
        "options": [
          {
            "text": "إي والله، أنا متحمس! من رح يكون هناك؟",
            "translation": "Yes by God, I'm excited! Who's going to be there?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "متحمس + natural follow-up question — energetic and social."
          },
          {
            "text": "ما أدري، أنا تعبان هالأيام",
            "translation": "I don't know, I'm tired these days.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Hedging is honest, but he'll try to convince you — be ready."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "كل الشباب، والزملاء من الشغل كذلك. بتكون سهرة ممتعة",
        "translation": "All the guys, and work colleagues too. It'll be a fun night.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "بالضبط عشان تيجي! التعب يروح لما تجلس مع الناس",
        "translation": "Exactly why you should come! Tiredness goes away when you sit with people.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Confirm you'll go and ask what time.",
        "options": [
          {
            "text": "تمام، إن شاء الله أكون معاكم. الساعة كم تبدأ؟",
            "translation": "Alright, God willing I'll be with you. What time does it start?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "إن شاء الله + asking details — committed and practical."
          },
          {
            "text": "إن شاء الله أجي، بس ما أضمن",
            "translation": "God willing I'll come, but I can't promise.",
            "nextStepId": "s5b",
            "correct": false,
            "feedback": "A soft commit — he'll be disappointed if you don't show."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "بعد العشاء، حوالي الساعة تسعة. لا تتأخر عليّ!",
        "translation": "After dinner, around nine. Don't be late on me!",
        "end": true
      },
      {
        "id": "s5b",
        "speaker": "partner",
        "text": "حاول يا أخي، بنتعب لك. الشباب كلهم يسألون عنك",
        "translation": "Try bro, we'll miss you. All the guys are asking about you.",
        "end": true
      }
    ],
    "completionMessage": "Fun social invitation nailed! متحمس, إن شاء الله, and مبسوط in natural party-planning dialogue."
  },
  {
    "id": "saudi_convo_p7_friend_moving_city",
    "phase": 7,
    "title": "Friend Moving to Another City",
    "description": "React to your close friend announcing he's moving cities.",
    "focalWordIds": [
      "w_sad",
      "w_shuʿuur",
      "w_khaafa",
      "w_remember",
      "w_hayaa",
      "w_qalb"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "قررت أنتقل للرياض الشهر الجاي، الشغل هناك أحسن",
        "translation": "I decided to move to Riyadh next month, work there is better.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "React with mixed feelings — happy for him but sad to see him go.",
        "options": [
          {
            "text": "والله يا أخي، قلبي مبسوط لك وزعلان في نفس الوقت",
            "translation": "By God brother, my heart is happy for you and sad at the same time.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Holding two feelings at once — قلبي مبسوط + زعلان — emotionally sophisticated."
          },
          {
            "text": "زين لك، الرياض كبيرة",
            "translation": "Good for you, Riyadh is big.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Factual but emotionally flat for news about a close friend leaving."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أنا كذلك أحس بنفس الشيء. أخاف إنك تنساني",
        "translation": "I also feel the same thing. I'm afraid you'll forget me.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "إي، بس أنا أحس بحزن شوي. ما سهل",
        "translation": "Yes, but I feel a bit sad. It's not easy.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Reassure him about the friendship.",
        "options": [
          {
            "text": "أنساك؟ مستحيل! أتذكر كل شي مريناه سوا. الصداقة ما تنتهي بمسافة",
            "translation": "Forget you? Impossible! I remember everything we've been through together. Friendship doesn't end with distance.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أتذكر + الصداقة ما تنتهي بمسافة — deeply heartfelt and authentic."
          },
          {
            "text": "التليفون موجود، نتواصل",
            "translation": "The phone exists, we'll keep in touch.",
            "nextStepId": "s5b",
            "correct": false,
            "feedback": "Practical truth, but it deflates the emotional moment."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "والله كلامك يريح قلبي. الصديق الحقيقي ما يتغير بالمسافة",
        "translation": "By God your words comfort my heart. A true friend doesn't change with distance.",
        "end": true
      },
      {
        "id": "s5b",
        "speaker": "partner",
        "text": "صح. إن شاء الله نتواصل. بس هات الأحضان قبل ما أسافر",
        "translation": "True. God willing we'll keep in touch. But give me a hug before I travel.",
        "end": true
      }
    ],
    "completionMessage": "Beautifully emotional! أتذكر, قلبي, and زعلان showed real Phase 7 emotional range."
  },
  {
    "id": "saudi_convo_p7_compliment_work",
    "phase": 7,
    "title": "Complimenting a Colleague's Work",
    "description": "Compliment a colleague on an impressive presentation they gave.",
    "focalWordIds": [
      "w_excited",
      "w_happy",
      "w_fikra",
      "w_fakkara",
      "w_colleague",
      "w_maʿrifa"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "شو رأيك بالعرض اللي قدمته اليوم؟",
        "translation": "What did you think of the presentation I gave today?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Give a genuine compliment on the presentation.",
        "options": [
          {
            "text": "والله كان رائع! أفكارك كانت واضحة ومبدعة. مبسوطت لك",
            "translation": "By God it was amazing! Your ideas were clear and creative. I was happy for you.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Specific praise + مبسوطت لك — genuine and warm, not just polite."
          },
          {
            "text": "كان زين",
            "translation": "It was good.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Accurate but bland — a colleague who asked deserves richer feedback."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الحمد لله! والله فكرت فيه كثير. كنت خايف ما يعجب الناس",
        "translation": "Praise God! By God I thought about it a lot. I was afraid people wouldn't like it.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "بس زين؟ ما في شي مميز؟",
        "translation": "Just good? Nothing special?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Reassure him and mention a specific strength.",
        "options": [
          {
            "text": "الخوف طبيعي قبل العرض. بس الفكرة اللي قدمتها في النهاية كانت أحسن شي",
            "translation": "Fear before a presentation is natural. But the idea you presented at the end was the best thing.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Specific feedback + normalizing خوف — emotionally intelligent compliment."
          },
          {
            "text": "ما كان عندك سبب للخوف",
            "translation": "You had no reason to be afraid.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Dismissing his خوف instead of addressing it misses the connection."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "شكرا يا زميلي، كلامك يحمسني أكثر للمرة الجاية",
        "translation": "Thank you colleague, your words motivate me even more for next time.",
        "end": true
      }
    ],
    "completionMessage": "Sincere workplace praise delivered! فكرة, خايف, and مبسوط in a natural colleague moment."
  },
  {
    "id": "saudi_convo_p7_request_day_off",
    "phase": 7,
    "title": "Requesting a Day Off",
    "description": "Ask your manager for a day off for a personal reason.",
    "focalWordIds": [
      "w_tired",
      "w_khaafa",
      "w_shuʿuur",
      "w_nafs",
      "w_know",
      "w_fakkara"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "إيش عندك؟ تبدو مو بخير من أول الأسبوع",
        "translation": "What's up? You've looked unwell since the start of the week.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Explain and request a day off.",
        "options": [
          {
            "text": "بصراحة، أنا تعبان شوي وأحتاج يوم أرتاح. ممكن آخذ غداً إجازة؟",
            "translation": "Honestly, I'm a bit tired and I need a day to rest. Can I take tomorrow off?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Direct, respectful, and uses بصراحة — the right approach with a manager."
          },
          {
            "text": "كله تمام، بس أبغى يوم إجازة بكرة",
            "translation": "Everything's fine, I just want a day off tomorrow.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Contradiction (fine + need day off) weakens credibility."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تعبان كيف؟ شو اللي تحس فيه؟",
        "translation": "Tired how? What do you feel?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "لو كله تمام ليش تبغى إجازة؟ قولي الحقيقة",
        "translation": "If everything is fine why do you want a day off? Tell me the truth.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Explain your condition more honestly.",
        "options": [
          {
            "text": "أحس بتعب نفسي أكثر من جسدي. أحتاج أرتب أفكاري",
            "translation": "I feel mental tiredness more than physical. I need to organize my thoughts.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Vulnerability + تعب نفسي — honest and mature self-awareness at Phase 7."
          },
          {
            "text": "عندي صداع بس، مش مشكلة كبيرة",
            "translation": "I have a headache but, it's not a big problem.",
            "nextStepId": "s5b",
            "correct": false,
            "feedback": "Minimizing again — undermines your own request."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "أفهمك. خذ يوم وارتاح. الصحة أهم من الشغل. ارجع بخير",
        "translation": "I understand you. Take a day and rest. Health is more important than work. Come back well.",
        "end": true
      },
      {
        "id": "s5b",
        "speaker": "partner",
        "text": "إذا ما في شي كبير، اشتغل اليوم. لو احتجت تروح بكير قولي",
        "translation": "If it's nothing big, work today. If you need to leave early, tell me.",
        "end": true
      }
    ],
    "completionMessage": "You handled a manager request with honesty! تعب نفسي, أحس, and بصراحة all ring true at Phase 7."
  },
  {
    "id": "saudi_convo_p7_thank_friend_help",
    "phase": 7,
    "title": "Thanking a Friend for Their Help",
    "description": "Genuinely thank a friend who went out of their way to help you.",
    "focalWordIds": [
      "w_happy",
      "w_shuʿuur",
      "w_qalb",
      "w_nafs",
      "w_know",
      "w_remember"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "شو فيك اليوم؟ تبدو مختلف بطريقة حلوة",
        "translation": "What's with you today? You seem different in a good way.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell him his help made a real difference.",
        "options": [
          {
            "text": "والله، بسببك. مساعدتك أمبارح غيرت كثير. شكرا من قلبي",
            "translation": "By God, because of you. Your help yesterday changed a lot. Thank you from my heart.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "شكرا من قلبي — \"thank you from my heart\" — deeply Saudi and sincere."
          },
          {
            "text": "لا شي، الأمور بخير",
            "translation": "Nothing, things are fine.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "Missed the moment to acknowledge his impact on you."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "والله ما سويت شيئًا كبيرًا، بس مبسوط إني قدرت أساعدك",
        "translation": "By God I didn't do anything big, but I'm happy I could help you.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "الحمد لله. تتذكر إنك كنت تعبان أمبارح؟",
        "translation": "Praise God. Do you remember you were struggling yesterday?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Explain specifically what his help meant to you emotionally.",
        "options": [
          {
            "text": "أتذكر إني كنت خايف وما أعرف شو أسوي. لقيتك جنبي وهذا غير كل شي",
            "translation": "I remember I was afraid and didn't know what to do. I found you beside me and that changed everything.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أتذكر + خايف — past emotional recall with present gratitude. Masterful."
          },
          {
            "text": "شكرا، ما ننسى بعض إن شاء الله",
            "translation": "Thanks, let's not forget each other God willing.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Warm but vague — specific gratitude lands deeper."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "يا أخي، أنت صديقي وأنا دايمًا معاك. ما يحتاج شكر بيننا",
        "translation": "Brother, you're my friend and I'm always with you. No thanks needed between us.",
        "end": true
      }
    ],
    "completionMessage": "Heartfelt gratitude expressed in authentic Saudi Arabic! قلبي, أتذكر, and خايف — emotional fluency unlocked."
  },
  {
    "id": "saudi_convo_p5_market_haggle",
    "phase": 5,
    "title": "Haggling at the Market",
    "description": "Negotiate the price of a handmade item at an open-air souq.",
    "focalWordIds": [
      "w_howmuch",
      "w_expensive",
      "w_cheap",
      "w_discount",
      "w_money",
      "w_riyal"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! تفضل، شوف البضاعة.",
        "translation": "Hey! Come in, have a look at the goods.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask the price of a rug you like:",
        "options": [
          {
            "text": "هذي السجادة بكم؟",
            "translation": "How much is this rug?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "بكم is the Saudi way to ask a price — perfect."
          },
          {
            "text": "كم ثمن هذه السجادة؟",
            "translation": "What is the price of this rug?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "ثمن and هذه are MSA. In Saudi dialect say بكم and هذي."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "بثلاثمية ريال.",
        "translation": "Three hundred riyals.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "The price seems high — respond:",
        "options": [
          {
            "text": "غالي! عندك خصم؟",
            "translation": "Expensive! Do you have a discount?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "غالي and خصم are core Phase 5 transactional words."
          },
          {
            "text": "السعر مرتفع جداً.",
            "translation": "The price is very high.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "مرتفع is MSA. Saudi speakers say غالي مرة."
          },
          {
            "text": "أبغى أفكر.",
            "translation": "I want to think about it.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "That delays the haggle. Try asking for a discount directly with غالي!"
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "أحسن سعر مئتين وخمسين. آخر سعر والله!",
        "translation": "Best price is 250. Final price, I swear!",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Counter-offer or accept:",
        "options": [
          {
            "text": "مئتين ريال وآخذها.",
            "translation": "Two hundred riyals and I'll take it.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Solid counter-offer using آخذها — natural Saudi buying expression."
          },
          {
            "text": "حسناً، سأشتريها بهذا السعر.",
            "translation": "OK, I will buy it at this price.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "سأشتريها is MSA. Say آخذها or اشتريها in Saudi dialect."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "ماشي، بمئتين وعشرين. خلصنا بالفلوس كاش ولا بطاقة؟",
        "translation": "OK, 220. Are we done — cash or card?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Choose payment method:",
        "options": [
          {
            "text": "كاش، تفضل.",
            "translation": "Cash, here you go.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "كاش is standard Saudi transactional vocab."
          },
          {
            "text": "أدفع بالبطاقة.",
            "translation": "I'll pay by card.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "أدفع بالبطاقة is also correct and natural."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "مشكور! الله يبارك فيك.",
        "translation": "Thank you! God bless you.",
        "end": true
      }
    ],
    "completionMessage": "Great haggling! You used بكم, غالي, خصم, and كاش like a pro."
  },
  {
    "id": "saudi_convo_p5_buy_thobe",
    "phase": 5,
    "title": "Buying a Thobe",
    "description": "Shop for a traditional Saudi thobe at a clothing store.",
    "focalWordIds": [
      "w_howmuch",
      "w_expensive",
      "w_discount",
      "w_buy",
      "w_riyal",
      "w_pay"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا بك! تبغى ثوب؟",
        "translation": "Welcome! Are you looking for a thobe?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell him what you want:",
        "options": [
          {
            "text": "أبغى ثوب أبيض، مقاس وسط.",
            "translation": "I want a white thobe, medium size.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أبغى is the correct Saudi form; مقاس وسط is natural transactional vocab."
          },
          {
            "text": "أريد ثوباً أبيضاً من الحجم المتوسط.",
            "translation": "I want a white thobe in medium size.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد and the case endings are MSA. In Saudi say أبغى ثوب أبيض مقاس وسط."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تفضل، هذا الثوب ممتاز. قطن مئة بالمئة. بمئة وثمانين ريال.",
        "translation": "Here, this thobe is excellent. 100% cotton. For 180 riyals.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Respond to the price:",
        "options": [
          {
            "text": "غالي شوي. في خصم؟",
            "translation": "A bit expensive. Is there a discount?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "غالي شوي softens the complaint — very Saudi. في خصم is natural."
          },
          {
            "text": "هذا السعر مرتفع قليلاً.",
            "translation": "This price is a bit high.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "مرتفع is MSA. Use غالي شوي for Saudi register."
          },
          {
            "text": "زين، آخذه.",
            "translation": "Fine, I'll take it.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "You could try for a discount first — غالي شوي!"
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "خصم عشرة بالمئة. يصير بمئة وستين ريال.",
        "translation": "Ten percent off. That makes 160 riyals.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Accept and ask to try it on:",
        "options": [
          {
            "text": "زين، بجرب الثوب أولاً.",
            "translation": "OK, I'll try the thobe on first.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "بجرب (I'll try) is the Saudi present-future form — correct."
          },
          {
            "text": "حسناً. هل يمكنني تجربته؟",
            "translation": "OK. Can I try it on?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "هل يمكنني is MSA. Say بجرب or ممكن أجرب in Saudi dialect."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "طبعاً! غرفة القياس على اليمين.",
        "translation": "Of course! The fitting room is on the right.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "After trying — you like it. Pay:",
        "options": [
          {
            "text": "تمام، آخذه. أدفع بالبطاقة.",
            "translation": "Great, I'll take it. I'll pay by card.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "تمام and أدفع are natural Saudi transaction closers."
          },
          {
            "text": "إنه جيد. سأدفع نقداً.",
            "translation": "It is good. I will pay cash.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "إنه جيد and سأدفع are MSA. Use تمام and كاش."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "هلا، اتفضل الفاتورة. يعطيك العافية!",
        "translation": "Here is your receipt. Enjoy it!",
        "end": true
      }
    ],
    "completionMessage": "Well done! You bought a thobe using real Saudi shopping phrases."
  },
  {
    "id": "saudi_convo_p5_buy_abaya",
    "phase": 5,
    "title": "Buying an Abaya",
    "description": "Shop for an abaya at a women's clothing boutique.",
    "focalWordIds": [
      "w_howmuch",
      "w_expensive",
      "w_cheap",
      "w_buy",
      "w_money",
      "w_riyal"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً! تبغين عباية؟",
        "translation": "Welcome! Are you looking for an abaya?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell her what style you want:",
        "options": [
          {
            "text": "أبغى عباية سوداء بسيطة.",
            "translation": "I want a simple black abaya.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أبغى and بسيطة are natural — good Saudi register."
          },
          {
            "text": "أريد عباءة سوداء بسيطة.",
            "translation": "I want a simple black abaya.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد is MSA. In Saudi say أبغى. Also عباية not عباءة in everyday speech."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عندنا هذا الموديل الجديد. حرير طبيعي. بثلاثمية وخمسين ريال.",
        "translation": "We have this new style. Natural silk. For 350 riyals.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "The price is too high — respond:",
        "options": [
          {
            "text": "غالي مرة! في شي أرخص؟",
            "translation": "Very expensive! Is there something cheaper?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "غالي مرة intensifies the complaint naturally. أرخص is good comparative."
          },
          {
            "text": "السعر مرتفع جداً. هل عندك شيء أقل سعراً؟",
            "translation": "The price is very high. Do you have something cheaper?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "مرتفع is MSA. Say غالي مرة and أرخص for Saudi register."
          },
          {
            "text": "بكم العباية الثانية؟",
            "translation": "How much is the other abaya?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "بكم is correct! But be more direct — try غالي مرة first."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "عندنا موديل ثاني قطن بمئتين ريال. رخيص وجودة زينة.",
        "translation": "We have another cotton style for 200 riyals. Cheap and good quality.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Compare both options:",
        "options": [
          {
            "text": "الحريري أحسن بس غالي. خذي الحريري بمئتين وثمانين؟",
            "translation": "The silk is better but expensive. Will you take 280 for the silk?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "أحسن is the Saudi comparative \"better\" — natural haggling."
          },
          {
            "text": "الحريري أفضل لكنه أغلى. يمكنك تخفيض السعر؟",
            "translation": "The silk is better but more expensive. Can you lower the price?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "أفضل and يمكنك are MSA. Saudi: أحسن and تقدري تنزلين السعر."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "ماشي، بثلاثمية. آخر سعر.",
        "translation": "OK, 300. Final price.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Accept the deal:",
        "options": [
          {
            "text": "تمام، آخذ الحريري بثلاثمية. كاش.",
            "translation": "OK, I'll take the silk for 300. Cash.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "Perfect — تمام, آخذ, and كاش are all Saudi transaction finishers."
          },
          {
            "text": "حسناً، سأشتري الحريري.",
            "translation": "OK, I will buy the silk one.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "سأشتري is MSA. Say آخذ or اشتريت in Saudi speech."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "ممتاز! الله يعطيك العافية. الفاتورة معك.",
        "translation": "Excellent! God give you strength. Here is your receipt.",
        "end": true
      }
    ],
    "completionMessage": "Great shopping trip! You navigated price comparison and haggling beautifully."
  },
  {
    "id": "saudi_convo_p5_return_item",
    "phase": 5,
    "title": "Returning an Item",
    "description": "Return a shirt you bought yesterday because the size is wrong.",
    "focalWordIds": [
      "w_receipt",
      "w_money",
      "w_buy",
      "w_pay",
      "w_riyal",
      "w_discount"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! كيف أقدر أساعدك؟",
        "translation": "Hey! How can I help you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Explain you want to return something:",
        "options": [
          {
            "text": "أبغى أرجع هذا القميص، المقاس ما ناسب.",
            "translation": "I want to return this shirt, the size didn't fit.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أبغى أرجع is natural Saudi phrasing for a return request."
          },
          {
            "text": "أريد إرجاع هذا القميص لأن المقاس غير مناسب.",
            "translation": "I want to return this shirt because the size is unsuitable.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد إرجاع and لأن are MSA. Saudi: أبغى أرجع and ما ناسب."
          },
          {
            "text": "هذا القميص غلط.",
            "translation": "This shirt is wrong.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "A bit vague — explain the reason: المقاس ما ناسب."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عندك الفاتورة؟",
        "translation": "Do you have the receipt?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Respond about the receipt:",
        "options": [
          {
            "text": "أيوه، تفضل الفاتورة.",
            "translation": "Yes, here is the receipt.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أيوه is the natural Saudi affirmative — correct."
          },
          {
            "text": "نعم، هذه هي الفاتورة.",
            "translation": "Yes, here is the receipt.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "نعم is MSA formal. In Saudi conversation say أيوه."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تمام. نقدر نبدل المقاس أو نرد لك الفلوس. إيش تبغى؟",
        "translation": "OK. We can exchange the size or refund your money. Which do you prefer?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Choose: exchange or refund:",
        "options": [
          {
            "text": "أبغى أبدل المقاس. عندكم مقاس كبير؟",
            "translation": "I want to exchange the size. Do you have a large?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "أبدل المقاس is idiomatic Saudi exchange language."
          },
          {
            "text": "أبغى فلوسي راجعة.",
            "translation": "I want my money back.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "فلوسي راجعة is natural Saudi for \"give me a refund\"."
          },
          {
            "text": "أريد استرداد المبلغ.",
            "translation": "I want to recover the amount.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "استرداد المبلغ is MSA/formal. Say أبغى فلوسي راجعة."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "تفضل، مقاس كبير. جرب وشوف.",
        "translation": "Here, a large. Try it and see.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "The large fits perfectly — respond:",
        "options": [
          {
            "text": "تمام، هذا يناسب. شكراً.",
            "translation": "Great, this fits. Thank you.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "تمام is the go-to Saudi approval word — perfect."
          },
          {
            "text": "هذا المقاس مناسب، شكراً جزيلاً.",
            "translation": "This size is suitable, thank you very much.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "مناسب works but شكراً جزيلاً is quite formal. Say تمام, يسلموا."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "العفو! الله يسلمك.",
        "translation": "You're welcome! God keep you safe.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You handled a return smoothly using Saudi vocabulary."
  },
  {
    "id": "saudi_convo_p5_pay_with_card",
    "phase": 5,
    "title": "Paying by Card",
    "description": "Complete a purchase at a shop using your bank card.",
    "focalWordIds": [
      "w_pay",
      "w_money",
      "w_receipt",
      "w_riyal",
      "w_discount"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تفضل، المجموع مئة وعشرين ريال.",
        "translation": "Here you go, the total is 120 riyals.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask if they accept card:",
        "options": [
          {
            "text": "تقبلون بطاقة؟",
            "translation": "Do you accept card?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "تقبلون بطاقة is the natural Saudi question for card payment."
          },
          {
            "text": "هل تقبلون الدفع ببطاقة الائتمان؟",
            "translation": "Do you accept payment by credit card?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "هل تقبلون... is MSA-formal. Say تقبلون بطاقة? simply."
          },
          {
            "text": "عندك مكينة الشبكة؟",
            "translation": "Do you have a card machine?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Excellent! مكينة الشبكة is the Saudi term for the POS card machine."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أيوه، عندنا الشبكة. تفضل.",
        "translation": "Yes, we have the card machine. Go ahead.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Tap your card and check the amount:",
        "options": [
          {
            "text": "مئة وعشرين صح؟ تفضل.",
            "translation": "One twenty, right? Here you go.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Confirming the amount before tapping is smart and natural."
          },
          {
            "text": "سأقوم بالدفع الآن.",
            "translation": "I will make the payment now.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "سأقوم is MSA. Just say أدفع now or tap and say تفضل."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تم الدفع! تبغى الفاتورة؟",
        "translation": "Payment done! Do you want the receipt?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Respond about the receipt:",
        "options": [
          {
            "text": "أيوه، عطني الفاتورة من فضلك.",
            "translation": "Yes, give me the receipt please.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "عطني is the Saudi imperative for \"give me\" — natural and direct."
          },
          {
            "text": "لا، ما أحتاجها.",
            "translation": "No, I don't need it.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "ما أحتاجها is natural Saudi negation — correct."
          },
          {
            "text": "نعم، أريد الفاتورة.",
            "translation": "Yes, I want the receipt.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "أريد is MSA. Say أبغى الفاتورة or عطني الفاتورة."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "تفضل الفاتورة. شكراً لك!",
        "translation": "Here is the receipt. Thank you!",
        "end": true
      }
    ],
    "completionMessage": "Perfect card payment! You used key Phase 5 payment vocabulary throughout."
  },
  {
    "id": "saudi_convo_p5_cafe_full_order",
    "phase": 5,
    "title": "Full Café Order",
    "description": "Order drinks and a snack at a Saudi café, then pay the bill.",
    "focalWordIds": [
      "w_howmuch",
      "w_pay",
      "w_receipt",
      "w_money",
      "w_riyal",
      "w_want"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً وسهلاً! إيش تبغى تشرب؟",
        "translation": "Welcome! What would you like to drink?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Order coffee and ask about snacks:",
        "options": [
          {
            "text": "قهوة عربية وشي خفيف. عندكم كيك؟",
            "translation": "Arabic coffee and something light. Do you have cake?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Ordering in Saudi style — direct and conversational."
          },
          {
            "text": "أريد قهوة عربية من فضلك.",
            "translation": "I would like Arabic coffee please.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد is MSA. In Saudi say أبغى قهوة عربية."
          },
          {
            "text": "أبغى قهوة وكيك تشيز.",
            "translation": "I want a coffee and cheesecake.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أبغى is the correct Saudi want verb — great."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عندنا كيك تشيز وكرواسون. إيش تبغى؟",
        "translation": "We have cheesecake and croissants. What do you want?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Choose your snack:",
        "options": [
          {
            "text": "كيك تشيز, يسلموا.",
            "translation": "Cheesecake, thank you.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "يسلموا is the warm Saudi thank-you — natural here."
          },
          {
            "text": "سآخذ الكرواسون.",
            "translation": "I will take the croissant.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "سآخذ is MSA future. Saudi: آخذ الكرواسون."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "حاضر! بجيب لك الطلب بعد دقيقتين.",
        "translation": "Right away! I'll bring your order in two minutes.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "After finishing, ask for the bill:",
        "options": [
          {
            "text": "الفاتورة لو سمحت.",
            "translation": "The bill please.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "الفاتورة is the right word for bill/receipt in this context."
          },
          {
            "text": "الحساب لو سمحت.",
            "translation": "The bill please.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "الحساب is also very natural Saudi for \"the check please\"."
          },
          {
            "text": "كم المبلغ الإجمالي؟",
            "translation": "What is the total amount?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "المبلغ الإجمالي is MSA. Say بكم الكل? or الفاتورة لو سمحت."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "الفاتورة خمسة وثلاثين ريال. كاش ولا شبكة؟",
        "translation": "The bill is 35 riyals. Cash or card?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Pay and optionally leave a tip:",
        "options": [
          {
            "text": "كاش. تفضل خمسين، الباقي للبقشيش.",
            "translation": "Cash. Here's fifty, the rest is a tip.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "الباقي للبقشيش — using two key Phase 5 words at once!"
          },
          {
            "text": "شبكة. أدفع بالبطاقة.",
            "translation": "Card. I'll pay by card.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "أدفع بالبطاقة is natural."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "مشكور، يعطيك العافية!",
        "translation": "Thank you, enjoy your day!",
        "end": true
      }
    ],
    "completionMessage": "You ordered and paid at the café like a local. Excellent Saudi dialect!"
  },
  {
    "id": "saudi_convo_p5_restaurant_order",
    "phase": 5,
    "title": "Restaurant Order",
    "description": "Order a meal at a Saudi restaurant and settle the bill.",
    "focalWordIds": [
      "w_howmuch",
      "w_pay",
      "w_receipt",
      "w_money",
      "w_riyal",
      "w_want"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً! إيش تبغى تطلب؟",
        "translation": "Welcome! What would you like to order?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Order a main dish:",
        "options": [
          {
            "text": "أبغى كبسة دجاج وسلطة.",
            "translation": "I want chicken kabsa and a salad.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أبغى is the correct Saudi verb — natural order."
          },
          {
            "text": "أطلب كبسة دجاج.",
            "translation": "I order chicken kabsa.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أطلب works but أبغى sounds more natural in Saudi conversation."
          },
          {
            "text": "واحد كبسة من فضلك.",
            "translation": "One kabsa please.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "واحد + dish name is a very natural Saudi ordering style."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تبغى مشروب مع الطلب؟",
        "translation": "Would you like a drink with your order?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Respond about a drink:",
        "options": [
          {
            "text": "أيوه، ماء بارد من فضلك.",
            "translation": "Yes, cold water please.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أيوه is the Saudi yes — بارد adds a natural detail."
          },
          {
            "text": "لا شكراً.",
            "translation": "No thank you.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Clean refusal — correct."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "حاضر! الطلب بيجي بعد عشر دقايق.",
        "translation": "Right away! The order will come in ten minutes.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "When the food arrives, check it's correct:",
        "options": [
          {
            "text": "هذي الكبسة تبع طلبي؟",
            "translation": "Is this kabsa my order?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "تبع + pronoun is the Saudi possessive structure — correct."
          },
          {
            "text": "هل هذا طلبي؟",
            "translation": "Is this my order?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "هل is MSA. Saudi: هذا طلبي؟ (no هل needed)."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "أيوه! كبسة دجاج مع سلطة. بالعافية!",
        "translation": "Yes! Chicken kabsa with salad. Enjoy!",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "After eating, ask for the bill:",
        "options": [
          {
            "text": "الحساب لو سمحت. بكم الكل؟",
            "translation": "The bill please. How much altogether?",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "بكم الكل is natural Saudi for the total — great combination."
          },
          {
            "text": "هل يمكنني الحصول على الفاتورة؟",
            "translation": "Can I get the bill?",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "هل يمكنني is MSA. Just say الفاتورة or الحساب لو سمحت."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "الحساب خمسة وخمسين ريال شامل الضريبة.",
        "translation": "The bill is 55 riyals including VAT.",
        "end": true
      }
    ],
    "completionMessage": "Excellent restaurant run! Great use of Saudi ordering and payment phrases."
  },
  {
    "id": "saudi_convo_p5_buy_phone_sim",
    "phase": 5,
    "title": "Buying a Phone SIM",
    "description": "Get a prepaid SIM card at a mobile phone shop.",
    "focalWordIds": [
      "w_howmuch",
      "w_pay",
      "w_money",
      "w_riyal",
      "w_buy",
      "w_receipt"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! تبغى شريحة؟",
        "translation": "Hey! Are you looking for a SIM card?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Confirm and specify which network:",
        "options": [
          {
            "text": "أيوه، أبغى شريحة STC بيانات.",
            "translation": "Yes, I want an STC data SIM.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Natural Saudi phrasing — specifying the network and type."
          },
          {
            "text": "نعم أريد بطاقة SIM.",
            "translation": "Yes I want a SIM card.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "نعم أريد is MSA. Say أيوه أبغى شريحة."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عندنا باقة شهرية بخمسة وأربعين ريال، فيها خمسة عشر جيجا. تبغاها؟",
        "translation": "We have a monthly plan for 45 riyals with 15 GB. Do you want it?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask if there's a cheaper option:",
        "options": [
          {
            "text": "في باقة أرخص؟",
            "translation": "Is there a cheaper plan?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أرخص is the Saudi comparative \"cheaper\" — correct Phase 5 vocab."
          },
          {
            "text": "هل توجد باقة أقل سعراً؟",
            "translation": "Is there a lower-priced plan?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "هل توجد is MSA. Say في باقة أرخص? or في شي أرخص?"
          },
          {
            "text": "غالي شوي. في خصم؟",
            "translation": "A bit expensive. Is there a discount?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "غالي شوي and في خصم are perfect Phase 5 vocab."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "في باقة بعشرين وخمسة ريال فيها ثمانية جيجا.",
        "translation": "There is a plan for 25 riyals with 8 GB.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Choose the plan:",
        "options": [
          {
            "text": "خذ الباقة الأولى. بكم مع الضريبة؟",
            "translation": "I'll take the first plan. How much with VAT?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Confirming VAT is smart — شامل الضريبة is Phase 5 vocab."
          },
          {
            "text": "آخذ الباقة الرخيصة.",
            "translation": "I'll take the cheap plan.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "آخذ + الرخيصة is natural Saudi."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "شامل الضريبة ثمانية وأربعين ريال وخمسة وسبعين هللة.",
        "translation": "Including VAT it's 48.75 riyals.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Pay and get receipt:",
        "options": [
          {
            "text": "تفضل خمسين. عطني الفاتورة.",
            "translation": "Here's fifty. Give me the receipt.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "عطني is natural Saudi imperative — الفاتورة is the right word."
          },
          {
            "text": "أدفع بالبطاقة.",
            "translation": "I'll pay by card.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "أدفع بالبطاقة is correct."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "تمام! الشريحة شغالة طوالي. الله يعطيك العافية.",
        "translation": "Done! The SIM works right away. God bless you.",
        "end": true
      }
    ],
    "completionMessage": "Great job buying your SIM! You used رخيص, الضريبة, and الفاتورة correctly."
  },
  {
    "id": "saudi_convo_p5_grocery_checkout",
    "phase": 5,
    "title": "Grocery Checkout",
    "description": "Pay for groceries at the supermarket checkout counter.",
    "focalWordIds": [
      "w_howmuch",
      "w_pay",
      "w_money",
      "w_riyal",
      "w_receipt",
      "w_discount"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! البضاعة كلها معك؟",
        "translation": "Hey! Do you have all your items?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Confirm you're ready to check out:",
        "options": [
          {
            "text": "أيوه، كلها هنا.",
            "translation": "Yes, everything is here.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Direct and natural Saudi confirmation."
          },
          {
            "text": "نعم جميع المواد موجودة.",
            "translation": "Yes all the items are present.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "جميع المواد موجودة is MSA. Just say أيوه، كلها هنا."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "المجموع مئة وأربعة وستين ريال. عندك بطاقة وفاء أو تميم؟",
        "translation": "Total is 164 riyals. Do you have a loyalty card?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask about a discount:",
        "options": [
          {
            "text": "ما عندي بطاقة. في خصم اليوم؟",
            "translation": "I don't have a card. Is there a discount today?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "في خصم is the right Phase 5 way to ask about deals."
          },
          {
            "text": "لا. ما أملك بطاقة ولاء.",
            "translation": "No. I don't have a loyalty card.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "ما أملك and ولاء are MSA. Say ما عندي بطاقة."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "في تخفيض عشرة بالمئة على الخضروات. خلصت بمئة وخمسة وخمسين ريال.",
        "translation": "There is a 10% discount on vegetables. It comes to 155 riyals.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Ask about payment methods:",
        "options": [
          {
            "text": "تقبلون Apple Pay؟",
            "translation": "Do you accept Apple Pay?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Natural Saudi question — Apple Pay is widely used."
          },
          {
            "text": "أدفع كاش.",
            "translation": "I'll pay cash.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "كاش is the Phase 5 Saudi word for cash — correct."
          },
          {
            "text": "هل يمكنني الدفع إلكترونياً؟",
            "translation": "Can I pay electronically?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "هل يمكنني is MSA. Say تقبلون Apple Pay? or أدفع بالجوال?"
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "أيوه، أي طريقة دفع. تفضل.",
        "translation": "Yes, any payment method. Go ahead.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "After paying, ask for the receipt:",
        "options": [
          {
            "text": "عطني الفاتورة من فضلك.",
            "translation": "Give me the receipt please.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "عطني is the Saudi imperative — الفاتورة is correct."
          },
          {
            "text": "هل يمكنني الحصول على إيصال؟",
            "translation": "Can I get a receipt?",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "هل يمكنني is MSA. Say عطني الفاتورة or أبغى الفاتورة."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "تفضل الفاتورة. شكراً! يعطيك العافية.",
        "translation": "Here is the receipt. Thanks! God give you strength.",
        "end": true
      }
    ],
    "completionMessage": "Perfect checkout! You used خصم, كاش, and الفاتورة expertly."
  },
  {
    "id": "saudi_convo_p5_perfume_gift_shop",
    "phase": 5,
    "title": "Choosing a Perfume Gift",
    "description": "Buy perfume as a gift at a Saudi gift shop.",
    "focalWordIds": [
      "w_howmuch",
      "w_expensive",
      "w_cheap",
      "w_discount",
      "w_buy",
      "w_riyal"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! تبغى عطر هدية؟",
        "translation": "Hey! Looking for a perfume gift?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Explain the occasion:",
        "options": [
          {
            "text": "أيوه، عطر هدية لأمي. شي راقي.",
            "translation": "Yes, a perfume gift for my mother. Something elegant.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Natural phrasing — using لأمي (for my mother) is correct 3rd-person reference."
          },
          {
            "text": "أريد عطراً مميزاً لأمي.",
            "translation": "I want a special perfume for my mother.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد is MSA. Say أبغى عطر مميز لأمي."
          },
          {
            "text": "أبغى أشتري هدية لأمي.",
            "translation": "I want to buy a gift for my mother.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Correct — أبغى أشتري is natural Saudi."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عندنا عود سعودي أصلي ممتاز. هدية ما بتأسف عليها. بأربعمية ريال.",
        "translation": "We have excellent authentic Saudi oud. A gift you won't regret. For 400 riyals.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "React to the price:",
        "options": [
          {
            "text": "غالي! عندك شي أرخص بس زين؟",
            "translation": "Expensive! Do you have something cheaper but still good?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "غالي + أرخص is classic Saudi negotiation language."
          },
          {
            "text": "هذا المبلغ مرتفع. هل لديك بديل؟",
            "translation": "This amount is high. Do you have an alternative?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "MSA phrasing. Say غالي! في شي أرخص؟"
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "في خلطة عود جميلة بمئتين وخمسين. رائحتها قريبة من الأصلي.",
        "translation": "There is a nice oud blend for 250. Its scent is close to the original.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Ask for a further discount:",
        "options": [
          {
            "text": "تقدر تعطيني خصم؟ بمئتين ريال وآخذها.",
            "translation": "Can you give me a discount? For 200 I'll take it.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "تقدر تعطيني خصم is natural Saudi haggling."
          },
          {
            "text": "مئتان ريال آخر سعر؟",
            "translation": "Is 200 riyals the final price?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Close but frame it as an offer: آخذها بمئتين ريال."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "ماشي، بمئتين وعشرين. آخر كلمة.",
        "translation": "OK, 220. Final word.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Accept and ask for gift wrapping:",
        "options": [
          {
            "text": "تمام. ممكن تغلفها هدية؟",
            "translation": "OK. Can you wrap it as a gift?",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "تغلفها هدية is natural — تمام closes the deal well."
          },
          {
            "text": "حسناً، سأشتريها.",
            "translation": "OK, I will buy it.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "سأشتريها is MSA. Say آخذها and add تغلفها هدية."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "بكل سرور! أمك بتفرح فيها إن شاء الله.",
        "translation": "With pleasure! Your mother will love it, God willing.",
        "end": true
      }
    ],
    "completionMessage": "Lovely gift purchase! Great use of Saudi haggling and 3rd-person reference."
  },
  {
    "id": "saudi_convo_p5_taxi_negotiate",
    "phase": 5,
    "title": "Taxi Fare Negotiation",
    "description": "Agree on a fare with a taxi driver before getting in.",
    "focalWordIds": [
      "w_howmuch",
      "w_expensive",
      "w_money",
      "w_riyal",
      "w_pay",
      "w_cheap"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "وين تبغى تروح؟",
        "translation": "Where do you want to go?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "State your destination and ask the fare:",
        "options": [
          {
            "text": "المطار. بكم؟",
            "translation": "The airport. How much?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "بكم is the Saudi way to ask price — direct and correct."
          },
          {
            "text": "إلى المطار. كم يكلف؟",
            "translation": "To the airport. How much does it cost?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "كم يكلف is MSA. Saudi: بكم or إيش الأجرة؟"
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "المطار بمئة وعشرين ريال.",
        "translation": "The airport for 120 riyals.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Negotiate the price:",
        "options": [
          {
            "text": "غالي! ثمانين ريال وتمشي؟",
            "translation": "Expensive! Eighty riyals — are you going?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "وتمشي is the Saudi way to confirm if driver accepts the offer."
          },
          {
            "text": "هذا السعر مرتفع. أقبل ثمانين ريالاً؟",
            "translation": "This price is high. Will you accept 80 riyals?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "مرتفع and أقبل are MSA. Say غالي and وتمشي."
          },
          {
            "text": "في ميتر؟",
            "translation": "Do you have a meter?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Clever — asking about the meter (ميتر) is very Saudi."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "ما في ميتر. أحسن سعر مية ريال. آخر سعر.",
        "translation": "No meter. Best price 100 riyals. Final price.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Accept or try one more counter:",
        "options": [
          {
            "text": "تسعين وتمشي، ولا أبحث عن سيارة ثانية.",
            "translation": "Ninety and you go, or I'll look for another car.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Walking away is a strong tactic — natural Saudi bargaining."
          },
          {
            "text": "تمام، مية ريال. يلا نمشي.",
            "translation": "OK, 100 riyals. Let's go.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Accepting is fine too — يلا نمشي is natural Saudi."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "ماشي، خمسة وتسعين. تعال.",
        "translation": "OK, 95. Come on.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Confirm and get in:",
        "options": [
          {
            "text": "خمسة وتسعين. تمام. يلا.",
            "translation": "Ninety-five. OK. Let's go.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "يلا is the iconic Saudi let's-go — perfect."
          },
          {
            "text": "حسناً اتفقنا.",
            "translation": "OK we agreed.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "اتفقنا is fine but MSA. Say تمام، خلصنا for Saudi register."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "يلا، تفضل. رحمة الله عليك.",
        "translation": "Let's go, come on. God be with you.",
        "end": true
      }
    ],
    "completionMessage": "Great negotiation! You used بكم, غالي, آخر سعر, and يلا correctly."
  },
  {
    "id": "saudi_convo_p5_hotel_checkin",
    "phase": 5,
    "title": "Hotel Check-in",
    "description": "Check in to a Saudi hotel and ask about the room rate.",
    "focalWordIds": [
      "w_howmuch",
      "w_pay",
      "w_receipt",
      "w_money",
      "w_riyal",
      "w_discount"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً وسهلاً! عندك حجز؟",
        "translation": "Welcome! Do you have a reservation?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Confirm your booking:",
        "options": [
          {
            "text": "أيوه، عندي حجز. اسمي عبدالله الغامدي.",
            "translation": "Yes, I have a reservation. My name is Abdullah Al-Ghamdi.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Natural check-in phrasing — عندي حجز is correct Saudi."
          },
          {
            "text": "نعم لدي حجز مسبق.",
            "translation": "Yes I have a prior reservation.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "لدي and مسبق are MSA. Say عندي حجز."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أيوه تفضل. غرفة فردية لليلتين. الغرفة بمئة وثمانين ريال الليلة.",
        "translation": "Yes here you go. Single room for two nights. The room is 180 riyals per night.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask about a discount or offer:",
        "options": [
          {
            "text": "في خصم لو حجزت ثلاث ليالي؟",
            "translation": "Is there a discount if I book three nights?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "في خصم + conditional is natural Phase 5 transactional phrasing."
          },
          {
            "text": "هل يوجد تخفيض على الإقامة؟",
            "translation": "Is there a discount on the stay?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "هل يوجد is MSA. Say في خصم or في عرض؟"
          },
          {
            "text": "غالي شوي. ما تقدر تنزل السعر؟",
            "translation": "A bit expensive. Can't you lower the price?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "غالي شوي is natural Phase 5 Saudi."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "لو بقيت ثلاث ليالي، نعطيك عشرة بالمئة خصم. يصير بأربعمية وثمانية وستين ريال.",
        "translation": "If you stay three nights, we give you 10% off. That comes to 468 riyals.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Accept the offer:",
        "options": [
          {
            "text": "تمام، ثلاث ليالي. كيف أدفع؟",
            "translation": "OK, three nights. How do I pay?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "تمام closes the deal — كيف أدفع is natural."
          },
          {
            "text": "حسناً، سأبقى ثلاث ليالٍ.",
            "translation": "OK, I will stay three nights.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "سأبقى is MSA. Say أبقى ثلاث ليالي or تمام، ثلاث ليالي."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "تدفع الآن أو عند المغادرة؟",
        "translation": "Do you pay now or at checkout?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Choose when to pay:",
        "options": [
          {
            "text": "الحين أدفع بالبطاقة.",
            "translation": "I'll pay now by card.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "الحين is the Saudi word for \"now\" — الحين أدفع is natural."
          },
          {
            "text": "أدفع عند المغادرة كاش.",
            "translation": "I'll pay at checkout in cash.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "Correct — كاش is the Saudi word for cash."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "ممتاز! تفضل مفتاح الغرفة. الغرفة ثلاثمائة وخمسة.",
        "translation": "Excellent! Here is your room key. Room 305.",
        "end": true
      }
    ],
    "completionMessage": "Great check-in! You used خصم, أدفع, كاش, and Saudi register throughout."
  },
  {
    "id": "saudi_convo_p5_book_table",
    "phase": 5,
    "title": "Booking a Restaurant Table",
    "description": "Reserve a table at a restaurant by phone.",
    "focalWordIds": [
      "w_howmuch",
      "w_pay",
      "w_money",
      "w_want",
      "w_riyal",
      "w_receipt"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "مطعم الفخامة، هلا!",
        "translation": "Al-Fakhamah Restaurant, hello!",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Request a table reservation:",
        "options": [
          {
            "text": "أبغى أحجز طاولة لأربعة أشخاص الليلة.",
            "translation": "I want to book a table for four people tonight.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أبغى أحجز is natural Saudi booking language."
          },
          {
            "text": "أريد حجز طاولة لأربعة أشخاص.",
            "translation": "I want to reserve a table for four people.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد is MSA. Use أبغى for Saudi dialect."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أيوه! في طاولة الساعة ثمانية. اسمك إيش؟",
        "translation": "Yes! There is a table at 8 o'clock. What's your name?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give your name and ask about a deposit:",
        "options": [
          {
            "text": "اسمي نورة. في دفعة مقدمة؟",
            "translation": "My name is Noura. Is there a deposit?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "دفعة مقدمة is a natural Saudi term for advance payment."
          },
          {
            "text": "اسمي نورة السالم. هل يلزم الدفع مسبقاً؟",
            "translation": "My name is Noura Al-Salem. Is advance payment required?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "هل يلزم is MSA. Say في دفعة مقدمة? or أبغى أدفع الحين?"
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "لا، ما في دفعة. بس التأكيد قبل ساعة من الموعد.",
        "translation": "No deposit. But confirm an hour before the time.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Ask about a family section:",
        "options": [
          {
            "text": "في قسم عائلات؟",
            "translation": "Is there a family section?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "قسم عائلات is standard Saudi restaurant vocabulary."
          },
          {
            "text": "هل يوجد قسم للعائلات؟",
            "translation": "Is there a section for families?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "هل يوجد is MSA. Just say في قسم عائلات؟"
          },
          {
            "text": "الطاولة في منطقة العائلات؟",
            "translation": "Is the table in the family area?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Direct and natural way to ask."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "أيوه، الحجز في قسم العائلات. أي شي ثاني؟",
        "translation": "Yes, the reservation is in the family section. Anything else?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Ask if they have a minimum spend:",
        "options": [
          {
            "text": "في حد أدنى للفاتورة؟",
            "translation": "Is there a minimum bill?",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "حد أدنى للفاتورة is natural Saudi phrasing for minimum spend."
          },
          {
            "text": "لا، شكراً. نشوفك الليلة.",
            "translation": "No, thanks. See you tonight.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "Wrapping up the call naturally — نشوفك is Saudi."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "ما في حد أدنى. نشوفك الليلة إن شاء الله!",
        "translation": "No minimum. See you tonight, God willing!",
        "end": true
      }
    ],
    "completionMessage": "Table booked! You used أبغى أحجز and Saudi restaurant vocabulary well."
  },
  {
    "id": "saudi_convo_p5_pharmacy_meds",
    "phase": 5,
    "title": "At the Pharmacy",
    "description": "Buy medication at a Saudi pharmacy and ask about the price.",
    "focalWordIds": [
      "w_howmuch",
      "w_pay",
      "w_money",
      "w_riyal",
      "w_expensive",
      "w_receipt"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! كيف أقدر أساعدك؟",
        "translation": "Hello! How can I help you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Describe what you need:",
        "options": [
          {
            "text": "أبغى دواء للصداع وشي للبرد.",
            "translation": "I want something for headache and something for a cold.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أبغى دواء is natural Saudi phrasing at a pharmacy."
          },
          {
            "text": "أحتاج دواءً للصداع ودواءً للزكام.",
            "translation": "I need medicine for headache and medicine for a cold.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أحتاج and الزكام are MSA-leaning. Say أبغى دواء للصداع والبرد."
          },
          {
            "text": "عندكم برونافين؟",
            "translation": "Do you have Brunafen?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Asking by brand name is very natural at a Saudi pharmacy."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أيوه. برونافين للصداع وفايكس للبرد. بكم معاهم؟",
        "translation": "Yes. Brunafen for headache and Vicks for cold. How much together?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask the price:",
        "options": [
          {
            "text": "أيوه، بكم الاثنين مع بعض؟",
            "translation": "Yes, how much are both together?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "مع بعض is a natural Saudi phrase for \"together\"."
          },
          {
            "text": "كم يبلغ سعر الدواءين؟",
            "translation": "How much do the two medicines cost?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "يبلغ is MSA. Say بكم الاثنين."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "البرونافين بعشرين ريال والفايكس بثمانية ريالات. المجموع ثمانية وعشرين ريال.",
        "translation": "Brunafen is 20 riyals and Vicks is 8 riyals. Total 28 riyals.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "React to the price:",
        "options": [
          {
            "text": "زين، تمام. أدفع كاش.",
            "translation": "Good, fine. I'll pay cash.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "تمام and كاش are natural transaction closers."
          },
          {
            "text": "غالي شوي. في بديل أرخص للصداع؟",
            "translation": "A bit expensive. Is there a cheaper alternative for headache?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "أرخص is correct Phase 5 comparative — natural."
          },
          {
            "text": "هذا كثير. هل توجد أدوية أقل سعراً؟",
            "translation": "That is a lot. Are there cheaper medicines?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "هل توجد is MSA. Say في بديل أرخص؟"
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "في باراسيتامول بعشرة ريال بدل البرونافين لو تبغى توفر.",
        "translation": "There is paracetamol for 10 riyals instead of Brunafen if you want to save.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Decide and pay:",
        "options": [
          {
            "text": "خذ الباراسيتامول والفايكس. تفضل عشرين ريال.",
            "translation": "I'll take the paracetamol and Vicks. Here's 20 riyals.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "Natural decision and payment — well done."
          },
          {
            "text": "لا، آخذ البرونافين. أدفع بالبطاقة.",
            "translation": "No, I'll take the Brunafen. I'll pay by card.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "آخذ and أدفع بالبطاقة are both correct."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "تفضل الأدوية والفاتورة. سلامتك!",
        "translation": "Here are your medicines and the receipt. Get well!",
        "end": true
      }
    ],
    "completionMessage": "Great pharmacy visit! You used بكم, أرخص, and كاش naturally."
  },
  {
    "id": "saudi_convo_p5_buy_kids_clothes",
    "phase": 5,
    "title": "Buying Kids' Clothes",
    "description": "Buy clothes for a child at a children's clothing store.",
    "focalWordIds": [
      "w_howmuch",
      "w_expensive",
      "w_discount",
      "w_buy",
      "w_riyal",
      "w_pay"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! أبغى أساعدك.",
        "translation": "Hey! I'd like to help you.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Explain you're shopping for a child:",
        "options": [
          {
            "text": "أبغى ملابس لولدي. عمره أربع سنين.",
            "translation": "I want clothes for my son. He is four years old.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "لولدي (for my son) is natural 3rd-person reference — good Phase 5 use."
          },
          {
            "text": "أريد ملابس لطفلي البالغ من العمر أربع سنوات.",
            "translation": "I want clothes for my child who is four years old.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد and البالغ من العمر are MSA. Say أبغى ملابس لولدي، عمره أربع سنين."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عندنا جاكيت وبنطلون جيز حق الأطفال. بثلاثة وستين ريال مع بعض.",
        "translation": "We have a Guess kids' jacket and pants. For 63 riyals together.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask about the size:",
        "options": [
          {
            "text": "المقاس يناسب أربع سنين؟",
            "translation": "Does the size suit a four-year-old?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Direct and natural Saudi question."
          },
          {
            "text": "هل المقاس مناسب لطفل عمره أربع سنوات؟",
            "translation": "Is the size suitable for a four-year-old child?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "هل and مناسب لطفل are MSA. Say المقاس يناسب أربع سنين؟"
          },
          {
            "text": "عندكم مقاس رقم أربعة؟",
            "translation": "Do you have size number four?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Very natural — Saudi parents often ask by number size."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "أيوه، هذا مقاس أربعة يناسب من ثلاث لخمس سنين.",
        "translation": "Yes, size four fits from three to five years.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Ask about a discount:",
        "options": [
          {
            "text": "في خصم لو اشتريت ثنتين؟",
            "translation": "Is there a discount if I buy two items?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "في خصم لو is a natural Saudi conditional discount question."
          },
          {
            "text": "غالي شوي. ما تقدر تخفض؟",
            "translation": "A bit expensive. Can't you lower it?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "غالي شوي is classic Saudi — ما تقدر تخفض is natural."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "لو اشتريت ثلاث قطع، خصم عشرين بالمئة.",
        "translation": "If you buy three pieces, 20% discount.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Decide and pay:",
        "options": [
          {
            "text": "تمام، آخذ ثلاث قطع. أدفع كاش.",
            "translation": "OK, I'll take three pieces. I'll pay cash.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "تمام, آخذ, and كاش are all Phase 5 transaction vocab."
          },
          {
            "text": "لا، آخذ القطعتين فقط. أدفع بالبطاقة.",
            "translation": "No, I'll just take the two pieces. Pay by card.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "Natural — أدفع بالبطاقة is correct."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "الله يبارك! ولدك بيفرح فيها. يعطيك العافية.",
        "translation": "God bless! Your son will love them. God give you strength.",
        "end": true
      }
    ],
    "completionMessage": "Excellent kids' shopping! Great use of في خصم, آخذ, and 3rd-person reference."
  },
  {
    "id": "saudi_convo_p5_buy_dates_gift",
    "phase": 5,
    "title": "Buying Dates as a Gift",
    "description": "Buy a box of premium Saudi dates as a gift at a dates shop.",
    "focalWordIds": [
      "w_howmuch",
      "w_expensive",
      "w_cheap",
      "w_discount",
      "w_buy",
      "w_riyal"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً وسهلاً! تبغى تمر هدية؟",
        "translation": "Welcome! Would you like dates as a gift?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell him what you're looking for:",
        "options": [
          {
            "text": "أيوه، أبغى علبة تمر راقية هدية لعميل.",
            "translation": "Yes, I want an elegant box of dates as a gift for a client.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "لعميل (for a client) — natural 3rd-person reference."
          },
          {
            "text": "أريد علبة تمر فاخرة لهدية.",
            "translation": "I want a luxury box of dates for a gift.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد is MSA. Say أبغى علبة تمر راقية."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عندنا صواني عجوة المدينة الفاخرة. الكيلو بمئة وعشرين ريال. أحسن تمر في السوق.",
        "translation": "We have premium Medina Ajwa trays. One kilo for 120 riyals. Best dates in the market.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "React to the price:",
        "options": [
          {
            "text": "غالي! بكم نص كيلو؟",
            "translation": "Expensive! How much for half a kilo?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "نص كيلو is the Saudi form for half a kilo — natural."
          },
          {
            "text": "السعر مرتفع. هل عندك كميات أقل؟",
            "translation": "The price is high. Do you have smaller quantities?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "السعر مرتفع is MSA. Say غالي and نص كيلو or ربع كيلو."
          },
          {
            "text": "في خصم لو اشتريت كيلوين؟",
            "translation": "Is there a discount if I buy two kilos?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Smart bulk discount question — في خصم is Phase 5 vocab."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "نص كيلو بستين ريال. لو اشتريت كيلوين نعطيك عشرة بالمئة خصم.",
        "translation": "Half a kilo for 60 riyals. If you buy two kilos we give you 10% off.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Decide on the quantity:",
        "options": [
          {
            "text": "آخذ كيلوين. مع الخصم بكم؟",
            "translation": "I'll take two kilos. How much with the discount?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "آخذ and مع الخصم بكم are excellent Phase 5 phrases."
          },
          {
            "text": "آخذ نص كيلو بس.",
            "translation": "I'll take just half a kilo.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "بس is the Saudi \"only\" — natural."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "مئتين وستة عشر ريال مع الخصم. توضيبها هدية؟",
        "translation": "216 riyals with the discount. Should I wrap it as a gift?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Confirm gift wrapping and pay:",
        "options": [
          {
            "text": "أيوه، غلفها زين. أدفع بالبطاقة.",
            "translation": "Yes, wrap it nicely. I'll pay by card.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "غلفها زين is natural Saudi — أدفع بالبطاقة is correct."
          },
          {
            "text": "أيوه، هدية فاخرة. تفضل الفلوس كاش.",
            "translation": "Yes, a luxury gift. Here's the cash.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "الفلوس كاش is natural Saudi payment language."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "تفضل! عميلك بيفرح بالتمر. الله يبارك في تجارتك.",
        "translation": "Here you go! Your client will love the dates. God bless your business.",
        "end": true
      }
    ],
    "completionMessage": "Great purchase! You used خصم, نص كيلو, آخذ, and 3rd-person reference well."
  },
  {
    "id": "saudi_convo_p5_barber_haircut",
    "phase": 5,
    "title": "Getting a Haircut",
    "description": "Negotiate the price and style at a Saudi barber shop.",
    "focalWordIds": [
      "w_howmuch",
      "w_expensive",
      "w_pay",
      "w_money",
      "w_riyal",
      "w_cheap"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! تبغى حلاقة؟",
        "translation": "Hey! Do you want a haircut?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask what services are available:",
        "options": [
          {
            "text": "أيوه. إيش عندكم وبكم؟",
            "translation": "Yes. What do you have and how much?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "بكم is the Phase 5 price question — combining it with إيش is natural."
          },
          {
            "text": "نعم، ما هي الخدمات المتاحة وأسعارها؟",
            "translation": "Yes, what are the available services and their prices?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "نعم and المتاحة are MSA. Say أيوه، إيش عندكم وبكم؟"
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "حلاقة عادية بعشرين، مع التشكيل ثلاثين، وكامل مع الحواجب والمسك بخمسة وأربعين.",
        "translation": "Regular cut 20, with styling 30, full including eyebrows and candle wax 45.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Choose a service and react to the price:",
        "options": [
          {
            "text": "التشكيل بثلاثين. غالي شوي، ما تقدر تعمل خمسة وعشرين؟",
            "translation": "Styling for thirty. A bit expensive, can't you do twenty-five?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Haggling at a barber is very Saudi — غالي شوي is natural."
          },
          {
            "text": "أريد الحلاقة العادية فقط.",
            "translation": "I want just the regular cut.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "أريد is MSA. Say أبغى الحلاقة العادية بس."
          },
          {
            "text": "الكامل بكم شامل كل شي؟",
            "translation": "How much is the full service including everything?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "شامل كل شي is natural Saudi clarification."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "ماشي، خمسة وعشرين مع التشكيل. تفضل اجلس.",
        "translation": "OK, 25 with styling. Please have a seat.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Describe how you want your hair cut:",
        "options": [
          {
            "text": "من الجنبين قصير وفوق متوسط.",
            "translation": "Short on the sides and medium on top.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Natural Saudi description of a haircut style."
          },
          {
            "text": "أريد شعراً قصيراً من الجانبين وطويلاً من الأعلى.",
            "translation": "I want hair short from the sides and long on top.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "أريد شعراً is MSA. Say أبغى من الجنبين قصير وفوق شوي أطول."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "تمام، فهمت. بشغل لك شي راقي إن شاء الله.",
        "translation": "OK, understood. I'll do something elegant for you, God willing.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "After the haircut — pay:",
        "options": [
          {
            "text": "تمام، زين الشغل. تفضل خمسة وعشرين كاش.",
            "translation": "Great, nice work. Here's 25 cash.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "Complimenting the work then paying — very natural."
          },
          {
            "text": "شكراً. أدفع بالبطاقة.",
            "translation": "Thank you. I'll pay by card.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "أدفع بالبطاقة is correct."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "مشكور! يعطيك العافية. تعال مرة ثانية.",
        "translation": "Thanks! God give you strength. Come again.",
        "end": true
      }
    ],
    "completionMessage": "Perfect barber visit! You used بكم, غالي شوي, and كاش like a local."
  },
  {
    "id": "saudi_convo_p5_at_bank_withdraw",
    "phase": 5,
    "title": "Withdrawing at the Bank",
    "description": "Withdraw cash at a Saudi bank counter.",
    "focalWordIds": [
      "w_pay",
      "w_money",
      "w_riyal",
      "w_receipt",
      "w_howmuch",
      "w_discount"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! بخدمتك. إيش تبغى؟",
        "translation": "Hello! At your service. What do you need?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "State you want to withdraw:",
        "options": [
          {
            "text": "أبغى أسحب فلوس من حسابي.",
            "translation": "I want to withdraw money from my account.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أبغى أسحب فلوس is natural Saudi banking language."
          },
          {
            "text": "أريد سحب مبلغ من حسابي.",
            "translation": "I want to withdraw an amount from my account.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد and مبلغ are MSA. Say أبغى أسحب فلوس."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تفضل. الهوية والبطاقة من فضلك.",
        "translation": "Go ahead. Your ID and card please.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Hand over documents and state the amount:",
        "options": [
          {
            "text": "تفضل. أبغى أسحب ألفين ريال.",
            "translation": "Here you go. I want to withdraw two thousand riyals.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Direct and natural — أبغى أسحب + amount is correct."
          },
          {
            "text": "هذه وثائقي. أريد سحب ألفين ريال سعودي.",
            "translation": "Here are my documents. I want to withdraw two thousand Saudi riyals.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "وثائقي and أريد are MSA. Say أوراقي and أبغى."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الرصيد يكفي. في رسوم السحب نصف ريال. تكمل؟",
        "translation": "Balance is sufficient. There is a half-riyal withdrawal fee. Do you confirm?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "React to the fee:",
        "options": [
          {
            "text": "نصف ريال رسوم! ليش في رسوم؟",
            "translation": "Half-riyal fee! Why is there a fee?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "ليش (why in Saudi) is correct — questioning the fee is natural."
          },
          {
            "text": "تمام، أكمل.",
            "translation": "OK, continue.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "تمام is the Saudi go-ahead — natural."
          },
          {
            "text": "هذا غير مقبول. لماذا هناك رسوم؟",
            "translation": "This is unacceptable. Why is there a fee?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "لماذا is MSA. Say ليش في رسوم؟"
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "الرسوم على السحب النقدي من الفرع. من الصراف الآلي ما في رسوم.",
        "translation": "The fee is for branch cash withdrawal. No fee from the ATM.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Decide:",
        "options": [
          {
            "text": "تمام، أكمل. وعطني الإيصال.",
            "translation": "OK, continue. And give me the receipt.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "عطني الإيصال is natural Saudi imperative."
          },
          {
            "text": "لا، أروح الصراف الآلي أحسن.",
            "translation": "No, I'll go to the ATM instead.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "Natural decision — أروح is correct Saudi."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "تفضل ألفين ريال والإيصال. يعطيك العافية.",
        "translation": "Here are 2000 riyals and the receipt. God give you strength.",
        "end": true
      }
    ],
    "completionMessage": "Excellent bank visit! You used أسحب فلوس, رسوم, and عطني correctly."
  },
  {
    "id": "saudi_convo_p5_buy_perfume_oud",
    "phase": 5,
    "title": "Buying Oud Perfume",
    "description": "Buy oud oil at a perfume shop, comparing options.",
    "focalWordIds": [
      "w_howmuch",
      "w_expensive",
      "w_cheap",
      "w_buy",
      "w_riyal",
      "w_discount"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً! تبغى عود؟ عندنا أجود العطور.",
        "translation": "Welcome! Looking for oud? We have the finest perfumes.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Tell him what you want:",
        "options": [
          {
            "text": "أبغى عود هندي أصلي. بكم؟",
            "translation": "I want authentic Indian oud. How much?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أبغى + بكم is Phase 5 Saudi transactional language."
          },
          {
            "text": "أريد زيت عود هندياً أصلياً.",
            "translation": "I want authentic Indian oud oil.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد is MSA. Say أبغى عود هندي."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "هذا العود الهندي من أسام. المثقال بثمانمية ريال. نادر ومطلوب.",
        "translation": "This Indian oud is from Assam. One mithqal (3g) for 800 riyals. Rare and in demand.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "That's expensive — respond:",
        "options": [
          {
            "text": "غالي مرة! في عود أرخص بس جودته زينة؟",
            "translation": "Very expensive! Is there cheaper oud but still good quality?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "غالي مرة intensifies the complaint — أرخص بس زينة is natural."
          },
          {
            "text": "ثمنه مرتفع جداً. هل عندك خيارات أقل سعراً؟",
            "translation": "Its price is very high. Do you have lower priced options?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "ثمنه مرتفع and هل عندك are MSA. Say غالي مرة and في عود أرخص؟"
          },
          {
            "text": "آخر سعر؟",
            "translation": "Final price?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "آخر سعر is the classic Saudi final-price question — great."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "في عود كمبودي بثلاثمية ريال. رائحته قوية وتدوم.",
        "translation": "There is Cambodian oud for 300 riyals. Its scent is strong and lasting.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Ask to smell both before deciding:",
        "options": [
          {
            "text": "بجرب الاثنين أشم ريحتهم.",
            "translation": "I'll try both to smell them.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "بجرب is the Saudi present-future — natural phrasing."
          },
          {
            "text": "هل يمكنني شم العطرين قبل الشراء؟",
            "translation": "Can I smell both perfumes before buying?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "هل يمكنني is MSA. Say بجرب الاثنين أشم ريحتهم."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "أيوه تفضل. الهندي أثقل والكمبودي أخف.",
        "translation": "Yes go ahead. The Indian is heavier and the Cambodian is lighter.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Choose one and negotiate:",
        "options": [
          {
            "text": "آخذ الكمبودي. في خصم لو دفعت كاش؟",
            "translation": "I'll take the Cambodian. Is there a discount if I pay cash?",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "Linking cash payment to a discount is smart Saudi bargaining."
          },
          {
            "text": "آخذ الهندي بسبعمية. آخر كلمة.",
            "translation": "I'll take the Indian for 700. Final word.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "آخر كلمة is the Saudi \"my final offer\" — perfect Phase 5."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "ماشي، خصم خمسة وعشرين ريال لو كاش. يطيب قلبك.",
        "translation": "OK, a 25-riyal discount for cash. Enjoy it.",
        "end": true
      }
    ],
    "completionMessage": "Excellent oud shopping! You used بكم, غالي مرة, آخر سعر, and خصم correctly."
  },
  {
    "id": "saudi_convo_p5_buy_phone_credit",
    "phase": 5,
    "title": "Buying Phone Credit",
    "description": "Top up your prepaid phone at a convenience store.",
    "focalWordIds": [
      "w_howmuch",
      "w_pay",
      "w_money",
      "w_riyal",
      "w_buy",
      "w_receipt"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "هلا! إيش تبغى؟",
        "translation": "Hey! What do you want?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask for phone credit top-up:",
        "options": [
          {
            "text": "أبغى رصيد STC خمسين ريال.",
            "translation": "I want 50 riyals STC credit.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "أبغى رصيد is natural Saudi phrasing for phone top-up."
          },
          {
            "text": "أريد شحن رصيد اتصالات بخمسين ريالاً.",
            "translation": "I want to recharge telecoms credit by fifty riyals.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "أريد and the formal phrasing are MSA. Say أبغى رصيد STC خمسين."
          },
          {
            "text": "شحن خمسين ريال STC.",
            "translation": "Fifty-riyal STC top-up.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Very direct — this is how many Saudis order credit."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "رقم الجوال إيش؟",
        "translation": "What's the mobile number?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give your number:",
        "options": [
          {
            "text": "خمسة صفر خمسة واحد اثنين ثلاثة أربعة خمسة.",
            "translation": "Five zero five one two three four five.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Reading a Saudi phone number digit by digit is natural."
          },
          {
            "text": "رقمي هو: 0501234567.",
            "translation": "My number is: 0501234567.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "رقمي هو is a bit formal. Just state the digits naturally."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تمام. الرصيد خمسين ريال. كيف تدفع؟",
        "translation": "OK. Credit 50 riyals. How will you pay?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Pay for the credit:",
        "options": [
          {
            "text": "كاش. تفضل خمسين ريال.",
            "translation": "Cash. Here's fifty riyals.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "كاش + تفضل is the natural Saudi way to hand over cash."
          },
          {
            "text": "أدفع بالبطاقة.",
            "translation": "I'll pay by card.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "أدفع بالبطاقة is correct."
          },
          {
            "text": "سأدفع نقداً.",
            "translation": "I will pay in cash.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "سأدفع نقداً is MSA. Say كاش."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "تم الشحن! راح تجي رسالة على الجوال.",
        "translation": "Topped up! You will get an SMS on your phone.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Ask for a receipt:",
        "options": [
          {
            "text": "عطني الفاتورة من فضلك.",
            "translation": "Give me the receipt please.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "عطني + الفاتورة is natural Saudi."
          },
          {
            "text": "لا يهم، شكراً.",
            "translation": "Never mind, thanks.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "لا يهم is fine — short and natural."
          },
          {
            "text": "هل يمكنني الحصول على فاتورة؟",
            "translation": "Can I get a receipt?",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "هل يمكنني is MSA. Say عطني الفاتورة or أبغى الفاتورة."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "تفضل الفاتورة. يعطيك العافية!",
        "translation": "Here is the receipt. God give you strength!",
        "end": true
      }
    ],
    "completionMessage": "Perfect top-up! You used أبغى رصيد, كاش, and الفاتورة like a pro."
  },
  {
    "id": "saudi_convo_p8_compare_riyadh_jeddah",
    "phase": 8,
    "title": "Riyadh vs Jeddah",
    "description": "Compare the two biggest Saudi cities with a friend.",
    "focalWordIds": [
      "w_better",
      "w_different",
      "w_because",
      "w_farq",
      "w_think",
      "w_although"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أنت تفضل الرياض ولا جدة؟",
        "translation": "Do you prefer Riyadh or Jeddah?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Share your preference:",
        "options": [
          {
            "text": "أفضل جدة لأن الجو أحسن وعندها البحر",
            "translation": "I prefer Jeddah because the weather is better and it has the sea.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! لأن + سبب واضح — هذا بالضبط اللي تحتاجه في المقارنة."
          },
          {
            "text": "الرياض أكبر من جدة",
            "translation": "Riyadh is bigger than Jeddah.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "صح بس ما عطيت سبب تفضيلك — حاول تقول لأن."
          },
          {
            "text": "ما أدري، كلهم زين",
            "translation": "I don't know, they're both good.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "هذا ما يكفي في نقاش المقارنة — خذ موقف وبرره."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "في رأيي الرياض أحسن لأن الفرص الوظيفية أكثر بكثير، مع إن جدة أجمل بصراحة.",
        "translation": "In my opinion Riyadh is better because job opportunities are much more, although Jeddah is prettier honestly.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "أظن لازم تشوف الفرق الحقيقي — جدة فيها البحر والجو أرطب، بس الرياض فيها فرص أكثر.",
        "translation": "I think you need to see the real difference — Jeddah has the sea and the air is more humid, but Riyadh has more opportunities.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Respond to the job-opportunity point:",
        "options": [
          {
            "text": "صح، بس بصراحة أنا أحتاج جو أحسن للصحة، مقارنة بـ الرياض جدة أفضل لي",
            "translation": "True, but honestly I need better weather for my health, compared to Riyadh Jeddah is better for me.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! استخدمت مقارنة بـ وبصراحة وأعطيت سبب شخصي."
          },
          {
            "text": "أيوه الرياض أحسن",
            "translation": "Yeah Riyadh is better.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "قليل جداً — أضف لأن أو سبب."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "يعني كل واحد وظروفه — الفرق واضح بين المدينتين بس كلهم فيهم خير.",
        "translation": "So it depends on your circumstances — the difference between the two cities is clear but both have good in them.",
        "end": true
      }
    ],
    "completionMessage": "Well done comparing Riyadh and Jeddah with reasons and opinion connectors!"
  },
  {
    "id": "saudi_convo_p8_advice_career_change",
    "phase": 8,
    "title": "Should I Change Careers?",
    "description": "A friend asks your advice about switching careers.",
    "focalWordIds": [
      "w_think",
      "w_because",
      "w_sabab",
      "w_muhimm",
      "w_better",
      "w_although"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أبغى أغير مجالي الوظيفي بس خايف — وش رأيك؟",
        "translation": "I want to change my career field but I'm scared — what do you think?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Give initial advice:",
        "options": [
          {
            "text": "أظن إن الخوف طبيعي، بس السبب اللي عندك وش هو؟",
            "translation": "I think fear is normal, but what is the reason you have?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "زين جداً — طرحت سؤال عن السبب قبل ما تعطي نصيحة."
          },
          {
            "text": "لا تغير، الأمان أهم",
            "translation": "Don't change, security is more important.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "نصيحة بدون فهم الموقف — حاول تسأل عن السبب أولاً."
          },
          {
            "text": "غير بسرعة، ما في وقت",
            "translation": "Change quickly, there's no time.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "متسرع جداً بدون معلومات."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "السبب إن راتبي كويس بس ما أحب شغلي أبداً، وأحس إن عمري يروح.",
        "translation": "The reason is my salary is good but I don't like my job at all, and I feel like my life is passing.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "السبب إن راتبي زين بس ما أحب الشغل، وأحس بضغط كل يوم.",
        "translation": "The reason is my salary is good but I don't like the job, and I feel pressure every day.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Now give your real advice with a reason:",
        "options": [
          {
            "text": "في رأيي غير المجال لأن السعادة في الشغل أهم من الراتب على المدى البعيد",
            "translation": "In my opinion change fields because happiness in work is more important than salary in the long run.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! في رأيي + لأن + مقارنة — نصيحة قوية ومبررة."
          },
          {
            "text": "اصبر شوي وشوف",
            "translation": "Be patient a bit and see.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "مقبول بس ما عطيت سبب واضح — أضف لأن."
          },
          {
            "text": "أنا ما أقدر أقول، قرارك أنت",
            "translation": "I can't say, it's your decision.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "تهرب من النصيحة — صاحبك يحتاج رأيك."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "والله كلامك صح، مع إن التغيير صعب بس أحسن من إني أبقى تعبان كل يوم. شكراً على النصيحة.",
        "translation": "By God you're right, although change is hard it's better than staying miserable every day. Thanks for the advice.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You gave well-reasoned career advice in Saudi Arabic."
  },
  {
    "id": "saudi_convo_p8_compare_old_new_phones",
    "phase": 8,
    "title": "Old Phone vs New Phone",
    "description": "Compare your old and new smartphones with a colleague.",
    "focalWordIds": [
      "w_better",
      "w_different",
      "w_farq",
      "w_because",
      "w_same",
      "w_think"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "اشتريت جوال جديد؟ وش الفرق عن القديم؟",
        "translation": "Did you buy a new phone? What's the difference from the old one?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Describe the main difference:",
        "options": [
          {
            "text": "الكاميرا أحسن بكثير لأن فيها تقنية أجدد، مقارنة بـ القديم الفرق واضح",
            "translation": "The camera is much better because it has newer technology, compared to the old one the difference is clear.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! أحسن بكثير + لأن + مقارنة بـ — مقارنة مكتملة."
          },
          {
            "text": "الجديد أكبر شوي",
            "translation": "The new one is slightly bigger.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "صح بس بسيط جداً — أضف سبب أو مقارنة."
          },
          {
            "text": "نفس الشي تقريباً",
            "translation": "Pretty much the same thing.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "إذا نفس الشي ليش اشتريت؟ حاول توضح الفرق."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "والبطارية؟ لأن هذي أهم شي عندي في الجوال.",
        "translation": "And the battery? Because this is the most important thing for me in a phone.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "ما يستاهل تغيير إذا ما في فرق كبير، وش رأيك في البطارية؟",
        "translation": "Not worth changing if there's no big difference, what do you think about the battery?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Compare battery life:",
        "options": [
          {
            "text": "البطارية أطول بكثير، بصراحة هذا أهم تحسين لأن القديم كان يخلص بسرعة",
            "translation": "The battery lasts much longer, honestly this is the most important improvement because the old one used to run out fast.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! بصراحة + لأن + مقارنة ضمنية — ممتاز."
          },
          {
            "text": "البطارية نفس الشي",
            "translation": "The battery is the same.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "مقبول بس ما في تقييم — زيد رأيك."
          },
          {
            "text": "ما جربت بعد",
            "translation": "Haven't tried yet.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "إجابة ضعيفة في مقارنة — حاول تقدر تقول شي."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "يعني يستاهل التغيير — أظن إني أبحث عن نفس الموديل الأسبوع الجاي.",
        "translation": "So it's worth the change — I think I'll look for the same model next week.",
        "end": true
      }
    ],
    "completionMessage": "Great job comparing phones with clear reasons and comparisons!"
  },
  {
    "id": "saudi_convo_p8_advice_marriage_timing",
    "phase": 8,
    "title": "When Should I Get Married?",
    "description": "A friend asks your opinion on the right time to get married.",
    "focalWordIds": [
      "w_think",
      "w_because",
      "w_muhimm",
      "w_sabab",
      "w_although",
      "w_believe"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أنا عمري ٢٦ وأهلي يضغطون عليّ للزواج — وش رأيك؟ هل الوقت مناسب؟",
        "translation": "I'm 26 and my family is pressuring me about marriage — what do you think? Is the timing right?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Give your opening view:",
        "options": [
          {
            "text": "في رأيي الاستعداد المالي والنفسي أهم من العمر",
            "translation": "In my opinion financial and emotional readiness is more important than age.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "زين جداً — في رأيي + معيار واضح للمقارنة."
          },
          {
            "text": "اتزوج بسرعة، ٢٦ كثير",
            "translation": "Get married quickly, 26 is too much.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "ما عطيت سبب — لماذا ٢٦ كثير؟"
          },
          {
            "text": "لا تتزوج الحين",
            "translation": "Don't get married now.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "نصيحة بدون سبب — أضف لأن."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "كيف أعرف إني مستعد؟ لأني ما عندي راتب ثابت بعد.",
        "translation": "How do I know I'm ready? Because I don't have a stable salary yet.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "بس أنا ما عندي راتب ثابت — وش أسوي؟",
        "translation": "But I don't have a stable salary — what do I do?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Advise on the stable salary issue:",
        "options": [
          {
            "text": "أظن إن الراتب الثابت ضروري لأن المسؤولية تحتاج أساس مالي، بس مع إن الوضع يختلف من شخص لشخص",
            "translation": "I think a stable salary is necessary because responsibility needs a financial foundation, although the situation varies person to person.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! أظن + لأن + مع إن — تحليل ناضج ومتوازن."
          },
          {
            "text": "الفلوس مو كل شي",
            "translation": "Money isn't everything.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "صح جزئياً بس تحتاج تبرر أكثر."
          },
          {
            "text": "اسأل أهلك",
            "translation": "Ask your family.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "تهرب من إعطاء رأي — صاحبك يريد رأيك أنت."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "والله كلام صح — أصدق إن الاستعداد الحقيقي أهم من الضغط الاجتماعي. شكراً، وضحت لي الأمور.",
        "translation": "By God that's true — I believe real readiness is more important than social pressure. Thanks, you clarified things for me.",
        "end": true
      }
    ],
    "completionMessage": "Excellent advice on marriage timing with balanced reasoning!"
  },
  {
    "id": "saudi_convo_p8_compare_two_universities",
    "phase": 8,
    "title": "Which University is Better?",
    "description": "Help a younger cousin choose between two universities.",
    "focalWordIds": [
      "w_better",
      "w_think",
      "w_because",
      "w_farq",
      "w_muhimm",
      "w_different"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "قبلوني في جامعة الملك سعود وفي جامعة الملك عبدالعزيز — وش أختار؟",
        "translation": "I got accepted to King Saud University and King Abdulaziz University — which do I choose?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask the key question first:",
        "options": [
          {
            "text": "أول شي وش تبغى تدرس؟ لأن التخصص يحدد الجامعة الأفضل",
            "translation": "First thing, what do you want to study? Because the major determines the best university.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! سؤال التخصص أهم سؤال — مع تبرير لأن."
          },
          {
            "text": "جامعة الملك سعود أحسن",
            "translation": "King Saud University is better.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "رأي بدون سبب — لماذا؟"
          },
          {
            "text": "كلهم نفس الشي",
            "translation": "They're all the same.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "مو صح — في فرق واضح بين الجامعات."
          },
          {
            "text": "روح الأقرب لبيتك",
            "translation": "Go to the closer one to your house.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "المسافة مو المعيار الوحيد — في عوامل أهم."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أبغى أدرس الهندسة — وش الفرق بينهم في هذا التخصص؟",
        "translation": "I want to study engineering — what's the difference between them in this major?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "أبغى أدرس الهندسة — في رأيك وش الأحسن لي؟",
        "translation": "I want to study engineering — in your opinion which is best for me?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give a comparative answer for engineering:",
        "options": [
          {
            "text": "في رأيي جامعة الملك سعود أحسن للهندسة لأن تصنيفها أعلى ولها شراكات مع شركات كبيرة، مقارنة بـ جامعة الملك عبدالعزيز",
            "translation": "In my opinion King Saud University is better for engineering because its ranking is higher and it has partnerships with big companies, compared to King Abdulaziz University.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! في رأيي + لأن + مقارنة بـ — إجابة شاملة."
          },
          {
            "text": "ما أعرف بالهندسة",
            "translation": "I don't know about engineering.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "تهرب — حاول تعطي رأي حتى لو بسيط."
          },
          {
            "text": "الجامعتين كويستين",
            "translation": "Both universities are good.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "ما ساعدته يختار — يحتاج مقارنة واضحة."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "شكراً! هذا يساعدني — أظن إني راح أختار جامعة الملك سعود لأن الفرص الوظيفية بعد التخرج أهم شي.",
        "translation": "Thanks! This helps me — I think I'll choose King Saud University because job opportunities after graduation are the most important thing.",
        "end": true
      }
    ],
    "completionMessage": "Great job helping compare universities with clear criteria!"
  },
  {
    "id": "saudi_convo_p8_compare_jobs_offers",
    "phase": 8,
    "title": "Two Job Offers",
    "description": "Help a friend decide between two job offers.",
    "focalWordIds": [
      "w_better",
      "w_because",
      "w_think",
      "w_muhimm",
      "w_farq",
      "w_sabab"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "عندي عرضين وظيفيين — الأول راتبه أعلى بس بعيد، والثاني أقرب بس راتبه أقل. وش أختار؟",
        "translation": "I have two job offers — the first has a higher salary but it's far, the second is closer but the salary is lower. Which do I choose?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "What's the most important factor for you?",
        "options": [
          {
            "text": "السؤال المهم: وش أهم لك، الراتب ولا جودة الحياة؟ لأن الإجابة تحدد القرار",
            "translation": "The important question: what matters more to you, salary or quality of life? Because the answer determines the decision.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! سؤال تحليلي مع تبرير — هذا التفكير الصح."
          },
          {
            "text": "الراتب الأعلى دايماً أحسن",
            "translation": "Higher salary is always better.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "مو دايماً — في عوامل ثانية مهمة."
          },
          {
            "text": "القريب أحسن",
            "translation": "The closer one is better.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "بدون سبب — لماذا القرب أهم؟"
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عندي عيلة وأبغى أكون قريب منهم، بس الراتب الإضافي مهم للادخار.",
        "translation": "I have a family and I want to be close to them, but the extra salary is important for saving.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "عيلتي مهمة لي بس الادخار كذلك مهم.",
        "translation": "My family is important to me but saving is also important.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give a balanced recommendation:",
        "options": [
          {
            "text": "في رأيي خذ الوظيفة القريبة لأن وقتك مع عيلتك لا يرجع، مع إن الفرق في الراتب مؤلم بس صحتك النفسية أهم",
            "translation": "In my opinion take the closer job because your time with your family doesn't come back, although the salary difference is painful but your mental health is more important.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! في رأيي + لأن + مع إن — تحليل شامل ومتوازن."
          },
          {
            "text": "خذ الراتب الأعلى وادخر",
            "translation": "Take the higher salary and save.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "نصيحة بدون مراعاة الأولوية التي ذكرها."
          },
          {
            "text": "صعب أقول، أنت تعرف أحسن",
            "translation": "Hard to say, you know best.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "تهرب من الرأي — هو يحتاج مساعدة."
          },
          {
            "text": "جرب الأول وإذا ما ناسب تغير",
            "translation": "Try the first and if it doesn't suit, change.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "غير عملي — ما هكذا الوظائف تشتغل."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "بصراحة كلامك صح — العيلة أهم والوقت لا يرجع. بختار الوظيفة القريبة والله يوفق.",
        "translation": "Honestly you're right — family is more important and time doesn't come back. I'll choose the closer job, may God bless.",
        "end": true
      }
    ],
    "completionMessage": "Well done giving balanced advice on a tough career decision!"
  },
  {
    "id": "saudi_convo_p8_compare_neighborhoods",
    "phase": 8,
    "title": "Which Neighborhood?",
    "description": "Compare two neighborhoods for a friend looking to rent.",
    "focalWordIds": [
      "w_better",
      "w_different",
      "w_because",
      "w_farq",
      "w_think",
      "w_qariib"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أبغى أستأجر شقة — في حي النخيل ولا حي الملقا؟ أيهم أحسن؟",
        "translation": "I want to rent an apartment — in Al-Nakheel or Al-Malqa neighborhood? Which is better?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask what matters most to them:",
        "options": [
          {
            "text": "يعتمد — وش أهم لك؟ الهدوء ولا القرب من الخدمات؟",
            "translation": "It depends — what matters most to you? Quiet or proximity to services?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "زين — سؤال ذكي قبل المقارنة."
          },
          {
            "text": "حي النخيل أحسن بكثير",
            "translation": "Al-Nakheel is much better.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "رأي بدون معرفة أولوياته — اسأل أولاً."
          },
          {
            "text": "كلهم نفس الشي",
            "translation": "They're all the same.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "مو دقيق — في فرق بين الأحياء."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عندي أطفال فالأمان والهدوء أهم شي، والمدارس لازم تكون قريبة.",
        "translation": "I have children so safety and quiet are most important, and schools need to be close.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "عندي أطفال والمدارس مهمة لي.",
        "translation": "I have children and schools are important to me.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give a recommendation based on their priorities:",
        "options": [
          {
            "text": "أظن حي الملقا أحسن لعيلتك لأنه أهدى وفيه مدارس قريبة، مقارنة بـ النخيل الذي فيه حركة أكثر",
            "translation": "I think Al-Malqa is better for your family because it's quieter and has schools nearby, compared to Al-Nakheel which has more activity.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! أظن + لأن + مقارنة بـ — تناسب احتياجاته تماماً."
          },
          {
            "text": "الملقا أجمل",
            "translation": "Al-Malqa is prettier.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "ما ربطت المدارس والأمان بقرارك."
          },
          {
            "text": "شوف الإيجار أرخص",
            "translation": "See which rent is cheaper.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "السعر مو أولويته — قاله وش يريد."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "ممتاز، هذا بالضبط اللي أبحث عنه — الفرق واضح لما تحط المعايير الصح. شكراً.",
        "translation": "Excellent, this is exactly what I'm looking for — the difference is clear when you put the right criteria. Thanks.",
        "end": true
      }
    ],
    "completionMessage": "Great neighborhood comparison using the right criteria!"
  },
  {
    "id": "saudi_convo_p8_advice_buying_car",
    "phase": 8,
    "title": "Buying a Car: New or Used?",
    "description": "Give advice to a friend deciding between a new or used car.",
    "focalWordIds": [
      "w_better",
      "w_because",
      "w_think",
      "w_although",
      "w_farq",
      "w_sabab"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أبغى أشتري سيارة — جديدة ولا مستعملة؟ وش تنصحني؟",
        "translation": "I want to buy a car — new or used? What do you advise me?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Start with a key question:",
        "options": [
          {
            "text": "السؤال الأول: وش ميزانيتك؟ لأن هذا يحدد الخيار الأفضل لك",
            "translation": "First question: what's your budget? Because this determines the best option for you.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "زين — السؤال عن الميزانية هو الأساس."
          },
          {
            "text": "الجديدة دايماً أحسن",
            "translation": "New is always better.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "مو دايماً — يعتمد على الميزانية والاحتياج."
          },
          {
            "text": "اشتري مستعملة توفر فلوس",
            "translation": "Buy used, save money.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "نصيحة بدون معرفة وضعه — اسأل أولاً."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ميزانيتي حوالي ٨٠ ألف — أقدر آخذ جديدة زهيدة أو مستعملة أحسن.",
        "translation": "My budget is around 80,000 — I can get a cheap new one or a better used one.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "عندي ٨٠ ألف — وش أفعل؟",
        "translation": "I have 80,000 — what do I do?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give a reasoned recommendation:",
        "options": [
          {
            "text": "في رأيي خذ المستعملة الأحسن لأن تحصل سيارة أعلى مستوى بنفس السعر، مع إن الضمان أقل بس الجودة أهم",
            "translation": "In my opinion get the better used car because you get a higher quality car at the same price, although the warranty is less but quality is more important.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! في رأيي + لأن + مع إن — تحليل موازن."
          },
          {
            "text": "الجديدة أحسن لأن فيها ضمان",
            "translation": "New is better because it has warranty.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "نقطة وحيدة فقط — ما وازنت بين الخيارين."
          },
          {
            "text": "كلهم نفس الشي في النهاية",
            "translation": "They're all the same in the end.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "مو صح — في فرق واضح في القيمة مقابل السعر."
          },
          {
            "text": "اتدين وخذ أحسن سيارة",
            "translation": "Borrow money and get the best car.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "نصيحة سيئة — لم يذكر أنه يريد يتدين."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "والله تحليل ممتاز — ما فكرت بالموضوع من هالجهة. أظن إنك صح والمستعملة الجيدة أحسن خيار لي.",
        "translation": "By God excellent analysis — I hadn't thought about it from that angle. I think you're right and a good used car is the best choice for me.",
        "end": true
      }
    ],
    "completionMessage": "Excellent car-buying advice with well-balanced reasoning!"
  },
  {
    "id": "saudi_convo_p8_compare_restaurants",
    "phase": 8,
    "title": "Which Restaurant?",
    "description": "Recommend a restaurant by comparing two options.",
    "focalWordIds": [
      "w_better",
      "w_because",
      "w_think",
      "w_same",
      "w_farq",
      "w_although"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أبغى آخذ العيلة على عشاء — مطعم البيك ولا مطعم الروشن؟",
        "translation": "I want to take the family to dinner — Al-Baik or Al-Raushan restaurant?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Share your preference with a reason:",
        "options": [
          {
            "text": "أفضل الروشن لأن الجو عيلي أكثر والأكل أنواع، مقارنة بـ البيك الذي يناسب أكثر للأكل السريع",
            "translation": "I prefer Al-Raushan because the atmosphere is more family-oriented and there are more food varieties, compared to Al-Baik which suits fast food more.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! أفضل + لأن + مقارنة بـ — مقارنة كاملة ومنطقية."
          },
          {
            "text": "البيك أشهر",
            "translation": "Al-Baik is more famous.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "الشهرة مو سبب كافٍ — وضح لماذا يناسب العيلة."
          },
          {
            "text": "كلهم نفس الشي",
            "translation": "They're all the same.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "مو صح — في فرق واضح في النوع والجو."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "وش رأيك في الأسعار؟ لأن عندي أطفال وأبغى ما يكون غالي جداً.",
        "translation": "What do you think about prices? Because I have children and I don't want it to be too expensive.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "الأسعار وش الحال عند الروشن؟",
        "translation": "How are the prices at Al-Raushan?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Address the price concern:",
        "options": [
          {
            "text": "بصراحة الروشن أغلى شوي من البيك، بس الجو والتنوع يستاهل لأن عشاء العيلة مناسبة خاصة",
            "translation": "Honestly Al-Raushan is a bit more expensive than Al-Baik, but the atmosphere and variety are worth it because a family dinner is a special occasion.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "زين جداً! بصراحة + بس + لأن — رأي صريح ومبرر."
          },
          {
            "text": "البيك أرخص فاذهب هناك",
            "translation": "Al-Baik is cheaper so go there.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "تناقض مع توصيتك الأولى — وضح الأولوية."
          },
          {
            "text": "ما أعرف الأسعار",
            "translation": "I don't know the prices.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "تهرب من إعطاء رأي."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تمام، الجو العيلي أهم من الفرق في السعر — راح نروح الروشن وشكراً على النصيحة.",
        "translation": "Okay, the family atmosphere is more important than the price difference — we'll go to Al-Raushan and thanks for the advice.",
        "end": true
      }
    ],
    "completionMessage": "Great restaurant recommendation with price and atmosphere reasoning!"
  },
  {
    "id": "saudi_convo_p8_advice_saving_money",
    "phase": 8,
    "title": "How Do I Start Saving?",
    "description": "Give a friend practical advice on how to start saving money.",
    "focalWordIds": [
      "w_think",
      "w_because",
      "w_muhimm",
      "w_sabab",
      "w_better",
      "w_believe"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أبغى أبدأ أوفر بس ما أعرف من وين أبدأ — وش تنصحني؟",
        "translation": "I want to start saving but I don't know where to start — what do you advise me?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Give the first piece of advice:",
        "options": [
          {
            "text": "أول خطوة وفر ١٠٪ من راتبك أول ما يجي لأن لو انتظرت ما يتبقى شي في الآخر",
            "translation": "First step, save 10% of your salary as soon as it arrives because if you wait nothing will be left at the end.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! نصيحة عملية مع لأن — منطق واضح."
          },
          {
            "text": "اصرف بس ما تبالغ",
            "translation": "Spend but don't exaggerate.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "غير محدد — وش معناه لا تبالغ؟"
          },
          {
            "text": "الادخار صعب، ما قدرت أوفر أنا كذلك",
            "translation": "Saving is hard, I couldn't save either.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "مو نصيحة مفيدة — يحتاج حل لا مشاركة في المشكلة."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "بس مصاريفي الضرورية تاخذ كل الراتب تقريباً — وش أسوي؟",
        "translation": "But my essential expenses take almost all my salary — what do I do?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "مصاريفي كثيرة — وش أعمل؟",
        "translation": "My expenses are a lot — what do I do?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Address the expenses problem:",
        "options": [
          {
            "text": "في رأيي لازم تكتب مصاريفك وتشوف وين تقدر تقطع لأن دايماً في مصاريف غير ضرورية ما نلاحظها",
            "translation": "In my opinion you must write down your expenses and see where you can cut because there are always unnecessary expenses we don't notice.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! في رأيي + لأن + معلومة نافعة — نصيحة مقنعة."
          },
          {
            "text": "دور على شغل ثاني",
            "translation": "Look for a second job.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "حل ممكن بس ما عالجت المصاريف الحالية."
          },
          {
            "text": "ما في حل إذا الراتب قليل",
            "translation": "There's no solution if the salary is low.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "متشائم جداً — في حلول ما استكشفتها."
          },
          {
            "text": "قلل الأكل بالبرا",
            "translation": "Reduce eating out.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "نصيحة وحيدة بدون تحليل كامل."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "والله ما فكرت أكتب المصاريف — أصدق إن هذي الخطوة البسيطة تفرق كثير. أجرب هالأسبوع.",
        "translation": "By God I never thought about writing expenses — I believe this simple step makes a big difference. I'll try it this week.",
        "end": true
      }
    ],
    "completionMessage": "Practical saving advice delivered with clear reasoning — well done!"
  },
  {
    "id": "saudi_convo_p8_compare_travel_destinations",
    "phase": 8,
    "title": "Where Should I Travel?",
    "description": "Compare two travel destinations to help a friend decide.",
    "focalWordIds": [
      "w_better",
      "w_because",
      "w_think",
      "w_different",
      "w_farq",
      "w_although"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "عندي إجازة — أروح تايلاند ولا تركيا؟ وش رأيك؟",
        "translation": "I have vacation — do I go to Thailand or Turkey? What do you think?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask about priorities first:",
        "options": [
          {
            "text": "يعتمد على اهتمامك — تبغى طبيعة وشواطئ ولا تاريخ وثقافة؟",
            "translation": "It depends on your interest — do you want nature and beaches or history and culture?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز — سؤال ذكي قبل التوصية."
          },
          {
            "text": "تركيا أحسن بكثير",
            "translation": "Turkey is much better.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "رأي بدون معرفة أولوياته — اسأل أولاً."
          },
          {
            "text": "تايلاند أرخص",
            "translation": "Thailand is cheaper.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "السعر وحده مو الأساس."
          },
          {
            "text": "كلهم مناطق جميلة",
            "translation": "They're all beautiful areas.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "ما ساعدته — يحتاج مقارنة واضحة."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أنا وعيلتي نحب التاريخ والثقافة، وأبغى شي مريح مو متعب.",
        "translation": "My family and I love history and culture, and I want something relaxing not tiring.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "نحب التاريخ والراحة.",
        "translation": "We like history and relaxation.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give a recommendation matching their priorities:",
        "options": [
          {
            "text": "في رأيي تركيا أحسن لكم لأن فيها تاريخ غني وأماكن مريحة، مقارنة بـ تايلاند التي تناسب أكثر الشباب والمغامرة",
            "translation": "In my opinion Turkey is better for you because it has rich history and comfortable places, compared to Thailand which suits young people and adventure more.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! في رأيي + لأن + مقارنة بـ — توصية مخصصة لاحتياجاتهم."
          },
          {
            "text": "تايلاند أجمل",
            "translation": "Thailand is prettier.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "ما راعيت احتياجاتهم — قالوا تاريخ لا جمال."
          },
          {
            "text": "روحوا البلدين",
            "translation": "Go to both countries.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "غير عملي لإجازة واحدة."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "بصراحة تحليل ممتاز — ما فكرت إن تايلاند للمغامرة أكثر. تركيا قرارنا، شكراً.",
        "translation": "Honestly excellent analysis — I hadn't thought that Thailand is more for adventure. Turkey is our decision, thanks.",
        "end": true
      }
    ],
    "completionMessage": "Excellent travel recommendation tailored to their specific needs!"
  },
  {
    "id": "saudi_convo_p8_advice_parenting",
    "phase": 8,
    "title": "Parenting Advice",
    "description": "Give advice to a friend struggling with a teenager's behavior.",
    "focalWordIds": [
      "w_think",
      "w_because",
      "w_sabab",
      "w_muhimm",
      "w_although",
      "w_believe"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "ولدي عمره ١٥ وما يسمع كلامي أبداً — كل شي يعارضني. وش أسوي؟",
        "translation": "My son is 15 and doesn't listen to me at all — he opposes everything. What do I do?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Give an opening perspective:",
        "options": [
          {
            "text": "هذا طبيعي جداً في سن المراهقة لأن الولد يبحث عن هويته — المشكلة مو أنت ولا هو",
            "translation": "This is very normal in teenage years because a boy is searching for his identity — the problem isn't you or him.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز — طمأنته أولاً ثم أعطيت سبباً علمياً."
          },
          {
            "id": "s2o2",
            "text": "أنت الأب لازم تكون صارم أكثر",
            "translation": "You're the father, you need to be stricter.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "الصرامة وحدها مو الحل مع المراهقين — في بحوث تقول عكس."
          },
          {
            "text": "المراهقة صعبة، اصبر بس",
            "translation": "Teenagers are hard, just be patient.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "صبر بدون إستراتيجية — ما يكفي."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "بس كيف أتعامل معه؟ لأني إذا تركته يسوي اللي يبغى خايف يضيع.",
        "translation": "But how do I deal with him? Because if I leave him to do what he wants I'm afraid he'll go astray.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "خايف إذا ما ضبطته يضيع — كيف أتعامل؟",
        "translation": "I'm afraid if I don't control him he'll go astray — how do I deal with him?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give practical parenting advice:",
        "options": [
          {
            "text": "في رأيي الحوار أهم من الأوامر لأن المراهق يحتاج يحس إن رأيه مهم، مع إن الحدود ضرورية بس بطريقة محترمة",
            "translation": "In my opinion dialogue is more important than orders because a teenager needs to feel his opinion matters, although limits are necessary but in a respectful way.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! في رأيي + لأن + مع إن — توازن بين الحرية والحدود."
          },
          {
            "text": "خذ جواله وهكذا يسمع",
            "translation": "Take his phone and then he'll listen.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "هذا يزيد التوتر في الغالب — ما في تبرير."
          },
          {
            "text": "أنا ما عندي أطفال ما أقدر أساعد",
            "translation": "I don't have children, I can't help.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "تهرب من النصيحة — رأيك كإنسان يفيد."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "والله كلام عميق — أصدق إن الحوار أفضل من المواجهة. راح أجرب أتكلم معه بدون ضغط.",
        "translation": "By God that's deep — I believe dialogue is better than confrontation. I'll try talking to him without pressure.",
        "end": true
      }
    ],
    "completionMessage": "Thoughtful parenting advice with balanced reasoning — excellent!"
  },
  {
    "id": "saudi_convo_p8_compare_clothing_styles",
    "phase": 8,
    "title": "Traditional vs Modern Clothes",
    "description": "Compare traditional and modern clothing styles with a friend.",
    "focalWordIds": [
      "w_different",
      "w_because",
      "w_think",
      "w_same",
      "w_although",
      "w_farq"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أنت تفضل الثوب ولا الملابس الكاجوال في يومياتك؟",
        "translation": "Do you prefer the thobe or casual clothes in your daily life?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Share your preference with a reason:",
        "options": [
          {
            "text": "أفضل الثوب في المواقف الرسمية لأنه يعطي احترام، بس الكاجوال أريح للحركة",
            "translation": "I prefer the thobe in formal situations because it gives respect, but casual is more comfortable for movement.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! تفرق بين السياقات مع سبب لكل خيار."
          },
          {
            "text": "الثوب أحسن دايماً",
            "translation": "The thobe is always better.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "مطلق جداً — في سياقات مختلفة."
          },
          {
            "text": "الكاجوال أحسن دايماً",
            "translation": "Casual is always better.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "نفس المشكلة — مطلق بدون مراعاة السياق."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "وش رأيك في الجيل الجديد الذي ما يلبس الثوب كثير؟",
        "translation": "What do you think about the new generation that doesn't wear the thobe much?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "الجيل الجديد ما يلبس الثوب — وش رأيك؟",
        "translation": "The new generation doesn't wear the thobe — what do you think?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give a nuanced opinion on generational change:",
        "options": [
          {
            "text": "أظن إن الموضة تتغير وهذا طبيعي، مع إن الثوب هوية ثقافية مهمة لأنه يمثل الانتماء لجذورنا",
            "translation": "I think fashion changes and this is natural, although the thobe is an important cultural identity because it represents belonging to our roots.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! أظن + مع إن + لأن — تحليل ثقافي ناضج."
          },
          {
            "text": "الشباب يفعلون اللي يبغون",
            "translation": "Young people do what they want.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "رأي محايد جداً — حاول تعطي موقف."
          },
          {
            "text": "الغرب يأثر على ثقافتنا بشكل سلبي",
            "translation": "The West negatively influences our culture.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "تعميم بدون تبرير — حاول تكون أكثر دقة."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "في رأيي كذلك — الفرق بين الأجيال طبيعي بس الهوية مهمة. ممكن الشخص يجمع بينهم.",
        "translation": "In my opinion too — the difference between generations is natural but identity is important. A person can combine both.",
        "end": true
      }
    ],
    "completionMessage": "Nuanced cultural comparison with thoughtful reasoning — well done!"
  },
  {
    "id": "saudi_convo_p8_advice_business_idea",
    "phase": 8,
    "title": "Is My Business Idea Good?",
    "description": "Evaluate a friend's business idea and give honest advice.",
    "focalWordIds": [
      "w_think",
      "w_because",
      "w_sabab",
      "w_muhimm",
      "w_doubt",
      "w_believe"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "عندي فكرة أفتح كافيه في الحي — وش رأيك؟ تفكر ينجح؟",
        "translation": "I have an idea to open a cafe in the neighborhood — what do you think? Do you think it will succeed?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask the right opening question:",
        "options": [
          {
            "text": "فكرة ممكنة، بس السؤال الأهم: درست المنافسة في المنطقة؟ لأن هذا أول شي لازم تعرفه",
            "translation": "Possible idea, but the most important question: have you studied the competition in the area? Because this is the first thing you need to know.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز — سؤال تحليلي حقيقي مع تبرير."
          },
          {
            "text": "فكرة ممتازة، افتح بسرعة",
            "translation": "Excellent idea, open quickly.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "متحمس بدون تقييم — صاحبك يحتاج رأي حقيقي."
          },
          {
            "text": "الكافيهات كثيرة، ما راح ينجح",
            "translation": "There are many cafes, it won't succeed.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "متشائم بدون تحليل — ما نظرت للفرص."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ما درست المنافسة بعد، بس أحس إن فيه طلب في المنطقة.",
        "translation": "I haven't studied the competition yet, but I feel there is demand in the area.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "ما درست السوق بعد.",
        "translation": "I haven't studied the market yet.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give honest, reasoned advice on next steps:",
        "options": [
          {
            "text": "بصراحة الإحساس مو كافٍ — أنصحك تدرس السوق أولاً لأن أكثر الكافيهات الجديدة تفشل في السنة الأولى بسبب ضعف الدراسة",
            "translation": "Honestly feeling is not enough — I advise you to study the market first because most new cafes fail in the first year due to poor research.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! بصراحة + لأن + إحصاء واقعي — نصيحة صريحة ومبررة."
          },
          {
            "text": "ربما ينجح ربما لا",
            "translation": "Maybe it succeeds maybe not.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "غير مفيد — صاحبك يحتاج رأي واضح."
          },
          {
            "text": "إذا عندك مال اجرب",
            "translation": "If you have money try it.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "نصيحة متهورة — الفلوس وحدها لا تكفي."
          },
          {
            "text": "افتح شي ثاني أحسن",
            "translation": "Open something else, it's better.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "ما قلت لماذا — تحتاج تبرر."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "والله كلام صح — أشك إن كثير الناس تفشل لأنهم ما يدرسون. راح أبدأ بدراسة السوق أولاً.",
        "translation": "By God that's true — I doubt many people fail because they don't study. I'll start by studying the market first.",
        "end": true
      }
    ],
    "completionMessage": "Honest business advice with real market reasoning — excellent!"
  },
  {
    "id": "saudi_convo_p8_compare_dialects",
    "phase": 8,
    "title": "Saudi vs Levantine Arabic",
    "description": "Compare Saudi and Levantine Arabic dialects with a curious friend.",
    "focalWordIds": [
      "w_different",
      "w_farq",
      "w_because",
      "w_think",
      "w_same",
      "w_ikhtalafa"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "وش الفرق بين اللهجة السعودية والشامية؟ كلهم عربي فوش المشكلة؟",
        "translation": "What's the difference between Saudi and Levantine dialect? They're all Arabic so what's the issue?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Explain the key differences:",
        "options": [
          {
            "text": "الفرق كبير — الكلمات والنطق مختلفة كثير، لدرجة إن سعودي وشامي أحياناً ما يفهمون بعض بسرعة",
            "translation": "The difference is big — words and pronunciation are very different, to the extent that a Saudi and a Levantine sometimes don't understand each other quickly.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز — أعطيت مثالاً ملموساً على الفرق."
          },
          {
            "text": "كلهم نفس الشي تقريباً",
            "translation": "They're all pretty much the same.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "مو دقيق — الفرق أكبر من كذا."
          },
          {
            "text": "ما أعرف عن اللهجات",
            "translation": "I don't know about dialects.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "تهرب — حاول تقول شي حتى لو بسيط."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "يعني وش الأفضل للتعلم إذا أبغى أفهم أكثر عربي؟",
        "translation": "So which is best to learn if I want to understand more Arabs?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "أيهم أنفع للتعلم؟",
        "translation": "Which is more useful to learn?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give a reasoned recommendation:",
        "options": [
          {
            "text": "في رأيي الشامية أوسع انتشاراً في الإعلام لأن المسلسلات الشامية تُشاه في كل العالم العربي، مع إن السعودية أهم اقتصادياً",
            "translation": "In my opinion Levantine is more widespread in media because Levantine series are watched across the Arab world, although Saudi is more important economically.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! في رأيي + لأن + مع إن — مقارنة متوازنة."
          },
          {
            "text": "اتعلم الفصحى بس",
            "translation": "Just learn Modern Standard Arabic.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "ما أجبت على سؤاله عن اللهجات تحديداً."
          },
          {
            "text": "السعودية أحسن طبعاً",
            "translation": "Saudi is better of course.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "تحيز بدون تبرير موضوعي."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "فكرة جيدة — أظن إني أبدأ بالشامية لأن المسلسلات ساعدتني أكثر في الفهم. شكراً.",
        "translation": "Good idea — I think I'll start with Levantine because series have helped me understand more. Thanks.",
        "end": true
      }
    ],
    "completionMessage": "Great dialect comparison with media and economic reasoning!"
  },
  {
    "id": "saudi_convo_p8_advice_friend_argument",
    "phase": 8,
    "title": "I Argued with My Friend",
    "description": "Advise a friend on resolving a disagreement.",
    "focalWordIds": [
      "w_think",
      "w_because",
      "w_sabab",
      "w_although",
      "w_ghafara",
      "w_believe"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "اتخانقت مع صاحبي الحين وهو زعلان مني — وش تنصحني أسوي؟",
        "translation": "I just argued with my friend and he's upset with me — what do you advise me to do?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask who was wrong first:",
        "options": [
          {
            "text": "أول شي — أنت كنت غلطان ولا هو؟ لأن الحل يختلف حسب السبب",
            "translation": "First thing — were you both wrong or was it him? Because the solution differs depending on the reason.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "زين جداً — سؤال عادل ومهم للتحليل."
          },
          {
            "text": "كلم صاحبك بسرعة واعتذر",
            "translation": "Contact your friend quickly and apologize.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "قد يكون صح بس بدون معرفة من المخطئ — عجلت."
          },
          {
            "text": "اتركه يهدى وحده",
            "translation": "Leave him to calm down alone.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "مقبول أحياناً بس ما دائماً الحل."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "بصراحة أنا اللي غلطت بس ما أعرف كيف أعتذر بطريقة صحيحة.",
        "translation": "Honestly I was the one who was wrong but I don't know how to apologize properly.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "أنا غلطت — كيف أعتذر؟",
        "translation": "I was wrong — how do I apologize?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Advise on how to apologize properly:",
        "options": [
          {
            "text": "في رأيي الاعتذار الحقيقي يكون وجهاً لوجه لأن الرسالة ما توصل نفس الإحساس، وقل له بصراحة وش أخطأت فيه بالضبط",
            "translation": "In my opinion a real apology should be face to face because a message doesn't convey the same feeling, and tell him honestly what exactly you were wrong about.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! في رأيي + لأن + تفصيل عملي — نصيحة قوية."
          },
          {
            "text": "ارسله رسالة قصيرة",
            "translation": "Send him a short message.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "أسهل بس ما دائماً فعّال — ما بررت."
          },
          {
            "text": "الوقت يحل كل شي",
            "translation": "Time fixes everything.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "تهرب من الحل النشط — الوقت وحده مو كافٍ."
          },
          {
            "text": "هو اللي لازم يكلمك",
            "translation": "He's the one who should contact you.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "قلت أنت اللي غلطت — تناقض مع ما سبق."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "صح — الاعتذار وجهاً لوجه أصعب بس أقوى. أصدق إنه سيعفو لأن صداقتنا قديمة.",
        "translation": "True — a face to face apology is harder but stronger. I believe he'll forgive because our friendship is old.",
        "end": true
      }
    ],
    "completionMessage": "Thoughtful advice on genuine apology with good reasoning!"
  },
  {
    "id": "saudi_convo_p8_compare_old_new_riyadh",
    "phase": 8,
    "title": "Old Riyadh vs New Riyadh",
    "description": "Compare the old and new parts of Riyadh with someone who just moved there.",
    "focalWordIds": [
      "w_different",
      "w_farq",
      "w_because",
      "w_think",
      "w_although",
      "w_society"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أول مرة أزور الرياض — الفرق بين القديم والجديد كبير؟",
        "translation": "First time visiting Riyadh — is the difference between the old and new parts big?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Describe the contrast:",
        "options": [
          {
            "text": "الفرق كبير جداً — الرياض الجديدة فيها ناطحات سحاب ومراكز تجارية، مقارنة بـ القديمة اللي تحافظ على الطابع الأصيل والأسواق الشعبية",
            "translation": "The difference is very big — new Riyadh has skyscrapers and malls, compared to the old part which preserves the authentic character and traditional markets.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! الفرق + مقارنة بـ + تفاصيل واضحة."
          },
          {
            "text": "كلهم رياض",
            "translation": "It's all Riyadh.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "ما وصفت الفرق الحقيقي."
          },
          {
            "text": "الجديدة أحسن طبعاً",
            "translation": "The new part is better of course.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "رأي بدون وصف أو سبب."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "وش تنصحني أزور أكثر إذا أبغى أفهم الثقافة السعودية الحقيقية؟",
        "translation": "What do you advise me to visit more if I want to understand real Saudi culture?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "وين أروح أفهم الثقافة السعودية؟",
        "translation": "Where do I go to understand Saudi culture?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give a culturally-reasoned recommendation:",
        "options": [
          {
            "text": "في رأيي ابدأ بالدرعية والحي التاريخي لأنهم يعطونك صورة عن المجتمع السعودي الأصيل، مع إن المراكز التجارية الحديثة تفهمك الرياض اليوم كذلك",
            "translation": "In my opinion start with Diriyah and the historic district because they give you a picture of authentic Saudi society, although modern malls also show you today's Riyadh.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! في رأيي + لأن + مع إن — تنصح بالتوازن بين القديم والجديد."
          },
          {
            "text": "روح المول",
            "translation": "Go to the mall.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "ما يعطيك الثقافة الأصيلة وحده."
          },
          {
            "text": "اسأل سعوديين محليين",
            "translation": "Ask local Saudis.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "فكرة جيدة بس ما أجبت على سؤاله بشكل مباشر."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "فكرة ممتازة — أظن إن البداية بالتاريخ تعطيني أساس أفهم فيه الحاضر. شكراً.",
        "translation": "Excellent idea — I think starting with history gives me a foundation to understand the present. Thanks.",
        "end": true
      }
    ],
    "completionMessage": "Great Riyadh comparison with cultural depth and clear reasoning!"
  },
  {
    "id": "saudi_convo_p8_advice_dieting",
    "phase": 8,
    "title": "Should I Start a Diet?",
    "description": "Give honest advice to a friend wanting to start a diet.",
    "focalWordIds": [
      "w_think",
      "w_because",
      "w_better",
      "w_although",
      "w_sabab",
      "w_muhimm"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "قررت أبدأ رجيم صارم من بكرة — أكل خس وماء بس. وش رأيك؟",
        "translation": "I decided to start a strict diet from tomorrow — only lettuce and water. What do you think?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Give your honest reaction:",
        "options": [
          {
            "text": "بصراحة هذا الرجيم خطر لأن جسمك يحتاج بروتين وكربوهيدرات، الرجيم القاسي في الغالب يفشل",
            "translation": "Honestly this diet is dangerous because your body needs protein and carbohydrates, harsh diets usually fail.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! بصراحة + لأن + معلومة علمية — صريح ومبرر."
          },
          {
            "text": "ممتاز، هذا يساعد تنزل وزن بسرعة",
            "translation": "Excellent, this helps you lose weight quickly.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "مشجع على شي ضار — غير صح."
          },
          {
            "text": "أنت تعرف جسمك أحسن مني",
            "translation": "You know your body better than me.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "تهرب من الرأي — هو يحتاج نصيحة صريحة."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "بس أبغى أنزل وزن بسرعة — عندي مناسبة بعد شهر.",
        "translation": "But I want to lose weight quickly — I have an occasion in a month.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "أبغى أنزل وزن قبل المناسبة.",
        "translation": "I want to lose weight before the occasion.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give a better alternative with reasoning:",
        "options": [
          {
            "text": "في رأيي رجيم معتدل مع رياضة أحسن بكثير لأنك تنزل وزن حقيقي وما ترجعه، مقارنة بـ الرجيم القاسي الذي تاخذ الكيلوات ترجع بعده",
            "translation": "In my opinion a moderate diet with exercise is much better because you lose real weight and don't regain it, compared to harsh dieting where the kilos come back afterwards.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! في رأيي + لأن + مقارنة بـ — بديل واضح وعلمي."
          },
          {
            "text": "الرجيم القاسي يشتغل بعض الناس",
            "translation": "Harsh diets work for some people.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "محايد جداً — ما قدمت بديلاً واضحاً."
          },
          {
            "text": "شهر كافٍ لأي رجيم",
            "translation": "A month is enough for any diet.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "مو دقيق — يعتمد على نوع الرجيم."
          },
          {
            "text": "ما تهتم بالوزن",
            "translation": "Don't worry about weight.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "تجاهل قلقه — ما قدمت حلاً."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "والله ما فكرت إن الرجيم القاسي يرجع الوزن — أظن الرياضة مع الأكل الصحي أحسن طريقة. شكراً.",
        "translation": "By God I never thought harsh dieting brings weight back — I think exercise with healthy eating is the best way. Thanks.",
        "end": true
      }
    ],
    "completionMessage": "Excellent diet advice backed by clear reasoning and a healthy alternative!"
  },
  {
    "id": "saudi_convo_p8_compare_traditional_modern",
    "phase": 8,
    "title": "Traditional vs Modern Weddings",
    "description": "Compare traditional and modern Saudi wedding styles.",
    "focalWordIds": [
      "w_different",
      "w_farq",
      "w_because",
      "w_think",
      "w_although",
      "w_society"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أنت تفضل الأفراح التقليدية ولا الحديثة؟",
        "translation": "Do you prefer traditional or modern weddings?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Share your preference with a reason:",
        "options": [
          {
            "text": "أفضل التقليدية لأنها تحافظ على الهوية وتجمع الأهل، مع إن التكلفة تكون أعلى أحياناً",
            "translation": "I prefer traditional because they preserve identity and bring family together, although the cost can be higher sometimes.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! أفضل + لأن + مع إن — رأي متوازن ومبرر."
          },
          {
            "text": "الحديثة أحسن لأنها أرخص",
            "translation": "Modern is better because it's cheaper.",
            "nextStepId": "s3b",
            "correct": false,
            "false": false,
            "feedback": "ليس دائماً — وما ذكرت الجوانب الثقافية."
          },
          {
            "text": "ما أهتم بالأفراح",
            "translation": "I don't care about weddings.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "تهرب — حاول تقول رأيك ولو بسيط."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "بس الأفراح التقليدية فيها تعب كثير للعروسين — وش رأيك في هذا؟",
        "translation": "But traditional weddings are very tiring for the bride and groom — what do you think about this?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "التقليدية ما تعبت من الترتيبات؟",
        "translation": "Didn't the traditional arrangements tire you out?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Balance both perspectives:",
        "options": [
          {
            "text": "صح، الفرق في التعب واضح بس أظن إن اليوم الواحد تعب يستاهل لأن الذكريات تبقى للأبد، مقارنة بـ الحديثة التي تكون أسرع بس أقل عمقاً",
            "translation": "True, the difference in effort is clear but I think one day of effort is worth it because memories last forever, compared to modern which is faster but less deep.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! أظن + لأن + مقارنة بـ — تحليل متوازن يراعي وجهة نظره."
          },
          {
            "text": "التعب طبيعي، تحملوا",
            "translation": "Effort is normal, endure it.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "ما تعاملت مع الحجة بجدية."
          },
          {
            "text": "يمكنون يجمعون التقليدي والحديث",
            "translation": "They can combine traditional and modern.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "فكرة جيدة بس ما أجبت مباشرة على سؤال التعب."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "صح الذكريات أهم — أظن إن المجتمع يتغير وكل جيل يختار ما يناسبه.",
        "translation": "True memories are more important — I think society changes and each generation chooses what suits them.",
        "end": true
      }
    ],
    "completionMessage": "Great wedding comparison balancing tradition and practicality!"
  },
  {
    "id": "saudi_convo_p8_advice_apologizing",
    "phase": 8,
    "title": "How to Apologize Properly",
    "description": "Explain how to give a genuine apology to someone who hurt a colleague.",
    "focalWordIds": [
      "w_think",
      "w_because",
      "w_sabab",
      "w_ghafara",
      "w_maghfira",
      "w_believe"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تصرفت بطريقة غلط مع زميلي وأبغى أعتذر — بس خايف يزيد الموضوع.",
        "translation": "I acted wrongly with my colleague and I want to apologize — but I'm afraid it'll escalate things.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Address the fear first:",
        "options": [
          {
            "text": "الخوف طبيعي، بس في رأيي الاعتذار يخفف التوتر في الغالب لأنه يظهر إنك واعي بغلطتك",
            "translation": "Fear is normal, but in my opinion an apology usually reduces tension because it shows you are aware of your mistake.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز — طمأنته أولاً ثم أعطيت سبباً."
          },
          {
            "text": "ما تعتذر، اتركه هو يعتذر",
            "translation": "Don't apologize, let him be the one to apologize.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "قلت إنه غلط — هذه نصيحة سيئة."
          },
          {
            "text": "التوتر في الشغل طبيعي، تجاهله",
            "translation": "Tension at work is normal, ignore it.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "تجاهل المشكلة لا يحلها."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "كيف أصوغ الاعتذار بشكل صح؟ ما أبغى يبدو شكلي.",
        "translation": "How do I frame the apology properly? I don't want it to seem superficial.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "كيف أعتذر بشكل مقنع؟",
        "translation": "How do I apologize convincingly?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give concrete advice on framing a genuine apology:",
        "options": [
          {
            "text": "أهم شي تذكر الغلطة بالضبط لأن الاعتذار العام ما يقنع أحد — قل له بالضبط وش اللي أخطأت فيه وليش كان غلط",
            "translation": "Most important is to name the exact mistake because a general apology doesn't convince anyone — tell him exactly what you were wrong about and why it was wrong.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "أحسنت! أهم شي + لأن + تعليمات عملية — نصيحة قوية ومحددة."
          },
          {
            "text": "قل له آسف وخلص",
            "translation": "Tell him sorry and that's it.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "اعتذار شكلي بالضبط اللي خشيه — ما بررت."
          },
          {
            "text": "أرسل له هدية بدل الكلام",
            "translation": "Send him a gift instead of talking.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "الهدية مو بديل الكلام الصريح."
          },
          {
            "text": "انتظر حتى يهدى الوضع",
            "translation": "Wait until the situation cools down.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "التأخير يزيد الجرح أحياناً — ما ناسب هنا."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "بصراحة كلامك صح — الاعتذار المحدد أصدق وأقوى. راح أكلمه اليوم وأعتذر له بالضبط عن اللي صار.",
        "translation": "Honestly you're right — a specific apology is more truthful and stronger. I'll talk to him today and apologize exactly about what happened.",
        "end": true
      }
    ],
    "completionMessage": "Excellent advice on genuine apologies — clear, specific, and well-reasoned!"
  },
  {
    "id": "saudi_convo_p10_old_friend_reunion",
    "phase": 10,
    "title": "Old Friend Reunion",
    "description": "You run into a childhood friend you haven't seen in years. Navigate warmth, surprise, and catching up.",
    "focalWordIds": [
      "w_tadhakkara",
      "w_remember",
      "w_zaman",
      "w_friend",
      "w_hayaa",
      "w_wallah",
      "w_khalas",
      "w_yaani"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "والله العظيم! أنت؟ ما صدّقت — كم سنة ما شفناك يا أخي!",
        "translation": "I swear to God! You? I can't believe it — how many years since we've seen you, brother!",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond to your old friend's surprise. Match his warmth.",
        "options": [
          {
            "text": "والله يا عمي! زمان والله، اشتقت لك كثير",
            "translation": "By God, man! It's been ages, I really missed you.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Perfect — زمان والله hits the right register of warm Saudi reunion."
          },
          {
            "text": "أيوه، مرحبا. كيف الحال؟",
            "translation": "Yeah, hi. How are you?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too flat — this is an old friend. A reunion needs more warmth than a passing greeting."
          },
          {
            "text": "نعم، مررت من هنا بالصدفة.",
            "translation": "Yes, I happened to pass by here.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Way too formal and cold. Your friend is overwhelmed with joy — match that energy."
          },
          {
            "text": "هلا هلا! الله يسلمك، ما غيّرت أبد!",
            "translation": "Hey hey! God keep you safe, you haven't changed at all!",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Excellent — هلا هلا and the compliment land beautifully for a reunion."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ابن الواوي! كأنها بالأمس لما كنّا نلعب في الحارة. وين صرت هالأيام؟",
        "translation": "Jackpot! It's like yesterday when we used to play in the neighbourhood. Where have you been these days?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Tell him briefly where life has taken you.",
        "options": [
          {
            "text": "الرياض، شغل وعيلة، خلاص يعني — الحياة مشت",
            "translation": "Riyadh, work and family, that's it really — life moved on.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "خلاص يعني is exactly right here — resigned, warm, real."
          },
          {
            "text": "انتقلت إلى الرياض للعمل منذ خمس سنوات.",
            "translation": "I moved to Riyadh for work five years ago.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Too formal — this is your childhood friend, not an HR interview."
          },
          {
            "text": "ما تسأل، يا عمي. السفر والشغل أكلوا العمر.",
            "translation": "Don't ask, man. Travel and work ate up the years.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Natural and idiomatic — ما تسأل is a perfect opener for life stories."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الله يعين. أنا كذلك، ما بقي وقت لشي. بس على بال الأيام القديمة دايماً في القلب.",
        "translation": "God help us. Me too, no time for anything anymore. But those old days are always on the heart.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "He mentions the old days are always on his heart. Respond genuinely.",
        "options": [
          {
            "text": "صحيح، الذكريات ما تموت أبداً.",
            "translation": "True, memories never die.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Simple and heartfelt — fits the mood perfectly."
          },
          {
            "text": "على بال — تلك الأيام لن تعود.",
            "translation": "On the heart — those days won't come back.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Too melancholic and stiff. You're celebrating the reunion, not mourning the past."
          },
          {
            "text": "إي والله، يا ريت نرجع لتلك الأيام. ما كان فيها هموم.",
            "translation": "Yes by God, if only we could go back. No worries back then.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "يا ريت lands beautifully — nostalgic, warm, and very Saudi."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "تعال نتغدى سوا اليوم، ما أقبل عذر. اتصل على شلّتنا القديمة كذلك!",
        "translation": "Come, let's have lunch together today — I won't accept any excuse. Call the old gang too!",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Accept his invitation warmly.",
        "options": [
          {
            "text": "حاضر يا عمي، ما يهمّك — أنا معاك.",
            "translation": "Ready, man — don't worry about it, I'm with you.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "ما يهمّك is perfect here — a warm, committed acceptance."
          },
          {
            "text": "نعم، سأحضر إذا كان لدي وقت.",
            "translation": "Yes, I'll come if I have time.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "Too conditional and formal. Your old friend just said he won't accept excuses — don't give him one."
          },
          {
            "text": "زين، بس لا تتأخر عليّ.",
            "translation": "Fine, but don't be late on me.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "Wrong tone entirely — he's inviting you, not the other way around."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "الله يخليك! خلاص يعني، اليوم نكمّل الذكريات. زمان ما اجتمعنا كذا.",
        "translation": "God keep you! That's it then, today we complete the memories. It's been forever since we gathered like this.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You navigated a warm Saudi reunion with the right idioms, tone, and code-switching. ابن الواوي!"
  },
  {
    "id": "saudi_convo_p10_argue_with_brother",
    "phase": 10,
    "title": "Argue With Your Brother",
    "description": "A heated but loving argument with your older brother over a decision you've made.",
    "focalWordIds": [
      "w_brother",
      "w_opinion",
      "w_think",
      "w_because",
      "w_haqq",
      "w_wallah",
      "w_khalas",
      "w_angry"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أنت مجنون ولا إيش؟ كيف تقدر تترك الشغل بدون ما تشاورني؟!",
        "translation": "Are you crazy or what? How can you leave the job without consulting me?!",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Defend yourself without being disrespectful to your older brother.",
        "options": [
          {
            "text": "يا أخي، أنا كبرت. قراري قراري، ما عندك دعوة.",
            "translation": "Brother, I'm grown up. My decision is my decision, it's none of your business.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too sharp and dismissive — with an older brother, you can assert yourself without cutting him off completely."
          },
          {
            "text": "والله يا أخوي، ما قدرت أكمل هناك — حاولت أصبر وما قدرت.",
            "translation": "By God, brother, I couldn't continue there — I tried to be patient and couldn't.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Good — والله يا أخوي opens with warmth while still being honest."
          },
          {
            "text": "هذا الأمر لا يعنيك على الإطلاق.",
            "translation": "This matter doesn't concern you at all.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Way too cold and formal. This is your brother — even in argument, family bonds require softer framing."
          },
          {
            "text": "سامعني يا أخوي، الوضع ما كان يطاق. ما بخبّرك؟",
            "translation": "Hear me out, brother — the situation was unbearable. Wasn't I going to tell you?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Perfect — سامعني asserts yourself while keeping the door open."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ما بخبّرني؟! أنا أخوك الكبير — مسؤوليتي عليك. كان لازم تجي عندي أول.",
        "translation": "You weren't going to tell me?! I'm your older brother — I'm responsible for you. You should have come to me first.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Acknowledge his concern without fully backing down.",
        "options": [
          {
            "text": "أعرف يا أخوي، وأنا أقدّر هذا. بس أحياناً الإنسان يحتاج يقرر لحاله.",
            "translation": "I know, brother, and I appreciate that. But sometimes a person needs to decide for himself.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Balanced and mature — you honour his role while asserting your autonomy."
          },
          {
            "text": "أنت مو مسؤول عني. أنا ما طفل.",
            "translation": "You're not responsible for me. I'm not a child.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Too aggressive — you're escalating rather than resolving. Wrong tone for a family argument that should end with reconciliation."
          },
          {
            "text": "معك حق، كان يجب أن أستشيرك أولاً.",
            "translation": "You're right, I should have consulted you first.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "You're caving completely — this kills the honest dialogue. Stand your ground with warmth."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "والله العظيم ما أزعل عليك، بس يؤلمني لما أشوف أخوي يتعب بصمت.",
        "translation": "I swear to God I'm not angry at you, but it hurts me when I see my brother struggling in silence.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "The argument is softening. Reach toward him.",
        "options": [
          {
            "text": "يا أخوي، والله ما قصّدت أذيّك. أنت أهم واحد عندي.",
            "translation": "Brother, by God I didn't mean to hurt you. You're the most important person to me.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "This is the right move — vulnerability at the right moment resolves family conflict."
          },
          {
            "text": "خلاص يعني، انتهى الموضوع. نتكلم بعدين.",
            "translation": "That's it, topic's over. We'll talk later.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "You're shutting the door just as it opened. خلاص here is avoidance, not resolution."
          },
          {
            "text": "إذا كنت تزعل، فأنا آسف.",
            "translation": "If you're upset, then I'm sorry.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "A conditional apology is not an apology. It sounds defensive, not warm."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "خلاص يعني، أنا معك مهما كان. بس المرة الجاية — كلّمني أول. ما يهمّك، نحلّها سوا.",
        "translation": "Alright then, I'm with you no matter what. But next time — call me first. Don't worry, we'll solve it together.",
        "end": true
      }
    ],
    "completionMessage": "You handled a charged family argument with the right blend of assertion and warmth. حق وصدق!"
  },
  {
    "id": "saudi_convo_p10_grandfather_story",
    "phase": 10,
    "title": "Grandfather's Story",
    "description": "Your grandfather is sharing a story from the old days. Show the right respect and curiosity.",
    "focalWordIds": [
      "w_tadhakkara",
      "w_history",
      "w_zaman",
      "w_remember",
      "w_hikma",
      "w_wallah",
      "w_inshallah"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "يا ولدي، أنتم ما تعرفون كيف كانت الحياة. زمان، الإنسان يمشي على رجليه من بلد لبلد.",
        "translation": "My son, you all don't know what life was like. In the old days, a man would walk on foot from town to town.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond with genuine interest and respect.",
        "options": [
          {
            "text": "والله يا جدّي، هذا شي ما نتصوّره اليوم. كيف تحمّلتم؟",
            "translation": "By God, grandfather, that's something we can't imagine today. How did you endure it?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Perfect — يا جدّي and the follow-up question shows respectful engagement."
          },
          {
            "text": "آه، أعرف. قرأت عن ذلك في المدرسة.",
            "translation": "Ah, I know. I read about that in school.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "You're deflecting to your own knowledge instead of honouring his lived experience."
          },
          {
            "text": "نعم، ذلك كان في زمن ما قبل التطور.",
            "translation": "Yes, that was in the pre-development era.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too clinical and detached — your grandfather is sharing his soul, not a history lecture."
          },
          {
            "text": "سبحان الله يا جدّي، حدّثني أكثر.",
            "translation": "Glory to God, grandfather, tell me more.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "سبحان الله is a natural reverent response here, and asking for more is exactly right."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الصبر يا ولدي. كانت الحياة صعبة، لكن كانت فيها بركة ما نشوفها اليوم.",
        "translation": "Patience, my son. Life was hard, but it had a blessing we don't see today.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask about that blessing without sounding dismissive of the present.",
        "options": [
          {
            "text": "إيش تقصد بالبركة يا جدّي؟ وضّح لي.",
            "translation": "What do you mean by blessing, grandfather? Explain it to me.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Direct but respectful — وضّح لي invites without pressing."
          },
          {
            "text": "بس الحياة اليوم أحسن بكثير يا جدّي.",
            "translation": "But life today is much better, grandfather.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "You're contradicting your grandfather mid-story. Wrong moment — listen first."
          },
          {
            "text": "يمكن البركة في البساطة والقناعة؟",
            "translation": "Maybe the blessing is in simplicity and contentment?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Thoughtful — you're offering a reflection, not cutting him off."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "على بال يا ولدي — البركة في أننا كنّا نعرف قيمة الشي لما نأخذه بتعب.",
        "translation": "Exactly, my son — the blessing was that we knew the value of something when we earned it through hardship.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Draw a connection between his wisdom and your life today.",
        "options": [
          {
            "text": "والله يا جدّي، هذي الحكمة أحتاجها في حياتي كل يوم.",
            "translation": "By God, grandfather, I need this wisdom in my life every day.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Beautifully connects his wisdom to your present — this is what he wants to hear."
          },
          {
            "text": "نعم، الاقتصاديون يسمّون هذا 'نظرية القيمة'.",
            "translation": "Yes, economists call this the 'theory of value'.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "You just turned his wisdom into an academic footnote. Wrong register entirely."
          },
          {
            "text": "شكراً يا جدّي على الكلام الحلو.",
            "translation": "Thank you grandfather for the kind words.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Too dismissive — 'kind words' undersells his lived testimony."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "إن شاء الله تنتفع يا ولدي. كلام الكبار ما يضيع — خزّنه في قلبك.",
        "translation": "God willing, may you benefit, my son. The words of elders don't go to waste — store them in your heart.",
        "end": true
      }
    ],
    "completionMessage": "You showed the right balance of deference, curiosity and genuine engagement. الله يحفظه!"
  },
  {
    "id": "saudi_convo_p10_career_doubts",
    "phase": 10,
    "title": "Career Doubts",
    "description": "A late-night conversation with a close friend about whether you're on the right path.",
    "focalWordIds": [
      "w_fakkara",
      "w_fikra",
      "w_job",
      "w_doubt",
      "w_nafs",
      "w_wallah",
      "w_yaani",
      "w_khalas"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أنت زين؟ شايفك مو بنفسك الليلة.",
        "translation": "Are you okay? I can see you're not yourself tonight.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Open up honestly to your close friend.",
        "options": [
          {
            "text": "والله يا عمي، ما أعرف إذا الشغل الي فيه هو اللي أبيه أصلاً.",
            "translation": "By God, man, I don't know if the job I'm in is what I actually want.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Honest and natural — والله يا عمي is the right opener for a vulnerable admission."
          },
          {
            "text": "لا، أنا بخير تماماً. شكراً.",
            "translation": "No, I'm completely fine. Thanks.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "You're shutting your friend out when he's checking on you. Wrong move."
          },
          {
            "text": "أعاني من بعض التساؤلات المهنية.",
            "translation": "I'm experiencing some professional questioning.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too formal — this is a friend, not your therapist's intake form."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "يعني إيش؟ وضّح لي — إيش الي ما عاجبك؟",
        "translation": "Meaning what? Be clear with me — what is it that you don't like?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Explain the deeper feeling.",
        "options": [
          {
            "text": "ما يهمّني الراتب ولا المنصب — أبي أحس إن شغلي بيفرّق.",
            "translation": "The salary and title don't matter to me — I want to feel my work makes a difference.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Excellent — ما يهمّني is used perfectly here, showing what really counts."
          },
          {
            "text": "الراتب ضعيف والبيئة سيئة.",
            "translation": "The salary is weak and the environment is bad.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Legitimate concerns, but too shallow for a deep existential conversation — you're describing symptoms, not the wound."
          },
          {
            "text": "أشعر أن هذه المسيرة المهنية لا تتوافق مع قيمي.",
            "translation": "I feel this career path doesn't align with my values.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "MSA in a late-night friend chat — the register is off. Too stiff for this moment."
          },
          {
            "text": "خلاص يعني — كل يوم أصحى وما عندي سبب أروح.",
            "translation": "That's just it — every day I wake up with no reason to go.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "خلاص يعني captures the resignation perfectly — raw and real."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "ابن الواوي، هذا الكلام مهم. الواحد لازم يعيش بقلب مرتاح.",
        "translation": "Man, this is important. A person has to live with a settled heart.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Acknowledge his point but voice your fear of change.",
        "options": [
          {
            "text": "صح، بس الخوف يا عمي — العيلة، الفلوس، المسؤوليات.",
            "translation": "True, but the fear, man — family, money, responsibilities.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Real and vulnerable — names the actual obstacles without self-pity."
          },
          {
            "text": "نعم لكنّ التغيير المهني ينطوي على مخاطر كبيرة.",
            "translation": "Yes but professional change entails significant risks.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Too corporate — you're talking to your best friend, not writing a risk assessment."
          },
          {
            "text": "أوافقك الرأي. سأستقيل غداً.",
            "translation": "I agree with you. I'll resign tomorrow.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Overcorrection — jumping to a snap decision undermines the authenticity of the conversation."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "ما يهمّك — فكّر بهدوء، وأنا معك مهما قررت. الحياة مو سباق.",
        "translation": "Don't worry — think calmly, and I'm with you whatever you decide. Life isn't a race.",
        "end": true
      }
    ],
    "completionMessage": "You opened up with the right tone and vocabulary. ما يهمّك — that's real friendship."
  },
  {
    "id": "saudi_convo_p10_apology_serious",
    "phase": 10,
    "title": "A Serious Apology",
    "description": "You wronged a close friend seriously. This is the conversation where you own it fully.",
    "focalWordIds": [
      "w_ghafara",
      "w_maghfira",
      "w_haqq",
      "w_wallah",
      "w_qalb",
      "w_nafs",
      "w_friend"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تكلّم. جيت تقول إيش؟",
        "translation": "Speak. What did you come to say?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Open your apology. This is a serious moment — own it fully.",
        "options": [
          {
            "text": "جيت أعتذر. والله العظيم ما قصّدت أأذيك، وأعرف إن كلامي كان غلط.",
            "translation": "I came to apologise. I swear to God I didn't mean to hurt you, and I know what I said was wrong.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "والله العظيم carries real weight here — it signals sincerity, not just words."
          },
          {
            "text": "آسف إذا شعرت بشيء.",
            "translation": "Sorry if you felt something.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "A conditional non-apology. 'If you felt something' puts the blame on his sensitivity, not your actions."
          },
          {
            "text": "أعتذر رسمياً عمّا صدر مني.",
            "translation": "I formally apologise for what came from me.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too formal and detached — رسمياً signals bureaucracy, not genuine remorse."
          },
          {
            "text": "أنا آسف. ما أبي أخسرك.",
            "translation": "I'm sorry. I don't want to lose you.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Simple and direct — ما أبي أخسرك is vulnerable and real."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "كلمتني أمام الكل بطريقة ما توصف. تحسب هذا ينحل بكلمة؟",
        "translation": "You spoke to me in front of everyone in an indescribable way. You think this resolves with one word?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "He's right to be hurt. Acknowledge the depth of what you did.",
        "options": [
          {
            "text": "ما أبي أبرّر. اللي سوّيته غلط وما أقبل عذر لنفسي.",
            "translation": "I don't want to justify it. What I did was wrong and I won't excuse myself.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "This is the gold standard — no justifications, full accountability."
          },
          {
            "text": "كنت متوتراً في ذلك اليوم. أملي تفهم.",
            "translation": "I was stressed that day. I hope you understand.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "You're explaining, which is a subtle form of justification. He doesn't owe you understanding right now."
          },
          {
            "text": "نعم، الاعتراف بالخطأ فضيلة.",
            "translation": "Yes, acknowledging a mistake is a virtue.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "You just quoted a proverb instead of apologising. Wrong move."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "يعني إيش تبي مني الحين؟",
        "translation": "So what do you want from me now?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Don't demand forgiveness. Ask humbly.",
        "options": [
          {
            "text": "ما أطلب منك شي — بس أبيك تعرف إني آسف من قلبي.",
            "translation": "I'm not asking you for anything — I just want you to know I'm sorry from my heart.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Perfect — you're not transacting forgiveness, you're offering genuine remorse."
          },
          {
            "text": "أبيك تسامحني. نحن أصدقاء.",
            "translation": "I want you to forgive me. We're friends.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Invoking the friendship as leverage is manipulative. He gets to decide the pace of forgiveness."
          },
          {
            "text": "أريد أن تمنحني فرصة ثانية.",
            "translation": "I want you to give me a second chance.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Too transactional and formal — you're presenting terms, not making a human appeal."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "الله يغفر لنا جميعاً. محتاج وقت — بس أنا ما نسيت إنك صاحبي.",
        "translation": "May God forgive us all. I need time — but I haven't forgotten you're my friend.",
        "end": true
      }
    ],
    "completionMessage": "You navigated a difficult apology with the sincerity and humility it deserved. الله يغفر ويصلح."
  },
  {
    "id": "saudi_convo_p10_intellectual_debate",
    "phase": 10,
    "title": "Intellectual Debate",
    "description": "A sharp debate about tradition versus modernity with an educated peer.",
    "focalWordIds": [
      "w_opinion",
      "w_debate",
      "w_culture",
      "w_think",
      "w_because",
      "w_ikhtalafa",
      "w_although",
      "w_society"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "التراث في رأيي عبء أكثر من كونه قيمة — الأمم التي تقدّمت تخلّت عنه إلى حدٍّ كبير.",
        "translation": "Heritage in my view is more of a burden than a value — the nations that advanced largely abandoned it.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Challenge this view with substance and confidence.",
        "options": [
          {
            "text": "هذا الكلام فيه مغالطة — التقدم الياباني والكوري بُني على هوية راسخة، مو على محو الهوية.",
            "translation": "This argument contains a fallacy — Japanese and Korean advancement was built on a firm identity, not the erasure of identity.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Strong counter with a concrete example — exactly the right move in an intellectual debate."
          },
          {
            "text": "لا أوافقك الرأي. التراث مهم.",
            "translation": "I disagree with you. Heritage is important.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too flat — you're asserting without arguing. In a debate, you need to show your reasoning."
          },
          {
            "text": "والله ما تكلمت في هذا الموضوع من قبل.",
            "translation": "By God I haven't spoken about this topic before.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Deflection is not debate. Engage the argument."
          },
          {
            "text": "أنت تخلط بين التراث والتخلف — ليسا مترادفَين.",
            "translation": "You're confusing heritage with backwardness — they're not synonyms.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Sharp and clear — identifies the conceptual error in his framing."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "نقطة وجيهة. لكن ألا ترى أن كثيراً من التقاليد تُقيّد حرية الفرد؟",
        "translation": "A valid point. But don't you see that many traditions constrain individual freedom?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Acknowledge the valid part while pushing back on the overgeneralization.",
        "options": [
          {
            "text": "صح في بعض الحالات — بس الحل تصفية التراث مو هدمه. ابن الواوي مو كل تراث مقيّد.",
            "translation": "True in some cases — but the solution is refining heritage, not demolishing it. Come on, not all heritage is restrictive.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Code-switching and the nuanced concession-then-push is perfect debating."
          },
          {
            "text": "نعم، التراث يقيّد الحرية الفردية دائماً.",
            "translation": "Yes, heritage always constrains individual freedom.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "You just agreed with him completely — no point debating if you concede everything."
          },
          {
            "text": "الحرية الفردية مفهوم غربي لا ينطبق على مجتمعاتنا.",
            "translation": "Individual freedom is a Western concept that doesn't apply to our societies.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "A dismissive non-argument — you're shutting down the discussion rather than engaging it."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "التصفية — من يحدّدها؟ من يملك سلطة تقرير ما يبقى وما يُلغى؟",
        "translation": "Refinement — who defines it? Who holds the authority to decide what stays and what is cancelled?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "This is the sharpest question in the debate. Engage it seriously.",
        "options": [
          {
            "text": "سؤال ذكي. ربما المجتمع نفسه عبر نقاش مستمر — ما في جهة واحدة تملك هذا الحق.",
            "translation": "Sharp question. Perhaps society itself through ongoing debate — no single party holds this right.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Excellent — you acknowledge the weight of the question and give a thoughtful democratic answer."
          },
          {
            "text": "العلماء والمختصون هم من يقرّرون.",
            "translation": "Scholars and specialists are the ones who decide.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "An elitist answer that ignores the power-dynamics problem he just raised."
          },
          {
            "text": "هذا سؤال فلسفي ما له جواب.",
            "translation": "That's a philosophical question with no answer.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Conceding the debate by declaring it unanswerable. Don't give up."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "إذن نتّفق أن القضية أعمق من ثنائية تراث ومعاصرة. الحوار نفسه هو الإجابة.",
        "translation": "Then we agree that the issue is deeper than the binary of heritage versus modernity. The dialogue itself is the answer.",
        "end": true
      }
    ],
    "completionMessage": "A masterful intellectual exchange. You argued with rigour, acknowledged valid points, and kept the dialogue alive."
  },
  {
    "id": "saudi_convo_p10_family_disagreement",
    "phase": 10,
    "title": "Family Disagreement",
    "description": "A tense disagreement with your mother about a major life decision.",
    "focalWordIds": [
      "w_mother",
      "w_haqq",
      "w_think",
      "w_because",
      "w_wallah",
      "w_inshallah",
      "w_qalb"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "ما أقدر أصدّق إنك تفكر بهذا — إيش رأي أبوك؟",
        "translation": "I can't believe you're thinking about this — what's your father's opinion?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond calmly but stand your ground.",
        "options": [
          {
            "text": "يا أمي، أبوي عارف وهو معي. بس هذا قراري أنا في النهاية.",
            "translation": "Mama, dad knows and he's with me. But this is ultimately my decision.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Good — you're reassuring her without surrendering your autonomy."
          },
          {
            "text": "هذا لا يخصّ أبوي.",
            "translation": "This doesn't concern dad.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too sharp — you're cutting the family out instead of bringing them in."
          },
          {
            "text": "والله يا أمي أنا خايف أذيّ مشاعرك، بس لازم أكون صريح.",
            "translation": "By God, mama, I'm scared to hurt your feelings, but I need to be honest.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Vulnerability with honesty — the right combo when disagreeing with a parent."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "يعني قرارك أهم من راحة البال؟ من صغيرك حتى الكبر — من تعبت عليك؟",
        "translation": "So your decision matters more than peace of mind? From childhood to adulthood — who put in the effort for you?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "She's invoking her sacrifice. Honour it without giving in to guilt.",
        "options": [
          {
            "text": "والله ما أنكر تعبك أبداً يا أمي — وهذا اللي يخلّيني أبي أكون صادق معك.",
            "translation": "By God, I'd never deny your effort, mama — and that's exactly what makes me want to be honest with you.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Brilliant reframe — her sacrifice becomes the reason for honesty, not submission."
          },
          {
            "text": "أنا ممتنّ لكل شيء، لكن هذا لا يعني أنّ حياتي ملكك.",
            "translation": "I'm grateful for everything, but that doesn't mean my life belongs to you.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "True, but brutally blunt with a mother. The sentiment is right but the delivery cuts too deep."
          },
          {
            "text": "معك حق يا أمي. سأتراجع عن قراري.",
            "translation": "You're right, mama. I'll reverse my decision.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "You're capitulating out of guilt, not conviction. That helps no one."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "صادق؟ الصدق إنك تسمع كلام أمك وتتريّث.",
        "translation": "Honest? Honesty means you listen to your mother and take your time.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Find the middle ground she needs to hear.",
        "options": [
          {
            "text": "زين يا أمي — والله ما أبي أتسرّع. أعطيني أسبوع أفكّر وبعدين نتكلم سوا.",
            "translation": "Okay, mama — by God I don't want to rush. Give me a week to think and then we'll talk together.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "خلاص يعني-style resolution — not surrender, but a genuine pause that respects her concern."
          },
          {
            "text": "حسناً، سأفكّر في الأمر.",
            "translation": "Fine, I'll think about it.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Too flat and dismissive — she'll hear this as brushing her off."
          },
          {
            "text": "ما يهمّك يا أمي، كل شي بيكون تمام.",
            "translation": "Don't worry, mama, everything will be fine.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "You're closing the conversation rather than opening a real dialogue."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "الله يهديك يا ولدي. أنا ما أريد إلا خيرك، وأنت تعرف هذا.",
        "translation": "May God guide you, my child. I want nothing but the best for you, and you know that.",
        "end": true
      }
    ],
    "completionMessage": "You navigated a charged family disagreement with love and clarity. الله يحفظ الأمهات."
  },
  {
    "id": "saudi_convo_p10_break_bad_news",
    "phase": 10,
    "title": "Breaking Bad News",
    "description": "You must deliver painful news to a close friend about someone they love.",
    "focalWordIds": [
      "w_khabar",
      "w_news",
      "w_qalb",
      "w_mawt",
      "w_wallah",
      "w_inshallah",
      "w_sabab"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "إيش فيك؟ وجهك ما يشبه وجهك.",
        "translation": "What's wrong with you? Your face doesn't look like yourself.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Prepare him gently before sharing the news.",
        "options": [
          {
            "text": "اقعد معي يا عمي. عندي خبر ما سهل.",
            "translation": "Sit with me, man. I have some difficult news.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Gentle preparation before delivery — the right way to break bad news."
          },
          {
            "text": "أخوك في المستشفى.",
            "translation": "Your brother is in the hospital.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Dropping the news cold without any preparation. Too harsh."
          },
          {
            "text": "لا شيء. بس أنا تعبان شوي.",
            "translation": "Nothing. I'm just a little tired.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Hiding the news doesn't help anyone — you came to tell him, so tell him with care."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "إيش؟ قوللي — خوّفتني.",
        "translation": "What? Tell me — you scared me.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Deliver the news with compassion.",
        "options": [
          {
            "text": "والله يا عمي، الله يصبّرك — عمّك ابو ناصر توفّي الفجر اليوم.",
            "translation": "By God, man, may God grant you patience — your uncle Abu Nasser passed away this morning at dawn.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "الله يصبّرك before the news is the traditional and deeply human Saudi way to deliver this."
          },
          {
            "text": "للأسف، عمّك فارق الحياة اليوم.",
            "translation": "Unfortunately, your uncle departed life today.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "The MSA framing feels clinical in this intimate moment. Warmth is needed."
          },
          {
            "text": "عمّك توفّي — اتصلت أمك قبل شوي.",
            "translation": "Your uncle passed away — your mother called a little while ago.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "No buffer, no دعاء — dropping the news like a fact, not news about someone he loves."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "إنّا لله... — والله ما صدّقت. متى؟",
        "translation": "Surely we belong to God... — by God I can't believe it. When?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Answer gently and stay present with him.",
        "options": [
          {
            "text": "الفجر. كان نايم — الله يرحمه، ما تعذّب.",
            "translation": "At dawn. He was sleeping — may God have mercy on him, he didn't suffer.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "The detail about not suffering is a gift of comfort. الله يرحمه is essential."
          },
          {
            "text": "قبل ثلاث ساعات تقريباً.",
            "translation": "About three hours ago.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Technically correct but emotionally empty — no dua, no comfort."
          },
          {
            "text": "ما أعرف بالضبط.",
            "translation": "I don't know exactly.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Unhelpful and distancing when your friend needs presence, not vagueness."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "الله يرحمه ويغفر له. شكراً إنك جيت تقوللي بنفسك — هذا ما نسّيته.",
        "translation": "May God have mercy on him and forgive him. Thank you for coming to tell me yourself — I won't forget this.",
        "end": true
      }
    ],
    "completionMessage": "You delivered painful news with the care and presence it deserves. الله يرحم الجميع."
  },
  {
    "id": "saudi_convo_p10_persuade_father",
    "phase": 10,
    "title": "Persuading Your Father",
    "description": "You want your father's blessing for a bold career move. Navigate his concerns with respect.",
    "focalWordIds": [
      "w_father",
      "w_think",
      "w_fikra",
      "w_haqq",
      "w_wallah",
      "w_inshallah",
      "w_because",
      "w_sabab"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تقدر تقنعني بأي حجة إنك تترك الوظيفة الحكومية؟ الأمان يا ولد.",
        "translation": "Can you convince me with any argument that you should leave the government job? Security, son.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Open your case with respect and substance.",
        "options": [
          {
            "text": "يا أبوي، الأمان المادي مهم — بس الأمان النفسي أهم. وأنا هناك ما عندي الثاني.",
            "translation": "Father, financial security matters — but psychological security matters more. And I don't have the second one there.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "A structured, respectful argument that honours his concern while introducing your own."
          },
          {
            "text": "المشاريع الخاصة أفضل بكثير من الحكومة.",
            "translation": "Private ventures are much better than government.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too blunt a counter to a traditional father — you need to earn the right to say that, not open with it."
          },
          {
            "text": "أبوي، الزمن تغيّر — الوظيفة الحكومية ما هي ضمان اليوم.",
            "translation": "Father, times have changed — government employment is no longer a guarantee today.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Smart — you use a factual framing he can't dismiss, not just your personal preference."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "الأمان النفسي؟ الجوع ما يرحم يا ولد — سأل الناس اللي جرّبوا.",
        "translation": "Psychological security? Hunger shows no mercy, son — ask the people who've tried it.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Show him you've done the groundwork, not just dreaming.",
        "options": [
          {
            "text": "أنا ما أتكلم من فراغ يا أبوي — عندي عملاء محتملين وخطة وتدفق نقدي يكفي ستة أشهر.",
            "translation": "I'm not speaking from thin air, father — I have potential clients, a plan, and cash flow for six months.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Concrete data kills vague fear — this is exactly what a cautious father needs to hear."
          },
          {
            "text": "أنا واثق بنفسي يا أبوي. الله يفتح.",
            "translation": "I'm confident in myself, father. God will provide.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Faith without preparation isn't reassuring — it confirms his worst fear that you're being reckless."
          },
          {
            "text": "سأقبل المخاطرة لأن الفرصة لن تعود.",
            "translation": "I'll accept the risk because the opportunity won't return.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "FOMO framing won't persuade a father — he needs methodical reassurance, not urgency."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "ستة أشهر؟ وبعدين إيش إذا ما نجح الشغل؟",
        "translation": "Six months? And then what if the business doesn't succeed?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Address the failure scenario honestly.",
        "options": [
          {
            "text": "إذا فشلت — والله ما هو الخيار الأسوأ في الدنيا — أرجع للسوق وعندي خبرة أكثر.",
            "translation": "If I fail — by God it's not the worst thing in the world — I return to the market with more experience.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Naming failure without fear is mature and reassuring — it shows you've thought this through."
          },
          {
            "text": "مو راح أفشل يا أبوي.",
            "translation": "I'm not going to fail, father.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Overconfidence. No father trusts this — every entrepreneur who failed said the same thing."
          },
          {
            "text": "إن شاء الله ما يحصل هذا.",
            "translation": "God willing that won't happen.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Deflecting to faith without a real plan doesn't address his concern."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "والله الله يوفّقك يا ولدي. بس وعدني — ما تتفاجأ الناس، واللي تسوّيه اعمله بطريقة صحيحة.",
        "translation": "By God, may God grant you success, my son. But promise me — don't surprise people, and whatever you do, do it the right way.",
        "end": true
      }
    ],
    "completionMessage": "You earned your father's blessing through preparation, honesty, and respect. الله يوفّقك!"
  },
  {
    "id": "saudi_convo_p10_decline_marriage_proposal",
    "phase": 10,
    "title": "Declining a Marriage Proposal",
    "description": "You must decline a marriage proposal gracefully while preserving everyone's dignity.",
    "focalWordIds": [
      "w_haqq",
      "w_qalb",
      "w_think",
      "w_wallah",
      "w_inshallah",
      "w_because",
      "w_nafs"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "العيلة كلها متحمّسة — والله ما نقدر نتخيّل أحسن منك. إيش ردّك؟",
        "translation": "The whole family is excited — by God we can't imagine anyone better than you. What's your answer?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond with warmth before declining.",
        "options": [
          {
            "text": "والله يشرّفني الكلام هذا — وأقدّر ثقتكم. بس لازم أكون صريح معكم.",
            "translation": "By God these words honour me — and I value your trust. But I must be honest with you.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Perfect opener — gratitude before honesty preserves everyone's dignity."
          },
          {
            "text": "لا. شكراً على العرض.",
            "translation": "No. Thank you for the offer.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too abrupt — this is a family matter that deserves warmth and care, not a business rejection."
          },
          {
            "text": "سأحتاج إلى مزيد من الوقت للتفكير.",
            "translation": "I'll need more time to think.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "If you already know your answer, stalling gives false hope — that's unkind."
          },
          {
            "text": "يا شيخ، شرفتوني — بس قلبي ما فيه استعداد الحين.",
            "translation": "Truly you've honoured me — but my heart isn't ready right now.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Warm and honest — leading with the heart is respected in this kind of conversation."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "كلام صريح نقدّره. إيش المانع إذا جاز السؤال؟",
        "translation": "We appreciate the honesty. What's the obstacle, if we may ask?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Explain without shaming anyone.",
        "options": [
          {
            "text": "ما فيه مانع من جهتكم أبداً — الأمر عندي أنا. ما أقدر أدخل في ارتباط وقلبي مو معه.",
            "translation": "There's no obstacle from your side at all — the matter is with me. I can't enter a commitment when my heart isn't in it.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Taking full ownership protects the other party's honour completely."
          },
          {
            "text": "الفتاة ما تناسبني.",
            "translation": "The girl doesn't suit me.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Too direct about the other person — this shames them. Keep it about yourself."
          },
          {
            "text": "ظروف الحياة صعبة الآن ومالياً لست مستعداً.",
            "translation": "Life circumstances are difficult now and financially I'm not ready.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Hiding behind a practical excuse when the real answer is emotional — not fully honest, and leaves the door open."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "نفهم. الإنسان لازم يكون مقتنع — والله اللي يكتبه الله يجي.",
        "translation": "We understand. A person must be convinced — by God what God writes will come.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Close with warmth and a dua.",
        "options": [
          {
            "text": "الله يكرمكم ويرزقها بأحسن مني — والله ما أشكّ في قيمتها.",
            "translation": "May God honour you and bless her with better than me — by God I don't doubt her worth.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "A generous closing dua that lifts everyone. This is the mark of character."
          },
          {
            "text": "شكراً على تفهّمكم.",
            "translation": "Thank you for your understanding.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Too clinical for a family moment — a warm دعاء is expected here."
          },
          {
            "text": "إن شاء الله كل شيء سيسير على ما يرام.",
            "translation": "God willing everything will go well.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "A generic placeholder — show genuine care for the other family's wellbeing."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "الله يعوّضها خير. ولا في حالك — إنت كذلك تستاهل اللي يسعدك.",
        "translation": "May God compensate her with goodness. And be well — you too deserve what makes you happy.",
        "end": true
      }
    ],
    "completionMessage": "You declined with grace, warmth, and full respect for everyone's dignity. ما شاء الله."
  },
  {
    "id": "saudi_convo_p10_consult_imam",
    "phase": 10,
    "title": "Consulting the Imam",
    "description": "You seek religious and personal guidance from the mosque imam on a difficult moral question.",
    "focalWordIds": [
      "w_iimaan",
      "w_haqq",
      "w_hikma",
      "w_wallah",
      "w_inshallah",
      "w_hada",
      "w_ghafara"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تفضّل يا ولدي — ما يجيب الإنسان عند الشيخ إلا شي يثقّل القلب.",
        "translation": "Come in, my son — nothing brings a person to the sheikh except something that weighs on the heart.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Open with respect and a brief framing of your question.",
        "options": [
          {
            "text": "صحيح يا شيخنا — عندي موضوع حيّرني وخفت أقرر بدون ما أستشير.",
            "translation": "True, our sheikh — I have a matter that confused me and I was afraid to decide without consulting.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Respectful and humble — exactly the right register for consulting a religious authority."
          },
          {
            "text": "عندي سؤال شرعي.",
            "translation": "I have a legal question.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too clinical and transactional. The imam opened warmly — match his register."
          },
          {
            "text": "أريد معرفة الحكم الشرعي في مسألة معيّنة.",
            "translation": "I want to know the religious ruling in a specific matter.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Formal MSA framing when the imam used a warm, pastoral tone. Read the room."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "حيّاك الله. تكلّم بلا خجل — ما في سؤال يُعاب على من أراد الحق.",
        "translation": "God bless you. Speak without shame — there is no question that reproaches one who seeks the truth.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Describe your moral dilemma.",
        "options": [
          {
            "text": "يا شيخنا، عندي صاحب يغشّ في شغله وعندي معلومة تضرّه إذا كشفتها — ما أدري هل أقول ولا أسكت.",
            "translation": "Our sheikh, I have a friend who cheats in his work and I have information that would harm him if I exposed it — I don't know whether to speak or stay silent.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Clear, specific dilemma that sets up a rich dialogue."
          },
          {
            "text": "سؤالي عن الأمانة في العمل.",
            "translation": "My question is about integrity at work.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Too abstract — the imam needs the real situation to give real guidance."
          },
          {
            "text": "أريد أن أعرف إذا كان عليّ واجب تجاه صديق يرتكب خطأ.",
            "translation": "I want to know if I have a duty toward a friend who commits a mistake.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Too distanced — you're describing it from a textbook angle rather than living it."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "هذا ميزان دقيق — النصيحة واجبة، لكن طريقتها أهم من قرارها. نصحته أنت أولاً؟",
        "translation": "This is a delicate balance — advice is obligatory, but its method matters more than the decision. Have you advised him first?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Answer honestly.",
        "options": [
          {
            "text": "لا يا شيخنا — وهذا اللي يؤلمني. كنت أتجنّب الموضوع وما أعرف ليش.",
            "translation": "No, our sheikh — and this is what pains me. I was avoiding the matter and I don't know why.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Honest self-reflection — showing the imam you're part of the equation too."
          },
          {
            "text": "لا، لأنّ الوضع معقّد جداً.",
            "translation": "No, because the situation is very complicated.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Excuse-making rather than honesty. The imam will see through it."
          },
          {
            "text": "نعم، نصحته لكنّه لم يسمع.",
            "translation": "Yes, I advised him but he didn't listen.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Don't fabricate — if you haven't actually advised him, saying you have closes the dialogue."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "إذن ابدأ من هناك — بالحكمة واللين. ما يهمّك ما سيكون ردّه — أنت مسؤول عن الكلمة اللي تقولها، مو عن قلبه هو.",
        "translation": "Then start there — with wisdom and gentleness. Don't worry about what his response will be — you're responsible for the word you speak, not for his heart.",
        "end": true
      }
    ],
    "completionMessage": "You engaged a religious consultation with the right humility and honesty. الله يهدينا جميعاً."
  },
  {
    "id": "saudi_convo_p10_eulogy_remembrance",
    "phase": 10,
    "title": "Eulogy and Remembrance",
    "description": "Sharing memories of a passed loved one at a gathering of family.",
    "focalWordIds": [
      "w_tadhakkara",
      "w_remember",
      "w_qalb",
      "w_mawt",
      "w_hayaa",
      "w_wallah",
      "w_ghafara"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "الله يرحمه. كان رجل ما فيه مثيل — كل من عرفه بكى عليه.",
        "translation": "May God have mercy on him. He was a man with no equal — everyone who knew him wept for him.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Share a genuine memory of the deceased.",
        "options": [
          {
            "text": "والله، أذكر لما كنت صغير يجلسني جنبه ويحكيلي قصص الأجداد — ما نسيت ولا كلمة.",
            "translation": "By God, I remember when I was young he would sit me beside him and tell me stories of the ancestors — I haven't forgotten a single word.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Specific and vivid — a real memory is more powerful than any general praise."
          },
          {
            "text": "كان إنساناً طيباً ومحبوباً من الجميع.",
            "translation": "He was a kind person loved by everyone.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Generic and hollow — this could describe anyone. Share something real."
          },
          {
            "text": "نعم، كان شخصاً ذا قيم رفيعة.",
            "translation": "Yes, he was a person of high values.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "MSA eulogy-speak that creates distance rather than closeness. Too formal for a family gathering."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "على بال الأيام اللي كنّا نجتمع فيها كلنا — يمشي بيننا بهدوء ويسوّي الأمور.",
        "translation": "Those days when we all gathered are still in my heart — he would move among us quietly and make things right.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Add to his portrait with another facet of his character.",
        "options": [
          {
            "text": "ما كان يرفع صوته على أحد — وكانت كلمته تساوي ألف.",
            "translation": "He never raised his voice at anyone — yet his word was worth a thousand.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Poetic and specific — captures quiet authority beautifully."
          },
          {
            "text": "كان يحبّ الأسرة كثيراً.",
            "translation": "He loved the family a lot.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Too generic — add texture to the portrait."
          },
          {
            "text": "لقد قدّم تضحيات جسيمة من أجل العائلة.",
            "translation": "He made great sacrifices for the family.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Formal and vague — the gathering needs specifics that trigger real emotion."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "صحيح والله. آخر مرة شفته — قالي: 'اعتنِ بإخوانك.' ما عرفت إنها الوداع.",
        "translation": "So true, by God. The last time I saw him — he told me: 'Take care of your siblings.' I didn't know it was goodbye.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Respond to his grief with presence and meaning.",
        "options": [
          {
            "text": "والله يا عمي — هذي وصيّة، مو وداع. وأنت لازم تمشي فيها.",
            "translation": "By God, man — that's a bequest, not a goodbye. And you have to walk in it.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Transforms grief into purpose — this is the highest form of comfort."
          },
          {
            "text": "إنّا لله وإنّا إليه راجعون.",
            "translation": "Surely to God we belong and to Him we return.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "A sincere phrase but used here as a conversation-stopper rather than genuine engagement."
          },
          {
            "text": "لا تحزن — الله يرحمه.",
            "translation": "Don't be sad — may God have mercy on him.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Telling someone not to grieve is dismissive, not comforting."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "والله ذكّرتني — الله يرحمه ويجمعنا فيه في الجنة. ما يموت من يُذكر.",
        "translation": "By God you reminded me — may God have mercy on him and gather us with him in paradise. One who is remembered does not die.",
        "end": true
      }
    ],
    "completionMessage": "You honoured a life with specific memory and transformed grief into meaning. الله يرحم الجميع."
  },
  {
    "id": "saudi_convo_p10_artist_interview",
    "phase": 10,
    "title": "Artist Interview",
    "description": "You're being interviewed about your artistic work. Navigate questions with depth and authenticity.",
    "focalWordIds": [
      "w_fikra",
      "w_fakkara",
      "w_culture",
      "w_because",
      "w_nafs",
      "w_wallah",
      "w_society"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "شغلك يقول أشياء صعبة بلغة جميلة — من وين تجي الأفكار؟",
        "translation": "Your work says difficult things in a beautiful language — where do the ideas come from?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Answer with authenticity, not performance.",
        "options": [
          {
            "text": "والله — من الحياة نفسها. من المواقف اللي ما تنقال بالكلام العادي.",
            "translation": "By God — from life itself. From moments that can't be said with ordinary words.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Authentic and unpretentious — the best kind of artist answer."
          },
          {
            "text": "أتأثر بالفنانين الكبار الذين درستهم في الجامعة.",
            "translation": "I'm influenced by the great artists I studied at university.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Academic deflection — you're citing your education instead of revealing yourself."
          },
          {
            "text": "الإلهام يأتي من الله ومن الطبيعة.",
            "translation": "Inspiration comes from God and from nature.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too generic — this is the safe answer every artist gives. Go deeper."
          },
          {
            "text": "من الأشياء اللي يخاف الناس يقولونها — أنا بس أقولها بشكل ثاني.",
            "translation": "From the things people are afraid to say — I just say them a different way.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Bold and specific — this is the kind of answer that makes a great interview."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "بعض الناس يقولون شغلك يكسر تابوهات — إيش رأيك في هذا الوصف؟",
        "translation": "Some people say your work breaks taboos — what do you think of this description?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Engage this description thoughtfully.",
        "options": [
          {
            "text": "ما أبي أكسر شي — أبي أفتح نوافذ. الفرق كبير.",
            "translation": "I don't want to break anything — I want to open windows. The difference is significant.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "A beautiful distinction that reframes the narrative — shows depth of thought."
          },
          {
            "text": "نعم، الفن دائماً يكسر التابوهات.",
            "translation": "Yes, art always breaks taboos.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "A cliché answer that says nothing about you specifically."
          },
          {
            "text": "لست مهتماً بما يقوله الناس عن عملي.",
            "translation": "I'm not interested in what people say about my work.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "The detached artist pose — it's a cliché, and closing the question is boring in an interview."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "نوافذ — تعجبني. على بال مَن تفكّر لما تشتغل؟",
        "translation": "Windows — I like that. Who is on your mind when you work?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Name your real audience.",
        "options": [
          {
            "text": "الشخص اللي كنته أنا قبل عشر سنين — اللي ما كان يجد أحداً يعبّر عمّا يحسّ.",
            "translation": "The person I was ten years ago — the one who couldn't find anyone expressing what he felt.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Deeply personal and universal — this is the answer that makes people feel seen."
          },
          {
            "text": "الجيل الشاب المبدع.",
            "translation": "The young creative generation.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Too broad and marketing-speak — it doesn't reveal anything real."
          },
          {
            "text": "الجمهور في المقام الأول.",
            "translation": "The audience first and foremost.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "A non-answer. Every artist says this."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "والله هذا الجواب وحده يساوي مقابلة كاملة. شكراً — الناس محتاجة تسمع هذا.",
        "translation": "By God, that answer alone is worth a whole interview. Thank you — people need to hear this.",
        "end": true
      }
    ],
    "completionMessage": "You gave authentic, layered answers that go beyond surface performance. هذا هو الفن الحقيقي."
  },
  {
    "id": "saudi_convo_p10_philosophical_chat",
    "phase": 10,
    "title": "Philosophical Chat",
    "description": "A deep late-night philosophical exchange about fate, choice, and meaning.",
    "focalWordIds": [
      "w_fakkara",
      "w_fikra",
      "w_believe",
      "w_doubt",
      "w_nafs",
      "w_wallah",
      "w_because",
      "w_haqq"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "إذا كل شي مقدّر — ليش نتعب نختار؟",
        "translation": "If everything is predestined — why do we exhaust ourselves choosing?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Engage this philosophical question with nuance.",
        "options": [
          {
            "text": "ربما القدر هو الإطار، والاختيار هو اللوحة اللي تُرسم جوّاه.",
            "translation": "Perhaps fate is the frame, and choice is the painting drawn within it.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "A poetic and philosophically sound metaphor — the right register for this conversation."
          },
          {
            "text": "هذا سؤال ديني وما ينبغي لنا الخوض فيه.",
            "translation": "This is a religious question and we shouldn't delve into it.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Shutting down a sincere philosophical inquiry — wrong move between two thoughtful friends."
          },
          {
            "text": "لأن الله أعطانا العقل لنستخدمه.",
            "translation": "Because God gave us minds to use.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "True but too simple — it doesn't actually engage the tension in his question."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "جميل — بس اللوحة نفسها أليست مقدّرة؟ يعني حتى اختياراتك كانت مكتوبة.",
        "translation": "Beautiful — but isn't the painting itself predestined? Meaning even your choices were written.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Respond to this deeper challenge.",
        "options": [
          {
            "text": "ابن الواوي — هذا السؤال أرّقني ليالي. بس أنا أشوف إن المسؤولية ما تنفي القدر — الإثنين حقيقيان في آنٍ واحد.",
            "translation": "Man, this question has kept me up many nights. But I see responsibility doesn't negate fate — both are real simultaneously.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ابن الواوي as an opener grounds the lofty in the human — then your answer is philosophically mature."
          },
          {
            "text": "ما أعرف — هذا يربكني.",
            "translation": "I don't know — this confuses me.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Intellectual surrender too early. Sit with the tension — don't flee it."
          },
          {
            "text": "الفلاسفة اختلفوا في هذا كثيراً عبر التاريخ.",
            "translation": "Philosophers have disagreed about this greatly throughout history.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Deflecting to history instead of thinking with him."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "يعني تعيش وكأنك حر، وتعتقد أن ثمة من كتب حريتك؟",
        "translation": "Meaning you live as if you're free, and you believe there's one who wrote your freedom?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "This is the sharpest point in the dialogue. Meet it.",
        "options": [
          {
            "text": "بالضبط — والله ما فيه تناقض في هذا عندي. الحرية ما تكون معنى إلا لو كانت أمام شيء أكبر.",
            "translation": "Exactly — by God there's no contradiction in this for me. Freedom only has meaning when it stands before something greater.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Philosophically rich and delivered with conviction — this is the mark of someone who has actually thought about this."
          },
          {
            "text": "هذا تناقض صريح لا يمكن التوفيق بينه.",
            "translation": "This is an explicit contradiction that cannot be reconciled.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "You're conceding the whole argument. A compatibilist position is entirely defensible."
          },
          {
            "text": "نعم تقريباً — لكنّ التفاصيل معقّدة.",
            "translation": "Yes approximately — but the details are complicated.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Vague and evasive — you're hedging instead of committing to a position."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "خلاص يعني — أنا اخترت أفكّر معاك الليلة، وربما هذا كان مكتوباً. لكن ما يهمّ — جميل.",
        "translation": "That's it then — I chose to think with you tonight, and perhaps that was written. But it doesn't matter — it's beautiful.",
        "end": true
      }
    ],
    "completionMessage": "A genuine philosophical exchange with depth and courage. خلاص يعني — بعض الأسئلة تكفيها الشركة."
  },
  {
    "id": "saudi_convo_p10_intimate_apology_partner",
    "phase": 10,
    "title": "Intimate Apology to Partner",
    "description": "A private, vulnerable apology to your spouse after a hurtful argument.",
    "focalWordIds": [
      "w_qalb",
      "w_hubb",
      "w_habiib",
      "w_ghafara",
      "w_wallah",
      "w_nafs",
      "w_because"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تكلّم — اللي قلته أمس ما كان صح.",
        "translation": "Speak — what you said yesterday wasn't right.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Own your mistake fully without deflecting.",
        "options": [
          {
            "text": "والله العظيم — ما قصّدت. بس هذا ما يكفي — اللي قلته كان مؤلم وغلط.",
            "translation": "By God Almighty — I didn't mean it. But that's not enough — what I said was hurtful and wrong.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Acknowledging both the intent and the impact — the highest form of apology."
          },
          {
            "text": "كنت متعباً ومضغوطاً يومها.",
            "translation": "I was tired and under pressure that day.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "An explanation that doubles as an excuse. Your partner has heard enough excuses."
          },
          {
            "text": "آسف. أتمنى أن تسامحيني.",
            "translation": "I'm sorry. I hope you forgive me.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too quick and light — a wound this deep needs more than a brief sorry."
          },
          {
            "text": "أنا آسف من أعماق قلبي — حبيبتي ما تستاهل كلامي ذاك أبداً.",
            "translation": "I'm sorry from the depths of my heart — my love you didn't deserve those words at all.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "حبيبتي with the specific acknowledgment of undeservingness — this is real."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "تعرف إيش الأصعب؟ مو الكلام — إن اللي قاله كان أنت. أنت.",
        "translation": "You know what's hardest? Not the words — that the one who said it was you. You.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Sit with the weight of that without deflecting.",
        "options": [
          {
            "text": "أعرف. وهذا اللي ما يسامحني فيه قلبي على نفسي.",
            "translation": "I know. And that's what my heart can't forgive myself for.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Sitting with the guilt without deflection — this is what genuine remorse looks like."
          },
          {
            "text": "بس أنت تعرف إني ما أقصد.",
            "translation": "But you know I don't mean it.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Appealing to your past character to dismiss the current harm. Wrong move."
          },
          {
            "text": "الكل يخطئ أحياناً.",
            "translation": "Everyone makes mistakes sometimes.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Universalizing your mistake — another subtle deflection."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "إيش تبي مني الحين؟",
        "translation": "What do you want from me now?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Don't demand, don't perform — be honest about what you need.",
        "options": [
          {
            "text": "ما أبي شي الحين — بس أبيك تعرفين إن أنا الغلطان وإنك غالية عليّ.",
            "translation": "I don't want anything right now — I just want you to know I'm in the wrong and that you mean the world to me.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "No transaction, just love. This is the answer."
          },
          {
            "text": "أبيك تسامحيني حتى نرجع زي ما كنّا.",
            "translation": "I want you to forgive me so we can go back to how we were.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Seeking forgiveness for your own comfort, not her healing — the wrong framing."
          },
          {
            "text": "أريد أن نبدأ من جديد.",
            "translation": "I want us to start fresh.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Too quick — you can't skip the pain on the way to the reset."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "أعطيني وقت — مو لأني ما أحبّك. لأني أحبّك وكلامك تعبني.",
        "translation": "Give me time — not because I don't love you. Because I do love you and your words exhausted me.",
        "end": true
      }
    ],
    "completionMessage": "You made a genuine apology — no deflection, no transaction. Just love and accountability. ما شاء الله."
  },
  {
    "id": "saudi_convo_p10_negotiate_inheritance",
    "phase": 10,
    "title": "Negotiating Inheritance",
    "description": "A tense but respectful negotiation between siblings about dividing family inheritance.",
    "focalWordIds": [
      "w_haqq",
      "w_qaliil",
      "w_kathiir",
      "w_money",
      "w_because",
      "w_wallah",
      "w_society",
      "w_ikhtalafa"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "الحق الشرعي واضح — لكن أنت تعرف إن البيت ما يمكن يُباع. فيه ذكريات.",
        "translation": "The legal right is clear — but you know the house can't be sold. There are memories in it.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Acknowledge the emotional weight while being clear about your rights.",
        "options": [
          {
            "text": "والله الذكريات لنا جميعاً — وأنا كذلك عندي حق فيها وفي البيت.",
            "translation": "By God the memories belong to all of us — and I too have a right to them and to the house.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "You honour the emotional argument without surrendering your legal position."
          },
          {
            "text": "الذكريات لا علاقة لها بالقانون — نتكلم عن حقوق واضحة.",
            "translation": "Memories have nothing to do with law — we're talking about clear rights.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Dismissing emotions in a family negotiation will collapse the dialogue. Don't separate the two."
          },
          {
            "text": "أنا معك — البيت يبقى ولا نبيعه.",
            "translation": "I'm with you — the house stays, we won't sell it.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "You're giving in without negotiating — this may not reflect your actual rights."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "إذن ماذا تقترح؟ أنا ما عندي فلوس أشتري نصيبك.",
        "translation": "So what do you propose? I don't have the money to buy your share.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Offer a fair solution that protects everyone.",
        "options": [
          {
            "text": "نبقيه مشتركاً — تسكن فيه وتعطيني إيجار نصيبي. نحدد السعر بشكل عادل.",
            "translation": "We keep it joint — you live in it and pay me rent for my share. We set a fair price.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "A practical solution that respects both the emotional and financial dimensions."
          },
          {
            "text": "لازم نبيعه ونقسم الفلوس. هذا الحق.",
            "translation": "We must sell it and split the money. That's the right thing.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Legally correct but emotionally tone-deaf in a family context — will create lasting damage."
          },
          {
            "text": "خلاص يعني — خذ البيت وما أبي شي.",
            "translation": "That's it then — take the house and I want nothing.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Giving up your rights to avoid conflict isn't nobility — it breeds resentment later."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الإيجار؟ هذا بيحوّل البيت لعمل تجاري — كيف أنظر في عيون أولادي؟",
        "translation": "Rent? That turns the house into a commercial deal — how do I look my children in the eyes?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Address his dignity concern without abandoning your position.",
        "options": [
          {
            "text": "يا أخوي — ما يهمّك كيف تنظر لأولادك. المهم كيف تنظر لي أنا. أنا أخوك ومستحق.",
            "translation": "Brother — don't worry about how you look to your children. What matters is how you look to me. I'm your brother and I'm owed this.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Brings it back to the sibling relationship — the real stakes. ما يهمّك lands perfectly here."
          },
          {
            "text": "هذا ليس مشكلتي.",
            "translation": "That's not my problem.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Too cold — you'll win the argument and lose a brother."
          },
          {
            "text": "لا بأس، نسمّي الأمر بطريقة ثانية إذا كان هذا يريحك.",
            "translation": "It's fine, we can name it differently if that makes you comfortable.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Rebranding doesn't solve the underlying tension — address the real concern."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "والله العظيم ما أبي أظلمك. نجلس مع الكبار ونحل هذا بطريقة تحفظ الجميع.",
        "translation": "I swear to God I don't want to wrong you. Let's sit with the elders and solve this in a way that protects everyone.",
        "end": true
      }
    ],
    "completionMessage": "You navigated a charged inheritance negotiation with clarity, dignity, and family warmth. الله يوسّع على الجميع."
  },
  {
    "id": "saudi_convo_p10_compliment_poetry",
    "phase": 10,
    "title": "Complimenting Poetry",
    "description": "A peer shares their new poem and you offer genuine, textured feedback.",
    "focalWordIds": [
      "w_fikra",
      "w_culture",
      "w_wallah",
      "w_mashallah",
      "w_because",
      "w_qalb",
      "w_nafs"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "قرأت القصيدة الجديدة؟ أبي رأيك الحقيقي — مو المجاملة.",
        "translation": "Did you read the new poem? I want your real opinion — not flattery.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Give a genuine opening reaction.",
        "options": [
          {
            "text": "والله — السطر الثالث ضربني. ما توقّعت إنك تجرأ على هذا الصورة.",
            "translation": "By God — the third line hit me. I didn't expect you to dare that image.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Specific and honest — naming a line shows you actually read it closely."
          },
          {
            "text": "ما شاء الله، قصيدة رائعة ومعبّرة جداً.",
            "translation": "MashaAllah, a wonderful and very expressive poem.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Generic flattery — exactly what he said he didn't want."
          },
          {
            "text": "جيدة، لكن بعض الأسطر تحتاج مراجعة.",
            "translation": "Good, but some lines need revision.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "You're leading with critique before giving the overall reaction — abrupt."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "السطر الثالث؟ كثير منهم قالوا إنه غامض — إيش شفت فيه أنت؟",
        "translation": "The third line? Many said it was obscure — what did you see in it?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Interpret the line with genuine engagement.",
        "options": [
          {
            "text": "شفت إنك تتكلم عن الغياب — مو الفقد. الفرق دقيق وعميق.",
            "translation": "I saw you were speaking about absence — not loss. The difference is subtle and deep.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Close literary reading that shows genuine engagement with the text."
          },
          {
            "text": "ما فهمته أنا كذلك — ربما تشرحه؟",
            "translation": "I didn't understand it either — maybe you can explain it?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "You're asking him to explain his own poem instead of meeting him as a reader. Passive."
          },
          {
            "text": "الغموض في الشعر ليس عيباً بالضرورة.",
            "translation": "Obscurity in poetry is not necessarily a flaw.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "A defensive reflex, not a real response. You're not engaging the poem."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "ابن الواوي — أنت الوحيد اللي قرأها صح. والله يعني.",
        "translation": "Man, you're the only one who read it right. By God, seriously.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Accept the compliment and raise a genuine question.",
        "options": [
          {
            "text": "شكراً — بس سؤال: النهاية حسّيت إنها مبكّرة. كان عندك مكان تروح؟",
            "translation": "Thank you — but one question: the ending felt early. Did you have somewhere to go?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Gracious acceptance followed by a real craft question — this is how creative peers talk."
          },
          {
            "text": "شكراً جداً — هذا شرّفني.",
            "translation": "Thank you very much — this honours me.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "You close the exchange when there's more to explore."
          },
          {
            "text": "لا — الكثيرون لا يقرأون الشعر بعمق في وقتنا.",
            "translation": "No — many people don't read poetry deeply in our time.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "A complaint about readers that dismisses the compliment and deflects from the poem."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "والله — أحسست إن النهاية المبكّرة هي النهاية الوحيدة الصادقة. السكوت قصيدة كذلك.",
        "translation": "By God — I felt the early ending was the only honest ending. Silence is a poem too.",
        "end": true
      }
    ],
    "completionMessage": "You gave a poet the gift of being truly read. ما شاء الله على القراءة."
  },
  {
    "id": "saudi_convo_p10_intellectual_disagree_professor",
    "phase": 10,
    "title": "Disagreeing With Your Professor",
    "description": "You respectfully but firmly challenge your professor's position in an academic discussion.",
    "focalWordIds": [
      "w_opinion",
      "w_debate",
      "w_think",
      "w_because",
      "w_haqq",
      "w_bahth",
      "w_fahima"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "الدراسات الكلاسيكية في هذا الحقل تثبت وجهة نظري — لا مجال للجدل.",
        "translation": "Classical studies in this field prove my point of view — there is no room for debate.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Challenge this with respect and precision.",
        "options": [
          {
            "text": "مع احترامي يا دكتور — الدراسات الكلاسيكية اعتمدت على عيّنات لا تمثّل السياق الذي نتكلم عنه.",
            "translation": "With my respect, doctor — the classical studies relied on samples that don't represent the context we're discussing.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "مع احترامي is the right opener — respectful, then precise. Perfect."
          },
          {
            "text": "أنا لا أوافق على هذا الرأي يا دكتور.",
            "translation": "I disagree with this opinion, doctor.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "True but too blunt without substance — you need the argument, not just the disagreement."
          },
          {
            "text": "ربما يا دكتور — بس في رأيي المتواضع...",
            "translation": "Perhaps, doctor — but in my humble opinion...",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "The excessive hedging weakens your position before you make it. You have a valid point — own it."
          },
          {
            "text": "الأبحاث الحديثة تعارض هذا يا دكتور — هل اطّلعت على دراسة X؟",
            "translation": "Recent research contradicts this, doctor — have you seen study X?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Citing recent evidence is a clean academic challenge — it questions the claim, not the person."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "عيّنات؟ تلك الدراسات أُجريت على آلاف الحالات. ما هو مصدرك؟",
        "translation": "Samples? Those studies were conducted on thousands of cases. What is your source?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Back your claim with specifics.",
        "options": [
          {
            "text": "باحثو جامعة X نشروا عام ٢٠٢٢ — المجموعة كانت متجانسة ثقافياً بشكل لا يعكس التنوع اللازم.",
            "translation": "Researchers at University X published in 2022 — the group was culturally homogeneous in a way that doesn't reflect necessary diversity.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Year, institution, specific methodological critique — this is rigorous academic discourse."
          },
          {
            "text": "قرأت عدة مقالات تشير إلى هذا.",
            "translation": "I read several articles pointing to this.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Vague — 'several articles' won't hold up against a professor's methodological challenge."
          },
          {
            "text": "أنا أتكلم من تجربتي الشخصية.",
            "translation": "I'm speaking from personal experience.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Personal experience doesn't counter empirical research in an academic debate."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "نقطة تستحق الدراسة. لكن ألا ترى أن نقدك يُضعف المنهج بأكمله لا الدراسة فقط؟",
        "translation": "A point worth studying. But don't you see that your critique weakens the entire methodology, not just the study?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Clarify the scope of your argument.",
        "options": [
          {
            "text": "هذا تماماً ما أقصده يا دكتور — المنهج بحاجة لمراجعة، لا الاستنتاجات فقط.",
            "translation": "That's exactly what I mean, doctor — the methodology needs review, not just the conclusions.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "Accepting the implication and pushing further — intellectually confident."
          },
          {
            "text": "لا، أنا أنتقد الدراسة فقط.",
            "translation": "No, I'm only critiquing the study.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "You're retreating from your strongest position — don't."
          },
          {
            "text": "ربما أبالغت في نقدي.",
            "translation": "Perhaps I exaggerated my critique.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Backing down when under pressure — a common mistake under professorial authority."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "إذن اكتب لي ورقة بحثية عن هذا — ثلاثة آلاف كلمة. سأقرأها بانتباه.",
        "translation": "Then write me a research paper on this — three thousand words. I'll read it carefully.",
        "end": true
      }
    ],
    "completionMessage": "You challenged a professor with precision, respect, and intellectual courage. هذا هو العقل النقدي."
  },
  {
    "id": "saudi_convo_p10_traditional_wedding_speech",
    "phase": 10,
    "title": "Traditional Wedding Speech",
    "description": "You deliver or respond to speeches at a traditional Saudi wedding. Navigate formality and warmth.",
    "focalWordIds": [
      "w_wallah",
      "w_mashallah",
      "w_inshallah",
      "w_hubb",
      "w_habiib",
      "w_family",
      "w_yaani"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "يا ضيوف الكرام — نسعد بتشريفكم في هذا اليوم المبارك. نطلب من الأخ كلمة.",
        "translation": "Honoured guests — we are delighted by your presence on this blessed day. We ask the brother for a word.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Open your wedding speech with the right register.",
        "options": [
          {
            "text": "بسم الله الرحمن الرحيم — والله يا أهل العريسين، ما في كلام يوصف فرحة هذا اليوم.",
            "translation": "In the name of God, the Most Gracious, the Most Merciful — by God, family of the two newlyweds, no words can describe the joy of this day.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Opening with bismillah, then expressing inexpressible joy — perfect traditional wedding register."
          },
          {
            "text": "مرحباً بالجميع! اليوم يوم سعيد.",
            "translation": "Welcome everyone! Today is a happy day.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too casual for a formal wedding speech. This needs gravitas and warmth together."
          },
          {
            "text": "يسعدني أن أتكلم في هذه المناسبة الكريمة.",
            "translation": "I'm pleased to speak on this honourable occasion.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Too formal and bureaucratic — a wedding needs warmth, not corporate diction."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "جزاك الله خيراً — كمّل يا رجل، الكل يستمع.",
        "translation": "May God reward you with goodness — continue, man, everyone is listening.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Address the couple directly with advice and blessing.",
        "options": [
          {
            "text": "يا عريسين — الزواج ما هو لحظة، هو قرار تجدّدونه كل يوم. والله يوفّقكم ويجمعكم على خير.",
            "translation": "Dear newlyweds — marriage is not a moment, it's a decision you renew every day. May God grant you success and unite you in goodness.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "Wisdom and dua in one — the traditional combination for a wedding."
          },
          {
            "text": "أتمنى لكما السعادة الزوجية الدائمة.",
            "translation": "I wish you both permanent marital happiness.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Generic well-wishing without depth or warmth — could be a card message."
          },
          {
            "text": "تذكّرا دائماً أن الحياة فيها صعاب.",
            "translation": "Always remember that life has hardships.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Wrong tone for a wedding speech — don't lead with the difficult reality at the wedding feast."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "ما شاء الله — على بال العيلتين الحقيقيتين دايماً. شكراً على الكلام الطيب.",
        "translation": "MashaAllah — both families are always in our hearts. Thank you for the kind words.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Close the speech with a final blessing.",
        "options": [
          {
            "text": "الله يبارك لكم ويبارك عليكم ويجمع بينكم في خير — وربنا يتمّم بالخير ويرزقهم الذريّة الصالحة.",
            "translation": "May God bless you and bless upon you and unite you in goodness — and may our Lord complete in goodness and grant them righteous offspring.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "The traditional wedding dua in full — this is exactly what the moment calls for."
          },
          {
            "text": "أتمنى لكم جميعاً مساء سعيداً.",
            "translation": "I wish you all a happy evening.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "You're ending like a hotel host, not a family member at a wedding."
          },
          {
            "text": "شكراً على استماعكم.",
            "translation": "Thank you for listening.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "A public-speaking cliché that completely deflates the moment."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "آمين آمين — بارك الله فيك وفي لسانك. ما شاء الله عليك يا خطيب!",
        "translation": "Amen, amen — may God bless you and your tongue. MashaAllah on you, speaker!",
        "end": true
      }
    ],
    "completionMessage": "You delivered a wedding speech with tradition, warmth, and the right register. بارك الله في الجميع!"
  },
  {
    "id": "saudi_convo_p10_returning_home_after_years",
    "phase": 10,
    "title": "Returning Home After Years",
    "description": "You've been away for years and return home. Navigate the emotions, changes, and belonging.",
    "focalWordIds": [
      "w_tadhakkara",
      "w_remember",
      "w_bayt",
      "w_wallah",
      "w_khalas",
      "w_yaani",
      "w_hayaa"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "رجعت يا غالي! والله العظيم كأنك ما غبت — بس وجهك أكبر.",
        "translation": "You came back, dear! By God Almighty it's as if you never left — but your face has matured.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Respond to the homecoming with genuine emotion.",
        "options": [
          {
            "text": "والله يا عمي — ما صدّقت إني رجعت. الهواء نفسه ريحته مختلفة هنا.",
            "translation": "By God, man — I can't believe I'm back. The very air smells different here.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "Sensory and emotional — the smell of home is a universally understood detail that lands perfectly."
          },
          {
            "text": "نعم، عدت أخيراً. الرحلة كانت مرهقة.",
            "translation": "Yes, I returned at last. The trip was exhausting.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Opening with the logistics of travel instead of the emotion of return. Wrong priority."
          },
          {
            "text": "أهلاً. كيف الأحوال؟",
            "translation": "Hello. How are things?",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "Far too flat for a homecoming after years away. Your friend is overwhelmed — match him."
          },
          {
            "text": "خلاص يعني — رجعت. ما أعرف كيف أوصف اللي أحسّ فيه الحين.",
            "translation": "That's it then — I'm back. I don't know how to describe what I'm feeling right now.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "خلاص يعني used beautifully — the exhale of arrival, the inexpressibility of return."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ابن الواوي — كم شيء تغيّر! البيت اللي كنّا نلعب فيه صار عمارة.",
        "translation": "Man — how much has changed! The house we used to play in became a building.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Respond to the change with the right mix of nostalgia and acceptance.",
        "options": [
          {
            "text": "على بال تلك الأيام — بس الأماكن تتغيّر والذكريات ما تتغيّر.",
            "translation": "Those days are still on my heart — but places change, memories don't.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "على بال is used perfectly here — and the insight about places vs memories is beautiful."
          },
          {
            "text": "نعم، التطوير العمراني سريع جداً هنا.",
            "translation": "Yes, urban development is very fast here.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Too analytical and cold for a moment of homecoming emotion."
          },
          {
            "text": "هذا مؤسف — كان يجب الحفاظ على التراث العمراني.",
            "translation": "That's unfortunate — the architectural heritage should have been preserved.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "Turning your homecoming into an urban planning complaint."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "صح والله. بس أنت — تغيّرت ولا نفس الشخص؟",
        "translation": "True by God. But you — did you change or are you the same person?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Answer this honestly — the most personal question of the conversation.",
        "options": [
          {
            "text": "والله — تغيّرت بالخارج. بس الجوف — الجوف نفسه. وهذا البيت هو اللي يثبت هذا.",
            "translation": "By God — I changed on the outside. But the inside — the inside is the same. And this home is what proves it.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "The inside/outside distinction with the home as proof — poetic and deeply Saudi."
          },
          {
            "text": "نعم، تغيّرت كثيراً بسبب التجارب والسفر.",
            "translation": "Yes, I changed a lot because of experiences and travel.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "True but abstract — the personal moment calls for something more specific and felt."
          },
          {
            "text": "لا، ما تغيّرت — أنا نفسي.",
            "translation": "No, I didn't change — I'm the same.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "Too simple and defensive — a person who's lived away for years has changed. Own it with nuance."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "خلاص يعني — أهلاً بك في البيت يا عمي. ما تسافر كذا بعد.",
        "translation": "That's it then — welcome home, man. Don't travel away like that again.",
        "end": true
      }
    ],
    "completionMessage": "You navigated a homecoming with real emotional depth and idiomatic precision. أهلاً وسهلاً — Welcome home!"
  },
  {
    "id": "saudi_convo_p9_legal_advice",
    "phase": 9,
    "title": "Legal Advice",
    "description": "Consult a lawyer about a contract dispute in a formal legal setting.",
    "focalWordIds": [
      "w_law",
      "w_right",
      "w_contract",
      "w_document",
      "w_court",
      "w_evidence",
      "w_official",
      "w_complaint"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "مرحباً، كيف يمكنني مساعدتك اليوم؟ يُرجى توضيح طبيعة النزاع الذي تواجهه.",
        "translation": "Hello, how can I help you today? Please clarify the nature of the dispute you are facing.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Explain your situation formally:",
        "options": [
          {
            "text": "أواجه نزاعاً تعاقدياً مع طرف تجاري لم يلتزم بالبنود التي اتُّفق عليها في العقد المُبرم بيننا.",
            "translation": "I am facing a contractual dispute with a business party that did not comply with the terms agreed upon in the contract concluded between us.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! استخدمت المصطلحات القانونية الصحيحة واللغة الرسمية."
          },
          {
            "text": "عندي مشكلة مع شريكي في التجارة ما وفّى بالكلام اللي قلناه.",
            "translation": "I have a problem with my business partner who didn't fulfill what we said.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "هذه اللغة غير رسمية في السياق القانوني. استخدم \"لم يلتزم\" و\"العقد المُبرم\"."
          },
          {
            "text": "أبغى أشتكي على واحد ما ساعدني.",
            "translation": "I want to complain about someone who didn't help me.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "غير محدد وغير رسمي. في المكتب القانوني يُطلب منك تفصيل النزاع بدقة."
          },
          {
            "text": "لديّ عقد موقَّع غير أن الطرف الآخر أخلَّ ببنوده وأطلب استشارتكم القانونية.",
            "translation": "I have a signed contract but the other party breached its terms and I request your legal counsel.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! أسلوب رسمي ومحدد، واستخدمت \"غير أن\" كأداة ربط راقية."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "يُعدّ الإخلال بالعقد جريمةً مدنية يُعاقب عليها القانون. هل بحوزتك وثائق تُثبت ما اتُّفق عليه؟",
        "translation": "Breach of contract is considered a civil offense punishable by law. Do you have documents that prove what was agreed upon?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "أحتاج منك مزيداً من التفاصيل. هل تملك عقداً مكتوباً موقَّعاً من الطرفين؟",
        "translation": "I need more details from you. Do you have a written contract signed by both parties?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Describe your evidence:",
        "options": [
          {
            "text": "نعم، لديّ نسخة من العقد الموقَّع فضلاً عن مراسلات بريد إلكتروني تُثبت التزام الطرف الآخر أصلاً ثم تراجعه.",
            "translation": "Yes, I have a copy of the signed contract as well as email correspondence proving the other party's original commitment and then their retraction.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "استخدام \"فضلاً عن\" بدلاً من \"وكمان\" يُظهر مستوى اللغة الرسمي."
          },
          {
            "text": "عندي إيميلات بس ما عندي عقد مكتوب.",
            "translation": "I have emails but I don't have a written contract.",
            "nextStepId": "s5b",
            "correct": false,
            "feedback": "المحتوى مقبول لكن الأسلوب غير رسمي — قل \"لديّ مراسلات إلكترونية وإن كان العقد غير موثَّق خطياً\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "هذه الأدلة كافية للمضي قُدُماً. سيُرفع الطلب إلى المحكمة التجارية وسيُبلَّغ الطرف الآخر رسمياً.",
        "translation": "This evidence is sufficient to proceed. The application will be submitted to the commercial court and the other party will be formally notified.",
        "next": "s6"
      },
      {
        "id": "s5b",
        "speaker": "partner",
        "text": "المراسلات الإلكترونية مقبولة كدليل وإن كانت قيمتها أدنى من العقد الخطي. يمكن رفع دعوى استناداً إليها.",
        "translation": "Electronic correspondence is accepted as evidence even if its value is lower than a written contract. A lawsuit can be filed based on it.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Ask about next steps formally:",
        "options": [
          {
            "text": "ما المدة الزمنية المتوقَّعة للبتّ في القضية، وما الرسوم التي تترتَّب على ذلك؟",
            "translation": "What is the expected timeframe for resolving the case, and what fees are associated with that?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "سؤال رسمي ودقيق يُظهر إلمامك بالإجراءات القانونية."
          },
          {
            "text": "كم بتاخذ القضية وكم الكلفة؟",
            "translation": "How long will the case take and how much does it cost?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "سؤال مباشر لكن بأسلوب عامي — في المكتب القانوني استخدم \"المدة الزمنية\" و\"الرسوم\"."
          },
          {
            "text": "وش اللي لازم أسوي الحين؟",
            "translation": "What do I need to do now?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "عامي جداً للسياق القانوني الرسمي."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "تستغرق القضايا التجارية عادةً من ثلاثة إلى ستة أشهر. أما الرسوم فتُحدَّد بنسبة مئوية من قيمة النزاع وفق اللوائح المعمول بها.",
        "translation": "Commercial cases usually take three to six months. As for fees, they are determined as a percentage of the dispute's value in accordance with applicable regulations.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Confirm your decision to proceed:",
        "options": [
          {
            "text": "أُفوِّضكم بالمضي في الإجراءات القانونية اللازمة وسأُزوِّدكم بالوثائق المطلوبة في أقرب وقت ممكن.",
            "translation": "I authorize you to proceed with the necessary legal procedures and I will provide you with the required documents as soon as possible.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "ممتاز! \"أُفوِّض\" هو الفعل الرسمي الصحيح لمنح التوكيل."
          },
          {
            "text": "زين، امشوا قدام وأنا أجيب الأوراق.",
            "translation": "Good, go ahead and I'll bring the papers.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "المحتوى صحيح لكن الأسلوب العامي غير مناسب في توكيل قانوني رسمي."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "حسناً، سيُعدّ فريقنا مذكرة الدعوى التي يجب أن تُراجعها وتُوقِّعها. نشكرك على ثقتك بمكتبنا ونتطلع إلى الدفاع عن حقوقك.",
        "translation": "Very well, our team will prepare the lawsuit memorandum which you must review and sign. We thank you for your trust in our office and look forward to defending your rights.",
        "end": true
      }
    ],
    "completionMessage": "Excellent work navigating a formal legal consultation in MSA. Your use of legal register and passive constructions was accurate."
  },
  {
    "id": "saudi_convo_p9_passport_office",
    "phase": 9,
    "title": "Passport Office",
    "description": "Renew your passport at a government passport office using formal Arabic.",
    "focalWordIds": [
      "w_document",
      "w_official",
      "w_expire",
      "w_application",
      "w_identity",
      "w_government",
      "w_period",
      "w_required"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً بك في مكتب الجوازات. ما الخدمة التي تودّ الحصول عليها اليوم؟",
        "translation": "Welcome to the passport office. What service do you wish to obtain today?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "State your request formally:",
        "options": [
          {
            "text": "أودّ تجديد جواز سفري الذي انتهت صلاحيته منذ شهر مضى.",
            "translation": "I wish to renew my passport whose validity expired one month ago.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "جيد جداً! \"أودّ\" بدلاً من \"أبغى\"، واستخدمت جملة الصلة \"الذي انتهت صلاحيته\" بشكل صحيح."
          },
          {
            "text": "أبغى أجدد جوازي، انتهى منذ شهر.",
            "translation": "I want to renew my passport, it expired a month ago.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أبغى\" عامية سعودية — استبدلها بـ\"أودّ\" أو \"أرغب في\" في المكاتب الرسمية."
          },
          {
            "text": "جوازي خلص وأحتاج أجدده.",
            "translation": "My passport is done and I need to renew it.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"خلص\" عامي جداً — استخدم \"انتهت صلاحيته\" أو \"انقضت مدته\"."
          },
          {
            "text": "أرغب في استخراج تجديد لجواز السفر المنتهي الصلاحية.",
            "translation": "I wish to obtain a renewal for the expired passport.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! \"أرغب في\" ومصطلح \"المنتهي الصلاحية\" دقيق تماماً."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "يُشترط لتجديد جواز السفر تقديم الوثائق الآتية: بطاقة الهوية الوطنية، وصورة شخصية حديثة، وإيصال سداد الرسوم.",
        "translation": "Renewing a passport requires submitting the following documents: national identity card, a recent personal photo, and a fee payment receipt.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "حسناً. لإتمام طلب التجديد تحتاج إلى بطاقة هويتك الوطنية وصورة شخصية وما يُثبت سداد الرسوم الرسمية.",
        "translation": "Very well. To complete the renewal application you need your national ID card, a personal photo, and proof of official fee payment.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Confirm you have the documents:",
        "options": [
          {
            "text": "بحوزتي جميع الوثائق المطلوبة، وقد أُدِّيت الرسوم إلكترونياً عبر البوابة الحكومية.",
            "translation": "I have all the required documents, and the fees have been paid electronically through the government portal.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "استخدمت المبني للمجهول \"أُدِّيت\" بشكل صحيح — هذا هو المستوى المطلوب في التعامل الرسمي."
          },
          {
            "text": "معي كل الأوراق ودفعت الرسوم أونلاين.",
            "translation": "I have all the papers and paid the fees online.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "المحتوى صحيح لكن \"معي\" و\"أونلاين\" عامي — قل \"بحوزتي\" و\"إلكترونياً\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "سيُراجَع طلبك ويُصدَر الجواز الجديد في غضون سبعة أيام عمل. هل تودّ الاستلام بنفسك أم عبر البريد؟",
        "translation": "Your application will be reviewed and the new passport will be issued within seven working days. Do you wish to collect it in person or by mail?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "State your preference for collection:",
        "options": [
          {
            "text": "أفضِّل الاستلام شخصياً حرصاً على سلامة الوثيقة.",
            "translation": "I prefer to collect it in person to ensure the safety of the document.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "\"أفضِّل\" وليس \"أبغى\"، و\"حرصاً على\" تعبير رسمي راقٍ."
          },
          {
            "text": "ابعثوه بالبريد، أسهل.",
            "translation": "Send it by mail, it's easier.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "أسلوب عامي — قل \"أودّ إرساله عبر البريد إن أمكن ذلك\"."
          },
          {
            "text": "أطلب إرساله بالبريد المُسجَّل إن كانت الخدمة متاحة.",
            "translation": "I request sending it by registered mail if the service is available.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "ممتاز! \"البريد المُسجَّل\" مصطلح رسمي دقيق."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "تمام. سيُرسَل إليك رسالة نصية فور إتمام المعالجة. هل ثمة استفسار آخر؟",
        "translation": "Very well. You will be sent a text message as soon as processing is complete. Is there any other inquiry?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Ask a follow-up question formally:",
        "options": [
          {
            "text": "هل يمكن الاستعلام عن مرحلة المعالجة عبر الموقع الإلكتروني الرسمي؟",
            "translation": "Is it possible to inquire about the processing stage through the official website?",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "\"الاستعلام\" و\"الموقع الإلكتروني الرسمي\" مصطلحان رسميان مناسبان تماماً."
          },
          {
            "text": "أقدر أتابع الطلب أونلاين؟",
            "translation": "Can I follow up on the application online?",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"أقدر\" عامية سعودية — استخدم \"هل يمكن\" أو \"هل بإمكاني\"."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "نعم، يُتاح تتبُّع حالة الطلب عبر بوابة الجوازات الإلكترونية برقم المرجع الذي سيُزوَّد به عبر الرسالة النصية. شكراً لك.",
        "translation": "Yes, tracking the application status is available through the electronic passport portal using the reference number that will be provided via text message. Thank you.",
        "end": true
      }
    ],
    "completionMessage": "Well done. You handled all passport office interactions in formal MSA, correctly using passive constructions and formal request verbs."
  },
  {
    "id": "saudi_convo_p9_visa_interview",
    "phase": 9,
    "title": "Visa Interview",
    "description": "Attend a formal visa interview at an embassy and answer questions in MSA.",
    "focalWordIds": [
      "w_purpose",
      "w_duration",
      "w_official",
      "w_financial",
      "w_return",
      "w_confirm",
      "w_study",
      "w_sponsor"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "مساء الخير. يُرجى الجلوس. سنبدأ المقابلة الآن. ما الغرض من زيارتك للبلاد؟",
        "translation": "Good evening. Please be seated. We will begin the interview now. What is the purpose of your visit to the country?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "State your purpose formally:",
        "options": [
          {
            "text": "الغرض من زيارتي الدراسة الأكاديمية، إذ قُبلت في برنامج الدراسات العليا بإحدى الجامعات المعتمَدة.",
            "translation": "The purpose of my visit is academic study, as I have been accepted into a graduate studies program at one of the accredited universities.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! استخدمت \"إذ\" للربط و\"قُبلت\" مبنياً للمجهول — هذا هو المستوى المطلوب في مقابلات التأشيرة."
          },
          {
            "text": "رحت لأدرس هناك في الجامعة.",
            "translation": "I went to study there at the university.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "أسلوب عامي وتصريف زمني خاطئ — استخدم المضارع \"أرغب في الدراسة\" وأسلوباً رسمياً."
          },
          {
            "text": "أسعى إلى متابعة دراستي الجامعية في تخصص إدارة الأعمال وفق خطة أكاديمية محددة.",
            "translation": "I seek to continue my university studies in business administration according to a specific academic plan.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"أسعى إلى\" بديل رسمي ممتاز، وتفصيل التخصص يُعزِّز المصداقية."
          },
          {
            "text": "أبغى أدرس بالجامعة مدة سنتين.",
            "translation": "I want to study at the university for two years.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أبغى\" عامية سعودية — استخدم \"أرغب في\" أو \"أسعى إلى\" في المقابلة الرسمية."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ما المدة المتوقَّعة لإقامتك، وهل تعتزم العودة إلى بلدك بعد انتهاء الدراسة؟",
        "translation": "What is the expected duration of your stay, and do you intend to return to your country after completing your studies?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "أحتاج أن تجيب بوضوح: ما مدة إقامتك المُخطَّطة وما خططك بعد انتهاء الدراسة؟",
        "translation": "I need you to answer clearly: what is your planned duration of stay and what are your plans after completing your studies?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Explain duration and return plans:",
        "options": [
          {
            "text": "تستغرق الدراسة عامين دراسيين، وأعتزم العودة إلى بلدي فور الحصول على الدرجة العلمية التزاماً بالمتطلبات الأسرية والمهنية.",
            "translation": "The studies take two academic years, and I intend to return to my country immediately upon obtaining the degree, in compliance with family and professional requirements.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "إجابة شاملة تستخدم \"أعتزم\" و\"فور\" و\"التزاماً بـ\" — مصطلحات رسمية دقيقة."
          },
          {
            "text": "سنتين وبعدين أرجع للبيت.",
            "translation": "Two years and then I'll go back home.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "\"بعدين\" و\"البيت\" عاميتان — قل \"وبعد انتهاء الدراسة أعتزم العودة\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "هل لديك كفيل مالي يضمن تغطية نفقات إقامتك الدراسية؟",
        "translation": "Do you have a financial sponsor guaranteeing coverage of your study residence expenses?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Answer about financial support:",
        "options": [
          {
            "text": "نعم، تكفّلت المؤسسة التي أعمل بها بتحمُّل كامل التكاليف الدراسية وفق عقد موثَّق، فضلاً عن منحة حكومية مُعتمَدة.",
            "translation": "Yes, the institution I work for has undertaken to bear all study costs according to a documented contract, in addition to an approved government grant.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "\"تكفّلت\" و\"تحمُّل\" و\"فضلاً عن\" مصطلحات رسمية ممتازة."
          },
          {
            "text": "شركتي بتدفع لي وعندي منحة كمان.",
            "translation": "My company will pay for me and I also have a scholarship.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "\"بتدفع\" و\"كمان\" عاميتان — استخدم \"تتكفَّل المؤسسة\" و\"فضلاً عن\"."
          },
          {
            "text": "أتحمَّل النفقات شخصياً استناداً إلى مدخرات موثَّقة في كشف الحساب البنكي المُرفق.",
            "translation": "I bear the expenses personally based on savings documented in the attached bank statement.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "\"أتحمَّل\" و\"استناداً إلى\" مصطلحات رسمية صحيحة تماماً."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "سيُراجَع ملفك ويُبلَّغ قرار اللجنة خلال أسبوعين. هل تودّ إضافة أي معلومة؟",
        "translation": "Your file will be reviewed and the committee's decision will be communicated within two weeks. Do you wish to add any information?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Close the interview formally:",
        "options": [
          {
            "text": "أودّ التأكيد على التزامي التام بشروط التأشيرة وقوانين الإقامة، وأنا رهن الإشارة لتقديم أي وثائق إضافية.",
            "translation": "I wish to affirm my full commitment to the visa conditions and residence laws, and I am at your disposal to provide any additional documents.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "\"رهن الإشارة\" تعبير رسمي راقٍ جداً يُظهر مستوى لغوياً متقدماً."
          },
          {
            "text": "لا، شكراً، عندي كل شيء.",
            "translation": "No, thank you, I have everything.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "إغلاق عامي — في نهاية المقابلة الرسمية يُستحسن تأكيد الالتزام وشكر اللجنة رسمياً."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "حسناً. لقد اتَّسمت إجاباتك بالوضوح والدقة. ستُخطَر بالقرار عبر البريد الإلكتروني المُسجَّل في الملف. شكراً لحضورك.",
        "translation": "Very well. Your answers have been characterized by clarity and precision. You will be notified of the decision via the email registered in the file. Thank you for attending.",
        "end": true
      }
    ],
    "completionMessage": "Outstanding. You answered all visa interview questions in formal MSA with correct passive constructions and formal register throughout."
  },
  {
    "id": "saudi_convo_p9_university_admission",
    "phase": 9,
    "title": "University Admission",
    "description": "Speak with a university admissions officer about your application in formal MSA.",
    "focalWordIds": [
      "w_study",
      "w_required",
      "w_application",
      "w_academic",
      "w_program",
      "w_certificate",
      "w_interview",
      "w_criteria"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً بك في إدارة القبول والتسجيل. كيف يمكنني إرشادك؟",
        "translation": "Welcome to the Admissions and Registration Department. How can I guide you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "State your purpose at the admissions office:",
        "options": [
          {
            "text": "أودّ الاستفسار عن متطلبات القبول في برنامج الدكتوراه بقسم اللغويات التطبيقية.",
            "translation": "I wish to inquire about the admission requirements for the doctoral program in the Department of Applied Linguistics.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"أودّ الاستفسار\" رسمي تماماً، و\"متطلبات القبول\" مصطلح أكاديمي دقيق."
          },
          {
            "text": "أبغى أدخل الدكتوراه، وش اللي أحتاجه؟",
            "translation": "I want to enter the doctorate, what do I need?",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أبغى\" و\"وش\" عاميتان — في مكتب القبول الجامعي استخدم \"أودّ الاستفسار عن متطلبات القبول\"."
          },
          {
            "text": "جئت للاستفسار عن شروط الالتحاق ببرامج الدراسات العليا التي تُقدِّمها الجامعة.",
            "translation": "I came to inquire about the conditions for joining the graduate programs offered by the university.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"شروط الالتحاق\" و\"تُقدِّمها الجامعة\" — جملة رسمية سليمة تماماً."
          },
          {
            "text": "حابب أسجل بالجامعة.",
            "translation": "I'd like to register at the university.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"حابب\" عامي — استخدم \"أرغب في التسجيل\" أو \"أودّ الالتحاق\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "يُشترط للقبول في الدكتوراه: درجة الماجستير بتقدير لا يقل عن ممتاز، وشهادة لغة معتمَدة، واجتياز المقابلة الأكاديمية التي تُعقد مرتين سنوياً.",
        "translation": "Requirements for doctoral admission include: a Master's degree with a grade no less than excellent, an accredited language certificate, and passing the academic interview held twice annually.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "للالتحاق بالدكتوراه تحتاج درجة ماجستير وشهادة لغة وتجتاز مقابلة القسم. هل تملك هذه المستلزمات؟",
        "translation": "To join the doctoral program you need a Master's degree, a language certificate, and pass the department interview. Do you have these requirements?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Confirm your qualifications:",
        "options": [
          {
            "text": "نعم، حصلت على درجة الماجستير بمرتبة الشرف، وقد اجتزت اختبار اللغة الإنجليزية بمستوى مقبول وفق معايير الجامعة.",
            "translation": "Yes, I obtained the Master's degree with honors, and I have passed the English language test at an acceptable level according to the university's standards.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "\"بمرتبة الشرف\" و\"اجتزت\" مصطلحات أكاديمية رسمية صحيحة."
          },
          {
            "text": "أيوه عندي ماجستير بامتياز وحصلت على آيلتس.",
            "translation": "Yes I have a Master's with distinction and I got IELTS.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "\"أيوه\" عامي — قل \"نعم، حصلت على\" لتناسب السياق الأكاديمي الرسمي."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "سيُقيَّم ملفك من قِبَل لجنة القبول وستُخطَر بموعد المقابلة عبر البريد الجامعي الرسمي.",
        "translation": "Your file will be evaluated by the admissions committee and you will be notified of the interview date via the official university email.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Ask about scholarship opportunities:",
        "options": [
          {
            "text": "هل تُوجَد منح دراسية مُتاحة للطلاب الملتحقين ببرامج الدكتوراه، وما معايير الاستحقاق؟",
            "translation": "Are there study grants available for students enrolled in doctoral programs, and what are the eligibility criteria?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "\"تُوجَد\" مبني للمجهول، و\"معايير الاستحقاق\" مصطلح أكاديمي دقيق."
          },
          {
            "text": "في منح للطلاب؟ كيف أحصل عليها؟",
            "translation": "Are there grants for students? How do I get them?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "أسلوب غير رسمي — في الإدارة الجامعية استخدم \"هل تُوجَد منح دراسية وما شروط الحصول عليها؟\""
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "تُمنَح المنح الدراسية الكاملة للطلاب الحاصلين على أعلى النسب، وتُحدَّد معايير الاستحقاق سنوياً من قِبَل مجلس الجامعة.",
        "translation": "Full scholarships are granted to students with the highest grades, and eligibility criteria are determined annually by the university council.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Thank the officer and confirm next step:",
        "options": [
          {
            "text": "أشكركم على هذه المعلومات القيِّمة. سأُكمل استيفاء طلب القبول الإلكتروني وأنتظر الرد الرسمي.",
            "translation": "I thank you for this valuable information. I will complete the electronic admission application and await the official response.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "\"استيفاء الطلب\" تعبير أكاديمي رسمي ممتاز يعكس مستوى لغوياً متقدماً."
          },
          {
            "text": "شكراً، بكمِّل التسجيل أونلاين.",
            "translation": "Thanks, I'll complete the registration online.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"بكمِّل\" و\"أونلاين\" عاميان — قل \"سأُكمل استيفاء الطلب إلكترونياً\"."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "حسناً. يسعدنا استقبال طلبك. سيُعلَن عن نتائج القبول في الأسبوع الأول من الفصل الدراسي القادم. نتمنى لك التوفيق.",
        "translation": "Very well. We are pleased to receive your application. Admission results will be announced in the first week of the upcoming semester. We wish you success.",
        "end": true
      }
    ],
    "completionMessage": "Excellent performance in a formal academic admissions context. Your MSA register and use of passive voice were accurate throughout."
  },
  {
    "id": "saudi_convo_p9_business_pitch",
    "phase": 9,
    "title": "Business Pitch",
    "description": "Present a business plan to a panel of investors using formal MSA.",
    "focalWordIds": [
      "w_invest",
      "w_market",
      "w_profit",
      "w_plan",
      "w_opportunity",
      "w_financial",
      "w_growth",
      "w_strategy"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "مرحباً بك أمام لجنة الاستثمار. يُرجى تقديم مشروعك بإيجاز واضح. لديك عشر دقائق.",
        "translation": "Welcome before the investment committee. Please present your project with clear brevity. You have ten minutes.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Open your pitch formally:",
        "options": [
          {
            "text": "أُقدِّم اليوم مشروعاً مبتكراً يسعى إلى ملء فجوة حقيقية في سوق الخدمات اللوجستية التي تُقدَّر قيمتها بمليار ريال.",
            "translation": "I present today an innovative project that seeks to fill a real gap in the logistics services market estimated to be worth one billion riyals.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"يسعى إلى\" و\"تُقدَّر قيمتها\" مبني للمجهول — لغة تجارية رسمية دقيقة."
          },
          {
            "text": "مشروعي حلو جداً وفيه فلوس كثيرة للمستثمرين.",
            "translation": "My project is really nice and there's a lot of money for investors.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"حلو\" و\"فلوس\" عاميتان غير مناسبتين لعرض الأعمال — استخدم \"مشروع واعد\" و\"عائد مالي مجزٍ\"."
          },
          {
            "text": "يسعدني عرض هذه الفرصة الاستثمارية التي تستهدف قطاعاً سريع النمو ذا عائد مُتوقَّع مرتفع.",
            "translation": "It gives me pleasure to present this investment opportunity that targets a fast-growing sector with an expected high return.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"يسعدني\" و\"مُتوقَّع\" مبني للمجهول — افتتاح تجاري رسمي ممتاز."
          },
          {
            "text": "أبغى أعرض عليكم مشروع يكسب فلوس زيادة.",
            "translation": "I want to present to you a project that earns more money.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أبغى\" و\"فلوس زيادة\" عاميتان — في عرض الأعمال الرسمي قل \"أودّ تقديم فرصة استثمارية عائدها مرتفع\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ما الميزة التنافسية التي تُميِّز مشروعك عن المنافسين الحاليين في السوق؟",
        "translation": "What is the competitive advantage that distinguishes your project from current competitors in the market?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "يُرجى إعادة صياغة عرضك بأسلوب أكثر احترافية. ما الذي يُميِّز مشروعك تحديداً؟",
        "translation": "Please rephrase your presentation in a more professional manner. What specifically distinguishes your project?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Explain your competitive advantage:",
        "options": [
          {
            "text": "تتمثَّل ميزتنا التنافسية في منصة تقنية حاصلة على براءة اختراع تُقلِّل التكاليف التشغيلية بنسبة أربعين بالمائة مقارنةً بالحلول التقليدية.",
            "translation": "Our competitive advantage consists of a patented technology platform that reduces operational costs by forty percent compared to traditional solutions.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "\"تتمثَّل في\" و\"حاصلة على\" و\"مقارنةً بـ\" — لغة تجارية رسمية متقدمة."
          },
          {
            "text": "مشروعنا أرخص وأحسن من غيره لأن التقنية لدينا أقوى.",
            "translation": "Our project is cheaper and better than others because our technology is stronger.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "\"أرخص وأحسن\" وصف عامي — قل \"يتميَّز بانخفاض التكاليف وتفوُّق المنصة التقنية\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "ما حجم الاستثمار المطلوب وما الجدول الزمني المتوقَّع لتحقيق الربحية؟",
        "translation": "What is the required investment amount and what is the expected timeline for achieving profitability?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Present your financial projections:",
        "options": [
          {
            "text": "نطلب تمويلاً بقيمة خمسة ملايين ريال على مرحلتين، ويُتوقَّع بلوغ نقطة التعادل في الربع الثالث من العام الثاني وفق نماذج الإيرادات المُعدَّة.",
            "translation": "We request financing of five million riyals in two stages, and the breakeven point is expected to be reached in the third quarter of the second year according to the prepared revenue models.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "\"يُتوقَّع\" و\"المُعدَّة\" مبني للمجهول — عرض مالي رسمي دقيق ومقنع."
          },
          {
            "text": "نحتاج خمسة ملايين ونكسب من الربع الثالث.",
            "translation": "We need five million and we profit from the third quarter.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "مختصر جداً وغير رسمي — في العرض الاستثماري فصِّل وأكِّد الأرقام بمصطلحات مالية."
          },
          {
            "text": "يُطلَب استثمار أولي قدره خمسة ملايين ريال لإطلاق المرحلتين الأولى والثانية وتحقيق الربحية في غضون عامين.",
            "translation": "An initial investment of five million riyals is requested to launch the first and second phases and achieve profitability within two years.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "\"يُطلَب\" مبني للمجهول صحيح — صياغة رسمية واضحة ومقنعة."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "هل أُجريت دراسة جدوى مُعتمَدة من جهة محايدة؟",
        "translation": "Was a feasibility study conducted accredited by a neutral party?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Confirm the feasibility study:",
        "options": [
          {
            "text": "نعم، أُعِدَّت دراسة الجدوى من قِبَل شركة استشارات مستقلة مُعتمَدة لدى وزارة التجارة، وتوصَّلت نتائجها إلى إمكانية تحقيق عائد استثماري يتجاوز ثلاثين بالمائة.",
            "translation": "Yes, the feasibility study was prepared by an independent consulting firm accredited with the Ministry of Commerce, and its findings concluded the possibility of achieving an investment return exceeding thirty percent.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "\"أُعِدَّت\" و\"توصَّلت\" مبني للمجهول — استخدام ممتاز للفعل المجهول في السياق التجاري الرسمي."
          },
          {
            "text": "أيوه، عملنا دراسة وطلعت النتايج زينة.",
            "translation": "Yes, we did a study and the results came out good.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"أيوه\" و\"زينة\" و\"طلعت\" عامية — قل \"نعم، أُعدَّت دراسة الجدوى وكانت النتائج إيجابية\"."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "شكراً على هذا العرض المنظَّم. سيُناقَش المشروع في اجتماع اللجنة القادم وستُبلَّغ بالقرار خلال أسبوعين. نتطلع إلى شراكة مثمرة.",
        "translation": "Thank you for this organized presentation. The project will be discussed at the next committee meeting and you will be notified of the decision within two weeks. We look forward to a fruitful partnership.",
        "end": true
      }
    ],
    "completionMessage": "Excellent business pitch in formal MSA. You correctly used passive voice for financial projections and maintained professional register throughout."
  },
  {
    "id": "saudi_convo_p9_radio_interview",
    "phase": 9,
    "title": "Radio Interview",
    "description": "Participate in a live radio interview about social issues using formal MSA.",
    "focalWordIds": [
      "w_society",
      "w_issue",
      "w_opinion",
      "w_future",
      "w_responsibility",
      "w_change",
      "w_community",
      "w_solution"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "مستمعينا الكرام، يسعدنا استضافة ضيفنا الذي سيُدلي برأيه في أبرز القضايا الاجتماعية المُطروحة. أهلاً بك.",
        "translation": "Dear listeners, we are pleased to host our guest who will give his opinion on the most prominent social issues being discussed. Welcome.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Greet the audience formally:",
        "options": [
          {
            "text": "شكراً جزيلاً على هذه الاستضافة الكريمة. يسعدني أن أتحدث إلى مستمعيكم حول القضايا التي تؤثر في مجتمعنا تأثيراً مباشراً.",
            "translation": "Thank you very much for this generous hosting. I am pleased to speak to your listeners about issues that directly affect our society.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"تأثيراً مباشراً\" توكيد رسمي ممتاز — استخدمت المفعول المطلق بطريقة صحيحة."
          },
          {
            "text": "شكراً، أنا مبسوط أني هنا أتكلم معكم.",
            "translation": "Thanks, I'm happy to be here talking with you.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"مبسوط\" و\"أتكلم معكم\" عاميتان — في البرامج الرسمية استخدم \"يسعدني\" و\"أتحدث إلى مستمعيكم\"."
          },
          {
            "text": "الشكر لكم على هذه الفرصة التي تُتاح لمناقشة قضايا تمسّ شريحة واسعة من أبناء المجتمع.",
            "translation": "Thanks to you for this opportunity that is provided to discuss issues that touch a wide segment of community members.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"تُتاح\" مبني للمجهول و\"شريحة واسعة من أبناء المجتمع\" مصطلح إعلامي رسمي دقيق."
          },
          {
            "text": "يسرني الحضور، أبغى أتكلم عن مشاكل الشباب.",
            "translation": "I'm pleased to attend, I want to talk about youth problems.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أبغى\" عامية — استخدم \"أودّ الحديث عن تحديات الشباب\" في السياق الإذاعي الرسمي."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ما تقييمك للتحولات الاجتماعية الكبرى التي يشهدها المجتمع في السنوات الأخيرة؟",
        "translation": "How do you assess the major social transformations being witnessed by society in recent years?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "دعنا نبدأ بسؤال محوري: كيف تنظر إلى التغيرات التي تحدث في مجتمعنا اليوم؟",
        "translation": "Let us begin with a pivotal question: how do you view the changes happening in our society today?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give your analysis of social change:",
        "options": [
          {
            "text": "يمر مجتمعنا بمرحلة تحوُّل بنيوي عميق تتشابك فيه تأثيرات العولمة والتكنولوجيا والتحولات الديموغرافية التي تستوجب إعادة النظر في منظومة القيم الجمعية.",
            "translation": "Our society is passing through a deep structural transformation phase in which the influences of globalization, technology, and demographic shifts intertwine, requiring reconsideration of the collective values system.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "\"تستوجب\" و\"تتشابك فيه\" جُمَل وصفية رسمية تدل على تمكُّن لغوي متقدم."
          },
          {
            "text": "المجتمع تغيَّر كثير والناس صاروا مختلفين وعندهم أفكار جديدة.",
            "translation": "Society has changed a lot and people have become different and have new ideas.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "مقبول لكن عامي جداً — في البرامج الإذاعية الرسمية أضف عمقاً تحليلياً ومصطلحات اجتماعية."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "يُلاحَظ أن الجيل الشاب يحمل توقعات مغايرة لما كانت عليه الأجيال السابقة. ما رأيك في هذه الظاهرة؟",
        "translation": "It is noted that the young generation carries expectations different from what previous generations had. What is your view on this phenomenon?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Discuss generational change formally:",
        "options": [
          {
            "text": "هذه الظاهرة طبيعية ومتوقَّعة في سياق المجتمعات المتطورة. الجيل الجديد الذي تشرَّب قيم الانفتاح يسعى إلى المشاركة الفاعلة في صنع القرار.",
            "translation": "This phenomenon is natural and expected in the context of developing societies. The new generation that has absorbed values of openness seeks effective participation in decision-making.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "\"تشرَّب\" استعارة جميلة، و\"المشاركة الفاعلة في صنع القرار\" مصطلح سياسي اجتماعي رسمي."
          },
          {
            "text": "الشباب الحين يبون أشياء كثيرة ويبون يشاركون في كل شيء.",
            "translation": "Youth nowadays want many things and want to participate in everything.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "\"يبون\" عامية سعودية — في البرامج الرسمية قل \"يسعى الشباب إلى\" أو \"يطمح الجيل الجديد إلى\"."
          },
          {
            "text": "يتطلع الشباب الذي نشأ في عصر الرقمنة إلى قيادة التغيير لا الاكتفاء بالمتابعة السلبية.",
            "translation": "Youth who grew up in the age of digitization aspire to lead change rather than suffice with passive observation.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "\"الذي نشأ في\" جملة وصلية رسمية ممتازة، و\"الاكتفاء بالمتابعة السلبية\" تعبير راقٍ."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "ما الدور الذي يجب أن تضطلع به المؤسسات لمواكبة هذه التحولات؟",
        "translation": "What role should institutions undertake to keep pace with these transformations?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Recommend institutional responses:",
        "options": [
          {
            "text": "يُناط بالمؤسسات التعليمية والإعلامية مسؤولية إعداد منظومة متكاملة تُقدِّر الكفاءة وتُرسِّخ قيم الانتماء والمواطنة الفاعلة.",
            "translation": "Educational and media institutions are entrusted with the responsibility of preparing an integrated system that values competence and consolidates values of belonging and active citizenship.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "\"يُناط بـ\" تعبير رسمي نادر وراقٍ، و\"منظومة متكاملة\" مصطلح مؤسسي دقيق."
          },
          {
            "text": "الجامعات والإعلام لازم يساعدون الشباب ويعطوهم فرص أكثر.",
            "translation": "Universities and media must help youth and give them more opportunities.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"لازم\" و\"يعطوهم\" عاميتان — استخدم \"يجب على\" و\"يمنحوهم\" في السياق الرسمي."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "كلمات مثيرة للتأمل. أشكرك على هذه الرؤية التحليلية العميقة وآراؤك القيِّمة التي أُذيعت على نطاق واسع. نتشرف باستضافتك مجدداً.",
        "translation": "Thought-provoking words. I thank you for this deep analytical vision and your valuable opinions that have been broadcast widely. We are honored to host you again.",
        "end": true
      }
    ],
    "completionMessage": "Excellent radio interview performance. You maintained formal MSA register throughout and used advanced constructions like passive voice and relative clauses appropriately."
  },
  {
    "id": "saudi_convo_p9_ministry_complaint",
    "phase": 9,
    "title": "Ministry Complaint",
    "description": "File a formal complaint at a government ministry about a public service issue.",
    "focalWordIds": [
      "w_complaint",
      "w_official",
      "w_government",
      "w_service",
      "w_rights",
      "w_department",
      "w_response",
      "w_regulation"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً بك في مكتب استقبال الشكاوى والمقترحات. ما موضوع تظلُّمك؟",
        "translation": "Welcome to the complaints and suggestions reception office. What is the subject of your grievance?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "State your complaint formally:",
        "options": [
          {
            "text": "أودّ تقديم شكوى رسمية بشأن تعطُّل الخدمة المُقدَّمة من الجهة الحكومية المعنية على مدى ثلاثة أشهر دون معالجة أو استجابة فعلية.",
            "translation": "I wish to file a formal complaint regarding the disruption of the service provided by the relevant government authority for three months without actual processing or response.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"تقديم شكوى رسمية بشأن\" هو الأسلوب الرسمي الصحيح لتقديم الشكاوى الحكومية."
          },
          {
            "text": "جيت أشتكي لأن الحكومة ما ساعدتني من ثلاثة أشهر.",
            "translation": "I came to complain because the government hasn't helped me for three months.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أشتكي\" و\"ما ساعدتني\" عاميتان — في المكاتب الحكومية قل \"أودّ تقديم شكوى بشأن تعطُّل الخدمة\"."
          },
          {
            "text": "أتقدَّم بهذه الشكوى الرسمية إزاء تقصير الجهة المختصة في تقديم الخدمة الإلزامية التي يكفلها النظام.",
            "translation": "I submit this formal complaint regarding the shortcoming of the competent authority in providing the mandatory service guaranteed by regulations.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"إزاء\" بدلاً من \"بشأن\" و\"التي يكفلها النظام\" جملة وصلية رسمية ممتازة."
          },
          {
            "text": "عندي مشكلة مع الدائرة الحكومية ويبون يتجاهلونني.",
            "translation": "I have a problem with the government department and they want to ignore me.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"يبون\" و\"يتجاهلونني\" عاميتان — قل \"قامت الجهة المعنية بالتقصير في الاستجابة\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "يُرجى تحديد الجهة الحكومية المعنية وتفصيل طبيعة التقصير الذي حدث.",
        "translation": "Please specify the relevant government authority and detail the nature of the shortcoming that occurred.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "أحتاج إلى بيانات أوضح. ما الجهة الحكومية وما الخدمة التي تعطَّلت تحديداً؟",
        "translation": "I need clearer information. What is the government authority and what specific service was disrupted?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Provide specific details of the complaint:",
        "options": [
          {
            "text": "تقصير أمانة المنطقة في صيانة شبكة الصرف الصحي التي تُشير الوثائق المُقدَّمة إلى أنها مُهمَلة منذ ما يزيد على ثلاثة أشهر مع الإخلال بمعايير الصحة العامة.",
            "translation": "The shortcoming of the regional municipality in maintaining the sewage network which the submitted documents indicate has been neglected for more than three months with violation of public health standards.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "\"التي تُشير الوثائق المُقدَّمة إلى أنها\" جملة وصلية موسَّعة ممتازة تُظهر تمكُّناً في الفصحى."
          },
          {
            "text": "أمانة المدينة ما نظَّفت شبكة المجاري من ثلاثة أشهر وهذا غلط.",
            "translation": "The city municipality hasn't cleaned the sewage network for three months and this is wrong.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "\"المجاري\" عامية — استخدم \"شبكة الصرف الصحي\"، و\"هذا غلط\" ضعيف — قل \"مما يُعدّ مخالفةً صريحة\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "سيُسجَّل تظلُّمك ويُحال إلى الجهة المختصة. يُمنح رقم مرجعي لمتابعة الشكوى إلكترونياً.",
        "translation": "Your grievance will be recorded and referred to the competent authority. A reference number will be granted for following up on the complaint electronically.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Ask about resolution timeline:",
        "options": [
          {
            "text": "ما المدة المنصوص عليها في الأنظمة للردّ الرسمي على الشكاوى، وما الإجراء المتَّبَع عند تجاوز هذه المدة؟",
            "translation": "What is the period stipulated in the regulations for official response to complaints, and what is the procedure followed when this period is exceeded?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "\"المنصوص عليها\" و\"المتَّبَع\" مبني للمجهول — سؤال رسمي متقدم يُظهر معرفة بالحقوق القانونية."
          },
          {
            "text": "كم يوم عندهم للرد؟ وإذا ما ردوا وش أسوي؟",
            "translation": "How many days do they have to respond? And if they don't respond what do I do?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "\"وش أسوي\" عامية — قل \"ما الخطوة التالية في حال عدم الاستجابة؟\""
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "يُحدَّد بخمسة عشر يوم عمل وفق لائحة الشكاوى الصادرة عن ديوان المظالم. وفي حال الإخلال يُمكِّنك رفع شكوى استئنافية.",
        "translation": "It is set at fifteen working days according to the complaints regulation issued by the Board of Grievances. In case of violation you are enabled to file an appellate complaint.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Confirm and ask for documentation:",
        "options": [
          {
            "text": "هل يمكن إصدار وثيقة رسمية تُثبت تسجيل الشكوى وتاريخها للاحتجاج بها عند الحاجة؟",
            "translation": "Can an official document be issued proving the complaint registration and its date to use as evidence when needed?",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "\"للاحتجاج بها\" تعبير قانوني رسمي ممتاز يعكس وعياً بالحقوق الإجرائية."
          },
          {
            "text": "أبغى ورقة تقول إني اشتكيت.",
            "translation": "I want a paper saying I complained.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"أبغى\" عامية — قل \"أودّ الحصول على إيصال رسمي يُثبت تسجيل الشكوى\"."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "تصدر وثيقة التسجيل آلياً عبر البوابة الإلكترونية ويُرسَل إليك نسخة منها فور إتمام القيد. حقوقك مكفولة بموجب الأنظمة المعمول بها.",
        "translation": "The registration document is issued automatically through the electronic portal and a copy will be sent to you immediately upon completing registration. Your rights are guaranteed under applicable regulations.",
        "end": true
      }
    ],
    "completionMessage": "Well done navigating a formal government complaint in MSA. Your use of legal and administrative vocabulary and passive constructions was accurate throughout."
  },
  {
    "id": "saudi_convo_p9_bank_loan_application",
    "phase": 9,
    "title": "Bank Loan Application",
    "description": "Apply for a business loan at a bank using formal MSA.",
    "focalWordIds": [
      "w_financial",
      "w_bank",
      "w_loan",
      "w_guarantee",
      "w_income",
      "w_period",
      "w_amount",
      "w_approve"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً بك في قسم تمويل الأعمال. ما نوع التمويل الذي تسعى إليه؟",
        "translation": "Welcome to the Business Finance Department. What type of financing do you seek?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "State your loan request formally:",
        "options": [
          {
            "text": "أتقدَّم بطلب للحصول على تمويل تجاري بغرض توسعة منشأتي الإنتاجية وتحديث البنية التحتية اللازمة للنمو.",
            "translation": "I am applying for commercial financing for the purpose of expanding my production facility and modernizing the infrastructure necessary for growth.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"أتقدَّم بطلب\" هو التعبير الرسمي الصحيح لتقديم طلب القرض في البنوك."
          },
          {
            "text": "أبغى قرض للتوسع في مشروعي.",
            "translation": "I want a loan for expanding my project.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أبغى\" و\"قرض\" عاميتان نسبياً — في البنوك الرسمية استخدم \"أتقدَّم بطلب تمويل\" لغرض كذا."
          },
          {
            "text": "أودّ تقديم طلب لتمويل مشروع توسعي يندرج ضمن استراتيجية النمو المؤسسي للشركة.",
            "translation": "I wish to submit an application for financing an expansion project that falls within the company's institutional growth strategy.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"يندرج ضمن\" تعبير رسمي متقدم يُبيِّن الإطار الاستراتيجي للطلب."
          },
          {
            "text": "جيت عشان آخذ قرض كبير للمشروع.",
            "translation": "I came to take a big loan for the project.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"جيت عشان آخذ\" عامي — في البنك الرسمي قل \"أودّ تقديم طلب للحصول على تمويل\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "ما الحجم التمويلي المطلوب والمدة الزمنية التي تتوقعها لسداد القرض؟",
        "translation": "What is the required financing amount and what repayment period do you anticipate?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "بإمكانك التأهُّل للتمويل. هل تخبرني بالمبلغ المطلوب ومدة السداد المقترحة؟",
        "translation": "You can qualify for financing. Can you tell me the required amount and proposed repayment period?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Specify the loan details:",
        "options": [
          {
            "text": "أطلب تمويلاً بقيمة مليوني ريال يُسدَّد على مدى خمس سنوات وفق جدول دفعات يُعدَّل سنوياً بحسب الأداء المالي للمنشأة.",
            "translation": "I request financing of two million riyals to be repaid over five years according to a payment schedule adjusted annually based on the facility's financial performance.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "\"يُسدَّد\" و\"يُعدَّل\" مبني للمجهول — استخدام دقيق ومتقدم في السياق المالي الرسمي."
          },
          {
            "text": "مليونين ريال وأسدد في خمس سنوات.",
            "translation": "Two million riyals and I'll repay in five years.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "مقبول لكن بأسلوب عامي — فصِّل شروط السداد وأضف مصطلحات مالية لزيادة المصداقية."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "هل بحوزتك ضمانات مقبولة لدى البنك، كعقار أو أسهم، وما مصادر دخلك الرئيسية؟",
        "translation": "Do you have guarantees acceptable to the bank, such as real estate or shares, and what are your main income sources?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Present your collateral and income:",
        "options": [
          {
            "text": "نعم، بحوزتي عقار تجاري مسجَّل في كتابة العدل تبلغ قيمته التقديرية ثلاثة ملايين ريال، فضلاً عن إيرادات سنوية موثَّقة تتجاوز خمسمائة ألف ريال.",
            "translation": "Yes, I have a commercial property registered at the notary with an estimated value of three million riyals, in addition to documented annual revenues exceeding five hundred thousand riyals.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "\"مسجَّل في كتابة العدل\" و\"القيمة التقديرية\" و\"فضلاً عن\" — مصطلحات مالية ورسمية دقيقة جداً."
          },
          {
            "text": "عندي بيت وشركتي فيها دخل كويس كل سنة.",
            "translation": "I have a house and my company has good income every year.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "\"عندي بيت\" غير رسمي — قل \"بحوزتي عقار\" وحدِّد الإيرادات بأرقام موثَّقة."
          },
          {
            "text": "أمتلك حصصاً في شركة قيمتها السوقية تتجاوز المبلغ المطلوب، ودخلاً تجارياً منتظماً يُثبت ملاءتي المالية.",
            "translation": "I own shares in a company whose market value exceeds the required amount, and regular commercial income that proves my financial solvency.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "\"الملاءة المالية\" مصطلح بنكي رسمي ممتاز يُثبت تمكُّناً من لغة التمويل."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "سيُراجَع الطلب من قِبَل لجنة الائتمان وستُبلَّغ بالقرار خلال سبعة أيام عمل. هل لديك أسئلة؟",
        "translation": "The application will be reviewed by the credit committee and you will be notified of the decision within seven working days. Do you have questions?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Ask about the interest rate formally:",
        "options": [
          {
            "text": "ما نسبة هامش الربح المعمول بها على هذا النوع من التمويل، وهل تُوجَد خيارات للتمويل الإسلامي الخالي من الفائدة؟",
            "translation": "What is the profit margin rate applied to this type of financing, and are there options for Islamic interest-free financing?",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "\"هامش الربح\" بدلاً من \"الفائدة\" مصطلح مالي إسلامي دقيق، و\"تُوجَد خيارات\" مبني للمجهول."
          },
          {
            "text": "كم الفايدة؟ وفي إسلامي بدون ربا؟",
            "translation": "What's the interest? Is there an Islamic one without usury?",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"الفايدة\" عامي — استخدم \"هامش الربح\" أو \"معدل العائد\"، وصُغ السؤال بشكل رسمي."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "يُطبَّق على التمويل الإسلامي عقد المرابحة بهامش ربح يتراوح بين ثلاثة وستة بالمائة سنوياً وفق التقييم الائتماني. سيُوضَح ذلك في العرض الرسمي المُرسَل إليك.",
        "translation": "Islamic financing applies the Murabaha contract with a profit margin ranging between three and six percent annually according to the credit assessment. This will be clarified in the formal offer sent to you.",
        "end": true
      }
    ],
    "completionMessage": "Excellent bank loan application. You used formal financial terminology correctly including Islamic finance terms and passive constructions throughout."
  },
  {
    "id": "saudi_convo_p9_real_estate_purchase",
    "phase": 9,
    "title": "Real Estate Purchase",
    "description": "Negotiate the purchase of a commercial property through formal legal and real estate procedures.",
    "focalWordIds": [
      "w_property",
      "w_price",
      "w_contract",
      "w_ownership",
      "w_register",
      "w_condition",
      "w_negotiate",
      "w_value"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً بك في مكتبنا العقاري. يُسعدنا مساعدتك في إتمام الصفقة العقارية. ما الذي يستأثر باهتمامك؟",
        "translation": "Welcome to our real estate office. We are pleased to help you complete the real estate transaction. What draws your interest?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Express interest in purchasing formally:",
        "options": [
          {
            "text": "أودّ الاستفسار عن إجراءات شراء العقار التجاري الذي أُعلن عنه في صحيفتكم الإلكترونية، ولا سيَّما ما يتعلق بشروط العقد وحقوق الملكية.",
            "translation": "I wish to inquire about the procedures for purchasing the commercial property announced in your electronic publication, especially regarding the contract conditions and ownership rights.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"ولا سيَّما\" تعبير رسمي راقٍ بمعنى \"خاصةً\"، واستخدمت \"أُعلن عنه\" مبني للمجهول بشكل صحيح."
          },
          {
            "text": "شفت عقار عندكم وأبغى أشتريه، وش الشروط؟",
            "translation": "I saw a property with you and I want to buy it, what are the conditions?",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أبغى\" و\"وش الشروط\" عاميتان — قل \"أودّ الاستفسار عن إجراءات الشراء والشروط التعاقدية\"."
          },
          {
            "text": "يهمني اقتناء العقار التجاري المعروض وأطلب الاطلاع على شروطه القانونية والمالية كاملةً.",
            "translation": "I am interested in acquiring the offered commercial property and I request to review its complete legal and financial conditions.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"اقتناء\" أرقى من \"شراء\" في السياق الرسمي، و\"المعروض\" مبني للمجهول."
          },
          {
            "text": "أبغى أعرف السعر وكيف أسجله باسمي.",
            "translation": "I want to know the price and how to register it in my name.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أبغى أعرف\" عامي — استخدم \"أودّ الاستعلام عن السعر وإجراءات نقل الملكية\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "هذا العقار التجاري البالغة مساحته ألف متر مربع قيمته المطلوبة خمسة ملايين ريال. يُشترط إجراء فحص هندسي مُعتمَد قبل توقيع العقد.",
        "translation": "This commercial property with an area of one thousand square meters has an asking price of five million riyals. An accredited engineering inspection is required before signing the contract.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "العقار بخمسة ملايين ريال ومساحته ألف متر. لكي يُتمَّ البيع رسمياً يلزم فحص هندسي وعقد موثَّق.",
        "translation": "The property is five million riyals with an area of one thousand square meters. For the sale to be officially completed, an engineering inspection and documented contract are required.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Negotiate the price formally:",
        "options": [
          {
            "text": "السعر المطلوب يتجاوز التقييم السوقي المعتاد لهذه المنطقة. أُقترح مراجعته في ضوء التقرير الهندسي المُستقل الذي سيُعدّ على نفقتي.",
            "translation": "The asking price exceeds the usual market valuation for this area. I propose reviewing it in light of the independent engineering report to be prepared at my expense.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "\"أُقترح مراجعته\" تفاوض رسمي حضاري، و\"سيُعدّ\" مبني للمجهول صحيح."
          },
          {
            "text": "السعر عالي، أقدر أنزِّله شوي؟",
            "translation": "The price is high, can I lower it a bit?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "\"أنزِّله شوي\" عامي — في التفاوض الرسمي قل \"أودّ مناقشة السعر في ضوء التقييم السوقي\"."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "هذا طلب معقول. يُمكِن تعيين خبير تقييم مُعتمَد لدى وزارة العدل لتحديد القيمة الفعلية بشكل موضوعي.",
        "translation": "That is a reasonable request. It is possible to appoint an appraiser accredited with the Ministry of Justice to determine the actual value objectively.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Ask about ownership transfer procedures:",
        "options": [
          {
            "text": "ما الإجراءات المتَّبَعة لنقل الملكية رسمياً، وهل تُوجَد رسوم حكومية تترتَّب على تسجيل العقار؟",
            "translation": "What are the procedures followed for officially transferring ownership, and are there government fees resulting from property registration?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "\"المتَّبَعة\" و\"تُوجَد\" مبني للمجهول — سؤال رسمي دقيق يُظهر فهم إجراءات التسجيل العقاري."
          },
          {
            "text": "كيف أنقل العقار لاسمي وكم الرسوم؟",
            "translation": "How do I transfer the property to my name and how much are the fees?",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "مقبول لكن عامي — قل \"ما إجراءات نقل الملكية وما الرسوم المترتبة؟\""
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "تُنقَل الملكية عبر كتابة العدل بعد سداد رسم التسجيل البالغ اثنين ونصف بالمائة من قيمة العقد. يُستغرق الإجراء ثلاثة أيام عمل.",
        "translation": "Ownership is transferred through the notary after paying the registration fee of two and a half percent of the contract value. The procedure takes three working days.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Confirm your intention to proceed:",
        "options": [
          {
            "text": "بناءً على نتائج التقييم الهندسي المستقل، أُعلن موافقتي المبدئية على المضي في إجراءات الشراء وتوقيع عقد البيع المعتمَد.",
            "translation": "Based on the results of the independent engineering assessment, I declare my preliminary approval to proceed with the purchase procedures and sign the accredited sale contract.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "\"بناءً على\" و\"أُعلن موافقتي المبدئية\" — تعبيرات تعاقدية رسمية ممتازة."
          },
          {
            "text": "زين، إذا التقييم طلع معقول أوافق وأوقع العقد.",
            "translation": "Good, if the assessment comes out reasonable I'll agree and sign the contract.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"زين\" و\"طلع معقول\" عاميتان — في العقود الرسمية استخدم \"في حال اعتدال نتائج التقييم أُبدي موافقتي\"."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "ممتاز. سيُرتَّب موعد التقييم ويُوقَّع الاتفاق الابتدائي بحضور مستشار قانوني. نتطلع إلى إتمام هذه الصفقة بنجاح.",
        "translation": "Excellent. The assessment appointment will be arranged and the preliminary agreement will be signed in the presence of a legal adviser. We look forward to successfully completing this transaction.",
        "end": true
      }
    ],
    "completionMessage": "Outstanding real estate negotiation in formal MSA. You correctly used passive voice for legal procedures and maintained formal register throughout the transaction."
  },
  {
    "id": "saudi_convo_p9_speech_at_event",
    "phase": 9,
    "title": "Speech at Formal Event",
    "description": "Deliver and respond to a formal speech at a national conference in MSA.",
    "focalWordIds": [
      "w_honor",
      "w_achievement",
      "w_nation",
      "w_progress",
      "w_responsibility",
      "w_future",
      "w_leader",
      "w_vision"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تشرَّف المؤتمر باستضافتكم. يُتشوَّق الحضور لكلمتكم حول رؤية المملكة للتنمية المستدامة. تفضلوا بالحديث.",
        "translation": "The conference is honored by your presence. The audience eagerly awaits your speech on the Kingdom's vision for sustainable development. Please speak.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Open your speech formally:",
        "options": [
          {
            "text": "أصحاب المعالي والسعادة، أيها الحضور الكريم، يسعدني أن أُخاطبكم في هذا الملتقى المتميَّز الذي يُعقد في وقت تشهد فيه بلادنا تحولات تاريخية غير مسبوقة.",
            "translation": "Your Excellencies and Honorables, esteemed attendees, it pleases me to address you in this distinguished forum being held at a time when our country witnesses unprecedented historical transformations.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"أيها الحضور الكريم\" افتتاح خطابي رسمي كلاسيكي، و\"يُعقد\" مبني للمجهول صحيح."
          },
          {
            "text": "مرحبا بالجميع، أنا مسرور إني هنا أتكلم معكم عن رؤية المملكة.",
            "translation": "Hello everyone, I'm happy to be here talking with you about the Kingdom's vision.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"مرحبا\" و\"مسرور إني هنا\" غير رسميتين للمؤتمرات — افتتح بـ\"أيها الحضور الكريم\" وألقاب رسمية."
          },
          {
            "text": "يُشرِّفني أن أقف أمام هذا الجمع النخبوي لأُسهم في الحوار الوطني حول مستقبل التنمية.",
            "translation": "It honors me to stand before this elite gathering to contribute to the national dialogue on the future of development.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "\"يُشرِّفني\" و\"الجمع النخبوي\" و\"الحوار الوطني\" — مصطلحات خطابية رسمية متقدمة."
          },
          {
            "text": "كلنا مبسوطين في هذا المؤتمر ونبي نتكلم عن رؤية 2030.",
            "translation": "We're all happy at this conference and we want to talk about Vision 2030.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"مبسوطين\" و\"نبي\" عاميتان — في الخطابات الرسمية لا يُقبل الأسلوب العامي أبداً."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "كلمات مُوحية. كيف توصف ما أُنجز في إطار رؤية 2030 خلال السنوات الماضية؟",
        "translation": "Inspiring words. How do you describe what has been accomplished within Vision 2030 during past years?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "شكراً. هل بإمكانك تناول ما تحقَّق في إطار رؤية التنمية بأسلوب أكثر رسمية؟",
        "translation": "Thank you. Can you address what has been achieved within the development vision in a more formal manner?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Describe national achievements formally:",
        "options": [
          {
            "text": "حُقِّقت في إطار الرؤية إنجازات نوعية يُشهد لها على المستوى الدولي، إذ وُضعت المملكة في مصافّ الاقتصادات الأسرع نمواً كما أُعلن في التقارير الدولية الكبرى.",
            "translation": "Qualitative achievements have been accomplished within the Vision framework that are internationally recognized, as the Kingdom has been placed among the fastest-growing economies as announced in major international reports.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "\"حُقِّقت\" و\"وُضعت\" و\"أُعلن\" — ثلاثة أفعال مبني للمجهول في جملة واحدة تعكس إتقاناً للفصحى الرسمية."
          },
          {
            "text": "رؤية 2030 حققت أشياء كثيرة وصارت المملكة معروفة أكثر في العالم.",
            "translation": "Vision 2030 achieved many things and the Kingdom became more known in the world.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "عامي وضعيف للخطاب الرسمي — استخدم مبني للمجهول وأرقاماً وتعابير راسخة."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "ما التحديات التي لا تزال تواجه مسيرة التنمية وفق تقديرك؟",
        "translation": "What challenges still face the development march according to your assessment?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Discuss development challenges formally:",
        "options": [
          {
            "text": "يُعدّ توطين الكفاءات الوطنية وتحقيق توازن بين متطلبات التنويع الاقتصادي وضغوط المرحلة الانتقالية من أبرز التحديات التي تستوجب التصدي لها بمقاربات مبتكرة.",
            "translation": "Localizing national competencies and achieving a balance between economic diversification requirements and transitional phase pressures are among the most prominent challenges that require being addressed with innovative approaches.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "\"يُعدّ\" مبني للمجهول و\"تستوجب التصدي لها\" — خطاب تنموي رسمي على أعلى مستوى."
          },
          {
            "text": "في تحديات كثيرة مثل البطالة وما فيه ما يكفي من وظايف للسعوديين.",
            "translation": "There are many challenges like unemployment and there aren't enough jobs for Saudis.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "\"ما فيه\" و\"وظايف\" عاميتان — في الخطاب الوطني الرسمي استخدم \"البطالة الهيكلية\" و\"فرص العمل للمواطنين\"."
          },
          {
            "text": "لا يخفى على المتتبعين أن تحديات التحول الهيكلي تظل ماثلة وتستوجب رصانةً في التخطيط وصبراً استراتيجياً.",
            "translation": "It is not hidden from observers that structural transformation challenges remain present and require planning soundness and strategic patience.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "\"لا يخفى على المتتبعين\" ترقية خطابية، و\"تظل ماثلة\" تعبير خطابي راقٍ."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "ما رسالتك لجيل الشباب الذين هم عدَّة الوطن ومستقبله؟",
        "translation": "What is your message to the youth generation who are the nation's asset and its future?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Deliver a formal message to youth:",
        "options": [
          {
            "text": "أُوصي شباب هذا الوطن بأن يستلهموا من إرث أسلافهم حافزاً للإبداع، وأن يُدركوا أن التاريخ يُصنَع بالعمل الجاد والانتماء الصادق لا بالانتظار السلبي.",
            "translation": "I advise the youth of this nation to draw inspiration from their ancestors' legacy as a motivation for creativity, and to realize that history is made through hard work and sincere belonging, not passive waiting.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "\"يُصنَع\" مبني للمجهول ممتاز، و\"يستلهموا\" فعل أسلوبي خطابي راقٍ."
          },
          {
            "text": "قول للشباب إن يشتغلون كثير ويحبون وطنهم.",
            "translation": "Tell the youth to work a lot and love their homeland.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"قول\" و\"يشتغلون\" عاميتان — في الخطاب الرسمي استخدم \"أُوصي الشباب بالعمل الدؤوب وتعزيز الانتماء\"."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "كلمة تليق بعظمة هذا المنبر. أُعلَن إشادة المؤتمر بهذه الرؤية الاستراتيجية المتكاملة، وسيُتضمَّن خطابكم في وثيقة المؤتمر الختامية. شكراً جزيلاً.",
        "translation": "A speech befitting the greatness of this podium. The conference's commendation of this integrated strategic vision is declared, and your speech will be included in the conference's closing document. Thank you very much.",
        "end": true
      }
    ],
    "completionMessage": "Exceptional formal speech performance. You mastered the high register of national conference oratory with passive voice, relative clauses, and elevated vocabulary throughout."
  },
  {
    "id": "saudi_convo_p9_news_interview",
    "phase": 9,
    "title": "News Interview",
    "description": "A journalist interviews you about a recent government policy. Respond in formal MSA register.",
    "focalWordIds": [
      "w_news",
      "w_khabar",
      "w_siyaasa",
      "w_govt",
      "w_opinion",
      "w_debate",
      "w_freedom",
      "w_rights"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "مرحباً بكم في هذه المقابلة. نودّ أن نسألكم عن رأيكم في السياسة الإعلامية الجديدة التي أُعلن عنها الأسبوع الماضي.",
        "translation": "Welcome to this interview. We would like to ask you about your opinion on the new media policy that was announced last week.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "How do you open your response formally?",
        "options": [
          {
            "text": "شكراً جزيلاً على هذه الدعوة الكريمة. بالنسبة للسياسة الإعلامية الجديدة، أرى أنها تستحق نقاشاً مستفيضاً.",
            "translation": "Thank you very much for this gracious invitation. Regarding the new media policy, I believe it deserves thorough discussion.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! افتتاح رسمي بشكل كامل مع استخدام \"أرى\" بدلاً من \"أشوف\"."
          },
          {
            "text": "زين، أبغى أقول إن السياسة هذي ما تكفي.",
            "translation": "OK, I want to say this policy is not enough.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أبغى\" هي عامية سعودية غير مناسبة هنا — في السياق الرسمي استخدم \"أُريد\" أو \"أودّ\"."
          },
          {
            "text": "حسناً، السياسة الإعلامية التي يُشار إليها تُعتبر خطوة مهمة نحو تعزيز حرية التعبير.",
            "translation": "Well, the media policy being referred to is considered an important step towards enhancing freedom of expression.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! \"يُشار إليها\" و\"تُعتبر\" مبنيان للمجهول — استخدام MSA احترافي."
          },
          {
            "text": "ما فهمت وش تقصد بالضبط.",
            "translation": "I didn't understand exactly what you mean.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"ما فهمت\" و\"وش\" عاميتان — في المقابلة الرسمية قل \"لم أفهم تماماً ما تقصدون\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "هل تعتقدون أن هذه السياسة ستُعزّز حرية الصحافة، أم أنها تُقيّدها؟",
        "translation": "Do you believe this policy will enhance press freedom, or does it restrict it?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "دعونا نوضح: هذه السياسة تتعلق بتنظيم وسائل الإعلام الرقمية. ما رأيكم في مثل هذا التنظيم؟",
        "translation": "Let us clarify: this policy relates to regulating digital media. What is your opinion on such regulation?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Give your assessment of press freedom:",
        "options": [
          {
            "text": "أعتقد بشدة أن حرية الصحافة التي يكفلها القانون تُعتبر ركيزةً أساسية للمجتمع الديمقراطي.",
            "translation": "I strongly believe that press freedom guaranteed by law is considered a fundamental pillar of democratic society.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "رائع! \"أعتقد بشدة\" + صلة الموصول \"التي\" + المبني للمجهول \"تُعتبر\" — MSA على أعلى مستوى."
          },
          {
            "text": "الحرية مهمة بس لازم يكون في حدود.",
            "translation": "Freedom is important but there must be limits.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "\"بس\" و\"لازم\" عاميتان — في المقابلة الرسمية قل \"غير أنه ينبغي\" أو \"إلا أن ثمة\"."
          },
          {
            "text": "من الضروري أن تُصان حرية التعبير الصحفي، مع مراعاة المسؤولية الإعلامية.",
            "translation": "It is essential that journalistic freedom of expression is preserved, while taking media responsibility into account.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! \"من الضروري\" + المبني للمجهول \"تُصان\" — لغة رسمية متقنة."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "وهل ثمة نقاط محددة تودّون الإشارة إليها في هذه السياسة؟",
        "translation": "And are there specific points you would like to refer to in this policy?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Point to a specific concern:",
        "options": [
          {
            "text": "نعم، النقطة التي تستوقفني هي الفقرة المتعلقة بالمحتوى الرقمي الذي يُنشر عبر منصات التواصل.",
            "translation": "Yes, the point that gives me pause is the paragraph related to digital content that is published through social media platforms.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "ممتاز! \"التي تستوقفني\" و\"الذي يُنشر\" — استخدام موفق لأسماء الموصول والمبني للمجهول."
          },
          {
            "text": "عندي نقطة واحدة، وهي ما أدري ليش ما يوضحون الأمور أكثر.",
            "translation": "I have one point, which is I don't know why they don't clarify things more.",
            "nextStepId": "s7b",
            "correct": false,
            "feedback": "\"ما أدري\" عامية — استخدم \"لا أعلم\" في السياق الرسمي."
          },
          {
            "text": "أودّ الإشارة إلى بند الشفافية، إذ لم يُحدَّد بوضوح الجهة المسؤولة عن التطبيق.",
            "translation": "I would like to refer to the transparency clause, as the body responsible for implementation has not been clearly specified.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "رائع! \"إذ لم يُحدَّد\" مبني للمجهول MSA محترف."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "نقطة وجيهة. هل تعتقدون أن الرأي العام يدعم هذه السياسة؟",
        "translation": "A valid point. Do you believe that public opinion supports this policy?",
        "next": "s8"
      },
      {
        "id": "s7b",
        "speaker": "partner",
        "text": "شكراً. هل لديكم تعليق على موقف الرأي العام من هذه السياسة؟",
        "translation": "Thank you. Do you have a comment on public opinion's stance on this policy?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Comment on public opinion:",
        "options": [
          {
            "text": "الرأي العام الذي يُعبَّر عنه عبر وسائل التواصل يُشير إلى تباين واضح في المواقف.",
            "translation": "Public opinion as expressed through social media indicates a clear divergence in positions.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "ممتاز! \"الذي يُعبَّر عنه\" مبني للمجهول مع اسم موصول — MSA راقٍ."
          },
          {
            "text": "الناس ما راضيين بشكل عام عن الموضوع هذا.",
            "translation": "People are generally not satisfied with this matter.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"الناس ما راضيين\" عامية — قل \"لا يبدو أن المواطنين راضين\" أو \"يُلاحَظ عدم رضا المجتمع\"."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "شكراً جزيلاً على هذا التحليل المعمّق. كلامكم يُلقي الضوء على جوانب مهمة من هذه القضية.",
        "translation": "Thank you very much for this in-depth analysis. Your words shed light on important aspects of this issue.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You conducted a formal MSA news interview with passive voice, relative clauses, and register awareness."
  },
  {
    "id": "saudi_convo_p9_press_conference",
    "phase": 9,
    "title": "Press Conference",
    "description": "You attend a government press conference and ask questions as a journalist.",
    "focalWordIds": [
      "w_govt",
      "w_siyaasa",
      "w_news",
      "w_dawla",
      "w_economy",
      "w_opinion",
      "w_rights",
      "w_haqq"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أيها الحضور الكرام، أُعلن عن خطة اقتصادية جديدة ستُنفَّذ خلال السنوات الخمس القادمة. يسعدنا الإجابة عن أسئلتكم.",
        "translation": "Distinguished audience, a new economic plan has been announced which will be implemented over the next five years. We are pleased to answer your questions.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "How do you request to ask a question formally?",
        "options": [
          {
            "text": "أودّ أن أطرح سؤالاً إن أذنتم لي.",
            "translation": "I would like to pose a question if you permit me.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! \"أودّ\" + \"إن أذنتم\" — صياغة رسمية راقية."
          },
          {
            "text": "أبغى أسأل سؤال.",
            "translation": "I want to ask a question.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أبغى\" عامية سعودية — في المؤتمر الصحفي الرسمي استخدم \"أودّ\" أو \"أُريد\"."
          },
          {
            "text": "لديّ استفسار أودّ توجيهه حول الجدول الزمني للخطة.",
            "translation": "I have an inquiry I would like to direct regarding the timeline of the plan.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "رائع! \"لديّ استفسار\" + \"أودّ توجيهه\" — لغة صحفية رسمية مثالية."
          },
          {
            "text": "ممكن تقول لنا متى ينتهي المشروع؟",
            "translation": "Can you tell us when the project ends?",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"ممكن تقول\" عامية — الصيغة الرسمية هي \"هل بإمكانكم الإفادة عن...\" أو \"نودّ معرفة...\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "بالتأكيد. الخطة التي أُقرَّت تهدف إلى تنويع مصادر الدخل الوطني بعيداً عن النفط.",
        "translation": "Certainly. The plan that was approved aims to diversify national income sources away from oil.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "تفضل. الجدول الزمني المعتمد يمتد من عام ألفين وخمسة وعشرين حتى عام ألفين وثلاثين.",
        "translation": "Go ahead. The approved timeline extends from 2025 until 2030.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Follow up about the impact on citizens:",
        "options": [
          {
            "text": "كيف ستؤثر هذه الخطة على حقوق المواطن الاقتصادية التي يكفلها القانون؟",
            "translation": "How will this plan affect the economic rights of the citizen that are guaranteed by law?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! \"التي يكفلها القانون\" — استخدام موفق لاسم الموصول في سؤال رسمي."
          },
          {
            "text": "وش تأثيرها على الناس العاديين؟",
            "translation": "What is its effect on ordinary people?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "\"وش\" و\"الناس\" عاميتان — قل \"ما تأثيرها على المواطنين\" في السياق الرسمي."
          },
          {
            "text": "هل المواطنون الذين يعانون من البطالة سيستفيدون من هذه الخطة مباشرةً؟",
            "translation": "Will citizens who suffer from unemployment benefit directly from this plan?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "رائع! \"الذين يعانون\" — اسم موصول للجمع MSA صحيح."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "الخطة التي وُضعت تتضمن برامج توظيف ستُطلَق في المرحلة الأولى خلال العام القادم.",
        "translation": "The plan that was developed includes employment programs that will be launched in the first phase during the coming year.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Ask about transparency and accountability:",
        "options": [
          {
            "text": "من الضروري أن تُوضَّح آليات الشفافية والمساءلة في تنفيذ هذه الخطة. هل يُعتزم نشر تقارير دورية؟",
            "translation": "It is essential that transparency and accountability mechanisms in implementing this plan be clarified. Is it intended to publish periodic reports?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "ممتاز! \"من الضروري\" + \"تُوضَّح\" مبني للمجهول + \"يُعتزم\" — لغة رسمية احترافية."
          },
          {
            "text": "بس من يراقب التنفيذ؟",
            "translation": "But who monitors the implementation?",
            "nextStepId": "s7b",
            "correct": false,
            "feedback": "\"بس\" عامية — في السياق الرسمي قل \"غير أن السؤال المطروح هو\" أو \"يبقى السؤال حول...\"."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "سيُنشأ مجلس رقابي مستقل، وستُصدَر تقارير ربع سنوية تُرفع إلى الجهات المختصة.",
        "translation": "An independent oversight council will be established, and quarterly reports will be issued that are submitted to the relevant authorities.",
        "next": "s8"
      },
      {
        "id": "s7b",
        "speaker": "partner",
        "text": "وزارة المالية هي الجهة المنوط بها الإشراف، وستصدر تقارير سنوية.",
        "translation": "The Ministry of Finance is the body entrusted with oversight, and annual reports will be issued.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Close your questioning professionally:",
        "options": [
          {
            "text": "شكراً جزيلاً على هذه الإيضاحات التي أسهمت في فهم أبعاد الخطة بشكل أوضح.",
            "translation": "Thank you very much for these clarifications that contributed to understanding the dimensions of the plan more clearly.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "ممتاز! \"التي أسهمت في\" — استخدام رسمي راقٍ لاسم الموصول."
          },
          {
            "text": "تسلم على المعلومات.",
            "translation": "Thanks for the information.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"تسلم\" تحية عامية — في المؤتمر الرسمي قل \"شكراً جزيلاً\" أو \"نشكركم على هذه الإيضاحات\"."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "شكراً لأسئلتكم الجوهرية. المؤتمر الصحفي القادم سيُعقد بعد إطلاق المرحلة الأولى رسمياً.",
        "translation": "Thank you for your substantive questions. The next press conference will be held after the first phase is officially launched.",
        "end": true
      }
    ],
    "completionMessage": "Well done! You asked sharp, formal MSA questions at a government press conference."
  },
  {
    "id": "saudi_convo_p9_formal_meeting",
    "phase": 9,
    "title": "Formal Committee Meeting",
    "description": "Participate in a formal committee meeting to discuss a new regulation.",
    "focalWordIds": [
      "w_debate",
      "w_opinion",
      "w_law",
      "w_siyaasa",
      "w_govt",
      "w_dawla",
      "w_haqq",
      "w_justice"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أعزاءنا الأعضاء، نجتمع اليوم لمناقشة مشروع اللائحة التنظيمية التي أُعدَّت من قِبَل الفريق القانوني. هل ثمة من يودّ البدء؟",
        "translation": "Dear members, we meet today to discuss the draft regulatory framework that was prepared by the legal team. Is there anyone who would like to begin?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Open your remarks at the meeting:",
        "options": [
          {
            "text": "أودّ أن أبدأ بالإشارة إلى البند الثالث الذي يُعتبر الأكثر إشكالية من الناحية القانونية.",
            "translation": "I would like to begin by pointing to the third clause which is considered the most problematic from a legal standpoint.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! \"أودّ\" + \"يُعتبر\" مبني للمجهول — MSA رسمي للغاية."
          },
          {
            "text": "أنا عندي ملاحظات على اللائحة، خصوصاً البند الثالث.",
            "translation": "I have observations on the regulation, especially the third clause.",
            "nextStepId": "s3",
            "correct": false,
            "feedback": "مقبول لكن \"أنا عندي\" غير رسمية — قل \"لديّ ملاحظات\" في الاجتماعات الرسمية."
          },
          {
            "text": "اسمحوا لي أن أطرح وجهة نظري حول اللائحة الموضوعة للنقاش.",
            "translation": "Allow me to present my perspective on the regulation that has been placed for discussion.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "رائع! \"اسمحوا لي أن\" + \"الموضوعة للنقاش\" — افتتاح رسمي متقن."
          },
          {
            "text": "اللائحة هذي فيها مشاكل كثيرة يا جماعة.",
            "translation": "This regulation has many problems, guys.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"يا جماعة\" غير رسمية تماماً — في الاجتماع الرسمي قل \"أيها الأعضاء الكرام\" أو \"السادة الأعضاء\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "نشكركم على ملاحظاتكم. هل يمكن توضيح الإشكالية القانونية التي أشرتم إليها بمزيد من التفصيل؟",
        "translation": "We thank you for your observations. Can you clarify the legal issue you referred to in more detail?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "نأخذ علماً بذلك. نرجو توضيح الجوانب التي تراها مشكلة.",
        "translation": "We take note of that. Please clarify the aspects you see as problematic.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Elaborate on the legal concern:",
        "options": [
          {
            "text": "البند الثالث الذي يُقيَّد بموجبه حق المواطن في التظلم يتعارض مع المبادئ الدستورية للعدالة.",
            "translation": "The third clause by which the citizen's right to appeal is restricted contradicts the constitutional principles of justice.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! \"الذي يُقيَّد بموجبه\" — اسم موصول + مبني للمجهول في جملة واحدة! MSA رفيع."
          },
          {
            "text": "البند الثالث يمنع الناس من حقهم في الاعتراض وهذا ما يصير في دول متقدمة.",
            "translation": "The third clause prevents people from their right to object and this is not what happens in advanced countries.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "\"الناس\" و\"ما يصير\" عاميتان — قل \"لا يتوافق مع ما هو معمول به في الدول المتقدمة\"."
          },
          {
            "text": "من الضروري أن يُعاد النظر في هذا البند لأن حق التقاضي مكفول بموجب القانون الأساسي.",
            "translation": "It is essential that this clause be reconsidered because the right to litigation is guaranteed under the basic law.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "رائع! \"من الضروري\" + \"يُعاد\" مبني للمجهول — صياغة رسمية ممتازة."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "وجهة نظر محترمة. هل يتفق باقي الأعضاء مع هذا الطرح، أم أن ثمة آراء مخالفة؟",
        "translation": "A respectable viewpoint. Do the rest of the members agree with this argument, or are there dissenting views?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Propose a concrete amendment:",
        "options": [
          {
            "text": "أقترح أن يُضاف نص صريح يكفل حق المواطن في التظلم خلال مدة لا تتجاوز ستين يوماً.",
            "translation": "I propose that an explicit text be added that guarantees the citizen's right to appeal within a period not exceeding sixty days.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "ممتاز! \"يُضاف\" مبني للمجهول + \"يكفل\" في اسم موصول — اقتراح رسمي دقيق."
          },
          {
            "text": "لازم يعدلون البند هذا ويضيفون حق الاعتراض.",
            "translation": "They need to amend this clause and add the right to object.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "\"لازم يعدلون\" عامية — قل \"يجب تعديل البند\" أو \"ينبغي أن يُعدَّل\" في الاجتماع الرسمي."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "اقتراحكم يستحق الدراسة. سيُحال إلى الفريق القانوني لإعداد صيغة مناسبة.",
        "translation": "Your proposal deserves study. It will be referred to the legal team to prepare an appropriate formulation.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Formally acknowledge and close your contribution:",
        "options": [
          {
            "text": "نشكر اللجنة على تبنّي هذا الاقتراح ونأمل أن تُصاغ التعديلات بما يضمن صون حقوق جميع المواطنين.",
            "translation": "We thank the committee for adopting this proposal and hope that the amendments are formulated in a way that ensures the preservation of the rights of all citizens.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "ممتاز! \"تُصاغ\" مبني للمجهول + \"بما يضمن\" — لغة رسمية رفيعة المستوى."
          },
          {
            "text": "تمام، بس لا تنسوا هذا الموضوع.",
            "translation": "Fine, but don't forget this matter.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"تمام\" و\"بس\" و\"لا تنسوا\" عامية — الختام الرسمي يستدعي \"نأمل أن يُؤخذ بعين الاعتبار\"."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "نعتمد هذا الاقتراح ضمن جدول الأعمال. شكراً لجميع الأعضاء على مساهماتهم القيّمة.",
        "translation": "We adopt this proposal within the agenda. Thank you to all members for their valuable contributions.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You navigated a formal committee meeting with MSA legal register, passive constructions, and relative clauses."
  },
  {
    "id": "saudi_convo_p9_diplomatic_intro",
    "phase": 9,
    "title": "Diplomatic Introduction",
    "description": "Introduce yourself and your country's position at an international diplomatic forum.",
    "focalWordIds": [
      "w_dawla",
      "w_siyaasa",
      "w_watan",
      "w_haqq",
      "w_justice",
      "w_freedom",
      "w_economy",
      "w_rights"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "حضرات الممثلين الكرام، يسرّنا أن نفتتح هذا المنتدى الدولي. نودّ أن يتفضّل كل ممثل بتقديم دولته وموقفها من محور النقاش.",
        "translation": "Distinguished representatives, we are pleased to open this international forum. We would like each representative to kindly present their country and its position on the discussion theme.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Open your diplomatic introduction:",
        "options": [
          {
            "text": "يسعدني أن أمثل المملكة العربية السعودية في هذا المنتدى الرفيع، وأودّ في البداية أن أشكر الجهات المنظِّمة.",
            "translation": "It is my pleasure to represent the Kingdom of Saudi Arabia in this distinguished forum, and I would like first to thank the organizing authorities.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "رائع! افتتاح دبلوماسي رسمي يبدأ بالشكر — MSA مثالي."
          },
          {
            "text": "أهلاً، أنا من المملكة العربية السعودية وجئت أمثل بلدنا هنا.",
            "translation": "Hello, I'm from Saudi Arabia and I came to represent our country here.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أهلاً\" و\"أنا من\" و\"جئت\" بدون صيغة رسمية — المقام الدبلوماسي يستوجب \"يسرّني أن\" أو \"أُمثّل...\"."
          },
          {
            "text": "باسم المملكة العربية السعودية، يشرفني المشاركة في هذا المنتدى الذي يُعقد في ظروف بالغة الأهمية.",
            "translation": "In the name of the Kingdom of Saudi Arabia, it is my honor to participate in this forum which convenes under circumstances of great importance.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! \"الذي يُعقد\" — اسم موصول مع مبني للمجهول — MSA دبلوماسي محترف."
          },
          {
            "text": "السلام عليكم، المملكة العربية السعودية تدعم التعاون الدولي.",
            "translation": "Peace be upon you, the Kingdom of Saudi Arabia supports international cooperation.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "السلام عليكم صحيح لكن الجملة التالية مباشرة جداً — الافتتاح الدبلوماسي يحتاج مزيداً من الأسلوبية."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "شكراً. وما موقف المملكة العربية السعودية من محور العدالة الاقتصادية الذي يُناقَش في هذا المنتدى؟",
        "translation": "Thank you. What is the Kingdom of Saudi Arabia's position on the axis of economic justice being discussed at this forum?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "شكراً لمشاركتكم. نودّ سماع موقف المملكة من قضية العدالة الاقتصادية.",
        "translation": "Thank you for your participation. We would like to hear the Kingdom's position on the issue of economic justice.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "State your country's position on economic justice:",
        "options": [
          {
            "text": "تُعتبر العدالة الاقتصادية التي تُكفل بها حقوق الشعوب ركيزةً محورية في منظومة رؤية المملكة 2030.",
            "translation": "Economic justice, by which the rights of peoples are guaranteed, is considered a pivotal pillar in the Kingdom's Vision 2030 system.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! \"تُعتبر\" + \"التي تُكفل بها\" — مبني للمجهول مع اسم موصول، MSA دبلوماسي راقٍ."
          },
          {
            "text": "المملكة تدعم العدالة الاقتصادية لأن هذا شيء مهم للناس.",
            "translation": "The Kingdom supports economic justice because this is an important thing for people.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "\"للناس\" عامية — في المقام الدبلوماسي قل \"للمواطنين\" أو \"للشعوب\"."
          },
          {
            "text": "أعتقد بشدة أن التنمية المستدامة التي يُسعى إليها تستلزم توزيعاً عادلاً للثروات الوطنية.",
            "translation": "I strongly believe that sustainable development, which is sought after, requires a fair distribution of national wealth.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "رائع! \"التي يُسعى إليها\" — مبني للمجهول + اسم موصول في تعبير دبلوماسي مُتقن."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "موقف واضح ومعبَّر عنه بشكل دقيق. هل ثمة مبادرات محددة تودّون الإعلان عنها في هذا المنتدى؟",
        "translation": "A clear and precisely expressed position. Are there specific initiatives you would like to announce at this forum?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Announce a diplomatic initiative:",
        "options": [
          {
            "text": "يسعدني الإعلان عن مبادرة إقليمية يُموَّل بها مشاريع التنمية في الدول الأقل نمواً في منطقة الشرق الأوسط.",
            "translation": "I am pleased to announce a regional initiative through which development projects in the least developed countries in the Middle East region will be funded.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "ممتاز! \"يُموَّل بها\" — مبني للمجهول مع ضمير رابط، MSA دبلوماسي متقن للغاية."
          },
          {
            "text": "عندنا مشروع جديد رح نموّل فيه دول الشرق الأوسط.",
            "translation": "We have a new project we will fund countries of the Middle East with.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "\"عندنا\" و\"رح\" عاميتان — في الخطاب الدبلوماسي قل \"لدينا\" و\"سنقوم بـ\" أو الأفضل \"يُزمع تمويل\"."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "مبادرة رائدة بلا شك. هل يمكن مشاركة الوثائق الخاصة بها مع الوفود الأخرى؟",
        "translation": "A pioneering initiative without doubt. Can its documents be shared with the other delegations?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Confirm document sharing formally:",
        "options": [
          {
            "text": "بالتأكيد، ستُوزَّع الوثيقة التفصيلية التي أُعدَّت لهذا الغرض على جميع الوفود في نهاية الجلسة.",
            "translation": "Certainly, the detailed document that was prepared for this purpose will be distributed to all delegations at the end of the session.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "ممتاز! \"ستُوزَّع\" + \"التي أُعدَّت\" — مبني للمجهول مزدوج، MSA دبلوماسي احترافي."
          },
          {
            "text": "إي نعم، بنوزع الأوراق بعد الاجتماع.",
            "translation": "Yes, we'll distribute the papers after the meeting.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"إي نعم\" و\"بنوزع\" عاميتان — الرد الرسمي هو \"بالتأكيد، ستُوزَّع الوثائق...\"."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "نقدّر تعاونكم الكريم. يُسجَّل هذا الإعلان ضمن محاضر المنتدى ويُعتمد رسمياً.",
        "translation": "We appreciate your gracious cooperation. This announcement is recorded within the forum's minutes and officially adopted.",
        "end": true
      }
    ],
    "completionMessage": "Outstanding! You delivered a full diplomatic introduction with MSA register, passive voice, and relative clauses throughout."
  },
  {
    "id": "saudi_convo_p9_gov_office_visit",
    "phase": 9,
    "title": "Government Office Visit",
    "description": "Visit a government ministry to inquire about an official permit application.",
    "focalWordIds": [
      "w_govt",
      "w_law",
      "w_haqq",
      "w_dawla",
      "w_siyaasa",
      "w_opinion",
      "w_justice",
      "w_mahkama"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "تفضل، ماذا يمكنني أن أفيدكم؟",
        "translation": "Please, how can I assist you?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "State your purpose formally at the government office:",
        "options": [
          {
            "text": "أودّ الاستفسار عن إجراءات طلب التصريح التجاري الذي يُستلزم تقديمه وفقاً للوائح المعمول بها.",
            "translation": "I would like to inquire about the procedures for applying for the commercial permit that is required to be submitted in accordance with current regulations.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! \"الذي يُستلزم\" — اسم موصول + مبني للمجهول في استفسار حكومي رسمي."
          },
          {
            "text": "أبغى أعرف كيف أقدم طلب التصريح.",
            "translation": "I want to know how to submit the permit application.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أبغى أعرف\" عامية — في المكتب الحكومي الرسمي قل \"أودّ الاستفسار عن\" أو \"أُريد الاستعلام عن\"."
          },
          {
            "text": "تقدمت بطلب للحصول على تصريح تجاري، وأُبلغت بضرورة مراجعتكم لاستكمال الإجراءات.",
            "translation": "I submitted an application to obtain a commercial permit, and I was informed of the necessity of reviewing you to complete the procedures.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "رائع! \"أُبلغت\" مبني للمجهول — رسمي ودقيق."
          },
          {
            "text": "جيت عشان التصريح التجاري.",
            "translation": "I came for the commercial permit.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"جيت عشان\" عامية — قل \"جئتُ للاستفسار عن\" أو \"أودّ الاستعلام عن\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "حسناً. التصاريح التجارية التي تُصدَر من وزارتنا تستلزم تقديم ثلاثة مستندات أساسية. هل لديكم هويتكم الوطنية؟",
        "translation": "Very well. Commercial permits that are issued by our ministry require the submission of three basic documents. Do you have your national ID?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "بالتأكيد. للتقدم بطلب التصريح، يلزم تعبئة النموذج الرسمي وإرفاق الوثائق المطلوبة.",
        "translation": "Certainly. To apply for the permit, it is required to fill out the official form and attach the required documents.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask about the required documents in detail:",
        "options": [
          {
            "text": "نعم، هويتي معي. هل يمكن إرشادي إلى المستندات التي يُشترط تقديمها والمدة الزمنية المتوقعة لإتمام المعالجة؟",
            "translation": "Yes, my ID is with me. Can I be directed to the documents that are required to be submitted and the expected timeframe for completing the processing?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! \"التي يُشترط تقديمها\" — اسم موصول + مبني للمجهول في استفسار إداري دقيق."
          },
          {
            "text": "إي، معي هويتي. وش الأوراق المطلوبة؟",
            "translation": "Yeah, my ID is with me. What papers are needed?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "\"إي\" و\"وش\" عاميتان — في المكتب الرسمي قل \"نعم\" و\"ما هي الوثائق المطلوبة؟\""
          },
          {
            "text": "نعم. أودّ أيضاً معرفة إن كانت هناك رسوم مقررة يتعيَّن سدادها.",
            "translation": "Yes. I would also like to know if there are prescribed fees that must be paid.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "رائع! \"يتعيَّن سدادها\" — تعبير إداري رسمي صحيح."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "المستندات المطلوبة هي: الهوية الوطنية، وشهادة السجل التجاري، والعنوان الوطني. المدة المعتادة هي خمسة عشر يوماً عملياً.",
        "translation": "The required documents are: national ID, commercial registry certificate, and national address. The usual period is fifteen working days.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Ask about a specific regulation that affects your case:",
        "options": [
          {
            "text": "هل اللائحة التي صدرت العام الماضي تؤثر على طلبات التصاريح التي تقدم بها أصحاب المنشآت الصغيرة؟",
            "translation": "Does the regulation that was issued last year affect permit applications submitted by small establishment owners?",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "ممتاز! \"التي صدرت\" و\"التي تقدم بها\" — اسما موصول في سؤال إداري دقيق."
          },
          {
            "text": "اللوائح الجديدة تأثر علي ولا لا؟",
            "translation": "Do the new regulations affect me or not?",
            "nextStepId": "s7b",
            "correct": false,
            "feedback": "\"تأثر علي\" عامية — قل \"هل تؤثر على حالتي؟\" أو \"هل تنطبق عليّ؟\""
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "نعم، اللائحة المذكورة تمنح أصحاب المنشآت الصغيرة إعفاءً من رسوم التسجيل في السنة الأولى.",
        "translation": "Yes, the mentioned regulation grants small establishment owners an exemption from registration fees in the first year.",
        "next": "s8"
      },
      {
        "id": "s7b",
        "speaker": "partner",
        "text": "هذه اللائحة تنطبق على جميع المتقدمين الجدد بصرف النظر عن حجم المنشأة.",
        "translation": "This regulation applies to all new applicants regardless of the size of the establishment.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Thank the official and confirm next steps:",
        "options": [
          {
            "text": "أشكركم على هذه المعلومات القيّمة. سأعمل على استيفاء المستندات المطلوبة وتقديمها خلال الأسبوع القادم.",
            "translation": "I thank you for this valuable information. I will work on completing the required documents and submitting them during the coming week.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "ممتاز! ختام رسمي واضح مع \"استيفاء\" — مفردة إدارية MSA."
          },
          {
            "text": "شكراً. بكرة أجيب الأوراق.",
            "translation": "Thanks. Tomorrow I'll bring the papers.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"بكرة أجيب\" عامية — قل \"سأتقدم بالوثائق خلال...\" في السياق الرسمي."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "أهلاً وسهلاً. عند تقديم المستندات، سيُمنح رقم المرجع الخاص بطلبكم فور استكمال التحقق منها.",
        "translation": "Welcome. Upon submitting the documents, the reference number for your application will be granted immediately upon completing the verification of them.",
        "end": true
      }
    ],
    "completionMessage": "Well done! You handled a formal government office visit with proper MSA administrative language."
  },
  {
    "id": "saudi_convo_p9_university_lecture_q",
    "phase": 9,
    "title": "University Lecture Q&A",
    "description": "Ask a professor questions after a university lecture on political science.",
    "focalWordIds": [
      "w_siyaasa",
      "w_dawla",
      "w_history",
      "w_culture",
      "w_opinion",
      "w_debate",
      "w_rights",
      "w_haqq"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أُلقيت هذه المحاضرة لاستعراض تطوّر مفهوم الدولة الحديثة عبر التاريخ. يسعدني الإجابة عن أسئلتكم.",
        "translation": "This lecture was delivered to review the evolution of the concept of the modern state throughout history. I am pleased to answer your questions.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Ask your first academic question:",
        "options": [
          {
            "text": "أستاذي الكريم، تناولتم في محاضرتكم العلاقة بين الدولة والمواطن. هل يمكن توضيح كيف تطوّرت هذه العلاقة في العالم العربي تحديداً؟",
            "translation": "Dear professor, you addressed in your lecture the relationship between the state and the citizen. Can you clarify how this relationship evolved in the Arab world specifically?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! \"تناولتم\" — خطاب رسمي للجمع (صيغة التعظيم) مع مرجعية مباشرة للمحاضرة."
          },
          {
            "text": "وش الفرق بين الدولة القديمة والحديثة؟",
            "translation": "What's the difference between the old and modern state?",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"وش الفرق\" عامية — في القاعة الجامعية قل \"ما الفرق بين\" أو \"كيف يمكن التمييز بين\"."
          },
          {
            "text": "ألاحظ أن مفهوم السيادة الذي تناولتموه لم يُشَر إلى تطبيقاته في الحالة الخليجية — هل يمكن التوسع في هذا الجانب؟",
            "translation": "I notice that the concept of sovereignty you addressed was not referred to in its applications in the Gulf case — can you expand on this aspect?",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "رائع! \"لم يُشَر إلى\" مبني للمجهول — ملاحظة أكاديمية رسمية دقيقة."
          },
          {
            "text": "دكتور، شفت في المحاضرة إن فيه نقطة ما انتبهت عليها بخصوص الخليج.",
            "translation": "Doctor, I saw in the lecture that there's a point you didn't pay attention to regarding the Gulf.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"شفت\" و\"ما انتبهت عليها\" عاميتان — قل \"لاحظت أن\" و\"لم يُتطرق إلى\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "سؤال وجيه. العلاقة بين الدولة والمواطن في العالم العربي تُعتبر من أكثر المسائل تعقيداً، وقد تأثرت بعوامل ثقافية وتاريخية متشابكة.",
        "translation": "A valid question. The relationship between the state and the citizen in the Arab world is considered one of the most complex matters, and it has been influenced by intertwined cultural and historical factors.",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "الدولة الحديثة تتميز عن القديمة بمفهوم السيادة القانونية وحقوق المواطنة. هل لديك سؤال تريد التوضيح فيه؟",
        "translation": "The modern state is distinguished from the old one by the concept of legal sovereignty and citizenship rights. Do you have a question you want clarification on?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Ask about cultural influence on political systems:",
        "options": [
          {
            "text": "هل يمكن القول إن الموروث الثقافي الذي تشكّل عبر قرون هو الذي يحدد طبيعة النظام السياسي؟",
            "translation": "Can it be said that the cultural heritage that was formed over centuries is what determines the nature of the political system?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! \"الذي تشكّل عبر قرون\" — اسم موصول لوصف الموروث الثقافي، MSA أكاديمي رفيع."
          },
          {
            "text": "يعني الثقافة تأثر في السياسة أكثر من غيرها؟",
            "translation": "So culture influences politics more than others?",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "\"يعني\" و\"تأثر\" عاميتان — قل \"هل يعني ذلك أن الثقافة تؤثر في السياسة أكثر من غيرها؟\""
          },
          {
            "text": "أعتقد أن الهوية الثقافية والتاريخية التي يحملها المجتمع تفرض نفسها على بنية الدولة — هل هذا ما تذهبون إليه؟",
            "translation": "I believe that the cultural and historical identity that society carries imposes itself on the structure of the state — is this what you are suggesting?",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "رائع! \"التي يحملها المجتمع\" — استخدام اسم الموصول في إطار أكاديمي."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تماماً. الموروث الثقافي يُعتبر عاملاً محورياً يُشكّل الخيال السياسي للمجتمعات. وهذا ما يُفسّر التباين بين أنظمة الحكم رغم التشابه في النصوص الدستورية.",
        "translation": "Exactly. Cultural heritage is considered a pivotal factor that shapes the political imagination of societies. And this is what explains the divergence between governance systems despite similarities in constitutional texts.",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Raise a critical academic point:",
        "options": [
          {
            "text": "من الضروري أن تُناقَش في هذا السياق حقوق الأقليات الثقافية التي لا تُعكس دائماً في الأطر الدستورية.",
            "translation": "It is essential that the rights of cultural minorities, which are not always reflected in constitutional frameworks, be discussed in this context.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "ممتاز! \"تُناقَش\" مبني للمجهول + \"التي لا تُعكس\" — مبني للمجهول ثانٍ مع اسم موصول."
          },
          {
            "text": "إلا إن حقوق الأقليات ما تنذكر في الدستور في بعض الأحيان.",
            "translation": "But minority rights are not mentioned in the constitution sometimes.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "\"ما تنذكر\" عامية — في الخطاب الأكاديمي قل \"لا تُذكر\" أو \"لا تُشار إليها\"."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "ملاحظة دقيقة. هذه الهوّة بين النص والتطبيق تُشكّل أحد التحديات الجوهرية في الدراسات السياسية المعاصرة.",
        "translation": "A precise observation. This gap between text and application constitutes one of the fundamental challenges in contemporary political studies.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Ask for recommended reading:",
        "options": [
          {
            "text": "هل يمكن إرشادي إلى مراجع أكاديمية رصينة تتناول الموضوع الذي نوقش في المحاضرة بتفصيل أوفى؟",
            "translation": "Can I be directed to sound academic references that address the topic that was discussed in the lecture in greater detail?",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "ممتاز! \"الذي نوقش\" مبني للمجهول — مرجعية أكاديمية رسمية مثالية."
          },
          {
            "text": "في كتب تنصحني تقرأها عن الموضوع؟",
            "translation": "Are there books you recommend I read about the topic?",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"في كتب\" و\"تقرأها\" عاميتان — قل \"هل تنصحون بمراجع محددة؟\" أو \"هل ثمة مصادر أكاديمية موصى بها؟\""
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "أنصح بالرجوع إلى أعمال ابن خلدون التي تُعتبر المرجع الأساسي في الفكر السياسي الإسلامي، إضافةً إلى الدراسات الحديثة التي نُشرت في المجلات المحكّمة.",
        "translation": "I recommend referring to the works of Ibn Khaldun which are considered the basic reference in Islamic political thought, in addition to the modern studies that have been published in peer-reviewed journals.",
        "end": true
      }
    ],
    "completionMessage": "Excellent! You engaged in an academic university Q&A session using formal MSA throughout."
  },
  {
    "id": "saudi_convo_p9_job_interview_formal",
    "phase": 9,
    "title": "Formal Job Interview",
    "description": "Attend a formal interview for a senior position in a government-linked institution.",
    "focalWordIds": [
      "w_economy",
      "w_siyaasa",
      "w_opinion",
      "w_dawla",
      "w_haqq",
      "w_justice",
      "w_culture",
      "w_debate"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "مرحباً بكم. يسرّنا مقابلتكم لهذه الوظيفة القيادية. أودّ أن أبدأ بسؤالكم عن دوافعكم للتقدم لهذا المنصب.",
        "translation": "Welcome. We are pleased to meet you for this leadership position. I would like to begin by asking you about your motivations for applying for this position.",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "State your motivation for the position:",
        "options": [
          {
            "text": "أودّ الإسهام في قطاع يُعتبر من أكثر القطاعات أثراً في تشكيل السياسات العامة التي تخدم المواطن.",
            "translation": "I would like to contribute to a sector that is considered one of the most influential sectors in shaping public policies that serve the citizen.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! \"يُعتبر\" مبني للمجهول + \"التي تخدم\" اسم موصول — دوافع رسمية محترفة."
          },
          {
            "text": "أبغى أشتغل في هذا المجال عشان عندي خبرة كثيرة.",
            "translation": "I want to work in this field because I have a lot of experience.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أبغى أشتغل\" و\"عشان\" عاميتان — في المقابلة الرسمية قل \"أسعى للعمل في هذا المجال لأن لديّ خبرة واسعة\"."
          },
          {
            "text": "هذا المنصب الذي أُعلن عنه يتوافق تماماً مع المسار المهني الذي سعيت إليه على مدار سنوات.",
            "translation": "This position that was announced aligns perfectly with the career path that I have sought over the years.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "رائع! \"الذي أُعلن عنه\" مبني للمجهول + \"الذي سعيت إليه\" — اسما موصول في إجابة مقابلة رسمية."
          },
          {
            "text": "شايف إن هذا المنصب مناسب لمستواي.",
            "translation": "I see that this position is suitable for my level.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"شايف\" عامية — قل \"أرى\" أو \"أعتقد\" في المقابلة الرسمية."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "شكراً. وكيف تصفون خبرتكم في مجال تحليل السياسات الاقتصادية؟",
        "translation": "Thank you. And how do you describe your experience in the field of economic policy analysis?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "نقدّر ذلك. دعونا نتحدث عن خبرتكم العملية في تحليل السياسات الاقتصادية.",
        "translation": "We appreciate that. Let us talk about your practical experience in analyzing economic policies.",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Describe your relevant experience:",
        "options": [
          {
            "text": "خلال السنوات السبع الماضية، اضطلعت بمهام تحليل السياسات الاقتصادية التي تُوضع لدعم التنويع الاقتصادي في إطار رؤية 2030.",
            "translation": "During the past seven years, I undertook the tasks of analyzing economic policies that are devised to support economic diversification within the Vision 2030 framework.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! \"التي تُوضع\" مبني للمجهول + اسم موصول — وصف خبرة رسمي ودقيق."
          },
          {
            "text": "شغلت في تحليل السياسات الاقتصادية سبع سنين.",
            "translation": "I worked in economic policy analysis for seven years.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "\"شغلت\" عامية — قل \"عملتُ\" أو \"اشتغلتُ\" (على الأقل) أو الأفضل \"اضطلعتُ بمهام\"."
          },
          {
            "text": "أعمل في هذا المجال منذ سبع سنوات، وشملت مهامي إعداد التقارير التي تُرفع إلى متخذي القرار.",
            "translation": "I have been working in this field for seven years, and my tasks included preparing reports that are submitted to decision-makers.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "رائع! \"التي تُرفع إلى\" مبني للمجهول — وصف مهني رسمي محترف."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "مثير للاهتمام. كيف تتعاملون مع مواقف يتضارب فيها رأيكم مع رأي فريق العمل حول قرار معين؟",
        "translation": "Interesting. How do you handle situations where your opinion conflicts with the team's opinion on a specific decision?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Answer the conflict management question:",
        "options": [
          {
            "text": "أؤمن بأن النقاش الذي يُدار بموضوعية واحترام متبادل هو الوسيلة الأمثل للوصول إلى القرار الأنسب.",
            "translation": "I believe that discussion which is conducted with objectivity and mutual respect is the optimal means to reach the most appropriate decision.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "ممتاز! \"الذي يُدار\" مبني للمجهول + اسم موصول — إجابة رسمية ناضجة."
          },
          {
            "text": "أحاول أشوف رأي الكل وبعدين نقرر مع بعض.",
            "translation": "I try to see everyone's opinion and then we decide together.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "\"أحاول أشوف\" و\"مع بعض\" عاميتان — قل \"أسعى للاستماع إلى الآراء كافةً ثم نتوصل إلى قرار مشترك\"."
          },
          {
            "text": "أعتقد بشدة أن وجهات النظر المتعددة التي تُطرح في بيئة عمل صحية تُثري جودة القرار النهائي.",
            "translation": "I strongly believe that the multiple viewpoints that are raised in a healthy work environment enrich the quality of the final decision.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "رائع! \"التي تُطرح\" مبني للمجهول + اسم موصول — رأي مهني رسمي ونضج واضح."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "أُعجبني أسلوبكم. سؤالنا الأخير: ما الرؤية التي تحملونها لتطوير هذا القطاع خلال السنوات الخمس القادمة؟",
        "translation": "I was impressed by your approach. Our final question: what is the vision you hold for developing this sector over the next five years?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Present your vision for the sector:",
        "options": [
          {
            "text": "أرى أن القطاع الذي يُراد تطويره يستلزم استراتيجية متكاملة تقوم على الابتكار والشفافية وبناء الكوادر الوطنية التي تُؤهَّل للقيادة.",
            "translation": "I believe the sector that is intended to be developed requires an integrated strategy based on innovation, transparency, and building national cadres that are qualified for leadership.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "ممتاز! \"الذي يُراد تطويره\" + \"التي تُؤهَّل\" — مبنيان للمجهول مع اسمي موصول في رؤية مهنية رسمية."
          },
          {
            "text": "لازم ندعم الكوادر الشابة ونطور التقنية في القطاع.",
            "translation": "We must support young cadres and develop technology in the sector.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"لازم\" عامية — في المقابلة الرسمية قل \"يجب\" أو \"ينبغي أن نولي الاهتمام بـ\"."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "رؤية طموحة ومتماسكة. سيُبلَّغ المرشحون بنتائج المقابلات خلال أسبوعين من الآن. نشكركم على وقتكم الكريم.",
        "translation": "An ambitious and coherent vision. Candidates will be notified of interview results within two weeks from now. We thank you for your gracious time.",
        "end": true
      }
    ],
    "completionMessage": "Outstanding! You aced a formal job interview using MSA register throughout with passive constructions and relative clauses."
  },
  {
    "id": "saudi_convo_p9_court_appearance_basic",
    "phase": 9,
    "title": "Basic Court Appearance",
    "description": "Respond to a judge's questions during a civil court hearing.",
    "focalWordIds": [
      "w_law",
      "w_mahkama",
      "w_hakama",
      "w_haakim",
      "w_justice",
      "w_haqq",
      "w_rights",
      "w_dawla"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "المحكمة منعقدة. هل أنتم المدعي في القضية رقم مئتين وخمسة وثلاثين؟",
        "translation": "The court is in session. Are you the plaintiff in case number two hundred and thirty-five?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Confirm your identity formally in court:",
        "options": [
          {
            "text": "نعم سعادة القاضي، أنا المدعي في هذه القضية، وأُقسم بأن أقول الحق.",
            "translation": "Yes, Your Honor, I am the plaintiff in this case, and I swear to tell the truth.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! \"سعادة القاضي\" هو الخطاب الصحيح في المحكمة — MSA رسمي للغاية."
          },
          {
            "text": "إي، أنا اللي رفعت القضية.",
            "translation": "Yeah, I'm the one who filed the case.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"إي\" و\"اللي رفعت\" عاميتان — في المحكمة يجب قول \"نعم سعادة القاضي\" و\"أنا الذي رفعت\"."
          },
          {
            "text": "نعم سعادة القاضي. أنا المدعي الذي تقدّم بهذه الدعوى أمام المحكمة الموقّرة.",
            "translation": "Yes, Your Honor. I am the plaintiff who submitted this lawsuit before the honorable court.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "رائع! \"الذي تقدّم\" اسم موصول + \"المحكمة الموقّرة\" — خطاب قضائي رسمي مثالي."
          },
          {
            "text": "أيوه أنا.",
            "translation": "Yes, me.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أيوه\" عامية جداً — في قاعة المحكمة يجب الرد بـ\"نعم سعادة القاضي\"."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "حسناً. الدعوى التي أُقيمت تتعلق بنزاع عقاري. هل تودّ عرض الحقائق المتعلقة بالقضية؟",
        "translation": "Very well. The lawsuit that was filed relates to a real estate dispute. Do you wish to present the facts related to the case?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "يُرجى التكلم بصوت واضح. ادعيتم أنتم بهذه القضية — ما هو موضوعها؟",
        "translation": "Please speak clearly. You filed this case — what is its subject?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Present your case formally:",
        "options": [
          {
            "text": "سعادة القاضي، العقار الذي أُشير إليه في وثائق الملكية قد استُولي عليه دون سند قانوني معتمد، مما ينتهك حقي المكفول بموجب القانون.",
            "translation": "Your Honor, the property that is referred to in the ownership documents was seized without an approved legal basis, which violates my right guaranteed under the law.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! \"الذي أُشير إليه\" + \"استُولي عليه\" — مبنيان للمجهول، MSA قضائي محترف."
          },
          {
            "text": "عقارتي أخذوها بدون سبب قانوني وهذا ما صح.",
            "translation": "They took my property without legal reason and this isn't right.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "\"عقارتي أخذوها\" و\"ما صح\" عاميتان — في المحكمة قل \"العقار الذي أمتلكه استُولي عليه\" و\"وهو ما يتعارض مع القانون\"."
          },
          {
            "text": "أودّ إعلام المحكمة الموقّرة بأن حقي في الملكية الذي يكفله القانون قد انتُهك بشكل صريح.",
            "translation": "I wish to inform the honorable court that my right to ownership, which is guaranteed by law, has been explicitly violated.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "رائع! \"الذي يكفله القانون\" + \"انتُهك\" مبني للمجهول — خطاب قضائي دقيق وقوي."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "هل لديكم وثائق تدعم هذا الادعاء؟",
        "translation": "Do you have documents supporting this claim?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Present your evidence formally:",
        "options": [
          {
            "text": "نعم سعادة القاضي، الوثائق التي أُرفقت بملف الدعوى تُثبت ملكيتي للعقار منذ عشر سنوات.",
            "translation": "Yes, Your Honor, the documents that were attached to the case file prove my ownership of the property for ten years.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "ممتاز! \"التي أُرفقت\" مبني للمجهول + اسم موصول — تقديم أدلة بلغة قضائية MSA سليمة."
          },
          {
            "text": "عندي أوراق تثبت إن العقار ملكي من زمان.",
            "translation": "I have papers that prove the property has been mine for a long time.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "\"عندي أوراق\" و\"من زمان\" عاميتان — قل \"لديّ مستندات\" و\"منذ سنوات\"."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "ستُدرَس هذه الوثائق من قِبَل الجهة القضائية المختصة. هل لديكم ما تضيفونه؟",
        "translation": "These documents will be studied by the competent judicial authority. Do you have anything to add?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Make a final formal statement:",
        "options": [
          {
            "text": "أودّ أن أؤكد لسعادتكم أن ما أطالب به ليس أكثر من استيفاء الحق الذي كُفل لي بموجب أحكام القانون النافذ.",
            "translation": "I wish to confirm to Your Honor that what I am demanding is nothing more than fulfilling the right that was guaranteed to me under the provisions of the applicable law.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "ممتاز! \"الذي كُفل لي\" مبني للمجهول — ختام قضائي رسمي مثالي."
          },
          {
            "text": "بس أبغى حقي وخلاص.",
            "translation": "I just want my right and that's it.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"أبغى\" و\"وخلاص\" عاميتان — الختام القضائي يستلزم \"أودّ استيفاء حقي المشروع وفق أحكام القانون\"."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "شكراً. ستُعقد الجلسة القادمة بعد أسبوعين، وسيُبلَّغ الطرفان بموعدها رسمياً.",
        "translation": "Thank you. The next session will be held in two weeks, and both parties will be officially notified of its date.",
        "end": true
      }
    ],
    "completionMessage": "Well done! You handled a basic court appearance using formal MSA judicial language with passive constructions throughout."
  },
  {
    "id": "saudi_convo_p9_doctor_specialist",
    "phase": 9,
    "title": "Specialist Doctor Consultation",
    "description": "Consult a specialist physician about a medical condition in a formal hospital setting.",
    "focalWordIds": [
      "w_haqq",
      "w_rights",
      "w_opinion",
      "w_dawla",
      "w_culture",
      "w_history",
      "w_haakim",
      "w_justice"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "صباح الخير. أنا الدكتور سليمان، استشاري أمراض القلب. اطلعت على ملفكم الطبي الذي أُحيل إليّ. كيف حالكم اليوم؟",
        "translation": "Good morning. I am Dr. Sulaiman, consultant cardiologist. I have reviewed your medical file that was referred to me. How are you today?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Greet the specialist and describe your main complaint formally:",
        "options": [
          {
            "text": "صباح النور دكتور. أعاني من آلام في منطقة الصدر تتكرر منذ أسابيع، وقد أُحلت إليكم من قِبَل طبيب الرعاية الأولية.",
            "translation": "Good morning, Doctor. I suffer from chest pains that recur since weeks, and I was referred to you by the primary care physician.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! \"أُحلت إليكم\" مبني للمجهول — توصيف طبي رسمي دقيق."
          },
          {
            "text": "زين الحمد لله. عندي وجع في الصدر من زمان وما اتحسّن.",
            "translation": "Fine, praise God. I have chest pain for a long time and it hasn't improved.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"عندي وجع\" و\"من زمان\" عاميتان — في البيئة الطبية الرسمية قل \"أشكو من ألم في الصدر منذ فترة\"."
          },
          {
            "text": "الحمد لله. أشكو من آلام متكررة في الصدر تشتد عند المجهود البدني، وأودّ الحصول على تقييم شامل.",
            "translation": "Praise God. I complain of recurring chest pains that intensify with physical exertion, and I would like to obtain a comprehensive evaluation.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "رائع! \"تشتد عند المجهود\" — وصف طبي MSA دقيق مع \"أودّ\"."
          },
          {
            "text": "وجعي في الصدر يزيد لما أتعب.",
            "translation": "My chest pain increases when I get tired.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"وجعي\" و\"لما أتعب\" عاميتان — قل \"ألمي يشتد عند بذل المجهود\" في الاستشارة الطبية الرسمية."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "أُعيد قراءة تقرير الإحالة. هل سبق أن خضعتم لتخطيط القلب أو الإيكو؟",
        "translation": "The referral report is being re-read. Have you previously undergone an ECG or echocardiogram?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "أفهم. متى بدأت هذه الآلام تحديداً؟ وهل هناك أعراض مصاحبة؟",
        "translation": "I understand. When exactly did these pains begin? And are there accompanying symptoms?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Describe your medical history:",
        "options": [
          {
            "text": "نعم دكتور، أُجري لي تخطيط القلب قبل ثلاثة أشهر في مستشفى الرعاية الأولية، وأُبلغت بأن النتيجة طبيعية.",
            "translation": "Yes, Doctor, an ECG was performed for me three months ago at the primary care hospital, and I was informed that the result was normal.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! \"أُجري لي\" + \"أُبلغت\" — مبنيان للمجهول في السياق الطبي الرسمي."
          },
          {
            "text": "إي عملوا لي تخطيط قلب قبل كم شهر وقالوا طبيعي.",
            "translation": "Yeah they did an ECG for me a few months ago and said it was normal.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "\"إي\" و\"كم شهر\" عاميتان — قل \"نعم، أُجري لي تخطيط القلب قبل ثلاثة أشهر وأُبلغت بأن النتيجة طبيعية\"."
          },
          {
            "text": "لم يسبق لي إجراء فحص إيكو، غير أنه أُجري لي تخطيط قلب في الإحالة السابقة التي صدرت من الرعاية الأولية.",
            "translation": "I have not previously undergone an echocardiogram, however an ECG was performed for me in the previous referral that was issued from primary care.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "رائع! \"أُجري لي\" + \"التي صدرت\" — مبني للمجهول مع اسم موصول في السياق الطبي."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "جيد. سيُجرى لكم إيكو القلب اليوم، ثم سأُطلعكم على نتائجه. هل لديكم تاريخ عائلي لأمراض القلب؟",
        "translation": "Good. An echocardiogram will be performed for you today, then I will inform you of its results. Do you have a family history of heart disease?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Describe your family medical history:",
        "options": [
          {
            "text": "نعم دكتور، والدي الذي تُوفّي قبل سبع سنوات كان يعاني من أمراض الشرايين التاجية التي أُشير إليها في سجلاته الطبية.",
            "translation": "Yes, Doctor, my father who passed away seven years ago suffered from coronary artery disease that is referred to in his medical records.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "ممتاز! \"الذي تُوفّي\" + \"التي أُشير إليها\" — اسما موصول مع مبنيين للمجهول."
          },
          {
            "text": "والدي توفي من القلب قبل سبع سنين.",
            "translation": "My father died of a heart condition seven years ago.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "المعلومة صحيحة لكن اللغة عامية — قل \"والدي توفي بسبب مرض في الشريان التاجي قبل سبع سنوات\"."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "هذه معلومة مهمة جداً. بناءً على ذلك، أرى ضرورة إجراء فحوصات إضافية تشمل قياس الضغط التاجي.",
        "translation": "This is very important information. Based on that, I see a necessity to conduct additional tests that include measuring coronary pressure.",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Ask about your rights as a patient regarding second opinion:",
        "options": [
          {
            "text": "شكراً دكتور. هل يحق لي الحصول على رأي طبي ثانٍ من استشاري آخر إن رأيت ذلك ضرورياً؟",
            "translation": "Thank you, Doctor. Is it my right to obtain a second medical opinion from another consultant if I deem that necessary?",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "ممتاز! \"هل يحق لي\" — سؤال عن الحق بلغة رسمية MSA واضحة وصريحة."
          },
          {
            "text": "ممكن أروح لدكتور ثاني عشان أتأكد؟",
            "translation": "Can I go to another doctor to make sure?",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"ممكن أروح\" و\"عشان\" عاميتان — قل \"هل يحق لي مراجعة استشاري آخر؟\" في البيئة الطبية الرسمية."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "بالطبع، هذا حق مكفول لكل مريض بموجب لوائح حقوق المريض المعتمدة في المملكة. يسعدني تزويدكم بالتقرير الطبي اللازم.",
        "translation": "Of course, this is a right guaranteed to every patient under the approved patient rights regulations in the Kingdom. I am pleased to provide you with the necessary medical report.",
        "end": true
      }
    ],
    "completionMessage": "Well done! You navigated a specialist medical consultation in formal MSA with passive constructions and patient rights language."
  },
  {
    "id": "saudi_convo_p9_panel_discussion",
    "phase": 9,
    "title": "Panel Discussion",
    "description": "Participate in a televised panel discussion on economic reform and national development.",
    "focalWordIds": [
      "w_economy",
      "w_debate",
      "w_opinion",
      "w_siyaasa",
      "w_dawla",
      "w_rights",
      "w_culture",
      "w_freedom"
    ],
    "steps": [
      {
        "id": "s1",
        "speaker": "partner",
        "text": "أهلاً بمشاهدينا الكرام في برنامجنا الحواري. ضيفنا اليوم خبير اقتصادي يرى أن الإصلاح الاقتصادي الذي يُتحدث عنه يستلزم تغييرات جذرية. ما تعليقكم؟",
        "translation": "Welcome, dear viewers, to our talk show. Our guest today is an economic expert who believes that the economic reform being spoken about requires fundamental changes. What is your comment?",
        "next": "s2"
      },
      {
        "id": "s2",
        "speaker": "user",
        "prompt": "Open the panel discussion with your position:",
        "options": [
          {
            "text": "أعتقد بشدة أن الإصلاح الاقتصادي الذي يُنشد لا يمكن أن يُحقَّق دون إصلاح منظومة الحوكمة التي تحكم العلاقة بين القطاع العام والخاص.",
            "translation": "I strongly believe that the economic reform that is aspired to cannot be achieved without reforming the governance system that governs the relationship between the public and private sectors.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "ممتاز! \"الذي يُنشد\" + \"يُحقَّق\" — مبنيان للمجهول مع اسم موصول في بداية نقاش رسمي."
          },
          {
            "text": "أنا أشوف إن الإصلاح الاقتصادي محتاج تغييرات كثيرة في النظام.",
            "translation": "I see that economic reform needs many changes in the system.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"أشوف\" عامية — في البرامج الحوارية الرسمية قل \"أرى\" أو \"أعتقد\"."
          },
          {
            "text": "برأيي الصريح، ثمة إجماع على ضرورة الإصلاح، غير أن محور الخلاف يكمن في الأولويات والتسلسل الزمني.",
            "translation": "In my completely honest opinion, there is consensus on the necessity of reform, however the axis of disagreement lies in the priorities and timeline.",
            "nextStepId": "s3",
            "correct": true,
            "feedback": "رائع! \"برأيي الصريح\" + \"ثمة إجماع\" — افتتاح نقاشي رسمي بامتياز."
          },
          {
            "text": "صراحة الإصلاح مهم بس الجميع يتفق عليه والخلاف على التفاصيل فقط.",
            "translation": "Honestly, reform is important but everyone agrees on it and the disagreement is only on the details.",
            "nextStepId": "s3b",
            "correct": false,
            "feedback": "\"صراحة\" وحدها غير كافية كافتتاح — استخدم \"برأيي الصريح\" أو \"في تقديري\" للمستوى الحواري الرسمي."
          }
        ]
      },
      {
        "id": "s3",
        "speaker": "partner",
        "text": "وجهة نظر مثيرة. وما رأيكم في السياسة المالية التي اتُّبعت خلال السنوات الخمس الماضية؟",
        "translation": "An interesting viewpoint. And what is your opinion on the financial policy that was followed during the past five years?",
        "next": "s4"
      },
      {
        "id": "s3b",
        "speaker": "partner",
        "text": "نقطة مهمة. كيف تقيّمون السياسة المالية المتبعة خلال السنوات الأخيرة؟",
        "translation": "An important point. How do you assess the financial policy being followed in recent years?",
        "next": "s4"
      },
      {
        "id": "s4",
        "speaker": "user",
        "prompt": "Assess the financial policy critically:",
        "options": [
          {
            "text": "السياسة المالية التي اتُّبعت تُعتبر خطوة إيجابية، غير أن النتائج التي تحققت تبقى دون مستوى الطموح المُعلَن.",
            "translation": "The financial policy that was followed is considered a positive step, however the results that were achieved remain below the level of the declared ambition.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "ممتاز! \"التي اتُّبعت\" + \"تُعتبر\" + \"التي تحققت\" + \"المُعلَن\" — أربعة مبنيات للمجهول واسما موصول!"
          },
          {
            "text": "السياسة المالية فيها إيجابيات وسلبيات مثل أي سياسة ثانية.",
            "translation": "The financial policy has positives and negatives like any other policy.",
            "nextStepId": "s5",
            "correct": false,
            "feedback": "ضعيف جداً كتحليل — في البرنامج الحواري يجب أن تقدّم تقييماً نقدياً مدعوماً بأدلة."
          },
          {
            "text": "من الضروري أن يُقيَّم الأداء الاقتصادي بمعايير موضوعية لا بالمقارنة مع التوقعات التي أُعلنت في بداية المرحلة.",
            "translation": "It is essential that economic performance be evaluated by objective criteria not by comparison with the expectations that were announced at the beginning of the phase.",
            "nextStepId": "s5",
            "correct": true,
            "feedback": "رائع! \"من الضروري\" + \"يُقيَّم\" + \"أُعلنت\" — ثلاثة مبنيات للمجهول في تقييم منهجي."
          }
        ]
      },
      {
        "id": "s5",
        "speaker": "partner",
        "text": "تحليل دقيق. وكيف ترون دور القطاع الخاص في الإصلاح الاقتصادي؟",
        "translation": "A precise analysis. And how do you see the role of the private sector in economic reform?",
        "next": "s6"
      },
      {
        "id": "s6",
        "speaker": "user",
        "prompt": "Analyze the private sector's role:",
        "options": [
          {
            "text": "القطاع الخاص الذي يُعتمد عليه كمحرك رئيسي للنمو يحتاج بيئة تنظيمية تُشجَّع فيها المنافسة وتُصان فيها حقوق المستثمر.",
            "translation": "The private sector that is relied upon as the main driver of growth needs a regulatory environment in which competition is encouraged and investor rights are preserved.",
            "nextStepId": "s7",
            "correct": true,
            "feedback": "ممتاز! \"الذي يُعتمد عليه\" + \"تُشجَّع\" + \"تُصان\" — اسم موصول مع ثلاثة مبنيات للمجهول في جملة واحدة."
          },
          {
            "text": "القطاع الخاص مهم وكمان لازم الحكومة تدعمه.",
            "translation": "The private sector is important and also the government must support it.",
            "nextStepId": "s7",
            "correct": false,
            "feedback": "\"كمان\" و\"لازم\" عاميتان — قل \"إضافةً إلى ذلك، يجب على الحكومة دعمه\"."
          }
        ]
      },
      {
        "id": "s7",
        "speaker": "partner",
        "text": "نقطة جوهرية. وهل ثمة نماذج دولية يُستأنس بها في هذا الإطار؟",
        "translation": "A fundamental point. And are there international models that are used as reference in this framework?",
        "next": "s8"
      },
      {
        "id": "s8",
        "speaker": "user",
        "prompt": "Reference international models formally:",
        "options": [
          {
            "text": "التجربة السنغافورية التي كثيراً ما يُستشهَد بها تُعتبر نموذجاً ناجحاً، غير أن سياقها يختلف جذرياً عن السياق الخليجي الذي يتميز بخصائصه الثقافية والتاريخية.",
            "translation": "The Singaporean experience that is frequently cited is considered a successful model, however its context differs fundamentally from the Gulf context that is distinguished by its cultural and historical characteristics.",
            "nextStepId": "s9",
            "correct": true,
            "feedback": "ممتاز! \"يُستشهَد بها\" + \"تُعتبر\" + \"الذي يتميز\" — ثلاثة مبنيات للمجهول مع اسم موصول في تحليل مقارن."
          },
          {
            "text": "في دول كثيرة نجحوا في الإصلاح الاقتصادي ونقدر نتعلم منهم.",
            "translation": "Many countries succeeded in economic reform and we can learn from them.",
            "nextStepId": "s9",
            "correct": false,
            "feedback": "\"نقدر\" عامية — قل \"يمكننا الاستفادة من تجاربها\" في البرنامج الحواري الرسمي."
          }
        ]
      },
      {
        "id": "s9",
        "speaker": "partner",
        "text": "تحليل شامل ومتوازن. نشكركم على هذا الإثراء النوعي لبرنامجنا. والشكر موصول لمشاهدينا الكرام.",
        "translation": "A comprehensive and balanced analysis. We thank you for this qualitative enrichment of our program. And thanks are extended to our dear viewers.",
        "end": true
      }
    ],
    "completionMessage": "Outstanding! You delivered expert-level panel discussion commentary in formal MSA with extensive use of passive voice and relative clauses."
  },
];
