import React, { useState, useEffect, useCallback } from 'react';
import { GameScreen, TreeType, Decoration } from './types';
import { TREES, DECORATION_CATEGORIES } from './constants';
import Snowfall from './components/Snowfall';
import TreeRenderer from './components/TreeRenderer';

// 🎄 Adjust topper position here (0-100 scale)
const TOPPER_POSITION = {
  x: 90,  // Horizontal: 0 (left) to 100 (right), 50 = center
  y: 16    // Vertical: 0 (top) to 100 (bottom), lower = higher
};

const App: React.FC = () => {
  const [screen, setScreen] = useState<GameScreen>(GameScreen.GREETING);
  const [selectedTree, setSelectedTree] = useState<TreeType | null>(null);
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [typedMessage, setTypedMessage] = useState('');
  const [heldDecoration, setHeldDecoration] = useState<{ type: string; color: string; image: string } | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  
  const fullMessage = `Thank you for building this Christmas tree with me!
I hope we build a beautiful Christmas together again next year.
Merry Christmas, Kaikai! 🎄✨

– Anda`;

  useEffect(() => {
    if (screen === GameScreen.FINAL_REVEAL) {
      let i = 0;
      setTypedMessage('');
      // Fix: Removed .unref() which is not a method on number returned by setInterval in the browser
      const interval = setInterval(() => {
        setTypedMessage(fullMessage.slice(0, i));
        i++;
        if (i > fullMessage.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [screen]);

  // Auto-play music on mount
  useEffect(() => {
    const playMusic = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsMusicPlaying(true);
        } catch (error) {
          // Autoplay blocked - user needs to interact first
          console.log('Autoplay blocked, waiting for user interaction');
        }
      }
    };
    playMusic();
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play();
        setIsMusicPlaying(true);
      }
    }
  };

  const selectDecoration = (type: string, color: string, image: string) => {
    setHeldDecoration({ type, color, image });
  };

  const placeDecoration = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heldDecoration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Only one topper
    if (heldDecoration.type === 'star' || heldDecoration.type === 'angel') {
      setDecorations(prev => prev.filter(d => d.type !== 'star' && d.type !== 'angel'));
    }

    const newDec: Decoration = {
      id: `${Date.now()}-${Math.random()}`,
      type: heldDecoration.type,
      color: heldDecoration.color,
      image: heldDecoration.image,
      x,
      y,
      scale: 0.8 + Math.random() * 0.4
    };

    setDecorations(prev => [...prev, newDec]);
  };

  const clearDecorations = () => setDecorations([]);

  const renderScreen = () => {
    switch (screen) {
      case GameScreen.GREETING:
        return (
          <div className="flex flex-col items-center justify-center h-screen px-4 sm:px-6 text-center z-10 relative">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-christmas text-red-500 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] mb-4 sm:mb-6 animate-pulse leading-tight">
              🎄 Merry Christmas, Kai! 🎄
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-white opacity-90 mb-8 sm:mb-12 max-w-lg transition-all px-2">
              You mentioned about wanting to build a christmas tree, can this be a funny start?
            </p>
            <button
              onClick={() => setScreen(GameScreen.TREE_SELECTION)}
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-lg sm:text-2xl font-bold py-3 px-8 sm:py-4 sm:px-10 rounded-full shadow-lg transform transition hover:scale-105 active:scale-95 flex items-center gap-2 sm:gap-3 border-4 border-yellow-400"
            >
              Let's Start 🎁
            </button>
            <div className="absolute bottom-10 animate-bounce opacity-50">
                <span className="text-4xl">✨</span>
            </div>
          </div>
        );

      case GameScreen.TREE_SELECTION:
        return (
          <div className="flex flex-col items-center justify-start h-screen pt-6 sm:pt-12 px-2 sm:px-4 z-10 relative overflow-hidden">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-christmas text-yellow-400 mb-4 sm:mb-8 px-4">Pick your Christmas Tree</h2>
            
            <div className="flex overflow-x-auto w-full max-w-5xl gap-4 sm:gap-8 px-2 sm:px-4 py-4 sm:py-8 custom-scrollbar scroll-smooth snap-x snap-mandatory">
              {TREES.map((tree) => (
                <div
                  key={tree.id}
                  onClick={() => setSelectedTree(tree.id)}
                  className={`flex-shrink-0 w-52 sm:w-64 p-4 sm:p-6 rounded-3xl cursor-pointer transition-all duration-300 border-4 transform snap-center ${
                    selectedTree === tree.id 
                      ? 'bg-white/20 border-yellow-400 scale-105 sm:scale-110 -translate-y-2 sm:-translate-y-4' 
                      : 'bg-white/5 border-transparent active:bg-white/10'
                  }`}
                >
                  <div className="h-40 sm:h-48 mb-3 sm:mb-4 flex items-center justify-center">
                    <img src={tree.image} alt={tree.name} className="max-h-full w-auto object-contain pointer-events-none" />
                  </div>
                  <h3 className="text-center text-white text-lg sm:text-xl font-bold">{tree.name}</h3>
                  <p className="text-center text-white/60 text-xs sm:text-sm mt-1 sm:mt-2">{tree.description}</p>
                </div>
              ))}
            </div>

            <button
              disabled={!selectedTree}
              onClick={() => setScreen(GameScreen.DECORATION)}
              className={`mt-6 sm:mt-12 py-3 px-8 sm:py-4 sm:px-12 rounded-full text-lg sm:text-2xl font-bold shadow-lg transition transform active:scale-95 ${
                selectedTree 
                  ? 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white border-4 border-yellow-400' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next → Decorate
            </button>
          </div>
        );

      case GameScreen.DECORATION:
        return (
          <div className="flex flex-col lg:flex-row h-screen z-10 relative overflow-hidden">
            {/* Tree Area */}
            <div className="flex-grow flex items-center justify-center p-2 sm:p-4 pt-4 pb-16 sm:pb-4">
              <div 
                className="relative w-full max-w-sm sm:max-w-md cursor-crosshair touch-none"
                onClick={placeDecoration}
              >
                <TreeRenderer type={selectedTree!} decorations={decorations} />
                <div className="absolute -bottom-12 sm:-bottom-8 left-1/2 -translate-x-1/2 w-full flex justify-between gap-2 sm:gap-4 px-2">
                   <button 
                    onClick={(e) => { e.stopPropagation(); clearDecorations(); }}
                    className="bg-red-900/50 hover:bg-red-800 active:bg-red-900 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition"
                   >
                     Reset 🧹
                   </button>
                   <button 
                    onClick={(e) => { e.stopPropagation(); setScreen(GameScreen.FINAL_REVEAL); }}
                    className="bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600 text-green-900 px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base font-bold shadow-md transition transform active:scale-95"
                   >
                     Finish Tree ✨
                   </button>
                </div>
              </div>
            </div>

            {/* Decoration Panel */}
            <div className="w-full lg:w-96 h-64 lg:h-full bg-black/40 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white/10 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 overflow-y-auto">
              <h3 className="text-xl sm:text-2xl font-christmas text-yellow-400 text-center">Dress your Tree</h3>
              {heldDecoration && (
                <div className="bg-green-600/30 border border-green-400 rounded-xl p-2 sm:p-3 text-center">
                  <p className="text-white text-xs sm:text-sm mb-1 sm:mb-2">✨ Holding: <strong>{heldDecoration.type}</strong></p>
                  <p className="text-white/70 text-xs">Tap on the tree to place it!</p>
                </div>
              )}
              {DECORATION_CATEGORIES.map((cat) => (
                <div key={cat.name} className="flex flex-col gap-2 sm:gap-3">
                  <h4 className="text-white/60 text-xs sm:text-sm uppercase tracking-wider">{cat.name}</h4>
                  <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-3">
                    {cat.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => selectDecoration(item.type, item.color, item.image)}
                        className={`flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl border transition group active:scale-95 ${
                          heldDecoration?.type === item.type && heldDecoration?.color === item.color
                            ? 'bg-green-500/30 border-green-400 scale-105'
                            : 'bg-white/10 active:bg-white/20 border-white/5'
                        }`}
                      >
                        <img src={item.image} alt={item.type} className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition group-active:scale-110" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case GameScreen.FINAL_REVEAL:
        return (
          <div className="flex flex-col items-center justify-center h-screen p-3 sm:p-4 z-10 relative text-center overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center max-w-6xl w-full my-auto">
              <div className="flex justify-center order-2 lg:order-1">
                <TreeRenderer type={selectedTree!} decorations={decorations} isGlowing={true} className="max-w-[280px] sm:max-w-[400px] lg:max-w-[500px]" />
              </div>
              <div className="text-left space-y-4 sm:space-y-6 order-1 lg:order-2 px-2">
                <div className="bg-white/10 p-4 sm:p-8 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-sm">
                  <p className="text-white text-base sm:text-xl md:text-3xl font-christmas leading-relaxed whitespace-pre-wrap">
                    {typedMessage}
                    <span className="animate-pulse">|</span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    setScreen(GameScreen.GREETING);
                    setDecorations([]);
                    setSelectedTree(null);
                  }}
                  className="bg-white/10 hover:bg-white/20 active:bg-white/30 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full border border-white/30 text-base sm:text-lg transition flex items-center gap-2 mx-auto lg:mx-0"
                >
                  Create Another One 🌲
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-white selection:bg-red-500 selection:text-white">
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="/assets/music.mp3" type="audio/mpeg" />
      </audio>
      
      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full p-3 sm:p-4 shadow-lg transition transform hover:scale-110 active:scale-95"
        aria-label="Toggle music"
      >
        <span className="text-2xl sm:text-3xl">
          {isMusicPlaying ? '🔊' : '🔇'}
        </span>
      </button>
      
      <Snowfall />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none z-[1]" />
      {renderScreen()}
    </div>
  );
};

export default App;
