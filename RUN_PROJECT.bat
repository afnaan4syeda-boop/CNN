@echo off
echo Setting up environment...

set PROJECT_ROOT=%~dp0
set TOOLS_DIR=%PROJECT_ROOT%tools
set PYTHON_DIR=%TOOLS_DIR%\python
set NODE_DIR=%TOOLS_DIR%\nodejs\node-v20.10.0-win-x64

echo Adding Python and Node.js to PATH...
set PATH=%PYTHON_DIR%;%PYTHON_DIR%\Scripts;%NODE_DIR%;%PATH%

echo.
echo ==============================================
echo    Car vs Bike Classifier - Flask (Portable)
echo ==============================================
echo.

echo Checking Python version...
python --version
echo Checking Node version...
node --version
echo.

echo 1. Checking Model Status...
if not exist "backend\car_bike_model.pkl" (
    echo Model not found. Training now...
    python backend\train_model.py
) else (
    echo Model already trained. Ready to start!
)

echo.
echo 2. Starting Flask Application...
echo Access the web interface at http://localhost:8000
start "Flask App" cmd /k "python backend\main.py"

echo.
echo Application started!
pause
