export interface Planner {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  areas: string[];
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  experience: number;
  languages: string[];
  description: string;
  completedTrips: number;
  responseTime: string;
  availability: boolean;
  portfolio: {
    title: string;
    image: string;
    description: string;
    duration: string;
    budget: string;
  }[];
}

export interface TravelRequest {
  id: string;
  userId: string;
  dates: {
    startDate: string;
    endDate: string;
  };
  budget: {
    min: number;
    max: number;
  };
  areas: string[];
  categories: string[];
  groupSize: number;
  preferences: string[];
  status: 'pending' | 'matched' | 'in_progress' | 'completed';
  createdAt: string;
  matchedPlannerId?: string;
}

export interface Message {
  id: string;
  requestId: string;
  senderId: string;
  senderType: 'user' | 'planner';
  content: string;
  timestamp: string;
  type: 'text' | 'itinerary' | 'image';
  attachments?: {
    type: string;
    url: string;
    name: string;
  }[];
}

export interface TravelItinerary {
  id: string;
  requestId: string;
  plannerId: string;
  title: string;
  description: string;
  totalBudget: number;
  duration: string;
  days: ItineraryDay[];
  status: 'draft' | 'proposal' | 'approved' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryDay {
  day: number;
  date: string;
  theme: string;
  activities: Activity[];
  totalCost: number;
  notes?: string;
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  address: string;
  description: string;
  cost: number;
  duration: string;
  category: string;
  tips?: string[];
  bookingInfo?: {
    required: boolean;
    url?: string;
    phone?: string;
  };
}