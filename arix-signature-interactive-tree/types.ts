import * as THREE from 'three';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      group: any;
      instancedMesh: any;
      octahedronGeometry: any;
      meshStandardMaterial: any;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      group: any;
      instancedMesh: any;
      octahedronGeometry: any;
      meshStandardMaterial: any;
    }
  }
}

export enum TreeMorphState {
  SCATTERED = 'SCATTERED',
  TREE_SHAPE = 'TREE_SHAPE',
}

export interface ParticleData {
  // The target position when forming the tree
  treePosition: THREE.Vector3;
  // The target rotation when forming the tree
  treeRotation: THREE.Euler;
  // The random position when scattered
  scatterPosition: THREE.Vector3;
  // The random rotation when scattered
  scatterRotation: THREE.Euler;
  // Scale of the particle
  scale: number;
  // Individual speed factor for organic movement
  speed: number;
  // Color variant
  color: THREE.Color;
}

export interface TreeConfig {
  count: number;
  radius: number;
  height: number;
  scatterRadius: number;
}