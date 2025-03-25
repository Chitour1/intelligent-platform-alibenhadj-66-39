
export interface Statement {
  id: string;
  title: string;
  date: string;
  hijriDate?: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  videoId?: string;
  category: string;
}

export const statementsData: Statement[] = [
  {
    id: "1",
    title: "علي بن حاج يدعو إلى إحياء فريضة الجهاد نصرة لغزة ويتّهم الحكام والعلماء بالتقصير والتواطؤ",
    date: "٢٢ مارس ٢٠٢٥",
    hijriDate: "٢٢ رمضان ١٤٤٦ هـ",
    excerpt: "بثت قناة الهيئة الإعلامية للشيخ علي بن حاج على اليوتيوب مساء الجمعة كلمة أكد فيها أنّ ما يجري في غزة من مجازر وإبادة جماعية يوجب على الأمة أن تنهض بكامل طاقتها لنصرة الشعب الفلسطيني، وعلى رأس ذلك إحياء فريضة الجهاد.",
    content: `بثت قناة الهيئة الإعلامية للشيخ علي بن حاج على اليوتيوب مساء الجمعة 22 مارس 2025 الموافق لـ 22 رمضان 1446 هـ، كلمة للشيخ وجّه فيها نداءً قويًا وصريحًا إلى الأمة الإسلامية، أكد فيه أنّ ما يجري في غزة من مجازر وإبادة جماعية يوجب على الأمة أن تنهض بكامل طاقتها لنصرة الشعب الفلسطيني، وعلى رأس ذلك إحياء فريضة الجهاد التي اعتبرها "فريضة الوقت" بلا منازع. وقال إنّ الجهاد ليس خيارًا ثانويًا، ولا ترفًا فكريًا، بل هو حكم شرعي مُلزم في ظلّ نازلة كبرى أصابت المسلمين، مذكّرًا بما أجمعت عليه كتب الفقه والتفسير حول وجوب النفير عند وقوع العدوان على جزء من ديار المسلمين. وعبّر بأسى وغضب عن تغييب هذا الحكم من المنابر والبرامج الدينية، التي اكتفت في العشر الأواخر من رمضان بالكلام عن الاعتكاف والعمرة وفضل ليلة القدر، دون أن تُعرّج على كارثة غزة التي قال إنها جريمة كبرى تقتضي من العلماء والدعاة أن يُبيّنوا للناس الأحكام الشرعية المتعلقة بها، وفي مقدمتها فريضة الجهاد.

لم يخف الشيخ حزنه ودهشته من صمت الحكام والملوك والرؤساء العرب، رغم امتلاكهم جيوشًا وأسلحة فتاكة لا تُستخدم إلا في العروض العسكرية أو لقمع شعوبهم إذا طالبت بالحرية أو اختارت حكّامها عبر صناديق الاقتراع. وانتقد كذلك العلماء والدعاة الذين صمتوا أو اكتفوا بالدعاء في آخر خطبة الجمعة دون ذكرٍ لغزة أو لما يفرضه الوضع من مواقف شرعية واضحة، وتساءل: هل نزل الجهاد من كونه ذروة سنام الإسلام إلى مجرد رواية تُتلى وسيرة تُحكى؟ وأكّد أن الاقتصار على الدعاء مع القدرة على النصرة يُعد تقصيرًا لا يُقبل شرعًا، وضرب مثالًا بالرجل الذي يُهاجم في بيته فيكتفي بالدعاء دون أن يواجه المعتدين، واصفًا ذلك بالعبث لا بالدين.

كما خصّص جزءًا كبيرًا من كلمته للهجوم على الإعلام الرسمي العربي، واصفًا إياه بقنوات "العار" التي تقلب الحقائق وتُشيطن المجاهدين، فيما تبرّئ المحتل وتقدمه كضحية. وذكّر بأنّ الثورة الجزائرية لو وُجدت في زمن هذه القنوات، لاتُّهم المجاهدون بأنهم متهورون يشعلون الحروب ضد قوى عظمى، كما يُتّهم اليوم المقاومون في غزة. وأكد أنّ ما يجري هو معركة مفاهيم خطيرة تهدف إلى تجريد الأمة من فطرتها السليمة واستبدال معايير العزة والكرامة بمفاهيم الخضوع والخوف من القوة.

وفي الشأن الإقليمي، رفض الشيخ تسييس الخلافات المذهبية والطائفية، وأكد أن الوقت ليس وقت التحريش بين مكونات الأمة، بل وقت تجميد الخلافات والاصطفاف خلف القضية المركزية، وهي الدفاع عن الأرض والعرض في غزة. وأشاد بصمود الشعب اليمني، وعبّر عن أسفه من الاستهزاء ببساطة لباسهم وضعف إمكاناتهم، مذكّرًا بأن المجاهدين الحقيقيين لم يحرروا الأوطان لا بالطائرات ولا بالقنابل النووية، وإنما بالعزيمة والإيمان. كما دافع عن حركات المقاومة الفلسطينية، وعلى رأسها "حماس"، وقال إنهم أدوا واجبهم، وعلى المتخاذلين أن يلوموا أنفسهم لا المجاهدين، داعيًا إلى وقف التهجم عليهم، وخاصة في الإعلام.

ولم يُخفِ الشيخ استياءه من موقف بعض الدول العربية التي تمنع دخول اللاجئين من غزة، وتتعامل مع الأراضي الإسلامية وكأنها أملاك وطنية ضيقة، بينما المسلم في أي أرض من دار الإسلام يجب أن يُعامل كالأخ المقيم، لا كالغريب الطارئ. وأكّد أن السماح للفلسطينيين بالدخول إلى مصر أو الجزائر أو غيرها من بلاد المسلمين ليس تهجيرًا، بل هو تفعيلٌ لمعنى الأخوّة، وإحياءٌ لواجبات الجسد الواحد الذي إذا اشتكى منه عضو تداعى له سائر الجسد بالسهر والحمى.

وانتقل الشيخ في كلمته إلى انتقاد المنظومة التعليمية في الجزائر، معتبراً أنها سبب في إنتاج أجيال مشوهة فكريًا وأخلاقيًا، تكره التعليم، وتفقد الثقة في ذاتها، بسبب برامج مفروضة، ومعلمين لا يراعون حرمة الكلمة، وقاعات مكتظة، ومواد تُفرض على الطلبة دون مراعاة ميولاتهم. وقال إن كثيرًا من الطلبة يحبون بعض المواد ويبدعون فيها، لكن النظام يُجبرهم على الخضوع لمسار لا يُناسبهم، ما يؤدي إلى الإحباط والتسرّب من المدرسة، ودمار المستقبل.

وفي ختام كلمته، دعا الشيخ علي بن حاج العلماء والدعاة والإعلاميين إلى القيام بواجبهم، وتحمل مسؤولياتهم التاريخية في توعية الشعوب، وكشف النفاق السياسي، والضغط على الأنظمة لإيقاف هذا الصمت المهين، كما دعا إلى أن تكون العشر الأواخر من رمضان أيام تحريض وبذل، لا فقط خلوات واعتكاف. وذكّر بأن من خانوا الواجب في نازلة غزة سيكونون مسؤولين أمام الله يوم القيامة، مهما صلّوا وصاموا وتلوا القرآن، لأن النصرة لا تتم بالدعاء وحده، بل بالقول والفعل والبذل، كلٌّ حسب طاقته ومجاله، مضيفًا أن من لا يستطيع الجهاد بالسنان، فعليه الجهاد باللسان والبيان، ولا عذر لأحد بعد اليوم.`,
    imageUrl: "/lovable-uploads/b70984a3-8bb6-413d-8e5d-d0647fb60cb6.png",
    videoId: "XS7jF85h9TY",
    category: "كلمات ومواقف"
  }
];
