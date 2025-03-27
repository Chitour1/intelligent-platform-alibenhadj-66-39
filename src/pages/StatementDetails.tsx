
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { statementsData } from '@/utils/statementsData';
import { ArrowRight, Calendar, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioPlayer from '@/components/AudioPlayer';
import ContentStats from '@/components/ContentStats';
import SocialShareButtons from '@/components/SocialShareButtons';
import { generateContentPdf } from '@/utils/pdfUtils';

const StatementDetails = () => {
  const { statementId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showFloatingPlayer, setShowFloatingPlayer] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show floating player when scrolled past the main player
      const scrollPosition = window.scrollY;
      setShowFloatingPlayer(scrollPosition > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find the statement by ID
  const statement = statementsData.find(statement => statement.id.toString() === statementId);
  
  // Handle case when statement isn't found
  if (!statement) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-navy mb-4">الكلمة غير موجودة</h1>
        <Button 
          variant="outline"
          onClick={() => navigate('/statements')}
          className="flex items-center"
        >
          العودة إلى الكلمات
          <ArrowRight className="mr-2" size={16} />
        </Button>
      </div>
    );
  }
  
  // Prepare the content for the audio player and highlighting
  const contentWords = (statement.title + ". " + statement.content).split(/\s+/);
  
  const handlePlayingProgress = (index: number) => {
    setHighlightedWordIndex(index);
  };
  
  const handlePlayingChange = (playing: boolean) => {
    setIsPlaying(playing);
    if (!playing) {
      setHighlightedWordIndex(null);
    }
  };
  
  const downloadPdf = () => {
    generateContentPdf(
      statement.title,
      statement.content,
      undefined,
      statement.date
    );
  };
  
  // Find related statements based on tags
  const relatedStatements = statementsData
    .filter(s => s.id !== statement.id && s.tags.some(tag => statement.tags.includes(tag)))
    .slice(0, 3);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/statements')}
            className="text-white mb-6 hover:bg-navy-light flex items-center"
          >
            <ArrowRight className="ml-2" size={18} />
            العودة إلى الكلمات
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{statement.title}</h1>
          <div className="flex items-center text-gray-300">
            <Calendar size={16} className="ml-2" />
            <span>{statement.date}</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ContentStats contentId={statementId || "1"} contentType="statement" />
        
        <div className="flex justify-between items-center my-4">
          <Button variant="outline" onClick={downloadPdf} className="flex items-center">
            <FileDown size={16} className="ml-2" />
            تحميل PDF
          </Button>
          <SocialShareButtons 
            title={statement.title} 
            text={`كلمة: ${statement.title}`} 
            compact 
          />
        </div>
        
        {/* Main Audio Player */}
        <AudioPlayer 
          title={statement.title}
          content={statement.content}
          onPlayingChange={handlePlayingChange}
          onPlayingProgress={handlePlayingProgress}
        />
        
        <article className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {statement.imageUrl && (
            <div className="mb-8 flex justify-center">
              <img 
                src={statement.imageUrl} 
                alt={statement.title} 
                className="max-w-full max-h-96 object-contain rounded-md"
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none text-right leading-relaxed" ref={contentRef}>
            {isPlaying ? (
              <div className="mb-4 leading-relaxed text-gray-700">
                {contentWords.map((word, index) => (
                  <span 
                    key={index}
                    className={`content-word ${highlightedWordIndex === index ? 'bg-gold/20 text-navy font-bold' : ''}`}
                  >
                    {word}{' '}
                  </span>
                ))}
              </div>
            ) : (
              statement.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6">
            {statement.tags.map((tag) => (
              <span key={tag} className="bg-navy/10 text-navy px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </article>
        
        {/* Related Statements */}
        {relatedStatements.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">كلمات ذات صلة</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedStatements.map((relatedStatement) => (
                <div 
                  key={relatedStatement.id} 
                  className="card hover:shadow-md transition-all"
                  onClick={() => navigate(`/statements/${relatedStatement.id}`)}
                >
                  <div className="p-4">
                    <p className="text-xs text-gray-500 mb-2">{relatedStatement.date}</p>
                    <h4 className="font-bold text-navy-dark hover:text-gold transition-colors line-clamp-2">
                      {relatedStatement.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Floating Audio Player */}
      {showFloatingPlayer && (
        <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
          <AudioPlayer 
            title={statement.title}
            content={statement.content}
            onPlayingChange={handlePlayingChange}
            onPlayingProgress={handlePlayingProgress}
            floating={true}
          />
        </div>
      )}
    </div>
  );
};

export default StatementDetails;
