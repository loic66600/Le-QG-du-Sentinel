import React, { useState } from 'react';
import { Language, NavTab } from '../types/sentinel';
import { SUPPLY_DEPOT_PACKS } from '../data/supplyDepotPacks';
import {
  CheckCircle2,
  ArrowRight,
  BookOpen,
  MapPin,
  ZapOff,
  Radio,
  Download,
  Settings,
  Package,
  HeartPulse,
  Droplet,
  FlameKindling,
  ShieldAlert,
  Smartphone
} from 'lucide-react';

interface CommandCenterProps {
  language: Language;
  onNavigate: (tab: NavTab) => void;
  ecoMode?: boolean;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  language,
  onNavigate,
  ecoMode = true
}) => {
  const isFr = language === 'fr';
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleDownloadPackById = (packId: string) => {
    const pack = SUPPLY_DEPOT_PACKS.find(p => p.id === packId);
    if (!pack) return;
    const blob = new Blob([pack.contentFr], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = pack.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadToast(isFr ? `Pack « ${pack.titleFr} » téléchargé` : `Pack "${pack.titleEn}" downloaded`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  return (
    <div className="space-y-6 min-w-0">
      {/* 1. LE QG — LARGE BOLD HEADER */}
      <div
        className={`border rounded-lg p-5 sm:p-6 relative overflow-hidden ${
          ecoMode
            ? 'bg-neutral-950 border-neutral-800'
            : 'bg-[#221e16] border-amber-800/40'
        }`}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-amber-500" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-16 h-16 rounded-md bg-black border-2 border-amber-500 p-2 shrink-0 flex items-center justify-center shadow-lg">
              <img
                src="/assets/aistudio/noir_233aab2b.png"
                alt="Logo Sentinel"
                className="w-full h-full object-contain invert"
              />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
                <span className="font-bold">SENTINEL PACK SURVIE</span>
                <span className="text-neutral-600">·</span>
                <span className="px-2 py-0.5 rounded-sm bg-amber-950/90 border border-amber-600 text-amber-300 font-bold text-[10px]">
                  {ecoMode ? 'ECO POWER OLED ACTIF' : 'MODE STANDARD'}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-50 uppercase tracking-widest mt-1 leading-none">
                {isFr ? 'LE QG DU SENTINEL' : 'THE SENTINEL HQ'}
              </h1>
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-400 uppercase tracking-[0.15em] mt-1.5 leading-tight">
                {isFr ? 'LE QUARTIER GÉNÉRAL' : 'THE HEADQUARTERS'}
              </div>
              <p className="text-xs sm:text-sm text-stone-300 mt-1.5">
                {isFr
                  ? 'Quartier Général Autonome : Eau potable & Hôpitaux de France, Documentation d’Urgence (8 Secours + 72h), Stocks de Survie & IA.'
                  : 'Autonomous HQ: France Water & Hospitals Map, Emergency Documentation (8 First Aid + 72h), Survival Stocks & Local AI.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => window.dispatchEvent(new Event('sentinel-open-mobile-install'))}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs rounded-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40"
            >
              <Smartphone className="w-4 h-4" />
              <span>{isFr ? '📲 Installer sur Téléphone' : '📲 Install on Phone'}</span>
            </button>
            <button
              onClick={() => onNavigate('tactical-map')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-sm flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>{isFr ? 'Carte Eau & Hôpitaux' : 'Water & Hospitals Map'}</span>
            </button>
            <button
              onClick={() => onNavigate('emergency-docs')}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-amber-200 border border-amber-700/60 font-bold text-xs rounded-sm flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{isFr ? 'Documentation d’Urgence' : 'Emergency Docs'}</span>
            </button>
            <button
              onClick={() => onNavigate('stocks')}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-emerald-300 border border-emerald-700/60 font-bold text-xs rounded-sm flex items-center gap-2 cursor-pointer"
            >
              <Package className="w-4 h-4 text-emerald-400" />
              <span>{isFr ? 'Stock de Survie' : 'Survival Stocks'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN MODULES GRID (6 Spacious Cards with Short Descriptions) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Module 1: Carte Tactique, Eau Potable & Hôpitaux/Cliniques */}
        <div
          onClick={() => onNavigate('tactical-map')}
          className={`group cursor-pointer border rounded-lg p-5 flex flex-col justify-between ${
            ecoMode
              ? 'bg-neutral-950 border-neutral-800 hover:border-amber-500'
              : 'bg-[#221e16] border-slate-800 hover:border-amber-500/70'
          }`}
        >
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 rounded-md bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-black border border-neutral-800 text-sky-300 font-bold">
                💧 EAU POTABLE & 🏥 HÔPITAUX
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400">
                {isFr ? 'Carte de France (Eau & Hôpitaux)' : 'France Map (Water & Hospitals)'}
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                {isFr
                  ? 'Points d’eau potable existants, hôpitaux normaux et cliniques de France avec regroupement automatique au zoom.'
                  : 'Drinking water points, general hospitals, and clinics across France with dynamic zoom clustering.'}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-amber-400">
            <span>{isFr ? 'Ouvrir la Carte' : 'Open Map'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Module 2: Documentation d'Urgence (Fusion Outils 72h + 8 Secours + 16 Manuels) */}
        <div
          onClick={() => onNavigate('emergency-docs')}
          className={`group cursor-pointer border rounded-lg p-5 flex flex-col justify-between ${
            ecoMode
              ? 'bg-neutral-950 border-neutral-800 hover:border-amber-500'
              : 'bg-[#221e16] border-slate-800 hover:border-amber-500/70'
          }`}
        >
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 rounded-md bg-rose-500/10 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <HeartPulse className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-black border border-neutral-800 text-rose-300 font-bold">
                8 URGENCES + SAC 72H + 16 MANUELS
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400">
                {isFr ? 'Documentation d’Urgence' : 'Emergency Documentation'}
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                {isFr
                  ? 'Premiers secours complets (malaise cardiaque, inconscience, hémorragie, étouffement, brûlure, noyade, coup de chaud, morsure), Sac 72h & 16 manuels.'
                  : 'Complete first aid (cardiac, unconsciousness, bleeding, choking, burns, drowning, heatstroke, bites), 72h bag & 16 manuals.'}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-amber-400">
            <span>{isFr ? 'Ouvrir la Documentation d’Urgence' : 'Open Emergency Docs'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Module 3: Stock de Survie (Multi-listes, Quantités & Dates de péremption) */}
        <div
          onClick={() => onNavigate('stocks')}
          className={`group cursor-pointer border rounded-lg p-5 flex flex-col justify-between ${
            ecoMode
              ? 'bg-neutral-950 border-neutral-800 hover:border-amber-500'
              : 'bg-[#221e16] border-slate-800 hover:border-amber-500/70'
          }`}
        >
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 rounded-md bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-black border border-neutral-800 text-emerald-400 font-bold">
                MULTI-LISTES & EXPIRATION
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400">
                {isFr ? 'Stock de Survie & Inventaires' : 'Survival Stock & Inventories'}
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                {isFr
                  ? 'Créez plusieurs listes de stocks, gérez le nombre de produits, les quantités exactes et le suivi des dates d’expiration.'
                  : 'Create multiple stock lists, track product counts, quantities, and expiration dates.'}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-amber-400">
            <span>{isFr ? 'Gérer mes Stocks' : 'Manage Stocks'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Module 4: Conseiller IA de Survie */}
        <div
          onClick={() => onNavigate('survival-llm')}
          className={`group cursor-pointer border rounded-lg p-5 flex flex-col justify-between ${
            ecoMode
              ? 'bg-neutral-950 border-neutral-800 hover:border-amber-500'
              : 'bg-[#221e16] border-slate-800 hover:border-amber-500/70'
          }`}
        >
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 rounded-md bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Radio className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-black border border-neutral-800 text-emerald-400">
                100% HORS-LIGNE
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400">
                {isFr ? 'Assistant IA de Survie' : 'Survival AI Advisor'}
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                {isFr
                  ? 'Posez vos questions urgentes hors-ligne : premiers secours, eau potable, hypothermie et abri.'
                  : 'Ask urgent offline survival questions: first aid, safe water, hypothermia, and shelter.'}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-amber-400">
            <span>{isFr ? 'Poser une Question' : 'Open AI Advisor'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Module 5: Survie Sans Courant (Blackout) */}
        <div
          onClick={() => onNavigate('blackout')}
          className={`group cursor-pointer border rounded-lg p-5 flex flex-col justify-between ${
            ecoMode
              ? 'bg-neutral-950 border-neutral-800 hover:border-amber-500'
              : 'bg-[#221e16] border-slate-800 hover:border-amber-500/70'
          }`}
        >
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 rounded-md bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <ZapOff className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-black border border-neutral-800 text-amber-400">
                ÉNERGIE & 12V
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400">
                {isFr ? 'Autonomie Sans Courant' : 'Blackout Power Guide'}
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                {isFr
                  ? 'Économiser vos batteries, brancher une batterie 12V de voiture et imprimer le mémo papier.'
                  : 'Save battery life, wire a 12V car battery safely, and print your emergency sheet.'}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-amber-400">
            <span>{isFr ? 'Gérer l’Énergie' : 'Manage Power'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Module 6: Paramètres, Moniteur Système & Mémoire Familiale */}
        <div
          onClick={() => onNavigate('settings')}
          className={`group cursor-pointer border rounded-lg p-5 flex flex-col justify-between ${
            ecoMode
              ? 'bg-neutral-950 border-neutral-800 hover:border-amber-500'
              : 'bg-[#221e16] border-slate-800 hover:border-amber-500/70'
          }`}
        >
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="w-10 h-10 rounded-md bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Settings className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-black border border-neutral-800 text-stone-300">
                CPU · RAM · BATTERIE · RÉSEAU
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400">
                {isFr ? 'Paramètres & État Système' : 'Settings & System Monitor'}
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                {isFr
                  ? 'Moniteur temps réel (Processeur, RAM, Alimentation, Réseau), fiche médicale familiale et sauvegarde clé USB.'
                  : 'Real-time monitor (CPU, RAM, Power, Network), family medical sheet, and USB backup.'}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-amber-400">
            <span>{isFr ? 'Ouvrir les Paramètres' : 'Open Settings'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 3. SLEEK EMERGENCY QUICK-ACTION (8 VITAL EMERGENCIES + DIRECT SURVIVAL PACK DOWNLOADS) */}
      <div
        className={`border rounded-md p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-3 ${
          ecoMode
            ? 'bg-neutral-950 border-neutral-800'
            : 'bg-slate-900/60 border-slate-800'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-rose-400 uppercase text-[11px] font-bold flex items-center gap-1 mr-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{isFr ? 'Premiers Secours (8 Urgences) :' : 'First Aid (8 Emergencies):'}</span>
          </span>
          {[
            '🫀 Malaise cardiaque',
            '🛌 Inconscience (PLS)',
            '🩸 Hémorragie',
            '🫁 Étouffement',
            '🔥 Brûlure',
            '🌊 Noyade',
            '☀️ Coup de chaud',
            '🐍 Piqûre / Morsure'
          ].map((label, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate('emergency-docs')}
              className="px-2.5 py-1.5 rounded-sm bg-rose-950/50 hover:bg-rose-900/70 border border-rose-800/70 text-rose-100 text-[11px] cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono shrink-0">
          <span className="text-stone-400 uppercase text-[11px]">
            {isFr ? 'Packs 1-Clic :' : 'Quick Packs:'}
          </span>
          <button
            onClick={() => handleDownloadPackById('pack-tccc-first-aid')}
            className="px-2.5 py-1.5 rounded-sm bg-amber-500/15 hover:bg-amber-500/25 border border-amber-600/50 text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3 h-3" />
            <span>{isFr ? 'Secours (8 Urgences)' : 'First Aid'}</span>
          </button>
          <button
            onClick={() => handleDownloadPackById('pack-water-purification')}
            className="px-2.5 py-1.5 rounded-sm bg-amber-500/15 hover:bg-amber-500/25 border border-amber-600/50 text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3 h-3" />
            <span>{isFr ? 'Eau Potable' : 'Safe Water'}</span>
          </button>
        </div>
      </div>

      {/* Floating Download Toast */}
      {downloadToast && (
        <div className="fixed bottom-5 right-5 z-[9999] bg-neutral-950 border border-emerald-500 text-emerald-300 px-3.5 py-2 rounded-md shadow-xl font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadToast}</span>
        </div>
      )}
    </div>
  );
};
