"use client";

import { memo, useState, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  FaQuoteLeft,
  FaStar,
  FaBriefcase,
} from "react-icons/fa";

const TESTIMONIALS_DATA = [
  {
    name: "Alex Vergara",
    role: "Cliente",
    company: "N/A",
    feedback: "Sebastián es un profesional comprometido y creativo. Su ayuda fue clave para el desarrollo de la página de la Red Bacata.",
    rating: 5,
    project: "Red Bacata",
    avatar: "AV",
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Astrid Olarte",
    role: "Cliente",
    company: "N/A",
    feedback: "Sebastián nos ayudó a crear una página web noCode para nuestro trabajo de grado. Su profesionalismo y creatividad fueron clave.",
    rating: 5,
    project: "Análisis Geoespacial",
    avatar: "AO",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    name: "Ricardo Bacca Ávila",
    role: "Ingeniero en Ingeterra",
    company: "Ingeterra Projects S.A.S.",
    feedback: "Sebastián es un profesional comprometido con gran capacidad de aprendizaje. Su trabajo en GIS y Civil3D ha sido excepcional.",
    rating: 5,
    project: "Varios proyectos",
    avatar: "RB",
    color: "from-orange-500 to-orange-600"
  },
];

const StarRating = memo(({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-400"}
        size={12}
      />
    ))}
  </div>
));
StarRating.displayName = "StarRating";

const TestimonialCard = memo(({ testimonial, isActive, onClick }) => {
  const { resolvedTheme } = useTheme();
  const isDark = useMemo(() => resolvedTheme === 'dark', [resolvedTheme]);

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-900 p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
        isDark ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-gray-300'
      } ${isActive ? 'ring-2 ring-emerald-500 shadow-lg' : 'shadow hover:shadow-md'}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
          {testimonial.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {testimonial.name}
          </p>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>

      <p className={`text-sm line-clamp-3 mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        "{testimonial.feedback}"
      </p>

      <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
        <FaBriefcase size={10} />
        <span className="truncate">{testimonial.role}</span>
      </div>
    </div>
  );
});
TestimonialCard.displayName = "TestimonialCard";

const Testimonials = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-play simplificado
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mounted]);

  const handleCardClick = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const isDark = useMemo(() => resolvedTheme === 'dark', [resolvedTheme]);
  const current = useMemo(() => TESTIMONIALS_DATA[currentIndex], [currentIndex]);

  if (!mounted) {
    return (
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
              <FaQuoteLeft className="text-white" size={16} />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
              Testimonios
            </h2>
          </div>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Experiencias de clientes que han confiado en mi trabajo
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className="mb-12">
          <div className={`rounded-2xl p-6 md:p-8 border transition-all duration-500 ${
            isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          } shadow-lg`}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 text-center md:text-left">
                <div className={`w-16 h-16 bg-gradient-to-br ${current.color} rounded-xl flex items-center justify-center text-white font-bold text-lg mb-3 mx-auto md:mx-0`}>
                  {current.avatar}
                </div>
                <h4 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {current.name}
                </h4>
                <p className="text-sm font-semibold mb-1 text-emerald-600 dark:text-emerald-400">
                  {current.role}
                </p>
                <StarRating rating={current.rating} />
              </div>

              <div className="flex-1">
                <FaQuoteLeft className="text-xl mb-3 text-emerald-600 dark:text-emerald-400 opacity-60" />
                <p className={`text-base leading-relaxed mb-4 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  "{current.feedback}"
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Proyecto: {current.project}
                </p>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {TESTIMONIALS_DATA.map((_, index) => (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-emerald-500 w-6'
                    : isDark ? 'bg-gray-600' : 'bg-gray-300'
                }`}
                aria-label={`Testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Grid de testimonios - Solo visible en desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 mb-12">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              isActive={index === currentIndex}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className={`rounded-xl p-6 border ${
            isDark 
              ? 'bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border-emerald-800/30' 
              : 'bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200'
          }`}>
            <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              ¿Listo para trabajar juntos?
            </h3>
            <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Únete a estos clientes satisfechos
            </p>
            <Link href="#contacto" scroll={true}>
              <button className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
                Iniciar Proyecto
              </button>
            </Link>
          </div>
        </div>
      </div>

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

export default memo(Testimonials);