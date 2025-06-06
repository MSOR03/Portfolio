"use client";
import React, { use } from "react";
import Link from "next/link";
import Nav from "./Nav.jsx";
import MobileNav from "./MobileNav.jsx";
import Image from "next/image.js";
import { Button } from "./ui/button.jsx";

const Header = () => {
  return (
    <header className="sticky top-4 z-50">
      <div
        className="
          container mx-auto max-w-7xl
          bg-[#111916] bg-opacity-90
          border border-green-700/30
          rounded-xl
          shadow-md
          backdrop-blur-sm
          flex justify-between items-center
          py-4
          px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20
          gap-4
          transition-shadow duration-300 ease-in-out
          hover:shadow-lg
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="
            flex items-center gap-3
            transition-transform duration-300 ease-in-out
            transform hover:scale-105 hover:brightness-110
            select-none cursor-pointer
          "
          aria-label="Homepage"
        >
          <Image
            src="/assets/Logo.png"
            alt="LOGO"
            width={90}
            height={90}
            priority
            className="rounded-full drop-shadow-md"
          />
          <p
            className="
              text-lg font-semibold select-none
              text-green-500 whitespace-nowrap
              transition-colors duration-300
              hover:text-green-400
              cursor-pointer
            "
          >
            SOR<span className="text-green-400">.</span>
          </p>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Nav />
          <Link href="/contact" passHref>
            <Button
              variant="outline"
              size="sm"
              className="
    uppercase flex items-center gap-2
    border border-green-500 text-green-400
    bg-[#0b1512] bg-opacity-60
    transition-all duration-300 ease-in-out
    hover:bg-green-500 hover:text-black
    hover:scale-105 hover:shadow-[0_0_18px_2px_rgba(34,197,94,0.4)]
    animate-floating
    relative overflow-hidden
    rounded-md
    px-5 py-2
    shadow-inner shadow-green-900/10
    ring-1 ring-green-700/20
    cursor-pointer
  "
            >
              <span className="relative z-10 tracking-wider">Contratar</span>
            </Button>
          </Link>
        </div>

        {/* Mobile nav */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
