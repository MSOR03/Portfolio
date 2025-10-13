"use client";

import { motion } from "framer-motion";
import { memo, useMemo, useCallback, useState, useEffect } from "react";

// Datos estáticos - calculados una sola vez
const ESTUDIOS_DATA = [
  {
    grado: "Bachillerato",
    institucion: "Institucion Educativa Departamental Fidel Leon Triana",
    año: "2007 - 2019",
    descripcion: "Graduado con honores en ciencias.",
    icono: "🎓",
    inicio: 2007,
    fin: 2019,
    avance: 100,
    color: "emerald",
    estado: "Completado"
  },
  {
    grado: "Asistente administrativo",
    institucion: "Servicio Nacional de Aprendizaje",
    año: "2017 - 2019",
    descripcion: "Formación técnica en gestión y administración.",
    icono: "🗂️",
    inicio: 2017,
    fin: 2019,
    avance: 100,
    color: "emerald",
    estado: "Completado"
  },
  {
    grado: "Ingeniería Topográfica",
    institucion: "Universidad Distrital Francisco Jose de Caldas",
    año: "2020 - 2025",
    descripcion: "En curso, enfoque en geodesia y sistemas de información geográfica.",
    icono: "📏",
    inicio: 2020,
    fin: 2025,
    avance: 100,
    color: "blue",
    estado: "Completado"
  },
  {
    grado: "Ingeniería de Sistemas y Computación",
    institucion: "Universidad Nacional de Colombia",
    año: "2022 - Presente",
    descripcion: "En curso, enfoque en desarrollo web, inteligencia artificial y sistemas distribuidos.",
    icono: "💻",
    inicio: 2022,
    fin: 2027,
    avance: 45,
    color: "purple",
    estado: "En curso"
  },
];

// Colores pre-calculados
const COLORS = {
  emerald: {
    bg: "from-emerald-500/20 to-emerald-600/30",
    border: "border-emerald-500/40",
    progress: "from-emerald-400 to-emerald-500",
    dot: "bg-emerald-500",
    text: "text-emerald-400"
  },
  blue: {
    bg: "from-blue-500/20 to-blue-600/30",
    border: "border-blue-500/40",
    progress: "from-blue-400 to-blue-500",
    dot: "bg-blue-500",
    text: "text-blue-400"
  },
  purple: {
    bg: "from-purple-500/20 to-purple-600/30",
    border: "border-purple-500/40",
    progress: "from-purple-400 to-purple-500",
    dot: "bg-purple-500",
    text: "text-purple-400"
  }
};

// Hook para detectar si el dispositivo es móvil
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// Barra de progreso simplificada
const ProgressBar = memo(({ progreso, color, idx, isMobile }) => {
  const colors = COLORS[color];
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-400">Progreso</span>
        <span className={`text-sm font-bold ${colors.text}`}>{progreso}%</span>
      </div>
      
      <div className="relative h-3 bg-gray-800/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progreso}%` }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: isMobile ? 0.8 : 1.2,
            delay: isMobile ? idx * 0.1 : idx * 0.2,
            ease: "easeOut"
          }}
          className={`h-full bg-gradient-to-r ${colors.progress} rounded-full`}
        />
      </div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

// Badge de estado simplificado
const StatusBadge = memo(({ estado }) => (
  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
    estado === 'Completado' 
      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
      : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
  }`}>
    {estado}
  </span>
));

StatusBadge.displayName = 'StatusBadge';

// Tarjeta de estudio optimizada
const EstudioCard = memo(({ estudio, idx, isMobile }) => {
  const colors = COLORS[estudio.color];
  
  // Animaciones condicionales según dispositivo
  const cardAnimation = useMemo(() => ({
    initial: { opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 20 : 0 },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { 
      duration: isMobile ? 0.4 : 0.6,
      delay: isMobile ? idx * 0.05 : idx * 0.1
    }
  }), [idx, isMobile]);

  const hoverAnimation = isMobile ? {} : {
    whileHover: { scale: 1.02, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      {...cardAnimation}
      className="relative pl-16 md:pl-20 pb-8 md:pb-12 last:pb-0"
    >
      {/* Punto timeline */}
      <div className={`absolute left-5 md:left-6 top-6 w-4 h-4 md:w-5 md:h-5 ${colors.dot} rounded-full ring-2 md:ring-4 ring-gray-900/50`}>
        {!isMobile && (
          <div className={`absolute inset-0 ${colors.dot} rounded-full animate-ping opacity-30`} />
        )}
      </div>

      {/* Icono */}
      <div className={`absolute left-3 md:left-4 top-4 w-7 h-7 md:w-9 md:h-9 ${colors.dot} rounded-lg md:rounded-xl flex items-center justify-center text-sm md:text-lg`}>
        {estudio.icono}
      </div>

      {/* Card */}
      <motion.div
        {...hoverAnimation}
        className={`bg-gradient-to-br ${colors.bg} border ${colors.border} backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg md:shadow-2xl group relative overflow-hidden`}
      >
        {/* Efecto brillo solo en desktop */}
        {!isMobile && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        )}
        
        <StatusBadge estado={estudio.estado} />

        <div className="relative z-10">
          <h3 className="text-lg md:text-2xl font-bold text-white mb-2 pr-16 md:pr-20">
            {estudio.grado}
          </h3>
          
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mb-3">
            <span className={`${colors.text} font-semibold text-xs md:text-sm`}>
              {estudio.institucion}
            </span>
            <span className="hidden md:inline text-gray-500 text-sm">•</span>
            <span className="text-gray-400 text-xs md:text-sm">
              {estudio.año}
            </span>
          </div>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
            {estudio.descripcion}
          </p>

          <ProgressBar 
            progreso={estudio.avance} 
            color={estudio.color}
            idx={idx}
            isMobile={isMobile}
          />
        </div>
      </motion.div>
    </motion.div>
  );
});

EstudioCard.displayName = 'EstudioCard';

// Componente principal
const EstudiosBarChart = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-0 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative">
          {/* Línea timeline */}
          <div className="absolute left-7 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/60 via-blue-500/60 to-purple-500/60" />
          
          {/* Lista de estudios */}
          <div className="space-y-0">
            {ESTUDIOS_DATA.map((estudio, idx) => (
              <EstudioCard 
                key={estudio.grado}
                estudio={estudio}
                idx={idx}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(EstudiosBarChart);