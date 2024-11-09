import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

//Components
import Social from "@/components/Social"
import Photo from "@/components/Photo"

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col md:flex-row items-center justify-between md:pt-8 md:pb-24">
          {/*Text*/}
          <div className="text-center md:text-left order-2 md:order-none">
            <span className="text-xl">Engineering</span>
            <h1 className="h1 mb-6">
              Hola soy
              <br /> <span className="text-accent">Sebastián</span>
            </h1>
            <p className="max-w-[450px] text-white/80">
              Ingeniero Topografico e Ingeniero de Sistemas con habilidades en
              desarrollo de software (Movil,Web), Sistemas de Información,
              ademas, cualidades en diseño en Civil3D,ArcGIS,Qgis.
            </p>
            {/*Download and social media*/}
            <div className="flex flex-col md:flex-row items-center gap-8 mt-5 ">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2 group hover:bg-accent hover:text-black"
              >
                <span className="text-accent group-hover:text-black transition-colors">
                  Descargar CV
                </span>
                <FiDownload className="text-xl text-accent group-hover:text-black" />
              </Button>
              <div className="">
                <Social/>
              </div>
            </div>
          </div>

          {/*Photo*/}
          <div className="order-1 md:order-none mb-8 xl:mb-0">
            <Photo/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
