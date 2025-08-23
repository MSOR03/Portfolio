"use client";

import ScrollAnimation from "./ui/scroll-animation";
import { FaQuoteLeft, FaStar, FaUserCircle, FaBriefcase, FaMapMarkedAlt, FaChartLine, FaProjectDiagram } from "react-icons/fa";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Alex Vergara",
    role: "Cliente",
    company: "N/A",
    feedback:
      "Sebastián es un profesional comprometido y creativo.Su ayuda fue clave para el desarrollo de la pagina de la Red Bacata. La calidad de su trabajo superó nuestras expectativas.",
    rating: 5,
    project: "Red Bacata",
    icon: <FaProjectDiagram className="text-blue-400" />,
    avatar: "LP",
    skills: ["Desarrollo Web", "Investigacion"],
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    name: "Astrid Olarte",
    role: "Cliente",
    company: "N/A",
    feedback:
      "Sebastian nos ayudo a crear una pagina web noCode para nuestro trabajo de grado. Su profesionalismo y creatividad fueron clave para el éxito del proyecto.",
    rating: 5,
    project: "Análisis Geoespacial Avanzado",
    icon: <FaMapMarkedAlt className="text-green-400" />,
    avatar: "CR",
    skills: ["ArcGIS", "QGIS", "Geoanálisis"],
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    name: "Ricardo Bacca Avila",
    role: "Ingeniero en Ingeterra Projects S.A.S.",
    company: "Ingeterra Projects S.A.S.",
    feedback:
      "Sebastian ha colaborado con nosotros en varios trabajos de la organización, puedo decir que es un profesional comprometido y con una gran capacidad de aprendizaje. Su trabajo en GIS y Civil3D ha sido excepcional.",
    rating: 5,
    project: "Varios trabajos",
    icon: <FaChartLine className="text-orange-400" />,
    avatar: "AG",
    skills: ["Avaluos", "Planos", "SIG"],
    gradient: "from-orange-500/20 to-red-500/20"
  },
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`${
          i < rating ? "text-yellow-400" : "text-gray-600"
        } transition-colors duration-300`}
        size={14}
      />
    ));
  };

  return (
    <section className="relative py-20 bg-transparent overflow-hidden">
      {/* Efectos de fondo animados */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Partículas flotantes */}
        <div className="absolute top-20 left-1/5 w-2 h-2 bg-green-400/30 rounded-full animate-ping" />
        <div className="absolute top-40 right-1/4 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-400/35 rounded-full animate-bounce" />
        
        {/* Líneas conectoras geométricas */}
        <svg className="absolute inset-0 w-full h-full opacity-5" preserveAspectRatio="none">
          <defs>
            <linearGradient id="testimonialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
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
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <FaQuoteLeft className="text-white text-lg" />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Testimonios
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Experiencias reales de clientes que han confiado en mi trabajo
            </p>
          </div>

          {/* Featured Testimonial - Carousel Style */}
          <div className="mb-16">
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
                <div className="flex flex-col md:flex-row items-start gap-8">
                  {/* Avatar y Info */}
                  <div className="flex-shrink-0 text-center md:text-left">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-4 mx-auto md:mx-0 shadow-lg">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <div className="text-center md:text-left">
                      <h4 className="text-xl font-bold text-white mb-1">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-green-400 font-semibold mb-1">
                        {testimonials[currentTestimonial].role}
                      </p>
                      <p className="text-gray-400 text-sm mb-3">
                        {testimonials[currentTestimonial].company}
                      </p>
                      <div className="flex justify-center md:justify-start gap-1 mb-2">
                        {renderStars(testimonials[currentTestimonial].rating)}
                      </div>
                    </div>
                  </div>

                  {/* Contenido del testimonio */}
                  <div className="flex-1">
                    <FaQuoteLeft className="text-green-400 text-2xl mb-4 opacity-60" />
                    <blockquote className="text-white/90 text-lg leading-relaxed mb-6 italic">
                      "{testimonials[currentTestimonial].feedback}"
                    </blockquote>
                    
                    {/* Proyecto y habilidades */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        {testimonials[currentTestimonial].icon}
                        <span className="text-gray-300 font-medium">
                          Proyecto: {testimonials[currentTestimonial].project}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {testimonials[currentTestimonial].skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-400/20 text-green-300 rounded-full text-sm border border-green-400/30"
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
                    onClick={() => {
                      setCurrentTestimonial(index);
                      setIsAutoPlaying(false);
                      setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial
                        ? "bg-green-400 scale-125"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
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
                key={index}
                className={`
                  relative group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md 
                  p-6 rounded-2xl border border-white/20 shadow-lg
                  hover:shadow-2xl hover:shadow-green-500/20 hover:border-green-400/50
                  transition-all duration-500 transform hover:-translate-y-2
                  overflow-hidden cursor-pointer
                  ${index === currentTestimonial ? 'ring-2 ring-green-400/50 shadow-green-500/30' : ''}
                `}
                onClick={() => {
                  setCurrentTestimonial(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
              >
                {/* Efecto de fondo con gradiente dinámico */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Partículas en las tarjetas */}
                <div className="absolute top-3 right-3 w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-ping transition-opacity duration-300" />
                
                <div className="relative z-10">
                  {/* Header de la tarjeta */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{testimonial.name}</p>
                        <div className="flex gap-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                    {testimonial.icon}
                  </div>

                  {/* Contenido del testimonio */}
                  <blockquote className="text-white/90 italic mb-4 line-clamp-3">
                    "{testimonial.feedback}"
                  </blockquote>

                  {/* Info del rol y empresa */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <FaBriefcase size={12} />
                      <span>{testimonial.role}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{testimonial.company}</p>
                    
                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {testimonial.skills.slice(0, 2).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-green-400/20 text-green-300 rounded text-xs border border-green-400/30"
                        >
                          {skill}
                        </span>
                      ))}
                      {testimonial.skills.length > 2 && (
                        <span className="px-2 py-1 bg-gray-400/20 text-gray-300 rounded text-xs">
                          +{testimonial.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 via-transparent to-blue-500/10 animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-green-400/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Listo para ser el próximo testimonio?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
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