"use client";

import ContactForm from "./ContactForm";
import ScrollAnimation from "./ui/scroll-animation";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

const Map = dynamic(() => import("./Map"), { ssr: false });

const ContactSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="contacto"
      className={`py-5 relative overflow-hidden ${
        isDark ? "bg-transparent" : "bg-transparent"
      }`}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.1),transparent_20%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(34,197,94,0.05),transparent_20%)]"></div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-green-500/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 border border-green-400/30 rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-green-300 rounded-full animate-pulse"></div>

      <ScrollAnimation>
        <div className="container mx-auto px-4 relative z-10">
          {/* Grid de contenido */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Map Section */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div
                className={`relative rounded-2xl p-8 flex flex-col h-full shadow-2xl border backdrop-blur-xl transition-colors duration-500
                              ${
                                isDark
                                  ? "bg-gray-900/90 border-gray-700/50"
                                  : "bg-white/80 border-gray-200/50 shadow-lg"
                              }`}
              >
                {/* Map Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isDark ? "bg-green-500/20" : "bg-green-100"
                    }`}
                  >
                    <svg
                      className={`w-6 h-6 ${
                        isDark ? "text-green-400" : "text-green-500"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className={`text-2xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Mi Ubicación
                    </h3>
                    <p
                      className={`text-sm ${
                        isDark ? "text-green-400" : "text-green-500"
                      }`}
                    >
                      Bogotá, Colombia
                    </p>
                  </div>
                </div>

                {/* Map Container */}
                <div className="flex-grow rounded-xl overflow-hidden border border-gray-200/30">
                  <Map />
                </div>

                {/* Location Info */}
                <div
                  className={`mt-6 p-4 rounded-xl border ${
                    isDark
                      ? "bg-gray-800/50 border-gray-700/30"
                      : "bg-gray-100/50 border-gray-200/30"
                  }`}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={isDark ? "text-gray-300" : "text-gray-700"}
                    >
                      Zona Horaria
                    </span>
                    <span className="text-green-500 font-medium">
                      UTC-5 (COT)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span
                      className={isDark ? "text-gray-300" : "text-gray-700"}
                    >
                      Disponibilidad
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-500 font-medium">
                        En línea
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div
                className={`relative rounded-2xl p-8 flex flex-col h-full shadow-2xl border backdrop-blur-xl transition-colors duration-500
                              ${
                                isDark
                                  ? "bg-gray-900/90 border-gray-700/50"
                                  : "bg-white/80 border-gray-200/50 shadow-lg"
                              }`}
              >
                {/* Form Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isDark ? "bg-green-500/20" : "bg-green-100"
                    }`}
                  >
                    <svg
                      className={`w-6 h-6 ${
                        isDark ? "text-green-400" : "text-green-500"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className={`text-2xl font-bold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Contáctame
                    </h3>
                    <p
                      className={`text-sm ${
                        isDark ? "text-green-400" : "text-green-500"
                      }`}
                    >
                      Respuesta en 24 horas
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p
                    className={`${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } leading-relaxed`}
                  >
                    ¿Tienes un proyecto en mente? Me especializo en crear
                    soluciones digitales innovadoras que impulsan el crecimiento
                    de tu negocio.
                  </p>
                </div>

                {/* Contact Form */}
                <div className="flex-grow">
                  <ContactForm theme={isDark ? "dark" : "light"} />
                </div>

                {/* Quick Contact Options */}
                <div
                  className={`mt-8 pt-6 border-t ${
                    isDark ? "border-gray-700/50" : "border-gray-200/50"
                  }`}
                >
                  <p
                    className={`text-sm mb-4 ${
                      isDark ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    O contáctame directamente:
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {/* Email */}
                    <a
                      href="mailto:tu-email@gmail.com"
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 text-sm
                                  ${
                                    isDark
                                      ? "bg-gray-800/50 hover:bg-gray-700/50"
                                      : "bg-gray-100/50 hover:bg-gray-200/50"
                                  }`}
                    >
                      <svg
                        className={`w-4 h-4 ${
                          isDark ? "text-green-400" : "text-green-500"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span
                        className={isDark ? "text-gray-300" : "text-gray-700"}
                      >
                        Email
                      </span>
                    </a>
                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com/in/tu-perfil"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 text-sm
                                  ${
                                    isDark
                                      ? "bg-gray-800/50 hover:bg-gray-700/50"
                                      : "bg-gray-100/50 hover:bg-gray-200/50"
                                  }`}
                    >
                      <svg
                        className={`w-4 h-4 ${
                          isDark ? "text-green-400" : "text-green-500"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span
                        className={isDark ? "text-gray-300" : "text-gray-700"}
                      >
                        LinkedIn
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div
              className={`inline-flex items-center gap-2 text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Tiempo de respuesta promedio: 2-4 horas</span>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
};

export default ContactSection;
