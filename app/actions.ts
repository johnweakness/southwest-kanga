'use server'

import { Resend } from 'resend'
import { supabase } from '@/lib/supabase' // Import the client utility

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitBooking(formData: FormData) {
  const customerName = formData.get('customerName') as string
  const customerPhone = formData.get('customerPhone') as string
  const customerEmail = formData.get('customerEmail') as string
  const siteAddress = formData.get('siteAddress') as string
  const serviceType = formData.get('serviceType') as string
  const serviceDescription = formData.get('serviceDescription') as string
  const preferredDate = formData.get('preferredDate') as string
  const preferredTime = formData.get('preferredTime') as string
  const estimatedHours = parseFloat(formData.get('estimatedHours') as string) || null
  const additionalNotes = formData.get('additionalNotes') as string

  const mobilizationFee = 150

  try {
    // 1. INSERT BOOKING INTO SUPABASE
    const uniqueId = 'booking_' + Math.random().toString(36).substring(2, 11)

    const { data: booking, error: dbError } = await supabase
      .from('Booking') 
      .insert([
        {
          id: uniqueId,
          customerName: customerName,
          customerPhone: customerPhone,
          customerEmail: customerEmail,
          siteAddress: siteAddress,
          serviceType: serviceType,
          serviceDescription: serviceDescription,
          preferredDate: preferredDate,
          preferredTime: preferredTime || null,
          estimatedHours: estimatedHours,
          mobilizationFee: mobilizationFee,
          additionalNotes: additionalNotes || null,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Database insertion error:', dbError)
      return { success: false, message: 'Failed to save booking data.' }
    }

    // 2. SEND CONFIRMATION EMAIL TO CUSTOMER
    await resend.emails.send({
      from: 'Southwest Kanga <onboarding@resend.dev>',
      to: customerEmail,
      subject: `Booking Confirmation - Southwest Kanga`,
      html: `
        <h2>Thank you for booking with Southwest Kanga!</h2>
        <p>Hi ${customerName},</p>
        <p>We received your booking request. Here are the details:</p>
        <ul>
          <li><strong>Service Type:</strong> ${serviceType.replace('-', ' ')}</li>
          <li><strong>Site Address:</strong> ${siteAddress}</li>
          <li><strong>Preferred Date:</strong> ${preferredDate}</li>
          <li><strong>Mobilization Fee:</strong> $${mobilizationFee.toFixed(2)}</li>
        </ul>
        <p>We'll contact you soon to confirm the booking and provide a full quote.</p>
        <p>Best regards,<br/>Southwest Kanga Team</p>
      `,
    })

    // 3. SEND NOTIFICATION TO BUSINESS OWNER
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
        <p><strong>Mobilization Fee:</strong> $${mobilizationFee.toFixed(2)}</p>
        <p><strong>Additional Notes:</strong> ${additionalNotes || 'None'}</p>
      `,
    })
  
    return { success: true, bookingId: booking.id }

  } catch (error) {
    console.error('Booking engine error:', error)
    return { success: false, message: 'An unexpected processing failure occurred.' }
  }
} // <-- This was the missing curly brace closing submitBooking!

export async function getMobilizationFee() {
  return { success: true, fee: 150 }
}

export async function getBookings() {
  return { success: true, bookings: [] }
}

export async function getBookingById(id: string) {
  return { success: false, message: 'Booking not found' }
}

export async function updateBookingStatus(id: string, status: string) {
  return { success: false, message: 'Booking not found' }
}

export async function updateMobilizationFee(fee: number) {
  return { success: true, fee: fee }
}