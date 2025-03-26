import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Search, BookOpen, CalendarDays, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { booksData } from "@/utils/booksData";

const bookTags = ["الفكر الإسلامي", "السياسة الشرعية", "الفقه", "العقيدة", "الإصلاح", "التربية", "التاريخ", "الاحتجاج السلمي", "العلاقات الدولية", "الأمن القومي", "الوحدة الإسلامية"];

interface BookType {
  id: number;
  title: string;
  author: string;
  cover: string;
  downloadUrl: string;
  year: string;
  publicationDate?: string;
  pages: string;
  description: string;
  tags: string[];
  fullDescription?: string;
}

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

وينتقد المؤلف ظواهر مثل زخرفة المساجد وتضخيم الصوتيات في تلاوة القرآن مقابل تغييب جوهر رسالته، كما يندد بالتكسب بالقرآن ومحاكاة أصوات القراء بدلاً من تدبر المعاني والعمل بها.

يضم الكتاب أيضًا فقرات تتعلق بنقد الأوضاع السياسية في الجزائر والعالم الإسلامي عمومًا، مع عرض مفصّل لما يعتبره كبار انحرافات الحكام، مثل تعطيل الشريعة، وتضييع أموال الأمة، وخذلان القضايا الإسلامية، واغتصاب الحكم.

ويخلص الكاتب إلى أن طريق الخلاص يكمن في العودة إلى القرآن الكريم مرجعية عليا للدولة والمجتمع، وتحقيق الإصلاح الحقيقي من خلال إقامة أحكام الله في الأرض.`
  },
  {
    id: 2,
    title: "إجادة التحبير في بيان قواعد التغيير",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/11145f85-9158-4d6c-8db2-bd872efe8d79.png",
    downloadUrl: "https://web.archive.org/web/20130820181915/http://alibenhadj.net/ebooks/el-taghyir1.rar",
    year: "١٩٩٠",
    publicationDate: "٢٨ جوان ١٩٩٠",
    pages: "١٥",
    description: "رسالة فكرية قصيرة تؤصل لمفهوم التغيير من منظور إسلامي، وتحدد القواعد الشرعية والمنهجية التي ينبغي أن تحكم العمل الدعوي والسياسي.",
    tags: ["الفكر الإسلامي", "السياسة الشرعية", "الإصلاح"],
    fullDescription: `إجادة التحبير في بيان قواعد التغيير هي رسالة فكرية قصيرة كتبها الشيخ علي بن حاج، نُشرت يوم الخميس 5 ذو الحجة 1410 هـ، الموافق لـ 28 جوان 1990 م، على صفحات جريدة المنقذ، لسان حال الجبهة الإسلامية للإنقاذ. تقع الرسالة في بضع صفحات، وتُعد من الوثائق التأسيسية التي تُعبّر عن فكر الجبهة في بداياتها، لاسيما في مجال التأصيل الشرعي لقضية "التغيير" في الواقع الإسلامي.

تسعى الرسالة إلى ضبط مفاهيم العمل الدعوي والسياسي ضمن الإطار الشرعي، وتفنيد الخلط الشائع بين مفاهيم الدعوة، الفتوى، الحكم، والموقف السياسي، وتُظهر حرص الشيخ على التأسيس لمنهج متكامل في فقه التغيير، يربط بين العقيدة والمنهج، بين النظرية والممارسة، وبين النصوص والمآلات.

تقوم الرسالة على جملة من القواعد المركزية، أبرزها:

وجوب الانطلاق من التوحيد والمنهج السلفي كأساس للتغيير، مع التحذير من النزعات العاطفية أو التنظيمية البعيدة عن المرجعية الشرعية.

التمييز بين فقه الأحكام وفقه التنزيل، وبين فقه الواقع وفقه التمكين، وضرورة مراعاة الزمان والمكان والمآل.

عدم المساواة بين ما هو معلوم من الدين بالضرورة، وما هو من فروع الفقه أو من الاجتهادات السياسية، مع الدعوة إلى الوضوح في التمييز بين الأحكام الثابتة والمتغيرة.

ضرورة استيعاب قواعد السياسة الشرعية، في التطبيق والتدرج، والتعامل مع القوى والأنظمة، بما يحقق مقاصد الشريعة دون تفريط أو تهور.

