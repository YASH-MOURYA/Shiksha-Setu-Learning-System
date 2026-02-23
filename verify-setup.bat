@echo off
echo.
echo ========================================
echo   🎓 Shiksha Setu - Setup Verification
echo ========================================
echo.

echo 📋 Checking Prerequisites...
echo.

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js 18+
    echo 🔗 Download: https://nodejs.org/
    goto :error
) else (
    echo ✅ Node.js found
)

REM Check Java
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java not found! Please install Java 21 JDK
    echo 🔗 Download: https://adoptium.net/
    goto :error
) else (
    echo ✅ Java found
)

REM Check Maven
mvn --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  Maven not found in PATH, will use Maven wrapper
) else (
    echo ✅ Maven found
)

echo.
echo 📁 Checking Project Structure...
echo.

if not exist "shiksha-setu-frontend" (
    echo ❌ Frontend directory not found!
    goto :error
) else (
    echo ✅ Frontend directory exists
)

if not exist "shiksha-setu-backend" (
    echo ❌ Backend directory not found!
    goto :error
) else (
    echo ✅ Backend directory exists
)

if not exist "shiksha-setu-frontend\package.json" (
    echo ❌ Frontend package.json not found!
    goto :error
) else (
    echo ✅ Frontend package.json exists
)

if not exist "shiksha-setu-backend\pom.xml" (
    echo ❌ Backend pom.xml not found!
    goto :error
) else (
    echo ✅ Backend pom.xml exists
)

echo.
echo 🔧 Checking Configuration Files...
echo.

if not exist "shiksha-setu-frontend\.env" (
    echo ⚠️  Frontend .env file not found, creating default...
    echo VITE_API_URL=http://localhost:8080 > shiksha-setu-frontend\.env
    echo VITE_APP_NAME=Shiksha Setu >> shiksha-setu-frontend\.env
    echo ✅ Created default .env file
) else (
    echo ✅ Frontend .env file exists
)

if not exist "shiksha-setu-backend\src\main\resources\application.properties" (
    echo ❌ Backend application.properties not found!
    goto :error
) else (
    echo ✅ Backend application.properties exists
)

echo.
echo 📦 Checking Dependencies...
echo.

echo 🎨 Checking Frontend Dependencies...
cd shiksha-setu-frontend
if not exist "node_modules" (
    echo ⚠️  Frontend dependencies not installed, installing...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install frontend dependencies!
        cd ..
        goto :error
    )
    echo ✅ Frontend dependencies installed
) else (
    echo ✅ Frontend dependencies already installed
)
cd ..

echo.
echo ⚙️  Checking Backend Dependencies...
cd shiksha-setu-backend
if not exist "target" (
    echo ⚠️  Backend not compiled, compiling...
    mvn clean compile -q
    if %errorlevel% neq 0 (
        echo ❌ Failed to compile backend!
        cd ..
        goto :error
    )
    echo ✅ Backend compiled successfully
) else (
    echo ✅ Backend already compiled
)
cd ..

echo.
echo ========================================
echo   ✅ SETUP VERIFICATION COMPLETE!
echo ========================================
echo.
echo 🎯 Your Shiksha Setu project is ready!
echo.
echo 🚀 To start the application:
echo   1. Run: START_SERVERS.bat
echo   2. Or manually:
echo      - Backend:  cd shiksha-setu-backend ^&^& mvn spring-boot:run
echo      - Frontend: cd shiksha-setu-frontend ^&^& npm run dev
echo.
echo 🌐 Access URLs:
echo   - Frontend: http://localhost:5173
echo   - Backend:  http://localhost:8080
echo   - API Docs: http://localhost:8080/swagger-ui.html
echo.
echo 👤 Default Admin Account:
echo   - Email:    admin@shiksha-setu.com
echo   - Password: admin123
echo.
goto :end

:error
echo.
echo ========================================
echo   ❌ SETUP VERIFICATION FAILED!
echo ========================================
echo.
echo Please fix the issues above and run this script again.
echo.

:end
pause