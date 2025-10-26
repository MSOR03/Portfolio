"use client";

import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import { memo, useMemo, lazy, Suspense } from "react";

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

// Lazy loading con preload
const RadarChart = lazy(() => import("@/components/RadarChart"));
const RadialProgressChart = lazy(() =>
  import("@/components/RadialProgressChart")
);
const ClientOnly = lazy(() => import("@/components/ClientOnly"));

// Skeleton OPTIMIZADO
const ChartSkeleton = memo(() => (
  <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl opacity-50"></div>
));
ChartSkeleton.displayName = "ChartSkeleton";

// Datos
const SKILLS_SYSTEMS = [
  { label: "Frontend", value: 60, max: 100, color: "#3b82f6" },
  { label: "Backend", value: 55, max: 100, color: "#ef4444" },
  { label: "DevOps", value: 50, max: 100, color: "#10b981" },
  { label: "Bases de Datos", value: 60, max: 100, color: "#f59e0b" },
];

const SKILLS_TOPOGRAPHY = [
  { label: "GIS", value: 75, max: 100, color: "#14b8a6" },
  { label: "BIM", value: 60, max: 100, color: "#6366f1" },
  { label: "Bases de datos espaciales", value: 70, max: 100, color: "#8b5cf6" },
  { label: "Cartografía", value: 70, max: 100, color: "#f97316" },
];

const EXPERIENCIA = [
  {
    role: "Asistente de ingeniería",
    company: "Ingeterra Projects S.A.S.",
    date: "2024 - 2025",
    description:
      "Lleve a cabo trabajos de avaluos y GIS enfocados en ingeniería",
    techs: ["AutoCAD", "QGIS", "ArcGIS", "Excel"],
    logo: "/assets/Logo.avif",
  },
  {
    role: "Monitor Universidad Distrital",
    company: "Universidad Distrital Francisco José de Caldas",
    date: "2025 - 2025",
    description: "Monitor en las areas de SIG y diseño computacional de vias",
    techs: ["Civil3D", "QGIS", "ArcGIS"],
    logo: "/assets/Logo.avif",
  },
  {
    role: "Freelance Developer",
    company: "N/A",
    date: "2024 - Actual",
    description:
      "He llevado a cabo alguno proyectos freelance en desarrollo web y paginas NoCode",
    techs: [
      "JavaScript",
      "HTML/CSS",
      "React",
      "Next.js",
      "Bootstrap",
      "Tailwind CSS",
      "MongoDB",
    ],
    logo: "/assets/Logo.avif",
  },
];

const CHART_CONFIGS = [
  {
    title: "Habilidades Ingeniería de Sistemas",
    skills: SKILLS_SYSTEMS,
    gradient: "from-blue-500/10 to-purple-500/10",
  },
  {
    title: "Habilidades Ingeniería Topográfica",
    skills: SKILLS_TOPOGRAPHY,
    gradient: "from-orange-500/10 to-red-500/10",
  },
];

// SectionTitle simplificado
const SectionTitle = memo(({ title, subtitle, className = "" }) => {
  const titleWords = useMemo(() => title.split(" "), [title]);

  return (
  <div className={`text-center mb-16 px-4 ${className}`}>
    <div className="relative inline-block">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        {titleWords.map((word, index) => (
          <span
            key={index}
            className={
              index === titleWords.length - 1
                ? "inline-block text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-500 dark:to-blue-500"
                : ""
            }
            style={
              index === titleWords.length - 1
                ? {
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }
                : undefined
            }
          >
            {word}{" "}
          </span>
        ))}
      </h2>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
    </div>
    <p className="text-lg text-gray-600 dark:text-white/70 mt-6 max-w-2xl mx-auto">
      {subtitle}
    </p>
  </div>
);
});
SectionTitle.displayName = "SectionTitle";

// Gráfico optimizado
const OptimizedRadialChart = memo(({ config }) => (
  <div key={config.title} className="w-full max-w-xl">
    <div className="relative bg-white/5 dark:bg-white/5 rounded-xl p-4 border border-green-500/20">
      <Suspense fallback={<ChartSkeleton />}>
        <ClientOnly>
          <RadialProgressChart title={config.title} skills={config.skills} />
        </ClientOnly>
      </Suspense>
    </div>
  </div>
));
OptimizedRadialChart.displayName = "OptimizedRadialChart";

