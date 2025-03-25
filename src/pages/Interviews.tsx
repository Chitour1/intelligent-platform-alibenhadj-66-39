
import { useState, useEffect } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

const Interviews = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeYear, setActiveYear] = useState('all');
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // Sample data
  const interviews = [
    {
      id: 1,
      title: "حوار شامل حول المستجدات السياسية في الجزائر",
      date: "١٥ مايو ٢٠٢٣",
      year: "2023",
      source: "قناة الجزيرة",
      excerpt: "تناول الحوار مع الشيخ علي بن حاج آخر المستجدات السياسية في الجزائر وموقفه من القضايا الراهنة والتحديات المستقبلية...",
      imageUrl: "https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "الإصلاح السياسي وآفاق المستقبل في العالم العربي",
      date: "٣ مارس ٢٠٢٣",
      year: "2023",
      source: "صحيفة الشروق",
      excerpt: "ناقش الشيخ علي بن حاج في هذا الحوار رؤيته للإصلاح السياسي في العالم العربي، وسبل تجاوز التحديات الراهنة وبناء مستقبل أفضل...",
      imageUrl: "https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "دور المؤسسات الدينية في ترشيد الخطاب الديني",
      date: "١٢ ديسمبر ٢٠٢٢",
      year: "2022",
      source: "مجلة البيان",
      excerpt: "تحدث الشيخ علي بن حاج عن أهمية دور المؤسسات الدينية في ترشيد الخطاب الديني وتجديده، وضرورة مواكبة العصر مع الحفاظ على الثوابت...",
      imageUrl: "https://images.unsplash.com/photo-1531269501439-e3c83056c562?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "الجبهة الإسلامية للإنقاذ: التاريخ والمستقبل",
      date: "٥ أكتوبر ٢٠٢٢",
      year: "2022",
      source: "قناة العربية",
      excerpt: "استعرض الشيخ علي بن حاج في هذا الحوار تاريخ الجبهة الإسلامية للإنقاذ وتجربتها، وآفاق العمل السياسي الإسلامي في المستقبل...",
      imageUrl: "https://images.unsplash.com/photo-1590419690008-905895e8fe0d?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "الوضع السياسي في الجزائر: تقييم وتحليل",
      date: "١٨ يوليو ٢٠٢٢",
      year: "2022",
      source: "صحيفة القدس العربي",
      excerpt: "قدم الشيخ علي بن حاج تقييماً وتحليلاً للوضع السياسي في الجزائر، وسبل الخروج من الأزمات الراهنة، وبناء مستقبل أفضل للبلاد...",
      imageUrl: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "دور الشباب في بناء المستقبل وتحقيق التنمية",
      date: "٢٠ مايو ٢٠٢٢",
      year: "2022",
      source: "إذاعة الجزائر",
      excerpt: "تحدث الشيخ علي بن حاج عن دور الشباب في بناء المستقبل وتحقيق التنمية، وأهمية تمكينهم وتأهيلهم للمساهمة في النهضة والإصلاح...",
      imageUrl: "https://images.unsplash.com/photo-1532939163844-547f958e91b4?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "القضية الفلسطينية في ضوء المتغيرات الإقليمية والدولية",
      date: "١٥ ديسمبر ٢٠٢١",
      year: "2021",
      source: "قناة الأقصى",
      excerpt: "ناقش الشيخ علي بن حاج القضية الفلسطينية في ضوء المتغيرات الإقليمية والدولية، وموقفه من التطورات الأخيرة، وسبل دعم الشعب الفلسطيني...",
      imageUrl: "https://images.unsplash.com/photo-1518185314901-9c5bc9ec4051?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 8,
      title: "مستقبل الإصلاح السياسي في العالم العربي",
      date: "٥ أكتوبر ٢٠٢١",
      year: "2021",
      source: "مجلة السياسة الدولية",
      excerpt: "تناول الحوار مع الشيخ علي بن حاج مستقبل الإصلاح السياسي في العالم العربي، وتحليل التجارب السابقة، واستشراف آفاق المستقبل...",
      imageUrl: "https://images.unsplash.com/photo-1537498425-7722cbef178a?q=80&w=1800&auto=format&fit=crop"
    }
  ];
  
  const years = ['all', '2023', '2022', '2021', '2020', '2019'];
  
  const filteredInterviews = activeYear === 'all' 
    ? interviews 
    : interviews.filter(item => item.year === activeYear);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">حوارات الشيخ علي بن حاج</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            مجموعة من الحوارات والمقابلات الصحفية والإعلامية مع الشيخ علي بن حاج حول مختلف القضايا والموضوعات
          </p>
        </div>
      </div>
      
      <div className="section-container">
        <div className="mb-8 flex flex-wrap justify-center items-center gap-3">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                activeYear === year 
                  ? 'bg-gold text-navy-dark' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {year === 'all' ? 'جميع السنوات' : year}
            </button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md h-64 animate-pulse">
                <div className="flex h-full">
                  <div className="w-1/3 bg-gray-300"></div>
                  <div className="w-2/3 p-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredInterviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredInterviews.map(interview => (
                  <div key={interview.id} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                      <img 
                        src={interview.imageUrl} 
                        alt={interview.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-0 right-0 m-2">
                        <span className="bg-gold/20 text-gold-dark text-xs px-2 py-1 rounded">
                          {interview.source}
                        </span>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-4 flex flex-col">
                      <h3 className="text-lg font-bold text-navy-dark mb-2">
                        {interview.title}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm mb-3">
                        <Calendar size={14} className="ml-1" />
                        {interview.date}
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                        {interview.excerpt}
                      </p>
                      <a 
                        href={`/interviews/${interview.id}`} 
                        className="inline-flex items-center font-medium text-gold hover:text-gold-dark"
                      >
                        قراءة الحوار كاملاً
                        <ExternalLink size={16} className="mr-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">لا توجد حوارات في هذه السنة</p>
                <button 
                  onClick={() => setActiveYear('all')}
                  className="mt-4 btn-primary"
                >
                  عرض جميع الحوارات
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Interviews;
