
import { useState } from "react";
import { ChevronLeft, ChevronRight, List, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface BookReaderProps {
  bookId: number;
  initialPage?: number;
}

// This would typically come from an API or database
const getBookContent = (bookId: number, page: number) => {
  // For demonstration purposes, we're hardcoding content from the requested book
  const pages = [
    { id: 1, content: "بسم الله الرحمن الرحيم\n\nالحمد لله رب العالمين، والصلاة والسلام على أشرف المرسلين، سيدنا محمد وعلى آله وصحبه أجمعين.\n\nأما بعد،\n\nفإن كتاب الله عز وجل هو المصدر الأول للتشريع الإسلامي، وهو الذي يجب أن يكون المرجع الأساسي لكل مسلم في شؤون حياته كلها، وعلى رأسها علاقته بالحاكم والمحكوم." },
    { id: 2, content: "إن العلاقة بين الراعي والرعية في الإسلام محكومة بكتاب الله عز وجل، فهو الذي يحدد واجبات كل منهما تجاه الآخر، ويبين الحقوق والواجبات التي تترتب على هذه العلاقة.\n\nوقد جاء هذا الكتاب ليبين بالتفصيل ما يجب على الراعي والرعية نحو القرآن الكريم، وكيف يكون التعامل الصحيح مع كتاب الله عز وجل." },
    { id: 3, content: "الفصل الأول: واجبات الراعي نحو القرآن الكريم\n\nإن من أول واجبات الحاكم نحو القرآن الكريم هو التمسك به والعمل بأحكامه، وتطبيق شريعته في كل مجالات الحياة، وعدم مخالفته في أي أمر من الأمور.\n\nقال تعالى: {وَمَنْ لَمْ يَحْكُمْ بِمَا أَنْزَلَ اللَّهُ فَأُولَئِكَ هُمُ الْكَافِرُونَ} [المائدة: 44]." },
    { id: 4, content: "ومن واجبات الحاكم أيضاً نشر علوم القرآن بين الناس، وتشجيعهم على حفظه وتدبره والعمل به، وتوفير كل ما يلزم لتحقيق ذلك من مدارس ومعاهد ومساجد ووسائل إعلام.\n\nكما يجب عليه أن يكون قدوة للناس في الالتزام بأحكام القرآن الكريم، والتمسك بأخلاقه وآدابه، ليكون مثلاً يُحتذى به في المجتمع." },
    { id: 5, content: "ومن أهم واجبات الحاكم نحو القرآن الكريم أن يحكم بما أنزل الله، وأن يقيم شرع الله في الأرض، وأن يطبق أحكام القرآن في كل مجالات الحياة، السياسية والاقتصادية والاجتماعية وغيرها.\n\nقال تعالى: {وَأَنِ احْكُمْ بَيْنَهُمْ بِمَا أَنْزَلَ اللَّهُ وَلَا تَتَّبِعْ أَهْوَاءَهُمْ وَاحْذَرْهُمْ أَنْ يَفْتِنُوكَ عَنْ بَعْضِ مَا أَنْزَلَ اللَّهُ إِلَيْكَ} [المائدة: 49]." },
  ];
  
  // Page indexing starts from 1 in the UI but arrays start from 0
  return pages[page - 1] || { id: page, content: "هذه الصفحة غير متوفرة" };
};

// Book chapters index
const bookIndex = [
  { id: 1, title: "المقدمة", page: 1 },
  { id: 2, title: "الفصل الأول: واجبات الراعي نحو القرآن", page: 3 },
  { id: 3, title: "الفصل الثاني: واجبات الرعية نحو القرآن", page: 10 },
  { id: 4, title: "الفصل الثالث: العلاقة بين الحاكم والمحكوم في ضوء القرآن", page: 15 },
  { id: 5, title: "الفصل الرابع: فساد العلاقة بين الراعي والرعية وأثره على الأمة", page: 20 },
  { id: 6, title: "الفصل الخامس: كيفية إصلاح العلاقة بين الراعي والرعية", page: 25 },
  { id: 7, title: "الخاتمة", page: 30 },
];

const BookReader = ({ bookId, initialPage = 1 }: BookReaderProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isIndexOpen, setIsIndexOpen] = useState(false);
  const totalPages = 30; // For demonstration purposes
  
  const pageContent = getBookContent(bookId, currentPage);
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);
  
  const generatePaginationItems = () => {
    const items = [];
    const displayPages = 5; // Number of page links to show
    
    let startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
    let endPage = Math.min(totalPages, startPage + displayPages - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < displayPages) {
      startPage = Math.max(1, endPage - displayPages + 1);
    }
    
    // First page
    if (startPage > 1) {
      items.push(
        <PaginationItem key="first">
          <PaginationLink onClick={() => goToPage(1)}>١</PaginationLink>
        </PaginationItem>
      );
      
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    
    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      const arabicNumber = i.toLocaleString('ar-EG');
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={i === currentPage} 
            onClick={() => goToPage(i)}
          >
            {arabicNumber}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      items.push(
        <PaginationItem key="last">
          <PaginationLink onClick={() => goToPage(totalPages)}>
            {totalPages.toLocaleString('ar-EG')}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };
  
  return (
    <div className="border rounded-lg shadow-sm flex flex-col h-full">
      {/* Reader Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsIndexOpen(!isIndexOpen)}
        >
          <List size={16} className="ml-2" />
          الفهرس
        </Button>
        <div className="text-sm text-gray-500">
          الصفحة {currentPage.toLocaleString('ar-EG')} من {totalPages.toLocaleString('ar-EG')}
        </div>
      </div>
      
      {/* Reader Content */}
      <div className="flex flex-1 min-h-0">
        {/* Index Sidebar */}
        <Collapsible
          open={isIndexOpen}
          onOpenChange={setIsIndexOpen}
          className={`border-l transition-all duration-300 ${isIndexOpen ? 'w-64' : 'w-0'}`}
        >
          <CollapsibleContent className="h-full overflow-y-auto p-4">
            <h3 className="font-bold text-lg mb-4">فهرس الكتاب</h3>
            <ul className="space-y-3">
              {bookIndex.map((chapter) => (
                <li key={chapter.id}>
                  <button
                    onClick={() => {
                      goToPage(chapter.page);
                      if (window.innerWidth < 768) {
                        setIsIndexOpen(false);
                      }
                    }}
                    className={`text-right w-full px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors ${
                      currentPage === chapter.page ? 'bg-navy/10 text-navy font-medium' : ''
                    }`}
                  >
                    {chapter.title}
                  </button>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {pageContent ? (
            <div className="prose prose-lg max-w-none">
              {pageContent.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-800 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <BookOpen size={64} className="text-gray-300 mb-4" />
              <p className="text-gray-500">محتوى الصفحة غير متوفر</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Reader Footer */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goToPreviousPage}
            disabled={currentPage <= 1}
          >
            <ChevronRight size={16} className="ml-1" />
            السابق
          </Button>
          
          <Pagination>
            <PaginationContent>
              {generatePaginationItems()}
            </PaginationContent>
          </Pagination>
          
          <Button
            variant="outline"
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
          >
            التالي
            <ChevronLeft size={16} className="mr-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookReader;
