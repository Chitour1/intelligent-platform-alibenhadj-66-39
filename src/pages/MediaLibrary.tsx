
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Video, Mic, Filter } from 'lucide-react';
import { recentMediaItems, MediaItem } from '../utils/youtubeUtils';

const MediaLibrary = () => {
  const [filter, setFilter] = useState<'all' | 'video' | 'audio'>('all');
  
  // Filter media items based on selected filter
  const filteredItems = filter === 'all' 
    ? recentMediaItems 
    : recentMediaItems.filter(item => item.type === filter);

  return (
    <div className="section-container">
      <h1 className="section-title mb-8">المكتبة الإعلامية</h1>
      
      <div className="mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-navy" />
              <span className="font-medium text-navy">تصفية حسب النوع:</span>
            </div>
            
            <div className="flex gap-2">
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-navy text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setFilter('all')}
              >
                الكل
              </button>
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'video' ? 'bg-navy text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setFilter('video')}
              >
                فيديو
              </button>
              <button 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'audio' ? 'bg-navy text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => setFilter('audio')}
              >
                صوتي
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <h3 className="text-xl font-bold mb-4">الأقسام المتخصصة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/media/friday-meetings-video" className="bg-navy/5 hover:bg-navy/10 p-4 rounded-lg transition-colors">
            <h4 className="text-navy font-bold mb-2">لقاء الجمعة مرئي</h4>
            <p className="text-gray-600 text-sm">مجموعة من اللقاءات المرئية الأسبوعية للشيخ علي بن حاج</p>
          </Link>
          <Link to="/media/media-channel" className="bg-navy/5 hover:bg-navy/10 p-4 rounded-lg transition-colors">
            <h4 className="text-navy font-bold mb-2">قناة الهيئة الاعلامية</h4>
            <p className="text-gray-600 text-sm">قناة الهيئة الاعلامية الرسمية للشيخ علي بن حاج</p>
          </Link>
          <Link to="/media/friday-meetings-audio" className="bg-navy/5 hover:bg-navy/10 p-4 rounded-lg transition-colors">
            <h4 className="text-navy font-bold mb-2">لقاء الجمعة صوتي</h4>
            <p className="text-gray-600 text-sm">تسجيلات صوتية للقاءات الجمعة للشيخ علي بن حاج</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Media Card Component
const MediaCard = ({ item }: { item: MediaItem }) => {
  // Determine the link based on the type
  const getItemLink = () => {
    if (item.type === 'video' && item.videoId) {
      return `/media/friday-meetings-video?videoId=${item.videoId}`;
    } else if (item.type === 'audio') {
      return `/media/friday-meetings-audio`;
    }
    return "#";
  };

  return (
    <Link to={getItemLink()} className="card group">
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={item.imageUrl || `https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-t from-navy/80 to-transparent`}>
          {item.type === 'video' ? (
            <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
              <Video size={20} className="text-navy" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
              <Mic size={20} className="text-navy" />
            </div>
          )}
        </div>
        <div className="absolute bottom-0 right-0 p-2">
          <span className={`text-xs px-2 py-1 rounded ${item.type === 'video' ? 'bg-navy text-white' : 'bg-gold text-navy'}`}>
            {item.type === 'video' ? 'فيديو' : 'صوتي'}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-navy-dark font-bold line-clamp-2 mb-2 group-hover:text-gold transition-colors duration-300">
          {item.title}
        </h3>
        <div className="flex items-center text-gray-500 text-sm">
          <span>{item.date}</span>
        </div>
      </div>
    </Link>
  );
};

export default MediaLibrary;
