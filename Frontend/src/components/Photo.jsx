"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// SOLO animación flotante - lo más importante visualmente
const imageVariants = {
  animate: {
    y: [0, -8, 0],
    transition: { 
      duration: 6, 
      repeat: Infinity, 
      ease: "easeInOut",
      repeatType: "reverse"
    },
  },
  whileHover: {
    scale: 1.03,
    transition: { duration: 0.3 },
  }
};

// Halo externo - PURO CSS (mucho más eficiente)
const OuterHalo = memo(() => (
  <div 
    className="absolute -inset-2 pointer-events-none"
    style={{
      animation: 'spin 45s linear infinite',
      transform: 'translateZ(0)', // GPU acceleration
    }}
  >
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      fill="none"
    >
      <circle
        cx="50"
        cy="50"
        r="49"
        stroke="url(#outerGradient)"
        strokeWidth="0.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <defs>
        <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff99" stopOpacity="0.8" />
          <stop offset="25%" stopColor="#00ff99" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#00ff99" stopOpacity="0" />
          <stop offset="75%" stopColor="#00ff99" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00ff99" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  </div>
));
OuterHalo.displayName = "OuterHalo";

// Círculo interno - SIMPLIFICADO (solo opacidad pulse)
const InnerCircle = memo(() => (
  <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
    <svg
      className="w-[320px] h-[320px] md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px] xl:w-[520px] xl:h-[520px]"
      fill="transparent"
      viewBox="0 0 100 100"
      style={{
        animation: 'pulse-opacity 4s ease-in-out infinite'
      }}
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        stroke="#00ff99"
        strokeWidth="0.8"
        strokeDasharray="20 80"
        strokeLinecap="round"
        style={{ 
          filter: "drop-shadow(0 0 8px rgba(0, 255, 153, 0.5))",
          opacity: 0.8,
          animation: 'spin 25s linear infinite'
        }}
      />
    </svg>
  </div>
));
InnerCircle.displayName = "InnerCircle";

// Puntos decorativos - 8 BURBUJAS con CSS puro (súper eficiente)
const DecorativeDots = memo(() => {
  // Calculamos 8 posiciones en círculo
  const positions = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 8;
    return {
      top: `${50 + 45 * Math.sin(angle)}%`,
      left: `${50 + 45 * Math.cos(angle)}%`,
    };
  });

  return (
    <div 
      className="absolute -inset-8 pointer-events-none"
      style={{
        animation: 'spin-reverse 60s linear infinite'
      }}
    >
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400 rounded-full"
          style={{
            ...pos,
            transform: 'translate(-50%, -50%)',
            animation: `pulse-dot 3s ease-in-out infinite ${i * 0.375}s`
          }}
        />
      ))}
    </div>
  );
});
DecorativeDots.displayName = "DecorativeDots";

const Photo = () => {
  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <div className="relative">
        {/* Contenedor principal - SOLO una animación Framer Motion */}
        <motion.div
          variants={imageVariants}
          animate="animate"
          whileHover="whileHover"
          className="w-[298px] h-[298px] md:w-[340px] md:h-[340px] lg:w-[420px] lg:h-[420px] xl:w-[500px] xl:h-[500px] 
                     mix-blend-lighten relative rounded-2xl overflow-hidden cursor-pointer
                     shadow-lg hover:shadow-2xl transition-shadow duration-300"
          style={{
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
          }}
        >
          {/* IMAGEN - optimizada al máximo */}
          <Image
            src="/assets/Photo.avif"
            priority
            quality={85}
            fill
            alt="Profile photo"
            className="object-cover rounded-2xl"
            sizes="(max-width: 768px) 298px, (max-width: 1024px) 340px, (max-width: 1280px) 420px, 500px"
            loading="eager"
            decoding="async"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl pointer-events-none" />
          
          {/* Halo externo - CSS puro */}
          <OuterHalo />
        </motion.div>

        {/* Círculo interno - CSS puro */}
        <InnerCircle />

        {/* Solo 4 puntos - CSS puro */}
        <DecorativeDots />
      </div>

      {/* Estilos CSS en el head - MUY eficientes */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          to { transform: rotate(-360deg); }
        }
        
        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes pulse-dot {
          0%, 100% { 
            opacity: 0.3; 
            transform: translate(-50%, -50%) scale(0.5); 
          }
          50% { 
            opacity: 0.9; 
            transform: translate(-50%, -50%) scale(1.2); 
          }
        }
        
        /* Hint al navegador para optimizar */
        @media (prefers-reduced-motion: no-preference) {
          :global(.animate-optimized) {
            will-change: transform;
          }
        }
      `}</style>
    </div>
  );
};

export default memo(Photo);