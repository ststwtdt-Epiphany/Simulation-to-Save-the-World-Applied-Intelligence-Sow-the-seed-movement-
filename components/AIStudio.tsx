
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { fetchOllamaModels, queryOllama } from '../services/geminiService';
import { AurexSettings } from '../types';

interface AIStudioProps {
  aurexSettings: AurexSettings;
  setAurexSettings: (s: any) => void;
}

interface StudioConfig {
  source: 'gemini' | 'ollama';
  model: string;
  temperature: number;
  topP: number;
  topK: number;
  thinkingBudget: number;
  systemInstruction: string;
}

export const AIStudio: React.FC<AIStudioProps> = ({ aurexSettings, setAurexSettings }) => {
  const [config, setConfig] = useState<StudioConfig>({
    source: aurexSettings.ollama.enabled ? 'ollama' : 'gemini',
    model: aurexSettings.ollama.enabled ? aurexSettings.ollama.activeModel : 'gemini-3-flash-preview',
    temperature: 1.0,
    topP: 0.95,
    topK: 64,
    thinkingBudget: 0,
    systemInstruction: "You are the Epiphany STSTW Architect Assistant. Provide high-level technical and societal blueprints based on logic and data."
  });

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<{ text?: string; imageUrl?: string } | null>(null);
  const [isImageMode, setIsImageMode] = useState(false);
  const [ollamaModels, setOllamaModels] = useState<any[]>([]);
  const [isOllamaScanning, setIsOllamaScanning] = useState(false);
  const [ollamaStatus, setOllamaStatus] = useState<'IDLE' | 'CONNECTED' | 'ERROR'>('IDLE');

  useEffect(() => {
    if (aurexSettings.ollama.enabled) {
      handleScanOllama();
    }
  }, [aurexSettings.ollama.enabled, aurexSettings.ollama.endpoint]);

  const handleScanOllama = async () => {
    setIsOllamaScanning(true);
    setOllamaStatus('IDLE');
    try {
      const models = await fetchOllamaModels(aurexSettings.ollama.endpoint);
      setOllamaModels(models);
      if (models.length > 0) {
        setOllamaStatus('CONNECTED');
        if (config.source === 'ollama' && !models.some(m => m.name === config.model)) {
          setConfig(prev => ({ ...prev, model: models[0].name }));
        }
      } else {
        setOllamaStatus('ERROR');
      }
    } catch {
      setOllamaStatus('ERROR');
    }
    setIsOllamaScanning(false);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setOutput(null);

    // If breach detected, return generic decoy response
    if (aurexSettings.security.isBreachDetected) {
      setTimeout(() => {
        setOutput({ text: "System is operating within normal parameters. No discrepancies detected." });
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      if (config.source === 'ollama') {
        const response = await queryOllama(
          prompt,
          config.model,
          config.systemInstruction,
          aurexSettings.ollama.endpoint,
          {
            temperature: config.temperature,
            top_p: config.topP,
            top_k: config.topK
          }
        );
        setOutput({ text: response });
      } else {
        // Gemini Logic
        if (config.model.includes('pro-image') || config.model.includes('veo')) {
          if (typeof window !== 'undefined' && (window as any).aistudio?.hasSelectedApiKey) {
            const hasKey = await (window as any).aistudio.hasSelectedApiKey();
            if (!hasKey) {
              await (window as any).aistudio.openSelectKey();
            }
          }
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const generationParams: any = {
          model: isImageMode ? (config.model.includes('image') ? config.model : 'gemini-2.5-flash-image') : config.model,
          contents: { parts: [{ text: prompt }] },
          config: {
            systemInstruction: config.systemInstruction,
            temperature: config.temperature,
            topP: config.topP,
            topK: config.topK,
          }
        };

        if (config.model.includes('gemini-3') && config.thinkingBudget > 0) {
          generationParams.config.thinkingConfig = { thinkingBudget: config.thinkingBudget };
        }

        if (isImageMode) {
          generationParams.config.imageConfig = { aspectRatio: "16:9", imageSize: "1K" };
        }

        const response = await ai.models.generateContent(generationParams);

        if (isImageMode) {
          const imagePart = response.candidates?.[0]?.content.parts.find(p => p.inlineData);
          if (imagePart) {
            setOutput({ imageUrl: `data:image/png;base64,${imagePart.inlineData.data}` });
          } else {
            setOutput({ text: response.text });
          }
        } else {
          setOutput({ text: response.text });
        }
      }
    } catch (err: any) {
      setOutput({ text: `ERROR: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  const toggleOllama = (enabled: boolean) => {
    setAurexSettings((prev: AurexSettings) => ({
      ...prev,
      ollama: { ...prev.ollama, enabled }
    }));
    if (enabled) {
      setConfig(prev => ({ ...prev, source: 'ollama' }));
    } else {
      setConfig(prev => ({ ...prev, source: 'gemini', model: 'gemini-3-flash-preview' }));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
      {/* Parameters Panel */}
      <div className="lg:w-1/3 space-y-6">
        <div className="glass-card p-8 rounded-[40px] border-white/10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black uppercase tracking-widest text-orange-500">Aurex Core</h3>
            <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${ollamaStatus === 'CONNECTED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
              {config.source === 'ollama' ? `Local: ${ollamaStatus}` : 'Cloud Node'}
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">System Mode</label>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                <button 
                  onClick={() => { toggleOllama(false); setConfig({...config, source: 'gemini', model: 'gemini-3-flash-preview'}); }}
                  className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${config.source === 'gemini' ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-500'}`}
                >
                  Cloud (Gemini)
                </button>
                <button 
                  onClick={() => { toggleOllama(true); setConfig({...config, source: 'ollama'}); }}
                  className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${config.source === 'ollama' ? 'bg-cyan-500 text-white shadow-lg' : 'text-slate-500'}`}
                >
                  Local (Ollama)
                </button>
              </div>
            </div>

            {config.source === 'ollama' && (
              <div className="animate-in fade-in duration-300 space-y-4 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] font-black text-cyan-400 uppercase tracking-widest block">Ollama Node</label>
                  <button onClick={handleScanOllama} className={`text-cyan-400 hover:text-white transition-all ${isOllamaScanning ? 'animate-spin' : ''}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <input 
                  type="text" 
                  value={aurexSettings.ollama.endpoint}
                  onChange={e => setAurexSettings((prev: AurexSettings) => ({ ...prev, ollama: { ...prev.ollama, endpoint: e.target.value } }))}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-[10px] text-cyan-200 outline-none focus:ring-1 focus:ring-cyan-500 font-mono"
                  placeholder="Endpoint..."
                />
              </div>
            )}

            <div>
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-3">Target Model</label>
              <select 
                value={config.model} 
                onChange={e => setConfig({...config, model: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all text-xs"
              >
                {config.source === 'gemini' ? (
                  <>
                    <option value="gemini-3-flash-preview">Gemini 3 Flash</option>
                    <option value="gemini-3-pro-preview">Gemini 3 Pro</option>
                    <option value="gemini-2.5-flash-image">Gemini 2.5 Image</option>
                    <option value="gemini-3-pro-image-preview">Gemini 3 Pro Image</option>
                  </>
                ) : (
                  ollamaModels.length > 0 ? (
                    ollamaModels.map(m => <option key={m.name} value={m.name}>{m.name}</option>)
                  ) : (
                    <option disabled>No local models found</option>
                  )
                )}
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Temperature</label>
                <span className="text-xs font-mono text-orange-400">{config.temperature}</span>
              </div>
              <input 
                type="range" min="0" max="2" step="0.1" 
                value={config.temperature} 
                onChange={e => setConfig({...config, temperature: parseFloat(e.target.value)})}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Top-P</label>
                <span className="text-xs font-mono text-cyan-400">{config.topP}</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.05" 
                value={config.topP} 
                onChange={e => setConfig({...config, topP: parseFloat(e.target.value)})}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[40px] border-white/10">
          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-4">Architect Directives</label>
          <textarea 
            value={config.systemInstruction}
            onChange={e => setConfig({...config, systemInstruction: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-[11px] text-slate-300 min-h-[140px] outline-none focus:ring-1 focus:ring-orange-500 transition-all resize-none font-mono"
          />
        </div>
      </div>

      {/* Generation Area */}
      <div className="lg:w-2/3 flex flex-col gap-8">
        <div className="glass-card flex-grow rounded-[40px] border-white/10 p-10 flex flex-col relative overflow-hidden bg-slate-900/40">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <svg className={`w-24 h-24 ${config.source === 'ollama' ? 'text-cyan-500' : 'text-orange-500'}`} fill="currentColor" viewBox="0 0 24 24">
              {config.source === 'ollama' ? (
                <path d="M12 2L1 21h22L12 2zm0 3.45l8.15 13.55H3.85L12 5.45z"/>
              ) : (
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              )}
            </svg>
          </div>
          
          <div className="flex-grow overflow-y-auto mb-8 pr-4 custom-scrollbar min-h-[400px]">
            {output ? (
              <div className="animate-in fade-in zoom-in duration-500">
                {output.imageUrl ? (
                  <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <img src={output.imageUrl} alt="Generated output" className="w-full h-auto" />
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none">
                    <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap font-medium">{output.text}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                <div className={`w-20 h-20 border-2 border-dashed rounded-full mb-6 flex items-center justify-center ${config.source === 'ollama' ? 'border-cyan-500' : 'border-orange-500'}`}>
                  <svg className={`w-8 h-8 ${config.source === 'ollama' ? 'text-cyan-500' : 'text-orange-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p className="font-black uppercase tracking-[0.4em] text-[10px]">Aurex {config.source === 'ollama' ? 'Local' : 'Cloud'} Interface</p>
                <p className="text-[9px] mt-2 italic">Waiting for neural handshake...</p>
              </div>
            )}
          </div>

          <div className="relative">
            <textarea 
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleGenerate())}
              placeholder={isImageMode ? "Describe the architecture to visualize..." : "Sync logic or society blueprints..."}
              className="w-full bg-white/5 border border-white/20 rounded-[32px] px-8 py-6 text-white text-lg outline-none focus:ring-2 focus:ring-orange-500 transition-all min-h-[120px] resize-none pr-36"
            />
            <button 
              disabled={loading}
              onClick={handleGenerate}
              className={`absolute right-4 bottom-4 disabled:opacity-50 text-white px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95 ${config.source === 'ollama' ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-orange-600 hover:bg-orange-700'}`}
            >
              {loading ? 'Thinking' : 'Process'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
