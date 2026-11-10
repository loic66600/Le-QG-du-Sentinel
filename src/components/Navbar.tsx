import React, { useState, useEffect } from 'react';
import { NavTab, Language } from '../types/sentinel';
import { MobileInstallModal } from './MobileInstallModal';
import {
  Sparkles,
  Home,
  HeartPulse,
  MapPin,
  Package,
  Globe,
  ZapOff,
  Settings,
  Smartphone,
  LayoutGrid,
  X,
  Info
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
  ecoMode
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

  const navItems: { id: NavTab; label: string; shortLabel: string; icon: React.ReactNode; isAi?: boolean }[] = [
    {
      id: 'command-center',
      label: isFr ? 'Accueil' : 'Home',
      shortLabel: isFr ? 'Accueil' : 'Home',
      icon: <Home className="w-4 h-4 shrink-0" />
    },
    {
      id: 'tactical-map',
      label: isFr ? 'Carte & Eau' : 'Map & Water',
      shortLabel: isFr ? 'Carte' : 'Map',
      icon: <MapPin className="w-4 h-4 shrink-0" />
    },
    {
      id: 'emergency-docs',
      label: isFr ? 'Secours & Guides' : 'First Aid & Guides',
      shortLabel: isFr ? 'Secours' : 'First Aid',
      icon: <HeartPulse className="w-4 h-4 shrink-0" />
    },
    {
      id: 'survival-llm',
      label: isFr ? 'Questionner l’IA' : 'Ask the AI',
      shortLabel: isFr ? 'Questionner l’IA' : 'Ask AI',
      icon: <Sparkles className="w-4 h-4 shrink-0" />,
      isAi: true
    },
    {
      id: 'stocks',
      label: isFr ? 'Mes Stocks' : 'My Stocks',
      shortLabel: isFr ? 'Stocks' : 'Stocks',
      icon: <Package className="w-4 h-4 shrink-0" />
    },
    {
      id: 'blackout',
      label: isFr ? 'Sans Courant' : 'No Power',
      shortLabel: isFr ? 'Énergie' : 'Power',
      icon: <ZapOff className="w-4 h-4 shrink-0" />
    },
    {
      id: 'settings',
      label: isFr ? 'Réglages' : 'Settings',
      shortLabel: isFr ? 'Réglages' : 'Settings',
      icon: <Settings className="w-4 h-4 shrink-0" />
    }
  ];

  const primaryMobileTabs = navItems.slice(0, 4);
  const secondaryMobileTabs = [
    ...navItems.slice(4),
    {
      id: 'about' as NavTab,
      label: isFr ? 'À propos' : 'About',
      shortLabel: isFr ? 'Infos' : 'Info',
      icon: <Info className="w-4 h-4 shrink-0" />
    }
  ];
  const isSecondaryActive = secondaryMobileTabs.some(t => t.id === currentTab);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#343c4b] bg-[#14171d]/95 backdrop-blur-md">
        <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3 min-w-0">
          {/* Brand Logo */}
          <div
            onClick={() => {
              onSelectTab('command-center');
              setIsMobileDrawerOpen(false);
            }}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer min-w-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#242a34] border border-amber-500/70 p-1 flex items-center justify-center shrink-0 group-hover:border-amber-300">
              <img
                src="./assets/aistudio/noir_233aab2b.png"
                alt="Logo Le QG du Sentinel"
                className="w-full h-full object-contain invert brightness-125"
              />
            </div>
            <div className="leading-tight min-w-0">
              <span className="text-xs sm:text-sm font-black tracking-wider text-white block uppercase truncate">
                {isFr ? 'LE QG DU SENTINEL' : 'THE SENTINEL HQ'}
              </span>
              <span className="text-[10px] sm:text-[11px] text-amber-400 font-extrabold block uppercase tracking-widest truncate">
                {isFr ? 'LE QUARTIER GÉNÉRAL' : 'THE HEADQUARTERS'}
              </span>
            </div>
          </div>

          {/* Desktop Navigation — Simple, Clean, Easy to Read */}
          <nav className="hidden lg:flex items-center gap-1.5 min-w-0">
            {navItems.map(item => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg whitespace-nowrap cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-black shadow-sm'
                      : item.isAi
                      ? 'bg-[#242a34] text-amber-300 border border-amber-500/70 hover:bg-amber-500 hover:text-black'
                      : 'text-zinc-300 hover:text-white hover:bg-[#242a34]'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Mobile Install Button (hidden on desktop) + Language */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsMobileModalOpen(true)}
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold bg-amber-500 text-black cursor-pointer shadow-sm"
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span>{isFr ? 'Installer' : 'Install'}</span>
            </button>

            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#3a4354] bg-[#242a34] text-zinc-200 hover:border-amber-500 text-xs font-bold cursor-pointer"
              title="FR / EN"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>
        </div>

        {/* Tablet Navigation Row (768px to 1023px) */}
        <div className="hidden md:grid lg:hidden grid-cols-7 gap-1 px-4 py-1.5 border-t border-[#343c4b] bg-[#14171d]">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs rounded-md truncate cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black font-bold'
                    : 'text-zinc-300 hover:text-white bg-[#242a34]'
                }`}
              >
                {item.icon}
                <span className="truncate">{item.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* MOBILE BOTTOM BAR (< 768px) */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-[#343c4b] bg-[#14171d]/95 backdrop-blur-lg px-2 py-1.5 grid grid-cols-5 gap-1"
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
                  ? 'bg-amber-500 text-black font-extrabold'
                  : 'text-zinc-400 hover:text-amber-200'
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-0.5 leading-tight truncate max-w-full">
                {item.shortLabel}
              </span>
            </button>
          );
        })}

        <button
          onClick={() => setIsMobileDrawerOpen(prev => !prev)}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg transition-colors cursor-pointer ${
            isMobileDrawerOpen || isSecondaryActive
              ? 'bg-amber-500 text-black font-extrabold'
              : 'text-zinc-400 hover:text-amber-200'
          }`}
        >
          {isMobileDrawerOpen ? <X className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
          <span className="text-[10px] mt-0.5 leading-tight">
            {isFr ? 'Plus' : 'More'}
          </span>
        </button>
      </nav>

      {/* MOBILE DRAWER FOR SECONDARY TABS */}
      {isMobileDrawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/75 backdrop-blur-xs flex flex-col justify-end pb-16"
          onClick={() => setIsMobileDrawerOpen(false)}
        >
          <div
            className="bg-[#242a34] border-t-2 border-amber-500 rounded-t-2xl p-4 space-y-3 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#3a4354] pb-2">
              <span className="text-xs font-bold text-amber-400 uppercase">
                {isFr ? 'Autres Outils' : 'More Tools'}
              </span>
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="p-1 rounded-md bg-[#161920] text-zinc-400"
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
                        : 'bg-[#161920] text-zinc-200 border-[#3a4354]'
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
              className="w-full py-3 px-4 rounded-xl bg-amber-500 text-black text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-4 h-4 shrink-0" />
              <span>
                {isFr
                  ? '📲 Installer l’application hors-ligne sur ce téléphone'
                  : '📲 Install Offline App on This Phone'}
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