const Home = () => {
  const handleDownloadCV = useDownloadCV();

  const experienceCards = useMemo(
    () =>
      EXPERIENCIA.map((item, index) => (
        <ExperienceCard key={`${item.company}-${index}`} {...item} />
      )),
    []
  );

  const radialCharts = useMemo(
    () =>
      CHART_CONFIGS.map((config) => (
        <OptimizedRadialChart key={config.title} config={config} />
      )),
    []
  );

  return (
    <section className="h-full py-16 scroll-mt-20" id="home">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Hero section */}
          <div className="relative max-w-xl w-full order-2 md:order-none">
            <div className="relative bg-white/10 dark:bg-black/40 p-10 rounded-3xl border border-green-500/30 transition-transform hover:scale-[1.01]">
              <span className="inline-block text-sm text-green-400 uppercase tracking-wider font-semibold mb-2 px-3 py-1 bg-green-400/10 rounded-full border border-green-400/20">
                Ingeniero
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-4 text-gray-900 dark:text-white">
                Hola, soy <span className="text-green-400">Sebastián</span>
              </h1>
              <p className="text-gray-700 dark:text-white/80 text-lg mb-8">
                Ingeniero Topográfico y Estudiante de ultimos semestres
                Ingeniería de Sistemas con habilidades en desarrollo de software
                (Móvil, Web), Sistemas de Información, además, cualidades en
                diseño con <span className="text-green-300">Civil3D</span>,{" "}
                <span className="text-green-300">ArcGIS</span>,{" "}
                <span className="text-green-300">QGIS</span>.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleDownloadCV}
                  className="btn-green uppercase flex items-center gap-3 px-8 py-4"
                >
                  <span>Descargar CV</span>
                  <FiDownload className="text-xl" />
                </Button>
                <Social />
              </div>
            </div>
          </div>

          <div className="relative order-1 md:order-none">
            <Photo />
          </div>
        </div>
      </div>

      {/* Resto de secciones */}
      <div className="container mx-auto px-4 mt-24" id="cv">
        <SectionTitle
          title="Mi Resumen"
          subtitle="Habilidades y competencias técnicas destacadas en desarrollo y topografía"
        />

        <div className="flex justify-center items-start gap-12 flex-col lg:flex-row mx-auto max-w-7xl">
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-2xl lg:max-w-[600px] bg-white/5 dark:bg-white/5 rounded-2xl p-6 border border-green-500/20">
              <Suspense fallback={<ChartSkeleton />}>
                <RadarChart />
              </Suspense>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-8">
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

      <div className="scroll-mt-20" id="degrees" />
      <div id="aboutme" className="container mx-auto px-4 mt-24 scroll-mt-50">
        <SectionTitle
          title="Mis Estudios"
          subtitle="Formación académica y certificaciones que respaldan mi experiencia profesional"
        />
        <GradesTimeline />

        <div className="mt-10">
          <SectionTitle
            title="Mis Idiomas"
            subtitle="Competencias lingüísticas para comunicación internacional efectiva"
          />
          <LanguageProgress />
        </div>

        <div className="mt-5" id="experience">
          <SectionTitle
            title="Mi Experiencia"
            subtitle="Trayectoria profesional en desarrollo GIS y topografía aplicada"
          />
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {experienceCards}
          </div>
        </div>

        <div className="mt-5" id="projects">
          <Carousel />
        </div>
      </div>

      <div id="projects" className="mt-10 scroll-mt-20" />
      <div className="mt-10">
        <div className="container mx-auto px-4 text-center mb-5">
          <h2 className="text-4xl md:text-5xl font-bold mb-5">
            <span className="text-gray-900 dark:text-white">
              ¿Quieres trabajar{" "}
            </span>
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-500 dark:to-blue-500" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>conmigo?</span>
          </h2>
          <p className="text-gray-600 dark:text-white/70 text-xl mt-8 max-w-3xl mx-auto">
            Estoy disponible para colaboraciones, proyectos freelance o
            propuestas laborales. Convirtamos tu visión en realidad digital.
          </p>
        </div>
        <div id="contact" className="scroll-mt-20">
          <ContactSection />
        </div>
      </div>

      <div className="mt-0" id="testimonials">
        <Testimonials />
      </div>
    </section>
  );
};

export default memo(Home);
