"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { CiHome, CiServer } from "react-icons/ci";

const links = [
  { name: "Home", path: "/", icon: <CiHome size={18} /> },
  { name: "Servicios", path: "/services", icon: <CiServer size={18} /> },
  { name: "Acerca", path: "/aboutme", icon: <FaPersonCircleQuestion size={18} /> },
  { name: "Trabajos", path: "/projects", icon: <GrUserWorker size={18} /> },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6 items-center">
      {links.map((link, index) => {
        const isActive = link.path === pathname;

        return (
          <Link
            href={link.path}
            key={index}
            className={`relative flex items-center gap-2 px-1 pb-1
              text-sm font-medium tracking-wide
              transition-all duration-300 ease-in-out
              group
              ${isActive ? "text-green-400" : "text-neutral-200 hover:text-green-400"}
            `}
          >
            <span className="text-base">{link.icon}</span>
            <span className="capitalize">{link.name}</span>

            {/* animated underline */}
            <span
              className={`
                absolute -bottom-0.5 left-0 w-full h-[2px]
                bg-green-400
                transition-transform duration-300 ease-in-out
                scale-x-0 group-hover:scale-x-100
                origin-left
                ${isActive ? "scale-x-100" : ""}
              `}
            />
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
