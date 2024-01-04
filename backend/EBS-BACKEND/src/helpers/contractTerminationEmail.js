const nodemailer = require('nodemailer');

const contractTerminationMail = async (receiver, vendorName, attachmentPath) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nodereactproject2023@gmail.com',
            pass: 'kednhlntspkrqrvp'
        }
    });

    const mailOptions = {
        from: 'nodereactproject2023@gmail.com',
        to: receiver,
        subject: 'CONTRACT TERMINATION',
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #d9534f; text-align: center;">Contract Termination Notification</h2>
            <p style="color: #555; text-align: center;">Dear ${vendorName},</p>
            <p style="color: #555; text-align: center;">We regret to inform you that your contract with Electronic Business Service is terminated, effective immediately.</p>
            <p style="color: #555; text-align: center;">Details of the terminated contract:</p>
            <ul style="color: #777; margin-left: 20px; padding-left: 20px;">
                <strong>Thank you for the service</strong>
            </ul>
            <p style="color: #888; text-align: center;">We appreciate your past services and wish you the best in your future endeavors.</p>
            <p style="color: #888; text-align: center;">If you have any questions or concerns, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
            <p style="color: #888; text-align: center;">Thank you for your understanding.</p>
            <p style="color: #888; text-align: center;">Sincerely,<br>Enteprise Business Service</p>
        </div>
    </div>    
        `,
        attachments: [
            {
                path: attachmentPath, // Path to the document you want to attach
            },
        ],
    };

    try {
        // send mail
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

module.exports = contractTerminationMail;
