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
  Smartphone
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

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'command-center',
      label: isFr ? 'LE QG DU SENTINEL' : 'SENTINEL HQ',
      icon: <Cpu className="w-3.5 h-3.5 shrink-0" />
    },
    {
      id: 'tactical-map',
      label: isFr ? 'Carte France' : 'France Map',
      icon: <MapPin className="w-3.5 h-3.5 shrink-0" />
    },
    {
      id: 'emergency-docs',
      label: isFr ? 'Documentation d’Urgence' : 'Emergency Docs',
      icon: <BookOpen className="w-3.5 h-3.5 shrink-0" />
    },
    {
      id: 'stocks',
      label: isFr ? 'Stock de Survie' : 'Survival Stock',
      icon: <Package className="w-3.5 h-3.5 shrink-0" />
    },
    {
      id: 'survival-llm',
      label: isFr ? 'IA Survie' : 'Survival AI',
      icon: <Radio className="w-3.5 h-3.5 shrink-0" />
    },
    {
      id: 'blackout',
      label: isFr ? 'Blackout' : 'Blackout',
      icon: <ZapOff className="w-3.5 h-3.5 shrink-0" />
    },
    {
      id: 'settings',
      label: isFr ? 'Paramètres' : 'Settings',
      icon: <Settings className="w-3.5 h-3.5 shrink-0" />
    },
    {
      id: 'about',
      label: isFr ? 'Infos' : 'About',
      icon: <Info className="w-3.5 h-3.5 shrink-0" />
    }
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b ${
        ecoMode
          ? 'bg-black border-neutral-800'
          : 'bg-[#1a1712]/95 backdrop-blur-md border-amber-800/40'
      }`}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-10 h-15 flex items-center justify-between gap-4 min-w-0">
        {/* Brand Logo */}
        <div
          onClick={() => onSelectTab('command-center')}
          className="flex items-center gap-3 cursor-pointer shrink-0 group"
        >
          <div className="w-9 h-9 rounded-sm bg-neutral-950 border border-amber-500/70 p-1 flex items-center justify-center group-hover:border-amber-300">
            <img
              src="/assets/aistudio/noir_233aab2b.png"
              alt="Logo Sentinel Pack Survie"
              className="w-full h-full object-contain invert brightness-125"
            />
          </div>
          <div className="leading-tight">
            <span className="text-xs sm:text-sm font-black tracking-[0.12em] text-amber-100 block uppercase">
              {isFr ? 'LE QG DU SENTINEL' : 'THE SENTINEL HQ'}
            </span>
            <span className="text-[10px] sm:text-[11px] text-amber-400 font-extrabold font-mono block uppercase tracking-[0.14em]">
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

        {/* Right Controls: Mobile Install, ECO Power & Language */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsMobileModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono font-bold bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-500 text-emerald-300 cursor-pointer"
            title={
              isFr
                ? 'Installer Le QG du Sentinel sur votre téléphone en cas de coupure Internet'
                : 'Install The Sentinel HQ on your phone for offline use'
            }
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">{isFr ? 'Installer sur Téléphone' : 'Install on Phone'}</span>
            <span className="sm:hidden">{isFr ? 'App Mobile' : 'Mobile'}</span>
          </button>

          <button
            onClick={onToggleEcoMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono border cursor-pointer ${
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
            <span>{ecoMode ? 'ECO POWER: ON' : 'ECO POWER: OFF'}</span>
          </button>

          <button
            onClick={onToggleLanguage}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border text-xs font-mono cursor-pointer ${
              ecoMode
                ? 'border-neutral-800 bg-neutral-950 text-stone-300 hover:border-amber-600'
                : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-700'
            }`}
            title="FR / EN"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">{language.toUpperCase()}</span>
          </button>
        </div>
      </div>

      {/* Tablet / Mobile Navigation Grid — 4 or 8 clean columns with zero overlap */}
      <div
        className={`xl:hidden grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 px-3 sm:px-6 py-2 border-t ${
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
      <MobileInstallModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        language={language}
        deferredPrompt={deferredPrompt}
        onTriggerInstallPrompt={handleTriggerInstallPrompt}
      />
    </header>
  );
};
