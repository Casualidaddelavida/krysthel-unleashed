import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SecretMessageProps {
  titleRef: React.RefObject<HTMLElement>;
}

const SecretMessage = ({ titleRef }: SecretMessageProps) => {
  const [clicks, setClicks] = useState(0);
  const [show, setShow] = useState(false);

  const handleClick = useCallback(() => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5 && !show) {
      setShow(true);
      setTimeout(() => setShow(false), 4000);
      setClicks(0);
    }
  }, [clicks, show]);

  // This component is rendered inline, the click handler is passed up
  return (
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
  );
};

export { SecretMessage };
export const useSecretClicks = () => {
  const [clicks, setClicks] = useState(0);
  const [show, setShow] = useState(false);

  const handleClick = useCallback(() => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5 && !show) {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        setClicks(0);
      }, 4000);
    }
  }, [clicks, show]);

  return { show, setShow, handleClick };
};
