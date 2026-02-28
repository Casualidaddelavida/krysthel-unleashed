import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CinematicEntryProps {
  onEnter: () => void;
}

const CinematicEntry = ({ onEnter }: CinematicEntryProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "explode" | "ready">("loading");

  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setPhase("explode");
          // Fire confetti
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
            colors: ["#e6197d", "#8b2fc9", "#00c8ff", "#ffe14d"],
          });
          setTimeout(() => setPhase("ready"), 600);
          return 100;
        }
        return p + Math.random() * 3 + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="flex flex-col items-center gap-8 px-6 text-center"
          >
            <motion.p
              className="font-body text-lg text-muted-foreground tracking-widest uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Cargando actualización…
            </motion.p>

            <div className="w-72 sm:w-96 h-3 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-party-gradient"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <p className="font-display text-sm text-primary tracking-wider">
              Instalando Krysthel 3.0… {Math.min(Math.floor(progress), 100)}%
            </p>
          </motion.div>
        )}

        {(phase === "explode" || phase === "ready") && (
          <motion.div
            key="ready"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="flex flex-col items-center gap-8 px-6 text-center"
          >
            <motion.h1
              className="font-display text-4xl sm:text-6xl md:text-7xl font-black bg-party-gradient bg-clip-text text-transparent leading-tight"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              KRYSTHEL
              <br />
              NIVEL 30
              <br />
              DESBLOQUEADO
            </motion.h1>

            <motion.p className="text-3xl sm:text-5xl" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>
              🚀🔥
            </motion.p>

            <motion.button
              onClick={onEnter}
              className="mt-4 px-8 py-4 rounded-full font-display text-sm sm:text-base font-bold tracking-wider bg-party-gradient text-primary-foreground shadow-neon-pink hover:scale-105 active:scale-95 transition-transform"
              whileHover={{ boxShadow: "0 0 30px hsl(320 90% 55% / 0.6), 0 0 60px hsl(270 85% 55% / 0.3)" }}
            >
              INGRESAR AL CAOS
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CinematicEntry;
