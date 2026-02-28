import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const counters = [
  { target: 30, label: "años", suffix: "" },
  { target: 10950, label: "días", suffix: "" },
  { target: 262800, label: "horas", suffix: "" },
  { target: 0, label: "carcajadas", suffix: "Incontables" },
];

const AnimatedNumber = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    if (target === 0) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="font-display text-5xl sm:text-7xl font-black bg-party-gradient bg-clip-text text-transparent"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", damping: 12 }}
      >
        {suffix || count.toLocaleString()}
      </motion.div>
    </div>
  );
};

const DramaticCounter = () => {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center py-20 px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 max-w-5xl w-full">
        {counters.map((c, i) => (
          <motion.div
            key={i}
            className="glass rounded-2xl p-6 sm:p-8 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(320 90% 55% / 0.3)" }}
          >
            <AnimatedNumber target={c.target} suffix={c.suffix} />
            <p className="font-body text-sm sm:text-base text-muted-foreground uppercase tracking-wider">{c.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-12 font-body text-lg sm:text-xl text-muted-foreground text-center max-w-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        "El mundo sigue funcionando milagrosamente."
      </motion.p>
    </section>
  );
};

export default DramaticCounter;
