"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaSquareWhatsapp, FaDatabase, FaRocket, FaCode, FaLocationDot, FaEnvelope, FaPhone } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { GiSkills, GiArchiveResearch } from "react-icons/gi";
import { BiChevronUp } from "react-icons/bi";
import ScrollAnimation from "@/components/ui/scroll-animation";

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Data arrays memoizados
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
      href: "https://www.google.com/maps/place/Cl.+66a+%2396-53,+Bogot%C3%A1"
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

  // Skeleton mientras monta
  if (!mounted) {
    return (
      <footer className="relative overflow-hidden bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-6 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-48 bg-gray-800 rounded-2xl" />
            ))}
          </div>
        </div>
      </footer>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <footer 
      className={`relative overflow-hidden text-gray-300 select-none ${
        isDark 
          ? 'bg-gradient-to-b from-[#0a1410] via-[#111916] to-[#0a0f0c]'
          : 'bg-gradient-to-b from-[#f0fdf4] via-[#dcfce7] to-[#f7fee7]'
      }`}
    >
      {/* Efectos de fondo simplificados */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 left-1/4 w-2 h-2 rounded-full animate-ping ${isDark ? 'bg-green-500/20' : 'bg-green-600/30'}`} />
        <div className={`absolute top-32 right-1/3 w-1 h-1 rounded-full animate-pulse ${isDark ? 'bg-green-500/30' : 'bg-green-600/40'}`} />
      </div>

      <ScrollAnimation>
        {/* Botón scroll to top */}
        <button
          onClick={scrollToTop}
          className={`absolute top-6 right-6 z-20 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 group ${
            isDark 
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-black'
              : 'bg-gradient-to-r from-green-600 to-green-700 text-white'
          }`}
          aria-label="Scroll to top"
        >
          <BiChevronUp size={24} className="group-hover:animate-bounce" />
        </button>

        {/* Sección de Redes Sociales */}
        <section className={`relative py-8 border-b ${
          isDark 
            ? 'bg-gradient-to-r from-[#0f1813] via-[#1a2318] to-[#0f1813] border-green-500/30'
            : 'bg-gradient-to-r from-[#ecfdf5] via-[#d1fae5] to-[#ecfdf5] border-green-600/40'
        }`}>
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6 md:mb-0">
              <FaRocket className={`text-2xl ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <div className="text-center md:text-left">
                <span className={`text-lg font-semibold block ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  ¡Conectémonos!
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-green-700'}`}>
                  Sígueme en las redes sociales
                </span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`relative flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-300 hover:scale-110 ${color} hover:text-white hover:border-transparent ${
                    isDark 
                      ? 'bg-gray-800/50 border-green-500/30 text-green-400'
                      : 'bg-white border-green-500/40 text-green-600'
                  }`}
                >
                  <Icon size={22} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de información */}
        <section className="relative py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Perfil Profesional */}
            <div className={`group rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:-translate-y-2 ${
              isDark 
                ? 'bg-gradient-to-br from-[#1a2318] to-[#0f1813] border-green-500/30'
                : 'bg-gradient-to-br from-white to-[#f8fafc] border-green-500/40'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h6 className={`font-bold text-lg ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  Perfil Profesional
                </h6>
                <CgProfile size={24} className={isDark ? 'text-green-400' : 'text-green-600'} />
              </div>
              <div className="space-y-3">
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Ingeniero especializado en soluciones tecnológicas innovadoras y desarrollo de software.
                </p>
                <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  <FaCode size={12} />
                  <span>Full Stack Developer</span>
                </div>
              </div>
            </div>

            {/* Habilidades Técnicas */}
            <div className={`group rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:-translate-y-2 ${
              isDark 
                ? 'bg-gradient-to-br from-[#1a2318] to-[#0f1813] border-green-500/30'
                : 'bg-gradient-to-br from-white to-[#f8fafc] border-green-500/40'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h6 className={`font-bold text-lg ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  Habilidades Técnicas
                </h6>
                <GiSkills size={24} className={isDark ? 'text-green-400' : 'text-green-600'} />
              </div>
              <div className="space-y-3">
                {skillsData.map(({ skill, level }) => (
                  <div key={skill} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{skill}</span>
                      <span className={isDark ? 'text-green-400' : 'text-green-600'}>{level}</span>
                    </div>
                    <div className={`w-full rounded-full h-1.5 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}>
                      <div 
                        className="h-1.5 bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                        style={{ width: level }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Áreas de Especialización */}
            <div className={`group rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:-translate-y-2 ${
              isDark 
                ? 'bg-gradient-to-br from-[#1a2318] to-[#0f1813] border-green-500/30'
                : 'bg-gradient-to-br from-white to-[#f8fafc] border-green-500/40'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h6 className={`font-bold text-lg ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  Áreas de Especialización
                </h6>
                <GiArchiveResearch size={24} className={isDark ? 'text-green-400' : 'text-green-600'} />
              </div>
              <ul className="space-y-3">
                {specializationLinks.map(({ name, href }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-sm hover:translate-x-2 transition-transform ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-600'}`} />
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Información de Contacto */}
            <div className={`group rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:-translate-y-2 ${
              isDark 
                ? 'bg-gradient-to-br from-[#1a2318] to-[#0f1813] border-green-500/30'
                : 'bg-gradient-to-br from-white to-[#f8fafc] border-green-500/40'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h6 className={`font-bold text-lg ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  Contacto
                </h6>
                <FaDatabase size={24} className={isDark ? 'text-green-400' : 'text-green-600'} />
              </div>
              <div className="space-y-4">
                {contactInfo.map(({ icon: Icon, text, href }) => (
                  <a
                    key={text}
                    href={href}
                    target={href.includes('http') ? '_blank' : undefined}
                    rel={href.includes('http') ? 'noopener noreferrer' : undefined}
                    className={`flex items-start gap-3 text-sm transition-transform hover:translate-x-1 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <Icon size={14} className={isDark ? 'text-green-400' : 'text-green-600'} />
                    <span className="break-words">{text}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Footer final */}
      <div className={`relative border-t ${
        isDark 
          ? 'bg-gradient-to-r from-[#0a0f0c] via-[#0f1813] to-[#0a0f0c] border-green-500/30'
          : 'bg-gradient-to-r from-[#f7fee7] via-[#ecfdf5] to-[#f7fee7] border-green-600/40'
      }`}>
        <div className="container mx-auto px-6 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <span className={`font-bold text-sm ${isDark ? 'text-black' : 'text-white'}`}>
                  SOR
                </span>
              </div>
              <div className="text-sm">
                <p className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                  Sebastián Olarte Ramírez
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                  Full Stack Developer
                </p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2024 Todos los derechos reservados
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                Hecho con <span className="text-red-400">❤️</span> y{" "}
                <span className={isDark ? 'text-green-400' : 'text-green-600'}>código</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;