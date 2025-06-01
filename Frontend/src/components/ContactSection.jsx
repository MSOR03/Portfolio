'use client';

import ContactForm from "./ContactForm";
import ScrollAnimation from "./ui/scroll-animation";
import dynamic from "next/dynamic";


const Map = dynamic(() => import("./Map"), { ssr: false }); // Import dinámico porque usa 'window'

const ContactSection = () => {
  return (
    <section id="contacto" className="py-16">
        <ScrollAnimation>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Mapa con título */}
          <div className="w-full lg:w-1/2 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-green-400 mb-4 text-center">

              Mi ubicación
            </h3>
            <div className="flex-grow">
              <Map />
            </div>
          </div>

          {/* Formulario */}
          <div className="w-full lg:w-1/2 bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-green-400 mb-4 text-center">
              Contáctame
            </h2>
            <p className="text-white/80 mb-8 text-center">
              ¿Tienes un proyecto o idea? ¡Hablemos!
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
      </ScrollAnimation>
    </section>
  );
};

export default ContactSection;
