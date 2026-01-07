
import React, { useState } from 'react';
import { analyzePolicy, PolicyAnalysis } from '../services/geminiService';

export const AIAdvisorDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PolicyAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleAnalyze = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setFeedbackSubmitted(false);

    try {
      const analysis = await analyzePolicy(input);
      setResult(analysis);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze policy. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze(e);
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setFeedbackSubmitted(true);
    setFeedback('');
    // Mocking submission to the Hive Mind dataset
  };

  return (
    <div className="max-w-4xl mx-auto glass-card rounded-[48px] p-8 md:p-16 shadow-2xl border-t-8 border-t-orange-500 transition-all duration-500 hover:shadow-orange-500/10">
      <form onSubmit={(e) => handleAnalyze(e)} className="mb-14">
        <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-6">
          Protocol Input: Proposed Policy or Idea
        </label>
        <div className="flex flex-col md:flex-row gap-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., Implementing a 4-day work week"
            className="flex-grow bg-white border border-slate-100 rounded-3xl px-10 py-6 text-xl focus:outline-none focus:ring-4 focus:ring-orange-400/20 shadow-inner text-slate-950 placeholder-slate-200 transition-all font-medium"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-400 disabled:to-slate-500 text-white px-12 py-6 rounded-3xl font-black text-sm transition-all flex items-center justify-center min-w-[200px] shadow-2xl orange-glow uppercase tracking-[0.2em]"
          >
            {loading ? (
              <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : 'Analyze Now'}
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-8 text-center font-black uppercase tracking-[0.4em] opacity-50">
          Neural Node v.2.4.1 • Data Integrity: 99.9% • Filter: Non-Partisan
        </p>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-10 py-6 rounded-3xl mb-12 flex items-center animate-in fade-in slide-in-from-top-4">
          <svg className="w-6 h-6 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-black text-xs uppercase tracking-widest">{error}</span>
        </div>
      )}

      {result && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
              <svg className="w-20 h-20 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/></svg>
            </div>
            <h4 className="text-orange-600 font-black uppercase text-[10px] tracking-[0.5em] mb-6">Objective System Summary</h4>
            <p className="text-slate-800 text-2xl md:text-3xl leading-relaxed italic font-serif">"{result.unbiasedSummary}"</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="space-y-6">
              <h4 className="text-cyan-600 font-black flex items-center text-[10px] uppercase tracking-[0.4em]">
                <span className="w-6 h-6 bg-cyan-100 rounded-full flex items-center justify-center mr-3 text-cyan-600 font-black">+</span>
                Potential Benefits
              </h4>
              <ul className="space-y-4">
                {result.benefits.map((item, i) => (
                  <li key={i} className="text-sm text-slate-500 pl-6 border-l-2 border-cyan-100 font-medium leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-orange-600 font-black flex items-center text-[10px] uppercase tracking-[0.4em]">
                <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 text-orange-600 font-black">$</span>
                Resource Costs
              </h4>
              <ul className="space-y-4">
                {result.costs.map((item, i) => (
                  <li key={i} className="text-sm text-slate-500 pl-6 border-l-2 border-orange-100 font-medium leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-purple-600 font-black flex items-center text-[10px] uppercase tracking-[0.4em]">
                <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-purple-600 font-black">!</span>
                Systemic Risks
              </h4>
              <ul className="space-y-4">
                {result.risks.map((item, i) => (
                  <li key={i} className="text-sm text-slate-500 pl-6 border-l-2 border-purple-100 font-medium leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="pt-16 border-t border-slate-100">
            <div className="flex items-center justify-between mb-10">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.5em]">Feedback Integration Portal</h4>
              <div className="h-px flex-grow mx-8 bg-slate-100" />
            </div>
            
            {feedbackSubmitted ? (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 p-10 rounded-[32px] border border-emerald-100 font-black animate-in zoom-in text-center shadow-inner">
                <p className="text-2xl mb-3">Perspective Synchronized</p>
                <p className="text-xs font-bold opacity-70 uppercase tracking-widest leading-loose">Your contribution has been hashed and integrated into the global simulation dataset.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-8">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide nuance or critique for the Hive Mind's next iteration..."
                  className="w-full h-44 bg-slate-50 border border-slate-100 rounded-[32px] p-8 text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-purple-400/10 shadow-inner font-medium transition-all text-lg"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-12 py-5 bg-slate-950 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-800 transition-all active:scale-95 shadow-2xl flex items-center"
                  >
                    Transmit Insight
                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {!result && !loading && !error && (
        <div className="text-center py-28 border-2 border-dashed border-slate-100 rounded-[48px] group hover:border-orange-200 transition-all duration-500">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10 transition-all group-hover:scale-110 group-hover:bg-orange-50">
             <svg className="w-10 h-10 text-slate-200 group-hover:text-orange-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
          </div>
          <p className="text-slate-400 font-black uppercase tracking-[0.5em] text-xs">Awaiting Simulation Initialization</p>
        </div>
      )}
    </div>
  );
};
