
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { getRating, addRating, hasUserRated } from '@/lib/local-storage';

interface RatingControlProps {
  id: string;
  type: 'article' | 'statement' | 'book';
  onRatingChange?: (rating: { average: number; count: number }) => void;
  className?: string;
  showCount?: boolean;
  iconSize?: number;
}

const RatingControl = ({ 
  id, 
  type, 
  onRatingChange, 
  className = '', 
  showCount = true, 
  iconSize = 16 
}: RatingControlProps) => {
  const [rating, setRating] = useState({ average: 0, count: 0 });
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    // قراءة التقييم المخزن محليًا
    const storedRating = getRating(type, id);
    setRating(storedRating);
    
    // التحقق مما إذا كان المستخدم قد قام بالتقييم مسبقًا
    const userHasRated = hasUserRated(type, id);
    if (userHasRated) {
      setUserRating(storedRating.average);
    }
  }, [id, type]);

  const handleRating = (newRating: number) => {
    // إضافة تقييم جديد
    const updatedRating = addRating(type, id, newRating);
    setRating(updatedRating);
    setUserRating(newRating);
    
    // استدعاء المعالج إذا تم توفيره
    if (onRatingChange) {
      onRatingChange(updatedRating);
    }
  };

  // تنسيق عدد المقيمين بشكل أكثر قراءة
  const formatRatingCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className="mx-px focus:outline-none"
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`تقييم ${star} من 5`}
          >
            <Star
              size={iconSize}
              className={`
                ${star <= (hoverRating || userRating) ? "fill-gold text-gold" : "text-gray-300"}
                transition-colors duration-150
              `}
            />
          </button>
        ))}
      </div>
      
      {showCount && (
        <div className="flex items-center text-sm">
          <span className="text-gold font-medium ml-1">{rating.average.toFixed(1)}</span>
          <span className="text-gray-500">({formatRatingCount(rating.count)})</span>
        </div>
      )}
    </div>
  );
};

export default RatingControl;
