import React, { useState } from 'react';
import { X, Globe, Link, Image, Video, Music, Star } from 'lucide-react';
import { Wallet as WalletType, Transaction, Campaign } from '../types';
import AdvertiserVerification from '../components/AdvertiserVerification';

const campaignTypes = [
  { 
    id: 'ugc_video', 
    label: 'UGC Video', 
    description: 'Get creators to make user-generated content videos',
    reward: 10,
    requirements: [
      'Video length: 30-60 seconds',
      'High-quality footage',
      'Clear audio',
      'Original content only',
      'Follow brand guidelines'
    ]
  },
  { 
    id: 'freestyle_music', 
    label: 'Freestyle Music', 
    description: 'Get creators to make freestyle music videos',
    reward: 5,
    requirements: [
      'Video length: 15-30 seconds',
      'Original freestyle content',
      'Clear audio quality',
      'Appropriate content',
      'Follow music guidelines'
    ]
  },
  { 
    id: 'review', 
    label: 'Product Review', 
    description: 'Get authentic product reviews from creators',
    reward: 10,
    requirements: [
      'Video length: 2-5 minutes',
      'Honest feedback',
      'Show product details',
      'Demonstrate usage',
      'Include pros and cons'
    ]
  },
  { id: 'watch_video', label: 'Watch Video', description: 'Get users to watch your video content' },
  { id: 'social_media', label: 'Social Media', description: 'Promote your social media presence' },
  { id: 'h5_game', label: 'H5 Game', description: 'Promote your HTML5 game' },
  { id: 'website', label: 'Website', description: 'Drive traffic to your website' },
  { id: 'app_install', label: 'App Install', description: 'Promote your mobile app' }
];

const regions = [
  { id: 'na', name: 'North America', countries: ['US', 'CA', 'MX'] },
  { id: 'sa', name: 'South America', countries: ['BR', 'AR', 'CO', 'PE', 'CL'] },
  { id: 'eu', name: 'Europe', countries: ['GB', 'DE', 'FR', 'IT', 'ES'] },
  { id: 'af', name: 'Africa', countries: ['ZA', 'NG', 'KE', 'EG', 'MA'] },
  { id: 'as', name: 'Asia', countries: ['CN', 'JP', 'KR', 'IN', 'ID'] }
];

