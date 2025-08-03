import nodemailer from 'nodemailer';

const sendGreetMail = async (to, name) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'amber1251.be22@chitkara.edu.in',
            pass: 'dhamaamber@5678'
        }
    });

    const subject = 'Welcome to CodeSync - Your Journey Begins Here';

    const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #FFB6C1; padding: 20px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">Welcome to CodeSync!</h1>
        </div>
        <div style="padding: 20px; background-color: #FFF0F5; border: 1px solid #FFB6C1; border-radius: 10px;">
            <p style="color: #333;">Dear ${name},</p>
            <p style="color: #333;">We're excited to welcome you to <strong style="color: #FF69B4;">CodeSync!</strong> 🌟</p>
            <p style="color: #333;">
                Thank you for joining CodeSync, where you can code in real-time and collaborate seamlessly with others. Our platform is designed to make coding more efficient and enjoyable, helping you to work together with ease and enhance your productivity.
            </p>
            <h3 style="color: #FF1493;">Here's What You Can Do Now:</h3>
            <ul style="line-height: 1.6; color: #333;">
                <li>Real-Time Coding: Collaborate on coding projects in real-time with your team or peers.</li>
                <li>Instant Feedback: Get immediate feedback and make changes on the fly.</li>
                <li>Seamless Collaboration: Share your code, track changes, and manage your coding tasks effortlessly.</li>
            </ul>
            <p style="color: #333;">
                We are committed to providing you with a seamless coding experience. If you have any questions or need support, our team is just an email away at <a href="mailto:support@codesync.com" style="color: #FF69B4;">support@codesync.com</a>.
            </p>
            <p style="text-align: center; margin-top: 20px;">
                <a href="https://your-website-link.com/" style="background-color: #FF69B4; color: #fff; padding: 10px 20px; 
                text-decoration: none; border-radius: 5px; display: inline-block;">Start Coding Now</a>
            </p>
            <p style="color: #333;">Thank you for being part of the CodeSync community. We look forward to helping you code smarter and more collaboratively!</p>
            <p style="color: #333;">Best regards,<br>The CodeSync Team</p>
        </div>
    </div>
    `;

    let mailOptions = {
        from: 'amber1251.be22@chitkara.edu.in',
        to: to,
        subject: subject,
        html: html
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export default sendGreetMail;