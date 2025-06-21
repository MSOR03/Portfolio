"use client";

import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import RadarChart from "@/components/RadarChart";
import RadialProgressChart from "@/components/RadialProgressChart";
import ClientOnly from "@/components/ClientOnly";
import Technologies from "@/components/Technologies";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import GradesTimeline from "@/components/GradesTimeline";
import LanguageProgress from "@/components/Languaje";
import ExperienceCard from "@/components/ExperienceCard";

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

const experiencia = [
  {
    role: "Desarrollador GIS",
    company: "GeoSoft S.A.S.",
    date: "2023 - Presente",
    description: "Desarrollé dashboards geoespaciales para gestión territorial.",
    techs: ["React", "QGIS", "Tailwind CSS"],
    logo: "/assets/Logo.png",
  },
  {
    role: "Asistente Técnico",
    company: "Topodata Ltda.",
    date: "2022 - 2023",
    description: "Apoyo en campo y modelado topográfico con Civil3D.",
    techs: ["Civil3D", "AutoCAD", "Topografía"],
    logo: "/assets/Logo.png",
  },
    {
    role: "Desarrollador GIS",
    company: "GeoSoft S.A.S.",
    date: "2023 - Presente",
    description: "Desarrollé dashboards geoespaciales para gestión territorial.",
    techs: ["React", "QGIS", "Tailwind CSS"],
    logo: "/assets/Logo.png",
  },
  {
    role: "Asistente Técnico",
    company: "Topodata Ltda.",
    date: "2022 - 2023",
    description: "Apoyo en campo y modelado topográfico con Civil3D.",
    techs: ["Civil3D", "AutoCAD", "Topografía"],
    logo: "/assets/Logo.png",
  },
];

const SectionTitle = ({ title, subtitle, className = "" }) => (
  <div className={`text-center mb-16 ${className}`}>
    <div className="relative inline-block">
      <h2 className="text-5xl font-bold text-white mb-4 relative z-10">
        {title.split(' ').map((word, index) => (
          <span key={index} className={index === title.split(' ').length - 1 ? 'text-green-400' : ''}>
            {word}{' '}
          </span>
        ))}
      </h2>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-green-400/50 rounded-full"></div>
    </div>
    <p className="text-lg text-white/70 mt-6 max-w-2xl mx-auto leading-relaxed">
      {subtitle}
    </p>
  </div>
);

