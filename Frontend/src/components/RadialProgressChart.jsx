"use client";
import { useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTheme } from "next-themes";

ChartJS.register(ArcElement, Tooltip, Legend);

// ⚡ Cargar Chart.js dinámicamente (sin SSR)
const Doughnut = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  { ssr: false }
);

const RadialProgressChart = ({ title, skills }) => {
  const { theme } = useTheme();

  // 🎨 Colores - calculados una sola vez según tema
  const themeColors = useMemo(() => {
    const isDark = theme === "dark";
    return {
      background: isDark ? "rgba(17, 24, 39, 0.6)" : "rgba(255, 255, 255, 0.9)",
      border: isDark ? "rgba(55, 65, 81, 0.4)" : "rgba(209, 213, 219, 0.5)",
      text: {
        primary: isDark ? "#22c55e" : "#16a34a",
        secondary: isDark ? "#e5e5e5" : "#1f2937",
        muted: isDark ? "#94a3b8" : "#6b7280",
      },
      chart: { empty: isDark ? "#1f2937" : "#e5e7eb" },
      tooltip: {
        background: isDark ? "rgba(17, 24, 39, 0.95)" : "rgba(255, 255, 255, 0.95)",
        title: isDark ? "#22c55e" : "#16a34a",
        body: isDark ? "#e5e5e5" : "#1f2937",
        border: isDark ? "#22c55e" : "#16a34a",
      },
    };
  }, [theme]);

  // 📊 Datos del gráfico
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

  // ⚙️ Opciones del gráfico
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: false, // 🔥 sin animación para performance
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
              const max = skills.find(
                (s) => s.label === context.dataset.label
              )?.max || 100;
              const percentage = Math.round((value / max) * 100);
              return `${percentage}% (${value}/${max})`;
            },
          },
        },
      },
    }),
    [skills, themeColors]
  );

  // 📌 Promedio
  const averageScore = useMemo(() => {
    if (!skills.length) return 0;
    const total = skills.reduce(
      (sum, skill) => sum + (skill.value / skill.max) * 100,
      0
    );
    return (total / skills.length).toFixed(1);
  }, [skills]);

  // 🔖 Render leyenda
  const renderLegendItem = useCallback(
    (skill) => {
      const percentage = Math.round((skill.value / skill.max) * 100);
      return (
        <div key={skill.label} className="flex items-center gap-2">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: skill.color }}
          />
          <span
            className="font-medium text-sm truncate"
            style={{ color: themeColors.text.secondary }}
          >
            {skill.label}
          </span>
          <span
            className="ml-auto font-mono text-xs"
            style={{ color: themeColors.text.muted }}
          >
            {percentage}%
          </span>
        </div>
      );
    },
    [themeColors]
  );

  return (
    <div className="group relative w-full max-w-[360px] mx-auto">
      <div
        className="relative rounded-2xl border transition-all duration-300 p-4"
        style={{
          background: themeColors.background,
          borderColor: themeColors.border,
        }}
      >
        {/* Título */}
        <h3
          className="text-sm font-bold text-center mb-4"
          style={{ color: themeColors.text.primary }}
        >
          {title}
        </h3>

        {/* Contenido */}
        <div className="flex items-center justify-center gap-4">
          {/* Gráfico */}
          <div className="relative" style={{ width: "120px", height: "120px" }}>
            <Doughnut data={chartData} options={chartOptions} />
          </div>

          {/* Leyenda */}
          <div className="flex flex-col space-y-2 text-xs flex-1 min-w-0">
            {skills.map(renderLegendItem)}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 rounded-lg px-3 py-2 border"
          style={{
            background: theme === "dark" ? "rgba(31,41,55,0.4)" : "rgba(243,244,246,0.8)",
            borderColor: theme === "dark" ? "rgba(55,65,81,0.3)" : "rgba(209,213,219,0.4)",
          }}>
          <div className="flex items-center justify-between text-xs">
            <span style={{ color: themeColors.text.secondary }}>Promedio</span>
            <span
              className="font-bold"
              style={{ color: themeColors.text.primary }}
            >
              {averageScore}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadialProgressChart;
