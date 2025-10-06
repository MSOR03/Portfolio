"use client";

import { motion } from "framer-motion";
import { memo, useMemo, useCallback } from "react";

// Datos movidos fuera del componente para evitar recreación
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
    avance: 40,
    color: "purple",
    estado: "En curso"
  },
];

// Configuración de colores optimizada - calculada una sola vez
const COLOR_CONFIG = {
  emerald: {
    bg: "from-emerald-500/20 to-emerald-600/30",
    border: "border-emerald-500/40",
    glow: "shadow-emerald-500/20",
    progress: "from-emerald-400 to-emerald-500",
    progressGlow: "shadow-[0_0_15px_rgba(16,185,129,0.6)]",
    dot: "bg-emerald-500",
    text: "text-emerald-400"
  },
  blue: {
    bg: "from-blue-500/20 to-blue-600/30",
    border: "border-blue-500/40",
    glow: "shadow-blue-500/20",
    progress: "from-blue-400 to-blue-500",
    progressGlow: "shadow-[0_0_15px_rgba(59,130,246,0.6)]",
    dot: "bg-blue-500",
    text: "text-blue-400"
  },
  purple: {
    bg: "from-purple-500/20 to-purple-600/30",
    border: "border-purple-500/40",
    glow: "shadow-purple-500/20",
    progress: "from-purple-400 to-purple-500",
    progressGlow: "shadow-[0_0_15px_rgba(147,51,234,0.6)]",
    dot: "bg-purple-500",
    text: "text-purple-400"
  }
};

// Función optimizada para calcular progreso
const calcularProgreso = (estudio) => {
  if (typeof estudio.avance === "number") return estudio.avance;
  const añoActual = new Date().getFullYear();
  if (!estudio.fin) return 0;
  const total = estudio.fin - estudio.inicio + 1;
  const cursado = Math.min(añoActual - estudio.inicio + 1, total);
  return Math.round((cursado / total) * 100);
};

// Configuraciones de animación optimizadas - reutilizables
const ANIMATION_CONFIGS = {
  container: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  },
  card: {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-100px" }
  },
  hover: {
    scale: 1.02,
    rotateY: 2,
    z: 50,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    }
  },
  iconHover: {
    scale: 1.1, 
    rotate: 5,
    transition: { duration: 0.2 }
  }
};

// Componente de progreso memoizado
const ProgressBar = memo(({ progreso, colorClasses, idx }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-gray-400">
        Progreso
      </span>
      <span className={`text-sm font-bold ${colorClasses.text}`}>
        {progreso}%
      </span>
    </div>
    
    <div className="relative h-3 bg-gray-800/50 rounded-full overflow-hidden shadow-inner border border-gray-700/50">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${progreso}%` }}
        transition={{ 
          duration: 1.5, 
          delay: 0.5 + idx * 0.2,
          ease: "easeOut"
        }}
        className={`h-full bg-gradient-to-r ${colorClasses.progress} rounded-full relative ${colorClasses.progressGlow}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse" />
      </motion.div>
    </div>
  </div>
));

ProgressBar.displayName = 'ProgressBar';

// Componente de badge de estado memoizado
const StatusBadge = memo(({ estado }) => (
  <div className="absolute top-4 right-4">
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
      estado === 'Completado' 
        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
        : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
    }`}>
      {estado}
    </span>
  </div>
));

StatusBadge.displayName = 'StatusBadge';

// Componente de icono memoizado
const FloatingIcon = memo(({ icono, colorClasses }) => (
  <motion.div
    whileHover={ANIMATION_CONFIGS.iconHover}
    className={`absolute left-4 top-4 w-9 h-9 ${colorClasses.dot} rounded-xl flex items-center justify-center text-white text-lg shadow-xl backdrop-blur-sm border border-white/20`}
  >
    {icono}
  </motion.div>
));

FloatingIcon.displayName = 'FloatingIcon';

// Componente principal de tarjeta de estudio
const EstudioCard = memo(({ estudio, idx }) => {
  const progreso = useMemo(() => calcularProgreso(estudio), [estudio]);
  const colorClasses = useMemo(() => COLOR_CONFIG[estudio.color] || COLOR_CONFIG.emerald, [estudio.color]);
  
  const cardTransition = useMemo(() => ({
    duration: 0.8, 
    delay: idx * 0.15,
    type: "spring",
    stiffness: 100
  }), [idx]);

  return (
    <motion.div
      {...ANIMATION_CONFIGS.card}
      transition={cardTransition}
      className="relative pl-20 pb-12 last:pb-0"
    >
      {/* Punto de la timeline con animación optimizada */}
      <div className={`absolute left-6 top-6 w-5 h-5 ${colorClasses.dot} rounded-full shadow-lg ring-4 ring-gray-900/50`}>
        <div className={`absolute inset-0 ${colorClasses.dot} rounded-full animate-ping opacity-30`} />
      </div>

      {/* Icono flotante */}
      <FloatingIcon icono={estudio.icono} colorClasses={colorClasses} />

      {/* Card principal */}
      <motion.div
        whileHover={ANIMATION_CONFIGS.hover}
        className={`bg-gradient-to-br ${colorClasses.bg} border ${colorClasses.border} backdrop-blur-xl rounded-2xl p-6 shadow-2xl ${colorClasses.glow} hover:shadow-3xl transition-all duration-500 group relative overflow-hidden will-change-transform`}
      >
        {/* Efecto de brillo optimizado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        {/* Badge de estado */}
        <StatusBadge estado={estudio.estado} />

        {/* Contenido principal */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
            {estudio.grado}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <span className={`${colorClasses.text} font-semibold text-sm`}>
              {estudio.institucion}
            </span>
            <span className="text-gray-500 text-sm">•</span>
            <span className="text-gray-400 text-sm">
              {estudio.año}
            </span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
            {estudio.descripcion}
          </p>

          {/* Barra de progreso */}
          <ProgressBar 
            progreso={progreso} 
            colorClasses={colorClasses} 
            idx={idx} 
          />
        </div>
      </motion.div>
    </motion.div>
  );
});

EstudioCard.displayName = 'EstudioCard';

// Componente principal optimizado
const EstudiosBarChart = () => {
  // Callback memoizado para renderizar cada estudio
  const renderEstudio = useCallback((estudio, idx) => (
    <EstudioCard 
      key={`${estudio.grado}-${estudio.inicio}`} 
      estudio={estudio} 
      idx={idx} 
    />
  ), []);

  return (
    <section className="py-0 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          {...ANIMATION_CONFIGS.container}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Contenido del header si es necesario */}
        </motion.div>

        {/* Timeline optimizada */}
        <div className="relative">
          {/* Línea vertical con gradiente optimizado */}
          <div 
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/60 via-blue-500/60 to-purple-500/60"
            style={{ willChange: 'transform' }}
          />
          
          {/* Renderizado optimizado de estudios */}
          <div className="space-y-0">
            {ESTUDIOS_DATA.map(renderEstudio)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(EstudiosBarChart);