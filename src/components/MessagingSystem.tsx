import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image, MapPin, Star, User } from 'lucide-react';
import { Planner, Message } from '../types/planner';

interface MessagingSystemProps {
  planner: Planner;
  requestId: string;
  onSendMessage: (content: string, type: 'text' | 'itinerary') => void;
  onCreateItinerary: () => void;
}

const MessagingSystem: React.FC<MessagingSystemProps> = ({
  planner,
  requestId,
  onSendMessage,
  onCreateItinerary
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      requestId,
      senderId: planner.id,
      senderType: 'planner',
      content: `こんにちは！${planner.name}です。あなたの旅行プランのご相談をお受けします。どのような旅をご希望ですか？`,
      timestamp: new Date().toISOString(),
      type: 'text'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      requestId,
      senderId: 'user-1',
      senderType: 'user',
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    onSendMessage(newMessage, 'text');
    setNewMessage('');

    // プランナーからの自動返信（デモ用）
    setTimeout(() => {
      const plannerResponse: Message = {
        id: (Date.now() + 1).toString(),
        requestId,
        senderId: planner.id,
        senderType: 'planner',
        content: '素晴らしいご要望ですね！詳細なプランを作成いたします。少々お待ちください。',
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, plannerResponse]);
    }, 1000);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const quickMessages = [
    '詳しい内容を教えてください',
    '予算を調整できますか？',
    '時間を変更したいです',
    'おすすめスポットを追加してください',
    'このプランで決定します'
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* ヘッダー */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center gap-3">
          <img
            src={planner.avatar}
            alt={planner.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-grow">
            <h2 className="text-lg font-semibold">{planner.name}</h2>
            <div className="flex items-center gap-2 text-blue-100">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm">{planner.rating} ({planner.reviewCount}件)</span>
              <span className="text-sm">• {planner.responseTime}</span>
            </div>
          </div>
          <button
            onClick={onCreateItinerary}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-lg text-sm font-medium transition-colors"
          >
            しおり作成
          </button>
        </div>
      </div>

      {/* メッセージ一覧 */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderType === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.senderType === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.senderType === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <img
                    src={planner.avatar}
                    alt={planner.name}
                    className="w-4 h-4 rounded-full"
                  />
                )}
                <span className="text-xs opacity-75">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* クイック返信 */}
      <div className="px-4 py-2 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {quickMessages.map((quickMsg, index) => (
            <button
              key={index}
              onClick={() => setNewMessage(quickMsg)}
              className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            >
              {quickMsg}
            </button>
          ))}
        </div>
      </div>

      {/* メッセージ入力 */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <div className="flex-grow relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="メッセージを入力..."
              className="w-full px-4 py-2 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Image className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* プランナー情報サイドバー */}
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="flex items-center gap-1 text-gray-600 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">対応エリア</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {planner.areas.map((area, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-gray-600 font-medium mb-1">専門分野</div>
            <div className="flex flex-wrap gap-1">
              {planner.specialties.slice(0, 2).map((specialty, index) => (
                <span
                  key={index}
                  className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-gray-600 font-medium mb-1">実績</div>
            <div className="text-gray-700">
              {planner.completedTrips}件完了 • {planner.experience}年経験
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingSystem;