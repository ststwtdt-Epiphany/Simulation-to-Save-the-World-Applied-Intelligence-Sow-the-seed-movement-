
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  isArchitect?: boolean;
  isTip?: boolean;
}

const ARCHIVE_VIDEOS = [
  { id: 'v1', title: 'The Triumvirate Blueprint', duration: '12:04', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800' },
  { id: 'v2', title: 'Simulation 001: Results', duration: '08:45', thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800' },
  { id: 'v3', title: 'A Message from Desmond', duration: '05:22', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' }
];

export const JoinLiveHub: React.FC<{ onNavigateToSupport: () => void }> = ({ onNavigateToSupport }) => {
  const [isActive, setIsActive] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'System', text: 'Handshake complete. Node connected to global stream.' },
    { id: '2', user: '@NeonGhost', text: 'Is the Architect coming online for Batch 001 discussion?' },
    { id: '3', user: '@Sovereign_X', text: 'Ready to audit the new data lease proposal.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [showArchive, setShowArchive] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [vibeLevel, setVibeLevel] = useState(40);
  const [reactions, setReactions] = useState<{ id: number; icon: string; x: number }[]>([]);
  const [nodes, setNodes] = useState<{ city: string; lat: string; lng: string }[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    // Generate mock global node connections for heatmap vibe
    const locations = [
      { city: 'London', lat: '51.5', lng: '0.12' },
      { city: 'New York', lat: '40.7', lng: '-74.0' },
      { city: 'Tokyo', lat: '35.6', lng: '139.6' },
      { city: 'Berlin', lat: '52.5', lng: '13.4' }
    ];
    const interval = setInterval(() => {
      const loc = locations[Math.floor(Math.random() * locations.length)];
      setNodes(prev => [loc, ...prev].slice(0, 5));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    // Novel Concept: Detect Tipping Command
    if (inputText.startsWith('/tip ')) {
      const amount = inputText.split(' ')[1];
      setChatMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        user: '@UserNode', 
        text: `Transmitted ${amount} Energy Units to System Core.`, 
        isTip: true 
      }]);
      setVibeLevel(prev => Math.min(prev + 10, 100));
    } else {
      setChatMessages(prev => [...prev, { id: Date.now().toString(), user: '@UserNode', text: inputText }]);
    }
    setInputText('');
  };

  const triggerReaction = (icon: string) => {
    const id = Date.now();
    setReactions(prev => [...prev, { id, icon, x: Math.random() * 80 + 10 }]);
    setVibeLevel(prev => Math.min(prev + 2, 100));
    setTimeout(() => setReactions(prev => prev.filter(r => r.id !== id)), 2000);
  };

  return (
    <div className="pt-24 min-h-screen bg-[#020617] text-white flex flex-col lg:flex-row overflow-hidden h-screen">
      {/* Policy Work Modal Overlay */}
      {showPolicyModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="glass-card w-full max-w-2xl rounded-[40px] p-10 border-orange-500/30 animate-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-orange-500 italic">Policy Workbench</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Drafting Environment: V1.4</p>
              </div>
              <button onClick={() => setShowPolicyModal(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2}/></svg>
              </button>
            </div>
            <textarea 
              placeholder="Describe the systemic friction and your proposed architectural fix..."
              className="w-full h-64 bg-black/40 border border-white/10 rounded-3xl p-6 text-white outline-none focus:ring-1 focus:ring-orange-500 mb-8 resize-none font-medium"
            />
            <div className="flex gap-4">
              <button className="flex-grow bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Submit to Architect</button>
              <button className="px-8 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500">Save Draft</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Stream Area */}
      <div className="flex-grow relative flex flex-col bg-black">
        {/* Vibe Meter Waveform Overlay */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 flex items-end space-x-0.5 h-12 opacity-40">
           {Array.from({length: 30}).map((_, i) => (
             <div 
               key={i} 
               className="w-1 bg-cyan-500 rounded-full" 
               style={{ 
                 height: `${Math.random() * vibeLevel + 10}%`,
                 transition: 'height 0.3s ease'
               }} 
             />
           ))}
        </div>

        {/* Video Player / Live Visual */}
        <div className="flex-grow relative group overflow-hidden">
          {isActive ? (
            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center overflow-hidden">
               {/* Live Node Map Visual */}
               <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000')] bg-cover" />
               <div className="relative z-10 text-center">
                  <div className="w-24 h-24 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-[0_0_40px_rgba(249,115,22,0.4)]" />
                  <h3 className="text-2xl font-serif font-bold italic mb-2">Establishing Triumvirate Bridge</h3>
                  <p className="text-orange-500 font-black tracking-[0.5em] uppercase text-[10px] animate-pulse">Synchronizing Global Consciousness...</p>
               </div>
            </div>
          ) : (
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover opacity-40 grayscale"
                alt="Live Placeholder"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                 <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 mb-8 cursor-pointer hover:scale-110 transition-all hover:bg-orange-500 hover:border-orange-500 group" onClick={() => setIsActive(true)}>
                    <svg className="w-10 h-10 text-white ml-2 group-hover:scale-125 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
                 </div>
                 <h2 className="text-5xl md:text-7xl font-serif font-bold italic mb-6 tracking-tighter">Simulation Offline</h2>
                 <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed">The Architect is currently processing historical data. Sync scheduled for 18:00 UTC.</p>
              </div>
            </div>
          )}

          {/* Floating Reactions Layer */}
          <div className="absolute inset-0 pointer-events-none">
            {reactions.map(r => (
              <div 
                key={r.id} 
                className="absolute bottom-0 text-5xl animate-reaction-float opacity-0"
                style={{ left: `${r.x}%` }}
              >
                {r.icon}
              </div>
            ))}
          </div>

          {/* Overlay Stats */}
          <div className="absolute top-8 left-8 flex flex-col space-y-3">
             <div className="flex items-center space-x-4">
                <div className="bg-red-600 px-4 py-2 rounded-xl flex items-center space-x-2 shadow-xl shadow-red-950/40">
                   <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-white">Live Transmit</span>
                </div>
                <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10 flex items-center text-white">
                   <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 shadow-[0_0_8px_cyan]" />
                   1.4k Nodes Active
                </div>
             </div>
             {/* Node Registry Concept */}
             <div className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/5 w-48 animate-in slide-in-from-left duration-700">
                <p className="text-[8px] font-black uppercase text-slate-500 mb-2 tracking-widest">Global Handshakes</p>
                <div className="space-y-1">
                  {nodes.map((node, i) => (
                    <p key={i} className="text-[9px] font-bold text-cyan-400/70 truncate uppercase tracking-tighter">
                      Connected: {node.city} [{node.lat}, {node.lng}]
                    </p>
                  ))}
                </div>
             </div>
          </div>

          <div className="absolute top-8 right-8 flex space-x-4">
             <button 
                onClick={() => setShowArchive(!showArchive)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/10 transition-all group"
                title="Archive Drawer"
             >
                <svg className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
             </button>
          </div>
        </div>

        {/* Video Interaction Bar */}
        <div className="p-6 bg-slate-950/90 backdrop-blur-3xl border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center space-x-10">
              <button onClick={() => triggerReaction('🔥')} className="text-3xl hover:scale-150 transition-all grayscale hover:grayscale-0">🔥</button>
              <button onClick={() => triggerReaction('🧠')} className="text-3xl hover:scale-150 transition-all grayscale hover:grayscale-0">🧠</button>
              <button onClick={() => triggerReaction('⚖️')} className="text-3xl hover:scale-150 transition-all grayscale hover:grayscale-0">⚖️</button>
              <button onClick={() => triggerReaction('⚡')} className="text-3xl hover:scale-150 transition-all grayscale hover:grayscale-0">⚡</button>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col items-center">
                 <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">System Vibe</span>
                 <div className="w-24 h-1 bg-white/5 mt-2 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 transition-all duration-500" style={{ width: `${vibeLevel}%` }} />
                 </div>
              </div>
           </div>
           
           <div className="flex items-center space-x-4 w-full md:w-auto">
              <button 
                onClick={onNavigateToSupport}
                className="flex-grow md:flex-grow-0 bg-orange-500 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center shadow-xl shadow-orange-950/20"
              >
                <span className="mr-3 text-lg">⚡</span> Direct Tip
              </button>
              <button 
                onClick={() => setShowPolicyModal(true)}
                className="flex-grow md:flex-grow-0 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Draft Policy
              </button>
           </div>
        </div>
      </div>

      {/* Side Chat Panel */}
      <div className="w-full lg:w-[450px] bg-[#0f172a] border-l border-white/5 flex flex-col relative">
        {/* Archive Overlay */}
        {showArchive && (
          <div className="absolute inset-0 z-50 bg-[#0f172a] animate-in slide-in-from-right duration-500 flex flex-col">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
               <h3 className="text-xs font-black uppercase tracking-[0.4em] text-orange-500">Transmission Archive</h3>
               <button onClick={() => setShowArchive(false)} className="text-slate-500 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
               </button>
            </div>
            <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {ARCHIVE_VIDEOS.map(video => (
                <div key={video.id} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-[32px] overflow-hidden mb-4 border border-white/5">
                     <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                           <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/></svg>
                        </div>
                     </div>
                     <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-[10px] font-black">{video.duration}</div>
                  </div>
                  <h4 className="font-bold text-base group-hover:text-orange-500 transition-colors px-2 text-white">{video.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
           <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_emerald]" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Consciousness Stream</h3>
           </div>
           <span className="text-[8px] font-black text-slate-500 bg-white/5 px-2 py-1 rounded">SSL_STSTW_ACTIVE</span>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-5 custom-scrollbar">
          {chatMessages.map(msg => (
            <div key={msg.id} className={`animate-in fade-in slide-in-from-bottom-2 ${msg.isTip ? 'p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl' : ''}`}>
              <div className="flex items-center mb-1">
                 <span className={`text-[9px] font-black uppercase tracking-wider ${msg.user.startsWith('@') ? 'text-cyan-400' : 'text-orange-500'}`}>
                   {msg.user}
                 </span>
                 {msg.isTip && <span className="ml-2 text-[8px] font-black bg-orange-500 text-white px-1.5 py-0.5 rounded animate-bounce">PRIORITY NODE</span>}
              </div>
              <p className={`text-sm ${msg.isTip ? 'text-orange-200 font-bold italic' : 'text-slate-300'} leading-relaxed`}>
                {msg.text}
              </p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="p-6 bg-slate-900/60 border-t border-white/5">
          <form onSubmit={handleSendChat} className="relative">
            <input 
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Send message... (/tip 10 to boost)"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 pr-20 placeholder:text-slate-600"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-orange-500 uppercase tracking-[0.2em] px-4 py-2 hover:bg-orange-500/10 rounded-xl transition-all"
            >
              SEND
            </button>
          </form>
          <div className="mt-4 flex justify-between items-center px-2">
             <button onClick={onNavigateToSupport} className="text-[8px] font-black uppercase tracking-widest text-slate-500 hover:text-orange-500 transition-colors">
               Direct Support Hub
             </button>
             <span className="text-[8px] font-mono text-slate-600 uppercase">SDL Node: 12-44-A</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes reaction-float {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-400px) scale(1.5); opacity: 0; }
        }
        .animate-reaction-float {
          animation: reaction-float 2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
      `}</style>
    </div>
  );
};
