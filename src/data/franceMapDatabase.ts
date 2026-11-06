import { Waypoint } from '../components/TacticalMap';
import { FRANCE_COMPLETE_SURVIVAL_POIS } from './franceCompleteSurvivalPois';

/**
 * Base Nationale intégrée hors-ligne :
 * Recensement vérifié des Hôpitaux normaux, Centres Hospitaliers (CH/CHU), Cliniques d'urgence
 * et Points d'Eau Potable (Fontaines publiques d'eau potable, sources captées, bornes-fontaines)
 * répartis dans les 13 régions de France métropolitaine.
 * Se combine avec le scanner OpenStreetMap (Overpass API) pour charger chaque borne-fontaine de rue.
 */
export const FRANCE_EXTENDED_POIS: Waypoint[] = [
  // ============================================================================
  // 1. ÎLE-DE-FRANCE — HÔPITAUX, CLINIQUES & POINTS D'EAU POTABLE
  // ============================================================================
  {
    id: 'idf-hosp-bichat',
    name: 'Hôpital Bichat-Claude-Bernard (AP-HP Paris 18e)',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 48.8990,
    lon: 2.3316,
    notes: 'Hôpital général et universitaire avec service d’accueil des urgences 24h/24 et infectiologie.'
  },
  {
    id: 'idf-hosp-hegp',
    name: 'Hôpital Européen Georges-Pompidou (AP-HP Paris 15e)',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 48.8392,
    lon: 2.2709,
    notes: 'Hôpital majeur avec urgences médico-chirurgicales, cardiologie et traumatologie.'
  },
  {
    id: 'idf-hosp-necker',
    name: 'Hôpital Necker-Enfants Malades (AP-HP Paris 15e)',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 48.8461,
    lon: 2.3155,
    notes: 'Urgences pédiatriques et adultes spécialisées.'
  },
  {
    id: 'idf-hosp-saint-antoine',
    name: 'Hôpital Saint-Antoine (AP-HP Paris 12e)',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 48.8492,
    lon: 2.3827,
    notes: 'Centre hospitalier général avec urgences 24h/24.'
  },
  {
    id: 'idf-hosp-lariboisiere',
    name: 'Hôpital Lariboisière (AP-HP Paris 10e)',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 48.8829,
    lon: 2.3530,
    notes: 'Urgences générales, neurochirurgie et toxicologie.'
  },
  {
    id: 'idf-hosp-percy',
    name: 'Hôpital d’Instruction des Armées Percy (Clamart)',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 48.8141,
    lon: 2.2547,
    notes: 'Hôpital militaire ouvert aux civils : Centre de traitement des brûlés, traumatologie et urgences.'
  },
  {
    id: 'idf-hosp-begin',
    name: 'Hôpital d’Instruction des Armées Bégin (Saint-Mandé)',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 48.8421,
    lon: 2.4237,
    notes: 'Hôpital généraliste avec urgences médico-chirurgicales 24h/24.'
  },
  {
    id: 'idf-hosp-versailles',
    name: 'Centre Hospitalier de Versailles — Hôpital André-Mignot',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 48.8266,
    lon: 2.1337,
    notes: 'Hôpital de référence des Yvelines (Urgences adultes et pédiatriques).'
  },
  {
    id: 'idf-hosp-corbeil',
    name: 'Centre Hospitalier Sud Francilien (Corbeil-Essonnes)',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 48.6186,
    lon: 2.4561,
    notes: 'Grand hôpital général couvrant le sud de l’Île-de-France.'
  },
  {
    id: 'idf-hosp-meaux',
    name: 'Grand Hôpital de l’Est Francilien — Site de Meaux',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 48.9672,
    lon: 2.8856,
    notes: 'Centre hospitalier général de Seine-et-Marne avec urgences 24h/24.'
  },
  {
    id: 'idf-hosp-pontoise',
    name: 'Hôpital NOVO — Site de Pontoise (Val-d’Oise)',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 49.0569,
    lon: 2.0908,
    notes: 'Centre hospitalier de référence du Val-d’Oise.'
  },
  {
    id: 'idf-clin-americain',
    name: 'Hôpital Franco-Britannique & Clinique Kleber (Levallois-Perret)',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 48.8913,
    lon: 2.2816,
    notes: 'Établissement privé à but non lucratif avec service d’urgences 24h/24.'
  },
  {
    id: 'idf-clin-massy',
    name: 'Hôpital Privé Jacques Cartier (Clinique Ramsay Massy)',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 48.7294,
    lon: 2.2750,
    notes: 'Clinique médico-chirurgicale avec urgences générales et cardiologiques 24h/24.'
  },
  {
    id: 'idf-clin-trappes',
    name: 'Hôpital Privé de l’Ouest Parisien (Clinique Trappes)',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 48.7764,
    lon: 1.9997,
    notes: 'Clinique avec service d’urgences 24h/24 dans les Yvelines.'
  },
  {
    id: 'idf-water-lamartine',
    name: 'Puits Artésien & Fontaine d’Eau Potable du Square Lamartine (Paris 16e)',
    regionId: 'ile-de-france',
    type: 'water',
    lat: 48.8643,
    lon: 2.2752,
    notes: 'Eau potable naturelle puisée à 580 m de profondeur dans la nappe de l’Albien (accès libre).'
  },
  {
    id: 'idf-water-buttes-aux-cailles',
    name: 'Fontaine du Puits Artésien de la Butte-aux-Cailles (Place Paul-Verlaine, Paris 13e)',
    regionId: 'ile-de-france',
    type: 'water',
    lat: 48.8276,
    lon: 2.3526,
    notes: 'Point d’eau potable artésien indépendant du réseau de surface.'
  },
  {
    id: 'idf-water-madone',
    name: 'Puits Artésien de la Place de la Madone (Square de la Madone, Paris 18e)',
    regionId: 'ile-de-france',
    type: 'water',
    lat: 48.8904,
    lon: 2.3627,
    notes: 'Fontaine d’eau de source potable issue de la nappe profonde de l’Albien.'
  },
  {
    id: 'idf-water-wallace-republique',
    name: 'Fontaine d’Eau Potable Eau de Paris — Place de la République',
    regionId: 'ile-de-france',
    type: 'water',
    lat: 48.8674,
    lon: 2.3636,
    notes: 'Fontaine publique d’eau potable réseau Eau de Paris.'
  },
  {
    id: 'idf-water-versailles-parc',
    name: 'Borne-Fontaine d’Eau Potable — Grille de la Reine (Versailles)',
    regionId: 'ile-de-france',
    type: 'water',
    lat: 48.8104,
    lon: 2.1235,
    notes: 'Point d’eau potable public accessible en permanence.'
  },
  {
    id: 'idf-water-fontainebleau-source',
    name: 'Fontaine Potable du Parc du Château de Fontainebleau',
    regionId: 'ile-de-france',
    type: 'water',
    lat: 48.4021,
    lon: 2.7015,
    notes: 'Borne d’eau potable publique au cœur de Fontainebleau.'
  },

  // ============================================================================
  // 2. AUVERGNE-RHÔNE-ALPES — HÔPITAUX, CLINIQUES & POINTS D'EAU POTABLE
  // ============================================================================
  {
    id: 'ara-hosp-lyon-sud',
    name: 'Hôpital Lyon Sud (HCL Pierre-Bénite)',
    regionId: 'auvergne-rhone-alpes',
    type: 'medical',
    lat: 45.7028,
    lon: 4.8117,
    notes: 'Centre hospitalier universitaire avec urgences médicales, chirurgicales et traumatologiques.'
  },
  {
    id: 'ara-hosp-croix-rousse',
    name: 'Hôpital de la Croix-Rousse (HCL Lyon 4e)',
    regionId: 'auvergne-rhone-alpes',
    type: 'medical',
    lat: 45.7811,
    lon: 4.8308,
    notes: 'Hôpital général des Hospices Civils de Lyon avec accueil d’urgences 24h/24.'
  },
  {
    id: 'ara-clin-tonkin',
    name: 'Clinique du Tonkin — Médipôle Lyon-Villeurbanne',
    regionId: 'auvergne-rhone-alpes',
    type: 'medical',
    lat: 45.7642,
    lon: 4.8856,
    notes: 'Grand pôle clinique médico-chirurgical avec urgences 24h/24 et SOS Mains.'
  },
  {
    id: 'ara-clin-sauvegarde',
    name: 'Clinique de la Sauvegarde (Lyon 9e)',
    regionId: 'auvergne-rhone-alpes',
    type: 'medical',
    lat: 45.7865,
    lon: 4.7872,
    notes: 'Clinique chirurgicale avec service d’urgences 24h/24 dans l’ouest lyonnais.'
  },
  {
    id: 'ara-hosp-clermont',
    name: 'CHU de Clermont-Ferrand — Hôpital Gabriel-Montpied',
    regionId: 'auvergne-rhone-alpes',
    type: 'medical',
    lat: 45.7592,
    lon: 3.0908,
    notes: 'Principal centre hospitalier universitaire d’Auvergne (Urgences & Trauma Center).'
  },
  {
    id: 'ara-clin-chataigneraie',
    name: 'Clinique de la Châtaigneraie (Beaumont / Clermont-Ferrand)',
    regionId: 'auvergne-rhone-alpes',
    type: 'medical',
    lat: 45.7519,
    lon: 3.0811,
    notes: 'Importante clinique chirurgicale et d’urgences du Puy-de-Dôme.'
  },
  {
    id: 'ara-hosp-saint-etienne',
    name: 'CHU de Saint-Étienne — Hôpital Nord',
    regionId: 'auvergne-rhone-alpes',
    type: 'medical',
    lat: 45.4792,
    lon: 4.3611,
    notes: 'Centre hospitalier universitaire de la Loire avec urgences adultes et pédiatriques.'
  },
  {
    id: 'ara-hosp-annecy',
    name: 'Centre Hospitalier Annecy Genevois (CHANGE)',
    regionId: 'auvergne-rhone-alpes',
    type: 'medical',
    lat: 45.9367,
    lon: 6.1089,
    notes: 'Hôpital de référence de Haute-Savoie avec hélistation secours en montagne.'
  },
  {
    id: 'ara-hosp-chambery',
    name: 'Centre Hospitalier Métropole Savoie (Hôpital de Chambéry)',
    regionId: 'auvergne-rhone-alpes',
    type: 'medical',
    lat: 45.5656,
    lon: 5.9125,
    notes: 'Centre hospitalier général de Savoie (Urgences 24h/24).'
  },
  {
    id: 'ara-hosp-valence',
    name: 'Centre Hospitalier de Valence (Drôme)',
    regionId: 'auvergne-rhone-alpes',
    type: 'medical',
    lat: 44.9228,
    lon: 4.9153,
    notes: 'Hôpital généraliste de référence de la vallée du Rhône (Drôme-Ardèche).'
  },
  {
    id: 'ara-clin-cedres-grenoble',
    name: 'Clinique des Cèdres (Échirolles / Grenoble)',
    regionId: 'auvergne-rhone-alpes',
    type: 'medical',
    lat: 45.1489,
    lon: 5.7186,
    notes: 'Clinique médico-chirurgicale avec service d’urgences dans l’agglomération grenobloise.'
  },
  {
    id: 'ara-water-cachat-evian',
    name: 'Source Cachat — Fontaine Publique d’Eau Potable (Évian-les-Bains)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water',
    lat: 46.4004,
    lon: 6.5898,
    notes: 'Véritable griffon public de la source d’Évian : eau minérale potable gratuite en libre accès 24h/24.'
  },
  {
    id: 'ara-water-volvic-source',
    name: 'Fontaine d’Eau Potable du Goulet de Volvic (Puy-de-Dôme)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water',
    lat: 45.8736,
    lon: 3.0258,
    notes: 'Source d’eau volcanique potable filtrée par les roches de la chaîne des Puys.'
  },
  {
    id: 'ara-water-lyon-terreaux',
    name: 'Borne-Fontaine d’Eau Potable — Place Bellecour (Lyon 2e)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water',
    lat: 45.7578,
    lon: 4.8320,
    notes: 'Fontaine publique d’eau potable du réseau Grand Lyon.'
  },
  {
    id: 'ara-water-grenoble-anneau',
    name: 'Fontaine d’Eau Potable — Place Victor-Hugo (Grenoble)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water',
    lat: 45.1895,
    lon: 5.7245,
    notes: 'Eau potable pure issue des nappes alpines de Rochefort (sans traitement au chlore).'
  },
  {
    id: 'ara-water-chamonix-fontaine',
    name: 'Fontaine d’Eau Potable de Montagne — Place Balmat (Chamonix)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water',
    lat: 45.9237,
    lon: 6.8694,
    notes: 'Borne-fontaine d’eau potable alimentée par les sources du massif du Mont-Blanc.'
  },

  // ============================================================================
  // 3. PROVENCE-ALPES-CÔTE D'AZUR (PACA) — HÔPITAUX, CLINIQUES & EAU POTABLE
  // ============================================================================
  {
    id: 'paca-hosp-nord-marseille',
    name: 'Hôpital Nord (AP-HM Marseille)',
    regionId: 'paca',
    type: 'medical',
    lat: 43.3806,
    lon: 5.3608,
    notes: 'Grand centre hospitalier universitaire avec Trauma Center et urgences adultes/enfants.'
  },
  {
    id: 'paca-hosp-saint-joseph',
    name: 'Hôpital Européen & Hôpital Saint-Joseph (Marseille)',
    regionId: 'paca',
    type: 'medical',
    lat: 43.2775,
    lon: 5.3886,
    notes: 'Établissement hospitalier privé à but non lucratif avec urgences 24h/24.'
  },
  {
    id: 'paca-hosp-laveran',
    name: 'Hôpital d’Instruction des Armées Laveran (Marseille 13e)',
    regionId: 'paca',
    type: 'medical',
    lat: 43.3211,
    lon: 5.4242,
    notes: 'Hôpital militaire ouvert à tous avec service d’accueil des urgences.'
  },
  {
    id: 'paca-hosp-pasteur-nice',
    name: 'CHU de Nice — Hôpital Pasteur 2',
    regionId: 'paca',
    type: 'medical',
    lat: 43.7222,
    lon: 7.2811,
    notes: 'Centre hospitalier universitaire de référence des Alpes-Maritimes.'
  },
  {
    id: 'paca-clin-saint-george-nice',
    name: 'Clinique Saint-George (Nice)',
    regionId: 'paca',
    type: 'medical',
    lat: 43.7261,
    lon: 7.2692,
    notes: 'Clinique médico-chirurgicale niçoise disposant d’un service d’urgences 24h/24.'
  },
  {
    id: 'paca-hosp-sainte-musse-toulon',
    name: 'Hôpital Sainte-Musse (CHITS Toulon) & HIA Sainte-Anne',
    regionId: 'paca',
    type: 'medical',
    lat: 43.1244,
    lon: 5.9708,
    notes: 'Pôle hospitalier majeur du Var (Urgences générales et Trauma Center).'
  },
  {
    id: 'paca-hosp-avignon',
    name: 'Centre Hospitalier d’Avignon — Hôpital Henri-Duffaut',
    regionId: 'paca',
    type: 'medical',
    lat: 43.9239,
    lon: 4.7867,
    notes: 'Centre hospitalier de référence du Vaucluse.'
  },
  {
    id: 'paca-hosp-gap',
    name: 'Centre Hospitalier Intercommunal des Alpes du Sud (Hôpital de Gap)',
    regionId: 'paca',
    type: 'medical',
    lat: 44.5558,
    lon: 6.0747,
    notes: 'Hôpital de référence des Hautes-Alpes avec secours en montagne.'
  },
  {
    id: 'paca-water-aix-chaude',
    name: 'Fontaines d’Eau Potable du Cours Mirabeau & Place d’Albertas (Aix-en-Provence)',
    regionId: 'paca',
    type: 'water',
    lat: 43.5268,
    lon: 5.4489,
    notes: 'Réseau historique de bornes-fontaines d’eau potable d’Aix-en-Provence.'
  },
  {
    id: 'paca-water-nice-coulée',
    name: 'Fontaines d’Eau Potable de la Promenade du Paillon (Nice)',
    regionId: 'paca',
    type: 'water',
    lat: 43.6989,
    lon: 7.2719,
    notes: 'Bornes d’eau potable publiques alimentées par les sources de la Vésubie.'
  },
  {
    id: 'paca-water-marseille-longchamp',
    name: 'Borne-Fontaine d’Eau Potable — Palais Longchamp (Arrivée Canal de Marseille)',
    regionId: 'paca',
    type: 'water',
    lat: 43.3042,
    lon: 5.3944,
    notes: 'Point d’eau potable public alimenté par les eaux de la Durance.'
  },
  {
    id: 'paca-water-briancon-gargouille',
    name: 'Fontaines Potables de la Cité Vauban (Briançon — 1326 m)',
    regionId: 'paca',
    type: 'water',
    lat: 44.8997,
    lon: 6.6431,
    notes: 'Fontaines d’eau de source alpine potable à débit continu.'
  },

  // ============================================================================
  // 4. OCCITANIE — HÔPITAUX, CLINIQUES & POINTS D'EAU POTABLE
  // ============================================================================
  {
    id: 'occ-hosp-rangueil',
    name: 'CHU de Toulouse — Hôpital Rangueil',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.5594,
    lon: 1.4542,
    notes: 'Grand hôpital universitaire du sud toulousain (Urgences 24h/24).'
  },
  {
    id: 'occ-clin-pasteur-toulouse',
    name: 'Clinique Pasteur & Clinique de l’Union (Toulouse)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.5964,
    lon: 1.4258,
    notes: 'Clinique médico-chirurgicale de premier plan avec accueil d’urgences 24h/24.'
  },
  {
    id: 'occ-hosp-lapeyronie-montpellier',
    name: 'CHU de Montpellier — Hôpital Lapeyronie & Gui de Chauliac',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.6311,
    lon: 3.8519,
    notes: 'Centre hospitalier universitaire majeur de l’Hérault (Urgences & Traumatologie).'
  },
  {
    id: 'occ-clin-millenaire-montpellier',
    name: 'Polyclinique du Millénaire & Clinique du Parc (Montpellier)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.6089,
    lon: 3.9114,
    notes: 'Clinique chirurgicale avec service d’urgences 24h/24.'
  },
  {
    id: 'occ-hosp-caremeau-nimes',
    name: 'CHU de Nîmes — Hôpital Universitaire Carémeau',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.8206,
    lon: 4.3219,
    notes: 'Centre hospitalier universitaire de référence du Gard.'
  },
  {
    id: 'occ-hosp-perpignan',
    name: 'Centre Hospitalier de Perpignan (Pyrénées-Orientales)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 42.7247,
    lon: 2.8897,
    notes: 'Hôpital généraliste de référence du Roussillon.'
  },
  {
    id: 'occ-hosp-tarbes',
    name: 'Centre Hospitalier de Bigorre (Hôpital de Tarbes)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.2325,
    lon: 0.0619,
    notes: 'Centre hospitalier général des Hautes-Pyrénées.'
  },
  {
    id: 'occ-hosp-rodez',
    name: 'Hôpital Jacques-Puel — Centre Hospitalier de Rodez (Aveyron)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 44.3614,
    lon: 2.5594,
    notes: 'Hôpital de référence de l’Aveyron avec urgences 24h/24.'
  },
  {
    id: 'occ-water-toulouse-prairie',
    name: 'Bornes-Fontaines d’Eau Potable — Prairie des Filtres & Capitole (Toulouse)',
    regionId: 'occitanie',
    type: 'water',
    lat: 43.5989,
    lon: 1.4369,
    notes: 'Réseau public de bornes d’eau potable de Toulouse Métropole.'
  },
  {
    id: 'occ-water-montpellier-peyrou',
    name: 'Château d’Eau & Fontaines Potables de la Promenade du Peyrou (Montpellier)',
    regionId: 'occitanie',
    type: 'water',
    lat: 43.6114,
    lon: 3.8706,
    notes: 'Point d’eau potable historique alimenté par la source du Lez.'
  },
  {
    id: 'occ-water-luchon-sources',
    name: 'Fontaines d’Eau Potable de Montagne (Bagnères-de-Luchon, Pyrénées)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.7903,
    lon: 0.5936,
    notes: 'Sources pyrénéennes d’eau potable fraîche en libre accès.'
  },

  // ============================================================================
  // 5. NOUVELLE-AQUITAINE — HÔPITAUX, CLINIQUES & POINTS D'EAU POTABLE
  // ============================================================================
  {
    id: 'naq-hosp-haut-leveque',
    name: 'CHU de Bordeaux — Hôpital Haut-Lévêque (Pessac)',
    regionId: 'nouvelle-aquitaine',
    type: 'medical',
    lat: 44.7858,
    lon: -0.6594,
    notes: 'Grand pôle hospitalier cardiologique et médico-chirurgical de Bordeaux.'
  },
  {
    id: 'naq-clin-bordeaux-nord',
    name: 'Polyclinique Bordeaux Nord Aquitaine & Clinique du Sport',
    regionId: 'nouvelle-aquitaine',
    type: 'medical',
    lat: 44.8619,
    lon: -0.5819,
    notes: 'Clinique bordelaise majeure avec service d’urgences 24h/24.'
  },
  {
    id: 'naq-hosp-limoges',
    name: 'CHU de Limoges — Hôpital Dupuytren',
    regionId: 'nouvelle-aquitaine',
    type: 'medical',
    lat: 45.8136,
    lon: 1.2367,
    notes: 'Centre hospitalier universitaire de référence du Limousin.'
  },
  {
    id: 'naq-hosp-poitiers',
    name: 'CHU de Poitiers — Site de la Milétrie',
    regionId: 'nouvelle-aquitaine',
    type: 'medical',
    lat: 46.5594,
    lon: 0.3861,
    notes: 'Centre hospitalier universitaire de la Vienne.'
  },
  {
    id: 'naq-hosp-pau',
    name: 'Centre Hospitalier de Pau & Polyclinique de Navarre',
    regionId: 'nouvelle-aquitaine',
    type: 'medical',
    lat: 43.3211,
    lon: -0.3458,
    notes: 'Pôle hospitalier et clinique de référence du Béarn.'
  },
  {
    id: 'naq-hosp-bayonne',
    name: 'Centre Hospitalier de la Côte Basque (Bayonne) & Clinique Belharra',
    regionId: 'nouvelle-aquitaine',
    type: 'medical',
    lat: 43.4856,
    lon: -1.4847,
    notes: 'Hôpital et clinique d’urgence couvrant le Pays Basque et le sud des Landes.'
  },
  {
    id: 'naq-hosp-larochelle',
    name: 'Groupe Hospitalier de La Rochelle-Ré-Aunis (Charente-Maritime)',
    regionId: 'nouvelle-aquitaine',
    type: 'medical',
    lat: 46.1619,
    lon: -1.1458,
    notes: 'Hôpital généraliste avec urgences 24h/24.'
  },
  {
    id: 'naq-water-abatis-arcachon',
    name: 'Source des Abatilles — Fontaine Publique d’Eau Potable (Arcachon)',
    regionId: 'nouvelle-aquitaine',
    type: 'water',
    lat: 44.6461,
    lon: -1.1925,
    notes: 'Kiosque public gratuit permettant de remplir ses bidons à la source des Abatilles (captée à 472 m).'
  },
  {
    id: 'naq-water-bordeaux-quinconces',
    name: 'Fontaines d’Eau Potable — Place des Quinconces & Miroir d’Eau (Bordeaux)',
    regionId: 'nouvelle-aquitaine',
    type: 'water',
    lat: 44.8450,
    lon: -0.5719,
    notes: 'Bornes-fontaines d’eau potable publiques de Bordeaux Métropole.'
  },
  {
    id: 'naq-water-limoges-fontaine',
    name: 'Fontaines d’Eau Potable — Place de la Motte & Halles (Limoges)',
    regionId: 'nouvelle-aquitaine',
    type: 'water',
    lat: 45.8306,
    lon: 1.2575,
    notes: 'Eau potable granitique réputée pour sa faible minéralisation.'
  },

  // ============================================================================
  // 6. HAUTS-DE-FRANCE — HÔPITAUX, CLINIQUES & POINTS D'EAU POTABLE
  // ============================================================================
  {
    id: 'hdf-hosp-huriez-lille',
    name: 'CHU de Lille — Hôpital Claude-Huriez & Urgences Salengro',
    regionId: 'hauts-de-france',
    type: 'medical',
    lat: 50.6122,
    lon: 3.0369,
    notes: 'Plus grand campus hospitalo-universitaire d’Europe du Nord.'
  },
  {
    id: 'hdf-clin-louviere-lille',
    name: 'Hôpital Privé La Louvière & Polyclinique du Bois (Lille)',
    regionId: 'hauts-de-france',
    type: 'medical',
    lat: 50.6425,
    lon: 3.0811,
    notes: 'Cliniques médico-chirurgicales majeures de la métropole lilloise.'
  },
  {
    id: 'hdf-hosp-amiens',
    name: 'CHU Amiens-Picardie (Site Sud)',
    regionId: 'hauts-de-france',
    type: 'medical',
    lat: 49.8731,
    lon: 2.2531,
    notes: 'Centre hospitalier universitaire de référence de la Somme et de la Picardie.'
  },
  {
    id: 'hdf-hosp-valenciennes',
    name: 'Centre Hospitalier de Valenciennes (Nord)',
    regionId: 'hauts-de-france',
    type: 'medical',
    lat: 50.3636,
    lon: 3.5122,
    notes: 'L’un des plus importants centres hospitaliers généraux de France (Urgences 24h/24).'
  },
  {
    id: 'hdf-hosp-lens',
    name: 'Centre Hospitalier de Lens & Hôpital Privé de Bois-Bernard',
    regionId: 'hauts-de-france',
    type: 'medical',
    lat: 50.4369,
    lon: 2.8169,
    notes: 'Pôle hospitalier et clinique d’urgence du Pas-de-Calais.'
  },
  {
    id: 'hdf-hosp-compiegne',
    name: 'Centre Hospitalier Compiègne-Noyon & Polyclinique Saint-Côme (Oise)',
    regionId: 'hauts-de-france',
    type: 'medical',
    lat: 49.4036,
    lon: 2.8058,
    notes: 'Hôpital général et clinique chirurgicale de référence de l’Oise.'
  },
  {
    id: 'hdf-water-lille-citadelle',
    name: 'Bornes-Fontaines d’Eau Potable — Parc de la Citadelle & Grand’Place (Lille)',
    regionId: 'hauts-de-france',
    type: 'water',
    lat: 50.6411,
    lon: 3.0450,
    notes: 'Points d’eau potable publics alimentés par les champs captants du sud de Lille.'
  },
  {
    id: 'hdf-water-amiens-hortillonnages',
    name: 'Bornes d’Eau Potable — Parc Saint-Pierre (Amiens)',
    regionId: 'hauts-de-france',
    type: 'water',
    lat: 49.8964,
    lon: 2.3081,
    notes: 'Fontaines publiques d’eau potable à Amiens.'
  },

  // ============================================================================
  // 7. GRAND EST — HÔPITAUX, CLINIQUES & POINTS D'EAU POTABLE
  // ============================================================================
  {
    id: 'ges-hosp-civil-strasbourg',
    name: 'Nouvel Hôpital Civil (HUS Strasbourg Centre) & Clinique Rhéna',
    regionId: 'grand-est',
    type: 'medical',
    lat: 48.5758,
    lon: 7.7422,
    notes: 'Hôpital universitaire et clinique Rhéna avec urgences médico-chirurgicales.'
  },
  {
    id: 'ges-hosp-nancy-brabois',
    name: 'CHRU de Nancy — Hôpitaux de Brabois & Hôpital Central',
    regionId: 'grand-est',
    type: 'medical',
    lat: 48.6514,
    lon: 6.1444,
    notes: 'Centre hospitalier régional universitaire de Lorraine (Urgences & Traumatologie).'
  },
  {
    id: 'ges-hosp-metz-mercy',
    name: 'CHR Metz-Thionville — Hôpital de Mercy & Hôpital Robert-Schuman',
    regionId: 'grand-est',
    type: 'medical',
    lat: 49.0839,
    lon: 6.2442,
    notes: 'Grand pôle hospitalier et clinique mutualiste de Moselle.'
  },
  {
    id: 'ges-hosp-reims',
    name: 'CHU de Reims — Hôpital Maison-Blanche & Polyclinique de Courlancy',
    regionId: 'grand-est',
    type: 'medical',
    lat: 49.2275,
    lon: 4.0172,
    notes: 'Centre hospitalier universitaire et clinique de référence en Champagne-Ardenne.'
  },
  {
    id: 'ges-hosp-mulhouse',
    name: 'Groupe Hospitalier de la Région de Mulhouse — Hôpital Émile-Muller',
    regionId: 'grand-est',
    type: 'medical',
    lat: 47.7294,
    lon: 7.3469,
    notes: 'Centre hospitalier de référence du Haut-Rhin.'
  },
  {
    id: 'ges-hosp-troyes',
    name: 'Centre Hospitalier de Troyes (Aube)',
    regionId: 'grand-est',
    type: 'medical',
    lat: 48.2842,
    lon: 4.0697,
    notes: 'Hôpital généraliste de l’Aube avec urgences 24h/24.'
  },
  {
    id: 'ges-water-strasbourg-orangerie',
    name: 'Fontaines d’Eau Potable — Parc de l’Orangerie & Place Kléber (Strasbourg)',
    regionId: 'grand-est',
    type: 'water',
    lat: 48.5906,
    lon: 7.7764,
    notes: 'Eau potable puisée dans la nappe phréatique rhénane (distribuée sans chloration à Strasbourg).'
  },
  {
    id: 'ges-water-vittel-hepar',
    name: 'Source de Vittel & Contrexéville — Fontaines Publiques (Vosges)',
    regionId: 'grand-est',
    type: 'water',
    lat: 48.2047,
    lon: 5.9481,
    notes: 'Points d’eau minérale potable accessibles au parc thermal de Vittel.'
  },
  {
    id: 'ges-water-nancy-pepiniere',
    name: 'Bornes-Fontaines d’Eau Potable — Parc de la Pépinière (Nancy)',
    regionId: 'grand-est',
    type: 'water',
    lat: 48.6967,
    lon: 6.1836,
    notes: 'Fontaines d’eau potable publiques au centre de Nancy.'
  },

  // ============================================================================
  // 8. BRETAGNE — HÔPITAUX, CLINIQUES & POINTS D'EAU POTABLE
  // ============================================================================
  {
    id: 'bre-clin-saint-gregoire',
    name: 'Centre Hospitalier Privé Saint-Grégoire (Clinique Vivalto Rennes)',
    regionId: 'bretagne',
    type: 'medical',
    lat: 48.1456,
    lon: -1.6858,
    notes: 'L’une des plus importantes cliniques médico-chirurgicales de France avec urgences 24h/24.'
  },
  {
    id: 'bre-hosp-brest-cavale',
    name: 'CHRU de Brest — Hôpital de la Cavale Blanche & HIA Clermont-Tonnerre',
    regionId: 'bretagne',
    type: 'medical',
    lat: 48.3978,
    lon: -4.5369,
    notes: 'Centre hospitalier universitaire et hôpital des armées du Finistère.'
  },
  {
    id: 'bre-hosp-lorient',
    name: 'Groupe Hospitalier Bretagne Sud — Hôpital du Scorff (Lorient)',
    regionId: 'bretagne',
    type: 'medical',
    lat: 47.7564,
    lon: -3.3681,
    notes: 'Centre hospitalier général du Morbihan avec urgences 24h/24.'
  },
  {
    id: 'bre-hosp-vannes',
    name: 'Centre Hospitalier Bretagne Atlantique (Vannes) & Clinique Océane',
    regionId: 'bretagne',
    type: 'medical',
    lat: 47.6639,
    lon: -2.7428,
    notes: 'Pôle hospitalier et clinique chirurgicale de Vannes.'
  },
  {
    id: 'bre-hosp-saint-brieuc',
    name: 'Centre Hospitalier Yves-Le-Foll (Saint-Brieuc, Côtes-d’Armor)',
    regionId: 'bretagne',
    type: 'medical',
    lat: 48.5011,
    lon: -2.7419,
    notes: 'Hôpital de référence des Côtes-d’Armor.'
  },
  {
    id: 'bre-hosp-quimper',
    name: 'Centre Hospitalier de Cornouaille (Quimper)',
    regionId: 'bretagne',
    type: 'medical',
    lat: 47.9867,
    lon: -4.0931,
    notes: 'Hôpital général du Sud-Finistère.'
  },
  {
    id: 'bre-water-rennes-thabor',
    name: 'Bornes-Fontaines d’Eau Potable — Parc du Thabor & République (Rennes)',
    regionId: 'bretagne',
    type: 'water',
    lat: 48.1142,
    lon: -1.6697,
    notes: 'Fontaines d’eau potable publiques alimentées par l’usine de Villejean.'
  },
  {
    id: 'bre-water-plancoet',
    name: 'Source de Sassay — Eau Potable de Plancoët (Côtes-d’Armor)',
    regionId: 'bretagne',
    type: 'water',
    lat: 48.5236,
    lon: -2.2356,
    notes: 'Source d’eau minérale naturelle bretonne.'
  },

  // ============================================================================
  // 9. PAYS DE LA LOIRE — HÔPITAUX, CLINIQUES & POINTS D'EAU POTABLE
  // ============================================================================
  {
    id: 'pdl-clin-confluent-nantes',
    name: 'Hôpital Privé du Confluent & Clinique Jules-Verne (Nantes)',
    regionId: 'pays-de-la-loire',
    type: 'medical',
    lat: 47.1931,
    lon: -1.5364,
    notes: 'Grands pôles cliniques nantais avec services d’accueil des urgences 24h/24.'
  },
  {
    id: 'pdl-hosp-angers',
    name: 'CHU d’Angers & Clinique de l’Anjou (Maine-et-Loire)',
    regionId: 'pays-de-la-loire',
    type: 'medical',
    lat: 47.4825,
    lon: -0.5542,
    notes: 'Centre hospitalier universitaire et pôle clinique d’Angers.'
  },
  {
    id: 'pdl-hosp-lemans',
    name: 'Centre Hospitalier du Mans & Clinique du Pré (Sarthe)',
    regionId: 'pays-de-la-loire',
    type: 'medical',
    lat: 48.0156,
    lon: 0.1725,
    notes: 'L’un des plus grands hôpitaux non-universitaires de France (Urgences 24h/24).'
  },
  {
    id: 'pdl-hosp-laroche',
    name: 'Centre Hospitalier Départemental Vendée (La Roche-sur-Yon)',
    regionId: 'pays-de-la-loire',
    type: 'medical',
    lat: 46.6914,
    lon: -1.4197,
    notes: 'Hôpital de référence de la Vendée.'
  },
  {
    id: 'pdl-hosp-saint-nazaire',
    name: 'Cité Sanitaire — Centre Hospitalier & Clinique Mutualiste de Saint-Nazaire',
    regionId: 'pays-de-la-loire',
    type: 'medical',
    lat: 47.2708,
    lon: -2.2564,
    notes: 'Pôle hospitalier public-privé de l’estuaire de la Loire.'
  },
  {
    id: 'pdl-water-nantes-wallace',
    name: 'Fontaines Wallace d’Eau Potable — Jardin des Plantes & Commerce (Nantes)',
    regionId: 'pays-de-la-loire',
    type: 'water',
    lat: 47.2194,
    lon: -1.5428,
    notes: 'Fontaines publiques d’eau potable en libre accès.'
  },
  {
    id: 'pdl-water-angers-jardin',
    name: 'Bornes d’Eau Potable — Jardin du Mail (Angers)',
    regionId: 'pays-de-la-loire',
    type: 'water',
    lat: 47.4703,
    lon: -0.5469,
    notes: 'Points d’eau potable publics du centre d’Angers.'
  },

  // ============================================================================
  // 10. NORMANDIE — HÔPITAUX, CLINIQUES & POINTS D'EAU POTABLE
  // ============================================================================
  {
    id: 'nor-clin-europe-rouen',
    name: 'Clinique de l’Europe & Hôpital Privé de l’Estuaire (Rouen / Le Havre)',
    regionId: 'normandie',
    type: 'medical',
    lat: 49.4258,
    lon: 1.0769,
    notes: 'Clinique médico-chirurgicale rouennaise avec service d’urgences 24h/24.'
  },
  {
    id: 'nor-hosp-caen',
    name: 'CHU de Caen Normandie (Hôpital Côte de Nacre) & Hôpital Privé Saint-Martin',
    regionId: 'normandie',
    type: 'medical',
    lat: 49.2053,
    lon: -0.3592,
    notes: 'Centre hospitalier universitaire et clinique chirurgicale du Calvados.'
  },
  {
    id: 'nor-hosp-lehavre',
    name: 'Groupe Hospitalier du Havre — Hôpital Jacques-Monod',
    regionId: 'normandie',
    type: 'medical',
    lat: 49.5336,
    lon: 0.1942,
    notes: 'Hôpital majeur de l’agglomération havraise (Urgences 24h/24).'
  },
  {
    id: 'nor-hosp-cherbourg',
    name: 'Centre Hospitalier Public du Cotentin — Hôpital Louis-Pasteur (Cherbourg)',
    regionId: 'normandie',
    type: 'medical',
    lat: 49.6331,
    lon: -1.6089,
    notes: 'Hôpital généraliste de référence du Nord-Cotentin (Manche).'
  },
  {
    id: 'nor-hosp-evreux',
    name: 'Centre Hospitalier Eure-Seine (Hôpital d’Évreux)',
    regionId: 'normandie',
    type: 'medical',
    lat: 49.0114,
    lon: 1.1169,
    notes: 'Centre hospitalier général de l’Eure.'
  },
  {
    id: 'nor-water-rouen-hoteldeville',
    name: 'Fontaines d’Eau Potable — Place de l’Hôtel-de-Ville & Gros-Horloge (Rouen)',
    regionId: 'normandie',
    type: 'water',
    lat: 49.4431,
    lon: 1.0992,
    notes: 'Bornes d’eau potable publiques alimentées par les sources de la chapelle Saint-Filleul.'
  },
  {
    id: 'nor-water-bagnoles',
    name: 'Source Potable de Bagnoles-de-l’Orne (Parc Naturel Normandie-Maine)',
    regionId: 'normandie',
    type: 'water',
    lat: 48.5553,
    lon: -0.4139,
    notes: 'Points d’eau potable au cœur du massif forestier des Andaines.'
  },

  // ============================================================================
  // 11. BOURGOGNE-FRANCHE-COMTÉ — HÔPITAUX, CLINIQUES & EAU POTABLE
  // ============================================================================
  {
    id: 'bfc-clin-valmy-dijon',
    name: 'Hôpital Privé Dijon Bourgogne (Clinique de Valmy)',
    regionId: 'bourgogne-franche-comte',
    type: 'medical',
    lat: 47.3592,
    lon: 5.0489,
    notes: 'Grand pôle clinique chirurgical de Dijon avec service d’urgences.'
  },
  {
    id: 'bfc-hosp-besancon',
    name: 'CHU de Besançon — Hôpital Jean-Minjoz & Polyclinique de Franche-Comté',
    regionId: 'bourgogne-franche-comte',
    type: 'medical',
    lat: 47.2261,
    lon: 5.9631,
    notes: 'Centre hospitalier régional universitaire de Franche-Comté.'
  },
  {
    id: 'bfc-hosp-trevenans',
    name: 'Hôpital Nord Franche-Comté (Trévenans — Belfort / Montbéliard)',
    regionId: 'bourgogne-franche-comte',
    type: 'medical',
    lat: 47.5689,
    lon: 6.8669,
    notes: 'Hôpital ultramoderne couvrant le Territoire de Belfort et le Pays de Montbéliard.'
  },
  {
    id: 'bfc-hosp-chalon',
    name: 'Centre Hospitalier William-Morey (Chalon-sur-Saône)',
    regionId: 'bourgogne-franche-comte',
    type: 'medical',
    lat: 46.7847,
    lon: 4.8358,
    notes: 'Centre hospitalier de référence de Saône-et-Loire.'
  },
  {
    id: 'bfc-hosp-auxerre',
    name: 'Centre Hospitalier d’Auxerre & Polyclinique Sainte-Marguerite (Yonne)',
    regionId: 'bourgogne-franche-comte',
    type: 'medical',
    lat: 47.8047,
    lon: 3.5592,
    notes: 'Pôle hospitalier et clinique de l’Yonne.'
  },
  {
    id: 'bfc-water-dijon-darcy',
    name: 'Fontaines d’Eau Potable — Jardin Darcy & Place de la Libération (Dijon)',
    regionId: 'bourgogne-franche-comte',
    type: 'water',
    lat: 47.3239,
    lon: 5.0339,
    notes: 'Arrivée historique des sources du Suzon : bornes d’eau potable publiques.'
  },
  {
    id: 'bfc-water-besancon-chamars',
    name: 'Fontaines d’Eau Potable — Promenade Chamars & Place Granvelle (Besançon)',
    regionId: 'bourgogne-franche-comte',
    type: 'water',
    lat: 47.2347,
    lon: 6.0203,
    notes: 'Bornes d’eau potable publiques de Besançon.'
  },

  // ============================================================================
  // 12. CENTRE-VAL DE LOIRE — HÔPITAUX, CLINIQUES & POINTS D'EAU POTABLE
  // ============================================================================
  {
    id: 'cvl-hosp-trousseau-tours',
    name: 'CHRU de Tours — Hôpital Trousseau & Pôle Santé Léonard de Vinci',
    regionId: 'centre-val-de-loire',
    type: 'medical',
    lat: 47.3458,
    lon: 0.7106,
    notes: 'Hôpital universitaire et grande clinique chirurgicale de Chambray-lès-Tours.'
  },
  {
    id: 'cvl-hosp-orleans',
    name: 'Centre Hospitalier Régional d’Orléans (La Source) & Pôle Santé Oréliance',
    regionId: 'centre-val-de-loire',
    type: 'medical',
    lat: 47.8342,
    lon: 1.9306,
    notes: 'Grand hôpital régional du Loiret et clinique chirurgicale avec urgences.'
  },
  {
    id: 'cvl-hosp-bourges',
    name: 'Centre Hospitalier Jacques-Cœur (Bourges, Cher)',
    regionId: 'centre-val-de-loire',
    type: 'medical',
    lat: 47.0942,
    lon: 2.4239,
    notes: 'Hôpital de référence du département du Cher.'
  },
  {
    id: 'cvl-hosp-chartres',
    name: 'Centre Hospitalier Louis-Pasteur (Le Coudray / Chartres, Eure-et-Loir)',
    regionId: 'centre-val-de-loire',
    type: 'medical',
    lat: 48.4264,
    lon: 1.4961,
    notes: 'Centre hospitalier général d’Eure-et-Loir.'
  },
  {
    id: 'cvl-hosp-blois',
    name: 'Centre Hospitalier Simone-Veil (Blois) & Polyclinique de Blois',
    regionId: 'centre-val-de-loire',
    type: 'medical',
    lat: 47.5997,
    lon: 1.3458,
    notes: 'Hôpital et clinique chirurgicale de Loir-et-Cher.'
  },
  {
    id: 'cvl-water-orleans-parcfloral',
    name: 'Source du Loiret & Fontaines d’Eau Potable (Orléans)',
    regionId: 'centre-val-de-loire',
    type: 'water',
    lat: 47.8519,
    lon: 1.9358,
    notes: 'Résurgence karstique majeure et bornes d’eau potable d’Orléans Métropole.'
  },
  {
    id: 'cvl-water-tours-plumereau',
    name: 'Bornes-Fontaines d’Eau Potable — Jardin des Prébendes & Centre (Tours)',
    regionId: 'centre-val-de-loire',
    type: 'water',
    lat: 47.3861,
    lon: 0.6869,
    notes: 'Points d’eau potable publics de la ville de Tours.'
  },

  // ============================================================================
  // 13. CORSE — HÔPITAUX, CLINIQUES & POINTS D'EAU POTABLE
  // ============================================================================
  {
    id: 'cor-hosp-bastia',
    name: 'Centre Hospitalier de Bastia (Falconaja) & Polyclinique Maymard',
    regionId: 'corse',
    type: 'medical',
    lat: 42.6819,
    lon: 9.4358,
    notes: 'Hôpital de référence de Haute-Corse et clinique chirurgicale avec urgences.'
  },
  {
    id: 'cor-clin-porto-vecchio',
    name: 'Clinique de l’Ospedale (Porto-Vecchio, Corse-du-Sud)',
    regionId: 'corse',
    type: 'medical',
    lat: 41.5947,
    lon: 9.2742,
    notes: 'Clinique médico-chirurgicale avec accueil d’urgences couvrant l’Extrême-Sud corse.'
  },
  {
    id: 'cor-hosp-corte',
    name: 'Centre Hospitalier Intercommunal Corte-Tattone (Centre Corse)',
    regionId: 'corse',
    type: 'medical',
    lat: 42.3069,
    lon: 9.1511,
    notes: 'Hôpital intérieur stratégique au cœur de la Corse.'
  },
  {
    id: 'cor-water-orezza',
    name: 'Source d’Orezza — Fontaine Publique d’Eau Potable (Rapaggio, Castagniccia)',
    regionId: 'corse',
    type: 'water',
    lat: 42.3719,
    lon: 9.3858,
    notes: 'Fontaine publique permettant de recueillir gratuitement l’eau de source gazeuse ferrugineuse d’Orezza.'
  },
  {
    id: 'cor-water-zilia',
    name: 'Fontaine d’Eau de Source de Zilia (Balagne, Haute-Corse)',
    regionId: 'corse',
    type: 'water',
    lat: 42.5297,
    lon: 8.9014,
    notes: 'Fontaine de village d’eau de montagne potable au pied du Monte Grosso.'
  },
  {
    id: 'cor-water-st-georges',
    name: 'Fontaine de la Source Saint-Georges (Col Saint-Georges, Corse-du-Sud)',
    regionId: 'corse',
    type: 'water',
    lat: 41.8325,
    lon: 8.9269,
    notes: 'Fontaine publique routière d’eau de source pure accessible 24h/24.'
  },

  // ============================================================================
  // 14. VILLAGES, BOURGS RURAUX & VILLES MOYENNES — EAU POTABLE (💧) & NON POTABLE (🚰)
  // ============================================================================

  // --- ÎLE-DE-FRANCE (Villages du Vexin, Gâtinais, Vallée de Chevreuse, Brie) ---
  {
    id: 'idf-vil-provins-fontaine',
    name: 'Borne-Fontaine d’Eau Potable — Place du Châtel (Village médiéval de Provins, 77)',
    regionId: 'ile-de-france',
    type: 'water',
    lat: 48.5619,
    lon: 3.2886,
    notes: 'Eau potable publique au cœur de la cité haute de Provins.'
  },
  {
    id: 'idf-vil-milly-potable',
    name: 'Fontaine d’Eau Potable de la Halle (Milly-la-Forêt, Essonne)',
    regionId: 'ile-de-france',
    type: 'water',
    lat: 48.4028,
    lon: 2.4642,
    notes: 'Point d’eau potable communal sous la halle de Milly-la-Forêt (Parc naturel du Gâtinais).'
  },
  {
    id: 'idf-vil-chevreuse-potable',
    name: 'Borne d’Eau Potable — Chemin des Petits Ponts (Village de Chevreuse, 78)',
    regionId: 'ile-de-france',
    type: 'water',
    lat: 48.7075,
    lon: 2.0383,
    notes: 'Point d’eau potable communal dans la Haute Vallée de Chevreuse.'
  },
  {
    id: 'idf-vil-laroche-guyon',
    name: 'Fontaine Monumentale du Bourg (Village de La Roche-Guyon, Vexin 95)',
    regionId: 'ile-de-france',
    type: 'water',
    lat: 49.0811,
    lon: 1.6294,
    notes: 'Fontaine publique historique alimentée par les sources crayeuses du Vexin.'
  },
  {
    id: 'idf-raw-moret-lavoir',
    name: 'Lavoir Communal du Loing (Moret-sur-Loing, 77 — Eau Non Potable)',
    regionId: 'ile-de-france',
    type: 'water-raw',
    lat: 48.3728,
    lon: 2.8189,
    notes: 'EAU NON POTABLE : Lavoir et bord du Loing à débit permanent. Filtration + ébullition/chlore obligatoires avant consommation.'
  },
  {
    id: 'idf-raw-bullion-lavoir',
    name: 'Lavoir & Source de Sainte-Anne (Village de Bullion, Yvelines — Eau Brute)',
    regionId: 'ile-de-france',
    type: 'water-raw',
    lat: 48.6219,
    lon: 1.9958,
    notes: 'EAU NON POTABLE : Bassin de lavoir rural alimenté par source forestière non chlorée (à filtrer/bouillir).'
  },
  {
    id: 'idf-raw-canal-ourcq',
    name: 'Bassin de la Villette & Canal de l’Ourcq (Réseau Eau Non Potable de Paris)',
    regionId: 'ile-de-france',
    type: 'water-raw',
    lat: 48.8844,
    lon: 2.3719,
    notes: 'EAU NON POTABLE : Réseau historique d’eau brute de Paris (1700 km de conduites indépendantes). À filtrer et purifier impérativement.'
  },

  // --- AUVERGNE-RHÔNE-ALPES (Villages d'Auvergne, Savoie, Drôme, Ardèche, Ain) ---
  {
    id: 'ara-vil-salers-potable',
    name: 'Fontaine d’Eau Potable — Place Tyssandier-d’Escous (Village de Salers, Cantal)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water',
    lat: 45.1381,
    lon: 2.4942,
    notes: 'Eau potable volcanique d’altitude au cœur du bourg médiéval de Salers (930 m).'
  },
  {
    id: 'ara-vil-besse-potable',
    name: 'Fontaine de la Place de la Gayme (Village de Besse-et-Saint-Anastaise, 63)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water',
    lat: 45.5131,
    lon: 2.9328,
    notes: 'Fontaine d’eau potable de montagne dans le massif du Sancy.'
  },
  {
    id: 'ara-vil-perouges-potable',
    name: 'Borne d’Eau Potable — Place du Tilleul (Cité médiévale de Pérouges, Ain)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water',
    lat: 45.9033,
    lon: 5.1794,
    notes: 'Point d’eau potable communal dans le village perché de Pérouges.'
  },
  {
    id: 'ara-vil-bonneval-potable',
    name: 'Bassin-Fontaine d’Eau Potable (Village de Bonneval-sur-Arc, Haute-Maurienne 1800 m)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water',
    lat: 45.3719,
    lon: 7.0464,
    notes: 'Fontaine de village alpin alimentée par les sources glaciaires de la Vanoise.'
  },
  {
    id: 'ara-vil-vogüe-potable',
    name: 'Borne-Fontaine d’Eau Potable du Bourg (Village de Vogüé, Ardèche)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water',
    lat: 44.5508,
    lon: 4.4147,
    notes: 'Point d’eau potable public au centre du village ardéchois.'
  },
  {
    id: 'ara-vil-dieulefit-potable',
    name: 'Fontaines d’Eau Potable de la Rue du Bourg (Dieulefit, Drôme Provençale)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water',
    lat: 44.5236,
    lon: 5.0656,
    notes: 'Réseau communal de fontaines d’eau potable alimenté par les sources du Jabron.'
  },
  {
    id: 'ara-raw-perouges-puits',
    name: 'Grand Puits Historique de Pérouges (Ain — Eau de Puits Non Contrôlée)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water-raw',
    lat: 45.9035,
    lon: 5.1798,
    notes: 'EAU NON POTABLE : Puits profond de 33 m. Eau brute à bouillir ou traiter au chlore.'
  },
  {
    id: 'ara-raw-salers-abreuvoir',
    name: 'Bachal / Abreuvoir en Pierre de Volvic (Hameau de Fontanges, Cantal — Eau Brute)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water-raw',
    lat: 45.1142,
    lon: 2.5036,
    notes: 'EAU NON POTABLE : Bac d’abreuvoir de village alimenté par captage de pente non traité. Faire bouillir 1 min.'
  },
  {
    id: 'ara-raw-guiers-source',
    name: 'Résurgence du Guiers Mort — Cirque de Saint-Même (Chartreuse — Eau Brute)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water-raw',
    lat: 45.3989,
    lon: 5.8878,
    notes: 'EAU NON POTABLE : Résurgence karstique alpine à fort débit. Pâturages en amont : filtration + Micropur requis.'
  },

  // --- PROVENCE-ALPES-CÔTE D'AZUR (Villages du Luberon, Verdon, Alpilles, Mercantour) ---
  {
    id: 'paca-vil-gordes-potable',
    name: 'Fontaine d’Eau Potable de la Place du Château (Village de Gordes, Luberon)',
    regionId: 'paca',
    type: 'water',
    lat: 43.9114,
    lon: 5.2003,
    notes: 'Fontaine publique d’eau potable au cœur du village perché de Gordes (Vaucluse).'
  },
  {
    id: 'paca-vil-moustiers-potable',
    name: 'Fontaines d’Eau Potable du Village (Moustiers-Sainte-Marie, Alpes-de-Haute-Provence)',
    regionId: 'paca',
    type: 'water',
    lat: 43.8475,
    lon: 6.2219,
    notes: 'Bornes d’eau potable communales aux portes des Gorges du Verdon.'
  },
  {
    id: 'paca-vil-pernes-fontaines',
    name: 'Circuit des 40 Fontaines Publiques (Pernes-les-Fontaines, Vaucluse)',
    regionId: 'paca',
    type: 'water',
    lat: 43.9981,
    lon: 5.0592,
    notes: 'Bourg célèbre pour ses 40 fontaines publiques alimentées en continu.'
  },
  {
    id: 'paca-vil-barcelonnette-potable',
    name: 'Fontaines d’Eau Potable — Place Manuel (Barcelonnette, Vallée de l’Ubaye)',
    regionId: 'paca',
    type: 'water',
    lat: 44.3858,
    lon: 6.6525,
    notes: 'Eau potable de haute montagne distribuée dans les bornes-fontaines de la ville.'
  },
  {
    id: 'paca-vil-saorge-potable',
    name: 'Fontaines d’Eau de Source du Village Perché de Saorge (Vallée de la Roya, 06)',
    regionId: 'paca',
    type: 'water',
    lat: 43.9878,
    lon: 7.5522,
    notes: 'Sources captées alimentant les fontaines-lavoirs du village de Saorge.'
  },
  {
    id: 'paca-raw-lourmarin-lavoir',
    name: 'Grand Lavoir & Fontaine Basse (Village de Lourmarin, Luberon — Eau Non Potable)',
    regionId: 'paca',
    type: 'water-raw',
    lat: 43.7642,
    lon: 5.3628,
    notes: 'EAU NON POTABLE : Eau de source du Luberon non traitée circulant en circuit ouvert. À filtrer et bouillir.'
  },
  {
    id: 'paca-raw-salon-moussue',
    name: 'Grande Fontaine Moussue (Salon-de-Provence — Eau Calcaire Non Potable)',
    regionId: 'paca',
    type: 'water-raw',
    lat: 43.6406,
    lon: 5.0975,
    notes: 'EAU NON POTABLE : Fontaine concrétionnée en circuit non chloré. Usage sanitaire ou après purification.'
  },
  {
    id: 'paca-raw-canal-provence',
    name: 'Ouvrage & Bassin du Canal de Provence (Saint-Maximin-la-Sainte-Baume — Eau Brute)',
    regionId: 'paca',
    type: 'water-raw',
    lat: 43.4533,
    lon: 5.8619,
    notes: 'EAU NON POTABLE : Eau brute du Verdon avant station de potabilisation. Abondante mais nécessite filtration + chlore.'
  },

  // --- OCCITANIE (Villages d'Aveyron, Lot, Cévennes, Ariège, Pyrénées, Gers) ---
  {
    id: 'occ-vil-st-guilhem-potable',
    name: 'Fontaine du Plô sous le Platane (Village de Saint-Guilhem-le-Désert, Hérault)',
    regionId: 'occitanie',
    type: 'water',
    lat: 43.7342,
    lon: 3.5497,
    notes: 'Fontaine d’eau potable fraîche sur la place centrale du village médiéval.'
  },
  {
    id: 'occ-vil-conques-potable',
    name: 'Fontaine du Plô & Bornes d’Eau Potable (Village de Conques, Aveyron — GR65)',
    regionId: 'occitanie',
    type: 'water',
    lat: 44.5992,
    lon: 2.3969,
    notes: 'Points d’eau potable publics utilisés par les marcheurs du chemin de Saint-Jacques.'
  },
  {
    id: 'occ-vil-rocamadour-potable',
    name: 'Bornes d’Eau Potable de la Cité & de l’Hospitalet (Rocamadour, Lot)',
    regionId: 'occitanie',
    type: 'water',
    lat: 44.7994,
    lon: 1.6178,
    notes: 'Points d’eau potable communaux dans le village de Rocamadour.'
  },
  {
    id: 'occ-vil-cordes-potable',
    name: 'Borne d’Eau Potable — Halle de Cordes-sur-Ciel (Tarn)',
    regionId: 'occitanie',
    type: 'water',
    lat: 44.0636,
    lon: 1.9514,
    notes: 'Point d’eau potable public au sommet de la bastide de Cordes-sur-Ciel.'
  },
  {
    id: 'occ-vil-st-girons-potable',
    name: 'Fontaines d’Eau Potable du Champ de Mars (Saint-Girons, Ariège)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.9847,
    lon: 1.1458,
    notes: 'Eau potable pyrénéenne au cœur du Couserans (Ariège).'
  },
  {
    id: 'occ-vil-florac-potable',
    name: 'Fontaine du Griffon de la Source du Pêcher (Florac-Trois-Rivières, Lozère)',
    regionId: 'occitanie',
    type: 'water',
    lat: 44.3247,
    lon: 3.5931,
    notes: 'Fontaine publique au cœur du Parc national des Cévennes.'
  },
  {
    id: 'occ-raw-cordes-puits',
    name: 'Puits de la Halle de Cordes-sur-Ciel (Tarn — Puits de 113 m Non Potable)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 44.0638,
    lon: 1.9518,
    notes: 'EAU NON POTABLE : Puits historique creusé dans le roc (113 m de profondeur). Eau brute de secours à bouillir.'
  },
  {
    id: 'occ-raw-causse-lavogne',
    name: 'Lavogne Pastorale de Blandas (Causse du Larzac, Gard — Eau Brute)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 43.9136,
    lon: 3.5128,
    notes: 'EAU NON POTABLE : Mare pavée traditionnelle recueillant l’eau de pluie sur le Causse. Décantation + filtration + ébullition obligatoires.'
  },

  // --- NOUVELLE-AQUITAINE (Villages de Dordogne, Pays Basque, Corrèze, Charente) ---
  {
    id: 'naq-vil-sarlat-potable',
    name: 'Fontaine Sainte-Marie & Bornes d’Eau Potable (Sarlat-la-Canéda, Dordogne)',
    regionId: 'nouvelle-aquitaine',
    type: 'water',
    lat: 44.8892,
    lon: 1.2167,
    notes: 'Points d’eau potable dans la cité médiévale du Périgord Noir.'
  },
  {
    id: 'naq-vil-st-jean-pied-potable',
    name: 'Bornes-Fontaines d’Eau Potable Pèlerins (Saint-Jean-Pied-de-Port, Pays Basque)',
    regionId: 'nouvelle-aquitaine',
    type: 'water',
    lat: 43.1636,
    lon: -1.2381,
    notes: 'Fontaines d’eau potable publiques au départ de la traversée des Pyrénées.'
  },
  {
    id: 'naq-vil-collonges-potable',
    name: 'Borne d’Eau Potable de la Halle (Village de Collonges-la-Rouge, Corrèze)',
    regionId: 'nouvelle-aquitaine',
    type: 'water',
    lat: 45.0608,
    lon: 1.6547,
    notes: 'Point d’eau potable communal au centre du village de grès rouge.'
  },
  {
    id: 'naq-vil-aubeterre-potable',
    name: 'Fontaine d’Eau Potable — Place Trarieux (Village d’Aubeterre-sur-Dronne, Charente)',
    regionId: 'nouvelle-aquitaine',
    type: 'water',
    lat: 45.2719,
    lon: 0.1706,
    notes: 'Borne-fontaine d’eau potable au cœur du village charentais.'
  },
  {
    id: 'naq-raw-touvre-sources',
    name: 'Sources de la Touvre — Le Dormant & Le Bouillant (Magnac-sur-Touvre, 16 — Eau Brute)',
    regionId: 'nouvelle-aquitaine',
    type: 'water-raw',
    lat: 45.6625,
    lon: 0.2553,
    notes: 'EAU NON POTABLE : Deuxième plus importante résurgence karstique de France. Eau brute très abondante à filtrer/traiter.'
  },
  {
    id: 'naq-raw-brantome-lavoir',
    name: 'Fontaine Médicis & Lavoir de l’Abbaye (Brantôme-en-Périgord, 24 — Eau Brute)',
    regionId: 'nouvelle-aquitaine',
    type: 'water-raw',
    lat: 45.3644,
    lon: 0.6469,
    notes: 'EAU NON POTABLE : Source rocheuse et lavoir sur la Dronne (à traiter avant boisson).'
  },

  // --- BOURGOGNE-FRANCHE-COMTÉ (Villages du Morvan, Yonne, Côte-d'Or, Jura, Doubs) ---
  {
    id: 'bfc-vil-vezelay-potable',
    name: 'Bornes d’Eau Potable de la Rue Saint-Pierre (Village de Vézelay, Yonne)',
    regionId: 'bourgogne-franche-comte',
    type: 'water',
    lat: 47.4656,
    lon: 3.7469,
    notes: 'Points d’eau potable publics sur la colline éternelle de Vézelay.'
  },
  {
    id: 'bfc-vil-noyers-potable',
    name: 'Fontaine d’Eau Potable — Place de l’Hôtel-de-Ville (Village de Noyers-sur-Serein, 89)',
    regionId: 'bourgogne-franche-comte',
    type: 'water',
    lat: 47.6969,
    lon: 3.9942,
    notes: 'Borne d’eau potable communale dans le bourg médiéval de Noyers.'
  },
  {
    id: 'bfc-vil-ornans-potable',
    name: 'Fontaines d’Eau Potable du Pêcheur de Chavots (Ornans, Vallée de la Loue, Doubs)',
    regionId: 'bourgogne-franche-comte',
    type: 'water',
    lat: 47.1053,
    lon: 6.1436,
    notes: 'Fontaines communales d’eau potable dans la vallée de la Loue.'
  },
  {
    id: 'bfc-vil-arbois-potable',
    name: 'Fontaine aux Lions — Eau Potable Communale (Arbois, Jura)',
    regionId: 'bourgogne-franche-comte',
    type: 'water',
    lat: 46.9028,
    lon: 5.7739,
    notes: 'Point d’eau potable public au centre d’Arbois.'
  },
  {
    id: 'bfc-raw-tonnerre-fosse-dionne',
    name: 'Lavoir de la Fosse Dionne (Tonnerre, Yonne — Source Karstique Non Potable)',
    regionId: 'bourgogne-franche-comte',
    type: 'water-raw',
    lat: 47.8558,
    lon: 3.9719,
    notes: 'EAU NON POTABLE : Célèbre lavoir circulaire alimenté par une source vauclusienne à fort débit (311 L/s). Faire bouillir ou chlorer.'
  },
  {
    id: 'bfc-raw-source-loue',
    name: 'Source de la Loue (Ouhans, Doubs — Résurgence Brute)',
    regionId: 'bourgogne-franche-comte',
    type: 'water-raw',
    lat: 47.0114,
    lon: 6.2989,
    notes: 'EAU NON POTABLE : Résurgence majeure du Doubs. Eau brute non traitée nécessitant filtration et désinfection.'
  },

  // --- GRAND EST (Villages d'Alsace, Vosges, Meuse, Ardennes, Aube) ---
  {
    id: 'ges-vil-eguisheim-potable',
    name: 'Fontaine Saint-Léon — Eau Potable (Village d’Eguisheim, Haut-Rhin)',
    regionId: 'grand-est',
    type: 'water',
    lat: 48.0431,
    lon: 7.3061,
    notes: 'Fontaine publique sur la place du Château d’Eguisheim.'
  },
  {
    id: 'ges-vil-kaysersberg-potable',
    name: 'Fontaine Constantin — Place de l’Église (Village de Kaysersberg, Alsace)',
    regionId: 'grand-est',
    type: 'water',
    lat: 48.1392,
    lon: 7.2608,
    notes: 'Fontaine d’eau potable au cœur de la cité impériale de Kaysersberg.'
  },
  {
    id: 'ges-vil-obernai-potable',
    name: 'Bornes d’Eau Potable — Place du Marché (Obernai, Bas-Rhin)',
    regionId: 'grand-est',
    type: 'water',
    lat: 48.4622,
    lon: 7.4819,
    notes: 'Points d’eau potable publics au pied du Mont Sainte-Odile.'
  },
  {
    id: 'ges-vil-bussang-source',
    name: 'Fontaine de la Source Marie (Village de Bussang, Hautes-Vosges)',
    regionId: 'grand-est',
    type: 'water',
    lat: 47.8861,
    lon: 6.8689,
    notes: 'Source d’eau minérale gazeuse naturelle vosgienne près de la source de la Moselle.'
  },
  {
    id: 'ges-raw-riquewihr-sinne',
    name: 'Fontaine de la Sinne & Lavoir Vigneron (Village de Riquewihr, Alsace — Eau Brute)',
    regionId: 'grand-est',
    type: 'water-raw',
    lat: 48.1667,
    lon: 7.2972,
    notes: 'EAU NON POTABLE : Ancien bassin de jaugeage et lavoir alimenté en eau non chlorée.'
  },
  {
    id: 'ges-raw-meuse-lavoir',
    name: 'Grand Lavoir à Impluvium de Bonnet (Village de Bonnet, Meuse — Eau Non Potable)',
    regionId: 'grand-est',
    type: 'water-raw',
    lat: 48.5225,
    lon: 5.4375,
    notes: 'EAU NON POTABLE : Lavoir rural lorrain alimenté par source calcaire non traitée.'
  },

  // --- BRETAGNE (Villages du Finistère, Morbihan, Côtes-d'Armor, Ille-et-Vilaine) ---
  {
    id: 'bre-vil-locronan-potable',
    name: 'Bornes d’Eau Potable du Bourg (Village de Locronan, Finistère)',
    regionId: 'bretagne',
    type: 'water',
    lat: 48.0983,
    lon: -4.2078,
    notes: 'Points d’eau potable communaux à proximité de la place de l’Église.'
  },
  {
    id: 'bre-vil-rochefort-potable',
    name: 'Borne-Fontaine d’Eau Potable (Village de Rochefort-en-Terre, Morbihan)',
    regionId: 'bretagne',
    type: 'water',
    lat: 47.6994,
    lon: -2.3367,
    notes: 'Point d’eau potable public dans le bourg historique.'
  },
  {
    id: 'bre-vil-dinan-potable',
    name: 'Bornes d’Eau Potable — Place des Merciers & Port (Dinan, Côtes-d’Armor)',
    regionId: 'bretagne',
    type: 'water',
    lat: 48.4544,
    lon: -2.0439,
    notes: 'Fontaines publiques d’eau potable de la cité médiévale de Dinan.'
  },
  {
    id: 'bre-raw-pontrieux-lavoirs',
    name: 'Les 50 Lavoirs du Trieux (Petite cité de Pontrieux, Côtes-d’Armor — Eau Brute)',
    regionId: 'bretagne',
    type: 'water-raw',
    lat: 48.6981,
    lon: -3.1592,
    notes: 'EAU NON POTABLE : Cinquante lavoirs traditionnels bordant le fleuve côtier du Trieux. Filtration + ébullition obligatoires.'
  },
  {
    id: 'bre-raw-barenton-broceliande',
    name: 'Fontaine de Barenton (Forêt de Brocéliande / Paimpont, 35 — Source Forestière Brute)',
    regionId: 'bretagne',
    type: 'water-raw',
    lat: 48.0272,
    lon: -2.2569,
    notes: 'EAU NON POTABLE : Source forestière naturelle non contrôlée en forêt de Paimpont. À filtrer et faire bouillir.'
  },

  // --- NORMANDIE (Villages du Pays d'Auge, Eure, Cotentin, Perche) ---
  {
    id: 'nor-vil-lyons-potable',
    name: 'Borne d’Eau Potable de la Halle (Village de Lyons-la-Forêt, Eure)',
    regionId: 'normandie',
    type: 'water',
    lat: 49.3992,
    lon: 1.4767,
    notes: 'Point d’eau potable public au cœur de la plus grande hêtraie de France.'
  },
  {
    id: 'nor-vil-beuvron-potable',
    name: 'Borne-Fontaine d’Eau Potable (Village de Beuvron-en-Auge, Calvados)',
    regionId: 'normandie',
    type: 'water',
    lat: 49.1881,
    lon: -0.0458,
    notes: 'Point d’eau potable communal sur la place centrale à colombages.'
  },
  {
    id: 'nor-vil-barfleur-potable',
    name: 'Bornes d’Eau Potable du Quai (Village de Barfleur, Manche)',
    regionId: 'normandie',
    type: 'water',
    lat: 49.6708,
    lon: -1.2642,
    notes: 'Points d’eau potable publics sur le port du Val de Saire.'
  },
  {
    id: 'nor-raw-veules-cressonniere',
    name: 'Sources & Lavoirs de la Veules (Village de Veules-les-Roses, 76 — Eau Brute)',
    regionId: 'normandie',
    type: 'water-raw',
    lat: 49.8711,
    lon: 0.7994,
    notes: 'EAU NON POTABLE : Sources du plus petit fleuve de France (1,19 km) et cressonnières. Eau douce claire mais à bouillir avant boisson.'
  },

  // --- HAUTS-DE-FRANCE (Villages de l'Oise, Baie de Somme, Thiérache, Artois) ---
  {
    id: 'hdf-vil-pierrefonds-potable',
    name: 'Borne-Fontaine d’Eau Potable — Place de l’Hôtel-de-Ville (Village de Pierrefonds, Oise)',
    regionId: 'hauts-de-france',
    type: 'water',
    lat: 49.3514,
    lon: 2.9781,
    notes: 'Eau potable communale en lisière de la forêt domaniale de Compiègne.'
  },
  {
    id: 'hdf-vil-st-valery-potable',
    name: 'Bornes d’Eau Potable de la Cité Médiévale (Saint-Valery-sur-Somme, 80)',
    regionId: 'hauts-de-france',
    type: 'water',
    lat: 50.1883,
    lon: 1.6308,
    notes: 'Points d’eau potable publics en Baie de Somme.'
  },
  {
    id: 'hdf-vil-maroilles-potable',
    name: 'Borne d’Eau Potable du Bourg (Village de Maroilles, Avesnois, Nord)',
    regionId: 'hauts-de-france',
    type: 'water',
    lat: 50.1353,
    lon: 3.7611,
    notes: 'Point d’eau potable communal dans le bocage de l’Avesnois.'
  },
  {
    id: 'hdf-raw-gerberoy-puits',
    name: 'Puits & Pompe Ancienne du Bourg (Village de Gerberoy, Oise — Eau Non Potable)',
    regionId: 'hauts-de-france',
    type: 'water-raw',
    lat: 49.5342,
    lon: 1.8497,
    notes: 'EAU NON POTABLE : Puits villageois traditionnel non raccordé au traitement chloré.'
  },

  // --- PAYS DE LA LOIRE (Villages de Maine-et-Loire, Mayenne, Vendée, Sarthe) ---
  {
    id: 'pdl-vil-ste-suzanne-potable',
    name: 'Borne d’Eau Potable de la Cité (Village de Sainte-Suzanne, Mayenne)',
    regionId: 'pays-de-la-loire',
    type: 'water',
    lat: 48.0975,
    lon: -0.3522,
    notes: 'Point d’eau potable communal dans la cité médiévale des Coëvrons.'
  },
  {
    id: 'pdl-vil-clisson-potable',
    name: 'Bornes-Fontaines d’Eau Potable sous les Halles (Clisson, Loire-Atlantique)',
    regionId: 'pays-de-la-loire',
    type: 'water',
    lat: 47.0872,
    lon: -1.2836,
    notes: 'Eau potable publique sous les halles médiévales de Clisson.'
  },
  {
    id: 'pdl-vil-fontenay-potable',
    name: 'Fontaine des Quatre-Tias & Bornes Potables (Fontenay-le-Comte, Vendée)',
    regionId: 'pays-de-la-loire',
    type: 'water',
    lat: 46.4678,
    lon: -0.8061,
    notes: 'Points d’eau potable publics du centre historique.'
  },
  {
    id: 'pdl-raw-asnières-lavoir',
    name: 'Lavoir Communal sur la Vègre (Village d’Asnières-sur-Vègre, Sarthe — Eau Brute)',
    regionId: 'pays-de-la-loire',
    type: 'water-raw',
    lat: 47.8892,
    lon: -0.2356,
    notes: 'EAU NON POTABLE : Lavoir villageois alimenté par la rivière Vègre (filtration + ébullition obligatoires).'
  },

  // --- CENTRE-VAL DE LOIRE (Villages du Berry, Sologne, Touraine, Perche) ---
  {
    id: 'cvl-vil-montresor-potable',
    name: 'Borne d’Eau Potable de la Halle aux Cardeux (Village de Montrésor, Indre-et-Loire)',
    regionId: 'centre-val-de-loire',
    type: 'water',
    lat: 47.1558,
    lon: 1.2014,
    notes: 'Point d’eau potable communal au centre du village tourangeau.'
  },
  {
    id: 'cvl-vil-sancerre-potable',
    name: 'Borne-Fontaine d’Eau Potable — Nouvelle Place (Sancerre, Cher)',
    regionId: 'centre-val-de-loire',
    type: 'water',
    lat: 47.3314,
    lon: 2.8389,
    notes: 'Eau potable publique au sommet du piton de Sancerre.'
  },
  {
    id: 'cvl-vil-gargilesse-potable',
    name: 'Borne d’Eau Potable du Bourg (Village de Gargilesse-Dampierre, Indre)',
    regionId: 'centre-val-de-loire',
    type: 'water',
    lat: 46.5136,
    lon: 1.5969,
    notes: 'Point d’eau potable communal dans la vallée de la Creuse.'
  },
  {
    id: 'cvl-raw-bonneval-lavoirs',
    name: 'Lavoirs sur le Loir (Petite Venise de Bonneval, Eure-et-Loir — Eau Non Potable)',
    regionId: 'centre-val-de-loire',
    type: 'water-raw',
    lat: 48.1819,
    lon: 1.3878,
    notes: 'EAU NON POTABLE : Lavoirs anciens alimentés par les fossés du Loir (à filtrer et bouillir).'
  },

  // --- CORSE (Villages de l'Intérieur, Alta Rocca, Niolo, Cap Corse) ---
  {
    id: 'cor-vil-sartene-potable',
    name: 'Fontaine d’Eau Potable — Place Porta (Sartène, Corse-du-Sud)',
    regionId: 'corse',
    type: 'water',
    lat: 41.6211,
    lon: 8.9719,
    notes: 'Fontaine publique d’eau potable au cœur de Sartène.'
  },
  {
    id: 'cor-vil-zonza-potable',
    name: 'Fontaine d’Eau de Source de Montagne (Village de Zonza, Alta Rocca — 780 m)',
    regionId: 'corse',
    type: 'water',
    lat: 41.7494,
    lon: 9.1708,
    notes: 'Eau de source granitique potable au pied des Aiguilles de Bavella.'
  },
  {
    id: 'cor-vil-calacuccia-potable',
    name: 'Fontaine Communale du Niolo (Village de Calacuccia, Haute-Corse — 847 m)',
    regionId: 'corse',
    type: 'water',
    lat: 42.3361,
    lon: 9.0175,
    notes: 'Point d’eau potable de montagne alimenté par le massif du Cinto.'
  },
  {
    id: 'cor-raw-restonica-source',
    name: 'Gorges de la Restonica & Bergeries de Grotelle (Corte — Eau de Torrent Brute)',
    regionId: 'corse',
    type: 'water-raw',
    lat: 42.2419,
    lon: 9.0486,
    notes: 'EAU NON POTABLE : Eau cristalline de torrent alpin mais présence de troupeaux en altitude. Toujours filtrer/traiter (Micropur ou ébullition).'
  },
  ...FRANCE_COMPLETE_SURVIVAL_POIS
];
