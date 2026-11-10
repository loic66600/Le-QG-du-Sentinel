import React from 'react';
import { Language } from '../types/sentinel';
import {
  Shield,
  BatteryCharging,
  HardDrive,
  EyeOff,
  AlertTriangle,
  Award
} from 'lucide-react';

interface AboutSentinelProps {
  language: Language;
}

export const AboutSentinel: React.FC<AboutSentinelProps> = ({ language }) => {
  const isFr = language === 'fr';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Hero Presentation Card */}
      <div className="bg-[#242a34] border border-[#3a4354] rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Sentinel Photo & Official Shield Logo */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-xl relative bg-[#161920]">
                <img
                  src="./assets/aistudio/Gemini_Generated_Image_rj42pxrj42pxrj42__1__6782cdbc.png"
                  alt="Opérateur Sentinelle"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-black font-bold">
                    SENTINELLE #01
                  </span>
                  <span className="text-amber-300 flex items-center gap-1 bg-[#161920]/90 px-2 py-0.5 rounded border border-[#3a4354]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    OPÉRATIONNEL
                  </span>
                </div>
              </div>

              <div className="absolute -top-3 -right-3 w-14 h-14 rounded-xl bg-[#161920] border-2 border-amber-500/80 p-1.5 shadow-xl flex items-center justify-center">
                <img
                  src="./assets/aistudio/noir_233aab2b.png"
                  alt="Logo Sentinel"
                  className="w-full h-full object-contain invert"
                />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white tracking-wide">
                {isFr ? 'LE QG DU SENTINEL' : 'THE SENTINEL HQ'}
              </h3>
              <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                {isFr ? 'Le Quartier Général Autonome Hors-Ligne' : 'Autonomous Offline Headquarters'}
              </p>
            </div>
          </div>

          {/* Right Column: Mission Briefing */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>{isFr ? 'Mission & Philosophie' : 'Mission & Philosophy'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isFr ? 'La Simplicité comme Arme de Survie' : 'Simplicity as a Survival Weapon'}
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed">
              {isFr
                ? 'Le QG du Sentinel a été conçu selon un impératif fondamental : aucun superflu, une clarté immédiate et des outils 100% prêts sans connexion Internet. En cas de coupure électrique ou de rupture des réseaux, tout reste accessible sur votre téléphone ou votre ordinateur.'
                : 'The Sentinel HQ was engineered around a core principle: zero fluff, immediate clarity, and tools 100% ready without Internet.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 bg-[#161920] border border-[#3a4354] rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <EyeOff className="w-4 h-4" />
                  <span>{isFr ? 'Zéro Pistage' : 'Zero Telemetry'}</span>
                </div>
                <p className="text-xs text-zinc-400">
                  {isFr
                    ? 'Aucun cookie, aucun compte requis, aucune donnée envoyée sur Internet.'
                    : 'Zero tracking, zero account required, zero external network requests.'}
                </p>
              </div>

              <div className="p-3.5 bg-[#161920] border border-[#3a4354] rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <BatteryCharging className="w-4 h-4" />
                  <span>{isFr ? 'Économie de Batterie' : 'Low Power'}</span>
                </div>
                <p className="text-xs text-zinc-400">
                  {isFr
                    ? 'Interface sombre reposante optimisée pour économiser la batterie de votre téléphone.'
                    : 'Dark slate interface optimized to preserve phone and laptop battery.'}
                </p>
              </div>

              <div className="p-3.5 bg-[#161920] border border-[#3a4354] rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <HardDrive className="w-4 h-4" />
                  <span>{isFr ? '100% sur Votre Appareil' : '100% On-Device'}</span>
                </div>
                <p className="text-xs text-zinc-400">
                  {isFr
                    ? 'Vos stocks, votre fiche famille et vos repères sur la carte restent enregistrés dans votre appareil.'
                    : 'Your stocks, family profile, and map points stay stored on your device.'}
                </p>
              </div>

              <div className="p-3.5 bg-[#161920] border border-[#3a4354] rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                  <Shield className="w-4 h-4" />
                  <span>{isFr ? 'Documentation Complète' : 'Complete Documentation'}</span>
                </div>
                <p className="text-xs text-zinc-400">
                  {isFr
                    ? '8 fiches de premiers secours, 16 guides pratiques, médicaments et carte de France intégrés.'
                    : '8 first aid sheets, 16 practical guides, medications, and France map built-in.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimers & Responsibilities */}
      <div className="border border-[#3a4354] rounded-2xl bg-[#242a34] p-5 space-y-2 text-xs shadow-md">
        <div className="flex items-center gap-2 text-amber-400 font-bold uppercase">
          <AlertTriangle className="w-4 h-4" />
          <span>{isFr ? 'Avertissement Médical' : 'Medical Disclaimer'}</span>
        </div>
        <p className="text-zinc-300 leading-relaxed">
          {isFr
            ? 'Les informations de secourisme, de traitement de l’eau et de médicaments sont fournies pour la préparation et les situations d’isolement. Lorsque les secours (15 / 18 / 112) sont joignables, appelez-les toujours en priorité.'
            : 'First aid, water treatment, and medication guides are provided for preparedness and isolated emergencies. Always call emergency services (112 / 911) first when reachable.'}
        </p>
      </div>

      {/* Attribution Footer Card */}
      <div className="border border-[#3a4354] rounded-2xl bg-[#242a34] p-6 text-center space-y-2 shadow-md">
        <div className="w-12 h-12 mx-auto rounded-xl bg-[#161920] border border-amber-500/50 p-1.5 flex items-center justify-center">
          <img
            src="./assets/aistudio/noir_233aab2b.png"
            alt="Logo Sentinel"
            className="w-full h-full object-contain invert"
          />
        </div>
        <h4 className="text-base font-bold text-white tracking-wider">
          LE QG DU SENTINEL
        </h4>
        <div className="pt-1">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#161920] border border-[#3a4354] text-amber-400 font-bold text-xs">
            {isFr ? 'Créé par LORN Digital Studio.' : 'Created by LORN Digital Studio.'}
          </span>
        </div>
      </div>
    </div>
  );
};
