# Testing & Verification Checklist

Use this checklist to verify everything works after setup.

## ✅ Setup Phase

- [ ] Run `setup.bat` (Windows) or `npm install && npx prisma generate && npx prisma migrate dev --name init` (Mac/Linux)
- [ ] `npm run dev` starts without errors
- [ ] Dev server runs on http://localhost:3000
- [ ] Database file created at `prisma/dev.db`

## ✅ Homepage

- [ ] Visit http://localhost:3000
- [ ] "Book a Service" button visible (yellow button)
- [ ] "Get a Free Quote" button visible (white button)
- [ ] "Call Now" button visible
- [ ] All three service cards display correctly
- [ ] Quote form at bottom works

## ✅ Booking Page

- [ ] Visit http://localhost:3000/booking
- [ ] Back to home link works
- [ ] All form fields display:
  - [ ] Full Name input
  - [ ] Phone Number input
  - [ ] Email Address input
  - [ ] Site Address input
  - [ ] Service Type dropdown (4 options)
  - [ ] Service Description textarea
  - [ ] Preferred Date picker
  - [ ] Preferred Time picker
  - [ ] Estimated Hours input
  - [ ] Additional Notes textarea
- [ ] Price sidebar displays with:
  - [ ] Mobilization Fee ($150 default)
  - [ ] Estimated Total calculation
  - [ ] Updates when hours changed
- [ ] Can enter all information
- [ ] Submit button is enabled
- [ ] Form submission works

## ✅ Booking Submission

- [ ] Submit a test booking
- [ ] Success message appears with Booking ID
- [ ] Form clears after submission
- [ ] Booking ID snippet displayed (first 8 chars)

## ✅ Email Notifications

- [ ] Check business email (jaykiegado629@gmail.com or updated address)
- [ ] Look for new booking notification email
- [ ] Email contains all booking details
- [ ] Check spam folder if not in inbox
- [ ] Customer confirmation email sent (check test email)

## ✅ Admin Dashboard

- [ ] Visit http://localhost:3000/admin/bookings
- [ ] Back to home link works
- [ ] Admin menu shows:
  - [ ] 📅 Bookings tab (shows correct count)
  - [ ] ⚙️ Settings tab
- [ ] Booking table displays:
  - [ ] Customer Name
  - [ ] Service Type
  - [ ] Preferred Date
  - [ ] Mobilization Fee ($150)
  - [ ] Status badge (yellow "Pending" or other)
  - [ ] "View" link for each booking

## ✅ Booking Detail Page

- [ ] Click "View" on a booking
- [ ] URL shows: `/admin/bookings/[booking-id]`
- [ ] All customer info displays
- [ ] All project details display
- [ ] Status section shows with:
  - [ ] Current status badge
  - [ ] Status dropdown
  - [ ] "Update Status" button
- [ ] Pricing section shows:
  - [ ] Mobilization fee
  - [ ] Labor calculation
  - [ ] Estimated total
- [ ] Timestamps display correctly
- [ ] Can change status to:
  - [ ] Pending
  - [ ] Confirmed
  - [ ] Completed
  - [ ] Cancelled
- [ ] Status update saves correctly

## ✅ Admin Settings

- [ ] Visit http://localhost:3000/admin/settings
- [ ] Back button works
- [ ] Current mobilization fee displays ($150)
- [ ] Can enter new fee in input
- [ ] Fee format accepts decimals (e.g., 150.00, 200, 75.50)
- [ ] "Update Fee" button works
- [ ] Success message appears after update
- [ ] Fee changes take effect immediately
- [ ] Example calculation updates
- [ ] "View All Bookings" button works

## ✅ Data Persistence

- [ ] Refresh booking page - data still shows
- [ ] Refresh admin page - bookings still there
- [ ] Refresh settings - fee still updated
- [ ] Close and reopen browser - data persists
- [ ] Stop and restart dev server - database intact

## ✅ Responsive Design

- [ ] Mobile view (375px):
  - [ ] Form stacks vertically
  - [ ] Price sidebar below form
  - [ ] Buttons full width
  - [ ] Text readable
- [ ] Tablet view (768px):
  - [ ] Layout adapts properly
  - [ ] 2-column layout works
- [ ] Desktop view (1024px+):
  - [ ] 3-column layout works
  - [ ] Sidebar sticky on scroll

## ✅ Error Handling

- [ ] Try submitting form with empty fields
- [ ] Try submitting invalid email
- [ ] Try entering negative hours
- [ ] Browser console shows no critical errors
- [ ] Error messages display clearly

## ✅ Performance

- [ ] Pages load quickly
- [ ] No console errors or warnings
- [ ] Images load properly
- [ ] Styles apply correctly
- [ ] Buttons respond immediately to clicks

## ⚠️ Known Items to Configure

- [ ] Update business email in `app/actions.ts`
- [ ] Update phone number in hero section
- [ ] Adjust hourly rate if different from $100
- [ ] Customize service types if needed
- [ ] Update Resend API key if needed

## 📝 Test Data

Use this for testing:

**Test Booking:**
- Name: John Doe
- Phone: 0400 123 456
- Email: test@example.com
- Address: 123 Main St, Sydney NSW
- Service: Yard Clearing
- Description: Remove overgrown bushes
- Date: (any future date)
- Time: 09:00
- Hours: 4
- Notes: None

**Test Fee Update:**
- Change from $150 to $200
- Verify in new bookings

---

**When all items are checked, your booking system is fully operational! ✨**
