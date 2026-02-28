import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";
import CinematicEntry from "@/components/CinematicEntry";
import DramaticCounter from "@/components/DramaticCounter";
import CakeGame from "@/components/CakeGame";
import ChaosRoulette from "@/components/ChaosRoulette";
import PhraseGenerator from "@/components/PhraseGenerator";
import GameEvolution from "@/components/GameEvolution";
import PersonalLetter from "@/components/PersonalLetter";
import FinalCelebration from "@/components/FinalCelebration";
import { useSecretClicks } from "@/components/SecretMessage";

const Index = () => {
  const [entered, setEntered] = useState(false);
  const { show, setShow, handleClick } = useSecretClicks();

  return (
    <>
      <AnimatePresence>
        {!entered && (
          <CinematicEntry onEnter={() => setEntered(true)} />
        )}
      </AnimatePresence>

      {entered && (
        <>
          <ParticlesBackground />

          {/* Secret message overlay */}
          <AnimatePresence>
            {show && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShow(false)}
              >
                <motion.div
                  className="glass rounded-3xl p-8 sm:p-12 max-w-md mx-6 text-center"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 10 }}
                  transition={{ type: "spring", damping: 10 }}
                >
                  <p className="text-4xl mb-4">🕵️</p>
                  <p className="font-display text-xl sm:text-2xl font-bold bg-party-gradient bg-clip-text text-transparent">
                    Ya madura… mentira no, sigue igual.
                  </p>
                  <p className="text-muted-foreground mt-4 font-body text-sm">
                    (Mensaje secreto desbloqueado)
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <main className="relative">
            {/* Hero title - clickable for secret */}
            <section className="relative z-10 flex items-center justify-center min-h-[50vh] pt-20">
              <motion.h1
                className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-center bg-party-gradient bg-clip-text text-transparent cursor-pointer select-none px-6"
                onClick={handleClick}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                title="Haz clic varias veces..."
              >
                KRYSTHEL 3.0
              </motion.h1>
            </section>

            <DramaticCounter />
            <CakeGame />
            <ChaosRoulette />
            <PhraseGenerator />
            <GameEvolution />
            <PersonalLetter />
            <FinalCelebration />

            {/* Footer */}
            <footer className="relative z-10 text-center py-12 px-6">
              <p className="font-body text-sm text-muted-foreground">
                Hecho con 💜 y mucho caos creativo
              </p>
            </footer>
          </main>
        </>
      )}
    </>
  );
};

export default Index;
