{
  id: 'saudi_convo_p2_my_family',
  phase: 2,
  title: 'My Family',
  description: 'Talk about your family with a new acquaintance.',
  focalWordIds: ['w_family', 'w_big', 'w_small', 'w_and'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'عندك عيلة كبيرة؟', translation: 'Do you have a big family?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell them about your family size.', options: [
      { text: 'إي، عيلتي كبيرة', translation: 'Yes, my family is big.', nextStepId: 's3', correct: true, feedback: 'ممتاز! Great use of the possessive suffix ـي.' },
      { text: 'لا، عيلتي صغيرة', translation: 'No, my family is small.', nextStepId: 's3', correct: false, feedback: 'صح! That works too — صغيرة means small.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'ماشاء الله، عيلتي كبيرة كذلك!', translation: 'MashaAllah, my family is big too!', end: true },
  ],
  completionMessage: 'Well done! You talked about your family in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_my_brother',
  phase: 2,
  title: 'My Brother',
  description: 'Tell someone about your brother.',
  focalWordIds: ['w_brother', 'w_one', 'w_two', 'w_how_many'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'كم أخ عندك؟', translation: 'How many brothers do you have?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell them how many brothers you have.', options: [
      { text: 'عندي أخ وحد', translation: 'I have one brother.', nextStepId: 's3', correct: true, feedback: 'أحسنت! وحد is the Saudi way to say "one" in this context.' },
      { text: 'عندي أخوين', translation: 'I have two brothers.', nextStepId: 's3', correct: false, feedback: 'صح! أخوين is the dual form — two brothers.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'أنا ما عندي أخ، بس عندي أخوات', translation: 'I don\'t have a brother, but I have sisters.', end: true },
  ],
  completionMessage: 'Great job! You discussed siblings in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_my_sister',
  phase: 2,
  title: 'My Sister',
  description: 'Chat about your sister with a friend.',
  focalWordIds: ['w_sister', 'w_big', 'w_small', 'w_older', 'w_younger'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أختك كبيرة ولا صغيرة؟', translation: 'Is your sister older or younger?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Say whether your sister is older or younger.', options: [
      { text: 'أختي كبيرة عليّ', translation: 'My sister is older than me.', nextStepId: 's3', correct: true, feedback: 'زين! كبيرة عليّ is a natural Saudi way to say older.' },
      { text: 'أختي صغيرة عليّ', translation: 'My sister is younger than me.', nextStepId: 's3', correct: false, feedback: 'صح! صغيرة عليّ means younger than me.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'زين، أختي صغيرة عليّ بسنتين', translation: 'Nice, my sister is younger than me by two years.', end: true },
  ],
  completionMessage: 'Excellent! You described your sister\'s age in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_my_mom',
  phase: 2,
  title: 'My Mom',
  description: 'Talk about your mother with someone.',
  focalWordIds: ['w_mom', 'w_good', 'w_how'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'كيف أمك؟', translation: 'How is your mom?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell them how your mom is doing.', options: [
      { text: 'أمي بخير، شكراً', translation: 'My mom is fine, thank you.', nextStepId: 's3', correct: true, feedback: 'ممتاز! بخير is the standard reply for "fine".' },
      { text: 'أمي تعبانة شوي', translation: 'My mom is a little tired.', nextStepId: 's3', correct: false, feedback: 'صح! تعبانة شوي means a little tired — honest answer.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'الله يسلمها، أمي بخير كذلك', translation: 'May God keep her safe, my mom is fine too.', end: true },
  ],
  completionMessage: 'Great work! You talked about your mom in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_my_dad',
  phase: 2,
  title: 'My Dad',
  description: 'Discuss your father with a colleague.',
  focalWordIds: ['w_dad', 'w_work', 'w_where'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'وين يشتغل أبوك؟', translation: 'Where does your dad work?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell them where your dad works.', options: [
      { text: 'أبوي يشتغل في المستشفى', translation: 'My dad works at the hospital.', nextStepId: 's3', correct: true, feedback: 'أحسنت! أبوي is the Saudi possessive form for "my dad".' },
      { text: 'أبوي ما يشتغل، متقاعد', translation: 'My dad doesn\'t work, he\'s retired.', nextStepId: 's3', correct: false, feedback: 'زين! متقاعد means retired — great vocab.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'ماشاء الله، أبوي يشتغل في الحكومة', translation: 'MashaAllah, my dad works for the government.', end: true },
  ],
  completionMessage: 'Well done! You discussed your father\'s work in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_my_house',
  phase: 2,
  title: 'My House',
  description: 'Describe your home to a new neighbor.',
  focalWordIds: ['w_house', 'w_big', 'w_small', 'w_nice'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'بيتك كبير؟', translation: 'Is your house big?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Describe the size of your house.', options: [
      { text: 'إي، بيتي كبير وحلو', translation: 'Yes, my house is big and nice.', nextStepId: 's3', correct: true, feedback: 'ممتاز! حلو is a great Saudi word for nice/pretty.' },
      { text: 'لا، بيتي صغير بس كافي', translation: 'No, my house is small but enough.', nextStepId: 's3', correct: false, feedback: 'زين! كافي means sufficient — practical answer.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'الله يبارك، بيتي صغير شوي', translation: 'May God bless it, my house is a little small.', end: true },
  ],
  completionMessage: 'Great job! You described your house in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_my_room',
  phase: 2,
  title: 'My Room',
  description: 'Chat about your bedroom with a friend.',
  focalWordIds: ['w_room', 'w_color', 'w_white', 'w_blue'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'غرفتك أي لون؟', translation: 'What color is your room?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell them the color of your room.', options: [
      { text: 'غرفتي بيضا', translation: 'My room is white.', nextStepId: 's3', correct: true, feedback: 'أحسنت! بيضا is the Saudi/Gulf form of white.' },
      { text: 'غرفتي زرقا', translation: 'My room is blue.', nextStepId: 's3', correct: false, feedback: 'صح! زرقا is the Saudi form for blue.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'حلو! غرفتي صفرا، أحب اللون الأصفر', translation: 'Nice! My room is yellow, I love the color yellow.', end: true },
  ],
  completionMessage: 'Excellent! You talked about colors in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_my_phone',
  phase: 2,
  title: 'My Phone',
  description: 'Talk about your phone with a friend.',
  focalWordIds: ['w_phone', 'w_new', 'w_old', 'w_good'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'جوالك جديد؟', translation: 'Is your phone new?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell them about your phone.', options: [
      { text: 'إي، جوالي جديد وزين', translation: 'Yes, my phone is new and good.', nextStepId: 's3', correct: true, feedback: 'ممتاز! جوال is the Saudi word for mobile phone.' },
      { text: 'لا، جوالي قديم', translation: 'No, my phone is old.', nextStepId: 's3', correct: false, feedback: 'صح! قديم means old — good use of the adjective.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'جوالي كذلك قديم، أبغى جوال جديد', translation: 'My phone is old too, I want a new phone.', end: true },
  ],
  completionMessage: 'Great work! You discussed your phone in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_drink_tea',
  phase: 2,
  title: 'Drinking Tea',
  description: 'Accept or decline tea from a host.',
  focalWordIds: ['w_tea', 'w_want', 'w_yes', 'w_no', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تبغى شاي؟', translation: 'Do you want tea?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Respond to the offer of tea.', options: [
      { text: 'إي، أبغى شاي، شكراً', translation: 'Yes, I want tea, thank you.', nextStepId: 's3', correct: true, feedback: 'أحسنت! أبغى is the Saudi way to say "I want".' },
      { text: 'لا، شكراً، ما أبغى', translation: 'No, thank you, I don\'t want any.', nextStepId: 's3', correct: false, feedback: 'زين! Politely declining is also correct.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'تفضل، الشاي جاهز', translation: 'Here you go, the tea is ready.', end: true },
  ],
  completionMessage: 'Well done! You accepted or declined tea in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_drink_water',
  phase: 2,
  title: 'Drinking Water',
  description: 'Ask for or offer water.',
  focalWordIds: ['w_water', 'w_cold', 'w_want', 'w_please'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تبغى ماء بارد؟', translation: 'Do you want cold water?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Respond to the offer of water.', options: [
      { text: 'إي، أبغى ماء، لو سمحت', translation: 'Yes, I want water, please.', nextStepId: 's3', correct: true, feedback: 'ممتاز! لو سمحت is the Saudi way to say please.' },
      { text: 'لا، ما أبغى شكراً', translation: 'No, I don\'t want any, thank you.', nextStepId: 's3', correct: false, feedback: 'صح! Polite refusal is always appropriate.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'تفضل، الماء بارد وحلو', translation: 'Here you go, the water is cold and good.', end: true },
  ],
  completionMessage: 'Great job! You handled a water offer in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_eat_bread',
  phase: 2,
  title: 'Eating Bread',
  description: 'Talk about eating bread at a meal.',
  focalWordIds: ['w_bread', 'w_eat', 'w_want', 'w_fresh'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تبغى خبز؟ الخبز طازج', translation: 'Do you want bread? The bread is fresh.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Respond to the offer of fresh bread.', options: [
      { text: 'إي، أبغى خبز، يعطيك العافية', translation: 'Yes, I want bread, may God bless your effort.', nextStepId: 's3', correct: true, feedback: 'أحسنت! يعطيك العافية is a warm Saudi expression of thanks.' },
      { text: 'لا، شكراً، أنا شبعان', translation: 'No, thank you, I am full.', nextStepId: 's3', correct: false, feedback: 'صح! شبعان means full — a natural response.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'تفضل، كل ما تبغى', translation: 'Here, eat as much as you want.', end: true },
  ],
  completionMessage: 'Excellent! You navigated a food offer in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_my_friend',
  phase: 2,
  title: 'My Friend',
  description: 'Introduce or mention your friend.',
  focalWordIds: ['w_friend', 'w_good', 'w_name', 'w_where'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'عندك أصحاب هنا؟', translation: 'Do you have friends here?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell them about your friends.', options: [
      { text: 'إي، صاحبي هنا وزين', translation: 'Yes, my friend is here and is nice.', nextStepId: 's3', correct: true, feedback: 'ممتاز! صاحبي is the Saudi word for my friend (male).' },
      { text: 'لا، ما عندي أصحاب هنا', translation: 'No, I don\'t have friends here.', nextStepId: 's3', correct: false, feedback: 'زين! Honest answer — أصحاب is the plural of صاحب.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'أنا كذلك أبغى أعرف أصحاب جدد', translation: 'I also want to meet new friends.', end: true },
  ],
  completionMessage: 'Great work! You talked about friends in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_my_car',
  phase: 2,
  title: 'My Car',
  description: 'Discuss your car\'s color with a neighbor.',
  focalWordIds: ['w_car', 'w_color', 'w_white', 'w_black', 'w_red'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أي لون سيارتك؟', translation: 'What color is your car?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell them the color of your car.', options: [
      { text: 'سيارتي بيضا', translation: 'My car is white.', nextStepId: 's3', correct: true, feedback: 'أحسنت! بيضا is the Saudi colloquial feminine form of white.' },
      { text: 'سيارتي حمرا', translation: 'My car is red.', nextStepId: 's3', correct: false, feedback: 'صح! حمرا is the colloquial form of red — well done.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'حلو! سيارتي سودا، أحب الأسود', translation: 'Nice! My car is black, I love black.', end: true },
  ],
  completionMessage: 'Excellent! You described your car\'s color in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_my_school',
  phase: 2,
  title: 'My School',
  description: 'Talk about your school with a classmate.',
  focalWordIds: ['w_school', 'w_big', 'w_near', 'w_far'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'مدرستك قريبة؟', translation: 'Is your school nearby?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell them if your school is near or far.', options: [
      { text: 'إي، مدرستي قريبة من بيتي', translation: 'Yes, my school is close to my house.', nextStepId: 's3', correct: true, feedback: 'ممتاز! You used two possessive suffixes — مدرستي and بيتي.' },
      { text: 'لا، مدرستي بعيدة شوي', translation: 'No, my school is a little far.', nextStepId: 's3', correct: false, feedback: 'زين! بعيدة شوي means a little far — natural Saudi phrase.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'مدرستي بعيدة، أركب السيارة كل يوم', translation: 'My school is far, I ride the car every day.', end: true },
  ],
  completionMessage: 'Well done! You talked about your school in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_my_work',
  phase: 2,
  title: 'My Work',
  description: 'Mention your workplace in conversation.',
  focalWordIds: ['w_work', 'w_near', 'w_far', 'w_good'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'شغلك قريب من بيتك؟', translation: 'Is your work close to your house?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell them about your commute to work.', options: [
      { text: 'إي، شغلي قريب، الحمد لله', translation: 'Yes, my work is close, thank God.', nextStepId: 's3', correct: true, feedback: 'أحسنت! الحمد لله is a natural Saudi expression of gratitude.' },
      { text: 'لا، شغلي بعيد علي', translation: 'No, my work is far from me.', nextStepId: 's3', correct: false, feedback: 'صح! بعيد علي is a natural Saudi way to say it\'s far.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'شغلي بعيد شوي، بس أحبه', translation: 'My work is a little far, but I love it.', end: true },
  ],
  completionMessage: 'Great job! You discussed your work in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_have_kids',
  phase: 2,
  title: 'Do You Have Kids?',
  description: 'Answer questions about whether you have children.',
  focalWordIds: ['w_kids', 'w_one', 'w_two', 'w_three', 'w_yes', 'w_no'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'عندك أولاد؟', translation: 'Do you have kids?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Respond about whether you have children.', options: [
      { text: 'إي، عندي ولدين', translation: 'Yes, I have two kids.', nextStepId: 's3', correct: true, feedback: 'ممتاز! ولدين is the dual — two children.' },
      { text: 'لا، ما عندي أولاد بعد', translation: 'No, I don\'t have kids yet.', nextStepId: 's3', correct: false, feedback: 'زين! بعد here means "yet" — a perfectly natural answer.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'ماشاء الله، عندي ثلاثة أولاد', translation: 'MashaAllah, I have three kids.', end: true },
  ],
  completionMessage: 'Excellent! You handled a question about children in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_no_thanks',
  phase: 2,
  title: 'No, Thanks',
  description: 'Practice politely declining an offer.',
  focalWordIds: ['w_coffee', 'w_no', 'w_thanks', 'w_want'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تبغى قهوة؟', translation: 'Do you want coffee?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Politely decline the coffee offer.', options: [
      { text: 'لا، شكراً، ما أبغى', translation: 'No, thank you, I don\'t want any.', nextStepId: 's3', correct: true, feedback: 'أحسنت! This is the most natural polite refusal in Saudi Arabic.' },
      { text: 'إي، أبغى قهوة', translation: 'Yes, I want coffee.', nextStepId: 's3', correct: false, feedback: 'صح، بس — this scenario was about declining! Still a valid answer though.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'ماشي، تقدر تطلب أي وقت', translation: 'Okay, you can ask anytime.', end: true },
  ],
  completionMessage: 'Great work! You practiced politely declining in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_yes_please',
  phase: 2,
  title: 'Yes, Please',
  description: 'Practice accepting an offer graciously.',
  focalWordIds: ['w_juice', 'w_yes', 'w_please', 'w_want', 'w_thanks'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تبغى عصير؟', translation: 'Do you want juice?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Accept the juice offer politely.', options: [
      { text: 'إي، لو سمحت، أبغى عصير', translation: 'Yes, please, I want juice.', nextStepId: 's3', correct: true, feedback: 'ممتاز! لو سمحت is the Saudi way to say please when making a request.' },
      { text: 'لا، شكراً، ما أبغى', translation: 'No, thank you, I don\'t want any.', nextStepId: 's3', correct: false, feedback: 'زين — declining is fine too, but the scenario was about accepting.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'تفضل، العصير طازج اليوم', translation: 'Here you go, the juice is fresh today.', end: true },
  ],
  completionMessage: 'Excellent! You accepted an offer graciously in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_count_family',
  phase: 2,
  title: 'Counting Family Members',
  description: 'Count family members using numbers 1–5.',
  focalWordIds: ['w_one', 'w_two', 'w_three', 'w_four', 'w_five', 'w_family', 'w_how_many'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'كم واحد في عيلتك؟', translation: 'How many people are in your family?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell them how many people are in your family.', options: [
      { text: 'في عيلتي أربعة أشخاص', translation: 'There are four people in my family.', nextStepId: 's3', correct: true, feedback: 'أحسنت! أربعة is four — great number usage.' },
      { text: 'في عيلتي خمسة أشخاص', translation: 'There are five people in my family.', nextStepId: 's3', correct: false, feedback: 'زين! خمسة is five — well done using numbers.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'عيلتي ثلاثة أشخاص بس، عيلة صغيرة', translation: 'My family is only three people, a small family.', end: true },
  ],
  completionMessage: 'Great job! You used numbers 1–5 to describe your family in Saudi Arabic.',
},

{
  id: 'saudi_convo_p2_color_my_car',
  phase: 2,
  title: 'The Color of My Car',
  description: 'Discuss car colors using Saudi color vocabulary.',
  focalWordIds: ['w_car', 'w_color', 'w_black', 'w_white', 'w_red', 'w_blue', 'w_like'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تحب أي لون للسيارة؟', translation: 'What color do you like for a car?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell them your favorite car color.', options: [
      { text: 'أنا أحب الأبيض، سيارتي بيضا', translation: 'I like white, my car is white.', nextStepId: 's3', correct: true, feedback: 'ممتاز! Great use of both the adjective and the possessive سيارتي.' },
      { text: 'أنا أحب الأسود، سيارتي سودا', translation: 'I like black, my car is black.', nextStepId: 's3', correct: false, feedback: 'أحسنت! سودا is the Saudi colloquial form of black.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'أنا أحب الأزرق، بس سيارتي حمرا الحين', translation: 'I like blue, but my car is red right now.', end: true },
  ],
  completionMessage: 'Excellent! You discussed car colors using Saudi Arabic vocabulary.',
}
