import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import NewsCard from '../components/NewsCard';
import ArticleCard from '../components/ArticleCard';
import BookCard from '../components/BookCard';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Video, Mic, Calendar, FileText, Book } from 'lucide-react';
import { recentMediaItems } from '../utils/youtubeUtils';
import { statementsData } from '../utils/statementsData';
import { getRandomQuote } from '../utils/quotesData';

// Import the books data from the Books page
import { booksData } from '../pages/Books';

const Index = () => {
  const [isVisible, setIsVisible] = useState({
    news: false,
    articles: false,
    books: false,
    media: false,
    interviews: false
  });
  
  // حالة لتخزين الاقتباس المعروض
  const [currentQuote, setCurrentQuote] = useState({ id: 0, text: "" });

  useEffect(() => {
    // تحديد اقتباس عشوائي عند تحميل الصفحة
    setCurrentQuote(getRandomQuote());
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, { threshold: 0.2 });

    const sections = document.querySelectorAll('.observe-section');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Sort books by publication date (most recent first) then take the latest 4
  const books = [...booksData]
    .sort((a, b) => {
      // If publication date exists, sort by it, otherwise use ID as fallback
      if (a.publicationDate && b.publicationDate) {
        // Simple string comparison for Arabic dates (since they're formatted consistently)
        return a.publicationDate > b.publicationDate ? -1 : 1;
      }
      // Sort by ID (most recent first) as fallback
      return b.id - a.id;
    })
    .slice(0, 4);
  
  const mediaItems = recentMediaItems.slice(0, 4);
  
  // Helper function to get the correct video link
  const getVideoLink = (item) => {
    if (item.type === 'video' && item.videoId) {
      return `/media/friday-meetings-video?videoId=${item.videoId}`;
    } else if (item.type === 'audio') {
      return `/media/friday-meetings-audio`;
    }
    return "#";
  };
  
  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Main Feature Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-navy p-6 rounded-xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-dark opacity-90 z-0"></div>
            <div className="relative z-10">
              <span className="inline-block bg-gold text-navy px-3 py-1 rounded-md text-sm font-semibold mb-4">أحدث كلمات الشيخ</span>
              <h2 className="text-3xl font-bold mb-4 leading-relaxed">{statementsData[0].title}</h2>
              <p className="text-gray-200 mb-6">
                {statementsData[0].excerpt}
              </p>
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <div className="flex items-center text-gold">
                  <Calendar size={16} className="ml-1" />
                  <span>{statementsData[0].date}</span>
                </div>
              </div>
              <Link to={`/statements/${statementsData[0].id}`} className="btn-primary inline-flex items-center">
                قراءة الخبر كاملا
                <ArrowLeft size={16} className="mr-2" />
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 gap-4">
            <div className="bg-gradient-to-r from-gold/10 to-gold/5 p-6 rounded-xl border border-gold/20">
              <h3 className="text-xl font-bold mb-4 text-navy">أحدث الإصدارات</h3>
              <div className="space-y-4">
              </div>
              <Link to="/publications/books" className="mt-4 inline-flex items-center text-sm font-medium text-gold hover:text-gold-dark">
                عرض جميع المؤلفات
                <ArrowLeft size={14} className="mr-1" />
              </Link>
            </div>
            
            <div className="bg-gradient-to-r from-navy/10 to-navy/5 p-6 rounded-xl border border-navy/20">
              <h3 className="text-xl font-bold mb-4 text-navy">الظهور الإعلامي</h3>
              <div className="space-y-4">
              </div>
              <Link to="/publications/tv-appearances" className="mt-4 inline-flex items-center text-sm font-medium text-navy hover:text-navy-light">
                جميع المداخلات التلفزيونية
                <ArrowLeft size={14} className="mr-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Books Section */}
      <section id="books" className={`section-container observe-section transition-all duration-1000 ${isVisible.books ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-8 flex justify-between items-center">
          <h2 className="section-title">كتب الشيخ</h2>
          <Link to="/publications/books" className="text-gold hover:text-gold-dark inline-flex items-center">
            جميع الكتب
            <ArrowLeft size={16} className="mr-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map(book => (
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
        </div>
      </section>
      
      {/* Media Section */}
      <section id="media" className={`section-container observe-section transition-all duration-1000 ${isVisible.media ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-8 flex justify-between items-center">
          <h2 className="section-title">المكتبة الإعلامية</h2>
          <Link to="/media" className="text-gold hover:text-gold-dark inline-flex items-center">
            عرض المكتبة الكاملة
            <ArrowLeft size={16} className="mr-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaItems.map(item => (
            <Link 
              key={item.id} 
              to={getVideoLink(item)}
              className="card group"
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={item.imageUrl || `https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-t from-navy/80 to-transparent`}>
                  {item.type === 'video' ? (
                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                      <Video size={20} className="text-navy" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                      <Mic size={20} className="text-navy" />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 p-2">
                  <span className={`text-xs px-2 py-1 rounded ${item.type === 'video' ? 'bg-navy text-white' : 'bg-gold text-navy'}`}>
                    {item.type === 'video' ? 'فيديو' : 'صوتي'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-navy-dark font-bold line-clamp-2 mb-2 group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={14} className="ml-1" />
                  {item.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Quote Section */}
      <section className="py-20 bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern opacity-30"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="text-6xl font-arabic text-gold mb-6">❝</div>
          <blockquote className="text-2xl md:text-3xl font-arabic mb-6">
            {currentQuote.text}
          </blockquote>
          <p className="text-gold text-xl">- الشيخ علي بن حاج</p>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="section-container text-center">
        <h2 className="text-3xl font-bold mb-4">تابع آخر أخبار ومستجدات الشيخ علي بن حاج</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          اشترك في نشرتنا البريدية للحصول على آخر الأخبار والتحديثات والمقالات الحصرية مباشرة إلى بريدك الإلكتروني.
        </p>
        <div className="max-w-md mx-auto flex">
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            className="w-full px-4 py-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <button className="btn-primary rounded-l-md rounded-r-none border-l-0">
            اشتراك
          </button>
        </div>
      </section>
    </div>
  );
};

export default Index;
