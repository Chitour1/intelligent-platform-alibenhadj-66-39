
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Eye, Copy, Share2, Volume2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { statements } from '../utils/statementsData';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

const StatementDetails = () => {
  const { statementId } = useParams();
  const [statement, setStatement] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { playAudio } = useAudioPlayer();
  
  useEffect(() => {
    // Get statement data based on statementId
    try {
      const foundStatement = statements.find(s => s.id === Number(statementId));
      if (foundStatement) {
        setStatement(foundStatement);
      } else {
        setError("لم يتم العثور على البيان المطلوب.");
      }
    } catch (error) {
      setError("حدث خطأ أثناء تحميل البيان.");
    } finally {
      setLoading(false);
    }
  }, [statementId]);

  const handleCopy = () => {
    if (contentRef.current) {
      const text = contentRef.current.textContent;
      navigator.clipboard.writeText(text || "");
      alert("تم نسخ المحتوى إلى الحافظة");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: statement?.title,
        text: statement?.excerpt,
        url: window.location.href,
      }).catch((error) => console.log('خطأ أثناء المشاركة:', error));
    } else {
      alert("المشاركة غير متاحة في هذا المتصفح");
    }
  };
  
  // Play audio version of the statement
  const playAudioOnly = () => {
    if (statement?.audioUrl) {
      // Play the audio from the statement
      playAudio(
        `statement-${statement.id}`,
        statement.title,
        "علي بن حاج",
        statement.audioUrl
      );
    } else {
      alert("لا يوجد محتوى صوتي متاح لهذا البيان");
    }
  };

  if (loading) {
    return <div className="section-container text-center py-20">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="section-container text-center py-20 text-red-500">{error}</div>;
  }

  if (!statement) {
    return <div className="section-container text-center py-20">لم يتم العثور على البيان المطلوب.</div>;
  }

  return (
    <div className="section-container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link 
            to="/statements" 
            className="text-navy hover:text-navy-dark flex items-center gap-2 text-sm"
          >
            <ArrowRight size={16} />
            العودة إلى البيانات
          </Link>
        </div>
        
        {/* Statement Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-navy mb-4">{statement.title}</h1>
          
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{statement.date}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>وقت القراءة: {statement.readTime || "5 دقائق"}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{statement.views || "542"} مشاهدة</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleCopy}
              >
                <Copy size={14} />
                نسخ
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleShare}
              >
                <Share2 size={14} />
                مشاركة
              </Button>
              
              {statement.audioUrl && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 text-navy"
                  onClick={playAudioOnly}
                >
                  <Volume2 size={14} />
                  استمع (صوت فقط)
                </Button>
              )}
            </div>
          </div>
          
          {statement.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img 
                src={statement.image} 
                alt={statement.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
        
        {/* Statement Content */}
        <div 
          ref={contentRef} 
          className="prose prose-lg max-w-none font-droid-kufi leading-relaxed text-gray-800"
        >
          <p className="text-xl font-bold text-navy mb-4">{statement.excerpt}</p>
          
          {/* Statement full content using HTML */}
          <div dangerouslySetInnerHTML={{ __html: statement.content }} />
        </div>
      </div>
    </div>
  );
};

export default StatementDetails;
