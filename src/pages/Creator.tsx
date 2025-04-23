import React, { useState } from 'react';
import { Star, Link, Copy, CheckCircle, DollarSign } from 'lucide-react';

interface SocialMediaAccount {
  platform: string;
  url: string;
}

const Creator: React.FC = () => {
  const [socialAccounts, setSocialAccounts] = useState<SocialMediaAccount[]>([
    { platform: '', url: '' }
  ]);
  const [referralLink] = useState(`https://example.com/ref/${Math.random().toString(36).substring(2, 8)}`);
  const [copied, setCopied] = useState(false);
  const [revenueShare, setRevenueShare] = useState(10);

  const handleAccountChange = (index: number, field: keyof SocialMediaAccount, value: string) => {
    const newAccounts = [...socialAccounts];
    newAccounts[index] = { ...newAccounts[index], [field]: value };
    setSocialAccounts(newAccounts);
  };

  const addAccount = () => {
    setSocialAccounts([...socialAccounts, { platform: '', url: '' }]);
  };

  const removeAccount = (index: number) => {
    if (socialAccounts.length > 1) {
      const newAccounts = socialAccounts.filter((_, i) => i !== index);
      setSocialAccounts(newAccounts);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { socialAccounts, revenueShare });
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-yellow-500 rounded-full">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Become a Creator</h1>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Requirements</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Minimum 10,000 followers on any social media platform</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>At least 100,000 views on your content</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Active social media presence</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Social Media Accounts</h2>
            
            {socialAccounts.map((account, index) => (
              <div key={index} className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Platform</label>
                    <select
                      value={account.platform}
                      onChange={(e) => handleAccountChange(index, 'platform', e.target.value)}
                      className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Platform</option>
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                      <option value="youtube">YouTube</option>
                      <option value="twitter">Twitter</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Profile URL</label>
                    <input
                      type="url"
                      value={account.url}
                      onChange={(e) => handleAccountChange(index, 'url', e.target.value)}
                      className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://"
                      required
                    />
                  </div>
                </div>

                {socialAccounts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAccount(index)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove Account
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addAccount}
              className="text-blue-400 hover:text-blue-300 flex items-center space-x-2"
            >
              <span>+ Add Another Account</span>
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Revenue Sharing</h2>
            <div className="space-y-4">
              <p className="text-gray-400">Choose how much revenue you want to share with your sub-creators</p>
              
              <div className="flex flex-wrap gap-3">
                {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((percentage) => (
                  <button
                    key={percentage}
                    type="button"
                    onClick={() => setRevenueShare(percentage)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      revenueShare === percentage
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>{percentage}%</span>
                  </button>
                ))}
              </div>
              
              <p className="text-sm text-gray-400">
                You will share {revenueShare}% of your earnings with sub-creators who complete tasks through your referral
              </p>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Referral Link</h2>
            <div className="flex items-center space-x-4">
              <div className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3">
                <div className="flex items-center justify-between">
                  <a 
                    href={referralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors font-mono"
                  >
                    {referralLink}
                  </a>
                  <button
                    type="button"
                    onClick={copyReferralLink}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Share this link with other creators to earn {100 - revenueShare}% when they complete tasks
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default Creator;