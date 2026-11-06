export interface EmergencyDrug {
  id: string;
  nameFr: string;
  nameEn: string;
  dci: string;
  category: 'pain-fever' | 'antibiotic' | 'allergy-shock' | 'digestive-rehydration' | 'toxicology-nrbc' | 'wound-trauma';
  categoryLabelFr: string;
  indicationsFr: string;
  adultDoseFr: string;
  childDoseFr: string;
  contraindicationsFr: string[];
  sideEffectsFr: string;
  storageNotesFr: string;
  interactionGroupIds: string[];
}

export interface DrugInteractionRule {
  id: string;
  groupA: string;
  groupB: string;
  severity: 'critical' | 'warning';
  titleFr: string;
  explanationFr: string;
  recommendationFr: string;
}

export const EMERGENCY_DRUGS: EmergencyDrug[] = [
  {
    id: 'drug-paracetamol',
    nameFr: 'Paracétamol (Doliprane, Efferalgan, Dafalgan)',
    nameEn: 'Paracetamol / Acetaminophen',
    dci: 'Paracétamol 500 mg / 1000 mg',
    category: 'pain-fever',
    categoryLabelFr: 'Douleur & Fièvre',
    indicationsFr: 'Antalgique et antipyrétique de 1re intention : fièvre, douleurs aiguës, traumatismes, brûlures, coup de chaud (après refroidissement Externe).',
    adultDoseFr: '500 mg à 1000 mg par prise, espacées d’au moins 4 à 6 heures. Maximum absolu : 3000 mg/jour (4000 mg sur avis médical).',
    childDoseFr: '15 mg/kg toutes les 6 heures (soit 60 mg/kg/jour maximum en 4 prises).',
    contraindicationsFr: [
      'Insuffisance hépatique sévère ou hépatite aiguë',
      'Ne JAMAIS dépasser la dose maximale (risque de nécrose hépatique mortelle en cas de surdosage)'
    ],
    sideEffectsFr: 'Très bien toléré aux doses normales. Toxicité hépatique grave en cas de cumul avec d’autres spécialités contenant du paracétamol.',
    storageNotesFr: 'Conserver au sec à moins de 25°C. Très stable même après la date indicative si le blister aluminium est intact.',
    interactionGroupIds: ['paracetamol', 'hepatotoxic']
  },
  {
    id: 'drug-ibuprofene',
    nameFr: 'Ibuprofène (Advil, Nurofen, Spedifen)',
    nameEn: 'Ibuprofen (NSAID)',
    dci: 'Ibuprofène 200 mg / 400 mg',
    category: 'pain-fever',
    categoryLabelFr: 'Douleur & Fièvre',
    indicationsFr: 'Anti-inflammatoire non stéroïdien (AINS) : douleurs inflammatoires articulaires/musculaires, rage de dents, colique néphrétique.',
    adultDoseFr: '200 à 400 mg par prise au cours d’un repas, toutes les 6 à 8 heures. Maximum : 1200 mg/jour en automédication.',
    childDoseFr: '20 à 30 mg/kg/jour répartis en 3 prises (uniquement si l’enfant est parfaitement hydraté et sans varicelle/infection bactérienne).',
    contraindicationsFr: [
      'DÉSHYDRATATION AIGUË ou manque d’eau potable (risque d’insuffisance rénale aiguë en survie !)',
      'Hémorragie active ou traumatisme saignant (altère la coagulation)',
      'Infection bactérienne cutanée, dentaire ou pulmonaire non couverte par antibiotique (risque de fasciite)',
      'Grossesse (formellement interdit à partir du 6e mois, déconseillé avant)',
      'Ulcère gastrique ou prise simultanée d’Aspirine / Anticoagulant'
    ],
    sideEffectsFr: 'Brûlures d’estomac, ulcère digestif, insuffisance rénale aiguë chez le sujet déshydraté.',
    storageNotesFr: 'À l’abri de l’humidité et de la chaleur.',
    interactionGroupIds: ['nsaid', 'bleeding-risk', 'nephrotoxic']
  },
  {
    id: 'drug-aspirine',
    nameFr: 'Aspirine (Aspegic, Kardegic)',
    nameEn: 'Aspirin / Acetylsalicylic Acid',
    dci: 'Acide acétylsalicylique 160–500 mg',
    category: 'pain-fever',
    categoryLabelFr: 'Douleur & Urgence Cardiaque',
    indicationsFr: 'Suspicion de syndrome coronarien aigu (infarctus du myocarde : dose antiagrégante 160 à 300 mg si non allergique et sans saignement).',
    adultDoseFr: 'Urgence cardiaque (douleur thoracique constrictive) : 160 à 300 mg à mâcher ou dissoudre. Douleur : 500 mg toutes les 6h (déconseillé en survie à cause du risque hémorragique).',
    childDoseFr: 'DÉCONSEILLÉ chez l’enfant lors de viroses (risque de syndrome de Reye mortel).',
    contraindicationsFr: [
      'Tout traumatisme crânien, suspicion d’AVC hémorragique ou hémorragie interne/externe',
      'Ulcère gastroduodénal évolutif, allergie aux salicylés ou aux AINS',
      'Dernier trimestre de grossesse'
    ],
    sideEffectsFr: 'Allongement du temps de saignement pendant 7 jours, risque d’hémorragie digestive.',
    storageNotesFr: 'Craint fortement l’humidité : si le comprimé sent le vinaigre (acide acétique), il est dégradé.',
    interactionGroupIds: ['nsaid', 'antiplatelet', 'bleeding-risk']
  },
  {
    id: 'drug-tramadol',
    nameFr: 'Tramadol (Contramal, Topalgic, Ixprim)',
    nameEn: 'Tramadol (Opioid Analgesic)',
    dci: 'Tramadol 50 mg',
    category: 'pain-fever',
    categoryLabelFr: 'Douleur Sévère (Palier 2)',
    indicationsFr: 'Douleurs modérées à sévères (fracture réduite, brûlure étendue, plaie traumatique grave) ne répondant pas au paracétamol seul.',
    adultDoseFr: '50 à 100 mg toutes les 6 à 8 heures. Ne jamais dépasser 400 mg/jour.',
    childDoseFr: 'Réservé à l’adulte et à l’adolescent > 12 ans (1 à 2 mg/kg par prise).',
    contraindicationsFr: [
      'Traumatisme crânien grave ou détresse respiratoire (dépresseur respiratoire)',
      'Épilepsie non contrôlée (abaisse le seuil épileptogène)',
      'Association avec alcool, somnifères, benzodiazépines ou antidépresseurs IMAO/ISRS'
    ],
    sideEffectsFr: 'Somnolence, vertiges, nausées, baisse de vigilance lors d’une évacuation.',
    storageNotesFr: 'Conserver sous clé hors de portée des enfants.',
    interactionGroupIds: ['opioid', 'cns-depressant']
  },
  {
    id: 'drug-amoxicilline',
    nameFr: 'Amoxicilline / Augmentin (Amoxicilline + Acide Clavulanique)',
    nameEn: 'Amoxicillin / Co-amoxiclav',
    dci: 'Amoxicilline 1 g (+/- Acide clavulanique 125 mg)',
    category: 'antibiotic',
    categoryLabelFr: 'Infection & Antibiotiques',
    indicationsFr: 'Amoxicilline seule : pneumonie, angine bactérienne, otite, abcès dentaire. Augmentin : morsure animale/humaine, plaie souillée infectée.',
    adultDoseFr: '1 g matin, midi et soir (3 g/jour) pendant 5 à 7 jours au début des repas.',
    childDoseFr: '50 à 80 mg/kg/jour répartis en 3 prises.',
    contraindicationsFr: [
      'ALLERGIE AUX PÉNICILLINES ou aux Bêta-lactamines (risque de choc anaphylactique mortel !)',
      'Mononucléose infectieuse'
    ],
    sideEffectsFr: 'Diarrhée, candidose, éruption cutanée allergique (arrêter immédiatement si urticaire ou œdème).',
    storageNotesFr: 'Les comprimés dispersibles se conservent bien au sec. Les sirops reconstitués avec de l’eau ne se gardent que 7 jours au frais.',
    interactionGroupIds: ['penicillin', 'antibiotic']
  },
  {
    id: 'drug-doxycycline',
    nameFr: 'Doxycycline (Vibramycine, Tolexine)',
    nameEn: 'Doxycycline',
    dci: 'Doxycycline 100 mg',
    category: 'antibiotic',
    categoryLabelFr: 'Infection, Tique & Zoonoses',
    indicationsFr: 'Morsure de tique (érythème migrant / maladie de Lyme), leptospirose (eau souillée par rongeurs), infections respiratoires atypiques, prophylaxie antipaludique.',
    adultDoseFr: '100 mg matin et soir (200 mg/jour) au milieu d’un repas avec un grand verre d’eau, sans s’allonger pendant 1h après la prise.',
    childDoseFr: 'Déconseillé avant 8 ans (coloration dentaire), sauf urgence vitale (ex. rickettsiose / charbon).',
    contraindicationsFr: [
      'Grossesse (2e et 3e trimestres) et allaitement',
      'Exposition directe au soleil (forte photosensibilisation cutanée : couvrir la peau)',
      'Ne JAMAIS utiliser de tétracyclines périmées dégradées par la chaleur (syndrome de Fanconi rénal)'
    ],
    sideEffectsFr: 'Ulcération de l’œsophage si avalé à sec ou couché, coup de soleil sévère.',
    storageNotesFr: 'Conserver strictement au sec et à moins de 25°C. Vérifier l’aspect intact des comprimés.',
    interactionGroupIds: ['tetracycline', 'antibiotic', 'chelation-sensitive']
  },
  {
    id: 'drug-ciprofloxacine',
    nameFr: 'Ciprofloxacine (Ciflox)',
    nameEn: 'Ciprofloxacin (Fluoroquinolone)',
    dci: 'Ciprofloxacine 500 mg',
    category: 'antibiotic',
    categoryLabelFr: 'Infection Sévère & Eau Contaminée',
    indicationsFr: 'Diarrhée infectieuse invasive sévère (dysenterie fébrile), pyélonéphrite (infection rénale), plaie contaminée en cas d’allergie aux pénicillines.',
    adultDoseFr: '500 mg matin et soir (toutes les 12h) pendant 3 à 7 jours selon l’indication.',
    childDoseFr: 'Réservé à l’adulte (atteinte des cartilages de croissance), sauf urgence vitale absolue.',
    contraindicationsFr: [
      'Antécédent de tendinite aux fluoroquinolones (risque de rupture du tendon d’Achille lors d’une marche forcée !)',
      'Grossesse et allaitement'
    ],
    sideEffectsFr: 'Douleurs tendineuses (arrêter immédiatement et mettre au repos en cas de douleur au tendon d’Achille), photosensibilisation.',
    storageNotesFr: 'Très grande stabilité chimique en comprimés secs.',
    interactionGroupIds: ['fluoroquinolone', 'antibiotic', 'chelation-sensitive']
  },
  {
    id: 'drug-azithromycine',
    nameFr: 'Azithromycine (Zithromax)',
    nameEn: 'Azithromycin (Macrolide)',
    dci: 'Azithromycine 250 mg / 500 mg',
    category: 'antibiotic',
    categoryLabelFr: 'Infection & Alternative Pénicilline',
    indicationsFr: 'Alternative de choix en cas d’allergie à la pénicilline : infections respiratoires, ORL, cutanées et diarrhées bactériennes aiguës (choléra, campylobacter).',
    adultDoseFr: '500 mg en 1 seule prise par jour pendant 3 jours.',
    childDoseFr: '20 mg/kg en 1 prise par jour pendant 3 jours.',
    contraindicationsFr: [
      'Allergie aux macrolides',
      'Troubles graves du rythme cardiaque (allongement de l’intervalle QT)'
    ],
    sideEffectsFr: 'Troubles digestifs modérés.',
    storageNotesFr: 'Conserver à l’abri de l’humidité.',
    interactionGroupIds: ['macrolide', 'antibiotic']
  },
  {
    id: 'drug-metronidazole',
    nameFr: 'Métronidazole (Flagyl)',
    nameEn: 'Metronidazole',
    dci: 'Métronidazole 500 mg',
    category: 'antibiotic',
    categoryLabelFr: 'Parasites de l’Eau (Giardia) & Anaérobies',
    indicationsFr: 'Parasitoses intestinales dues à l’eau non traitée (Giardiase, Amibiase), infections dentaires sévères et plaies profondes anaérobies.',
    adultDoseFr: '500 mg 3 fois par jour (1,5 g/jour) pendant 5 à 7 jours.',
    childDoseFr: '25 à 30 mg/kg/jour en 3 prises.',
    contraindicationsFr: [
      'INTERDICTION ABSOLUE D’ALCOOL pendant le traitement et 48h après (effet antabuse : vomissements incoercibles, chute de tension)'
    ],
    sideEffectsFr: 'Goût métallique dans la bouche, urines foncées (normal).',
    storageNotesFr: 'Protéger de la lumière.',
    interactionGroupIds: ['metronidazole', 'antibiotic']
  },
  {
    id: 'drug-sro',
    nameFr: 'SRO — Soluté de Réhydratation Orale (Adiaril, Physiosalt)',
    nameEn: 'Oral Rehydration Salts (WHO ORS)',
    dci: 'Glucose + Électrolytes (Sodium, Potassium, Citrate)',
    category: 'digestive-rehydration',
    categoryLabelFr: 'Diarrhée, Coup de Chaud & Brûlures',
    indicationsFr: 'Traitement VITAL n°1 des déshydratations par diarrhée aiguë, vomissements, coup de chaud ou brûlure étendue.',
    adultDoseFr: '1 sachet dans 200 ml d’eau potable (ou recette OMS maison : 1 L d’eau bouillie refroidie + 6 c. à café rases de sucre + 1/2 c. à café rase de sel). Boire 2 à 3 L/jour par petites gorgées.',
    childDoseFr: 'Proposer à volonté par petites gorgées de 5 à 10 ml toutes les 2 minutes (même en cas de vomissements).',
    contraindicationsFr: [
      'Victime inconsciente (ne jamais faire boire : risque d’étouffement)',
      'Occlusion intestinale complète'
    ],
    sideEffectsFr: 'Aucun si la dilution est respectée (ne jamais surdoser le sel !).',
    storageNotesFr: 'Craint l’humidité une fois le sachet ouvert. L’eau reconstituée se garde 24h maximum.',
    interactionGroupIds: ['rehydration']
  },
  {
    id: 'drug-loperamide',
    nameFr: 'Lopéramide (Imodium)',
    nameEn: 'Loperamide',
    dci: 'Lopéramide 2 mg',
    category: 'digestive-rehydration',
    categoryLabelFr: 'Diarrhée Aiguë (Évacuation)',
    indicationsFr: 'Ralentisseur du transit pour permettre un déplacement d’urgence lors d’une diarrhée liquide banale SANS fièvre ni sang.',
    adultDoseFr: '2 gélules (4 mg) d’emblée, puis 1 gélule (2 mg) après chaque selle liquide. Maximum : 6 gélules/jour pendant 2 jours max.',
    childDoseFr: 'Contre-indiqué chez l’enfant de moins de 12 ans.',
    contraindicationsFr: [
      'INTERDIT si diarrhée avec FIÈVRE (> 38,5°C) ou SANG/GLAIRES dans les selles (dysenterie bactérienne : bloque les toxines dans l’intestin et provoque une septicémie !)'
    ],
    sideEffectsFr: 'Constipation secondaire, ballonnements.',
    storageNotesFr: 'Conservation longue au sec.',
    interactionGroupIds: ['antidiarrheal']
  },
  {
    id: 'drug-cetirizine',
    nameFr: 'Cétirizine / Loratadine (Zyrtec, Clarityne)',
    nameEn: 'Cetirizine / Loratadine (Antihistamine)',
    dci: 'Cétirizine 10 mg / Loratadine 10 mg',
    category: 'allergy-shock',
    categoryLabelFr: 'Allergie, Urticaire & Piqûres',
    indicationsFr: 'Réaction allergique cutanée (urticaire, démangeaisons), piqûres d’insectes, rhinite allergique. (Ne remplace PAS l’adrénaline en cas d’œdème de Quincke ou choc anaphylactique !).',
    adultDoseFr: '1 comprimé de 10 mg une fois par jour.',
    childDoseFr: '6 à 12 ans : 5 mg (1/2 comprimé) matin et soir.',
    contraindicationsFr: [
      'Insuffisance rénale terminale'
    ],
    sideEffectsFr: 'Légère somnolence possible avec la cétirizine (absente avec la loratadine).',
    storageNotesFr: 'Très stable à température ambiante.',
    interactionGroupIds: ['antihistamine', 'cns-depressant']
  },
  {
    id: 'drug-adrenaline',
    nameFr: 'Adrénaline Auto-Injectable (EpiPen, Anapen, Jext)',
    nameEn: 'Epinephrine Auto-Injector',
    dci: 'Adrénaline 0,30 mg (Adulte) / 0,15 mg (Enfant)',
    category: 'allergy-shock',
    categoryLabelFr: 'Choc Anaphylactique Vital',
    indicationsFr: 'URGENCE VITALE : Choc anaphylactique ou œdème de Quincke (étouffement, gonflement de la gorge/langue, malaise après piqûre de frelon/guêpe, aliment ou médicament).',
    adultDoseFr: '0,30 mg en injection intramusculaire franche sur la face antéro-externe de la cuisse (à travers le pantalon), maintenir appuyé 10 secondes. Renouvelable après 5–10 min si pas d’amélioration.',
    childDoseFr: '15 à 30 kg : stylo 0,15 mg. Plus de 30 kg : stylo 0,30 mg.',
    contraindicationsFr: [
      'Aucune contre-indication absolue en cas de choc anaphylactique mortel !'
    ],
    sideEffectsFr: 'Tachycardie, tremblements, pâleur (normaux et transitoires).',
    storageNotesFr: 'Sensible à la chaleur (> 25°C) et au gel. Vérifier que le liquide dans la fenêtre reste limpide et incolore.',
    interactionGroupIds: ['epinephrine']
  },
  {
    id: 'drug-prednisolone',
    nameFr: 'Prednisolone (Solupred) / Corticoïde oral',
    nameEn: 'Prednisolone (Oral Corticosteroid)',
    dci: 'Prednisolone 20 mg',
    category: 'allergy-shock',
    categoryLabelFr: 'Asthme Sévère, Laryngite & Allergie',
    indicationsFr: 'Crise d’asthme aiguë sévère, œdème allergique important (en relais de l’adrénaline), laryngite striduleuse de l’enfant.',
    adultDoseFr: '40 à 60 mg (2 à 3 comprimés de 20 mg) le matin en cure courte de 3 à 5 jours.',
    childDoseFr: '1 à 2 mg/kg/jour en 1 prise le matin pendant 3 jours.',
    contraindicationsFr: [
      'Infection bactérienne, virale ou fongique sévère non traitée',
      'Ulcère digestif évolutif (ne jamais associer aux AINS comme l’Ibuprofène)'
    ],
    sideEffectsFr: 'Agitation, insomnie, douleur gastrique.',
    storageNotesFr: 'Protéger de l’humidité (comprimés orodispersibles).',
    interactionGroupIds: ['corticosteroid', 'bleeding-risk']
  },
  {
    id: 'drug-iode-stable',
    nameFr: 'Iodure de Potassium Stable 65 mg (Comprimé Nucléaire)',
    nameEn: 'Potassium Iodide (KI 65 mg)',
    dci: 'Iodure de potassium 65 mg (= 50 mg d’iode)',
    category: 'toxicology-nrbc',
    categoryLabelFr: 'Urgence Nucléaire & Radiologique',
    indicationsFr: 'Saturation préventive de la glande thyroïde contre l’iode radioactif (Iode-131) lors d’un rejet nucléaire, UNIQUEMENT sur consigne des autorités ou alerte NRBC confirmée.',
    adultDoseFr: 'Adultes et enfants > 12 ans : 2 comprimés de 65 mg (soit 130 mg) en prise unique.',
    childDoseFr: '3 à 12 ans : 1 comprimé (65 mg). 1 mois à 3 ans : 1/2 comprimé (32,5 mg). Nourrisson < 1 mois : 1/4 de comprimé (16 mg).',
    contraindicationsFr: [
      'Allergie avérée à l’iode moléculaire (très rare ; l’allergie aux fruits de mer n’est PAS une contre-indication)',
      'Ne protège QUE la thyroïde contre l’iode radioactif : le confinement étanche reste indispensable contre le césium et les rayons gamma'
    ],
    sideEffectsFr: 'Goût métallique, irritation gastrique légère.',
    storageNotesFr: 'Très longue conservation dans son blister aluminium opaque à l’abri de la lumière.',
    interactionGroupIds: ['potassium-iodide']
  },
  {
    id: 'drug-charbon-active',
    nameFr: 'Charbon Activé Officinal (Carbomix, Toxicarb)',
    nameEn: 'Activated Charcoal',
    dci: 'Charbon végétal activé (poudre pour suspension)',
    category: 'toxicology-nrbc',
    categoryLabelFr: 'Intoxication Aiguë par Ingestion',
    indicationsFr: 'Adsorption digestive d’urgence lors d’une ingestion accidentelle de plante toxique, champignon ou surdosage médicamenteux (dans l’heure suivant l’ingestion).',
    adultDoseFr: '50 g de poudre diluée dans 250 ml d’eau le plus tôt possible (idéalement < 1h après ingestion).',
    childDoseFr: '1 g/kg de poids corporel dilué dans de l’eau.',
    contraindicationsFr: [
      'INTERDIT en cas d’ingestion de produits caustiques (eau de Javel, acide, soude) ou d’hydrocarbures (essence, pétrole)',
      'Victime somnolente ou inconsciente (risque d’inhalation bronchique mortelle)',
      'Annule l’effet de tous les médicaments pris par la bouche (espacer de plus de 2 heures)'
    ],
    sideEffectsFr: 'Selles noires, constipation.',
    storageNotesFr: 'Conserver le flacon hermétiquement fermé au sec.',
    interactionGroupIds: ['charcoal-absorber']
  },
  {
    id: 'drug-chlorhexidine-betadine',
    nameFr: 'Chlorhexidine Aqueuse 0,2% / Povidone Iodée (Bétadine Dermique)',
    nameEn: 'Chlorhexidine / Povidone-Iodine Antiseptic',
    dci: 'Chlorhexidine digluconate / Povidone iodée 10%',
    category: 'wound-trauma',
    categoryLabelFr: 'Plaies, Brûlures & Antisepsie',
    indicationsFr: 'Désinfection des plaies traumatiques, coupures, morsures (après lavage abondant à l’eau et au savon pendant 15 min) et brûlures.',
    adultDoseFr: 'Application locale sur plaie préalablement nettoyée à l’eau potable ou au sérum physiologique.',
    childDoseFr: 'Préférer la Chlorhexidine aqueuse sans alcool chez le jeune enfant (la Bétadine est déconseillée sur grande surface chez le nourrisson).',
    contraindicationsFr: [
      'Ne JAMAIS mélanger deux antiseptiques différents sur la même plaie (ex. Bétadine + Chlorhexidine ou Dakin : ils s’annulent et deviennent irritants !)',
      'Ne jamais mettre de Chlorhexidine dans les yeux ou le conduit auditif'
    ],
    sideEffectsFr: 'Irritation cutanée rare.',
    storageNotesFr: 'Privilégier les unidoses stériles qui ne se contaminent pas après ouverture.',
    interactionGroupIds: ['topical-antiseptic']
  },
  {
    id: 'drug-omeprazole',
    nameFr: 'Oméprazole / Pantoprazole (Mopral, Inipomp)',
    nameEn: 'Omeprazole (Proton Pump Inhibitor)',
    dci: 'Oméprazole 20 mg',
    category: 'digestive-rehydration',
    categoryLabelFr: 'Protection Gastrique & Ulcère',
    indicationsFr: 'Brûlures d’estomac sévères, reflux gastrique, protection de l’estomac si la prise d’un anti-inflammatoire ou de corticoïde est indispensable.',
    adultDoseFr: '1 gélule de 20 mg le matin à jeun.',
    childDoseFr: '10 mg/jour chez l’enfant de plus de 10 kg.',
    contraindicationsFr: [
      'Aucune contre-indication majeure en urgence'
    ],
    sideEffectsFr: 'Céphalées ou troubles digestifs bénins.',
    storageNotesFr: 'Craint l’humidité.',
    interactionGroupIds: ['antacid-ppi']
  }
];

