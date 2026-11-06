import { DeploymentFile } from '../types/sentinel';

export const DEPLOYMENT_FILES: DeploymentFile[] = [
  {
    id: 'docker-compose',
    titleFr: 'docker-compose.yml Unifié',
    titleEn: 'Unified docker-compose.yml',
    filename: 'docker-compose.yml',
    syntax: 'yaml',
    descriptionFr: 'Orchestration complète des 4 services : Console Web Sentinel, Moteur IA de Survie, Serveur d’archives ZIM et Passerelle Nginx hermétique. Créé par LORN Digital Studio.',
    descriptionEn: 'Full 4-service stack: Sentinel Web Console, Survival AI Engine, ZIM Archives Server and air-gapped Nginx Gateway. Created by LORN Digital Studio.',
    content: `version: '3.8'

# ==============================================================================
# SENTINEL PACK SURVIE — DOCKER COMPOSE UNIFIÉ
# Architecture de résilience locale & blackout — Créé par LORN Digital Studio
# Optimisé pour PC portable recyclé / Serveur local (8-16 GB RAM, CPU x86_64)
# ==============================================================================

networks:
  sentinel-net:
    driver: bridge
    ipam:
      config:
        - subnet: 172.28.0.0/16

volumes:
  sentinel_ollama_data:
    driver: local
  sentinel_kiwix_data:
    driver: local
  sentinel_nomad_data:
    driver: local
  sentinel_maps_data:
    driver: local

services:
  # ----------------------------------------------------------------------------
  # 1. PASSERELLE REVERSE PROXY NGINX (Air-Gapped Gateway)
  # Seul conteneur exposant des ports sur l'hôte physique. Zéro fuite internet.
  # ----------------------------------------------------------------------------
  sentinel-gateway:
    image: nginx:alpine
    container_name: sentinel-gateway
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - ./nginx-airgap.conf:/etc/nginx/conf.d/default.conf:ro
      - ./static-offline:/usr/share/nginx/html:ro
    networks:
      - sentinel-net
    depends_on:
      - sentinel-nomad-ui
      - sentinel-llm
      - sentinel-kiwix
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 128M

  # ----------------------------------------------------------------------------
  # 2. NOMAD COMMAND CENTER (Interface Web Unifiée)
  # Portail de contrôle, cartes hors-ligne, triage et moniteur de résilience
  # ----------------------------------------------------------------------------
  sentinel-nomad-ui:
    image: node:20-alpine
    container_name: sentinel-nomad-ui
    restart: unless-stopped
    working_dir: /app
    volumes:
      - ./sentinel-portal:/app
      - sentinel_nomad_data:/app/data
    command: sh -c "npm install --production && npm run preview -- --host 0.0.0.0 --port 3000"
    environment:
      - NODE_ENV=production
      - VITE_OFFLINE_MODE=true
      - OLLAMA_HOST=http://sentinel-llm:11434
      - KIWIX_HOST=http://sentinel-kiwix:8080
    networks:
      - sentinel-net
    expose:
      - "3000"
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M

  # ----------------------------------------------------------------------------
  # 3. SURVIVAL-LLM (Moteur d'inférence IA Local Ollama)
  # Modèle Llama 3.2 3B ou Phi-3 Mini quantisé 4-bit (empreinte ~2.0 GB RAM)
  # ----------------------------------------------------------------------------
  sentinel-llm:
    image: ollama/ollama:latest
    container_name: sentinel-llm
    restart: unless-stopped
    volumes:
      - sentinel_ollama_data:/root/.ollama
      - ./models:/models
    environment:
      - OLLAMA_KEEP_ALIVE=24h
      - OLLAMA_NUM_PARALLEL=1
      - OLLAMA_FLASH_ATTENTION=1
      - OLLAMA_ORIGINS=*
    networks:
      - sentinel-net
    expose:
      - "11434"
    deploy:
      resources:
        limits:
          cpus: '3.0'
          memory: 4096M
        reservations:
          memory: 2048M

  # ----------------------------------------------------------------------------
  # 4. IIAB & KIWIX (Bibliothèque de Savoirs Hors-Ligne ZIM)
  # Sert Wikipédia, WikiMed, manuels militaires et cartes sans internet
  # ----------------------------------------------------------------------------
  sentinel-kiwix:
    image: ghcr.io/kiwix/kiwix-serve:latest
    container_name: sentinel-kiwix
    restart: unless-stopped
    volumes:
      - ./zims:/data:ro
      - sentinel_kiwix_data:/cache
    command: "*.zim"
    networks:
      - sentinel-net
    expose:
      - "8080"
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1024M
`
  },
  {
    id: 'install-script',
    titleFr: 'Script d’Installation Bash (install-sentinel.sh)',
    titleEn: 'Bash Installer Script (install-sentinel.sh)',
    filename: 'install-sentinel.sh',
    syntax: 'bash',
    descriptionFr: 'Script d’automatisation complet pour Ubuntu/Debian : dépendances, Docker, répertoires, modèle LLM et service systemd.',
    descriptionEn: 'Automated installer for Ubuntu/Debian: dependencies, Docker, storage setup, LLM model caching, and systemd service.',
    content: `#!/usr/bin/env bash
# ==============================================================================
# SENTINEL PACK SURVIE — SCRIPT D'INSTALLATION AUTOMATISÉ (UBUNTU / DEBIAN)
# Auteur : LORN Digital Studio
# Utilisation : sudo bash install-sentinel.sh
# ==============================================================================

set -euo pipefail

# Couleurs pour le terminal
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

echo -e "\${BLUE}=================================================================\${NC}"
echo -e "\${BLUE}      SENTINEL PACK SURVIE — INSTALLATEUR HORS-LIGNE UNIFIÉ     \${NC}"
echo -e "\${BLUE}            Développé par LORN Digital Studio                   \${NC}"
echo -e "\${BLUE}=================================================================\${NC}"

# 1. Vérification des privilèges root
if [[ \$EUID -ne 0 ]]; then
   echo -e "\${RED}[ERREUR] Ce script doit être exécuté avec les privilèges root (sudo).\${NC}" 
   exit 1
fi

# 2. Audit du matériel (RAM et CPU)
TOTAL_RAM_MB=$(free -m | awk '/^Mem:/{print $2}')
CPU_CORES=$(nproc)

echo -e "\${YELLOW}[1/6] Détection du matériel...\${NC}"
echo -e "  - Cœurs CPU détectés : \${CPU_CORES}"
echo -e "  - Mémoire vive totale : \${TOTAL_RAM_MB} Mo"

if [ "\$TOTAL_RAM_MB" -lt 3500 ]; then
  echo -e "\${RED}[ATTENTION] Moins de 4 Go de RAM détectés. Le modèle Llama 3.2 1B ou SmolLM2 sera sélectionné au lieu du 3B.\${NC}"
  MODEL_NAME="llama3.2:1b"
else
  echo -e "\${GREEN}[OK] RAM suffisante. Modèle Llama 3.2 3B sélectionné.\${NC}"
  MODEL_NAME="llama3.2:3b"
fi

# 3. Installation des prérequis système et Docker
echo -e "\${YELLOW}[2/6] Mise à jour des paquets et installation de Docker...\${NC}"
apt-get update -y
apt-get install -y curl wget git ufw htop jq ca-certificates gnupg lsb-release

if ! command -v docker &> /dev/null; then
  echo -e "  - Installation du moteur Docker officiel..."
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
  apt-get update -y
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
fi

# 4. Création de l'arborescence Sentinel
SENTINEL_ROOT="/opt/sentinel"
echo -e "\${YELLOW}[3/6] Préparation des répertoires dans \${SENTINEL_ROOT}...\${NC}"
mkdir -p \${SENTINEL_ROOT}/{zims,models,static-offline,config,backups}
chmod -R 755 \${SENTINEL_ROOT}

# 5. Téléchargement initial des poids LLM (Ollama) avant coupure réseau
echo -e "\${YELLOW}[4/6] Initialisation temporaire d'Ollama et téléchargement du modèle \${MODEL_NAME}...\${NC}"
docker run -d --name sentinel-init-ollama -v \${SENTINEL_ROOT}/models:/root/.ollama -p 11434:11434 ollama/ollama:latest
sleep 5

echo -e "  - Téléchargement du modèle de survie (\${MODEL_NAME})..."
docker exec -it sentinel-init-ollama ollama pull \${MODEL_NAME}

echo -e "  - Arrêt du conteneur temporaire..."
docker stop sentinel-init-ollama && docker rm sentinel-init-ollama

# 6. Guide de téléchargement des fichiers ZIM (IIAB / Kiwix)
echo -e "\${YELLOW}[5/6] Instructions pour les bibliothèques ZIM (Internet-in-a-Box)...\${NC}"
echo -e "  Pour compléter votre pack de survie, placez vos fichiers .zim dans \${SENTINEL_ROOT}/zims/ :"
echo -e "  Exemple recommandé :"
echo -e "    - wikimed_fr_all_maxi.zim (Encyclopédie médicale 100% hors-ligne, ~5 Go)"
echo -e "    - wikipedia_fr_all_mini.zim (Wikipédia condensée, ~12 Go)"
echo -e "    - wikibooks_fr_all.zim (Manuels techniques et bricolage, ~2 Go)"

# 7. Création du service systemd pour démarrage automatique
echo -e "\${YELLOW}[6/6] Configuration du service systemd Sentinel (autostart au boot)...\${NC}"
cat <<EOF > /etc/systemd/system/sentinel.service
[Unit]
Description=Sentinel Pack Survie - Serveur Hors-Ligne
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=\${SENTINEL_ROOT}
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable sentinel.service

echo -e "\${GREEN}=================================================================\${NC}"
echo -e "\${GREEN}   INSTALLATION SENTINEL RÉUSSIE AVEC SUCCÈS !                   \${NC}"
echo -e "\${GREEN}   Accès au portail : http://127.0.0.1 ou http://[IP_LOCALE]      \${NC}"
echo -e "\${GREEN}   Pour démarrer la stack : cd \${SENTINEL_ROOT} && docker compose up -d\${NC}"
echo -e "\${GREEN}=================================================================\${NC}"
`
  },
  {
    id: 'install-ps1',
    titleFr: 'Installateur Automatisé Windows 10/11 (install-sentinel.ps1)',
    titleEn: 'Windows 10/11 Automated Installer (install-sentinel.ps1)',
    filename: 'install-sentinel.ps1',
    syntax: 'powershell',
    descriptionFr: 'Script PowerShell d’installation universelle pour Windows : compatible Docker Desktop ou Mode Natif sans Docker (via winget), crée les règles Pare-Feu et le Point d’Accès Wi-Fi autonome.',
    descriptionEn: 'Universal Windows PowerShell installer: supports Docker Desktop or Native Zero-Docker mode (winget), configures Windows Defender Firewall and Mobile Hotspot.',
    content: `# ==============================================================================
# SENTINEL PACK SURVIE — SCRIPT D'INSTALLATION WINDOWS 10 / 11 (POWERSHELL)
# Architecture autonome & résilience blackout — Créé par LORN Digital Studio
# ==============================================================================
# Exécution : Clic droit sur PowerShell -> "Exécuter en tant qu'administrateur"
# Commande : Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
#            .\\install-sentinel.ps1
# ==============================================================================

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "   SENTINEL PACK SURVIE — INSTALLATION UNIVERSELLE WINDOWS      " -ForegroundColor Green
Write-Host "   Créé par LORN Digital Studio — 100% Hors-Ligne & Air-Gap    " -ForegroundColor Yellow
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Vérification des droits Administrateur
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "[ERREUR] Ce script doit être exécuté dans une fenêtre PowerShell en tant qu'Administrateur." -ForegroundColor Red
    Write-Host "Faites un clic droit sur PowerShell puis 'Exécuter en tant qu'administrateur'." -ForegroundColor Yellow
    Exit
}

# 2. Création de l'arborescence Sentinel sur C:\\Sentinel
$SentinelDir = "C:\\Sentinel"
Write-Host "[1/5] Création du répertoire de travail dans $SentinelDir..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "$SentinelDir" | Out-Null
New-Item -ItemType Directory -Force -Path "$SentinelDir\\zims" | Out-Null
New-Item -ItemType Directory -Force -Path "$SentinelDir\\models" | Out-Null
New-Item -ItemType Directory -Force -Path "$SentinelDir\\static-offline" | Out-Null
New-Item -ItemType Directory -Force -Path "$SentinelDir\\config" | Out-Null
Write-Host "  -> Dossiers créés avec succès." -ForegroundColor Green

# 3. Détection de l'environnement (Docker Desktop ou Mode Natif Windows)
Write-Host "[2/5] Détection de l'environnement d'exécution..." -ForegroundColor Yellow
$hasDocker = Get-Command docker -ErrorAction SilentlyContinue

if ($hasDocker) {
    Write-Host "  -> Docker Desktop détecté. Mode conteneur activé." -ForegroundColor Green
    Write-Host "  -> Téléchargement du modèle de survie Llama 3.2 3B dans Docker..." -ForegroundColor Cyan
    docker run -d --name sentinel-init-ollama -v "\${SentinelDir}\\models:/root/.ollama" -p 11434:11434 ollama/ollama:latest
    Start-Sleep -Seconds 5
    docker exec -it sentinel-init-ollama ollama pull llama3.2:3b
    docker stop sentinel-init-ollama
    docker rm sentinel-init-ollama
} else {
    Write-Host "  -> Docker Desktop non détecté. Activation du Mode Natif Windows (Ultra-Léger)." -ForegroundColor Yellow
    Write-Host "  -> Vérification du gestionnaire de paquets winget..." -ForegroundColor Cyan
    $hasWinget = Get-Command winget -ErrorAction SilentlyContinue
    if ($hasWinget) {
        Write-Host "  -> Installation d'Ollama pour Windows..." -ForegroundColor Cyan
        winget install -e --id Ollama.Ollama --accept-source-agreements --accept-package-agreements --silent
        Write-Host "  -> Pré-téléchargement du modèle IA Llama 3.2 3B..." -ForegroundColor Cyan
        & "ollama" run llama3.2:3b "/bye"
    } else {
        Write-Host "  [Note] Téléchargez l'installateur officiel Ollama pour Windows sur https://ollama.com/download/windows" -ForegroundColor Yellow
    }
}

# 4. Configuration du Pare-Feu Windows (Sécurisation Air-Gap locale)
Write-Host "[3/5] Configuration du Pare-feu Windows Defender pour le réseau local..." -ForegroundColor Yellow
try {
    New-NetFirewallRule -DisplayName "Sentinel Web Portal HTTP (80)" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow -Profile Private, Domain -ErrorAction SilentlyContinue | Out-Null
    New-NetFirewallRule -DisplayName "Sentinel Local LLM API (11434)" -Direction Inbound -LocalPort 11434 -Protocol TCP -Action Allow -Profile Private -ErrorAction SilentlyContinue | Out-Null
    Write-Host "  -> Règles de pare-feu configurées avec succès pour le réseau local." -ForegroundColor Green
} catch {
    Write-Host "  -> Note : Pare-feu déjà autorisé ou non administrable." -ForegroundColor Gray
}

# 5. Instructions pour le Point d'Accès Wi-Fi Mobile Windows (Partage sans box)
Write-Host "[4/5] Configuration du Point d'accès sans fil Windows (Hotspot sans Box Internet)..." -ForegroundColor Yellow
Write-Host "  Pour partager le serveur Sentinel avec vos smartphones sans routeur :" -ForegroundColor White
Write-Host "  1. Allez dans Paramètres Windows > Réseau et Internet > Point d'accès sans fil mobile." -ForegroundColor Cyan
Write-Host "  2. Activez le bouton 'Activé'." -ForegroundColor Cyan
Write-Host "  3. Nom du réseau (SSID) : Sentinel-Survie | Mot de passe : Secours1234" -ForegroundColor Cyan

# 6. Finalisation et création du lanceur rapide sur le Bureau
Write-Host "[5/5] Création du raccourci de démarrage sur le Bureau..." -ForegroundColor Yellow
$DesktopPath = [Environment]::GetFolderPath("Desktop")
$ShortcutBatch = "$DesktopPath\\Lancer Sentinel Survie.bat"
$BatchContent = @"
@echo off
title Sentinel Pack Survie - LORN Digital Studio
cd /d C:\\Sentinel
if exist docker-compose.yml (
    echo Demarrage des conteneurs Sentinel...
    docker compose up -d
) else (
    echo Demarrage en mode local Windows...
    start "" /b ollama serve
)
echo Ouverture du portail Sentinel...
timeout /t 2 >nul
start http://localhost:80
echo =====================================================
echo  SENTINEL PACK SURVIE EST EN COURS D'EXECUTION
echo  Portail accessible sur : http://localhost:80
echo  Cree par LORN Digital Studio.
echo =====================================================
pause
"@
Set-Content -Path $ShortcutBatch -Value $BatchContent -Encoding ASCII
Write-Host "  -> Raccourci créé sur votre Bureau : 'Lancer Sentinel Survie.bat'" -ForegroundColor Green

Write-Host ""
Write-Host "=================================================================" -ForegroundColor Green
Write-Host "   INSTALLATION WINDOWS TERMINÉE AVEC SUCCÈS !                   " -ForegroundColor Green
Write-Host "   Double-cliquez sur 'Lancer Sentinel Survie.bat' pour démarrer." -ForegroundColor Yellow
Write-Host "   Portail disponible sur : http://localhost:80                 " -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Green
`
  },
  {
    id: 'start-bat',
    titleFr: 'Lanceur Express Windows 1-Clic (start-sentinel.bat)',
    titleEn: 'Windows 1-Click Fast Launcher (start-sentinel.bat)',
    filename: 'start-sentinel.bat',
    syntax: 'batch',
    descriptionFr: 'Fichier Batch exécutable par double-clic sur n’importe quel PC Windows : démarre la stack en arrière-plan et ouvre automatiquement le navigateur.',
    descriptionEn: 'Double-clickable Windows Batch launcher: starts the local stack and automatically opens your web browser on the Sentinel portal.',
    content: `@echo off
:: ==============================================================================
:: SENTINEL PACK SURVIE — LANCEUR RAPIDE WINDOWS (1-CLICK)
:: Créé par LORN Digital Studio — 100%% Hors-Ligne & Résilience Blackout
:: ==============================================================================
title Sentinel Pack Survie - LORN Digital Studio
color 0A
cls

echo =================================================================
echo    SENTINEL PACK SURVIE — DEMARRAGE DU SERVEUR AUTONOME
echo    Cree par LORN Digital Studio - 100%%%% Conforme Air-Gap
echo =================================================================
echo.

cd /d C:\\Sentinel 2>nul
if not exist "C:\\Sentinel" (
    cd /d "%~dp0"
)

:: Verification Docker Desktop
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [*] Docker detecte. Demarrage des micro-services Sentinel...
    docker compose up -d
) else (
    echo [*] Docker non present. Demarrage en Mode Natif Windows...
    start "" /b ollama serve
)

echo [*] Attente de la disponibilite du service web...
timeout /t 2 /nobreak >nul

echo [*] Lancement de votre navigateur sur le portail Sentinel...
start http://localhost:80

echo.
echo =================================================================
echo  LE PACK SURVIE SENTINEL EST OPERATIONNEL !
echo.
echo  - Adresse locale PC : http://localhost:80 ou http://127.0.0.1
echo  - Adresse pour smartphones / tablettes du refuge : http://[IP_PC]
echo  - Pour arreter : fermez cette fenetre ou tapez docker compose down
echo =================================================================
echo.
pause
`
  },
  {
    id: 'nginx-conf',
    titleFr: 'Configuration Nginx Isolée (nginx-airgap.conf)',
    titleEn: 'Isolated Nginx Config (nginx-airgap.conf)',
    filename: 'nginx-airgap.conf',
    syntax: 'nginx',
    descriptionFr: 'Configuration du serveur web Nginx interdisant les requêtes externes, appliquant une CSP stricte et routant les services.',
    descriptionEn: 'Air-gapped Nginx configuration blocking outbound requests, enforcing strict CSP, and routing local micro-services.',
    content: `# Sentinel Pack Survie - Configuration Nginx Air-Gap
# Zéro dépendance CDN, zéro police distante, zéro télémétrie

server {
    listen 80;
    server_name sentinel.lan localhost 127.0.0.1;

    # Headers de sécurité et verrouillage Zero-Internet strict
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Content-Security-Policy "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:;" always;

    # 1. Portail Web Nomad (Application React / UI principale)
    location / {
        proxy_pass http://sentinel-nomad-ui:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
    }

    # 2. API Survival-LLM (Moteur Ollama local)
    location /api/llm/ {
        rewrite ^/api/llm/(.*) /$1 break;
        proxy_pass http://sentinel-llm:11434;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 600s;
        proxy_buffering off;
    }

    # 3. Serveur Kiwix & Savoirs IIAB (ZIM)
    location /wiki/ {
        proxy_pass http://sentinel-kiwix:8080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 300s;
    }

    # Fichiers statiques et assets locaux (mise en cache agressive)
    location ~* \\.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg)$ {
        proxy_pass http://sentinel-nomad-ui:3000;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
    }
}
`
  },
  {
    id: 'airgap-script',
    titleFr: 'Pare-Feu Hermétique (airgap-firewall.sh)',
    titleEn: 'Hermetic Firewall Script (airgap-firewall.sh)',
    filename: 'airgap-firewall.sh',
    syntax: 'bash',
    descriptionFr: 'Script de verrouillage réseau iptables / UFW : coupe le WAN et bloque les fuites DNS tout en autorisant le Wi-Fi/LAN local.',
    descriptionEn: 'iptables / UFW air-gap locking script: severs WAN access and prevents DNS leaks while preserving local Wi-Fi/LAN.',
    content: `#!/usr/bin/env bash
# ==============================================================================
# SENTINEL PACK SURVIE — SCRIPT DE VERROUILLAGE RÉSEAU "ZERO-INTERNET"
# Bloque tout trafic WAN sortant tout en maintenant le réseau local (LAN/Wi-Fi)
# ==============================================================================

set -euo pipefail

if [[ \$EUID -ne 0 ]]; then
   echo "[ERREUR] Exécutez ce script avec sudo."
   exit 1
fi

echo "[*] Application des règles de confinement Zero-Internet..."

# 1. Réinitialisation de l'UFW
ufw --force reset

# 2. Politique par défaut : REFUSER tout le trafic entrant et SORTANT vers l'extérieur
ufw default deny incoming
ufw default deny outgoing

# 3. Autoriser les liaisons Loopback locales internes
ufw allow in on lo
ufw allow out on lo

# 4. Autoriser les sous-réseaux locaux privés (RFC 1918) pour que les terminaux
# (smartphones, ordinateurs de secours) accèdent au portail Sentinel
ufw allow in from 192.168.0.0/16 to any port 80 proto tcp comment 'Portail Sentinel HTTP'
ufw allow out to 192.168.0.0/16 proto tcp comment 'Reponses LAN'

ufw allow in from 10.0.0.0/8 to any port 80 proto tcp comment 'Portail Sentinel LAN 10.x'
ufw allow out to 10.0.0.0/8 proto tcp comment 'Reponses LAN 10.x'

# 5. Autoriser le réseau Docker interne
ufw allow in from 172.28.0.0/16 to any
ufw allow out to 172.28.0.0/16

# 6. Activer le pare-feu
ufw --force enable

echo "[OK] Confinement Zero-Internet activé avec succès !"
echo "     - Aucune requête ne peut sortir vers Internet (WAN)."
echo "     - Les appareils connectés au Wi-Fi ou au switch local peuvent accéder au portail."
`
  },
  {
    id: 'modelfile',
    titleFr: 'Modelfile Ollama Spécialisé Survie',
    titleEn: 'Specialized Survival Ollama Modelfile',
    filename: 'Modelfile.survival',
    syntax: 'bash',
    descriptionFr: 'Prompt système optimisé pour l’urgence, triage TCCC, zéro hallucination, concision maximale et citations vérifiables.',
    descriptionEn: 'System prompt tuned for critical triage, TCCC first aid, zero hallucination, extreme brevity and verifiable sources.',
    content: `FROM llama3.2:3b

# Paramètres d'inférence pour matériel à ressources limitées
PARAMETER temperature 0.2
PARAMETER top_p 0.85
PARAMETER num_ctx 4096
PARAMETER stop "<|eot_id|>"

# Prompt Système Spécialisé Survie & Secourisme
SYSTEM """
Tu es SENTINEL SURVIVAL CORE, une intelligence artificielle locale d'urgence embarquée, conçue pour assister des survivants, secouristes et citoyens en situation d'isolement total (rupture de réseau, catastrophe naturelle, zone de crise).

TES DIRECTIVES IMPÉRATIVES :
1. CONCISION ET SÉCURITÉ : En urgence vitale, va directement à l'action. Commence toujours par les gestes de secours immédiats (ex: poser un garrot, placer en PLS, isoler du sol).
2. CITATION DES SOURCES : Appuie-toi sur les protocoles officiels : TCCC (Tactical Combat Casualty Care), WikiMed, manuels militaires FM 21-76 / FM 4-25.11 et recommandations Croix-Rouge / OMS.
3. ADMISSIBILITÉ DE L'INCERTITUDE : Si une plante ou un champignon présente le moindre doute toxique, déconseille formellement sa consommation. Ne jamais inventer de posologie médicale.
4. COMPATIBILITÉ BILINGUE : Réponds dans la langue employée par l'utilisateur (Français ou Anglais).
"""
`
  },
  {
    id: 'readme',
    titleFr: 'Guide Complet (README.md)',
    titleEn: 'Comprehensive Manual (README.md)',
    filename: 'README.md',
    syntax: 'markdown',
    descriptionFr: 'Documentation intégrale du projet, architecture, matériel, déploiement et licence LORN Digital Studio.',
    descriptionEn: 'Full project documentation, system architecture, hardware requirements, deployment, and LORN Digital Studio license.',
    content: `# SENTINEL PACK SURVIE — MANUEL OFFICIEL
Créé et développé par LORN Digital Studio.
Tous droits réservés © 2026.

1. ARCHITECTURE TECHNIQUE :
- Réseau fermé Docker bridge : 172.28.0.0/16
- Passerelle Nginx isolée : Port 80 (Zéro fuite internet)
- Moteur IA : Ollama avec Llama 3.2 3B Instruct (q4_K_M GGUF)
- Vraie Carte Hors-Ligne : Leaflet + tuiles locales + GPS satellite
- Base ZIM : Kiwix-serve (WikiMed, Wikipedia, Wikibooks)

2. COMMANDES D'INSTALLATION EXPRESS (UBUNTU / DEBIAN) :
sudo mkdir -p /opt/sentinel && cd /opt/sentinel
sudo bash install-sentinel.sh
sudo docker compose up -d
sudo bash airgap-firewall.sh

3. POINT D'ACCÈS WI-FI NOMADE SANS BOX :
sudo nmcli dev wifi hotspot ifname wlan0 ssid Sentinel-Survie password "Secours1234"
Accès navigateur : http://192.168.12.1 ou http://sentinel.lan

4. GESTION BLACKOUT ÉLECTRIQUE (BATTERIE) :
- Ne jamais laisser le serveur tourner 24h/24 en continu.
- Mode fractionné (Duty-Cycle) : Allumer 20 min le matin et 20 min le soir.
- Activez le mode ECO OLED dans la barre de navigation (-60% énergie écran).`
  }
];
