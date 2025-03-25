
import { useState, useEffect } from 'react';
import { Calendar, Clock, FileText, Mic, Video } from 'lucide-react';

const LecturesSermons = () => {
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
  const lecturesSermons = [
    {
      id: 1,
      title: "الإخلاص في العبادة وأثره في حياة المسلم",
      date: "١٥ مايو ٢٠٢٣",
      duration: "٤٥ دقيقة",
      type: "خطبة",
      format: "video",
      imageUrl: "https://images.unsplash.com/photo-1542427472-633345028792?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "الأخلاق في الإسلام وأهميتها في بناء المجتمع",
      date: "٨ مايو ٢٠٢٣",
      duration: "٦٠ دقيقة",
      type: "درس",
      format: "audio",
      imageUrl: "https://images.unsplash.com/photo-1564865878688-9a244444042a?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "التوكل على الله وأثره في حياة المؤمن",
      date: "١ مايو ٢٠٢٣",
      duration: "٥٠ دقيقة",
      type: "خطبة",
      format: "video",
      imageUrl: "https://images.unsplash.com/photo-1534328053651-0b98e6cfcfac?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "الصبر وفضائله في حياة المسلم",
      date: "٢٤ أبريل ٢٠٢٣",
      duration: "٤٠ دقيقة",
      type: "درس",
      format: "text",
      imageUrl: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "أهمية العلم والتعلم في الإسلام",
      date: "١٧ أبريل ٢٠٢٣",
      duration: "٥٥ دقيقة",
      type: "محاضرة",
      format: "video",
      imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "الأسرة المسلمة ودورها في بناء المجتمع",
      date: "١٠ أبريل ٢٠٢٣",
      duration: "٦٥ دقيقة",
      type: "محاضرة",
      format: "audio",
      imageUrl: "https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "الدعوة إلى الله: الأساليب والوسائل",
      date: "٣ أبريل ٢٠٢٣",
      duration: "٧٠ دقيقة",
      type: "درس",
      format: "video",
      imageUrl: "https://images.unsplash.com/photo-1535712384861-a0e7f9daeec6?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 8,
      title: "الوسطية في الإسلام وأثرها في استقرار المجتمع",
      date: "٢٧ مارس ٢٠٢٣",
      duration: "٥٠ دقيقة",
      type: "خطبة",
      format: "text",
      imageUrl: "https://images.unsplash.com/photo-1507761834642-99600981d4a8?q=80&w=1800&auto=format&fit=crop"
    }
  ];
  
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
  
  const [selectedFormat, setSelectedFormat] = useState('all');
  
  const filteredItems = lecturesSermons
    .filter(item => activeFilter === 'all' || item.type === activeFilter)
    .filter(item => selectedFormat === 'all' || item.format === selectedFormat);
  
  const FormatIcon = ({ format }) => {
    switch (format) {
      case 'video':
        return <Video size={20} className="text-gold" />;
      case 'audio':
        return <Mic size={20} className="text-gold" />;
      case 'text':
        return <FileText size={20} className="text-gold" />;
      default:
        return null;
    }
  };
  
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
          <>
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-0 right-0 m-2">
                        <span className="bg-navy text-white text-xs px-2 py-1 rounded">
                          {item.type}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 m-2">
                        <span className={`text-white text-xs px-2 py-1 rounded flex items-center ${
                          item.format === 'video' ? 'bg-red-600' : 
                          item.format === 'audio' ? 'bg-blue-600' : 'bg-green-600'
                        }`}>
                          <FormatIcon format={item.format} />
                          <span className="mr-1">
                            {item.format === 'video' ? 'فيديو' : 
                             item.format === 'audio' ? 'صوتي' : 'نص'}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-navy-dark font-bold mb-2 hover:text-gold transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="flex justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar size={14} className="ml-1" />
                          {item.date}
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="ml-1" />
                          {item.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">لم يتم العثور على دروس أو خطب مطابقة للتصفية المحددة</p>
                <button 
                  onClick={() => {setActiveFilter('all'); setSelectedFormat('all');}}
                  className="mt-4 btn-primary"
                >
                  عرض جميع الدروس والخطب
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LecturesSermons;
