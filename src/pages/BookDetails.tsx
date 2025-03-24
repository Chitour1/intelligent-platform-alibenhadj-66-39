
import { useParams, Link } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays, FileText, Download, Tag, ChevronLeft, Book } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookType {
  id: number;
  title: string;
  author: string;
  cover: string;
  downloadUrl: string;
  year: string;
  pages: string;
  description: string;
  tags: string[];
  fullDescription?: string;
}

// Sample books data with added full descriptions
const booksData: BookType[] = [
  {
    id: 1,
    title: "البرهان فيما يجب على الراعي والرعية نحو القرآن",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "/lovable-uploads/1c7632ee-4853-4921-b4bb-5ebc916df3c6.png",
    downloadUrl: "https://down.ketabpedia.com/files/gsh/gsh14120.rar",
    year: "٢٠١٥",
    pages: "٦٢",
    description: "يطرح الشيخ علي بن حاج في هذا الكتاب رؤية شرعية وفكرية ناقدة للعلاقة بين الحاكم والمحكوم تجاه القرآن الكريم، ويتناول بالتفصيل الواجبات الدينية والسياسية التي ينبغي أن يلتزم بها كل من الراعي (الحاكم) والرعية (الشعب) تجاه كتاب الله عز وجل، مع تسليط الضوء على مظاهر الانحراف عن هذه الواجبات في الواقع المعاصر.",
    tags: ["الفكر الإسلامي", "السياسة الشرعية", "الإصلاح"],
    fullDescription: `يطرح الشيخ علي بن حاج في هذا الكتاب، الذي يقع في 62 صفحة، رؤية شرعية وفكرية ناقدة للعلاقة بين الحاكم والمحكوم تجاه القرآن الكريم، ويتناول بالتفصيل الواجبات الدينية والسياسية التي ينبغي أن يلتزم بها كل من الراعي (الحاكم) والرعية (الشعب) تجاه كتاب الله عز وجل، مع تسليط الضوء على مظاهر الانحراف عن هذه الواجبات في الواقع المعاصر.

ينطلق المؤلف من واقع يُكرَّم فيه القرآن في المناسبات الاحتفالية، بينما تُعطَّل أحكامه في الواقع العملي والتشريعي، معتبرًا أن هذا السلوك يمثل "كارثة الكوارث" في حياة المسلمين اليوم. ويعرض المؤلف نقدًا شديدًا للحكام الذين يحصرون علاقتهم بالقرآن في التلاوة والتكريم الموسمي، متجاهلين تطبيق الشريعة وإقامة الحدود، ويحمّل المسؤولية كذلك لعلماء السلطة الذين يسكتون عن هذا الواقع.

كما يستعرض الكتاب مكانة القرآن في حياة السلف الصالح، مؤكدًا أن تعاملهم مع القرآن كان قائمًا على ثلاثية: الحفظ، الفهم، والعمل، ويقارن ذلك بواقع الخلف الذين اكتفوا بالحفظ والتجويد، وتركوا التدبر والتطبيق. ويركّز على أن المقصد الأسمى من القرآن هو العمل بأحكامه في كل مجالات الحياة: الفردية، الاجتماعية، السياسية، والاقتصادية.

وينتقد المؤلف ظواهر مثل زخرفة المساجد وتضخيم الصوتيات في تلاوة القرآن مقابل تغييب جوهر رسالته، كما يندد بالتكسب بالقرآن ومحاكاة أصوات القراء بدلاً من تدبر المعاني والعمل بها.

يضم الكتاب أيضًا فقرات تتعلق بنقد الأوضاع السياسية في الجزائر والعالم الإسلامي عمومًا، مع عرض مفصّل لما يعتبره كبار انحرافات الحكام، مثل تعطيل الشريعة، وتضييع أموال الأمة، وخذلان القضايا الإسلامية، واغتصاب الحكم.

ويخلص الكاتب إلى أن طريق الخلاص يكمن في العودة إلى القرآن الكريم مرجعية عليا للدولة والمجتمع، وتحقيق الإصلاح الحقيقي من خلال إقامة أحكام الله في الأرض.`
  },
  {
    id: 2,
    title: "التحديات السياسية المعاصرة",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1200&auto=format&fit=crop",
    downloadUrl: "#",
    year: "٢٠٢٢",
    pages: "٣٢٠",
    description: "كتاب يناقش التحديات السياسية المعاصرة في العالم العربي ويطرح رؤية إصلاحية شاملة للتعامل معها...",
    tags: ["السياسة الشرعية", "الإصلاح"],
    fullDescription: "كتاب يناقش التحديات السياسية المعاصرة في العالم العربي ويطرح رؤية إصلاحية شاملة للتعامل معها. يستعرض المؤلف مجموعة من القضايا المعاصرة التي تواجه العالم الإسلامي، ويقدم تحليلاً عميقاً لجذورها وتداعياتها، مع طرح حلول عملية مستمدة من الشريعة الإسلامية والتجارب الإنسانية الناجحة."
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

كُتب في ظرف سياسي وأمني بالغ الحساسية، حين كانت الجزائر تمر بواحدة من أخطر أزماتها السياسية، عقب وقف الانتخابات التشريعية في دورها الثاني، وما تبعها من اعتقالات، وقمع، واتهامات للإسلاميين بالإرهاب، في حين يرى المؤلف أن ما حدث هو انقلاب عسكري على إرادة الشعب، وأن مقاومته واجب شرعي.

الكتاب مقسم إلى أربعة محاور رئيسة، تمثل بناء فكريًا متماسكًا:

1. وجوب العمل السياسي لإقامة الدولة الإسلامية:
   - يؤكد فيه المؤلف أن العمل السياسي من صميم الإسلام، لا سيما إذا كان الهدف هو إقامة حكم شرعي.
   - يرد على من يعتبرون السياسة "دنسًا" أو خارجة عن الدين، مستندًا إلى القرآن والسنة وأقوال العلماء.
   - يعرض نماذج من السيرة النبوية وسير الخلفاء الراشدين، موضحًا أن الإسلام لم يعرف الفصل بين الدين والسياسة.

2. أصول النظام السياسي الإسلامي في اختيار الحاكم:
   - يوضح الشروط التي يجب أن تتوفر في الحاكم في الإسلام، وعلى رأسها العدل، الشورى، وعدم التسلط أو التوريث.
   - يرفض بشكل صارم الحكم العسكري، وشرعية المتغلب، ويدعو إلى اختيار الحاكم عن طريق الأمة.
   - يعرض أقوال كبار العلماء في رفض الحكم الوراثي أو الانقلابي، من أمثال ابن تيمية، الجويني، الماوردي، وابن خلدون.

3. خصائص الأنظمة الدكتاتورية العسكرية:
   - يُفكك الكاتب طبيعة الحكم العسكري الذي يهيمن على الدول الإسلامية، ويرى أنه:
     - لا يقوم على الشرعية.
     - يقيد الحريات ويستغل القضاء والإعلام لقمع المعارضة.
     - يصنع نخبة فاسدة، ويصادر حقوق الشعوب.
   - يعرض صورًا من التضليل الإعلامي، والاتهامات الملفقة للإسلاميين بالإرهاب والتطرف.
   - ينتقد استعمال القانون لتبرير الظلم، وتحويل النقد السياسي إلى "قذف" و"تحريض" و"خيانة للوطن".

4. مشروعية مقاومة الأنظمة الجائرة:
   - يبين فيه مشروعية مقاومة الأنظمة المستبدة من خلال:
     - النصوص الشرعية: القرآن والسنة.
     - فتاوى علماء الإسلام: مثل الإمام أحمد، ابن تيمية، ابن حزم، الشاطبي وغيرهم.
     - تجارب تاريخية غربية: يذكّر بمقاومة الشعوب الأوروبية للملوك والطغاة.
   - يؤكد أن الثورات على الظلم ليست بدعة، بل ضرورة إذا فُقِد العدل، وضُيّعت الحقوق.
   - يرفض المقولة التي تشرّع طاعة المتغلب لمجرد "الواقع"، ويعتبر أن ذلك تزييف للشرع.

أسلوب الكتاب يجمع بين العاطفة القوية، والتحليل العميق، والاستشهاد المكثف بالنصوص. يُخاطب القارئ مباشرةً، ويتبنى لهجة خطابية حماسية، تُشعر بالصدق والانفعال. يُكثر من الاستشهاد بالقرآن، السنة، أقوال السلف، التجارب السياسية الغربية، بل وحتى نصوص القانون الجزائري والدولي.

الكتاب هو مرافعة شرعية وسياسية في وجه الطغيان، وصرخة من داخل السجن ضد مصادرة حق الشعوب في اختيار حكامها، تزييف الشرع لخدمة الطغاة، وقمع الأصوات الحرة تحت شعار "الأمن" و"الوحدة الوطنية".

ويقدّم الكتاب في النهاية دعوة صريحة إلى أن الطغيان لا يُقاوَم بالسكوت ولا بالتقية، بل بالمواجهة الصريحة ولو كلفت السجن أو الموت.`
  },
  {
    id: 4,
    title: "الدولة المدنية: المفهوم والتطبيق",
    author: "أبو عبد الفتاح علي بن حاج",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1200&auto=format&fit=crop",
    downloadUrl: "#",
    year: "٢٠١٩",
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
    pages: "٢٣٠",
    description: "بحث في إشكاليات الهوية والانتماء في ظل تحديات العولمة وكيفية الحفاظ على الخصوصية الثقافية...",
    tags: ["الفكر الإسلامي", "التربية"],
    fullDescription: "بحث في إشكاليات الهوية والانتماء في ظل تحديات العولمة وكيفية الحفاظ على الخصوصية الثقافية. يتناول الكتاب تحديات العولمة الثقافية والفكرية وتأثيرها على الهوية الإسلامية، ويطرح آليات للحفاظ على الأصالة مع الانفتاح الواعي على الآخر، ويؤكد على دور التربية والتعليم في تعزيز الهوية وبناء الشخصية المتوازنة."
  }
];

const BookDetails = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const book = booksData.find((b) => b.id.toString() === bookId);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">الكتاب غير موجود</h2>
          <p className="text-gray-500 mb-6">عذراً، لم يتم العثور على الكتاب المطلوب</p>
          <Link to="/publications/books" className="btn-primary">
            العودة إلى قائمة الكتب
          </Link>
        </div>
      </div>
    );
  }

  // Related books (excluding current book)
  const relatedBooks = booksData
    .filter((b) => b.id !== book.id && b.tags.some((tag) => book.tags.includes(tag)))
    .slice(0, 3);

  // Check if the book has detailed content available
  const hasDetailedContent = book.title === "فصل الكلام في مواجهة ظلم الحكام";

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link to="/publications/books" className="inline-flex items-center text-navy hover:text-gold transition-colors">
            <ArrowRight size={16} className="ml-1" />
            العودة إلى قائمة الكتب
          </Link>
        </div>
      </div>

      {/* Book Details */}
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg mb-4">
                <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3">
                <Button className="w-full" asChild>
                  <a href={book.downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download size={16} className="ml-2" />
                    تحميل الكتاب
                  </a>
                </Button>

                {hasDetailedContent && (
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <Link to={`/publications/books/content/${encodeURIComponent(book.title)}`}>
                      <Book size={16} className="ml-2" />
                      تصفح محتوى الكتاب
                    </Link>
                  </Button>
                )}
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <CalendarDays size={20} className="mx-auto text-gold mb-1" />
                    <p className="text-sm text-gray-500">سنة النشر</p>
                    <p className="font-bold">{book.year}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <FileText size={20} className="mx-auto text-gold mb-1" />
                    <p className="text-sm text-gray-500">عدد الصفحات</p>
                    <p className="font-bold">{book.pages}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Book Info */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-navy-dark mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{book.author}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {book.tags.map((tag) => (
                <span key={tag} className="bg-navy/10 text-navy px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="prose prose-lg max-w-none">
              {book.fullDescription?.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Related Books */}
            {relatedBooks.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">كتب ذات صلة</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedBooks.map((relatedBook) => (
                    <Link to={`/publications/books/${relatedBook.id}`} key={relatedBook.id} className="card group hover:shadow-md transition-all">
                      <div className="flex items-start p-3">
                        <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded mr-3">
                          <img 
                            src={relatedBook.cover} 
                            alt={relatedBook.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-navy-dark group-hover:text-gold transition-colors text-sm line-clamp-2">
                            {relatedBook.title}
                          </h4>
                          <p className="text-xs text-gray-500">{relatedBook.year}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
