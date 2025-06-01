import React from "react";
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
                border-green-500 text-green-500
                hover:bg-green-500 hover:text-black
                transition-colors duration-300
                shadow-sm hover:shadow-lg
                transform hover:scale-105
                cursor-pointer
              "
            >
              <span className="transition-colors group-hover:text-black">
                Contratar
              </span>
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
