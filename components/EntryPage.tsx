
import React, { useState, useEffect } from 'react';

interface Concept {
  id: string;
  text: string;
  timestamp: string;
  intensity: number;
}

interface EntryPageProps {
  onEnter: () => void;
}

const TRANSITION_IMAGES = [
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
];

const BACKGROUND_BOXES = [
  { size: 'w-24 h-24', path: 'random-path-1', duration: '40s', delay: '0s', top: '10%', left: '20%' },
  { size: 'w-40 h-40', path: 'random-path-2', duration: '55s', delay: '-5s', top: '60%', left: '70%' },
  { size: 'w-16 h-16', path: 'random-path-3', duration: '35s', delay: '-10s', top: '40%', left: '40%' },
  { size: 'w-32 h-32', path: 'random-path-1', duration: '50s', delay: '-15s', top: '80%', left: '10%' },
  { size: 'w-20 h-20', path: 'random-path-2', duration: '45s', delay: '-20s', top: '20%', left: '80%' },
];

export const EntryPage: React.FC<EntryPageProps> = ({ onEnter }) => {
  const [stage, setStage] = useState(-1);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [targetPos, setTargetPos] = useState({ x: -200, y: -200 });
  const [isExpanding, setIsExpanding] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [concepts, setConcepts] = useState<Concept[]>([
    { id: '1', text: "Decentralized energy grids are the first step to sovereignty.", timestamp: '2m ago', intensity: 0.8 },
    { id: '2', text: "The Triumvirate model resolves the 'single-point-of-failure' in current leadership.", timestamp: '5m ago', intensity: 0.9 },
    { id: '3', text: "Simulating societal outcomes is the only way to avoid historical repeats.", timestamp: '8m ago', intensity: 0.7 },
  ]);
  const [newConcept, setNewConcept] = useState('');

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setTargetPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    
    let animationId: number;
    const updatePos = () => {
      setMousePos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.15,
        y: prev.y + (targetPos.y - prev.y) * 0.15
      }));
      animationId = requestAnimationFrame(updatePos);
    };
    updatePos();
    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(animationId);
    };
  }, [targetPos]);

  useEffect(() => {
    if (stage === 0) {
      setCurrentImg(Math.floor(Math.random() * TRANSITION_IMAGES.length));
      const timers = [
        setTimeout(() => { setStage(1); setCurrentImg(1); }, 1000),
        setTimeout(() => { setStage(2); setCurrentImg(2); }, 2500),
        setTimeout(() => { setStage(3); setCurrentImg(3); }, 4200),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [stage]);

  const handleInitialClick = () => {
    if (stage !== -1) return;
    setIsExpanding(true);
    setTimeout(() => {
      setStage(0);
      setIsExpanding(false);
    }, 800);
  };

  const handlePostConcept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConcept.trim()) return;
    setConcepts([{ id: Date.now().toString(), text: newConcept, timestamp: 'Just now', intensity: Math.random() }, ...concepts]);
    setNewConcept('');
  };

  const skipToDashboard = () => setStage(3);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Drifting Architectural Nodes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {BACKGROUND_BOXES.map((box, i) => (
          <div 
            key={i}
            className={`floating-node rounded-2xl ${box.size} border-white/10`}
            style={{ 
              top: box.top, 
              left: box.left,
              animation: `${box.path} ${box.duration} linear infinite`,
              animationDelay: box.delay
            }}
          >
            <div className="absolute inset-2 border border-white/5 rounded-xl opacity-50" />
            <div className="absolute top-2 left-2 w-1 h-1 bg-cyan-500 rounded-full opacity-40" />
            <div className="absolute bottom-2 right-2 w-1 h-1 bg-orange-500 rounded-full opacity-40" />
          </div>
        ))}
      </div>

      {/* Dynamic Shimmering Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="shimmer-overlay" />
      </div>

      <div className="absolute inset-0 z-0">
        {TRANSITION_IMAGES.map((img, i) => (
          <div 
            key={i}
            className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${currentImg === i ? 'opacity-40 scale-100' : 'opacity-0 scale-110'} animate-drift`}
            style={{ 
              backgroundImage: `url(${img})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              transitionProperty: 'opacity, transform'
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/30 to-slate-950/90" />
      </div>

      {stage === -1 && (
        <div className="relative z-50 w-full h-full cursor-pointer flex flex-col items-center justify-center" onClick={handleInitialClick}>
          <div 
            className={`pointer-events-none transition-all duration-700 ease-out flex flex-col items-center justify-center ${isExpanding ? 'scale-[30] opacity-0 blur-2xl' : 'scale-100 opacity-100'}`}
            style={{ 
                position: 'fixed',
                left: mousePos.x, 
                top: mousePos.y, 
                transform: 'translate(-50%, -50%)' 
            }}
          >
            <div className="w-24 h-24 rounded-full border-2 border-cyan-400/40 flex items-center justify-center bg-cyan-400/5 backdrop-blur-md relative">
              <div className="absolute inset-0 rounded-full border border-orange-500/30 animate-ping" />
              <div className="absolute inset-[-10px] rounded-full border border-fuchsia-500/10 animate-pulse" />
              <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_30px_white]" />
            </div>
            {!isExpanding && (
              <div className="mt-12 text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-cyan-400 block mb-2 shimmer-text">Initialize Simulation</span>
                <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/20 block">Click Anywhere</span>
              </div>
            )}
          </div>
        </div>
      )}

      {stage >= 0 && stage < 3 && (
        <div className="relative z-10 text-center px-4 max-w-5xl transition-all duration-1000">
          <div className={`transition-all duration-[2000ms] transform ${stage >= 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-90'}`}>
            <h1 className="text-8xl md:text-[200px] font-black tracking-tighter text-white/5 uppercase select-none leading-none mb-[-40px] md:mb-[-120px]">Imagine</h1>
          </div>
          <div className={`transition-all duration-[2000ms] transform delay-1000 ${stage >= 2 ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-xl'}`}>
            <p className="text-4xl md:text-7xl font-serif italic text-cyan-400 drop-shadow-glow leading-tight shimmer-text">"It doesn't have to be <br/>this way."</p>
          </div>
          <button onClick={skipToDashboard} className="mt-20 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white/60 transition-colors">Skip Sequence</button>
        </div>
      )}

      {stage === 3 && (
        <div className="relative z-50 w-full max-w-7xl h-full flex flex-col md:flex-row gap-10 p-6 md:p-14 animate-in fade-in zoom-in slide-in-from-bottom-12 duration-[1500ms]">
          <div className="md:w-1/3 flex flex-col justify-between">
            <div className="space-y-10">
              <div className="bg-slate-950/80 backdrop-blur-xl px-10 py-6 rounded-2xl border border-white/10 ststw-glow inline-block relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="text-6xl font-black tracking-widest text-white block">STSTW</span>
                <span className="text-[10px] font-black text-slate-500 tracking-[0.4em] uppercase mt-2 block">System Hub v1.0</span>
              </div>
              <h2 className="text-6xl font-serif font-bold text-white leading-tight">Collective <br/><span className="gradient-text italic">Consciousness</span></h2>
              <p className="text-slate-400 text-xl font-medium border-l-4 border-orange-500/30 pl-8">Contribute novel concepts to the simulation. Your thoughts are the future's architecture.</p>
            </div>
            <div className="pt-10 border-t border-white/10">
              <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onEnter();
                }} 
                className="group relative w-full px-10 py-8 font-black text-white uppercase tracking-[0.3em] text-sm overflow-hidden rounded-3xl bg-white/5 border border-white/20 hover:bg-white/10 transition-all shadow-2xl active:scale-95 z-[60]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                Initialize Main Protocol
              </button>
            </div>
          </div>

          <div className="md:w-2/3 flex flex-col glass-card rounded-[60px] border-white/10 p-10 md:p-16 overflow-hidden h-[60vh] md:h-auto shadow-2xl relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 blur-[100px] -z-10" />
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-base font-black uppercase tracking-[0.5em] text-white shimmer-text">Live Thought Stream</h3>
            </div>
            <div className="flex-grow overflow-y-auto space-y-8 mb-12 pr-6 custom-scrollbar">
              {concepts.map((concept) => (
                <div key={concept.id} className="p-8 bg-white/5 border border-white/5 rounded-[32px] hover:border-purple-500/40 transition-all hover:scale-[1.02] transform duration-500">
                  <p className="text-2xl text-slate-200 font-medium leading-relaxed">{concept.text}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handlePostConcept} className="relative mt-auto">
              <input value={newConcept} onChange={(e) => setNewConcept(e.target.value)} placeholder="Sync Thought..." className="w-full bg-white/5 border border-white/10 rounded-3xl px-10 py-7 text-white text-xl focus:outline-none focus:ring-2 focus:ring-orange-500/40 transition-all" />
              <button type="submit" className="absolute right-3 top-3 bottom-3 bg-orange-500 px-10 rounded-2xl text-[10px] font-black uppercase text-white hover:bg-orange-600 transition-all orange-glow">Sync</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
