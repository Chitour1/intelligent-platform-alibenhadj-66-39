
import React, { useEffect, useState } from 'react';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import { formatTime } from '../utils/formatTime';

const AudioPlayer: React.FC = () => {
  const { 
    currentAudio, 
    isPlaying, 
    pauseAudio, 
    resumeAudio, 
    currentTime, 
    duration, 
    seekTo, 
    volume,
    setVolume,
    stopAudio
  } = useAudioPlayer();
  
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(1);
  
  useEffect(() => {
    if (currentAudio) {
      setIsVisible(true);
    }
  }, [currentAudio]);
  
  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      resumeAudio();
    }
  };
  
  const handleSeek = (value: number[]) => {
    seekTo(value[0]);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0 && isMuted) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };
  
  const handleClose = () => {
    stopAudio();
    setIsVisible(false);
  };
  
  if (!isVisible || !currentAudio) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-navy text-white p-2 md:p-3 shadow-lg z-50 rounded-t-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {currentAudio.thumbnail && (
            <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 hidden sm:block">
              <img 
                src={currentAudio.thumbnail} 
                alt={currentAudio.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-sm sm:text-base truncate">{currentAudio.title}</h4>
            <div className="flex items-center text-xs text-gray-300 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-grow md:flex-grow-0 md:w-1/3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-navy-dark" 
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </Button>
          
          <div className="flex-1 px-2">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 1}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-navy-dark" 
            onClick={toggleMute}
          >
            {volume === 0 || isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </Button>
          
          <div className="w-20 hidden sm:block">
            <Slider
              value={[volume]}
              min={0}
              max={1}
              step={0.01}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
            />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-navy-dark ml-2" 
            onClick={handleClose}
          >
            <X size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
