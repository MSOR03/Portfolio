'use client';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

/**
 * Props disponibles:
 * - direction: 'up' | 'down' | 'left' | 'right'
 * - delay: número en segundos
 * - repeat: true para permitir que se vuelva a animar al volver a entrar en vista
 */
const FadeInSection = ({ children, direction = 'up', delay = 0.2, repeat = false }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: !repeat,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (repeat) {
      controls.start('hidden');
    }
  }, [inView, controls, repeat]);

  // Valores por dirección
  const directionVariants = {
    up: { y: 50, opacity: 0, scale: 0.95 },
    down: { y: -50, opacity: 0, scale: 0.95 },
    left: { x: 50, opacity: 0, scale: 0.95 },
    right: { x: -50, opacity: 0, scale: 0.95 },
  };

  const hiddenState = directionVariants[direction] || directionVariants.up;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      variants={{
        hidden: hiddenState,
        visible: { x: 0, y: 0, opacity: 1, scale: 1 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
