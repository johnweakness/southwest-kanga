#!/bin/bash

# Southwest Kanga - Booking System Setup Script
# This script initializes the database and prepares the system for use

echo "🚀 Setting up Southwest Kanga Booking System..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate
echo ""

# Run migrations
echo "🗄️  Setting up database..."
npx prisma migrate dev --name init
echo ""

# Create default mobilization settings
echo "💰 Initializing mobilization fee settings..."
npx ts-node -e "
const { db } = require('./lib/db');
(async () => {
  try {
    const settings = await db.mobilizationSettings.findUnique({
      where: { id: 'default' },
    });
    if (!settings) {
      await db.mobilizationSettings.create({
        data: { id: 'default', fee: 150 },
      });
      console.log('✅ Default mobilization fee set to \$150');
    } else {
      console.log('✅ Mobilization settings already exist');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
"
echo ""

echo "✨ Setup complete! You can now run 'npm run dev' to start the application."
echo ""
echo "📍 Important URLs:"
echo "   - Home: http://localhost:3000"
echo "   - Booking: http://localhost:3000/booking"
echo "   - Admin: http://localhost:3000/admin/bookings"
echo "   - Settings: http://localhost:3000/admin/settings"
