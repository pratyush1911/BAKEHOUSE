import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'hold' | 'exit'

  useEffect(() => {
    // Phase 1: Animations play via declarative props (~1.5s for letters)
    // Phase 2: Hold briefly
    const holdTimer = setTimeout(() => {
      setPhase('hold');
    }, 1800);

    // Phase 3: Exit
    const exitTimer = setTimeout(() => {
      setPhase('exit');
    }, 2200);

    // Phase 4: Complete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const text = "BAKEHOUSE";
  const letters = text.split('');

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'exit' ? 0 : 1 }}
          transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
          className="fixed inset-0 z-[10000] bg-onyx flex items-center justify-center"
        >
          <div className="relative">
            {/* Top horizontal line */}
            <div className="absolute -top-16 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-premium/50 to-transparent overflow-hidden">
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.6, 0.01, -0.05, 0.95] }}
                className="w-full h-full bg-gold-premium/30"
              />
            </div>

            {/* Bottom horizontal line */}
            <div className="absolute -bottom-16 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-premium/50 to-transparent overflow-hidden">
              <motion.div
                initial={{ scaleX: 0, originX: 1 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.6, 0.01, -0.05, 0.95] }}
                className="w-full h-full bg-gold-premium/30"
              />
            </div>

            {/* Main text - each letter animates in */}
            <div className="flex overflow-hidden">
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + i * 0.05,
                    ease: [0.6, 0.01, -0.05, 0.95],
                  }}
                  className="text-4xl md:text-8xl font-display font-bold text-gold-premium tracking-wider"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-center text-[10px] md:text-xs tracking-[0.5em] uppercase mt-4"
            >
              Artisan Bakery • Since 1994
            </motion.p>

            {/* Loading bar */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: [0.6, 0.01, -0.05, 0.95] }}
                className="h-full bg-gold-premium"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
