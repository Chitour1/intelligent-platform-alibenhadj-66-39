import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Search, BookOpen, CalendarDays, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookType } from "../types/books";

const bookTags = ["الفكر الإسلامي", "السياسة الشرعية", "الفقه", "العقيدة", "الإصلاح", "التربية", "التاريخ", "الاحتجاج السلمي", "العلاقات الدولية", "الأمن القومي", "الوحدة الإسلامية", "السيادة الوطنية", "الاستعمار", "حوار الأديان", "الأموال العامة", "الفساد", "الرقابة الشرعية"];

// Export booksData so it can be used in other components
export const booksData: BookType[] = [
  {
    id: 1,
    title: "البرهان فيما يجب على الراعي والرعية نحو القرآن",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/1c7632ee-4853-4921-b4bb-5ebc916df3c6.png",
    downloadUrl: "https://web.archive.org/web/20121013114024/http://alibenhadj.net/ebooks/elbourhane.rar",
    year: "٢٠١٥",
    publicationDate: "٢٤ مارس ٢٠٢٥",
    pages: "٦٢",
    description: "يطرح الشيخ علي بن حاج في هذا الكتاب رؤية شرعية وفكرية ناقدة للعلاقة بين الحاكم والمحكوم تجاه القرآن الكريم، ويتناول بالتفصيل الواجبات الدينية والسياسية التي ينبغي أن يلتزم بها كل من الراعي (الحاكم) والرعية (الشعب) تجاه كتاب الله عز وجل، مع تسليط الضوء على مظاهر الانحراف عن هذه الواجبات في الواقع المعاصر.",
    tags: ["الفكر الإسلامي", "السياسة الشرعية", "الإصلاح"],
    fullDescription: `يطرح الشيخ علي بن حاج هذا الكتاب، الذي يقع في 62 صفحة، رؤية شرعية وفكرية ناقدة للعلاقة بين الحاكم والمحكوم تجاه القرآن الكريم، ويتناول بالتفصيل الواجبات الدينية والسياسية التي ينبغي أن يلتزم بها كل من الراعي (الحاكم) والرعية (الشعب) تجاه كتاب الله عز وجل، مع تسليط الضوء على مظاهر الانحراف عن هذه الواجبات في الواقع المعاصر.

ينطلق المؤلف من واقع يُكرَّم فيه القرآن في المناسبات الاحتفالية، بينما تُعطَّل أحكامه في الواقع العملي والتشريعي، معتبرًا أن هذا السلوك يمثل "كارثة الكوارث" في حياة المسلمين اليوم. ويعرض المؤلف نقدًا شديدًا للحكام الذين يحصرون علاقتهم بالقرآن في التلاوة والتكريم الموسمي، متجاهلين تطبيق الشريعة وإقامة الحدود، ويحمّل المسؤولية كذلك لعلماء السلطة الذين يسكتون عن هذا الواقع.

كما يستعرض الكتاب مكانة القرآن في حياة السلف الصالح، مؤكدًا أن تعاملهم مع القرآن كان قائمًا على ثلاثية: الحفظ، الفهم، والعمل، ويقارن ذلك بواقع الخلف الذين اكتفوا بالحفظ والتجويد، وتركوا التدبر والتطبيق. ويركّز على أن المقصد الأسمى من القرآن هو العمل بأحكامه في كل مجالات الحياة: الفردية، الاجتماعية، السياسية، والاقتصادية.

وينتقد المؤلف ظواهر مثل زخرفة المساجد وتضخيم الصوتيات في تلاوة القرآن مقابل تغييب جوهر رسالته، كما يندد بالتكسب بالقرآن ومحاكاة أصوات القراء بلاً من تدبر المعاني والعمل بها.

يضم الكتاب أيضًا فقرات تتعلق بنقد الأوضاع السياسية في الجزائر والعالم الإسلامي عمومًا، مع عرض مفصّل لما يعتبره كبار انحرافات الحكام، مثل تعطيل الشريعة، وتضييع أموال الأمة، وخذلان القضايا الإسلامية، واغتصاب الحكم.

ويخلص الكاتب إلى أن طريق الخلاص يكمن في العودة إلى القرآن الكريم مرجعية عليا للدولة والمجتمع، وتحقيق الإصلاح الحقيقي من خلال إقامة أحكام الله في الأرض.`
  },
  {
    id: 2,
    title: "إجادة التحبير في بيان قواعد التغيير",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/78ff808b-a7c0-45b5-b93d-18ef4e6cc70a.png",
    downloadUrl: "https://web.archive.org/web/20130820181915/http://alibenhadj.net/ebooks/el-taghyir1.rar",
    year: "١٩٩٠",
    publicationDate: "٢٨ جوان ١٩٩٠",
    pages: "١٥",
    description: "رسالة فكرية قصيرة تؤصل لمفهوم التغيير من منظور إسلامي، وتحدد القواعد الشرعية والمنهجية التي ينبغي أن تحكم العمل الدعوي والسياسي.",
    tags: ["الفكر الإسلامي", "السياسة الشرعية", "الإصلاح"],
    fullDescription: `إجادة التحبير في بيان قواعد التغيير هي رسالة قصيرة كتبها الشيخ علي بن حاج، نُشرت يوم الخميس 5 ذو الحجة 1410 هـ الموافق لـ 28 جوان 1990 م، على صفحات جريدة المنقذ، الناطقة بلسان الجبهة الإسلامية للإنقاذ، وتُعد من أولى الكتابات العلنية التي أُدرجت ضمن الخط الفكري والدعوي والسياسي للجبهة قبيل دخولها المعترك الانتخابي.

تتوجه الرسالة إلى عموم أبناء الحركة الإسلامية، وعموم الأمة، في وقت كانت تشهد فيه الجزائر حراكًا سياسيًا واسعًا بعد إعلان التعددية، وقد جاءت في سياق بيان معالم فقه التغيير الإسلامي الصحيح، وبيان الفروق الجوهرية بين التغيير المشروع والتغيير الفوضوي أو المنفلت من ضوابط الشرع.

تبدأ الرسالة بالتأكيد على أن التغيير فريضة شرعية لا يمكن التغافل عنها أو تأجيلها، وأنها من "المعلوم من الدين بالضرورة"، خصوصًا في مواجهة الطغيان والاستبداد، والواقع الذي يخالف شريعة الله في الحكم والإدارة والمجتمع.

ثم ينتقل الشيخ إلى بيان خمس قواعد أساسية تحكم العمل التغييري في الإسلام:

القاعدة الأولى: الانطلاق من العقيدة الصحيحة
فالعقيدة هي أساس كل تغيير، ومن لم يقم على أساس التوحيد الخالص فلن يُفلح تغييره، مهما بدا ظاهرًا جذابًا.

القاعدة الثانية: التمييز بين التبليغ والتنفيذ
فليس من الضروري أن من يبلّغ الأحكام هو نفسه من يطبقها، بل التطبيق يراعي الظروف، والمراحل، والأولويات، ومراعاة السياسة الشرعية.

القاعدة الثالثة: التفريق بين الأحكام القطعية والاجتهادية
حيث يميز الإسلام بين ما هو معلوم من الدين بالضرورة، وبين ما هو قابل للاجتهاد والاختلاف.

القاعدة الرابعة: مراعاة السياسة الشرعية في التنزيل
فتنفيذ الأحكام لا يكون مجردًا من السياق، بل يراعى فيه المكان والزمان والمآلات، وظروف الناس المختلفة.

القاعدة الخامسة: التفريق بين الشريعة والفقه
فالشريعة هي ما جاء به الوحي، أما الفقه فهو فهم العلماء لها، ولا يجوز الخلط بين الاثنين، ولا تقديس الاجتهادات البشرية.

تُبرز الرسالة وضوح رؤية الشيخ علي بن حاج في الجمع بين الثبات على الأصول والمرونة في الوسائل، وتظهر تمسكه بمشروع شامل للتغيير ينطلق من العقيدة، ويمر عبر الفهم العميق للواقع، وينتهي إلى تنزيل الأحكام بما يراعي فقه المآلات والسياسة الشرعية.

كما تؤكد الرسالة على الخط السلمي والتربوي والإصلاحي الذي تنتهجه الجبهة الإسلامية للإنقاذ، مع وضوح في الموقف من الأنظمة الحاكمة التي عطلت الشريعة، ونشرت الفساد السياسي والاجتماعي.

وتُعد هذه الرسالة من النصوص التأسيسية التي تعبّر عن الخط الفكري للسلفية الحركية في الجزائر، وتقدّم تصورًا متماسكًا لقضية التغيير الإسلامي من داخل المجتمع، دون التسرع أو التصادم غير المنضبط.`
  },
  {
    id: 3,
    title: "فصل الكلام في مواجهة ظلم الحكام",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/8347189a-231d-4ccb-88ce-5b1e21808013.png",
    downloadUrl: "https://archive.org/download/faslalkalamfemuwajahathulmalhukkam/%D9%81%D8%B5%D9%84%20%D8%A7%D9%84%D9%83%D9%84%D8%A7%D9%85%20%D9%81%D9%89%20%D9%85%D9%88%D8%A7%D8%AC%D9%87%D8%A9%20%D8%B8%D9%84%D9%85%20%D8%A7%D9%84%D8%AD%D9%83%D8%A7%D9%85%20%D9%84%D9%84%D8%B4%D9%8A%D8%AE%20%D8%B9%D9%84%D9%8A%20%D8%A8%D9%84%D8%AD%D8%A7%D8%AC.pdf",
    year: "١٩٩٢",
    pages: "٢٢٦",
    description: "وثيقة فكرية سياسية شرعية، كُتبت من داخل سجن البليدة العسكري، تتناول العلاقة بين الحاكم والمحكوم من منظور إسلامي، وتعرض بالنقد الجريء لما يعتبره المؤلف انحرافًا خطيرًا عن مبادئ الحكم الرشيد في الإسلام.",
    tags: ["السياسة الشرعية", "الفكر الإسلامي", "الإصلاح"],
    fullDescription: `يقع كتاب "فصل الكلام في مواجهة ظلم الحكام" في 226 صفحة، وهو من تأليف الشيخ علي بن حاج، نائب رئيس الجبهة الإسلامية للإنقاذ في الجزائر. كُتب هذا العمل من داخل سجن البليدة العسكري سنة 1992، بعد إلغاء المسار الانتخابي الذي كادت الجبهة تفوز فيه بأغلبية ساحقة. يُعد الكتاب وثيقة فكرية سياسية شرعية، تتناول العلاقة بين الحاكم والمحكوم من منظور إسلامي، وتعرض بالنقد الجريء لما يعتبره المؤلف انحرافًا خطيرًا عن مبادئ الحكم الرشيد في الإسلام.

📌 سياق الكتاب
كُتب في ظرف سياسي وأمني بالغ الحساسية، حين كانت الجزائر تمر بواحدة من أخطر أزماتها السياسية، عقب وقف الانتخابات التشريعية في دورها الثاني، وما تبعه من اعتقالات، وقمع، واتهامات للإسلاميين بالإرهاب، في حين يرى المؤلف أن ما حدث هو انقلاب عسكري على إرادة الشعب، وأن قاومته واجب شرعي.

🧱 هيكلة الكتاب ومضامينه الأساسية
الكتاب مقسم إلى أربعة محاور رئيسة، تمثل بناء فكريًا متماسكًا:

1. وجوب العمل السياسي لإقامة الدولة الإسلامية
يؤكد فيه المؤلف أن العمل السياسي من صميم الإسلام، لا سيما إذا كان الهدف هو إقامة حكم شرعي.

يرد على من يعتبرون السياسة "دنسًا" أو خارجة عن الدين، مستندًا إلى القرآن والسنة وأقوال العلماء.

يعرض نماذج من السيرة النبوية وسير الخلفاء الراشدين، موضحًا أن الإسلام لم يعرف الفصل بين الدين والسياسة.

2. أصول النظام السياسي الإسلامي في اختيار الحاكم
يوضح الشروط التي يجب أن تتوفر في الحاكم في الإسلام، وعلى رأسها العدل، الشورى، وعدم التسلط أو التوريث.

يرفض بشكل صارم الحكم العسكري، وشرعية المتغلب، ويدعو إلى اختيار الحاكم عن طريق الأمة.

يعرض أقوال كبار العلماء في رفض الحكم الوراثي أو الانقلابي، من أمثال ابن تيمية، الجويني، الماوردي، وابن خلدون.

3. خصائص الأنظمة الدكتاتورية العسكرية
يُفكك الكاتب طبيعة الحكم العسكري الذي يهيمن على الدول الإسلامية، ويرى أنه:

لا يقوم على الشرعية.

يقيد الحريات ويستغل القضاء والإعلام لقمع المعارضة.

يصنع نخبة فاسدة، ويصادر حقوق الشعوب.

يعرض صورًا من التضليل الإعلامي، والاتهامات الملفقة للإسلاميين بالإرهاب والتطرف.

ينتقد استعمال القانون لتبرير الظلم، وتحويل النقد السياسي إلى "قذف" و"تحريض" و"خيانة للوطن".

4. مشروعية مقاومة الأنظمة الجائرة
يبين فيه مشروعية مقاومة الأنظمة المستبدة من خلال:

النصوص الشرعية: القرآن والسنة.

فتاوى علماء الإسلام: مثل الإمام أحمد، ابن تيمية، ابن حزم، الشاطبي وغيرهم.

تجارب تاريخية غربية: يذكّر بمقاومة الشعوب الأوروبية للملوك والطغاة.

يؤكد أن الثورات على الظلم ليست بدعة، بل ضرورة إذا فُقِد العدل، وضُيّعت الحقوق.

يرفض المقولة التي تشرّع طاعة المتغلب لمجرد "الواقع"، ويعتبر أن ذلك تزييف للشرع.

✍️ خصائص الأسلوب واللغة
أسلوب الكتاب يجمع بين العاطفة القوية، والتحليل العميق، والاستشهاد المكثف بالنصوص.

يُخاطب القارئ مباشرةً، ويتبنى لهجة خطابية حماسية، تُشعر بالصدق والانفعال.

يُكثر من الاستشهاد بالقرآن، السنة، أقوال السلف، التجارب السياسية الغربية، بل وحتى نصوص القانون الجزائري والدولي.

🎯 الرسالة الأساسية للكتاب
الكتاب هو مرافعة شرعية وسياسية في وجه الطغيان، وصرخة من داخل السجن ضد:

مصادرة حق الشعوب في اختيار حكامها.

تزييف الشرع لخدمة الطغاة.

قمع الأصوات الحرة تحت شعار "الأمن" و"الوحدة الوطنية".

ويقدّم الكتاب في النهاية دعوة صريحة إلى أن الطغيان لا يُقاوَم بالسكوت ولا بالتقية، بل بالمواجهة الصريحة ولو كلفت السجن أو الموت.

🛒 ملاحظات ختامية
هذا الكتاب يُعد من أهم ما كتبه علي بن حاج، ويُعبّر عن مدرسة فكرية إسلامية تؤمن بالمزاوجة بين الدين والسياسة، وترفض الانفصال بين الدعوة والحكم.

هو أيضًا مرجع مهم لفهم الخطاب الإسلامي في الجزائر خلال التسعينيات، في مواجهة الطغيان العسكري.`
  },
  {
    id: 4,
    title: "جناية القوانين الدولية على الأحكام الشرعية والسيادة الوطنية",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/9f770200-2b1c-485e-a8d5-619fab6074d8.png",
    downloadUrl: "https://web.archive.org/web/20130807054836/http://www.alibenhadj.net/upload/ebook/djenaya.rar",
    year: "٢٠١٠",
    publicationDate: "١٤ أفريل ٢٠١٠",
    pages: "١٥",
    description: "رسالة فكرية وسياسية تتناول بالنقد والتحليل المفهوم المتداول دوليًا لما يسمى بـ'القانون الدولي'، وترى فيه أداة استعمارية حديثة تُستخدم لإخضاع الدول الإسلامية وتجريدها من سيادتها.",
    tags: ["الفكر الإسلامي", "السياسة الشرعية", "العلاقات الدولية", "السيادة الوطنية", "الاستعمار"],
    fullDescription: `تعد رسالة "جناية القوانين الدولية على الأحكام الشرعية والسيادة الوطنية" من تأليف الشيخ علي بن حاج، كُتبت بتاريخ 29 ربيع الثاني 1431 هـ، الموافق لـ 14 أفريل 2010 م، تقع في 15 صفحة، من أبرز المواقف الفكرية والسياسية التي تبناها في سياق تصاعد الهيمنة الغربية على العالم الإسلامي، خاصة بعد أحداث 11 سبتمبر، وتكثيف الضغوط الدولية باسم "القانون الدولي"، و"محاربة الإرهاب"، و"حقوق الإنسان".

تتناول الرسالة بالنقد والتحليل المفهوم المتداول دوليًا لما يسمى بـ"القانون الدولي"، وترى فيه أداة استعمارية حديثة تُستخدم لإخضاع الدول الإسلامية وتجريدها من سيادتها الدينية والسياسية والتشريعية، عبر فرض قوانين وقيم مستوردة لا تنبع من عقيدتها ولا تعبّر عن إرادة شعوبها.

يفكك المؤلف من خلال هذه الرسالة بنية الخطاب القانوني الدولي، فيبيّن أن معظم المواثيق الدولية – رغم شعاراتها الحقوقية – تفتقر إلى الحياد، وتُطبّق بانتقائية تخدم القوى الكبرى، فيما تُفرض على الدول الضعيفة بأشكال من الابتزاز السياسي أو الاقتصادي أو العسكري، ويتم تمريرها داخل البلدان الإسلامية من خلال أنظمة لا تمثل شعوبها، ولا تحكم بشرع الله، بل توظف تلك القوانين لضرب الخصوم، وتكميم الأفواه، والتضييق على الدعوة.

تحذّر الرسالة من خطورة القبول بما يسمى "الشرعية الدولية" على حساب المرجعية الشرعية، وتؤكد أن التنازل عن السيادة باسم المعاهدات والمواثيق يُعد خيانة للهوية والعقيدة، خاصة إذا كانت تلك القوانين تتناقض مع أحكام الإسلام في مجالات العقوبات، والسياسة، والأحوال الشخصية، والاقتصاد، والسيادة لتشريعية.

وترض الرسالة نماذج واقعية تُظهر كيف تم استخدام القانون الدولي لتبرير احتلال فلسطين، وغزو العراق وأفغانستان، ودعم الأنظمة العسكرية في العالم الإسلامي، والتغطية على انتهاكات صارخة لحقوق الشعوب، بينما تُقابل مقاومة الشعوب بوصفها "إرهابًا"، وتُجرَّم كل محاولة للخروج على الواقع الفاسد بحجة "المشروعية الدولية".

كما تنتقد الرسالة التبعية الفكرية والسياسية للنخب الحاكمة، التي لا ترى بأسًا في تعديل الدساتير، وفرض قوانين مدنية دخيلة، وتهميش الشريعة، بدعوى "الالتزام بالاتفاقات الدولية"، في ظل صمت كثير من العلماء والفقهاء أو تواطئهم.

في خاتمتها، تؤكد الرسالة أن استعادة السيادة لا تكون بمجرد الشعارات، بل بعودة الأمة إلى مرجعيتها القرآنية، ورفض كل قانون يخالفها، وامتلاك إرادة سياسية وشعبية تُعيد الاعتبار لحق الأمة في التشريع، والحكم، والتمثيل.

تمثل هذه الرسالة بيانًا مختصرًا في التحصين الفكري والسياسي، ودعوة إلى وعي قانوني وشرعي يُدرك الفخاخ التي تُنصب للأمة باسم المواثيق الدولية، وتعيد التذكير بأن الإسلام ليس تابعًا، بل هو أصلٌ ومصدر، وأن السيادة في الإسلام لله وحده، لا للأمم المتحدة، ولا لمجلس الأمن، ولا لقوانين تفرض من خارج عقيدة الأمة وشريعتها.`
  },
  {
    id: 5,
    title: "النظرة الموضوعية الكفيلة بحل جذور الأزمة الجزائرية",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/c057df63-ad64-4878-aaab-3be2e8411d4d.png",
    downloadUrl: "https://web.archive.org/web/20130806221842/http://alibenhadj.net/upload/ebook/elnadra.rar",
    year: "٢٠١٠",
    publicationDate: "٢٢ نوفمبر ٢٠١٠",
    pages: "١٥",
    description: "رسالة سياسية تتضمن قراءة تحليلية للأزمة الجزائرية الداخلية، مركزًا على جذورها العميقة ومسلّطًا الضوء على النقاط التي يراها المؤلف أساسية لكل معالجة صادقة وعادلة.",
    tags: ["الفكر الإسلامي", "السياسة الشرعية", "الإصلاح"],
    fullDescription: `النظرة الموضوعية الكفيلة بحل جذور الأزمة الجزائرية هي رسالة سياسية كتبها الشيخ علي بن حاج في الجزائر بتاريخ 16 ذي الحجة 1431 هـ الموافق لـ 22 نوفمبر 2010 م، في الذكرى الحادية عشرة لاغتيال الأستاذ عبد القادر حشاني. تقع الرسالة في 15 صفحة، وتتضمن قراءة تحليلية للأزمة الجزائرية الداخلية، مركزًا على جذورها العميقة ومسلّطًا الضوء على النقاط التي يراها المؤلف أساسية لكل معالجة صادقة وعادلة.

يبدأ الشيخ رسالته بتجديد العهد مع فقيد الأمة، مؤكدًا أن الذكرى الأليمة لاغتياله مناسبة لتسليط الضوء على أبعاد الأزمة الوطنية، وأسباب الانسداد السياسي، وموقف النظام الرسمي من الحلول الجادة والشجاعة. ويذكّر بمكانة عبد القادر حشاني داخل الجبهة الإسلامية للإنقاذ وخارجه، وبجهوده من أجل المصالحة الوطنية، ودوره السياسي في ظروف حرجة.

يُقسِّم الشيخ عرضه إلى مجموعة من المحاور التي يرى أنها تشكل مدخلًا موضوعيًا لحل جذور الأزمة:

الاعتراف بجذور الأزمة التي بدأت بعد وقف المسار الانتخابي في 1992، وما تبعه من آثار خطيرة على المستوى السياسي والمؤسساتي والاجتماعي.

تشخيص طبيعة النظام السياسي باعتباره يتصرف في الدولة تصرف المالك في ملكه، ويتعامل مع الشعب من منطلق الإقصاء والاستئصال.

فشل الحلول الفوقية والجزئية التي تم فرضها من طرف واحد دون حوار شامل ولا تنازلات متبادلة.

رفض الخطابات الرسمية التي تتجاهل الأسباب الحقيقية للأزمة، أو تحصرها في الإرهاب والتخلف، دون النظر إلى مسؤولية النظام.

يدعو الشيخ إلى المصارحة والمكاشفة والاعتراف بالخطأ، ويؤكد أن أي مصالحة حقيقية لا يمكن أن تُبنى على إنكار الحقائق، أو تغييب الفاعلين الحقيقيين، أو الإبقاء على نفس الآليات التي صنعت الأزمة.

كما يندد بمنع التعددية السياسية الفعلية، وتقييد حرية الإعلام، ومصادرة حق المواطن في التنظيم والتعبير والاحتكام إلى إرادته الحرة. ويرى أن الحل لا يمكن أن يكون أمنيًا أو إعلاميًا، بل سياسيًا عميقًا يبدأ بإعادة الاعتبار للشعب كمصدر للسلطات.

في نهاية الرسالة، يوجه الشيخ نداءً إلى أصحاب القرار والعقلاء بأن الوقت لا يزال سانحًا لتدارك الوضع، شرط توفّر الإرادة السياسية الصادقة، ووقف أساليب التهميش والإقصاء، وفتح المجال لحوار وطني نزيه على قاعدة الاحترام المتبادل وحق الجميع في التعبير والمشاركة.

تُعد هذه الرسالة شهادة تاريخية وموقفًا ثابتًا، تُعبّر عن قراءة موضوعية للأزمة الجزائرية، كما يراها أحد أبرز رموز التيار الإسلامي، بعيدًا عن التوظيف الحزبي أو الخطاب العاطفي، وبلغة هادئة، محكمة، مباشرة، تضع النقاط على الحروف.`
  },
  {
    id: 6,
    title: "من الشواهد الشرعية والنماذج التاريخية على مشروعية الإضرابات والاعتصامات والمظاهرات السلمية",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/95bdf18c-ec6e-49f4-bf83-3fb661e3d6e1.png",
    downloadUrl: "https://web.archive.org/web/20121013114015/http://alibenhadj.net/upload/ebook/chawahide1.rar",
    year: "٢٠١٢",
    pages: "١٨٥",
    description: "كتاب يقدّم أطروحة شاملة في الدفاع عن شرعية وسائل الاحتجاج السلمي من منظور إسلامي، مثل الإضرابات والاعتصامات والمظاهرات، مع عرض أدلة شرعية ونماذج تاريخية.",
    tags: ["الفكر الإسلامي", "السياسة الشرعية", "الاحتجاج السلمي", "الإصلاح"],
    fullDescription: `"من الشواهد الشرعية والنماذج التاريخية على مشروعية الإضرابات والاعتصامات والمظاهرات السلمية" هو كتاب من تأليف الشيخ علي بن حاج سنة 2012، يقع في 185 صفحة، ويقدّم أطروحة شالة في الدفاع عن شرعية وسائل الاحتجاج السلمي من منظور إسلامي، مثل الإضرابات والاعتصامات والمظاهرات، التي كثيرًا ما أُشيع بأنها دخيلة على الإسلام أو محرّمة شرعًا. يعرض الكتاب رؤية فقهية سياسية تستند إلى نصوص شرعية، وتجارب تاريخية إسلامية، ومواقف علمائية معتبرة، في مواجهة فتاوى التحريم التي تصدر عن بعض علماء السلطة.

يبدأ الكتاب بمقدمة بيّن فيها الكاتب السياق العام الذي دفعه لكتابة هذه الرسالة، وهو اتساع نطاق الثورات الشعبية والاحتجاجات في الدول العربية، وتزامنها مع حملات من الفتاوى الرسمية التي تحرّم التظاهر، وتصف المشاركين فيه بالمفسدين في الأرض. ويؤكد المؤلف أن هذه الفتاوى توظف لخدمة الأنظمة المستبدة وقمع الشعوب، وهي في الحقيقة مخالفة لجوهر الشريعة الإسلامية.

يعتمد الكتاب في بنائه على تقديم أكثر من 80 نموذجًا وشاهدًا من القرآن الكريم، والسنة النبوية، والسيرة، وأخبار الصحابة والتابعين، والتاريخ الإسلامي الوسيط والحديث، لإثبات أن الاحتجاج السلمي لم يكن غريبًا عن حياة المسلمين، بل كان موجودًا في أشكال متعددة، ويمثل وسيلة من وسائل إقامة الحجة، والأمر بالمعروف، ورفض الظلم، والمطالبة بالحقوق.

ينقسم المحتوى إلى عدة وحدات رئيسية، منها:

• النماذج القرآنية: مثل خروج سيدنا إبراهيم على أصنام قومه، ومواجهة موسى لفرعون، وقصة أصحاب الأخدود.

• النماذج النبوية: منها نداء النبي على الصفا، وتعرضه للسخرية في الطائف، واستقباله في المدينة، واحتجاج الناس بعد غزوة مؤتة.

• النماذج من الصحابة والتابعين: مثل احتجاج النساء من آل بيت النبي على ضرب الأزواج، وجهر أبي ذر وابن مسعود بالإسلام في مكة.

• النماذج من العلماء: مثل العز بن عبد السلام عندما أسقط بيعة الحاكم الجائر، واحتجاجات الفقهاء في بغداد والقيروان ضد الفساد.

• النماذج من التاريخ المعاصر: احتجاجات علماء الجزائر ضد الاستعمار الفرنسي، ومسيرات الشيخ عبد الحميد بن باديس، والمواقف الجماهيرية في تونس ومصر.

كما يتضمن الكتاب قسمًا خاصًا بالرد على أبرز الشبهات، من بينها:

• أن المظاهرات "بدعة" لم يعرفها السلف.
• أنها تشبه أعمال "الكفار" أو "العلمانيين".
• أن الطاعة المطلقة للحاكم مقدمة على أي اعتراض.

ويفصل الشيخ في الفرق بين المقاصد الشرعية والوسائل المتغيرة، مؤكدًا أن الوسائل الدعوية والسياسية ليست توقيفية، وإنما تخضع للاجتهاد، وأن الأصل في الوسائل هو الإباحة ما لم يرد دليل على التحريم.

ويختم المؤلف بجملة من التنبيهات العلمية الدقيقة، ويورد أكثر من عشرين "فائدة فقهية" تتعلق بفقه الاحتجاج، وحقوق الشعوب، وواجبات العلماء، منها:

• مشروعية نقد الحاكم جهرًا.
• لفرق بين الفتوى لمنقولة والمستنبطة.
• التحذير من تحريف النصوص لتبرير الظلم.
• خطر علماء السوء وفتاواهم المعلّبة.

يمثّل الكتاب مرافعة فكرية شرعية عالية المستوى، ويدعو فيه المؤلف إلى تجاوز فقه الجمود والسكوت، والانحياز إلى فقه العزة والكرامة ومقاومة الظلم. ويخاطب فيه بالأساس العلماء والدعاة والنخب الدينية، مطالبًا إياهم بالانحياز إلى قضايا الأمة، لا إلى أنظمتها.

يمكن اعتبار هذا الكتاب بمثابة مرجع في فقه الثورة السلمية داخل الفكر الإسلامي المعاصر، وهو أيضًا سجل تاريخي للعديد من المواقف المنسية التي تؤكد أن السكوت عن الظلم ليس من الإسلام في شيء.`
  },
  {
    id: 7,
    title: "حكم امتلاك الأسلحة النووية والموقف من الأزمة الإيرانية في ميزان السياسة الشرعية والنظرة الإستراتيجية",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/da2ef2c6-ffec-41f9-85fb-9d958c68b16c.png",
    downloadUrl: "https://web.archive.org/web/20130119125303/http://alibenhadj.net/ebooks/houkm-asliha.rar",
    year: "٢٠١٢",
    pages: "٢٣٢",
    description: "كتاب يطرح رؤية فقهية وسياسية معمقة لقضية امتلاك الدول الإسلامية للأسلحة النووية، في ظل التهديدات الغربية المتصاعدة، لاسيما تجاه إيران في بداية العقد الثاني من القرن الحادي والعشرين.",
    tags: ["الفكر الإسلامي", "السياسة الشرعية", "العلاقات الدولية", "الأمن القومي"],
    fullDescription: `حكم امتلاك الأسلحة النووية والموقف من الأزمة الإيرانية هو كتاب من تأليف الشيخ علي بن حاج سنة 2012، يقع في 232 صفحة، ويطرح رؤية فقهية وسياسية معمقة لقضية امتلاك الدول الإسلامية للأسلحة النووية، في ظل التهديدات الغربية المتصاعدة، لاسيما تجاه إيران في بداية العقد الثاني من القرن الحادي والعشرين. يناقش المؤلف هذه المسألة من منظور شرعي، مستندًا إلى مقاصد الشريعة، وأحكام الجهاد، والفقه السياسي الإسلامي، ويضعها في سياق الأزمة الجيوسياسية التي كانت تهدد بإشعال حرب إقليمية واسعة.

يتناول الكتاب إشكاليتين مركزيتين: أولًا، الموقف الشرعي من امتلاك أسلحة الدمار الشامل – وخاصة النووية – في مواجهة التفوق العسكري الغربي والإسرائيلي؛ وثانيًا، الحكم الشرعي في دعم بلد مسلم – كإيران – في حال تعرضه لعدوان خارجي، رغم الخلاف العقدي والمذهبي مع نظامه الحاكم.

ينطلق المؤلف من مبدأ أن السيادة الإسلامية والاستقلال الحقيقي لا يتحققان إلا بالتكافؤ في وسائل الردع والدفاع، وأن إقصاء الأمة الإسلامية من امتلاك وسائل الحماية الحديثة بحجة أخلاقية أو دينية هو تبرير مرفوض شرعًا، خاصة إذا كانت هذه الوسائل بيد قوى دولية تمارس بها الابتزاز والعدوان.

يستعرض الكتاب آراء العلماء والفقهاء حول مشروعية امتلاك السلاح النووي، ويعر رأيين أساسيين: رأيٌ يُحرّم من باب القتل الجماعي والدمار الشامل، ورأيٌ يُجيز بشرط العدل وعدم الظلم، ويشترط وجود نية الردع والدفاع لا الإبادة. وينتصر الشيخ للرأي الثاني، مستندًا إلى قاعدة "الدفع بالمثل"، واستحضارًا لتاريخ المسلمين في التوازن العسكري مع أعدائهم.

ثم ينتقل الكتاب إلى تحليل دقيق لموقف الغرب من إيران، مشيرًا إلى ازدواجية المعايير، حيث يُمنح الاحتلال الصهيوني غطاءً نوويًا مطلقًا، بينما تُهدَّد دول المنطقة، خاصة إيران، لمجرد الشك في نواياها. ويشدد المؤلف على أن الخلاف العقدي لا يجوز أن يكون مبررًا للوقوف مع المعتدي ضد مسلم يشهد أن لا إله إلا الله، وأن الموقف يجب أن يُبنى على العدل والحق، لا الطائفية والهوى.

ويفرد الشيخ فصلًا خاصًا في التفريق بين العدو الخارجي المعتدي والخلاف الداخلي بين طوائف الأمة، وينتقد دعاوى التكفير العشوائي التي تبرر الحروب الاستباقية، ويؤكد أن الاختلاف لا يسقط واجب النصرة في وجه الاحتلال أو العدوان.

الكتاب غني بالاستشهادات القرآنية والحديثية، وأقوال العلماء من مختلف المذاهب، كما يستعرض تجارب تاريخية وسياسية في تعامل الدول الكبرى مع توازن القوى، مبرزًا أن الأمن القومي الإسلامي لا يمكن أن يُترك رهينة لحسابات القوى الأجنبية أو فتاوى تتجاهل الواقع الاستراتيجي.

وفي الختام، يدعو المؤلف إلى عقد مؤتمر علمي عالمي مستقل، يضم علماء الشريعة والخبراء العسكريين والسياسيين، لصياغة رؤية شرعية جماعية حول قضايا السلاح النووي، وحماية الأمة من الأخطار الوجودية التي تتهددها.

يمثل هذا الكتاب مرجعًا هامًا في الفقه السياسي الإسلامي المعاصر، ويدعو إلى الخروج من الخطاب الدفاعي الانهزامي إلى فقه القوة الرشيدة، القائم على قواعد الشريعة ومصالح الأمة وكرامة الشعوب.`
  },
  {
    id: 8
