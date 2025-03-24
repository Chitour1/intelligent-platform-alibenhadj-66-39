
// This function fetches video details from the YouTube API
// Since we can't use external API keys directly, we'll implement a workaround
// to extract information from the video page

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
