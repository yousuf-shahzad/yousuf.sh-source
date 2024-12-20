// api/contact.js
import nodemailer from 'nodemailer';
import { RateLimiter } from 'limiter';

// Create an in-memory rate limiter
// Note: In a production environment, you might want to use a more persistent solution
const limiter = new RateLimiter({
  tokensPerInterval: 5,
  interval: "15 minutes"
});

const sanitizeInput = (str = '') => {
  return str
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGIN 
    : 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Check rate limit
    const hasToken = await limiter.tryRemoveTokens(1);
    if (!hasToken) {
      return res.status(429).json({ 
        message: 'Too many requests, please try again later.'
      });
    }

    // Get and sanitize form data
    const body = req.body;
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      subject: sanitizeInput(body.subject),
      message: sanitizeInput(body.message),
      url: sanitizeInput(body.url)
    };

    const clientIp = req.headers['x-forwarded-for'] || 
                    req.socket.remoteAddress;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }
    });

    const formattedDate = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      dateStyle: 'full',
      timeStyle: 'long'
    });

    const mailOptions = {
      from: `"Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: sanitizedData.email,
      subject: `New Contact Form Message: ${sanitizedData.subject}`,
      text: `
New Contact Form Submission

Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Subject: ${sanitizedData.subject}
Submission Time: ${formattedDate}
IP Address: ${clientIp}
Source URL: ${sanitizedData.url}

Message:
${sanitizedData.message}

---
This message was sent from the contact form on yousuf.sh
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${sanitizedData.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${sanitizedData.subject}</p>
            <p style="margin: 10px 0;"><strong>Submission Time:</strong> ${formattedDate}</p>
            <p style="margin: 10px 0;"><strong>IP Address:</strong> ${clientIp}</p>
            <p style="margin: 10px 0;"><strong>Source URL:</strong> <a href="${sanitizedData.url}">${sanitizedData.url}</a></p>
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
    };

    await transporter.sendMail(mailOptions);
    
    console.log(`New contact form submission from ${sanitizedData.email} (${clientIp})`);
    
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email' });
  }
}