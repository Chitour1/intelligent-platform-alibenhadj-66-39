import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import MetaTags from '../components/MetaTags';
import BookCard from '../components/BookCard';
import { BookOpen, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { BookType } from '../types/books';

// تعريف بيانات الكتب
export const booksData: BookType[] = [
  {
    id: 1,
    title: "الجامع في فقه الدعوة",
    author: "الشيخ علي بن حاج",
    cover: "/lovable-uploads/96a9919a-f464-498c-959c-549ca999f423.png",
    downloadUrl: "https://ia801405.us.archive.org/14/items/FP139470/FP139470.pdf",
    year: "1991",
    publicationDate: "1991",
    pages: "272",
    description: "كتاب في فقه الدعوة الإسلامية، يتناول أحكامها وآدابها وأساليبها.",
    tags: ["فقه", "دعوة", "إسلام"]
  },
  {
    id: 2,
    title: "الكلمات الذهبية",
    author: "الشيخ علي بن حاج",
    cover: "/lovable-uploads/49151298-7991-490c-a99c-7954a9985923.png",
    downloadUrl: "https://ia601405.us.archive.org/14/items/FP139470/FP139470.pdf",
    year: "1992",
    publicationDate: "1992",
    pages: "160",
    description: "مجموعة من الأقوال المأثورة والحكم والنصائح.",
    tags: ["أقوال", "حكم", "نصائح"]
  },
  {
    id: 3,
    title: "الداء والدواء",
    author: "ابن قيم الجوزية",
    cover: "/lovable-uploads/69491207-6975-4794-9395-d0c3c846f99a.png",
    downloadUrl: "https://waqfeya.net/book.php?bid=224",
    year: "1350",
    publicationDate: "1350",
    pages: "528",
    description: "كتاب يتناول الأمراض الروحية وعلاجها.",
    tags: ["أخلاق", "تزكية", "إصلاح"]
  },
  {
    id: 4,
    title: "فتاوى مهمة",
    author: "ابن باز",
    cover: "/lovable-uploads/49151298-7991-490c-a99c-7954a9985923.png",
    downloadUrl: "https://binbaz.org.sa/books/1300/%D9%81%D8%AA%D8%A7%D9%88%D9%89-%D9%85%D9%87%D9%85%D8%A9-%D9%84%D8%B9%D8%A7%D9%85-%D8%A7%D9%84%D8%A3%D9%85%D8%A9",
    year: "1990",
    publicationDate: "1990",
    pages: "272",
    description: "مجموعة من الفتاوى الشرعية.",
    tags: ["فتاوى", "فقه", "إسلام"]
  },
  {
    id: 5,
    title: "الوابل الصيب",
    author: "ابن قيم الجوزية",
    cover: "/lovable-uploads/69491207-6975-4794-9395-d0c3c846f99a.png",
    downloadUrl: "https://waqfeya.net/book.php?bid=227",
    year: "1350",
    publicationDate: "1350",
    pages: "272",
    description: "كتاب في الأدعية والأذكار.",
    tags: ["أدعية", "أذكار", "تزكية"]
  },
  {
    id: 6,
    title: "الاعتصام",
    author: "الشاطبي",
    cover: "/lovable-uploads/96a9919a-f464-498c-959c-549ca999f423.png",
    downloadUrl: "https://waqfeya.net/book.php?bid=1688",
    year: "790",
    publicationDate: "790",
    pages: "640",
    description: "كتاب في البدع والتحذير منها.",
    tags: ["بدع", "تحذير", "إصلاح"]
  },
  {
    id: 7,
    title: "مدارج السالكين",
    author: "ابن قيم الجوزية",
    cover: "/lovable-uploads/49151298-7991-490c-a99c-7954a9985923.png",
    downloadUrl: "https://waqfeya.net/book.php?bid=225",
    year: "1350",
    publicationDate: "1350",
    pages: "1536",
    description: "كتاب في التزكية والأخلاق.",
    tags: ["تزكية", "أخلاق", "إصلاح"]
  },
  {
    id: 8,
    title: "تفسير السعدي",
    author: "عبد الرحمن السعدي",
    cover: "/lovable-uploads/69491207-6975-4794-9395-d0c3c846f99a.png",
    downloadUrl: "https://waqfeya.net/book.php?bid=147",
    year: "1376",
    publicationDate: "1376",
    pages: "1472",
    description: "تفسير للقرآن الكريم.",
    tags: ["تفسير", "قرآن", "إسلام"]
  },
  {
    id: 9,
    title: "زاد المعاد",
    author: "ابن قيم الجوزية",
    cover: "/lovable-uploads/96a9919a-f464-498c-959c-549ca999f423.png",
    downloadUrl: "https://waqfeya.net/book.php?bid=226",
    year: "1350",
    publicationDate: "1350",
    pages: "688",
    description: "كتاب في السيرة النبوية.",
    tags: ["سيرة", "نبوية", "إسلام"]
  },
  {
    id: 10,
    title: "مختصر صحيح مسلم",
    author: "المنذري",
    cover: "/lovable-uploads/49151298-7991-490c-a99c-7954a9985923.png",
    downloadUrl: "https://waqfeya.net/book.php?bid=314",
    year: "656",
    publicationDate: "656",
    pages: "832",
    description: "مختصر لكتاب صحيح مسلم.",
    tags: ["حديث", "إسلام"]
  },
  {
    id: 11,
    title: "صفة الصفوة",
    author: "ابن الجوزي",
    cover: "/lovable-uploads/69491207-6975-4794-9395-d0c3c846f99a.png",
    downloadUrl: "https://waqfeya.net/book.php?bid=307",
    year: "597",
    publicationDate: "597",
    pages: "928",
    description: "كتاب في سير الصالحين.",
    tags: ["تاريخ", "إسلام"]
  },
  {
    id: 12,
    title: "تفسير القرآن العظيم",
    author: "ابن كثير",
    cover: "/lovable-uploads/96a9919a-f464-498c-959c-549ca999f423.png",
    downloadUrl: "https://waqfeya.net/book.php?bid=144",
    year: "774",
    publicationDate: "774",
    pages: "2048",
    description: "تفسير للقرآن الكريم.",
    tags: ["تفسير", "قرآن", "إسلام"]
  },
  {
    id: 13,
    title: "الدمغة القوية لنسف عقيدة الديمقراطية",
    author: "الشيخ علي بن حاج",
    cover: "/lovable-uploads/f15fc4b4-d81d-49ae-a258-fd37a2d5fa92.png",
    downloadUrl: "https://web.archive.org/web/20130806214752/http://alibenhadj.net/ebooks/ali.1.zip",
    year: "1990",
    publicationDate: "ربيع الأول 1411",
    pages: "19",
    description: "هي رسالة فكرية عقدية كتبها الشيخ علي بن حاج، نُشرت على صفحات جريدة المنقذ الناطقة باسم الجبهة الإسلامية للإنقاذ.",
    tags: ["فكر إسلامي", "سياسة", "فقه"],
    fullDescription: "الدمغة القوية لنسف عقيدة الديمقراطية هي رسالة فكرية عقدية كتبها الشيخ علي بن حاج، نُشرت على صفحات جريدة المنقذ الناطقة باسم الجبهة الإسلامية للإنقاذ في عددين متتاليين بتاريخ 24 و25 صفر 1411 هـ الموافق لـ 14 و15 سبتمبر 1990 م، وأعيد نشرها لاحقًا في كتيب مستقل يقع في 19 صفحة. وتُعد من أوائل النصوص الإسلامية الجزائرية التي تُفند الديمقراطية الغربية بمنهجية عقدية مستندة إلى القرآن والسنة وأقوال علماء السلف. جاءت هذه الرسالة في سياق فكري وسياسي خاص، حيث كانت الجبهة الإسلامية للإنقاذ في أوج صعودها الجماهيري بعد اكتساحها للانتخابات المحلية في جوان 1990، وفي خضم جدل سياسي متصاعد حول مدى التزامها أو رفضها للمفاهيم الغربية، وعلى رأسها \"الديمقراطية\". وقد جاءت الرسالة لتؤكد، بوضوح لا لبس فيه، الرفض المبدئي لعقيدة الديمقراطية باعتبارها \"مذهبًا وضعيًا كافرًا مناقضًا لحاكمية الله، ومبنيًا على أصول شركية\". المحاور الكبرى التي تناولتها الرسالة: 1. تعريف الديمقراطية ومصدرها الغربي استهلت الرسالة بتعريف الديمقراطية على أنها \"حكم الشعب بالشعب وللشعب\"، وبيّنت أنها ليست مجرد آلية أو وسيلة انتخابية، بل هي عقيدة سياسية كاملة نشأت في بيئة فلسفية وثنية، ثم تبلورت في سياق علماني مادي يُقصي الدين من الحياة العامة. 2. مفهوم الحاكمية ونفي السيادة الشعبية تؤكد الرسالة أن الإسلام يقوم على حاكمية الله المطلقة، وأنه لا يجوز للبشر أن يشرّعوا لأنفسهم ما لم يأذن به الله. واستشهدت بآيات صريحة مثل: \"إن الحكم إلا لله\"، \"ولا يشرك في حكمه أحدًا\". واعتبرت أن الديمقراطية تُنازع الله في حقه في التشريع، وهو ما يجعلها - بحسب الرسالة - صورة من صور الشرك السياسي. 3. نقض مبدأ \"رأي الأغلبية\" هاجمت الرسالة مبدأ \"الأغلبية\" بوصفه قاعدة فاسدة، وذكّرت بأن \"الكثرة\" ليست دليلًا على الحق، مستندة إلى عشرات الآيات التي تذم الأكثرية مثل: \"وإن تطع أكثر من في الأرض يضلوك عن سبيل الله\"، و\"وما أكثر الناس ولو حرصت بمؤمنين\". وبيّنت أن الحق في الإسلام يُعرف بالدليل لا بعدد المؤيدين. 4. الديمقراطية بين التنظير والحقيقة قدّمت الرسالة نقدًا عمليًا للديمقراطية الغربية، ووصفتها بأنها خدعة تُلبس الاستبداد ثوب الحرية. وأكدت أن ما يُسمى بـ\"الإرادة الشعبية\" ليس إلا غطاء لتحكم قلة من النخب الاقتصادية والسياسية، تتحكم في الإعلام والقوانين، وتفرض نمطًا واحدًا من الحياة يُقصي الدين والأخلاق. 5. الموقف من التشبه بالغرب خصصت الرسالة فصلًا مطولًا للتحذير من التبعية الفكرية والتشريعية للغرب، وذكّرت بوجوب مخالفة الكفار، وبخطورة استيراد نظمهم السياسية، مستشهدة بكلام ابن تيمية في \"اقتضاء الصراط المستقيم\" وفتاوى علماء كبار حول تحكيم غير شريعة الله. 6. موقف مفكري الغرب والمسلمين من الديمقراطية أوردت الرسالة مقتطفات من أقوال مفكرين غربيين ينتقدون الديمقراطية، مثل \"جان جاك روسو\"، و\"بارثمي\"، باعتبارها نظامًا غير واقعي وفاسد في جوهره. كما استشهدت بكتابات مفكرين مسلمين مثل المودودي، وفتحي الدريني، ومالك بن نبي، وغيرهم ممن انتقدوا الشكلانية الديمقراطية وانفصالها عن القيم العليا. 7. الديمقراطية والانحلال الأخلاقي ربطت الرسالة بين الديمقراطية والعلمانية والانحلال الخلقي، مشيرة إلى أن المجتمعات الديمقراطية الغربية أصبحت مرتعًا للرذائل، حيث تُسن القوانين التي تُبيح الزنا، والشذوذ، والتبرج، والربا، والمسكرات باسم الحرية الفردية. 8. موقف الجبهة الإسلامية للإنقاذ في فقرة بارزة، توضح الرسالة أن تبني بعض أطراف الجبهة لمصطلح \"الديمقراطية\" هو من باب الاجتهاد السياسي المرحلي، وليس قبولًا بمضمونها العقدي، وتُذكّر بضرورة العودة إلى المصطلحات الإسلامية الأصيلة مثل: الشورى، الحاكمية، الخلافة، البيعة. أسلوب الرسالة: الرسالة مكتوبة بلغة دعوية خطابية، تعتمد على التكرار والتوكيد، وتخاطب جمهور الصحوة الإسلامية. وهي تُصنّف ضمن أدبيات السلفية الحركية، التي تدمج بين رفض التغريب، والدعوة للتمكين السياسي الإسلامي، مع رفض قاطع لأي تسوية فكرية مع النظم الغربية. القيمة المرجعية: تمثل هذه الرسالة واحدة من أوضح الوثائق الفكرية التي تُعبّر عن الموقف العقدي للشيخ علي بن حاج من الديمقراطية، وتُعد مرجعًا أساسيًا لفهم الطرح العقدي والسياسي للجبهة الإسلامية للإنقاذ في بداياتها."
  }
];

// باقي الكود لصفحة الكتب
const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = booksData.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <MetaTags title="مكتبة الكتب" description="مجموعة من الكتب الإسلامية المتنوعة." />
      <Helmet>
        <link rel="canonical" href="https://yourwebsite.com/publications/books" />
      </Helmet>

      {/* Search Bar */}
      <div className="bg-gray-50 py-6">
        <div className="container mx-auto px-4">
          <div className="relative max-w-md">
            <Input
              type="text"
              placeholder="ابحث عن كتاب..."
              className="pl-10 pr-4 rounded-full border-gray-300 focus:ring-gold focus:border-gold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Books Listing */}
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
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
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 text-center py-10">
              <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">لا توجد نتائج للبحث.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
