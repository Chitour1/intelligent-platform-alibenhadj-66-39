
import { Facebook, Twitter, Linkedin, Send, Mail, Link as LinkIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { shareOnSocial, SocialPlatform } from '@/utils/socialShareUtils';

interface SocialShareButtonsProps {
  title: string;
  text?: string;
  compact?: boolean;
}

const SocialShareButtons = ({ title, text, compact = false }: SocialShareButtonsProps) => {
  const currentUrl = window.location.href;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: "تم نسخ الرابط",
        description: "تم نسخ رابط الصفحة بنجاح"
      });
    }).catch(err => {
      console.error('Failed to copy link:', err);
      toast({
        title: "فشل النسخ",
        description: "حدث خطأ أثناء نسخ الرابط",
        variant: "destructive"
      });
    });
  };
  
  const handleShare = (platform: SocialPlatform) => {
    shareOnSocial(platform, { title, text: text || title, url: currentUrl });
  };
  
  const buttons = [
    { icon: <Facebook size={16} />, label: "فيسبوك", platform: 'facebook' as SocialPlatform },
    { icon: <Twitter size={16} />, label: "تويتر", platform: 'twitter' as SocialPlatform },
    { icon: <Send size={16} />, label: "تلغرام", platform: 'telegram' as SocialPlatform },
    { icon: <Linkedin size={16} />, label: "لينكد إن", platform: 'linkedin' as SocialPlatform },
    { icon: <Mail size={16} />, label: "البريد", platform: 'email' as SocialPlatform },
  ];
  
  if (compact) {
    return (
      <div className="flex space-x-1 space-x-reverse">
        {buttons.map((button, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleShare(button.platform)}
                >
                  {button.icon}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>مشاركة على {button.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={copyToClipboard}
              >
                <LinkIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>نسخ الرابط</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }
  
  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={() => handleShare(button.platform)}
        >
          {button.icon}
          <span className="mr-1">{button.label}</span>
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="flex items-center"
        onClick={copyToClipboard}
      >
        <LinkIcon size={16} />
        <span className="mr-1">نسخ الرابط</span>
      </Button>
    </div>
  );
};

export default SocialShareButtons;
