
import { Helmet } from 'react-helmet-async';
import { Statement } from '../utils/statementsData';
import { BookType } from '../types/books';

interface MetaTagsProps {
  statement?: Statement;
  isStatementPage?: boolean;
  book?: BookType;
  isBookPage?: boolean;
}

const MetaTags = ({ statement, isStatementPage = false, book, isBookPage = false }: MetaTagsProps) => {
  // القيم الإفتراضية
  const defaultTitle = "الشيخ علي بن حاج";
  const defaultDescription = "آخر أخبار وكلمات وبيانات الشيخ علي بن حاج";
  const defaultImage = "/lovable-uploads/b70984a3-8bb6-413d-8e5d-d0647fb60cb6.png";
  const baseUrl = window.location.origin;

  // تحديد العنوان والوصف والصورة بناءً على نوع الصفحة
  let title = defaultTitle;
  let description = defaultDescription;
  let image = defaultImage;
  let url = baseUrl;

  if (isStatementPage && statement) {
    title = `${statement.title}`;
    description = statement.excerpt;
    image = statement.imageUrl || defaultImage;
    url = `${baseUrl}/statements/${statement.id}`;
  } else if (isBookPage && book) {
    title = `${book.title} - ${book.author}`;
    description = book.description;
    image = book.cover || defaultImage;
    url = `${baseUrl}/publications/books/${book.id}`;
  }
  
  // معالجة عنوان الصورة للتأكد من وجود رابط كامل
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  // تاريخ النشر ثابت بتنسيق صالح
  const publishedDate = "2025-03-22T00:00:00Z";
  
  return (
    <Helmet prioritizeSeoTags>
      {/* العلامات الأساسية */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* علامات Open Graph / Facebook */}
      <meta property="og:type" content={(isStatementPage || isBookPage) ? "article" : "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ar_SA" />
      <meta property="og:site_name" content="الشيخ علي بن حاج" />

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
      
      {isBookPage && book && (
        <>
          <meta property="article:published_time" content={publishedDate} />
          <meta property="article:author" content={book.author} />
          <meta property="article:section" content={book.tags[0]} />
        </>
      )}
    </Helmet>
  );
};

export default MetaTags;
