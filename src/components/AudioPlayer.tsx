
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  text: string;
  title?: string;
  onClose: () => void;
}

const AudioPlayer = ({ text, title, onClose }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<number | null>(null);
  const previousVolumeRef = useRef<number>(volume);

  // تهيئة مشغل الصوت
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.lang = 'ar';
      utterance.text = text;
      utterance.rate = 0.9; // سرعة النطق
      
      // تحديد صوت عربي إذا كان متاحًا
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(voice => voice.lang.includes('ar'));
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }

      // تقدير المدة (تقريبي - لأن SpeechSynthesis لا يوفر مدة دقيقة)
      setDuration(text.length * 50); // تقدير تقريبي: 50 مللي ثانية لكل حرف
      
      utteranceRef.current = utterance;
      
      utterance.onstart = () => {
        setIsPlaying(true);
        startProgressInterval();
      };
      
      utterance.onpause = () => {
        setIsPaused(true);
        setIsPlaying(false);
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
      
      utterance.onresume = () => {
        setIsPaused(false);
        setIsPlaying(true);
        startProgressInterval();
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setProgress(0);
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
      
      utterance.onboundary = (event) => {
        // تحديث التقدم عند كل حد نصي (كلمة أو جملة)
        if (event.charIndex) {
          const progressValue = (event.charIndex / text.length) * 100;
          setProgress(progressValue);
          setCurrentTime((progressValue / 100) * duration);
        }
      };
      
      // عند الخروج من الصفحة، توقف الصوت
      return () => {
        stopSpeech();
      };
    }
  }, [text, duration]);

  // استجابة للتغييرات في قائمة الأصوات المتاحة
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const handleVoicesChanged = () => {
        if (utteranceRef.current) {
          const voices = window.speechSynthesis.getVoices();
          const arabicVoice = voices.find(voice => voice.lang.includes('ar'));
          if (arabicVoice) {
            utteranceRef.current.voice = arabicVoice;
          }
        }
      };

      // محاولة أولى للحصول على الأصوات
      handleVoicesChanged();

      // الاستماع لتغيرات الأصوات المتاحة
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }
  }, []);

  // بدء التشغيل
  const startSpeech = () => {
    if (utteranceRef.current && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // إيقاف أي صوت قيد التشغيل
      window.speechSynthesis.cancel();
      
      // تعيين مستوى الصوت
      utteranceRef.current.volume = volume / 100;
      
      // بدء التشغيل
      window.speechSynthesis.speak(utteranceRef.current);
      setExpanded(true);
    }
  };

  // إيقاف التشغيل
  const pauseSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  };

  // استئناف التشغيل
  const resumeSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  };

  // إيقاف التشغيل نهائيًا
  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  // تبديل حالة التشغيل
  const togglePlayPause = () => {
    if (isPlaying) {
      pauseSpeech();
    } else if (isPaused) {
      resumeSpeech();
    } else {
      startSpeech();
    }
  };

  // تبديل كتم الصوت
  const toggleMute = () => {
    if (!utteranceRef.current) return;
    
    if (isMuted) {
      setVolume(previousVolumeRef.current);
      utteranceRef.current.volume = previousVolumeRef.current / 100;
    } else {
      previousVolumeRef.current = volume;
      setVolume(0);
      utteranceRef.current.volume = 0;
    }
    
    setIsMuted(!isMuted);
  };

  // تغيير مستوى الصوت
  const handleVolumeChange = (newVolume: number[]) => {
    if (!utteranceRef.current) return;
    
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    utteranceRef.current.volume = volumeValue / 100;
    
    if (volumeValue === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // بدء تحديث الشريط بشكل دوري
  const startProgressInterval = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    // تحديث كل 200 مللي ثانية
    intervalRef.current = window.setInterval(() => {
      // زيادة التقدم بشكل تدريجي (تقريبي)
      setCurrentTime(prev => {
        const newTime = prev + 0.2;
        if (newTime >= duration) {
          if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
          }
          return duration;
        }
        return newTime;
      });
      
      setProgress(prev => {
        const newProgress = prev + (0.2 / duration) * 100;
        return Math.min(newProgress, 100);
      });
    }, 200);
  };

  // تنسيق الوقت
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // إغلاق المشغّل
  const handleClose = () => {
    stopSpeech();
    onClose();
  };

  // في حالة عدم دعم المتصفح للخاصية
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-navy/90 text-white p-3 text-center">
        متصفحك لا يدعم تحويل النص إلى صوت.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-navy/90 text-white transition-all shadow-lg z-50",
        expanded ? "p-4" : "p-2",
        "backdrop-blur-sm border-t border-white/10"
      )}
    >
      <div className="max-w-4xl mx-auto">
        {/* الشريط المصغّر */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
            
            <span className="text-sm font-medium truncate max-w-[150px] sm:max-w-[300px]">
              {title || "جاري قراءة النص..."}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "تصغير" : "توسيع"}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={toggleMute}
            >
              {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={handleClose}
            >
              <X size={20} />
            </Button>
          </div>
        </div>
        
        {/* الشريط الموسّع */}
        {expanded && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs">{formatTime(currentTime / 1000)}</span>
              <Slider
                className="flex-1"
                value={[progress]}
                disabled
              />
              <span className="text-xs">{formatTime(duration / 1000)}</span>
            </div>
            
            <div className="flex items-center gap-3 pt-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={toggleMute}
              >
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
              
              <Slider
                className="w-28"
                value={[volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
