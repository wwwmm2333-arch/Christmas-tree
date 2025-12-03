import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { Experience } from './components/Experience';
import { Overlay } from './components/Overlay';
import { TreeMorphState } from './types';

const App: React.FC = () => {
  const [treeState, setTreeState] = useState<TreeMorphState>(TreeMorphState.TREE_SHAPE);

  const toggleState = () => {
    setTreeState((prev) => 
      prev === TreeMorphState.TREE_SHAPE 
        ? TreeMorphState.SCATTERED 
        : TreeMorphState.TREE_SHAPE
    );
  };

  return (
    <div className="w-full h-screen bg-[#050514] relative overflow-hidden">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas
          shadows
          dpr={[1, 2]} // Quality scaling
          gl={{ 
            antialias: false, // Post-processing handles AA usually, or disable for performance with bloom
            toneMappingExposure: 1.5 
          }}
        >
          <Suspense fallback={null}>
            <Experience treeState={treeState} />
          </Suspense>
        </Canvas>
      </div>

      {/* Loading Overlay */}
      <Loader 
        containerStyles={{ background: '#050514' }} 
        innerStyles={{ width: '200px', height: '2px', background: '#333' }}
        barStyles={{ height: '2px', background: '#F50057' }}
        dataInterpolation={(p) => `Loading Signature Experience ${p.toFixed(0)}%`}
        dataStyles={{ fontFamily: 'Cinzel', color: '#F50057', fontSize: '14px', marginTop: '20px' }}
      />

      {/* UI Overlay */}
      <Overlay state={treeState} onToggle={toggleState} />
    </div>
  );
};

export default App;