
import { Helmet } from 'react-helmet-async';
import { Statement } from '../utils/statementsData';

interface MetaTagsProps {
  statement?: Statement;
  isStatementPage?: boolean;
}

const MetaTags = ({ statement, isStatementPage = false }: MetaTagsProps) => {
  // القيم الإفتراضية
  const defaultTitle = "مقالات وأخبار الشيخ علي بن حاج";
  const defaultDescription = "آخر أخبار وكلمات وبيانات الشيخ علي بن حاج";
  const defaultImage = "/lovable-uploads/b70984a3-8bb6-413d-8e5d-d0647fb60cb6.png";
  const baseUrl = window.location.origin;

  // إذا كنا في صفحة تفاصيل الخبر واستطعنا الحصول على بيانات الخبر
  const title = isStatementPage && statement ? statement.title : defaultTitle;
  const description = isStatementPage && statement ? statement.excerpt : defaultDescription;
  const image = isStatementPage && statement ? statement.imageUrl : defaultImage;
  const url = isStatementPage && statement ? `${baseUrl}/statements/${statement.id}` : baseUrl;
  
  // معالجة عنوان الصورة للتأكد من وجود رابط كامل
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  
  return (
    <Helmet>
      {/* العلامات الأساسية */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* علامات Open Graph / Facebook */}
      <meta property="og:type" content={isStatementPage ? "article" : "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ar_SA" />
      <meta property="og:site_name" content="مقالات وأخبار الشيخ علي بن حاج" />

      {/* علامات Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* علامات إضافية للمشاركة */}
      {isStatementPage && statement && (
        <>
          <meta property="article:published_time" content={new Date(statement.date).toISOString()} />
          <meta property="article:author" content="الشيخ علي بن حاج" />
          <meta property="article:section" content={statement.category} />
        </>
      )}
    </Helmet>
  );
};

export default MetaTags;
