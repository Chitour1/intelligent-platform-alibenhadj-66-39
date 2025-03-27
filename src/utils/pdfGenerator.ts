
/**
 * أداة لإنشاء ملفات PDF من المحتوى
 */

import { jsPDF } from "jspdf";
import "jspdf/dist/polyfills.es.js";
import { Statement } from "./statementsData";

// استيراد الخط العربي المطلوب
import amiriFont from "@/assets/fonts/Amiri-Regular.js";
import amiriBoldFont from "@/assets/fonts/Amiri-Bold.js";

interface PdfOptions {
  title: string;
  content: string;
  author?: string;
  date?: string;
  imageUrl?: string;
  type: 'article' | 'statement' | 'book';
}

export const generatePDF = async (options: PdfOptions): Promise<Blob> => {
  const { title, content, author, date, imageUrl, type } = options;
  
  // إنشاء مستند PDF جديد
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });
  
  // إضافة الخط العربي
  doc.addFileToVFS("Amiri-Regular.ttf", amiriFont);
  doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
  
  doc.addFileToVFS("Amiri-Bold.ttf", amiriBoldFont);
  doc.addFont("Amiri-Bold.ttf", "Amiri", "bold");
  
  // تعيين الخط الافتراضي
  doc.setFont("Amiri");
  doc.setR2L(true);
  
  // إضافة معلومات المستند
  doc.setProperties({
    title: title,
    subject: type === 'article' ? 'مقال' : type === 'statement' ? 'كلمة الشيخ' : 'كتاب',
    author: author || 'الشيخ علي بن حاج',
    creator: 'موقع الشيخ علي بن حاج',
  });
  
  // إضافة صورة الشعار في أعلى المستند
  doc.setFillColor(16, 33, 60); // اللون البحري
  doc.rect(0, 0, 210, 25, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('موقع الشيخ علي بن حاج', 105, 15, { align: 'center' });
  
  // إضافة صورة للمحتوى إذا كانت موجودة
  if (imageUrl) {
    try {
      // رسم الصورة في المستند
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      await new Promise<void>((resolve, reject) => {
        img.onload = () => {
          try {
            // حساب نسبة العرض إلى الارتفاع للصورة
            const ratio = img.width / img.height;
            
            // تعيين أبعاد الصورة في المستند
            const imgWidth = 180;
            const imgHeight = imgWidth / ratio;
            
            // إضافة الصورة
            doc.addImage(
              img, 
              'JPEG', 
              15, // الهامش من اليسار
              30, // الهامش من أعلى
              imgWidth, 
              imgHeight
            );
            
            resolve();
          } catch (err) {
            console.error('خطأ في إضافة الصورة:', err);
            resolve(); // نتابع حتى لو فشلنا في إضافة الصورة
          }
        };
        
        img.onerror = () => {
          console.error('فشل تحميل الصورة');
          resolve(); // نتابع حتى لو فشلنا في إضافة الصورة
        };
        
        img.src = imageUrl;
      });
      
      // تعديل موضع بداية النص
      doc.setY(120);
    } catch (error) {
      console.error('خطأ في معالجة الصورة:', error);
      doc.setY(30);
    }
  } else {
    doc.setY(30);
  }
  
  // إضافة عنوان المستند
  doc.setTextColor(16, 33, 60);
  doc.setFontSize(20);
  doc.setFont("Amiri", "bold");
  doc.text(title, 105, doc.getY(), { align: 'center' });
  
  // إضافة تاريخ ومعلومات إضافية
  if (date || author) {
    doc.setY(doc.getY() + 10);
    doc.setFontSize(12);
    doc.setFont("Amiri", "normal");
    
    let infoText = '';
    if (author) infoText += `${author}`;
    if (date) infoText += infoText ? ` - ${date}` : date;
    
    if (infoText) {
      doc.text(infoText, 105, doc.getY(), { align: 'center' });
    }
  }
  
  // إضافة محتوى المستند
  doc.setY(doc.getY() + 15);
  doc.setFontSize(12);
  doc.setFont("Amiri", "normal");
  doc.setTextColor(0, 0, 0);
  
  // تقسيم النص إلى فقرات
  const paragraphs = content.split('\n\n');
  
  // استخدام دالة متعددة الأسطر لكل فقرة
  paragraphs.forEach((paragraph) => {
    if (paragraph.trim()) {
      const textLines = doc.splitTextToSize(paragraph, 180);
      
      // التحقق مما إذا كان النص سيتجاوز الصفحة الحالية
      if (doc.getY() + textLines.length * 7 > 270) {
        doc.addPage();
        doc.setY(20);
      }
      
      doc.text(textLines, 190, doc.getY(), { align: 'right' });
      doc.setY(doc.getY() + textLines.length * 7 + 5);
    }
  });
  
  // إضافة تذييل للمستند
  doc.setDrawColor(16, 33, 60);
  doc.line(15, 280, 195, 280);
  
  doc.setFontSize(10);
  doc.setTextColor(16, 33, 60);
  doc.text('جميع الحقوق محفوظة © موقع الشيخ علي بن حاج', 105, 287, { align: 'center' });
  
  // إنشاء بلوب من المستند
  return doc.output('blob');
};

export const generateStatementPDF = async (statement: Statement): Promise<Blob> => {
  return generatePDF({
    title: statement.title,
    content: statement.content,
    author: 'الشيخ علي بن حاج',
    date: statement.date,
    imageUrl: statement.imageUrl,
    type: 'statement'
  });
};
