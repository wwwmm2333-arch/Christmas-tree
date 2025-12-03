import React, { useMemo, useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ParticleData, TreeConfig, TreeMorphState } from '../types';
import { generateTreeParticles } from '../utils/math';

interface InteractiveTreeProps {
  state: TreeMorphState;
}

const CONFIG: TreeConfig = {
  count: 1800,       // Number of crystals
  radius: 2.5,       // Base radius of tree
  height: 6.5,       // Height of tree
  scatterRadius: 12, // How far they scatter
};

// Reusable dummy for matrix calculations
const dummy = new THREE.Object3D();
const _position = new THREE.Vector3();
const _quaternion = new THREE.Quaternion();
const _scale = new THREE.Vector3();
const _targetPos = new THREE.Vector3();

export const InteractiveTree: React.FC<InteractiveTreeProps> = ({ state }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Generate data once
  const particles = useMemo(() => generateTreeParticles(CONFIG), []);

  // Initialize colors
  useLayoutEffect(() => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      meshRef.current!.setColorAt(i, p.color);
    });
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [particles]);

  useFrame((stateThree, delta) => {
    if (!meshRef.current) return;

    const time = stateThree.clock.getElapsedTime();
    const isTree = state === TreeMorphState.TREE_SHAPE;

    // Smooth damp factor for transition
    // We update each particle individually for organic feel
    
    particles.forEach((particle, i) => {
      // 1. Determine Target based on State
      const target = isTree ? particle.treePosition : particle.scatterPosition;
      
      // 2. Get current instance matrix to extract current position
      meshRef.current!.getMatrixAt(i, dummy.matrix);
      dummy.matrix.decompose(_position, _quaternion, _scale);

      // 3. Interpolation Logic (Lerp)
      // Speed varies per particle for "glittering" assembly effect
      const alpha = delta * (isTree ? 2.5 : 1.5) * particle.speed; 
      
      // Interpolate Position
      _position.lerp(target, alpha);

      // 4. Add "Floating" / "Breathing" motion
      // Even when in tree shape, they should hover slightly
      const hoverFreq = 0.5;
      const hoverAmp = 0.005;
      _position.y += Math.sin(time * hoverFreq + i) * hoverAmp;

      // 5. Rotation Logic
      // Spin slowly
      const targetRot = isTree ? particle.treeRotation : particle.scatterRotation;
      // Convert Euler to Quaternion for smooth slerp
      const targetQuat = new THREE.Quaternion().setFromEuler(targetRot);
      // Add continuous slow spin
      const spin = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), time * 0.1 * particle.speed);
      targetQuat.multiply(spin);
      
      _quaternion.slerp(targetQuat, alpha);

      // 6. Scale Logic
      // Pulse slightly
      const scaleBase = particle.scale;
      const pulse = 1 + Math.sin(time * 2 + i * 0.1) * 0.1;
      _scale.setScalar(scaleBase * pulse);

      // 7. Update Matrix
      dummy.position.copy(_position);
      dummy.quaternion.copy(_quaternion);
      dummy.scale.copy(_scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, CONFIG.count]}
      castShadow
      receiveShadow
    >
      {/* Use a diamond/octahedron shape for luxury crystal feel */}
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        toneMapped={false}
        color="#ffffff" 
        emissive="#000000"
        roughness={0.1}
        metalness={0.9}
        envMapIntensity={2}
      />
    </instancedMesh>
  );
};