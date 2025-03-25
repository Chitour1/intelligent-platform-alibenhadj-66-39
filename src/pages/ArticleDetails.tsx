
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Share2 } from 'lucide-react';
import { articlesData } from './Articles';
import MetaTags from '../components/MetaTags';
import NotFound from './NotFound';

const ArticleDetails = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const id = parseInt(articleId || '0');
  
  const article = articlesData.find(article => article.id === id);
  
  if (!article) {
    return <NotFound />;
  }

  const paragraphs = [
    "الحمد لله القائل في كتابه الكريم \"سبحان الذي أسرى بعبده ليلا من المسجد الحرام إلى المسجد الأقصى الذي باركنا حوله...\"الإسراء1، والصلاة والسلام على أشرف المرسلين القائل في الحديث الصحيح \"لا تقوم الساعة حتى يقاتل المسلمون اليهود فيقتلهم المسلمون حتى يختبئ اليهودي وراء الحجر والشجر فيقول الحجر أو الشجر: يا مسلم، يا عبد الله، هذا يهودي خلفي فتعال فاقتله، إلا الغرقد فإنه من شجر اليهود\" وعلى آله وصحبه أجمعين.",
    "في ظل حرارة الصيف اللاهبة وانصراف الناس إلى قضاء العطل الصيفية والترفيه عن النفس بالحلال أو الحرام وفي غفلة من عموم الأمة –عامة وخاصة- إلا ما رحم ربي وفي ظل تلهية حكام الخذلان والاعتلال لشعوبهم وإغراقهم في كم هائل من الحفلات والمهرجانات في طول البلاد العربية وعرضها، على حد قول الشاعر:",
    "هنا وهنالك قام المأتم * شعب يُغنّي وحاكم يترنم",
    "في ظل كل ذلك انعقد مؤتمر فتح السادس –حيث لا نصر ولا فتح على أرض الواقع- وبإذن مرخص من الكيان الصهيوني وتزكية من دول الاستبداد العربي وعلى رأسهم مصر والسعودية والأردن والذين تولوا تزكية محمود عباس غريم ياسر عرفات والذي فُرض عليه قسرا من قبل الإدارة الأمريكية والإسرائيلية، والذي يحظى بالدعم الدولي والعربي والإسرائيلي إنما هم ديناصورات فتح الذين بدلوا وغيروا ونكصوا على أعقابهم من أرباب المال والنفوذ والسلطة الذين يجدون الدعم في بعض العواصم العربية المتخاذلة وسر الدعم الذي يحظى به عباس وجماعته أنه يؤمن بحل الدولتين أو الحكم الذاتي المحدود ويعادي كل فصائل المقاومة الحقيقية وإن رفع في المؤتمر السادس شعارها من باب المكر والخديعة وتضليل الرأي العام واحتواء تيار المقاومة المسلحة داخل حركة فتح في الداخل والخارج إلى أن يتم المؤتمر وتعود حليمة إلى عادتها القديمة، وسوف تكشفه الأيام المقبلة بعون الله تعالى."
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaTags />
      <div className="section-container py-8">
        <div className="mb-8">
          <Link to="/articles" className="inline-flex items-center text-navy hover:text-gold transition-colors">
            <ArrowRight className="ml-2" size={16} />
            العودة إلى المقالات
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {article.imageUrl && (
            <div className="w-full h-80 relative">
              <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-6 md:p-10">
            <div className="flex flex-wrap justify-between items-center mb-6">
              <span className="bg-gold/10 text-gold-dark px-3 py-1 rounded-md text-sm font-medium mb-2 md:mb-0">
                {article.category}
              </span>
              
              <div className="flex items-center space-x-4 space-x-reverse text-gray-500">
                <div className="flex items-center">
                  <Calendar size={16} className="ml-1" />
                  <span className="text-sm">{article.islamicDate}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="ml-1" />
                  <span className="text-sm">{article.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="ml-1" />
                  <span className="text-sm">{article.readTime}</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-navy-dark mb-6">
              {article.title}
            </h1>
            
            <div className="flex items-center mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-white text-lg font-bold">
                  {article.author.slice(0, 1)}
                </div>
                <div className="mr-3">
                  <p className="font-bold">{article.author}</p>
                  <p className="text-sm text-gray-500">نائب رئيس الجبهة الإسلامية للإنقاذ</p>
                </div>
              </div>
              
              <button 
                className="mr-auto flex items-center text-gray-500 hover:text-gold transition-colors"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.title,
                      text: article.excerpt,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('تم نسخ الرابط');
                  }
                }}
              >
                <Share2 size={18} className="ml-1" />
                مشاركة
              </button>
            </div>
            
            <div className="article-content text-gray-800 leading-relaxed text-lg space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              
              <h2 className="text-xl font-bold mt-8 mb-4">*ومن منا لا يتذكر خطاب الرئيس الأمريكي –أوباما-</h2>
              <p className="text-lg">في جامعة القاهرة بتاريخ 04/06/2009 الذي أغرق جماهير المستمعين إليه بمعسول الكلام ولذيذ الأحلام ولكن قاصمة الظهر في خطابه عندما طلب من حركة حماس نبذ العنف ومتى كان جهاد ومقاومة الاستعمار عنفا في عرف أوباما السياسي؟!!! ألم تنل أمريكا استقلالها بعد 80 سنة من القتال ضد التاج البريطاني فيما يسمى بالثورة الأمريكية ألم تطرد الإسبان من كوبا بعد حرب دامت 3 سنوات من 1895 إلى 1898 فيما سمي الحرب الأمريكية الإسبانية. ألم تتوحد الولايات الشمالية والجنوبية بعد حرب أهلية طاحنة دامت 4 سنوات من 1861 إلى 1865 راح ضحيتها حوالي 600.000 قتيل فهل استخدام السلاح ضد المحتل يسمى عنفا يا أوباما؟!!! وأما فاقرة الفواقر حصره الحل للقضية الفلسطينية في الاعتراف بحل الدولتين، ولكن ما يثير الدهشة والاستغراب أن ينال هذا الخطاب الهائم ذلك الترحيب والتصفيق من أغلب المستمعين داخل القاعة وخارجها وفيهم أهل العمائم وشيوخ الأزهر، وكان الواجب الشرعي على هؤلاء العلماء قبل غيرهم إما الرّد المباشر أو الانسحاب من القاعة احتجاجا على الحل المطروح والذي يخالف الشرع أولا، والمواثيق الدولية التي تشرع مقاومة الاستعمار بكل الوسائل، أما الجلوس دون إنكار فيشمله قوله تعالى "إنكم إذا مثلهم".</p>
              
              <h2 className="text-xl font-bold mt-8 mb-4">*لقد أصبح ساسة الغرب والعرب ينادون في كل مناسبة بحل الدولتين</h2>
              <p className="text-lg">ويأتي على رأس تلك الدول مصر والأردن وحتى الجزائر التي ذاقت ويلات الاستعمار يصرح وزير خارجيتها مدلسي بتاريخ 24/06/2009 "إن الجزائر مع حل الدولتين كما نادى به أوباما؟!!! فمتى كان أوباما مرجعية الجزائر في مناصرة القضايا العادلة وماذا لو أن أوباما نادى بالحكم الذاتي للصحراء الغربية، فهل ستخضع الجزائر لذلك الطرح؟!!!.</p>
             
              <div className="text-center mt-8">
                <span className="font-bold block">لقراءة المقال كاملاً، يرجى تحميل الملف</span>
                <button className="btn-primary mt-4">تحميل المقال كاملاً</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
