import BookCard from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { CalendarDays, BookOpenCheck, Search } from "lucide-react";
import { Helmet } from 'react-helmet-async';

export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  downloadUrl: string;
  year: string;
  pages: string;
  description: string;
  fullDescription?: string;
  tags: string[];
  publicationDate?: string;
}

export const booksData: Book[] = [
  {
    id: 1,
    title: "الجواب المفيد في حكم التصوير",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/64c78a91-44c8-428f-b993-5045a96ac1a9.jpg",
    downloadUrl: "https://example.com/books/al-jawab-al-mufeed",
    year: "١٩٩٢",
    pages: "٤٨",
    description: "رسالة تبحث في حكم التصوير الفوتوغرافي والرسم في الإسلام.",
    tags: ["فقه", "تصوير", "حلال وحرام"]
  },
  {
    id: 2,
    title: "القول الأصدق في بيان ما يجب على المرأة أن تعلمه وتتحقق",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/64c78a91-44c8-428f-b993-5045a96ac1a9.jpg",
    downloadUrl: "https://example.com/books/al-qawl-al-asdaq",
    year: "١٩٩٣",
    pages: "٦٤",
    description: "كتاب يوضح ما يجب على المرأة المسلمة معرفته والتحقق منه في دينها.",
    tags: ["فقه", "نساء", "تربية"]
  },
  {
    id: 3,
    title: "المرأة بين تكريم الإسلام وإهانة الجاهلية",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/64c78a91-44c8-428f-b993-5045a96ac1a9.jpg",
    downloadUrl: "https://example.com/books/al-marah-bayna-takreem-al-islam",
    year: "١٩٩٤",
    pages: "٨٠",
    description: "مقارنة بين مكانة المرأة في الإسلام وفي المجتمعات الجاهلية.",
    tags: ["مجتمع", "نساء", "تاريخ"]
  },
  {
    id: 4,
    title: "الشباب والداء الدفين",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/64c78a91-44c8-428f-b993-5045a96ac1a9.jpg",
    downloadUrl: "https://example.com/books/al-shabab-wal-da-al-dafeen",
    year: "١٩٩٥",
    pages: "٧٢",
    description: "يتناول قضايا الشباب والمشاكل التي تواجههم في العصر الحديث.",
    tags: ["شباب", "مجتمع", "تربية"]
  },
  {
    id: 5,
    title: "الخمر بين الطب والفقه",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/64c78a91-44c8-428f-b993-5045a96ac1a9.jpg",
    downloadUrl: "https://example.com/books/al-khamr-bayna-al-tib-wal-fiqh",
    year: "١٩٩٦",
    pages: "٦٤",
    description: "دراسة تجمع بين الجانب الطبي والفقهي حول موضوع الخمر.",
    tags: ["فقه", "طب", "حلال وحرام"]
  },
  {
    id: 6,
    title: "الرد على الطاعنين في ثوابت الدين",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/64c78a91-44c8-428f-b993-5045a96ac1a9.jpg",
    downloadUrl: "https://example.com/books/al-rad-ala-al-taeen",
    year: "١٩٩٧",
    pages: "٩٦",
    description: "كتاب يدافع عن ثوابت الدين الإسلامي ويرد على المشككين.",
    tags: ["فكر", "عقيدة", "دفاع"]
  },
  {
    id: 7,
    title: "المدخل إلى فقه الواقع",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/64c78a91-44c8-428f-b993-5045a96ac1a9.jpg",
    downloadUrl: "https://example.com/books/al-madkhal-ila-fiqh-al-waqe",
    year: "٢٠٠٠",
    pages: "١٢٨",
    description: "مقدمة في فهم فقه الواقع وكيفية تطبيقه في الحياة المعاصرة.",
    tags: ["فقه", "سياسة", "معاصر"]
  },
  {
    id: 8,
    title: "التذكير بوجوب وحدة الدول الإسلامية والتحذير من مخاطر الحركات الانفصالية",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/fab8c704-9764-46f9-b564-36697b1086d9.png",
    downloadUrl: "https://example.com/books/unity-of-islamic-states",
    year: "٢٠٢٤",
    pages: "٥٦",
    description: "كتاب يؤكد على أهمية الوحدة الإسلامية ويحذر من مخاطر الحركات الانفصالية",
    tags: ["وحدة", "سياسة", "إسلام"],
    publicationDate: "١٥ شعبان ١٤٤٥ هـ"
  },
  {
    id: 9,
    title: "القول الفصل في حكم المظاهرات والاعتصامات",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/64c78a91-44c8-428f-b993-5045a96ac1a9.jpg",
    downloadUrl: "https://example.com/books/al-qawl-al-fasl",
    year: "٢٠١٠",
    pages: "88",
    description: "رسالة توضح الحكم الشرعي للمظاهرات والاعتصامات في الإسلام.",
    tags: ["فقه", "سياسة", "معاصر"]
  },
  {
    id: 10,
    title: "وقفات مع قضايا الأمة",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/64c78a91-44c8-428f-b993-5045a96ac1a9.jpg",
    downloadUrl: "https://example.com/books/waqafat-maa-qadaya-al-umma",
    year: "٢٠١٥",
    pages: "112",
    description: "مجموعة مقالات تتناول قضايا الأمة الإسلامية المعاصرة.",
    tags: ["فكر", "سياسة", "مجتمع"]
  },
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(booksData);

  useEffect(() => {
    const results = booksData.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredBooks(results);
  }, [searchTerm]);

  return (
    <div>
      <Helmet>
        <title>مكتبة المقالات - البوابة الإعلامية للشيخ علي بن حاج</title>
      </Helmet>
      <section className="section-container">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-navy-dark">
            مكتبة الكتب
          </h1>
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="ابحث عن كتاب..."
              className="pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
        {filteredBooks.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            <BookOpenCheck size={48} className="mx-auto mb-4" />
            لا يوجد نتائج مطابقة لبحثك.
          </div>
        )}
      </section>
    </div>
  );
};

export default Books;
