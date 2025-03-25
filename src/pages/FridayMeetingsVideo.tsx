import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Clock, ChevronDown, ChevronRight } from 'lucide-react';
import { recentMediaItems, fetchVideoDetails } from '../utils/youtubeUtils';
import { useSearchParams } from 'react-router-dom';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const videoTimeline = [
  { 
    id: 1, 
    startTime: "00:00:00", 
    endTime: "00:05:36", 
    title: "الافتتاح والثناء على الجهاد في رمضان",
    description: "حديث عن فضائل العشر الأواخر من رمضان، وربطها بتاريخ الجهاد والغزوات في هذا الشهر"
  },
  { 
    id: 2, 
    startTime: "00:05:36", 
    endTime: "00:11:07", 
    title: "غياب حديث العلماء عن الجهاد رغم نازلة غزة",
    description: "انتقاد العلماء والدعاة لصمتهم وعدم تفسير فريضة الجهاد في ظل ما يحدث في غزة"
  },
  { 
    id: 3, 
    startTime: "00:11:07", 
    endTime: "00:14:27", 
    title: "المفاهيم المقلوبة وتشويه صورة المجاهدين",
    description: "قلب الحقائق من قبل الإعلام وتحويل المقاوم إلى \"إرهابي\""
  },
  { 
    id: 4, 
    startTime: "00:14:27", 
    endTime: "00:17:42", 
    title: "جرائم الاحتلال في غزة وصمت الأنظمة",
    description: "استعراض المجازر الصهيونية والصمت العربي والدولي المريب"
  },
  { 
    id: 5, 
    startTime: "00:17:42", 
    endTime: "00:19:53", 
    title: "تقاعس الحكام والجيوش العربية",
    description: "نقد لامتلاكهم الأسلحة دون استخدامها في القضايا المصيرية"
  },
  { 
    id: 6, 
    startTime: "00:19:53", 
    endTime: "00:21:02", 
    title: "نقد العمرة الحديثة وتبذير الأموال",
    description: "نقد من يسافرون للعُمرة بينما الأمة تُذبح، والمال يُصرف على الفسق بدل الجهاد"
  },
  { 
    id: 7, 
    startTime: "00:21:02", 
    endTime: "00:24:25", 
    title: "النكوص عن فريضة الجهاد وتزييف الإعلام",
    description: "تبيين كيف شوّه الإعلام فريضة الجهاد، وتحويل المظلوم إلى جانٍ"
  },
  { 
    id: 8, 
    startTime: "00:24:25", 
    endTime: "00:28:55", 
    title: "منع التظاهر في العالم الإسلامي وغياب الشوارع",
    description: "مقارنة بين خروج الشعوب الغربية نصرة لغزة وصمت شوارع العرب"
  },
  { 
    id: 9, 
    startTime: "00:28:55", 
    endTime: "00:32:04", 
    title: "ازدواجية المعايير وتفكك الأمة الإسلامية",
    description: "سقوط مفهوم الأمة الواحدة وحلول الوطنية الضيقة مكانها"
  },
  { 
    id: 10, 
    startTime: "00:32:04", 
    endTime: "00:33:14", 
    title: "خطر فقدان الشعور بالقضايا الكبرى",
    description: "فقدان التفاعل الشعبي حتى مع المجازر الكبرى"
  },
  { 
    id: 11, 
    startTime: "00:33:14", 
    endTime: "00:38:50", 
    title: "ازدواجية الخطاب الرسمي تجاه الجهاد",
    description: "لماذا يُدعى للجهاد في أفغانستان ويُحرَّم في فلسطين؟"
  },
  { 
    id: 12, 
    startTime: "00:38:50", 
    endTime: "00:41:05", 
    title: "لماذا لم يعد القرآن يحرك المسلمين؟",
    description: "التحذير من انفصال التلاوة عن العمل بالقرآن"
  },
  { 
    id: 13, 
    startTime: "00:41:05", 
    endTime: "00:47:34", 
    title: "إعلام التضليل وتحريف الكلم عن مواضعه",
    description: "هجوم على القنوات العربية التي تحرّف الدين وتُضلل الشعوب"
  },
  { 
    id: 14, 
    startTime: "00:47:34", 
    endTime: "00:48:39", 
    title: "دخول الغربيين في الإسلام ومعرفة الجاهلية",
    description: "كيف أن الجاهلية الحديثة دفعت بعض الغربيين إلى الإسلام"
  },
  { 
    id: 15, 
    startTime: "00:48:39", 
    endTime: "00:49:47", 
    title: "تشويه المقاومة الفلسطينية وازدراء حماس",
    description: "رفض للاتهامات الموجهة لحماس والمقاومة وتحذير من التبعية الإعلامية"
  },
  { 
    id: 16, 
    startTime: "00:49:47", 
    endTime: "00:50:57", 
    title: "دور فرنسا وأمريكا وبريطانيا في جرائم الاستعمار",
    description: "استدعاء للتاريخ الاستعماري للدول الغربية"
  },
  { 
    id: 17, 
    startTime: "00:50:57", 
    endTime: "00:54:14", 
    title: "فشل المنظومة التربوية ومعاناة التلاميذ",
    description: "نقد شديد لنظام التعليم في الجزائر"
  },
  { 
    id: 18, 
    startTime: "00:54:14", 
    endTime: "00:56:30", 
    title: "المواهب الطلابية وضرورة احترام التخصصات",
    description: "دعوة لإصلاح التعليم حسب ميولات الطلبة"
  },
  { 
    id: 19, 
    startTime: "00:56:30", 
    endTime: "00:59:41", 
    title: "هجرة العقول وغياب بيئة الابتكار",
    description: "الهجرة العلمية وقيمة الإنسان خارج بلده"
  },
  { 
    id: 20, 
    startTime: "00:59:41", 
    endTime: "01:01:45", 
    title: "مكانة اليمن ومواجهة الاستهزاء بضعف إمكاناتهم",
    description: "الدفاع عن فقراء المجاهدين في اليمن ورفض الاستهزاء بهم"
  },
  { 
    id: 21, 
    startTime: "01:01:45", 
    endTime: "01:06:03", 
    title: "سوء فهم القرآن والانفصال بين التلاوة والعمل",
    description: "الدعوة إلى اتباع الأحكام لا مجرد التلاوة"
  },
  { 
    id: 22, 
    startTime: "01:06:03", 
    endTime: "01:10:18", 
    title: "الاقتصار على الدعاء في زمن الجهاد",
    description: "تشبيه الاكتفاء بالدعاء بالعاجز عن الدفاع عن بيته"
  },
  { 
    id: 23, 
    startTime: "01:10:18", 
    endTime: "01:13:46", 
    title: "خذلان الحكام وصمت الجزائر تجاه جنوب أفريقيا",
    description: "تجاهل موقف جنوب إفريقيا رغم شجاعتها القانونية"
  },
  { 
    id: 24, 
    startTime: "01:13:46", 
    endTime: "01:18:05", 
    title: "دعوة لتجميد الخلافات المذهبية والانتباه للفخاخ",
    description: "الح��ر من التفرقة السنية الشيعية في ظل حرب الوجود"
  },
  { 
    id: 25, 
    startTime: "01:18:05", 
    endTime: "01:23:20", 
    title: "التلاعب بالتاريخ في الإعلام والدراما",
    description: "نقد لمسلسل معاوية كمثال على تأجيج الخلافات التاريخية"
  },
  { 
    id: 26, 
    startTime: "01:23:20", 
    endTime: "01:24:23", 
    title: "رفض سب الصحابة والدعوة لفقه الخلاف",
    description: "الدعوة للتمييز بين نقد الأفعال وسب الصحابة"
  },
  { 
    id: 27, 
    startTime: "01:24:23", 
    endTime: "01:25:25", 
    title: "دعم الحوثيين دفاعًا عن القضية المركزية",
    description: "دفاع عن من يناصرون غزة مهما اختلفت مشاربهم"
  },
  { 
    id: 28, 
    startTime: "01:25:25", 
    endTime: "01:26:31", 
    title: "واجب العلماء في تحريك الشعوب",
    description: "حثّ العلماء على القيام بدورهم في تحريك الرأي العام"
  },
  { 
    id: 29, 
    startTime: "01:26:31", 
    endTime: "01:37:42", 
    title: "قصة الإمام الذي واجه الأمير بآية قرآنية",
    description: "قصة رمزية عن استخدام القرآن للرد على الاستبداد"
  },
  { 
    id: 30, 
    startTime: "01:37:42", 
    endTime: "01:49:26", 
    title: "استغلال السلطة لتقييد الخطاب الديني",
    description: "نقد تسييس الدين وتقييد الأئمة والخطباء"
  },
  { 
    id: 31, 
    startTime: "01:49:26", 
    endTime: "01:56:38", 
    title: "فريضة الوقت هي نصرة غزة لا غير",
    description: "خلاصة الكلمة وتأكيد على أن القضية الفلسطينية هي القضية المركزية الآن"
  },
  { 
    id: 32, 
    startTime: "01:56:38", 
    endTime: "02:06:05", 
    title: "نقد البوتفليقية واستمراريتها في الحكم",
    description: "هجوم مباشر على النظام السياسي الجزائري واستمرارية عقلية بوتفليقة"
  },
  { 
    id: 33, 
    startTime: "02:06:05", 
    endTime: "02:15:49", 
    title: "حق لاجئي غزة في دخول أرض الإسلام",
    description: "رفض وصف اللاجئين من غزة بالمهجّرين والدعوة لاحتضانهم"
  },
  { 
    id: 34, 
    startTime: "02:15:49", 
    endTime: "02:26:21", 
    title: "الدولة تُقصي تيارات وتفضل أخرى باسم التعددية",
    description: "نقد التمييز بين الزوايا والتيارات الإسلامية"
  },
  { 
    id: 35, 
    startTime: "02:26:21", 
    endTime: "02:35:00", 
    title: "محاكمة سعيد بوتفليقة ومحاسبة رموز النظام السابق",
    description: "دعوة إلى المحاسبة العلنية العادلة لرموز النظام السابق بدون استثناء"
  },
];

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
  
  const [timelineOpen, setTimelineOpen] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // Convert time string to seconds
  const timeToSeconds = (timeStr: string) => {
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return 0;
  };

  // Handle jumping to a specific time in the video
  const jumpToTime = (timeStr: string) => {
    const seconds = timeToSeconds(timeStr);
    if (iframeRef.current && iframeRef.current.src) {
      // Update the iframe src with the start time parameter
      const currentSrc = iframeRef.current.src;
      const baseUrl = currentSrc.split('?')[0];
      iframeRef.current.src = `${baseUrl}?start=${seconds}&autoplay=1`;
    }
  };

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
              ref={iframeRef}
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
            <p className="text-gray-700 leading-relaxed font-droid-kufi">{videoDetails.description}</p>
          </div>

          {/* Video Timeline Section - Always show for all videos */}
          <div className="mt-8 bg-gray-50 rounded-lg p-4">
            <div 
              className="flex items-center justify-between cursor-pointer" 
              onClick={() => setTimelineOpen(!timelineOpen)}
            >
              <h3 className="font-bold text-navy flex items-center gap-2">
                <Clock size={18} />
                فهرس محتويات الكلمة
              </h3>
              <Button variant="ghost" size="sm">
                {timelineOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </Button>
            </div>
            
            {timelineOpen && (
              <div className="mt-4 space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {videoTimeline.map((section) => (
                  <div 
                    key={section.id}
                    className="p-2 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => jumpToTime(section.startTime)}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold text-navy-dark">{section.title}</h4>
                      <span className="text-sm text-gold bg-gold/10 px-2 py-1 rounded font-mono">
                        {section.startTime} - {section.endTime}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 font-droid-kufi">{section.description}</p>
                  </div>
                ))}
              </div>
            )}
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
                  isActive={video.videoId === currentVideo}
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
const VideoListItem = ({ video, onClick, isActive = false }) => {
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
      className={`flex gap-3 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${isActive ? 'bg-gray-100 border-r-4 border-gold' : ''}`}
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
        <h4 className={`font-medium text-sm ${isActive ? 'text-gold' : 'text-navy-dark'} line-clamp-2`}>{title}</h4>
        <p className="text-xs text-gray-500 mt-1">{video.date}</p>
      </div>
    </div>
  );
};

export default FridayMeetingsVideo;
