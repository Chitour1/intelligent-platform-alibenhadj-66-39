import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight, BookOpen, CalendarDays, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/BookCard";
import MetaTags from "@/components/MetaTags";

// Books data (normally this would come from an API)
export const booksData = [
  {
    id: 1,
    title: "الجامع في أحكام الأذان والإقامة",
    author: "الشيخ علي بن حاج",
    year: "1992",
    pages: "128",
    cover: "/uploads/book1.jpg",
    description: "كتاب في فقه الأذان والإقامة، يستعرض أحكامهما وشروطهما وآدابهما.",
    fullDescription: "كتاب في فقه الأذان والإقامة، يستعرض أحكامهما وشروطهما وآدابهما. يتناول الكتاب بالتفصيل مسائل الأذان والإقامة، بدءًا من فضلهما وأهميتهما، مرورًا بشروطهما وأركانهما وسننهما، وصولًا إلى أحكام القضاء والإعادة.",
    publicationDate: "1 يناير 1992",
    downloadUrl: "#",
    tags: ["فقه", "عبادات", "الأذان", "الإقامة"]
  },
  {
    id: 2,
    title: "القول المبين في أحكام الإمامة والمأمومين",
    author: "الشيخ علي بن حاج",
    year: "1993",
    pages: "160",
    cover: "/uploads/book2.jpg",
    description: "كتاب يتناول أحكام الإمامة والمأمومين في الصلاة، وشروط الإمام وأحكام الائتمام.",
    fullDescription: "كتاب يتناول أحكام الإمامة والمأمومين في الصلاة، وشروط الإمام وأحكام الائتمام. يستعرض الكتاب بالتفصيل شروط الإمام، وأحكام الائتمام، ومسائل القدوة، وأحكام صلاة الجماعة.",
    publicationDate: "15 يوليو 1993",
    downloadUrl: "#",
    tags: ["فقه", "عبادات", "الإمامة", "المأمومين"]
  },
  {
    id: 3,
    title: "الفوائد الجلية في شرح العقيدة الواسطية",
    author: "الشيخ علي بن حاج",
    year: "1995",
    pages: "288",
    cover: "/uploads/book3.jpg",
    description: "شرح مبسط للعقيدة الواسطية لابن تيمية، يوضح معانيها ويدلل عليها.",
    fullDescription: "شرح مبسط للعقيدة الواسطية لابن تيمية، يوضح معانيها ويدلل عليها. يتناول الكتاب بالتفصيل مسائل التوحيد، والأسماء والصفات، والقدر، والنبوة، والمعاد.",
    publicationDate: "10 نوفمبر 1995",
    downloadUrl: "#",
    tags: ["عقيدة", "توحيد", "الأسماء والصفات", "القدر"]
  },
  {
    id: 4,
    title: "الروضة الندية في شرح الدرر البهية",
    author: "الشيخ علي بن حاج",
    year: "1998",
    pages: "416",
    cover: "/uploads/book4.jpg",
    description: "شرح لكتاب الدرر البهية للشوكاني، يتناول مسائل فقهية متنوعة.",
    fullDescription: "شرح لكتاب الدرر البهية للشوكاني، يتناول مسائل فقهية متنوعة. يستعرض الكتاب بالتفصيل مسائل الطهارة، والصلاة، والزكاة، والصيام، والحج، والبيع، والنكاح، والطلاق.",
    publicationDate: "5 مايو 1998",
    downloadUrl: "#",
    tags: ["فقه", "عبادات", "معاملات", "الشوكاني"]
  },
  {
    id: 5,
    title: "الخلاصة البهية في فقه السيرة النبوية",
    author: "الشيخ علي بن حاج",
    year: "2001",
    pages: "352",
    cover: "/uploads/book5.jpg",
    description: "مختصر في فقه السيرة النبوية، يركز على الأحكام والفوائد المستنبطة من حياة النبي صلى الله عليه وسلم.",
    fullDescription: "مختصر في فقه السيرة النبوية، يركز على الأحكام والفوائد المستنبطة من حياة النبي صلى الله عليه وسلم. يتناول الكتاب بالتفصيل حياة النبي صلى الله عليه وسلم، بدءًا من مولده ونشأته، مرورًا ببعثته وهجرته، وصولًا إلى وفاته.",
    publicationDate: "20 سبتمبر 2001",
    downloadUrl: "#",
    tags: ["سيرة", "فقه", "النبي صلى الله عليه وسلم", "تاريخ"]
  },
  {
    id: 6,
    title: "الكنز الثمين في اختصار معالم دار السلام للموفق ابن قدامة المقدسي",
    author: "الشيخ علي بن حاج",
    year: "2005",
    pages: "256",
    cover: "/uploads/book6.jpg",
    description: "اختصار لكتاب معالم دار السلام لابن قدامة المقدسي، يتناول مسائل في الرقائق والآداب.",
    fullDescription: "اختصار لكتاب معالم دار السلام لابن قدامة المقدسي، يتناول مسائل في الرقائق والآداب. يستعرض الكتاب بالتفصيل مسائل الإخلاص، والصدق، والإحسان، والتوبة، والزهد، والورع.",
    publicationDate: "12 مارس 2005",
    downloadUrl: "#",
    tags: ["رقائق", "آداب", "ابن قدامة", "المقدسي"]
  },
  {
    id: 7,
    title: "المنحة الندية في شرح التحفة السنية",
    author: "الشيخ علي بن حاج",
    year: "2012",
    pages: "480",
    cover: "/uploads/book7.jpg",
    description: "شرح لكتاب التحفة السنية في النحو، يوضح قواعد اللغة العربية.",
    fullDescription: "شرح لكتاب التحفة السنية في النحو، يوضح قواعد اللغة العربية. يتناول الكتاب بالتفصيل مسائل الإعراب، والبناء، والأسماء، والأفعال، والحروف.",
    publicationDate: "28 يونيو 2012",
    downloadUrl: "#",
    tags: ["نحو", "لغة عربية", "التحفة السنية", "قواعد"]
  },
  {
    id: 8,
    title: "التذكير بوجوب وحدة الدول الإسلامية والتحذير من مخاطر الحركات الانفصالية",
    author: "الشيخ علي بن حاج",
    year: "2018",
    pages: "388",
    cover: "/lovable-uploads/45a1b8c5-3b65-4d9a-8251-e5e1d5f90a32.png",
    description: "يتناول هذا الكتاب أهمية الوحدة بين الدول الإسلامية وخطورة الحركات الانفصالية على استقرار الأمة. ويقدم تحليلاً معمقاً للحركات المتطرفة وأثرها على المجتمعات الإسلامية.",
    fullDescription: "يتناول هذا الكتاب أهمية الوحدة بين الدول الإسلامية وخطورة الحركات الانفصالية على استقرار الأمة. ويقدم تحليلاً معمقاً للحركات المتطرفة وأثرها على المجتمعات الإسلامية.\n\nيستعرض المؤلف الجذور التاريخية للانقسامات في العالم الإسلامي، ويحلل الأسباب السياسية والاقتصادية والاجتماعية التي تغذي الحركات الانفصالية. كما يوضح الكتاب المخاطر الاستراتيجية للتفكك على مستقبل الأمة الإسلامية في ظل التحديات العالمية المعاصرة.\n\nيقدم الكتاب رؤية شرعية وفكرية متكاملة لمفهوم الوحدة الإسلامية، مستنداً إلى النصوص القرآنية والأحاديث النبوية، ويطرح حلولاً عملية لتعزيز التعاون والتكامل بين الدول الإسلامية في مختلف المجالات السياسية والاقتصادية والثقافية.",
    publicationDate: "8 مارس 2018",
    downloadUrl: "#",
    tags: ["الوحدة الإسلامية", "الأمن الفكري", "الحركات المتطرفة", "الفكر السياسي"]
  },
  {
    id: 9,
    title: "تيسير الحصول على أصول الوصول",
    author: "الشيخ علي بن حاج",
    year: "2021",
    pages: "224",
    cover: "/uploads/book9.jpg",
    description: "كتاب في أصول الفقه، يهدف إلى تيسير فهم أصول الوصول.",
    fullDescription: "كتاب في أصول الفقه، يهدف إلى تيسير فهم أصول الوصول. يتناول الكتاب بالتفصيل مسائل القياس، والإجماع، والاستحسان، والمصالح المرسلة، والعرف.",
    publicationDate: "15 نوفمبر 2021",
    downloadUrl: "#",
    tags: ["أصول الفقه", "قياس", "إجماع", "استحسان"]
  },
  {
    id: 10,
    title: "المرتقى السني في شرح نظم البيقوني",
    author: "الشيخ علي بن حاج",
    year: "2023",
    pages: "192",
    cover: "/uploads/book10.jpg",
    description: "شرح لنظم البيقوني في مصطلح الحديث، يوضح قواعد علم الحديث.",
    fullDescription: "شرح لنظم البيقوني في مصطلح الحديث، يوضح قواعد علم الحديث. يتناول الكتاب بالتفصيل مسائل الصحيح، والحسن، والضعيف، والموضوع، والمسند، والمتصل، والمرسل، والمنقطع، والمعضل، والشاذ، والمحفوظ، والمعلل.",
    publicationDate: "1 أغسطس 2023",
    downloadUrl: "#",
    tags: ["مصطلح الحديث", "علم الحديث", "البيقوني", "قواعد"]
  }
];

