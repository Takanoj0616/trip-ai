import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Star, 
  Clock, 
  Utensils, 
  ShoppingBag, 
  Camera,
  ChevronDown,
  ChevronUp,
  Heart,
  ExternalLink,
  Phone,
  Globe,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { 
  getNearbyRecommendations, 
  NearbyPlace,
  checkOpenAIApiKey 
} from '../services/openaiRecommendations';

interface NearbyRecommendationsProps {
  locationName: string;
  locationCategory: string;
  locationAddress?: string;
}

const NearbyRecommendations: React.FC<NearbyRecommendationsProps> = ({ 
  locationName, 
  locationCategory,
  locationAddress 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'restaurant' | 'shopping' | 'attraction'>('restaurant');
  const [nearbyPlaces, setNearbyPlaces] = useState<{ [key: string]: NearbyPlace[] }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    setHasApiKey(checkOpenAIApiKey());
  }, []);

  const loadRecommendations = async () => {
    if (!hasApiKey) {
      setError('OpenAI APIキーが設定されていません');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const recommendations = await getNearbyRecommendations({
        locationName,
        locationAddress,
        locationCategory,
        categories: ['restaurant', 'shopping', 'attraction']
      });
      
      setNearbyPlaces(recommendations);
    } catch (err) {
      console.error('Failed to load recommendations:', err);
      setError('おすすめ情報の取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    
    // 初回展開時にデータを取得
    if (!isExpanded && Object.keys(nearbyPlaces).length === 0 && hasApiKey) {
      loadRecommendations();
    }
  };


  const filteredPlaces = nearbyPlaces[activeTab] || [];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'restaurant': return <Utensils className="w-4 h-4" />;
      case 'shopping': return <ShoppingBag className="w-4 h-4" />;
      case 'attraction': return <Camera className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };


  const getPriceLevelIndicator = (level?: number) => {
    if (!level) return '';
    return '¥'.repeat(level);
  };

  return (
    <div className="mt-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
      <button
        onClick={handleExpand}
        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-white">周辺のおすすめスポット</h4>
            <p className="text-sm text-white/60">近くの人気グルメ・ショッピング・観光地</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-white/60" />
        ) : (
          <ChevronDown className="w-5 h-5 text-white/60" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          {/* エラー表示 */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400">{error}</span>
                {hasApiKey && (
                  <button
                    onClick={loadRecommendations}
                    className="ml-auto text-xs text-red-400 hover:text-red-300 underline"
                  >
                    再試行
                  </button>
                )}
              </div>
              {!hasApiKey && (
                <p className="text-xs text-red-300 mt-2">
                  .envファイルにVITE_OPENAI_API_KEYを設定してください
                </p>
              )}
            </div>
          )}

          {/* ローディング表示 */}
          {isLoading && (
            <div className="mb-4 flex items-center justify-center py-8">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 animate-spin text-neon-blue" />
                <span className="text-white/70">AIが周辺のおすすめを検索中...</span>
              </div>
            </div>
          )}

          {/* タブナビゲーション */}
          {!isLoading && (
            <div className="flex items-center space-x-2 mb-4">
              {[
                { id: 'restaurant', label: 'グルメ', icon: Utensils },
                { id: 'shopping', label: 'ショッピング', icon: ShoppingBag },
                { id: 'attraction', label: '観光スポット', icon: Camera }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as 'restaurant' | 'shopping' | 'attraction')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm transition duration-300 ${
                    activeTab === id
                      ? 'bg-gradient-to-r from-neon-purple to-neon-pink text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          )}

          {/* おすすめスポット一覧 */}
          {!isLoading && (
            <div className="space-y-3">
              {filteredPlaces.map((place) => (
              <div key={place.id} className="bg-white/5 rounded-lg p-4 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-start space-x-4">
                  {/* 画像 */}
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    {getCategoryIcon(place.category)}
                  </div>
                  
                  {/* 情報 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-semibold text-white truncate">{place.name}</h5>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-sm text-white/80">{place.rating}</span>
                          </div>
                          {place.priceLevel && (
                            <span className="text-sm text-neon-green">
                              {getPriceLevelIndicator(place.priceLevel)}
                            </span>
                          )}
                          <span className="text-sm text-white/60">•</span>
                          <span className="text-sm text-white/60">{place.distance}</span>
                        </div>
                      </div>
                      <button className="p-1 hover:bg-white/20 rounded transition-colors">
                        <ExternalLink className="w-4 h-4 text-white/60" />
                      </button>
                    </div>

                    <p className="text-sm text-white/70 mb-3 line-clamp-2">
                      {place.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-white/60">
                        {place.hours && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{place.hours}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate max-w-32">{place.address}</span>
                        </div>
                      </div>
                      
                      {place.specialFeatures && (
                        <div className="flex flex-wrap gap-1">
                          {place.specialFeatures.slice(0, 2).map((feature, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-neon-purple/20 text-neon-purple text-xs rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 連絡先情報 */}
                    {(place.phone || place.website) && (
                      <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-white/10">
                        {place.phone && (
                          <a
                            href={`tel:${place.phone}`}
                            className="flex items-center space-x-1 text-xs text-neon-blue hover:text-neon-blue/80 transition-colors"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{place.phone}</span>
                          </a>
                        )}
                        {place.website && (
                          <a
                            href={place.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-xs text-neon-blue hover:text-neon-blue/80 transition-colors"
                          >
                            <Globe className="w-3 h-3" />
                            <span>ウェブサイト</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

              {/* データが空の場合 */}
              {filteredPlaces.length === 0 && !error && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="text-white/60 text-sm">
                    {hasApiKey 
                      ? 'この周辺の情報が見つかりませんでした' 
                      : 'APIキーを設定すると周辺のおすすめ情報を表示できます'
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {/* フッター */}
          {!isLoading && (
            <div className="mt-4 pt-3 border-t border-white/10 text-center">
              <p className="text-xs text-white/50">
                {hasApiKey 
                  ? '周辺のおすすめ情報は実際の営業状況と異なる場合があります'
                  : 'より詳細な情報を表示するにはOpenAI APIキーが必要です'
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NearbyRecommendations;