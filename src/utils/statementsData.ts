
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
  tags: string[]; // Add the tags property
}

export const statementsData: Statement[] = [
  {
    id: "2", // New ID for this statement
    title: "الشيخ علي بن حاج: اللقاء الإعلامي لتبون مسرحية موجهة لفرنسا ومظهر من مظاهر سيطرة الدولة العميقة",
    date: "٢٣ مارس ٢٠٢٥",
    hijriDate: "٢٣ رمضان ١٤٤٦ هـ",
    excerpt: "في كلمته بتاريخ 23 مارس 2025، خصّ الشيخ علي بن حاج جزءاً كبيراً من حديثه لنقد لاذع لما وصفه بـ\"المسرحية الإعلامية\" التي ظهر فيها الرئيس المعين عبد المجيد تبون",
    content: `في كلمته بتاريخ 23 مارس 2025، خصّ الشيخ علي بن حاج جزءاً كبيراً من حديثه لنقد لاذع لما وصفه بـ"المسرحية الإعلامية" التي ظهر فيها الرئيس المعين عبد المجيد تبون، معتبراً أن اللقاء لم يكن مباشراً ولا حقيقياً، بل مجرد عرض مدبّر بإحكام من قبل الدولة العميقة، موجّه أساساً للخارج، وبالخصوص لفرنسا، أكثر من كونه موجهاً للشعب الجزائري. وندّد بالهيمنة الكاملة للغة الفرنسية على الحوار، معتبراً ذلك خرقاً صارخاً للدستور، ومظهراً من مظاهر استمرار التبعية الثقافية والسياسية لفرنسا.

ورأى الشيخ أن اختيار الصحافيين الثلاثة المشاركين في اللقاء لم يكن عشوائياً ولا حراً، بل تم انتقاؤهم بعناية ممن يلتزمون الصمت ولا يطرحون الأسئلة الحقيقية التي تعكس هموم الشعب، واصفاً أداءهم بالهزيل والمتواطئ. وأكد أن الصحافة الحقيقية يجب أن تحرج المسؤول وتحمّله المسؤولية أمام الشعب، لا أن تتودد إليه وتخدم أجندته الإعلامية، محملاً الإعلام الرسمي مسؤولية التعتيم على القضايا الجوهرية التي تؤرق الجزائريين.

كما اعتبر أن غلبة اللغة الفرنسية في الحوار، وتكرار الأسئلة بهذه اللغة دون ترجمة، يُعدّ إهانة للشعب الجزائري وللغتين الرسميتين: العربية والأمازيغية. وتساءل عن دور المجلس الأعلى للغة العربية، وطالبه بالتحرك لحماية السيادة اللغوية، مؤكداً أن السلطة ما زالت وفية للغة المستعمر ومُصرّة على توجيه رسائل الطمأنة إلى باريس. ووصف المشهد بأنه "فضيحة بجلاجل"، تكشف أن الثقافة الفرنسية لا تزال معشعشة في عقول المسؤولين رغم ادعائهم الولاء للهوية الوطنية.

وفي قراءته للرسائل السياسية المبطّنة في اللقاء، أشار إلى أن الرد على الرئيس الفرنسي ماكرون بدا ناعماً، وغير مباشر، ومحسوباً، مؤكداً أن تبون تعمّد استخدام اللغة الفرنسية لإيصال رسائل سياسية مشفرة لباريس دون وسيط أو ترجمان، في وقت يواجه فيه ماكرون احتجاجات داخلية ويُتهم بالتحالف مع اليمين المتطرف.

وشدد الشيخ على أن الدولة العميقة هي من تدير هذا النوع من اللقاءات، وأن تبون مجرّد واجهة تنفيذية لسلطة خفية تتحكم في الإعلام والقضاء والأمن، بل وحتى في صياغة السياسات. وقال إن اللقاء كشف أن رئيس الجمهورية لا يملك قراره، بل يتحرك وفق أجندة مرسومة سلفاً، ويمارس دوراً تمثيلياً في مشهد سياسي فارغ من المضمون.

كما تساءل عن غياب أيّ تعليق من الشخصيات العلمية والسياسية واللغوية على تجاوزات اللقاء، واعتبر أن الصمت إزاء هذا الانحدار مؤشر على حالة الخوف أو التواطؤ أو ضعف المبادئ لدى من تولوا مناصب باسم الهوية والدستور. واعتبر أن المنابر الإعلامية الرسمية أصبحت أداة تزييف وتضليل، موجهة نحو تجميل صورة السلطة عوض نقل انشغالات الناس.

وأكد أن اللقاء يعبّر عن عقلية "الحكم المغلق"، حيث يتم إعداد كل شيء مسبقاً، من الأسئلة إلى الردود، والرسائل التي يجب تمريرها، بينما يُقصى الشعب والنخب السياسية الحرة من المشهد. ودعا إلى مقاطعة مثل هذه اللقاءات المعلبة، مطالباً بلقاءات مباشرة مفتوحة لكل التوجهات الإعلامية والسياسية دون إقصاء.

وبعد تفصيله في خلفيات اللقاء وشكلياته، ربط الشيخ بين هذه العقلية السلطوية والممارسات القديمة التي وُرثت عن نظام بوتفليقة، معتبراً أن عهد تبون هو امتداد مباشر لمنظومة الفساد والاستبداد التي تحكم الجزائر منذ عقود. وأكد أن تبون نفسه كان جزءاً من هذا النظام لعشرين سنة، ولا يمكن أن يقدّم بديلاً حقيقياً، بل هو منفذ لسياسات وضعتها "العصابة المغلوبة التي أنجبت العصابة الغالبة".

وانتقد بشدة سياسة القمع والإقصاء، وحرمان الأحزاب والتيارات السياسية المخالفة من حقها في التواجد الإعلامي والسياسي، مؤكداً أن التعددية الحقيقية لا تكون عبر الدستور فقط، بل عبر احترام حق المعارضة في النقد والمساءلة، داعياً إلى مرحلة انتقالية تضع دستوراً جديداً يشارك فيه الجميع دون وصاية من الدولة العميقة.

كما شدد الشيخ علي بن حاج على أن ما حدث ليس مجرد "ندوة إعلامية"، بل دليل صارخ على استمرار نفس الممارسات التي ثار عليها الشعب في 2019، محذراً من أن تجاهل إرادة الشعب والاستمرار في الحكم المغلق لن يؤدي إلا إلى المزيد من الأزمات والانفجارات السياسية.

وفي سياق تعقيبه على خطاب تبون، استنكر الشيخ علي بن حاج صمت الرئيس الجزائري التام عن المجازر المرتكبة في غزة، حيث تُقصف البيوت على رؤوس أصحابها، وتُباد العائلات في المساجد وهي قائمة تصلي، دون أن يصدر عنه موقف علني واحد، أو تصريح يليق بمسؤول في دولة تدّعي دعم فلسطين. وقال إن رئيس الجمهورية لم يتجرأ حتى على التنديد بجرائم أمريكا، أو ذكر اسم ترامب، أو لوم الإدارة الأمريكية الحالية على تواطئها، واكتفى بخطاب دبلوماسي باهت، في حين تُمنع في الجزائر حتى الوقفات الرمزية أمام السفارات، بينما الشعوب الأخرى تخرج وتحتج وتصل حتى أبواب الرؤساء.

وأشار إلى أن ما يجري في غزة اليوم هو جريمة كبرى، لا تُغتفر لمن سكت عنها، مذكرًا بأن الشيخ البردويل وزوجته قُصفا وهم يصلون، وأن المجاهدين هناك لا يواجهون جيشًا نظاميًا بل صواريخ تنزل عليهم وهم في محرابهم، داعيًا إلى إحياء فريضة الجهاد في الأمة، والتذكير بها في كل مناسبة، لأن فريضة الوقت اليوم هي نصرة فلسطين، وأن العلماء والدعاة شركاء في الدم إن سكتوا.

وانتقل بعد ذلك إلى الحديث عن أهمية الصمت في حياة المسلم، مشددًا على أن الأصل في المؤمن أن لا يتكلم إلا إذا كان في قوله نفع، وأن السلف كانوا أصحاب أفعال لا أقوال، يزنون كلامهم بميزان الشرع، ويخشون من كثرة اللغو، داعيًا المسلمين في رمضان إلى الإمساك عن الجدال والمراء، لا عن الطعام فقط. وربط بين قلة الكلام وارتفاع الهمة، واستشهد بحديث النبي صلى الله عليه وسلم عن أن أكثر الناس كلامًا هم أكثرهم خطأً، وذكّر بكتاب "الصمت" للإمام ابن أبي الدنيا، ناصحًا بقراءته.

ثم تناول بإسهاب موضوع التربية والتعليم، منتقدًا غياب التربية الدينية في المنظومة التعليمية الجزائرية، ومؤكدًا أن الجيل الحالي لم يتلقّ من المدرسة ولا من الإعلام ولا من الشارع ما يؤهله لفهم الدين بشكل سليم، محمّلًا السلطة مسؤولية تعمد تهميش التعليم الديني وإبعاده عن البرامج اليومية، وتحويله إلى مادة ثانوية تُدرّس ساعة واحدة أسبوعيًا، في حين تُدرّس مواد الرياضة والعلوم أكثر، بل وتُفصل وزارة الشؤون الدينية عن التربية، ما جعل الأطفال ينشؤون على الانحراف اللغوي والسلوكي، دون رادع، ودون قدوة.

وانتقد أيضًا التضييق على الملتزمين والمعلمات المحجبات، والتعامل مع المظاهر الدينية بنوع من الريبة والإقصاء، مطالبًا بعودة الدين إلى مركز العملية التربوية، وبتوفير معلمين أكفاء في هذا المجال، لأن تدريس الشريعة لا يُكلّف به أي شخص عابر، بل يحتاج إلى رجال ونساء مؤهلين، يُربون قبل أن يُعلّموا.

ثم فتح الشيخ ملف المظالم السياسية، داعيًا إلى تمكين الأحزاب من النشاط والتأسيس بالإخطار لا بالترخيص، وإلى إنهاء وصاية وزارة الداخلية على الحياة السياسية، مشيرًا إلى أن الحزب السياسي يُحلّ عند الانحراف بحكم قضائي، لا بمنشور إداري، وإلا تحولت التعددية إلى مسرحية شكلية.

واستنكر حال الصحافة، التي وصفها بأنها خضعت كليًا للسلطة، وصارت بلا روح، ولا جرأة، ولا شجاعة، وتحولت من سلطة رقابة إلى أداة تزيين، وقال إن الرئيس ظهر في اللقاء الصحفي الأخير محاطًا بصحفيين يجاملونه بدل محاورته، ويسألون أسئلة مكررة، دون أن ينقلوا له هموم الشعب أو يحرجوه بمواقف الشارع، متسائلًا عن معيار اختيارهم، وكيف سُمح لهم وحدهم بالحضور، بينما حُرم باقي الصحافيين والسياسيين من المشاركة والتعليق.

وفي ما يخص واقع السجون، دعا إلى الإفراج عن كل معتقل بسبب الرأي أو الانتماء السياسي، وانتقد إبقاء البعض لسنوات دون محاكمة، أو تحويل جناياتهم إلى جنح، في حين يُعامل آخرون بتسهيلات خاصة. وأشاد بإجراء السماح بالاتصال الهاتفي بين المساجين وأهاليهم، لكنه اعتبره متأخرًا، ودعا إلى تسريع تعميمه، مشددًا على أن الإسلام سبق كل القوانين في احترام إنسانية الأسير، بل أوجب له حتى الخلوة الشرعية، حفاظًا على المشاعر وصونًا للأسرة.

واختتم الشيخ كلمته بالتذكير بأن إضعاف الحكم الشرعي هو أول خيوط نقض عرى الإسلام، كما ورد في الحديث النبوي، وأنه لا يجوز تزيين المشهد بتوزيع المصاحف ليلة القدر بينما تُعطّل أحكام القرآن، وتُقصى الشريعة، ويُسجن الدعاة. واعتبر أن لقاء تبون الأخير لم يُقنع أحدًا، بل كشف زيف الخطاب الرسمي، واستمرار سيطرة الدولة العميقة، داعيًا إلى يقظة شعبية شاملة، تبدأ من إعادة الاعتبار للدين، وإحياء الروح السياسية الحرة، والتحرر من قبضة الفساد والاستبداد، لأن إصلاح الحكم هو مفتاح إصلاح العباد والبلاد.`,
    imageUrl: "/lovable-uploads/059d09a5-d92d-4fc6-92ab-b44da1b6e909.png",
    videoId: "57X7fzssUQY",
    category: "كلمات ومواقف",
    tags: ["سياسة", "نقد", "إعلام", "الجزائر", "فرنسا"]
  },
  {
    id: "1",
    title: "علي بن حاج يدعو إلى إحياء فريضة الجهاد نصرة لغزة ويتّهم الحكام والعلماء بالتقصير والتواطؤ",
    date: "٢٢ مارس ٢٠٢٥",
    hijriDate: "٢٢ رمضان ١٤٤٦ هـ",
    excerpt: "بثت قناة الهيئة الإعلامية للشيخ علي بن حاج على اليوتيوب مساء الجمعة كلمة أكد فيها أنّ ما يجري في غزة من مجازر وإبادة جماعية يوجب على الأمة أن تنهض بكامل طاقتها لنصرة الشعب الفلسطيني، وعلى رأس ذلك إحياء فريضة الجهاد.",
    content: `بثت قناة الهيئة الإعلامية للشيخ علي بن حاج على اليوتيوب مساء الجمعة 22 مارس 2025 الموافق لـ 22 رمضان 1446 هـ، كلمة للشيخ وجّه فيها نداءً قويًا وصريحًا إلى الأمة الإسلامية، أكد فيه أنّ ما يجري في غزة من مجازر وإبادة جماعية يوجب على الأمة أن تنهض بكامل طاقتها لنصرة الشعب الفلسطيني، وعلى رأس ذلك إحياء فريضة الجهاد التي اعتبرها "فريضة الوقت" بلا منازع. وقال إنّ الجهاد ليس خيارًا ثانويًا، ولا ترفًا فكريًا، بل هو حكم شرعي مُلزم في ظلّ نازلة كبرى أصابت المسلمين، مذكّرًا بما أجمعت عليه كتب الفقه والتفسير حول وجوب النفير عند وقوع العدوان على جزء من ديار المسلمين. وعبّر بأسى وغضب عن تغييب هذا الحكم من المنابر والبرامج الدينية، التي اكتفت في العشر الأواخر من رمضان بالكلام عن الاعتكاف والعمرة وفضل ليلة القدر، دون أن تُعرّج على كارثة غزة التي قال إنها جريمة كبرى تقتضي من العلماء والدعاة أن يُبيّنوا للناس الأحكام الشرعية المتعلقة بها، وفي مقدمتها فريضة الجهاد.

لم يخف الشيخ حزنه ودهشته من صمت الحكام والملوك والرؤساء العرب، رغم امتلاكهم جيوشًا وأسلحة فتاكة لا تُستخدم إلا في العروض العسكرية أو لقمع شعوبهم إذا طالبت بالحرية أو اختارت حكّامها عبر صناديق الاقتراع. وانتقد كذلك العلماء والدعاة الذين صمتوا أو اكتفوا بالدعاء في آخر خطبة الجمعة دون ذكرٍ لغزة أو لما يفرضه الوضع من مواقف شرعية واضحة، وتساءل: هل نزل الجهاد من كونه ذروة سنام الإسلام إلى مجرد رواية تُتلى وسيرة تُحكى؟ وأكد أن الاقتصار على الدعاء مع القدرة على النصرة يُعد تقصيرًا لا يُقبل شرعًا، وضرب مثالًا بالرجل الذي يُهاجم في بيته فيكتفي بالدعاء دون أن يواجه المعتدين، واصفًا ذلك بالعبث لا بالدين.

كما خصّص جزءًا كبيرًا من كلمته للهجوم على الإعلام الرسمي العربي، واصفًا إياه بقنوات "العار" التي تقلب الحقائق وتُشيطن المجاهدين، فيما تبرّئ المحتل وتقدمه كضحية. وذكّر بأنّ الثورة الجزائرية لو وُجدت في زمن هذه القنوات، لاتُّهم المجاهدون بأنهم متهورون يشعلون الحروب ضد قوى عظمى، كما يُتّهم اليوم المقاومون في غزة. وأكد أنّ ما يجري هو معركة مفاهيم خطيرة تهدف إلى تجريد الأمة من فطرتها السليمة واستبدال معايير العزة والكرامة بمفاهيم الخضوع والخوف من القوة.

وفي الشأن الإقليمي، رفض الشيخ تسييس الخلافات المذهبية والطائفية، وأكد أن الوقت ليس وقت التحريش بين مكونات الأمة، بل وقت تجميد الخلافات والاصطفاف خلف القضية المركزية، وهي الدفاع عن الأرض والعرض في غزة. وأشاد بصمود الشعب اليمني، وعبّر عن أسفه من الاستهزاء ببساطة لباسهم وضعف إمكاناتهم، مذكّرًا بأن المجاهدين الحقيقيين لم يحرروا الأوطان لا بالطائرات ولا بالقنابل النووية، وإنما بالعزيمة والإيمان. كما دافع عن حركات المقاومة الفلسطينية، وعلى رأسها "حماس"، وقال إنهم أدوا واجبهم، وعلى المتخاذلين أن يلوموا أنفسهم لا المجاهدين، داعيًا إلى وقف التهجم عليهم، وخاصة في الإعلام.

ولم يُخفِ الشيخ استياءه من موقف بعض الدول العربية التي تمنع دخول اللاجئين من غزة، وتتعامل مع الأراضي الإسلامية وكأنها أملاك وطنية ضيقة، بينما المسلم في أي أرض من دار الإسلام يجب أن يُعامل كالأخ المقيم، لا كالغريب الطارئ. وأكد أن السماح للفلسطينيين بالدخول إلى مصر أو الجزائر أو غيرها من بلاد المسلمين ليس تهجيرًا، بل هو تفعيلٌ لمعنى الأخوّة، وإحياءٌ لواجبات الجسد الواحد الذي إذا اشتكى منه عضو تداعى له سائر الجسد بالسهر والحمى.

وانتقل الشيخ في كلمته إلى انتقاد المنظومة التعليمية في الجزائر، معتبراً أنها سبب في إنتاج أجيال مشوهة فكريًا وأخلاقيًا، تكره التعليم، وتفقد الثقة في ذاتها، بسبب برامج مفروضة، ومعلمين لا يراعون حرمة الكلمة، وقاعات مكتظة، ومواد تُفرض على الطلبة دون مراعاة ميولاتهم. وقال إن كثيرًا من الطلبة يحبون بعض المواد ويبدعون فيها، لكن النظام يُجبرهم على الخضوع لمسار لا يُناسبهم، ما يؤدي إلى الإحباط والتسرّب من المدرسة، ودمار المستقبل.

وفي ختام كلمته، دعا الشيخ علي بن حاج العلماء والدعاة والإعلاميين إلى القيام بواجبهم، وتحمل مسؤولياتهم التاريخية في توعية الشعوب، وكشف النفاق السياسي، والضغط على الأنظمة لإيقاف هذا الصمت المهين، كما دعا إلى أن تكون العشر الأواخر من رمضان أيام تحريض وبذل، لا فقط خلوات واعتكاف. وذكّر بأن من خانوا الواجب في نازلة غزة سيكونون مسؤولين أمام الله يوم القيامة، مهما صلّوا وصاموا وتلوا القرآن، لأن النصرة لا تتم بالدعاء وحده، بل بالقول والفعل والبذل، كلٌّ حسب طاقته ومجاله، مضيفًا أن من لا يستطيع الجهاد بالسنان، فعليه الجهاد باللسان والبيان، ولا عذر لأحد بعد اليوم.`,
    imageUrl: "/lovable-uploads/b70984a3-8bb6-413d-8e5d-d0647fb60cb6.png",
    videoId: "XS7jF85h9TY",
    category: "كلمات ومواقف",
    tags: ["غزة", "فلسطين", "جهاد", "إسلام", "دعوة"]
  }
];
