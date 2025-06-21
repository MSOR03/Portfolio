"use client";

import { motion } from "framer-motion";
import { 
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiArcgis,
  SiAutodesk,
  SiNextdotjs
} from "react-icons/si";
import { FaMapMarkedAlt } from "react-icons/fa";

const engineeringSkills = [
  { 
    name: "Civil3D", 
    icon: <SiAutodesk size={48} className="text-orange-400" />, 
    level: 85,
    category: "CAD/BIM",
    description: "Diseño de infraestructura civil"
  },
  { 
    name: "Revit", 
    icon: <SiAutodesk size={48} className="text-blue-400" />, 
    level: 75,
    category: "BIM",
    description: "Modelado arquitectónico"
  },
  { 
    name: "ArcGIS", 
    icon: <SiArcgis size={48} className="text-emerald-400" />, 
    level: 90,
    category: "GIS",
    description: "Análisis geoespacial avanzado"
  },
  { 
    name: "QGIS", 
    icon: <FaMapMarkedAlt size={48} className="text-lime-400" />, 
    level: 80,
    category: "GIS",
    description: "Software libre de cartografía"
  },
];

const devSkills = [
  { 
    name: "JavaScript", 
    icon: <SiJavascript size={48} className="text-yellow-400" />, 
    level: 88,
    category: "Frontend",
    description: "Lenguaje de programación web"
  },
  { 
    name: "React", 
    icon: <SiReact size={48} className="text-cyan-400" />, 
    level: 85,
    category: "Framework",
    description: "Biblioteca de interfaces"
  },
  { 
    name: "Next.js", 
    icon: <SiNextdotjs size={48} className="text-white" />, 
    level: 80,
    category: "Framework",
    description: "Framework de React"
  },
  { 
    name: "Tailwind CSS", 
    icon: <SiTailwindcss size={48} className="text-sky-400" />, 
    level: 92,
    category: "Styling",
    description: "Framework de CSS utilitario"
  },
];

const SkillCard = ({ skill, index, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: delay + index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        z: 50
      }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden">
        {/* Efecto de brillo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        {/* Badge de categoría */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30">
            {skill.category}
          </span>
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Icono con animación */}
          <motion.div 
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="mb-4 p-3 rounded-full bg-gradient-to-br from-gray-800/50 to-gray-700/30 border border-white/10"
          >
            {skill.icon}
          </motion.div>

          {/* Nombre */}
          <h4 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
            {skill.name}
          </h4>

          {/* Descripción */}
          <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors duration-300">
            {skill.description}
          </p>

          {/* Barra de progreso circular */}
          <div className="relative w-16 h-16 mb-2">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              {/* Círculo de fondo */}
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="2"
              />
              {/* Círculo de progreso */}
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 100" }}
                whileInView={{ strokeDasharray: `${skill.level} 100` }}
                transition={{ duration: 1.5, delay: delay + index * 0.1 + 0.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            {/* Porcentaje en el centro */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span 
                className="text-sm font-bold text-emerald-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: delay + index * 0.1 + 1 }}
              >
                {skill.level}%
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Technologies = () => {
  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-left mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Skills
          </h2>
          <p className="text-xl text-gray-400">
            Tecnologías que uso
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
        </motion.div>

        {/* Sección GIS y BIM */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-3xl font-bold text-white">GIS y BIM</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} delay={0.3} />
            ))}
          </div>
        </motion.div>

        {/* Sección Programación */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-3xl font-bold text-white">Programación</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {devSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} delay={0.6} />
            ))}
          </div>
        </motion.div>

        {/* Estadísticas generales */}
        
      </div>
    </section>
  );
};

export default Technologies;