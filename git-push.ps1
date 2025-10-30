# Script temporaire pour push GitHub

Write-Host "`nConfiguration du depot Git..." -ForegroundColor Cyan

# Commit initial
Write-Host "Creation du commit initial..." -ForegroundColor Yellow
git commit -m "Initial commit: Cafe Inventory System - Full Stack MERN + SQLite"

if ($LASTEXITCODE -eq 0) {
    Write-Host "   Commit cree avec succes" -ForegroundColor Green
} else {
    Write-Host "   Erreur lors du commit" -ForegroundColor Red
    exit 1
}

# Configuration du remote (deja fait normalement)
Write-Host "`nConfiguration du depot distant..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/ramzihaj/cafee-invertory-system.git
git branch -M main

Write-Host "`nPush vers GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n========================================" -ForegroundColor Green
    Write-Host "  Push reussi!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "`nVotre projet est maintenant sur GitHub:" -ForegroundColor White
    Write-Host "https://github.com/ramzihaj/cafee-invertory-system`n" -ForegroundColor Cyan
} else {
    Write-Host "`nErreur lors du push. Verifiez vos identifiants GitHub." -ForegroundColor Red
}

Write-Host "`nAppuyez sur une touche pour continuer..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
