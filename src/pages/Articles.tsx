
import { useState, useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import { Search } from 'lucide-react';

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  // Sample data
  const articles = [
    {
      id: 1,
      title: "الصحوة الإسلامية والتحديات المعاصرة",
      date: "١٢ مايو ٢٠٢٣",
      readTime: "١٠ دقائق",
      excerpt: "يتناول المقال تحليلاً مفصلاً للصحوة الإسلامية والتحديات التي تواجهها في العالم المعاصر، ويقترح الحلول الممكنة...",
      category: "فكر إسلامي",
      imageUrl: "https://images.unsplash.com/photo-1599837487527-e006944858ca?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "دور الشباب في النهضة والإصلاح",
      date: "٨ مايو ٢٠٢٣",
      readTime: "٧ دقائق",
      excerpt: "يناقش المقال الدور المحوري للشباب في عملية النهضة والإصلاح، ويحث على أهمية تأهيلهم وتمكينهم للمساهمة في بناء المستقبل...",
      category: "مجتمع",
      imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "الهوية الإسلامية في ظل العولمة",
      date: "٣ مايو ٢٠٢٣",
      readTime: "١٢ دقيقة",
      excerpt: "يستعرض المقال التحديات التي تواجه الهوية الإسلامية في ظل تيارات العولمة، وكيفية الحفاظ على الأصالة مع الانفتاح على الآخر...",
      category: "ثقافة",
      imageUrl: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "قراءة في الأحداث السياسية الراهنة",
      date: "٢٩ أبريل ٢٠٢٣",
      readTime: "٨ دقائق",
      excerpt: "يقدم المقال تحليلاً معمقاً للأحداث السياسية الجارية في المنطقة، ويستشرف الآفاق المستقبلية في ضوء المتغيرات الحالية...",
      category: "سياسة",
      imageUrl: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "مستقبل العلاقات الدولية بعد التحولات الجيوسياسية",
      date: "٢٠ أبريل ٢٠٢٣",
      readTime: "١٥ دقيقة",
      excerpt: "يتناول المقال مستقبل العلاقات الدولية في ضوء التحولات الجيوسياسية العالمية، ويحلل تأثيرها على المنطقة العربية والإسلامية...",
      category: "سياسة",
      imageUrl: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "التربية والتعليم: رؤية إصلاحية",
      date: "١٥ أبريل ٢٠٢٣",
      readTime: "٩ دقائق",
      excerpt: "يطرح المقال رؤية إصلاحية شاملة لمنظومة التربية والتعليم، ويناقش أهم التحديات والحلول المقترحة لتطوير العملية التعليمية...",
      category: "تعليم",
      imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "الإعلام ودوره في تشكيل الوعي المجتمعي",
      date: "١٠ أبريل ٢٠٢٣",
      readTime: "١١ دقيقة",
      excerpt: "يناقش المقال دور الإعلام في تشكيل الوعي المجتمعي، وتأثيره على الرأي العام، وأهمية الإعلام الهادف في بناء المجتمع...",
      category: "إعلام",
      imageUrl: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=1800&auto=format&fit=crop"
    },
    {
      id: 8,
      title: "الأمن الفكري وتحصين الشباب",
      date: "٥ أبريل ٢٠٢٣",
      readTime: "١٠ دقائق",
      excerpt: "يتناول المقال قضية الأمن الفكري وأهميته في تحصين الشباب من التيارات الفكرية المنحرفة، ويقدم رؤية متوازنة للتعامل مع الأفكار المختلفة...",
      category: "فكر إسلامي",
      imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1800&auto=format&fit=crop"
    }
  ];
  
  const categories = ['all', 'فكر إسلامي', 'مجتمع', 'ثقافة', 'سياسة', 'تعليم', 'إعلام'];
  
  const filteredArticles = articles
    .filter(article => activeCategory === 'all' || article.category === activeCategory)
    .filter(article => 
      searchQuery === '' || 
      article.title.includes(searchQuery) || 
      article.excerpt.includes(searchQuery)
    );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">مقالات الشيخ علي بن حاج</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            مجموعة من المقالات والدراسات الفكرية والسياسية للشيخ علي بن حاج في مختلف المجالات
          </p>
        </div>
      </div>
      
      <div className="section-container">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="البحث في المقالات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 rounded-full transition-all duration-300 text-sm font-medium ${
                  activeCategory === category 
                    ? 'bg-gold text-navy-dark' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category === 'all' ? 'جميع المقالات' : category}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-md h-64 animate-pulse">
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/6 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map(article => (
                  <ArticleCard key={article.id} {...article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600">لم يتم العثور على مقالات مطابقة لبحثك</p>
                <button 
                  onClick={() => {setSearchQuery(''); setActiveCategory('all');}}
                  className="mt-4 btn-primary"
                >
                  عرض جميع المقالات
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Articles;
