{
  id: 'saudi_convo_p9_news_interview',
  phase: 9,
  title: 'News Interview',
  description: 'A journalist interviews you about a recent government policy. Respond in formal MSA register.',
  focalWordIds: ['w_news', 'w_khabar', 'w_siyaasa', 'w_govt', 'w_opinion', 'w_debate', 'w_freedom', 'w_rights'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'مرحباً بكم في هذه المقابلة. نودّ أن نسألكم عن رأيكم في السياسة الإعلامية الجديدة التي أُعلن عنها الأسبوع الماضي.', translation: 'Welcome to this interview. We would like to ask you about your opinion on the new media policy that was announced last week.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'How do you open your response formally?',
      options: [
        { text: 'شكراً جزيلاً على هذه الدعوة الكريمة. بالنسبة للسياسة الإعلامية الجديدة، أرى أنها تستحق نقاشاً مستفيضاً.', translation: 'Thank you very much for this gracious invitation. Regarding the new media policy, I believe it deserves thorough discussion.', nextStepId: 's3', correct: true, feedback: 'ممتاز! افتتاح رسمي بشكل كامل مع استخدام "أرى" بدلاً من "أشوف".' },
        { text: 'زين، أبغى أقول إن السياسة هذي ما تكفي.', translation: 'OK, I want to say this policy is not enough.', nextStepId: 's3b', correct: false, feedback: '"أبغى" هي عامية سعودية غير مناسبة هنا — في السياق الرسمي استخدم "أُريد" أو "أودّ".' },
        { text: 'حسناً، السياسة الإعلامية التي يُشار إليها تُعتبر خطوة مهمة نحو تعزيز حرية التعبير.', translation: 'Well, the media policy being referred to is considered an important step towards enhancing freedom of expression.', nextStepId: 's3', correct: true, feedback: 'ممتاز! "يُشار إليها" و"تُعتبر" مبنيان للمجهول — استخدام MSA احترافي.' },
        { text: 'ما فهمت وش تقصد بالضبط.', translation: 'I didn\'t understand exactly what you mean.', nextStepId: 's3b', correct: false, feedback: '"ما فهمت" و"وش" عاميتان — في المقابلة الرسمية قل "لم أفهم تماماً ما تقصدون".' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'هل تعتقدون أن هذه السياسة ستُعزّز حرية الصحافة، أم أنها تُقيّدها؟', translation: 'Do you believe this policy will enhance press freedom, or does it restrict it?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'دعونا نوضح: هذه السياسة تتعلق بتنظيم وسائل الإعلام الرقمية. ما رأيكم في مثل هذا التنظيم؟', translation: 'Let us clarify: this policy relates to regulating digital media. What is your opinion on such regulation?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give your assessment of press freedom:',
      options: [
        { text: 'أعتقد بشدة أن حرية الصحافة التي يكفلها القانون تُعتبر ركيزةً أساسية للمجتمع الديمقراطي.', translation: 'I strongly believe that press freedom guaranteed by law is considered a fundamental pillar of democratic society.', nextStepId: 's5', correct: true, feedback: 'رائع! "أعتقد بشدة" + صلة الموصول "التي" + المبني للمجهول "تُعتبر" — MSA على أعلى مستوى.' },
        { text: 'الحرية مهمة بس لازم يكون في حدود.', translation: 'Freedom is important but there must be limits.', nextStepId: 's5', correct: false, feedback: '"بس" و"لازم" عاميتان — في المقابلة الرسمية قل "غير أنه ينبغي" أو "إلا أن ثمة".' },
        { text: 'من الضروري أن تُصان حرية التعبير الصحفي، مع مراعاة المسؤولية الإعلامية.', translation: 'It is essential that journalistic freedom of expression is preserved, while taking media responsibility into account.', nextStepId: 's5', correct: true, feedback: 'ممتاز! "من الضروري" + المبني للمجهول "تُصان" — لغة رسمية متقنة.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'وهل ثمة نقاط محددة تودّون الإشارة إليها في هذه السياسة؟', translation: 'And are there specific points you would like to refer to in this policy?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Point to a specific concern:',
      options: [
        { text: 'نعم، النقطة التي تستوقفني هي الفقرة المتعلقة بالمحتوى الرقمي الذي يُنشر عبر منصات التواصل.', translation: 'Yes, the point that gives me pause is the paragraph related to digital content that is published through social media platforms.', nextStepId: 's7', correct: true, feedback: 'ممتاز! "التي تستوقفني" و"الذي يُنشر" — استخدام موفق لأسماء الموصول والمبني للمجهول.' },
        { text: 'عندي نقطة واحدة، وهي ما أدري ليش ما يوضحون الأمور أكثر.', translation: 'I have one point, which is I don\'t know why they don\'t clarify things more.', nextStepId: 's7b', correct: false, feedback: '"ما أدري" عامية — استخدم "لا أعلم" في السياق الرسمي.' },
        { text: 'أودّ الإشارة إلى بند الشفافية، إذ لم يُحدَّد بوضوح الجهة المسؤولة عن التطبيق.', translation: 'I would like to refer to the transparency clause, as the body responsible for implementation has not been clearly specified.', nextStepId: 's7', correct: true, feedback: 'رائع! "إذ لم يُحدَّد" مبني للمجهول MSA محترف.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'نقطة وجيهة. هل تعتقدون أن الرأي العام يدعم هذه السياسة؟', translation: 'A valid point. Do you believe that public opinion supports this policy?', next: 's8' },
    { id: 's7b', speaker: 'partner', text: 'شكراً. هل لديكم تعليق على موقف الرأي العام من هذه السياسة؟', translation: 'Thank you. Do you have a comment on public opinion\'s stance on this policy?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Comment on public opinion:',
      options: [
        { text: 'الرأي العام الذي يُعبَّر عنه عبر وسائل التواصل يُشير إلى تباين واضح في المواقف.', translation: 'Public opinion as expressed through social media indicates a clear divergence in positions.', nextStepId: 's9', correct: true, feedback: 'ممتاز! "الذي يُعبَّر عنه" مبني للمجهول مع اسم موصول — MSA راقٍ.' },
        { text: 'الناس ما راضيين بشكل عام عن الموضوع هذا.', translation: 'People are generally not satisfied with this matter.', nextStepId: 's9', correct: false, feedback: '"الناس ما راضيين" عامية — قل "لا يبدو أن المواطنين راضين" أو "يُلاحَظ عدم رضا المجتمع".' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'شكراً جزيلاً على هذا التحليل المعمّق. كلامكم يُلقي الضوء على جوانب مهمة من هذه القضية.', translation: 'Thank you very much for this in-depth analysis. Your words shed light on important aspects of this issue.', end: true },
  ],
  completionMessage: 'Excellent! You conducted a formal MSA news interview with passive voice, relative clauses, and register awareness.',
},

{
  id: 'saudi_convo_p9_press_conference',
  phase: 9,
  title: 'Press Conference',
  description: 'You attend a government press conference and ask questions as a journalist.',
  focalWordIds: ['w_govt', 'w_siyaasa', 'w_news', 'w_dawla', 'w_economy', 'w_opinion', 'w_rights', 'w_haqq'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أيها الحضور الكرام، أُعلن عن خطة اقتصادية جديدة ستُنفَّذ خلال السنوات الخمس القادمة. يسعدنا الإجابة عن أسئلتكم.', translation: 'Distinguished audience, a new economic plan has been announced which will be implemented over the next five years. We are pleased to answer your questions.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'How do you request to ask a question formally?',
      options: [
        { text: 'أودّ أن أطرح سؤالاً إن أذنتم لي.', translation: 'I would like to pose a question if you permit me.', nextStepId: 's3', correct: true, feedback: 'ممتاز! "أودّ" + "إن أذنتم" — صياغة رسمية راقية.' },
        { text: 'أبغى أسأل سؤال.', translation: 'I want to ask a question.', nextStepId: 's3b', correct: false, feedback: '"أبغى" عامية سعودية — في المؤتمر الصحفي الرسمي استخدم "أودّ" أو "أُريد".' },
        { text: 'لديّ استفسار أودّ توجيهه حول الجدول الزمني للخطة.', translation: 'I have an inquiry I would like to direct regarding the timeline of the plan.', nextStepId: 's3', correct: true, feedback: 'رائع! "لديّ استفسار" + "أودّ توجيهه" — لغة صحفية رسمية مثالية.' },
        { text: 'ممكن تقول لنا متى ينتهي المشروع؟', translation: 'Can you tell us when the project ends?', nextStepId: 's3b', correct: false, feedback: '"ممكن تقول" عامية — الصيغة الرسمية هي "هل بإمكانكم الإفادة عن..." أو "نودّ معرفة...".' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'بالتأكيد. الخطة التي أُقرَّت تهدف إلى تنويع مصادر الدخل الوطني بعيداً عن النفط.', translation: 'Certainly. The plan that was approved aims to diversify national income sources away from oil.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'تفضل. الجدول الزمني المعتمد يمتد من عام ألفين وخمسة وعشرين حتى عام ألفين وثلاثين.', translation: 'Go ahead. The approved timeline extends from 2025 until 2030.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Follow up about the impact on citizens:',
      options: [
        { text: 'كيف ستؤثر هذه الخطة على حقوق المواطن الاقتصادية التي يكفلها القانون؟', translation: 'How will this plan affect the economic rights of the citizen that are guaranteed by law?', nextStepId: 's5', correct: true, feedback: 'ممتاز! "التي يكفلها القانون" — استخدام موفق لاسم الموصول في سؤال رسمي.' },
        { text: 'وش تأثيرها على الناس العاديين؟', translation: 'What is its effect on ordinary people?', nextStepId: 's5', correct: false, feedback: '"وش" و"الناس" عاميتان — قل "ما تأثيرها على المواطنين" في السياق الرسمي.' },
        { text: 'هل المواطنون الذين يعانون من البطالة سيستفيدون من هذه الخطة مباشرةً؟', translation: 'Will citizens who suffer from unemployment benefit directly from this plan?', nextStepId: 's5', correct: true, feedback: 'رائع! "الذين يعانون" — اسم موصول للجمع MSA صحيح.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'الخطة التي وُضعت تتضمن برامج توظيف ستُطلَق في المرحلة الأولى خلال العام القادم.', translation: 'The plan that was developed includes employment programs that will be launched in the first phase during the coming year.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Ask about transparency and accountability:',
      options: [
        { text: 'من الضروري أن تُوضَّح آليات الشفافية والمساءلة في تنفيذ هذه الخطة. هل يُعتزم نشر تقارير دورية؟', translation: 'It is essential that transparency and accountability mechanisms in implementing this plan be clarified. Is it intended to publish periodic reports?', nextStepId: 's7', correct: true, feedback: 'ممتاز! "من الضروري" + "تُوضَّح" مبني للمجهول + "يُعتزم" — لغة رسمية احترافية.' },
        { text: 'بس من يراقب التنفيذ؟', translation: 'But who monitors the implementation?', nextStepId: 's7b', correct: false, feedback: '"بس" عامية — في السياق الرسمي قل "غير أن السؤال المطروح هو" أو "يبقى السؤال حول...".' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'سيُنشأ مجلس رقابي مستقل، وستُصدَر تقارير ربع سنوية تُرفع إلى الجهات المختصة.', translation: 'An independent oversight council will be established, and quarterly reports will be issued that are submitted to the relevant authorities.', next: 's8' },
    { id: 's7b', speaker: 'partner', text: 'وزارة المالية هي الجهة المنوط بها الإشراف، وستصدر تقارير سنوية.', translation: 'The Ministry of Finance is the body entrusted with oversight, and annual reports will be issued.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Close your questioning professionally:',
      options: [
        { text: 'شكراً جزيلاً على هذه الإيضاحات التي أسهمت في فهم أبعاد الخطة بشكل أوضح.', translation: 'Thank you very much for these clarifications that contributed to understanding the dimensions of the plan more clearly.', nextStepId: 's9', correct: true, feedback: 'ممتاز! "التي أسهمت في" — استخدام رسمي راقٍ لاسم الموصول.' },
        { text: 'تسلم على المعلومات.', translation: 'Thanks for the information.', nextStepId: 's9', correct: false, feedback: '"تسلم" تحية عامية — في المؤتمر الرسمي قل "شكراً جزيلاً" أو "نشكركم على هذه الإيضاحات".' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'شكراً لأسئلتكم الجوهرية. المؤتمر الصحفي القادم سيُعقد بعد إطلاق المرحلة الأولى رسمياً.', translation: 'Thank you for your substantive questions. The next press conference will be held after the first phase is officially launched.', end: true },
  ],
  completionMessage: 'Well done! You asked sharp, formal MSA questions at a government press conference.',
},

{
  id: 'saudi_convo_p9_formal_meeting',
  phase: 9,
  title: 'Formal Committee Meeting',
  description: 'Participate in a formal committee meeting to discuss a new regulation.',
  focalWordIds: ['w_debate', 'w_opinion', 'w_law', 'w_siyaasa', 'w_govt', 'w_dawla', 'w_haqq', 'w_justice'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أعزاءنا الأعضاء، نجتمع اليوم لمناقشة مشروع اللائحة التنظيمية التي أُعدَّت من قِبَل الفريق القانوني. هل ثمة من يودّ البدء؟', translation: 'Dear members, we meet today to discuss the draft regulatory framework that was prepared by the legal team. Is there anyone who would like to begin?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Open your remarks at the meeting:',
      options: [
        { text: 'أودّ أن أبدأ بالإشارة إلى البند الثالث الذي يُعتبر الأكثر إشكالية من الناحية القانونية.', translation: 'I would like to begin by pointing to the third clause which is considered the most problematic from a legal standpoint.', nextStepId: 's3', correct: true, feedback: 'ممتاز! "أودّ" + "يُعتبر" مبني للمجهول — MSA رسمي للغاية.' },
        { text: 'أنا عندي ملاحظات على اللائحة، خصوصاً البند الثالث.', translation: 'I have observations on the regulation, especially the third clause.', nextStepId: 's3', correct: false, feedback: 'مقبول لكن "أنا عندي" غير رسمية — قل "لديّ ملاحظات" في الاجتماعات الرسمية.' },
        { text: 'اسمحوا لي أن أطرح وجهة نظري حول اللائحة الموضوعة للنقاش.', translation: 'Allow me to present my perspective on the regulation that has been placed for discussion.', nextStepId: 's3', correct: true, feedback: 'رائع! "اسمحوا لي أن" + "الموضوعة للنقاش" — افتتاح رسمي متقن.' },
        { text: 'اللائحة هذي فيها مشاكل كثيرة يا جماعة.', translation: 'This regulation has many problems, guys.', nextStepId: 's3b', correct: false, feedback: '"يا جماعة" غير رسمية تماماً — في الاجتماع الرسمي قل "أيها الأعضاء الكرام" أو "السادة الأعضاء".' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'نشكركم على ملاحظاتكم. هل يمكن توضيح الإشكالية القانونية التي أشرتم إليها بمزيد من التفصيل؟', translation: 'We thank you for your observations. Can you clarify the legal issue you referred to in more detail?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'نأخذ علماً بذلك. نرجو توضيح الجوانب التي تراها مشكلة.', translation: 'We take note of that. Please clarify the aspects you see as problematic.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Elaborate on the legal concern:',
      options: [
        { text: 'البند الثالث الذي يُقيَّد بموجبه حق المواطن في التظلم يتعارض مع المبادئ الدستورية للعدالة.', translation: 'The third clause by which the citizen\'s right to appeal is restricted contradicts the constitutional principles of justice.', nextStepId: 's5', correct: true, feedback: 'ممتاز! "الذي يُقيَّد بموجبه" — اسم موصول + مبني للمجهول في جملة واحدة! MSA رفيع.' },
        { text: 'البند الثالث يمنع الناس من حقهم في الاعتراض وهذا ما يصير في دول متقدمة.', translation: 'The third clause prevents people from their right to object and this is not what happens in advanced countries.', nextStepId: 's5', correct: false, feedback: '"الناس" و"ما يصير" عاميتان — قل "لا يتوافق مع ما هو معمول به في الدول المتقدمة".' },
        { text: 'من الضروري أن يُعاد النظر في هذا البند لأن حق التقاضي مكفول بموجب القانون الأساسي.', translation: 'It is essential that this clause be reconsidered because the right to litigation is guaranteed under the basic law.', nextStepId: 's5', correct: true, feedback: 'رائع! "من الضروري" + "يُعاد" مبني للمجهول — صياغة رسمية ممتازة.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'وجهة نظر محترمة. هل يتفق باقي الأعضاء مع هذا الطرح، أم أن ثمة آراء مخالفة؟', translation: 'A respectable viewpoint. Do the rest of the members agree with this argument, or are there dissenting views?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Propose a concrete amendment:',
      options: [
        { text: 'أقترح أن يُضاف نص صريح يكفل حق المواطن في التظلم خلال مدة لا تتجاوز ستين يوماً.', translation: 'I propose that an explicit text be added that guarantees the citizen\'s right to appeal within a period not exceeding sixty days.', nextStepId: 's7', correct: true, feedback: 'ممتاز! "يُضاف" مبني للمجهول + "يكفل" في اسم موصول — اقتراح رسمي دقيق.' },
        { text: 'لازم يعدلون البند هذا ويضيفون حق الاعتراض.', translation: 'They need to amend this clause and add the right to object.', nextStepId: 's7', correct: false, feedback: '"لازم يعدلون" عامية — قل "يجب تعديل البند" أو "ينبغي أن يُعدَّل" في الاجتماع الرسمي.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'اقتراحكم يستحق الدراسة. سيُحال إلى الفريق القانوني لإعداد صيغة مناسبة.', translation: 'Your proposal deserves study. It will be referred to the legal team to prepare an appropriate formulation.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Formally acknowledge and close your contribution:',
      options: [
        { text: 'نشكر اللجنة على تبنّي هذا الاقتراح ونأمل أن تُصاغ التعديلات بما يضمن صون حقوق جميع المواطنين.', translation: 'We thank the committee for adopting this proposal and hope that the amendments are formulated in a way that ensures the preservation of the rights of all citizens.', nextStepId: 's9', correct: true, feedback: 'ممتاز! "تُصاغ" مبني للمجهول + "بما يضمن" — لغة رسمية رفيعة المستوى.' },
        { text: 'تمام، بس لا تنسوا هذا الموضوع.', translation: 'Fine, but don\'t forget this matter.', nextStepId: 's9', correct: false, feedback: '"تمام" و"بس" و"لا تنسوا" عامية — الختام الرسمي يستدعي "نأمل أن يُؤخذ بعين الاعتبار".' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'نعتمد هذا الاقتراح ضمن جدول الأعمال. شكراً لجميع الأعضاء على مساهماتهم القيّمة.', translation: 'We adopt this proposal within the agenda. Thank you to all members for their valuable contributions.', end: true },
  ],
  completionMessage: 'Excellent! You navigated a formal committee meeting with MSA legal register, passive constructions, and relative clauses.',
},

{
  id: 'saudi_convo_p9_diplomatic_intro',
  phase: 9,
  title: 'Diplomatic Introduction',
  description: 'Introduce yourself and your country\'s position at an international diplomatic forum.',
  focalWordIds: ['w_dawla', 'w_siyaasa', 'w_watan', 'w_haqq', 'w_justice', 'w_freedom', 'w_economy', 'w_rights'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'حضرات الممثلين الكرام، يسرّنا أن نفتتح هذا المنتدى الدولي. نودّ أن يتفضّل كل ممثل بتقديم دولته وموقفها من محور النقاش.', translation: 'Distinguished representatives, we are pleased to open this international forum. We would like each representative to kindly present their country and its position on the discussion theme.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Open your diplomatic introduction:',
      options: [
        { text: 'يسعدني أن أمثل المملكة العربية السعودية في هذا المنتدى الرفيع، وأودّ في البداية أن أشكر الجهات المنظِّمة.', translation: 'It is my pleasure to represent the Kingdom of Saudi Arabia in this distinguished forum, and I would like first to thank the organizing authorities.', nextStepId: 's3', correct: true, feedback: 'رائع! افتتاح دبلوماسي رسمي يبدأ بالشكر — MSA مثالي.' },
        { text: 'أهلاً، أنا من المملكة العربية السعودية وجئت أمثل بلدنا هنا.', translation: 'Hello, I\'m from Saudi Arabia and I came to represent our country here.', nextStepId: 's3b', correct: false, feedback: '"أهلاً" و"أنا من" و"جئت" بدون صيغة رسمية — المقام الدبلوماسي يستوجب "يسرّني أن" أو "أُمثّل...".' },
        { text: 'باسم المملكة العربية السعودية، يشرفني المشاركة في هذا المنتدى الذي يُعقد في ظروف بالغة الأهمية.', translation: 'In the name of the Kingdom of Saudi Arabia, it is my honor to participate in this forum which convenes under circumstances of great importance.', nextStepId: 's3', correct: true, feedback: 'ممتاز! "الذي يُعقد" — اسم موصول مع مبني للمجهول — MSA دبلوماسي محترف.' },
        { text: 'السلام عليكم، المملكة العربية السعودية تدعم التعاون الدولي.', translation: 'Peace be upon you, the Kingdom of Saudi Arabia supports international cooperation.', nextStepId: 's3b', correct: false, feedback: 'السلام عليكم صحيح لكن الجملة التالية مباشرة جداً — الافتتاح الدبلوماسي يحتاج مزيداً من الأسلوبية.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'شكراً. وما موقف المملكة العربية السعودية من محور العدالة الاقتصادية الذي يُناقَش في هذا المنتدى؟', translation: 'Thank you. What is the Kingdom of Saudi Arabia\'s position on the axis of economic justice being discussed at this forum?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'شكراً لمشاركتكم. نودّ سماع موقف المملكة من قضية العدالة الاقتصادية.', translation: 'Thank you for your participation. We would like to hear the Kingdom\'s position on the issue of economic justice.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'State your country\'s position on economic justice:',
      options: [
        { text: 'تُعتبر العدالة الاقتصادية التي تُكفل بها حقوق الشعوب ركيزةً محورية في منظومة رؤية المملكة 2030.', translation: 'Economic justice, by which the rights of peoples are guaranteed, is considered a pivotal pillar in the Kingdom\'s Vision 2030 system.', nextStepId: 's5', correct: true, feedback: 'ممتاز! "تُعتبر" + "التي تُكفل بها" — مبني للمجهول مع اسم موصول، MSA دبلوماسي راقٍ.' },
        { text: 'المملكة تدعم العدالة الاقتصادية لأن هذا شيء مهم للناس.', translation: 'The Kingdom supports economic justice because this is an important thing for people.', nextStepId: 's5', correct: false, feedback: '"للناس" عامية — في المقام الدبلوماسي قل "للمواطنين" أو "للشعوب".' },
        { text: 'أعتقد بشدة أن التنمية المستدامة التي يُسعى إليها تستلزم توزيعاً عادلاً للثروات الوطنية.', translation: 'I strongly believe that sustainable development, which is sought after, requires a fair distribution of national wealth.', nextStepId: 's5', correct: true, feedback: 'رائع! "التي يُسعى إليها" — مبني للمجهول + اسم موصول في تعبير دبلوماسي مُتقن.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'موقف واضح ومعبَّر عنه بشكل دقيق. هل ثمة مبادرات محددة تودّون الإعلان عنها في هذا المنتدى؟', translation: 'A clear and precisely expressed position. Are there specific initiatives you would like to announce at this forum?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Announce a diplomatic initiative:',
      options: [
        { text: 'يسعدني الإعلان عن مبادرة إقليمية يُموَّل بها مشاريع التنمية في الدول الأقل نمواً في منطقة الشرق الأوسط.', translation: 'I am pleased to announce a regional initiative through which development projects in the least developed countries in the Middle East region will be funded.', nextStepId: 's7', correct: true, feedback: 'ممتاز! "يُموَّل بها" — مبني للمجهول مع ضمير رابط، MSA دبلوماسي متقن للغاية.' },
        { text: 'عندنا مشروع جديد رح نموّل فيه دول الشرق الأوسط.', translation: 'We have a new project we will fund countries of the Middle East with.', nextStepId: 's7', correct: false, feedback: '"عندنا" و"رح" عاميتان — في الخطاب الدبلوماسي قل "لدينا" و"سنقوم بـ" أو الأفضل "يُزمع تمويل".' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'مبادرة رائدة بلا شك. هل يمكن مشاركة الوثائق الخاصة بها مع الوفود الأخرى؟', translation: 'A pioneering initiative without doubt. Can its documents be shared with the other delegations?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Confirm document sharing formally:',
      options: [
        { text: 'بالتأكيد، ستُوزَّع الوثيقة التفصيلية التي أُعدَّت لهذا الغرض على جميع الوفود في نهاية الجلسة.', translation: 'Certainly, the detailed document that was prepared for this purpose will be distributed to all delegations at the end of the session.', nextStepId: 's9', correct: true, feedback: 'ممتاز! "ستُوزَّع" + "التي أُعدَّت" — مبني للمجهول مزدوج، MSA دبلوماسي احترافي.' },
        { text: 'إي نعم، بنوزع الأوراق بعد الاجتماع.', translation: 'Yes, we\'ll distribute the papers after the meeting.', nextStepId: 's9', correct: false, feedback: '"إي نعم" و"بنوزع" عاميتان — الرد الرسمي هو "بالتأكيد، ستُوزَّع الوثائق...".' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'نقدّر تعاونكم الكريم. يُسجَّل هذا الإعلان ضمن محاضر المنتدى ويُعتمد رسمياً.', translation: 'We appreciate your gracious cooperation. This announcement is recorded within the forum\'s minutes and officially adopted.', end: true },
  ],
  completionMessage: 'Outstanding! You delivered a full diplomatic introduction with MSA register, passive voice, and relative clauses throughout.',
},

{
  id: 'saudi_convo_p9_gov_office_visit',
  phase: 9,
  title: 'Government Office Visit',
  description: 'Visit a government ministry to inquire about an official permit application.',
  focalWordIds: ['w_govt', 'w_law', 'w_haqq', 'w_dawla', 'w_siyaasa', 'w_opinion', 'w_justice', 'w_mahkama'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تفضل، ماذا يمكنني أن أفيدكم؟', translation: 'Please, how can I assist you?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'State your purpose formally at the government office:',
      options: [
        { text: 'أودّ الاستفسار عن إجراءات طلب التصريح التجاري الذي يُستلزم تقديمه وفقاً للوائح المعمول بها.', translation: 'I would like to inquire about the procedures for applying for the commercial permit that is required to be submitted in accordance with current regulations.', nextStepId: 's3', correct: true, feedback: 'ممتاز! "الذي يُستلزم" — اسم موصول + مبني للمجهول في استفسار حكومي رسمي.' },
        { text: 'أبغى أعرف كيف أقدم طلب التصريح.', translation: 'I want to know how to submit the permit application.', nextStepId: 's3b', correct: false, feedback: '"أبغى أعرف" عامية — في المكتب الحكومي الرسمي قل "أودّ الاستفسار عن" أو "أُريد الاستعلام عن".' },
        { text: 'تقدمت بطلب للحصول على تصريح تجاري، وأُبلغت بضرورة مراجعتكم لاستكمال الإجراءات.', translation: 'I submitted an application to obtain a commercial permit, and I was informed of the necessity of reviewing you to complete the procedures.', nextStepId: 's3', correct: true, feedback: 'رائع! "أُبلغت" مبني للمجهول — رسمي ودقيق.' },
        { text: 'جيت عشان التصريح التجاري.', translation: 'I came for the commercial permit.', nextStepId: 's3b', correct: false, feedback: '"جيت عشان" عامية — قل "جئتُ للاستفسار عن" أو "أودّ الاستعلام عن".' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'حسناً. التصاريح التجارية التي تُصدَر من وزارتنا تستلزم تقديم ثلاثة مستندات أساسية. هل لديكم هويتكم الوطنية؟', translation: 'Very well. Commercial permits that are issued by our ministry require the submission of three basic documents. Do you have your national ID?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'بالتأكيد. للتقدم بطلب التصريح، يلزم تعبئة النموذج الرسمي وإرفاق الوثائق المطلوبة.', translation: 'Certainly. To apply for the permit, it is required to fill out the official form and attach the required documents.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Ask about the required documents in detail:',
      options: [
        { text: 'نعم، هويتي معي. هل يمكن إرشادي إلى المستندات التي يُشترط تقديمها والمدة الزمنية المتوقعة لإتمام المعالجة؟', translation: 'Yes, my ID is with me. Can I be directed to the documents that are required to be submitted and the expected timeframe for completing the processing?', nextStepId: 's5', correct: true, feedback: 'ممتاز! "التي يُشترط تقديمها" — اسم موصول + مبني للمجهول في استفسار إداري دقيق.' },
        { text: 'إي، معي هويتي. وش الأوراق المطلوبة؟', translation: 'Yeah, my ID is with me. What papers are needed?', nextStepId: 's5', correct: false, feedback: '"إي" و"وش" عاميتان — في المكتب الرسمي قل "نعم" و"ما هي الوثائق المطلوبة؟"' },
        { text: 'نعم. أودّ أيضاً معرفة إن كانت هناك رسوم مقررة يتعيَّن سدادها.', translation: 'Yes. I would also like to know if there are prescribed fees that must be paid.', nextStepId: 's5', correct: true, feedback: 'رائع! "يتعيَّن سدادها" — تعبير إداري رسمي صحيح.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'المستندات المطلوبة هي: الهوية الوطنية، وشهادة السجل التجاري، والعنوان الوطني. المدة المعتادة هي خمسة عشر يوماً عملياً.', translation: 'The required documents are: national ID, commercial registry certificate, and national address. The usual period is fifteen working days.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Ask about a specific regulation that affects your case:',
      options: [
        { text: 'هل اللائحة التي صدرت العام الماضي تؤثر على طلبات التصاريح التي تقدم بها أصحاب المنشآت الصغيرة؟', translation: 'Does the regulation that was issued last year affect permit applications submitted by small establishment owners?', nextStepId: 's7', correct: true, feedback: 'ممتاز! "التي صدرت" و"التي تقدم بها" — اسما موصول في سؤال إداري دقيق.' },
        { text: 'اللوائح الجديدة تأثر علي ولا لا؟', translation: 'Do the new regulations affect me or not?', nextStepId: 's7b', correct: false, feedback: '"تأثر علي" عامية — قل "هل تؤثر على حالتي؟" أو "هل تنطبق عليّ؟"' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'نعم، اللائحة المذكورة تمنح أصحاب المنشآت الصغيرة إعفاءً من رسوم التسجيل في السنة الأولى.', translation: 'Yes, the mentioned regulation grants small establishment owners an exemption from registration fees in the first year.', next: 's8' },
    { id: 's7b', speaker: 'partner', text: 'هذه اللائحة تنطبق على جميع المتقدمين الجدد بصرف النظر عن حجم المنشأة.', translation: 'This regulation applies to all new applicants regardless of the size of the establishment.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Thank the official and confirm next steps:',
      options: [
        { text: 'أشكركم على هذه المعلومات القيّمة. سأعمل على استيفاء المستندات المطلوبة وتقديمها خلال الأسبوع القادم.', translation: 'I thank you for this valuable information. I will work on completing the required documents and submitting them during the coming week.', nextStepId: 's9', correct: true, feedback: 'ممتاز! ختام رسمي واضح مع "استيفاء" — مفردة إدارية MSA.' },
        { text: 'شكراً. بكرة أجيب الأوراق.', translation: 'Thanks. Tomorrow I\'ll bring the papers.', nextStepId: 's9', correct: false, feedback: '"بكرة أجيب" عامية — قل "سأتقدم بالوثائق خلال..." في السياق الرسمي.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'أهلاً وسهلاً. عند تقديم المستندات، سيُمنح رقم المرجع الخاص بطلبكم فور استكمال التحقق منها.', translation: 'Welcome. Upon submitting the documents, the reference number for your application will be granted immediately upon completing the verification of them.', end: true },
  ],
  completionMessage: 'Well done! You handled a formal government office visit with proper MSA administrative language.',
},

{
  id: 'saudi_convo_p9_university_lecture_q',
  phase: 9,
  title: 'University Lecture Q&A',
  description: 'Ask a professor questions after a university lecture on political science.',
  focalWordIds: ['w_siyaasa', 'w_dawla', 'w_history', 'w_culture', 'w_opinion', 'w_debate', 'w_rights', 'w_haqq'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أُلقيت هذه المحاضرة لاستعراض تطوّر مفهوم الدولة الحديثة عبر التاريخ. يسعدني الإجابة عن أسئلتكم.', translation: 'This lecture was delivered to review the evolution of the concept of the modern state throughout history. I am pleased to answer your questions.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask your first academic question:',
      options: [
        { text: 'أستاذي الكريم، تناولتم في محاضرتكم العلاقة بين الدولة والمواطن. هل يمكن توضيح كيف تطوّرت هذه العلاقة في العالم العربي تحديداً؟', translation: 'Dear professor, you addressed in your lecture the relationship between the state and the citizen. Can you clarify how this relationship evolved in the Arab world specifically?', nextStepId: 's3', correct: true, feedback: 'ممتاز! "تناولتم" — خطاب رسمي للجمع (صيغة التعظيم) مع مرجعية مباشرة للمحاضرة.' },
        { text: 'وش الفرق بين الدولة القديمة والحديثة؟', translation: 'What\'s the difference between the old and modern state?', nextStepId: 's3b', correct: false, feedback: '"وش الفرق" عامية — في القاعة الجامعية قل "ما الفرق بين" أو "كيف يمكن التمييز بين".' },
        { text: 'ألاحظ أن مفهوم السيادة الذي تناولتموه لم يُشَر إلى تطبيقاته في الحالة الخليجية — هل يمكن التوسع في هذا الجانب؟', translation: 'I notice that the concept of sovereignty you addressed was not referred to in its applications in the Gulf case — can you expand on this aspect?', nextStepId: 's3', correct: true, feedback: 'رائع! "لم يُشَر إلى" مبني للمجهول — ملاحظة أكاديمية رسمية دقيقة.' },
        { text: 'دكتور، شفت في المحاضرة إن فيه نقطة ما انتبهت عليها بخصوص الخليج.', translation: 'Doctor, I saw in the lecture that there\'s a point you didn\'t pay attention to regarding the Gulf.', nextStepId: 's3b', correct: false, feedback: '"شفت" و"ما انتبهت عليها" عاميتان — قل "لاحظت أن" و"لم يُتطرق إلى".' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'سؤال وجيه. العلاقة بين الدولة والمواطن في العالم العربي تُعتبر من أكثر المسائل تعقيداً، وقد تأثرت بعوامل ثقافية وتاريخية متشابكة.', translation: 'A valid question. The relationship between the state and the citizen in the Arab world is considered one of the most complex matters, and it has been influenced by intertwined cultural and historical factors.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'الدولة الحديثة تتميز عن القديمة بمفهوم السيادة القانونية وحقوق المواطنة. هل لديك سؤال تريد التوضيح فيه؟', translation: 'The modern state is distinguished from the old one by the concept of legal sovereignty and citizenship rights. Do you have a question you want clarification on?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Ask about cultural influence on political systems:',
      options: [
        { text: 'هل يمكن القول إن الموروث الثقافي الذي تشكّل عبر قرون هو الذي يحدد طبيعة النظام السياسي؟', translation: 'Can it be said that the cultural heritage that was formed over centuries is what determines the nature of the political system?', nextStepId: 's5', correct: true, feedback: 'ممتاز! "الذي تشكّل عبر قرون" — اسم موصول لوصف الموروث الثقافي، MSA أكاديمي رفيع.' },
        { text: 'يعني الثقافة تأثر في السياسة أكثر من غيرها؟', translation: 'So culture influences politics more than others?', nextStepId: 's5', correct: false, feedback: '"يعني" و"تأثر" عاميتان — قل "هل يعني ذلك أن الثقافة تؤثر في السياسة أكثر من غيرها؟"' },
        { text: 'أعتقد أن الهوية الثقافية والتاريخية التي يحملها المجتمع تفرض نفسها على بنية الدولة — هل هذا ما تذهبون إليه؟', translation: 'I believe that the cultural and historical identity that society carries imposes itself on the structure of the state — is this what you are suggesting?', nextStepId: 's5', correct: true, feedback: 'رائع! "التي يحملها المجتمع" — استخدام اسم الموصول في إطار أكاديمي.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تماماً. الموروث الثقافي يُعتبر عاملاً محورياً يُشكّل الخيال السياسي للمجتمعات. وهذا ما يُفسّر التباين بين أنظمة الحكم رغم التشابه في النصوص الدستورية.', translation: 'Exactly. Cultural heritage is considered a pivotal factor that shapes the political imagination of societies. And this is what explains the divergence between governance systems despite similarities in constitutional texts.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Raise a critical academic point:',
      options: [
        { text: 'من الضروري أن تُناقَش في هذا السياق حقوق الأقليات الثقافية التي لا تُعكس دائماً في الأطر الدستورية.', translation: 'It is essential that the rights of cultural minorities, which are not always reflected in constitutional frameworks, be discussed in this context.', nextStepId: 's7', correct: true, feedback: 'ممتاز! "تُناقَش" مبني للمجهول + "التي لا تُعكس" — مبني للمجهول ثانٍ مع اسم موصول.' },
        { text: 'إلا إن حقوق الأقليات ما تنذكر في الدستور في بعض الأحيان.', translation: 'But minority rights are not mentioned in the constitution sometimes.', nextStepId: 's7', correct: false, feedback: '"ما تنذكر" عامية — في الخطاب الأكاديمي قل "لا تُذكر" أو "لا تُشار إليها".' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'ملاحظة دقيقة. هذه الهوّة بين النص والتطبيق تُشكّل أحد التحديات الجوهرية في الدراسات السياسية المعاصرة.', translation: 'A precise observation. This gap between text and application constitutes one of the fundamental challenges in contemporary political studies.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Ask for recommended reading:',
      options: [
        { text: 'هل يمكن إرشادي إلى مراجع أكاديمية رصينة تتناول الموضوع الذي نوقش في المحاضرة بتفصيل أوفى؟', translation: 'Can I be directed to sound academic references that address the topic that was discussed in the lecture in greater detail?', nextStepId: 's9', correct: true, feedback: 'ممتاز! "الذي نوقش" مبني للمجهول — مرجعية أكاديمية رسمية مثالية.' },
        { text: 'في كتب تنصحني تقرأها عن الموضوع؟', translation: 'Are there books you recommend I read about the topic?', nextStepId: 's9', correct: false, feedback: '"في كتب" و"تقرأها" عاميتان — قل "هل تنصحون بمراجع محددة؟" أو "هل ثمة مصادر أكاديمية موصى بها؟"' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'أنصح بالرجوع إلى أعمال ابن خلدون التي تُعتبر المرجع الأساسي في الفكر السياسي الإسلامي، إضافةً إلى الدراسات الحديثة التي نُشرت في المجلات المحكّمة.', translation: 'I recommend referring to the works of Ibn Khaldun which are considered the basic reference in Islamic political thought, in addition to the modern studies that have been published in peer-reviewed journals.', end: true },
  ],
  completionMessage: 'Excellent! You engaged in an academic university Q&A session using formal MSA throughout.',
},

{
  id: 'saudi_convo_p9_job_interview_formal',
  phase: 9,
  title: 'Formal Job Interview',
  description: 'Attend a formal interview for a senior position in a government-linked institution.',
  focalWordIds: ['w_economy', 'w_siyaasa', 'w_opinion', 'w_dawla', 'w_haqq', 'w_justice', 'w_culture', 'w_debate'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'مرحباً بكم. يسرّنا مقابلتكم لهذه الوظيفة القيادية. أودّ أن أبدأ بسؤالكم عن دوافعكم للتقدم لهذا المنصب.', translation: 'Welcome. We are pleased to meet you for this leadership position. I would like to begin by asking you about your motivations for applying for this position.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'State your motivation for the position:',
      options: [
        { text: 'أودّ الإسهام في قطاع يُعتبر من أكثر القطاعات أثراً في تشكيل السياسات العامة التي تخدم المواطن.', translation: 'I would like to contribute to a sector that is considered one of the most influential sectors in shaping public policies that serve the citizen.', nextStepId: 's3', correct: true, feedback: 'ممتاز! "يُعتبر" مبني للمجهول + "التي تخدم" اسم موصول — دوافع رسمية محترفة.' },
        { text: 'أبغى أشتغل في هذا المجال عشان عندي خبرة كثيرة.', translation: 'I want to work in this field because I have a lot of experience.', nextStepId: 's3b', correct: false, feedback: '"أبغى أشتغل" و"عشان" عاميتان — في المقابلة الرسمية قل "أسعى للعمل في هذا المجال لأن لديّ خبرة واسعة".' },
        { text: 'هذا المنصب الذي أُعلن عنه يتوافق تماماً مع المسار المهني الذي سعيت إليه على مدار سنوات.', translation: 'This position that was announced aligns perfectly with the career path that I have sought over the years.', nextStepId: 's3', correct: true, feedback: 'رائع! "الذي أُعلن عنه" مبني للمجهول + "الذي سعيت إليه" — اسما موصول في إجابة مقابلة رسمية.' },
        { text: 'شايف إن هذا المنصب مناسب لمستواي.', translation: 'I see that this position is suitable for my level.', nextStepId: 's3b', correct: false, feedback: '"شايف" عامية — قل "أرى" أو "أعتقد" في المقابلة الرسمية.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'شكراً. وكيف تصفون خبرتكم في مجال تحليل السياسات الاقتصادية؟', translation: 'Thank you. And how do you describe your experience in the field of economic policy analysis?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'نقدّر ذلك. دعونا نتحدث عن خبرتكم العملية في تحليل السياسات الاقتصادية.', translation: 'We appreciate that. Let us talk about your practical experience in analyzing economic policies.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Describe your relevant experience:',
      options: [
        { text: 'خلال السنوات السبع الماضية، اضطلعت بمهام تحليل السياسات الاقتصادية التي تُوضع لدعم التنويع الاقتصادي في إطار رؤية 2030.', translation: 'During the past seven years, I undertook the tasks of analyzing economic policies that are devised to support economic diversification within the Vision 2030 framework.', nextStepId: 's5', correct: true, feedback: 'ممتاز! "التي تُوضع" مبني للمجهول + اسم موصول — وصف خبرة رسمي ودقيق.' },
        { text: 'شغلت في تحليل السياسات الاقتصادية سبع سنين.', translation: 'I worked in economic policy analysis for seven years.', nextStepId: 's5', correct: false, feedback: '"شغلت" عامية — قل "عملتُ" أو "اشتغلتُ" (على الأقل) أو الأفضل "اضطلعتُ بمهام".' },
        { text: 'أعمل في هذا المجال منذ سبع سنوات، وشملت مهامي إعداد التقارير التي تُرفع إلى متخذي القرار.', translation: 'I have been working in this field for seven years, and my tasks included preparing reports that are submitted to decision-makers.', nextStepId: 's5', correct: true, feedback: 'رائع! "التي تُرفع إلى" مبني للمجهول — وصف مهني رسمي محترف.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'مثير للاهتمام. كيف تتعاملون مع مواقف يتضارب فيها رأيكم مع رأي فريق العمل حول قرار معين؟', translation: 'Interesting. How do you handle situations where your opinion conflicts with the team\'s opinion on a specific decision?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Answer the conflict management question:',
      options: [
        { text: 'أؤمن بأن النقاش الذي يُدار بموضوعية واحترام متبادل هو الوسيلة الأمثل للوصول إلى القرار الأنسب.', translation: 'I believe that discussion which is conducted with objectivity and mutual respect is the optimal means to reach the most appropriate decision.', nextStepId: 's7', correct: true, feedback: 'ممتاز! "الذي يُدار" مبني للمجهول + اسم موصول — إجابة رسمية ناضجة.' },
        { text: 'أحاول أشوف رأي الكل وبعدين نقرر مع بعض.', translation: 'I try to see everyone\'s opinion and then we decide together.', nextStepId: 's7', correct: false, feedback: '"أحاول أشوف" و"مع بعض" عاميتان — قل "أسعى للاستماع إلى الآراء كافةً ثم نتوصل إلى قرار مشترك".' },
        { text: 'أعتقد بشدة أن وجهات النظر المتعددة التي تُطرح في بيئة عمل صحية تُثري جودة القرار النهائي.', translation: 'I strongly believe that the multiple viewpoints that are raised in a healthy work environment enrich the quality of the final decision.', nextStepId: 's7', correct: true, feedback: 'رائع! "التي تُطرح" مبني للمجهول + اسم موصول — رأي مهني رسمي ونضج واضح.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'أُعجبني أسلوبكم. سؤالنا الأخير: ما الرؤية التي تحملونها لتطوير هذا القطاع خلال السنوات الخمس القادمة؟', translation: 'I was impressed by your approach. Our final question: what is the vision you hold for developing this sector over the next five years?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Present your vision for the sector:',
      options: [
        { text: 'أرى أن القطاع الذي يُراد تطويره يستلزم استراتيجية متكاملة تقوم على الابتكار والشفافية وبناء الكوادر الوطنية التي تُؤهَّل للقيادة.', translation: 'I believe the sector that is intended to be developed requires an integrated strategy based on innovation, transparency, and building national cadres that are qualified for leadership.', nextStepId: 's9', correct: true, feedback: 'ممتاز! "الذي يُراد تطويره" + "التي تُؤهَّل" — مبنيان للمجهول مع اسمي موصول في رؤية مهنية رسمية.' },
        { text: 'لازم ندعم الكوادر الشابة ونطور التقنية في القطاع.', translation: 'We must support young cadres and develop technology in the sector.', nextStepId: 's9', correct: false, feedback: '"لازم" عامية — في المقابلة الرسمية قل "يجب" أو "ينبغي أن نولي الاهتمام بـ".' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'رؤية طموحة ومتماسكة. سيُبلَّغ المرشحون بنتائج المقابلات خلال أسبوعين من الآن. نشكركم على وقتكم الكريم.', translation: 'An ambitious and coherent vision. Candidates will be notified of interview results within two weeks from now. We thank you for your gracious time.', end: true },
  ],
  completionMessage: 'Outstanding! You aced a formal job interview using MSA register throughout with passive constructions and relative clauses.',
},

{
  id: 'saudi_convo_p9_court_appearance_basic',
  phase: 9,
  title: 'Basic Court Appearance',
  description: 'Respond to a judge\'s questions during a civil court hearing.',
  focalWordIds: ['w_law', 'w_mahkama', 'w_hakama', 'w_haakim', 'w_justice', 'w_haqq', 'w_rights', 'w_dawla'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'المحكمة منعقدة. هل أنتم المدعي في القضية رقم مئتين وخمسة وثلاثين؟', translation: 'The court is in session. Are you the plaintiff in case number two hundred and thirty-five?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Confirm your identity formally in court:',
      options: [
        { text: 'نعم سعادة القاضي، أنا المدعي في هذه القضية، وأُقسم بأن أقول الحق.', translation: 'Yes, Your Honor, I am the plaintiff in this case, and I swear to tell the truth.', nextStepId: 's3', correct: true, feedback: 'ممتاز! "سعادة القاضي" هو الخطاب الصحيح في المحكمة — MSA رسمي للغاية.' },
        { text: 'إي، أنا اللي رفعت القضية.', translation: 'Yeah, I\'m the one who filed the case.', nextStepId: 's3b', correct: false, feedback: '"إي" و"اللي رفعت" عاميتان — في المحكمة يجب قول "نعم سعادة القاضي" و"أنا الذي رفعت".' },
        { text: 'نعم سعادة القاضي. أنا المدعي الذي تقدّم بهذه الدعوى أمام المحكمة الموقّرة.', translation: 'Yes, Your Honor. I am the plaintiff who submitted this lawsuit before the honorable court.', nextStepId: 's3', correct: true, feedback: 'رائع! "الذي تقدّم" اسم موصول + "المحكمة الموقّرة" — خطاب قضائي رسمي مثالي.' },
        { text: 'أيوه أنا.', translation: 'Yes, me.', nextStepId: 's3b', correct: false, feedback: '"أيوه" عامية جداً — في قاعة المحكمة يجب الرد بـ"نعم سعادة القاضي".' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'حسناً. الدعوى التي أُقيمت تتعلق بنزاع عقاري. هل تودّ عرض الحقائق المتعلقة بالقضية؟', translation: 'Very well. The lawsuit that was filed relates to a real estate dispute. Do you wish to present the facts related to the case?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'يُرجى التكلم بصوت واضح. ادعيتم أنتم بهذه القضية — ما هو موضوعها؟', translation: 'Please speak clearly. You filed this case — what is its subject?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Present your case formally:',
      options: [
        { text: 'سعادة القاضي، العقار الذي أُشير إليه في وثائق الملكية قد استُولي عليه دون سند قانوني معتمد، مما ينتهك حقي المكفول بموجب القانون.', translation: 'Your Honor, the property that is referred to in the ownership documents was seized without an approved legal basis, which violates my right guaranteed under the law.', nextStepId: 's5', correct: true, feedback: 'ممتاز! "الذي أُشير إليه" + "استُولي عليه" — مبنيان للمجهول، MSA قضائي محترف.' },
        { text: 'عقارتي أخذوها بدون سبب قانوني وهذا ما صح.', translation: 'They took my property without legal reason and this isn\'t right.', nextStepId: 's5', correct: false, feedback: '"عقارتي أخذوها" و"ما صح" عاميتان — في المحكمة قل "العقار الذي أمتلكه استُولي عليه" و"وهو ما يتعارض مع القانون".' },
        { text: 'أودّ إعلام المحكمة الموقّرة بأن حقي في الملكية الذي يكفله القانون قد انتُهك بشكل صريح.', translation: 'I wish to inform the honorable court that my right to ownership, which is guaranteed by law, has been explicitly violated.', nextStepId: 's5', correct: true, feedback: 'رائع! "الذي يكفله القانون" + "انتُهك" مبني للمجهول — خطاب قضائي دقيق وقوي.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'هل لديكم وثائق تدعم هذا الادعاء؟', translation: 'Do you have documents supporting this claim?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Present your evidence formally:',
      options: [
        { text: 'نعم سعادة القاضي، الوثائق التي أُرفقت بملف الدعوى تُثبت ملكيتي للعقار منذ عشر سنوات.', translation: 'Yes, Your Honor, the documents that were attached to the case file prove my ownership of the property for ten years.', nextStepId: 's7', correct: true, feedback: 'ممتاز! "التي أُرفقت" مبني للمجهول + اسم موصول — تقديم أدلة بلغة قضائية MSA سليمة.' },
        { text: 'عندي أوراق تثبت إن العقار ملكي من زمان.', translation: 'I have papers that prove the property has been mine for a long time.', nextStepId: 's7', correct: false, feedback: '"عندي أوراق" و"من زمان" عاميتان — قل "لديّ مستندات" و"منذ سنوات".' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'ستُدرَس هذه الوثائق من قِبَل الجهة القضائية المختصة. هل لديكم ما تضيفونه؟', translation: 'These documents will be studied by the competent judicial authority. Do you have anything to add?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Make a final formal statement:',
      options: [
        { text: 'أودّ أن أؤكد لسعادتكم أن ما أطالب به ليس أكثر من استيفاء الحق الذي كُفل لي بموجب أحكام القانون النافذ.', translation: 'I wish to confirm to Your Honor that what I am demanding is nothing more than fulfilling the right that was guaranteed to me under the provisions of the applicable law.', nextStepId: 's9', correct: true, feedback: 'ممتاز! "الذي كُفل لي" مبني للمجهول — ختام قضائي رسمي مثالي.' },
        { text: 'بس أبغى حقي وخلاص.', translation: 'I just want my right and that\'s it.', nextStepId: 's9', correct: false, feedback: '"أبغى" و"وخلاص" عاميتان — الختام القضائي يستلزم "أودّ استيفاء حقي المشروع وفق أحكام القانون".' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'شكراً. ستُعقد الجلسة القادمة بعد أسبوعين، وسيُبلَّغ الطرفان بموعدها رسمياً.', translation: 'Thank you. The next session will be held in two weeks, and both parties will be officially notified of its date.', end: true },
  ],
  completionMessage: 'Well done! You handled a basic court appearance using formal MSA judicial language with passive constructions throughout.',
},

{
  id: 'saudi_convo_p9_doctor_specialist',
  phase: 9,
  title: 'Specialist Doctor Consultation',
  description: 'Consult a specialist physician about a medical condition in a formal hospital setting.',
  focalWordIds: ['w_haqq', 'w_rights', 'w_opinion', 'w_dawla', 'w_culture', 'w_history', 'w_haakim', 'w_justice'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'صباح الخير. أنا الدكتور سليمان، استشاري أمراض القلب. اطلعت على ملفكم الطبي الذي أُحيل إليّ. كيف حالكم اليوم؟', translation: 'Good morning. I am Dr. Sulaiman, consultant cardiologist. I have reviewed your medical file that was referred to me. How are you today?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Greet the specialist and describe your main complaint formally:',
      options: [
        { text: 'صباح النور دكتور. أعاني من آلام في منطقة الصدر تتكرر منذ أسابيع، وقد أُحلت إليكم من قِبَل طبيب الرعاية الأولية.', translation: 'Good morning, Doctor. I suffer from chest pains that recur since weeks, and I was referred to you by the primary care physician.', nextStepId: 's3', correct: true, feedback: 'ممتاز! "أُحلت إليكم" مبني للمجهول — توصيف طبي رسمي دقيق.' },
        { text: 'زين الحمد لله. عندي وجع في الصدر من زمان وما اتحسّن.', translation: 'Fine, praise God. I have chest pain for a long time and it hasn\'t improved.', nextStepId: 's3b', correct: false, feedback: '"عندي وجع" و"من زمان" عاميتان — في البيئة الطبية الرسمية قل "أشكو من ألم في الصدر منذ فترة".' },
        { text: 'الحمد لله. أشكو من آلام متكررة في الصدر تشتد عند المجهود البدني، وأودّ الحصول على تقييم شامل.', translation: 'Praise God. I complain of recurring chest pains that intensify with physical exertion, and I would like to obtain a comprehensive evaluation.', nextStepId: 's3', correct: true, feedback: 'رائع! "تشتد عند المجهود" — وصف طبي MSA دقيق مع "أودّ".' },
        { text: 'وجعي في الصدر يزيد لما أتعب.', translation: 'My chest pain increases when I get tired.', nextStepId: 's3b', correct: false, feedback: '"وجعي" و"لما أتعب" عاميتان — قل "ألمي يشتد عند بذل المجهود" في الاستشارة الطبية الرسمية.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'أُعيد قراءة تقرير الإحالة. هل سبق أن خضعتم لتخطيط القلب أو الإيكو؟', translation: 'The referral report is being re-read. Have you previously undergone an ECG or echocardiogram?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'أفهم. متى بدأت هذه الآلام تحديداً؟ وهل هناك أعراض مصاحبة؟', translation: 'I understand. When exactly did these pains begin? And are there accompanying symptoms?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Describe your medical history:',
      options: [
        { text: 'نعم دكتور، أُجري لي تخطيط القلب قبل ثلاثة أشهر في مستشفى الرعاية الأولية، وأُبلغت بأن النتيجة طبيعية.', translation: 'Yes, Doctor, an ECG was performed for me three months ago at the primary care hospital, and I was informed that the result was normal.', nextStepId: 's5', correct: true, feedback: 'ممتاز! "أُجري لي" + "أُبلغت" — مبنيان للمجهول في السياق الطبي الرسمي.' },
        { text: 'إي عملوا لي تخطيط قلب قبل كم شهر وقالوا طبيعي.', translation: 'Yeah they did an ECG for me a few months ago and said it was normal.', nextStepId: 's5', correct: false, feedback: '"إي" و"كم شهر" عاميتان — قل "نعم، أُجري لي تخطيط القلب قبل ثلاثة أشهر وأُبلغت بأن النتيجة طبيعية".' },
        { text: 'لم يسبق لي إجراء فحص إيكو، غير أنه أُجري لي تخطيط قلب في الإحالة السابقة التي صدرت من الرعاية الأولية.', translation: 'I have not previously undergone an echocardiogram, however an ECG was performed for me in the previous referral that was issued from primary care.', nextStepId: 's5', correct: true, feedback: 'رائع! "أُجري لي" + "التي صدرت" — مبني للمجهول مع اسم موصول في السياق الطبي.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'جيد. سيُجرى لكم إيكو القلب اليوم، ثم سأُطلعكم على نتائجه. هل لديكم تاريخ عائلي لأمراض القلب؟', translation: 'Good. An echocardiogram will be performed for you today, then I will inform you of its results. Do you have a family history of heart disease?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Describe your family medical history:',
      options: [
        { text: 'نعم دكتور، والدي الذي تُوفّي قبل سبع سنوات كان يعاني من أمراض الشرايين التاجية التي أُشير إليها في سجلاته الطبية.', translation: 'Yes, Doctor, my father who passed away seven years ago suffered from coronary artery disease that is referred to in his medical records.', nextStepId: 's7', correct: true, feedback: 'ممتاز! "الذي تُوفّي" + "التي أُشير إليها" — اسما موصول مع مبنيين للمجهول.' },
        { text: 'والدي توفي من القلب قبل سبع سنين.', translation: 'My father died of a heart condition seven years ago.', nextStepId: 's7', correct: false, feedback: 'المعلومة صحيحة لكن اللغة عامية — قل "والدي توفي بسبب مرض في الشريان التاجي قبل سبع سنوات".' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'هذه معلومة مهمة جداً. بناءً على ذلك، أرى ضرورة إجراء فحوصات إضافية تشمل قياس الضغط التاجي.', translation: 'This is very important information. Based on that, I see a necessity to conduct additional tests that include measuring coronary pressure.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Ask about your rights as a patient regarding second opinion:',
      options: [
        { text: 'شكراً دكتور. هل يحق لي الحصول على رأي طبي ثانٍ من استشاري آخر إن رأيت ذلك ضرورياً؟', translation: 'Thank you, Doctor. Is it my right to obtain a second medical opinion from another consultant if I deem that necessary?', nextStepId: 's9', correct: true, feedback: 'ممتاز! "هل يحق لي" — سؤال عن الحق بلغة رسمية MSA واضحة وصريحة.' },
        { text: 'ممكن أروح لدكتور ثاني عشان أتأكد؟', translation: 'Can I go to another doctor to make sure?', nextStepId: 's9', correct: false, feedback: '"ممكن أروح" و"عشان" عاميتان — قل "هل يحق لي مراجعة استشاري آخر؟" في البيئة الطبية الرسمية.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'بالطبع، هذا حق مكفول لكل مريض بموجب لوائح حقوق المريض المعتمدة في المملكة. يسعدني تزويدكم بالتقرير الطبي اللازم.', translation: 'Of course, this is a right guaranteed to every patient under the approved patient rights regulations in the Kingdom. I am pleased to provide you with the necessary medical report.', end: true },
  ],
  completionMessage: 'Well done! You navigated a specialist medical consultation in formal MSA with passive constructions and patient rights language.',
},

{
  id: 'saudi_convo_p9_panel_discussion',
  phase: 9,
  title: 'Panel Discussion',
  description: 'Participate in a televised panel discussion on economic reform and national development.',
  focalWordIds: ['w_economy', 'w_debate', 'w_opinion', 'w_siyaasa', 'w_dawla', 'w_rights', 'w_culture', 'w_freedom'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً بمشاهدينا الكرام في برنامجنا الحواري. ضيفنا اليوم خبير اقتصادي يرى أن الإصلاح الاقتصادي الذي يُتحدث عنه يستلزم تغييرات جذرية. ما تعليقكم؟', translation: 'Welcome, dear viewers, to our talk show. Our guest today is an economic expert who believes that the economic reform being spoken about requires fundamental changes. What is your comment?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Open the panel discussion with your position:',
      options: [
        { text: 'أعتقد بشدة أن الإصلاح الاقتصادي الذي يُنشد لا يمكن أن يُحقَّق دون إصلاح منظومة الحوكمة التي تحكم العلاقة بين القطاع العام والخاص.', translation: 'I strongly believe that the economic reform that is aspired to cannot be achieved without reforming the governance system that governs the relationship between the public and private sectors.', nextStepId: 's3', correct: true, feedback: 'ممتاز! "الذي يُنشد" + "يُحقَّق" — مبنيان للمجهول مع اسم موصول في بداية نقاش رسمي.' },
        { text: 'أنا أشوف إن الإصلاح الاقتصادي محتاج تغييرات كثيرة في النظام.', translation: 'I see that economic reform needs many changes in the system.', nextStepId: 's3b', correct: false, feedback: '"أشوف" عامية — في البرامج الحوارية الرسمية قل "أرى" أو "أعتقد".' },
        { text: 'برأيي الصريح، ثمة إجماع على ضرورة الإصلاح، غير أن محور الخلاف يكمن في الأولويات والتسلسل الزمني.', translation: 'In my completely honest opinion, there is consensus on the necessity of reform, however the axis of disagreement lies in the priorities and timeline.', nextStepId: 's3', correct: true, feedback: 'رائع! "برأيي الصريح" + "ثمة إجماع" — افتتاح نقاشي رسمي بامتياز.' },
        { text: 'صراحة الإصلاح مهم بس الجميع يتفق عليه والخلاف على التفاصيل فقط.', translation: 'Honestly, reform is important but everyone agrees on it and the disagreement is only on the details.', nextStepId: 's3b', correct: false, feedback: '"صراحة" وحدها غير كافية كافتتاح — استخدم "برأيي الصريح" أو "في تقديري" للمستوى الحواري الرسمي.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'وجهة نظر مثيرة. وما رأيكم في السياسة المالية التي اتُّبعت خلال السنوات الخمس الماضية؟', translation: 'An interesting viewpoint. And what is your opinion on the financial policy that was followed during the past five years?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'نقطة مهمة. كيف تقيّمون السياسة المالية المتبعة خلال السنوات الأخيرة؟', translation: 'An important point. How do you assess the financial policy being followed in recent years?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Assess the financial policy critically:',
      options: [
        { text: 'السياسة المالية التي اتُّبعت تُعتبر خطوة إيجابية، غير أن النتائج التي تحققت تبقى دون مستوى الطموح المُعلَن.', translation: 'The financial policy that was followed is considered a positive step, however the results that were achieved remain below the level of the declared ambition.', nextStepId: 's5', correct: true, feedback: 'ممتاز! "التي اتُّبعت" + "تُعتبر" + "التي تحققت" + "المُعلَن" — أربعة مبنيات للمجهول واسما موصول!' },
        { text: 'السياسة المالية فيها إيجابيات وسلبيات مثل أي سياسة ثانية.', translation: 'The financial policy has positives and negatives like any other policy.', nextStepId: 's5', correct: false, feedback: 'ضعيف جداً كتحليل — في البرنامج الحواري يجب أن تقدّم تقييماً نقدياً مدعوماً بأدلة.' },
        { text: 'من الضروري أن يُقيَّم الأداء الاقتصادي بمعايير موضوعية لا بالمقارنة مع التوقعات التي أُعلنت في بداية المرحلة.', translation: 'It is essential that economic performance be evaluated by objective criteria not by comparison with the expectations that were announced at the beginning of the phase.', nextStepId: 's5', correct: true, feedback: 'رائع! "من الضروري" + "يُقيَّم" + "أُعلنت" — ثلاثة مبنيات للمجهول في تقييم منهجي.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تحليل دقيق. وكيف ترون دور القطاع الخاص في الإصلاح الاقتصادي؟', translation: 'A precise analysis. And how do you see the role of the private sector in economic reform?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Analyze the private sector\'s role:',
      options: [
        { text: 'القطاع الخاص الذي يُعتمد عليه كمحرك رئيسي للنمو يحتاج بيئة تنظيمية تُشجَّع فيها المنافسة وتُصان فيها حقوق المستثمر.', translation: 'The private sector that is relied upon as the main driver of growth needs a regulatory environment in which competition is encouraged and investor rights are preserved.', nextStepId: 's7', correct: true, feedback: 'ممتاز! "الذي يُعتمد عليه" + "تُشجَّع" + "تُصان" — اسم موصول مع ثلاثة مبنيات للمجهول في جملة واحدة.' },
        { text: 'القطاع الخاص مهم وكمان لازم الحكومة تدعمه.', translation: 'The private sector is important and also the government must support it.', nextStepId: 's7', correct: false, feedback: '"كمان" و"لازم" عاميتان — قل "إضافةً إلى ذلك، يجب على الحكومة دعمه".' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'نقطة جوهرية. وهل ثمة نماذج دولية يُستأنس بها في هذا الإطار؟', translation: 'A fundamental point. And are there international models that are used as reference in this framework?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Reference international models formally:',
      options: [
        { text: 'التجربة السنغافورية التي كثيراً ما يُستشهَد بها تُعتبر نموذجاً ناجحاً، غير أن سياقها يختلف جذرياً عن السياق الخليجي الذي يتميز بخصائصه الثقافية والتاريخية.', translation: 'The Singaporean experience that is frequently cited is considered a successful model, however its context differs fundamentally from the Gulf context that is distinguished by its cultural and historical characteristics.', nextStepId: 's9', correct: true, feedback: 'ممتاز! "يُستشهَد بها" + "تُعتبر" + "الذي يتميز" — ثلاثة مبنيات للمجهول مع اسم موصول في تحليل مقارن.' },
        { text: 'في دول كثيرة نجحوا في الإصلاح الاقتصادي ونقدر نتعلم منهم.', translation: 'Many countries succeeded in economic reform and we can learn from them.', nextStepId: 's9', correct: false, feedback: '"نقدر" عامية — قل "يمكننا الاستفادة من تجاربها" في البرنامج الحواري الرسمي.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'تحليل شامل ومتوازن. نشكركم على هذا الإثراء النوعي لبرنامجنا. والشكر موصول لمشاهدينا الكرام.', translation: 'A comprehensive and balanced analysis. We thank you for this qualitative enrichment of our program. And thanks are extended to our dear viewers.', end: true },
  ],
  completionMessage: 'Outstanding! You delivered expert-level panel discussion commentary in formal MSA with extensive use of passive voice and relative clauses.',
},
