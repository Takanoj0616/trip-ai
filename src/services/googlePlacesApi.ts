// Mock Places API Service
// Google Places API の代わりにモックデータを使用

import type { GooglePlace } from '../types/api';

export const searchTokyoTouristSpots = async (): Promise<GooglePlace[]> => {
  // モックデータを返す
  return getMockPlaces();
};

// 東京タワーの詳細情報を取得
export const getTokyoTowerGoogleInfo = async () => {
  // モックデータを返す
  return getMockTokyoTowerInfo();
};

// モックの観光スポットデータ
const getMockPlaces = (): GooglePlace[] => {
  return [
    {
      place_id: 'tokyo_tower',
      name: '東京タワー',
      formatted_address: '東京都港区芝公園4-2-8',
      rating: 4.3,
      user_ratings_total: 15000,
      photos: [{ photo_reference: 'tokyo_tower.jpg', height: 800, width: 600 }],
      geometry: {
        location: { lat: 35.6585769, lng: 139.7454506 }
      },
      types: ['tourist_attraction', 'point_of_interest']
    },
    {
      place_id: 'tokyo_skytree',
      name: '東京スカイツリー',
      formatted_address: '東京都墨田区押上1-1-2',
      rating: 4.4,
      user_ratings_total: 18000,
      photos: [{ photo_reference: 'tokyo_skytree.jpg', height: 800, width: 600 }],
      geometry: {
        location: { lat: 35.7100627, lng: 139.8107004 }
      },
      types: ['tourist_attraction', 'point_of_interest']
    },
    {
      place_id: 'sensoji',
      name: '浅草寺',
      formatted_address: '東京都台東区浅草2-3-1',
      rating: 4.5,
      user_ratings_total: 22000,
      photos: [{ photo_reference: 'sensoji.jpg', height: 800, width: 600 }],
      geometry: {
        location: { lat: 35.7147651, lng: 139.7965594 }
      },
      types: ['tourist_attraction', 'point_of_interest', 'establishment']
    },
    {
      place_id: 'shibuya_crossing',
      name: '渋谷スクランブル交差点',
      formatted_address: '東京都渋谷区渋谷2-1-1',
      rating: 4.2,
      user_ratings_total: 12000,
      photos: [{ photo_reference: 'shibuya_crossing.jpg', height: 800, width: 600 }],
      geometry: {
        location: { lat: 35.6591479, lng: 139.7005657 }
      },
      types: ['tourist_attraction', 'point_of_interest']
    },
    {
      place_id: 'ueno_zoo',
      name: '上野動物園',
      formatted_address: '東京都台東区上野公園9-83',
      rating: 4.1,
      user_ratings_total: 8000,
      photos: [{ photo_reference: 'ueno_zoo.jpg', height: 800, width: 600 }],
      geometry: {
        location: { lat: 35.7169281, lng: 139.7706166 }
      },
      types: ['tourist_attraction', 'point_of_interest', 'establishment']
    },
    {
      place_id: 'meiji_shrine',
      name: '明治神宮',
      formatted_address: '東京都渋谷区代々木神園町1-1',
      rating: 4.6,
      user_ratings_total: 16000,
      photos: [{ photo_reference: 'meiji_shrine.jpg', height: 800, width: 600 }],
      geometry: {
        location: { lat: 35.6763976, lng: 139.6993259 }
      },
      types: ['tourist_attraction', 'point_of_interest', 'establishment']
    },
    {
      place_id: 'shinjuku_garden',
      name: '新宿御苑',
      formatted_address: '東京都新宿区内藤町11',
      rating: 4.3,
      user_ratings_total: 9000,
      photos: [{ photo_reference: 'shinjuku_garden.jpg', height: 800, width: 600 }],
      geometry: {
        location: { lat: 35.6851471, lng: 139.7100991 }
      },
      types: ['tourist_attraction', 'point_of_interest', 'establishment']
    },
    {
      place_id: 'tsukiji_market',
      name: '築地場外市場',
      formatted_address: '東京都中央区築地4-16-2',
      rating: 4.4,
      user_ratings_total: 11000,
      photos: [{ photo_reference: 'tsukiji_market.jpg', height: 800, width: 600 }],
      geometry: {
        location: { lat: 35.6654861, lng: 139.7706363 }
      },
      types: ['tourist_attraction', 'point_of_interest', 'establishment']
    }
  ];
};

// 東京タワーのモック情報
const getMockTokyoTowerInfo = () => {
  return {
    name: '東京タワー',
    rating: 4.2,
    userRatingsTotal: 15032,
    isOpen: true,
    currentOpeningHours: [
      '月曜日: 9:00～23:00',
      '火曜日: 9:00～23:00',
      '水曜日: 9:00～23:00',
      '木曜日: 9:00～23:00',
      '金曜日: 9:00～23:00',
      '土曜日: 9:00～23:00',
      '日曜日: 9:00～23:00'
    ],
    reviews: [
      {
        author: '山田太郎',
        rating: 5,
        text: '東京の象徴的なランドマークです。展望台からの景色は素晴らしく、特に夜景は息を呑む美しさです。',
        time: '2時間前'
      },
      {
        author: '佐藤花子',
        rating: 4,
        text: '料金は少し高めですが、東京の景色を一望できて満足でした。混雑していたので、平日に行くことをお勧めします。',
        time: '5時間前'
      },
      {
        author: 'John Smith',
        rating: 5,
        text: 'Amazing views of Tokyo! The tower is iconic and the observation deck provides fantastic 360-degree views.',
        time: '8時間前'
      },
      {
        author: '田中一郎',
        rating: 4,
        text: '昼間と夜の両方の景色を楽しめました。特に夕日の時間帯は最高でした。',
        time: '12時間前'
      },
      {
        author: 'Marie Dubois',
        rating: 5,
        text: 'Magnificent structure! Great views and the staff was very helpful. A must-visit when in Tokyo.',
        time: '1日前'
      }
    ],
    photos: [
      'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1533651819408-626a1d7bec4b?w=800&h=600&fit=crop'
    ],
    website: 'https://www.tokyotower.co.jp/',
    phoneNumber: '03-3433-5111'
  };
};

// Get photo URL for a place
export const getPlacePhoto = (photoReference: string, maxWidth: number = 400): string => {
  // In a real implementation, this would call Google Places Photo API
  // For now, return a placeholder or the photo reference as URL
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoReference}&key=YOUR_API_KEY`;
};