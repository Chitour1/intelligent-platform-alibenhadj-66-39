
import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { getViews, incrementViews } from '@/lib/local-storage';

interface ViewCounterProps {
  id: string;
  type: 'article' | 'statement' | 'book';
  className?: string;
  iconSize?: number;
}

const ViewCounter = ({ id, type, className = '', iconSize = 16 }: ViewCounterProps) => {
  const [views, setViews] = useState(0);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    // قراءة عدد المشاهدات المخزن محليًا
    const storedViews = getViews(type, id);
    setViews(storedViews);

    // زيادة عدد المشاهدات مرة واحدة فقط عند تحميل الصفحة
    if (!hasIncremented) {
      const updatedViews = incrementViews(type, id);
      setViews(updatedViews);
      setHasIncremented(true);
    }
  }, [id, type, hasIncremented]);

  // تنسيق عدد المشاهدات بشكل أكثر قراءة
  const formatViews = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className={`flex items-center text-gray-600 ${className}`}>
      <Eye size={iconSize} className="ml-1" />
      <span className="text-sm">{formatViews(views)} مشاهدة</span>
    </div>
  );
};

export default ViewCounter;
