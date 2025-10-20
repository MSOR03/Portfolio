"use client";

import { motion } from "framer-motion";
import { memo } from "react";

// Datos estáticos
const ESTUDIOS_DATA = [
  {
    grado: "Bachillerato",
    institucion: "Institucion Educativa Departamental Fidel Leon Triana",
    año: "2007 - 2019",
    descripcion: "Graduado con honores en ciencias.",
    icono: "🎓",
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
    avance: 45,
    color: "purple",
    estado: "En curso"
  },
];

// Clases pre-computadas para evitar concatenación en render
const COLOR_CLASSES = {
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

// Badge de estado - versión ligera
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

// Barra de progreso simplificada y reparada
const ProgressBar = memo(({ progreso, colorClasses, idx }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-gray-400">Progreso</span>
      <span className={`text-sm font-bold ${colorClasses.text}`}>{progreso}%</span>
    </div>
    
    <div className="relative h-3 bg-gray-800/50 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progreso}%` }}
        transition={{ 
          duration: 1.2,
          delay: idx * 0.15,
          ease: [0.4, 0, 0.2, 1]
        }}
        className={`h-full bg-gradient-to-r ${colorClasses.progress} rounded-full`}
      />
    </div>
  </div>
));

ProgressBar.displayName = 'ProgressBar';

// Tarjeta de estudio optimizada
const EstudioCard = memo(({ estudio, idx }) => {
  const colorClasses = COLOR_CLASSES[estudio.color];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: idx * 0.1,
        ease: "easeOut"
      }}
      className="relative pl-16 md:pl-20 pb-8 md:pb-12 last:pb-0"
    >
      {/* Punto timeline */}
      <div className={`absolute left-5 md:left-6 top-6 w-4 h-4 md:w-5 md:h-5 ${colorClasses.dot} rounded-full ring-4 ring-gray-900/50`} />

      {/* Icono */}
      <div className={`absolute left-3 md:left-4 top-4 w-7 h-7 md:w-9 md:h-9 ${colorClasses.dot} rounded-lg md:rounded-xl flex items-center justify-center text-sm md:text-lg shadow-lg`}>
        {estudio.icono}
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={`bg-gradient-to-br ${colorClasses.bg} border ${colorClasses.border} backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl group relative overflow-hidden`}
      >
        {/* Efecto brillo - solo desktop */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        <StatusBadge estado={estudio.estado} />

        <div className="relative z-10">
          <h3 className="text-lg md:text-2xl font-bold text-white mb-2 pr-20">
            {estudio.grado}
          </h3>
          
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mb-3">
            <span className={`${colorClasses.text} font-semibold text-xs md:text-sm`}>
              {estudio.institucion}
            </span>
            <span className="hidden md:inline text-gray-500">•</span>
            <span className="text-gray-400 text-xs md:text-sm">
              {estudio.año}
            </span>
          </div>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
            {estudio.descripcion}
          </p>

          <ProgressBar 
            progreso={estudio.avance} 
            colorClasses={colorClasses}
            idx={idx}
          />
        </div>
      </motion.div>
    </motion.div>
  );
});

EstudioCard.displayName = 'EstudioCard';

// Componente principal
const EstudiosBarChart = () => {
  return (
    <section className="py-8 md:py-12 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative">
          {/* Línea timeline */}
          <div className="absolute left-7 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500/60 via-blue-500/60 to-purple-500/60" />
          
          {/* Lista de estudios */}
          <div>
            {ESTUDIOS_DATA.map((estudio, idx) => (
              <EstudioCard 
                key={estudio.grado}
                estudio={estudio}
                idx={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(EstudiosBarChart);