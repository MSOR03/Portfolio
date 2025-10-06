"use client";

import { useState, useEffect } from 'react';
import { useTheme } from "next-themes";

const ExperienceCard = ({ role, company, date, description, techs = [], logo, achievements = [] }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full max-w-xs sm:w-[320px] h-[520px] mx-auto">
        <div className="w-full h-full rounded-2xl bg-gray-800 animate-pulse" />
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div
      onMouseEnter={() => { setFlipped(true); setIsHovered(true); }}
      onMouseLeave={() => { setFlipped(false); setIsHovered(false); }}
      className="group w-full max-w-xs sm:w-[320px] h-[520px] mx-auto cursor-pointer relative"
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${flipped ? 180 : 0}deg)`,
        }}
      >
        {/* Cara Frontal */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden border shadow-xl ${
            isDark 
              ? 'bg-gradient-to-br from-gray-900/90 to-gray-800/70 border-green-500/30'
              : 'bg-gradient-to-br from-white/95 to-gray-100 border-green-500/40'
          }`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
              {/* Logo */}
              <div className="relative mb-8">
                <div 
                  className={`relative w-24 h-24 rounded-xl overflow-hidden border ${
                    isDark ? 'border-green-500/30 bg-gray-800/50' : 'border-green-500/40 bg-white'
                  }`}
                >
                  {logo ? (
                    <img src={logo} alt={company} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500 to-green-700">
                      <span className="text-white font-bold text-xl">
                        {company?.charAt(0) || 'C'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Información */}
              <div className="text-center space-y-4">
                <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {role}
                </h3>
                
                <div className="h-0.5 w-16 mx-auto bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full" />
                
                <h4 className={`text-lg font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  {company}
                </h4>
                
                <div 
                  className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
                    isDark 
                      ? 'bg-gray-800/50 border border-green-500/20 text-green-400'
                      : 'bg-white border border-green-500/30 text-green-600'
                  }`}
                >
                  {date}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6">
              <div 
                className={`text-center p-4 rounded-lg ${
                  isDark ? 'bg-gray-800/30 border border-green-500/20' : 'bg-gray-50 border border-green-500/30'
                }`}
              >
                <p className={`text-xs font-medium mb-3 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  Hover para detalles completos
                </p>
                <div className="flex justify-center space-x-2">
                  {[0, 0.5, 1].map((delay, i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${delay}s` }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cara Trasera */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden border shadow-xl ${
            isDark 
              ? 'bg-gradient-to-br from-gray-900/95 to-gray-800/75 border-green-500/30'
              : 'bg-gradient-to-br from-white to-gray-50 border-green-500/40'
          }`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="relative z-10 h-full p-5 flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-5">
              <div 
                className={`inline-block p-3 rounded-xl mb-3 ${
                  isDark ? 'bg-gray-800/50 border border-green-500/20' : 'bg-gray-50 border border-green-500/30'
                }`}
              >
                <h4 className={`text-lg font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  Información Detallada
                </h4>
              </div>
            </div>

            {/* Logros */}
            {achievements.length > 0 && (
              <div className="mb-4">
                <div 
                  className={`p-4 rounded-xl mb-3 ${
                    isDark 
                      ? 'bg-green-500/5 border border-green-500/20'
                      : 'bg-green-50 border border-green-500/30'
                  }`}
                >
                  <h5 className={`text-sm font-semibold mb-3 flex items-center ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                    Logros Destacados
                  </h5>
                  <div className="space-y-2">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-400/60 rounded-full mt-2 flex-shrink-0" />
                        <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tecnologías */}
            <div className="mb-4">
              <div 
                className={`p-4 rounded-xl mb-3 ${
                  isDark ? 'bg-gray-800/30 border border-green-500/20' : 'bg-gray-50 border border-green-500/30'
                }`}
              >
                <h5 className={`text-sm font-semibold mb-3 flex items-center ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  <div className="w-2 h-2 bg-green-500/60 rounded-full mr-2 animate-pulse" />
                  Stack Tecnológico
                </h5>
                <div className="flex flex-wrap gap-2">
                  {techs.length > 0 ? techs.map((tech, index) => (
                    <span
                      key={index}
                      className={`text-xs px-3 py-1.5 rounded-md font-medium ${
                        isDark 
                          ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                          : 'bg-green-50 border border-green-500/30 text-green-700'
                      }`}
                    >
                      {tech}
                    </span>
                  )) : (
                    <span className={`text-sm italic ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                      Stack por definir
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="flex-1">
              <div 
                className={`p-4 rounded-xl h-full ${
                  isDark ? 'bg-gray-800/30 border border-green-500/20' : 'bg-gray-50 border border-green-500/30'
                }`}
              >
                <h5 className={`text-sm font-semibold mb-3 flex items-center ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  <div className="w-2 h-2 bg-green-500/60 rounded-full mr-2 animate-pulse" />
                  Descripción del Rol
                </h5>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {description || 'Experiencia enfocada en desarrollo de soluciones tecnológicas innovadoras.'}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 text-center">
              <div 
                className={`inline-block px-4 py-2 rounded-lg text-xs font-medium ${
                  isDark 
                    ? 'bg-gray-800/50 border border-green-500/20 text-green-400'
                    : 'bg-white border border-green-500/30 text-green-600'
                }`}
              >
                {company} • {date}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;