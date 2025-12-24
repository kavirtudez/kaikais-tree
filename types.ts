
export enum GameScreen {
  GREETING = 'GREETING',
  TREE_SELECTION = 'TREE_SELECTION',
  DECORATION = 'DECORATION',
  FINAL_REVEAL = 'FINAL_REVEAL'
}

export type TreeType = 'bare' | 'snowy' | 'golden' | 'modern' | 'rustic';

export interface Decoration {
  id: string;
  type: string;
  color: string;
  image: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  scale: number;
}

export interface TreeDefinition {
  id: TreeType;
  name: string;
  description: string;
  colors: string[];
  image: string;
}

export interface DecorationItem {
  id: string;
  type: string;
  color: string;
  icon: string;
  image: string;
}
