import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { getFirestoreInstance, isFirebaseAvailable } from '../config/firebase';
import { Planner, TravelRequest, Message, TravelItinerary } from '../types/planner';
import { plannersForFirebase } from '../data/firebasePlanners';

// プランナー関連のFirebaseサービス
export class FirebasePlannerService {
  
  // Firebase利用可能性チェック
  private static checkFirebaseAvailability(): boolean {
    if (!isFirebaseAvailable()) {
      console.warn('🔥 Firebase未設定: ローカルモードを使用してください');
      return false;
    }
    return true;
  }

  // プランナーデータをFirestoreに一括登録
  static async initializePlanners() {
    if (!this.checkFirebaseAvailability()) {
      throw new Error('Firebase設定が不完全です。環境変数を確認してください。');
    }

    const db = getFirestoreInstance();
    if (!db) {
      throw new Error('Firestoreインスタンスを取得できませんでした。');
    }

    try {
      const plannersCollection = collection(db, 'planners');
      
      for (const [plannerId, plannerData] of Object.entries(plannersForFirebase)) {
        const docRef = doc(plannersCollection, plannerId);
        await updateDoc(docRef, {
          ...plannerData,
          updatedAt: Timestamp.now()
        }).catch(async () => {
          // ドキュメントが存在しない場合は新規作成
          await addDoc(plannersCollection, {
            id: plannerId,
            ...plannerData,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
          });
        });
      }
      
      console.log('プランナーデータの初期化が完了しました');
      return true;
    } catch (error) {
      console.error('プランナーデータの初期化に失敗しました:', error);
      return false;
    }
  }

  // 全プランナーを取得
  static async getAllPlanners(): Promise<Planner[]> {
    if (!this.checkFirebaseAvailability()) {
      throw new Error('Firebase未利用: ローカルサービスを使用してください');
    }

    const db = getFirestoreInstance();
    if (!db) {
      throw new Error('Firestoreインスタンスを取得できませんでした');
    }

    try {
      const plannersCollection = collection(db, 'planners');
      const querySnapshot = await getDocs(plannersCollection);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Planner));
    } catch (error) {
      console.error('プランナー取得エラー:', error);
      return [];
    }
  }

  // 条件に合うプランナーを検索
  static async getMatchingPlanners(
    areas: string[],
    categories: string[],
    budget: { min: number; max: number }
  ): Promise<Planner[]> {
    try {
      const plannersCollection = collection(db, 'planners');
      const q = query(
        plannersCollection,
        where('availability', '==', true),
        orderBy('rating', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const allPlanners = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Planner));

      // クライアントサイドでのフィルタリング
      return allPlanners.filter(planner => {
        const areaMatch = areas.some(area => planner.areas.includes(area));
        const categoryMatch = categories.some(category => planner.categories.includes(category));
        const budgetMatch = planner.priceRange.min <= budget.max && planner.priceRange.max >= budget.min;
        
        return areaMatch && categoryMatch && budgetMatch;
      });
    } catch (error) {
      console.error('プランナーマッチング取得エラー:', error);
      return [];
    }
  }

  // 特定のプランナーを取得
  static async getPlannerById(plannerId: string): Promise<Planner | null> {
    try {
      const plannerDoc = doc(db, 'planners', plannerId);
      const docSnap = await getDoc(plannerDoc);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Planner;
      }
      return null;
    } catch (error) {
      console.error('プランナー詳細取得エラー:', error);
      return null;
    }
  }

  // 旅行リクエストを作成
  static async createTravelRequest(requestData: Omit<TravelRequest, 'id' | 'createdAt'>): Promise<string | null> {
    try {
      const requestsCollection = collection(db, 'travelRequests');
      const docRef = await addDoc(requestsCollection, {
        ...requestData,
        createdAt: Timestamp.now()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('旅行リクエスト作成エラー:', error);
      return null;
    }
  }

  // メッセージを送信
  static async sendMessage(messageData: Omit<Message, 'id' | 'timestamp'>): Promise<string | null> {
    try {
      const messagesCollection = collection(db, 'messages');
      const docRef = await addDoc(messagesCollection, {
        ...messageData,
        timestamp: Timestamp.now()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('メッセージ送信エラー:', error);
      return null;
    }
  }

  // 旅行リクエストのメッセージを取得
  static async getMessagesByRequestId(requestId: string): Promise<Message[]> {
    try {
      const messagesCollection = collection(db, 'messages');
      const q = query(
        messagesCollection,
        where('requestId', '==', requestId),
        orderBy('timestamp', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate().toISOString()
      } as Message));
    } catch (error) {
      console.error('メッセージ取得エラー:', error);
      return [];
    }
  }

  // 旅行しおりを作成
  static async createItinerary(itineraryData: Omit<TravelItinerary, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const itinerariesCollection = collection(db, 'itineraries');
      const docRef = await addDoc(itinerariesCollection, {
        ...itineraryData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('旅行しおり作成エラー:', error);
      return null;
    }
  }

  // 旅行しおりを更新
  static async updateItinerary(itineraryId: string, updates: Partial<TravelItinerary>): Promise<boolean> {
    try {
      const itineraryDoc = doc(db, 'itineraries', itineraryId);
      await updateDoc(itineraryDoc, {
        ...updates,
        updatedAt: Timestamp.now()
      });
      
      return true;
    } catch (error) {
      console.error('旅行しおり更新エラー:', error);
      return false;
    }
  }

  // プランナーの空き状況を更新
  static async updatePlannerAvailability(plannerId: string, availability: boolean): Promise<boolean> {
    try {
      const plannerDoc = doc(db, 'planners', plannerId);
      await updateDoc(plannerDoc, {
        availability,
        updatedAt: Timestamp.now()
      });
      
      return true;
    } catch (error) {
      console.error('プランナー空き状況更新エラー:', error);
      return false;
    }
  }

  // プランナーの評価を更新
  static async updatePlannerRating(plannerId: string, newRating: number): Promise<boolean> {
    try {
      const planner = await this.getPlannerById(plannerId);
      if (!planner) return false;

      const totalRatings = planner.rating * planner.reviewCount + newRating;
      const newReviewCount = planner.reviewCount + 1;
      const updatedRating = totalRatings / newReviewCount;

      const plannerDoc = doc(db, 'planners', plannerId);
      await updateDoc(plannerDoc, {
        rating: Math.round(updatedRating * 10) / 10,
        reviewCount: newReviewCount,
        updatedAt: Timestamp.now()
      });
      
      return true;
    } catch (error) {
      console.error('プランナー評価更新エラー:', error);
      return false;
    }
  }

  // プランナーの完了旅行数を増加
  static async incrementCompletedTrips(plannerId: string): Promise<boolean> {
    try {
      const planner = await this.getPlannerById(plannerId);
      if (!planner) return false;

      const plannerDoc = doc(db, 'planners', plannerId);
      await updateDoc(plannerDoc, {
        completedTrips: planner.completedTrips + 1,
        updatedAt: Timestamp.now()
      });
      
      return true;
    } catch (error) {
      console.error('完了旅行数更新エラー:', error);
      return false;
    }
  }
}

// Firebaseデータ初期化用のスクリプト
export const initializeFirebaseData = async () => {
  console.log('Firebaseデータの初期化を開始します...');
  const success = await FirebasePlannerService.initializePlanners();
  
  if (success) {
    console.log('✅ プランナーデータの初期化が完了しました');
  } else {
    console.log('❌ プランナーデータの初期化に失敗しました');
  }
  
  return success;
};