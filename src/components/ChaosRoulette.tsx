import { useState } from "react";
import { motion } from "framer-motion";

const phrases = [
  "Krysthel nunca llega tarde, el tiempo se adapta.",
  "30 años siendo icónica sin pedir permiso.",
  "Modo señora activado… parcialmente.",
  "Sarcasmo refinado al nivel experto.",
  "Caos premium certificado.",
  "Krysthel no envejece, sube de nivel.",
  "Su energía debería ser estudiada por la ciencia.",
  "Convierte el drama en contenido premium.",
];

const ChaosRoulette = () => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setSelected(null);
    const newRotation = rotation + 1440 + Math.random() * 720;
    setRotation(newRotation);

    setTimeout(() => {
      const idx = Math.floor(Math.random() * phrases.length);
      setSelected(phrases[idx]);
      setSpinning(false);
    }, 3000);
  };

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center py-20 px-6">
      <motion.h2
        className="font-display text-3xl sm:text-5xl font-bold text-center mb-16 bg-party-gradient bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        🎰 Ruleta del Caos
      </motion.h2>

      <div className="relative flex flex-col items-center gap-8">
        {/* Wheel */}
        <div className="relative">
          {/* Pointer */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 text-3xl">▼</div>
          
          <motion.div
            className="w-56 h-56 sm:w-72 sm:h-72 rounded-full border-4 border-primary shadow-neon-pink relative overflow-hidden"
            animate={{ rotate: rotation }}
            transition={{ duration: 3, ease: [0.17, 0.67, 0.12, 0.99] }}
          >
            {phrases.map((_, i) => {
              const angle = (360 / phrases.length) * i;
              const colors = ["bg-primary", "bg-secondary", "bg-accent", "bg-neon-pink", "bg-neon-purple", "bg-neon-blue", "bg-primary", "bg-secondary"];
              return (
                <div
                  key={i}
                  className={`absolute w-full h-full origin-center`}
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <div
                    className={`absolute top-0 left-1/2 w-1 h-1/2 ${colors[i % colors.length]}`}
                    style={{
                      transformOrigin: "bottom",
                      transform: "translateX(-50%)",
                      clipPath: `polygon(50% 0%, 0% 100%, 100% 100%)`,
                      width: "100%",
                      opacity: 0.7,
                    }}
                  />
                </div>
              );
            })}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center font-display text-xs text-primary font-bold">
                GIRA
              </div>
            </div>
          </motion.div>
        </div>

        <motion.button
          onClick={spin}
          disabled={spinning}
          className="px-8 py-4 rounded-full font-display text-sm font-bold tracking-wider bg-party-gradient text-primary-foreground shadow-neon-purple hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
          whileHover={{ boxShadow: "0 0 30px hsl(270 85% 55% / 0.6)" }}
        >
          {spinning ? "GIRANDO..." : "GIRAR LA RULETA"}
        </motion.button>

        {selected && (
          <motion.div
            className="glass rounded-2xl p-6 sm:p-8 max-w-md text-center"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring" }}
          >
            <p className="font-body text-lg sm:text-xl text-foreground italic">"{selected}"</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ChaosRoulette;
