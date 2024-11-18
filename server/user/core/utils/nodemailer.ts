import nodemailer from "nodemailer";

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

    // Nodemailer transporter setup, needs to set up a SMTP server
    const transporter = nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        secure: true,
        auth: {
            user: "your-email@example.com",
            pass: "your-email-password",
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
        await transporter.sendMail(mailOptions);
        console.log(`Verification code sent to ${email}`);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send verification email");
    }

    return { code, expiry };
};
