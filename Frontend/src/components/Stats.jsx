"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import { FaLaptopCode, FaProjectDiagram, FaTools, FaGithub } from "react-icons/fa";

// Datos de estadísticas
const stats = [
  {
    num: 1,
    text: "Años de experiencia",
    icon: <FaLaptopCode className="text-5xl" />,
    color: "emerald",
    suffix: "+",
    description: "Desarrollando soluciones"
  },
  {
    num: 6,
    text: "Proyectos de Software",
    icon: <FaProjectDiagram className="text-5xl" />,
    color: "blue",
    suffix: "+",
    description: "Aplicaciones completadas"
  },
  {
    num: 5,
    text: "Tecnologías",
    icon: <FaTools className="text-5xl" />,
    color: "purple",
    suffix: "+",
    description: "Dominadas actualmente"
  },
  {
    num: 69,
    text: "Commits",
    icon: <FaGithub className="text-5xl" />,
    color: "cyan",
    suffix: "+",
    description: "Contribuciones en GitHub"
  },
];

// Colores por tema y categoría
const colorVariants = (theme) => ({
  emerald: theme === 'dark' ? {
    text: "text-emerald-400",
    glow: "shadow-emerald-500/30",
    glowHover: "hover:shadow-emerald-500/50",
    border: "border-emerald-500/30",
    bg: "from-emerald-500/10 to-emerald-600/5",
    ring: "ring-emerald-500/20",
    textSecondary: "text-gray-400"
  } : {
    text: "text-emerald-700",
    glow: "shadow-emerald-300/30",
    glowHover: "hover:shadow-emerald-500/50",
    border: "border-emerald-300/50",
    bg: "from-emerald-200/70 to-emerald-100/80",
    ring: "ring-emerald-400/20",
    textSecondary: "text-gray-700"
  },
  blue: theme === 'dark' ? {
    text: "text-blue-400",
    glow: "shadow-blue-500/30",
    glowHover: "hover:shadow-blue-500/50",
    border: "border-blue-500/30",
    bg: "from-blue-500/10 to-blue-600/5",
    ring: "ring-blue-500/20",
    textSecondary: "text-gray-400"
  } : {
    text: "text-blue-700",
    glow: "shadow-blue-300/30",
    glowHover: "hover:shadow-blue-500/50",
    border: "border-blue-300/50",
    bg: "from-blue-200/70 to-blue-100/80",
    ring: "ring-blue-400/20",
    textSecondary: "text-gray-700"
  },
  purple: theme === 'dark' ? {
    text: "text-purple-400",
    glow: "shadow-purple-500/30",
    glowHover: "hover:shadow-purple-500/50",
    border: "border-purple-500/30",
    bg: "from-purple-500/10 to-purple-600/5",
    ring: "ring-purple-500/20",
    textSecondary: "text-gray-400"
  } : {
    text: "text-purple-700",
    glow: "shadow-purple-300/30",
    glowHover: "hover:shadow-purple-500/50",
    border: "border-purple-300/50",
    bg: "from-purple-200/70 to-purple-100/80",
    ring: "ring-purple-400/20",
    textSecondary: "text-gray-700"
  },
  cyan: theme === 'dark' ? {
    text: "text-cyan-400",
    glow: "shadow-cyan-500/30",
    glowHover: "hover:shadow-cyan-500/50",
    border: "border-cyan-500/30",
    bg: "from-cyan-500/10 to-cyan-600/5",
    ring: "ring-cyan-500/20",
    textSecondary: "text-gray-400"
  } : {
    text: "text-cyan-700",
    glow: "shadow-cyan-300/30",
    glowHover: "hover:shadow-cyan-500/50",
    border: "border-cyan-300/50",
    bg: "from-cyan-200/70 to-cyan-100/80",
    ring: "ring-cyan-400/20",
    textSecondary: "text-gray-700"
  }
});

