@echo off
title Creating Zip for Submission...
color 0B
echo.
echo ============================================================
echo   Creating Clean ZIP File for Submission (Excluding venv/node_modules)
echo ============================================================
echo.

set "TEMP_DIR=%~dp0temp_submission"
set "ZIP_FILE=%~dp0student_dashboard_submission.zip"

if exist "%ZIP_FILE%" del /f /q "%ZIP_FILE%"
if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"

echo  Creating temporary folder structure...
mkdir "%TEMP_DIR%"
mkdir "%TEMP_DIR%\backend"
mkdir "%TEMP_DIR%\frontend"

echo  Copying files (excluding venv, node_modules, and git data)...
xcopy "%~dp0backend" "%TEMP_DIR%\backend" /s /e /y /exclude:%~dp0exclude_list.txt >nul 2>&1
xcopy "%~dp0frontend" "%TEMP_DIR%\frontend" /s /e /y /exclude:%~dp0exclude_list.txt >nul 2>&1
copy "%~dp0setup.bat" "%TEMP_DIR%" >nul 2>&1
copy "%~dp0.gitignore" "%TEMP_DIR%" >nul 2>&1
copy "%~dp0README.md" "%TEMP_DIR%" >nul 2>&1

echo  Compressing files into ZIP...
powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('%TEMP_DIR%', '%ZIP_FILE%')"

echo  Cleaning up temporary files...
rmdir /s /q "%TEMP_DIR%"

echo.
echo ============================================================
echo   SUCCESS! Created: student_dashboard_submission.zip
echo ============================================================
echo.
pause
