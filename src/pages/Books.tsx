import { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, Tag as TagIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import BookCard from "@/components/BookCard";

// Book data type
export interface BookType {
  id: number;
  title: string;
  author: string;
  cover: string;
  year: string;
  publicationDate?: string;
  downloadUrl: string;
  pages: string;
  description: string;
  tags: string[];
  fullDescription?: string; // Add this optional property
}

// Export booksData so it can be used in other components
export const booksData: BookType[] = [
  {
    id: 1,
    title: "الجامع في أحكام القرآن",
    author: "أبو عبد الله القرطبي",
    cover: "https://upload.wikimedia.org/wikipedia/ar/thumb/4/4d/%D8%A7%D9%84%D8%AC%D8%A7%D9%85%D8%B9_%D9%84%D8%A3%D8%AD%D9%83%D8%A7%D9%85_%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86.jpg/330px-%D8%A7%D9%84%D8%AC%D8%A7%D9%85%D8%B9_%D9%84%D8%A3%D8%AD%D9%83%D8%A7%D9%85_%D8%A7%D9%84%D9%82%D8%B1%D8%A2%D9%86.jpg",
    year: "1272",
    downloadUrl: "https://waqfeya.net/book.php?bid=226",
    pages: "7744",
    description: "تفسير شامل للقرآن الكريم يركز على الأحكام الفقهية والمسائل الشرعية.",
    tags: ["تفسير", "فقه", "قرآن"],
  },
  {
    id: 2,
    title: "فقه السنة",
    author: "سيد سابق",
    cover: "https://upload.wikimedia.org/wikipedia/ar/thumb/1/1b/%D9%81%D9%82%D9%87_%D8%A7%D9%84%D8%B3%D9%86%D9%87_.jpg/330px-%D9%81%D9%82%D9%87_%D8%A7%D9%84%D8%B3%D9%86%D9%87_.jpg",
    year: "1946",
    downloadUrl: "https://www.islamicbook.ws/fiqh/feqh-alsunna-sayed-sabeq.html",
    pages: "576",
    description: "كتاب في الفقه الإسلامي يعتمد على السنة النبوية كمصدر رئيسي للأحكام.",
    tags: ["فقه", "سنة", "إسلام"],
  },
  {
    id: 3,
    title: "إحياء علوم الدين",
    author: "أبو حامد الغزالي",
    cover: "https://upload.wikimedia.org/wikipedia/ar/thumb/9/9c/%D8%A5%D8%AD%D9%8A%D8%A7%D8%A1_%D8%B9%D9%84%D9%88%D9%85_%D8%A7%D9%84%D8%AF%D9%8A%D9%86_front.jpg/330px-%D8%A5%D8%AD%D9%8A%D8%A7%D8%A1_%D8%B9%D9%84%D9%88%D9%85_%D8%A7%D9%84%D8%AF%D9%8A%D9%86_front.jpg",
    year: "1111",
    downloadUrl: "https://ghazali.org/books/ihya/",
    pages: "1472",
    description: "كتاب في التصوف والأخلاق يهدف إلى إحياء العلوم الدينية وتجديدها.",
    tags: ["تصوف", "أخلاق", "دين"],
  },
  {
    id: 4,
    title: "تفسير الطبري",
    author: "أبو جعفر الطبري",
    cover: "https://upload.wikimedia.org/wikipedia/ar/thumb/6/6b/%D8%AA%D9%81%D8%B3%D9%8A%D8%B1_%D8%A7%D9%84%D8%B7%D8%A8%D8%B1%D9%8A.JPG/330px-%D8%AA%D9%81%D8%B3%D9%8A%D8%B1_%D8%A7%D9%84%D8%B7%D8%A8%D8%B1%D9%8A.JPG",
    year: "923",
    downloadUrl: "https://www.islamicbook.ws/tafser/tafseer-altabari.html",
    pages: "8448",
    description: "تفسير شامل للقرآن الكريم يعتبر من أقدم وأشهر التفاسير.",
    tags: ["تفسير", "قرآن", "إسلام"],
  },
  {
    id: 5,
    title: "الموافقات في أصول الشريعة",
    author: "أبو إسحاق الشاطبي",
    cover: "https://upload.wikimedia.org/wikipedia/ar/thumb/a/a9/%D8%A7%D9%84%D9%85%D9%88%D8%A7%D9%81%D9%82%D8%A7%D8%AA.jpg/330px-%D8%A7%D9%84%D9%85%D9%88%D8%A7%D9%81%D9%82%D8%A7%D8%AA.jpg",
    year: "1388",
    downloadUrl: "https://www.islamicbook.ws/ اصول/almuwafaqat-fi-usul-alshariaa-alshatibi.html",
    pages: "832",
    description: "كتاب في أصول الفقه يتناول مقاصد الشريعة وأهدافها.",
    tags: ["أصول فقه", "شريعة", "إسلام"],
  },
  {
    id: 6,
    title: "من الشواهد الشرعية والنماذج التاريخية على مشروعية الإضرابات والاعتصامات والمظاهرات السلمية",
    author: "الشيخ علي بن حاج",
    cover: "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?q=80&w=1374&auto=format&fit=crop",
    year: "2012",
    publicationDate: "٢٢ أبريل ٢٠١٢",
    downloadUrl: "https://web.archive.org/web/20121013114015/http://alibenhadj.net/upload/ebook/chawahide1.rar",
    pages: "185",
    description: "كتاب يقدّم أطروحة شاملة في الدفاع عن شرعية وسائل الاحتجاج السلمي من منظور إسلامي، مثل الإضرابات والاعتصامات والمظاهرات، التي كثيرًا ما أُشيع بأنها دخيلة على الإسلام أو محرّمة شرعًا.",
    tags: ["فقه سياسي", "الاحتجاج السلمي", "حقوق الشعوب", "فتاوى"],
    fullDescription: `من الشواهد الشرعية والنماذج التاريخية على مشروعية الإضرابات والاعتصامات والمظاهرات السلمية هو كتاب من تأليف الشيخ علي بن حاج، يقع في 185 صفحة، ويقدّم أطروحة شاملة في الدفاع عن شرعية وسائل الاحتجاج السلمي من منظور إسلامي، مثل الإضرابات والاعتصامات والمظاهرات، التي كثيرًا ما أُشيع بأنها دخيلة على الإسلام أو محرّمة شرعًا. يعرض الكتاب رؤية فقهية سياسية تستند إلى نصوص شرعية، وتجارب تاريخية إسلامية، ومواقف علمائية معتبرة، في مواجهة فتاوى التحريم التي تصدر عن بعض علماء السلطة.

يبدأ الكتاب بمقدمة بيّن فيها الكاتب السياق العام الذي دفعه لكتابة هذه الرسالة، وهو اتساع نطاق الثورات الشعبية والاحتجاجات في الدول العربية، وتزامنها مع حملات من الفتاوى الرسمية التي تحرّم التظاهر، وتصف المشاركين فيه بالمفسدين في الأرض. ويؤكد المؤلف أن هذه الفتاوى توظف لخدمة الأنظمة المستبدة وقمع الشعوب، وهي في الحقيقة مخالفة لجوهر الشريعة الإسلامية.

يعتمد الكتاب في بنائه على تقديم أكثر من 80 نموذجًا وشاهدًا من القرآن الكريم، والسنة النبوية، والسيرة، وأخبار الصحابة والتابعين، والتاريخ الإسلامي الوسيط والحديث، لإثبات أن الاحتجاج السلمي لم يكن غريبًا عن حياة المسلمين، بل كان موجودًا في أشكال متعددة، ويمثل وسيلة من وسائل إقامة الحجة، والأمر بالمعروف، ورفض الظلم، والمطالبة بالحقوق.

ينقسم المحتوى إلى عدة وحدات رئيسية، منها:

النماذج القرآنية: مثل خروج سيدنا إبراهيم على أصنام قومه، ومواجهة موسى لفرعون، وقصة أصحاب الأخدود.

النماذج النبوية: منها نداء النبي على الصفا، وتعرضه للسخرية في الطائف، واستقباله في المدينة، واحتجاج الناس بعد غزوة مؤتة.

النماذج من الصحابة والتابعين: مثل احتجاج النساء من آل بيت النبي على ضرب الأزواج، وجهر أبي ذر وابن مسعود بالإسلام في مكة.

النماذج من العلماء: مثل العز بن عبد السلام عندما أسقط بيعة الحاكم الجائر، واحتجاجات الفقهاء في بغداد والقيروان ضد الفساد.

النماذج من التاريخ المعاصر: احتجاجات علماء الجزائر ضد الاستعمار الفرنسي، ومسيرات الشيخ عبد الحميد بن باديس، والمواقف الجماهيرية في تونس ومصر.

كما يتضمن الكتاب قسمًا خاصًا بالرد على أبرز الشبهات، من بينها:

أن المظاهرات "بدعة" لم يعرفها السلف.

أنها تشبه أعمال "الكفار" أو "العلمانيين".

أن الطاعة المطلقة للحاكم مقدمة على أي اعتراض.

ويفصل الشيخ في الفرق بين المقاصد الشرعية والوسائل المتغيرة، مؤكدًا أن الوسائل الدعوية والسياسية ليست توقيفية، وإنما تخضع للاجتهاد، وأن الأصل في الوسائل هو الإباحة ما لم يرد دليل على التحريم.

ويختم المؤلف بجملة من التنبيهات العلمية الدقيقة، ويورد أكثر من عشرين "فائدة فقهية" تتعلق بفقه الاحتجاج، وحقوق الشعوب، وواجبات العلماء، منها:

مشروعية نقد الحاكم جهرًا.

الفرق بين الفتوى المنقولة والمستنبطة.

التحذير من تحريف النصوص لتبرير الظلم.

خطر علماء السوء وفتاواهم المعلّبة.

يمثّل الكتاب مرافعة فكرية شرعية عالية المستوى، ويدعو فيه المؤلف إلى تجاوز فقه الجمود والسكوت، والانحياز إلى فقه العزة والكرامة ومقاومة الظلم. ويخاطب فيه بالأساس العلماء والدعاة والنخب الدينية، مطالبًا إياهم بالانحياز إلى قضايا الأمة، لا إلى أنظمتها.

يمكن اعتبار هذا الكتاب بمثابة مرجع في فقه الثورة السلمية داخل الفكر الإسلامي المعاصر، وهو أيضًا سجل تاريخي للعديد من المواقف المنسية التي تؤكد أن السكوت عن الظلم ليس من الإسلام في شيء.`
  },
  {
    id: 7,
    title: "مختصر صحيح مسلم",
    author: "زين الدين عبد العظيم المنذري",
    cover: "https://upload.wikimedia.org/wikipedia/ar/thumb/2/2a/%D9%85%D8%AE%D8%AA%D8%B5%D8%B1_%D8%B5%D8%AD%D9%8A%D8%AD_%D9%85%D8%B3%D9%84%D9%85.jpg/330px-%D9%85%D8%AE%D8%AA%D8%B5%D8%B1_%D8%B5%D8%AD%D9%8A%D8%AD_%D9%85%D8%B3%D9%84%D9%85.jpg",
    year: "1258",
    downloadUrl: "https://www.islamicbook.ws/hadith/mokhtsar-sahih-muslim-almunziri.html",
    pages: "896",
    description: "مختصر لكتاب صحيح مسلم، أحد أهم كتب الحديث النبوي.",
    tags: ["حديث", "سنة", "إسلام"],
  },
  {
    id: 8,
    title: "الرسالة",
    author: "محمد بن إدريس الشافعي",
    cover: "https://upload.wikimedia.org/wikipedia/ar/thumb/d/dd/%D8%A7%D9%84%D8%B1%D8%B3%D8%A7%D9%84%D8%A9_%D9%84%D9%84%D8%A5%D9%85%D8%A7%D9%85_%D8%A7%D9%84%D8%B4%D8%A7%D9%81%D8%B9%D9%8A.jpg/330px-%D8%A7%D9%84%D8%B1%D8%B3%D8%A7%D9%84%D8%A9_%D9%84%D9%84%D8%A5%D9%85%D8%A7%D9%85_%D8%A7%D9%84%D8%B4%D8%A7%D9%81%D8%B9%D9%8A.jpg",
    year: "820",
    downloadUrl: "https://www.islamicbook.ws/ اصول/alrisala-lil'imam-alshafii.html",
    pages: "512",
    description: "كتاب في أصول الفقه يعتبر من أهم الكتب في هذا المجال.",
    tags: ["أصول فقه", "شريعة", "إسلام"],
  },
];

export default function Books() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(booksData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = booksData.filter((book) =>
      book.title.toLowerCase().includes(term.toLowerCase()) ||
      book.author.toLowerCase().includes(term.toLowerCase()) ||
      book.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="section-container">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="section-title">مكتبة الكتب</h2>
      </div>

      <div className="mb-6 relative">
        <Input
          type="text"
          placeholder="ابحث عن كتاب..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
        <Search className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 w-5 h-5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </div>
  );
}
