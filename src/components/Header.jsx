import React from "react";
import Link from "next/link";
import { Button } from "./ui/button.jsx";
import Nav from "./Nav.jsx";
import MobileNav from "./MobileNav.jsx";
import Image from "next/image.js";


const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/*Img*/}
        <Link href="/">
          <Image src="/Logo.png" alt="LOGO" width={70} height={70}></Image>
          <p className="text-center">
            SOR
            <span className="text-accent">.</span>
          </p>
        </Link>

        {/*Desktop nav */}
        <div className="hidden lg:flex items-center gap-9">
          <Nav />
          <Link href="/contact">
            <Button>Contratarme</Button>
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
