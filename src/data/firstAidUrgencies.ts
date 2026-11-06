export interface FirstAidUrgencyCard {
  id: string;
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  badgeFr: string;
  color: 'rose' | 'amber' | 'sky' | 'emerald' | 'purple';
  signsFr: string[];
  actionsFr: string[];
  neverDoFr: string;
}

export const FIRST_AID_URGENCIES: FirstAidUrgencyCard[] = [
  {
    id: 'fa-cardiac',
    titleFr: '1. Malaise Cardiaque & Arrêt Cardiaque',
    titleEn: '1. Heart Attack & Cardiac Arrest',
    subtitleFr: 'Douleur poitrine / Absence de respiration',
    subtitleEn: 'Chest pain / Unresponsive & not breathing',
    badgeFr: 'URGENCE ABSOLUE · 15 / 112',
    color: 'rose',
    signsFr: [
      'Douleur serrant la poitrine (« en étau ») irradiant vers le bras gauche, le cou ou la mâchoire',
      'Sueurs froides, pâleur, essoufflement, nausées ou perte de connaissance brutale',
      'En cas d’arrêt cardiaque : ne répond pas et ne respire plus normalement (ou respiration bruyante « gasp »)'
    ],
    actionsFr: [
      'Malaise conscient : Repos strict immédiat (assis ou demi-assis), desserrer les vêtements, ne jamais faire marcher, appeler le 15.',
      'Arrêt cardiaque : Allonger sur un plan dur et débuter immédiatement le massage cardiaque au centre du sternum.',
      'Rythme : 100 à 120 compressions/minute (enfoncer de 5 à 6 cm), alterner 30 compressions et 2 insufflations.',
      'Poser un Défibrillateur (DAE) dès que possible et suivre ses instructions vocales.'
    ],
    neverDoFr: 'Ne jamais laisser une personne en malaise cardiaque se lever ou marcher. Ne jamais interrompre le massage cardiaque plus de 10 secondes.'
  },
  {
    id: 'fa-unconscious',
    titleFr: '2. Inconscience (PLS)',
    titleEn: '2. Unconsciousness (Recovery Position)',
    subtitleFr: 'Ne répond pas mais respire normalement',
    subtitleEn: 'Unresponsive but breathing normally',
    badgeFr: 'LIBÉRER AIR · PLS',
    color: 'amber',
    signsFr: [
      'La victime ne répond pas aux questions et ne serre pas les mains',
      'Sa poitrine et son ventre se soulèvent régulièrement (elle respire)'
    ],
    actionsFr: [
      'Desserrer immédiatement le col, la cravate et la ceinture.',
      'Basculer prudemment la tête en arrière et soulever le menton pour décoller la langue du fond de la gorge.',
      'Vérifier la respiration pendant 10 secondes (regarder le thorax, écouter et sentir le souffle).',
      'Placer la victime sur le côté en Position Latérale de Sécurité (PLS), bouche ouverte tournée vers le sol, et la couvrir.'
    ],
    neverDoFr: 'Ne jamais laisser sur le dos une personne inconsciente qui respire (risque d’étouffement par chute de la langue ou vomissements).'
  },
  {
    id: 'fa-bleeding',
    titleFr: '3. Hémorragie Externe',
    titleEn: '3. Severe External Bleeding',
    subtitleFr: 'Saignement abondant qui imbibe un mouchoir',
    subtitleEn: 'Heavy bleeding soaking through cloth',
    badgeFr: 'COMPRESSION · GARROT',
    color: 'rose',
    signsFr: [
      'Sang qui coule abondamment ou gicle d’une plaie',
      'Pâleur, pouls rapide, extrémités froides, soif intense'
    ],
    actionsFr: [
      'Appuyer immédiatement et très fort directement sur la plaie avec la main protégée d’un linge propre.',
      'Allonger la victime à plat dos pour maintenir l’irrigation du cerveau.',
      'Maintenir la compression ou poser un pansement compressif serré (si le sang traverse, rajouter un tissu par-dessus sans retirer le premier).',
      'Si la compression échoue ou membre arraché : poser un garrot 5 à 7 cm au-dessus de la plaie (jamais sur une articulation) et noter l’heure exacte.'
    ],
    neverDoFr: 'Ne jamais retirer un corps étranger planté dans une plaie (couteau, verre, métal) et ne jamais desserrer un garrot une fois posé.'
  },
  {
    id: 'fa-choking',
    titleFr: '4. Étouffement (Heimlich)',
    titleEn: '4. Choking (Airway Obstruction)',
    subtitleFr: 'Obstruction brutale de la gorge par un corps étranger',
    subtitleEn: 'Sudden total airway blockage',
    badgeFr: '5 CLAQUES · 5 HEIMLICH',
    color: 'rose',
    signsFr: [
      'Obstruction totale : La victime porte les mains à sa gorge, garde la bouche ouverte, aucun son ni toux ne sort, ne peut plus respirer',
      'Obstruction partielle : La victime arrive encore à tousser ou parler'
    ],
    actionsFr: [
      'Si elle tousse (obstruction partielle) : Laisser assise et l’encourager à tousser fort (ne pas taper dans le dos).',
      'Si aucun son ne sort (obstruction totale) : Pencher la victime en avant et donner 5 claques vigoureuses entre les deux omoplates.',
      'En cas d’échec : Réaliser 5 compressions abdominales (manœuvre de Heimlich) en tirant le poing fermé au creux de l’estomac vers l’arrière et le haut.',
      'Alterner 5 claques dans le dos et 5 compressions de Heimlich jusqu’à l’expulsion (chez la femme enceinte : compressions au centre du thorax).'
    ],
    neverDoFr: 'Ne jamais taper dans le dos d’une personne qui tousse efficacement (risque de mobiliser l’objet et de bloquer totalement la trachée).'
  },
  {
    id: 'fa-burns',
    titleFr: '5. Brûlure',
    titleEn: '5. Thermal & Chemical Burns',
    subtitleFr: 'Flamme, liquide bouillant, objet brûlant ou produit chimique',
    subtitleEn: 'Flame, scalding liquid, hot surface, or chemical',
    badgeFr: 'EAU TEMPÉRÉE 15 MIN',
    color: 'amber',
    signsFr: [
      'Brûlure simple : rougeur douloureuse ou cloque de surface inférieure à la moitié de la paume de la main de la victime',
      'Brûlure grave : cloques étendues, aspect blanchâtre/noirâtre insensible, ou atteinte du visage, du cou, des mains ou des articulations'
    ],
    actionsFr: [
      'Refroidir immédiatement en faisant couler de l’eau tempérée (15 à 25°C) en jet doux à 15 cm de la brûlure pendant 15 à 20 minutes.',
      'Retirer les vêtements autour (sauf s’ils collent à la peau) ainsi que les bagues, alliances et montres avant que le membre ne gonfle.',
      'Brûlure chimique : Rincer à grande eau pendant au moins 20 minutes en retirant les vêtements imbibés sous la douche.',
      'Recouvrir d’un linge propre humide ou d’une compresse stérile.'
    ],
    neverDoFr: 'Ne jamais percer les cloques. Ne jamais appliquer de glace, de beurre, d’huile, de dentifrice ni de pommade sur une brûlure fraîche.'
  },
  {
    id: 'fa-drowning',
    titleFr: '6. Noyade',
    titleEn: '6. Drowning & Water Rescue',
    subtitleFr: 'Détresse respiratoire par immersion dans l’eau',
    subtitleEn: 'Respiratory impairment from submersion',
    badgeFr: '5 INSUFFLATIONS INITIALES',
    color: 'sky',
    signsFr: [
      'Victime sortie de l’eau toussant, crachant de l’écume, frissonnante ou cyanosée (lèvres bleues)',
      'Ou victime inconsciente en arrêt respiratoire après immersion'
    ],
    actionsFr: [
      'Sortir la victime de l’eau en sécurité en la gardant horizontale si possible.',
      'Si elle ne respire plus : Débuter obligatoirement par 5 insufflations initiales de sauvetage (pour réoxygéner les poumons), puis enchaîner 30 compressions / 2 insufflations.',
      'Si elle est inconsciente mais respire : Placer en PLS et couvrir chaudement.',
      'Si elle est consciente : Retirer les vêtements mouillés, sécher, réchauffer sous couverture et surveiller 24h (risque d’œdème pulmonaire retardé).'
    ],
    neverDoFr: 'Ne jamais appuyer sur le ventre du noyé pour tenter d’évacuer l’eau des poumons (provoque des vomissements dans les bronches).'
  },
  {
    id: 'fa-heatstroke',
    titleFr: '7. Coup de Chaud (Insolation)',
    titleEn: '7. Heatstroke & Severe Hyperthermia',
    subtitleFr: 'Hyperthermie maligne (> 40°C) ou épuisement par la chaleur',
    subtitleEn: 'Core temperature > 40°C / Heat exhaustion',
    badgeFr: 'OMBRE · REFROIDIR CORPS',
    color: 'amber',
    signsFr: [
      'Peau brûlante, rouge et souvent sèche (arrêt de la transpiration dans les formes graves)',
      'Maux de tête intenses, vertiges, nausées, crampes, propos incohérents, confusion ou somnolence'
    ],
    actionsFr: [
      'Installer immédiatement la victime à l’ombre ou dans la pièce la plus fraîche et aérée.',
      'La déshabiller et l’allonger (jambes légèrement surélevées).',
      'Refroidir activement : asperger d’eau fraîche, placer des linges mouillés froids sur le front, la nuque, les aisselles et l’aine, et ventiler vigoureusement.',
      'Si elle est parfaitement consciente : Faire boire par petites gorgées de l’eau fraîche ou une Solution de Réhydratation Orale (SRO).'
    ],
    neverDoFr: 'Ne jamais plonger brutalement dans une eau glacée sans surveillance et ne pas donner de paracétamol (inefficace et toxique pour le foie en déshydratation).'
  },
  {
    id: 'fa-bites-stings',
    titleFr: '8. Piqûre ou Morsure',
    titleEn: '8. Bites & Stings (Viper, Hornet, Tick, Animal)',
    subtitleFr: 'Vipère, guêpe/frelon, tique ou morsure animale',
    subtitleEn: 'Viper snakebite, hornet/wasp, tick, or animal bite',
    badgeFr: 'IMMOBILISER · DÉSINFECTER',
    color: 'emerald',
    signsFr: [
      'Morsure de vipère : 2 points de crochets espacés de 5–8 mm, douleur vive et gonflement rapide (œdème)',
      'Piqûre grave d’hyménoptère : piqûre dans la bouche/gorge, gonflement du visage, urticaire généralisé ou gêne respiratoire (choc anaphylactique)',
      'Tique : point noir fixé dans la peau'
    ],
    actionsFr: [
      'Morsure de vipère : Allonger et calmer la victime, retirer bagues/montre/chaussure, désinfecter et immobiliser le membre sans serrer.',
      'Piqûre guêpe/frelon : Racler le dard avec une carte rigide, appliquer du froid (sucer un glaçon si piqûre dans la bouche). Si allergie grave : stylo d’adrénaline (EpiPen) dans la cuisse.',
      'Piqûre de tique : Retirer avec un tire-tique en tournant doucement au ras de la peau, puis désinfecter (surveiller 30 jours).',
      'Morsure de chien/mammifère : Laver la plaie à l’eau et au savon de Marseille pendant 15 minutes complètes puis désinfecter.'
    ],
    neverDoFr: 'Morsure de vipère : Ne JAMAIS poser de garrot, ne jamais inciser ni sucer la plaie. Tique : Ne JAMAIS mettre d’éther, d’alcool ou d’huile avant de retirer la tique.'
  }
];
