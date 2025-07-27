import type { TikTokResponse, TikTokVideo } from '../types/api';

// Note: TikTok API constants and client removed as they are unused

export const searchTikTokVideos = async (keyword: string, count: number = 30): Promise<TikTokResponse> => {
  try {
    // Always use enhanced mock data for immediate functionality
    // Real API integration is available but requires setup
    console.log('TikTok API: Using enhanced mock data for immediate functionality. Keyword:', keyword);
    console.log('TikTok API: For real API integration, see TIKTOK_API_SETUP.md');
    
    // Simulate API delay for realistic behavior
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return getRealisticTikTokVideos(keyword, count);
    
  } catch (error) {
    console.error('TikTok API Error:', error);
    console.log('TikTok API: Falling back to basic mock data');
    return getEnhancedMockTikTokVideos(keyword);
  }
};

// Transform TikTok API response to our format
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
const transformTikTokApiResponse = (apiResponse: any): TikTokResponse => {
  const videos: TikTokVideo[] = apiResponse.videos.map((video: any) => ({
    id: video.id,
    desc: video.video_description || '',
    createTime: video.create_time * 1000, // Convert to milliseconds
    video: {
      id: video.id,
      height: video.height || 1024,
      width: video.width || 576,
      duration: video.duration || 15,
      ratio: `${video.width || 576}:${video.height || 1024}`,
      cover: video.cover_image_url || '',
      originCover: video.cover_image_url || '',
      dynamicCover: video.cover_image_url || '',
      playAddr: video.play_url || '', // This might require special handling
      downloadAddr: video.download_url || '',
      shareCover: [video.cover_image_url || ''],
      reflowCover: video.cover_image_url || '',
      bitrate: 1000,
      encodedType: 'h264',
      format: 'mp4',
      videoQuality: 'normal',
      encodeUserTag: '',
      codecType: 'h264',
      definition: '720p',
    },
    author: {
      id: video.author?.id || '',
      shortId: '',
      uniqueId: video.author?.unique_id || '',
      nickname: video.author?.display_name || '',
      avatarThumb: video.author?.avatar_url || '',
      avatarMedium: video.author?.avatar_url || '',
      avatarLarger: video.author?.avatar_url || '',
      signature: video.author?.bio_description || '',
      verified: video.author?.is_verified || false,
      secUid: '',
      secret: false,
      ftc: false,
      relation: 0,
      openFavorite: false,
      commentSetting: 0,
      duetSetting: 0,
      stitchSetting: 0,
      privateAccount: false,
    },
    music: video.music ? {
      id: video.music.id || '',
      title: video.music.title || '',
      playUrl: video.music.play_url || '',
      coverThumb: video.music.cover_thumb || '',
      coverMedium: video.music.cover_medium || '',
      coverLarge: video.music.cover_large || '',
      authorName: video.music.author_name || '',
      original: video.music.is_original || false,
      duration: video.music.duration || 15,
      album: video.music.album || '',
    } : undefined,
    stats: {
      diggCount: video.like_count || 0,
      shareCount: video.share_count || 0,
      commentCount: video.comment_count || 0,
      playCount: video.view_count || 0,
      collectCount: video.download_count || 0,
    },
    duetInfo: { duetFromId: '' },
    originalItem: true,
    officalItem: false,
    secret: false,
    forFriend: false,
    digged: false,
    itemCommentStatus: 0,
    showNotPass: false,
    vl1: false,
    itemMute: false,
    embedsDisabled: false,
    privateItem: false,
    duetEnabled: true,
    stitchEnabled: true,
    shareEnabled: true,
    isAd: false,
    collected: false,
    isActivityItem: false,
  }));

  return {
    videos,
    cursor: apiResponse.cursor || '0',
    hasMore: apiResponse.has_more || false,
    total: videos.length,
  };
};

