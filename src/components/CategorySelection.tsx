import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Area } from '../App';
import { 
  Camera, 
  Utensils, 
  ShoppingBag, 
  Train, 
  Hotel, 
  Mountain, 
  Coffee, 
  Music,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const categories: Category[] = [
  {
    id: 'sightseeing',
    name: '観光スポット',
    description: '有名なランドマークと観光地',
    icon: Camera,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'food',
    name: 'グルメ・食事',
    description: '地元の料理とレストラン',
    icon: Utensils,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'shopping',
    name: 'ショッピング',
    description: 'モール、市場、ユニークな店舗',
    icon: ShoppingBag,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'transport',
    name: '交通手段',
    description: '移動方法と旅行のコツ',
    icon: Train,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'accommodation',
    name: '宿泊施設',
    description: 'ホテル、旅館、滞在先',
    icon: Hotel,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'nature',
    name: '自然・アウトドア',
    description: '公園、ハイキング、屋外活動',
    icon: Mountain,
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'cafe',
    name: 'カフェ・バー',
    description: 'コーヒーショップ、バー、ナイトライフ',
    icon: Coffee,
    color: 'from-amber-500 to-amber-600'
  },
  {
    id: 'culture',
    name: '文化・エンターテイメント',
    description: '博物館、劇場、文化体験',
    icon: Music,
    color: 'from-pink-500 to-pink-600'
  }
];

const areaNames: Record<Area, string> = {
  tokyo: '東京',
  yokohama: '横浜',
  saitama: '埼玉',
  chiba: '千葉'
};

export const CategorySelection: React.FC = () => {
  const { area } = useParams<{ area: Area }>();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/guide/${area}/${categoryId}`);
  };

  const handleBackClick = () => {
    navigate('/area-selection');
  };

  if (!area || !areaNames[area]) {
    return (
      <div className="font-inter bg-gradient-to-br from-deep-purple via-dark-purple to-cyber-blue text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">エリアが見つかりません</h1>
          <button
            onClick={() => navigate('/area-selection')}
            className="px-6 py-2 bg-gradient-to-r from-neon-pink to-neon-purple rounded-lg hover:shadow-lg transition-all duration-300"
          >
            エリア選択に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="font-inter bg-gradient-to-br from-deep-purple via-dark-purple to-cyber-blue text-white overflow-x-hidden min-h-screen">
      <Navigation />
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="floating-shape w-64 h-64 bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 rounded-full absolute top-20 left-10 animate-float blur-xl"></div>
        <div className="floating-shape w-48 h-48 bg-gradient-to-r from-neon-blue/20 to-neon-green/20 rounded-full absolute top-40 right-20 animate-float delay-1000 blur-xl"></div>
        <div className="floating-shape w-32 h-32 bg-gradient-to-r from-electric-yellow/20 to-neon-pink/20 rounded-full absolute bottom-32 left-1/4 animate-float delay-2000 blur-xl"></div>
      </div>

      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <button
              onClick={handleBackClick}
              className="inline-flex items-center text-neon-blue hover:text-neon-pink mb-6 transition-colors duration-300 font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              エリア選択に戻る
            </button>
            
            <div className="text-center">
              <div className="inline-block mb-6">
                <span className="bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-2 rounded-full text-sm font-semibold border border-neon-pink/50 animate-pulse-glow">
                  🎯 カテゴリ選択
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
                  {areaNames[area]}で何に
                </span><br />
                <span className="bg-gradient-to-r from-neon-blue via-neon-green to-electric-yellow bg-clip-text text-transparent">
                  興味がありますか？
                </span>
              </h1>
              
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                <span className="text-neon-blue font-semibold">カテゴリを選択</span>して、あなたの旅行に<span className="text-neon-pink font-semibold">パーソナライズされた推奨</span>を取得しましょう。
              </p>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group bg-black/30 backdrop-blur-lg rounded-xl border border-white/10 hover:border-neon-pink/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-neon-pink/20"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="p-6">
                  <div className={`w-14 h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                    {category.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center text-neon-blue group-hover:text-neon-pink transition-colors duration-300">
                    <span className="text-sm font-semibold">探索する</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="bg-black/20 backdrop-blur-lg rounded-xl border border-white/10 p-8">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
              {areaNames[area]}のクイックヒント
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/80">
              <div className="space-y-2">
                <span className="text-neon-blue font-semibold">最適な訪問時期:</span>
                <span className="block">春（3-5月）は桜、秋（10-11月）は紅葉がおすすめ</span>
              </div>
              <div className="space-y-2">
                <span className="text-neon-green font-semibold">移動手段:</span>
                <span className="block">電車とバスの効率的な公共交通システム</span>
              </div>
              <div className="space-y-2">
                <span className="text-neon-pink font-semibold">言語:</span>
                <span className="block">観光地では基本的な英語が通じますが、日本語を少し覚えると便利</span>
              </div>
              <div className="space-y-2">
                <span className="text-electric-yellow font-semibold">通貨:</span>
                <span className="block">日本円（¥）。主要エリアではクレジットカードが広く利用可能</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}; 