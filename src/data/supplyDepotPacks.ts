export interface SupplyDepotPack {
  id: string;
  titleFr: string;
  titleEn: string;
  source: string;
  category: 'medecine' | 'eau-alimentation' | 'remedes' | 'survie' | 'bricolage' | 'manuels';
  categoryLabelFr: string;
  categoryLabelEn: string;
  badgeFr: string;
  badgeEn: string;
  filename: string;
  iconName:
    | 'heart-pulse'
    | 'droplet'
    | 'leaf'
    | 'sparkles'
    | 'stethoscope'
    | 'utensils'
    | 'snowflake'
    | 'compass'
    | 'link'
    | 'shield-check'
    | 'radiation'
    | 'baby'
    | 'clock'
    | 'sun'
    | 'wrench'
    | 'radio';
  shortDescFr: string;
  shortDescEn: string;
  contentFr: string;
}

export const SUPPLY_DEPOT_PACKS: SupplyDepotPack[] = [
  {
    id: 'pack-tccc-first-aid',
    titleFr: 'Premiers Secours — Les 8 Urgences Vitales',
    titleEn: 'First Aid — The 8 Vital Emergencies',
    source: 'Croix-Rouge (IFRC) · PSC1 · US Army TCCC',
    category: 'medecine',
    categoryLabelFr: 'Premiers Secours',
    categoryLabelEn: 'First Aid',
    badgeFr: '8 Urgences Vitales',
    badgeEn: '8 Vital Emergencies',
    filename: '01-Premiers-Secours-8-Urgences-Vitales.md',
    iconName: 'heart-pulse',
    shortDescFr: 'Malaise cardiaque, inconscience, hémorragie, étouffement, brûlure, noyade, coup de chaud, piqûre ou morsure.',
    shortDescEn: 'Cardiac arrest, unconsciousness, bleeding, choking, burns, drowning, heatstroke, bites and stings.',
    contentFr: `# MANUEL DE PREMIERS SECOURS : LES 8 URGENCES VITALES
Source : Directives Internationales Croix-Rouge (IFRC), PSC1 Sécurité Civile & US Army ATP 4-02.11 (TCCC)

---

## 1. MALAISE CARDIAQUE & ARRÊT CARDIAQUE
### A. Reconnaître le Malaise Cardiaque (Infarctus)
- **Signes d'alerte :** Douleur serrant la poitrine (« en étau »), irradiant souvent dans le bras gauche, la mâchoire, le cou ou le dos, accompagnée de sueurs, pâleur, essoufflement ou nausées.
- **Conduite à tenir immédiate :**
  1. **Mettez la victime au repos strict immédiat** (position assise ou demi-assise si elle est essoufflée, ou allongée si elle se sent étourdie). **Interdiction absolue de marcher.**
  2. Desserrez col, cravate et ceinture. Rassurez-la et appelez immédiatement le **15 (SAMU) ou le 112**.
  3. Demandez-lui si elle possède un traitement prescrit pour le cœur (trinitrine sublinguale) et aidez-la à le prendre.

### B. Arrêt Cardiaque (Inconscient qui ne respire plus ou « gasps »)
1. Allongez la victime sur le dos sur un plan dur.
2. **Massage cardiaque immédiat :** Placez le talon d'une main au **centre de la poitrine (sur la moitié inférieure du sternum)**, l'autre main par-dessus, bras tendus verticaux.
3. Enfoncez le thorax de **5 à 6 cm** au rythme de **100 à 120 compressions par minute** (2 par seconde) : **30 compressions suivies de 2 insufflations** (ou compressions continues si vous ne pouvez pas ventiler).
4. **Défibrillateur (DAE) :** Dès qu'un défibrillateur est disponible, allumez-le, collez les électrodes sur la poitrine nue et suivez ses consignes vocales.

---

## 2. INCONSCIENCE (VICTIME QUI NE RÉPOND PAS MAIS RESPIRE)
1. **Vérifier la conscience :** Secouez doucement les épaules et demandez fort : *« M'entendez-vous ? Serrez-moi les mains ! »*.
2. **Libérer les voies aériennes :** Desserrez le col et la ceinture, basculez prudemment la tête en arrière en soulevant le menton pour décoller la langue du fond de la gorge.
3. **Vérifier la respiration (pendant 10 secondes) :** Regardez si le ventre/thorax se soulève, écoutez le souffle et sentez l'air sur votre joue.
4. **Position Latérale de Sécurité (PLS) :** Si la victime **respire normalement**, tournez-la sur le côté en PLS, bouche ouverte orientée vers le sol (pour éviter qu'elle ne s'étouffe avec sa langue ou ses vomissements), couvrez-la et surveillez sa respiration toutes les minutes.

---

## 3. HÉMORRAGIE EXTERNE & SAIGNEMENT ABONDANT
### A. Compression Directe & Pansement Compressif
1. **Appuyez immédiatement et fortement** sur la plaie qui saigne avec la paume de la main (protégée par un linge propre, un gant ou un sac plastique).
2. Allongez la victime (pour éviter le malaise par chute de tension).
3. Maintenez la pression pendant **au moins 5 à 10 minutes sans relâcher** ou posez un **pansement compressif** serré. Si le sang traverse, rajoutez un second tissu par-dessus sans retirer le premier.

### B. Pose du Garrot Tourniquet (Si échec de la compression, membre arraché ou sang qui gicle)
1. Placez le garrot **5 à 7 cm au-dessus de la plaie** sur le bras ou la jambe (jamais sur une articulation : coude ou genou).
2. Serrez la sangle au maximum puis tournez la tige (cabestan) jusqu'à l'**arrêt total du saignement**.
3. **Règle d'or :** Notez l'heure exacte de pose (ex : \`T 15h40\`) sur le garrot ou le front du blessé. **Ne desserrez jamais un garrot une fois posé.**

---

## 4. ÉTOUFFEMENT (OBSTRUCTION DES VOIES AÉRIENNES)
### A. Obstruction Partielle (La victime tousse ou peut parler)
- **Ne tapez jamais dans le dos !** Installez-la assise, encouragez-la à tousser fort pour expulser le corps étranger.

### B. Obstruction Totale (Aucun son ne sort, bouche ouverte, mains à la gorge)
1. **5 Claques vigoureuses dans le dos :** Penchez la victime en avant et donnez 5 claques fermes avec le talon de la main ouverte **entre les deux omoplates**.
2. **5 Compressions abdominales (Manœuvre de Heimlich) :** Si le corps étranger n'est pas sorti, placez-vous derrière elle, posez votre poing fermé au creux de l'estomac (au-dessus du nombril, sous le sternum) et tirez franchement **vers l'arrière et vers le haut** 5 fois.
3. Alternez **5 claques dans le dos / 5 compressions de Heimlich** jusqu'à expulsion.
- *Cas particulier (Femme enceinte ou personne obèse) :* Remplacez les compressions abdominales par **5 compressions thoraciques** au milieu du sternum.
- *Cas du nourrisson (< 1 an) :* 5 claques dans le dos couché à plat ventre sur votre avant-bras (tête plus basse que les fesses), puis 5 compressions thoraciques avec **2 doigts**.

---

## 5. BRÛLURE (THERMIQUE, CHIMIQUE OU ÉLECTRIQUE)
1. **Refroidir immédiatement (Règle des 15) :** Faites couler de l'**eau tempérée (15 à 25°C, jamais glacée)** en jet doux à 15 cm au-dessus de la brûlure pendant **15 à 20 minutes** (sauf si la victime a très froid ou brûlure très étendue > 20% du corps).
2. Retirez les vêtements autour de la brûlure **uniquement s'ils ne collent pas à la peau**, ainsi que les bagues, montres et bracelets avant que le membre ne gonfle.
3. Protégez par un linge propre et sec ou une compresse stérile.
4. **Interdictions strictes :** Ne percez jamais les cloques. N'appliquez jamais de beurre, d'huile, de dentifrice, de vinaigre ni de glace.

---

## 6. NOYADE
1. **Sortir la victime de l'eau en sécurité** (en la maintenant horizontale si possible) sans vous mettre vous-même en danger.
2. **Si elle est consciente et tousse :** Déshabillez-la des vêtements mouillés, séchez-la, réchauffez-la sous une couverture et placez-la demi-assise. **Tout noyé même conscient doit être surveillé médicalement** (risque d'œdème pulmonaire dit « noyade secondaire » dans les 6 à 24h).
3. **Si elle est inconsciente et respire :** Mettez-la en **PLS** et couvrez-la chaudement.
4. **Si elle ne respire plus :** Contrairement à l'arrêt cardiaque classique, la noyade est une hypoxie : commencez obligatoirement par **5 insufflations initiales de sauvetage** (bouche-à-bouche), puis enchaînez sur **30 compressions thoraciques / 2 insufflations**.

---

## 7. COUP DE CHAUD (HYPERTHERMIE MALIGNE / INSOLATION)
- **Signes de gravité :** Température corporelle > 39,5°C – 40°C, peau brûlante (souvent sèche ou rouge), maux de tête violents, vertiges, propos incohérents, crampes ou perte de connaissance.
- **Conduite à tenir d'urgence :**
  1. **Transportez immédiatement la victime à l'ombre** ou dans un endroit frais et ventilé.
  2. **Déshabillez-la** au maximum.
  3. **Refroidissement actif immédiat :** Aspergez son corps d'eau fraîche, appliquez des linges mouillés froids sur le front, la nuque, les aisselles et les plis de l'aine, et éventez-la vigoureusement pour créer une évaporation.
  4. **Si elle est consciente et ne vomit pas :** Faites-lui boire de l'eau fraîche ou une Solution de Réhydratation Orale (SRO : eau + pincée de sel + sucre) par petites gorgées. *Note : le paracétamol est inefficace sur le coup de chaleur environnemental.*

---

## 8. PIQÛRE OU MORSURE (VIPÈRE, FRELON/GUÊPE, TIQUE, ANIMAL)
### A. Morsure de Vipère (Serpent venimeux en France)
1. **Allongez la victime et calmez-la absolument** (l'agitation accélère la diffusion du venin dans le sang).
2. Retirez immédiatement bagues, montre et chaussure du membre mordu (avant l'apparition de l'œdème).
3. Désinfectez la plaie et immobilisez le membre sans trop serrer.
4. **Interdictions vitales :** **Ne posez jamais de garrot**, n'incisez jamais la plaie, n'aspirez jamais le venin à la bouche et n'utilisez pas de pompe à venin sur une morsure de vipère.

### B. Piqûre de Guêpe, Abeille ou Frelon
- Retirez le dard en raclant tangentiellement avec le bord d'une carte rigide ou d'un ongle (sans presser la poche à venin avec une pince).
- **Alerte Choc Anaphylactique ou Piqûre dans la bouche/gorge :** Faire sucer de la glace pour limiter l'œdème de la gorge ; en cas de gêne respiratoire, gonflement du visage ou malaise, injectez immédiatement le stylo d'**adrénaline auto-injectable (EpiPen / Anapen)** sur la face externe de la cuisse.

### C. Piqûre de Tique (Prévention Maladie de Lyme)
- **N'appliquez jamais d'éther, d'alcool, d'huile ni de savon sur la tique avant de la retirer** (cela la fait régurgiter la bactérie *Borrelia* sous la peau).
- Saisissez la tique au plus près de la peau avec un **tire-tique**, tournez doucement sans tirer brusquement, puis désinfectez. Surveillez l'apparition d'un halo rouge circulaire pendant 30 jours.

### D. Morsure de Chien, Chat, Renard ou Chauve-souris (Risque Infectieux & Rage)
- **Lavez abondamment la plaie à l'eau courante et au savon de Marseille pendant 15 minutes complètes**, rincez, appliquez un antiseptique et couvrez d'un pansement stérile sans suturer hermétiquement.`
  },
  {
    id: 'pack-water-purification',
    titleFr: 'Eau Potable & Filtration d’Urgence',
    titleEn: 'Safe Drinking Water & Filtration',
    source: 'OMS / WHO & US Army TB MED 577',
    category: 'eau-alimentation',
    categoryLabelFr: 'Eau & Vivres',
    categoryLabelEn: 'Water & Food',
    badgeFr: '20 Mo · Potabilisation',
    badgeEn: '20 MB · Water Safety',
    filename: '02-Eau-Potable-Filtration.md',
    iconName: 'droplet',
    shortDescFr: 'Collecte, pré-filtration mécanique, ébullition, dosage exact de Javel et désinfection solaire SODIS.',
    shortDescEn: 'Water collection, mechanical pre-filtering, boiling, bleach dosing, and SODIS solar disinfection.',
    contentFr: `# MANUEL DE SURVIE : EAU POTABLE & FILTRATION D'URGENCE
Source : OMS (Guidelines for Drinking-water Quality), US Army TB MED 577 & Kiwix Water Treatment Library

---

## 1. BESOINS HYDRIQUES VITAUX
- **Minimum vital absolu :** 2,5 à 3 Litres d'eau potable par personne et par jour (boisson + préparation des aliments).
- **Effort physique ou forte chaleur :** 4 à 5 Litres par jour.
- **Règle absolue :** Ne buvez jamais d'eau de surface non traitée, même claire en montagne (risque de Giardia, Cryptosporidium, E. coli).

---

## 2. ÉTAPE 1 OBLIGATOIRE : CLARIFICATION (PRÉ-FILTRATION)
Aucun désinfectant chimique ni UV ne fonctionne correctement dans une eau boueuse ou trouble :
1. **Décantation :** Laissez reposer l'eau 1 à 2 heures dans un seau pour que la boue tombe au fond.
2. **Pré-filtre mécanique :** Passez l'eau claire du dessus à travers un filtre à café, un t-shirt en coton plié en 4 épaisseurs, ou un filtre gravitaire (sable fin + charbon de bois + gravier).

---

## 3. ÉTAPE 2 : DÉSINFECTION BIOLOGIQUE (3 MÉTHODES SÛRES)

### Méthode A — Ébullition (La plus fiable)
- Portez l'eau à **ébullition franche à gros bouillons pendant 1 minute complète** (3 minutes au-dessus de 2 000 m d'altitude).
- Élimine 100 % des bactéries, virus et parasites.

### Méthode B — Chloration à l'Eau de Javel (2,6 % de chlore actif, sans parfum)
| Volume d'eau | Eau claire | Eau très froide (< 10°C) ou légèrement trouble |
|---|---|---|
| **1 Litre** | **2 gouttes** | **4 gouttes** |
| **5 Litres** | **10 gouttes (0,5 mL)** | **20 gouttes (1 mL)** |
| **10 Litres** | **20 gouttes (1 mL)** | **40 gouttes (2 mL)** |

- **Temps d'attente obligatoire :** Mélangez et attendez **30 minutes** (60 minutes si l'eau est glacée) avant de boire. L'eau doit avoir une très légère odeur de chlore.

### Méthode C — Désinfection Solaire SODIS (Si aucun feu ni chlore)
- Remplissez des bouteilles en plastique **PET transparent** (sans rayures, maximum 2 L) d'eau pré-filtrée limpide.
- Exposez-les couchées au soleil : **6 heures en plein soleil** (ou **48 heures** si le ciel est nuageux).`
  },
  {
    id: 'pack-home-remedies',
    titleFr: 'Remèdes Maison & Soins Courants',
    titleEn: 'Verified Home Remedies Guide',
    source: 'CDC & NIH MedlinePlus (Nomad)',
    category: 'remedes',
    categoryLabelFr: 'Remèdes',
    categoryLabelEn: 'Remedies',
    badgeFr: '16 Remèdes Vérifiés',
    badgeEn: '16 Verified Remedies',
    filename: '03-Remedes-Maison-CDC-MedlinePlus.md',
    iconName: 'sparkles',
    shortDescFr: 'SRO (réhydratation orale), brûlures, plaies, toux, fièvre, entorses (RICE) et gargarismes salins.',
    shortDescEn: 'Oral rehydration salts (ORS), burns, wounds, cough, fever, sprains (RICE), and saline care.',
    contentFr: `# MANUEL DE SURVIE : REMÈDES MAISON & SOINS SANS PHARMACIE
Source : Collection Project NOMAD — US Government Health Guidance (CDC, NIH, MedlinePlus, FDA)

---

## 1. SOLUTION DE RÉHYDRATATION ORALE (SRO) MAISON
Indispensable en cas de diarrhée aiguë, vomissements ou coup de chaleur pour éviter la déshydratation mortelle :
- **Recette exacte pour 1 Litre d'eau potable (bouillie et refroidie) :**
  - **6 cuillères à café rases de sucre** (environ 30 g)
  - **1/2 cuillère à café rase de sel de table** (environ 2,5 à 3 g)
- **Administration :** Boire par petites gorgées toutes les 5 minutes. Ne jamais dépasser la dose de sel (un excès de sel aggrave la déshydratation).

---

## 2. BRÛLURES THERMIQUES LÉGÈRES À MODÉRÉES
- **Action immédiate :** Faites couler de l'**eau fraîche (15–20°C, jamais glacée)** doucement sur la brûlure pendant **10 à 15 minutes**.
- **Protection :** Couvrez avec un linge propre et sec ou une compresse stérile non adhérente.
- **Interdictions strictes (CDC) :** Ne mettez jamais de beurre, d'huile, de dentifrice ni de glace directe. Ne percez jamais les cloques.

---

## 3. TOUX, MAUX DE GORGE & CONGESTION NASALE
- **Miel (Adultes et enfants > 1 an) :** 1 à 2 cuillères à café pures ou dans une boisson tiède (recommandé par le CDC pour calmer la toux). *Attention : interdit chez le nourrisson de moins de 1 an (risque de botulisme infantile).*
- **Gargarisme à l'eau salée :** 1/2 cuillère à café de sel (3 g) dissoute dans un grand verre (240 mL) d'eau tiède. Gargariser 15 secondes puis recracher, 3 à 4 fois par jour.
- **Lavage nasal salin :** Utiliser **uniquement de l'eau bouillie refroidie ou stérile** (jamais d'eau du robinet non bouillie).

---

## 4. ENTORSES & TRAUMATISMES ARTICULAIRES (MÉTHODE R.I.C.E.)
1. **R — Rest (Repos) :** Mettre le membre au repos immédiat.
2. **I — Ice (Froid) :** Appliquer du froid enveloppé dans un linge pendant 10 à 15 minutes toutes les 2 heures (pendant les 72 premières heures).
3. **C — Compression :** Bandage souple maintenu sans couper la circulation.
4. **E — Elevation :** Surélever le membre au-dessus du niveau du cœur.

---

## 5. NETTOYAGE DES PLAIES & COUPURES
- Rincez abondamment à l'eau claire potable sous pression douce pour chasser les souillures.
- Nettoyez le pourtour au savon doux, comprimez avec une compresse propre jusqu'à l'arrêt du saignement, puis protégez par un pansement sec.`
  },
  {
    id: 'pack-natural-remedies',
    titleFr: 'Plantes Médicinales & Phytothérapie',
    titleEn: 'Medicinal Plants & Herbal Guide',
    source: 'NCCIH — Herbs at a Glance (Nomad)',
    category: 'remedes',
    categoryLabelFr: 'Remèdes',
    categoryLabelEn: 'Remedies',
    badgeFr: 'Plantes & Dosages',
    badgeEn: 'Herbs & Cautions',
    filename: '04-Plantes-Medicinales-NCCIH.md',
    iconName: 'leaf',
    shortDescFr: 'Aloe vera, camomille, gingembre, sureau, échinacée, saule et lavande : usages validés et précautions.',
    shortDescEn: 'Aloe vera, chamomile, ginger, elderberry, echinacea, willow, and lavender: uses and safety cautions.',
    contentFr: `# MANUEL DE SURVIE : PLANTES MÉDICINALES & PHYTOTHÉRAPIE DE TERRAIN
Source : Collection Project NOMAD — NCCIH (National Center for Complementary and Integrative Health)

---

## 1. ALOE VERA (*Aloe barbadensis miller*)
- **Usages validés :** Application locale du gel transparent de l'intérieur de la feuille sur les brûlures superficielles, coups de soleil et irritations cutanées.
- **Précautions :** Usage externe uniquement. Ne pas ingérer le latex jaune sous l'écorce (fortement laxatif et toxique pour le foie à forte dose).

## 2. GINGEMBRE (*Zingiber officinale*)
- **Usages validés :** Nausées, vomissements, mal des transports, crampes menstruelles et troubles digestifs.
- **Préparation :** Infusion de 1 à 2 g de rhizome frais râpé ou séché dans une tasse d'eau chaude pendant 10 minutes.

## 3. CAMOMILLE (*Matricaria chamomilla*)
- **Usages :** Troubles digestifs légers, spasmes gastro-intestinaux, anxiété légère, bain de bouche pour inflammations buccales.
- **Précautions :** Risque d'allergie chez les personnes sensibles aux Astéracées (ambroisie, chrysanthème).

## 4. SUREAU NOIR (*Sambucus nigra*)
- **Usages :** Soulagement des symptômes grippaux et infections respiratoires hautes (en sirop ou décoction cuite).
- **AVERTISSEMENT VITAL :** **Ne jamais consommer les baies de sureau crues ou vertes**, ni les feuilles ou l'écorce (contiennent des hétérosides cyanogènes provoquant vomissements et diarrhées sévères). Toujours faire bouillir les baies mûres.

## 5. ÉCHINACÉE (*Echinacea purpurea*) & MENTHE POIVRÉE (*Mentha × piperita*)
- **Échinacée :** En cure courte dès les premiers signes de refroidissement hivernal.
- **Menthe poivrée :** En infusion pour les spasmes digestifs et ballonnements ; en application locale diluée sur les tempes contre les céphalées de tension.

## 6. RÉGLISSE (*Glycyrrhiza glabra*)
- **Usages :** Gargarisme pour aphtes et maux de gorge.
- **Précautions :** Éviter toute consommation orale prolongée ou à forte dose (provoque de l'hypertension artérielle et des troubles du rythme cardiaque).`
  },
  {
    id: 'pack-emergency-conditions',
    titleFr: 'Diagnostic & Fiches Médicales d’Urgence',
    titleEn: 'Emergency Medical Conditions Reference',
    source: 'WHO-ICRC Basic Emergency Care & Nomad',
    category: 'medecine',
    categoryLabelFr: 'Médecine',
    categoryLabelEn: 'Medicine',
    badgeFr: '28 Pathologies',
    badgeEn: '28 Conditions',
    filename: '05-Fiches-Medicales-Urgence-OMS.md',
    iconName: 'stethoscope',
    shortDescFr: 'Guide de triage par symptôme : fièvre aiguë, déshydratation, réaction allergique, infection et douleur.',
    shortDescEn: 'Symptom-based triage guide: acute fever, dehydration, anaphylaxis, wound infection, and pain.',
    contentFr: `# MANUEL DE SURVIE : DIAGNOSTIC & CONDUITE À TENIR PAR SYMPTÔME
Source : OMS / ICRC (Basic Emergency Care) & Collection Conditions Project NOMAD

---

## 1. SIGNES DE GRAVITÉ ABSOLUE (DRAPEAUX ROUGES)
Consultez ou évacuez en priorité absolue tout patient présentant :
- **Détresse respiratoire :** Plus de 30 respirations/min chez l'adulte, lèvres bleutées (cyanose), impossibilité de parler en phrases complètes.
- **État de choc circulatoire :** Pouls radial filant ou très rapide (> 120 bpm), extrémités froides et marbrées, confusion mentale.
- **Déshydratation sévère :** Absence totale d'urine depuis plus de 8 heures, yeux creux, pli cutané persistant, léthargie.
- **Infection grave (Sepsis) :** Fièvre > 39°C ou hypothermie < 36°C associée à des frissons intenses, une confusion ou une traînée rouge remontant le long d'un membre (lymphangite).

---

## 2. FICHES DE PRISE EN CHARGE RAPIDE

### A. Fièvre Aiguë & Hyperthermie
- Découvrir le patient (ne pas l'emmitoufler sauf frissons intenses), aérer la pièce.
- Appliquer des compresses fraîches sur le front, la nuque et les plis de l'aine.
- Hydrater toutes les 15 minutes (eau ou SRO).
- *Alerte méningite :* Fièvre + raideur de la nuque + intolérance à la lumière ou taches violacées (purpura) = urgence vitale absolue.

### B. Réaction Allergique & Anaphylaxie
- **Allergie simple (urticaire isolé, rhinite) :** Éviction de l'allergène, compresse fraîche, antihistaminique oral si disponible.
- **Choc anaphylactique (gonflement de la langue/gorge, sifflement respiratoire, malaise) :** Injection intramusculaire immédiate d'adrénaline (stylo auto-injecteur) sur la face externe de la cuisse à travers le vêtement, allonger jambes surélevées.

### C. Infections Cutanées & Abcès
- Surveiller toute plaie : rougeur qui s'étend (tracer le contour au stylo pour suivre l'évolution), chaleur locale, gonflement et pus.
- Nettoyer à l'eau bouillie salée tiède (9 g de sel par litre) 2 à 3 fois par jour.`
  },
  {
    id: 'pack-food-preservation',
    titleFr: 'Conservation & Autonomie Alimentaire',
    titleEn: 'Food Preservation & Prepper Rations',
    source: 'USDA Complete Guide & Kiwix Food Prep',
    category: 'eau-alimentation',
    categoryLabelFr: 'Eau & Vivres',
    categoryLabelEn: 'Water & Food',
    badgeFr: '97 Mo · Rations & Stocks',
    badgeEn: '97 MB · Food Storage',
    filename: '06-Conservation-Autonomie-Alimentaire.md',
    iconName: 'utensils',
    shortDescFr: 'Conservation sans frigo, salaison, lacto-fermentation, séchage, rotation des stocks et sécurité alimentaire.',
    shortDescEn: 'No-fridge food preservation, salting, fermentation, dehydration, stock rotation, and botulism safety.',
    contentFr: `# MANUEL DE SURVIE : CONSERVATION & AUTONOMIE ALIMENTAIRE
Source : USDA Complete Guide to Home Canning & Kiwix Food for Preppers (zimgit-food-preparation)

---

## 1. QUE FAIRE DES ALIMENTS LORS D'UNE COUPURE DE COURANT ?
1. **Réfrigérateur (4°C) :** Garde le froid pendant **4 heures** s'il reste fermé. Consommez en priorité absolue : laitages frais, viandes, poissons et plats entamés.
2. **Congélateur (-18°C) :** Garde les aliments congelés pendant **48 heures** s'il est plein (24h s'il est à moitié plein). Enveloppez-le dans des couvertures sans boucher la grille arrière.

---

## 2. QUATRE MÉTHODES DE CONSERVATION SANS ÉLECTRICITÉ

### 1. Lacto-Fermentation (Légumes : chou, carottes, haricots)
- Râpez ou coupez les légumes, tassez-les fermement dans un bocal propre en verre.
- Couvrez d'une **saumure à 2 % ou 3 % de sel non iodé** (20 à 30 g de sel par litre d'eau bouillie refroidie).
- Les légumes doivent rester **totalement immergés** sous le liquide. Conservation : plusieurs mois au frais.

### 2. Salaison Sèche & Boucanage (Viandes et Poissons)
- Découpez en lanières fines de 5 mm d'épaisseur (sans aucune graisse).
- Frottez abondamment au gros sel sec (environ 100 g de sel par kg) pendant 12h, rincez rapidement, séchez puis suspendez au-dessus d'une fumée froide et sèche.

### 3. Déshydratation Solaire ou près d'un Poêle
- Tranchez fruits, légumes ou champignons très finement (3 à 4 mm) sur des claies aérées à l'abri des insectes.

---

## 3. PRÉVENTION DU BOTULISME (RÈGLE VITALE USDA)
- Tout bocal ou boîte de conserve dont le **couvercle est bombé**, qui **mousse à l'ouverture**, qui projette du liquide ou dégage une odeur suspecte doit être **jeté immédiatement sans même y goûter**.`
  },
  {
    id: 'pack-cold-weather',
    titleFr: 'Survie Grand Froid & Hypothermie',
    titleEn: 'Cold Weather Survival & Shelter',
    source: 'US Army TC 21-3 & Winter Prepping',
    category: 'survie',
    categoryLabelFr: 'Terrain & Abri',
    categoryLabelEn: 'Field & Shelter',
    badgeFr: 'Hiver & Abri',
    badgeEn: 'Cold & Shelter',
    filename: '07-Survie-Grand-Froid-TC21-3.md',
    iconName: 'snowflake',
    shortDescFr: 'Principe C.O.L.D., isolation thermique en intérieur sans chauffage, traitement de l’hypothermie et des gelures.',
    shortDescEn: 'C.O.L.D. layering rule, indoor micro-shelter without heating, hypothermia and frostbite care.',
    contentFr: `# MANUEL DE SURVIE : GRAND FROID, ABRI & HYPOTHERMIE
Source : US Army TC 21-3 (Cold Weather Survival and Operations)

---

## 1. LA RÈGLE MILITAIRE « C.O.L.D. » CONTRE LE FROID
- **C — Keep it CLEAN (Propre) :** Les vêtements encrassés par le sébum et la boue perdent leur pouvoir isolant.
- **O — Avoid OVERHEATING (Zéro transpiration) :** La sueur est mortelle par grand froid. Dès que vous commencez à avoir chaud pendant un effort, ouvrez votre col ou retirez une couche.
- **L — Wear it LOOSE and in LAYERS (Ample et multicouche) :** C'est l'air immobile emprisonné entre les couches qui isole. Des chaussures trop serrées bloquent le sang et causent des gelures.
- **D — Keep it DRY (Sec) :** L'eau conduit la chaleur 25 fois plus vite que l'air. Évitez le coton (gardez laine mérinos, polaire et synthétique).

---

## 2. SURVIVRE DANS UN LOGEMENT SANS CHAUFFAGE
1. **Créer une « Pièce dans la Pièce » :** Regroupez tous les occupants dans la plus petite pièce orientée au sud.
2. **Monter une tente sur le lit :** Montez une tente de camping directement sur le matelas et recouvrez-la de couettes : la température intérieure y monte de +8°C à +10°C grâce à la seule chaleur humaine.
3. **Isoler du sol :** Tapis, cartons épais et matelas mousse au sol.
4. **DANGER MONOXYDE DE CARBONE (CO) :** N'utilisez **jamais** de barbecue, brasero, réchaud de camping ou groupe électrogène dans un espace clos.

---

## 3. TRAITEMENT DE L'HYPOTHERMIE (< 35°C)
- **Hypothermie légère (frissons intenses, maladresse) :** Retirer les vêtements humides à l'abri du vent, habiller sec, boissons chaudes sucrées par petites gorgées.
- **Hypothermie sévère (arrêt des frissons, confusion, somnolence) :** Manipuler le blessé **avec une extrême douceur** (un mouvement brusque renvoie le sang glacé des membres vers le cœur et provoque une fibrillation ventriculaire). Réchauffer uniquement le tronc (bouillottes sous les aisselles et l'aine, jamais les membres).`
  },
  {
    id: 'pack-sere-manual',
    titleFr: 'Manuel SERE — Survie en Milieu Isolé',
    titleEn: 'SERE Field Survival Manual',
    source: 'USAF AFH 10-644 & US Army ATP 3-50.21',
    category: 'manuels',
    categoryLabelFr: 'Manuels',
    categoryLabelEn: 'Manuals',
    badgeFr: 'Orientation & Terrain',
    badgeEn: 'Field Operations',
    filename: '08-Manuel-SERE-Orientation-Terrain.md',
    iconName: 'compass',
    shortDescFr: 'Orientation sans GPS, abris naturels, allumage de feu sous la pluie, signalisation sol-air et règle des 3.',
    shortDescEn: 'No-GPS navigation, natural shelters, wet-weather firecraft, ground-to-air signals, and Rule of 3s.',
    contentFr: `# MANUEL DE SURVIE : OPÉRATIONS S.E.R.E. & ORIENTATION SANS GPS
Source : USAF AFH 10-644 (Survival, Evasion, Resistance, Escape) & US Army ATP 3-50.21

---

## 1. LA RÈGLE DES 3 & L'ACRONYME S.T.O.P.
- **3 minutes** sans oxygène (ou avec une hémorragie artérielle massive)
- **3 heures** exposé au froid extrême ou à la tempête sans abri
- **3 jours** sans eau
- **3 semaines** sans nourriture

Dès que vous êtes perdu ou isolé, appliquez **S.T.O.P.** :
- **S — Sit (Asseyez-vous)** pour stopper la panique et économiser votre énergie.
- **T — Think (Réfléchissez)** à votre dernier point connu et à l'heure du coucher du soleil.
- **O — Observe (Observez)** le relief, les points d'eau, les abris naturels et la météo.
- **P — Plan (Planifiez)** votre action avant la tombée de la nuit.

---

## 2. S'ORIENTER SANS BOUSSOLE NI GPS (FRANCE / HÉMISPHÈRE NORD)
### A. Avec une montre à aiguilles (ou dessinée sur papier à l'heure solaire)
1. Pointez la **petite aiguille (heures)** vers le Soleil.
2. La bissectrice (la ligne à mi-chemin) entre la petite aiguille et le chiffre **12** indique le **SUD** (en été, retirez 2 heures à l'heure légale française pour avoir l'heure solaire).

### B. La nuit avec l'Étoile Polaire (Nord géographique exact)
1. Repérez la casserole de la **Grande Ourse** (7 étoiles).
2. Prolongez **5 fois** la distance entre les 2 étoiles du bord extérieur du chaudron (Merak et Dubhe) : vous tombez pile sur l'**Étoile Polaire**, qui indique le **NORD**.

---

## 3. SIGNALISATION INTERNATIONALE SOL-AIR (POUR HÉLICOPTÈRE)
Tracez au sol dans une clairière dégagée des symboles d'au moins **3 mètres de long** (branches, pierres, tranchées dans la neige) :
- **V** : Besoin d'assistance (« Require Assistance »)
- **X** : Besoin de secours médical urgent (« Require Medical Assistance »)
- **N** : Non / Négatif
- **Y** : Oui / Affirmatif
- **↑** : Je progresse dans cette direction`
  },
  {
    id: 'pack-knots-lashings',
    titleFr: 'Nœuds, Cordages & Sutures de Terrain',
    titleEn: 'Knots, Lashings & Field Cordage',
    source: 'Kiwix Library of Knots (zimgit-knots)',
    category: 'survie',
    categoryLabelFr: 'Terrain & Abri',
    categoryLabelEn: 'Field & Shelter',
    badgeFr: '27 Mo · 8 Nœuds Vitaux',
    badgeEn: '27 MB · Essential Knots',
    filename: '09-Noeuds-Cordages-Abri.md',
    iconName: 'link',
    shortDescFr: 'Les 8 nœuds indispensables pour tendre une bâche, sécuriser une charge, franchir un obstacle ou brêler un abri.',
    shortDescEn: 'The 8 essential knots for tarp tensioning, load securing, rescue loops, and shelter lashings.',
    contentFr: `# MANUEL DE SURVIE : NŒUDS, CORDAGES & AMARRAGES DE TERRAIN
Source : Kiwix — A Library of Knots (zimgit-knots_en)

---

## LES 6 NŒUDS QUI COUVRENT 99 % DES BESOINS EN SURVIE

### 1. Nœud de Chaise (Bowline) — La boucle de sauvetage
- **Usage :** Créer une boucle fixe à l'extrémité d'une corde qui **ne coulissera jamais**, même sous le poids d'un homme, et reste facile à défaire après une forte traction.
- **Mémo classique :** « Le serpent sort du puits, fait le tour de l'arbre, et rentre dans le puits. »

### 2. Nœud de Cabestan (Clove Hitch) — Amarrage rapide sur un arbre
- **Usage :** Fixer rapidement le départ d'une corde ou d'une faîtière de bâche autour d'un tronc ou d'un poteau.
- **Astuce :** Terminez toujours par deux demi-clés de sécurité.

### 3. Nœud en Huit (Figure-Eight Loop) — Sécurité & Franchissement
- **Usage :** Nœud d'arrêt ou boucle d'encordement ultra-résistante (conserve jusqu'à 80 % de la résistance de la corde).

### 4. Nœud de Prusik ou Machard — Nœud autobloquant
- **Usage :** Permet de tendre une bâche à la perfection le long d'une corde faîtière : il coulisse quand on le pousse à la main et se bloque instantanément sous tension.

### 5. Nœud de Tendeur (Trucker's Hitch / Nœud de Camionneur)
- **Usage :** Crée un palan démultiplié (effet poulie 3:1) pour sangler lourdement du matériel sur un véhicule ou tendre une corde entre deux arbres.

### 6. Nœud Plat (Square Knot) & Nœud du Chirurgien
- **Usage :** Relier les deux brins d'un bandage ou d'une écharpe médicale à plat sans blesser le patient.`
  },
  {
    id: 'pack-field-sanitation',
    titleFr: 'Hygiène de Camp & Assainissement',
    titleEn: 'Field Sanitation & Epidemic Prevention',
    source: 'US Army ATP 4-25.12 Field Sanitation',
    category: 'eau-alimentation',
    categoryLabelFr: 'Eau & Vivres',
    categoryLabelEn: 'Water & Food',
    badgeFr: 'Anti-Épidémie',
    badgeEn: 'Sanitation',
    filename: '10-Hygiene-Assainissement-ATP4-25.md',
    iconName: 'shield-check',
    shortDescFr: 'Toilettes sèches d’urgence, gestion des eaux grises, désinfection et prévention des épidémies en blackout.',
    shortDescEn: 'Emergency dry toilets, greywater disposal, surface disinfection, and outbreak prevention.',
    contentFr: `# MANUEL DE SURVIE : HYGIÈNE DE CAMP & PRÉVENTION DES ÉPIDÉMIES
Source : US Army ATP 4-25.12 (Unit Field Sanitation) & Post-Disaster Resource Library

---

## 1. POURQUOI L'ASSAINISSEMENT EST CRITIQUE EN CRISE
Lors d'une coupure prolongée d'eau courante et d'égouts, la première cause de mortalité n'est pas le manque de nourriture mais la **transmission féco-orale** (dysenterie, choléra, gastro-entérites aiguës déshydratantes).

---

## 2. TOILETTES SÈCHES D'URGENCE EN APPARTEMENT OU MAISON
Si les chasses d'eau ne fonctionnent plus, **n'utilisez plus la cuvette reliée à l'égout** (risque de refoulement) :
1. **Système à deux seaux :** Séparez les urines (seau 1) et les matières fécales (seau 2 garni d'un sac poubelle épais).
2. **Couverture absorbante :** Après chaque passage, recouvrez immédiatement de sciure, copeaux de bois, litière végétale pour chat, cendres froides ou terre sèche pour bloquer les odeurs et les mouches.

---

## 3. RÈGLES D'IMPLANTATION EN EXTÉRIEUR (CAMPEMENT)
- Creusez les feuillées (tranchées sanitaires) à **au moins 30 mètres en aval** de tout point d'eau ou source, et à **100 mètres** de la zone de cuisine.
- Recouvrez de terre après chaque utilisation ; comblez complètement dès que la tranchée arrive à 30 cm de la surface.

---

## 4. LAVAGE DES MAINS ÉCONOME EN EAU (TIPPY-TAP)
- Percez un minuscule trou à la base d'un bidon suspendu : permet de se laver les mains au savon avec seulement **50 mL d'eau** au lieu d'1 litre.`
  },
  {
    id: 'pack-nrbc-nuclear',
    titleFr: 'Risques NRBC, Chimiques & Radioactivité',
    titleEn: 'CBRN, Hazmat & Fallout Survival',
    source: 'ORNL-5037 (Kearny) & ERG 2024',
    category: 'manuels',
    categoryLabelFr: 'Manuels',
    categoryLabelEn: 'Manuals',
    badgeFr: 'Confinement & 7-10',
    badgeEn: 'Shelter & 7-10 Rule',
    filename: '11-Survie-NRBC-Confinement-Kearny.md',
    iconName: 'radiation',
    shortDescFr: 'Confinement hermétique, blindage anti-retombées, règle de décroissance 7-10, décontamination et iode.',
    shortDescEn: 'Airtight sheltering, fallout shielding, 7-10 decay rule, decontamination, and potassium iodide.',
    contentFr: `# MANUEL DE SURVIE : RISQUES NRBC, ACCIDENT CHIMIQUE & RETOMBÉES
Source : Cresson Kearny (Nuclear War Survival Skills, ORNL-5037) & Emergency Response Guidebook 2024

---

## 1. ALERTE CHIMIQUE OU NUAGE TOXIQUE : LE CONFINEMENT IMMÉDIAT
Au signal national d'alerte (sirène modulée : 3 cycles d'1 min 41 s) :
1. **Rentrez immédiatement** dans le bâtiment en dur le plus proche.
2. **Calfeutrez toutes les entrées d'air :** Coupez la VMC et la climatisation. Scotchez (ruban adhésif large type duct tape) les contours des fenêtres, les grilles d'aération et placez un linge mouillé sous les portes.
3. **Écoutez France Inter (162 kHz GO / FM locale)** sur votre radio à piles.

---

## 2. PROTECTION CONTRE LES RETOMBÉES RADIOACTIVES (FALLOUT)
Les poussières radioactives mettent **15 à 30 minutes** à retomber après une détonation ou un rejet :
- **Principe de masse et distance :** Réfugiez-vous au sous-sol ou au centre du bâtiment, loin des murs extérieurs et surtout **loin du toit** (où les poussières s'accumulent).
- **Épaisseur réduisant le rayonnement gamma de moitié :**
  - **Béton :** 6 cm
  - **Terre tassée :** 9 cm
  - **Bois / Livres empilés :** 22 cm

---

## 3. LA RÈGLE DE DÉCROISSANCE « 7 - 10 »
La radioactivité des retombées diminue très rapidement avec le temps :
- À chaque fois que le temps écoulé est **multiplié par 7**, le débit de dose est **divisé par 10** :
  - **Après 7 heures :** il ne reste que **10 %** de l'intensité initiale (H+1).
  - **Après 49 heures (2 jours) :** il ne reste que **1 %** de l'intensité initiale.
  - **Après 2 semaines (343 h) :** il ne reste que **0,1 %**.
- **Règle d'or :** Restez strictement confiné pendant les **48 à 72 premières heures**.`
  },
  {
    id: 'pack-maternal-pediatric',
    titleFr: 'Accouchement & Soins Pédiatriques d’Urgence',
    titleEn: 'Emergency Childbirth & Pediatric Care',
    source: 'OMS / WHO Maternal & Newborn Care',
    category: 'medecine',
    categoryLabelFr: 'Médecine',
    categoryLabelEn: 'Medicine',
    badgeFr: 'Protocole OMS',
    badgeEn: 'WHO Protocol',
    filename: '12-Accouchement-Pediatrie-Urgence-OMS.md',
    iconName: 'baby',
    shortDescFr: 'Conduite à tenir lors d’un accouchement inopiné sans maternité, soins du cordon et urgences du nourrisson.',
    shortDescEn: 'Emergency out-of-hospital childbirth steps, umbilical cord care, and infant emergency care.',
    contentFr: `# MANUEL DE SURVIE : ACCOUCHEMENT INOPINÉ & URGENCES PÉDIATRIQUES
Source : OMS (Managing Complications in Pregnancy and Childbirth)

---

## 1. PRÉPARATION POUR UN ACCOUCHEMENT SANS ASSISTANCE MÉDICALE
La règle des **« 6 Propres » de l'OMS** :
1. Mains propres (lavées au savon et à l'eau bouillie)
2. Surface propre (draps propres chauffés)
3. Lame ou ciseaux stérilisés (bouillis 10 minutes)
4. Liens du cordon propres (fils solides bouillis)
5. Linge propre et chaud pour sécher le bébé
6. Périnée propre

---

## 2. ÉTAPES DE LA NAISSANCE
1. **Ne tirez jamais sur la tête du bébé :** Laissez la poussée naturelle faire progresser la tête, soutenez-la doucement avec une main propre.
2. **Dès la sortie :** Séchez immédiatement et vigoureusement le nouveau-né avec un linge chaud (le frottement stimule son premier cri et sa respiration), puis posez-le **peau à peau** sur le ventre de la mère sous une couverture sèche.
3. **Clampage et section du cordon :**
   - Attendez que le cordon **cesse de battre** (1 à 3 minutes après la naissance).
   - Nouez un premier lien stérile à **2 doigts (3 cm)** du nombril du bébé, et un second lien à **5 doigts (8 cm)**.
   - Coupez entre les deux liens avec la lame bouillie.

---

## 3. PRÉVENTION DE L'HÉMORRAGIE DU POST-PARTUM
- Mettez immédiatement le bébé au sein : la succion libère de l'ocytocine naturelle qui contracte l'utérus et limite les saignements.
- Après la sortie spontanée du placenta (15 à 30 min), massez fermement le bas-ventre de la mère si l'utérus semble mou.`
  },
  {
    id: 'pack-prolonged-care',
    titleFr: 'Soins Prolongés sans Évacuation (PCC)',
    titleEn: 'Prolonged Casualty Care (PCC > 72h)',
    source: 'Joint Trauma System — PCC Guidelines',
    category: 'medecine',
    categoryLabelFr: 'Médecine',
    categoryLabelEn: 'Medicine',
    badgeFr: 'Soins > 72h',
    badgeEn: 'Extended Care',
    filename: '13-Soins-Prolonges-Sans-Evacuation-PCC.md',
    iconName: 'clock',
    shortDescFr: 'Surveillance horaire d’un blessé, prévention des escarres, réhydratation et soins de plaies sur plusieurs jours.',
    shortDescEn: 'Hourly patient monitoring, pressure sore prevention, hydration, and multi-day wound care.',
    contentFr: `# MANUEL DE SURVIE : SOINS PROLONGÉS SANS ÉVACUATION (PCC)
Source : Joint Trauma System (Prolonged Casualty Care Guidelines)

---

## 1. LA GRILLE DE SURVEILLANCE HORAIRE (TENDANCES)
Lorsque les secours ne peuvent pas évacuer un blessé avant 24 à 72 heures, **notez par écrit toutes les heures** :
- **Fréquence cardiaque (Pouls) :** Normal adulte = 60 à 100 bpm. Si le pouls monte progressivement (> 110 bpm), suspectez un saignement interne, une déshydratation ou une douleur aiguë.
- **Fréquence respiratoire :** Normale = 12 à 20 cycles/min.
- **Conscience (Score AVPU) :** **A**lerte / répond à la **V**oix / répond à la **P**ain (douleur) / **U**nresponsive (inconscient).
- **Débit urinaire (Meilleur indicateur de perfusion) :** Un adulte bien perfusé doit uriner au moins **30 à 50 mL par heure** (environ un demi-verre toutes les 2 heures), urine jaune clair.

---

## 2. SOINS DE NURSING SUR PLUSIEURS JOURS
1. **Retournement toutes les 2 heures :** Tournez tout blessé alité ou inconscient de 30° (gauche / dos / droite) toutes les 2 heures en protégeant les talons, le sacrum et les coudes pour éviter les escarres.
2. **Changement des pansements :** Toutes les 24 heures (ou dès qu'ils sont souillés), nettoyez la plaie à l'eau bouillie salée tiède (9 g de sel / Litre).`
  },
  {
    id: 'pack-solar-lowtech',
    titleFr: 'Énergie Solaire, Batteries 12V & Low-Tech',
    titleEn: 'Off-Grid Solar, 12V Power & Low-Tech',
    source: 'Hundred Rabbits (100r) & Energypedia',
    category: 'bricolage',
    categoryLabelFr: 'Autonomie',
    categoryLabelEn: 'Off-Grid & DIY',
    badgeFr: '172 Mo · 12V & Solaire',
    badgeEn: '172 MB · Off-Grid',
    filename: '14-Energie-Solaire-12V-LowTech.md',
    iconName: 'sun',
    shortDescFr: 'Câblage solaire 12V, récupération de batterie automobile, règle du courant continu DC et économie d’énergie.',
    shortDescEn: '12V solar wiring, car battery recovery, DC-to-DC power efficiency, and extreme energy saving.',
    contentFr: `# MANUEL DE SURVIE : ÉNERGIE SOLAIRE, BATTERIES 12V & VIE HORS-RÉSEAU
Source : Hundred Rabbits (100r.co Field Notes) & Energypedia

---

## 1. LA RÈGLE D'OR ÉNERGÉTIQUE : RESTER EN COURANT CONTINU (DC)
- **Ne branchez jamais un onduleur 220V (Inverter)** pour charger des téléphones, des lampes ou une radio : l'onduleur gaspille **15 à 25 % de la batterie** en chaleur, même à vide.
- Utilisez directement une **prise allume-cigare 12V vers USB-C Power Delivery (PD 45W/65W)** : rendement supérieur à **94 %**.

---

## 2. EXPLOITER UNE BATTERIE AUTOMOBILE 12V EN SECOURS
Une batterie de voiture standard (12V / 60Ah) stocke environ **720 Wh** :
- **Batterie Plomb / AGM :** Ne descendez jamais sous **50 % de charge (12,05 Volts au multimètre)** sous peine de sulfater définitivement la batterie. Vous disposez donc d'environ **360 Wh utilisables** (soit ~30 recharges de smartphone ou 35 heures de PC en mode ECO Power).
- **Batterie LiFePO4 (Lithium Fer Phosphate) :** Exploitable à **85–90 %** de sa capacité sans dommage.
- **Sécurité câblage :** Branchez toujours la pince **ROUGE (+) en premier**, puis la **NOIRE (-)**. Pour débrancher : retirez la **NOIRE (-) en premier**.

---

## 3. OPTIMISER UN PANNEAU SOLAIRE PLIABLE EN FRANCE
- Orientation plein **SUD**, inclinaison à **35° en été** et **60° en hiver** pour capter le soleil bas.
- Attention aux ombres partielles : l'ombre d'une seule branche sur 10 % d'un panneau peut faire chuter sa production de **50 à 80 %**.`
  },
  {
    id: 'pack-repair-diy',
    titleFr: 'Réparation, Mécanique & Dépannage Terrain',
    titleEn: 'Field Repair, Mechanics & Appropriate Tech',
    source: 'iFixit & CD3WD Appropriate Tech',
    category: 'bricolage',
    categoryLabelFr: 'Autonomie',
    categoryLabelEn: 'Off-Grid & DIY',
    badgeFr: 'Dépannage & Outils',
    badgeEn: 'Repair & Mechanics',
    filename: '15-Reparation-Mecanique-Depannage-iFixit.md',
    iconName: 'wrench',
    shortDescFr: 'Dépannage électrique et mécanique sans pièces neuves, entretien groupe électrogène et colmatage d’urgence.',
    shortDescEn: 'Electrical and vehicle troubleshooting, generator maintenance, and emergency leak sealing.',
    contentFr: `# MANUEL DE SURVIE : RÉPARATION, MÉCANIQUE & DÉPANNAGE DE TERRAIN
Source : iFixit Repair Guides, CD3WD Appropriate Technology & Mechanics Q&A

---

## 1. DIAGNOSTIC D'UN MOTEUR THERMIQUE QUI NE DÉMARRE PAS (VOITURE / GROUPE ÉLECTROGÈNE)
Tout moteur à essence a besoin de 3 éléments : **Air + Carburant + Étincelle** :
1. **Carburant éventé :** L'essence SP95/E10 se dégrade en 3 à 6 mois et bouche le gicleur du carburateur. Vidangez la cuve du carburateur (vis de purge inférieure) et nettoyez le gicleur avec un brin de fil de cuivre souple.
2. **Bougie d'allumage :** Démontez la bougie, brossez les électrodes, réglez l'écartement à **0,7 mm** (épaisseur d'une lame de scie à métaux ou d'un ongle).
3. **Sécurité d'huile :** Sur 90 % des groupes électrogènes, un capteur bloque l'allumage si le niveau d'huile moteur est trop bas.

---

## 2. RÉPARATIONS D'URGENCE MULTIUSAGES
- **Soudure plastique / Colmatage de bidon percé :** Mélangez du **bicarbonate de soude** en poudre avec quelques gouttes de **colle cyanoacrylate (Super Glue)** : la réaction chimique instantanée crée un polymère dur comme de la pierre, étanche et ponçable.
- **Fusible grillé en urgence :** Ne remplacez jamais un fusible par un boulon (risque d'incendie du faisceau électrique). Recherchez d'abord le fil dénudé qui touche la masse métallique.`
  },
  {
    id: 'pack-radio-emergency-plan',
    titleFr: 'Radio d’Urgence, PMR446 & Plan Familial',
    titleEn: 'Emergency Radio Comms & Family Bug-Out',
    source: 'FEMA Ready.gov & Amateur Radio Q&A',
    category: 'survie',
    categoryLabelFr: 'Terrain & Abri',
    categoryLabelEn: 'Field & Shelter',
    badgeFr: 'Radio & Évacuation',
    badgeEn: 'Comms & Bug-Out',
    filename: '16-Radio-Urgence-Plan-Evacuation.md',
    iconName: 'radio',
    shortDescFr: 'Fréquences talkie-walkie PMR446 (Canal 8-16), écoute secours, alphabet OTAN, règle 3-3-3 et plan familial.',
    shortDescEn: 'PMR446 walkie-talkie channels (Ch 8-16), emergency broadcasts, NATO alphabet, and family evacuation plan.',
    contentFr: `# MANUEL DE SURVIE : COMMUNICATIONS RADIO & PLAN D'URGENCE FAMILIAL
Source : FEMA Ready.gov, CERT Basic Manual & Amateur Radio Emergency Comms

---

## 1. FRÉQUENCES RADIO D'URGENCE EN FRANCE & EUROPE
| Moyen | Fréquence / Canal | Usage Opérationnel |
|---|---|---|
| **Talkie-Walkie PMR446** | **Canal 8 (446.09375 MHz) · Sous-canal 16 (CTCSS 114.8 Hz)** | Canal d'entraide et de secours Montagne / Randonnée en France |
| **Talkie-Walkie PMR446** | **Canal 1 (446.00625 MHz) · Sans sous-canal (0)** | Appel général de proximité entre voisins |
| **VHF Marine / Fluvial** | **Canal 16 (156.800 MHz)** | Veille internationale de détresse maritime et côtière |
| **Radio Récepteur (Piles)** | **162 kHz (GO) / FM France Inter** | Consignes officielles de la Sécurité Civile et Préfectures |

---

## 2. PROTOCOLE DE VEILLE RADIO « 3 - 3 - 3 » (ÉCONOMIE DE BATTERIE)
Ne laissez jamais vos talkies-walkies allumés en permanence (vide la batterie en 8h). Allumez votre poste **toutes les 3 heures** (06h00, 09h00, 12h00, 15h00, 18h00, 21h00) pendant **3 minutes d'écoute** sur le canal convenu.

---

## 3. ALPHABET PHONÉTIQUE OTAN (POUR ÉPELER SANS ERREUR)
- **A** Alfa · **B** Bravo · **C** Charlie · **D** Delta · **E** Echo · **F** Foxtrot · **G** Golf
- **H** Hotel · **I** India · **J** Juliett · **K** Kilo · **L** Lima · **M** Mike · **N** November
- **O** Oscar · **P** Papa · **Q** Quebec · **R** Romeo · **S** Sierra · **T** Tango · **U** Uniform
- **V** Victor · **W** Whiskey · **X** X-ray · **Y** Yankee · **Z** Zulu`
  }
];
