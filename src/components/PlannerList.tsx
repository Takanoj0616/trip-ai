import React from 'react';
import { Star, Clock, MapPin, DollarSign, MessageCircle, CheckCircle, Globe } from 'lucide-react';
import { Planner } from '../types/planner';

interface PlannerListProps {
  planners: Planner[];
  onSelectPlanner: (planner: Planner) => void;
}

const PlannerList: React.FC<PlannerListProps> = ({ planners, onSelectPlanner }) => {
  if (planners.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">😔</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          条件に合うプランナーが見つかりませんでした
        </h3>
        <p className="text-gray-500">
          条件を変更して再度お試しください
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          あなたにおすすめのプランナー
        </h2>
        <p className="text-gray-600">
          {planners.length}名のプランナーが見つかりました
        </p>
      </div>

      <div className="grid gap-6">
        {planners.map((planner) => (
          <div
            key={planner.id}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* プランナー基本情報 */}
              <div className="flex-shrink-0">
                <img
                  src={planner.avatar}
                  alt={planner.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto lg:mx-0"
                />
              </div>

              <div className="flex-grow">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{planner.name}</h3>
                      <div className="flex items-center gap-1">
                        {planner.languages.map((lang, index) => (
                          <span
                            key={index}
                            className="text-xs bg-neon-blue/20 text-neon-blue border border-neon-blue/30 px-2 py-1 rounded"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{planner.rating}</span>
                        <span className="text-white/60 text-sm">
                          ({planner.reviewCount}件)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-white/70">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{planner.responseTime}</span>
                      </div>
                    </div>

                    <p className="text-white/80 mb-4 line-clamp-2">
                      {planner.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-neon-pink" />
                          <span className="text-sm font-medium text-white">対応エリア</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {planner.areas.map((area, index) => (
                            <span
                              key={index}
                              className="text-xs bg-neon-pink/20 text-neon-pink border border-neon-pink/30 px-2 py-1 rounded"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-4 h-4 text-neon-green" />
                          <span className="text-sm font-medium text-white">料金目安</span>
                        </div>
                        <div className="text-sm text-white/80">
                          ¥{planner.priceRange.min.toLocaleString()} - ¥{planner.priceRange.max.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2 text-white">専門分野</div>
                      <div className="flex flex-wrap gap-2">
                        {planner.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="text-xs bg-neon-purple/20 text-neon-purple border border-neon-purple/30 px-2 py-1 rounded"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-white/70">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>{planner.completedTrips}件の実績</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        <span>{planner.experience}年の経験</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <button
                      onClick={() => onSelectPlanner(planner)}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-lg hover:from-neon-purple hover:to-neon-blue transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      相談する
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ポートフォリオ */}
            {planner.portfolio.length > 0 && (
              <div className="mt-6 pt-6 border-t border-white/20">
                <h4 className="text-sm font-medium text-white mb-3">
                  過去のプラン例
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {planner.portfolio.slice(0, 2).map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-3 p-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h5 className="text-sm font-semibold text-white mb-1">
                          {item.title}
                        </h5>
                        <p className="text-xs text-white/70 mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex gap-2 text-xs text-white/60">
                          <span>{item.duration}</span>
                          <span>•</span>
                          <span>{item.budget}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlannerList;