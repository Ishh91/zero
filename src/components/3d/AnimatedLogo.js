import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const LogoText = () => {
  const textRef = useRef();
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });
  
  return (
    <group ref={textRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Text
          font="https://fonts.gstatic.com/s/helveticaneue/v5/1DcHgEKn-KaAIdQdV1P2a5f2Q.ttf"
          fontSize={0.5}
          color="#ff3366"
          anchorX="center"
          anchorY="middle"
        >
          ZERO
          <meshStandardMaterial
            color="#ff3366"
            emissive="#ff3366"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </Text>
      </Float>
    </group>
  );
};

const AnimatedLogo = () => {
  return (
    <div style={{ width: '100%', height: '300px', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4facfe" />
        <LogoText />
      </Canvas>
    </div>
  );
};

export default AnimatedLogo;
