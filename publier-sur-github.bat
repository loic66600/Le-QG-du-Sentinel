@echo off
chcp 65001 >nul
title Publication GitHub - LE QG DU SENTINEL (Le Quartier General)
echo ============================================================================
echo   LE QG DU SENTINEL - ENVOI AUTOMATIQUE SUR GITHUB
echo   Depot : https://github.com/loic66600/Le-QG-du-Sentinel.git
echo ============================================================================
echo.
if not exist ".git" (
  echo [1/4] Initialisation du depot Git local...
  git init
  git branch -M main
)
echo [2/4] Ajout des fichiers propres du projet...
git add .
echo [3/4] Creation du commit...
git commit -m "Release: LE QG DU SENTINEL - Le Quartier General Autonome Hors-Ligne"
git remote remove origin >nul 2>nul
git remote add origin https://github.com/loic66600/Le-QG-du-Sentinel.git
echo [4/4] Envoi vers GitHub (https://github.com/loic66600/Le-QG-du-Sentinel.git)...
git push -u origin main --force
echo.
echo [OK] Projet publie sur https://github.com/loic66600/Le-QG-du-Sentinel !
pause
