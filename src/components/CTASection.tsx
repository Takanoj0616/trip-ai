import React from 'react'

const CTASection: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-neon-pink/30 via-neon-purple/30 to-neon-blue/30 animate-glow-pulse"></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-6xl font-black mb-8">
          <span className="bg-gradient-to-r from-electric-yellow via-neon-pink to-neon-purple bg-clip-text text-transparent">
            Start Your
          </span><br />
          <span className="bg-gradient-to-r from-neon-blue via-neon-green to-electric-yellow bg-clip-text text-transparent">
            Adventure Now
          </span>
        </h2>
        
        <p className="text-2xl text-white/90 mb-12 leading-relaxed">
          Experience completely free.<br />
          <span className="text-neon-pink font-semibold">No credit card required</span>, <span className="text-neon-blue font-semibold">registration in 30 seconds</span>.
        </p>
        
        <div className="space-y-6">
          <button className="group bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue px-16 py-6 rounded-full text-2xl font-black hover:shadow-2xl hover:shadow-neon-pink/50 transition-all duration-500 transform hover:scale-110 border-2 border-white/20 hover:border-white/50">
            <i className="fas fa-rocket mr-4 group-hover:animate-bounce"></i>
            Start Free Now
            <div className="text-sm font-normal opacity-90 mt-1">Registration in 30 seconds</div>
          </button>
          
          <div className="flex justify-center items-center space-x-8 text-white/70 text-sm">
            <div className="flex items-center">
              <i className="fas fa-check-circle text-neon-green mr-2"></i>
              Completely Free
            </div>
            <div className="flex items-center">
              <i className="fas fa-check-circle text-neon-green mr-2"></i>
              No credit card required
            </div>
            <div className="flex items-center">
              <i className="fas fa-check-circle text-neon-green mr-2"></i>
              Available Instantly
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection