"use client";

import { useState, useEffect } from "react";
import { FaLaptopCode, FaProjectDiagram, FaTools, FaGithub } from "react-icons/fa";

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

const colorVariants = {
  emerald: {
    text: "text-emerald-400",
    glow: "shadow-emerald-500/30",
    glowHover: "hover:shadow-emerald-500/50",
    border: "border-emerald-500/30",
    bg: "from-emerald-500/10 to-emerald-600/5",
    ring: "ring-emerald-500/20"
  },
  blue: {
    text: "text-blue-400",
    glow: "shadow-blue-500/30",
    glowHover: "hover:shadow-blue-500/50",
    border: "border-blue-500/30",
    bg: "from-blue-500/10 to-blue-600/5",
    ring: "ring-blue-500/20"
  },
  purple: {
    text: "text-purple-400",
    glow: "shadow-purple-500/30",
    glowHover: "hover:shadow-purple-500/50",
    border: "border-purple-500/30",
    bg: "from-purple-500/10 to-purple-600/5",
    ring: "ring-purple-500/20"
  },
  cyan: {
    text: "text-cyan-400",
    glow: "shadow-cyan-500/30",
    glowHover: "hover:shadow-cyan-500/50",
    border: "border-cyan-500/30",
    bg: "from-cyan-500/10 to-cyan-600/5",
    ring: "ring-cyan-500/20"
  }
};

const CountUpAnimation = ({ end, duration = 2.5, suffix = "", delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  
  useEffect(() => {
    if (!hasStarted) return;
    
    let start = 0;
    const increment = end / (duration * 60); // 60 FPS aproximadamente
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16); // ~60 FPS
    
    return () => clearInterval(timer);
  }, [end, duration, hasStarted]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return <span>{count}{suffix}</span>;
};

const StatCard = ({ stat, index }) => {
  const colors = colorVariants[stat.color];
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200); // Delay escalonado para cada tarjeta
    
    return () => clearTimeout(timer);
  }, [index]);
  
  return (
    <div
      className={`group relative transform transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-12 scale-95'
      }`}
      style={{
        transform: isVisible ? 'none' : 'translateY(50px) scale(0.8)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05) rotateY(5deg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) rotateY(0deg)';
      }}
    >
      {/* Glow effect de fondo */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      <div className={`relative bg-gradient-to-br from-gray-900/90 to-gray-800/70 border ${colors.border} backdrop-blur-xl rounded-2xl p-8 shadow-2xl ${colors.glow} ${colors.glowHover} transition-all duration-500 overflow-hidden min-h-[200px] w-[250px]`}>
        {/* Efecto de brillo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Decoración de esquina */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colors.bg} rounded-bl-full opacity-20`}></div>
        
        <div className="relative z-10 flex flex-col items-center text-center h-full">
          {/* Icono con animación */}
          <div 
            className={`mb-6 p-4 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-700/60 border border-white/10 ${colors.ring} ring-2 transition-transform duration-600 group-hover:rotate-360 group-hover:scale-110`}
            style={{
              transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <div className={colors.text}>
              {stat.icon}
            </div>
          </div>

          {/* Número principal */}
          <div
            className={`text-5xl font-black ${colors.text} mb-2 leading-none transition-all duration-500 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          >
            <CountUpAnimation 
              end={stat.num} 
              suffix={stat.suffix} 
              delay={500 + index * 100}
            />
          </div>

          {/* Texto principal */}
          <h3 className="text-white font-bold text-lg mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
            {stat.text}
          </h3>

          {/* Descripción */}
          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
            {stat.description}
          </p>

          {/* Barra decorativa */}
          <div className="mt-4 w-full h-1 bg-gray-800/50 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${colors.bg} rounded-full transition-all duration-1500 ${
                isVisible ? 'w-full' : 'w-0'
              }`}
              style={{
                transitionDelay: `${800 + index * 100}ms`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Stats = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  
  useEffect(() => {
    const headerTimer = setTimeout(() => setHeaderVisible(true), 100);
    const footerTimer = setTimeout(() => setFooterVisible(true), 2000);
    
    return () => {
      clearTimeout(headerTimer);
      clearTimeout(footerTimer);
    };
  }, []);
  
  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-800 ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-5'
          }`}
        >
         
        </div>

        {/* Grid de estadísticas */}
        <div className="flex flex-wrap justify-center gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Resumen inferior */}
        <div
          className={`text-center mt-12 transition-all duration-800 ${
            footerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cada número representa horas de dedicación, aprendizaje continuo y pasión por crear soluciones tecnológicas innovadoras.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;