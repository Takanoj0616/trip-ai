import React, { useState, useEffect } from 'react';
import { Cloud, CloudOff, Smartphone, RefreshCw } from 'lucide-react';
import { PlannerService } from '../services/plannerService';

const ConnectionStatus: React.FC = () => {
  const [status, setStatus] = useState<{
    firebase: boolean;
    local: boolean;
    isChecking: boolean;
  }>({
    firebase: false,
    local: true,
    isChecking: false
  });

  const checkConnection = async () => {
    setStatus(prev => ({ ...prev, isChecking: true }));
    try {
      const connectionStatus = await PlannerService.checkConnection();
      setStatus({
        firebase: connectionStatus.firebase,
        local: connectionStatus.local,
        isChecking: false
      });
    } catch (error) {
      console.error('接続状態確認エラー:', error);
      // Firebase設定エラーの場合でもローカルは常に利用可能
      setStatus({
        firebase: false,
        local: true,
        isChecking: false
      });
    }
  };

  const reconnectFirebase = async () => {
    setStatus(prev => ({ ...prev, isChecking: true }));
    try {
      const success = await PlannerService.reconnectFirebase();
      setStatus(prev => ({
        ...prev,
        firebase: success,
        isChecking: false
      }));
    } catch (error) {
      console.error('Firebase再接続エラー:', error);
      setStatus(prev => ({ ...prev, isChecking: false }));
    }
  };

  useEffect(() => {
    checkConnection();
    // 30秒ごとに接続状態をチェック
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const getServiceStatus = () => {
    const serviceStatus = PlannerService.getServiceStatus();
    return serviceStatus;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-lg shadow-lg p-3 max-w-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-white">Connection Status</h3>
          <button
            onClick={checkConnection}
            disabled={status.isChecking}
            className="p-1 text-white/70 hover:text-white disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${status.isChecking ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="space-y-2">
          {/* Firebase接続状態 */}
          <div className="flex items-center gap-2">
            {status.firebase ? (
              <Cloud className="w-4 h-4 text-green-500" />
            ) : (
              <CloudOff className="w-4 h-4 text-red-500" />
            )}
            <span className="text-xs text-white/80">
              Firebase: {status.firebase ? 'Online' : 'Offline'}
            </span>
            {!status.firebase && (
              <button
                onClick={reconnectFirebase}
                disabled={status.isChecking}
                className="text-xs text-neon-blue hover:text-white disabled:opacity-50"
              >
                Reconnect
              </button>
            )}
          </div>

          {/* ローカル接続状態 */}
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-green-500" />
            <span className="text-xs text-white/80">
              Local: Available
            </span>
          </div>

          {/* 現在のサービス状態 */}
          <div className="pt-2 border-t border-white/20">
            <div className="text-xs text-white/70">
              {status.firebase ? (
                <span className="text-neon-green">🟢 Firebase Connected</span>
              ) : (
                <span className="text-neon-blue">🔵 Local Mode (Fully Operational)</span>
              )}
            </div>
            <div className="text-xs text-white/60 mt-1">
              Planners: {getServiceStatus().localPlannersCount} available
            </div>
            {!status.firebase && (
              <div className="text-xs text-white/50 mt-1">
                Fully functional without Firebase setup
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatus;