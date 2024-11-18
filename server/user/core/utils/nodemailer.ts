import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
interface GenerateCodeProps{
    code: string;
    expiry: Date;
}
export const generateAndSendVerificationCode = async (email: string): Promise<GenerateCodeProps> => {
    
    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const expiry = new Date(Date.now() + 5 * 60 * 1000);


    const htmlTemplate = `
        <h1> Water Analytics App Password Reset</p>
        <p>Your verification code is <strong>${code}</strong>. The code expires in 5 minutes after this email sent.
        Enter the code to the reset password section of the app to be able to reset your password.
        </p>
    `;

    // Set up a SMTP server
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER as string,
        port: parseInt(process.env.SMTP_PORT as string),
        secure: true,
        auth: {
            user: process.env.SMTP_EMAIL as string,
            pass: process.env.SMTP_PASSWORD as string,
        },
    });

    // Email content
    const mailOptions = {
        from: '"Wayer Analytics App" <your-email@example.com>',
        to: email,
        subject: "User Reset Code for your Water Analytics App",
        html: htmlTemplate
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`message ID: ${info.messageId}`)
        console.log(`Verification code sent to ${email}`);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send verification email");
    }

    return { code, expiry };
};
