"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import {
  CiHome,
  CiServer,
  CiPhone,
} from "react-icons/ci"; // Import icons

const links = [
  { name: "Home", path: "/", icon: <CiHome /> },
  { name: "Servicios", path: "/services", icon: <CiServer /> },
  { name: "Acerca", path: "/aboutme", icon: <FaPersonCircleQuestion /> },
  { name: "Trabajos", path: "/projects", icon: <GrUserWorker /> },
  { name: "Contacto", path: "/contact", icon: <CiPhone/> },
];

const Nav = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="flex gap-4">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathname && "text-accent border-b-2 border-accent"
            } capitalize font-medium flex items-center gap-2 hover:text-accent transition-all`}
          >
            {link.icon}
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