const Home = () => {
  return (
    <section className="h-full py-16 scroll-mt-20" id="home">
      {/* Presentación Mejorada */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Tarjeta de Presentación Mejorada */}
          <div className="relative max-w-xl w-full order-2 md:order-none group">
            {/* Efecto de fondo sutil */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-3xl blur-lg transition-all duration-700"></div>
            
            {/* Tarjeta principal */}
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-3xl shadow-2xl transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-green-500/20 hover:border-green-500/30 overflow-hidden">
              
              {/* Elementos decorativos sutiles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/10 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/10 to-transparent rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                {/* Badge original con mejora sutil */}
                <span className="inline-block text-sm text-green-400 uppercase tracking-wider font-semibold mb-2 px-3 py-1 bg-green-400/10 rounded-full border border-green-400/20">Ingeniero</span>
                
                {/* Título con efecto sutil */}
                <h1 className="text-5xl font-bold mb-6 mt-4 leading-tight">
                  Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Sebastián</span>
                </h1>
                
                {/* Descripción con highlighting sutil */}
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  Ingeniero Topográfico e Ingeniero de Sistemas con habilidades en desarrollo de software (Móvil, Web), Sistemas de Información, además, cualidades en diseño con <span className="text-green-300">Civil3D</span>, <span className="text-green-300">ArcGIS</span>, <span className="text-green-300">QGIS</span>.
                </p>

                {/* Botones con mejora sutil */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <a href="#cv">
                    <Button
                      variant="outline"
                      size="lg"
                      className="relative group uppercase flex items-center gap-3 px-8 py-4 text-base border-2 border-green-400 text-green-400 bg-transparent transition-all duration-500 ease-in-out hover:bg-green-500 hover:text-black hover:border-green-500 hover:shadow-lg hover:shadow-green-500/30 rounded-xl font-semibold tracking-wide overflow-hidden"
                    >
                      <span className="relative z-10">Descargar CV</span>
                      <FiDownload className="text-xl relative z-10 transition-transform group-hover:-translate-y-1" />
                      <span className="absolute left-0 top-0 h-full w-1/3 bg-white/20 transform -translate-x-full skew-x-12 group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                    </Button>
                  </a>
                  <Social />
                </div>
              </div>
            </div>
          </div>

          {/* Foto con marco sutil */}
          <div className="relative order-1 md:order-none">
            <div className="absolute -inset-8 bg-gradient-to-tr from-green-500/20 via-green-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -inset-4 bg-gradient-to-bl from-green-600/10 to-green-400/5 rounded-full blur-xl"></div>
            <div className="relative z-10 p-2 rounded-full bg-gradient-to-tr from-green-400/20 to-transparent">
              <Photo />
            </div>
          </div>
        </div>
      </div>

      {/* CV / Resumen */}
      <div className="container mx-auto px-4 mt-24" id="cv">
        <SectionTitle title="Mi Resumen" subtitle="Habilidades y competencias técnicas destacadas en desarrollo y topografía" />

        <div className="flex justify-center items-start gap-12 flex-col lg:flex-row mx-auto max-w-7xl">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-2xl lg:max-w-[600px]">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl blur-xl" />
              <div className="relative z-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <RadarChart />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-8 justify-center items-center">
            {[{
              title: "Habilidades Ingeniería de Sistemas",
              skills: skillsSystems,
              gradient: "from-blue-500/10 to-purple-500/10"
            }, {
              title: "Habilidades Ingeniería Topográfica",
              skills: skillsTopography,
              gradient: "from-orange-500/10 to-red-500/10"
            }].map((chart, idx) => (
              <div key={idx} className="w-full max-w-md">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${chart.gradient} rounded-xl blur-lg`} />
                  <div className="relative z-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                    <ClientOnly>
                      <RadialProgressChart title={chart.title} skills={chart.skills} />
                    </ClientOnly>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <Stats />
        </div>
      </div>

      {/* Tecnologías */}
      <div className="mt-20">
        <Technologies />
      </div>

      <div className="scroll-mt-20" id="services" />

      {/* Sobre mí */}
      <div id="aboutme" className="container mx-auto px-4 mt-24 scroll-mt-50">
        <SectionTitle title="Mis Estudios" subtitle="Formación académica y certificaciones que respaldan mi experiencia profesional" />
        <GradesTimeline />

        <div className="mt-20">
          <SectionTitle title="Mis Idiomas" subtitle="Competencias lingüísticas para comunicación internacional efectiva" />
          <LanguageProgress />
        </div>

        <div className="mt-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">DISPONIBLE PARA PROYECTOS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mi <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Experiencia</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Trayectoria profesional en desarrollo GIS y topografía aplicada
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {experiencia.map((item, index) => (
              <ExperienceCard key={index} {...item} />
            ))}
          </div>
        </div>
      </div>

      <div id="projects" className="scroll-mt-20" />

      {/* Contacto */}
      <div className="mt-24">
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">DISPONIBLE PARA PROYECTOS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trabajemos <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Juntos</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              ¿Tienes una idea innovadora? Convirtamos tu visión en realidad digital
            </p>
          </div>
        <div id="contact" className="scroll-mt-20">
          <ContactSection />
        </div>
      </div>

      {/* Testimonios */}
      <div className="mt-24">
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">OPINIONES SOBRE MI</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Algunas <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Referencias</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Trayectoria profesional en desarrollo GIS y topografía aplicada
            </p>
          </div>
        <Testimonials />
      </div>
    </section>
  );
};

export default Home;