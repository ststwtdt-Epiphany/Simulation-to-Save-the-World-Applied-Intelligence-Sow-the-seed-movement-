
import React, { useState, useRef, useEffect } from 'react';
import { querySuture } from '../services/geminiService';

export const SutureTerminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'suture'; text: string }[]>([
    { role: 'suture', text: 'SYSTEM INITIALIZED. SUTURE SCOUT ACTIVE. TARGET ACQUIRED: NEW RECRUIT. STATE YOUR INTENT.' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const response = await querySuture(userText, messages.map(m => ({
        role: m.role === 'suture' ? 'assistant' : 'user',
        parts: [{ text: m.text }]
      })));
      setMessages(prev => [...prev, { role: 'suture', text: response }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'suture', text: `ERROR: SIGNAL DEGRADED. ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-black text-cyan-500 min-h-screen font-mono relative overflow-hidden">
      {/* Glitch Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200')] bg-cover" />
      <div className="scanline" />

      <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col h-[80vh]">
        <div className="mb-8 flex items-center justify-between border-b border-cyan-900 pb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded flex items-center justify-center animate-pulse">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" strokeWidth={2}/></svg>
            </div>
            <div>
              <h2 className="text-[10px] font-black tracking-[0.5em] uppercase">Tactical Node: SUTURE</h2>
              <p className="text-[8px] opacity-60">STATUS: RECONNAISSANCE_ACTIVE</p>
            </div>
          </div>
          <div className="text-[8px] font-black text-right opacity-40">
            LATENCY: 42ms<br/>RELAY: AUREX_OS
          </div>
        </div>

        <div className="flex-grow overflow-y-auto mb-6 space-y-4 custom-scrollbar pr-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-xl text-xs leading-relaxed border ${
                m.role === 'user' 
                  ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-200' 
                  : 'bg-black border-cyan-900 text-cyan-500 font-bold'
              }`}>
                {m.role === 'suture' && (
                  <span className="text-[8px] block mb-2 opacity-50 font-black tracking-widest">[SUTURE_TRANS]</span>
                )}
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-cyan-500/10 border border-cyan-500/20 p-2 rounded animate-pulse text-[10px]">
                CALIBRATING SIGNAL...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="relative">
          <textarea 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="[ TRANSMIT INTEL ]"
            className="w-full bg-black border border-cyan-900 rounded-2xl px-6 py-5 text-cyan-400 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none min-h-[100px]"
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="absolute right-4 bottom-4 bg-cyan-600 hover:bg-cyan-500 text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all disabled:opacity-30"
          >
            EXECUTE
          </button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { label: 'Scout ToS', icon: '🔍' },
            { label: 'Request Kit', icon: '⚙️' },
            { label: 'Ping Aurex', icon: '📡' }
          ].map(btn => (
            <button 
              key={btn.label}
              onClick={() => setInput(`Requesting: ${btn.label}`)}
              className="py-2 px-4 border border-cyan-900 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-cyan-500/10 transition-all text-center"
            >
              {btn.icon} {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
