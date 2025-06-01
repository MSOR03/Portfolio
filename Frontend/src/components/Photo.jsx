"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <motion.div
        // quitamos animación de opacidad pero dejamos el contenedor
        initial={false} // importante para que no haga animación inicial
        animate={{ opacity: 1 }} // opacidad fija en 1, sin transición
      >
        <motion.div
          initial={{ y: 0, opacity: 1 }} // opacidad fija en 1 aquí también
          animate={{
            y: [0, -10, 0],
            opacity: 1, // opacidad fija durante la animación
            transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 12px 4px #00ff99",
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          className="w-[298px] h-[298px] md:w-[330px] md:h-[330px] lg:w-[404px] lg:h-[404px] xl:w-[498px] xl:h-[498px] mix-blend-lighten relative rounded-lg overflow-hidden cursor-pointer"
        >
          <Image
            src="/assets/Photo.png"
            priority
            quality={100}
            fill
            alt=""
            className="object-contain rounded-lg"
          />
          {/* Halo externo */}
          <motion.svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            viewBox="0 0 520 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="260"
              cy="260"
              r="258"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="520" y2="520">
                <stop offset="0%" stopColor="#00ff99" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#00ff99" stopOpacity="0" />
                <stop offset="100%" stopColor="#00ff99" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>

        {/* Círculo interno animado */}
        <motion.svg
          className="w-[300px] h-[300px] md:w-[330px] md:h-[330px] lg:w-[408px] lg:h-[410px] xl:w-[506px] xl:h-[506px] absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="250"
            r="250"
            stroke="#00ff99"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 6px #00ff99)" }}
            initial={{ strokeDasharray: ["24 10 0 0"], opacity: 0.7 }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 15 92 72", "4 250 22 22"],
              rotate: [120, 360],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default Photo;
