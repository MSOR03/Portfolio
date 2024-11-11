import Link from "next/link";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaSquareWhatsapp, FaDatabase } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { GiSkills } from "react-icons/gi";
import { GiArchiveResearch } from "react-icons/gi";


const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="text-center text-white">
        {/* Sección de redes sociales con el gradiente personalizado */}
        <section className="footer-social p-4 bg-[linear-gradient(145deg,#1a3e40,#2c575a)]">
          <div className="container flex justify-between items-center">
            <div className="me-5">
              <span className="social-text text-sm">
                Conectemonos en las redes sociales:
              </span>
            </div>
            <div className="flex space-x-4 gap-2">
              <Link href="/" className="flex items-center justify-center w-10 h-10 m-2 rounded-full ring-2 ring-green-600 bg-white text-green-600 border-2 border-transparent transition-colors duration-300 hover:bg-gradient-to-br from-green-400 to-blue-600 hover:text-white">
                  <FaFacebook size={25} />
              </Link>
              <Link href="/" className="flex items-center justify-center w-10 h-10 m-2 rounded-full ring-2 ring-green-600 bg-white text-green-600 border-2 border-transparent transition-colors duration-300 hover:bg-gradient-to-br from-green-400 to-blue-600 hover:text-white">
                <FaYoutube size={25} />
              </Link>
              <Link href="/" className="flex items-center justify-center w-10 h-10 m-2 rounded-full ring-2 ring-green-600 bg-white text-green-600 border-2 border-transparent transition-colors duration-300 hover:bg-gradient-to-br from-green-400 to-blue-600 hover:text-white">
                <FaSquareWhatsapp size={25} />
              </Link>
              <Link href="/" className="flex items-center justify-center w-10 h-10 m-2 rounded-full ring-2 ring-green-600 bg-white text-green-600 border-2 border-transparent transition-colors duration-300 hover:bg-gradient-to-br from-green-400 to-blue-600 hover:text-white">
                <FaInstagram size={25} />
              </Link>
            </div>
          </div>
        </section>

        {/* Sección de enlaces y texto */}
        <section className="footer-info py-4 bg-primary text-white animate-gradientAnimation">
          <div className="container items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="mb-4 text-sm">
                <div className="flex justify-center items-center space-x-8 text-accent">
                  <CgProfile size={20} />
                  <h6 className="text-sm font-bold ">Perfil</h6>
                </div>
                <hr className="my-2 w-50 border-t-2 border-accent" />
                <p>
                  Ingeniero Topografico, Ingeniero en Sistemas y Computación,
                  Asistente Administrativo.
                </p>
              </div>

              <div className="mb-4 text-sm">
                <div className="flex justify-center items-center space-x-8 text-accent">
                  <h6 className="text-sm font-bold ">Habilidades</h6>
                  <GiSkills size={20} />
                </div>
                <hr className="my-2 w-45 border-t-2 border-accent" />
                <ul className="space-y-2">
                  <li>
                    <a href="" className="hover:underline">
                      Desarrollo de software
                    </a>
                  </li>
                  <li>
                    <a href="" className="hover:underline">
                      GIS
                    </a>
                  </li>
                  <li>
                    <a href="" className="hover:underline">
                      Diseños Geometricos
                    </a>
                  </li>
                  <li>
                    <a href="" className="hover:underline">
                      Servicio Tecnico
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mb-4 text-sm">
                <div className="flex justify-center items-center space-x-8 text-accent">
                  <h6 className="text-sm font-bold ">Areas Intereses</h6>
                  <GiArchiveResearch size={20} />
                </div>
                <hr className="my-2 w-45 border-t-2 border-accent" />
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://comunidad.udistrital.edu.co/investudcn10/red-bacata-it/"
                      className="hover:underline"
                    >
                      Sistemas Información
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://fambiental.udistrital.edu.co/"
                      className="hover:underline"
                    >
                      Computación
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.udistrital.edu.co/inicio"
                      className="hover:underline"
                    >
                      Data Science
                    </a>
                  </li>
                  <li>
                    <a href="#help" className="hover:underline">
                      Gaming
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mb-4 text-sm">
                <div className="flex justify-center items-center text-accent space-x-8">
                  <h6 className="text-sm font-bold">Datos</h6>
                  <FaDatabase size={20} />
                </div>
                <hr className="my-2 w-45 border-t-2 border-accent" />
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://www.google.com/maps/place/Cl.+66a+%2396-53/@4.6948747,-74.1191856,19z/data=!4m7!3m6!1s0x8e3f9b59797b82e5:0x8c5f500ac69f59f4!4b1!8m2!3d4.6948671!4d-74.1186395!16s%2Fg%2F11fq36bs3d?entry=ttu&g_ep=EgoyMDI0MTAyMS4xIKXMDSoASAFQAw%3D%3D"
                      className="hover:underline"
                    >
                      Calle 66a 96-53
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:redbacatait@gmail.com"
                      className="hover:underline"
                    >
                      olarteramirezsebastian83
                      <br />
                      @gmail.com
                    </a>
                  </li>
                  <li>
                    <span>+ 57 312-562-39-57</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de pie de página */}
        <div
          className="py-2 bg-[linear-gradient(145deg,#153b3e,#1e4c4f)]
 text-center text-sm"
        >
          <p>
            © 2024 Copyright: Sebastián Olarte Ramirez, Todos los derechos
            reservados, Creditos: Cristian Mihai.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
