"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import ScrollAnimation from "./ui/scroll-animation";
import { FaQuoteLeft, FaStar, FaUserCircle, FaBriefcase, FaMapMarkedAlt, FaChartLine, FaProjectDiagram } from "react-icons/fa";

const Testimonials = () => {
  const { theme } = useTheme();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Memoized testimonials data
  const testimonials = useMemo(() => [
    {
      name: "Alex Vergara",
      role: "Cliente",
      company: "N/A",
      feedback:
        "Sebastián es un profesional comprometido y creativo. Su ayuda fue clave para el desarrollo de la página de la Red Bacata. La calidad de su trabajo superó nuestras expectativas.",
      rating: 5,
      project: "Red Bacata",
      icon: <FaProjectDiagram className="text-blue-400" />,
      avatar: "AV",
      skills: ["Desarrollo Web", "Investigación"],
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      name: "Astrid Olarte",
      role: "Cliente", 
      company: "N/A",
      feedback:
        "Sebastián nos ayudó a crear una página web noCode para nuestro trabajo de grado. Su profesionalismo y creatividad fueron clave para el éxito del proyecto.",
      rating: 5,
      project: "Análisis Geoespacial Avanzado",
      icon: <FaMapMarkedAlt className="text-green-400" />,
      avatar: "AO",
      skills: ["ArcGIS", "QGIS", "Geoanálisis"],
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      name: "Ricardo Bacca Ávila",
      role: "Ingeniero en Ingeterra Projects S.A.S.",
      company: "Ingeterra Projects S.A.S.",
      feedback:
        "Sebastián ha colaborado con nosotros en varios trabajos de la organización. Puedo decir que es un profesional comprometido y con una gran capacidad de aprendizaje. Su trabajo en GIS y Civil3D ha sido excepcional.",
      rating: 5,
      project: "Varios trabajos",
      icon: <FaChartLine className="text-orange-400" />,
      avatar: "RB",
      skills: ["Avalúos", "Planos", "SIG"],
      gradient: "from-orange-500/20 to-red-500/20"
    },
  ], []);

  // Memoized theme colors
  const colors = useMemo(() => {
    const isDark = theme === 'dark';
    
    return {
      // Fondos principales
      sectionBg: 'transparent',
      
      // Fondos de tarjetas
      cardBg: isDark 
        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
      
      cardHoverBg: isDark
        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(241, 245, 249, 0.9) 100%)',
      
      // Featured testimonial
      featuredBg: isDark
        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
      
      // Texto principal
      primaryText: isDark ? '#ffffff' : '#1f2937',
      secondaryText: isDark ? 'rgba(255, 255, 255, 0.9)' : '#374151',
      mutedText: isDark ? '#d1d5db' : '#6b7280',
      
      // Texto de descripción
      descriptionText: isDark ? '#e5e7eb' : '#4b5563',
      quoteText: isDark ? 'rgba(255, 255, 255, 0.9)' : '#1f2937',
      
      // Acentos y elementos destacados
      accentGreen: isDark ? '#22c55e' : '#059669',
      accentBlue: isDark ? '#3b82f6' : '#1d4ed8',
      accentPurple: isDark ? '#a855f7' : '#7c3aed',
      
      // Bordes
      border: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
      borderHover: isDark ? 'rgba(34, 197, 94, 0.5)' : 'rgba(5, 150, 105, 0.6)',
      
      // Partículas y efectos
      particle1: isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(5, 150, 105, 0.4)',
      particle2: isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(29, 78, 216, 0.5)',
      particle3: isDark ? 'rgba(168, 85, 247, 0.35)' : 'rgba(124, 58, 237, 0.45)',
      
      // Gradientes SVG
      svgStop1: isDark ? { color: '#3b82f6', opacity: 0.2 } : { color: '#1d4ed8', opacity: 0.3 },
      svgStop2: isDark ? { color: '#10b981', opacity: 0.3 } : { color: '#047857', opacity: 0.4 },
      svgStop3: isDark ? { color: '#8b5cf6', opacity: 0.2 } : { color: '#7c3aed', opacity: 0.3 },
      
      // CTA section
      ctaBg: isDark
        ? 'linear-gradient(to right, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)'
        : 'linear-gradient(to right, rgba(5, 150, 105, 0.15) 0%, rgba(29, 78, 216, 0.15) 100%)',
      
      ctaBorder: isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(5, 150, 105, 0.4)'
    };
  }, [theme]);

  // Memoized star renderer
  const renderStars = useCallback((rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`${
          i < rating ? "text-yellow-400" : (theme === 'dark' ? "text-gray-600" : "text-gray-400")
        } transition-colors duration-300`}
        size={14}
      />
    ));
  }, [theme]);

  // Auto-rotate testimonials with cleanup
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Optimized testimonial change handler
  const handleTestimonialChange = useCallback((index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    const timer = setTimeout(() => setIsAutoPlaying(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section 
      className="relative py-20 overflow-hidden"
      style={{ background: colors.sectionBg }}
    >
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Partículas flotantes optimizadas */}
        <div 
          className="absolute top-20 left-1/5 w-2 h-2 rounded-full animate-ping"
          style={{ backgroundColor: colors.particle1 }}
        />
        <div 
          className="absolute top-40 right-1/4 w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: colors.particle2 }}
        />
        <div 
          className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full animate-bounce"
          style={{ backgroundColor: colors.particle3 }}
        />
        
        {/* Líneas conectoras geométricas */}
        <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
          <defs>
            <linearGradient id="testimonialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.svgStop1.color} stopOpacity={colors.svgStop1.opacity} />
              <stop offset="50%" stopColor={colors.svgStop2.color} stopOpacity={colors.svgStop2.opacity} />
              <stop offset="100%" stopColor={colors.svgStop3.color} stopOpacity={colors.svgStop3.opacity} />
            </linearGradient>
          </defs>
          <path d="M0,100 Q200,50 400,100 T800,100" stroke="url(#testimonialGradient)" strokeWidth="1" fill="none" className="animate-pulse" />
          <path d="M200,200 Q400,150 600,200 T1000,200" stroke="url(#testimonialGradient)" strokeWidth="0.8" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }} />
        </svg>
      </div>

      <ScrollAnimation>
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <FaQuoteLeft className="text-white text-lg" />
              </div>
              <h2 
                className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
              >
                Testimonios
              </h2>
            </div>
            <p 
              className="text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: colors.descriptionText }}
            >
              Experiencias reales de clientes que han confiado en mi trabajo
            </p>
          </div>

          {/* Featured Testimonial - Carousel Style */}
          <div className="mb-16">
            <div className="relative max-w-4xl mx-auto">
              <div 
                className="backdrop-blur-lg rounded-3xl p-8 md:p-12 border shadow-2xl transition-all duration-500"
                style={{ 
                  background: colors.featuredBg,
                  borderColor: colors.border
                }}
              >
                <div className="flex flex-col md:flex-row items-start gap-8">
                  {/* Avatar y Info */}
                  <div className="flex-shrink-0 text-center md:text-left">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto md:mx-0 shadow-lg">
                      {currentTestimonialData.avatar}
                    </div>
                    <div className="text-center md:text-left">
                      <h4 
                        className="text-xl font-bold mb-1"
                        style={{ color: colors.primaryText }}
                      >
                        {currentTestimonialData.name}
                      </h4>
                      <p 
                        className="font-semibold mb-1"
                        style={{ color: colors.accentGreen }}
                      >
                        {currentTestimonialData.role}
                      </p>
                      <p 
                        className="text-sm mb-3"
                        style={{ color: colors.mutedText }}
                      >
                        {currentTestimonialData.company}
                      </p>
                      <div className="flex justify-center md:justify-start gap-1 mb-2">
                        {renderStars(currentTestimonialData.rating)}
                      </div>
                    </div>
                  </div>

                  {/* Contenido del testimonio */}
                  <div className="flex-1">
                    <FaQuoteLeft 
                      className="text-2xl mb-4 opacity-60" 
                      style={{ color: colors.accentGreen }} 
                    />
                    <blockquote 
                      className="text-lg leading-relaxed mb-6 italic"
                      style={{ color: colors.quoteText }}
                    >
                      "{currentTestimonialData.feedback}"
                    </blockquote>
                    
                    {/* Proyecto y habilidades */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        {currentTestimonialData.icon}
                        <span 
                          className="font-medium"
                          style={{ color: colors.secondaryText }}
                        >
                          Proyecto: {currentTestimonialData.project}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {currentTestimonialData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm border transition-all duration-300 hover:scale-105"
                            style={{
                              backgroundColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(5, 150, 105, 0.15)',
                              color: colors.accentGreen,
                              borderColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(5, 150, 105, 0.4)'
                            }}
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "scale-125"
                        : "hover:scale-110"
                    }`}
                    style={{
                      backgroundColor: index === currentTestimonial 
                        ? colors.accentGreen
                        : (theme === 'dark' ? '#6b7280' : '#9ca3af')
                    }}
                    aria-label={`Ver testimonio de ${testimonials[index].name}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Grid de todos los testimonios */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className={`
                  relative group backdrop-blur-md p-6 rounded-2xl border shadow-lg
                  hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2
                  overflow-hidden cursor-pointer
                  ${index === currentTestimonial ? 'ring-2 ring-opacity-50' : ''}
                `}
                style={{
                  background: colors.cardBg,
                  borderColor: index === currentTestimonial ? colors.borderHover : colors.border,
                  boxShadow: index === currentTestimonial 
                    ? `0 20px 40px -12px ${colors.particle1}` 
                    : undefined
                }}
                onClick={() => handleTestimonialChange(index)}
              >
                {/* Efecto de fondo con gradiente dinámico */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
                />
                
                {/* Partículas en las tarjetas */}
                <div 
                  className="absolute top-3 right-3 w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping transition-opacity duration-300"
                  style={{ backgroundColor: colors.accentGreen }}
                />
                
                <div className="relative z-10">
                  {/* Header de la tarjeta */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p 
                          className="font-semibold text-sm"
                          style={{ color: colors.primaryText }}
                        >
                          {testimonial.name}
                        </p>
                        <div className="flex gap-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                    {testimonial.icon}
                  </div>

                  {/* Contenido del testimonio */}
                  <blockquote 
                    className="italic mb-4 line-clamp-3 text-sm leading-relaxed"
                    style={{ color: colors.quoteText }}
                  >
                    "{testimonial.feedback}"
                  </blockquote>

                  {/* Info del rol y empresa */}
                  <div className="space-y-2">
                    <div 
                      className="flex items-center gap-2 text-sm"
                      style={{ color: colors.accentGreen }}
                    >
                      <FaBriefcase size={12} />
                      <span className="truncate">{testimonial.role}</span>
                    </div>
                    <p 
                      className="text-sm truncate"
                      style={{ color: colors.mutedText }}
                    >
                      {testimonial.company}
                    </p>
                    
                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {testimonial.skills.slice(0, 2).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 rounded text-xs border"
                          style={{
                            backgroundColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(5, 150, 105, 0.15)',
                            color: colors.accentGreen,
                            borderColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(5, 150, 105, 0.4)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                      {testimonial.skills.length > 2 && (
                        <span 
                          className="px-2 py-1 rounded text-xs border"
                          style={{
                            backgroundColor: theme === 'dark' ? 'rgba(156, 163, 175, 0.2)' : 'rgba(107, 114, 128, 0.15)',
                            color: colors.mutedText,
                            borderColor: theme === 'dark' ? 'rgba(156, 163, 175, 0.3)' : 'rgba(107, 114, 128, 0.3)'
                          }}
                        >
                          +{testimonial.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div 
                    className="absolute inset-0 rounded-2xl animate-pulse"
                    style={{ 
                      background: theme === 'dark' 
                        ? 'linear-gradient(to right, rgba(34, 197, 94, 0.1), transparent, rgba(59, 130, 246, 0.1))'
                        : 'linear-gradient(to right, rgba(5, 150, 105, 0.1), transparent, rgba(29, 78, 216, 0.1))'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div 
              className="backdrop-blur-sm rounded-2xl p-8 border transition-all duration-500 hover:shadow-xl"
              style={{ 
                background: colors.ctaBg,
                borderColor: colors.ctaBorder
              }}
            >
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: colors.primaryText }}
              >
                ¿Listo para ser el próximo testimonio?
              </h3>
              <p 
                className="mb-6 max-w-2xl mx-auto"
                style={{ color: colors.secondaryText }}
              >
                Únete a estos clientes satisfechos y descubre cómo puedo ayudarte a alcanzar tus objetivos tecnológicos.
              </p>
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Iniciar Proyecto
              </button>
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* Estilos CSS personalizados */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;