"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
      <SheetTrigger className="p-2">
        <CiMenuFries className="text-[32px] text-green-400" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="bg-black/80 backdrop-blur-md text-white border-none px-6 py-10"
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-10">
          <Link
            href="/"
            className="flex flex-col items-center hover:scale-90 transition-transform"
            onClick={closeMenu}
          >
            <Image src="/assets/Logo.png" alt="Logo" width={70} height={70} />
            <p className="text-lg font-semibold">
              SOR<span className="text-green-400">.</span>
            </p>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col items-center gap-6 text-base font-medium">
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              onClick={closeMenu}
              className={`${
                link.path === pathname
                  ? "text-green-400 border-b border-green-400"
                  : "text-white/80"
              } hover:text-green-400 transition-colors`}
            >
              {link.name}
            </Link>
          ))}

          {/* Botón destacado */}
          <Link href="#contacto" onClick={closeMenu}>
            <Button
              variant="outline"
              size="lg"
              className="uppercase mt-6 border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all"
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
