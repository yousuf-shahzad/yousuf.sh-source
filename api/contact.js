// api/contact.js
import nodemailer from 'nodemailer';

const MAX_FIELD_LENGTHS = {
  name: 100,
  email: 254,
  subject: 200,
  message: 5000
};

const sanitizeInput = (str = '', maxLength) => {
  if (typeof str !== 'string') return '';
  return str.slice(0, maxLength).trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default async function handler(req, res) {
  // CORS for your portfolio domain
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://yourdomain.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const body = req.body;
    
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ message: 'Invalid request' });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name, MAX_FIELD_LENGTHS.name),
      email: sanitizeInput(body.email, MAX_FIELD_LENGTHS.email).toLowerCase(),
      subject: sanitizeInput(body.subject, MAX_FIELD_LENGTHS.subject),
      message: sanitizeInput(body.message, MAX_FIELD_LENGTHS.message)
    };

    // Validate required fields
    for (const [field, value] of Object.entries(sanitizedData)) {
      if (!value) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    if (!isValidEmail(sanitizedData.email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Setup transport (recommend using Gmail or similar for portfolio)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: sanitizedData.email,
      subject: `Portfolio Contact: ${sanitizedData.subject}`,
      text: `
Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Subject: ${sanitizedData.subject}

Message:
${sanitizedData.message}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></p>
          <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
          <div style="white-space: pre-wrap;">${sanitizedData.message}</div>
        </div>
      `
    });
    
    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ message: 'Failed to send message' });
  }
}