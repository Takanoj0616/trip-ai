import React from 'react';
import type { Tweet } from '../types/api';

interface TweetCardProps {
  tweet: Tweet;
}

const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}分前`;
    } else if (diffHours < 24) {
      return `${diffHours}時間前`;
    } else if (diffDays < 7) {
      return `${diffDays}日前`;
    } else {
      return date.toLocaleDateString('ja-JP');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-neon-blue/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-neon-blue/20">
      {/* User Info */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple flex items-center justify-center text-white font-bold text-lg mr-3 overflow-hidden">
          {tweet.author?.profile_image_url ? (
            <img 
              src={tweet.author.profile_image_url} 
              alt={tweet.author.name}
              className="w-full h-full object-cover"
            />
          ) : (
            tweet.author?.name?.charAt(0) || '?'
          )}
        </div>
        <div className="flex-1">
          <h4 className="text-white font-semibold text-sm">
            {tweet.author?.name || 'Unknown User'}
          </h4>
          <p className="text-white/60 text-xs">
            @{tweet.author?.username || 'unknown'} • {formatDate(tweet.created_at)}
          </p>
        </div>
        <div className="text-neon-blue">
          <i className="fab fa-twitter text-xl"></i>
        </div>
      </div>

      {/* Tweet Content */}
      <div className="mb-4">
        <p className="text-white/90 leading-relaxed text-sm">
          {tweet.text}
        </p>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center justify-between text-xs text-white/60 pt-3 border-t border-white/10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 hover:text-neon-pink transition-colors cursor-pointer">
            <i className="far fa-heart"></i>
            <span>{formatNumber(tweet.public_metrics.like_count)}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-neon-green transition-colors cursor-pointer">
            <i className="fas fa-retweet"></i>
            <span>{formatNumber(tweet.public_metrics.retweet_count)}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-neon-blue transition-colors cursor-pointer">
            <i className="far fa-comment"></i>
            <span>{formatNumber(tweet.public_metrics.reply_count)}</span>
          </div>
        </div>
        <div className="text-electric-yellow">
          <i className="fas fa-external-link-alt hover:text-white transition-colors cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;