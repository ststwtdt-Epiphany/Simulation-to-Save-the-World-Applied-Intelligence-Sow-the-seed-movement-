
import React from 'react';

const phases = [
  {
    tag: "Phase 1: Foundation",
    title: "The Blueprint",
    items: ["Movement launch", "Initial community building", "Target: $75k for prototype dev", "Core team assembly"],
    status: "Active"
  },
  {
    tag: "Phase 2: Prototyping",
    title: "Operating System Beta",
    items: ["Secure voting platform dev", "AI Advisor V1 deployment", "Initial trial town partnerships", "Regional leadership selection"],
    status: "Upcoming"
  },
  {
    tag: "Phase 3: Scaling",
    title: "The 5-Year Build",
    items: ["Estimated goal: $5M - $60M", "Large scale societal pilots", "Educational outreach", "National policy advisory role"],
    status: "Planned"
  }
];

export const Roadmap: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Our Journey to 1,000 Years</h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">This isn't a quick fix. It's a architectural overhaul for the future of humanity.</p>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
        
        <div className="space-y-12 md:space-y-0">
          {phases.map((phase, idx) => (
            <div key={idx} className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2 p-6 md:p-12">
                <div className={`p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl transition-all ${phase.status === 'Active' ? 'ring-2 ring-orange-400' : ''}`}>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 ${phase.status === 'Active' ? 'bg-orange-500 text-white shadow-md orange-glow' : 'bg-slate-100 text-slate-600'}`}>
                    {phase.tag}
                  </span>
                  <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-center text-slate-600 font-medium">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={`absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full hidden md:block border-4 border-white shadow-lg ${phase.status === 'Active' ? 'bg-orange-500' : 'bg-slate-300'}`} />
              <div className="md:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
