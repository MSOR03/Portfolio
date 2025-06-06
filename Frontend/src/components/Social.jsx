"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const handleEmailClick = (e) => {
  e.preventDefault();
  window.location.href = "mailto:olarteramirezsebastian830@gmail.com";
};

const iconClass =
  "flex items-center justify-center w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-green-600 text-green-400 shadow-lg transition-transform duration-500 transform-gpu group perspective";

const Social = () => {
  return (
    <div className="flex gap-4 mt-4">
      {/* GitHub */}
      <Link
        href="https://github.com/MSOR03"
        className={`${iconClass} hover:rotate-[8deg] hover:-rotate-x-[6deg] hover:scale-110 relative group`}
        aria-label="GitHub"
      >
        <FaGithub size={22} className="group-hover:animate-[wiggle_0.6s_ease-in-out]" />
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500 to-green-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      </Link>

      {/* LinkedIn */}
      <Link
        href="https://www.linkedin.com/in/maicol-sebastian-olarte-ramirez-b34966295/?originalSubdomain=co"
        className={`${iconClass} hover:-rotate-[8deg] hover:rotate-x-[6deg] hover:scale-110 relative group`}
        aria-label="LinkedIn"
      >
        <FaLinkedin size={22} className="group-hover:animate-[wiggle_0.6s_ease-in-out]" />
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500 to-green-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      </Link>

      {/* Gmail */}
      <Link
        href="mailto:olarteramirezsebastian830@gmail.com"
        onClick={handleEmailClick}
        className={`${iconClass} hover:rotate-[8deg] hover:-rotate-x-[6deg] hover:scale-110 relative group`}
        aria-label="Gmail"
      >
        <SiGmail size={22} className="group-hover:animate-[wiggle_0.6s_ease-in-out]" />
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500 to-green-700 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      </Link>
    </div>
  );
};

export default Social;
