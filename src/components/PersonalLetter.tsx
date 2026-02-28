import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const letterText = `Krysthel,

Llegar a los 30 no es cualquier cosa.
Es básicamente desbloquear una versión más poderosa de ti misma.

Y si algo tengo claro, es que esta nueva versión sigue teniendo la misma energía loca, la misma risa contagiosa y esa capacidad impresionante de convertir cualquier momento normal en algo que termina siendo historia.

Eres esa persona que no necesita esforzarse para destacar.
Simplemente eres tú.
Y eso ya es suficiente.

Gracias por las risas absurdas.
Por los comentarios sin filtro.
Por los planes improvisados que siempre terminan siendo épicos.
Y por estar cuando realmente importa.

Que estos 30 te den más seguridad.
Más metas cumplidas.
Más momentos inolvidables.
Y sí… más paciencia también.

No cambies tu esencia.
Solo sigue evolucionando como lo haces:
A tu manera.

Feliz cumpleaños, Krysthel.
Nivel 30 te queda increíble.`;

const PersonalLetter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(letterText.slice(0, i));
      if (i >= letterText.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 18);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={ref} className="relative z-10 min-h-screen flex flex-col items-center justify-center py-20 px-6">
      <motion.h2
        className="font-display text-3xl sm:text-5xl font-bold text-center mb-12 bg-party-gradient bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        💌 Carta Personal
      </motion.h2>

      <motion.div
        className="glass rounded-3xl p-8 sm:p-12 max-w-2xl w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <pre className="font-body text-sm sm:text-base text-foreground whitespace-pre-wrap leading-relaxed">
          {displayedText}
          {!done && (
            <motion.span
              className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </pre>
        {done && (
          <motion.div
            className="mt-6 text-right text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            💜
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default PersonalLetter;
