import { Waypoint } from '../components/TacticalMap';

/**
 * EXTENSION COMPLÈTE DE SURVIE HORS-LIGNE (100% EMBARQUÉE AVANT COUPURE) :
 * - Couverture exhaustive du Département 66 (Pyrénées-Orientales) et de l'Occitanie
 * - Tous les Grands Lacs, Plans d'Eau & Retenues d'eau douce de France
 * - Tous les Grands Émetteurs Radio/TV TDF (Points hauts stratégiques avec groupes électrogènes)
 * - Toutes les Grandes Forêts Domaniales & Massifs Forestiers (Bois de chauffe, abri, sources)
 * - Cliniques privées d'urgence & Hôpitaux complémentaires dans les régions de France
 */
export const FRANCE_COMPLETE_SURVIVAL_POIS: Waypoint[] = [
  // ============================================================================
  // DÉPARTEMENT 66 — PYRÉNÉES-ORIENTALES (COUVERTURE COMPLÈTE HORS-LIGNE)
  // ============================================================================
  // --- 66 : HÔPITAUX & CLINIQUES ---
  {
    id: 'po66-med-clinique-st-pierre',
    name: 'Clinique Saint-Pierre (Perpignan — 66000)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 42.7052,
    lon: 2.8856,
    notes: 'Dépt 66 · Grande clinique médico-chirurgicale de Perpignan (Urgences, cardiologie interventionnelle, chirurgie).'
  },
  {
    id: 'po66-med-medipole-cabestany',
    name: 'Médipôle de Cabestany — Polyclinique Saint-Roch / Méditerranée (66330)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 42.6814,
    lon: 2.9319,
    notes: 'Dépt 66 · Pôle privé majeur au sud-est de Perpignan avec service d’urgences 24h/24, maternité et chirurgie.'
  },
  {
    id: 'po66-med-clinique-mutualiste-st-esteve',
    name: 'Clinique Mutualiste Catalane (Saint-Estève — 66240)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 42.7097,
    lon: 2.8489,
    notes: 'Dépt 66 · Urgences chirurgicales, SOS Mains, orthopédie et traumatologie à l’ouest de Perpignan.'
  },
  {
    id: 'po66-med-hopital-prades',
    name: 'Centre Hospitalier de Prades (Conflent — 66500)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 42.6186,
    lon: 2.4264,
    notes: 'Dépt 66 · Hôpital local et centre de soins du Conflent au pied du massif du Canigou.'
  },
  {
    id: 'po66-med-clinique-prades',
    name: 'Clinique Médicale et Cardiologique de Prades (66500)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 42.6161,
    lon: 2.4192,
    notes: 'Dépt 66 · Établissement médical et cardiologique dans la vallée de la Têt (Prades).'
  },
  {
    id: 'po66-med-hopital-ceret',
    name: 'Centre Hospitalier de Céret (Vallespir — 66400)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 42.4867,
    lon: 2.7483,
    notes: 'Dépt 66 · Hôpital de proximité couvrant toute la vallée du Tech et le Vallespir.'
  },
  {
    id: 'po66-med-hopital-cerdagne',
    name: 'Hôpital Transfrontalier de Cerdagne (Bourg-Madame / Font-Romeu / Puigcerdà — 66760)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 42.4378,
    lon: 1.9308,
    notes: 'Dépt 66 · Hôpital d’urgence 24h/24 de haute montagne pour la Cerdagne et le Capcir (1200 m).'
  },
  {
    id: 'po66-med-ch-thuir',
    name: 'Centre Hospitalier Léon-Jean-Grégory (Thuir — 66300)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 42.6339,
    lon: 2.7536,
    notes: 'Dépt 66 · Grand établissement hospitalier public situé dans les Aspres à Thuir.'
  },
  {
    id: 'po66-med-argeles-maison-medicale',
    name: 'Pôle Médical & Secours Côte Vermeille (Argelès-sur-Mer — 66700)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 42.5469,
    lon: 3.0236,
    notes: 'Dépt 66 · Point de prise en charge médicale du littoral sud (Argelès / Côte Vermeille).'
  },
  {
    id: 'po66-med-banyuls-helio',
    name: 'Centre Médical Hélio-Marin (Banyuls-sur-Mer — 66650)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 42.4836,
    lon: 3.1306,
    notes: 'Dépt 66 · Établissement médical sur la Côte Vermeille près de la frontière espagnole.'
  },

  // --- 66 : PLANS D'EAU, LACS & BARRAGES ---
  {
    id: 'po66-lake-villeneuve-raho',
    name: 'Plan d’Eau & Lac de Villeneuve-de-la-Raho (Sud Perpignan — 66180)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 42.6328,
    lon: 2.9125,
    notes: 'PLAN D’EAU / LAC (Dépt 66) : Vaste réserve d’eau douce de 215 hectares au sud de Perpignan (18 millions de m³). Toujours filtrer et faire bouillir avant boisson.'
  },
  {
    id: 'po66-lake-vinca',
    name: 'Lac du Barrage de Vinça — Retenue sur la Têt (Conflent — 66320)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 42.6508,
    lon: 2.5356,
    notes: 'PLAN D’EAU / LAC (Dépt 66) : Grande retenue d’eau douce de 24 millions de m³ alimentée par la Têt entre Perpignan et Prades. À filtrer et traiter.'
  },
  {
    id: 'po66-lake-caramany',
    name: 'Lac du Barrage de Caramany — Vallée de l’Agly (Fenouillèdes — 66720)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 42.7433,
    lon: 2.5708,
    notes: 'PLAN D’EAU / LAC (Dépt 66) : Grand lac de barrage d’eau douce (27 millions de m³) sur le fleuve Agly au nord-ouest de Rivesaltes/Estagel. Filtration + ébullition.'
  },
  {
    id: 'po66-lake-matemale',
    name: 'Lac de Matemale (Les Angles / Capcir — 66210, Alt. 1540 m)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 42.5789,
    lon: 2.1069,
    notes: 'PLAN D’EAU / LAC (Dépt 66) : Grand lac de montagne de 225 ha en forêt de la Matte (Capcir), traversé par l’Aude. Eau douce claire à filtrer/bouillir.'
  },
  {
    id: 'po66-lake-bouillouses',
    name: 'Lac des Bouillouses (Massif du Carlit — 66210, Alt. 2016 m)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 42.5678,
    lon: 1.9994,
    notes: 'PLAN D’EAU / LAC (Dépt 66) : Immense retenue d’eau pure de haute montagne pyrénéenne alimentant la Têt. Faire bouillir par sécurité pastorale.'
  },
  {
    id: 'po66-lake-puyvalador',
    name: 'Lac de Puyvalador (Capcir — 66210, Alt. 1420 m)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 42.6431,
    lon: 2.1167,
    notes: 'PLAN D’EAU / LAC (Dépt 66) : Retenue d’eau douce de 100 hectares dans le haut Capcir.'
  },
  {
    id: 'po66-lake-st-jean-pla-de-corts',
    name: 'Plans d’Eau de Saint-Jean-Pla-de-Corts (Vallespir / Boulou — 66490)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 42.5078,
    lon: 2.7858,
    notes: 'PLAN D’EAU / LAC (Dépt 66) : Deux grands plans d’eau douce en bordure du Tech entre Le Boulou et Céret. Filtration + désinfection obligatoires.'
  },
  {
    id: 'po66-lake-millas',
    name: 'Plan d’Eau de Millas (Vallée de la Têt — 66170)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 42.6872,
    lon: 2.6956,
    notes: 'PLAN D’EAU (Dépt 66) : Plan d’eau douce accessible à l’ouest de Perpignan près de la Têt. À filtrer et faire bouillir.'
  },
  {
    id: 'po66-lake-ille-sur-tet-tet',
    name: 'Plan d’Eau & Berges de la Têt (Ille-sur-Têt — 66130)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 42.6714,
    lon: 2.6208,
    notes: 'PLAN D’EAU / RIVIÈRE (Dépt 66) : Eau douce courante de la Têt et canaux d’arrosage du Roussillon. Toujours filtrer et traiter.'
  },

  // --- 66 : POINTS D'EAU POTABLE (VILLES & VILLAGES DU 66) ---
  {
    id: 'po66-wat-rivesaltes',
    name: 'Bornes-Fontaines d’Eau Potable — Place de la République & Allées Joffre (Rivesaltes — 66600)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.7692,
    lon: 2.8742,
    notes: 'Dépt 66 (66600) · Points d’eau potable publics au cœur de Rivesaltes.'
  },
  {
    id: 'po66-wat-perpignan-castillet',
    name: 'Fontaines d’Eau Potable du Castillet & Place de la République (Perpignan — 66000)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.6997,
    lon: 2.8947,
    notes: 'Dépt 66 · Points d’eau potable publics du centre historique de Perpignan.'
  },
  {
    id: 'po66-wat-canet',
    name: 'Bornes d’Eau Potable du Front de Mer & Village (Canet-en-Roussillon — 66140)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.7031,
    lon: 3.0075,
    notes: 'Dépt 66 · Bornes-fontaines d’eau potable publiques de Canet-en-Roussillon.'
  },
  {
    id: 'po66-wat-st-laurent-salanque',
    name: 'Bornes d’Eau Potable — Place de la Mairie (Saint-Laurent-de-la-Salanque — 66250)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.7739,
    lon: 2.9908,
    notes: 'Dépt 66 · Eau potable issue de la nappe profonde du Pliocène de la Salanque.'
  },
  {
    id: 'po66-wat-argeles-village',
    name: 'Fontaine d’Eau Potable — Place de la République (Argelès-sur-Mer Village — 66700)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.5461,
    lon: 3.0225,
    notes: 'Dépt 66 · Point d’eau potable public au cœur du vieux village d’Argelès-sur-Mer.'
  },
  {
    id: 'po66-wat-collioure',
    name: 'Bornes d’Eau Potable du Faubourg & du Boramar (Collioure — 66190)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.5264,
    lon: 3.0828,
    notes: 'Dépt 66 · Points d’eau potable publics dans le village côtier de Collioure.'
  },
  {
    id: 'po66-wat-ceret-neuf-jets',
    name: 'Fontaine des Neuf Jets & Bornes Potables — Place des Neuf Jets (Céret — 66400)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.4856,
    lon: 2.7475,
    notes: 'Dépt 66 · Célèbre fontaine centrale et bornes d’eau potable de Céret.'
  },
  {
    id: 'po66-wat-prades-republique',
    name: 'Fontaine de la Place de la République (Prades — 66500)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.6178,
    lon: 2.4231,
    notes: 'Dépt 66 · Eau potable de montagne distribuée sur la place centrale de Prades.'
  },
  {
    id: 'po66-wat-villefranche-conflent',
    name: 'Fontaines d’Eau Potable de la Cité Fortifiée (Villefranche-de-Conflent — 66500)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.5872,
    lon: 2.3683,
    notes: 'Dépt 66 · Points d’eau potable publics à l’intérieur des remparts Vauban.'
  },
  {
    id: 'po66-wat-castelnou',
    name: 'Borne d’Eau Potable du Village Médiéval (Castelnou — Aspres, 66300)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.6194,
    lon: 2.7028,
    notes: 'Dépt 66 · Point d’eau potable communal à l’entrée du village de Castelnou.'
  },
  {
    id: 'po66-wat-thuir',
    name: 'Fontaines d’Eau Potable de la Place de la République (Thuir — 66300)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.6325,
    lon: 2.7564,
    notes: 'Dépt 66 · Points d’eau potable communaux au centre de Thuir.'
  },
  {
    id: 'po66-wat-elne',
    name: 'Bornes d’Eau Potable de la Ville Haute / Cathédrale (Elne — 66200)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.5994,
    lon: 2.9714,
    notes: 'Dépt 66 · Points d’eau potable publics dans la cité d’Elne.'
  },
  {
    id: 'po66-wat-ille-sur-tet',
    name: 'Fontaines Publiques de la Place de la République (Ille-sur-Têt — 66130)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.6711,
    lon: 2.6203,
    notes: 'Dépt 66 · Fontaines d’eau potable historiques du vieux bourg d’Ille-sur-Têt.'
  },
  {
    id: 'po66-wat-font-romeu-ermitage',
    name: 'Source & Fontaine de l’Ermitage (Font-Romeu-Odeillo-Via — 66120, Alt. 1800 m)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.5125,
    lon: 2.0469,
    notes: 'Dépt 66 · Source d’eau de montagne historique de l’Ermitage de Font-Romeu.'
  },
  {
    id: 'po66-wat-mont-louis',
    name: 'Fontaines d’Eau Potable & Grand Puits de la Citadelle (Mont-Louis — 66210, Alt. 1600 m)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.5086,
    lon: 2.1219,
    notes: 'Dépt 66 · Eau potable de montagne au cœur de la citadelle Vauban de Mont-Louis.'
  },
  {
    id: 'po66-wat-prats-de-mollo',
    name: 'Fontaines d’Eau de Source du Firal (Prats-de-Mollo-la-Preste — Haut-Vallespir, 66230)',
    regionId: 'occitanie',
    type: 'water',
    lat: 42.4042,
    lon: 2.4792,
    notes: 'Dépt 66 · Eau de source pyrénéenne abondante au pied du Fort Lagarde.'
  },

  // --- 66 : ÉMETTEURS TDF (TÉLÉDIFFUSION DE FRANCE) ---
  {
    id: 'po66-tdf-neulos',
    name: 'Émetteur TDF du Pic de Neulos (Massif des Albères / Laroque-des-Albères — 66, Alt. 1256 m)',
    regionId: 'occitanie',
    type: 'radio',
    lat: 42.4822,
    lon: 2.9469,
    notes: 'ÉMETTEUR TDF PRINCIPAL DU 66 : Grand pylône TDF de 70 m au sommet des Albères. Couvre tout le Roussillon, Perpignan et la Côte Vermeille en FM/TNT/Radio d’urgence. Visible à 60 km pour s’orienter à la boussole.'
  },
  {
    id: 'po66-tdf-forca-real',
    name: 'Émetteur TDF du Piton de Força Réal (Millas / Montner — 66, Alt. 507 m)',
    regionId: 'occitanie',
    type: 'radio',
    lat: 42.7272,
    lon: 2.6994,
    notes: 'ÉMETTEUR TDF (Dépt 66) : Relais radio/télécom stratégique dominant toute la plaine du Roussillon, Rivesaltes, Perpignan et les vallées de la Têt et de l’Agly.'
  },
  {
    id: 'po66-tdf-madeloc',
    name: 'Relais Radio & Tour de Madeloc (Collioure / Port-Vendres — 66, Alt. 656 m)',
    regionId: 'occitanie',
    type: 'radio',
    lat: 42.4906,
    lon: 3.0750,
    notes: 'ÉMETTEUR TDF / RELAIS CÔTIER (Dépt 66) : Point haut radioélectrique et amer visuel majeur au-dessus de Collioure, Port-Vendres et Banyuls.'
  },
  {
    id: 'po66-tdf-font-romeu',
    name: 'Relais TDF de Cerdagne — Mont-Calme / Font-Romeu (66120, Alt. 2000 m)',
    regionId: 'occitanie',
    type: 'radio',
    lat: 42.5189,
    lon: 2.0361,
    notes: 'ÉMETTEUR TDF (Dépt 66) : Relais radio haute altitude couvrant le plateau de Cerdagne et le Capcir.'
  },

  // --- 66 : GRANDES FORÊTS & MASSIFS FORESTIERS ---
  {
    id: 'po66-for-massane',
    name: 'Forêt de la Massane & Massif des Albères (Argelès-sur-Mer / Sorède — 66)',
    regionId: 'occitanie',
    type: 'camp',
    lat: 42.4789,
    lon: 3.0239,
    notes: 'GRANDE FORÊT (Dépt 66) : Hêtraie ancienne classée UNESCO dans le massif des Albères, traversée par la rivière Massane (bois mort, abri naturel, eau de torrent à filtrer).'
  },
  {
    id: 'po66-for-alberes',
    name: 'Forêt Domaniale des Albères (Laroque-des-Albères / Col de l’Ouillat — 66)',
    regionId: 'occitanie',
    type: 'camp',
    lat: 42.4928,
    lon: 2.9158,
    notes: 'GRANDE FORÊT (Dépt 66) : Vaste massif forestier de chênes-lièges, châtaigniers et hêtres avec sources captées (Fontaine des Oiseaux / Chalet de l’Albère).'
  },
  {
    id: 'po66-for-canigou',
    name: 'Forêt Domaniale du Canigou (Vernet-les-Bains / Prades / Casteil — 66)',
    regionId: 'occitanie',
    type: 'camp',
    lat: 42.5364,
    lon: 2.4358,
    notes: 'GRANDE FORÊT (Dépt 66) : Grand massif forestier montagnard entourant le Pic du Canigou, riche en torrents d’eau douce, bois de chauffe et abris forestiers.'
  },
  {
    id: 'po66-for-boucheville',
    name: 'Forêt Domaniale de Boucheville (Sournia / Rabouillet — Fenouillèdes, 66)',
    regionId: 'occitanie',
    type: 'camp',
    lat: 42.7525,
    lon: 2.3886,
    notes: 'GRANDE FORÊT (Dépt 66) : L’un des plus grands massifs forestiers de hêtres et sapins des Pyrénées-Orientales, traversé par la Désix et jalonné de fontaines forestières.'
  },
  {
    id: 'po66-for-matte',
    name: 'Forêt Domaniale de la Matte (Matemale / Les Angles — Capcir, 66)',
    regionId: 'occitanie',
    type: 'camp',
    lat: 42.5819,
    lon: 2.1186,
    notes: 'GRANDE FORÊT (Dépt 66) : Grande forêt de pins sylvestres de 500 ha bordant le lac de Matemale à 1500 m d’altitude.'
  },
  {
    id: 'po66-for-font-romeu',
    name: 'Forêt Domaniale de Font-Romeu & Bolquère (Cerdagne — 66)',
    regionId: 'occitanie',
    type: 'camp',
    lat: 42.5236,
    lon: 2.0619,
    notes: 'GRANDE FORÊT (Dépt 66) : Vaste forêt de pins à crochets d’altitude dotée d’abris pastoraux et de ruisseaux de montagne.'
  },
  {
    id: 'po66-for-haut-vallespir',
    name: 'Forêts du Haut-Vallespir (Saint-Laurent-de-Cerdans / Prats-de-Mollo — 66)',
    regionId: 'occitanie',
    type: 'camp',
    lat: 42.3911,
    lon: 2.5856,
    notes: 'GRANDE FORÊT (Dépt 66) : Massifs de châtaigniers et de hêtres très boisés et riches en sources naturelles.'
  },

  // --- 66 : REFUGES DE MONTAGNE ---
  {
    id: 'po66-ref-cortalets',
    name: 'Refuge des Cortalets (Massif du Canigou — 66500, Alt. 2150 m)',
    regionId: 'occitanie',
    type: 'shelter',
    lat: 42.5333,
    lon: 2.4669,
    notes: 'REFUGE (Dépt 66) : Grand refuge FFCAM du Canigou avec source d’eau de montagne à proximité.'
  },
  {
    id: 'po66-ref-mariailles',
    name: 'Refuge de Mariailles (Casteil / Canigou — 66820, Alt. 1718 m)',
    regionId: 'occitanie',
    type: 'shelter',
    lat: 42.4956,
    lon: 2.4167,
    notes: 'REFUGE (Dépt 66) : Refuge forestier et montagnard sur le versant sud-ouest du Canigou.'
  },
  {
    id: 'po66-ref-bouillouses',
    name: 'Refuge des Bouillouses (FFCAM — Massif du Carlit, 66210, Alt. 2005 m)',
    regionId: 'occitanie',
    type: 'shelter',
    lat: 42.5642,
    lon: 2.0033,
    notes: 'REFUGE (Dépt 66) : Refuge de haute montagne au pied du barrage des Bouillouses.'
  },

  // ============================================================================
  // TOUS LES GRANDS ÉMETTEURS RADIO/TV TDF DE FRANCE (POINTS HAUTS STRATÉGIQUES)
  // ============================================================================
  {
    id: 'tdf-occ-pic-de-nore',
    name: 'Émetteur TDF du Pic de Nore (Montagne Noire — Aude 11 / Tarn 81, Alt. 1211 m)',
    regionId: 'occitanie',
    type: 'radio',
    lat: 43.4244,
    lon: 2.4628,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône TDF de 102 m couvrant Carcassonne, Narbonne, Béziers, Castres et le Lauragais. Point culminant de la Montagne Noire.'
  },
  {
    id: 'tdf-occ-mont-st-baudille',
    name: 'Émetteur TDF du Mont Saint-Baudille (Massif de la Séranne — Hérault 34, Alt. 848 m)',
    regionId: 'occitanie',
    type: 'radio',
    lat: 43.7336,
    lon: 3.5186,
    notes: 'ÉMETTEUR TDF MAJEUR : Grand pylône TDF couvrant Montpellier, Béziers, Sète, l’Hérault et le Gard.'
  },
  {
    id: 'tdf-occ-fortunio-lozere',
    name: 'Émetteur TDF du Truc de Fortunio (Mende / Margeride — Lozère 48, Alt. 1551 m)',
    regionId: 'occitanie',
    type: 'radio',
    lat: 44.6392,
    lon: 3.5150,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône haute altitude couvrant la Lozère, l’Aveyron et le Cantal.'
  },
  {
    id: 'tdf-occ-labastide-du-haut-mont',
    name: 'Émetteur TDF de Labastide-du-Haut-Mont (Lot 46 / Cantal 15, Alt. 784 m)',
    regionId: 'occitanie',
    type: 'radio',
    lat: 44.8347,
    lon: 2.1211,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône de 240 m couvrant le Lot, le Cantal, la Corrèze et le nord de l’Aveyron.'
  },
  {
    id: 'tdf-paca-grande-etoile',
    name: 'Émetteur TDF du Massif de l’Étoile (Marseille / Septèmes — 13, Alt. 590 m)',
    regionId: 'paca',
    type: 'radio',
    lat: 43.3853,
    lon: 5.4244,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône TDF de 148 m dominant Marseille, Aix-en-Provence et l’Étang de Berre.'
  },
  {
    id: 'tdf-paca-pic-de-l-ours',
    name: 'Émetteur TDF du Pic de l’Ours (Massif de l’Estérel / Saint-Raphaël — 83, Alt. 492 m)',
    regionId: 'paca',
    type: 'radio',
    lat: 43.4767,
    lon: 6.9044,
    notes: 'ÉMETTEUR TDF MAJEUR : Couvre toute la Côte d’Azur (Cannes, Antibes, Nice, Fréjus) et le Var.'
  },
  {
    id: 'tdf-paca-cap-sicie',
    name: 'Émetteur TDF du Cap Sicié (La Seyne-sur-Mer / Toulon — 83, Alt. 352 m)',
    regionId: 'paca',
    type: 'radio',
    lat: 43.0478,
    lon: 5.8553,
    notes: 'ÉMETTEUR TDF MAJEUR : Relais radio côtier stratégique couvrant la rade de Toulon et le littoral varois.'
  },
  {
    id: 'tdf-paca-mont-colombis',
    name: 'Émetteur TDF du Mont Colombis (Gap / Serre-Ponçon — Hautes-Alpes 05, Alt. 1733 m)',
    regionId: 'paca',
    type: 'radio',
    lat: 44.4961,
    lon: 6.2167,
    notes: 'ÉMETTEUR TDF MAJEUR : Sommet panoramique et relais radio principal des Alpes du Sud.'
  },
  {
    id: 'tdf-ara-mont-pilat',
    name: 'Émetteur TDF du Mont Pilat — Crêt de l’Œillon (Loire 42 / Rhône 69, Alt. 1364 m)',
    regionId: 'auvergne-rhone-alpes',
    type: 'radio',
    lat: 45.3886,
    lon: 4.6147,
    notes: 'ÉMETTEUR TDF MAJEUR : L’un des plus puissants émetteurs de France, couvrant Lyon, Saint-Étienne, Vienne, Valence et toute la vallée du Rhône.'
  },
  {
    id: 'tdf-ara-mont-du-chat',
    name: 'Émetteur TDF du Mont du Chat — Dent du Chat (Lac du Bourget / Savoie 73, Alt. 1496 m)',
    regionId: 'auvergne-rhone-alpes',
    type: 'radio',
    lat: 45.6639,
    lon: 5.8222,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône TDF dominant le Lac du Bourget, Chambéry, Aix-les-Bains et l’Avant-Pays savoyard.'
  },
  {
    id: 'tdf-ara-mont-rond-gex',
    name: 'Émetteur TDF du Mont Rond (Col de la Faucille / Pays de Gex — Ain 01, Alt. 1596 m)',
    regionId: 'auvergne-rhone-alpes',
    type: 'radio',
    lat: 46.3578,
    lon: 6.0008,
    notes: 'ÉMETTEUR TDF MAJEUR : Couvre le bassin lémanique, la Haute-Savoie et le massif du Jura.'
  },
  {
    id: 'tdf-naq-niort-maisonnay',
    name: 'Émetteur TDF de Niort-Maisonnay (Deux-Sèvres 79 — Pylône de 330 m)',
    regionId: 'nouvelle-aquitaine',
    type: 'radio',
    lat: 46.1917,
    lon: -0.0522,
    notes: 'ÉMETTEUR TDF GÉANT : L’une des plus hautes structures de France (330 m, même hauteur que la Tour Eiffel), couvrant Poitou-Charentes et Vendée.'
  },
  {
    id: 'tdf-naq-les-cars',
    name: 'Émetteur TDF des Cars (Haute-Vienne 87 / Limousin, Alt. 544 m)',
    regionId: 'nouvelle-aquitaine',
    type: 'radio',
    lat: 45.6661,
    lon: 1.0847,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône de 230 m couvrant Limoges, la Haute-Vienne, la Dordogne et la Charente.'
  },
  {
    id: 'tdf-naq-bordeaux-bouliac',
    name: 'Émetteur TDF de Bordeaux-Bouliac (Gironde 33)',
    regionId: 'nouvelle-aquitaine',
    type: 'radio',
    lat: 44.8211,
    lon: -0.4919,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône de 232 m couvrant toute la métropole bordelaise, le Médoc et le bassin d’Arcachon.'
  },
  {
    id: 'tdf-naq-audrix',
    name: 'Émetteur TDF d’Audrix (Périgord / Dordogne 24)',
    regionId: 'nouvelle-aquitaine',
    type: 'radio',
    lat: 44.8839,
    lon: 0.9467,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône couvrant les vallées de la Dordogne et de la Vézère.'
  },
  {
    id: 'tdf-cvl-allouis',
    name: 'Centre Émetteur National TDF d’Allouis (Mehun-sur-Yèvre — Cher 18)',
    regionId: 'centre-val-de-loire',
    type: 'radio',
    lat: 47.1694,
    lon: 2.2044,
    notes: 'CENTRE NATIONAL TDF : Site historique national de diffusion des signaux horaires légaux français (ALS162) et d’alerte d’État au centre de la France.'
  },
  {
    id: 'tdf-cvl-chissay',
    name: 'Émetteur TDF de Tours-Chissay (Loir-et-Cher 41 / Indre-et-Loire 37)',
    regionId: 'centre-val-de-loire',
    type: 'radio',
    lat: 47.3356,
    lon: 1.1489,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône de 200 m couvrant la vallée de la Loire, Tours et Blois.'
  },
  {
    id: 'tdf-pdl-mayet',
    name: 'Émetteur TDF du Mans-Mayet (Sarthe 72 — Pylône de 342 m)',
    regionId: 'pays-de-la-loire',
    type: 'radio',
    lat: 47.7628,
    lon: 0.2819,
    notes: 'PLUS HAUT PYLÔNE TDF DE FRANCE (342 m, plus haut que la Tour Eiffel) : Couvre la Sarthe, le Maine-et-Loire, l’Indre-et-Loire et l’Orne.'
  },
  {
    id: 'tdf-pdl-haute-goulaine',
    name: 'Émetteur TDF de Nantes-Haute-Goulaine (Loire-Atlantique 44)',
    regionId: 'pays-de-la-loire',
    type: 'radio',
    lat: 47.1886,
    lon: -1.4383,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône de 222 m couvrant Nantes, l’estuaire de la Loire et le nord de la Vendée.'
  },
  {
    id: 'tdf-bre-st-pern',
    name: 'Émetteur TDF de Rennes-Saint-Pern (Ille-et-Vilaine 35)',
    regionId: 'bretagne',
    type: 'radio',
    lat: 48.2764,
    lon: -1.9781,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône de 270 m couvrant Rennes, Saint-Malo, Dinan et la Haute-Bretagne.'
  },
  {
    id: 'tdf-bre-moustoir-ac',
    name: 'Émetteur TDF de Vannes-Moustoir-Ac (landes de Lanvaux — Morbihan 56)',
    regionId: 'bretagne',
    type: 'radio',
    lat: 47.8483,
    lon: -2.8511,
    notes: 'ÉMETTEUR TDF MAJEUR : Couvre tout le Morbihan, Vannes, Lorient et le golfe.'
  },
  {
    id: 'tdf-nor-mont-pincon',
    name: 'Émetteur TDF du Mont Pinçon (Suisse Normande — Calvados 14, Alt. 365 m)',
    regionId: 'normandie',
    type: 'radio',
    lat: 48.9722,
    lon: -0.6214,
    notes: 'ÉMETTEUR TDF MAJEUR : Point culminant du Calvados avec pylône de 220 m couvrant Caen, Bayeux, Vire et la Manche.'
  },
  {
    id: 'tdf-nor-grand-couronne',
    name: 'Émetteur TDF de Rouen-Grand-Couronne (Seine-Maritime 76)',
    regionId: 'normandie',
    type: 'radio',
    lat: 49.3547,
    lon: 1.0072,
    notes: 'ÉMETTEUR TDF MAJEUR : Couvre Rouen, la vallée de la Seine et l’Eure.'
  },
  {
    id: 'tdf-hdf-st-just',
    name: 'Émetteur TDF d’Amiens-Saint-Just-en-Chaussée (Oise 60 / Somme 80)',
    regionId: 'hauts-de-france',
    type: 'radio',
    lat: 49.5322,
    lon: 2.4267,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône de 203 m couvrant la Picardie, Amiens, Beauvais et Compiègne.'
  },
  {
    id: 'tdf-ges-luttange',
    name: 'Émetteur TDF de Metz-Luttange (Moselle 57)',
    regionId: 'grand-est',
    type: 'radio',
    lat: 49.2708,
    lon: 6.3183,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône de 245 m couvrant la Moselle, Metz, Thionville et le sillon lorrain.'
  },
  {
    id: 'tdf-ges-nordheim',
    name: 'Émetteur TDF de Strasbourg-Nordheim (Colline du Stephansberg — Bas-Rhin 67)',
    regionId: 'grand-est',
    type: 'radio',
    lat: 48.6369,
    lon: 7.4792,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône de 276 m couvrant Strasbourg et toute la plaine d’Alsace.'
  },
  {
    id: 'tdf-ges-hautvillers',
    name: 'Émetteur TDF de Reims-Hautvillers (Montagne de Reims — Marne 51)',
    regionId: 'grand-est',
    type: 'radio',
    lat: 49.0992,
    lon: 3.9378,
    notes: 'ÉMETTEUR TDF MAJEUR : Pylône de 245 m couvrant Reims, Épernay, Châlons et la Champagne.'
  },
  {
    id: 'tdf-bfc-nuits-st-georges',
    name: 'Émetteur TDF de Dijon-Nuits-Saint-Georges (Côte-d’Or 21)',
    regionId: 'bourgogne-franche-comte',
    type: 'radio',
    lat: 47.1436,
    lon: 4.9128,
    notes: 'ÉMETTEUR TDF MAJEUR : Couvre Dijon, Beaune, Chalon-sur-Saône et la plaine de la Saône.'
  },
  {
    id: 'tdf-bfc-lomont',
    name: 'Émetteur TDF du Lomont (Massif du Lomont — Doubs 25, Alt. 835 m)',
    regionId: 'bourgogne-franche-comte',
    type: 'radio',
    lat: 47.3519,
    lon: 6.6056,
    notes: 'ÉMETTEUR TDF MAJEUR : Couvre Besançon, Montbéliard, Belfort et le nord de la Franche-Comté.'
  },
  {
    id: 'tdf-cor-serra-di-pigno',
    name: 'Émetteur TDF de Serra di Pigno (Bastia / Cap Corse — Haute-Corse 2B, Alt. 960 m)',
    regionId: 'corse',
    type: 'radio',
    lat: 42.6958,
    lon: 9.4000,
    notes: 'ÉMETTEUR TDF MAJEUR : Sommet radioélectrique dominant Bastia, Saint-Florent et la plaine orientale corse.'
  },

  // ============================================================================
  // TOUS LES GRANDS LACS, PLANS D'EAU & BARRAGES DE FRANCE (RÉSERVES D'EAU DOUCE)
  // ============================================================================
  {
    id: 'lake-occ-pareloup',
    name: 'Lac de Pareloup (Plateau du Lévézou — Aveyron 12, Alt. 805 m)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 44.2058,
    lon: 2.7708,
    notes: 'PLAN D’EAU / GRAND LAC : 5e plus grand lac artificiel de France (1260 ha, 169 millions de m³ d’eau douce). Toujours filtrer et faire bouillir.'
  },
  {
    id: 'lake-occ-st-ferreol',
    name: 'Lac de Saint-Ferréol (Montagne Noire / Revel — 31/81/11)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 43.4419,
    lon: 2.0278,
    notes: 'PLAN D’EAU / LAC : Réservoir historique d’eau douce alimentant le Canal du Midi en lisière de forêt.'
  },
  {
    id: 'lake-occ-montbel',
    name: 'Lac de Montbel (Chalabre / Lavelanet — Ariège 09 & Aude 11)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 42.9711,
    lon: 1.9769,
    notes: 'PLAN D’EAU / LAC : Vaste retenue d’eau douce de 570 hectares au pied des Pyrénées ariégeoises et audoises.'
  },
  {
    id: 'lake-occ-raviege',
    name: 'Lac de la Raviège (La Salvetat-sur-Agout — Haut-Languedoc, Hérault 34)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 43.6114,
    lon: 2.6606,
    notes: 'PLAN D’EAU / LAC : Grand lac de barrage entouré de forêts dans les monts de Lacaune / Haut-Languedoc.'
  },
  {
    id: 'lake-occ-naussac',
    name: 'Lac de Naussac (Langogne — Lozère 48, Alt. 945 m)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 44.7169,
    lon: 3.8167,
    notes: 'PLAN D’EAU / GRAND LAC : Immense réserve d’eau douce de 1050 hectares (190 millions de m³) soutenant le cours de l’Allier.'
  },
  {
    id: 'lake-paca-sainte-croix',
    name: 'Lac de Sainte-Croix (Gorges du Verdon — Var 83 / Alpes-de-Haute-Provence 04)',
    regionId: 'paca',
    type: 'water-raw',
    lat: 43.7736,
    lon: 6.1889,
    notes: 'PLAN D’EAU / GRAND LAC : 3e plus grand lac de retenue de France (760 millions de m³ d’eau douce du Verdon).'
  },
  {
    id: 'lake-paca-st-cassien',
    name: 'Lac de Saint-Cassien (Pays de Fayence / Estérel — Var 83)',
    regionId: 'paca',
    type: 'water-raw',
    lat: 43.5950,
    lon: 6.8178,
    notes: 'PLAN D’EAU / LAC : Principale réserve stratégique d’eau douce de l’est du Var et des Alpes-Maritimes (60 millions de m³).'
  },
  {
    id: 'lake-paca-esparron-castillon',
    name: 'Lac d’Esparron-de-Verdon (Alpes-de-Haute-Provence 04)',
    regionId: 'paca',
    type: 'water-raw',
    lat: 43.7364,
    lon: 5.9686,
    notes: 'PLAN D’EAU / LAC : Retenue d’eau douce sur le bas Verdon alimentant le Canal de Provence.'
  },
  {
    id: 'lake-ara-bourget',
    name: 'Lac du Bourget (Aix-les-Bains / Chambéry — Savoie 73)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water-raw',
    lat: 45.7308,
    lon: 5.8686,
    notes: 'PLAN D’EAU / PLUS GRAND LAC NATUREL DE FRANCE : 18 km de long, 3,6 milliards de m³ d’eau douce.'
  },
  {
    id: 'lake-ara-leman-thonon',
    name: 'Lac Léman — Rive Française (Thonon-les-Bains / Évian — Haute-Savoie 74)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water-raw',
    lat: 46.3822,
    lon: 6.4792,
    notes: 'PLAN D’EAU / GRAND LAC ALPIN : Plus grande réserve d’eau douce d’Europe occidentale.'
  },
  {
    id: 'lake-ara-aiguebelette',
    name: 'Lac d’Aiguebelette (Avant-Pays Savoyard — Savoie 73)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water-raw',
    lat: 45.5542,
    lon: 5.7989,
    notes: 'PLAN D’EAU / LAC : Lac naturel d’eau douce protégé des moteurs thermiques.'
  },
  {
    id: 'lake-ara-grandval-garabit',
    name: 'Lac du Barrage de Grandval — Gorges de la Truyère (Cantal 15)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water-raw',
    lat: 44.9228,
    lon: 3.0958,
    notes: 'PLAN D’EAU / LAC : Grande retenue d’eau douce de 28 km de long dans le Cantal.'
  },
  {
    id: 'lake-naq-hourtin-carcans',
    name: 'Lac d’Hourtin et de Carcans (Médoc — Gironde 33)',
    regionId: 'nouvelle-aquitaine',
    type: 'water-raw',
    lat: 45.1464,
    lon: -1.1169,
    notes: 'PLAN D’EAU / GRAND LAC : Plus grand lac naturel d’eau douce entièrement situé en France (5667 ha).'
  },
  {
    id: 'lake-naq-cazaux-sanguinet',
    name: 'Lac de Cazaux et de Sanguinet (Gironde 33 / Landes 40)',
    regionId: 'nouvelle-aquitaine',
    type: 'water-raw',
    lat: 44.5042,
    lon: -1.1489,
    notes: 'PLAN D’EAU / GRAND LAC : 5500 hectares d’eau douce bordés par la forêt des Landes.'
  },
  {
    id: 'lake-naq-st-pardoux',
    name: 'Lac de Saint-Pardoux (Monts d’Ambazac — Haute-Vienne 87)',
    regionId: 'nouvelle-aquitaine',
    type: 'water-raw',
    lat: 46.0542,
    lon: 1.2819,
    notes: 'PLAN D’EAU / LAC : Plan d’eau douce de 330 hectares au nord de Limoges.'
  },
  {
    id: 'lake-ges-der-chantecoq',
    name: 'Lac du Der-Chantecoq (Saint-Dizier / Vitry-le-François — Marne 51 & Haute-Marne 52)',
    regionId: 'grand-est',
    type: 'water-raw',
    lat: 48.5678,
    lon: 4.7564,
    notes: 'PLAN D’EAU / PLUS GRAND LAC ARTIFICIEL DE FRANCE MÉTROPOLITAINE : 4800 hectares (350 millions de m³ d’eau douce).'
  },
  {
    id: 'lake-ges-orient',
    name: 'Lac de la Forêt d’Orient (Troyes — Aube 10)',
    regionId: 'grand-est',
    type: 'water-raw',
    lat: 48.2739,
    lon: 4.3319,
    notes: 'PLAN D’EAU / GRAND LAC : Réservoir d’eau douce de 2300 hectares au cœur du Parc naturel de la Forêt d’Orient.'
  },
  {
    id: 'lake-ges-madine',
    name: 'Lac de Madine (Meuse 55 / Meurthe-et-Moselle 54)',
    regionId: 'grand-est',
    type: 'water-raw',
    lat: 48.9225,
    lon: 5.7364,
    notes: 'PLAN D’EAU / LAC : Réserve stratégique d’eau potable de l’agglomération de Metz (1100 hectares, eau brute à traiter).'
  },
  {
    id: 'lake-bfc-vouglans',
    name: 'Lac de Vouglans (Vallée de l’Ain — Jura 39)',
    regionId: 'bourgogne-franche-comte',
    type: 'water-raw',
    lat: 46.4694,
    lon: 5.6681,
    notes: 'PLAN D’EAU / GRAND LAC : 35 km de long et 605 millions de m³ d’eau douce au cœur du massif du Jura.'
  },
  {
    id: 'lake-bfc-saint-point',
    name: 'Lac de Saint-Point — Lac de Malbuisson (Pontarlier — Doubs 25, Alt. 850 m)',
    regionId: 'bourgogne-franche-comte',
    type: 'water-raw',
    lat: 46.8114,
    lon: 6.3025,
    notes: 'PLAN D’EAU / LAC : L’un des plus grands lacs naturels d’altitude du Jura.'
  },
  {
    id: 'lake-bfc-panneciere',
    name: 'Lac de Pannecière (Massif du Morvan — Nièvre 58)',
    regionId: 'bourgogne-franche-comte',
    type: 'water-raw',
    lat: 47.1439,
    lon: 3.8736,
    notes: 'PLAN D’EAU / LAC : Plus grand lac du Morvan (520 ha) sur l’Yonne, entouré de forêts profondes.'
  },
  {
    id: 'lake-cvl-eguzon',
    name: 'Lac d’Éguzon — Lac de Chambon (Vallée de la Creuse — Indre 36)',
    regionId: 'centre-val-de-loire',
    type: 'water-raw',
    lat: 46.4408,
    lon: 1.6178,
    notes: 'PLAN D’EAU / LAC : Plus grand lac de la région Centre-Val de Loire (312 ha).'
  },
  {
    id: 'lake-pdl-maine-angers',
    name: 'Lac de Maine (Angers — Maine-et-Loire 49)',
    regionId: 'pays-de-la-loire',
    type: 'water-raw',
    lat: 47.4569,
    lon: -0.5928,
    notes: 'PLAN D’EAU / LAC : Plan d’eau douce de 220 hectares en bordure de la Maine.'
  },
  {
    id: 'lake-nor-rabodanges',
    name: 'Lac de Rabodanges — Gorges de l’Orne (Putanges-le-Lac — Orne 61)',
    regionId: 'normandie',
    type: 'water-raw',
    lat: 48.8031,
    lon: -0.2908,
    notes: 'PLAN D’EAU / LAC : Plus grand lac artificiel de Normandie (6 km de long en Suisse Normande).'
  },
  {
    id: 'lake-hdf-val-joly',
    name: 'Lac du Val-Joly ( Parc de l’Avesnois / Eppe-Sauvage — Nord 59)',
    regionId: 'hauts-de-france',
    type: 'water-raw',
    lat: 50.1186,
    lon: 4.1328,
    notes: 'PLAN D’EAU / LAC : Plus grand lac artificiel au nord de Paris (180 ha), entouré de bois.'
  },
  {
    id: 'lake-idf-jablines',
    name: 'Grand Lac de Jablines-Annet (Vallée de la Marne — Seine-et-Marne 77)',
    regionId: 'ile-de-france',
    type: 'water-raw',
    lat: 48.9128,
    lon: 2.7586,
    notes: 'PLAN D’EAU / LAC : Plans d’eau douce de 150 hectares à l’est de l’Île-de-France.'
  },
  {
    id: 'lake-cor-tolla',
    name: 'Lac de Tolla — Gorges du Prunelli (Corse-du-Sud 2A, Alt. 552 m)',
    regionId: 'corse',
    type: 'water-raw',
    lat: 41.9739,
    lon: 8.9694,
    notes: 'PLAN D’EAU / LAC : Principale retenue d’eau douce alimentant le bassin d’Ajaccio.'
  },

  // ============================================================================
  // TOUTES LES GRANDES FORÊTS DOMANIALES DE FRANCE (BOIS, ABRI & SOURCES)
  // ============================================================================
  {
    id: 'for-occ-montagne-noire',
    name: 'Forêt Domaniale de la Montagne Noire & du Haut-Languedoc (Aude 11 / Tarn 81)',
    regionId: 'occitanie',
    type: 'camp',
    lat: 43.4286,
    lon: 2.2156,
    notes: 'GRANDE FORÊT : Immense massif forestier de hêtres, chênes et conifères riche en ruisseaux d’eau douce.'
  },
  {
    id: 'for-occ-fanges',
    name: 'Forêt Domaniale des Fanges (Quillan / Puilaurens — Aude 11, Alt. 850 m)',
    regionId: 'occitanie',
    type: 'camp',
    lat: 42.8389,
    lon: 2.2756,
    notes: 'GRANDE FORÊT : Magnifique sapinière royale à la frontière de l’Aude (11) et des Pyrénées-Orientales (66).'
  },
  {
    id: 'for-occ-gresigne',
    name: 'Forêt Domaniale de Grésigne (Castelnau-de-Montmiral — Tarn 81)',
    regionId: 'occitanie',
    type: 'camp',
    lat: 44.0308,
    lon: 1.7519,
    notes: 'GRANDE FORÊT : Plus vaste chênaie du Sud-Ouest (3600 ha).'
  },
  {
    id: 'for-occ-aigoual',
    name: 'Forêt Domaniale de l’Aigoual (Parc National des Cévennes — Gard 30 / Lozère 48)',
    regionId: 'occitanie',
    type: 'camp',
    lat: 44.1186,
    lon: 3.5819,
    notes: 'GRANDE FORÊT : Vaste massif forestier cévenol de 16 000 hectares riche en sources de montagne.'
  },
  {
    id: 'for-occ-bouconne',
    name: 'Forêt Domaniale de Bouconne (Ouest de Toulouse — Haute-Garonne 31 / Gers 32)',
    regionId: 'occitanie',
    type: 'camp',
    lat: 43.6383,
    lon: 1.2189,
    notes: 'GRANDE FORÊT : Poumon forestier de 2700 hectares à proximité immédiate de l’agglomération toulousaine.'
  },
  {
    id: 'for-naq-landes',
    name: 'Massif Forestier des Landes de Gascogne (Sabres / Marquèze — Landes 40 & Gironde 33)',
    regionId: 'nouvelle-aquitaine',
    type: 'camp',
    lat: 44.1528,
    lon: -0.7856,
    notes: 'PLUS GRANDE FORÊT ARTIFICIELLE D’EUROPE (1 million d’hectares de pins maritimes et chênes, traversée par la Leyre).'
  },
  {
    id: 'for-naq-iraty',
    name: 'Forêt d’Iraty (Larrau / Mendive — Pyrénées-Atlantiques 64, Alt. 1300 m)',
    regionId: 'nouvelle-aquitaine',
    type: 'camp',
    lat: 43.0389,
    lon: -1.0742,
    notes: 'GRANDE FORÊT : Plus vaste hêtraie d’Europe occidentale (17 000 ha) au Pays Basque.'
  },
  {
    id: 'for-naq-double',
    name: 'Forêt de la Double (Échourgnac / Mussidan — Dordogne 24)',
    regionId: 'nouvelle-aquitaine',
    type: 'camp',
    lat: 45.1286,
    lon: 0.2519,
    notes: 'GRANDE FORÊT : Vaste région forestière parsemée de centaines d’étangs d’eau douce.'
  },
  {
    id: 'for-ara-troncais',
    name: 'Forêt Domaniale de Tronçais (Cérilly / Saint-Bonnet — Allier 03)',
    regionId: 'auvergne-rhone-alpes',
    type: 'camp',
    lat: 46.6522,
    lon: 2.6956,
    notes: 'GRANDE FORÊT : Plus belle futaie de chênes d’Europe (10 600 ha) avec 5 grands étangs et plus de 30 fontaines forestières.'
  },
  {
    id: 'for-ara-grande-chartreuse',
    name: 'Forêt Domaniale de la Grande Chartreuse (Saint-Pierre-de-Chartreuse — Isère 38)',
    regionId: 'auvergne-rhone-alpes',
    type: 'camp',
    lat: 45.3519,
    lon: 5.7986,
    notes: 'GRANDE FORÊT : Plus grande forêt domaniale des Alpes françaises (8500 ha), riche en torrents et sources.'
  },
  {
    id: 'for-ara-vercors-lente',
    name: 'Forêt Domaniale de Lente & Hauts Plateaux du Vercors (Drôme 26 / Isère 38)',
    regionId: 'auvergne-rhone-alpes',
    type: 'camp',
    lat: 44.9189,
    lon: 5.3186,
    notes: 'GRANDE FORÊT : Immense massif forestier de 17 000 hectares avec cabanes pastorales non gardées.'
  },
  {
    id: 'for-paca-sainte-baume',
    name: 'Forêt Domaniale de la Sainte-Baume (Plan-d’Aups — Var 83)',
    regionId: 'paca',
    type: 'camp',
    lat: 43.3328,
    lon: 5.7669,
    notes: 'GRANDE FORÊT : Forêt relique de hêtres et d’ifs millénaires en Provence, abritant les sources de l’Huveaune.'
  },
  {
    id: 'for-paca-esterel',
    name: 'Forêt Domaniale de l’Estérel (Saint-Raphaël / Mandelieu — Var 83 & 06)',
    regionId: 'paca',
    type: 'camp',
    lat: 43.4819,
    lon: 6.8639,
    notes: 'GRANDE FORÊT : Massif forestier volcanique côtier de 14 000 hectares.'
  },
  {
    id: 'for-bre-broceliande',
    name: 'Forêt de Brocéliande — Paimpont (Ille-et-Vilaine 35)',
    regionId: 'bretagne',
    type: 'camp',
    lat: 48.0189,
    lon: -2.1742,
    notes: 'GRANDE FORÊT : Plus grand massif forestier de Bretagne (9000 ha) avec étangs et sources.'
  },
  {
    id: 'for-pdl-berce',
    name: 'Forêt Domaniale de Bercé (Jupilles / Château-du-Loir — Sarthe 72)',
    regionId: 'pays-de-la-loire',
    type: 'camp',
    lat: 47.7989,
    lon: 0.3919,
    notes: 'GRANDE FORÊT : Joyau forestier de 5400 ha avec la source de l’Hermitière.'
  },
  {
    id: 'for-pdl-mervent',
    name: 'Massif Forestier de Mervent-Vouvant (Fontenay-le-Comte — Vendée 85)',
    regionId: 'pays-de-la-loire',
    type: 'camp',
    lat: 46.5356,
    lon: -0.7519,
    notes: 'GRANDE FORÊT : Plus grande forêt de Vendée (5000 ha) bordant la retenue d’eau de la Vendée.'
  },
  {
    id: 'for-nor-lyons',
    name: 'Forêt Domaniale de Lyons (Lyons-la-Forêt — Eure 27 / Seine-Maritime 76)',
    regionId: 'normandie',
    type: 'camp',
    lat: 49.4086,
    lon: 1.5019,
    notes: 'GRANDE FORÊT : L’une des plus grandes hêtraies d’Europe (10 700 ha).'
  },
  {
    id: 'for-hdf-compiegne',
    name: 'Forêt Domaniale de Compiègne (Compiègne / Pierrefonds — Oise 60)',
    regionId: 'hauts-de-france',
    type: 'camp',
    lat: 49.3836,
    lon: 2.9128,
    notes: 'GRANDE FORÊT : 14 400 hectares de chênes et hêtres entre l’Oise et l’Aisne.'
  },
  {
    id: 'for-hdf-mormal',
    name: 'Forêt Domaniale de Mormal (Le Quesnoy / Locquignol — Nord 59)',
    regionId: 'hauts-de-france',
    type: 'camp',
    lat: 50.2114,
    lon: 3.7486,
    notes: 'GRANDE FORÊT : Plus grand massif forestier du département du Nord (9163 ha).'
  },
  {
    id: 'for-idf-rambouillet',
    name: 'Forêt Domaniale de Rambouillet (Yvelines 78)',
    regionId: 'ile-de-france',
    type: 'camp',
    lat: 48.6689,
    lon: 1.8056,
    notes: 'GRANDE FORÊT : 14 000 hectares de forêt domaniale avec le réseau des Étangs de Hollande.'
  },
  {
    id: 'for-ges-haguenau',
    name: 'Forêt Indivise de Haguenau (Bas-Rhin 67)',
    regionId: 'grand-est',
    type: 'camp',
    lat: 48.8569,
    lon: 7.8125,
    notes: 'GRANDE FORÊT : 6e plus grande forêt de plaine de France (13 400 ha) au nord de Strasbourg.'
  },
  {
    id: 'for-ges-darney',
    name: 'Forêt Domaniale de Darney (Vosges 88 / Haute-Saône 70)',
    regionId: 'grand-est',
    type: 'camp',
    lat: 48.0656,
    lon: 6.0239,
    notes: 'GRANDE FORÊT : 15 000 hectares de chênes et hêtres abritant les sources de la Saône.'
  },
  {
    id: 'for-bfc-chaux',
    name: 'Forêt Domaniale de Chaux (Dole / Arc-et-Senans — Jura 39 & Doubs 25)',
    regionId: 'bourgogne-franche-comte',
    type: 'camp',
    lat: 47.0658,
    lon: 5.6989,
    notes: 'GRANDE FORÊT : 2e plus vaste forêt de feuillus de France après Orléans (20 500 ha), bordée par la Loue et le Doubs.'
  },
  {
    id: 'for-bfc-bertranges',
    name: 'Forêt Domaniale des Bertranges (La Charité-sur-Loire — Nièvre 58)',
    regionId: 'bourgogne-franche-comte',
    type: 'camp',
    lat: 47.1856,
    lon: 3.1058,
    notes: 'GRANDE FORÊT : 7600 hectares de chênaie avec plusieurs sources captées en forêt.'
  },
  {
    id: 'for-cor-vizzavona',
    name: 'Forêt Territoriale de Vizzavona (Vivario / Bocognano — Corse 2B/2A, Alt. 1163 m)',
    regionId: 'corse',
    type: 'camp',
    lat: 42.1156,
    lon: 9.1244,
    notes: 'GRANDE FORÊT : Grande forêt de pins laricio et de hêtres au centre de la Corse, traversée par les cascades des Anglais.'
  },
  {
    id: 'for-cor-aitone-ospedale',
    name: 'Forêt Territoriale de l’Ospédale & Barrage (Porto-Vecchio — Corse-du-Sud 2A, Alt. 950 m)',
    regionId: 'corse',
    type: 'camp',
    lat: 41.6625,
    lon: 9.1939,
    notes: 'GRANDE FORÊT & LAC : Massif de pins laricio et hêtres entourant le lac de barrage de l’Ospédale.'
  },

  // ============================================================================
  // CLINIQUES D'URGENCE & HÔPITAUX DÉPARTEMENTAUX COMPLÉMENTAIRES
  // ============================================================================
  {
    id: 'med-occ-narbonne-polyclinique',
    name: 'Hôpital Privé Le Languedoc — Polyclinique (Narbonne — Aude 11)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.1758,
    lon: 3.0089,
    notes: 'Dépt 11 · Clinique médico-chirurgicale avec service d’urgences à Narbonne.'
  },
  {
    id: 'med-occ-carcassonne-montreal',
    name: 'Polyclinique Montréal (Carcassonne — Aude 11)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.2147,
    lon: 2.3264,
    notes: 'Dépt 11 · Établissement chirurgical privé de Carcassonne.'
  },
  {
    id: 'med-occ-beziers-st-privat',
    name: 'Polyclinique Saint-Privat (Boujan-sur-Libron / Béziers — Hérault 34)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.3686,
    lon: 3.2458,
    notes: 'Dépt 34 · Pôle privé majeur du Biterrois avec urgences 24h/24, chirurgie et maternité.'
  },
  {
    id: 'med-occ-sete-ch',
    name: 'Hôpital Saint-Clair — Hôpitaux du Bassin de Thau (Sète — Hérault 34)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.4053,
    lon: 3.6819,
    notes: 'Dépt 34 · Centre hospitalier public avec service d’urgences 24h/24 à Sète.'
  },
  {
    id: 'med-occ-mtp-millenaire',
    name: 'Clinique du Millénaire (Montpellier — Hérault 34)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.6069,
    lon: 3.9142,
    notes: 'Dépt 34 · Urgences médico-chirurgicales 24h/24, cardiologie et neurochirurgie à Montpellier.'
  },
  {
    id: 'med-occ-mtp-st-roch',
    name: 'Polyclinique Saint-Roch (Montpellier — Hérault 34)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.5828,
    lon: 3.8769,
    notes: 'Dépt 34 · Grande polyclinique chirurgicale et maternité avec urgences 24h/24 au sud de Montpellier.'
  },
  {
    id: 'med-occ-nimes-grand-sud',
    name: 'Polyclinique Grand Sud (Nîmes — Gard 30)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.8161,
    lon: 4.3689,
    notes: 'Dépt 30 · Clinique privée de Nîmes avec accueil des urgences 24h/24.'
  },
  {
    id: 'med-occ-ales-ch',
    name: 'Centre Hospitalier Alès-Cévennes (Alès — Gard 30)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 44.1194,
    lon: 4.0989,
    notes: 'Dépt 30 · Hôpital généraliste couvrant le bassin d’Alès et les Cévennes.'
  },
  {
    id: 'med-occ-toulouse-pasteur',
    name: 'Clinique Pasteur (Toulouse — Haute-Garonne 31)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.5964,
    lon: 1.4192,
    notes: 'Dépt 31 · Grande clinique privée toulousaine avec service d’urgences 24h/24 et cardiologie.'
  },
  {
    id: 'med-occ-toulouse-union',
    name: 'Clinique de l’Union (Saint-Jean / Toulouse — Haute-Garonne 31)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.6669,
    lon: 1.5178,
    notes: 'Dépt 31 · Pôle hospitalier privé majeur au nord-est de Toulouse (Urgences 24h/24).'
  },
  {
    id: 'med-occ-ariege-chiva',
    name: 'Centre Hospitalier Intercommunal des Vallées de l’Ariège — CHIVA (Saint-Jean-de-Verges / Foix-Pamiers — 09)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.0258,
    lon: 1.6119,
    notes: 'Dépt 09 · Hôpital principal de l’Ariège entre Foix et Pamiers (Urgences 24h/24).'
  },
  {
    id: 'med-occ-st-girons-ch',
    name: 'Centre Hospitalier Ariège-Couserans (Saint-Girons — Ariège 09)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 42.9894,
    lon: 1.1356,
    notes: 'Dépt 09 · Hôpital public avec urgences 24h/24 couvrant l’ouest de l’Ariège.'
  },
  {
    id: 'med-occ-millau-ch',
    name: 'Centre Hospitalier de Millau (Aveyron 12)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 44.0989,
    lon: 3.0764,
    notes: 'Dépt 12 · Hôpital généraliste couvrant le Sud-Aveyron et le Larzac.'
  },
  {
    id: 'med-occ-lourdes-ch',
    name: 'Centre Hospitalier de Lourdes (Hautes-Pyrénées 65)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.0958,
    lon: -0.0442,
    notes: 'Dépt 65 · Hôpital public avec urgences à l’entrée des vallées des Gaves.'
  },
  {
    id: 'med-occ-auch-ch',
    name: 'Centre Hospitalier d’Auch en Gascogne (Gers 32)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.6419,
    lon: 0.5789,
    notes: 'Dépt 32 · Hôpital de référence du Gers avec urgences et SMUR.'
  },
  {
    id: 'med-occ-cahors-ch',
    name: 'Centre Hospitalier Jean-Rougier de Cahors (Lot 46)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 44.4519,
    lon: 1.4411,
    notes: 'Dépt 46 · Hôpital de référence du Lot avec urgences 24h/24.'
  },
  {
    id: 'med-occ-mende-ch',
    name: 'Hôpital Lozère — Site Vallès (Mende — Lozère 48)',
    regionId: 'occitanie',
    type: 'medical',
    lat: 44.5214,
    lon: 3.4925,
    notes: 'Dépt 48 · Centre hospitalier de référence de la Lozère avec urgences 24h/24.'
  }
];

