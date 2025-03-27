
/**
 * Utility for sharing content on social media platforms
 */

// Define platforms for sharing
export type SocialPlatform = 'facebook' | 'twitter' | 'whatsapp' | 'telegram' | 'linkedin' | 'email';

interface ShareContent {
  title: string;
  text?: string;
  url: string;
}

/**
 * Share content on a specific social media platform
 */
export const shareOnSocial = (platform: SocialPlatform, content: ShareContent): void => {
  const { title, text, url } = content;
  
  switch (platform) {
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      break;
    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
      break;
    case 'whatsapp':
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
      break;
    case 'telegram':
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
      break;
    case 'linkedin':
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
      break;
    case 'email':
      window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + ' ' + url)}`, '_blank');
      break;
    default:
      console.error('Invalid platform specified for sharing');
  }
};
