import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Language, ChatMessage, NavTab } from '../types/sentinel';
import { SURVIVAL_ARTICLES, RADIO_FREQUENCIES } from '../data/survivalDatabase';
import { SUPPLY_DEPOT_PACKS } from '../data/supplyDepotPacks';
import { FIRST_AID_URGENCIES } from '../data/firstAidUrgencies';
import { EMERGENCY_DRUGS } from '../data/drugReferenceDatabase';
import {
  Send,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  Radio,
  Droplet,
  HeartPulse,
  FlameKindling,
  Download,
  Smartphone,
  BookOpen,
  CheckCircle2,
  Pill,
  FolderDown,
  Upload
} from 'lucide-react';

interface SurvivalLLMProps {
  language: Language;
  onNavigate?: (tab: NavTab) => void;
}

interface KnowledgeChunk {
  id: string;
  title: string;
  source: string;
  category: string;
  content: string;
  keywords: string;
  urgentWarning?: string;
}

const AI_OFFLINE_INSTALLED_KEY = 'sentinel_mobile_ai_brain_installed_v2';
const STORAGE_KEY_CUSTOM_DOCS = 'sentinel_custom_user_docs_v1';

// Normalize French/English text for accent-insensitive search
const normalizeText = (str: string): string =>
  str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const STOP_WORDS = new Set([
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'd', 'et', 'ou', 'mais', 'donc',
  'dans', 'sur', 'sous', 'avec', 'sans', 'pour', 'par', 'en', 'au', 'aux', 'ce', 'ces',
  'cette', 'mon', 'ma', 'mes', 'ton', 'ta', 'tes', 'son', 'sa', 'ses', 'notre', 'votre',
  'que', 'qui', 'quoi', 'comment', 'pourquoi', 'quand', 'ou', 'est', 'sont', 'etre', 'avoir',
  'faire', 'faut', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'elles', 'je', 'tu', 'se',
  'ne', 'pas', 'plus', 'tres', 'bien', 'tout', 'tous', 'meme', 'si', 'cas', 'peut',
  'the', 'a', 'an', 'in', 'on', 'of', 'to', 'for', 'with', 'how', 'what', 'when', 'is', 'are'
]);

// Synonym expansion so everyday questions match medical/survival manuals
const SYNONYM_MAP: Record<string, string[]> = {
  saigne: ['hemorragie', 'saignement', 'garrot', 'compression', 'plaie', 'sang'],
  sang: ['hemorragie', 'saignement', 'garrot', 'plaie'],
  coupure: ['plaie', 'hemorragie', 'saignement', 'suture', 'desinfection'],
  boire: ['eau', 'potabilisation', 'purification', 'ebullition', 'filtre', 'javel'],
  lac: ['eau', 'potabilisation', 'filtration', 'decantation'],
  riviere: ['eau', 'potabilisation', 'filtration'],
  pluie: ['eau', 'recuperation', 'potabilisation'],
  doliprane: ['paracetamol', 'fievre', 'douleur'],
  efferalgan: ['paracetamol', 'fievre', 'douleur'],
  dafalgan: ['paracetamol', 'fievre', 'douleur'],
  advil: ['ibuprofene', 'ains', 'douleur', 'inflammation'],
  nurofen: ['ibuprofene', 'ains', 'douleur'],
  aspegic: ['aspirine', 'cardiaque'],
  augmentin: ['amoxicilline', 'antibiotique', 'infection'],
  antibiotique: ['amoxicilline', 'doxycycline', 'ciprofloxacine', 'azithromycine', 'infection'],
  imodium: ['loperamide', 'diarrhee'],
  diarrhee: ['sro', 'rehydratation', 'loperamide', 'deshydratation'],
  vomissement: ['rehydratation', 'sro', 'deshydratation'],
  fievre: ['paracetamol', 'infection', 'temperature'],
  douleur: ['paracetamol', 'ibuprofene', 'tramadol'],
  allergie: ['cetirizine', 'prednisolone', 'anaphylaxie', 'oedeme'],
  betadine: ['povidone', 'antiseptique', 'plaie', 'desinfection'],
  coeur: ['cardiaque', 'infarctus', 'massage', 'defibrillateur', 'poitrine'],
  poitrine: ['cardiaque', 'infarctus', 'massage'],
  respire: ['inconscience', 'pls', 'arret', 'cardiaque', 'etouffement'],
  etouffe: ['etouffement', 'heimlich', 'claques', 'obstruction'],
  avale: ['etouffement', 'heimlich', 'intoxication', 'charbon'],
  poison: ['charbon', 'intoxication', 'plante'],
  brulure: ['brulure', 'eau', 'cloques', 'thermique'],
  brule: ['brulure', 'eau', 'cloques'],
  froid: ['hypothermie', 'gelure', 'abri', 'couverture', 'feu'],
  gele: ['hypothermie', 'gelure', 'froid'],
  chaud: ['coup de chaud', 'insolation', 'hyperthermie', 'deshydratation'],
  soleil: ['coup de chaud', 'solaire', 'sodis'],
  serpent: ['vipere', 'morsure', 'piqure', 'venin'],
  vipere: ['morsure', 'piqure', 'serpent'],
  tique: ['lyme', 'doxycycline', 'morsure', 'piqure'],
  abeille: ['piqure', 'allergie', 'anaphylaxie'],
  guêpe: ['piqure', 'allergie'],
  dent: ['dentaire', 'rage', 'girofle', 'abces', 'amoxicilline'],
  os: ['fracture', 'attelle', 'entorse', 'immobilisation'],
  casse: ['fracture', 'attelle', 'immobilisation'],
  cheville: ['entorse', 'fracture', 'attelle'],
  accoucher: ['accouchement', 'grossesse', 'nourrisson', 'cordon', 'bebe'],
  bebe: ['nourrisson', 'accouchement', 'enfant', 'etouffement'],
  enceinte: ['grossesse', 'accouchement'],
  nucleaire: ['nrbc', 'radiation', 'retombees', 'iode', 'iodure', 'confinement'],
  radioactif: ['nrbc', 'radiation', 'iode', 'retombees'],
  iode: ['iodure', 'potassium', 'nrbc', 'thyroide'],
  courant: ['electricite', 'solaire', 'batterie', '12v', 'blackout'],
  batterie: ['12v', 'solaire', 'autonomie', 'energie'],
  frigo: ['conservation', 'aliments', 'viande', 'sel', 'sechage'],
  manger: ['aliments', 'conservation', 'plante', 'comestibilite', 'ration'],
  perdu: ['orientation', 'boussole', 'nord', 'carte', 'etoile'],
  nord: ['orientation', 'boussole', 'soleil', 'etoile'],
  corde: ['noeud', 'chaise', 'cabestan', 'brelage'],
  noeud: ['noeuds', 'chaise', 'cabestan', 'huit', 'corde'],
  talkie: ['radio', 'pmr446', 'frequence', 'mayday', 'canal']
};

