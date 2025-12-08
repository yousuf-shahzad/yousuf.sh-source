import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import PropTypes from 'prop-types';

CubeMesh.propTypes = {
  size: PropTypes.number,
  rotationSpeed: PropTypes.number,
};

function CubeMesh({ size = 1.5, rotationSpeed = 0.005 }) {
  const meshRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const { mouse } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
      
      // mouse movement on hover
      if (isHovered) {
        // interpolate val for smooth movement
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

        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.1, 0.1); // scale up a bit on hover
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.1, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1.1, 0.1);
      } else {
        // defaults
        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 0, 0.1);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0, 0.1);
        
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.1);
      }
    }
  }, [size, rotationSpeed]);

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <boxGeometry attach="geometry" args={[size, size, size]} />
      <meshStandardMaterial
        color="black"
      />
    </mesh>
  );
}

export default function Cube() {
  const MIN_VIEWPORT_WIDTH = 768; // if we are on phone dont render
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= MIN_VIEWPORT_WIDTH;
  });

  useEffect(() => { // super hacky but should work
    if (typeof window === 'undefined') return undefined;
    const mediaQuery = window.matchMedia(`(min-width: ${MIN_VIEWPORT_WIDTH}px)`);
    const handleChange = (event) => setShouldRender(event.matches);

    setShouldRender(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [MIN_VIEWPORT_WIDTH]);

  if (!shouldRender) {
    return null;
  }

  const containerStyle = {
    width: 'min(60vw, 420px)',
    aspectRatio: '1 / 1',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: '0 auto'
  };

  return (
    <div style={containerStyle}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 0, 3.5] }}
        dpr={[1, 1.8]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <CubeMesh />
      </Canvas>
    </div>
  );
}