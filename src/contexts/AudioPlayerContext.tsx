
import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { PlayCircle, PauseCircle, Volume2, X } from 'lucide-react';

interface AudioPlayerContextType {
  isPlaying: boolean;
  currentTrack: {
    id: string;
    title: string;
    speaker: string;
    url: string;
  } | null;
  playAudio: (id: string, title: string, speaker: string, url: string) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  stopAudio: () => void;
  seekTo: (time: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<{
    id: string;
    title: string;
    speaker: string;
    url: string;
  } | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    audioRef.current = audio;
    
    // Set up event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    
    return () => {
      // Clean up event listeners
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);
  
  // Update audio source when currentTrack changes
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.load();
      audioRef.current.play().catch(error => {
        console.error('خطأ في تشغيل الصوت:', error);
      });
      setIsPlaying(true);
      setShowPlayer(true);
    }
  }, [currentTrack]);
  
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
  };
  
  const handleError = (error: any) => {
    console.error('خطأ في تشغيل الصوت:', error);
    setIsPlaying(false);
  };
  
  const playAudio = (id: string, title: string, speaker: string, url: string) => {
    setCurrentTrack({ id, title, speaker, url });
  };
  
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const resumeAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('خطأ في استئناف تشغيل الصوت:', error);
      });
      setIsPlaying(true);
    }
  };
  
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setShowPlayer(false);
      setCurrentTrack(null);
    }
  };
  
  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  
  const getCurrentTime = () => {
    return currentTime;
  };
  
  const getDuration = () => {
    return duration;
  };
  
  // Format time in seconds to MM:SS format
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const getProgressPercentage = () => {
    if (duration === 0) return 0;
    return (currentTime / duration) * 100;
  };
  
  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        playAudio,
        pauseAudio,
        resumeAudio,
        stopAudio,
        seekTo,
        getCurrentTime,
        getDuration
      }}
    >
      {children}
      
      {/* Floating Audio Player */}
      {showPlayer && currentTrack && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 w-11/12 max-w-xl z-50 rtl:text-right">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-navy/10 rounded-full flex items-center justify-center">
                <Volume2 size={20} className="text-navy" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-navy-dark text-sm truncate">{currentTrack.title}</h4>
                <p className="text-xs text-gray-500">الشيخ {currentTrack.speaker}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={isPlaying ? pauseAudio : resumeAudio}
              >
                {isPlaying ? (
                  <PauseCircle size={24} className="text-navy" />
                ) : (
                  <PlayCircle size={24} className="text-navy" />
                )}
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={stopAudio}
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-2">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}
    </AudioPlayerContext.Provider>
  );
};
