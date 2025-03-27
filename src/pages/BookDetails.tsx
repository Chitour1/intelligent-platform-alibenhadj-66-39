
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, FileText, Download } from "lucide-react";
import MetaTags from "../components/MetaTags";
import { booksData } from "./Books";
import { BookType } from "@/types/books";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<BookType | null>(null);
  
  useEffect(() => {
    if (bookId) {
      const foundBook = booksData.find(b => b.id === parseInt(bookId));
      setBook(foundBook || null);
    }
  }, [bookId]);
  
  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">لم يتم العثور على الكتاب</h1>
        <Link to="/publications/books" className="text-gold hover:underline">
          العودة إلى قائمة الكتب
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <MetaTags 
        title={`${book.title} | منبر الشيخ علي بن حاج`}
        description={book.description}
      />
      
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/publications/books" className="text-gray-600 hover:text-gold inline-flex items-center">
          <ArrowLeft size={16} className="ml-1" />
          العودة إلى قائمة الكتب
        </Link>
      </div>
      
      {/* Book Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="md:col-span-1">
          <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={book.cover} 
              alt={book.title} 
              className="w-full h-auto object-contain"
            />
          </div>
          
          {/* Download Button */}
          <div className="mt-6">
            <a 
              href={book.downloadUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary w-full flex items-center justify-center"
            >
              <Download size={18} className="ml-2" />
              تحميل الكتاب
            </a>
          </div>
        </div>
        
        {/* Book Info */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
            <div className="flex items-center">
              <BookOpen size={18} className="ml-1 text-gold" />
              <span>{book.pages} صفحة</span>
            </div>
            <div className="flex items-center">
              <Calendar size={18} className="ml-1 text-gold" />
              <span>{book.year}</span>
            </div>
            {book.publicationDate && (
              <div className="text-gold">
                تاريخ النشر: {book.publicationDate}
              </div>
            )}
          </div>
          
          {/* Tags */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {book.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-navy/10 text-navy px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 flex items-center">
              <FileText size={20} className="ml-2 text-gold" />
              نبذة عن الكتاب
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {book.fullDescription || book.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
