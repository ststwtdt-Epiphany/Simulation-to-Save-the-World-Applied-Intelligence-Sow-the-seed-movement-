
import React, { useState } from 'react';

interface Feedback {
  author: string;
  role: string;
  text: string;
  isHighImpact: boolean;
}

const initialFeedback: Feedback[] = [
  {
    author: "Desmond A.",
    role: "Founding Architect",
    text: "We cannot run from Pandora's box, but we can utilize it for humanity's exponential effort. Unity is our next evolutionary step.",
    isHighImpact: true
  },
  {
    author: "Sarah J.",
    role: "Community Pioneer",
    text: "The 3-way leadership model finally gives a voice to perspectives that have been historically silenced. This is the upgrade we need.",
    isHighImpact: true
  },
  {
    author: "Marcus T.",
    role: "Tech Ethicist",
    text: "AI should serve as a mirror of reality, not a tool for manipulation. The Independent Advisor concept is revolutionary.",
    isHighImpact: true
  }
];

export const FeedbackSection: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(initialFeedback);
  const [newText, setNewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setNewText('');
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 relative">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-fuchsia-600/20 rounded-full blur-[100px]" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-600/20 rounded-full blur-[100px]" />

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
            Voices of the <br />
            <span className="gradient-text italic">Dialogue</span>
          </h2>
          <p className="text-slate-400 text-xl mb-12 max-w-lg leading-relaxed">
            We are building a collective intelligence. Every thought shared here helps evolve our societal structure.
          </p>

          <div className="grid gap-6">
            {feedbackList.map((item, idx) => (
              <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm group hover:border-orange-500/50 transition-all">
                <p className="text-lg text-slate-200 italic mb-4 leading-relaxed">"{item.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-fuchsia-500 rounded-full mr-3 shadow-inner" />
                  <div>
                    <h4 className="font-bold text-white">{item.author}</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card bg-white/5 border-white/10 rounded-[40px] p-10 md:p-14 sticky top-24">
          <h3 className="text-3xl font-bold mb-6">Contribute to the Plan</h3>
          <p className="text-slate-400 mb-8 font-medium">
            Share your insight, critique, or vision. Great ideas are featured on our main wall.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="What does a better world look like to you?"
                className="w-full h-48 bg-white/5 border border-white/10 rounded-3xl p-6 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-br from-fuchsia-600 to-violet-700 hover:from-fuchsia-700 hover:to-violet-800 py-5 rounded-2xl font-bold text-xl shadow-xl shadow-fuchsia-900/20 transition-all flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : success ? (
                <span className="text-green-400 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  Received
                </span>
              ) : (
                <span>Submit Insight</span>
              )}
            </button>
            <p className="text-[10px] text-slate-600 uppercase tracking-widest text-center">
              Insights are analyzed by the AI advisor for systemic value.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
