import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Download, ArrowLeft } from 'lucide-react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import MetaTags from '../components/MetaTags';
import { booksData } from './Books';
import { useEffect } from 'react';

const BookDetails = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const book = booksData.find(b => b.id === Number(bookId));
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [bookId]);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">الكتاب غير موجود</h1>
        <p className="mb-8">لم يتم العثور على الكتاب المطلوب</p>
        <Link to="/publications/books">
          <Button variant="default">العودة إلى قائمة الكتب</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <MetaTags title={book.title} description={book.description} imageUrl={book.cover} />
      <div className="mb-8">
        <Link to="/publications/books" className="inline-flex items-center text-navy hover:text-navy-dark">
          <ArrowLeft size={16} className="mr-2" />
          العودة إلى قائمة الكتب
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:order-2">
          <AspectRatio ratio={3 / 4} className="w-full bg-gray-100 rounded-md overflow-hidden">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-contain"
            />
          </AspectRatio>
        </div>
        <div className="md:order-1">
          <h1 className="text-3xl font-bold text-navy-dark mb-4">{book.title}</h1>
          <p className="text-gray-600 mb-6">{book.fullDescription || book.description}</p>

          <div className="flex items-center text-gray-500 text-sm mb-2">
            <Calendar size={14} className="ml-1" />
            <span>تاريخ النشر: {book.publicationDate || book.year}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <BookOpen size={14} className="ml-1" />
            <span>عدد الصفحات: {book.pages}</span>
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <Button asChild>
              <a href={book.downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                تحميل الكتاب
                <Download size={16} className="mr-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