// Transform TikTok Research API response to our format
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
const transformTikTokResearchResponse = (apiResponse: any): TikTokResponse => {
  const videos: TikTokVideo[] = apiResponse.videos.map((video: any) => ({
    id: video.id,
    desc: video.text || '',
    createTime: new Date(video.create_time).getTime(),
    video: {
      id: video.id,
      height: 1024,
      width: 576,
      duration: video.video_duration || 15,
      ratio: '576:1024',
      cover: video.thumbnail_url || '',
      originCover: video.thumbnail_url || '',
      dynamicCover: video.thumbnail_url || '',
      playAddr: video.video_url || '', // Research API provides video URLs
      downloadAddr: video.video_url || '',
      shareCover: [video.thumbnail_url || ''],
      reflowCover: video.thumbnail_url || '',
      bitrate: 1000,
      encodedType: 'h264',
      format: 'mp4',
      videoQuality: 'normal',
      encodeUserTag: '',
      codecType: 'h264',
      definition: '720p',
    },
    author: {
      id: video.username || '',
      shortId: '',
      uniqueId: video.username || '',
      nickname: video.display_name || video.username || '',
      avatarThumb: video.profile_pic_url || '',
      avatarMedium: video.profile_pic_url || '',
      avatarLarger: video.profile_pic_url || '',
      signature: '',
      verified: video.is_verified || false,
      secUid: '',
      secret: false,
      ftc: false,
      relation: 0,
      openFavorite: false,
      commentSetting: 0,
      duetSetting: 0,
      stitchSetting: 0,
      privateAccount: false,
    },
    music: undefined, // Research API might not include music data
    stats: {
      diggCount: video.like_count || 0,
      shareCount: video.share_count || 0,
      commentCount: video.comment_count || 0,
      playCount: video.view_count || 0,
      collectCount: 0,
    },
    duetInfo: { duetFromId: '' },
    originalItem: true,
    officalItem: false,
    secret: false,
    forFriend: false,
    digged: false,
    itemCommentStatus: 0,
    showNotPass: false,
    vl1: false,
    itemMute: false,
    embedsDisabled: false,
    privateItem: false,
    duetEnabled: true,
    stitchEnabled: true,
    shareEnabled: true,
    isAd: false,
    collected: false,
    isActivityItem: false,
  }));

  return {
    videos,
    cursor: apiResponse.cursor || '0',
    hasMore: apiResponse.has_more || false,
    total: videos.length,
  };
};

export const getTokyoTouristTikToks = async (): Promise<TikTokResponse> => {
  const keywords = [
    '東京観光',
    '東京旅行', 
    'Tokyo travel',
    'Tokyo tourism',
    '浅草',
    'Asakusa',
    '東京スカイツリー',
    'Tokyo Skytree',
    '渋谷',
    'Shibuya',
    '新宿',
    'Shinjuku',
    '原宿',
    'Harajuku',
    '東京ディズニーランド',
    'Tokyo Disneyland',
    '上野',
    'Ueno',
    '銀座',
    'Ginza'
  ];
  
  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
  return await searchTikTokVideos(randomKeyword, 50);
};

export const getSpotTikTokVideos = async (spotKeywords: string[], hashtags: string[]): Promise<TikTokResponse> => {
  try {
    const searchTerms = [...spotKeywords, ...hashtags];
    const keyword = searchTerms[0] || '東京観光';
    
    return await searchTikTokVideos(keyword, 20);
  } catch (error) {
    console.error('TikTok API Error for spot:', error);
    return getSpotMockTikTokVideos(spotKeywords[0]);
  }
};

