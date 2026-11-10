import React, { useState } from 'react';
import { Language, NavTab } from '../types/sentinel';
import {
  ArrowRight,
  MapPin,
  ZapOff,
  Settings,
  Package,
  HeartPulse,
  Sparkles,
  Smartphone,
  ShieldAlert,
  Send
} from 'lucide-react';

interface CommandCenterProps {
  language: Language;
  onNavigate: (tab: NavTab) => void;
  ecoMode?: boolean;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  language,
  onNavigate
}) => {
  const isFr = language === 'fr';
  const [quickAiPrompt, setQuickAiPrompt] = useState('');

  const handleOpenUrgencyDirect = (urgencyId: string) => {
    try {
      sessionStorage.setItem('sentinel_open_urgency_id', urgencyId);
    } catch {}
    onNavigate('emergency-docs');
  };

  const handleAskAiFromHome = (promptText?: string) => {
    const q = (promptText ?? quickAiPrompt).trim();
    if (q) {
      try {
        sessionStorage.setItem('sentinel_initial_ai_prompt', q);
      } catch {}
    }
    onNavigate('survival-llm');
  };

  const quickEmergencies = [
    { id: 'fa-cardiac', icon: '🫀', labelFr: 'Malaise / Cœur', labelEn: 'Heart / Chest Pain' },
    { id: 'fa-bleeding', icon: '🩸', labelFr: 'Saignement grave', labelEn: 'Severe Bleeding' },
    { id: 'fa-choking', icon: '🫁', labelFr: 'Étouffement', labelEn: 'Choking' },
    { id: 'fa-unconscious', icon: '🛌', labelFr: 'Inconscient (PLS)', labelEn: 'Unconscious' },
    { id: 'fa-burns', icon: '🔥', labelFr: 'Brûlure', labelEn: 'Burns' },
    { id: 'fa-drowning', icon: '🌊', labelFr: 'Noyade', labelEn: 'Drowning' },
    { id: 'fa-heatstroke', icon: '☀️', labelFr: 'Coup de chaud', labelEn: 'Heatstroke' },
    { id: 'fa-bites-stings', icon: '🐍', labelFr: 'Piqûre / Morsure', labelEn: 'Bite / Sting' }
  ];

  const mainModules: {
    id: NavTab;
    titleFr: string;
    titleEn: string;
    descFr: string;
    descEn: string;
    metaFr: string;
    metaEn: string;
    icon: React.ReactNode;
    isAi?: boolean;
  }[] = [
    {
      id: 'tactical-map',
      titleFr: '1. Carte : Eau, Hôpitaux & Forêts',
      titleEn: '1. Map: Water, Hospitals & Forests',
      descFr: 'Points d’eau potable, lacs, hôpitaux, cliniques, forêts et émetteurs radio autour de vous.',
      descEn: 'Drinking water, lakes, hospitals, clinics, forests, and radio transmitters near you.',
      metaFr: 'Eau · Lacs · Hôpitaux · Forêts · TDF',
      metaEn: 'Water · Lakes · Hospitals · Forests',
      icon: <MapPin className="w-5 h-5" />
    },
    {
      id: 'emergency-docs',
      titleFr: '2. Secours, Médicaments & Guides',
      titleEn: '2. First Aid, Meds & Guides',
      descFr: 'Premiers secours étape par étape, doses des médicaments, sac 72h et 16 guides pratiques.',
      descEn: 'Step-by-step first aid, medication dosages, 72h bag, and 16 practical guides.',
      metaFr: '8 Secours · Médicaments · 16 Guides · Sac 72h',
      metaEn: '8 First Aid · Meds · 16 Guides · 72h Bag',
      icon: <HeartPulse className="w-5 h-5" />
    },
    {
      id: 'stocks',
      titleFr: '3. Mes Stocks (Eau, Vivres, Pharmacie)',
      titleEn: '3. My Stocks (Water, Food, Meds)',
      descFr: 'Gérez vos réserves à domicile ou dans votre sac et suivez les dates de péremption.',
      descEn: 'Track your home or bag supplies and monitor expiration dates.',
      metaFr: 'Inventaire simple · Dates de péremption',
      metaEn: 'Simple inventory · Expiration dates',
      icon: <Package className="w-5 h-5" />
    },
    {
      id: 'survival-llm',
      titleFr: '4. Questionner l’IA (Intelligence Artificielle)',
      titleEn: '4. Ask the AI (Artificial Intelligence)',
      descFr: 'Posez n’importe quelle question à l’Intelligence Artificielle embarquée : elle vous répond immédiatement sans Internet.',
      descEn: 'Ask any question to the built-in offline Artificial Intelligence for immediate guidance.',
      metaFr: '✨ IA Embarquée · 100% Hors-Ligne',
      metaEn: '✨ Built-in AI · 100% Offline',
      icon: <Sparkles className="w-5 h-5" />,
      isAi: true
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-5 min-w-0">
      {/* 1. EN-TÊTE SOBRE ET CLAIR */}
      <div className="border border-[#3a4354] bg-[#242a34] rounded-2xl p-4 sm:p-6 shadow-lg shadow-black/30 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-amber-500" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-xl bg-[#161920] border border-amber-500/80 p-2 shrink-0 flex items-center justify-center">
              <img
                src="./assets/aistudio/noir_233aab2b.png"
                alt="Logo Sentinel"
                className="w-full h-full object-contain invert"
              />
            </div>

            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#161920] border border-[#3a4354] text-amber-300 text-[11px] font-semibold">
                ✓ {isFr ? '100% Hors-Ligne · Enregistré sur cet appareil' : '100% Offline · Saved on this device'}
              </span>
              <h1 className="text-xl sm:text-3xl font-black text-white uppercase tracking-wider mt-1 leading-tight">
                {isFr ? 'LE QG DU SENTINEL' : 'THE SENTINEL HQ'}
              </h1>
              <div className="text-xs sm:text-lg font-extrabold text-amber-400 uppercase tracking-widest">
                {isFr ? 'LE QUARTIER GÉNÉRAL' : 'THE HEADQUARTERS'}
              </div>
            </div>
          </div>

          {/* Bouton d'installation visible uniquement sur Téléphone */}
          <button
            onClick={() => window.dispatchEvent(new Event('sentinel-open-mobile-install'))}
            className="md:hidden w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Smartphone className="w-4 h-4 shrink-0" />
            <span>{isFr ? '📲 Installer l’application sur ce téléphone' : '📲 Install App on This Phone'}</span>
          </button>
        </div>
      </div>

      {/* 1B. MISE EN VALEUR DE L'INTELLIGENCE ARTIFICIELLE : QUESTIONNER L'IA DIRECTEMENT */}
      <div className="border-2 border-amber-500/80 bg-[#242a34] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/30 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-black flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wide">
                  {isFr ? 'Questionner l’IA — Intelligence Artificielle de Survie' : 'Ask the AI — Offline Survival Intelligence'}
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#161920] border border-amber-500/60 text-amber-300 text-[10px] font-bold">
                  100% HORS-LIGNE
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                {isFr
                  ? 'Décrivez votre urgence ou posez une question : l’IA vous guide étape par étape sans connexion Internet.'
                  : 'Describe your emergency or ask a question: the AI guides you step-by-step without Internet.'}
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleAskAiFromHome();
          }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
        >
          <input
            type="text"
            value={quickAiPrompt}
            onChange={e => setQuickAiPrompt(e.target.value)}
            placeholder={
              isFr
                ? 'Posez votre question à l’IA (ex : comment purifier l’eau d’un lac, stopper un saignement, hypothermie)...'
                : 'Ask the AI (e.g. how to purify lake water, stop bleeding, hypothermia)...'
            }
            className="flex-1 bg-[#161920] border border-[#3a4354] focus:border-amber-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-400 focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isFr ? 'Questionner l’IA' : 'Ask the AI'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="text-[11px] text-zinc-400 mr-1">
            {isFr ? 'Exemples 1-clic :' : 'Quick examples:'}
          </span>
          {[
            { label: '💧 Rendre de l’eau potable', q: 'Comment purifier et faire bouillir de l’eau douteuse ?' },
            { label: '🩸 Arrêter un saignement', q: 'Comment stopper une hémorragie grave et poser un garrot ?' },
            { label: '❄️ Hypothermie / Froid', q: 'Que faire immédiatement en cas d’hypothermie ?' },
            { label: '📻 Appeler les secours radio', q: 'Quelles sont les fréquences radio de secours et le message MAYDAY ?' }
          ].map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleAskAiFromHome(ex.q)}
              className="px-2.5 py-1 rounded-lg bg-[#161920] hover:bg-[#1d222b] border border-[#3a4354] hover:border-amber-500 text-zinc-200 text-[11px] font-semibold cursor-pointer"
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. LES 4 GRANDES CARTES PRINCIPALES (SOBRES, BIEN DÉTACHÉES DU FOND) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {mainModules.map(mod => (
          <button
            key={mod.id}
            onClick={() => onNavigate(mod.id)}
            className={`group text-left border bg-[#242a34] hover:bg-[#2a313d] rounded-2xl p-4 sm:p-6 flex flex-col justify-between gap-4 cursor-pointer transition-all shadow-lg shadow-black/25 ${
              mod.isAi
                ? 'border-amber-500/70 hover:border-amber-400'
                : 'border-[#3a4354] hover:border-amber-500'
            }`}
          >
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  mod.isAi
                    ? 'bg-amber-500 text-black'
                    : 'bg-[#161920] border border-amber-500/40 text-amber-400'
                }`}
              >
                {mod.icon}
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-300">
                  {isFr ? mod.titleFr : mod.titleEn}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
                  {isFr ? mod.descFr : mod.descEn}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#343c4b] text-xs font-semibold text-amber-400">
              <span className="truncate pr-2">{isFr ? mod.metaFr : mod.metaEn}</span>
              <span className="flex items-center gap-1 shrink-0">
                {mod.isAi ? (isFr ? 'Questionner l’IA' : 'Ask the AI') : isFr ? 'Ouvrir' : 'Open'}{' '}
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* 3. ACCÈS DIRECT AUX 8 URGENCES MÉDICALES EN 1 CLIC */}
      <div className="border border-[#3a4354] bg-[#242a34] rounded-2xl p-4 sm:p-5 space-y-3 shadow-lg shadow-black/25">
        <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs sm:text-sm uppercase">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>
            {isFr
              ? 'Premiers Secours Immédiats (Cliquez sur l’urgence)'
              : 'Immediate First Aid (Tap the emergency)'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {quickEmergencies.map(item => (
            <button
              key={item.id}
              onClick={() => handleOpenUrgencyDirect(item.id)}
              className="p-3 rounded-xl bg-[#161920] hover:bg-[#1d222b] border border-[#343c4b] hover:border-amber-500/80 text-left flex items-center gap-2.5 cursor-pointer transition-colors"
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              <span className="text-xs font-bold text-zinc-100 leading-tight">
                {isFr ? item.labelFr : item.labelEn}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. ACCÈS SECONDAIRES (SANS COURANT & RÉGLAGES) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <button
          onClick={() => onNavigate('blackout')}
          className="p-4 rounded-xl border border-[#3a4354] hover:border-amber-500 bg-[#242a34] shadow-md flex items-center justify-between gap-3 cursor-pointer text-left"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#161920] border border-[#343c4b] flex items-center justify-center text-amber-400 shrink-0">
              <ZapOff className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold text-white">
                {isFr ? 'Coupure d’électricité (Blackout)' : 'Power Outage (Blackout)'}
              </div>
              <div className="text-xs text-zinc-400 truncate">
                {isFr ? 'Actions des 15 premières minutes & batterie 12V' : 'First 15 min checklist & 12V battery'}
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
        </button>

        <button
          onClick={() => onNavigate('settings')}
          className="p-4 rounded-xl border border-[#3a4354] hover:border-amber-500 bg-[#242a34] shadow-md flex items-center justify-between gap-3 cursor-pointer text-left"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#161920] border border-[#343c4b] flex items-center justify-center text-amber-400 shrink-0">
              <Settings className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold text-white">
                {isFr ? 'Réglages, Fiche Famille & Téléphone' : 'Settings, Family Sheet & Phone'}
              </div>
              <div className="text-xs text-zinc-400 truncate">
                {isFr ? 'Infos médicales du foyer, clé USB et QR Code mobile' : 'Family medical sheet, USB backup & QR Code'}
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
        </button>
      </div>
    </div>
  );
};
