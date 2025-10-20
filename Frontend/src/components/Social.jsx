"use client";

import Link from "next/link";
import { memo } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/MSOR03",
    icon: FaGithub,
    label: "GitHub",
    ariaLabel: "Visitar perfil de GitHub"
  },
  {
    href: "https://www.linkedin.com/in/maicol-sebastian-olarte-ramirez-b34966295/?originalSubdomain=co",
    icon: FaLinkedin,
    label: "LinkedIn",
    ariaLabel: "Visitar perfil de LinkedIn"
  },
  {
    href: "mailto:olarteramirezsebastian830@gmail.com",
    icon: SiGmail,
    label: "Gmail",
    ariaLabel: "Enviar correo electrónico",
    isEmail: true
  }
];

// Componente de ícono individual optimizado
const SocialIcon = memo(({ href, icon: Icon, label, ariaLabel, isEmail }) => {
  const handleClick = (e) => {
    if (isEmail) {
      e.preventDefault();
      window.location.href = href;
    }
  };

  return (
    <Link
      href={href}
      onClick={isEmail ? handleClick : undefined}
      aria-label={ariaLabel}
      className="group relative flex items-center justify-center w-12 h-12 rounded-full
                 bg-white/80 dark:bg-black/40 
                 border-2 border-green-500/40 dark:border-green-600/60
                 hover:border-green-500 dark:hover:border-green-400
                 shadow-md hover:shadow-xl hover:shadow-green-500/30
                 transition-all duration-300 ease-out
                 hover:scale-110 active:scale-95
                 backdrop-blur-sm"
    >
      {/* Ícono con color correcto en ambos modos */}
      <Icon 
        size={22} 
        className="text-green-600 dark:text-green-400 
                   group-hover:text-green-700 dark:group-hover:text-green-300
                   transition-colors duration-300 relative z-10" 
      />
      
      {/* Efecto de brillo al hover */}
      <span 
        className="absolute inset-0 rounded-full 
                   bg-gradient-to-tr from-green-400/0 to-green-600/0
                   group-hover:from-green-400/20 group-hover:to-green-600/20
                   dark:group-hover:from-green-400/10 dark:group-hover:to-green-600/10
                   transition-all duration-300 pointer-events-none"
      />
      
      {/* Anillo exterior animado */}
      <span 
        className="absolute inset-0 rounded-full border-2 border-green-500/0 
                   group-hover:border-green-500/50 dark:group-hover:border-green-400/50
                   group-hover:scale-110 transition-all duration-300 pointer-events-none"
      />
    </Link>
  );
});

SocialIcon.displayName = "SocialIcon";

const Social = () => {
  return (
    <div className="flex gap-4 mt-4">
      {SOCIAL_LINKS.map((link) => (
        <SocialIcon key={link.label} {...link} />
      ))}
    </div>
  );
};

export default memo(Social);