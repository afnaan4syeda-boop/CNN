@echo off
set "SCRIPT_PATH=%~dp0tools\python\Scripts\hf.exe"
if not exist "%SCRIPT_PATH%" (
    echo Error: Hugging Face CLI not found at %SCRIPT_PATH%
    echo Please make sure the project setup is complete.
    pause
    exit /b
)

echo ==============================================
echo    Hugging Face CLI - Portable Assistant
echo ==============================================
echo.

if "%~1" == "" (
    echo Usage: 
    echo   hf_upload.bat auth login
    echo   hf_upload.bat upload Afnaan08/CarvsBike .
    echo.
    echo Opening help for you...
    "%SCRIPT_PATH%" --help
) else (
    "%SCRIPT_PATH%" %*
)

pause
