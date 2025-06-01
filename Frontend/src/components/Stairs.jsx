"use client";
import { motion } from "framer-motion";

// Variantes más suaves y modernas
const overlayVariants = {
  initial: { y: 0, opacity: 1 },
  animate: { y: "-100%", opacity: 0 },
  exit: { y: "0%", opacity: 1 },
};

const Stairs = () => {
  return (
    <motion.div
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      className="fixed top-0 left-0 w-full h-full bg-[#101915]/90 z-50 backdrop-blur-sm"
    />
  );
};

export default Stairs;
