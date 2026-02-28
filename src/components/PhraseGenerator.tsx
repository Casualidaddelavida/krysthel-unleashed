import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const facts = [
  "Estudios demuestran que Krysthel aumenta la diversión en un 300%.",
  "Puede convertir un lunes en algo tolerable.",
  "Su risa tiene efectos secundarios positivos.",
  "Sobrevive con café y energía inexplicable.",
  "La NASA la estudia como fuente de energía renovable.",
  "Su nivel de sarcasmo supera el promedio científico.",
  "Ha sido declarada patrimonio inmaterial de la diversión.",
  "Su presencia reduce el aburrimiento en un 99.9%.",
  "Científicos confirman: no hay cura para su carisma.",
  "Es técnicamente imposible aburrirse cerca de ella.",
];

const PhraseGenerator = () => {
  const [current, setCurrent] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const generate = () => {
    let next: string;
    do {
      next = facts[Math.floor(Math.random() * facts.length)];
    } while (next === current && facts.length > 1);
    setCurrent(next);
    setKey((k) => k + 1);
  };

  return (
    <section className="relative z-10 min-h-[70vh] flex flex-col items-center justify-center py-20 px-6">
      <motion.h2
        className="font-display text-3xl sm:text-5xl font-bold text-center mb-12 bg-party-gradient bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        🔬 Datos Científicos
      </motion.h2>

      <div className="flex flex-col items-center gap-8 max-w-lg w-full min-h-[160px]">
        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={key}
              className="glass rounded-2xl p-8 text-center w-full"
              initial={{ opacity: 0, y: 20, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, rotateX: 20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-body text-lg sm:text-xl text-foreground">🧪 {current}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={generate}
          className="px-8 py-4 rounded-full font-display text-sm font-bold tracking-wider bg-party-gradient text-primary-foreground shadow-neon-blue hover:scale-105 active:scale-95 transition-transform"
          whileHover={{ boxShadow: "0 0 30px hsl(195 100% 50% / 0.6)" }}
        >
          GENERAR DATO CIENTÍFICO
        </motion.button>
      </div>
    </section>
  );
};

export default PhraseGenerator;
