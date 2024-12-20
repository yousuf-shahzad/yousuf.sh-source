import nodemailer from 'nodemailer';

const MAX_FIELD_LENGTHS = {
  name: 100,
  email: 254,
  subject: 200,
  message: 5000,
  url: 500
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

const getClientIp = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0].trim() || 
         req.socket?.remoteAddress ||
         'Unknown';
};

export default async function handler(req, res) {
  // CORS for your portfolio domain
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://yousuf.sh');
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

    const clientIp = getClientIp(req);
    const formattedDate = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name, MAX_FIELD_LENGTHS.name),
      email: sanitizeInput(body.email, MAX_FIELD_LENGTHS.email).toLowerCase(),
      subject: sanitizeInput(body.subject, MAX_FIELD_LENGTHS.subject),
      message: sanitizeInput(body.message, MAX_FIELD_LENGTHS.message),
      url: sanitizeInput(body.url || req.headers.referer || '', MAX_FIELD_LENGTHS.url)
    };

    // Validate required fields
    for (const [field, value] of Object.entries(sanitizedData)) {
      if (!value && field !== 'url') { // URL is optional
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    if (!isValidEmail(sanitizedData.email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Setup transport
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
      text: `New Contact Form Submission

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Subject: ${sanitizedData.subject}
Submission Time: ${formattedDate}
IP Address: ${clientIp}
Source URL: ${sanitizedData.url}

Message:
${sanitizedData.message}

---
This message was sent from the contact form on yousuf.sh`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${sanitizedData.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${sanitizedData.subject}</p>
            <p style="margin: 10px 0;"><strong>Submission Time:</strong> ${formattedDate}</p>
            <p style="margin: 10px 0;"><strong>IP Address:</strong> ${clientIp}</p>
            <p style="margin: 10px 0;"><strong>Source URL:</strong> ${sanitizedData.url}</p>
          </div>

          <div style="background: #fff; padding: 20px; border-left: 4px solid #333; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="white-space: pre-wrap;">${sanitizedData.message}</p>
          </div>

          <div style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 10px; border-top: 1px solid #eee;">
            <p>This message was sent from the contact form on <a href="https://yousuf.sh">yousuf.sh</a></p>
          </div>
        </div>
      `
    });
    
    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ message: 'Failed to send message' });
  }
}