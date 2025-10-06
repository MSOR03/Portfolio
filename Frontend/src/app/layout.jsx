import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import { ThemeProvider } from "next-themes";
import ThemeSync from "@/components/ThemeSync";

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
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.variable} antialiased theme-transition`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
          themes={["light", "dark"]}
        >
          {/* Componente para sincronizar temas */}
          <ThemeSync />

          {/* Contenedor principal con clase condicional */}
          <div className="relative flex flex-col min-h-screen z-10">
            {/* Header con estilos adaptativos */}
            <Header className="relative z-50 backdrop-blur-md bg-black/20 dark:bg-black/20 bg-white/80 border-b border-green-500/20 dark:border-green-500/20 border-green-500/10" />

            <main className="flex-grow relative z-10">
              <StairTransition />
              <PageTransition>
                <div className="relative">
                  {/* Líneas animadas adaptativas */}
                  <div className="absolute inset-0 -z-10 pointer-events-none">
                    <div className="absolute top-20 left-10 w-32 h-px bg-gradient-to-r from-transparent via-green-400/30 dark:via-green-400/30 via-green-400/20 to-transparent motion-safe:animate-pulse" />
                    <div className="absolute top-40 right-20 w-24 h-px bg-gradient-to-r from-transparent via-green-300/20 dark:via-green-300/20 via-green-300/15 to-transparent motion-safe:animate-pulse-slow" />
                    <div className="absolute bottom-32 left-1/4 w-40 h-px bg-gradient-to-r from-transparent via-emerald-400/25 dark:via-emerald-400/25 via-emerald-400/15 to-transparent motion-safe:animate-pulse-slower" />
                  </div>
                </div>
              </PageTransition>
            </main>
            {children}
            {/* Footer con estilos adaptativos */}
            <Footer className="relative z-50 backdrop-blur-md bg-black/20 dark:bg-black/20 bg-white/80 border-t border-green-500/20 dark:border-green-500/20 border-green-500/10" />
          </div>

          {/* Partículas adaptativas */}
          <div className="fixed inset-0 -z-20 pointer-events-none">
            {[0, 2, 4, 1, 3].map((delay, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-green-400/50 dark:bg-green-400/50 bg-green-400/30 rounded-full motion-safe:animate-floating"
                style={{
                  top: `${25 + i * 10}%`,
                  left: `${20 + (i % 2 === 0 ? 30 : -10)}%`,
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
            <div className="absolute top-1/6 right-1/6 w-2 h-2 bg-green-400/30 dark:bg-green-400/30 bg-green-400/20 rounded-full blur-sm motion-safe:animate-pulse-slow" />
            <div className="absolute bottom-1/3 left-1/6 w-2 h-2 bg-emerald-400/25 dark:bg-emerald-400/25 bg-emerald-400/15 rounded-full blur-sm motion-safe:animate-pulse-slower" />
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-green-400/30 dark:bg-green-400/30 bg-green-400/20 rounded-full blur-sm motion-safe:animate-pulse-slow" />
          </div>

          {/* Efectos de luz adaptativos */}
          <div className="fixed inset-0 -z-40 pointer-events-none">
            <div className="absolute top-0 left-0 w-72 h-72 bg-green-400/10 dark:bg-green-400/10 bg-green-400/5 rounded-full blur-3xl motion-safe:animate-pulse-slow" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400/8 dark:bg-emerald-400/8 bg-emerald-400/4 rounded-full blur-3xl motion-safe:animate-pulse-slower" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-300/5 dark:bg-green-300/5 bg-green-300/3 rounded-full blur-2xl motion-safe:animate-floating" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
