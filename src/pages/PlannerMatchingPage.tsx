import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlannerMatchingForm from '../components/PlannerMatchingForm';
import PlannerList from '../components/PlannerList';
import MessagingSystem from '../components/MessagingSystem';
import TravelItineraryViewer from '../components/TravelItineraryViewer';
import { PlannerService } from '../services/plannerService';
import { Planner, TravelRequest, TravelItinerary } from '../types/planner';
import { ArrowLeft } from 'lucide-react';
import ConnectionStatus from '../components/ConnectionStatus';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

type PageState = 'form' | 'matching' | 'messaging' | 'itinerary';

const PlannerMatchingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<PageState>('form');
  const [matchingPlanners, setMatchingPlanners] = useState<Planner[]>([]);
  const [selectedPlanner, setSelectedPlanner] = useState<Planner | null>(null);
  const [travelRequest, setTravelRequest] = useState<TravelRequest | null>(null);
  const [currentItinerary, setCurrentItinerary] = useState<TravelItinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<string>('');

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true);
    setServiceStatus('プランナーを検索中...');
    
    try {
      // サービス状態を確認
      const connectionStatus = await PlannerService.checkConnection();
      if (connectionStatus.firebase) {
        setServiceStatus('Firebaseからプランナーを検索中...');
      } else {
        setServiceStatus('ローカルデータからプランナーを検索中...');
      }

      // 旅行リクエストを作成
      const requestId = await PlannerService.createTravelRequest({
        userId: 'user-1',
        ...formData,
        status: 'pending'
      });

      const request: TravelRequest = {
        id: requestId,
        userId: 'user-1',
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      setTravelRequest(request);
      
      // マッチするプランナーを取得
      const matchedPlanners = await PlannerService.getMatchingPlanners(
        formData.areas,
        formData.categories,
        formData.budget
      );
      
      if (matchedPlanners.length === 0) {
        setServiceStatus('条件に合うプランナーが見つかりませんでした。条件を変更してお試しください。');
        alert('条件に合うプランナーが見つかりませんでした。エリアや予算を調整してみてください。');
        setIsLoading(false);
        return;
      }

      setMatchingPlanners(matchedPlanners);
      setServiceStatus(`${matchedPlanners.length}名のプランナーが見つかりました！`);
      setCurrentState('matching');
    } catch (error) {
      console.error('プランナー検索エラー:', error);
      setServiceStatus('エラーが発生しました。再度お試しください。');
      alert('プランナー検索中にエラーが発生しました。ページを再読み込みして再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPlanner = (planner: Planner) => {
    setSelectedPlanner(planner);
    setCurrentState('messaging');
  };

  const handleSendMessage = async (content: string, type: 'text' | 'itinerary') => {
    if (!travelRequest || !selectedPlanner) return;

    try {
      await PlannerService.sendMessage({
        requestId: travelRequest.id,
        senderId: 'user-1',
        senderType: 'user',
        content,
        type
      });
      console.log('✅ メッセージが送信されました:', content);
    } catch (error) {
      console.error('❌ メッセージ送信エラー:', error);
      alert('メッセージの送信に失敗しました。再度お試しください。');
    }
  };

  const handleCreateItinerary = () => {
    // サンプルの旅行しおりを作成（実際はプランナーが作成）
    const sampleItinerary: TravelItinerary = {
      id: Date.now().toString(),
      requestId: travelRequest?.id || '',
      plannerId: selectedPlanner?.id || '',
      title: 'Tokyo Gourmet & Sightseeing 2-Day Journey',
      description: 'A special plan designed to help you fully enjoy Tokyo\'s attractions tailored to your preferences.',
      totalBudget: 35000,
      duration: '2 days',
      status: 'proposal',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      days: [
        {
          day: 1,
          date: '2024年12月1日（日）',
          theme: '築地グルメ&浅草文化体験',
          totalCost: 18000,
          activities: [
            {
              id: '1',
              time: '07:00',
              title: '築地場外市場 朝食',
              location: '築地場外市場',
              address: '東京都中央区築地4-16-2',
              description: '新鮮な海鮮丼とマグロの刺身で朝食。市場の活気ある雰囲気も楽しめます。',
              cost: 3000,
              duration: '1.5時間',
              category: '飲食',
              tips: [
                '朝7時頃が一番活気があっておすすめ',
                '現金のみの店舗が多いので注意',
                '土日は特に混雑するため早めの訪問を'
              ],
              bookingInfo: {
                required: false
              }
            },
            {
              id: '2',
              time: '10:00',
              title: '浅草寺参拝',
              location: '浅草寺',
              address: '東京都台東区浅草2-3-1',
              description: '東京最古の寺院を参拝。雷門や仲見世通りも一緒に楽しめます。',
              cost: 0,
              duration: '2時間',
              category: '観光',
              tips: [
                '朝の参拝は観光客が少なく静寂',
                '仲見世通りでお土産購入も忘れずに',
                'おみくじは日本語と英語があります'
              ]
            },
            {
              id: '3',
              time: '13:00',
              title: '老舗天ぷら店での昼食',
              location: '大黒家天麩羅',
              address: '東京都台東区浅草1-38-10',
              description: '150年以上の歴史を持つ老舗天ぷら店。江戸前天ぷらの伝統の味を堪能。',
              cost: 4500,
              duration: '1時間',
              category: '飲食',
              tips: [
                '老舗の味を堪能できる貴重な体験',
                'えび天とあなご天が特におすすめ',
                '混雑時は待ち時間があります'
              ],
              bookingInfo: {
                required: true,
                phone: '03-3844-1111'
              }
            },
            {
              id: '4',
              time: '15:30',
              title: '東京スカイツリー展望台',
              location: '東京スカイツリー',
              address: '東京都墨田区押上1-1-2',
              description: '地上350mの展望デッキから東京の絶景を一望。天気が良ければ富士山も見えます。',
              cost: 2100,
              duration: '2時間',
              category: '観光',
              tips: [
                '夕方の時間帯は夕日と夜景の両方が楽しめる',
                '事前予約で待ち時間を短縮できます',
                '天気予報をチェックしてから訪問を'
              ],
              bookingInfo: {
                required: true,
                url: 'https://www.tokyo-skytree.jp/',
                phone: '0570-55-0634'
              }
            },
            {
              id: '5',
              time: '19:00',
              title: 'もんじゃ焼きディナー',
              location: 'もんじゃ麦',
              address: '東京都台東区浅草1-6-7',
              description: '本格的なもんじゃ焼きとお好み焼きが楽しめる地元の人気店。',
              cost: 3200,
              duration: '1.5時間',
              category: '飲食',
              tips: [
                '店員さんが作り方を教えてくれます',
                '明太子もちもんじゃが人気メニュー',
                'アルコールも豊富に揃っています'
              ]
            }
          ],
          notes: 'この日は伝統的な東京の魅力を存分に味わう日程です。朝は築地の活気、昼は浅草の歴史、夕方は現代の象徴スカイツリーと、時代の移り変わりを感じられるコースになっています。'
        },
        {
          day: 2,
          date: '2024年12月2日（月）',
          theme: '現代東京とショッピング',
          totalCost: 17000,
          activities: [
            {
              id: '6',
              time: '10:00',
              title: '明治神宮参拝',
              location: '明治神宮',
              address: '東京都渋谷区代々木神園町1-1',
              description: '都心のオアシス、明治神宮で心を落ち着かせる朝の散歩。',
              cost: 0,
              duration: '1.5時間',
              category: '観光',
              tips: [
                '朝の参拝は清々しい気持ちになれます',
                '御朱印も頂けます',
                '原宿へのアクセスも便利'
              ]
            },
            {
              id: '7',
              time: '12:00',
              title: '原宿・表参道ショッピング',
              location: '表参道ヒルズ',
              address: '東京都渋谷区神宮前4-12-10',
              description: '最新のファッションとトレンドをチェック。お土産選びにも最適。',
              cost: 5000,
              duration: '3時間',
              category: 'ショッピング',
              tips: [
                '平日は比較的空いています',
                '表参道の美しい並木道も散策',
                'カフェでの休憩も忘れずに'
              ]
            },
            {
              id: '8',
              time: '15:30',
              title: '渋谷クロッシング体験',
              location: 'スクランブル交差点',
              address: '東京都渋谷区道玄坂1丁目',
              description: '世界で最も有名な交差点を体験。ハチ公像との記念撮影も。',
              cost: 0,
              duration: '1時間',
              category: '観光',
              tips: [
                'スカイデッキからの眺めもおすすめ',
                '夕方の時間帯が特に賑やか',
                'ハチ公像は待ち合わせスポットとして有名'
              ]
            },
            {
              id: '9',
              time: '17:00',
              title: '銀座高級寿司ディナー',
              location: '鮨 さいとう',
              address: '東京都中央区銀座4-2-15',
              description: 'ミシュラン三つ星の名店で本格江戸前寿司を堪能。',
              cost: 12000,
              duration: '2時間',
              category: '飲食',
              tips: [
                '予約は数週間前から必要',
                'カウンター席がおすすめ',
                '職人の技を間近で見られます'
              ],
              bookingInfo: {
                required: true,
                phone: '03-3535-3600'
              }
            }
          ],
          notes: '2日目は現代の東京を体感する日程です。神聖な明治神宮から始まり、最新トレンドの原宿・表参道、そして東京の象徴渋谷を経て、最後は銀座で大人の時間を過ごします。'
        }
      ]
    };

    setCurrentItinerary(sampleItinerary);
    setCurrentState('itinerary');
  };

  const handleApproveItinerary = () => {
    alert('Travel plan approved! We will contact the planner.');
    setCurrentState('messaging');
  };

  const handleRequestChanges = (feedback: string) => {
    alert(`Change request sent: ${feedback}`);
    setCurrentState('messaging');
  };

  const handleMessageFromItinerary = (message: string) => {
    setCurrentState('messaging');
  };

  const renderBackButton = () => {
    if (currentState === 'form') return null;
    
    const handleBack = () => {
      switch (currentState) {
        case 'matching':
          setCurrentState('form');
          break;
        case 'messaging':
          setCurrentState('matching');
          break;
        case 'itinerary':
          setCurrentState('messaging');
          break;
      }
    };

    return (
      <button
        onClick={handleBack}
        className="mb-6 inline-flex items-center text-neon-blue hover:text-white transition-colors duration-300 bg-black/20 backdrop-blur-lg border border-white/10 px-4 py-2 rounded-lg"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>
    );
  };

  return (
    <div className="font-inter bg-gradient-to-br from-deep-purple via-dark-purple to-cyber-blue text-white overflow-x-hidden">
      <Navigation />
      
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          {renderBackButton()}
        
        {currentState === 'form' && (
          <>
            <PlannerMatchingForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            {(isLoading || serviceStatus) && (
              <div className="max-w-4xl mx-auto mt-6">
                <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    {isLoading && (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-neon-blue"></div>
                    )}
                    <span className="text-white">{serviceStatus}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {currentState === 'matching' && (
          <PlannerList
            planners={matchingPlanners}
            onSelectPlanner={handleSelectPlanner}
          />
        )}

        {currentState === 'messaging' && selectedPlanner && travelRequest && (
          <MessagingSystem
            planner={selectedPlanner}
            requestId={travelRequest.id}
            onSendMessage={handleSendMessage}
            onCreateItinerary={handleCreateItinerary}
          />
        )}

        {currentState === 'itinerary' && currentItinerary && (
          <TravelItineraryViewer
            itinerary={currentItinerary}
            onApprove={handleApproveItinerary}
            onRequestChanges={handleRequestChanges}
            onMessage={handleMessageFromItinerary}
          />
        )}

          {/* 接続状態インジケーター */}
          <ConnectionStatus />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PlannerMatchingPage;