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
        data: [8, 7, 9, 6, 8, 7],
        backgroundColor: "rgba(34, 197, 94, 0.15)",
        borderColor: "#22c55e",
        pointBackgroundColor: "#22c55e",
        pointBorderColor: "#ffffff",
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#22c55e",
        pointRadius: 5,
        pointHoverRadius: 9,
        pointBorderWidth: 2,
        pointHoverBorderWidth: 3,
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 2,
          color: "#a3f7bf",
          backdropColor: "transparent",
        },
        grid: {
          color: "rgba(34, 197, 94, 0.2)",
          circular: true,
        },
        angleLines: {
          color: "rgba(34, 197, 94, 0.4)",
        },
        pointLabels: {
          color: "#e5e5e5",
          font: { size: 13, weight: "500" },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#22c55e",
          font: { size: 14, weight: "bold" },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw}/10`,
        },
      },
    },
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
    hover: {
      mode: "nearest",
      intersect: true,
      animationDuration: 400,
    },
  };

  return (
    <div
      className="
        bg-white/5 backdrop-blur-md rounded-2xl p-6 
        shadow-lg w-full h-[450px] border border-green-500/30 
        flex flex-col items-center justify-center cursor-default
        transition-all duration-300 ease-in-out
        hover:shadow-xl hover:scale-[1.02] hover:border-green-400
      "
    >
      <h3 className="text-green-400 text-lg font-semibold mb-4 text-center">
        Habilidades Blandas
      </h3>
      <div className="w-full h-full">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default RadarChart;
