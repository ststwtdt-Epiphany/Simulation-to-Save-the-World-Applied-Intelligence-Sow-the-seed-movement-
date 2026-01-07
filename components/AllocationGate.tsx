
import React from 'react';

interface AllocationGateProps {
  onEnterAudit: () => void;
}

export const AllocationGate: React.FC<AllocationGateProps> = ({ onEnterAudit }) => {
  return (
    <section className="pt-32 pb-24 bg-slate-950 text-white min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="animate-in fade-in slide-in-from-left-10 duration-1000">
            <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 mb-8">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase">Hardware Deployment // Batch 001</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-[0.9] tracking-tighter">
              We Are <br/><span className="gradient-text italic">Not Selling</span> This.
            </h1>

            <div className="space-y-8 text-xl text-slate-400 leading-relaxed font-medium">
              <p>
                The System relies on friction. It relies on you being too tired to read the contract, too busy to cut the tag, too passive to question the seam.
              </p>
              <p className="text-slate-200">
                We are building the counter-measure. Introducing the <span className="text-red-500 font-bold">SK-V1</span> (Standard Kit, Version 1).
              </p>
              
              <ul className="space-y-4 pt-4">
                {[
                  "CNC-Machined 6061 Aluminum Shell",
                  "Surgical Carbon Steel 'Unseaming' Blade",
                  "NFC-Linked to the Architect’s Ledger"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-4">
                    <div className="w-5 h-5 bg-red-500/20 border border-red-500/40 rounded flex items-center justify-center text-red-500 text-[10px] font-bold">
                      {i + 1}
                    </div>
                    <span className="text-sm font-black uppercase tracking-widest text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="p-8 bg-white/5 border border-white/10 rounded-[32px] mt-12">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 mb-4">Allocation Status</h3>
                <div className="flex items-center space-x-8">
                  <div>
                    <span className="text-3xl font-black text-white">100</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-600 block">Units Produced</span>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <span className="text-3xl font-black text-red-500">84</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-slate-600 block">Spots Remaining</span>
                  </div>
                </div>
              </div>

              <div className="pt-10">
                <button 
                  onClick={onEnterAudit}
                  className="bg-red-600 hover:bg-red-700 text-white px-10 py-6 rounded-2xl text-lg font-black transition-all shadow-2xl shadow-red-900/40 tracking-widest uppercase active:scale-95"
                >
                  Execute Audit Protocol
                </button>
              </div>
            </div>
          </div>

          <div className="relative animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="relative w-full aspect-[4/5] bg-slate-900 rounded-[60px] border border-white/5 overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200')] bg-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                <div className="text-[140px] font-black text-white/5 leading-none select-none italic group-hover:text-red-500/10 transition-colors">SKV1</div>
                <div className="mt-[-60px] p-8 glass-card rounded-[40px] border-red-500/20 bg-black/40 backdrop-blur-3xl relative">
                  <div className="w-12 h-12 bg-red-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-red-500/40 animate-pulse">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758L5 19m0-14l4.121 4.121" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <p className="text-[10px] font-black tracking-[0.5em] text-red-500 uppercase mb-2">Initialize Allocation</p>
                  <p className="text-white text-lg font-serif italic">"Do not buy your way in. <br/>Work your way in."</p>
                </div>
              </div>
              
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">
                  <span>Current High Score: 98/100</span>
                  <span>@CryptoViking</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[16%]" />
                </div>
                <p className="text-[7px] font-bold text-slate-600 mt-2 uppercase">16 Units Allocated to Technicians</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
