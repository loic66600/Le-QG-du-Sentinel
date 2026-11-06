export interface ExternalSurvivalResource {
  id: string;
  titleFr: string;
  titleEn: string;
  source: string;
  format: 'PDF Officiel' | 'Archive ZIM (Kiwix)' | 'Base SQLite / ZIP';
  category: 'pdf-manuals' | 'kiwix-medical' | 'kiwix-survival' | 'wikipedia-diy' | 'ai-libraries';
  sizeLabel: string;
  shortDescFr: string;
  shortDescEn: string;
  url: string;
  fallbackUrl?: string;
  license: string;
}

export const EXTERNAL_RESOURCES_CATALOG: ExternalSurvivalResource[] = [
  // ============================================================================
  // 1. MANUELS PDF OFFICIELS (survival-llm-main / library / fetch_manuals.py)
  // ============================================================================
  {
    id: 'pdf-usaf-sere',
    titleFr: 'USAF AFH 10-644 — Manuel Complet S.E.R.E.',
    titleEn: 'USAF AFH 10-644: SERE Operations Manual',
    source: 'US Air Force (Domaine Public)',
    format: 'PDF Officiel',
    category: 'pdf-manuals',
    sizeLabel: 'PDF · 650 pages',
    shortDescFr: 'Survie en milieu isolé, évasion, médecine de terrain, abris, eau et orientation sans GPS.',
    shortDescEn: 'Survival, evasion, field medicine, shelters, water, and no-GPS navigation.',
    url: 'https://web.archive.org/web/2025id_/https://static.e-publishing.af.mil/production/1/af_a3/publication/afh10-644/afh10-644.pdf',
    fallbackUrl: 'https://static.e-publishing.af.mil/production/1/af_a3/publication/afh10-644/afh10-644.pdf',
    license: 'Public Domain (17 U.S.C. 105)'
  },
  {
    id: 'pdf-atp-first-aid-tccc',
    titleFr: 'US Army ATP 4-02.11 — Premiers Secours & TCCC (2026)',
    titleEn: 'US Army ATP 4-02.11: Casualty Response, TCCC & First Aid',
    source: 'US Army Medical Department',
    format: 'PDF Officiel',
    category: 'pdf-manuals',
    sizeLabel: 'PDF · Édition 2026',
    shortDescFr: 'Référence officielle de secourisme tactique : garrots, hémorragies, voies aériennes et choc.',
    shortDescEn: 'Official tactical casualty care: tourniquets, massive bleeding, airway, and shock.',
    url: 'https://armypubs.army.mil/epubs/DR_pubs/DR_a/ARN46159-ATP_4-02.11-000-WEB-1.pdf',
    license: 'Public Domain (17 U.S.C. 105)'
  },
  {
    id: 'pdf-ifrc-first-aid',
    titleFr: 'Croix-Rouge (IFRC) — Directives Premiers Secours & Réanimation',
    titleEn: 'IFRC International First Aid & Resuscitation Guidelines',
    source: 'IFRC (Fédération Internationale Croix-Rouge)',
    format: 'PDF Officiel',
    category: 'pdf-manuals',
    sizeLabel: 'PDF · Illustré',
    shortDescFr: 'Directives internationales complètes de premiers secours civils et de réanimation.',
    shortDescEn: 'Evidence-based international civilian first aid and resuscitation guidelines.',
    url: 'https://www.ifrc.org/sites/default/files/2022-02/EN_GFARC_GUIDELINES_2020.pdf',
    license: 'Non-Commercial (IFRC)'
  },
  {
    id: 'pdf-who-basic-emergency',
    titleFr: 'OMS & CICR — Soins d’Urgence de Base (BEC)',
    titleEn: 'WHO-ICRC Basic Emergency Care (ABCDE Approach)',
    source: 'Organisation Mondiale de la Santé (OMS)',
    format: 'PDF Officiel',
    category: 'pdf-manuals',
    sizeLabel: 'PDF · Manuel Clinique',
    shortDescFr: 'Approche clinique ABCDE pour gérer les urgences vitales sans équipement hospitalier lourd.',
    shortDescEn: 'Clinical ABCDE approach to life-threatening emergencies in low-resource settings.',
    url: 'https://iris.who.int/server/api/core/bitstreams/63432b9f-8808-44c5-9692-cea717c0cbda/content',
    license: 'CC BY-NC-SA 3.0 IGO (WHO)'
  },
  {
    id: 'pdf-who-water-quality',
    titleFr: 'OMS — Directives de Qualité pour l’Eau de Boisson (4e éd.)',
    titleEn: 'WHO Guidelines for Drinking-water Quality (4th ed.)',
    source: 'Organisation Mondiale de la Santé (OMS)',
    format: 'PDF Officiel',
    category: 'pdf-manuals',
    sizeLabel: 'PDF · Référence Eau',
    shortDescFr: 'Traitement, désinfection, seuils de potabilité et contrôle sanitaire de l’eau.',
    shortDescEn: 'Water disinfection, microbial safety thresholds, and household water treatment.',
    url: 'https://iris.who.int/server/api/core/bitstreams/69c17edd-ee26-425b-9d34-33799377e886/content',
    license: 'CC BY-NC-SA 3.0 IGO (WHO)'
  },
  {
    id: 'pdf-who-childbirth',
    titleFr: 'OMS — Complications de la Grossesse et de l’Accouchement',
    titleEn: 'WHO Managing Complications in Pregnancy and Childbirth',
    source: 'Organisation Mondiale de la Santé (OMS)',
    format: 'PDF Officiel',
    category: 'pdf-manuals',
    sizeLabel: 'PDF · Maternité & Urgence',
    shortDescFr: 'Guide destiné aux sages-femmes et médecins pour gérer les accouchements difficiles.',
    shortDescEn: 'Guide for midwives and doctors on emergency obstetric and newborn care.',
    url: 'https://iris.who.int/server/api/core/bitstreams/3bda1306-da5d-487d-b2ad-aff995112a7a/content',
    license: 'CC BY-NC-SA 3.0 IGO (WHO)'
  },
  {
    id: 'pdf-nuclear-kearny',
    titleFr: 'Nuclear War Survival Skills — Cresson Kearny (ORNL-5037)',
    titleEn: 'Nuclear War Survival Skills (Oak Ridge National Lab)',
    source: 'Oak Ridge National Laboratory (ORNL)',
    format: 'PDF Officiel',
    category: 'pdf-manuals',
    sizeLabel: 'PDF · 317 pages',
    shortDescFr: 'Construction d’abris anti-retombées, ventilation manuelle KAP, dosimètre artisanal et eau.',
    shortDescEn: 'Fallout shelter construction, homemade KAP air pump, KFM radiation meter, and water.',
    url: 'https://www.osti.gov/servlets/purl/814213',
    license: 'Public Domain (ORNL-5037)'
  },
  {
    id: 'pdf-fema-are-you-ready',
    titleFr: 'FEMA — Are You Ready? Guide Complet de Préparation Citoyenne',
    titleEn: 'FEMA: Are You Ready? Citizen Preparedness Guide',
    source: 'FEMA / Ready.gov',
    format: 'PDF Officiel',
    category: 'pdf-manuals',
    sizeLabel: 'PDF · 200 pages',
    shortDescFr: 'Guide officiel de préparation familiale aux catastrophes naturelles, technologiques et blackouts.',
    shortDescEn: 'In-depth citizen preparedness guide for natural disasters, blackouts, and hazards.',
    url: 'https://www.ready.gov/sites/default/files/2021-11/are-you-ready-guide.pdf',
    license: 'Public Domain (US Gov)'
  },
  {
    id: 'pdf-erg-2024',
    titleFr: 'ERG 2024 — Guide des Mesures d’Urgence (Matières Dangereuses)',
    titleEn: 'Emergency Response Guidebook 2024 (Hazardous Materials)',
    source: 'PHMSA / Transport Canada',
    format: 'PDF Officiel',
    category: 'pdf-manuals',
    sizeLabel: 'PDF · Édition 2024',
    shortDescFr: 'Identification des plaques de danger chimique, distances d’isolement et sécurité incendie.',
    shortDescEn: 'Hazardous material placard identification, isolation distances, and spill response.',
    url: 'https://web.archive.org/web/20240806051758id_/https://www.phmsa.dot.gov/sites/phmsa.dot.gov/files/2024-04/ERG2024-Eng-Web-a.pdf',
    license: 'Public Domain (DOT/PHMSA)'
  },
  {
    id: 'pdf-jts-pcc',
    titleFr: 'Joint Trauma System — Soins Prolongés sans Évacuation (PCC)',
    titleEn: 'JTS Prolonged Casualty Care (PCC) Guidelines',
    source: 'Joint Trauma System (DoD)',
    format: 'PDF Officiel',
    category: 'pdf-manuals',
    sizeLabel: 'PDF · Clinique > 72h',
    shortDescFr: 'Protocoles médicaux lorsque l’évacuation d’un blessé est impossible pendant plusieurs jours.',
    shortDescEn: 'Clinical practice guidelines for sustaining a patient over days when evacuation is delayed.',
    url: 'https://jts.health.mil/assets/docs/cpgs/Prolonged_Casualty_Care_Guidelines_21_Dec_2021_ID91v1.1.pdf',
    license: 'Public Domain'
  },

  // ============================================================================
  // 2. ARCHIVES KIWIX MÉDICALES (project-nomad-main / kiwix-categories.json)
  // ============================================================================
  {
    id: 'zim-medicine-lib',
    titleFr: 'Medical Library (Bibliothèque Médicale de Terrain)',
    titleEn: 'Field & Emergency Medical Library (ZIM)',
    source: 'Kiwix / Zimgit Medicine',
    format: 'Archive ZIM (Kiwix)',
    category: 'kiwix-medical',
    sizeLabel: '67 Mo · .ZIM',
    shortDescFr: 'Collection d’ouvrages de médecine de brousse, soins dentaires d’urgence et chirurgie de terrain.',
    shortDescEn: 'Collection of field medicine, emergency dental care, and wilderness medical books.',
    url: 'https://download.kiwix.org/zim/other/zimgit-medicine_en_2024-08.zim',
    license: 'Kiwix Open Archive'
  },
  {
    id: 'zim-nhs-medicines',
    titleFr: 'Guide des Médicaments de A à Z (Posologies & Contre-indications)',
    titleEn: 'NHS Medicines A to Z (Dosages & Interactions)',
    source: 'NHS UK / Kiwix',
    format: 'Archive ZIM (Kiwix)',
    category: 'kiwix-medical',
    sizeLabel: '16 Mo · .ZIM',
    shortDescFr: 'Fiches complètes sur les médicaments courants : doses adultes/enfants, effets secondaires et interactions.',
    shortDescEn: 'How common medicines work, adult/pediatric dosages, side effects, and interactions.',
    url: 'https://download.kiwix.org/zim/zimit/nhs.uk_en_medicines_2025-12.zim',
    license: 'Open Government Licence v3.0'
  },
  {
    id: 'zim-military-medicine',
    titleFr: 'Manuels de Médecine Militaire & Sanitaire (FAS)',
    titleEn: 'Military Medicine Manuals Collection',
    source: 'FAS / US Navy Hospital Corpsman',
    format: 'Archive ZIM (Kiwix)',
    category: 'kiwix-medical',
    sizeLabel: '78 Mo · .ZIM',
    shortDescFr: 'Manuels d’infirmier de marine (Hospital Corpsman), médecine préventive et chirurgie d’urgence.',
    shortDescEn: 'Hospital Corpsman manuals, Ship’s Medicine Chest, field sanitation, and preventive medicine.',
    url: 'https://download.kiwix.org/zim/zimit/fas-military-medicine_en_2025-06.zim',
    license: 'Public Domain'
  },
  {
    id: 'zim-wikipedia-medicine',
    titleFr: 'WikiMed — Encyclopédie Médicale Illustrée Complète',
    titleEn: 'Wikipedia Medicine (Full Illustrated WikiMed)',
    source: 'Wikipedia Medical / Kiwix',
    format: 'Archive ZIM (Kiwix)',
    category: 'kiwix-medical',
    sizeLabel: '2.0 Go · .ZIM',
    shortDescFr: 'L’intégralité des articles médicaux, anatomiques et pharmacologiques de Wikipédia avec schémas.',
    shortDescEn: 'Complete medical, anatomy, pathology, and pharmacology encyclopedia with images.',
    url: 'https://download.kiwix.org/zim/wikipedia/wikipedia_en_medicine_maxi_2026-01.zim',
    license: 'CC BY-SA 4.0'
  },

  // ============================================================================
  // 3. ARCHIVES KIWIX SURVIE, EAU, NŒUDS & RECONSTRUCTION
  // ============================================================================
  {
    id: 'zim-water-treatment',
    titleFr: 'Water Treatment Library (Eau & Filtration)',
    titleEn: 'Water Treatment Library (ZIM)',
    source: 'Kiwix / Zimgit Water',
    format: 'Archive ZIM (Kiwix)',
    category: 'kiwix-survival',
    sizeLabel: '20 Mo · .ZIM',
    shortDescFr: 'Guides illustrés pour capter une source, construire un filtre à sable lent et purifier l’eau.',
    shortDescEn: 'Illustrated guides for spring catchment, biosand filter construction, and water purification.',
    url: 'https://download.kiwix.org/zim/other/zimgit-water_en_2024-08.zim',
    license: 'Kiwix Open Archive'
  },
  {
    id: 'zim-food-prep',
    titleFr: 'Food for Preppers (Conservation & Rations de Survie)',
    titleEn: 'Food for Preppers Library (ZIM)',
    source: 'Kiwix / Zimgit Food',
    format: 'Archive ZIM (Kiwix)',
    category: 'kiwix-survival',
    sizeLabel: '97 Mo · .ZIM',
    shortDescFr: 'Techniques de mise en conserve, séchage, fumage, stockage longue durée et recettes autonomes.',
    shortDescEn: 'Canning, dehydrating, smoking, long-term storage, and off-grid recipes.',
    url: 'https://download.kiwix.org/zim/other/zimgit-food-preparation_en_2025-04.zim',
    license: 'Kiwix Open Archive'
  },
  {
    id: 'zim-knots-library',
    titleFr: 'A Library of Knots (Nœuds, Brêlages & Sutures)',
    titleEn: 'A Library of Knots (ZIM)',
    source: 'Kiwix / Zimgit Knots',
    format: 'Archive ZIM (Kiwix)',
    category: 'kiwix-survival',
    sizeLabel: '27 Mo · .ZIM',
    shortDescFr: 'Encyclopédie illustrée des nœuds marins, brêlages de camp, échelles de corde et sutures.',
    shortDescEn: 'Illustrated guide to knots, lashings, rope ladders, and surgical sutures.',
    url: 'https://download.kiwix.org/zim/other/zimgit-knots_en_2024-08.zim',
    license: 'Kiwix Open Archive'
  },
  {
    id: 'zim-post-disaster',
    titleFr: 'Post-Disaster Resource Library (Reconstruction)',
    titleEn: 'Post-Disaster Resource Library (ZIM)',
    source: 'Kiwix / Zimgit Post-Disaster',
    format: 'Archive ZIM (Kiwix)',
    category: 'kiwix-survival',
    sizeLabel: '644 Mo · .ZIM',
    shortDescFr: 'Centaines de manuels pratiques pour reconstruire abris, assainissement, puits et énergie après une crise.',
    shortDescEn: 'Hundreds of practical guides for shelter, sanitation, water wells, and recovery after disaster.',
    url: 'https://download.kiwix.org/zim/other/zimgit-post-disaster_en_2024-05.zim',
    license: 'Kiwix Open Archive'
  },
  {
    id: 'zim-hundred-rabbits',
    titleFr: 'Hundred Rabbits (100r) — Notes de Terrain Low-Tech & Solaire',
    titleEn: 'Hundred Rabbits Low-Tech & Off-Grid Field Notes',
    source: '100r.co / Kiwix',
    format: 'Archive ZIM (Kiwix)',
    category: 'kiwix-survival',
    sizeLabel: '172 Mo · .ZIM',
    shortDescFr: '10 ans de notes pratiques d’autonomie hors-réseau : solaire, électronique résiliente, réparation et cuisine.',
    shortDescEn: 'Field notes on low-tech living: solar power, water, food, and resilient electronics.',
    url: 'https://download.kiwix.org/zim/zimit/100r.co_en_all_2026-06.zim',
    license: 'CC BY-NC-SA 4.0'
  },
  {
    id: 'zim-cd3wd',
    titleFr: 'CD3WD — Bibliothèque de Technologies Appropriées',
    titleEn: 'CD3WD: Appropriate Technology Library',
    source: 'CD3WD Project / Kiwix',
    format: 'Archive ZIM (Kiwix)',
    category: 'kiwix-survival',
    sizeLabel: '581 Mo · .ZIM',
    shortDescFr: 'Agriculture, forge, menuiserie, pompes à eau, biogaz et fabrication locale sans chaîne industrielle.',
    shortDescEn: 'Food production, water pumps, construction, blacksmithing, and village-scale manufacturing.',
    url: 'https://download.kiwix.org/zim/zimit/cd3wdproject.org_en_all_2025-11.zim',
    license: 'Public / Open Access'
  },

  // ============================================================================
  // 4. WIKIPÉDIA HORS-LIGNE, IFIXIT & BASES SURVIVAL-LLM
  // ============================================================================
  {
    id: 'zim-ifixit',
    titleFr: 'iFixit —Tous les Guides de Réparation (Électronique & Véhicules)',
    titleEn: 'iFixit Complete Repair Guides (ZIM)',
    source: 'iFixit / Kiwix',
    format: 'Archive ZIM (Kiwix)',
    category: 'wikipedia-diy',
    sizeLabel: '3.38 Go · .ZIM',
    shortDescFr: 'Des milliers de tutoriels pas à pas illustrés pour réparer appareils, outils, générateurs et véhicules.',
    shortDescEn: 'Step-by-step illustrated repair guides for electronics, appliances, tools, and vehicles.',
    url: 'https://download.kiwix.org/zim/ifixit/ifixit_en_all_2025-12.zim',
    license: 'CC BY-NC-SA 3.0'
  },
  {
    id: 'zim-wiki-mini',
    titleFr: 'Wikipédia Compact (Top 100 000 Articles Essentiels)',
    titleEn: 'Wikipedia Quick Reference (Top 100k Mini)',
    source: 'Wikimedia / Project NOMAD',
    format: 'Archive ZIM (Kiwix)',
    category: 'wikipedia-diy',
    sizeLabel: '331 Mo · .ZIM',
    shortDescFr: 'Les 100 000 articles les plus importants de Wikipédia dans un fichier léger tenant sur toute clé USB.',
    shortDescEn: 'Top 100,000 essential Wikipedia articles in an ultra-compact offline file.',
    url: 'https://download.kiwix.org/zim/wikipedia/wikipedia_en_top_mini_2026-06.zim',
    license: 'CC BY-SA 4.0'
  },
  {
    id: 'pack-survival-llm-lite',
    titleFr: 'Base Indexée Survival-LLM « Essentials » (494 574 Articles)',
    titleEn: 'Survival-LLM Indexed Library "Essentials" (1.3 GB)',
    source: 'Survival-LLM (GitHub Release)',
    format: 'Base SQLite / ZIP',
    category: 'ai-libraries',
    sizeLabel: '1.27 Go · .ZIP',
    shortDescFr: 'Base de données texte plein (FTS5) regroupant WikiMed, WikEM, Ready.gov, CDC, USDA et les 16 manuels.',
    shortDescEn: 'Full-text SQLite database bundling WikiMed, WikEM, Ready.gov, CDC, USDA, and 16 official manuals.',
    url: 'https://github.com/anonnerdfrenzy/survival-llm/releases/download/library-2026-10-28/library-lite.zip.000',
    license: 'CC BY-SA 4.0 / Public Domain'
  }
];
