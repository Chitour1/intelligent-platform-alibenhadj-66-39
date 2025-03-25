
import { useState, useEffect } from 'react';

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
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">مقالات الشيخ علي بن حاج</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            مجموعة من المقالات والمقالات للشيخ علي بن حاج حول مختلف القضايا والموضوعات
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
