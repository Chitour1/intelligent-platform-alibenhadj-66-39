import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Search, Filter } from 'lucide-react';
import { BookType } from '../types/books';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import MetaTags from '../components/MetaTags';

// أضفت الكتاب الجديد "الدمغة القوية" إلى قائمة الكتب
export const booksData: BookType[] = [
  {
    id: 101,
    title: "الدمغة القوية",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/81010ad7-e900-419c-bc35-581605fa00b1.png",
    downloadUrl: "https://gsko.com/skwk",
    year: "2023",
    publicationDate: "2023",
    pages: "150",
    description: "السلام عليكم",
    tags: ["فكر إسلامي", "سياسة"],
    fullDescription: "لنسف عقيدة الديمقراطية"
  },
  {
    id: 1,
    title: "الجامع في فقه النوازل",
    author: "علي بن حاج",
    cover: "/lovable-uploads/96a896ba-4999-4987-a9a9-0f343219192d.png",
    downloadUrl: "https://alibenhadj.net/ar/article/100",
    year: "2016",
    publicationDate: "2016",
    pages: "448",
    description: "كتاب في فقه النوازل، يهدف إلى جمع أهم النوازل الفقهية المعاصرة.",
    tags: ["فقه", "نوازل"],
    fullDescription: "يهدف هذا الكتاب إلى جمع أهم النوازل الفقهية المعاصرة التي يحتاج إليها المسلم في حياته اليومية. يتناول الكتاب مجموعة واسعة من المواضيع الفقهية، مثل العبادات، المعاملات، الأحوال الشخصية، والجنايات. يتميز الكتاب بأسلوبه الواضح والمبسط، معتمداً على الأدلة الشرعية من الكتاب والسنة وإجماع العلماء. يعتبر هذا الكتاب مرجعاً هاماً للباحثين والطلاب والمهتمين بالفقه الإسلامي."
  },
  {
    id: 2,
    title: "الإنصاف في الرد على من نسب الشيخ عبد الحميد بن باديس إلى الإرجاف",
    author: "علي بن حاج",
    cover: "/lovable-uploads/69499993-7941-4044-884f-7991c933e588.png",
    downloadUrl: "https://alibenhadj.net/ar/article/99",
    year: "2015",
    publicationDate: "2015",
    pages: "128",
    description: "رد على من اتهم الشيخ عبد الحميد بن باديس بالإرجاف.",
    tags: ["فكر إسلامي", "تاريخ"],
    fullDescription: "يهدف هذا الكتاب إلى الدفاع عن الشيخ عبد الحميد بن باديس، أحد أبرز علماء الجزائر في القرن العشرين، ضد تهمة الإرجاف التي وجهت إليه. يقدم الكتاب أدلة وبراهين تثبت براءة الشيخ ابن باديس من هذه التهمة، معتمداً على أقواله وأفعاله ومواقفه التاريخية. يعتبر هذا الكتاب مساهمة هامة في حفظ تراث الشيخ ابن باديس وتبيان منهجه الإصلاحي."
  },
  {
    id: 3,
    title: "القول الفصل في حكم المسألة و السائل",
    author: "علي بن حاج",
    cover: "/lovable-uploads/39999993-7941-4044-884f-7991c933e588.png",
    downloadUrl: "https://alibenhadj.net/ar/article/98",
    year: "2014",
    publicationDate: "2014",
    pages: "96",
    description: "رسالة في أحكام المسألة والسؤال.",
    tags: ["فقه", "أخلاق"],
    fullDescription: "تتناول هذه الرسالة أحكام المسألة والسؤال في الفقه الإسلامي، مع بيان آداب السؤال وشروطه وأحوال السائل. تهدف الرسالة إلى توعية المسلمين بأهمية السؤال في الدين، مع الحث على السؤال الصحيح الذي يهدف إلى العلم والعمل، والتحذير من السؤال المذموم الذي يهدف إلى الجدال والمراء. تعتبر هذه الرسالة مرجعاً هاماً للمسلمين في معرفة أحكام السؤال وآدابه."
  },
  {
    id: 4,
    title: "البيان لما أشكل من مسائل الإيمان",
    author: "علي بن حاج",
    cover: "/lovable-uploads/09999993-7941-4044-884f-7991c933e588.png",
    downloadUrl: "https://alibenhadj.net/ar/article/97",
    year: "2013",
    publicationDate: "2013",
    pages: "160",
    description: "شرح وتوضيح لمسائل الإيمان التي قد تشكل على بعض الناس.",
    tags: ["عقيدة", "فكر إسلامي"],
    fullDescription: "يهدف هذا الكتاب إلى شرح وتوضيح مسائل الإيمان التي قد تشكل على بعض الناس، معتمداً على الأدلة الشرعية من الكتاب والسنة وإجماع العلماء. يتناول الكتاب مجموعة واسعة من المواضيع المتعلقة بالإيمان، مثل أركان الإيمان، حقيقة الإيمان، نواقض الإيمان، ومسائل الولاء والبراء. يتميز الكتاب بأسلوبه الواضح والمبسط، معتمداً على الأدلة الشرعية من الكتاب والسنة وإجماع العلماء. يعتبر هذا الكتاب مرجعاً هاماً للباحثين والطلاب والمهتمين بالعقيدة الإسلامية."
  },
  {
    id: 5,
    title: "المرشد المعين على فهم معاني كلام رب العالمين",
    author: "علي بن حاج",
    cover: "/lovable-uploads/79999993-7941-4044-884f-7991c933e588.png",
    downloadUrl: "https://alibenhadj.net/ar/article/96",
    year: "2012",
    publicationDate: "2012",
    pages: "224",
    description: "تفسير لبعض آيات القرآن الكريم بأسلوب معاصر.",
    tags: ["تفسير", "قرآن"],
    fullDescription: "يهدف هذا الكتاب إلى تفسير بعض آيات القرآن الكريم بأسلوب معاصر، معتمداً على أقوال المفسرين المعتبرين. يتناول الكتاب مجموعة من الآيات التي تتعلق بمختلف جوانب الحياة، مثل العقيدة، العبادات، الأخلاق، والمعاملات. يتميز الكتاب بأسلوبه الواضح والمبسط، معتمداً على الأدلة الشرعية من الكتاب والسنة وإجماع العلماء. يعتبر هذا الكتاب مرجعاً هاماً للباحثين والطلاب والمهتمين بتفسير القرآن الكريم."
  },
  {
    id: 6,
    title: "المنهج القويم في التعامل مع الفتن",
    author: "علي بن حاج",
    cover: "/lovable-uploads/49999993-7941-4044-884f-7991c933e588.png",
    downloadUrl: "https://alibenhadj.net/ar/article/95",
    year: "2011",
    publicationDate: "2011",
    pages: "192",
    description: "بيان المنهج الصحيح للتعامل مع الفتن والمحن.",
    tags: ["فكر إسلامي", "أخلاق"],
    fullDescription: "يهدف هذا الكتاب إلى بيان المنهج الصحيح للتعامل مع الفتن والمحن التي قد يتعرض لها المسلم في حياته. يقدم الكتاب مجموعة من النصائح والتوجيهات المستمدة من الكتاب والسنة وإجماع العلماء، مع التركيز على أهمية الصبر والثبات والاعتصام بالكتاب والسنة. يعتبر هذا الكتاب مرجعاً هاماً للمسلمين في مواجهة الفتن والمحن."
  },
  {
    id: 7,
    title: "تيسير الحصول على أصول الوصول",
    author: "علي بن حاج",
    cover: "/lovable-uploads/19999993-7941-4044-884f-7991c933e588.png",
    downloadUrl: "https://alibenhadj.net/ar/article/94",
    year: "2010",
    publicationDate: "2010",
    pages: "144",
    description: "شرح مبسط لأصول الوصول إلى الله تعالى.",
    tags: ["تصوف", "أخلاق"],
    fullDescription: "يهدف هذا الكتاب إلى شرح مبسط لأصول الوصول إلى الله تعالى، معتمداً على أقوال العلماء والصالحين. يتناول الكتاب مجموعة من المواضيع المتعلقة بالوصول إلى الله، مثل الإخلاص، الصدق، التوبة، الزهد، والورع. يتميز الكتاب بأسلوبه الواضح والمبسط، معتمداً على الأدلة الشرعية من الكتاب والسنة وإجماع العلماء. يعتبر هذا الكتاب مرجعاً هاماً للباحثين والطلاب والمهتمين بالتصوف الإسلامي."
  },
  {
    id: 8,
    title: "التعليقات السنية على العقيدة الواسطية",
    author: "علي بن حاج",
    cover: "/lovable-uploads/86a896ba-4999-4987-a9a9-0f343219192d.png",
    downloadUrl: "https://alibenhadj.net/ar/article/93",
    year: "2009",
    publicationDate: "2009",
    pages: "256",
    description: "تعليقات وشروح على العقيدة الواسطية لشيخ الإسلام ابن تيمية.",
    tags: ["عقيدة", "فكر إسلامي"],
    fullDescription: "يهدف هذا الكتاب إلى تقديم تعليقات وشروح على العقيدة الواسطية لشيخ الإسلام ابن تيمية، معتمداً على الأدلة الشرعية من الكتاب والسنة وإجماع العلماء. يتناول الكتاب مجموعة واسعة من المواضيع المتعلقة بالعقيدة الإسلامية، مثل توحيد الله، أسماء الله وصفاته، أفعال الله، واليوم الآخر. يتميز الكتاب بأسلوبه الواضح والمبسط، معتمداً على الأدلة الشرعية من الكتاب والسنة وإجماع العلماء. يعتبر هذا الكتاب مرجعاً هاماً للباحثين والطلاب والمهتمين بالعقيدة الإسلامية."
  },
  {
    id: 9,
    title: "الفوائد الجلية في شرح الأربعين النووية",
    author: "علي بن حاج",
    cover: "/lovable-uploads/56a896ba-4999-4987-a9a9-0f343219192d.png",
    downloadUrl: "https://alibenhadj.net/ar/article/92",
    year: "2008",
    publicationDate: "2008",
    pages: "320",
    description: "شرح وتوضيح للأربعين النووية للإمام النووي.",
    tags: ["حديث", "أخلاق"],
    fullDescription: "يهدف هذا الكتاب إلى شرح وتوضيح الأربعين النووية للإمام النووي، معتمداً على أقوال العلماء المعتبرين. يتناول الكتاب مجموعة من الأحاديث النبوية الشريفة التي تتعلق بمختلف جوانب الحياة، مثل العقيدة، العبادات، الأخلاق، والمعاملات. يتميز الكتاب بأسلوبه الواضح والمبسط، معتمداً على الأدلة الشرعية من الكتاب والسنة وإجماع العلماء. يعتبر هذا الكتاب مرجعاً هاماً للباحثين والطلاب والمهتمين بالحديث النبوي الشريف."
  },
  {
    id: 10,
    title: "تفقيه الشرفاء في كيفية الرّد لزجر السفهاء",
    author: "علي بن حاج",
    cover: "/lovable-uploads/7e12e898-9eb0-467f-8185-2ec569d9ced5.png",
    pages: "29",
    year: "2006",
    publicationDate: "2006",
    description: "رسالة مختصرة تؤسس لمنهج شرعي في الردّ على المخالفين والطاعنين، يقوم على التفريق بين الردّ المبدئي المشروع وبين المهاترات والانتصار للنفس.",
    downloadUrl: "https://web.archive.org/web/20121015045021/http://alibenhadj.net/upload/ebook/tafkihe.rar",
    tags: ["فكر إسلامي", "أخلاق"]
  }
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(booksData);
  const [sortOrder, setSortOrder] = useState('latest'); // 'latest' or 'oldest'

  useEffect(() => {
    document.title = "مؤلفات الشيخ علي بن حاج - المكتبة";
  }, []);

  useEffect(() => {
    const results = booksData.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort the results based on the selected order
    const sortedResults = [...results].sort((a, b) => {
      const dateA = a.publicationDate || a.year;
      const dateB = b.publicationDate || b.year;

      if (sortOrder === 'latest') {
        return dateB.localeCompare(dateA); // Sort by latest first
      } else {
        return dateA.localeCompare(dateB); // Sort by oldest first
      }
    });

    setFilteredBooks(sortedResults);
  }, [searchTerm, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-12">
      <MetaTags title="مؤلفات الشيخ علي بن حاج" description="جميع مؤلفات وكتب الشيخ علي بن حاج" />
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-navy">مؤلفات الشيخ علي بن حاج</h1>
        <div className="space-x-2 flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="ابحث عن كتاب..."
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <select
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="latest">الأحدث</option>
            <option value="oldest">الأقدم</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <Link key={book.id} to={`/publications/books/${book.id}`} className="card group">
            <div className="relative overflow-hidden rounded-md">
              <AspectRatio ratio={3 / 4} className="w-full bg-gray-100">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold group-hover:text-gold transition-colors duration-300">
                    {book.title}
                  </h3>
                </div>
              </AspectRatio>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={14} className="ml-1" />
                  <span>
                    {book.year}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <BookOpen size={14} className="ml-1" />
                  {book.pages} صفحة
                </div>
              </div>
              {book.publicationDate && (
                <div className="text-xs text-gold mb-2">
                  تاريخ النشر: {book.publicationDate}
                </div>
              )}
              <p className="text-gray-600 text-sm line-clamp-3">{book.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Books;
