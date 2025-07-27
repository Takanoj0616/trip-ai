import React, { useEffect, useState } from 'react';
import VideoPlayer from './VideoPlayer';
import TikTokEmbed from './TikTokEmbed';
import type { TikTokVideo } from '../types/api';

interface VideoModalProps {
  video: TikTokVideo | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, isOpen, onClose }) => {
  const [useEmbed, setUseEmbed] = useState(false);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return '今';
    } else if (diffInHours < 24) {
      return `${diffInHours}時間前`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}日前`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 text-white hover:text-gray-300 transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex max-w-6xl w-full h-full max-h-[90vh] bg-black rounded-lg overflow-hidden">
        {/* Video Player */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md aspect-[9/16]">
            {/* Video info and toggle */}
            <div className="mb-4 text-center">
              <div className="mb-2">
                <p className="text-white text-sm">
                  実際のTikTok風動画プレーヤー
                </p>
                <p className="text-gray-400 text-xs">
                  実用的なモックデータで完全動作
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-1 flex justify-center">
                <button
                  onClick={() => setUseEmbed(false)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    !useEmbed ? 'bg-pink-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  高機能プレーヤー
                </button>
                <button
                  onClick={() => setUseEmbed(true)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    useEmbed ? 'bg-pink-500 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  TikTok埋め込み
                </button>
              </div>
            </div>

            {useEmbed ? (
              <TikTokEmbed
                videoId={video.id}
                username={video.author.uniqueId}
                className="w-full h-full"
              />
            ) : (
              <VideoPlayer
                src={video.video.playAddr}
                poster={video.video.cover}
                autoplay={true}
                loop={true}
                muted={true}
                className="w-full h-full"
              />
            )}
          </div>
        </div>

        {/* Video Info Sidebar */}
        <div className="w-80 bg-gray-900 text-white p-6 overflow-y-auto">
          {/* Author Info */}
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={video.author.avatarThumb}
              alt={video.author.nickname}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <h3 className="font-semibold text-white">{video.author.nickname}</h3>
                {video.author.verified && (
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-sm text-gray-400">@{video.author.uniqueId}</p>
            </div>
            <span className="text-xs text-gray-500">{formatTime(video.createTime)}</span>
          </div>

          {/* Video Description */}
          <div className="mb-6">
            <p className="text-white leading-relaxed">{video.desc}</p>
          </div>

          {/* Music Info */}
          {video.music && (
            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" clipRule="evenodd" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{video.music.title}</p>
                  <p className="text-gray-400 text-xs truncate">{video.music.authorName}</p>
                </div>
              </div>
            </div>
          )}

          {/* Engagement Stats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="text-white">いいね</span>
              </div>
              <span className="text-white font-semibold">{formatNumber(video.stats.diggCount)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                <span className="text-white">コメント</span>
              </div>
              <span className="text-white font-semibold">{formatNumber(video.stats.commentCount)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                <span className="text-white">シェア</span>
              </div>
              <span className="text-white font-semibold">{formatNumber(video.stats.shareCount)}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span className="text-white">再生回数</span>
              </div>
              <span className="text-white font-semibold">{formatNumber(video.stats.playCount)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => window.open(`https://www.tiktok.com/@${video.author.uniqueId}/video/${video.id}`, '_blank')}
              className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
            >
              TikTokで開く
            </button>
            <button className="w-full bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300">
              お気に入りに追加
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;