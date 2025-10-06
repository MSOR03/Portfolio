import { useState, useEffect, useRef } from 'react';
import { useTheme } from "next-themes";

const idiomas = [
  {
    nombre: "Español",
    nivel: 97,
    bandera: "https://flagcdn.com/48x36/es.png",
    banderaAlt: "ES",
    countryCode: "es",
    descripcion: "Nativo",
    certificacion: "Lengua Materna",
    soundWave: [3, 8, 4, 9, 2, 7, 5, 8, 3, 6]
  },
  {
    nombre: "Inglés",
    nivel: 70,
    bandera: "https://flagcdn.com/48x36/gb.png",
    banderaAlt: "GB",
    countryCode: "gb",
    descripcion: "Intermedio",
    certificacion: "B1 Colombo Americano YESBOGOTA",
    soundWave: [2, 6, 3, 7, 4, 8, 2, 5, 6, 4]
  },
  /*{{
    nombre: "Alemán",
    nivel: 5,
    bandera: "https://flagcdn.com/48x36/de.png",
    banderaAlt: "DE",
    countryCode: "de",
    descripcion: "Básico",
    certificacion: "A1 En Progreso",
    soundWave: [1, 3, 2, 4, 1, 3, 2, 4, 1, 3]
  },*/
];

function getPalette(level) {
  if (level >= 80) {
    return {
      start: '#22c55e', // green-500
      mid: '#16a34a',   // green-600
      end: '#15803d',   // green-700
      glow: 'rgba(34, 197, 94, 0.3)'
    };
  }
  if (level >= 50) {
    return {
      start: '#60a5fa', // blue-400
      mid: '#3b82f6',   // blue-500
      end: '#2563eb',   // blue-600
      glow: 'rgba(59, 130, 246, 0.3)'
    };
  }
  return {
    start: '#facc15', // yellow-400
    mid: '#eab308',   // yellow-500
    end: '#ca8a04',   // yellow-600 (amber-600)
    glow: 'rgba(234, 179, 8, 0.3)'
  };
}

// Función para obtener los colores según el tema
function getThemeColors(theme) {
  return {
    cardBg: theme === 'dark' 
      ? 'linear-gradient(160deg, rgba(10,16,12,0.95) 0%, rgba(12,18,14,0.92) 40%, rgba(9,14,10,0.95) 100%)'
      : 'linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.92) 40%, rgba(241,245,249,0.95) 100%)',
    cardBorder: theme === 'dark' 
      ? 'rgba(255,255,255,0.08)' 
      : 'rgba(0,0,0,0.08)',
    cardShadow: theme === 'dark'
      ? '0 10px 36px rgba(0,0,0,0.35)'
      : '0 10px 36px rgba(0,0,0,0.15)',
    titleColor: theme === 'dark' ? 'text-white' : 'text-gray-900',
    descriptionColor: theme === 'dark' ? 'text-gray-300' : 'text-gray-600',
    levelTextColor: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
    progressBg: theme === 'dark' ? 'bg-white/5' : 'bg-gray-200/50',
    progressBorder: theme === 'dark' ? 'border-white/10' : 'border-gray-300/30',
    statBg: theme === 'dark' 
      ? 'rgba(255,255,255,0.04)' 
      : 'rgba(0,0,0,0.04)',
    statBorder: theme === 'dark' 
      ? 'rgba(255,255,255,0.1)' 
      : 'rgba(0,0,0,0.1)',
    noiseColor: theme === 'dark' ? '#ffffff' : '#000000',
    noiseOpacity: theme === 'dark' ? '0.06' : '0.04',
    radialGradient: theme === 'dark'
      ? 'rgba(255,255,255,0.05)'
      : 'rgba(0,0,0,0.03)'
  };
}

