{
  id: 'saudi_convo_p1_hello_neighbor',
  phase: 1,
  title: 'Hello, Neighbor',
  description: 'Greet your neighbor when you run into them outside.',
  focalWordIds: ['w_hi_saudi', 'w_howru', 'w_good', 'w_thanks', 'w_goodbye'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! كيف الحال؟', translation: 'Hey! How are you?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'هلا! الحمد لله، زين', translation: 'Hey! Praise God, I\'m good.', nextStepId: 's3', correct: true, feedback: 'زين is the Saudi word for "good" — perfect register.' },
        { text: 'هلا! أنا جيد، شكراً', translation: 'Hey! I am fine, thanks.', nextStepId: 's3', correct: false, feedback: 'جيد is MSA. In Saudi dialect say زين instead.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'الله يسلمك، يا هلا!', translation: 'God keep you safe, welcome!', end: true },
  ],
  completionMessage: 'Great job greeting your neighbor in Saudi style!',
},

{
  id: 'saudi_convo_p1_morning_greet',
  phase: 1,
  title: 'Morning Greeting',
  description: 'Exchange morning greetings with someone you pass on the street.',
  focalWordIds: ['w_good_morning', 'w_good', 'w_howru', 'w_thanks', 'w_hi_saudi'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'صباح الخير!', translation: 'Good morning!', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'صباح النور!', translation: 'Morning of light!', nextStepId: 's3', correct: true, feedback: 'صباح النور is the classic Saudi response to صباح الخير.' },
        { text: 'مرحبا!', translation: 'Hello!', nextStepId: 's3', correct: false, feedback: 'مرحبا doesn\'t match the morning greeting pattern — use صباح النور.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'الله يصبحك بالخير!', translation: 'May God give you a good morning!', end: true },
  ],
  completionMessage: 'You nailed the Saudi morning greeting exchange!',
},

