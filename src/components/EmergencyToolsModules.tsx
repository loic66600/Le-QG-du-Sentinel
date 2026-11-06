import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types/sentinel';
import {
  EMERGENCY_DRUGS,
  DRUG_INTERACTION_RULES,
  EmergencyDrug
} from '../data/drugReferenceDatabase';
import {
  Pill,
  AlertTriangle,
  CheckCircle2,
  Search,
  ShieldAlert,
  Volume2,
  VolumeX,
  Sun,
  Radio,
  Play,
  Square,
  Home,
  Navigation,
  Scale,
  HeartPulse,
  Flame
} from 'lucide-react';

// ============================================================================
// PROPOSITION 1 : BASE DES MÉDICAMENTS & VÉRIFICATEUR D'INTERACTIONS HORS-LIGNE
// ============================================================================
export const DrugReferenceModule: React.FC<{ language: Language }> = ({ language }) => {
  const isFr = language === 'fr';
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedDrug, setSelectedDrug] = useState<EmergencyDrug>(EMERGENCY_DRUGS[0]);
  const [compareIds, setCompareIds] = useState<string[]>(['drug-ibuprofene', 'drug-aspirine']);

  // Read Family Medical Profile to cross-check allergies automatically
  const [familyAllergies, setFamilyAllergies] = useState<string>('');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sentinel_family_profile_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.allergiesAndMeds) setFamilyAllergies(parsed.allergiesAndMeds);
      }
    } catch {}
  }, []);

  const filteredDrugs = EMERGENCY_DRUGS.filter(d => {
    const matchCat = categoryFilter === 'all' || d.category === categoryFilter;
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      d.nameFr.toLowerCase().includes(q) ||
      d.dci.toLowerCase().includes(q) ||
      d.indicationsFr.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const toggleCompareDrug = (id: string) => {
    setCompareIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Evaluate interactions among selected drugs in comparator
  const comparedDrugs = EMERGENCY_DRUGS.filter(d => compareIds.includes(d.id));
  const detectedInteractions = DRUG_INTERACTION_RULES.filter(rule => {
    if (rule.groupA === rule.groupB) {
      const matches = comparedDrugs.filter(d => d.interactionGroupIds.includes(rule.groupA));
      return matches.length >= 2;
    }
    const hasA = comparedDrugs.some(d => d.interactionGroupIds.includes(rule.groupA));
    const hasB = comparedDrugs.some(d => d.interactionGroupIds.includes(rule.groupB));
    return hasA && hasB;
  });

  // Check if selectedDrug conflicts with family allergies
  const hasFamilyAllergyWarning = (() => {
    if (!familyAllergies) return false;
    const low = familyAllergies.toLowerCase();
    if (
      (low.includes('pénicilline') || low.includes('penicilline') || low.includes('amoxicilline')) &&
      selectedDrug.interactionGroupIds.includes('penicillin')
    ) {
      return true;
    }
    if (
      (low.includes('aspirine') || low.includes('ains') || low.includes('ibuprofène')) &&
      selectedDrug.interactionGroupIds.includes('nsaid')
    ) {
      return true;
    }
    return false;
  })();

  return (
    <div className="space-y-6">
      {/* 1. INTERACTION CHECKER BAR (Inspired by Project NOMAD DrugReferenceController) */}
      <div className="bg-neutral-950 border border-amber-700/50 rounded-xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Pill className="w-5 h-5 text-amber-400" />
              <span>
                {isFr
                  ? 'Vérificateur d’Interactions Médicamenteuses Hors-Ligne'
                  : 'Offline Drug Interaction Checker'}
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {isFr
                ? 'Cochez 2 ou plusieurs médicaments que vous envisagez d’associer pour vérifier les contre-indications croisées.'
                : 'Select 2 or more medications to check for dangerous cross-interactions.'}
            </p>
          </div>
          {familyAllergies && (
            <div className="px-3 py-1.5 rounded bg-emerald-950/60 border border-emerald-700/70 text-[11px] font-mono text-emerald-200">
              🧠 {isFr ? 'Mémoire Familiale :' : 'Family Memory:'} {familyAllergies}
            </div>
          )}
        </div>

        {/* Drug chips for comparison */}
        <div className="flex flex-wrap gap-1.5">
          {EMERGENCY_DRUGS.map(drug => {
            const isChecked = compareIds.includes(drug.id);
            return (
              <button
                key={drug.id}
                onClick={() => toggleCompareDrug(drug.id)}
                className={`px-2.5 py-1.5 rounded text-xs font-mono border cursor-pointer transition-colors ${
                  isChecked
                    ? 'bg-amber-500 text-black border-amber-400 font-bold'
                    : 'bg-black border-neutral-800 text-stone-300 hover:border-neutral-600'
                }`}
              >
                {isChecked ? '✓ ' : '+ '}
                {drug.nameFr.split('(')[0].trim()}
              </button>
            );
          })}
        </div>

        {/* Interaction Results */}
        {compareIds.length < 2 ? (
          <div className="p-3 rounded-lg bg-black border border-neutral-800 text-xs text-stone-400 font-mono">
            {isFr
              ? 'Sélectionnez au moins 2 médicaments ci-dessus pour analyser leurs interactions.'
              : 'Select at least 2 medications above to analyze interactions.'}
          </div>
        ) : detectedInteractions.length === 0 ? (
          <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-700/70 text-emerald-200 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold">
                {isFr
                  ? 'Aucune interaction critique directe détectée entre ces molécules.'
                  : 'No direct critical interaction detected between these medications.'}
              </div>
              <div className="text-[11px] text-emerald-300/80 mt-0.5">
                {isFr
                  ? 'Vérifiez toujours les contre-indications individuelles (hydratation, grossesse, âge) dans la fiche ci-dessous.'
                  : 'Always verify individual contraindications below.'}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {detectedInteractions.map(rule => (
              <div
                key={rule.id}
                className={`p-4 rounded-lg border space-y-1.5 ${
                  rule.severity === 'critical'
                    ? 'bg-rose-950/60 border-rose-600 text-rose-100'
                    : 'bg-amber-950/50 border-amber-600 text-amber-100'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <AlertTriangle
                    className={`w-4 h-4 shrink-0 ${
                      rule.severity === 'critical' ? 'text-rose-400' : 'text-amber-400'
                    }`}
                  />
                  <span>{rule.titleFr}</span>
                </div>
                <p className="text-xs leading-relaxed opacity-95">{rule.explanationFr}</p>
                <div className="text-xs font-mono font-bold pt-1 text-amber-300">
                  → {rule.recommendationFr}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. DRUG DIRECTORY & POSOLOGY READER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={isFr ? 'Rechercher un médicament, symptôme...' : 'Search drug, symptom...'}
              className="w-full pl-9 pr-3 py-2 bg-black border border-neutral-800 rounded-md text-xs text-white outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex flex-wrap gap-1 text-[11px] font-mono">
            {[
              { id: 'all', label: isFr ? 'Tous (16)' : 'All' },
              { id: 'pain-fever', label: 'Douleur/Fièvre' },
              { id: 'antibiotic', label: 'Antibiotiques' },
              { id: 'allergy-shock', label: 'Allergie/Choc' },
              { id: 'digestive-rehydration', label: 'SRO/Digestif' },
              { id: 'toxicology-nrbc', label: 'Iode/Poison' },
              { id: 'wound-trauma', label: 'Antiseptiques' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-2 py-1 rounded cursor-pointer ${
                  categoryFilter === cat.id
                    ? 'bg-amber-500 text-black font-bold'
                    : 'bg-black text-stone-400 border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
            {filteredDrugs.map(drug => {
              const active = selectedDrug.id === drug.id;
              return (
                <button
                  key={drug.id}
                  onClick={() => setSelectedDrug(drug)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#2a2f1d] border-amber-500 text-white'
                      : 'bg-black border-neutral-800/90 text-stone-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                      {drug.categoryLabelFr}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400">{drug.dci.split(' ')[0]}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{drug.nameFr}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Card (7 cols) */}
        <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-4">
          <div className="border-b border-neutral-800 pb-3">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold">
              {selectedDrug.categoryLabelFr} · {selectedDrug.dci}
            </span>
            <h3 className="text-xl font-extrabold text-white mt-1">{selectedDrug.nameFr}</h3>
          </div>

          {hasFamilyAllergyWarning && (
            <div className="p-3.5 rounded-lg bg-rose-950 border-2 border-rose-500 text-rose-100 text-xs font-bold flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
              <span>
                {isFr
                  ? `ALERTE MÉMOIRE FAMILIALE : Une allergie correspondante est signalée dans votre Fiche Médicale Familiale (${familyAllergies}) !`
                  : `FAMILY MEMORY ALERT: Matching allergy recorded in your Family Profile (${familyAllergies})!`}
              </span>
            </div>
          )}

          <div className="p-3.5 rounded-lg bg-black border border-neutral-800 space-y-1">
            <div className="text-xs font-mono uppercase text-emerald-400 font-bold">
              {isFr ? 'Indications d’Urgence' : 'Emergency Indications'}
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              {selectedDrug.indicationsFr}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg bg-black border border-amber-700/50 space-y-1.5">
              <div className="text-xs font-mono uppercase text-amber-400 font-bold">
                {isFr ? 'Posologie Adulte' : 'Adult Dosage'}
              </div>
              <p className="text-xs text-stone-200 leading-relaxed">{selectedDrug.adultDoseFr}</p>
            </div>

            <div className="p-3.5 rounded-lg bg-black border border-sky-700/50 space-y-1.5">
              <div className="text-xs font-mono uppercase text-sky-400 font-bold">
                {isFr ? 'Posologie Enfant / Pédiatrique' : 'Pediatric Dosage'}
              </div>
              <p className="text-xs text-stone-200 leading-relaxed">{selectedDrug.childDoseFr}</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-rose-950/35 border border-rose-800/70 space-y-2">
            <div className="text-xs font-mono uppercase text-rose-300 font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>
                {isFr ? 'Contre-Indications Absolues & Précautions' : 'Strict Contraindications'}
              </span>
            </div>
            <ul className="space-y-1 text-xs text-rose-100/95">
              {selectedDrug.contraindicationsFr.map((ci, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{ci}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-black border border-neutral-800">
              <span className="font-mono text-[11px] text-stone-400 uppercase block mb-1">
                {isFr ? 'Effets secondaires principaux' : 'Side Effects'}
              </span>
              <span className="text-stone-300">{selectedDrug.sideEffectsFr}</span>
            </div>
            <div className="p-3 rounded-lg bg-black border border-neutral-800">
              <span className="font-mono text-[11px] text-stone-400 uppercase block mb-1">
                {isFr ? 'Conservation en Stock Survie' : 'Storage & Stability'}
              </span>
              <span className="text-stone-300">{selectedDrug.storageNotesFr}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// PROPOSITION 4 : CALCULATEUR DE RISQUE RÉEL (MICROMORTS) & DÉCISION CONFINEMENT VS ÉVACUATION
// ============================================================================
export const EvacuationDecisionModule: React.FC<{ language: Language }> = ({ language }) => {
  const isFr = language === 'fr';

  const [buildingState, setBuildingState] = useState<'intact' | 'damaged' | 'compromised'>('intact');
  const [outsideHazard, setOutsideHazard] = useState<'blackout' | 'nrbc-plume' | 'flood-fire'>('blackout');
  const [waterSupply, setWaterSupply] = useState<'ok-72h' | 'low-24h' | 'zero'>('ok-72h');
  const [roadSafety, setRoadSafety] = useState<'clear' | 'congested-storm' | 'impassable'>('clear');
  const [medicalEmergency, setMedicalEmergency] = useState<'none' | 'critical'>('none');

  // Read Family Rally Point from localStorage
  const [rallyPoint, setRallyPoint] = useState<string>('Mairie / Gymnase communal');
  const [radioPlan, setRadioPlan] = useState<string>('PMR446 Canal 8 / 7-7');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sentinel_family_profile_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.rallyPoint) setRallyPoint(parsed.rallyPoint);
        if (parsed.radioChannelPlan) setRadioPlan(parsed.radioChannelPlan);
      }
    } catch {}
  }, []);

  // Compute Tactical Decision
  const decision = (() => {
    // Immediate evacuation triggers
    if (buildingState === 'compromised') {
      return {
        code: 'EVACUATE_NOW' as const,
        title: isFr
          ? '🔴 ÉVACUATION IMMÉDIATE OBLIGATOIRE (Bâtiment en péril)'
          : '🔴 IMMEDIATE EVACUATION REQUIRED (Structure compromised)',
        reason: isFr
          ? 'Votre abri présente un risque mortel immédiat (incendie, fuite de gaz, effondrement). Coupez le gaz/électricité, prenez le Sac 72h et rejoignez immédiatement votre point de repli.'
          : 'Your structure poses an immediate lethal hazard. Grab your 72h bag and evacuate immediately.',
        steps: [
          'Couper immédiatement vanne de gaz et disjoncteur électrique principal',
          'Prendre uniquement les Sacs 72h, l’eau portable et les documents vitaux (< 3 minutes)',
          `Direction Point de Ralliement : ${rallyPoint}`,
          `Allumer les radios sur : ${radioPlan}`
        ]
      };
    }

    if (outsideHazard === 'nrbc-plume') {
      return {
        code: 'SHELTER_IN_PLACE' as const,
        title: isFr
          ? '🟢 CONFINEMENT ÉTANCHE ABSOLU SUR PLACE (Menace Chimique / Radiologique)'
          : '🟢 STRICT SHELTER-IN-PLACE (CBRN / Toxic Plume)',
        reason: isFr
          ? 'Fuir sur les routes sous un nuage toxique ou des retombées radioactives expose à une dose maximale. Restez à l’intérieur dans la pièce la plus centrale ou au sous-sol et calfeutrez toutes les aérations.'
          : 'Evacuating into a toxic plume or fallout exposes you to lethal doses. Seal all vents and remain indoors.',
        steps: [
          'Couper immédiatement la VMC, la climatisation et tous les chauffages à prise d’air',
          'Calfeutrer portes, fenêtres et grilles d’aération avec du ruban adhésif large et des linges humides',
          'Se regrouper dans la pièce centrale sans fenêtre (ou cave si risque radiologique, étage haut si gaz lourd type chlore)',
          'Écouter France Inter (105.5 FM / 162 kHz) sans sortir avant la fin officielle d’alerte'
        ]
      };
    }

    if (outsideHazard === 'flood-fire' && roadSafety !== 'impassable') {
      return {
        code: 'EVACUATE_NOW' as const,
        title: isFr
          ? '🔴 ÉVACUATION PRÉVENTIVE IMMÉDIATE (Crue montante / Feu de forêt)'
          : '🔴 IMMEDIATE PREEMPTIVE EVACUATION (Flood / Wildfire)',
        reason: isFr
          ? 'Les routes sont encore praticables mais votre zone est menacée par les eaux ou les flammes. Partez AVANT d’être encerclé.'
          : 'Roads are still passable while floodwaters or wildfire approach. Evacuate before routes are cut off.',
        steps: [
          'Ne JAMAIS s’engager sur une route inondée (30 cm d’eau suffisent à emporter un véhicule)',
          'En cas de feu de forêt : fermer les volets et le gaz avant de partir perpendiculairement au vent',
          `Rejoindre le point de repli en hauteur : ${rallyPoint}`
        ]
      };
    }

    if (medicalEmergency === 'critical' && roadSafety === 'clear') {
      return {
        code: 'EVACUATE_NOW' as const,
        title: isFr
          ? '🔴 ÉVACUATION MÉDICALE VERS LE CHU / HÔPITAL LE PLUS PROCHE'
          : '🔴 MEDICAL EVACUATION TO NEAREST HOSPITAL',
        reason: isFr
          ? 'Une urgence vitale chirurgicale ou médicale dépasse les capacités du poste autonome et les routes sont dégagées.'
          : 'A life-threatening medical emergency requires hospital care and roads are open.',
        steps: [
          'Consulter l’onglet Carte France (Hôpitaux & Cliniques) pour l’azimut et la distance du CHU le plus proche',
          'Emporter la Fiche Médicale Familiale imprimée et les traitements du patient'
        ]
      };
    }

    if (waterSupply === 'zero' || buildingState === 'damaged' || waterSupply === 'low-24h') {
      return {
        code: 'STANDBY_15MIN' as const,
        title: isFr
          ? '🟡 RESTER SUR PLACE EN ALERTE — RAVITAILLEMENT EAU REQUIS'
          : '🟡 SHELTER ON 15-MIN STANDBY — WATER RESUPPLY NEEDED',
        reason: isFr
          ? 'Il est plus sûr de conserver votre abri actuel que de partir sur les routes, mais vous devez sécuriser un point d’eau potable à proximité immédiate dès aujourd’hui.'
          : 'Remaining in your shelter is safer than the roads, but you must secure potable water immediately.',
        steps: [
          'Ouvrir la Carte de France et localiser le Point d’Eau Potable le plus proche de votre position',
          'Faire bouillir toute eau collectée pendant 1 minute complète à gros bouillons',
          'Préparer les Sacs 72h près de la porte d’entrée (départ possible en moins de 15 minutes)'
        ]
      };
    }

    return {
      code: 'SHELTER_IN_PLACE' as const,
      title: isFr
        ? '🟢 RESTER CONFINÉ AU DOMICILE (Option la plus sûre)'
        : '🟢 STAY AT HOME / SHELTER IN PLACE (Safest Option)',
      reason: isFr
        ? 'Statistiquement (études CDC / FEMA / Survival-LLM), quitter un bâtiment sain disposant d’eau potable pendant un blackout multiplie par 8 le risque d’hypothermie, d’accident ou d’agression.'
        : 'Statistically (CDC / FEMA / Survival-LLM data), leaving an intact home with water during a blackout multiplies mortality risk.',
      steps: [
        'Conserver l’eau potable et organiser le rationnement dans l’onglet Stock de Survie',
        'Regrouper les membres du foyer dans une seule pièce isolée pour conserver la chaleur corporelle',
        `Maintenir la veille radio aux heures fixes sur : ${radioPlan}`
      ]
    };
  })();

  // Real Mortality Risk Table in Micromorts (from survival-llm-main/library/fetch_risk.py)
  const riskBenchmarks = [
    {
      hazard: isFr ? 'Groupe électrogène ou brasero utilisé en intérieur / cave' : 'Generator or charcoal grill used indoors',
      riskLevel: 'EXTRÊME (> 50 000 micromorts / nuit)',
      rule: isFr
        ? '1re cause de décès post-tempête/blackout : le monoxyde de carbone (CO) est inodore et tue en moins de 15 minutes. Toujours placer à > 6 m dehors.'
        : '#1 post-blackout killer: Carbon Monoxide (CO) is odorless and lethal in minutes. Keep >20 ft outdoors.'
    },
    {
      hazard: isFr ? 'Traverser en voiture une route inondée (30 à 50 cm d’eau)' : 'Driving across a flooded road (30–50 cm water)',
      riskLevel: 'TRÈS ÉLEVÉ (8 500 micromorts)',
      rule: isFr
        ? 'Plus de 50% des noyades lors d’inondations surviennent en voiture. Demi-tour immédiat.'
        : 'Over 50% of flood drownings occur inside vehicles. Turn around immediately.'
    },
    {
      hazard: isFr ? 'Immersion dans une eau < 10°C sans combinaison pendant 45 min' : 'Immersion in <10°C water for 45 min',
      riskLevel: 'CRITIQUE (25 000 micromorts)',
      rule: isFr
        ? 'L’eau refroidit le corps 25 fois plus vite que l’air. Sortir de l’eau, retirer les habits mouillés et isoler du sol.'
        : 'Water conducts heat 25x faster than air. Strip wet clothes and insulate from ground.'
    },
    {
      hazard: isFr ? 'Boire de l’eau de rivière/étang non bouillie en situation de crise' : 'Drinking unboiled surface water in crisis',
      riskLevel: 'ÉLEVÉ (1 200 micromorts par déshydratation dysentérique)',
      rule: isFr
        ? 'Une diarrhée aiguë sévère fait perdre 4 à 6 L d’eau/jour. Toujours bouillir 1 min ou chlorer (2 gouttes Javel 2,6% / L + 30 min).'
        : 'Acute dysentery depletes 4–6 L/day. Always boil 1 min or disinfect with bleach.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 5 Tactical Questions (6 cols) */}
        <div className="lg:col-span-6 bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
          <div className="border-b border-neutral-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              <span>
                {isFr
                  ? 'Assistant de Décision : Rester Confiné vs Évacuer'
                  : 'Decision Matrix: Shelter-in-Place vs Evacuate'}
              </span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {isFr
                ? 'Répondez à ces 5 critères d’évaluation pour déterminer l’action la plus sûre.'
                : 'Evaluate these 5 tactical criteria to determine the safest course of action.'}
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-stone-200 block mb-1.5">
                1. {isFr ? 'État de votre bâtiment / abri actuel :' : 'Current Building Status:'}
              </label>
              <select
                value={buildingState}
                onChange={e => setBuildingState(e.target.value as any)}
                className="w-full px-3 py-2 bg-black border border-neutral-700 rounded-md text-white"
              >
                <option value="intact">🟢 Intact, sec et structurellement stable</option>
                <option value="damaged">🟡 Endommagé (vitres brisées / sans chauffage) mais stable</option>
                <option value="compromised">🔴 Menace d’effondrement, incendie ou fuite de gaz</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-200 block mb-1.5">
                2. {isFr ? 'Nature de la menace extérieure :' : 'Primary External Hazard:'}
              </label>
              <select
                value={outsideHazard}
                onChange={e => setOutsideHazard(e.target.value as any)}
                className="w-full px-3 py-2 bg-black border border-neutral-700 rounded-md text-white"
              >
                <option value="blackout">⚡ Blackout électrique, tempête ou troubles civils</option>
                <option value="nrbc-plume">☢️ Nuage toxique chimique, fumée industrielle ou alerte nucléaire</option>
                <option value="flood-fire">🌊 Crue montante rapide ou feu de forêt approchant</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-200 block mb-1.5">
                3. {isFr ? 'Réserve d’eau potable disponible sur place :' : 'Drinking Water on Site:'}
              </label>
              <select
                value={waterSupply}
                onChange={e => setWaterSupply(e.target.value as any)}
                className="w-full px-3 py-2 bg-black border border-neutral-700 rounded-md text-white"
              >
                <option value="ok-72h">💧 Plus de 72 heures d’eau potable (ou source sûre proche)</option>
                <option value="low-24h">⏳ Moins de 24 heures d’eau potable</option>
                <option value="zero">⚠️ Aucune réserve d’eau potable</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-200 block mb-1.5">
                4. {isFr ? 'État des routes et météo extérieure :' : 'Road & Weather Conditions:'}
              </label>
              <select
                value={roadSafety}
                onChange={e => setRoadSafety(e.target.value as any)}
                className="w-full px-3 py-2 bg-black border border-neutral-700 rounded-md text-white"
              >
                <option value="clear">🛣️ Routes dégagées et praticables</option>
                <option value="congested-storm">🌧️ Routes embouteillées ou météo sévère</option>
                <option value="impassable">⛔ Routes coupées, inondées ou impraticables</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-stone-200 block mb-1.5">
                5. {isFr ? 'Urgence médicale vitale dans le foyer :' : 'Life-Threatening Medical Emergency:'}
              </label>
              <select
                value={medicalEmergency}
                onChange={e => setMedicalEmergency(e.target.value as any)}
                className="w-full px-3 py-2 bg-black border border-neutral-700 rounded-md text-white"
              >
                <option value="none">✅ Aucune urgence chirurgicale/hospitalière immédiate</option>
                <option value="critical">🚑 Oui : blessé grave ou détresse nécessitant un CHU</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Immediate Recommendation + Micromort Risk Table (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div
            className={`rounded-xl border-2 p-5 space-y-3 ${
              decision.code === 'EVACUATE_NOW'
                ? 'bg-rose-950/50 border-rose-500 text-rose-100'
                : decision.code === 'STANDBY_15MIN'
                ? 'bg-amber-950/50 border-amber-500 text-amber-100'
                : 'bg-emerald-950/50 border-emerald-500 text-emerald-100'
            }`}
          >
            <div className="text-xs font-mono uppercase opacity-80">
              {isFr ? 'VERDICT TACTIQUE RECOMMANDÉ' : 'RECOMMENDED TACTICAL DECISION'}
            </div>
            <h4 className="text-lg sm:text-xl font-black">{decision.title}</h4>
            <p className="text-xs sm:text-sm leading-relaxed">{decision.reason}</p>

            <div className="pt-2 border-t border-white/15 space-y-1.5">
              <div className="text-xs font-mono font-bold uppercase">
                {isFr ? 'Actions immédiates :' : 'Immediate Actions:'}
              </div>
              {decision.steps.map((s, idx) => (
                <div key={idx} className="text-xs flex items-start gap-2">
                  <span className="font-mono font-bold">{idx + 1}.</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Micromorts Risk Reference (from Survival-LLM fetch_risk.py) */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase font-mono">
              {isFr
                ? 'Référentiel des Risques Mortels en Crise (Données CDC / Micromorts)'
                : 'Crisis Mortality Risk Reference (CDC / Micromorts)'}
            </h4>
            <div className="space-y-2">
              {riskBenchmarks.map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-black border border-neutral-800 text-xs space-y-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="font-bold text-white">{item.hazard}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 border border-rose-700 text-rose-300 font-bold">
                      {item.riskLevel}
                    </span>
                  </div>
                  <p className="text-stone-400 text-[11px]">{item.rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// PROPOSITION 5 : CONVERTISSEUR MORSE & SIGNAUX LUMINEUX / SONORES SOS
// ============================================================================
const MORSE_MAP: Record<string, string> = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  ' ': '/'
};

export const SosMorseSignalerModule: React.FC<{ language: Language }> = ({ language }) => {
  const isFr = language === 'fr';
  const [inputText, setInputText] = useState<string>('SOS BESOIN SECOURS');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [loopSos, setLoopSos] = useState<boolean>(false);
  const [enableAudio, setEnableAudio] = useState<boolean>(true);
  const [enableFlash, setEnableFlash] = useState<boolean>(true);
  const [fullscreenFlash, setFullscreenFlash] = useState<boolean>(false);
  const [flashColor, setFlashColor] = useState<'white' | 'red'>('white');
  const [isLit, setIsLit] = useState<boolean>(false);
  const [unitMs, setUnitMs] = useState<number>(110);

  const stopSignalRef = useRef<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const toMorseString = (text: string) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .split('')
      .map(ch => MORSE_MAP[ch] || '')
      .filter(Boolean)
      .join(' ');
  };

  const morseOutput = toMorseString(inputText);

  const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

  const playTone = (durationMs: number) => {
    if (!enableAudio) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, ctx.currentTime);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + durationMs / 1000);
    } catch {}
  };

  const stopTransmission = () => {
    stopSignalRef.current = true;
    setIsPlaying(false);
    setLoopSos(false);
    setIsLit(false);
    setFullscreenFlash(false);
  };

  useEffect(() => {
    return () => {
      stopSignalRef.current = true;
    };
  }, []);

  const transmitMorseSequence = async (morseStr: string, loop: boolean) => {
    stopSignalRef.current = false;
    setIsPlaying(true);

    do {
      for (let i = 0; i < morseStr.length; i++) {
        if (stopSignalRef.current) break;
        const symbol = morseStr[i];

        if (symbol === '.' || symbol === '-') {
          const duration = symbol === '.' ? unitMs : unitMs * 3;
          if (enableFlash) setIsLit(true);
          playTone(duration);
          await sleep(duration);
          setIsLit(false);
          await sleep(unitMs); // Intra-character gap
        } else if (symbol === ' ') {
          await sleep(unitMs * 2); // Inter-character gap
        } else if (symbol === '/') {
          await sleep(unitMs * 5); // Word gap
        }
      }

      if (loop && !stopSignalRef.current) {
        await sleep(unitMs * 6);
      }
    } while (loop && !stopSignalRef.current);

    setIsLit(false);
    setIsPlaying(false);
    setLoopSos(false);
  };

  const handleTriggerContinuousSos = () => {
    if (isPlaying) {
      stopTransmission();
      return;
    }
    setInputText('SOS');
    setLoopSos(true);
    transmitMorseSequence('... --- ...', true);
  };

  const handlePlayCustomMessage = () => {
    if (isPlaying) {
      stopTransmission();
      return;
    }
    transmitMorseSequence(morseOutput, false);
  };

  return (
    <div className="space-y-6">
      {/* FULLSCREEN OPTICAL FLASH OVERLAY WHEN ACTIVE */}
      {fullscreenFlash && isPlaying && (
        <div
          onClick={stopTransmission}
          className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center cursor-pointer transition-colors duration-75 ${
            isLit
              ? flashColor === 'white'
                ? 'bg-white text-black'
                : 'bg-rose-600 text-white'
              : 'bg-black text-amber-400'
          }`}
        >
          <div className="text-center space-y-4 p-6 font-mono">
            <div className="text-5xl sm:text-7xl font-black tracking-widest">
              {loopSos ? 'S.O.S. ··· --- ···' : inputText}
            </div>
            <div className="text-xl font-bold">{morseOutput}</div>
            <div className="inline-block px-6 py-3 rounded-lg bg-black/80 text-white border border-white/40 text-sm font-bold">
              {isFr ? 'CLIQUER N’IMPORTE OÙ POUR ARRÊTER LE SIGNAL' : 'CLICK ANYWHERE TO STOP SIGNAL'}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: SOS Beacon & Morse Transmitter (7 cols) */}
        <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-400" />
                <span>
                  {isFr
                    ? 'Émetteur S.O.S. Lumineux & Sonore + Convertisseur Morse'
                    : 'Optical & Audio S.O.S. Beacon + Morse Converter'}
                </span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                {isFr
                  ? 'Émet le signal international S.O.S. (··· --- ···) en son radio 750 Hz et flash d’écran nocturne.'
                  : 'Transmits international S.O.S. (··· --- ···) in 750 Hz CW audio and high-visibility screen flash.'}
              </p>
            </div>

            {/* Visual Flash Indicator Lamp */}
            <div
              className={`px-4 py-2 rounded-lg border font-mono text-xs font-black tracking-widest flex items-center gap-2 ${
                isLit
                  ? flashColor === 'white'
                    ? 'bg-white text-black border-white shadow-[0_0_25px_#ffffff]'
                    : 'bg-rose-600 text-white border-rose-400 shadow-[0_0_25px_#e11d48]'
                  : 'bg-black text-stone-500 border-neutral-800'
              }`}
            >
              <span className={`w-3 h-3 rounded-full ${isLit ? 'bg-amber-500' : 'bg-neutral-700'}`} />
              <span>{isLit ? 'SIGNAL ON' : 'VEILLE'}</span>
            </div>
          </div>

          {/* Giant 1-Click S.O.S. Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleTriggerContinuousSos}
              className={`py-4 px-4 rounded-xl font-mono font-black text-sm sm:text-base flex items-center justify-center gap-2.5 cursor-pointer border-2 transition-all ${
                loopSos
                  ? 'bg-rose-600 text-white border-white animate-pulse'
                  : 'bg-rose-950/80 hover:bg-rose-900 text-rose-100 border-rose-500'
              }`}
            >
              {loopSos ? <Square className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5 text-rose-400" />}
              <span>
                {loopSos
                  ? isFr
                    ? 'ARRÊTER LE SIGNAL S.O.S.'
                    : 'STOP S.O.S. BEACON'
                  : isFr
                  ? 'LANCER S.O.S. CONTINU (··· --- ···)'
                  : 'START CONTINUOUS S.O.S.'}
              </span>
            </button>

            <button
              onClick={() => {
                setFullscreenFlash(true);
                if (!isPlaying) {
                  setInputText('SOS');
                  setLoopSos(true);
                  transmitMorseSequence('... --- ...', true);
                }
              }}
              className="py-4 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-mono font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sun className="w-5 h-5" />
              <span>
                {isFr ? 'FLASH S.O.S. PLEIN ÉCRAN (NUIT)' : 'FULLSCREEN NIGHT S.O.S. FLASH'}
              </span>
            </button>
          </div>

          {/* Options Bar: Audio, Flash, Color, Speed */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
            <button
              onClick={() => setEnableAudio(!enableAudio)}
              className={`p-2.5 rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                enableAudio
                  ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300 font-bold'
                  : 'bg-black border-neutral-800 text-stone-500'
              }`}
            >
              {enableAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{enableAudio ? 'Son 750Hz: ON' : 'Son: OFF'}</span>
            </button>

            <button
              onClick={() => setEnableFlash(!enableFlash)}
              className={`p-2.5 rounded-lg border flex items-center justify-center gap-1.5 cursor-pointer ${
                enableFlash
                  ? 'bg-amber-950/60 border-amber-600 text-amber-300 font-bold'
                  : 'bg-black border-neutral-800 text-stone-500'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>{enableFlash ? 'Flash: ON' : 'Flash: OFF'}</span>
            </button>

            <button
              onClick={() => setFlashColor(flashColor === 'white' ? 'red' : 'white')}
              className="p-2.5 rounded-lg bg-black border border-neutral-800 text-stone-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{flashColor === 'white' ? '⚪ Blanc Max' : '🔴 Rouge Nuit'}</span>
            </button>

            <select
              value={unitMs}
              onChange={e => setUnitMs(Number(e.target.value))}
              className="p-2.5 rounded-lg bg-black border border-neutral-800 text-amber-300 outline-none"
            >
              <option value={140}>Lent (Débutant)</option>
              <option value={105}>Standard (SOS)</option>
              <option value={70}>Rapide (Radio CW)</option>
            </select>
          </div>

          {/* Custom Message to Morse Converter */}
          <div className="space-y-2.5 pt-2 border-t border-neutral-800">
            <label className="text-xs font-bold text-stone-300 block">
              {isFr
                ? 'Convertir un message personnalisé en Code Morse :'
                : 'Convert Custom Message to Morse Code:'}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Ex: SOS 2 ADULTES 1 ENFANT EAU"
                className="flex-1 px-3.5 py-2.5 bg-black border border-neutral-700 focus:border-amber-500 rounded-lg text-sm font-mono text-white outline-none"
              />
              <button
                onClick={handlePlayCustomMessage}
                className={`px-4 py-2.5 rounded-lg font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
                  isPlaying && !loopSos
                    ? 'bg-rose-600 text-white'
                    : 'bg-[#343b24] hover:bg-[#414a2d] border border-amber-500/50 text-amber-100'
                }`}
              >
                {isPlaying && !loopSos ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-300" />}
                <span>{isPlaying && !loopSos ? 'Stop' : isFr ? 'Émettre ce message' : 'Transmit Message'}</span>
              </button>
            </div>

            <div className="p-4 rounded-lg bg-black border border-neutral-800 font-mono">
              <div className="text-[10px] text-stone-400 uppercase mb-1">
                {isFr ? 'Code Morse généré (· Court / - Long) :' : 'Generated Morse Code:'}
              </div>
              <div className="text-lg sm:text-xl font-black text-amber-400 tracking-[0.2em] break-words">
                {morseOutput || '... --- ...'}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Alphabet Morse & Signaux Internationaux de Détresse (5 cols) */}
        <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase font-mono border-b border-neutral-800 pb-2.5">
            {isFr
              ? 'Alphabet Morse & Signaux Internationaux de Secours'
              : 'Morse Alphabet & Distress Signals'}
          </h4>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 font-mono text-xs">
            {Object.entries(MORSE_MAP)
              .filter(([k]) => k !== ' ')
              .map(([char, code]) => (
                <div
                  key={char}
                  onClick={() => setInputText(prev => `${prev}${char}`)}
                  className="p-1.5 rounded bg-black border border-neutral-800 hover:border-amber-500 text-center cursor-pointer"
                >
                  <div className="font-bold text-white">{char}</div>
                  <div className="text-amber-400 text-[11px] font-bold">{code}</div>
                </div>
              ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-neutral-800 text-xs">
            <div className="p-3 rounded-lg bg-black border border-neutral-800">
              <span className="font-mono font-bold text-amber-400 block">
                🔊 Signal Sifflet / Lampe en Montagne (Norme Alpine)
              </span>
              <span className="text-stone-300">
                <strong>6 coups par minute</strong> (1 signal toutes les 10 secondes), puis 1 minute de silence. Réponse des secours : <strong>3 coups par minute</strong>.
              </span>
            </div>

            <div className="p-3 rounded-lg bg-black border border-neutral-800">
              <span className="font-mono font-bold text-emerald-400 block">
                🚁 Signaux Sol-Air pour Hélicoptère (3 m de long au sol)
              </span>
              <span className="text-stone-300">
                <strong>V</strong> = Besoin d’assistance · <strong>X</strong> = Besoin de secours médical urgent · <strong>Y</strong> = Oui (Yes) · <strong>N</strong> = Non (No).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
