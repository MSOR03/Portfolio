import { useState, useEffect, useRef } from 'react';
import { useTheme } from "next-themes";

const idiomas = [
  {
    nombre: "Español",
    nivel: 97,
    bandera: "https://flagcdn.com/48x36/es.png",
    banderaAlt: "ES",
    descripcion: "Nativo",
    certificacion: "Lengua Materna",
    soundWave: [3, 8, 4, 9, 2, 7, 5, 8, 3, 6]
  },
  {
    nombre: "Inglés",
    nivel: 65,
    bandera: "https://flagcdn.com/48x36/gb.png",
    banderaAlt: "GB",
    descripcion: "Intermedio",
    certificacion: "B1 Colombo Americano YESBOGOTA",
    soundWave: [2, 6, 3, 7, 4, 8, 2, 5, 6, 4]
  },
];

function getPalette(level) {
  if (level >= 80) {
    return {
      start: '#22c55e',
      mid: '#16a34a',
      end: '#15803d',
      glow: 'rgba(34, 197, 94, 0.3)',
      lightGlow: 'rgba(5, 150, 105, 0.4)'
    };
  }
  if (level >= 50) {
    return {
      start: '#60a5fa',
      mid: '#3b82f6',
      end: '#2563eb',
      glow: 'rgba(59, 130, 246, 0.3)',
      lightGlow: 'rgba(37, 99, 235, 0.4)'
    };
  }
  return {
    start: '#facc15',
    mid: '#eab308',
    end: '#ca8a04',
    glow: 'rgba(234, 179, 8, 0.3)',
    lightGlow: 'rgba(202, 138, 4, 0.4)'
  };
}

