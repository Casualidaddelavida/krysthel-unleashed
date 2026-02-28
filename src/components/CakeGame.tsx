import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const CakeGame = () => {
  const [phase, setPhase] = useState<"ready" | "blowing" | "done">("ready");

  const handleBlow = () => {
    setPhase("blowing");
    setTimeout(() => {
      setPhase("done");
      // Massive confetti
      const duration = 3000;
      const end = Date.now() + duration;
      const colors = ["#e6197d", "#8b2fc9", "#00c8ff", "#ffe14d"];
      const frame = () => {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }, 1500);
  };

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center py-20 px-6">
      <motion.h2
        className="font-display text-3xl sm:text-5xl font-bold text-center mb-12 bg-party-gradient bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        🎂 Sopla la Torta
      </motion.h2>

      <div className="relative flex flex-col items-center">
        {/* Cake */}
        <motion.div
          className="relative"
          animate={phase === "blowing" ? { x: [-3, 3, -3, 3, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Cake layers */}
          <div className="flex flex-col items-center">
            {/* Candles */}
            <div className="flex gap-3 mb-2 relative z-10">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <AnimatePresence>
                    {phase === "ready" && (
                      <motion.div
                        className="text-2xl"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 0.5 + i * 0.1, repeat: Infinity }}
                        exit={{ opacity: 0, scale: 0, transition: { duration: 0.3, delay: i * 0.1 } }}
                      >
                        🔥
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="w-1.5 h-8 bg-neon-yellow rounded-full" />
                </div>
              ))}
            </div>

            {/* Tier 1 */}
            <div className="w-32 sm:w-40 h-12 rounded-lg bg-party-gradient flex items-center justify-center shadow-neon-pink">
              <span className="font-display text-primary-foreground font-bold text-lg">30</span>
            </div>
            {/* Tier 2 */}
            <div className="w-44 sm:w-56 h-14 rounded-lg bg-gradient-to-r from-neon-purple to-neon-blue shadow-neon-purple -mt-1" />
            {/* Tier 3 */}
            <div className="w-56 sm:w-72 h-16 rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple shadow-neon-pink -mt-1" />
            {/* Plate */}
            <div className="w-64 sm:w-80 h-4 bg-muted rounded-full mt-1" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === "ready" && (
            <motion.button
              key="blow-btn"
              onClick={handleBlow}
              className="mt-10 px-8 py-4 rounded-full font-display text-sm font-bold tracking-wider bg-party-gradient text-primary-foreground shadow-neon-pink hover:scale-105 active:scale-95 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ boxShadow: "0 0 30px hsl(320 90% 55% / 0.6)" }}
            >
              SOPLAR COMO ADULTA RESPONSABLE
            </motion.button>
          )}

          {phase === "blowing" && (
            <motion.div
              key="blowing"
              className="mt-10 font-body text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
            >
              💨 Soplando...
            </motion.div>
          )}

          {phase === "done" && (
            <motion.div
              key="done"
              className="mt-10 flex flex-col items-center gap-4 text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
            >
              <h3 className="font-display text-2xl sm:text-4xl font-black bg-party-gradient bg-clip-text text-transparent text-glow-pink">
                OFICIALMENTE 30 Y MÁS PODEROSA QUE NUNCA 🔥
              </h3>
              <motion.p
                className="text-muted-foreground font-body"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                ✨ Deseo desbloqueado con éxito.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CakeGame;
