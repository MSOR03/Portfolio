"use client";

import { useState, useEffect, useMemo, memo } from "react";
import { motion } from "framer-motion";
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

// Configuraciones constantes
const ANIMATION_CONFIG = {
  basic: { duration: 0.4, stiffness: 120, damping: 20, mass: 0.8 },
  enhanced: { duration: 0.8, stiffness: 100, damping: 15, mass: 1 },
};

const THEMES = {
  dark: {
    cardBg: "from-gray-900/80 to-gray-800/60",
    cardBorder: "border-emerald-500/30",
    cardHover: "hover:shadow-emerald-500/20",
    text: "text-white",
    textSecondary: "text-gray-400",
    textHover: "group-hover:text-emerald-300",
    textHoverSecondary: "group-hover:text-gray-300",
    glowFrom: "from-emerald-500/10",
    glowTo: "to-blue-500/10",
    badgeBg: "bg-emerald-500/20",
    badgeText: "text-emerald-300",
    badgeBorder: "border-emerald-500/30",
    iconBg: "from-gray-800/50 to-gray-700/30",
    iconBorder: "border-white/10",
    divider: "from-emerald-500/50",
    stroke: "rgba(255,255,255,0.1)",
    percentText: "text-emerald-400",
  },
  light: {
    cardBg: "from-white/95 to-emerald-50/90",
    cardBorder: "border-emerald-300/50",
    cardHover: "hover:shadow-emerald-300/30",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    textHover: "group-hover:text-emerald-800",
    textHoverSecondary: "group-hover:text-gray-800",
    glowFrom: "from-emerald-300/25",
    glowTo: "to-teal-300/25",
    badgeBg: "bg-emerald-200/70",
    badgeText: "text-emerald-800",
    badgeBorder: "border-emerald-400/50",
    iconBg: "from-white/90 to-emerald-100/80",
    iconBorder: "border-emerald-300/40",
    divider: "from-emerald-500/70",
    stroke: "rgba(6, 182, 212, 0.15)",
    percentText: "text-teal-700",
  },
};

// Detectar capacidad del dispositivo (memoizado)
let cachedCapability = null;
const getDeviceCapability = () => {
  if (cachedCapability) return cachedCapability;
  if (typeof window === "undefined") return "enhanced";
  
  const lowEndIndicators = [
    navigator.hardwareConcurrency <= 4,
    navigator.deviceMemory <= 4,
    /Android.*Chrome\/[4-7][0-9]/.test(navigator.userAgent),
    /iPhone.*OS [1-9]_/.test(navigator.userAgent),
    window.innerWidth <= 768,
  ];
  
  cachedCapability = lowEndIndicators.filter(Boolean).length >= 2 ? "basic" : "enhanced";
  return cachedCapability;
};

// Datos de habilidades (constantes fuera del componente)
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
    description: "Análisis geoespacial avanzado",
  },
  {
    name: "QGIS",
    icon: FaMapMarkedAlt,
    iconColor: "text-lime-400",
    level: 60,
    category: "GIS",
    description: "Software libre de cartografía",
  },
];

const DEV_SKILLS = [
  {
    name: "JavaScript",
    icon: SiJavascript,
    iconColor: "text-yellow-400",
    level: 55,
    category: "Frontend",
    description: "Lenguaje de programación web",
  },
  {
    name: "Python",
    icon: FaPython,
    iconColor: "text-blue-400",
    level: 70,
    category: "Backend",
    description: "Lenguaje para desarrollo y análisis",
  },
  {
    name: "Java",
    icon: FaJava,
    iconColor: "text-red-400",
    level: 65,
    category: "Backend",
    description: "Lenguaje orientado a objetos",
  },
  {
    name: "React",
    icon: SiReact,
    iconColor: "text-cyan-400",
    level: 50,
    category: "Framework",
    description: "Biblioteca de interfaces",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    iconColor: "text-gray-800 dark:text-white",
    level: 40,
    category: "Framework",
    description: "Framework de React",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    iconColor: "text-sky-400",
    level: 50,
    category: "Styling",
    description: "Framework de CSS utilitario",
  },
];

// Componente ProgressCircle memoizado
const ProgressCircle = memo(({ level, name, isDark, index, delay, deviceCapability }) => {
  const theme = THEMES[isDark ? "dark" : "light"];
  const gradientId = `g-${name}`;

  const pathVariants = {
    hidden: { strokeDasharray: "0 100" },
    visible: {
      strokeDasharray: `${level} 100`,
      transition: {
        duration: deviceCapability === "basic" ? 1 : 1.5,
        delay: delay + index * 0.1 + (deviceCapability === "basic" ? 0.2 : 0.5),
      },
    },
  };

  const percentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: delay + index * 0.1 + (deviceCapability === "basic" ? 0.4 : 1),
      },
    },
  };

  return (
    <div className="relative w-16 h-16 mb-2">
      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={theme.stroke}
          strokeWidth="2"
        />
        <motion.path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          variants={pathVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className={`text-sm font-bold ${theme.percentText}`}
          variants={percentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {level}%
        </motion.span>
      </div>
    </div>
  );
});

