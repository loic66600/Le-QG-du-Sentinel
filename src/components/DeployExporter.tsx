import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types/sentinel';
import { SUPPLY_DEPOT_PACKS, SupplyDepotPack } from '../data/supplyDepotPacks';
import { EXTERNAL_RESOURCES_CATALOG, ExternalSurvivalResource } from '../data/externalResourcesCatalog';
import { FIRST_AID_URGENCIES, FirstAidUrgencyCard } from '../data/firstAidUrgencies';
import { RADIO_FREQUENCIES, BUG_OUT_BAG_ITEMS } from '../data/survivalDatabase';
import {
  DrugReferenceModule,
  EvacuationDecisionModule,
  SosMorseSignalerModule
} from './EmergencyToolsModules';
import {
  BookOpen,
  Search,
  Download,
  CheckCircle2,
  HeartPulse,
  Droplet,
  Leaf,
  Sparkles,
  Stethoscope,
  Utensils,
  Snowflake,
  Compass,
  Link2,
  ShieldCheck,
  Radiation,
  Baby,
  Clock,
  Sun,
  Wrench,
  Radio,
  X,
  Printer,
  FolderDown,
  Globe,
  FileText,
  ExternalLink,
  Upload,
  ZoomIn,
  ZoomOut,
  AlertTriangle,
  Layers,
  Trash2,
  Calculator,
  Briefcase,
  Check,
  Scale,
  Users,
  Calendar,
  Pill
} from 'lucide-react';

interface DeployExporterProps {
  language: Language;
}

interface CustomUserDoc {
  id: string;
  title: string;
  filename: string;
  addedAt: string;
  content: string;
}

interface KiwixRemoteEntry {
  id: string;
  title: string;
  summary: string;
  language: string;
  updated: string;
  sizeMb: number;
  downloadUrl: string;
}

const STORAGE_KEY_INSTALLED = 'sentinel_supply_depot_installed_v2';
const STORAGE_KEY_CUSTOM_DOCS = 'sentinel_custom_user_docs_v1';

