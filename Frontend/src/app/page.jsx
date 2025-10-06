"use client";

import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import { memo, useMemo, lazy, Suspense, useCallback } from "react";

import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import Technologies from "@/components/Technologies";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import GradesTimeline from "@/components/GradesTimeline";
import LanguageProgress from "@/components/Languaje";
import ExperienceCard from "@/components/ExperienceCard";
import Carousel from "@/components/carruselVideo";
import useDownloadCV from "@/components/downloadCV";
import ThemeToggle from "@/components/ThemeToggle";

// Lazy loading para componentes pesados
const RadarChart = lazy(() => import("@/components/RadarChart"));
const RadialProgressChart = lazy(() => import("@/components/RadialProgressChart"));
const ClientOnly = lazy(() => import("@/components/ClientOnly"));

// Skeleton/Loading placeholder adaptativo
const ChartSkeleton = memo(() => (
  <div className="animate-pulse card-glow">
    <div className="h-64 bg-white/10 dark:bg-white/10 bg-black/5 rounded-xl"></div>
  </div>
));

// Datos (sin cambios)
const SKILLS_SYSTEMS = [
  { label: "Frontend", value: 80, max: 100, color: "#3b82f6" },
  { label: "Backend", value: 70, max: 100, color: "#ef4444" },
  { label: "DevOps", value: 50, max: 100, color: "#10b981" },
  { label: "Bases de Datos", value: 60, max: 100, color: "#f59e0b" },
];

const SKILLS_TOPOGRAPHY = [
  { label: "GIS", value: 75, max: 100, color: "#14b8a6" },
  { label: "BIM", value: 65, max: 100, color: "#6366f1" },
  { label: "Bases de datos espaciales", value: 55, max: 100, color: "#8b5cf6" },
  { label: "Cartografía", value: 70, max: 100, color: "#f97316" },
];

const EXPERIENCIA = [
  {
    role: "Asistente de ingeniería",
    company: "Ingeterra Projects S.A.S.",
    date: "2023 - Presente",
    description: "Lleve a cabo trabajos de avaluos y GIS enfocados en ingeniería",
    techs: ["AutoCAD", "QGIS", "ArcGIS","Excel"],
    logo: "/assets/Logo.png",
  },
  {
    role: "Monitor Universidad Distrital",
    company: "Universidad Distrital Francisco José de Caldas",
    date: "2025 - 2025",
    description: "Monitor en las areas de SIG y diseño computacional de vias",
    techs: ["Civil3D", "QGIS", "ArcGIS"],
    logo: "/assets/Logo.png",
  },
  {
    role: "Freelance Developer",
    company: "N/A",
    date: "2024 - Actual",
    description: "He llevado a cabo alguno proyectos freelance en desarrollo web y paginas NoCode",
    techs: ["JavaScript", "HTML/CSS", "React", "Next.js", "Bootstrap", "Tailwind CSS", "MongoDB"],
    logo: "/assets/Logo.png",
  },
];

const CHART_CONFIGS = [
  {
    title: "Habilidades Ingeniería de Sistemas",
    skills: SKILLS_SYSTEMS,
    gradient: "from-blue-500/10 to-purple-500/10"
  },
  {
    title: "Habilidades Ingeniería Topográfica", 
    skills: SKILLS_TOPOGRAPHY,
    gradient: "from-orange-500/10 to-red-500/10"
  }
];