{
  id: 'saudi_convo_p1_name_intro',
  phase: 1,
  title: 'What\'s Your Name?',
  description: 'Tell someone your name when they ask.',
  focalWordIds: ['w_hi_saudi', 'w_name', 'w_my_name', 'w_whats_your_name', 'w_nice_to_meet'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! وش اسمك؟', translation: 'Hey! What\'s your name?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'اسمي سارة. وأنت؟', translation: 'My name is Sara. And you?', nextStepId: 's3', correct: true, feedback: 'اسمي is natural in Saudi speech and turning the question back is polite.' },
        { text: 'أنا اسمي سارة، شكراً', translation: 'I am my name is Sara, thanks.', nextStepId: 's3', correct: false, feedback: 'أنا اسمي is redundant. Just say اسمي سارة.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'اسمي فهد. تشرفنا!', translation: 'My name is Fahad. Nice to meet you!', end: true },
  ],
  completionMessage: 'Well done introducing yourself in Saudi Arabic!',
},

{
  id: 'saudi_convo_p1_age_ask',
  phase: 1,
  title: 'How Old Are You?',
  description: 'Answer when someone asks your age in a friendly way.',
  focalWordIds: ['w_hi_saudi', 'w_age', 'w_years', 'w_how_old', 'w_good'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'عمرك كم سنة؟', translation: 'How old are you?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'عمري عشرين سنة', translation: 'I am twenty years old.', nextStepId: 's3', correct: true, feedback: 'عمري + number + سنة is the natural Saudi way to state your age.' },
        { text: 'أنا عندي عشرين', translation: 'I have twenty.', nextStepId: 's3', correct: false, feedback: 'عندي works for possessions. For age, use عمري.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'زين، الله يحفظك!', translation: 'Good, may God protect you!', end: true },
  ],
  completionMessage: 'You answered the age question perfectly!',
},

{
  id: 'saudi_convo_p1_simple_thanks',
  phase: 1,
  title: 'Saying Thank You',
  description: 'Respond properly when someone does something kind for you.',
  focalWordIds: ['w_thanks', 'w_welcome', 'w_good', 'w_hi_saudi', 'w_please'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تفضل، هذا لك.', translation: 'Here you go, this is for you.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'مشكور! الله يعطيك العافية', translation: 'Thank you! May God give you health.', nextStepId: 's3', correct: true, feedback: 'مشكور + الله يعطيك العافية is a warm and natural Saudi thank-you.' },
        { text: 'شكراً جزيلاً لك جداً', translation: 'Thank you very very much to you.', nextStepId: 's3', correct: false, feedback: 'This is too wordy. مشكور or شكراً alone is natural in Saudi speech.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'هلا وغلا! بكل سرور.', translation: 'Welcome! My pleasure.', end: true },
  ],
  completionMessage: 'That\'s the warm Saudi way to say thank you!',
},

{
  id: 'saudi_convo_p1_saying_goodbye',
  phase: 1,
  title: 'Saying Goodbye',
  description: 'Say farewell to a friend who is leaving.',
  focalWordIds: ['w_goodbye', 'w_hi_saudi', 'w_good', 'w_see_you', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'يلا، باي باي! مع السلامة.', translation: 'Alright, bye bye! Go in peace.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'الله يسلمك! نشوفك بكره.', translation: 'God keep you safe! See you tomorrow.', nextStepId: 's3', correct: true, feedback: 'الله يسلمك is the standard Saudi farewell response to مع السلامة.' },
        { text: 'وداعاً، إلى اللقاء.', translation: 'Farewell, until we meet.', nextStepId: 's3', correct: false, feedback: 'وداعاً is formal MSA. Use الله يسلمك in Saudi conversation.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'إن شاء الله! يلا، باي.', translation: 'God willing! Alright, bye.', end: true },
  ],
  completionMessage: 'You said goodbye the Saudi way — great job!',
},

{
  id: 'saudi_convo_p1_meet_kid',
  phase: 1,
  title: 'Meeting a Child',
  description: 'Greet a young child you meet for the first time.',
  focalWordIds: ['w_hi_saudi', 'w_name', 'w_howru', 'w_good', 'w_nice_to_meet'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا صغير! وش اسمك؟', translation: 'Hey little one! What\'s your name?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'اسمي علي. هلا!', translation: 'My name is Ali. Hey!', nextStepId: 's3', correct: true, feedback: 'Short and natural — perfect for a child\'s reply in Saudi Arabic.' },
        { text: 'يشرفني التعارف، اسمي علي.', translation: 'It is an honor to meet you, my name is Ali.', nextStepId: 's3', correct: false, feedback: 'Too formal for a child. Keep it simple: اسمي علي.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'هلا هلا يا علي! زين.', translation: 'Welcome, welcome Ali! Good.', end: true },
  ],
  completionMessage: 'You introduced the child naturally in Saudi dialect!',
},

{
  id: 'saudi_convo_p1_meet_uncle',
  phase: 1,
  title: 'Greeting an Uncle',
  description: 'Greet an older male relative respectfully in the Saudi way.',
  focalWordIds: ['w_hi_saudi', 'w_howru', 'w_good', 'w_thanks', 'w_uncle'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا يا ولد! كيف حالك؟', translation: 'Hey boy! How are you?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'الحمد لله زين يا عمي. وأنت؟', translation: 'Praise God, I\'m well uncle. And you?', nextStepId: 's3', correct: true, feedback: 'يا عمي shows respect to an older male. Adding وأنت؟ is polite.' },
        { text: 'زين شكراً.', translation: 'Good, thanks.', nextStepId: 's3', correct: false, feedback: 'Correct words, but not asking back is a bit abrupt with an elder.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'الله يسلمك! هلا وغلا.', translation: 'God keep you safe! Welcome.', end: true },
  ],
  completionMessage: 'You greeted your uncle respectfully in Saudi style!',
},

{
  id: 'saudi_convo_p1_phone_hello',
  phase: 1,
  title: 'Answering the Phone',
  description: 'Greet a friend when they call you on the phone.',
  focalWordIds: ['w_hi_saudi', 'w_howru', 'w_good', 'w_yes', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! مين معي؟', translation: 'Hey! Who am I speaking with?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'هلا! معك نورة. كيف الحال؟', translation: 'Hey! It\'s Noura. How are you?', nextStepId: 's3', correct: true, feedback: 'معك + name is the natural Saudi way to identify yourself on a call.' },
        { text: 'نعم، أنا هنا.', translation: 'Yes, I am here.', nextStepId: 's3', correct: false, feedback: 'This doesn\'t answer who you are. Say معك + your name.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'أوه نورة! هلا والله. زين؟', translation: 'Oh Noura! Hey, really. Good?', end: true },
  ],
  completionMessage: 'You answered the phone the Saudi way!',
},

{
  id: 'saudi_convo_p1_doorbell',
  phase: 1,
  title: 'Someone at the Door',
  description: 'Respond when a neighbor knocks at your door.',
  focalWordIds: ['w_hi_saudi', 'w_yes', 'w_welcome', 'w_come_in', 'w_good'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'السلام عليكم! في أحد؟', translation: 'Peace be upon you! Is anyone home?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'وعليكم السلام! هلا، تفضل.', translation: 'And upon you peace! Hey, come in.', nextStepId: 's3', correct: true, feedback: 'Responding to السلام عليكم with وعليكم السلام is required, then welcome them in.' },
        { text: 'هلا! مين هناك؟', translation: 'Hey! Who\'s there?', nextStepId: 's3', correct: false, feedback: 'You must respond to السلام عليكم before anything else.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'مشكور، هلا وغلا!', translation: 'Thank you, welcome!', end: true },
  ],
  completionMessage: 'You welcomed your neighbor at the door perfectly!',
},

{
  id: 'saudi_convo_p1_introduce_friend',
  phase: 1,
  title: 'Introducing a Friend',
  description: 'Introduce your friend to someone you both just met.',
  focalWordIds: ['w_hi_saudi', 'w_name', 'w_my_friend', 'w_nice_to_meet', 'w_good'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! وش اسم صاحبك؟', translation: 'Hey! What\'s your friend\'s name?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'هذا صاحبي خالد. تشرفنا!', translation: 'This is my friend Khalid. Nice to meet you!', nextStepId: 's3', correct: true, feedback: 'هذا صاحبي + name is the natural Saudi way to introduce a friend.' },
        { text: 'صديقي اسمه خالد.', translation: 'My friend is named Khalid.', nextStepId: 's3', correct: false, feedback: 'صديقي is MSA. In Saudi dialect say صاحبي for "my friend".' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'هلا يا خالد! تشرفنا.', translation: 'Hey Khalid! Nice to meet you.', end: true },
  ],
  completionMessage: 'You introduced your friend in perfect Saudi style!',
},

{
  id: 'saudi_convo_p1_yes_no',
  phase: 1,
  title: 'Yes or No?',
  description: 'Practice giving a simple yes or no answer to a question.',
  focalWordIds: ['w_yes', 'w_no', 'w_good', 'w_thanks', 'w_hi_saudi'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'عندك ماء؟', translation: 'Do you have water?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'إي، عندي. تفضل!', translation: 'Yes, I have some. Here you go!', nextStepId: 's3', correct: true, feedback: 'إي is the casual Saudi "yes" and عندي matches the verb from the question.' },
        { text: 'نعم، أنا أملك ماءً.', translation: 'Yes, I possess water.', nextStepId: 's3', correct: false, feedback: 'Too formal and MSA. Use إي عندي in Saudi speech.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'مشكور! الله يعطيك العافية.', translation: 'Thank you! May God give you health.', end: true },
  ],
  completionMessage: 'You used yes and no naturally in Saudi dialect!',
},

{
  id: 'saudi_convo_p1_pronoun_practice',
  phase: 1,
  title: 'Who Is This?',
  description: 'Practice using pronouns to point out who someone is.',
  focalWordIds: ['w_this', 'w_he', 'w_she', 'w_name', 'w_hi_saudi'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'مين هذي؟', translation: 'Who is this (girl)?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'هذي أختي لمى.', translation: 'This is my sister Lama.', nextStepId: 's3', correct: true, feedback: 'هذي is the Saudi feminine "this" — correct use of the pronoun.' },
        { text: 'هذا أختي لمى.', translation: 'This (masc.) is my sister Lama.', nextStepId: 's3', correct: false, feedback: 'هذا is masculine. For a female person use هذي in Saudi dialect.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'هلا يا لمى! تشرفنا.', translation: 'Hey Lama! Nice to meet you.', end: true },
  ],
  completionMessage: 'You used the right Saudi pronoun — هذي for females!',
},

{
  id: 'saudi_convo_p1_at_school',
  phase: 1,
  title: 'At School',
  description: 'Greet a classmate at the start of the school day.',
  focalWordIds: ['w_hi_saudi', 'w_howru', 'w_good', 'w_thanks', 'w_name'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! زين؟', translation: 'Hey! Good?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'إي والله، زين. وأنت؟', translation: 'Yes by God, I\'m good. And you?', nextStepId: 's3', correct: true, feedback: 'إي والله is a natural filler in Saudi speech, and asking وأنت؟ is friendly.' },
        { text: 'بخير الحمد لله.', translation: 'I\'m fine, praise God.', nextStepId: 's3', correct: false, feedback: 'بخير is understood but less common in casual Saudi schoolyard talk. زين fits better.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'الحمد لله! يلا نروح الفصل.', translation: 'Praise God! Come on let\'s go to class.', end: true },
  ],
  completionMessage: 'You greeted your classmate the Saudi way — well done!',
},

{
  id: 'saudi_convo_p1_shop_hello',
  phase: 1,
  title: 'Entering a Shop',
  description: 'Exchange greetings with a shopkeeper when you walk in.',
  focalWordIds: ['w_hi_saudi', 'w_welcome', 'w_good', 'w_please', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا وغلا! أهلاً وسهلاً.', translation: 'Welcome! Hello and welcome.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'هلا! الله يسلمك.', translation: 'Hey! God keep you safe.', nextStepId: 's3', correct: true, feedback: 'هلا! الله يسلمك is a warm and natural Saudi response to a shopkeeper\'s welcome.' },
        { text: 'شكراً جزيلاً على الترحيب.', translation: 'Thank you very much for the welcome.', nextStepId: 's3', correct: false, feedback: 'Too formal. Keep it simple and warm: هلا! الله يسلمك.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'تفضل، كيف أقدر أساعدك؟', translation: 'Please, how can I help you?', end: true },
  ],
  completionMessage: 'You greeted the shopkeeper naturally in Saudi Arabic!',
},

{
  id: 'saudi_convo_p1_neighbor_smile',
  phase: 1,
  title: 'Passing a Neighbor',
  description: 'Exchange a quick friendly greeting when passing a neighbor.',
  focalWordIds: ['w_hi_saudi', 'w_howru', 'w_good', 'w_goodbye', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! كيفك؟', translation: 'Hey! How are you?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'هلا! تمام، الحمد لله.', translation: 'Hey! Perfect, praise God.', nextStepId: 's3', correct: true, feedback: 'تمام is a natural Saudi answer meaning "perfect/all good".' },
        { text: 'أنا بصحة جيدة، شكراً.', translation: 'I am in good health, thank you.', nextStepId: 's3', correct: false, feedback: 'بصحة جيدة is stiff MSA. Say تمام or زين instead.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'الله يسلمك! يلا باي.', translation: 'God keep you safe! Alright bye.', end: true },
  ],
  completionMessage: 'Quick and natural — that\'s the Saudi way to pass a neighbor!',
},

{
  id: 'saudi_convo_p1_morning_kids',
  phase: 1,
  title: 'Good Morning to Kids',
  description: 'Exchange morning greetings with children in the family.',
  focalWordIds: ['w_good_morning', 'w_hi_saudi', 'w_good', 'w_thanks', 'w_howru'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'يلا يا ولاد! صباح الخير.', translation: 'Come on kids! Good morning.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'صباح النور يا بابا!', translation: 'Morning of light, Dad!', nextStepId: 's3', correct: true, feedback: 'صباح النور is the correct Saudi reply to صباح الخير, with يا بابا being warm and natural.' },
        { text: 'مساء الخير يا بابا!', translation: 'Good evening, Dad!', nextStepId: 's3', correct: false, feedback: 'مساء الخير is for evenings. It\'s morning, so say صباح النور.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'زين! يلا فطروا، الأكل جاهز.', translation: 'Good! Come on eat breakfast, the food is ready.', end: true },
  ],
  completionMessage: 'You responded to the morning greeting correctly!',
},

{
  id: 'saudi_convo_p1_late_night',
  phase: 1,
  title: 'Good Night',
  description: 'Say goodnight before heading to bed.',
  focalWordIds: ['w_good_night', 'w_goodbye', 'w_good', 'w_thanks', 'w_hi_saudi'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تصبح على خير! أنا رايح أنام.', translation: 'Good night! I\'m going to sleep.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'وأنت من أهل الخير! تصبح على خير.', translation: 'And you are among the good people! Good night.', nextStepId: 's3', correct: true, feedback: 'وأنت من أهل الخير is the classic Saudi response to تصبح على خير.' },
        { text: 'مساء النور! نوماً هنيئاً.', translation: 'Evening of light! Sleep well.', nextStepId: 's3', correct: false, feedback: 'مساء النور is for early evening. The reply to تصبح على خير is وأنت من أهل الخير.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'الله يسلمك! إلى بكره.', translation: 'God keep you safe! Until tomorrow.', end: true },
  ],
  completionMessage: 'You said goodnight perfectly in Saudi Arabic!',
},

{
  id: 'saudi_convo_p1_quick_thanks',
  phase: 1,
  title: 'Quick Thank You',
  description: 'Thank someone quickly when they help you with a small favor.',
  focalWordIds: ['w_thanks', 'w_welcome', 'w_good', 'w_hi_saudi', 'w_please'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هذي كتابك، تفضل.', translation: 'This is your book, here you go.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'مشكور! الله يعطيك العافية.', translation: 'Thank you! May God give you health.', nextStepId: 's3', correct: true, feedback: 'مشكور is the go-to quick Saudi thank-you, and الله يعطيك العافية adds warmth.' },
        { text: 'جزاك الله خيراً كثيراً.', translation: 'May God reward you with much good.', nextStepId: 's3', correct: false, feedback: 'جزاك الله خيراً is more formal and religious. مشكور is more natural for everyday thanks.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'هلا! بكل سرور.', translation: 'Welcome! With pleasure.', end: true },
  ],
  completionMessage: 'Quick, warm, and natural — that\'s Saudi thanks done right!',
},

{
  id: 'saudi_convo_p1_friend_intro',
  phase: 1,
  title: 'Meeting a New Friend',
  description: 'Introduce yourself to someone new at a gathering.',
  focalWordIds: ['w_hi_saudi', 'w_name', 'w_my_name', 'w_nice_to_meet', 'w_howru'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! أنا محمد. وأنت؟', translation: 'Hey! I\'m Mohammed. And you?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Pick a reply:',
      options: [
        { text: 'هلا يا محمد! أنا ريم. تشرفنا.', translation: 'Hey Mohammed! I\'m Reem. Nice to meet you.', nextStepId: 's3', correct: true, feedback: 'Greeting by name, introducing yourself, and saying تشرفنا is the full friendly Saudi intro.' },
        { text: 'يسعدني بمقابلتك، اسمي ريم.', translation: 'I am pleased to meet you, my name is Reem.', nextStepId: 's3', correct: false, feedback: 'يسعدني بمقابلتك is stiff MSA. Use تشرفنا for "nice to meet you" in Saudi Arabic.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'تشرفنا يا ريم! هلا وغلا.', translation: 'Nice to meet you Reem! Welcome.', end: true },
  ],
  completionMessage: 'You introduced yourself to a new friend in perfect Saudi style!',
}
