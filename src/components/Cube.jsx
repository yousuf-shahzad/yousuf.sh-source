import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import PropTypes from 'prop-types'

CubeMesh.propTypes = {
    size: PropTypes.number,
    rotationSpeed: PropTypes.number,
}

function CubeMesh({ size = 1.5, rotationSpeed = 0.005 }) {
    const meshRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)
    const { mouse } = useThree()

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += rotationSpeed * delta * 60
            meshRef.current.rotation.y += rotationSpeed * delta * 60

            // mouse movement on hover
            if (isHovered) {
                // interpolate val for smooth movement
                meshRef.current.position.x = THREE.MathUtils.lerp(
                    meshRef.current.position.x,
                    mouse.x,
                    0.1
                )
                meshRef.current.position.y = THREE.MathUtils.lerp(
                    meshRef.current.position.y,
                    mouse.y,
                    0.1
                )

                meshRef.current.scale.x = THREE.MathUtils.lerp(
                    meshRef.current.scale.x,
                    1.1,
                    0.1
                ) // scale up a bit on hover
                meshRef.current.scale.y = THREE.MathUtils.lerp(
                    meshRef.current.scale.y,
                    1.1,
                    0.1
                )
                meshRef.current.scale.z = THREE.MathUtils.lerp(
                    meshRef.current.scale.z,
                    1.1,
                    0.1
                )
            } else {
                // defaults
                meshRef.current.position.x = THREE.MathUtils.lerp(
                    meshRef.current.position.x,
                    0,
                    0.1
                )
                meshRef.current.position.y = THREE.MathUtils.lerp(
                    meshRef.current.position.y,
                    0,
                    0.1
                )

                meshRef.current.scale.x = THREE.MathUtils.lerp(
                    meshRef.current.scale.x,
                    1,
                    0.1
                )
                meshRef.current.scale.y = THREE.MathUtils.lerp(
                    meshRef.current.scale.y,
                    1,
                    0.1
                )
                meshRef.current.scale.z = THREE.MathUtils.lerp(
                    meshRef.current.scale.z,
                    1,
                    0.1
                )
            }
        }
    })

    return (
        <mesh
            ref={meshRef}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
        >
            <boxGeometry attach="geometry" args={[size, size, size]} />
            <meshStandardMaterial color="black" />
        </mesh>
    )
}

export default function Cube() {
    const containerStyle = {
        width: 'min(60vw, 420px)',
        aspectRatio: '1 / 1',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        margin: '0 auto',
    }

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
    )
}