// Books page component
const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  // Filter books based on search term
  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Reset search term
  const resetSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Meta tags
  const metaTitle = "مؤلفات الشيخ علي بن حاج - تصفح أحدث الكتب والمؤلفات";
  const metaDescription = "اكتشف مؤلفات الشيخ علي بن حاج، وتصفح أحدث الكتب والمقالات في مختلف المجالات الإسلامية.";

  return (
    <div>
      <MetaTags title={metaTitle} description={metaDescription} />
      
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link to="/" className="inline-flex items-center text-navy hover:text-gold transition-colors">
            <ChevronLeft size={16} className="mr-1" />
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>

      <div className="section-container">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="section-title">مؤلفات الشيخ علي بن حاج</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6 max-w-lg">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-gray-400" size={16} />
            </div>
            <input
              type="search"
              placeholder="ابحث عن كتاب..."
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-gold focus:border-gold"
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={resetSearch}
              >
                <span className="text-gray-500 hover:text-gray-700 cursor-pointer">
                  X
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Book List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentBooks.map((book) => (
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

        {/* Pagination */}
        {filteredBooks.length > booksPerPage && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronRight size={20} />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                className="mx-1"
                onClick={() => paginate(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronLeft size={20} />
            </Button>
          </div>
        )}

        {filteredBooks.length === 0 && (
          <div className="text-center mt-8">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">لا توجد نتائج مطابقة لبحثك.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
