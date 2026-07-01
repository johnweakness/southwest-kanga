'use client'

import { useState, useEffect } from 'react'
import { getMobilizationFee, updateMobilizationFee } from '@/app/actions'
import Link from 'next/link'

export default function SettingsPage() {
  const [mobilizationFee, setMobilizationFee] = useState(150)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [status, setStatus] = useState<{ success?: boolean; message?: string }>({})
  const [inputValue, setInputValue] = useState('150')

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    setLoading(true)
    const result = await getMobilizationFee()
    if (result.success) {
      setMobilizationFee(result.fee)
      setInputValue(result.fee.toString())
    }
    setLoading(false)
  }

  async function handleUpdateFee() {
    const newFee = parseFloat(inputValue)
    if (isNaN(newFee) || newFee < 0) {
      setStatus({ success: false, message: '❌ Please enter a valid fee amount' })
      return
    }

    setUpdating(true)
    setStatus({})

    const result = await updateMobilizationFee(newFee)
    setUpdating(false)

    if (result.success) {
      setMobilizationFee(result.fee)
      setStatus({ success: true, message: `✅ Mobilization fee updated to $${result.fee.toFixed(2)}` })
    } else {
      setStatus({ success: false, message: '❌ Failed to update fee' })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-kangaBackground flex items-center justify-center">
        <div className="text-2xl font-bold text-kangaGreen">Loading...</div>
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
          <h1 className="text-4xl font-bold mb-2">System Settings</h1>
          <p className="text-slate-200">Manage mobilization fees and system configuration</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Main Settings */}
          <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-kangaGreen mb-6">Mobilization Fee</h2>

              {status.message && (
                <div
                  className={`p-4 rounded-lg mb-6 ${
                    status.success
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-600">Current Fee</label>
                  <p className="text-4xl font-bold text-kangaGreen mb-4">${mobilizationFee.toFixed(2)}</p>
                </div>

                <div>
                  <label className="block font-semibold mb-2">New Fee Amount ($)</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-2.5 text-xl text-slate-500">$</span>
                      <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        step="0.01"
                        min="0"
                        className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kangaGreen"
                        placeholder="150.00"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleUpdateFee}
                  disabled={updating || inputValue === mobilizationFee.toString()}
                  className="w-full bg-kangaGreen text-white font-bold py-3 rounded-lg hover:brightness-110 transition disabled:opacity-50"
                >
                  {updating ? 'Updating...' : 'Update Fee'}
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <h3 className="font-bold text-kangaGreen mb-4">What is Mobilization Fee?</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The mobilization fee is a flat charge applied to all bookings to cover the cost of transporting
                  equipment to the job site. This fee is included in every booking quote and is charged separately
                  from the hourly labor rate.
                </p>
              </div>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-kangaYellow p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-kangaGreen mb-4">Fee Impact</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-slate-600 mb-2">Current Mobilization Fee:</p>
                  <p className="text-2xl font-bold text-kangaGreen">${mobilizationFee.toFixed(2)}</p>
                </div>

                <div className="text-sm text-slate-700 bg-white p-4 rounded-lg space-y-2">
                  <p>
                    <strong>Example:</strong>
                  </p>
                  <p>Service: 4 hours @ $100/hr</p>
                  <p>Labor: $400</p>
                  <p>Mobilization: ${mobilizationFee.toFixed(2)}</p>
                  <p className="pt-2 border-t border-slate-200 font-bold">
                    Total Quote: ${(mobilizationFee + 400).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-bold text-kangaGreen mb-4">Admin Actions</h3>
              <div className="space-y-2">
                <Link
                  href="/admin/bookings"
                  className="block w-full text-center bg-kangaGreen text-white font-bold py-2 rounded-lg hover:brightness-110 transition"
                >
                  View All Bookings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
