"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { Button } from "./ui/button";
import Image from "next/image";

const links = [
  { name: "Home", path: "/" },
  { name: "Servicios", path: "/services" },
  { name: "Acerca", path: "/aboutme" },
  { name: "Trabajos", path: "/projects" },
];

const MobileNav = () => {
  const pathname = usePathname();
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
          <Link
            href="/"
            className="flex flex-col items-center hover:scale-95 transition-transform"
            onClick={closeMenu}
          >
            <Image src="/assets/Logo.png" alt="Logo" width={70} height={70} />
            <p className="text-lg font-semibold select-none">
              SOR<span className="text-green-400">.</span>
            </p>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col items-center gap-8 text-lg font-medium">
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              onClick={closeMenu}
              className={`relative px-4 py-2 rounded-lg transition-colors duration-300
                ${
                  link.path === pathname
                    ? "text-green-400 after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-green-400 after:rounded-full"
                    : "text-white/90 hover:text-green-400 hover:bg-green-900/30"
                }
              `}
            >
              {link.name}
            </Link>
          ))}

          {/* Botón destacado */}
          <Link
            href="#contacto"
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
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
