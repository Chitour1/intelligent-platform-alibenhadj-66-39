
import { useState, useEffect } from 'react';
import { FileText, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Article {
  id: number;
  title: string;
  date: string;
  hijriDate: string;
  content: string;
  imageUrl?: string;
}

const articlesList: Article[] = [
  {
    id: 1,
    title: "تذكير عموم المسلمين ببطلان حل الدولتين",
    date: "11/08/2009",
    hijriDate: "20 شعبان 1430هـ",
    content: `الحمد لله القائل في كتابه الكريم "سبحان الذي أسرى بعبده ليلا من المسجد الحرام إلى المسجد الأقصى الذي باركنا حوله..."الإسراء1، والصلاة والسلام على أشرف المرسلين القائل في الحديث الصحيح "لا تقوم الساعة حتى يقاتل المسلمون اليهود فيقتلهم المسلمون حتى يختبئ اليهودي وراء الحجر والشجر فيقول الحجر أو الشجر: يا مسلم، يا عبد الله، هذا يهودي خلفي فتعال فاقتله، إلا الغرقد فإنه من شجر اليهود" وعلى آله وصحبه أجمعين.

في ظل حرارة الصيف اللاهبة وانصراف الناس إلى قضاء العطل الصيفية والترفيه عن النفس بالحلال أو الحرام وفي غفلة من عموم الأمة –عامة وخاصة- إلا ما رحم ربي وفي ظل تلهية حكام الخذلان والاعتلال لشعوبهم وإغراقهم في كم هائل من الحفلات والمهرجانات في طول البلاد العربية وعرضها، على حد قول الشاعر :
هنا وهنالك قام المأتم * شعب يُغنّي وحاكم يترنم
في ظل كل ذلك انعقد مؤتمر فتح السادس –حيث لا نصر ولا فتح على أرض الواقع- وبإذن مرخص من الكيان الصهيوني وتزكية من دول الاستبداد العربي وعلى رأسهم مصر والسعودية والأردن والذين تولوا تزكية محمود عباس غريم ياسر عرفات والذي فُرض عليه قسرا من قبل الإدارة الأمريكية والإسرائيلية، والذي يحظى بالدعم الدولي والعربي والإسرائيلي إنما هم ديناصورات فتح الذين بدلوا وغيروا ونكصوا على أعقابهم من أرباب المال والنفوذ والسلطة الذين يجدون الدعم في بعض العواصم العربية المتخاذلة وسر الدعم الذي يحظى به عباس وجماعته أنه يؤمن بحل الدولتين أو الحكم الذاتي المحدود ويعادي كل فصائل المقاومة الحقيقية وإن رفع في المؤتمر السادس شعارها من باب المكر والخديعة وتضليل الرأي العام واحتواء تيار المقاومة المسلحة داخل حركة فتح في الداخل والخارج إلى أن يتم المؤتمر وتعود حليمة إلى عادتها القديمة، وسوف تكشفه الأيام المقبلة بعون الله تعالى.`,
    imageUrl: "/lovable-uploads/9b70a61d-fdfe-40af-9a1d-bff43338c387.png"
  }
];

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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
        ) : articlesList.length > 0 ? (
          <div className="space-y-8">
            {articlesList.map(article => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 p-4">
                    {article.imageUrl && (
                      <div className="aspect-video overflow-hidden rounded-md">
                        <img 
                          src={article.imageUrl} 
                          alt={article.title} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h2 className="text-2xl font-bold text-navy mb-3">{article.title}</h2>
                    <div className="flex items-center text-gray-600 mb-4 text-sm space-x-4 space-x-reverse">
                      <div className="flex items-center">
                        <Calendar size={16} className="ml-1" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gold">{article.hijriDate}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 line-clamp-3">{article.content.substring(0, 300)}...</p>
                    <Link to={`/articles/${article.id}`}>
                      <button className="bg-navy hover:bg-navy-light text-white px-4 py-2 rounded transition-colors duration-300 flex items-center">
                        قراءة المزيد
                        <FileText size={16} className="mr-2" />
                      </button>
                    </Link>
                  </div>
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