const LanguageCard = ({ idioma, index, isActive, onHover, onLeave, theme }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [particlePositions, setParticlePositions] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const rafRef = useRef(null);

  const palette = getPalette(idioma.nivel);
  const themeColors = getThemeColors(theme);

  // Generate particles based on language level
  useEffect(() => {
    const particleCount = Math.max(8, Math.floor(idioma.nivel / 6));
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.3 + 0.1
    }));
    setParticlePositions(particles);
  }, [idioma.nivel]);

  // Animate particles with requestAnimationFrame for smoother motion
  useEffect(() => {
    if (!isHovered) return;
    const animate = () => {
      setParticlePositions(prev =>
        prev.map(p => ({
          ...p,
          y: (p.y - p.speed + 105) % 105,
          x: p.x + Math.sin(Date.now() * 0.001 + p.id) * 0.2
        }))
      );
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHovered]);

  // Pre-check cache so shimmer disappears even for cached images
  useEffect(() => {
    const img = new Image();
    img.src = idioma.bandera;
    if (img.complete) setImageLoaded(true);
  }, [idioma.bandera]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
    onLeave();
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full max-w-2xl mx-auto cursor-pointer"
      style={{
        transform: `translateY(${index * 2}px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 100ms ease-out'
      }}
    >
      {/* External spotlight aura */}
      <div
        className="absolute -inset-6 rounded-3xl transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%, ${palette.glow} 0%, transparent 60%)`,
          filter: `blur(${isHovered ? 20 : 0}px)`,
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* Card */}
      <div
        className="relative p-8 rounded-2xl border overflow-hidden transition-all duration-500"
        style={{
          background: `
            ${themeColors.cardBg},
            radial-gradient(1200px 400px at ${50 + mousePosition.x * 0.3}% ${40 + mousePosition.y * 0.3}%, ${themeColors.radialGradient}, transparent 70%)
          `,
          borderColor: isHovered ? palette.glow.replace('0.3','0.5') : themeColors.cardBorder,
          boxShadow: isHovered
            ? `0 24px 48px ${palette.glow.replace('0.3','0.22')}, 0 0 24px ${palette.glow}`
            : themeColors.cardShadow,
          backdropFilter: 'blur(16px)'
        }}
      >
        {/* Subtle noise/pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{
          opacity: themeColors.noiseOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23${themeColors.noiseColor.replace('#', '')}' stroke-width='1' opacity='0.35'%3E%3Cpath d='M20 20h60v60H20z'/%3E%3Cpath d='M30 30h40v40H30z'/%3E%3Cpath d='M40 40h20v20H40z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}/>

        {/* Floating particles */}
        {particlePositions.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: palette.glow.replace('0.3', '0.65'),
              opacity: p.opacity * (isHovered ? 1 : 0.35),
              filter: 'blur(0.5px)',
              boxShadow: `0 0 ${p.size * 3}px ${palette.glow.replace('0.3','0.45')}`
            }}
          />
        ))}

        {/* Header */}
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex items-center gap-6">
            {/* Flag with ring, shimmer and shine */}
            <div className="relative w-[68px] h-[68px] flex items-center justify-center">
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{
                border: `2px solid ${palette.glow.replace('0.3','0.5')}`,
                boxShadow: `0 0 16px ${palette.glow}`,
                transform: `scale(${isHovered ? 1.15 : 1})`,
                transition: 'transform 400ms ease, opacity 400ms ease',
                opacity: isHovered ? 0.9 : 0.6,
                animation: isHovered ? 'rotateSlow 6s linear infinite' : 'none'
              }}/>

              {/* Shimmer placeholder (shows while loading) */}
              {!imageLoaded && !imageError && (
                <div className="absolute w-[52px] h-[40px] rounded-lg overflow-hidden" style={{
                  border: `2px solid ${palette.glow.replace('0.3','0.6')}`,
                  boxShadow: `0 0 12px ${palette.glow.replace('0.3','0.45')}`
                }}>
                  <div className="absolute inset-0 shimmer"/>
                </div>
              )}

              {/* Flag image */}
              {!imageError ? (
                <div className="relative">
                  <img
                    src={idioma.bandera}
                    alt={`${idioma.nombre} flag`}
                    className="rounded-lg object-cover transition-transform duration-300"
                    style={{
                      width: '52px',
                      height: '40px',
                      border: `2px solid ${palette.glow.replace('0.3','0.6')}`,
                      boxShadow: `0 0 14px ${palette.glow.replace('0.3','0.5')}, 0 6px 20px rgba(0,0,0,0.35)`,
                      transform: `scale(${isHovered ? 1.06 : 1}) rotateY(${mousePosition.x * 0.08}deg) rotateX(${mousePosition.y * 0.08}deg)`
                    }}
                    decoding="async"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                  {/* Shine sweep on hover */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg" style={{
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 300ms ease'
                  }}>
                    <div className="absolute -inset-y-4 -left-10 w-8 rotate-12 bg-white/40 blur-[2px]" style={{
                      animation: isHovered ? 'sweep 1.2s ease forwards' : 'none'
                    }}/>
                  </div>
                </div>
              ) : (
                <div
                  className="flex items-center justify-center rounded-lg text-white font-bold text-lg w-[52px] h-[40px]"
                  style={{
                    background: `linear-gradient(135deg, ${palette.start}, ${palette.end})`,
                    border: `2px solid ${palette.glow.replace('0.3', '0.6')}`,
                    boxShadow: `0 0 14px ${palette.glow.replace('0.3','0.5')}`
                  }}
                >
                  {idioma.banderaAlt}
                </div>
              )}
            </div>

            {/* Language info */}
            <div className="space-y-2">
              <h3 className={`text-2xl font-bold tracking-wide ${themeColors.titleColor}`} style={{
                textShadow: `0 0 ${isHovered ? 18 : 10}px ${palette.glow.replace('0.3','0.8')}`
              }}>
                {idioma.nombre}
              </h3>
              <p className={`text-sm font-medium ${themeColors.descriptionColor}`}>{idioma.descripcion}</p>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{
                  background: palette.glow.replace('0.3', '0.25'),
                  border: `1px solid ${palette.glow.replace('0.3','0.45')}`,
                  boxShadow: `0 0 ${isHovered ? 14 : 8}px ${palette.glow.replace('0.3','0.35')}`
                }}
              >
                {idioma.certificacion}
              </span>
            </div>
          </div>

          {/* Level meter */}
          <div className="text-right">
            <div className="text-4xl font-bold mb-1 bg-clip-text text-transparent" style={{
              backgroundImage: `linear-gradient(135deg, ${palette.start}, ${palette.end})`,
              textShadow: `0 0 ${isHovered ? 16 : 10}px ${palette.glow.replace('0.3','0.45')}`
            }}>
              {idioma.nivel}%
            </div>
            <div className={`text-xs uppercase tracking-wider ${themeColors.levelTextColor}`}>Competencia</div>
          </div>
        </div>

        {/* Enhanced progress bar */}
        <div className="relative mb-6">
          <div className={`relative w-full h-4 ${themeColors.progressBg} rounded-full overflow-hidden backdrop-blur-sm border ${themeColors.progressBorder}`}>
            {/* Background dots */}
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${themeColors.noiseColor.replace('#', '')}' opacity='0.12'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '10px 10px'
            }}/>

            {/* Main progress bar */}
            <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden" style={{
              width: `${idioma.nivel}%`,
              background: `linear-gradient(90deg, ${palette.start}, ${palette.mid}, ${palette.end})`,
              boxShadow: `0 0 20px ${palette.glow.replace('0.3','0.65')}, inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.25)`
            }}>
              {/* Moving shine effect */}
              <div className="absolute inset-0 -skew-x-12" style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
                transform: `translateX(${isHovered ? '200%' : '-100%'})`,
                transition: 'transform 1200ms ease'
              }}/>

              {/* Sound waves */}
              <div className="absolute inset-0 flex items-center justify-center space-x-1">
                {idioma.soundWave.map((h, i) => (
                  <div
                    key={i}
                    className="bg-white/50 rounded-full"
                    style={{
                      width: '2px',
                      height: `${h * 2}px`,
                      transform: `translateY(${isHovered ? -1 : 0}px) scaleY(${isHovered ? 1.5 : 1})`,
                      transition: 'transform 300ms ease',
                      animation: isHovered ? `pulse 1000ms ease-in-out ${i * 80}ms infinite` : 'none'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Progress indicator knob */}
            <div className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 backdrop-blur-sm" style={{
              left: `calc(${idioma.nivel}% - 12px)`,
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)',
              borderColor: palette.glow.replace('0.3','0.85'),
              boxShadow: `0 0 16px ${palette.glow.replace('0.3','0.6')}`,
              transform: `translateY(-50%) scale(${isHovered ? 1.12 : 1})`,
              transition: 'transform 300ms ease'
            }}>
              <div className="absolute inset-1 rounded-full" style={{
                background: `linear-gradient(135deg, ${palette.start}, ${palette.end})`,
                boxShadow: `inset 0 0 10px ${palette.glow.replace('0.3','0.45')}`
              }}/>
            </div>
          </div>
        </div>

        {/* Additional stats */}
        <div className="grid grid-cols-3 gap-4 relative z-10">
          {[
            { label: 'Conversación', value: Math.floor(idioma.nivel * 0.9) },
            { label: 'Escritura', value: Math.floor(idioma.nivel * 1) },
            { label: 'Comprensión', value: Math.floor(idioma.nivel * 1.1) }
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-3 rounded-lg transition-all duration-300"
              style={{
                background: themeColors.statBg,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${themeColors.statBorder}`,
                transform: `translateY(${isHovered ? -4 : 0}px)`,
                transitionDelay: `${i * 60}ms`
              }}
            >
              <div className="text-lg font-bold mb-1" style={{
                color: palette.end,
                textShadow: `0 0 10px ${palette.glow.replace('0.3','0.55')}`
              }}>
                {Math.min(100, stat.value)}%
              </div>
              <div className={`text-xs uppercase tracking-wide ${themeColors.levelTextColor}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.3); } }
        @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes sweep { 0% { transform: translateX(-100%); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateX(220%); opacity: 0; } }
        .shimmer { 
          background: ${theme === 'dark' 
            ? 'linear-gradient(90deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.07) 100%)'
            : 'linear-gradient(90deg, rgba(0,0,0,0.07) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.07) 100%)'
          }; 
          animation: shimmerMove 1.2s ease-in-out infinite; 
        }
        @keyframes shimmerMove { from { transform: translateX(-60%); } to { transform: translateX(60%); } }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
};

const LanguageProgress = () => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <section className="py-5 w-full bg-transparent relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="space-y-8">
          {idiomas.map((idioma, i) => (
            <div
              key={`language-${i}-${idioma.nombre}`}
              style={{
                animationDelay: `${i * 120}ms`,
                opacity: 0,
                transform: 'translateY(40px)',
                animation: 'fadeInUp 600ms ease-out forwards'
              }}
            >
              <LanguageCard
                idioma={idioma}
                index={i}
                isActive={activeIndex === i}
                onHover={(idx) => setActiveIndex(idx)}
                onLeave={() => setActiveIndex(-1)}
                theme={theme}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
};

export default LanguageProgress;