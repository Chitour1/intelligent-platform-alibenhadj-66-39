
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Search, BookOpen, CalendarDays, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const bookTags = ["الفكر الإسلامي", "السياسة الشرعية", "الفقه", "العقيدة", "الإصلاح", "التربية", "التاريخ", "الاحتجاج السلمي"];

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
    tags: ["الفكر الإسلامي", "السياسة الشرعية", "الإصلاح"]
  },
  {
    id: 2,
    title: "التحديات السياسية المعاصرة",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1200&auto=format&fit=crop",
    downloadUrl: "#",
    year: "٢٠٢٢",
    publicationDate: "١٠ مارس ٢٠٢٥",
    pages: "٣٢٠",
    description: "كتاب يناقش التحديات السياسية المعاصرة في العالم العربي ويطرح رؤية إصلاحية شاملة للتعامل معها...",
    tags: ["السياسة الشرعية", "الإصلاح"]
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
    id: 4,
    title: "الدولة المدنية: المفهوم والتطبيق",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1200&auto=format&fit=crop",
    downloadUrl: "#",
    year: "٢٠١٩",
    publicationDate: "٢٠ فبراير ٢٠٢٥",
    pages: "٢٥٠",
    description: "دراسة في مفهوم الدولة المدنية وآليات تطبيقها في السياق العربي المعاصر مع استعراض للتجارب العالمية...",
    tags: ["السياسة الشرعية", "الفكر الإسلامي"],
    fullDescription: "دراسة في مفهوم الدولة المدنية وآليات تطبيقها في السياق العربي المعاصر مع استعراض للتجارب العالمية. يناقش الكتاب إشكالية العلاقة بين الدين والدولة، ويميز بين مفهوم الدولة المدنية ذات المرجعية الإسلامية والدولة العلمانية، كما يستعرض نماذج مختلفة من الدول المعاصرة وعلاقتها بالدين."
  },
  {
    id: 5,
    title: "الهوية والانتماء في عصر العولمة",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=1200&auto=format&fit=crop",
    downloadUrl: "#",
    year: "٢٠١٧",
    publicationDate: "١ فبراير ٢٠٢٥",
    pages: "٢٣٠",
    description: "بحث في إشكاليات الهوية والانتماء في ظل تحديات العولمة وكيفية الحفاظ على الخصوصية الثقافية...",
    tags: ["الفكر الإسلامي", "التربية"],
    fullDescription: "بحث في إشكاليات الهوية والانتماء في ظل تحديات العولمة وكيفية الحفاظ على الخصوصية الثقافية. يتناول الكتاب تحديات العولمة الثقافية والفكرية وتأثيرها على الهوية الإسلامية، ويطرح آليات للحفاظ على الأصالة مع الانفتاح الواعي على الآخر، ويؤكد على دور التربية والتعليم في تعزيز الهوية وبناء الشخصية المتوازنة."
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
                  <div className="relative w-1/3 md:w-full lg:w-1/3 aspect-[3/4] overflow-hidden rounded-md shadow-md">
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="w-2/3 md:w-full lg:w-2/3">
                    <h3 className="text-lg font-bold text-navy-dark mb-2 group-hover:text-gold transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                    <div className="flex items-center gap-3 text-gray-500 text-sm mb-2">
                      <div className="flex items-center">
                        <CalendarDays size={14} className="ml-1" aria-label="سنة الإصدار" />
                        <span>{book.year}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText size={14} className="ml-1" />
                        {book.pages} صفحة
                      </div>
                    </div>
                    {book.publicationDate && (
                      <div className="text-xs text-gold mb-2">
                        تاريخ النشر: {book.publicationDate}
                      </div>
                    )}
                    <p className="text-sm text-gray-600 line-clamp-2">{book.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500">لم يتم العثور على كتب تطابق معايير البحث</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Books;
