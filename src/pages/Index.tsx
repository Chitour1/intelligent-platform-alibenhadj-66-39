import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import NewsCard from '../components/NewsCard';
import ArticleCard from '../components/ArticleCard';
import BookCard from '../components/BookCard';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Video, Mic, Calendar, FileText, Book } from 'lucide-react';
import { recentMediaItems } from '../utils/youtubeUtils';

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

  useEffect(() => {
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

  // Sample data
  const newsItems = [
    {
      id: 1,
      title: "الشيخ علي بن حاج يدعو إلى الوحدة الوطنية في خطاب جديد",
      date: "١٥ مايو ٢٠٢٣",
      excerpt: "في خطاب ألقاه الشيخ علي بن حاج اليوم، دعا فيه إلى تعزيز الوحدة الوطنية ونبذ الخلافات السياسية من أجل مصلحة الوطن...",
      imageUrl: "https://images.unsplash.com/photo-1523379882969-02891ec37cbe?q=80&w=1800&auto=format&fit=crop",
      category: "بيانات"
    },
    {
      id: 2,
      title: "مؤتمر صحفي حول آخر التطورات السياسية في الجزائر",
      date: "١٠ مايو ٢٠٢٣",
      excerpt: "عقد الشيخ علي بن حاج مؤتمراً صحفياً تناول فيه آخر التطورات السياسية في الجزائر وموقفه من القضايا الراهنة...",
      imageUrl: "https://images.unsplash.com/photo-1552664688-cf412ec27db2?q=80&w=1800&auto=format&fit=crop",
      category: "أخبار"
    },
    {
      id: 3,
      title: "زيارة الشيخ علي بن حاج لمدينة وهران ولقاءه بالمواطنين",
      date: "٥ مايو ٢٠٢٣",
      excerpt: "قام الشيخ علي بن حاج بزيارة إلى مدينة وهران التقى خلالها بالمواطنين واستمع إلى مشاكلهم وهمومهم...",
      imageUrl: "https://images.unsplash.com/photo-1616587894728-5b4e8719408d?q=80&w=1800&auto=format&fit=crop",
      category: "زيارات"
    }
  ];
  
  const articles = [
    {
      id: 1,
      title: "الصحوة الإسلامية والتحديات المعاصرة",
      date: "١٢ مايو ٢٠٢٣",
      readTime: "١٠ دقائق",
      excerpt: "يتناول المقال تحليلاً مفصلاً للصحوة الإسلامية والتحديات التي تواجهها في العالم المعاصر، ويقترح الحلول الممكنة...",
    },
    {
      id: 2,
      title: "دور الشباب في النهضة والإصلاح",
      date: "٨ مايو ٢٠٢٣",
      readTime: "٧ دقائق",
      excerpt: "يناقش المقال الدور المحوري للشباب في عملية النهضة والإصلاح، ويحث على أهمية تأهيلهم وتمكينهم للمساهمة في بناء المستقبل...",
    },
    {
      id: 3,
      title: "الهوية الإسلامية في ظل العولمة",
      date: "٢٢ مايو ٢٠٢٣",
      readTime: "١٢ دقيقة",
      excerpt: "يستعرض المقال التحديات التي تواجه الهوية الإسلامية في ظل تيارا�� العولمة، وكيفية الحفاظ على الأصالة مع الانفتاح على الآخر...",
    },
    {
      id: 4,
      title: "قراءة في الأحداث السياسية الراهنة",
      date: "٢٩ أبريل ٢٠٢٣",
      readTime: "٨ دقائق",
      excerpt: "يقدم المقال تحليلاً معمقاً للأحداث السياسية الجارية في المنطقة، ويستشرف الآفاق المستقبلية في ضوء المتغيرات الحالية...",
    }
  ];
  
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
              <h2 className="text-3xl font-bold mb-4">بيان الشيخ علي بن حاج حول الأحداث الأخيرة في المنطقة</h2>
              <p className="text-gray-200 mb-6">
                صرح الشيخ علي بن حاج في بيان له اليوم حول التطورات الأخيرة في المنطقة، مؤكداً على ضرورة التماسك والوحدة في مواجهة التحديات الراهنة...
              </p>
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <div className="flex items-center text-gold">
                  <Calendar size={16} className="ml-1" />
                  <span>١٧ مايو ٢٠٢٣</span>
                </div>
              </div>
              <Link to="/publications/statements/1" className="btn-primary inline-flex items-center">
                قراءة الخبر كاملا
                <ArrowLeft size={16} className="mr-2" />
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 gap-4">
            <div className="bg-gradient-to-r from-gold/10 to-gold/5 p-6 rounded-xl border border-gold/20">
              <h3 className="text-xl font-bold mb-4 text-navy">أحدث الإصدارات</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="ml-3 rounded-lg overflow-hidden flex-shrink-0">
                    <BookOpen size={24} className="text-gold bg-gold/10 p-1 rounded" />
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-dark">التحديات السياسية المعاصرة</h4>
                    <p className="text-sm text-gray-600">كتاب جديد يناقش التحديات السياسية في العالم العربي</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="ml-3 rounded-lg overflow-hidden flex-shrink-0">
                    <FileText size={24} className="text-gold bg-gold/10 p-1 rounded" />
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-dark">المشروع الإصلاحي الشامل</h4>
                    <p className="text-sm text-gray-600">دراسة تحليلية حول سبل الإصلاح في المجتمع</p>
                  </div>
                </div>
              </div>
              <Link to="/publications/books" className="mt-4 inline-flex items-center text-sm font-medium text-gold hover:text-gold-dark">
                عرض جميع المؤلفات
                <ArrowLeft size={14} className="mr-1" />
              </Link>
            </div>
            
            <div className="bg-gradient-to-r from-navy/10 to-navy/5 p-6 rounded-xl border border-navy/20">
              <h3 className="text-xl font-bold mb-4 text-navy">الظهور الإعلامي</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="ml-3 rounded-lg overflow-hidden flex-shrink-0">
                    <Video size={24} className="text-navy bg-navy/10 p-1 rounded" />
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-dark">لقاء على قناة الجزيرة</h4>
                    <p className="text-sm text-gray-600">حوار خاص حول آخر المستجدات</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="ml-3 rounded-lg overflow-hidden flex-shrink-0">
                    <Mic size={24} className="text-navy bg-navy/10 p-1 rounded" />
                  </div>
                  <div>
                    <h4 className="font-medium text-navy-dark">مقابلة إذاعية</h4>
                    <p className="text-sm text-gray-600">حول القضايا الراهنة والتحديات المستقبلية</p>
                  </div>
                </div>
              </div>
              <Link to="/publications/tv-appearances" className="mt-4 inline-flex items-center text-sm font-medium text-navy hover:text-navy-light">
                جميع المداخلات التلفزيونية
                <ArrowLeft size={14} className="mr-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* News Section */}
      <section id="news" className={`section-container observe-section transition-all duration-1000 ${isVisible.news ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-8 flex justify-between items-center">
          <h2 className="section-title">أحدث الأخبار</h2>
          <Link to="/news" className="text-gold hover:text-gold-dark inline-flex items-center">
            جميع الأخبار
            <ArrowLeft size={16} className="mr-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map(item => (
            <NewsCard key={item.id} {...item} />
          ))}
        </div>
      </section>
      
      {/* Articles Section */}
      <section id="articles" className={`section-container observe-section transition-all duration-1000 ${isVisible.articles ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-8 flex justify-between items-center">
          <h2 className="section-title">مقالات الشيخ</h2>
          <Link to="/articles" className="text-gold hover:text-gold-dark inline-flex items-center">
            جميع المقالات
            <ArrowLeft size={16} className="mr-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map(article => (
            <ArticleCard key={article.id} {...article} />
          ))}
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
            <div key={item.id} className="card group">
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
            </div>
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
            إن المشروع الإصلاحي الحقيقي يبدأ من الإنسان، ببناء وعيه وتحصين هويته وترسيخ قيمه الأصيلة، ثم ينطلق نحو الإصلاح المجتمعي الشامل.
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
