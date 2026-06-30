'use server'

import { Resend } from 'resend'

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