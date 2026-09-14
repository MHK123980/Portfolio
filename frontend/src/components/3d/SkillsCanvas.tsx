import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

interface ConstellationNode {
  name: string;
  category: string;
  position: [number, number, number];
  color: string;
}

function ConstellationPoint({
  node,
  onHover,
}: {
  node: ConstellationNode;
  onHover: (name: string | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered ? 1.4 : 1 + Math.sin(t * 2 + node.position[0]) * 0.08);
    }
  });

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          setHovered(true);
          onHover(node.name);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : node.color}
          emissive={node.color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          roughness={0.2}
        />
      </mesh>

      {/* 3D HTML Label */}
      <Html distanceFactor={10} position={[0, 0.35, 0]} center>
        <div
          className={`px-2 py-0.5 rounded text-[11px] font-mono whitespace-nowrap pointer-events-none transition-all duration-200 ${
            hovered
              ? 'bg-brand-cyan text-dark-950 font-bold scale-110 shadow-lg shadow-brand-cyan/40'
              : 'bg-dark-900/80 text-slate-300 border border-slate-700/50'
          }`}
        >
          {node.name}
        </div>
      </Html>
    </group>
  );
}

function ConstellationLinks({ nodes }: { nodes: ConstellationNode[] }) {
  const lineSegments = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const center = new THREE.Vector3(0, 0, 0);

    nodes.forEach((node) => {
      // Connect each node to center
      points.push(center);
      points.push(new THREE.Vector3(...node.position));
    });

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [nodes]);

  return (
    <lineSegments geometry={lineSegments}>
      <lineBasicMaterial color="#38bdf8" transparent opacity={0.2} />
    </lineSegments>
  );
}

function ConstellationGroup({ onHover }: { onHover: (name: string | null) => void }) {
  const groupRef = useRef<THREE.Group>(null!);

  const nodes: ConstellationNode[] = useMemo(
    () => [
      { name: 'Android', category: 'Mobile', position: [-2.2, 1.3, 0.5], color: '#38bdf8' },
      { name: 'Kotlin', category: 'Mobile', position: [-2.6, -0.8, -0.4], color: '#818cf8' },
      { name: 'Compose', category: 'Mobile', position: [-1.4, -2.1, 0.8], color: '#34d399' },
      { name: 'React', category: 'Web', position: [2.3, 1.2, 0.4], color: '#06b6d4' },
      { name: 'TypeScript', category: 'Web', position: [2.5, -0.9, -0.5], color: '#3b82f6' },
      { name: 'Tailwind CSS', category: 'Web', position: [1.3, -2.2, 0.7], color: '#38bdf8' },
      { name: 'Node.js', category: 'Backend', position: [0.2, 2.4, -0.8], color: '#10b981' },
      { name: 'PostgreSQL', category: 'Backend', position: [-1.2, 2.0, 1.2], color: '#6366f1' },
      { name: 'Supabase', category: 'Backend', position: [1.4, 2.1, 1.0], color: '#14b8a6' },
    ],
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Core Sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#0b172a"
          roughness={0.2}
          metalness={0.9}
          emissive="#06b6d4"
          emissiveIntensity={0.3}
        />
      </mesh>
      <Html distanceFactor={9} position={[0, 0, 0]} center>
        <div className="px-2.5 py-1 rounded-md bg-dark-900/90 text-brand-cyan border border-brand-cyan/40 font-mono text-xs font-semibold whitespace-nowrap pointer-events-none shadow-md">
          Core Stack
        </div>
      </Html>

      <ConstellationLinks nodes={nodes} />

      {nodes.map((node) => (
        <ConstellationPoint key={node.name} node={node} onHover={onHover} />
      ))}
    </group>
  );
}

export const SkillsCanvas: React.FC = () => {
  const [, setActiveNode] = useState<string | null>(null);

  return (
    <div className="w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden glass-card relative">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#818cf8" />

        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
          <ConstellationGroup onHover={setActiveNode} />
        </Float>
      </Canvas>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-400 pointer-events-none">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
          Interactive 3D Constellation
        </span>
        <span className="text-slate-500 hidden sm:inline">Hover nodes to inspect</span>
      </div>
    </div>
  );
};