// Animación de conteo mejorada
const CountUpAnimation = ({ end, duration = 2.5, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    setCount(0);
    setHasStarted(false);

    timeoutRef.current = setTimeout(() => {
      setHasStarted(true);
      
      const startTime = Date.now();
      const durationMs = duration * 1000;
      
      const updateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * end);
        
        setCount(currentCount);
        
        if (progress < 1) {
          intervalRef.current = requestAnimationFrame(updateCount);
        } else {
          setCount(end);
        }
      };
      
      intervalRef.current = requestAnimationFrame(updateCount);
    }, delay);

    return () => {
      if (intervalRef.current) {
        if (typeof intervalRef.current === 'number') {
          cancelAnimationFrame(intervalRef.current);
        } else {
          clearInterval(intervalRef.current);
        }
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [end, duration, delay]);

  return <span>{count}{suffix}</span>;
};

// Tarjeta de estadísticas
const StatCard = ({ stat, index, theme }) => {
  const colors = useMemo(() => colorVariants(theme)[stat.color], [stat.color, theme]);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  return (
    <div
      className={`group relative transform transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-12 scale-95'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className={`relative bg-gradient-to-br ${theme === 'dark' ? 'from-gray-900/90 to-gray-800/70' : 'from-white/95 to-gray-100'} border ${colors.border} backdrop-blur-xl rounded-2xl p-8 shadow-2xl ${colors.glow} ${colors.glowHover} transition-all duration-500 overflow-hidden min-h-[200px] w-[250px]`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colors.bg} rounded-bl-full opacity-20`}></div>

        <div className="relative z-10 flex flex-col items-center text-center h-full">
          <div 
            className={`mb-6 p-4 rounded-full bg-gradient-to-br ${theme === 'dark' ? 'from-gray-800/80 to-gray-700/60' : 'from-white/80 to-gray-50'} border border-white/10 ${colors.ring} ring-2 transition-transform duration-600 group-hover:rotate-360 group-hover:scale-110`}
          >
            <div className={colors.text}>{stat.icon}</div>
          </div>

          <div className={`text-5xl font-black ${colors.text} mb-2 leading-none transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            {isVisible && (
              <CountUpAnimation 
                end={stat.num} 
                suffix={stat.suffix} 
                delay={200} 
                duration={2}
              />
            )}
          </div>

          <h3 className={`font-bold text-lg mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {stat.text}
          </h3>

          <p className={`${colors.textSecondary} text-sm leading-relaxed`}>{stat.description}</p>

          <div className="mt-4 w-full h-1 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800/50">
            <div className={`h-full bg-gradient-to-r ${colors.bg} rounded-full transition-all duration-1500 ${isVisible ? 'w-full' : 'w-0'}`} style={{ transitionDelay: `${800 + index * 100}ms` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal - EL FIX ESTÁ AQUÍ
const Stats = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerTimeoutRef = useRef(null);

  // FIX: Esperar a que el componente esté montado
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (footerTimeoutRef.current) clearTimeout(footerTimeoutRef.current);
    setFooterVisible(false);

    footerTimeoutRef.current = setTimeout(() => setFooterVisible(true), 2000);
    
    return () => {
      if (footerTimeoutRef.current) clearTimeout(footerTimeoutRef.current);
    };
  }, []);

  // FIX: No renderizar hasta que esté montado
  if (!mounted) {
    return null;
  }

  // FIX: Usar resolvedTheme en lugar de theme
  const currentTheme = resolvedTheme || 'dark';

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Grid de estadísticas */}
        <div className="flex flex-wrap justify-center gap-8">
          {stats.map((stat, index) => (
            <StatCard key={`stat-${index}-${stat.num}`} stat={stat} index={index} theme={currentTheme} />
          ))}
        </div>

        {/* Resumen inferior */}
        <div className={`text-center mt-12 transition-all duration-800 ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className={`${currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-700'} text-lg max-w-2xl mx-auto`}>
            Cada número representa horas de dedicación, aprendizaje continuo y pasión por crear soluciones tecnológicas innovadoras.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;