// Componente SectionTitle con estilos adaptativos
const SectionTitle = memo(({ title, subtitle, className = "" }) => {
  const titleWords = useMemo(() => title.split(" "), [title]);
  



  return (
    <div className={`text-center mb-16 px-4 ${className}`}>
      <div className="relative inline-block">
        <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-white text-gray-900 mb-4 relative z-10">
          {titleWords.map((word, index) => (
            <span key={index} className={index === titleWords.length - 1 ? "text-green-400" : ""}>
              {word} {" "}
            </span>
          ))}
        </h2>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-green-400/50 rounded-full"></div>
      </div>
      <p className="text-lg text-white/70 dark:text-white/70 text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
});

SectionTitle.displayName = "SectionTitle";

// Componente de gráfico con estilos adaptativos
const OptimizedRadialChart = memo(({ config }) => (
  <div key={config.title} className="w-full max-w-xl">
    <div className="relative">
      <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} rounded-xl blur-lg`} />
      <div className="relative z-10 card-glow p-4">
        <Suspense fallback={<ChartSkeleton />}>
          <ClientOnly>
            <RadialProgressChart title={config.title} skills={config.skills} />
          </ClientOnly>
        </Suspense>
      </div>
    </div>
  </div>
));

OptimizedRadialChart.displayName = "OptimizedRadialChart";



const Home = () => {

  const handleDownloadCV = useDownloadCV();

  const experienceCards = useMemo(() => (
    EXPERIENCIA.map((item, index) => (
      <ExperienceCard key={`${item.company}-${index}`} {...item} />
    ))
  ), []);

  const radialCharts = useMemo(() => (
    CHART_CONFIGS.map((config, idx) => (
      <OptimizedRadialChart key={config.title} config={config} />
    ))
  ), []);

  return (
    <section className="h-full py-16 scroll-mt-20" id="home">
      {/* Toggle de tema - posición fija */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="relative max-w-xl w-full order-2 md:order-none group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-3xl blur-md md:blur-lg transition-all duration-700"></div>
            <div className="relative card-glow p-10 rounded-3xl shadow-2xl transition-all duration-700 ease-out hover:scale-[1.02] hover:shadow-green-500/20 hover:border-green-500/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/10 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-400/10 to-transparent rounded-full blur-xl"></div>
              <div className="relative z-10">
                <span className="inline-block text-sm text-green-400 uppercase tracking-wider font-semibold mb-2 px-3 py-1 bg-green-400/10 rounded-full border border-green-400/20">Ingeniero</span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-4 leading-tight text-white dark:text-white text-gray-900">
                  Hola, soy <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Sebastián</span>
                </h1>
                <p className="text-white/80 dark:text-white/80 text-gray-700 text-lg leading-relaxed mb-8">
                  Ingeniero Topográfico e Ingeniero de Sistemas con habilidades en desarrollo de software (Móvil, Web), Sistemas de Información, además, cualidades en diseño con <span className="text-green-300">Civil3D</span>, <span className="text-green-300">ArcGIS</span>, <span className="text-green-300">QGIS</span>.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleDownloadCV}
                    className="btn-green relative group uppercase flex items-center gap-3 px-8 py-4 text-base text-white font-semibold tracking-wide overflow-hidden rounded-xl"
                  >
                    <span className="relative z-10">Descargar CV</span>
                    <FiDownload className="text-xl relative z-10 transition-transform group-hover:-translate-y-1" />
                  </Button>
                  <Social />
                </div>
              </div>
            </div>
          </div>

          <div className="relative order-1 md:order-none">
            <div className="absolute -inset-8 bg-gradient-to-tr from-green-500/20 via-green-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -inset-4 bg-gradient-to-bl from-green-600/10 to-green-400/5 rounded-full blur-xl"></div>
            <div className="relative z-10 p-2 rounded-full bg-gradient-to-tr from-green-400/20 to-transparent">
              <Photo />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-24" id="cv">
        <SectionTitle title="Mi Resumen" subtitle="Habilidades y competencias técnicas destacadas en desarrollo y topografía" />
        <div className="flex justify-center items-start gap-12 flex-col lg:flex-row mx-auto max-w-7xl">
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-2xl lg:max-w-[600px]">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl blur-xl" />
              <div className="relative z-10 card-glow p-6">
                <Suspense fallback={<ChartSkeleton />}>
                  <RadarChart />
                </Suspense>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-8 justify-center items-center">
            {radialCharts}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-8">
          <Stats />
        </div>
      </div>

      <div className="mt-5">
        <Technologies />
      </div>

      <div className="scroll-mt-20" id="services" />
      <div id="aboutme" className="container mx-auto px-4 mt-24 scroll-mt-50">
        <SectionTitle title="Mis Estudios" subtitle="Formación académica y certificaciones que respaldan mi experiencia profesional" />
        <GradesTimeline />
        <div className="mt-10">
          <SectionTitle title="Mis Idiomas" subtitle="Competencias lingüísticas para comunicación internacional efectiva" />
          <LanguageProgress />
        </div>
        <div className="mt-5">
          <SectionTitle title="Mi Experiencia" subtitle="Trayectoria profesional en desarrollo GIS y topografía aplicada" />
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {experienceCards}
          </div>
        </div>

        <div className="mt-5">
          <Carousel />
        </div>
      </div>

      <div id="projects" className="mt-10 scroll-mt-20" />
      <div className="mt-10">
        <div className="container mx-auto px-4 text-center mb-5">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              <span className="text-white dark:text-white text-gray-900">¿Quieres trabajar </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">conmigo?</span>
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
          </div>
          <p className="text-white/70 dark:text-white/70 text-gray-600 text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
            Estoy disponible para colaboraciones, proyectos freelance o propuestas laborales. Convirtamos tu visión en realidad digital.
          </p>
        </div>
        <div id="contact" className="scroll-mt-20">
          <ContactSection />
        </div>
      </div>

      <div className="mt-0">
        <Testimonials />
      </div>
    </section>
  );
};

export default memo(Home);
