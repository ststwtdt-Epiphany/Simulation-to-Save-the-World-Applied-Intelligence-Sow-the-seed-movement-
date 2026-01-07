
import React from 'react';

interface HeroProps {
  onAllocationClick?: () => void;
  onSutureClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAllocationClick, onSutureClick }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Simulation Orbs and Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-fuchsia-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-3/5 text-left">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
              <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">System Initialized: STSTW</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8 leading-[1.1]">
              Imagine a <br />
              <span className="gradient-text italic">Functional</span> World.
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mb-12 leading-relaxed font-medium">
              We are moving past the age of pack animals and political deadlock. 
              The <span className="text-orange-400 font-bold">Epiphany STSTW</span> model is the upgrade for the human hive mind.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={onAllocationClick}
                className="w-full sm:w-auto bg-red-600 text-white px-10 py-5 rounded-2xl text-lg font-black hover:bg-red-700 transition-all shadow-2xl shadow-red-500/20 tracking-wide uppercase border-2 border-red-500/30"
              >
                Execute Audit
              </button>
              <button 
                onClick={onSutureClick}
                className="w-full sm:w-auto bg-cyan-600/10 border border-cyan-500/40 text-cyan-400 px-10 py-5 rounded-2xl text-lg font-black hover:bg-cyan-500/20 transition-all backdrop-blur-md uppercase tracking-wide flex items-center justify-center"
              >
                <span className="mr-3 text-xs animate-pulse">📡</span>
                Consult Suture
              </button>
            </div>
          </div>

          <div className="lg:w-2/5 relative">
            <div className="relative w-full aspect-[3/4] rounded-[40px] overflow-hidden ststw-glow group shadow-2xl border border-white/10 bg-slate-900">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 to-slate-950 flex items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 opacity-40 mix-blend-overlay animate-float">
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-50" />
                </div>
                <div className="relative text-center z-10">
                  <div className="text-[120px] font-black text-white/10 leading-none select-none">STSTW</div>
                  <div className="mt-[-60px] p-6 glass-card rounded-3xl border border-cyan-500/30">
                    <p className="text-xs font-bold tracking-[0.4em] uppercase text-cyan-400 mb-2">Simulation To Save The World</p>
                    <div className="h-0.5 w-12 bg-orange-500 mx-auto" />
                  </div>
                </div>
              </div>
              
              {/* Refined Stat Tags: Fixed Overlap */}
              <div className="absolute bottom-10 left-8 right-8 z-20">
                <div className="flex items-center gap-4">
                  <div className="flex-1 glass-card px-6 py-4 rounded-[2rem] border-orange-500/40 animate-in fade-in slide-in-from-bottom-4 duration-700 backdrop-blur-xl">
                    <p className="text-3xl font-black text-orange-500 leading-none italic">5 YRS</p>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Startup Phase</p>
                  </div>
                  <div className="flex-1 glass-card px-6 py-4 rounded-[2rem] border-cyan-500/40 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 backdrop-blur-xl">
                    <p className="text-3xl font-black text-cyan-400 leading-none italic">1000+</p>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Year Vision</p>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-40 p-8 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
