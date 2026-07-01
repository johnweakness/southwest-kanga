# Booking & Mobilization Fee System

This document describes the new booking and mobilization fee system added to Southwest Kanga's website.

## Features

### 1. Booking System
- **Booking Page**: `/booking` - Customers can book services with detailed information
- **Booking Form**: Collects customer details, service type, preferred date/time, and estimated hours
- **Email Notifications**: Both customer and business owner receive confirmation emails
- **Booking Status Tracking**: Track booking status (pending, confirmed, completed, cancelled)

### 2. Mobilization Fee
- **Default Fee**: $150 (can be customized in admin settings)
- **Applied to All Bookings**: Every booking includes the mobilization fee
- **Visible in Quotes**: Customers can see the mobilization fee in the pricing summary
- **Dynamic Calculation**: Total estimate = mobilization fee + (hours × $100/hour)

### 3. Admin Dashboard
- **Dashboard URL**: `/admin/bookings` - View all bookings
- **Booking Details**: `/admin/bookings/[id]` - View individual booking details and update status
- **Settings**: `/admin/settings` - Manage mobilization fee

## File Structure

```
app/
├── booking/
│   └── page.tsx              # Booking form page
├── admin/
│   ├── bookings/
│   │   ├── page.tsx          # List all bookings
│   │   └── [id]/
│   │       └── page.tsx      # Booking details page
│   └── settings/
│       └── page.tsx          # Admin settings page
└── actions.ts                # Server actions (updated)

lib/
└── db.ts                      # Prisma client

prisma/
└── schema.prisma             # Database schema
```

## Database Schema

### Booking Model
- `id`: Unique identifier
- `customerName`: Customer's name
- `customerPhone`: Customer's phone number
- `customerEmail`: Customer's email
- `siteAddress`: Project site address
- `serviceType`: Type of service (plants, yard-clearing, clearing-spreading, other)
- `serviceDescription`: Detailed service description
- `preferredDate`: Preferred service date
- `preferredTime`: Preferred time (optional)
- `estimatedHours`: Estimated hours needed (optional)
- `mobilizationFee`: Current mobilization fee at time of booking
- `additionalNotes`: Extra notes from customer (optional)
- `status`: Booking status (pending, confirmed, completed, cancelled)
- `totalCost`: Final total cost (optional)
- `createdAt`: Booking creation timestamp
- `updatedAt`: Last update timestamp

### MobilizationSettings Model
- `id`: Always "default"
- `fee`: Current mobilization fee
- `updatedAt`: Last update timestamp

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

This will install Prisma and other required packages from package.json.

### 2. Initialize Database
```bash
npx prisma generate
npx prisma migrate dev --name init
```

This creates a SQLite database at `prisma/dev.db`.

### 3. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000 to see the website.

## Usage

### For Customers
1. Click "Book a Service" button on the homepage
2. Fill out the booking form with service details
3. Review the pricing estimate
4. Submit the booking
5. Receive confirmation email

### For Admin
1. Visit `/admin/bookings` to see all bookings
2. Click on a booking to view details
3. Update booking status as needed
4. Visit `/admin/settings` to change the mobilization fee
5. All changes are saved to the database

## Environment Variables

Required in `.env.local`:
```
DATABASE_URL="file:./prisma/dev.db"
RESEND_API_KEY=your_resend_api_key_here
```

## Email Configuration

The system uses Resend for email notifications:
- Business email: `jaykiegado629@gmail.com` (update in actions.ts)
- Sender: `Southwest Kanga <onboarding@resend.dev>` (free tier default)

Update these in [app/actions.ts](app/actions.ts) as needed.

## Pricing Model

The system uses a simple pricing model:
- **Mobilization Fee**: Fixed fee per booking (default $150)
- **Labor Cost**: $100 per hour (adjustable in booking calculation)
- **Total Estimate**: Mobilization Fee + (Hours × $100)

To adjust hourly rate, edit the booking page calculation in [app/booking/page.tsx](app/booking/page.tsx).

## API Actions

The following server actions are available in [app/actions.ts](app/actions.ts):

- `submitBooking(formData)` - Submit a new booking
- `getBookings()` - Get all bookings
- `getBookingById(id)` - Get specific booking
- `updateBookingStatus(id, status)` - Update booking status
- `getMobilizationFee()` - Get current mobilization fee
- `updateMobilizationFee(fee)` - Update mobilization fee

## Customization

### Change Mobilization Fee
Visit `/admin/settings` and update the fee amount.

### Change Hourly Rate
Edit [app/booking/page.tsx](app/booking/page.tsx) line ~39:
```typescript
const laborCost = hours * 100;  // Change 100 to desired hourly rate
```

### Change Service Types
Edit the select options in [app/booking/page.tsx](app/booking/page.tsx) and update the prisma schema if needed.

### Customize Emails
Update the email templates in [app/actions.ts](app/actions.ts) in the `submitBooking()` function.

## Troubleshooting

### Database Issues
If you get database errors, try:
```bash
rm prisma/dev.db
npx prisma migrate dev --name init
```

### Email Not Sending
- Check RESEND_API_KEY in `.env.local`
- Update email address in actions.ts
- Resend free tier has limitations, check their documentation

### Pages Not Found
Make sure you've run `npm install` and the dev server is running on port 3000.

## Next Steps

- Implement payment processing
- Add photo uploads for bookings
- Add booking confirmation SMS
- Create customer portal to track bookings
- Add more detailed admin analytics
