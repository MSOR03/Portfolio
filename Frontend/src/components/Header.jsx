import React from "react";
import Link from "next/link";
import Nav from "./Nav.jsx";
import MobileNav from "./MobileNav.jsx";
import Image from "next/image.js";
import { Button } from "./ui/button.jsx";

const Header = () => {
  return (
    <header className="py-2 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/*Img*/}
        <Link
          href="/"
          className="transition-transform duration-300 ease-in-out transform hover:scale-90"
        >
          <Image src="/assets/Logo.png" alt="LOGO" width={90} height={90}></Image>
          <p className="text-center">
            SOR
            <span className="text-accent">.</span>
          </p>
        </Link>

        {/*Desktop nav */}
        <div className="hidden lg:flex items-center gap-3 text-sm">
          <Nav />
          <Link href="/contact">
            <Button
              variant="outline"
              size="sm"
              className="uppercase flex items-center gap-2 group hover:bg-accent hover:text-black"
            >
              <span className="text-accent group-hover:text-black transition-colors ">
                Contratar
              </span>
            </Button>
          </Link>
        </div>

        {/*mobile nave*/}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
export default Header;
