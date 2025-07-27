import React from 'react'
import { useNavigate } from 'react-router-dom'

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate('/area-selection');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-transparent to-neon-blue/20"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="floating-shape w-64 h-64 bg-gradient-to-r from-neon-pink/30 to-neon-purple/30 rounded-full absolute top-20 left-10 animate-float blur-xl"></div>
        <div className="floating-shape w-48 h-48 bg-gradient-to-r from-neon-blue/30 to-neon-green/30 rounded-full absolute top-40 right-20 animate-float delay-1000 blur-xl"></div>
        <div className="floating-shape w-32 h-32 bg-gradient-to-r from-electric-yellow/30 to-neon-pink/30 rounded-full absolute bottom-32 left-1/4 animate-float delay-2000 blur-xl"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="inline-block mb-6">
          <span className="bg-gradient-to-r from-neon-pink to-neon-purple px-4 py-2 rounded-full text-sm font-semibold border border-neon-pink/50 animate-pulse-glow">
            🤖 AI powered travel planning
          </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
          <span className="bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue bg-clip-text text-transparent animate-slide-up">
            Your Perfect
          </span><br />
          <span className="bg-gradient-to-r from-neon-blue via-neon-green to-electric-yellow bg-clip-text text-transparent animate-slide-up delay-200">
            Travel Itinerary
          </span><br />
          <span className="bg-gradient-to-r from-electric-yellow via-neon-pink to-neon-purple bg-clip-text text-transparent animate-slide-up delay-400">
            Created by AI
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-white/80 max-w-4xl mx-auto leading-relaxed animate-slide-up delay-600">
          Advanced AI technology analyzes your preferences and budget,<br className="hidden md:block" />
          <span className="text-neon-blue font-semibold">instantly creating</span> a <span className="text-neon-pink font-semibold">unique travel plan</span> just for you.<br className="hidden md:block" />
          No more stress about trip planning.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center animate-slide-up delay-800">
          <button 
            onClick={handleStartPlanning}
            className="group bg-gradient-to-r from-neon-pink to-neon-purple px-12 py-5 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-neon-pink/50 transition-all duration-300 transform hover:scale-105 border-2 border-neon-pink/50"
          >
            <i className="fas fa-magic mr-3 group-hover:animate-bounce"></i>
            Create AI Itinerary
            <span className="block text-sm font-normal opacity-80">Free Experience</span>
          </button>
          
          <button className="group border-2 border-neon-blue px-10 py-5 rounded-full text-lg font-semibold hover:bg-neon-blue/20 transition-all duration-300 transform hover:scale-105">
            <i className="fas fa-play mr-3 group-hover:text-neon-blue"></i>
            Watch Demo
          </button>
        </div>
        
        <div className="mt-16 flex justify-center items-center space-x-8 text-white/60 animate-slide-up delay-1000">
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-pink">3 min</div>
            <div className="text-sm">to complete</div>
          </div>
          <div className="w-px h-12 bg-white/20"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-blue">1M+</div>
            <div className="text-sm">itineraries created</div>
          </div>
          <div className="w-px h-12 bg-white/20"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neon-green">98%</div>
            <div className="text-sm">satisfaction</div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce-slow">
        <i className="fas fa-chevron-down text-2xl"></i>
      </div>
    </section>
  )
}

export default HeroSection