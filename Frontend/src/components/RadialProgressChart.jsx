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

  const baseCutout = 62;
  const cutoutStep = 12;

  const data = {
    datasets: skills.map((s, i) => ({
      label: s.label,
      data: [s.value, s.max - s.value],
      backgroundColor: [s.color, "#1f2937"], // fondo oscuro coherente
      borderWidth: 0,
      cutout: `${baseCutout - i * cutoutStep}%`,
      circumference: 360,
      rotation: -90,
      hoverOffset: 8, // se "acerca" al hacer hover
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      duration: 800,
      easing: "easeOutBack",
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.dataset.data[0];
            const max = skills.find((s) => s.label === label)?.max || 100;
            return `${label}: ${value}/${max}`;
          },
        },
        backgroundColor: "#1e293b",
        titleColor: "#22c55e",
        bodyColor: "#ffffff",
        borderColor: "#22c55e",
        borderWidth: 1,
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
  };

  return (
    <div
      className="
        bg-white/5 backdrop-blur-md rounded-2xl p-4
        shadow-lg w-full max-w-[430px]
        border border-green-500/30 flex flex-col items-center justify-center gap-4
        transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
      "
      style={{ height: "220px" }}
    >
      <h3 className="text-green-400 text-lg font-semibold mb-2 text-center leading-tight">
        {title}
      </h3>

      <div className="flex flex-row items-center justify-center w-full gap-4 flex-grow">
        <div
          className="relative flex-shrink-0 transition-transform duration-300"
          style={{
            maxWidth: "200px",
            maxHeight: "200px",
            width: "100%",
            height: "100%",
          }}
        >
          <Doughnut data={data} options={options} />
        </div>

        <div className="flex flex-col space-y-2 text-xs text-white/80 max-w-[120px]">
          {skills.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: s.color }}
              ></span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadialProgressChart;
