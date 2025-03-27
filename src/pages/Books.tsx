
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, BookOpen } from 'lucide-react';
import { Input } from "@/components/ui/input";
import BookCard from "@/components/BookCard";
import { BookType } from '@/types/books';

// قائمة الكتب
export const booksData: BookType[] = [
  {
    id: 1,
    title: "تنبيه الأخيار إلى حكم الاستعانة بالكفار",
    author: "الشيخ أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/d1a44ab9-1ce3-4bc1-a6b4-4555f7a29b09.png",
    downloadUrl: "https://archive.org/download/20200921_20200921_1903/%D8%AA%D9%86%D8%A8%D9%8A%D9%87%20%D8%A7%D9%84%D8%A3%D8%AE%D9%8A%D8%A7%D8%B1%20%D8%A5%D9%84%D9%89%20%D8%AD%D9%83%D9%85%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B9%D8%A7%D9%86%D8%A9%20%D8%A8%D8%A7%D9%84%D9%83%D9%81%D8%A7%D8%B1.pdf",
    year: "١٩٩٣",
    publicationDate: "١٤١٤هـ/١٩٩٣م",
    pages: "٤٨",
    description: "رسالة تتناول مسألة الاستعانة بالكفار في الحروب والنزاعات. تعرض الرسالة أدلة القائلين بالمنع وأدلة المجيزين، وتناقش الآيات والأحاديث والآثار المتعلقة بالمسألة.",
    tags: ["سياسة شرعية", "فقه", "حديث"],
    fullDescription: "رسالة تتناول مسألة الاستعانة بالكفار في الحروب والنزاعات. تعرض الرسالة أدلة القائلين بالمنع وأدلة المجيزين، وتناقش الآيات والأحاديث والآثار المتعلقة بالمسألة.\n\nتستعرض الرسالة المواقف المختلفة للعلماء من هذه القضية الشائكة، مع تتبع دقيق للأدلة الشرعية وسبر أغوارها. كما تتناول أقوال المذاهب الفقهية الأربعة في المسألة مع الترجيح.\n\nتأتي أهمية هذه الرسالة في ظل الأوضاع الدولية المعاصرة، وما يتخللها من تحالفات وصراعات، تستدعي موقفاً واضحاً مؤصلاً من هذه القضية."
  },
  {
    id: 2,
    title: "الدمغة القوية لنسف عقيدة الديمقراطية",
    author: "الشيخ أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/8347189a-231d-4ccb-88ce-5b1e21808013.png",
    downloadUrl: "https://archive.org/download/20200829_20200829_2044/%D8%A7%D9%84%D8%AF%D9%85%D8%BA%D8%A9%20%D8%A7%D9%84%D9%82%D9%88%D9%8A%D8%A9%20%D9%84%D9%86%D8%B3%D9%81%20%D8%B9%D9%82%D9%8A%D8%AF%D8%A9%20%D8%A7%D9%84%D8%AF%D9%8A%D9%85%D9%82%D8%B1%D8%A7%D8%B7%D9%8A%D8%A9.pdf",
    year: "١٩٩٣",
    publicationDate: "١٤١٣هـ/١٩٩٣م",
    pages: "٣٢",
    description: "رسالة تتناول عقيدة الديمقراطية ونقدها من المنظور الإسلامي. يبين فيها الشيخ علي بن حاج مفهوم الديمقراطية وتاريخها وأصولها، ويقارنها بمبادئ الإسلام في الحكم والتشريع.",
    tags: ["عقيدة", "فكر", "سياسة شرعية"],
    fullDescription: "رسالة تتناول عقيدة الديمقراطية ونقدها من المنظور الإسلامي. يبين فيها الشيخ علي بن حاج مفهوم الديمقراطية وتاريخها وأصولها، ويقارنها بمبادئ الإسلام في الحكم والتشريع.\n\nيعرض المؤلف لأصول الديمقراطية الغربية، ويبين تناقضها مع أصول الإسلام في مسائل الحاكمية والتشريع. كما يناقش مسألة الأخذ ببعض آليات الديمقراطية مع رفض أصولها الفكرية.\n\nتكتسب هذه الرسالة أهمية خاصة في ظل الجدل المعاصر حول العلاقة بين الإسلام والديمقراطية، وحدود التوافق والتعارض بينهما. يقدم الشيخ علي بن حاج رؤية شرعية واضحة في هذه المسألة، مؤصلة بالأدلة من الكتاب والسنة."
  },
  {
    id: 3,
    title: "إجادة التحبير في بيان قواعد التغيير",
    author: "الشيخ أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/95bdf18c-ec6e-49f4-bf83-3fb661e3d6e1.png",
    downloadUrl: "https://archive.org/download/20200828_20200828_1948/%D8%A5%D8%AC%D8%A7%D8%AF%D8%A9%20%D8%A7%D9%84%D8%AA%D8%AD%D8%A8%D9%8A%D8%B1%20%D9%81%D9%8A%20%D8%A8%D9%8A%D8%A7%D9%86%20%D9%82%D9%88%D8%A7%D8%B9%D8%AF%20%D8%A7%D9%84%D8%AA%D8%BA%D9%8A%D9%8A%D8%B1.pdf",
    year: "١٩٩٠",
    publicationDate: "١٤١١هـ/١٩٩٠م",
    pages: "٤٦",
    description: "رسالة تتناول قواعد التغيير في المجتمع من منظور إسلامي. يشرح الشيخ علي بن حاج كيفية التغيير وفق المنهج الإسلامي، ويستعرض سنن التغيير الإلهية في المجتمعات.",
    tags: ["فكر", "دعوة", "إصلاح"],
    fullDescription: "رسالة تتناول قواعد التغيير في المجتمع من منظور إسلامي. يشرح الشيخ علي بن حاج كيفية التغيير وفق المنهج الإسلامي، ويستعرض سنن التغيير الإلهية في المجتمعات.\n\nتتناول الرسالة أسس التغيير الاجتماعي والسياسي وفق المنهج الإسلامي، وتوضح أن التغيير عملية شاملة تبدأ من الفرد وتمتد إلى المجتمع ثم الدولة.\n\nتستعرض الرسالة نماذج من التغيير في التاريخ الإسلامي، بدءا من نموذج الرسول صلى الله عليه وسلم في تغيير المجتمع الجاهلي، وانتهاء بتجارب معاصرة في التغيير الإسلامي."
  },
  {
    id: 4,
    title: "فصل التخالف في قضية التحالف",
    author: "الشيخ أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/e8e0e280-ccb2-4568-a4d2-4e5d4f34c34b.png",
    downloadUrl: "https://archive.org/download/20250327_20250327_0839/%D9%81%D8%B5%D9%84%20%D8%A7%D9%84%D8%AA%D8%AE%D8%A7%D9%84%D9%81%20%D9%81%D9%8A%20%D9%82%D8%B6%D9%8A%D8%A9%20%D8%A7%D9%84%D8%AA%D8%AD%D8%A7%D9%84%D9%81.pdf",
    year: "١٩٩٣",
    publicationDate: "١٤١٤هـ/١٩٩٣م",
    pages: "٤٠",
    description: "رسالة مختصرة تتناول مسألة التحالف بين الجماعات الإسلامية وغيرها من الجهات أو الأحزاب، وتعرض لمفهوم الحلف في اللغة وفي الشريعة.",
    tags: ["سياسة شرعية", "فقه", "فكر"],
    fullDescription: "فصل التخالف في قضية التحالف هي رسالة مختصرة كتبها الشيخ أبو عبد الفتاح علي بن حاج، نُشرت أول مرة على صفحات جريدة المنقذ الناطقة باسم الجبهة الإسلامية للإنقاذ، في عددها رقم 27 بتاريخ 15 ربيع الأول 1411 هـ / الموافق لـ 4 أكتوبر 1990 م، ثم أعيد طبعها في طبعة أولى سنة 1993م / 1414هـ عن دار العقاب.\n\nتتناول الرسالة مسألة \"التحالف\" بين الجماعات الإسلامية وغيرها من الجهات أو الأحزاب، وتعرض لمفهوم الحلف في اللغة وفي الشريعة، وتناقش بالتفصيل الأحاديث النبوية الواردة في شأن الحلف، وأقوال العلماء حول نسخه أو استمراره، مع بيان مواقف الصحابة، وأمثلة من أحلاف الجاهلية، لا سيما حلف الفضول، الذي شهد عليه النبي صلى الله عليه وسلم قبل البعثة، وعبّر لاحقًا عن استعداده للمشاركة فيه حتى بعد الإسلام، لو دُعي إليه.\n\nتستعرض الرسالة خلاف العلماء حول قول النبي ﷺ: \"لا حلف في الإسلام\"، وتوضح أن هناك من يرى أن هذا النفي خاص بنوع معين من الأحلاف مثل أحلاف التوارث أو الحروب القبلية، في حين يرى آخرون أنه نفيٌ عام يشمل كل تحالف مخصص خارج إطار أخوة الإيمان الجامعة.\n\nيؤكد الشيخ في الرسالة أن نصرة المظلوم، والأخذ على يد الظالم، والتعاون على البر والتقوى، لا تفتقر إلى تحالفات خاصة أو مواثيق إضافية، لأنها مفروضة أصلًا على المسلمين بنصوص الكتاب والسنة. ويعتبر أن المؤاخاة الإيمانية التي عقدها الله ورسوله كافية وشاملة لكل أنواع التعاون والنصرة المشروعة، ولا حاجة لعقود تحالف قد تنزلق في كثير من الأحيان إلى التكتلات الحزبية أو الولاءات الضيقة."
  }
];

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // استخراج جميع الكلمات المفتاحية الفريدة من الكتب
  const allTags = Array.from(
    new Set(booksData.flatMap(book => book.tags))
  ).sort();
  
  // تصفية الكتب بناءً على البحث والتصنيف
  const filteredBooks = booksData.filter(book => {
    const matchesSearch = searchQuery === "" || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === null || book.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>كتب الشيخ علي بن حاج</title>
        <meta name="description" content="اطلع على كتب ومؤلفات الشيخ علي بن حاج الفكرية والشرعية، وقم بتحميلها مجاناً" />
      </Helmet>

      {/* العنوان الرئيسي والوصف */}
      <div className="bg-gray-50 border-b">
        <div className="section-container py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">كتب ومؤلفات الشيخ</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            مجموعة منتقاة من كتب ومؤلفات الشيخ علي بن حاج، تغطي مواضيع متنوعة في الفقه والعقيدة والسياسة الشرعية والفكر الإسلامي.
          </p>
        </div>
      </div>

      {/* محرك البحث والتصفية */}
      <div className="bg-white border-b">
        <div className="section-container py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="ابحث عن كتاب..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTag === null 
                    ? 'bg-navy text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                الكل
              </button>
              
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTag === tag 
                      ? 'bg-navy text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* قائمة الكتب */}
      <div className="section-container py-8">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
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
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">لم يتم العثور على كتب</h3>
            <p className="text-gray-500">
              لم نتمكن من العثور على كتب تطابق معايير البحث الخاصة بك
            </p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedTag(null);
              }}
              className="mt-4 text-navy hover:text-gold transition-colors"
            >
              عرض جميع الكتب
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
