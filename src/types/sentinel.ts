/**
 * Sentinel Pack Survie - Shared Data Types
 */

export type Language = 'fr' | 'en';

export type NavTab = 
  | 'command-center'
  | 'tactical-map'
  | 'emergency-docs'
  | 'stocks'
  | 'survival-llm'
  | 'blackout'
  | 'settings'
  | 'about';

export interface ServiceStatus {
  id: string;
  name: string;
  role: string;
  port: number;
  status: 'nominal' | 'warning' | 'idle' | 'stopped';
  memory: string;
  cpu: string;
  uptime: string;
  endpoint: string;
}

export interface SurvivalArticle {
  id: string;
  category: 'water' | 'medical' | 'shelter' | 'food' | 'comms' | 'energy' | 'tactical';
  titleFr: string;
  titleEn: string;
  summaryFr: string;
  summaryEn: string;
  criticalLevel: 'vital' | 'high' | 'medium';
  stepsFr: string[];
  stepsEn: string[];
  warningsFr?: string[];
  warningsEn?: string[];
  sources: string[];
  contentFr: string;
  contentEn: string;
}

export interface RadioFrequency {
  id: string;
  name: string;
  frequency: string;
  band: 'VHF' | 'UHF' | 'HF' | 'PMR446' | 'CB 27MHz';
  channel?: string;
  modulation: 'FM' | 'AM' | 'USB' | 'CW';
  usageFr: string;
  usageEn: string;
  protocolFr: string;
  protocolEn: string;
  priority: 'emergency' | 'calling' | 'tactical';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: string[];
  urgentAction?: string;
}

export interface DeploymentFile {
  id: string;
  titleFr: string;
  titleEn: string;
  filename: string;
  descriptionFr: string;
  descriptionEn: string;
  syntax: 'yaml' | 'bash' | 'nginx' | 'markdown' | 'powershell' | 'batch';
  content: string;
}
