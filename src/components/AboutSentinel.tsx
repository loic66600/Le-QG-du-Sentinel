import React from 'react';
import { Language } from '../types/sentinel';
import { 
  Shield, 
  Terminal, 
  BatteryCharging, 
  Cpu, 
  HardDrive, 
  CheckCircle2, 
  Lock, 
  EyeOff, 
  AlertTriangle,
  Award,
  Zap,
  Radio
} from 'lucide-react';

interface AboutSentinelProps {
  language: Language;
}

export const AboutSentinel: React.FC<AboutSentinelProps> = ({ language }) => {
  const isFr = language === 'fr';

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Hero Presentation Card */}
      <div className="bg-[#221e16] border border-amber-800/40 rounded-md p-6 sm:p-10 overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Sentinel Photo & Official Shield Logo */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
            <div className="relative group">
              {/* Photo du Sentinelle */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-2xl shadow-amber-950/40 relative bg-slate-900">
                <img 
                  src="/assets/aistudio/Gemini_Generated_Image_rj42pxrj42pxrj42__1__6782cdbc.png" 
                  alt="Opérateur Sentinelle" 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold">
                    SENTINELLE #01
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    OPÉRATIONNEL
                  </span>
                </div>
              </div>

              {/* Official SU Shield Logo Floating Badge */}
              <div className="absolute -top-3 -right-3 w-14 h-14 rounded-xl bg-slate-950 border-2 border-amber-500/70 p-1 shadow-xl flex items-center justify-center">
                <img 
                  src="/assets/aistudio/noir_233aab2b.png" 
                  alt="Logo SU" 
                  className="w-full h-full object-contain invert"
                />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white tracking-wide font-mono">
                {isFr ? 'L’OPÉRATEUR SENTINELLE' : 'THE SENTINEL OPERATOR'}
              </h3>
              <p className="text-xs text-amber-400 font-mono">
                {isFr ? 'Autonomie · Résilience Numérique · Survie Air-Gap' : 'Autonomous · Digital Resilience · Air-Gap Ready'}
              </p>
            </div>
          </div>

          {/* Right Column: Mission Briefing */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-500 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>{isFr ? 'Mission & Philosophie' : 'Mission & Philosophy'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isFr 
                ? 'La Simplicité comme Arme de Survie' 
                : 'Simplicity as a Survival Weapon'}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              {isFr
                ? 'Sentinel Pack Survie a été conçu selon un impératif fondamental : aucun superflu, une clarté absolue, et des packs 100% prêts à être déployés. En situation de crise, de blackout électrique ou de rupture des télécommunications, la complexité est un point de défaillance.'
                : 'Sentinel Survival Pack was engineered around a core doctrine: zero fluff, absolute clarity, and packs 100% ready to deploy. During blackouts, crisis, or telecom collapse, complexity is a point of failure.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
                  <EyeOff className="w-4 h-4" />
                  <span>{isFr ? 'Zéro Télémétrie' : 'Zero Telemetry'}</span>
                </div>
                <p className="text-xs text-slate-400">
                  {isFr 
                    ? 'Aucun cookie, aucun mouchard, aucun appel vers des serveurs distants. Conforme au principe de l’air-gap étanche.' 
                    : 'Zero tracking, zero analytics, zero external network requests. Complete air-gap conformity.'}
                </p>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                  <BatteryCharging className="w-4 h-4" />
                  <span>{isFr ? 'Basse Consommation' : 'Ultra-Low Power'}</span>
                </div>
                <p className="text-xs text-slate-400">
                  {isFr 
                    ? 'Mode OLED noir absolu désactivant les pixels écran. Optimisé pour tourner sur batterie 12V, solaire ou mini-PC.' 
                    : 'Pure black OLED power mode shuts off screen pixels. Tailored for 12V battery, solar, or SBC operation.'}
                </p>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
                  <HardDrive className="w-4 h-4" />
                  <span>{isFr ? '100% Local-First' : '100% Local-First'}</span>
                </div>
                <p className="text-xs text-slate-400">
                  {isFr 
                    ? 'Vos fiches, repères GPS, conversations d’urgence et documents sont stockés directement sur votre matériel.' 
                    : 'Your waypoints, triage notes, emergency chat, and maps remain strictly stored on your device.'}
                </p>
              </div>

              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
                  <Shield className="w-4 h-4" />
                  <span>{isFr ? 'Documentation Intégrée' : 'Built-in Documentation'}</span>
                </div>
                <p className="text-xs text-slate-400">
                  {isFr 
                    ? 'Bibliothèque de 16 manuels de survie mis en page + 23 archives PDF/ZIM prêts à lire ou télécharger.' 
                    : 'Library of 16 formatted survival manuals + 23 PDF/ZIM archives ready to read or download.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimers & Responsibilities (Medical & Security) */}
      <div className="border border-slate-800 rounded-xl bg-slate-900/40 p-6 space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-bold uppercase">
          <AlertTriangle className="w-4 h-4" />
          <span>{isFr ? 'Avertissement Médical et Décharge de Responsabilité' : 'Medical & Emergency Disclaimer'}</span>
        </div>
        <p className="text-slate-400 leading-relaxed">
          {isFr
            ? 'Les données incluses (guides de secourisme TCCC, médecine d’urgence de montagne, traitement de l’eau et cartographie) sont fournies à titre strictement indicatif pour la préparation à la résilience et l’auto-formation. Elles ne se substituent en aucun cas à un diagnostic médical professionnel ou aux secours institutionnels lorsque ceux-ci sont joignables.'
            : 'Information provided (TCCC trauma guides, wilderness medicine, water purification, and mapping) is intended solely for resilience preparedness and self-education. It is not a substitute for professional medical care or emergency services when reachable.'}
        </p>
      </div>

      {/* Mandatory Attribution Footer Card */}
      <div className="border-2 border-amber-500/30 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 text-center space-y-2">
        <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 border border-amber-500/40 p-1 flex items-center justify-center">
          <img 
            src="/assets/aistudio/noir_233aab2b.png" 
            alt="Logo Sentinel" 
            className="w-full h-full object-contain invert"
          />
        </div>
        <h4 className="text-base font-bold text-white font-mono tracking-wider">
          SENTINEL PACK SURVIE
        </h4>
        <p className="text-xs text-slate-400 max-w-xl mx-auto font-sans">
          {isFr
            ? 'Architecture numérique de résilience autonome conçue pour traverser les crises sans dépendance extérieure.'
            : 'Autonomous digital resilience system engineered to withstand crises without external reliance.'}
        </p>
        <div className="pt-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-mono font-bold text-xs">
            {isFr ? 'Créé par LORN Digital Studio.' : 'Created by LORN Digital Studio.'}
          </span>
        </div>
      </div>
    </div>
  );
};
