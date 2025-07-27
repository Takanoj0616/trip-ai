import React from 'react'

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
              Complete in 3 Steps
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            AI instantly creates your ideal travel experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="group text-center relative">
            <div className="bg-gradient-to-br from-neon-pink/20 to-neon-purple/20 backdrop-blur-xl rounded-3xl p-8 border border-neon-pink/30 hover:border-neon-pink/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-neon-pink/30">
              <div className="bg-gradient-to-r from-neon-pink to-neon-purple text-white p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:animate-pulse">
                <i className="fas fa-brain text-3xl"></i>
              </div>
              <div className="bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent text-lg font-bold mb-2">STEP 1</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Share Your Preferences</h3>
              <p className="text-white/80 leading-relaxed">
                Simply answer questions about your travel purpose, budget, duration, and interests. AI learns your preferences to create the perfect plan.
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="group text-center relative">
            <div className="bg-gradient-to-br from-neon-blue/20 to-neon-green/20 backdrop-blur-xl rounded-3xl p-8 border border-neon-blue/30 hover:border-neon-blue/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-neon-blue/30">
              <div className="bg-gradient-to-r from-neon-blue to-neon-green text-white p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:animate-pulse">
                <i className="fas fa-cogs text-3xl"></i>
              </div>
              <div className="bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent text-lg font-bold mb-2">STEP 2</div>
              <h3 className="text-2xl font-bold mb-4 text-white">AI Analysis & Generation</h3>
              <p className="text-white/80 leading-relaxed">
                Advanced AI analyzes global data to instantly generate your perfect itinerary. Real-time information is included for the most current recommendations.
              </p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="group text-center relative">
            <div className="bg-gradient-to-br from-electric-yellow/20 to-neon-pink/20 backdrop-blur-xl rounded-3xl p-8 border border-electric-yellow/30 hover:border-electric-yellow/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-electric-yellow/30">
              <div className="bg-gradient-to-r from-electric-yellow to-neon-pink text-white p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:animate-pulse">
                <i className="fas fa-magic text-3xl"></i>
              </div>
              <div className="bg-gradient-to-r from-electric-yellow to-neon-pink bg-clip-text text-transparent text-lg font-bold mb-2">STEP 3</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Perfect Itinerary Complete</h3>
              <p className="text-white/80 leading-relaxed">
                Detailed schedule, recommended spots, restaurants, and transportation. Your complete perfect travel itinerary is ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection