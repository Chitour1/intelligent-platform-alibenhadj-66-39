import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { recentMediaItems, fetchVideoDetails } from '../utils/youtubeUtils';
import { useSearchParams } from 'react-router-dom';

const FridayMeetingsVideo = () => {
  const [searchParams] = useSearchParams();
  const videoIdParam = searchParams.get('videoId');
  
  // Filter only video items
  const videoItems = recentMediaItems.filter(item => item.type === 'video' && item.videoId);
  
  // Set currentVideo from URL param or use the first video in the list
  const [currentVideo, setCurrentVideo] = useState(videoIdParam || (videoItems.length > 0 ? videoItems[0].videoId : "XS7jF85h9TY"));
  
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    date: ""
  });
  
  useEffect(() => {
    const loadVideoDetails = async () => {
      try {
        const details = await fetchVideoDetails(currentVideo);
        setVideoDetails({
          title: details.title,
          description: details.description || "لا يوجد وصف متاح.",
          date: details.publishedAt ? formatDate(details.publishedAt) : ""
        });
      } catch (error) {
        console.error("Error fetching video details:", error);
        setVideoDetails({
          title: "كلمة الشيخ علي بن حاج",
          description: "لقاء الجمعة الأسبوعي مع الشيخ علي بن حاج يناقش فيه أهم القضايا الراهنة والمستجدات السياسية والاجتماعية والدينية في الجزائر والعالم الإسلامي.",
          date: "٢٢ مارس ٢٠٢٥"
        });
      }
    };

    loadVideoDetails();
  }, [currentVideo]);

  // Helper function to format date to Arabic format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = getArabicMonth(date.getMonth());
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Convert month number to Arabic month name
  const getArabicMonth = (monthIndex) => {
    const arabicMonths = [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    return arabicMonths[monthIndex];
  };

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
            <h2 className="text-2xl font-bold text-navy-dark">{videoDetails.title}</h2>
            <p className="text-sm text-gray-500">{videoDetails.date}</p>
            <p className="text-gray-700 leading-relaxed">{videoDetails.description}</p>
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
              {videoItems.map((video, index) => (
                <VideoListItem 
                  key={index}
                  video={video} 
                  onClick={() => setCurrentVideo(video.videoId)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Separate component for video list items
const VideoListItem = ({ video, onClick }) => {
  const [title, setTitle] = useState(video.title || "جاري تحميل العنوان...");

  useEffect(() => {
    const getVideoTitle = async () => {
      try {
        const details = await fetchVideoDetails(video.videoId);
        setTitle(details.title);
      } catch (error) {
        console.error(`Error fetching details for video ${video.videoId}:`, error);
        // Keep the existing title if provided, otherwise show error
        setTitle(video.title || "عنوان غير متاح");
      }
    };

    if (!video.title) {
      getVideoTitle();
    }
  }, [video.videoId, video.title]);

  return (
    <div 
      className="flex gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
      onClick={onClick}
    >
      <div className="flex-shrink-0 relative w-24 h-16 rounded overflow-hidden">
        <img 
          src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-navy-dark line-clamp-2">{title}</h4>
        <p className="text-xs text-gray-500 mt-1">{video.date}</p>
      </div>
    </div>
  );
};

export default FridayMeetingsVideo;
