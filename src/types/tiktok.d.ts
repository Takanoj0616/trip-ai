// TikTok Embed API type definitions
declare global {
  interface Window {
    tiktok: {
      embed(): void;
    };
  }
}

export {};