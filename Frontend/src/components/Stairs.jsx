import { animate, easeInOut, motion } from "framer-motion";
import StairTransition from "./StairTransition";
//varianst

const StairAnimation = {
  initial: {
    top: "0%",
  },
  animate: {
    top: "100%",
  },
  exit: {
    top: ["100%", "0%"],
  },
};

//Calculate the revert index

const reverseIndex = (index) => {
  const totalSteps = 6;
  return totalSteps - index - 1;
};
const Stairs = () => {
    return (
      <>
        {/*Comentario Framer motion*/}
        {[...Array(6)].map((_, index) => {
          return (
            <motion.div
              key={index}
              variants={StairAnimation}
              initial="initial" // Corregido
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.4,
                ease: "easeInOut",
                delay: reverseIndex(index) * 0.1, // Función corregida
              }}
              className="h-full w-full bg-zinc-900 relative"
            />
          );
        })}
      </>
    );
  };
  
  export default Stairs;
