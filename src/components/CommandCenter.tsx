import React from 'react';
import { Language, NavTab } from '../types/sentinel';
import {
  ArrowRight,
  MapPin,
  ZapOff,
  Settings,
  Package,
  HeartPulse,
  MessageSquare,
  Smartphone,
  ShieldAlert
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

  const handleOpenUrgencyDirect = (urgencyId: string) => {
    try {
      sessionStorage.setItem('sentinel_open_urgency_id', urgencyId);
    } catch {}
    onNavigate('emergency-docs');
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
      titleFr: '4. Poser une Question (Hors-Ligne)',
      titleEn: '4. Ask a Question (Offline)',
      descFr: 'Écrivez votre problème avec vos mots : l’assistant vous donne la marche à suivre sans Internet.',
      descEn: 'Type your problem in plain words and get immediate offline guidance.',
      metaFr: 'Réponse immédiate · 100% autonome',
      metaEn: 'Immediate answer · 100% autonomous',
      icon: <MessageSquare className="w-5 h-5" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 min-w-0">
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

      {/* 2. LES 4 GRANDES CARTES PRINCIPALES (SOBRES, BIEN DÉTACHÉES DU FOND) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {mainModules.map(mod => (
          <button
            key={mod.id}
            onClick={() => onNavigate(mod.id)}
            className="group text-left border border-[#3a4354] hover:border-amber-500 bg-[#242a34] hover:bg-[#2a313d] rounded-2xl p-4 sm:p-6 flex flex-col justify-between gap-4 cursor-pointer transition-all shadow-lg shadow-black/25"
          >
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#161920] border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
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
                {isFr ? 'Ouvrir' : 'Open'} <ArrowRight className="w-4 h-4" />
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
