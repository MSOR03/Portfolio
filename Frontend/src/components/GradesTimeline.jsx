"use client";

import { memo, useState, useEffect } from "react";

const ESTUDIOS_DATA = [
  {
    grado: "Bachillerato",
    institucion: "I.E.D. Fidel Leon Triana",
    año: "2007 - 2019",
    descripcion: "Graduado con honores en ciencias.",
    icono: "🎓",
    avance: 100,
    color: "emerald",
    estado: "Completado"
  },
  {
    grado: "Asistente administrativo",
    institucion: "SENA",
    año: "2017 - 2019",
    descripcion: "Formación técnica en gestión y administración.",
    icono: "🗂️",
    avance: 100,
    color: "emerald",
    estado: "Completado"
  },
  {
    grado: "Ingeniería Topográfica",
    institucion: "Universidad Distrital",
    año: "2020 - 2025",
    descripcion: "Enfoque en geodesia y sistemas de información geográfica.",
    icono: "📏",
    avance: 100,
    color: "blue",
    estado: "Completado"
  },
  {
    grado: "Ingeniería de Sistemas",
    institucion: "Universidad Nacional",
    año: "2022 - Presente",
    descripcion: "Enfoque en desarrollo web, IA y sistemas distribuidos.",
    icono: "💻",
    avance: 45,
    color: "purple",
    estado: "En curso"
  },
];

const COLOR_CLASSES = {
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    progress: "bg-emerald-500",
    dot: "bg-emerald-500",
    text: "text-emerald-400"
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    progress: "bg-blue-500",
    dot: "bg-blue-500",
    text: "text-blue-400"
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    progress: "bg-purple-500",
    dot: "bg-purple-500",
    text: "text-purple-400"
  }
};

const StatusBadge = memo(({ estado }) => (
  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
    estado === 'Completado'
      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
      : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
  }`}>
    {estado}
  </span>
));
StatusBadge.displayName = 'StatusBadge';

const ProgressBar = memo(({ progreso, colorClasses, animate }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-400">Progreso</span>
      <span className={`text-xs font-bold ${colorClasses.text}`}>{progreso}%</span>
    </div>
    
    <div className="relative h-2 bg-gray-800/50 rounded-full overflow-hidden">
      <div
        className={`h-full ${colorClasses.progress} rounded-full transition-all duration-1000 ease-out`}
        style={{ 
          width: animate ? `${progreso}%` : '0%',
          transitionDelay: '300ms'
        }}
      />
    </div>
  </div>
));
ProgressBar.displayName = 'ProgressBar';

const EstudioCard = memo(({ estudio, animate }) => {
  const colorClasses = COLOR_CLASSES[estudio.color];
  
  return (
    <div className="relative pl-12 pb-8 last:pb-0 group">
      {/* Punto timeline */}
      <div className={`absolute left-4 top-4 w-3 h-3 ${colorClasses.dot} rounded-full ring-4 ring-gray-900/50 z-10 transition-all duration-300 group-hover:scale-125 group-hover:ring-6`} />

      {/* Icono */}
      <div className={`absolute left-2.5 top-2.5 w-7 h-7 ${colorClasses.dot} rounded-lg flex items-center justify-center text-base shadow-lg z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
        {estudio.icono}
      </div>

      {/* Card */}
      <div
        className={`${colorClasses.bg} border ${colorClasses.border} rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer relative overflow-hidden ${
          animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Efecto de brillo sutil en hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3 className="text-base font-bold text-white flex-1">
            {estudio.grado}
          </h3>
          <StatusBadge estado={estudio.estado} />
        </div>
        
        <div className="space-y-1 mb-3">
          <span className={`${colorClasses.text} font-semibold text-xs block`}>
            {estudio.institucion}
          </span>
          <span className="text-gray-400 text-xs block">
            {estudio.año}
          </span>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {estudio.descripcion}
        </p>

        <ProgressBar 
          progreso={estudio.avance} 
          colorClasses={colorClasses}
          animate={animate}
        />
      </div>
    </div>
  );
});
EstudioCard.displayName = 'EstudioCard';

const EstudiosBarChart = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay para permitir que la página cargue primero
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-8 bg-transparent">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative">
          {/* Línea timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-blue-500/40 to-purple-500/40" />
          
          {/* Lista de estudios */}
          <div>
            {ESTUDIOS_DATA.map((estudio, idx) => (
              <EstudioCard 
                key={estudio.grado}
                estudio={estudio}
                animate={mounted}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default memo(EstudiosBarChart);