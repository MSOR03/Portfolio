"use client";

import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Hook optimizado para detectar móvil
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    // Throttle resize events para mejor performance
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return { isMobile, mounted };
};

// Halo externo - ultra simplificado
const OuterHalo = memo(({ animate }) => (
  <div 
    className="absolute -inset-2 pointer-events-none"
    style={animate ? {
      animation: 'spin 45s linear infinite',
      willChange: 'transform',
    } : undefined}
  >
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="49"
        stroke="url(#outerGradient)"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <defs>
        <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff99" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#00ff99" stopOpacity="0" />
          <stop offset="100%" stopColor="#00ff99" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  </div>
));
OuterHalo.displayName = "OuterHalo";

// Círculo interno - solo para desktop
const InnerCircle = memo(({ animate }) => (
  <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
    <svg
      className="w-[320px] h-[320px] md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px] xl:w-[520px] xl:h-[520px]"
      fill="transparent"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={animate ? {
        animation: 'spin-slow 25s linear infinite',
        willChange: 'transform',
      } : undefined}
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        stroke="#00ff99"
        strokeWidth="0.8"
        strokeDasharray="20 80"
        strokeLinecap="round"
        style={{ opacity: 0.6 }}
      />
    </svg>
  </div>
));
InnerCircle.displayName = "InnerCircle";

// Puntos decorativos optimizados
const DecorativeDots = memo(({ animate, count }) => {
  // Pre-calcular posiciones (se hace una sola vez)
  const positions = Array.from({ length: count }, (_, i) => {
    const angle = (i * Math.PI * 2) / count;
    return {
      top: `${(50 + 45 * Math.sin(angle)).toFixed(4)}%`,
      left: `${(50 + 45 * Math.cos(angle)).toFixed(4)}%`,
    };
  });

  return (
    <div 
      className="absolute -inset-8 pointer-events-none"
      style={animate ? {
        animation: 'spin-reverse 60s linear infinite',
        willChange: 'transform',
      } : undefined}
    >
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400 rounded-full"
          style={{
            top: pos.top,
            left: pos.left,
            transform: 'translate(-50%, -50%)',
            opacity: 0.4,
            animation: animate ? `pulse-dot 3s ease-in-out infinite ${(i * (3 / count)).toFixed(2)}s` : undefined,
          }}
        />
      ))}
    </div>
  );
});
DecorativeDots.displayName = "DecorativeDots";

const Photo = () => {
  const { isMobile } = useIsMobile();
  
  // Configuración adaptativa según dispositivo
  const config = {
    // Animaciones
    enableFloat: !isMobile,
    enableRotations: !isMobile,
    
    // Elementos visuales
    enableHalo: true, // Siempre visible pero sin rotar en móvil
    enableInnerCircle: !isMobile,
    enableDots: true,
    dotsCount: isMobile ? 4 : 6,
    
    // Calidad de imagen
    imageQuality: isMobile ? 75 : 85,
  };

  // Variantes de animación (solo si está habilitada)
  const imageVariants = config.enableFloat ? {
    animate: {
      y: [0, -8, 0],
      transition: { 
        duration: 6, 
        repeat: Infinity, 
        ease: "easeInOut",
      },
    },
  } : {};

  // Renderizar inmediatamente - la imagen tiene priority y se carga rápido
  // No esperar mounted evita el flash visual
  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <div className="relative">
        {/* Contenedor principal de imagen */}
        <motion.div
          {...(config.enableFloat && { 
            variants: imageVariants,
            animate: "animate" 
          })}
          className="w-[298px] h-[298px] md:w-[340px] md:h-[340px] lg:w-[420px] lg:h-[420px] xl:w-[500px] xl:h-[500px] 
                     mix-blend-lighten relative rounded-2xl overflow-hidden
                     shadow-lg transition-shadow duration-300"
          style={{
            transform: 'translate3d(0, 0, 0)', // GPU acceleration
          }}
        >
          {/* IMAGEN optimizada */}
          <Image
            src="/assets/Photo.avif"
            priority
            quality={config.imageQuality}
            fill
            alt="Profile photo"
            className="object-cover rounded-2xl"
            sizes="(max-width: 768px) 298px, (max-width: 1024px) 340px, (max-width: 1280px) 420px, 500px"
            loading="eager"
            fetchPriority="high"
          />
          
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl pointer-events-none" />
          
          {/* Halo externo - siempre visible */}
          {config.enableHalo && (
            <OuterHalo animate={config.enableRotations} />
          )}
        </motion.div>

        {/* Círculo interno - solo desktop */}
        {config.enableInnerCircle && (
          <InnerCircle animate={config.enableRotations} />
        )}

        {/* Puntos decorativos */}
        {config.enableDots && (
          <DecorativeDots 
            animate={config.enableRotations} 
            count={config.dotsCount} 
          />
        )}
      </div>

      {/* Estilos CSS - optimizados con will-change condicional */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-slow {
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          to { transform: rotate(-360deg); }
        }
        
        @keyframes pulse-dot {
          0%, 100% { 
            opacity: 0.3; 
            transform: translate(-50%, -50%) scale(0.8); 
          }
          50% { 
            opacity: 0.6; 
            transform: translate(-50%, -50%) scale(1); 
          }
        }
        
        /* Desactivar animaciones en móvil y preferencias de usuario */
        @media (max-width: 768px), (prefers-reduced-motion: reduce) {
          @keyframes spin, @keyframes spin-slow, @keyframes spin-reverse, @keyframes pulse-dot {
            to { transform: none; opacity: 0.4; }
          }
        }
      `}</style>
    </div>
  );
};

export default memo(Photo);