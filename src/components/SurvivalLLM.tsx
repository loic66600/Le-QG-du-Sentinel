import React, { useState, useRef, useEffect } from 'react';
import { Language, ChatMessage } from '../types/sentinel';
import { SURVIVAL_ARTICLES } from '../data/survivalDatabase';
import { 
  Send, 
  AlertTriangle, 
  Sparkles, 
  Cpu, 
  RotateCcw, 
  CheckCircle, 
  Bookmark, 
  FileText,
  Radio,
  Droplet,
  HeartPulse,
  Flame,
  FlameKindling,
  Compass
} from 'lucide-react';

interface SurvivalLLMProps {
  language: Language;
}

export const SurvivalLLM: React.FC<SurvivalLLMProps> = ({ language }) => {
  const isFr = language === 'fr';

  const [inputPrompt, setInputPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'llama3.2:3b' | 'phi3:mini' | 'smollm2:1.7b'>('llama3.2:3b');
  const [ollamaEndpoint] = useState(() => {
    try {
      return localStorage.getItem('sentinel_ollama_url_v1') || 'http://localhost:11434';
    } catch {
      return 'http://localhost:11434';
    }
  });
  const [useLiveOllama, setUseLiveOllama] = useState(false);
  const [useFamilyMemory, setUseFamilyMemory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatic injection of Family Medical & Emergency Memory (from SettingsPanel / survival-llm memory.py)
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

  const initialGreeting: ChatMessage = {
    id: 'msg-0',
    role: 'assistant',
    timestamp: '00:00:01',
    content: isFr
      ? `**Assistant de Survie du QG Sentinel** (Fonctionne à 100 % sans Internet).
Je suis là pour vous aider simplement et étape par étape en cas de coupure d'électricité, de blessure ou de manque d'eau.

Écrivez votre problème avec vos propres mots (ex : *« Mon enfant a une forte fièvre »*, *« Comment boire l'eau d'un lac sans tomber malade ? »*, *« Quelqu'un saigne beaucoup »*) ou cliquez sur l'un des boutons rapides ci-dessous :`
      : `**Sentinel HQ Survival Assistant** (Works 100% offline without Internet).
I am here to guide you step by step in plain language during power outages, medical emergencies, or water shortages.

Type your question in plain words or tap one of the quick buttons below:`,
    citations: ['Secours Civils & Urgences', 'Guide Eau Potable', 'Autonomie Familiale']
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Quick Triage Prompts
  const quickActions = [
    {
      id: 'tourniquet',
      icon: <HeartPulse className="w-3.5 h-3.5 text-rose-400" />,
      labelFr: 'Hémorragie massive / Garrot CAT',
      labelEn: 'Severe Bleeding / CAT Tourniquet',
      queryFr: 'Comment poser un garrot tourniquet CAT sur une hémorragie artérielle pulsatile ?',
      queryEn: 'How to apply a CAT tourniquet for spurting arterial bleeding?'
    },
    {
      id: 'water',
      icon: <Droplet className="w-3.5 h-3.5 text-sky-400" />,
      labelFr: 'Eau suspecte / Potabilisation',
      labelEn: 'Contaminated Water / Disinfection',
      queryFr: 'Comment rendre potable de l’eau boueuse d’un étang avec des moyens de fortune ?',
      queryEn: 'How to purify murky surface water with emergency field methods?'
    },
    {
      id: 'hypothermia',
      icon: <FlameKindling className="w-3.5 h-3.5 text-amber-400" />,
      labelFr: 'Hypothermie & Isolation sol',
      labelEn: 'Hypothermia & Ground Insulation',
      queryFr: 'Quels sont les gestes d’urgence face à une victime trempée en hypothermie sévère ?',
      queryEn: 'What are the immediate field steps for a wet victim suffering severe hypothermia?'
    },
    {
      id: 'plants',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-emerald-400" />,
      labelFr: 'Test de comestibilité des plantes',
      labelEn: 'Universal Edibility Test',
      queryFr: 'Comment tester si une plante inconnue est comestible sans empoisonnement ?',
      queryEn: 'How to execute the Universal Edibility Test on unknown wild vegetation?'
    },
    {
      id: 'radio',
      icon: <Radio className="w-3.5 h-3.5 text-indigo-400" />,
      labelFr: 'SOS Radio & Fréquences secours',
      labelEn: 'Emergency Radio SOS / Mayday',
      queryFr: 'Quelles sont les fréquences de détresse prioritaires en VHF/PMR446 et le format Mayday ?',
      queryEn: 'What are the priority distress frequencies on VHF/PMR446 and Mayday transmission syntax?'
    }
  ];

  // Intelligent local simulation generator based on real Survival-LLM data
  const generateLocalResponse = (prompt: string): { text: string; citations: string[]; urgent?: string } => {
    const p = prompt.toLowerCase();

    if (p.includes('garrot') || p.includes('tourniquet') || p.includes('hémorragie') || p.includes('saignement') || p.includes('bleed')) {
      const art = SURVIVAL_ARTICLES.find(a => a.id === 'trauma-hemorrhage')!;
      return {
        text: isFr
          ? `### 🛑 ACTION IMMÉDIATE : CONTRÔLE DE L'HÉMORRAGIE MASSIVE (Protocole MARCH)

1. **Pression directe immédiate** : appuyer de tout votre poids avec vos deux mains sur la plaie avec un tissu propre.
2. **Pose du garrot CAT** :
   - Placer le garrot **5 à 7 cm au-dessus de la plaie** (sur le bras ou la cuisse, jamais sur une articulation).
   - Tirer la bande velcro au maximum pour supprimer tout jeu lâche.
   - **Tourner la tige du cabestan** jusqu'à l'arrêt total du saignement en jet et la disparition du pouls distal.
   - Bloquer la tige dans le crochet en C et rabattre la sangle blanche de sécurité.
3. **Noter l'heure exacte** de pose au feutre indélébile sur le front du blessé (ex: *T 14:35*).

⚠️ **AVERTISSEMENT VITAL** : Ne JAMAIS desserrer le garrot une fois posé. Seule une équipe chirurgicale peut le retirer.`
          : `### 🛑 IMMEDIATE ACTION: MASSIVE HEMORRHAGE CONTROL (MARCH Protocol)

1. **Immediate direct pressure**: apply full upper body weight over the wound with clean cloth.
2. **CAT Tourniquet Application**:
   - Place band **2-3 inches (5-7 cm) above wound** (never directly over a joint).
   - Pull velcro strap as tight as humanly possible before twisting.
   - **Turn windlass rod** until spurting arterial bleeding stops completely and distal pulse vanishes.
   - Lock rod into C-clip and secure with white time strap.
3. **Record application time** in permanent ink on patient's forehead (e.g. *T 14:35*).

⚠️ **CRITICAL WARNING**: NEVER loosen a tourniquet in the field. Surgical intervention is required to release.`,
        citations: art.sources,
        urgent: isFr ? 'Garrot CAT : 5-7 cm au-dessus de la plaie, serrer jusqu\'à arrêt du jet' : 'CAT Tourniquet: 2-3 inches above wound, turn until bleeding ceases'
      };
    }

    if (p.includes('eau') || p.includes('water') || p.includes('potable') || p.includes('purif') || p.includes('filtre') || p.includes('javel') || p.includes('boil')) {
      const art = SURVIVAL_ARTICLES.find(a => a.id === 'water-purification-field')!;
      return {
        text: isFr
          ? `### 💧 PROTOCOLE DE POTABILISATION DE L'EAU SAUVAGE

Pour éliminer virus, bactéries et kystes de protozoaires (*Giardia, Cryptosporidium*) :

1. **Décantation préalable** (1 à 3h) : laisser les boues se déposer au fond du récipient.
2. **Pré-filtration mécanique** : faire couler l'eau claire à travers un tissu fin ou un filtre de sable fin et charbon de bois concassé.
3. **Désinfection thermique (Règle d'or)** :
   - Porter l'eau à **ébullition franche (gros bouillons) pendant 60 secondes** (3 minutes en haute altitude > 2000 m).
4. **Alternative chimique d'urgence (Javel non parfumée)** :
   - 2 gouttes de javel pure (2.6% hypochlorite) par litre d'eau claire (4 gouttes si eau tiède ou trouble).
   - Mélanger et **attendre 30 minutes obligatoires**. Une légère odeur chlorée doit être détectable.`
          : `### 💧 WILDERNESS WATER PURIFICATION PROTOCOL

To neutralize biological contaminants, viruses, and hardy cysts (*Giardia, Cryptosporidium*):

1. **Settling period** (1-3 hours): allow heavy sediments to drop to bottom.
2. **Mechanical pre-filter**: pour top clear water through tight weave cloth, fine sand, and crushed charcoal.
3. **Thermal disinfection (Gold Standard)**:
   - Bring water to a **rolling boil for 60 seconds** (3 minutes above 2000m / 6500ft).
4. **Emergency chemical backup (Household Bleach)**:
   - 2 drops of unscented 2.6% sodium hypochlorite bleach per liter of clear water (4 drops if cold or cloudy).
   - Stir thoroughly and **wait 30 full minutes**. A faint chlorine scent must be present.`,
        citations: art.sources,
        urgent: isFr ? 'Faire bouillir 1 minute complète à gros bouillons' : 'Sustain rolling boil for 1 full minute'
      };
    }

    if (p.includes('hypothermi') || p.includes('froid') || p.includes('cold') || p.includes('gel') || p.includes('sol') || p.includes('couverture')) {
      const art = SURVIVAL_ARTICLES.find(a => a.id === 'hypothermia-shelter')!;
      return {
        text: isFr
          ? `### ❄️ PROTOCOLE D'URGENCE : HYPOTHERMIE ACCIDENTELLE

1. **Isoler du sol en priorité absolue** : placer 25 cm de feuillage sec, branches de sapin, sac à dos ou matelas isolant sous la victime. Le sol draine 20x plus de chaleur que l'air par conduction.
2. **Retirer immédiatement les vêtements humides** et sécher la peau délicatement.
3. **Créer le cocon de survie** :
   - Envelopper le tronc dans une couverture de survie (face dorée vers l'extérieur).
   - Ajouter un duvet ou une couche épaisse d'isolation par-dessus.
4. **Réchauffement passif du tronc** :
   - Bouteilles d'eau tiède (non brûlantes) enveloppées de tissu sous les aisselles, l'aine et la nuque.
   - Ne **JAMAIS masser vigoureusement les membres** (risque de renvoyer du sang glacé acide vers le cœur, provoquant un arrêt cardiaque).`
          : `### ❄️ EMERGENCY PROTOCOL: SEVERE ACCIDENTAL HYPOTHERMIA

1. **Ground insulation first**: place 10 inches (25 cm) of dry dead foliage, pine boughs, or packs beneath patient. Earth conducts heat away 20x faster than air.
2. **Strip damp clothing immediately** and pat skin dry.
3. **Build the thermal cocoon**:
   - Wrap torso in reflective space blanket (gold face outwards).
   - Layer sleeping bags or thick insulation around reflective barrier.
4. **Passive core rewarming**:
   - Apply warm water bottles wrapped in cloth to neck, axillae (armpits), and groin.
   - **NEVER vigorously massage limbs** (deadly risk of dumping cold, acidotic blood back into cardiac circulation).`,
        citations: art.sources,
        urgent: isFr ? 'Isoler du sol immédiatement + Ne pas masser les membres' : 'Insulate from ground immediately + Do not massage limbs'
      };
    }

    if (p.includes('plante') || p.includes('plant') || p.includes('manger') || p.includes('comestib') || p.includes('edib') || p.includes('champignon') || p.includes('mushroom')) {
      const art = SURVIVAL_ARTICLES.find(a => a.id === 'universal-edibility-test')!;
      return {
        text: isFr
          ? `### 🌿 TEST UNIVERSEL DE COMESTIBILITÉ (FM 21-76)

⚠️ **RÈGLE N°1** : Bannir 100% des champignons sauvages et les plantes à sève laiteuse ou à odeur d'amande amère.

Protocole chronologique strict sur 24 heures :
1. **Jeûner 8 heures** avant de commencer.
2. **Test cutané** : frotter la sève de la plante sur l'intérieur du poignet/coude. Attendre 15 min.
3. **Test des lèvres** : toucher l'extérieur des lèvres pendant 3 min. Attendre 8 heures.
4. **Test de la langue** : poser un morceau sans mâcher pendant 15 min.
5. **Mastication** : mâcher 15 min sans avaler. Recracher la salive. Attendre 8 heures.
6. **Ingestion test** : avaler une cuillère à café. Attendre 8 heures.

Si aucune réaction négative n'apparaît, la partie testée (feuille OU racine) est consommable à petite dose.`
          : `### 🌿 UNIVERSAL EDIBILITY TEST (FM 21-76 Standard)

⚠️ **RULE #1**: Exclude 100% of wild mushrooms and any plant with milky sap or bitter almond aroma.

Sequential 24-hour testing protocol:
1. **Fast for 8 hours** before beginning.
2. **Contact test**: rub crushed plant part onto inner forearm/wrist. Wait 15 minutes.
3. **Lip contact**: hold against outer lip for 3 minutes. Wait 8 hours.
4. **Tongue placement**: rest sample on tongue without chewing for 15 minutes.
5. **Masticate without swallowing**: chew for 15 minutes, spit out saliva. Wait 8 hours.
6. **Ingest small sample**: swallow one teaspoon with water. Wait 8 hours.

If zero burning, nausea, or cramping occurs, this specific plant part is considered edible in survival rations.`,
        citations: art.sources,
        urgent: isFr ? 'Interdiction absolue des champignons sauvages' : 'Strict ban on all wild mushrooms'
      };
    }

    if (p.includes('radio') || p.includes('mayday') || p.includes('frequen') || p.includes('vhf') || p.includes('pmr') || p.includes('sos')) {
      const art = SURVIVAL_ARTICLES.find(a => a.id === 'emergency-radio-comms')!;
      return {
        text: isFr
          ? `### 📻 FRÉQUENCES RADIO DE SECOURS & FORMAT MAYDAY

1. **Canaux prioritaires d'urgence** :
   - **PMR446 Canal 7-7** : Canal 7 (446.08125 MHz) + sous-ton CTCSS 7 (85.4 Hz). Veille secours randonnée & civils.
   - **VHF Marine Canal 16** : 156.800 MHz (détresse maritime et zone côtière).
   - **VHF Radioamateur** : 145.500 MHz FM (fréquence d'appel 2m en Europe).

2. **Syntaxe standard d'appel de détresse (MAYDAY)** :
   \`\`\`
   MAYDAY, MAYDAY, MAYDAY
   ICI [Nom de votre station ou identifiant]
   POSITION : [Coordonnées GPS ou repère géographique précis]
   NATURE DU PÉRIL : [Blessure grave, isolement, incendie, naufrage]
   PERSONNES : [Nombre de personnes, état médical]
   INTENTION : [Évacuation demandée, balise allumée]
   À VOUS.
   \`\`\`

3. **Économie d'énergie** : émettre par messages de moins de 20 secondes, puis écouter.`
          : `### 📻 EMERGENCY RADIO FREQUENCIES & MAYDAY PROTOCOL

1. **Primary Emergency Frequencies**:
   - **PMR446 Channel 7-7**: Channel 7 (446.08125 MHz) + CTCSS Sub-tone 7 (85.4 Hz). Civilian wilderness emergency net.
   - **Marine VHF Channel 16**: 156.800 MHz (International distress and hailing).
   - **Amateur VHF Calling**: 145.500 MHz FM (European 2m hailing; 146.520 MHz in US).

2. **Standard MAYDAY Transmission Syntax**:
   \`\`\`
   MAYDAY, MAYDAY, MAYDAY
   THIS IS [Station Name or ID]
   POSITION: [GPS Coordinates or exact landmark]
   NATURE OF DISTRESS: [Life-threatening injury, entrapment, hypothermia]
   PERSONS: [Headcount and medical status]
   REQUESTING: [Emergency evacuation / assistance]
   OVER.
   \`\`\`

3. **Power Management**: Transmit in bursts under 20 seconds, listen during the 3-minute silence intervals.`,
        citations: art.sources,
        urgent: isFr ? 'PMR446 Canal 7-7 (85.4 Hz) / VHF Marine 156.800 MHz' : 'PMR446 Ch 7-7 (85.4 Hz) / Marine VHF 156.800 MHz'
      };
    }

    // Default intelligent triage response
    return {
      text: isFr
        ? `### 🛡️ ANALYSE TACTIQUE SENTINEL

En réponse à votre situation : **"${prompt}"**

1. **Sécurité immédiate & Évaluation 360°** :
   - Vérifier l'absence de danger persistant (électricité, chutes de débris, toxiques, prédateurs).
   - Appliquer la **Règle des 3** : 3 minutes sans oxygène, 3 heures sans abri thermique par climat extrême, 3 jours sans eau potable, 3 semaines sans nourriture.
2. **Hiérarchisation des actions** :
   - Stopper les hémorragies graves en premier.
   - Isoler les victimes du froid et de l'humidité du sol.
   - Sécuriser un point de repli ou un abri avant la tombée de la nuit.
3. **Communication** :
   - Activer une veille radio sur le canal PMR446 7-7 aux heures fixes (hh:00).
   - Noter chronologiquement tous les événements sur un carnet étanche.`
        : `### 🛡️ SENTINEL TACTICAL ASSESSMENT

Regarding your inquiry: **"${prompt}"**

1. **Immediate Safety & 360° Assessment**:
   - Verify absence of secondary hazards (downed power lines, debris, toxic vapors).
   - Apply the **Rule of Threes**: 3 minutes without oxygen, 3 hours without shelter in extreme conditions, 3 days without water, 3 weeks without food.
2. **Prioritization of Actions**:
   - Arrest catastrophic bleeding before any other intervention.
   - Elevate casualties off cold earth to stop conductive heat loss.
   - Establish secure shelter line before dusk.
3. **Communications**:
   - Establish radio watch on PMR446 Ch 7-7 at the top of every hour (hh:00).
   - Keep a waterproof log of timeline, bearings, and resource consumption.`,
      citations: ['FM 21-76 Survival Manual', 'Civilian Defense Standard SOP', 'WikiMed Disaster Prep']
    };
  };

  // Build Family Memory Context Addendum
  const buildFamilyMemoryAddendum = (): string => {
    if (!useFamilyMemory) return '';
    return isFr
      ? `\n\n---\n🧠 **MÉMOIRE FAMILIALE ACTIVE (Adaptation Automatique)** :\n- **Foyer** : ${familyProfile.householdMembers} (${familyProfile.bloodTypes})\n- **Allergies / Traitements** : ${familyProfile.allergiesAndMeds}\n- **Ralliement & Radio** : ${familyProfile.rallyPoint} · ${familyProfile.radioChannelPlan}`
      : `\n\n---\n🧠 **ACTIVE FAMILY MEMORY** :\n- **Household** : ${familyProfile.householdMembers} (${familyProfile.bloodTypes})\n- **Allergies / Meds** : ${familyProfile.allergiesAndMeds}\n- **Rally & Radio** : ${familyProfile.rallyPoint} · ${familyProfile.radioChannelPlan}`;
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

    // If configured with live Ollama and enabled, attempt real local Ollama query with Family Memory System Prompt
    if (useLiveOllama) {
      try {
        const memoryPrompt = useFamilyMemory
          ? `[MÉMOIRE FAMILIALE À PRENDRE EN COMPTE : Foyer=${familyProfile.householdMembers} | Groupes sanguins=${familyProfile.bloodTypes} | Allergies/Médicaments=${familyProfile.allergiesAndMeds} | Point de ralliement=${familyProfile.rallyPoint} | Radio=${familyProfile.radioChannelPlan}]\n\nQuestion : ${query}`
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
            citations: ['Local Ollama Engine', selectedModel, ...(useFamilyMemory ? ['Mémoire Familiale'] : [])]
          };
          setMessages(prev => [...prev, assistantMsg]);
          setIsGenerating(false);
          return;
        }
      } catch {
        // Fall back gracefully to built-in local survival intelligence engine
      }
    }

    // High-speed simulated local inference (mimicking 25 tokens/s)
    setTimeout(() => {
      const generated = generateLocalResponse(query);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: generated.text + buildFamilyMemoryAddendum(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        citations: [...generated.citations, ...(useFamilyMemory ? ['Mémoire Familiale Connectée'] : [])],
        urgentAction: generated.urgent
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsGenerating(false);
    }, 450);
  };

  const handleClearHistory = () => {
    setMessages([initialGreeting]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* En-tête épuré et rassurant */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h2 className="text-lg font-extrabold text-white">
              {isFr ? '💬 Poser une Question (Assistant 100% Hors-Ligne)' : '💬 Ask a Question (100% Offline Assistant)'}
            </h2>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            {isFr
              ? 'Posez votre question avec vos propres mots ou cliquez sur une situation ci-dessous.'
              : 'Ask your question in plain words or tap a situation below.'}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setUseFamilyMemory(!useFamilyMemory)}
            className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
              useFamilyMemory
                ? 'bg-amber-950/70 border-amber-500 text-amber-300 font-bold'
                : 'bg-black border-neutral-800 text-stone-400'
            }`}
          >
            <span>👨‍👩‍👧 {isFr ? `Infos Famille : ${useFamilyMemory ? 'OUI' : 'NON'}` : `Family Info: ${useFamilyMemory ? 'ON' : 'OFF'}`}</span>
          </button>

          <button
            onClick={handleClearHistory}
            className="px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-stone-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isFr ? 'Effacer' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* Questions prêtes en 1 clic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleSendMessage(isFr ? action.queryFr : action.queryEn)}
            className="text-left p-3 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-500 rounded-xl transition-all group flex items-center gap-3 cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-black border border-neutral-800 shrink-0">
              {action.icon}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-extrabold text-white group-hover:text-amber-400 truncate">
                {isFr ? action.labelFr : action.labelEn}
              </div>
              <div className="text-[11px] text-stone-400 truncate">
                {isFr ? action.queryFr : action.queryEn}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Fenêtre de discussion */}
      <div className="border border-neutral-800 rounded-xl bg-neutral-950 flex flex-col h-[500px] overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    isUser
                      ? 'bg-amber-500 text-black'
                      : 'bg-black border border-neutral-700 text-amber-400'
                  }`}
                >
                  {isUser ? (isFr ? 'Moi' : 'Me') : 'QG'}
                </div>

                <div className="space-y-1 max-w-2xl">
                  <div
                    className={`rounded-xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-amber-500/15 border border-amber-500/40 text-white'
                        : 'bg-black border border-neutral-800 text-stone-200'
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
                  </div>
                </div>
              </div>
            );
          })}

          {isGenerating && (
            <div className="flex gap-3 max-w-xl">
              <div className="w-8 h-8 rounded-lg bg-black border border-neutral-700 flex items-center justify-center shrink-0 text-xs font-bold text-amber-400">
                QG
              </div>
              <div className="bg-black border border-neutral-800 rounded-xl p-4 flex items-center gap-3 text-xs text-stone-300">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                <span>
                  {isFr ? 'Recherche de la marche à suivre...' : 'Looking up guidance...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Barre de saisie */}
        <div className="p-3 bg-black border-t border-neutral-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={
                isFr
                  ? 'Écrivez votre question ici (ex : comment rendre l’eau potable, saignement, brûlure)...'
                  : 'Type your question here (e.g. how to make water safe, bleeding, burn)...'
              }
              className="flex-1 bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isGenerating}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-extrabold rounded-xl transition-colors flex items-center gap-2 text-xs cursor-pointer"
            >
              <span>{isFr ? 'Demander' : 'Ask'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
