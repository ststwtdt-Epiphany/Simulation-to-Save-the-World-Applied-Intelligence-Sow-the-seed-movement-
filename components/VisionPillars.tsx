
import React from 'react';

const pillars = [
  {
    title: "Balanced Leadership",
    tagline: "The Triumvirate",
    description: "Instead of one powerful figure, a leadership team of three: one elected by men, one by women, and a non-political expert chosen for wisdom. Forced collaboration from the top.",
    color: "from-orange-500 to-orange-600",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Reinforced Democracy",
    tagline: "Direct Engagement",
    description: "Your voice is heard on big issues. On monumental decisions—like war or healthcare—every citizen gets a secure, informed vote. Not just representation, but direct action.",
    color: "from-cyan-500 to-cyan-600",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Independent AI Advisor",
    tagline: "The Fact Mirror",
    description: "No more misinformation. Before any major vote, an AI analyzes the bill. It reports: 'Here’s what it will cost. Who it helps. The risks we missed.' Pure facts for everyone.",
    color: "from-violet-500 to-violet-600",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
];

export const VisionPillars: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-10">
      {pillars.map((pillar, idx) => (
        <div key={idx} className="relative group p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity`} />
          
          <div className={`w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-8 group-hover:bg-gradient-to-br ${pillar.color} transition-all duration-300 group-hover:scale-110`}>
            <span className="text-slate-900 group-hover:text-white transition-colors">{pillar.icon}</span>
          </div>
          
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 group-hover:text-slate-900 transition-colors">{pillar.tagline}</p>
          <h3 className="text-3xl font-black mb-6 text-slate-950 tracking-tight">{pillar.title}</h3>
          <p className="text-slate-600 leading-relaxed font-medium">{pillar.description}</p>
          
          <div className="mt-8 pt-8 border-t border-slate-100 flex items-center text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900">
            Learn More
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};
