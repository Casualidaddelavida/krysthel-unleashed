import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const FinalCelebration = () => {
  const [activated, setActivated] = useState(false);

  const activate = () => {
    setActivated(true);
    // Epic confetti burst
    const duration = 5000;
    const end = Date.now() + duration;
    const colors = ["#e6197d", "#8b2fc9", "#00c8ff", "#ffe14d", "#ff6b6b"];

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 90,
        spread: 120,
        origin: { x: 0.5, y: 0.3 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center py-20 px-6">
      <AnimatePresence mode="wait">
        {!activated ? (
          <motion.div
            key="button"
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={activate}
              className="px-12 py-6 rounded-full font-display text-lg sm:text-xl font-black tracking-wider bg-party-gradient text-primary-foreground shadow-neon-pink hover:scale-110 active:scale-95 transition-transform"
              animate={{
                boxShadow: [
                  "0 0 20px hsl(320 90% 55% / 0.4)",
                  "0 0 40px hsl(270 85% 55% / 0.6)",
                  "0 0 20px hsl(195 100% 50% / 0.4)",
                  "0 0 40px hsl(320 90% 55% / 0.4)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🚀 ACTIVAR MODO LEYENDA
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            className="flex flex-col items-center gap-8 text-center px-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 8, stiffness: 80 }}
          >
            <motion.h2
              className="font-display text-3xl sm:text-5xl md:text-6xl font-black bg-party-gradient bg-clip-text text-transparent leading-tight text-glow-pink"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              QUE LOS 30 TE DEN MÁS HISTORIAS QUE CONTAR Y MENOS CRINGE QUE OCULTAR.
            </motion.h2>

            <motion.p
              className="font-body text-lg sm:text-xl text-muted-foreground mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Feliz cumpleaños krykry, que la pases genial y sabes que cualquier cosa me puedes decir!. 💫
            </motion.p>

            <motion.div
              className="flex gap-4 text-4xl sm:text-6xl mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {["🎉", "🔥", "👑", "🎊", "💜"].map((e, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                >
                  {e}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FinalCelebration;