توجه الرسالة نقدًا غير مباشر لبعض التوجهات الدعوية التي ترفض العمل السياسي أو تفصل بين الدين والحكم، وتؤكد أن السكوت عن الظلم والتخلي عن فقه التغيير هو من أسباب ضعف الأمة واستمرار الاستبداد.

وتُبرز الرسالة، رغم قصرها، وضوحًا في المفاهيم، وانسجامًا في المنهج، يعكس خلفية علمية شرعية لدى الشيخ علي بن حاج، إلى جانب وعيه بالواقع السياسي والاجتماعي، وقدرته على تأصيل مواقفه بلغة تجمع بين الخطاب الدعوي والتأسيس الفقهي والتحليل السياسي.

تُعد "إجادة التحبير" من النصوص التأسيسية القصيرة التي ألقت الضوء على مفاتيح المنهج السياسي الإسلامي كما تراه الجبهة الإسلامية للإنقاذ، وهي تندرج ضمن سياق تعبوي وتأصيلي سبق الانتخابات البلدية ثم التشريعية، التي كانت تشهد فيها الجبهة تصاعدًا كبيرًا في التأييد الشعبي، مما يجعل من هذه الرسالة وثيقة دالة على فكر المرحلة وتوجهاتها.`
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
كُتب في ظرف سياسي وأمني بالغ الحساسية، حين كانت الجزائر تمر بواحدة من أخطر أزماتها السياسية، عقب وقف الانتخابات التشريعية في دورها الثاني، وما تبعها من اعتقالات، وقمع، واتهامات للإسلاميين بالإرهاب، في حين يرى المؤلف أن ما حدث هو انقلاب عسكري على إرادة الشعب، وأن مقاومته واجب شرعي.

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
    id: 6,
    title: "من الشواهد الشرعية والنماذج التاريخية على مشروعية الإضرابات والاعتصامات والمظاهرات السلمية",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/95bdf18c-ec6e-49f4-bf83-3fb661e3d6e1.png",
    downloadUrl: "https://web.archive.org/web/20121013114015/http://alibenhadj.net/upload/ebook/chawahide1.rar",
    year: "٢٠١٢",
    pages: "١٨٥",
    description: "كتاب يقدّم أطروحة شاملة في الدفاع عن شرعية وسائل الاحتجاج السلمي من منظور إسلامي، مثل الإضرابات والاعتصامات والمظاهرات، مع عرض أدلة شرعية ونماذج تاريخية.",
    tags: ["الفكر الإسلامي", "السياسة الشرعية", "الاحتجاج السلمي", "الإصلاح"],
    fullDescription: `"من الشواهد الشرعية والنماذج التاريخية على مشروعية الإضرابات والاعتصامات والمظاهرات السلمية" هو كتاب من تأليف الشيخ علي بن حاج سنة 2012، يقع في 185 صفحة، ويقدّم أطروحة شاملة في الدفاع عن شرعية وسائل الاحتجاج السلمي من منظور إسلامي، مثل الإضرابات والاعتصامات والمظاهرات، التي كثيرًا ما أُشيع بأنها دخيلة على الإسلام أو محرّمة شرعًا. يعرض الكتاب رؤية فقهية سياسية تستند إلى نصوص شرعية، وتجارب تاريخية إسلامية، ومواقف علمائية معتبرة، في مواجهة فتاوى التحريم التي تصدر عن بعض علماء السلطة.

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
• الفرق بين الفتوى المنقولة والمستنبطة.
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

يستعرض الكتاب آراء العلماء والفقهاء حول مشروعية امتلاك السلاح النووي، ويعرض رأيين أساسيين: رأيٌ يُحرّم من باب القتل الجماعي والدمار الشامل، ورأيٌ يُجيز بشرط العدل وعدم الظلم، ويشترط وجود نية الردع والدفاع لا الإبادة. وينتصر الشيخ للرأي الثاني، مستندًا إلى قاعدة "الدفع بالمثل"، واستحضارًا لتاريخ المسلمين في التوازن العسكري مع أعدائهم.

