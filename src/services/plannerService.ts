import { Planner, TravelRequest, Message } from '../types/planner';
import { FirebasePlannerService } from './firebasePlannerService';
import { plannersArray } from '../data/firebasePlanners';

// ローカルフォールバック用のプランナーデータ
const localPlanners: Planner[] = plannersArray.map(planner => ({
  ...planner,
  id: planner.id || `planner-${Math.random().toString(36).substr(2, 9)}`,
  availability: true // 確実に利用可能に設定
}));

// デバッグ: プランナー数をログ出力
console.log(`📊 ローカルプランナー初期化完了: ${localPlanners.length}名`);

// プランナーサービス（Firebase + ローカルフォールバック）
export class PlannerService {
  private static isFirebaseAvailable = false;
  private static retryCount = 0;
  private static maxRetries = 1;
  private static firebaseInitialized = false;

  // Firebase接続状態をチェック
  private static async checkFirebaseConnection(): Promise<boolean> {
    try {
      // Firebase設定チェック
      const { isFirebaseAvailable } = await import('../config/firebase');
      if (!isFirebaseAvailable()) {
        console.log('📱 Firebase未設定: ローカルモードを使用');
        this.isFirebaseAvailable = false;
        return false;
      }

      // 軽量なFirebase接続テスト
      await FirebasePlannerService.getAllPlanners();
      this.isFirebaseAvailable = true;
      this.retryCount = 0;
      console.log('✅ Firebase接続成功');
      return true;
    } catch (error) {
      console.warn('⚠️ Firebase接続エラー:', error);
      this.isFirebaseAvailable = false;
      return false;
    }
  }

  // 初期化チェック
  private static async initializeFirebaseIfNeeded(): Promise<void> {
    if (!this.firebaseInitialized) {
      const connectionStatus = await this.checkFirebaseConnection();
      this.firebaseInitialized = true;
      console.log(`🔥 初期化完了: Firebase=${connectionStatus ? '有効' : '無効'}`);
    }
  }

  // 条件に合うプランナーを取得（Firebase + フォールバック）
  static async getMatchingPlanners(
    areas: string[],
    categories: string[],
    budget: { min: number; max: number }
  ): Promise<Planner[]> {
    // 初期化チェック
    await this.initializeFirebaseIfNeeded();

    // Firebaseから取得を試行（設定が有効な場合のみ）
    if (this.isFirebaseAvailable && this.retryCount < this.maxRetries) {
      try {
        console.log('🔥 Firebaseからプランナーを取得中...');
        const firebasePlanners = await FirebasePlannerService.getMatchingPlanners(areas, categories, budget);
        
        if (firebasePlanners.length > 0) {
          console.log(`✅ Firebase: ${firebasePlanners.length}名のプランナーを取得`);
          this.retryCount = 0;
          return firebasePlanners;
        }
      } catch (error) {
        console.warn(`⚠️ Firebase取得エラー (試行 ${this.retryCount + 1}/${this.maxRetries}):`, error);
        this.retryCount++;
        this.isFirebaseAvailable = false;
      }
    }

    // ローカルフォールバック（必ず実行）
    console.log('📱 ローカルデータを使用してプランナーを検索中...');
    const matchedPlanners = this.getLocalMatchingPlanners(areas, categories, budget);
    console.log(`✅ ローカル: ${matchedPlanners.length}名のプランナーをマッチング`);
    return matchedPlanners;
  }

