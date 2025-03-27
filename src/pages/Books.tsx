import { useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "../components/MetaTags";
import { BookType } from "@/types/books";
import BookCard from "@/components/BookCard";
import { BookOpen, Search } from "lucide-react";

// بيانات الكتب
export const booksData: BookType[] = [
  {
    id: 1,
    title: "فصل التخالف في قضية التحالف",
    author: "علي بن حاج",
    cover: "https://i.ibb.co/K9RtVYg/book-cover.jpg",
    downloadUrl: "https://archive.org/download/20250327_20250327_0839/%D9%81%D8%B5%D9%84%20%D8%A7%D9%84%D8%AA%D8%AE%D8%A7%D9%84%D9%81%20%D9%81%D9%8A%20%D9%82%D8%B6%D9%8A%D8%A9%20%D8%A7%D9%84%D8%AA%D8%AD%D8%A7%D9%84%D9%81.pdf",
    year: "1990",
    publicationDate: "4 أكتوبر 1990",
    pages: "64",
    description: "رسالة مختصرة تتناول مسألة التحالف بين الجماعات الإسلامية وغيرها من الجهات، وتعرض لمفهوم الحلف في اللغة والشريعة.",
    tags: ["فكر إسلامي", "سياسة شرعية", "تحالفات"],
    fullDescription: "فصل التخالف في قضية التحالف هي رسالة مختصرة كتبها الشيخ أبو عبد الفتاح علي بن حاج، نُشرت أول مرة على صفحات جريدة المنقذ الناطقة باسم الجبهة الإسلامية للإنقاذ، في عددها رقم 27 بتاريخ 15 ربيع الأول 1411 هـ / الموافق لـ 4 أكتوبر 1990 م، ثم أعيد طبعها في طبعة أولى سنة 1993م / 1414هـ عن دار العقاب. تتناول الرسالة مسألة \"التحالف\" بين الجماعات الإسلامية وغيرها من الجهات أو الأحزاب، وتعرض لمفهوم الحلف في اللغة وفي الشريعة، وتناقش بالتفصيل الأحاديث النبوية الواردة في شأن الحلف، وأقوال العلماء حول نسخه أو استمراره، مع بيان مواقف الصحابة، وأمثلة من أحلاف الجاهلية، لا سيما حلف الفضول، الذي شهد عليه النبي صلى الله عليه وسلم قبل البعثة، وعبّر لاحقًا عن استعداده للمشاركة فيه حتى بعد الإسلام، لو دُعي إليه. تستعرض الرسالة خلاف العلماء حول قول النبي ﷺ: \"لا حلف في الإسلام\"، وتوضح أن هناك من يرى أن هذا النفي خاص بنوع معين من الأحلاف مثل أحلاف التوارث أو الحروب القبلية، في حين يرى آخرون أنه نفيٌ عام يشمل كل تحالف مخصص خارج إطار أخوة الإيمان الجامعة. يؤكد الشيخ في الرسالة أن نصرة المظلوم، والأخذ على يد الظالم، والتعاون على البر والتقوى، لا تفتقر إلى تحالفات خاصة أو مواثيق إضافية، لأنها مفروضة أصلًا على المسلمين بنصوص الكتاب والسنة."
  },
  {
    id: 2,
    title: "الدمغة القوية لنسف عقيدة الديمقراطية",
    author: "علي بن حاج",
    cover: "https://archive.org/download/FP27920/FP27920.jpg",
    downloadUrl: "https://archive.org/download/FP27920/FP27920.pdf",
    year: "1993",
    pages: "112",
    description: "رسالة تبحث في عقيدة الديمقراطية من منظور إسلامي.",
    tags: ["فكر إسلامي", "ديمقراطية", "سياسة"],
  },
  {
    id: 3,
    title: "إجادة التحبير في بيان قواعد التغيير",
    author: "علي بن حاج",
    cover: "https://archive.org/download/waq43092/43092.pdf",
    downloadUrl: "https://archive.org/download/waq43092/43092.pdf",
    year: "1992",
    pages: "80",
    description: "رسالة تتناول قواعد التغيير والإصلاح في المجتمعات.",
    tags: ["فكر إسلامي", "تغيير", "إصلاح"],
  },
  {
    id: 4,
    title: "تنبيه الأخيار إلى حكم الاستعانة بالكفار",
    author: "علي بن حاج",
    cover: "https://archive.org/download/FP147274/147274.pdf",
    downloadUrl: "https://archive.org/download/FP147274/147274.pdf",
    year: "1991",
    pages: "48",
    description: "رسالة تبحث في حكم الاستعانة بالكفار في الشؤون المختلفة.",
    tags: ["فقه", "سياسة شرعية"],
  },
  // يمكنك إضافة المزيد من الكتب هنا في المستقبل
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // تصفية الكتب حسب البحث
  const filteredBooks = booksData.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="container mx-auto px-4 py-8">
      <MetaTags 
        title="كتب الشيخ علي بن حاج | منبر الشيخ علي بن حاج" 
        description="استكشف مجموعة من كتب الشيخ علي بن حاج التي تغطي مواضيع متنوعة في الفكر الإسلامي والسياسة الشرعية والقضايا المعاصرة." 
      />
      
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">كتب الشيخ علي بن حاج</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          مجموعة من كتب وإصدارات الشيخ علي بن حاج التي تناقش قضايا هامة في الفكر الإسلامي والسياسة الشرعية
        </p>
      </div>
      
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-gold focus-within:border-gold overflow-hidden">
          <input
            type="text"
            placeholder="ابحث في الكتب..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full py-3 px-4 focus:outline-none"
          />
          <div className="px-3 text-gray-400">
            <Search size={20} />
          </div>
        </div>
      </div>
      
      {/* Quick Info */}
      <div className="bg-navy/5 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <BookOpen className="mr-2 text-gold" />
          <span>المكتبة الفكرية للشيخ</span>
        </h2>
        <p className="text-gray-700">
          تشمل هذه المكتبة مجموعة من الإصدارات والمؤلفات التي كتبها الشيخ علي بن حاج على مدار سنوات عديدة، تعالج فيها العديد من القضايا المتعلقة بالفكر الإسلامي والسياسة الشرعية. يمكنك تحميل الكتب أو قراءتها مباشرة عبر الموقع.
        </p>
      </div>
      
      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">لم يتم العثور على نتائج للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
