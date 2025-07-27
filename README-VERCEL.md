# Vercel デプロイメントガイド

このアプリケーションをVercelにデプロイするための手順です。

## 🚀 デプロイ手順

### 1. Vercelアカウントの準備
- [Vercel](https://vercel.com)でアカウントを作成
- GitHubアカウントと連携

### 2. プロジェクトの設定
```bash
# Vercel CLIのインストール（オプション）
npm i -g vercel

# プロジェクトのデプロイ
vercel
```

### 3. 環境変数の設定
Vercelダッシュボード > Project Settings > Environment Variables で以下を設定：

#### 必須の環境変数
```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

#### オプションの環境変数（Firebase使用時）
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### オプションの環境変数（OpenAI使用時）
```
VITE_OPENAI_API_KEY=your_openai_api_key
```

### 4. ビルド設定
Vercelは`vercel.json`の設定を自動的に読み込みます：
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## 📁 デプロイされるファイル

### 含まれるファイル
- `src/` - アプリケーションソースコード
- `public/` - 静的ファイル
- `package.json` - 依存関係とスクリプト
- `vite.config.js` - Viteビルド設定
- `vercel.json` - Vercel設定

### 除外されるファイル（.vercelignore）
- `node_modules/`
- 開発用ファイル
- ドキュメント
- 設定ファイル

## 🔧 トラブルシューティング

### ビルドエラーの場合
1. ローカルで`npm run build`を実行してエラーを確認
2. TypeScriptエラーを修正
3. 環境変数が正しく設定されているか確認

### 環境変数が読み込まれない場合
1. Vercelダッシュボードで環境変数を確認
2. 変数名が`VITE_`で始まっているか確認
3. デプロイを再実行

### Firebase接続エラーの場合
- Firebase設定は完全にオプションです
- 設定されていない場合、アプリはローカルモードで動作します
- エラーは発生せず、プランナー機能も正常に動作します

## 🌐 カスタムドメイン設定

1. Vercelダッシュボード > Project Settings > Domains
2. カスタムドメインを追加
3. DNSレコードを設定

## 📊 パフォーマンス最適化

- 静的ファイルは自動的にCDNからキャッシュされます
- `vercel.json`でキャッシュヘッダーを設定済み
- SPAルーティングは自動的にリライトされます

## 🔄 自動デプロイ

GitHubにプッシュすると自動的にデプロイされます：
- `main`ブランチ → プロダクション
- その他のブランチ → プレビュー環境