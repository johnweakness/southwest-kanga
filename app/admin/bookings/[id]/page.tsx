'use client'

import { useState, useEffect } from 'react'
import { getBookingById, updateBookingStatus } from '@/app/actions'
import Link from 'next/link'

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('')

  useEffect(() => {
    fetchBooking()
  }, [params.id])

  async function fetchBooking() {
    setLoading(true)
    const result = await getBookingById(params.id)
    if (result.success && result.booking) {
      setBooking(result.booking)
      setSelectedStatus(result.booking.status)
    }
    setLoading(false)
  }

  async function handleStatusUpdate() {
    if (selectedStatus === booking.status) return

    setUpdating(true)
    const result = await updateBookingStatus(params.id, selectedStatus)
    setUpdating(false)

    if (result.success && result.booking) {
      setBooking(result.booking)
    }
  }

  const statusColors: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-green-100 text-green-800 border-green-300',
    cancelled: 'bg-red-100 text-red-800 border-red-300',
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-kangaBackground flex items-center justify-center">
        <div className="text-2xl font-bold text-kangaGreen">Loading...</div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-kangaBackground">
        <section className="bg-kangaGreen text-white px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <Link href="/admin/bookings" className="text-kangaYellow hover:underline mb-4 inline-block">
              ← Back to Bookings
            </Link>
            <h1 className="text-4xl font-bold">Booking Not Found</h1>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-kangaBackground text-slate-800">
      {/* Header */}
      <section className="bg-kangaGreen text-white px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/admin/bookings" className="text-kangaYellow hover:underline mb-4 inline-block">
            ← Back to Bookings
          </Link>
          <h1 className="text-4xl font-bold mb-2">Booking Details</h1>
          <p className="text-slate-200">ID: {booking.id}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-kangaGreen mb-4">Customer Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-500">Name</p>
                  <p className="text-lg font-semibold">{booking.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="text-lg font-semibold">{booking.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="text-lg font-semibold">{booking.customerEmail}</p>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-kangaGreen mb-4">Project Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-500">Site Address</p>
                  <p className="text-lg font-semibold">{booking.siteAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Service Type</p>
                  <p className="text-lg font-semibold">
                    {booking.serviceType.replace('-', ' ').charAt(0).toUpperCase() +
                      booking.serviceType.replace('-', ' ').slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Service Description</p>
                  <p className="text-lg">{booking.serviceDescription}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Preferred Date</p>
                    <p className="text-lg font-semibold">{booking.preferredDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Preferred Time</p>
                    <p className="text-lg font-semibold">{booking.preferredTime || 'Not specified'}</p>
                  </div>
                </div>
                {booking.estimatedHours && (
                  <div>
                    <p className="text-sm text-slate-500">Estimated Hours</p>
                    <p className="text-lg font-semibold">{booking.estimatedHours} hours</p>
                  </div>
                )}
                {booking.additionalNotes && (
                  <div>
                    <p className="text-sm text-slate-500">Additional Notes</p>
                    <p className="text-lg">{booking.additionalNotes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Status Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-kangaGreen mb-4">Status</h3>
              <div className={`px-4 py-3 rounded-lg border-2 mb-4 font-semibold text-center ${statusColors[booking.status]}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold">Change Status:</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kangaGreen"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {selectedStatus !== booking.status && (
                <button
                  onClick={handleStatusUpdate}
                  disabled={updating}
                  className="w-full mt-4 bg-kangaGreen text-white font-bold py-2 rounded-lg hover:brightness-110 transition disabled:opacity-50"
                >
                  {updating ? 'Updating...' : 'Update Status'}
                </button>
              )}
            </div>

            {/* Pricing Card */}
            <div className="bg-kangaYellow p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-kangaGreen mb-4">Pricing</h3>
              <div className="space-y-2 pb-4 border-b border-kangaGreen/30">
                <div className="flex justify-between">
                  <span>Mobilization:</span>
                  <span className="font-bold">${booking.mobilizationFee.toFixed(2)}</span>
                </div>
                {booking.estimatedHours && (
                  <div className="flex justify-between">
                    <span>Labor ({booking.estimatedHours}h @ $100/hr):</span>
                    <span className="font-bold">${(booking.estimatedHours * 100).toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-bold">Estimate:</span>
                <span className="text-2xl font-bold text-kangaGreen">
                  ${(booking.mobilizationFee + (booking.estimatedHours ? booking.estimatedHours * 100 : 0)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Timestamps */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-sm">
              <p className="text-slate-600">
                <strong>Created:</strong> {new Date(booking.createdAt).toLocaleString()}
              </p>
              <p className="text-slate-600 mt-2">
                <strong>Updated:</strong> {new Date(booking.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
