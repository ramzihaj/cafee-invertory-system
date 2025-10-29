# Script d'arret - Cafe Inventory System
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Arret de Cafe Inventory System" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Arreter le backend (port 5000)
Write-Host "Arret du backend (port 5000)..." -ForegroundColor Yellow
$backend = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($backend) {
    $backend | ForEach-Object {
        Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
    }
    Write-Host "   Backend arrete" -ForegroundColor Green
} else {
    Write-Host "   Backend non actif" -ForegroundColor Gray
}

# Arreter le frontend (port 3000)
Write-Host "`nArret du frontend (port 3000)..." -ForegroundColor Yellow
$frontend = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($frontend) {
    $frontend | ForEach-Object {
        Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue
    }
    Write-Host "   Frontend arrete" -ForegroundColor Green
} else {
    Write-Host "   Frontend non actif" -ForegroundColor Gray
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Application arretee" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Appuyez sur une touche pour fermer..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
