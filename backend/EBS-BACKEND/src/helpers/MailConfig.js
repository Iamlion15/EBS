const nodemailer = require('nodemailer');

const sendMail = async (receiver, vendorName, deliveryDetails) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nodereactproject2023@gmail.com',
            pass: 'kednhlntspkrqrvp'
        }
    })
    const mailOptions = {
        from: 'nodereactproject2023@gmail.com',
        to: receiver,
        subject: 'IN NEED OF DELIVERY',
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #333; text-align: center;">Congratulations, ${vendorName}</strong>!</h2>
                    <p style="color: #555; text-align: center;">You have been selected to deliver the following items:</p>
                    <ul style="color: #777; margin-left: 20px; padding-left: 20px;">
                    <strong>${deliveryDetails}</strong>
                    </ul>
                    <p style="color: #888; text-align: center;">Please review the details and get ready for the delivery.</p>
                    <p style="color: #888; text-align: center;">Thank you for your service.</p>
                    <p style="color: #888; text-align: center;">ELECTRONIC BUSINESS SERVICE</p>
                </div>
            </div>
        `
    };
    try {
        // send mail
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}
module.exports = sendMail;