
import React from 'react';
import { TreeType, Decoration } from '../types';
import { TREES } from '../constants';

interface TreeRendererProps {
  type: TreeType;
  decorations?: Decoration[];
  className?: string;
  isGlowing?: boolean;
}

const TreeRenderer: React.FC<TreeRendererProps> = ({ type, decorations = [], className = "", isGlowing = false }) => {
  const treeData = TREES.find(t => t.id === type);
  const renderBase = () => {
    switch (type) {
      case 'bare':
        return (
          <path d="M50 5 L90 95 L10 95 Z" fill="#1b4d3e" className="transition-colors duration-500" />
        );
      case 'snowy':
        return (
          <>
            <path d="M50 5 L90 95 L10 95 Z" fill="#2d5a27" />
            <path d="M50 5 L65 40 L35 40 Z" fill="#ffffff" opacity="0.8" />
            <path d="M30 60 L70 60 L80 85 L20 85 Z" fill="#ffffff" opacity="0.6" />
          </>
        );
      case 'golden':
        return (
          <path d="M50 5 L90 95 L10 95 Z" fill="#fbbf24" opacity="0.9" className="animate-glow" />
        );
      case 'modern':
        return (
          <>
             <rect x="40" y="5" width="20" height="90" fill="#94a3b8" />
             <path d="M50 10 L85 90 L15 90 Z" fill="none" stroke="#64748b" strokeWidth="2" />
          </>
        );
      case 'rustic':
        return (
          <>
            <rect x="45" y="80" width="10" height="20" fill="#78350f" />
            <path d="M50 5 L80 35 L20 35 Z" fill="#451a03" />
            <path d="M50 25 L85 60 L15 60 Z" fill="#451a03" />
            <path d="M50 50 L90 95 L10 95 Z" fill="#451a03" />
          </>
        );
      default:
        return <path d="M50 5 L90 95 L10 95 Z" fill="#1b4d3e" />;
    }
  };

  // If tree has an image, render it as PNG
  if (treeData?.image) {
    return (
      <div className={`relative w-full max-w-[400px] aspect-[4/5] mx-auto ${className}`}>
        <img 
          src={treeData.image} 
          alt={treeData.name}
          className={`w-full h-full object-contain drop-shadow-xl ${isGlowing ? 'animate-glow' : 'animate-sway'}`}
        />
        {/* Topper at absolute top */}
        {decorations.filter(d => d.type === 'star' || d.type === 'angel').map(dec => (
          <img
            key={dec.id}
            src={dec.image}
            alt={dec.type}
            className="absolute top-0 left-1/2 -translate-x-[75%] w-24 h-24 object-contain animate-pop-in drop-shadow-md z-10"
          />
        ))}
        
        {/* Other decorations overlay */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
          {decorations.filter(d => d.type !== 'star' && d.type !== 'angel').map((dec) => {
            const size = 8 * dec.scale;
            return (
              <image
                key={dec.id}
                href={dec.image}
                x={dec.x - size / 2}
                y={dec.y - size / 2}
                width={size}
                height={size}
                className="animate-pop-in"
              />
            );
          })}
        </svg>
      </div>
    );
  }

  // Otherwise render SVG
  return (
    <div className={`relative w-full max-w-[400px] aspect-[4/5] mx-auto ${className}`}>
      <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-xl ${isGlowing ? 'animate-glow' : 'animate-sway'}`}>
        {/* Trunk */}
        {type !== 'rustic' && <rect x="46" y="90" width="8" height="10" fill="#3d2b1f" />}
        {renderBase()}
        
        {/* Render Decorations */}
        {decorations.map((dec) => {
          const size = 6 * dec.scale;
          if (dec.type === 'star' || dec.type === 'angel') {
            return (
              <text 
                key={dec.id} 
                x="50%" 
                y="5%" 
                textAnchor="middle" 
                fontSize="12" 
                className="animate-pop-in drop-shadow-md"
              >
                {dec.type === 'star' ? '⭐' : '👼'}
              </text>
            );
          }
          
          return (
            <g key={dec.id} className="animate-pop-in">
              <circle 
                cx={dec.x} 
                cy={dec.y} 
                r={size / 2} 
                fill={dec.color} 
                className={dec.type === 'light' ? 'animate-pulse' : ''}
              />
              <text 
                x={dec.x} 
                y={dec.y} 
                fontSize={size} 
                textAnchor="middle" 
                alignmentBaseline="middle"
                className="pointer-events-none"
              >
                {dec.type === 'ball' ? '' : 
                 dec.type === 'bell' ? '🔔' :
                 dec.type === 'candy' ? '🍬' :
                 dec.type === 'heart' ? '💖' :
                 dec.type === 'sock' ? '🧦' : ''}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default TreeRenderer;
