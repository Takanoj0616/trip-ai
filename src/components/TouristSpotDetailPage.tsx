import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Users, ArrowLeft, ArrowRight, Train, DollarSign } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';
import TweetCard from './TweetCard';
import TikTokVideoCard from './TikTokVideoCard';
import { TOURIST_SPOTS, PREFECTURES } from '../data/touristSpots';
import { getSpotTweets } from '../services/xApi';
import { getSpotTikTokVideos } from '../services/tiktokApi';
import type { Tweet, TikTokVideo } from '../types/api';

const TouristSpotDetailPage: React.FC = () => {
  const { spotId } = useParams<{ spotId: string }>();
  const navigate = useNavigate();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [tiktokVideos, setTiktokVideos] = useState<TikTokVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'tweets' | 'tiktok'>('tweets');

  const spot = spotId ? TOURIST_SPOTS[spotId] : null;
  const prefecture = spot ? PREFECTURES[spot.prefecture] : null;

  useEffect(() => {
    if (spot) {
      fetchSpotData(spot);
    } else {
      setLoading(false);
    }
  }, [spotId]);

  const fetchSpotData = async (spotData: typeof spot) => {
    if (!spotData) return;
    
    setLoading(true);
    try {
      const [tweetsResponse, tiktokResponse] = await Promise.all([
        getSpotTweets(spotData.keywords, spotData.hashtags),
        getSpotTikTokVideos(spotData.keywords, spotData.hashtags),
      ]);
      
      // Merge author data with tweets
      const tweetsWithAuthors = tweetsResponse.data.map(tweet => ({
        ...tweet,
        author: tweetsResponse.includes?.users?.find(user => user.id === tweet.author_id) || tweet.author || {
          id: tweet.author_id,
          name: 'Unknown User',
          username: 'unknown',
        }
      }));

      setTweets(tweetsWithAuthors);
      setTiktokVideos(tiktokResponse.videos);
    } catch (error) {
      console.error('Error fetching spot data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshData = () => {
    if (spot) {
      fetchSpotData(spot);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'landmark': return '🗼';
      case 'temple': return '⛩️';
      case 'nature': return '🌸';
      case 'entertainment': return '🎢';
      case 'cultural': return '🏛️';
      case 'modern': return '🏙️';
      default: return '📍';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'landmark': return 'from-red-500 to-pink-500';
      case 'temple': return 'from-orange-500 to-yellow-500';
      case 'nature': return 'from-green-500 to-emerald-500';
      case 'entertainment': return 'from-purple-500 to-pink-500';
      case 'cultural': return 'from-blue-500 to-indigo-500';
      case 'modern': return 'from-gray-500 to-slate-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'landmark': return 'ランドマーク';
      case 'temple': return '神社仏閣';
      case 'nature': return '自然';
      case 'entertainment': return 'エンターテイメント';
      case 'cultural': return '文化・歴史';
      case 'modern': return '現代建築';
      default: return category;
    }
  };

  if (!spot) {
    return (
      <div className="min-h-screen font-inter bg-gradient-to-br from-deep-purple via-dark-purple to-cyber-blue text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">スポットが見つかりません</h1>
          <Link
            to="/spots"
            className="bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            スポット一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-deep-purple via-dark-purple to-cyber-blue text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={spot.image}
            alt={spot.name}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-white/60">
              <Link to="/" className="hover:text-neon-blue transition-colors">ホーム</Link>
              <span>/</span>
              <Link to="/spots" className="hover:text-neon-blue transition-colors">観光スポット</Link>
              <span>/</span>
              {prefecture && (
                <>
                  <Link to={`/spots/${spot.prefecture}`} className="hover:text-neon-blue transition-colors">
                    {prefecture.name}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-white">{spot.name}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Spot Info */}
            <div>
              <div className="flex items-center mb-4">
                <span className={`bg-gradient-to-r ${getCategoryColor(spot.category)} px-4 py-2 rounded-full text-sm font-semibold text-white flex items-center mr-4`}>
                  <span className="mr-2">{getCategoryIcon(spot.category)}</span>
                  {getCategoryName(spot.category)}
                </span>
                {prefecture && (
                  <span className={`bg-gradient-to-r ${prefecture.color} px-3 py-1 rounded-full text-sm font-medium text-white flex items-center`}>
                    <span className="mr-1">{prefecture.icon}</span>
                    {prefecture.name}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-4">
                <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
                  {spot.name}
                </span>
              </h1>
              
              <p className="text-xl text-white/60 mb-6">{spot.nameEn}</p>
              
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                {spot.description}
              </p>

              {/* Rating and Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <Star className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-xl font-bold text-white">{spot.rating}</div>
                  <div className="text-xs text-white/60">評価</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-neon-blue" />
                  <div className="text-sm font-semibold text-white">{spot.visitTime}</div>
                  <div className="text-xs text-white/60">滞在時間</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-neon-green" />
                  <div className="text-sm font-semibold text-white">{spot.entrance.fee}</div>
                  <div className="text-xs text-white/60">入場料</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                  <Train className="w-6 h-6 mx-auto mb-2 text-neon-purple" />
                  <div className="text-sm font-semibold text-white">{spot.location.station}駅</div>
                  <div className="text-xs text-white/60">最寄駅</div>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">見どころ</h3>
                <div className="flex flex-wrap gap-3">
                  {spot.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 text-neon-blue rounded-full text-sm font-medium border border-neon-blue/30"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRefreshData}
                  disabled={loading}
                  className="bg-gradient-to-r from-neon-blue to-neon-green px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-neon-blue/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                >
                  <i className={`fas fa-sync-alt mr-2 ${loading ? 'animate-spin' : ''}`}></i>
                  {loading ? '更新中...' : '最新情報を取得'}
                </button>
                <button className="bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-neon-pink/30 transition-all duration-300 transform hover:scale-105">
                  <i className="fas fa-route mr-2"></i>
                  旅しおりに追加
                </button>
              </div>
            </div>

            {/* Spot Image */}
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
                <img 
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Information */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Access Information */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Train className="w-6 h-6 mr-2 text-neon-blue" />
                アクセス情報
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-white/60 mb-1">電車</div>
                  <div className="text-white">{spot.access.train}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">徒歩</div>
                  <div className="text-white">{spot.access.walking}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">住所</div>
                  <div className="text-white text-sm">{spot.location.address}</div>
                </div>
              </div>
            </div>

            {/* Visit Information */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-neon-green" />
                営業情報
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-white/60 mb-1">営業時間</div>
                  <div className="text-white">{spot.entrance.hours}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">入場料</div>
                  <div className="text-white">{spot.entrance.fee}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">ベストシーズン</div>
                  <div className="text-white">{spot.bestSeason.join('、')}</div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Users className="w-6 h-6 mr-2 text-neon-purple" />
                おすすめポイント
              </h3>
              <div className="space-y-2">
                {spot.tips.map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div className="text-white/80 text-sm">{tip}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Content */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
                {spot.name}
              </span>
              <span className="text-white"> の最新情報</span>
            </h2>
            <p className="text-white/70 text-lg">
              リアルタイムで投稿されている{spot.name}の情報をチェック
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 border border-white/20">
              <button
                onClick={() => setActiveTab('tweets')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'tweets'
                    ? 'bg-gradient-to-r from-neon-blue to-neon-green text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <i className="fab fa-twitter mr-2"></i>
                ツイート
              </button>
              <button
                onClick={() => setActiveTab('tiktok')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'tiktok'
                    ? 'bg-gradient-to-r from-electric-yellow to-neon-pink text-black shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <i className="fab fa-tiktok mr-2"></i>
                TikTok動画
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 animate-pulse">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full mr-3"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-white/20 rounded mb-2"></div>
                      <div className="h-3 bg-white/20 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-white/20 rounded"></div>
                    <div className="h-4 bg-white/20 rounded w-5/6"></div>
                    <div className="h-4 bg-white/20 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {activeTab === 'tweets' && (
                tweets.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tweets.map((tweet) => (
                      <TweetCard key={tweet.id} tweet={tweet} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🐦</div>
                    <h3 className="text-xl font-bold mb-2">ツイートが見つかりませんでした</h3>
                    <p className="text-white/60 mb-6">しばらく時間をおいてから再度お試しください</p>
                    <button
                      onClick={handleRefreshData}
                      className="bg-gradient-to-r from-neon-blue to-neon-green px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      再度取得する
                    </button>
                  </div>
                )
              )}

              {activeTab === 'tiktok' && (
                tiktokVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tiktokVideos.map((video) => (
                      <TikTokVideoCard key={video.id} video={video} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🎬</div>
                    <h3 className="text-xl font-bold mb-2">TikTok動画が見つかりませんでした</h3>
                    <p className="text-white/60 mb-6">しばらく時間をおいてから再度お試しください</p>
                    <button
                      onClick={handleRefreshData}
                      className="bg-gradient-to-r from-electric-yellow to-neon-pink px-6 py-3 rounded-full font-semibold text-black hover:shadow-lg transition-all duration-300"
                    >
                      再度取得する
                    </button>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </section>

      {/* Related Spots */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            同じエリアの他のスポット
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to={`/spots/${spot.prefecture}`}
              className="flex items-center justify-center bg-gradient-to-r from-neon-blue to-neon-green px-6 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-neon-blue/30 transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              {prefecture?.name}の他のスポットを見る
            </Link>
            <Link
              to="/spots/all"
              className="flex items-center justify-center bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-neon-pink/30 transition-all duration-300 transform hover:scale-105"
            >
              全てのスポットを見る
              <ArrowRight className="w-5 h-5 ml-3" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TouristSpotDetailPage;