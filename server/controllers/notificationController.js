const nodemailer = require('nodemailer');

// @desc    Send email notification
// @route   POST /api/notifications/send-email
// @access  Private
const sendEmail = async (req, res) => {
    const { to, subject, text } = req.body;

    // Create reusable transporter object using the default SMTP transport
    // Note: For production, use a real SMTP service like SendGrid, Mailgun, or Gmail with App Password
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Use 'gmail' or host/port for other providers
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        let info = await transporter.sendMail({
            from: `"ToDo Scheduler" <${process.env.EMAIL_USER}>`, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            // html: "<b>Hello world?</b>", // html body
        });

        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
};

module.exports = {
    sendEmail,
};
