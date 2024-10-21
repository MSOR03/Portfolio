import React from "react";
import Link from "next/link";
import { Button } from "./ui/button.jsx";
import Nav from "./Nav.jsx";

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/*Img*/}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Sebastián
            <br /> Olarte<span className="text-accent">.</span>
          </h1>
        </Link>

        {/*Desktop nav */}
        <div className="hidden lg:flex items-center gap-9">
          <Nav />
          <Link href="/contact">
            <Button>Contratarme</Button>
          </Link>
        </div>

        {/*mobile nave*/}
        <div className="lg:hidden">Mobile nav</div>
      </div>
    </header>
  );
};
export default Header;
