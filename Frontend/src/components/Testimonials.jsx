import ScrollAnimation from "./ui/scroll-animation";
const testimonials = [
  {
    name: "Laura Pérez",
    role: "Gerente de Proyecto",
    feedback:
      "Sebastián es un profesional comprometido y creativo. Su aporte fue clave en la implementación del sistema de gestión territorial.",
  },
  {
    name: "Carlos Rodríguez",
    role: "CEO en Geomaps",
    feedback:
      "Excelente trabajo con ArcGIS y QGIS. Su habilidad para integrar soluciones fue fundamental en el proyecto.",
  },
  {
    name: "Andrea Gómez",
    role: "Analista de Datos",
    feedback:
      "Colaborar con Sebastián fue una experiencia positiva. Su enfoque técnico y atención al detalle marcaron la diferencia.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-transparent">
      <ScrollAnimation>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-400 mb-10 text-left">Testimonios de Éxito</h2>
        <p className="text-lg text-white text-left mb-10">Comentarios con los que he colaborado</p>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-md p-6 rounded-xl text-white shadow-md hover:shadow-xl transition duration-300"
            >
              <p className="text-white/90 italic">“{t.feedback}”</p>
              <div className="mt-4">
                <p className="text-green-400 font-semibold">{t.name}</p>
                <p className="text-sm text-white/60">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      </ScrollAnimation>
    </section>
  );
};

export default Testimonials;
