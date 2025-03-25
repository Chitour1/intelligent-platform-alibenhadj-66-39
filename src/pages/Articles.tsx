
import { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import MetaTags from '../components/MetaTags';

// تعريف بيانات المقالات
export const articlesData = [
  {
    id: 1,
    title: "تذْكِيرُ عُمُومِ الْمُسْلِمين بِبُطْلَانِ حَلِّ الدَّوْلَتين",
    date: "11/08/2009",
    islamicDate: "20 شعبان 1430هـ",
    readTime: "20 دقيقة",
    category: "سياسة",
    excerpt: "مناداة دول الإعتلال العربي بحل الدولتين وتنازل أهل فلسطين لليهود على بعض أراضيهم ليقيموا عليها دولتهم، أي تقسيم أرض فلسطين وهو ما رفضه العرب أثناء صدور قرار التقسيم سنة 1947، واندلعت الثورة وشكلت فرق الجهاد باسم الجهاد المقدس وأجمع المسلمون والعرب على رفض قرار التقسيم.",
    imageUrl: "/lovable-uploads/65f38c9f-e42c-4249-9202-f7fcc7f08095.png",
    author: "علي بن حاج"
  }
];

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaTags />
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">مقالات الشيخ علي بن حاج</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            مجموعة من المقالات والكتابات للشيخ علي بن حاج حول مختلف القضايا والموضوعات
          </p>
        </div>
      </div>
      
      <div className="section-container">
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
        ) : articlesData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articlesData.map(article => (
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
            <h3 className="text-2xl font-bold text-gray-700 mb-4">لا توجد مقالات حالياً</h3>
            <p className="text-gray-600">سيتم إضافة المقالات قريباً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
