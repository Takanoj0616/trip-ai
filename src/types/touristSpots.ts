export interface TouristSpot {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  category: 'sightseeing' | 'food' | 'accommodation' | 'transport' | 'entertainment' | 'nature' | 'temple' | 'cultural' | 'shopping' | 'modern' | 'landmark';
  prefecture: 'tokyo' | 'kanagawa' | 'saitama' | 'chiba';
  image: string;
  location: {
    address: string;
    station: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  highlights: string[];
  hashtags: string[];
  keywords: string[];
  rating: number;
  visitTime: string;
  bestSeason: string[];
  entrance: {
    fee: string;
    hours: string;
  };
  access: {
    train: string;
    walking: string;
  };
  tips: string[];
}

export interface Prefecture {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  image: string;
  color: string;
  icon: string;
  stats: {
    population: string;
    area: string;
    spots: string;
  };
  topSpots: string[]; // spot IDs
}