export const DRUG_INTERACTION_RULES: DrugInteractionRule[] = [
  {
    id: 'int-nsaid-nsaid',
    groupA: 'nsaid',
    groupB: 'nsaid',
    severity: 'critical',
    titleFr: 'DANGER : Cumul d’Anti-Inflammatoires (Ibuprofène + Aspirine)',
    explanationFr: 'Associer deux AINS (ou Ibuprofène + Aspirine) multiplie par 4 le risque d’hémorragie digestive grave et d’insuffisance rénale aiguë sans augmenter l’efficacité antidouleur. De plus, l’ibuprofène bloque l’effet cardioprotecteur de l’aspirine.',
    recommendationFr: 'Ne JAMAIS associer Ibuprofène et Aspirine. Utilisez le Paracétamol en complément si besoin.'
  },
  {
    id: 'int-nsaid-corticosteroid',
    groupA: 'nsaid',
    groupB: 'corticosteroid',
    severity: 'critical',
    titleFr: 'RISQUE ÉLEVÉ : Anti-Inflammatoire (Ibuprofène/Aspirine) + Corticoïde (Prednisolone)',
    explanationFr: 'L’association d’un AINS et d’un corticoïde oral augmente fortement le risque d’ulcère et de perforation gastrique.',
    recommendationFr: 'Éviter cette association. Utiliser le Paracétamol contre la douleur et associer un protecteur gastrique (Oméprazole 20 mg).'
  },
  {
    id: 'int-cns-depressant',
    groupA: 'cns-depressant',
    groupB: 'cns-depressant',
    severity: 'warning',
    titleFr: 'VIGILANCE : Cumul d’effets sédatifs (Tramadol + Antihistaminique)',
    explanationFr: 'L’association du Tramadol avec un antihistaminique (Cétirizine) majore la somnolence, les vertiges et la baisse de réflexes en situation de survie ou d’évacuation.',
    recommendationFr: 'Réduire les doses et ne pas conduire ni effectuer de manœuvre périlleuse.'
  },
  {
    id: 'int-charcoal-any',
    groupA: 'charcoal-absorber',
    groupB: 'antibiotic',
    severity: 'critical',
    titleFr: 'INACTIVATION : Le Charbon Activé neutralise les Antibiotiques et Médicaments oraux',
    explanationFr: 'Le charbon activé adsorbe et neutralise les molécules médicamenteuses présentes dans l’estomac et l’intestin, rendant l’antibiotique ou l’antalgique inefficace.',
    recommendationFr: 'Espacer la prise du charbon activé d’au moins 2 à 3 heures avec tout autre médicament oral.'
  },
  {
    id: 'int-charcoal-pain',
    groupA: 'charcoal-absorber',
    groupB: 'paracetamol',
    severity: 'warning',
    titleFr: 'ESPACEMENT REQUIS : Charbon Activé + Paracétamol',
    explanationFr: 'Le charbon activé adsorbe le paracétamol (il est d’ailleurs utilisé comme antidote lors d’un surdosage massif de paracétamol).',
    recommendationFr: 'Espacer les prises d’au moins 2 heures si vous souhaitez conserver l’effet antalgique.'
  },
  {
    id: 'int-nsaid-rehydration',
    groupA: 'nsaid',
    groupB: 'rehydration',
    severity: 'critical',
    titleFr: 'ALERTE RÉNALE : Ibuprofène / AINS chez une personne déshydratée (sous SRO)',
    explanationFr: 'Si une victime a besoin de Soluté de Réhydratation Orale (diarrhée, coup de chaud, manque d’eau), l’Ibuprofène provoque une vasoconstriction rénale pouvant déclencher une insuffisance rénale aiguë irréversible.',
    recommendationFr: 'INTERDICTION d’Ibuprofène tant que la personne n’est pas complètement réhydratée (urines claires et abondantes). Utiliser uniquement le Paracétamol.'
  }
];
