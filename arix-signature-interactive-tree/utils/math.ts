import * as THREE from 'three';
import { ParticleData, TreeConfig } from '../types';

// Deep Blue, Light Purple, Pink Palette
const COLORS = [
  new THREE.Color('#0D1B2A'), // Deepest Midnight Blue
  new THREE.Color('#3D5AFE'), // Electric Blue
  new THREE.Color('#D500F9'), // Vibrant Purple
  new THREE.Color('#F50057'), // Hot Pink
  new THREE.Color('#FF80AB'), // Soft Pink
  new THREE.Color('#E0E0E0'), // Metallic Silver/Platinum
];

export const generateTreeParticles = (config: TreeConfig): ParticleData[] => {
  const particles: ParticleData[] = [];
  const { count, radius, height, scatterRadius } = config;

  for (let i = 0; i < count; i++) {
    // --- 1. Calculate Tree Position (Cone Shape) ---
    // Normalized height (0 to 1)
    const yNorm = Math.random(); 
    // Actual Y position (centered vertically somewhat)
    const y = yNorm * height - height / 2;
    
    // Radius at this height (tapers to 0 at top)
    // We add a little randomness to radius so it's not a perfect geometric cone
    const rAtHeight = (1 - yNorm) * radius;
    const r = rAtHeight * (0.8 + Math.random() * 0.4); 

    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;

    const treePos = new THREE.Vector3(x, y, z);
    
    // Rotate particles to face outward slightly or randomly
    const treeRot = new THREE.Euler(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );

    // --- 2. Calculate Scatter Position (Sphere/Cloud) ---
    // Random point inside a sphere
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const scatterR = Math.cbrt(Math.random()) * scatterRadius; // cbrt for uniform distribution
    
    const sx = scatterR * Math.sin(phi) * Math.cos(theta);
    const sy = scatterR * Math.sin(phi) * Math.sin(theta);
    const sz = scatterR * Math.cos(phi);

    const scatterPos = new THREE.Vector3(sx, sy, sz);
    const scatterRot = new THREE.Euler(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );

    // --- 3. Attributes ---
    // Metallic particles (Silver/Pink) should pop
    const isHighlight = Math.random() > 0.8;
    const scale = isHighlight ? 0.08 + Math.random() * 0.12 : 0.08 + Math.random() * 0.12;
    
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    const color = COLORS[colorIndex];

    particles.push({
      treePosition: treePos,
      treeRotation: treeRot,
      scatterPosition: scatterPos,
      scatterRotation: scatterRot,
      scale,
      speed: 0.5 + Math.random() * 1.5,
      color,
    });
  }

  return particles;
};