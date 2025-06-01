"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait"> {/* Usa mode="wait" para que la nueva página no aparezca hasta que la animación de salida termine */}
      <div key={pathname}>
        {/* Capa de transición de salida (la que se desvanece) */}
        <motion.div
          initial={{ opacity: 1, scale: 1 }} // Empieza opaca y con escala normal
          animate={{ opacity: 0, scale: 1.05 }} // Se desvanece y se escala ligeramente hacia afuera
          exit={{ opacity: 0, scale: 1.05 }} // Mismo estado de salida, aunque en este caso solo se usa para la página que se va.
          transition={{ duration: 0.6, ease: "easeInOut" }} // Duración y suavidad
          className="h-screen w-screen fixed bg-[#1a1a1a] top-0 pointer-events-none z-50" // Asegúrate de que el z-index sea alto
        />

        {/* Contenido de la página (la que entra) */}
        <motion.div
          initial={{ opacity: 0 }} // La nueva página empieza invisible
          animate={{ opacity: 1 }} // Aparece gradualmente
          transition={{ delay: 0.4, duration: 0.6, ease: "easeInOut" }} // Delay para que aparezca después de que la otra se desvanezca
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;