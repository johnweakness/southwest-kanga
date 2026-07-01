'use server'

import { Resend } from 'resend'
import { db } from '@/lib/db'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendQuoteRequest(formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const address = formData.get('address') as string
  
  // Handle optional images sent from the form
  const files = formData.getAll('photos') as File[]
  const attachments = []

  for (const file of files) {
    if (file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      attachments.push({
        filename: file.name,
        content: buffer.toString('base64'),
      })
    }
  }

  try {
    await resend.emails.send({
      from: 'Southwest Kanga <onboarding@resend.dev>', // Free tier default testing sender
      to: 'jaykiegado629@gmail.com', // Put his actual email address here
      subject: `🚨 New Quote Request from ${name}`,
      html: `
        <h2>New Job Lead Received</h2>
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Site Address:</strong> ${address}</p>
        <p><em>Check attachments below for uploaded yard photos.</em></p>
      `,
      attachments: attachments,
    })

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function submitBooking(formData: FormData) {
  const customerName = formData.get('customerName') as string
  const customerPhone = formData.get('customerPhone') as string
  const customerEmail = formData.get('customerEmail') as string
  const siteAddress = formData.get('siteAddress') as string
  const serviceType = formData.get('serviceType') as string
  const serviceDescription = formData.get('serviceDescription') as string
  const preferredDate = formData.get('preferredDate') as string
  const preferredTime = formData.get('preferredTime') as string
  const estimatedHours = parseFloat(formData.get('estimatedHours') as string) || undefined
  const additionalNotes = formData.get('additionalNotes') as string

  try {
    // Get current mobilization fee
    let mobilizationSettings = await db.mobilizationSettings.findUnique({
      where: { id: 'default' },
    })

    if (!mobilizationSettings) {
      mobilizationSettings = await db.mobilizationSettings.create({
        data: { id: 'default', fee: 150 },
      })
    }

    // Create booking
    const booking = await db.booking.create({
      data: {
        customerName,
        customerPhone,
        customerEmail,
        siteAddress,
        serviceType,
        serviceDescription,
        preferredDate,
        preferredTime: preferredTime || undefined,
        estimatedHours,
        mobilizationFee: mobilizationSettings.fee,
        additionalNotes: additionalNotes || undefined,
        status: 'pending',
      },
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'Southwest Kanga <onboarding@resend.dev>',
      to: customerEmail,
      subject: `Booking Confirmation - Southwest Kanga (ID: ${booking.id.slice(0, 8)})`,
      html: `
        <h2>Thank you for booking with Southwest Kanga!</h2>
        <p>Hi ${customerName},</p>
        <p>We received your booking request. Here are the details:</p>
        <ul>
          <li><strong>Booking ID:</strong> ${booking.id.slice(0, 8)}</li>
          <li><strong>Service Type:</strong> ${serviceType.replace('-', ' ')}</li>
          <li><strong>Site Address:</strong> ${siteAddress}</li>
          <li><strong>Preferred Date:</strong> ${preferredDate}</li>
          <li><strong>Mobilization Fee:</strong> $${booking.mobilizationFee.toFixed(2)}</li>
        </ul>
        <p>We'll contact you soon to confirm the booking and provide a full quote.</p>
        <p>Best regards,<br/>Southwest Kanga Team</p>
      `,
    })

    // Send notification to business owner
    await resend.emails.send({
      from: 'Southwest Kanga <onboarding@resend.dev>',
      to: 'jaykiegado629@gmail.com',
      subject: `📅 New Booking Request - ${serviceType.replace('-', ' ')}`,
      html: `
        <h2>New Booking Received!</h2>
        <p><strong>Customer Name:</strong> ${customerName}</p>
        <p><strong>Phone:</strong> ${customerPhone}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Site Address:</strong> ${siteAddress}</p>
        <p><strong>Service Type:</strong> ${serviceType.replace('-', ' ')}</p>
        <p><strong>Service Description:</strong> ${serviceDescription}</p>
        <p><strong>Preferred Date:</strong> ${preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${preferredTime || 'Not specified'}</p>
        <p><strong>Estimated Hours:</strong> ${estimatedHours ? estimatedHours + ' hours' : 'Not specified'}</p>
        <p><strong>Mobilization Fee:</strong> $${booking.mobilizationFee.toFixed(2)}</p>
        <p><strong>Additional Notes:</strong> ${additionalNotes || 'None'}</p>
        <p><strong>Booking ID:</strong> ${booking.id}</p>
        <p><a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/admin/bookings/${booking.id}">View in Admin</a></p>
      `,
    })

    return { success: true, bookingId: booking.id }
  } catch (error) {
    console.error('Booking error:', error)
    return { success: false, message: 'Failed to submit booking' }
  }
}

export async function getMobilizationFee() {
  try {
    let settings = await db.mobilizationSettings.findUnique({
      where: { id: 'default' },
    })

    if (!settings) {
      settings = await db.mobilizationSettings.create({
        data: { id: 'default', fee: 150 },
      })
    }

    return { success: true, fee: settings.fee }
  } catch (error) {
    console.error('Error fetching mobilization fee:', error)
    return { success: false, fee: 150 }
  }
}

export async function getBookings() {
  try {
    const bookings = await db.booking.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return { success: true, bookings }
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return { success: false, bookings: [] }
  }
}

export async function getBookingById(id: string) {
  try {
    const booking = await db.booking.findUnique({
      where: { id },
    })
    if (!booking) {
      return { success: false, message: 'Booking not found' }
    }
    return { success: true, booking }
  } catch (error) {
    console.error('Error fetching booking:', error)
    return { success: false, message: 'Error fetching booking' }
  }
}

export async function updateBookingStatus(id: string, status: string) {
  try {
    const booking = await db.booking.update({
      where: { id },
      data: { status },
    })
    return { success: true, booking }
  } catch (error) {
    console.error('Error updating booking:', error)
    return { success: false, message: 'Error updating booking' }
  }
}

export async function updateMobilizationFee(fee: number) {
  try {
    const settings = await db.mobilizationSettings.upsert({
      where: { id: 'default' },
      update: { fee },
      create: { id: 'default', fee },
    })
    return { success: true, fee: settings.fee }
  } catch (error) {
    console.error('Error updating mobilization fee:', error)
    return { success: false, message: 'Error updating fee' }
  }
}