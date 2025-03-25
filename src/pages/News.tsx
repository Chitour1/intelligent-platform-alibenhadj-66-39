
import { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';

const News = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
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
    },
    {
      id: 4,
      title: "لقاء خاص مع الشيخ علي بن حاج على قناة الجزيرة",
      date: "٢ مايو ٢٠٢٣",
      excerpt: "أجرت قناة الجزيرة لقاءً خاصاً مع الشيخ علي بن حاج ناقش خلاله آخر المستجدات السياسية والاجتماعية في الجزائر والمنطقة...",
      imageUrl: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1800&auto=format&fit=crop",
      category: "مقابلات"
    },
    {
      id: 5,
      title: "الشيخ علي بن حاج يشارك في ندوة حول مستقبل الإصلاح السياسي",
      date: "٢٧ أبريل ٢٠٢٣",
      excerpt: "شارك الشيخ علي بن حاج في ندوة فكرية حول مستقبل الإصلاح السياسي في العالم العربي وقدم رؤيته للتحديات الراهنة وآفاق المستقبل...",
      imageUrl: "https://images.unsplash.com/photo-1577722422778-3671a437826f?q=80&w=1800&auto=format&fit=crop",
      category: "نشاطات"
    },
    {
      id: 6,
      title: "الشيخ علي بن حاج يستقبل وفداً من علماء المسلمين",
      date: "٢٠ أبريل ٢٠٢٣",
      excerpt: "استقبل الشيخ علي بن حاج وفداً من علماء المسلمين وناقش معهم سبل تعزيز التعاون والتنسيق في مواجهة التحديات المشتركة...",
      imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1800&auto=format&fit=crop",
      category: "لقاءات"
    },
    {
      id: 7,
      title: "بيان الشيخ علي بن حاج حول الأحداث الأخيرة في فلسطين",
      date: "١٥ أبريل ٢٠٢٣",
      excerpt: "أصدر الشيخ علي بن حاج بياناً حول الأحداث الأخيرة في فلسطين، أكد فيه على دعمه للقضية الفلسطينية وحق الشعب الفلسطيني في الحرية...",
      imageUrl: "https://images.unsplash.com/photo-1600679472829-3044539ce8ed?q=80&w=1800&auto=format&fit=crop",
      category: "بيانات"
    },
    {
      id: 8,
      title: "الشيخ علي بن حاج يزور جامعة الجزائر ويلتقي بالطلاب",
      date: "١٠ أبريل ٢٠٢٣",
      excerpt: "قام الشيخ علي بن حاج بزيارة إلى جامعة الجزائر والتقى خلالها بالطلاب وألقى محاضرة حول دور الشباب في النهضة والإصلاح...",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1800&auto=format&fit=crop",
      category: "زيارات"
    }
  ];

  const categories = ['all', 'بيانات', 'أخبار', 'زيارات', 'مقابلات', 'نشاطات', 'لقاءات'];
  
  const filteredNews = activeFilter === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">أخبار الشيخ علي بن حاج</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            تابع آخر أخبار ونشاطات الشيخ علي بن حاج والبيانات والمواقف حول القضايا المختلفة
          </p>
        </div>
      </div>
      
      <div className="section-container">
        <div className="mb-10 flex flex-wrap justify-center items-center gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                activeFilter === category 
                  ? 'bg-gold text-navy-dark' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category === 'all' ? 'جميع الأخبار' : category}
            </button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md h-80 animate-pulse">
                <div className="h-40 bg-gray-300 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map(item => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>
        )}
        
        {!isLoading && filteredNews.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">لا توجد أخبار في هذه الفئة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
