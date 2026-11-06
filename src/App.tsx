import React, { useState, useEffect } from 'react';
import { NavTab, Language } from './types/sentinel';
import { Navbar } from './components/Navbar';
import { CommandCenter } from './components/CommandCenter';
import { SurvivalLLM } from './components/SurvivalLLM';
import { TacticalMap } from './components/TacticalMap';
import { DeployExporter } from './components/DeployExporter';
import { StockManager } from './components/StockManager';
import { BlackoutResilience } from './components/BlackoutResilience';
import { AboutSentinel } from './components/AboutSentinel';
import { SettingsPanel } from './components/SettingsPanel';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('command-center');
  const [language, setLanguage] = useState<Language>('fr');
  // ECO Power mode is enabled by default ("d'office en ECO Power")
  const [ecoMode, setEcoMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sentinel_eco_mode_v2');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sentinel_eco_mode_v2', JSON.stringify(ecoMode));
    } catch {}
  }, [ecoMode]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'fr' ? 'en' : 'fr'));
  };

  const toggleEcoMode = () => {
    setEcoMode(prev => !prev);
  };

  const isFr = language === 'fr';

  return (
    <div
      className={`min-h-screen w-full max-w-full overflow-x-hidden flex flex-col antialiased ${
        ecoMode
          ? 'eco-oled-theme bg-black text-stone-200 font-mono'
          : 'bg-slate-950 text-slate-100 font-sans field-webbing'
      }`}
    >
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        onToggleLanguage={toggleLanguage}
        ecoMode={ecoMode}
        onToggleEcoMode={toggleEcoMode}
      />

      {/* Main Viewport Container — Uses full width smoothly */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-7 min-w-0">
        {currentTab === 'command-center' && (
          <CommandCenter language={language} onNavigate={setCurrentTab} ecoMode={ecoMode} />
        )}

        {currentTab === 'tactical-map' && (
          <TacticalMap language={language} />
        )}

        {currentTab === 'emergency-docs' && (
          <DeployExporter language={language} />
        )}

        {currentTab === 'stocks' && (
          <StockManager language={language} />
        )}

        {currentTab === 'survival-llm' && (
          <SurvivalLLM language={language} />
        )}

        {currentTab === 'blackout' && (
          <BlackoutResilience language={language} />
        )}

        {currentTab === 'settings' && (
          <SettingsPanel
            language={language}
            onToggleLanguage={toggleLanguage}
            ecoMode={ecoMode}
            onToggleEcoMode={toggleEcoMode}
          />
        )}

        {currentTab === 'about' && (
          <AboutSentinel language={language} />
        )}
      </main>

      {/* Compact Air-Gapped Footer */}
      <footer
        className={`border-t py-3.5 text-xs ${
          ecoMode
            ? 'border-neutral-800 bg-black text-stone-400'
            : 'border-amber-800/30 bg-[#1a1712] text-slate-400'
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-4 h-4 rounded-sm bg-slate-900 border border-amber-500/60 p-0.5 flex items-center justify-center shrink-0">
              <img
                src="/assets/aistudio/noir_233aab2b.png"
                alt="Logo Sentinel"
                className="w-full h-full object-contain invert"
              />
            </div>
            <span className="font-semibold tracking-wider text-amber-200 truncate">
              LE QG · SENTINEL PACK SURVIE
            </span>
            <span className="text-amber-700 hidden sm:inline">·</span>
            <span className="hidden sm:inline text-[11px] truncate">
              {isFr ? 'Station autonome hors-ligne' : 'Autonomous offline station'}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="text-amber-400">
              {ecoMode ? '⚡ ECO POWER ACTIF' : 'MODE STANDARD'}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-semibold">
              {isFr ? 'Créé par LORN Digital Studio.' : 'Created by LORN Digital Studio.'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
