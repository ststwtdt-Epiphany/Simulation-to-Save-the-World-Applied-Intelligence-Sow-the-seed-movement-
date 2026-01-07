
import React from 'react';
import { AllocationProduct } from '../types';

interface AllocationStoreProps {
  onInitiateAudit: () => void;
}

const PRODUCTS: AllocationProduct[] = [
  {
    id: 'seed-01',
    name: 'The Sovereign Seed',
    price: 40,
    tier: 'OPERATIVE',
    requirements: 'NONE',
    description: 'Matte-black NFC challenge coin. One-tap access to Digital Seam Ripper. Funded entry for Batch 001 Technicians.'
  },
  {
    id: 'skv1-std',
    name: 'SK-V1 Standard Kit',
    price: 100,
    tier: 'OPERATIVE',
    requirements: '3+ VALID AUDITS (Alpha > 0.8)',
    description: 'CNC-Machined 6061 Aluminum. Surgical Carbon Steel Blade. Batch 001 allocation only for qualified Technicians.'
  },
  {
    id: 'skv1-patron',
    name: 'SK-V1 Patron Tier',
    price: 250,
    tier: 'PATRON',
    requirements: '1+ VALID AUDIT',
    description: 'Direct R&D contribution. Accelerated allocation path. Includes digital acknowledgement in the Architect’s Ledger.'
  },
  {
    id: 'skv1-sovereign',
    name: 'Sovereign Founders Kit',
    price: 1000,
    tier: 'SOVEREIGN',
    requirements: 'DIRECT HANDSHAKE & 1 AUDIT',
    description: 'Gold/Black Limited Edition SK-V1. Permanent Founder Node status. Direct comms channel to the Architect.'
  }
];

export const AllocationStore: React.FC<AllocationStoreProps> = ({ onInitiateAudit }) => {
  return (
    <div className="pt-32 pb-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-red-500 font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Ledger of Allocation</span>
            <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-tighter italic">Batch 001 <span className="gradient-text">Hardware</span></h1>
            <p className="text-slate-400 mt-6 text-lg font-medium">We do not sell products. We allocate tools to Technicians. Your purchase is a contribution to the global friction reduction protocol.</p>
          </div>
          <div className="p-6 bg-red-600/10 border border-red-600/20 rounded-[32px] text-red-500 font-black text-[10px] uppercase tracking-widest text-center">
            Protocol Rule: No Audit = No Tool.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {PRODUCTS.map(product => (
            <div key={product.id} className="glass-card rounded-[40px] p-10 border-white/5 bg-white/5 hover:bg-white/10 transition-all group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black italic tracking-tighter select-none">
                {product.tier.slice(0, 1)}
              </div>
              
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-3xl font-black text-white group-hover:text-red-500 transition-colors uppercase">{product.name}</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">ID: {product.id}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-white">${product.price}</span>
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Allocation Contribution</p>
                </div>
              </div>

              <div className="space-y-6 mb-12">
                <div className="p-4 bg-black/40 rounded-2xl border border-white/5">
                  <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Requirement Protocol</h4>
                  <p className="text-xs font-black text-red-500 tracking-wider">{product.requirements}</p>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              <button 
                onClick={onInitiateAudit}
                className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl active:scale-95"
              >
                {product.tier === 'SOVEREIGN' ? 'Request Handshake' : 'Execute Audit to Unlock'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-white/5 border border-white/10 rounded-[60px] text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
          <h2 className="text-3xl font-serif font-bold mb-6 italic">The Handshake Protocol</h2>
          <p className="text-slate-400 text-lg mb-10 font-medium">For $1,000+ patrons or strategic partners, a direct communication node with the Architect is established. This is a manual vetting process for our Sovereign Founders.</p>
          <button onClick={onInitiateAudit} className="px-10 py-5 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">
            Initiate Sovereign Connection
          </button>
        </div>
      </div>
    </div>
  );
};
