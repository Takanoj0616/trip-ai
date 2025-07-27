import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                <i className="fas fa-robot mr-2"></i>TripAI
              </span>
            </h3>
            <p className="text-white/70 mb-6 max-w-md">
              AI-powered, personalized travel itineraries just for you. Experience the next generation of trip planning.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gradient-to-r from-neon-pink to-neon-purple p-3 rounded-full hover:shadow-lg hover:shadow-neon-pink/50 transition duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="bg-gradient-to-r from-neon-blue to-neon-green p-3 rounded-full hover:shadow-lg hover:shadow-neon-blue/50 transition duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="bg-gradient-to-r from-electric-yellow to-neon-pink p-3 rounded-full hover:shadow-lg hover:shadow-electric-yellow/50 transition duration-300">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-neon-blue">Features</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-neon-blue transition duration-300">AI Itinerary</a></li>
              <li><a href="#" className="hover:text-neon-blue transition duration-300">Real-time Updates</a></li>
              <li><a href="#" className="hover:text-neon-blue transition duration-300">Mobile App</a></li>
              <li><a href="#" className="hover:text-neon-blue transition duration-300">Share Itinerary</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-neon-pink">Support</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-neon-pink transition duration-300">Help Center</a></li>
              <li><a href="#" className="hover:text-neon-pink transition duration-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-neon-pink transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-neon-pink transition duration-300">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/50">
          <p>&copy; 2024 TripAI. All rights reserved. Made with 🤖 & ❤️</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer