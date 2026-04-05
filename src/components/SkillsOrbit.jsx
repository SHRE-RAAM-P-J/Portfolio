import { Text } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const LABELS = ['JavaScript', 'React', 'Python', 'C++', 'Qt', 'YOLO'];

function FloatingLabel({ text, position, speed, labelColor, outlineColor }) {
  const ref = useRef();
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed + phase;
    ref.current.position.y = position[1] + Math.sin(t) * 0.15;
    ref.current.rotation.y = t * 0.4;
  });
  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.28}
      color={labelColor}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor={outlineColor}
    >
      {text}
    </Text>
  );
}

function Orbit({ labelColor, outlineColor, torusColor, torusEmissive }) {
  const g = useRef();
  useFrame((_, d) => {
    if (g.current) g.current.rotation.y += d * 0.2;
  });
  const positions = useMemo(
    () =>
      LABELS.map((_, i) => {
        const a = (i / LABELS.length) * Math.PI * 2;
        return [Math.cos(a) * 1.4, Math.sin(a * 2) * 0.2, Math.sin(a) * 1.4];
      }),
    []
  );
  return (
    <group ref={g}>
      {LABELS.map((text, i) => (
        <FloatingLabel
          key={text}
          text={text}
          position={positions[i]}
          speed={0.8 + i * 0.1}
          labelColor={labelColor}
          outlineColor={outlineColor}
        />
      ))}
      <mesh>
        <torusGeometry args={[1.35, 0.03, 12, 48]} />
        <meshStandardMaterial
          color={torusColor}
          emissive={torusEmissive}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

export default function SkillsOrbit() {
  const { theme } = useTheme();
  const light = theme === 'light';
  const labelColor = light ? '#4338ca' : '#c4b5fd';
  const outlineColor = light ? '#ffffff' : '#000000';
  const torusColor = light ? '#6366f1' : '#6366f1';
  const torusEmissive = light ? '#c7d2fe' : '#312e81';

  return (
    <Canvas
      camera={{ position: [0, 0.2, 3.2], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.75]}
      style={{ width: '100%', height: 260, borderRadius: 'var(--radius)' }}
    >
      <ambientLight intensity={light ? 0.65 : 0.5} />
      <pointLight position={[4, 4, 4]} intensity={light ? 1.35 : 1.2} />
      <Orbit
        labelColor={labelColor}
        outlineColor={outlineColor}
        torusColor={torusColor}
        torusEmissive={torusEmissive}
      />
    </Canvas>
  );
}
