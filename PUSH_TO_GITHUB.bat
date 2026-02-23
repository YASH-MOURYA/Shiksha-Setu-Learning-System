@echo off
echo ========================================
echo   Shiksha Setu - Push to GitHub
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Git is installed. Proceeding...
echo.

REM Check if this is first time setup
if not exist ".git" (
    echo First time setup detected...
    echo.
    
    REM Get GitHub username
    set /p GITHUB_USERNAME="Enter your GitHub username: "
    
    echo.
    echo Initializing Git repository...
    git init
    
    echo.
    echo Adding remote repository...
    git remote add origin https://github.com/%GITHUB_USERNAME%/shiksha-setu.git
    
    echo.
    echo Adding all files...
    git add .
    
    echo.
    echo Creating initial commit...
    git commit -m "Initial commit: Complete LMS with React frontend and Spring Boot backend"
    
    echo.
    echo Setting main branch...
    git branch -M main
    
    echo.
    echo Pushing to GitHub...
    echo You may be prompted for your GitHub credentials.
    echo Use your Personal Access Token as the password.
    git push -u origin main
    
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to push to GitHub!
        echo.
        echo Common solutions:
        echo 1. Make sure the repository exists on GitHub
        echo 2. Use Personal Access Token instead of password
        echo 3. Check your internet connection
        echo.
        pause
        exit /b 1
    )
    
    echo.
    echo ========================================
    echo   SUCCESS! Project pushed to GitHub
    echo ========================================
    echo.
    echo Your repository: https://github.com/%GITHUB_USERNAME%/shiksha-setu
    echo.
    pause
    exit /b 0
)

REM Regular update (not first time)
echo Checking for changes...
git status

echo.
set /p COMMIT_MSG="Enter commit message (or press Enter for default): "

if "%COMMIT_MSG%"=="" (
    set COMMIT_MSG=Update: Latest changes
)

echo.
echo Adding changes...
git add .

echo.
echo Committing changes...
git commit -m "%COMMIT_MSG%"

if errorlevel 1 (
    echo.
    echo No changes to commit.
    echo.
    pause
    exit /b 0
)

echo.
echo Pushing to GitHub...
git push

if errorlevel 1 (
    echo.
    echo ERROR: Failed to push to GitHub!
    echo.
    echo Try running: git pull
    echo Then run this script again.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESS! Changes pushed to GitHub
echo ========================================
echo.
pause
