import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, ExternalLink, GitBranch as BrandTiktok, Facebook, Instagram, Youtube, Twitter, Linkedin, Pointer as Pinterest, Twitch } from 'lucide-react';
import EarningBanner from '../components/EarningBanner';

interface SocialPost {
  id: number;
  platform: 'tiktok' | 'facebook' | 'instagram' | 'youtube' | 'twitter' | 'linkedin' | 'pinterest' | 'twitch';
  username: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  avatar: string;
  image?: string;
  views?: number;
  followers?: number;
}

const Social: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPost['platform'] | 'all'>('all');

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: Heart },
    { id: 'tiktok', name: 'TikTok', icon: BrandTiktok },
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'youtube', name: 'YouTube', icon: Youtube },
    { id: 'twitter', name: 'Twitter', icon: Twitter },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin },
    { id: 'pinterest', name: 'Pinterest', icon: Pinterest },
    { id: 'twitch', name: 'Twitch', icon: Twitch }
  ];

  const posts: SocialPost[] = [
    {
      id: 1,
      platform: 'tiktok',
      username: '@dance_star',
      content: 'Check out my new dance routine! #dance #viral',
      likes: 1200,
      comments: 45,
      shares: 78,
      views: 15000,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      id: 2,
      platform: 'instagram',
      username: '@travel_guru',
      content: 'Beautiful sunset in Bali 🌅 #travel #wanderlust',
      likes: 3400,
      comments: 120,
      shares: 56,
      image: 'https://images.pexels.com/photos/2385210/pexels-photo-2385210.jpeg?auto=compress&cs=tinysrgb&w=800',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      id: 3,
      platform: 'youtube',
      username: '@tech_reviews',
      content: 'New iPhone Review - Everything you need to know!',
      likes: 5600,
      comments: 342,
      shares: 189,
      views: 45000,
      image: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=800',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      id: 4,
      platform: 'facebook',
      username: '@foodie_adventures',
      content: 'Made this amazing pasta from scratch! Recipe in comments 🍝 #cooking #homemade',
      likes: 890,
      comments: 67,
      shares: 23,
      image: 'https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=800',
      avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      id: 5,
      platform: 'twitter',
      username: '@tech_news',
      content: 'Breaking: Major tech announcement coming this afternoon! Stay tuned for updates... #tech #news',
      likes: 2300,
      comments: 145,
      shares: 890,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      id: 6,
      platform: 'linkedin',
      username: '@business_insights',
      content: 'Just published my latest article on emerging tech trends in 2025. Check it out! #business #technology',
      likes: 1500,
      comments: 89,
      shares: 234,
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    }
  ];

  const filteredPosts = selectedPlatform === 'all' 
    ? posts 
    : posts.filter(post => post.platform === selectedPlatform);

  const getPlatformColor = (platform: SocialPost['platform']) => {
    switch (platform) {
      case 'tiktok': return 'bg-pink-500';
      case 'facebook': return 'bg-blue-600';
      case 'instagram': return 'bg-purple-600';
      case 'youtube': return 'bg-red-600';
      case 'twitter': return 'bg-blue-400';
      case 'linkedin': return 'bg-blue-700';
      case 'pinterest': return 'bg-red-500';
      case 'twitch': return 'bg-purple-500';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 mb-8">
          <EarningBanner message="Like any post to earn $1.00!" />
          <EarningBanner message="Comment on any post to earn $1.00!" />
          <EarningBanner message="Share any post to earn $1.00!" />
        </div>

        {/* Platform Selection */}
        <div className="flex flex-wrap gap-4 mb-8">
          {platforms.map(platform => {
            const Icon = platform.icon;
            return (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id as SocialPost['platform'] | 'all')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedPlatform === platform.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{platform.name}</span>
              </button>
            );
          })}
        </div>
        
        <div className="space-y-6">
          {filteredPosts.map(post => (
            <div key={post.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <img src={post.avatar} alt={post.username} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{post.username}</h3>
                    <span className={`text-sm px-2 py-1 rounded-full ${getPlatformColor(post.platform)} bg-opacity-20`}>
                      {platforms.find(p => p.id === post.platform)?.name}
                    </span>
                  </div>
                  <p className="mt-2">{post.content}</p>
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Post content" 
                      className="mt-4 rounded-lg w-full object-cover max-h-96"
                    />
                  )}
                  {post.views && (
                    <p className="mt-2 text-sm text-gray-400">{post.views.toLocaleString()} views</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-700 mt-4 pt-4">
                <div className="flex space-x-6">
                  <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>{post.likes.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>{post.shares.toLocaleString()}</span>
                  </button>
                </div>
                <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors">
                  <span>View on {platforms.find(p => p.id === post.platform)?.name}</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 bg-gray-800 rounded-lg">
              <p className="text-gray-400">No posts found for this platform</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Social;