
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
  const baseUrl = "https://3e9b1149-d8fa-4b0b-ba68-311dffc3b674.lovableproject.com";

  // إذا كنا في صفحة تفاصيل الخبر واستطعنا الحصول على بيانات الخبر
  const title = isStatementPage && statement ? statement.title : defaultTitle;
  const description = isStatementPage && statement ? statement.excerpt : defaultDescription;
  const image = isStatementPage && statement ? statement.imageUrl : defaultImage;
  const url = isStatementPage && statement ? `${baseUrl}/statements/${statement.id}` : baseUrl;

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
      <meta property="og:image" content={image.startsWith('http') ? image : `${baseUrl}${image}`} />

      {/* علامات Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image.startsWith('http') ? image : `${baseUrl}${image}`} />
    </Helmet>
  );
};

export default MetaTags;
