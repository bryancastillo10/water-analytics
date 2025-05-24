import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
interface GenerateCodeProps {
  code: string;
  expiry: Date;
}
export const generateAndSendVerificationCode = async (
  email: string,
): Promise<GenerateCodeProps> => {
  const code = Math.floor(10000 + Math.random() * 90000).toString();

  const expiry = new Date(Date.now() + 5 * 60 * 1000);

  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="font-size: 24px; font-weight: bold; color: #006da3; margin-bottom: 20px;">
            Water Analytics App Password Reset
        </h1>
        <p style="font-size: 16px; margin-bottom: 10px;">
            Your verification code is 
            <strong style="font-size: 18px; color: #006da3;">${code}</strong>.
        </p>
        <p style="font-size: 14px; margin-bottom: 20px;">
            The code expires in <strong>5 minutes</strong> after this email was sent.
        </p>
        <p style="font-size: 14px;">
            Enter the code in the reset password section of the app to reset your password.
        </p>
        <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">
        <p style="font-size: 12px; color: #999;">
            If you did not request a password reset, please ignore this email.
        </p>
    </div>
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
    subject: 'User Reset Code for your Water Analytics App',
    html: htmlTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`message ID: ${info.messageId}`);
    console.log(`Verification code sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send verification email');
  }

  return { code, expiry };
};
