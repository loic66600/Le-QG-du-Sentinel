import { SurvivalArticle, RadioFrequency } from '../types/sentinel';

export const SURVIVAL_ARTICLES: SurvivalArticle[] = [
  {
    id: 'trauma-hemorrhage',
    category: 'medical',
    titleFr: 'Contrôle des Hémorragies Massives & Pose du Garrot (CAT)',
    titleEn: 'Massive Hemorrhage Control & Tourniquet Application (CAT)',
    criticalLevel: 'vital',
    summaryFr: 'Protocole immédiat MARCH-PAWS pour stopper une hémorragie artérielle en moins de 60 secondes.',
    summaryEn: 'Immediate MARCH-PAWS protocol to arrest arterial hemorrhage in under 60 seconds.',
    sources: ['TCCC Guidelines 2024', 'US Army FM 4-25.11 (First Aid)', 'WikiMed'],
    warningsFr: [
      'NE JAMAIS poser un garrot directement sur une articulation (coude ou genou).',
      'Noter immédiatement l’heure de pose au feutre indélébile sur le front ou le garrot.',
      'Ne JAMAIS desserrer un garrot sans supervision chirurgicale.'
    ],
    warningsEn: [
      'NEVER place a tourniquet directly over a joint (elbow or knee).',
      'Immediately write the application time with permanent marker on forehead or band.',
      'NEVER loosen or release a tourniquet without surgical supervision.'
    ],
    stepsFr: [
      'Sécurité de la zone : identifier la source du saignement pulsatile ou en jet.',
      'Pression directe immédiate avec les deux mains et le poids du corps.',
      'Placer le garrot tourniquet 5 à 7 cm au-dessus de la plaie (ou à la racine du membre en cas de doute).',
      'Tourner le cabestan (tige) jusqu’à l’arrêt complet du saignement et disparition du pouls distal.',
      'Verrouiller le cabestan dans le clip de sécurité en C.',
      'Appliquer un pansement hémostatique compressif secondaire dans la cavité si nécessaire.'
    ],
    stepsEn: [
      'Scene safety: identify source of arterial spurting or severe pooling blood.',
      'Immediate manual pressure using body weight directly over the wound.',
      'Place tourniquet 2-3 inches (5-7 cm) above the wound (high and tight if in doubt).',
      'Tighten windlass rod until bleeding stops completely and distal pulse is absent.',
      'Lock windlass into the C-shaped retaining clip.',
      'Pack wound cavity with hemostatic gauze and apply secondary pressure dressing.'
    ],
    contentFr: `En situation de crise isolée, l'hémorragie externe massive est la première cause de décès évitable. 
Selon le protocole TCCC (Tactical Combat Casualty Care), chaque seconde compte. 
Si aucun garrot commercial n'est disponible, confectionner un garrot de fortune avec une bande de tissu large (minimum 5 cm de largeur, jamais de fil de fer) et une branche solide comme cabestan.`,
    contentEn: `In isolated emergencies, massive external hemorrhage is the number one cause of preventable death. 
According to TCCC guidelines, seconds matter. 
If no commercial tourniquet is at hand, improvise using a pliable band at least 2 inches (5 cm) wide (never wire or thin cord) with a rigid stick as a windlass.`
  },
  {
    id: 'water-purification-field',
    category: 'water',
    titleFr: 'Purification et Potabilisation de l’Eau Sauvage',
    titleEn: 'Wilderness Water Purification & Disinfection',
    criticalLevel: 'vital',
    summaryFr: 'Méthodes physiques et chimiques d’élimination des pathogènes (bactéries, virus, protozoaires Giardia/Cryptosporidium).',
    summaryEn: 'Physical and chemical methods to neutralize pathogens (bacteria, viruses, Giardia/Cryptosporidium cysts).',
    sources: ['OMS Water Quality Guidelines', 'CDC Wilderness Water Treatment', 'US Army FM 21-76'],
    warningsFr: [
      'La filtration sur sable/charbon élimine la turbidité mais NE TUE PAS les virus et bactéries.',
      'Faire bouillir à gros bouillons pendant au moins 1 minute (3 minutes au-dessus de 2000m).',
      'Ne jamais utiliser de javel parfumée ou contenant des additifs industriels.'
    ],
    warningsEn: [
      'Sand/charcoal mechanical filtration removes turbidity but DOES NOT kill viruses.',
      'Bring water to a rolling boil for at least 1 minute (3 minutes above 2000m elevation).',
      'Never use scented bleach or household cleaners with toxic additives.'
    ],
    stepsFr: [
      'Décantation préalable : laisser reposer l’eau boueuse dans un récipient 2 à 4 heures.',
      'Filtration mécanique : passer l’eau décantée à travers un filtre multicouche (tissu, sable fin, charbon de bois concassé, gravier).',
      'Ébullition thermique : porter à ébullition vive (100°C) pendant 60 secondes complètes.',
      'Option chimique de secours : 2 à 4 gouttes d’eau de javel pure non parfumée (hypochlorite de sodium 2.6%) par litre d’eau claire. Laisser agir 30 minutes. Une légère odeur de chlore doit être perceptible.',
      'Désinfection solaire SODIS : exposer une bouteille PET transparente au soleil direct pendant 6 heures.'
    ],
    stepsEn: [
      'Sediment settling: allow murky water to settle undisturbed for 2-4 hours.',
      'Mechanical pre-filtering: pass water through layered cotton cloth, fine sand, crushed charcoal, and gravel.',
      'Thermal boiling: sustain a full rolling boil (100°C) for 60 full seconds.',
      'Chemical backup option: 2 to 4 drops of unscented household bleach (2.6% sodium hypochlorite) per liter of clear water. Wait 30 minutes. A faint chlorine scent must be detectable.',
      'Solar SODIS method: expose clear PET bottles to direct sunlight for 6 full hours.'
    ],
    contentFr: `L'eau est la priorité absolue après l'air : la règle des 3 stipule un maximum de 3 jours sans eau.
L'eau de ruissellement et de surface contient fréquemment des kystes de Giardia lamblia et Cryptosporidium résistants au chlore faible. La combinaison pré-filtration + ébullition reste la règle d'or infaillible.`,
    contentEn: `Water is the highest physiological priority after shelter: the rule of threes dictates 3 days maximum without hydration.
Surface runoff frequently harbors Giardia lamblia and Cryptosporidium cysts. The combination of multi-stage pre-filtration plus rolling boil remains the absolute gold standard.`
  },
  {
    id: 'hypothermia-shelter',
    category: 'shelter',
    titleFr: 'Hypothermie Sévère & Isolation Thermique d’Urgence',
    titleEn: 'Severe Hypothermia & Emergency Thermal Insulation',
    criticalLevel: 'vital',
    summaryFr: 'Gestion de la perte de chaleur corporelle par conduction, convection, radiation et évaporation.',
    summaryEn: 'Managing core body heat loss via conduction, convection, radiation, and evaporation.',
    sources: ['Red Cross Wilderness First Aid', 'FM 21-76 Survival Manual'],
    warningsFr: [
      'Ne JAMAIS masser vigoureusement les membres d’un patient en hypothermie profonde (risque de fibrillation ventriculaire par retour sanguin glacé).',
      'Isoler en priorité le corps du SOL (le sol absorbe la chaleur 20 fois plus vite que l’air par conduction).'
    ],
    warningsEn: [
      'NEVER vigorously rub or massage extremities of a hypothermic patient (risk of ventricular fibrillation).',
      'Insulate body from the GROUND first (ground conducts heat away 20x faster than air).'
    ],
    stepsFr: [
      'Isoler du sol avec 20 à 30 cm de feuilles sèches, branches d’épicéa ou sacs à dos.',
      'Retirer immédiatement les vêtements humides et sécher le derme.',
      'Envelopper le tronc dans une couverture de survie (face dorée vers l’extérieur pour réfléchir la chaleur interne vers le corps).',
      'Ajouter des couches isolantes autour de la couverture (poncho, duvet, feuillage dense).',
      'Appliquer des sources de chaleur douce (bouteille tiède enveloppée) sur les aisselles, l’aine et le cou.',
      'Si conscient : boisson chaude sucrée par petites gorgées (pas d’alcool, pas de caféine).'
    ],
    stepsEn: [
      'Insulate from ground with 8-12 inches (20-30 cm) of dry leaves, pine boughs, or packs.',
      'Immediately strip damp clothing and pat skin dry.',
      'Wrap torso in a space blanket (gold face outwards to reflect internal infrared back).',
      'Add dead-air insulation layers around the reflective barrier (sleeping bag, poncho, foliage).',
      'Apply gentle external heat packs (warm water bottles wrapped in cloth) to axillae, groin, and neck.',
      'If conscious: administer warm sweetened liquids in small sips (zero alcohol, zero caffeine).'
    ],
    contentFr: `L'hypothermie survient souvent entre 0°C et 10°C, aggravée par le vent (effet Windchill) et l'humidité.
Les 4 mécanismes de déperdition calorique : Conduction (sol froid), Convection (vent), Radiation (infrarouge corporel émis), Évaporation (sueur et vêtements mouillés).`,
    contentEn: `Hypothermia frequently occurs between 0°C and 10°C, exacerbated by windchill and moisture.
The 4 heat loss vectors: Conduction (contact with cold earth), Convection (wind stripping boundary layer), Radiation (emitted thermal IR), Evaporation (wet gear and sweat).`
  },
  {
    id: 'universal-edibility-test',
    category: 'food',
    titleFr: 'Test Universel de Comestibilité des Végétaux Inconnus',
    titleEn: 'Universal Edibility Test for Wilderness Plants',
    criticalLevel: 'high',
    summaryFr: 'Protocole rigoureux de 24h pour tester une plante inconnue en cas de famine sans guide botanique.',
    summaryEn: 'Rigorous 24-hour protocol to test unknown wild vegetation during starvation.',
    sources: ['US Army FM 21-76 Survival Manual', 'SAS Survival Handbook'],
    warningsFr: [
      'Éviter TOUS les champignons sauvages (trop de toxines mortelles foudroyantes sans antidotes).',
      'Éviter les plantes à sève laiteuse, à odeur d’amande amère (cyanure), ou à feuilles en ombelles blanches.',
      'Ne tester qu’une seule partie de la plante à la fois (feuille, racine OU tige).'
    ],
    warningsEn: [
      'Avoid ALL wild mushrooms (deadly amatoxins with zero field antidote).',
      'Avoid plants with milky or discolored sap, bitter almond scent (cyanide), or umbrella-shaped flower clusters.',
      'Test only ONE single plant part at a time (leaf, stem OR root).'
    ],
    stepsFr: [
      'Jeûner complètement pendant 8 heures avant le début du test.',
      'Inspection olfactive et tactile : frotter la plante sur l’intérieur du coude ou poignet. Attendre 15 min.',
      'Contact labial : toucher la partie externe des lèvres avec la plante pendant 3 minutes. Attendre 8 heures.',
      'Contact buccal : placer un petit morceau sur la langue sans mâcher ni avaler pendant 15 minutes.',
      'Mastication sans ingestion : mâcher le morceau pendant 15 minutes sans avaler la salive. Recracher.',
      'Ingestion minimale : avaler une cuillère à café. Attendre 8 heures complètes.',
      'Si aucune nausée, crampe ou vertige n’apparaît, la partie testée est consommable en ration d’urgence.'
    ],
    stepsEn: [
      'Fast completely for 8 hours prior to beginning the test.',
      'Skin contact test: crush plant part and rub onto inner elbow/wrist. Wait 15 minutes.',
      'Lip touch: hold raw plant part against outer lip for 3 minutes. Wait 8 hours.',
      'Tongue tip: place tiny fragment on tongue without chewing for 15 minutes.',
      'Mastication: chew piece for 15 minutes without swallowing saliva. Spit out. Wait 8 hours.',
      'Swallow micro-portion: ingest one teaspoon with clean water. Wait 8 full hours.',
      'If zero nausea, cramping, or irritation occurs, this specific plant part is deemed edible in moderation.'
    ],
    contentFr: `En situation de survie prolongée, la règle des 3 semaines sans nourriture s'applique.
Consommer une plante toxique entraîne vomissements et diarrhées qui accélèrent mortellement la déshydratation. La prudence absolue prime sur la faim.`,
    contentEn: `In prolonged emergencies, the rule of 3 weeks without caloric intake applies.
Consuming a poisonous plant provokes vomiting and diarrhea which drastically accelerates fatal dehydration. Caution always overrides hunger.`
  },
  {
    id: 'emergency-radio-comms',
    category: 'comms',
    titleFr: 'Radio de Secours, Fréquences de Détresse & Protocole Mayday',
    titleEn: 'Emergency Radio Comms, Distress Nets & Mayday Protocol',
    criticalLevel: 'vital',
    summaryFr: 'Fréquences d’appel d’urgence (PMR446, VHF marine 16, VHF 145.500 MHz) et format de transmission.',
    summaryEn: 'Emergency calling frequencies (PMR446, Marine VHF 16, Ham 145.500 MHz) and transmission format.',
    sources: ['ITU Radio Regulations', 'FNRASEC Protocoles Urgence', 'IARU Region 1 Emergency Comm'],
    warningsFr: [
      'L’usage des fréquences radioamateurs et marines sans licence est STRICTEMENT réservé aux situations de péril mortel imminent.',
      'Économiser la batterie : émettre par transmissions courtes (maximum 20 secondes) à faible puissance (1W à 5W).'
    ],
    warningsEn: [
      'Transmitting on marine/aviation/amateur frequencies without license is STRICTLY restricted to imminent life peril.',
      'Preserve battery: keep transmissions under 20 seconds at lowest required power (1W-5W).'
    ],
    stepsFr: [
      'Canal 7-7 PMR446 (Canal 7, Sous-canal CTCSS 7 = 85.4 Hz) : canal d’urgence des randonneurs et secouristes civils.',
      'Canal 16 VHF Marine (156.800 MHz) : détresse maritime et côtière internationale.',
      'VHF Radioamateur 145.500 MHz (FM) : fréquence d’appel européen.',
      'Format MAYDAY : répéter MAYDAY trois fois, indiquer le NOM DE LA STATION, la POSITION (GPS ou repères géographiques), la NATURE DE LA DÉTRESSE, et le NOMBRE DE PERSONNES.',
      'Écoute radio permanente à la minute 00 à 03 et 30 à 33 de chaque heure (silence radio réglementaire).'
    ],
    stepsEn: [
      'Channel 7-7 PMR446 (Channel 7, CTCSS Sub-tone 7 = 85.4 Hz): civil wilderness & hiker emergency channel.',
      'Channel 16 Marine VHF (156.800 MHz): global maritime distress and calling.',
      'Ham VHF 145.500 MHz (FM): European amateur VHF calling frequency (146.520 MHz in US).',
      'MAYDAY transmission standard: state MAYDAY x3, STATION IDENTIFIER, EXACT COORDINATES/LOCATION, NATURE OF DISTRESS, SOULS ON BOARD.',
      'Observe standard 3-minute listening silence intervals at hh:00-hh:03 and hh:30-hh:33.'
    ],
    contentFr: `Lors d'un effondrement des réseaux cellulaires (antennes 4G/5G coupées après 2 à 4h de batterie), la radio VHF/UHF directe point-à-point reste le seul moyen de transmission sans infrastructure.
Une antenne élevée (sur une colline ou un arbre) décuple la portée utile de 2 km à plus de 25 km.`,
    contentEn: `During telecommunications blackouts (cellular towers drain battery backups within 2 to 4 hours), direct simplex VHF/UHF remains the sole infrastructure-free link.
Elevating your antenna (ridgeline or tree) multiplies operational line-of-sight range from 2 km to over 25 km.`
  },
  {
    id: 'offgrid-solar-12v',
    category: 'energy',
    titleFr: 'Système Solaire Autonome 12V & Gestion des Batteries',
    titleEn: 'Off-Grid 12V Solar System & Battery Storage Management',
    criticalLevel: 'medium',
    summaryFr: 'Dimensionnement d’un pack énergétique nomade pour alimenter le serveur Sentinel, les radios et l’éclairage.',
    summaryEn: 'Sizing an off-grid battery pack to power the Sentinel server, radio gear, and lighting.',
    sources: ['Victron Off-Grid Energy Guide', 'Home Power Engineering'],
    warningsFr: [
      'Ne JAMAIS décharger une batterie plomb/AGM en dessous de 50% (12.0V) sous peine de destruction irréversible.',
      'Les batteries LiFePO4 tolèrent une décharge à 90% (jusqu’à 10.5V) mais NE DOIVENT PAS être chargées sous 0°C sans réchauffeur.'
    ],
    warningsEn: [
      'NEVER discharge lead-acid/AGM batteries below 50% DoD (12.0V) without causing irreversible degradation.',
      'LiFePO4 lithium batteries tolerate 90% DoD (down to 10.5V) but MUST NOT be charged below 0°C without heating pads.'
    ],
    stepsFr: [
      'Bilan de puissance journalier : calculer les Watts consommés (ex: Sentinel mini-PC 15W x 10h = 150Wh/jour).',
      'Dimensionner le panneau solaire : 150Wh / 3.5 heures d’ensoleillement moyen = panneau minimum de 50W (100W recommandé pour marge hivernale).',
      'Régulateur de charge MPPT : obligatoire pour convertir efficacement la tension du panneau (18-24V) en tension de charge batterie 14.4V.',
      'Câblage sécurisé : fusible adapté placé à moins de 15 cm de la borne positive de la batterie.',
      'Privilégier les alimentations directes DC-DC 12V vers 19V/5V plutôt que des onduleurs 230V qui gaspillent 15-25% en chaleur.'
    ],
    stepsEn: [
      'Daily energy audit: calculate total Watt-hours (e.g. Sentinel mini-PC 15W x 10h = 150Wh/day).',
      'Solar array sizing: 150Wh / 3.5 peak sun hours = minimum 50W panel (100W recommended for winter buffer).',
      'MPPT charge controller: essential to optimize panel voltage down to 14.4V battery absorption rate.',
      'Safety fusing: install appropriate DC fuse within 6 inches (15 cm) of positive battery terminal.',
      'Prefer native DC-DC buck/boost converters (12V to 19V or 5V USB-C) rather than inverters that shed 15-25% as waste heat.'
    ],
    contentFr: `Un ordinateur portable moderne consomme environ 15W à 30W en charge normale avec Sentinel.
Une batterie LiFePO4 12V 100Ah (1280Wh) offre plus de 72 heures d'autonomie continue sans le moindre rayon de soleil.`,
    contentEn: `A modern laptop draws approximately 15W to 30W running the Sentinel offline stack.
A standard 12V 100Ah LiFePO4 battery (1280Wh) guarantees over 72 hours of continuous server operation through overcast conditions.`
  },
  {
    id: 'cbrn-nuclear-hazards',
    category: 'tactical',
    titleFr: 'Risque Radiologique, Nucléaire & Retombées (NRBC / CBRN)',
    titleEn: 'Radiological, Nuclear Fallout & CBRN Protocols',
    criticalLevel: 'vital',
    summaryFr: 'Mesures d’urgence face aux retombées radioactives : Temps, Distance, Blindage et décontamination immédiate.',
    summaryEn: 'Emergency response to radioactive fallout: Time, Distance, Shielding, and immediate field decontamination.',
    sources: ['FEMA Planning Guidance for Nuclear Detonation', 'US Army FM 3-11 (CBRN Operations)', 'Sécurité Civile'],
    warningsFr: [
      'Rester confiné pendant au minimum 24 à 72 heures (le rayonnement diminue d’un facteur 100 après 48h selon la règle 7/10).',
      'Ne JAMAIS consommer d’eau ou d’aliments exposés à l’air libre après le passage du nuage.',
      'Ne pas utiliser d’après-shampoing ou de crèmes grasses qui fixent les particules radioactives sur la peau.'
    ],
    warningsEn: [
      'Remain sheltered for at least 24 to 72 hours (fallout radiation drops 100-fold after 48h via the 7/10 rule).',
      'NEVER consume open water or unsealed food exposed to fallout.',
      'Do not apply hair conditioner or oily lotions that bind radioactive isotopes to the dermis.'
    ],
    stepsFr: [
      'Recherche immédiate d’un abri lourd : sous-sol en béton armé, cave souterraine ou centre d’un bâtiment massif (facteur de protection > 20).',
      'Scellement des aérations : éteindre climatisation et VMC, calfeutrer les interstices avec du ruban adhésif épais (duct tape) et du plastique.',
      'Décontamination en entrant : retirer délicatement les vêtements extérieurs (élimine 90% des poussières radioactives), les sceller dans un sac poubelle à l’extérieur.',
      'Douche d’urgence : laver à l’eau tiède et au savon doux sans frotter agressivement pour ne pas irriter la peau.',
      'Prise d’iodure de potassium (KI) : UNIQUEMENT sur instruction explicite des autorités sanitaires (protège la thyroïde de l’iode-131, ne protège d’aucun autre rayonnement).'
    ],
    stepsEn: [
      'Seek heavy shielding immediately: reinforced concrete basement, subway tunnel, or center core of brick building (protection factor > 20).',
      'Seal ventilation: shut down HVAC systems, seal doors and windows with heavy plastic sheeting and duct tape.',
      'Entry decontamination: carefully strip outer clothing layer (removes up to 90% of radioactive particulate), bag and seal outside.',
      'Emergency rinse: wash thoroughly with mild soap and warm water without scrubbing abrasively to avoid skin abrasion.',
      'Potassium Iodide (KI): take ONLY if officially instructed (saturates thyroid against Iodine-131; offers zero protection against external gamma rays).'
    ],
    contentFr: `La règle des 7/10 de la physique nucléaire : pour chaque multiplication du temps par 7 après l'explosion, l'intensité du rayonnement diminue par 10.
Exemple : à H+7h, le rayonnement a chuté de 90%. À H+49h (environ 2 jours), le rayonnement n'est plus que de 1% de sa valeur initiale.`,
    contentEn: `The 7/10 nuclear physics rule: for every 7-fold increase in time elapsed after detonation, radiation intensity drops by a factor of 10.
Example: at H+7h, radiation decays by 90%. At H+49h (~2 days), radiation drops to 1% of its initial lethal level.`
  },
  {
    id: 'firecraft-emergency',
    category: 'shelter',
    titleFr: 'Allumage du Feu d’Urgence par Temps Humide & Réflecteur',
    titleEn: 'Emergency Firecraft in Wet Conditions & Heat Reflectors',
    criticalLevel: 'high',
    summaryFr: 'Techniques infaillibles au ferrocérium, amadou résineux (fatwood) et construction d’un mur réflecteur thermique.',
    summaryEn: 'Fail-safe fire-steel techniques, resinous fatwood tinder, and constructing a thermal heat reflector wall.',
    sources: ['US Army FM 21-76 Survival Manual', 'Mors Kochanski Bushcraft Guides'],
    warningsFr: [
      'Ne jamais utiliser de pierres mouillées ou poreuses issues d’un lit de rivière (risque d’explosion violente sous la chaleur de la vapeur).',
      'Préparer TOUT le combustible (amadou, brindilles, branchages, bûches) AVANT de craquer la première étincelle.'
    ],
    warningsEn: [
      'Never build a fire ring with wet or porous river stones (water trapped inside can explode like shrapnel).',
      'Gather ALL fuel stages (tinder nest, pencil-lead kindling, thumb-thick fuel, logs) BEFORE throwing the first spark.'
    ],
    stepsFr: [
      'Isoler le foyer du sol mouillé en construisant une plateforme de bûchettes fendues.',
      'Récolter du bois gras (fatwood - cœur de pin saturé de résine) ou gratter de l’écorce de bouleau en lamelles fines.',
      'Façonner un nid d’amadou très aéré (herbes sèches, coton paraffiné, peluches de séchoir).',
      'Tenir la tige de ferrocérium au plus près du nid, tirer fermement la tige vers l’arrière (sans pousser le grattoir en avant) pour propulser les étincelles à 3000°C directement sur l’amadou.',
      'Dès la braise née, souffler doucement d’un flux d’air régulier jusqu’à la flamme vive, puis ajouter immédiatement les brindilles.',
      'Construire un mur réflecteur en rondins empilés à 1 mètre du feu face à votre abri pour renvoyer la chaleur radiante vers votre corps.'
    ],
    stepsEn: [
      'Build a dry timber raft platform to separate your fire base from damp frozen earth.',
      'Harvest fatwood (resin-saturated pine heartwood) or scrape fine paper-thin birch bark curls.',
      'Form an aerated tinder bundle (dry grass, waxed cotton ball, dried thistle down).',
      'Place ferrocerium rod directly into tinder, pull rod back firmly against striker to direct 3000°C sparks into core.',
      'Blow with gentle steady breath once ember catches until flames erupt, then immediately feed pencil-thin twigs.',
      'Erect a stacked log reflector wall 3 feet (1m) behind the fire facing your shelter to reflect radiant heat into your bed.'
    ],
    contentFr: `Le feu remplit 5 fonctions vitales : réchauffement contre l'hypothermie, ébullition de l'eau, cuisson des aliments, signalisation de détresse (fumée noire avec caoutchouc ou blanche avec feuilles vertes) et protection psychologique.`,
    contentEn: `Fire serves 5 critical survival pillars: core hypothermia prevention, water purification, caloric cooking, distress signaling (white smoke with green pine boughs, black smoke with rubber), and moral fortitude.`
  },
  {
    id: 'bug-out-bag-72h',
    category: 'tactical',
    titleFr: 'Sac d’Évacuation 72H (Bug Out Bag) & Matériel Fondamental',
    titleEn: '72-Hour Bug Out Bag (BOB) & Essential Evacuation Gear',
    criticalLevel: 'high',
    summaryFr: 'Checklist optimale pour l’autonomie complète lors d’un départ d’urgence immédiat (poids cible < 20% du poids de corps).',
    summaryEn: 'Optimal gear checklist for total self-sufficiency during immediate displacement (target weight < 20% body weight).',
    sources: ['FEMA Emergency Supply List', 'Civilian Defense Preparedness SOP'],
    warningsFr: [
      'Le poids du sac ne doit jamais dépasser 15 à 18 kg pour un adulte en bonne condition physique sous peine d’épuisement rapide.',
      'Privilégier les équipements polyvalents (1 outil = 3 fonctions) plutôt que des gadgets spécialisés fragiles.'
    ],
    warningsEn: [
      'Total pack weight must never exceed 15-18 kg (33-40 lbs) for an adult to prevent musculoskeletal exhaustion.',
      'Prioritize versatile multi-function tools over fragile single-purpose gadgets.'
    ],
    stepsFr: [
      'Hydratation : 2L d’eau en gourde inox mono-paroi (permet de bouillir) + filtre Sawyer Squeeze + pastilles Micropur Forte.',
      'Alimentation : 3 rations NRG-5 ou barres hypercaloriques (3600 kcal minimum) ne nécessitant aucune cuisson.',
      'Secourisme (IFAK) : Garrot CAT gen 7, pansement compressif israélien, gaze hémostatique, ciseaux Jesco, gants nitrile.',
      'Abri & Chaleur : Tarp étanche ripstop 3x3m, couverture de survie épaisse réutilisable, sac de couchage compact, bonnet chaud.',
      'Outils & Feu : Couteau fixe robuste (ex: Mora Garberg / Fallkniven F1), tige de ferrocérium XXL, briquet Bic, duct tape.',
      'Énergie & Comms : Radio PMR446 / VHF, lampe frontale avec mode lumière rouge, panneau solaire 15W pliable, powerbank étanche.',
      'Documents : Clé USB chiffrée avec copies de pièces d’identité, carte papier IGN locale au 1:25000, 200€ en petites coupures.'
    ],
    stepsEn: [
      'Hydration: 2L water in single-wall stainless steel bottle (can boil directly) + Sawyer Squeeze filter + purification tablets.',
      'Nutrition: 3 days of high-calorie survival biscuits (NRG-5 / Millennium bars, 3600 kcal minimum) requiring zero cooking.',
      'Trauma First Aid (IFAK): CAT Tourniquet Gen 7, 6-inch Israeli pressure bandage, hemostatic gauze, trauma shears, gloves.',
      'Shelter & Heat: 10x10ft ripstop tarp, heavy-duty reusable emergency blanket, compact sleeping bag, wool beanie.',
      'Tools & Firecraft: Full-tang fixed blade knife, oversized ferrocerium rod, Bic lighter, mini roll of duct tape, 550 paracord.',
      'Energy & Comms: Handheld PMR446 / dual-band radio, red/white headlamp, 15W folding solar panel, rugged battery bank.',
      'Documents & Currency: Encrypted USB with ID copies/medical records, laminated 1:25k topo map, cash in small denominations.'
    ],
    contentFr: `Le Bug Out Bag n'est pas conçu pour vivre en forêt indéfiniment, mais pour vous permettre de rallier un point de chute sécurisé (famille, base autonome, refuge) en traversant 72 heures de chaos sans assistance extérieure.`,
    contentEn: `The 72-Hour Bug Out Bag is not designed for permanent wilderness living, but to bridge the critical 72-hour window required to reach a predetermined safe haven through degraded infrastructure.`
  }
];

