
import React from 'react';

const frames = [
  {
    title: "The Simulation",
    subtitle: "STSTW Architecture",
    desc: "A digital-first prototype for a balanced society. We test systemic upgrades before implementation to ensure humanity thrives.",
    gradient: "from-cyan-500 to-blue-600",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Functional Leadership",
    subtitle: "The Triumvirate",
    desc: "Moving from pack animals to collaborative intelligence. Our OS facilitates bonding and consensus over conflict.",
    gradient: "from-fuchsia-500 to-violet-600",
    img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "It Doesn't Have To Be This Way",
    subtitle: "New World Logic",
    desc: "One chosen by men, one by women, one by wisdom. A structure that demands unity from the very top.",
    gradient: "from-orange-500 to-red-600",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
  }
];

export const VisualManifesto: React.FC = () => {
  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-orange-500 font-black tracking-widest uppercase text-xs">Visualizing the Shift</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold mt-4">The STSTW Manifesto</h2>
          </div>
          <p className="text-slate-400 max-w-sm text-sm font-medium leading-relaxed">
            Every pixel of our visual language represents a byte of the system we are building. 
            Digital efficiency meeting human empathy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {frames.map((frame, i) => (
            <div key={i} className="group relative overflow-hidden rounded-[40px] border border-white/5 hover:border-white/20 transition-all h-[600px] bg-slate-900">
              <div className="absolute inset-0">
                <img src={frame.img} className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700" alt={frame.title} />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${frame.gradient} opacity-20 group-hover:opacity-40 transition-opacity`} />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                <div>
                  <div className="w-12 h-1 px-1 bg-white/20 mb-6" />
                  <h3 className="text-3xl font-black mb-2 uppercase tracking-tight text-white">{frame.title}</h3>
                  <p className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em]">{frame.subtitle}</p>
                </div>

                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-slate-200 text-lg leading-relaxed mb-8">
                    {frame.desc}
                  </p>
                  <button className="flex items-center text-sm font-black uppercase tracking-widest text-white group-hover:text-orange-400 transition-colors">
                    Explore Depth
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
