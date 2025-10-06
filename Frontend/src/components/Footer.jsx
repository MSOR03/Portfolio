"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaSquareWhatsapp, FaDatabase, FaRocket, FaCode, FaLocationDot, FaEnvelope, FaPhone } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { GiSkills, GiArchiveResearch } from "react-icons/gi";
import { BiChevronUp } from "react-icons/bi";
import ScrollAnimation from "@/components/ui/scroll-animation";

const Footer = () => {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Memoized theme colors manteniendo el diseño original
  const colors = useMemo(() => {
    const isDark = theme === 'dark';
    
    return {
      // Fondos principales - adaptando los gradientes originales
      mainBg: isDark 
        ? 'linear-gradient(to bottom, #0a1410 0%, #111916 50%, #0a0f0c 100%)'
        : 'linear-gradient(to bottom, #f0fdf4 0%, #dcfce7 50%, #f7fee7 100%)',
      
      socialBg: isDark
        ? 'linear-gradient(to right, #0f1813 0%, #1a2318 50%, #0f1813 100%)'
        : 'linear-gradient(to right, #ecfdf5 0%, #d1fae5 50%, #ecfdf5 100%)',
      
      finalBg: isDark
        ? 'linear-gradient(to right, #0a0f0c 0%, #0f1813 50%, #0a0f0c 100%)'
        : 'linear-gradient(to right, #f7fee7 0%, #ecfdf5 50%, #f7fee7 100%)',
      
      // Cards - manteniendo la estructura de gradiente
      cardBg: isDark 
        ? 'linear-gradient(135deg, #1a2318 0%, #0f1813 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      
      cardHoverBg: isDark
        ? 'linear-gradient(135deg, #1e2d1b 0%, #162016 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      
      // Texto - adaptando la jerarquía original
      primaryText: isDark ? '#d1fae5' : '#166534', // Verde más oscuro para legibilidad
      secondaryText: isDark ? '#9ca3af' : '#65a30d', // Verde medio
      mutedText: isDark ? '#6b7280' : '#84cc16', // Verde claro
      accentGreen: isDark ? '#22c55e' : '#059669', // Verde de acento
      
      // Bordes y efectos - manteniendo la lógica visual
      border: isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(5, 150, 105, 0.4)',
      borderHover: isDark ? 'rgba(34, 197, 94, 0.5)' : 'rgba(5, 150, 105, 0.6)',
      
      // Partículas y animaciones
      particle1: isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(5, 150, 105, 0.3)',
      particle2: isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(5, 150, 105, 0.4)',
      particle3: isDark ? 'rgba(34, 197, 94, 0.25)' : 'rgba(5, 150, 105, 0.35)',
      
      // Sombras
      shadow: isDark ? 'rgba(34, 197, 94, 0.2)' : 'rgba(5, 150, 105, 0.25)',
      shadowHover: isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(5, 150, 105, 0.35)',
      
      // SVG gradientes
      svgStop1: isDark ? { color: '#22c55e', opacity: 0.1 } : { color: '#059669', opacity: 0.15 },
      svgStop2: isDark ? { color: '#16a34a', opacity: 0.3 } : { color: '#047857', opacity: 0.35 },
      svgStop3: isDark ? { color: '#15803d', opacity: 0.1 } : { color: '#065f46', opacity: 0.15 },
    };
  }, [theme]);

  // Data arrays memoizados para mejor rendimiento
  const socialLinks = useMemo(() => [
    { icon: FaFacebook, href: "/", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: FaYoutube, href: "/", label: "YouTube", color: "hover:bg-red-600" },
    { icon: FaSquareWhatsapp, href: "/", label: "WhatsApp", color: "hover:bg-green-600" },
    { icon: FaInstagram, href: "/", label: "Instagram", color: "hover:bg-pink-600" },
  ], []);

  const skillsData = useMemo(() => [
    { skill: "Desarrollo Web", level: "95%" },
    { skill: "Sistemas GIS", level: "85%" },
    { skill: "Diseño UX/UI", level: "80%" },
    { skill: "DevOps", level: "75%" }
  ], []);

  const specializationLinks = useMemo(() => [
    { name: "Sistemas de Información", href: "https://comunidad.udistrital.edu.co/investudcn10/red-bacata-it/" },
    { name: "Computación Avanzada", href: "https://fambiental.udistrital.edu.co/" },
    { name: "Ciencia de Datos", href: "https://www.udistrital.edu.co/inicio" },
    { name: "Desarrollo Gaming", href: "#gaming" }
  ], []);

  const contactInfo = useMemo(() => [
    { 
      icon: FaLocationDot, 
      text: "Calle 66a 96-53, Bogotá", 
      href: "https://www.google.com/maps/place/Cl.+66a+%2396-53,+Bogot%C3%A1/@4.708892,-74.0934149,17z/data=!3m1!4b1!4m6!3m5!1s0x8e3f9b8c0a8f9b9f:0x3c2e4f0a2b8e3a2c!8m2!3d4.708892!4d-74.0908346!16s%2Fg%2F11b810_13b?entry=ttu"
    },
    { 
      icon: FaEnvelope, 
      text: "olarteramirezsebastian83@gmail.com", 
      href: "mailto:olarteramirezsebastian83@gmail.com"
    },
    { 
      icon: FaPhone, 
      text: "+57 312-562-39-57", 
      href: "tel:+573125623957"
    }
  ], []);

  return (
    <footer 
      className="relative overflow-hidden text-gray-300 select-none"
      style={{ background: colors.mainBg }}
    >
      {/* Efectos de fondo animados - misma estructura, colores adaptados */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Partículas flotantes */}
        <div 
          className="absolute top-10 left-1/4 w-2 h-2 rounded-full animate-ping"
          style={{ backgroundColor: colors.particle1 }}
        />
        <div 
          className="absolute top-32 right-1/3 w-1 h-1 rounded-full animate-pulse"
          style={{ backgroundColor: colors.particle2 }}
        />
        <div 
          className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 rounded-full animate-bounce"
          style={{ backgroundColor: colors.particle3 }}
        />
        <div 
          className="absolute top-1/2 right-1/4 w-1 h-1 rounded-full animate-ping animation-delay-1000"
          style={{ backgroundColor: colors.particle1 }}
        />
        
        {/* Líneas de conexión geométricas */}
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.svgStop1.color} stopOpacity={colors.svgStop1.opacity} />
              <stop offset="50%" stopColor={colors.svgStop2.color} stopOpacity={colors.svgStop2.opacity} />
              <stop offset="100%" stopColor={colors.svgStop3.color} stopOpacity={colors.svgStop3.opacity} />
            </linearGradient>
          </defs>
          <path d="M0,50 Q400,20 800,50 T1600,50" stroke="url(#lineGradient)" strokeWidth="1" fill="none" className="animate-pulse" />
          <path d="M0,150 Q300,120 600,150 T1200,150" stroke="url(#lineGradient)" strokeWidth="0.5" fill="none" className="animate-pulse animation-delay-2000" />
        </svg>
      </div>

      <ScrollAnimation>
        {/* Botón scroll to top flotante */}
        <button
          onClick={scrollToTop}
          className="absolute top-6 right-6 z-20 bg-gradient-to-r from-green-500 to-green-600 text-black p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 group"
          style={{ 
            boxShadow: `0 4px 20px ${colors.shadow}`,
            color: theme === 'dark' ? '#000' : '#fff'
          }}
          aria-label="Scroll to top"
        >
          <BiChevronUp size={24} className="group-hover:animate-bounce" />
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-20 group-hover:animate-ping" />
        </button>

        {/* Sección de Redes Sociales mejorada - estructura original */}
        <section 
          className="relative py-8 border-b"
          style={{ 
            background: colors.socialBg,
            borderColor: colors.border
          }}
        >
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6 md:mb-0">
              <FaRocket className="text-2xl animate-pulse" style={{ color: colors.accentGreen }} />
              <div className="text-center md:text-left">
                <span 
                  className="text-lg font-semibold block"
                  style={{ color: colors.accentGreen }}
                >
                  ¡Conectémonos!
                </span>
                <span 
                  className="text-sm tracking-wide"
                  style={{ color: colors.secondaryText }}
                >
                  Sígueme en las redes sociales para más contenido
                </span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`
                    relative flex items-center justify-center w-12 h-12 rounded-xl 
                    border transition-all duration-300 transform hover:scale-110 hover:-translate-y-1
                    shadow-lg hover:shadow-xl group overflow-hidden ${color} hover:text-white hover:border-transparent
                  `}
                  style={{
                    background: colors.cardBg,
                    borderColor: colors.border,
                    color: colors.accentGreen
                  }}
                >
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Icon size={22} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de información mejorada - estructura original */}
        <section className="relative py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Perfil Profesional */}
            <div
              className="relative group rounded-2xl p-6 shadow-2xl border hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              style={{
                background: colors.cardBg,
                borderColor: colors.border
              }}
            >
              {/* Partículas en las tarjetas */}
              <div 
                className="absolute top-2 right-2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping transition-opacity duration-300"
                style={{ backgroundColor: colors.accentGreen }}
              />
              <div 
                className="absolute bottom-3 left-3 w-0.5 h-0.5 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-opacity duration-300 delay-200"
                style={{ backgroundColor: colors.particle2 }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h6 
                    className="font-bold text-lg group-hover:text-green-300 transition-colors duration-300"
                    style={{ color: colors.accentGreen }}
                  >
                    Perfil Profesional
                  </h6>
                  <span className="transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <CgProfile size={24} style={{ color: colors.accentGreen }} />
                  </span>
                </div>
                <div className="space-y-3">
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: colors.primaryText }}
                  >
                    Ingeniero especializado en soluciones tecnológicas innovadoras y desarrollo de software.
                  </p>
                  <div className="flex items-center gap-2 text-xs" style={{ color: colors.accentGreen }}>
                    <FaCode size={12} />
                    <span>Full Stack Developer</span>
                  </div>
                </div>
              </div>

              {/* Borde brillante animado */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="absolute inset-0 rounded-2xl animate-pulse"
                  style={{ background: `linear-gradient(to right, ${colors.borderHover}, transparent, ${colors.borderHover})` }}
                />
              </div>
            </div>

            {/* Habilidades Técnicas */}
            <div
              className="relative group rounded-2xl p-6 shadow-2xl border hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              style={{
                background: colors.cardBg,
                borderColor: colors.border
              }}
            >
              <div 
                className="absolute top-2 right-2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping transition-opacity duration-300"
                style={{ backgroundColor: colors.accentGreen }}
              />
              <div 
                className="absolute bottom-3 left-3 w-0.5 h-0.5 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-opacity duration-300 delay-200"
                style={{ backgroundColor: colors.particle2 }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h6 
                    className="font-bold text-lg group-hover:text-green-300 transition-colors duration-300"
                    style={{ color: colors.accentGreen }}
                  >
                    Habilidades Técnicas
                  </h6>
                  <span className="transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <GiSkills size={24} style={{ color: colors.accentGreen }} />
                  </span>
                </div>
                <div className="space-y-3">
                  {skillsData.map(({ skill, level }) => (
                    <div key={skill} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span style={{ color: colors.primaryText }}>{skill}</span>
                        <span style={{ color: colors.accentGreen }}>{level}</span>
                      </div>
                      <div 
                        className="w-full rounded-full h-1.5"
                        style={{ backgroundColor: theme === 'dark' ? '#374151' : '#e5e7eb' }}
                      >
                        <div 
                          className="h-1.5 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                          style={{ width: level }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="absolute inset-0 rounded-2xl animate-pulse"
                  style={{ background: `linear-gradient(to right, ${colors.borderHover}, transparent, ${colors.borderHover})` }}
                />
              </div>
            </div>

            {/* Áreas de Especialización */}
            <div
              className="relative group rounded-2xl p-6 shadow-2xl border hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              style={{
                background: colors.cardBg,
                borderColor: colors.border
              }}
            >
              <div 
                className="absolute top-2 right-2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping transition-opacity duration-300"
                style={{ backgroundColor: colors.accentGreen }}
              />
              <div 
                className="absolute bottom-3 left-3 w-0.5 h-0.5 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-opacity duration-300 delay-200"
                style={{ backgroundColor: colors.particle2 }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h6 
                    className="font-bold text-lg group-hover:text-green-300 transition-colors duration-300"
                    style={{ color: colors.accentGreen }}
                  >
                    Áreas de Especialización
                  </h6>
                  <span className="transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <GiArchiveResearch size={24} style={{ color: colors.accentGreen }} />
                  </span>
                </div>
                <ul className="space-y-3">
                  {specializationLinks.map(({ name, href }) => (
                    <li key={name} className="group/item">
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 transition-all duration-300 text-sm group-hover/item:translate-x-2"
                        style={{ color: colors.primaryText }}
                      >
                        <div 
                          className="w-1.5 h-1.5 rounded-full opacity-60 group-hover/item:opacity-100 group-hover/item:scale-125 transition-all duration-300"
                          style={{ backgroundColor: colors.accentGreen }}
                        />
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="absolute inset-0 rounded-2xl animate-pulse"
                  style={{ background: `linear-gradient(to right, ${colors.borderHover}, transparent, ${colors.borderHover})` }}
                />
              </div>
            </div>

            {/* Información de Contacto */}
            <div
              className="relative group rounded-2xl p-6 shadow-2xl border hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              style={{
                background: colors.cardBg,
                borderColor: colors.border
              }}
            >
              <div 
                className="absolute top-2 right-2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping transition-opacity duration-300"
                style={{ backgroundColor: colors.accentGreen }}
              />
              <div 
                className="absolute bottom-3 left-3 w-0.5 h-0.5 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-opacity duration-300 delay-200"
                style={{ backgroundColor: colors.particle2 }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h6 
                    className="font-bold text-lg group-hover:text-green-300 transition-colors duration-300"
                    style={{ color: colors.accentGreen }}
                  >
                    Información de Contacto
                  </h6>
                  <span className="transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <FaDatabase size={24} style={{ color: colors.accentGreen }} />
                  </span>
                </div>
                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, text, href }) => (
                    <a
                      key={text}
                      href={href}
                      target={href.includes('http') ? '_blank' : undefined}
                      rel={href.includes('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-3 transition-all duration-300 text-sm group/contact"
                      style={{ color: colors.primaryText }}
                    >
                      <span 
                        className="mt-0.5 group-hover/contact:scale-110 transition-transform duration-300"
                        style={{ color: colors.accentGreen }}
                      >
                        <Icon size={14} />
                      </span>
                      <span className="break-words group-hover/contact:translate-x-1 transition-transform duration-300">
                        {text}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="absolute inset-0 rounded-2xl animate-pulse"
                  style={{ background: `linear-gradient(to right, ${colors.borderHover}, transparent, ${colors.borderHover})` }}
                />
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Footer final mejorado */}
      <div 
        className="relative border-t"
        style={{ 
          background: colors.finalBg,
          borderColor: colors.border
        }}
      >
        <div className="container mx-auto px-6 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div 
                className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center"
              >
                <span 
                  className="font-bold text-sm"
                  style={{ color: theme === 'dark' ? '#000' : '#fff' }}
                >
                  SOR
                </span>
              </div>
              <div className="text-sm">
                <p 
                  className="font-medium"
                  style={{ color: colors.primaryText }}
                >
                  Sebastián Olarte Ramírez
                </p>
                <p 
                  className="text-xs"
                  style={{ color: colors.mutedText }}
                >
                  Full Stack Developer & Systems Engineer
                </p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p 
                className="text-sm"
                style={{ color: colors.secondaryText }}
              >
                © 2024 Todos los derechos reservados
              </p>
              <p 
                className="text-xs mt-1"
                style={{ color: colors.mutedText }}
              >
                Hecho con <span className="text-red-400 animate-pulse">❤️</span> y mucho{" "}
                <span style={{ color: colors.accentGreen }}>código</span>
              </p>
            </div>
          </div>
        </div>

        {/* Línea brillante final */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${colors.borderHover}, transparent)` }}
        />
      </div>

      {/* Estilos CSS personalizados */}
      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </footer>
  );
};

export default Footer;