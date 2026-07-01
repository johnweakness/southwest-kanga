'use client'

import Image from 'next/image'
import { useState } from 'react'
import { sendQuoteRequest } from './actions'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ success?: boolean; message?: string }>({})

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setStatus({})

    // Capture the form element synchronously before hitting the 'await' pause
    const form = event.currentTarget

    const formData = new FormData(form)
    const result = await sendQuoteRequest(formData)

    setLoading(false)
    if (result.success) {
      setStatus({ success: true, message: "🎉 Quote request sent successfully! We'll be in touch soon." })
      form.reset() // Safely clears the form fields using the captured reference
    } else {
      setStatus({ success: false, message: "❌ Something went wrong. Please try again or call directly." })
    }
  }

  return (
    <div className="min-h-screen bg-kangaBackground text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="bg-kangaGreen text-white px-6 py-16 text-center md:py-24">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Logo Container using your image */}
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
              href="/booking" 
              className="bg-kangaYellow text-kangaGreen font-bold px-8 py-4 rounded-md shadow-lg hover:brightness-110 transition text-lg"
            >
              Book a Service
            </a>
            <a 
              href="#quote" 
              className="bg-white text-kangaGreen font-bold px-8 py-4 rounded-md shadow-lg hover:brightness-110 transition text-lg"
            >
              Get a Free Quote
            </a>
            <a 
              href="tel:0400000000" /* Swap with your brother-in-law's real business phone number */
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

      {/* 3. THE QUOTE FORM */}
      <section id="quote" className="bg-slate-100 py-16 px-6">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-kangaGreen mb-2">Request a Quote</h2>
          <p className="text-slate-500 mb-6">Fill out the details below and we will get back to you shortly.</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Your Name</label>
              <input type="text" name="name" className="w-full p-3 border rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Phone Number</label>
              <input type="tel" name="phone" className="w-full p-3 border rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Service Address</label>
              <input type="text" name="address" placeholder="Street, suburb, and state" className="w-full p-3 border rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Upload Site Photos (Optional)</label>
              <input type="file" name="photos" accept="image/*" multiple className="w-full p-2 border border-dashed rounded-md bg-slate-50" />
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
              {loading ? 'Sending Request...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </section>

    </div>
  )
}