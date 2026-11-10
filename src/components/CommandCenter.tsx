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

  return (
    <div className="max-w-6xl mx-auto space-y-6 min-w-0">
      {/* 1. EN-TÊTE SIMPLE ET CLAIR */}
      <div className="border border-neutral-800 bg-neutral-950 rounded-2xl p-5 sm:p-7 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-amber-500" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-black border-2 border-amber-500 p-2 shrink-0 flex items-center justify-center">
              <img
                src="./assets/aistudio/noir_233aab2b.png"
                alt="Logo Sentinel"
                className="w-full h-full object-contain invert"
              />
            </div>

            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-600/70 text-emerald-300 text-[11px] font-bold">
                ✓ {isFr ? '100% Hors-Ligne · Prêt sans Internet' : '100% Offline · Ready without Internet'}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-wider mt-1.5 leading-none">
                {isFr ? 'LE QG DU SENTINEL' : 'THE SENTINEL HQ'}
              </h1>
              <div className="text-sm sm:text-xl font-black text-amber-400 uppercase tracking-widest mt-1">
                {isFr ? 'LE QUARTIER GÉNÉRAL' : 'THE HEADQUARTERS'}
              </div>
            </div>
          </div>

          {/* Bouton d'installation visible uniquement sur Téléphone */}
          <button
            onClick={() => window.dispatchEvent(new Event('sentinel-open-mobile-install'))}
            className="md:hidden w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Smartphone className="w-4 h-4 shrink-0" />
            <span>{isFr ? '📲 Installer l’application sur ce téléphone' : '📲 Install App on This Phone'}</span>
          </button>
        </div>
      </div>

      {/* 2. LES 4 GRANDS BOUTONS ESSENTIELS (ULTRA-SIMPLES) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. CARTE */}
        <button
          onClick={() => onNavigate('tactical-map')}
          className="group text-left border-2 border-neutral-800 hover:border-sky-400 bg-neutral-950 hover:bg-neutral-900 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4 cursor-pointer transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-sky-300">
                {isFr ? '1. Carte : Eau, Hôpitaux & Forêts' : '1. Map: Water, Hospitals & Forests'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                {isFr
                  ? 'Trouver de l’eau potable, un lac, un hôpital ou une clinique, une forêt ou un émetteur radio autour de vous.'
                  : 'Find drinking water, lakes, hospitals/clinics, forests, or radio transmitters near you.'}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 text-xs font-bold text-sky-400">
            <span>💧 Eau · 🌊 Lacs · 🏥 Hôpitaux · 🌲 Forêts · 📡 Radio</span>
            <span className="flex items-center gap-1">
              {isFr ? 'Ouvrir' : 'Open'} <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </button>

        {/* 2. SECOURS & GUIDES */}
        <button
          onClick={() => onNavigate('emergency-docs')}
          className="group text-left border-2 border-neutral-800 hover:border-rose-400 bg-neutral-950 hover:bg-neutral-900 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4 cursor-pointer transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-rose-300">
                {isFr ? '2. Secours, Médicaments & Guides' : '2. First Aid, Meds & Guides'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                {isFr
                  ? 'Les gestes de premiers secours étape par étape, les doses de médicaments, le sac 72h et 16 guides pratiques.'
                  : 'Step-by-step first aid, medication dosages, 72h emergency bag, and 16 practical guides.'}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 text-xs font-bold text-rose-400">
            <span>🚑 8 Secours · 💊 Médicaments · 📖 16 Guides · 🎒 Sac 72h</span>
            <span className="flex items-center gap-1">
              {isFr ? 'Ouvrir' : 'Open'} <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </button>

        {/* 3. MES STOCKS */}
        <button
          onClick={() => onNavigate('stocks')}
          className="group text-left border-2 border-neutral-800 hover:border-emerald-400 bg-neutral-950 hover:bg-neutral-900 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4 cursor-pointer transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-emerald-300">
                {isFr ? '3. Mes Stocks (Eau, Vivres, Pharmacie)' : '3. My Stocks (Water, Food, Meds)'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                {isFr
                  ? 'Noter vos réserves à la maison ou dans votre sac et voir immédiatement ce qui arrive à péremption.'
                  : 'Track your home or bag supplies and see expiring items at a glance.'}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 text-xs font-bold text-emerald-400">
            <span>📦 Inventaire simple · 📅 Dates de péremption</span>
            <span className="flex items-center gap-1">
              {isFr ? 'Ouvrir' : 'Open'} <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </button>

        {/* 4. POSER UNE QUESTION */}
        <button
          onClick={() => onNavigate('survival-llm')}
          className="group text-left border-2 border-neutral-800 hover:border-amber-400 bg-neutral-950 hover:bg-neutral-900 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4 cursor-pointer transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-amber-300">
                {isFr ? '4. Poser une Question (Sans Internet)' : '4. Ask a Question (Offline AI)'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                {isFr
                  ? 'Un doute ? Écrivez votre question avec vos propres mots, l’assistant vous répond tout de suite hors-ligne.'
                  : 'Have a question? Type in plain words and get immediate offline guidance.'}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 text-xs font-bold text-amber-400">
            <span>💬 Réponse immédiate · 100% autonome</span>
            <span className="flex items-center gap-1">
              {isFr ? 'Ouvrir' : 'Open'} <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </button>
      </div>

      {/* 3. ACCÈS DIRECT AUX 8 URGENCES VITALES EN 1 CLIC */}
      <div className="border border-rose-800/60 bg-neutral-950 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center gap-2 text-rose-400 font-extrabold text-xs sm:text-sm uppercase">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>
            {isFr
              ? 'Urgence Médicale : Cliquez directement sur la situation'
              : 'Medical Emergency: Tap the situation directly'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {quickEmergencies.map(item => (
            <button
              key={item.id}
              onClick={() => handleOpenUrgencyDirect(item.id)}
              className="p-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/70 border border-rose-800/70 text-left flex items-center gap-2.5 cursor-pointer transition-colors"
            >
              <span className="text-xl shrink-0">{item.icon}</span>
              <span className="text-xs font-bold text-rose-100 leading-tight">
                {isFr ? item.labelFr : item.labelEn}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. ACCÈS SECONDAIRES (COUPURE DE COURANT & RÉGLAGES / PARTAGE TÉLÉPHONE) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('blackout')}
          className="p-4 rounded-xl border border-neutral-800 hover:border-amber-500/60 bg-neutral-950 flex items-center justify-between gap-3 cursor-pointer text-left"
        >
          <div className="flex items-center gap-3 min-w-0">
            <ZapOff className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold text-white">
                {isFr ? '⚡ Coupure d’électricité (Blackout)' : '⚡ Power Outage (Blackout)'}
              </div>
              <div className="text-xs text-stone-400 truncate">
                {isFr ? 'Checklist des 15 premières minutes & économie de batterie' : 'First 15 min checklist & battery saving'}
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
        </button>

        <button
          onClick={() => onNavigate('settings')}
          className="p-4 rounded-xl border border-neutral-800 hover:border-amber-500/60 bg-neutral-950 flex items-center justify-between gap-3 cursor-pointer text-left"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Settings className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold text-white">
                {isFr ? '⚙️ Réglages, Fiche Famille & QR Code Téléphone' : '⚙️ Settings, Family Sheet & Phone QR Code'}
              </div>
              <div className="text-xs text-stone-400 truncate">
                {isFr ? 'Infos médicales du foyer, sauvegarde USB et envoi sur téléphone' : 'Family medical info, USB backup & phone transfer'}
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
        </button>
      </div>
    </div>
  );
};
