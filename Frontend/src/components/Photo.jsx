"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        className="relative"
      >
        {/* Contenedor principal de la imagen */}
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: [0, -8, 0],
            opacity: 1,
            transition: { 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            },
          }}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 8px 32px rgba(0, 255, 153, 0.3)",
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          className="w-[298px] h-[298px] md:w-[340px] md:h-[340px] lg:w-[420px] lg:h-[420px] xl:w-[500px] xl:h-[500px] 
                     mix-blend-lighten relative rounded-2xl overflow-hidden cursor-pointer
                     shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <Image
            src="/assets/Photo.png"
            priority
            quality={100}
            fill
            alt="Profile photo"
            className="object-cover rounded-2xl"
          />
          
          {/* Overlay sutil para mejor contraste */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl" />
          
          {/* Halo externo rotativo */}
          <motion.div
            className="absolute -inset-2 pointer-events-none"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="49"
                stroke="url(#outerGradient)"
                strokeWidth="0.5"
                strokeLinecap="round"
                opacity="0.8"
              />
              <defs>
                <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ff99" stopOpacity="0.8" />
                  <stop offset="25%" stopColor="#00ff99" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#00ff99" stopOpacity="0" />
                  <stop offset="75%" stopColor="#00ff99" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00ff99" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* Círculo interno animado - mejor posicionado */}
        <motion.div
          className="absolute inset-0 flex justify-center items-center pointer-events-none"
        >
          <motion.svg
            className="w-[320px] h-[320px] md:w-[360px] md:h-[360px] lg:w-[440px] lg:h-[440px] xl:w-[520px] xl:h-[520px]"
            fill="transparent"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              stroke="#00ff99"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ 
                filter: "drop-shadow(0 0 8px rgba(0, 255, 153, 0.5))",
                opacity: 0.9 
              }}
              initial={{ strokeDasharray: "15 85" }}
              animate={{
                strokeDasharray: ["15 85", "75 25", "15 85"],
                rotate: [0, 360],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.svg>
        </motion.div>

        {/* Puntos decorativos */}
        <motion.div
          className="absolute -inset-8 pointer-events-none"
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400 rounded-full"
              style={{
                top: `${50 + 45 * Math.sin((i * Math.PI) / 4)}%`,
                left: `${50 + 45 * Math.cos((i * Math.PI) / 4)}%`,
              }}
              initial={{ opacity: 0.3, scale: 0.5 }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Photo;