const Advertise: React.FC = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [wallet, setWallet] = useState<WalletType>({
    id: '1',
    balance: 0,
    currency: 'USD',
    transactions: []
  });

  const [amount, setAmount] = useState('');
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [budget, setBudget] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [mediaUrl, setMediaUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [requirements, setRequirements] = useState<string[]>([]);
  const [reward, setReward] = useState<number>(0);

  const handleDeposit = () => {
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: depositAmount,
      type: 'deposit',
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    setWallet(prev => ({
      ...prev,
      balance: prev.balance + depositAmount,
      transactions: [newTransaction, ...prev.transactions]
    }));

    setAmount('');
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType || !campaignName || !budget || selectedRegions.length === 0) return;

    const campaignBudget = parseFloat(budget);
    if (isNaN(campaignBudget) || campaignBudget <= 0 || campaignBudget > wallet.balance) return;

    const campaign: Campaign = {
      id: Date.now().toString(),
      type: selectedType as Campaign['type'],
      name: campaignName,
      budget: campaignBudget,
      targetCountries: selectedRegions,
      status: 'draft',
      mediaUrl,
      thumbnailUrl,
      requirements,
      reward
    };

    console.log('Created campaign:', campaign);

    setSelectedType('');
    setCampaignName('');
    setBudget('');
    setSelectedRegions([]);
    setMediaUrl('');
    setThumbnailUrl('');
    setRequirements([]);
    setReward(0);
    setShowCampaignForm(false);
  };

  const handleTypeSelect = (typeId: string) => {
    const campaignType = campaignTypes.find(type => type.id === typeId);
    setSelectedType(typeId);
    if (campaignType?.requirements) {
      setRequirements(campaignType.requirements);
    }
    if (campaignType?.reward) {
      setReward(campaignType.reward);
    }
    setShowCampaignForm(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ugc_video':
        return <Video className="w-6 h-6 text-blue-400" />;
      case 'freestyle_music':
        return <Music className="w-6 h-6 text-purple-400" />;
      case 'review':
        return <Star className="w-6 h-6 text-yellow-400" />;
      default:
        return null;
    }
  };

  if (!isVerified) {
    return <AdvertiserVerification onVerified={() => setIsVerified(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-bold">Advertising Center</h1>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-400">Available Balance</p>
            <p className="text-2xl font-bold">${wallet.balance.toFixed(2)}</p>
          </div>
        </div>

        {/* Wallet Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Fund Your Wallet</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount"
                min="1"
                step="0.01"
              />
              <button
                onClick={handleDeposit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
              >
                Add Funds
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="font-medium text-gray-300">Recent Transactions</h3>
            <div className="grid gap-4">
              {wallet.transactions.slice(0, 3).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {transaction.type === 'deposit' ? 'Deposit' : 'Campaign Spend'}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(transaction.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`font-semibold ${
                    transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))}
              {wallet.transactions.length === 0 && (
                <p className="text-center text-gray-400 py-4">No transactions yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Campaign Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaignTypes.map((type) => (
            <div
              key={type.id}
              className="p-6 rounded-lg border border-gray-700 hover:border-blue-500 cursor-pointer transition-all bg-gray-800 hover:bg-gray-800/80"
            >
              <div className="flex items-center space-x-3 mb-3">
                {getTypeIcon(type.id)}
                <h3 className="text-lg font-semibold">{type.label}</h3>
              </div>
              <p className="text-gray-400 mb-3">{type.description}</p>
              {type.reward && (
                <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm inline-block mb-4">
                  Creator Reward: ${type.reward}
                </div>
              )}
              <button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                onClick={() => handleTypeSelect(type.id)}
              >
                Create Campaign
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Creation Modal */}
      {showCampaignForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="relative bg-gray-800 rounded-lg w-full max-w-4xl my-8">
            <div className="sticky top-0 bg-gray-800 rounded-t-lg border-b border-gray-700 p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Create Campaign</h2>
                <button 
                  onClick={() => setShowCampaignForm(false)}
                  className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleCreateCampaign} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Name</label>
                  <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter campaign name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Budget (USD)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter budget amount"
                    min="1"
                    max={wallet.balance}
                    step="0.01"
                    required
                  />
                </div>

                {['ugc_video', 'freestyle_music', 'review'].includes(selectedType) && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Requirements</label>
                    <div className="bg-gray-700 rounded-lg p-4 space-y-2">
                      {requirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-300">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {['ugc_video', 'freestyle_music'].includes(selectedType) && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Reference Video URL</label>
                    <div className="flex items-center space-x-2">
                      <Link className="w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter reference video URL"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Thumbnail</label>
                  <div className="flex items-center space-x-2">
                    <Image className="w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={thumbnailUrl}
                      onChange={(e) => setThumbnailUrl(e.target.value)}
                      className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter thumbnail image URL"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Target Regions</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {regions.map((region) => (
                      <label
                        key={region.id}
                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          selectedRegions.includes(region.id)
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selectedRegions.includes(region.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedRegions(prev => [...prev, region.id]);
                            } else {
                              setSelectedRegions(prev => prev.filter(id => id !== region.id));
                            }
                          }}
                        />
                        <Globe className="w-5 h-5 mr-3" />
                        <div>
                          <p className="font-medium">{region.name}</p>
                          <p className="text-sm text-gray-400">{region.countries.length} countries</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 pt-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    disabled={!selectedType || !campaignName || !budget || selectedRegions.length === 0}
                  >
                    Create Campaign
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Advertise;