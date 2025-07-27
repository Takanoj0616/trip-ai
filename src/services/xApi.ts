import axios from 'axios';
import type { TweetResponse } from '../types/api';

const X_BEARER_TOKEN = import.meta.env.VITE_X_BEARER_TOKEN;
const X_API_BASE_URL = 'https://api.twitter.com/2';

const xApiClient = axios.create({
  baseURL: X_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${X_BEARER_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const searchTweets = async (query: string, maxResults: number = 50): Promise<TweetResponse> => {
  try {
    // Note: Twitter API requires server-side implementation due to CORS restrictions
    // For now, we'll use mock data and suggest implementing a backend proxy
    console.log('X API: Using mock data for query:', query);
    return getMockTweets();
  } catch (error) {
    console.error('X API Error:', error);
    // Fallback to mock data for development
    return getMockTweets();
  }
};

export const getTokyoTouristTweets = async (): Promise<TweetResponse> => {
  const queries = [
    '東京観光',
    '東京旅行',
    '浅草',
    '東京スカイツリー',
    '渋谷',
    '新宿',
    '原宿',
    '東京ディズニーランド',
    '上野',
    '銀座'
  ];
  
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  return await searchTweets(randomQuery, 50);
};

export const getSpotTweets = async (spotKeywords: string[], hashtags: string[]): Promise<TweetResponse> => {
  try {
    // Note: Twitter API requires server-side implementation due to CORS restrictions
    // For now, we'll use mock data and suggest implementing a backend proxy
    console.log('X API: Using mock data for spot:', spotKeywords[0]);
    return getSpotMockTweets(spotKeywords[0]);
  } catch (error) {
    console.error('X API Error for spot:', error);
    // Return spot-specific mock data
    return getSpotMockTweets(spotKeywords[0]);
  }
};

const getSpotMockTweets = (spotName: string): TweetResponse => {
  const spotTweets: Record<string, any[]> = {
    '東京タワー': [
      {
        id: 'tower1',
        text: '東京タワーの夜景が本当に美しい✨ 今日は空気が澄んでいて富士山まで見えました！ #東京タワー #夜景',
        author_id: 'user1',
        created_at: new Date().toISOString(),
        public_metrics: { retweet_count: 156, like_count: 890, reply_count: 23, quote_count: 12 },
        author: { id: 'user1', name: '東京フォトグラファー', username: 'tokyo_photo', profile_image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNkZGQiLz4KPHN2ZyB4PSIxMCIgeT0iMTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDEyQzkuNzkgMTIgOCAxMC4yMSA4IDhTOS43OSA2IDEyIDYgMTYgNy43OSAxNiAxMCAxNC4yMSAxMiAxMiAxMlpNMTIgMTRDMTYgMTIgMjAgMTMuNzkgMjAgMTZWMThINFYxNkM0IDEzLjc5IDggMTIgMTIgMTQiIGZpbGw9IiM5OTkiLz4KPC9zdmc+Cjwvc3ZnPgo=' },
      },
      {
        id: 'tower2',
        text: '東京タワーの展望台から見る東京の街並み、いつ見ても感動します🗼 外国人の友達も大喜びでした！',
        author_id: 'user2',
        created_at: new Date(Date.now() - 1800000).toISOString(),
        public_metrics: { retweet_count: 78, like_count: 445, reply_count: 15, quote_count: 7 },
        author: { id: 'user2', name: '旅行ガイド', username: 'travel_guide_jp', profile_image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNkZGQiLz4KPHN2ZyB4PSIxMCIgeT0iMTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDEyQzkuNzkgMTIgOCAxMC4yMSA4IDhTOS43OSA2IDEyIDYgMTYgNy43OSAxNiAxMCAxNC4yMSAxMiAxMiAxMlpNMTIgMTRDMTYgMTIgMjAgMTMuNzkgMjAgMTZWMThINFYxNkM0IDEzLjc5IDggMTIgMTIgMTQiIGZpbGw9IiM5OTkiLz4KPC9zdmc+Cjwvc3ZnPgo=' },
      }
    ],
    '東京スカイツリー': [
      {
        id: 'sky1',
        text: 'スカイツリーの634mからの景色は圧巻！天気が良くて関東平野が一望できました🌟 #東京スカイツリー #634m',
        author_id: 'user3',
        created_at: new Date().toISOString(),
        public_metrics: { retweet_count: 203, like_count: 1205, reply_count: 31, quote_count: 18 },
        author: { id: 'user3', name: '高所好き', username: 'height_lover', profile_image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNkZGQiLz4KPHN2ZyB4PSIxMCIgeT0iMTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDEyQzkuNzkgMTIgOCAxMC4yMSA4IDhTOS43OSA2IDEyIDYgMTYgNy43OSAxNiAxMCAxNC4yMSAxMiAxMiAxMlpNMTIgMTRDMTYgMTIgMjAgMTMuNzkgMjAgMTZWMThINFYxNkM0IDEzLjc5IDggMTIgMTIgMTQiIGZpbGw9IiM5OTkiLz4KPC9zdmc+Cjwvc3ZnPgo=' },
      }
    ],
    '浅草寺': [
      {
        id: 'asakusa1',
        text: '雷門をくぐって浅草寺へ⛩️ 仲見世通りでお土産も買えて最高の一日でした！ #浅草寺 #雷門 #仲見世通り',
        author_id: 'user4',
        created_at: new Date().toISOString(),
        public_metrics: { retweet_count: 89, like_count: 523, reply_count: 19, quote_count: 8 },
        author: { id: 'user4', name: '和文化愛好家', username: 'japan_culture', profile_image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNkZGQiLz4KPHN2ZyB4PSIxMCIgeT0iMTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDEyQzkuNzkgMTIgOCAxMC4yMSA4IDhTOS43OSA2IDEyIDYgMTYgNy43OSAxNiAxMCAxNC4yMSAxMiAxMiAxMlpNMTIgMTRDMTYgMTIgMjAgMTMuNzkgMjAgMTZWMThINFYxNkM0IDEzLjc5IDggMTIgMTIgMTQiIGZpbGw9IiM5OTkiLz4KPC9zdmc+Cjwvc3ZnPgo=' },
      }
    ]
  };

  const tweets = spotTweets[spotName] || spotTweets['東京タワー'];
  
  return {
    data: tweets,
    meta: { result_count: tweets.length },
  };
};

// Mock data for development/fallback
const getMockTweets = (): TweetResponse => ({
  data: [
    {
      id: '1',
      text: '東京スカイツリーからの夜景が最高でした！✨ #東京観光 #スカイツリー',
      author_id: 'user1',
      created_at: new Date().toISOString(),
      public_metrics: {
        retweet_count: 45,
        like_count: 230,
        reply_count: 12,
        quote_count: 8,
      },
      author: {
        id: 'user1',
        name: '旅行好きユーザー',
        username: 'travel_lover',
        profile_image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNkZGQiLz4KPHN2ZyB4PSIxMCIgeT0iMTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDEyQzkuNzkgMTIgOCAxMC4yMSA4IDhTOS43OSA2IDEyIDYgMTYgNy43OSAxNiAxMCAxNC4yMSAxMiAxMiAxMlpNMTIgMTRDMTYgMTIgMjAgMTMuNzkgMjAgMTZWMThINFYxNkM0IDEzLjc5IDggMTIgMTIgMTQiIGZpbGw9IiM5OTkiLz4KPC9zdmc+Cjwvc3ZnPgo=',
      },
    },
    {
      id: '2',
      text: '浅草の雷門で着物体験してきました🎌 外国人観光客の方々も喜んでました！',
      author_id: 'user2',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      public_metrics: {
        retweet_count: 23,
        like_count: 156,
        reply_count: 7,
        quote_count: 3,
      },
      author: {
        id: 'user2',
        name: '文化体験ガイド',
        username: 'culture_guide',
        profile_image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNkZGQiLz4KPHN2ZyB4PSIxMCIgeT0iMTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDEyQzkuNzkgMTIgOCAxMC4yMSA4IDhTOS43OSA2IDEyIDYgMTYgNy43OSAxNiAxMCAxNC4yMSAxMiAxMiAxMlpNMTIgMTRDMTYgMTIgMjAgMTMuNzkgMjAgMTZWMThINFYxNkM0IDEzLjc5IDggMTIgMTIgMTQiIGZpbGw9IiM5OTkiLz4KPC9zdmc+Cjwvc3ZnPgo=',
      },
    },
    {
      id: '3',
      text: '渋谷のスクランブル交差点、今日もすごい人でした😅 でも外国の友達は大興奮！',
      author_id: 'user3',
      created_at: new Date(Date.now() - 7200000).toISOString(),
      public_metrics: {
        retweet_count: 67,
        like_count: 342,
        reply_count: 18,
        quote_count: 12,
      },
      author: {
        id: 'user3',
        name: '東京ガイド',
        username: 'tokyo_guide',
        profile_image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNkZGQiLz4KPHN2ZyB4PSIxMCIgeT0iMTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDEyQzkuNzkgMTIgOCAxMC4yMSA4IDhTOS43OSA2IDEyIDYgMTYgNy43OSAxNiAxMCAxNC4yMSAxMiAxMiAxMlpNMTIgMTRDMTYgMTIgMjAgMTMuNzkgMjAgMTZWMThINFYxNkM0IDEzLjc5IDggMTIgMTIgMTQiIGZpbGw9IiM5OTkiLz4KPC9zdmc+Cjwvc3ZnPgo=',
      },
    },
  ],
  meta: {
    result_count: 3,
  },
});