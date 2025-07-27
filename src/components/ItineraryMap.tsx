import React, { useEffect, useRef, useState } from 'react';
import { ItineraryItem } from '../contexts/ItineraryContext';
import { 
  Navigation,
  Route,
  Compass,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

declare global {
  interface Window {
    google: any;
  }
}

interface ItineraryMapProps {
  items: ItineraryItem[];
  onItemClick?: (item: ItineraryItem) => void;
  showRoute?: boolean;
  optimizedRoute?: any;
}

const ItineraryMap: React.FC<ItineraryMapProps> = ({ 
  items,
  onItemClick,
  showRoute = false,
  optimizedRoute
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [markers, setMarkers] = useState<any[]>([]);
  const [directionsService, setDirectionsService] = useState<any>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any>(null);

  // マップコンテナの存在を確認するためのuseEffect
  useEffect(() => {
    const checkMapContainer = () => {
      if (mapRef.current && !mapInitialized) {
        console.log('Map container found, initializing map...');
        setMapInitialized(true);
        initializeMap();
      }
    };

    // 即座にチェック
    checkMapContainer();

    // 少し遅延してからもチェック（DOMの準備が完了していない場合のため）
    const timer = setTimeout(checkMapContainer, 100);
    
    return () => clearTimeout(timer);
  }, [mapRef.current, mapInitialized]);

  // アイテムが変更された時にマーカーを更新
  useEffect(() => {
    if (map && items.length > 0) {
      updateMarkers();
    }
  }, [map, items]);

  // 最適化されたルートが変更された時にルートを表示
  useEffect(() => {
    if (map && optimizedRoute && showRoute) {
      displayOptimizedRoute();
    }
  }, [map, optimizedRoute, showRoute]);

  const initializeMap = async () => {
    console.log('Initializing map...');
    
    // APIキーが設定されていない場合のチェック
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    console.log('API Key check:', {
      exists: !!apiKey,
      length: apiKey?.length,
      startsWithAIza: apiKey?.startsWith('AIza'),
      startsWithAlza: apiKey?.startsWith('Alza'),
      first10Chars: apiKey?.substring(0, 10),
      last10Chars: apiKey?.substring(-10)
    });
    
    if (!apiKey) {
      setError('Google Maps APIキーが設定されていません。.envファイルにVITE_GOOGLE_MAPS_API_KEYを設定してください。');
      setLoading(false);
      return;
    }

    // APIキーの形式をチェック
    if (!apiKey.startsWith('AIza') && !apiKey.startsWith('Alza')) {
      setError('Google Maps APIキーが無効です。正しい形式のAPIキーを設定してください。');
      setLoading(false);
      return;
    }
    
    console.log('API key is valid, loading Google Maps...');
    console.log('API Key (first 10 chars):', apiKey.substring(0, 10) + '...');
    console.log('API Key (last 10 chars):', '...' + apiKey.substring(-10));

    // Google Maps APIの読み込み
    if (!window.google) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      const apiUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
      script.src = apiUrl;
      script.async = true;
      script.defer = true;
      
      console.log('Loading Google Maps API from:', apiUrl);
      
      script.onload = () => {
        console.log('✅ Google Maps API loaded successfully');
        createMap();
      };
      
      script.onerror = (error) => {
        console.error('❌ Google Maps API loading failed:', error);
        setError('Google Maps APIの読み込みに失敗しました。APIキーの制限設定を確認してください。');
        setLoading(false);
      };
      
      document.head.appendChild(script);
    } else {
      console.log('Google Maps API already loaded');
      createMap();
    }
  };

  const createMap = () => {
    console.log('Creating map...');
    console.log('mapRef.current:', mapRef.current);
    console.log('window.google:', window.google);
    
    if (!mapRef.current) {
      console.error('Map container not found');
      setError('マップコンテナが見つかりません。');
      setLoading(false);
      return;
    }
    
    if (!window.google || !window.google.maps) {
      console.error('Google Maps API not loaded');
      setError('Google Maps APIが読み込まれていません。');
      setLoading(false);
      return;
    }

    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: { lat: 35.6762, lng: 139.6503 }, // 東京中心
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [{ color: '#242f3e' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#242f3e' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#746855' }]
          },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }]
          }
        ]
      });

      // Directions Service と Renderer を初期化
      const directionsServiceInstance = new window.google.maps.DirectionsService();
      const directionsRendererInstance = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true, // マーカーは手動で管理
        polylineOptions: {
          strokeColor: '#8b5cf6',
          strokeWeight: 4,
          strokeOpacity: 0.8
        }
      });

      setMap(mapInstance);
      setDirectionsService(directionsServiceInstance);
      setDirectionsRenderer(directionsRendererInstance);
      directionsRendererInstance.setMap(mapInstance);
      
      setLoading(false);
      console.log('Map created successfully');
      
    } catch (err) {
      console.error('Map creation failed:', err);
      setError('マップの初期化に失敗しました。');
      setLoading(false);
    }
  };

  const updateMarkers = () => {
    // 既存のマーカーをクリア
    markers.forEach(marker => marker.setMap(null));
    
    const newMarkers = items.map((item, index) => {
      if (!item.coordinates) return null;
      
      const marker = new window.google.maps.Marker({
        position: { lat: item.coordinates.lat, lng: item.coordinates.lng },
        map: map,
        title: item.name,
        label: {
          text: (index + 1).toString(),
          color: 'white',
          fontWeight: 'bold'
        },
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#ef4444',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      // クリックイベントを追加
      marker.addListener('click', () => {
        if (onItemClick) {
          onItemClick(item);
        }
      });

      return marker;
    }).filter(Boolean);

    setMarkers(newMarkers);
  };

  const displayOptimizedRoute = () => {
    if (!directionsService || !directionsRenderer || !optimizedRoute || !optimizedRoute.items || optimizedRoute.items.length < 2) {
      return;
    }

    const waypoints = optimizedRoute.items.slice(1, -1).map((item: ItineraryItem) => ({
      location: item.coordinates ? 
        new window.google.maps.LatLng(item.coordinates.lat, item.coordinates.lng) : 
        item.address,
      stopover: true
    }));

    const origin = optimizedRoute.items[0].coordinates ? 
      new window.google.maps.LatLng(optimizedRoute.items[0].coordinates.lat, optimizedRoute.items[0].coordinates.lng) :
      optimizedRoute.items[0].address;

    const destination = optimizedRoute.items[optimizedRoute.items.length - 1].coordinates ?
      new window.google.maps.LatLng(optimizedRoute.items[optimizedRoute.items.length - 1].coordinates.lat, optimizedRoute.items[optimizedRoute.items.length - 1].coordinates.lng) :
      optimizedRoute.items[optimizedRoute.items.length - 1].address;

    const request = {
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      optimizeWaypoints: false, // AIで最適化済みなので順序を保持
      travelMode: window.google.maps.TravelMode.TRANSIT
    };

    directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
        
        // マップの表示範囲を調整
        const bounds = new window.google.maps.LatLngBounds();
        result.routes[0].legs.forEach((leg: any) => {
          bounds.extend(leg.start_location);
          bounds.extend(leg.end_location);
        });
        map.fitBounds(bounds);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };


  if (loading) {
    return (
      <div className="w-full h-96 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-neon-blue mx-auto mb-2" />
          <p className="text-white/70">マップを読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <p className="text-yellow-400 mb-2 font-semibold">マップエラー</p>
          <p className="text-white/70 text-sm mb-4">{error}</p>
          
          <div className="bg-white/5 rounded-lg p-4 text-left">
            <h4 className="text-neon-blue font-semibold mb-2">🔧 トラブルシューティング:</h4>
            <ul className="text-xs text-white/80 space-y-1 list-disc list-inside">
              <li>Google Maps APIキーが正しく設定されているか確認</li>
              <li>APIキーに適切な制限が設定されているか確認</li>
              <li>ネットワーク接続を確認</li>
              <li>ブラウザのコンソールでエラーを確認</li>
            </ul>
            
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
              <p className="text-yellow-400 text-xs font-semibold mb-1">⚠️ セキュリティ警告</p>
              <p className="text-white/70 text-xs">
                現在のAPIキーに制限がありません。本番環境では必ずAPIキーに制限を設定してください。
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
      <div className="p-4 border-b border-white/20">
        <h3 className="text-xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
          ルートマップ
        </h3>
      </div>
      
      <div className="h-96">
        <div ref={mapRef} className="w-full h-full" />
      </div>
      
      {/* マップ操作ボタン */}
      <div className="p-4 border-t border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-white/70">
            <Compass className="w-4 h-4" />
            <span>東京エリア</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Navigation className="w-4 h-4 text-neon-blue" />
            </button>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Route className="w-4 h-4 text-neon-green" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryMap;