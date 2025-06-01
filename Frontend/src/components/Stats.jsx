"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaLaptopCode, FaProjectDiagram, FaTools, FaGithub } from "react-icons/fa";

const stats = [
  {
    num: 1,
    text: "Años de experiencia",
    icon: <FaLaptopCode className="text-4xl text-accent-green" />,
  },
  {
    num: 6,
    text: "Proyectos de Software",
    icon: <FaProjectDiagram className="text-4xl text-accent-green" />,
  },
  {
    num: 5,
    text: "Tecnologías",
    icon: <FaTools className="text-4xl text-accent-green" />,
  },
  {
    num: 69,
    text: "Commits",
    icon: <FaGithub className="text-4xl text-accent-green" />,
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Stats = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto flex flex-wrap justify-center gap-6 px-4">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#0f0f0f] text-white/90 border border-white/10 rounded-xl p-6 w-[220px] shadow-[0_0_12px_#00ff99] transition duration-300 hover:shadow-[0_0_20px_#00ff99] hover:bg-[#1a1a1a] cursor-pointer"
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-4xl font-extrabold text-accent-green">
              <CountUp end={item.num} duration={4} />
            </h3>
            <p className="text-white/70 text-sm mt-2">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
