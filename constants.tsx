
import { TreeDefinition, TreeType } from './types';

export const TREES: TreeDefinition[] = [
  { id: 'bare', name: 'Bare Pine', description: 'A classic lush green pine.', colors: ['#1b4d3e', '#2d5a27'], image: '/assets/trees/bare.png' },
  { id: 'snowy', name: 'Snowy Pine', description: 'Touched by winter frost.', colors: ['#e2e8f0', '#2d5a27'], image: '/assets/trees/snowy.png' },
  { id: 'golden', name: 'Golden Fairy', description: 'Magical shimmering branches.', colors: ['#fde047', '#1b4d3e'], image: '/assets/trees/golden.png' },
  { id: 'modern', name: 'Minimal Modern', description: 'Clean lines for a modern home.', colors: ['#94a3b8', '#1e293b'], image: '/assets/trees/modern.png' },
  { id: 'rustic', name: 'Rustic Wood', description: 'Handcrafted wooden layers.', colors: ['#78350f', '#451a03'], image: '/assets/trees/rusty.png' },
];

export const DECORATION_CATEGORIES = [
  {
    name: 'Balls',
    items: [
      { id: 'ball-red', type: 'ball', color: '#ef4444', icon: '🔴', image: '/assets/decorations/ball-red.png' },
      { id: 'ball-gold', type: 'ball', color: '#fbbf24', icon: '🟡', image: '/assets/decorations/ball-gold.png' },
      { id: 'ball-silver', type: 'ball', color: '#e2e8f0', icon: '⚪', image: '/assets/decorations/ball-silver.png' },
      { id: 'ball-pink', type: 'ball', color: '#f472b6', icon: '🌸', image: '/assets/decorations/ball-pink.png' },
    ]
  },
  {
    name: 'Ornaments',
    items: [
      { id: 'ornament-bell', type: 'bell', color: '#f59e0b', icon: '🔔', image: '/assets/decorations/ornament-bell.png' },
      { id: 'ornament-candy', type: 'candy', color: '#ffffff', icon: '🍬', image: '/assets/decorations/ornament-candy.png' },
      { id: 'ornament-heart', type: 'heart', color: '#ec4899', icon: '💖', image: '/assets/decorations/ornament-heart.png' },
      { id: 'ornament-sock', type: 'sock', color: '#ef4444', icon: '🧦', image: '/assets/decorations/ornament-sock.png' },
    ]
  },
  {
    name: 'Toppers',
    items: [
      { id: 'topper-star', type: 'star', color: '#fbbf24', icon: '⭐', image: '/assets/decorations/topper-star.png' },
      { id: 'topper-angel', type: 'angel', color: '#ffffff', icon: '👼', image: '/assets/decorations/topper-angel.png' },
    ]
  }
];
