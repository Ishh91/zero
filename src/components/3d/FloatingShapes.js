import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, Float } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, color, shape = 'sphere', rotationSpeed = 0.005 }) => {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
    }
  });
  
  const getShape = () => {
    switch(shape) {
      case 'box':
        return <Box args={[0.5, 0.5, 0.5]} />;
      case 'torus':
        return <Torus args={[0.3, 0.1, 16, 100]} />;
      default:
        return <Sphere args={[0.3, 32, 32]} />;
    }
  };
  
  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
      position={position}
    >
      <mesh ref={meshRef}>
        {getShape()}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
};

const FloatingShapes = () => {
  const shapes = [
    { position: [-3, 2, -2], color: '#ff3366', shape: 'sphere' },
    { position: [2, -1, -3], color: '#4facfe', shape: 'box' },
    { position: [0, 3, -4], color: '#f093fb', shape: 'torus' },
    { position: [3, 1, -5], color: '#00f2fe', shape: 'sphere' },
    { position: [-2, -2, -3], color: '#f5576c', shape: 'box' },
  ];
  
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {shapes.map((shape, index) => (
          <FloatingShape key={index} {...shape} />
        ))}
      </Canvas>
    </div>
  );
};

export default FloatingShapes;