
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const FridayMeetingsVideo = () => {
  const [currentVideo, setCurrentVideo] = useState("XS7jF85h9TY");
  
  // Featured video data
  const featuredVideo = {
    id: "XS7jF85h9TY",
    title: "كلمة الشيخ علي بن حاج ليوم 22 مارس 2025",
    date: "٢٢ مارس ٢٠٢٥",
    description: "لقاء الجمعة الأسبوعي مع الشيخ علي بن حاج يناقش فيه أهم القضايا الراهنة والمستجدات السياسية والاجتماعية والدينية في الجزائر والعالم الإسلامي."
  };

  // Sample recent videos list (you can replace with actual data)
  const recentVideos = [
    { id: "XS7jF85h9TY", title: "كلمة الشيخ علي بن حاج ليوم 22 مارس 2025", date: "٢٢ مارس ٢٠٢٥" },
    { id: "-8OtW7dPaJU", title: "وهذه", date: "١٥ مارس ٢٠٢٥" },
    { id: "XS7jF85h9TY", title: "تحليل الأحداث الجارية في العالم الإسلامي", date: "١٧ مارس ٢٠٢٥" },
    { id: "XS7jF85h9TY", title: "الشيخ علي بن حاج يتحدث عن مستجدات الساحة السياسية", date: "١٠ مارس ٢٠٢٥" },
    { id: "XS7jF85h9TY", title: "رؤية الشيخ علي بن حاج حول قضايا الشباب المسلم", date: "٣ مارس ٢٠٢٥" },
  ];

  return (
    <div className="section-container">
      <h1 className="section-title mb-8">لقاء الجمعة المرئي</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main video player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <iframe 
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${currentVideo}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-navy-dark">{featuredVideo.title}</h2>
            <p className="text-sm text-gray-500">{featuredVideo.date}</p>
            <p className="text-gray-700 leading-relaxed">{featuredVideo.description}</p>
          </div>
        </div>
        
        {/* Sidebar with video list */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-navy">اللقاءات السابقة</h3>
              <div className="flex space-x-2 space-x-reverse">
                <button className="p-1 rounded hover:bg-gray-200 transition-colors">
                  <ArrowRight size={18} />
                </button>
                <button className="p-1 rounded hover:bg-gray-200 transition-colors">
                  <ArrowLeft size={18} />
                </button>
              </div>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
              {recentVideos.map((video, index) => (
                <div 
                  key={index}
                  className="flex gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setCurrentVideo(video.id)}
                >
                  <div className="flex-shrink-0 relative w-24 h-16 rounded overflow-hidden">
                    <img 
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-navy-dark line-clamp-2">{video.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{video.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FridayMeetingsVideo;
