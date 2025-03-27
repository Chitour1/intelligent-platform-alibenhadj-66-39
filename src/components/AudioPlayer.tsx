
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";

interface AudioPlayerProps {
  title: string;
  content: string;
  onPlayingChange?: (isPlaying: boolean) => void;
  onPlayingProgress?: (index: number, word: string) => void;
}

const AudioPlayer = ({ title, content, onPlayingChange, onPlayingProgress }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isLoading, setIsLoading] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const audioUrl = useRef<string | null>(null);
  const wordTimings = useRef<{start: number, end: number, word: string}[]>([]);
  
  // Clean up the audio URL when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl.current) {
        URL.revokeObjectURL(audioUrl.current);
      }
    };
  }, []);

  // Set up the interval for updating the progress
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime(audioRef.current?.currentTime || 0);
        
        // Update progress 
        if (audioRef.current) {
          const progressValue = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(progressValue);
          
          // Find current word based on time
          const currentTime = audioRef.current.currentTime;
          const wordIndex = wordTimings.current.findIndex(
            timing => currentTime >= timing.start && currentTime <= timing.end
          );
          
          if (wordIndex !== -1 && wordIndex !== currentWordIndex) {
            setCurrentWordIndex(wordIndex);
            onPlayingProgress?.(wordIndex, wordTimings.current[wordIndex].word);
          }
        }
      }, 50);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, onPlayingProgress]);

  // Notify parent component when playing state changes
  useEffect(() => {
    onPlayingChange?.(isPlaying);
  }, [isPlaying, onPlayingChange]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const generateSpeech = async () => {
    if (!window.speechSynthesis) {
      toast({
        title: "غير مدعوم",
        description: "متصفحك لا يدعم خاصية تحويل النص إلى كلام",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // For simplicity, we're using the Web Speech API
      // In a production app, you would use a service like Amazon Polly or Google TTS
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = title + ". " + content;
      utterance.lang = 'ar';
      utterance.rate = 0.9;
      
      // Create word timings (approximation for demo purposes)
      const words = (title + ". " + content).split(/\s+/);
      const avgWordDuration = 0.3; // Average seconds per word
      let currentTime = 0;
      
      wordTimings.current = words.map(word => {
        const wordLength = word.length;
        // Adjust duration based on word length
        const wordDuration = avgWordDuration * (0.5 + wordLength / 10);
        const timing = {
          start: currentTime,
          end: currentTime + wordDuration,
          word
        };
        currentTime += wordDuration;
        return timing;
      });
      
      // Use a temporary audio recorder to capture the speech
      // This is a mock implementation since browser APIs don't directly support this
      // In a production app, you would use a server-side TTS service
      const mockAudioBlob = await new Promise<Blob>((resolve) => {
        // Mock an audio blob (in production, this would be real audio data)
        setTimeout(() => {
          // Create a silent audio file for demonstration
          const sampleRate = 44100;
          const duration = currentTime + 1; // Total duration of all words plus buffer
          
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const arrayBuffer = audioCtx.createBuffer(1, sampleRate * duration, sampleRate);
          const channelData = arrayBuffer.getChannelData(0);
          
          // Generate a simple tone as a placeholder
          for (let i = 0; i < arrayBuffer.length; i++) {
            // Simple sine wave with very low volume
            channelData[i] = Math.sin(i * 0.01) * 0.01;
          }
          
          // Convert buffer to WAV
          const offlineCtx = new OfflineAudioContext(1, sampleRate * duration, sampleRate);
          const source = offlineCtx.createBufferSource();
          source.buffer = arrayBuffer;
          source.connect(offlineCtx.destination);
          source.start();
          
          offlineCtx.startRendering().then(renderedBuffer => {
            const wavBytes = bufferToWave(renderedBuffer, renderedBuffer.length);
            const blob = new Blob([wavBytes], { type: 'audio/wav' });
            resolve(blob);
          });
        }, 1000);
      });
      
      if (audioUrl.current) {
        URL.revokeObjectURL(audioUrl.current);
      }
      
      audioUrl.current = URL.createObjectURL(mockAudioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl.current;
        audioRef.current.load();
        setDuration(wordTimings.current[wordTimings.current.length - 1].end);
        
        // Actually play the speech synthesis for demo purposes
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error generating speech:', error);
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء تحويل النص إلى كلام",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to convert AudioBuffer to WAV
  const bufferToWave = (abuffer: AudioBuffer, len: number) => {
    const numOfChan = abuffer.numberOfChannels;
    const length = len * numOfChan * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    const channels = [];
    let sample = 0;
    let offset = 0;
    let pos = 0;

    // Write WAV header
    setUint32(0x46464952);          // "RIFF"
    setUint32(length - 8);          // file length - 8
    setUint32(0x45564157);          // "WAVE"
    setUint32(0x20746d66);          // "fmt " chunk
    setUint32(16);                  // length = 16
    setUint16(1);                   // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2);       // block-align
    setUint16(16);                  // 16-bit
    setUint32(0x61746164);          // "data" - chunk
    setUint32(length - pos - 4);    // chunk length

    // Write interleaved data
    for (let i = 0; i < abuffer.numberOfChannels; i++) {
      channels.push(abuffer.getChannelData(i));
    }

    while (pos < length) {
      for (let i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    function setUint16(data: number) {
      view.setUint16(pos, data, true);
      pos += 2;
    }

    function setUint32(data: number) {
      view.setUint32(pos, data, true);
      pos += 4;
    }

    return buffer;
  };

  const togglePlay = async () => {
    if (!audioRef.current?.src && !isLoading) {
      await generateSpeech();
    }
    
    if (audioRef.current?.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (audioRef.current && duration > 0) {
      const newTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setCurrentWordIndex(null);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-3 mb-4">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8 ml-2"
              onClick={togglePlay}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-navy"></div>
              ) : isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={skipBackward}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={skipForward}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-gray-500">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 ml-1"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <div className="w-20">
              <Slider
                value={[isMuted ? 0 : volume]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
              />
            </div>
          </div>
        </div>
        
        <div className="w-full">
          <Slider
            value={[progress]}
            min={0}
            max={100}
            step={0.1}
            onValueChange={handleProgressChange}
          />
        </div>
        
        <audio 
          ref={audioRef}
          onEnded={handleAudioEnded}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration);
            }
          }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
