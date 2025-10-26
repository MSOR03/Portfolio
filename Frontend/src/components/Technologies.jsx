"use client";

import { useState, useEffect, memo } from "react";
import {
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiArcgis,
  SiAutodesk,
  SiNextdotjs,
} from "react-icons/si";
import { FaMapMarkedAlt, FaPython, FaJava } from "react-icons/fa";
import { useTheme } from "next-themes";

const ENGINEERING_SKILLS = [
  {
    name: "Civil3D",
    icon: SiAutodesk,
    iconColor: "text-orange-400",
    level: 70,
    category: "CAD/BIM",
    description: "Diseño de infraestructura civil",
  },
  {
    name: "Revit",
    icon: SiAutodesk,
    iconColor: "text-blue-400",
    level: 30,
    category: "BIM",
    description: "Modelado arquitectónico",
  },
  {
    name: "ArcGIS",
    icon: SiArcgis,
    iconColor: "text-emerald-400",
    level: 70,
    category: "GIS",
    description: "Análisis geoespacial",
  },
  {
    name: "QGIS",
    icon: FaMapMarkedAlt,
    iconColor: "text-lime-400",
    level: 60,
    category: "GIS",
    description: "Cartografía libre",
  },
];

const DEV_SKILLS = [
  {
    name: "JavaScript",
    icon: SiJavascript,
    iconColor: "text-yellow-400",
    level: 55,
    category: "Frontend",
    description: "Programación web",
  },
  {
    name: "Python",
    icon: FaPython,
    iconColor: "text-blue-400",
    level: 70,
    category: "Backend",
    description: "Desarrollo y análisis",
  },
  {
    name: "Java",
    icon: FaJava,
    iconColor: "text-red-400",
    level: 65,
    category: "Backend",
    description: "Orientado a objetos",
  },
  {
    name: "React",
    icon: SiReact,
    iconColor: "text-cyan-400",
    level: 50,
    category: "Framework",
    description: "Biblioteca UI",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    iconColor: "text-gray-800 dark:text-white",
    level: 40,
    category: "Framework",
    description: "Framework React",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    iconColor: "text-sky-400",
    level: 50,
    category: "Styling",
    description: "CSS utilitario",
  },
];

// Círculo de progreso optimizado con CSS puro
const ProgressCircle = memo(({ level, isDark }) => {
  const circumference = 2 * Math.PI * 15.9155;
  const dashArray = `${(level / 100) * circumference} ${circumference}`;

  return (
    <div className="relative w-16 h-16 mb-2">
      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
        <circle
          cx="18"
          cy="18"
          r="15.9155"
          fill="none"
          stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(6,182,212,0.15)"}
          strokeWidth="2"
        />
        <circle
          cx="18"
          cy="18"
          r="15.9155"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={dashArray}
          className="transition-all duration-1000 ease-out"
          style={{ animationDelay: '300ms' }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-sm font-bold ${isDark ? 'text-emerald-400' : 'text-teal-700'}`}>
          {level}%
        </span>
      </div>
    </div>
  );
});
ProgressCircle.displayName = "ProgressCircle";

// Tarjeta de skill optimizada
const SkillCard = memo(({ skill, isDark, index }) => {
  const Icon = skill.icon;

  return (
    <div 
      className="group opacity-0 translate-y-4 animate-fadeInUp"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={`relative rounded-2xl p-5 backdrop-blur-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden ${
        isDark 
          ? 'bg-gray-900/80 border border-emerald-500/30' 
          : 'bg-white/95 border border-emerald-300/50'
      }`}>
        {/* Efecto de brillo en hover */}
        <div className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent ${
          isDark ? 'via-white/5' : 'via-emerald-300/15'
        } to-transparent`} />

        {/* Badge de categoría */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${
            isDark 
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
              : 'bg-emerald-200/70 text-emerald-800 border-emerald-400/50'
          }`}>
            {skill.category}
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Icono con hover */}
          <div className={`mb-4 p-3 rounded-full border transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
            isDark 
              ? 'bg-gray-800/50 border-white/10' 
              : 'bg-white/90 border-emerald-300/40'
          }`}>
            <Icon size={48} className={skill.iconColor} />
          </div>

          <h4 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
            isDark 
              ? 'text-white group-hover:text-emerald-300' 
              : 'text-gray-800 group-hover:text-emerald-800'
          }`}>
            {skill.name}
          </h4>

          <p className={`text-sm mb-4 transition-colors duration-300 ${
            isDark 
              ? 'text-gray-400 group-hover:text-gray-300' 
              : 'text-gray-600 group-hover:text-gray-800'
          }`}>
            {skill.description}
          </p>

          <ProgressCircle level={skill.level} isDark={isDark} />
        </div>
      </div>
    </div>
  );
});
SkillCard.displayName = "SkillCard";

// Grid de skills
const SkillGrid = memo(({ skills, isDark }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {skills.map((skill, index) => (
      <SkillCard
        key={skill.name}
        skill={skill}
        index={index}
        isDark={isDark}
      />
    ))}
  </div>
));
SkillGrid.displayName = "SkillGrid";

const Technologies = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
        </div>
      </section>
    );
  }

  const isDark = theme === "dark";

  return (
    <section className="py-12 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Header */}
        {/* GIS y BIM */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              GIS y BIM
            </h3>
            <div className={`flex-1 h-px ${
              isDark ? 'bg-gradient-to-r from-emerald-500/50 to-transparent' : 'bg-gradient-to-r from-emerald-500/70 to-transparent'
            }`} />
          </div>
          <SkillGrid skills={ENGINEERING_SKILLS} isDark={isDark} />
        </div>

        {/* Programación */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Programación
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
          </div>
          <SkillGrid skills={DEV_SKILLS} isDark={isDark} />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fadeInUp {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Technologies;