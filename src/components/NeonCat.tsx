import { motion } from "framer-motion";

const NeonCat = () => {
  return (
    <motion.div
      className="relative z-10 flex justify-center items-center -mt-16 mb-4"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <motion.img
        src="/michi-neon.png"
        alt="Neon Cat"
        className="
          w-[90vw] 
          max-w-[800px] 
          drop-shadow-[0_0_120px_rgba(236,72,153,0.8)]
          select-none 
          pointer-events-none
        "
        animate={{ y: [0, -35, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default NeonCat;