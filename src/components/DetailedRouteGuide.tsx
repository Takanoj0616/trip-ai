import React, { useState } from 'react';
import { ItineraryItem } from '../contexts/ItineraryContext';
import { 
  Navigation, 
  Clock, 
  MapPin, 
  Train,
  Footprints,
  Car,
  Bus,
  Zap,
  ArrowRight,
  Info,
  AlertCircle,
  Star,
  Phone,
  Globe,
  DollarSign,
  Calendar,
  Users,
  Camera,
  ChevronDown,
  ChevronUp,
  Route,
  Compass
} from 'lucide-react';

interface DetailedRouteGuideProps {
  items: ItineraryItem[];
}

interface RouteStep {
  from: ItineraryItem;
  to: ItineraryItem;
  transportation: {
    type: 'train' | 'subway' | 'bus' | 'walk' | 'taxi';
    line?: string;
    duration: string;
    distance: string;
    cost: string;
    instructions: string[];
    alternatives: Array<{
      type: string;
      line?: string;
      duration: string;
      cost: string;
      description: string;
    }>;
  };
  tips: string[];
}

const DetailedRouteGuide: React.FC<DetailedRouteGuideProps> = ({ items }) => {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  const toggleStep = (stepIndex: number) => {
    setExpandedSteps(prev => 
      prev.includes(stepIndex) 
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  // ルートステップを生成
  const generateRouteSteps = (): RouteStep[] => {
    const steps: RouteStep[] = [];
    
    for (let i = 0; i < items.length - 1; i++) {
      const from = items[i];
      const to = items[i + 1];
      
      steps.push({
        from,
        to,
        transportation: getTransportationInfo(from, to),
        tips: getRouteTips(from, to)
      });
    }
    
    return steps;
  };

  // 交通情報を取得
  const getTransportationInfo = (from: ItineraryItem, to: ItineraryItem) => {
    // 実際の実装では、Google Maps Directions APIやJR APIを使用
    const routes: { [key: string]: any } = {
      'tokyo-tower_tokyo-skytree': {
        type: 'train',
        line: 'JR山手線→東武スカイツリーライン',
        duration: '45分',
        distance: '8.2km',
        cost: '¥320',
        instructions: [
          '東京タワーから都営三田線御成門駅へ徒歩3分',
          '御成門駅から大手町駅まで6分（¥180）',
          '大手町駅でJR山手線に乗り換え',
          '大手町駅から神田駅まで2分',
          '神田駅でJR京浜東北線に乗り換え',
          '神田駅から浅草駅まで9分（¥140）',
          '浅草駅から東武スカイツリーライン押上駅まで徒歩2分',
          '押上駅からスカイツリーまで徒歩3分'
        ],
        alternatives: [
          {
            type: 'taxi',
            duration: '25分',
            cost: '¥2,800-3,500',
            description: 'タクシーで直接移動（交通状況により変動）'
          },
          {
            type: 'walk + train',
            line: '都営浅草線',
            duration: '50分',
            cost: '¥280',
            description: '新橋駅経由で都営浅草線利用'
          }
        ]
      },
      'tokyo-skytree_sensoji-temple': {
        type: 'walk',
        duration: '15分',
        distance: '1.2km',
        cost: '無料',
        instructions: [
          'スカイツリーから押上駅方面へ',
          '隅田川沿いを南西方向に歩く',
          '吾妻橋を渡る',
          '仲見世通り入口到達',
          '雷門から浅草寺まで200m'
        ],
        alternatives: [
          {
            type: 'subway',
            line: '東京メトロ銀座線',
            duration: '8分',
            cost: '¥170',
            description: '浅草駅まで1駅（混雑時は徒歩が早い場合も）'
          }
        ]
      }
      // 他のルートも同様に定義...
    };

    const routeKey = `${from.id}_${to.id}`;
    return routes[routeKey] || {
      type: 'train',
      line: 'JR山手線・地下鉄',
      duration: '20-30分',
      distance: '3-5km',
      cost: '¥200-400',
      instructions: [
        `${from.name}最寄り駅から出発`,
        '電車で移動（乗り換え1-2回）',
        `${to.name}最寄り駅で下車`,
        '徒歩で目的地まで'
      ],
      alternatives: [
        {
          type: 'taxi',
          duration: '15-25分',
          cost: '¥1,500-2,500',
          description: 'タクシーで直接移動'
        }
      ]
    };
  };

  // ルートのコツを生成
  const getRouteTips = (from: ItineraryItem, to: ItineraryItem): string[] => {
    const generalTips = [
      '混雑時間帯（7:30-9:00, 17:30-19:00）は避けることをお勧めします',
      'ICカード（Suica/PASMO）を利用すると便利です',
      '案内アプリ「Google Maps」や「Yahoo!乗換案内」を活用しましょう'
    ];

    const specificTips: { [key: string]: string[] } = {
      'tokyo-tower': [
        '東京タワーは御成門駅、神谷町駅、赤羽橋駅が最寄りです',
        '坂道があるため歩きやすい靴をお勧めします'
      ],
      'tokyo-skytree': [
        'スカイツリーは押上駅直結で便利です',
        'ソラマチでのお買い物時間も考慮しましょう'
      ],
      'sensoji-temple': [
        '浅草寺周辺は人力車も利用できます',
        '仲見世通りは食べ歩きスポットが豊富です'
      ]
    };

    return [
      ...generalTips,
      ...(specificTips[from.id] || []),
      ...(specificTips[to.id] || [])
    ].slice(0, 3); // 最大3つまで
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'train': return <Train className="w-5 h-5 text-blue-400" />;
      case 'subway': return <Zap className="w-5 h-5 text-green-400" />;
      case 'bus': return <Bus className="w-5 h-5 text-orange-400" />;
      case 'walk': return <Footprints className="w-5 h-5 text-purple-400" />;
      case 'taxi': return <Car className="w-5 h-5 text-yellow-400" />;
      default: return <Navigation className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTimeFrameSchedule = () => {
    const schedules = {
      morning: {
        label: '午前コース（9:00-12:00）',
        description: '朝の観光に最適',
        advantages: ['観光地が空いている', '写真撮影に良い光', '朝食スポット充実'],
        warnings: ['通勤ラッシュと重なる可能性', '一部施設が10時開館']
      },
      afternoon: {
        label: '午後コース（13:00-17:00）',
        description: 'ランチと合わせて楽しめる',
        advantages: ['すべての施設が営業', 'ランチスポット豊富', '人の流れが分散'],
        warnings: ['観光地が混雑', 'ランチタイムは要予約']
      },
      evening: {
        label: '夕方コース（17:00-21:00）',
        description: '夜景と合わせて満喫',
        advantages: ['夜景が美しい', '夕食スポット豊富', '帰宅ラッシュ前'],
        warnings: ['営業時間に注意', '一部屋外スポットは暗い']
      }
    };
    
    return schedules[selectedTimeframe];
  };

  const routeSteps = generateRouteSteps();
  const schedule = getTimeFrameSchedule();
  
  const totalEstimatedTime = items.reduce((total, item) => total + item.estimatedVisitTime, 0);
  const totalTransportTime = routeSteps.reduce((total, step) => 
    total + parseInt(step.transportation.duration.replace(/[^\d]/g, '')) || 30, 0
  );

  return (
    <div className="space-y-6">
      {/* タイムフレーム選択 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
          訪問時間帯を選択
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {(['morning', 'afternoon', 'evening'] as const).map((timeframe) => {
            const scheduleInfo = {
              morning: { label: '午前', time: '9:00-12:00', icon: '🌅' },
              afternoon: { label: '午後', time: '13:00-17:00', icon: '☀️' },
              evening: { label: '夕方', time: '17:00-21:00', icon: '🌆' }
            }[timeframe];

            return (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`p-4 rounded-lg transition duration-300 ${
                  selectedTimeframe === timeframe
                    ? 'bg-gradient-to-r from-neon-pink to-neon-purple border border-neon-pink/50'
                    : 'bg-white/5 hover:bg-white/10 border border-white/20'
                }`}
              >
                <div className="text-2xl mb-2">{scheduleInfo.icon}</div>
                <div className="font-semibold">{scheduleInfo.label}</div>
                <div className="text-sm text-white/70">{scheduleInfo.time}</div>
              </button>
            );
          })}
        </div>

        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="font-semibold text-neon-blue mb-2">{schedule.label}</h4>
          <p className="text-white/80 text-sm mb-3">{schedule.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-green-400 text-sm font-semibold mb-2">メリット</h5>
              <ul className="text-xs text-white/70 space-y-1">
                {schedule.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                    <span>{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-yellow-400 text-sm font-semibold mb-2">注意点</h5>
              <ul className="text-xs text-white/70 space-y-1">
                {schedule.warnings.map((warning, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <AlertCircle className="w-3 h-3 text-yellow-400 flex-shrink-0" />
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 時間サマリー */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
          時間配分
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <Calendar className="w-6 h-6 text-neon-purple mx-auto mb-2" />
            <div className="text-lg font-bold text-neon-purple">{Math.round(totalEstimatedTime / 60)}時間</div>
            <div className="text-xs text-white/60">観光時間</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <Route className="w-6 h-6 text-neon-blue mx-auto mb-2" />
            <div className="text-lg font-bold text-neon-blue">{Math.round(totalTransportTime / 60)}時間</div>
            <div className="text-xs text-white/60">移動時間</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <Clock className="w-6 h-6 text-neon-green mx-auto mb-2" />
            <div className="text-lg font-bold text-neon-green">{Math.round((totalEstimatedTime + totalTransportTime) / 60)}時間</div>
            <div className="text-xs text-white/60">合計時間</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <Users className="w-6 h-6 text-neon-pink mx-auto mb-2" />
            <div className="text-lg font-bold text-neon-pink">{items.length}</div>
            <div className="text-xs text-white/60">スポット数</div>
          </div>
        </div>
      </div>

      {/* 詳細ルートステップ */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
          詳細ルートガイド
        </h3>
        
        <div className="space-y-6">
          {routeSteps.map((step, index) => (
            <div key={index} className="border-l-2 border-neon-blue/30 pl-6 relative">
              {/* ステップインジケーター */}
              <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-r from-neon-pink to-neon-blue rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                {/* ヘッダー */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-neon-pink" />
                      <span className="font-semibold">{step.from.name}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/50" />
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-neon-blue" />
                      <span className="font-semibold">{step.to.name}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleStep(index)}
                    className="p-2 hover:bg-white/10 rounded-lg transition duration-300"
                  >
                    {expandedSteps.includes(index) ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    }
                  </button>
                </div>

                {/* 基本交通情報 */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    {getTransportIcon(step.transportation.type)}
                    <div>
                      <div className="text-sm font-medium">
                        {step.transportation.line || step.transportation.type}
                      </div>
                      <div className="text-xs text-white/60">交通手段</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-neon-green" />
                    <div>
                      <div className="text-sm font-medium text-neon-green">{step.transportation.duration}</div>
                      <div className="text-xs text-white/60">所要時間</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Route className="w-4 h-4 text-neon-purple" />
                    <div>
                      <div className="text-sm font-medium text-neon-purple">{step.transportation.distance}</div>
                      <div className="text-xs text-white/60">距離</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-neon-pink" />
                    <div>
                      <div className="text-sm font-medium text-neon-pink">{step.transportation.cost}</div>
                      <div className="text-xs text-white/60">費用</div>
                    </div>
                  </div>
                </div>

                {/* 展開コンテンツ */}
                {expandedSteps.includes(index) && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-white/20">
                    {/* 詳細手順 */}
                    <div>
                      <h5 className="font-semibold mb-2 text-neon-blue">詳細手順</h5>
                      <ol className="space-y-2">
                        {step.transportation.instructions.map((instruction, instrIndex) => (
                          <li key={instrIndex} className="flex items-start space-x-3 text-sm">
                            <div className="flex-shrink-0 w-5 h-5 bg-neon-blue/20 rounded-full flex items-center justify-center text-xs font-bold text-neon-blue mt-0.5">
                              {instrIndex + 1}
                            </div>
                            <span className="text-white/80">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* 代替ルート */}
                    <div>
                      <h5 className="font-semibold mb-2 text-neon-purple">代替ルート</h5>
                      <div className="space-y-2">
                        {step.transportation.alternatives.map((alt, altIndex) => (
                          <div key={altIndex} className="p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                {getTransportIcon(alt.type)}
                                <span className="font-medium">{alt.line || alt.type}</span>
                              </div>
                              <div className="flex items-center space-x-4 text-sm">
                                <span className="text-neon-green">{alt.duration}</span>
                                <span className="text-neon-pink">{alt.cost}</span>
                              </div>
                            </div>
                            <p className="text-sm text-white/70">{alt.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div>
                      <h5 className="font-semibold mb-2 text-neon-green">移動のコツ</h5>
                      <div className="space-y-2">
                        {step.tips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-start space-x-2 text-sm">
                            <Info className="w-4 h-4 text-neon-green mt-0.5 flex-shrink-0" />
                            <span className="text-white/80">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedRouteGuide;