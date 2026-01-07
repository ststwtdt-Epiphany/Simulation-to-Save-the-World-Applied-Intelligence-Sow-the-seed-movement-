
import React from 'react';

export const InfoPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center lg:text-left">
          <span className="text-cyan-400 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Knowledge Base // V.1.0</span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-[0.95] tracking-tighter">Information <br/><span className="gradient-text italic">Architecture</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed font-medium">
            This is the technical substructure of the Epiphany STSTW movement. We don't just dream of a better world; we blueprint the logic that makes it inevitable.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-16">
            <section className="glass-card p-10 md:p-14 rounded-[40px] border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-cyan-500/20 transition-all" />
              <h2 className="text-4xl font-black mb-8 uppercase tracking-tight flex items-center">
                <span className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center mr-6 text-cyan-400 font-mono text-lg">01</span>
                Triumvirate Leadership
              </h2>
              <div className="space-y-8">
                <p className="text-slate-300 text-lg leading-relaxed font-medium">
                  The core failure of current governance is the "Singular Alpha" model. It invites narcissism and polarization. STSTW implements a Triumvirate:
                </p>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="p-6 bg-slate-900/50 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-all">
                    <h4 className="text-orange-500 font-black text-[10px] uppercase tracking-widest mb-3">Node A</h4>
                    <p className="text-white font-bold text-sm">Elected by Men</p>
                  </div>
                  <div className="p-6 bg-slate-900/50 rounded-3xl border border-white/5 hover:border-fuchsia-500/30 transition-all">
                    <h4 className="text-fuchsia-500 font-black text-[10px] uppercase tracking-widest mb-3">Node B</h4>
                    <p className="text-white font-bold text-sm">Elected by Women</p>
                  </div>
                  <div className="p-6 bg-slate-900/50 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all">
                    <h4 className="text-cyan-500 font-black text-[10px] uppercase tracking-widest mb-3">Node C</h4>
                    <p className="text-white font-bold text-sm">Chosen by Wisdom</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm italic">"Consensus is the firewall of the future."</p>
              </div>
            </section>

            <section className="glass-card p-10 md:p-14 rounded-[40px] border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-fuchsia-500/20 transition-all" />
              <h2 className="text-4xl font-black mb-8 uppercase tracking-tight flex items-center">
                <span className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center mr-6 text-fuchsia-400 font-mono text-lg">02</span>
                The Fact Mirror Protocol
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed font-medium mb-10">
                AI does not rule. It advises. Every piece of legislation is put through the "Mirror" before a public vote, outputting a raw, unbiased risk-benefit analysis.
              </p>
              <div className="grid gap-6">
                {[
                  "Immutable Data Integrity via Blockchain Ledger",
                  "Source-Transparent Training Data Sets",
                  "Zero-Ideology Filter Requirement"
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 p-5 bg-white/5 rounded-2xl">
                    <div className="w-2 h-2 bg-fuchsia-500 rounded-full shadow-[0_0_10px_fuchsia]" />
                    <span className="text-sm font-bold uppercase tracking-widest text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="p-10 bg-gradient-to-br from-slate-900 to-slate-950 rounded-[40px] border border-white/10 sticky top-32">
              <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-orange-500">System Glossary</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-white font-bold mb-2">STSTW</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Simulation To Save The World. The umbrella initiative for planetary testing.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Hive Mind</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">The collaborative state reached when individuals act on shared, verified data.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Triumvirate</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">A leadership structure composed of three nodes requiring 2/3 consensus.</p>
                </div>
              </div>
              <button className="w-full mt-10 py-4 bg-white text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-50 transition-all">
                Download PDF Manifest
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
