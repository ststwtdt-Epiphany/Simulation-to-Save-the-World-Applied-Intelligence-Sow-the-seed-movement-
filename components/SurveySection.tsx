
import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    text: "How much do you trust current political structures to solve the next decade's challenges?",
    options: ["Complete Trust", "Some Trust", "Very Little Trust", "No Trust At All"]
  },
  {
    id: 2,
    text: "Would you support a leadership team over a single powerful executive?",
    options: ["Definitely", "Probably", "Maybe", "Prefer Single Leader"]
  },
  {
    id: 3,
    text: "How important is an unbiased AI advisor for public transparency?",
    options: ["Essential", "Very Important", "Moderately Important", "Not Necessary"]
  },
  {
    id: 4,
    text: "Should historical data and simulated outcomes guide lawmaking more than political ideology?",
    options: ["Always", "Mostly", "Rarely", "Never"]
  },
  {
    id: 5,
    text: "Do you believe a 'Human Hive Mind' facilitated by technology can resolve global crises?",
    options: ["Highly Likely", "Possible", "Unlikely", "Dangerous Concept"]
  },
  {
    id: 6,
    text: "How open are you to a society where the 'Operating System' is refined every 5 years by collective consensus?",
    options: ["Fully Open", "Cautiously Open", "Skeptical", "Opposed"]
  },
  {
    id: 7,
    text: "Is the division of leadership between Binary perspectives necessary for planetary balance?",
    options: ["Essential Step", "Interesting Idea", "Indifferent", "Unnecessary"]
  },
  {
    id: 8,
    text: "Would you prioritize global stability over national sovereignty if a simulation proved it saved millions of lives?",
    options: ["Stability First", "Sovereignty First", "Context Dependent", "Undecided"]
  },
  {
    id: 9,
    text: "Would you accept a societal model where resource allocation is optimized by AI rather than market volatility?",
    options: ["Support", "Concerned", "Reject", "Need More Info"]
  },
  {
    id: 10,
    text: "Is individual privacy or collective safety more critical for a 1,000-year planetary plan?",
    options: ["Absolute Privacy", "Balanced Approach", "Absolute Safety", "Undecided"]
  }
];

export const SurveySection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: option });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-orange-600 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">The Global Dialogue</span>
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-slate-950 italic">The People's Pulse</h2>
        <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto leading-relaxed">Your perspectives are the raw code for the future. Help us debug the current reality.</p>
      </div>

      <div className="glass-card rounded-[50px] p-8 md:p-16 shadow-2xl border-2 border-slate-50 min-h-[550px] flex flex-col justify-center bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 via-fuchsia-500 to-orange-500 opacity-20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        {!submitted ? (
          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="flex justify-between items-center mb-12">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.4em] mb-1">Step {currentStep + 1} of {questions.length}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Protocol Sync Active</span>
              </div>
              <div className="flex space-x-1.5">
                {questions.map((_, idx) => (
                  <div key={idx} className={`h-1.5 rounded-full transition-all duration-700 ${idx <= currentStep ? 'w-8 bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-sm' : 'w-2 bg-slate-100'}`} />
                ))}
              </div>
            </div>
            
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-14 leading-[1.15] tracking-tight">
              {questions[currentStep].text}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {questions[currentStep].options.map((option, idx) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="p-8 text-left rounded-[32px] border-2 border-slate-50 hover:border-purple-400 hover:bg-purple-50/30 transition-all font-bold text-slate-700 hover:text-purple-900 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center">
                    <span className="inline-block w-6 h-6 rounded-full border-2 border-slate-200 mr-5 group-hover:border-purple-500 group-hover:bg-white transition-all flex-shrink-0" />
                    <span className="text-lg">{option}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center animate-in zoom-in duration-700 max-w-2xl mx-auto">
            <div className="w-28 h-28 bg-gradient-to-br from-purple-100 via-fuchsia-100 to-orange-100 rounded-[40px] flex items-center justify-center mx-auto mb-10 shadow-inner group transition-transform hover:scale-110 duration-500">
              <svg className="w-14 h-14 text-purple-600 animate-in spin-in-12 duration-1000" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter">Perspective <br/>Synchronized.</h3>
            <p className="text-slate-600 text-xl mb-12 leading-relaxed font-medium">
              Your contribution has been hashed and integrated into the collective consciousness dataset. The simulation is now 0.0001% more accurate.
            </p>
            <button 
              onClick={() => { setSubmitted(false); setCurrentStep(0); setAnswers({}); }}
              className="px-10 py-4 border-2 border-slate-100 text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
            >
              Restart Protocol
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
