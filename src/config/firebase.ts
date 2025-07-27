import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase設定の検証
const validateFirebaseConfig = () => {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

  // 必須設定のチェック
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missingFields = requiredFields.filter(field => !config[field as keyof typeof config]);
  
  if (missingFields.length > 0) {
    console.warn('❌ Firebase設定が不完全です。ローカルモードで動作します。');
    console.warn('不足している環境変数:', missingFields.map(f => `VITE_FIREBASE_${f.toUpperCase()}`));
    return null;
  }

  console.log('✅ Firebase設定が確認されました');
  return config;
};

// Firebase設定
const firebaseConfig = validateFirebaseConfig();

// Firebase関連の変数を初期化
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let isFirebaseEnabled = false;

// Firebase初期化（設定が有効な場合のみ）
if (firebaseConfig) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    storage = getStorage(app);
    isFirebaseEnabled = true;
    console.log('🔥 Firebase初期化完了');
  } catch (error) {
    console.error('❌ Firebase初期化エラー:', error);
    console.warn('ローカルモードで動作します');
    isFirebaseEnabled = false;
  }
} else {
  console.log('📱 ローカルモードで開始します');
  isFirebaseEnabled = false;
}

// Firebase利用可能性チェック関数
export const isFirebaseAvailable = (): boolean => {
  return isFirebaseEnabled && db !== null;
};

// 安全なFirestore取得関数
export const getFirestoreInstance = (): Firestore | null => {
  if (!isFirebaseAvailable()) {
    console.warn('Firestoreは利用できません。ローカルデータを使用してください。');
    return null;
  }
  return db;
};

// 安全なStorage取得関数
export const getStorageInstance = (): FirebaseStorage | null => {
  if (!isFirebaseAvailable()) {
    console.warn('Firebase Storageは利用できません。');
    return null;
  }
  return storage;
};

// エクスポート（後方互換性のため）
export { db, storage };
export default app;