  // ローカルデータでのマッチング（緩和条件付き）
  private static getLocalMatchingPlanners(
    areas: string[],
    categories: string[],
    budget: { min: number; max: number }
  ): Planner[] {
    console.log('🔍 マッチング条件:', { areas, categories, budget });
    console.log('📋 利用可能プランナー数:', localPlanners.length);
    
    // プランナーの詳細情報をログ出力
    localPlanners.forEach(planner => {
      console.log(`👤 ${planner.name}: エリア=[${planner.areas.join(',')}], カテゴリ=[${planner.categories.join(',')}], 予算=${planner.priceRange.min}-${planner.priceRange.max}`);
    });

    // エリアマッピング（より柔軟に）
    const normalizeArea = (area: string): string[] => {
      const areaMap: { [key: string]: string[] } = {
        'tokyo': ['東京', 'tokyo'],
        '東京': ['東京', 'tokyo'],
        'yokohama': ['横浜', 'yokohama'],
        '横浜': ['横浜', 'yokohama']
      };
      return areaMap[area] || [area];
    };

    // カテゴリマッピング（より柔軟に）
    const normalizeCategory = (category: string): string[] => {
      const categoryMap: { [key: string]: string[] } = {
        '飲食': ['飲食', 'グルメ・飲食', 'food'],
        '観光': ['観光', '観光スポット', 'sightseeing'],
        'ショッピング': ['ショッピング', 'shopping'],
        '自然': ['自然', '自然・公園', 'nature'],
        'カフェ・バー': ['カフェ・バー', 'カフェ', 'バー', 'cafe'],
        '文化': ['文化', '文化体験', 'culture']
      };
      return categoryMap[category] || [category];
    };

    // Step 1: 厳密なマッチング
    let matchedPlanners = localPlanners.filter(planner => {
      const areaMatch = areas.some(area => {
        const normalizedAreas = normalizeArea(area);
        return normalizedAreas.some(normalizedArea => 
          planner.areas.some(plannerArea => 
            plannerArea.includes(normalizedArea) || normalizedArea.includes(plannerArea)
          )
        );
      });
      
      const categoryMatch = categories.some(category => {
        const normalizedCategories = normalizeCategory(category);
        return normalizedCategories.some(normalizedCategory => 
          planner.categories.some(plannerCategory => 
            plannerCategory.includes(normalizedCategory) || normalizedCategory.includes(plannerCategory)
          )
        );
      });
      
      const budgetMatch = planner.priceRange.min <= budget.max && planner.priceRange.max >= budget.min;
      
      console.log(`👤 ${planner.name}: エリア=${areaMatch}, カテゴリ=${categoryMatch}, 予算=${budgetMatch}`);
      
      return areaMatch && categoryMatch && budgetMatch && planner.availability;
    });

    console.log(`✅ 厳密マッチング: ${matchedPlanners.length}名`);

    // Step 2: エリアまたはカテゴリのいずれかマッチ（予算は必須）
    if (matchedPlanners.length === 0) {
      console.log('🔄 緩和マッチング開始...');
      matchedPlanners = localPlanners.filter(planner => {
        const areaMatch = areas.some(area => planner.areas.includes(area));
        const categoryMatch = categories.some(category => planner.categories.includes(category));
        const budgetMatch = planner.priceRange.min <= budget.max && planner.priceRange.max >= budget.min;
        
        return (areaMatch || categoryMatch) && budgetMatch && planner.availability;
      });
      console.log(`🔄 緩和マッチング: ${matchedPlanners.length}名`);
    }

    // Step 3: 予算条件を緩和（±50%許容）
    if (matchedPlanners.length === 0) {
      console.log('💰 予算条件緩和...');
      const relaxedBudget = {
        min: Math.floor(budget.min * 0.5),
        max: Math.ceil(budget.max * 1.5)
      };
      
      matchedPlanners = localPlanners.filter(planner => {
        const areaMatch = areas.some(area => planner.areas.includes(area));
        const categoryMatch = categories.some(category => planner.categories.includes(category));
        const budgetMatch = planner.priceRange.min <= relaxedBudget.max && planner.priceRange.max >= relaxedBudget.min;
        
        return (areaMatch || categoryMatch) && budgetMatch && planner.availability;
      });
      console.log(`💰 予算緩和マッチング: ${matchedPlanners.length}名`);
    }

    // Step 4: エリアのみマッチング
    if (matchedPlanners.length === 0) {
      console.log('🌍 エリアのみマッチング...');
      matchedPlanners = localPlanners.filter(planner => {
        const areaMatch = areas.some(area => planner.areas.includes(area));
        return areaMatch && planner.availability;
      });
      console.log(`🌍 エリアマッチング: ${matchedPlanners.length}名`);
    }

    // Step 5: 最終フォールバック（全プランナー）
    if (matchedPlanners.length === 0) {
      console.log('🆘 最終フォールバック: 全プランナー表示');
      matchedPlanners = localPlanners.filter(planner => planner.availability);
      console.log(`🆘 全プランナー: ${matchedPlanners.length}名`);
    }

    // Step 6: 絶対フォールバック（availabilityも無視）
    if (matchedPlanners.length === 0) {
      console.log('🚨 緊急フォールバック: 全プランナー強制表示');
      matchedPlanners = [...localPlanners]; // 全プランナーを返す
      console.log(`🚨 緊急フォールバック: ${matchedPlanners.length}名`);
    }

    // 評価順でソート
    const sortedPlanners = matchedPlanners.sort((a, b) => b.rating - a.rating);
    console.log(`🎯 最終結果: ${sortedPlanners.length}名のプランナー`);
    
    // 絶対に空の配列を返さない
    if (sortedPlanners.length === 0) {
      console.error('❌ 致命的エラー: プランナーが0名');
      console.log('🔧 強制的にデフォルトプランナーを生成');
      return [{
        id: 'emergency-planner',
        name: '緊急対応プランナー',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c4?w=150&h=150&fit=crop&crop=face',
        rating: 4.5,
        reviewCount: 100,
        specialties: ['全般対応'],
        areas: ['東京', '横浜'],
        categories: ['飲食', '観光', 'ショッピング'],
        priceRange: { min: 1000, max: 100000 },
        experience: 5,
        languages: ['日本語'],
        description: 'あらゆるご要望にお応えする万能プランナーです。',
        completedTrips: 200,
        responseTime: '即時',
        availability: true,
        portfolio: []
      }];
    }
    
    return sortedPlanners;
  }

