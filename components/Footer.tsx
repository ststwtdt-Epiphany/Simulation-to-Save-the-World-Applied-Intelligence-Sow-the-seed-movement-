
import React from 'react';
// Fix: Import ViewState from types.ts where it is defined
import { ViewState } from '../types';

interface FooterProps {
  onViewChange: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div 
              className="flex items-center space-x-2 mb-6 cursor-pointer"
              onClick={() => onViewChange('main')}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 via-fuchsia-600 to-violet-700 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Epiphany <span className="text-cyan-400">STSTW</span>
              </span>
            </div>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed font-medium">
              Founded by <button onClick={() => onViewChange('creator')} className="text-white font-bold hover:text-orange-500 transition-colors underline decoration-white/20">Desmond Antonio Franklin Hurst-Alves</button>. 
              A movement for the realists tired of cynicism and the idealists who want a plan.
            </p>
            <div className="flex space-x-5">
              <div className="w-11 h-11 bg-white/5 rounded-full flex items-center justify-center hover:bg-orange-500 transition-all cursor-pointer group shadow-sm border border-white/10">
                <span className="text-slate-400 group-hover:text-white font-bold italic">X</span>
              </div>
              <div className="w-11 h-11 bg-white/5 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-all cursor-pointer group shadow-sm border border-white/10">
                <span className="text-slate-400 group-hover:text-white font-bold">in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">The Blueprint</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><button onClick={() => onViewChange('info')} className="hover:text-orange-600 transition-colors text-left">The Model Specs</button></li>
              <li><button onClick={() => onViewChange('main')} className="hover:text-orange-600 transition-colors text-left">Vision Overview</button></li>
              <li><button onClick={() => onViewChange('labs')} className="hover:text-orange-600 transition-colors text-left">AI Simulation Labs</button></li>
              <li><button onClick={() => onViewChange('hive')} className="hover:text-orange-600 transition-colors text-left">Hive Mind Sync</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Join Effort</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-cyan-400 transition-colors font-bold uppercase tracking-widest">GoFundMe</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Volunteer</a></li>
              <li><button onClick={() => onViewChange('creator')} className="hover:text-cyan-400 transition-colors text-left">Meet Desmond</button></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Press Kit</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 uppercase tracking-widest font-bold">
          <p>© 2024 Epiphany STSTW. Simulation To Save The World.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <button onClick={() => onViewChange('landing')} className="hover:text-white transition-colors">Return to Hub</button>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
