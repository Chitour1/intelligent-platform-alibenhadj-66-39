import Hero from '../components/Hero';
import FeaturedNews from '../components/FeaturedNews';
import StatementCard from '../components/StatementCard';
import ArticleCard from '../components/ArticleCard';
import VideoCardFeatured from '../components/VideoCardFeatured';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';

const Index = () => {
  return (
    <>
      <MetaTags 
        title="موقع الشيخ علي بن حاج - الصفحة الرئيسية"
        description="الموقع الرسمي للشيخ علي بن حاج، نائب رئيس الجبهة الإسلامية للإنقاذ - آخر الأخبار والبيانات والكلمات"
        image="/lovable-uploads/d1a44ab9-1ce3-4bc1-a6b4-4555f7a29b09.png"
      />
      <Hero />
      <div className="py-8 px-4 md:py-16 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="section-title mb-8">أحدث كلمات الشيخ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* العناصر هنا */}
          </div>
          <div className="mt-10 text-center">
            <Link to="/statements" className="btn-primary">
              جميع كلمات الشيخ
            </Link>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="section-title mb-8">مقالات مختارة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* العناصر هنا */}
          </div>
          <div className="mt-10 text-center">
            <Link to="/articles" className="btn-primary">
              جميع المقالات
            </Link>
          </div>
        </div>

        <div>
          <h2 className="section-title mb-8">آخر الكلمات المرئية</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* العناصر هنا */}
          </div>
          <div className="mt-10 text-center">
            <Link to="/media/friday-meetings-video" className="btn-primary">
              جميع الكلمات المرئية
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
