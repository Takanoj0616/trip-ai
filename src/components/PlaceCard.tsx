import React from 'react';
import type { GooglePlace } from '../types/api';
import { getPlacePhoto } from '../services/googlePlacesApi';

interface PlaceCardProps {
  place: GooglePlace;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const photoUrl = place.photos?.[0] 
    ? getPlacePhoto(place.photos[0].photo_reference, 400)
    : 'https://via.placeholder.com/400x300?text=No+Image';

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star text-electric-yellow"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-electric-yellow"></i>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-white/30"></i>);
    }

    return stars;
  };

  const formatRatingCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:border-neon-pink/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-neon-pink/20">
      {/* Place Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={photoUrl}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Place Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-gradient-to-r from-neon-purple to-neon-blue px-3 py-1 rounded-full text-xs font-semibold text-white">
            {place.types.includes('tourist_attraction') ? '観光地' : 
             place.types.includes('restaurant') ? 'レストラン' :
             place.types.includes('shopping_mall') ? 'ショッピング' : '施設'}
          </span>
        </div>
      </div>

      {/* Place Info */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
          {place.name}
        </h3>
        
        <p className="text-white/70 text-sm mb-3 line-clamp-2">
          {place.formatted_address.replace('日本、', '')}
        </p>

        {/* Rating */}
        {place.rating && (
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(place.rating)}
            </div>
            <span className="text-white font-semibold">
              {place.rating.toFixed(1)}
            </span>
            {place.user_ratings_total && (
              <span className="text-white/60 text-xs">
                ({formatRatingCount(place.user_ratings_total)}件)
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="flex-1 bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-2 rounded-lg text-white text-sm font-semibold hover:shadow-lg hover:shadow-neon-pink/30 transition-all duration-300 transform hover:scale-105">
            <i className="fas fa-map-marker-alt mr-2"></i>
            地図で見る
          </button>
          <button className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors duration-300">
            <i className="fas fa-share-alt text-white"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;