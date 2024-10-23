"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { CiMenuFries } from "react-icons/ci";
import { Button } from "./ui/button";
import Image from "next/image";

const links = [
  { name: "Home", path: "/" },
  { name: "Servicios", path: "/services" },
  { name: "Acerca", path: "/aboutme" },
  { name: "Trabajos", path: "/projects" },
  { name: "Contacto", path: "/contact" },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Estado para manejar la visibilidad del menú

  const closeMenu = () => setIsOpen(false); // Función para cerrar el menú

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>

      <SheetContent className="flex flex-col h-full max-h-screen overflow-y-auto items-center justify-between"> {/* Alinear elementos al centro */}
        {/* Logo */}
        <div className="mt-8 text-center text-2xl"> {/* Reduce el margen superior */}
          <Link href="/" className="flex flex-col items-center" onClick={closeMenu}>
            <Image src="/Logo.png" alt="Logo" width={70} height={70} />
            <p>
              SOR<span className="text-accent">.</span>
            </p>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex flex-col justify-center items-center gap-4 text-sm mb-8"> {/* Espacio más pequeño entre enlaces */}
          <Link href="/contact" onClick={closeMenu}>
            <Button>Contrata</Button>
          </Link>
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className={`${
                link.path === pathname ? "text-accent border-b-2 border-accent" : ""
              } capitalize hover:text-accent transition-all`}
              onClick={closeMenu} // Cerrar el menú al hacer clic en un enlace
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
