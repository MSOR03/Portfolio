"use client";

import { memo, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaSquareWhatsapp, FaDatabase, FaRocket, FaCode, FaLocationDot, FaEnvelope, FaPhone } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { GiSkills, GiArchiveResearch } from "react-icons/gi";
import { BiChevronUp } from "react-icons/bi";

// Datos estáticos movidos fuera
const SOCIAL_LINKS = [
  { icon: FaFacebook, href: "/", label: "Facebook", color: "hover:bg-blue-600" },
  { icon: FaYoutube, href: "https://www.youtube.com/@Sebasti%C3%A1nOlarteRam%C3%ADrez", label: "YouTube", color: "hover:bg-red-600" },
  { icon: FaSquareWhatsapp, href: "/", label: "WhatsApp", color: "hover:bg-green-600" },
  { icon: FaInstagram, href: "/", label: "Instagram", color: "hover:bg-pink-600" },
];

const SKILLS_DATA = [
  { skill: "Desarrollo Web", level: "60%" },
  { skill: "Sistemas GIS", level: "75%" },
  { skill: "Diseño UX/UI", level: "50%" },
  { skill: "DevOps", level: "50%" }
];

const SPECIALIZATION_LINKS = [
  { name: "GIS/BIM", href: "https://www.esri.com/es-es/industries/aec/overview/gis-and-bim" },
  { name: "Desarrollo de software", href: "https://www.ibm.com/es-es/think/topics/software-development" },
  { name: "Ciencia de Datos", href: "https://aws.amazon.com/es/what-is/data-science/" },
  { name: "Ingenieria de Transporte", href: "https://www.autonoma.pe/blog/ramas-ingenieria-civil/" }
];

const CONTACT_INFO = [
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
];

// Componente de link social memoizado
const SocialLink = memo(({ icon: Icon, href, label, color, isDark }) => (
  <Link
    href={href}
    aria-label={label}
    className={`relative flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-200 hover:scale-105 ${color} hover:text-white hover:border-transparent ${
      isDark 
        ? 'bg-gray-800/50 border-green-500/30 text-green-400'
        : 'bg-white border-green-500/40 text-green-600'
    }`}
  >
    <Icon size={22} />
  </Link>
));
SocialLink.displayName = 'SocialLink';

// Componente de skill bar memoizado
const SkillBar = memo(({ skill, level, isDark }) => (
  <div className="space-y-1">
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
));
SkillBar.displayName = 'SkillBar';

// Componente de info card memoizado
const InfoCard = memo(({ title, icon: Icon, children, isDark }) => (
  <div className={`group rounded-2xl p-6 shadow-lg border transition-all duration-200 hover:-translate-y-1 ${
    isDark 
      ? 'bg-gradient-to-br from-[#1a2318] to-[#0f1813] border-green-500/30'
      : 'bg-gradient-to-br from-white to-[#f8fafc] border-green-500/40'
  }`}>
    <div className="flex items-center justify-between mb-4">
      <h6 className={`font-bold text-lg ${isDark ? 'text-green-400' : 'text-green-600'}`}>
        {title}
      </h6>
      <Icon size={24} className={isDark ? 'text-green-400' : 'text-green-600'} />
    </div>
    {children}
  </div>
));
InfoCard.displayName = 'InfoCard';

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Skeleton simplificado
  if (!mounted) {
    return (
      <footer className="relative overflow-hidden bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-48 bg-gray-800 rounded-2xl animate-pulse" />
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
      {/* Botón scroll to top */}
      <button
        onClick={scrollToTop}
        className={`absolute top-6 right-6 z-20 p-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 ${
          isDark 
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-black'
            : 'bg-gradient-to-r from-green-600 to-green-700 text-white'
        }`}
        aria-label="Scroll to top"
      >
        <BiChevronUp size={24} />
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
            {SOCIAL_LINKS.map((link) => (
              <SocialLink key={link.label} {...link} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>

      {/* Sección de información */}
      <section className="relative py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Perfil Profesional */}
          <InfoCard title="Perfil Profesional" icon={CgProfile} isDark={isDark}>
            <div className="space-y-3">
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Ingeniero especializado en soluciones tecnológicas innovadoras y desarrollo de software.
              </p>
              <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                <FaCode size={12} />
                <span>Full Stack Developer</span>
              </div>
            </div>
          </InfoCard>

          {/* Habilidades Técnicas */}
          <InfoCard title="Habilidades Técnicas" icon={GiSkills} isDark={isDark}>
            <div className="space-y-3">
              {SKILLS_DATA.map((skillData) => (
                <SkillBar key={skillData.skill} {...skillData} isDark={isDark} />
              ))}
            </div>
          </InfoCard>

          {/* Áreas de Especialización */}
          <InfoCard title="Áreas de Especialización" icon={GiArchiveResearch} isDark={isDark}>
            <ul className="space-y-3">
              {SPECIALIZATION_LINKS.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm hover:translate-x-1 transition-transform duration-150 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-600'}`} />
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </InfoCard>

          {/* Información de Contacto */}
          <InfoCard title="Contacto" icon={FaDatabase} isDark={isDark}>
            <div className="space-y-4">
              {CONTACT_INFO.map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  target={href.includes('http') ? '_blank' : undefined}
                  rel={href.includes('http') ? 'noopener noreferrer' : undefined}
                  className={`flex items-start gap-3 text-sm transition-transform duration-150 hover:translate-x-1 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  <Icon size={14} className={`flex-shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  <span className="break-words">{text}</span>
                </a>
              ))}
            </div>
          </InfoCard>
        </div>
      </section>

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

export default memo(Footer);