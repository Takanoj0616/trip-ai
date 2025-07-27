# TripAI - あなただけの完璧な旅しおりをAIが作成

## 🚀 クイックスタート

### 前提条件
- Node.js 18+ 
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 環境変数の設定（オプション）
cp env.example .env
# .env ファイルを編集して API キーを設定

# 開発サーバーの起動
npm run dev
```

### 環境変数の設定（オプション）

プロジェクトルートに `.env` ファイルを作成し、以下の変数を設定してください：

```env
# OpenAI API Configuration (オプション)
VITE_OPENAI_API_KEY=your_openai_api_key

# Firebase Configuration (オプション)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📁 プロジェクト構造

```
trip-next/
├── public/                 # 静的ファイル
├── src/
│   ├── components/         # React コンポーネント
│   ├── contexts/          # React Context
│   ├── data/              # データファイル
│   ├── pages/             # ページコンポーネント
│   ├── services/          # API サービス
│   └── types/             # TypeScript 型定義
├── .env                   # 環境変数（作成が必要）
└── package.json
```

## 🛠️ 開発

```bash
# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## 📝 機能一覧

| 機能 | 必要な環境変数 | 説明 |
|------|----------------|------|
| 🗺️ マップ表示 | なし | シンプルなマップ表示（API不要） |
| 🤖 AI ルート最適化 | `VITE_OPENAI_API_KEY` | 最適なルートをAIが提案 |
| 📍 観光スポット検索 | なし | モックデータによる観光スポット表示 |
| 🍽️ レストラン検索 | なし | モックデータによるレストラン表示 |
| 📱 TikTok 動画 | `VITE_TIKTOK_API_KEY` | 観光スポットの動画を表示 |
| 🐦 X (Twitter) 投稿 | `VITE_X_API_KEY` | 観光スポットの投稿を表示 |

## 🔧 トラブルシューティング

### マップが表示されない場合
1. **ブラウザのコンソールでエラーを確認**
2. **ネットワーク接続を確認**
3. **環境変数の設定を確認**

### ルート最適化が動作しない場合
1. **2つ以上のスポットが追加されているか確認**
2. **ブラウザのコンソールでエラーを確認**
3. **ネットワーク接続を確認**

## 📄 ライセンス

MIT License

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📞 サポート

問題が発生した場合は、以下の手順でトラブルシューティングを行ってください：

1. **環境変数の確認**: `.env` ファイルの設定を確認
2. **ネットワーク接続**: インターネット接続を確認
3. **ブラウザのコンソール**: 開発者ツールでエラーメッセージを確認
4. **依存関係**: `npm install` を再実行

## 🔄 更新履歴

### v2.0.0 (最新)
- Google Maps API の依存関係を削除
- シンプルなマップ表示に変更
- モックデータによる観光スポット表示
- 軽量化とパフォーマンス向上

### v1.0.1
- favicon.ico 404 エラーの修正
- Google Maps API キーの検証強化
- セキュリティ警告の追加
- エラーハンドリングの改善
- ダークテーママップスタイルの追加

### v1.0.0
- 初回リリース
- 基本的な旅行プランニング機能
- Google Maps 統合
- AI ルート最適化