
import React, { useState } from 'react';
import { AIStudio } from './AIStudio';
import { AurexSettings } from '../types';

interface CreatorPageProps {
  aurexSettings: AurexSettings;
  setAurexSettings: (s: any) => void;
}

export const CreatorPage: React.FC<CreatorPageProps> = ({ aurexSettings, setAurexSettings }) => {
  const [activeMode, setActiveMode] = useState<'bio' | 'studio'>('bio');

  return (
    <div className="pt-32 pb-24 bg-slate-950 text-white min-h-screen relative overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {aurexSettings.security.isBreachDetected && (
          <div className="mb-12 p-6 bg-red-600/10 border border-red-600/30 rounded-[32px] flex items-center justify-between animate-in slide-in-from-top-4">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center animate-pulse">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeWidth={2.5} /></svg>
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-widest text-red-500">Security Breach Active</h3>
                <p className="text-xs text-red-600/60 font-black uppercase tracking-widest">Decoy Protocol Engaged // Signal Obfuscated</p>
              </div>
            </div>
            <button 
              onClick={() => setAurexSettings((prev: AurexSettings) => ({ ...prev, security: { ...prev.security, isBreachDetected: false }}))}
              className="px-6 py-2 border border-red-600/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-600 hover:text-white transition-all"
            >
              Reset Protocol
            </button>
          </div>
        )}

        <div className="flex justify-center mb-16">
          <div className="bg-white/5 p-1 rounded-2xl border border-white/10 flex">
            <button 
              onClick={() => setActiveMode('bio')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMode === 'bio' ? 'bg-white text-slate-950 shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              Founder Profile
            </button>
            <button 
              onClick={() => setActiveMode('studio')}
              className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeMode === 'studio' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              Aurex Studio
            </button>
          </div>
        </div>

        {activeMode === 'bio' ? (
          <div className="animate-in fade-in slide-in-from-top-10 duration-700">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/3">
                <div className="relative aspect-square w-full max-w-[400px] mx-auto group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-fuchsia-600 rounded-[60px] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative h-full w-full bg-slate-900 rounded-[60px] border border-white/10 overflow-hidden flex items-center justify-center">
                    <div className="text-center p-12">
                       <span className="text-[120px] font-black text-white/5 select-none leading-none">DAFHA</span>
                       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000')] bg-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3">
                <span className="text-orange-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block">Founding Architect</span>
                <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">Desmond Antonio Franklin <br/>Hurst-Alves</h1>
                
                <div className="space-y-8 text-xl text-slate-400 leading-relaxed font-medium">
                  <p>
                    "I didn't start this movement to be a leader; I started it because I could see the system failing in real-time. We are living on an outdated operating system that was built for pack animals, not global citizens."
                  </p>
                  <p className="text-slate-300">
                    With a background rooted in the intersection of systemic logic and human empathy, Desmond's vision for the Epiphany STSTW is to provide a neutral ground for the human hive mind to thrive without the weight of inherited political structures.
                  </p>
                  
                  <div className="pt-10 flex flex-wrap gap-8">
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Core Philosophy</h4>
                      <p className="text-white">Exponential Unity</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Primary Goal</h4>
                      <p className="text-white">A 1,000 Year Plan</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-2">Focus</h4>
                      <p className="text-white">Consensus Architecture</p>
                    </div>
                  </div>

                  <div className="pt-12 flex space-x-6">
                    <button className="bg-white text-slate-950 px-10 py-5 rounded-2xl text-sm font-black hover:bg-orange-50 transition-all uppercase tracking-widest">
                      Direct Channel
                    </button>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer">
                        <span className="text-sm font-bold">X</span>
                      </div>
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all cursor-pointer">
                        <span className="text-sm font-bold">in</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <section className="mt-32 pt-24 border-t border-white/5">
              <h2 className="text-4xl font-serif font-bold mb-16 text-center">Desmond's <span className="gradient-text italic">Live Notes</span></h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  "The cost of polarization is human life.",
                  "Truth is a data point, not a consensus.",
                  "We must simulate the future to survive the present."
                ].map((note, i) => (
                  <div key={i} className="glass-card p-10 rounded-3xl border-white/5 italic text-slate-400 leading-relaxed hover:text-white transition-colors">
                    "{note}"
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          <AIStudio aurexSettings={aurexSettings} setAurexSettings={setAurexSettings} />
        )}
      </div>
    </div>
  );
};
