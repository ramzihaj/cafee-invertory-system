# ========================================
# 🚀 Script de Configuration et Démarrage
# Système de Gestion Café
# ========================================

Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║    ☕ Café Inventory System - Setup          ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Fonction pour vérifier si un processus existe
function Test-ProcessRunning {
    param($ProcessName)
    return (Get-Process -Name $ProcessName -ErrorAction SilentlyContinue) -ne $null
}

# Étape 1: Vérification des dépendances
Write-Host "📋 Étape 1/4: Vérification des dépendances..." -ForegroundColor Yellow
Write-Host ""

# Vérifier Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js installé: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js n'est pas installé!" -ForegroundColor Red
    Write-Host "   Téléchargez-le sur: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Vérifier npm
try {
    $npmVersion = npm --version
    Write-Host "✅ npm installé: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm n'est pas installé!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Start-Sleep -Seconds 1

# Étape 2: Installation des dépendances
Write-Host "📦 Étape 2/4: Installation des dépendances..." -ForegroundColor Yellow
Write-Host ""

# Backend
if (-not (Test-Path ".\server\node_modules")) {
    Write-Host "📥 Installation des dépendances Backend..." -ForegroundColor Cyan
    Set-Location server
    npm install
    Set-Location ..
    Write-Host "✅ Dépendances Backend installées" -ForegroundColor Green
} else {
    Write-Host "✅ Dépendances Backend déjà installées" -ForegroundColor Green
}

# Frontend
if (-not (Test-Path ".\client\node_modules")) {
    Write-Host "📥 Installation des dépendances Frontend..." -ForegroundColor Cyan
    Set-Location client
    npm install
    Set-Location ..
    Write-Host "✅ Dépendances Frontend installées" -ForegroundColor Green
} else {
    Write-Host "✅ Dépendances Frontend déjà installées" -ForegroundColor Green
}

Write-Host ""
Start-Sleep -Seconds 1

# Étape 3: Configuration de la base de données
Write-Host "🗄️  Étape 3/4: Configuration de la base de données..." -ForegroundColor Yellow
Write-Host ""

$response = Read-Host "Voulez-vous initialiser/réinitialiser la base de données avec des données de démonstration? (O/N)"

if ($response -eq "O" -or $response -eq "o") {
    Write-Host "🌱 Seeding de la base de données..." -ForegroundColor Cyan
    Set-Location server
    node seeders/demo-data.js
    Set-Location ..
    Write-Host ""
    Write-Host "✅ Base de données initialisée avec succès!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Données créées:" -ForegroundColor Cyan
    Write-Host "   👥 4 utilisateurs (1 Admin, 1 Manager, 2 Employés)" -ForegroundColor White
    Write-Host "   📂 5 catégories de produits" -ForegroundColor White
    Write-Host "   🚚 3 fournisseurs" -ForegroundColor White
    Write-Host "   ☕ 16 produits variés" -ForegroundColor White
    Write-Host "   🪑 8 tables configurées" -ForegroundColor White
    Write-Host ""
    Write-Host "🔐 Comptes de test:" -ForegroundColor Cyan
    Write-Host "   Admin:    admin@cafe.com / password123" -ForegroundColor Green
    Write-Host "   Manager:  manager@cafe.com / password123" -ForegroundColor Green
    Write-Host "   Employé:  employee@cafe.com / password123" -ForegroundColor Green
} else {
    Write-Host "⏭️  Étape de seeding ignorée" -ForegroundColor Yellow
}

Write-Host ""
Start-Sleep -Seconds 2

# Étape 4: Démarrage des serveurs
Write-Host "🚀 Étape 4/4: Démarrage des serveurs..." -ForegroundColor Yellow
Write-Host ""

Write-Host "Préparation du lancement..." -ForegroundColor Cyan
Start-Sleep -Seconds 1

# Démarrer le backend
Write-Host "🔧 Démarrage du serveur Backend (port 5000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 3

# Démarrer le frontend
Write-Host "🎨 Démarrage du serveur Frontend (port 5173)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\client'; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 2

Write-Host ""
Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║          ✅ Système démarré avec succès!      ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "📍 URLs d'accès:" -ForegroundColor Cyan
Write-Host "   🌐 Frontend:  http://localhost:5173" -ForegroundColor White
Write-Host "   🔧 Backend:   http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "📝 Prochaines étapes:" -ForegroundColor Cyan
Write-Host "   1. Ouvrir http://localhost:5173 dans votre navigateur" -ForegroundColor White
Write-Host "   2. Se connecter avec un compte de test" -ForegroundColor White
Write-Host "   3. Explorer les fonctionnalités!" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "   - GUIDE_COMPLET.md : Guide d'utilisation détaillé" -ForegroundColor White
Write-Host "   - IMPLEMENTATION.md : Documentation technique" -ForegroundColor White
Write-Host ""
Write-Host "💡 Astuce: Deux fenêtres PowerShell vont s'ouvrir." -ForegroundColor Yellow
Write-Host "   Ne les fermez pas pendant l'utilisation du système!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Appuyez sur une touche pour ouvrir l'application dans le navigateur..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Ouvrir le navigateur
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "☕ Bon service!" -ForegroundColor Green
Write-Host ""
