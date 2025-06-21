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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-4 z-50">
      <div
        className={`
          container mx-auto max-w-7xl
          bg-gradient-to-r from-[#0a1410] via-[#111916] to-[#0a1410]
          ${isScrolled ? 'bg-opacity-95 shadow-2xl' : 'bg-opacity-90 shadow-md'}
          border border-green-700/30
          rounded-xl
          backdrop-blur-lg
          flex justify-between items-center
          py-4
          px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20
          gap-4
          transition-all duration-500 ease-in-out
          hover:shadow-[0_8px_32px_rgba(34,197,94,0.15)]
          hover:border-green-600/40
          relative
          overflow-hidden
        `}
      >
        {/* Efecto de brillo de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 ease-in-out" />
        
        {/* Partículas flotantes decorativas */}
        <div className="absolute top-2 left-10 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-3 right-20 w-1 h-1 bg-green-300 rounded-full animate-ping opacity-40" />
        <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-green-500 rounded-full animate-bounce opacity-50" />

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
            {/* Anillo brillante alrededor del logo */}
            <div className={`
              absolute -inset-1 rounded-full bg-gradient-to-r from-green-400 to-green-600 
              opacity-0 transition-opacity duration-300 blur-sm
              ${isLogoHovered ? 'opacity-30 animate-pulse' : ''}
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
                ${isLogoHovered ? 'brightness-110 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : ''}
              `}
            />
            
            {/* Efecto de rotación sutil en hover */}
            <div className={`
              absolute inset-0 rounded-full border-2 border-green-400/20
              transition-transform duration-500 ease-in-out
              ${isLogoHovered ? 'rotate-180 border-green-400/40' : ''}
            `} />
          </div>

          <div className="flex flex-col">
            <p className={`
              text-lg font-semibold select-none
              text-green-500 whitespace-nowrap
              transition-all duration-300 ease-in-out
              cursor-pointer
              ${isLogoHovered ? 'text-green-400 tracking-wider' : ''}
            `}>
              SOR<span className={`
                transition-all duration-300 ease-in-out
                ${isLogoHovered ? 'text-green-300 drop-shadow-glow' : 'text-green-400'}
              `}>.</span>
            </p>
            
            {/* Línea decorativa debajo del logo */}
            <div className={`
              h-0.5 bg-gradient-to-r from-green-500 to-transparent
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
          >
            <Button
              variant="outline"
              size="sm"
              className="
                uppercase flex items-center gap-2
                border border-green-500/60 text-green-400
                bg-gradient-to-r from-[#0b1512] to-[#0a1410]
                bg-opacity-80
                transition-all duration-300 ease-in-out
                hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600
                hover:text-black hover:font-semibold
                hover:scale-105 
                hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]
                hover:border-green-400
                active:scale-95
                relative overflow-hidden
                rounded-lg
                px-6 py-2.5
                shadow-lg shadow-green-900/20
                ring-1 ring-green-700/30
                cursor-pointer
                group
              "
            >
              {/* Efecto de barrido en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              
              {/* Partículas en el botón */}
              <div className="absolute top-1 right-2 w-0.5 h-0.5 bg-green-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
              <div className="absolute bottom-1 left-3 w-0.5 h-0.5 bg-green-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 delay-100" />
              
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

        {/* Borde brillante animado */}
        <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 animate-pulse" />
        </div>
      </div>

      {/* Agregar los estilos CSS personalizados */}
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

        /* Efecto de glassmorphism mejorado */
        .backdrop-blur-lg {
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
        }
      `}</style>
    </header>
  );
};

export default Header;