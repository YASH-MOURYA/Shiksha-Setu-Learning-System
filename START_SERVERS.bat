@echo off
REM Shiksha Setu - Enhanced Development Server Startup
REM This script starts both servers with better error handling and user experience

echo.
echo ========================================
echo   🎓 SHIKSHA SETU - Development Platform
echo ========================================
echo   Transform Your Future with Expert-Led
echo   Online Courses
echo ========================================
echo.

echo 📊 Checking Prerequisites...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js 18+ first.
    echo 🔗 Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java not found! Please install Java 21 JDK first.
    echo 🔗 Download from: https://adoptium.net/
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!
echo.

echo 🎨 Starting Frontend Server (React + Vite)...
echo 📍 Location: shiksha-setu-frontend
echo 🌐 URL: http://localhost:5173
echo.
start "🎨 Shiksha Setu Frontend" cmd /k "cd /d %~dp0shiksha-setu-frontend && echo 🎨 Starting React Development Server... && npm run dev"

echo ⏳ Waiting for frontend to initialize...
timeout /t 5 /nobreak > nul

echo.
echo ⚙️  Starting Backend Server (Spring Boot)...
echo 📍 Location: shiksha-setu-backend  
echo 🌐 URL: http://localhost:8080
echo 📚 API Docs: http://localhost:8080/swagger-ui.html
echo.
start "⚙️ Shiksha Setu Backend" cmd /k "cd /d %~dp0shiksha-setu-backend && echo ⚙️ Starting Spring Boot Server... && mvn spring-boot:run"

echo ⏳ Waiting for backend to initialize...
timeout /t 8 /nobreak > nul

echo.
echo ========================================
echo   ✅ SHIKSHA SETU PLATFORM STARTED!
echo ========================================
echo.
echo 🎯 Quick Access Links:
echo   🎨 Frontend:    http://localhost:5173
echo   ⚙️  Backend:     http://localhost:8080  
echo   📚 API Docs:    http://localhost:8080/swagger-ui.html
echo   📊 Health:      http://localhost:8080/actuator/health
echo.
echo 🚀 Features Available:
echo   ✅ User Registration & Login
echo   ✅ Course Browsing & Enrollment
echo   ✅ Student & Mentor Dashboards
echo   ✅ Payment Integration Ready
echo   ✅ Responsive Design
echo   ✅ Modern UI with Animations
echo.
echo 💡 Development Tips:
echo   • Frontend auto-reloads on file changes
echo   • Backend restarts on Java file changes
echo   • Check browser console for any errors
echo   • Use Swagger UI for API testing
echo.

REM Wait a bit more then open the application
timeout /t 5 /nobreak > nul

echo 🌐 Opening Shiksha Setu in your default browser...
start http://localhost:5173

echo.
echo 🎉 Happy Learning with Shiksha Setu!
echo 📧 Support: support@shiksha-setu.com
echo.
echo Press any key to close this window...
pause > nul

