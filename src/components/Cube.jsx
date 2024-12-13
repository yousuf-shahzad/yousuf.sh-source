// File: src/components/Cube.jsx

import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function CubeMesh({ size = 1.5, rotationSpeed = 0.005 }) {
  const meshRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Continuous rotation
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
      
      // Mouse-directed movement when hovered
      if (isHovered) {
        // Interpolate position based on mouse
        meshRef.current.position.x = THREE.MathUtils.lerp(
          meshRef.current.position.x, 
          mouse.x, 
          0.1
        );
        meshRef.current.position.y = THREE.MathUtils.lerp(
          meshRef.current.position.y, 
          mouse.y, 
          0.1
        );

        // Subtle scaling effect
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.1, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.1, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1.1, 0.1);
      } else {
        // Return to original position and scale
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 0, 0.1);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, 0.1);
        
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.1);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color="black"
        metalness={0.6}
        roughness={0.4}
      />
    </mesh>
  );
}

export default function Cube() {
  return (
    <Canvas
      style={{
        width: '300px',
        height: '300px'
      }}
      camera={{ position: [0, 0, 3] }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <CubeMesh />
    </Canvas>
  );
}