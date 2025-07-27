import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  Star, 
  Phone, 
  Globe, 
  Info,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Download,
  Share2
} from 'lucide-react';
import { TravelItinerary, ItineraryDay, Activity } from '../types/planner';

interface TravelItineraryViewerProps {
  itinerary: TravelItinerary;
  onApprove: () => void;
  onRequestChanges: (feedback: string) => void;
  onMessage: (message: string) => void;
}

const TravelItineraryViewer: React.FC<TravelItineraryViewerProps> = ({
  itinerary,
  onApprove,
  onRequestChanges,
  onMessage
}) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const formatCurrency = (amount: number) => {
    return `¥${amount.toLocaleString()}`;
  };

  const formatTime = (time: string) => {
    return time;
  };

  const calculateDayTotal = (day: ItineraryDay) => {
    return day.activities.reduce((total, activity) => total + activity.cost, 0);
  };

  const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600">
              {formatTime(activity.time)}
            </span>
            <span className="text-sm text-gray-500">
              ({activity.duration})
            </span>
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-1">
            {activity.title}
          </h4>
          <div className="flex items-center gap-1 text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{activity.location}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-green-600">
            {formatCurrency(activity.cost)}
          </div>
          <div className="text-xs text-gray-500">
            {activity.category}
          </div>
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-3">{activity.description}</p>

      {activity.tips && activity.tips.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-1 mb-2">
            <Info className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-600">おすすめポイント</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-1">
            {activity.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activity.bookingInfo && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
          <div className="flex items-center gap-1 mb-1">
            <Calendar className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">
              {activity.bookingInfo.required ? '要予約' : '予約推奨'}
            </span>
          </div>
          <div className="text-sm text-yellow-700 space-y-1">
            {activity.bookingInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span>{activity.bookingInfo.phone}</span>
              </div>
            )}
            {activity.bookingInfo.url && (
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <a href={activity.bookingInfo.url} className="text-blue-600 hover:underline">
                  予約サイト
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      onRequestChanges(feedback);
      setFeedback('');
      setShowFeedbackForm(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* ヘッダー */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {itinerary.title}
            </h1>
            <p className="text-gray-600 mb-4">{itinerary.description}</p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{itinerary.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>総予算: {formatCurrency(itinerary.totalBudget)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span className={`px-2 py-1 rounded-full text-xs ${
                  itinerary.status === 'approved' ? 'bg-green-100 text-green-800' :
                  itinerary.status === 'proposal' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {itinerary.status === 'approved' ? '承認済み' :
                   itinerary.status === 'proposal' ? '提案中' : '下書き'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-3">
          <button
            onClick={onApprove}
            className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            このプランで決定
          </button>
          <button
            onClick={() => setShowFeedbackForm(true)}
            className="inline-flex items-center px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <ThumbsDown className="w-4 h-4 mr-2" />
            修正を依頼
          </button>
          <button
            onClick={() => onMessage('')}
            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            プランナーに相談
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 日程選択サイドバー */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-4 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">日程</h3>
            <div className="space-y-2">
              {itinerary.days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedDay === index
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-medium text-gray-800">
                    Day {day.day}
                  </div>
                  <div className="text-sm text-gray-600">{day.date}</div>
                  <div className="text-sm text-blue-600">{day.theme}</div>
                  <div className="text-xs text-green-600 mt-1">
                    {formatCurrency(calculateDayTotal(day))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="lg:col-span-3">
          {itinerary.days[selectedDay] && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Day {itinerary.days[selectedDay].day}
                  </h2>
                  <p className="text-gray-600">{itinerary.days[selectedDay].date}</p>
                  <p className="text-lg text-blue-600 font-medium">
                    {itinerary.days[selectedDay].theme}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(calculateDayTotal(itinerary.days[selectedDay]))}
                  </div>
                  <div className="text-sm text-gray-500">この日の合計</div>
                </div>
              </div>

              {/* アクティビティ一覧 */}
              <div className="space-y-4">
                {itinerary.days[selectedDay].activities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>

              {/* 日程メモ */}
              {itinerary.days[selectedDay].notes && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">プランナーからのメモ</span>
                  </div>
                  <p className="text-blue-700">{itinerary.days[selectedDay].notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* フィードバックフォーム */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              修正のご要望
            </h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="どのような修正をご希望ですか？具体的にお聞かせください。"
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSubmitFeedback}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                修正を依頼
              </button>
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TravelItineraryViewer;