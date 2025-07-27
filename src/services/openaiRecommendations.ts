import OpenAI from 'openai';

export interface NearbyPlace {
  id: string;
  name: string;
  category: 'restaurant' | 'shopping' | 'attraction';
  rating: number;
  priceLevel?: number;
  distance: string;
  address: string;
  hours?: string;
  phone?: string;
  website?: string;
  description: string;
  image: string;
  specialFeatures?: string[];
}

export interface NearbyRecommendationsRequest {
  locationName: string;
  locationAddress?: string;
  locationCategory: string;
  categories: ('restaurant' | 'shopping' | 'attraction')[];
}

export interface NearbyRecommendationsResponse {
  [key: string]: NearbyPlace[];
}

// OpenAI クライアントを初期化
const getOpenAIClient = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('VITE_OPENAI_API_KEY environment variable is missing');
  }
  
  return new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });
};

export const getNearbyRecommendations = async (
  request: NearbyRecommendationsRequest
): Promise<NearbyRecommendationsResponse> => {
  try {
    const openai = getOpenAIClient();
    const prompt = createRecommendationPrompt(request);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `あなたは東京の観光ガイドです。指定された場所の周辺にある実際のおすすめスポットを、カテゴリ別に詳細な情報とともに提案してください。

重要な要件:
1. 実在する店舗・スポットのみを提案する
2. 正確な住所、営業時間、電話番号を含める
3. 徒歩圏内（10-15分以内）のスポットを優先する
4. 各カテゴリ3-4件程度を提案する
5. 評価は4.0-5.0の範囲で現実的な数値を設定する
6. 価格レベルは1-4で設定（1=安い、4=高級）

回答は必ずJSON形式で返してください。`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('OpenAI APIから応答が得られませんでした');
    }

    // JSONパースを試行
    try {
      const parsedResponse = JSON.parse(responseText);
      return transformOpenAIResponse(parsedResponse);
    } catch (parseError) {
      console.error('OpenAI response parsing failed:', parseError);
      return getFallbackRecommendations(request);
    }

  } catch (error) {
    console.error('OpenAI API error:', error);
    return getFallbackRecommendations(request);
  }
};

const createRecommendationPrompt = (request: NearbyRecommendationsRequest): string => {
  return `
東京の「${request.locationName}」の周辺にある以下のカテゴリのおすすめスポットを教えてください：

対象カテゴリ: ${request.categories.join(', ')}
場所: ${request.locationName}${request.locationAddress ? ` (${request.locationAddress})` : ''}
元の場所のカテゴリ: ${request.locationCategory}

以下のJSON形式で回答してください：

{
  "restaurant": [
    {
      "id": "unique_id",
      "name": "店舗名",
      "category": "restaurant",
      "rating": 4.5,
      "priceLevel": 2,
      "distance": "徒歩5分",
      "address": "正確な住所",
      "hours": "営業時間",
      "phone": "電話番号",
      "website": "ウェブサイトURL（あれば）",
      "description": "詳細な説明（80-120文字）",
      "image": "/images/restaurants/placeholder.jpg",
      "specialFeatures": ["特徴1", "特徴2", "特徴3"]
    }
  ],
  "shopping": [...],
  "attraction": [...]
}

各カテゴリに3-4件のスポットを含めてください。実在するスポットのみを提案し、正確な情報を提供してください。
`;
};

const transformOpenAIResponse = (response: any): NearbyRecommendationsResponse => {
  const result: NearbyRecommendationsResponse = {};
  
  // 各カテゴリの結果を変換
  ['restaurant', 'shopping', 'attraction'].forEach(category => {
    if (response[category] && Array.isArray(response[category])) {
      result[category] = response[category].map((place: any, index: number) => ({
        id: place.id || `${category}_${index}`,
        name: place.name || '名称不明',
        category: category as 'restaurant' | 'shopping' | 'attraction',
        rating: Math.min(Math.max(place.rating || 4.0, 3.0), 5.0),
        priceLevel: place.priceLevel || 2,
        distance: place.distance || '徒歩10分',
        address: place.address || '住所不明',
        hours: place.hours,
        phone: place.phone,
        website: place.website,
        description: place.description || '詳細情報なし',
        image: place.image || `/images/${category}/placeholder.jpg`,
        specialFeatures: Array.isArray(place.specialFeatures) 
          ? place.specialFeatures 
          : ['おすすめ']
      }));
    } else {
      result[category] = [];
    }
  });
  
  return result;
};

const getFallbackRecommendations = (request: NearbyRecommendationsRequest): NearbyRecommendationsResponse => {
  console.log('Using fallback recommendations for:', request.locationName);
  
  const fallbackData: NearbyRecommendationsResponse = {
    restaurant: [
      {
        id: 'fallback_restaurant_1',
        name: `${request.locationName}周辺のレストラン`,
        category: 'restaurant',
        rating: 4.2,
        priceLevel: 2,
        distance: '徒歩5分',
        address: '東京都内',
        hours: '11:00-22:00',
        description: 'この周辺には多くの美味しいレストランがあります。現地でお探しください。',
        image: '/images/restaurants/placeholder.jpg',
        specialFeatures: ['地元の味', '人気店']
      }
    ],
    shopping: [
      {
        id: 'fallback_shopping_1',
        name: `${request.locationName}周辺のお店`,
        category: 'shopping',
        rating: 4.0,
        distance: '徒歩8分',
        address: '東京都内',
        hours: '10:00-20:00',
        description: 'この周辺にはお土産店や雑貨店があります。現地でお探しください。',
        image: '/images/shopping/placeholder.jpg',
        specialFeatures: ['お土産', '雑貨']
      }
    ],
    attraction: [
      {
        id: 'fallback_attraction_1',
        name: `${request.locationName}周辺の観光スポット`,
        category: 'attraction',
        rating: 4.3,
        distance: '徒歩10分',
        address: '東京都内',
        hours: '9:00-17:00',
        description: 'この周辺には見どころのある観光スポットがあります。現地でお探しください。',
        image: '/images/attractions/placeholder.jpg',
        specialFeatures: ['歴史', '文化']
      }
    ]
  };

  return fallbackData;
};

// APIキーの存在確認
export const checkOpenAIApiKey = (): boolean => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  return !!(apiKey && apiKey.length > 0);
};