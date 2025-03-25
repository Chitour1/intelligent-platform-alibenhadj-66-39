
import { useState, useEffect } from 'react';

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

  const categories = ['all', 'بيانات', 'أخبار', 'زيارات', 'مقابلات', 'نشاطات', 'لقاءات'];

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
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">لا توجد أخبار حالياً</h3>
            <p className="text-gray-600">سيتم إضافة الأخبار قريباً</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
