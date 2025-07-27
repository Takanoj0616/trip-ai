import { Planner } from '../types/planner';

// Firebase Firestore用のプランナーデータ
// コレクション名: "planners"
export const plannersForFirebase = {
  // ドキュメントID: planner-1
  'planner-1': {
    id: 'planner-1',
    name: '田中 美咲',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c4?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 127,
    specialties: ['グルメツアー', '文化体験', 'インスタ映えスポット'],
    areas: ['東京', '横浜'],
    categories: ['飲食', '観光', 'ショッピング'],
    priceRange: { min: 5000, max: 50000 },
    experience: 5,
    languages: ['日本語', '英語'],
    description: '東京・横浜のグルメと文化を愛するプランナーです。隠れた名店から話題のスポットまで、あなただけの特別な旅をご提案します。',
    completedTrips: 156,
    responseTime: '30分以内',
    availability: true,
    portfolio: [
      {
        title: '築地グルメ満喫1日コース',
        image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&h=300&fit=crop',
        description: '築地場外市場での朝食から始まる本格グルメツアー',
        duration: '1日',
        budget: '8,000円〜'
      },
      {
        title: '浅草文化体験コース',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
        description: '伝統工芸体験と老舗グルメを楽しむ文化的な1日',
        duration: '半日',
        budget: '12,000円〜'
      }
    ]
  },
  // ドキュメントID: planner-2
  'planner-2': {
    id: 'planner-2',
    name: '佐藤 健太郎',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 89,
    specialties: ['歴史探訪', '神社仏閣', '穴場スポット'],
    areas: ['東京', '横浜'],
    categories: ['観光', '自然', '文化'],
    priceRange: { min: 3000, max: 30000 },
    experience: 3,
    languages: ['日本語', '英語', '中国語'],
    description: '歴史と文化に詳しいプランナーです。東京の隠れた歴史スポットや、地元の人しか知らない穴場をご案内します。',
    completedTrips: 98,
    responseTime: '1時間以内',
    availability: true,
    portfolio: [
      {
        title: '東京歴史散歩コース',
        image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=300&fit=crop',
        description: '江戸の面影を残す下町を巡る歴史探訪',
        duration: '1日',
        budget: '5,000円〜'
      },
      {
        title: '神社仏閣巡りコース',
        image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
        description: '都内の有名神社と隠れた名刹を巡る心の旅',
        duration: '半日',
        budget: '3,000円〜'
      }
    ]
  },
  // ドキュメントID: planner-3
  'planner-3': {
    id: 'planner-3',
    name: '山田 あかり',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    reviewCount: 156,
    specialties: ['ファミリー旅行', '子連れ観光', 'テーマパーク'],
    areas: ['東京', '横浜'],
    categories: ['観光', 'ショッピング', 'エンターテイメント'],
    priceRange: { min: 8000, max: 80000 },
    experience: 7,
    languages: ['日本語'],
    description: 'ファミリー旅行専門プランナーです。お子様連れでも安心して楽しめる旅程をご提案。親子で素敵な思い出を作りましょう！',
    completedTrips: 203,
    responseTime: '2時間以内',
    availability: true,
    portfolio: [
      {
        title: '親子で楽しむ東京1日コース',
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=300&fit=crop',
        description: '子供も大人も楽しめるバランスの良い観光コース',
        duration: '1日',
        budget: '15,000円〜'
      },
      {
        title: '横浜みなとみらい満喫コース',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
        description: 'ファミリーで楽しむ横浜の魅力満載プラン',
        duration: '1日',
        budget: '20,000円〜'
      }
    ]
  },
  // ドキュメントID: planner-4
  'planner-4': {
    id: 'planner-4',
    name: 'Emily Thompson',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 74,
    specialties: ['外国人向けガイド', '文化体験', '言語サポート'],
    areas: ['東京', '横浜'],
    categories: ['観光', '飲食', '文化'],
    priceRange: { min: 10000, max: 60000 },
    experience: 4,
    languages: ['English', '日本語', 'Français'],
    description: 'International travel planner specializing in authentic Japanese experiences for foreign visitors. Let me help you discover the real Japan!',
    completedTrips: 112,
    responseTime: '1時間以内',
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
    ]
  },
  // ドキュメントID: planner-5
  'planner-5': {
    id: 'planner-5',
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
    responseTime: '1時間以内',
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
    ]
  }
};

// フロントエンド用のプランナーデータ（配列形式）
export const planners: Planner[] = Object.values(plannersForFirebase);

export const getMatchingPlanners = (
  areas: string[],
  categories: string[],
  budget: { min: number; max: number }
): Planner[] => {
  return planners.filter(planner => {
    const areaMatch = areas.some(area => planner.areas.includes(area));
    const categoryMatch = categories.some(category => planner.categories.includes(category));
    const budgetMatch = planner.priceRange.min <= budget.max && planner.priceRange.max >= budget.min;
    
    return areaMatch && categoryMatch && budgetMatch && planner.availability;
  }).sort((a, b) => b.rating - a.rating);
};