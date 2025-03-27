
import { Helmet } from 'react-helmet-async';
import { Statement } from '../utils/statementsData';

interface MetaTagsProps {
  statement?: Statement;
  isStatementPage?: boolean;
  title?: string;
  description?: string;
}

const MetaTags = ({ statement, isStatementPage = false, title, description }: MetaTagsProps) => {
  // القيم الإفتراضية
  const defaultTitle = "الشيخ علي بن حاج";
  const defaultDescription = "آخر أخبار وكلمات وبيانات الشيخ علي بن حاج";
  const defaultImage = "/lovable-uploads/b70984a3-8bb6-413d-8e5d-d0647fb60cb6.png";
  const baseUrl = window.location.origin;

  // إذا كنا في صفحة تفاصيل الخبر نستخدم بيانات المقال لتحسين عنوان الصفحة
  let pageTitle = title || defaultTitle;
  if (isStatementPage && statement) {
    pageTitle = `${statement.title}`;
  }
  
  const pageDescription = description || (isStatementPage && statement ? statement.excerpt : defaultDescription);
  const image = isStatementPage && statement && statement.imageUrl ? statement.imageUrl : defaultImage;
  const url = isStatementPage && statement ? `${baseUrl}/statements/${statement.id}` : baseUrl;
  
  // معالجة عنوان الصورة للتأكد من وجود رابط كامل
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  // تاريخ النشر ثابت بتنسيق صالح
  const publishedDate = "2025-03-22T00:00:00Z";
  
  return (
    <Helmet prioritizeSeoTags>
      {/* العلامات الأساسية */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      {/* علامات Open Graph / Facebook */}
      <meta property="og:type" content={isStatementPage ? "article" : "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ar_SA" />
      <meta property="og:site_name" content="الشيخ علي بن حاج" />

      {/* علامات Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* علامات إضافية للمشاركة */}
      {isStatementPage && statement && (
        <>
          <meta property="article:published_time" content={publishedDate} />
          <meta property="article:author" content="الشيخ علي بن حاج" />
          <meta property="article:section" content={statement.category} />
        </>
      )}
    </Helmet>
  );
};

export default MetaTags;
