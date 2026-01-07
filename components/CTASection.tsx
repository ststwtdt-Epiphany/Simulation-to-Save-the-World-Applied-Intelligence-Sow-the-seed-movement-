
import React from 'react';

export const CTASection: React.FC = () => {
  return (
    <section id="join" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] border-2 border-orange-500 rounded-full animate-pulse blur-sm" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] border border-cyan-500 rounded-full opacity-50" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-fuchsia-500 rounded-full blur-[100px] opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Ready to Build the New World?</h2>
        <p className="text-xl text-slate-400 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
          We are not just protesting the old world. We are <span className="text-orange-400 font-bold">funding the new one.</span> 
          Become a founding supporter and help us reach our $75,000 prototype goal.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-20">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="w-full md:w-96 bg-white/10 border border-white/20 rounded-full px-8 py-5 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg backdrop-blur-md"
          />
          <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-orange-900/40 transition-all orange-glow">
            Join the Movement
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group hover:border-cyan-500/50">
            <h4 className="font-bold mb-3 group-hover:text-cyan-400 text-xl">1. Follow Us</h4>
            <p className="text-sm text-slate-400 font-medium">Join our digital headquarters for the latest blueprints.</p>
          </div>
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group hover:border-orange-500/50">
            <h4 className="font-bold mb-3 group-hover:text-orange-400 text-xl">2. Share Idea</h4>
            <p className="text-sm text-slate-400 font-medium">Spread the alternative. Change begins with imagination.</p>
          </div>
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group hover:border-fuchsia-500/50">
            <h4 className="font-bold mb-3 group-hover:text-fuchsia-400 text-xl">3. Fund Vision</h4>
            <p className="text-sm text-slate-400 font-medium">Help turn these pages into a working prototype.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
