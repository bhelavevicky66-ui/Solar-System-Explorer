
import React, { useState, useEffect } from 'react';
import { Planet } from '../types';
import { getPlanetFunFact } from '../geminiService';

interface PlanetModalProps {
  planet: Planet;
  onClose: () => void;
}

const PlanetModal: React.FC<PlanetModalProps> = ({ planet, onClose }) => {
  const [aiFact, setAiFact] = useState<string | null>(null);
  const [loadingFact, setLoadingFact] = useState(false);

  const fetchNewFact = async () => {
    setLoadingFact(true);
    const fact = await getPlanetFunFact(planet.name);
    setAiFact(fact);
    setLoadingFact(false);
  };

  useEffect(() => {
    fetchNewFact();
  }, [planet.name]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl shadow-indigo-500/10">
        <div className={`h-40 bg-gradient-to-br ${planet.color} relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-950/40 hover:bg-slate-950/60 rounded-full text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div className="absolute -bottom-10 left-8">
            <div className={`w-32 h-32 rounded-full border-4 border-slate-900 bg-gradient-to-br ${planet.color} shadow-lg shadow-indigo-500/20`}></div>
          </div>
        </div>

        <div className="pt-14 pb-8 px-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-4xl font-bold font-display text-white">{planet.name}</h2>
              <p className="text-indigo-400 font-medium">Celestial Body</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Distance</p>
              <p className="text-lg font-semibold text-white">{planet.distance}</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Size</p>
              <p className="text-lg font-semibold text-white">{planet.size}</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Temp</p>
              <p className="text-lg font-semibold text-white">{planet.temperature}</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Gravity</p>
              <p className="text-lg font-semibold text-white">{planet.gravity}</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Moons</p>
              <p className="text-lg font-semibold text-white">{planet.moons}</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Rotation</p>
              <p className="text-lg font-semibold text-white">{planet.rotationTime}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-slate-300 font-semibold mb-2">Overview</h3>
              <p className="text-slate-400 leading-relaxed">{planet.fact}</p>
            </div>

            <div className="bg-indigo-950/30 p-5 rounded-2xl border border-indigo-500/30 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-indigo-300 font-bold flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                  Gemini Deep Space Insight
                </h3>
                <button
                  onClick={fetchNewFact}
                  disabled={loadingFact}
                  className="text-xs text-indigo-400 hover:text-indigo-200 transition-colors flex items-center gap-1 disabled:opacity-50"
                >
                  <svg className={`${loadingFact ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" /></svg>
                  Refresh
                </button>
              </div>
              {loadingFact ? (
                <div className="flex items-center space-x-2 py-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              ) : (
                <p className="text-indigo-200 italic leading-relaxed">"{aiFact || planet.fact}"</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetModal;