export interface BugOutItem {
  id: string;
  categoryFr: string;
  categoryEn: string;
  nameFr: string;
  nameEn: string;
  weightGrams: number;
  essential: boolean;
}

export const BUG_OUT_BAG_ITEMS: BugOutItem[] = [
  { id: 'b1', categoryFr: 'Hydratation', categoryEn: 'Hydration', nameFr: 'Gourde Inox 1L mono-paroi (ébullition directe)', nameEn: '1L Single-wall stainless steel bottle', weightGrams: 220, essential: true },
  { id: 'b2', categoryFr: 'Hydratation', categoryEn: 'Hydration', nameFr: 'Filtre à eau Sawyer Squeeze (0.1 micron)', nameEn: 'Sawyer Squeeze water filter (0.1 micron)', weightGrams: 85, essential: true },
  { id: 'b3', categoryFr: 'Hydratation', categoryEn: 'Hydration', nameFr: '50 pastilles de chlore / Micropur Forte', nameEn: '50 chlorine / Micropur water purification tabs', weightGrams: 20, essential: true },
  { id: 'b4', categoryFr: 'Secourisme (IFAK)', categoryEn: 'Medical (IFAK)', nameFr: 'Garrot tourniquet CAT Gen 7 homologué', nameEn: 'CAT Gen 7 combat tourniquet', weightGrams: 80, essential: true },
  { id: 'b5', categoryFr: 'Secourisme (IFAK)', categoryEn: 'Medical (IFAK)', nameFr: 'Pansement compressif d’urgence 6" (Israélien)', nameEn: '6" Israeli emergency pressure bandage', weightGrams: 90, essential: true },
  { id: 'b6', categoryFr: 'Secourisme (IFAK)', categoryEn: 'Medical (IFAK)', nameFr: 'Gaze hémostatique QuikClot / Celox', nameEn: 'QuikClot / Celox hemostatic z-fold gauze', weightGrams: 40, essential: true },
  { id: 'b7', categoryFr: 'Abri & Chaleur', categoryEn: 'Shelter & Heat', nameFr: 'Bâche tarp imperméable 3x3m avec haubans', nameEn: '10x10ft waterproof ripstop tarp with guy lines', weightGrams: 450, essential: true },
  { id: 'b8', categoryFr: 'Abri & Chaleur', categoryEn: 'Shelter & Heat', nameFr: 'Couverture de survie épaisse réutilisable', nameEn: 'Heavy-duty reusable thermal survival blanket', weightGrams: 160, essential: true },
  { id: 'b9', categoryFr: 'Outils & Feu', categoryEn: 'Tools & Fire', nameFr: 'Couteau fixe pleine soie (ex: Mora Garberg)', nameEn: 'Full-tang carbon fixed blade knife', weightGrams: 240, essential: true },
  { id: 'b10', categoryFr: 'Outils & Feu', categoryEn: 'Tools & Fire', nameFr: 'Tige de ferrocérium XXL 12mm + grattoir', nameEn: '1/2 inch ferrocerium fire-steel rod', weightGrams: 100, essential: true },
  { id: 'b11', categoryFr: 'Outils & Feu', categoryEn: 'Tools & Fire', nameFr: '15m de cordelette Paracord 550 type III', nameEn: '50ft genuine 550 type III paracord', weightGrams: 110, essential: true },
  { id: 'b12', categoryFr: 'Énergie & Radio', categoryEn: 'Power & Radio', nameFr: 'Radio bi-bande VHF/UHF (PMR446 / Fréquences SOS)', nameEn: 'Dual-band handheld VHF/UHF radio', weightGrams: 250, essential: true },
  { id: 'b13', categoryFr: 'Énergie & Radio', categoryEn: 'Power & Radio', nameFr: 'Lampe frontale étanche avec mode rouge (18650)', nameEn: 'Rugged headlamp with red night-vision LED', weightGrams: 120, essential: true },
  { id: 'b14', categoryFr: 'Nutrition', categoryEn: 'Nutrition', nameFr: 'Ration de survie compacte 72h (3600 kcal)', nameEn: '72-hour compact survival ration (3600 kcal)', weightGrams: 750, essential: true }
];

