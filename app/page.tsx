'use client'

import Image from 'next/image'
import { useState } from 'react'
import { submitBooking } from './actions' // Pointed directly to your booking action

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ success?: boolean; message?: string }>({})

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setStatus({})

    const form = event.currentTarget
    const formData = new FormData(form)
    
    // Call the matching action in actions.ts
    const result = await submitBooking(formData)

    setLoading(false)
    if (result.success) {
      setStatus({ 
        success: true, 
        message: "🎉 Booking request sent successfully! Check your email for confirmation. We'll be in touch soon." 
      })
      form.reset() 
    } else {
      setStatus({ 
        success: false, 
        message: `❌ ${result.message || 'Something went wrong. Please try again or call directly.'}` 
      })
    }
  }

  return (
    <div className="min-h-screen bg-kangaBackground text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="bg-kangaGreen text-white px-6 py-16 text-center md:py-24">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-kangaYellow bg-white">
            <Image 
              src="/logo.jpg" 
              alt="Southwest Kanga Logo" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Southwest Kanga
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-xl">
            Professional Earthmoving, Tight-Access Digging & Yard Clearing
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#book-now" 
              className="bg-kangaYellow text-kangaGreen font-bold px-8 py-4 rounded-md shadow-lg hover:brightness-110 transition text-lg"
            >
              Book Service Online
            </a>
            <a 
              href="tel:0400000000" 
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-md hover:bg-white/10 transition text-lg"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* 2. THE SERVICES GRID */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-kangaGreen">
          Our Specialities
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-kangaYellow">
            <h3 className="text-xl font-bold mb-3 text-kangaGreen">Plants & Post Hole Drilling</h3>
            <p className="text-slate-600">
              High-torque auger drilling perfect for fencing, retaining walls, post holes, and deep tree planting.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-kangaYellow">
            <h3 className="text-xl font-bold mb-3 text-kangaGreen">Yard Clearing</h3>
            <p className="text-slate-600">
              Fast removal of overgrowth, heavy debris, rocks, and old turf to give you a clean yard slate.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-kangaYellow">
            <h3 className="text-xl font-bold mb-3 text-kangaGreen">Clearing & Spreading</h3>
            <p className="text-slate-600">
              Precision tight-access scraping, site leveling, and efficient spreading of topsoil, mulch, or gravel.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE BOOKING FORM */}
      <section id="book-now" className="bg-slate-100 py-16 px-6">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-kangaGreen mb-2">Book Your Job</h2>
          <p className="text-slate-500 mb-6">Provide your project scope below to secure your spot.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Your Name</label>
              <input type="text" name="customerName" className="w-full p-3 border rounded-md" required />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Phone Number</label>
                <input type="tel" name="customerPhone" className="w-full p-3 border rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Email Address</label>
                <input type="email" name="customerEmail" className="w-full p-3 border rounded-md" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Service Address</label>
              <input type="text" name="siteAddress" placeholder="Street, suburb, and state" className="w-full p-3 border rounded-md" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Service Type</label>
                <select name="serviceType" className="w-full p-3 border rounded-md bg-white" required>
                  <option value="post-hole-drilling">Post Hole Drilling</option>
                  <option value="yard-clearing">Yard Clearing</option>
                  <option value="clearing-spreading">Clearing & Spreading</option>
                  <option value="other">Other Earthmoving</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Estimated Hours</label>
                <input type="number" name="estimatedHours" placeholder="e.g. 4" min="1" className="w-full p-3 border rounded-md" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Preferred Date</label>
                <input type="date" name="preferredDate" className="w-full p-3 border rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Preferred Arrival Time</label>
                <select name="preferredTime" className="w-full p-3 border rounded-md bg-white">
                  <option value="Morning (7am - 12pm)">Morning (7am - 12pm)</option>
                  <option value="Afternoon (12pm - 5pm)">Afternoon (12pm - 5pm)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Job Details & Scope</label>
              <textarea name="serviceDescription" rows={3} placeholder="Describe what you need cleared, dug, or moved..." className="w-full p-3 border rounded-md" required></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Additional Notes (Optional)</label>
              <textarea name="additionalNotes" rows={2} placeholder="Gate access codes, tight corners, etc." className="w-full p-3 border rounded-md"></textarea>
            </div>

            {/* Mobilization Fee Block */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md my-4">
              <h4 className="text-sm font-bold text-amber-800 mb-1">📍 Machinery Mobilization Fee Notice</h4>
              <p className="text-xs text-amber-700 mb-3">
                A standard <strong>$150.00 mobilization fee</strong> applies to all jobs to cover machine transit, specialized transport, and site configuration setup.
              </p>
              <label className="flex items-start gap-2 text-sm text-slate-700 font-medium cursor-pointer">
                <input 
                  type="checkbox" 
                  name="mobilization_agreed" 
                  className="mt-1 h-4 w-4 text-kangaGreen focus:ring-kangaYellow border-slate-300 rounded" 
                  required 
                />
                <span>I confirm and accept the $150.00 machinery mobilization charge.</span>
              </label>
            </div>

            {status.message && (
              <div className={`p-4 rounded-md text-sm font-medium ${status.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {status.message}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-4 rounded-md border border-[#24553c] bg-[#2F6B4F] px-4 py-4 text-lg font-bold text-white shadow-md transition-all duration-200 hover:bg-[#24553c] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F4C542] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Processing Secure Booking...' : 'Confirm Booking Request'}
            </button>
          </form>
        </div>
      </section>

    </div>
  )
}