"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const handleEmailClick = (e) => {
  e.preventDefault();
  window.location.href = "mailto:olarteramirezsebastian830@gmail.com";
};

const Social = () => {
  return (
    <div className="flex space-x-4 gap-2">
      <Link
        href="https://github.com/MSOR03"
        className="flex items-center justify-center w-10 h-10 m-2 rounded-full bg-white text-green-600 border-2 border-transparent transition-colors duration-300 hover:bg-gradient-to-br from-green-400 to-blue-600 hover:text-white"
      >
        <FaGithub size={25} />
      </Link>
      <Link
        href="https://www.linkedin.com/in/maicol-sebastian-olarte-ramirez-b34966295/?originalSubdomain=co"
        className="flex items-center justify-center w-10 h-10 m-2 rounded-full bg-white text-green-600 border-2 border-transparent transition-colors duration-300 hover:bg-gradient-to-br from-green-400 to-blue-600 hover:text-white"
      >
        <FaLinkedin size={25} />
      </Link>

      <Link
        href="mailto:olarteramirezsebastian830@gmail.com"
        onClick={handleEmailClick}
        className="flex items-center justify-center w-10 h-10 m-2 rounded-full bg-white text-green-600 border-2 border-transparent transition-colors duration-300 hover:bg-gradient-to-br from-green-400 to-blue-600 hover:text-white"
      >
        {" "}
        <SiGmail size={25} />{" "}
      </Link>
    </div>
  );
};

export default Social;
