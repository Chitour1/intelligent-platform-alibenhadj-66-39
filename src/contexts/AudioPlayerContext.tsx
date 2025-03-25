
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioItem {
  id: string;
  title: string;
  source: string;
  thumbnail?: string;
  duration?: number;
}

interface AudioPlayerContextType {
  currentAudio: AudioItem | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playAudio: (audio: AudioItem) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  stopAudio: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  togglePlayPause: () => void;
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
  const [currentAudio, setCurrentAudio] = useState<AudioItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // إنشاء عنصر الصوت عند تحميل المكون
    audioRef.current = new Audio();
    
    // استماع إلى أحداث الصوت
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleDurationChange = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    
    // تنظيف عناصر الاستماع عند إزالة المكون
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);
  
  const playAudio = (audio: AudioItem) => {
    if (audioRef.current) {
      // إذا كان هناك صوت قيد التشغيل، أوقفه
      if (currentAudio && currentAudio.id === audio.id) {
        resumeAudio();
        return;
      }
      
      // تحميل الملف الصوتي الجديد
      audioRef.current.src = audio.source;
      audioRef.current.volume = volume;
      
      // تشغيل الصوت
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setCurrentAudio(audio);
      }).catch(error => {
        console.error('خطأ في تشغيل الصوت:', error);
      });
    }
  };
  
  const pauseAudio = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  
  const resumeAudio = () => {
    if (audioRef.current && !isPlaying && currentAudio) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error('خطأ في استئناف الصوت:', error);
      });
    }
  };
  
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };
  
  const setAudioVolume = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };
  
  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  
  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  };
  
  const value = {
    currentAudio,
    isPlaying,
    volume,
    currentTime,
    duration,
    playAudio,
    pauseAudio,
    resumeAudio,
    stopAudio,
    setVolume: setAudioVolume,
    seekTo,
    togglePlayPause
  };
  
  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
