import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { Video } from '../types';

interface VideoInfoProps {
  video: Video;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-gradient-to-t from-black/80 to-transparent">
      <div className="flex items-start">
        <div className="mr-4 flex-shrink-0">
          <img 
            src={video.avatarUrl} 
            alt={video.username} 
            className="w-12 h-12 rounded-full border-2 border-white"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold">{video.username}</h3>
          <p className="text-white text-sm mt-1">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

const VideoActions: React.FC<VideoInfoProps> = ({ video }) => {
  return (
    <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6 z-10">
      <div className="flex flex-col items-center">
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </button>
        <span className="text-white text-xs mt-1">{formatNumber(video.likes)}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
        <span className="text-white text-xs mt-1">{formatNumber(video.comments)}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
          <Share2 className="w-6 h-6 text-white" />
        </button>
        <span className="text-white text-xs mt-1">{formatNumber(video.shares)}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
          <Bookmark className="w-6 h-6 text-white" />
        </button>
        <span className="text-white text-xs mt-1">Save</span>
      </div>
    </div>
  );
};

export { VideoInfo, VideoActions };