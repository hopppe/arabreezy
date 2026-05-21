{
  id: 'saudi_convo_p4_ask_directions_mosque',
  phase: 4,
  title: 'How Do I Get to the Mosque?',
  description: 'Ask a passerby for directions to the nearest mosque.',
  focalWordIds: ['w_mosque', 'w_right', 'w_left', 'w_straight', 'w_go'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أيوه، أقدر أساعدك؟', translation: 'Yes, can I help you?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask where the mosque is:',
      options: [
        { text: 'وين المسجد من هنا؟', translation: 'Where is the mosque from here?', nextStepId: 's3', correct: true, feedback: 'وين is the Saudi word for "where" — perfect register.' },
        { text: 'أين المسجد من هنا؟', translation: 'Where is the mosque from here?', nextStepId: 's3', correct: false, feedback: 'أين is MSA. In Saudi dialect say وين instead.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'امشي على طول، وبعدين لف يمين عند الإشارة.', translation: 'Go straight, then turn right at the traffic light.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Confirm you understood:',
      options: [
        { text: 'زين، على طول وبعدين يمين — شكراً!', translation: 'Good, straight then right — thanks!', nextStepId: 's5', correct: true, feedback: 'Repeating the directions back is natural and polite in Saudi conversation.' },
        { text: 'لا أفهم، قل لي مرة ثانية.', translation: 'I don\'t understand, tell me again.', nextStepId: 's5', correct: false, feedback: 'If you understood, confirm it — asking again when you heard clearly can seem rude.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'الله يوفقك، المسجد قريب!', translation: 'May God grant you success, the mosque is close!', end: true },
  ],
  completionMessage: 'Great job asking for directions to the mosque in Saudi Arabic!',
},

{
  id: 'saudi_convo_p4_ask_directions_bakery',
  phase: 4,
  title: 'Where is the Bakery?',
  description: 'Find a bakery by asking someone on the street.',
  focalWordIds: ['w_bread', 'w_right', 'w_left', 'w_straight', 'w_where'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا، تبي شي؟', translation: 'Hey, do you want something?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask where the bakery is:',
      options: [
        { text: 'وين المخبز القريب من هنا؟', translation: 'Where is the nearest bakery from here?', nextStepId: 's3', correct: true, feedback: 'وين + location is the standard Saudi way to ask directions.' },
        { text: 'هل يوجد مخبز قريب؟', translation: 'Is there a nearby bakery?', nextStepId: 's3', correct: false, feedback: 'هل يوجد is formal MSA. In Saudi dialect say في مخبز قريب? or وين المخبز؟' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'في مخبز شارع البلد، روح يسار بعد البنك.', translation: 'There is a bakery on Al-Balad street, go left after the bank.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Thank them properly:',
      options: [
        { text: 'يسلموا، الله يعطيك العافية!', translation: 'Thank you, may God give you health!', nextStepId: 's5', correct: true, feedback: 'الله يعطيك العافية is the classic Saudi thank-you phrase for help.' },
        { text: 'أوكي، شكراً جزيلاً جداً.', translation: 'OK, very many thanks.', nextStepId: 's5', correct: false, feedback: 'شكراً جزيلاً is fine, but الله يعطيك العافية sounds much more natural in Saudi context.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'وإياك، تفضل!', translation: 'And you too, go ahead!', end: true },
  ],
  completionMessage: 'You found the bakery with great Saudi Arabic!',
},

{
  id: 'saudi_convo_p4_what_time_is_it',
  phase: 4,
  title: 'What Time Is It?',
  description: 'Ask someone for the time and respond when they ask back.',
  focalWordIds: ['w_now', 'w_today', 'w_yawm', 'w_subh', 'w_layl'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'لو سمحت، كم الساعة الحين؟', translation: 'Excuse me, what time is it now?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Tell them the time:',
      options: [
        { text: 'الساعة ثلاثة وربع.', translation: 'It is quarter past three.', nextStepId: 's3', correct: true, feedback: 'الساعة + time is the natural Saudi way to state the time.' },
        { text: 'الوقت هو الثالثة وخمسة عشر دقيقة.', translation: 'The time is three fifteen minutes.', nextStepId: 's3', correct: false, feedback: 'Too formal. Simply say الساعة ثلاثة وربع — ربع means quarter in everyday speech.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'شكراً! وين تروح الحين؟', translation: 'Thanks! Where are you going now?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Say where you are going:',
      options: [
        { text: 'أروح السوق، عندي شغل هناك.', translation: 'I\'m going to the market, I have work there.', nextStepId: 's5', correct: true, feedback: 'أروح is the correct Saudi 1st-person present for "I go/am going".' },
        { text: 'سأذهب إلى السوق للعمل.', translation: 'I will go to the market to work.', nextStepId: 's5', correct: false, feedback: 'سأذهب is MSA future. In Saudi dialect say أروح for "I am going".' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'الله يوفقك في شغلك!', translation: 'May God grant you success in your work!', end: true },
  ],
  completionMessage: 'You handled the time question like a Saudi local!',
},

{
  id: 'saudi_convo_p4_where_going',
  phase: 4,
  title: 'Where Are You Off To?',
  description: 'Chat with a neighbour who asks where you are headed.',
  focalWordIds: ['w_go', 'w_market', 'w_now', 'w_mosque', 'w_where'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! وين رايح؟', translation: 'Hey! Where are you headed?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Tell them where you are going:',
      options: [
        { text: 'أروح المسجد، الصلاة بعد شوي.', translation: 'I\'m heading to the mosque, prayer is in a bit.', nextStepId: 's3', correct: true, feedback: 'أروح is the Saudi present-tense verb for going — great use of dialect.' },
        { text: 'ذاهب إلى المسجد للصلاة.', translation: 'Going to the mosque to pray.', nextStepId: 's3', correct: false, feedback: 'ذاهب is MSA. The Saudi equivalent is رايح or أروح.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'والله! أنا كمان أروح. نروح سوا؟', translation: 'Really! I am going too. Shall we go together?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Agree to go together:',
      options: [
        { text: 'تمام، نروح سوا — يالله!', translation: 'Great, let\'s go together — let\'s go!', nextStepId: 's5', correct: true, feedback: 'يالله is the classic Saudi "let\'s go" — energetic and natural.' },
        { text: 'نعم، يمكننا الذهاب معاً.', translation: 'Yes, we can go together.', nextStepId: 's5', correct: false, feedback: 'Correct meaning but too MSA. Say تمام، نروح سوا! for natural Saudi flow.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'زين، يالله نمشي!', translation: 'Good, let\'s walk!', end: true },
  ],
  completionMessage: 'Excellent! You navigated a casual Saudi outing chat!',
},

{
  id: 'saudi_convo_p4_visit_aunt',
  phase: 4,
  title: 'Visiting Auntie',
  description: 'Tell a friend you are going to visit your aunt today.',
  focalWordIds: ['w_today', 'w_yawm', 'w_go', 'w_come', 'w_mother'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'وش برنامجك اليوم؟', translation: 'What are your plans today?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Tell them your plan:',
      options: [
        { text: 'أزور عمتي اليوم، ما شفتها من زمان.', translation: 'I am visiting my aunt today, I haven\'t seen her in a while.', nextStepId: 's3', correct: true, feedback: 'أزور is a natural Saudi 1st-person present — well done.' },
        { text: 'سوف أزور عمتي في هذا اليوم.', translation: 'I will visit my aunt on this day.', nextStepId: 's3', correct: false, feedback: 'سوف أزور is MSA future. In casual Saudi speech say أزور or رايح أزور.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'ما شاء الله، وين تسكن عمتك؟', translation: 'MashaAllah, where does your aunt live?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Say where your aunt lives:',
      options: [
        { text: 'تسكن في حي النسيم، قريبة من هنا.', translation: 'She lives in Al-Naseem neighbourhood, near here.', nextStepId: 's5', correct: true, feedback: 'في + location is the correct Saudi locative construction.' },
        { text: 'هي مقيمة بمنطقة حي النسيم.', translation: 'She resides in the area of Al-Naseem district.', nextStepId: 's5', correct: false, feedback: 'مقيمة is too formal. تسكن في is the natural Saudi expression for "she lives in".' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'ربك يسلمها، بلغها السلام!', translation: 'May God keep her safe, send her my greetings!', end: true },
  ],
  completionMessage: 'Nicely done! You shared your family visit plan in smooth Saudi Arabic!',
},

{
  id: 'saudi_convo_p4_go_to_market',
  phase: 4,
  title: 'Heading to the Market',
  description: 'A shopkeeper greets you as you arrive at the market.',
  focalWordIds: ['w_market', 'w_bread', 'w_meat', 'w_go', 'w_want'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً وسهلاً! تبي شي اليوم؟', translation: 'Welcome! Do you want something today?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Say what you want to buy:',
      options: [
        { text: 'أبي خبز وشوية خضار.', translation: 'I want bread and some vegetables.', nextStepId: 's3', correct: true, feedback: 'أبي is the Saudi form of "I want" — authentic and natural.' },
        { text: 'أريد شراء الخبز والخضروات.', translation: 'I want to buy bread and vegetables.', nextStepId: 's3', correct: false, feedback: 'أريد is MSA. In Saudi dialect use أبي for "I want".' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'عندنا خبز طازج وخضار كثير. كمان تبي شي ثاني؟', translation: 'We have fresh bread and lots of vegetables. Do you want anything else?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Ask if they have chicken:',
      options: [
        { text: 'عندكم دجاج كمان؟', translation: 'Do you have chicken too?', nextStepId: 's5', correct: true, feedback: 'عندكم? is the simple Saudi way to ask if something is available.' },
        { text: 'هل لديكم دجاج أيضاً؟', translation: 'Do you have chicken as well?', nextStepId: 's5', correct: false, feedback: 'هل لديكم is MSA. Say عندكم? for a natural Saudi question.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'أيوه، دجاج طازج! تفضل معي.', translation: 'Yes, fresh chicken! Come with me.', end: true },
  ],
  completionMessage: 'You shopped at the Saudi market like a pro!',
},

{
  id: 'saudi_convo_p4_taxi_to_mall',
  phase: 4,
  title: 'Taxi to the Mall',
  description: 'Hail a taxi and tell the driver where you want to go.',
  focalWordIds: ['w_go', 'w_now', 'w_right', 'w_straight', 'w_market'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! وين تبي تروح؟', translation: 'Hey! Where do you want to go?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Tell the driver your destination:',
      options: [
        { text: 'أروح المول، من فضلك.', translation: 'I am going to the mall, please.', nextStepId: 's3', correct: true, feedback: 'أروح + destination is the natural Saudi way to give the driver your destination.' },
        { text: 'أريد الذهاب إلى المركز التجاري.', translation: 'I want to go to the shopping centre.', nextStepId: 's3', correct: false, feedback: 'Too formal. Just say أروح المول — short and natural in Saudi dialect.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'تمام، بس في زحمة الحين. يمكن ناخذ طريق ثاني؟', translation: 'OK, but there is traffic now. Can we take another route?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Agree to the alternate route:',
      options: [
        { text: 'لا بأس، روح اللي تشوف فيه.', translation: 'No problem, go whichever way you see fit.', nextStepId: 's5', correct: true, feedback: 'لا بأس is the perfect relaxed Saudi agreement — trusting and natural.' },
        { text: 'نعم، يمكنك أخذ طريق مختلف.', translation: 'Yes, you may take a different route.', nextStepId: 's5', correct: false, feedback: 'Grammatically fine but too formal. لا بأس، روح اللي تشوف flows much better in Saudi conversation.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'زين، إن شاء الله نوصل بسرعة!', translation: 'Good, God willing we will arrive quickly!', end: true },
  ],
  completionMessage: 'You handled the taxi ride in fluent Saudi Arabic!',
},

{
  id: 'saudi_convo_p4_call_friend',
  phase: 4,
  title: 'Calling a Friend',
  description: 'Phone a friend to check if they are free to meet up.',
  focalWordIds: ['w_friend', 'w_now', 'w_go', 'w_come', 'w_today'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'آلو؟ هلا وغلا!', translation: 'Hello? Hey, welcome!', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask if your friend is free now:',
      options: [
        { text: 'هلا! فاضي الحين؟ أبي أجي أشوفك.', translation: 'Hey! Are you free now? I want to come see you.', nextStepId: 's3', correct: true, feedback: 'فاضي is the Saudi word for "free/available" and أجي is the correct 1st-person present for "come".' },
        { text: 'هل أنت متاح الآن؟ أريد أن أزورك.', translation: 'Are you available now? I want to visit you.', nextStepId: 's3', correct: false, feedback: 'متاح and أريد أن are MSA. Say فاضي and أبي أجي for Saudi register.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'والله أنا في البيت، تعال! أجيب غداء؟', translation: 'Honestly I am at home, come! Shall I bring lunch?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Accept the invitation warmly:',
      options: [
        { text: 'يسلموا! ما يحتاج تكلف، أجي بس أشوفك.', translation: 'Thank you! No need to fuss, I am just coming to see you.', nextStepId: 's5', correct: true, feedback: 'ما يحتاج تكلف is the gracious Saudi way to say "don\'t go to any trouble".' },
        { text: 'لا شكراً، لست بحاجة لطعام.', translation: 'No thank you, I do not need food.', nextStepId: 's5', correct: false, feedback: 'Too blunt and formal. ما يحتاج تكلف is warmer and more natural in Saudi culture.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'خير إن شاء الله، بنتظرك!', translation: 'Fine God willing, I will wait for you!', end: true },
  ],
  completionMessage: 'You made plans with your friend in perfect Saudi style!',
},

{
  id: 'saudi_convo_p4_morning_routine',
  phase: 4,
  title: 'Morning Routine Chat',
  description: 'Talk about what you do every morning with a colleague.',
  focalWordIds: ['w_subh', 'w_coffee', 'w_tea', 'w_today', 'w_now'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'صباح الخير! شربت قهوتك الصبح؟', translation: 'Good morning! Did you drink your morning coffee?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Say you always drink tea in the morning:',
      options: [
        { text: 'أشرب شاي كل صبح، ما أقدر أبدأ بدونه!', translation: 'I drink tea every morning, I can\'t start without it!', nextStepId: 's3', correct: true, feedback: 'أشرب is the correct Saudi 1st-person present for "I drink" — great use of the verb.' },
        { text: 'أنا أفضل شرب الشاي في الصباح.', translation: 'I prefer drinking tea in the morning.', nextStepId: 's3', correct: false, feedback: 'أفضل شرب is MSA style. أشرب شاي كل صبح is more natural and direct in Saudi dialect.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'شاي! مثل أهلنا الكبار. وش تاكل الصبح؟', translation: 'Tea! Just like our elders. What do you eat in the morning?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Tell them what you eat for breakfast:',
      options: [
        { text: 'آكل خبز مع بيض، بسيط بس كافي.', translation: 'I eat bread with eggs, simple but enough.', nextStepId: 's5', correct: true, feedback: 'آكل is the natural Saudi 1st-person present for "I eat" — well done.' },
        { text: 'في الصباح أتناول الخبز مع البيض.', translation: 'In the morning I have bread with eggs.', nextStepId: 's5', correct: false, feedback: 'أتناول is formal MSA. آكل is the natural Saudi word for "I eat".' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'زين! الفطور الصحي يعطيك طاقة طول اليوم.', translation: 'Good! A healthy breakfast gives you energy all day.', end: true },
  ],
  completionMessage: 'You chatted about your morning routine in authentic Saudi Arabic!',
},

{
  id: 'saudi_convo_p4_what_eating',
  phase: 4,
  title: 'What Are You Eating?',
  description: 'A friend spots you eating and asks what you have.',
  focalWordIds: ['w_meat', 'w_chicken', 'w_rice', 'w_bread', 'w_good'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'وش تاكل؟ يبدو حلو!', translation: 'What are you eating? It looks good!', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Tell them what you are eating:',
      options: [
        { text: 'آكل رز مع دجاج، جربه معي!', translation: 'I am eating rice with chicken, try it with me!', nextStepId: 's3', correct: true, feedback: 'آكل is the correct Saudi present-tense form for "I eat/am eating" — natural and warm.' },
        { text: 'أنا آكل طبق من الأرز والدجاج.', translation: 'I am eating a plate of rice and chicken.', nextStepId: 's3', correct: false, feedback: 'Grammatically fine but awkwardly formal. Drop أنا and say آكل رز مع دجاج directly.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'ما شاء الله، من وين؟', translation: 'MashaAllah, from where?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Tell them where the food is from:',
      options: [
        { text: 'من المطعم اللي في الزاوية، أكله زين جداً.', translation: 'From the restaurant on the corner, their food is really good.', nextStepId: 's5', correct: true, feedback: 'في + location is the correct Saudi locative pattern — well used.' },
        { text: 'اشتريته من مطعم قريب من الزاوية.', translation: 'I bought it from a nearby restaurant on the corner.', nextStepId: 's5', correct: false, feedback: 'Correct but a bit wordy. من المطعم اللي في الزاوية is crisper and more natural.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'صحتين! بكرة أجرب معك إن شاء الله.', translation: 'Bon appétit! Tomorrow I will try with you God willing.', end: true },
  ],
  completionMessage: 'You described your meal perfectly in Saudi Arabic!',
},

{
  id: 'saudi_convo_p4_where_working',
  phase: 4,
  title: 'Where Do You Work?',
  description: 'Someone you just met asks about your job.',
  focalWordIds: ['w_maktab', 'w_madrasa', 'w_now', 'w_today', 'w_go'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'وين تشتغل؟', translation: 'Where do you work?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Tell them where you work:',
      options: [
        { text: 'أشتغل في مكتب في وسط المدينة.', translation: 'I work in an office in the city centre.', nextStepId: 's3', correct: true, feedback: 'أشتغل is the correct Saudi 1st-person present for "I work" — excellent.' },
        { text: 'أعمل في مكتب بوسط المدينة.', translation: 'I work in an office in the city centre.', nextStepId: 's3', correct: false, feedback: 'أعمل is MSA. In Saudi dialect say أشتغل for "I work".' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'زين! بعيد عن بيتك؟', translation: 'Good! Is it far from your house?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Say it is close and you walk:',
      options: [
        { text: 'لا، قريب. أمشي كل يوم، ما أحتاج سيارة.', translation: 'No, it is close. I walk every day, I don\'t need a car.', nextStepId: 's5', correct: true, feedback: 'أمشي is the natural Saudi 1st-person present for walking — great dialect use.' },
        { text: 'كلا، إنه قريب وأذهب سيراً على الأقدام.', translation: 'No, it is close and I go on foot.', nextStepId: 's5', correct: false, feedback: 'أذهب سيراً على الأقدام is MSA. أمشي is how Saudi speakers say "I walk".' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'والله صحتك! المشي مفيد جداً.', translation: 'Wow good for you! Walking is very beneficial.', end: true },
  ],
  completionMessage: 'You talked about your job and commute in natural Saudi Arabic!',
},

{
  id: 'saudi_convo_p4_at_park',
  phase: 4,
  title: 'At the Park',
  description: 'Strike up a conversation with someone sitting near you at the park.',
  focalWordIds: ['w_good', 'w_today', 'w_layl', 'w_subh', 'w_now'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! الجو زين اليوم، مو كذا؟', translation: 'Hey! The weather is nice today, isn\'t it?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Agree and say you come here often:',
      options: [
        { text: 'أيوه، زين جداً! أجي هنا كل يوم أتمشى.', translation: 'Yes, very nice! I come here every day to walk.', nextStepId: 's3', correct: true, feedback: 'أجي is the Saudi 1st-person present for "I come" — perfectly used.' },
        { text: 'نعم، الجو لطيف. أزور هذا المكان بانتظام.', translation: 'Yes, the weather is pleasant. I visit this place regularly.', nextStepId: 's3', correct: false, feedback: 'أزور هذا المكان بانتظام is too formal. أجي هنا كل يوم is natural Saudi speech.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'ما شاء الله، وين تسكن؟ قريب من هنا؟', translation: 'MashaAllah, where do you live? Near here?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Say you live nearby:',
      options: [
        { text: 'أيوه، أسكن في الحي اللي وراء، خمس دقايق مشي.', translation: 'Yes, I live in the neighbourhood behind, five minutes walk.', nextStepId: 's5', correct: true, feedback: 'أسكن في is the natural Saudi way to say where you live.' },
        { text: 'أسكن في منطقة مجاورة لهذا الحديقة.', translation: 'I live in an area adjacent to this park.', nextStepId: 's5', correct: false, feedback: 'Too formal and unnatural. أسكن في الحي اللي وراء is how Saudi speakers describe their neighbourhood.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'قريب! لازم نتقابل هنا مرة ثانية.', translation: 'Close by! We must meet here again.', end: true },
  ],
  completionMessage: 'You made a new friend at the park with great Saudi Arabic!',
},

{
  id: 'saudi_convo_p4_borrow_money_small',
  phase: 4,
  title: 'Can You Lend Me a Little?',
  description: 'Ask a friend to lend you a small amount of money.',
  focalWordIds: ['w_want', 'w_good', 'w_thanks', 'w_now', 'w_friend'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! كيفك اليوم؟', translation: 'Hey! How are you today?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Greet back and make your request:',
      options: [
        { text: 'زين الحمد لله! أبي أطلب منك شي، تقدر تسلفني عشرة ريال؟', translation: 'Good praise God! I want to ask you something, can you lend me ten riyals?', nextStepId: 's3', correct: true, feedback: 'أبي أطلب is the natural Saudi way to introduce a request — polite and direct.' },
        { text: 'أنا بحاجة إلى قرض بسيط منك.', translation: 'I need a small loan from you.', nextStepId: 's3', correct: false, feedback: 'بحاجة إلى قرض is formal MSA. أبي تسلفني is the natural Saudi phrasing for borrowing money.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'أكيد! عشرة ريال ولا يهمك. متى ترد؟', translation: 'Of course! Ten riyals no problem. When will you pay back?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Promise to pay back tomorrow:',
      options: [
        { text: 'أرد عليك بكرة، وعد!', translation: 'I will pay you back tomorrow, promise!', nextStepId: 's5', correct: true, feedback: 'بكرة is the Saudi word for "tomorrow" and وعد seals the deal naturally.' },
        { text: 'سأعيد المبلغ غداً إن شاء الله.', translation: 'I will return the amount tomorrow God willing.', nextStepId: 's5', correct: false, feedback: 'سأعيد المبلغ is MSA. Say أرد عليك بكرة — that\'s how Saudis promise repayment.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'لا يهمك، بيننا وبين الله!', translation: 'Don\'t worry about it, it\'s between us and God!', end: true },
  ],
  completionMessage: 'You handled a friendly money request gracefully in Saudi Arabic!',
},

{
  id: 'saudi_convo_p4_pick_up_kids',
  phase: 4,
  title: 'Picking Up the Kids',
  description: 'Call the school to let them know you are on your way to pick up your children.',
  focalWordIds: ['w_madrasa', 'w_come', 'w_now', 'w_go', 'w_today'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'آلو، مدرسة الأمل، كيف أساعدك؟', translation: 'Hello, Al-Amal School, how can I help you?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Say you are coming to pick up your children:',
      options: [
        { text: 'هلا، أجي أاخذ أولادي الحين، وصلت بعد شوي.', translation: 'Hi, I am coming to pick up my children now, I will arrive in a bit.', nextStepId: 's3', correct: true, feedback: 'أجي is the correct Saudi 1st-person present for "I am coming" — perfect.' },
        { text: 'مرحباً، سأحضر لأخذ أطفالي الآن.', translation: 'Hello, I will come to take my children now.', nextStepId: 's3', correct: false, feedback: 'سأحضر is MSA. Say أجي for "I am coming" in Saudi dialect.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'تمام، وش اسم الطالب؟', translation: 'OK, what is the student\'s name?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give the name and confirm you are near:',
      options: [
        { text: 'محمد العمري، أنا الحين في الطريق، قريب منكم.', translation: 'Mohammed Al-Omari, I am now on the way, close to you.', nextStepId: 's5', correct: true, feedback: 'الحين is the Saudi word for "now" — great authentic dialect use.' },
        { text: 'اسمه محمد العمري وأنا في طريقي إليكم حالياً.', translation: 'His name is Mohammed Al-Omari and I am on my way to you now.', nextStepId: 's5', correct: false, feedback: 'حالياً is MSA. الحين is the natural Saudi equivalent for "now".' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'زين، بنجهز الأطفال عند الباب.', translation: 'Good, we will have the children ready at the door.', end: true },
  ],
  completionMessage: 'You handled the school call like a Saudi parent pro!',
},

{
  id: 'saudi_convo_p4_after_work',
  phase: 4,
  title: 'After Work',
  description: 'Chat with a colleague about your plans right after work.',
  focalWordIds: ['w_go', 'w_now', 'w_market', 'w_house', 'w_today'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'خلصنا! وين تروح بعد الشغل؟', translation: 'We\'re done! Where are you going after work?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Say you are going home first then to the market:',
      options: [
        { text: 'أروح البيت أول، وبعدين أروح السوق.', translation: 'I am going home first, then to the market.', nextStepId: 's3', correct: true, feedback: 'أروح repeated naturally chains destinations — excellent Saudi sentence structure.' },
        { text: 'سأذهب إلى المنزل أولاً ثم إلى السوق.', translation: 'I will go home first then to the market.', nextStepId: 's3', correct: false, feedback: 'سأذهب is MSA future. أروح is the Saudi present used for future plans too.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'ما شاء الله! تبي نروح السوق سوا؟', translation: 'MashaAllah! Do you want us to go to the market together?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Agree and suggest a time to meet:',
      options: [
        { text: 'تمام! أنتهي في البيت بعد ساعة، نتقابل عند السوق؟', translation: 'OK! I will be done at home in an hour, shall we meet at the market?', nextStepId: 's5', correct: true, feedback: 'نتقابل is the natural Saudi way to suggest meeting up.' },
        { text: 'حسناً، سنلتقي عند السوق بعد ساعة واحدة.', translation: 'OK, we will meet at the market after one hour.', nextStepId: 's5', correct: false, feedback: 'سنلتقي is MSA. نتقابل is the Saudi way to say "let\'s meet".' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'زين، نتقابل عند الباب الرئيسي بعد ساعة!', translation: 'Good, we will meet at the main entrance in an hour!', end: true },
  ],
  completionMessage: 'You made after-work plans smoothly in Saudi Arabic!',
},

{
  id: 'saudi_convo_p4_weekend_plans',
  phase: 4,
  title: 'Weekend Plans',
  description: 'Talk about what you will do over the weekend.',
  focalWordIds: ['w_tomorrow', 'w_today', 'w_go', 'w_market', 'w_mosque'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'وش برنامجك نهاية الأسبوع؟', translation: 'What are your plans for the weekend?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Share your weekend plans:',
      options: [
        { text: 'بكرة أروح المسجد الصبح، وبعدين أزور أهلي.', translation: 'Tomorrow I\'m going to the mosque in the morning, then visiting my family.', nextStepId: 's3', correct: true, feedback: 'بكرة for "tomorrow" and أروح for present-going — authentic Saudi register.' },
        { text: 'في عطلة نهاية الأسبوع سأذهب إلى المسجد وأزور الأسرة.', translation: 'During the weekend I will go to the mosque and visit the family.', nextStepId: 's3', correct: false, feedback: 'سأذهب is MSA. أروح is how Saudis express future plans in everyday speech.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'ما شاء الله! وبعد الزيارة؟', translation: 'MashaAllah! And after the visit?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Say you will rest at home:',
      options: [
        { text: 'أرجع البيت وأستريح، الله يسلمك.', translation: 'I will go back home and rest, God keep you safe.', nextStepId: 's5', correct: true, feedback: 'أرجع and أستريح chain naturally — well-formed Saudi sentence.' },
        { text: 'سأعود إلى المنزل وأرتاح بعد ذلك.', translation: 'I will return home and rest after that.', nextStepId: 's5', correct: false, feedback: 'سأعود is MSA. أرجع البيت is the Saudi way to say "I\'m going back home".' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'والله عندك برنامج حلو، ربك يوفقك!', translation: 'Wow you have a nice plan, may God grant you success!', end: true },
  ],
  completionMessage: 'You described your weekend plans beautifully in Saudi Arabic!',
},

{
  id: 'saudi_convo_p4_doctor_appointment',
  phase: 4,
  title: 'Doctor Appointment',
  description: 'Call the hospital clinic to schedule an appointment.',
  focalWordIds: ['w_hospital', 'w_tomorrow', 'w_today', 'w_now', 'w_want'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'آلو، مستشفى الملك فهد، مع خدمة المواعيد.', translation: 'Hello, King Fahd Hospital, appointment services.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask to schedule a doctor appointment:',
      options: [
        { text: 'هلا، أبي أحجز موعد عند الدكتور.', translation: 'Hi, I want to book a doctor appointment.', nextStepId: 's3', correct: true, feedback: 'أبي is the Saudi 1st-person "I want" — short, direct, and natural.' },
        { text: 'مرحباً، أريد تحديد موعد مع الطبيب.', translation: 'Hello, I want to set an appointment with the doctor.', nextStepId: 's3', correct: false, feedback: 'أريد is MSA. Use أبي for "I want" in Saudi Arabic.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'تمام. تبي اليوم ولا بكرة؟', translation: 'OK. Do you want today or tomorrow?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Say you prefer tomorrow morning:',
      options: [
        { text: 'بكرة أحسن لو في موعد الصبح.', translation: 'Tomorrow is better if there is a morning appointment.', nextStepId: 's5', correct: true, feedback: 'بكرة is the Saudi word for "tomorrow" — perfect use with lو for preference.' },
        { text: 'أفضل غداً صباحاً إذا أمكن.', translation: 'I prefer tomorrow morning if possible.', nextStepId: 's5', correct: false, feedback: 'غداً is MSA. بكرة is the Saudi word for tomorrow — use it for natural dialect.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تمام، حجزنا لك بكرة الساعة تسعة الصبح.', translation: 'OK, we have booked you for tomorrow at nine in the morning.', end: true },
  ],
  completionMessage: 'You booked a doctor appointment perfectly in Saudi Arabic!',
},

{
  id: 'saudi_convo_p4_late_apologize',
  phase: 4,
  title: 'Sorry I\'m Late!',
  description: 'Apologise to a friend for arriving late to a meeting.',
  focalWordIds: ['w_now', 'w_go', 'w_good', 'w_thanks', 'w_come'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'وين كنت؟! انتظرتك ساعة كاملة!', translation: 'Where were you?! I waited a whole hour for you!', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Apologise and explain you were stuck in traffic:',
      options: [
        { text: 'آسف والله! كانت فيه زحمة كبيرة في الطريق، ما قصرت.', translation: 'I\'m so sorry! There was a big traffic jam on the way, I couldn\'t help it.', nextStepId: 's3', correct: true, feedback: 'آسف والله is a sincere Saudi apology — the والله reinforces genuine remorse.' },
        { text: 'أعتذر، كانت هناك ازدحام مروري كبير.', translation: 'I apologise, there was a major traffic congestion.', nextStepId: 's3', correct: false, feedback: 'أعتذر and ازدحام مروري are MSA. آسف and زحمة are the natural Saudi equivalents.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'خلاص، المهم وصلت. وش تبي تشرب؟', translation: 'OK, the important thing is you arrived. What do you want to drink?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Order a drink and thank your friend for waiting:',
      options: [
        { text: 'قهوة من فضلك، وشكراً إنك انتظرتني!', translation: 'Coffee please, and thank you for waiting for me!', nextStepId: 's5', correct: true, feedback: 'إنك is the natural Saudi subordinating connector — good colloquial grammar.' },
        { text: 'أريد قهوة من فضلك، وأشكرك على انتظارك.', translation: 'I want coffee please and I thank you for your waiting.', nextStepId: 's5', correct: false, feedback: 'أريد and أشكرك على انتظارك are MSA. قهوة من فضلك and شكراً إنك انتظرتني flow better in Saudi dialect.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'لا بأس، الحمد لله على السلامة!', translation: 'No problem, praise God for your safety!', end: true },
  ],
  completionMessage: 'You apologised and recovered the situation like a Saudi pro!',
},

{
  id: 'saudi_convo_p4_what_drinking',
  phase: 4,
  title: 'What Are You Drinking?',
  description: 'A friend sees you with a cup and asks what you are drinking.',
  focalWordIds: ['w_tea', 'w_coffee', 'w_water', 'w_good', 'w_now'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'وش تشرب؟ تبي شي؟', translation: 'What are you drinking? Do you want something?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Tell them what you are drinking and offer them some:',
      options: [
        { text: 'أشرب شاي أخضر، تبي كوب معي؟', translation: 'I am drinking green tea, do you want a cup with me?', nextStepId: 's3', correct: true, feedback: 'أشرب is the correct Saudi 1st-person present for "I drink/am drinking" — natural and inviting.' },
        { text: 'أنا أتناول الشاي الأخضر، هل تريد شيئاً؟', translation: 'I am having green tea, do you want something?', nextStepId: 's3', correct: false, feedback: 'أتناول and تريد are MSA. أشرب and تبي are the Saudi equivalents.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'الله يجزاك خير! أنا أبي قهوة أكثر.', translation: 'May God reward you! I prefer coffee more.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Say there is coffee in the kitchen:',
      options: [
        { text: 'في قهوة في المطبخ، روح خذ كوب!', translation: 'There is coffee in the kitchen, go grab a cup!', nextStepId: 's5', correct: true, feedback: 'في + noun is the Saudi locative pattern for "there is" — well used.' },
        { text: 'يوجد قهوة في المطبخ، يمكنك أخذها.', translation: 'There is coffee in the kitchen, you can take it.', nextStepId: 's5', correct: false, feedback: 'يوجد is MSA. في is the natural Saudi way to say "there is" in casual speech.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'جزاك الله خير، الله يسلمك!', translation: 'May God reward you, God keep you safe!', end: true },
  ],
  completionMessage: 'You shared drinks and chatted in genuine Saudi Arabic!',
},

{
  id: 'saudi_convo_p4_where_house',
  phase: 4,
  title: 'Where Is Your House?',
  description: 'A new acquaintance asks where you live so they can visit.',
  focalWordIds: ['w_house', 'w_right', 'w_left', 'w_straight', 'w_mosque'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أبي أزورك، وين بيتك؟', translation: 'I want to visit you, where is your house?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Give your neighbourhood and a landmark:',
      options: [
        { text: 'أسكن في حي الملقا، قريب من المسجد الكبير.', translation: 'I live in Al-Malqa neighbourhood, near the big mosque.', nextStepId: 's3', correct: true, feedback: 'أسكن في + location is the natural Saudi locative for where you live.' },
        { text: 'أنا أقطن في منطقة حي الملقا بجوار الجامع الكبير.', translation: 'I reside in the Al-Malqa neighbourhood area next to the grand mosque.', nextStepId: 's3', correct: false, feedback: 'أقطن is formal MSA. أسكن في is how Saudis naturally say where they live.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'زين، وكيف أجي؟ ما أعرف الحي هذا.', translation: 'Good, and how do I come? I don\'t know this neighbourhood.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give simple directions from the mosque:',
      options: [
        { text: 'من المسجد، روح يمين وبعدين على طول، البيت على اليسار.', translation: 'From the mosque, go right then straight, the house is on the left.', nextStepId: 's5', correct: true, feedback: 'يمين، على طول، يسار — the three direction words used naturally in sequence.' },
        { text: 'اتجه نحو اليمين من المسجد، ثم استمر مباشرة وستجد المنزل على اليسار.', translation: 'Head right from the mosque, then continue straight and you will find the house on the left.', nextStepId: 's5', correct: false, feedback: 'اتجه نحو and استمر مباشرة are MSA. روح يمين and على طول are the Saudi equivalents.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'واضح! إن شاء الله أجي بكرة.', translation: 'Clear! God willing I will come tomorrow.', end: true },
  ],
  completionMessage: 'You gave directions to your house in perfect Saudi Arabic!',
},
