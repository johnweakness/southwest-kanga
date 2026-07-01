import { getBookings } from '@/app/actions'
import Link from 'next/link'

export default async function AdminBookingsPage() {
  const result = await getBookings()
  const bookings = result.bookings || []

  const statusColors: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  return (
    <div className="min-h-screen bg-kangaBackground text-slate-800">
      {/* Header */}
      <section className="bg-kangaGreen text-white px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-kangaYellow hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-slate-200">Manage bookings and system settings</p>
        </div>
      </section>

      {/* Admin Menu */}
      <section className="bg-kangaGreen/90 text-white px-6 py-4 border-b-4 border-kangaYellow">
        <div className="max-w-6xl mx-auto flex gap-4 flex-wrap">
          <Link
            href="/admin/bookings"
            className="font-semibold px-4 py-2 bg-white text-kangaGreen rounded hover:brightness-90 transition"
          >
            📅 Bookings ({bookings.length})
          </Link>
          <Link
            href="/admin/settings"
            className="font-semibold px-4 py-2 bg-kangaGreen/50 text-white rounded hover:brightness-125 transition"
          >
            ⚙️ Settings
          </Link>
        </div>
      </section>

      {/* Bookings List */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-kangaGreen">All Bookings</h2>

        {bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center text-slate-600">
            <p className="text-lg">No bookings yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-kangaGreen text-white">
                <tr>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Mobilization Fee</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {bookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-semibold text-kangaGreen">{booking.customerName}</td>
                    <td className="px-6 py-4">
                      {booking.serviceType.replace('-', ' ').charAt(0).toUpperCase() +
                        booking.serviceType.replace('-', ' ').slice(1)}
                    </td>
                    <td className="px-6 py-4">{booking.preferredDate}</td>
                    <td className="px-6 py-4 font-semibold">${booking.mobilizationFee.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[booking.status]}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/bookings/${booking.id}`}
                        className="text-kangaGreen font-semibold hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
