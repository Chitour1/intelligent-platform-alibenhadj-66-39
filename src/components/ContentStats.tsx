
import { useState, useEffect } from 'react';
import { Star, StarHalf, ThumbsUp } from 'lucide-react';

interface ContentStatsProps {
  contentId: string;
  contentType: 'book' | 'statement' | 'article';
}

const ContentStats = ({ contentId, contentType }: ContentStatsProps) => {
  const [viewCount, setViewCount] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isRatingHovered, setIsRatingHovered] = useState(false);
  const [userRatingSubmitted, setUserRatingSubmitted] = useState(false);

  // Load stats from localStorage to simulate persistence
  useEffect(() => {
    const loadStats = () => {
      const statsKey = `${contentType}_stats_${contentId}`;
      const savedStats = localStorage.getItem(statsKey);
      
      if (savedStats) {
        const stats = JSON.parse(savedStats);
        setRating(stats.rating || 0);
        setViewCount(stats.views || 0);
      } else {
        // Initialize with random realistic data
        const initialRating = (Math.random() * 2) + 3; // Rating between 3 and 5
        const initialViews = Math.floor(Math.random() * 1000) + 100; // Views between 100 and 1100
        
        setRating(initialRating);
        setViewCount(initialViews);
        
        // Save initial stats
        localStorage.setItem(statsKey, JSON.stringify({
          rating: initialRating,
          views: initialViews
        }));
      }
      
      // Check if user has already rated
      const userRatingKey = `${contentType}_user_rating_${contentId}`;
      const savedUserRating = localStorage.getItem(userRatingKey);
      if (savedUserRating) {
        setUserRating(parseFloat(savedUserRating));
        setUserRatingSubmitted(true);
      }
    };
    
    loadStats();
    
    // Increment view count
    const incrementViewCount = () => {
      const statsKey = `${contentType}_stats_${contentId}`;
      const savedStats = localStorage.getItem(statsKey) || '{}';
      const stats = JSON.parse(savedStats);
      
      const newStats = {
        ...stats,
        views: (stats.views || 0) + 1
      };
      
      localStorage.setItem(statsKey, JSON.stringify(newStats));
      setViewCount(newStats.views);
    };
    
    // Only increment view count once per session for this content
    const viewKey = `${contentType}_viewed_${contentId}`;
    if (!sessionStorage.getItem(viewKey)) {
      incrementViewCount();
      sessionStorage.setItem(viewKey, 'true');
    }
  }, [contentId, contentType]);

  const submitRating = (value: number) => {
    if (userRatingSubmitted) return;
    
    // Save user rating
    const userRatingKey = `${contentType}_user_rating_${contentId}`;
    localStorage.setItem(userRatingKey, value.toString());
    setUserRating(value);
    setUserRatingSubmitted(true);
    
    // Update content rating (weighted average)
    const statsKey = `${contentType}_stats_${contentId}`;
    const savedStats = localStorage.getItem(statsKey) || '{}';
    const stats = JSON.parse(savedStats);
    
    // Simple weighted average (existing rating + new rating) / 2
    const newRating = stats.rating ? (stats.rating + value) / 2 : value;
    
    const newStats = {
      ...stats,
      rating: newRating
    };
    
    localStorage.setItem(statsKey, JSON.stringify(newStats));
    setRating(newRating);
  };

  const renderStars = () => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= rating;
          const halfFilled = !filled && star <= rating + 0.5;
          
          return (
            <div 
              key={star}
              className="cursor-pointer"
              onClick={() => submitRating(star)}
              onMouseEnter={() => !userRatingSubmitted && setIsRatingHovered(true)}
              onMouseLeave={() => !userRatingSubmitted && setIsRatingHovered(false)}
            >
              {filled ? (
                <Star className="text-gold fill-gold w-4 h-4" />
              ) : halfFilled ? (
                <StarHalf className="text-gold fill-gold w-4 h-4" />
              ) : (
                <Star className="text-gray-300 w-4 h-4" />
              )}
            </div>
          );
        })}
        <span className="text-sm text-gray-500 mr-1">
          ({rating.toFixed(1)})
        </span>
        {userRatingSubmitted && (
          <span className="text-xs text-green-600 mr-2 flex items-center">
            <ThumbsUp className="w-3 h-3 ml-1" />
            تم التقييم
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2 text-sm">
      <div className="flex items-center">
        <span className="text-gray-600 ml-2">المشاهدات:</span>
        <span className="font-semibold">{viewCount.toLocaleString('ar-EG')}</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-600 ml-2">التقييم:</span>
        {renderStars()}
      </div>
    </div>
  );
};

export default ContentStats;
