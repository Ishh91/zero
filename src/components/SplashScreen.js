import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ZeroAnimatedBackground from './ZeroAnimatedBackground';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Wait for ZeroAnimatedBackground intro, then fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleIntroComplete = () => {
    // This is called when ZeroAnimatedBackground intro is done
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Use Hero's animated background with isHeroBackground prop */}
          <ZeroAnimatedBackground isHeroBackground onIntroComplete={handleIntroComplete} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;