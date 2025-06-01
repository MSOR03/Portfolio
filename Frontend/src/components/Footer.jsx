import Link from "next/link";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaSquareWhatsapp, FaDatabase } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { GiSkills, GiArchiveResearch } from "react-icons/gi";
import ScrollAnimation from "@/components/ui/scroll-animation";
const Footer = () => {
  return (
    // El fondo principal del footer con un degradado sutil
    <footer className="footer-container bg-gradient-to-b from-[#1a1a1a] via-[#222222] to-[#1a1a1a] text-gray-300 select-none">
      <ScrollAnimation>
      {/* Sección de Redes Sociales: Ahora con un fondo ligeramente distinto para dar más profundidad */}
      <section className="footer-social py-6 bg-[#252525] border-b border-green-700/30">
        
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl">
          <span className="text-sm text-gray-400 font-medium tracking-wide mb-4 md:mb-0">
            Conectémonos en las redes sociales:
          </span>
          <div className="flex space-x-4">
            {[
              { icon: <FaFacebook size={22} />, href: "/", label: "Facebook" },
              { icon: <FaYoutube size={22} />, href: "/", label: "YouTube" },
              { icon: <FaSquareWhatsapp size={22} />, href: "/", label: "WhatsApp" },
              { icon: <FaInstagram size={22} />, href: "/", label: "Instagram" },
            ].map(({ icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                // Ajuste de colores y hover para los iconos
                className="flex items-center justify-center w-10 h-10 rounded-full border border-green-600 bg-transparent text-green-400 hover:bg-green-600 hover:text-gray-900 transition-all duration-300 transform hover:scale-110 shadow-md"
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de información tipo tarjetas: Fondo y efectos de hover mejorados */}
      <section className="footer-info py-10 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Tarjetas individuales */}
        {[
          {
            title: "Perfil",
            icon: <CgProfile size={22} />,
            content: (
              <p className="text-gray-300 text-sm leading-relaxed">
                Ingeniero Topográfico, Ingeniero en Sistemas y Computación, Asistente Administrativo.
              </p>
            ),
          },
          {
            title: "Habilidades",
            icon: <GiSkills size={22} />,
            content: (
              <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                <li>Desarrollo de software</li>
                <li>GIS</li>
                <li>Diseños Geométricos</li>
                <li>Servicio Técnico</li>
              </ul>
            ),
          },
          {
            title: "Áreas de Interés",
            icon: <GiArchiveResearch size={22} />,
            content: (
              <ul className="text-gray-300 text-sm space-y-2">
                <li>
                  <a
                    href="https://comunidad.udistrital.edu.co/investudcn10/red-bacata-it/"
                    target="_blank"
                    rel="noopener noreferrer"
                    // Color de enlace en verde y con buen hover
                    className="text-green-400 hover:text-green-500 transition-colors"
                  >
                    Sistemas Información
                  </a>
                </li>
                <li>
                  <a
                    href="https://fambiental.udistrital.edu.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-500 transition-colors"
                  >
                    Computación
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.udistrital.edu.co/inicio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-500 transition-colors"
                  >
                    Data Science
                  </a>
                </li>
                <li>
                  <a href="#gaming" className="text-green-400 hover:text-green-500 transition-colors">
                    Gaming
                  </a>
                </li>
              </ul>
            ),
          },
          {
            title: "Datos",
            icon: <FaDatabase size={22} />,
            content: (
              <ul className="text-gray-300 text-sm space-y-2 break-words">
                <li>
                  <a
                    href="https://www.google.com/maps/place/Cl.+66a+%2396-53,+Bogot%C3%A1/@4.708892,-74.0934149,17z/data=!3m1!4b1!4m6!3m5!1s0x8e3f9b8c0a8f9b9f:0x3c2e4f0a2b8e3a2c!8m2!3d4.708892!4d-74.0908346!16s%2Fg%2F11b810_13b?entry=ttu" // Enlace de Google Maps más preciso
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-500 transition-colors"
                  >
                    Calle 66a 96-53, Bogotá
                  </a>
                </li>
                <li>
                  <a href="mailto:olarteramirezsebastian83@gmail.com" className="text-green-400 hover:text-green-500 transition-colors break-words">
                    olarteramirezsebastian83@gmail.com
                  </a>
                </li>
                <li>+57 312-562-39-57</li>
              </ul>
            ),
          },
        ].map(({ title, icon, content }) => (
          <div
            key={title}
            // Fondo de la tarjeta y efectos de hover
            className="bg-[#2f3136] rounded-xl p-6 shadow-xl border border-green-700/40 hover:shadow-green-500/70 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-3 mb-3 justify-between">
              {/* Títulos en verde brillante */}
              <h6 className="font-bold text-lg text-green-400">{title}</h6>
              {/* Iconos en verde brillante */}
              <span className="text-green-400">{icon}</span>
            </div>
            {content}
          </div>
        ))}
      </section>
      </ScrollAnimation>

      {/* Footer final: Mismo fondo que la parte superior, pero con un borde de contraste */}
      <div className="text-center py-4 bg-[#1a1a1a] border-t border-green-700/50 text-gray-500 text-xs select-none">
        © 2024 Sebastián Olarte Ramirez — Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;