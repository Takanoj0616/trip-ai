import React from 'react';
import { Area } from '../App';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Train, Mountain, ArrowRight } from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

const areaData = {
  tokyo: {
    name: 'Tokyo',
    description: 'The bustling capital city with endless possibilities',
    highlights: ['Shibuya Crossing', 'Tokyo Skytree', 'Tsukiji Market', 'Harajuku'],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    icon: Users,
    stats: { population: '14M', districts: '23 Special Wards', transport: 'Extensive Rail Network' }
  },
  yokohama: {
    name: 'Yokohama',
    description: 'Modern port city with beautiful waterfront views',
    highlights: ['Minato Mirai', 'Chinatown', 'Red Brick Warehouse', 'Cosmo World'],
    image: 'https://images.unsplash.com/photo-1604919067684-df73bbe8dfdc?w=800&h=600&fit=crop',
    icon: MapPin,
    stats: { population: '3.7M', districts: '18 Wards', transport: 'Connected to Tokyo' }
  },
  saitama: {
    name: 'Saitama',
    description: 'Perfect blend of traditional culture and modern living',
    highlights: ['Kawagoe', 'Omiya', 'Railway Museum', 'Chichibu'],
    image: 'https://images.unsplash.com/photo-1598661048663-a3e0a077f1c4?w=800&h=600&fit=crop',
    icon: Train,
    stats: { population: '7.3M', districts: '40 Cities', transport: 'Major Rail Hub' }
  },
  chiba: {
    name: 'Chiba',
    description: 'Coastal prefecture with beautiful nature and beaches',
    highlights: ['Narita', 'Choshi', 'Boso Peninsula', 'Tokyo Disneyland'],
    image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800&h=600&fit=crop',
    icon: Mountain,
    stats: { population: '6.3M', districts: '37 Cities', transport: 'Airport Gateway' }
  }
};

export const AreaSelection: React.FC = () => {
  const navigate = useNavigate();

  const handleAreaClick = (area: Area) => {
    navigate(`/category-selection/${area}`);
  };

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
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-2 rounded-full text-sm font-semibold border border-neon-pink/50 animate-pulse-glow">
                🗾 Choose Your Adventure
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
                日本のエリアを
              </span><br />
              <span className="bg-gradient-to-r from-neon-blue via-neon-green to-electric-yellow bg-clip-text text-transparent">
                発見しよう
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              あなただけの<span className="text-neon-blue font-semibold">パーソナライズされた旅行ガイド</span>を始めるために<br className="hidden md:block" />
              <span className="text-neon-pink font-semibold">エリアを選択</span>してください。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(areaData).map(([key, area]) => (
              <div
                key={key}
                className="group relative bg-black/30 backdrop-blur-lg rounded-xl border border-white/10 hover:border-neon-pink/50 transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-neon-pink/20"
                onClick={() => handleAreaClick(key as Area)}
              >
                <div className="relative">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <area.icon className="w-8 h-8 text-neon-blue" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent mb-3">
                    {area.name}
                  </h2>
                  <p className="text-white/80 text-lg mb-4 leading-relaxed">
                    {area.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center text-neon-blue hover:text-neon-pink font-semibold text-lg transition-colors duration-300">
                      探索を開始
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    
                    <div className="flex space-x-2">
                      <div className="text-center">
                        <div className="text-sm text-white/60">人口</div>
                        <div className="text-neon-green font-bold">{area.stats.population}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}; 