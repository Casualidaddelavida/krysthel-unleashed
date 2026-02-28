import { motion } from "framer-motion";

const levels = [
  { level: 1, title: "Mini caos", color: "from-neon-blue to-neon-purple", percent: 3 },
  { level: 10, title: "Intensidad desbloqueada", color: "from-neon-purple to-neon-pink", percent: 33 },
  { level: 20, title: "Protagonista principal", color: "from-neon-pink to-neon-yellow", percent: 66 },
  { level: 30, title: "Jefa final legendaria", color: "from-neon-pink to-accent", percent: 100 },
];

const GameEvolution = () => {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center py-20 px-6">
      <motion.h2
        className="font-display text-3xl sm:text-5xl font-bold text-center mb-16 bg-party-gradient bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        🎮 Evolución
      </motion.h2>

      <div className="max-w-2xl w-full space-y-6">
        {levels.map((l, i) => (
          <motion.div
            key={l.level}
            className="glass rounded-2xl p-5 sm:p-6 group cursor-pointer"
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ 
              scale: 1.02, 
              boxShadow: "0 0 30px hsl(320 90% 55% / 0.3)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl sm:text-3xl font-black text-primary">
                  LV.{l.level}
                </span>
                <span className="font-body text-sm sm:text-base text-muted-foreground">
                  {l.title}
                </span>
              </div>
              <motion.div
                className="text-xl opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ⭐
              </motion.div>
            </div>

            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${l.color}`}
                initial={{ width: 0 }}
                whileInView={{ width: `${l.percent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GameEvolution;
