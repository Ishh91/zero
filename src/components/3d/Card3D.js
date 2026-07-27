import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const CardMesh = ({ color, children, onHover }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      if (hovered) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
        meshRef.current.scale.x = 1.05;
        meshRef.current.scale.y = 1.05;
        meshRef.current.scale.z = 1.05;
      } else {
        meshRef.current.rotation.x *= 0.95;
        meshRef.current.rotation.y *= 0.95;
        meshRef.current.scale.x = 1;
        meshRef.current.scale.y = 1;
        meshRef.current.scale.z = 1;
      }
    }
  });
  
  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={() => { setHovered(true); onHover?.(true); }}
        onPointerOut={() => { setHovered(false); onHover?.(false); }}
      >
        <boxGeometry args={[2.5, 1.8, 0.1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.4}
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
        {children}
      </mesh>
    </group>
  );
};

const Card3D = ({ title, description, icon, color = '#ff3366' }) => {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Canvas camera={{ position: [0, 0, 3.5] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4facfe" />
        <OrbitControls enableZoom={false} enablePan={false} />
        <CardMesh color={color}>
          {/* We'll use the regular DOM for content, not 3D text */}
        </CardMesh>
      </Canvas>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        text: 'center',
        pointerEvents: 'none'
      }}>
        {icon && (
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: color }}>
            <i className={icon}></i>
          </div>
        )}
        {title && (
          <h3 style={{ marginBottom: '0.5rem', color: '#ffffff' }}>{title}</h3>
        )}
        {description && (
          <p style={{ color: '#a0a0a0', fontSize: '0.9rem', textAlign: 'center' }}>{description}</p>
        )}
      </div>
    </div>
  );
};

export default Card3D;
