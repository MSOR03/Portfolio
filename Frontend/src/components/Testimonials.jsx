"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import ScrollAnimation from "./ui/scroll-animation";
import { FaQuoteLeft, FaStar, FaBriefcase, FaMapMarkedAlt, FaChartLine, FaProjectDiagram } from "react-icons/fa";

const Testimonials = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const testimonials = useMemo(() => [
    {
      name: "Alex Vergara",
      role: "Cliente",
      company: "N/A",
      feedback: "Sebastián es un profesional comprometido y creativo. Su ayuda fue clave para el desarrollo de la página de la Red Bacata. La calidad de su trabajo superó nuestras expectativas.",
      rating: 5,
      project: "Red Bacata",
      icon: <FaProjectDiagram className="text-blue-500 dark:text-blue-400" />,
      avatar: "AV",
      skills: ["Desarrollo Web", "Investigación"],
    },
    {
      name: "Astrid Olarte",
      role: "Cliente", 
      company: "N/A",
      feedback: "Sebastián nos ayudó a crear una página web noCode para nuestro trabajo de grado. Su profesionalismo y creatividad fueron clave para el éxito del proyecto.",
      rating: 5,
      project: "Análisis Geoespacial Avanzado",
      icon: <FaMapMarkedAlt className="text-emerald-600 dark:text-emerald-400" />,
      avatar: "AO",
      skills: ["ArcGIS", "QGIS", "Geoanálisis"],
    },
    {
      name: "Ricardo Bacca Ávila",
      role: "Ingeniero en Ingeterra Projects S.A.S.",
      company: "Ingeterra Projects S.A.S.",
      feedback: "Sebastián ha colaborado con nosotros en varios trabajos de la organización. Puedo decir que es un profesional comprometido y con una gran capacidad de aprendizaje. Su trabajo en GIS y Civil3D ha sido excepcional.",
      rating: 5,
      project: "Varios trabajos",
      icon: <FaChartLine className="text-orange-600 dark:text-orange-400" />,
      avatar: "RB",
      skills: ["Avalúos", "Planos", "SIG"],
    },
  ], []);

  const renderStars = useCallback((rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < rating ? "text-yellow-500 dark:text-yellow-400" : "text-gray-300 dark:text-gray-600"}
        size={14}
      />
    ));
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handleTestimonialChange = useCallback((index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    const timer = setTimeout(() => setIsAutoPlaying(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const currentTestimonialData = testimonials[currentTestimonial];

  // Skeleton loader durante SSR
  if (!mounted) {
    return (
      <section className="py-20 bg-transparent">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="animate-pulse space-y-8">
            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-3xl" />
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 overflow-hidden bg-transparent">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/5 w-2 h-2 rounded-full bg-emerald-500/30 dark:bg-emerald-400/40 animate-ping" />
        <div className="absolute top-40 right-1/4 w-1.5 h-1.5 rounded-full bg-blue-500/40 dark:bg-blue-400/50 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-purple-500/35 dark:bg-purple-400/45 animate-bounce" />
      </div>

      <ScrollAnimation>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <FaQuoteLeft className="text-white text-lg" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Testimonios
              </h2>
            </div>
            <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Experiencias reales de clientes que han confiado en mi trabajo
            </p>
          </div>

          {/* Featured Testimonial */}
          <div className="mb-16">
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 shadow-xl transition-all duration-500">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  {/* Avatar */}
                  <div className="flex-shrink-0 text-center md:text-left">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto md:mx-0 shadow-lg">
                      {currentTestimonialData.avatar}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                        {currentTestimonialData.name}
                      </h4>
                      <p className="font-semibold mb-1 text-emerald-600 dark:text-emerald-400">
                        {currentTestimonialData.role}
                      </p>
                      <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
                        {currentTestimonialData.company}
                      </p>
                      <div className="flex justify-center md:justify-start gap-1 mb-2">
                        {renderStars(currentTestimonialData.rating)}
                      </div>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1">
                    <FaQuoteLeft className="text-2xl mb-4 text-emerald-600 dark:text-emerald-400 opacity-60" />
                    <blockquote className="text-lg leading-relaxed mb-6 italic text-gray-900 dark:text-white">
                      "{currentTestimonialData.feedback}"
                    </blockquote>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        {currentTestimonialData.icon}
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          Proyecto: {currentTestimonialData.project}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {currentTestimonialData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm border bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700/50 transition-transform hover:scale-105"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controles del carousel */}
              <div className="flex justify-center mt-8 gap-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleTestimonialChange(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial ? "scale-125" : "hover:scale-110"
                    }`}
                    style={{
                      backgroundColor: index === currentTestimonial 
                        ? resolvedTheme === 'dark' ? '#34d399' : '#059669'
                        : resolvedTheme === 'dark' ? '#6b7280' : '#9ca3af'
                    }}
                    aria-label={`Ver testimonio de ${testimonials[index].name}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Grid de testimonios */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                onClick={() => handleTestimonialChange(index)}
                className={`
                  group bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm p-6 rounded-2xl 
                  border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl 
                  transition-all duration-500 hover:-translate-y-2 cursor-pointer
                  ${index === currentTestimonial ? 'ring-2 ring-emerald-500 dark:ring-emerald-400' : ''}
                `}
              >
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <div className="flex gap-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                    {testimonial.icon}
                  </div>

                  {/* Contenido */}
                  <blockquote className="italic mb-4 line-clamp-3 text-sm text-gray-800 dark:text-gray-200">
                    "{testimonial.feedback}"
                  </blockquote>

                  {/* Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                      <FaBriefcase size={12} />
                      <span className="truncate">{testimonial.role}</span>
                    </div>
                    <p className="text-sm truncate text-gray-600 dark:text-gray-400">
                      {testimonial.company}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {testimonial.skills.slice(0, 2).map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded text-xs border bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700/50"
                        >
                          {skill}
                        </span>
                      ))}
                      {testimonial.skills.length > 2 && (
                        <span className="px-2 py-1 rounded text-xs border bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600">
                          +{testimonial.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 backdrop-blur-sm rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800/30">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                ¿Listo para ser el próximo testimonio?
              </h3>
              <p className="mb-6 max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
                Únete a estos clientes satisfechos y descubre cómo puedo ayudarte a alcanzar tus objetivos tecnológicos.
              </p>
              <button className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                Iniciar Proyecto
              </button>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;