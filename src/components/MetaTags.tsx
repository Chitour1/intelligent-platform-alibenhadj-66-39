
import { Helmet } from 'react-helmet-async';
import { Statement } from '../utils/statementsData';

interface MetaTagsProps {
  statement?: Statement;
  isStatementPage?: boolean;
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

const MetaTags = ({ 
  statement, 
  isStatementPage = false,
  title: customTitle,
  description: customDescription,
  image: customImage,
  url: customUrl,
  type: customType
}: MetaTagsProps) => {
  // القيم الإفتراضية
  const defaultTitle = "موقع الشيخ علي بن حاج";
  const defaultDescription = "آخر أخبار وكلمات وبيانات الشيخ علي بن حاج";
  const defaultImage = "/lovable-uploads/b70984a3-8bb6-413d-8e5d-d0647fb60cb6.png";
  const baseUrl = window.location.origin;

  // إعطاء الأولوية للقيم المخصصة ثم قيم البيان إذا كانت موجودة ثم القيم الافتراضية
  let title = customTitle || defaultTitle;
  let description = customDescription || defaultDescription;
  let image = customImage || defaultImage;
  let url = customUrl || baseUrl;
  let type = customType || 'website';

  // إذا كنا في صفحة تفاصيل الخبر نستخدم بيانات المقال لتحسين عنوان الصفحة
  if (isStatementPage && statement) {
    title = statement.title;
    description = statement.excerpt;
    image = statement.imageUrl || defaultImage;
    url = `${baseUrl}/statements/${statement.id}`;
    type = 'article';
  }
  
  // معالجة عنوان الصورة للتأكد من وجود رابط كامل
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  // تاريخ النشر ثابت بتنسيق صالح
  const publishedDate = new Date().toISOString();
  
  return (
    <Helmet prioritizeSeoTags>
      {/* العلامات الأساسية */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* علامات Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ar_SA" />
      <meta property="og:site_name" content="موقع الشيخ علي بن حاج" />

      {/* علامات Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
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
