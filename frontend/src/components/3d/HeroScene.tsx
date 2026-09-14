import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Floating Geometric Core
function TechCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.1;
      wireRef.current.rotation.y = -t * 0.15;
      wireRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Solid Polyhedron */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial
          color="#0b172a"
          roughness={0.15}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>

      {/* Outer Wireframe Cage */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Glowing inner light point */}
      <pointLight color="#06b6d4" intensity={2.5} distance={8} />
    </group>
  );
}

// Orbital Rings
function OrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = 1.1 + Math.sin(t * 0.3) * 0.1;
      ring1Ref.current.rotation.y = t * 0.25;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -0.9 + Math.cos(t * 0.25) * 0.1;
      ring2Ref.current.rotation.y = -t * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.8, 0.015, 16, 100]} />
        <meshStandardMaterial color="#818cf8" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// Floating Data Nodes / Satellites
function DataNodes() {
  const nodes = useMemo(() => {
    return [
      { pos: [2.5, 1.8, -1], label: 'Kotlin' },
      { pos: [-2.6, 1.4, 0.5], label: 'React' },
      { pos: [2.8, -1.5, 0.8], label: 'TypeScript' },
      { pos: [-2.4, -1.8, -1.2], label: 'PostgreSQL' },
      { pos: [0, 2.8, 1.2], label: 'API' },
    ];
  }, []);

  return (
    <group>
      {nodes.map((node, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={node.pos as [number, number, number]}>
            <boxGeometry args={[0.25, 0.25, 0.25]} />
            <meshStandardMaterial color="#06b6d4" roughness={0.2} metalness={0.8} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Mouse Parallax Controller
function SceneController() {
  useFrame(({ mouse, camera }) => {
    // Gentle camera parallax following mouse
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.8, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.6, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export const HeroScene: React.FC = () => {
  const reducedMotion = useReducedMotion();

  // If reduced motion is requested, render clean minimalist fallback
  if (reducedMotion) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-80 h-80 rounded-full bg-gradient-to-tr from-brand-cyan/20 to-brand-blue/20 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-8, -8, -5]} intensity={1} color="#6366f1" />

        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
          <TechCore />
          <OrbitalRings />
          <DataNodes />
        </Float>

        <Sparkles
          count={50}
          scale={10}
          size={2}
          speed={0.3}
          opacity={0.3}
          color="#38bdf8"
        />

        <SceneController />
      </Canvas>
      {/* Vignette Overlay for smooth edge blend */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-dark-950/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-950/60 via-transparent to-dark-950/60 pointer-events-none" />
    </div>
  );
};
