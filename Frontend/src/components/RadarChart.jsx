"use client";
import { Radar } from "react-chartjs-2";
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
        backgroundColor: "rgba(34, 197, 94, 0.15)",
        borderColor: "#22c55e",
        pointBackgroundColor: "#22c55e",
        pointBorderColor: "#ffffff",
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#22c55e",
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
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#22c55e",
        bodyColor: "#e5e5e5",
        borderColor: "#22c55e",
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
          color: "rgba(34, 197, 94, 0.6)",
          backdropColor: "transparent",
          font: {
            size: 11,
          },
        },
        grid: {
          color: "rgba(34, 197, 94, 0.3)",
        },
        angleLines: {
          color: "rgba(34, 197, 94, 0.4)",
        },
        pointLabels: {
          color: "#e5e5e5",
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
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/50 to-emerald-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      {/* Main container - tamaño original */}
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 w-full h-[480px] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center gap-3 p-6 pb-4">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Habilidades Blandas</h3>
            <p className="text-sm text-green-400">Evaluación sobre 10 puntos</p>
          </div>
        </div>

        {/* Chart - ocupa el espacio restante */}
        <div className="flex-1 px-6 pb-4">
          <div className="w-full h-full">
            <Radar data={data} options={options} />
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 pt-2">
          <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/30">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Puntuación promedio</span>
              <span className="text-green-400 font-bold">9.2/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadarChart;