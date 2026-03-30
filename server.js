const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'YOUR_EMAIL@gmail.com',      // Replace with your email
        pass: 'YOUR_APP_PASSWORD'          // Replace with your 16-digit Google App Password
    }
});

app.post('/api/contact', async (req, res) => {
    const { email, message } = req.body;

    const mailOptions = {
        from: 'YOUR_EMAIL@gmail.com',
        to: 'info@airenvo.com',            // Change to whatever email you want to receive these at
        subject: `New Airenvo Contact from ${email}`,
        text: `You have a new message from your website.\n\nSender Email: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent from ${email}`);
        res.status(200).json({ success: true, message: "Thank you! We will be in touch soon." });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: "Failed to send email." });
    }
});

app.listen(PORT, () => {
    console.log(`Airenvo Server is running on http://localhost:${PORT}`);
});