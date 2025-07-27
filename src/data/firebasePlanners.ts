// Firebase Firestore Planner Data
// Collection name: "planners"

export const plannersForFirebase = {
  // Gourmet Specialist Planner
  'planner-001': {
    name: 'Misaki Tanaka',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c4?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 127,
    specialties: ['Gourmet Tours', 'Cultural Experiences', 'Instagram-worthy Spots'],
    areas: ['Tokyo', 'Yokohama'],
    categories: ['Dining', 'Sightseeing', 'Shopping'],
    priceRange: { min: 5000, max: 50000 },
    experience: 5,
    languages: ['Japanese', 'English'],
    description: 'A passionate planner specializing in Tokyo and Yokohama\'s culinary scene and culture. From hidden gems to trending spots, I create unique travel experiences just for you.',
    completedTrips: 156,
    responseTime: 'Within 30 minutes',
    availability: true,
    portfolio: [
      {
        title: 'Tsukiji Gourmet Full Day Course',
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop',
        description: 'Authentic gourmet tour starting with breakfast at Tsukiji Outer Market',
        duration: '1 day',
        budget: 'From ¥8,000'
      },
      {
        title: 'Asakusa Cultural Experience Course',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
        description: 'A cultural day enjoying traditional crafts and authentic cuisine',
        duration: 'Half day',
        budget: 'From ¥12,000'
      }
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-12-01T15:30:00Z'
  },

  // History & Culture Specialist Planner
  'planner-002': {
    name: 'Kentaro Sato',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 89,
    specialties: ['Historical Tours', 'Temples & Shrines', 'Hidden Gems'],
    areas: ['Tokyo', 'Yokohama'],
    categories: ['Sightseeing', 'Nature', 'Culture'],
    priceRange: { min: 3000, max: 30000 },
    experience: 3,
    languages: ['Japanese', 'English', 'Chinese'],
    description: 'A history and culture expert planner. I guide you through Tokyo\'s hidden historical spots and secret places only locals know about.',
    completedTrips: 98,
    responseTime: 'Within 1 hour',
    availability: true,
    portfolio: [
      {
        title: 'Tokyo Historical Walking Tour',
        image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=300&fit=crop',
        description: 'Historical exploration through downtown areas preserving the spirit of Edo',
        duration: '1 day',
        budget: 'From ¥5,000'
      },
      {
        title: 'Temples & Shrines Pilgrimage',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
        description: 'A spiritual journey visiting famous shrines and hidden temples in Tokyo',
        duration: 'Half day',
        budget: 'From ¥3,000'
      }
    ],
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-11-28T12:15:00Z'
  },

  // Family Travel Specialist Planner
  'planner-003': {
    name: 'Akari Yamada',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    reviewCount: 156,
    specialties: ['Family Travel', 'Kid-Friendly Tours', 'Theme Parks'],
    areas: ['Tokyo', 'Yokohama'],
    categories: ['Sightseeing', 'Shopping', 'Entertainment'],
    priceRange: { min: 8000, max: 80000 },
    experience: 7,
    languages: ['Japanese', 'English'],
    description: 'A family travel specialist planner. I create safe and enjoyable itineraries for families with children. Let\'s make wonderful memories together!',
    completedTrips: 203,
    responseTime: 'Within 2 hours',
    availability: true,
    portfolio: [
      {
        title: 'Family Fun Tokyo Full Day Course',
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop',
        description: 'A well-balanced sightseeing course enjoyable for both kids and adults',
        duration: '1 day',
        budget: 'From ¥15,000'
      },
      {
        title: 'Yokohama Minato Mirai Adventure',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
        description: 'A family-friendly plan packed with Yokohama\'s attractions',
        duration: '1 day',
        budget: 'From ¥20,000'
      }
    ],
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-11-30T16:45:00Z'
  },

  // International Travel Specialist Planner
  'planner-004': {
    name: 'Emily Thompson',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 74,
    specialties: ['International Guide', 'Cultural Experiences', 'Language Support'],
    areas: ['Tokyo', 'Yokohama'],
    categories: ['Sightseeing', 'Dining', 'Culture'],
    priceRange: { min: 10000, max: 60000 },
    experience: 4,
    languages: ['English', 'Japanese', 'Français'],
    description: 'International travel planner specializing in authentic Japanese experiences for foreign visitors. Let me help you discover the real Japan!',
    completedTrips: 112,
    responseTime: 'Within 1 hour',
    availability: true,
    portfolio: [
      {
        title: 'Traditional Tokyo Experience',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
        description: 'Authentic cultural experience in traditional Tokyo districts',
        duration: '1 day',
        budget: '¥12,000~'
      },
      {
        title: 'Modern Tokyo Adventure',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
        description: 'Explore contemporary Tokyo culture and technology',
        duration: '1 day',
        budget: '¥15,000~'
      }
    ],
    createdAt: '2024-03-01T11:00:00Z',
    updatedAt: '2024-12-01T10:20:00Z'
  },

  // 夜景・デート専門プランナー
  'planner-005': {
    name: '鈴木 大輔',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.6,
    reviewCount: 92,
    specialties: ['夜景スポット', 'バー巡り', 'デート向けプラン'],
    areas: ['東京', '横浜'],
    categories: ['飲食', '観光', 'カフェ・バー'],
    priceRange: { min: 8000, max: 100000 },
    experience: 6,
    languages: ['日本語', '英語'],
    description: '東京・横浜の夜を知り尽くしたプランナーです。ロマンチックなデートプランから大人の夜遊びまで、素敵な夜をプロデュースします。',
    completedTrips: 145,
    responseTime: 'Within 1 hour',
    availability: true,
    portfolio: [
      {
        title: 'ロマンチック夜景デートコース',
        image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=300&fit=crop',
        description: '東京湾の夜景を楽しむ大人のデートプラン',
        duration: '夜',
        budget: '20,000円〜'
      },
      {
        title: '大人のバー巡りコース',
        image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=300&fit=crop',
        description: '隠れ家バーから話題のカクテルバーまで',
        duration: '夜',
        budget: '15,000円〜'
      }
    ],
    createdAt: '2024-02-15T13:45:00Z',
    updatedAt: '2024-11-29T18:30:00Z'
  },

  // アニメ・サブカル専門プランナー
  'planner-006': {
    name: '高橋 りんか',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 134,
    specialties: ['アニメ聖地巡礼', 'オタク文化', 'サブカルチャー'],
    areas: ['東京', '横浜'],
    categories: ['観光', 'ショッピング', 'エンターテイメント'],
    priceRange: { min: 4000, max: 40000 },
    experience: 4,
    languages: ['日本語', '英語', '韓国語'],
    description: 'アニメ・漫画・ゲーム文化を愛するプランナーです。聖地巡礼から最新のポップカルチャーまで、オタク心をくすぐる特別な旅をご案内します！',
    completedTrips: 189,
    responseTime: '30分以内',
    availability: true,
    portfolio: [
      {
        title: '秋葉原＆原宿オタク文化体験',
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop',
        description: 'メイドカフェからアニメショップまで、サブカル聖地を巡る',
        duration: '1日',
        budget: '8,000円〜'
      },
      {
        title: 'アニメ聖地巡礼ツアー',
        image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
        description: '人気アニメの舞台となった場所を詳しく解説付きで巡る',
        duration: '半日',
        budget: '6,000円〜'
      }
    ],
    createdAt: '2024-03-10T16:20:00Z',
    updatedAt: '2024-12-01T14:10:00Z'
  },

  // ラグジュアリー専門プランナー
  'planner-007': {
    name: '松本 雅彦',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 67,
    specialties: ['高級レストラン', 'ラグジュアリー体験', 'VIP対応'],
    areas: ['東京', '横浜'],
    categories: ['飲食', '観光', 'ショッピング'],
    priceRange: { min: 30000, max: 200000 },
    experience: 8,
    languages: ['日本語', '英語'],
    description: '最高級のおもてなしと贅沢な体験をご提供する、ラグジュアリー専門プランナーです。特別な記念日や大切な方との時間を最高の思い出にします。',
    completedTrips: 89,
    responseTime: '2時間以内',
    availability: true,
    portfolio: [
      {
        title: 'ミシュラン星付きレストラン巡り',
        image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
        description: '東京の最高級レストランで至極の美食体験',
        duration: '1日',
        budget: '50,000円〜'
      },
      {
        title: 'プライベートヘリで東京観光',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
        description: '空から東京を一望する特別な体験',
        duration: '半日',
        budget: '80,000円〜'
      }
    ],
    createdAt: '2024-01-05T08:30:00Z',
    updatedAt: '2024-11-25T11:45:00Z'
  },

  // 節約・格安専門プランナー
  'planner-008': {
    name: '伊藤 みお',
    avatar: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    reviewCount: 203,
    specialties: ['格安旅行', '節約術', 'コスパ重視'],
    areas: ['東京', '横浜'],
    categories: ['観光', '飲食', '自然'],
    priceRange: { min: 1000, max: 15000 },
    experience: 3,
    languages: ['日本語'],
    description: '少ない予算でも最大限に楽しめる旅をプロデュースします！学生さんや節約派の方におすすめ。無料スポットや格安グルメ情報が豊富です。',
    completedTrips: 267,
    responseTime: 'Within 1 hour',
    availability: true,
    portfolio: [
      {
        title: '東京1日2,000円以下観光',
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop',
        description: '無料スポットと格安グルメで東京を満喫',
        duration: '1日',
        budget: '2,000円以下'
      },
      {
        title: '学生向け横浜デートプラン',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
        description: 'お財布に優しい横浜デートコース',
        duration: '半日',
        budget: '3,000円〜'
      }
    ],
    createdAt: '2024-04-01T12:00:00Z',
    updatedAt: '2024-12-01T09:30:00Z'
  },

  // 自然・アウトドア専門プランナー
  'planner-009': {
    name: '森田 拓也',
    avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face',
    rating: 4.6,
    reviewCount: 88,
    specialties: ['自然体験', 'アウトドア', 'ハイキング'],
    areas: ['東京', '横浜'],
    categories: ['自然', '観光', 'アクティビティ'],
    priceRange: { min: 3000, max: 25000 },
    experience: 5,
    languages: ['日本語', '英語'],
    description: '都市部でも楽しめる自然体験をご提案します。公園散策からちょっとしたハイキングまで、緑豊かな東京・横浜を発見しましょう！',
    completedTrips: 134,
    responseTime: '3時間以内',
    availability: true,
    portfolio: [
      {
        title: '皇居外苑自然散策コース',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
        description: '都心で自然を感じる癒しの散策路',
        duration: '半日',
        budget: '3,000円〜'
      },
      {
        title: '高尾山日帰りハイキング',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
        description: '東京近郊の人気山で本格ハイキング体験',
        duration: '1日',
        budget: '5,000円〜'
      }
    ],
    createdAt: '2024-03-20T07:15:00Z',
    updatedAt: '2024-11-27T15:20:00Z'
  },

  // アート・美術専門プランナー
  'planner-010': {
    name: '中村 美香',
    avatar: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 76,
    specialties: ['美術館巡り', 'アート鑑賞', 'ギャラリー'],
    areas: ['東京', '横浜'],
    categories: ['文化', '観光', '芸術'],
    priceRange: { min: 4000, max: 35000 },
    experience: 6,
    languages: ['日本語', '英語', 'フランス語'],
    description: 'アートを愛するプランナーです。美術館やギャラリー巡りから、アーティストのアトリエ訪問まで、芸術的な東京を深くご案内します。',
    completedTrips: 112,
    responseTime: '2時間以内',
    availability: true,
    portfolio: [
      {
        title: '上野美術館巡りコース',
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
        description: '国立博物館から現代美術まで一日でアート三昧',
        duration: '1日',
        budget: '8,000円〜'
      },
      {
        title: '現代アートギャラリー巡り',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        description: '六本木・表参道の最新アートシーンを探訪',
        duration: '半日',
        budget: '6,000円〜'
      }
    ],
    createdAt: '2024-02-28T10:45:00Z',
    updatedAt: '2024-11-28T17:00:00Z'
  }
};

// Firebaseサービス用のヘルパー関数
export const createPlannerDocument = (plannerId: string, plannerData: any) => {
  return {
    id: plannerId,
    ...plannerData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

// Firebaseコレクションの構造
export const firebaseCollections = {
  planners: 'planners',
  travelRequests: 'travelRequests',
  messages: 'messages',
  itineraries: 'itineraries'
};

// Firebase用のプランナー配列（React用）
export const plannersArray = Object.entries(plannersForFirebase).map(([id, data]) => ({
  id,
  ...data
}));