import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TokyoTowerLivePage from './pages/TokyoTowerLivePage'
import AdminPage from './pages/AdminPage'
import ItineraryPage from './pages/ItineraryPage'
import PlannerMatchingPage from './pages/PlannerMatchingPage'
import FirebaseInitializer from './components/FirebaseInitializer'
import PrefectureSelection from './components/PrefectureSelection'
import TouristSpotSelection from './components/TouristSpotSelection'
import TouristSpotDetailPage from './components/TouristSpotDetailPage'
import { AreaSelection } from './components/AreaSelection'
import { CategorySelection } from './components/CategorySelection'
import { TravelGuide } from './components/TravelGuide'
import { ItineraryProvider } from './contexts/ItineraryContext'

// Area型の定義
export type Area = 'tokyo' | 'yokohama' | 'saitama' | 'chiba';

// ラッパーコンポーネント
const TouristSpotSelectionWrapper: React.FC = () => {
  const { prefecture } = useParams<{ prefecture: string }>();
  return <TouristSpotSelection selectedPrefecture={prefecture} />;
};

const App: React.FC = () => {
  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = '0s';
          entry.target.classList.add('animate-slide-up');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('section > div');
    animatableElements.forEach(el => observer.observe(el));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Add hover effects to buttons
    document.querySelectorAll('button').forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ItineraryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* 東京タワーライブ情報 */}
          <Route path="/tokyo-tower-live" element={<TokyoTowerLivePage />} />
          
          {/* 管理者ページ */}
          <Route path="/admin" element={<AdminPage />} />
          
          {/* 旅しおりページ */}
          <Route path="/itinerary" element={<ItineraryPage />} />
          
          {/* プランナーマッチングページ */}
          <Route path="/planner-matching" element={<PlannerMatchingPage />} />
          
          {/* Firebase初期化ページ（開発用） */}
          <Route path="/firebase-init" element={<FirebaseInitializer />} />
          
          {/* 観光スポットルート */}
          <Route path="/spots" element={<PrefectureSelection />} />
          <Route path="/spots/all" element={<TouristSpotSelection selectedPrefecture="all" />} />
          <Route path="/spots/:prefecture" element={<TouristSpotSelectionWrapper />} />
          <Route path="/spot/:spotId" element={<TouristSpotDetailPage />} />
          
          {/* エリア選択ルート */}
          <Route path="/area-selection" element={<AreaSelection />} />
          <Route path="/category-selection/:area" element={<CategorySelection />} />
          <Route path="/guide/:area/:category" element={<TravelGuide />} />
        </Routes>
      </Router>
    </ItineraryProvider>
  )
}

export default App