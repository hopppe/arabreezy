{
  id: 'saudi_convo_p3_order_coffee',
  phase: 3,
  title: 'Order a Coffee',
  description: 'Order a cup of Saudi coffee at a cafe.',
  focalWordIds: ['w_coffee', 'w_want', 'w_please', 'w_thanks', 'w_yes'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا، تبغى شنو؟', translation: 'Hey, what do you want?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Order your coffee.',
      options: [
        { text: 'أبغى قهوة، لو سمحت', translation: 'I want a coffee, please.', nextStepId: 's3', correct: true, feedback: 'أبغى is the natural Saudi way to say "I want." Perfect register.' },
        { text: 'أريد قهوة من فضلك', translation: 'I want a coffee, please.', nextStepId: 's3', correct: false, feedback: 'أريد and من فضلك are MSA. In Saudi, say أبغى and لو سمحت.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'كيف تبغاها؟ بهيل ولا بدونه؟', translation: 'How do you want it? With cardamom or without?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Answer how you want your coffee.',
      options: [
        { text: 'بهيل، شكراً', translation: 'With cardamom, thanks.', nextStepId: 's5', correct: true, feedback: 'هيل is cardamom — very Saudi! Great choice.' },
        { text: 'بدون هيل، شكراً', translation: 'Without cardamom, thanks.', nextStepId: 's5', correct: false, feedback: 'بدون هيل works too — that is a valid Saudi answer.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'حاضر، بجي عليك!', translation: 'Sure, coming right up!', end: true },
  ],
  completionMessage: 'You ordered coffee like a local — شاطر!',
},

{
  id: 'saudi_convo_p3_order_tea',
  phase: 3,
  title: 'Order a Tea',
  description: 'Ask for a glass of tea at a small shop.',
  focalWordIds: ['w_tea', 'w_want', 'w_please', 'w_yes', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً، تبغى شنو؟', translation: 'Welcome, what do you want?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Order a tea.',
      options: [
        { text: 'أبغى شاي، لو سمحت', translation: 'I want a tea, please.', nextStepId: 's3', correct: true, feedback: 'Spot on! أبغى + drink + لو سمحت is perfect Saudi ordering style.' },
        { text: 'عندي شاي؟', translation: 'Do you have tea?', nextStepId: 's3', correct: false, feedback: 'عندي means "I have" — use تبغى or أبغى when ordering.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'حلو ولا سادة؟', translation: 'Sweet or plain?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Choose how you want your tea.',
      options: [
        { text: 'حلو، شكراً', translation: 'Sweet, thanks.', nextStepId: 's5', correct: true, feedback: 'حلو means sweet — a natural, concise Saudi answer.' },
        { text: 'سادة بدون سكر', translation: 'Plain without sugar.', nextStepId: 's5', correct: false, feedback: 'سادة already means plain/unsweetened, so بدون سكر is redundant but understandable.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تفضل!', translation: 'Here you go!', end: true },
  ],
  completionMessage: 'Great job ordering tea in Saudi style!',
},

{
  id: 'saudi_convo_p3_order_bread',
  phase: 3,
  title: 'Order Bread',
  description: 'Buy a loaf of bread from a bakery.',
  focalWordIds: ['w_bread', 'w_want', 'w_please', 'w_how_much', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا، تبغى شنو؟', translation: 'Hey, what do you need?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask for bread.',
      options: [
        { text: 'أبغى خبز، لو سمحت', translation: 'I want bread, please.', nextStepId: 's3', correct: true, feedback: 'خبز is bread — great use of أبغى for ordering.' },
        { text: 'أنا جوعان', translation: 'I am hungry.', nextStepId: 's3', correct: false, feedback: 'جوعان says you are hungry but does not order anything. Use أبغى خبز.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'كم رغيف تبغى؟', translation: 'How many loaves do you want?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Tell him how many loaves.',
      options: [
        { text: 'أبغى اثنين، شكراً', translation: 'I want two, thanks.', nextStepId: 's5', correct: true, feedback: 'اثنين is the Saudi way to say two — perfect.' },
        { text: 'كثير', translation: 'A lot.', nextStepId: 's5', correct: false, feedback: 'كثير is vague. It is better to give a number like واحد or اثنين.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تفضل، الله يبارك', translation: 'Here you go, God bless.', end: true },
  ],
  completionMessage: 'You bought bread like a natural — ممتاز!',
},

{
  id: 'saudi_convo_p3_water_please',
  phase: 3,
  title: 'Water, Please',
  description: 'Ask for water at a restaurant.',
  focalWordIds: ['w_water', 'w_want', 'w_please', 'w_cold', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تبغى تشرب شنو؟', translation: 'What do you want to drink?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask for water.',
      options: [
        { text: 'أبغى ماء، لو سمحت', translation: 'I want water, please.', nextStepId: 's3', correct: true, feedback: 'ماء is water and لو سمحت is the Saudi way to say please — perfect.' },
        { text: 'ماء بارد', translation: 'Cold water.', nextStepId: 's3', correct: false, feedback: 'ماء بارد works but adding لو سمحت is more polite in Saudi interactions.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'بارد ولا عادي؟', translation: 'Cold or room temperature?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Choose your preference.',
      options: [
        { text: 'بارد، شكراً', translation: 'Cold, thanks.', nextStepId: 's5', correct: true, feedback: 'بارد is cold — a natural, polite one-word Saudi answer.' },
        { text: 'ما أبغى ماء', translation: 'I do not want water.', nextStepId: 's5', correct: false, feedback: 'ما أبغى means you do not want it — that contradicts your earlier request.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'أهلاً وسهلاً، بجي عليك', translation: 'Of course, coming right up.', end: true },
  ],
  completionMessage: 'You handled ordering water smoothly — زين!',
},

{
  id: 'saudi_convo_p3_order_rice',
  phase: 3,
  title: 'Order Rice',
  description: 'Order a plate of rice (kabsa) at a Saudi restaurant.',
  focalWordIds: ['w_rice', 'w_want', 'w_please', 'w_eat', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'وش تبغى تاكل؟', translation: 'What do you want to eat?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Order rice.',
      options: [
        { text: 'أبغى كبسة، لو سمحت', translation: 'I want kabsa, please.', nextStepId: 's3', correct: true, feedback: 'كبسة is the iconic Saudi rice dish — excellent choice and register.' },
        { text: 'أريد أرز من فضلك', translation: 'I want rice, please.', nextStepId: 's3', correct: false, feedback: 'أريد and من فضلك are MSA. Use أبغى and لو سمحت in Saudi.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'بدجاج ولا بلحم؟', translation: 'With chicken or with meat?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Choose your protein.',
      options: [
        { text: 'بدجاج، شكراً', translation: 'With chicken, thanks.', nextStepId: 's5', correct: true, feedback: 'دجاج is chicken — natural, clean answer.' },
        { text: 'بلحم', translation: 'With meat.', nextStepId: 's5', correct: false, feedback: 'بلحم works, though adding شكراً makes it more polite.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'ماشاء الله، بجي عليك قريب', translation: 'MashaAllah, coming to you soon.', end: true },
  ],
  completionMessage: 'You ordered a full kabsa meal in Saudi Arabic — شاطر!',
},

{
  id: 'saudi_convo_p3_order_fruit',
  phase: 3,
  title: 'Buy Fruit',
  description: 'Buy fruit at the market.',
  focalWordIds: ['w_fruit', 'w_want', 'w_how_much', 'w_please', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا، تبغى شنو؟', translation: 'Hey, what do you want?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask for fruit.',
      options: [
        { text: 'أبغى فاكهة، لو سمحت', translation: 'I want fruit, please.', nextStepId: 's3', correct: true, feedback: 'فاكهة is fruit — great use of أبغى for market shopping.' },
        { text: 'فاكهة بكم؟', translation: 'How much is the fruit?', nextStepId: 's3', correct: false, feedback: 'Asking the price first without greeting or ordering can seem abrupt. Start with أبغى.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'تبغى بطيخ ولا عنب؟', translation: 'Do you want watermelon or grapes?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Choose your fruit.',
      options: [
        { text: 'أبغى بطيخ، شكراً', translation: 'I want watermelon, thanks.', nextStepId: 's5', correct: true, feedback: 'بطيخ is watermelon — a classic Saudi summer fruit pick.' },
        { text: 'أبغى عنب', translation: 'I want grapes.', nextStepId: 's5', correct: false, feedback: 'عنب is grapes — correct vocabulary, just add شكراً to be polite.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تفضل، ريال ونص', translation: 'Here you go, one and a half riyals.', end: true },
  ],
  completionMessage: 'Great shopping trip to the fruit market — أحسنت!',
},

{
  id: 'saudi_convo_p3_pay_cashier',
  phase: 3,
  title: 'Pay at the Cashier',
  description: 'Pay for your items at a shop checkout.',
  focalWordIds: ['w_how_much', 'w_pay', 'w_thanks', 'w_yes', 'w_no'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'الحساب خمسة وعشرين ريال', translation: 'The bill is twenty-five riyals.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Respond to the cashier.',
      options: [
        { text: 'تفضل، شكراً', translation: 'Here you go, thanks.', nextStepId: 's3', correct: true, feedback: 'تفضل when handing money and شكراً is the natural Saudi cashier exchange.' },
        { text: 'كم الحساب؟', translation: 'How much is the bill?', nextStepId: 's3', correct: false, feedback: 'The cashier already told you the amount — no need to ask again.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'تبغى فاتورة؟', translation: 'Do you want a receipt?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Respond about the receipt.',
      options: [
        { text: 'إي، لو سمحت', translation: 'Yes, please.', nextStepId: 's5', correct: true, feedback: 'إي is the casual Saudi yes — very natural here.' },
        { text: 'لا، شكراً', translation: 'No, thanks.', nextStepId: 's5', correct: false, feedback: 'لا شكراً works fine — both answers are polite and natural.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تفضل، الله يسلمك!', translation: 'Here you go, God keep you safe!', end: true },
  ],
  completionMessage: 'You paid and handled the checkout in Saudi Arabic — ممتاز!',
},

{
  id: 'saudi_convo_p3_phone_credit',
  phase: 3,
  title: 'Buy Phone Credit',
  description: 'Top up your phone at a mobile shop.',
  focalWordIds: ['w_phone', 'w_want', 'w_how_much', 'w_please', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا، تبغى شنو؟', translation: 'Hey, what do you want?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask for phone credit.',
      options: [
        { text: 'أبغى رصيد للجوال، لو سمحت', translation: 'I want phone credit, please.', nextStepId: 's3', correct: true, feedback: 'رصيد للجوال is exactly how Saudis ask for phone credit — perfect.' },
        { text: 'أريد شحن هاتف', translation: 'I want to charge a phone.', nextStepId: 's3', correct: false, feedback: 'أريد is MSA and شحن هاتف usually means charging not credit. Use رصيد للجوال.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'كم تبغى؟ عشرة ولا عشرين؟', translation: 'How much do you want? Ten or twenty?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Pick an amount.',
      options: [
        { text: 'عشرة ريال، شكراً', translation: 'Ten riyals, thanks.', nextStepId: 's5', correct: true, feedback: 'عشرة ريال is clear and concise — great Saudi response.' },
        { text: 'عشرين من فضلك', translation: 'Twenty please.', nextStepId: 's5', correct: false, feedback: 'عشرين works, but use لو سمحت instead of من فضلك in Saudi dialect.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تفضل، الرصيد جاك', translation: 'Here you go, the credit is loaded.', end: true },
  ],
  completionMessage: 'You topped up your phone credit in Saudi style — شاطر!',
},

{
  id: 'saudi_convo_p3_meet_cousin',
  phase: 3,
  title: 'Meet Your Cousin',
  description: 'Greet a cousin you have not seen in a while.',
  focalWordIds: ['w_hi_saudi', 'w_how', 'w_good', 'w_family', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا والله! كيفك؟ زمان ما شفتك!', translation: 'Hey! How are you? Long time no see!', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Greet your cousin back.',
      options: [
        { text: 'هلا! الحمد لله، زين. وأنت؟', translation: 'Hey! Thank God, fine. And you?', nextStepId: 's3', correct: true, feedback: 'Returning the greeting with وأنت is warm and natural in Saudi culture.' },
        { text: 'أهلاً، أنا بخير', translation: 'Hello, I am fine.', nextStepId: 's3', correct: false, feedback: 'بخير is more MSA. Use زين for the Saudi register, and turn the question back.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'الحمد لله. عيلتك كيف؟', translation: 'Thank God. How is your family?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Tell your cousin about your family.',
      options: [
        { text: 'الحمد لله، كلهم زينين', translation: 'Thank God, they are all doing well.', nextStepId: 's5', correct: true, feedback: 'كلهم زينين is beautifully Saudi — warm and natural family talk.' },
        { text: 'عائلتي جيدة، شكراً', translation: 'My family is good, thanks.', nextStepId: 's5', correct: false, feedback: 'جيدة is MSA. Use زينين for the Saudi dialect feel.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'الله يحفظهم، نلتقي قريب إن شاء الله!', translation: 'God keep them, we will meet soon God willing!', end: true },
  ],
  completionMessage: 'You caught up with your cousin in pure Saudi style — أحسنت!',
},

{
  id: 'saudi_convo_p3_at_pharmacy_basic',
  phase: 3,
  title: 'At the Pharmacy',
  description: 'Ask for basic medicine at a pharmacy.',
  focalWordIds: ['w_want', 'w_sick', 'w_please', 'w_thanks', 'w_yes'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا، تبغى شنو؟', translation: 'Hey, what do you need?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Tell the pharmacist you are sick and need medicine.',
      options: [
        { text: 'أنا مريض وأبغى دواء، لو سمحت', translation: 'I am sick and I want medicine, please.', nextStepId: 's3', correct: true, feedback: 'مريض for sick and دواء for medicine — both perfect vocabulary here.' },
        { text: 'عندي دواء؟', translation: 'Do I have medicine?', nextStepId: 's3', correct: false, feedback: 'عندي means "I have" not "do you have." Say عندك دواء? if asking if they have medicine.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'شنو عندك؟ صداع ولا زكام؟', translation: 'What do you have? Headache or cold?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Tell him what you have.',
      options: [
        { text: 'عندي صداع', translation: 'I have a headache.', nextStepId: 's5', correct: true, feedback: 'عندي صداع is natural Saudi — عندي is used for ailments and possessions alike.' },
        { text: 'أنا تعبان شوي', translation: 'I am a bit tired/unwell.', nextStepId: 's5', correct: false, feedback: 'تعبان شوي works but is vague. It is better to name the symptom like صداع.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تفضل، هذا الدواء يساعدك', translation: 'Here, this medicine will help you.', end: true },
  ],
  completionMessage: 'You visited the pharmacy in Saudi Arabic — well done!',
},

{
  id: 'saudi_convo_p3_ask_directions_simple',
  phase: 3,
  title: 'Ask for Simple Directions',
  description: 'Ask where the nearest shop is.',
  focalWordIds: ['w_where', 'w_near', 'w_right', 'w_left', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا، في شنو؟', translation: 'Hey, can I help you?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask where the nearest shop is.',
      options: [
        { text: 'وين أقرب دكان؟', translation: 'Where is the nearest shop?', nextStepId: 's3', correct: true, feedback: 'وين is the Saudi word for "where" — much better than أين which is MSA.' },
        { text: 'أين أقرب محل؟', translation: 'Where is the nearest shop?', nextStepId: 's3', correct: false, feedback: 'أين is MSA. Use وين for the Saudi dialect register.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'الدكان يمين، بعد الإشارة', translation: 'The shop is to the right, after the traffic light.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Confirm you understood.',
      options: [
        { text: 'يمين بعد الإشارة، شكراً', translation: 'Right after the traffic light, thanks.', nextStepId: 's5', correct: true, feedback: 'Repeating directions back and saying شكراً is a polite and natural Saudi exchange.' },
        { text: 'ما أعرف', translation: 'I do not know.', nextStepId: 's5', correct: false, feedback: 'ما أعرف means you do not know — not appropriate here when you just got directions.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'عفواً، الله يوفقك!', translation: 'You are welcome, God grant you success!', end: true },
  ],
  completionMessage: 'You asked for directions in Saudi Arabic — شاطر!',
},

{
  id: 'saudi_convo_p3_dinner_at_home',
  phase: 3,
  title: 'Dinner at Home',
  description: 'Sit down for dinner with your household.',
  focalWordIds: ['w_eat', 'w_hungry', 'w_good', 'w_ready', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'العشاء حاضر! تعال', translation: 'Dinner is ready! Come.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Respond eagerly.',
      options: [
        { text: 'جوعان! جاي', translation: 'I am hungry! Coming.', nextStepId: 's3', correct: true, feedback: 'جوعان is the Saudi word for hungry — very natural response.' },
        { text: 'أنا آتي الآن', translation: 'I am coming now.', nextStepId: 's3', correct: false, feedback: 'آتي الآن is MSA. A more natural Saudi response is جاي حالاً or just جاي.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'تبغى أرز ولا خبز؟', translation: 'Do you want rice or bread?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Choose what you want.',
      options: [
        { text: 'أبغى أرز، شكراً', translation: 'I want rice, thanks.', nextStepId: 's5', correct: true, feedback: 'أبغى is the right Saudi word for wanting — clean and polite.' },
        { text: 'أبغى الاثنين!', translation: 'I want both!', nextStepId: 's5', correct: false, feedback: 'الاثنين for both is understandable, though الاثنين زين is even more natural.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تفضل، بالعافية!', translation: 'Here you go, bon appetit!', end: true },
  ],
  completionMessage: 'You sat down for a Saudi dinner perfectly — أحسنت!',
},

{
  id: 'saudi_convo_p3_visit_friend',
  phase: 3,
  title: 'Visit a Friend',
  description: 'Arrive at a friend\'s place for a casual visit.',
  focalWordIds: ['w_hi_saudi', 'w_how', 'w_good', 'w_come_in', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا والله! اهلين، تفضل داخل', translation: 'Hey! Welcome, come on in.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Greet your friend at the door.',
      options: [
        { text: 'هلا! الله يسلمك، شكراً', translation: 'Hey! God keep you safe, thanks.', nextStepId: 's3', correct: true, feedback: 'الله يسلمك is a warm Saudi response to a welcome — great register.' },
        { text: 'مرحباً، شكراً جزيلاً', translation: 'Hello, thank you very much.', nextStepId: 's3', correct: false, feedback: 'شكراً جزيلاً is a bit formal here. هلا والله or الله يسلمك is more natural with a friend.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'تبغى قهوة ولا شاي؟', translation: 'Do you want coffee or tea?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Tell your friend what you want.',
      options: [
        { text: 'أبغى قهوة، شكراً', translation: 'I want coffee, thanks.', nextStepId: 's5', correct: true, feedback: 'Saying أبغى and accepting hospitality is the warm Saudi social norm.' },
        { text: 'لا شكراً، ما أبغى شيء', translation: 'No thanks, I do not want anything.', nextStepId: 's5', correct: false, feedback: 'Declining tea or coffee with a Saudi host can seem a bit rude. Accepting is warmer.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تفضل، اجلس، بسيطة عليك!', translation: 'Here, sit down, make yourself at home!', end: true },
  ],
  completionMessage: 'You visited your friend with perfect Saudi social graces — ممتاز!',
},

{
  id: 'saudi_convo_p3_lunch_with_coworker',
  phase: 3,
  title: 'Lunch with a Coworker',
  description: 'Decide what to eat for lunch with a coworker.',
  focalWordIds: ['w_eat', 'w_want', 'w_hungry', 'w_where', 'w_good'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'الغداء؟ تبغى تاكل وين؟', translation: 'Lunch? Where do you want to eat?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Suggest a place to eat.',
      options: [
        { text: 'أبغى أكل كبسة، وين فيه؟', translation: 'I want to eat kabsa, where is there some?', nextStepId: 's3', correct: true, feedback: 'Suggesting كبسة and asking وين فيه is very natural Saudi lunch talk.' },
        { text: 'أنا لا أعرف', translation: 'I do not know.', nextStepId: 's3', correct: false, feedback: 'ما أعرف is more natural than لا أعرف in Saudi. Try suggesting something instead.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'في مطعم زين قريب، تبغى نروح؟', translation: 'There is a good restaurant nearby, do you want to go?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Agree to go.',
      options: [
        { text: 'إي، يلا نروح!', translation: 'Yes, let us go!', nextStepId: 's5', correct: true, feedback: 'يلا نروح is the perfect Saudi call to action — very energetic and natural.' },
        { text: 'نعم، سأذهب معك', translation: 'Yes, I will go with you.', nextStepId: 's5', correct: false, feedback: 'سأذهب is MSA future tense. Use يلا نروح or أروح معك for a Saudi feel.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'يلا، بالعافية مسبقاً!', translation: 'Let us go, bon appetit in advance!', end: true },
  ],
  completionMessage: 'Lunch plans sorted in Saudi Arabic — شاطر!',
},

{
  id: 'saudi_convo_p3_order_dates',
  phase: 3,
  title: 'Order Dates',
  description: 'Buy dates at a market stall.',
  focalWordIds: ['w_want', 'w_how_much', 'w_please', 'w_thanks', 'w_good'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا، تبغى تمر؟', translation: 'Hey, would you like dates?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Say yes and ask for some dates.',
      options: [
        { text: 'إي، أبغى تمر، لو سمحت', translation: 'Yes, I want dates, please.', nextStepId: 's3', correct: true, feedback: 'إي is the casual Saudi yes and تمر is dates — excellent.' },
        { text: 'نعم، أريد تمراً', translation: 'Yes, I want dates.', nextStepId: 's3', correct: false, feedback: 'نعم and أريد are MSA. Use إي and أبغى for Saudi dialect.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'كيلو بكم تبغى؟', translation: 'How many kilos do you want?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Ask for one kilo.',
      options: [
        { text: 'كيلو وحد، شكراً', translation: 'One kilo, thanks.', nextStepId: 's5', correct: true, feedback: 'وحد for one in this context is natural Saudi market speech.' },
        { text: 'كيلو واحد فقط', translation: 'Just one kilo.', nextStepId: 's5', correct: false, feedback: 'واحد فقط is understood but وحد is the more natural Saudi choice.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تفضل، عجوة مميزة!', translation: 'Here you go, premium Ajwa dates!', end: true },
  ],
  completionMessage: 'You bought dates at the market like a local — أحسنت!',
},

{
  id: 'saudi_convo_p3_invite_to_tea',
  phase: 3,
  title: 'Invite Someone for Tea',
  description: 'Invite a neighbor to come in for tea.',
  focalWordIds: ['w_tea', 'w_come', 'w_want', 'w_please', 'w_yes'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! وين رايح؟', translation: 'Hey! Where are you going?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Invite your neighbor for tea.',
      options: [
        { text: 'هلا! تبغى شاي عندي؟', translation: 'Hey! Do you want tea at my place?', nextStepId: 's3', correct: true, feedback: 'تبغى شاي عندي is a warm, natural Saudi invitation — well done.' },
        { text: 'هل تريد أن تشرب شاياً؟', translation: 'Would you like to drink tea?', nextStepId: 's3', correct: false, feedback: 'Too MSA. A more natural Saudi invite is تبغى شاي عندي or تعال اشرب شاي.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'والله، بس عندي شغل شوي. كم دقيقة؟', translation: 'By God, I have a bit of work. How many minutes?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Reassure them it will be quick.',
      options: [
        { text: 'بس كوب واحد، عشر دقايق!', translation: 'Just one cup, ten minutes!', nextStepId: 's5', correct: true, feedback: 'دقايق is the Saudi plural of دقيقة — great colloquial form.' },
        { text: 'لا تقلق، سريع', translation: 'Do not worry, quick.', nextStepId: 's5', correct: false, feedback: 'سريع works but بس كوب واحد gives a more specific and friendly reassurance.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'زين، تعال!', translation: 'OK, come on!', end: true },
  ],
  completionMessage: 'You extended a warm Saudi tea invitation — ممتاز!',
},

{
  id: 'saudi_convo_p3_borrow_pen',
  phase: 3,
  title: 'Borrow a Pen',
  description: 'Ask a classmate if you can borrow a pen.',
  focalWordIds: ['w_want', 'w_please', 'w_yes', 'w_no', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا، في شنو؟', translation: 'Hey, what is up?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask to borrow a pen.',
      options: [
        { text: 'عندك قلم؟ أبغى أستعير، لو سمحت', translation: 'Do you have a pen? I want to borrow one, please.', nextStepId: 's3', correct: true, feedback: 'عندك for "do you have" and أبغى أستعير for borrowing — excellent natural Saudi ask.' },
        { text: 'هل يمكنني استعارة قلم؟', translation: 'May I borrow a pen?', nextStepId: 's3', correct: false, feedback: 'هل يمكنني is very formal MSA. Use عندك قلم? أبغى أستعير لو سمحت instead.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'إي، عندي، تفضل', translation: 'Yes, I have one, here you go.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Thank your classmate.',
      options: [
        { text: 'شكراً، يعطيك العافية!', translation: 'Thanks, may God reward you!', nextStepId: 's5', correct: true, feedback: 'يعطيك العافية is a warm Saudi expression of gratitude — very natural here.' },
        { text: 'شكراً جداً', translation: 'Thank you very much.', nextStepId: 's5', correct: false, feedback: 'شكراً جداً is understood but يعطيك العافية sounds more naturally Saudi.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'الله يعافيك!', translation: 'God grant you health!', end: true },
  ],
  completionMessage: 'You borrowed a pen with perfect Saudi courtesy — شاطر!',
},

{
  id: 'saudi_convo_p3_what_time',
  phase: 3,
  title: 'What Time Is It?',
  description: 'Ask someone for the time on the street.',
  focalWordIds: ['w_time', 'w_how_much', 'w_thanks', 'w_yes', 'w_please'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا، في شنو؟', translation: 'Hey, what is up?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask for the time.',
      options: [
        { text: 'لو سمحت، كم الساعة؟', translation: 'Excuse me, what time is it?', nextStepId: 's3', correct: true, feedback: 'كم الساعة is the natural Saudi way to ask for the time — clean and polite.' },
        { text: 'ما الوقت الآن؟', translation: 'What is the time now?', nextStepId: 's3', correct: false, feedback: 'ما الوقت الآن is MSA. Use كم الساعة in Saudi dialect.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'الساعة ثلاثة وربع', translation: 'It is a quarter past three.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Thank the person.',
      options: [
        { text: 'شكراً، الله يسلمك!', translation: 'Thanks, God keep you safe!', nextStepId: 's5', correct: true, feedback: 'الله يسلمك is a classic Saudi sign-off — warm and natural after receiving help.' },
        { text: 'شكراً فقط', translation: 'Just thanks.', nextStepId: 's5', correct: false, feedback: 'شكراً alone is fine but adding الله يسلمك sounds much more natural in Saudi.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'الله يسلمك، مع السلامة!', translation: 'God keep you safe, goodbye!', end: true },
  ],
  completionMessage: 'You asked for the time like a Saudi local — أحسنت!',
},

{
  id: 'saudi_convo_p3_quick_introduce',
  phase: 3,
  title: 'Quick Introduction',
  description: 'Introduce yourself briefly to a new colleague.',
  focalWordIds: ['w_name', 'w_my_name', 'w_from_where', 'w_work', 'w_nice_to_meet'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا، أنا فيصل. وأنت؟', translation: 'Hey, I am Faisal. And you?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Introduce yourself.',
      options: [
        { text: 'أنا سارة، تشرفنا!', translation: 'I am Sara, nice to meet you!', nextStepId: 's3', correct: true, feedback: 'تشرفنا is the warm Saudi way to say nice to meet you — perfect.' },
        { text: 'اسمي سارة وأنا من المملكة', translation: 'My name is Sara and I am from the Kingdom.', nextStepId: 's3', correct: false, feedback: 'Correct but a bit long. A quick اسمي سارة، تشرفنا is more natural for a first hello.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'من وين أنتِ يا سارة؟', translation: 'Where are you from, Sara?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Say where you are from.',
      options: [
        { text: 'أنا من الرياض. وأنت؟', translation: 'I am from Riyadh. And you?', nextStepId: 's5', correct: true, feedback: 'Saying your city and turning the question back is natural and friendly.' },
        { text: 'من السعودية', translation: 'From Saudi Arabia.', nextStepId: 's5', correct: false, feedback: 'Correct but vague. Naming a city like الرياض or جدة is more natural.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'أنا من جدة، يسعدنا!', translation: 'I am from Jeddah, our pleasure!', end: true },
  ],
  completionMessage: 'Quick and natural introduction done right — ممتاز!',
},

{
  id: 'saudi_convo_p3_simple_compliment',
  phase: 3,
  title: 'Give a Simple Compliment',
  description: 'Compliment a friend on something they are wearing or did.',
  focalWordIds: ['w_good', 'w_nice', 'w_like', 'w_thanks', 'w_hi_saudi'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! كيفك اليوم؟', translation: 'Hey! How are you today?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Greet them and give a compliment.',
      options: [
        { text: 'هلا! الحمد لله، زين. ثوبك حلو!', translation: 'Hey! Thank God, good. Your thobe is nice!', nextStepId: 's3', correct: true, feedback: 'حلو for nice and ثوب for the traditional Saudi garment — very natural compliment.' },
        { text: 'أنا بخير. ملابسك جميلة', translation: 'I am fine. Your clothes are beautiful.', nextStepId: 's3', correct: false, feedback: 'بخير is MSA. Use زين, and حلو is a warmer Saudi compliment than جميلة in casual speech.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'الله يسلمك! يعجبك اللون؟', translation: 'God keep you safe! Do you like the color?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Say you like the color.',
      options: [
        { text: 'إي والله، اللون حلو جداً!', translation: 'Yes by God, the color is very nice!', nextStepId: 's5', correct: true, feedback: 'إي والله is an enthusiastic Saudi affirmation — very natural and warm.' },
        { text: 'نعم، اللون جميل', translation: 'Yes, the color is beautiful.', nextStepId: 's5', correct: false, feedback: 'نعم is MSA. Use إي or إي والله for a more natural Saudi tone.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'الله يبارك فيك، يسعدني!', translation: 'God bless you, it makes me happy!', end: true },
  ],
  completionMessage: 'You gave a warm Saudi compliment — أحسنت!',
}
