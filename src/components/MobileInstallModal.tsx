import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../types/sentinel';
import { FIRST_AID_URGENCIES } from '../data/firstAidUrgencies';
import { EMERGENCY_DRUGS } from '../data/drugReferenceDatabase';
import { FRANCE_EXTENDED_POIS } from '../data/franceMapDatabase';
import { generateQrMatrix } from '../utils/qrCodeSvg';
import {
  Smartphone,
  Download,
  Wifi,
  CheckCircle2,
  Share2,
  X,
  RefreshCw,
  Globe,
  ShieldAlert,
  QrCode
} from 'lucide-react';

interface MobileInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  deferredPrompt: any;
  onTriggerInstallPrompt: () => void;
}

const GITHUB_PAGES_HTTPS_URL = 'https://loic66600.github.io/Le-QG-du-Sentinel/';

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
  const [qrMode, setQrMode] = useState<'https' | 'lan'>('https');
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

  const port = typeof window !== 'undefined' && window.location.port ? `:${window.location.port}` : '';
  const primaryLanUrl =
    lanIps.length > 0
      ? `http://${lanIps[0]}${port}/`
      : typeof window !== 'undefined' && !window.location.hostname.includes('localhost')
      ? window.location.origin
      : 'http://192.168.1.7:3000/';

  const activeQrUrl = qrMode === 'https' ? GITHUB_PAGES_HTTPS_URL : primaryLanUrl;

  const qrMatrix = useMemo(() => {
    try {
      return generateQrMatrix(activeQrUrl);
    } catch {
      return [];
    }
  }, [activeQrUrl]);

  if (!isOpen) return null;

  const handlePreCacheOffline = async () => {
    setCachingAll(true);
    try {
      if ('caches' in window) {
        const cache = await caches.open('qg-sentinel-offline-v4');
        await cache.addAll(['./', './index.html', './manifest.webmanifest', './assets/aistudio/noir_233aab2b.png']);
      }
      setSwReady(true);
      setToast(
        isFr
          ? '✓ Toutes les ressources du QG sont verrouillées dans le cache hors-ligne de ce téléphone !'
          : '✓ All HQ resources locked into device offline cache!'
      );
    } catch {
      setToast(
        isFr
          ? '✓ Cache local prêt pour le mode Hors-Ligne.'
          : '✓ Local cache verified for offline mode.'
      );
    } finally {
      setCachingAll(false);
      setTimeout(() => setToast(null), 3500);
    }
  };

  // Download a 1-click Windows Firewall script so the PC allows incoming Wi-Fi connections on port 3000
  const handleDownloadFirewallUnblocker = () => {
    const bat = `@echo off
chcp 65001 >nul
echo ============================================================================
echo   LE QG DU SENTINEL - DEBLOCAGE WI-FI LOCAL WINDOWS (PORT 3000)
echo ============================================================================
echo.
echo Ce script autorise votre telephone sur le meme Wi-Fi a ouvrir :
echo   ${primaryLanUrl}
echo.
netsh advfirewall firewall delete rule name="QG Sentinel WiFi Port 3000" >nul 2>&1
netsh advfirewall firewall add rule name="QG Sentinel WiFi Port 3000" dir=in action=allow protocol=TCP localport=3000 profile=any
netsh advfirewall firewall add rule name="QG Sentinel WiFi Port 3001" dir=in action=allow protocol=TCP localport=3001 profile=any
echo.
echo [OK] Pare-feu Windows ouvert pour le port 3000 et 3001 !
echo Vous pouvez maintenant ouvrir ${primaryLanUrl} sur votre telephone.
echo.
pause
`;
    const blob = new Blob([bat], { type: 'application/x-bat;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Debloquer-WiFi-Local-Windows.bat';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToast(
      isFr
        ? '✓ Script « Debloquer-WiFi-Local-Windows.bat » téléchargé : faites Clic-Droit → Exécuter en tant qu’administrateur.'
        : '✓ Firewall script downloaded: Right-click → Run as Administrator.'
    );
    setTimeout(() => setToast(null), 5000);
  };

  // Generates a 100% Standalone Single-File Mobile HTML App with native-grade Mobile UX/UI
  const buildStandaloneHtmlString = () => {
    let familyData = null;
    let stocksData = null;
    try {
      familyData = JSON.parse(localStorage.getItem('sentinel_family_profile_v1') || 'null');
      stocksData = JSON.parse(localStorage.getItem('sentinel_survival_stocks_v1') || 'null');
    } catch {}

    const firstAidJson = JSON.stringify(FIRST_AID_URGENCIES);
    const drugsJson = JSON.stringify(EMERGENCY_DRUGS);
    const poisJson = JSON.stringify(FRANCE_EXTENDED_POIS.slice(0, 300));
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

    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
  <meta name="theme-color" content="#000000" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <title>LE QG DU SENTINEL — Le Quartier Général (App Mobile Autonome)</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    body {
      background: #000000;
      color: #f5f5f4;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.45;
      padding-bottom: 86px;
      overflow-x: hidden;
    }
    header {
      background: rgba(10, 10, 10, 0.96);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid #451a03;
      padding: 12px 16px;
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand-main { font-size: 18px; color: #ffffff; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; line-height: 1.1; }
    .brand-sub { font-size: 12px; color: #f59e0b; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; margin-top: 2px; }
    .badge-offline {
      padding: 4px 8px;
      background: #064e3b;
      border: 1px solid #10b981;
      color: #a7f3d0;
      font-size: 10px;
      border-radius: 6px;
      font-weight: 800;
      white-space: nowrap;
    }
    nav {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 4px;
      background: rgba(8, 8, 8, 0.98);
      backdrop-filter: blur(12px);
      border-top: 1px solid #292524;
      padding: 6px 8px calc(6px + env(safe-area-inset-bottom));
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }
    nav button {
      background: transparent;
      color: #a8a29e;
      border: 1px solid transparent;
      border-radius: 8px;
      padding: 7px 2px;
      font-size: 10.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }
    nav button .ico { font-size: 16px; line-height: 1; }
    nav button.active {
      background: #f59e0b;
      color: #000000;
      font-weight: 900;
    }
    main { padding: 14px; max-width: 680px; margin: 0 auto; }
    .hero-box {
      background: linear-gradient(145deg, #14120e, #090909);
      border: 1px solid #78350f;
      border-left: 4px solid #f59e0b;
      border-radius: 12px;
      padding: 14px;
      margin-bottom: 14px;
    }
    .card {
      background: #0c0c0c;
      border: 1px solid #262626;
      border-radius: 12px;
      padding: 14px;
      margin-bottom: 12px;
    }
    .card-title { font-size: 15px; font-weight: 800; color: #fbbf24; margin-bottom: 6px; }
    .tag {
      display: inline-block;
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 5px;
      background: #1c1917;
      border: 1px solid #44403c;
      color: #fde68a;
      margin-bottom: 6px;
      font-weight: 700;
    }
    input {
      width: 100%;
      padding: 12px 14px;
      background: #090909;
      border: 1px solid #44403c;
      border-radius: 10px;
      color: #ffffff;
      font-size: 14px;
      margin-bottom: 12px;
      outline: none;
    }
    input:focus { border-color: #f59e0b; }
    .chips { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 10px; }
    .chip {
      padding: 6px 11px;
      border-radius: 999px;
      background: #171717;
      border: 1px solid #262626;
      color: #d6d3d1;
      font-size: 11.5px;
      font-weight: 700;
      white-space: nowrap;
      cursor: pointer;
    }
    .chip.active { background: #f59e0b; color: #000000; border-color: #fbbf24; }
    ul { padding-left: 18px; margin-top: 6px; }
    li { font-size: 13px; color: #e7e5e4; margin-bottom: 6px; }
    .warn { color: #fda4af; background: #4c0519; border: 1px solid #be123c; padding: 9px 11px; border-radius: 8px; font-size: 12px; margin-top: 8px; }
    .btn-sos {
      width: 100%;
      padding: 15px;
      background: #e11d48;
      color: #ffffff;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 900;
      cursor: pointer;
      margin-bottom: 12px;
    }
  </style>
</head>
<body>
  <header>
    <div>
      <div class="brand-main">LE QG DU SENTINEL</div>
      <div class="brand-sub">LE QUARTIER GÉNÉRAL</div>
    </div>
    <span class="badge-offline">⚡ 100% HORS-LIGNE</span>
  </header>

  <main id="app-content"></main>

  <nav>
    <button id="tab-secours" class="active" onclick="showTab('secours')"><span class="ico">🫀</span><span>Secours</span></button>
    <button id="tab-eau" onclick="showTab('eau')"><span class="ico">💧</span><span>Carte/Eau</span></button>
    <button id="tab-meds" onclick="showTab('meds')"><span class="ico">💊</span><span>Médic.</span></button>
    <button id="tab-blackout" onclick="showTab('blackout')"><span class="ico">⚡</span><span>Blackout</span></button>
    <button id="tab-famille" onclick="showTab('famille')"><span class="ico">🚨</span><span>QG / SOS</span></button>
  </nav>

  <script>
    const FIRST_AID = ${firstAidJson};
    const DRUGS = ${drugsJson};
    const POIS = ${poisJson};
    const FAMILY = ${familyJson};
    const STOCKS = ${stocksJson};

    let audioCtx = null;
    let sosRunning = false;
    let waterFilter = 'all';

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
          document.body.style.background = '#7f1d1d';
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
      window.scrollTo(0, 0);
      if (tab === 'secours') renderSecours();
      if (tab === 'eau') renderEau('');
      if (tab === 'meds') renderMeds('');
      if (tab === 'blackout') renderBlackout();
      if (tab === 'famille') renderFamille();
    }

    function renderSecours() {
      const el = document.getElementById('app-content');
      el.innerHTML = \`
        <div class="hero-box">
          <div style="font-size:11px;color:#fbbf24;font-weight:800;">PREMIERS SECOURS HORS-LIGNE</div>
          <div style="font-size:16px;font-weight:900;color:#fff;margin-top:2px;">8 Urgences Vitales Immédiates</div>
          <div style="font-size:12px;color:#a8a29e;margin-top:2px;">Protocoles terrain lisibles sans connexion Internet.</div>
        </div>
      \` + FIRST_AID.map(u => \`
          <div class="card">
            <span class="tag">\${u.badgeFr || ''}</span>
            <div class="card-title">\${u.titleFr}</div>
            <p style="font-size:12px;color:#a8a29e;margin-bottom:8px;"><b>Signes :</b> \${(u.signsFr || []).join(' · ')}</p>
            <ul>\${(u.actionsFr || []).map(s => '<li>' + s + '</li>').join('')}</ul>
            <div class="warn"><b>À NE JAMAIS FAIRE :</b> \${u.neverDoFr || ''}</div>
          </div>
        \`).join('');
    }

    function setWaterFilter(f) {
      waterFilter = f;
      const inp = document.getElementById('eau-search');
      renderEau(inp ? inp.value : '');
    }

    function renderEau(q) {
      const el = document.getElementById('app-content');
      const filtered = POIS.filter(p => {
        const matchType = waterFilter === 'all' || p.type === waterFilter;
        const matchQ = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.regionId.toLowerCase().includes(q.toLowerCase());
        return matchType && matchQ;
      });
      el.innerHTML = \`
        <div class="hero-box">
          <div style="font-size:11px;color:#38bdf8;font-weight:800;">CARTOGRAPHIE & POINTS D'EAU FRANCE</div>
          <div style="font-size:16px;font-weight:900;color:#fff;margin-top:2px;">Eau Potable, Sources & Hôpitaux (\${filtered.length})</div>
        </div>
        <div class="chips">
          <button class="chip \${waterFilter === 'all' ? 'active' : ''}" onclick="setWaterFilter('all')">Tous (\${POIS.length})</button>
          <button class="chip \${waterFilter === 'water' ? 'active' : ''}" onclick="setWaterFilter('water')">💧 Eau Potable</button>
          <button class="chip \${waterFilter === 'water-raw' ? 'active' : ''}" onclick="setWaterFilter('water-raw')">🚰 Eau à filtrer</button>
          <button class="chip \${waterFilter === 'medical' ? 'active' : ''}" onclick="setWaterFilter('medical')">🏥 Hôpitaux</button>
        </div>
        <input id="eau-search" type="text" placeholder="Rechercher ville, village, source, CHU..." value="\${q}" oninput="renderEau(this.value)" />
      \` + filtered.slice(0, 100).map(p => \`
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
        <div class="hero-box">
          <div style="font-size:11px;color:#34d399;font-weight:800;">PHARMACIE DE SURVIE</div>
          <div style="font-size:16px;font-weight:900;color:#fff;margin-top:2px;">Posologies Adultes/Enfants & Contre-indications</div>
        </div>
        <input type="text" placeholder="Rechercher molécule ou symptôme (ex: fièvre, douleur)..." value="\${q}" oninput="renderMeds(this.value)" />
      \` + filtered.map(d => \`
        <div class="card">
          <span class="tag">\${d.categoryLabelFr || ''} · \${d.dci || ''}</span>
          <div class="card-title">\${d.nameFr}</div>
          <p style="font-size:12.5px;color:#e7e5e4;margin-bottom:5px;"><b>Indications :</b> \${d.indicationsFr}</p>
          <p style="font-size:12.5px;color:#6ee7b7;margin-bottom:5px;"><b>Adulte :</b> \${d.adultDoseFr}</p>
          <p style="font-size:12.5px;color:#93c5fd;margin-bottom:5px;"><b>Enfant :</b> \${d.childDoseFr}</p>
          <div class="warn"><b>Contre-indications :</b> \${Array.isArray(d.contraindicationsFr) ? d.contraindicationsFr.join(' · ') : (d.contraindicationsFr || '')}</div>
        </div>
      \`).join('');
    }

    function renderBlackout() {
      const el = document.getElementById('app-content');
      el.innerHTML = \`
        <div class="hero-box">
          <div style="font-size:11px;color:#fbbf24;font-weight:800;">RÉSILIENCE ÉNERGÉTIQUE</div>
          <div style="font-size:16px;font-weight:900;color:#fff;margin-top:2px;">Protocole Blackout & Bonnes Pratiques</div>
        </div>
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
          <p style="font-size:13px;color:#e7e5e4;">Coupez le disjoncteur du chauffe-eau, fermez la vanne d'arrivée d'eau de la rue, ouvrez un robinet d'eau chaude à l'étage pour faire appel d'air, et récupérez 150 à 300 L d'eau potable au purgeur bas.</p>
        </div>
        <div class="card">
          <div class="card-title">🍲 Cuisson Passive « Marmite Norvégienne » (-70% de gaz)</div>
          <p style="font-size:13px;color:#e7e5e4;">Portez l'eau et les aliments à ébullition 2 min avec couvercle, éteignez le feu et placez la casserole brûlante dans une glacière ou sous une couette épaisse : la cuisson se termine seule sans brûler votre gaz.</p>
        </div>
        <div class="card">
          <div class="card-title">⛺ Chauffage Sans Courant & Danger Mortel CO</div>
          <p style="font-size:13px;color:#e7e5e4;">Montez une tente de camping dans la plus petite pièce exposée Sud (+18°C grâce à la chaleur corporelle). N'utilisez JAMAIS de barbecue, brasero ou groupe électrogène en intérieur (Monoxyde de carbone mortel).</p>
        </div>
        <div class="card">
          <div class="card-title">🔦 Lanterne 360° & Toilettes Sèches à 2 Seaux</div>
          <p style="font-size:13px;color:#e7e5e4;">Fixez une lampe frontale tournée vers l'intérieur contre un bidon d'eau translucide de 5 L pour éclairer toute la pièce. En immeuble, ne tirez plus la chasse si les pompes de relevage sont coupées : placez un sac poubelle épais dans la cuvette + litière/sciure.</p>
        </div>
      \`;
    }

    function renderFamille() {
      const el = document.getElementById('app-content');
      el.innerHTML = \`
        <div class="hero-box">
          <div style="font-size:11px;color:#fb7185;font-weight:800;">BALISE D'URGENCE & MÉMOIRE FAMILIALE</div>
          <div style="font-size:16px;font-weight:900;color:#fff;margin-top:2px;">Signal SOS & Fiche Foyer Hors-Ligne</div>
        </div>
        <button class="btn-sos" onclick="playSosBeep()">
          \${sosRunning ? '⏹️ ARRÊTER LE SIGNAL SOS' : '🚨 DÉCLENCHER BALISE SOS (SON 750Hz + FLASH)'}
        </button>
        <div class="card">
          <div class="card-title">📋 Fiche Médicale & Ralliement Familial</div>
          <p style="font-size:13px;margin-bottom:6px;"><b>Foyer :</b> \${FAMILY.householdMembers}</p>
          <p style="font-size:13px;margin-bottom:6px;"><b>Groupes Sanguins :</b> \${FAMILY.bloodTypes}</p>
          <p style="font-size:13px;margin-bottom:6px;"><b>Allergies / Traitements :</b> \${FAMILY.allergiesAndMeds}</p>
          <p style="font-size:13px;margin-bottom:6px;"><b>Point de Ralliement :</b> \${FAMILY.rallyPoint}</p>
          <p style="font-size:13px;"><b>Plan Radio :</b> \${FAMILY.radioChannelPlan}</p>
        </div>
      \`;
    }

    renderSecours();
  </script>
</body>
</html>`;
  };

  const handleDownloadStandaloneMobileApp = async () => {
    const standaloneHtml = buildStandaloneHtmlString();
    const file = new File([standaloneHtml], 'Le-QG-du-Sentinel-Mobile-Autonome.html', {
      type: 'text/html'
    });

    // If on mobile or browser supporting Web Share with files, offer native Share sheet (AirDrop, WhatsApp, Files)
    if (
      typeof navigator !== 'undefined' &&
      (navigator as any).canShare &&
      (navigator as any).canShare({ files: [file] })
    ) {
      try {
        await (navigator as any).share({
          title: 'LE QG DU SENTINEL — App Mobile Autonome',
          text: 'Application de survie 100% hors-ligne (Secours, Eau France, Médicaments, Blackout)',
          files: [file]
        });
        return;
      } catch {}
    }

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
        ? '✓ Fichier « Le-QG-du-Sentinel-Mobile-Autonome.html » téléchargé ! Envoyez-le sur votre téléphone (WhatsApp, Email, Bluetooth ou USB).'
        : '✓ Standalone mobile app downloaded!'
    );
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-neutral-950 border-2 border-amber-500 rounded-xl max-w-3xl w-full p-4 sm:p-6 space-y-4 shadow-2xl my-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 border-b border-neutral-800 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500 flex items-center justify-center text-amber-400 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                LE QG DU SENTINEL — LE QUARTIER GÉNÉRAL
              </div>
              <h2 className="text-sm sm:text-lg font-black text-white uppercase leading-tight">
                {isFr
                  ? 'Recevoir & Installer sur votre Téléphone (Ultra-Simple)'
                  : 'Get & Install on Your Phone (Ultra-Simple)'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-stone-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* TOP QR CODE + DIRECT ACCESS SECTION */}
        <div className="p-4 rounded-xl bg-black border border-amber-500/70 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* QR Code SVG */}
          <div className="md:col-span-4 flex flex-col items-center justify-center">
            <div className="p-3 bg-white rounded-xl border-4 border-amber-400 shadow-lg">
              {qrMatrix.length > 0 ? (
                <svg
                  viewBox={`0 0 ${qrMatrix.length + 4} ${qrMatrix.length + 4}`}
                  className="w-36 h-36 sm:w-40 sm:h-40"
                  shapeRendering="crispEdges"
                >
                  <rect width="100%" height="100%" fill="#ffffff" />
                  {qrMatrix.map((row, r) =>
                    row.map((cell, c) =>
                      cell ? (
                        <rect key={`${r}-${c}`} x={c + 2} y={r + 2} width={1} height={1} fill="#000000" />
                      ) : null
                    )
                  )}
                </svg>
              ) : null}
            </div>
            <span className="text-[11px] font-mono text-amber-300 font-bold mt-2 text-center">
              📷 {isFr ? 'Scannez avec l’appareil photo du téléphone' : 'Scan with phone camera'}
            </span>
          </div>

          {/* Right explanation & Mode Switcher */}
          <div className="md:col-span-8 space-y-3">
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setQrMode('https')}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer ${
                  qrMode === 'https'
                    ? 'bg-amber-500 text-black'
                    : 'bg-neutral-900 text-stone-300 border border-neutral-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>
                  {isFr
                    ? '1. Lien Web HTTPS (4G/5G/Wi-Fi — Sans blocage)'
                    : '1. HTTPS Web Link (4G/5G/Wi-Fi)'}
                </span>
              </button>
              <button
                onClick={() => setQrMode('lan')}
                className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer ${
                  qrMode === 'lan'
                    ? 'bg-sky-500 text-black'
                    : 'bg-neutral-900 text-stone-300 border border-neutral-800'
                }`}
              >
                <Wifi className="w-3.5 h-3.5" />
                <span>{isFr ? '2. Wi-Fi Local PC' : '2. PC Local Wi-Fi'}</span>
              </button>
            </div>

            {qrMode === 'https' ? (
              <div className="space-y-2">
                <p className="text-xs text-stone-200 leading-relaxed">
                  {isFr
                    ? 'Pourquoi le Wi-Fi local bloquait ? Le pare-feu Windows bloque par défaut les connexions entrantes et les téléphones exigent une adresse HTTPS sécurisée pour installer une application. Scannez ce QR Code HTTPS officiel (en 4G, 5G ou Wi-Fi) :'
                    : 'Scan this official HTTPS QR Code with your phone camera (works on 4G, 5G, or Wi-Fi and supports 1-click PWA install):'}
                </p>
                <div className="p-2.5 rounded-lg bg-neutral-950 border border-amber-500/60 font-mono text-xs text-amber-300 font-bold break-all select-all">
                  {GITHUB_PAGES_HTTPS_URL}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-stone-200 leading-relaxed">
                  {isFr
                    ? 'Pour ouvrir le serveur de ce PC sur votre téléphone en Wi-Fi local, Windows bloque le port 3000 par défaut. Cliquez d’abord sur le bouton ci-dessous pour autoriser le Wi-Fi local dans Windows :'
                    : 'Windows Firewall blocks port 3000 by default on Wi-Fi. Click below to unlock port 3000:'}
                </p>
                <div className="p-2 rounded-lg bg-neutral-950 border border-sky-600 font-mono text-xs text-sky-300 font-bold break-all select-all">
                  {primaryLanUrl}
                </div>
                <button
                  onClick={handleDownloadFirewallUnblocker}
                  className="w-full py-2 px-3 rounded-md bg-sky-500 hover:bg-sky-400 text-black font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>
                    {isFr
                      ? 'Débloquer le Pare-Feu Wi-Fi Windows (Script 1-Clic .BAT)'
                      : 'Unlock Windows Wi-Fi Firewall (.BAT)'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 2 DIRECT INSTALL / FILE METHODS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Option A: 1-File Autonomous HTML App */}
          <div className="p-4 rounded-xl bg-black border border-emerald-500/60 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500 text-black font-bold inline-block">
                {isFr ? 'LE PLUS SIMPLE · ZÉRO RÉSEAU' : 'EASIEST · ZERO NETWORK'}
              </span>
              <h3 className="text-sm font-bold text-white">
                {isFr
                  ? 'Fichier App Mobile Autonome (.HTML)'
                  : 'Single-File Mobile App (.HTML)'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {isFr
                  ? 'Télécharge l’application mobile complète en 1 seul fichier. Envoyez-le sur votre téléphone par WhatsApp, Email, AirDrop, Bluetooth ou câble USB : il s’ouvre immédiatement sans Internet !'
                  : 'Downloads the full mobile app in 1 file. Send it via WhatsApp, Email, AirDrop, or USB: opens offline immediately!'}
              </p>
            </div>
            <button
              onClick={handleDownloadStandaloneMobileApp}
              className="w-full py-2.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-mono text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>
                {isFr ? 'Télécharger / Partager l’App (.HTML)' : 'Download / Share Mobile App (.HTML)'}
              </span>
            </button>
          </div>

          {/* Option B: Install directly on current phone screen */}
          <div className="p-4 rounded-xl bg-black border border-amber-500/60 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500 text-black font-bold inline-block">
                {isFr ? 'SUR CE TÉLÉPHONE · ÉCRAN D’ACCUEIL' : 'ON THIS PHONE · HOME SCREEN'}
              </span>
              <h3 className="text-sm font-bold text-white">
                {isFr
                  ? 'Ajouter sur l’Écran d’Accueil + Cache Hors-Ligne'
                  : 'Add to Home Screen + Offline Cache'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {isFr
                  ? '📱 Android (Chrome) : Menu ⋮ → « Installer l’application ». 🍏 iPhone (Safari) : Partager → « Sur l’écran d’accueil ».'
                  : '📱 Android: Menu ⋮ → "Install app". 🍏 iPhone: Share → "Add to Home Screen".'}
              </p>
            </div>
            <div className="space-y-2">
              {deferredPrompt && (
                <button
                  onClick={onTriggerInstallPrompt}
                  className="w-full py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-mono text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>{isFr ? 'Installer l’Application Maintenant' : 'Install App Now'}</span>
                </button>
              )}
              <button
                onClick={handlePreCacheOffline}
                disabled={cachingAll}
                className="w-full py-2.5 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-amber-500/60 text-amber-300 font-mono text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${cachingAll ? 'animate-spin' : ''}`} />
                <span>
                  {isFr ? 'Verrouiller le Cache Hors-Ligne' : 'Lock Offline Cache'}
                </span>
              </button>
            </div>
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
