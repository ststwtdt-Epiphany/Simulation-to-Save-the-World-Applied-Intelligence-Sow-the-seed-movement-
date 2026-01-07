
import React, { useState, useRef } from 'react';
import { generateVisionImage, editVisionImage, animateVision, askDemocracyBot, speakMessage, playAudio } from '../services/geminiService';
// Import GoogleGenAI as required by @google/genai SDK
import { GoogleGenAI } from '@google/genai';

export const AILabsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'studio' | 'bot' | 'analyze'>('bot');
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Hive Mind <span className="gradient-text">Labs</span></h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
          Advanced tools to visualize, simulate, and architect the future of society.
        </p>
      </div>

      <div className="flex justify-center mb-10 p-1 bg-slate-100 rounded-2xl w-fit mx-auto">
        {(['bot', 'studio', 'analyze'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === tab ? 'bg-white shadow-md text-orange-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="min-h-[600px]">
        {activeTab === 'bot' && <DemocracyBot />}
        {activeTab === 'studio' && <MultimediaStudio />}
        {activeTab === 'analyze' && <MediaAnalyzer />}
      </div>
    </div>
  );
};

const DemocracyBot: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: string, text: string, thinking?: string}[]>([]);

  const handleSend = async () => {
    if (!query.trim()) return;
    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const result = await askDemocracyBot(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', text: result.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Error: " + (err as any).message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-[40px] p-8 md:p-12 shadow-2xl flex flex-col h-[700px]">
      <div className="flex-grow overflow-y-auto space-y-6 mb-8 pr-4">
        {messages.length === 0 && (
          <div className="text-center py-20 opacity-40">
            <p className="text-xl font-medium">Ask the Hive Mind anything about the future of governance.</p>
            <p className="text-sm mt-2">Powered by Gemini 3 Pro with Search & Deep Thinking.</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-6 rounded-3xl ${m.role === 'user' ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'}`}>
              <p className="whitespace-pre-wrap">{m.text}</p>
              {m.role === 'assistant' && (
                <button 
                  onClick={() => speakMessage(m.text).then(playAudio)}
                  className="mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-orange-500 flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 011 1v12a1 1 0 11-2 0v-1a1 1 0 10-2 0v1a1 1 0 11-2 0V4a1 1 0 011-1h2z" /></svg>
                  Listen
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && <div className="text-cyan-600 font-bold animate-pulse text-sm">Hive Mind is thinking deeply...</div>}
      </div>
      <div className="flex gap-4">
        <input 
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="e.g., How would a triumvirate leadership handle a global pandemic?"
          className="flex-grow bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 outline-none"
        />
        <button onClick={handleSend} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all">Send</button>
      </div>
    </div>
  );
};

const MultimediaStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [media, setMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [loading, setLoading] = useState(false);
  const [aspect, setAspect] = useState<any>("16:9");
  const [size, setSize] = useState<any>("1K");

  const handleGenerate = async () => {
    setLoading(true);
    try {
      if (mediaType === 'image') {
        const url = await generateVisionImage(prompt, aspect, size);
        setMedia(url);
      } else {
        const url = await animateVision(prompt, undefined, aspect);
        setMedia(url);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!media || mediaType !== 'image') return;
    setLoading(true);
    try {
      const edited = await editVisionImage(media, prompt);
      setMedia(edited);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 h-full">
      <div className="space-y-8">
        <div className="glass-card p-8 rounded-3xl border-2 border-slate-100">
          <h3 className="text-2xl font-bold mb-6">Visualizer Studio</h3>
          
          <div className="space-y-6">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Prompt</label>
              <textarea 
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Describe the future architecture of a balanced city..."
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 h-32 outline-none focus:ring-2 focus:ring-fuchsia-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Aspect Ratio</label>
                <select value={aspect} onChange={e => setAspect(e.target.value)} className="w-full bg-slate-50 border p-3 rounded-xl">
                  {["1:1", "4:3", "16:9", "9:16", "21:9"].map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Image Size</label>
                <select value={size} onChange={e => setSize(e.target.value)} className="w-full bg-slate-50 border p-3 rounded-xl">
                  {["1K", "2K", "4K"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setMediaType('image')} 
                className={`flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-all ${mediaType === 'image' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-slate-100 text-slate-400'}`}
              >
                IMAGE
              </button>
              <button 
                onClick={() => setMediaType('video')} 
                className={`flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-all ${mediaType === 'video' ? 'border-fuchsia-500 bg-fuchsia-50 text-fuchsia-600' : 'border-slate-100 text-slate-400'}`}
              >
                VIDEO (VEO)
              </button>
            </div>

            <div className="flex gap-4">
              <button 
                disabled={loading}
                onClick={handleGenerate}
                className="flex-grow bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate New"}
              </button>
              {media && mediaType === 'image' && (
                <button 
                  disabled={loading}
                  onClick={handleEdit}
                  className="bg-cyan-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-cyan-600 disabled:opacity-50"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-200 rounded-[40px] flex items-center justify-center relative overflow-hidden group">
        {loading ? (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold text-slate-500">Manifesting your vision...</p>
          </div>
        ) : media ? (
          mediaType === 'image' ? (
            <img src={media} className="w-full h-full object-cover" />
          ) : (
            <video src={media} autoPlay loop muted className="w-full h-full object-cover" />
          )
        ) : (
          <div className="text-slate-400 font-bold text-center p-12">
            <svg className="w-20 h-20 mx-auto mb-6 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M4 5v14h16V5H4zm14 12H6V7h12v10zM10 9h2v2h-2V9zm4 0h2v2h-2V9zm-8 4h2v2H6v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z"/></svg>
            Visualize the movement's impact here.
          </div>
        )}
      </div>
    </div>
  );
};

const MediaAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        // Must use process.env.API_KEY directly for initialization
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: {
            parts: [
              { inlineData: { data: base64, mimeType: file.type } },
              { text: "Analyze this media for its societal implications and alignment with the Epiphany STSTW movement's core vision." }
            ]
          }
        });
        setAnalysis(response.text || "No analysis generated.");
      };
      reader.readAsDataURL(file);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-12 rounded-[40px] max-w-4xl mx-auto shadow-2xl">
      <h3 className="text-3xl font-bold mb-8">System Analysis</h3>
      <div className="flex items-center justify-center w-full mb-8">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-12 h-12 mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            <p className="mb-2 text-sm text-slate-500"><span className="font-semibold text-orange-600">Upload Media</span> or drag and drop</p>
            <p className="text-xs text-slate-400">MP4, PNG, JPG (Max 20MB)</p>
          </div>
          <input type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
        </label>
      </div>

      {file && (
        <div className="mb-8 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex justify-between items-center">
          <span className="font-bold text-orange-700">{file.name}</span>
          <button onClick={analyze} disabled={loading} className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg">
            {loading ? "Analyzing..." : "Analyze Now"}
          </button>
        </div>
      )}

      {analysis && (
        <div className="animate-in fade-in slide-in-from-bottom-4 bg-slate-100 p-8 rounded-3xl border border-slate-200">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">AI Findings</h4>
          <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">{analysis}</p>
        </div>
      )}
    </div>
  );
};
