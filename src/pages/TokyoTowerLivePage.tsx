import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  Star, 
  RefreshCw, 
  MessageCircle, 
  Calendar,
  Users,
  Camera,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { getTokyoTowerTweets } from '../services/tokyoTowerApi';
import { getTokyoTowerGoogleInfo } from '../services/googlePlacesApi';

interface Tweet {
  id: string;
  text: string;
  author: string;
  username: string;
  createdAt: string;
  likes: number;
  retweets: number;
  replies: number;
}

interface GooglePlaceInfo {
  name: string;
  rating: number;
  userRatingsTotal: number;
  isOpen: boolean;
  currentOpeningHours?: string[];
  reviews: Array<{
    author: string;
    rating: number;
    text: string;
    time: string;
  }>;
  photos: string[];
  website?: string;
  phoneNumber?: string;
}

const TokyoTowerLivePage: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [googleInfo, setGoogleInfo] = useState<GooglePlaceInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<'overview' | 'tweets' | 'reviews'>('overview');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tweetData, googleData] = await Promise.all([
        getTokyoTowerTweets(),
        getTokyoTowerGoogleInfo()
      ]);
      setTweets(tweetData);
      setGoogleInfo(googleData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('データの取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // 10分毎に自動更新
    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: string | Date) => {
    return new Date(date).toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (date: string | Date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}時間前`;
    } else {
      return `${diffMinutes}分前`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-purple via-dark-purple to-cyber-blue text-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-neon-pink/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-neon-blue/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => window.history.back()}
              className="mr-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition duration-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
              東京タワー ライブ情報
            </h1>
          </div>
          
          <div className="flex items-center space-x-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>最終更新: {formatTime(lastUpdated)}</span>
            </div>
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full hover:shadow-lg hover:shadow-neon-pink/50 transition duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              <span>更新</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
          {[
            { id: 'overview', label: '概要', icon: MapPin },
            { id: 'tweets', label: 'X投稿', icon: MessageCircle },
            { id: 'reviews', label: 'レビュー', icon: Star }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg transition duration-300 ${
                activeTab === id
                  ? 'bg-gradient-to-r from-neon-pink to-neon-purple text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <RefreshCw className="w-8 h-8 animate-spin text-neon-pink" />
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && googleInfo && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                    基本情報
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">営業状況</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        googleInfo.isOpen
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {googleInfo.isOpen ? '営業中' : '営業時間外'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">評価</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-semibold">{googleInfo.rating}</span>
                        </div>
                        <span className="text-white/60">({googleInfo.userRatingsTotal}件)</span>
                      </div>
                    </div>
                    
                    {googleInfo.phoneNumber && (
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">電話番号</span>
                        <span className="font-mono">{googleInfo.phoneNumber}</span>
                      </div>
                    )}
                    
                    {googleInfo.website && (
                      <div className="flex items-center justify-between">
                        <span className="text-white/80">ウェブサイト</span>
                        <a 
                          href={googleInfo.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-neon-blue hover:text-neon-pink transition duration-300"
                        >
                          <span>公式サイト</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Opening Hours */}
                {googleInfo.currentOpeningHours && (
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                      営業時間
                    </h2>
                    <div className="space-y-2">
                      {googleInfo.currentOpeningHours.map((hours, index) => (
                        <div key={index} className="text-white/80">
                          {hours}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tweets Tab */}
            {activeTab === 'tweets' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                  最新のX投稿 (直近2日)
                </h2>
                
                {tweets.length === 0 ? (
                  <div className="text-center py-12 text-white/60">
                    直近2日以内の投稿が見つかりませんでした
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {tweets.map((tweet) => (
                      <div key={tweet.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition duration-300">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-white">{tweet.author}</h3>
                            <p className="text-white/60 text-sm">@{tweet.username}</p>
                          </div>
                          <span className="text-white/60 text-sm">{getTimeAgo(tweet.createdAt)}</span>
                        </div>
                        
                        <p className="text-white/90 mb-4 leading-relaxed">{tweet.text}</p>
                        
                        <div className="flex items-center space-x-6 text-white/60 text-sm">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{tweet.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RefreshCw className="w-4 h-4" />
                            <span>{tweet.retweets}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>{tweet.likes}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && googleInfo && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                  最新のレビュー
                </h2>
                
                {googleInfo.reviews.length === 0 ? (
                  <div className="text-center py-12 text-white/60">
                    レビューが見つかりませんでした
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {googleInfo.reviews.map((review, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-white">{review.author}</h3>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-white/30'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-white/60 text-sm">{review.time}</span>
                        </div>
                        
                        <p className="text-white/90 leading-relaxed">{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TokyoTowerLivePage;