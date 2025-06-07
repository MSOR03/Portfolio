"use client";

import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

// Components
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import RadarChart from "@/components/RadarChart";
import RadialProgressChart from "@/components/RadialProgressChart";

import ClientOnly from "@/components/ClientOnly";

import Technologies from "@/components/Technologies";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";

const skillsSystems = [
  { label: "Frontend", value: 80, max: 100, color: "#3b82f6" },
  { label: "Backend", value: 70, max: 100, color: "#ef4444" },
  { label: "DevOps", value: 50, max: 100, color: "#10b981" },
  { label: "Bases de Datos", value: 60, max: 100, color: "#f59e0b" },
];

const skillsTopography = [
  { label: "GIS", value: 75, max: 100, color: "#14b8a6" },
  { label: "BIM", value: 65, max: 100, color: "#6366f1" },
  { label: "Bases de datos espaciales", value: 55, max: 100, color: "#8b5cf6" },
  { label: "Cartografía", value: 70, max: 100, color: "#f97316" },
];

const Home = () => {
  return (
    <section className="h-full py-16">
      <div className="container mx-auto px-4">
        {/* --- Sección presentación --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Tarjeta presentación */}
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
            <span className="text-sm text-green-400 uppercase tracking-wider">
              Ingeniero
            </span>
            <h1 className="text-4xl font-bold mb-4 mt-2 leading-tight">
              Hola, soy <span className="text-green-400">Sebastián</span>
            </h1>
            <p className="text-white/80 text-base leading-relaxed">
              Ingeniero Topográfico e Ingeniero de Sistemas con habilidades en
              desarrollo de software (Móvil, Web), Sistemas de Información,
              además, cualidades en diseño con Civil3D, ArcGIS, QGIS.
            </p>

            {/* Botón y redes */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-6">
              <Button
                variant="outline"
                size="lg"
                className="
                  relative
                  uppercase flex items-center gap-2
                  px-6 py-3
                  border border-green-400 text-green-400
                  bg-transparent
                  transition-transform duration-500 ease-in-out
                  transform-gpu
                  hover:rotate-[1.5deg] hover:-translate-y-[4px] hover:scale-[1.04]
                  hover:bg-green-500 hover:text-black
                  shadow-md hover:shadow-green-500/40
                  group
                  overflow-hidden
                  rounded-lg
                "
              >
                <span className="relative z-10 font-medium tracking-wide">
                  Descargar CV
                </span>
                <FiDownload className="text-xl relative z-10" />

                {/* Luz diagonal verde brillante */}
                <span
                  className="
                    absolute left-0 top-0 h-full w-1/4
                    bg-white/20
                    transform -translate-x-full skew-x-12
                    group-hover:translate-x-[260%]
                    transition-transform duration-[1100ms] ease-in-out
                    pointer-events-none
                    blur-sm
                    rounded-full
                  "
                />
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

      {/* --- Sección Resumen --- */}
      <div className="container mx-auto px-4 mt-16">
        <h2 className="text-4xl font-bold text-green-400 mb-2">Resumen</h2>
        <p className="text-lg text-white mb-10">Para destacar</p>

        {/* Contenedor flex principal para radar + radiales */}
        
        <div className="flex justify-center items-center gap-8 flex-col md:flex-row mx-auto max-w-6xl">
          {/* Columna izquierda - RadarChart */}
          <div className="w-full h-[450px] flex justify-center items-center">
            <RadarChart />
          </div>

          {/* Columna derecha - RadialProgress */}
          
          <div className=" w-full flex flex-col gap-8 h-[450px] justify-center items-center">
            <div className="h-[210px] w-full flex justify-center">
              <ClientOnly>
                {/* RadialProgressChart para Ingeniería de Sistemas */}
              <RadialProgressChart
                title="Habilidades Ingeniería de Sistemas"
                skills={skillsSystems}
              />
              </ClientOnly>
            </div>
            <div className="h-[210px] w-full flex justify-center">
              <ClientOnly>
              <RadialProgressChart
                title="Habilidades Ingeniería Topográfica"
                skills={skillsTopography}
              />
              </ClientOnly>
            </div>
            
          </div>
        </div>

        {/* Tarjetas debajo de las dos columnas */}
        <div className="mt-10 flex flex-wrap justify-center gap-8">
          <Stats />
        </div>
      </div>

      <Technologies />

      <div className="container mx-auto px-4 text-left mb-10 mt-20">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          ¿Quieres trabajar conmigo?
        </h2>
        <p className="text-white/80 mb-8 text-lg">
          Estoy disponible para colaboraciones, proyectos freelance o propuestas
          laborales.
        </p>
      </div>
      <ContactSection />
      <Testimonials />
    </section>
  );
};

export default Home;
