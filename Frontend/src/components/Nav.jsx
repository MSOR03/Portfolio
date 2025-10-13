"use client";

import { FaPersonCircleQuestion } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { CiHome, CiServer } from "react-icons/ci";
import { Link as ScrollLink } from "react-scroll";


const links = [
  { name: "Inicio", id: "home", icon: <CiHome size={20} /> },
  { name: "Experiencia", id: "experience", icon: <CiServer size={20} /> },
  { name: "Proyectos", id: "projects", icon: <FaPersonCircleQuestion size={20} /> },
  { name: "Testimonios", id: "testimonials", icon: <GrUserWorker size={20} /> },
];


const Nav = () => {
  return (
    <nav className="flex gap-8 items-center">
      {links.map((link, index) => (
        <ScrollLink
          key={index}
          to={link.id}
          smooth={true}
          duration={1000} // duración en ms (700 ms en este ejemplo)
          offset={-80} // offset para compensar tu navbar fijo
          spy={true} // opcional: resalta el link activo
          activeClass="text-green-400" // opcional: clase para el link activo
          className="
            cursor-pointer
            relative flex items-center gap-3 px-2 py-1
            text-base font-medium tracking-wide rounded-md
            transition-colors duration-300 ease-in-out
            text-neutral-200 hover:text-green-400 hover:bg-green-900/20
          "
        >
          <span className="text-lg">{link.icon}</span>
          <span className="capitalize">{link.name}</span>
        </ScrollLink>
      ))}
      
    </nav>
  );
};

export default Nav;
