"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { CiHome, CiServer } from "react-icons/ci";

const links = [
  { name: "Home", path: "/", icon: <CiHome size={20} /> },
  { name: "Servicios", path: "/services", icon: <CiServer size={20} /> },
  { name: "Acerca", path: "/aboutme", icon: <FaPersonCircleQuestion size={20} /> },
  { name: "Trabajos", path: "/projects", icon: <GrUserWorker size={20} /> },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-8 items-center">
      {links.map((link, index) => {
        const isActive = link.path === pathname;

        return (
          <Link
            href={link.path}
            key={index}
            className={`
              relative flex items-center gap-3
              ${isActive ? "px-4 py-2" : "px-2 py-1"}
              text-base font-medium tracking-wide rounded-md
              transition-colors duration-300 ease-in-out
              group
              ${isActive
                ? "text-green-400"
                : "text-neutral-200 hover:text-green-400 hover:bg-green-900/20"}
            `}
          >
            <span className="text-lg">{link.icon}</span>
            <span className="capitalize">{link.name}</span>

            {/* Underline only for active link */}
            {isActive && (
              <span
                className="
                  absolute -bottom-0.5 left-0 w-full h-[2.5px] bg-green-400 rounded-full
                "
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
