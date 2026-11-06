import React, { useState, useEffect } from 'react';
import { NavTab, Language } from '../types/sentinel';
import { MobileInstallModal } from './MobileInstallModal';
import {
  Radio,
  Cpu,
  BookOpen,
  MapPin,
  Package,
  Globe,
  ZapOff,
  Zap,
  Info,
  Settings,
  Smartphone,
  LayoutGrid,
  X
} from 'lucide-react';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  language: Language;
  onToggleLanguage: () => void;
  ecoMode: boolean;
  onToggleEcoMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onToggleLanguage,
  ecoMode,
  onToggleEcoMode
}) => {
  const isFr = language === 'fr';
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const openModalHandler = () => setIsMobileModalOpen(true);
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('sentinel-open-mobile-install', openModalHandler);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('sentinel-open-mobile-install', openModalHandler);
    };
  }, []);

  const handleTriggerInstallPrompt = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  const navItems: { id: NavTab; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    {
      id: 'command-center',
      label: isFr ? 'LE QG DU SENTINEL' : 'SENTINEL HQ',
      shortLabel: isFr ? 'Le QG' : 'HQ',
      icon: <Cpu className="w-4 h-4 shrink-0" />
    },
    {
      id: 'tactical-map',
      label: isFr ? 'Carte France' : 'France Map',
      shortLabel: isFr ? 'Carte/Eau' : 'Map',
      icon: <MapPin className="w-4 h-4 shrink-0" />
    },
    {
      id: 'emergency-docs',
      label: isFr ? 'Documentation d’Urgence' : 'Emergency Docs',
      shortLabel: isFr ? 'Secours' : 'Docs',
      icon: <BookOpen className="w-4 h-4 shrink-0" />
    },
    {
      id: 'stocks',
      label: isFr ? 'Stock de Survie' : 'Survival Stock',
      shortLabel: isFr ? 'Stocks' : 'Stocks',
      icon: <Package className="w-4 h-4 shrink-0" />
    },
    {
      id: 'survival-llm',
      label: isFr ? 'IA Survie' : 'Survival AI',
      shortLabel: isFr ? 'IA Survie' : 'AI',
      icon: <Radio className="w-4 h-4 shrink-0" />
    },
    {
      id: 'blackout',
      label: isFr ? 'Blackout' : 'Blackout',
      shortLabel: 'Blackout',
      icon: <ZapOff className="w-4 h-4 shrink-0" />
    },
    {
      id: 'settings',
      label: isFr ? 'Paramètres' : 'Settings',
      shortLabel: isFr ? 'Paramètres' : 'Settings',
      icon: <Settings className="w-4 h-4 shrink-0" />
    },
    {
      id: 'about',
      label: isFr ? 'Infos' : 'About',
      shortLabel: isFr ? 'Infos' : 'About',
      icon: <Info className="w-4 h-4 shrink-0" />
    }
  ];

  const primaryMobileTabs = navItems.slice(0, 4);
  const secondaryMobileTabs = navItems.slice(4);
  const isSecondaryActive = secondaryMobileTabs.some(t => t.id === currentTab);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b ${
          ecoMode
            ? 'bg-black/95 backdrop-blur-md border-neutral-800'
            : 'bg-[#1a1712]/95 backdrop-blur-md border-amber-800/40'
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto px-3 sm:px-6 lg:px-10 h-14 sm:h-15 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {/* Brand Logo */}
          <div
            onClick={() => {
              onSelectTab('command-center');
              setIsMobileDrawerOpen(false);
            }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer min-w-0 group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-neutral-950 border border-amber-500/70 p-1 flex items-center justify-center shrink-0 group-hover:border-amber-300">
              <img
                src="./assets/aistudio/noir_233aab2b.png"
                alt="Logo Sentinel Pack Survie"
                className="w-full h-full object-contain invert brightness-125"
              />
            </div>
            <div className="leading-tight min-w-0">
              <span className="text-xs sm:text-sm font-black tracking-[0.1em] text-amber-100 block uppercase truncate">
                {isFr ? 'LE QG DU SENTINEL' : 'THE SENTINEL HQ'}
              </span>
              <span className="text-[9.5px] sm:text-[11px] text-amber-400 font-extrabold font-mono block uppercase tracking-[0.12em] truncate">
                {isFr ? 'LE QUARTIER GÉNÉRAL' : 'THE HEADQUARTERS'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links — Wide, Spacious & Zero Overlap */}
          <nav className="hidden xl:flex items-center gap-1.5 min-w-0">
            {navItems.map(item => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-sm whitespace-nowrap cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-black font-bold border border-amber-400'
                      : ecoMode
                      ? 'text-stone-300 hover:text-amber-200 hover:bg-neutral-900 border border-transparent'
                      : 'text-slate-300 hover:text-amber-100 hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Mobile-ONLY Install button (Hidden on Desktop per user request), ECO Power & Language */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* ONLY visible on mobile screens (md:hidden) — hidden in Desktop mode */}
            <button
              onClick={() => setIsMobileModalOpen(true)}
              className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-mono font-bold bg-emerald-500 text-black cursor-pointer shadow-sm"
              title={isFr ? 'Installer sur ce téléphone' : 'Install on this phone'}
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span>{isFr ? 'Installer' : 'Install'}</span>
            </button>

            <button
              onClick={onToggleEcoMode}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-md sm:rounded-sm text-[11px] sm:text-xs font-mono border cursor-pointer ${
                ecoMode
                  ? 'bg-amber-950/90 border-amber-500 text-amber-300 font-bold'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-amber-100'
              }`}
              title={
                isFr
                  ? 'Mode ECO Power OLED (Activé d’office)'
                  : 'ECO Power OLED Mode (Enabled by default)'
              }
            >
              <Zap className={`w-3.5 h-3.5 ${ecoMode ? 'text-amber-400' : 'text-slate-500'}`} />
              <span className="hidden sm:inline">{ecoMode ? 'ECO POWER: ON' : 'ECO POWER: OFF'}</span>
              <span className="sm:hidden">{ecoMode ? 'ECO' : 'STD'}</span>
            </button>

            <button
              onClick={onToggleLanguage}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-md sm:rounded-sm border text-[11px] sm:text-xs font-mono cursor-pointer ${
                ecoMode
                  ? 'border-neutral-800 bg-neutral-950 text-stone-300 hover:border-amber-600'
                  : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-700'
              }`}
              title="FR / EN"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400 hidden sm:inline" />
              <span className="font-bold">{language.toUpperCase()}</span>
            </button>
          </div>
        </div>

        {/* Tablet-only Navigation Row (768px to 1279px) */}
        <div
          className={`hidden md:grid xl:hidden grid-cols-4 lg:grid-cols-8 gap-1.5 px-6 py-2 border-t ${
            ecoMode ? 'border-neutral-800 bg-black' : 'border-amber-800/30 bg-[#16130e]'
          }`}
        >
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs rounded-sm truncate cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black font-bold'
                    : 'text-stone-300 hover:text-amber-200 bg-neutral-950/80 border border-neutral-800/80'
                }`}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* NATIVE-STYLE MOBILE BOTTOM NAVIGATION BAR (Only on Mobile < 768px) */}
      <nav
        className={`md:hidden fixed bottom-0 inset-x-0 z-50 border-t px-2 py-1.5 grid grid-cols-5 gap-1 ${
          ecoMode
            ? 'bg-black/95 backdrop-blur-lg border-neutral-800'
            : 'bg-[#14110d]/95 backdrop-blur-lg border-amber-800/40'
        }`}
        style={{ paddingBottom: 'calc(0.375rem + env(safe-area-inset-bottom, 0px))' }}
      >
        {primaryMobileTabs.map(item => {
          const isActive = currentTab === item.id && !isMobileDrawerOpen;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                setIsMobileDrawerOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-black font-extrabold shadow-sm'
                  : 'text-stone-400 hover:text-amber-200'
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-0.5 leading-tight truncate max-w-full">
                {item.shortLabel}
              </span>
            </button>
          );
        })}

        {/* 5th Slot: "Plus / Menu" Drawer Toggle */}
        <button
          onClick={() => setIsMobileDrawerOpen(prev => !prev)}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-colors cursor-pointer ${
            isMobileDrawerOpen || isSecondaryActive
              ? 'bg-amber-500 text-black font-extrabold'
              : 'text-stone-400 hover:text-amber-200'
          }`}
        >
          {isMobileDrawerOpen ? <X className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          <span className="text-[10px] mt-0.5 leading-tight">
            {isFr ? 'Plus' : 'More'}
          </span>
        </button>
      </nav>

      {/* MOBILE BOTTOM SHEET DRAWER FOR SECONDARY TABS */}
      {isMobileDrawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-xs flex flex-col justify-end pb-16"
          onClick={() => setIsMobileDrawerOpen(false)}
        >
          <div
            className="bg-neutral-950 border-t-2 border-amber-500 rounded-t-2xl p-4 space-y-3 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                {isFr ? 'Menu Tactique · Le QG du Sentinel' : 'Tactical Menu · Sentinel HQ'}
              </span>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 rounded-md bg-neutral-900 text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {secondaryMobileTabs.map(item => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      setIsMobileDrawerOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs font-bold cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-black border-amber-400'
                        : 'bg-black text-stone-200 border-neutral-800'
                    }`}
                  >
                    <div className={isActive ? 'text-black' : 'text-amber-400'}>{item.icon}</div>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setIsMobileDrawerOpen(false);
                setIsMobileModalOpen(true);
              }}
              className="w-full py-3 px-4 rounded-xl bg-emerald-500 text-black font-mono text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-4 h-4 shrink-0" />
              <span>
                {isFr
                  ? '📲 Installer / Télécharger l’App Hors-Ligne sur ce Téléphone'
                  : '📲 Install / Download Offline App on This Phone'}
              </span>
            </button>
          </div>
        </div>
      )}

      <MobileInstallModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        language={language}
        deferredPrompt={deferredPrompt}
        onTriggerInstallPrompt={handleTriggerInstallPrompt}
      />
    </>
  );
};
