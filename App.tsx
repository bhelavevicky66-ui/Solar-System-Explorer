
import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { INITIAL_PLANETS, QUIZ_QUESTIONS } from './constants';
import { Planet, QuizScore, AdminCredentials } from './types';
import StarsBackground from './components/StarsBackground';
import SolarSystem from './components/SolarSystem';
import PlanetModal from './components/PlanetModal';
import Quiz from './components/Quiz';
import AdminPanel from './components/AdminPanel';

// Navbar Component
const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Universe', path: '/' },
    { name: 'Education', path: '/info' },
    { name: 'Mission Control', path: '/quiz' },
    { name: 'Station Ops', path: '/admin' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-md py-3 border-b border-slate-800' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>
          </div>
          <span className="text-xl font-bold font-display tracking-tight text-white">StellarVoyage</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold tracking-wide transition-colors ${location.pathname === link.path ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>(() => {
    const saved = localStorage.getItem('sv_planets');
    return saved ? JSON.parse(saved) : INITIAL_PLANETS;
  });

  const [scores, setScores] = useState<QuizScore[]>(() => {
    const saved = localStorage.getItem('sv_scores');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [isOrbiting, setIsOrbiting] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    // Simulate initial loading for "Space Immersion"
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('sv_planets', JSON.stringify(planets));
  }, [planets]);

  useEffect(() => {
    localStorage.setItem('sv_scores', JSON.stringify(scores));
  }, [scores]);

  const filteredPlanets = useMemo(() => {
    return planets.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [planets, searchQuery]);

  const handleUpdatePlanet = (updatedPlanet: Planet) => {
    setPlanets(planets.map(p => p.id === updatedPlanet.id ? updatedPlanet : p));
  };

  const handleDeletePlanet = (id: string) => {
    setPlanets(planets.filter(p => p.id !== id));
  };

  const handleQuizComplete = (newScore: QuizScore) => {
    setScores(prev => [newScore, ...prev]);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold font-display text-white animate-pulse">Initializing Galactic Coordinates...</h2>
        <p className="text-slate-500 mt-2">Loading space assets & planet data</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen relative flex flex-col">
        <StarsBackground />
        {!isFullScreen && <Navbar />}

        <main className="flex-grow pt-28 pb-12 px-6">
          <Routes>
            {/* Solar System View */}
            <Route path="/" element={
              <div className="max-w-7xl mx-auto h-full flex flex-col items-center">
                <div className={`flex flex-col md:flex-row items-center gap-6 w-full mb-12 ${isFullScreen ? 'hidden' : ''}`}>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search for a planet..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-full px-12 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all backdrop-blur-sm"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsFullScreen(true)}
                      className="px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 border bg-indigo-500/10 border-indigo-500 text-indigo-400 hover:bg-indigo-500/20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                      View Full Screen
                    </button>

                    <button
                      onClick={() => setIsOrbiting(!isOrbiting)}
                      className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 border ${isOrbiting ? 'bg-red-500/10 border-red-500 text-red-500' : 'bg-green-500/10 border-green-500 text-green-500'}`}
                    >
                      {isOrbiting ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                          Stop Orbit
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                          Start Orbit
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className={`${isFullScreen ? 'fixed inset-0 z-50 bg-black' : 'relative w-full h-[70vh]'}`}>
                  {isFullScreen && (
                    <button
                      onClick={() => setIsFullScreen(false)}
                      className="absolute top-8 right-8 z-50 px-6 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full text-white font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
                      Exit Full Screen
                    </button>
                  )}
                  <SolarSystem
                    planets={filteredPlanets}
                    onPlanetClick={setSelectedPlanet}
                    isOrbiting={isOrbiting}
                  />
                </div>

                {selectedPlanet && (
                  <PlanetModal
                    planet={selectedPlanet}
                    onClose={() => setSelectedPlanet(null)}
                  />
                )}
              </div>
            } />

            {/* Info Page */}
            <Route path="/info" element={
              <div className="max-w-5xl mx-auto py-12">
                <h1 className="text-5xl font-bold font-display text-white mb-4 text-center">Planetary Atlas</h1>
                <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto text-lg leading-relaxed">
                  Discover the diverse worlds within our solar neighborhood, from scorching rocky planets to distant ice giants.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {planets.map(planet => (
                    <div
                      key={planet.id}
                      className="group bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden hover:border-indigo-500 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer"
                      onClick={() => setSelectedPlanet(planet)}
                    >
                      <div className={`h-32 bg-gradient-to-br ${planet.color} p-6 flex justify-end items-start`}>
                        <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-[10px] text-white font-bold uppercase tracking-widest">
                          {planet.distance}
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-2 font-display">{planet.name}</h3>
                        <p className="text-slate-400 text-sm line-clamp-3 mb-6">{planet.fact}</p>
                        <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-tighter">
                          <span>{planet.size}</span>
                          <span className="text-indigo-400 group-hover:translate-x-1 transition-transform">Explore Details →</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            } />

            {/* Quiz Route */}
            <Route path="/quiz" element={
              <div className="max-w-4xl mx-auto py-12">
                <Quiz onComplete={handleQuizComplete} />
              </div>
            } />

            {/* Admin Route */}
            <Route path="/admin" element={
              <div className="max-w-5xl mx-auto py-12">
                <AdminPanel
                  planets={planets}
                  scores={scores}
                  onUpdatePlanet={handleUpdatePlanet}
                  onDeletePlanet={handleDeletePlanet}
                />
              </div>
            } />
          </Routes>
        </main>

        <footer className={`py-8 border-t border-slate-800 text-center ${isFullScreen ? 'hidden' : ''}`}>
          <p className="text-slate-500 text-sm">
            &copy; 2024 StellarVoyage. Powered by Gemini AI. Explore responsibly.
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
