# Script de test de l'API
Write-Host "`n=== Test de l'API Cafe Inventory ===`n" -ForegroundColor Cyan

# Test 1: Route principale
Write-Host "[Test 1] GET /" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000" -Method GET
    Write-Host "   OK: $($response.message)" -ForegroundColor Green
} catch {
    Write-Host "   ERREUR: $_" -ForegroundColor Red
}

# Test 2: Login
Write-Host "`n[Test 2] POST /api/auth/login (Admin)" -ForegroundColor Yellow
try {
    $body = @{
        email = "admin@cafe.com"
        password = "password123"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
                                  -Method POST `
                                  -ContentType "application/json" `
                                  -Body $body

    $token = $response.data.token
    Write-Host "   OK: Login reussi - $($response.data.user.name)" -ForegroundColor Green
    Write-Host "   Token: $($token.Substring(0, 20))..." -ForegroundColor Gray

    # Test 3: Dashboard stats avec token
    Write-Host "`n[Test 3] GET /api/dashboard/stats" -ForegroundColor Yellow
    $headers = @{
        Authorization = "Bearer $token"
    }
    
    $stats = Invoke-RestMethod -Uri "http://localhost:5000/api/dashboard/stats" `
                               -Method GET `
                               -Headers $headers
    
    Write-Host "   OK: Statistiques recuperees" -ForegroundColor Green
    Write-Host "      - Produits: $($stats.data.overview.totalProducts)" -ForegroundColor White
    Write-Host "      - Alertes stock bas: $($stats.data.overview.lowStockCount)" -ForegroundColor White
    Write-Host "      - Categories: $($stats.data.overview.totalCategories)" -ForegroundColor White

    # Test 4: Liste des produits
    Write-Host "`n[Test 4] GET /api/products" -ForegroundColor Yellow
    $products = Invoke-RestMethod -Uri "http://localhost:5000/api/products" `
                                  -Method GET `
                                  -Headers $headers
    
    Write-Host "   OK: $($products.data.Count) produits recuperes" -ForegroundColor Green
    Write-Host "      Exemples:" -ForegroundColor White
    $products.data | Select-Object -First 3 | ForEach-Object {
        Write-Host "      - $($_.name) (Stock: $($_.currentStock) $($_.unit))" -ForegroundColor White
    }

} catch {
    Write-Host "   ERREUR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Tests termines! ===`n" -ForegroundColor Cyan
Write-Host "Le serveur est fonctionnel sur http://localhost:5000" -ForegroundColor Green
Write-Host "Lancez le frontend avec: cd ..\client && npm run dev`n" -ForegroundColor Yellow
