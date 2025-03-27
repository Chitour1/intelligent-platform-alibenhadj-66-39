
import { useParams, Link } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays, FileText, Download, Tag, Star, Eye, Volume2, VolumeX, Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { booksData } from "../pages/Books";
import { useState, useRef, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const BookDetails = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const book = booksData.find((b) => b.id.toString() === bookId);
  const [viewCount, setViewCount] = useState(0);
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedParagraphIndex, setHighlightedParagraphIndex] = useState(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const paragraphRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  // Simulate fetching view count and rating
  useEffect(() => {
    if (book) {
      // In a real app, you would fetch this data from a backend
      const randomViews = Math.floor(Math.random() * 1000) + 500;
      const randomRating = (Math.random() * 2) + 3; // Random rating between 3 and 5
      setViewCount(randomViews);
      setRating(randomRating);
    }
  }, [book]);

  // Text-to-speech functionality
  const speakText = (text: string, index: number) => {
    // In a production app, you would use a proper TTS API like ElevenLabs
    if ('speechSynthesis' in window) {
      if (audioRef.current) {
        // Stop previous audio
        window.speechSynthesis.cancel();
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar';
      
      // Select a voice with Arabic support if available
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(voice => voice.lang.includes('ar'));
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }
      
      utterance.onstart = () => {
        setIsPlaying(true);
        setHighlightedParagraphIndex(index);
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
        setHighlightedParagraphIndex(-1);
      };
      
      window.speechSynthesis.speak(utterance);
      audioRef.current = new Audio(); // Just to keep track of the state
    } else {
      toast({
        title: "غير مدعوم",
        description: "متصفحك لا يدعم خاصية تحويل النص إلى صوت",
        variant: "destructive",
      });
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setHighlightedParagraphIndex(-1);
    }
  };

  const speakTitle = () => {
    if (book) {
      speakText(book.title, -1);
    }
  };

  const speakContent = () => {
    if (book && book.fullDescription) {
      const fullText = book.fullDescription;
      speakText(fullText, 0);
    }
  };

  const handleRating = (newRating: number) => {
    setUserRating(newRating);
    // In a real app, you would send this rating to a backend
    toast({
      title: "شكراً لتقييمك",
      description: `لقد قمت بتقييم الكتاب بـ ${newRating} نجوم`,
    });
  };

  const downloadAsPDF = () => {
    // In a real app, you would generate a PDF or fetch it from the server
    toast({
      title: "جاري التحميل",
      description: "سيتم تحميل الكتاب بصيغة PDF قريباً",
    });
    // Simulate download delay
    setTimeout(() => {
      if (book && book.downloadUrl) {
        window.open(book.downloadUrl, '_blank');
      }
    }, 1500);
  };

  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const title = book ? book.title : "كتاب مميز";
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url);
        toast({
          title: "تم نسخ الرابط",
          description: "تم نسخ رابط الكتاب إلى الحافظة",
        });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

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
                    <div className="flex items-center text-gray-600">
                      <Eye size={16} className="ml-1" />
                      <span className="text-sm">{viewCount} مشاهدة</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <span className="text-sm ml-1">{rating.toFixed(1)}</span>
                      <Star size={16} className="text-gold" />
                    </div>
                  </div>
                  
                  {/* User rating */}
                  <div className="mb-2">
                    <p className="text-sm text-gray-600 mb-1">قيّم هذا الكتاب:</p>
                    <div className="flex justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className="mx-1 focus:outline-none"
                          onClick={() => handleRating(star)}
                        >
                          <Star
                            size={20}
                            className={star <= userRating ? "fill-gold text-gold" : "text-gray-300"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Audio controls */}
                  <div className="flex flex-col space-y-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={isPlaying ? stopSpeaking : speakTitle}
                    >
                      {isPlaying && highlightedParagraphIndex === -1 ? 
                        <VolumeX size={16} className="ml-2" /> : 
                        <Volume2 size={16} className="ml-2" />
                      }
                      {isPlaying && highlightedParagraphIndex === -1 ? "إيقاف قراءة العنوان" : "قراءة العنوان"}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={isPlaying && highlightedParagraphIndex !== -1 ? stopSpeaking : speakContent}
                    >
                      {isPlaying && highlightedParagraphIndex !== -1 ? 
                        <VolumeX size={16} className="ml-2" /> : 
                        <Volume2 size={16} className="ml-2" />
                      }
                      {isPlaying && highlightedParagraphIndex !== -1 ? "إيقاف قراءة المحتوى" : "قراءة المحتوى"}
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full" asChild>
                  <a href={book.downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download size={16} className="ml-2" />
                    تحميل الكتاب
                  </a>
                </Button>
                
                <Button variant="outline" className="w-full" onClick={downloadAsPDF}>
                  <FileText size={16} className="ml-2" />
                  تحميل بصيغة PDF
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
                  <div className="flex justify-center space-x-3 space-x-reverse">
                    <button 
                      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                      onClick={() => shareOnSocial("facebook")}
                    >
                      <Facebook size={18} />
                    </button>
                    <button 
                      className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                      onClick={() => shareOnSocial("twitter")}
                    >
                      <Twitter size={18} />
                    </button>
                    <button 
                      className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                      onClick={() => shareOnSocial("linkedin")}
                    >
                      <Linkedin size={18} />
                    </button>
                    <button 
                      className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                      onClick={() => shareOnSocial("copy")}
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Book Info */}
          <div className="md:col-span-2">
            <h1 
              className={`text-3xl font-bold text-navy-dark mb-2 ${highlightedParagraphIndex === -1 && isPlaying ? 'bg-gold/20 px-2 py-1 rounded' : ''}`}
            >
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
                book.fullDescription.split('\n\n').map((paragraph, index) => {
                  const isHighlighted = index === highlightedParagraphIndex;
                  return (
                    <p 
                      key={index} 
                      ref={el => paragraphRefs.current[index] = el}
                      className={`mb-4 text-gray-700 leading-relaxed md:leading-loose ${isHighlighted ? 'bg-gold/20 px-2 py-1 rounded' : ''}`}
                      style={{ lineHeight: '2.2' }}
                    >
                      {paragraph}
                    </p>
                  );
                })
                :
                <p 
                  className={`mb-4 text-gray-700 leading-relaxed md:leading-loose ${highlightedParagraphIndex === 0 && isPlaying ? 'bg-gold/20 px-2 py-1 rounded' : ''}`} 
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
