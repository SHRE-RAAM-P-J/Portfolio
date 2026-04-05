import { Float, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

function RotatingGroup({ children }) {
  const g = useRef();
  useFrame((_, delta) => {
    if (g.current) {
      g.current.rotation.y += delta * 0.25;
      g.current.rotation.x += delta * 0.08;
    }
  });
  return <group ref={g}>{children}</group>;
}

function AccentOrbit({ isLight }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.elapsedTime * 0.4;
    }
  });
  return (
    <group ref={ref}>
      <mesh position={[2.2, 0.6, 0]}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color={isLight ? '#7c3aed' : '#c084fc'}
          emissive={isLight ? '#ddd6fe' : '#6b21a8'}
          emissiveIntensity={isLight ? 0.25 : 0.4}
          metalness={0.6}
          roughness={isLight ? 0.35 : 0.25}
        />
      </mesh>
      <mesh position={[-2, -0.4, 0.5]}>
        <tetrahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color={isLight ? '#0284c7' : '#38bdf8'}
          emissive={isLight ? '#bae6fd' : '#0c4a6e'}
          emissiveIntensity={isLight ? 0.22 : 0.35}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

function CoreBlob({ isLight }) {
  return (
    <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.8}>
      <Sphere args={[1.15, 48, 48]}>
        <MeshDistortMaterial
          color={isLight ? '#4f46e5' : '#6366f1'}
          emissive={isLight ? '#c7d2fe' : '#312e81'}
          emissiveIntensity={isLight ? 0.32 : 0.55}
          metalness={isLight ? 0.75 : 0.85}
          roughness={isLight ? 0.22 : 0.18}
          distort={0.35}
          speed={1.8}
        />
      </Sphere>
    </Float>
  );
}

function WireTorus({ isLight }) {
  return (
    <Float speed={1.4} rotationIntensity={1.2} floatIntensity={0.4}>
      <Torus args={[1.65, 0.04, 12, 80]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial
          color={isLight ? '#818cf8' : '#a5b4fc'}
          emissive={isLight ? '#e0e7ff' : '#4338ca'}
          emissiveIntensity={isLight ? 0.15 : 0.25}
          metalness={0.9}
          roughness={0.15}
        />
      </Torus>
    </Float>
  );
}

function Scene({ isLight }) {
  const lights = useMemo(
    () =>
      isLight
        ? {
            amb: new THREE.Color('#cbd5e1'),
            key: new THREE.Color('#6366f1'),
            fill: new THREE.Color('#38bdf8'),
          }
        : {
            amb: new THREE.Color('#404060'),
            key: new THREE.Color('#c4b5fd'),
            fill: new THREE.Color('#7dd3fc'),
          },
    [isLight]
  );

  return (
    <>
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={isLight ? 0.58 : 0.35} color={lights.amb} />
      <directionalLight position={[6, 4, 8]} intensity={isLight ? 1.35 : 1.2} color={lights.key} />
      <pointLight position={[-4, -2, 4]} intensity={isLight ? 0.65 : 0.8} color={lights.fill} />
      <RotatingGroup>
        <CoreBlob isLight={isLight} />
        <WireTorus isLight={isLight} />
        <AccentOrbit isLight={isLight} />
      </RotatingGroup>
    </>
  );
}

export default function HeroScene() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene isLight={isLight} />
    </Canvas>
  );
}
