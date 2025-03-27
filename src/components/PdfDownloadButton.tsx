
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface PdfDownloadButtonProps extends Omit<ButtonProps, 'onClick'> {
  onGenerate: () => Promise<Blob>;
  filename: string;
  children?: React.ReactNode;
}

const PdfDownloadButton = ({ 
  onGenerate, 
  filename,
  children,
  ...props 
}: PdfDownloadButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      toast({
        title: "جاري التحميل",
        description: "يتم الآن إنشاء ملف PDF، يرجى الانتظار...",
      });
      
      // توليد البيانات
      const pdfBlob = await onGenerate();
      
      // إنشاء URL للبلوب
      const blobUrl = URL.createObjectURL(pdfBlob);
      
      // إنشاء رابط تحميل وتفعيله
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${filename}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // تنظيف
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
      
      toast({
        title: "تم التحميل",
        description: `تم إنشاء وتحميل ${filename}.pdf بنجاح.`,
      });
    } catch (error) {
      console.error('خطأ في إنشاء PDF:', error);
      toast({
        title: "فشل التحميل",
        description: "حدث خطأ أثناء إنشاء ملف PDF، يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      onClick={handleDownload}
      disabled={isGenerating}
      {...props}
    >
      <FileText size={16} className="ml-2" />
      {children || "تحميل PDF"}
    </Button>
  );
};

export default PdfDownloadButton;
