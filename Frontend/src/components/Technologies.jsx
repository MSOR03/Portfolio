import ScrollAnimation from "./ui/scroll-animation";
import {
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiArcgis,
  SiAutodesk,
} from "react-icons/si";
import { FaMapMarkedAlt } from "react-icons/fa";

const engineeringSkills = [
  { name: "Civil3D", icon: <SiAutodesk size={48} className="text-green-400" /> },
  { name: "Revit", icon: <SiAutodesk size={48} className="text-blue-300" /> },
  { name: "ArcGIS", icon: <SiArcgis size={48} className="text-green-500" /> },
  { name: "QGIS", icon: <FaMapMarkedAlt size={48} className="text-lime-400" /> },
];

const devSkills = [
  { name: "JavaScript", icon: <SiJavascript size={48} className="text-yellow-300" /> },
  { name: "React", icon: <SiReact size={48} className="text-cyan-400" /> },
  { name: "Next.js", icon: <SiReact size={48} className="text-white" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss size={48} className="text-sky-400" /> },
];

const Technologies = () => {
  return (
    
    <section className="py-16 bg-transparent">
      <ScrollAnimation>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-green-400 text-left mb-2">Skills</h2>
        <p className="text-lg text-white text-left mb-10">Tecnologías que uso</p>

        {/* Ingeniería y SIG */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-white mb-6">Diseño</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {engineeringSkills.map((tech, index) => (
              <div
                key={index}
                className="
                  bg-white/5
                  border border-white/10
                  rounded-2xl
                  p-6
                  text-white
                  text-center
                  flex flex-col items-center
                  backdrop-blur-md
                  shadow-[0_0_10px_#2effb5]
                  hover:shadow-[0_0_20px_#2effb5]
                  hover:bg-[#1a1a1a]/60
                  transform hover:scale-105
                  transition-all duration-300 ease-in-out
                "
              >
                <div className="mb-4">{tech.icon}</div>
                <p className="text-base font-semibold">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Prueba */}
        {/* Desarrollo web */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">Programación</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {devSkills.map((tech, index) => (
              <div
                key={index}
                className="
                  bg-white/5
                  border border-white/10
                  rounded-2xl
                  p-6
                  text-white
                  text-center
                  flex flex-col items-center
                  backdrop-blur-md
                  shadow-[0_0_10px_#2effb5]
                  hover:shadow-[0_0_20px_#2effb5]
                  hover:bg-[#1a1a1a]/60
                  transform hover:scale-105
                  transition-all duration-300 ease-in-out
                "
              >
                <div className="mb-4">{tech.icon}</div>
                <p className="text-base font-semibold">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </ScrollAnimation>
    </section>
    
    
  );
};

export default Technologies;
