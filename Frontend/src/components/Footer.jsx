"use client";

import Link from "next/link";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaSquareWhatsapp, FaDatabase, FaRocket, FaCode, FaLocationDot, FaEnvelope, FaPhone } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { GiSkills, GiArchiveResearch } from "react-icons/gi";
import { BiChevronUp } from "react-icons/bi";
import ScrollAnimation from "@/components/ui/scroll-animation";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#0a1410] via-[#111916] to-[#0a0f0c] text-gray-300 select-none">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Partículas flotantes */}
        <div className="absolute top-10 left-1/4 w-2 h-2 bg-green-400/20 rounded-full animate-ping" />
        <div className="absolute top-32 right-1/3 w-1 h-1 bg-green-300/30 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-green-500/25 rounded-full animate-bounce" />
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-green-400/20 rounded-full animate-ping animation-delay-1000" />
        
        {/* Líneas de conexión geométricas */}
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#16a34a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#15803d" stopOpacity="0.1" />
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
          className="absolute top-6 right-6 z-20 bg-gradient-to-r from-green-500 to-green-600 text-black p-3 rounded-full shadow-lg hover:shadow-green-500/30 hover:scale-110 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <BiChevronUp size={24} className="group-hover:animate-bounce" />
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-20 group-hover:animate-ping" />
        </button>

        {/* Sección de Redes Sociales mejorada */}
        <section className="relative py-8 bg-gradient-to-r from-[#0f1813] via-[#1a2318] to-[#0f1813] border-b border-green-700/30">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6 md:mb-0">
              <FaRocket className="text-green-400 text-2xl animate-pulse" />
              <div className="text-center md:text-left">
                <span className="text-lg font-semibold text-green-400 block">
                  ¡Conectémonos!
                </span>
                <span className="text-sm text-gray-400 tracking-wide">
                  Sígueme en las redes sociales para más contenido
                </span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebook size={22} />, href: "/", label: "Facebook", color: "hover:bg-blue-600" },
                { icon: <FaYoutube size={22} />, href: "/", label: "YouTube", color: "hover:bg-red-600" },
                { icon: <FaSquareWhatsapp size={22} />, href: "/", label: "WhatsApp", color: "hover:bg-green-600" },
                { icon: <FaInstagram size={22} />, href: "/", label: "Instagram", color: "hover:bg-pink-600" },
              ].map(({ icon, href, label, color }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`
                    relative flex items-center justify-center w-12 h-12 rounded-xl 
                    border border-green-600/40 bg-gradient-to-br from-[#1a2318] to-[#0f1813]
                    text-green-400 ${color} hover:text-white hover:border-transparent
                    transition-all duration-300 transform hover:scale-110 hover:-translate-y-1
                    shadow-lg hover:shadow-xl group overflow-hidden
                  `}
                >
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de información mejorada */}
        <section className="relative py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Perfil Profesional",
                icon: <CgProfile size={24} className="text-green-400" />,
                content: (
                  <div className="space-y-3">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Ingeniero especializado en soluciones tecnológicas innovadoras y desarrollo de software.
                    </p>
                    <div className="flex items-center gap-2 text-green-400 text-xs">
                      <FaCode size={12} />
                      <span>Full Stack Developer</span>
                    </div>
                  </div>
                ),
                gradient: "from-blue-500/10 to-cyan-500/10"
              },
              {
                title: "Habilidades Técnicas",
                icon: <GiSkills size={24} className="text-green-400" />,
                content: (
                  <div className="space-y-3">
                    {[
                      { skill: "Desarrollo Web", level: "95%" },
                      { skill: "Sistemas GIS", level: "85%" },
                      { skill: "Diseño UX/UI", level: "80%" },
                      { skill: "DevOps", level: "75%" }
                    ].map(({ skill, level }) => (
                      <div key={skill} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-300">{skill}</span>
                          <span className="text-green-400">{level}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div 
                            className="h-1.5 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                            style={{ width: level }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ),
                gradient: "from-green-500/10 to-emerald-500/10"
              },
              {
                title: "Áreas de Especialización",
                icon: <GiArchiveResearch size={24} className="text-green-400" />,
                content: (
                  <ul className="space-y-3">
                    {[
                      { name: "Sistemas de Información", href: "https://comunidad.udistrital.edu.co/investudcn10/red-bacata-it/" },
                      { name: "Computación Avanzada", href: "https://fambiental.udistrital.edu.co/" },
                      { name: "Ciencia de Datos", href: "https://www.udistrital.edu.co/inicio" },
                      { name: "Desarrollo Gaming", href: "#gaming" }
                    ].map(({ name, href }) => (
                      <li key={name} className="group">
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-all duration-300 text-sm group-hover:translate-x-2"
                        >
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
                          {name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ),
                gradient: "from-purple-500/10 to-pink-500/10"
              },
              {
                title: "Información de Contacto",
                icon: <FaDatabase size={24} className="text-green-400" />,
                content: (
                  <div className="space-y-4">
                    {[
                      { 
                        icon: <FaLocationDot size={14} />, 
                        text: "Calle 66a 96-53, Bogotá", 
                        href: "https://www.google.com/maps/place/Cl.+66a+%2396-53,+Bogot%C3%A1/@4.708892,-74.0934149,17z/data=!3m1!4b1!4m6!3m5!1s0x8e3f9b8c0a8f9b9f:0x3c2e4f0a2b8e3a2c!8m2!3d4.708892!4d-74.0908346!16s%2Fg%2F11b810_13b?entry=ttu"
                      },
                      { 
                        icon: <FaEnvelope size={14} />, 
                        text: "olarteramirezsebastian83@gmail.com", 
                        href: "mailto:olarteramirezsebastian83@gmail.com"
                      },
                      { 
                        icon: <FaPhone size={14} />, 
                        text: "+57 312-562-39-57", 
                        href: "tel:+573125623957"
                      }
                    ].map(({ icon, text, href }) => (
                      <a
                        key={text}
                        href={href}
                        target={href.includes('http') ? '_blank' : undefined}
                        rel={href.includes('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-3 text-gray-300 hover:text-green-400 transition-all duration-300 text-sm group"
                      >
                        <span className="text-green-400 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                          {icon}
                        </span>
                        <span className="break-words group-hover:translate-x-1 transition-transform duration-300">
                          {text}
                        </span>
                      </a>
                    ))}
                  </div>
                ),
                gradient: "from-orange-500/10 to-red-500/10"
              },
            ].map(({ title, icon, content, gradient }) => (
              <div
                key={title}
                className={`
                  relative group bg-gradient-to-br from-[#1a2318] to-[#0f1813] 
                  rounded-2xl p-6 shadow-2xl border border-green-700/30
                  hover:border-green-500/50 hover:shadow-green-500/20 hover:shadow-2xl
                  transition-all duration-500 transform hover:-translate-y-2
                  overflow-hidden
                `}
              >
                {/* Efecto de fondo con gradiente */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Partículas en las tarjetas */}
                <div className="absolute top-2 right-2 w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-green-300 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-pulse transition-opacity duration-300 delay-200" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h6 className="font-bold text-lg text-green-400 group-hover:text-green-300 transition-colors duration-300">
                      {title}
                    </h6>
                    <span className="transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      {icon}
                    </span>
                  </div>
                  {content}
                </div>

                {/* Borde brillante animado */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollAnimation>

      {/* Footer final mejorado */}
      <div className="relative border-t border-green-700/30 bg-gradient-to-r from-[#0a0f0c] via-[#0f1813] to-[#0a0f0c]">
        <div className="container mx-auto px-6 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">SOR</span>
              </div>
              <div className="text-sm">
                <p className="text-gray-300 font-medium">Sebastián Olarte Ramírez</p>
                <p className="text-gray-500 text-xs">Full Stack Developer & Systems Engineer</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2024 Todos los derechos reservados
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Hecho con <span className="text-red-400 animate-pulse">❤️</span> y mucho <span className="text-green-400">código</span>
              </p>
            </div>
          </div>
        </div>

        {/* Línea brillante final */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
      </div>

      {/* Estilos CSS personalizados */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        /* Efecto de glassmorphism para las tarjetas */
        .backdrop-blur-sm {
          backdrop-filter: blur(4px) saturate(150%);
          -webkit-backdrop-filter: blur(4px) saturate(150%);
        }

        /* Scroll suave mejorado */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </footer>
  );
};

export default Footer;