import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import VideoPlayer from './components/VideoPlayer';
import { videos } from './data/videos';
import CountdownTimer from './components/CountdownTimer';
import Advertise from './pages/Advertise';
import CreateCampaign from './pages/CreateCampaign';
import Following from './pages/Following';
import Games from './pages/Games';
import Website from './pages/Website';
import Apps from './pages/Apps';
import Audio from './pages/Audio';
import Live from './pages/Live';
import Profile from './pages/Profile';
import Social from './pages/Social';
import Reports from './pages/Reports';
import Creator from './pages/Creator';
import Creating from './pages/Creating';
import Suggestions from './pages/Suggestions';
import Leaderboard from './pages/Leaderboard';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import Seller from './pages/Seller';
import Affiliate from './pages/Affiliate';
import Rates from './pages/Rates';

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [balance, setBalance] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [showEarningMessage, setShowEarningMessage] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
      setIsMobile(mobileRegex.test(userAgent) || window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let autoPlayTimer: number;
    
    if (autoPlay && isPlaying) {
      autoPlayTimer = window.setInterval(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      }, 60000); // Auto advance every 60 seconds
    }

    return () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
      }
    };
  }, [autoPlay, isPlaying]);

  const handleTimerComplete = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setBalance(prev => prev + 1);
    if (isMobile) {
      setShowEarningMessage(true);
      setTimeout(() => setShowEarningMessage(false), 2000); // Hide message after 2 seconds
    }
  };

  const MainContent = () => (
    <div className={`h-full flex items-center justify-center bg-black relative ${isMobile ? 'min-h-screen' : ''}`}>
      {/* Balance display - only on desktop */}
      {!isMobile && (
        <div className="fixed top-8 right-8 bg-black/90 rounded-xl backdrop-blur-md px-4 py-2 z-50">
          <span className="text-white font-bold">Balance: ${balance.toFixed(2)}</span>
        </div>
      )}

      {isMobile ? (
        // Mobile view - direct video player with centered timer
        <div className="w-full h-screen relative">
          <VideoPlayer 
            videos={videos} 
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            currentIndex={currentVideoIndex}
            setCurrentIndex={setCurrentVideoIndex}
          />
          
          {/* Centered timer on mobile */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-50">
            <div className="w-20 h-20 bg-black/90 rounded-full backdrop-blur-md flex items-center justify-center">
              <CountdownTimer 
                onComplete={handleTimerComplete}
                isPlaying={isPlaying}
              />
            </div>
            <p className="text-white text-xs mt-2 max-w-[120px] text-center opacity-80 bg-black/50 px-2 py-1 rounded-full">
              Earn $1.00
            </p>
          </div>

          {/* Earning message */}
          {showEarningMessage && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-full z-50 animate-fade-in-out">
              You earned $1.00!
            </div>
          )}

          {/* Auto-play toggle */}
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="absolute bottom-20 right-4 bg-black/90 rounded-full px-4 py-2 text-white text-sm z-50"
          >
            {autoPlay ? 'Auto-Play: On' : 'Auto-Play: Off'}
          </button>
        </div>
      ) : (
        // Desktop view - iOS simulator
        <div className="relative w-[390px] h-[844px] bg-white rounded-[55px] shadow-2xl overflow-hidden my-8 mx-auto">
          {/* Device frame */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-[47px] bg-black">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[157px] h-[34px] bg-black rounded-b-[24px]"></div>
            </div>
            
            {/* Status bar */}
            <div className="absolute top-0 inset-x-0 h-7 flex items-center justify-between px-8 text-white z-50">
              <span className="text-sm font-medium">9:03 PM</span>
              <div className="flex items-center space-x-1">
                <span className="text-sm">5G</span>
                <div className="w-6 h-3 flex items-center">
                  <div className="w-1 h-1.5 bg-white rounded-sm"></div>
                  <div className="w-1 h-2 bg-white rounded-sm mx-0.5"></div>
                  <div className="w-1 h-2.5 bg-white rounded-sm"></div>
                  <div className="w-1 h-3 bg-white rounded-sm ml-0.5"></div>
                </div>
              </div>
            </div>
            
            {/* Home indicator */}
            <div className="absolute bottom-0 inset-x-0 h-8 flex items-center justify-center">
              <div className="w-32 h-1 bg-black rounded-full"></div>
            </div>
          </div>
          
          {/* Content area */}
          <div className="absolute top-[47px] inset-x-0 bottom-8 bg-black">
            <VideoPlayer 
              videos={videos} 
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              currentIndex={currentVideoIndex}
              setCurrentIndex={setCurrentVideoIndex}
            />
          </div>

          {/* Timer and message container */}
          <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col items-center z-50 lg:right-12 xl:right-16 2xl:right-24">
            <div className="w-20 h-20 bg-black/90 rounded-full backdrop-blur-md flex items-center justify-center">
              <CountdownTimer 
                onComplete={handleTimerComplete}
                isPlaying={isPlaying}
              />
            </div>
            <p className="text-white text-xs mt-2 max-w-[120px] text-center opacity-80">
              Allow timer to finish to earn $1.00
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/cart" element={<Cart />} />
          <Route path="/shop/orders" element={<Orders />} />
          <Route path="/shop/checkout" element={<Checkout />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/following" element={<Following />} />
          <Route path="/social" element={<Social />} />
          <Route path="/games" element={<Games />} />
          <Route path="/website" element={<Website />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/live" element={<Live />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/advertise/create" element={<CreateCampaign />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/creator" element={<Creator />} />
          <Route path="/creating" element={<Creating />} />
          <Route path="/rates" element={<Rates />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;