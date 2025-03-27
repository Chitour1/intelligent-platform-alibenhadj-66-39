
import { useState } from "react";
import { BookType } from "../types/books";
import BookCard from "../components/BookCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MetaTags from "@/components/MetaTags";

// بيانات الكتب
export const booksData: BookType[] = [
  {
    id: 1,
    title: "فصل التخالف في قضية التحالف",
    author: "الشيخ أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/662a113a-2be1-45ea-969e-73aabf6434b4.png",
    downloadUrl: "https://archive.org/download/20250327_20250327_0839/%D9%81%D8%B5%D9%84%20%D8%A7%D9%84%D8%AA%D8%AE%D8%A7%D9%84%D9%81%20%D9%81%D9%8A%20%D9%82%D8%B6%D9%8A%D8%A9%20%D8%A7%D9%84%D8%AA%D8%AD%D8%A7%D9%84%D9%81.pdf",
    year: "1990",
    publicationDate: "15 ربيع الأول 1411 هـ / 4 أكتوبر 1990 م",
    pages: "48",
    description: "رسالة مختصرة تتناول مسألة التحالف بين الجماعات الإسلامية وغيرها من الجهات أو الأحزاب، وتعرض لمفهوم الحلف في اللغة وفي الشريعة.",
    tags: ["فكر إسلامي", "فقه سياسي", "دراسات شرعية"],
    fullDescription: "فصل التخالف في قضية التحالف هي رسالة مختصرة كتبها الشيخ أبو عبد الفتاح علي بن حاج، نُشرت أول مرة على صفحات جريدة المنقذ الناطقة باسم الجبهة الإسلامية للإنقاذ، في عددها رقم 27 بتاريخ 15 ربيع الأول 1411 هـ / الموافق لـ 4 أكتوبر 1990 م، ثم أعيد طبعها في طبعة أولى سنة 1993م / 1414هـ عن دار العقاب.\n\nتتناول الرسالة مسألة \"التحالف\" بين الجماعات الإسلامية وغيرها من الجهات أو الأحزاب، وتعرض لمفهوم الحلف في اللغة وفي الشريعة، وتناقش بالتفصيل الأحاديث النبوية الواردة في شأن الحلف، وأقوال العلماء حول نسخه أو استمراره، مع بيان مواقف الصحابة، وأمثلة من أحلاف الجاهلية، لا سيما حلف الفضول، الذي شهد عليه النبي صلى الله عليه وسلم قبل البعثة، وعبّر لاحقًا عن استعداده للمشاركة فيه حتى بعد الإسلام، لو دُعي إليه.\n\nتستعرض الرسالة خلاف العلماء حول قول النبي ﷺ: \"لا حلف في الإسلام\"، وتوضح أن هناك من يرى أن هذا النفي خاص بنوع معين من الأحلاف مثل أحلاف التوارث أو الحروب القبلية، في حين يرى آخرون أنه نفيٌ عام يشمل كل تحالف مخصص خارج إطار أخوة الإيمان الجامعة.\n\nيؤكد الشيخ في الرسالة أن نصرة المظلوم، والأخذ على يد الظالم، والتعاون على البر والتقوى، لا تفتقر إلى تحالفات خاصة أو مواثيق إضافية، لأنها مفروضة أصلًا على المسلمين بنصوص الكتاب والسنة. ويعتبر أن المؤاخاة الإيمانية التي عقدها الله ورسوله كافية وشاملة لكل أنواع التعاون والنصرة المشروعة، ولا حاجة لعقود تحالف قد تنزلق في كثير من الأحيان إلى التكتلات الحزبية أو الولاءات الضيقة.\n\nوفي خلاصة الرسالة، يدعو الشيخ إلى أن يكون المسلمون يدًا واحدة على من عاداهم، وإلى تجاوز الخلافات الجانبية التي لا تمس أصول العقيدة، مكررًا أن التآلف بين الأرواح لا يحتاج إلى تحالفات موقعة بين الأشباح. ويختم برسالة اعتذار واضح، يؤكد فيها أنه يتناول المسألة من زاوية فكرية شرعية، دون التطرق لأسماء أو هيئات، مراعاة لأدب الاختلاف، وحرصًا على وحدة الصف الإسلامي.\n\nالرسالة تُعدّ واحدة من سلسلة منشورات الشيخ علي بن حاج الفكرية والتنبيهية، تضم عناوين مثل: الدمغة القوية لنسف عقيدة الديمقراطية، وإجادة التحبير في بيان قواعد التغيير، وتنبيه الأخيار إلى حكم الاستعانة بالكفار. وهي رسائل موجّهة إلى جمهور الصحوة الإسلامية، تُقدَّم بلغة شرعية مباشرة، تضع \"الشرع\" معيارًا لكل تعامل سياسي أو تنظيمي."
  },
  {
    id: 2,
    title: "الخلافة العباسية",
    author: "محمد الخضري",
    cover: "/lovable-uploads/36396a59-1f0a-4d68-a2ce-0f735612c2cc.png",
    downloadUrl: "#",
    year: "2010",
    pages: "350",
    description: "يتناول هذا الكتاب تاريخ الخلافة العباسية منذ قيامها وحتى سقوطها، ويعرض للأحداث السياسية والاجتماعية والثقافية خلال هذه الفترة.",
    tags: ["تاريخ إسلامي", "الخلافة العباسية", "العصر العباسي"]
  },
  {
    id: 3,
    title: "الإسلام والحضارة الغربية",
    author: "محمد محمد حسين",
    cover: "/lovable-uploads/c48f156c-7604-4c04-bd4d-70f60e78d3f0.png",
    downloadUrl: "#",
    year: "1979",
    pages: "212",
    description: "دراسة نقدية تقارن بين الحضارة الإسلامية والحضارة الغربية المعاصرة، وتناقش تأثير الأفكار الغربية على المجتمعات الإسلامية.",
    tags: ["فكر إسلامي", "حضارة", "نقد حضاري"]
  },
  {
    id: 4,
    title: "المفصل في تاريخ العرب قبل الإسلام",
    author: "جواد علي",
    cover: "/lovable-uploads/9f770200-2b1c-485e-a8d5-619fab6074d8.png",
    downloadUrl: "#",
    year: "1993",
    pages: "520",
    description: "موسوعة شاملة في تاريخ العرب قبل الإسلام، تتناول الجوانب السياسية والاجتماعية والدينية والثقافية للحياة العربية في الجزيرة العربية.",
    tags: ["تاريخ العرب", "جزيرة العرب", "الجاهلية"]
  },
  {
    id: 5,
    title: "تراث الإسلام",
    author: "شاخت وبوزورث",
    cover: "/lovable-uploads/78ff808b-a7c0-45b5-b93d-18ef4e6cc70a.png",
    downloadUrl: "#",
    year: "1998",
    pages: "480",
    description: "دراسة ممتازة للتراث الإسلامي من جوانبه المختلفة: العلمية والأدبية والفنية والمعمارية، قام بترجمتها إلى العربية حسين مؤنس وإحسان صدقي العمد.",
    tags: ["تراث إسلامي", "حضارة إسلامية", "فنون إسلامية"]
  },
  {
    id: 6,
    title: "المدخل إلى دراسة القرآن الكريم",
    author: "محمد محمد أبو شهبة",
    cover: "/lovable-uploads/70d5685f-4c56-4c99-b394-a1e96adb95c5.png",
    downloadUrl: "#",
    year: "2003",
    pages: "350",
    description: "يتناول هذا الكتاب مباحث علوم القرآن الأساسية، ويشرح قضايا الوحي والتنزيل والجمع والتدوين، ويناقش شبهات المستشرقين حول القرآن الكريم.",
    tags: ["علوم القرآن", "دراسات قرآنية", "الوحي"]
  }
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategory, setFilteredCategory] = useState<string>("");
  
  // تصفية الكتب بناءً على مصطلح البحث والتصنيف
  const filteredBooks = booksData.filter(book => {
    const matchesSearch = 
      book.title.includes(searchTerm) || 
      book.author.includes(searchTerm) || 
      book.description.includes(searchTerm);
    
    const matchesCategory = filteredCategory === "" || 
      book.tags.some(tag => tag === filteredCategory);
    
    return matchesSearch && matchesCategory;
  });
  
  // استخراج جميع التصنيفات الفريدة من الكتب
  const allCategories = Array.from(
    new Set(booksData.flatMap(book => book.tags))
  ).sort();

  return (
    <div className="section-container">
      <MetaTags />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-dark mb-4">المكتبة</h1>
        <p className="text-gray-600">
          مجموعة من الكتب والمؤلفات في مختلف المجالات الإسلامية والفكرية
        </p>
      </div>
      
      {/* بحث وتصفية */}
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="ابحث عن كتاب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filteredCategory === "" ? "default" : "outline"}
              onClick={() => setFilteredCategory("")}
              size="sm"
            >
              الكل
            </Button>
            {allCategories.map(category => (
              <Button
                key={category}
                variant={filteredCategory === category ? "default" : "outline"}
                onClick={() => setFilteredCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* عرض الكتب */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        
        {filteredBooks.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">لم يتم العثور على كتب مطابقة للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
