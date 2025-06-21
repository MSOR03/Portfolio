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
  title: "Sebastian Olarte",
  description: "Ingeniero Topográfico e Ingeniero de Sistemas - Desarrollo de Software y Soluciones Digitales",
  icons: {
    icon: [{ url: "/assets/Logo.png", sizes: "48x48", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={jetbrainsMono.variable}>
        {/* Sistema de fondo multicapa mejorado */}
        <div className="fixed inset-0 -z-20 pointer-events-none">
          {/* Capa base con gradiente oscuro */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
          
          {/* Capa de anillos concéntricos principales */}
          <div className="absolute inset-0 bg-particles" />
          
          {/* Capa adicional de brillo ambiental */}
          <div className="absolute inset-0 bg-gradient-radial from-green-500/5 via-transparent to-transparent opacity-60" />
          
          {/* Overlay sutil para mejor contraste del texto */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Efectos de luz dinámicos */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          {/* Luz superior izquierda */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-pulse-slow" />
          
          {/* Luz inferior derecha */}
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl animate-pulse-slower" />
          
          {/* Luz central móvil */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-300/5 rounded-full blur-2xl animate-floating" />
        </div>

        {/* Contenedor principal con efectos */}
        <div className="relative min-h-screen flex flex-col">
          {/* Header con efecto glassmorphism */}
          <Header className="relative z-50 backdrop-blur-md bg-black/20 border-b border-green-500/20" />
          
          {/* Contenido principal */}
          <main className="flex-grow relative z-10">
            <StairTransition />
            <PageTransition>
              <div className="relative">
                {/* Efectos adicionales para el contenido */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                  {/* Líneas de escaneado sutiles */}
                  <div className="absolute top-20 left-10 w-32 h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent animate-pulse" />
                  <div className="absolute top-40 right-20 w-24 h-px bg-gradient-to-r from-transparent via-green-300/20 to-transparent animate-pulse-slow" />
                  <div className="absolute bottom-32 left-1/4 w-40 h-px bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent animate-pulse-slower" />
                </div>
                
                {children}
              </div>
            </PageTransition>
          </main>
          
          {/* Footer con efectos similares */}
          <Footer className="relative z-50 backdrop-blur-md bg-black/20 border-t border-green-500/20" />
        </div>

        {/* Efectos de partículas flotantes adicionales */}
        <div className="fixed inset-0 -z-5 pointer-events-none">
          {/* Partículas pequeñas */}
          <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-green-400/60 rounded-full animate-floating" style={{animationDelay: '0s'}} />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-emerald-400/50 rounded-full animate-floating" style={{animationDelay: '2s'}} />
          <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-green-300/70 rounded-full animate-floating" style={{animationDelay: '4s'}} />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-green-500/40 rounded-full animate-floating" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-emerald-300/60 rounded-full animate-floating" style={{animationDelay: '3s'}} />
          
          {/* Partículas medianas con brillo */}
          <div className="absolute top-1/6 right-1/6 w-2 h-2 bg-green-400/30 rounded-full blur-sm animate-pulse-slow glow-green" />
          <div className="absolute bottom-1/3 left-1/6 w-2 h-2 bg-emerald-400/25 rounded-full blur-sm animate-pulse-slower glow-green" />
        </div>

        {/* Script para efectos interactivos adicionales */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Efecto de seguimiento del mouse para partículas
              document.addEventListener('mousemove', (e) => {
                const particles = document.querySelectorAll('.mouse-particle');
                particles.forEach((particle, index) => {
                  const speed = (index + 1) * 0.02;
                  const x = e.clientX * speed;
                  const y = e.clientY * speed;
                  particle.style.transform = \`translate(\${x}px, \${y}px)\`;
                });
              });

              // Efecto de hover para cards
              document.addEventListener('DOMContentLoaded', () => {
                const cards = document.querySelectorAll('.card-glow');
                cards.forEach(card => {
                  card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-8px) scale(1.02)';
                  });
                  card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                  });
                });
              });
            `,
          }}
        />
      </body>
    </html>
  );
}