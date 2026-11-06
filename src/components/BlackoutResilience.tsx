import React, { useState } from 'react';
import { Language } from '../types/sentinel';
import { 
  ZapOff, 
  Battery, 
  Sun, 
  Flame, 
  Droplet, 
  Printer, 
  Clock, 
  ShieldCheck, 
  AlertTriangle,
  Lightbulb,
  Radio,
  Sliders,
  CheckCircle2,
  HardDrive
} from 'lucide-react';

interface BlackoutResilienceProps {
  language: Language;
}

export const BlackoutResilience: React.FC<BlackoutResilienceProps> = ({ language }) => {
  const isFr = language === 'fr';

  // Battery Duty Cycle Simulation State
  const [batteryCapacityWh, setBatteryCapacityWh] = useState<number>(450); // e.g. laptop internal + portable power station
  const [dutyCycleMinutesPerDay, setDutyCycleMinutesPerDay] = useState<number>(40); // 20m morning, 20m evening
  const [solarInputWatts, setSolarInputWatts] = useState<number>(30); // 30W folding panel
  const [activeTab, setActiveTab] = useState<'audit' | 'guides' | 'duty-cycle' | 'binder'>('guides');
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('sentinel_blackout_checklist_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleStep = (id: string) => {
    setCheckedSteps(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('sentinel_blackout_checklist_v1', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Server draws 18W active, 45W while generating with LLM
  const avgActiveWatts = 25;
  const dailyConsumptionWh = (avgActiveWatts * (dutyCycleMinutesPerDay / 60));
  const dailySolarYieldWh = solarInputWatts * 3.5 * 0.75; // 3.5 peak sun hours, 75% efficiency
  const netDailyWh = dailyConsumptionWh - dailySolarYieldWh;

  const continuousHours = (batteryCapacityWh / avgActiveWatts).toFixed(1);
  const dutyCycleDays = netDailyWh <= 0 
    ? 'Infini (Auto-suffisant avec panneau)' 
    : (batteryCapacityWh / netDailyWh).toFixed(0);

  const handlePrintBinder = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ZapOff className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold text-white">
              {isFr ? 'Survie Sans Électricité & Audit de Résilience Blackout' : 'Zero-Electricity Survival & Blackout Resilience'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isFr
              ? 'Protocoles pour maintenir l’autonomie vitale en cas de coupure totale et prolongée du réseau électrique.'
              : 'Protocols for absolute vitality and operation during indefinite power grid collapse.'}
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('guides')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'guides' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isFr ? '⚡ Astuces, Bonnes Pratiques & Check-list' : '⚡ Tips, Best Practices & Checklist'}
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'audit' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isFr ? 'Audit du Système' : 'System Audit'}
          </button>
          <button
            onClick={() => setActiveTab('duty-cycle')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'duty-cycle' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isFr ? 'Simulateur Batterie' : 'Battery Duty-Cycle'}
          </button>
          <button
            onClick={() => setActiveTab('binder')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'binder' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isFr ? 'Classeur Papier' : 'Print Binder'}</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Audit de Résilience Blackout */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="border border-slate-800 rounded-xl bg-slate-900/50 p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>{isFr ? 'Rapport d’Audit : Vulnérabilités & Solutions en Blackout Électrique' : 'Audit Report: Critical Blackout Vulnerabilities & Fixes'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isFr
                ? 'Une station de survie informatique qui dépend d’une alimentation 230V constante n’est pas résiliente. En cas de blackout généralisé, les batteries de secours doivent être gérées avec une discipline stricte :'
                : 'A survival server relying on constant 230V AC grid power is inherently fragile. During catastrophic grid down events, battery banks must be governed with military duty-cycle discipline:'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  {isFr ? '1. Le Piège de l’Allumage Continu' : '1. The Continuous Run Trap'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isFr
                    ? 'Laisser tourner Sentinel 24h/24 vide un ordinateur portable en 6 à 10 heures. Le système doit adopter un fonctionnement fractionné (Duty-Cycle) : éteint 95% du temps, allumé uniquement aux heures de coordination.'
                    : 'Running any PC 24/7 empties a laptop battery in 6 to 10 hours. The system must adopt an intermittent duty-cycle: cold powered off 95% of the time, booted only during scheduled communication windows.'}
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  {isFr ? '2. Le Piège des Pertes Onduleur 230V' : '2. The Inverter Conversion Waste'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isFr
                    ? 'Convertir du 12V batterie en 230V AC puis réutiliser un bloc d’alimentation pour revenir en 19V DC gaspille 20% à 30% d’énergie sous forme de chaleur. Il faut alimenter le PC directement en DC-DC 12V vers USB-C PD.'
                    : 'Converting 12V DC battery power to 230V AC inverter power then back down through a laptop brick wastes 20% to 30% energy as pure heat. Native 12V DC to USB-C PD buck/boost converters are required.'}
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {isFr ? '3. Récupération de Batteries de Voiture 12V' : '3. Scavenged 12V Automotive Batteries'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isFr
                    ? 'Une simple batterie de voiture 12V 60Ah au plomb (facile à récupérer sur un véhicule immobile) contient ~720 Wh d’énergie brute. Même limitée à 50% de décharge (360 Wh), elle assure 15 jours de fonctionnement Sentinel en mode fractionné.'
                    : 'A standard salvaged 12V 60Ah car battery contains ~720 Wh of raw energy. Even clamped to a conservative 50% depth of discharge (360 Wh usable), it delivers over 15 days of fractioned Sentinel duty cycles.'}
                </p>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {isFr ? '4. Sauvegarde Physique sur Papier' : '4. Physical Paper Backup (Binder)'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isFr
                    ? 'Aucun système électronique n’est éternel. Imprimez les fiches d’urgence (garrot, eau, radio, fréquences) avant la panne totale pour conserver un classeur étanche non-électronique.'
                    : 'No electronics outlast physical paper. Print vital procedures (tourniquet, water, radio frequencies) into a waterproof physical binder before all battery banks reach zero.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Battery Duty-Cycle Simulator */}
      {activeTab === 'duty-cycle' && (
        <div className="space-y-6">
          <div className="border border-slate-800 rounded-xl bg-slate-900/50 p-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  {isFr ? 'Simulateur d’Autonomie en Mode Fractionné (Duty-Cycle)' : 'Intermittent Duty-Cycle Battery Estimator'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isFr
                    ? 'Calculez la longévité de votre batterie en n’allumant le serveur que quelques minutes par jour.'
                    : 'Calculate battery endurance by scheduling minimal daily boot windows instead of 24/7 running.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  {isFr ? 'Capacité Batterie Utile (Wh) :' : 'Usable Battery Capacity (Wh):'}
                </label>
                <input
                  type="number"
                  min="50"
                  max="5000"
                  step="50"
                  value={batteryCapacityWh}
                  onChange={(e) => setBatteryCapacityWh(parseInt(e.target.value) || 100)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-amber-400 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  {isFr ? 'Ex: Laptop (60Wh), Power Station (500Wh)' : 'e.g. Laptop (60Wh), Battery station (500Wh)'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  {isFr ? 'Allumage Sentinel par Jour (Minutes) :' : 'Daily Active Boot Time (Minutes):'}
                </label>
                <input
                  type="number"
                  min="10"
                  max="1440"
                  step="10"
                  value={dutyCycleMinutesPerDay}
                  onChange={(e) => setDutyCycleMinutesPerDay(parseInt(e.target.value) || 20)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-amber-400 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  {isFr ? 'Recommandé : 20 min matin + 20 min soir' : 'Recommended: 20 min AM + 20 min PM'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  {isFr ? 'Recharge Solaire Nomade (Watts crête) :' : 'Folding Solar Panel (Peak Watts):'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="300"
                  step="10"
                  value={solarInputWatts}
                  onChange={(e) => setSolarInputWatts(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-amber-400 focus:outline-none"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  {isFr ? '0W = aucune recharge, 30W = panneau nomade' : '0W = zero solar, 30W = folding panel'}
                </span>
              </div>
            </div>

            {/* Comparison Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="p-4 bg-slate-950 border border-rose-900/40 rounded-xl space-y-1">
                <span className="text-xs font-mono text-rose-400 uppercase font-semibold">
                  {isFr ? 'Si allumé en Continu (24h/24) :' : 'If Running Continuously (24/7):'}
                </span>
                <div className="text-2xl font-bold font-mono text-rose-400">
                  {continuousHours} {isFr ? 'Heures' : 'Hours'}
                </div>
                <span className="text-[11px] text-slate-500 block">
                  {isFr ? 'Batterie complètement à plat en moins d’une journée' : 'Battery completely drained in under a single day'}
                </span>
              </div>

              <div className="p-4 bg-slate-950 border border-emerald-900/40 rounded-xl space-y-1">
                <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">
                  {isFr ? 'En Mode Fractionné Sentinel (Duty-Cycle) :' : 'With Sentinel Fractioned Duty-Cycle:'}
                </span>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {dutyCycleDays} {typeof dutyCycleDays === 'number' || !isNaN(Number(dutyCycleDays)) ? (isFr ? 'Jours d’autonomie' : 'Days of autonomy') : ''}
                </div>
                <span className="text-[11px] text-emerald-500/80 block">
                  {isFr ? 'Multiplication par 20 à 30 de la durée de survie opérationnelle' : '20x to 30x multiplier in operational operational duration'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Blackout Guides, Astuces & Interactive Timeline Checklist */}
      {activeTab === 'guides' && (
        <div className="space-y-6">
          {/* SECTION A: INTERACTIVE BLACKOUT ACTION TIMELINE (0-15 min / 1h-24h / 72h+) */}
          <div className="border border-amber-500/40 rounded-xl bg-neutral-950 p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-amber-400 uppercase font-mono flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {isFr
                      ? 'Chronologie d’Action Blackout (Check-list Interactive Sauvegardée)'
                      : 'Blackout Action Timeline (Saved Interactive Checklist)'}
                  </span>
                </h3>
                <p className="text-xs text-stone-300 mt-0.5">
                  {isFr
                    ? 'Cochez chaque action dès la coupure électrique : les 15 premières minutes déterminent votre autonomie en eau et la survie de vos appareils.'
                    : 'Check off each action as soon as power drops: the first 15 minutes dictate your water autonomy and electronics survival.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCheckedSteps({});
                  try {
                    localStorage.removeItem('sentinel_blackout_checklist_v1');
                  } catch {}
                }}
                className="px-3 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-[11px] font-mono text-stone-300 self-start sm:self-auto cursor-pointer"
              >
                {isFr ? 'Réinitialiser la check-list' : 'Reset checklist'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {[
                {
                  phase: isFr ? 'PHASE 1 : 0 À 15 MINUTES (URGENCE IMMÉDIATE)' : 'PHASE 1: 0 TO 15 MINUTES (IMMEDIATE)',
                  badgeColor: 'text-rose-400 border-rose-500/50 bg-rose-950/30',
                  items: [
                    {
                      id: 'p1-water',
                      text: isFr
                        ? 'Remplir immédiatement baignoire, éviers, seaux et bouteilles tant que les châteaux d’eau ont encore de la pression (12h à 24h max).'
                        : 'Immediately fill bathtubs, sinks, buckets, and bottles while municipal water towers still hold gravity pressure.'
                    },
                    {
                      id: 'p1-unplug',
                      text: isFr
                        ? 'Débrancher les appareils sensibles (PC, TV, box, pompe à chaleur, congélateur) contre le pic de surtension au retour d’EDF. Laisser 1 seule lampe allumée comme témoin.'
                        : 'Unplug sensitive electronics against grid-return voltage spikes. Leave 1 single light switch ON as a grid-return indicator.'
                    },
                    {
                      id: 'p1-gates',
                      text: isFr
                        ? 'Déverrouiller manuellement le portail électrique (clé triangulaire/allen) et entrouvrir les volets roulants électriques avant panne de batterie tampon.'
                        : 'Manually disengage electric gates and open electric shutters before backup batteries fail.'
                    },
                    {
                      id: 'p1-fridge',
                      text: isFr
                        ? 'Scotcher ou condamner l’ouverture du réfrigérateur (garde le froid 4h à 6h fermé) et du congélateur (garde 24h à 48h s’il reste fermé).'
                        : 'Tape or seal refrigerator (4-6h cold) and freezer doors (24-48h cold if unopened).'
                    }
                  ]
                },
                {
                  phase: isFr ? 'PHASE 2 : 1 HEURE À 24 HEURES (ORGANISATION)' : 'PHASE 2: 1 HOUR TO 24 HOURS',
                  badgeColor: 'text-amber-400 border-amber-500/50 bg-amber-950/30',
                  items: [
                    {
                      id: 'p2-room',
                      text: isFr
                        ? 'Créer une « Micro-Pièce Thermique » : regrouper tous les membres du foyer dans la plus petite pièce orientée Sud, fermer les autres pièces et calfeutrer les bas de porte.'
                        : 'Create a single "Micro-Thermal Room": gather everyone in the smallest south-facing room and seal door drafts.'
                    },
                    {
                      id: 'p2-ice',
                      text: isFr
                        ? 'Transférer 2 bouteilles congelées du congélateur vers le réfrigérateur pour prolonger les produits frais sans ouvrir le congélateur plus de 10 secondes.'
                        : 'Move 2 frozen water bottles from freezer to fridge in under 10 seconds to extend fresh food preservation.'
                    },
                    {
                      id: 'p2-radio',
                      text: isFr
                        ? 'Allumer la radio à piles / dynamo sur France Inter (FM ou grandes ondes) uniquement 5 minutes à chaque heure pile (hh:00) pour économiser les piles.'
                        : 'Tune battery/crank radio to national emergency broadcast for 5 minutes at the top of each hour (hh:00).'
                    },
                    {
                      id: 'p2-co',
                      text: isFr
                        ? 'Vérifier le détecteur de Monoxyde de Carbone (CO) : ne JAMAIS utiliser brasero, barbecue, groupe électrogène ou réchaud de fortune dans une pièce fermée.'
                        : 'Test Carbon Monoxide (CO) alarm: NEVER run charcoal, generators, or outdoor stoves indoors.'
                    }
                  ]
                },
                {
                  phase: isFr ? 'PHASE 3 : 24H À 72H ET + (ENDURANCE)' : 'PHASE 3: 24H TO 72H+ (ENDURANCE)',
                  badgeColor: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/30',
                  items: [
                    {
                      id: 'p3-cook',
                      text: isFr
                        ? 'Ordre de consommation : 1) Produits frais du frigo · 2) Viandes/poissons du congélateur en les cuisant à cœur (tiens 24h de plus cuit) · 3) Conserves et sec.'
                        : 'Consumption order: 1) Fridge perishables · 2) Thawing freezer meats cooked thoroughly · 3) Canned & dry rations.'
                    },
                    {
                      id: 'p3-cumulus',
                      text: isFr
                        ? 'Si l’eau du robinet est coupée : couper le disjoncteur du chauffe-eau (Cumulus) et purger ses 150 à 300 Litres d’eau potable par la vanne de vidange basse.'
                        : 'If tap water stops: shut off hot water tank breaker and drain its 150–300 L of clean water via bottom drain valve.'
                    },
                    {
                      id: 'p3-toilets',
                      text: isFr
                        ? 'Arrêt des pompes d’égout : passer aux toilettes sèches d’urgence (sac poubelle épais dans la cuvette + sciure/litière/marc de café sec) pour éviter tout refoulement.'
                        : 'Sewage pump failure: switch to emergency dry toilets (heavy liner bag in bowl + sawdust/cat litter) to prevent sewage backup.'
                    },
                    {
                      id: 'p3-duty',
                      text: isFr
                        ? 'Passer les téléphones et ce PC en Mode Avion + Luminosité minimale + Mode ECO OLED, avec allumage fractionné (20 min matin et soir).'
                        : 'Keep phones and this PC in Airplane Mode + minimum brightness + OLED ECO Mode on a 20m AM/PM schedule.'
                    }
                  ]
                }
              ].map((col, cIdx) => (
                <div key={cIdx} className="p-4 rounded-xl bg-black border border-neutral-800 space-y-3">
                  <div className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded border inline-block ${col.badgeColor}`}>
                    {col.phase}
                  </div>
                  <div className="space-y-2">
                    {col.items.map(item => {
                      const done = Boolean(checkedSteps[item.id]);
                      return (
                        <label
                          key={item.id}
                          onClick={() => toggleStep(item.id)}
                          className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                            done
                              ? 'bg-emerald-950/30 border-emerald-700/60 text-emerald-200 line-through opacity-80'
                              : 'bg-neutral-950 border-neutral-800 text-stone-200 hover:border-amber-500/50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={done}
                            onChange={() => {}}
                            className="mt-0.5 accent-amber-500 shrink-0"
                          />
                          <span className="leading-relaxed">{item.text}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION B: 10 DETAILED ASTUCES, INFORMATIONS & BONNES PRATIQUES BLACKOUT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1 */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Droplet className="w-4 h-4 shrink-0" />
                  <span>{isFr ? '1. Eau par Gravité & Les 200 L Cachés du Chauffe-Eau' : '1. Gravity Water & 200L Hidden in Your Water Heater'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 border border-sky-700 text-sky-300">
                  EAU VITALE
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isFr
                  ? 'Les châteaux d’eau se vident en 12 à 36h sans pompes électriques. ASTUCE MÉCONNUE : Votre ballon d’eau chaude (Cumulus) contient 150 à 300 Litres d’eau potable déjà stockée ! Coupez son disjoncteur, fermez l’arrivée d’eau générale (pour éviter que l’eau ne reparte dans le réseau public), ouvrez un robinet d’eau chaude en haut pour créer un appel d’air, et récupérez l’eau au groupe de sécurité en bas.'
                  : 'Municipal water towers run dry in 12–36h. PRO TIP: Your domestic hot water tank holds 150 to 300 Liters of clean potable water! Turn off its circuit breaker, shut the main street water valve, open an upstairs hot faucet to let air in, and drain clean water from the bottom valve.'}
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Flame className="w-4 h-4 shrink-0" />
                  <span>{isFr ? '2. Cuisson Passive « Marmite Norvégienne » (-70% de Gaz)' : '2. "Norwegian Wonderbox" Passive Cooking (-70% Fuel)'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-700 text-amber-300">
                  ÉCONOMIE GAZ
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isFr
                  ? 'En blackout, vos cartouches de gaz butane/propane sont précieuses. Ne laissez jamais bouillir vos pâtes, riz ou lentilles pendant 15 minutes sur le feu : portez à ébullition 2 minutes seulement avec couvercle, coupez le gaz, puis enfermez immédiatement la casserole brûlante dans une glacière ou un carton entouré d’une couette/coussins. Les aliments cuisent tout seuls à l’étouffée en 25 min avec 70% d’économie de gaz.'
                  : 'Never boil pasta, rice, or lentils for 15 minutes on camp gas. Bring to a boil for just 2 minutes with a lid on, turn off the stove, and place the hot pot inside an insulated cooler or cardboard box stuffed with blankets. Thermal inertia finishes cooking using 70% less fuel.'}
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Lightbulb className="w-4 h-4 shrink-0" />
                  <span>{isFr ? '3. Lampe Frontale sur Bidon d’Eau (Lanterne 360°) & Huile' : '3. Headlamp on Water Jug (360° Lantern) & Oil Lamp'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-700 text-amber-300">
                  ÉCLAIRAGE
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isFr
                  ? 'ASTUCE : Attachez une lampe frontale LED autour d’un bidon d’eau translucide de 5 L ou d’une bouteille d’eau en orientant la LED vers l’intérieur de l’eau : le bidon se transforme en lanterne diffuse à 360° qui éclaire toute la pièce même en mode Éco 10 lumens (100h d’autonomie). En secours : un bocal en verre + huile de cuisine végétale + mèche lacet 100% coton brûle 40h sans fumée toxique.'
                  : 'PRO TIP: Strap an LED headlamp facing INWARD against a translucent 5L water jug. The water refracts the beam into a soft 360° room lantern even on the 10-lumen eco setting (100h runtime). Backup: a glass jar with cooking oil and a 100% cotton shoelace wick burns 40h cleanly.'}
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-5 bg-slate-900/60 border border-rose-900/60 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{isFr ? '4. Chauffage d’Hiver : « Tente de Salon » & Danger Mortel CO' : '4. Winter Heating: "Indoor Tent" & Deadly CO Prevention'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 border border-rose-700 text-rose-300 font-bold">
                  VITAL · DANGER CO
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isFr
                  ? 'Le Monoxyde de Carbone (CO, gaz inodore et invisible) est la 1re cause de mort lors des blackouts hivernaux : N’UTILISEZ JAMAIS de barbecue, brasero, groupe électrogène ou pot en terre cuite sur bougies sans aération. BONNE PRATIQUE : Montez une tente de camping 2-3 places dans votre salon sur un tapis/matelas et jetez une couette par-dessus : la chaleur humaine seule maintient +18°C sous la tente même s’il fait +6°C dans l’appartement.'
                  : 'Carbon Monoxide (CO) is the #1 killer during winter blackouts: NEVER burn charcoal, BBQs, or generators indoors. BEST PRACTICE: Pitch a 2-person camping tent inside your living room on top of mattresses and drape a duvet over it: body heat alone keeps the tent interior at +18°C even in a freezing room.'}
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{isFr ? '5. Congélateur, « Astuce de la Pièce » & Pot Zeer' : '5. Freezer Management, "Coin on Ice" Trick & Zeer Pot'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300">
                  CONSERVATION
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isFr
                  ? 'Un congélateur plein garde les aliments congelés 48h s’il n’est pas ouvert (24h s’il est à moitié plein) : comblez les vides avec des bouteilles d’eau gelées et jetez des couvertures par-dessus le coffre (en dégageant la grille arrière). ASTUCE : Posez une pièce de monnaie sur un gobelet d’eau gelée au congélateur : si vous retrouvez la pièce au fond du verre après votre absence, tout a décongelé puis recongelé (danger d’intoxication).'
                  : 'A full unopened freezer holds temperature for 48h (24h if half-full). Drape blankets over the chest exterior (keeping rear coils clear). TRICK: Place a coin on top of a frozen cup of water in the freezer; if the coin has sunk to the bottom when power returns, food thawed completely and is unsafe.'}
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Droplet className="w-4 h-4 shrink-0" />
                  <span>{isFr ? '6. Toilettes Sèches d’Urgence (Système à 2 Seaux sans Chasse)' : '6. Emergency Dry Toilets (Two-Bucket System Without Flushing)'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-700 text-amber-300">
                  HYGIÈNE & ÉGOUTS
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isFr
                  ? 'En immeuble ou lotissement, les stations de relevage des eaux usées tombent en panne en quelques heures : verser des seaux d’eau dans les WC risque de faire refouler les égouts chez les voisins du rez-de-chaussée ! BONNE PRATIQUE : Relevez la lunette, tapissez la cuvette d’un sac poubelle épais 50L, rabattez la lunette. Après chaque passage, recouvrez d’une poignée de litière pour chat, sciure, terreau sec ou marc de café.'
                  : 'In apartments, electric sewage lift stations fail during blackouts: flushing with buckets can cause raw sewage to back up into ground-floor flats! BEST PRACTICE: Line the toilet bowl under the seat with a heavy-duty trash bag and cover waste with cat litter, sawdust, dry potting soil, or dry coffee grounds.'}
              </p>
            </div>

            {/* Card 7 */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Battery className="w-4 h-4 shrink-0" />
                  <span>{isFr ? '7. Récupération d’une Batterie 12V de Voiture & Seuils' : '7. Salvaging 12V Car Batteries & Voltage Thresholds'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300">
                  ÉNERGIE 12V DC
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isFr
                  ? 'Une batterie automobile 12V au plomb offre ~600 à 800 Wh : surveillez sa tension au multimètre (12.7V = 100%, 12.4V = 75%, 12.2V = 50% — NE JAMAIS descendre sous 11.9V sous peine de sulfatation irréversible et d’impossibilité de redémarrer le véhicule). Branchez-y directement un adaptateur allume-cigare USB-C PD 65W avec fusible 10A sans passer par un onduleur 230V.'
                  : 'A 12V car battery stores ~600-800 Wh: monitor voltage with a multimeter (12.7V = 100%, 12.2V = 50% — NEVER discharge below 11.9V or the car will not start). Use a fused 12V car socket to USB-C PD 65W adapter directly instead of a 230V inverter.'}
              </p>
            </div>

            {/* Card 8 */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <ZapOff className="w-4 h-4 shrink-0" />
                  <span>{isFr ? '8. Surtension de Retour EDF, Portails & Volets Roulants' : '8. Grid-Return Power Surges, Electric Gates & Shutters'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 border border-sky-700 text-sky-300">
                  DOMICILE & ACCÈS
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isFr
                  ? 'Lorsque le réseau électrique est rétabli après un blackout, une onde de surtension transitoire détruit fréquemment les cartes électroniques des chaudières, frigos et PC restés branchés. Abaissez les disjoncteurs divisionnaires sauf celui d’une lampe témoin, et attendez 10 minutes après le retour stable de la lumière avant de réenclencher vos appareils un par un.'
                  : 'When grid power returns after a blackout, transient voltage spikes often fry boiler boards, fridges, and PCs left plugged in. Flip circuit breakers OFF except for one indicator lamp, and wait 10 minutes after stable power returns before switching appliances back on one by one.'}
              </p>
            </div>

            {/* Card 9 */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Sun className="w-4 h-4 shrink-0" />
                  <span>{isFr ? '9. Médicaments au Frais (Insuline) sans Électricité' : '9. Keeping Vital Meds (Insulin) Cool Without Power'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 border border-rose-700 text-rose-300">
                  SANTÉ & FROID
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isFr
                  ? 'Ne congelez jamais l’insuline (elle perd toute efficacité). Hors frigo, un stylo d’insuline entamé se conserve jusqu’à 28 jours sous 25°C. S’il fait chaud : fabriquez un « Frigo du Désert » (Pot Zeer) avec deux pots en terre cuite non vernissés emboîtés, séparés par du sable constamment mouillé et couverts d’un linge humide : l’évaporation maintient l’intérieur autour de 14–16°C sans électricité.'
                  : 'Never freeze insulin. Unrefrigerated insulin pens last up to 28 days below 25°C. In hot weather, build a "Zeer Pot" evaporative cooler (two nested unglazed clay pots with wet sand in between and a damp cloth on top) to keep meds at 14–16°C with zero electricity.'}
              </p>
            </div>

            {/* Card 10 */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Radio className="w-4 h-4 shrink-0" />
                  <span>{isFr ? '10. Terminaux CB, Stations-Service & Argent Liquide' : '10. Card Terminals, Gas Stations & Small Cash Bills'}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700 text-emerald-300">
                  LOGISTIQUE
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isFr
                  ? 'Dès la première minute d’un blackout, 100% des distributeurs de billets (DAB), terminaux Carte Bancaire et pompes de stations-service (alimentées en 230V/400V) cessent de fonctionner. BONNES PRATIQUES : Ne laissez jamais le réservoir de votre véhicule descendre sous la moitié (50%), et conservez une enveloppe d’espèces en PETITES COUPURES (billets de 5€, 10€ et pièces de 1€/2€) car les commerçants ne pourront pas rendre la monnaie sur 50€.'
                  : 'Within 1 minute of a blackout, 100% of ATMs, credit card terminals, and electric gas station pumps stop working. BEST PRACTICES: Never let your vehicle fuel tank drop below half (50%), and keep an emergency cash reserve in SMALL BILLS (€5, €10, €1/€2 coins) since merchants cannot make change for €50 notes.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Physical Binder Printable Layout */}
      {activeTab === 'binder' && (
        <div className="border border-slate-800 rounded-xl bg-slate-900/50 p-6 space-y-4">
          <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <Printer className="w-4 h-4 text-amber-400" />
                <span>{isFr ? 'Classeur Physique de Secours (Impression Papier)' : 'Physical Emergency Binder (Paper Printout)'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {isFr
                  ? 'Imprimez ces fiches synthétiques maintenant pour votre classeur d’urgence étanche en cas d’extinction définitive des batteries.'
                  : 'Print these concise emergency procedures now for your offline bug-out binder before all batteries expire.'}
              </p>
            </div>

            <button
              onClick={handlePrintBinder}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isFr ? 'Lancer l’Impression' : 'Print Now'}</span>
            </button>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 font-mono space-y-2 leading-relaxed">
            <div className="text-amber-400 font-bold border-b border-slate-800 pb-1">
              [FICHE RÉSUMÉE N°1 : GESTES D’URGENCE VITALE & CHECK-LIST BLACKOUT SANS COURANT]
            </div>
            <div>• 0–15 MIN BLACKOUT : Remplir baignoire/bidons immédiatement · Débrancher appareils sensibles (laisser 1 lampe témoin) · Débrayer portail électrique.</div>
            <div>• EAU DU CHAUFFE-EAU (CUMULUS) : Couper disjoncteur cumulus + fermer vanne rue + ouvrir robinet chaud étage = 150 à 300 L d’eau potable au purgeur bas.</div>
            <div>• EAU SAUVAGE / BRUTE : Décantation 2h + Filtre sable/charbon + Ébullition franche 60s (ou 2 gouttes Javel 2,6% sans parfum par Litre, repos 30 min).</div>
            <div>• CUISSON MARMITE NORVÉGIENNE : Ébullition 2 min couvercle fermé puis isoler la casserole dans une glacière/couette = 70% d’économie de gaz.</div>
            <div>• CHAUFFAGE & DANGER CO : Monter une tente dans la plus petite pièce au Sud. JAMAIS de brasero/barbecue/groupe électrogène à l’intérieur (Monoxyde de carbone mortel).</div>
            <div>• TOILETTES SANS CHASSE : Ne pas tirer la chasse si arrêt des pompes d’égout. Sac poubelle épais dans la cuvette + sciure / litière / marc de café.</div>
            <div>• HÉMORRAGIE : Compression directe ou Garrot 5–7 cm au-dessus de la plaie. Tourner jusqu’à arrêt du saignement. Noter l’heure.</div>
            <div>• FRÉQUENCES RADIO : France Inter (FM / 162 kHz) à hh:00 · PMR446 Canal 8 (ou 7) · VHF Marine Canal 16 (156.800 MHz).</div>
            <div className="text-slate-500 pt-2 text-[10px]">
              Document généré par LE QG — Sentinel Pack Survie.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
