// File: config/emailConfig.js - Email configuration
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false // Only for development
  }
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take messages');
  }
});

const emailTemplates = {
  notification: (contactData) => ({
    from: `"Riseup-Tech Contact" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFICATION_EMAIL || 'riseuptech2025@gmail.com',
    subject: `New Contact Form: ${contactData.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Interest:</strong> ${contactData.interest}</p>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${contactData.message}</p>
        </div>
        <p style="margin-top: 20px;">
          <small>Received: ${new Date().toLocaleString()}</small>
        </p>
      </div>
    `
  }),
  
  autoReply: (contactData) => ({
    from: `"Riseup-Tech" <${process.env.SMTP_USER}>`,
    to: contactData.email,
    subject: 'Thank you for contacting Riseup-Tech',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4a5568;">Thank You, ${contactData.name}!</h2>
        <p>We've received your message and will get back to you within 24-48 hours.</p>
        
        <div style="background: #edf2f7; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #2d3748;">Your Message Summary:</h3>
          <p><strong>Subject:</strong> ${contactData.subject}</p>
          <p><strong>Area of Interest:</strong> ${contactData.interest}</p>
        </div>
        
        <p>In the meantime, you can:</p>
        <ul>
          <li>Visit our website for more information</li>
          <li>Check out our latest projects and updates</li>
          <li>Follow us on social media for news</li>
        </ul>
        
        <p style="margin-top: 30px; color: #718096;">
          <strong>Best Regards,</strong><br>
          The Riseup-Tech Team<br>
          Basundhara-7, Kathmandu, Nepal<br>
          Email: riseuptech2025@gmail.com<br>
          Phone: +977-9827399860
        </p>
      </div>
    `
  })
};

module.exports = { transporter, emailTemplates };