  // 全プランナーを取得
  static async getAllPlanners(): Promise<Planner[]> {
    if (this.isFirebaseAvailable || this.retryCount < this.maxRetries) {
      try {
        const firebasePlanners = await FirebasePlannerService.getAllPlanners();
        if (firebasePlanners.length > 0) {
          console.log(`✅ Firebase: ${firebasePlanners.length}名の全プランナーを取得`);
          return firebasePlanners;
        }
      } catch (error) {
        console.warn('Firebase全プランナー取得エラー:', error);
        this.retryCount++;
        this.isFirebaseAvailable = false;
      }
    }

    console.log('📱 ローカル: 全プランナーデータを使用');
    return localPlanners;
  }

  // 特定のプランナーを取得
  static async getPlannerById(plannerId: string): Promise<Planner | null> {
    if (this.isFirebaseAvailable) {
      try {
        const firebasePlanner = await FirebasePlannerService.getPlannerById(plannerId);
        if (firebasePlanner) {
          return firebasePlanner;
        }
      } catch (error) {
        console.warn('Firebase個別プランナー取得エラー:', error);
        this.isFirebaseAvailable = false;
      }
    }

    // ローカルフォールバック
    const localPlanner = localPlanners.find(p => p.id === plannerId);
    if (localPlanner) {
      console.log(`📱 ローカル: プランナー ${localPlanner.name} を取得`);
    }
    return localPlanner || null;
  }

