// Tokyo Tower X (Twitter) API Service
// 実際の本番環境では、X API v2を使用してリアルタイムデータを取得します

interface Tweet {
  id: string;
  text: string;
  author: string;
  username: string;
  createdAt: string;
  likes: number;
  retweets: number;
  replies: number;
}

// 実際のX API設定（環境変数から取得）
const X_API_CONFIG = {
  bearerToken: import.meta.env.VITE_X_BEARER_TOKEN,
  baseUrl: 'https://api.twitter.com/2'
};

// 直近2日以内の東京タワー関連ツイートを取得
export const getTokyoTowerTweets = async (): Promise<Tweet[]> => {
  try {
    // 実際のAPI実装の場合
    if (X_API_CONFIG.bearerToken) {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      
      const query = encodeURIComponent('東京タワー OR "Tokyo Tower" OR #東京タワー OR #TokyoTower -is:retweet');
      const startTime = twoDaysAgo.toISOString();
      
      const url = `${X_API_CONFIG.baseUrl}/tweets/search/recent?query=${query}&start_time=${startTime}&max_results=20&tweet.fields=created_at,author_id,public_metrics&user.fields=name,username&expansions=author_id`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${X_API_CONFIG.bearerToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('X API request failed');
      }
      
      const data = await response.json();
      
      // APIレスポンスを変換
      return data.data?.map((tweet: any) => {
        const user = data.includes?.users?.find((u: any) => u.id === tweet.author_id);
        return {
          id: tweet.id,
          text: tweet.text,
          author: user?.name || 'Unknown User',
          username: user?.username || 'unknown',
          createdAt: tweet.created_at,
          likes: tweet.public_metrics?.like_count || 0,
          retweets: tweet.public_metrics?.retweet_count || 0,
          replies: tweet.public_metrics?.reply_count || 0
        };
      }) || [];
    }
    
    // デモ用のモックデータ（実際のAPIが利用できない場合）
    return getMockTokyoTowerTweets();
    
  } catch (error) {
    console.error('Error fetching Tokyo Tower tweets:', error);
    // エラー時はモックデータを返す
    return getMockTokyoTowerTweets();
  }
};

// モックデータ（デモ用）
const getMockTokyoTowerTweets = (): Tweet[] => {
  const now = new Date();
  const mockTweets: Tweet[] = [
    {
      id: '1',
      text: '今日の東京タワーは快晴で最高の眺め！展望台からの富士山がくっきり見えます🗼✨ #東京タワー #絶景',
      author: '東京観光大好き',
      username: 'tokyo_lover123',
      createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2時間前
      likes: 342,
      retweets: 89,
      replies: 23
    },
    {
      id: '2',
      text: 'Tokyo Tower looking absolutely stunning today! The view from the top deck is incredible 🌸 #TokyoTower #Japan',
      author: 'Travel Japan',
      username: 'travel_japan_en',
      createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(), // 4時間前
      likes: 256,
      retweets: 67,
      replies: 15
    },
    {
      id: '3',
      text: '東京タワーのライトアップが始まりました！今夜は特別なイルミネーションで美しい✨ #東京タワー #夜景',
      author: '東京ナイトビュー',
      username: 'tokyo_night_view',
      createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(), // 8時間前
      likes: 478,
      retweets: 156,
      replies: 34
    },
    {
      id: '4',
      text: '東京タワーの展望台で素敵なプロポーズを見ました💕 とても感動的でした！ #東京タワー #プロポーズ',
      author: '東京散歩',
      username: 'tokyo_walk',
      createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(), // 12時間前
      likes: 189,
      retweets: 45,
      replies: 12
    },
    {
      id: '5',
      text: 'visited Tokyo Tower today and the weather was perfect! Great views all around 🌤️ #TokyoTower #Travel',
      author: 'Adventure Seeker',
      username: 'adventure_seeker',
      createdAt: new Date(now.getTime() - 18 * 60 * 60 * 1000).toISOString(), // 18時間前
      likes: 123,
      retweets: 28,
      replies: 8
    },
    {
      id: '6',
      text: '東京タワーの新しいカフェがオープン！コーヒーと景色が最高のコンビネーション☕🗼 #東京タワー #カフェ',
      author: 'Tokyo Café Guide',
      username: 'tokyo_cafe_guide',
      createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), // 1日前
      likes: 267,
      retweets: 78,
      replies: 19
    },
    {
      id: '7',
      text: 'Amazing sunset view from Tokyo Tower today! The sky was painted in beautiful colors 🌅 #TokyoTower #Sunset',
      author: 'Sky Watcher',
      username: 'sky_watcher_jp',
      createdAt: new Date(now.getTime() - 30 * 60 * 60 * 1000).toISOString(), // 1.25日前
      likes: 445,
      retweets: 134,
      replies: 27
    },
    {
      id: '8',
      text: '東京タワーから見る夜の東京は本当に美しい！キラキラした街明かりが幻想的✨ #東京タワー #夜景 #東京',
      author: '夜景フォトグラファー',
      username: 'night_photographer',
      createdAt: new Date(now.getTime() - 36 * 60 * 60 * 1000).toISOString(), // 1.5日前
      likes: 356,
      retweets: 98,
      replies: 21
    },
    {
      id: '9',
      text: 'The observation deck at Tokyo Tower offers 360-degree views of the city. Absolutely breathtaking! 🌆 #TokyoTower',
      author: 'City Explorer',
      username: 'city_explorer_tk',
      createdAt: new Date(now.getTime() - 42 * 60 * 60 * 1000).toISOString(), // 1.75日前
      likes: 234,
      retweets: 56,
      replies: 14
    },
    {
      id: '10',
      text: '東京タワーでの思い出を作りました！友達と一緒に見た景色は一生忘れません📸 #東京タワー #思い出',
      author: '青春旅行記',
      username: 'youth_travel_diary',
      createdAt: new Date(now.getTime() - 45 * 60 * 60 * 1000).toISOString(), // 1.875日前
      likes: 167,
      retweets: 34,
      replies: 9
    }
  ];

  // 直近2日以内のツイートのみフィルタリング
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  
  return mockTweets.filter(tweet => 
    new Date(tweet.createdAt) >= twoDaysAgo
  ).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// リアルタイム更新のためのヘルパー関数
export const subscribeToTokyoTowerTweets = (callback: (tweets: Tweet[]) => void) => {
  // 実際の実装では WebSocket や Server-Sent Events を使用
  const interval = setInterval(async () => {
    try {
      const tweets = await getTokyoTowerTweets();
      callback(tweets);
    } catch (error) {
      console.error('Error in real-time tweet subscription:', error);
    }
  }, 60000); // 1分毎に更新

  return () => clearInterval(interval);
};

export default {
  getTokyoTowerTweets,
  subscribeToTokyoTowerTweets
};