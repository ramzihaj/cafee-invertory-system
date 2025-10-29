@echo off
echo ========================================
echo   Cafe Inventory System - Demarrage
echo ========================================
echo.

REM Verifier si le port 5000 est libre
echo [1/4] Verification du port 5000...
netstat -ano | findstr :5000 > nul
if %errorlevel% == 0 (
    echo    ATTENTION: Port 5000 deja utilise
    echo    Arret du processus...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5000') do (
        taskkill /F /PID %%a > nul 2>&1
    )
    timeout /t 2 > nul
    echo    OK - Port libere
) else (
    echo    OK - Port libre
)

echo.
echo [2/4] Demarrage du backend (port 5000)...
cd server
start "Backend Server" cmd /k "npm run dev"
timeout /t 3 > nul

echo.
echo [3/4] Demarrage du frontend (port 3000)...
cd ..\client
start "Frontend React" cmd /k "npm run dev"

echo.
echo [4/4] Application en cours de demarrage...
timeout /t 3 > nul

echo.
echo ========================================
echo   Application demarree avec succes!
echo ========================================
echo.
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:3000
echo.
echo   Connexion:
echo   - Email: admin@cafe.com
echo   - Pass:  password123
echo.
echo Appuyez sur une touche pour ouvrir dans le navigateur...
pause > nul
start http://localhost:3000

cd ..
