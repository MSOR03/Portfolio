"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useTheme } from "next-themes"; // 👈 Importar hook

ChartJS.register(ArcElement, Tooltip, Legend);

const RadialProgressChart = ({ title, skills }) => {
  const { theme } = useTheme(); // 👈 Obtener tema real
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Definir colores del tema de forma optimizada
  const themeColors = useMemo(() => {
    const isDark = theme === "dark";
    return {
      // Contenedor principal
      background: isDark ? "rgba(17, 24, 39, 0.8)" : "rgba(255, 255, 255, 0.95)",
      border: isDark ? "rgba(55, 65, 81, 0.5)" : "rgba(209, 213, 219, 0.6)",

      // Textos
      text: {
        primary: isDark ? "#22c55e" : "#16a34a",
        secondary: isDark ? "#e5e5e5" : "#1f2937",
        muted: isDark ? "#94a3b8" : "#6b7280",
      },

      // Gráfico
      chart: {
        empty: isDark ? "#0f1419" : "#e5e7eb",
        center: isDark
          ? "linear-gradient(135deg, #22c55e, #16a34a)"
          : "linear-gradient(135deg, #16a34a, #15803d)",
      },

      // Efectos
      glow: isDark
        ? "from-green-500/30 to-emerald-500/30"
        : "from-green-500/20 to-emerald-500/20",

      // Footer
      footer: isDark ? "rgba(31, 41, 55, 0.4)" : "rgba(243, 244, 246, 0.8)",
      footerBorder: isDark ? "rgba(55, 65, 81, 0.3)" : "rgba(209, 213, 219, 0.4)",

      // Tooltip
      tooltip: {
        background: isDark ? "rgba(17, 24, 39, 0.95)" : "rgba(255, 255, 255, 0.95)",
        title: isDark ? "#22c55e" : "#16a34a",
        body: isDark ? "#e5e5e5" : "#1f2937",
        border: isDark ? "#22c55e" : "#16a34a",
      },
    };
  }, [theme]);

  // Datos del gráfico optimizados con useMemo
  const chartData = useMemo(() => {
    const baseCutout = 65;
    const cutoutStep = 15;

    return {
      datasets: skills.map((s, i) => ({
        label: s.label,
        data: [s.value, s.max - s.value],
        backgroundColor: [s.color, themeColors.chart.empty],
        hoverBackgroundColor: [s.color, themeColors.chart.empty],
        borderWidth: 0,
        cutout: `${baseCutout - i * cutoutStep}%`,
        circumference: 360,
        rotation: -90,
        hoverOffset: 0,
      })),
    };
  }, [skills, themeColors.chart.empty]);

  // Opciones del gráfico optimizadas con useCallback
  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      duration: 1200,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: themeColors.tooltip.background,
        titleColor: themeColors.tooltip.title,
        bodyColor: themeColors.tooltip.body,
        borderColor: themeColors.tooltip.border,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context) => context[0].dataset.label,
          label: (context) => {
            const value = context.dataset.data[0];
            const max = skills.find((s) => s.label === context.dataset.label)?.max || 100;
            const percentage = Math.round((value / max) * 100);
            return `${percentage}% (${value}/${max})`;
          },
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  }), [skills, themeColors]);

  // Calcular promedio optimizado
  const averageScore = useMemo(() => {
    if (skills.length === 0) return 0;
    const total = skills.reduce((sum, skill) => sum + (skill.value / skill.max) * 100, 0);
    return (total / skills.length).toFixed(1);
  }, [skills]);

  // Renderizar item de leyenda optimizado
  const renderLegendItem = useCallback((skill) => {
    const percentage = Math.round((skill.value / skill.max) * 100);
    return (
      <div
        key={skill.label}
        className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full transition-transform duration-200 group-hover:scale-110"
            style={{ backgroundColor: skill.color }}
          />
          <span 
            className={`font-medium transition-colors duration-200 ${
              theme === 'dark' 
                ? 'group-hover:text-green-400' 
                : 'group-hover:text-green-600'
            }`}
          >
            {skill.label}
          </span>
        </div>
        <span className={`ml-auto font-mono text-xs`} style={{ color: themeColors.text.muted }}>
          {percentage}%
        </span>
      </div>
    );
  }, [theme, themeColors.text.muted]);

  if (!isClient) return null;

  return (
    <div className="group relative w-full max-w-[360px] mx-auto">
      {/* Efecto de brillo optimizado */}
      <div 
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${themeColors.glow} blur-sm scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      {/* Contenedor principal con diseño pegado */}
      <div 
        className={`relative backdrop-blur-xl rounded-2xl shadow-xl border w-full flex flex-col overflow-hidden transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-900 bg-opacity-80 border-gray-700 border-opacity-50' 
            : 'bg-white bg-opacity-95 border-gray-300 border-opacity-60'
        }`}
      >
        {/* Título */}
        <div className="px-4 pt-4 pb-2">
          <h3 
            className="text-sm font-bold text-center leading-tight tracking-wide transition-colors duration-300"
            style={{ color: themeColors.text.primary }}
          >
            {title}
          </h3>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 px-4 pb-2">
          <div className="flex flex-row items-center justify-center w-full h-full gap-4">
            
            {/* Gráfico */}
            <div
              className="relative transition-all duration-300 hover:scale-105 flex-shrink-0"
              style={{ width: "120px", height: "120px" }}
            >
              <Doughnut data={chartData} options={chartOptions} />
              
              {/* Centro decorativo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div 
                  className="w-6 h-6 rounded-full shadow-lg opacity-90 transition-all duration-300 group-hover:scale-110"
                  style={{ background: themeColors.chart.center }}
                />
              </div>
            </div>

            {/* Leyenda */}
            <div className="flex flex-col space-y-2 text-xs flex-1 min-w-0" style={{ color: themeColors.text.secondary }}>
              {skills.map(renderLegendItem)}
            </div>
          </div>
        </div>

        {/* Footer con promedio */}
        <div className="px-4 pb-4">
          <div 
            className={`rounded-lg px-3 py-2 border transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-800/40 border-gray-700/30' 
                : 'bg-gray-50/80 border-gray-200/40'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: themeColors.text.secondary }}>
                Promedio
              </span>
              <span 
                className="font-bold transition-colors duration-300"
                style={{ color: themeColors.text.primary }}
              >
                {averageScore}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadialProgressChart;
