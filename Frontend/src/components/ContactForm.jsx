"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTheme } from "next-themes";

const ContactForm = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

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

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "warning",
        message: "Por favor completa todos los campos.",
      });
      return;
    }

    setIsSubmitting(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      const response = await fetch(
        `${API_URL}/api/email/send`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: "Correo enviado con éxito ✅" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ type: "error", message: "Error al enviar el correo ❌" });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Hubo un problema con el servidor ❌",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClasses = `
    w-full px-4 py-3 rounded-lg 
    border
    focus:outline-none
    transition-all duration-200 text-sm
  `;

  const inputThemeClasses = isDark
    ? `bg-slate-800/60 text-white placeholder-slate-500 border-slate-600/30 focus:border-green-400/50 focus:bg-slate-800/80 hover:border-slate-500/50`
    : `bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:border-green-400/50 focus:bg-gray-100 hover:border-gray-400`;

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <div
        className={`
          relative rounded-2xl
          ${
            isDark
              ? "bg-slate-900/95 border border-green-400/20"
              : "bg-white/95 border border-gray-300"
          }
          backdrop-blur-sm
          overflow-hidden
          transition-all duration-300 ease-out
          hover:border-green-400/30
        `}
      >
        <div
          className={`relative p-6 pb-4 border-b ${
            isDark ? "border-slate-700/30" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400/60 rounded-full"></div>
              <div className="w-2 h-2 bg-green-400/30 rounded-full"></div>
            </div>
            <div
              className={`text-xs ${
                isDark ? "text-green-400/70" : "text-green-600/70"
              } font-mono`}
            >
              CONTACTO
            </div>
          </div>

          <div className="mt-4">
            <h2
              className={`text-xl sm:text-2xl font-bold mb-1 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Contáctame
            </h2>
            <p
              className={`${
                isDark ? "text-slate-400" : "text-gray-600"
              } text-sm`}
            >
              ¿Tienes un proyecto o idea? ¡Hablemos!
            </p>
          </div>
        </div>

        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          {status && (
            <div
              className={`
                p-3 rounded-md text-sm font-medium mb-4 transition-all duration-300
                ${status.type === "success" ? "bg-green-600/80 text-white" : ""}
                ${status.type === "error" ? "bg-red-600/80 text-white" : ""}
                ${
                  status.type === "warning" ? "bg-yellow-500/80 text-white" : ""
                }
              `}
            >
              {status.message}
            </div>
          )}

          {["name", "email", "message"].map((field) => (
            <div className="space-y-2" key={field}>
              <label
                htmlFor={field}
                className={`block ${
                  isDark ? "text-green-400/90" : "text-green-600/90"
                } text-xs font-medium uppercase tracking-widest`}
              >
                {field === "name"
                  ? "Nombre"
                  : field === "email"
                  ? "Correo electrónico"
                  : "Mensaje"}
              </label>
              <div className="relative">
                {field !== "message" ? (
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    required
                    placeholder={
                      field === "name"
                        ? "Maicol Sebastián Olarte Ramírez"
                        : "example@example.com"
                    }
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputBaseClasses} ${inputThemeClasses}`}
                  />
                ) : (
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Cuéntame sobre tu proyecto o idea..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    onFocus={() => setFocusedField(field)}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputBaseClasses} ${inputThemeClasses} resize-none`}
                  />
                )}
                <div
                  className={`
                    absolute bottom-0 left-0 h-px bg-gradient-to-r from-green-400/80 to-green-400/20
                    transition-all duration-300 ease-out
                    ${focusedField === field ? "w-full" : "w-0"}
                  `}
                ></div>
              </div>
            </div>
          ))}

          <div className="pt-2 border-t border-slate-700/20">
            <Button
              type="submit"
              disabled={isSubmitting}
              translate="no"
              className={`
                w-full py-3
                ${
                  isDark
                    ? "bg-green-500 hover:bg-green-400 text-slate-900"
                    : "bg-green-500 hover:bg-green-400 text-white"
                }
                font-semibold text-sm uppercase tracking-wider
                rounded-lg
                hover:shadow-lg hover:shadow-green-500/20
                active:scale-98
                disabled:opacity-70 disabled:cursor-not-allowed
                transition-all duration-200
                flex items-center justify-center gap-2
              `}
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
