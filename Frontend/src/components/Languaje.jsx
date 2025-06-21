import { useState, useEffect } from 'react';

const idiomas = [
  {
    nombre: "Español",
    nivel: 100,
    color: "from-green-400 to-green-600",
    bandera: "🇪🇸",
    descripcion: "Nativo",
    certificacion: "Lengua Materna",
    soundWave: [3, 8, 4, 9, 2, 7, 5, 8, 3, 6]
  },
  {
    nombre: "Inglés",
    nivel: 65,
    color: "from-blue-400 to-blue-600",
    bandera: "🇬🇧",
    descripcion: "Intermedio",
    certificacion: "B1 Certificado",
    soundWave: [2, 6, 3, 7, 4, 8, 2, 5, 6, 4]
  },
  {
    nombre: "Alemán",
    nivel: 25,
    color: "from-yellow-400 to-yellow-600",
    bandera: "🇩🇪",
    descripcion: "Básico",
    certificacion: "A1 En Progreso",
    soundWave: [1, 3, 2, 4, 1, 3, 2, 4, 1, 3]
  },
];

const LanguageCard = ({ idioma, index, isActive, onHover, onLeave }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [particlePositions, setParticlePositions] = useState([]);
  const [progressComplete, setProgressComplete] = useState(false);

  // Generar partículas basadas en el nivel del idioma
  useEffect(() => {
    const particleCount = Math.floor(idioma.nivel / 10);
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

  // Animar partículas
  useEffect(() => {
    if (!isHovered) return;
    
    const interval = setInterval(() => {
      setParticlePositions(prev => 
        prev.map(particle => ({
          ...particle,
          y: (particle.y - particle.speed) % 105,
          x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.2
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isHovered]);

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

  // Determinar color basado en el nivel
  const getGlowColor = () => {
    if (idioma.nivel >= 80) return 'rgba(34, 197, 94, 0.3)';
    if (idioma.nivel >= 50) return 'rgba(59, 130, 246, 0.3)';
    return 'rgba(234, 179, 8, 0.3)';
  };

  const getProgressColor = () => {
    if (idioma.nivel >= 80) return 'from-green-400 via-green-500 to-green-600';
    if (idioma.nivel >= 50) return 'from-blue-400 via-blue-500 to-blue-600';
    return 'from-yellow-400 via-yellow-500 to-yellow-600';
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
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Aura externa */}
      <div 
        className="absolute -inset-6 rounded-3xl transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%, 
            ${getGlowColor()} 0%, 
            transparent 60%)`,
          filter: `blur(${isHovered ? 20 : 0}px)`,
          opacity: isHovered ? 1 : 0
        }}
      />

      <div
        className="relative p-8 rounded-2xl border overflow-hidden transition-all duration-500"
        style={{
          background: `
            linear-gradient(145deg, 
              rgba(15, 23, 19, 0.95) 0%, 
              rgba(13, 20, 17, 0.9) 30%, 
              rgba(10, 15, 10, 0.95) 60%, 
              rgba(15, 23, 19, 0.95) 100%
            ),
            radial-gradient(circle at ${50 + mousePosition.x * 0.3}% ${50 + mousePosition.y * 0.3}%, 
              ${getGlowColor().replace('0.3', '0.05')} 0%, transparent 60%)
          `,
          borderColor: isHovered ? getGlowColor().replace('0.3', '0.4') : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isHovered ? 
            `0 20px 40px ${getGlowColor().replace('0.3', '0.2')}, 
             0 0 20px ${getGlowColor().replace('0.3', '0.3')},
             inset 0 1px 0 rgba(255, 255, 255, 0.1)` :
            '0 8px 32px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(20px)',
          transform: `translateZ(${isHovered ? '10px' : '0px'})`
        }}
      >
        {/* Partículas flotantes */}
        {particlePositions.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: getGlowColor().replace('0.3', '0.6'),
              opacity: particle.opacity * (isHovered ? 1 : 0.3),
              filter: 'blur(0.5px)',
              boxShadow: `0 0 ${particle.size * 3}px ${getGlowColor().replace('0.3', '0.4')}`,
              transition: 'opacity 0.5s ease'
            }}
          />
        ))}

        {/* Patrón de fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.1'%3E%3Cpath d='M20 20h60v60H20z'/%3E%3Cpath d='M30 30h40v40H30z'/%3E%3Cpath d='M40 40h20v20H40z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '80px 80px',
              transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
            }}
          />
        </div>

        {/* Header con bandera y nombre */}
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex items-center gap-6">
            {/* Bandera animada */}
            <div className="relative">
              <div
                className="text-5xl transition-all duration-300 relative"
                style={{
                  transform: `
                    scale(${isHovered ? 1.2 : 1}) 
                    rotateY(${mousePosition.x * 0.1}deg) 
                    rotateX(${mousePosition.y * 0.1}deg)
                  `,
                  filter: `drop-shadow(0 0 ${isHovered ? 15 : 5}px ${getGlowColor().replace('0.3', '0.5')})`
                }}
              >
                {idioma.bandera}
              </div>
              
              {/* Anillo giratorio */}
              <div 
                className="absolute inset-0 rounded-full border-2 transition-all duration-1000 pointer-events-none"
                style={{
                  borderColor: getGlowColor().replace('0.3', '0.4'),
                  transform: `scale(${isHovered ? 1.4 : 1.2}) rotate(${isHovered ? 360 : 0}deg)`,
                  opacity: isHovered ? 0.8 : 0.3
                }}
              />
            </div>

            {/* Información del idioma */}
            <div className="space-y-2">
              <h3 
                className="text-2xl font-bold text-white tracking-wide transition-all duration-300"
                style={{
                  textShadow: `0 0 ${isHovered ? 20 : 10}px ${getGlowColor().replace('0.3', '0.6')}`,
                  transform: `translateX(${mousePosition.x * 0.1}px)`
                }}
              >
                {idioma.nombre}
              </h3>
              <p className="text-gray-300 text-sm font-medium">
                {idioma.descripcion}
              </p>
              <div 
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300"
                style={{
                  background: getGlowColor().replace('0.3', '0.2'),
                  color: 'white',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${getGlowColor().replace('0.3', '0.4')}`,
                  boxShadow: `0 0 ${isHovered ? 15 : 5}px ${getGlowColor().replace('0.3', '0.3')}`
                }}
              >
                {idioma.certificacion}
              </div>
            </div>
          </div>

          {/* Medidor de nivel */}
          <div className="text-right">
            <div 
              className="text-4xl font-bold mb-1 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${getProgressColor().split(' ')[1]} 0%, ${getProgressColor().split(' ')[4]} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: `0 0 ${isHovered ? 20 : 10}px ${getGlowColor().replace('0.3', '0.4')}`,
                transform: `scale(${isHovered ? 1.1 : 1})`
              }}
            >
              {idioma.nivel}%
            </div>
            <div className="text-gray-400 text-xs uppercase tracking-wider">
              Competencia
            </div>
          </div>
        </div>

        {/* Barra de progreso mejorada */}
        <div className="relative mb-6">
          <div className="relative w-full h-4 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
            {/* Fondo con patrón */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '10px 10px'
              }}
            />
            
            {/* Barra de progreso principal */}
            <div
              className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
              style={{
                width: `${idioma.nivel}%`,
                background: `linear-gradient(90deg, ${getProgressColor()})`,
                boxShadow: `
                  0 0 20px ${getGlowColor().replace('0.3', '0.6')},
                  inset 0 1px 0 rgba(255, 255, 255, 0.3),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.2)
                `
              }}
            >
              {/* Efecto de brillo que se mueve */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 transition-transform duration-2000"
                style={{
                  transform: `translateX(${isHovered ? '200%' : '-100%'}) skewX(-12deg)`,
                  width: '50%'
                }}
              />
              
              {/* Ondas de sonido */}
              <div className="absolute inset-0 flex items-center justify-center space-x-1">
                {idioma.soundWave.map((height, i) => (
                  <div
                    key={i}
                    className="bg-white/40 rounded-full transition-all duration-300"
                    style={{
                      width: '2px',
                      height: `${height * 2}px`,
                      animationDelay: `${i * 0.1}s`,
                      transform: `scaleY(${isHovered ? 1.5 : 1})`,
                      animation: isHovered ? 'pulse 1s ease-in-out infinite' : 'none'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Indicador de progreso */}
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white bg-white/20 backdrop-blur-sm transition-all duration-500"
              style={{
                left: `calc(${idioma.nivel}% - 12px)`,
                borderColor: getGlowColor().replace('0.3', '0.8'),
                boxShadow: `0 0 15px ${getGlowColor().replace('0.3', '0.6')}`,
                transform: `translateY(-50%) scale(${isHovered ? 1.2 : 1})`
              }}
            >
              <div 
                className="absolute inset-1 rounded-full transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${getProgressColor()})`,
                  boxShadow: `inset 0 0 10px ${getGlowColor().replace('0.3', '0.4')}`
                }}
              />
            </div>
          </div>
        </div>

        {/* Estadísticas adicionales */}
        <div className="grid grid-cols-3 gap-4 relative z-10">
          {[
            { label: 'Conversación', value: Math.floor(idioma.nivel * 0.9) },
            { label: 'Escritura', value: Math.floor(idioma.nivel * 0.8) },
            { label: 'Comprensión', value: Math.floor(idioma.nivel * 1.1) }
          ].map((stat, i) => (
            <div 
              key={i}
              className="text-center p-3 rounded-lg transition-all duration-300 hover:scale-105 group/stat"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transform: `translateY(${isHovered ? -5 : 0}px)`,
                transitionDelay: `${i * 0.1}s`
              }}
            >
              <div 
                className="text-lg font-bold mb-1 transition-all duration-300"
                style={{
                  color: getGlowColor().replace('0.3', '1'),
                  textShadow: `0 0 10px ${getGlowColor().replace('0.3', '0.5')}`
                }}
              >
                {Math.min(100, stat.value)}%
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LanguageProgress = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <section className="py-20 w-full bg-transparent relative overflow-hidden">
      {/* Fondo con efectos */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2322c55e' stroke-width='1' opacity='0.3'%3E%3Cpath d='M100 0v200M0 100h200'/%3E%3Ccircle cx='100' cy='100' r='80'/%3E%3Ccircle cx='100' cy='100' r='40'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '300px 300px',
            backgroundPosition: 'center'
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
       

        {/* Tarjetas de idiomas */}
        <div className="space-y-8">
          {idiomas.map((idioma, i) => (
            <div
              key={i}
              style={{
                animationDelay: `${i * 0.2}s`,
                opacity: 0,
                transform: 'translateY(50px)',
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <LanguageCard
                idioma={idioma}
                index={i}
                isActive={activeIndex === i}
                onHover={(index) => setActiveIndex(index)}
                onLeave={() => setActiveIndex(-1)}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.3); }
        }
      `}</style>
    </section>
  );
};

export default LanguageProgress;