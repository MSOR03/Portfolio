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
  weight: ["400", "500", "600", "700"], // Reduced from 8 weights to 4 for better performance
  variable: "--font-jetbrainsMono",
  display: "swap", // Improve font loading performance
});

export const metadata = {
  title: "Sebastián Olarte",
  description:
    "Ingeniero Topográfico e Ingeniero de Sistemas - Desarrollo de Software y Soluciones Digitales",
  icons: {
    icon: [{ url: "/assets/Logo.avif", sizes: "48x48", type: "image/avif" }],
  },
  other: {
    // Preload critical resources for LCP
    "preload-image": "/assets/Photo.avif",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preload critical LCP image */}
        <link
          rel="preload"
          href="/assets/Photo.avif"
          as="image"
          fetchPriority="high"
          type="image/avif"
        />
        {/* Preload logo */}
        <link
          rel="preload"
          href="/assets/Logo.avif"
          as="image"
          fetchPriority="high"
          type="image/avif"
        />
        {/* Preconnect a orígenes críticos para reducir latencia */}
        <link rel="preconnect" href="https://events.mapbox.com" />
        <link rel="preconnect" href="https://portfolio-so.onrender.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        {/* Script MEJORADO para prevenir FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const theme = stored && stored !== 'system' ? stored : systemPreference;
                  
                  // Aplicar inmediatamente ANTES de cualquier render
                  const root = document.documentElement;
                  root.classList.remove('light', 'dark');
                  root.classList.add(theme);
                  root.setAttribute('data-theme', theme);
                  root.style.colorScheme = theme;
                } catch (e) {
                  // Fallback a dark si hay error
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange={true}
          themes={["light", "dark"]}
          storageKey="theme"
        >
          {/* Sincronizar temas */}
          <ThemeSync />

          {/* Contenedor principal */}
          <div className="relative flex flex-col min-h-screen z-10">
            <Header />

            <main className="flex-grow relative z-10">
              <StairTransition />
              <PageTransition>
                <div className="relative">
                  {/* Líneas animadas adaptativas - DESHABILITADAS EN MÓVIL */}
                  <div className="absolute inset-0 -z-10 pointer-events-none hidden md:block">
                    <div className="absolute top-20 left-10 w-32 h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent motion-safe:animate-pulse" />
                    <div className="absolute top-40 right-20 w-24 h-px bg-gradient-to-r from-transparent via-green-300/20 to-transparent motion-safe:animate-pulse-slow" />
                    <div className="absolute bottom-32 left-1/4 w-40 h-px bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent motion-safe:animate-pulse-slower" />
                  </div>
                  {children}
                </div>
              </PageTransition>
            </main>

            <Footer />
          </div>

          {/* Partículas adaptativas - DESHABILITADAS EN MÓVIL para mejor rendimiento */}
          <div className="fixed inset-0 -z-20 pointer-events-none hidden md:block">
            {[0, 2, 4, 1, 3].map((delay, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-green-400/50 dark:bg-green-400/50 rounded-full motion-safe:animate-floating"
                style={{
                  top: `${25 + i * 10}%`,
                  left: `${20 + (i % 2 === 0 ? 30 : -10)}%`,
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
            <div className="absolute top-1/6 right-1/6 w-2 h-2 bg-green-400/30 rounded-full blur-sm motion-safe:animate-pulse-slow" />
            <div className="absolute bottom-1/3 left-1/6 w-2 h-2 bg-emerald-400/25 rounded-full blur-sm motion-safe:animate-pulse-slower" />
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-green-400/30 rounded-full blur-sm motion-safe:animate-pulse-slow" />
          </div>

          {/* Efectos de luz adaptativos - DESHABILITADOS EN MÓVIL */}
          <div className="fixed inset-0 -z-40 pointer-events-none hidden md:block">
            <div className="absolute top-0 left-0 w-72 h-72 bg-green-400/10 rounded-full blur-3xl motion-safe:animate-pulse-slow" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400/8 rounded-full blur-3xl motion-safe:animate-pulse-slower" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-green-300/5 rounded-full blur-2xl motion-safe:animate-floating" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}