ثم ينتقل الكتاب إلى تحليل دقيق لموقف الغرب من إيران، مشيرًا إلى ازدواجية المعايير، حيث يُمنح الاحتلال الصهيوني غطاءً نوويًا مطلقًا، بينما تُهدَّد دول المنطقة، خاصة إيران، لمجرد الشك في نواياها. ويشدد المؤلف على أن الخلاف العقدي لا يجوز أن يكون مبررًا للوقوف مع المعتدي ضد مسلم يشهد أن لا إله إلا الله، وأن الموقف يجب أن يُبنى على العدل والحق، لا الطائفية والهوى.

ويفرد الشيخ فصلًا خاصًا في التفريق بين العدو الخارجي المعتدي والخلاف الداخلي بين طوائف الأمة، وينتقد دعاوى التكفير العشوائي التي تبرر الحروب الاستباقية، ويؤكد أن الاختلاف لا يسقط واجب النصرة في وجه الاحتلال أو العدوان.

الكتاب غني بالاستشهادات القرآنية والحديثية، وأقوال العلماء من مختلف المذاهب، كما يستعرض تجارب تاريخية وسياسية في تعامل الدول الكبرى مع توازن القوى، مبرزًا أن الأمن القومي الإسلامي لا يمكن أن يُترك رهينة لحسابات القوى الأجنبية أو فتاوى تتجاهل الواقع الاستراتيجي.

وفي الختام، يدعو المؤلف إلى عقد مؤتمر علمي عالمي مستقل، يضم علماء الشريعة والخبراء العسكريين والسياسيين، لصياغة رؤية شرعية جماعية حول قضايا السلاح النووي، وحماية الأمة من الأخطار الوجودية التي تتهددها.

يمثل هذا الكتاب مرجعًا هامًا في الفقه السياسي الإسلامي المعاصر، ويدعو إلى الخروج من الخطاب الدفاعي الانهزامي إلى فقه القوة الرشيدة، القائم على قواعد الشريعة ومصالح الأمة وكرامة الشعوب.`
  },
  {
    id: 8,
    title: "التذكير بوجوب وحدة الدول الإسلامية والتحذير من مخاطر الحركات الانفصالية",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/c48f156c-7604-4c04-bd4d-70f60e78d3f0.png",
    downloadUrl: "https://web.archive.org/web/20130119101012/http://alibenhadj.net/upload/ebook/tadkire.rar",
    year: "٢٠١٣",
    pages: "٦١",
    description: "كتاب يعالج قضية وحدة الأمة الإسلامية من منظور شرعي وسياسي، محذرًا من النزعات الانفصالية التي تهدد الكيانات الإسلامية المعاصرة.",
    tags: ["الفكر الإسلامي", "السياسة الشرعية", "الوحدة الإسلامية", "الإصلاح"],
    fullDescription: `يعالج الشيخ علي بن حاج في كتاب "التذكير بوجوب وحدة الدول الإسلامية والتحذير من مخاطر الحركات الانفصالية"، قضية وحدة الأمة الإسلامية من منظور شرعي وسياسي، محذرًا من النزعات الانفصالية التي تهدد الكيانات الإسلامية المعاصرة، ويعتبرها من أخطر ما يهدد كيان الأمة في هذا العصر، سواء أتت هذه النزعات بدوافع عرقية، طائفية، لغوية، أو إقليمية.

يرتكز الكتاب الذي هو في الأصل بيان أصدره الشيخ علي بن حاج، ويقع في 61 صفحة. على قاعدة شرعية كبرى مفادها أن الأصل في الإسلام هو الوحدة لا الفرقة، وأن الدعوات الانفصالية هي من جنس "الفتنة" التي أمر الله باجتنابها. يبدأ المؤلف بتذكير الأمة بوجوب الاعتصام بحبل الله جميعًا، مستشهدًا بنصوص من القرآن الكريم والسنة النبوية، وأقوال علماء الأمة الذين حذروا من مخاطر التمزق والاحتراب الداخلي.

