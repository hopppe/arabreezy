{
  id: 'saudi_convo_p8_compare_riyadh_jeddah',
  phase: 8,
  title: 'Riyadh vs Jeddah',
  description: 'Compare the two biggest Saudi cities with a friend.',
  focalWordIds: ['w_better', 'w_different', 'w_because', 'w_farq', 'w_think', 'w_although'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أنت تفضل الرياض ولا جدة؟', translation: 'Do you prefer Riyadh or Jeddah?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Share your preference:',
      options: [
        { text: 'أفضل جدة لأن الجو أحسن وعندها البحر', translation: 'I prefer Jeddah because the weather is better and it has the sea.', nextStepId: 's3', correct: true, feedback: 'ممتاز! لأن + سبب واضح — هذا بالضبط اللي تحتاجه في المقارنة.' },
        { text: 'الرياض أكبر من جدة', translation: 'Riyadh is bigger than Jeddah.', nextStepId: 's3b', correct: false, feedback: 'صح بس ما عطيت سبب تفضيلك — حاول تقول لأن.' },
        { text: 'ما أدري، كلهم زين', translation: 'I don\'t know, they\'re both good.', nextStepId: 's3b', correct: false, feedback: 'هذا ما يكفي في نقاش المقارنة — خذ موقف وبرره.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'في رأيي الرياض أحسن لأن الفرص الوظيفية أكثر بكثير، مع إن جدة أجمل بصراحة.', translation: 'In my opinion Riyadh is better because job opportunities are much more, although Jeddah is prettier honestly.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'أظن لازم تشوف الفرق الحقيقي — جدة فيها البحر والجو أرطب، بس الرياض فيها فرص أكثر.', translation: 'I think you need to see the real difference — Jeddah has the sea and the air is more humid, but Riyadh has more opportunities.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Respond to the job-opportunity point:',
      options: [
        { text: 'صح، بس بصراحة أنا أحتاج جو أحسن للصحة، مقارنة بـ الرياض جدة أفضل لي', translation: 'True, but honestly I need better weather for my health, compared to Riyadh Jeddah is better for me.', nextStepId: 's5', correct: true, feedback: 'أحسنت! استخدمت مقارنة بـ وبصراحة وأعطيت سبب شخصي.' },
        { text: 'أيوه الرياض أحسن', translation: 'Yeah Riyadh is better.', nextStepId: 's5', correct: false, feedback: 'قليل جداً — أضف لأن أو سبب.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'يعني كل واحد وظروفه — الفرق واضح بين المدينتين بس كلهم فيهم خير.', translation: 'So it depends on your circumstances — the difference between the two cities is clear but both have good in them.', end: true },
  ],
  completionMessage: 'Well done comparing Riyadh and Jeddah with reasons and opinion connectors!',
},

{
  id: 'saudi_convo_p8_advice_career_change',
  phase: 8,
  title: 'Should I Change Careers?',
  description: 'A friend asks your advice about switching careers.',
  focalWordIds: ['w_think', 'w_because', 'w_sabab', 'w_muhimm', 'w_better', 'w_although'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أبغى أغير مجالي الوظيفي بس خايف — وش رأيك؟', translation: 'I want to change my career field but I\'m scared — what do you think?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Give initial advice:',
      options: [
        { text: 'أظن إن الخوف طبيعي، بس السبب اللي عندك وش هو؟', translation: 'I think fear is normal, but what is the reason you have?', nextStepId: 's3', correct: true, feedback: 'زين جداً — طرحت سؤال عن السبب قبل ما تعطي نصيحة.' },
        { text: 'لا تغير، الأمان أهم', translation: 'Don\'t change, security is more important.', nextStepId: 's3b', correct: false, feedback: 'نصيحة بدون فهم الموقف — حاول تسأل عن السبب أولاً.' },
        { text: 'غير بسرعة، ما في وقت', translation: 'Change quickly, there\'s no time.', nextStepId: 's3b', correct: false, feedback: 'متسرع جداً بدون معلومات.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'السبب إن راتبي كويس بس ما أحب شغلي أبداً، وأحس إن عمري يروح.', translation: 'The reason is my salary is good but I don\'t like my job at all, and I feel like my life is passing.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'السبب إن راتبي زين بس ما أحب الشغل، وأحس بضغط كل يوم.', translation: 'The reason is my salary is good but I don\'t like the job, and I feel pressure every day.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Now give your real advice with a reason:',
      options: [
        { text: 'في رأيي غير المجال لأن السعادة في الشغل أهم من الراتب على المدى البعيد', translation: 'In my opinion change fields because happiness in work is more important than salary in the long run.', nextStepId: 's5', correct: true, feedback: 'ممتاز! في رأيي + لأن + مقارنة — نصيحة قوية ومبررة.' },
        { text: 'اصبر شوي وشوف', translation: 'Be patient a bit and see.', nextStepId: 's5', correct: false, feedback: 'مقبول بس ما عطيت سبب واضح — أضف لأن.' },
        { text: 'أنا ما أقدر أقول، قرارك أنت', translation: 'I can\'t say, it\'s your decision.', nextStepId: 's5', correct: false, feedback: 'تهرب من النصيحة — صاحبك يحتاج رأيك.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'والله كلامك صح، مع إن التغيير صعب بس أحسن من إني أبقى تعبان كل يوم. شكراً على النصيحة.', translation: 'By God you\'re right, although change is hard it\'s better than staying miserable every day. Thanks for the advice.', end: true },
  ],
  completionMessage: 'Excellent! You gave well-reasoned career advice in Saudi Arabic.',
},

{
  id: 'saudi_convo_p8_compare_old_new_phones',
  phase: 8,
  title: 'Old Phone vs New Phone',
  description: 'Compare your old and new smartphones with a colleague.',
  focalWordIds: ['w_better', 'w_different', 'w_farq', 'w_because', 'w_same', 'w_think'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'اشتريت جوال جديد؟ وش الفرق عن القديم؟', translation: 'Did you buy a new phone? What\'s the difference from the old one?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Describe the main difference:',
      options: [
        { text: 'الكاميرا أحسن بكثير لأن فيها تقنية أجدد، مقارنة بـ القديم الفرق واضح', translation: 'The camera is much better because it has newer technology, compared to the old one the difference is clear.', nextStepId: 's3', correct: true, feedback: 'ممتاز! أحسن بكثير + لأن + مقارنة بـ — مقارنة مكتملة.' },
        { text: 'الجديد أكبر شوي', translation: 'The new one is slightly bigger.', nextStepId: 's3b', correct: false, feedback: 'صح بس بسيط جداً — أضف سبب أو مقارنة.' },
        { text: 'نفس الشي تقريباً', translation: 'Pretty much the same thing.', nextStepId: 's3b', correct: false, feedback: 'إذا نفس الشي ليش اشتريت؟ حاول توضح الفرق.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'والبطارية؟ لأن هذي أهم شي عندي في الجوال.', translation: 'And the battery? Because this is the most important thing for me in a phone.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'ما يستاهل تغيير إذا ما في فرق كبير، وش رأيك في البطارية؟', translation: 'Not worth changing if there\'s no big difference, what do you think about the battery?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Compare battery life:',
      options: [
        { text: 'البطارية أطول بكثير، بصراحة هذا أهم تحسين لأن القديم كان يخلص بسرعة', translation: 'The battery lasts much longer, honestly this is the most important improvement because the old one used to run out fast.', nextStepId: 's5', correct: true, feedback: 'أحسنت! بصراحة + لأن + مقارنة ضمنية — ممتاز.' },
        { text: 'البطارية نفس الشي', translation: 'The battery is the same.', nextStepId: 's5', correct: false, feedback: 'مقبول بس ما في تقييم — زيد رأيك.' },
        { text: 'ما جربت بعد', translation: 'Haven\'t tried yet.', nextStepId: 's5', correct: false, feedback: 'إجابة ضعيفة في مقارنة — حاول تقدر تقول شي.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'يعني يستاهل التغيير — أظن إني أبحث عن نفس الموديل الأسبوع الجاي.', translation: 'So it\'s worth the change — I think I\'ll look for the same model next week.', end: true },
  ],
  completionMessage: 'Great job comparing phones with clear reasons and comparisons!',
},

{
  id: 'saudi_convo_p8_advice_marriage_timing',
  phase: 8,
  title: 'When Should I Get Married?',
  description: 'A friend asks your opinion on the right time to get married.',
  focalWordIds: ['w_think', 'w_because', 'w_muhimm', 'w_sabab', 'w_although', 'w_believe'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أنا عمري ٢٦ وأهلي يضغطون عليّ للزواج — وش رأيك؟ هل الوقت مناسب؟', translation: 'I\'m 26 and my family is pressuring me about marriage — what do you think? Is the timing right?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Give your opening view:',
      options: [
        { text: 'في رأيي الاستعداد المالي والنفسي أهم من العمر', translation: 'In my opinion financial and emotional readiness is more important than age.', nextStepId: 's3', correct: true, feedback: 'زين جداً — في رأيي + معيار واضح للمقارنة.' },
        { text: 'اتزوج بسرعة، ٢٦ كثير', translation: 'Get married quickly, 26 is too much.', nextStepId: 's3b', correct: false, feedback: 'ما عطيت سبب — لماذا ٢٦ كثير؟' },
        { text: 'لا تتزوج الحين', translation: 'Don\'t get married now.', nextStepId: 's3b', correct: false, feedback: 'نصيحة بدون سبب — أضف لأن.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'كيف أعرف إني مستعد؟ لأني ما عندي راتب ثابت بعد.', translation: 'How do I know I\'m ready? Because I don\'t have a stable salary yet.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'بس أنا ما عندي راتب ثابت — وش أسوي؟', translation: 'But I don\'t have a stable salary — what do I do?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Advise on the stable salary issue:',
      options: [
        { text: 'أظن إن الراتب الثابت ضروري لأن المسؤولية تحتاج أساس مالي، بس مع إن الوضع يختلف من شخص لشخص', translation: 'I think a stable salary is necessary because responsibility needs a financial foundation, although the situation varies person to person.', nextStepId: 's5', correct: true, feedback: 'ممتاز! أظن + لأن + مع إن — تحليل ناضج ومتوازن.' },
        { text: 'الفلوس مو كل شي', translation: 'Money isn\'t everything.', nextStepId: 's5', correct: false, feedback: 'صح جزئياً بس تحتاج تبرر أكثر.' },
        { text: 'اسأل أهلك', translation: 'Ask your family.', nextStepId: 's5', correct: false, feedback: 'تهرب من إعطاء رأي — صاحبك يريد رأيك أنت.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'والله كلام صح — أصدق إن الاستعداد الحقيقي أهم من الضغط الاجتماعي. شكراً، وضحت لي الأمور.', translation: 'By God that\'s true — I believe real readiness is more important than social pressure. Thanks, you clarified things for me.', end: true },
  ],
  completionMessage: 'Excellent advice on marriage timing with balanced reasoning!',
},

{
  id: 'saudi_convo_p8_compare_two_universities',
  phase: 8,
  title: 'Which University is Better?',
  description: 'Help a younger cousin choose between two universities.',
  focalWordIds: ['w_better', 'w_think', 'w_because', 'w_farq', 'w_muhimm', 'w_different'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'قبلوني في جامعة الملك سعود وفي جامعة الملك عبدالعزيز — وش أختار؟', translation: 'I got accepted to King Saud University and King Abdulaziz University — which do I choose?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask the key question first:',
      options: [
        { text: 'أول شي وش تبغى تدرس؟ لأن التخصص يحدد الجامعة الأفضل', translation: 'First thing, what do you want to study? Because the major determines the best university.', nextStepId: 's3', correct: true, feedback: 'ممتاز! سؤال التخصص أهم سؤال — مع تبرير لأن.' },
        { text: 'جامعة الملك سعود أحسن', translation: 'King Saud University is better.', nextStepId: 's3b', correct: false, feedback: 'رأي بدون سبب — لماذا؟' },
        { text: 'كلهم نفس الشي', translation: 'They\'re all the same.', nextStepId: 's3b', correct: false, feedback: 'مو صح — في فرق واضح بين الجامعات.' },
        { text: 'روح الأقرب لبيتك', translation: 'Go to the closer one to your house.', nextStepId: 's3b', correct: false, feedback: 'المسافة مو المعيار الوحيد — في عوامل أهم.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'أبغى أدرس الهندسة — وش الفرق بينهم في هذا التخصص؟', translation: 'I want to study engineering — what\'s the difference between them in this major?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'أبغى أدرس الهندسة — في رأيك وش الأحسن لي؟', translation: 'I want to study engineering — in your opinion which is best for me?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give a comparative answer for engineering:',
      options: [
        { text: 'في رأيي جامعة الملك سعود أحسن للهندسة لأن تصنيفها أعلى ولها شراكات مع شركات كبيرة، مقارنة بـ جامعة الملك عبدالعزيز', translation: 'In my opinion King Saud University is better for engineering because its ranking is higher and it has partnerships with big companies, compared to King Abdulaziz University.', nextStepId: 's5', correct: true, feedback: 'أحسنت! في رأيي + لأن + مقارنة بـ — إجابة شاملة.' },
        { text: 'ما أعرف بالهندسة', translation: 'I don\'t know about engineering.', nextStepId: 's5', correct: false, feedback: 'تهرب — حاول تعطي رأي حتى لو بسيط.' },
        { text: 'الجامعتين كويستين', translation: 'Both universities are good.', nextStepId: 's5', correct: false, feedback: 'ما ساعدته يختار — يحتاج مقارنة واضحة.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'شكراً! هذا يساعدني — أظن إني راح أختار جامعة الملك سعود لأن الفرص الوظيفية بعد التخرج أهم شي.', translation: 'Thanks! This helps me — I think I\'ll choose King Saud University because job opportunities after graduation are the most important thing.', end: true },
  ],
  completionMessage: 'Great job helping compare universities with clear criteria!',
},

{
  id: 'saudi_convo_p8_compare_jobs_offers',
  phase: 8,
  title: 'Two Job Offers',
  description: 'Help a friend decide between two job offers.',
  focalWordIds: ['w_better', 'w_because', 'w_think', 'w_muhimm', 'w_farq', 'w_sabab'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'عندي عرضين وظيفيين — الأول راتبه أعلى بس بعيد، والثاني أقرب بس راتبه أقل. وش أختار؟', translation: 'I have two job offers — the first has a higher salary but it\'s far, the second is closer but the salary is lower. Which do I choose?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'What\'s the most important factor for you?',
      options: [
        { text: 'السؤال المهم: وش أهم لك، الراتب ولا جودة الحياة؟ لأن الإجابة تحدد القرار', translation: 'The important question: what matters more to you, salary or quality of life? Because the answer determines the decision.', nextStepId: 's3', correct: true, feedback: 'ممتاز! سؤال تحليلي مع تبرير — هذا التفكير الصح.' },
        { text: 'الراتب الأعلى دايماً أحسن', translation: 'Higher salary is always better.', nextStepId: 's3b', correct: false, feedback: 'مو دايماً — في عوامل ثانية مهمة.' },
        { text: 'القريب أحسن', translation: 'The closer one is better.', nextStepId: 's3b', correct: false, feedback: 'بدون سبب — لماذا القرب أهم؟' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'عندي عيلة وأبغى أكون قريب منهم، بس الراتب الإضافي مهم للادخار.', translation: 'I have a family and I want to be close to them, but the extra salary is important for saving.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'عيلتي مهمة لي بس الادخار كذلك مهم.', translation: 'My family is important to me but saving is also important.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give a balanced recommendation:',
      options: [
        { text: 'في رأيي خذ الوظيفة القريبة لأن وقتك مع عيلتك لا يرجع، مع إن الفرق في الراتب مؤلم بس صحتك النفسية أهم', translation: 'In my opinion take the closer job because your time with your family doesn\'t come back, although the salary difference is painful but your mental health is more important.', nextStepId: 's5', correct: true, feedback: 'ممتاز! في رأيي + لأن + مع إن — تحليل شامل ومتوازن.' },
        { text: 'خذ الراتب الأعلى وادخر', translation: 'Take the higher salary and save.', nextStepId: 's5', correct: false, feedback: 'نصيحة بدون مراعاة الأولوية التي ذكرها.' },
        { text: 'صعب أقول، أنت تعرف أحسن', translation: 'Hard to say, you know best.', nextStepId: 's5', correct: false, feedback: 'تهرب من الرأي — هو يحتاج مساعدة.' },
        { text: 'جرب الأول وإذا ما ناسب تغير', translation: 'Try the first and if it doesn\'t suit, change.', nextStepId: 's5', correct: false, feedback: 'غير عملي — ما هكذا الوظائف تشتغل.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'بصراحة كلامك صح — العيلة أهم والوقت لا يرجع. بختار الوظيفة القريبة والله يوفق.', translation: 'Honestly you\'re right — family is more important and time doesn\'t come back. I\'ll choose the closer job, may God bless.', end: true },
  ],
  completionMessage: 'Well done giving balanced advice on a tough career decision!',
},

{
  id: 'saudi_convo_p8_compare_neighborhoods',
  phase: 8,
  title: 'Which Neighborhood?',
  description: 'Compare two neighborhoods for a friend looking to rent.',
  focalWordIds: ['w_better', 'w_different', 'w_because', 'w_farq', 'w_think', 'w_qariib'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أبغى أستأجر شقة — في حي النخيل ولا حي الملقا؟ أيهم أحسن؟', translation: 'I want to rent an apartment — in Al-Nakheel or Al-Malqa neighborhood? Which is better?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask what matters most to them:',
      options: [
        { text: 'يعتمد — وش أهم لك؟ الهدوء ولا القرب من الخدمات؟', translation: 'It depends — what matters most to you? Quiet or proximity to services?', nextStepId: 's3', correct: true, feedback: 'زين — سؤال ذكي قبل المقارنة.' },
        { text: 'حي النخيل أحسن بكثير', translation: 'Al-Nakheel is much better.', nextStepId: 's3b', correct: false, feedback: 'رأي بدون معرفة أولوياته — اسأل أولاً.' },
        { text: 'كلهم نفس الشي', translation: 'They\'re all the same.', nextStepId: 's3b', correct: false, feedback: 'مو دقيق — في فرق بين الأحياء.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'عندي أطفال فالأمان والهدوء أهم شي، والمدارس لازم تكون قريبة.', translation: 'I have children so safety and quiet are most important, and schools need to be close.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'عندي أطفال والمدارس مهمة لي.', translation: 'I have children and schools are important to me.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give a recommendation based on their priorities:',
      options: [
        { text: 'أظن حي الملقا أحسن لعيلتك لأنه أهدى وفيه مدارس قريبة، مقارنة بـ النخيل الذي فيه حركة أكثر', translation: 'I think Al-Malqa is better for your family because it\'s quieter and has schools nearby, compared to Al-Nakheel which has more activity.', nextStepId: 's5', correct: true, feedback: 'أحسنت! أظن + لأن + مقارنة بـ — تناسب احتياجاته تماماً.' },
        { text: 'الملقا أجمل', translation: 'Al-Malqa is prettier.', nextStepId: 's5', correct: false, feedback: 'ما ربطت المدارس والأمان بقرارك.' },
        { text: 'شوف الإيجار أرخص', translation: 'See which rent is cheaper.', nextStepId: 's5', correct: false, feedback: 'السعر مو أولويته — قاله وش يريد.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'ممتاز، هذا بالضبط اللي أبحث عنه — الفرق واضح لما تحط المعايير الصح. شكراً.', translation: 'Excellent, this is exactly what I\'m looking for — the difference is clear when you put the right criteria. Thanks.', end: true },
  ],
  completionMessage: 'Great neighborhood comparison using the right criteria!',
},

{
  id: 'saudi_convo_p8_advice_buying_car',
  phase: 8,
  title: 'Buying a Car: New or Used?',
  description: 'Give advice to a friend deciding between a new or used car.',
  focalWordIds: ['w_better', 'w_because', 'w_think', 'w_although', 'w_farq', 'w_sabab'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أبغى أشتري سيارة — جديدة ولا مستعملة؟ وش تنصحني؟', translation: 'I want to buy a car — new or used? What do you advise me?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Start with a key question:',
      options: [
        { text: 'السؤال الأول: وش ميزانيتك؟ لأن هذا يحدد الخيار الأفضل لك', translation: 'First question: what\'s your budget? Because this determines the best option for you.', nextStepId: 's3', correct: true, feedback: 'زين — السؤال عن الميزانية هو الأساس.' },
        { text: 'الجديدة دايماً أحسن', translation: 'New is always better.', nextStepId: 's3b', correct: false, feedback: 'مو دايماً — يعتمد على الميزانية والاحتياج.' },
        { text: 'اشتري مستعملة توفر فلوس', translation: 'Buy used, save money.', nextStepId: 's3b', correct: false, feedback: 'نصيحة بدون معرفة وضعه — اسأل أولاً.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'ميزانيتي حوالي ٨٠ ألف — أقدر آخذ جديدة زهيدة أو مستعملة أحسن.', translation: 'My budget is around 80,000 — I can get a cheap new one or a better used one.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'عندي ٨٠ ألف — وش أفعل؟', translation: 'I have 80,000 — what do I do?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give a reasoned recommendation:',
      options: [
        { text: 'في رأيي خذ المستعملة الأحسن لأن تحصل سيارة أعلى مستوى بنفس السعر، مع إن الضمان أقل بس الجودة أهم', translation: 'In my opinion get the better used car because you get a higher quality car at the same price, although the warranty is less but quality is more important.', nextStepId: 's5', correct: true, feedback: 'ممتاز! في رأيي + لأن + مع إن — تحليل موازن.' },
        { text: 'الجديدة أحسن لأن فيها ضمان', translation: 'New is better because it has warranty.', nextStepId: 's5', correct: false, feedback: 'نقطة وحيدة فقط — ما وازنت بين الخيارين.' },
        { text: 'كلهم نفس الشي في النهاية', translation: 'They\'re all the same in the end.', nextStepId: 's5', correct: false, feedback: 'مو صح — في فرق واضح في القيمة مقابل السعر.' },
        { text: 'اتدين وخذ أحسن سيارة', translation: 'Borrow money and get the best car.', nextStepId: 's5', correct: false, feedback: 'نصيحة سيئة — لم يذكر أنه يريد يتدين.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'والله تحليل ممتاز — ما فكرت بالموضوع من هالجهة. أظن إنك صح والمستعملة الجيدة أحسن خيار لي.', translation: 'By God excellent analysis — I hadn\'t thought about it from that angle. I think you\'re right and a good used car is the best choice for me.', end: true },
  ],
  completionMessage: 'Excellent car-buying advice with well-balanced reasoning!',
},

{
  id: 'saudi_convo_p8_compare_restaurants',
  phase: 8,
  title: 'Which Restaurant?',
  description: 'Recommend a restaurant by comparing two options.',
  focalWordIds: ['w_better', 'w_because', 'w_think', 'w_same', 'w_farq', 'w_although'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أبغى آخذ العيلة على عشاء — مطعم البيك ولا مطعم الروشن؟', translation: 'I want to take the family to dinner — Al-Baik or Al-Raushan restaurant?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Share your preference with a reason:',
      options: [
        { text: 'أفضل الروشن لأن الجو عيلي أكثر والأكل أنواع، مقارنة بـ البيك الذي يناسب أكثر للأكل السريع', translation: 'I prefer Al-Raushan because the atmosphere is more family-oriented and there are more food varieties, compared to Al-Baik which suits fast food more.', nextStepId: 's3', correct: true, feedback: 'ممتاز! أفضل + لأن + مقارنة بـ — مقارنة كاملة ومنطقية.' },
        { text: 'البيك أشهر', translation: 'Al-Baik is more famous.', nextStepId: 's3b', correct: false, feedback: 'الشهرة مو سبب كافٍ — وضح لماذا يناسب العيلة.' },
        { text: 'كلهم نفس الشي', translation: 'They\'re all the same.', nextStepId: 's3b', correct: false, feedback: 'مو صح — في فرق واضح في النوع والجو.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'وش رأيك في الأسعار؟ لأن عندي أطفال وأبغى ما يكون غالي جداً.', translation: 'What do you think about prices? Because I have children and I don\'t want it to be too expensive.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'الأسعار وش الحال عند الروشن؟', translation: 'How are the prices at Al-Raushan?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Address the price concern:',
      options: [
        { text: 'بصراحة الروشن أغلى شوي من البيك، بس الجو والتنوع يستاهل لأن عشاء العيلة مناسبة خاصة', translation: 'Honestly Al-Raushan is a bit more expensive than Al-Baik, but the atmosphere and variety are worth it because a family dinner is a special occasion.', nextStepId: 's5', correct: true, feedback: 'زين جداً! بصراحة + بس + لأن — رأي صريح ومبرر.' },
        { text: 'البيك أرخص فاذهب هناك', translation: 'Al-Baik is cheaper so go there.', nextStepId: 's5', correct: false, feedback: 'تناقض مع توصيتك الأولى — وضح الأولوية.' },
        { text: 'ما أعرف الأسعار', translation: 'I don\'t know the prices.', nextStepId: 's5', correct: false, feedback: 'تهرب من إعطاء رأي.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تمام، الجو العيلي أهم من الفرق في السعر — راح نروح الروشن وشكراً على النصيحة.', translation: 'Okay, the family atmosphere is more important than the price difference — we\'ll go to Al-Raushan and thanks for the advice.', end: true },
  ],
  completionMessage: 'Great restaurant recommendation with price and atmosphere reasoning!',
},

{
  id: 'saudi_convo_p8_advice_saving_money',
  phase: 8,
  title: 'How Do I Start Saving?',
  description: 'Give a friend practical advice on how to start saving money.',
  focalWordIds: ['w_think', 'w_because', 'w_muhimm', 'w_sabab', 'w_better', 'w_believe'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أبغى أبدأ أوفر بس ما أعرف من وين أبدأ — وش تنصحني؟', translation: 'I want to start saving but I don\'t know where to start — what do you advise me?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Give the first piece of advice:',
      options: [
        { text: 'أول خطوة وفر ١٠٪ من راتبك أول ما يجي لأن لو انتظرت ما يتبقى شي في الآخر', translation: 'First step, save 10% of your salary as soon as it arrives because if you wait nothing will be left at the end.', nextStepId: 's3', correct: true, feedback: 'ممتاز! نصيحة عملية مع لأن — منطق واضح.' },
        { text: 'اصرف بس ما تبالغ', translation: 'Spend but don\'t exaggerate.', nextStepId: 's3b', correct: false, feedback: 'غير محدد — وش معناه لا تبالغ؟' },
        { text: 'الادخار صعب، ما قدرت أوفر أنا كذلك', translation: 'Saving is hard, I couldn\'t save either.', nextStepId: 's3b', correct: false, feedback: 'مو نصيحة مفيدة — يحتاج حل لا مشاركة في المشكلة.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'بس مصاريفي الضرورية تاخذ كل الراتب تقريباً — وش أسوي؟', translation: 'But my essential expenses take almost all my salary — what do I do?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'مصاريفي كثيرة — وش أعمل؟', translation: 'My expenses are a lot — what do I do?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Address the expenses problem:',
      options: [
        { text: 'في رأيي لازم تكتب مصاريفك وتشوف وين تقدر تقطع لأن دايماً في مصاريف غير ضرورية ما نلاحظها', translation: 'In my opinion you must write down your expenses and see where you can cut because there are always unnecessary expenses we don\'t notice.', nextStepId: 's5', correct: true, feedback: 'أحسنت! في رأيي + لأن + معلومة نافعة — نصيحة مقنعة.' },
        { text: 'دور على شغل ثاني', translation: 'Look for a second job.', nextStepId: 's5', correct: false, feedback: 'حل ممكن بس ما عالجت المصاريف الحالية.' },
        { text: 'ما في حل إذا الراتب قليل', translation: 'There\'s no solution if the salary is low.', nextStepId: 's5', correct: false, feedback: 'متشائم جداً — في حلول ما استكشفتها.' },
        { text: 'قلل الأكل بالبرا', translation: 'Reduce eating out.', nextStepId: 's5', correct: false, feedback: 'نصيحة وحيدة بدون تحليل كامل.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'والله ما فكرت أكتب المصاريف — أصدق إن هذي الخطوة البسيطة تفرق كثير. أجرب هالأسبوع.', translation: 'By God I never thought about writing expenses — I believe this simple step makes a big difference. I\'ll try it this week.', end: true },
  ],
  completionMessage: 'Practical saving advice delivered with clear reasoning — well done!',
},

{
  id: 'saudi_convo_p8_compare_travel_destinations',
  phase: 8,
  title: 'Where Should I Travel?',
  description: 'Compare two travel destinations to help a friend decide.',
  focalWordIds: ['w_better', 'w_because', 'w_think', 'w_different', 'w_farq', 'w_although'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'عندي إجازة — أروح تايلاند ولا تركيا؟ وش رأيك؟', translation: 'I have vacation — do I go to Thailand or Turkey? What do you think?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask about priorities first:',
      options: [
        { text: 'يعتمد على اهتمامك — تبغى طبيعة وشواطئ ولا تاريخ وثقافة؟', translation: 'It depends on your interest — do you want nature and beaches or history and culture?', nextStepId: 's3', correct: true, feedback: 'ممتاز — سؤال ذكي قبل التوصية.' },
        { text: 'تركيا أحسن بكثير', translation: 'Turkey is much better.', nextStepId: 's3b', correct: false, feedback: 'رأي بدون معرفة أولوياته — اسأل أولاً.' },
        { text: 'تايلاند أرخص', translation: 'Thailand is cheaper.', nextStepId: 's3b', correct: false, feedback: 'السعر وحده مو الأساس.' },
        { text: 'كلهم مناطق جميلة', translation: 'They\'re all beautiful areas.', nextStepId: 's3b', correct: false, feedback: 'ما ساعدته — يحتاج مقارنة واضحة.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'أنا وعيلتي نحب التاريخ والثقافة، وأبغى شي مريح مو متعب.', translation: 'My family and I love history and culture, and I want something relaxing not tiring.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'نحب التاريخ والراحة.', translation: 'We like history and relaxation.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give a recommendation matching their priorities:',
      options: [
        { text: 'في رأيي تركيا أحسن لكم لأن فيها تاريخ غني وأماكن مريحة، مقارنة بـ تايلاند التي تناسب أكثر الشباب والمغامرة', translation: 'In my opinion Turkey is better for you because it has rich history and comfortable places, compared to Thailand which suits young people and adventure more.', nextStepId: 's5', correct: true, feedback: 'أحسنت! في رأيي + لأن + مقارنة بـ — توصية مخصصة لاحتياجاتهم.' },
        { text: 'تايلاند أجمل', translation: 'Thailand is prettier.', nextStepId: 's5', correct: false, feedback: 'ما راعيت احتياجاتهم — قالوا تاريخ لا جمال.' },
        { text: 'روحوا البلدين', translation: 'Go to both countries.', nextStepId: 's5', correct: false, feedback: 'غير عملي لإجازة واحدة.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'بصراحة تحليل ممتاز — ما فكرت إن تايلاند للمغامرة أكثر. تركيا قرارنا، شكراً.', translation: 'Honestly excellent analysis — I hadn\'t thought that Thailand is more for adventure. Turkey is our decision, thanks.', end: true },
  ],
  completionMessage: 'Excellent travel recommendation tailored to their specific needs!',
},

{
  id: 'saudi_convo_p8_advice_parenting',
  phase: 8,
  title: 'Parenting Advice',
  description: 'Give advice to a friend struggling with a teenager\'s behavior.',
  focalWordIds: ['w_think', 'w_because', 'w_sabab', 'w_muhimm', 'w_although', 'w_believe'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'ولدي عمره ١٥ وما يسمع كلامي أبداً — كل شي يعارضني. وش أسوي؟', translation: 'My son is 15 and doesn\'t listen to me at all — he opposes everything. What do I do?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Give an opening perspective:',
      options: [
        { text: 'هذا طبيعي جداً في سن المراهقة لأن الولد يبحث عن هويته — المشكلة مو أنت ولا هو', translation: 'This is very normal in teenage years because a boy is searching for his identity — the problem isn\'t you or him.', nextStepId: 's3', correct: true, feedback: 'ممتاز — طمأنته أولاً ثم أعطيت سبباً علمياً.' },
        { id: 's2o2', text: 'أنت الأب لازم تكون صارم أكثر', translation: 'You\'re the father, you need to be stricter.', nextStepId: 's3b', correct: false, feedback: 'الصرامة وحدها مو الحل مع المراهقين — في بحوث تقول عكس.' },
        { text: 'المراهقة صعبة، اصبر بس', translation: 'Teenagers are hard, just be patient.', nextStepId: 's3b', correct: false, feedback: 'صبر بدون إستراتيجية — ما يكفي.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'بس كيف أتعامل معه؟ لأني إذا تركته يسوي اللي يبغى خايف يضيع.', translation: 'But how do I deal with him? Because if I leave him to do what he wants I\'m afraid he\'ll go astray.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'خايف إذا ما ضبطته يضيع — كيف أتعامل؟', translation: 'I\'m afraid if I don\'t control him he\'ll go astray — how do I deal with him?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give practical parenting advice:',
      options: [
        { text: 'في رأيي الحوار أهم من الأوامر لأن المراهق يحتاج يحس إن رأيه مهم، مع إن الحدود ضرورية بس بطريقة محترمة', translation: 'In my opinion dialogue is more important than orders because a teenager needs to feel his opinion matters, although limits are necessary but in a respectful way.', nextStepId: 's5', correct: true, feedback: 'أحسنت! في رأيي + لأن + مع إن — توازن بين الحرية والحدود.' },
        { text: 'خذ جواله وهكذا يسمع', translation: 'Take his phone and then he\'ll listen.', nextStepId: 's5', correct: false, feedback: 'هذا يزيد التوتر في الغالب — ما في تبرير.' },
        { text: 'أنا ما عندي أطفال ما أقدر أساعد', translation: 'I don\'t have children, I can\'t help.', nextStepId: 's5', correct: false, feedback: 'تهرب من النصيحة — رأيك كإنسان يفيد.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'والله كلام عميق — أصدق إن الحوار أفضل من المواجهة. راح أجرب أتكلم معه بدون ضغط.', translation: 'By God that\'s deep — I believe dialogue is better than confrontation. I\'ll try talking to him without pressure.', end: true },
  ],
  completionMessage: 'Thoughtful parenting advice with balanced reasoning — excellent!',
},

{
  id: 'saudi_convo_p8_compare_clothing_styles',
  phase: 8,
  title: 'Traditional vs Modern Clothes',
  description: 'Compare traditional and modern clothing styles with a friend.',
  focalWordIds: ['w_different', 'w_because', 'w_think', 'w_same', 'w_although', 'w_farq'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أنت تفضل الثوب ولا الملابس الكاجوال في يومياتك؟', translation: 'Do you prefer the thobe or casual clothes in your daily life?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Share your preference with a reason:',
      options: [
        { text: 'أفضل الثوب في المواقف الرسمية لأنه يعطي احترام، بس الكاجوال أريح للحركة', translation: 'I prefer the thobe in formal situations because it gives respect, but casual is more comfortable for movement.', nextStepId: 's3', correct: true, feedback: 'ممتاز! تفرق بين السياقات مع سبب لكل خيار.' },
        { text: 'الثوب أحسن دايماً', translation: 'The thobe is always better.', nextStepId: 's3b', correct: false, feedback: 'مطلق جداً — في سياقات مختلفة.' },
        { text: 'الكاجوال أحسن دايماً', translation: 'Casual is always better.', nextStepId: 's3b', correct: false, feedback: 'نفس المشكلة — مطلق بدون مراعاة السياق.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'وش رأيك في الجيل الجديد الذي ما يلبس الثوب كثير؟', translation: 'What do you think about the new generation that doesn\'t wear the thobe much?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'الجيل الجديد ما يلبس الثوب — وش رأيك؟', translation: 'The new generation doesn\'t wear the thobe — what do you think?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give a nuanced opinion on generational change:',
      options: [
        { text: 'أظن إن الموضة تتغير وهذا طبيعي، مع إن الثوب هوية ثقافية مهمة لأنه يمثل الانتماء لجذورنا', translation: 'I think fashion changes and this is natural, although the thobe is an important cultural identity because it represents belonging to our roots.', nextStepId: 's5', correct: true, feedback: 'أحسنت! أظن + مع إن + لأن — تحليل ثقافي ناضج.' },
        { text: 'الشباب يفعلون اللي يبغون', translation: 'Young people do what they want.', nextStepId: 's5', correct: false, feedback: 'رأي محايد جداً — حاول تعطي موقف.' },
        { text: 'الغرب يأثر على ثقافتنا بشكل سلبي', translation: 'The West negatively influences our culture.', nextStepId: 's5', correct: false, feedback: 'تعميم بدون تبرير — حاول تكون أكثر دقة.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'في رأيي كذلك — الفرق بين الأجيال طبيعي بس الهوية مهمة. ممكن الشخص يجمع بينهم.', translation: 'In my opinion too — the difference between generations is natural but identity is important. A person can combine both.', end: true },
  ],
  completionMessage: 'Nuanced cultural comparison with thoughtful reasoning — well done!',
},

{
  id: 'saudi_convo_p8_advice_business_idea',
  phase: 8,
  title: 'Is My Business Idea Good?',
  description: 'Evaluate a friend\'s business idea and give honest advice.',
  focalWordIds: ['w_think', 'w_because', 'w_sabab', 'w_muhimm', 'w_doubt', 'w_believe'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'عندي فكرة أفتح كافيه في الحي — وش رأيك؟ تفكر ينجح؟', translation: 'I have an idea to open a cafe in the neighborhood — what do you think? Do you think it will succeed?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask the right opening question:',
      options: [
        { text: 'فكرة ممكنة، بس السؤال الأهم: درست المنافسة في المنطقة؟ لأن هذا أول شي لازم تعرفه', translation: 'Possible idea, but the most important question: have you studied the competition in the area? Because this is the first thing you need to know.', nextStepId: 's3', correct: true, feedback: 'ممتاز — سؤال تحليلي حقيقي مع تبرير.' },
        { text: 'فكرة ممتازة، افتح بسرعة', translation: 'Excellent idea, open quickly.', nextStepId: 's3b', correct: false, feedback: 'متحمس بدون تقييم — صاحبك يحتاج رأي حقيقي.' },
        { text: 'الكافيهات كثيرة، ما راح ينجح', translation: 'There are many cafes, it won\'t succeed.', nextStepId: 's3b', correct: false, feedback: 'متشائم بدون تحليل — ما نظرت للفرص.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'ما درست المنافسة بعد، بس أحس إن فيه طلب في المنطقة.', translation: 'I haven\'t studied the competition yet, but I feel there is demand in the area.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'ما درست السوق بعد.', translation: 'I haven\'t studied the market yet.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give honest, reasoned advice on next steps:',
      options: [
        { text: 'بصراحة الإحساس مو كافٍ — أنصحك تدرس السوق أولاً لأن أكثر الكافيهات الجديدة تفشل في السنة الأولى بسبب ضعف الدراسة', translation: 'Honestly feeling is not enough — I advise you to study the market first because most new cafes fail in the first year due to poor research.', nextStepId: 's5', correct: true, feedback: 'أحسنت! بصراحة + لأن + إحصاء واقعي — نصيحة صريحة ومبررة.' },
        { text: 'ربما ينجح ربما لا', translation: 'Maybe it succeeds maybe not.', nextStepId: 's5', correct: false, feedback: 'غير مفيد — صاحبك يحتاج رأي واضح.' },
        { text: 'إذا عندك مال اجرب', translation: 'If you have money try it.', nextStepId: 's5', correct: false, feedback: 'نصيحة متهورة — الفلوس وحدها لا تكفي.' },
        { text: 'افتح شي ثاني أحسن', translation: 'Open something else, it\'s better.', nextStepId: 's5', correct: false, feedback: 'ما قلت لماذا — تحتاج تبرر.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'والله كلام صح — أشك إن كثير الناس تفشل لأنهم ما يدرسون. راح أبدأ بدراسة السوق أولاً.', translation: 'By God that\'s true — I doubt many people fail because they don\'t study. I\'ll start by studying the market first.', end: true },
  ],
  completionMessage: 'Honest business advice with real market reasoning — excellent!',
},

{
  id: 'saudi_convo_p8_compare_dialects',
  phase: 8,
  title: 'Saudi vs Levantine Arabic',
  description: 'Compare Saudi and Levantine Arabic dialects with a curious friend.',
  focalWordIds: ['w_different', 'w_farq', 'w_because', 'w_think', 'w_same', 'w_ikhtalafa'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'وش الفرق بين اللهجة السعودية والشامية؟ كلهم عربي فوش المشكلة؟', translation: 'What\'s the difference between Saudi and Levantine dialect? They\'re all Arabic so what\'s the issue?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Explain the key differences:',
      options: [
        { text: 'الفرق كبير — الكلمات والنطق مختلفة كثير، لدرجة إن سعودي وشامي أحياناً ما يفهمون بعض بسرعة', translation: 'The difference is big — words and pronunciation are very different, to the extent that a Saudi and a Levantine sometimes don\'t understand each other quickly.', nextStepId: 's3', correct: true, feedback: 'ممتاز — أعطيت مثالاً ملموساً على الفرق.' },
        { text: 'كلهم نفس الشي تقريباً', translation: 'They\'re all pretty much the same.', nextStepId: 's3b', correct: false, feedback: 'مو دقيق — الفرق أكبر من كذا.' },
        { text: 'ما أعرف عن اللهجات', translation: 'I don\'t know about dialects.', nextStepId: 's3b', correct: false, feedback: 'تهرب — حاول تقول شي حتى لو بسيط.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'يعني وش الأفضل للتعلم إذا أبغى أفهم أكثر عربي؟', translation: 'So which is best to learn if I want to understand more Arabs?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'أيهم أنفع للتعلم؟', translation: 'Which is more useful to learn?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give a reasoned recommendation:',
      options: [
        { text: 'في رأيي الشامية أوسع انتشاراً في الإعلام لأن المسلسلات الشامية تُشاه في كل العالم العربي، مع إن السعودية أهم اقتصادياً', translation: 'In my opinion Levantine is more widespread in media because Levantine series are watched across the Arab world, although Saudi is more important economically.', nextStepId: 's5', correct: true, feedback: 'أحسنت! في رأيي + لأن + مع إن — مقارنة متوازنة.' },
        { text: 'اتعلم الفصحى بس', translation: 'Just learn Modern Standard Arabic.', nextStepId: 's5', correct: false, feedback: 'ما أجبت على سؤاله عن اللهجات تحديداً.' },
        { text: 'السعودية أحسن طبعاً', translation: 'Saudi is better of course.', nextStepId: 's5', correct: false, feedback: 'تحيز بدون تبرير موضوعي.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'فكرة جيدة — أظن إني أبدأ بالشامية لأن المسلسلات ساعدتني أكثر في الفهم. شكراً.', translation: 'Good idea — I think I\'ll start with Levantine because series have helped me understand more. Thanks.', end: true },
  ],
  completionMessage: 'Great dialect comparison with media and economic reasoning!',
},

{
  id: 'saudi_convo_p8_advice_friend_argument',
  phase: 8,
  title: 'I Argued with My Friend',
  description: 'Advise a friend on resolving a disagreement.',
  focalWordIds: ['w_think', 'w_because', 'w_sabab', 'w_although', 'w_ghafara', 'w_believe'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'اتخانقت مع صاحبي الحين وهو زعلان مني — وش تنصحني أسوي؟', translation: 'I just argued with my friend and he\'s upset with me — what do you advise me to do?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask who was wrong first:',
      options: [
        { text: 'أول شي — أنت كنت غلطان ولا هو؟ لأن الحل يختلف حسب السبب', translation: 'First thing — were you both wrong or was it him? Because the solution differs depending on the reason.', nextStepId: 's3', correct: true, feedback: 'زين جداً — سؤال عادل ومهم للتحليل.' },
        { text: 'كلم صاحبك بسرعة واعتذر', translation: 'Contact your friend quickly and apologize.', nextStepId: 's3b', correct: false, feedback: 'قد يكون صح بس بدون معرفة من المخطئ — عجلت.' },
        { text: 'اتركه يهدى وحده', translation: 'Leave him to calm down alone.', nextStepId: 's3b', correct: false, feedback: 'مقبول أحياناً بس ما دائماً الحل.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'بصراحة أنا اللي غلطت بس ما أعرف كيف أعتذر بطريقة صحيحة.', translation: 'Honestly I was the one who was wrong but I don\'t know how to apologize properly.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'أنا غلطت — كيف أعتذر؟', translation: 'I was wrong — how do I apologize?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Advise on how to apologize properly:',
      options: [
        { text: 'في رأيي الاعتذار الحقيقي يكون وجهاً لوجه لأن الرسالة ما توصل نفس الإحساس، وقل له بصراحة وش أخطأت فيه بالضبط', translation: 'In my opinion a real apology should be face to face because a message doesn\'t convey the same feeling, and tell him honestly what exactly you were wrong about.', nextStepId: 's5', correct: true, feedback: 'أحسنت! في رأيي + لأن + تفصيل عملي — نصيحة قوية.' },
        { text: 'ارسله رسالة قصيرة', translation: 'Send him a short message.', nextStepId: 's5', correct: false, feedback: 'أسهل بس ما دائماً فعّال — ما بررت.' },
        { text: 'الوقت يحل كل شي', translation: 'Time fixes everything.', nextStepId: 's5', correct: false, feedback: 'تهرب من الحل النشط — الوقت وحده مو كافٍ.' },
        { text: 'هو اللي لازم يكلمك', translation: 'He\'s the one who should contact you.', nextStepId: 's5', correct: false, feedback: 'قلت أنت اللي غلطت — تناقض مع ما سبق.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'صح — الاعتذار وجهاً لوجه أصعب بس أقوى. أصدق إنه سيعفو لأن صداقتنا قديمة.', translation: 'True — a face to face apology is harder but stronger. I believe he\'ll forgive because our friendship is old.', end: true },
  ],
  completionMessage: 'Thoughtful advice on genuine apology with good reasoning!',
},

{
  id: 'saudi_convo_p8_compare_old_new_riyadh',
  phase: 8,
  title: 'Old Riyadh vs New Riyadh',
  description: 'Compare the old and new parts of Riyadh with someone who just moved there.',
  focalWordIds: ['w_different', 'w_farq', 'w_because', 'w_think', 'w_although', 'w_society'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أول مرة أزور الرياض — الفرق بين القديم والجديد كبير؟', translation: 'First time visiting Riyadh — is the difference between the old and new parts big?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Describe the contrast:',
      options: [
        { text: 'الفرق كبير جداً — الرياض الجديدة فيها ناطحات سحاب ومراكز تجارية، مقارنة بـ القديمة اللي تحافظ على الطابع الأصيل والأسواق الشعبية', translation: 'The difference is very big — new Riyadh has skyscrapers and malls, compared to the old part which preserves the authentic character and traditional markets.', nextStepId: 's3', correct: true, feedback: 'ممتاز! الفرق + مقارنة بـ + تفاصيل واضحة.' },
        { text: 'كلهم رياض', translation: 'It\'s all Riyadh.', nextStepId: 's3b', correct: false, feedback: 'ما وصفت الفرق الحقيقي.' },
        { text: 'الجديدة أحسن طبعاً', translation: 'The new part is better of course.', nextStepId: 's3b', correct: false, feedback: 'رأي بدون وصف أو سبب.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'وش تنصحني أزور أكثر إذا أبغى أفهم الثقافة السعودية الحقيقية؟', translation: 'What do you advise me to visit more if I want to understand real Saudi culture?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'وين أروح أفهم الثقافة السعودية؟', translation: 'Where do I go to understand Saudi culture?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give a culturally-reasoned recommendation:',
      options: [
        { text: 'في رأيي ابدأ بالدرعية والحي التاريخي لأنهم يعطونك صورة عن المجتمع السعودي الأصيل، مع إن المراكز التجارية الحديثة تفهمك الرياض اليوم كذلك', translation: 'In my opinion start with Diriyah and the historic district because they give you a picture of authentic Saudi society, although modern malls also show you today\'s Riyadh.', nextStepId: 's5', correct: true, feedback: 'أحسنت! في رأيي + لأن + مع إن — تنصح بالتوازن بين القديم والجديد.' },
        { text: 'روح المول', translation: 'Go to the mall.', nextStepId: 's5', correct: false, feedback: 'ما يعطيك الثقافة الأصيلة وحده.' },
        { text: 'اسأل سعوديين محليين', translation: 'Ask local Saudis.', nextStepId: 's5', correct: false, feedback: 'فكرة جيدة بس ما أجبت على سؤاله بشكل مباشر.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'فكرة ممتازة — أظن إن البداية بالتاريخ تعطيني أساس أفهم فيه الحاضر. شكراً.', translation: 'Excellent idea — I think starting with history gives me a foundation to understand the present. Thanks.', end: true },
  ],
  completionMessage: 'Great Riyadh comparison with cultural depth and clear reasoning!',
},

{
  id: 'saudi_convo_p8_advice_dieting',
  phase: 8,
  title: 'Should I Start a Diet?',
  description: 'Give honest advice to a friend wanting to start a diet.',
  focalWordIds: ['w_think', 'w_because', 'w_better', 'w_although', 'w_sabab', 'w_muhimm'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'قررت أبدأ رجيم صارم من بكرة — أكل خس وماء بس. وش رأيك؟', translation: 'I decided to start a strict diet from tomorrow — only lettuce and water. What do you think?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Give your honest reaction:',
      options: [
        { text: 'بصراحة هذا الرجيم خطر لأن جسمك يحتاج بروتين وكربوهيدرات، الرجيم القاسي في الغالب يفشل', translation: 'Honestly this diet is dangerous because your body needs protein and carbohydrates, harsh diets usually fail.', nextStepId: 's3', correct: true, feedback: 'ممتاز! بصراحة + لأن + معلومة علمية — صريح ومبرر.' },
        { text: 'ممتاز، هذا يساعد تنزل وزن بسرعة', translation: 'Excellent, this helps you lose weight quickly.', nextStepId: 's3b', correct: false, feedback: 'مشجع على شي ضار — غير صح.' },
        { text: 'أنت تعرف جسمك أحسن مني', translation: 'You know your body better than me.', nextStepId: 's3b', correct: false, feedback: 'تهرب من الرأي — هو يحتاج نصيحة صريحة.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'بس أبغى أنزل وزن بسرعة — عندي مناسبة بعد شهر.', translation: 'But I want to lose weight quickly — I have an occasion in a month.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'أبغى أنزل وزن قبل المناسبة.', translation: 'I want to lose weight before the occasion.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give a better alternative with reasoning:',
      options: [
        { text: 'في رأيي رجيم معتدل مع رياضة أحسن بكثير لأنك تنزل وزن حقيقي وما ترجعه، مقارنة بـ الرجيم القاسي الذي تاخذ الكيلوات ترجع بعده', translation: 'In my opinion a moderate diet with exercise is much better because you lose real weight and don\'t regain it, compared to harsh dieting where the kilos come back afterwards.', nextStepId: 's5', correct: true, feedback: 'أحسنت! في رأيي + لأن + مقارنة بـ — بديل واضح وعلمي.' },
        { text: 'الرجيم القاسي يشتغل بعض الناس', translation: 'Harsh diets work for some people.', nextStepId: 's5', correct: false, feedback: 'محايد جداً — ما قدمت بديلاً واضحاً.' },
        { text: 'شهر كافٍ لأي رجيم', translation: 'A month is enough for any diet.', nextStepId: 's5', correct: false, feedback: 'مو دقيق — يعتمد على نوع الرجيم.' },
        { text: 'ما تهتم بالوزن', translation: 'Don\'t worry about weight.', nextStepId: 's5', correct: false, feedback: 'تجاهل قلقه — ما قدمت حلاً.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'والله ما فكرت إن الرجيم القاسي يرجع الوزن — أظن الرياضة مع الأكل الصحي أحسن طريقة. شكراً.', translation: 'By God I never thought harsh dieting brings weight back — I think exercise with healthy eating is the best way. Thanks.', end: true },
  ],
  completionMessage: 'Excellent diet advice backed by clear reasoning and a healthy alternative!',
},

{
  id: 'saudi_convo_p8_compare_traditional_modern',
  phase: 8,
  title: 'Traditional vs Modern Weddings',
  description: 'Compare traditional and modern Saudi wedding styles.',
  focalWordIds: ['w_different', 'w_farq', 'w_because', 'w_think', 'w_although', 'w_society'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أنت تفضل الأفراح التقليدية ولا الحديثة؟', translation: 'Do you prefer traditional or modern weddings?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Share your preference with a reason:',
      options: [
        { text: 'أفضل التقليدية لأنها تحافظ على الهوية وتجمع الأهل، مع إن التكلفة تكون أعلى أحياناً', translation: 'I prefer traditional because they preserve identity and bring family together, although the cost can be higher sometimes.', nextStepId: 's3', correct: true, feedback: 'ممتاز! أفضل + لأن + مع إن — رأي متوازن ومبرر.' },
        { text: 'الحديثة أحسن لأنها أرخص', translation: 'Modern is better because it\'s cheaper.', nextStepId: 's3b', correct: false, false: false, feedback: 'ليس دائماً — وما ذكرت الجوانب الثقافية.' },
        { text: 'ما أهتم بالأفراح', translation: 'I don\'t care about weddings.', nextStepId: 's3b', correct: false, feedback: 'تهرب — حاول تقول رأيك ولو بسيط.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'بس الأفراح التقليدية فيها تعب كثير للعروسين — وش رأيك في هذا؟', translation: 'But traditional weddings are very tiring for the bride and groom — what do you think about this?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'التقليدية ما تعبت من الترتيبات؟', translation: 'Didn\'t the traditional arrangements tire you out?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Balance both perspectives:',
      options: [
        { text: 'صح، الفرق في التعب واضح بس أظن إن اليوم الواحد تعب يستاهل لأن الذكريات تبقى للأبد، مقارنة بـ الحديثة التي تكون أسرع بس أقل عمقاً', translation: 'True, the difference in effort is clear but I think one day of effort is worth it because memories last forever, compared to modern which is faster but less deep.', nextStepId: 's5', correct: true, feedback: 'أحسنت! أظن + لأن + مقارنة بـ — تحليل متوازن يراعي وجهة نظره.' },
        { text: 'التعب طبيعي، تحملوا', translation: 'Effort is normal, endure it.', nextStepId: 's5', correct: false, feedback: 'ما تعاملت مع الحجة بجدية.' },
        { text: 'يمكنون يجمعون التقليدي والحديث', translation: 'They can combine traditional and modern.', nextStepId: 's5', correct: false, feedback: 'فكرة جيدة بس ما أجبت مباشرة على سؤال التعب.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'صح الذكريات أهم — أظن إن المجتمع يتغير وكل جيل يختار ما يناسبه.', translation: 'True memories are more important — I think society changes and each generation chooses what suits them.', end: true },
  ],
  completionMessage: 'Great wedding comparison balancing tradition and practicality!',
},

{
  id: 'saudi_convo_p8_advice_apologizing',
  phase: 8,
  title: 'How to Apologize Properly',
  description: 'Explain how to give a genuine apology to someone who hurt a colleague.',
  focalWordIds: ['w_think', 'w_because', 'w_sabab', 'w_ghafara', 'w_maghfira', 'w_believe'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تصرفت بطريقة غلط مع زميلي وأبغى أعتذر — بس خايف يزيد الموضوع.', translation: 'I acted wrongly with my colleague and I want to apologize — but I\'m afraid it\'ll escalate things.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Address the fear first:',
      options: [
        { text: 'الخوف طبيعي، بس في رأيي الاعتذار يخفف التوتر في الغالب لأنه يظهر إنك واعي بغلطتك', translation: 'Fear is normal, but in my opinion an apology usually reduces tension because it shows you are aware of your mistake.', nextStepId: 's3', correct: true, feedback: 'ممتاز — طمأنته أولاً ثم أعطيت سبباً.' },
        { text: 'ما تعتذر، اتركه هو يعتذر', translation: 'Don\'t apologize, let him be the one to apologize.', nextStepId: 's3b', correct: false, feedback: 'قلت إنه غلط — هذه نصيحة سيئة.' },
        { text: 'التوتر في الشغل طبيعي، تجاهله', translation: 'Tension at work is normal, ignore it.', nextStepId: 's3b', correct: false, feedback: 'تجاهل المشكلة لا يحلها.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'كيف أصوغ الاعتذار بشكل صح؟ ما أبغى يبدو شكلي.', translation: 'How do I frame the apology properly? I don\'t want it to seem superficial.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'كيف أعتذر بشكل مقنع؟', translation: 'How do I apologize convincingly?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give concrete advice on framing a genuine apology:',
      options: [
        { text: 'أهم شي تذكر الغلطة بالضبط لأن الاعتذار العام ما يقنع أحد — قل له بالضبط وش اللي أخطأت فيه وليش كان غلط', translation: 'Most important is to name the exact mistake because a general apology doesn\'t convince anyone — tell him exactly what you were wrong about and why it was wrong.', nextStepId: 's5', correct: true, feedback: 'أحسنت! أهم شي + لأن + تعليمات عملية — نصيحة قوية ومحددة.' },
        { text: 'قل له آسف وخلص', translation: 'Tell him sorry and that\'s it.', nextStepId: 's5', correct: false, feedback: 'اعتذار شكلي بالضبط اللي خشيه — ما بررت.' },
        { text: 'أرسل له هدية بدل الكلام', translation: 'Send him a gift instead of talking.', nextStepId: 's5', correct: false, feedback: 'الهدية مو بديل الكلام الصريح.' },
        { text: 'انتظر حتى يهدى الوضع', translation: 'Wait until the situation cools down.', nextStepId: 's5', correct: false, feedback: 'التأخير يزيد الجرح أحياناً — ما ناسب هنا.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'بصراحة كلامك صح — الاعتذار المحدد أصدق وأقوى. راح أكلمه اليوم وأعتذر له بالضبط عن اللي صار.', translation: 'Honestly you\'re right — a specific apology is more truthful and stronger. I\'ll talk to him today and apologize exactly about what happened.', end: true },
  ],
  completionMessage: 'Excellent advice on genuine apologies — clear, specific, and well-reasoned!',
},
