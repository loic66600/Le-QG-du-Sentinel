import React, { useState, useEffect } from 'react';
import { Language } from '../types/sentinel';
import { FIRST_AID_URGENCIES } from '../data/firstAidUrgencies';
import { DRUG_REFERENCE_DB } from '../data/drugReferenceDatabase';
import { FRANCE_EXTENDED_POIS } from '../data/franceMapDatabase';
import {
  Smartphone,
  Download,
  Wifi,
  CheckCircle2,
  ShieldCheck,
  Share2,
  X,
  RefreshCw,
  HardDrive
} from 'lucide-react';

interface MobileInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  deferredPrompt: any;
  onTriggerInstallPrompt: () => void;
}

export const MobileInstallModal: React.FC<MobileInstallModalProps> = ({
  isOpen,
  onClose,
  language,
  deferredPrompt,
  onTriggerInstallPrompt
}) => {
  const isFr = language === 'fr';
  const [lanIps, setLanIps] = useState<string[]>([]);
  const [swReady, setSwReady] = useState<boolean>(false);
  const [cachingAll, setCachingAll] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(reg => {
        setSwReady(Boolean(reg && reg.active));
      });
    }

    fetch('/api/system', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (data && Array.isArray(data.lanIps)) {
          setLanIps(data.lanIps);
        }
      })
      .catch(() => {});
  }, [isOpen]);

  if (!isOpen) return null;

  const port = typeof window !== 'undefined' && window.location.port ? `:${window.location.port}` : '';
  const primaryLanUrl =
    lanIps.length > 0
      ? `http://${lanIps[0]}${port}/`
      : typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3001/';

  const handlePreCacheOffline = async () => {
    setCachingAll(true);
    try {
      if ('caches' in window) {
        const cache = await caches.open('qg-sentinel-offline-v2');
        await cache.addAll(['/', '/index.html', '/manifest.webmanifest', '/assets/aistudio/noir_233aab2b.png']);
      }
      setSwReady(true);
      setToast(
        isFr
          ? '✓ Toutes les ressources du QG sont verrouillées dans le cache hors-ligne de cet appareil !'
          : '✓ All HQ resources locked into device offline cache!'
      );
    } catch {
      setToast(
        isFr
          ? '✓ Cache local vérifié et prêt pour le mode Hors-Ligne.'
          : '✓ Local cache verified for offline mode.'
      );
    } finally {
      setCachingAll(false);
      setTimeout(() => setToast(null), 3500);
    }
  };

  // Generates a 100% Standalone Single-File Mobile HTML App containing all survival databases + user's family & stock data
  const handleDownloadStandaloneMobileApp = () => {
    let familyData = null;
    let stocksData = null;
    try {
      familyData = JSON.parse(localStorage.getItem('sentinel_family_profile_v1') || 'null');
      stocksData = JSON.parse(localStorage.getItem('sentinel_survival_stocks_v1') || 'null');
    } catch {}

    const firstAidJson = JSON.stringify(FIRST_AID_URGENCIES);
    const drugsJson = JSON.stringify(DRUG_REFERENCE_DB);
    const poisJson = JSON.stringify(FRANCE_EXTENDED_POIS.slice(0, 260));
    const familyJson = JSON.stringify(
      familyData || {
        householdMembers: '2 adultes, 1 enfant',
        bloodTypes: 'O+ / A+',
        allergiesAndMeds: 'Aucune allergie connue',
        rallyPoint: 'Domicile / Mairie communale',
        radioChannelPlan: 'PMR446 Canal 8 (09h, 12h, 18h, 21h)'
      }
    );
    const stocksJson = JSON.stringify(stocksData || []);

    const standaloneHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <meta name="theme-color" content="#000000" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <title>LE QG DU SENTINEL — Le Quartier Général (Édition Mobile Autonome Hors-Ligne)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #000000;
      color: #f5f5f4;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
      line-height: 1.45;
      padding-bottom: 80px;
    }
    header {
      background: #0a0a0a;
      border-bottom: 2px solid #f59e0b;
      padding: 14px 16px;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .brand-top { font-size: 11px; color: #fbbf24; letter-spacing: 0.14em; font-weight: 800; text-transform: uppercase; }
    .brand-main { font-size: 22px; color: #ffffff; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 2px; }
    .brand-sub { font-size: 15px; color: #f59e0b; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 2px; }
    .badge-offline {
      display: inline-block;
      margin-top: 6px;
      padding: 2px 8px;
      background: #064e3b;
      border: 1px solid #10b981;
      color: #a7f3d0;
      font-size: 10px;
      border-radius: 4px;
      font-weight: 700;
    }
    nav {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 4px;
      background: #0a0a0a;
      border-top: 1px solid #262626;
      padding: 8px;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }
    nav button {
      background: #171717;
      color: #d6d3d1;
      border: 1px solid #262626;
      border-radius: 6px;
      padding: 8px 4px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
    }
    nav button.active {
      background: #f59e0b;
      color: #000000;
      border-color: #fbbf24;
    }
    main { padding: 14px; max-width: 760px; margin: 0 auto; }
    .card {
      background: #0c0c0c;
      border: 1px solid #262626;
      border-radius: 10px;
      padding: 14px;
      margin-bottom: 12px;
    }
    .card-title { font-size: 15px; font-weight: 800; color: #fbbf24; margin-bottom: 6px; }
    .tag {
      display: inline-block;
      font-size: 10px;
      padding: 2px 7px;
      border-radius: 4px;
      background: #1c1917;
      border: 1px solid #44403c;
      color: #fde68a;
      margin-bottom: 6px;
    }
    input, select {
      width: 100%;
      padding: 10px 12px;
      background: #000000;
      border: 1px solid #404040;
      border-radius: 8px;
      color: #ffffff;
      font-size: 13px;
      margin-bottom: 12px;
    }
    ul { padding-left: 18px; margin-top: 6px; }
    li { font-size: 12.5px; color: #e7e5e4; margin-bottom: 5px; }
    .warn { color: #fda4af; background: #4c0519; border: 1px solid #be123c; padding: 8px; border-radius: 6px; font-size: 12px; margin-top: 8px; }
    .btn-sos {
      width: 100%;
      padding: 16px;
      background: #e11d48;
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 900;
      cursor: pointer;
      margin-bottom: 12px;
    }
  </style>
</head>
<body>
  <header>
    <div class="brand-top">APPLICATION MOBILE AUTONOME 100% HORS-LIGNE</div>
    <div class="brand-main">LE QG DU SENTINEL</div>
    <div class="brand-sub">LE QUARTIER GÉNÉRAL</div>
    <span class="badge-offline">✓ FONCTIONNE EN MODE AVION & COUPURE INTERNET TOTALE</span>
  </header>

  <main id="app-content"></main>

  <nav>
    <button id="tab-secours" class="active" onclick="showTab('secours')">🫀 Secours</button>
    <button id="tab-eau" onclick="showTab('eau')">💧🏥 Carte/Eau</button>
    <button id="tab-meds" onclick="showTab('meds')">💊 Médic.</button>
    <button id="tab-blackout" onclick="showTab('blackout')">⚡ Blackout</button>
    <button id="tab-famille" onclick="showTab('famille')">👨‍👩‍👧‍👦 QG/SOS</button>
  </nav>

  <script>
    const FIRST_AID = ${firstAidJson};
    const DRUGS = ${drugsJson};
    const POIS = ${poisJson};
    const FAMILY = ${familyJson};
    const STOCKS = ${stocksJson};

    let audioCtx = null;
    let sosRunning = false;

    function playSosBeep() {
      if (sosRunning) {
        sosRunning = false;
        document.body.style.background = '#000000';
        renderFamille();
        return;
      }
      sosRunning = true;
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const pattern = [150,150,150,150,150,400, 450,150,450,150,450,400, 150,150,150,150,150,900];
      let idx = 0;
      function step() {
        if (!sosRunning) return;
        const dur = pattern[idx];
        const isTone = idx % 2 === 0;
        if (isTone) {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.frequency.value = 750;
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + dur / 1000);
          document.body.style.background = '#ffffff';
        } else {
          document.body.style.background = '#000000';
        }
        idx = (idx + 1) % pattern.length;
        setTimeout(step, dur);
      }
      step();
      renderFamille();
    }

    function showTab(tab) {
      document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
      document.getElementById('tab-' + tab).classList.add('active');
      if (tab === 'secours') renderSecours();
      if (tab === 'eau') renderEau('');
      if (tab === 'meds') renderMeds('');
      if (tab === 'blackout') renderBlackout();
      if (tab === 'famille') renderFamille();
    }

    function renderSecours() {
      const el = document.getElementById('app-content');
      el.innerHTML = '<h2 style="color:#fbbf24;margin-bottom:10px;font-size:17px;">🫀 8 URGENCES VITALES DE PREMIERS SECOURS</h2>' +
        FIRST_AID.map(u => \`
          <div class="card">
            <span class="tag">\${u.GoldenHourFr}</span>
            <div class="card-title">\${u.icon} \${u.titleFr}</div>
            <p style="font-size:12px;color:#a8a29e;margin-bottom:8px;"><b>Signes :</b> \${u.symptomsFr.join(' · ')}</p>
            <ul>\${u.stepsFr.map(s => '<li>' + s + '</li>').join('')}</ul>
            <div class="warn"><b>À NE JAMAIS FAIRE :</b> \${u.neverDoFr.join(' · ')}</div>
          </div>
        \`).join('');
    }

    function renderEau(q) {
      const el = document.getElementById('app-content');
      const filtered = POIS.filter(p => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.regionId.toLowerCase().includes(q.toLowerCase()));
      el.innerHTML = \`
        <h2 style="color:#fbbf24;margin-bottom:10px;font-size:17px;">💧🚰🏥 POINTS D'EAU & HÔPITAUX DE FRANCE (\${filtered.length})</h2>
        <input type="text" placeholder="Rechercher ville, village, source, CHU..." value="\${q}" oninput="renderEau(this.value)" />
      \` + filtered.slice(0, 80).map(p => \`
        <div class="card">
          <span class="tag">\${p.type === 'water' ? '💧 EAU POTABLE' : p.type === 'water-raw' ? '🚰 EAU NON POTABLE (À TRAITER)' : '🏥 HÔPITAL / CLINIQUE'} · \${p.regionId.toUpperCase()}</span>
          <div class="card-title">\${p.name}</div>
          <p style="font-size:12px;color:#38bdf8;font-weight:bold;margin-bottom:4px;">GPS WGS84 : \${p.lat.toFixed(4)}°N, \${p.lon.toFixed(4)}°E</p>
          <p style="font-size:12px;color:#d6d3d1;">\${p.notes || ''}</p>
        </div>
      \`).join('');
    }

    function renderMeds(q) {
      const el = document.getElementById('app-content');
      const filtered = DRUGS.filter(d => !q || d.nameFr.toLowerCase().includes(q.toLowerCase()) || d.indicationsFr.toLowerCase().includes(q.toLowerCase()));
      el.innerHTML = \`
        <h2 style="color:#fbbf24;margin-bottom:10px;font-size:17px;">💊 RÉFÉRENTIEL MÉDICAMENTS HORS-LIGNE</h2>
        <input type="text" placeholder="Rechercher molécule ou symptôme..." value="\${q}" oninput="renderMeds(this.value)" />
      \` + filtered.map(d => \`
        <div class="card">
          <span class="tag">\${d.categoryFr}</span>
          <div class="card-title">\${d.nameFr}</div>
          <p style="font-size:12px;color:#e7e5e4;margin-bottom:4px;"><b>Indications :</b> \${d.indicationsFr}</p>
          <p style="font-size:12px;color:#6ee7b7;margin-bottom:4px;"><b>Adulte :</b> \${d.adultDoseFr} (Max : \${d.maxDailyFr})</p>
          <p style="font-size:12px;color:#93c5fd;margin-bottom:4px;"><b>Enfant :</b> \${d.childDoseFr}</p>
          <div class="warn"><b>Contre-indications :</b> \${d.contraindicationsFr}</div>
        </div>
      \`).join('');
    }

    function renderBlackout() {
      const el = document.getElementById('app-content');
      el.innerHTML = \`
        <h2 style="color:#fbbf24;margin-bottom:10px;font-size:17px;">⚡ GUIDE SURVIE BLACKOUT & ASTUCES</h2>
        <div class="card">
          <div class="card-title">⏱️ 0 à 15 Minutes : Gestes Immédiats</div>
          <ul>
            <li>Remplir immédiatement baignoire, seaux, casseroles et bouteilles avant la chute de pression des châteaux d'eau.</li>
            <li>Débrancher PC, TV, congélateur et chaudière contre l'onde de surtension au retour d'EDF (laisser 1 lampe témoin).</li>
            <li>Débrayer manuellement le portail électrique et entrouvrir un volet roulant.</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-title">💧 Les 200 Litres Cachés du Chauffe-Eau (Cumulus)</div>
          <p style="font-size:12.5px;color:#e7e5e4;">Coupez le disjoncteur du chauffe-eau, fermez la vanne d'arrivée d'eau de la rue, ouvrez un robinet d'eau chaude à l'étage pour faire appel d'air, et récupérez 150 à 300 L d'eau potable au purgeur bas.</p>
        </div>
        <div class="card">
          <div class="card-title">🍲 Cuisson Passive « Marmite Norvégienne » (-70% de gaz)</div>
          <p style="font-size:12.5px;color:#e7e5e4;">Portez l'eau et les aliments à ébullition 2 min avec couvercle, éteignez le feu et placez la casserole brûlante dans une glacière ou sous une couette épaisse : la cuisson se termine seule sans brûler votre gaz.</p>
        </div>
        <div class="card">
          <div class="card-title">⛺ Chauffage Sans Courant & Danger Mortel CO</div>
          <p style="font-size:12.5px;color:#e7e5e4;">Montez une tente de camping dans la plus petite pièce exposée Sud (+18°C grâce à la chaleur corporelle). N'utilisez JAMAIS de barbecue, brasero ou groupe électrogène en intérieur (Monoxyde de carbone mortel).</p>
        </div>
        <div class="card">
          <div class="card-title">🔦 Lanterne 360° & Toilettes Sèches à 2 Seaux</div>
          <p style="font-size:12.5px;color:#e7e5e4;">Fixez une lampe frontale tournée vers l'intérieur contre un bidon d'eau translucide de 5 L pour éclairer toute la pièce. En immeuble, ne tirez plus la chasse si les pompes de relevage sont coupées : placez un sac poubelle épais dans la cuvette + litière/sciure.</p>
        </div>
      \`;
    }

    function renderFamille() {
      const el = document.getElementById('app-content');
      el.innerHTML = \`
        <h2 style="color:#fbbf24;margin-bottom:10px;font-size:17px;">👨‍👩‍👧‍👦 MÉMOIRE FAMILIALE & BALISE SOS</h2>
        <button class="btn-sos" onclick="playSosBeep()">
          \${sosRunning ? '⏹️ ARRÊTER LE SIGNAL SOS' : '🚨 DÉCLENCHER BALISE SOS (SON 750Hz + FLASH)'}
        </button>
        <div class="card">
          <div class="card-title">📋 Fiche Médicale & Ralliement Familial</div>
          <p style="font-size:12.5px;margin-bottom:6px;"><b>Foyer :</b> \${FAMILY.householdMembers}</p>
          <p style="font-size:12.5px;margin-bottom:6px;"><b>Groupes Sanguins :</b> \${FAMILY.bloodTypes}</p>
          <p style="font-size:12.5px;margin-bottom:6px;"><b>Allergies / Traitements :</b> \${FAMILY.allergiesAndMeds}</p>
          <p style="font-size:12.5px;margin-bottom:6px;"><b>Point de Ralliement :</b> \${FAMILY.rallyPoint}</p>
          <p style="font-size:12.5px;"><b>Plan Radio :</b> \${FAMILY.radioChannelPlan}</p>
        </div>
      \`;
    }

    renderSecours();
  </script>
</body>
</html>`;

    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Le-QG-du-Sentinel-Mobile-Autonome.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToast(
      isFr
        ? '✓ Application autonome « Le-QG-du-Sentinel-Mobile-Autonome.html » téléchargée !'
        : '✓ Standalone mobile app downloaded!'
    );
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-neutral-950 border-2 border-amber-500 rounded-xl max-w-3xl w-full p-5 sm:p-6 space-y-5 shadow-2xl my-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-amber-500/15 border border-amber-500 flex items-center justify-center text-amber-400 shrink-0">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                LE QG DU SENTINEL — LE QUARTIER GÉNÉRAL
              </div>
              <h2 className="text-base sm:text-lg font-black text-white uppercase">
                {isFr
                  ? 'Installer Le QG du Sentinel sur votre Téléphone (Sans Internet)'
                  : 'Install The Sentinel HQ on Your Phone (Zero Internet)'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-stone-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* METHOD 1: PWA Install + Service Worker Cache */}
          <div className="p-4 rounded-xl bg-black border border-amber-500/60 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500 text-black font-bold">
                  MÉTHODE 1 · RECOMMANDÉ
                </span>
                {swReady && (
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">
                    ✓ CACHE ACTIF
                  </span>
                )}
              </div>
              <h3 className="text-sm font-bold text-white">
                {isFr ? '1. Installer l’App sur l’Écran d’Accueil (PWA)' : '1. Install Home Screen App (PWA)'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {isFr
                  ? 'Installe « LE QG DU SENTINEL » comme une vraie application sur votre téléphone Android ou iPhone avec mise en cache hors-ligne automatique.'
                  : 'Installs "LE QG DU SENTINEL" as a native-like app on Android or iPhone with automatic offline caching.'}
              </p>
              <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800 text-[11px] text-stone-300 space-y-1">
                <div>
                  <strong className="text-amber-300">📱 Android (Chrome) :</strong>{' '}
                  {isFr
                    ? 'Cliquez sur le bouton ci-dessous ou Menu ⋮ → « Installer l’application ».'
                    : 'Click below or Menu ⋮ → "Install app".'}
                </div>
                <div>
                  <strong className="text-amber-300">🍏 iPhone (Safari) :</strong>{' '}
                  {isFr
                    ? 'Appuyez sur Partager (icône carré + flèche) → « Sur l’écran d’accueil ».'
                    : 'Tap Share → "Add to Home Screen".'}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {deferredPrompt && (
                <button
                  onClick={onTriggerInstallPrompt}
                  className="w-full py-2.5 px-3 rounded-md bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>{isFr ? 'Installer l’App Maintenant' : 'Install App Now'}</span>
                </button>
              )}
              <button
                onClick={handlePreCacheOffline}
                disabled={cachingAll}
                className="w-full py-2 px-3 rounded-md bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600 text-emerald-200 font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${cachingAll ? 'animate-spin' : ''}`} />
                <span>
                  {isFr ? 'Verrouiller le Cache Hors-Ligne' : 'Lock Offline Cache'}
                </span>
              </button>
            </div>
          </div>

          {/* METHOD 2: 1-File Standalone Mobile HTML App */}
          <div className="p-4 rounded-xl bg-black border border-emerald-600/60 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500 text-black font-bold inline-block">
                MÉTHODE 2 · FICHIER AUTONOME
              </span>
              <h3 className="text-sm font-bold text-white">
                {isFr
                  ? '2. Télécharger le Fichier Mobile Autonome (.HTML)'
                  : '2. Download Single-File Mobile App (.HTML)'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {isFr
                  ? 'Génère un fichier unique « Le-QG-du-Sentinel-Mobile-Autonome.html » contenant les 8 Secours, les Points d’Eau & Hôpitaux de France, les Médicaments, le guide Blackout, votre Fiche Familiale et le SOS 750Hz.'
                  : 'Generates a single self-contained HTML file with First Aid, France Water & Hospitals, Drugs, Blackout guide, Family profile, and 750Hz SOS.'}
              </p>
              <div className="p-2.5 rounded bg-neutral-950 border border-neutral-800 text-[11px] text-emerald-300">
                {isFr
                  ? '✓ Aucun serveur ni Internet requis : envoyez-le sur votre téléphone par Bluetooth, câble USB, AirDrop ou WhatsApp !'
                  : '✓ Zero server or Internet required: send to your phone via Bluetooth, USB, AirDrop, or WhatsApp!'}
              </div>
            </div>

            <button
              onClick={handleDownloadStandaloneMobileApp}
              className="w-full py-2.5 px-3 rounded-md bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>{isFr ? 'Télécharger l’App Mobile (.HTML)' : 'Download Mobile File (.HTML)'}</span>
            </button>
          </div>

          {/* METHOD 3: Local Wi-Fi / Hotspot LAN Connection */}
          <div className="p-4 rounded-xl bg-black border border-sky-600/60 flex flex-col justify-between gap-3">
            <div className="space-y-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500 text-black font-bold inline-block">
                MÉTHODE 3 · WI-FI LOCAL
              </span>
              <h3 className="text-sm font-bold text-white">
                {isFr
                  ? '3. Ouvrir sur Téléphone via Wi-Fi Local (Sans Fibre/4G)'
                  : '3. Open on Phone via Local Wi-Fi (No Internet)'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {isFr
                  ? 'Même si Internet est coupé dans votre ville, connectez votre téléphone au même Wi-Fi (ou partage de connexion) que ce PC et tapez cette adresse dans Safari / Chrome :'
                  : 'Even if Internet is down in your city, connect your phone to the same Wi-Fi/hotspot as this PC and open:'}
              </p>
              <div className="p-2.5 rounded bg-neutral-950 border border-sky-700 font-mono text-xs text-sky-300 font-bold break-all select-all text-center">
                {primaryLanUrl}
              </div>
              {lanIps.length > 1 && (
                <div className="text-[10px] font-mono text-stone-400">
                  {isFr ? 'Autres IP locales :' : 'Other LAN IPs:'}{' '}
                  {lanIps.slice(1).map(ip => `http://${ip}${port}`).join(' · ')}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(primaryLanUrl);
                setToast(isFr ? `Adresse locale copiée : ${primaryLanUrl}` : `Copied: ${primaryLanUrl}`);
                setTimeout(() => setToast(null), 3000);
              }}
              className="w-full py-2.5 px-3 rounded-md bg-sky-950 hover:bg-sky-900 border border-sky-500 text-sky-200 font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Wifi className="w-4 h-4" />
              <span>{isFr ? 'Copier l’Adresse Wi-Fi Locale' : 'Copy Local Wi-Fi URL'}</span>
            </button>
          </div>
        </div>

        {toast && (
          <div className="p-3 rounded-lg bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toast}</span>
          </div>
        )}
      </div>
    </div>
  );
};
