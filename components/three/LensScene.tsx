'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Procedural optical lens — the signature 3D moment.
 *
 * Art direction: dark metal barrel, concentric rings, a translucent glass front
 * element, a champagne accent ring. No external model, no post-processing, no
 * neon. Movement is restrained: it drifts toward the pointer with inertia and
 * recedes/shrinks as the hero scrolls away, reading the same scroll position as
 * the rest of the hero (not a second animation system).
 */

function Lens() {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const h = window.innerHeight || 1;
      scroll.current = Math.min(1, Math.max(0, window.scrollY / h));
    };
    onScroll();
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const p = scroll.current;
    const lerp = THREE.MathUtils.lerp;

    // Pointer-driven inertia (restrained max rotation).
    g.rotation.y = lerp(g.rotation.y, pointer.current.x * 0.35, 0.045);
    g.rotation.x = lerp(g.rotation.x, pointer.current.y * 0.28 + p * 0.6, 0.045);

    // Scroll: recede + shrink as the hero exits.
    g.position.z = lerp(g.position.z, -p * 2.6, 0.08);
    const s = 1 - p * 0.35;
    g.scale.setScalar(lerp(g.scale.x, s, 0.08));
  });

  return (
    <group ref={group} position={[0, 0, 0]} rotation={[0.1, 0, 0]}>
      {/* Barrel */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.05, 1.15, 0.7, 64]} />
        <meshStandardMaterial color="#0c0c0c" metalness={1} roughness={0.38} />
      </mesh>

      {/* Outer ring */}
      <mesh position={[0, 0, 0.34]}>
        <torusGeometry args={[1.12, 0.11, 32, 96]} />
        <meshStandardMaterial color="#141414" metalness={1} roughness={0.28} />
      </mesh>

      {/* Champagne accent ring */}
      <mesh position={[0, 0, 0.4]}>
        <torusGeometry args={[0.9, 0.025, 24, 96]} />
        <meshStandardMaterial
          color="#C9BBA0"
          metalness={1}
          roughness={0.35}
          emissive="#2a2419"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Inner dark recess for depth */}
      <mesh position={[0, 0, 0.18]}>
        <cylinderGeometry args={[0.82, 0.82, 0.2, 64]} />
        <meshStandardMaterial color="#060606" metalness={0.9} roughness={0.6} />
      </mesh>

      {/* Glass front element (slightly domed) */}
      <mesh position={[0, 0, 0.46]} scale={[1, 1, 0.3]}>
        <sphereGeometry args={[0.84, 64, 64]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={0.6}
          roughness={0.06}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color="#dfe3e6"
          attenuationColor="#9fb0b8"
          attenuationDistance={2}
        />
      </mesh>
    </group>
  );
}

export default function LensScene({ active }: { active: boolean }) {
  const [docHidden, setDocHidden] = useState(false);

  useEffect(() => {
    const onVis = () => setDocHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const running = active && !docHidden;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 1.75]}
      frameloop={running ? 'always' : 'never'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      {/* Restrained lighting — warm key + champagne rim. */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 4]} intensity={1.4} color="#fff2dd" />
      <pointLight position={[-4, -2, -3]} intensity={25} color="#C9BBA0" />

      <Lens />

      {/* Procedural reflections — no external HDR asset, rendered once. */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2} position={[0, 3, 2]} scale={[6, 3, 1]} color="#f4f1ea" />
        <Lightformer intensity={0.6} position={[-4, 0, 1]} scale={[3, 6, 1]} color="#8a8a82" />
        <Lightformer intensity={0.8} position={[4, -1, 1]} scale={[3, 4, 1]} color="#C9BBA0" />
      </Environment>
    </Canvas>
  );
}
