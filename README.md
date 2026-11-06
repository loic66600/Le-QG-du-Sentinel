# LE QG DU SENTINEL — LE QUARTIER GÉNÉRAL
### Portail Autonome Hors-Ligne de Survie, Cartographie Eau & Hôpitaux de France, Premiers Secours & Résilience Blackout

**Développé et conçu par LORN Digital Studio**  
*Licence & Propriété Intellectuelle : © 2026 LORN Digital Studio. Tous droits réservés.*

---

## Présentation Générale

**LE QG DU SENTINEL (Le Quartier Général)** est une application web et mobile autonome, conçue pour fonctionner **100 % hors-ligne (Local-First / Air-Gap)** et activée d'office en **Mode ECO Power OLED (`#000000`)** afin de réduire au maximum la consommation électrique sur batterie d'ordinateur portable ou de smartphone.

### Fonctionnalités Principales

1. **🗺️ Cartographie Tactique & Régions de France (`Carte France`)**
   - Menu déroulant des **13 régions métropolitaines de France** (+ vue nationale).
   - **Recensement vérifié (0 point fictif)** :
     - **💧 Eau Potable** : bornes-fontaines communales, sources captées contrôlées, puits artésiens dans les villes, bourgs ruraux et villages de France.
     - **🚰 Eau Non Potable / Brute à traiter** : lavoirs communaux, puits ruraux, fontaines non chlorées, résurgences karstiques et lacs de retenue avec consignes de filtration et d'ébullition.
     - **🏥 Hôpitaux & Cliniques** : CHU, Centres Hospitaliers régionaux, hôpitaux d'instruction des armées (HIA) et cliniques disposant d'urgences 24h/24.
   - **Regroupement progressif au zoom (`Clusters Zoom`)** : affiche le décompte `💧 Potable · 🚰 Non Potable · 🏥 Soins` par zone et dégroupe automatiquement les points lorsque vous zoomez.
   - **Scanner OpenStreetMap (Overpass API) avec cache local persistant** : bouton `💧🚰🏥 Recenser Villages & Zone (OSM)` pour aspirer et sauvegarder hors-ligne toutes les fontaines, puits, sources et cliniques d'une zone.
   - **Pointage sans GPS (Recoupement boussole à 2 amers & Navigation à l'estime)** + Export `.GPX`.

2. **📚 Documentation d'Urgence (Fusion Premiers Secours + Sac 72h + Outils Critiques + 16 Manuels)**
   - **🫀 Premiers Secours (8 Urgences Vitales complètes)** :
     1. Malaise cardiaque (RCP 100–120/min & DAE)
     2. Inconscience qui respire (Position Latérale de Sécurité — PLS)
     3. Hémorragie externe (Compression directe & Garrot tourniquet)
     4. Étouffement / Obstruction des voies aériennes (5 claques + 5 compressions de Heimlich)
     5. Brûlure thermique, chimique ou électrique (Règle des 20)
     6. Noyade & Hypothermie d'immersion (5 insufflations initiales)
     7. Coup de chaud / Hyperthermie maligne
     8. Piqûre d'hyménoptère ou Morsure de vipère (Immobilisation sans garrot ni succion)
   - **💊 Référentiel Médicaments Hors-Ligne & Croisement Allergies Familiales** : posologies adultes/enfants, doses maximales, contre-indications et détection automatique des conflits avec la fiche médicale familiale.
   - **🧭 Matrice Décisionnelle d'Évacuation vs Confinement** : arbre de décision pondéré sur 8 critères + table des risques de mortalité en Micromorts.
   - **🚨 Balise SOS Acoustique (750 Hz CW) & Optique Plein Écran + Traducteur Morse**.
   - **🎒 Check-list Sac d'Évacuation 72h & Calculateur d'Eau / Calories & Dosage Chlore/Javel**.
   - **📖 16 Manuels de Survie Illustrés** mis en page pour une lecture rapide et téléchargeables en 1 clic, + explorateur direct d'archives hors-ligne `.ZIM` (Kiwix / WikiMed).

3. **📦 Stock de Survie & Inventaires Multi-Listes (`Stock de Survie`)**
   - Création et gestion de **plusieurs listes de stocks** (Maison, Sacs 72h, Véhicule, Pharmacie).
   - Suivi du **nombre de produits**, des **quantités exactes** et des **dates d'expiration** avec alertes visuelles (Méthode FEFO : *First Expired, First Out*) et export `.CSV`.

4. **📲 Installation sur Téléphone en Cas de Coupure Internet (`Installer sur Téléphone`)**
   - **Application Mobile PWA Hors-Ligne** installable sur l'écran d'accueil Android et iPhone (`manifest.webmanifest` + Service Worker).
   - **Générateur d'Application Mobile Autonome en 1 seul fichier (`Le-QG-du-Sentinel-Mobile-Autonome.html`)** : embarque les 8 Secours, les Points d'Eau & Hôpitaux de France, les Médicaments, le guide Blackout, la Fiche Familiale et la Balise SOS 750 Hz dans un fichier unique transférable par Bluetooth, câble USB ou AirDrop sans Internet.
   - **Partage Wi-Fi Local (`LAN`)** automatique entre le PC et les téléphones du foyer.

5. **⚡ Survie Sans Électricité & Résilience Blackout (`Blackout`)**
   - **Check-list Chronologique Interactive (0–15 min · 1h–24h · 72h+)**.
   - **10 Fiches d'Astuces & Bonnes Pratiques** : récupération des 200 L d'eau potable du chauffe-eau (Cumulus), cuisson passive en *Marmite Norvégienne* (-70 % de gaz), lanterne 360° sur bidon d'eau, chauffage d'hiver (*Tente dans le salon*) & prévention mortelle du Monoxyde de Carbone (CO), toilettes sèches à 2 seaux sans chasse d'eau, pièce de monnaie sur glaçon au congélateur, protection contre les surtensions EDF et batterie 12 V automobile.

6. **⚙️ Paramètres, Moniteur Système Temps Réel & Téléchargement Modèles IA (`Paramètres`)**
   - **Moniteur Ressources Système en Temps Réel** : Processeur (CPU), Mémoire RAM, Alimentation/Batterie et État Réseau.
   - **Fiche Médicale & Mémoire Familiale d'Urgence** injectée automatiquement dans l'Assistant IA de Survie.
   - **Téléchargement Direct des Modèles IA Recommandés** : installation en 1 clic via l'API locale Ollama avec barre de progression en direct, téléchargement direct des fichiers `.GGUF` (Llama 3.2 3B, IBM Granite 3.1 8B, Qwen 2.5 14B) et générateur de script `.BAT` automatique.

---

## Démarrage Rapide (Développement & Production)

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur local
npm run dev

# 3. Compiler pour la production
npm run build
```

---

## Licence

Copyright © 2026 **LORN Digital Studio**. Tous droits réservés.
