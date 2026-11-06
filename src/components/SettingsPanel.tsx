import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types/sentinel';
import {
  Settings,
  Zap,
  Globe,
  HardDrive,
  Cpu,
  HeartPulse,
  Radio,
  Download,
  Upload,
  CheckCircle2,
  RefreshCw,
  Gauge,
  Save,
  Trash2,
  ShieldCheck,
  Server,
  Battery,
  BatteryCharging,
  Wifi,
  WifiOff
} from 'lucide-react';

interface SettingsPanelProps {
  language: Language;
  onToggleLanguage: () => void;
  ecoMode: boolean;
  onToggleEcoMode: () => void;
}

interface FamilyEmergencyProfile {
  householdMembers: string;
  bloodTypes: string;
  allergiesAndMeds: string;
  rallyPoint: string;
  radioChannelPlan: string;
  equipmentNotes: string;
}

const STORAGE_KEY_FAMILY = 'sentinel_family_profile_v1';
const STORAGE_KEY_OLLAMA_URL = 'sentinel_ollama_url_v1';
const STORAGE_KEY_UI_SCALE = 'sentinel_ui_scale_v1';

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  language,
  onToggleLanguage,
  ecoMode,
  onToggleEcoMode
}) => {
  const isFr = language === 'fr';

  const [familyProfile, setFamilyProfile] = useState<FamilyEmergencyProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FAMILY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      householdMembers: '2 adultes, 1 enfant',
      bloodTypes: 'Adulte 1 : O+ | Adulte 2 : A+ | Enfant : O+',
      allergiesAndMeds: 'Aucune allergie connue. Trousse TCCC + SRO en réserve.',
      rallyPoint: 'Point principal : Domicile | Repli : Mairie / Gymnase communal',
      radioChannelPlan: 'PMR446 Canal 8 (Sous-canal 16) — Veille à 09h00, 12h00, 18h00, 21h00',
      equipmentNotes: 'Batterie auto 12V 60Ah + Panneau solaire 100W + Filtre à eau gravitaire'
    };
  });

  const [ollamaUrl, setOllamaUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_OLLAMA_URL) || 'http://localhost:11434';
    } catch {
      return 'http://localhost:11434';
    }
  });

  const [uiScale, setUiScale] = useState<'100' | '108' | '115'>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEY_UI_SCALE) as any) || '100';
    } catch {
      return '100';
    }
  });

  const [ollamaStatus, setOllamaStatus] = useState<'idle' | 'checking' | 'online' | 'offline'>('idle');
  const [detectedModels, setDetectedModels] = useState<string[]>([]);
  const [pullingModelId, setPullingModelId] = useState<string | null>(null);
  const [pullProgress, setPullProgress] = useState<{ status: string; percent: number }>({
    status: '',
    percent: 0
  });
  const [hostRamGb, setHostRamGb] = useState<number>(16);
  const [hostCpuCores, setHostCpuCores] = useState<number>(8);
  const [benchmarkScore, setBenchmarkScore] = useState<number | null>(null);
  const [benchmarkRunning, setBenchmarkRunning] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  // Real-time System Resource Monitor (Moved from CommandCenter to Settings)
  const [sysStats, setSysStats] = useState<{
    cpuPercent: number | null;
    cpuCores: number;
    usedMemGb: number | null;
    totalMemGb: number | null;
    memPercent: number | null;
    uptimeSeconds: number | null;
    batteryPercent: number | null;
    batteryCharging: boolean | null;
    storageUsedMb: number | null;
    isOnline: boolean;
  }>(() => ({
    cpuPercent: null,
    cpuCores: typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4,
    usedMemGb: null,
    totalMemGb: typeof navigator !== 'undefined' && (navigator as any).deviceMemory ? (navigator as any).deviceMemory : null,
    memPercent: null,
    uptimeSeconds: null,
    batteryPercent: null,
    batteryCharging: null,
    storageUsedMb: null,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : false
  }));

  const restoreInputRef = useRef<HTMLInputElement | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  useEffect(() => {
    let mounted = true;

    const fetchTelemetry = async () => {
      let batteryPercent: number | null = null;
      let batteryCharging: boolean | null = null;
      try {
        if ('getBattery' in navigator) {
          const bat: any = await (navigator as any).getBattery();
          batteryPercent = Math.round(bat.level * 100);
          batteryCharging = Boolean(bat.charging);
        }
      } catch {}

      let storageUsedMb: number | null = null;
      try {
        if (navigator.storage && navigator.storage.estimate) {
          const est = await navigator.storage.estimate();
          if (typeof est.usage === 'number') {
            storageUsedMb = Math.max(0.1, Number((est.usage / (1024 * 1024)).toFixed(1)));
          }
        }
      } catch {}

      try {
        const res = await fetch('/api/system', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (mounted) {
            if (data.totalMemGb) setHostRamGb(Math.round(data.totalMemGb));
            if (data.cpuCores) setHostCpuCores(data.cpuCores);
            setSysStats({
              cpuPercent: data.cpuPercent,
              cpuCores: data.cpuCores || navigator.hardwareConcurrency || 4,
              usedMemGb: data.usedMemGb,
              totalMemGb: data.totalMemGb,
              memPercent: data.memPercent,
              uptimeSeconds: data.uptimeSeconds,
              batteryPercent,
              batteryCharging,
              storageUsedMb,
              isOnline: navigator.onLine
            });
          }
          return;
        }
      } catch {}

      if (mounted) {
        setSysStats(prev => ({
          ...prev,
          batteryPercent,
          batteryCharging,
          storageUsedMb,
          isOnline: navigator.onLine
        }));
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 3000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const formatUptime = (sec: number | null) => {
    if (sec === null) return isFr ? 'Session active' : 'Active session';
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    return `${h}h ${m}m`;
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_UI_SCALE, uiScale);
      document.documentElement.style.fontSize =
        uiScale === '115' ? '18px' : uiScale === '108' ? '17px' : '16px';
    } catch {}
  }, [uiScale]);

  const handleSaveFamilyProfile = () => {
    try {
      localStorage.setItem(STORAGE_KEY_FAMILY, JSON.stringify(familyProfile));
      localStorage.setItem(STORAGE_KEY_OLLAMA_URL, ollamaUrl);
      showToast(
        isFr
          ? 'Profil médical familial et paramètres enregistrés localement.'
          : 'Family emergency profile and settings saved locally.'
      );
    } catch {}
  };

  const testOllamaConnection = async () => {
    setOllamaStatus('checking');
    try {
      const cleanUrl = ollamaUrl.replace(/\/$/, '');
      const res = await fetch(`${cleanUrl}/api/tags`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const data = await res.json();
        const names = Array.isArray(data.models) ? data.models.map((m: any) => m.name) : [];
        setDetectedModels(names);
        setOllamaStatus('online');
      } else {
        setOllamaStatus('offline');
      }
    } catch {
      setOllamaStatus('offline');
    }
  };

  // Download a 1-click Windows/Linux auto-installer script for a specific Ollama model
  const handleDownloadModelScript = (ollamaTag: string, modelTitle: string) => {
    const batContent = `@echo off
chcp 65001 >nul
title Sentinel Pack Survie - Installation IA Hors-Ligne (${modelTitle})
echo ============================================================================
echo   LE QG SENTINEL - INSTALLATION AUTOMATIQUE DU MODELE IA HORS-LIGNE
echo   Modele cible : ${modelTitle} (${ollamaTag})
echo ============================================================================
echo.
where ollama >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo [!] Ollama n'est pas encore installe sur ce PC.
  echo [1/2] Ouverture du telechargement officiel Ollama pour Windows...
  start https://ollama.com/download/OllamaSetup.exe
  echo.
  echo Veuillez installer OllamaSetup.exe puis relancer ce fichier.
  pause
  exit /b
)
echo [1/2] Demarrage du serveur local Ollama...
start /B ollama serve >nul 2>nul
timeout /t 2 /nobreak >nul
echo [2/2] Telechargement du modele IA ${ollamaTag} pour usage 100%% Hors-Ligne...
ollama pull ${ollamaTag}
echo.
echo [OK] Modele ${ollamaTag} installe avec succes ! Vous pouvez retourner dans LE QG.
pause
`;
    const blob = new Blob([batContent], { type: 'application/x-bat;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `installer-modele-${ollamaTag.replace(/[^a-z0-9]/gi, '-')}.bat`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(
      isFr
        ? `Script d'installation automatique téléchargé pour ${modelTitle} (.BAT)`
        : `Auto-installer script downloaded for ${modelTitle} (.BAT)`
    );
  };

  // 1-Click Direct Pull via Local Ollama API (/api/pull) with live streaming progress bar
  const handlePullModelInOllama = async (ollamaTag: string, modelTitle: string) => {
    if (pullingModelId) return;
    setPullingModelId(ollamaTag);
    setPullProgress({
      status: isFr ? 'Connexion au moteur local Ollama...' : 'Connecting to local Ollama...',
      percent: 2
    });

    try {
      const cleanUrl = ollamaUrl.replace(/\/$/, '');
      const res = await fetch(`${cleanUrl}/api/pull`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: ollamaTag, stream: true })
      });

      if (!res.ok || !res.body) {
        throw new Error('Ollama API unreachable');
      }

      setOllamaStatus('online');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const msg = JSON.parse(line);
            if (msg.error) {
              throw new Error(msg.error);
            }
            let pct = pullProgress.percent;
            if (typeof msg.completed === 'number' && typeof msg.total === 'number' && msg.total > 0) {
              pct = Math.min(99, Math.max(3, Math.round((msg.completed / msg.total) * 100)));
            }
            const mbDone =
              typeof msg.completed === 'number' ? (msg.completed / (1024 * 1024)).toFixed(0) : null;
            const mbTotal =
              typeof msg.total === 'number' ? (msg.total / (1024 * 1024)).toFixed(0) : null;

            setPullProgress({
              status:
                mbDone && mbTotal
                  ? `${msg.status || 'Téléchargement'} (${mbDone} Mo / ${mbTotal} Mo)`
                  : msg.status || (isFr ? 'Téléchargement en cours...' : 'Downloading...'),
              percent: pct
            });
          } catch {}
        }
      }

      setPullProgress({
        status: isFr ? '✓ Modèle téléchargé et prêt Hors-Ligne !' : '✓ Model installed & ready offline!',
        percent: 100
      });
      showToast(
        isFr
          ? `Modèle ${modelTitle} (${ollamaTag}) installé dans Ollama !`
          : `Model ${modelTitle} (${ollamaTag}) installed in Ollama!`
      );
      await testOllamaConnection();
    } catch {
      setOllamaStatus('offline');
      // Fallback: download the 1-click automated .bat installer script so the user is never blocked
      handleDownloadModelScript(ollamaTag, modelTitle);
    } finally {
      setTimeout(() => {
        setPullingModelId(null);
      }, 2200);
    }
  };

  const runHardwareBenchmark = () => {
    setBenchmarkRunning(true);
    setTimeout(() => {
      const start = performance.now();
      let acc = 0;
      for (let i = 0; i < 4_500_000; i++) {
        acc += Math.sqrt(i) * Math.sin(i);
      }
      const elapsedMs = Math.max(5, performance.now() - start);
      const opsScore = Math.round((4500 / elapsedMs) * 18 + hostCpuCores * 45 + hostRamGb * 25);
      if (acc === -999999) console.log(acc);
      setBenchmarkScore(opsScore);
      setBenchmarkRunning(false);
      showToast(
        isFr
          ? `Benchmark terminé : Score matériel ${opsScore} pts`
          : `Benchmark complete: Hardware score ${opsScore} pts`
      );
    }, 150);
  };

  const handleExportFullBackup = () => {
    const backupData: Record<string, any> = {
      exportedAt: new Date().toISOString(),
      app: 'Sentinel Pack Survie',
      storage: {}
    };
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('sentinel_')) {
        try {
          backupData.storage[key] = JSON.parse(localStorage.getItem(key) || 'null');
        } catch {
          backupData.storage[key] = localStorage.getItem(key);
        }
      }
    }

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sentinel-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(
      isFr
        ? 'Sauvegarde complète exportée (prête à copier sur clé USB).'
        : 'Complete backup exported (ready for USB drive).'
    );
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed && parsed.storage) {
          Object.entries(parsed.storage).forEach(([k, v]) => {
            localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
          });
          if (parsed.storage[STORAGE_KEY_FAMILY]) {
            setFamilyProfile(parsed.storage[STORAGE_KEY_FAMILY]);
          }
          showToast(
            isFr
              ? 'Sauvegarde restaurée avec succès !'
              : 'Backup restored successfully!'
          );
        }
      } catch {
        showToast(isFr ? 'Fichier de sauvegarde invalide.' : 'Invalid backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6 min-w-0">
      {/* HEADER */}
      <div className="border border-neutral-800 rounded-lg bg-[#232718] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-black/60 border border-amber-500/60 flex items-center justify-center text-amber-400 shrink-0">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-wider uppercase font-mono">
              {isFr ? 'PARAMÈTRES & MÉMOIRE DU POSTE' : 'STATION SETTINGS & MEMORY'}
            </h1>
            <p className="text-xs text-stone-300 mt-0.5">
              {isFr
                ? 'Profil médical familial (Mémoire NOMAD), ergonomie visuelle, moteur IA local et sauvegarde sur clé USB.'
                : 'Family medical profile (NOMAD Memory), display ergonomics, local AI engine, and USB backup.'}
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveFamilyProfile}
          className="px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{isFr ? 'Enregistrer tout' : 'Save All Settings'}</span>
        </button>
      </div>

      {/* MONITEUR RESSOURCES SYSTÈME EN TEMPS RÉEL (Processeur, Mémoire RAM, Alimentation, État Réseau) */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase font-mono">
              {isFr
                ? 'Moniteur Ressources Système (Temps Réel)'
                : 'Real-Time System Resource Monitor'}
            </h2>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black border border-neutral-800 text-amber-400">
            {isFr ? 'SONDE LOCALE ACTIVE' : 'LIVE LOCAL TELEMETRY'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          {/* Metric 1: Processeur */}
          <div className="p-3.5 rounded-lg bg-black border border-neutral-800 flex items-center gap-3 min-w-0">
            <Cpu className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] text-stone-400 uppercase truncate">
                  {isFr ? 'Processeur' : 'Processor'} ({sysStats.cpuCores}c)
                </span>
                <span className="font-bold text-amber-300 tabular-nums">
                  {sysStats.cpuPercent !== null ? `${sysStats.cpuPercent}%` : `${sysStats.cpuCores} threads`}
                </span>
              </div>
              <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-1.5">
                <div
                  className="h-full bg-amber-500"
                  style={{ width: `${sysStats.cpuPercent !== null ? sysStats.cpuPercent : 15}%` }}
                />
              </div>
            </div>
          </div>

          {/* Metric 2: Mémoire RAM */}
          <div className="p-3.5 rounded-lg bg-black border border-neutral-800 flex items-center gap-3 min-w-0">
            <HardDrive className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] text-stone-400 uppercase truncate">
                  {isFr ? 'Mémoire RAM' : 'System RAM'}
                </span>
                <span className="font-bold text-emerald-300 tabular-nums truncate">
                  {sysStats.usedMemGb !== null && sysStats.totalMemGb !== null
                    ? `${sysStats.usedMemGb}/${sysStats.totalMemGb} Go`
                    : sysStats.totalMemGb !== null
                    ? `${sysStats.totalMemGb} Go`
                    : `${hostRamGb} Go`}
                </span>
              </div>
              <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-1.5">
                <div
                  className="h-full bg-emerald-500"
                  style={{ width: `${sysStats.memPercent !== null ? sysStats.memPercent : 25}%` }}
                />
              </div>
            </div>
          </div>

          {/* Metric 3: Alimentation */}
          <div className="p-3.5 rounded-lg bg-black border border-neutral-800 flex items-center gap-3 min-w-0">
            {sysStats.batteryCharging ? (
              <BatteryCharging className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <Battery className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] text-stone-400 uppercase truncate">
                  {isFr ? 'Alimentation' : 'Power'}
                </span>
                <span className="font-bold text-stone-200 tabular-nums truncate">
                  {sysStats.batteryPercent !== null
                    ? `${sysStats.batteryPercent}% ${sysStats.batteryCharging ? '⚡' : ''}`
                    : isFr
                    ? 'Secteur AC'
                    : 'AC Power'}
                </span>
              </div>
              <div className="text-[10px] text-stone-500 truncate mt-1">
                Uptime : {formatUptime(sysStats.uptimeSeconds)}
              </div>
            </div>
          </div>

          {/* Metric 4: État Réseau */}
          <div className="p-3.5 rounded-lg bg-black border border-neutral-800 flex items-center gap-3 min-w-0">
            {sysStats.isOnline ? (
              <Wifi className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <WifiOff className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] text-stone-400 uppercase truncate">
                  {isFr ? 'État Réseau' : 'Network State'}
                </span>
                <span
                  className={`font-bold text-[11px] truncate ${
                    sysStats.isOnline ? 'text-amber-300' : 'text-emerald-400'
                  }`}
                >
                  {sysStats.isOnline
                    ? isFr
                      ? 'Réseau actif'
                      : 'LAN/WAN Active'
                    : isFr
                    ? 'Air-Gap (Isolé)'
                    : 'Air-Gapped'}
                </span>
              </div>
              <div className="text-[10px] text-stone-500 truncate mt-1">
                {sysStats.storageUsedMb !== null
                  ? `Cache local : ${sysStats.storageUsedMb} Mo`
                  : isFr
                  ? 'Stockage local actif'
                  : 'Local storage active'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN 2-COLUMN WIDE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (7 cols): FAMILY MEDICAL & EMERGENCY MEMORY (NOMAD.md / Survival-LLM Memory) */}
        <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2.5">
              <HeartPulse className="w-5 h-5 text-rose-400" />
              <div>
                <h2 className="text-base font-bold text-white">
                  {isFr
                    ? '1. Fiche Médicale & Mémoire Familiale d’Urgence'
                    : '1. Family Medical & Emergency Memory'}
                </h2>
                <p className="text-xs text-stone-400">
                  {isFr
                    ? 'Inspiré de Project NOMAD & Survival-LLM Memory : conservé 100% en local sur votre machine.'
                    : 'Inspired by Project NOMAD & Survival-LLM Memory: stored 100% locally on your machine.'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold">
              STOCKAGE LOCAL
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-300 block">
                {isFr ? 'Composition du Foyer' : 'Household Members'}
              </label>
              <input
                type="text"
                value={familyProfile.householdMembers}
                onChange={e =>
                  setFamilyProfile(prev => ({ ...prev, householdMembers: e.target.value }))
                }
                className="w-full px-3.5 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-300 block">
                {isFr ? 'Groupes Sanguins' : 'Blood Types'}
              </label>
              <input
                type="text"
                value={familyProfile.bloodTypes}
                onChange={e =>
                  setFamilyProfile(prev => ({ ...prev, bloodTypes: e.target.value }))
                }
                className="w-full px-3.5 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-300 block">
              {isFr
                ? 'Allergies, Contre-indications & Traitements Médicaux Vitaux'
                : 'Allergies & Vital Medications'}
            </label>
            <textarea
              rows={2}
              value={familyProfile.allergiesAndMeds}
              onChange={e =>
                setFamilyProfile(prev => ({ ...prev, allergiesAndMeds: e.target.value }))
              }
              className="w-full px-3.5 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-300 block">
                {isFr ? 'Points de Ralliement Familial' : 'Family Rally Points'}
              </label>
              <input
                type="text"
                value={familyProfile.rallyPoint}
                onChange={e =>
                  setFamilyProfile(prev => ({ ...prev, rallyPoint: e.target.value }))
                }
                className="w-full px-3.5 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-300 block">
                {isFr ? 'Canal Radio & Horaires de Contact' : 'Radio Channel & Schedule'}
              </label>
              <input
                type="text"
                value={familyProfile.radioChannelPlan}
                onChange={e =>
                  setFamilyProfile(prev => ({ ...prev, radioChannelPlan: e.target.value }))
                }
                className="w-full px-3.5 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-300 block">
              {isFr ? 'Matériel Autonome & Énergie Disponible' : 'Available Off-Grid Gear & Power'}
            </label>
            <input
              type="text"
              value={familyProfile.equipmentNotes}
              onChange={e =>
                setFamilyProfile(prev => ({ ...prev, equipmentNotes: e.target.value }))
              }
              className="w-full px-3.5 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
            />
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleSaveFamilyProfile}
              className="px-4 py-2 rounded-md bg-[#343b24] hover:bg-[#414a2d] border border-amber-500/50 text-amber-100 text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-amber-300" />
              <span>{isFr ? 'Sauvegarder la Fiche Familiale' : 'Save Family Profile'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-stone-300 text-xs cursor-pointer"
            >
              {isFr ? 'Imprimer cette fiche' : 'Print Sheet'}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN (5 cols): DISPLAY, POWER & BACKUP */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card A: Ergonomie, Affichage & Énergie */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>{isFr ? '2. Affichage & Économie d’Énergie' : '2. Display & Power Saving'}</span>
            </h2>

            {/* ECO Power Toggle */}
            <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-black border border-neutral-800">
              <div>
                <div className="text-xs font-bold text-white">
                  {isFr ? 'Mode ECO Power OLED (Activé d’office)' : 'ECO Power OLED Mode'}
                </div>
                <div className="text-[11px] text-stone-400">
                  {isFr
                    ? 'Fond noir pur #000000 réduisant la consommation écran sur batterie.'
                    : 'Pure black #000000 background reducing screen battery draw.'}
                </div>
              </div>
              <button
                onClick={onToggleEcoMode}
                className={`px-3.5 py-1.5 rounded font-mono text-xs font-bold border cursor-pointer shrink-0 ${
                  ecoMode
                    ? 'bg-amber-500 text-black border-amber-400'
                    : 'bg-neutral-900 text-stone-300 border-neutral-700'
                }`}
              >
                {ecoMode ? 'ACTIF (ON)' : 'STANDARD'}
              </button>
            </div>

            {/* UI Text Scale */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-300 block">
                {isFr ? 'Taille de Police & Confort de Lecture' : 'Global Font Size & Readability'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '100', label: isFr ? '100% Standard' : '100% Default' },
                  { id: '108', label: isFr ? '108% Confort' : '108% Comfort' },
                  { id: '115', label: isFr ? '115% Grand' : '115% Large' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setUiScale(opt.id as any)}
                    className={`py-2 px-2 rounded-md text-xs font-mono border cursor-pointer ${
                      uiScale === opt.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-black border-neutral-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Switch */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-xs text-stone-300 font-bold flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-amber-400" />
                <span>{isFr ? 'Langue de l’interface' : 'Interface Language'}</span>
              </span>
              <button
                onClick={onToggleLanguage}
                className="px-3.5 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-amber-300 font-bold cursor-pointer"
              >
                {language === 'fr' ? '🇫🇷 Français (FR)' : '🇬🇧 English (EN)'}
              </button>
            </div>
          </div>

          {/* Card B: Sauvegarde Clé USB & Benchmark Matériel */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-neutral-800 pb-3">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <span>{isFr ? '3. Sauvegarde Clé USB & Benchmark' : '3. USB Backup & Hardware Benchmark'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={handleExportFullBackup}
                className="py-2.5 px-3 rounded-md bg-[#343b24] hover:bg-[#414a2d] border border-amber-500/40 text-amber-100 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>{isFr ? 'Exporter sur Clé USB (.JSON)' : 'Export Backup (.JSON)'}</span>
              </button>

              <input
                ref={restoreInputRef}
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
              <button
                onClick={() => restoreInputRef.current?.click()}
                className="py-2.5 px-3 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-stone-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isFr ? 'Restaurer une Sauvegarde' : 'Restore Backup'}</span>
              </button>
            </div>

            {/* Hardware Benchmark (Inspired by Project NOMAD /settings/benchmark) */}
            <div className="p-3.5 rounded-lg bg-black border border-neutral-800 flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-amber-400" />
                  <span>{isFr ? 'Indice de Performance Locale' : 'Local Hardware Benchmark'}</span>
                </div>
                <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                  {benchmarkScore !== null
                    ? `${benchmarkScore} pts (${hostCpuCores} cœurs · ${hostRamGb} Go RAM)`
                    : isFr
                    ? `Détecté : ${hostCpuCores} cœurs CPU · ${hostRamGb} Go RAM`
                    : `Detected: ${hostCpuCores} CPU cores · ${hostRamGb} GB RAM`}
                </div>
              </div>
              <button
                onClick={runHardwareBenchmark}
                disabled={benchmarkRunning}
                className="px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-amber-300 cursor-pointer shrink-0"
              >
                {benchmarkRunning ? '...' : isFr ? 'Tester mon PC' : 'Run Test'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: LOCAL AI ENGINE & RECOMMENDED MODELS BY RAM (From Project NOMAD & Survival-LLM) */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold text-white">
                {isFr
                  ? '4. Moteur IA Hors-Ligne (Ollama / LM Studio) & Modèles Recommandés'
                  : '4. Local AI Engine (Ollama / LM Studio) & Recommended Models'}
              </h2>
              <p className="text-xs text-stone-400">
                {isFr
                  ? `Votre machine dispose de ${hostRamGb} Go de RAM : voici la recommandation officielle issue des tests Survival-LLM.`
                  : `Your machine has ${hostRamGb} GB RAM: below is the official Survival-LLM model recommendation.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={ollamaUrl}
              onChange={e => setOllamaUrl(e.target.value)}
              placeholder="http://localhost:11434"
              className="px-3 py-1.5 bg-black border border-neutral-700 rounded text-xs font-mono text-amber-300 w-52 outline-none"
            />
            <button
              onClick={testOllamaConnection}
              className="px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono text-white flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${ollamaStatus === 'checking' ? 'animate-spin' : ''}`} />
              <span>{isFr ? 'Tester Ollama' : 'Test Ollama'}</span>
            </button>
          </div>
        </div>

        {ollamaStatus === 'online' && (
          <div className="p-3 rounded-lg bg-emerald-950/50 border border-emerald-700/70 text-emerald-200 text-xs font-mono">
            ✓ {isFr ? 'Moteur Ollama local connecté ! Modèles détectés :' : 'Local Ollama connected! Models:'}{' '}
            {detectedModels.length > 0 ? detectedModels.join(', ') : isFr ? 'Aucun modèle téléchargé' : 'None yet'}
          </div>
        )}
        {ollamaStatus === 'offline' && (
          <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-stone-300 text-xs">
            {isFr
              ? 'Info : Ollama n’est pas lancé en arrière-plan sur ce port. Cliquez sur « Télécharger Ollama » ci-dessous ou téléchargez directement le fichier .GGUF / le script automatique (.BAT).'
              : 'Note: Ollama is not running on this port. Click "Download Ollama" below or download the direct .GGUF file / automated .BAT script.'}
          </div>
        )}

        {/* DIRECT ENGINE DOWNLOAD BAR (OLLAMA / LM STUDIO) */}
        <div className="p-3.5 rounded-xl bg-black border border-neutral-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-amber-300 uppercase font-mono">
              {isFr
                ? 'Étape 1 : Télécharger le Moteur IA Hors-Ligne (Gratuit & Sans Compte)'
                : 'Step 1: Download Offline AI Engine (Free & No Account Needed)'}
            </div>
            <p className="text-[11px] text-stone-400">
              {isFr
                ? 'Installez Ollama ou LM Studio une seule fois, puis cliquez sur « Télécharger le Modèle » dans les cartes ci-dessous.'
                : 'Install Ollama or LM Studio once, then click "Download Model" in the cards below.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://ollama.com/download/OllamaSetup.exe"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs font-mono flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isFr ? 'Ollama Windows (.EXE)' : 'Ollama Windows (.EXE)'}</span>
            </a>
            <a
              href="https://ollama.com/download/Ollama-darwin.zip"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-stone-200 font-mono text-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Ollama macOS (.ZIP)</span>
            </a>
            <a
              href="https://lmstudio.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-sky-300 font-mono text-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>LM Studio (Interface Graphique)</span>
            </a>
          </div>
        </div>

        {/* RECOMMENDED MODELS WITH DIRECT DOWNLOAD BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              ramMin: 8,
              ramMax: 15,
              title: isFr ? 'PC 8 à 12 Go de RAM' : '8–12 GB RAM PC',
              model: 'Llama 3.2 3B / Gemma 2 2B',
              ollamaTag: 'llama3.2:3b',
              cmd: 'ollama pull llama3.2:3b',
              ggufUrl:
                'https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF/resolve/main/Llama-3.2-3B-Instruct-Q4_K_M.gguf?download=true',
              ggufLabel: 'Llama-3.2-3B-Q4_K_M.gguf (2.0 Go)',
              size: '2.0 Go (Ultra-rapide CPU)',
              desc: isFr
                ? 'Léger et rapide sur processeur standard sans carte graphique dédiée. Idéal pour ordinateur portable autonome.'
                : 'Lightweight and fast on standard CPU without dedicated GPU. Ideal for off-grid laptops.'
            },
            {
              ramMin: 16,
              ramMax: 31,
              title: isFr ? 'PC 16 à 31 Go de RAM' : '16–31 GB RAM PC',
              model: 'IBM Granite 3.1 8B (Survival-LLM)',
              ollamaTag: 'granite3.1-dense:8b',
              cmd: 'ollama pull granite3.1-dense:8b',
              ggufUrl:
                'https://huggingface.co/bartowski/granite-3.1-8b-instruct-GGUF/resolve/main/granite-3.1-8b-instruct-Q4_K_M.gguf?download=true',
              ggufLabel: 'Granite-3.1-8B-Q4_K_M.gguf (4.9 Go)',
              size: '4.9 Go (0 réponse dangereuse)',
              desc: isFr
                ? 'Certifié par le benchmark Survival-LLM : 0 conseil médical dangereux sur les 22 tests critiques d’urgence.'
                : 'Verified by Survival-LLM benchmark: 0 harmful answers across 22 emergency tests.'
            },
            {
              ramMin: 32,
              ramMax: 999,
              title: isFr ? 'PC 32 Go de RAM et +' : '32+ GB RAM PC',
              model: 'Qwen 2.5 14B / 32B Instruct',
              ollamaTag: 'qwen2.5:14b',
              cmd: 'ollama pull qwen2.5:14b',
              ggufUrl:
                'https://huggingface.co/Qwen/Qwen2.5-14B-Instruct-GGUF/resolve/main/qwen2.5-14b-instruct-q4_k_m-00001-of-00003.gguf?download=true',
              ggufLabel: 'Qwen2.5-14B-Instruct-Q4_K_M.gguf (9.0 Go)',
              size: '9.0 – 18 Go (Précision maximale)',
              desc: isFr
                ? 'Précision maximale (21/22 aux tests d’urgence CDC/OMS/USDA). Diagnostic complet et synthèse documentaire.'
                : 'Highest accuracy (21/22 on CDC/WHO/USDA emergency evaluation).'
            }
          ].map((tier, idx) => {
            const isRecommended = hostRamGb >= tier.ramMin && hostRamGb <= tier.ramMax;
            const isPullingThis = pullingModelId === tier.ollamaTag;
            const isAlreadyInstalled = detectedModels.some(m =>
              m.toLowerCase().includes(tier.ollamaTag.split(':')[0].toLowerCase())
            );

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex flex-col justify-between gap-3.5 ${
                  isRecommended
                    ? 'bg-amber-950/20 border-amber-500/80 shadow-lg shadow-amber-950/10'
                    : 'bg-black border-neutral-800'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-stone-400">{tier.title}</span>
                    {isRecommended && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500 text-black font-bold">
                        {isFr ? 'RECOMMANDÉ POUR VOUS' : 'RECOMMENDED'}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-white">{tier.model}</h3>
                    {isAlreadyInstalled && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-600 text-emerald-300 font-bold">
                        ✓ INSTALLÉ
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-emerald-400">{tier.size}</div>
                  <p className="text-xs text-stone-300 leading-relaxed">{tier.desc}</p>
                </div>

                {/* Live Progress Bar when pulling via Ollama API */}
                {isPullingThis && (
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-amber-500/60 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-amber-300 truncate">{pullProgress.status}</span>
                      <span className="text-white font-bold">{pullProgress.percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 transition-all duration-300"
                        style={{ width: `${pullProgress.percent}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  {/* Action 1: 1-Click Install in Ollama (or Auto-Script if Ollama offline) */}
                  <button
                    type="button"
                    onClick={() => handlePullModelInOllama(tier.ollamaTag, tier.model)}
                    disabled={Boolean(pullingModelId)}
                    className={`w-full py-2 px-3 rounded-md font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                      isRecommended
                        ? 'bg-amber-500 hover:bg-amber-400 text-black'
                        : 'bg-[#343b24] hover:bg-[#414a2d] border border-amber-500/40 text-amber-100'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {isPullingThis
                        ? isFr
                          ? 'Installation en cours...'
                          : 'Installing...'
                        : isFr
                        ? 'Télécharger & Installer (1-Clic Ollama)'
                        : 'Download & Install (1-Click Ollama)'}
                    </span>
                  </button>

                  {/* Action 2: Direct Browser Download of .GGUF File (for USB / LM Studio / Offline import) */}
                  <a
                    href={tier.ggufUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-sky-300 font-mono text-[11px] font-bold flex items-center justify-center gap-1.5"
                    title={tier.ggufLabel}
                  >
                    <Download className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                    <span className="truncate">
                      {isFr ? `Fichier .GGUF Direct (${tier.ggufLabel.split(' ')[0]})` : `Direct .GGUF (${tier.ggufLabel})`}
                    </span>
                  </a>

                  {/* Action 3: Terminal Command + .BAT Script */}
                  <div className="flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-800 font-mono text-[11px]">
                    <span className="text-amber-300 select-all truncate">{tier.cmd}</span>
                    <button
                      type="button"
                      onClick={() => handleDownloadModelScript(tier.ollamaTag, tier.model)}
                      className="text-[10px] px-2 py-0.5 rounded bg-black hover:bg-neutral-800 border border-neutral-700 text-stone-300 shrink-0 cursor-pointer"
                      title={isFr ? 'Télécharger le script .BAT automatique' : 'Download automated .BAT script'}
                    >
                      .BAT Auto
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-5 right-5 z-[9999] bg-neutral-950 border border-emerald-500 text-emerald-300 px-4 py-2.5 rounded-md shadow-xl font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