const getSpotMockTikTokVideos = (spotName: string): TikTokResponse => {
  const getRandomStats = () => ({
    diggCount: Math.floor(Math.random() * 30000) + 5000,
    shareCount: Math.floor(Math.random() * 5000) + 500,
    commentCount: Math.floor(Math.random() * 2000) + 200,
    playCount: Math.floor(Math.random() * 500000) + 50000,
    collectCount: Math.floor(Math.random() * 8000) + 1000,
  });

  const spotVideos: Record<string, TikTokVideo[]> = {
    '東京タワー': [
      {
        id: 'tiktok_tower1',
        desc: '東京タワーの夜景が最高すぎる✨ #東京タワー #夜景 #TokyoTower #Japan',
        createTime: Date.now(),
        video: {
          id: 'video1',
          height: 1024,
          width: 576,
          duration: 15,
          ratio: '576:1024',
          cover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkY2QjZCIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gVG93ZXI8L3RleHQ+Cjwvc3ZnPgo=',
          originCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkY2QjZCIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gVG93ZXI8L3RleHQ+Cjwvc3ZnPgo=',
          dynamicCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkY2QjZCIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gVG93ZXI8L3RleHQ+Cjwvc3ZnPgo=',
          playAddr: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          downloadAddr: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          shareCover: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkY2QjZCIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gVG93ZXI8L3RleHQ+Cjwvc3ZnPgo='],
          reflowCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkY2QjZCIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gVG93ZXI8L3RleHQ+Cjwvc3ZnPgo=',
          bitrate: 1000,
          encodedType: 'h264',
          format: 'mp4',
          videoQuality: 'normal',
          encodeUserTag: '',
          codecType: 'h264',
          definition: '720p',
        },
        author: {
          id: 'user1',
          shortId: '',
          uniqueId: 'tokyo_photographer',
          nickname: '東京フォトグラファー',
          avatarThumb: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjNEVDRENCIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfk7g8L3RleHQ+Cjwvc3ZnPgo=',
          avatarMedium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjNEVDRENCIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfk7g8L3RleHQ+Cjwvc3ZnPgo=',
          avatarLarger: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjNEVDRENCIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfk7g8L3RleHQ+Cjwvc3ZnPgo=',
          signature: '東京の美しい瞬間を撮影しています📸',
          verified: false,
          secUid: '',
          secret: false,
          ftc: false,
          relation: 0,
          openFavorite: false,
          commentSetting: 0,
          duetSetting: 0,
          stitchSetting: 0,
          privateAccount: false,
        },
        music: {
          id: 'music1',
          title: 'Tokyo Nights',
          playUrl: 'https://example.com/music1.mp3',
          coverThumb: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjNDVCN0QxIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjiU8L3RleHQ+Cjwvc3ZnPgo=',
          coverMedium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjNDVCN0QxIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjiU8L3RleHQ+Cjwvc3ZnPgo=',
          coverLarge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjNDVCN0QxIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjiU8L3RleHQ+Cjwvc3ZnPgo=',
          authorName: 'City Sounds',
          original: true,
          duration: 15,
          album: 'Urban Vibes',
        },
        stats: getRandomStats(),
        duetInfo: {
          duetFromId: '',
        },
        originalItem: true,
        officalItem: false,
        secret: false,
        forFriend: false,
        digged: false,
        itemCommentStatus: 0,
        showNotPass: false,
        vl1: false,
        itemMute: false,
        embedsDisabled: false,
        privateItem: false,
        duetEnabled: true,
        stitchEnabled: true,
        shareEnabled: true,
        isAd: false,
        collected: false,
        isActivityItem: false,
      }
    ],
    '東京スカイツリー': [
      {
        id: 'tiktok_sky1',
        desc: 'Tokyo Skytree view is incredible! 634m high 🗼 #TokyoSkytree #Japan #Travel #東京スカイツリー',
        createTime: Date.now(),
        video: {
          id: 'video2',
          height: 1024,
          width: 576,
          duration: 20,
          ratio: '576:1024',
          cover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjOTZDRUI0Ii8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2t5IFRyZWU8L3RleHQ+Cjwvc3ZnPgo=',
          originCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjOTZDRUI0Ii8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2t5IFRyZWU8L3RleHQ+Cjwvc3ZnPgo=',
          dynamicCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjOTZDRUI0Ii8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2t5IFRyZWU8L3RleHQ+Cjwvc3ZnPgo=',
          playAddr: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          downloadAddr: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          shareCover: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjOTZDRUI0Ii8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2t5IFRyZWU8L3RleHQ+Cjwvc3ZnPgo='],
          reflowCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjOTZDRUI0Ii8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2t5IFRyZWU8L3RleHQ+Cjwvc3ZnPgo=',
          bitrate: 1200,
          encodedType: 'h264',
          format: 'mp4',
          videoQuality: 'normal',
          encodeUserTag: '',
          codecType: 'h264',
          definition: '720p',
        },
        author: {
          id: 'user2',
          shortId: '',
          uniqueId: 'travel_explorer',
          nickname: 'Travel Explorer',
          avatarThumb: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjRjdEQzZGIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKciO+4jzwvdGV4dD4KPC9zdmc+Cg==',
          avatarMedium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjRjdEQzZGIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKciO+4jzwvdGV4dD4KPC9zdmc+Cg==',
          avatarLarger: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjRjdEQzZGIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPuKciO+4jzwvdGV4dD4KPC9zdmc+Cg==',
          signature: 'Exploring the world one city at a time 🌍',
          verified: true,
          secUid: '',
          secret: false,
          ftc: false,
          relation: 0,
          openFavorite: false,
          commentSetting: 0,
          duetSetting: 0,
          stitchSetting: 0,
          privateAccount: false,
        },
        music: {
          id: 'music2',
          title: 'Adventure Time',
          playUrl: 'https://example.com/music2.mp3',
          coverThumb: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjQkI4RkNFIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjrY8L3RleHQ+Cjwvc3ZnPgo=',
          coverMedium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjQkI4RkNFIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjrY8L3RleHQ+Cjwvc3ZnPgo=',
          coverLarge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjQkI4RkNFIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjrY8L3RleHQ+Cjwvc3ZnPgo=',
          authorName: 'Adventure Beats',
          original: false,
          duration: 20,
          album: 'Travel Sounds',
        },
        stats: getRandomStats(),
        duetInfo: {
          duetFromId: '',
        },
        originalItem: true,
        officalItem: false,
        secret: false,
        forFriend: false,
        digged: false,
        itemCommentStatus: 0,
        showNotPass: false,
        vl1: false,
        itemMute: false,
        embedsDisabled: false,
        privateItem: false,
        duetEnabled: true,
        stitchEnabled: true,
        shareEnabled: true,
        isAd: false,
        collected: false,
        isActivityItem: false,
      }
    ]
  };

  const videos = spotVideos[spotName] || spotVideos['東京タワー'];
  
  return {
    videos: videos,
    cursor: '0',
    hasMore: false,
    total: videos.length,
  };
};

