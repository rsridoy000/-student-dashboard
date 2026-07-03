@echo off
title Student Dashboard - Auto Setup and Launch
color 0A

echo.
echo  ============================================================
echo     STUDENT DASHBOARD  -  AUTO SETUP ^& LAUNCHER
echo     React + Vite   ^|   Django REST Framework
echo  ============================================================
echo.

:: ──────────────────────────────────────
:: Step 1: Check Python
:: ──────────────────────────────────────
echo [1/5] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo  ERROR: Python is not installed or not in PATH.
    echo  Please install Python 3.9+ from https://www.python.org/downloads/
    pause
    exit /b 1
)
echo  OK - Python found.

:: ──────────────────────────────────────
:: Step 2: Check Node.js
:: ──────────────────────────────────────
echo [2/5] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo  ERROR: Node.js is not installed or not in PATH.
    echo  Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo  OK - Node.js found.

:: ──────────────────────────────────────
:: Step 3: Backend - Create venv if needed
:: ──────────────────────────────────────
echo.
echo [3/5] Setting up Django backend...
cd /d "%~dp0backend"

if exist "venv" (
    echo  Virtual environment already exists. Skipping creation.
    goto skip_venv
)

echo  Creating Python virtual environment...
python -m venv venv
if errorlevel 1 (
    echo  ERROR: Could not create virtual environment.
    pause
    exit /b 1
)
echo  Virtual environment created.

:skip_venv
echo  Installing Python dependencies...
call venv\Scripts\pip install -r requirements.txt --quiet
if errorlevel 1 (
    echo  ERROR: Failed to install Python dependencies.
    pause
    exit /b 1
)
echo  Python dependencies installed.

echo  Running database migrations...
call venv\Scripts\python manage.py migrate --run-syncdb >nul 2>&1
echo  Migrations applied.

echo  Seeding database with initial student data...
call venv\Scripts\python seed_db.py
echo  Database seeded.

:: ──────────────────────────────────────
:: Step 4: Frontend - Install npm packages
:: ──────────────────────────────────────
echo.
echo [4/5] Setting up React frontend...
cd /d "%~dp0frontend"

if exist "node_modules" (
    echo  node_modules already exists. Skipping npm install.
    goto skip_npm
)

echo  Installing npm packages (this may take a moment)...
call npm install --silent
if errorlevel 1 (
    echo  ERROR: Failed to install npm packages.
    pause
    exit /b 1
)
echo  npm packages installed.

:skip_npm

:: ──────────────────────────────────────
:: Step 5: Launch both servers
:: ──────────────────────────────────────
echo.
echo [5/5] Launching servers...
echo.
echo  ------------------------------------------------------------
echo   Django Backend   ->  http://127.0.0.1:8000/api/students/
echo   React Frontend   ->  http://localhost:5173/
echo  ------------------------------------------------------------
echo.
echo  Both servers are starting in separate windows.
echo  Close those windows to stop the servers.
echo.

:: Launch Django server minimized in the background
start /min "Django Backend Server" cmd /k "cd /d "%~dp0backend" && venv\Scripts\python manage.py runserver"

:: Wait 2 seconds, then launch Vite dev server minimized in the background
timeout /t 2 /nobreak >nul
start /min "React Frontend Server (Vite)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

:: Wait 5 seconds for Vite to compile & start, then open browser
timeout /t 5 /nobreak >nul
start "" http://localhost:5173/

echo.
echo  Setup complete! The dashboard should open in your browser.
echo  Press any key to close this window.
pause >nul