export const SurvivalLLM: React.FC<SurvivalLLMProps> = ({ language, onNavigate }) => {
  const isFr = language === 'fr';

  const [inputPrompt, setInputPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel] = useState<'llama3.2:3b' | 'phi3:mini' | 'smollm2:1.7b'>('llama3.2:3b');
  const [ollamaEndpoint] = useState(() => {
    try {
      return localStorage.getItem('sentinel_ollama_url_v1') || 'http://localhost:11434';
    } catch {
      return 'http://localhost:11434';
    }
  });
  const [useLiveOllama] = useState(false);
  const [useFamilyMemory, setUseFamilyMemory] = useState(true);
  const [aiInstalledOnDevice, setAiInstalledOnDevice] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AI_OFFLINE_INSTALLED_KEY) === 'true';
    } catch {
      return true;
    }
  });
  const [installBannerMsg, setInstallBannerMsg] = useState<string | null>(null);
  const [customDocsCount, setCustomDocsCount] = useState<number>(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wikiUploadInputRef = useRef<HTMLInputElement | null>(null);

  const [familyProfile] = useState<{
    householdMembers: string;
    bloodTypes: string;
    allergiesAndMeds: string;
    rallyPoint: string;
    radioChannelPlan: string;
    equipmentNotes: string;
  }>(() => {
    try {
      const saved = localStorage.getItem('sentinel_family_profile_v1');
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

  // Build the complete Incorporated Encyclopedic Knowledge Index (85+ chapters from 16 manuals + Drugs + 8 First Aid + Survival Articles + Radio + Custom Wikis)
  const knowledgeIndex = useMemo<KnowledgeChunk[]>(() => {
    const chunks: KnowledgeChunk[] = [];

    // 1. All 8 First Aid Vital Emergencies
    FIRST_AID_URGENCIES.forEach(u => {
      const text = `### 🚑 ${u.titleFr} (${u.subtitleFr})\n\n**Signes à reconnaître :**\n${u.signsFr
        .map(s => `- ${s}`)
        .join('\n')}\n\n**Gestes d'urgence étape par étape :**\n${u.actionsFr
        .map((a, i) => `${i + 1}. ${a}`)
        .join('\n')}\n\n⚠️ **Interdiction vitale :** ${u.neverDoFr}`;
      chunks.push({
        id: `fa-${u.id}`,
        title: u.titleFr,
        source: 'Premiers Secours Officiels (PSC1 / Croix-Rouge)',
        category: 'Premiers Secours',
        content: text,
        keywords: normalizeText(`${u.titleFr} ${u.subtitleFr} ${u.signsFr.join(' ')} ${u.actionsFr.join(' ')}`),
        urgentWarning: u.neverDoFr
      });
    });

    // 2. All Medications & Dosages
    EMERGENCY_DRUGS.forEach(d => {
      const text = `### 💊 MÉDICAMENT : ${d.nameFr}\n- **Molécule (DCI) :** ${d.dci} (${d.categoryLabelFr})\n- **Indications :** ${d.indicationsFr}\n- **Posologie Adulte :** **${d.adultDoseFr}**\n- **Posologie Enfant :** **${d.childDoseFr}**\n- **Contre-indications absolues :**\n${d.contraindicationsFr
        .map(c => `  - ⚠️ ${c}`)
        .join('\n')}\n- **Effets secondaires :** ${d.sideEffectsFr}\n- **Conservation hors-ligne :** ${d.storageNotesFr}`;
      chunks.push({
        id: `drug-${d.id}`,
        title: d.nameFr,
        source: 'Base Pharmaceutique Hors-Ligne (OMS / Vidal Urgence)',
        category: 'Médicaments & Doses',
        content: text,
        keywords: normalizeText(`${d.nameFr} ${d.dci} ${d.categoryLabelFr} ${d.indicationsFr} medicament dose posologie`),
        urgentWarning: d.contraindicationsFr[0]
      });
    });

    // 3. All 16 Complete Survival Manuals split by section (## ) for pinpoint accuracy
    SUPPLY_DEPOT_PACKS.forEach(pack => {
      const sections = pack.contentFr.split(/\n(?=##\s+)/g);
      sections.forEach((sec, idx) => {
        const cleanSec = sec.trim();
        if (!cleanSec) return;
        const firstLine = cleanSec.split('\n')[0].replace(/^#+\s*/, '').trim();
        const sectionTitle = idx === 0 ? pack.titleFr : `${pack.titleFr} — ${firstLine}`;
        chunks.push({
          id: `${pack.id}-sec-${idx}`,
          title: sectionTitle,
          source: `${pack.titleFr} (${pack.source})`,
          category: pack.categoryLabelFr,
          content: cleanSec,
          keywords: normalizeText(`${pack.titleFr} ${pack.shortDescFr} ${firstLine} ${cleanSec}`)
        });
      });
    });

    // 4. All Tactical Survival Articles
    SURVIVAL_ARTICLES.forEach(art => {
      const text = `### 🛡️ ${art.titleFr}\n${art.summaryFr}\n\n**Protocole étape par étape :**\n${art.stepsFr
        .map((s, i) => `${i + 1}. ${s}`)
        .join('\n')}\n\n${art.contentFr}`;
      chunks.push({
        id: `art-${art.id}`,
        title: art.titleFr,
        source: art.sources.join(' · '),
        category: 'Survie Tactique',
        content: text,
        keywords: normalizeText(`${art.titleFr} ${art.summaryFr} ${art.stepsFr.join(' ')} ${art.contentFr}`),
        urgentWarning: art.warningsFr[0]
      });
    });

    // 5. Custom User Imported Wikis / Manuals
    try {
      const savedDocs = localStorage.getItem(STORAGE_KEY_CUSTOM_DOCS);
      if (savedDocs) {
        const parsed = JSON.parse(savedDocs) as { id: string; title: string; content: string }[];
        setCustomDocsCount(parsed.length);
        parsed.forEach(doc => {
          chunks.push({
            id: `custom-${doc.id}`,
            title: doc.title,
            source: 'Wiki / Document Personnel Incorporé',
            category: 'Wiki Personnel',
            content: `### 📄 ${doc.title}\n${doc.content.slice(0, 2500)}`,
            keywords: normalizeText(`${doc.title} ${doc.content}`)
          });
        });
      }
    } catch {}

    return chunks;
  }, [customDocsCount]);

  const initialGreeting: ChatMessage = {
    id: 'msg-0',
    role: 'assistant',
    timestamp: '00:00:01',
    content: isFr
      ? `✅ **IA & Base Encyclopédique Incorporées Directement (${knowledgeIndex.length} chapitres médicaux, médicaments, secours & survie actifs sur cet appareil sans Internet).**

Vous n'avez **rien besoin d'installer sur un serveur externe** : l'IA fonctionne directement dans votre téléphone ou votre ordinateur, même en mode avion.

Posez n'importe quelle question avec vos propres mots :
- 🚑 **Urgences & Soins :** *« Comment arrêter un gros saignement ? »*, *« Quelqu'un s'étouffe »*, *« Morsure de vipère »*, *« Comment recoudre ou désinfecter une plaie ? »*, *« Accouchement d'urgence »*
- 💊 **Médicaments & Doses :** *« Quelle dose de Doliprane / Paracétamol pour un enfant ? »*, *« Quel antibiotique pour une infection ? »*, *« Diarrhée et réhydratation SRO »*
- 💧 **Eau, Survie & Énergie :** *« Comment rendre potable l'eau d'un lac ? »*, *« Conserver la nourriture sans frigo »*, *« Brancher une batterie 12V solaire »*, *« Retombées nucléaires et iode »*`
      : `✅ **AI & Full Survival Encyclopedia Directly Built-In (${knowledgeIndex.length} medical, medication, first-aid & survival chapters active offline on this device).**

Ask any question in plain words or tap one of the quick buttons below:`,
    citations: ['16 Manuels Incorporés', 'Base Médicaments & Doses', '8 Urgences Vitales', '100% Hors-Ligne Mobile & PC']
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Install / Lock the entire AI & Wiki knowledge base into the phone's persistent offline storage
  const handleInstallAiOnMobile = async () => {
    try {
      localStorage.setItem(AI_OFFLINE_INSTALLED_KEY, 'true');
      localStorage.setItem(
        'sentinel_supply_depot_installed_v2',
        JSON.stringify(SUPPLY_DEPOT_PACKS.map(p => p.id))
      );
      if ('caches' in window) {
        const cache = await caches.open('sentinel-ai-wiki-mobile-v2');
        await cache.addAll(['./', './index.html', './manifest.webmanifest']).catch(() => {});
      }
      setAiInstalledOnDevice(true);
      setInstallBannerMsg(
        isFr
          ? `✅ L'IA et les ${knowledgeIndex.length} chapitres (16 Manuels + Médicaments + Secours) sont maintenant enregistrés dans la mémoire hors-ligne permanente de votre téléphone !`
          : `✅ AI & ${knowledgeIndex.length} chapters are now saved in your phone's offline memory!`
      );
      setTimeout(() => setInstallBannerMsg(null), 6000);
    } catch {
      setAiInstalledOnDevice(true);
    }
  };

  // Download a 100% self-contained standalone Mobile/PC HTML file containing the interactive AI + all Wikis
  const handleDownloadStandaloneAiWikiHtml = () => {
    const serializedChunks = JSON.stringify(
      knowledgeIndex.map(c => ({
        title: c.title,
        source: c.source,
        category: c.category,
        content: c.content,
        keywords: c.keywords,
        urgentWarning: c.urgentWarning || ''
      }))
    );

    const standaloneHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LE QG DU SENTINEL — IA & Wikis Hors-Ligne (Autonome Mobile & PC)</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; background: #181c23; color: #f4f4f5; line-height: 1.55; }
    .container { max-width: 960px; margin: 0 auto; padding: 16px; }
    .header { background: #242a34; border: 2px solid #f59e0b; border-radius: 16px; padding: 16px; margin-bottom: 16px; }
    .header h1 { margin: 0 0 6px 0; font-size: 1.25rem; color: #fff; text-transform: uppercase; }
    .badge { display: inline-block; background: #161920; color: #fcd34d; border: 1px solid #f59e0b; padding: 3px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 700; margin-bottom: 8px; }
    .search-box { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
    .search-box input { flex: 1; min-width: 220px; padding: 12px 14px; border-radius: 12px; border: 1px solid #3a4354; background: #161920; color: #fff; font-size: 0.95rem; }
    .search-box button { padding: 12px 20px; border-radius: 12px; border: none; background: #f59e0b; color: #000; font-weight: 800; cursor: pointer; font-size: 0.9rem; }
    .chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
    .chip { background: #161920; color: #e4e4e7; border: 1px solid #3a4354; padding: 6px 12px; border-radius: 8px; font-size: 0.78rem; cursor: pointer; }
    .card { background: #242a34; border: 1px solid #3a4354; border-radius: 14px; padding: 16px; margin-bottom: 14px; white-space: pre-wrap; }
    .card h3 { margin-top: 0; color: #fcd34d; }
    .meta { font-size: 0.75rem; color: #a1a1aa; margin-bottom: 8px; font-family: monospace; }
    .warn { background: #4c0519; border: 1px solid #e11d48; color: #fecdd3; padding: 10px 12px; border-radius: 10px; margin-bottom: 10px; font-weight: 700; font-size: 0.85rem; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">✓ 100% HORS-LIGNE · IA & WIKIS INCORPORÉS (${knowledgeIndex.length} CHAPITRES)</span>
      <h1>✨ Questionner l’IA & Encyclopédie Sentinel</h1>
      <p style="margin:0;font-size:0.85rem;color:#d4d4d8;">Posez votre question (secours, médicaments, doses, eau, survie, énergie) ou parcourez tous les manuels intégrés sans aucune connexion Internet.</p>
      <div class="search-box">
        <input id="q" type="text" placeholder="Posez votre question à l'IA (ex : dose paracétamol, saignement, purifier eau, brûlure)..." onkeydown="if(event.key==='Enter')ask()" />
        <button onclick="ask()">Questionner l’IA</button>
        <button onclick="showAll()" style="background:#161920;color:#fcd34d;border:1px solid #f59e0b;">Afficher tous les Wikis (${knowledgeIndex.length})</button>
      </div>
      <div class="chips">
        <button class="chip" onclick="quick('Comment stopper une hémorragie et poser un garrot')">🩸 Hémorragie / Garrot</button>
        <button class="chip" onclick="quick('Comment purifier et faire bouillir de l eau')">💧 Eau potable</button>
        <button class="chip" onclick="quick('Dose paracétamol adulte et enfant')">💊 Dose Paracétamol</button>
        <button class="chip" onclick="quick('Antibiotique amoxicilline infection')">💊 Antibiotiques</button>
        <button class="chip" onclick="quick('Hypothermie et grand froid')">❄️ Hypothermie</button>
        <button class="chip" onclick="quick('Étouffement Heimlich')">🫁 Étouffement</button>
        <button class="chip" onclick="quick('Fréquences radio secours Mayday')">📻 Radio SOS</button>
      </div>
    </div>
    <div id="results"></div>
  </div>
  <script>
    const CHUNKS = ${serializedChunks};
    function norm(s) {
      return (s || '').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9\\s]/g, ' ').trim();
    }
    function render(items, queryTitle) {
      const box = document.getElementById('results');
      if (!items.length) {
        box.innerHTML = '<div class="card">Aucun chapitre exact trouvé. Cliquez sur "Afficher tous les Wikis" pour tout parcourir.</div>';
        return;
      }
      box.innerHTML = (queryTitle ? '<h2 style="font-size:1rem;color:#fcd34d;">' + queryTitle + '</h2>' : '') +
        items.map(c => '<div class="card">' +
          '<div class="meta">' + c.category + ' · Source : ' + c.source + '</div>' +
          (c.urgentWarning ? '<div class="warn">⚠️ ' + c.urgentWarning + '</div>' : '') +
          '<div>' + c.content.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</div>' +
        '</div>').join('');
    }
    function quick(text) {
      document.getElementById('q').value = text;
      ask();
    }
    function ask() {
      const raw = document.getElementById('q').value.trim();
      if (!raw) return showAll();
      const tokens = norm(raw).split(/\\s+/).filter(w => w.length > 2);
      const scored = CHUNKS.map(c => {
        let score = 0;
        const titleNorm = norm(c.title);
        tokens.forEach(t => {
          if (titleNorm.includes(t)) score += 12;
          if (c.keywords.includes(t)) score += 5;
        });
        return { c, score };
      }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
      render(scored.slice(0, 5).map(x => x.c), 'Réponse de l’IA Sentinel pour : « ' + raw + ' »');
    }
    function showAll() {
      render(CHUNKS, 'Intégralité des Wikis, Manuels & Médicaments Incorporés (' + CHUNKS.length + ' chapitres)');
    }
    showAll();
  </script>
</body>
</html>`;

    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Sentinel-IA-et-Wikis-Mobile-Autonome.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setInstallBannerMsg(
      isFr
        ? '💾 Fichier autonome « Sentinel-IA-et-Wikis-Mobile-Autonome.html » téléchargé ! Vous pouvez l’ouvrir directement sur votre téléphone même sans aucune connexion.'
        : '💾 Standalone AI + Wiki file downloaded!'
    );
    setTimeout(() => setInstallBannerMsg(null), 6000);
  };

  // Import a personal Wiki / Markdown / TXT / HTML directly into the AI brain
  const handleImportWikiForAi = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : '';
      try {
        const existingRaw = localStorage.getItem(STORAGE_KEY_CUSTOM_DOCS);
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const newDoc = {
          id: `custom-${Date.now()}`,
          title: file.name.replace(/\.(md|txt|html)$/i, ''),
          filename: file.name,
          addedAt: new Date().toLocaleDateString('fr-FR'),
          content: text
        };
        const updated = [newDoc, ...existing];
        localStorage.setItem(STORAGE_KEY_CUSTOM_DOCS, JSON.stringify(updated));
        setCustomDocsCount(updated.length);
        setInstallBannerMsg(
          isFr
            ? `✅ Le document « ${file.name} » est maintenant incorporé directement dans le cerveau de l'IA et dans vos guides !`
            : `✅ "${file.name}" is now incorporated into the AI!`
        );
        setTimeout(() => setInstallBannerMsg(null), 6000);
      } catch {}
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleOpenDownloadableWikis = () => {
    try {
      sessionStorage.setItem('sentinel_open_docs_section', 'external-catalog');
    } catch {}
    if (onNavigate) {
      onNavigate('emergency-docs');
    }
  };

  // Quick Triage Prompts
  const quickActions = [
    {
      id: 'tourniquet',
      icon: <HeartPulse className="w-3.5 h-3.5 text-rose-400" />,
      labelFr: 'Hémorragie / Garrot',
      labelEn: 'Severe Bleeding / Tourniquet',
      queryFr: 'Comment poser un garrot ou stopper une hémorragie grave ?'
    },
    {
      id: 'water',
      icon: <Droplet className="w-3.5 h-3.5 text-sky-400" />,
      labelFr: 'Purifier de l’eau douteuse',
      labelEn: 'Water Purification',
      queryFr: 'Comment rendre potable de l’eau d’un lac ou d’une rivière ?'
    },
    {
      id: 'meds',
      icon: <Pill className="w-3.5 h-3.5 text-amber-400" />,
      labelFr: 'Médicaments & Doses (Enfant/Adulte)',
      labelEn: 'Medications & Dosages',
      queryFr: 'Quelles sont les doses de Paracétamol, Ibuprofène, Amoxicilline et SRO ?'
    },
    {
      id: 'hypothermia',
      icon: <FlameKindling className="w-3.5 h-3.5 text-amber-400" />,
      labelFr: 'Hypothermie & Grand Froid',
      labelEn: 'Hypothermia & Cold',
      queryFr: 'Quels sont les gestes d’urgence face à une personne en hypothermie ?'
    },
    {
      id: 'choking-cardiac',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />,
      labelFr: 'Étouffement & Arrêt Cardiaque',
      labelEn: 'Choking & Cardiac Arrest',
      queryFr: 'Que faire en cas d’étouffement (Heimlich) ou d’arrêt cardiaque ?'
    },
    {
      id: 'radio',
      icon: <Radio className="w-3.5 h-3.5 text-emerald-400" />,
      labelFr: 'SOS Radio & Fréquences Secours',
      labelEn: 'Emergency Radio SOS',
      queryFr: 'Quelles sont les fréquences radio de secours PMR446/VHF et le message Mayday ?'
    }
  ];

  // Deep Encyclopedic RAG Engine searching all 85+ incorporated chapters
  const generateLocalResponse = (prompt: string): { text: string; citations: string[]; urgent?: string } => {
    const normalizedQuery = normalizeText(prompt);
    const rawTokens = normalizedQuery.split(' ').filter(w => w.length >= 2 && !STOP_WORDS.has(w));

    // Expand tokens with medical & survival synonyms
    const expandedTokens = new Set<string>(rawTokens);
    rawTokens.forEach(tok => {
      Object.entries(SYNONYM_MAP).forEach(([key, syns]) => {
        if (tok.includes(key) || key.includes(tok)) {
          syns.forEach(s => expandedTokens.add(normalizeText(s)));
        }
      });
    });

    // Score every chunk in the incorporated encyclopedia
    const scored = knowledgeIndex
      .map(chunk => {
        let score = 0;
        const normTitle = normalizeText(chunk.title);
        const normCat = normalizeText(chunk.category);

        // Exact phrase match bonus
        if (normalizedQuery.length > 4 && chunk.keywords.includes(normalizedQuery)) {
          score += 30;
        }

        rawTokens.forEach(tok => {
          if (normTitle.includes(tok)) score += 16;
          if (normCat.includes(tok)) score += 6;
          if (chunk.keywords.includes(tok)) score += 7;
        });

        expandedTokens.forEach(syn => {
          if (!rawTokens.includes(syn)) {
            if (normTitle.includes(syn)) score += 9;
            if (chunk.keywords.includes(syn)) score += 4;
          }
        });

        return { chunk, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);

    // If we found matching sections in the 16 manuals / medications / first aid / radio
    if (scored.length > 0 && scored[0].score >= 6) {
      const topMatches = scored.slice(0, 3).map(s => s.chunk);
      const primary = topMatches[0];
      const secondary = topMatches.slice(1);

      const combinedSections = [
        primary.content,
        ...secondary.map(
          sec => `\n---\n### 📖 Complément (${sec.title}) :\n${sec.content.slice(0, 1200)}`
        )
      ].join('\n\n');

      const uniqueSources = Array.from(new Set(topMatches.map(m => m.source)));

      return {
        text: combinedSections,
        citations: uniqueSources,
        urgent: primary.urgentWarning
      };
    }

    // Fallback: Radio frequency overview if asking about frequencies
    if (normalizedQuery.includes('frequence') || normalizedQuery.includes('canal')) {
      const radioText = RADIO_FREQUENCIES.map(
        r => `- **${r.name} (${r.frequency})** : ${r.usageFr} (*${r.protocolFr}*)`
      ).join('\n');
      return {
        text: `### 📻 PLAN DES FRÉQUENCES RADIO D'URGENCE\n\n${radioText}`,
        citations: ['Plan Radio Sentinel Hors-Ligne']
      };
    }

    // Intelligent fallback listing the closest available manuals and emergency protocols
    return {
      text: isFr
        ? `### 🛡️ ANALYSE DE L'IA SENTINEL POUR : « ${prompt} »

1. **Priorité vitale immédiate (Règle des 3)** :
   - **Secours médical :** Vérifier la conscience et la respiration. Stopper toute hémorragie par compression directe ou garrot.
   - **Protection thermique :** Isoler du sol froid et du vent (3 heures max sans abri par climat extrême).
   - **Eau potable :** Toujours filtrer puis **faire bouillir 1 minute à gros bouillons** (ou 2 à 4 gouttes de Javel pure non parfumée par litre + 30 min d'attente).

2. **Précisez votre question pour interroger les ${knowledgeIndex.length} chapitres incorporés :**
   - 🚑 **Urgences :** *saignement, malaise cardiaque, inconscience PLS, étouffement, brûlure, noyade, coup de chaud, morsure de vipère, fracture, plaie, suture, accouchement*
   - 💊 **Médicaments :** *Paracétamol (Doliprane), Ibuprofène, Aspirine, Amoxicilline, Doxycycline, SRO (réhydratation), Lopéramide, Cétirizine, Iode nucléaire, Bétadine*
   - 🏕️ **Autonomie :** *purifier l'eau, conserver la viande sans frigo, plantes médicinales, remèdes maison, solaire 12V, nœuds, orientation sans GPS, radio PMR446*`
        : `### 🛡️ SENTINEL AI ASSESSMENT FOR: "${prompt}"\n\nAsk about any specific symptom, medication dosage, water purification, or survival skill.`,
      citations: ['Encyclopédie Incorporée (16 Manuels + Médicaments + Secours)']
    };
  };

  const buildFamilyMemoryAddendum = (): string => {
    if (!useFamilyMemory) return '';
    return isFr
      ? `\n\n---\n🧠 **MÉMOIRE FAMILIALE ACTIVE** : ${familyProfile.householdMembers} (${familyProfile.bloodTypes}) · Allergies/Médicaments : ${familyProfile.allergiesAndMeds} · Repli : ${familyProfile.rallyPoint}`
      : `\n\n---\n🧠 **ACTIVE FAMILY MEMORY** : ${familyProfile.householdMembers} (${familyProfile.bloodTypes})`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query || isGenerating) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsGenerating(true);

    if (useLiveOllama) {
      try {
        const memoryPrompt = useFamilyMemory
          ? `[MÉMOIRE FAMILIALE : Foyer=${familyProfile.householdMembers} | Groupes sanguins=${familyProfile.bloodTypes} | Allergies=${familyProfile.allergiesAndMeds}]\n\nQuestion : ${query}`
          : query;

        const response = await fetch(`${ollamaEndpoint}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: selectedModel,
            prompt: memoryPrompt,
            stream: false
          })
        });

        if (response.ok) {
          const data = await response.json();
          const assistantMsg: ChatMessage = {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            content: data.response,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            citations: ['Local Ollama Engine', selectedModel]
          };
          setMessages(prev => [...prev, assistantMsg]);
          setIsGenerating(false);
          return;
        }
      } catch {
        // Fallback to built-in encyclopedic AI engine
      }
    }

    setTimeout(() => {
      const generated = generateLocalResponse(query);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: generated.text + buildFamilyMemoryAddendum(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        citations: generated.citations,
        urgentAction: generated.urgent
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsGenerating(false);
    }, 280);
  };

  const handleClearHistory = () => {
    setMessages([initialGreeting]);
  };

  useEffect(() => {
    try {
      const pendingPrompt = sessionStorage.getItem('sentinel_initial_ai_prompt');
      if (pendingPrompt) {
        sessionStorage.removeItem('sentinel_initial_ai_prompt');
        handleSendMessage(pendingPrompt);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* 1. EN-TÊTE IA + INSTALLATION DIRECTE MOBILE & WIKIS INCORPORÉS */}
      <div className="bg-[#242a34] border-2 border-amber-500/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-600/70 text-emerald-300 text-[11px] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isFr
                  ? `IA & ${knowledgeIndex.length} Chapitres Incorporés Directement (100% Hors-Ligne)`
                  : `AI & ${knowledgeIndex.length} Chapters Built-In (100% Offline)`}
              </span>
              {aiInstalledOnDevice && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#161920] border border-amber-500/50 text-amber-300 text-[11px] font-semibold">
                  ✓ {isFr ? 'Prêt sur mobile & PC sans serveur' : 'Ready on mobile & PC'}
                </span>
              )}
            </div>

            <h2 className="text-base sm:text-lg font-extrabold text-white uppercase tracking-wide flex items-center gap-2 pt-0.5">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                {isFr
                  ? 'Questionner l’IA — Intelligence Artificielle & Wikis Incorporés'
                  : 'Ask the AI — Built-In Survival Intelligence & Wikis'}
              </span>
            </h2>

            <p className="text-xs text-zinc-300">
              {isFr
                ? 'L’IA intègre directement les 16 manuels complets, le dictionnaire des médicaments et les 8 urgences vitales. Elle répond immédiatement sur téléphone et ordinateur, même sans réseau.'
                : 'The AI directly incorporates all 16 survival manuals, the medication database, and the 8 vital emergencies.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs shrink-0">
            <button
              onClick={() => setUseFamilyMemory(!useFamilyMemory)}
              className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                useFamilyMemory
                  ? 'bg-amber-500 text-black border-amber-400 font-bold'
                  : 'bg-[#161920] border-[#3a4354] text-zinc-300'
              }`}
            >
              <span>
                👨‍👩‍👧 {isFr ? `Infos Famille : ${useFamilyMemory ? 'OUI' : 'NON'}` : `Family Info: ${useFamilyMemory ? 'ON' : 'OFF'}`}
              </span>
            </button>

            <button
              onClick={handleClearHistory}
              className="px-3 py-1.5 rounded-lg bg-[#161920] border border-[#3a4354] text-zinc-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isFr ? 'Nouvelle question' : 'Reset'}</span>
            </button>
          </div>
        </div>

        {/* Barre d'actions Mobile & Wikis Téléchargeables */}
        <div className="pt-3 border-t border-[#343c4b] flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleInstallAiOnMobile}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Smartphone className="w-4 h-4 shrink-0" />
            <span>
              {isFr
                ? '📲 Installer / Verrouiller l’IA & les Wikis dans la mémoire du téléphone'
                : '📲 Lock AI & Wikis in Phone Memory'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleDownloadStandaloneAiWikiHtml}
            className="px-3.5 py-2 rounded-xl bg-[#161920] hover:bg-[#1d222b] border border-amber-500/70 text-amber-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>
              {isFr
                ? '💾 Télécharger l’IA + Wikis en 1 Fichier Mobile Autonome (.HTML)'
                : '💾 Download Standalone AI + Wiki File (.HTML)'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleOpenDownloadableWikis}
            className="px-3.5 py-2 rounded-xl bg-[#161920] hover:bg-[#1d222b] border border-[#3a4354] hover:border-amber-500 text-zinc-100 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <FolderDown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              {isFr ? '📚 Voir les 23 Wikis & PDF Téléchargeables (Kiwix / WikiMed)' : '📚 23 Downloadable Wikis & PDFs'}
            </span>
          </button>

          <input
            ref={wikiUploadInputRef}
            type="file"
            accept=".md,.txt,.html"
            onChange={handleImportWikiForAi}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => wikiUploadInputRef.current?.click()}
            className="px-3 py-2 rounded-xl bg-[#161920] hover:bg-[#1d222b] border border-[#3a4354] hover:border-amber-500 text-zinc-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{isFr ? '➕ Ajouter un fichier à l’IA' : '➕ Add File to AI'}</span>
          </button>
        </div>

        {installBannerMsg && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-600 text-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{installBannerMsg}</span>
          </div>
        )}
      </div>

      {/* 2. BARRE DE QUESTION DIRECTE EN HAUT (POUR MOBILE ET PC) */}
      <div className="bg-[#242a34] border border-[#3a4354] rounded-2xl p-3.5 shadow-md">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={e => setInputPrompt(e.target.value)}
            placeholder={
              isFr
                ? 'Posez votre question à l’IA (ex : dose paracétamol, saignement, purifier l’eau, morsure, accouchement, radio)...'
                : 'Ask the AI (e.g. paracetamol dose, bleeding, purify water, snakebite, radio)...'
            }
            className="flex-1 bg-[#161920] border border-[#3a4354] rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isGenerating}
            className="px-5 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-extrabold rounded-xl transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer shrink-0 shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isFr ? 'Questionner l’IA' : 'Ask the AI'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Questions prêtes en 1 clic */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-3">
          {quickActions.map(action => (
            <button
              key={action.id}
              onClick={() => handleSendMessage(action.queryFr)}
              className="text-left p-2.5 bg-[#161920] hover:bg-[#1e232d] border border-[#343c4b] hover:border-amber-500 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <div className="shrink-0">{action.icon}</div>
              <div className="text-[11px] font-bold text-zinc-100 leading-tight line-clamp-2">
                {isFr ? action.labelFr : action.labelEn}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. FENÊTRE DE DISCUSSION & RÉPONSES DÉTAILLÉES DE L'IA */}
      <div className="border border-[#3a4354] rounded-2xl bg-[#242a34] flex flex-col h-[520px] overflow-hidden shadow-lg">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map(msg => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-extrabold ${
                    isUser
                      ? 'bg-amber-500 text-black'
                      : 'bg-[#161920] border border-amber-500/60 text-amber-400'
                  }`}
                >
                  {isUser ? (isFr ? 'Moi' : 'Me') : 'IA'}
                </div>

                <div className="space-y-1.5 max-w-2xl min-w-0">
                  <div
                    className={`rounded-xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-amber-500/15 border border-amber-500/50 text-white'
                        : 'bg-[#161920] border border-[#343c4b] text-zinc-100'
                    }`}
                  >
                    {msg.urgentAction && (
                      <div className="mb-3 p-2.5 bg-rose-950/70 border border-rose-700 rounded-lg text-xs text-rose-200 flex items-center gap-2 font-bold">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{msg.urgentAction}</span>
                      </div>
                    )}

                    <div className="whitespace-pre-line prose prose-invert prose-xs max-w-none">
                      {msg.content}
                    </div>

                    {msg.citations && msg.citations.length > 0 && !isUser && (
                      <div className="mt-3 pt-2.5 border-t border-[#2b3240] flex flex-wrap items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {msg.citations.map((cit, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#242a34] border border-[#3a4354] text-amber-300"
                          >
                            {cit}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isGenerating && (
            <div className="flex gap-3 max-w-xl">
              <div className="w-8 h-8 rounded-lg bg-[#161920] border border-amber-500/60 flex items-center justify-center shrink-0 text-xs font-extrabold text-amber-400">
                IA
              </div>
              <div className="bg-[#161920] border border-[#343c4b] rounded-xl p-4 flex items-center gap-3 text-xs text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                <span>
                  {isFr
                    ? 'L’IA consulte les manuels et bases médicales incorporés...'
                    : 'AI searching built-in manuals and medical database...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};
