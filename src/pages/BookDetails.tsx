import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { booksData } from "../pages/Books";
import { useState, useRef, useEffect } from "react";
import { 
  ArrowRight, BookOpen, CalendarDays, FileText, Tag, Eye, Star, 
  Volume2, VolumeX, Share2
} from 'lucide-react';
import ViewCounter from '@/components/ViewCounter';
import RatingControl from '@/components/RatingControl';
import ShareButtons from '@/components/ShareButtons';
import PdfDownloadButton from '@/components/PdfDownloadButton';
import AudioPlayer from '@/components/AudioPlayer';
import { generatePDF } from '@/utils/pdfGenerator';

const BookDetails = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const book = booksData.find((b) => b.id.toString() === bookId);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const paragraphRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  return (
    <div className="min-h-screen">
      {showAudioPlayer && (
        <AudioPlayer 
          text={book.fullDescription || book.description} 
          title={book.title}
          onClose={() => setShowAudioPlayer(false)}
        />
      )}
      
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
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg mb-4 bg-gray-100">
                <img src={book.cover} alt={book.title} className="w-full h-full object-contain" />
              </div>
              <div className="space-y-3">
                {/* Book info and stats */}
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <ViewCounter id={book.id.toString()} type="book" />
                    <RatingControl id={book.id.toString()} type="book" showCount={false} />
                  </div>
                  
                  {/* User rating */}
                  <div className="mb-2">
                    <p className="text-sm text-gray-600 mb-1">قيّم هذا الكتاب:</p>
                    <RatingControl 
                      id={book.id.toString()} 
                      type="book" 
                      iconSize={20} 
                      className="justify-center"
                    />
                  </div>
                  
                  {/* Audio controls */}
                  <div className="flex flex-col space-y-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={() => setShowAudioPlayer(true)}
                    >
                      <Volume2 size={16} className="ml-2" />
                      قراءة المحتوى صوتياً
                    </Button>
                  </div>
                </div>
                
                <PdfDownloadButton
                  className="w-full"
                  onGenerate={() => generatePDF({
                    title: book.title,
                    content: book.fullDescription || book.description,
                    author: book.author,
                    imageUrl: book.cover,
                    type: 'book'
                  })}
                  filename={`كتاب-${book.title}`}
                />
                
                <Button variant="outline" className="w-full" asChild>
                  <a href={book.downloadUrl} target="_blank" rel="noopener noreferrer">
                    <FileText size={16} className="ml-2" />
                    تحميل الكتاب الأصلي
                  </a>
                </Button>
                
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
                
                {/* Social media sharing */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2 text-center">مشاركة الكتاب:</p>
                  <ShareButtons
                    url={window.location.href}
                    title={book.title}
                    description={book.description}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Book Info */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-navy-dark mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{book.author}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {book.tags.map((tag) => (
                <span key={tag} className="bg-navy/10 text-navy px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="prose prose-lg max-w-none">
              {book.fullDescription ? 
                book.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p 
                    key={index} 
                    ref={el => paragraphRefs.current[index] = el}
                    className="mb-4 text-gray-700 leading-relaxed md:leading-loose"
                    style={{ lineHeight: '2.2' }}
                  >
                    {paragraph}
                  </p>
                ))
                :
                <p 
                  className="mb-4 text-gray-700 leading-relaxed md:leading-loose"
                  style={{ lineHeight: '2.2' }}
                  ref={el => paragraphRefs.current[0] = el}
                >
                  {book.description}
                </p>
              }
            </div>
            
            {/* Related Books */}
            {relatedBooks.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">كتب ذات صلة</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedBooks.map((relatedBook) => (
                    <Link to={`/publications/books/${relatedBook.id}`} key={relatedBook.id} className="card group hover:shadow-md transition-all">
                      <div className="flex items-start p-3">
                        <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded mr-3 bg-gray-100">
                          <img 
                            src={relatedBook.cover} 
                            alt={relatedBook.title} 
                            className="w-full h-full object-contain"
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
