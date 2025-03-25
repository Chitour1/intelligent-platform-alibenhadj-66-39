
import { useState, useEffect } from 'react';
import { FileText, Mic, Video } from 'lucide-react';

const LecturesSermons = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const filters = [
    { id: 'all', label: 'الكل' },
    { id: 'خطبة', label: 'الخطب' },
    { id: 'درس', label: 'الدروس' },
    { id: 'محاضرة', label: 'المحاضرات' }
  ];
  
  const formatFilters = [
    { id: 'all', label: 'جميع الصيغ', icon: null },
    { id: 'video', label: 'فيديو', icon: Video },
    { id: 'audio', label: 'صوتي', icon: Mic },
    { id: 'text', label: 'نص', icon: FileText }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">دروس وخطب الشيخ علي بن حاج</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            مجموعة من الدروس والخطب والمحاضرات التي ألقاها الشيخ علي بن حاج في مختلف المناسبات
          </p>
        </div>
      </div>
      
      <div className="section-container">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center items-center gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  activeFilter === filter.id 
                    ? 'bg-gold text-navy-dark' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-2">
            {formatFilters.map(format => (
              <button
                key={format.id}
                onClick={() => setSelectedFormat(format.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium flex items-center ${
                  selectedFormat === format.id 
                    ? 'bg-navy text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {format.icon && <format.icon size={16} className="ml-1" />}
                {format.label}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md h-60 animate-pulse">
                <div className="h-32 bg-gray-300 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">لا توجد دروس أو خطب حالياً</h3>
            <p className="text-gray-600">سيتم إضافة الدروس والخطب قريباً</p>
            <button 
              onClick={() => {setActiveFilter('all'); setSelectedFormat('all');}}
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

export default LecturesSermons;
