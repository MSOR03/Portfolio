/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{js,jsx}",
  "./components/**/*.{js,jsx}",
  "./app/**/*.{js,jsx}",
  "./src/**/*.{js,jsx}",
];
export const theme = {
  container: {
    center: true,
    padding: "15px",
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
  },
  fontFamily: {
    primary: "var(--font-primary)", // Usamos variable para flexibilidad
  },
  extend: {
    colors: {
      primary: "#101311", // Un negro verdoso profundo y elegante
      accent: {
        DEFAULT: "#2df3b9", // Verde neón suave
        hover: "#2bd8a4", // Hover más sutil
      },
      muted: "#1a1f1d", // Para backgrounds suaves
      text: "#E6FFE5", // Texto claro pero no blanco puro
    },

    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      fadeInUp: {
        "0%": {
          opacity: 0,
          transform: "translateY(20px)",
        },
        "100%": {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
    },

    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      fadeInUp: "fadeInUp 0.6s ease-out both",
    },

    borderRadius: {
      xl: "1rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
    },

    boxShadow: {
      neon: "0 0 10px #2df3b9, 0 0 20px #2df3b9",
    },
  },
};
export const plugins = [require("tailwindcss-animate")];
