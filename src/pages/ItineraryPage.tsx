import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Clock, 
  Star, 
  Phone, 
  Globe, 
  Train,
  ArrowLeft,
  Trash2,
  Bot,
  Loader2,
  Route,
  Calculator,
  Lightbulb,
  Navigation2,
  CheckCircle2,
  AlertCircle,
  Move3D,
  Map,
  List,
  Calendar,
  Share2,
  Download,
  Print,
  Camera,
  MessageCircle,
  Bookmark,
  Target
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ItineraryMap from '../components/ItineraryMap';
import DetailedRouteGuide from '../components/DetailedRouteGuide';
import NearbyRecommendations from '../components/NearbyRecommendations';
import { useItinerary } from '../contexts/ItineraryContext';

const ItineraryPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    items, 
    optimizedRoute, 
    isOptimizing, 
    removeItem, 
    clearItinerary, 
    optimizeRoute, 
    reorderItems 
  } = useItinerary();
  
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showOptimizationDetails, setShowOptimizationDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'guide'>('overview');

  // ドラッグ&ドロップの処理
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = items.findIndex(item => item.id === draggedItem);
    const targetIndex = items.findIndex(item => item.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;

    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removed);
    
    reorderItems(newItems);
    setDraggedItem(null);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}時間${mins > 0 ? mins + '分' : ''}`;
    }
    return `${mins}分`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      sightseeing: 'from-blue-500 to-cyan-500',
      food: 'from-orange-500 to-red-500',
      shopping: 'from-purple-500 to-pink-500',
      entertainment: 'from-green-500 to-emerald-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sightseeing': return '🗼';
      case 'food': return '🍽️';
      case 'shopping': return '🛍️';
      case 'entertainment': return '🎭';
      default: return '📍';
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
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition duration-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                私の旅しおり
              </h1>
              <p className="text-xl text-white/80 mt-2">
                AIが最適なルートを提案します
              </p>
            </div>
          </div>
          
          {/* 統計情報 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-neon-pink">{items.length}</div>
              <div className="text-sm text-white/70">スポット</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-neon-blue">
                {formatTime(items.reduce((total, item) => total + item.estimatedVisitTime, 0))}
              </div>
              <div className="text-sm text-white/70">予想滞在時間</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-neon-green">
                {optimizedRoute ? optimizedRoute.estimatedCost : '---'}
              </div>
              <div className="text-sm text-white/70">推定費用</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-neon-purple">
                {optimizedRoute ? Math.round(optimizedRoute.totalDistance) + 'km' : '---'}
              </div>
              <div className="text-sm text-white/70">総移動距離</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {items.length === 0 ? (
          /* 空の状態 */
          <div className="text-center py-20">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
              旅しおりが空です
            </h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              観光スポットやレストランページで「旅しおりに追加」ボタンを押して、行きたい場所を追加しましょう。
            </p>
            <button
              onClick={() => navigate('/guide/tokyo/sightseeing')}
              className="bg-gradient-to-r from-neon-pink to-neon-purple px-8 py-3 rounded-full hover:shadow-lg hover:shadow-neon-pink/50 transition duration-300 font-semibold"
            >
              東京観光スポットを見る
            </button>
          </div>
        ) : (
          <div>
            {/* タブナビゲーション */}
            <div className="flex items-center space-x-4 mb-8">
              {[
                { id: 'overview', label: '概要', icon: List },
                { id: 'map', label: 'マップ', icon: Map },
                { id: 'guide', label: 'ルートガイド', icon: Navigation2 }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as 'overview' | 'map' | 'guide')}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition duration-300 ${
                    activeTab === id
                      ? 'bg-gradient-to-r from-neon-pink to-neon-purple text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-semibold">{label}</span>
                </button>
              ))}
            </div>

            {/* タブコンテンツ */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* メインコンテンツ */}
            <div className="lg:col-span-2">
              {/* アクションボタン */}
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={optimizeRoute}
                  disabled={isOptimizing || items.length < 2}
                  className="flex items-center space-x-2 bg-gradient-to-r from-neon-blue to-cyber-blue px-6 py-3 rounded-full hover:shadow-lg hover:shadow-neon-blue/50 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isOptimizing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                  <span className="font-semibold">
                    {isOptimizing ? 'AI最適化中...' : 'AIで最適化'}
                  </span>
                </button>

                <button
                  onClick={() => setShowOptimizationDetails(!showOptimizationDetails)}
                  disabled={!optimizedRoute}
                  className="flex items-center space-x-2 bg-white/10 px-6 py-3 rounded-full hover:bg-white/20 transition duration-300 disabled:opacity-50"
                >
                  <Lightbulb className="w-5 h-5" />
                  <span>詳細を{showOptimizationDetails ? '隠す' : '表示'}</span>
                </button>

                <button
                  onClick={clearItinerary}
                  className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 px-6 py-3 rounded-full transition duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>すべて削除</span>
                </button>
              </div>

              {/* 最適化の詳細情報 */}
              {showOptimizationDetails && optimizedRoute && (
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
                  <h3 className="text-xl font-bold mb-4 text-neon-blue">AI最適化の提案</h3>
                  
                  {/* 提案リスト */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-neon-green">おすすめのアドバイス</h4>
                    <div className="space-y-2">
                      {optimizedRoute.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle2 className="w-5 h-5 text-neon-green mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 交通プラン */}
                  <div>
                    <h4 className="font-semibold mb-3 text-neon-purple">交通手段の提案</h4>
                    <div className="space-y-3">
                      {optimizedRoute.transportPlan.map((step, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                          <Navigation2 className="w-4 h-4 text-neon-purple" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{step.description}</div>
                            <div className="text-xs text-white/60">
                              {step.method} • {step.duration} • {step.cost}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 旅しおりリスト */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                  訪問予定のスポット {optimizedRoute && '（最適化済み）'}
                </h2>
                
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, item.id)}
                    className={`bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:bg-white/15 transition duration-300 cursor-move ${
                      draggedItem === item.id ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(item.category)} rounded-full flex items-center justify-center text-2xl font-bold shadow-lg`}>
                            {item.visitOrder || index + 1}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-2xl">{getCategoryIcon(item.category)}</span>
                              <h3 className="text-xl font-bold text-white">{item.name}</h3>
                            </div>
                            <p className="text-white/60 text-sm">{item.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Move3D className="w-5 h-5 text-white/40" />
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition duration-300"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-white/70">
                          <MapPin className="w-4 h-4 mr-2 text-neon-blue" />
                          <span className="text-sm">{item.address}</span>
                        </div>
                        <div className="flex items-center text-white/70">
                          <Clock className="w-4 h-4 mr-2 text-neon-green" />
                          <span className="text-sm">{item.hours}</span>
                        </div>
                        <div className="flex items-center text-white/70">
                          <Star className="w-4 h-4 mr-2 text-yellow-400" />
                          <span className="text-sm">{item.rating}/5.0</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-white/60">
                          推定滞在時間: {formatTime(item.estimatedVisitTime)}
                        </div>
                        <div className="text-lg font-bold text-neon-pink">
                          {item.price}
                        </div>
                      </div>

                      {item.transport && (
                        <div className="mt-3 p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center text-sm text-white/70">
                            <Train className="w-4 h-4 mr-2 text-neon-purple" />
                            <span>{item.transport.train || item.transport.walking}</span>
                          </div>
                        </div>
                      )}

                      {/* 周辺のおすすめ情報 */}
                      <NearbyRecommendations 
                        locationName={item.name}
                        locationCategory={item.category}
                        locationAddress={item.address}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 sticky top-8">
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                  旅行サマリー
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">スポット数</span>
                    <span className="font-bold">{items.length}箇所</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">総滞在時間</span>
                    <span className="font-bold">
                      {formatTime(items.reduce((total, item) => total + item.estimatedVisitTime, 0))}
                    </span>
                  </div>
                  
                  {optimizedRoute && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">移動距離</span>
                        <span className="font-bold">{Math.round(optimizedRoute.totalDistance)}km</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">推定費用</span>
                        <span className="font-bold">{optimizedRoute.estimatedCost}</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-white/20">
                  <h4 className="font-semibold mb-3">カテゴリー別</h4>
                  <div className="space-y-2">
                    {['sightseeing', 'food', 'shopping', 'entertainment'].map(category => {
                      const count = items.filter(item => item.category === category).length;
                      if (count === 0) return null;
                      
                      return (
                        <div key={category} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <span>{getCategoryIcon(category)}</span>
                            <span className="text-white/70 capitalize">{category}</span>
                          </div>
                          <span className="text-white/90">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {items.length >= 2 && !optimizedRoute && (
                  <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div className="text-sm">
                        <p className="text-yellow-400 font-semibold mb-1">最適化のお知らせ</p>
                        <p className="text-white/70">
                          AIが効率的なルートを提案できます。「AIで最適化」ボタンをお試しください。
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              </div>
            </div>
            )}

            {/* マップタブ */}
            {activeTab === 'map' && (
              <div className="space-y-8">
                <ItineraryMap 
                  items={items}
                  showRoute={true}
                  optimizedRoute={optimizedRoute}
                  onItemClick={(item) => {
                    // 必要に応じて詳細表示などの処理を追加
                    console.log('Selected item:', item.name);
                  }}
                />
                
                {/* マップ使用説明 */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                    マップ使用方法
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-neon-blue mb-2">基本操作</h4>
                      <ul className="text-sm text-white/80 space-y-1">
                        <li>• 地図をドラッグして移動</li>
                        <li>• マウスホイールでズーム</li>
                        <li>• フルスクリーンボタンで拡大表示</li>
                        <li>• 移動手段を選択してルート変更</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neon-green mb-2">外部アプリ連携</h4>
                      <ul className="text-sm text-white/80 space-y-1">
                        <li>• 「Google Mapsで開く」で詳細ナビ</li>
                        <li>• スマートフォンのGPSナビと連携</li>
                        <li>• リアルタイム交通情報を確認</li>
                        <li>• 代替ルートの比較が可能</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ルートガイドタブ */}
            {activeTab === 'guide' && (
              <div className="space-y-8">
                <DetailedRouteGuide items={items} />
                
                {/* ガイド使用説明 */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                    ガイド活用のコツ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-neon-purple mb-2">⏰ 時間管理</h4>
                      <p className="text-sm text-white/80">
                        午前・午後・夕方の時間帯を選択して、各時間帯に最適な観光プランを確認できます。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neon-blue mb-2">🚇 交通手段</h4>
                      <p className="text-sm text-white/80">
                        各ステップで複数の交通手段を提案。混雑状況や予算に応じて選択してください。
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neon-green mb-2">💡 実用的なコツ</h4>
                      <p className="text-sm text-white/80">
                        各移動において、現地の人だけが知るような実用的なアドバイスを提供しています。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ItineraryPage;