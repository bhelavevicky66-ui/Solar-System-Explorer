
import React, { useState } from 'react';
import { Planet } from '../types';

interface SolarSystemProps {
  planets: Planet[];
  onPlanetClick: (planet: Planet) => void;
  isOrbiting: boolean;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ planets, onPlanetClick, isOrbiting }) => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden perspective-1000">
      {/* The Sun */}
      <div className="relative z-10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 shadow-[0_0_80px_rgba(245,158,11,0.8)] animate-pulse"></div>
        <div className="absolute inset-0 w-24 h-24 rounded-full bg-yellow-400 blur-2xl opacity-40 animate-ping"></div>
      </div>

      {/* Orbits and Planets */}
      {planets.map((planet) => (
        <div
          key={planet.id}
          className="absolute border border-slate-700/50 rounded-full pointer-events-none"
          style={{
            width: `${planet.orbitSize * 2}px`,
            height: `${planet.orbitSize * 2}px`,
          }}
        >
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-auto"
            style={{
              animation: isOrbiting ? `rotate ${planet.orbitSpeed}s linear infinite` : 'none',
              transform: isOrbiting ? 'none' : `rotate(${parseInt(planet.id) * 45}deg)`,
            }}
          >
            <div
              className="absolute group"
              style={{
                top: '50%',
                left: '-10px',
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => setHoveredPlanet(planet.name)}
              onMouseLeave={() => setHoveredPlanet(null)}
              onClick={() => onPlanetClick(planet)}
            >
              <div
                className={`rounded-full bg-gradient-to-br ${planet.color} cursor-pointer transition-transform duration-300 group-hover:scale-125 shadow-lg group-hover:shadow-white/20`}
                style={{
                  width: `${planet.diameter}px`,
                  height: `${planet.diameter}px`,
                }}
              ></div>

              {/* Tooltip */}
              <div className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs rounded-full border border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50`}>
                {planet.name}
              </div>
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default SolarSystem;
