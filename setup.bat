@echo off
REM Southwest Kanga - Booking System Setup Script (Windows)
REM This script initializes the database and prepares the system for use

echo.
echo 🚀 Setting up Southwest Kanga Booking System...
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

REM Generate Prisma client
echo 🔧 Generating Prisma client...
call npx prisma generate
echo.

REM Run migrations
echo 🗄️  Setting up database...
call npx prisma migrate dev --name init
echo.

echo ✨ Setup complete! You can now run 'npm run dev' to start the application.
echo.
echo 📍 Important URLs:
echo    - Home: http://localhost:3000
echo    - Booking: http://localhost:3000/booking
echo    - Admin: http://localhost:3000/admin/bookings
echo    - Settings: http://localhost:3000/admin/settings
echo.
pause
