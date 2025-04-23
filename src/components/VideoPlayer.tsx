import React, { useRef, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Video } from '../types';
import { VideoInfo, VideoActions } from './VideoInfo';

interface VideoPlayerProps {
  videos: Video[];
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videos, 
  isPlaying, 
  setIsPlaying,
  currentIndex,
  setCurrentIndex
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVideo = videos[currentIndex];
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  }, [currentIndex, setIsPlaying]);
  
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {});
        }
      }
    }
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };
  
  return (
    <div className="relative h-full w-full bg-black overflow-hidden">
      <div 
        className="absolute inset-0 flex justify-center"
        onClick={handleVideoClick}
      >
        <video
          ref={videoRef}
          className="h-full object-cover"
          playsInline
          autoPlay
        >
          <source src={currentVideo.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Video controls overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <VideoInfo video={currentVideo} />
        <VideoActions video={currentVideo} />
        
        {/* Navigation buttons */}
        <button 
          className="absolute top-1/4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center pointer-events-auto"
          onClick={handlePrev}
        >
          <ChevronUp className="w-6 h-6 text-white" />
        </button>
        
        <button 
          className="absolute top-1/4 translate-y-12 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center pointer-events-auto"
          onClick={handleNext}
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </button>
      </div>
      
      {/* Play/Pause indicator */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isPlaying ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="w-20 h-20 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center">
          {isPlaying ? (
            <div className="w-5 h-16 flex space-x-2">
              <div className="w-2 h-full bg-white"></div>
              <div className="w-2 h-full bg-white"></div>
            </div>
          ) : (
            <div className="w-16 h-16 flex items-center justify-center">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;