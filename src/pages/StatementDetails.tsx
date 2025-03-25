
import { useParams, Link } from 'react-router-dom';
import { statementsData } from '../utils/statementsData';
import { ArrowLeft, Calendar, Clock, Share2, BookOpen, Video, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import MetaTags from '../components/MetaTags';
import { Button } from "@/components/ui/button";

// قائمة المواضيع الزمنية للفيديو
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
    description: "الحذر من التفرقة السنية الشيعية في ظل حرب الوجود"
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

const StatementDetails = () => {
  const { statementId } = useParams<{ statementId: string }>();
  const [statement, setStatement] = useState(statementsData.find(s => s.id === statementId));
  const [timelineOpen, setTimelineOpen] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // تحويل الوقت من النص إلى ثواني
  const timeToSeconds = (timeStr: string) => {
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }
    return 0;
  };

  // الانتقال إلى وقت محدد في الفيديو
  const jumpToTime = (timeStr: string) => {
    const seconds = timeToSeconds(timeStr);
    if (iframeRef.current && iframeRef.current.src) {
      // تحديث src للـ iframe مع وقت البداية
      const currentSrc = iframeRef.current.src;
      const baseUrl = currentSrc.split('?')[0];
      iframeRef.current.src = `${baseUrl}?start=${seconds}&autoplay=1`;
    }
  };
  
  // If statement not found, redirect to not found page
  useEffect(() => {
    if (!statement) {
      // You could redirect to a not found page here
      console.log('Statement not found');
    }
  }, [statement]);

  if (!statement) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-navy mb-4">الخبر غير موجود</h1>
          <p className="text-gray-600 mb-6">لم يتم العثور على الخبر المطلوب</p>
          <Link to="/statements" className="btn-primary">
            العودة إلى أحدث كلمات الشيخ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* إضافة العلامات الوصفية */}
      <MetaTags statement={statement} isStatementPage={true} />
      
      {/* Hero Section */}
      <div className="relative bg-navy text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src={statement.imageUrl} 
            alt={statement.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 to-navy"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/statements" className="inline-flex items-center text-gold hover:text-gold-light mb-6">
            <ArrowLeft size={16} className="ml-1" />
            العودة إلى أحدث كلمات الشيخ
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-relaxed md:leading-loose">{statement.title}</h1>
          <div className="flex flex-wrap items-center text-gray-300 gap-4 mb-6">
            <div className="flex items-center">
              <Calendar size={16} className="ml-1" />
              <span>{statement.date}</span>
              {statement.hijriDate && (
                <span className="mr-1">({statement.hijriDate})</span>
              )}
            </div>
            <div className="flex items-center">
              <span className="bg-gold/20 text-gold-light px-2 py-1 rounded-md text-xs font-medium">
                {statement.category}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <img 
            src={statement.imageUrl} 
            alt={statement.title} 
            className="w-full rounded-lg shadow-md"
          />
        </div>
        
        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {statement.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed md:leading-9 text-gray-800 text-base md:text-lg font-droid-kufi tracking-normal" style={{ lineHeight: '2.2' }}>{paragraph}</p>
          ))}
        </div>
        
        {/* Video Embed */}
        {statement.videoId && (
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 flex items-center leading-relaxed">
              <Video size={20} className="ml-2 text-gold" />
              شاهد الكلمة كاملة
            </h3>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                ref={iframeRef}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${statement.videoId}`}
                title={statement.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Video Timeline Section */}
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
        )}
        
        {/* Share Links */}
        <div className="mt-12 flex justify-between items-center border-t border-gray-200 pt-6">
          <button 
            className="flex items-center text-navy hover:text-gold transition-colors"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: statement.title,
                  text: statement.excerpt,
                  url: window.location.href,
                }).catch(err => {
                  console.error('Error sharing:', err);
                });
              } else {
                // الخيار البديل: نسخ الرابط إلى الحافظة
                navigator.clipboard.writeText(window.location.href).then(() => {
                  alert('تم نسخ الرابط بنجاح!');
                }).catch(err => {
                  console.error('Error copying to clipboard:', err);
                });
              }
            }}
          >
            <Share2 size={18} className="ml-2" />
            مشاركة هذه الكلمة
          </button>
          <Link to="/statements" className="flex items-center text-gold hover:text-gold-dark transition-colors">
            <BookOpen size={18} className="ml-2" />
            المزيد من كلمات الشيخ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StatementDetails;
