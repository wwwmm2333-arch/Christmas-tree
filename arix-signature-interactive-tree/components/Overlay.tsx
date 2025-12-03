import React from 'react';
import { TreeMorphState } from '../types';
import { Sparkles, Box, Maximize2 } from 'lucide-react';

interface OverlayProps {
  state: TreeMorphState;
  onToggle: () => void;
}

export const Overlay: React.FC<OverlayProps> = ({ state, onToggle }) => {
  const isScattered = state === TreeMorphState.SCATTERED;

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-10 text-[#E1BEE7]">
      {/* Header */}
      <header className="flex justify-between items-start animate-fade-in-down">
        <div>
          <h1 className="font-brand text-4xl md:text-6xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#F50057] via-[#E040FB] to-[#2979FF] drop-shadow-lg">
            WeiWei
          </h1>
          <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase opacity-90 mt-2 text-[#F8BBD0]">
            CHRISTMAS FOR
          </p>
        </div>
        <div className="hidden md:block text-right text-[#B388FF]">
          <p className="font-brand text-xl">MMXXIV</p>
          <p className="text-xs opacity-50">Winter Edition</p>
        </div>
      </header>

      {/* Center Action (Only visible if needed, keeping it clean for now) */}

      {/* Footer Controls */}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-widest opacity-60">Status</span>
          <span className="font-brand text-lg text-[#F50057]">
            {isScattered ? 'Ethereal Drift' : 'Imperial Form'}
          </span>
        </div>

        <button
          onClick={onToggle}
          className={`
            group relative px-8 py-4 bg-opacity-10 bg-black backdrop-blur-md border border-[#F50057]/30 
            transition-all duration-500 hover:bg-[#F50057]/10 hover:border-[#F50057]
            flex items-center gap-3 overflow-hidden
          `}
        >
          {/* Animated Glow Background */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#F50057]/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
          
          {isScattered ? (
            <>
              <Box className="w-5 h-5 text-[#F50057]" />
              <span className="font-body uppercase tracking-widest text-sm text-white">Assemble</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-5 h-5 text-[#F50057]" />
              <span className="font-body uppercase tracking-widest text-sm text-white">Disperse</span>
            </>
          )}
        </button>

        <div className="hidden md:flex flex-col items-end gap-1">
          <span className="text-[10px] uppercase tracking-widest opacity-60">Audio</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-1 h-4 bg-[#F50057] opacity-40 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};