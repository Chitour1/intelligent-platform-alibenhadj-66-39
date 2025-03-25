
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, User, ChevronRight } from 'lucide-react';
import { articlesData } from './Articles';
import MetaTags from '../components/MetaTags';

const ArticleDetails = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(articlesData[0]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, we would fetch the article from an API
    // For now, we're using the static articlesData
    const foundArticle = articlesData.find(a => a.id === parseInt(articleId || '1'));
    if (foundArticle) {
      setArticle(foundArticle);
    }
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [articleId]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-10"></div>
            <div className="h-96 bg-gray-300 rounded mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <MetaTags title={article.title} description={article.excerpt} />
      
      <div className="bg-navy text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 space-x-reverse text-sm">
              <li>
                <Link to="/" className="hover:text-gray-300">الرئيسية</Link>
              </li>
              <li><ChevronRight className="h-4 w-4" /></li>
              <li>
                <Link to="/articles" className="hover:text-gray-300">المقالات</Link>
              </li>
              <li><ChevronRight className="h-4 w-4" /></li>
              <li className="truncate max-w-xs">{article.title}</li>
            </ol>
          </nav>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm">
            {article.date && (
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-gray-300" />
                <span>{article.date}</span>
                {article.hijriDate && (
                  <span className="mr-1">({article.hijriDate})</span>
                )}
              </div>
            )}
            {article.readTime && (
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-300" />
                <span>{article.readTime}</span>
              </div>
            )}
            {article.author && (
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-gray-300" />
                <span>{article.author}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {article.imageUrl && (
          <div className="mb-8">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        
        {article.content ? (
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>
            ))}
          </div>
        ) : (
          <div className="prose prose-lg max-w-none">
            <p className="mb-4 leading-relaxed">{article.excerpt}</p>
            <p className="mb-4 leading-relaxed">
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
            </p>
            <p className="mb-4 leading-relaxed">
              إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.
            </p>
            <p className="mb-4 leading-relaxed">
              ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً، دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetails;
