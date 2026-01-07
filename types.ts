
export interface OllamaSettings {
  enabled: boolean;
  endpoint: string;
  activeModel: string;
}

export interface SecuritySettings {
  decoyProtocol: boolean;
  isBreachDetected: boolean;
  ghostMode: boolean;
}

export interface AurexSettings {
  ollama: OllamaSettings;
  security: SecuritySettings;
}

export type ViewState = 'landing' | 'main' | 'info' | 'labs' | 'hive' | 'creator' | 'allocation' | 'suture' | 'store' | 'support';

export interface AuditResult {
  url: string;
  alphaCoefficient: number;
  redThread: string;
  translation: string;
  verdict: 'SOVEREIGN' | 'TOLERABLE' | 'ASININE';
  spotsRemaining: number;
  highScoreUser: string;
}

export type AllocationTier = 'OPERATIVE' | 'PATRON' | 'SOVEREIGN';

export interface AllocationProduct {
  id: string;
  name: string;
  price: number;
  tier: AllocationTier;
  requirements: string;
  description: string;
}

export interface FundingTier {
  name: string;
  amount: number | 'custom';
  description: string;
  perks: string[];
  gradient: string;
}
