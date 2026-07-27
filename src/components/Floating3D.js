import React from 'react';
import { motion } from 'framer-motion';

const Floating3D = () => {
  return (
    <div className="floating-3d-container">
      {/* Floating Cube */}
      <motion.div
        className="floating-shape cube"
        animate={{
          y: [0, -30, 0],
          rotateY: [0, 180, 360],
          rotateX: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ left: '10%', top: '20%' }}
      >
        <div className="cube-face front"></div>
        <div className="cube-face back"></div>
        <div className="cube-face right"></div>
        <div className="cube-face left"></div>
        <div className="cube-face top"></div>
        <div className="cube-face bottom"></div>
      </motion.div>

      {/* Floating Sphere */}
      <motion.div
        className="floating-shape sphere"
        animate={{
          y: [0, 30, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ right: '15%', top: '30%' }}
      >
        <div className="sphere-inner"></div>
      </motion.div>

      {/* Floating Pyramid */}
      <motion.div
        className="floating-shape pyramid"
        animate={{
          y: [0, -25, 0],
          rotateY: [0, -180, -360],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ left: '25%', bottom: '25%' }}
      >
        <div className="pyramid-face"></div>
      </motion.div>

      {/* Floating Ring */}
      <motion.div
        className="floating-shape ring"
        animate={{
          y: [0, 20, 0],
          rotate: [0, 90, 180],
          rotateX: [0, 30, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ right: '30%', bottom: '30%' }}
      >
        <div className="ring-inner"></div>
      </motion.div>

      {/* Floating Octahedron */}
      <motion.div
        className="floating-shape octahedron"
        animate={{
          y: [0, -35, 0],
          rotate: [0, 180, 360],
          rotateY: [0, 90, 180],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ left: '60%', top: '15%' }}
      >
        <div className="octahedron-top"></div>
        <div className="octahedron-bottom"></div>
      </motion.div>

      {/* Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `hsl(36, 100%, 50%)`,
          }}
          animate={{
            y: [0, -40 - Math.random() * 20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Floating3D;
