# TikTok API Integration Setup

このプロジェクトは実際のTikTok APIからデータを取得できるように設計されています。

## 現在の状態

- ✅ TikTok API統合コードの実装完了
- ✅ 強化されたモックデータでフォールバック動作
- ✅ 実際の動画プレーヤー機能
- ✅ TikTok Embed API統合
- ⚠️ 実際のTikTok APIキーが必要

## 実際のTikTok APIを使用する手順

### 1. TikTok for Developers アカウント作成

1. [TikTok for Developers](https://developers.tiktok.com/) にアクセス
2. アカウントを作成してアプリを登録
3. 必要な権限を申請:
   - `video.list` - 動画一覧取得
   - `user.info.basic` - ユーザー基本情報
   - `video.upload` - 動画アップロード（オプション）

### 2. API認証情報の取得

```bash
# .env ファイルに以下を設定
VITE_TIKTOK_CLIENT_ID=your_client_id_here
VITE_TIKTOK_CLIENT_SECRET=your_client_secret_here
VITE_TIKTOK_ACCESS_TOKEN=your_access_token_here
```

### 3. バックエンドプロキシサーバーの設定

TikTok APIはCORS制限があるため、バックエンドプロキシが必要です。

```bash
# バックエンド用の依存関係をインストール
npm install express cors axios dotenv

# プロキシサーバーを起動
node backend-proxy-example.js
```

### 4. 環境変数の設定

```bash
# .env ファイル
VITE_BACKEND_API_URL=http://localhost:3001/api
```

## TikTok Research API（学術研究用）

研究目的の場合は、TikTok Research APIの利用も可能です。

### 申請方法
1. [TikTok Research API](https://research.tiktok.com/) にアクセス
2. 研究提案書を提出
3. 承認後、APIキーを取得

```bash
# .env ファイルに追加
VITE_TIKTOK_RESEARCH_API_KEY=your_research_api_key
```

## 利用可能なAPIエンドポイント

### 1. 動画検索 (Video Query)
```javascript
// キーワードで動画を検索
searchTikTokVideos("東京観光", 30)
```

### 2. ユーザー動画 (User Videos)
```javascript
// 特定ユーザーの動画を取得
getUserTikTokVideos("username")
```

### 3. トレンド動画 (Trending Videos)
```javascript
// トレンド動画を取得
getTrendingTikTokVideos()
```

## API レスポンス例

```json
{
  "videos": [
    {
      "id": "7123456789012345678",
      "video_description": "東京タワーの夜景が最高！#東京観光 #nightview",
      "create_time": 1640995200,
      "cover_image_url": "https://...",
      "share_url": "https://www.tiktok.com/@user/video/7123456789012345678",
      "view_count": 150000,
      "like_count": 12500,
      "comment_count": 890,
      "share_count": 450,
      "author": {
        "unique_id": "tokyo_explorer",
        "display_name": "東京エクスプローラー",
        "avatar_url": "https://...",
        "is_verified": true
      }
    }
  ],
  "cursor": "next_page_token",
  "has_more": true
}
```

## 制限事項

### TikTok API制限
- **Rate Limiting**: 1日1000リクエスト（Basic Plan）
- **データアクセス**: 公開動画のみ
- **地域制限**: 一部地域で利用不可
- **商用利用**: 追加審査が必要

### 動画URL制限
- 動画の直接URLは特別な権限が必要
- 多くの場合、TikTok Embed APIを使用
- サムネイル画像は通常アクセス可能

## 現在のフォールバック動作

APIキーが設定されていない場合：
1. ✅ 強化されたモックデータを使用
2. ✅ 実際のサンプル動画ファイルで動作
3. ✅ 完全なUI機能が利用可能
4. ✅ 実際のTikTok埋め込み機能

## デバッグとテスト

```bash
# バックエンドサーバーの起動確認
curl http://localhost:3001/api/health

# TikTok API テスト
curl -X POST http://localhost:3001/api/tiktok/search \
  -H "Content-Type: application/json" \
  -d '{"query":{"keyword_query":"東京観光"},"max_count":10}'
```

## セキュリティ注意事項

1. **APIキーの保護**: クライアントサイドに秘密キーを含めない
2. **CORS設定**: 本番環境では適切なオリジン制限を設定
3. **Rate Limiting**: API使用量を監視
4. **データ保護**: ユーザーデータの適切な処理

## サポートとドキュメント

- [TikTok for Developers Documentation](https://developers.tiktok.com/doc/)
- [TikTok Research API](https://research.tiktok.com/)
- [TikTok Embed API](https://developers.tiktok.com/doc/embed-videos/)

## トラブルシューティング

### よくある問題

1. **CORS エラー**
   - バックエンドプロキシサーバーが起動しているか確認
   - ブラウザの開発者ツールでネットワークタブを確認

2. **API認証エラー**
   - APIキーが正しく設定されているか確認
   - アクセストークンが有効期限内か確認

3. **動画が再生されない**
   - 動画URLが有効か確認
   - ブラウザの CORS ポリシーを確認
   - TikTok Embed モードに切り替えて試行