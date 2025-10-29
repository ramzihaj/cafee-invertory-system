# Script de demarrage automatique - Cafe Inventory System
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Cafe Inventory System - Demarrage" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Fonction pour liberer un port
function Stop-PortProcess {
    param($Port)
    
    $process = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -First 1
    
    if ($process) {
        Write-Host "Port $Port occupe - Liberation..." -ForegroundColor Yellow
        Stop-Process -Id $process -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 1
        Write-Host "   OK - Port $Port libere" -ForegroundColor Green
        return $true
    }
    return $false
}

# Liberer les ports si occupes
Write-Host "[1/3] Verification des ports..." -ForegroundColor Yellow
$port5000Freed = Stop-PortProcess -Port 5000
$port3000Freed = Stop-PortProcess -Port 3000

if (-not $port5000Freed -and -not $port3000Freed) {
    Write-Host "   Ports deja libres" -ForegroundColor Green
}

# Demarrer le backend
Write-Host "`n[2/3] Demarrage du backend..." -ForegroundColor Yellow
Set-Location -Path ".\server"
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal
Set-Location -Path ".."
Start-Sleep -Seconds 3

# Demarrer le frontend
Write-Host "`n[3/3] Demarrage du frontend..." -ForegroundColor Yellow
Set-Location -Path ".\client"
Start-Process pwsh -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal
Set-Location -Path ".."

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Application demarree avec succes!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "  Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "  Frontend: http://localhost:3000`n" -ForegroundColor White

Write-Host "  Connexion:" -ForegroundColor Yellow
Write-Host "  - Email: admin@cafe.com" -ForegroundColor White
Write-Host "  - Pass:  password123`n" -ForegroundColor White

# Ouvrir le navigateur
Start-Sleep -Seconds 2
Write-Host "Ouverture du navigateur..." -ForegroundColor Yellow
Start-Process "http://localhost:3000"

Write-Host "`nAppuyez sur une touche pour fermer cette fenetre..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
