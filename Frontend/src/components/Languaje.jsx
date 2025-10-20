import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { useTheme } from "next-themes";

const idiomas = [
  {
    nombre: "Español",
    nivel: 97,
    bandera: "https://flagcdn.com/48x36/es.png",
    banderaAlt: "ES",
    descripcion: "Nativo",
    certificacion: "Lengua Materna"
  },
  {
    nombre: "Inglés",
    nivel: 65,
    bandera: "https://flagcdn.com/48x36/gb.png",
    banderaAlt: "GB",
    descripcion: "Intermedio",
    certificacion: "B1 Colombo Americano"
  },
];

const getPalette = (level) => {
  if (level >= 80) return { gradient: 'from-green-500 to-green-700', glow: 'green-500/30', text: 'green-500' };
  if (level >= 50) return { gradient: 'from-blue-500 to-blue-700', glow: 'blue-500/30', text: 'blue-500' };
  return { gradient: 'from-yellow-500 to-yellow-700', glow: 'yellow-500/30', text: 'yellow-500' };
};

const LanguageFlag = memo(({ idioma, palette, isDark, isHovered }) => {
  const [error, setError] = useState(false);

  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      <div 
        className={`absolute inset-0 rounded-full bg-${palette.glow} transition-all duration-300 ${isHovered ? 'scale-110 opacity-60' : 'scale-100 opacity-40'}`}
        style={{ filter: 'blur(8px)' }}
      />
      <div className={`relative w-full h-full rounded-xl overflow-hidden border-2 border-${palette.glow} ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        {!error ? (
          <img
            src={idioma.bandera}
            alt={idioma.nombre}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setError(true)}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${palette.gradient} text-white font-bold text-xl`}>
            {idioma.banderaAlt}
          </div>
        )}
      </div>
    </div>
  );
});
LanguageFlag.displayName = "LanguageFlag";

const LanguageCard = memo(({ idioma, index }) => {
  const { resolvedTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const palette = useMemo(() => getPalette(idioma.nivel), [idioma.nivel]);
  const isDark = useMemo(() => resolvedTheme === 'dark', [resolvedTheme]);

  // Partículas estáticas (solo CSS, sin JS)
  const particles = useMemo(() => {
    const count = 6; // Reducido a 6 partículas
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${15 + (i * 15)}%`,
      top: `${20 + (i * 12)}%`,
      size: Math.random() * 3 + 2,
      delay: i * 0.3
    }));
  }, []);

  const stats = useMemo(() => [
    { label: 'Conversación', value: Math.floor(idioma.nivel * 0.9) },
    { label: 'Escritura', value: Math.floor(idioma.nivel * 1) },
    { label: 'Comprensión', value: Math.min(100, Math.floor(idioma.nivel * 1.1)) }
  ], [idioma.nivel]);

  if (!mounted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse h-48" />
    );
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full max-w-2xl mx-auto cursor-pointer"
    >
      {/* Card */}
      <div
        className={`relative p-6 rounded-2xl border transition-all duration-300 overflow-hidden ${
          isDark ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'
        } ${isHovered ? 'shadow-2xl scale-[1.02]' : 'shadow-lg'}`}
      >
        {/* Partículas flotantes con CSS puro */}
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: isDark 
                ? `rgba(34, 197, 94, ${0.3 + (p.id * 0.1)})` 
                : `rgba(5, 150, 105, ${0.2 + (p.id * 0.08)})`,
              boxShadow: `0 0 ${p.size * 2}px ${isDark ? 'rgba(34, 197, 94, 0.4)' : 'rgba(5, 150, 105, 0.3)'}`,
              animation: `float ${3 + p.delay}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              opacity: isHovered ? 0.8 : 0.4
            }}
          />
        ))}

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <LanguageFlag
              idioma={idioma}
              palette={palette}
              isDark={isDark}
              isHovered={isHovered}
            />

            <div className="space-y-1">
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {idioma.nombre}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {idioma.descripcion}
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  isDark 
                    ? `bg-${palette.glow} text-${palette.text}` 
                    : `bg-${palette.text}/10 text-${palette.text}`
                }`}
              >
                {idioma.certificacion}
              </span>
            </div>
          </div>

          {/* Level */}
          <div className="text-right">
            <div className={`text-4xl font-bold bg-gradient-to-br ${palette.gradient} bg-clip-text text-transparent`}>
              {idioma.nivel}%
            </div>
            <div className={`text-xs uppercase ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              Dominio
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className={`relative w-full h-3 rounded-full overflow-hidden ${
            isDark ? 'bg-gray-800' : 'bg-gray-200'
          }`}>
            <div 
              className={`h-full bg-gradient-to-r ${palette.gradient} transition-all duration-1000 ease-out relative`}
              style={{ width: `${idioma.nivel}%` }}
            >
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                style={{
                  transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                  transition: 'transform 1s ease'
                }}
              />
            </div>
            
            {/* Progress knob */}
            <div 
              className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-br ${palette.gradient} border-2 ${
                isDark ? 'border-gray-900' : 'border-white'
              } transition-all duration-300 shadow-lg`}
              style={{
                left: `calc(${idioma.nivel}% - 10px)`,
                transform: `translateY(-50%) scale(${isHovered ? 1.2 : 1})`
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center p-3 rounded-lg transition-all duration-300 ${
                isDark ? 'bg-gray-800/50' : 'bg-gray-100/50'
              }`}
              style={{
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                transitionDelay: `${i * 50}ms`
              }}
            >
              <div className={`text-lg font-bold text-${palette.text}`}>
                {stat.value}%
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
LanguageCard.displayName = "LanguageCard";

const LanguageProgress = () => {
  return (
    <section className="py-5 w-full bg-transparent">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-6">
          {idiomas.map((idioma, i) => (
            <div
              key={idioma.nombre}
              style={{
                animation: `fadeInUp 500ms ease-out ${i * 100}ms backwards`
              }}
            >
              <LanguageCard idioma={idioma} index={i} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-15px) translateX(5px);
          }
          66% {
            transform: translateY(-8px) translateX(-5px);
          }
        }
      `}</style>
    </section>
  );
};

export default LanguageProgress;