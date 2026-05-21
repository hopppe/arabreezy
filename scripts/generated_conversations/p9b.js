{
  id: 'saudi_convo_p9_legal_advice',
  phase: 9,
  title: 'Legal Advice',
  description: 'Consult a lawyer about a contract dispute in a formal legal setting.',
  focalWordIds: ['w_law', 'w_right', 'w_contract', 'w_document', 'w_court', 'w_evidence', 'w_official', 'w_complaint'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'مرحباً، كيف يمكنني مساعدتك اليوم؟ يُرجى توضيح طبيعة النزاع الذي تواجهه.', translation: 'Hello, how can I help you today? Please clarify the nature of the dispute you are facing.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Explain your situation formally:',
      options: [
        { text: 'أواجه نزاعاً تعاقدياً مع طرف تجاري لم يلتزم بالبنود التي اتُّفق عليها في العقد المُبرم بيننا.', translation: 'I am facing a contractual dispute with a business party that did not comply with the terms agreed upon in the contract concluded between us.', nextStepId: 's3', correct: true, feedback: 'ممتاز! استخدمت المصطلحات القانونية الصحيحة واللغة الرسمية.' },
        { text: 'عندي مشكلة مع شريكي في التجارة ما وفّى بالكلام اللي قلناه.', translation: 'I have a problem with my business partner who didn\'t fulfill what we said.', nextStepId: 's3b', correct: false, feedback: 'هذه اللغة غير رسمية في السياق القانوني. استخدم "لم يلتزم" و"العقد المُبرم".' },
        { text: 'أبغى أشتكي على واحد ما ساعدني.', translation: 'I want to complain about someone who didn\'t help me.', nextStepId: 's3b', correct: false, feedback: 'غير محدد وغير رسمي. في المكتب القانوني يُطلب منك تفصيل النزاع بدقة.' },
        { text: 'لديّ عقد موقَّع غير أن الطرف الآخر أخلَّ ببنوده وأطلب استشارتكم القانونية.', translation: 'I have a signed contract but the other party breached its terms and I request your legal counsel.', nextStepId: 's3', correct: true, feedback: 'ممتاز! أسلوب رسمي ومحدد، واستخدمت "غير أن" كأداة ربط راقية.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'يُعدّ الإخلال بالعقد جريمةً مدنية يُعاقب عليها القانون. هل بحوزتك وثائق تُثبت ما اتُّفق عليه؟', translation: 'Breach of contract is considered a civil offense punishable by law. Do you have documents that prove what was agreed upon?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'أحتاج منك مزيداً من التفاصيل. هل تملك عقداً مكتوباً موقَّعاً من الطرفين؟', translation: 'I need more details from you. Do you have a written contract signed by both parties?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Describe your evidence:',
      options: [
        { text: 'نعم، لديّ نسخة من العقد الموقَّع فضلاً عن مراسلات بريد إلكتروني تُثبت التزام الطرف الآخر أصلاً ثم تراجعه.', translation: 'Yes, I have a copy of the signed contract as well as email correspondence proving the other party\'s original commitment and then their retraction.', nextStepId: 's5', correct: true, feedback: 'استخدام "فضلاً عن" بدلاً من "وكمان" يُظهر مستوى اللغة الرسمي.' },
        { text: 'عندي إيميلات بس ما عندي عقد مكتوب.', translation: 'I have emails but I don\'t have a written contract.', nextStepId: 's5b', correct: false, feedback: 'المحتوى مقبول لكن الأسلوب غير رسمي — قل "لديّ مراسلات إلكترونية وإن كان العقد غير موثَّق خطياً".' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'هذه الأدلة كافية للمضي قُدُماً. سيُرفع الطلب إلى المحكمة التجارية وسيُبلَّغ الطرف الآخر رسمياً.', translation: 'This evidence is sufficient to proceed. The application will be submitted to the commercial court and the other party will be formally notified.', next: 's6' },
    { id: 's5b', speaker: 'partner', text: 'المراسلات الإلكترونية مقبولة كدليل وإن كانت قيمتها أدنى من العقد الخطي. يمكن رفع دعوى استناداً إليها.', translation: 'Electronic correspondence is accepted as evidence even if its value is lower than a written contract. A lawsuit can be filed based on it.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Ask about next steps formally:',
      options: [
        { text: 'ما المدة الزمنية المتوقَّعة للبتّ في القضية، وما الرسوم التي تترتَّب على ذلك؟', translation: 'What is the expected timeframe for resolving the case, and what fees are associated with that?', nextStepId: 's7', correct: true, feedback: 'سؤال رسمي ودقيق يُظهر إلمامك بالإجراءات القانونية.' },
        { text: 'كم بتاخذ القضية وكم الكلفة؟', translation: 'How long will the case take and how much does it cost?', nextStepId: 's7', correct: false, feedback: 'سؤال مباشر لكن بأسلوب عامي — في المكتب القانوني استخدم "المدة الزمنية" و"الرسوم".' },
        { text: 'وش اللي لازم أسوي الحين؟', translation: 'What do I need to do now?', nextStepId: 's7', correct: false, feedback: 'عامي جداً للسياق القانوني الرسمي.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'تستغرق القضايا التجارية عادةً من ثلاثة إلى ستة أشهر. أما الرسوم فتُحدَّد بنسبة مئوية من قيمة النزاع وفق اللوائح المعمول بها.', translation: 'Commercial cases usually take three to six months. As for fees, they are determined as a percentage of the dispute\'s value in accordance with applicable regulations.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Confirm your decision to proceed:',
      options: [
        { text: 'أُفوِّضكم بالمضي في الإجراءات القانونية اللازمة وسأُزوِّدكم بالوثائق المطلوبة في أقرب وقت ممكن.', translation: 'I authorize you to proceed with the necessary legal procedures and I will provide you with the required documents as soon as possible.', nextStepId: 's9', correct: true, feedback: 'ممتاز! "أُفوِّض" هو الفعل الرسمي الصحيح لمنح التوكيل.' },
        { text: 'زين، امشوا قدام وأنا أجيب الأوراق.', translation: 'Good, go ahead and I\'ll bring the papers.', nextStepId: 's9', correct: false, feedback: 'المحتوى صحيح لكن الأسلوب العامي غير مناسب في توكيل قانوني رسمي.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'حسناً، سيُعدّ فريقنا مذكرة الدعوى التي يجب أن تُراجعها وتُوقِّعها. نشكرك على ثقتك بمكتبنا ونتطلع إلى الدفاع عن حقوقك.', translation: 'Very well, our team will prepare the lawsuit memorandum which you must review and sign. We thank you for your trust in our office and look forward to defending your rights.', end: true },
  ],
  completionMessage: 'Excellent work navigating a formal legal consultation in MSA. Your use of legal register and passive constructions was accurate.',
},

{
  id: 'saudi_convo_p9_passport_office',
  phase: 9,
  title: 'Passport Office',
  description: 'Renew your passport at a government passport office using formal Arabic.',
  focalWordIds: ['w_document', 'w_official', 'w_expire', 'w_application', 'w_identity', 'w_government', 'w_period', 'w_required'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً بك في مكتب الجوازات. ما الخدمة التي تودّ الحصول عليها اليوم؟', translation: 'Welcome to the passport office. What service do you wish to obtain today?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'State your request formally:',
      options: [
        { text: 'أودّ تجديد جواز سفري الذي انتهت صلاحيته منذ شهر مضى.', translation: 'I wish to renew my passport whose validity expired one month ago.', nextStepId: 's3', correct: true, feedback: 'جيد جداً! "أودّ" بدلاً من "أبغى"، واستخدمت جملة الصلة "الذي انتهت صلاحيته" بشكل صحيح.' },
        { text: 'أبغى أجدد جوازي، انتهى منذ شهر.', translation: 'I want to renew my passport, it expired a month ago.', nextStepId: 's3b', correct: false, feedback: '"أبغى" عامية سعودية — استبدلها بـ"أودّ" أو "أرغب في" في المكاتب الرسمية.' },
        { text: 'جوازي خلص وأحتاج أجدده.', translation: 'My passport is done and I need to renew it.', nextStepId: 's3b', correct: false, feedback: '"خلص" عامي جداً — استخدم "انتهت صلاحيته" أو "انقضت مدته".' },
        { text: 'أرغب في استخراج تجديد لجواز السفر المنتهي الصلاحية.', translation: 'I wish to obtain a renewal for the expired passport.', nextStepId: 's3', correct: true, feedback: 'ممتاز! "أرغب في" ومصطلح "المنتهي الصلاحية" دقيق تماماً.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'يُشترط لتجديد جواز السفر تقديم الوثائق الآتية: بطاقة الهوية الوطنية، وصورة شخصية حديثة، وإيصال سداد الرسوم.', translation: 'Renewing a passport requires submitting the following documents: national identity card, a recent personal photo, and a fee payment receipt.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'حسناً. لإتمام طلب التجديد تحتاج إلى بطاقة هويتك الوطنية وصورة شخصية وما يُثبت سداد الرسوم الرسمية.', translation: 'Very well. To complete the renewal application you need your national ID card, a personal photo, and proof of official fee payment.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Confirm you have the documents:',
      options: [
        { text: 'بحوزتي جميع الوثائق المطلوبة، وقد أُدِّيت الرسوم إلكترونياً عبر البوابة الحكومية.', translation: 'I have all the required documents, and the fees have been paid electronically through the government portal.', nextStepId: 's5', correct: true, feedback: 'استخدمت المبني للمجهول "أُدِّيت" بشكل صحيح — هذا هو المستوى المطلوب في التعامل الرسمي.' },
        { text: 'معي كل الأوراق ودفعت الرسوم أونلاين.', translation: 'I have all the papers and paid the fees online.', nextStepId: 's5', correct: false, feedback: 'المحتوى صحيح لكن "معي" و"أونلاين" عامي — قل "بحوزتي" و"إلكترونياً".' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'سيُراجَع طلبك ويُصدَر الجواز الجديد في غضون سبعة أيام عمل. هل تودّ الاستلام بنفسك أم عبر البريد؟', translation: 'Your application will be reviewed and the new passport will be issued within seven working days. Do you wish to collect it in person or by mail?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'State your preference for collection:',
      options: [
        { text: 'أفضِّل الاستلام شخصياً حرصاً على سلامة الوثيقة.', translation: 'I prefer to collect it in person to ensure the safety of the document.', nextStepId: 's7', correct: true, feedback: '"أفضِّل" وليس "أبغى"، و"حرصاً على" تعبير رسمي راقٍ.' },
        { text: 'ابعثوه بالبريد، أسهل.', translation: 'Send it by mail, it\'s easier.', nextStepId: 's7', correct: false, feedback: 'أسلوب عامي — قل "أودّ إرساله عبر البريد إن أمكن ذلك".' },
        { text: 'أطلب إرساله بالبريد المُسجَّل إن كانت الخدمة متاحة.', translation: 'I request sending it by registered mail if the service is available.', nextStepId: 's7', correct: true, feedback: 'ممتاز! "البريد المُسجَّل" مصطلح رسمي دقيق.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'تمام. سيُرسَل إليك رسالة نصية فور إتمام المعالجة. هل ثمة استفسار آخر؟', translation: 'Very well. You will be sent a text message as soon as processing is complete. Is there any other inquiry?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Ask a follow-up question formally:',
      options: [
        { text: 'هل يمكن الاستعلام عن مرحلة المعالجة عبر الموقع الإلكتروني الرسمي؟', translation: 'Is it possible to inquire about the processing stage through the official website?', nextStepId: 's9', correct: true, feedback: '"الاستعلام" و"الموقع الإلكتروني الرسمي" مصطلحان رسميان مناسبان تماماً.' },
        { text: 'أقدر أتابع الطلب أونلاين؟', translation: 'Can I follow up on the application online?', nextStepId: 's9', correct: false, feedback: '"أقدر" عامية سعودية — استخدم "هل يمكن" أو "هل بإمكاني".' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'نعم، يُتاح تتبُّع حالة الطلب عبر بوابة الجوازات الإلكترونية برقم المرجع الذي سيُزوَّد به عبر الرسالة النصية. شكراً لك.', translation: 'Yes, tracking the application status is available through the electronic passport portal using the reference number that will be provided via text message. Thank you.', end: true },
  ],
  completionMessage: 'Well done. You handled all passport office interactions in formal MSA, correctly using passive constructions and formal request verbs.',
},

{
  id: 'saudi_convo_p9_visa_interview',
  phase: 9,
  title: 'Visa Interview',
  description: 'Attend a formal visa interview at an embassy and answer questions in MSA.',
  focalWordIds: ['w_purpose', 'w_duration', 'w_official', 'w_financial', 'w_return', 'w_confirm', 'w_study', 'w_sponsor'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'مساء الخير. يُرجى الجلوس. سنبدأ المقابلة الآن. ما الغرض من زيارتك للبلاد؟', translation: 'Good evening. Please be seated. We will begin the interview now. What is the purpose of your visit to the country?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'State your purpose formally:',
      options: [
        { text: 'الغرض من زيارتي الدراسة الأكاديمية، إذ قُبلت في برنامج الدراسات العليا بإحدى الجامعات المعتمَدة.', translation: 'The purpose of my visit is academic study, as I have been accepted into a graduate studies program at one of the accredited universities.', nextStepId: 's3', correct: true, feedback: 'ممتاز! استخدمت "إذ" للربط و"قُبلت" مبنياً للمجهول — هذا هو المستوى المطلوب في مقابلات التأشيرة.' },
        { text: 'رحت لأدرس هناك في الجامعة.', translation: 'I went to study there at the university.', nextStepId: 's3b', correct: false, feedback: 'أسلوب عامي وتصريف زمني خاطئ — استخدم المضارع "أرغب في الدراسة" وأسلوباً رسمياً.' },
        { text: 'أسعى إلى متابعة دراستي الجامعية في تخصص إدارة الأعمال وفق خطة أكاديمية محددة.', translation: 'I seek to continue my university studies in business administration according to a specific academic plan.', nextStepId: 's3', correct: true, feedback: '"أسعى إلى" بديل رسمي ممتاز، وتفصيل التخصص يُعزِّز المصداقية.' },
        { text: 'أبغى أدرس بالجامعة مدة سنتين.', translation: 'I want to study at the university for two years.', nextStepId: 's3b', correct: false, feedback: '"أبغى" عامية سعودية — استخدم "أرغب في" أو "أسعى إلى" في المقابلة الرسمية.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'ما المدة المتوقَّعة لإقامتك، وهل تعتزم العودة إلى بلدك بعد انتهاء الدراسة؟', translation: 'What is the expected duration of your stay, and do you intend to return to your country after completing your studies?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'أحتاج أن تجيب بوضوح: ما مدة إقامتك المُخطَّطة وما خططك بعد انتهاء الدراسة؟', translation: 'I need you to answer clearly: what is your planned duration of stay and what are your plans after completing your studies?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Explain duration and return plans:',
      options: [
        { text: 'تستغرق الدراسة عامين دراسيين، وأعتزم العودة إلى بلدي فور الحصول على الدرجة العلمية التزاماً بالمتطلبات الأسرية والمهنية.', translation: 'The studies take two academic years, and I intend to return to my country immediately upon obtaining the degree, in compliance with family and professional requirements.', nextStepId: 's5', correct: true, feedback: 'إجابة شاملة تستخدم "أعتزم" و"فور" و"التزاماً بـ" — مصطلحات رسمية دقيقة.' },
        { text: 'سنتين وبعدين أرجع للبيت.', translation: 'Two years and then I\'ll go back home.', nextStepId: 's5', correct: false, feedback: '"بعدين" و"البيت" عاميتان — قل "وبعد انتهاء الدراسة أعتزم العودة".' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'هل لديك كفيل مالي يضمن تغطية نفقات إقامتك الدراسية؟', translation: 'Do you have a financial sponsor guaranteeing coverage of your study residence expenses?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Answer about financial support:',
      options: [
        { text: 'نعم، تكفّلت المؤسسة التي أعمل بها بتحمُّل كامل التكاليف الدراسية وفق عقد موثَّق، فضلاً عن منحة حكومية مُعتمَدة.', translation: 'Yes, the institution I work for has undertaken to bear all study costs according to a documented contract, in addition to an approved government grant.', nextStepId: 's7', correct: true, feedback: '"تكفّلت" و"تحمُّل" و"فضلاً عن" مصطلحات رسمية ممتازة.' },
        { text: 'شركتي بتدفع لي وعندي منحة كمان.', translation: 'My company will pay for me and I also have a scholarship.', nextStepId: 's7', correct: false, feedback: '"بتدفع" و"كمان" عاميتان — استخدم "تتكفَّل المؤسسة" و"فضلاً عن".' },
        { text: 'أتحمَّل النفقات شخصياً استناداً إلى مدخرات موثَّقة في كشف الحساب البنكي المُرفق.', translation: 'I bear the expenses personally based on savings documented in the attached bank statement.', nextStepId: 's7', correct: true, feedback: '"أتحمَّل" و"استناداً إلى" مصطلحات رسمية صحيحة تماماً.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'سيُراجَع ملفك ويُبلَّغ قرار اللجنة خلال أسبوعين. هل تودّ إضافة أي معلومة؟', translation: 'Your file will be reviewed and the committee\'s decision will be communicated within two weeks. Do you wish to add any information?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Close the interview formally:',
      options: [
        { text: 'أودّ التأكيد على التزامي التام بشروط التأشيرة وقوانين الإقامة، وأنا رهن الإشارة لتقديم أي وثائق إضافية.', translation: 'I wish to affirm my full commitment to the visa conditions and residence laws, and I am at your disposal to provide any additional documents.', nextStepId: 's9', correct: true, feedback: '"رهن الإشارة" تعبير رسمي راقٍ جداً يُظهر مستوى لغوياً متقدماً.' },
        { text: 'لا، شكراً، عندي كل شيء.', translation: 'No, thank you, I have everything.', nextStepId: 's9', correct: false, feedback: 'إغلاق عامي — في نهاية المقابلة الرسمية يُستحسن تأكيد الالتزام وشكر اللجنة رسمياً.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'حسناً. لقد اتَّسمت إجاباتك بالوضوح والدقة. ستُخطَر بالقرار عبر البريد الإلكتروني المُسجَّل في الملف. شكراً لحضورك.', translation: 'Very well. Your answers have been characterized by clarity and precision. You will be notified of the decision via the email registered in the file. Thank you for attending.', end: true },
  ],
  completionMessage: 'Outstanding. You answered all visa interview questions in formal MSA with correct passive constructions and formal register throughout.',
},

{
  id: 'saudi_convo_p9_university_admission',
  phase: 9,
  title: 'University Admission',
  description: 'Speak with a university admissions officer about your application in formal MSA.',
  focalWordIds: ['w_study', 'w_required', 'w_application', 'w_academic', 'w_program', 'w_certificate', 'w_interview', 'w_criteria'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً بك في إدارة القبول والتسجيل. كيف يمكنني إرشادك؟', translation: 'Welcome to the Admissions and Registration Department. How can I guide you?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'State your purpose at the admissions office:',
      options: [
        { text: 'أودّ الاستفسار عن متطلبات القبول في برنامج الدكتوراه بقسم اللغويات التطبيقية.', translation: 'I wish to inquire about the admission requirements for the doctoral program in the Department of Applied Linguistics.', nextStepId: 's3', correct: true, feedback: '"أودّ الاستفسار" رسمي تماماً، و"متطلبات القبول" مصطلح أكاديمي دقيق.' },
        { text: 'أبغى أدخل الدكتوراه، وش اللي أحتاجه؟', translation: 'I want to enter the doctorate, what do I need?', nextStepId: 's3b', correct: false, feedback: '"أبغى" و"وش" عاميتان — في مكتب القبول الجامعي استخدم "أودّ الاستفسار عن متطلبات القبول".' },
        { text: 'جئت للاستفسار عن شروط الالتحاق ببرامج الدراسات العليا التي تُقدِّمها الجامعة.', translation: 'I came to inquire about the conditions for joining the graduate programs offered by the university.', nextStepId: 's3', correct: true, feedback: '"شروط الالتحاق" و"تُقدِّمها الجامعة" — جملة رسمية سليمة تماماً.' },
        { text: 'حابب أسجل بالجامعة.', translation: 'I\'d like to register at the university.', nextStepId: 's3b', correct: false, feedback: '"حابب" عامي — استخدم "أرغب في التسجيل" أو "أودّ الالتحاق".' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'يُشترط للقبول في الدكتوراه: درجة الماجستير بتقدير لا يقل عن ممتاز، وشهادة لغة معتمَدة، واجتياز المقابلة الأكاديمية التي تُعقد مرتين سنوياً.', translation: 'Requirements for doctoral admission include: a Master\'s degree with a grade no less than excellent, an accredited language certificate, and passing the academic interview held twice annually.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'للالتحاق بالدكتوراه تحتاج درجة ماجستير وشهادة لغة وتجتاز مقابلة القسم. هل تملك هذه المستلزمات؟', translation: 'To join the doctoral program you need a Master\'s degree, a language certificate, and pass the department interview. Do you have these requirements?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Confirm your qualifications:',
      options: [
        { text: 'نعم، حصلت على درجة الماجستير بمرتبة الشرف، وقد اجتزت اختبار اللغة الإنجليزية بمستوى مقبول وفق معايير الجامعة.', translation: 'Yes, I obtained the Master\'s degree with honors, and I have passed the English language test at an acceptable level according to the university\'s standards.', nextStepId: 's5', correct: true, feedback: '"بمرتبة الشرف" و"اجتزت" مصطلحات أكاديمية رسمية صحيحة.' },
        { text: 'أيوه عندي ماجستير بامتياز وحصلت على آيلتس.', translation: 'Yes I have a Master\'s with distinction and I got IELTS.', nextStepId: 's5', correct: false, feedback: '"أيوه" عامي — قل "نعم، حصلت على" لتناسب السياق الأكاديمي الرسمي.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'سيُقيَّم ملفك من قِبَل لجنة القبول وستُخطَر بموعد المقابلة عبر البريد الجامعي الرسمي.', translation: 'Your file will be evaluated by the admissions committee and you will be notified of the interview date via the official university email.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Ask about scholarship opportunities:',
      options: [
        { text: 'هل تُوجَد منح دراسية مُتاحة للطلاب الملتحقين ببرامج الدكتوراه، وما معايير الاستحقاق؟', translation: 'Are there study grants available for students enrolled in doctoral programs, and what are the eligibility criteria?', nextStepId: 's7', correct: true, feedback: '"تُوجَد" مبني للمجهول، و"معايير الاستحقاق" مصطلح أكاديمي دقيق.' },
        { text: 'في منح للطلاب؟ كيف أحصل عليها؟', translation: 'Are there grants for students? How do I get them?', nextStepId: 's7', correct: false, feedback: 'أسلوب غير رسمي — في الإدارة الجامعية استخدم "هل تُوجَد منح دراسية وما شروط الحصول عليها؟"' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'تُمنَح المنح الدراسية الكاملة للطلاب الحاصلين على أعلى النسب، وتُحدَّد معايير الاستحقاق سنوياً من قِبَل مجلس الجامعة.', translation: 'Full scholarships are granted to students with the highest grades, and eligibility criteria are determined annually by the university council.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Thank the officer and confirm next step:',
      options: [
        { text: 'أشكركم على هذه المعلومات القيِّمة. سأُكمل استيفاء طلب القبول الإلكتروني وأنتظر الرد الرسمي.', translation: 'I thank you for this valuable information. I will complete the electronic admission application and await the official response.', nextStepId: 's9', correct: true, feedback: '"استيفاء الطلب" تعبير أكاديمي رسمي ممتاز يعكس مستوى لغوياً متقدماً.' },
        { text: 'شكراً، بكمِّل التسجيل أونلاين.', translation: 'Thanks, I\'ll complete the registration online.', nextStepId: 's9', correct: false, feedback: '"بكمِّل" و"أونلاين" عاميان — قل "سأُكمل استيفاء الطلب إلكترونياً".' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'حسناً. يسعدنا استقبال طلبك. سيُعلَن عن نتائج القبول في الأسبوع الأول من الفصل الدراسي القادم. نتمنى لك التوفيق.', translation: 'Very well. We are pleased to receive your application. Admission results will be announced in the first week of the upcoming semester. We wish you success.', end: true },
  ],
  completionMessage: 'Excellent performance in a formal academic admissions context. Your MSA register and use of passive voice were accurate throughout.',
},

{
  id: 'saudi_convo_p9_business_pitch',
  phase: 9,
  title: 'Business Pitch',
  description: 'Present a business plan to a panel of investors using formal MSA.',
  focalWordIds: ['w_invest', 'w_market', 'w_profit', 'w_plan', 'w_opportunity', 'w_financial', 'w_growth', 'w_strategy'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'مرحباً بك أمام لجنة الاستثمار. يُرجى تقديم مشروعك بإيجاز واضح. لديك عشر دقائق.', translation: 'Welcome before the investment committee. Please present your project with clear brevity. You have ten minutes.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Open your pitch formally:',
      options: [
        { text: 'أُقدِّم اليوم مشروعاً مبتكراً يسعى إلى ملء فجوة حقيقية في سوق الخدمات اللوجستية التي تُقدَّر قيمتها بمليار ريال.', translation: 'I present today an innovative project that seeks to fill a real gap in the logistics services market estimated to be worth one billion riyals.', nextStepId: 's3', correct: true, feedback: '"يسعى إلى" و"تُقدَّر قيمتها" مبني للمجهول — لغة تجارية رسمية دقيقة.' },
        { text: 'مشروعي حلو جداً وفيه فلوس كثيرة للمستثمرين.', translation: 'My project is really nice and there\'s a lot of money for investors.', nextStepId: 's3b', correct: false, feedback: '"حلو" و"فلوس" عاميتان غير مناسبتين لعرض الأعمال — استخدم "مشروع واعد" و"عائد مالي مجزٍ".' },
        { text: 'يسعدني عرض هذه الفرصة الاستثمارية التي تستهدف قطاعاً سريع النمو ذا عائد مُتوقَّع مرتفع.', translation: 'It gives me pleasure to present this investment opportunity that targets a fast-growing sector with an expected high return.', nextStepId: 's3', correct: true, feedback: '"يسعدني" و"مُتوقَّع" مبني للمجهول — افتتاح تجاري رسمي ممتاز.' },
        { text: 'أبغى أعرض عليكم مشروع يكسب فلوس زيادة.', translation: 'I want to present to you a project that earns more money.', nextStepId: 's3b', correct: false, feedback: '"أبغى" و"فلوس زيادة" عاميتان — في عرض الأعمال الرسمي قل "أودّ تقديم فرصة استثمارية عائدها مرتفع".' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'ما الميزة التنافسية التي تُميِّز مشروعك عن المنافسين الحاليين في السوق؟', translation: 'What is the competitive advantage that distinguishes your project from current competitors in the market?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'يُرجى إعادة صياغة عرضك بأسلوب أكثر احترافية. ما الذي يُميِّز مشروعك تحديداً؟', translation: 'Please rephrase your presentation in a more professional manner. What specifically distinguishes your project?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Explain your competitive advantage:',
      options: [
        { text: 'تتمثَّل ميزتنا التنافسية في منصة تقنية حاصلة على براءة اختراع تُقلِّل التكاليف التشغيلية بنسبة أربعين بالمائة مقارنةً بالحلول التقليدية.', translation: 'Our competitive advantage consists of a patented technology platform that reduces operational costs by forty percent compared to traditional solutions.', nextStepId: 's5', correct: true, feedback: '"تتمثَّل في" و"حاصلة على" و"مقارنةً بـ" — لغة تجارية رسمية متقدمة.' },
        { text: 'مشروعنا أرخص وأحسن من غيره لأن التقنية لدينا أقوى.', translation: 'Our project is cheaper and better than others because our technology is stronger.', nextStepId: 's5', correct: false, feedback: '"أرخص وأحسن" وصف عامي — قل "يتميَّز بانخفاض التكاليف وتفوُّق المنصة التقنية".' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'ما حجم الاستثمار المطلوب وما الجدول الزمني المتوقَّع لتحقيق الربحية؟', translation: 'What is the required investment amount and what is the expected timeline for achieving profitability?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Present your financial projections:',
      options: [
        { text: 'نطلب تمويلاً بقيمة خمسة ملايين ريال على مرحلتين، ويُتوقَّع بلوغ نقطة التعادل في الربع الثالث من العام الثاني وفق نماذج الإيرادات المُعدَّة.', translation: 'We request financing of five million riyals in two stages, and the breakeven point is expected to be reached in the third quarter of the second year according to the prepared revenue models.', nextStepId: 's7', correct: true, feedback: '"يُتوقَّع" و"المُعدَّة" مبني للمجهول — عرض مالي رسمي دقيق ومقنع.' },
        { text: 'نحتاج خمسة ملايين ونكسب من الربع الثالث.', translation: 'We need five million and we profit from the third quarter.', nextStepId: 's7', correct: false, feedback: 'مختصر جداً وغير رسمي — في العرض الاستثماري فصِّل وأكِّد الأرقام بمصطلحات مالية.' },
        { text: 'يُطلَب استثمار أولي قدره خمسة ملايين ريال لإطلاق المرحلتين الأولى والثانية وتحقيق الربحية في غضون عامين.', translation: 'An initial investment of five million riyals is requested to launch the first and second phases and achieve profitability within two years.', nextStepId: 's7', correct: true, feedback: '"يُطلَب" مبني للمجهول صحيح — صياغة رسمية واضحة ومقنعة.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'هل أُجريت دراسة جدوى مُعتمَدة من جهة محايدة؟', translation: 'Was a feasibility study conducted accredited by a neutral party?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Confirm the feasibility study:',
      options: [
        { text: 'نعم، أُعِدَّت دراسة الجدوى من قِبَل شركة استشارات مستقلة مُعتمَدة لدى وزارة التجارة، وتوصَّلت نتائجها إلى إمكانية تحقيق عائد استثماري يتجاوز ثلاثين بالمائة.', translation: 'Yes, the feasibility study was prepared by an independent consulting firm accredited with the Ministry of Commerce, and its findings concluded the possibility of achieving an investment return exceeding thirty percent.', nextStepId: 's9', correct: true, feedback: '"أُعِدَّت" و"توصَّلت" مبني للمجهول — استخدام ممتاز للفعل المجهول في السياق التجاري الرسمي.' },
        { text: 'أيوه، عملنا دراسة وطلعت النتايج زينة.', translation: 'Yes, we did a study and the results came out good.', nextStepId: 's9', correct: false, feedback: '"أيوه" و"زينة" و"طلعت" عامية — قل "نعم، أُعدَّت دراسة الجدوى وكانت النتائج إيجابية".' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'شكراً على هذا العرض المنظَّم. سيُناقَش المشروع في اجتماع اللجنة القادم وستُبلَّغ بالقرار خلال أسبوعين. نتطلع إلى شراكة مثمرة.', translation: 'Thank you for this organized presentation. The project will be discussed at the next committee meeting and you will be notified of the decision within two weeks. We look forward to a fruitful partnership.', end: true },
  ],
  completionMessage: 'Excellent business pitch in formal MSA. You correctly used passive voice for financial projections and maintained professional register throughout.',
},

{
  id: 'saudi_convo_p9_radio_interview',
  phase: 9,
  title: 'Radio Interview',
  description: 'Participate in a live radio interview about social issues using formal MSA.',
  focalWordIds: ['w_society', 'w_issue', 'w_opinion', 'w_future', 'w_responsibility', 'w_change', 'w_community', 'w_solution'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'مستمعينا الكرام، يسعدنا استضافة ضيفنا الذي سيُدلي برأيه في أبرز القضايا الاجتماعية المُطروحة. أهلاً بك.', translation: 'Dear listeners, we are pleased to host our guest who will give his opinion on the most prominent social issues being discussed. Welcome.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Greet the audience formally:',
      options: [
        { text: 'شكراً جزيلاً على هذه الاستضافة الكريمة. يسعدني أن أتحدث إلى مستمعيكم حول القضايا التي تؤثر في مجتمعنا تأثيراً مباشراً.', translation: 'Thank you very much for this generous hosting. I am pleased to speak to your listeners about issues that directly affect our society.', nextStepId: 's3', correct: true, feedback: '"تأثيراً مباشراً" توكيد رسمي ممتاز — استخدمت المفعول المطلق بطريقة صحيحة.' },
        { text: 'شكراً، أنا مبسوط أني هنا أتكلم معكم.', translation: 'Thanks, I\'m happy to be here talking with you.', nextStepId: 's3b', correct: false, feedback: '"مبسوط" و"أتكلم معكم" عاميتان — في البرامج الرسمية استخدم "يسعدني" و"أتحدث إلى مستمعيكم".' },
        { text: 'الشكر لكم على هذه الفرصة التي تُتاح لمناقشة قضايا تمسّ شريحة واسعة من أبناء المجتمع.', translation: 'Thanks to you for this opportunity that is provided to discuss issues that touch a wide segment of community members.', nextStepId: 's3', correct: true, feedback: '"تُتاح" مبني للمجهول و"شريحة واسعة من أبناء المجتمع" مصطلح إعلامي رسمي دقيق.' },
        { text: 'يسرني الحضور، أبغى أتكلم عن مشاكل الشباب.', translation: 'I\'m pleased to attend, I want to talk about youth problems.', nextStepId: 's3b', correct: false, feedback: '"أبغى" عامية — استخدم "أودّ الحديث عن تحديات الشباب" في السياق الإذاعي الرسمي.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'ما تقييمك للتحولات الاجتماعية الكبرى التي يشهدها المجتمع في السنوات الأخيرة؟', translation: 'How do you assess the major social transformations being witnessed by society in recent years?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'دعنا نبدأ بسؤال محوري: كيف تنظر إلى التغيرات التي تحدث في مجتمعنا اليوم؟', translation: 'Let us begin with a pivotal question: how do you view the changes happening in our society today?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give your analysis of social change:',
      options: [
        { text: 'يمر مجتمعنا بمرحلة تحوُّل بنيوي عميق تتشابك فيه تأثيرات العولمة والتكنولوجيا والتحولات الديموغرافية التي تستوجب إعادة النظر في منظومة القيم الجمعية.', translation: 'Our society is passing through a deep structural transformation phase in which the influences of globalization, technology, and demographic shifts intertwine, requiring reconsideration of the collective values system.', nextStepId: 's5', correct: true, feedback: '"تستوجب" و"تتشابك فيه" جُمَل وصفية رسمية تدل على تمكُّن لغوي متقدم.' },
        { text: 'المجتمع تغيَّر كثير والناس صاروا مختلفين وعندهم أفكار جديدة.', translation: 'Society has changed a lot and people have become different and have new ideas.', nextStepId: 's5', correct: false, feedback: 'مقبول لكن عامي جداً — في البرامج الإذاعية الرسمية أضف عمقاً تحليلياً ومصطلحات اجتماعية.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'يُلاحَظ أن الجيل الشاب يحمل توقعات مغايرة لما كانت عليه الأجيال السابقة. ما رأيك في هذه الظاهرة؟', translation: 'It is noted that the young generation carries expectations different from what previous generations had. What is your view on this phenomenon?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Discuss generational change formally:',
      options: [
        { text: 'هذه الظاهرة طبيعية ومتوقَّعة في سياق المجتمعات المتطورة. الجيل الجديد الذي تشرَّب قيم الانفتاح يسعى إلى المشاركة الفاعلة في صنع القرار.', translation: 'This phenomenon is natural and expected in the context of developing societies. The new generation that has absorbed values of openness seeks effective participation in decision-making.', nextStepId: 's7', correct: true, feedback: '"تشرَّب" استعارة جميلة، و"المشاركة الفاعلة في صنع القرار" مصطلح سياسي اجتماعي رسمي.' },
        { text: 'الشباب الحين يبون أشياء كثيرة ويبون يشاركون في كل شيء.', translation: 'Youth nowadays want many things and want to participate in everything.', nextStepId: 's7', correct: false, feedback: '"يبون" عامية سعودية — في البرامج الرسمية قل "يسعى الشباب إلى" أو "يطمح الجيل الجديد إلى".' },
        { text: 'يتطلع الشباب الذي نشأ في عصر الرقمنة إلى قيادة التغيير لا الاكتفاء بالمتابعة السلبية.', translation: 'Youth who grew up in the age of digitization aspire to lead change rather than suffice with passive observation.', nextStepId: 's7', correct: true, feedback: '"الذي نشأ في" جملة وصلية رسمية ممتازة، و"الاكتفاء بالمتابعة السلبية" تعبير راقٍ.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'ما الدور الذي يجب أن تضطلع به المؤسسات لمواكبة هذه التحولات؟', translation: 'What role should institutions undertake to keep pace with these transformations?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Recommend institutional responses:',
      options: [
        { text: 'يُناط بالمؤسسات التعليمية والإعلامية مسؤولية إعداد منظومة متكاملة تُقدِّر الكفاءة وتُرسِّخ قيم الانتماء والمواطنة الفاعلة.', translation: 'Educational and media institutions are entrusted with the responsibility of preparing an integrated system that values competence and consolidates values of belonging and active citizenship.', nextStepId: 's9', correct: true, feedback: '"يُناط بـ" تعبير رسمي نادر وراقٍ، و"منظومة متكاملة" مصطلح مؤسسي دقيق.' },
        { text: 'الجامعات والإعلام لازم يساعدون الشباب ويعطوهم فرص أكثر.', translation: 'Universities and media must help youth and give them more opportunities.', nextStepId: 's9', correct: false, feedback: '"لازم" و"يعطوهم" عاميتان — استخدم "يجب على" و"يمنحوهم" في السياق الرسمي.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'كلمات مثيرة للتأمل. أشكرك على هذه الرؤية التحليلية العميقة وآراؤك القيِّمة التي أُذيعت على نطاق واسع. نتشرف باستضافتك مجدداً.', translation: 'Thought-provoking words. I thank you for this deep analytical vision and your valuable opinions that have been broadcast widely. We are honored to host you again.', end: true },
  ],
  completionMessage: 'Excellent radio interview performance. You maintained formal MSA register throughout and used advanced constructions like passive voice and relative clauses appropriately.',
},

{
  id: 'saudi_convo_p9_ministry_complaint',
  phase: 9,
  title: 'Ministry Complaint',
  description: 'File a formal complaint at a government ministry about a public service issue.',
  focalWordIds: ['w_complaint', 'w_official', 'w_government', 'w_service', 'w_rights', 'w_department', 'w_response', 'w_regulation'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً بك في مكتب استقبال الشكاوى والمقترحات. ما موضوع تظلُّمك؟', translation: 'Welcome to the complaints and suggestions reception office. What is the subject of your grievance?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'State your complaint formally:',
      options: [
        { text: 'أودّ تقديم شكوى رسمية بشأن تعطُّل الخدمة المُقدَّمة من الجهة الحكومية المعنية على مدى ثلاثة أشهر دون معالجة أو استجابة فعلية.', translation: 'I wish to file a formal complaint regarding the disruption of the service provided by the relevant government authority for three months without actual processing or response.', nextStepId: 's3', correct: true, feedback: '"تقديم شكوى رسمية بشأن" هو الأسلوب الرسمي الصحيح لتقديم الشكاوى الحكومية.' },
        { text: 'جيت أشتكي لأن الحكومة ما ساعدتني من ثلاثة أشهر.', translation: 'I came to complain because the government hasn\'t helped me for three months.', nextStepId: 's3b', correct: false, feedback: '"أشتكي" و"ما ساعدتني" عاميتان — في المكاتب الحكومية قل "أودّ تقديم شكوى بشأن تعطُّل الخدمة".' },
        { text: 'أتقدَّم بهذه الشكوى الرسمية إزاء تقصير الجهة المختصة في تقديم الخدمة الإلزامية التي يكفلها النظام.', translation: 'I submit this formal complaint regarding the shortcoming of the competent authority in providing the mandatory service guaranteed by regulations.', nextStepId: 's3', correct: true, feedback: '"إزاء" بدلاً من "بشأن" و"التي يكفلها النظام" جملة وصلية رسمية ممتازة.' },
        { text: 'عندي مشكلة مع الدائرة الحكومية ويبون يتجاهلونني.', translation: 'I have a problem with the government department and they want to ignore me.', nextStepId: 's3b', correct: false, feedback: '"يبون" و"يتجاهلونني" عاميتان — قل "قامت الجهة المعنية بالتقصير في الاستجابة".' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'يُرجى تحديد الجهة الحكومية المعنية وتفصيل طبيعة التقصير الذي حدث.', translation: 'Please specify the relevant government authority and detail the nature of the shortcoming that occurred.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'أحتاج إلى بيانات أوضح. ما الجهة الحكومية وما الخدمة التي تعطَّلت تحديداً؟', translation: 'I need clearer information. What is the government authority and what specific service was disrupted?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Provide specific details of the complaint:',
      options: [
        { text: 'تقصير أمانة المنطقة في صيانة شبكة الصرف الصحي التي تُشير الوثائق المُقدَّمة إلى أنها مُهمَلة منذ ما يزيد على ثلاثة أشهر مع الإخلال بمعايير الصحة العامة.', translation: 'The shortcoming of the regional municipality in maintaining the sewage network which the submitted documents indicate has been neglected for more than three months with violation of public health standards.', nextStepId: 's5', correct: true, feedback: '"التي تُشير الوثائق المُقدَّمة إلى أنها" جملة وصلية موسَّعة ممتازة تُظهر تمكُّناً في الفصحى.' },
        { text: 'أمانة المدينة ما نظَّفت شبكة المجاري من ثلاثة أشهر وهذا غلط.', translation: 'The city municipality hasn\'t cleaned the sewage network for three months and this is wrong.', nextStepId: 's5', correct: false, feedback: '"المجاري" عامية — استخدم "شبكة الصرف الصحي"، و"هذا غلط" ضعيف — قل "مما يُعدّ مخالفةً صريحة".' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'سيُسجَّل تظلُّمك ويُحال إلى الجهة المختصة. يُمنح رقم مرجعي لمتابعة الشكوى إلكترونياً.', translation: 'Your grievance will be recorded and referred to the competent authority. A reference number will be granted for following up on the complaint electronically.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Ask about resolution timeline:',
      options: [
        { text: 'ما المدة المنصوص عليها في الأنظمة للردّ الرسمي على الشكاوى، وما الإجراء المتَّبَع عند تجاوز هذه المدة؟', translation: 'What is the period stipulated in the regulations for official response to complaints, and what is the procedure followed when this period is exceeded?', nextStepId: 's7', correct: true, feedback: '"المنصوص عليها" و"المتَّبَع" مبني للمجهول — سؤال رسمي متقدم يُظهر معرفة بالحقوق القانونية.' },
        { text: 'كم يوم عندهم للرد؟ وإذا ما ردوا وش أسوي؟', translation: 'How many days do they have to respond? And if they don\'t respond what do I do?', nextStepId: 's7', correct: false, feedback: '"وش أسوي" عامية — قل "ما الخطوة التالية في حال عدم الاستجابة؟"' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'يُحدَّد بخمسة عشر يوم عمل وفق لائحة الشكاوى الصادرة عن ديوان المظالم. وفي حال الإخلال يُمكِّنك رفع شكوى استئنافية.', translation: 'It is set at fifteen working days according to the complaints regulation issued by the Board of Grievances. In case of violation you are enabled to file an appellate complaint.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Confirm and ask for documentation:',
      options: [
        { text: 'هل يمكن إصدار وثيقة رسمية تُثبت تسجيل الشكوى وتاريخها للاحتجاج بها عند الحاجة؟', translation: 'Can an official document be issued proving the complaint registration and its date to use as evidence when needed?', nextStepId: 's9', correct: true, feedback: '"للاحتجاج بها" تعبير قانوني رسمي ممتاز يعكس وعياً بالحقوق الإجرائية.' },
        { text: 'أبغى ورقة تقول إني اشتكيت.', translation: 'I want a paper saying I complained.', nextStepId: 's9', correct: false, feedback: '"أبغى" عامية — قل "أودّ الحصول على إيصال رسمي يُثبت تسجيل الشكوى".' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'تصدر وثيقة التسجيل آلياً عبر البوابة الإلكترونية ويُرسَل إليك نسخة منها فور إتمام القيد. حقوقك مكفولة بموجب الأنظمة المعمول بها.', translation: 'The registration document is issued automatically through the electronic portal and a copy will be sent to you immediately upon completing registration. Your rights are guaranteed under applicable regulations.', end: true },
  ],
  completionMessage: 'Well done navigating a formal government complaint in MSA. Your use of legal and administrative vocabulary and passive constructions was accurate throughout.',
},

{
  id: 'saudi_convo_p9_bank_loan_application',
  phase: 9,
  title: 'Bank Loan Application',
  description: 'Apply for a business loan at a bank using formal MSA.',
  focalWordIds: ['w_financial', 'w_bank', 'w_loan', 'w_guarantee', 'w_income', 'w_period', 'w_amount', 'w_approve'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً بك في قسم تمويل الأعمال. ما نوع التمويل الذي تسعى إليه؟', translation: 'Welcome to the Business Finance Department. What type of financing do you seek?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'State your loan request formally:',
      options: [
        { text: 'أتقدَّم بطلب للحصول على تمويل تجاري بغرض توسعة منشأتي الإنتاجية وتحديث البنية التحتية اللازمة للنمو.', translation: 'I am applying for commercial financing for the purpose of expanding my production facility and modernizing the infrastructure necessary for growth.', nextStepId: 's3', correct: true, feedback: '"أتقدَّم بطلب" هو التعبير الرسمي الصحيح لتقديم طلب القرض في البنوك.' },
        { text: 'أبغى قرض للتوسع في مشروعي.', translation: 'I want a loan for expanding my project.', nextStepId: 's3b', correct: false, feedback: '"أبغى" و"قرض" عاميتان نسبياً — في البنوك الرسمية استخدم "أتقدَّم بطلب تمويل" لغرض كذا.' },
        { text: 'أودّ تقديم طلب لتمويل مشروع توسعي يندرج ضمن استراتيجية النمو المؤسسي للشركة.', translation: 'I wish to submit an application for financing an expansion project that falls within the company\'s institutional growth strategy.', nextStepId: 's3', correct: true, feedback: '"يندرج ضمن" تعبير رسمي متقدم يُبيِّن الإطار الاستراتيجي للطلب.' },
        { text: 'جيت عشان آخذ قرض كبير للمشروع.', translation: 'I came to take a big loan for the project.', nextStepId: 's3b', correct: false, feedback: '"جيت عشان آخذ" عامي — في البنك الرسمي قل "أودّ تقديم طلب للحصول على تمويل".' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'ما الحجم التمويلي المطلوب والمدة الزمنية التي تتوقعها لسداد القرض؟', translation: 'What is the required financing amount and what repayment period do you anticipate?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'بإمكانك التأهُّل للتمويل. هل تخبرني بالمبلغ المطلوب ومدة السداد المقترحة؟', translation: 'You can qualify for financing. Can you tell me the required amount and proposed repayment period?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Specify the loan details:',
      options: [
        { text: 'أطلب تمويلاً بقيمة مليوني ريال يُسدَّد على مدى خمس سنوات وفق جدول دفعات يُعدَّل سنوياً بحسب الأداء المالي للمنشأة.', translation: 'I request financing of two million riyals to be repaid over five years according to a payment schedule adjusted annually based on the facility\'s financial performance.', nextStepId: 's5', correct: true, feedback: '"يُسدَّد" و"يُعدَّل" مبني للمجهول — استخدام دقيق ومتقدم في السياق المالي الرسمي.' },
        { text: 'مليونين ريال وأسدد في خمس سنوات.', translation: 'Two million riyals and I\'ll repay in five years.', nextStepId: 's5', correct: false, feedback: 'مقبول لكن بأسلوب عامي — فصِّل شروط السداد وأضف مصطلحات مالية لزيادة المصداقية.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'هل بحوزتك ضمانات مقبولة لدى البنك، كعقار أو أسهم، وما مصادر دخلك الرئيسية؟', translation: 'Do you have guarantees acceptable to the bank, such as real estate or shares, and what are your main income sources?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Present your collateral and income:',
      options: [
        { text: 'نعم، بحوزتي عقار تجاري مسجَّل في كتابة العدل تبلغ قيمته التقديرية ثلاثة ملايين ريال، فضلاً عن إيرادات سنوية موثَّقة تتجاوز خمسمائة ألف ريال.', translation: 'Yes, I have a commercial property registered at the notary with an estimated value of three million riyals, in addition to documented annual revenues exceeding five hundred thousand riyals.', nextStepId: 's7', correct: true, feedback: '"مسجَّل في كتابة العدل" و"القيمة التقديرية" و"فضلاً عن" — مصطلحات مالية ورسمية دقيقة جداً.' },
        { text: 'عندي بيت وشركتي فيها دخل كويس كل سنة.', translation: 'I have a house and my company has good income every year.', nextStepId: 's7', correct: false, feedback: '"عندي بيت" غير رسمي — قل "بحوزتي عقار" وحدِّد الإيرادات بأرقام موثَّقة.' },
        { text: 'أمتلك حصصاً في شركة قيمتها السوقية تتجاوز المبلغ المطلوب، ودخلاً تجارياً منتظماً يُثبت ملاءتي المالية.', translation: 'I own shares in a company whose market value exceeds the required amount, and regular commercial income that proves my financial solvency.', nextStepId: 's7', correct: true, feedback: '"الملاءة المالية" مصطلح بنكي رسمي ممتاز يُثبت تمكُّناً من لغة التمويل.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'سيُراجَع الطلب من قِبَل لجنة الائتمان وستُبلَّغ بالقرار خلال سبعة أيام عمل. هل لديك أسئلة؟', translation: 'The application will be reviewed by the credit committee and you will be notified of the decision within seven working days. Do you have questions?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Ask about the interest rate formally:',
      options: [
        { text: 'ما نسبة هامش الربح المعمول بها على هذا النوع من التمويل، وهل تُوجَد خيارات للتمويل الإسلامي الخالي من الفائدة؟', translation: 'What is the profit margin rate applied to this type of financing, and are there options for Islamic interest-free financing?', nextStepId: 's9', correct: true, feedback: '"هامش الربح" بدلاً من "الفائدة" مصطلح مالي إسلامي دقيق، و"تُوجَد خيارات" مبني للمجهول.' },
        { text: 'كم الفايدة؟ وفي إسلامي بدون ربا؟', translation: 'What\'s the interest? Is there an Islamic one without usury?', nextStepId: 's9', correct: false, feedback: '"الفايدة" عامي — استخدم "هامش الربح" أو "معدل العائد"، وصُغ السؤال بشكل رسمي.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'يُطبَّق على التمويل الإسلامي عقد المرابحة بهامش ربح يتراوح بين ثلاثة وستة بالمائة سنوياً وفق التقييم الائتماني. سيُوضَح ذلك في العرض الرسمي المُرسَل إليك.', translation: 'Islamic financing applies the Murabaha contract with a profit margin ranging between three and six percent annually according to the credit assessment. This will be clarified in the formal offer sent to you.', end: true },
  ],
  completionMessage: 'Excellent bank loan application. You used formal financial terminology correctly including Islamic finance terms and passive constructions throughout.',
},

{
  id: 'saudi_convo_p9_real_estate_purchase',
  phase: 9,
  title: 'Real Estate Purchase',
  description: 'Negotiate the purchase of a commercial property through formal legal and real estate procedures.',
  focalWordIds: ['w_property', 'w_price', 'w_contract', 'w_ownership', 'w_register', 'w_condition', 'w_negotiate', 'w_value'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً بك في مكتبنا العقاري. يُسعدنا مساعدتك في إتمام الصفقة العقارية. ما الذي يستأثر باهتمامك؟', translation: 'Welcome to our real estate office. We are pleased to help you complete the real estate transaction. What draws your interest?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Express interest in purchasing formally:',
      options: [
        { text: 'أودّ الاستفسار عن إجراءات شراء العقار التجاري الذي أُعلن عنه في صحيفتكم الإلكترونية، ولا سيَّما ما يتعلق بشروط العقد وحقوق الملكية.', translation: 'I wish to inquire about the procedures for purchasing the commercial property announced in your electronic publication, especially regarding the contract conditions and ownership rights.', nextStepId: 's3', correct: true, feedback: '"ولا سيَّما" تعبير رسمي راقٍ بمعنى "خاصةً"، واستخدمت "أُعلن عنه" مبني للمجهول بشكل صحيح.' },
        { text: 'شفت عقار عندكم وأبغى أشتريه، وش الشروط؟', translation: 'I saw a property with you and I want to buy it, what are the conditions?', nextStepId: 's3b', correct: false, feedback: '"أبغى" و"وش الشروط" عاميتان — قل "أودّ الاستفسار عن إجراءات الشراء والشروط التعاقدية".' },
        { text: 'يهمني اقتناء العقار التجاري المعروض وأطلب الاطلاع على شروطه القانونية والمالية كاملةً.', translation: 'I am interested in acquiring the offered commercial property and I request to review its complete legal and financial conditions.', nextStepId: 's3', correct: true, feedback: '"اقتناء" أرقى من "شراء" في السياق الرسمي، و"المعروض" مبني للمجهول.' },
        { text: 'أبغى أعرف السعر وكيف أسجله باسمي.', translation: 'I want to know the price and how to register it in my name.', nextStepId: 's3b', correct: false, feedback: '"أبغى أعرف" عامي — استخدم "أودّ الاستعلام عن السعر وإجراءات نقل الملكية".' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'هذا العقار التجاري البالغة مساحته ألف متر مربع قيمته المطلوبة خمسة ملايين ريال. يُشترط إجراء فحص هندسي مُعتمَد قبل توقيع العقد.', translation: 'This commercial property with an area of one thousand square meters has an asking price of five million riyals. An accredited engineering inspection is required before signing the contract.', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'العقار بخمسة ملايين ريال ومساحته ألف متر. لكي يُتمَّ البيع رسمياً يلزم فحص هندسي وعقد موثَّق.', translation: 'The property is five million riyals with an area of one thousand square meters. For the sale to be officially completed, an engineering inspection and documented contract are required.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Negotiate the price formally:',
      options: [
        { text: 'السعر المطلوب يتجاوز التقييم السوقي المعتاد لهذه المنطقة. أُقترح مراجعته في ضوء التقرير الهندسي المُستقل الذي سيُعدّ على نفقتي.', translation: 'The asking price exceeds the usual market valuation for this area. I propose reviewing it in light of the independent engineering report to be prepared at my expense.', nextStepId: 's5', correct: true, feedback: '"أُقترح مراجعته" تفاوض رسمي حضاري، و"سيُعدّ" مبني للمجهول صحيح.' },
        { text: 'السعر عالي، أقدر أنزِّله شوي؟', translation: 'The price is high, can I lower it a bit?', nextStepId: 's5', correct: false, feedback: '"أنزِّله شوي" عامي — في التفاوض الرسمي قل "أودّ مناقشة السعر في ضوء التقييم السوقي".' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'هذا طلب معقول. يُمكِن تعيين خبير تقييم مُعتمَد لدى وزارة العدل لتحديد القيمة الفعلية بشكل موضوعي.', translation: 'That is a reasonable request. It is possible to appoint an appraiser accredited with the Ministry of Justice to determine the actual value objectively.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Ask about ownership transfer procedures:',
      options: [
        { text: 'ما الإجراءات المتَّبَعة لنقل الملكية رسمياً، وهل تُوجَد رسوم حكومية تترتَّب على تسجيل العقار؟', translation: 'What are the procedures followed for officially transferring ownership, and are there government fees resulting from property registration?', nextStepId: 's7', correct: true, feedback: '"المتَّبَعة" و"تُوجَد" مبني للمجهول — سؤال رسمي دقيق يُظهر فهم إجراءات التسجيل العقاري.' },
        { text: 'كيف أنقل العقار لاسمي وكم الرسوم؟', translation: 'How do I transfer the property to my name and how much are the fees?', nextStepId: 's7', correct: false, feedback: 'مقبول لكن عامي — قل "ما إجراءات نقل الملكية وما الرسوم المترتبة؟"' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'تُنقَل الملكية عبر كتابة العدل بعد سداد رسم التسجيل البالغ اثنين ونصف بالمائة من قيمة العقد. يُستغرق الإجراء ثلاثة أيام عمل.', translation: 'Ownership is transferred through the notary after paying the registration fee of two and a half percent of the contract value. The procedure takes three working days.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Confirm your intention to proceed:',
      options: [
        { text: 'بناءً على نتائج التقييم الهندسي المستقل، أُعلن موافقتي المبدئية على المضي في إجراءات الشراء وتوقيع عقد البيع المعتمَد.', translation: 'Based on the results of the independent engineering assessment, I declare my preliminary approval to proceed with the purchase procedures and sign the accredited sale contract.', nextStepId: 's9', correct: true, feedback: '"بناءً على" و"أُعلن موافقتي المبدئية" — تعبيرات تعاقدية رسمية ممتازة.' },
        { text: 'زين، إذا التقييم طلع معقول أوافق وأوقع العقد.', translation: 'Good, if the assessment comes out reasonable I\'ll agree and sign the contract.', nextStepId: 's9', correct: false, feedback: '"زين" و"طلع معقول" عاميتان — في العقود الرسمية استخدم "في حال اعتدال نتائج التقييم أُبدي موافقتي".' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'ممتاز. سيُرتَّب موعد التقييم ويُوقَّع الاتفاق الابتدائي بحضور مستشار قانوني. نتطلع إلى إتمام هذه الصفقة بنجاح.', translation: 'Excellent. The assessment appointment will be arranged and the preliminary agreement will be signed in the presence of a legal adviser. We look forward to successfully completing this transaction.', end: true },
  ],
  completionMessage: 'Outstanding real estate negotiation in formal MSA. You correctly used passive voice for legal procedures and maintained formal register throughout the transaction.',
},

{
  id: 'saudi_convo_p9_speech_at_event',
  phase: 9,
  title: 'Speech at Formal Event',
  description: 'Deliver and respond to a formal speech at a national conference in MSA.',
  focalWordIds: ['w_honor', 'w_achievement', 'w_nation', 'w_progress', 'w_responsibility', 'w_future', 'w_leader', 'w_vision'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تشرَّف المؤتمر باستضافتكم. يُتشوَّق الحضور لكلمتكم حول رؤية المملكة للتنمية المستدامة. تفضلوا بالحديث.', translation: 'The conference is honored by your presence. The audience eagerly awaits your speech on the Kingdom\'s vision for sustainable development. Please speak.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Open your speech formally:',
      options: [
        { text: 'أصحاب المعالي والسعادة، أيها الحضور الكريم، يسعدني أن أُخاطبكم في هذا الملتقى المتميَّز الذي يُعقد في وقت تشهد فيه بلادنا تحولات تاريخية غير مسبوقة.', translation: 'Your Excellencies and Honorables, esteemed attendees, it pleases me to address you in this distinguished forum being held at a time when our country witnesses unprecedented historical transformations.', nextStepId: 's3', correct: true, feedback: '"أيها الحضور الكريم" افتتاح خطابي رسمي كلاسيكي، و"يُعقد" مبني للمجهول صحيح.' },
        { text: 'مرحبا بالجميع، أنا مسرور إني هنا أتكلم معكم عن رؤية المملكة.', translation: 'Hello everyone, I\'m happy to be here talking with you about the Kingdom\'s vision.', nextStepId: 's3b', correct: false, feedback: '"مرحبا" و"مسرور إني هنا" غير رسميتين للمؤتمرات — افتتح بـ"أيها الحضور الكريم" وألقاب رسمية.' },
        { text: 'يُشرِّفني أن أقف أمام هذا الجمع النخبوي لأُسهم في الحوار الوطني حول مستقبل التنمية.', translation: 'It honors me to stand before this elite gathering to contribute to the national dialogue on the future of development.', nextStepId: 's3', correct: true, feedback: '"يُشرِّفني" و"الجمع النخبوي" و"الحوار الوطني" — مصطلحات خطابية رسمية متقدمة.' },
        { text: 'كلنا مبسوطين في هذا المؤتمر ونبي نتكلم عن رؤية 2030.', translation: 'We\'re all happy at this conference and we want to talk about Vision 2030.', nextStepId: 's3b', correct: false, feedback: '"مبسوطين" و"نبي" عاميتان — في الخطابات الرسمية لا يُقبل الأسلوب العامي أبداً.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'كلمات مُوحية. كيف توصف ما أُنجز في إطار رؤية 2030 خلال السنوات الماضية؟', translation: 'Inspiring words. How do you describe what has been accomplished within Vision 2030 during past years?', next: 's4' },
    { id: 's3b', speaker: 'partner', text: 'شكراً. هل بإمكانك تناول ما تحقَّق في إطار رؤية التنمية بأسلوب أكثر رسمية؟', translation: 'Thank you. Can you address what has been achieved within the development vision in a more formal manner?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Describe national achievements formally:',
      options: [
        { text: 'حُقِّقت في إطار الرؤية إنجازات نوعية يُشهد لها على المستوى الدولي، إذ وُضعت المملكة في مصافّ الاقتصادات الأسرع نمواً كما أُعلن في التقارير الدولية الكبرى.', translation: 'Qualitative achievements have been accomplished within the Vision framework that are internationally recognized, as the Kingdom has been placed among the fastest-growing economies as announced in major international reports.', nextStepId: 's5', correct: true, feedback: '"حُقِّقت" و"وُضعت" و"أُعلن" — ثلاثة أفعال مبني للمجهول في جملة واحدة تعكس إتقاناً للفصحى الرسمية.' },
        { text: 'رؤية 2030 حققت أشياء كثيرة وصارت المملكة معروفة أكثر في العالم.', translation: 'Vision 2030 achieved many things and the Kingdom became more known in the world.', nextStepId: 's5', correct: false, feedback: 'عامي وضعيف للخطاب الرسمي — استخدم مبني للمجهول وأرقاماً وتعابير راسخة.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'ما التحديات التي لا تزال تواجه مسيرة التنمية وفق تقديرك؟', translation: 'What challenges still face the development march according to your assessment?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Discuss development challenges formally:',
      options: [
        { text: 'يُعدّ توطين الكفاءات الوطنية وتحقيق توازن بين متطلبات التنويع الاقتصادي وضغوط المرحلة الانتقالية من أبرز التحديات التي تستوجب التصدي لها بمقاربات مبتكرة.', translation: 'Localizing national competencies and achieving a balance between economic diversification requirements and transitional phase pressures are among the most prominent challenges that require being addressed with innovative approaches.', nextStepId: 's7', correct: true, feedback: '"يُعدّ" مبني للمجهول و"تستوجب التصدي لها" — خطاب تنموي رسمي على أعلى مستوى.' },
        { text: 'في تحديات كثيرة مثل البطالة وما فيه ما يكفي من وظايف للسعوديين.', translation: 'There are many challenges like unemployment and there aren\'t enough jobs for Saudis.', nextStepId: 's7', correct: false, feedback: '"ما فيه" و"وظايف" عاميتان — في الخطاب الوطني الرسمي استخدم "البطالة الهيكلية" و"فرص العمل للمواطنين".' },
        { text: 'لا يخفى على المتتبعين أن تحديات التحول الهيكلي تظل ماثلة وتستوجب رصانةً في التخطيط وصبراً استراتيجياً.', translation: 'It is not hidden from observers that structural transformation challenges remain present and require planning soundness and strategic patience.', nextStepId: 's7', correct: true, feedback: '"لا يخفى على المتتبعين" ترقية خطابية، و"تظل ماثلة" تعبير خطابي راقٍ.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'ما رسالتك لجيل الشباب الذين هم عدَّة الوطن ومستقبله؟', translation: 'What is your message to the youth generation who are the nation\'s asset and its future?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Deliver a formal message to youth:',
      options: [
        { text: 'أُوصي شباب هذا الوطن بأن يستلهموا من إرث أسلافهم حافزاً للإبداع، وأن يُدركوا أن التاريخ يُصنَع بالعمل الجاد والانتماء الصادق لا بالانتظار السلبي.', translation: 'I advise the youth of this nation to draw inspiration from their ancestors\' legacy as a motivation for creativity, and to realize that history is made through hard work and sincere belonging, not passive waiting.', nextStepId: 's9', correct: true, feedback: '"يُصنَع" مبني للمجهول ممتاز، و"يستلهموا" فعل أسلوبي خطابي راقٍ.' },
        { text: 'قول للشباب إن يشتغلون كثير ويحبون وطنهم.', translation: 'Tell the youth to work a lot and love their homeland.', nextStepId: 's9', correct: false, feedback: '"قول" و"يشتغلون" عاميتان — في الخطاب الرسمي استخدم "أُوصي الشباب بالعمل الدؤوب وتعزيز الانتماء".' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'كلمة تليق بعظمة هذا المنبر. أُعلَن إشادة المؤتمر بهذه الرؤية الاستراتيجية المتكاملة، وسيُتضمَّن خطابكم في وثيقة المؤتمر الختامية. شكراً جزيلاً.', translation: 'A speech befitting the greatness of this podium. The conference\'s commendation of this integrated strategic vision is declared, and your speech will be included in the conference\'s closing document. Thank you very much.', end: true },
  ],
  completionMessage: 'Exceptional formal speech performance. You mastered the high register of national conference oratory with passive voice, relative clauses, and elevated vocabulary throughout.',
}