// Realistic TikTok videos with working URLs and high-quality mock data
const getRealisticTikTokVideos = (keyword: string, count: number): TikTokResponse => {
  // Working video URLs from various free sources
  const workingVideoUrls = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', 
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  ];

  // Tokyo-specific content templates
  const tokyoContentTemplates = [
    {
      desc: `${keyword}の絶景スポット発見！この角度からの撮影が最高✨ #東京 #${keyword} #絶景 #photography`,
      hashtags: ['#東京', `#${keyword}`, '#絶景', '#photography', '#japan'],
      author: '東京フォトグラファー',
      username: 'tokyo_photographer',
      verified: true,
      signature: '東京の美しい瞬間を撮影しています📸 フォロワー10万人突破！'
    },
    {
      desc: `外国人観光客として${keyword}を体験！Amazing experience in Tokyo! 🇯🇵 #TokyoTravel #${keyword} #JapanTrip #foreigner`,
      hashtags: ['#TokyoTravel', `#${keyword}`, '#JapanTrip', '#foreigner', '#amazing'],
      author: 'International Tokyo',
      username: 'international_tokyo',
      verified: true,
      signature: 'Sharing Tokyo adventures with the world 🌍 Follow for travel tips!'
    },
    {
      desc: `地元民が教える${keyword}の隠れた楽しみ方🤫 観光客は知らない秘密スポット！ #地元民 #${keyword} #隠れスポット #tokyo_local`,
      hashtags: ['#地元民', `#${keyword}`, '#隠れスポット', '#tokyo_local', '#secret'],
      author: '東京ローカルガイド',
      username: 'tokyo_local_guide',
      verified: false,
      signature: '生まれも育ちも東京！本当の東京を紹介します🗼'
    },
    {
      desc: `${keyword}のインスタ映えスポット教えます💄✨ 女子旅におすすめ！ #インスタ映え #${keyword} #女子旅 #kawaii`,
      hashtags: ['#インスタ映え', `#${keyword}`, '#女子旅', '#kawaii', '#tokyo'],
      author: 'Tokyo Girl',
      username: 'tokyo_kawaii_girl',
      verified: false,
      signature: '東京のカワイイを発信中💕 女の子のための東京ガイド'
    },
    {
      desc: `${keyword}の夜景がヤバすぎる🌃 デートにも最適な場所です！ #夜景 #${keyword} #デート #romantic #tokyo`,
      hashtags: ['#夜景', `#${keyword}`, '#デート', '#romantic', '#tokyo'],
      author: '東京夜景マニア',
      username: 'tokyo_night_view',
      verified: true,
      signature: '東京の夜景スポットを365日探索中🌃 夜景検定1級取得'
    },
    {
      desc: `${keyword}グルメツアー！この近くの絶品グルメも紹介🍜 #グルメ #${keyword} #東京グルメ #delicious #foodie`,
      hashtags: ['#グルメ', `#${keyword}`, '#東京グルメ', '#delicious', '#foodie'],
      author: '東京グルメ王',
      username: 'tokyo_gourmet_king',
      verified: true,
      signature: '東京の美味しいものを食べ歩き！グルメレポーター歴5年🍽️'
    }
  ];

  // Generate realistic videos
  const videos: TikTokVideo[] = [];
  const numVideos = Math.min(count, 10); // Max 10 videos for performance

  for (let i = 0; i < numVideos; i++) {
    const template = tokyoContentTemplates[i % tokyoContentTemplates.length];
    const videoUrl = workingVideoUrls[i % workingVideoUrls.length];
    const videoId = `tokyo_${keyword}_${Date.now()}_${i}`;
    
    // Realistic engagement stats
    const baseViews = Math.floor(Math.random() * 1000000) + 50000;
    const likeRate = 0.05 + Math.random() * 0.1; // 5-15% like rate
    const commentRate = 0.005 + Math.random() * 0.01; // 0.5-1.5% comment rate
    const shareRate = 0.001 + Math.random() * 0.005; // 0.1-0.6% share rate

    videos.push({
      id: videoId,
      desc: template.desc,
      createTime: Date.now() - (i * 3600000) - Math.floor(Math.random() * 86400000), // Random time within last few days
      video: {
        id: videoId,
        height: 1024,
        width: 576,
        duration: 15 + Math.floor(Math.random() * 45), // 15-60 seconds
        ratio: '576:1024',
        cover: `https://picsum.photos/576/1024?random=${Date.now() + i}&blur=1`,
        originCover: `https://picsum.photos/576/1024?random=${Date.now() + i}&blur=1`,
        dynamicCover: `https://picsum.photos/576/1024?random=${Date.now() + i}&blur=1`,
        playAddr: videoUrl,
        downloadAddr: videoUrl,
        shareCover: [`https://picsum.photos/576/1024?random=${Date.now() + i}&blur=1`],
        reflowCover: `https://picsum.photos/576/1024?random=${Date.now() + i}&blur=1`,
        bitrate: 1200 + Math.floor(Math.random() * 800), // 1200-2000 kbps
        encodedType: 'h264',
        format: 'mp4',
        videoQuality: ['normal', 'high', 'ultra'][Math.floor(Math.random() * 3)],
        encodeUserTag: '',
        codecType: 'h264',
        definition: ['720p', '1080p'][Math.floor(Math.random() * 2)],
      },
      author: {
        id: template.username,
        shortId: '',
        uniqueId: template.username,
        nickname: template.author,
        avatarThumb: `https://picsum.photos/150/150?random=${Date.now() + i + 100}`,
        avatarMedium: `https://picsum.photos/150/150?random=${Date.now() + i + 100}`,
        avatarLarger: `https://picsum.photos/150/150?random=${Date.now() + i + 100}`,
        signature: template.signature,
        verified: template.verified,
        secUid: '',
        secret: false,
        ftc: false,
        relation: 0,
        openFavorite: false,
        commentSetting: 0,
        duetSetting: 0,
        stitchSetting: 0,
        privateAccount: false,
      },
      music: {
        id: `music_${i}`,
        title: [
          'Tokyo Vibes',
          'Japan Beat', 
          'City Sounds',
          'Tokyo Nights',
          'Urban Tokyo',
          'Modern Japan',
          'Tokyo Dreams',
          'Shibuya Crossing',
          'Neon Lights',
          'Tokyo Station'
        ][i % 10],
        playUrl: 'https://www.soundjay.com/misc/bell-ringing-05.wav',
        coverThumb: `https://picsum.photos/150/150?random=${Date.now() + i + 200}`,
        coverMedium: `https://picsum.photos/150/150?random=${Date.now() + i + 200}`,
        coverLarge: `https://picsum.photos/150/150?random=${Date.now() + i + 200}`,
        authorName: [
          'Tokyo Beats',
          'Urban Sounds',
          'Japan Music',
          'City Vibes',
          'Tokyo Records'
        ][i % 5],
        original: Math.random() > 0.3, // 70% original music
        duration: 15 + Math.floor(Math.random() * 45),
        album: 'Tokyo Collection',
      },
      stats: {
        diggCount: Math.floor(baseViews * likeRate),
        shareCount: Math.floor(baseViews * shareRate),
        commentCount: Math.floor(baseViews * commentRate),
        playCount: baseViews,
        collectCount: Math.floor(baseViews * likeRate * 0.1), // 10% of likes
      },
      duetInfo: { duetFromId: '' },
      originalItem: true,
      officalItem: false,
      secret: false,
      forFriend: false,
      digged: false,
      itemCommentStatus: 0,
      showNotPass: false,
      vl1: false,
      itemMute: false,
      embedsDisabled: false,
      privateItem: false,
      duetEnabled: true,
      stitchEnabled: true,
      shareEnabled: true,
      isAd: false,
      collected: false,
      isActivityItem: false,
    });
  }

  return {
    videos,
    cursor: `cursor_${Date.now()}`,
    hasMore: count > 10, // Has more if requested more than 10
    total: videos.length,
  };
};

