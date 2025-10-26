'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect, useMemo } from 'react';

/**
 * ScrollAnimation ultra-optimizado para máximo rendimiento
 * Props:
 * - direction: 'up' | 'down' | 'left' | 'right'
 * - delay: número en segundos
 * - repeat: true para permitir que se vuelva a animar
 * - disabled: desactiva la animación (útil para móvil)
 */
const ScrollAnimation = ({ 
  children, 
  direction = 'up', 
  delay = 0.2, 
  repeat = false,
  disabled = false 
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Intersection Observer con configuración optimizada
  const { ref, inView } = useInView({
    triggerOnce: !repeat,
    threshold: 0.15, // Reducido para mejor UX
    rootMargin: '50px', // Pre-trigger para animación más suave
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Memoizar variantes para evitar recreación
  const variants = useMemo(() => {
    const directionMap = {
      up: { y: 30, opacity: 0 }, // Reducido de 50 a 30 para animación más sutil
      down: { y: -30, opacity: 0 },
      left: { x: 30, opacity: 0 },
      right: { x: -30, opacity: 0 },
    };

    return {
      hidden: directionMap[direction] || directionMap.up,
      visible: { 
        x: 0, 
        y: 0, 
        opacity: 1,
      },
    };
  }, [direction]);

  // Si está deshabilitado o no montado, renderizar sin animación
  if (disabled || !isMounted) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : (repeat ? "hidden" : undefined)}
      variants={variants}
      transition={{ 
        duration: 0.6, // Reducido de 0.8 a 0.6 para más snappy
        ease: [0.25, 0.1, 0.25, 1], // Ease optimizado (similar a ease-out pero más suave)
        delay,
      }}
      style={{
        // Force GPU acceleration
        transform: 'translate3d(0, 0, 0)',
        willChange: inView ? 'auto' : 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;