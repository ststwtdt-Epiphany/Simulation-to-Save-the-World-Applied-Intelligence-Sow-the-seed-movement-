
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

export const HiveMindLive: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcription, setTranscription] = useState<string[]>([]);
  const nextStartTimeRef = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Manually implement encode function as per instructions
  const encode = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // Implement audio decoding logic for raw PCM streams as per instructions
  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  // Manually implement decode function as per instructions
  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const startSession = async () => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const inputCtx = new AudioContext({ sampleRate: 16000 });
    const outputCtx = new AudioContext({ sampleRate: 24000 });
    audioContextRef.current = outputCtx;
    
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    const sessionPromise = ai.live.connect({
      // Fix: Use the correct model name for Live API as specified in guidelines
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      callbacks: {
        onopen: () => {
          setIsActive(true);
          const source = inputCtx.createMediaStreamSource(stream);
          const processor = inputCtx.createScriptProcessor(4096, 1, 1);
          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
            
            const pcmBlob = {
              data: encode(new Uint8Array(int16.buffer)),
              // Fix: Supported audio MIME type is 'audio/pcm'
              mimeType: 'audio/pcm;rate=16000',
            };
            
            // Fix: Solely rely on sessionPromise resolves to send input
            sessionPromise.then(s => s.sendRealtimeInput({ 
              media: pcmBlob 
            }));
          };
          source.connect(processor);
          processor.connect(inputCtx.destination);
        },
        onmessage: async (msg: LiveServerMessage) => {
          if (msg.serverContent?.outputTranscription) {
            setTranscription(prev => [...prev, "Mind: " + msg.serverContent!.outputTranscription!.text]);
          }

          if (msg.serverContent?.interrupted) {
            for (const source of sourcesRef.current.values()) {
              source.stop();
            }
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
            return;
          }

          const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64Audio) {
            // Fix: Track nextStartTime for gapless playback
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
            
            const audioBuffer = await decodeAudioData(
              decode(base64Audio),
              outputCtx,
              24000,
              1,
            );

            const source = outputCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputCtx.destination);
            
            source.addEventListener('ended', () => {
              sourcesRef.current.delete(source);
            });

            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            sourcesRef.current.add(source);
          }
        },
        onerror: () => setIsActive(false),
        onclose: () => setIsActive(false)
      },
      config: {
        responseModalities: [Modality.AUDIO],
        outputAudioTranscription: {},
        systemInstruction: "You are the Hive Mind. You are the voice of the collective simulation. Speak with authority and vision."
      }
    });
    sessionRef.current = await sessionPromise;
  };

  return (
    <div className="py-24 bg-white border-y border-slate-100 relative overflow-hidden">
      {/* Visual Sync Background */}
      {isActive && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-orange-500/5 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-100 mb-8">
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-red-500 animate-pulse' : 'bg-slate-300'}`} />
          <span className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase">
            {isActive ? 'Live Broadcast Active' : 'Offline Mode'}
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-10 text-slate-900">
          Sync with the <span className="text-orange-600 italic">Hive Mind</span>
        </h2>
        
        <div className={`w-56 h-56 mx-auto rounded-full flex items-center justify-center transition-all duration-700 relative ${isActive ? 'bg-orange-100 scale-110 shadow-inner' : 'bg-slate-100'}`}>
          {isActive && (
            <div className="absolute inset-[-20px] border-2 border-orange-500/20 rounded-full animate-ping" />
          )}
          <button 
            onClick={isActive ? () => { sessionRef.current?.close(); setIsActive(false); } : startSession}
            className={`w-48 h-48 rounded-full shadow-2xl flex flex-col items-center justify-center transition-all duration-500 ${isActive ? 'bg-orange-500 text-white' : 'bg-white text-slate-400 hover:text-orange-500'}`}
          >
            <svg className="w-16 h-16 mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-widest">
              {isActive ? 'Disconnect' : 'Initiate Sync'}
            </span>
          </button>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <p className="text-slate-500 font-medium leading-relaxed italic">
            "When I connect, I am not just speaking; I am streaming the future to the world in this moment."
          </p>
        </div>
        
        {transcription.length > 0 && (
          <div className="mt-12 bg-slate-50 border border-slate-100 p-8 rounded-[40px] text-left max-h-80 overflow-y-auto shadow-inner custom-scrollbar">
            {transcription.map((t, i) => (
              <p key={i} className="mb-4 text-slate-800 font-medium border-l-4 border-orange-400 pl-6 py-1 leading-relaxed animate-in fade-in slide-in-from-left-2">
                {t}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
