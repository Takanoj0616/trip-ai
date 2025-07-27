import { getFirestoreInstance } from '../config/firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';

// レストラン情報の型定義
export interface Restaurant {
  id?: string;
  name: string;
  address: string;
  rating: number;
  userRatingsTotal: number;
  placeId: string;
  categories: string[];
  isOpen: boolean;
  priceLevel: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  operationalStatus: string;
  fullAddress: string;
  phoneNumber?: string;
  website?: string;
  googleMapsUrl?: string;
  openingHours: {
    [key: string]: string;
  };
  reviews: Review[];
  photos: string[];
  cuisine: string;
  serviceOptions: string[];
  mealOptions: string[];
  atmosphere: string;
  suitableFor: string[];
  reservationRequired: boolean;
  priceRange: string;
  seatingCapacity?: number;
  privateRooms: boolean;
  smokingAllowed: boolean;
  accessibility: string;
  parking: boolean;
  creditCards: string[];
  wifi: boolean;
  alcohol: boolean;
  specialMenus: SpecialMenu[];
  seasonalMenus: string;
  chefInfo: string;
  awards: string[];
  michelinStars?: number;
  tabelogRating?: number;
  gurunaviUrl?: string;
  hotpepperUrl?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Review {
  rating: number;
  author: string;
  content: string;
}

export interface SpecialMenu {
  name: string;
  price: string;
  description: string;
}

// Firestoreコレクション名
const RESTAURANTS_COLLECTION = 'restaurants';

// レストランデータをFirestoreに追加
export const addRestaurant = async (restaurant: Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const restaurantData = {
      ...restaurant,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const database = getFirestoreInstance();
    if (!database) {
      throw new Error('Firebase not available');
    }
    const docRef = await addDoc(collection(database, RESTAURANTS_COLLECTION), restaurantData);
    console.log('Restaurant added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding restaurant: ', error);
    throw error;
  }
};

// 全レストランデータを取得
export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const database = getFirestoreInstance();
    if (!database) {
      throw new Error('Firebase not available');
    }
    const querySnapshot = await getDocs(collection(database, RESTAURANTS_COLLECTION));
    const restaurants: Restaurant[] = [];
    
    querySnapshot.forEach((doc) => {
      restaurants.push({
        id: doc.id,
        ...doc.data()
      } as Restaurant);
    });
    
    return restaurants;
  } catch (error) {
    console.error('Error getting restaurants: ', error);
    throw error;
  }
};