ProgressCircle.displayName = "ProgressCircle";

// Componente SkillCard memoizado
const SkillCard = memo(({ skill, index, delay, deviceCapability, isDark }) => {
  const theme = THEMES[isDark ? "dark" : "light"];
  const animConfig = ANIMATION_CONFIG[deviceCapability];
  const Icon = skill.icon;

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: deviceCapability === "basic" ? 20 : 50,
      rotateX: deviceCapability === "basic" ? 0 : -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: animConfig.duration,
        delay: delay + index * (deviceCapability === "basic" ? 0.05 : 0.1),
        type: "spring",
        stiffness: animConfig.stiffness,
        damping: animConfig.damping,
        mass: animConfig.mass,
      },
    },
  };

  const hoverAnimation = deviceCapability === "basic"
    ? { scale: 1.02 }
    : { scale: 1.05, rotateY: 5, z: 50 };

  const iconHover = deviceCapability === "basic"
    ? {}
    : { rotate: 360, scale: 1.1 };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={hoverAnimation}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative will-change-transform"
    >
      {deviceCapability === "enhanced" && (
        <div
          className={`absolute inset-0 bg-gradient-to-r ${theme.glowFrom} ${theme.glowTo} rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
      )}

      <div
        className={`relative bg-gradient-to-br ${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 backdrop-blur-xl shadow-2xl ${theme.cardHover} transition-all duration-300 overflow-hidden`}
      >
        {deviceCapability === "enhanced" && (
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent ${
              isDark ? "via-white/5" : "via-emerald-300/15"
            } to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000`}
          />
        )}

        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 ${theme.badgeBg} ${theme.badgeText} text-xs font-semibold rounded-full border ${theme.badgeBorder}`}
          >
            {skill.category}
          </span>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            whileHover={iconHover}
            transition={{
              duration: deviceCapability === "basic" ? 0.3 : 0.6,
              type: deviceCapability === "basic" ? "tween" : "spring",
            }}
            className={`mb-4 p-3 rounded-full bg-gradient-to-br ${theme.iconBg} border ${theme.iconBorder} will-change-transform`}
          >
            <Icon size={48} className={skill.iconColor} />
          </motion.div>

          <h4
            className={`text-xl font-bold ${theme.text} mb-2 ${theme.textHover} transition-colors duration-300`}
          >
            {skill.name}
          </h4>

          <p
            className={`${theme.textSecondary} text-sm mb-4 ${theme.textHoverSecondary} transition-colors duration-300`}
          >
            {skill.description}
          </p>

          <ProgressCircle
            level={skill.level}
            name={skill.name}
            isDark={isDark}
            index={index}
            delay={delay}
            deviceCapability={deviceCapability}
          />
        </div>
      </div>
    </motion.div>
  );
});

SkillCard.displayName = "SkillCard";

// Componente SkillGrid memoizado
const SkillGrid = memo(({ skills, delay, deviceCapability, isDark }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {skills.map((skill, index) => (
      <SkillCard
        key={skill.name}
        skill={skill}
        index={index}
        delay={delay}
        deviceCapability={deviceCapability}
        isDark={isDark}
      />
    ))}
  </div>
));

SkillGrid.displayName = "SkillGrid";

// Componente principal
const Technologies = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const deviceCapability = useMemo(() => getDeviceCapability(), []);
  const isDark = theme === "dark";
  const themeColors = THEMES[isDark ? "dark" : "light"];

  const headerConfig = useMemo(
    () => ({
      duration: deviceCapability === "basic" ? 0.4 : 0.8,
      delay: deviceCapability === "basic" ? 0.1 : 0.2,
    }),
    [deviceCapability]
  );

  const sectionVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: deviceCapability === "basic" ? 10 : 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: headerConfig.duration,
          staggerChildren: deviceCapability === "basic" ? 0.05 : 0.1,
        },
      },
    }),
    [headerConfig.duration, deviceCapability]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-0 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: deviceCapability === "basic" ? -15 : -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: headerConfig.duration }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-0"
        >
          <h2
            className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${
              isDark
                ? "from-emerald-400 via-cyan-400 to-blue-400"
                : "from-emerald-700 via-teal-600 to-cyan-700"
            } bg-clip-text text-transparent mb-4`}
          >
            Habilidades
          </h2>
          <p className={`text-xl ${themeColors.textSecondary}`}>
            Tecnologías que uso
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto" />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <h3 className={`text-3xl font-bold ${themeColors.text}`}>
              GIS y BIM
            </h3>
            <div
              className={`flex-1 h-px bg-gradient-to-r ${themeColors.divider} to-transparent`}
            />
          </div>
          <SkillGrid
            skills={ENGINEERING_SKILLS}
            delay={0.3}
            deviceCapability={deviceCapability}
            isDark={isDark}
          />
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center gap-4 mb-8">
            <h3 className={`text-3xl font-bold ${themeColors.text}`}>
              Programación
            </h3>
            <div
              className={`flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent`}
            />
          </div>
          <SkillGrid
            skills={DEV_SKILLS}
            delay={0.6}
            deviceCapability={deviceCapability}
            isDark={isDark}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;