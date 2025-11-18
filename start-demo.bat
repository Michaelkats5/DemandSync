@echo off
echo ========================================
echo Comet Capital Grill Demo Launcher
echo ========================================
echo.

cd /d "C:\Users\MichaelKats\Desktop\src"

echo Starting Backend Server...
start "Comet Capital Grill Backend" cmd /k "cd /d C:\Users\MichaelKats\Desktop\src && py -m uvicorn app.main:app --reload --port 8000"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Comet Capital Grill Frontend" cmd /k "cd /d C:\Users\MichaelKats\Desktop\src && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo Servers Starting...
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Opening browser in 5 seconds...
timeout /t 5 /nobreak >nul

start http://localhost:3000

echo.
echo Demo launched! Check the two command windows for server status.
echo.
pause

