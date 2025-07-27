import React, { useState } from 'react';
import { initializeFirebaseData } from '../services/firebasePlannerService';
import { Database, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const FirebaseInitializer: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [initStatus, setInitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleInitialize = async () => {
    setIsInitializing(true);
    setInitStatus('idle');
    setMessage('Firebaseにプランナーデータを登録中...');

    try {
      const success = await initializeFirebaseData();
      
      if (success) {
        setInitStatus('success');
        setMessage('✅ 10名のプランナーデータをFirebaseに正常に登録しました！');
      } else {
        setInitStatus('error');
        setMessage('❌ データの初期化に失敗しました。Firebase設定を確認してください。');
      }
    } catch (error) {
      setInitStatus('error');
      setMessage(`❌ エラーが発生しました: ${error}`);
      console.error('初期化エラー:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <Database className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Firebaseデータ初期化
        </h2>
        <p className="text-gray-600">
          プランナーデータをFirestore⇝に登録します
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">登録されるプランナー一覧：</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 田中 美咲 - グルメ・文化体験専門</li>
          <li>• 佐藤 健太郎 - 歴史探訪・神社仏閣専門</li>
          <li>• 山田 あかり - ファミリー旅行専門</li>
          <li>• Emily Thompson - 外国人向けガイド専門</li>
          <li>• 鈴木 大輔 - 夜景・デート専門</li>
          <li>• 高橋 りんか - アニメ・サブカル専門</li>
          <li>• 松本 雅彦 - ラグジュアリー体験専門</li>
          <li>• 伊藤 みお - 節約・格安旅行専門</li>
          <li>• 森田 拓也 - 自然・アウトドア専門</li>
          <li>• 中村 美香 - アート・美術館巡り専門</li>
        </ul>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-4 ${
          initStatus === 'success' ? 'bg-green-50 border border-green-200' :
          initStatus === 'error' ? 'bg-red-50 border border-red-200' :
          'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-center gap-2">
            {initStatus === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
            {initStatus === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
            {isInitializing && <Loader className="w-5 h-5 text-blue-600 animate-spin" />}
            <span className={`text-sm ${
              initStatus === 'success' ? 'text-green-800' :
              initStatus === 'error' ? 'text-red-800' :
              'text-blue-800'
            }`}>
              {message}
            </span>
          </div>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={handleInitialize}
          disabled={isInitializing}
          className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
            isInitializing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isInitializing ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              初期化中...
            </>
          ) : (
            <>
              <Database className="w-4 h-4 mr-2" />
              Firebaseにデータを登録
            </>
          )}
        </button>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">注意事項：</p>
            <ul className="space-y-1">
              <li>• Firebase設定が正しく行われていることを確認してください</li>
              <li>• インターネット接続が必要です</li>
              <li>• 既存のデータは上書きされます</li>
              <li>• 初期化は開発環境でのみ実行してください</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseInitializer;