import { useState, useEffect, useRef } from 'react';
import { ArrowLeftCircle, ArrowRightCircle, Pause, Play, FileText, Book, Video, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import { statementsData } from '../utils/statementsData';
import { recentMediaItems } from '../utils/youtubeUtils';
import { booksData } from '../pages/Books';

interface TickerItem {
  id: number | string;
  title: string;
  type: 'statement' | 'book' | 'media' | 'article';
  date?: string;
  link: string;
  icon: JSX.Element;
}

const NewsTicker = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [tickerItems, setTickerItems] = useState<TickerItem[]>([]);
  const tickerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const statements = statementsData.slice(0, 3).map(statement => ({
      id: statement.id,
      title: statement.title,
      type: 'statement' as const,
      date: statement.date,
      link: `/statements/${statement.id}`,
      icon: <FileText size={16} className="ml-1 text-gold" />
    }));
    
    const books = booksData
      .sort((a, b) => {
        if (a.publicationDate && b.publicationDate) {
          return a.publicationDate > b.publicationDate ? -1 : 1;
        }
        return b.id - a.id;
      })
      .slice(0, 3)
      .map(book => ({
        id: book.id,
        title: book.title,
        type: 'book' as const,
        date: book.publicationDate || book.year,
        link: `/publications/books/${book.id}`,
        icon: <Book size={16} className="ml-1 text-navy" />
      }));
    
    const media = recentMediaItems.slice(0, 3).map(item => ({
      id: item.id,
      title: item.title,
      type: 'media' as const,
      date: item.date,
      link: item.videoId ? `/media/friday-meetings-video` : `/media`,
      icon: item.type === 'video' 
        ? <Video size={16} className="ml-1 text-red-500" /> 
        : <Mic size={16} className="ml-1 text-purple-500" />
    }));
    
    const allItems = [...statements, ...books, ...media];
    setTickerItems(allItems);
  }, []);

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const scrollLeft = () => {
    if (tickerRef.current) {
      tickerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tickerRef.current) {
      tickerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  if (tickerItems.length === 0) {
    return null;
  }
  
  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-md border-b border-gold/10">
      <div className="container mx-auto px-4 py-2 flex items-center">
        <div className="flex-shrink-0 bg-navy text-white px-3 py-1 rounded-md ml-3 font-bold text-sm">
          آخر المستجدات
        </div>
        
        <div className="relative flex-grow overflow-hidden mx-3">
          <div 
            ref={tickerRef}
            className={`flex whitespace-nowrap gap-6 animate-marquee`}
            style={{
              animationPlayState: isPaused ? 'paused' : 'running',
              animationDuration: '30s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDirection: 'alternate'
            }}
          >
            {[...Array(3)].map((_, index) => (
              tickerItems.map((item, itemIndex) => (
                <Link
                  key={`${index}-${item.type}-${item.id}-${itemIndex}`}
                  to={item.link}
                  className="inline-flex items-center hover:text-gold transition-colors group"
                >
                  {item.icon}
                  <span className="ml-1 text-sm group-hover:underline">{item.title}</span>
                  {item.date && <span className="text-xs text-gray-500 mr-1">({item.date})</span>}
                </Link>
              ))
            ))}
          </div>
          
          <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-l from-transparent to-white/90"></div>
          <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-r from-transparent to-white/90"></div>
        </div>
        
        <div className="flex-shrink-0 flex space-x-2 space-x-reverse">
          <button 
            onClick={togglePause}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isPaused ? "تشغيل الشريط" : "إيقاف الشريط"}
          >
            {isPaused ? <Play size={18} /> : <Pause size={18} />}
          </button>
          <button 
            onClick={scrollLeft}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="التمرير لليسار"
          >
            <ArrowLeftCircle size={18} />
          </button>
          <button 
            onClick={scrollRight}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="التمرير لليمين"
          >
            <ArrowRightCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
