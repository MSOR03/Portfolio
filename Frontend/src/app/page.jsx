import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

//Components
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row items-center justify-between pt-8 pb-10">
          {/*Text*/}
          <div className="text-center md:text-left xl:text-left order-2 md:order-none xl::order-none">
            <span className="text-xl">Ingeniero</span>
            <h1 className="h1 mb-6">
              Hola soy
              <br /> <span className="text-accent">Sebastián </span>
            </h1>
            <p className="md:max-w-[450px] lg:max-w-[450px] xl:max-w-[500px] text-white/80">
              Ingeniero Topografico e Ingeniero de Sistemas con habilidades en
              desarrollo de software (Movil,Web), Sistemas de Información,
              ademas, cualidades en diseño en Civil3D,ArcGIS,Qgis.
            </p>
            {/*Download and social media*/}
            <div className="flex flex-col md:flex-row xl:flex-row items-center gap-8 mt-5 ">
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
                <Social />
              </div>
            </div>
          </div>

          {/*Photo*/}
          <div className="order-1 md:order-none xl:order-none mb-8 xl:mb-0 ">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
