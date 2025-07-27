import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 旅しおりアイテムの型定義
export interface ItineraryItem {
  id: string;
  name: string;
  address: string;
  description: string;
  rating: number;
  price: string;
  hours: string;
  phone?: string;
  website?: string;
  image: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  estimatedVisitTime: number; // 滞在時間（分）
  category: 'sightseeing' | 'food' | 'shopping' | 'entertainment';
  addedAt: Date;
  visitOrder?: number;
  transport?: {
    train?: string;
    walking?: string;
  };
}

// 交通手段のステップ
export interface TransportStep {
  from: string;
  to: string;
  method: string;
  duration: string;
  cost: string;
  description: string;
}

// 最適化されたルート
export interface OptimizedRoute {
  items: ItineraryItem[];
  totalDistance: number;
  totalTime: number;
  estimatedCost: string;
  suggestions: string[];
  transportPlan: TransportStep[];
}

// Context の型定義
interface ItineraryContextType {
  items: ItineraryItem[];
  optimizedRoute: OptimizedRoute | null;
  isOptimizing: boolean;
  addItem: (item: ItineraryItem) => void;
  removeItem: (id: string) => void;
  clearItinerary: () => void;
  optimizeRoute: () => Promise<void>;
  reorderItems: (newOrder: ItineraryItem[]) => void;
}

// Context の作成
const ItineraryContext = createContext<ItineraryContextType | undefined>(undefined);

// Provider コンポーネント
export const ItineraryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [optimizedRoute, setOptimizedRoute] = useState<OptimizedRoute | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // LocalStorage からデータを復元
  useEffect(() => {
    const savedItems = localStorage.getItem('travel-itinerary');
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems).map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        setItems(parsedItems);
      } catch (error) {
        console.error('Failed to parse saved itinerary:', error);
      }
    }
  }, []);

  // LocalStorage にデータを保存
  useEffect(() => {
    localStorage.setItem('travel-itinerary', JSON.stringify(items));
  }, [items]);

  // アイテムを追加
  const addItem = (item: ItineraryItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(existing => existing.id === item.id);
      if (existingItem) {
        // 既に存在する場合は追加しない
        return prevItems;
      }
      const newItem = {
        ...item,
        addedAt: new Date()
      };
      return [...prevItems, newItem];
    });
    
    // 最適化されたルートがある場合はクリア（再最適化が必要）
    if (optimizedRoute) {
      setOptimizedRoute(null);
    }
  };

  // アイテムを削除
  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    
    // 最適化されたルートがある場合はクリア
    if (optimizedRoute) {
      setOptimizedRoute(null);
    }
  };

  // 旅しおりをクリア
  const clearItinerary = () => {
    setItems([]);
    setOptimizedRoute(null);
    localStorage.removeItem('travel-itinerary');
  };

  // アイテムの順序を変更
  const reorderItems = (newOrder: ItineraryItem[]) => {
    setItems(newOrder);
    
    // 最適化されたルートがある場合は更新
    if (optimizedRoute) {
      setOptimizedRoute(prev => prev ? { ...prev, items: newOrder } : null);
    }
  };

  // ルート最適化
  const optimizeRoute = async () => {
    if (items.length < 2) {
      alert('ルート最適化には2つ以上のスポットが必要です。');
      return;
    }

    setIsOptimizing(true);
    
    try {
      // シンプルな最適化アルゴリズム
      const optimized = await optimizeRouteWithSimpleAlgorithm(items);
      setOptimizedRoute(optimized);
      
      // 最適化された順序でアイテムを並び替え
      setItems(optimized.items);
      
    } catch (error) {
      console.error('Route optimization failed:', error);
      alert('ルート最適化に失敗しました。もう一度お試しください。');
    } finally {
      setIsOptimizing(false);
    }
  };

  const value: ItineraryContextType = {
    items,
    optimizedRoute,
    isOptimizing,
    addItem,
    removeItem,
    clearItinerary,
    optimizeRoute,
    reorderItems
  };

  return (
    <ItineraryContext.Provider value={value}>
      {children}
    </ItineraryContext.Provider>
  );
};

// Hook
export const useItinerary = (): ItineraryContextType => {
  const context = useContext(ItineraryContext);
  if (context === undefined) {
    throw new Error('useItinerary must be used within an ItineraryProvider');
  }
  return context;
};

// シンプルなルート最適化アルゴリズム
const optimizeRouteWithSimpleAlgorithm = async (items: ItineraryItem[]): Promise<OptimizedRoute> => {
  // 実際の実装では、より高度なアルゴリズムを使用
  await new Promise(resolve => setTimeout(resolve, 2000)); // 2秒の遅延をシミュレート

  // 座標を持つアイテムのみを対象とした簡単な距離ベースの最適化
  const optimizedItems = [...items];
  
  // 東京駅を起点とした簡単な最適化ロジック
  const tokyoStation = { lat: 35.6812, lng: 139.7671 };
  
  optimizedItems.sort((a, b) => {
    const distanceA = calculateDistance(
      tokyoStation,
      a.coordinates || { lat: 35.6762, lng: 139.6503 }
    );
    const distanceB = calculateDistance(
      tokyoStation,
      b.coordinates || { lat: 35.6762, lng: 139.6503 }
    );
    return distanceA - distanceB;
  });

  // 順序を設定
  optimizedItems.forEach((item, index) => {
    item.visitOrder = index + 1;
  });

  // 総滞在時間を計算
  const totalTime = optimizedItems.reduce((total, item) => total + item.estimatedVisitTime, 0);
  
  // 総距離を概算（km）
  const totalDistance = optimizedItems.length * 2.5; // 平均的な移動距離

  // 交通手段の提案を生成
  const transportPlan: TransportStep[] = [];
  for (let i = 0; i < optimizedItems.length - 1; i++) {
    transportPlan.push({
      from: optimizedItems[i].name,
      to: optimizedItems[i + 1].name,
      method: '電車・徒歩',
      duration: '20-30分',
      cost: '¥200-400',
      description: `${optimizedItems[i].name}から${optimizedItems[i + 1].name}へ`
    });
  }

  // 提案を生成
  const suggestions = [
    '効率的なルートで時間を節約できます',
    '各スポットの営業時間を確認してください',
    '混雑時は予定より時間がかかる場合があります',
    '交通ICカードの準備をお忘れなく'
  ];

  return {
    items: optimizedItems,
    totalDistance,
    totalTime,
    estimatedCost: `¥${Math.round(totalDistance * 200)}`,
    suggestions,
    transportPlan
  };
};

// 2点間の距離を計算（ハーバーサイン公式）
const calculateDistance = (
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number => {
  const R = 6371; // 地球の半径（km）
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLng = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};