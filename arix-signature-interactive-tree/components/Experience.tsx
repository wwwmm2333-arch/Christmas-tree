import React from 'react';
import { PerspectiveCamera, Environment, OrbitControls, Float, Sparkles, Lightformer } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { InteractiveTree } from './InteractiveTree';
import { TreeMorphState } from '../types';

interface ExperienceProps {
  treeState: TreeMorphState;
}

export const Experience: React.FC<ExperienceProps> = ({ treeState }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={45} />
      <OrbitControls 
        enablePan={false} 
        minDistance={5} 
        maxDistance={20} 
        autoRotate={treeState === TreeMorphState.TREE_SHAPE}
        autoRotateSpeed={0.5}
      />

      {/* --- Lighting Setup for Luxury Metallic Look --- */}
      <ambientLight intensity={0.2} color="#220033" />
      
      {/* Main Pink/Purple Light */}
      <pointLight position={[5, 5, 5]} intensity={20} color="#D500F9" distance={20} decay={2} />
      {/* Rim Light / Back Light (Blue/Cyan) */}
      <spotLight position={[-5, 5, -5]} intensity={30} color="#2979FF" angle={0.5} penumbra={1} />
      {/* Fill Light (Soft Pink) */}
      <pointLight position={[0, -5, 2]} intensity={5} color="#F50057" />

      {/* --- Procedural Environment (Metallic Reflections) --- */}
      <Environment resolution={512}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
          <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
          {/* Neon Pink/Purple Ring for Metallic Luster */}
          <Lightformer form="ring" color="#D500F9" intensity={2} scale={10} position={[0, 0, -10]} />
        </group>
      </Environment>

      {/* --- The Star Object --- */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <InteractiveTree state={treeState} />
      </Float>

      {/* --- Background Ambient Particles (Pink/Silver) --- */}
      <Sparkles 
        count={200} 
        scale={15} 
        size={4} 
        speed={0.4} 
        opacity={0.5} 
        color="#F8BBD0"
      />

      {/* --- Post Processing for Cinematic Glow --- */}
      <EffectComposer disableNormalPass>
        {/* Intense Bloom for the Metallic/Neon Glow */}
        <Bloom 
          luminanceThreshold={0.2} 
          mipmapBlur 
          intensity={1.2} 
          radius={0.5}
        />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <Noise opacity={0.02} /> 
      </EffectComposer>
    </>
  );
};