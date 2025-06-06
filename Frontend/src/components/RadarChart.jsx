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

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

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
        backgroundColor: "rgba(34, 197, 94, 0.15)",  // Verde translúcido
        borderColor: "#22c55e",                      // Verde vibrante
        pointBackgroundColor: "#22c55e",
        pointBorderColor: "#ffffff",                 // Puntos con borde blanco
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#22c55e",
        borderWidth: 2,
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
          z: 1,
        },
        grid: {
          color: "rgba(34, 197, 94, 0.2)", // Líneas verdes translúcidas
          circular: true,
        },
        angleLines: {
          color: "rgba(34, 197, 94, 0.4)", // Líneas radiales verdes más marcadas
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
    },
  };

  return (
    <div
      className="
        bg-white/5 backdrop-blur-md rounded-2xl p-4 
        shadow-lg w-full h-[350px] sm:h-[400px] md:h-[500px]
        border border-green-500/30
      "
    >
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;
