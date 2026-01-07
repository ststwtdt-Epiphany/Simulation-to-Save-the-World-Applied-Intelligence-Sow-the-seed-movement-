
import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';

interface HeaderProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; view: ViewState }[] = [
    { label: 'Vision', view: 'main' },
    { label: 'Portal', view: 'info' },
    { label: 'Ripper', view: 'allocation' },
    { label: 'Support', view: 'support' },
    { label: 'Allocation', view: 'store' },
    { label: 'Labs', view: 'labs' },
    { label: 'Join Live', view: 'hive' },
    { label: 'Architect', view: 'creator' },
  ];

  return (
    <header className={`fixed w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-slate-950/95 backdrop-blur-2xl shadow-2xl py-3' : 'bg-transparent py-6 md:py-10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div 
          className="flex items-center space-x-3 cursor-pointer group shrink-0"
          onClick={() => onViewChange('main')}
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 via-fuchsia-600 to-violet-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all">
            <span className="text-white font-black text-lg md:text-xl">E</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-black tracking-tighter text-white leading-none">
              Epiphany <span className="text-cyan-400">STSTW</span>
            </span>
            <span className="text-[6px] md:text-[7px] font-black uppercase tracking-[0.4em] text-slate-500 mt-1">Simulation To Save The World</span>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-1">
          <button 
            onClick={() => onViewChange('landing')} 
            className="text-slate-400 hover:text-white transition-all px-4 py-2 flex items-center group"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mr-3 group-hover:bg-cyan-500 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest">Hub</span>
          </button>

          <div className="h-4 w-px bg-white/10 mx-4" />

          {navItems.map((item) => (
            <button 
              key={item.view}
              onClick={() => onViewChange(item.view)} 
              className={`px-3 xl:px-4 py-2 rounded-full text-[8px] xl:text-[9px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${currentView === item.view ? 'text-orange-500 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.2)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-3">
          <div className="lg:hidden">
            <select 
              value={currentView}
              onChange={(e) => onViewChange(e.target.value as ViewState)}
              className="bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase px-3 py-2 rounded-xl outline-none"
            >
              <option value="landing">Hub</option>
              {navItems.map(item => <option key={item.view} value={item.view}>{item.label}</option>)}
            </select>
          </div>
          <button 
            onClick={() => onViewChange('support')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 md:py-3 rounded-xl text-[9px] md:text-[10px] font-black transition-all shadow-xl tracking-[0.2em] uppercase whitespace-nowrap"
          >
            Sustain
          </button>
        </div>
      </div>
    </header>
  );
};
