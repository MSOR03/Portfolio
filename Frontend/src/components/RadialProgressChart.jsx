"use client";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const RadialProgressChart = ({ title, skills }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const baseCutout = 65;
  const cutoutStep = 15;

  const data = {
    datasets: skills.map((s, i) => ({
      label: s.label,
      data: [s.value, s.max - s.value],
      backgroundColor: [s.color, "#0f1419"],
      hoverBackgroundColor: [s.color, "#0f1419"],
      borderWidth: 0,
      cutout: `${baseCutout - i * cutoutStep}%`,
      circumference: 360,
      rotation: -90,
      hoverOffset: 0,
    })),
  };

  const options = {
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
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        titleColor: "#22c55e",
        bodyColor: "#e5e5e5",
        borderColor: "#22c55e",
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
  };

  const averageScore = skills.length > 0
    ? (skills.reduce((sum, skill) => sum + (skill.value / skill.max) * 100, 0) / skills.length).toFixed(1)
    : 0;

  return (
    <div className="group relative w-full max-w-[360px] mx-auto">
      {/* Glow effect alineado */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/30 to-emerald-500/30 blur-sm scale-105 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

      {/* Main container */}
      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/50 w-full h-[230px] flex flex-col">

        {/* Título */}
        <div className="px-3 pt-3">
          <h3 className="text-green-400 text-sm font-bold text-center leading-tight tracking-wide">
            {title}
          </h3>
        </div>

        {/* Contenido */}
        <div className="flex-1 px-3 pt-2 pb-1">
          <div className="flex flex-row items-center justify-center w-full h-full gap-3">
            
            {/* Gráfico */}
            <div
              className="relative transition-all duration-500 hover:scale-105"
              style={{ width: "110px", height: "110px" }}
            >
              <Doughnut data={data} options={options} />
              {/* Centro decorativo */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg opacity-80" />
              </div>
            </div>

            {/* Leyenda */}
            <div className="flex flex-col space-y-1 text-xs text-slate-300 max-w-[120px]">
              {skills.map((s) => {
                const percentage = Math.round((s.value / s.max) * 100);
                return (
                  <div
                    key={s.label}
                    className="flex items-center gap-2 group cursor-pointer hover:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="group-hover:text-green-400 font-medium">
                        {s.label}
                      </span>
                    </div>
                    <span className="ml-auto text-slate-400 font-mono">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer promedio */}
        <div className="px-3 pb-3">
          <div className="bg-gray-800/40 rounded-md px-3 py-2 border border-gray-700/30">
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span>Promedio</span>
              <span className="text-green-400 font-bold">{averageScore}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadialProgressChart;
