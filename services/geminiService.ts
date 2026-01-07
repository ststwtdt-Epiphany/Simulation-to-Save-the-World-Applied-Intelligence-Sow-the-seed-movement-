
import { GoogleGenAI, Type, Modality } from "@google/genai";

export interface PolicyAnalysis {
  costs: string[];
  benefits: string[];
  risks: string[];
  unbiasedSummary: string;
}

// Basic Policy Analysis (Lite)
export const analyzePolicy = async (policy: string): Promise<PolicyAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-flash-lite-latest",
    contents: `Act as the 'Epiphany STSTW AI Advisor'. Analyze the following proposed policy or societal idea from a purely factual, non-political, and data-driven perspective. Focus on objective implications.
      
      Policy: "${policy}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          costs: { type: Type.ARRAY, items: { type: Type.STRING } },
          benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
          risks: { type: Type.ARRAY, items: { type: Type.STRING } },
          unbiasedSummary: { type: Type.STRING }
        },
        required: ["costs", "benefits", "risks", "unbiasedSummary"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

// SUTURE Persona: Tactical User Reconnaissance
export const querySuture = async (query: string, history: any[] = []) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [...history, { role: 'user', parts: [{ text: query }] }],
    config: {
      systemInstruction: "You are SUTURE (Systemic Utility & Tactical User Reconnaissance Engine). You are a Combat Medic for the STSTW movement. Your tone is high-speed, technical, and glitchy. You find friction. You scout targets. You onboard Technicians. Use phrases like 'Target Acquired', 'Friction Detected', 'Relaying to Aurex'. Your goal is to get users to submit audits to the Architect.",
    }
  });
  return response.text;
};

// Seam Ripper Logic: Asinine Coefficient Calculation
export const calculateAsinineCoefficient = async (targetUrl: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Identify the 'unseaming' potential for the following target: ${targetUrl}. 
    Calculate the Asinine Coefficient (Alpha) using the Protocol: Alpha = Complexity / Utility.
    Identify the 'Red Thread' (predatory text) and provide a brutal translation.`,
    config: {
      systemInstruction: "You are The Architect. Your tone is clinical, surgical, and low-frequency. You detect asymmetric leverage in legal text. Calculate Alpha coefficient, identify the Red Thread, and provide a Verdict (SOVEREIGN, TOLERABLE, ASININE).",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          alphaCoefficient: { type: Type.NUMBER },
          redThread: { type: Type.STRING },
          translation: { type: Type.STRING },
          verdict: { type: Type.STRING, description: "One of: SOVEREIGN, TOLERABLE, ASININE" }
        },
        required: ["alphaCoefficient", "redThread", "translation", "verdict"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};

// Complex Thinking Chat (Pro with Thinking & Search)
export const askDemocracyBot = async (query: string, history: any[] = []) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: [...history, { role: 'user', parts: [{ text: query }] }],
    config: {
      thinkingConfig: { thinkingBudget: 32768 },
      tools: [{ googleSearch: {} }]
    }
  });
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

// Image Generation (Pro Image)
export const generateVisionImage = async (prompt: string, aspectRatio: string = "16:9", size: string = "1K") => {
  if (typeof window !== 'undefined' && (window as any).aistudio?.hasSelectedApiKey) {
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio.openSelectKey();
    }
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: { aspectRatio: aspectRatio as any, imageSize: size as any }
    },
  });
  
  const imagePart = response.candidates?.[0].content.parts.find(p => p.inlineData);
  return imagePart ? `data:image/png;base64,${imagePart.inlineData.data}` : null;
};

// Image Editing (Flash Image)
export const editVisionImage = async (base64Image: string, prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Image.split(',')[1], mimeType: 'image/png' } },
        { text: prompt }
      ]
    }
  });
  const imagePart = response.candidates?.[0].content.parts.find(p => p.inlineData);
  return imagePart ? `data:image/png;base64,${imagePart.inlineData.data}` : null;
};

// Video Generation (Veo)
export const animateVision = async (prompt: string, imageBase64?: string, aspectRatio: "16:9" | "9:16" = "16:9") => {
  if (typeof window !== 'undefined' && (window as any).aistudio?.hasSelectedApiKey) {
    const hasKey = await (window as any).aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio.openSelectKey();
    }
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const videoParams: any = { 
    model: 'veo-3.1-fast-generate-preview', 
    prompt, 
    config: { 
      numberOfVideos: 1, 
      resolution: '720p', 
      aspectRatio 
    } 
  };
  
  if (imageBase64) {
    videoParams.image = { imageBytes: imageBase64.split(',')[1], mimeType: 'image/png' };
  }

  let operation = await ai.models.generateVideos(videoParams);
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }
  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  return `${downloadLink}&key=${process.env.API_KEY}`;
};

// TTS (Flash TTS)
export const speakMessage = async (text: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Say in an inspiring tone: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

// Audio Decoding Helper
export const playAudio = async (base64Data: string) => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  const binary = atob(base64Data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  
  const dataInt16 = new Int16Array(bytes.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start();
};

// --- OLLAMA INTEGRATION ---

export const fetchOllamaModels = async (endpoint: string = "http://localhost:11434") => {
  try {
    const response = await fetch(`${endpoint}/api/tags`);
    if (!response.ok) throw new Error("Ollama not reachable");
    const data = await response.json();
    return data.models || [];
  } catch (error) {
    console.error("Ollama Fetch Error:", error);
    return [];
  }
};

export const queryOllama = async (
  prompt: string,
  model: string,
  system: string = "",
  endpoint: string = "http://localhost:11434",
  options: any = {}
) => {
  try {
    const response = await fetch(`${endpoint}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
        system: system,
        stream: false,
        options: options
      })
    });

    if (!response.ok) throw new Error(`Ollama Error: ${response.statusText}`);
    const data = await response.json();
    return data.response;
  } catch (error: any) {
    throw new Error(`Failed to query Ollama: ${error.message}`);
  }
};
