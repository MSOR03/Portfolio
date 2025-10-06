"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Nav from "./Nav.jsx";
import MobileNav from "./MobileNav.jsx";
import Image from "next/image.js";
import { Button } from "./ui/button.jsx";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <header className="sticky top-4 z-50">
      <div
        className={`
          container mx-auto max-w-7xl
          /* Fondo para tema oscuro */
          dark:bg-gradient-to-r dark:from-[#0a1410] dark:via-[#111916] dark:to-[#0a1410]
          /* Fondo para tema claro */
          bg-gradient-to-r from-white/95 via-[#f8fafb]/90 to-white/95
          ${isScrolled 
            ? 'dark:bg-opacity-95 bg-opacity-98 shadow-2xl dark:shadow-2xl shadow-[0_8px_32px_rgba(34,197,94,0.12)]' 
            : 'dark:bg-opacity-90 bg-opacity-85 shadow-md dark:shadow-md shadow-[0_4px_20px_rgba(34,197,94,0.08)]'
          }
          /* Bordes para ambos temas */
          border dark:border-green-700/30 border-green-500/20
          rounded-xl
          backdrop-blur-lg
          flex justify-between items-center
          py-4
          px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20
          gap-4
          transition-all duration-500 ease-in-out
          /* Efectos hover para ambos temas */
          hover:shadow-[0_8px_32px_rgba(34,197,94,0.15)]
          dark:hover:shadow-[0_8px_32px_rgba(34,197,94,0.15)]
          hover:shadow-[0_12px_40px_rgba(34,197,94,0.12)]
          hover:border-green-600/40 dark:hover:border-green-600/40
          hover:border-green-500/30
          relative
          overflow-hidden
          /* Soporte para glassmorphism mejorado */
          dark:backdrop-blur-lg backdrop-blur-md
        `}
      >
        {/* Efecto de brillo de fondo dinámico basado en mouse - NUEVO */}
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34,197,94,0.06), transparent 40%)`
          }}
        />
        
        {/* Efecto de brillo de fondo original */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 dark:via-green-500/5 via-green-400/3 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 ease-in-out" />
        
        {/* Partículas flotantes decorativas - ajustadas para tema claro */}
        <div className="absolute top-2 left-10 w-1 h-1 bg-green-400 dark:bg-green-400 bg-green-500 rounded-full animate-pulse opacity-60 dark:opacity-60 opacity-40" />
        <div className="absolute bottom-3 right-20 w-1 h-1 bg-green-300 dark:bg-green-300 bg-green-600 rounded-full animate-ping opacity-40 dark:opacity-40 opacity-30" />
        <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-green-500 dark:bg-green-500 bg-green-400 rounded-full animate-bounce opacity-50 dark:opacity-50 opacity-35" />

        {/* Logo */}
        <Link
          href="/"
          className="
            flex items-center gap-3
            transition-all duration-300 ease-in-out
            transform hover:scale-105
            select-none cursor-pointer
            relative z-10
          "
          aria-label="Homepage"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <div className="relative">
            {/* Anillo brillante alrededor del logo - adaptado para ambos temas */}
            <div className={`
              absolute -inset-1 rounded-full 
              bg-gradient-to-r from-green-400 to-green-600 
              dark:from-green-400 dark:to-green-600
              from-green-500 to-green-700
              opacity-0 transition-opacity duration-300 blur-sm
              ${isLogoHovered ? 'opacity-30 dark:opacity-30 opacity-20 animate-pulse' : ''}
            `} />
            
            <Image
              src="/assets/Logo.png"
              alt="LOGO"
              width={90}
              height={90}
              priority
              className={`
                rounded-full drop-shadow-lg relative z-10
                transition-all duration-300 ease-in-out
                ${isLogoHovered 
                  ? 'brightness-110 shadow-[0_0_20px_rgba(34,197,94,0.4)] dark:shadow-[0_0_20px_rgba(34,197,94,0.4)] shadow-[0_0_16px_rgba(34,197,94,0.3)]' 
                  : ''
                }
              `}
            />
            
            {/* Efecto de rotación sutil en hover - mejorado para tema claro */}
            <div className={`
              absolute inset-0 rounded-full border-2 
              border-green-400/20 dark:border-green-400/20 border-green-500/15
              transition-transform duration-500 ease-in-out
              ${isLogoHovered 
                ? 'rotate-180 border-green-400/40 dark:border-green-400/40 border-green-500/30' 
                : ''
              }
            `} />
          </div>

          <div className="flex flex-col">
            <p className={`
              text-lg font-semibold select-none
              text-green-500 dark:text-green-500 text-green-600 whitespace-nowrap
              transition-all duration-300 ease-in-out
              cursor-pointer
              group-hover:text-shadow-sm
              ${isLogoHovered 
                ? 'text-green-400 dark:text-green-400 text-green-500 tracking-wider animate-pulse' 
                : ''
              }
            `}>
              SOR<span className={`
                transition-all duration-300 ease-in-out
                inline-block
                ${isLogoHovered 
                  ? 'text-green-300 dark:text-green-300 text-green-400 drop-shadow-glow scale-110 animate-bounce' 
                  : 'text-green-400 dark:text-green-400 text-green-500'
                }
              `}>.</span>
            </p>
            
            {/* Línea decorativa debajo del logo */}
            <div className={`
              h-0.5 bg-gradient-to-r 
              from-green-500 to-transparent
              dark:from-green-500 dark:to-transparent
              from-green-600 to-transparent
              transition-all duration-300 ease-in-out
              ${isLogoHovered ? 'w-full opacity-100' : 'w-0 opacity-0'}
            `} />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium relative z-10">
          <Nav />
          
          <ScrollLink
            to="contact"
            smooth={true}
            duration={1000}
            offset={-80}
            className="group relative"
          >
            <Button
              variant="outline"
              size="sm"
              className="
                uppercase flex items-center gap-2
                /* Estilos para tema oscuro */
                dark:border dark:border-green-500/60 dark:text-green-400
                dark:bg-gradient-to-r dark:from-[#0b1512] dark:to-[#0a1410]
                dark:bg-opacity-80
                /* Estilos para tema claro */
                border border-green-500/40 text-green-600
                bg-gradient-to-r from-white/90 via-[#f0fdf4]/85 to-white/90
                /* Efectos hover para tema oscuro */
                dark:hover:bg-gradient-to-r dark:hover:from-green-500 dark:hover:to-green-600
                dark:hover:text-black dark:hover:font-semibold
                dark:hover:border-green-400
                /* Efectos hover para tema claro */
                hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600
                hover:text-white hover:font-semibold
                hover:border-green-500
                /* Transformaciones mejoradas */
                transition-all duration-300 ease-in-out
                hover:scale-105 active:scale-95
                hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]
                dark:hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]
                hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]
                hover:-translate-y-1
                relative overflow-hidden
                rounded-lg
                px-6 py-2.5
                /* Sombras para ambos temas */
                shadow-lg dark:shadow-green-900/20 shadow-green-500/10
                ring-1 dark:ring-green-700/30 ring-green-500/20
                cursor-pointer
                /* Estados especiales */
                focus:ring-2 focus:ring-green-400/50 focus:outline-none
                group-hover:animate-pulse
              "
            >
              {/* Efecto de barrido en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 dark:via-green-400/20 via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              
              {/* Partículas en el botón - ajustadas para tema claro */}
              <div className="absolute top-1 right-2 w-0.5 h-0.5 bg-green-300 dark:bg-green-300 bg-green-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
              <div className="absolute bottom-1 left-3 w-0.5 h-0.5 bg-green-200 dark:bg-green-200 bg-green-100 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 delay-100" />
              
              <span className="relative z-10 tracking-wider transition-all duration-300 group-hover:drop-shadow-sm">
                Contratar
              </span>
              
              {/* Icono de flecha sutil */}
              <div className="relative z-10 w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
                <svg className="w-4 h-4 transform translate-x-1 group-hover:translate-x-0 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </Button>
          </ScrollLink>
        </div>

        {/* Mobile nav */}
        <div className="lg:hidden relative z-10">
          <MobileNav />
        </div>

        {/* Borde brillante animado - adaptado para ambos temas */}
        <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 dark:from-green-500/20 from-green-400/15 via-transparent to-green-500/20 dark:to-green-500/20 to-green-400/15 animate-pulse" />
        </div>
      </div>

      {/* Estilos CSS personalizados actualizados */}
      <style jsx>{`
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.6));
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        .animate-floating {
          animation: floating 3s ease-in-out infinite;
        }

        /* Efecto de glassmorphism mejorado para ambos temas */
        .backdrop-blur-lg {
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
        }

        .backdrop-blur-md {
          backdrop-filter: blur(12px) saturate(160%);
          -webkit-backdrop-filter: blur(12px) saturate(160%);
        }

        /* Ajustes específicos para tema claro */
        :root:not([data-theme="dark"]) .shadow-light {
          box-shadow: 
            0 4px 20px rgba(34, 197, 94, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        :root:not([data-theme="dark"]) .shadow-light:hover {
          box-shadow: 
            0 8px 30px rgba(34, 197, 94, 0.12),
            0 4px 16px rgba(16, 185, 129, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
        }

        /* Mejoras para tema oscuro existente */
        :root[data-theme="dark"] .shadow-dark {
          box-shadow: 
            0 12px 40px rgba(34, 197, 94, 0.2),
            0 0 60px rgba(34, 197, 94, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </header>
  );
};

export default Header;