ينتقل الكتاب بعد ذلك إلى استعراض عدد من النماذج التاريخية التي تظهر كيف أدت النزعات الانفصالية إلى إضعاف المسلمين، وضياع سيادتهم، وتمكين الاستعمار الغربي من السيطرة على أراضيهم وثرواتهم. ويخصص فصولًا قصيرة لمناقشة الأبعاد السياسية والاستراتيجية التي تستغلها القوى الكبرى لتغذية النزاعات داخل الدول الإسلامية، من أجل تنفيذ مشاريع "التفتيت والتقسيم" تحت غطاء الفيدرالية أو حق تقرير المصير أو الخصوصية الثقافية.

كما يهاجم المؤلف بشدة ما يسميه التوظيف الدولي للنزعات الانفصالية، سواء كان في العراق، أو السودان، أو ليبيا، أو في بعض المناطق الحساسة من الجزائر والعالم الإسلامي، ويؤكد أن كثيرًا من الحركات التي تدّعي المظلومية ما هي إلا أدوات في يد مشاريع استعمارية جديدة، تتخفى خلف شعارات الحرية والهوية.

يدعو الشيخ إلى أن تكون هناك مرجعية إسلامية جامعة تبتّ في هذه القضايا المصيرية، بدل أن تترك للشعوب الغاضبة أو الأقليات المحتقنة أو الأنظمة المستبدة، لأن القرار في مثل هذه النوازل يجب أن يكون مبنيًا على فقه المصالح والمفاسد، وليس على الانفعالات الآنية أو ردات الفعل.

ويؤكد الكتاب أن الإسلام لم يمنع التعدد الثقافي أو التنوع اللغوي أو الخصوصيات المحلية، لكنه في الوقت ذاته أرسى مبدأ وحدة الدين والأمة والسيادة العامة، محذرًا من أن التنازع حول الهويات الجزئية هو أقصر طريق إلى انهيار الدولة والمجتمع.

في خاتمته، يناشد الشيخ النخب الإسلامية والعلماء والمصلحين والسياسيين إلى إطلاق مشروع وحدة فكرية قبل أن تكون سياسية، يُبنى على العقيدة الإسلامية، والتاريخ المشترك، والتحديات الراهنة، لمواجهة مشاريع التفتيت الممنهج الذي بات يُدار إقليميًا ودوليًا تحت شعارات خادعة.

الكتاب يُعد مرافعة شرعية وسياسية، تستحضر النصوص والمقاصد، والتجارب، والتحذيرات الواقعية، من أجل تثبيت مفهوم الوحدة، وإدانة كل مشاريع التشظي التي تمزق الأمة من الداخل، سواء بجهل أبنائها أو بمكر أعدائها.`
  }
];

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Sort books by publication date (most recent first)
  const sortedBooks = [...booksData].sort((a, b) => {
    // If publication date exists, sort by it, otherwise use ID as fallback
    if (a.publicationDate && b.publicationDate) {
      // Simple string comparison for Arabic dates (since they're formatted consistently)
      return a.publicationDate > b.publicationDate ? -1 : 1;
    }
    // Sort by ID (most recent first) as fallback
    return b.id - a.id;
  });

  const filteredBooks = sortedBooks.filter((book) => {
    const matchesSearch = book.title.includes(searchQuery) || 
                         book.author.includes(searchQuery) || 
                         book.description.includes(searchQuery);
    
    const matchesTag = selectedTag ? book.tags.includes(selectedTag) : true;
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern opacity-30"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">كتب الشيخ علي بن حاج</h1>
            <p className="text-xl text-gray-200 mb-6">
              مجموعة من المؤلفات الفكرية والشرعية التي تتناول قضايا الأمة وسبل الإصلاح
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-white w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                placeholder="ابحث عن كتاب..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                className={cn(
                  "px-3 py-1 text-sm rounded-full border transition-colors",
                  !selectedTag
                    ? "bg-gold text-navy border-gold"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                )}
                onClick={() => setSelectedTag(null)}
              >
                الكل
              </button>
              {bookTags.map((tag) => (
                <button
                  key={tag}
                  className={cn(
                    "px-3 py-1 text-sm rounded-full border transition-colors",
                    selectedTag === tag
                      ? "bg-gold text-navy border-gold"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  )}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="section-container">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <Link to={`/publications/books/${book.id}`} key={book.id} className="card group hover:shadow-lg transition-all">
                <div className="flex md:flex-col lg:flex-row gap-4 p-4">
                  <div className="relative w-1
