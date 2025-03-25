
import { useState, useEffect } from 'react';

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
  
  const years = ['all', '2023', '2022', '2021', '2020', '2019'];
  
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
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">لا توجد حوارات حالياً</h3>
            <p className="text-gray-600">سيتم إضافة الحوارات قريباً</p>
            <button 
              onClick={() => setActiveYear('all')}
              className="mt-4 btn-primary"
            >
              تحديث الفلاتر
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interviews;
