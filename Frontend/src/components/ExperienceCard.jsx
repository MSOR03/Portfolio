import { useState, useEffect } from 'react';
import { useTheme } from "next-themes";

const ExperienceCard = ({ role, company, date, description, techs = [], logo, achievements = [] }) => {
  const { theme } = useTheme();
  const [flipped, setFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);

  // Colores según el tema
  const isDark = theme === 'dark';
  const colors = {
    // Fondos de cartas
    cardFrontBg: isDark 
      ? 'linear-gradient(145deg, #0a0f0a 0%, #0d1411 30%, #0f1713 60%, #0a0f0a 100%)'
      : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 30%, #f1f5f9 60%, #ffffff 100%)',
    
    cardBackBg: isDark
      ? 'linear-gradient(145deg, #0f1713 0%, #0d1411 30%, #0a0f0a 60%, #0f1713 100%)'
      : 'linear-gradient(145deg, #f1f5f9 0%, #f8fafc 30%, #ffffff 60%, #f1f5f9 100%)',
    
    // Texto
    titleColor: isDark ? '#ffffff' : '#111827',
    companyColor: isDark ? '#bbf7d0' : '#059669',
    dateColor: isDark ? '#bbf7d0' : '#065f46',
    descColor: isDark ? '#d1fae5' : '#374151',
    
    // Componentes glass
    glassBg: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.7)',
    sectionBg: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)',
    
    // Tech tags
    techBg: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.15)',
    techBorder: isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.35)',
    techColor: isDark ? '#bbf7d0' : '#065f46'
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMousePosition({ x, y });
    
    const distance = Math.sqrt(x * x + y * y);
    setGlowIntensity(Math.max(0, 20 - distance) / 20);
  };

  return (
    <div
      onMouseEnter={() => { setFlipped(true); setIsHovered(true); }}
      onMouseLeave={() => { setFlipped(false); setIsHovered(false); setMousePosition({ x: 0, y: 0 }); setGlowIntensity(0); }}
      onMouseMove={handleMouseMove}
      className="group w-full max-w-xs sm:w-[320px] h-[520px] mx-auto cursor-pointer relative"
      style={{ perspective: '1200px' }}
    >
      {/* Aura externa */}
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
        {/* Cara Frontal */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border"
          style={{ 
            backfaceVisibility: 'hidden',
            background: `
              ${colors.cardFrontBg},
              radial-gradient(circle at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%, 
                rgba(34, 197, 94, ${isDark ? 0.03 : 0.08}) 0%, transparent 60%)
            `,
            borderColor: `rgba(34, 197, 94, ${0.2 + glowIntensity * 0.3})`,
            boxShadow: `
              0 20px 40px -12px rgba(0, 0, 0, ${isDark ? 0.4 : 0.15}),
              0 0 0 1px rgba(34, 197, 94, ${0.1 + glowIntensity * 0.2}),
              inset 0 1px 0 rgba(255, 255, 255, ${isDark ? 0.05 : 0.3}),
              0 0 ${20 + glowIntensity * 30}px rgba(34, 197, 94, ${glowIntensity * 0.2})
            `
          }}
        >
          {/* Patrón de fondo */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0"
              style={{
                opacity: isDark ? 0.1 : 0.15,
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0L80 40L40 80z' stroke='%2322c55e' stroke-width='0.5' opacity='0.3'/%3E%3Cpath d='M20 60L60 20M20 20L60 60' stroke='%2322c55e' stroke-width='0.3' opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
              {/* Logo */}
              <div className="relative mb-8">
                <div 
                  className="relative w-24 h-24 rounded-xl overflow-hidden transition-all duration-500"
                  style={{
                    background: colors.glassBg,
                    backdropFilter: 'blur(15px)',
                    border: `1px solid rgba(34, 197, 94, ${0.2 + glowIntensity * 0.3})`,
                    boxShadow: `
                      0 8px 32px rgba(0, 0, 0, 0.3),
                      0 0 ${10 + glowIntensity * 20}px rgba(34, 197, 94, ${glowIntensity * 0.4})
                    `,
                    transform: `scale(${1 + glowIntensity * 0.05})`
                  }}
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt={company}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8), rgba(21, 128, 61, 0.6))'
                      }}
                    >
                      <span className="text-white font-bold text-xl">
                        {company?.charAt(0) || 'C'}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Anillo giratorio */}
                <div 
                  className="absolute inset-0 rounded-xl border border-green-500/30 transition-all duration-500 pointer-events-none"
                  style={{ 
                    transform: `scale(1.08) rotate(${isHovered ? 180 : 0}deg)`,
                    opacity: 0.6 + glowIntensity * 0.4
                  }}
                />
              </div>

              {/* Información */}
              <div className="text-center space-y-4">
                <div>
                  <h3 
                    className="text-2xl font-bold mb-3 tracking-wide transition-all duration-500"
                    style={{
                      color: colors.titleColor,
                      textShadow: `0 0 ${10 + glowIntensity * 20}px rgba(34, 197, 94, ${glowIntensity * 0.6})`
                    }}
                  >
                    {role}
                  </h3>
                  
                  {/* Línea divisoria */}
                  <div className="relative h-0.5 w-16 mx-auto rounded-full overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500 to-transparent"
                      style={{
                        opacity: 0.6 + glowIntensity * 0.4,
                        boxShadow: `0 0 ${5 + glowIntensity * 10}px rgba(34, 197, 94, 0.5)`
                      }}
                    />
                  </div>
                </div>
                
                <h4 
                  className="text-lg font-semibold"
                  style={{ color: colors.companyColor }}
                >
                  {company}
                </h4>
                
                <div 
                  className="inline-block px-4 py-2 rounded-lg text-sm font-medium"
                  style={{
                    background: colors.glassBg,
                    backdropFilter: 'blur(15px)',
                    border: `1px solid rgba(34, 197, 94, ${0.15 + glowIntensity * 0.2})`,
                    color: colors.dateColor
                  }}
                >
                  {date}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6">
              <div 
                className="text-center p-4 rounded-lg"
                style={{
                  background: colors.sectionBg,
                  backdropFilter: 'blur(15px)',
                  border: `1px solid rgba(34, 197, 94, ${0.1 + glowIntensity * 0.15})`
                }}
              >
                <p className="text-xs font-medium mb-3" style={{ color: colors.companyColor, opacity: 0.8 }}>
                  Hover para detalles completos
                </p>
                <div className="flex justify-center space-x-2">
                  {[0, 0.5, 1].map((delay, i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                      style={{ 
                        animationDelay: `${delay}s`,
                        opacity: 0.4 + glowIntensity * 0.6
                      }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cara Trasera */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden border"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: colors.cardBackBg,
            borderColor: `rgba(34, 197, 94, ${0.25 + glowIntensity * 0.2})`,
            boxShadow: `
              0 20px 40px -12px rgba(0, 0, 0, ${isDark ? 0.5 : 0.2}),
              inset 0 1px 0 rgba(255, 255, 255, ${isDark ? 0.05 : 0.3})
            `
          }}
        >
          <div className="relative z-10 h-full p-5 flex flex-col">
            {/* Header */}
            <div className="text-center mb-5">
              <div 
                className="inline-block p-3 rounded-xl mb-3"
                style={{
                  background: colors.sectionBg,
                  backdropFilter: 'blur(15px)',
                  border: `1px solid rgba(34, 197, 94, ${0.15 + glowIntensity * 0.2})`
                }}
              >
                <h4 className="text-lg font-bold" style={{ color: colors.companyColor }}>
                  Información Detallada
                </h4>
              </div>
            </div>

            {/* Logros */}
            {achievements.length > 0 && (
              <div className="mb-4">
                <div 
                  className="p-4 rounded-xl mb-3"
                  style={{
                    background: `rgba(34, 197, 94, ${isDark ? 0.05 : 0.1})`,
                    border: `1px solid rgba(34, 197, 94, ${isDark ? 0.2 : 0.3})`
                  }}
                >
                  <h5 className="text-sm font-semibold mb-3 flex items-center" style={{ color: colors.companyColor }}>
                    <div className="w-2 h-2 bg-green-400/80 rounded-full mr-2 animate-pulse" />
                    Logros Destacados
                  </h5>
                  <div className="space-y-2">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-400/60 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-xs" style={{ color: colors.descColor }}>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tecnologías */}
            <div className="mb-4">
              <div 
                className="p-4 rounded-xl mb-3"
                style={{
                  background: colors.sectionBg,
                  border: `1px solid rgba(34, 197, 94, ${0.1 + glowIntensity * 0.15})`
                }}
              >
                <h5 className="text-sm font-semibold mb-3 flex items-center" style={{ color: colors.companyColor }}>
                  <div className="w-2 h-2 bg-green-500/60 rounded-full mr-2 animate-pulse" />
                  Stack Tecnológico
                </h5>
                <div className="flex flex-wrap gap-2">
                  {techs.length > 0 ? techs.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs px-3 py-1.5 rounded-md font-medium transition-all duration-300 hover:scale-105"
                      style={{
                        background: colors.techBg,
                        border: `1px solid ${colors.techBorder}`,
                        color: colors.techColor
                      }}
                    >
                      {tech}
                    </span>
                  )) : (
                    <span className="text-sm italic" style={{ color: colors.descColor, opacity: 0.5 }}>
                      Stack por definir
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="flex-1">
              <div 
                className="p-4 rounded-xl h-full"
                style={{
                  background: colors.sectionBg,
                  border: `1px solid rgba(34, 197, 94, ${0.1 + glowIntensity * 0.15})`
                }}
              >
                <h5 className="text-sm font-semibold mb-3 flex items-center" style={{ color: colors.companyColor }}>
                  <div className="w-2 h-2 bg-green-500/60 rounded-full mr-2 animate-pulse" />
                  Descripción del Rol
                </h5>
                <p className="text-sm leading-relaxed" style={{ color: colors.descColor }}>
                  {description || 'Experiencia enfocada en desarrollo de soluciones tecnológicas innovadoras, aplicando mejores prácticas de la industria y colaborando en equipos multidisciplinarios para crear productos digitales de alto impacto y valor agregado.'}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 text-center">
              <div 
                className="inline-block px-4 py-2 rounded-lg text-xs font-medium"
                style={{
                  background: colors.sectionBg,
                  border: `1px solid rgba(34, 197, 94, ${0.1 + glowIntensity * 0.15})`,
                  color: colors.dateColor
                }}
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