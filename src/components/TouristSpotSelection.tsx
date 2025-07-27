import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Users, ArrowRight, ArrowLeft, Filter } from 'lucide-react';
import { TOURIST_SPOTS, PREFECTURES } from '../data/touristSpots';
import { TouristSpot } from '../types/touristSpots';

interface TouristSpotSelectionProps {
  selectedPrefecture?: string;
}

const TouristSpotSelection: React.FC<TouristSpotSelectionProps> = ({ selectedPrefecture }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');

  const categories = [
    { id: 'all', name: '全て', icon: '🌟' },
    { id: 'landmark', name: 'ランドマーク', icon: '🗼' },
    { id: 'temple', name: '神社仏閣', icon: '⛩️' },
    { id: 'nature', name: '自然', icon: '🌸' },
    { id: 'entertainment', name: 'エンターテイメント', icon: '🎢' },
    { id: 'cultural', name: '文化・歴史', icon: '🏛️' },
    { id: 'modern', name: '現代建築', icon: '🏙️' }
  ];

  const getFilteredSpots = (): TouristSpot[] => {
    let spots = Object.values(TOURIST_SPOTS);
    
    // 都道府県でフィルター
    if (selectedPrefecture && selectedPrefecture !== 'all') {
      spots = spots.filter(spot => spot.prefecture === selectedPrefecture);
    }
    
    // カテゴリでフィルター
    if (selectedCategory !== 'all') {
      spots = spots.filter(spot => spot.category === selectedCategory);
    }
    
    // ソート
    spots.sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    
    return spots;
  };

  const handleSpotClick = (spotId: string) => {
    navigate(`/spot/${spotId}`);
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

  const filteredSpots = getFilteredSpots();
  const selectedPref = selectedPrefecture ? PREFECTURES[selectedPrefecture] : null;

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-deep-purple via-dark-purple to-cyber-blue text-white">
      {/* Header */}
      <div className="relative pt-20 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-white/60 hover:text-neon-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              ホームに戻る
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
                観光スポット
              </span>
            </h1>
            {selectedPref && (
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl mr-3">{selectedPref.icon}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {selectedPref.name}
                </h2>
              </div>
            )}
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {selectedPref ? selectedPref.description : '関東地方の魅力的な観光スポットを発見しよう'}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 mr-2 text-neon-blue" />
                <h3 className="text-lg font-semibold text-white">カテゴリ</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex flex-col items-center p-3 rounded-lg transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-neon-blue to-neon-green text-white shadow-lg'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    <span className="text-2xl mb-1">{category.icon}</span>
                    <span className="text-xs font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 mr-2 text-neon-blue" />
                <h3 className="text-lg font-semibold text-white">並び順</h3>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'name')}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
              >
                <option value="rating">評価順</option>
                <option value="name">名前順</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Spots Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-white/70">
            {filteredSpots.length}件のスポットが見つかりました
          </p>
        </div>

        {filteredSpots.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">スポットが見つかりませんでした</h3>
            <p className="text-white/60 mb-6">条件を変更して再度検索してください</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSortBy('rating');
              }}
              className="bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              フィルターをリセット
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpots.map((spot) => (
              <div
                key={spot.id}
                className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => handleSpotClick(spot.id)}
              >
                <div className="relative">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`bg-gradient-to-r ${getCategoryColor(spot.category)} px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center`}>
                      <span className="mr-1">{getCategoryIcon(spot.category)}</span>
                      {categories.find(c => c.id === spot.category)?.name || spot.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/60 backdrop-blur text-white px-2 py-1 rounded-full text-sm flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      {spot.rating}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{spot.name}</h3>
                      <p className="text-sm text-white/60">{spot.nameEn}</p>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm mb-4 line-clamp-2">
                    {spot.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-white/60">
                      <MapPin className="w-4 h-4 mr-2 text-neon-blue" />
                      {spot.location.station}駅
                    </div>
                    <div className="flex items-center text-sm text-white/60">
                      <Clock className="w-4 h-4 mr-2 text-neon-green" />
                      {spot.visitTime}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {spot.highlights.slice(0, 3).map((highlight, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/20 text-white text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-neon-green font-semibold">{spot.entrance.fee}</span>
                    </div>
                    <div className="flex items-center text-neon-blue hover:text-neon-green transition-colors">
                      <span className="text-sm font-semibold mr-1">詳細を見る</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TouristSpotSelection;