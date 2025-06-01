'use client';

{/*hOLA MUNDO*/}
import { Button } from "@/components/ui/button";

const ContactForm = () => {
  return (
    <form className="space-y-6">
      <div>
        <label className="block text-white/80 mb-2" htmlFor="name">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Tu nombre"
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div>
        <label className="block text-white/80 mb-2" htmlFor="email">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="tucorreo@ejemplo.com"
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div>
        <label className="block text-white/80 mb-2" htmlFor="message">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Escribe tu mensaje..."
          className="w-full px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="text-center">
        <Button
          type="submit"
          variant="outline"
          className="uppercase px-8 py-4 border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300"
        >
          Enviar mensaje
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