// Enhanced mock data with more realistic TikTok content
const getEnhancedMockTikTokVideos = (keyword: string): TikTokResponse => {
  // Real TikTok video URLs and data (these are examples - replace with actual accessible URLs)
  const realTikTokUrls = [
    {
      id: 'tokyo_real_1',
      videoUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
      thumbnailUrl: 'https://picsum.photos/576/1024?random=1',
      description: `${keyword}が最高すぎる！この景色見て😍 #東京 #${keyword} #travel #japan`,
      author: {
        uniqueId: 'tokyo_explorer_real',
        displayName: '東京エクスプローラー',
        avatarUrl: 'https://picsum.photos/150/150?random=1',
        verified: true
      },
      stats: {
        viewCount: Math.floor(Math.random() * 2000000) + 100000,
        likeCount: Math.floor(Math.random() * 100000) + 5000,
        commentCount: Math.floor(Math.random() * 5000) + 200,
        shareCount: Math.floor(Math.random() * 10000) + 500
      }
    },
    {
      id: 'tokyo_real_2', 
      videoUrl: 'https://sample-videos.com/zip/10/mp4/mp4-15s.mp4',
      thumbnailUrl: 'https://picsum.photos/576/1024?random=2',
      description: `外国人として${keyword}を体験！Amazing experience in Tokyo 🇯🇵✨ #TokyoTravel #JapanTrip #${keyword}`,
      author: {
        uniqueId: 'international_tokyo',
        displayName: 'International Tokyo Guide',
        avatarUrl: 'https://picsum.photos/150/150?random=2',
        verified: true
      },
      stats: {
        viewCount: Math.floor(Math.random() * 1500000) + 80000,
        likeCount: Math.floor(Math.random() * 80000) + 3000,
        commentCount: Math.floor(Math.random() * 3000) + 150,
        shareCount: Math.floor(Math.random() * 8000) + 300
      }
    },
    {
      id: 'tokyo_real_3',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://picsum.photos/576/1024?random=3',
      description: `${keyword}の隠れスポット発見！地元民だけが知る場所🤫 #東京 #隠れスポット #LocalTokyo`,
      author: {
        uniqueId: 'tokyo_local_guide',
        displayName: '東京ローカルガイド',
        avatarUrl: 'https://picsum.photos/150/150?random=3',
        verified: false
      },
      stats: {
        viewCount: Math.floor(Math.random() * 800000) + 50000,
        likeCount: Math.floor(Math.random() * 40000) + 2000,
        commentCount: Math.floor(Math.random() * 2000) + 100,
        shareCount: Math.floor(Math.random() * 5000) + 200
      }
    }
  ];

  const videos: TikTokVideo[] = realTikTokUrls.map((videoData, index) => ({
    id: videoData.id,
    desc: videoData.description,
    createTime: Date.now() - (index * 3600000), // Stagger creation times
    video: {
      id: videoData.id,
      height: 1024,
      width: 576,
      duration: 15 + Math.floor(Math.random() * 45), // 15-60 seconds
      ratio: '576:1024',
      cover: videoData.thumbnailUrl,
      originCover: videoData.thumbnailUrl,
      dynamicCover: videoData.thumbnailUrl,
      playAddr: videoData.videoUrl,
      downloadAddr: videoData.videoUrl,
      shareCover: [videoData.thumbnailUrl],
      reflowCover: videoData.thumbnailUrl,
      bitrate: 1200,
      encodedType: 'h264',
      format: 'mp4',
      videoQuality: 'high',
      encodeUserTag: '',
      codecType: 'h264',
      definition: '1080p',
    },
    author: {
      id: videoData.author.uniqueId,
      shortId: '',
      uniqueId: videoData.author.uniqueId,
      nickname: videoData.author.displayName,
      avatarThumb: videoData.author.avatarUrl,
      avatarMedium: videoData.author.avatarUrl,
      avatarLarger: videoData.author.avatarUrl,
      signature: `${keyword}と東京の魅力を発信中！フォローお願いします🙏`,
      verified: videoData.author.verified,
      secUid: '',
      secret: false,
      ftc: false,
      relation: 0,
      openFavorite: false,
      commentSetting: 0,
      duetSetting: 0,
      stitchSetting: 0,
      privateAccount: false,
    },
    music: {
      id: `music_${index}`,
      title: ['Tokyo Vibes', 'Japan Beat', 'City Sounds'][index] || 'Tokyo Music',
      playUrl: 'https://www.soundjay.com/misc/bell-ringing-05.wav',
      coverThumb: `https://picsum.photos/150/150?random=${index + 10}`,
      coverMedium: `https://picsum.photos/150/150?random=${index + 10}`,
      coverLarge: `https://picsum.photos/150/150?random=${index + 10}`,
      authorName: ['Tokyo Beats', 'Japan Music', 'City Sounds'][index] || 'Music Artist',
      original: true,
      duration: 30,
      album: 'Tokyo Collection',
    },
    stats: {
      diggCount: videoData.stats.likeCount,
      shareCount: videoData.stats.shareCount,
      commentCount: videoData.stats.commentCount,
      playCount: videoData.stats.viewCount,
      collectCount: Math.floor(videoData.stats.likeCount * 0.1),
    },
    duetInfo: { duetFromId: '' },
    originalItem: true,
    officalItem: false,
    secret: false,
    forFriend: false,
    digged: false,
    itemCommentStatus: 0,
    showNotPass: false,
    vl1: false,
    itemMute: false,
    embedsDisabled: false,
    privateItem: false,
    duetEnabled: true,
    stitchEnabled: true,
    shareEnabled: true,
    isAd: false,
    collected: false,
    isActivityItem: false,
  }));

  return {
    videos,
    cursor: '0',
    hasMore: true,
    total: videos.length,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
const getMockTikTokVideos = (keyword: string): TikTokResponse => {
  // Generate more diverse mock data based on keyword
  const getRandomViews = () => Math.floor(Math.random() * 1000000) + 10000;
  const getRandomLikes = () => Math.floor(Math.random() * 50000) + 1000;
  const getRandomShares = () => Math.floor(Math.random() * 5000) + 100;
  const getRandomComments = () => Math.floor(Math.random() * 2000) + 50;
  
  const mockVideos: TikTokVideo[] = [
    {
      id: `tiktok_${keyword.replace(/\s+/g, '_')}_1`,
      desc: `Amazing ${keyword} experience in Tokyo! 🇯🇵 #Tokyo #Japan #Travel #${keyword.replace(/\s+/g, '')}`,
      createTime: Date.now(),
      video: {
        id: 'mock_video1',
        height: 1024,
        width: 576,
        duration: 18,
        ratio: '576:1024',
        cover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkZEOTNEIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gVHJhdmVsPC90ZXh0Pgo8L3N2Zz4K',
        originCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkZEOTNEIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gVHJhdmVsPC90ZXh0Pgo8L3N2Zz4K',
        dynamicCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkZEOTNEIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gVHJhdmVsPC90ZXh0Pgo8L3N2Zz4K',
        playAddr: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        downloadAddr: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        shareCover: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkZEOTNEIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gVHJhdmVsPC90ZXh0Pgo8L3N2Zz4K'],
        reflowCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkZEOTNEIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gVHJhdmVsPC90ZXh0Pgo8L3N2Zz4K',
        bitrate: 1100,
        encodedType: 'h264',
        format: 'mp4',
        videoQuality: 'normal',
        encodeUserTag: '',
        codecType: 'h264',
        definition: '720p',
      },
      author: {
        id: 'mock_user1',
        shortId: '',
        uniqueId: 'tokyo_traveler',
        nickname: 'Tokyo Traveler',
        avatarThumb: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjNkM1Q0U3Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfl748L3RleHQ+Cjwvc3ZnPgo=',
        avatarMedium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjNkM1Q0U3Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfl748L3RleHQ+Cjwvc3ZnPgo=',
        avatarLarger: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjNkM1Q0U3Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfl748L3RleHQ+Cjwvc3ZnPgo=',
        signature: 'Sharing my Tokyo adventures! 🗾',
        verified: false,
        secUid: '',
        secret: false,
        ftc: false,
        relation: 0,
        openFavorite: false,
        commentSetting: 0,
        duetSetting: 0,
        stitchSetting: 0,
        privateAccount: false,
      },
      music: {
        id: 'mock_music1',
        title: 'Tokyo Beat',
        playUrl: 'https://example.com/mock_music1.mp3',
        coverThumb: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjQTI5QkZFIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjiU8L3RleHQ+Cjwvc3ZnPgo=',
        coverMedium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjQTI5QkZFIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjiU8L3RleHQ+Cjwvc3ZnPgo=',
        coverLarge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjQTI5QkZFIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjiU8L3RleHQ+Cjwvc3ZnPgo=',
        authorName: 'City Beats',
        original: true,
        duration: 18,
        album: 'Urban Collection',
      },
      stats: {
        diggCount: getRandomLikes(),
        shareCount: getRandomShares(),
        commentCount: getRandomComments(),
        playCount: getRandomViews(),
        collectCount: Math.floor(getRandomLikes() * 0.3),
      },
      duetInfo: {
        duetFromId: '',
      },
      originalItem: true,
      officalItem: false,
      secret: false,
      forFriend: false,
      digged: false,
      itemCommentStatus: 0,
      showNotPass: false,
      vl1: false,
      itemMute: false,
      embedsDisabled: false,
      privateItem: false,
      duetEnabled: true,
      stitchEnabled: true,
      shareEnabled: true,
      isAd: false,
      collected: false,
      isActivityItem: false,
    },
    {
      id: `tiktok_${keyword.replace(/\s+/g, '_')}_2`,
      desc: `東京の${keyword}が素晴らしい！外国人の友達も大興奮でした 🎌 #東京 #日本 #旅行`,
      createTime: Date.now() - 3600000,
      video: {
        id: 'mock_video2',
        height: 1024,
        width: 576,
        duration: 22,
        ratio: '576:1024',
        cover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkQ3OUE4Ii8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SmFwYW4gQ3VsdHVyZTwvdGV4dD4KPC9zdmc+Cg==',
        originCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkQ3OUE4Ii8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SmFwYW4gQ3VsdHVyZTwvdGV4dD4KPC9zdmc+Cg==',
        dynamicCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkQ3OUE4Ii8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SmFwYW4gQ3VsdHVyZTwvdGV4dD4KPC9zdmc+Cg==',
        playAddr: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        downloadAddr: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        shareCover: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkQ3OUE4Ii8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SmFwYW4gQ3VsdHVyZTwvdGV4dD4KPC9zdmc+Cg=='],
        reflowCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjRkQ3OUE4Ii8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SmFwYW4gQ3VsdHVyZTwvdGV4dD4KPC9zdmc+Cg==',
        bitrate: 950,
        encodedType: 'h264',
        format: 'mp4',
        videoQuality: 'normal',
        encodeUserTag: '',
        codecType: 'h264',
        definition: '720p',
      },
      author: {
        id: 'mock_user2',
        shortId: '',
        uniqueId: 'international_guide',
        nickname: '国際ガイド',
        avatarThumb: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjMDBCODk0Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjI88L3RleHQ+Cjwvc3ZnPgo=',
        avatarMedium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjMDBCODk0Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjI88L3RleHQ+Cjwvc3ZnPgo=',
        avatarLarger: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjMDBCODk0Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjI88L3RleHQ+Cjwvc3ZnPgo=',
        signature: '日本の魅力を世界に発信 🌏',
        verified: true,
        secUid: '',
        secret: false,
        ftc: false,
        relation: 0,
        openFavorite: false,
        commentSetting: 0,
        duetSetting: 0,
        stitchSetting: 0,
        privateAccount: false,
      },
      music: {
        id: 'mock_music2',
        title: 'Cultural Fusion',
        playUrl: 'https://example.com/mock_music2.mp3',
        coverThumb: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjRTE3MDU1Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjrY8L3RleHQ+Cjwvc3ZnPgo=',
        coverMedium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjRTE3MDU1Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjrY8L3RleHQ+Cjwvc3ZnPgo=',
        coverLarge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjRTE3MDU1Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjrY8L3RleHQ+Cjwvc3ZnPgo=',
        authorName: 'World Music',
        original: false,
        duration: 22,
        album: 'Global Sounds',
      },
      stats: {
        diggCount: getRandomLikes(),
        shareCount: getRandomShares(),
        commentCount: getRandomComments(),
        playCount: getRandomViews(),
        collectCount: Math.floor(getRandomLikes() * 0.2),
      },
      duetInfo: {
        duetFromId: '',
      },
      originalItem: true,
      officalItem: false,
      secret: false,
      forFriend: false,
      digged: false,
      itemCommentStatus: 0,
      showNotPass: false,
      vl1: false,
      itemMute: false,
      embedsDisabled: false,
      privateItem: false,
      duetEnabled: true,
      stitchEnabled: true,
      shareEnabled: true,
      isAd: false,
      collected: false,
      isActivityItem: false,
    },
    {
      id: `tiktok_${keyword.replace(/\s+/g, '_')}_3`,
      desc: `Must visit ${keyword} in Tokyo! The views are incredible 😍 #TokyoTravel #JapanTrip #${keyword.replace(/\s+/g, '')}`,
      createTime: Date.now() - 7200000,
      video: {
        id: `mock_video_${keyword.replace(/\s+/g, '_')}_3`,
        height: 1024,
        width: 576,
        duration: 25,
        ratio: '576:1024',
        cover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjNzRCOUZGIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gQWR2ZW50dXJlPC90ZXh0Pgo8L3N2Zz4K',
        originCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjNzRCOUZGIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gQWR2ZW50dXJlPC90ZXh0Pgo8L3N2Zz4K',
        dynamicCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjNzRCOUZGIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gQWR2ZW50dXJlPC90ZXh0Pgo8L3N2Zz4K',
        playAddr: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        downloadAddr: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        shareCover: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjNzRCOUZGIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gQWR2ZW50dXJlPC90ZXh0Pgo8L3N2Zz4K'],
        reflowCover: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTc2IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCA1NzYgMTAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjU3NiIgaGVpZ2h0PSIxMDI0IiBmaWxsPSIjNzRCOUZGIi8+Cjx0ZXh0IHg9IjI4OCIgeT0iNTEyIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VG9reW8gQWR2ZW50dXJlPC90ZXh0Pgo8L3N2Zz4K',
        bitrate: 1300,
        encodedType: 'h264',
        format: 'mp4',
        videoQuality: 'high',
        encodeUserTag: '',
        codecType: 'h264',
        definition: '1080p',
      },
      author: {
        id: 'international_creator',
        shortId: '',
        uniqueId: 'world_explorer_2024',
        nickname: 'World Explorer 🌍',
        avatarThumb: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjMDBDRUM5Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjI08L3RleHQ+Cjwvc3ZnPgo=',
        avatarMedium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjMDBDRUM5Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjI08L3RleHQ+Cjwvc3ZnPgo=',
        avatarLarger: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjMDBDRUM5Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjI08L3RleHQ+Cjwvc3ZnPgo=',
        signature: 'Exploring the world one city at a time 🗺️✈️',
        verified: true,
        secUid: '',
        secret: false,
        ftc: false,
        relation: 0,
        openFavorite: false,
        commentSetting: 0,
        duetSetting: 0,
        stitchSetting: 0,
        privateAccount: false,
      },
      music: {
        id: 'trending_music_3',
        title: 'Tokyo Vibes',
        playUrl: 'https://example.com/tokyo_vibes.mp3',
        coverThumb: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjRkRDQjZFIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjiU8L3RleHQ+Cjwvc3ZnPgo=',
        coverMedium: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjRkRDQjZFIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjiU8L3RleHQ+Cjwvc3ZnPgo=',
        coverLarge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNzUiIHI9Ijc1IiBmaWxsPSIjRkRDQjZFIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfjiU8L3RleHQ+Cjwvc3ZnPgo=',
        authorName: 'Tokyo Beats',
        original: true,
        duration: 25,
        album: 'City Sounds',
      },
      stats: {
        diggCount: getRandomLikes(),
        shareCount: getRandomShares(),
        commentCount: getRandomComments(),
        playCount: getRandomViews(),
        collectCount: Math.floor(getRandomLikes() * 0.25),
      },
      duetInfo: {
        duetFromId: '',
      },
      originalItem: true,
      officalItem: false,
      secret: false,
      forFriend: false,
      digged: false,
      itemCommentStatus: 0,
      showNotPass: false,
      vl1: false,
      itemMute: false,
      embedsDisabled: false,
      privateItem: false,
      duetEnabled: true,
      stitchEnabled: true,
      shareEnabled: true,
      isAd: false,
      collected: false,
      isActivityItem: false,
    }
  ];

  return {
    videos: mockVideos,
    cursor: '0',
    hasMore: true,
    total: mockVideos.length,
  };
};