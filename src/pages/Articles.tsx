
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search } from 'lucide-react';
import MetaTags from '../components/MetaTags';
import ArticleCard from '../components/ArticleCard';

interface Article {
  id: number;
  title: string;
  date: string;
  hijriDate?: string;
  excerpt: string;
  readTime: string;
  content: string;
  imageUrl?: string;
}

export const articlesData: Article[] = [
  {
    id: 1,
    title: "بيان: تذْكِيرُ عُمُومِ الْمُسْلِمين بِبُطْلَانِ حَلِّ الدَّوْلَتين",
    date: "11/08/2009",
    hijriDate: "20 شعبان 1430هـ",
    readTime: "25 دقيقة",
    excerpt: "بيان حول بطلان حل الدولتين في فلسطين وتذكير للمسلمين بحرمة التفريط في أي جزء من أرض فلسطين المباركة مع استعراض لموقف العلماء عبر التاريخ والاستشهاد بالثورة الجزائرية.",
    content: "",
    imageUrl: "/lovable-uploads/b9083fed-23aa-45ec-959f-dc7512a49839.png"
  }
];

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredArticles = articlesData.filter(article => 
    article.title.includes(searchQuery) || 
    article.excerpt.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaTags />
      
      {/* Hero Section */}
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">مقالات الشيخ علي بن حاج</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            مجموعة من المقالات والكتابات للشيخ علي بن حاج حول مختلف القضايا والموضوعات
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mt-8">
            <input
              type="text"
              placeholder="ابحث في المقالات..."
              className="w-full bg-white/10 border border-white/20 text-white rounded-md py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-gold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="section-container py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md h-64 animate-pulse">
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard 
                key={article.id}
                id={article.id}
                title={article.title}
                date={article.date}
                readTime={article.readTime}
                excerpt={article.excerpt}
                imageUrl={article.imageUrl}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">لا توجد نتائج</h3>
            <p className="text-gray-600">لم يتم العثور على أي مقالات تطابق بحثك. يرجى المحاولة بكلمات مختلفة.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
