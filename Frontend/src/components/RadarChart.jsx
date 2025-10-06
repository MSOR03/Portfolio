"use client";
import { Radar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detectar tema actual
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDarkMode(isDark);
    };

    checkTheme();
    
    // Observer para cambios de tema
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class']
    });

    // Listener para cambios de preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkTheme);
    };
  }, []);

  const data = {
    labels: [
      "Trabajo en equipo",
      "Comunicación", 
      "Responsabilidad",
      "Liderazgo",
      "Adaptabilidad",
      "Pensamiento crítico",
    ],
    datasets: [
      {
        label: "Habilidades blandas",
        data: [10, 9, 9, 8, 10, 9],
        backgroundColor: isDarkMode 
          ? "rgba(34, 197, 94, 0.15)" 
          : "rgba(34, 197, 94, 0.12)",
        borderColor: isDarkMode 
          ? "#22c55e" 
          : "#16a34a",
        pointBackgroundColor: isDarkMode 
          ? "#22c55e" 
          : "#16a34a",
        pointBorderColor: isDarkMode 
          ? "#ffffff" 
          : "#ffffff",
        pointHoverBackgroundColor: isDarkMode 
          ? "#ffffff" 
          : "#ffffff",
        pointHoverBorderColor: isDarkMode 
          ? "#22c55e" 
          : "#16a34a",
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBorderWidth: 2,
        borderWidth: 2,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDarkMode 
          ? "rgba(17, 24, 39, 0.95)" 
          : "rgba(255, 255, 255, 0.95)",
        titleColor: isDarkMode 
          ? "#22c55e" 
          : "#16a34a",
        bodyColor: isDarkMode 
          ? "#e5e5e5" 
          : "#374151",
        borderColor: isDarkMode 
          ? "#22c55e" 
          : "#16a34a",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw}/10`,
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 2,
          color: isDarkMode 
            ? "rgba(34, 197, 94, 0.6)" 
            : "rgba(22, 163, 74, 0.7)",
          backdropColor: "transparent",
          font: {
            size: 11,
            weight: "500",
          },
        },
        grid: {
          color: isDarkMode 
            ? "rgba(34, 197, 94, 0.3)" 
            : "rgba(34, 197, 94, 0.25)",
        },
        angleLines: {
          color: isDarkMode 
            ? "rgba(34, 197, 94, 0.4)" 
            : "rgba(34, 197, 94, 0.3)",
        },
        pointLabels: {
          color: isDarkMode 
            ? "#e5e5e5" 
            : "#374151",
          font: { 
            size: 12,
            weight: "500"
          },
        },
      },
    },
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
    interaction: {
      intersect: false,
    },
  };

  return (
    <div className="group relative w-full">
      {/* Glow effect - adaptado para ambos temas */}
      <div className={`
        absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500
        ${isDarkMode 
          ? 'bg-gradient-to-r from-green-500/50 to-emerald-500/50' 
          : 'bg-gradient-to-r from-green-400/40 to-emerald-400/40'
        }
      `}></div>
      
      {/* Main container */}
      <div className={`
        relative backdrop-blur-xl rounded-2xl shadow-xl w-full h-[480px] flex flex-col transition-all duration-300
        ${isDarkMode 
          ? 'bg-gray-900/80 border border-gray-700/50' 
          : 'bg-white/90 border border-green-200/40 shadow-[0_8px_32px_rgba(34,197,94,0.08)]'
        }
      `}>
        
        {/* Header */}
        <div className="flex items-center gap-3 p-6 pb-4">
          <div className={`
            w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300
            ${isDarkMode 
              ? 'bg-green-500/20' 
              : 'bg-green-100 border border-green-200/50'
            }
          `}>
            <svg 
              className={`
                w-5 h-5 transition-colors duration-300
                ${isDarkMode ? 'text-green-400' : 'text-green-600'}
              `} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h3 className={`
              text-lg font-bold transition-colors duration-300
              ${isDarkMode ? 'text-white' : 'text-gray-800'}
            `}>
              Habilidades Blandas
            </h3>
            <p className={`
              text-sm transition-colors duration-300
              ${isDarkMode ? 'text-green-400' : 'text-green-600'}
            `}>
              Evaluación sobre 10 puntos
            </p>
          </div>
        </div>

        {/* Chart - ocupa el espacio restante */}
        <div className="flex-1 px-6 pb-4">
          <div className="w-full h-full">
            <Radar data={data} options={options} key={isDarkMode ? 'dark' : 'light'} />
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 pt-2">
          <div className={`
            rounded-lg p-4 transition-all duration-300
            ${isDarkMode 
              ? 'bg-gray-800/40 border border-gray-700/30' 
              : 'bg-green-50/60 border border-green-200/30 backdrop-blur-sm'
            }
          `}>
            <div className="flex items-center justify-between">
              <span className={`
                text-sm transition-colors duration-300
                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
              `}>
                Puntuación promedio
              </span>
              <span className={`
                font-bold transition-colors duration-300
                ${isDarkMode ? 'text-green-400' : 'text-green-600'}
              `}>
                9.2/10
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarChart;