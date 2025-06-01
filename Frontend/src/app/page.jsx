import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";


//Components
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

import Technologies from "@/components/Technologies";
import Testimonials from "@/components/Testimonials";
import ScrollAnimation from "../components/ui/scroll-animation"
import ContactSection from "@/components/ContactSection";

const Home = () => {
  return (
 
    <section className="h-full py-16">
      
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Tarjeta de presentación mejorada */}
          <div
            className="
              bg-white/5 backdrop-blur-md
              p-8 rounded-2xl shadow-lg
              max-w-xl w-full order-2 md:order-none
              transition-transform duration-500 ease-out
              hover:scale-[1.03] hover:shadow-2xl
            "
            style={{ willChange: "transform" }}
          >
            
            <span className="text-sm text-green-400 uppercase tracking-wider">Ingeniero</span>
            <h1 className="text-4xl font-bold mb-4 mt-2 leading-tight">
              Hola, soy <span className="text-green-400">Sebastián</span>
            </h1>
            <p className="text-white/80 text-base leading-relaxed">
              Ingeniero Topográfico e Ingeniero de Sistemas con habilidades en desarrollo de software (Móvil, Web), Sistemas de Información, además, cualidades en diseño con Civil3D, ArcGIS, QGIS.
            </p>

            {/* Botón y redes */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2 px-6 py-3 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-colors duration-300"
              >
                <span>Descargar CV</span>
                <FiDownload className="text-xl" />
              </Button>
              <Social />
            </div>
          </div>

          {/* Foto con degradado detrás */}
          <div className="relative order-1 md:order-none">
            <div className="absolute -inset-4 bg-gradient-to-tr from-green-500/10 to-transparent rounded-full blur-2xl z-0" />
            <div className="relative z-10">
              <Photo />
            </div>
          </div>
        </div>
      </div>
      
      {/* Estadísticas mejoradas */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-green-400 text-left mb-2">Resumen</h2>
        <p className="text-lg text-white text-left mb-10">Para descatacar</p>
      </div>
      <Stats />

    <Technologies />
    
    <div className="container mx-auto px-4 text-left mb-10">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          ¿Quieres trabajar conmigo?
        </h2>
        <p className="text-white/80 mb-8 text-lg">
          Estoy disponible para colaboraciones, proyectos freelance o propuestas laborales.
        </p>
      </div>
    <ContactSection />
    <Testimonials />
    
    </section>
    
  );
};

export default Home;
