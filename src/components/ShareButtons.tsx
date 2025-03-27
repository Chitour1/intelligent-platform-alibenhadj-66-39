
import React from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Share2 } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

const ShareButtons = ({ url, title, description, className }: ShareButtonsProps) => {
  const shareOnSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = description ? encodeURIComponent(description) : '';
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      default:
        // نسخ الرابط إلى الحافظة
        navigator.clipboard.writeText(url);
        toast({
          title: "تم نسخ الرابط",
          description: "تم نسخ رابط الصفحة إلى الحافظة",
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };
  
  return (
    <div className={`flex justify-center space-x-3 space-x-reverse ${className || ''}`}>
      <Button
        size="icon"
        variant="outline"
        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors border-none"
        onClick={() => shareOnSocial('facebook')}
        aria-label="مشاركة على فيسبوك"
      >
        <Facebook size={18} />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors border-none"
        onClick={() => shareOnSocial('twitter')}
        aria-label="مشاركة على تويتر"
      >
        <Twitter size={18} />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors border-none"
        onClick={() => shareOnSocial('linkedin')}
        aria-label="مشاركة على لينكد إن"
      >
        <Linkedin size={18} />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors border-none"
        onClick={() => shareOnSocial('copy')}
        aria-label="نسخ الرابط"
      >
        <Share2 size={18} />
      </Button>
    </div>
  );
};

export default ShareButtons;
