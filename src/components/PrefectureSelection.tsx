import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import { PREFECTURES } from '../data/touristSpots';

const PrefectureSelection: React.FC = () => {
  const navigate = useNavigate();

  const handlePrefectureClick = (prefectureId: string) => {
    navigate(`/spots/${prefectureId}`);
  };

  const handleAllSpotsClick = () => {
    navigate('/spots/all');
  };

  return (
    <div className="min-h-screen font-inter bg-gradient-to-br from-deep-purple via-dark-purple to-cyber-blue text-white">
      {/* Header */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-white/60 hover:text-neon-blue transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent">
                Kanto Tourist Spots
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Discover attractive tourist spots in Tokyo, Kanagawa, Saitama, and Chiba.
              From traditional shrines and temples to modern landmarks, diverse experiences await you.
            </p>

            {/* All Spots Button */}
            <button
              onClick={handleAllSpotsClick}
              className="bg-gradient-to-r from-neon-pink to-neon-purple px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-neon-pink/30 transition-all duration-300 transform hover:scale-105 mb-12"
            >
              <span className="flex items-center">
                <span className="mr-2">🌟</span>
                View All Spots
                <ArrowRight className="w-5 h-5 ml-2" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Prefecture Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Choose by Prefecture
          </h2>
          <p className="text-white/70">
            Click on your region of interest to explore tourist spots in that area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.values(PREFECTURES).map((prefecture) => (
            <div
              key={prefecture.id}
              className="relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              onClick={() => handlePrefectureClick(prefecture.id)}
            >
              {/* Background Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={prefecture.image}
                  alt={prefecture.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Prefecture Icon */}
                <div className="absolute top-6 left-6">
                  <div className="text-6xl">{prefecture.icon}</div>
                </div>

                {/* Stats */}
                <div className="absolute top-6 right-6">
                  <div className="bg-black/60 backdrop-blur rounded-lg p-3 text-right">
                    <div className="text-sm text-white/80 mb-1">Tourist Spots</div>
                    <div className="text-xl font-bold text-neon-blue">{prefecture.stats.spots}</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                    {prefecture.name}
                    <span className="ml-2 text-lg text-white/60">{prefecture.nameEn}</span>
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {prefecture.description}
                  </p>
                </div>

                {/* Prefecture Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <Users className="w-5 h-5 mx-auto mb-2 text-neon-blue" />
                    <div className="text-sm text-white/80 mb-1">Population</div>
                    <div className="font-semibold text-white">{prefecture.stats.population}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <MapPin className="w-5 h-5 mx-auto mb-2 text-neon-green" />
                    <div className="text-sm text-white/80 mb-1">Area</div>
                    <div className="font-semibold text-white">{prefecture.stats.area}</div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <div className={`bg-gradient-to-r ${prefecture.color} px-4 py-2 rounded-full text-sm font-semibold text-white`}>
                    {prefecture.stats.spots} Tourist Spots
                  </div>
                  <div className="flex items-center text-neon-blue group-hover:text-neon-green transition-colors">
                    <span className="text-sm font-semibold mr-2">View Spots</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-white mb-6">Quick Access</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🗼', name: 'ランドマーク', category: 'landmark' },
              { icon: '⛩️', name: '神社仏閣', category: 'temple' },
              { icon: '🎢', name: 'エンタメ', category: 'entertainment' },
              { icon: '🌸', name: '自然', category: 'nature' }
            ].map((item) => (
              <button
                key={item.category}
                onClick={() => navigate(`/spots/all?category=${item.category}`)}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="text-sm font-medium text-white">{item.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrefectureSelection;