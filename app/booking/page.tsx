'use client'

import { useState, useEffect } from 'react'
import { submitBooking, getMobilizationFee } from '@/app/actions'
import Link from 'next/link'

export default function BookingPage() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ success?: boolean; message?: string }>({})
  const [mobilizationFee, setMobilizationFee] = useState(150)
  const [estimatedTotal, setEstimatedTotal] = useState(150)
  const [estimatedHours, setEstimatedHours] = useState('')

  useEffect(() => {
    // Fetch mobilization fee on page load
    fetchMobilizationFee()
  }, [])

  async function fetchMobilizationFee() {
    const result = await getMobilizationFee()
    if (result.success) {
      setMobilizationFee(result.fee)
      setEstimatedTotal(result.fee)
    }
  }

  function handleHoursChange(e: React.ChangeEvent<HTMLInputElement>) {
    const hours = parseFloat(e.target.value) || 0
    setEstimatedHours(e.target.value)
    // Estimate: assume $100 per hour (you can adjust this)
    const laborCost = hours * 100
    setEstimatedTotal(mobilizationFee + laborCost)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setStatus({})

    const form = event.currentTarget
    const formData = new FormData(form)

    const result = await submitBooking(formData)

    setLoading(false)
    if (result.success) {
      setStatus({
        success: true,
        message: `✅ Booking submitted! Your Booking ID: ${result.bookingId?.slice(0, 8)}. We'll contact you shortly to confirm.`,
      })
      form.reset()
      setEstimatedTotal(mobilizationFee)
      setEstimatedHours('')
    } else {
      setStatus({ success: false, message: '❌ Something went wrong. Please try again.' })
    }
  }

  return (
    <div className="min-h-screen bg-kangaBackground text-slate-800">
      {/* Header */}
      <section className="bg-kangaGreen text-white px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-kangaYellow hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Book a Service</h1>
          <p className="text-slate-200">Schedule your earthmoving project with Southwest Kanga</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
              {status.message && (
                <div
                  className={`p-4 rounded-lg ${
                    status.success
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
                >
                  {status.message}
                </div>
              )}

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold text-kangaGreen mb-4">Your Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kangaGreen"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="customerPhone"
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kangaGreen"
                      placeholder="0400 000 000"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="customerEmail"
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kangaGreen"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              {/* Site Information */}
              <div>
                <h3 className="text-lg font-bold text-kangaGreen mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-2">Site Address *</label>
                    <input
                      type="text"
                      name="siteAddress"
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kangaGreen"
                      placeholder="123 Main St, City, State"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Service Type *</label>
                    <select
                      name="serviceType"
                      required
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kangaGreen"
                    >
                      <option value="">Select a service...</option>
                      <option value="plants">Plants & Post Hole Drilling</option>
                      <option value="yard-clearing">Yard Clearing</option>
                      <option value="clearing-spreading">Clearing & Spreading</option>
                      <option value="other">Other (specify below)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Service Description *</label>
                    <textarea
                      name="serviceDescription"
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kangaGreen"
                      placeholder="Describe what you need done..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-2">Preferred Date *</label>
                      <input
                        type="date"
                        name="preferredDate"
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kangaGreen"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Preferred Time</label>
                      <input
                        type="time"
                        name="preferredTime"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kangaGreen"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Estimated Hours</label>
                    <input
                      type="number"
                      name="estimatedHours"
                      step="0.5"
                      min="0"
                      value={estimatedHours}
                      onChange={handleHoursChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kangaGreen"
                      placeholder="e.g., 4"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Additional Notes</label>
                    <textarea
                      name="additionalNotes"
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kangaGreen"
                      placeholder="Any other information..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-kangaGreen text-white font-bold py-3 rounded-lg hover:brightness-110 transition disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Booking'}
              </button>
            </form>
          </div>

          {/* Pricing Summary Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-kangaYellow p-6 rounded-xl shadow-lg sticky top-20">
              <h3 className="text-xl font-bold text-kangaGreen mb-4">Pricing Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-kangaGreen/30">
                <div className="flex justify-between">
                  <span className="text-slate-700">Mobilization Fee:</span>
                  <span className="font-bold text-kangaGreen">${mobilizationFee.toFixed(2)}</span>
                </div>

                {estimatedHours && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-700">Labor ({estimatedHours}h @ $100/hr):</span>
                      <span className="font-bold text-kangaGreen">
                        ${(parseFloat(estimatedHours) * 100).toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-between items-center mb-4 text-lg">
                <span className="font-bold">Estimated Total:</span>
                <span className="text-2xl font-bold text-kangaGreen">${estimatedTotal.toFixed(2)}</span>
              </div>

              <p className="text-sm text-slate-600">
                *This is an estimate. Final quote will be provided after reviewing project details.
              </p>

              <div className="mt-6 pt-6 border-t border-kangaGreen/30 text-sm text-slate-700 space-y-2">
                <p>✓ Free initial consultation</p>
                <p>✓ Competitive pricing</p>
                <p>✓ Professional service</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
