import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, Filter, BookOpen } from 'lucide-react';
import BookCard from '../components/BookCard';
import { BookType } from '../types/books';
import MetaTags from '../components/MetaTags';

// قائمة الكتب
export const booksData: BookType[] = [
  {
    id: 1,
    title: "الدمغة القوية لنسف عقيدة الديمقراطية",
    author: "الشيخ علي بن حاج",
    cover: "/lovable-uploads/5234bfc7-516d-4c7b-a487-ef5172ab841e.png",
    downloadUrl: "https://web.archive.org/web/20130806214752/http://alibenhadj.net/ebooks/ali.1.zip",
    year: "1990",
    publicationDate: "15 سبتمبر 1990",
    pages: "19",
    description: "رسالة فكرية عقدية تُفند الديمقراطية الغربية بمنهجية عقدية مستندة إلى القرآن والسنة وأقوال علماء السلف.",
    tags: ["فكر إسلامي", "عقيدة", "سياسة شرعية"],
    fullDescription: `الدمغة القوية لنسف عقيدة الديمقراطية هي رسالة فكرية عقدية كتبها الشيخ علي بن حاج، نُشرت على صفحات جريدة المنقذ الناطقة باسم الجبهة الإسلامية للإنقاذ في عددين متتاليين بتاريخ 24 و25 صفر 1411 هـ الموافق لـ 14 و15 سبتمبر 1990 م، وأعيد نشرها لاحقًا في كتيب مستقل يقع في 19 صفحة. وتُعد من أوائل النصوص الإسلامية الجزائرية التي تُفند الديمقراطية الغربية بمنهجية عقدية مستندة إلى القرآن والسنة وأقوال علماء السلف.

جاءت هذه الرسالة في سياق فكري وسياسي خاص، حيث كانت الجبهة الإسلامية للإنقاذ في أوج صعودها الجماهيري بعد اكتساحها للانتخابات المحلية في جوان 1990، وفي خضم جدل سياسي متصاعد حول مدى التزامها أو رفضها للمفاهيم الغربية، وعلى رأسها "الديمقراطية". وقد جاءت الرسالة لتؤكد، بوضوح لا لبس فيه، الرفض المبدئي لعقيدة الديمقراطية باعتبارها "مذهبًا وضعيًا كافرًا مناقضًا لحاكمية الله، ومبنيًا على أصول شركية".

المحاور الكبرى التي تناولتها الرسالة:
1. تعريف الديمقراطية ومصدرها الغربي
استهلت الرسالة بتعريف الديمقراطية على أنها "حكم الشعب بالشعب وللشعب"، وبيّنت أنها ليست مجرد آلية أو وسيلة انتخابية، بل هي عقيدة سياسية كاملة نشأت في بيئة فلسفية وثنية، ثم تبلورت في سياق علماني مادي يُقصي الدين من الحياة العامة.

2. مفهوم الحاكمية ونفي السيادة الشعبية
تؤكد الرسالة أن الإسلام يقوم على حاكمية الله المطلقة، وأنه لا يجوز للبشر أن يشرعوا لأنفسهم ما لم يأذن به الله. واستشهدت بآيات صريحة مثل: "إن الحكم إلا لله"، "ولا يشرك في حكمه أحدًا". واعتبرت أن الديمقراطية تُنازع الله في حقه في التشريع، وهو ما يجعلها - بحسب الرسالة - صورة من صور الشرك السياسي.

3. نقض مبدأ "رأي الأغلبية"
هاجمت الرسالة مبدأ "الأغلبية" بوصفه قاعدة فاسدة، وذكّرت بأن "الكثرة" ليست دليلًا على الحق، مستندة إلى عشرات الآيات التي تذم الأكثرية مثل: "وإن تطع أكثر من في الأرض يضلوك عن سبيل الله"، و"وما أكثر الناس ولو حرصت بمؤمنين". وبيّنت أن الحق في الإسلام يُعرف بالدليل لا بعدد المؤيدين.

4. الديمقراطية بين التنظير والحقيقة
قدّمت الرسالة نقدًا عمليًا للديمقراطية الغربية، ووصفتها بأنها خدعة تُلبس الاستبداد ثوب الحرية. وأكدت أن ما يُسمى بـ"الإرادة الشعبية" ليس إلا غطاء لتحكم قلة من النخب الاقتصادية والسياسية، تتحكم في الإعلام والقوانين، وتفرض نمطًا واحدًا من الحياة يُقصي الدين والأخلاق.

5. الموقف من التشبه بالغرب
خصصت الرسالة فصلًا مطولًا للتحذير من التبعية الفكرية والتشريعية للغرب، وذكّرت بوجوب مخالفة الكفار، وبخطورة استيراد نظمهم السياسية، مستشهدة بكلام ابن تيمية في "اقتضاء الصراط المستقيم" وفتاوى علماء كبار حول تحكيم غير شريعة الله.

6. موقف مفكري الغرب والمسلمين من الديمقراطية
أوردت الرسالة مقتطفات من أقوال مفكرين غربيين ينتقدون الديمقراطية، مثل "جان جاك روسو"، و"بارثمي"، باعتبارها نظامًا غير واقعي وفاسد في جوهره. كما استشهدت بكتابات مفكرين مسلمين مثل المودودي، وفتحي الدريني، ومالك بن نبي، وغيرهم ممن انتقدوا الشكلانية الديمقراطية وانفصالها عن القيم العليا.

7. الديمقراطية والانحلال الأخلاقي
ربطت الرسالة بين الديمقراطية والعلمانية والانحلال الخلقي، مشيرة إلى أن المجتمعات الديمقراطية الغربية أصبحت مرتعًا للرذائل، حيث تُسن القوانين التي تُبيح الزنا، والشذوذ، والتبرج، والربا، والمسكرات باسم الحرية الفردية.

8. موقف الجبهة الإسلامية للإنقاذ
في فقرة بارزة، توضح الرسالة أن تبني بعض أطراف الجبهة لمصطلح "الديمقراطية" هو من باب الاجتهاد السياسي المرحلي، وليس قبولًا بمضمونها العقدي، وتُذكّر بضرورة العودة إلى المصطلحات الإسلامية الأصيلة مثل: الشورى، الحاكمية، الخلافة، البيعة.

أسلوب الرسالة:
الرسالة مكتوبة بلغة دعوية خطابية، تعتمد على التكرار والتوكيد، وتخاطب جمهور الصحوة الإسلامية. وهي تُصنّف ضمن أدبيات السلفية الحركية، التي تدمج بين رفض التغريب، والدعوة للتمكين السياسي الإسلامي، مع رفض قاطع لأي تسوية فكرية مع النظم الغربية.

القيمة المرجعية:
تمثل هذه الرسالة واحدة من أوضح الوثائق الفكرية التي تُعبّر عن الموقف العقدي للشيخ علي بن حاج من الديمقراطية، وتُعد مرجعًا أساسيًا لفهم الطرح العقدي والسياسي للجبهة الإسلامية للإنقاذ في بداياتها.`
  },
  {
    id: 2,
    title: "حوار هادئ مع محمد الغزالي",
    author: "الشيخ علي بن حاج",
    cover: "/lovable-uploads/c48f156c-7604-4c04-bd4d-70f60e78d3f0.png",
    downloadUrl: "https://example.com/book2.pdf",
    year: "1989",
    publicationDate: "10 مارس 1989",
    pages: "124",
    description: "كتاب يناقش آراء الشيخ محمد الغزالي في عدة قضايا فكرية وعقدية، ويطرح رؤية نقدية لبعض أفكاره.",
    tags: ["فكر إسلامي", "مناظرات", "علماء معاصرون"]
  },
  {
    id: 3,
    title: "فصول في الإمامة والأمير",
    author: "الشيخ علي بن حاج",
    cover: "/lovable-uploads/93dc1642-071e-4c05-8724-ac26bf1fef55.png",
    downloadUrl: "https://example.com/book3.pdf",
    year: "1992",
    publicationDate: "15 يناير 1992",
    pages: "186",
    description: "يتناول هذا الكتاب قضايا الحكم في الإسلام ومفهوم الإمامة والشروط الواجب توفرها في الحاكم المسلم وفق المنظور الشرعي.",
    tags: ["سياسة شرعية", "نظام الحكم", "إمامة"]
  },
  {
    id: 4,
    title: "وقفات مع التربية والدعوة",
    author: "الشيخ علي بن حاج",
    cover: "/lovable-uploads/9b70a61d-fdfe-40af-9a1d-bff43338c387.png",
    downloadUrl: "https://example.com/book4.pdf",
    year: "1995",
    publicationDate: "5 سبتمبر 1995",
    pages: "210",
    description: "مجموعة من المقالات والدروس التي ألقاها الشيخ في موضوعات تربوية ودعوية، تركز على إصلاح الفرد والمجتمع.",
    tags: ["تربية", "دعوة", "إصلاح"]
  },
  {
    id: 5,
    title: "الحل الإسلامي: فريضة وضرورة",
    author: "الشيخ علي بن حاج",
    cover: "/lovable-uploads/9f770200-2b1c-485e-a8d5-619fab6074d8.png",
    downloadUrl: "https://example.com/book5.pdf",
    year: "1990",
    publicationDate: "20 أبريل 1990",
    pages: "150",
    description: "كتاب يتناول أهمية تطبيق الشريعة الإسلامية وإقامة نظام إسلامي كحل لمشكلات العالم الإسلامي السياسية والاقتصادية والاجتماعية.",
    tags: ["شريعة إسلامية", "نظام إسلامي", "إصلاح سياسي"]
  },
  {
    id: 6,
    title: "مذكرات من خلف القضبان",
    author: "الشيخ علي بن حاج",
    cover: "/lovable-uploads/b70984a3-8bb6-413d-8e5d-d0647fb60cb6.png",
    downloadUrl: "https://example.com/book6.pdf",
    year: "2007",
    publicationDate: "10 ديسمبر 2007",
    pages: "320",
    description: "يسرد الكتاب تجربة الشيخ علي بن حاج في السجن ويتضمن تأملات وذكريات ودروسًا مستفادة من فترة الاعتقال.",
    tags: ["مذكرات", "سيرة ذاتية", "تجارب حياتية"]
  },
  {
    id: 7,
    title: "قراءات في الواقع الجزائري",
    author: "الشيخ علي بن حاج",
    cover: "/lovable-uploads/c057df63-ad64-4878-aaab-3be2e8411d4d.png",
    downloadUrl: "https://example.com/book7.pdf",
    year: "2009",
    publicationDate: "15 أغسطس 2009",
    pages: "240",
    description: "مجموعة من التحليلات والمقالات النقدية للوضع السياسي والاجتماعي في الجزائر من منظور إسلامي.",
    tags: ["تحليل سياسي", "نقد اجتماعي", "الجزائر"]
  },
  {
    id: 8,
    title: "الأزمة الفكرية المعاصرة: تشخيص وحلول",
    author: "الشيخ علي بن حاج",
    cover: "/lovable-uploads/d1a44ab9-1ce3-4bc1-a6b4-4555f7a29b09.png",
    downloadUrl: "https://example.com/book8.pdf",
    year: "2011",
    publicationDate: "3 فبراير 2011",
    pages: "198",
    description: "يناقش الكتاب أزمة الفكر الإسلامي المعاصر ويقترح حلولًا لتجديد الخطاب الإسلامي ومواجهة التحديات الثقافية والفكرية.",
    tags: ["فكر إسلامي", "تجديد الخطاب", "ثقافة إسلامية"]
  }
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  
  // Get unique tags from all books
  const allTags = Array.from(new Set(booksData.flatMap(book => book.tags)));
  
  // Filter and sort books based on user selections
  const filteredBooks = booksData.filter(book => {
    const matchesSearch = book.title.includes(searchTerm) || 
                         book.description.includes(searchTerm) ||
                         book.author.includes(searchTerm);
    const matchesTag = selectedTag ? book.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  }).sort((a, b) => {
    if (sortOrder === "newest") {
      return b.id - a.id;
    } else if (sortOrder === "oldest") {
      return a.id - b.id;
    } else if (sortOrder === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
  
  return (
    <div className="section-container py-12">
      <MetaTags
        title="مؤلفات الشيخ علي بن حاج | كتب ومقالات وأبحاث"
        description="جميع كتب ومؤلفات الشيخ علي بن حاج في الفكر الإسلامي والسياسة الشرعية والدعوة والإصلاح"
      />
      
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">مؤلفات الشيخ علي بن حاج</h1>
      
      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 pr-10 focus:border-gold focus:ring-gold"
              placeholder="ابحث عن كتاب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Tags Filter */}
          <div className="md:col-span-4">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-gold focus:ring-gold"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                <option value="">جميع التصنيفات</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Sort Order */}
          <div className="md:col-span-3">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-gold focus:ring-gold"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">الأحدث</option>
                <option value="oldest">الأقدم</option>
                <option value="title">حسب العنوان</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <BookCard 
              key={book.id}
              id={book.id}
              title={book.title}
              cover={book.cover}
              year={book.year}
              publicationDate={book.publicationDate}
              pages={book.pages}
              description={book.description}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">لم يتم العثور على كتب</h3>
            <p className="text-gray-500">
              لا توجد كتب مطابقة لمعايير البحث الخاصة بك. جرب تعديل البحث أو إزالة الفلاتر.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