export const RADIO_FREQUENCIES: RadioFrequency[] = [

  {
    id: 'pmr-77',
    name: 'PMR446 Canal 7-7',
    frequency: '446.08125 MHz',
    band: 'PMR446',
    channel: 'Canal 7 (CTCSS 7 / 85.4 Hz)',
    modulation: 'FM',
    priority: 'emergency',
    usageFr: 'Canal d’urgence radio randonnée et secours en montagne en Europe.',
    usageEn: 'Civilian mountain safety and emergency communication channel across Europe.',
    protocolFr: 'Écoute permanente. Veille radio à l’heure pile (hh:00) pendant 5 minutes.',
    protocolEn: 'Continuous monitoring. 5-minute listening watch at the top of every hour (hh:00).'
  },
  {
    id: 'pmr-88',
    name: 'PMR446 Canal 8-8',
    frequency: '446.09375 MHz',
    band: 'PMR446',
    channel: 'Canal 8 (CTCSS 8 / 88.5 Hz)',
    modulation: 'FM',
    priority: 'calling',
    usageFr: 'Canal d’appel général et coordination de convoi nomade.',
    usageEn: 'General calling channel and overland convoy coordination.',
    protocolFr: 'Établir le contact puis dégager vers un canal de travail (1 à 6).',
    protocolEn: 'Establish contact then QSY to a designated working channel (1-6).'
  },
  {
    id: 'vhf-marine-16',
    name: 'VHF Marine Canal 16',
    frequency: '156.800 MHz',
    band: 'VHF',
    channel: 'Canal 16',
    modulation: 'FM',
    priority: 'emergency',
    usageFr: 'Détresse, urgence et sécurité maritime internationale (CROSS / Coast Guard).',
    usageEn: 'International maritime distress, safety, and calling channel.',
    protocolFr: 'Appel MAYDAY, PAN PAN ou SECURITE. Silence radio strict pendant les périodes de détresse.',
    protocolEn: 'Strict MAYDAY / PAN PAN / SECURITE protocol. Radio silence during active rescue.'
  },
  {
    id: 'ham-vhf-calling',
    name: 'VHF Radioamateur Appel',
    frequency: '145.500 MHz',
    band: 'VHF',
    channel: 'V40 (FM)',
    modulation: 'FM',
    priority: 'calling',
    usageFr: 'Fréquence d’appel général radioamateur 2 mètres (Europe / IARU Région 1).',
    usageEn: 'European 2m amateur radio FM calling frequency (146.520 MHz in US).',
    protocolFr: 'Appel court, puis bascule vers 145.525 MHz ou fréquence simplex disponible.',
    protocolEn: 'Brief contact call, then migrate to an open simplex frequency.'
  },
  {
    id: 'ham-uhf-calling',
    name: 'UHF Radioamateur Appel',
    frequency: '433.500 MHz',
    band: 'UHF',
    channel: 'U280 (FM)',
    modulation: 'FM',
    priority: 'calling',
    usageFr: 'Fréquence d’appel 70cm radioamateur (pénétration urbaine et forestière).',
    usageEn: '70cm amateur FM calling frequency (superior building and dense forest penetration).',
    protocolFr: 'Simplex direct ou veille de relais d’urgence.',
    protocolEn: 'Direct simplex or emergency repeater monitor.'
  },
  {
    id: 'cb-canal-9',
    name: 'CB Canal 9 Urgence',
    frequency: '27.065 MHz',
    band: 'CB 27MHz',
    channel: 'Canal 9',
    modulation: 'AM',
    priority: 'emergency',
    usageFr: 'Canal historique d’urgence des cibistes et automobilistes.',
    usageEn: 'Historical emergency and roadside assistance channel on 11 meters.',
    protocolFr: 'À réserver aux SOS d’accident routier ou de convoi isolé.',
    protocolEn: 'Reserved strictly for vehicle accidents and stranded travelers.'
  }
];