export const DeployExporter: React.FC<DeployExporterProps> = ({ language }) => {
  const isFr = language === 'fr';

  const [mainSection, setMainSection] = useState<
    | 'first-aid'
    | 'drugs'
    | 'local-manuals'
    | 'tools-72h'
    | 'evac-risk'
    | 'sos-morse'
    | 'external-catalog'
  >('first-aid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [extCategory, setExtCategory] = useState<string>('all');
  const [selectedUrgencyId, setSelectedUrgencyId] = useState<string>('all');

  const [installedIds, setInstalledIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INSTALLED);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['pack-tccc-first-aid', 'pack-water-purification', 'pack-home-remedies', 'pack-natural-remedies'];
  });

  const [customDocs, setCustomDocs] = useState<CustomUserDoc[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CUSTOM_DOCS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Merged Tools & 72h State (from KnowledgeVault)
  const [peopleCount, setPeopleCount] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('sentinel_calc_people')) || 2;
    } catch {
      return 2;
    }
  });
  const [daysCount, setDaysCount] = useState<number>(() => {
    try {
      return Number(localStorage.getItem('sentinel_calc_days')) || 14;
    } catch {
      return 14;
    }
  });
  const [climate, setClimate] = useState<'temperate' | 'hot' | 'winter'>(() => {
    try {
      return (localStorage.getItem('sentinel_calc_climate') as any) || 'temperate';
    } catch {
      return 'temperate';
    }
  });

  const [checkedBobItems, setCheckedBobItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('sentinel_bob_checked_v2');
      return saved ? JSON.parse(saved) : { b1: true, b2: true, b4: true, b9: true, b10: true };
    } catch {
      return { b1: true, b2: true, b4: true, b9: true, b10: true };
    }
  });

  const toggleBobItem = (id: string) => {
    setCheckedBobItems(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('sentinel_bob_checked_v2', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const [activePackModal, setActivePackModal] = useState<SupplyDepotPack | null>(null);
  const [readerFontSize, setReaderFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live Kiwix OPDS API Search State
  const [kiwixQuery, setKiwixQuery] = useState<string>('medecine');
  const [kiwixLang, setKiwixLang] = useState<'fra' | 'eng' | 'all'>('fra');
  const [kiwixResults, setKiwixResults] = useState<KiwixRemoteEntry[]>([]);
  const [kiwixLoading, setKiwixLoading] = useState<boolean>(false);
  const [kiwixError, setKiwixError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const targetUrgency = sessionStorage.getItem('sentinel_open_urgency_id');
      if (targetUrgency) {
        setMainSection('first-aid');
        setSelectedUrgencyId(targetUrgency);
        sessionStorage.removeItem('sentinel_open_urgency_id');
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INSTALLED, JSON.stringify(installedIds));
    } catch {}
  }, [installedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM_DOCS, JSON.stringify(customDocs));
    } catch {}
  }, [customDocs]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Autonomy calculations
  const waterPerPersonPerDay = climate === 'hot' ? 4.5 : climate === 'winter' ? 3.0 : 2.5;
  const totalWaterLitres = Math.round(peopleCount * (waterPerPersonPerDay + 1.0) * daysCount);
  const caloriesPerPerson = climate === 'winter' ? 2800 : 2200;
  const totalCalories = Math.round(peopleCount * caloriesPerPerson * daysCount);
  const totalBatteryCapacityWh = Math.round((peopleCount * 30 + 150) * 3);

  const currentBobWeightGrams = BUG_OUT_BAG_ITEMS.reduce(
    (acc, item) => (checkedBobItems[item.id] ? acc + item.weightGrams : acc),
    0
  );

  // Convert Markdown content to a clean standalone printable HTML document
  const buildStyledHtmlDocument = (pack: SupplyDepotPack): string => {
    const htmlBody = pack.contentFr
      .replace(/^# (.*)$/gm, '<h1>$1</h1>')
      .replace(/^## (.*)$/gm, '<h2>$1</h2>')
      .replace(/^### (.*)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^- (.*)$/gm, '<li>$1</li>')
      .replace(/^---$/gm, '<hr/>');

    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>${pack.titleFr} — Documentation d'Urgence Sentinel</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 860px; margin: 32px auto; padding: 0 24px; color: #18181b; line-height: 1.65; background: #fafafa; }
    h1 { font-size: 1.65rem; border-bottom: 3px solid #d97706; padding-bottom: 10px; color: #111827; }
    h2 { font-size: 1.25rem; margin-top: 28px; padding: 8px 12px; background: #fef3c7; border-left: 4px solid #d97706; color: #92400e; }
    h3 { font-size: 1.05rem; margin-top: 20px; color: #1f2937; }
    li { margin: 6px 0; }
    hr { border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    strong { color: #000; }
    .meta { font-size: 0.85rem; color: #52525b; margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="meta">SENTINEL PACK SURVIE · Source : ${pack.source} · Catégorie : ${pack.categoryLabelFr}</div>
  ${htmlBody}
</body>
</html>`;
  };

  const handleDownloadPackHtml = (pack: SupplyDepotPack) => {
    const htmlContent = buildStyledHtmlDocument(pack);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = pack.filename.replace(/\.md$/, '.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (!installedIds.includes(pack.id)) {
      setInstalledIds(prev => [...prev, pack.id]);
    }
    showToast(
      isFr
        ? `Manuel « ${pack.titleFr} » téléchargé en fiche HTML mise en page.`
        : `Manual "${pack.titleEn}" downloaded as formatted HTML.`
    );
  };

  const handleDownloadAllPacks = () => {
    const compiled = SUPPLY_DEPOT_PACKS.map(p => buildStyledHtmlDocument(p)).join(
      '\n<hr style="page-break-after:always;"/>\n'
    );
    const blob = new Blob([compiled], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Sentinel-Documentation-Urgence-Integrale-16-Manuels.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setInstalledIds(SUPPLY_DEPOT_PACKS.map(p => p.id));
    showToast(
      isFr
        ? 'Les 16 manuels mis en page ont été téléchargés !'
        : 'All 16 formatted survival manuals downloaded!'
    );
  };

  // Search Live Kiwix OPDS API via Vite proxy
  const searchKiwixCatalog = async () => {
    setKiwixLoading(true);
    setKiwixError(null);
    try {
      const res = await fetch(
        `/api/kiwix-search?q=${encodeURIComponent(kiwixQuery)}&lang=${kiwixLang}&count=16`
      );
      const data = await res.json();
      if (Array.isArray(data.entries) && data.entries.length > 0) {
        setKiwixResults(data.entries);
      } else {
        setKiwixResults([]);
        if (data.error) {
          setKiwixError(
            isFr
              ? 'Mode hors-ligne détecté : utilisez les téléchargements pré-indexés ci-dessus.'
              : 'Offline mode detected: use the pre-indexed downloads above.'
          );
        }
      }
    } catch {
      setKiwixError(
        isFr ? 'Serveur Kiwix injoignable (mode Air-Gap actif).' : 'Kiwix catalog unreachable.'
      );
    } finally {
      setKiwixLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : '';
      const newDoc: CustomUserDoc = {
        id: `custom-${Date.now()}`,
        title: file.name.replace(/\.(md|txt|html)$/i, ''),
        filename: file.name,
        addedAt: new Date().toLocaleDateString('fr-FR'),
        content: text
      };
      setCustomDocs(prev => [newDoc, ...prev]);
      setMainSection('local-manuals');
      showToast(
        isFr
          ? `Document personnel « ${file.name} » ajouté à votre bibliothèque !`
          : `Personal file "${file.name}" added to your library!`
      );
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const renderPackIcon = (iconName: SupplyDepotPack['iconName']) => {
    const cls = 'w-5 h-5 text-amber-400';
    switch (iconName) {
      case 'heart-pulse':
        return <HeartPulse className={cls} />;
      case 'droplet':
        return <Droplet className={cls} />;
      case 'leaf':
        return <Leaf className={cls} />;
      case 'sparkles':
        return <Sparkles className={cls} />;
      case 'stethoscope':
        return <Stethoscope className={cls} />;
      case 'utensils':
        return <Utensils className={cls} />;
      case 'snowflake':
        return <Snowflake className={cls} />;
      case 'compass':
        return <Compass className={cls} />;
      case 'link':
        return <Link2 className={cls} />;
      case 'shield-check':
        return <ShieldCheck className={cls} />;
      case 'radiation':
        return <Radiation className={cls} />;
      case 'baby':
        return <Baby className={cls} />;
      case 'clock':
        return <Clock className={cls} />;
      case 'sun':
        return <Sun className={cls} />;
      case 'wrench':
        return <Wrench className={cls} />;
      case 'radio':
        return <Radio className={cls} />;
    }
  };

  const getCategoryBadgeStyle = (category: SupplyDepotPack['category']) => {
    switch (category) {
      case 'medecine':
        return 'bg-rose-950/90 text-rose-200 border-rose-700/70';
      case 'eau-alimentation':
        return 'bg-amber-950/90 text-amber-200 border-amber-700/70';
      case 'remedes':
        return 'bg-emerald-950/90 text-emerald-200 border-emerald-700/70';
      case 'survie':
        return 'bg-stone-800 text-stone-200 border-stone-600';
      case 'bricolage':
        return 'bg-sky-950/90 text-sky-200 border-sky-700/70';
      case 'manuels':
        return 'bg-purple-950/90 text-purple-200 border-purple-700/70';
    }
  };

  const formatInlineText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-amber-100">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-amber-300 font-mono text-[0.9em]"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      return <React.Fragment key={idx}>{part}</React.Fragment>;
    });
  };

  const renderStructuredManualContent = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: React.ReactNode[] = [];
    let tableRows: string[][] = [];
    let inTable = false;

    const flushTable = (keyPrefix: number) => {
      if (tableRows.length === 0) return;
      const header = tableRows[0];
      const body = tableRows.slice(1).filter(row => !row.every(cell => /^[-:\s]+$/.test(cell)));
      elements.push(
        <div
          key={`table-${keyPrefix}`}
          className="my-4 overflow-x-auto rounded-lg border border-neutral-800 bg-black"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-500/15 border-b border-amber-500/30 text-amber-300">
                {header.map((h, i) => (
                  <th key={i} className="py-2.5 px-3.5 font-bold text-xs uppercase tracking-wider">
                    {formatInlineText(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {body.map((row, rIdx) => (
                <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-neutral-950' : 'bg-neutral-900/40'}>
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="py-2.5 px-3.5 text-stone-200">
                      {formatInlineText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    };

    lines.forEach((rawLine, index) => {
      const line = rawLine.trim();

      if (line.startsWith('|') && line.endsWith('|')) {
        inTable = true;
        const cells = line
          .slice(1, -1)
          .split('|')
          .map(c => c.trim());
        tableRows.push(cells);
        return;
      } else if (inTable) {
        flushTable(index);
      }

      if (!line || line === '---') {
        return;
      }

      if (line.startsWith('# ')) {
        elements.push(
          <div
            key={index}
            className="pb-4 mb-5 border-b border-amber-500/40 flex items-center justify-between gap-3"
          >
            <h1 className="text-lg sm:text-xl font-extrabold text-amber-300 tracking-wide uppercase">
              {line.slice(2)}
            </h1>
          </div>
        );
        return;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <div
            key={index}
            className="mt-6 mb-3 px-3.5 py-2.5 rounded-md bg-amber-500/10 border-l-4 border-amber-500 flex items-center gap-2.5"
          >
            <h2 className="text-sm sm:text-base font-bold text-amber-200 uppercase tracking-wide">
              {line.slice(3)}
            </h2>
          </div>
        );
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={index}
            className="mt-4 mb-2 text-sm font-bold text-emerald-300 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block shrink-0" />
            <span>{line.slice(4)}</span>
          </h3>
        );
        return;
      }

      if (line.startsWith('Source :')) {
        elements.push(
          <div
            key={index}
            className="mb-4 px-3 py-1.5 rounded bg-neutral-900 border border-neutral-800 text-xs text-stone-400 font-mono inline-block"
          >
            {line}
          </div>
        );
        return;
      }

      const lower = line.toLowerCase();
      if (
        lower.includes('avertissement vital') ||
        lower.includes('danger') ||
        lower.includes('interdiction') ||
        lower.includes('règle d\'or') ||
        lower.includes('règle absolue') ||
        lower.includes('alerte')
      ) {
        elements.push(
          <div
            key={index}
            className="my-2.5 p-3.5 rounded-lg bg-rose-950/50 border border-rose-700/70 text-rose-100 flex items-start gap-3"
          >
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">{formatInlineText(line.replace(/^- /, ''))}</div>
          </div>
        );
        return;
      }

      const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        elements.push(
          <div
            key={index}
            className="my-2 p-3 rounded-lg bg-neutral-900/70 border border-neutral-800 flex items-start gap-3"
          >
            <span className="w-6 h-6 rounded-full bg-amber-500 text-black font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              {numMatch[1]}
            </span>
            <div className="text-stone-200 leading-relaxed flex-1">
              {formatInlineText(numMatch[2])}
            </div>
          </div>
        );
        return;
      }

      if (line.startsWith('- ')) {
        elements.push(
          <div key={index} className="my-1.5 pl-2 flex items-start gap-2.5 text-stone-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
            <div className="leading-relaxed flex-1">{formatInlineText(line.slice(2))}</div>
          </div>
        );
        return;
      }

      elements.push(
        <p key={index} className="my-2 text-stone-300 leading-relaxed">
          {formatInlineText(line)}
        </p>
      );
    });

    if (inTable) {
      flushTable(lines.length);
    }

    return elements;
  };

  const categories = [
    { id: 'all', labelFr: 'Tous les Manuels (16)', labelEn: 'All Manuals (16)' },
    { id: 'installed', labelFr: `Ma Bibliothèque (${installedIds.length})`, labelEn: `My Library (${installedIds.length})` },
    { id: 'medecine', labelFr: 'Premiers Secours & Médecine', labelEn: 'First Aid & Medicine' },
    { id: 'eau-alimentation', labelFr: 'Eau & Vivres', labelEn: 'Water & Food' },
    { id: 'remedes', labelFr: 'Remèdes & Plantes', labelEn: 'Remedies & Herbs' },
    { id: 'survie', labelFr: 'Terrain & Abri', labelEn: 'Field & Shelter' },
    { id: 'bricolage', labelFr: 'Autonomie & Dépannage', labelEn: 'Off-Grid & Repair' },
    { id: 'manuels', labelFr: 'Manuels Officiels', labelEn: 'Official Manuals' }
  ];

  const filteredPacks = SUPPLY_DEPOT_PACKS.filter(pack => {
    const matchesCategory =
      selectedCategory === 'all'
        ? true
        : selectedCategory === 'installed'
        ? installedIds.includes(pack.id)
        : pack.category === selectedCategory;

    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCategory;

    const title = (isFr ? pack.titleFr : pack.titleEn).toLowerCase();
    const desc = (isFr ? pack.shortDescFr : pack.shortDescEn).toLowerCase();
    const src = pack.source.toLowerCase();
    return matchesCategory && (title.includes(q) || desc.includes(q) || src.includes(q));
  });

  const filteredExternal = EXTERNAL_RESOURCES_CATALOG.filter(res => {
    const matchesCat = extCategory === 'all' || res.category === extCategory;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCat;
    return (
      matchesCat &&
      (res.titleFr.toLowerCase().includes(q) ||
        res.shortDescFr.toLowerCase().includes(q) ||
        res.source.toLowerCase().includes(q))
    );
  });

  const visibleUrgencies = FIRST_AID_URGENCIES.filter(u => {
    if (selectedUrgencyId !== 'all' && u.id !== selectedUrgencyId) return false;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      u.titleFr.toLowerCase().includes(q) ||
      u.subtitleFr.toLowerCase().includes(q) ||
      u.actionsFr.some(a => a.toLowerCase().includes(q))
    );
  });

  const readerFontClass =
    readerFontSize === 'sm' ? 'text-xs' : readerFontSize === 'lg' ? 'text-base' : 'text-sm';

  return (
    <div className="space-y-6 min-w-0">
      {/* 1. EN-TÊTE ÉPURÉ : SECOURS, MÉDICAMENTS & GUIDES PRATIQUES */}
      <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
        <div className="bg-black border-b border-neutral-800 px-5 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-extrabold text-white uppercase">
                {isFr ? 'Secours, Médicaments & Guides Pratiques' : 'First Aid, Medications & Practical Guides'}
              </h1>
              <p className="text-xs text-stone-400">
                {isFr
                  ? 'Cliquez sur une rubrique ci-dessous (tout est disponible sans Internet).'
                  : 'Select a category below (everything works offline).'}
              </p>
            </div>
          </div>

          {/* Onglets simples et clairs */}
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            <button
              onClick={() => setMainSection('first-aid')}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                mainSection === 'first-aid'
                  ? 'bg-rose-600 text-white'
                  : 'bg-neutral-900 text-stone-300 hover:text-white border border-neutral-800'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>{isFr ? '🚑 Premiers Secours (8)' : '🚑 First Aid (8)'}</span>
            </button>

            <button
              onClick={() => setMainSection('drugs')}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                mainSection === 'drugs'
                  ? 'bg-amber-500 text-black'
                  : 'bg-neutral-900 text-stone-300 hover:text-white border border-neutral-800'
              }`}
            >
              <Pill className="w-3.5 h-3.5" />
              <span>{isFr ? '💊 Médicaments & Doses' : '💊 Medications'}</span>
            </button>

            <button
              onClick={() => setMainSection('local-manuals')}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                mainSection === 'local-manuals'
                  ? 'bg-amber-500 text-black'
                  : 'bg-neutral-900 text-stone-300 hover:text-white border border-neutral-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isFr ? '📖 16 Guides Pratiques' : '📖 16 Guides'}</span>
            </button>

            <button
              onClick={() => setMainSection('tools-72h')}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                mainSection === 'tools-72h'
                  ? 'bg-amber-500 text-black'
                  : 'bg-neutral-900 text-stone-300 hover:text-white border border-neutral-800'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{isFr ? '🎒 Sac 72h & Eau' : '🎒 72h Bag & Water'}</span>
            </button>

            <button
              onClick={() => setMainSection('evac-risk')}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                mainSection === 'evac-risk'
                  ? 'bg-emerald-500 text-black'
                  : 'bg-neutral-900 text-stone-300 hover:text-white border border-neutral-800'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>{isFr ? '🏠 Rester ou Évacuer' : '🏠 Shelter vs Evac'}</span>
            </button>

            <button
              onClick={() => setMainSection('sos-morse')}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                mainSection === 'sos-morse'
                  ? 'bg-amber-500 text-black'
                  : 'bg-neutral-900 text-stone-300 hover:text-white border border-neutral-800'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{isFr ? '🔦 Signal SOS' : '🔦 SOS Beacon'}</span>
            </button>
          </div>
        </div>

        {/* Barre de recherche simple */}
        {['first-aid', 'local-manuals', 'external-catalog'].includes(mainSection) && (
          <div className="p-4 space-y-3 bg-neutral-950">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 min-w-0">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={
                    isFr
                      ? 'Rechercher (ex : saignement, brûlure, étouffement, eau, froid)...'
                      : 'Search (e.g. bleeding, burn, choking, water, cold)...'
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-black border border-neutral-700 focus:border-amber-500 rounded-lg text-xs sm:text-sm text-white placeholder-stone-500 outline-none"
                />
              </div>

              {mainSection === 'local-manuals' && (
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".md,.txt,.html"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={handleDownloadAllPacks}
                    className="px-3.5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <FolderDown className="w-3.5 h-3.5" />
                    <span>{isFr ? 'Télécharger les 16 Guides' : 'Download All 16 Guides'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Filter Pills per Active Tab */}
            {mainSection === 'first-aid' && (
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setSelectedUrgencyId('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer ${
                    selectedUrgencyId === 'all'
                      ? 'bg-rose-600 text-white'
                      : 'bg-black text-stone-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {isFr ? 'Toutes les Urgences (8)' : 'All Emergencies (8)'}
                </button>
                {FIRST_AID_URGENCIES.map(u => (
                  <button
                    key={u.id}
                    onClick={() => setSelectedUrgencyId(u.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer ${
                      selectedUrgencyId === u.id
                        ? 'bg-amber-500 text-black font-bold'
                        : 'bg-black text-stone-300 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {isFr ? u.titleFr : u.titleEn}
                  </button>
                ))}
              </div>
            )}

            {mainSection === 'local-manuals' && (
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#3b4228] text-amber-200 border border-amber-500/80 font-bold'
                        : 'bg-black text-stone-400 hover:text-stone-200 border border-neutral-800'
                    }`}
                  >
                    {isFr ? cat.labelFr : cat.labelEn}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* PROPOSITION 1: BASE DES MÉDICAMENTS & COMPARATEUR D'INTERACTIONS */}
      {mainSection === 'drugs' && <DrugReferenceModule language={language} />}

      {/* PROPOSITION 4: CALCULATEUR DE RISQUE RÉEL & DÉCISION CONFINEMENT VS ÉVACUATION */}
      {mainSection === 'evac-risk' && <EvacuationDecisionModule language={language} />}

      {/* PROPOSITION 5: CONVERTISSEUR MORSE & SIGNAUX S.O.S. LUMINEUX / SONORES */}
      {mainSection === 'sos-morse' && <SosMorseSignalerModule language={language} />}

      {/* ==========================================================================
          TAB 1: PREMIERS SECOURS — LES 8 URGENCES VITALES COMPLÈTES
         ========================================================================== */}
      {mainSection === 'first-aid' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-0.5">
            <div className="flex items-center gap-2.5">
              <span className="w-1 h-5 bg-rose-500 rounded-full inline-block" />
              <h2 className="text-base font-bold text-white">
                {isFr
                  ? 'Fiches Réflexes de Premiers Secours (Malaise cardiaque, Inconscience, Hémorragie, Étouffement, Brûlure, Noyade, Coup de chaud, Piqûre/Morsure)'
                  : 'First Aid Emergency Reflex Cards'}
              </h2>
            </div>
            <button
              onClick={() => setActivePackModal(SUPPLY_DEPOT_PACKS[0])}
              className="px-3.5 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isFr ? 'Ouvrir en Grand / Imprimer le Manuel Complet' : 'Open Full Manual'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {visibleUrgencies.map((card: FirstAidUrgencyCard) => (
              <div
                key={card.id}
                className="bg-neutral-950 border border-neutral-800 hover:border-amber-500/60 rounded-xl p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3.5">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 border-b border-neutral-800 pb-3">
                    <div>
                      <h3 className="text-base font-extrabold text-white">
                        {isFr ? card.titleFr : card.titleEn}
                      </h3>
                      <p className="text-xs text-amber-300/90 mt-0.5">
                        {isFr ? card.subtitleFr : card.subtitleEn}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-rose-950 border border-rose-700 text-rose-200 shrink-0">
                      {card.badgeFr}
                    </span>
                  </div>

                  {/* Signs to Recognize */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono font-bold uppercase text-stone-400">
                      {isFr ? 'Signes à reconnaître :' : 'Signs:'}
                    </div>
                    {card.signsFr.map((sign, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                        <span>{sign}</span>
                      </div>
                    ))}
                  </div>

                  {/* Step-by-step Immediate Actions */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono font-bold uppercase text-emerald-400">
                      {isFr ? 'Gestes d’urgence (Étape par étape) :' : 'Immediate Actions:'}
                    </div>
                    {card.actionsFr.map((act, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800 flex items-start gap-2.5 text-xs text-stone-100 leading-relaxed"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-black font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Critical Forbidden Action Callout */}
                <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-700/70 text-rose-100 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-rose-300 uppercase font-mono text-[11px] block">
                      {isFr ? 'Interdiction vitale :' : 'Never do:'}
                    </strong>
                    <span>{card.neverDoFr}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================================================
          TAB 2: MANUELS INTÉGRÉS (16 PACKS MIS EN PAGE + FICHIERS PERSONNELS)
         ========================================================================== */}
      {mainSection === 'local-manuals' && (
        <>
          {customDocs.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-1 h-5 bg-emerald-500 rounded-full inline-block" />
                <h2 className="text-base font-bold text-white">
                  {isFr
                    ? `Vos Documents Importés (${customDocs.length})`
                    : `Your Imported Documents (${customDocs.length})`}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {customDocs.map(doc => (
                  <div
                    key={doc.id}
                    className="bg-neutral-950 border border-emerald-800/60 rounded-xl p-4 flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-emerald-200">{doc.title}</h3>
                        <p className="text-[11px] text-stone-400 font-mono mt-0.5">
                          {doc.filename} · {doc.addedAt}
                        </p>
                      </div>
                      <button
                        onClick={() => setCustomDocs(prev => prev.filter(d => d.id !== doc.id))}
                        className="p-1 text-stone-500 hover:text-rose-400 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        setActivePackModal({
                          id: doc.id,
                          titleFr: doc.title,
                          titleEn: doc.title,
                          source: isFr ? 'Document Personnel Importé' : 'Imported Personal File',
                          category: 'manuels',
                          categoryLabelFr: 'Personnel',
                          categoryLabelEn: 'Personal',
                          badgeFr: doc.filename,
                          badgeEn: doc.filename,
                          filename: doc.filename,
                          iconName: 'compass',
                          shortDescFr: '',
                          shortDescEn: '',
                          contentFr: doc.content
                        })
                      }
                      className="w-full py-2 px-3 rounded-md bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-600/50 text-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isFr ? 'Ouvrir & Lire' : 'Open & Read'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-2.5">
              <span className="w-1 h-5 bg-amber-500 rounded-full inline-block" />
              <h2 className="text-base font-bold text-white">
                {isFr
                  ? `Manuels de Survie Mis en Page (${filteredPacks.length})`
                  : `Formatted Survival Manuals (${filteredPacks.length})`}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPacks.map(pack => {
              const isInstalled = installedIds.includes(pack.id);
              return (
                <div
                  key={pack.id}
                  onClick={() => setActivePackModal(pack)}
                  className="group cursor-pointer bg-neutral-950 border border-neutral-800 hover:border-amber-500/70 rounded-xl p-5 flex flex-col justify-between gap-4 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-lg bg-neutral-900 border border-neutral-800 group-hover:border-amber-500/50 flex items-center justify-center shrink-0">
                        {renderPackIcon(pack.iconName)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-1.5">
                          <h3 className="text-sm font-bold text-white group-hover:text-amber-300 leading-snug">
                            {isFr ? pack.titleFr : pack.titleEn}
                          </h3>
                          {isInstalled && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          )}
                        </div>
                        <p className="text-[11px] text-stone-400 truncate mt-0.5">{pack.source}</p>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed">
                      {isFr ? pack.shortDescFr : pack.shortDescEn}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-neutral-900">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryBadgeStyle(
                          pack.category
                        )}`}
                      >
                        {isFr ? pack.categoryLabelFr : pack.categoryLabelEn}
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-stone-300">
                        {isFr ? pack.badgeFr : pack.badgeEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => setActivePackModal(pack)}
                        className="flex-1 py-2 px-3 rounded-md bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{isFr ? 'Lire le Manuel' : 'Read Manual'}</span>
                      </button>

                      <button
                        onClick={() => handleDownloadPackHtml(pack)}
                        className="py-2 px-3 rounded-md bg-[#343b24] hover:bg-[#414a2d] border border-amber-500/40 text-amber-100 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                        title={isFr ? 'Télécharger en HTML mis en page' : 'Download formatted HTML'}
                      >
                        <Download className="w-3.5 h-3.5 text-amber-300" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* ==========================================================================
          TAB 3: OUTILS FUSIONNÉS — CALCULATEUR D'AUTONOMIE, SAC 72H & RADIO
         ========================================================================== */}
      {mainSection === 'tools-72h' && (
        <div className="space-y-6">
          {/* A. Autonomy Calculator */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center gap-2.5 border-b border-neutral-800 pb-3">
              <Calculator className="w-5 h-5 text-amber-400" />
              <div>
                <h2 className="text-base font-bold text-white">
                  {isFr
                    ? '1. Calculateur de Besoins Vitaux (Eau, Calories & Énergie)'
                    : '1. Vital Autonomy Calculator (Water, Calories & Power)'}
                </h2>
                <p className="text-xs text-stone-400">
                  {isFr
                    ? 'Estimez instantanément les réserves nécessaires selon le nombre de personnes et la durée.'
                    : 'Estimate required water, food calories, and battery capacity.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-4 bg-black border border-neutral-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-amber-400" />
                    {isFr ? 'Personnes' : 'People'}
                  </span>
                  <span className="text-lg font-mono text-amber-400">{peopleCount}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={peopleCount}
                  onChange={e => {
                    const v = Number(e.target.value);
                    setPeopleCount(v);
                    try {
                      localStorage.setItem('sentinel_calc_people', String(v));
                    } catch {}
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="p-4 bg-black border border-neutral-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-300">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    {isFr ? 'Jours d’autonomie' : 'Days'}
                  </span>
                  <span className="text-lg font-mono text-amber-400">{daysCount} j</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={90}
                  step={1}
                  value={daysCount}
                  onChange={e => {
                    const v = Number(e.target.value);
                    setDaysCount(v);
                    try {
                      localStorage.setItem('sentinel_calc_days', String(v));
                    } catch {}
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="p-4 bg-black border border-neutral-800 rounded-lg space-y-2">
                <div className="text-xs font-bold text-stone-300">
                  {isFr ? 'Conditions Climatiques' : 'Climate'}
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'temperate', label: isFr ? 'Tempéré' : 'Mild' },
                    { id: 'hot', label: isFr ? 'Canicule' : 'Hot' },
                    { id: 'winter', label: isFr ? 'Grand Froid' : 'Winter' }
                  ].map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setClimate(c.id as any);
                        try {
                          localStorage.setItem('sentinel_calc_climate', c.id);
                        } catch {}
                      }}
                      className={`py-1.5 px-2 rounded text-xs font-mono cursor-pointer border ${
                        climate === c.id
                          ? 'bg-amber-500 text-black font-bold border-amber-400'
                          : 'bg-neutral-900 text-stone-400 border-neutral-800'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-800/60">
                <div className="text-xs font-mono text-sky-300 uppercase">
                  {isFr ? 'Eau Potable Totale' : 'Total Safe Water'}
                </div>
                <div className="text-2xl font-extrabold text-white font-mono mt-1">
                  {totalWaterLitres} Litres
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  {isFr
                    ? `Soit ~${Math.ceil(totalWaterLitres / 9)} packs de 6×1,5 L (boisson + cuisine)`
                    : `Approx. ${Math.ceil(totalWaterLitres / 9)} packs of 6×1.5L`}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/60">
                <div className="text-xs font-mono text-amber-300 uppercase">
                  {isFr ? 'Énergie Alimentaire' : 'Food Calories'}
                </div>
                <div className="text-2xl font-extrabold text-white font-mono mt-1">
                  {totalCalories.toLocaleString('fr-FR')} kcal
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  {isFr
                    ? `Soit ~${Math.ceil(totalCalories / 3600)} kg d’aliments secs (riz, pâtes, légumineuses)`
                    : `Approx. ${Math.ceil(totalCalories / 3600)} kg of dry rations`}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/60">
                <div className="text-xs font-mono text-emerald-300 uppercase">
                  {isFr ? 'Réserve Batterie Conseillée' : 'Battery Buffer'}
                </div>
                <div className="text-2xl font-extrabold text-white font-mono mt-1">
                  {totalBatteryCapacityWh} Wh
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  {isFr
                    ? `Soit ${Math.ceil(totalBatteryCapacityWh / 12)} Ah en 12V pour 3 jours sans soleil`
                    : `${Math.ceil(totalBatteryCapacityWh / 12)} Ah at 12V for 3 days autonomy`}
                </p>
              </div>
            </div>
          </div>

          {/* B. 72h Bug-Out Bag Checklist & Emergency Radio Frequencies */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left (7 cols): 72h Checklist */}
            <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-amber-400" />
                  <h2 className="text-base font-bold text-white">
                    {isFr ? '2. Checklist Sac d’Évacuation 72 Heures' : '2. 72-Hour Bug-Out Bag Checklist'}
                  </h2>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-black border border-neutral-800 text-amber-300 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" />
                  {(currentBobWeightGrams / 1000).toFixed(2)} kg
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BUG_OUT_BAG_ITEMS.map(item => {
                  const isChecked = !!checkedBobItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleBobItem(item.id)}
                      className={`p-3 rounded-lg border cursor-pointer flex items-start justify-between gap-2.5 ${
                        isChecked
                          ? 'bg-emerald-950/20 border-emerald-700/60 text-stone-100'
                          : 'bg-black border-neutral-800 text-stone-400'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center mt-0.5 shrink-0 ${
                            isChecked
                              ? 'bg-emerald-500 text-black'
                              : 'border border-neutral-700 bg-neutral-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium leading-snug">
                          {isFr ? item.nameFr : item.nameEn}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-500 shrink-0">
                        {item.weightGrams}g
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right (5 cols): Radio Frequencies */}
            <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
                <Radio className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-white">
                  {isFr ? '3. Plan des Fréquences Radio d’Urgence' : '3. Emergency Radio Frequencies'}
                </h2>
              </div>

              <div className="space-y-2.5">
                {RADIO_FREQUENCIES.map(freq => (
                  <div
                    key={freq.id}
                    className="p-3.5 rounded-lg bg-black border border-neutral-800 space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white">{freq.name}</span>
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-700/60 px-2 py-0.5 rounded">
                        {freq.frequency}
                      </span>
                    </div>
                    <p className="text-xs text-stone-300">
                      {isFr ? freq.usageFr : freq.usageEn}
                    </p>
                    <p className="text-[11px] text-stone-500 font-mono">
                      {isFr ? freq.protocolFr : freq.protocolEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
          TAB 4: ARCHIVES EXTERNES PDF / ZIM & CATALOGUE LIVE API KIWIX
         ========================================================================== */}
      {mainSection === 'external-catalog' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', labelFr: 'Toutes les Archives (23)', labelEn: 'All Archives (23)' },
              { id: 'pdf-manuals', labelFr: 'Manuels PDF Officiels (10)', labelEn: 'Official PDF Manuals (10)' },
              { id: 'kiwix-medical', labelFr: 'Médecine Kiwix ZIM (4)', labelEn: 'Medical ZIM (4)' },
              { id: 'kiwix-survival', labelFr: 'Survie & Eau ZIM (6)', labelEn: 'Survival & Water ZIM (6)' },
              { id: 'wikipedia-diy', labelFr: 'Wikipédia & iFixit (2)', labelEn: 'Wikipedia & iFixit (2)' },
              { id: 'ai-libraries', labelFr: 'Bases Complètes Survival-LLM', labelEn: 'Survival-LLM Databases' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setExtCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer ${
                  extCategory === cat.id
                    ? 'bg-[#3b4228] text-amber-200 border border-amber-500/80 font-bold'
                    : 'bg-black text-stone-400 hover:text-stone-200 border border-neutral-800'
                }`}
              >
                {isFr ? cat.labelFr : cat.labelEn}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredExternal.map((res: ExternalSurvivalResource) => (
              <div
                key={res.id}
                className="bg-neutral-950 border border-neutral-800 hover:border-amber-500/60 rounded-xl p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                        res.format === 'PDF Officiel'
                          ? 'bg-rose-950/80 border-rose-700 text-rose-200'
                          : res.format === 'Archive ZIM (Kiwix)'
                          ? 'bg-sky-950/80 border-sky-700 text-sky-200'
                          : 'bg-purple-950/80 border-purple-700 text-purple-200'
                      }`}
                    >
                      {res.format}
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 font-bold">
                      {res.sizeLabel}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {isFr ? res.titleFr : res.titleEn}
                    </h3>
                    <p className="text-[11px] text-stone-400 mt-0.5">{res.source}</p>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {isFr ? res.shortDescFr : res.shortDescEn}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-neutral-900">
                  <div className="text-[10px] text-stone-500 font-mono truncate">{res.license}</div>
                  <div className="flex items-center gap-2">
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-md bg-[#343b24] hover:bg-[#414a2d] border border-amber-500/40 text-amber-100 text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isFr ? 'Télécharger' : 'Download'}</span>
                    </a>
                    {res.fallbackUrl && (
                      <a
                        href={res.fallbackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-2.5 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-stone-300 text-xs flex items-center gap-1"
                        title="Miroir"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Kiwix OPDS API Explorer */}
          <div className="border border-neutral-800 rounded-xl bg-neutral-950 p-5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>
                    {isFr
                      ? 'Recherche en Direct sur le Serveur Kiwix (API OPDS)'
                      : 'Live Kiwix Server Search (OPDS API)'}
                  </span>
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  {isFr
                    ? 'Interrogez le catalogue mondial library.kiwix.org pour télécharger d’autres encyclopédies hors-ligne.'
                    : 'Query library.kiwix.org for additional offline ZIM archives.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {(['fra', 'eng', 'all'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => setKiwixLang(l)}
                    className={`px-3 py-1.5 rounded text-xs font-mono cursor-pointer ${
                      kiwixLang === l
                        ? 'bg-amber-500 text-black font-bold'
                        : 'bg-black border border-neutral-800 text-stone-400'
                    }`}
                  >
                    {l === 'fra' ? '🇫🇷 Français' : l === 'eng' ? '🇬🇧 Anglais' : '🌍 Toutes'}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                searchKiwixCatalog();
              }}
              className="flex flex-col sm:flex-row gap-2.5"
            >
              <input
                type="text"
                value={kiwixQuery}
                onChange={e => setKiwixQuery(e.target.value)}
                placeholder="wikipedia, medecine, survie, vikidia, ifixit..."
                className="flex-1 px-4 py-2 bg-black border border-neutral-700 focus:border-amber-500 rounded-md text-xs text-white outline-none"
              />
              <button
                type="submit"
                disabled={kiwixLoading}
                className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-md cursor-pointer shrink-0"
              >
                {kiwixLoading
                  ? isFr
                    ? 'Recherche...'
                    : 'Searching...'
                  : isFr
                  ? 'Rechercher sur Kiwix'
                  : 'Search Kiwix'}
              </button>
            </form>

            {kiwixError && (
              <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-700/60 text-amber-200 text-xs">
                {kiwixError}
              </div>
            )}

            {kiwixResults.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                {kiwixResults.map(item => (
                  <div
                    key={item.id}
                    className="bg-black border border-neutral-800 rounded-xl p-4 flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-amber-300 uppercase">
                          {item.language} · {item.updated}
                        </span>
                        <span className="text-emerald-400 font-bold">
                          {item.sizeMb > 0 ? `${item.sizeMb} Mo` : '.ZIM'}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] text-stone-400 line-clamp-2">{item.summary}</p>
                    </div>
                    <a
                      href={item.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1.5 px-3 rounded bg-[#343b24] hover:bg-[#414a2d] border border-amber-500/40 text-amber-100 text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isFr ? 'Télécharger .ZIM' : 'Download .ZIM'}</span>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==========================================================================
          5. BEAUTIFUL FORMATTED MANUAL READER MODAL
         ========================================================================== */}
      {activePackModal && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-2 sm:p-5"
          onClick={() => setActivePackModal(null)}
        >
          <div
            className="bg-neutral-950 border border-amber-500/60 rounded-xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-4 sm:px-6 py-3.5 bg-[#232718] border-b border-neutral-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-black/60 border border-amber-500/50 flex items-center justify-center shrink-0">
                  {renderPackIcon(activePackModal.iconName)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    {isFr ? activePackModal.titleFr : activePackModal.titleEn}
                  </h3>
                  <p className="text-[11px] text-amber-300/90 font-mono truncate">
                    {activePackModal.source}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <div className="flex items-center bg-black/70 border border-neutral-700 rounded-md p-0.5">
                  <button
                    onClick={() => setReaderFontSize(prev => (prev === 'lg' ? 'base' : 'sm'))}
                    className="px-2 py-1 text-xs text-stone-300 hover:text-white cursor-pointer flex items-center gap-1"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                    <span>A-</span>
                  </button>
                  <button
                    onClick={() => setReaderFontSize(prev => (prev === 'sm' ? 'base' : 'lg'))}
                    className="px-2 py-1 text-xs text-amber-300 hover:text-white cursor-pointer flex items-center gap-1 border-l border-neutral-800"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>A+</span>
                  </button>
                </div>

                <button
                  onClick={() => handleDownloadPackHtml(activePackModal)}
                  className="px-3 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isFr ? 'Télécharger (HTML)' : 'Download (HTML)'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-2.5 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-stone-200 text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isFr ? 'Imprimer' : 'Print'}</span>
                </button>

                <button
                  onClick={() => setActivePackModal(null)}
                  className="p-1.5 rounded-md bg-neutral-900 hover:bg-rose-950 border border-neutral-700 text-stone-300 hover:text-rose-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className={`p-5 sm:p-8 overflow-y-auto flex-1 font-sans ${readerFontClass}`}>
              <div className="max-w-4xl mx-auto">
                {renderStructuredManualContent(activePackModal.contentFr)}
              </div>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-[9999] bg-neutral-950 border border-emerald-500 text-emerald-300 px-4 py-2.5 rounded-md shadow-xl font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
