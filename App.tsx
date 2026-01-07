
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VisionPillars } from './components/VisionPillars';
import { AIAdvisorDemo } from './components/AIAdvisorDemo';
import { Roadmap } from './components/Roadmap';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { SurveySection } from './components/SurveySection';
import { FeedbackSection } from './components/FeedbackSection';
import { AILabsDashboard } from './components/AILabsDashboard';
import { JoinLiveHub } from './components/JoinLiveHub';
import { VisualManifesto } from './components/VisualManifesto';
import { EntryPage } from './components/EntryPage';
import { InfoPage } from './components/InfoPage';
import { CreatorPage } from './components/CreatorPage';
import { AllocationGate } from './components/AllocationGate';
import { SeamRipperConsole } from './components/SeamRipperConsole';
import { SutureTerminal } from './components/SutureTerminal';
import { AllocationStore } from './components/AllocationStore';
import { SupportHub } from './components/SupportHub';
import { AurexSettings, ViewState } from './types';

const VIEW_ORDER: ViewState[] = ['landing', 'main', 'info', 'labs', 'hive', 'allocation', 'suture', 'store', 'support', 'creator'];

const TRANSITION_IMAGES = [
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
];

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [allocationStep, setAllocationStep] = useState<'gate' | 'console'>('gate');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shutterState, setShutterState] = useState<'idle' | 'closing' | 'opening'>('idle');
  const [transitionImg, setTransitionImg] = useState(TRANSITION_IMAGES[0]);

  // Global Aurex Settings
  const [aurexSettings, setAurexSettings] = useState<AurexSettings>({
    ollama: {
      enabled: false,
      endpoint: 'http://localhost:11434',
      activeModel: 'llama3'
    },
    security: {
      decoyProtocol: true,
      isBreachDetected: false,
      ghostMode: false
    }
  });

  const triggerBreach = useCallback(() => {
    if (aurexSettings.security.isBreachDetected) return;

    // Simulate geolocation capture for the report
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(`[SECURITY ALERT] Breach detected. Report generated for Architect at location: ${pos.coords.latitude}, ${pos.coords.longitude}`);
    });

    setAurexSettings(prev => ({
      ...prev,
      security: { ...prev.security, isBreachDetected: true }
    }));
  }, [aurexSettings.security.isBreachDetected]);

  const handleViewChange = useCallback((newView: ViewState) => {
    if (newView === view && view !== 'landing') return; 

    setTransitionImg(TRANSITION_IMAGES[Math.floor(Math.random() * TRANSITION_IMAGES.length)]);
    setIsTransitioning(true);
    setShutterState('closing');
    
    const closeTimer = setTimeout(() => {
      setView(newView);
      window.scrollTo(0, 0);
      setShutterState('opening');
    }, 900);

    const finishTimer = setTimeout(() => {
      setShutterState('idle');
      setIsTransitioning(false);
    }, 1800);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(finishTimer);
    };
  }, [view]);

  const navigateOrder = useCallback((direction: 'next' | 'prev') => {
    const currentIndex = VIEW_ORDER.indexOf(view);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % VIEW_ORDER.length;
    } else {
      nextIndex = (currentIndex - 1 + VIEW_ORDER.length) % VIEW_ORDER.length;
    }
    handleViewChange(VIEW_ORDER[nextIndex]);
  }, [view, handleViewChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigateOrder('next');
      if (e.key === 'ArrowLeft') navigateOrder('prev');
      if (e.ctrlKey && e.altKey && e.key === 'b') triggerBreach();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateOrder, triggerBreach]);

  const renderContent = () => {
    const isHacked = aurexSettings.security.isBreachDetected;
    
    switch (view) {
      case 'info': return <InfoPage />;
      case 'creator': return <CreatorPage aurexSettings={aurexSettings} setAurexSettings={setAurexSettings} />;
      case 'suture': return <SutureTerminal />;
      case 'support': return <SupportHub />;
      case 'store': return <AllocationStore onInitiateAudit={() => { setAllocationStep('console'); handleViewChange('allocation'); }} />;
      case 'allocation': 
        return allocationStep === 'gate' 
          ? <AllocationGate onEnterAudit={() => setAllocationStep('console')} /> 
          : <SeamRipperConsole />;
      case 'labs': return (
        <div className="pt-24 min-h-screen bg-slate-950">
          <AILabsDashboard />
          <CTASection />
        </div>
      );
      case 'hive': return (
        <JoinLiveHub onNavigateToSupport={() => handleViewChange('support')} />
      );
      case 'main':
        return (
          <div className={`animate-in fade-in duration-1000 ${isHacked ? 'grayscale' : ''}`}>
            <Hero 
              onAllocationClick={() => { setAllocationStep('gate'); handleViewChange('allocation'); }} 
              onSutureClick={() => handleViewChange('suture')}
            />
            <section id="vision" className="py-24 bg-white text-slate-950 rounded-t-[60px] relative z-10 -mt-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <span className="text-orange-600 font-black tracking-widest uppercase text-xs mb-4 block">The Core Framework</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 italic">A New Operating System</h2>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                    "It doesn't have to be this way." We're not protesting the past; we're architecting the future of human coordination.
                  </p>
                </div>
                <VisionPillars />
              </div>
            </section>
            <VisualManifesto />
            <section id="advisor" className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <span className="px-4 py-1 bg-violet-100 text-violet-700 rounded-full text-[10px] font-black tracking-widest uppercase">System Core</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mt-6 mb-6">AI Policy Advisor</h2>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                    Pure objectivity. Try the prototype that removes bias from governance through factual simulation.
                  </p>
                </div>
                <AIAdvisorDemo />
              </div>
            </section>
            <section id="surveys" className="py-24 bg-white border-t border-slate-100">
              <SurveySection />
            </section>
            <section id="feedback" className="py-24 bg-slate-900 text-white overflow-hidden rounded-t-[60px]">
              <FeedbackSection />
            </section>
            <section id="roadmap" className="py-24 bg-white text-slate-950">
              <Roadmap />
            </section>
            <CTASection />
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-950 relative overflow-x-hidden ${aurexSettings.security.isBreachDetected ? 'opacity-90' : ''}`}>
      {/* Breach Overlay */}
      {aurexSettings.security.isBreachDetected && (
        <div className="fixed inset-0 z-[5000] pointer-events-none border-[12px] border-red-600/30 animate-pulse" />
      )}

      {/* Cinematic Digital Shutter Overlay */}
      <div 
        className={`fixed inset-0 z-[2000] pointer-events-none transition-opacity duration-300 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
      >
        <div 
          className={`absolute inset-0 bg-slate-950 flex flex-col items-center justify-center overflow-hidden
            ${shutterState === 'closing' ? 'animate-shutter-in' : ''}
            ${shutterState === 'opening' ? 'animate-shutter-out' : ''}
          `}
        >
          <div 
            className="absolute inset-0 opacity-40 bg-cover bg-center animate-drift" 
            style={{ 
              backgroundImage: `url(${transitionImg})`,
              filter: 'grayscale(0.5) contrast(1.2)'
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 opacity-80" />
          <div className="scanline" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-8xl md:text-[220px] font-black text-white/5 uppercase tracking-[0.5em] select-none leading-none animate-pulse">
                STSTW
            </h2>
            <div className="mt-[-40px] md:mt-[-80px] text-center">
                <span className="text-[12px] md:text-[14px] font-black uppercase tracking-[1.5em] text-cyan-400 shimmer-text block mb-4">
                    Architecting Reality
                </span>
                <div className="w-64 h-[2px] bg-white/10 mx-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-cyan-500 animate-[shimmer-sweep_2s_infinite]" />
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Layer */}
      <div className={`flex flex-col flex-grow ${isTransitioning ? 'pointer-events-none' : ''}`}>
        {view === 'landing' ? (
          <EntryPage onEnter={() => handleViewChange('main')} />
        ) : (
          <div className={`flex flex-col flex-grow animate-content-slide transition-all duration-1000 ${isTransitioning ? 'blur-md' : 'blur-0'}`}>
            <Header currentView={view} onViewChange={handleViewChange} />
            <main className="flex-grow pt-0">
              {renderContent()}
            </main>
            <Footer onViewChange={handleViewChange} />
            
            {/* Edge Triggers for In-App Navigation */}
            <button 
              onClick={() => navigateOrder('prev')}
              className="fixed left-0 top-0 bottom-0 w-16 md:w-32 z-[90] flex items-center justify-center group opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-r from-slate-950/40 to-transparent"
              aria-label="Previous Sector"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:scale-125 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </button>
            <button 
              onClick={() => navigateOrder('next')}
              className="fixed right-0 top-0 bottom-0 w-16 md:w-32 z-[90] flex items-center justify-center group opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-l from-slate-950/40 to-transparent"
              aria-label="Next Sector"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:scale-125 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
