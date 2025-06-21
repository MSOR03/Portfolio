'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";

const ContactForm = () => {
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      {/* Contenedor principal con el mismo estilo de las cards */}
      <div className="
        relative rounded-2xl 
        bg-slate-900/95 
        border border-green-400/20
        backdrop-blur-sm
        overflow-hidden
        transition-all duration-300 ease-out
        hover:border-green-400/30
      ">
        {/* Header con puntos decorativos como en tus cards */}
        <div className="relative p-6 pb-4 border-b border-slate-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400/60 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400/30 rounded-full"></div>
            </div>
            <div className="text-xs text-green-400/70 font-mono">
              CONTACTO
            </div>
          </div>
          
          <div className="mt-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Contáctame
            </h2>
            <p className="text-sm text-slate-400">
              ¿Tienes un proyecto o idea? ¡Hablemos!
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="p-6 space-y-5">
          {/* Campo Nombre */}
          <div className="space-y-2">
            <label 
              className="
                block text-green-400/90 text-xs font-medium uppercase tracking-widest
              " 
              htmlFor="name"
            >
              Nombre
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Maicol Sebastián Olarte Ramírez"
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="
                  w-full px-4 py-3 rounded-lg 
                  bg-slate-800/60 text-white placeholder-slate-500
                  border border-slate-600/30
                  focus:outline-none focus:border-green-400/50 focus:bg-slate-800/80
                  hover:border-slate-500/50
                  transition-all duration-200
                  text-sm
                "
              />
              {/* Línea de progreso sutil */}
              <div className={`
                absolute bottom-0 left-0 h-px bg-gradient-to-r from-green-400/80 to-green-400/20
                transition-all duration-300 ease-out
                ${focusedField === 'name' ? 'w-full' : 'w-0'}
              `}></div>
            </div>
          </div>

          {/* Campo Email */}
          <div className="space-y-2">
            <label 
              className="
                block text-green-400/90 text-xs font-medium uppercase tracking-widest
              " 
              htmlFor="email"
            >
              Correo electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="example@example.com"
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="
                  w-full px-4 py-3 rounded-lg 
                  bg-slate-800/60 text-white placeholder-slate-500
                  border border-slate-600/30
                  focus:outline-none focus:border-green-400/50 focus:bg-slate-800/80
                  hover:border-slate-500/50
                  transition-all duration-200
                  text-sm
                "
              />
              <div className={`
                absolute bottom-0 left-0 h-px bg-gradient-to-r from-green-400/80 to-green-400/20
                transition-all duration-300 ease-out
                ${focusedField === 'email' ? 'w-full' : 'w-0'}
              `}></div>
            </div>
          </div>

          {/* Campo Mensaje */}
          <div className="space-y-2">
            <label 
              className="
                block text-green-400/90 text-xs font-medium uppercase tracking-widest
              " 
              htmlFor="message"
            >
              Mensaje
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Cuéntame sobre tu proyecto o idea..."
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                className="
                  w-full px-4 py-3 rounded-lg 
                  bg-slate-800/60 text-white placeholder-slate-500
                  border border-slate-600/30
                  focus:outline-none focus:border-green-400/50 focus:bg-slate-800/80
                  hover:border-slate-500/50
                  transition-all duration-200
                  resize-none text-sm
                "
              />
              <div className={`
                absolute bottom-0 left-0 h-px bg-gradient-to-r from-green-400/80 to-green-400/20
                transition-all duration-300 ease-out
                ${focusedField === 'message' ? 'w-full' : 'w-0'}
              `}></div>
            </div>
          </div>
        </div>

        {/* Footer con botón */}
        <div className="p-6 pt-2 border-t border-slate-700/20">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="
              w-full py-3 
              bg-green-500 hover:bg-green-400
              text-slate-900 font-semibold text-sm uppercase tracking-wider
              rounded-lg
              hover:shadow-lg hover:shadow-green-500/20
              active:scale-98
              disabled:opacity-70 disabled:cursor-not-allowed
              transition-all duration-200
              flex items-center justify-center gap-2
            "
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></div>
                Enviando mensaje...
              </>
            ) : (
              <>
                Enviar mensaje
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </>
            )}
          </Button>
          
          {/* Indicadores de estado como en tus cards */}
          <div className="flex items-center justify-center gap-1 mt-4">
            <div className="w-1 h-1 bg-green-400/60 rounded-full"></div>
            <div className="w-1 h-1 bg-green-400/40 rounded-full"></div>
            <div className="w-1 h-1 bg-green-400/20 rounded-full"></div>
          </div>
        </div>

        {/* Línea decorativa inferior como en tus cards */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent"></div>
      </div>
    </div>
  );
};

export default ContactForm;