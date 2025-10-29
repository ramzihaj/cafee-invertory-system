@echo off
echo ========================================
echo   Arret de Cafe Inventory System
echo ========================================
echo.

echo Arret du backend (port 5000)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do (
    taskkill /F /PID %%a > nul 2>&1
    if %errorlevel% == 0 (
        echo    Backend arrete
    )
)

echo.
echo Arret du frontend (port 3000)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    taskkill /F /PID %%a > nul 2>&1
    if %errorlevel% == 0 (
        echo    Frontend arrete
    )
)

echo.
echo ========================================
echo   Application arretee
echo ========================================
pause
