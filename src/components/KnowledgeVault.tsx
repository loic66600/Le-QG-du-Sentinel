import React, { useState } from 'react';
import { Language, SurvivalArticle } from '../types/sentinel';
import { SURVIVAL_ARTICLES, RADIO_FREQUENCIES, BUG_OUT_BAG_ITEMS } from '../data/survivalDatabase';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Radio, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  Layers, 
  FileText,
  ShieldAlert,
  Droplet,
  HeartPulse,
  FlameKindling,
  Compass,
  Zap,
  ExternalLink,
  Calculator,
  Briefcase,
  Users,
  Calendar,
  Check,
  Scale
} from 'lucide-react';

interface KnowledgeVaultProps {
  language: Language;
}

export const KnowledgeVault: React.FC<KnowledgeVaultProps> = ({ language }) => {
  const isFr = language === 'fr';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<SurvivalArticle | null>(SURVIVAL_ARTICLES[0]);
  const [viewTab, setViewTab] = useState<'articles' | 'calculator' | 'bug-out-bag' | 'radio' | 'zim-catalog'>('articles');

  // Survival Calculator State (Persisted locally)
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

  // Bug Out Bag Interactive Checklist State (Persisted locally)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('sentinel_bob_checked_v2');
      return saved ? JSON.parse(saved) : { b1: true, b2: true, b4: true, b9: true, b10: true };
    } catch {
      return { b1: true, b2: true, b4: true, b9: true, b10: true };
    }
  });

  const toggleBobItem = (id: string) => {
    setCheckedItems(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('sentinel_bob_checked_v2', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const categories = [
    { id: 'all', labelFr: 'Tous les guides', labelEn: 'All Guides' },
    { id: 'medical', labelFr: 'Secourisme & Trauma', labelEn: 'Trauma & Medical' },
    { id: 'water', labelFr: 'Eau & Potabilisation', labelEn: 'Water & Purification' },
    { id: 'shelter', labelFr: 'Abri & Hypothermie', labelEn: 'Shelter & Cold' },
    { id: 'food', labelFr: 'Alimentation & Plantes', labelEn: 'Food & Foraging' },
    { id: 'comms', labelFr: 'Radio & Transmissions', labelEn: 'Radio & Comms' },
    { id: 'energy', labelFr: 'Énergie & Batteries 12V', labelEn: 'Solar & 12V Energy' },
    { id: 'tactical', labelFr: 'Tactique & NRBC', labelEn: 'Tactical & CBRN' }
  ];

  const filteredArticles = SURVIVAL_ARTICLES.filter((article) => {
    const matchesCat = selectedCategory === 'all' || article.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      article.titleFr.toLowerCase().includes(query) ||
      article.titleEn.toLowerCase().includes(query) ||
      article.summaryFr.toLowerCase().includes(query) ||
      article.summaryEn.toLowerCase().includes(query) ||
      article.contentFr.toLowerCase().includes(query) ||
      article.contentEn.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  // Calculate Autonomy Rations
  const waterPerPersonPerDay = climate === 'hot' ? 4.5 : climate === 'winter' ? 3.0 : 2.5;
  const cookingWaterPerDay = 1.0;
  const totalWaterLitres = Math.round(peopleCount * (waterPerPersonPerDay + cookingWaterPerDay) * daysCount);
  const caloriesPerPerson = climate === 'winter' ? 2800 : 2200;
  const totalCalories = Math.round(peopleCount * caloriesPerPerson * daysCount);
  const energyWhPerDay = peopleCount * 30 + 150; // 150Wh for server + 30Wh per device
  const totalBatteryCapacityWh = Math.round(energyWhPerDay * 3); // 3 days cloudy buffer

  const currentBobWeightGrams = BUG_OUT_BAG_ITEMS.reduce((acc, item) => {
    return checkedItems[item.id] ? acc + item.weightGrams : acc;
  }, 0);

  const totalPossibleBobWeightGrams = BUG_OUT_BAG_ITEMS.reduce((acc, item) => acc + item.weightGrams, 0);

  const zimCatalog = [
    {
      name: 'wikimed_fr_all_maxi.zim',
      size: '4.8 GB',
      articlesCount: '75 000+',
      descFr: 'Encyclopédie médicale complète hors-ligne WikiMed (maladies, pharmacologie, chirurgie d’urgence, pédiatrie).',
      descEn: 'Full offline WikiMed medical encyclopedia (diseases, pharmacology, emergency surgery, pediatric care).',
      priority: 'vital'
    },
    {
      name: 'wikipedia_fr_all_mini.zim',
      size: '12.4 GB',
      articlesCount: '450 000+',
      descFr: 'Wikipédia francophone condensée (sciences, histoire, géographie, mécanique et technologies).',
      descEn: 'Condensed French Wikipedia (sciences, history, geography, mechanics, and survival technologies).',
      priority: 'high'
    },
    {
      name: 'wikibooks_fr_all.zim',
      size: '1.9 GB',
      articlesCount: '15 000+',
      descFr: 'Manuels pratiques, cours d’ingénierie, métallurgie, agriculture régénérative et électricité.',
      descEn: 'Practical textbooks, engineering courses, metallurgy, regenerative agriculture, and electrical schematics.',
      priority: 'medium'
    },
    {
      name: 'gutenberg_fr_all.zim',
      size: '2.3 GB',
      articlesCount: '2 800+ livres',
      descFr: 'Bibliothèque littéraire et manuels historiques du domaine public.',
      descEn: 'Public-domain literary library and historical field books.',
      priority: 'medium'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-white">
              {isFr ? 'Bibliothèque de Survie & Guides Hors-Ligne (IIAB / Kiwix)' : 'Offline Survival Vault & Guides (IIAB / Kiwix)'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isFr
              ? 'Protocoles vitaux TCCC, manuels FM 21-76, calculateur d’autonomie et checklist sac 72h.'
              : 'TCCC emergency protocols, FM 21-76 field manuals, autonomy calculator, and 72-hour bug-out pack.'}
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg">
          <button
            onClick={() => setViewTab('articles')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              viewTab === 'articles'
                ? 'bg-slate-800 text-amber-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isFr ? 'Fiches d’Action' : 'Action Guides'}
          </button>
          <button
            onClick={() => setViewTab('calculator')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              viewTab === 'calculator'
                ? 'bg-slate-800 text-amber-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{isFr ? 'Calculateur d’Autonomie' : 'Autonomy Calculator'}</span>
          </button>
          <button
            onClick={() => setViewTab('bug-out-bag')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              viewTab === 'bug-out-bag'
                ? 'bg-slate-800 text-amber-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>{isFr ? 'Sac 72H (BOB)' : '72h Bug-Out'}</span>
          </button>
          <button
            onClick={() => setViewTab('radio')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              viewTab === 'radio'
                ? 'bg-slate-800 text-amber-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isFr ? 'Fréquences Radio' : 'Radio Nets'}
          </button>
          <button
            onClick={() => setViewTab('zim-catalog')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              viewTab === 'zim-catalog'
                ? 'bg-slate-800 text-amber-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isFr ? 'Archives ZIM' : 'ZIM Archives'}
          </button>
        </div>
      </div>

      {/* Tab 1: Action Guides View */}
      {viewTab === 'articles' && (
        <div className="space-y-6">
          {/* Search and Category Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isFr
                    ? 'Rechercher un geste, un symptôme ou un protocole (garrot, eau, radio, froid, feu, NRBC)...'
                    : 'Search procedure, symptom, or protocol (tourniquet, water, radio, hypothermia, fire, CBRN)...'
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500/10 border border-amber-500/40 text-amber-400'
                      : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isFr ? cat.labelFr : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Column Reader Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Article List */}
            <div className="lg:col-span-5 space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
              {filteredArticles.length === 0 ? (
                <div className="p-8 text-center border border-slate-800 rounded-xl bg-slate-900/30 text-slate-400 text-xs">
                  {isFr ? 'Aucun protocole trouvé pour cette recherche.' : 'No protocol matched this query.'}
                </div>
              ) : (
                filteredArticles.map((art) => {
                  const isSelected = activeArticle?.id === art.id;
                  return (
                    <div
                      key={art.id}
                      onClick={() => setActiveArticle(art)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-900 border-amber-500/50 shadow-md ring-1 ring-amber-500/20'
                          : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                          art.criticalLevel === 'vital' ? 'text-rose-400' : 'text-amber-400'
                        }`}>
                          {art.criticalLevel === 'vital' ? (isFr ? 'URGENCE VITALE' : 'CRITICAL') : 'PRIORITÉ HAUTE'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {art.category.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white leading-snug">
                        {isFr ? art.titleFr : art.titleEn}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                        {isFr ? art.summaryFr : art.summaryEn}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Column: Active Article Deep-Dive */}
            <div className="lg:col-span-7">
              {activeArticle ? (
                <div className="border border-slate-800 rounded-xl bg-slate-900/60 p-6 space-y-6">
                  {/* Article Title & Meta */}
                  <div className="space-y-2 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="text-amber-400 font-bold uppercase">{activeArticle.category}</span>
                      <span>·</span>
                      <span>{isFr ? 'Protocole Vérifié' : 'Verified SOP'}</span>
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      {isFr ? activeArticle.titleFr : activeArticle.titleEn}
                    </h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isFr ? activeArticle.summaryFr : activeArticle.summaryEn}
                    </p>
                  </div>

                  {/* Critical Warnings Box */}
                  {((isFr ? activeArticle.warningsFr : activeArticle.warningsEn) || []).length > 0 && (
                    <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-lg space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400 uppercase">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>{isFr ? 'AVERTISSEMENTS CRITIQUES & INTERDICTIONS' : 'CRITICAL PROHIBITIONS & WARNINGS'}</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-rose-200">
                        {(isFr ? activeArticle.warningsFr : activeArticle.warningsEn)?.map((w, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-rose-400 mt-0.5">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Step-by-Step Procedure */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                      {isFr ? 'Étapes Chronologiques d’Exécution :' : 'Sequential Action Steps:'}
                    </h3>
                    <div className="space-y-2">
                      {(isFr ? activeArticle.stepsFr : activeArticle.stepsEn).map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-200 leading-relaxed"
                        >
                          <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 font-mono font-bold text-amber-400 flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Context Notes */}
                  <div className="text-xs text-slate-300 bg-slate-950/60 border border-slate-800 rounded-lg p-4 leading-relaxed whitespace-pre-line">
                    {isFr ? activeArticle.contentFr : activeArticle.contentEn}
                  </div>

                  {/* Citations Footer */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="text-amber-500/80">{isFr ? 'Manuels de référence :' : 'Reference manuals:'}</span>
                    <span>{activeArticle.sources.join(' · ')}</span>
                  </div>
                </div>
              ) : (
                <div className="border border-slate-800 rounded-xl p-12 text-center text-slate-400 text-xs">
                  {isFr ? 'Sélectionnez un protocole dans la liste.' : 'Select a protocol from the list.'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Autonomy Calculator */}
      {viewTab === 'calculator' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  {isFr ? 'Calculateur d’Autonomie Vitale & Logistique d’Urgence' : 'Emergency Autonomy & Resource Calculator'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isFr
                    ? 'Dimensionnez vos stocks réels d’eau potable, rations caloriques et énergie selon la taille de votre groupe.'
                    : 'Accurately size essential water, caloric rations, and solar battery storage based on group size and duration.'}
                </p>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  <Users className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                  {isFr ? 'Nombre de Personnes :' : 'Number of Persons:'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  <Calendar className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                  {isFr ? 'Jours d’Autonomie Ciblés :' : 'Target Autonomy (Days):'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={daysCount}
                  onChange={(e) => setDaysCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  <Compass className="w-3.5 h-3.5 inline mr-1 text-amber-500" />
                  {isFr ? 'Climat & Environnement :' : 'Climate Environment:'}
                </label>
                <select
                  value={climate}
                  onChange={(e) => setClimate(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none"
                >
                  <option value="temperate">{isFr ? 'Tempéré normal (20°C)' : 'Temperate (20°C / 68°F)'}</option>
                  <option value="hot">{isFr ? 'Chaleur / Désert (>30°C)' : 'Arid / High Heat (>30°C)'}</option>
                  <option value="winter">{isFr ? 'Hiver rigoureux (<0°C)' : 'Severe Cold / Sub-Zero'}</option>
                </select>
              </div>
            </div>

            {/* Results KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-sky-400" />
                  <span>{isFr ? 'Volume d’Eau Minimum' : 'Minimum Potable Water'}</span>
                </span>
                <div className="text-2xl font-bold font-mono text-sky-400 tabular-nums">
                  {totalWaterLitres} Litres
                </div>
                <span className="text-[10px] text-slate-500 block">
                  {isFr ? `Soit ${(totalWaterLitres / daysCount).toFixed(1)} L / jour pour le groupe` : `${(totalWaterLitres / daysCount).toFixed(1)} L / day for group`}
                </span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                  <FlameKindling className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isFr ? 'Énergie Alimentaire' : 'Caloric Requirements'}</span>
                </span>
                <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                  {totalCalories.toLocaleString()} kcal
                </div>
                <span className="text-[10px] text-slate-500 block">
                  {isFr ? `~${Math.round(totalCalories / 3600)} rations d’urgence compactes (type NRG-5)` : `~${Math.round(totalCalories / 3600)} emergency ration bricks (NRG-5)`}
                </span>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isFr ? 'Stockage Batterie 12V' : '12V Battery Storage'}</span>
                </span>
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                  {totalBatteryCapacityWh} Wh
                </div>
                <span className="text-[10px] text-slate-500 block">
                  {isFr ? `Batterie LiFePO4 recommandée : 12V ${Math.round(totalBatteryCapacityWh / 12.8)}Ah` : `Recommended LiFePO4: 12V ${Math.round(totalBatteryCapacityWh / 12.8)}Ah`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Bug Out Bag Interactive Checklist */}
      {viewTab === 'bug-out-bag' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {isFr ? 'Checklist Interactive du Sac d’Évacuation 72H (Bug Out Bag)' : '72-Hour Bug Out Bag Interactive Checklist'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isFr
                      ? 'Cochez vos équipements réels pour mesurer le poids total et le degré de préparation.'
                      : 'Check off your real pack equipment to gauge total load weight and readiness level.'}
                  </p>
                </div>
              </div>

              {/* Weight Metric Badge */}
              <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl shrink-0">
                <Scale className="w-4 h-4 text-amber-500" />
                <div className="font-mono text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase">{isFr ? 'Poids Calculé :' : 'Pack Weight:'}</span>
                  <span className="text-amber-400 font-bold text-sm">
                    {(currentBobWeightGrams / 1000).toFixed(2)} kg <span className="text-slate-500 text-xs">({((currentBobWeightGrams / 1000) * 2.204).toFixed(1)} lbs)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Checklist Items Table */}
            <div className="divide-y divide-slate-800/80 border border-slate-800 rounded-xl bg-slate-950 overflow-hidden">
              {BUG_OUT_BAG_ITEMS.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleBobItem(item.id)}
                    className="p-3 sm:px-4 flex items-center justify-between gap-3 hover:bg-slate-900/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        isChecked
                          ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold'
                          : 'border-slate-700 bg-slate-900 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <span className={`text-xs block font-medium truncate ${
                          isChecked ? 'text-slate-200' : 'text-slate-400 line-through'
                        }`}>
                          {isFr ? item.nameFr : item.nameEn}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {isFr ? item.categoryFr : item.categoryEn}
                        </span>
                      </div>
                    </div>

                    <div className="font-mono text-xs text-slate-400 tabular-nums shrink-0">
                      {item.weightGrams}g
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Emergency Radio Nets View */}
      {viewTab === 'radio' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-amber-500" />
              <span>{isFr ? 'Plan de Fréquences d’Urgence & de Coordination Nomade' : 'Emergency Frequency Plan & Nomadic Coordination'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isFr
                ? 'Ces fréquences doivent être programmées à l’avance dans vos émetteurs-récepteurs portatifs (Baofeng, Quansheng, talkies PMR446). En cas de rupture des télécommunications, effectuez une veille radio de 5 minutes aux heures pleines (hh:00).'
                : 'Program these simplex frequencies into handheld transceivers (Baofeng, Quansheng, PMR446 radios) prior to grid loss. Maintain a 5-minute listening watch at the top of every hour (hh:00).'}
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-900/40">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono">
                <tr>
                  <th className="py-3 px-4">{isFr ? 'CANAL / NOM' : 'CHANNEL / NAME'}</th>
                  <th className="py-3 px-4">{isFr ? 'FRÉQUENCE' : 'FREQUENCY'}</th>
                  <th className="py-3 px-4">{isFr ? 'BANDE' : 'BAND'}</th>
                  <th className="py-3 px-4">{isFr ? 'USAGE & DESTINATION' : 'USAGE & TARGET'}</th>
                  <th className="py-3 px-4">{isFr ? 'PROTOCOLE DE VEILLE' : 'PROTOCOL'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {RADIO_FREQUENCIES.map((rf) => (
                  <tr key={rf.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-100">
                      {rf.name}
                    </td>
                    <td className="py-3 px-4 text-amber-400 font-bold tabular-nums">
                      {rf.frequency}
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {rf.band} {rf.channel && `(${rf.channel})`}
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-sans">
                      {isFr ? rf.usageFr : rf.usageEn}
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] font-sans">
                      {isFr ? rf.protocolFr : rf.protocolEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: ZIM Catalog View */}
      {viewTab === 'zim-catalog' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>{isFr ? 'Catalogue des Archives ZIM Pré-téléchargées (Kiwix / IIAB)' : 'Pre-loaded ZIM Archive Catalog (Kiwix / IIAB)'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isFr
                ? 'Les fichiers .zim contiennent des copies compressées complètes de sites web sans images lourdes. Déposez-les simplement dans le répertoire `/opt/sentinel/zims/` de votre machine hôte pour qu’ils soient servis instantanément à tous les utilisateurs du réseau local.'
                : 'ZIM files pack whole compressed websites for offline access. Simply copy them into the `/opt/sentinel/zims/` host directory to serve them across the entire offline local area network.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {zimCatalog.map((zim, idx) => (
              <div
                key={idx}
                className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-amber-400 truncate">
                    {zim.name}
                  </span>
                  <span className="font-mono text-xs text-slate-400 tabular-nums shrink-0">
                    {zim.size}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isFr ? zim.descFr : zim.descEn}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                  <span>{isFr ? 'Articles indexés :' : 'Indexed articles:'} {zim.articlesCount}</span>
                  <span className="text-emerald-400">READY IN VOLUME</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
