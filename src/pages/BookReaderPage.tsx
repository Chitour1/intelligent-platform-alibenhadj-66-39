
import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BookReader from "@/components/BookReader";

// Using the same booksData as in BookDetails.tsx for consistency
import { booksData } from "@/pages/Books";

const BookReaderPage = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const book = booksData.find((b) => b.id.toString() === bookId);

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">الكتاب غير موجود</h2>
          <Link to="/publications/books" className="btn-primary">
            العودة إلى قائمة الكتب
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Link to={`/publications/books/${bookId}`} className="inline-flex items-center text-navy hover:text-gold transition-colors">
            <ArrowRight size={16} className="ml-1" />
            العودة إلى صفحة الكتاب
          </Link>
          <h1 className="text-lg font-bold text-navy-dark">{book.title}</h1>
        </div>
      </div>

      {/* Reader Container */}
      <div className="flex-grow p-4">
        <div className="max-w-7xl mx-auto h-full">
          <BookReader bookId={parseInt(bookId as string)} />
        </div>
      </div>
    </div>
  );
};

export default BookReaderPage;