export const INITIAL_SERVICES = [
  {
    id: 'nomad-ui',
    name: 'Nomad Command Center',
    role: 'Portail Web & Dashboard Tactique',
    port: 3000,
    status: 'nominal' as const,
    memory: '110 MB',
    cpu: '0.4%',
    uptime: '48h 12m',
    endpoint: 'http://localhost:3000'
  },
  {
    id: 'survival-llm',
    name: 'Survival-LLM (Ollama)',
    role: 'Moteur IA Survie Hors-Ligne (Llama 3.2 3B)',
    port: 11434,
    status: 'nominal' as const,
    memory: '2.1 GB',
    cpu: '0.8%',
    uptime: '48h 12m',
    endpoint: 'http://localhost:11434'
  },
  {
    id: 'kiwix-iiab',
    name: 'Kiwix ZIM Server (IIAB)',
    role: 'Encyclopédie & Savoirs Hors-Ligne',
    port: 8080,
    status: 'nominal' as const,
    memory: '190 MB',
    cpu: '0.1%',
    uptime: '48h 12m',
    endpoint: 'http://localhost:8080'
  },
  {
    id: 'protomaps-tiles',
    name: 'Sentinel OSM Vector Tiles',
    role: 'Serveur Cartographique Hors-Ligne',
    port: 8085,
    status: 'nominal' as const,
    memory: '95 MB',
    cpu: '0.2%',
    uptime: '48h 12m',
    endpoint: 'http://localhost:8085'
  },
  {
    id: 'nginx-gateway',
    name: 'Nginx Air-Gap Reverse Proxy',
    role: 'Passerelle LAN Hermétique (Zero-Internet)',
    port: 80,
    status: 'nominal' as const,
    memory: '38 MB',
    cpu: '0.1%',
    uptime: '48h 12m',
    endpoint: 'http://localhost:80'
  }
];
