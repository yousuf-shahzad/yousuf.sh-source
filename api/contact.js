// api/contact.js
import nodemailer from 'nodemailer';
import { RateLimiter } from 'limiter';

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

export default async function handler(req, res) {
  console.log('Incoming request method:', req.method);
  console.log('Incoming request headers:', req.headers);

  // Handle CORS preflight
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method);
    return res.status(405).json({ 
      message: `Method ${req.method} Not Allowed`,
      success: false
    });
  }

  try {
    console.log('Processing POST request');
    
    // Check rate limit
    const hasToken = await limiter.tryRemoveTokens(1);
    if (!hasToken) {
      console.log('Rate limit exceeded');
      return res.status(429).json({ 
        message: 'Too many requests, please try again later.',
        success: false
      });
    }

    // Validate request body
    if (!req.body) {
      console.log('Missing request body');
      return res.status(400).json({ 
        message: 'Request body is required',
        success: false
      });
    }

    // Get and sanitize form data
    const body = req.body;
    console.log('Received body:', body);

    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      subject: sanitizeInput(body.subject),
      message: sanitizeInput(body.message),
      url: sanitizeInput(body.url)
    };

    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!sanitizedData[field]) {
        console.log(`Missing required field: ${field}`);
        return res.status(400).json({ 
          message: `${field} is required`,
          success: false
        });
      }
    }

    const clientIp = req.headers['x-forwarded-for'] || 
                    req.socket.remoteAddress;

    console.log('Creating mail transporter');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
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
    };

    console.log('Sending email');
    await transporter.sendMail(mailOptions);
    
    console.log(`New contact form submission from ${sanitizedData.email} (${clientIp})`);
    
    return res.status(200).json({ 
      message: 'Email sent successfully',
      success: true
    });
  } catch (error) {
    console.error('Error details:', error);
    return res.status(500).json({ 
      message: 'Error sending email',
      error: error.message,
      success: false
    });
  }
}