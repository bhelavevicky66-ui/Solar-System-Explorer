
import React, { useState } from 'react';
import { Planet, QuizScore } from '../types';

interface AdminPanelProps {
  planets: Planet[];
  scores: QuizScore[];
  onUpdatePlanet: (planet: Planet) => void;
  onDeletePlanet: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ planets, scores, onUpdatePlanet, onDeletePlanet }) => {
  const [activeTab, setActiveTab] = useState<'planets' | 'scores'>('planets');
  const [editingPlanet, setEditingPlanet] = useState<Planet | null>(null);

  const handleSavePlanet = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlanet) {
      onUpdatePlanet(editingPlanet);
      setEditingPlanet(null);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
      <div className="flex border-b border-slate-700">
        <button 
          onClick={() => setActiveTab('planets')}
          className={`px-8 py-5 font-bold transition-all ${activeTab === 'planets' ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/5' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Manage Planets
        </button>
        <button 
          onClick={() => setActiveTab('scores')}
          className={`px-8 py-5 font-bold transition-all ${activeTab === 'scores' ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/5' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Quiz Leaderboard
        </button>
      </div>

      <div className="p-8">
        {activeTab === 'planets' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {planets.map(planet => (
                <div key={planet.id} className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white">{planet.name}</h4>
                    <p className="text-xs text-slate-400">{planet.distance}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingPlanet(planet)}
                      className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-indigo-300 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button 
                      onClick={() => onDeletePlanet(planet.id)}
                      className="p-2 bg-slate-700 hover:bg-red-900/40 rounded-lg text-red-400 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {editingPlanet && (
              <div className="mt-8 p-6 bg-slate-800 rounded-2xl border border-slate-600 animate-in slide-in-from-bottom-4 duration-300">
                <h3 className="text-xl font-bold text-white mb-6">Edit Planet: {editingPlanet.name}</h3>
                <form onSubmit={handleSavePlanet} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Planet Name</label>
                    <input 
                      type="text" 
                      value={editingPlanet.name} 
                      onChange={e => setEditingPlanet({...editingPlanet, name: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Distance from Sun</label>
                    <input 
                      type="text" 
                      value={editingPlanet.distance} 
                      onChange={e => setEditingPlanet({...editingPlanet, distance: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Average Temp</label>
                    <input 
                      type="text" 
                      value={editingPlanet.temperature} 
                      onChange={e => setEditingPlanet({...editingPlanet, temperature: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>
                   <div>
                    <label className="block text-xs text-slate-400 mb-1">Size (Diameter)</label>
                    <input 
                      type="text" 
                      value={editingPlanet.size} 
                      onChange={e => setEditingPlanet({...editingPlanet, size: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-slate-400 mb-1">Fun Fact</label>
                    <textarea 
                      value={editingPlanet.fact} 
                      onChange={e => setEditingPlanet({...editingPlanet, fact: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white h-20"
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                    <button type="button" onClick={() => setEditingPlanet(null)} className="px-6 py-2 bg-slate-700 text-slate-300 rounded-xl hover:bg-slate-600">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 font-bold">Save Changes</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="pb-4 font-bold text-slate-300">Captain</th>
                  <th className="pb-4 font-bold text-slate-300">Rank</th>
                  <th className="pb-4 font-bold text-slate-300">Score</th>
                  <th className="pb-4 font-bold text-slate-300">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {scores.length > 0 ? scores.map(score => (
                  <tr key={score.id} className="hover:bg-slate-800/30">
                    <td className="py-4 text-white font-medium">{score.username}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold ${
                        score.score >= 4 ? 'bg-green-500/10 text-green-400' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {score.score >= 4 ? 'Commander' : 'Ensign'}
                      </span>
                    </td>
                    <td className="py-4 text-indigo-300">{score.score} / {score.total}</td>
                    <td className="py-4 text-slate-400 text-sm">{score.date}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500 italic">No missions logged yet...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
