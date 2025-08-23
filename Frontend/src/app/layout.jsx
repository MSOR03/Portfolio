import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
});

export const metadata = {
  title: "Sebastián Olarte",
  description:
    "Ingeniero Topográfico e Ingeniero de Sistemas - Desarrollo de Software y Soluciones Digitales",
  icons: {
    icon: [{ url: "/assets/Logo.png", sizes: "48x48", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${jetbrainsMono.variable} text-white bg-black`}>
        {/* Fondo principal */}
        <div className="fixed inset-0 -z-50 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
          <div className="absolute inset-0 bg-particles" />
          <div className="absolute inset-0 bg-gradient-radial from-green-500/5 via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Efectos de luz con motion-safe */}
        <div className="fixed inset-0 -z-40 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-400/10 rounded-full blur-3xl motion-safe:animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400/8 rounded-full blur-3xl motion-safe:animate-pulse-slower" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-300/5 rounded-full blur-2xl motion-safe:animate-floating" />
        </div>

        {/* Contenedor principal */}
        <div className="relative flex flex-col min-h-screen z-10">
          <Header className="relative z-50 backdrop-blur-md bg-black/20 border-b border-green-500/20" />
          <main className="flex-grow relative z-10">
            <StairTransition />
            <PageTransition>
              <div className="relative">
                {/* Líneas animadas */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                  <div className="absolute top-20 left-10 w-32 h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent motion-safe:animate-pulse" />
                  <div className="absolute top-40 right-20 w-24 h-px bg-gradient-to-r from-transparent via-green-300/20 to-transparent motion-safe:animate-pulse-slow" />
                  <div className="absolute bottom-32 left-1/4 w-40 h-px bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent motion-safe:animate-pulse-slower" />
                </div>

                {children}
              </div>
            </PageTransition>
          </main>
          <Footer className="relative z-50 backdrop-blur-md bg-black/20 border-t border-green-500/20" />
        </div>

        {/* Partículas flotantes */}
        <div className="fixed inset-0 -z-20 pointer-events-none">
          {/* motion-safe evita animaciones en usuarios que las desactiven */}
          {[0, 2, 4, 1, 3].map((delay, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400/50 rounded-full motion-safe:animate-floating"
              style={{
                top: `${25 + i * 10}%`,
                left: `${20 + (i % 2 === 0 ? 30 : -10)}%`,
                animationDelay: `${delay}s`,
              }}
            />
          ))}

          <div className="absolute top-1/6 right-1/6 w-2 h-2 bg-green-400/30 rounded-full blur-sm motion-safe:animate-pulse-slow" />
          <div className="absolute bottom-1/3 left-1/6 w-2 h-2 bg-emerald-400/25 rounded-full blur-sm motion-safe:animate-pulse-slower" />
        </div>
      </body>
    </html>
  );
}
