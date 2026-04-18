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
];