  // 旅行リクエストを作成
  static async createTravelRequest(requestData: Omit<TravelRequest, 'id' | 'createdAt'>): Promise<string> {
    const fallbackId = `request-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    if (this.isFirebaseAvailable) {
      try {
        const requestId = await FirebasePlannerService.createTravelRequest(requestData);
        if (requestId) {
          console.log('✅ Firebase: 旅行リクエスト作成成功', requestId);
          return requestId;
        }
      } catch (error) {
        console.warn('Firebase旅行リクエスト作成エラー:', error);
        this.isFirebaseAvailable = false;
      }
    }

    // ローカルフォールバック（localStorage使用）
    console.log('📱 ローカル: 旅行リクエストをローカルストレージに保存');
    const request: TravelRequest = {
      id: fallbackId,
      ...requestData,
      createdAt: new Date().toISOString()
    };
    
    try {
      const existingRequests = JSON.parse(localStorage.getItem('travelRequests') || '[]');
      existingRequests.push(request);
      localStorage.setItem('travelRequests', JSON.stringify(existingRequests));
    } catch (error) {
      console.warn('ローカルストレージ保存エラー:', error);
    }

    return fallbackId;
  }

  // メッセージを送信
  static async sendMessage(messageData: Omit<Message, 'id' | 'timestamp'>): Promise<string> {
    const fallbackId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    if (this.isFirebaseAvailable) {
      try {
        const messageId = await FirebasePlannerService.sendMessage(messageData);
        if (messageId) {
          console.log('✅ Firebase: メッセージ送信成功', messageId);
          return messageId;
        }
      } catch (error) {
        console.warn('Firebaseメッセージ送信エラー:', error);
        this.isFirebaseAvailable = false;
      }
    }

    // ローカルフォールバック
    console.log('📱 ローカル: メッセージをローカルストレージに保存');
    const message: Message = {
      id: fallbackId,
      ...messageData,
      timestamp: new Date().toISOString()
    };

    try {
      const existingMessages = JSON.parse(localStorage.getItem('messages') || '[]');
      existingMessages.push(message);
      localStorage.setItem('messages', JSON.stringify(existingMessages));
    } catch (error) {
      console.warn('ローカルメッセージ保存エラー:', error);
    }

    return fallbackId;
  }

  // 接続状態を確認
  static async checkConnection(): Promise<{ firebase: boolean; local: boolean }> {
    const firebaseStatus = await this.checkFirebaseConnection();
    return {
      firebase: firebaseStatus,
      local: true // ローカルは常に利用可能
    };
  }

  // Firebase再接続を試行
  static async reconnectFirebase(): Promise<boolean> {
    console.log('Firebase再接続を試行中...');
    this.retryCount = 0;
    this.isFirebaseAvailable = true;
    return await this.checkFirebaseConnection();
  }

  // サービス状態を取得
  static getServiceStatus() {
    return {
      isFirebaseAvailable: this.isFirebaseAvailable,
      retryCount: this.retryCount,
      localPlannersCount: localPlanners.length,
      maxRetries: this.maxRetries
    };
  }
}

// フォールバック用の簡易マッチング関数（export用）
export const getMatchingPlanners = (
  areas: string[],
  categories: string[],
  budget: { min: number; max: number }
): Planner[] => {
  console.log('🔄 簡易マッチング実行:', { areas, categories, budget });
  
  // 最低でも1名は返すように設計
  let matchedPlanners = localPlanners.filter(planner => {
    const areaMatch = areas.some(area => planner.areas.includes(area));
    const categoryMatch = categories.some(category => planner.categories.includes(category));
    const budgetMatch = planner.priceRange.min <= budget.max && planner.priceRange.max >= budget.min;
    
    return areaMatch && categoryMatch && budgetMatch && planner.availability;
  });

  // 結果が0の場合は全プランナーを返す
  if (matchedPlanners.length === 0) {
    console.log('🆘 簡易マッチング: 全プランナーを返す');
    matchedPlanners = localPlanners;
  }

  console.log(`✅ 簡易マッチング結果: ${matchedPlanners.length}名`);
  return matchedPlanners.sort((a, b) => b.rating - a.rating);
};

export default PlannerService;