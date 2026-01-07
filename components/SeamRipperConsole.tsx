
import React, { useState } from 'react';
import { calculateAsinineCoefficient } from '../services/geminiService';
import { AuditResult } from '../types';

export const SeamRipperConsole: React.FC = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAudit = async () => {
    if (!targetUrl.trim() || isAuditing) return;
    setIsAuditing(true);
    setError(null);
    setResult(null);

    try {
      const data = await calculateAsinineCoefficient(targetUrl);
      setResult({
        ...data,
        url: targetUrl,
        spotsRemaining: 84,
        highScoreUser: '@CryptoViking'
      });
    } catch (err: any) {
      setError(err.message || "Audit interrupted. Connection unstable.");
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <div className="pt-40 pb-24 bg-[#020617] text-slate-300 min-h-screen font-mono">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-16 border-l-2 border-red-600 pl-10 py-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.8em] text-red-600 mb-2">Protocol: SDL-1.0</h2>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Digital Seam Ripper</h1>
          <p className="text-slate-500 mt-4 text-sm font-medium tracking-wide">Enter the URL of a high-friction agreement to calculate the Asinine Coefficient ($\alpha$).</p>
        </div>

        <div className="glass-card rounded-[40px] p-8 md:p-14 border-white/5 bg-black/60 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" strokeWidth={1} /></svg>
          </div>

          <div className="space-y-12">
            <div className="relative group">
              <input 
                value={targetUrl}
                onChange={e => setTargetUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAudit()}
                placeholder="[ PASTE URL HERE ]"
                className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-10 py-7 text-xl text-red-500 focus:outline-none focus:ring-2 focus:ring-red-600/40 transition-all font-mono placeholder:text-slate-800"
              />
              <button 
                onClick={handleAudit}
                disabled={isAuditing || !targetUrl.trim()}
                className="absolute right-3 top-3 bottom-3 bg-red-600 hover:bg-red-700 disabled:opacity-30 text-white px-10 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all"
              >
                {isAuditing ? 'CALCULATING...' : 'CALCULATE COEFFICIENT'}
              </button>
            </div>

            {error && (
              <div className="p-6 bg-red-600/10 border border-red-600/30 rounded-2xl text-red-500 text-xs font-black uppercase tracking-widest animate-in slide-in-from-top-4">
                ERROR: {error}
              </div>
            )}

            {isAuditing && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="flex justify-between items-center text-[10px] text-slate-600 font-black uppercase tracking-widest">
                  <span>Scanning Legal Buffer...</span>
                  <span className="animate-pulse">Active</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 animate-[shimmer-sweep_2s_infinite]" />
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 flex flex-col justify-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Asinine Coefficient ($\alpha$)</span>
                    <div className="text-8xl font-black text-red-600 tracking-tighter leading-none italic">
                      {result.alphaCoefficient.toFixed(2)}
                    </div>
                    <div className={`mt-6 inline-block w-fit px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] ${result.verdict === 'ASININE' ? 'bg-red-600 text-white' : 'bg-orange-500/20 text-orange-500'}`}>
                      VERDICT: {result.verdict}
                    </div>
                  </div>

                  <div className="space-y-8 p-10 bg-slate-900/40 rounded-[3rem] border border-white/5">
                    <div>
                      <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4 flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-3" />
                        The Red Thread
                      </h4>
                      <p className="text-slate-200 text-sm italic leading-relaxed font-serif">"{result.redThread}"</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Brutal Translation</h4>
                      <p className="text-white text-lg font-bold leading-relaxed">{result.translation}</p>
                    </div>
                  </div>
                </div>

                {result.verdict === 'ASININE' && result.alphaCoefficient > 0.9 && (
                  <div className="p-10 bg-emerald-500/10 border border-emerald-500/30 rounded-[3rem] text-center animate-in zoom-in">
                    <h3 className="text-2xl font-black text-emerald-400 uppercase tracking-tighter mb-4">Recruitment Threshold Met.</h3>
                    <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-xl mx-auto italic">
                      Your detected friction score of {result.alphaCoefficient.toFixed(2)} is in the top 100. The SK-V1 allocation protocol is now unlocked for this sector.
                    </p>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all active:scale-95">
                      Secure SK-V1 Allocation Link
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row gap-8">
          <div className="flex-grow p-8 glass-card rounded-[32px] border-white/5">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center text-red-500">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2.5} /></svg>
                </div>
                <div>
                   <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Global Friction Ticker</span>
                   <p className="text-xs font-bold text-white uppercase tracking-widest">Live Audit Feed</p>
                </div>
             </div>
             <div className="space-y-3">
                {[
                   { user: '@CryptoViking', target: 'Adobe Cloud ToS', score: 0.98 },
                   { user: '@NeonGhost', target: 'Ticketmaster Settlement', score: 0.94 },
                   { user: '@Sovereign_X', target: 'HOA Bylaws Sect. 4', score: 0.91 }
                ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-[10px] font-bold text-slate-400">{item.user}</span>
                      <span className="text-[10px] font-mono text-red-500 font-black">$\alpha$ {item.score}</span>
                   </div>
                ))}
             </div>
          </div>
          
          <div className="md:w-1/3 p-8 bg-red-600 rounded-[32px] text-white flex flex-col justify-between shadow-2xl shadow-red-900/40">
             <div>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-60">Allocation Counter</span>
                <h4 className="text-5xl font-black italic tracking-tighter mt-2">84/100</h4>
                <p className="text-[8px] font-bold uppercase tracking-widest opacity-60 mt-2">Units Remaining in Batch 001</p>
             </div>
             <div className="pt-8">
                <p className="text-[10px] italic leading-relaxed opacity-80">"The hunt begins now. Do not submit the US Tax Code. The buffer overflow crashes the server."</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
