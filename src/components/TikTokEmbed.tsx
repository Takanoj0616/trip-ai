import React, { useEffect, useRef } from 'react';

interface TikTokEmbedProps {
  videoId: string;
  username: string;
  className?: string;
}

const TikTokEmbed: React.FC<TikTokEmbedProps> = ({ videoId, username, className = '' }) => {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load TikTok embed script if not already loaded
    if (!document.querySelector('script[src*="embed.tiktok.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Create TikTok blockquote element
    if (embedRef.current) {
      const blockquote = document.createElement('blockquote');
      blockquote.className = 'tiktok-embed';
      blockquote.setAttribute('cite', `https://www.tiktok.com/@${username}/video/${videoId}`);
      blockquote.setAttribute('data-video-id', videoId);
      blockquote.style.cssText = 'max-width: 605px; min-width: 325px;';
      
      // Add fallback content
      const link = document.createElement('a');
      link.target = '_blank';
      link.title = `@${username}`;
      link.href = `https://www.tiktok.com/@${username}/video/${videoId}?refer=embed`;
      link.textContent = `@${username}`;
      blockquote.appendChild(link);

      // Clear previous content and add new embed
      embedRef.current.innerHTML = '';
      embedRef.current.appendChild(blockquote);

      // Trigger TikTok embed script
      if (window.tiktok) {
        window.tiktok.embed();
      }
    }
  }, [videoId, username]);

  return (
    <div className={`tiktok-embed-container ${className}`} ref={embedRef}>
      {/* Loading placeholder */}
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">TikTok動画を読み込み中...</p>
        </div>
      </div>
    </div>
  );
};

export default TikTokEmbed;