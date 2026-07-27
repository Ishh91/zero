import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = () => {
  const particlesRef = useRef();
  const count = 400;

  const [position, color] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 20;
      
      // Orange/amber colors
      const hue = 0.08 + Math.random() * 0.1;
      const rgb = new THREE.Color().setHSL(hue, 0.8, 0.5 + Math.random() * 0.3);
      col[i3] = rgb.r;
      col[i3 + 1] = rgb.g;
      col[i3 + 2] = rgb.b;
    }
    
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0005;
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={position}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={color}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
};

const ParticleBackground = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return null; // Disable Three.js particle background on mobile for performance
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }} 
        style={{ overflow: 'hidden' }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
