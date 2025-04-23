import React, { useState } from 'react';
import { Eye, Heart, MessageCircle, Share2, Users, Globe, Gamepad, Play, Download, Headphones, CheckCircle, XCircle, ImageIcon, ArrowRight, X } from 'lucide-react';

interface Submission {
  id: string;
  campaignId: string;
  campaignName: string;
  screenshot: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  type: 'video' | 'social' | 'game' | 'website' | 'app' | 'audio';
}

type Category = 'overview' | 'video' | 'social' | 'game' | 'website' | 'app' | 'audio';

const Reports: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('overview');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const stats = {
    totalViews: 125000,
    totalLikes: 45200,
    totalComments: 8900,
    totalShares: 12300,
    totalFollowers: 5600,
    websiteVisits: 15800,
    gameplayTime: '2,450 hours',
    liveViewers: 890,
    appInstalls: 3200,
    audioPlays: 18500
  };

  const submissions: Submission[] = [
    {
      id: '1',
      campaignId: 'c1',
      campaignName: 'Summer Gaming Campaign',
      screenshot: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'pending',
      submittedAt: '2024-03-20T10:30:00Z',
      type: 'game'
    },
    {
      id: '2',
      campaignId: 'c2',
      campaignName: 'Music Promotion',
      screenshot: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'approved',
      submittedAt: '2024-03-19T15:45:00Z',
      type: 'audio'
    },
    {
      id: '3',
      campaignId: 'c3',
      campaignName: 'App Download Drive',
      screenshot: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'rejected',
      submittedAt: '2024-03-18T09:15:00Z',
      type: 'app'
    },
    {
      id: '4',
      campaignId: 'c4',
      campaignName: 'Website Traffic Campaign',
      screenshot: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'pending',
      submittedAt: '2024-03-17T14:20:00Z',
      type: 'website'
    },
    {
      id: '5',
      campaignId: 'c5',
      campaignName: 'Social Media Growth',
      screenshot: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'approved',
      submittedAt: '2024-03-16T11:45:00Z',
      type: 'social'
    },
    {
      id: '6',
      campaignId: 'c6',
      campaignName: 'Video Views Campaign',
      screenshot: 'https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'pending',
      submittedAt: '2024-03-15T16:30:00Z',
      type: 'video'
    }
  ];

  const categories = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'video', label: 'Video', icon: Play },
    { id: 'social', label: 'Social', icon: Users },
    { id: 'game', label: 'Games', icon: Gamepad },
    { id: 'website', label: 'Websites', icon: Globe },
    { id: 'app', label: 'Apps', icon: Download },
    { id: 'audio', label: 'Audio', icon: Headphones }
  ];

  const StatCard = ({ icon: Icon, label, value, color, type }: { icon: any, label: string, value: string | number, color: string, type: Category }) => (
    <div className="bg-gray-800 rounded-lg p-6 transition-all hover:bg-gray-800/80">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-gray-400">{label}</p>
          <p className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        </div>
      </div>
      <button
        onClick={() => setSelectedCategory(type)}
        className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-center space-x-2"
      >
        <span>View Submissions</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );

  const handleApprove = (submission: Submission) => {
    console.log('Approved:', submission.id);
    setSelectedSubmission(null);
  };

  const handleReject = (submission: Submission) => {
    console.log('Rejected:', submission.id);
    setSelectedSubmission(null);
  };

  const filteredSubmissions = submissions.filter(
    submission => selectedCategory === 'overview' || submission.type === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Campaign Reports</h1>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as Category)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {selectedCategory === 'overview' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard icon={Eye} label="Total Views" value={stats.totalViews} color="bg-blue-500" type="video" />
              <StatCard icon={Heart} label="Total Likes" value={stats.totalLikes} color="bg-red-500" type="social" />
              <StatCard icon={MessageCircle} label="Total Comments" value={stats.totalComments} color="bg-green-500" type="social" />
              <StatCard icon={Share2} label="Total Shares" value={stats.totalShares} color="bg-purple-500" type="social" />
              <StatCard icon={Users} label="Total Followers" value={stats.totalFollowers} color="bg-yellow-500" type="social" />
              <StatCard icon={Globe} label="Website Visits" value={stats.websiteVisits} color="bg-indigo-500" type="website" />
              <StatCard icon={Gamepad} label="Total Gameplay Time" value={stats.gameplayTime} color="bg-pink-500" type="game" />
              <StatCard icon={Download} label="App Installs" value={stats.appInstalls} color="bg-teal-500" type="app" />
              <StatCard icon={Headphones} label="Audio Plays" value={stats.audioPlays} color="bg-violet-500" type="audio" />
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Performance Over Time</h2>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
                <p className="text-gray-400">Performance graph will be displayed here</p>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubmissions.map((submission) => (
              <div 
                key={submission.id} 
                className="bg-gray-800 rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="relative">
                  <img
                    src={submission.screenshot}
                    alt={`Screenshot for ${submission.campaignName}`}
                    className="w-full h-48 object-cover filter grayscale group-hover:grayscale-0 transition-all"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-8 h-8" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{submission.campaignName}</h3>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      submission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                      submission.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-400">
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {filteredSubmissions.length === 0 && (
              <div className="col-span-full text-center py-12 bg-gray-800 rounded-lg">
                <p className="text-gray-400">No submissions found for this category</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Submission Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full bg-gray-800 rounded-lg overflow-hidden relative">
            <button 
              onClick={() => setSelectedSubmission(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <img
              src={selectedSubmission.screenshot}
              alt={`Screenshot for ${selectedSubmission.campaignName}`}
              className="w-full h-auto"
            />
            
            <div className="p-6 bg-gray-800">
              <h3 className="text-xl font-semibold mb-2">{selectedSubmission.campaignName}</h3>
              <p className="text-gray-400 mb-4">
                Submitted on {new Date(selectedSubmission.submittedAt).toLocaleDateString()}
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => handleApprove(selectedSubmission)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleReject(selectedSubmission)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <XCircle className="w-5 h-5" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;