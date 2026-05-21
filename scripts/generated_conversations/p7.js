{
  id: 'saudi_convo_p7_coworker_bad_day',
  phase: 7,
  title: 'Coworker Having a Bad Day',
  description: 'Check on a coworker who seems down at the office.',
  focalWordIds: ['w_tired', 'w_sad', 'w_colleague', 'w_shuʿuur', 'w_happy', 'w_nafs'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أنا تعبان اليوم، ما قدرت أنام الليل', translation: 'I\'m exhausted today, I couldn\'t sleep last night.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Show concern and ask what\'s wrong.', options: [
      { text: 'والله؟ شو اللي صاير؟ قولي', translation: 'Really? What\'s going on? Tell me.', nextStepId: 's3', correct: true, feedback: 'Perfect — والله + open question shows genuine care.' },
      { text: 'خذ قهوة، بتحس بزيادة', translation: 'Have a coffee, you\'ll feel better.', nextStepId: 's3b', correct: false, feedback: 'Practical but a bit cold — he needed to vent first.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'بصراحة، أحس إن المدير ما يقدّر شغلي أبد', translation: 'Honestly, I feel like the manager never appreciates my work at all.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'القهوة ما تحل المشكلة! المدير ما يقدّر شغلي', translation: 'Coffee won\'t fix it! The manager doesn\'t appreciate my work.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Validate his feelings and suggest what to do.', options: [
      { text: 'أفهمك، هذا الشعور صعب. كلّمه بصراحة؟', translation: 'I understand you, that feeling is hard. Did you speak to him directly?', nextStepId: 's5', correct: true, feedback: 'أحسنت — you validated his شعور and suggested action.' },
      { text: 'ما تزعل، أنت تشتغل زين', translation: 'Don\'t be sad, you work well.', nextStepId: 's5b', correct: false, feedback: 'Kind words, but dismissing his feeling with ما تزعل can sting.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'إن شاء الله أكلمه بكرة. شكرا إنك سألت عني، والله يعافيك', translation: 'God willing I\'ll talk to him tomorrow. Thank you for asking about me, may God give you health.', end: true },
    { id: 's5b', speaker: 'partner', text: 'أعرف، بس أحس بالزعل. يلا، نكمل الشغل', translation: 'I know, but I still feel sad. OK, let\'s keep working.', end: true },
  ],
  completionMessage: 'You supported your coworker with empathy. تعبان and شعور are now part of your emotional toolkit!',
},

{
  id: 'saudi_convo_p7_boss_check_in',
  phase: 7,
  title: 'Boss Check-In',
  description: 'Your manager checks in on how you\'re feeling about work.',
  focalWordIds: ['w_meeting', 'w_fakkara', 'w_fikra', 'w_happy', 'w_tired', 'w_know'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'كيف حالك هذه الأيام؟ تحس إنك مبسوط في الشغل؟', translation: 'How are you these days? Do you feel happy at work?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Give an honest answer about your work satisfaction.', options: [
      { text: 'بصراحة، أحس بالتعب شوي. الاجتماعات كثيرة', translation: 'Honestly, I feel a bit tired. There are too many meetings.', nextStepId: 's3', correct: true, feedback: 'Brave and honest — بصراحة opens real dialogue with a boss.' },
      { text: 'إي، أنا مبسوط والحمد لله', translation: 'Yes, I\'m happy, thank God.', nextStepId: 's3b', correct: false, feedback: 'Safe answer, but you missed a chance to share real feedback.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'هذا زين إنك قلت لي. فكرت في حل؟', translation: 'It\'s good that you told me. Have you thought of a solution?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'الحمد لله. هل عندك أي أفكار لتحسين الشغل؟', translation: 'Praise God. Do you have any ideas to improve work?', next: 's4b' },
    { id: 's4', speaker: 'user', prompt: 'Suggest reducing meetings.', options: [
      { text: 'فكرت نخلي الاجتماعات أقل وأنشاور بالإيميل', translation: 'I thought we could have fewer meetings and coordinate by email.', nextStepId: 's5', correct: true, feedback: 'فكرت is past tense — well applied here for presenting a considered idea.' },
      { text: 'ما أعرف بعد، بحتاج وقت للتفكير', translation: 'I don\'t know yet, I need time to think.', nextStepId: 's5', correct: false, feedback: 'Honest, but a concrete idea lands better with leadership.' },
    ]},
    { id: 's4b', speaker: 'user', prompt: 'Share an idea for improving the team.', options: [
      { text: 'عندي فكرة: نجتمع مرة بالأسبوع بس', translation: 'I have an idea: we meet only once a week.', nextStepId: 's5', correct: true, feedback: 'عندي فكرة is a natural lead-in — great initiative.' },
      { text: 'الشغل زين كما هو', translation: 'Work is fine as it is.', nextStepId: 's5', correct: false, feedback: 'Nothing wrong, but missed a growth opportunity.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'فكرة ممتازة، إن شاء الله نطبقها من الأسبوع الجاي', translation: 'Excellent idea, God willing we\'ll apply it from next week.', end: true },
  ],
  completionMessage: 'Well done navigating a real manager conversation! مبسوط, فكرة and بصراحة all used naturally.',
},

{
  id: 'saudi_convo_p7_meeting_too_long',
  phase: 7,
  title: 'Meeting Gone Too Long',
  description: 'Commiserate with a colleague after an exhaustingly long meeting.',
  focalWordIds: ['w_meeting', 'w_tired', 'w_bored', 'w_colleague', 'w_shuʿuur', 'w_fikra'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'والله الاجتماع كان طويل جدا، تعبت منه', translation: 'By God, the meeting was so long, I got tired of it.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Agree and say how it made you feel.', options: [
      { text: 'أنا كذلك! أحسيت بالملل من أول ساعة', translation: 'Me too! I felt bored from the first hour.', nextStepId: 's3', correct: true, feedback: 'أحسيت — past tense of feeling — used correctly. Natural commiserating!' },
      { text: 'ما كان طويل، كان مفيد', translation: 'It wasn\'t long, it was useful.', nextStepId: 's3b', correct: false, feedback: 'A bit defensive — your colleague wanted to vent, not debate.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'بصراحة، كان ممكن نخلصها في إيميل وحد', translation: 'Honestly, we could\'ve wrapped it up in one email.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'يمكن، بس أنا تعبت. على الأقل خلص', translation: 'Maybe, but I\'m tired. At least it\'s over.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Suggest a better approach for next time.', options: [
      { text: 'صح كلامك. لازم نحدد وقت للاجتماع وما نتجاوزه', translation: 'You\'re right. We need to set a meeting time and not exceed it.', nextStepId: 's5', correct: true, feedback: 'Constructive and practical — great use of لازم for obligation.' },
      { text: 'يلا، المرة الجاية بتكون أحسن إن شاء الله', translation: 'Come on, next time will be better God willing.', nextStepId: 's5', correct: false, feedback: 'إن شاء الله fits naturally — but no concrete fix offered.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'فكرة زينة، والله نكلم المدير عن هذا', translation: 'Good idea, by God let\'s talk to the manager about this.', end: true },
  ],
  completionMessage: 'Great job venting and problem-solving in Saudi Arabic! تعبت, الملل, and اجتماع felt natural.',
},

{
  id: 'saudi_convo_p7_friend_breakup',
  phase: 7,
  title: 'Friend Going Through a Breakup',
  description: 'Support a friend who just ended a relationship.',
  focalWordIds: ['w_sad', 'w_qalb', 'w_shuʿuur', 'w_nafs', 'w_khaafa', 'w_hayaa'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'انتهت العلاقة. أنا تعبان وما أعرف شو أحس', translation: 'The relationship ended. I\'m worn out and don\'t know what to feel.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Show empathy and ask how he\'s holding up.', options: [
      { text: 'والله يا أخي، هذا وجع. كيف قلبك الحين؟', translation: 'By God, brother, that\'s painful. How\'s your heart right now?', nextStepId: 's3', correct: true, feedback: 'كيف قلبك — "how\'s your heart" — deeply natural Saudi emotional check-in.' },
      { text: 'لا تهتم، في بنات ثانيات', translation: 'Don\'t worry, there are other girls.', nextStepId: 's3b', correct: false, feedback: 'Too soon for that — he needs to be heard first.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'قلبي تعبان. أحس بالخوف من المستقبل بصراحة', translation: 'My heart is tired. I honestly feel afraid of the future.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'يمكن، بس أنا ما أقدر أفكر بهذا الحين. أحس بخوف', translation: 'Maybe, but I can\'t think about that now. I feel afraid.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Acknowledge his fear and offer support.', options: [
      { text: 'طبيعي تحس بالخوف. أنا معاك مهما صار', translation: 'It\'s natural to feel fear. I\'m with you no matter what.', nextStepId: 's5', correct: true, feedback: 'مهما صار — "no matter what" — powerful support phrase. أحسنت.' },
      { text: 'الخوف ضعف، قوى نفسك', translation: 'Fear is weakness, strengthen yourself.', nextStepId: 's5b', correct: false, feedback: 'This dismisses his خوف — not what a hurting friend needs.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'شكرا يا أخي. والله أنت زميل ما يطلع بالدنيا', translation: 'Thank you, brother. By God, you\'re a friend that can\'t be found in this world.', end: true },
    { id: 's5b', speaker: 'partner', text: 'أنا أحاول. بس الحياة صعبة أحيانا. شكرا على الوقوف معاي', translation: 'I\'m trying. But life is hard sometimes. Thanks for standing by me.', end: true },
  ],
  completionMessage: 'You were a real support! قلب, خوف, and شعور at Phase 7 emotional depth — شاطر!',
},

{
  id: 'saudi_convo_p7_friend_promotion',
  phase: 7,
  title: 'Friend Gets a Promotion',
  description: 'Celebrate your friend\'s exciting promotion at work.',
  focalWordIds: ['w_excited', 'w_happy', 'w_shuʿuur', 'w_fakkara', 'w_colleague', 'w_know'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'يا أخي، ترقيت في الشغل اليوم! ما صدقت نفسي', translation: 'Bro, I got promoted at work today! I couldn\'t believe myself.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Congratulate him enthusiastically.', options: [
      { text: 'مبروووك! والله تستاهل أكثر من كذا!', translation: 'Congratulations! By God, you deserve more than that!', nextStepId: 's3', correct: true, feedback: 'Energetic مبروك + تستاهل — perfect warmth for this moment.' },
      { text: 'زين، إن شاء الله يكون زين لك', translation: 'Good, hopefully it works out for you.', nextStepId: 's3b', correct: false, feedback: 'A bit muted for a promotion — he\'s متحمس and needs matching energy.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'أنا متحمس جدا! أحس إن تعبي ما ضاع', translation: 'I\'m so excited! I feel like my hard work wasn\'t wasted.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'هههه يلا إن شاء الله. بس أنا متحمس فعلا', translation: 'Haha, God willing. But I really am excited.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Ask how he found out and what it means.', options: [
      { text: 'كيف عرفت؟ المدير كلمك مباشرة؟', translation: 'How did you find out? Did the manager talk to you directly?', nextStepId: 's5', correct: true, feedback: 'عرفت (past of عرف) — natural curiosity question, perfectly phrased.' },
      { text: 'شو راتبك الجديد؟', translation: 'What\'s your new salary?', nextStepId: 's5b', correct: false, feedback: 'Too direct for Saudi culture — asking about salary feels intrusive here.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'إي والله، طلبني لمكتبه وقال لي الخبر. ما صدقت!', translation: 'Yes by God, he called me to his office and told me the news. I couldn\'t believe it!', end: true },
    { id: 's5b', speaker: 'partner', text: 'هههه، هذا سؤال ثاني! المهم المدير قال إني استاهل الترقية', translation: 'Haha, that\'s another question! The important thing is the manager said I deserve the promotion.', end: true },
  ],
  completionMessage: 'Beautiful celebration in Saudi Arabic! متحمس, مبسوط, and شعور all landed naturally.',
},

{
  id: 'saudi_convo_p7_dinner_invite',
  phase: 7,
  title: 'Dinner Invitation',
  description: 'A friend invites you over for dinner at his place.',
  focalWordIds: ['w_happy', 'w_shuʿuur', 'w_fikra', 'w_remember', 'w_nafs', 'w_jalasa'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أبغاك تيجي تتعشى عندنا الليلة، أمي طبخت كبسة', translation: 'I want you to come have dinner at our place tonight, my mom made kabsa.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Respond to the invitation.', options: [
      { text: 'والله ما أقدر أرفض كبسة أم خالد! إن شاء الله آجي', translation: 'By God I can\'t refuse Umm Khalid\'s kabsa! I\'ll come God willing.', nextStepId: 's3', correct: true, feedback: 'Warm, personal, and enthusiastic — exactly the Saudi dinner invite energy.' },
      { text: 'ما أقدر الليلة، أنا تعبان', translation: 'I can\'t tonight, I\'m tired.', nextStepId: 's3b', correct: false, feedback: 'Valid excuse, but declining without softer phrasing can feel abrupt.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'ممتاز! تقدر تجي الساعة سبعة؟', translation: 'Excellent! Can you come at seven?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'لا يهمك، خلنا نحدد يوم ثاني. تتذكر إننا ما اجتمعنا من زمان؟', translation: 'No worries, let\'s set another day. Remember we haven\'t gathered in a long time?', next: 's4b' },
    { id: 's4', speaker: 'user', prompt: 'Confirm the time and ask if you should bring anything.', options: [
      { text: 'الساعة سبعة زين. أجيب شي معاي؟', translation: 'Seven is fine. Shall I bring something with me?', nextStepId: 's5', correct: true, feedback: 'أجيب — "shall I bring" — polite guest question, very natural.' },
      { text: 'تمام، إلى الساعة سبعة', translation: 'Done, see you at seven.', nextStepId: 's5', correct: false, feedback: 'Fine, but offering to bring something is a warmth signal worth learning.' },
    ]},
    { id: 's4b', speaker: 'user', prompt: 'Agree to set another day and reminisce a little.', options: [
      { text: 'والله صح، أتذكر آخر مرة التقينا كان العيد', translation: 'By God that\'s true, I remember the last time we met was Eid.', nextStepId: 's5b', correct: true, feedback: 'أتذكر (present of remember) used beautifully to reminisce.' },
      { text: 'يلا، أي يوم يناسبك', translation: 'OK, any day that suits you.', nextStepId: 's5b', correct: false, feedback: 'Flexible but missed the warm nostalgia moment.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'لا ما تجيب شي، أنت كفاية. بنجلس ونحكي ونستمتع', translation: 'No, don\'t bring anything, you\'re enough. We\'ll sit and talk and enjoy ourselves.', end: true },
    { id: 's5b', speaker: 'partner', text: 'أيوه والله! يلا نتفق على الجمعة إن شاء الله', translation: 'Yes by God! Let\'s agree on Friday God willing.', end: true },
  ],
  completionMessage: 'You navigated a warm Saudi dinner invite! أتذكر, والله, and إن شاء الله used naturally.',
},

{
  id: 'saudi_convo_p7_help_with_project',
  phase: 7,
  title: 'Asking for Help on a Project',
  description: 'Ask a knowledgeable colleague for help on a tricky work project.',
  focalWordIds: ['w_know', 'w_fikra', 'w_fakkara', 'w_tafkiir', 'w_colleague', 'w_maʿrifa'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'شو عندك؟ تبدو مشغول الذهن اليوم', translation: 'What\'s up? You look preoccupied today.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Explain you\'re stuck on a project and ask for help.', options: [
      { text: 'بصراحة، عندي مشكلة في المشروع وما أعرف كيف أحلها. تقدر تساعدني؟', translation: 'Honestly, I have a problem on the project and I don\'t know how to solve it. Can you help me?', nextStepId: 's3', correct: true, feedback: 'Direct, honest, and polite — بصراحة opens the door perfectly.' },
      { text: 'لا شي، كله تمام', translation: 'Nothing, everything\'s fine.', nextStepId: 's3b', correct: false, feedback: 'Missed a chance to get real help — pride vs. progress.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'أكيد! أنا معاك. شو المشكلة بالضبط؟', translation: 'Of course! I\'m with you. What\'s the problem exactly?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'إذا احتجت شي قولي. أنا أعرف هذا النوع من المشاريع زين', translation: 'If you need anything, tell me. I know this type of project well.', next: 's4b' },
    { id: 's4', speaker: 'user', prompt: 'Describe the problem and ask his opinion.', options: [
      { text: 'ما أعرف كيف أرتب البيانات. شو تفكيرك؟', translation: 'I don\'t know how to organize the data. What\'s your thinking?', nextStepId: 's5', correct: true, feedback: 'تفكيرك — "your thinking" — natural peer-to-peer Saudi request for input.' },
      { text: 'المشروع صعب وما عندي وقت', translation: 'The project is hard and I have no time.', nextStepId: 's5', correct: false, feedback: 'Venting without asking a clear question is less productive.' },
    ]},
    { id: 's4b', speaker: 'user', prompt: 'Take him up on his offer and explain the issue.', options: [
      { text: 'والله زين إنك قلت، عندي إشكالية في ترتيب البيانات', translation: 'By God it\'s good you said that, I have a problem with organizing the data.', nextStepId: 's5', correct: true, feedback: 'والله زين إنك قلت — warm lead-in to asking for expertise.' },
      { text: 'شكرا، بعدين أسألك', translation: 'Thanks, I\'ll ask you later.', nextStepId: 's5', correct: false, feedback: 'Delaying wastes his offer — seize the moment.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'فهمت المشكلة. عندي فكرة ممتازة، خلنا نجلس بعد الغداء وأشرح لك', translation: 'I understood the problem. I have an excellent idea, let\'s sit after lunch and I\'ll explain to you.', end: true },
  ],
  completionMessage: 'Great professional conversation! أعرف, تفكير, and فكرة all used in authentic context.',
},

{
  id: 'saudi_convo_p7_late_apology_work',
  phase: 7,
  title: 'Apologizing for Being Late to Work',
  description: 'Apologize to your boss for arriving late and explain what happened.',
  focalWordIds: ['w_tired', 'w_nafs', 'w_forget', 'w_shuʿuur', 'w_know', 'w_fakkara'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تأخرت اليوم، شو اللي صاير؟', translation: 'You were late today, what\'s going on?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Apologize and explain why you were late.', options: [
      { text: 'آسف جدا، ما نمت زين الليلة وما سمعت المنبه', translation: 'I\'m very sorry, I didn\'t sleep well last night and didn\'t hear the alarm.', nextStepId: 's3', correct: true, feedback: 'Honest and direct — ما نمت زين (didn\'t sleep well) is a natural Phase 7 phrase.' },
      { text: 'الزحمة كانت شديدة اليوم', translation: 'Traffic was really bad today.', nextStepId: 's3b', correct: false, feedback: 'Acceptable excuse, but blame-shifting without apology first is weak.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'أفهمك، بس الشغل يبدأ الساعة ثمانية. تعرف هذا؟', translation: 'I understand you, but work starts at eight. You know that, right?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'الزحمة مشكلة الجميع. لازم تخرج أبكر. تعرف هذا؟', translation: 'Traffic is everyone\'s problem. You need to leave earlier. You know this, right?', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Acknowledge and commit to doing better.', options: [
      { text: 'أعرف وأنا آسف. هذا ما يصير ثاني، وعد', translation: 'I know and I\'m sorry. This won\'t happen again, I promise.', nextStepId: 's5', correct: true, feedback: 'أعرف + وعد (promise) — accountable and mature response.' },
      { text: 'إن شاء الله أحاول', translation: 'God willing I\'ll try.', nextStepId: 's5b', correct: false, feedback: 'إن شاء الله alone sounds noncommittal to a manager expecting accountability.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'زين، أنا أثق فيك. خل هذي المرة الأخيرة', translation: 'Good, I trust you. Let this be the last time.', end: true },
    { id: 's5b', speaker: 'partner', text: 'أحتاج أكثر من إن شاء الله. أريد التزام واضح منك', translation: 'I need more than God willing. I want a clear commitment from you.', end: true },
  ],
  completionMessage: 'You handled a tough workplace moment with honesty. أعرف, آسف, and ما نمت زين — all Phase 7 gold.',
},

{
  id: 'saudi_convo_p7_lunch_invite',
  phase: 7,
  title: 'Lunch Invitation at Work',
  description: 'A colleague invites you to join the team for lunch.',
  focalWordIds: ['w_happy', 'w_colleague', 'w_meeting', 'w_jalasa', 'w_shuʿuur', 'w_nafs'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'يا أخي، الفريق كله رايحين للغداء. تيجي معنا؟', translation: 'Bro, the whole team is going to lunch. Are you coming with us?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Respond to the lunch invite.', options: [
      { text: 'إي والله! مبسوط إنكم طلبتموني. وين رايحين؟', translation: 'Yes by God! I\'m happy you invited me. Where are you going?', nextStepId: 's3', correct: true, feedback: 'مبسوط إنكم طلبتموني — expressing happiness at being included is perfect.' },
      { text: 'ما أقدر، عندي اجتماع بعد شوي', translation: 'I can\'t, I have a meeting in a bit.', nextStepId: 's3b', correct: false, feedback: 'Valid, but check if the meeting is worth missing team bonding.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'رايحين للمطعم اللي قدام المبنى. يقولون أكله حلو', translation: 'Going to the restaurant in front of the building. They say the food is good.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'لا يهمك، المرة الجاية. أتذكر كمان ما حضرت الغداء الأسبوع الماضي', translation: 'No worries, next time. I also remember you didn\'t come to lunch last week.', next: 's4b' },
    { id: 's4', speaker: 'user', prompt: 'Express excitement about the food.', options: [
      { text: 'والله أحس إني محتاج أجلس مع الفريق، تعبت من الأكل بالمكتب', translation: 'By God I feel I need to sit with the team, I got tired of eating at the office.', nextStepId: 's5', correct: true, feedback: 'أحس + تعبت من — feelings vocab used naturally in a light context.' },
      { text: 'زين، يلا نمشي', translation: 'Fine, let\'s go.', nextStepId: 's5', correct: false, feedback: 'Works, but sharing the feeling makes you more personable.' },
    ]},
    { id: 's4b', speaker: 'user', prompt: 'Acknowledge and commit to being more social.', options: [
      { text: 'صح، أنا آسف. حاول أكون معاكم أكثر إن شاء الله', translation: 'True, I\'m sorry. I\'ll try to be with you guys more God willing.', nextStepId: 's5', correct: true, feedback: 'Honest self-reflection and commitment — mature and warm.' },
      { text: 'كنت مشغول، ما قدرت', translation: 'I was busy, I couldn\'t.', nextStepId: 's5', correct: false, feedback: 'Defensive without acknowledging his point.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'هههه والله نفس الشعور! يلا نمشي قبل ما يمتلئ المطعم', translation: 'Haha by God, same feeling! Let\'s go before the restaurant fills up.', end: true },
  ],
  completionMessage: 'Nice lunch banter in Saudi Arabic! مبسوط, أحس, and تعبت used in everyday light contexts.',
},

{
  id: 'saudi_convo_p7_friend_stressed',
  phase: 7,
  title: 'Friend is Stressed Out',
  description: 'Help a stressed friend talk through what\'s bothering them.',
  focalWordIds: ['w_tired', 'w_khaafa', 'w_shuʿuur', 'w_qalb', 'w_nafs', 'w_hayaa'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'ما أقدر أنام، كل يوم أفكر بأشياء كثيرة وأحس بضغط', translation: 'I can\'t sleep, every day I think about many things and feel pressure.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Validate his stress and dig deeper.', options: [
      { text: 'والله يا صديقي، هذا تعب. إيش اللي يضغط عليك أكثر؟', translation: 'By God my friend, that\'s exhausting. What pressures you the most?', nextStepId: 's3', correct: true, feedback: 'Open, caring question after validating — the gold standard for support.' },
      { text: 'لازم تروح تنام بكير', translation: 'You need to go sleep early.', nextStepId: 's3b', correct: false, feedback: 'Practical advice before listening feels dismissive of his feelings.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'أخاف من المستقبل، من الشغل، من كل شي. قلبي ما يهدأ', translation: 'I\'m afraid of the future, of work, of everything. My heart won\'t calm down.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'النوم ما يحل المشكلة. أنا خايف من المستقبل', translation: 'Sleep won\'t fix the problem. I\'m afraid of the future.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Offer perspective and encouragement.', options: [
      { text: 'أعرف هذا الشعور. الخوف طبيعي، بس الحياة تكمل. أنا معاك', translation: 'I know this feeling. Fear is natural, but life goes on. I\'m with you.', nextStepId: 's5', correct: true, feedback: 'Deeply empathetic — الحياة تكمل + أنا معاك is genuine solidarity.' },
      { text: 'الحياة صعبة للجميع، اصبر', translation: 'Life is hard for everyone, be patient.', nextStepId: 's5b', correct: false, feedback: 'True but impersonal — he needs more than "everyone suffers."' },
    ]},
    { id: 's5', speaker: 'partner', text: 'شكرا يا أخي. بس كونك موجود يخفف عني كثير', translation: 'Thank you brother. Just you being here relieves me a lot.', end: true },
    { id: 's5b', speaker: 'partner', text: 'يمكن. بس أتمنى يكون عندي شخص يفهمني أكثر', translation: 'Maybe. But I wish I had someone who understood me more.', end: true },
  ],
  completionMessage: 'Emotional depth achieved! خوف, قلب, and شعور all used authentically in a caring conversation.',
},

{
  id: 'saudi_convo_p7_disagreement_polite',
  phase: 7,
  title: 'Polite Disagreement at Work',
  description: 'Respectfully disagree with a colleague\'s idea during a work discussion.',
  focalWordIds: ['w_fikra', 'w_fakkara', 'w_tafkiir', 'w_know', 'w_maʿrifa', 'w_colleague'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أنا أقترح نغير الخطة كلها من الأساس، شو رأيك؟', translation: 'I suggest we change the whole plan from the ground up, what do you think?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Respectfully disagree and offer a counter-idea.', options: [
      { text: 'بصراحة، أحس إن الفكرة هذي بتكلفنا وقت كثير. في فكرة ثانية؟', translation: 'Honestly, I feel this idea will cost us a lot of time. Is there another idea?', nextStepId: 's3', correct: true, feedback: 'بصراحة + أحس softens the disagreement brilliantly. Very Saudi.' },
      { text: 'لا، هذي فكرة غلط', translation: 'No, this is a wrong idea.', nextStepId: 's3b', correct: false, feedback: 'Too blunt — in Saudi culture, softer disagreement preserves relationships.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'أفهم وجهة نظرك. شو تقترح أنت؟', translation: 'I understand your perspective. What do you suggest?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'ليش غلط؟ قولي تفكيرك', translation: 'Why wrong? Tell me your thinking.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Present your alternative approach.', options: [
      { text: 'أقترح نعدل الخطة بدل ما نغيرها كلها. أعرف طريقة أسرع', translation: 'I suggest we modify the plan instead of changing it entirely. I know a faster method.', nextStepId: 's5', correct: true, feedback: 'أعرف طريقة — "I know a method" — confident and constructive.' },
      { text: 'ما أعرف بالضبط، بس شي أبسط من هذا', translation: 'I don\'t know exactly, but something simpler than this.', nextStepId: 's5b', correct: false, feedback: 'Honest but vague — concrete ideas win disagreements in meetings.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'هذا تفكير زين. خلنا نجلس مع الفريق ونناقش الفكرتين', translation: 'That\'s good thinking. Let\'s sit with the team and discuss both ideas.', end: true },
    { id: 's5b', speaker: 'partner', text: 'يمكن، بس لازم عندنا خطة واضحة. اشتغل على فكرة محددة وارجع لي', translation: 'Maybe, but we need a clear plan. Work on a specific idea and come back to me.', end: true },
  ],
  completionMessage: 'You disagreed like a pro! بصراحة, تفكير, and فكرة made for mature workplace dialogue.',
},

{
  id: 'saudi_convo_p7_sister_advice',
  phase: 7,
  title: 'Asking Your Sister for Advice',
  description: 'Ask your sister for advice about a difficult work decision.',
  focalWordIds: ['w_fakkara', 'w_fikra', 'w_know', 'w_shuʿuur', 'w_khaafa', 'w_nafs'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'شو فيك؟ أحسك مشغول البال من الصبح', translation: 'What\'s wrong? I\'ve sensed you\'ve been preoccupied since morning.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Open up to your sister about the dilemma.', options: [
      { text: 'بصراحة، عندي قرار صعب في الشغل وما أعرف شو أسوي', translation: 'Honestly, I have a hard decision at work and I don\'t know what to do.', nextStepId: 's3', correct: true, feedback: 'Opening up with بصراحة to family is natural and builds trust.' },
      { text: 'لا شي، كله تمام', translation: 'Nothing, everything is fine.', nextStepId: 's3b', correct: false, feedback: 'She already sensed something — shutting down misses real support.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'قولي، أنا دايمًا معاك. شو القرار؟', translation: 'Tell me, I\'m always with you. What\'s the decision?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'أنا أعرفك أحسن من نفسك، في شي يضايقك. قولي', translation: 'I know you better than yourself, something is bothering you. Tell me.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Explain the decision and your fear.', options: [
      { text: 'عرضوا عليّ وظيفة جديدة بس أخاف أترك الشغل الحالي', translation: 'They offered me a new job but I\'m afraid to leave the current one.', nextStepId: 's5', correct: true, feedback: 'أخاف (present fear) combined with real context — excellent Phase 7 use.' },
      { text: 'ما أبغى أتكلم عن الشغل بالبيت', translation: 'I don\'t want to talk about work at home.', nextStepId: 's5b', correct: false, feedback: 'Pulling back after she asked nicely feels like a brush-off.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'فكر في اللي يريحك. ما الشغل يساوي راحة بالك. أنا أدعي لك', translation: 'Think about what gives you peace. Work isn\'t worth your peace of mind. I\'ll pray for you.', end: true },
    { id: 's5b', speaker: 'partner', text: 'تمام، بس أنا هنا لما تبغى تتكلم. الباب مفتوح دايمًا', translation: 'OK, but I\'m here whenever you want to talk. The door is always open.', end: true },
  ],
  completionMessage: 'Emotional family dialogue mastered! أخاف, أعرف, and بصراحة in authentic sibling context.',
},

{
  id: 'saudi_convo_p7_friend_visit_sick',
  phase: 7,
  title: 'Visiting a Sick Friend',
  description: 'Visit and comfort a friend who is unwell.',
  focalWordIds: ['w_tired', 'w_sad', 'w_shuʿuur', 'w_khaafa', 'w_nafs', 'w_qalb'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'شكرا إنك جيت تزورني. والله تعبت من المرض', translation: 'Thank you for coming to visit me. By God I\'m tired of being sick.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Express concern and ask how he\'s feeling.', options: [
      { text: 'الله يشفيك يا أخي. كيف تحس الحين؟', translation: 'May God heal you, brother. How do you feel now?', nextStepId: 's3', correct: true, feedback: 'الله يشفيك is the essential Saudi sick visit phrase — perfectly placed.' },
      { text: 'شو عندك بالضبط؟ هل ذهبت للدكتور؟', translation: 'What exactly do you have? Did you go to the doctor?', nextStepId: 's3b', correct: false, feedback: 'Information-first before warmth feels clinical for a friend visit.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'أحسن شوي الحمد لله، بس لسا أحس بتعب في نفسي', translation: 'A bit better praise God, but I still feel tiredness in myself.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'رحت للدكتور، قال عندي تعب عام. بس والله قلبي مو زين', translation: 'I went to the doctor, he said general fatigue. But by God my heart isn\'t good.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Offer to stay and keep him company.', options: [
      { text: 'أنا معاك اليوم، ما تحتاج تكون لحالك. شو تبغى؟', translation: 'I\'m with you today, you don\'t need to be alone. What do you want?', nextStepId: 's5', correct: true, feedback: 'ما تحتاج تكون لحالك — "you don\'t need to be alone" — beautiful companionship.' },
      { text: 'إن شاء الله تتحسن بسرعة، أنا لازم أروح', translation: 'God willing you\'ll improve quickly, I have to go.', nextStepId: 's5b', correct: false, feedback: 'Visiting and then rushing out sends mixed signals.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'والله يكفيك وجودك. بس اجلس شوي واحكيني عن أخبارك', translation: 'By God your presence is enough. Just sit a while and tell me your news.', end: true },
    { id: 's5b', speaker: 'partner', text: 'لا يهمك، شكرا إنك مريت. هذا يكفي', translation: 'No worries, thanks for stopping by. That\'s enough.', end: true },
  ],
  completionMessage: 'You gave a beautiful Saudi sick visit! الله يشفيك, تعبان, and أحس all felt completely natural.',
},

{
  id: 'saudi_convo_p7_father_proud',
  phase: 7,
  title: 'Father Expresses Pride',
  description: 'Respond to your father telling you he\'s proud of your work.',
  focalWordIds: ['w_happy', 'w_excited', 'w_shuʿuur', 'w_fakkara', 'w_hayaa', 'w_nafs'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'يا بني، أنا فخور فيك. شغلك ونجاحك يسعدني', translation: 'My son, I\'m proud of you. Your work and success make me happy.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Respond with humility and gratitude.', options: [
      { text: 'والله يا أبوي، كلامك هذا يملأ قلبي. أنت اللي علمتني كل شي', translation: 'By God, father, your words fill my heart. You\'re the one who taught me everything.', nextStepId: 's3', correct: true, feedback: 'يملأ قلبي — beautiful emotional expression. Respectful Saudi tone to father.' },
      { text: 'أنا بس أشتغل زين، ما في شي كبير', translation: 'I just work well, it\'s nothing big.', nextStepId: 's3b', correct: false, feedback: 'Humble is fine but deflecting fully doesn\'t honor his moment of sharing.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'لا، النجاح من تعبك ومن ربك. أنا فقط دعيت لك', translation: 'No, success is from your hard work and from God. I only prayed for you.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'لا تقلل من نفسك يا بني، أنا أعرف كم تعبت', translation: 'Don\'t undervalue yourself, son. I know how hard you worked.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Share how his support made you feel.', options: [
      { text: 'دعاؤك وراء كل نجاح. أحس بالسعادة لما أعرف إنك مبسوط مني', translation: 'Your prayers are behind every success. I feel happy knowing you\'re pleased with me.', nextStepId: 's5', correct: true, feedback: 'أحس + مبسوط in the context of family pride — authentic emotional expression.' },
      { text: 'إن شاء الله أكمل التعب في المستقبل', translation: 'God willing I\'ll keep working hard in the future.', nextStepId: 's5', correct: false, feedback: 'Forward-looking is good but skips the emotional moment with him.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'حياتك يا بني. الله يحفظك ويوفقك دايمًا', translation: 'You\'re my life, son. May God protect you and guide you always.', end: true },
  ],
  completionMessage: 'A touching family exchange! قلبي, مبسوط, and أحس conveyed real emotional warmth.',
},

{
  id: 'saudi_convo_p7_friend_quit_job',
  phase: 7,
  title: 'Friend Quits His Job',
  description: 'React to a friend\'s surprise news that he quit his job.',
  focalWordIds: ['w_khaafa', 'w_shuʿuur', 'w_fakkara', 'w_know', 'w_excited', 'w_hayaa'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'قلت لك شي؟ استقلت من الشغل امبارح', translation: 'Did I tell you something? I quit work yesterday.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'React with surprise and ask what happened.', options: [
      { text: 'والله؟! شو صاير؟ كيف قررت فجأة؟', translation: 'Really?! What\'s going on? How did you decide so suddenly?', nextStepId: 's3', correct: true, feedback: 'Genuine surprise + open question — natural and engaged.' },
      { text: 'زين إن شاء الله', translation: 'Good, God willing.', nextStepId: 's3b', correct: false, feedback: 'Too calm for shocking news — he expected more reaction.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'فكرت فيها كثير. ما كنت مبسوطا هناك، وأبغى أشتغل لحسابي', translation: 'I thought about it a lot. I wasn\'t happy there, and I want to work for myself.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'إن شاء الله. بس ما صدقت إنك ما تسألني أكثر!', translation: 'God willing. But I can\'t believe you didn\'t ask me more!', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Support the decision but check he\'s thought it through.', options: [
      { text: 'أنا وراك! بس أخاف عليك، هل عندك خطة؟', translation: 'I\'m behind you! But I\'m worried about you, do you have a plan?', nextStepId: 's5', correct: true, feedback: 'أخاف عليك — "I\'m worried about you" — caring without being discouraging.' },
      { text: 'هذا قرار غلط، الشغل ضروري', translation: 'This is a wrong decision, work is necessary.', nextStepId: 's5b', correct: false, feedback: 'Unsupportive and lecturing — he needs encouragement not a lecture.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'إي، عندي فكرة مشروع من زمان. الحين هو الوقت. أنا متحمس والله', translation: 'Yes, I\'ve had a project idea for a long time. Now is the time. I\'m excited by God.', end: true },
    { id: 's5b', speaker: 'partner', text: 'أعرف إن في خطر، بس الحياة ما تكمل بدون مغامرة. شكرا على الرأي', translation: 'I know there\'s risk, but life doesn\'t move forward without adventure. Thanks for the opinion.', end: true },
  ],
  completionMessage: 'Real friend support in Saudi Arabic! أخاف عليك, متحمس, and فكرت all landed beautifully.',
},

{
  id: 'saudi_convo_p7_invite_party',
  phase: 7,
  title: 'Inviting a Friend to a Party',
  description: 'Invite a hesitant friend to join a gathering.',
  focalWordIds: ['w_happy', 'w_excited', 'w_shuʿuur', 'w_jalasa', 'w_nafs', 'w_colleague'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'يا أخي، عندنا سهرة الجمعة عند بيت سالم. تيجي؟', translation: 'Bro, we have a gathering Friday night at Salem\'s place. Are you coming?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Respond to the party invitation.', options: [
      { text: 'إي والله، أنا متحمس! من رح يكون هناك؟', translation: 'Yes by God, I\'m excited! Who\'s going to be there?', nextStepId: 's3', correct: true, feedback: 'متحمس + natural follow-up question — energetic and social.' },
      { text: 'ما أدري، أنا تعبان هالأيام', translation: 'I don\'t know, I\'m tired these days.', nextStepId: 's3b', correct: false, feedback: 'Hedging is honest, but he\'ll try to convince you — be ready.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'كل الشباب، والزملاء من الشغل كذلك. بتكون سهرة ممتعة', translation: 'All the guys, and work colleagues too. It\'ll be a fun night.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'بالضبط عشان تيجي! التعب يروح لما تجلس مع الناس', translation: 'Exactly why you should come! Tiredness goes away when you sit with people.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Confirm you\'ll go and ask what time.', options: [
      { text: 'تمام، إن شاء الله أكون معاكم. الساعة كم تبدأ؟', translation: 'Alright, God willing I\'ll be with you. What time does it start?', nextStepId: 's5', correct: true, feedback: 'إن شاء الله + asking details — committed and practical.' },
      { text: 'إن شاء الله أجي، بس ما أضمن', translation: 'God willing I\'ll come, but I can\'t promise.', nextStepId: 's5b', correct: false, feedback: 'A soft commit — he\'ll be disappointed if you don\'t show.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'بعد العشاء، حوالي الساعة تسعة. لا تتأخر عليّ!', translation: 'After dinner, around nine. Don\'t be late on me!', end: true },
    { id: 's5b', speaker: 'partner', text: 'حاول يا أخي، بنتعب لك. الشباب كلهم يسألون عنك', translation: 'Try bro, we\'ll miss you. All the guys are asking about you.', end: true },
  ],
  completionMessage: 'Fun social invitation nailed! متحمس, إن شاء الله, and مبسوط in natural party-planning dialogue.',
},

{
  id: 'saudi_convo_p7_friend_moving_city',
  phase: 7,
  title: 'Friend Moving to Another City',
  description: 'React to your close friend announcing he\'s moving cities.',
  focalWordIds: ['w_sad', 'w_shuʿuur', 'w_khaafa', 'w_remember', 'w_hayaa', 'w_qalb'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'قررت أنتقل للرياض الشهر الجاي، الشغل هناك أحسن', translation: 'I decided to move to Riyadh next month, work there is better.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'React with mixed feelings — happy for him but sad to see him go.', options: [
      { text: 'والله يا أخي، قلبي مبسوط لك وزعلان في نفس الوقت', translation: 'By God brother, my heart is happy for you and sad at the same time.', nextStepId: 's3', correct: true, feedback: 'Holding two feelings at once — قلبي مبسوط + زعلان — emotionally sophisticated.' },
      { text: 'زين لك، الرياض كبيرة', translation: 'Good for you, Riyadh is big.', nextStepId: 's3b', correct: false, feedback: 'Factual but emotionally flat for news about a close friend leaving.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'أنا كذلك أحس بنفس الشيء. أخاف إنك تنساني', translation: 'I also feel the same thing. I\'m afraid you\'ll forget me.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'إي، بس أنا أحس بحزن شوي. ما سهل', translation: 'Yes, but I feel a bit sad. It\'s not easy.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Reassure him about the friendship.', options: [
      { text: 'أنساك؟ مستحيل! أتذكر كل شي مريناه سوا. الصداقة ما تنتهي بمسافة', translation: 'Forget you? Impossible! I remember everything we\'ve been through together. Friendship doesn\'t end with distance.', nextStepId: 's5', correct: true, feedback: 'أتذكر + الصداقة ما تنتهي بمسافة — deeply heartfelt and authentic.' },
      { text: 'التليفون موجود، نتواصل', translation: 'The phone exists, we\'ll keep in touch.', nextStepId: 's5b', correct: false, feedback: 'Practical truth, but it deflates the emotional moment.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'والله كلامك يريح قلبي. الصديق الحقيقي ما يتغير بالمسافة', translation: 'By God your words comfort my heart. A true friend doesn\'t change with distance.', end: true },
    { id: 's5b', speaker: 'partner', text: 'صح. إن شاء الله نتواصل. بس هات الأحضان قبل ما أسافر', translation: 'True. God willing we\'ll keep in touch. But give me a hug before I travel.', end: true },
  ],
  completionMessage: 'Beautifully emotional! أتذكر, قلبي, and زعلان showed real Phase 7 emotional range.',
},

{
  id: 'saudi_convo_p7_compliment_work',
  phase: 7,
  title: 'Complimenting a Colleague\'s Work',
  description: 'Compliment a colleague on an impressive presentation they gave.',
  focalWordIds: ['w_excited', 'w_happy', 'w_fikra', 'w_fakkara', 'w_colleague', 'w_maʿrifa'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'شو رأيك بالعرض اللي قدمته اليوم؟', translation: 'What did you think of the presentation I gave today?', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Give a genuine compliment on the presentation.', options: [
      { text: 'والله كان رائع! أفكارك كانت واضحة ومبدعة. مبسوطت لك', translation: 'By God it was amazing! Your ideas were clear and creative. I was happy for you.', nextStepId: 's3', correct: true, feedback: 'Specific praise + مبسوطت لك — genuine and warm, not just polite.' },
      { text: 'كان زين', translation: 'It was good.', nextStepId: 's3b', correct: false, feedback: 'Accurate but bland — a colleague who asked deserves richer feedback.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'الحمد لله! والله فكرت فيه كثير. كنت خايف ما يعجب الناس', translation: 'Praise God! By God I thought about it a lot. I was afraid people wouldn\'t like it.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'بس زين؟ ما في شي مميز؟', translation: 'Just good? Nothing special?', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Reassure him and mention a specific strength.', options: [
      { text: 'الخوف طبيعي قبل العرض. بس الفكرة اللي قدمتها في النهاية كانت أحسن شي', translation: 'Fear before a presentation is natural. But the idea you presented at the end was the best thing.', nextStepId: 's5', correct: true, feedback: 'Specific feedback + normalizing خوف — emotionally intelligent compliment.' },
      { text: 'ما كان عندك سبب للخوف', translation: 'You had no reason to be afraid.', nextStepId: 's5', correct: false, feedback: 'Dismissing his خوف instead of addressing it misses the connection.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'شكرا يا زميلي، كلامك يحمسني أكثر للمرة الجاية', translation: 'Thank you colleague, your words motivate me even more for next time.', end: true },
  ],
  completionMessage: 'Sincere workplace praise delivered! فكرة, خايف, and مبسوط in a natural colleague moment.',
},

{
  id: 'saudi_convo_p7_request_day_off',
  phase: 7,
  title: 'Requesting a Day Off',
  description: 'Ask your manager for a day off for a personal reason.',
  focalWordIds: ['w_tired', 'w_khaafa', 'w_shuʿuur', 'w_nafs', 'w_know', 'w_fakkara'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'إيش عندك؟ تبدو مو بخير من أول الأسبوع', translation: 'What\'s up? You\'ve looked unwell since the start of the week.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Explain and request a day off.', options: [
      { text: 'بصراحة، أنا تعبان شوي وأحتاج يوم أرتاح. ممكن آخذ غداً إجازة؟', translation: 'Honestly, I\'m a bit tired and I need a day to rest. Can I take tomorrow off?', nextStepId: 's3', correct: true, feedback: 'Direct, respectful, and uses بصراحة — the right approach with a manager.' },
      { text: 'كله تمام، بس أبغى يوم إجازة بكرة', translation: 'Everything\'s fine, I just want a day off tomorrow.', nextStepId: 's3b', correct: false, feedback: 'Contradiction (fine + need day off) weakens credibility.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'تعبان كيف؟ شو اللي تحس فيه؟', translation: 'Tired how? What do you feel?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'لو كله تمام ليش تبغى إجازة؟ قولي الحقيقة', translation: 'If everything is fine why do you want a day off? Tell me the truth.', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Explain your condition more honestly.', options: [
      { text: 'أحس بتعب نفسي أكثر من جسدي. أحتاج أرتب أفكاري', translation: 'I feel mental tiredness more than physical. I need to organize my thoughts.', nextStepId: 's5', correct: true, feedback: 'Vulnerability + تعب نفسي — honest and mature self-awareness at Phase 7.' },
      { text: 'عندي صداع بس، مش مشكلة كبيرة', translation: 'I have a headache but, it\'s not a big problem.', nextStepId: 's5b', correct: false, feedback: 'Minimizing again — undermines your own request.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'أفهمك. خذ يوم وارتاح. الصحة أهم من الشغل. ارجع بخير', translation: 'I understand you. Take a day and rest. Health is more important than work. Come back well.', end: true },
    { id: 's5b', speaker: 'partner', text: 'إذا ما في شي كبير، اشتغل اليوم. لو احتجت تروح بكير قولي', translation: 'If it\'s nothing big, work today. If you need to leave early, tell me.', end: true },
  ],
  completionMessage: 'You handled a manager request with honesty! تعب نفسي, أحس, and بصراحة all ring true at Phase 7.',
},

{
  id: 'saudi_convo_p7_thank_friend_help',
  phase: 7,
  title: 'Thanking a Friend for Their Help',
  description: 'Genuinely thank a friend who went out of their way to help you.',
  focalWordIds: ['w_happy', 'w_shuʿuur', 'w_qalb', 'w_nafs', 'w_know', 'w_remember'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'شو فيك اليوم؟ تبدو مختلف بطريقة حلوة', translation: 'What\'s with you today? You seem different in a good way.', next: 's2' },
    { id: 's2', speaker: 'user', prompt: 'Tell him his help made a real difference.', options: [
      { text: 'والله، بسببك. مساعدتك أمبارح غيرت كثير. شكرا من قلبي', translation: 'By God, because of you. Your help yesterday changed a lot. Thank you from my heart.', nextStepId: 's3', correct: true, feedback: 'شكرا من قلبي — "thank you from my heart" — deeply Saudi and sincere.' },
      { text: 'لا شي، الأمور بخير', translation: 'Nothing, things are fine.', nextStepId: 's3b', correct: false, feedback: 'Missed the moment to acknowledge his impact on you.' },
    ]},
    { id: 's3', speaker: 'partner', text: 'والله ما سويت شيئًا كبيرًا، بس مبسوط إني قدرت أساعدك', translation: 'By God I didn\'t do anything big, but I\'m happy I could help you.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'الحمد لله. تتذكر إنك كنت تعبان أمبارح؟', translation: 'Praise God. Do you remember you were struggling yesterday?', next: 's4' },
    { id: 's4', speaker: 'user', prompt: 'Explain specifically what his help meant to you emotionally.', options: [
      { text: 'أتذكر إني كنت خايف وما أعرف شو أسوي. لقيتك جنبي وهذا غير كل شي', translation: 'I remember I was afraid and didn\'t know what to do. I found you beside me and that changed everything.', nextStepId: 's5', correct: true, feedback: 'أتذكر + خايف — past emotional recall with present gratitude. Masterful.' },
      { text: 'شكرا، ما ننسى بعض إن شاء الله', translation: 'Thanks, let\'s not forget each other God willing.', nextStepId: 's5', correct: false, feedback: 'Warm but vague — specific gratitude lands deeper.' },
    ]},
    { id: 's5', speaker: 'partner', text: 'يا أخي، أنت صديقي وأنا دايمًا معاك. ما يحتاج شكر بيننا', translation: 'Brother, you\'re my friend and I\'m always with you. No thanks needed between us.', end: true },
  ],
  completionMessage: 'Heartfelt gratitude expressed in authentic Saudi Arabic! قلبي, أتذكر, and خايف — emotional fluency unlocked.',
},
