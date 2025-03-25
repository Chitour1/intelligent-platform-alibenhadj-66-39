
import { Calendar, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Statement } from '../utils/statementsData';

interface StatementCardProps {
  statement: Statement;
  featured?: boolean;
}

const StatementCard = ({ statement, featured = false }: StatementCardProps) => {
  return (
    <div className={`card group ${featured ? 'lg:flex' : ''}`}>
      <div className={`overflow-hidden relative ${featured ? 'lg:w-1/2 aspect-video' : 'aspect-video'}`}>
        <img 
          src={statement.imageUrl} 
          alt={statement.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {statement.videoId && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white p-1 rounded-md text-xs flex items-center">
            <Video size={12} className="ml-1" />
            <span>كلمة مرئية</span>
          </div>
        )}
      </div>
      <div className={`p-4 ${featured ? 'lg:w-1/2 lg:p-6' : ''}`}>
        <div className="flex justify-between items-center mb-2">
          <span className="bg-gold/10 text-gold-dark px-2 py-1 rounded-md text-xs font-medium">
            {statement.category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar size={14} className="ml-1" />
            {statement.date}
          </div>
        </div>
        <Link to={`/statements/${statement.id}`}>
          <h3 className={`font-bold text-navy-dark hover:text-gold transition-colors duration-300 mb-2 line-clamp-2 ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
            {statement.title}
          </h3>
        </Link>
        <p className={`text-gray-600 line-clamp-3 mb-4 ${featured ? 'text-base' : 'text-sm'}`}>
          {statement.excerpt}
        </p>
        <Link 
          to={`/statements/${statement.id}`} 
          className="inline-flex items-center font-medium text-gold hover:text-gold-dark"
        >
          اقرأ المزيد
          <span className="ml-1">←</span>
        </Link>
      </div>
    </div>
  );
};

export default StatementCard;
