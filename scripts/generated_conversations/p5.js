{
  id: 'saudi_convo_p5_market_haggle',
  phase: 5,
  title: 'Haggling at the Market',
  description: 'Negotiate the price of a handmade item at an open-air souq.',
  focalWordIds: ['w_howmuch', 'w_expensive', 'w_cheap', 'w_discount', 'w_money', 'w_riyal'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! تفضل، شوف البضاعة.', translation: 'Hey! Come in, have a look at the goods.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask the price of a rug you like:',
      options: [
        { text: 'هذي السجادة بكم؟', translation: 'How much is this rug?', nextStepId: 's3', correct: true, feedback: 'بكم is the Saudi way to ask a price — perfect.' },
        { text: 'كم ثمن هذه السجادة؟', translation: 'What is the price of this rug?', nextStepId: 's3', correct: false, feedback: 'ثمن and هذه are MSA. In Saudi dialect say بكم and هذي.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'بثلاثمية ريال.', translation: 'Three hundred riyals.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'The price seems high — respond:',
      options: [
        { text: 'غالي! عندك خصم؟', translation: 'Expensive! Do you have a discount?', nextStepId: 's5', correct: true, feedback: 'غالي and خصم are core Phase 5 transactional words.' },
        { text: 'السعر مرتفع جداً.', translation: 'The price is very high.', nextStepId: 's5', correct: false, feedback: 'مرتفع is MSA. Saudi speakers say غالي مرة.' },
        { text: 'أبغى أفكر.', translation: 'I want to think about it.', nextStepId: 's5', correct: false, feedback: 'That delays the haggle. Try asking for a discount directly with غالي!' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'أحسن سعر مئتين وخمسين. آخر سعر والله!', translation: 'Best price is 250. Final price, I swear!', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Counter-offer or accept:',
      options: [
        { text: 'مئتين ريال وآخذها.', translation: 'Two hundred riyals and I\'ll take it.', nextStepId: 's7', correct: true, feedback: 'Solid counter-offer using آخذها — natural Saudi buying expression.' },
        { text: 'حسناً، سأشتريها بهذا السعر.', translation: 'OK, I will buy it at this price.', nextStepId: 's7', correct: false, feedback: 'سأشتريها is MSA. Say آخذها or اشتريها in Saudi dialect.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'ماشي، بمئتين وعشرين. خلصنا بالفلوس كاش ولا بطاقة؟', translation: 'OK, 220. Are we done — cash or card?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Choose payment method:',
      options: [
        { text: 'كاش، تفضل.', translation: 'Cash, here you go.', nextStepId: 's9', correct: true, feedback: 'كاش is standard Saudi transactional vocab.' },
        { text: 'أدفع بالبطاقة.', translation: 'I\'ll pay by card.', nextStepId: 's9', correct: true, feedback: 'أدفع بالبطاقة is also correct and natural.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'مشكور! الله يبارك فيك.', translation: 'Thank you! God bless you.', end: true },
  ],
  completionMessage: 'Great haggling! You used بكم, غالي, خصم, and كاش like a pro.',
},

{
  id: 'saudi_convo_p5_buy_thobe',
  phase: 5,
  title: 'Buying a Thobe',
  description: 'Shop for a traditional Saudi thobe at a clothing store.',
  focalWordIds: ['w_howmuch', 'w_expensive', 'w_discount', 'w_buy', 'w_riyal', 'w_pay'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا بك! تبغى ثوب؟', translation: 'Welcome! Are you looking for a thobe?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Tell him what you want:',
      options: [
        { text: 'أبغى ثوب أبيض، مقاس وسط.', translation: 'I want a white thobe, medium size.', nextStepId: 's3', correct: true, feedback: 'أبغى is the correct Saudi form; مقاس وسط is natural transactional vocab.' },
        { text: 'أريد ثوباً أبيضاً من الحجم المتوسط.', translation: 'I want a white thobe in medium size.', nextStepId: 's3', correct: false, feedback: 'أريد and the case endings are MSA. In Saudi say أبغى ثوب أبيض مقاس وسط.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'تفضل، هذا الثوب ممتاز. قطن مئة بالمئة. بمئة وثمانين ريال.', translation: 'Here, this thobe is excellent. 100% cotton. For 180 riyals.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Respond to the price:',
      options: [
        { text: 'غالي شوي. في خصم؟', translation: 'A bit expensive. Is there a discount?', nextStepId: 's5', correct: true, feedback: 'غالي شوي softens the complaint — very Saudi. في خصم is natural.' },
        { text: 'هذا السعر مرتفع قليلاً.', translation: 'This price is a bit high.', nextStepId: 's5', correct: false, feedback: 'مرتفع is MSA. Use غالي شوي for Saudi register.' },
        { text: 'زين، آخذه.', translation: 'Fine, I\'ll take it.', nextStepId: 's5', correct: false, feedback: 'You could try for a discount first — غالي شوي!' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'خصم عشرة بالمئة. يصير بمئة وستين ريال.', translation: 'Ten percent off. That makes 160 riyals.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Accept and ask to try it on:',
      options: [
        { text: 'زين، بجرب الثوب أولاً.', translation: 'OK, I\'ll try the thobe on first.', nextStepId: 's7', correct: true, feedback: 'بجرب (I\'ll try) is the Saudi present-future form — correct.' },
        { text: 'حسناً. هل يمكنني تجربته؟', translation: 'OK. Can I try it on?', nextStepId: 's7', correct: false, feedback: 'هل يمكنني is MSA. Say بجرب or ممكن أجرب in Saudi dialect.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'طبعاً! غرفة القياس على اليمين.', translation: 'Of course! The fitting room is on the right.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'After trying — you like it. Pay:',
      options: [
        { text: 'تمام، آخذه. أدفع بالبطاقة.', translation: 'Great, I\'ll take it. I\'ll pay by card.', nextStepId: 's9', correct: true, feedback: 'تمام and أدفع are natural Saudi transaction closers.' },
        { text: 'إنه جيد. سأدفع نقداً.', translation: 'It is good. I will pay cash.', nextStepId: 's9', correct: false, feedback: 'إنه جيد and سأدفع are MSA. Use تمام and كاش.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'هلا، اتفضل الفاتورة. يعطيك العافية!', translation: 'Here is your receipt. Enjoy it!', end: true },
  ],
  completionMessage: 'Well done! You bought a thobe using real Saudi shopping phrases.',
},

{
  id: 'saudi_convo_p5_buy_abaya',
  phase: 5,
  title: 'Buying an Abaya',
  description: 'Shop for an abaya at a women\'s clothing boutique.',
  focalWordIds: ['w_howmuch', 'w_expensive', 'w_cheap', 'w_buy', 'w_money', 'w_riyal'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً! تبغين عباية؟', translation: 'Welcome! Are you looking for an abaya?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Tell her what style you want:',
      options: [
        { text: 'أبغى عباية سوداء بسيطة.', translation: 'I want a simple black abaya.', nextStepId: 's3', correct: true, feedback: 'أبغى and بسيطة are natural — good Saudi register.' },
        { text: 'أريد عباءة سوداء بسيطة.', translation: 'I want a simple black abaya.', nextStepId: 's3', correct: false, feedback: 'أريد is MSA. In Saudi say أبغى. Also عباية not عباءة in everyday speech.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'عندنا هذا الموديل الجديد. حرير طبيعي. بثلاثمية وخمسين ريال.', translation: 'We have this new style. Natural silk. For 350 riyals.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'The price is too high — respond:',
      options: [
        { text: 'غالي مرة! في شي أرخص؟', translation: 'Very expensive! Is there something cheaper?', nextStepId: 's5', correct: true, feedback: 'غالي مرة intensifies the complaint naturally. أرخص is good comparative.' },
        { text: 'السعر مرتفع جداً. هل عندك شيء أقل سعراً؟', translation: 'The price is very high. Do you have something cheaper?', nextStepId: 's5', correct: false, feedback: 'مرتفع is MSA. Say غالي مرة and أرخص for Saudi register.' },
        { text: 'بكم العباية الثانية؟', translation: 'How much is the other abaya?', nextStepId: 's5', correct: false, feedback: 'بكم is correct! But be more direct — try غالي مرة first.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'عندنا موديل ثاني قطن بمئتين ريال. رخيص وجودة زينة.', translation: 'We have another cotton style for 200 riyals. Cheap and good quality.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Compare both options:',
      options: [
        { text: 'الحريري أحسن بس غالي. خذي الحريري بمئتين وثمانين؟', translation: 'The silk is better but expensive. Will you take 280 for the silk?', nextStepId: 's7', correct: true, feedback: 'أحسن is the Saudi comparative "better" — natural haggling.' },
        { text: 'الحريري أفضل لكنه أغلى. يمكنك تخفيض السعر؟', translation: 'The silk is better but more expensive. Can you lower the price?', nextStepId: 's7', correct: false, feedback: 'أفضل and يمكنك are MSA. Saudi: أحسن and تقدري تنزلين السعر.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'ماشي، بثلاثمية. آخر سعر.', translation: 'OK, 300. Final price.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Accept the deal:',
      options: [
        { text: 'تمام، آخذ الحريري بثلاثمية. كاش.', translation: 'OK, I\'ll take the silk for 300. Cash.', nextStepId: 's9', correct: true, feedback: 'Perfect — تمام, آخذ, and كاش are all Saudi transaction finishers.' },
        { text: 'حسناً، سأشتري الحريري.', translation: 'OK, I will buy the silk one.', nextStepId: 's9', correct: false, feedback: 'سأشتري is MSA. Say آخذ or اشتريت in Saudi speech.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'ممتاز! الله يعطيك العافية. الفاتورة معك.', translation: 'Excellent! God give you strength. Here is your receipt.', end: true },
  ],
  completionMessage: 'Great shopping trip! You navigated price comparison and haggling beautifully.',
},

{
  id: 'saudi_convo_p5_return_item',
  phase: 5,
  title: 'Returning an Item',
  description: 'Return a shirt you bought yesterday because the size is wrong.',
  focalWordIds: ['w_receipt', 'w_money', 'w_buy', 'w_pay', 'w_riyal', 'w_discount'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! كيف أقدر أساعدك؟', translation: 'Hey! How can I help you?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Explain you want to return something:',
      options: [
        { text: 'أبغى أرجع هذا القميص، المقاس ما ناسب.', translation: 'I want to return this shirt, the size didn\'t fit.', nextStepId: 's3', correct: true, feedback: 'أبغى أرجع is natural Saudi phrasing for a return request.' },
        { text: 'أريد إرجاع هذا القميص لأن المقاس غير مناسب.', translation: 'I want to return this shirt because the size is unsuitable.', nextStepId: 's3', correct: false, feedback: 'أريد إرجاع and لأن are MSA. Saudi: أبغى أرجع and ما ناسب.' },
        { text: 'هذا القميص غلط.', translation: 'This shirt is wrong.', nextStepId: 's3', correct: false, feedback: 'A bit vague — explain the reason: المقاس ما ناسب.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'عندك الفاتورة؟', translation: 'Do you have the receipt?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Respond about the receipt:',
      options: [
        { text: 'أيوه، تفضل الفاتورة.', translation: 'Yes, here is the receipt.', nextStepId: 's5', correct: true, feedback: 'أيوه is the natural Saudi affirmative — correct.' },
        { text: 'نعم، هذه هي الفاتورة.', translation: 'Yes, here is the receipt.', nextStepId: 's5', correct: false, feedback: 'نعم is MSA formal. In Saudi conversation say أيوه.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تمام. نقدر نبدل المقاس أو نرد لك الفلوس. إيش تبغى؟', translation: 'OK. We can exchange the size or refund your money. Which do you prefer?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Choose: exchange or refund:',
      options: [
        { text: 'أبغى أبدل المقاس. عندكم مقاس كبير؟', translation: 'I want to exchange the size. Do you have a large?', nextStepId: 's7', correct: true, feedback: 'أبدل المقاس is idiomatic Saudi exchange language.' },
        { text: 'أبغى فلوسي راجعة.', translation: 'I want my money back.', nextStepId: 's7', correct: true, feedback: 'فلوسي راجعة is natural Saudi for "give me a refund".' },
        { text: 'أريد استرداد المبلغ.', translation: 'I want to recover the amount.', nextStepId: 's7', correct: false, feedback: 'استرداد المبلغ is MSA/formal. Say أبغى فلوسي راجعة.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'تفضل، مقاس كبير. جرب وشوف.', translation: 'Here, a large. Try it and see.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'The large fits perfectly — respond:',
      options: [
        { text: 'تمام، هذا يناسب. شكراً.', translation: 'Great, this fits. Thank you.', nextStepId: 's9', correct: true, feedback: 'تمام is the go-to Saudi approval word — perfect.' },
        { text: 'هذا المقاس مناسب، شكراً جزيلاً.', translation: 'This size is suitable, thank you very much.', nextStepId: 's9', correct: false, feedback: 'مناسب works but شكراً جزيلاً is quite formal. Say تمام, يسلموا.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'العفو! الله يسلمك.', translation: 'You\'re welcome! God keep you safe.', end: true },
  ],
  completionMessage: 'Excellent! You handled a return smoothly using Saudi vocabulary.',
},

{
  id: 'saudi_convo_p5_pay_with_card',
  phase: 5,
  title: 'Paying by Card',
  description: 'Complete a purchase at a shop using your bank card.',
  focalWordIds: ['w_pay', 'w_money', 'w_receipt', 'w_riyal', 'w_discount'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'تفضل، المجموع مئة وعشرين ريال.', translation: 'Here you go, the total is 120 riyals.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask if they accept card:',
      options: [
        { text: 'تقبلون بطاقة؟', translation: 'Do you accept card?', nextStepId: 's3', correct: true, feedback: 'تقبلون بطاقة is the natural Saudi question for card payment.' },
        { text: 'هل تقبلون الدفع ببطاقة الائتمان؟', translation: 'Do you accept payment by credit card?', nextStepId: 's3', correct: false, feedback: 'هل تقبلون... is MSA-formal. Say تقبلون بطاقة? simply.' },
        { text: 'عندك مكينة الشبكة؟', translation: 'Do you have a card machine?', nextStepId: 's3', correct: true, feedback: 'Excellent! مكينة الشبكة is the Saudi term for the POS card machine.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'أيوه، عندنا الشبكة. تفضل.', translation: 'Yes, we have the card machine. Go ahead.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Tap your card and check the amount:',
      options: [
        { text: 'مئة وعشرين صح؟ تفضل.', translation: 'One twenty, right? Here you go.', nextStepId: 's5', correct: true, feedback: 'Confirming the amount before tapping is smart and natural.' },
        { text: 'سأقوم بالدفع الآن.', translation: 'I will make the payment now.', nextStepId: 's5', correct: false, feedback: 'سأقوم is MSA. Just say أدفع now or tap and say تفضل.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تم الدفع! تبغى الفاتورة؟', translation: 'Payment done! Do you want the receipt?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Respond about the receipt:',
      options: [
        { text: 'أيوه، عطني الفاتورة من فضلك.', translation: 'Yes, give me the receipt please.', nextStepId: 's7', correct: true, feedback: 'عطني is the Saudi imperative for "give me" — natural and direct.' },
        { text: 'لا، ما أحتاجها.', translation: 'No, I don\'t need it.', nextStepId: 's7', correct: true, feedback: 'ما أحتاجها is natural Saudi negation — correct.' },
        { text: 'نعم، أريد الفاتورة.', translation: 'Yes, I want the receipt.', nextStepId: 's7', correct: false, feedback: 'أريد is MSA. Say أبغى الفاتورة or عطني الفاتورة.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'تفضل الفاتورة. شكراً لك!', translation: 'Here is the receipt. Thank you!', end: true },
  ],
  completionMessage: 'Perfect card payment! You used key Phase 5 payment vocabulary throughout.',
},

{
  id: 'saudi_convo_p5_cafe_full_order',
  phase: 5,
  title: 'Full Café Order',
  description: 'Order drinks and a snack at a Saudi café, then pay the bill.',
  focalWordIds: ['w_howmuch', 'w_pay', 'w_receipt', 'w_money', 'w_riyal', 'w_want'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً وسهلاً! إيش تبغى تشرب؟', translation: 'Welcome! What would you like to drink?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Order coffee and ask about snacks:',
      options: [
        { text: 'قهوة عربية وشي خفيف. عندكم كيك؟', translation: 'Arabic coffee and something light. Do you have cake?', nextStepId: 's3', correct: true, feedback: 'Ordering in Saudi style — direct and conversational.' },
        { text: 'أريد قهوة عربية من فضلك.', translation: 'I would like Arabic coffee please.', nextStepId: 's3', correct: false, feedback: 'أريد is MSA. In Saudi say أبغى قهوة عربية.' },
        { text: 'أبغى قهوة وكيك تشيز.', translation: 'I want a coffee and cheesecake.', nextStepId: 's3', correct: true, feedback: 'أبغى is the correct Saudi want verb — great.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'عندنا كيك تشيز وكرواسون. إيش تبغى؟', translation: 'We have cheesecake and croissants. What do you want?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Choose your snack:',
      options: [
        { text: 'كيك تشيز, يسلموا.', translation: 'Cheesecake, thank you.', nextStepId: 's5', correct: true, feedback: 'يسلموا is the warm Saudi thank-you — natural here.' },
        { text: 'سآخذ الكرواسون.', translation: 'I will take the croissant.', nextStepId: 's5', correct: false, feedback: 'سآخذ is MSA future. Saudi: آخذ الكرواسون.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'حاضر! بجيب لك الطلب بعد دقيقتين.', translation: 'Right away! I\'ll bring your order in two minutes.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'After finishing, ask for the bill:',
      options: [
        { text: 'الفاتورة لو سمحت.', translation: 'The bill please.', nextStepId: 's7', correct: true, feedback: 'الفاتورة is the right word for bill/receipt in this context.' },
        { text: 'الحساب لو سمحت.', translation: 'The bill please.', nextStepId: 's7', correct: true, feedback: 'الحساب is also very natural Saudi for "the check please".' },
        { text: 'كم المبلغ الإجمالي؟', translation: 'What is the total amount?', nextStepId: 's7', correct: false, feedback: 'المبلغ الإجمالي is MSA. Say بكم الكل? or الفاتورة لو سمحت.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'الفاتورة خمسة وثلاثين ريال. كاش ولا شبكة؟', translation: 'The bill is 35 riyals. Cash or card?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Pay and optionally leave a tip:',
      options: [
        { text: 'كاش. تفضل خمسين، الباقي للبقشيش.', translation: 'Cash. Here\'s fifty, the rest is a tip.', nextStepId: 's9', correct: true, feedback: 'الباقي للبقشيش — using two key Phase 5 words at once!' },
        { text: 'شبكة. أدفع بالبطاقة.', translation: 'Card. I\'ll pay by card.', nextStepId: 's9', correct: true, feedback: 'أدفع بالبطاقة is natural.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'مشكور، يعطيك العافية!', translation: 'Thank you, enjoy your day!', end: true },
  ],
  completionMessage: 'You ordered and paid at the café like a local. Excellent Saudi dialect!',
},

{
  id: 'saudi_convo_p5_restaurant_order',
  phase: 5,
  title: 'Restaurant Order',
  description: 'Order a meal at a Saudi restaurant and settle the bill.',
  focalWordIds: ['w_howmuch', 'w_pay', 'w_receipt', 'w_money', 'w_riyal', 'w_want'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً! إيش تبغى تطلب؟', translation: 'Welcome! What would you like to order?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Order a main dish:',
      options: [
        { text: 'أبغى كبسة دجاج وسلطة.', translation: 'I want chicken kabsa and a salad.', nextStepId: 's3', correct: true, feedback: 'أبغى is the correct Saudi verb — natural order.' },
        { text: 'أطلب كبسة دجاج.', translation: 'I order chicken kabsa.', nextStepId: 's3', correct: false, feedback: 'أطلب works but أبغى sounds more natural in Saudi conversation.' },
        { text: 'واحد كبسة من فضلك.', translation: 'One kabsa please.', nextStepId: 's3', correct: true, feedback: 'واحد + dish name is a very natural Saudi ordering style.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'تبغى مشروب مع الطلب؟', translation: 'Would you like a drink with your order?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Respond about a drink:',
      options: [
        { text: 'أيوه، ماء بارد من فضلك.', translation: 'Yes, cold water please.', nextStepId: 's5', correct: true, feedback: 'أيوه is the Saudi yes — بارد adds a natural detail.' },
        { text: 'لا شكراً.', translation: 'No thank you.', nextStepId: 's5', correct: true, feedback: 'Clean refusal — correct.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'حاضر! الطلب بيجي بعد عشر دقايق.', translation: 'Right away! The order will come in ten minutes.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'When the food arrives, check it\'s correct:',
      options: [
        { text: 'هذي الكبسة تبع طلبي؟', translation: 'Is this kabsa my order?', nextStepId: 's7', correct: true, feedback: 'تبع + pronoun is the Saudi possessive structure — correct.' },
        { text: 'هل هذا طلبي؟', translation: 'Is this my order?', nextStepId: 's7', correct: false, feedback: 'هل is MSA. Saudi: هذا طلبي؟ (no هل needed).' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'أيوه! كبسة دجاج مع سلطة. بالعافية!', translation: 'Yes! Chicken kabsa with salad. Enjoy!', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'After eating, ask for the bill:',
      options: [
        { text: 'الحساب لو سمحت. بكم الكل؟', translation: 'The bill please. How much altogether?', nextStepId: 's9', correct: true, feedback: 'بكم الكل is natural Saudi for the total — great combination.' },
        { text: 'هل يمكنني الحصول على الفاتورة؟', translation: 'Can I get the bill?', nextStepId: 's9', correct: false, feedback: 'هل يمكنني is MSA. Just say الفاتورة or الحساب لو سمحت.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'الحساب خمسة وخمسين ريال شامل الضريبة.', translation: 'The bill is 55 riyals including VAT.', end: true },
  ],
  completionMessage: 'Excellent restaurant run! Great use of Saudi ordering and payment phrases.',
},

{
  id: 'saudi_convo_p5_buy_phone_sim',
  phase: 5,
  title: 'Buying a Phone SIM',
  description: 'Get a prepaid SIM card at a mobile phone shop.',
  focalWordIds: ['w_howmuch', 'w_pay', 'w_money', 'w_riyal', 'w_buy', 'w_receipt'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! تبغى شريحة؟', translation: 'Hey! Are you looking for a SIM card?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Confirm and specify which network:',
      options: [
        { text: 'أيوه، أبغى شريحة STC بيانات.', translation: 'Yes, I want an STC data SIM.', nextStepId: 's3', correct: true, feedback: 'Natural Saudi phrasing — specifying the network and type.' },
        { text: 'نعم أريد بطاقة SIM.', translation: 'Yes I want a SIM card.', nextStepId: 's3', correct: false, feedback: 'نعم أريد is MSA. Say أيوه أبغى شريحة.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'عندنا باقة شهرية بخمسة وأربعين ريال، فيها خمسة عشر جيجا. تبغاها؟', translation: 'We have a monthly plan for 45 riyals with 15 GB. Do you want it?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Ask if there\'s a cheaper option:',
      options: [
        { text: 'في باقة أرخص؟', translation: 'Is there a cheaper plan?', nextStepId: 's5', correct: true, feedback: 'أرخص is the Saudi comparative "cheaper" — correct Phase 5 vocab.' },
        { text: 'هل توجد باقة أقل سعراً؟', translation: 'Is there a lower-priced plan?', nextStepId: 's5', correct: false, feedback: 'هل توجد is MSA. Say في باقة أرخص? or في شي أرخص?' },
        { text: 'غالي شوي. في خصم؟', translation: 'A bit expensive. Is there a discount?', nextStepId: 's5', correct: true, feedback: 'غالي شوي and في خصم are perfect Phase 5 vocab.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'في باقة بعشرين وخمسة ريال فيها ثمانية جيجا.', translation: 'There is a plan for 25 riyals with 8 GB.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Choose the plan:',
      options: [
        { text: 'خذ الباقة الأولى. بكم مع الضريبة؟', translation: 'I\'ll take the first plan. How much with VAT?', nextStepId: 's7', correct: true, feedback: 'Confirming VAT is smart — شامل الضريبة is Phase 5 vocab.' },
        { text: 'آخذ الباقة الرخيصة.', translation: 'I\'ll take the cheap plan.', nextStepId: 's7', correct: true, feedback: 'آخذ + الرخيصة is natural Saudi.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'شامل الضريبة ثمانية وأربعين ريال وخمسة وسبعين هللة.', translation: 'Including VAT it\'s 48.75 riyals.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Pay and get receipt:',
      options: [
        { text: 'تفضل خمسين. عطني الفاتورة.', translation: 'Here\'s fifty. Give me the receipt.', nextStepId: 's9', correct: true, feedback: 'عطني is natural Saudi imperative — الفاتورة is the right word.' },
        { text: 'أدفع بالبطاقة.', translation: 'I\'ll pay by card.', nextStepId: 's9', correct: true, feedback: 'أدفع بالبطاقة is correct.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'تمام! الشريحة شغالة طوالي. الله يعطيك العافية.', translation: 'Done! The SIM works right away. God bless you.', end: true },
  ],
  completionMessage: 'Great job buying your SIM! You used رخيص, الضريبة, and الفاتورة correctly.',
},

{
  id: 'saudi_convo_p5_grocery_checkout',
  phase: 5,
  title: 'Grocery Checkout',
  description: 'Pay for groceries at the supermarket checkout counter.',
  focalWordIds: ['w_howmuch', 'w_pay', 'w_money', 'w_riyal', 'w_receipt', 'w_discount'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! البضاعة كلها معك؟', translation: 'Hey! Do you have all your items?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Confirm you\'re ready to check out:',
      options: [
        { text: 'أيوه، كلها هنا.', translation: 'Yes, everything is here.', nextStepId: 's3', correct: true, feedback: 'Direct and natural Saudi confirmation.' },
        { text: 'نعم جميع المواد موجودة.', translation: 'Yes all the items are present.', nextStepId: 's3', correct: false, feedback: 'جميع المواد موجودة is MSA. Just say أيوه، كلها هنا.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'المجموع مئة وأربعة وستين ريال. عندك بطاقة وفاء أو تميم؟', translation: 'Total is 164 riyals. Do you have a loyalty card?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Ask about a discount:',
      options: [
        { text: 'ما عندي بطاقة. في خصم اليوم؟', translation: 'I don\'t have a card. Is there a discount today?', nextStepId: 's5', correct: true, feedback: 'في خصم is the right Phase 5 way to ask about deals.' },
        { text: 'لا. ما أملك بطاقة ولاء.', translation: 'No. I don\'t have a loyalty card.', nextStepId: 's5', correct: false, feedback: 'ما أملك and ولاء are MSA. Say ما عندي بطاقة.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'في تخفيض عشرة بالمئة على الخضروات. خلصت بمئة وخمسة وخمسين ريال.', translation: 'There is a 10% discount on vegetables. It comes to 155 riyals.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Ask about payment methods:',
      options: [
        { text: 'تقبلون Apple Pay؟', translation: 'Do you accept Apple Pay?', nextStepId: 's7', correct: true, feedback: 'Natural Saudi question — Apple Pay is widely used.' },
        { text: 'أدفع كاش.', translation: 'I\'ll pay cash.', nextStepId: 's7', correct: true, feedback: 'كاش is the Phase 5 Saudi word for cash — correct.' },
        { text: 'هل يمكنني الدفع إلكترونياً؟', translation: 'Can I pay electronically?', nextStepId: 's7', correct: false, feedback: 'هل يمكنني is MSA. Say تقبلون Apple Pay? or أدفع بالجوال?' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'أيوه، أي طريقة دفع. تفضل.', translation: 'Yes, any payment method. Go ahead.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'After paying, ask for the receipt:',
      options: [
        { text: 'عطني الفاتورة من فضلك.', translation: 'Give me the receipt please.', nextStepId: 's9', correct: true, feedback: 'عطني is the Saudi imperative — الفاتورة is correct.' },
        { text: 'هل يمكنني الحصول على إيصال؟', translation: 'Can I get a receipt?', nextStepId: 's9', correct: false, feedback: 'هل يمكنني is MSA. Say عطني الفاتورة or أبغى الفاتورة.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'تفضل الفاتورة. شكراً! يعطيك العافية.', translation: 'Here is the receipt. Thanks! God give you strength.', end: true },
  ],
  completionMessage: 'Perfect checkout! You used خصم, كاش, and الفاتورة expertly.',
},

{
  id: 'saudi_convo_p5_perfume_gift_shop',
  phase: 5,
  title: 'Choosing a Perfume Gift',
  description: 'Buy perfume as a gift at a Saudi gift shop.',
  focalWordIds: ['w_howmuch', 'w_expensive', 'w_cheap', 'w_discount', 'w_buy', 'w_riyal'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! تبغى عطر هدية؟', translation: 'Hey! Looking for a perfume gift?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Explain the occasion:',
      options: [
        { text: 'أيوه، عطر هدية لأمي. شي راقي.', translation: 'Yes, a perfume gift for my mother. Something elegant.', nextStepId: 's3', correct: true, feedback: 'Natural phrasing — using لأمي (for my mother) is correct 3rd-person reference.' },
        { text: 'أريد عطراً مميزاً لأمي.', translation: 'I want a special perfume for my mother.', nextStepId: 's3', correct: false, feedback: 'أريد is MSA. Say أبغى عطر مميز لأمي.' },
        { text: 'أبغى أشتري هدية لأمي.', translation: 'I want to buy a gift for my mother.', nextStepId: 's3', correct: true, feedback: 'Correct — أبغى أشتري is natural Saudi.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'عندنا عود سعودي أصلي ممتاز. هدية ما بتأسف عليها. بأربعمية ريال.', translation: 'We have excellent authentic Saudi oud. A gift you won\'t regret. For 400 riyals.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'React to the price:',
      options: [
        { text: 'غالي! عندك شي أرخص بس زين؟', translation: 'Expensive! Do you have something cheaper but still good?', nextStepId: 's5', correct: true, feedback: 'غالي + أرخص is classic Saudi negotiation language.' },
        { text: 'هذا المبلغ مرتفع. هل لديك بديل؟', translation: 'This amount is high. Do you have an alternative?', nextStepId: 's5', correct: false, feedback: 'MSA phrasing. Say غالي! في شي أرخص؟' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'في خلطة عود جميلة بمئتين وخمسين. رائحتها قريبة من الأصلي.', translation: 'There is a nice oud blend for 250. Its scent is close to the original.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Ask for a further discount:',
      options: [
        { text: 'تقدر تعطيني خصم؟ بمئتين ريال وآخذها.', translation: 'Can you give me a discount? For 200 I\'ll take it.', nextStepId: 's7', correct: true, feedback: 'تقدر تعطيني خصم is natural Saudi haggling.' },
        { text: 'مئتان ريال آخر سعر؟', translation: 'Is 200 riyals the final price?', nextStepId: 's7', correct: false, feedback: 'Close but frame it as an offer: آخذها بمئتين ريال.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'ماشي، بمئتين وعشرين. آخر كلمة.', translation: 'OK, 220. Final word.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Accept and ask for gift wrapping:',
      options: [
        { text: 'تمام. ممكن تغلفها هدية؟', translation: 'OK. Can you wrap it as a gift?', nextStepId: 's9', correct: true, feedback: 'تغلفها هدية is natural — تمام closes the deal well.' },
        { text: 'حسناً، سأشتريها.', translation: 'OK, I will buy it.', nextStepId: 's9', correct: false, feedback: 'سأشتريها is MSA. Say آخذها and add تغلفها هدية.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'بكل سرور! أمك بتفرح فيها إن شاء الله.', translation: 'With pleasure! Your mother will love it, God willing.', end: true },
  ],
  completionMessage: 'Lovely gift purchase! Great use of Saudi haggling and 3rd-person reference.',
},

{
  id: 'saudi_convo_p5_taxi_negotiate',
  phase: 5,
  title: 'Taxi Fare Negotiation',
  description: 'Agree on a fare with a taxi driver before getting in.',
  focalWordIds: ['w_howmuch', 'w_expensive', 'w_money', 'w_riyal', 'w_pay', 'w_cheap'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'وين تبغى تروح؟', translation: 'Where do you want to go?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'State your destination and ask the fare:',
      options: [
        { text: 'المطار. بكم؟', translation: 'The airport. How much?', nextStepId: 's3', correct: true, feedback: 'بكم is the Saudi way to ask price — direct and correct.' },
        { text: 'إلى المطار. كم يكلف؟', translation: 'To the airport. How much does it cost?', nextStepId: 's3', correct: false, feedback: 'كم يكلف is MSA. Saudi: بكم or إيش الأجرة؟' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'المطار بمئة وعشرين ريال.', translation: 'The airport for 120 riyals.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Negotiate the price:',
      options: [
        { text: 'غالي! ثمانين ريال وتمشي؟', translation: 'Expensive! Eighty riyals — are you going?', nextStepId: 's5', correct: true, feedback: 'وتمشي is the Saudi way to confirm if driver accepts the offer.' },
        { text: 'هذا السعر مرتفع. أقبل ثمانين ريالاً؟', translation: 'This price is high. Will you accept 80 riyals?', nextStepId: 's5', correct: false, feedback: 'مرتفع and أقبل are MSA. Say غالي and وتمشي.' },
        { text: 'في ميتر؟', translation: 'Do you have a meter?', nextStepId: 's5', correct: true, feedback: 'Clever — asking about the meter (ميتر) is very Saudi.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'ما في ميتر. أحسن سعر مية ريال. آخر سعر.', translation: 'No meter. Best price 100 riyals. Final price.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Accept or try one more counter:',
      options: [
        { text: 'تسعين وتمشي، ولا أبحث عن سيارة ثانية.', translation: 'Ninety and you go, or I\'ll look for another car.', nextStepId: 's7', correct: true, feedback: 'Walking away is a strong tactic — natural Saudi bargaining.' },
        { text: 'تمام، مية ريال. يلا نمشي.', translation: 'OK, 100 riyals. Let\'s go.', nextStepId: 's7', correct: true, feedback: 'Accepting is fine too — يلا نمشي is natural Saudi.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'ماشي، خمسة وتسعين. تعال.', translation: 'OK, 95. Come on.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Confirm and get in:',
      options: [
        { text: 'خمسة وتسعين. تمام. يلا.', translation: 'Ninety-five. OK. Let\'s go.', nextStepId: 's9', correct: true, feedback: 'يلا is the iconic Saudi let\'s-go — perfect.' },
        { text: 'حسناً اتفقنا.', translation: 'OK we agreed.', nextStepId: 's9', correct: false, feedback: 'اتفقنا is fine but MSA. Say تمام، خلصنا for Saudi register.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'يلا، تفضل. رحمة الله عليك.', translation: 'Let\'s go, come on. God be with you.', end: true },
  ],
  completionMessage: 'Great negotiation! You used بكم, غالي, آخر سعر, and يلا correctly.',
},

{
  id: 'saudi_convo_p5_hotel_checkin',
  phase: 5,
  title: 'Hotel Check-in',
  description: 'Check in to a Saudi hotel and ask about the room rate.',
  focalWordIds: ['w_howmuch', 'w_pay', 'w_receipt', 'w_money', 'w_riyal', 'w_discount'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً وسهلاً! عندك حجز؟', translation: 'Welcome! Do you have a reservation?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Confirm your booking:',
      options: [
        { text: 'أيوه، عندي حجز. اسمي عبدالله الغامدي.', translation: 'Yes, I have a reservation. My name is Abdullah Al-Ghamdi.', nextStepId: 's3', correct: true, feedback: 'Natural check-in phrasing — عندي حجز is correct Saudi.' },
        { text: 'نعم لدي حجز مسبق.', translation: 'Yes I have a prior reservation.', nextStepId: 's3', correct: false, feedback: 'لدي and مسبق are MSA. Say عندي حجز.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'أيوه تفضل. غرفة فردية لليلتين. الغرفة بمئة وثمانين ريال الليلة.', translation: 'Yes here you go. Single room for two nights. The room is 180 riyals per night.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Ask about a discount or offer:',
      options: [
        { text: 'في خصم لو حجزت ثلاث ليالي؟', translation: 'Is there a discount if I book three nights?', nextStepId: 's5', correct: true, feedback: 'في خصم + conditional is natural Phase 5 transactional phrasing.' },
        { text: 'هل يوجد تخفيض على الإقامة؟', translation: 'Is there a discount on the stay?', nextStepId: 's5', correct: false, feedback: 'هل يوجد is MSA. Say في خصم or في عرض؟' },
        { text: 'غالي شوي. ما تقدر تنزل السعر؟', translation: 'A bit expensive. Can\'t you lower the price?', nextStepId: 's5', correct: true, feedback: 'غالي شوي is natural Phase 5 Saudi.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'لو بقيت ثلاث ليالي، نعطيك عشرة بالمئة خصم. يصير بأربعمية وثمانية وستين ريال.', translation: 'If you stay three nights, we give you 10% off. That comes to 468 riyals.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Accept the offer:',
      options: [
        { text: 'تمام، ثلاث ليالي. كيف أدفع؟', translation: 'OK, three nights. How do I pay?', nextStepId: 's7', correct: true, feedback: 'تمام closes the deal — كيف أدفع is natural.' },
        { text: 'حسناً، سأبقى ثلاث ليالٍ.', translation: 'OK, I will stay three nights.', nextStepId: 's7', correct: false, feedback: 'سأبقى is MSA. Say أبقى ثلاث ليالي or تمام، ثلاث ليالي.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'تدفع الآن أو عند المغادرة؟', translation: 'Do you pay now or at checkout?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Choose when to pay:',
      options: [
        { text: 'الحين أدفع بالبطاقة.', translation: 'I\'ll pay now by card.', nextStepId: 's9', correct: true, feedback: 'الحين is the Saudi word for "now" — الحين أدفع is natural.' },
        { text: 'أدفع عند المغادرة كاش.', translation: 'I\'ll pay at checkout in cash.', nextStepId: 's9', correct: true, feedback: 'Correct — كاش is the Saudi word for cash.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'ممتاز! تفضل مفتاح الغرفة. الغرفة ثلاثمائة وخمسة.', translation: 'Excellent! Here is your room key. Room 305.', end: true },
  ],
  completionMessage: 'Great check-in! You used خصم, أدفع, كاش, and Saudi register throughout.',
},

{
  id: 'saudi_convo_p5_book_table',
  phase: 5,
  title: 'Booking a Restaurant Table',
  description: 'Reserve a table at a restaurant by phone.',
  focalWordIds: ['w_howmuch', 'w_pay', 'w_money', 'w_want', 'w_riyal', 'w_receipt'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'مطعم الفخامة، هلا!', translation: 'Al-Fakhamah Restaurant, hello!', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Request a table reservation:',
      options: [
        { text: 'أبغى أحجز طاولة لأربعة أشخاص الليلة.', translation: 'I want to book a table for four people tonight.', nextStepId: 's3', correct: true, feedback: 'أبغى أحجز is natural Saudi booking language.' },
        { text: 'أريد حجز طاولة لأربعة أشخاص.', translation: 'I want to reserve a table for four people.', nextStepId: 's3', correct: false, feedback: 'أريد is MSA. Use أبغى for Saudi dialect.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'أيوه! في طاولة الساعة ثمانية. اسمك إيش؟', translation: 'Yes! There is a table at 8 o\'clock. What\'s your name?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give your name and ask about a deposit:',
      options: [
        { text: 'اسمي نورة. في دفعة مقدمة؟', translation: 'My name is Noura. Is there a deposit?', nextStepId: 's5', correct: true, feedback: 'دفعة مقدمة is a natural Saudi term for advance payment.' },
        { text: 'اسمي نورة السالم. هل يلزم الدفع مسبقاً؟', translation: 'My name is Noura Al-Salem. Is advance payment required?', nextStepId: 's5', correct: false, feedback: 'هل يلزم is MSA. Say في دفعة مقدمة? or أبغى أدفع الحين?' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'لا، ما في دفعة. بس التأكيد قبل ساعة من الموعد.', translation: 'No deposit. But confirm an hour before the time.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Ask about a family section:',
      options: [
        { text: 'في قسم عائلات؟', translation: 'Is there a family section?', nextStepId: 's7', correct: true, feedback: 'قسم عائلات is standard Saudi restaurant vocabulary.' },
        { text: 'هل يوجد قسم للعائلات؟', translation: 'Is there a section for families?', nextStepId: 's7', correct: false, feedback: 'هل يوجد is MSA. Just say في قسم عائلات؟' },
        { text: 'الطاولة في منطقة العائلات؟', translation: 'Is the table in the family area?', nextStepId: 's7', correct: true, feedback: 'Direct and natural way to ask.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'أيوه، الحجز في قسم العائلات. أي شي ثاني؟', translation: 'Yes, the reservation is in the family section. Anything else?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Ask if they have a minimum spend:',
      options: [
        { text: 'في حد أدنى للفاتورة؟', translation: 'Is there a minimum bill?', nextStepId: 's9', correct: true, feedback: 'حد أدنى للفاتورة is natural Saudi phrasing for minimum spend.' },
        { text: 'لا، شكراً. نشوفك الليلة.', translation: 'No, thanks. See you tonight.', nextStepId: 's9', correct: true, feedback: 'Wrapping up the call naturally — نشوفك is Saudi.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'ما في حد أدنى. نشوفك الليلة إن شاء الله!', translation: 'No minimum. See you tonight, God willing!', end: true },
  ],
  completionMessage: 'Table booked! You used أبغى أحجز and Saudi restaurant vocabulary well.',
},

{
  id: 'saudi_convo_p5_pharmacy_meds',
  phase: 5,
  title: 'At the Pharmacy',
  description: 'Buy medication at a Saudi pharmacy and ask about the price.',
  focalWordIds: ['w_howmuch', 'w_pay', 'w_money', 'w_riyal', 'w_expensive', 'w_receipt'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! كيف أقدر أساعدك؟', translation: 'Hello! How can I help you?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Describe what you need:',
      options: [
        { text: 'أبغى دواء للصداع وشي للبرد.', translation: 'I want something for headache and something for a cold.', nextStepId: 's3', correct: true, feedback: 'أبغى دواء is natural Saudi phrasing at a pharmacy.' },
        { text: 'أحتاج دواءً للصداع ودواءً للزكام.', translation: 'I need medicine for headache and medicine for a cold.', nextStepId: 's3', correct: false, feedback: 'أحتاج and الزكام are MSA-leaning. Say أبغى دواء للصداع والبرد.' },
        { text: 'عندكم برونافين؟', translation: 'Do you have Brunafen?', nextStepId: 's3', correct: true, feedback: 'Asking by brand name is very natural at a Saudi pharmacy.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'أيوه. برونافين للصداع وفايكس للبرد. بكم معاهم؟', translation: 'Yes. Brunafen for headache and Vicks for cold. How much together?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Ask the price:',
      options: [
        { text: 'أيوه، بكم الاثنين مع بعض؟', translation: 'Yes, how much are both together?', nextStepId: 's5', correct: true, feedback: 'مع بعض is a natural Saudi phrase for "together".' },
        { text: 'كم يبلغ سعر الدواءين؟', translation: 'How much do the two medicines cost?', nextStepId: 's5', correct: false, feedback: 'يبلغ is MSA. Say بكم الاثنين.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'البرونافين بعشرين ريال والفايكس بثمانية ريالات. المجموع ثمانية وعشرين ريال.', translation: 'Brunafen is 20 riyals and Vicks is 8 riyals. Total 28 riyals.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'React to the price:',
      options: [
        { text: 'زين، تمام. أدفع كاش.', translation: 'Good, fine. I\'ll pay cash.', nextStepId: 's7', correct: true, feedback: 'تمام and كاش are natural transaction closers.' },
        { text: 'غالي شوي. في بديل أرخص للصداع؟', translation: 'A bit expensive. Is there a cheaper alternative for headache?', nextStepId: 's7', correct: true, feedback: 'أرخص is correct Phase 5 comparative — natural.' },
        { text: 'هذا كثير. هل توجد أدوية أقل سعراً؟', translation: 'That is a lot. Are there cheaper medicines?', nextStepId: 's7', correct: false, feedback: 'هل توجد is MSA. Say في بديل أرخص؟' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'في باراسيتامول بعشرة ريال بدل البرونافين لو تبغى توفر.', translation: 'There is paracetamol for 10 riyals instead of Brunafen if you want to save.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Decide and pay:',
      options: [
        { text: 'خذ الباراسيتامول والفايكس. تفضل عشرين ريال.', translation: 'I\'ll take the paracetamol and Vicks. Here\'s 20 riyals.', nextStepId: 's9', correct: true, feedback: 'Natural decision and payment — well done.' },
        { text: 'لا، آخذ البرونافين. أدفع بالبطاقة.', translation: 'No, I\'ll take the Brunafen. I\'ll pay by card.', nextStepId: 's9', correct: true, feedback: 'آخذ and أدفع بالبطاقة are both correct.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'تفضل الأدوية والفاتورة. سلامتك!', translation: 'Here are your medicines and the receipt. Get well!', end: true },
  ],
  completionMessage: 'Great pharmacy visit! You used بكم, أرخص, and كاش naturally.',
},

{
  id: 'saudi_convo_p5_buy_kids_clothes',
  phase: 5,
  title: 'Buying Kids\' Clothes',
  description: 'Buy clothes for a child at a children\'s clothing store.',
  focalWordIds: ['w_howmuch', 'w_expensive', 'w_discount', 'w_buy', 'w_riyal', 'w_pay'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! أبغى أساعدك.', translation: 'Hey! I\'d like to help you.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Explain you\'re shopping for a child:',
      options: [
        { text: 'أبغى ملابس لولدي. عمره أربع سنين.', translation: 'I want clothes for my son. He is four years old.', nextStepId: 's3', correct: true, feedback: 'لولدي (for my son) is natural 3rd-person reference — good Phase 5 use.' },
        { text: 'أريد ملابس لطفلي البالغ من العمر أربع سنوات.', translation: 'I want clothes for my child who is four years old.', nextStepId: 's3', correct: false, feedback: 'أريد and البالغ من العمر are MSA. Say أبغى ملابس لولدي، عمره أربع سنين.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'عندنا جاكيت وبنطلون جيز حق الأطفال. بثلاثة وستين ريال مع بعض.', translation: 'We have a Guess kids\' jacket and pants. For 63 riyals together.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Ask about the size:',
      options: [
        { text: 'المقاس يناسب أربع سنين؟', translation: 'Does the size suit a four-year-old?', nextStepId: 's5', correct: true, feedback: 'Direct and natural Saudi question.' },
        { text: 'هل المقاس مناسب لطفل عمره أربع سنوات؟', translation: 'Is the size suitable for a four-year-old child?', nextStepId: 's5', correct: false, feedback: 'هل and مناسب لطفل are MSA. Say المقاس يناسب أربع سنين؟' },
        { text: 'عندكم مقاس رقم أربعة؟', translation: 'Do you have size number four?', nextStepId: 's5', correct: true, feedback: 'Very natural — Saudi parents often ask by number size.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'أيوه، هذا مقاس أربعة يناسب من ثلاث لخمس سنين.', translation: 'Yes, size four fits from three to five years.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Ask about a discount:',
      options: [
        { text: 'في خصم لو اشتريت ثنتين؟', translation: 'Is there a discount if I buy two items?', nextStepId: 's7', correct: true, feedback: 'في خصم لو is a natural Saudi conditional discount question.' },
        { text: 'غالي شوي. ما تقدر تخفض؟', translation: 'A bit expensive. Can\'t you lower it?', nextStepId: 's7', correct: true, feedback: 'غالي شوي is classic Saudi — ما تقدر تخفض is natural.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'لو اشتريت ثلاث قطع، خصم عشرين بالمئة.', translation: 'If you buy three pieces, 20% discount.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Decide and pay:',
      options: [
        { text: 'تمام، آخذ ثلاث قطع. أدفع كاش.', translation: 'OK, I\'ll take three pieces. I\'ll pay cash.', nextStepId: 's9', correct: true, feedback: 'تمام, آخذ, and كاش are all Phase 5 transaction vocab.' },
        { text: 'لا، آخذ القطعتين فقط. أدفع بالبطاقة.', translation: 'No, I\'ll just take the two pieces. Pay by card.', nextStepId: 's9', correct: true, feedback: 'Natural — أدفع بالبطاقة is correct.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'الله يبارك! ولدك بيفرح فيها. يعطيك العافية.', translation: 'God bless! Your son will love them. God give you strength.', end: true },
  ],
  completionMessage: 'Excellent kids\' shopping! Great use of في خصم, آخذ, and 3rd-person reference.',
},

{
  id: 'saudi_convo_p5_buy_dates_gift',
  phase: 5,
  title: 'Buying Dates as a Gift',
  description: 'Buy a box of premium Saudi dates as a gift at a dates shop.',
  focalWordIds: ['w_howmuch', 'w_expensive', 'w_cheap', 'w_discount', 'w_buy', 'w_riyal'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً وسهلاً! تبغى تمر هدية؟', translation: 'Welcome! Would you like dates as a gift?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Tell him what you\'re looking for:',
      options: [
        { text: 'أيوه، أبغى علبة تمر راقية هدية لعميل.', translation: 'Yes, I want an elegant box of dates as a gift for a client.', nextStepId: 's3', correct: true, feedback: 'لعميل (for a client) — natural 3rd-person reference.' },
        { text: 'أريد علبة تمر فاخرة لهدية.', translation: 'I want a luxury box of dates for a gift.', nextStepId: 's3', correct: false, feedback: 'أريد is MSA. Say أبغى علبة تمر راقية.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'عندنا صواني عجوة المدينة الفاخرة. الكيلو بمئة وعشرين ريال. أحسن تمر في السوق.', translation: 'We have premium Medina Ajwa trays. One kilo for 120 riyals. Best dates in the market.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'React to the price:',
      options: [
        { text: 'غالي! بكم نص كيلو؟', translation: 'Expensive! How much for half a kilo?', nextStepId: 's5', correct: true, feedback: 'نص كيلو is the Saudi form for half a kilo — natural.' },
        { text: 'السعر مرتفع. هل عندك كميات أقل؟', translation: 'The price is high. Do you have smaller quantities?', nextStepId: 's5', correct: false, feedback: 'السعر مرتفع is MSA. Say غالي and نص كيلو or ربع كيلو.' },
        { text: 'في خصم لو اشتريت كيلوين؟', translation: 'Is there a discount if I buy two kilos?', nextStepId: 's5', correct: true, feedback: 'Smart bulk discount question — في خصم is Phase 5 vocab.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'نص كيلو بستين ريال. لو اشتريت كيلوين نعطيك عشرة بالمئة خصم.', translation: 'Half a kilo for 60 riyals. If you buy two kilos we give you 10% off.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Decide on the quantity:',
      options: [
        { text: 'آخذ كيلوين. مع الخصم بكم؟', translation: 'I\'ll take two kilos. How much with the discount?', nextStepId: 's7', correct: true, feedback: 'آخذ and مع الخصم بكم are excellent Phase 5 phrases.' },
        { text: 'آخذ نص كيلو بس.', translation: 'I\'ll take just half a kilo.', nextStepId: 's7', correct: true, feedback: 'بس is the Saudi "only" — natural.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'مئتين وستة عشر ريال مع الخصم. توضيبها هدية؟', translation: '216 riyals with the discount. Should I wrap it as a gift?', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Confirm gift wrapping and pay:',
      options: [
        { text: 'أيوه، غلفها زين. أدفع بالبطاقة.', translation: 'Yes, wrap it nicely. I\'ll pay by card.', nextStepId: 's9', correct: true, feedback: 'غلفها زين is natural Saudi — أدفع بالبطاقة is correct.' },
        { text: 'أيوه، هدية فاخرة. تفضل الفلوس كاش.', translation: 'Yes, a luxury gift. Here\'s the cash.', nextStepId: 's9', correct: true, feedback: 'الفلوس كاش is natural Saudi payment language.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'تفضل! عميلك بيفرح بالتمر. الله يبارك في تجارتك.', translation: 'Here you go! Your client will love the dates. God bless your business.', end: true },
  ],
  completionMessage: 'Great purchase! You used خصم, نص كيلو, آخذ, and 3rd-person reference well.',
},

{
  id: 'saudi_convo_p5_barber_haircut',
  phase: 5,
  title: 'Getting a Haircut',
  description: 'Negotiate the price and style at a Saudi barber shop.',
  focalWordIds: ['w_howmuch', 'w_expensive', 'w_pay', 'w_money', 'w_riyal', 'w_cheap'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! تبغى حلاقة؟', translation: 'Hey! Do you want a haircut?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask what services are available:',
      options: [
        { text: 'أيوه. إيش عندكم وبكم؟', translation: 'Yes. What do you have and how much?', nextStepId: 's3', correct: true, feedback: 'بكم is the Phase 5 price question — combining it with إيش is natural.' },
        { text: 'نعم، ما هي الخدمات المتاحة وأسعارها؟', translation: 'Yes, what are the available services and their prices?', nextStepId: 's3', correct: false, feedback: 'نعم and المتاحة are MSA. Say أيوه، إيش عندكم وبكم؟' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'حلاقة عادية بعشرين، مع التشكيل ثلاثين، وكامل مع الحواجب والمسك بخمسة وأربعين.', translation: 'Regular cut 20, with styling 30, full including eyebrows and candle wax 45.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Choose a service and react to the price:',
      options: [
        { text: 'التشكيل بثلاثين. غالي شوي، ما تقدر تعمل خمسة وعشرين؟', translation: 'Styling for thirty. A bit expensive, can\'t you do twenty-five?', nextStepId: 's5', correct: true, feedback: 'Haggling at a barber is very Saudi — غالي شوي is natural.' },
        { text: 'أريد الحلاقة العادية فقط.', translation: 'I want just the regular cut.', nextStepId: 's5', correct: false, feedback: 'أريد is MSA. Say أبغى الحلاقة العادية بس.' },
        { text: 'الكامل بكم شامل كل شي؟', translation: 'How much is the full service including everything?', nextStepId: 's5', correct: true, feedback: 'شامل كل شي is natural Saudi clarification.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'ماشي، خمسة وعشرين مع التشكيل. تفضل اجلس.', translation: 'OK, 25 with styling. Please have a seat.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Describe how you want your hair cut:',
      options: [
        { text: 'من الجنبين قصير وفوق متوسط.', translation: 'Short on the sides and medium on top.', nextStepId: 's7', correct: true, feedback: 'Natural Saudi description of a haircut style.' },
        { text: 'أريد شعراً قصيراً من الجانبين وطويلاً من الأعلى.', translation: 'I want hair short from the sides and long on top.', nextStepId: 's7', correct: false, feedback: 'أريد شعراً is MSA. Say أبغى من الجنبين قصير وفوق شوي أطول.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'تمام، فهمت. بشغل لك شي راقي إن شاء الله.', translation: 'OK, understood. I\'ll do something elegant for you, God willing.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'After the haircut — pay:',
      options: [
        { text: 'تمام، زين الشغل. تفضل خمسة وعشرين كاش.', translation: 'Great, nice work. Here\'s 25 cash.', nextStepId: 's9', correct: true, feedback: 'Complimenting the work then paying — very natural.' },
        { text: 'شكراً. أدفع بالبطاقة.', translation: 'Thank you. I\'ll pay by card.', nextStepId: 's9', correct: true, feedback: 'أدفع بالبطاقة is correct.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'مشكور! يعطيك العافية. تعال مرة ثانية.', translation: 'Thanks! God give you strength. Come again.', end: true },
  ],
  completionMessage: 'Perfect barber visit! You used بكم, غالي شوي, and كاش like a local.',
},

{
  id: 'saudi_convo_p5_at_bank_withdraw',
  phase: 5,
  title: 'Withdrawing at the Bank',
  description: 'Withdraw cash at a Saudi bank counter.',
  focalWordIds: ['w_pay', 'w_money', 'w_riyal', 'w_receipt', 'w_howmuch', 'w_discount'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! بخدمتك. إيش تبغى؟', translation: 'Hello! At your service. What do you need?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'State you want to withdraw:',
      options: [
        { text: 'أبغى أسحب فلوس من حسابي.', translation: 'I want to withdraw money from my account.', nextStepId: 's3', correct: true, feedback: 'أبغى أسحب فلوس is natural Saudi banking language.' },
        { text: 'أريد سحب مبلغ من حسابي.', translation: 'I want to withdraw an amount from my account.', nextStepId: 's3', correct: false, feedback: 'أريد and مبلغ are MSA. Say أبغى أسحب فلوس.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'تفضل. الهوية والبطاقة من فضلك.', translation: 'Go ahead. Your ID and card please.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Hand over documents and state the amount:',
      options: [
        { text: 'تفضل. أبغى أسحب ألفين ريال.', translation: 'Here you go. I want to withdraw two thousand riyals.', nextStepId: 's5', correct: true, feedback: 'Direct and natural — أبغى أسحب + amount is correct.' },
        { text: 'هذه وثائقي. أريد سحب ألفين ريال سعودي.', translation: 'Here are my documents. I want to withdraw two thousand Saudi riyals.', nextStepId: 's5', correct: false, feedback: 'وثائقي and أريد are MSA. Say أوراقي and أبغى.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'الرصيد يكفي. في رسوم السحب نصف ريال. تكمل؟', translation: 'Balance is sufficient. There is a half-riyal withdrawal fee. Do you confirm?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'React to the fee:',
      options: [
        { text: 'نصف ريال رسوم! ليش في رسوم؟', translation: 'Half-riyal fee! Why is there a fee?', nextStepId: 's7', correct: true, feedback: 'ليش (why in Saudi) is correct — questioning the fee is natural.' },
        { text: 'تمام، أكمل.', translation: 'OK, continue.', nextStepId: 's7', correct: true, feedback: 'تمام is the Saudi go-ahead — natural.' },
        { text: 'هذا غير مقبول. لماذا هناك رسوم؟', translation: 'This is unacceptable. Why is there a fee?', nextStepId: 's7', correct: false, feedback: 'لماذا is MSA. Say ليش في رسوم؟' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'الرسوم على السحب النقدي من الفرع. من الصراف الآلي ما في رسوم.', translation: 'The fee is for branch cash withdrawal. No fee from the ATM.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Decide:',
      options: [
        { text: 'تمام، أكمل. وعطني الإيصال.', translation: 'OK, continue. And give me the receipt.', nextStepId: 's9', correct: true, feedback: 'عطني الإيصال is natural Saudi imperative.' },
        { text: 'لا، أروح الصراف الآلي أحسن.', translation: 'No, I\'ll go to the ATM instead.', nextStepId: 's9', correct: true, feedback: 'Natural decision — أروح is correct Saudi.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'تفضل ألفين ريال والإيصال. يعطيك العافية.', translation: 'Here are 2000 riyals and the receipt. God give you strength.', end: true },
  ],
  completionMessage: 'Excellent bank visit! You used أسحب فلوس, رسوم, and عطني correctly.',
},

{
  id: 'saudi_convo_p5_buy_perfume_oud',
  phase: 5,
  title: 'Buying Oud Perfume',
  description: 'Buy oud oil at a perfume shop, comparing options.',
  focalWordIds: ['w_howmuch', 'w_expensive', 'w_cheap', 'w_buy', 'w_riyal', 'w_discount'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'أهلاً! تبغى عود؟ عندنا أجود العطور.', translation: 'Welcome! Looking for oud? We have the finest perfumes.', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Tell him what you want:',
      options: [
        { text: 'أبغى عود هندي أصلي. بكم؟', translation: 'I want authentic Indian oud. How much?', nextStepId: 's3', correct: true, feedback: 'أبغى + بكم is Phase 5 Saudi transactional language.' },
        { text: 'أريد زيت عود هندياً أصلياً.', translation: 'I want authentic Indian oud oil.', nextStepId: 's3', correct: false, feedback: 'أريد is MSA. Say أبغى عود هندي.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'هذا العود الهندي من أسام. المثقال بثمانمية ريال. نادر ومطلوب.', translation: 'This Indian oud is from Assam. One mithqal (3g) for 800 riyals. Rare and in demand.', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'That\'s expensive — respond:',
      options: [
        { text: 'غالي مرة! في عود أرخص بس جودته زينة؟', translation: 'Very expensive! Is there cheaper oud but still good quality?', nextStepId: 's5', correct: true, feedback: 'غالي مرة intensifies the complaint — أرخص بس زينة is natural.' },
        { text: 'ثمنه مرتفع جداً. هل عندك خيارات أقل سعراً؟', translation: 'Its price is very high. Do you have lower priced options?', nextStepId: 's5', correct: false, feedback: 'ثمنه مرتفع and هل عندك are MSA. Say غالي مرة and في عود أرخص؟' },
        { text: 'آخر سعر؟', translation: 'Final price?', nextStepId: 's5', correct: true, feedback: 'آخر سعر is the classic Saudi final-price question — great.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'في عود كمبودي بثلاثمية ريال. رائحته قوية وتدوم.', translation: 'There is Cambodian oud for 300 riyals. Its scent is strong and lasting.', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Ask to smell both before deciding:',
      options: [
        { text: 'بجرب الاثنين أشم ريحتهم.', translation: 'I\'ll try both to smell them.', nextStepId: 's7', correct: true, feedback: 'بجرب is the Saudi present-future — natural phrasing.' },
        { text: 'هل يمكنني شم العطرين قبل الشراء؟', translation: 'Can I smell both perfumes before buying?', nextStepId: 's7', correct: false, feedback: 'هل يمكنني is MSA. Say بجرب الاثنين أشم ريحتهم.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'أيوه تفضل. الهندي أثقل والكمبودي أخف.', translation: 'Yes go ahead. The Indian is heavier and the Cambodian is lighter.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Choose one and negotiate:',
      options: [
        { text: 'آخذ الكمبودي. في خصم لو دفعت كاش؟', translation: 'I\'ll take the Cambodian. Is there a discount if I pay cash?', nextStepId: 's9', correct: true, feedback: 'Linking cash payment to a discount is smart Saudi bargaining.' },
        { text: 'آخذ الهندي بسبعمية. آخر كلمة.', translation: 'I\'ll take the Indian for 700. Final word.', nextStepId: 's9', correct: true, feedback: 'آخر كلمة is the Saudi "my final offer" — perfect Phase 5.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'ماشي، خصم خمسة وعشرين ريال لو كاش. يطيب قلبك.', translation: 'OK, a 25-riyal discount for cash. Enjoy it.', end: true },
  ],
  completionMessage: 'Excellent oud shopping! You used بكم, غالي مرة, آخر سعر, and خصم correctly.',
},

{
  id: 'saudi_convo_p5_buy_phone_credit',
  phase: 5,
  title: 'Buying Phone Credit',
  description: 'Top up your prepaid phone at a convenience store.',
  focalWordIds: ['w_howmuch', 'w_pay', 'w_money', 'w_riyal', 'w_buy', 'w_receipt'],
  steps: [
    { id: 's1', speaker: 'partner', text: 'هلا! إيش تبغى؟', translation: 'Hey! What do you want?', next: 's2' },
    {
      id: 's2', speaker: 'user', prompt: 'Ask for phone credit top-up:',
      options: [
        { text: 'أبغى رصيد STC خمسين ريال.', translation: 'I want 50 riyals STC credit.', nextStepId: 's3', correct: true, feedback: 'أبغى رصيد is natural Saudi phrasing for phone top-up.' },
        { text: 'أريد شحن رصيد اتصالات بخمسين ريالاً.', translation: 'I want to recharge telecoms credit by fifty riyals.', nextStepId: 's3', correct: false, feedback: 'أريد and the formal phrasing are MSA. Say أبغى رصيد STC خمسين.' },
        { text: 'شحن خمسين ريال STC.', translation: 'Fifty-riyal STC top-up.', nextStepId: 's3', correct: true, feedback: 'Very direct — this is how many Saudis order credit.' },
      ],
    },
    { id: 's3', speaker: 'partner', text: 'رقم الجوال إيش؟', translation: 'What\'s the mobile number?', next: 's4' },
    {
      id: 's4', speaker: 'user', prompt: 'Give your number:',
      options: [
        { text: 'خمسة صفر خمسة واحد اثنين ثلاثة أربعة خمسة.', translation: 'Five zero five one two three four five.', nextStepId: 's5', correct: true, feedback: 'Reading a Saudi phone number digit by digit is natural.' },
        { text: 'رقمي هو: 0501234567.', translation: 'My number is: 0501234567.', nextStepId: 's5', correct: false, feedback: 'رقمي هو is a bit formal. Just state the digits naturally.' },
      ],
    },
    { id: 's5', speaker: 'partner', text: 'تمام. الرصيد خمسين ريال. كيف تدفع؟', translation: 'OK. Credit 50 riyals. How will you pay?', next: 's6' },
    {
      id: 's6', speaker: 'user', prompt: 'Pay for the credit:',
      options: [
        { text: 'كاش. تفضل خمسين ريال.', translation: 'Cash. Here\'s fifty riyals.', nextStepId: 's7', correct: true, feedback: 'كاش + تفضل is the natural Saudi way to hand over cash.' },
        { text: 'أدفع بالبطاقة.', translation: 'I\'ll pay by card.', nextStepId: 's7', correct: true, feedback: 'أدفع بالبطاقة is correct.' },
        { text: 'سأدفع نقداً.', translation: 'I will pay in cash.', nextStepId: 's7', correct: false, feedback: 'سأدفع نقداً is MSA. Say كاش.' },
      ],
    },
    { id: 's7', speaker: 'partner', text: 'تم الشحن! راح تجي رسالة على الجوال.', translation: 'Topped up! You will get an SMS on your phone.', next: 's8' },
    {
      id: 's8', speaker: 'user', prompt: 'Ask for a receipt:',
      options: [
        { text: 'عطني الفاتورة من فضلك.', translation: 'Give me the receipt please.', nextStepId: 's9', correct: true, feedback: 'عطني + الفاتورة is natural Saudi.' },
        { text: 'لا يهم، شكراً.', translation: 'Never mind, thanks.', nextStepId: 's9', correct: true, feedback: 'لا يهم is fine — short and natural.' },
        { text: 'هل يمكنني الحصول على فاتورة؟', translation: 'Can I get a receipt?', nextStepId: 's9', correct: false, feedback: 'هل يمكنني is MSA. Say عطني الفاتورة or أبغى الفاتورة.' },
      ],
    },
    { id: 's9', speaker: 'partner', text: 'تفضل الفاتورة. يعطيك العافية!', translation: 'Here is the receipt. God give you strength!', end: true },
  ],
  completionMessage: 'Perfect top-up! You used أبغى رصيد, كاش, and الفاتورة like a pro.',
},
