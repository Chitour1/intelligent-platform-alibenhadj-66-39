
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Book, ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface BookReaderProps {
  title: string;
  author: string;
  content: string[];
}

const BookReader = ({ title, author, content }: BookReaderProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  
  const chapters = [
    { title: "البرهان فيما يجب على الراعي والرعية نحو القرآن", page: 0 },
    { title: "من نباهة وفطانة السلف الصالح", page: 5 },
    { title: "القرآن وواجب الشعب نحوه", page: 9 },
    { title: "تذكير الخلف بسيرة السلف مع القرآن العظيم", page: 9 },
    { title: "تحذيرات نبوية شريفة", page: 15 },
    { title: "التحذير من التكسب بالقرآن الكريم", page: 15 },
    { title: "التحذير من قراءة التطريب والألحان", page: 17 },
    { title: "التحذير من حفظ الحروف وتضييع الحدود والأحكام", page: 18 },
    { title: "وجوب التمييز بين أصناف القرّاء", page: 19 },
    { title: "التحذير من الاشتغال بزخرفة المساجد وتزيين المصاحف", page: 21 },
  ];

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < content.length - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToChapter = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    setIsIndexOpen(false);
    window.scrollTo(0, 0);
  };

  const totalPages = content.length;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="text-navy hover:text-gold"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            العودة
          </Button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-navy">{title}</h1>
            <p className="text-sm text-gray-500">{author}</p>
          </div>
          
          <Button
            variant="outline"
            onClick={() => setIsIndexOpen(!isIndexOpen)}
            className="text-navy border-navy hover:bg-navy/10"
          >
            <Menu className="ml-2 h-4 w-4" />
            الفهرس
          </Button>
        </div>
      </div>
      
      {/* Book Content */}
      <div className="flex relative">
        {/* Table of Contents (Mobile Collapsible) */}
        <div className="lg:hidden w-full px-4 py-2">
          <Collapsible open={isIndexOpen} onOpenChange={setIsIndexOpen}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full mb-4 flex items-center justify-between"
              >
                <span className="flex items-center">
                  <Book className="ml-2 h-4 w-4" />
                  فهرس الكتاب
                </span>
                <ChevronLeft className={`h-4 w-4 transition-transform ${isIndexOpen ? 'rotate-90' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="border rounded-md p-4 mb-6 bg-gray-50">
                <ul className="space-y-2">
                  {chapters.map((chapter, idx) => (
                    <li key={idx}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-right ${currentPage === chapter.page ? 'text-gold font-bold' : 'text-navy'}`}
                        onClick={() => goToChapter(chapter.page)}
                      >
                        {chapter.title}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Table of Contents (Desktop) */}
        <div className="hidden lg:block lg:w-1/4 p-4 sticky top-20 self-start h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="border rounded-md p-4 bg-gray-50">
            <h3 className="text-lg font-bold mb-4 text-navy flex items-center">
              <Book className="ml-2 h-5 w-5" />
              فهرس الكتاب
            </h3>
            <ul className="space-y-2">
              {chapters.map((chapter, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-right ${currentPage === chapter.page ? 'text-gold font-bold' : 'text-navy'}`}
                    onClick={() => goToChapter(chapter.page)}
                  >
                    {chapter.title}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Content */}
        <div className="w-full lg:w-3/4 max-w-3xl mx-auto p-6">
          <div className="prose prose-lg max-w-none">
            <div 
              className="leading-relaxed text-gray-800" 
              dir="rtl"
            >
              {content[currentPage].split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-6 text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-12 pb-8">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 0}
              variant="outline"
              className="text-navy"
            >
              <ChevronRight className="ml-2 h-4 w-4" />
              الصفحة السابقة
            </Button>
            
            <span className="text-sm text-gray-500">
              صفحة {currentPage + 1} من {totalPages}
            </span>
            
            <Button
              onClick={handleNextPage}
              disabled={currentPage === content.length - 1}
              variant="outline"
              className="text-navy"
            >
              الصفحة التالية
              <ChevronLeft className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReader;
