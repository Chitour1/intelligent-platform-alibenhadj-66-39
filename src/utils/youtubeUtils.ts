// This function fetches video details from the YouTube API
// Since we can't use external API keys directly, we'll implement a workaround
// to extract information from the video page

// Define an interface for media items
export interface MediaItem {
  id: string;
  title: string; 
  type: 'video' | 'audio';
  date: string;
  imageUrl?: string;
  videoId?: string;
  description?: string;
}

// A shared array of recent media items that will be used across the application
export const recentMediaItems: MediaItem[] = [
  { 
    id: "0", 
    type: "video", 
    videoId: "v3-xRViU3MM",
    title: "كلمة الشيخ علي بن حاج ليوم ١٢ مارس ٢٠٢٥",
    date: "١٢ مارس ٢٠٢٥",
    imageUrl: "https://img.youtube.com/vi/v3-xRViU3MM/mqdefault.jpg",
    description: "لقاء الجمعة الأسبوعي مع الشيخ علي بن حاج يناقش فيه أهم القضايا الراهنة"
  },
  { 
    id: "1", 
    type: "video", 
    videoId: "XS7jF85h9TY",
    title: "كلمة الشيخ علي بن حاج ليوم ٢٢ مارس ٢٠٢٥",
    date: "٢٢ مارس ٢٠٢٥",
    imageUrl: "https://img.youtube.com/vi/XS7jF85h9TY/mqdefault.jpg",
    description: "لقاء الجمعة الأسبوعي مع الشيخ علي بن حاج يناقش فيه أهم القضايا الراهنة"
  },
  { 
    id: "2", 
    type: "video", 
    videoId: "-8OtW7dPaJU",
    title: "كلمة الشيخ علي بن حاج ليوم ١٧ مارس ٢٠٢٥", 
    date: "١٧ مارس ٢٠٢٥",
    imageUrl: "https://img.youtube.com/vi/-8OtW7dPaJU/mqdefault.jpg",
    description: "لقاء الجمعة الأسبوعي مع الشيخ علي بن حاج يناقش فيه أهم القضايا الراهنة"
  }
];

// Function to add a new media item to the collection
export const addMediaItem = (item: MediaItem) => {
  // Add to the beginning of the array to show newest first
  recentMediaItems.unshift(item);
  
  // Optionally limit the size of the array to prevent it from growing too large
  if (recentMediaItems.length > 20) {
    recentMediaItems.pop();
  }
};

export const fetchVideoDetails = async (videoId: string) => {
  try {
    // In a real implementation, you would use the YouTube API with an API key
    // But for this demo, we'll use a simpler approach that doesn't require API keys
    
    // Get the oEmbed data which is publicly available without API key
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch video data: ${response.status}`);
    }
    
    const data = await response.json();
    
    // The oEmbed endpoint provides the title
    return {
      title: data.title,
      // Unfortunately, we can't get description or published date without the API
      description: "لقاء الجمعة الأسبوعي مع الشيخ علي بن حاج يناقش فيه أهم القضايا الراهنة والمستجدات السياسية والاجتماعية والدينية في الجزائر والعالم الإسلامي.",
      publishedAt: new Date().toISOString() // Default to current date
    };
  } catch (error) {
    console.error("Error in fetchVideoDetails:", error);
    // Return default values if fetch fails
    return {
      title: `كلمة الشيخ علي بن حاج ليوم ${new Date().getDate()} ${getArabicMonth(new Date().getMonth())} ${new Date().getFullYear()}`,
      description: "لقاء الجمعة الأسبوعي مع الشيخ علي بن حاج",
      publishedAt: new Date().toISOString()
    };
  }
};

// Helper function to get Arabic month names
const getArabicMonth = (monthIndex: number): string => {
  const arabicMonths = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];
  return arabicMonths[monthIndex];
};
