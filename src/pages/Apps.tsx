import React from 'react';
import { Download } from 'lucide-react';
import EarningBanner from '../components/EarningBanner';

const Apps: React.FC = () => {
  const apps = [
    { id: 1, name: 'Photo Editor Pro', category: 'Photography', downloads: '1.2M', icon: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2' },
    { id: 2, name: 'Fitness Tracker', category: 'Health', downloads: '890K', icon: 'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2' },
    { id: 3, name: 'Music Player', category: 'Entertainment', downloads: '2.1M', icon: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <EarningBanner message="Install and try any app for 2 minutes to earn $1.00!" />
        <h1 className="text-3xl font-bold mb-8">Featured Apps</h1>
        
        <div className="grid gap-6">
          {apps.map(app => (
            <div key={app.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <img src={app.icon} alt={app.name} className="w-16 h-16 rounded-xl" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{app.name}</h3>
                  <p className="text-gray-400">{app.category}</p>
                  <p className="text-sm text-gray-500">{app.downloads} downloads</p>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Install</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Apps;