// 特定のカテゴリのレストランを取得
export const getRestaurantsByCategory = async (category: string): Promise<Restaurant[]> => {
  try {
    const database = getFirestoreInstance();
    if (!database) {
      throw new Error('Firebase not available');
    }
    const q = query(
      collection(database, RESTAURANTS_COLLECTION),
      where('categories', 'array-contains', category),
      orderBy('rating', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const restaurants: Restaurant[] = [];
    
    querySnapshot.forEach((doc) => {
      restaurants.push({
        id: doc.id,
        ...doc.data()
      } as Restaurant);
    });
    
    return restaurants;
  } catch (error) {
    console.error('Error getting restaurants by category: ', error);
    throw error;
  }
};

// レストランデータを更新
export const updateRestaurant = async (id: string, updates: Partial<Restaurant>): Promise<void> => {
  try {
    const database = getFirestoreInstance();
    if (!database) {
      throw new Error('Firebase not available');
    }
    const restaurantRef = doc(database, RESTAURANTS_COLLECTION, id);
    await updateDoc(restaurantRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
    console.log('Restaurant updated successfully');
  } catch (error) {
    console.error('Error updating restaurant: ', error);
    throw error;
  }
};

// レストランデータを削除
export const deleteRestaurant = async (id: string): Promise<void> => {
  try {
    const database = getFirestoreInstance();
    if (!database) {
      throw new Error('Firebase not available');
    }
    await deleteDoc(doc(database, RESTAURANTS_COLLECTION, id));
    console.log('Restaurant deleted successfully');
  } catch (error) {
    console.error('Error deleting restaurant: ', error);
    throw error;
  }
};

// tokyo_restaurant.txtのデータをFirebaseに一括アップロード
export const uploadRestaurantData = async (): Promise<void> => {
  try {
    const restaurantData: Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: '築地本願寺カフェ Tsumugi',
        address: '東京都中央区築地3-15-1',
        rating: 4.2,
        userRatingsTotal: 1250,
        placeId: 'ChIJabcdef123456789',
        categories: ['restaurant', 'cafe', 'meal_takeaway'],
        isOpen: true,
        priceLevel: 2,
        coordinates: {
          lat: 35.6762,
          lng: 139.7677
        },
        operationalStatus: 'OPERATIONAL',
        fullAddress: '〒104-0045 東京都中央区築地3-15-1 築地本願寺内',
        phoneNumber: '03-6226-2728',
        website: 'https://tsukiji-hongwanji.jp/tsumugi/',
        googleMapsUrl: 'https://maps.google.com/?cid=123456789',
        openingHours: {
          '月曜日': '8:00 - 21:00',
          '火曜日': '8:00 - 21:00',
          '水曜日': '8:00 - 21:00',
          '木曜日': '8:00 - 21:00',
          '金曜日': '8:00 - 21:00',
          '土曜日': '8:00 - 21:00',
          '日曜日': '8:00 - 21:00'
        },
        reviews: [
          {
            rating: 5,
            author: '田中花子',
            content: '築地本願寺の中にある素敵なカフェです。18品目の朝ごはんが有名で、バランスの良い和食をいただけます。雰囲気も良く、観光の合間にほっと一息つけます。'
          },
          {
            rating: 4,
            author: '佐藤太郎',
            content: '朝食が充実していて美味しいです。お寺の中という立地も珍しく、落ち着いた空間でゆっくりできました。価格もリーズナブルです。'
          }
        ],
        photos: ['tsumugi_cafe.jpg'],
        cuisine: '和食・カフェ',
        serviceOptions: ['テイクアウト', '店内飲食'],
        mealOptions: ['朝食', '昼食', 'デザート'],
        atmosphere: '静寂で落ち着いた寺院内のモダンカフェ',
        suitableFor: ['観光', '朝食', '一人食事', '友人との食事'],
        reservationRequired: false,
        priceRange: '1000-2000円',
        seatingCapacity: 80,
        privateRooms: false,
        smokingAllowed: false,
        accessibility: '車椅子対応',
        parking: false,
        creditCards: ['VISA', 'MasterCard', 'JCB'],
        wifi: true,
        alcohol: false,
        specialMenus: [
          {
            name: '18品目の朝ごはん',
            price: '1080円',
            description: '築地本願寺オリジナルの朝食セット。18品目の小鉢が楽しめる'
          },
          {
            name: '精進カレー',
            price: '1200円',
            description: '野菜だけで作られた本格的な精進カレー'
          }
        ],
        seasonalMenus: '春は桜餅、夏は冷やし汁粉、秋は栗ぜんざい、冬は甘酒',
        chefInfo: '精進料理の専門シェフが監修',
        awards: ['グッドデザイン賞2018'],
        tabelogRating: 3.8,
        gurunaviUrl: 'https://r.gnavi.co.jp/tsumugi-cafe/'
      },
      {
        name: 'すきやばし次郎 本店',
        address: '東京都中央区銀座4-2-15',
        rating: 4.8,
        userRatingsTotal: 892,
        placeId: 'ChIJxyz789012345678',
        categories: ['restaurant', 'sushi_restaurant'],
        isOpen: false,
        priceLevel: 5,
        coordinates: {
          lat: 35.6717,
          lng: 139.7647
        },
        operationalStatus: 'OPERATIONAL',
        fullAddress: '〒104-0061 東京都中央区銀座4-2-15 塚本素山ビル B1F',
        phoneNumber: '03-3535-3600',
        googleMapsUrl: 'https://maps.google.com/?cid=987654321',
        openingHours: {
          '月曜日': '11:30 - 14:00, 17:00 - 20:30',
          '火曜日': '11:30 - 14:00, 17:00 - 20:30',
          '水曜日': '11:30 - 14:00, 17:00 - 20:30',
          '木曜日': '11:30 - 14:00, 17:00 - 20:30',
          '金曜日': '11:30 - 14:00, 17:00 - 20:30',
          '土曜日': '11:30 - 14:00, 17:00 - 20:30',
          '日曜日': '休み'
        },
        reviews: [
          {
            rating: 5,
            author: '山田一郎',
            content: '世界的に有名な鮨の名店。小野二郎さんの技術は芸術レベルです。一生に一度は行きたいお店で、期待を裏切らない素晴らしい体験でした。'
          },
          {
            rating: 5,
            author: '鈴木美子',
            content: '予約を取るのが大変でしたが、それだけの価値がありました。一貫一貫が完璧で、職人の技を間近で見ることができ感動しました。'
          }
        ],
        photos: ['sukiyabashi_jiro.jpg'],
        cuisine: '寿司',
        serviceOptions: ['店内飲食'],
        mealOptions: ['昼食', '夕食'],
        atmosphere: '伝統的で厳格な江戸前鮨の世界',
        suitableFor: ['特別な日', 'ビジネス接待', '記念日'],
        reservationRequired: true,
        priceRange: '30000-50000円',
        seatingCapacity: 10,
        privateRooms: false,
        smokingAllowed: false,
        accessibility: '階段のみ',
        parking: false,
        creditCards: ['VISA', 'MasterCard', 'AMEX'],
        wifi: false,
        alcohol: true,
        specialMenus: [
          {
            name: 'おまかせコース',
            price: '40000円',
            description: '小野二郎が厳選したネタによる究極のおまかせコース'
          }
        ],
        seasonalMenus: '四季の旬のネタを使用した鮨',
        chefInfo: '小野二郎 - 世界的に有名な鮨職人、映画「二郎は鮨の夢を見る」の主人公',
        awards: ['ミシュラン三つ星', '黄綬褒章', '現代の名工'],
        michelinStars: 3,
        tabelogRating: 4.65
      },
      {
        name: '一蘭 渋谷店',
        address: '東京都渋谷区道玄坂2-29-11',
        rating: 4.1,
        userRatingsTotal: 3240,
        placeId: 'ChIJabc123456789012',
        categories: ['restaurant', 'ramen_restaurant', 'meal_takeaway'],
        isOpen: true,
        priceLevel: 2,
        coordinates: {
          lat: 35.6580,
          lng: 139.6982
        },
        operationalStatus: 'OPERATIONAL',
        fullAddress: '〒150-0043 東京都渋谷区道玄坂2-29-11 第六セントラルビル 1F',
        phoneNumber: '03-3770-0850',
        website: 'https://ichiran.com/',
        googleMapsUrl: 'https://maps.google.com/?cid=555666777',
        openingHours: {
          '月曜日': '24時間営業',
          '火曜日': '24時間営業',
          '水曜日': '24時間営業',
          '木曜日': '24時間営業',
          '金曜日': '24時間営業',
          '土曜日': '24時間営業',
          '日曜日': '24時間営業'
        },
        reviews: [
          {
            rating: 4,
            author: '高橋次郎',
            content: '一人一人のブースに分かれていて、ラーメンに集中できます。豚骨スープが濃厚で美味しく、夜中でも食べられるのが嬉しいです。'
          },
          {
            rating: 4,
            author: '加藤花音',
            content: 'カスタマイズできるのが良いですね。辛さや麺の硬さを調整できて、自分好みのラーメンが楽しめます。外国人観光客にも人気です。'
          }
        ],
        photos: ['ichiran_shibuya.jpg'],
        cuisine: 'ラーメン',
        serviceOptions: ['店内飲食', 'テイクアウト'],
        mealOptions: ['昼食', '夕食', '夜食'],
        atmosphere: '集中できる個人ブース型',
        suitableFor: ['一人食事', '深夜食事', '観光'],
        reservationRequired: false,
        priceRange: '800-1500円',
        seatingCapacity: 32,
        privateRooms: false,
        smokingAllowed: false,
        accessibility: '車椅子対応',
        parking: false,
        creditCards: ['VISA', 'MasterCard', 'JCB', 'AMEX'],
        wifi: true,
        alcohol: false,
        specialMenus: [
          {
            name: 'とんこつラーメン',
            price: '890円',
            description: '一蘭オリジナルの赤い秘伝のタレが特徴の豚骨ラーメン'
          },
          {
            name: '替え玉',
            price: '190円',
            description: '追加の麺。硬さをカスタマイズ可能'
          }
        ],
        seasonalMenus: '期間限定で辛子高菜や半熟卵などのトッピング',
        chefInfo: '一蘭独自の製法で作られた豚骨スープを専門スタッフが調理',
        awards: [],
        tabelogRating: 3.2,
        gurunaviUrl: 'https://r.gnavi.co.jp/ichiran-shibuya/',
        hotpepperUrl: 'https://www.hotpepper.jp/strJ001234567/'
      }
    ];

    // 各レストランをFirestoreに追加
    for (const restaurant of restaurantData) {
      await addRestaurant(restaurant);
    }

    console.log('All restaurant data uploaded successfully!');
  } catch (error) {
    console.error('Error uploading restaurant data: ', error);
    throw error;
  }
};

export default {
  addRestaurant,
  getAllRestaurants,
  getRestaurantsByCategory,
  updateRestaurant,
  deleteRestaurant,
  uploadRestaurantData
};