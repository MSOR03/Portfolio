"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { Button } from "./ui/button";
import Image from "next/image";

const links = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Servicios",
    path: "/services",
  },
  {
    name: "Sobre mi",
    path: "/aboutme",
  },
  {
    name: "Trabajos",
    path: "/projects",
  },
  {
    name: "Contacto",
    path: "/contact",
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // State to manage menu visibility

  const closeMenu = () => setIsOpen(false); // Function to close the menu

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>

      <SheetContent className="flex flex-col h-full max-h-screen overflow-y-auto">
        {/* Logo */}
        <div className="mt-16 mb-32 text-center text-2xl">
          <Link href="/" className="flex flex-col items-center justify-center" onClick={closeMenu}>
            <Image src="/Logo.png" alt="Logo" width={70} height={70} />
            <p>
              SOR<span className="text-accent">.</span>
            </p>
          </Link>
        </div>
        {/* Nav */}
        <nav className="flex flex-col justify-center items-center gap-8">
          <Link href="/contact" onClick={closeMenu}>
            <Button>Contratarme</Button>
          </Link>
          {links.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={index}
                className={`${
                  link.path === pathname
                    ? "text-accent border-b-2 border-accent"
                    : ""
                } text-xl capitalize hover:text-accent transition-all`}
                onClick={closeMenu} // Close the menu when a link is clicked
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
