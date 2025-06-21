import { useState, useEffect } from 'react';

const ExperienceCard = ({ role, company, date, description, techs = [], logo, achievements = [] }) => {
  const [flipped, setFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [particlePositions, setParticlePositions] = useState([]);

  // Generar partículas flotantes
  useEffect(() => {
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.6 + 0.2
    }));
    setParticlePositions(particles);
  }, []);

  // Animación de partículas
  useEffect(() => {
    const interval = setInterval(() => {
      setParticlePositions(prev => 
        prev.map(particle => ({
          ...particle,
          y: (particle.y + particle.speed) % 105,
          x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.1
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMousePosition({ x, y });
    
    // Calcular intensidad del glow basado en la distancia al centro
    const distance = Math.sqrt(x * x + y * y);
    setGlowIntensity(Math.max(0, 20 - distance) / 20);
  };

  const handleMouseEnter = () => {
    setFlipped(true);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setFlipped(false);
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
    setGlowIntensity(0);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="group w-full max-w-xs sm:w-[320px] h-[520px] mx-auto cursor-pointer relative"
      style={{ perspective: '1200px' }}
    >
      {/* Aura externa que responde al mouse */}
      <div 
        className="absolute -inset-4 rounded-3xl transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, 
            rgba(34, 197, 94, ${glowIntensity * 0.15}) 0%, 
            rgba(34, 197, 94, ${glowIntensity * 0.05}) 40%, 
            transparent 70%)`,
          filter: `blur(${glowIntensity * 20}px)`,
          opacity: isHovered ? 1 : 0
        }}
      />

      <div
        className="relative w-full h-full transition-all duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${flipped ? 180 : 0}deg) rotateX(${mousePosition.y * 0.08}deg) rotateZ(${mousePosition.x * 0.03}deg)`,
        }}
      >
        {/* Cara Frontal Mejorada */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border"
          style={{ 
            backfaceVisibility: 'hidden',
            background: `
              linear-gradient(145deg, #0a0f0a 0%, #0d1411 30%, #0f1713 60%, #0a0f0a 100%),
              radial-gradient(circle at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%, 
                rgba(34, 197, 94, 0.03) 0%, transparent 60%)
            `,
            borderColor: `rgba(34, 197, 94, ${0.2 + glowIntensity * 0.3})`,
            boxShadow: `
              0 20px 40px -12px rgba(0, 0, 0, 0.4),
              0 0 0 1px rgba(34, 197, 94, ${0.1 + glowIntensity * 0.2}),
              inset 0 1px 0 rgba(255, 255, 255, 0.05),
              0 0 ${20 + glowIntensity * 30}px rgba(34, 197, 94, ${glowIntensity * 0.2})
            `
          }}
        >
          {/* Partículas flotantes */}
          {particlePositions.map(particle => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-green-400/30 pointer-events-none"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity * (isHovered ? 1 : 0.3),
                filter: 'blur(0.5px)',
                boxShadow: `0 0 ${particle.size * 2}px rgba(34, 197, 94, 0.3)`,
                transition: 'opacity 0.5s ease'
              }}
            />
          ))}

          {/* Patron de fondo mejorado */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cpath d='M0 40L40 0L80 40L40 80z' stroke='%2322c55e' stroke-width='0.5' opacity='0.3'/%3E%3Cpath d='M20 60L60 20M20 20L60 60' stroke='%2322c55e' stroke-width='0.3' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px',
                transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
              }}
            />
            
            {/* Efectos de luz dinámicos */}
            <div 
              className="absolute w-40 h-40 rounded-full blur-3xl transition-all duration-1000"
              style={{
                background: `radial-gradient(circle, rgba(34, 197, 94, ${0.1 + glowIntensity * 0.15}) 0%, transparent 70%)`,
                transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
                top: '5%',
                left: '10%'
              }}
            />
            <div 
              className="absolute w-32 h-32 rounded-full blur-2xl transition-all duration-700"
              style={{
                background: `radial-gradient(circle, rgba(34, 197, 94, ${0.08 + glowIntensity * 0.1}) 0%, transparent 70%)`,
                transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
                bottom: '15%',
                right: '15%'
              }}
            />
          </div>

          {/* Contenido principal mejorado */}
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
              {/* Logo con efectos mejorados */}
              <div className="relative mb-8">
                <div 
                  className="relative w-24 h-24 rounded-xl overflow-hidden transition-all duration-500"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))',
                    backdropFilter: 'blur(15px)',
                    border: `1px solid rgba(34, 197, 94, ${0.2 + glowIntensity * 0.3})`,
                    boxShadow: `
                      0 8px 32px rgba(0, 0, 0, 0.3),
                      0 0 ${10 + glowIntensity * 20}px rgba(34, 197, 94, ${glowIntensity * 0.4}),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1)
                    `,
                    transform: `scale(${1 + glowIntensity * 0.05}) rotateY(${mousePosition.x * 0.1}deg)`
                  }}
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt={company}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-500/80 to-green-700/60 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transform rotate-45 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                      <span className="text-white font-bold text-xl relative z-10">
                        {company?.charAt(0) || 'C'}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Múltiples anillos giratorios */}
                <div 
                  className="absolute inset-0 rounded-xl border border-green-500/30 transition-all duration-500 pointer-events-none"
                  style={{ 
                    transform: `scale(${1.08 + glowIntensity * 0.1}) rotate(${isHovered ? 180 : 0}deg)`,
                    opacity: 0.6 + glowIntensity * 0.4
                  }}
                />
                <div 
                  className="absolute inset-0 rounded-xl border border-green-400/20 transition-all duration-700 pointer-events-none"
                  style={{ 
                    transform: `scale(${1.15 + glowIntensity * 0.1}) rotate(${isHovered ? -90 : 0}deg)`,
                    opacity: 0.4 + glowIntensity * 0.3
                  }}
                />
              </div>

              {/* Información con efectos de texto mejorados */}
              <div className="text-center space-y-4">
                <div>
                  <h3 
                    className="text-2xl font-bold text-white mb-3 tracking-wide transition-all duration-500"
                    style={{
                      textShadow: `
                        0 2px 10px rgba(0, 0, 0, 0.5),
                        0 0 ${10 + glowIntensity * 20}px rgba(34, 197, 94, ${glowIntensity * 0.6})
                      `,
                      transform: `translateY(${mousePosition.y * 0.3}px) scale(${1 + glowIntensity * 0.02})`
                    }}
                  >
                    {role}
                  </h3>
                  {/* Línea divisoria animada */}
                  <div className="relative h-0.5 w-16 mx-auto rounded-full overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500 to-transparent"
                      style={{
                        opacity: 0.6 + glowIntensity * 0.4,
                        boxShadow: `0 0 ${5 + glowIntensity * 10}px rgba(34, 197, 94, 0.5)`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>
                </div>
                
                <h4 
                  className="text-lg font-semibold transition-all duration-300"
                  style={{
                    color: `rgba(187, 247, 208, ${0.9 + glowIntensity * 0.1})`,
                    textShadow: `0 0 ${5 + glowIntensity * 15}px rgba(34, 197, 94, ${glowIntensity * 0.4})`
                  }}
                >
                  {company}
                </h4>
                
                <div 
                  className="inline-block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  style={{
                    background: `rgba(255,255,255,${0.05 + glowIntensity * 0.03})`,
                    backdropFilter: 'blur(15px)',
                    border: `1px solid rgba(34, 197, 94, ${0.15 + glowIntensity * 0.2})`,
                    color: `rgba(187, 247, 208, ${0.8 + glowIntensity * 0.2})`,
                    boxShadow: `0 0 ${10 + glowIntensity * 20}px rgba(34, 197, 94, ${glowIntensity * 0.2})`
                  }}
                >
                  {date}
                </div>
              </div>
            </div>

            {/* Footer mejorado */}
            <div className="p-6">
              <div 
                className="text-center p-4 rounded-lg transition-all duration-300 relative overflow-hidden group/footer"
                style={{
                  background: `rgba(255,255,255,${0.03 + glowIntensity * 0.02})`,
                  backdropFilter: 'blur(15px)',
                  border: `1px solid rgba(34, 197, 94, ${0.1 + glowIntensity * 0.15})`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent transform translate-x-[-100%] group-hover/footer:translate-x-[100%] transition-transform duration-1000" />
                <p className="text-green-200/60 text-xs font-medium mb-3 relative z-10">
                  Hover para detalles completos
                </p>
                <div className="flex justify-center space-x-2 relative z-10">
                  {[0, 0.5, 1].map((delay, i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                      style={{ 
                        animationDelay: `${delay}s`,
                        opacity: 0.4 + glowIntensity * 0.6,
                        boxShadow: `0 0 ${5 + glowIntensity * 10}px rgba(34, 197, 94, 0.5)`
                      }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cara Trasera Mejorada */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `
              linear-gradient(145deg, #0f1713 0%, #0d1411 30%, #0a0f0a 60%, #0f1713 100%),
              radial-gradient(circle at ${50 - mousePosition.x * 0.5}% ${50 - mousePosition.y * 0.5}%, 
                rgba(34, 197, 94, 0.04) 0%, transparent 60%)
            `,
            borderColor: `rgba(34, 197, 94, ${0.25 + glowIntensity * 0.2})`,
            boxShadow: `
              0 20px 40px -12px rgba(0, 0, 0, 0.5),
              0 0 0 1px rgba(34, 197, 94, ${0.12 + glowIntensity * 0.18}),
              inset 0 1px 0 rgba(255, 255, 255, 0.05),
              0 0 ${15 + glowIntensity * 25}px rgba(34, 197, 94, ${glowIntensity * 0.15})
            `
          }}
        >
          {/* Efectos de fondo mejorados */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 opacity-12"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none"%3E%3Cpath d='M30 0L60 30L30 60L0 30z' stroke='%2322c55e' stroke-width='0.8' opacity='0.4'/%3E%3Ccircle cx='30' cy='30' r='15' stroke='%2322c55e' stroke-width='0.5' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px',
                transform: `translate(${-mousePosition.x * 0.05}px, ${-mousePosition.y * 0.05}px)`
              }}
            />
            
            <div 
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-all duration-1000"
              style={{
                background: `radial-gradient(circle, rgba(34, 197, 94, ${0.08 + glowIntensity * 0.1}) 0%, transparent 70%)`,
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
              }}
            />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-600/10 rounded-full blur-xl animate-pulse" style={{ animationDuration: '4s' }} />
          </div>

          <div className="relative z-10 h-full p-5 flex flex-col">
            {/* Header con indicador de flip */}
            <div className="text-center mb-5">
              <div 
                className="inline-block p-3 rounded-xl mb-3 relative overflow-hidden group/header"
                style={{
                  background: `rgba(255,255,255,${0.04 + glowIntensity * 0.02})`,
                  backdropFilter: 'blur(15px)',
                  border: `1px solid rgba(34, 197, 94, ${0.15 + glowIntensity * 0.2})`,
                  boxShadow: `0 0 ${10 + glowIntensity * 15}px rgba(34, 197, 94, ${glowIntensity * 0.2})`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent transform translate-x-[-100%] group-hover/header:translate-x-[100%] transition-transform duration-1000" />
                <h4 className="text-green-300/90 text-lg font-bold relative z-10">
                  Información Detallada
                </h4>
              </div>
            </div>

            {/* Logros si existen */}
            {achievements.length > 0 && (
              <div className="mb-4">
                <div 
                  className="p-4 rounded-xl mb-3 relative overflow-hidden group/achievements"
                  style={{
                    background: `rgba(34, 197, 94, ${0.05 + glowIntensity * 0.03})`,
                    backdropFilter: 'blur(15px)',
                    border: `1px solid rgba(34, 197, 94, ${0.2 + glowIntensity * 0.2})`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent transform translate-x-[-100%] group-hover/achievements:translate-x-[100%] transition-transform duration-1000" />
                  <h5 className="text-green-300/90 text-sm font-semibold mb-3 flex items-center relative z-10">
                    <div className="w-2 h-2 bg-green-400/80 rounded-full mr-2 animate-pulse" />
                    Logros Destacados
                  </h5>
                  <div className="space-y-2 relative z-10">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-400/60 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-green-100/80 text-xs">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tecnologías mejoradas */}
            <div className="mb-4">
              <div 
                className="p-4 rounded-xl mb-3 relative overflow-hidden group/tech"
                style={{
                  background: `rgba(255,255,255,${0.03 + glowIntensity * 0.02})`,
                  backdropFilter: 'blur(15px)',
                  border: `1px solid rgba(34, 197, 94, ${0.1 + glowIntensity * 0.15})`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent transform translate-x-[-100%] group-hover/tech:translate-x-[100%] transition-transform duration-1000" />
                <h5 className="text-green-300/80 text-sm font-semibold mb-3 flex items-center relative z-10">
                  <div 
                    className="w-2 h-2 bg-green-500/60 rounded-full mr-2 animate-pulse"
                    style={{ animationDuration: '2s' }}
                  />
                  Stack Tecnológico
                </h5>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {techs.length > 0 ? techs.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1.5 rounded-md font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden group/tag"
                      style={{
                        background: `rgba(34, 197, 94, ${0.1 + glowIntensity * 0.05})`,
                        backdropFilter: 'blur(10px)',
                        border: `1px solid rgba(34, 197, 94, ${0.2 + glowIntensity * 0.15})`,
                        color: '#bbf7d0',
                        boxShadow: `0 0 ${5 + glowIntensity * 10}px rgba(34, 197, 94, ${glowIntensity * 0.3})`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-[-100%] group-hover/tag:translate-x-[100%] transition-transform duration-500" />
                      <span className="relative z-10">{tech}</span>
                    </span>
                  )) : (
                    <span className="text-green-200/50 text-sm italic">
                      Stack por definir
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Descripción mejorada */}
            <div className="flex-1">
              <div 
                className="p-4 rounded-xl h-full relative overflow-hidden group/desc"
                style={{
                  background: `rgba(255,255,255,${0.03 + glowIntensity * 0.02})`,
                  backdropFilter: 'blur(15px)',
                  border: `1px solid rgba(34, 197, 94, ${0.1 + glowIntensity * 0.15})`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-500/3 to-transparent transform translate-x-[-100%] translate-y-[-100%] group-hover/desc:translate-x-[100%] group-hover/desc:translate-y-[100%] transition-transform duration-1500" />
                <h5 className="text-green-300/80 text-sm font-semibold mb-3 flex items-center relative z-10">
                  <div 
                    className="w-2 h-2 bg-green-500/60 rounded-full mr-2 animate-pulse"
                    style={{ animationDelay: '1s', animationDuration: '3s' }}
                  />
                  Descripción del Rol
                </h5>
                <p className="text-green-100/70 text-sm leading-relaxed relative z-10">
                  {description || 'Experiencia enfocada en desarrollo de soluciones tecnológicas innovadoras, aplicando mejores prácticas de la industria y colaborando en equipos multidisciplinarios para crear productos digitales de alto impacto y valor agregado.'}
                </p>
              </div>
            </div>

            {/* Footer mejorado */}
            <div className="mt-4 text-center">
              <div 
                className="inline-block px-4 py-2 rounded-lg text-xs font-medium relative overflow-hidden group/footer-back"
                style={{
                  background: `rgba(255,255,255,${0.04 + glowIntensity * 0.02})`,
                  backdropFilter: 'blur(15px)',
                  border: `1px solid rgba(34, 197, 94, ${0.1 + glowIntensity * 0.15})`,
                  color: '#86efac',
                  boxShadow: `0 0 ${8 + glowIntensity * 12}px rgba(34, 197, 94, ${glowIntensity * 0.2})`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent transform translate-x-[-100%] group-hover/footer-back:translate-x-[100%] transition-transform duration-800" />
                <span className="relative z-10">{company} • {date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExperienceCard;