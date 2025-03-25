
import { useState } from 'react';
import { statementsData } from '../utils/statementsData';
import StatementCard from '../components/StatementCard';
import { Search } from 'lucide-react';
import MetaTags from '../components/MetaTags';

const LatestStatements = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredStatements = statementsData.filter(statement => 
    statement.title.includes(searchQuery) || 
    statement.content.includes(searchQuery)
  );

  return (
    <div className="min-h-screen">
      <MetaTags 
        title="أحدث كلمات الشيخ علي بن حاج - موقع الشيخ علي بن حاج"
        description="متابعة مستمرة لأحدث الكلمات والمواقف للشيخ علي بن حاج"
        image="/lovable-uploads/b70984a3-8bb6-413d-8e5d-d0647fb60cb6.png"
        type="article"
      />
      
      {/* Hero Section */}
      <div className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">أحدث كلمات الشيخ علي بن حاج</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">متابعة مستمرة لأحدث الكلمات والمواقف للشيخ علي بن حاج</p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="ابحث في كلمات الشيخ..."
              className="w-full bg-white/10 border border-white/20 text-white rounded-md py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-gold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredStatements.length > 0 ? (
          <>
            {/* Featured Statement */}
            <div className="mb-12">
              <h2 className="section-title mb-6">أبرز الكلمات</h2>
              <StatementCard statement={filteredStatements[0]} featured={true} />
            </div>
            
            {/* All Statements */}
            <div>
              <h2 className="section-title mb-6">جميع الكلمات</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStatements.map(statement => (
                  <StatementCard key={statement.id} statement={statement} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">لا توجد نتائج</h3>
            <p className="text-gray-600">لم يتم العثور على أي كلمات تطابق بحثك. يرجى المحاولة بكلمات مختلفة.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestStatements;
