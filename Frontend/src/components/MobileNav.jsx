"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { CiMenuFries } from "react-icons/ci";
import { Button } from "./ui/button";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";

import { FaPersonCircleQuestion } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { CiHome, CiServer } from "react-icons/ci";

const links = [
  { name: "Inicio", id: "home", icon: <CiHome size={20} /> },
  { name: "Servicios", id: "services", icon: <CiServer size={20} /> },
  { name: "Acerca", id: "aboutme", icon: <FaPersonCircleQuestion size={20} /> },
  { name: "Trabajos", id: "projects", icon: <GrUserWorker size={20} /> },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger aria-label="Abrir menú móvil" className="p-2">
        <CiMenuFries className="text-[32px] text-green-400 hover:text-green-500 transition-colors" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="bg-black/90 backdrop-blur-lg text-white border-none px-8 py-12 flex flex-col"
      >
        {/* Accesibility Title */}
        <SheetTitle className="sr-only">Menú de navegación móvil</SheetTitle>

        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-12">
          <Image src="/assets/Logo.png" alt="Logo" width={70} height={70} />
          <p className="text-lg font-semibold select-none">
            SOR<span className="text-green-400">.</span>
          </p>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col items-center gap-8 text-lg font-medium">
          {links.map((link, index) => (
            <ScrollLink
              key={index}
              to={link.id}
              smooth={true}
              duration={1000}
              offset={-80}
              spy={true}
              onClick={closeMenu}
              activeClass="text-green-400"
              className="relative flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300 text-white/90 hover:text-green-400 hover:bg-green-900/30"
            >
              <span className="text-lg">{link.icon}</span>
              <span className="capitalize">{link.name}</span>
            </ScrollLink>
          ))}

          {/* Botón destacado */}
          <ScrollLink
            to="contact"
            smooth={true}
            duration={1000}
            offset={-80}
            onClick={closeMenu}
            className="w-full flex justify-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="
                uppercase mt-6 border-green-400 text-green-400
                hover:bg-green-500 hover:text-black
                transition-all duration-400 shadow-lg hover:shadow-green-500/80
                transform hover:-translate-y-1
                animate-pulse-slow
                max-w-xs
              "
            >
              Contratar
            </Button>
          </ScrollLink>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
