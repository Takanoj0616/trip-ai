import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Database, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Trash2,
  RefreshCw
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  uploadRestaurantData, 
  getAllRestaurants, 
  deleteRestaurant,
  Restaurant 
} from '../services/firebaseRestaurantService';

const AdminPage: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // レストランデータを取得
  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const data = await getAllRestaurants();
      setRestaurants(data);
      setMessage({ type: 'success', text: `${data.length}件のレストランデータを取得しました` });
    } catch (error) {
      setMessage({ type: 'error', text: 'データの取得に失敗しました' });
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  // レストランデータをFirebaseにアップロード
  const handleUploadData = async () => {
    setUploading(true);
    try {
      await uploadRestaurantData();
      setMessage({ type: 'success', text: 'レストランデータを正常にアップロードしました！' });
      await fetchRestaurants(); // データを再取得
    } catch (error) {
      setMessage({ type: 'error', text: 'アップロードに失敗しました' });
      console.error('Error uploading data:', error);
    } finally {
      setUploading(false);
    }
  };

  // レストランデータを削除
  const handleDeleteRestaurant = async (id: string, name: string) => {
    if (window.confirm(`「${name}」を削除しますか？この操作は取り消せません。`)) {
      try {
        await deleteRestaurant(id);
        setMessage({ type: 'success', text: `「${name}」を削除しました` });
        await fetchRestaurants(); // データを再取得
      } catch (error) {
        setMessage({ type: 'error', text: '削除に失敗しました' });
        console.error('Error deleting restaurant:', error);
      }
    }
  };

  // メッセージを自動で消す
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // 初回データ取得
  useEffect(() => {
    fetchRestaurants();
  }, []);

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
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent mb-4">
            管理者ページ
          </h1>
          <p className="text-xl text-white/80">
            レストランデータの管理とFirebaseへのアップロード
          </p>
        </div>
      </div>

      {/* メッセージ表示 */}
      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className={`flex items-center space-x-3 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
              : 'bg-red-500/20 border border-red-500/50 text-red-400'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span>{message.text}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* アクションボタン */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <button
            onClick={handleUploadData}
            disabled={uploading}
            className="flex items-center justify-center space-x-3 p-6 bg-gradient-to-r from-neon-pink to-neon-purple rounded-xl hover:shadow-lg hover:shadow-neon-pink/50 transition duration-300 disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
            <span className="font-semibold">
              {uploading ? 'アップロード中...' : 'データをアップロード'}
            </span>
          </button>

          <button
            onClick={fetchRestaurants}
            disabled={loading}
            className="flex items-center justify-center space-x-3 p-6 bg-gradient-to-r from-neon-blue to-cyber-blue rounded-xl hover:shadow-lg hover:shadow-neon-blue/50 transition duration-300 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <RefreshCw className="w-6 h-6" />
            )}
            <span className="font-semibold">
              {loading ? '取得中...' : 'データを更新'}
            </span>
          </button>

          <div className="flex items-center justify-center space-x-3 p-6 bg-white/10 rounded-xl border border-white/20">
            <Database className="w-6 h-6 text-neon-green" />
            <div className="text-center">
              <div className="font-semibold text-lg">{restaurants.length}</div>
              <div className="text-sm text-white/70">登録済みレストラン</div>
            </div>
          </div>
        </div>

        {/* レストランリスト */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
            登録済みレストラン
          </h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-neon-pink" />
            </div>
          ) : restaurants.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              登録されているレストランはありません
            </div>
          ) : (
            <div className="space-y-4">
              {restaurants.map((restaurant) => (
                <div 
                  key={restaurant.id} 
                  className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {restaurant.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80">
                        <div>
                          <strong>住所:</strong> {restaurant.address}
                        </div>
                        <div>
                          <strong>評価:</strong> {restaurant.rating}/5.0 ({restaurant.userRatingsTotal}件)
                        </div>
                        <div>
                          <strong>料理:</strong> {restaurant.cuisine}
                        </div>
                        <div>
                          <strong>価格帯:</strong> {restaurant.priceRange}
                        </div>
                        <div>
                          <strong>営業状況:</strong> 
                          <span className={`ml-2 px-2 py-1 rounded text-xs ${
                            restaurant.isOpen 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {restaurant.isOpen ? '営業中' : '営業時間外'}
                          </span>
                        </div>
                        {restaurant.michelinStars && (
                          <div>
                            <strong>ミシュラン:</strong> {restaurant.michelinStars}つ星
                          </div>
                        )}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {restaurant.categories.map((category, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-neon-blue/20 text-neon-blue rounded text-xs"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteRestaurant(restaurant.id!, restaurant.name)}
                      className="ml-4 p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition duration-300 group"
                      title="削除"
                    >
                      <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 説明セクション */}
        <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold mb-4 text-neon-pink">使用方法</h3>
          <div className="space-y-3 text-white/80">
            <p>
              <strong>1. データをアップロード:</strong> tokyo_restaurant.txtのレストランデータをFirebaseにアップロードします。
            </p>
            <p>
              <strong>2. データを更新:</strong> 現在Firebaseに保存されているレストランデータを再取得します。
            </p>
            <p>
              <strong>3. データ削除:</strong> 個別のレストランデータを削除できます。
            </p>
            <p className="text-yellow-400">
              <strong>注意:</strong> データのアップロードや削除は慎重に行ってください。削除されたデータは復元できません。
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPage;