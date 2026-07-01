# 🎉 Southwest Kanga - Booking & Mobilization Fee System Added!

## What's New

Your Southwest Kanga website now has a complete booking and mobilization fee management system!

### 🛍️ Customer Features
- **Booking Form** - Customers can book services directly on your website
- **Service Selection** - Choose from Plants & Drilling, Yard Clearing, or Clearing & Spreading
- **Live Price Estimation** - See estimated costs in real-time with mobilization fee included
- **Email Confirmation** - Customers receive booking confirmation emails
- **Easy Scheduling** - Specify preferred date and time

### 👨‍💼 Admin Features
- **Booking Dashboard** - View all customer bookings in one place
- **Booking Details** - Click to see full booking information
- **Status Management** - Track bookings (pending, confirmed, completed, cancelled)
- **Fee Configuration** - Adjust mobilization fee from admin settings
- **Email Notifications** - Get alerts when new bookings are submitted

## Quick Access URLs

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `/` | Main site with booking/quote buttons |
| Booking Form | `/booking` | Where customers make bookings |
| Admin Bookings | `/admin/bookings` | View all bookings |
| Booking Details | `/admin/bookings/[id]` | View & manage individual booking |
| Admin Settings | `/admin/settings` | Configure mobilization fee |

## Getting Started

### 1️⃣ Windows Users
```bash
setup.bat
```

### 2️⃣ Mac/Linux Users
```bash
chmod +x setup.sh
./setup.sh
```

### 3️⃣ Manual Setup
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Then visit http://localhost:3000

## How It Works

### For Customers
1. Click **"Book a Service"** on homepage
2. Fill out the booking form
3. See price estimate with mobilization fee
4. Submit booking
5. Receive confirmation email

### For You (Admin)
1. Go to `/admin/bookings`
2. See all customer bookings
3. Click on a booking for full details
4. Update status as needed
5. Go to `/admin/settings` to adjust mobilization fee (default: $150)

## Pricing Model

- **Mobilization Fee**: $150 (configurable)
- **Labor**: $100/hour (configurable)
- **Total**: Mobilization Fee + (Estimated Hours × $100)

Example: 4-hour job
- Mobilization: $150
- Labor: 4 × $100 = $400
- **Total Estimate: $550**

## What Changed

### New Files/Directories
```
prisma/
├── schema.prisma          # Database definition
└── dev.db                 # Database file (created on first run)

app/
├── booking/
│   └── page.tsx          # Booking form page
└── admin/
    ├── bookings/
    │   ├── page.tsx      # Booking list
    │   └── [id]/
    │       └── page.tsx  # Booking details
    └── settings/
        └── page.tsx      # Fee management

lib/
└── db.ts                 # Database connection

BOOKING_SETUP.md          # Detailed setup docs
setup.bat                 # Windows setup script
setup.sh                  # Mac/Linux setup script
```

### Updated Files
- `package.json` - Added Prisma dependencies
- `app/actions.ts` - Added booking functions
- `app/page.tsx` - Added "Book a Service" button
- `.env.local` - Added DATABASE_URL

## Configuration

### Change Mobilization Fee
Visit `/admin/settings` and update the fee amount in real-time.

### Change Hourly Rate
Edit `app/booking/page.tsx` line 39:
```typescript
const laborCost = hours * 100;  // Change 100 to desired rate
```

### Update Email Address
Edit `app/actions.ts` line 47:
```typescript
to: 'your-email@example.com',  // Update this
```

### Customize Service Types
Edit the select dropdown in `app/booking/page.tsx` around line 117.

## Database Info

- **Type**: SQLite (file-based, no server needed)
- **Location**: `prisma/dev.db`
- **ORM**: Prisma
- **Models**: 
  - `Booking` - Customer bookings with all details
  - `MobilizationSettings` - Fee configuration

## Email Notifications

Uses **Resend** (email service):
- Customers get booking confirmation
- You get notification of new bookings
- Free tier is set up, upgradeable later

## Troubleshooting

**Q: Database errors?**
A: Delete `prisma/dev.db` and re-run migrations

**Q: Emails not sending?**
A: Check RESEND_API_KEY in `.env.local`

**Q: Pages not showing?**
A: Make sure `npm install` completed and dev server is running

## Next Steps

1. ✅ Run setup script
2. ✅ Test booking form at `/booking`
3. ✅ Try admin dashboard at `/admin/bookings`
4. 🔄 Adjust mobilization fee if needed
5. 🔄 Update business email in settings
6. 🔄 Customize service types/descriptions
7. 📱 Share booking link with customers

## Support

See `BOOKING_SETUP.md` for detailed documentation and advanced customization options.

---

**Your Southwest Kanga website is now ready to take bookings! 🚀**
