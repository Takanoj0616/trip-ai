import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    navigate('/area-selection');
  };

  return (
    <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                  <i className="fas fa-robot mr-2 text-neon-pink"></i>TripAI
                </h1>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {location.pathname === '/' ? (
              <>
                <a href="#features" className="text-white/80 hover:text-neon-blue transition duration-300">Features</a>
                <a href="#how-it-works" className="text-white/80 hover:text-neon-blue transition duration-300">How It Works</a>
                <a href="#tokyo-info" className="text-white/80 hover:text-neon-blue transition duration-300">Tokyo Info</a>
                <Link to="/area-selection" className="text-white/80 hover:text-neon-blue transition duration-300">Area Selection</Link>
              </>
            ) : (
              <>
                <Link to="/" className="text-white/80 hover:text-neon-blue transition duration-300">Home</Link>
                <Link to="/area-selection" className="text-white/80 hover:text-neon-blue transition duration-300">Area Selection</Link>
                <Link to="/spots" className="text-white/80 hover:text-neon-blue transition duration-300">Tourist Spots</Link>
                <Link to="/planner-matching" className="text-white/80 hover:text-neon-blue transition duration-300">Travel Planner</Link>
                <Link to="/tokyo-tower-live" className="text-white/80 hover:text-neon-blue transition duration-300">Tokyo Tower Live</Link>
                <Link to="/itinerary" className="text-white/80 hover:text-neon-blue transition duration-300">My Itinerary</Link>
              </>
            )}
            <a href="#pricing" className="text-white/80 hover:text-neon-blue transition duration-300">Pricing</a>
            <button 
              onClick={handleStartPlanning}
              className="bg-gradient-to-r from-neon-pink to-neon-purple px-6 py-2 rounded-full hover:shadow-lg hover:shadow-neon-pink/50 transition duration-300 font-semibold"
            >
              Start Now
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-white">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation