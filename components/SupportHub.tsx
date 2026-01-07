
import React, { useState } from 'react';
import { FundingTier } from '../types';

const FUNDING_TIERS: FundingTier[] = [
  {
    name: "Architect's Ally",
    amount: 10,
    description: "Monthly maintenance contribution for the digital infrastructure.",
    perks: ["Digital Badge", "Ledger Entry", "Weekly Progress Logs"],
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    name: "System Catalyst",
    amount: 50,
    description: "Accelerated funding for the AI Advisor prototype.",
    perks: ["Beta Access to Labs", "Priority Suture Support", "Voting Weight +1"],
    gradient: "from-fuchsia-500 to-purple-500"
  },
  {
    name: "Founder Node",
    amount: 500,
    description: "Direct backing of the 1,000-year planetary plan.",
    perks: ["Direct Line to Architect", "Founder NFT", "Governance Council Seat"],
    gradient: "from-orange-500 to-red-500"
  }
];

export const SupportHub: React.FC = () => {
  const [customAmount, setCustomAmount] = useState('');

  return (
    <div className="pt-40 pb-24 bg-[#020617] text-slate-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-orange-500 font-black tracking-[0.5em] uppercase text-[10px] mb-4 block">Planetary Resource Allocation</span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 italic tracking-tighter">Fuel the <span className="gradient-text">Movement.</span></h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
            We are building a new world, but we are using the tools of the old one to get there. Your contribution is the electricity in our simulation.
          </p>
        </div>

        {/* Global Progress */}
        <div className="glass-card p-12 rounded-[50px] border-white/5 mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5" />
          <div className="absolute top-0 left-0 w-[12%] h-1 bg-orange-500 shadow-[0_0_20px_#f97316]" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Prototype Milestone 1</h3>
              <p className="text-slate-500 font-mono text-sm mt-2">$8,420 / $75,000 Reached</p>
            </div>
            <button className="bg-white text-black px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-orange-500 hover:text-white transition-all">
              Track Spend Data
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {/* QR Scan Center */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-card p-10 rounded-[40px] border-orange-500/20 bg-orange-500/5 group hover:bg-orange-500/10 transition-all text-center">
              <h4 className="text-xs font-black text-orange-500 uppercase tracking-[0.3em] mb-8">Direct Tip Jar</h4>
              <div className="bg-white p-4 rounded-3xl inline-block shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=400" 
                  alt="PayPal QR" 
                  className="w-48 h-48 object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all"
                />
              </div>
              <p className="mt-8 text-white font-black uppercase text-xl italic tracking-tighter">Scan. Pay. Go.</p>
              <p className="text-slate-500 text-xs mt-2">Instant Node Support via PayPal</p>
            </div>

            <div className="glass-card p-10 rounded-[40px] border-fuchsia-500/20 bg-fuchsia-500/5 group hover:bg-fuchsia-500/10 transition-all text-center">
              <h4 className="text-xs font-black text-fuchsia-500 uppercase tracking-[0.3em] mb-8">GoFundMe Hub</h4>
              <div className="bg-white p-4 rounded-3xl inline-block shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400" 
                  alt="GoFundMe QR" 
                  className="w-48 h-48 object-cover opacity-80"
                />
              </div>
              <p className="mt-8 text-white font-black uppercase text-xl italic tracking-tighter">Seed the World.</p>
              <p className="text-slate-500 text-xs mt-2">Official Movement Campaign</p>
            </div>
          </div>

          {/* Tiers & Custom */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {FUNDING_TIERS.map((tier, idx) => (
                <div key={idx} className="glass-card p-10 rounded-[40px] border-white/5 bg-white/5 hover:bg-white/10 transition-all flex flex-col justify-between h-full group">
                  <div>
                    <span className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${tier.gradient} text-white text-[8px] font-black uppercase tracking-widest mb-6`}>
                      Tier {idx + 1}
                    </span>
                    <h4 className="text-3xl font-black text-white uppercase italic tracking-tighter group-hover:text-orange-500 transition-colors">{tier.name}</h4>
                    <p className="text-slate-400 mt-4 text-sm font-medium">{tier.description}</p>
                    <ul className="mt-8 space-y-3">
                      {tier.perks.map((perk, pidx) => (
                        <li key={pidx} className="flex items-center text-xs text-slate-500 uppercase tracking-widest font-black">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 shadow-[0_0_10px_#f97316]" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-10">
                    <span className="text-4xl font-black text-white italic">${tier.amount}</span>
                    <button className="w-full mt-6 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                      Select Tier
                    </button>
                  </div>
                </div>
              ))}

              {/* Custom Tier */}
              <div className="glass-card p-10 rounded-[40px] border-cyan-500/20 bg-cyan-500/5 flex flex-col justify-between h-full group">
                <div>
                   <h4 className="text-3xl font-black text-cyan-400 uppercase italic tracking-tighter">Any Value</h4>
                   <p className="text-slate-400 mt-4 text-sm font-medium">Contribute exactly what you feel the vision is worth. Every byte counts.</p>
                </div>
                <div className="mt-10">
                   <div className="relative mb-6">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-500 font-black text-2xl">$</span>
                      <input 
                        value={customAmount}
                        onChange={e => setCustomAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 pl-14 pr-8 text-2xl text-white outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-black italic"
                      />
                   </div>
                   <button className="w-full py-4 bg-cyan-500 text-black rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
                      Send Contribution
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Call to Action */}
        <div className="relative rounded-[60px] overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
            alt="Futuristic Globe"
            className="w-full h-[400px] object-cover opacity-40 group-hover:scale-110 transition-transform duration-[4s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic text-white mb-6">"Capital is Energy. <br/>Use it to Architect."</h2>
            <p className="text-orange-500 font-black tracking-[0.5em] uppercase text-xs">The STSTW Foundation</p>
          </div>
        </div>
      </div>
    </div>
  );
};
