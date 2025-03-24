
import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  channelTitle: string;
}

const FridayMeetingsVideo = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // بيانات محاكاة للفيديوهات من قناة الهيئة الإعلامية
  useEffect(() => {
    const mockVideos: Video[] = [
      {
        id: "NUdlMbmPW3k",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الأول | بتاريخ 21 جوان 2024",
        thumbnail: "https://i.ytimg.com/vi/NUdlMbmPW3k/mqdefault.jpg",
        publishedAt: "2024-06-21",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "aGLJjZ6UDxk",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الثاني | بتاريخ 21 جوان 2024",
        thumbnail: "https://i.ytimg.com/vi/aGLJjZ6UDxk/mqdefault.jpg",
        publishedAt: "2024-06-21",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "hLNDa6NQCN4",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الأول | بتاريخ 14 جوان 2024",
        thumbnail: "https://i.ytimg.com/vi/hLNDa6NQCN4/mqdefault.jpg",
        publishedAt: "2024-06-14",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "CPeS-_h0g4s",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الثاني | بتاريخ 14 جوان 2024",
        thumbnail: "https://i.ytimg.com/vi/CPeS-_h0g4s/mqdefault.jpg",
        publishedAt: "2024-06-14",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "NmJg0c7jmTc",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الأول | بتاريخ 07 جوان 2024",
        thumbnail: "https://i.ytimg.com/vi/NmJg0c7jmTc/mqdefault.jpg",
        publishedAt: "2024-06-07",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "OYMQvYWbojw",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الثاني | بتاريخ 07 جوان 2024",
        thumbnail: "https://i.ytimg.com/vi/OYMQvYWbojw/mqdefault.jpg",
        publishedAt: "2024-06-07",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "F9z1oQ9t42E",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الأول | بتاريخ 31 ماي 2024",
        thumbnail: "https://i.ytimg.com/vi/F9z1oQ9t42E/mqdefault.jpg",
        publishedAt: "2024-05-31",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "_8bBl1vy6Kw",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الثاني | بتاريخ 31 ماي 2024",
        thumbnail: "https://i.ytimg.com/vi/_8bBl1vy6Kw/mqdefault.jpg",
        publishedAt: "2024-05-31",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "aJGZgPiPgQQ",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الأول | بتاريخ 24 ماي 2024",
        thumbnail: "https://i.ytimg.com/vi/aJGZgPiPgQQ/mqdefault.jpg",
        publishedAt: "2024-05-24",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "5r11I9J0W5M",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الثاني | بتاريخ 24 ماي 2024",
        thumbnail: "https://i.ytimg.com/vi/5r11I9J0W5M/mqdefault.jpg",
        publishedAt: "2024-05-24",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "OajpjBGkNlQ",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الأول | بتاريخ 17 ماي 2024",
        thumbnail: "https://i.ytimg.com/vi/OajpjBGkNlQ/mqdefault.jpg",
        publishedAt: "2024-05-17",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "3Ay-6PkRD-o",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الثاني | بتاريخ 17 ماي 2024",
        thumbnail: "https://i.ytimg.com/vi/3Ay-6PkRD-o/mqdefault.jpg",
        publishedAt: "2024-05-17",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "n_e5QBHWXHQ",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الأول | بتاريخ 10 ماي 2024",
        thumbnail: "https://i.ytimg.com/vi/n_e5QBHWXHQ/mqdefault.jpg",
        publishedAt: "2024-05-10",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "gIzv2nX-4-g",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الثاني | بتاريخ 10 ماي 2024",
        thumbnail: "https://i.ytimg.com/vi/gIzv2nX-4-g/mqdefault.jpg",
        publishedAt: "2024-05-10",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "2pPieLJ4oRA",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الأول | بتاريخ 03 ماي 2024",
        thumbnail: "https://i.ytimg.com/vi/2pPieLJ4oRA/mqdefault.jpg",
        publishedAt: "2024-05-03",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "vL-1TsNIeGU",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الثاني | بتاريخ 03 ماي 2024",
        thumbnail: "https://i.ytimg.com/vi/vL-1TsNIeGU/mqdefault.jpg",
        publishedAt: "2024-05-03",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "gI0DzDLrjgM",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الأول | بتاريخ 26 أفريل 2024",
        thumbnail: "https://i.ytimg.com/vi/gI0DzDLrjgM/mqdefault.jpg",
        publishedAt: "2024-04-26",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "tNn0t9QPjwg",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الثاني | بتاريخ 26 أفريل 2024",
        thumbnail: "https://i.ytimg.com/vi/tNn0t9QPjwg/mqdefault.jpg",
        publishedAt: "2024-04-26",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "1ACqz8xQR3A",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الأول | بتاريخ 19 أفريل 2024",
        thumbnail: "https://i.ytimg.com/vi/1ACqz8xQR3A/mqdefault.jpg",
        publishedAt: "2024-04-19",
        channelTitle: "الهيئة الإعلامية"
      },
      {
        id: "cRWZXbr-pNo",
        title: "لقاء الجمعة | مع الشيخ علي بن حاج | الجزء الثاني | بتاريخ 19 أفريل 2024",
        thumbnail: "https://i.ytimg.com/vi/cRWZXbr-pNo/mqdefault.jpg",
        publishedAt: "2024-04-19",
        channelTitle: "الهيئة الإعلامية"
      }
    ];

    setVideos(mockVideos);
    setIsLoading(false);
    if (mockVideos.length > 0) {
      setSelectedVideo(mockVideos[0]);
    }
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-DZ', options);
  };

  return (
    <div className="section-container py-8">
      <h1 className="text-3xl font-bold mb-8 text-navy">لقاء الجمعة المرئي</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* عرض الفيديو المحدد */}
          <div className="lg:col-span-2">
            {selectedVideo && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-video">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-navy-dark mb-2">{selectedVideo.title}</h2>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{selectedVideo.channelTitle}</span>
                    <span>{formatDate(selectedVideo.publishedAt)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* قائمة الفيديوهات */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-4 text-navy">آخر الفيديوهات</h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                {videos.map((video) => (
                  <div 
                    key={video.id}
                    className={`flex gap-3 p-2 rounded-lg cursor-pointer transition-colors ${selectedVideo?.id === video.id ? 'bg-gold/10 border border-gold/30' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedVideo(video)}
                  >
                    <div className="relative flex-shrink-0 w-24 h-16">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-1">
                          <Play size={16} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-navy-dark line-clamp-2">{video.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(video.publishedAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FridayMeetingsVideo;