const LanguageCard = ({ idioma, index, isActive, onHover, onLeave }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [particlePositions, setParticlePositions] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const rafRef = useRef(null);

  const palette = getPalette(idioma.nivel);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Skeleton durante SSR
  if (!mounted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === 'dark';

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
      {/* Spotlight aura */}
      <div
        className="absolute -inset-6 rounded-3xl transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%, ${isDark ? palette.glow : palette.lightGlow} 0%, transparent 60%)`,
          filter: `blur(${isHovered ? 20 : 0}px)`,
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* Card */}
      <div
        className={`
          relative p-8 rounded-2xl border overflow-hidden transition-all duration-500
          ${isDark ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'}
          backdrop-blur-sm
        `}
        style={{
          boxShadow: isHovered
            ? `0 24px 48px ${isDark ? palette.glow : palette.lightGlow}, 0 0 24px ${isDark ? palette.glow : palette.lightGlow}`
            : isDark 
              ? '0 10px 36px rgba(0,0,0,0.35)'
              : '0 10px 36px rgba(0,0,0,0.15)'
        }}
      >
        {/* Partículas flotantes */}
        {particlePositions.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: isDark ? palette.glow.replace('0.3', '0.65') : palette.lightGlow.replace('0.4', '0.6'),
              opacity: p.opacity * (isHovered ? 1 : 0.35),
              filter: 'blur(0.5px)',
              boxShadow: `0 0 ${p.size * 3}px ${isDark ? palette.glow : palette.lightGlow}`
            }}
          />
        ))}

        {/* Header */}
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex items-center gap-6">
            {/* Flag con ring */}
            <div className="relative w-[68px] h-[68px] flex items-center justify-center">
              <div 
                className="absolute inset-0 rounded-full pointer-events-none" 
                style={{
                  border: `2px solid ${isDark ? palette.glow.replace('0.3','0.5') : palette.lightGlow}`,
                  boxShadow: `0 0 16px ${isDark ? palette.glow : palette.lightGlow}`,
                  transform: `scale(${isHovered ? 1.15 : 1})`,
                  transition: 'transform 400ms ease, opacity 400ms ease',
                  opacity: isHovered ? 0.9 : 0.6,
                  animation: isHovered ? 'rotateSlow 6s linear infinite' : 'none'
                }}
              />

              {/* Shimmer placeholder */}
              {!imageLoaded && !imageError && (
                <div 
                  className="absolute w-[52px] h-[40px] rounded-lg overflow-hidden"
                  style={{
                    border: `2px solid ${isDark ? palette.glow : palette.lightGlow}`,
                    boxShadow: `0 0 12px ${isDark ? palette.glow : palette.lightGlow}`
                  }}
                >
                  <div className={`absolute inset-0 ${isDark ? 'shimmer-dark' : 'shimmer-light'}`}/>
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
                      border: `2px solid ${isDark ? palette.glow : palette.lightGlow}`,
                      boxShadow: `0 0 14px ${isDark ? palette.glow : palette.lightGlow}, 0 6px 20px rgba(0,0,0,0.35)`,
                      transform: `scale(${isHovered ? 1.06 : 1}) rotateY(${mousePosition.x * 0.08}deg) rotateX(${mousePosition.y * 0.08}deg)`
                    }}
                    decoding="async"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                  {/* Shine effect */}
                  <div 
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transition: 'opacity 300ms ease'
                    }}
                  >
                    <div 
                      className="absolute -inset-y-4 -left-10 w-8 rotate-12 bg-white/40 blur-[2px]"
                      style={{
                        animation: isHovered ? 'sweep 1.2s ease forwards' : 'none'
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className="flex items-center justify-center rounded-lg text-white font-bold text-lg w-[52px] h-[40px]"
                  style={{
                    background: `linear-gradient(135deg, ${palette.start}, ${palette.end})`,
                    border: `2px solid ${isDark ? palette.glow : palette.lightGlow}`,
                    boxShadow: `0 0 14px ${isDark ? palette.glow : palette.lightGlow}`
                  }}
                >
                  {idioma.banderaAlt}
                </div>
              )}
            </div>

            {/* Language info */}
            <div className="space-y-2">
              <h3 
                className={`text-2xl font-bold tracking-wide ${isDark ? 'text-white' : 'text-gray-900'}`}
                style={{
                  textShadow: `0 0 ${isHovered ? 18 : 10}px ${isDark ? palette.glow : palette.lightGlow}`
                }}
              >
                {idioma.nombre}
              </h3>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {idioma.descripcion}
              </p>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{
                  background: isDark ? palette.glow.replace('0.3', '0.25') : palette.lightGlow.replace('0.4', '0.3'),
                  border: `1px solid ${isDark ? palette.glow : palette.lightGlow}`,
                  boxShadow: `0 0 ${isHovered ? 14 : 8}px ${isDark ? palette.glow : palette.lightGlow}`
                }}
              >
                {idioma.certificacion}
              </span>
            </div>
          </div>

          {/* Level meter */}
          <div className="text-right">
            <div 
              className="text-4xl font-bold mb-1 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${palette.start}, ${palette.end})`,
                textShadow: `0 0 ${isHovered ? 16 : 10}px ${isDark ? palette.glow : palette.lightGlow}`
              }}
            >
              {idioma.nivel}%
            </div>
            <div className={`text-xs uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Competencia
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative mb-6">
          <div className={`relative w-full h-4 rounded-full overflow-hidden backdrop-blur-sm border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-200/50 border-gray-300/30'}`}>
            {/* Main progress bar */}
            <div 
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
              style={{
                width: `${idioma.nivel}%`,
                background: `linear-gradient(90deg, ${palette.start}, ${palette.mid}, ${palette.end})`,
                boxShadow: `0 0 20px ${isDark ? palette.glow : palette.lightGlow}, inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.25)`
              }}
            >
              {/* Moving shine effect */}
              <div 
                className="absolute inset-0 -skew-x-12"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
                  transform: `translateX(${isHovered ? '200%' : '-100%'})`,
                  transition: 'transform 1200ms ease'
                }}
              />

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
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 backdrop-blur-sm" 
              style={{
                left: `calc(${idioma.nivel}% - 12px)`,
                backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)',
                borderColor: isDark ? palette.glow.replace('0.3','0.85') : palette.lightGlow.replace('0.4','0.85'),
                boxShadow: `0 0 16px ${isDark ? palette.glow : palette.lightGlow}`,
                transform: `translateY(-50%) scale(${isHovered ? 1.12 : 1})`,
                transition: 'transform 300ms ease'
              }}
            >
              <div 
                className="absolute inset-1 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${palette.start}, ${palette.end})`,
                  boxShadow: `inset 0 0 10px ${isDark ? palette.glow : palette.lightGlow}`
                }}
              />
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
              className={`text-center p-3 rounded-lg transition-all duration-300 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              } border backdrop-blur-sm`}
              style={{
                transform: `translateY(${isHovered ? -4 : 0}px)`,
                transitionDelay: `${i * 60}ms`
              }}
            >
              <div 
                className="text-lg font-bold mb-1"
                style={{
                  color: palette.end,
                  textShadow: `0 0 10px ${isDark ? palette.glow : palette.lightGlow}`
                }}
              >
                {Math.min(100, stat.value)}%
              </div>
              <div className={`text-xs uppercase tracking-wide ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse { 
          0%, 100% { transform: scaleY(1); } 
          50% { transform: scaleY(1.3); } 
        }
        @keyframes rotateSlow { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        @keyframes sweep { 
          0% { transform: translateX(-100%); opacity: 0; } 
          30% { opacity: 1; } 
          100% { transform: translateX(220%); opacity: 0; } 
        }
        .shimmer-dark { 
          background: linear-gradient(90deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.07) 100%);
          animation: shimmerMove 1.2s ease-in-out infinite; 
        }
        .shimmer-light { 
          background: linear-gradient(90deg, rgba(0,0,0,0.07) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.07) 100%);
          animation: shimmerMove 1.2s ease-in-out infinite; 
        }
        @keyframes shimmerMove { 
          from { transform: translateX(-60%); } 
          to { transform: translateX(60%); } 
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
};

const LanguageProgress = () => {
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
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp { 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>
    </section>
  );
};

export default LanguageProgress;