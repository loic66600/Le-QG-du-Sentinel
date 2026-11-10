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
    <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col antialiased bg-[#181c23] text-zinc-100 font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        language={language}
        onToggleLanguage={toggleLanguage}
        ecoMode={ecoMode}
        onToggleEcoMode={toggleEcoMode}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pt-3.5 sm:pt-6 pb-24 md:pb-8 min-w-0">
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

      {/* Compact Footer */}
      <footer className="border-t border-[#2f3644] bg-[#14171d] py-3.5 mb-14 md:mb-0 text-xs text-zinc-400">
        <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-4 h-4 rounded-sm bg-[#242a34] border border-amber-500/60 p-0.5 flex items-center justify-center shrink-0">
              <img
                src="./assets/aistudio/noir_233aab2b.png"
                alt="Logo Sentinel"
                className="w-full h-full object-contain invert"
              />
            </div>
            <span className="font-bold tracking-wider text-zinc-200 truncate">
              LE QG DU SENTINEL
            </span>
            <span className="text-zinc-600 hidden sm:inline">·</span>
            <span className="hidden sm:inline text-[11px] truncate">
              {isFr ? 'Le Quartier Général autonome hors-ligne' : 'Autonomous offline headquarters'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <button
              onClick={() => setCurrentTab('about')}
              className="text-zinc-300 hover:text-amber-400 underline cursor-pointer"
            >
              {isFr ? 'À propos' : 'About'}
            </button>
            <span className="text-zinc-600">·</span>
            <span className="text-amber-400 font-semibold">
              {isFr ? 'Créé par LORN Digital Studio.' : 'Created by LORN Digital Studio.'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
