import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types/sentinel';
import { FRANCE_EXTENDED_POIS } from '../data/franceMapDatabase';
import L from 'leaflet';
import {
  Compass,
  Layers,
  CheckCircle,
  Footprints,
  Crosshair,
  Locate,
  Download,
  Trash2,
  Plus,
  Minus,
  Search,
  MapPin,
  Triangle,
  Target,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';

interface TacticalMapProps {
  language: Language;
}

export interface FrenchRegion {
  id: string;
  nameFr: string;
  nameEn: string;
  lat: number;
  lon: number;
  zoom: number;
}

export interface Waypoint {
  id: string;
  name: string;
  regionId: string;
  type: 'water' | 'water-raw' | 'shelter' | 'medical' | 'radio' | 'danger' | 'camp';
  lat: number;
  lon: number;
  notes?: string;
  isUserAdded?: boolean;
}

// 13 Official Metropolitan Regions of France + Whole France View
export const FRENCH_REGIONS: FrenchRegion[] = [
  { id: 'france', nameFr: '🇫🇷 France entière (Vue globale)', nameEn: '🇫🇷 All France (Global View)', lat: 46.6033, lon: 2.2000, zoom: 6 },
  { id: 'auvergne-rhone-alpes', nameFr: 'Auvergne-Rhône-Alpes', nameEn: 'Auvergne-Rhône-Alpes', lat: 45.5500, lon: 5.2000, zoom: 8 },
  { id: 'bourgogne-franche-comte', nameFr: 'Bourgogne-Franche-Comté', nameEn: 'Bourgogne-Franche-Comté', lat: 47.1500, lon: 5.2000, zoom: 8 },
  { id: 'bretagne', nameFr: 'Bretagne', nameEn: 'Brittany (Bretagne)', lat: 48.2000, lon: -2.9000, zoom: 8 },
  { id: 'centre-val-de-loire', nameFr: 'Centre-Val de Loire', nameEn: 'Centre-Val de Loire', lat: 47.5500, lon: 1.6500, zoom: 8 },
  { id: 'corse', nameFr: 'Corse', nameEn: 'Corsica (Corse)', lat: 42.1500, lon: 9.0800, zoom: 9 },
  { id: 'grand-est', nameFr: 'Grand Est', nameEn: 'Grand Est', lat: 48.5500, lon: 6.4000, zoom: 8 },
  { id: 'hauts-de-france', nameFr: 'Hauts-de-France', nameEn: 'Hauts-de-France', lat: 50.1000, lon: 2.8000, zoom: 8 },
  { id: 'ile-de-france', nameFr: 'Île-de-France', nameEn: 'Île-de-France (Paris)', lat: 48.7500, lon: 2.3500, zoom: 9 },
  { id: 'normandie', nameFr: 'Normandie', nameEn: 'Normandy (Normandie)', lat: 49.1200, lon: 0.1500, zoom: 8 },
  { id: 'nouvelle-aquitaine', nameFr: 'Nouvelle-Aquitaine', nameEn: 'Nouvelle-Aquitaine', lat: 44.7500, lon: 0.1500, zoom: 7 },
  { id: 'occitanie', nameFr: 'Occitanie', nameEn: 'Occitanie', lat: 43.5500, lon: 1.9500, zoom: 8 },
  { id: 'pays-de-la-loire', nameFr: 'Pays de la Loire', nameEn: 'Pays de la Loire', lat: 47.4700, lon: -0.8500, zoom: 8 },
  { id: 'paca', nameFr: 'Provence-Alpes-Côte d’Azur (PACA)', nameEn: 'Provence-Alpes-Côte d’Azur', lat: 43.9500, lon: 6.0500, zoom: 8 }
];

// 100% REAL, VERIFIED EXISTING LANDMARKS IN FRANCE (Zero fictional waypoints)
export const REAL_FRENCH_LANDMARKS: Waypoint[] = [
  // Auvergne-Rhône-Alpes
  {
    id: 'real-ara-chu-grenoble',
    name: 'CHU Grenoble Alpes (Hôpital Michallon)',
    regionId: 'auvergne-rhone-alpes',
    type: 'medical',
    lat: 45.1990,
    lon: 5.7418,
    notes: 'Centre hospitalier universitaire et Trauma Center de référence des Alpes (La Tronche).'
  },
  {
    id: 'real-ara-hcl-lyon',
    name: 'Hôpital Édouard-Herriot (HCL Lyon)',
    regionId: 'auvergne-rhone-alpes',
    type: 'medical',
    lat: 45.7439,
    lon: 4.8819,
    notes: 'Urgences médicales et chirurgicales majeures des Hospices Civils de Lyon.'
  },
  {
    id: 'real-ara-refuge-gouter',
    name: 'Refuge du Goûter (FFCAM — 3835 m)',
    regionId: 'auvergne-rhone-alpes',
    type: 'shelter',
    lat: 45.8511,
    lon: 6.8306,
    notes: 'Refuge haute montagne réel de la FFCAM sur le massif du Mont-Blanc (Saint-Gervais-les-Bains).'
  },
  {
    id: 'real-ara-lac-annecy',
    name: 'Lac d’Annecy (Réserve d’eau douce brute — À filtrer)',
    regionId: 'auvergne-rhone-alpes',
    type: 'water-raw',
    lat: 45.8625,
    lon: 6.1714,
    notes: 'EAU BRUTE NON POTABLE DIRECTEMENT : Lac alpin d’eau douce alimenté par les sources de montagne et le Boubioz. Filtration + ébullition/Micropur requis.'
  },
  {
    id: 'real-ara-puy-de-dome',
    name: 'Émetteur TDF du Puy de Dôme (1465 m)',
    regionId: 'auvergne-rhone-alpes',
    type: 'radio',
    lat: 45.7722,
    lon: 2.9642,
    notes: 'Point culminant de la chaîne des Puys avec pylône TDF de diffusion régionale.'
  },

  // Provence-Alpes-Côte d'Azur (PACA)
  {
    id: 'real-paca-timone',
    name: 'Hôpital de la Timone (AP-HM Marseille)',
    regionId: 'paca',
    type: 'medical',
    lat: 43.2896,
    lon: 5.4024,
    notes: 'Principal centre hospitalier universitaire d’urgence de Marseille.'
  },
  {
    id: 'real-paca-fontaine-vaucluse',
    name: 'Source de Fontaine-de-Vaucluse (Sorgue — Résurgence Brute)',
    regionId: 'paca',
    type: 'water-raw',
    lat: 43.9192,
    lon: 5.1319,
    notes: 'EAU BRUTE : Plus importante résurgence karstique de France métropolitaine (débit permanent). À filtrer et traiter avant boisson.'
  },
  {
    id: 'real-paca-serre-poncon',
    name: 'Lac de Serre-Ponçon (Hautes-Alpes — Retenue d’eau brute)',
    regionId: 'paca',
    type: 'water-raw',
    lat: 44.5067,
    lon: 6.3550,
    notes: 'EAU BRUTE : Retenue d’eau douce majeure sur la Durance et l’Ubaye. Filtration + désinfection obligatoires.'
  },
  {
    id: 'real-paca-ventoux',
    name: 'Sommet & Émetteur du Mont Ventoux (1910 m)',
    regionId: 'paca',
    type: 'radio',
    lat: 44.1740,
    lon: 5.2788,
    notes: 'Point haut stratégique et relais hertzien TDF couvrant la vallée du Rhône et la Provence.'
  },
  {
    id: 'real-paca-refuge-cayolle',
    name: 'Refuge de la Cayolle (Mercantour — 2326 m)',
    regionId: 'paca',
    type: 'shelter',
    lat: 44.2589,
    lon: 6.7439,
    notes: 'Refuge alpin FFCAM situé près du col de la Cayolle (Parc national du Mercantour).'
  },

  // Occitanie
  {
    id: 'real-occ-chu-purpan',
    name: 'CHU de Toulouse — Hôpital Purpan',
    regionId: 'occitanie',
    type: 'medical',
    lat: 43.6085,
    lon: 1.4018,
    notes: 'Centre hospitalier universitaire régional de Toulouse.'
  },
  {
    id: 'real-occ-pic-du-midi',
    name: 'Observatoire & Émetteur du Pic du Midi (2877 m)',
    regionId: 'occitanie',
    type: 'radio',
    lat: 42.9369,
    lon: 0.1411,
    notes: 'Observatoire astronomique et émetteur TDF haute altitude des Pyrénées.'
  },
  {
    id: 'real-occ-refuge-oulettes',
    name: 'Refuge des Oulettes de Gaube (Vignemale — 2151 m)',
    regionId: 'occitanie',
    type: 'shelter',
    lat: 42.7969,
    lon: -0.1453,
    notes: 'Refuge FFCAM au pied de la face nord du Vignemale (Cauterets).'
  },
  {
    id: 'real-occ-lac-salagou',
    name: 'Lac du Salagou (Hérault — Eau Brute)',
    regionId: 'occitanie',
    type: 'water-raw',
    lat: 43.6586,
    lon: 3.3769,
    notes: 'EAU BRUTE : Grand lac de retenue d’eau douce au cœur de l’Hérault (à filtrer et faire bouillir).'
  },

  // Nouvelle-Aquitaine
  {
    id: 'real-naq-chu-bordeaux',
    name: 'CHU de Bordeaux — Hôpital Pellegrin',
    regionId: 'nouvelle-aquitaine',
    type: 'medical',
    lat: 44.8304,
    lon: -0.6042,
    notes: 'Centre hospitalier universitaire majeur de Nouvelle-Aquitaine.'
  },
  {
    id: 'real-naq-refuge-ayous',
    name: 'Refuge d’Ayous (Pyrénées-Atlantiques — 1980 m)',
    regionId: 'nouvelle-aquitaine',
    type: 'shelter',
    lat: 42.8428,
    lon: -0.4911,
    notes: 'Refuge FFCAM face au Pic du Midi d’Ossau, au bord du lac Gentau.'
  },
  {
    id: 'real-naq-lac-vassiviere',
    name: 'Lac de Vassivière (Plateau de Millevaches — Eau Brute)',
    regionId: 'nouvelle-aquitaine',
    type: 'water-raw',
    lat: 45.8056,
    lon: 1.8842,
    notes: 'EAU BRUTE : L’un des plus grands lacs artificiels d’eau douce de France (filtration + ébullition obligatoires).'
  },
  {
    id: 'real-naq-la-rhune',
    name: 'Sommet & Émetteur TDF de La Rhune (905 m)',
    regionId: 'nouvelle-aquitaine',
    type: 'radio',
    lat: 43.3092,
    lon: -1.6353,
    notes: 'Sommet occidental des Pyrénées avec relais radio TDF couvrant la côte basque et les Landes.'
  },

  // Île-de-France
  {
    id: 'real-idf-pitie-salpetriere',
    name: 'Hôpital de la Pitié-Salpêtrière (AP-HP Paris)',
    regionId: 'ile-de-france',
    type: 'medical',
    lat: 48.8384,
    lon: 2.3646,
    notes: 'Plus grand groupe hospitalier universitaire de Paris (Urgences & Trauma Center).'
  },
  {
    id: 'real-idf-tour-eiffel',
    name: 'Tour Eiffel — Émetteur TDF National (330 m)',
    regionId: 'ile-de-france',
    type: 'radio',
    lat: 48.8584,
    lon: 2.2945,
    notes: 'Point géodésique et principal émetteur radio/télécommunications d’Île-de-France.'
  },
  {
    id: 'real-idf-fontainebleau',
    name: 'Forêt Domaniale de Fontainebleau (Gorges de Franchard)',
    regionId: 'ile-de-france',
    type: 'camp',
    lat: 48.4047,
    lon: 2.6331,
    notes: 'Vaste massif forestier domanial de 25 000 ha au sud de l’Île-de-France.'
  },

  // Bretagne
  {
    id: 'real-bre-chu-rennes',
    name: 'CHU de Rennes — Hôpital Pontchaillou',
    regionId: 'bretagne',
    type: 'medical',
    lat: 48.1206,
    lon: -1.6947,
    notes: 'Centre hospitalier universitaire de référence en Bretagne.'
  },
  {
    id: 'real-bre-lac-guerledan',
    name: 'Lac de Guerlédan (Mûr-de-Bretagne — Retenue d’eau brute)',
    regionId: 'bretagne',
    type: 'water-raw',
    lat: 48.1969,
    lon: -3.0189,
    notes: 'EAU BRUTE : Plus grand lac de retenue d’eau douce de Bretagne sur le Blavet (à filtrer et faire bouillir).'
  },
  {
    id: 'real-bre-roch-tredudon',
    name: 'Émetteur TDF de Roc’h Trédudon (Monts d’Arrée — 383 m)',
    regionId: 'bretagne',
    type: 'radio',
    lat: 48.4139,
    lon: -3.9086,
    notes: 'Crête culminante de Bretagne et pylône TDF couvrant le Finistère.'
  },

  // Normandie
  {
    id: 'real-nor-chu-rouen',
    name: 'CHU de Rouen — Hôpital Charles-Nicolle',
    regionId: 'normandie',
    type: 'medical',
    lat: 49.4408,
    lon: 1.1167,
    notes: 'Centre hospitalier universitaire principal de Normandie.'
  },
  {
    id: 'real-nor-signal-ecouves',
    name: 'Signal d’Écouves — Forêt Domaniale d’Écouves (413 m)',
    regionId: 'normandie',
    type: 'camp',
    lat: 48.5514,
    lon: 0.0369,
    notes: 'Point culminant de Normandie au cœur du massif forestier d’Écouves (Orne).'
  },

  // Hauts-de-France
  {
    id: 'real-hdf-chu-lille',
    name: 'CHU de Lille — Hôpital Roger-Salengro',
    regionId: 'hauts-de-france',
    type: 'medical',
    lat: 50.6106,
    lon: 3.0347,
    notes: 'Campus hospitalier universitaire majeur des Hauts-de-France.'
  },
  {
    id: 'real-hdf-bouvigny',
    name: 'Émetteur TDF de Bouvigny-Boyeffles (Colline d’Artois)',
    regionId: 'hauts-de-france',
    type: 'radio',
    lat: 50.4225,
    lon: 2.6586,
    notes: 'Pylône TDF de 307 m couvrant l’ensemble du bassin minier et de l’Artois.'
  },

  // Grand Est
  {
    id: 'real-ges-chu-strasbourg',
    name: 'Hôpitaux Universitaires de Strasbourg (Hautepierre)',
    regionId: 'grand-est',
    type: 'medical',
    lat: 48.5922,
    lon: 7.7056,
    notes: 'Pôle hospitalier universitaire d’urgence de Strasbourg.'
  },
  {
    id: 'real-ges-lac-gerardmer',
    name: 'Lac de Gérardmer (Massif des Vosges — Eau Brute)',
    regionId: 'grand-est',
    type: 'water-raw',
    lat: 48.0717,
    lon: 6.8542,
    notes: 'EAU BRUTE : Plus grand lac naturel des Vosges (origine glaciaire, 660 m). Filtration + ébullition obligatoires.'
  },
  {
    id: 'real-ges-grand-ballon',
    name: 'Sommet du Grand Ballon (Radar & Relais des Vosges — 1424 m)',
    regionId: 'grand-est',
    type: 'radio',
    lat: 47.9011,
    lon: 7.0983,
    notes: 'Point culminant du massif des Vosges avec station radar de l’aviation civile.'
  },

  // Bourgogne-Franche-Comté
  {
    id: 'real-bfc-chu-dijon',
    name: 'CHU Dijon Bourgogne (Hôpital François-Mitterrand)',
    regionId: 'bourgogne-franche-comte',
    type: 'medical',
    lat: 47.3197,
    lon: 5.0692,
    notes: 'Centre hospitalier universitaire de référence en Bourgogne.'
  },
  {
    id: 'real-bfc-source-lison',
    name: 'Source du Lison (Nans-sous-Sainte-Anne, Doubs — Résurgence Brute)',
    regionId: 'bourgogne-franche-comte',
    type: 'water-raw',
    lat: 46.9656,
    lon: 6.0117,
    notes: 'EAU BRUTE : Importante résurgence karstique du massif du Jura (filtration + traitement obligatoires).'
  },
  {
    id: 'real-bfc-lac-settons',
    name: 'Lac des Settons (Parc Naturel du Morvan — Eau Brute)',
    regionId: 'bourgogne-franche-comte',
    type: 'water-raw',
    lat: 47.1903,
    lon: 4.0583,
    notes: 'EAU BRUTE : Grand lac de retenue au cœur du massif forestier du Morvan (Nièvre). À filtrer et faire bouillir.'
  },

  // Pays de la Loire
  {
    id: 'real-pdl-chu-nantes',
    name: 'CHU de Nantes — Hôtel-Dieu',
    regionId: 'pays-de-la-loire',
    type: 'medical',
    lat: 47.2094,
    lon: -1.5536,
    notes: 'Centre hospitalier universitaire principal des Pays de la Loire.'
  },
  {
    id: 'real-pdl-lac-grand-lieu',
    name: 'Lac de Grand-Lieu (Loire-Atlantique — Eau Brute)',
    regionId: 'pays-de-la-loire',
    type: 'water-raw',
    lat: 47.0933,
    lon: -1.6669,
    notes: 'EAU BRUTE : L’un des plus grands lacs naturels de plaine français (filtration + ébullition obligatoires).'
  },

  // Centre-Val de Loire
  {
    id: 'real-cvl-chru-tours',
    name: 'CHRU de Tours — Hôpital Bretonneau',
    regionId: 'centre-val-de-loire',
    type: 'medical',
    lat: 47.3872,
    lon: 0.6675,
    notes: 'Centre hospitalier régional universitaire de Tours.'
  },
  {
    id: 'real-cvl-foret-orleans',
    name: 'Forêt Domaniale d’Orléans (Belvédère des Caillettes)',
    regionId: 'centre-val-de-loire',
    type: 'camp',
    lat: 47.9814,
    lon: 2.2478,
    notes: 'Plus vaste forêt domaniale de France métropolitaine (35 000 ha) avec point d’observation.'
  },

  // Corse
  {
    id: 'real-cor-ch-ajaccio',
    name: 'Centre Hospitalier d’Ajaccio (Miséricorde)',
    regionId: 'corse',
    type: 'medical',
    lat: 41.9267,
    lon: 8.7269,
    notes: 'Centre hospitalier de référence de Corse-du-Sud.'
  },
  {
    id: 'real-cor-refuge-ciottulu',
    name: 'Refuge de Ciottulu di i Mori (GR20 — 1991 m)',
    regionId: 'corse',
    type: 'shelter',
    lat: 42.3175,
    lon: 8.8789,
    notes: 'Plus haut refuge du Parc Naturel Régional de Corse au pied de la Paglia Orba.'
  },
  {
    id: 'real-cor-lac-nino',
    name: 'Lac de Nino (Source du Tavignano — 1743 m — Eau Brute)',
    regionId: 'corse',
    type: 'water-raw',
    lat: 42.2558,
    lon: 8.9408,
    notes: 'EAU BRUTE : Lac glaciaire d’eau douce et pozzines (présence de chevaux/troupeaux : faire bouillir ou traiter au Micropur).'
  }
];

export const TacticalMap: React.FC<TacticalMapProps> = ({ language }) => {
  const isFr = language === 'fr';

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const navLineRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const sightlinesRef = useRef<L.Polyline[]>([]);
  const clickedMarkerRef = useRef<L.Marker | null>(null);

  // Selected Region State (Default: France entière)
  const [selectedRegionId, setSelectedRegionId] = useState<string>(() => {
    try {
      return localStorage.getItem('sentinel_selected_region_v2') || 'france';
    } catch {
      return 'france';
    }
  });

  // Toggle whether real French landmarks are shown on the map
  const [showRealLandmarks, setShowRealLandmarks] = useState<boolean>(true);

  // Map theme defaults to OLED for Eco Power
  const [mapTheme, setMapTheme] = useState<'tactical-oled' | 'organic' | 'red-night'>('tactical-oled');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint | null>(null);

  // User Location
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(() => {
    try {
      const saved = localStorage.getItem('sentinel_user_location_v2');
      return saved ? JSON.parse(saved) : { lat: 46.6033, lon: 2.2000 };
    } catch {
      return { lat: 46.6033, lon: 2.2000 };
    }
  });

  const setUserLocationAndPersist = (coords: { lat: number; lon: number }) => {
    setUserLocation(coords);
    try {
      localStorage.setItem('sentinel_user_location_v2', JSON.stringify(coords));
    } catch {}
  };

  const [gpsTracking, setGpsTracking] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isAddingPoint, setIsAddingPoint] = useState<boolean>(false);
  const [newPointName, setNewPointName] = useState<string>('');
  const [newPointType, setNewPointType] = useState<Waypoint['type']>('water');
  const [newPointNotes, setNewPointNotes] = useState<string>('');
  const [currentCenter, setCurrentCenter] = useState<{ lat: number; lon: number }>({
    lat: 46.6033,
    lon: 2.2000
  });

  // Manual Position Placement States
  const [isPlacementPanelOpen, setIsPlacementPanelOpen] = useState<boolean>(false);
  const [isDirectPlacementActive, setIsDirectPlacementActive] = useState<boolean>(false);
  const [manualLatInput, setManualLatInput] = useState<string>(userLocation ? userLocation.lat.toString() : '46.6033');
  const [manualLonInput, setManualLonInput] = useState<string>(userLocation ? userLocation.lon.toString() : '2.2000');

  const isDirectPlacementActiveRef = useRef(isDirectPlacementActive);
  isDirectPlacementActiveRef.current = isDirectPlacementActive;
  const setUserLocationAndPersistRef = useRef(setUserLocationAndPersist);
  setUserLocationAndPersistRef.current = setUserLocationAndPersist;

  // Click-to-Add & Sidebar
  const [clickedCoord, setClickedCoord] = useState<{ lat: number; lon: number } | null>(null);
  const [sidebarTab, setSidebarTab] = useState<'inspector' | 'list'>('list');
  const [pointToast, setPointToast] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Pace counter
  const [userPaceLengthMeters] = useState<number>(1.5);
  const [pacesCount, setPacesCount] = useState<number>(100);

  // No-GPS Triangulation / Resection
  const [isTriangulating, setIsTriangulating] = useState<boolean>(false);
  const [triangMode, setTriangMode] = useState<'resection' | 'dead-reckoning'>('resection');
  const [triangPoint1Id, setTriangPoint1Id] = useState<string>(REAL_FRENCH_LANDMARKS[0].id);
  const [triangBearing1, setTriangBearing1] = useState<number>(315);
  const [triangPoint2Id, setTriangPoint2Id] = useState<string>(REAL_FRENCH_LANDMARKS[2].id);
  const [triangBearing2, setTriangBearing2] = useState<number>(45);
  const [triangResult, setTriangResult] = useState<{ lat: number; lon: number; note: string } | null>(null);

  // Dead reckoning
  const [deadStartPointId, setDeadStartPointId] = useState<string>(REAL_FRENCH_LANDMARKS[0].id);
  const [deadAzimuth, setDeadAzimuth] = useState<number>(90);
  const [deadDistanceMeters, setDeadDistanceMeters] = useState<number>(1000);

  // Zoom level & Dynamic Clustering state
  const [currentZoom, setCurrentZoom] = useState<number>(6);
  const [clusteringEnabled, setClusteringEnabled] = useState<boolean>(true);
  const [isScanningOsm, setIsScanningOsm] = useState<boolean>(false);

  // User-added custom waypoints persisted separately (Clean v2 storage — purged of any old fictional points)
  const [userWaypoints, setUserWaypoints] = useState<Waypoint[]>(() => {
    try {
      localStorage.removeItem('sentinel_offline_waypoints'); // Purge legacy fictional points
      const saved = localStorage.getItem('sentinel_user_waypoints_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cached OpenStreetMap (Overpass API) Drinking Water & Hospitals/Clinics points
  const [osmWaypoints, setOsmWaypoints] = useState<Waypoint[]>(() => {
    try {
      const saved = localStorage.getItem('sentinel_osm_water_hosp_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sentinel_user_waypoints_v2', JSON.stringify(userWaypoints));
    } catch {}
  }, [userWaypoints]);

  useEffect(() => {
    try {
      localStorage.setItem('sentinel_osm_water_hosp_v1', JSON.stringify(osmWaypoints));
    } catch {}
  }, [osmWaypoints]);

  // Combined active waypoints: user waypoints + OSM scanned points + real verified French landmarks & extended database
  const allWaypoints: Waypoint[] = [
    ...userWaypoints,
    ...osmWaypoints,
    ...(showRealLandmarks ? [...REAL_FRENCH_LANDMARKS, ...FRANCE_EXTENDED_POIS] : [])
  ];

  // Filtered by selected region & category & search
  const visibleWaypoints = allWaypoints.filter(wp => {
    const matchesRegion =
      selectedRegionId === 'france' || wp.isUserAdded || wp.regionId === 'osm' || wp.regionId === selectedRegionId;
    const matchesCat =
      activeFilter === 'all' ||
      (activeFilter === 'all-water' && (wp.type === 'water' || wp.type === 'water-raw')) ||
      wp.type === activeFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      wp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (wp.notes && wp.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesCat && matchesSearch;
  });

  // Scan OpenStreetMap (Overpass API) in the current map bounds for ALL village/town drinking water + non-potable water (fountains, wells, springs, lavoirs) + hospitals & clinics
  const handleScanOsmWaterAndHospitals = async () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    setIsScanningOsm(true);
    try {
      const bounds = map.getBounds();
      // Clamp bounding box around center so Overpass responds rapidly across villages and towns
      const center = map.getCenter();
      const s = Math.max(bounds.getSouth(), center.lat - 0.65);
      const n = Math.min(bounds.getNorth(), center.lat + 0.65);
      const w = Math.max(bounds.getWest(), center.lng - 0.85);
      const e = Math.min(bounds.getEast(), center.lng + 0.85);

      const query = `[out:json][timeout:22];(
        node["amenity"="drinking_water"](${s},${w},${n},${e});
        node["drinking_water"="yes"](${s},${w},${n},${e});
        node["man_made"="water_tap"]["drinking_water"!="no"](${s},${w},${n},${e});
        node["amenity"="fountain"](${s},${w},${n},${e});
        node["natural"="spring"](${s},${w},${n},${e});
        node["man_made"="water_well"](${s},${w},${n},${e});
        node["amenity"="watering_place"](${s},${w},${n},${e});
        node["drinking_water"="no"](${s},${w},${n},${e});
        node["amenity"="hospital"](${s},${w},${n},${e});
        way["amenity"="hospital"](${s},${w},${n},${e});
        node["amenity"="clinic"](${s},${w},${n},${e});
        way["amenity"="clinic"](${s},${w},${n},${e});
      );out center 500;`;

      const res = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: `data=${encodeURIComponent(query)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      if (!res.ok) throw new Error('Overpass HTTP error');
      const data = await res.json();
      const elements = Array.isArray(data.elements) ? data.elements : [];

      const fetched: Waypoint[] = [];
      elements.forEach((el: any) => {
        const lat = el.lat ?? el.center?.lat;
        const lon = el.lon ?? el.center?.lon;
        if (typeof lat !== 'number' || typeof lon !== 'number') return;

        const tags = el.tags || {};
        const amenity = tags.amenity;
        const manMade = tags.man_made;
        const natural = tags.natural;
        const dwTag = tags.drinking_water;

        const isHospitalOrClinic = amenity === 'hospital' || amenity === 'clinic';
        const isClinic = amenity === 'clinic';

        // Determine if Potable ('water') vs Non-Potable / Raw ('water-raw')
        const isPotableWater =
          !isHospitalOrClinic &&
          dwTag !== 'no' &&
          (amenity === 'drinking_water' || dwTag === 'yes' || manMade === 'water_tap');

        const isRawWater = !isHospitalOrClinic && !isPotableWater;

        const rawName = tags.name || tags['name:fr'] || tags.town || tags.village;

        let name = '';
        if (rawName) {
          name = isRawWater && !rawName.toLowerCase().includes('non potable')
            ? `${rawName} (${isFr ? 'Eau brute / À traiter' : 'Raw water'})`
            : rawName;
        } else if (isPotableWater) {
          name = isFr
            ? `Borne / Fontaine d’eau potable (${lat.toFixed(3)}°N)`
            : `Public Drinking Water (${lat.toFixed(3)}°N)`;
        } else if (isRawWater) {
          const kindFr =
            natural === 'spring'
              ? 'Source naturelle brute'
              : manMade === 'water_well'
              ? 'Puits communal / rural'
              : amenity === 'watering_place'
              ? 'Lavoir / Bassin de village'
              : 'Fontaine de village (Non contrôlée)';
          name = isFr
            ? `${kindFr} (${lat.toFixed(3)}°N)`
            : `Raw / Non-Potable Water (${lat.toFixed(3)}°N)`;
        } else if (isClinic) {
          name = isFr ? `Clinique médicale (${lat.toFixed(3)}°N)` : `Medical Clinic (${lat.toFixed(3)}°N)`;
        } else {
          name = isFr ? `Centre Hospitalier (${lat.toFixed(3)}°N)` : `General Hospital (${lat.toFixed(3)}°N)`;
        }

        fetched.push({
          id: `osm-${el.type}-${el.id}`,
          name,
          regionId: 'osm',
          type: isPotableWater ? 'water' : isRawWater ? 'water-raw' : 'medical',
          lat: Number(lat.toFixed(5)),
          lon: Number(lon.toFixed(5)),
          notes: isPotableWater
            ? '💧 EAU POTABLE : Borne ou fontaine d’eau potable de commune/village recensée OpenStreetMap France (sauvegardée hors-ligne).'
            : isRawWater
            ? '🚰 EAU NON POTABLE / BRUTE : Fontaine de village, lavoir, puits rural ou source non contrôlée. Filtration + ébullition (1 min) ou Micropur/Javel obligatoires avant boisson.'
            : isClinic
            ? '🏥 Clinique recensée OpenStreetMap France (sauvegardée hors-ligne).'
            : '🏥 Hôpital recensé OpenStreetMap France (sauvegardé hors-ligne).'
        });
      });

      setOsmWaypoints(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const existingBuiltinCoords = new Set(
          [...REAL_FRENCH_LANDMARKS, ...FRANCE_EXTENDED_POIS].map(
            p => `${p.lat.toFixed(3)}_${p.lon.toFixed(3)}`
          )
        );
        const uniqueNew = fetched.filter(
          f =>
            !existingIds.has(f.id) &&
            !existingBuiltinCoords.has(`${f.lat.toFixed(3)}_${f.lon.toFixed(3)}`)
        );
        const merged = [...prev, ...uniqueNew];
        const newPotable = uniqueNew.filter(u => u.type === 'water').length;
        const newRaw = uniqueNew.filter(u => u.type === 'water-raw').length;
        const newMed = uniqueNew.filter(u => u.type === 'medical').length;
        setPointToast(
          isFr
            ? `+${uniqueNew.length} points ajoutés (${newPotable} 💧 potables · ${newRaw} 🚰 non-potables · ${newMed} 🏥 soins)`
            : `+${uniqueNew.length} points cached (${newPotable} potable · ${newRaw} raw water · ${newMed} medical)`
        );
        setTimeout(() => setPointToast(null), 4000);
        return merged;
      });
    } catch {
      setPointToast(
        isFr
          ? 'Mode Hors-Ligne actif : affichage des points d’eau potable (💧), non potable (🚰) et hôpitaux (🏥) de la base nationale.'
          : 'Offline mode active: displaying built-in national potable/non-potable water points & hospitals.'
      );
      setTimeout(() => setPointToast(null), 3500);
    } finally {
      setIsScanningOsm(false);
    }
  };

  // Handle Region Change from Dropdown
  const handleSelectRegion = (regionId: string) => {
    setSelectedRegionId(regionId);
    try {
      localStorage.setItem('sentinel_selected_region_v2', regionId);
    } catch {}

    const region = FRENCH_REGIONS.find(r => r.id === regionId);
    if (region && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([region.lat, region.lon], region.zoom, { duration: 1.0 });
      setCurrentCenter({ lat: region.lat, lon: region.lon });
      setCurrentZoom(region.zoom);
    }
  };

  // Coordinate conversion helper
  const toDms = (val: number, isLat: boolean): string => {
    const absVal = Math.abs(val);
    const deg = Math.floor(absVal);
    const minFloat = (absVal - deg) * 60;
    const min = Math.floor(minFloat);
    const sec = Math.round((minFloat - min) * 60);
    const dir = isLat ? (val >= 0 ? 'N' : 'S') : (val >= 0 ? 'E' : 'W');
    return `${deg}°${min}'${sec}"${dir}`;
  };

  // Distance & Bearing calculations
  const calculateNav = (fromLat: number, fromLon: number, toLat: number, toLon: number) => {
    const R = 6371;
    const dLat = ((toLat - fromLat) * Math.PI) / 180;
    const dLon = ((toLon - fromLon) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((fromLat * Math.PI) / 180) *
        Math.cos((toLat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceKm = R * c;
    const distanceMeters = Math.round(distanceKm * 1000);

    const y = Math.sin(dLon) * Math.cos((toLat * Math.PI) / 180);
    const x =
      Math.cos((fromLat * Math.PI) / 180) * Math.sin((toLat * Math.PI) / 180) -
      Math.sin((fromLat * Math.PI) / 180) *
        Math.cos((toLat * Math.PI) / 180) *
        Math.cos(dLon);
    let brng = (Math.atan2(y, x) * 180) / Math.PI;
    brng = Math.round((brng + 360) % 360);

    const minutesWalk = Math.round((distanceKm / 4.0) * 60);

    return { distanceKm, distanceMeters, bearing: brng, minutesWalk };
  };

  const getCompassRose = (deg: number) => {
    const points = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return points[Math.round(deg / 22.5) % 16];
  };

  // INITIALIZE LEAFLET MAP
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialRegion = FRENCH_REGIONS.find(r => r.id === selectedRegionId) || FRENCH_REGIONS[0];
      setCurrentZoom(initialRegion.zoom);

      const map = L.map(mapContainerRef.current, {
        center: [initialRegion.lat, initialRegion.lon],
        zoom: initialRegion.zoom,
        zoomControl: false,
        attributionControl: false
      });

      const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        crossOrigin: true
      });

      tileLayer.addTo(map);

      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;

      map.on('move', () => {
        const c = map.getCenter();
        setCurrentCenter({
          lat: parseFloat(c.lat.toFixed(5)),
          lon: parseFloat(c.lng.toFixed(5))
        });
      });

      map.on('zoomend', () => {
        setCurrentZoom(map.getZoom());
      });

      map.on('click', (e: L.LeafletMouseEvent) => {
        const lat = parseFloat(e.latlng.lat.toFixed(5));
        const lon = parseFloat(e.latlng.lng.toFixed(5));
        setCurrentCenter({ lat, lon });

        if (isDirectPlacementActiveRef.current) {
          setUserLocationAndPersistRef.current({ lat, lon });
          setIsDirectPlacementActive(false);
          setClickedCoord(null);
          setPointToast(
            isFr
              ? `Position fixée : ${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`
              : `Location set: ${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E`
          );
          setTimeout(() => setPointToast(null), 3000);
          return;
        }

        setClickedCoord({ lat, lon });
      });

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Render temporary clicked pin
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (clickedMarkerRef.current) {
      map.removeLayer(clickedMarkerRef.current);
      clickedMarkerRef.current = null;
    }

    if (clickedCoord) {
      const pinIcon = L.divIcon({
        className: 'sentinel-pending-pin',
        html: `
          <div style="width: 24px; height: 24px; border-radius: 50%; background: #f59e0b; border: 2px solid #ffffff; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #000; font-weight: bold;">📍</div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const pMarker = L.marker([clickedCoord.lat, clickedCoord.lon], { icon: pinIcon }).addTo(map);
      pMarker.on('click', () => {
        setIsAddingPoint(true);
        setSidebarTab('inspector');
      });
      clickedMarkerRef.current = pMarker;
    }
  }, [clickedCoord]);

  // Render Waypoints (with Dynamic Zoom Clustering) & Navigation Line
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    const createCustomIcon = (type: Waypoint['type'], isSelected: boolean) => {
      const bgColors = {
        water: '#0284c7',
        'water-raw': '#0d9488',
        shelter: '#d97706',
        medical: '#e11d48',
        radio: '#4f46e5',
        danger: '#dc2626',
        camp: '#059669'
      };

      const color = bgColors[type] || '#f59e0b';
      const border = isSelected
        ? 'border: 3px solid #ffffff; box-shadow: 0 0 10px #f59e0b;'
        : 'border: 2px solid #ffffff;';

      return L.divIcon({
        className: 'sentinel-map-marker',
        html: `
          <div style="background-color: ${color}; ${border} width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 12px; font-weight: bold; cursor: pointer;">
            ${type === 'water' ? '💧' : type === 'water-raw' ? '🚰' : type === 'shelter' ? '🏕️' : type === 'medical' ? '🏥' : type === 'radio' ? '📡' : type === 'danger' ? '⚠️' : '🌲'}
          </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });
    };

    const renderSingleWaypoint = (wp: Waypoint) => {
      const isSelected = selectedWaypoint?.id === wp.id;
      const marker = L.marker([wp.lat, wp.lon], {
        icon: createCustomIcon(wp.type, isSelected)
      });

      marker.on('click', () => {
        setSelectedWaypoint(wp);
        setClickedCoord(null);
        setSidebarTab('inspector');
      });

      marker.bindTooltip(`<b>${wp.name}</b>`, {
        direction: 'top',
        offset: [0, -12]
      });

      markersLayer.addLayer(marker);
    };

    // DYNAMIC SPATIAL CLUSTERING BY ZOOM LEVEL (Regroupement progressif au fur et à mesure du zoom : Eau Potable 💧 + Eau Non Potable 🚰 + Hôpitaux 🏥)
    if (clusteringEnabled && currentZoom < 12) {
      // Cell size in degrees shrinks by half on every zoom step
      const cellSizeDeg = 44 / Math.pow(2, currentZoom);
      const gridClusters = new Map<string, Waypoint[]>();

      visibleWaypoints.forEach(wp => {
        // Always keep the currently selected waypoint unclustered so the user sees its exact pin
        if (selectedWaypoint && selectedWaypoint.id === wp.id) {
          renderSingleWaypoint(wp);
          return;
        }
        const gx = Math.floor(wp.lon / cellSizeDeg);
        const gy = Math.floor(wp.lat / cellSizeDeg);
        const key = `${gx}_${gy}`;
        const list = gridClusters.get(key);
        if (list) {
          list.push(wp);
        } else {
          gridClusters.set(key, [wp]);
        }
      });

      gridClusters.forEach(group => {
        if (group.length === 1) {
          renderSingleWaypoint(group[0]);
        } else {
          // Compute centroid of cluster
          const avgLat = group.reduce((s, p) => s + p.lat, 0) / group.length;
          const avgLon = group.reduce((s, p) => s + p.lon, 0) / group.length;
          const waterCount = group.filter(p => p.type === 'water').length;
          const rawWaterCount = group.filter(p => p.type === 'water-raw').length;
          const totalWaterCount = waterCount + rawWaterCount;
          const medCount = group.filter(p => p.type === 'medical').length;

          // Determine primary cluster badge color
          const badgeBg =
            totalWaterCount > 0 && medCount > 0
              ? 'linear-gradient(135deg, #0284c7 0%, #0d9488 50%, #e11d48 100%)'
              : waterCount > 0 && rawWaterCount > 0
              ? 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)'
              : waterCount > 0
              ? '#0284c7'
              : rawWaterCount > 0
              ? '#0d9488'
              : medCount > 0
              ? '#e11d48'
              : '#d97706';

          const subLabel = [
            waterCount > 0 ? `💧${waterCount}` : '',
            rawWaterCount > 0 ? `🚰${rawWaterCount}` : '',
            medCount > 0 ? `🏥${medCount}` : ''
          ]
            .filter(Boolean)
            .join(' ');

          const clusterIcon = L.divIcon({
            className: 'sentinel-cluster-marker',
            html: `
              <div style="background: ${badgeBg}; border: 2.5px solid #ffffff; box-shadow: 0 2px 10px rgba(0,0,0,0.65); min-width: 48px; height: 40px; padding: 0 8px; border-radius: 999px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ffffff; font-family: monospace; cursor: pointer; line-height: 1.05;">
                <span style="font-size: 12px; font-weight: 900;">${group.length}</span>
                ${
                  subLabel
                    ? `<span style="font-size: 9px; font-weight: 700; opacity: 0.95; white-space: nowrap;">${subLabel}</span>`
                    : ''
                }
              </div>
            `,
            iconSize: [54, 40],
            iconAnchor: [27, 20]
          });

          const cMarker = L.marker([avgLat, avgLon], {
            icon: clusterIcon,
            zIndexOffset: 500
          });

          const previewNames = group
            .slice(0, 5)
            .map(p => `• ${p.type === 'water' ? '💧' : p.type === 'water-raw' ? '🚰' : p.type === 'medical' ? '🏥' : '📍'} ${p.name}`)
            .join('<br/>');
          const moreCount = group.length > 5 ? `<br/><i>+ ${group.length - 5} autres points (cliquer pour zoomer)</i>` : '';

          cMarker.bindTooltip(
            `<b>Groupe de ${group.length} points</b> (${waterCount} 💧 eau potable · ${rawWaterCount} 🚰 eau non potable/à traiter · ${medCount} 🏥 soins)<br/>${previewNames}${moreCount}`,
            { direction: 'top', offset: [0, -16] }
          );

          cMarker.on('click', () => {
            const targetZoom = Math.min(13, currentZoom + 2);
            map.flyTo([avgLat, avgLon], targetZoom, { duration: 0.7 });
          });

          markersLayer.addLayer(cMarker);
        }
      });
    } else {
      visibleWaypoints.forEach(wp => renderSingleWaypoint(wp));
    }

    // User Location Pin
    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'sentinel-user-marker',
        html: `
          <div style="width: 18px; height: 18px; border-radius: 50%; background: #2563eb; border: 2.5px solid #ffffff; display: flex; align-items: center; justify-content: center; color: white; font-size: 9px; font-weight: bold; cursor: grab;">▲</div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });

      const uMarker = L.marker([userLocation.lat, userLocation.lon], {
        icon: userIcon,
        draggable: true,
        zIndexOffset: 1000
      });

      uMarker.bindTooltip(
        `<b>${isFr ? 'Votre Position' : 'Your Position'}</b><br/>${userLocation.lat.toFixed(4)}°N, ${userLocation.lon.toFixed(4)}°E`,
        { direction: 'top', offset: [0, -10] }
      );

      uMarker.on('dragend', (e: any) => {
        const pos = e.target.getLatLng();
        const lat = parseFloat(pos.lat.toFixed(5));
        const lon = parseFloat(pos.lng.toFixed(5));
        setUserLocationAndPersist({ lat, lon });
        setManualLatInput(lat.toString());
        setManualLonInput(lon.toString());
      });

      markersLayer.addLayer(uMarker);
      userMarkerRef.current = uMarker;
    }

    if (navLineRef.current) {
      map.removeLayer(navLineRef.current);
      navLineRef.current = null;
    }

    if (userLocation && selectedWaypoint) {
      const line = L.polyline(
        [
          [userLocation.lat, userLocation.lon],
          [selectedWaypoint.lat, selectedWaypoint.lon]
        ],
        {
          color: '#f59e0b',
          weight: 2.5,
          dashArray: '6, 6',
          opacity: 0.9
        }
      ).addTo(map);

      navLineRef.current = line;
    }
  }, [visibleWaypoints, selectedWaypoint, userLocation, isFr, currentZoom, clusteringEnabled]);

  // Hardware GPS Trigger
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setGpsError(isFr ? 'Capteur GPS non disponible sur cet appareil.' : 'Hardware GPS not supported.');
      return;
    }
    setGpsTracking(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = parseFloat(pos.coords.latitude.toFixed(5));
        const lon = parseFloat(pos.coords.longitude.toFixed(5));
        setUserLocationAndPersist({ lat, lon });
        setManualLatInput(lat.toString());
        setManualLonInput(lon.toString());
        setGpsTracking(false);
        mapInstanceRef.current?.flyTo([lat, lon], 13, { duration: 1.0 });
      },
      err => {
        setGpsTracking(false);
        setGpsError(isFr ? `Signal GPS indisponible (${err.message})` : `GPS unavailable (${err.message})`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  // Manual Coordinates Submit
  const handleApplyManualCoordinates = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const lat = parseFloat(manualLatInput);
    const lon = parseFloat(manualLonInput);
    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) return;

    const roundedLat = parseFloat(lat.toFixed(5));
    const roundedLon = parseFloat(lon.toFixed(5));
    setUserLocationAndPersist({ lat: roundedLat, lon: roundedLon });
    mapInstanceRef.current?.flyTo([roundedLat, roundedLon], 13, { duration: 1 });
    setIsPlacementPanelOpen(false);
  };

  // Add User Waypoint
  const handleAddWaypoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPointName.trim()) return;

    const latToUse = clickedCoord ? clickedCoord.lat : currentCenter.lat;
    const lonToUse = clickedCoord ? clickedCoord.lon : currentCenter.lon;

    const newWp: Waypoint = {
      id: `usr-wp-${Date.now()}`,
      name: newPointName.trim(),
      regionId: selectedRegionId === 'france' ? 'custom' : selectedRegionId,
      type: newPointType,
      lat: latToUse,
      lon: lonToUse,
      notes: newPointNotes.trim() || undefined,
      isUserAdded: true
    };

    setUserWaypoints(prev => [newWp, ...prev]);
    setSelectedWaypoint(newWp);
    setNewPointName('');
    setNewPointNotes('');
    setIsAddingPoint(false);
    setClickedCoord(null);
    setSidebarTab('inspector');
    setPointToast(isFr ? `Repère « ${newWp.name} » enregistré` : `Waypoint "${newWp.name}" saved`);
    setTimeout(() => setPointToast(null), 3000);
  };

  const handleDeleteUserWaypoint = (id: string) => {
    setUserWaypoints(prev => prev.filter(w => w.id !== id));
    if (selectedWaypoint?.id === id) {
      setSelectedWaypoint(null);
    }
  };

  // Export GPX
  const handleExportGpx = () => {
    let gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Sentinel Pack Survie - LORN Digital Studio" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>Sentinel France Waypoints (${selectedRegionId})</name>
    <time>${new Date().toISOString()}</time>
  </metadata>\n`;

    visibleWaypoints.forEach(wp => {
      gpx += `  <wpt lat="${wp.lat}" lon="${wp.lon}">
    <name>${wp.name}</name>
    <desc>${wp.notes || wp.type}</desc>
    <sym>${wp.type}</sym>
  </wpt>\n`;
    });

    gpx += `</gpx>`;

    const blob = new Blob([gpx], { type: 'application/gpx+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sentinel-${selectedRegionId}-${new Date().toISOString().slice(0, 10)}.gpx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Sightlines cleanup
  const clearSightlines = () => {
    if (mapInstanceRef.current && sightlinesRef.current.length > 0) {
      sightlinesRef.current.forEach(l => mapInstanceRef.current?.removeLayer(l));
      sightlinesRef.current = [];
    }
  };

  // Resection calculation
  const handleCalculateResection = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const p1 = allWaypoints.find(w => w.id === triangPoint1Id);
    const p2 = allWaypoints.find(w => w.id === triangPoint2Id);
    if (!p1 || !p2 || p1.id === p2.id) {
      setTriangResult({
        lat: 0,
        lon: 0,
        note: isFr ? 'Sélectionnez 2 repères distincts.' : 'Select 2 distinct landmarks.'
      });
      return;
    }

    const b1 = (triangBearing1 + 180) % 360;
    const b2 = (triangBearing2 + 180) % 360;

    const latMid = (p1.lat + p2.lat) / 2;
    const kx = 111.32 * Math.cos((latMid * Math.PI) / 180);
    const ky = 110.57;

    const x1 = p1.lon * kx;
    const y1 = p1.lat * ky;
    const x2 = p2.lon * kx;
    const y2 = p2.lat * ky;

    const r1Rad = (b1 * Math.PI) / 180;
    const r2Rad = (b2 * Math.PI) / 180;

    const dx1 = Math.sin(r1Rad);
    const dy1 = Math.cos(r1Rad);
    const dx2 = Math.sin(r2Rad);
    const dy2 = Math.cos(r2Rad);

    const det = dx1 * dy2 - dy1 * dx2;
    if (Math.abs(det) < 0.0001) {
      setTriangResult({ lat: 0, lon: 0, note: isFr ? 'Visées parallèles.' : 'Parallel sightlines.' });
      return;
    }

    const t1 = ((x2 - x1) * dy2 - (y2 - y1) * dx2) / det;
    const resLat = parseFloat(((y1 + t1 * dy1) / ky).toFixed(5));
    const resLon = parseFloat(((x1 + t1 * dx1) / kx).toFixed(5));

    clearSightlines();
    const l1 = L.polyline([[p1.lat, p1.lon], [resLat, resLon]], { color: '#10b981', weight: 2.5, dashArray: '6, 6' }).addTo(map);
    const l2 = L.polyline([[p2.lat, p2.lon], [resLat, resLon]], { color: '#06b6d4', weight: 2.5, dashArray: '6, 6' }).addTo(map);
    sightlinesRef.current = [l1, l2];

    setUserLocationAndPersist({ lat: resLat, lon: resLon });
    map.flyTo([resLat, resLon], 12, { duration: 1.0 });
    setTriangResult({
      lat: resLat,
      lon: resLon,
      note: isFr
        ? `Intersection établie : ${resLat}°N, ${resLon}°E`
        : `Intersection fixed: ${resLat}°N, ${resLon}°E`
    });
  };

  // Dead reckoning
  const handleCalculateDeadReckoning = () => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const startPt = allWaypoints.find(w => w.id === deadStartPointId);
    if (!startPt) return;

    const distKm = (deadDistanceMeters || pacesCount * userPaceLengthMeters) / 1000;
    const azRad = (deadAzimuth * Math.PI) / 180;
    const kx = 111.32 * Math.cos((startPt.lat * Math.PI) / 180);
    const ky = 110.57;

    const endLat = parseFloat((startPt.lat + (distKm * Math.cos(azRad)) / ky).toFixed(5));
    const endLon = parseFloat((startPt.lon + (distKm * Math.sin(azRad)) / kx).toFixed(5));

    clearSightlines();
    const legLine = L.polyline([[startPt.lat, startPt.lon], [endLat, endLon]], { color: '#f59e0b', weight: 2.5, dashArray: '6, 6' }).addTo(map);
    sightlinesRef.current = [legLine];

    setUserLocationAndPersist({ lat: endLat, lon: endLon });
    map.flyTo([endLat, endLon], 13, { duration: 1.0 });
    setTriangResult({
      lat: endLat,
      lon: endLon,
      note: isFr ? `Position projetée : ${endLat}°N, ${endLon}°E` : `Projected: ${endLat}°N, ${endLon}°E`
    });
  };

  const navInfo =
    selectedWaypoint && userLocation
      ? calculateNav(userLocation.lat, userLocation.lon, selectedWaypoint.lat, selectedWaypoint.lon)
      : null;

  return (
    <div className="space-y-4 min-w-0">
      {/* 1. COMPACT TOP BAR WITH FRENCH REGION DROPDOWN SELECTOR */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-md p-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 min-w-0">
          <div className="flex items-center gap-2 shrink-0">
            <Compass className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wide">
                {isFr ? 'Carte Tactique & Régions de France' : 'France Tactical Map & Regions'}
              </h2>
              <p className="text-[11px] text-stone-400">
                {isFr
                  ? 'Repères réels vérifiés (CHU, refuges FFCAM, sources, émetteurs TDF) · Zéro point fictif'
                  : 'Verified real landmarks (Hospitals, FFCAM refuges, springs, TDF relays) · Zero fictional points'}
              </p>
            </div>
          </div>

          {/* FRENCH REGIONS DROPDOWN MENU */}
          <div className="flex items-center gap-2 bg-black border border-amber-500/60 rounded-sm px-2.5 py-1.5 min-w-0">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
            <label htmlFor="region-select" className="text-[11px] font-mono text-amber-300 font-bold whitespace-nowrap">
              {isFr ? 'Région :' : 'Region:'}
            </label>
            <select
              id="region-select"
              value={selectedRegionId}
              onChange={(e) => handleSelectRegion(e.target.value)}
              className="bg-black text-white text-xs font-mono font-bold focus:outline-none cursor-pointer truncate max-w-[230px] sm:max-w-[280px]"
            >
              {FRENCH_REGIONS.map(reg => (
                <option key={reg.id} value={reg.id} className="bg-neutral-950 text-white">
                  {isFr ? reg.nameFr : reg.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={handleLocateMe}
            disabled={gpsTracking}
            className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-sky-300 font-mono text-xs rounded-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Locate className="w-3.5 h-3.5" />
            <span>{gpsTracking ? 'GPS...' : 'GPS'}</span>
          </button>

          <button
            onClick={() => {
              setIsPlacementPanelOpen(!isPlacementPanelOpen);
              setIsTriangulating(false);
            }}
            className={`px-2.5 py-1.5 font-mono text-xs rounded-sm border flex items-center gap-1.5 cursor-pointer ${
              isPlacementPanelOpen
                ? 'bg-sky-500 text-black border-sky-400 font-bold'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-stone-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>{isFr ? 'Ma Position' : 'Set Pos'}</span>
          </button>

          <button
            onClick={() => {
              setIsTriangulating(!isTriangulating);
              setIsPlacementPanelOpen(false);
            }}
            className={`px-2.5 py-1.5 font-mono text-xs rounded-sm border flex items-center gap-1.5 cursor-pointer ${
              isTriangulating
                ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-emerald-300'
            }`}
          >
            <Triangle className="w-3.5 h-3.5" />
            <span>{isFr ? 'Boussole / Sans GPS' : 'No-GPS Fix'}</span>
          </button>

          <button
            onClick={() => {
              setIsAddingPoint(!isAddingPoint);
              setSidebarTab('inspector');
            }}
            className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-xs rounded-sm flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isFr ? 'Ajouter Repère' : 'Add Point'}</span>
          </button>

          <button
            onClick={handleExportGpx}
            className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-stone-300 border border-neutral-700 font-mono text-xs rounded-sm flex items-center gap-1 cursor-pointer"
            title="Exporter GPX"
          >
            <Download className="w-3.5 h-3.5" />
            <span>GPX</span>
          </button>
        </div>
      </div>

      {/* OPTIONAL PANEL: MANUAL POSITION PLACEMENT */}
      {isPlacementPanelOpen && (
        <div className="bg-neutral-950 border border-sky-500/60 rounded-md p-4 space-y-3 text-xs font-mono">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="font-bold text-sky-400 uppercase">
              {isFr ? 'Fixer votre position manuellement (WGS84)' : 'Set Your Position Manually (WGS84)'}
            </span>
            <button onClick={() => setIsPlacementPanelOpen(false)} className="text-stone-400 hover:text-white">
              ✕
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsDirectPlacementActive(true);
                setIsPlacementPanelOpen(false);
              }}
              className="px-3 py-1.5 bg-amber-500 text-black font-bold rounded-sm cursor-pointer"
            >
              🎯 {isFr ? 'Cliquer sur la carte pour placer' : 'Click on map to place'}
            </button>
            <button
              type="button"
              onClick={() => {
                setUserLocationAndPersist(currentCenter);
                setIsPlacementPanelOpen(false);
              }}
              className="px-3 py-1.5 bg-sky-600 text-white font-bold rounded-sm cursor-pointer"
            >
              ⊕ {isFr ? 'Fixer au centre du viseur' : 'Set to center crosshair'}
            </button>
          </div>
          <form onSubmit={handleApplyManualCoordinates} className="flex flex-wrap items-end gap-2 pt-1">
            <div>
              <label className="block text-[10px] text-stone-400">Latitude</label>
              <input
                type="number"
                step="0.0001"
                value={manualLatInput}
                onChange={e => setManualLatInput(e.target.value)}
                className="bg-black border border-neutral-800 rounded-sm px-2 py-1 text-sky-300 w-28"
              />
            </div>
            <div>
              <label className="block text-[10px] text-stone-400">Longitude</label>
              <input
                type="number"
                step="0.0001"
                value={manualLonInput}
                onChange={e => setManualLonInput(e.target.value)}
                className="bg-black border border-neutral-800 rounded-sm px-2 py-1 text-sky-300 w-28"
              />
            </div>
            <button type="submit" className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white rounded-sm">
              {isFr ? 'Appliquer' : 'Apply'}
            </button>
          </form>
        </div>
      )}

      {/* OPTIONAL PANEL: NO-GPS COMPASS RESECTION */}
      {isTriangulating && (
        <div className="bg-neutral-950 border border-emerald-500/60 rounded-md p-4 space-y-3 text-xs font-mono">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-2">
            <span className="font-bold text-emerald-400 uppercase">
              {isFr ? 'Pointage Sans GPS (Recoupement Boussole & Estime)' : 'No-GPS Positioning (Resection & Dead Reckoning)'}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setTriangMode('resection')}
                className={`px-2 py-1 rounded-sm ${triangMode === 'resection' ? 'bg-emerald-600 text-white font-bold' : 'bg-neutral-900 text-stone-400'}`}
              >
                {isFr ? 'Recoupement (2 Amers)' : 'Resection'}
              </button>
              <button
                onClick={() => setTriangMode('dead-reckoning')}
                className={`px-2 py-1 rounded-sm ${triangMode === 'dead-reckoning' ? 'bg-amber-500 text-black font-bold' : 'bg-neutral-900 text-stone-400'}`}
              >
                {isFr ? 'Estime (Cap + Distance)' : 'Dead Reckoning'}
              </button>
              <button onClick={() => setIsTriangulating(false)} className="text-stone-400 hover:text-white px-1">
                ✕
              </button>
            </div>
          </div>

          {triangMode === 'resection' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-2.5 bg-black border border-neutral-800 rounded-sm space-y-2">
                <div className="text-emerald-400 font-bold">{isFr ? 'Amer Visuel 1' : 'Landmark 1'}</div>
                <select
                  value={triangPoint1Id}
                  onChange={e => setTriangPoint1Id(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-2 py-1 text-stone-200"
                >
                  {allWaypoints.map(wp => (
                    <option key={wp.id} value={wp.id}>{wp.name}</option>
                  ))}
                </select>
                <div className="flex items-center gap-2">
                  <span className="text-stone-400">{isFr ? 'Azimut (°):' : 'Azimuth (°):'}</span>
                  <input
                    type="number"
                    min="0"
                    max="359"
                    value={triangBearing1}
                    onChange={e => setTriangBearing1(Number(e.target.value) || 0)}
                    className="w-20 bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-emerald-300"
                  />
                </div>
              </div>

              <div className="p-2.5 bg-black border border-neutral-800 rounded-sm space-y-2">
                <div className="text-sky-400 font-bold">{isFr ? 'Amer Visuel 2' : 'Landmark 2'}</div>
                <select
                  value={triangPoint2Id}
                  onChange={e => setTriangPoint2Id(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-sm px-2 py-1 text-stone-200"
                >
                  {allWaypoints.map(wp => (
                    <option key={wp.id} value={wp.id}>{wp.name}</option>
                  ))}
                </select>
                <div className="flex items-center gap-2">
                  <span className="text-stone-400">{isFr ? 'Azimut (°):' : 'Azimuth (°):'}</span>
                  <input
                    type="number"
                    min="0"
                    max="359"
                    value={triangBearing2}
                    onChange={e => setTriangBearing2(Number(e.target.value) || 0)}
                    className="w-20 bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-sky-300"
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex items-center gap-2">
                <button
                  onClick={handleCalculateResection}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-sm"
                >
                  {isFr ? 'Calculer l’intersection' : 'Calculate Intersection'}
                </button>
                <button
                  onClick={() => {
                    clearSightlines();
                    setTriangResult(null);
                  }}
                  className="px-3 py-1.5 bg-neutral-900 text-stone-300 rounded-sm border border-neutral-800"
                >
                  {isFr ? 'Effacer' : 'Clear'}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] text-stone-400 mb-1">{isFr ? 'Point de départ' : 'Start Point'}</label>
                <select
                  value={deadStartPointId}
                  onChange={e => setDeadStartPointId(e.target.value)}
                  className="w-full bg-black border border-neutral-800 px-2 py-1 text-stone-200"
                >
                  {allWaypoints.map(wp => (
                    <option key={wp.id} value={wp.id}>{wp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-stone-400 mb-1">{isFr ? 'Cap suivi (°)' : 'Azimuth (°)'}</label>
                <input
                  type="number"
                  min="0"
                  max="359"
                  value={deadAzimuth}
                  onChange={e => setDeadAzimuth(Number(e.target.value) || 0)}
                  className="w-full bg-black border border-neutral-800 px-2 py-1 text-amber-400"
                />
              </div>
              <div>
                <label className="block text-[10px] text-stone-400 mb-1">{isFr ? 'Distance (m)' : 'Distance (m)'}</label>
                <input
                  type="number"
                  min="10"
                  step="50"
                  value={deadDistanceMeters}
                  onChange={e => setDeadDistanceMeters(Number(e.target.value) || 0)}
                  className="w-full bg-black border border-neutral-800 px-2 py-1 text-amber-400"
                />
              </div>
              <div className="md:col-span-3">
                <button
                  onClick={handleCalculateDeadReckoning}
                  className="px-3 py-1.5 bg-amber-500 text-black font-bold rounded-sm"
                >
                  {isFr ? 'Projeter la position' : 'Project Position'}
                </button>
              </div>
            </div>
          )}

          {triangResult && (
            <div className="p-2 bg-black border border-emerald-700 text-emerald-300 rounded-sm">
              {triangResult.note}
            </div>
          )}
        </div>
      )}

      {gpsError && (
        <div className="p-2.5 bg-rose-950/60 border border-rose-800 rounded-sm text-xs text-rose-300 font-mono">
          {gpsError}
        </div>
      )}

      {/* 2. MAIN MAP & SIDEBAR GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start min-w-0">
        {/* Left Column: Map Canvas (8 Cols) */}
        <div className="lg:col-span-8 space-y-2.5 min-w-0">
          {/* Category Filter, Zoom Clustering & OSM Water/Hospitals Scanner Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-neutral-950 border border-neutral-800 rounded-md p-2 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-1">
              {[
                { id: 'all', label: isFr ? `Tous (${allWaypoints.length})` : `All (${allWaypoints.length})` },
                {
                  id: 'all-water',
                  label: isFr
                    ? `💧+🚰 Toute l’Eau (${allWaypoints.filter(w => w.type === 'water' || w.type === 'water-raw').length})`
                    : `💧+🚰 All Water (${allWaypoints.filter(w => w.type === 'water' || w.type === 'water-raw').length})`
                },
                {
                  id: 'water',
                  label: isFr
                    ? `💧 Eau Potable (${allWaypoints.filter(w => w.type === 'water').length})`
                    : `💧 Potable Water (${allWaypoints.filter(w => w.type === 'water').length})`
                },
                {
                  id: 'water-raw',
                  label: isFr
                    ? `🚰 Eau Non Potable (${allWaypoints.filter(w => w.type === 'water-raw').length})`
                    : `🚰 Non-Potable (${allWaypoints.filter(w => w.type === 'water-raw').length})`
                },
                {
                  id: 'medical',
                  label: isFr
                    ? `🏥 Hôpitaux & Cliniques (${allWaypoints.filter(w => w.type === 'medical').length})`
                    : `🏥 Hospitals & Clinics (${allWaypoints.filter(w => w.type === 'medical').length})`
                },
                { id: 'shelter', label: isFr ? '🏕️ Refuges' : '🏕️ Refuges' },
                { id: 'radio', label: isFr ? '📡 Émetteurs TDF' : '📡 Relays' },
                { id: 'camp', label: isFr ? '🌲 Forêts' : '🌲 Forests' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-2 py-1 rounded-sm cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-amber-500 text-black font-bold'
                      : 'text-stone-400 hover:text-stone-200 bg-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={handleScanOsmWaterAndHospitals}
                disabled={isScanningOsm}
                className="px-2.5 py-1 rounded-sm bg-sky-950/90 hover:bg-sky-900 border border-sky-600 text-sky-200 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                title={
                  isFr
                    ? 'Scanner et sauvegarder tous les points d’eau potable (💧), points d’eau non potable de villages/lavoirs/puits (🚰) et hôpitaux/cliniques (🏥) de la zone affichée'
                    : 'Scan and cache all potable water, village raw water points & hospitals/clinics in view'
                }
              >
                <RotateCcw className={`w-3 h-3 ${isScanningOsm ? 'animate-spin' : ''}`} />
                <span>
                  {isScanningOsm
                    ? isFr
                      ? 'Scan Villages & Villes...'
                      : 'Scanning...'
                    : isFr
                    ? '💧🚰🏥 Recenser Villages & Zone (OSM)'
                    : '💧🚰🏥 Scan Villages & Area (OSM)'}
                </span>
              </button>

              <button
                onClick={() => setClusteringEnabled(!clusteringEnabled)}
                className={`px-2 py-1 rounded-sm border text-[11px] flex items-center gap-1 cursor-pointer ${
                  clusteringEnabled
                    ? 'bg-amber-950/80 border-amber-600 text-amber-300 font-bold'
                    : 'bg-neutral-900 border-neutral-700 text-stone-400'
                }`}
                title={
                  isFr
                    ? 'Regroupement automatique des points au fur et à mesure du zoom'
                    : 'Automatic zoom-based marker clustering'
                }
              >
                <Layers className="w-3 h-3" />
                <span>
                  {isFr
                    ? `Clusters Zoom : ${clusteringEnabled ? 'ON' : 'OFF'}`
                    : `Clusters: ${clusteringEnabled ? 'ON' : 'OFF'}`}
                </span>
              </button>

              <button
                onClick={() => setShowRealLandmarks(!showRealLandmarks)}
                className={`px-2 py-1 rounded-sm border text-[11px] flex items-center gap-1 cursor-pointer ${
                  showRealLandmarks
                    ? 'bg-emerald-950/70 border-emerald-700 text-emerald-300'
                    : 'bg-neutral-900 border-neutral-700 text-stone-400'
                }`}
                title={isFr ? 'Afficher/Masquer les vrais points de repère français' : 'Toggle real French landmarks'}
              >
                {showRealLandmarks ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                <span>{isFr ? 'Base Nationale' : 'National DB'}</span>
              </button>

              <button
                onClick={() => setMapTheme(mapTheme === 'tactical-oled' ? 'organic' : mapTheme === 'organic' ? 'red-night' : 'tactical-oled')}
                className="px-2 py-1 rounded-sm bg-black border border-neutral-800 text-amber-400 text-[11px] cursor-pointer"
              >
                {mapTheme === 'tactical-oled' ? 'OLED' : mapTheme === 'organic' ? 'TOPO' : 'NUIT'}
              </button>
            </div>
          </div>

          {/* LEAFLET MAP CONTAINER */}
          <div className="relative w-full h-[460px] sm:h-[500px] rounded-md border border-neutral-800 overflow-hidden bg-black">
            <div
              ref={mapContainerRef}
              className={`w-full h-full ${
                mapTheme === 'tactical-oled'
                  ? 'brightness-90 invert hue-rotate-180 contrast-125'
                  : mapTheme === 'red-night'
                  ? 'grayscale brightness-50 sepia hue-rotate-[-50deg] saturate-[600%]'
                  : ''
              }`}
            />

            {/* Center Crosshair */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[400] opacity-40 text-amber-400">
              <Crosshair className="w-7 h-7" />
            </div>

            {/* Direct Placement Active Banner */}
            {isDirectPlacementActive && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[500] bg-sky-950 border border-sky-400 text-sky-200 rounded-sm px-3 py-1.5 flex items-center gap-2 font-mono text-xs">
                <span>🎯 {isFr ? 'Cliquez sur la carte pour fixer votre position' : 'Click map to set location'}</span>
                <button
                  onClick={() => setIsDirectPlacementActive(false)}
                  className="px-2 py-0.5 bg-black text-stone-300 rounded-sm"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Clicked Point Quick Banner */}
            {clickedCoord && !isDirectPlacementActive && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[500] bg-black/95 border border-amber-500 rounded-sm p-2 flex flex-wrap items-center gap-2 font-mono text-xs max-w-[95%]">
                <span className="text-amber-400 font-bold tabular-nums">
                  {clickedCoord.lat.toFixed(4)}°N, {clickedCoord.lon.toFixed(4)}°E
                </span>
                <button
                  onClick={() => {
                    setUserLocationAndPersist(clickedCoord);
                    setClickedCoord(null);
                  }}
                  className="px-2 py-1 bg-sky-600 text-white font-bold rounded-sm text-[11px]"
                >
                  {isFr ? 'Ma position ici' : 'Set My Pos'}
                </button>
                <button
                  onClick={() => {
                    setIsAddingPoint(true);
                    setSidebarTab('inspector');
                  }}
                  className="px-2 py-1 bg-amber-500 text-black font-bold rounded-sm text-[11px]"
                >
                  + {isFr ? 'Créer repère' : 'Add Point'}
                </button>
                <button onClick={() => setClickedCoord(null)} className="text-stone-400 hover:text-white px-1">
                  ✕
                </button>
              </div>
            )}

            {/* Zoom Controls */}
            <div className="absolute right-3 bottom-3 flex flex-col gap-1 z-[500]">
              <button
                onClick={() => mapInstanceRef.current?.zoomIn()}
                className="w-8 h-8 rounded-sm bg-black/90 border border-neutral-700 text-stone-200 hover:text-white flex items-center justify-center"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => mapInstanceRef.current?.zoomOut()}
                className="w-8 h-8 rounded-sm bg-black/90 border border-neutral-700 text-stone-200 hover:text-white flex items-center justify-center"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom-Left Coordinates Readout */}
            <div className="absolute left-3 bottom-3 bg-black/90 border border-neutral-800 px-2.5 py-1.5 rounded-sm text-[10px] font-mono text-stone-300 z-[500]">
              <div className="text-amber-400 font-bold tabular-nums">
                {currentCenter.lat.toFixed(4)}°N · {currentCenter.lon.toFixed(4)}°E
              </div>
              <div className="text-stone-400 tabular-nums">
                {toDms(currentCenter.lat, true)} {toDms(currentCenter.lon, false)}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inspector & Regional Landmarks List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3 min-w-0">
          {/* Sidebar Mode Switcher */}
          <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-800 p-1 rounded-md">
            <button
              onClick={() => {
                setSidebarTab('list');
                setIsAddingPoint(false);
              }}
              className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                sidebarTab === 'list' && !isAddingPoint
                  ? 'bg-amber-500 text-black'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isFr ? `Repères (${visibleWaypoints.length})` : `Points (${visibleWaypoints.length})`}</span>
            </button>

            <button
              onClick={() => {
                setSidebarTab('inspector');
                setIsAddingPoint(false);
              }}
              className={`flex-1 py-1.5 text-xs font-mono font-bold rounded-sm flex items-center justify-center gap-1.5 cursor-pointer ${
                sidebarTab === 'inspector' && !isAddingPoint
                  ? 'bg-amber-500 text-black'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{isFr ? 'Azimut & Détails' : 'Azimuth'}</span>
            </button>

            <button
              onClick={() => {
                setIsAddingPoint(true);
                setSidebarTab('inspector');
              }}
              className={`px-2.5 py-1.5 text-xs font-mono font-bold rounded-sm flex items-center justify-center gap-1 cursor-pointer ${
                isAddingPoint
                  ? 'bg-emerald-500 text-black'
                  : 'bg-neutral-900 text-emerald-400 border border-neutral-800'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* TAB: WAYPOINTS LIST (Filtered by Selected Region) */}
          {sidebarTab === 'list' && !isAddingPoint && (
            <div className="border border-neutral-800 rounded-md bg-neutral-950 p-3 space-y-2.5">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-xs font-mono">
                <span className="font-bold text-amber-300 truncate">
                  {FRENCH_REGIONS.find(r => r.id === selectedRegionId)?.nameFr || 'France'}
                </span>
                <span className="text-[10px] text-stone-400 shrink-0">
                  {visibleWaypoints.length} {isFr ? 'repères réels' : 'real POIs'}
                </span>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={isFr ? 'Filtrer par nom (CHU, refuge, lac)...' : 'Filter by name...'}
                  className="w-full bg-black border border-neutral-800 rounded-sm pl-8 pr-2.5 py-1.5 text-xs text-stone-200 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="max-h-[340px] overflow-y-auto space-y-1.5 pr-1 font-mono text-xs">
                {visibleWaypoints.map(wp => {
                  const nav = userLocation
                    ? calculateNav(userLocation.lat, userLocation.lon, wp.lat, wp.lon)
                    : null;
                  return (
                    <div
                      key={wp.id}
                      onClick={() => {
                        setSelectedWaypoint(wp);
                        setSidebarTab('inspector');
                        mapInstanceRef.current?.flyTo([wp.lat, wp.lon], 12, { duration: 0.8 });
                      }}
                      className={`p-2 rounded-sm border flex items-center justify-between gap-2 cursor-pointer ${
                        selectedWaypoint?.id === wp.id
                          ? 'bg-neutral-900 border-amber-500 text-white'
                          : 'bg-black border-neutral-800/80 text-stone-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span className="text-sm shrink-0">
                          {wp.type === 'water'
                            ? '💧'
                            : wp.type === 'water-raw'
                            ? '🚰'
                            : wp.type === 'shelter'
                            ? '🏕️'
                            : wp.type === 'medical'
                            ? '🏥'
                            : wp.type === 'radio'
                            ? '📡'
                            : wp.type === 'danger'
                            ? '⚠️'
                            : '🌲'}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold truncate text-[11px] text-stone-100">{wp.name}</div>
                          <div className="text-[10px] text-stone-400 flex items-center gap-2">
                            <span>{wp.lat.toFixed(3)}°N, {wp.lon.toFixed(3)}°E</span>
                            {nav && (
                              <span className="text-amber-400 font-bold">
                                · {Math.round(nav.distanceKm)} km ({nav.bearing}°)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {wp.isUserAdded && (
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleDeleteUserWaypoint(wp.id);
                          }}
                          className="p-1 text-stone-500 hover:text-rose-400 shrink-0"
                          title={isFr ? 'Supprimer ce repère personnel' : 'Delete custom waypoint'}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}

                {visibleWaypoints.length === 0 && (
                  <div className="p-4 text-center text-stone-500 text-xs">
                    {isFr ? 'Aucun repère dans cette sélection.' : 'No waypoints in this filter.'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: INSPECTOR & AZIMUTH */}
          {sidebarTab === 'inspector' && !isAddingPoint && (
            <div className="space-y-3">
              {selectedWaypoint ? (
                <div className="border border-neutral-800 rounded-md bg-neutral-950 p-4 space-y-3 font-mono">
                  <div className="flex items-start justify-between gap-2 border-b border-neutral-800 pb-2.5">
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase text-amber-400 font-bold block">
                        {selectedWaypoint.isUserAdded
                          ? isFr
                            ? 'REPÈRE PERSONNEL'
                            : 'USER WAYPOINT'
                          : isFr
                          ? 'POINT DE REPÈRE RÉEL VÉRIFIÉ'
                          : 'VERIFIED REAL LANDMARK'}
                      </span>
                      <h3 className="text-sm font-bold text-white leading-snug mt-0.5">
                        {selectedWaypoint.name}
                      </h3>
                    </div>
                    {selectedWaypoint.isUserAdded && (
                      <button
                        onClick={() => handleDeleteUserWaypoint(selectedWaypoint.id)}
                        className="p-1 text-rose-400 hover:bg-neutral-900 rounded-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="p-2.5 bg-black border border-neutral-800 rounded-sm text-[11px] space-y-1">
                    <div className="flex justify-between text-stone-400">
                      <span>WGS84 :</span>
                      <span className="text-amber-400 font-bold tabular-nums">
                        {selectedWaypoint.lat.toFixed(5)}°N, {selectedWaypoint.lon.toFixed(5)}°E
                      </span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>DMS :</span>
                      <span className="text-stone-200 tabular-nums">
                        {toDms(selectedWaypoint.lat, true)} {toDms(selectedWaypoint.lon, false)}
                      </span>
                    </div>
                  </div>

                  {navInfo && (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 bg-black border border-neutral-800 rounded-sm text-center">
                        <span className="text-[10px] text-stone-400 uppercase block">
                          {isFr ? 'Azimut Boussole' : 'Azimuth'}
                        </span>
                        <span className="text-lg font-bold text-amber-400 tabular-nums">
                          {navInfo.bearing}° ({getCompassRose(navInfo.bearing)})
                        </span>
                      </div>
                      <div className="p-2.5 bg-black border border-neutral-800 rounded-sm text-center">
                        <span className="text-[10px] text-stone-400 uppercase block">
                          {isFr ? 'Distance Vol d’Oiseau' : 'Direct Distance'}
                        </span>
                        <span className="text-lg font-bold text-emerald-400 tabular-nums">
                          {navInfo.distanceMeters >= 1000
                            ? `${navInfo.distanceKm.toFixed(1)} km`
                            : `${navInfo.distanceMeters} m`}
                        </span>
                      </div>
                    </div>
                  )}

                  {selectedWaypoint.notes && (
                    <p className="text-xs text-stone-300 bg-black p-2.5 rounded-sm border border-neutral-800 leading-relaxed">
                      {selectedWaypoint.notes}
                    </p>
                  )}

                  <button
                    onClick={() => setSidebarTab('list')}
                    className="w-full py-1.5 bg-neutral-900 hover:bg-neutral-800 text-stone-300 text-xs rounded-sm border border-neutral-800"
                  >
                    ← {isFr ? 'Retour à la liste régionale' : 'Back to regional list'}
                  </button>
                </div>
              ) : (
                <div className="border border-neutral-800 rounded-md bg-neutral-950 p-5 text-center text-stone-400 text-xs space-y-2.5 font-mono">
                  <Compass className="w-7 h-7 text-stone-600 mx-auto" />
                  <p>
                    {isFr
                      ? 'Sélectionnez un point de repère réel sur la carte ou dans la liste pour obtenir son azimut et sa distance exacte.'
                      : 'Select a real landmark on the map or list to calculate bearing and distance.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* FORM: ADD CUSTOM WAYPOINT */}
          {isAddingPoint && (
            <form
              onSubmit={handleAddWaypoint}
              className="border border-amber-500/70 rounded-md bg-neutral-950 p-4 space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="font-bold text-amber-400 uppercase">
                  {isFr ? 'Nouveau Repère Personnel' : 'New Personal Waypoint'}
                </span>
                <button type="button" onClick={() => setIsAddingPoint(false)} className="text-stone-400 hover:text-white">
                  ✕
                </button>
              </div>

              <div className="p-2 bg-black border border-neutral-800 rounded-sm text-[11px] flex justify-between">
                <span className="text-stone-400">{isFr ? 'Coordonnées :' : 'Coords:'}</span>
                <span className="text-amber-400 font-bold tabular-nums">
                  {(clickedCoord ? clickedCoord.lat : currentCenter.lat).toFixed(4)}°N,{' '}
                  {(clickedCoord ? clickedCoord.lon : currentCenter.lon).toFixed(4)}°E
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-stone-400 mb-1">{isFr ? 'Nom du repère :' : 'Name:'}</label>
                <input
                  type="text"
                  required
                  value={newPointName}
                  onChange={e => setNewPointName(e.target.value)}
                  placeholder={isFr ? 'Ex: Point d’eau vérifié, Bivouac...' : 'e.g. Verified spring, Camp...'}
                  className="w-full bg-black border border-neutral-800 rounded-sm px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">{isFr ? 'Type :' : 'Type:'}</label>
                  <select
                    value={newPointType}
                    onChange={e => setNewPointType(e.target.value as Waypoint['type'])}
                    className="w-full bg-black border border-neutral-800 rounded-sm px-2 py-1.5 text-stone-200"
                  >
                    <option value="water">{isFr ? '💧 Eau Potable' : '💧 Potable Water'}</option>
                    <option value="water-raw">{isFr ? '🚰 Eau Non Potable / À traiter' : '🚰 Non-Potable Water'}</option>
                    <option value="shelter">{isFr ? '🏕️ Abri / Refuge' : '🏕️ Shelter'}</option>
                    <option value="medical">{isFr ? '🏥 Secours / CHU' : '🏥 Medical'}</option>
                    <option value="radio">{isFr ? '📡 Relais Radio' : '📡 Radio'}</option>
                    <option value="camp">{isFr ? '🌲 Bivouac' : '🌲 Camp'}</option>
                    <option value="danger">{isFr ? '⚠️ Danger' : '⚠️ Hazard'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">{isFr ? 'Notes :' : 'Notes:'}</label>
                  <input
                    type="text"
                    value={newPointNotes}
                    onChange={e => setNewPointNotes(e.target.value)}
                    placeholder={isFr ? 'Détails terrain...' : 'Field notes...'}
                    className="w-full bg-black border border-neutral-800 rounded-sm px-2 py-1.5 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-sm cursor-pointer"
              >
                ✓ {isFr ? 'Enregistrer sur la carte' : 'Save Waypoint'}
              </button>
            </form>
          )}

          {/* Compact Pace Counter */}
          <div className="border border-neutral-800 rounded-md bg-neutral-950 p-3 flex items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Footprints className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-stone-300">{isFr ? 'Doubles-pas :' : 'Paces:'}</span>
              <input
                type="number"
                value={pacesCount}
                onChange={e => setPacesCount(parseInt(e.target.value) || 0)}
                className="w-16 bg-black border border-neutral-800 rounded-sm px-2 py-0.5 text-amber-300 text-center"
              />
            </div>
            <div className="text-stone-400">
              = <span className="text-amber-400 font-bold tabular-nums">{(pacesCount * userPaceLengthMeters).toFixed(0)} m</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {pointToast && (
        <div className="fixed bottom-5 right-5 z-[9999] bg-neutral-950 border border-emerald-500 text-emerald-300 px-3.5 py-2 rounded-md shadow-xl font-mono text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{pointToast}</span>
        </div>
      )}
    </div>
  );
};
