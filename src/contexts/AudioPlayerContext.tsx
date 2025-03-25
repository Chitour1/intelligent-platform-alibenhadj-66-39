
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

// تعريف نوع البيانات للمقطع الصوتي
interface AudioTrack {
  id: string;
  title: string;
  source: string;
  thumbnail?: string;
}

// تعريف واجهة السياق
interface AudioPlayerContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  playAudio: (track: AudioTrack) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  stopAudio: () => void;
  setVolume: (volume: number) => void;
  seekTo: (position: number) => void;
  toggleMute: () => void;
}

// إنشاء السياق مع قيمة افتراضية
const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

// مكون مزود السياق
export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [previousVolume, setPreviousVolume] = useState(0.7);
  const [duration, setDuration] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // إنشاء عنصر الصوت عند تحميل المكون
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    // تنظيف عند إلغاء تحميل المكون
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // تحديث تقدم التشغيل
  const updateProgress = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const audioDuration = audioRef.current.duration || 0;
      
      if (!isNaN(audioDuration)) {
        setProgress(currentTime / audioDuration);
        setDuration(audioDuration);
      }
      
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  // وظائف التحكم بالصوت
  const playAudio = (track: AudioTrack) => {
    // إذا كان هناك مقطع يتم تشغيله، أوقفه أولاً
    if (audioRef.current) {
      audioRef.current.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    setCurrentTrack(track);
    setShowPlayer(true);
    
    // تعيين المصدر الجديد وتشغيله
    if (audioRef.current) {
      audioRef.current.src = track.source;
      audioRef.current.load();
      
      audioRef.current.oncanplaythrough = () => {
        audioRef.current?.play()
          .then(() => {
            setIsPlaying(true);
            animationRef.current = requestAnimationFrame(updateProgress);
          })
          .catch((error) => {
            console.error("خطأ في تشغيل الصوت:", error);
          });
      };
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setProgress(0);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  };

  const pauseAudio = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const resumeAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          animationRef.current = requestAnimationFrame(updateProgress);
        })
        .catch((error) => {
          console.error("خطأ في استئناف تشغيل الصوت:", error);
        });
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTrack(null);
      setShowPlayer(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  };

  const changeVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (volume > 0) {
        setPreviousVolume(volume);
        changeVolume(0);
      } else {
        changeVolume(previousVolume);
      }
    }
  };

  const seekTo = (newProgress: number) => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      const newTime = newProgress * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(newProgress);
    }
  };

  // تحويل الثواني إلى تنسيق mm:ss
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        volume,
        playAudio,
        pauseAudio,
        resumeAudio,
        stopAudio,
        setVolume: changeVolume,
        seekTo,
        toggleMute
      }}
    >
      {children}
      
      {/* مشغل الصوت العائم */}
      {showPlayer && currentTrack && (
        <div className="fixed bottom-0 right-0 left-0 bg-navy-dark text-white p-4 shadow-lg z-50 animate-slide-up">
          <div className="max-w-6xl mx-auto flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4 space-x-reverse">
                {currentTrack.thumbnail && (
                  <img 
                    src={currentTrack.thumbnail} 
                    alt={currentTrack.title} 
                    className="h-12 w-12 rounded-md object-cover"
                  />
                )}
                <div className="max-w-xs lg:max-w-sm">
                  <h3 className="text-sm font-semibold truncate">{currentTrack.title}</h3>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 space-x-reverse">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-gold hover:bg-navy-light"
                  onClick={isPlaying ? pauseAudio : resumeAudio}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </Button>
                
                <div className="hidden md:flex items-center space-x-2 space-x-reverse">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-gold hover:bg-navy-light"
                    onClick={toggleMute}
                  >
                    {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </Button>
                  <div className="w-24">
                    <Slider
                      value={[volume * 100]}
                      max={100}
                      step={1}
                      onValueChange={(value) => changeVolume(value[0] / 100)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-gold hover:bg-navy-light"
                  onClick={stopAudio}
                >
                  <X size={20} />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-xs text-gray-400 min-w-[40px] text-left">
                {formatTime(progress * duration)}
              </span>
              <div className="flex-1">
                <Slider
                  value={[progress * 100]}
                  max={100}
                  step={0.1}
                  onValueChange={(value) => seekTo(value[0] / 100)}
                  className="cursor-pointer"
                />
              </div>
              <span className="text-xs text-gray-400 min-w-[40px] text-right">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      )}
    </AudioPlayerContext.Provider>
  );
};

// هوك لاستخدام سياق مشغل الصوت
export const useAudioPlayer = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
