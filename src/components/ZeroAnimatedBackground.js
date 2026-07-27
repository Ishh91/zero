import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './ZeroAnimatedBackground.css';

const ZeroAnimatedBackground = ({ isHeroBackground = false, onIntroComplete }) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );
  // intro phases: 'hidden' → 'flash' → 'settle' → 'done'
  const [introPhase, setIntroPhase] = useState('hidden');
  // whether hero content has arrived (triggers BUILD FROM SCRATCH hide)
  const [contentArrived, setContentArrived] = useState(false);
  // whether to show the second text
  const [showSecondText, setShowSecondText] = useState(false);
  // whether to show the ZERO logo
  const [showZeroLogo, setShowZeroLogo] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intro sequence timing
  useEffect(() => {
    // t=0: still hidden
    // t=100ms: show slogan (BUILD FROM SCRATCH) first, without logo
    const flashTimer = setTimeout(() => setIntroPhase('flash'), 100);
    // t=800ms: settle slogan
    const settleTimer = setTimeout(() => setIntroPhase('settle'), 800);
    // t=1500ms: show ZERO logo
    const showLogoTimer = setTimeout(() => setShowZeroLogo(true), 1500);
    // t=2000ms: done — notify parent to show hero content
    const doneTimer = setTimeout(() => {
      setIntroPhase('done');
      onIntroComplete?.();
    }, 2000);
    // t=2500ms: switch to ZERO BY CINEVIV
    const switchTextTimer = setTimeout(() => {
      setShowSecondText(true);
    }, 2500);

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(settleTimer);
      clearTimeout(showLogoTimer);
      clearTimeout(doneTimer);
      clearTimeout(switchTextTimer);
    };
  }, []);

  // Listen for hero content arrival via custom event
  useEffect(() => {
    const handleContent = () => setContentArrived(true);
    window.addEventListener('hero-content-visible', handleContent);
    return () => window.removeEventListener('hero-content-visible', handleContent);
  }, []);

  const starCount = isMobile ? 10 : 50;
  const trailCount = isMobile ? 5 : 20;
  const stars = Array.from({ length: starCount }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${2 + Math.random() * 4}px`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
  }));

  const iconTrails = Array.from({ length: trailCount }, (_, i) => ({
    id: i,
    deg: `${i * (360 / trailCount)}deg`,
    size: `${3 + Math.random() * 5}px`,
    animationDelay: `${i * 0.1}s`,
    opacity: 0.8 - i * (0.8 / trailCount),
  }));

  // Don't apply intro classes to logo until showZeroLogo is true
  const zerClass = [
    'zer-zer-text',
    !showZeroLogo ? 'intro-hidden' :
    introPhase === 'flash'  ? 'intro-flash' : 'intro-settle',
  ].join(' ');

  const circleClass = [
    'zer-icon-circle-wrapper',
    !showZeroLogo ? 'intro-hidden' :
    introPhase === 'flash'  ? 'intro-flash' : 'intro-settle',
  ].join(' ');

  const subtitleClass = [
    'zer-subtitle-below',
    introPhase === 'hidden' ? 'intro-hidden' :
    introPhase === 'flash'  ? 'intro-flash' :
    contentArrived          ? 'content-arrived' : 'intro-visible',
  ].join(' ');

  return (
    <div className={`zer-animated-bg${isHeroBackground ? ' zer-hero-bg' : ''}`}>
      {stars.map(star => (
        <div
          key={star.id}
          className="zer-star-particle"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
          }}
        />
      ))}

      <div className="zer-main-container">
        <div className="zer-bg-wrapper">
          <AnimatePresence>
            {showZeroLogo && (
            <motion.div
              className={zerClass}
              initial={{ opacity: 0, y: -30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              Z E R
            </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showZeroLogo && (
            <motion.div
              className={circleClass}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
            >
            <div className="zer-icon-trails">
              {iconTrails.map(trail => (
                <div
                  key={trail.id}
                  className="zer-trail-dot"
                  style={{
                    '--deg': trail.deg,
                    '--trail-size': trail.size,
                    '--trail-opacity': trail.opacity,
                    animationDelay: trail.animationDelay,
                  }}
                />
              ))}
            </div>

            <div className="zer-spinning-wheel">
              {[
                { deg: '0deg',   path: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/><line x1="11" y1="8" x2="11" y2="14"/></> },
                { deg: '18deg',  path: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="12" y1="2" x2="12" y2="22"/></> },
                { deg: '36deg',  path: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></> },
                { deg: '54deg',  path: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></> },
                { deg: '72deg',  path: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></> },
                { deg: '90deg',  path: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></> },
                { deg: '108deg', path: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></> },
                { deg: '126deg', path: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></> },
                { deg: '144deg', path: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></> },
                { deg: '162deg', path: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></> },
                { deg: '180deg', path: <><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></> },
                { deg: '198deg', path: <><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></> },
                { deg: '216deg', path: <><circle cx="12" cy="12" r="10"/><path d="M8 8l3 8 2-5 2 5 3-8"/></> },
                { deg: '234deg', path: <><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="18" r="1"/></> },
                { deg: '252deg', path: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></> },
                { deg: '270deg', path: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></> },
                { deg: '288deg', path: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></> },
                { deg: '306deg', path: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></> },
                { deg: '324deg', path: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z"/></> },
                { deg: '342deg', path: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></> },
              ].map(({ deg, path }) => (
                <div key={deg} className="zer-icon-item" style={{ '--deg': deg }}>
                  <svg viewBox="0 0 24 24">{path}</svg>
                </div>
              ))}
            </div>

            <div className="zer-center-dot" />
            </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={subtitleClass}>
          <AnimatePresence mode="wait">
            {!showSecondText ? (
              <motion.p
                key="build"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1.2 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                style={{ fontSize: 'clamp(0.9rem, 2.2vw, 1.5rem)' }}
              >
                ✦ BUILD FROM SCRATCH ✦
              </motion.p>
            ) : (
              <motion.p
                key="zero"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                ✦ ZERO BY CINEVIV ✦
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ZeroAnimatedBackground;
