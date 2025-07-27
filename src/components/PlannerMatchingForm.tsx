import React, { useState } from 'react';
import { Calendar, MapPin, Users, DollarSign, Clock, Heart, Search } from 'lucide-react';

interface PlannerMatchingFormProps {
  onSubmit: (formData: any) => void;
  isLoading?: boolean;
}

const PlannerMatchingForm: React.FC<PlannerMatchingFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    dates: {
      startDate: '',
      endDate: ''
    },
    budget: {
      min: 5000,
      max: 30000
    },
    areas: [] as string[],
    categories: [] as string[],
    groupSize: 1,
    preferences: [] as string[]
  });

  const areas = [
    { id: 'tokyo', name: 'Tokyo', icon: '🗼' },
    { id: 'yokohama', name: 'Yokohama', icon: '🌉' }
  ];

  const categories = [
    { id: 'Dining', name: 'Dining & Food', icon: '🍜' },
    { id: 'Sightseeing', name: 'Tourist Spots', icon: '🏛️' },
    { id: 'Shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'Nature', name: 'Nature & Parks', icon: '🌳' },
    { id: 'Cafe & Bar', name: 'Cafes & Bars', icon: '☕' },
    { id: 'Culture', name: 'Cultural Experience', icon: '🎭' }
  ];

  const preferences = [
    'Instagram-worthy Spots',
    'Hidden Gems',
    'Traditional Culture',
    'Modern Culture',
    'Family-Friendly',
    'Couple-Friendly',
    'Solo Travel',
    'Group Activities'
  ];

  const handleAreaToggle = (areaId: string) => {
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.includes(areaId)
        ? prev.areas.filter(a => a !== areaId)
        : [...prev.areas, areaId]
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(c => c !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handlePreferenceToggle = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black/20 backdrop-blur-lg border border-white/10 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent mb-2">
          Find Your Perfect Travel Planner
        </h2>
        <p className="text-white/80">
          Select your preferences and get matched with expert planners. Let's create your ideal travel plan together!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 日程選択 */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-neon-blue mr-2" />
            <h3 className="text-lg font-semibold text-white">Travel Dates</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={formData.dates.startDate}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  dates: { ...prev.dates, startDate: e.target.value }
                }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={formData.dates.endDate}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  dates: { ...prev.dates, endDate: e.target.value }
                }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* 予算設定 */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <DollarSign className="w-5 h-5 text-neon-green mr-2" />
            <h3 className="text-lg font-semibold text-white">Budget (Per Person)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Minimum Budget: ¥{formData.budget.min.toLocaleString()}
              </label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={formData.budget.min}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  budget: { ...prev.budget, min: parseInt(e.target.value) }
                }))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Maximum Budget: ¥{formData.budget.max.toLocaleString()}
              </label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={formData.budget.max}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  budget: { ...prev.budget, max: parseInt(e.target.value) }
                }))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* エリア選択 */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <MapPin className="w-5 h-5 text-neon-pink mr-2" />
            <h3 className="text-lg font-semibold text-white">Preferred Areas</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {areas.map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={() => handleAreaToggle(area.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  formData.areas.includes(area.id)
                    ? 'border-neon-blue bg-neon-blue/20 text-white shadow-lg shadow-neon-blue/25'
                    : 'border-white/30 bg-white/10 text-white/80 hover:border-white/50 hover:bg-white/20'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{area.icon}</div>
                  <div className="font-medium">{area.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* カテゴリ選択 */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Heart className="w-5 h-5 text-neon-pink mr-2" />
            <h3 className="text-lg font-semibold text-white">Interests & Categories</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryToggle(category.id)}
                className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                  formData.categories.includes(category.id)
                    ? 'border-neon-pink bg-neon-pink/20 text-white shadow-lg shadow-neon-pink/25'
                    : 'border-white/30 bg-white/10 text-white/80 hover:border-white/50 hover:bg-white/20'
                }`}
              >
                <div className="text-center">
                  <div className="text-xl mb-1">{category.icon}</div>
                  <div className="text-sm font-medium">{category.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 人数選択 */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Users className="w-5 h-5 text-neon-purple mr-2" />
            <h3 className="text-lg font-semibold text-white">Group Size</h3>
          </div>
          <select
            value={formData.groupSize}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              groupSize: parseInt(e.target.value)
            }))}
            className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-neon-purple focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num} className="bg-gray-800 text-white">{num} {num === 1 ? 'person' : 'people'}</option>
            ))}
          </select>
        </div>

        {/* 好み・特徴選択 */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-neon-orange mr-2" />
            <h3 className="text-lg font-semibold text-white">Travel Preferences</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {preferences.map((preference) => (
              <button
                key={preference}
                type="button"
                onClick={() => handlePreferenceToggle(preference)}
                className={`p-2 rounded-lg border-2 text-sm transition-all duration-300 ${
                  formData.preferences.includes(preference)
                    ? 'border-neon-orange bg-neon-orange/20 text-white shadow-lg shadow-neon-orange/25'
                    : 'border-white/30 bg-white/10 text-white/80 hover:border-white/50 hover:bg-white/20'
                }`}
              >
                {preference}
              </button>
            ))}
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="text-center">
          <button
            type="submit"
            className={`inline-flex items-center px-8 py-3 font-semibold rounded-lg transition-all duration-300 ${
              isLoading 
                ? 'bg-white/20 text-white/60 cursor-not-allowed' 
                : 'bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:from-neon-purple hover:to-neon-blue shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
            disabled={formData.areas.length === 0 || formData.categories.length === 0 || isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Find Planners
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlannerMatchingForm;