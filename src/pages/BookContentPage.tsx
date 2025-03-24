
import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookDescription from "@/components/BookDescription";
import { bookContentData } from "@/data/bookContent";

const BookContentPage = () => {
  const { bookTitle } = useParams<{ bookTitle: string }>();
  
  // Decode the URL parameter
  const decodedTitle = bookTitle ? decodeURIComponent(bookTitle) : "";
  const bookContent = bookContentData[decodedTitle as keyof typeof bookContentData];

  if (!bookContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">محتوى الكتاب غير موجود</h2>
          <p className="text-gray-500 mb-6">عذراً، لم يتم العثور على محتوى الكتاب المطلوب</p>
          <Link to="/publications/books" className="btn-primary">
            العودة إلى قائمة الكتب
          </Link>
        </div>
      </div>
    );
  }

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

      {/* Book Content */}
      <div className="section-container">
        <div className="bg-white p-6 rounded-lg shadow">
          <BookDescription content={bookContent} />
          
          <div className="mt-8 text-center">
            <Button asChild className="btn-primary">
              <a 
                href="/publications/books/3" 
                className="inline-flex items-center"
              >
                الذهاب إلى صفحة الكتاب
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookContentPage;
