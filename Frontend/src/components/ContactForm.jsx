'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";

const ContactForm = () => {
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    // Validación de campos
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "warning", message: "Por favor completa todos los campos." });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://localhost:5000/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: "Correo enviado con éxito ✅" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: "Error al enviar el correo ❌" });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Hubo un problema con el servidor ❌" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <div
        className="
          relative rounded-2xl 
          bg-slate-900/95 
          border border-green-400/20
          backdrop-blur-sm
          overflow-hidden
          transition-all duration-300 ease-out
          hover:border-green-400/30
        "
        translate="yes"
      >
        <div className="relative p-6 pb-4 border-b border-slate-700/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400/60 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400/30 rounded-full"></div>
            </div>
            <div className="text-xs text-green-400/70 font-mono">CONTACTO</div>
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
        <form className="p-6 space-y-5" translate="yes">
          {/* Mensaje de estado */}
          {status && (
            <div
              className={`p-3 rounded-md text-sm font-medium mb-4 transition-all duration-300 ${
                status.type === "success"
                  ? "bg-green-600/80 text-white"
                  : status.type === "error"
                  ? "bg-red-600/80 text-white"
                  : "bg-yellow-500/80 text-white"
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Campo Nombre */}
          <div className="space-y-2">
            <label
              className="block text-green-400/90 text-xs font-medium uppercase tracking-widest"
              htmlFor="name"
              translate="yes"
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocusedField("name")}
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
              <div
                className={`
                  absolute bottom-0 left-0 h-px bg-gradient-to-r from-green-400/80 to-green-400/20
                  transition-all duration-300 ease-out
                  ${focusedField === "name" ? "w-full" : "w-0"}
                `}
              ></div>
            </div>
          </div>

          {/* Campo Email */}
          <div className="space-y-2">
            <label
              className="block text-green-400/90 text-xs font-medium uppercase tracking-widest"
              htmlFor="email"
              translate="yes"
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocusedField("email")}
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
              <div
                className={`
                  absolute bottom-0 left-0 h-px bg-gradient-to-r from-green-400/80 to-green-400/20
                  transition-all duration-300 ease-out
                  ${focusedField === "email" ? "w-full" : "w-0"}
                `}
              ></div>
            </div>
          </div>

          {/* Campo Mensaje */}
          <div className="space-y-2">
            <label
              className="block text-green-400/90 text-xs font-medium uppercase tracking-widest"
              htmlFor="message"
              translate="yes"
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
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocusedField("message")}
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
              <div
                className={`
                  absolute bottom-0 left-0 h-px bg-gradient-to-r from-green-400/80 to-green-400/20
                  transition-all duration-300 ease-out
                  ${focusedField === "message" ? "w-full" : "w-0"}
                `}
              ></div>
            </div>
          </div>

          {/* Footer con botón */}
          <div className="pt-2 border-t border-slate-700/20">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              translate="no"
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
                  Enviando mensaje
                </>
              ) : (
                <>
                  Enviar mensaje
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-1 mt-4">
              <div className="w-1 h-1 bg-green-400/60 rounded-full"></div>
              <div className="w-1 h-1 bg-green-400/40 rounded-full"></div>
              <div className="w-1 h-1 bg-green-400/20 rounded-full"></div>
            </div>
          </div>
        </form>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent"></div>
      </div>
    </div>
  );
};

export default ContactForm;
