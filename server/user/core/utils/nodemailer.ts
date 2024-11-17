// import nodemailer from "nodemailer";

export const generateVerificationCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
};

// export const sendEmailVerification = async (email, verificationCode) => {
//     const transport = nodemailer.createTransport({

//     });

//     const mailOptions = {

    // };

