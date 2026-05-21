{
  id: 'saudi_convo_p6_airport_arrival',
  phase: 6,
  title: 'Airport Arrival',
  description: 'You just landed at King Abdulaziz International Airport and a ground assistant approaches you.',
  focalWordIds: ['w_airport', 'w_wasala', 'w_safar', 'w_musaafir', 'w_ticket'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً، وصلت بالسلامة! أول مرة في جدة؟', translation: 'Welcome, you arrived safely! Is this your first time in Jeddah?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell the assistant whether this is your first visit.', options: [
      { text: 'إي والله، أول مرة أجي', translation: 'Yes by God, it\'s my first time coming.', nextStepId: 's3', correct: true, feedback: 'ممتاز! أول مرة is natural Saudi for "first time".' },
      { text: 'لا، جيت قبل كذا مرة', translation: 'No, I came several times before.', nextStepId: 's3b', correct: false, feedback: 'زين! كذا مرة is a great Saudi way to say "several times".' },
    ]},
    { id: 's3', speaker: 'partner', text: 'ماشاء الله! السفر كان زين؟ احتجت شي؟', translation: 'MashaAllah! Was the travel good? Do you need anything?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'والله عارف المكان! احتجت مساعدة؟', translation: 'You already know the place! Do you need help?', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Ask where baggage claim is.', options: [
      { text: 'وين أحصل شنطتي؟', translation: 'Where do I get my bag?', nextStepId: 's5', correct: true, feedback: 'أحسنت! وين is the Saudi word for "where".' },
      { text: 'أين استلام الأمتعة؟', translation: 'Where is the baggage claim? (MSA)', nextStepId: 's5', correct: false, feedback: 'صح! هذا عربي فصيح — works but sounds formal. Saudis say وين أحصل شنطتي.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'على طول من هنا، الدور الأول. راح تشوف اللافتة.', translation: 'Straight from here, first floor. You will see the sign.', end: true },
  ],
  completionMessage: 'Well done! You navigated arrival at a Saudi airport using past tense and travel vocab.',
},

{
  id: 'saudi_convo_p6_taxi_to_hotel',
  phase: 6,
  title: 'Taxi to the Hotel',
  description: 'You\'re outside the airport and negotiating a taxi ride to your hotel.',
  focalWordIds: ['w_taxi', 'w_hotel', 'w_tariiq', 'w_howmuch', 'w_wasala'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'مرحبا! تاكسي؟ وين تروح؟', translation: 'Hello! Taxi? Where are you going?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell the driver you want to go to the hotel downtown.', options: [
      { text: 'أبغى أروح الفندق في وسط المدينة', translation: 'I want to go to the hotel in the city center.', nextStepId: 's3', correct: true, feedback: 'أحسنت! أبغى is the classic Saudi "I want".' },
      { text: 'أريد الذهاب إلى الفندق', translation: 'I want to go to the hotel. (MSA)', nextStepId: 's3', correct: false, feedback: 'صح، بس هذا فصيح. السعودي يقول أبغى أروح.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'زين، بكم؟ الطريق زحمة الحين.', translation: 'Okay, how much? The road is congested right now.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Respond to the price and ask how long it takes.', options: [
      { text: 'بكم الرحلة؟ وكم ساعة في الطريق؟', translation: 'How much is the trip? And how long on the road?', nextStepId: 's5', correct: true, feedback: 'ممتاز! بكم and كم ساعة both land naturally here.' },
      { text: 'كثير، أبغى أرخص', translation: 'That\'s too much, I want cheaper.', nextStepId: 's5', correct: false, feedback: 'جريء بس صح! أرخص means cheaper — good negotiating.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'ثلاثين ريال، وراح نوصل في ربع ساعة إن شاء الله.', translation: 'Thirty riyals, and we\'ll arrive in fifteen minutes, God willing.', end: true },
  ],
  completionMessage: 'Great work! You negotiated a taxi ride using travel and direction vocabulary.',
},

{
  id: 'saudi_convo_p6_hotel_checkin_full',
  phase: 6,
  title: 'Hotel Check-in',
  description: 'You arrive at the hotel front desk to check in for your stay.',
  focalWordIds: ['w_hotel', 'w_ticket', 'w_waqt', 'w_wasala', 'w_nazala'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً وسهلاً! عندك حجز؟', translation: 'Welcome! Do you have a reservation?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Confirm you have a reservation.', options: [
      { text: 'إي، حجزت غرفة بكرة', translation: 'Yes, I booked a room for yesterday.', nextStepId: 's3b', correct: false, feedback: 'قريب! بكرة means tomorrow — maybe you meant أمس (yesterday) or قبل شوي (earlier).' },
      { text: 'إي، عندي حجز باسمي', translation: 'Yes, I have a reservation in my name.', nextStepId: 's3', correct: true, feedback: 'ممتاز! عندي حجز باسمي is exactly right.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'زين، اسمك من فضلك؟ وكم ليلة؟', translation: 'Good, your name please? And how many nights?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'لا بأس، اسمك من فضلك؟ نشوف في النظام.', translation: 'No problem, your name please? We\'ll check in the system.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Say your name and how many nights you\'re staying.', options: [
      { text: 'اسمي [اسمك]، رح أنزل ثلاث ليالي', translation: 'My name is [your name], I will stay three nights.', nextStepId: 's5', correct: true, feedback: 'زين! رح أنزل is great Saudi for "I will stay/descend".' },
      { text: 'اسمي [اسمك]، ليلة وحدة بس', translation: 'My name is [your name], just one night.', nextStepId: 's5', correct: false, feedback: 'صح! وحدة بس is very natural — "just one".' },
    ]},
    { id: 's5', speaker: 'partner', text: 'تفضل، غرفتك رقم مئة وخمسة. الغرفة جاهزة الحين.', translation: 'Here you go, your room is number 105. The room is ready now.', end: true },
  ],
  completionMessage: 'Excellent! You completed a full hotel check-in in Saudi Arabic.',
},

{
  id: 'saudi_convo_p6_hotel_complaint',
  phase: 6,
  title: 'Hotel Complaint',
  description: 'Something is wrong with your hotel room and you call the front desk.',
  focalWordIds: ['w_hotel', 'w_sayyiʾ', 'w_waqt', 'w_nazala', 'w_manzar'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'الاستقبال، كيف أقدر أساعدك؟', translation: 'Reception, how can I help you?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell them there is a problem with your room.', options: [
      { text: 'في مشكلة في غرفتي، التكييف ما يشتغل', translation: 'There is a problem in my room, the AC doesn\'t work.', nextStepId: 's3', correct: true, feedback: 'أحسنت! في مشكلة is a natural way to report a problem.' },
      { text: 'الغرفة سيئة، أبغى غرفة ثانية', translation: 'The room is bad, I want another room.', nextStepId: 's3b', correct: false, feedback: 'مباشر! سيئة works — but specifying the problem is more useful.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'آسف على الإزعاج! راح نرسل شخص الحين.', translation: 'Sorry for the inconvenience! We\'ll send someone right now.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'عندنا غرفة ثانية، بس أبغى أعرف المشكلة أول.', translation: 'We have another room, but I want to know the problem first.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Ask how long it will take.', options: [
      { text: 'كم دقيقة راح تاخذ؟', translation: 'How many minutes will it take?', nextStepId: 's5', correct: true, feedback: 'ممتاز! كم دقيقة is a clean, natural question.' },
      { text: 'بسرعة، أنا تعبان', translation: 'Quickly, I\'m tired.', nextStepId: 's5', correct: false, feedback: 'صح! تعبان means tired — reasonable complaint.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'خمس دقائق بإذن الله. شكراً لصبرك!', translation: 'Five minutes, God willing. Thank you for your patience!', end: true },
  ],
  completionMessage: 'Well done! You handled a hotel complaint conversation in Saudi Arabic.',
},

{
  id: 'saudi_convo_p6_train_ticket',
  phase: 6,
  title: 'Buying a Train Ticket',
  description: 'You\'re at the Haramain high-speed rail ticket counter.',
  focalWordIds: ['w_ticket', 'w_station', 'w_wasala', 'w_waqt', 'w_howmuch'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً! وين تبغى تروح؟', translation: 'Hello! Where do you want to go?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Ask for one ticket to Makkah.', options: [
      { text: 'أبغى تذكرة وحدة لمكة', translation: 'I want one ticket to Makkah.', nextStepId: 's3', correct: true, feedback: 'ممتاز! أبغى تذكرة وحدة — clean and direct.' },
      { text: 'تذكرتين لمكة من فضلك', translation: 'Two tickets to Makkah please.', nextStepId: 's3', correct: false, feedback: 'زين! تذكرتين is the dual form — two tickets.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'درجة أولى ولا اقتصادية؟ القطار يطلع بعد ساعة.', translation: 'First class or economy? The train leaves in an hour.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Choose a class and ask about arrival time.', options: [
      { text: 'اقتصادية، وكم الوقت حتى نوصل؟', translation: 'Economy, and how long until we arrive?', nextStepId: 's5', correct: true, feedback: 'أحسنت! نوصل is the Saudi "we arrive" — natural first-person plural.' },
      { text: 'درجة أولى، بكم؟', translation: 'First class, how much?', nextStepId: 's5', correct: false, feedback: 'صح! بكم is the quick Saudi way to ask the price.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'الرحلة ساعة وربع. هذي تذكرتك، بالسلامة!', translation: 'The trip is an hour and fifteen minutes. Here is your ticket, safe travels!', end: true },
  ],
  completionMessage: 'Excellent! You bought a train ticket using time and travel vocabulary.',
},

{
  id: 'saudi_convo_p6_bus_to_jeddah',
  phase: 6,
  title: 'Bus to Jeddah',
  description: 'You need to take a bus from Riyadh to Jeddah and ask at the station.',
  focalWordIds: ['w_bus', 'w_station', 'w_tariiq', 'w_madiina', 'w_rakiba'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'الباص لجدة يطلع الساعة عشرة. ركبت من قبل؟', translation: 'The bus to Jeddah departs at ten. Have you ridden before?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Say this is your first time taking the bus here.', options: [
      { text: 'لا، أول مرة أركب الباص هنا', translation: 'No, first time I ride the bus here.', nextStepId: 's3', correct: true, feedback: 'ممتاز! أركب is clean Saudi present tense.' },
      { text: 'إي، ركبت قبل للدمام', translation: 'Yes, I rode before to Dammam.', nextStepId: 's3b', correct: false, feedback: 'زين! ركبت is correct simple past — you used it perfectly.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'زين! الطريق طويل، ثماني ساعات تقريباً.', translation: 'Good! The road is long, about eight hours.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'ماشاء الله! إذن تعرف الطريق طويل شوي.', translation: 'MashaAllah! Then you know the road is a bit long.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Ask where to board and if there\'s a food stop.', options: [
      { text: 'من وين أركب؟ وفيه وقفة أكل في الطريق؟', translation: 'Where do I board? And is there a food stop on the way?', nextStepId: 's5', correct: true, feedback: 'أحسنت! وقفة أكل is a natural phrase for a rest stop.' },
      { text: 'الباص زحمة؟', translation: 'Is the bus crowded?', nextStepId: 's5', correct: false, feedback: 'صح! زحمة means crowded — practical question.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'الباب الثالث، وفيه وقفتين. رحلة ممتعة!', translation: 'Gate three, and there are two stops. Enjoy the trip!', end: true },
  ],
  completionMessage: 'Great job! You navigated the bus station in Saudi Arabic.',
},

{
  id: 'saudi_convo_p6_lost_luggage',
  phase: 6,
  title: 'Lost Luggage',
  description: 'Your bag didn\'t arrive at the airport and you report it to the airline desk.',
  focalWordIds: ['w_airport', 'w_wasala', 'w_safar', 'w_sayyiʾ', 'w_ittisaal'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تفضل، كيف أساعدك؟', translation: 'Please, how can I help you?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Report that your bag did not arrive.', options: [
      { text: 'شنطتي ما وصلت، دورت عليها وما لقيتها', translation: 'My bag didn\'t arrive, I looked for it and didn\'t find it.', nextStepId: 's3', correct: true, feedback: 'ممتاز! ما وصلت is perfect simple past negative.' },
      { text: 'أمتعتي ضاعت', translation: 'My luggage was lost. (MSA)', nextStepId: 's3', correct: false, feedback: 'صح! ضاعت works, but Saudis would more often say ما وصلت or ضاعت عليّ.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'آسف جداً! من وين جيت؟ وما هو رقم رحلتك؟', translation: 'Very sorry! Where did you come from? And what is your flight number?', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Give your flight details and ask how long it will take.', options: [
      { text: 'جيت من دبي، رحلة رقم ثلاثمائة. متى تجي الشنطة؟', translation: 'I came from Dubai, flight number 300. When will the bag come?', nextStepId: 's5', correct: true, feedback: 'أحسنت! جيت is perfect simple past "I came".' },
      { text: 'ما أعرف رقم الرحلة، بس عندي البطاقة', translation: 'I don\'t know the flight number, but I have the boarding pass.', nextStepId: 's5', correct: false, feedback: 'زين! البطاقة for boarding pass is understood — practical answer.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'راح نتصل بك في الفندق. الشنطة توصل خلال أربعة وعشرين ساعة إن شاء الله.', translation: 'We will call you at the hotel. The bag will arrive within 24 hours, God willing.', end: true },
  ],
  completionMessage: 'Well done! You reported lost luggage using past tense and travel vocabulary.',
},

{
  id: 'saudi_convo_p6_rent_a_car',
  phase: 6,
  title: 'Renting a Car',
  description: 'You\'re at a car rental counter at the airport.',
  focalWordIds: ['w_car', 'w_howmuch', 'w_waqt', 'w_tariiq', 'w_madiina'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً! تبغى تأجر سيارة؟ كم يوم؟', translation: 'Hello! You want to rent a car? How many days?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Say you want a car for three days.', options: [
      { text: 'إي، أبغى سيارة لثلاثة أيام', translation: 'Yes, I want a car for three days.', nextStepId: 's3', correct: true, feedback: 'أحسنت! ثلاثة أيام is the correct plural form.' },
      { text: 'أسبوع كامل من فضلك', translation: 'A full week please.', nextStepId: 's3', correct: false, feedback: 'زين! أسبوع كامل — good use of week vocabulary.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'عندنا سيارة صغيرة أو SUV. اللي يناسبك؟', translation: 'We have a small car or an SUV. Which suits you?', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Choose the small car and ask about the price.', options: [
      { text: 'الصغيرة كافية، بكم في اليوم؟', translation: 'The small one is enough, how much per day?', nextStepId: 's5', correct: true, feedback: 'ممتاز! كافية means sufficient — very natural Saudi response.' },
      { text: 'أبغى الـ SUV، أحسن في الطريق', translation: 'I want the SUV, better on the road.', nextStepId: 's5', correct: false, feedback: 'زين! أحسن في الطريق — good justification.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'مئة وخمسين في اليوم شامل التأمين. وقّع هنا من فضلك.', translation: '150 per day including insurance. Sign here please.', end: true },
  ],
  completionMessage: 'Great work! You rented a car in Saudi Arabic using numbers and transport vocab.',
},

{
  id: 'saudi_convo_p6_hotel_breakfast',
  phase: 6,
  title: 'Hotel Breakfast',
  description: 'You\'re at the hotel breakfast area and talking to the waiter about what\'s available.',
  focalWordIds: ['w_hotel', 'w_waqt', 'w_nazala', 'w_samiʿa', 'w_qaddama'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'صباح الخير! الفطور شامل في حجزك، تفضل!', translation: 'Good morning! Breakfast is included in your booking, please come in!', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Ask what is available for breakfast.', options: [
      { text: 'شو عندكم في الفطور؟', translation: 'What do you have for breakfast?', nextStepId: 's3', correct: true, feedback: 'زين! شو is common in Saudi/Levantine mix — accepted.' },
      { text: 'وين البوفيه؟', translation: 'Where is the buffet?', nextStepId: 's3b', correct: false, feedback: 'عملي! Direct and natural — Saudis ask وين البوفيه all the time.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'عندنا بيض، خبز، جبن، عسل، وعصير. تبغى شي ثاني؟', translation: 'We have eggs, bread, cheese, honey, and juice. Do you want anything else?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'البوفيه هناك على اليمين. تفضل، كل شي موجود!', translation: 'The buffet is over there on the right. Please, everything is available!', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Ask for coffee and say the food looks good.', options: [
      { text: 'أبغى قهوة من فضلك، والأكل يبين حلو!', translation: 'I want coffee please, and the food looks good!', nextStepId: 's5', correct: true, feedback: 'ممتاز! يبين حلو is a great Saudi compliment.' },
      { text: 'شكراً، كل شي زين', translation: 'Thank you, everything is good.', nextStepId: 's5', correct: false, feedback: 'أحسنت! زين as a compliment is very Saudi.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'الله يسلمك! القهوة جاية الحين. صحة وعافية!', translation: 'God keep you safe! Coffee is coming now. Bon appetit!', end: true },
  ],
  completionMessage: 'Excellent! You handled hotel breakfast conversation in natural Saudi Arabic.',
},

{
  id: 'saudi_convo_p6_tourist_souq',
  phase: 6,
  title: 'Tourist Souq',
  description: 'You\'re browsing a traditional market and chatting with a vendor.',
  focalWordIds: ['w_market', 'w_howmuch', 'w_expensive', 'w_cheap', 'w_buy'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً بالزبون! شفت بضاعتنا؟ كلها من السعودية!', translation: 'Welcome customer! Did you see our goods? All from Saudi Arabia!', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Express interest and ask about this item.', options: [
      { text: 'شفت، حلو كثير! بكم هذا؟', translation: 'I saw it, very nice! How much is this?', nextStepId: 's3', correct: true, feedback: 'أحسنت! شفت is a great simple past — "I saw". بكم is natural.' },
      { text: 'ما شفت كل شي، وين التحف؟', translation: 'I haven\'t seen everything, where are the souvenirs?', nextStepId: 's3b', correct: false, feedback: 'زين! التحف for souvenirs is correct vocab.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'هذا بمئة ريال. صنعة يدوية أصيلة!', translation: 'This one is 100 riyals. Authentic handcraft!', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'التحف هنا على اليسار. كلها بأسعار كويسة!', translation: 'The souvenirs are here on the left. All at good prices!', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Try to negotiate the price.', options: [
      { text: 'غالي شوي، تقدر تنزل عليّ؟', translation: 'A little expensive, can you lower it for me?', nextStepId: 's5', correct: true, feedback: 'ممتاز! تنزل عليّ is very natural Saudi bargaining language.' },
      { text: 'زين، راح آخذه', translation: 'Okay, I will take it.', nextStepId: 's5', correct: false, feedback: 'صح! راح آخذه — good use of راح for future intent.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'تسعين آخر سعر! والله ما أقدر أقل. تفضل!', translation: 'Ninety is the final price! By God I can\'t go lower. Here you go!', end: true },
  ],
  completionMessage: 'Well done! You bargained in a Saudi souq using past tense and price vocabulary.',
},

{
  id: 'saudi_convo_p6_camping_gear',
  phase: 6,
  title: 'Camping Gear Shop',
  description: 'You\'re looking for camping equipment at an outdoor shop in Riyadh.',
  focalWordIds: ['w_buy', 'w_howmuch', 'w_waqt', 'w_safar', 'w_tariiq'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! تبغى تخيّم؟ وين رايح؟', translation: 'Hey! You want to camp? Where are you going?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Say you\'re going to the mountains next week.', options: [
      { text: 'إي، رايح الجبال الأسبوع الجاي', translation: 'Yes, going to the mountains next week.', nextStepId: 's3', correct: true, feedback: 'ممتاز! الأسبوع الجاي is natural Saudi for "next week".' },
      { text: 'في الصحراء، قريب من الرياض', translation: 'In the desert, close to Riyadh.', nextStepId: 's3', correct: false, feedback: 'زين! قريب من الرياض — good use of location vocab.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'رحت قبل؟ عندنا كل شي تحتاجه للتخييم.', translation: 'Have you gone before? We have everything you need for camping.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Ask about tents and their prices.', options: [
      { text: 'ما رحت قبل. بكم الخيمة عندكم؟', translation: 'I haven\'t gone before. How much are the tents here?', nextStepId: 's5', correct: true, feedback: 'أحسنت! ما رحت قبل — correct negative past tense.' },
      { text: 'رحت مرة في الشتاء، كان ممتع', translation: 'I went once in winter, it was fun.', nextStepId: 's5', correct: false, feedback: 'زين! رحت مرة — great simple past usage.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'الخيم تبدأ من مئتين ريال. هذي الأكثر مبيعاً، قوية في الريح.', translation: 'Tents start from 200 riyals. This is the best-seller, strong in the wind.', end: true },
  ],
  completionMessage: 'Excellent! You shopped for camping gear using past tense and practical travel vocabulary.',
},

{
  id: 'saudi_convo_p6_visit_palace',
  phase: 6,
  title: 'Visiting a Palace',
  description: 'You\'re at the ticket booth of a historical palace open for tourists.',
  focalWordIds: ['w_ticket', 'w_manzar', 'w_nadhara', 'w_waqt', 'w_wasala'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً بالزوار! تبغى تذكرة دخول؟', translation: 'Welcome visitors! Do you want an entry ticket?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Ask for two tickets and how much they cost.', options: [
      { text: 'إي، تذكرتين. بكم؟', translation: 'Yes, two tickets. How much?', nextStepId: 's3', correct: true, feedback: 'أحسنت! تذكرتين is the correct dual form.' },
      { text: 'تذكرة وحدة، وهل الدخول مجاني؟', translation: 'One ticket, and is entry free?', nextStepId: 's3', correct: false, feedback: 'زين! مجاني means free — worth asking!' },
    ]},
    { id: 's3', speaker: 'partner', text: 'خمسة وعشرين ريال للشخص. القصر فيه منظر رائع!', translation: '25 riyals per person. The palace has a wonderful view!', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Ask about the history and how long to tour it.', options: [
      { text: 'من بناه؟ وكم وقت يأخذ الجولة؟', translation: 'Who built it? And how long does the tour take?', nextStepId: 's5', correct: true, feedback: 'ممتاز! من بناه is a great history question.' },
      { text: 'شفت صور المكان وهو جميل جداً', translation: 'I saw pictures of the place and it\'s very beautiful.', nextStepId: 's5', correct: false, feedback: 'زين! شفت صور — great use of simple past "I saw".' },
    ]},
    { id: 's5', speaker: 'partner', text: 'بناه الملك عبدالعزيز. الجولة ساعة تقريباً. استمتع!', translation: 'King Abdulaziz built it. The tour is about an hour. Enjoy!', end: true },
  ],
  completionMessage: 'Great work! You visited a Saudi palace attraction using tickets and history vocabulary.',
},

{
  id: 'saudi_convo_p6_uber_driver_chat',
  phase: 6,
  title: 'Chatting with Your Uber Driver',
  description: 'You\'re in an Uber and the driver starts a friendly conversation.',
  focalWordIds: ['w_car', 'w_tariiq', 'w_madiina', 'w_saafara', 'w_wasala'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! من وين أنت؟ سافرت كثير؟', translation: 'Hey! Where are you from? Have you traveled a lot?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell the driver where you\'re from and that you traveled to Saudi for the first time.', options: [
      { text: 'أنا من أمريكا، وسافرت للسعودية أول مرة', translation: 'I\'m from America, and I traveled to Saudi for the first time.', nextStepId: 's3', correct: true, feedback: 'ممتاز! سافرت is perfect simple past.' },
      { text: 'من كندا، وجيت هنا للعمل', translation: 'From Canada, and I came here for work.', nextStepId: 's3', correct: false, feedback: 'زين! جيت is correct simple past "I came".' },
    ]},
    { id: 's3', speaker: 'partner', text: 'والله رائع! شفت وسط البلد؟ في أماكن كثيرة حلوة.', translation: 'By God, wonderful! Did you see the city center? There are many nice places.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Say you saw the corniche and ask for a recommendation.', options: [
      { text: 'شفت الكورنيش، كان جميل جداً! وين تنصحني أروح؟', translation: 'I saw the corniche, it was very beautiful! Where do you recommend I go?', nextStepId: 's5', correct: true, feedback: 'أحسنت! شفت and كان — two great simple past uses.' },
      { text: 'ما شفت كثير بعد، الحين وصلت', translation: 'I haven\'t seen much yet, I just arrived.', nextStepId: 's5', correct: false, feedback: 'زين! وصلت is perfect — "I arrived" in simple past.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'روح البلد القديم! قال لي الكل إنه جميل مرة. ما تندم!', translation: 'Go to the old town! Everyone told me it\'s very beautiful. You won\'t regret it!', end: true },
  ],
  completionMessage: 'Well done! You had a natural Uber conversation using simple past and travel vocab.',
},

{
  id: 'saudi_convo_p6_dive_shop_inquiry',
  phase: 6,
  title: 'Dive Shop Inquiry',
  description: 'You\'re in Jeddah and asking about diving tours at a dive shop.',
  focalWordIds: ['w_safar', 'w_waqt', 'w_howmuch', 'w_manzar', 'w_rakiba'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً! تبغى تغطس في البحر الأحمر؟', translation: 'Hello! You want to dive in the Red Sea?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Say yes and ask about available tours.', options: [
      { text: 'إي والله! وش عندكم من جولات؟', translation: 'Yes by God! What tours do you have?', nextStepId: 's3', correct: true, feedback: 'ممتاز! وش is a Saudi way to say "what" — very authentic.' },
      { text: 'غطست قبل في تايلاند، أبغى أشوف الفرق', translation: 'I dived before in Thailand, I want to see the difference.', nextStepId: 's3b', correct: false, feedback: 'زين! غطست is a great past tense answer — and أشوف الفرق shows interest.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'عندنا جولة صباح وجولة مساء. كل جولة ثلاث ساعات.', translation: 'We have a morning tour and an evening tour. Each tour is three hours.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'والله البحر الأحمر مختلف! الألوان مرة حلوة. عندنا جولتين.', translation: 'By God the Red Sea is different! The colors are really beautiful. We have two tours.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Ask about the price and if equipment is included.', options: [
      { text: 'بكم الجولة؟ والمعدات شاملة؟', translation: 'How much is the tour? And is equipment included?', nextStepId: 's5', correct: true, feedback: 'أحسنت! شاملة is the right word for "included".' },
      { text: 'ركبت قارب من قبل، بس ما غطست هنا', translation: 'I rode a boat before, but I haven\'t dived here.', nextStepId: 's5', correct: false, feedback: 'زين! ركبت and غطست — both clean simple past forms.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'مئتان وخمسون ريال شامل كل شي. الجولة الصبح أحسن للمبتدئين.', translation: '250 riyals including everything. The morning tour is better for beginners.', end: true },
  ],
  completionMessage: 'Excellent! You inquired about diving tours in Saudi Arabic with past tense and price vocab.',
},

{
  id: 'saudi_convo_p6_pharmacy_travel_meds',
  phase: 6,
  title: 'Pharmacy for Travel Meds',
  description: 'You\'re not feeling well after travel and visit a pharmacy.',
  focalWordIds: ['w_sayyiʾ', 'w_waqt', 'w_wasala', 'w_pay', 'w_howmuch'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً! كيف أقدر أساعدك؟', translation: 'Hello! How can I help you?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Explain that you have a headache since arriving.', options: [
      { text: 'عندي صداع من لما وصلت، أبغى دواء', translation: 'I have a headache since I arrived, I want medicine.', nextStepId: 's3', correct: true, feedback: 'ممتاز! من لما وصلت — "since I arrived" is very natural Saudi phrasing.' },
      { text: 'تعبت في الطريق، أبغى شي للمعدة', translation: 'I got tired on the way, I want something for the stomach.', nextStepId: 's3b', correct: false, feedback: 'زين! تعبت is simple past "I got tired" — great use.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'من وين جيت؟ ممكن من الجو أو الأكل الجديد.', translation: 'Where did you come from? It could be from the weather or new food.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'طبيعي بعد السفر. لاسمك أي دواء يناسبك؟', translation: 'Normal after travel. Let\'s see which medicine suits you.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Ask if they have something suitable and how much it costs.', options: [
      { text: 'إي، جيت من بعيد. عندك شي مناسب؟ وبكم؟', translation: 'Yes, I came from far away. Do you have something suitable? And how much?', nextStepId: 's5', correct: true, feedback: 'أحسنت! جيت من بعيد — clean past tense.' },
      { text: 'ما أعرف اسم الدواء بالعربي', translation: 'I don\'t know the medicine name in Arabic.', nextStepId: 's5', correct: false, feedback: 'صادق! هذا جواب طبيعي — honest and practical.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'هذا مسكن ألم قوي، خمسة عشر ريال. خذ اثنين مع الماء وارتح.', translation: 'This is a strong painkiller, 15 riyals. Take two with water and rest.', end: true },
  ],
  completionMessage: 'Well done! You handled a pharmacy visit using simple past and health vocabulary.',
},

{
  id: 'saudi_convo_p6_lost_phone',
  phase: 6,
  title: 'Lost Phone',
  description: 'You lost your phone at the hotel and report it to reception.',
  focalWordIds: ['w_sayyiʾ', 'w_ittisaal', 'w_waqt', 'w_nazala', 'w_wasala'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'الاستقبال، كيف أساعدك؟', translation: 'Reception, how can I help you?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell them you lost your phone in the hotel.', options: [
      { text: 'والله ضاع جوالي في الفندق، ما أعرف وين', translation: 'By God my phone is lost in the hotel, I don\'t know where.', nextStepId: 's3', correct: true, feedback: 'أحسنت! ضاع جوالي — "my phone got lost" is perfect Saudi phrasing.' },
      { text: 'نسيت جوالي في المطعم، ممكن تتصلون فيه؟', translation: 'I forgot my phone in the restaurant, can you call it?', nextStepId: 's3b', correct: false, feedback: 'زين! نسيت is great — "I forgot" in simple past.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'إن شاء الله نلقاه. وين آخر مرة شفته؟', translation: 'God willing we\'ll find it. Where was the last time you saw it?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'راح نتصل عليه الحين. أعطني رقمك.', translation: 'We\'ll call it right now. Give me your number.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Say where you last had it and ask if they can check cameras.', options: [
      { text: 'شفته آخر مرة في المصعد. تقدرون تشوفون الكاميرات؟', translation: 'I saw it last time in the elevator. Can you check the cameras?', nextStepId: 's5', correct: true, feedback: 'ممتاز! شفته is great — "I saw it" in simple past.' },
      { text: 'ما شفته من الصبح، قلق كثير', translation: 'I haven\'t seen it since morning, very worried.', nextStepId: 's5', correct: false, feedback: 'زين! ما شفته من الصبح — natural negative past.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'راح نشوف التسجيلات الحين ونتصل بك في غرفتك.', translation: 'We\'ll check the recordings now and call you in your room.', end: true },
  ],
  completionMessage: 'Great work! You reported a lost phone using simple past and hotel vocabulary.',
},

{
  id: 'saudi_convo_p6_change_money',
  phase: 6,
  title: 'Changing Money',
  description: 'You need to exchange foreign currency at a money exchange office.',
  focalWordIds: ['w_money', 'w_howmuch', 'w_pay', 'w_waqt', 'w_madiina'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً! تبغى تصرّف عملة؟', translation: 'Hello! You want to exchange currency?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Say you want to exchange dollars to riyals.', options: [
      { text: 'إي، أبغى أصرّف دولارات لريال سعودي', translation: 'Yes, I want to exchange dollars to Saudi riyals.', nextStepId: 's3', correct: true, feedback: 'أحسنت! أصرّف is the correct verb for currency exchange.' },
      { text: 'عندي يورو، بكم الصرف اليوم؟', translation: 'I have euros, what\'s the exchange rate today?', nextStepId: 's3', correct: false, feedback: 'زين! بكم الصرف — direct and natural question.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'الدولار بثلاثة وسبعين هللة. كم تبغى تصرّف؟', translation: 'The dollar is 3.73. How much do you want to exchange?', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Say you want to exchange 500 dollars and ask if there\'s a fee.', options: [
      { text: 'خمسمائة دولار. في عمولة على الصرف؟', translation: 'Five hundred dollars. Is there a commission on the exchange?', nextStepId: 's5', correct: true, feedback: 'ممتاز! عمولة is the right word for commission/fee.' },
      { text: 'مائة دولار بس، الفلوس ما معي كثير', translation: 'Just one hundred dollars, I don\'t have much money with me.', nextStepId: 's5', correct: false, feedback: 'زين! الفلوس ما معي — great Saudi idiom for "I don\'t have much money on me".' },
    ]},
    { id: 's5', speaker: 'partner', text: 'ما في عمولة. تقدر تاخذ الريالات الحين. تفضل!', translation: 'No commission. You can take the riyals right now. Here you go!', end: true },
  ],
  completionMessage: 'Excellent! You exchanged money in Saudi Arabic using numbers and financial vocabulary.',
},

{
  id: 'saudi_convo_p6_eid_family_visit',
  phase: 6,
  title: 'Eid Family Visit',
  description: 'You visit a Saudi family during Eid and they welcome you warmly.',
  focalWordIds: ['w_saafara', 'w_wasala', 'w_waqt', 'w_nadhara', 'w_qaddama'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'عيد مبارك! وصلت من وين؟ سافرت كثير؟', translation: 'Happy Eid! Where did you arrive from? Did you travel a lot?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Greet them and say you traveled from far away for this visit.', options: [
      { text: 'عيد مبارك وكل عام وأنتم بخير! سافرت من بعيد لأزورهم', translation: 'Happy Eid and may you be well every year! I traveled from far to visit them.', nextStepId: 's3', correct: true, feedback: 'ممتاز! سافرت — clean simple past. The full greeting is very Saudi.' },
      { text: 'عيد سعيد! وصلت أمس من الرياض', translation: 'Happy Eid! I arrived yesterday from Riyadh.', nextStepId: 's3b', correct: false, feedback: 'زين! وصلت أمس — "I arrived yesterday" is perfect simple past.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'ماشاء الله على عزيمتك! تعال نشرب قهوة ونسولف.', translation: 'MashaAllah on your determination! Come let\'s drink coffee and chat.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'أهلاً بك! قلنا لك تعال بكرة بس وصلت اليوم، ماشاء الله!', translation: 'Welcome! We said come tomorrow but you arrived today, MashaAllah!', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Accept the invitation and compliment the house.', options: [
      { text: 'بكل سرور! والله بيتكم جميل، شفت الزينة من البراه', translation: 'With great pleasure! By God your house is beautiful, I saw the decorations from outside.', nextStepId: 's5', correct: true, feedback: 'أحسنت! شفت من البراه — "I saw from outside" — great simple past.' },
      { text: 'شكراً، الله يبارك فيكم', translation: 'Thank you, may God bless you all.', nextStepId: 's5', correct: false, feedback: 'زين! الله يبارك فيكم — a beautiful Saudi blessing.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'الله يسلمك! قدّمنا لك أحسن شي. تفضل على الأكل!', translation: 'God keep you safe! We prepared the best for you. Please, come eat!', end: true },
  ],
  completionMessage: 'Well done! You participated in an Eid family visit using Saudi greetings and past tense.',
},

{
  id: 'saudi_convo_p6_camel_ride_tourist',
  phase: 6,
  title: 'Camel Ride for Tourists',
  description: 'You\'re at a desert camp and negotiating a camel ride experience.',
  focalWordIds: ['w_rakiba', 'w_raakib', 'w_howmuch', 'w_waqt', 'w_safar'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! تبغى تركب الجمل؟ تجربة ما تنسى!', translation: 'Hey! You want to ride the camel? An unforgettable experience!', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Express interest and ask if you have to know how to ride.', options: [
      { text: 'أبغى! بس ما ركبت قبل، هل هي صعبة؟', translation: 'I want to! But I haven\'t ridden before, is it difficult?', nextStepId: 's3', correct: true, feedback: 'أحسنت! ما ركبت قبل — perfect negative simple past.' },
      { text: 'ركبت خيل قبل، هل الجمل مثله؟', translation: 'I rode a horse before, is the camel similar?', nextStepId: 's3b', correct: false, feedback: 'زين! ركبت — great simple past usage.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'مو صعبة! الجمل هادي والراكب ما يحتاج خبرة.', translation: 'Not difficult! The camel is calm and the rider doesn\'t need experience.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'الجمل أبطأ من الخيل بس الجلسة مرة مريحة!', translation: 'The camel is slower than a horse but the seat is very comfortable!', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Ask the price and how long the ride lasts.', options: [
      { text: 'بكم الركوب؟ وكم دقيقة الجولة؟', translation: 'How much is the ride? And how many minutes is the tour?', nextStepId: 's5', correct: true, feedback: 'ممتاز! بكم is natural for price, كم دقيقة for duration.' },
      { text: 'زين، جاهز! مين يساعدني أركب؟', translation: 'Okay, ready! Who helps me get on?', nextStepId: 's5', correct: false, feedback: 'جريء ومباشر! جاهز means ready — very natural.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'خمسون ريال لنص ساعة. أنا راح أصورك وأنت فوق الجمل!', translation: '50 riyals for half an hour. I\'ll take your picture while you\'re on the camel!', end: true },
  ],
  completionMessage: 'Excellent! You negotiated a camel ride experience using past tense and tourism vocabulary.',
},

{
  id: 'saudi_convo_p6_borrow_car_friend',
  phase: 6,
  title: 'Borrowing a Friend\'s Car',
  description: 'You need to borrow your Saudi friend\'s car to run some errands.',
  focalWordIds: ['w_car', 'w_tariiq', 'w_waqt', 'w_madiina', 'w_wasala'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا يا صاحب! وين رايح؟ تبغى شي؟', translation: 'Hey buddy! Where are you going? Do you need something?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Ask to borrow his car to go to the city center.', options: [
      { text: 'أبغى أستعير سيارتك شوي، أروح وسط البلد وأرجع', translation: 'I want to borrow your car a little, go to the city center and come back.', nextStepId: 's3', correct: true, feedback: 'أحسنت! أستعير is the correct verb for "borrow".' },
      { text: 'قلت لي وين المحطة، أروح بالتاكسي', translation: 'Tell me where the station is, I\'ll go by taxi.', nextStepId: 's3b', correct: false, feedback: 'زين! هذا أيضاً طبيعي — choosing an alternative.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'بكل سرور! بس ارجع قبل العصر، عندي شغلة.', translation: 'With great pleasure! But come back before Asr prayer, I have something to do.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'لا لا، خذ سيارتي أحسن! التاكسي في الزحمة يأخذ وقت.', translation: 'No no, take my car, it\'s better! The taxi in traffic takes time.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Thank him and ask if there are any roads to avoid.', options: [
      { text: 'شكراً جزيلاً! في طرق أتجنبها؟ سمعت في حوادث اليوم', translation: 'Thank you very much! Are there roads to avoid? I heard there were accidents today.', nextStepId: 's5', correct: true, feedback: 'ممتاز! سمعت is perfect simple past "I heard".' },
      { text: 'راح أرجع قبل العصر إن شاء الله، ما أتأخر', translation: 'I\'ll return before Asr God willing, I won\'t be late.', nextStepId: 's5', correct: false, feedback: 'زين! ما أتأخر is a natural promise — very Saudi.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'روح على الطريق الدائري، أسرع. وإياك طريق الملك فهد، زحمة مرة.', translation: 'Go on the ring road, it\'s faster. Avoid King Fahd road, very congested.', end: true },
  ],
  completionMessage: 'Great work! You borrowed a car from a Saudi friend using past tense and direction vocabulary.',
}
