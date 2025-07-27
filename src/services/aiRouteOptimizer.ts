// AI Route Optimization Service
// シンプルなルート最適化アルゴリズム

import { ItineraryItem, OptimizedRoute, TransportStep } from '../contexts/ItineraryContext';

export interface RouteOptimizationRequest {
  items: ItineraryItem[];
  preferences?: {
    startTime?: string;
    transportMode?: 'walking' | 'transit' | 'driving';
    avoidTraffic?: boolean;
    prioritizeCost?: boolean;
    prioritizeTime?: boolean;
  };
}

// メイン最適化関数
export const optimizeRouteWithAI = async (
  items: ItineraryItem[],
  preferences?: RouteOptimizationRequest['preferences']
): Promise<OptimizedRoute> => {
  try {
    // シンプルなアルゴリズム最適化
    return await optimizeWithSimpleAlgorithm(items, preferences);
    
  } catch (error) {
    console.error('Route optimization failed:', error);
    // エラー時は元の順序を維持
    return createOptimizedRoute(items);
  }
};

// シンプルなアルゴリズム最適化
const optimizeWithSimpleAlgorithm = async (
  items: ItineraryItem[],
  preferences?: RouteOptimizationRequest['preferences']
): Promise<OptimizedRoute> => {
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

  return createOptimizedRoute(optimizedItems);
};

// 最適化されたルートを作成
const createOptimizedRoute = (items: ItineraryItem[]): OptimizedRoute => {
  // 総滞在時間を計算
  const totalTime = items.reduce((total, item) => total + item.estimatedVisitTime, 0);
  
  // 総距離を概算（km）
  const totalDistance = items.length * 2.5; // 平均的な移動距離

  // 交通手段の提案を生成
  const transportPlan: TransportStep[] = [];
  for (let i = 0; i < items.length - 1; i++) {
    transportPlan.push({
      from: items[i].name,
      to: items[i + 1].name,
      method: '電車・徒歩',
      duration: '20-30分',
      cost: '¥200-400',
      description: `${items[i].name}から${items[i + 1].name}へ`
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
    items,
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