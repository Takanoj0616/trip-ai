import React from 'react'

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: "fas fa-bolt",
      title: "Instant Generation",
      description: "Generate detailed travel plans in just 30 seconds. No more spending hours on planning.",
      color: "neon-blue"
    },
    {
      icon: "fas fa-user-astronaut",
      title: "Fully Personalized",
      description: "Deeply understands your personality, preferences, and budget to suggest 100% customized itineraries.",
      color: "neon-pink"
    },
    {
      icon: "fas fa-sync-alt",
      title: "Real-time Updates",
      description: "Constantly monitors weather, events, and crowd conditions to automatically adjust your optimal itinerary.",
      color: "neon-green"
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Mobile Optimized",
      description: "Easy smartphone operation. Real-time itinerary adjustments and information checks possible during travel.",
      color: "electric-yellow"
    },
    {
      icon: "fas fa-globe-asia",
      title: "Global Coverage",
      description: "Supports latest information from over 200 countries worldwide. Supporting your adventures wherever you go.",
      color: "neon-purple"
    },
    {
      icon: "fas fa-share-alt",
      title: "Easy Sharing",
      description: "Instantly share your created itinerary with friends and family. Enjoy planning trips together with everyone.",
      color: "neon-blue"
    }
  ]

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-transparent to-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black mb-6">
            <span className="bg-gradient-to-r from-neon-purple to-electric-yellow bg-clip-text text-transparent">
              Why Choose TripAI
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Innovative features that set us apart from traditional travel planning
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:border-${feature.color}/50 transition-all duration-500 hover:shadow-2xl hover:shadow-${feature.color}/20`}>
              <div className={`text-${feature.color} text-4xl mb-6`}>
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-white/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection